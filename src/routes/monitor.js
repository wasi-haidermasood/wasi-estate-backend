// routes/monitor.js
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const crypto = require('crypto');
const MonitorRun = require('../models/MonitorRun');

const router = express.Router();
const { URL } = require('url');

const DEFAULT_SLOW_MS = 2500; // 2.5s
const DEFAULT_LARGE_IMAGE_BYTES = 500 * 1024; // 500 KB

function makeAbsoluteUrl(base, href) {
  try {
    return new URL(href, base).toString();
  } catch {
    return null;
  }
}

router.post('/run', async (req, res) => {
  const {
    websiteUrl = process.env.PUBLIC_BASE_URL || 'https://wasi-estate.vercel.app',
    sitemapUrl, // optional override
    slowThresholdMs = DEFAULT_SLOW_MS,
    largeImageBytes = DEFAULT_LARGE_IMAGE_BYTES,
  } = req.body || {};

  const rootUrl = websiteUrl.replace(/\/$/, '');
  const finalSitemapUrl =
    sitemapUrl || `${process.env.PUBLIC_BASE_URL || rootUrl}/sitemap.xml`;

  const startedAt = new Date();

  const pages = [];
  const linkMap = []; // { fromUrl, toUrl }
  const allImages = []; // { pageUrl, src, alt }
  const issues = [];

  try {
    // 1) Fetch sitemap
    const sitemapResp = await axios.get(finalSitemapUrl, { timeout: 15000 });
    const xml = sitemapResp.data;
    const locMatches = xml.match(/<loc>(.*?)<\/loc>/g) || [];
    const pageUrls = locMatches.map((m) =>
      m.replace('<loc>', '').replace('</loc>', '').trim()
    );
    const uniquePageUrls = [...new Set(pageUrls)];

    const titleMap = {}; // title -> [urls]
    const contentHashMap = {}; // hash -> [urls]

    // 2) Fetch each page
    for (const url of uniquePageUrls) {
      const pageStart = Date.now();
      let statusCode = null;
      let responseTimeMs = null;
      let metaTitle = null;
      let metaDescription = null;
      let contentHash = null;

      try {
        const resp = await axios.get(url, {
          timeout: slowThresholdMs + 5000,
          validateStatus: () => true,
        });
        statusCode = resp.status;
        responseTimeMs = Date.now() - pageStart;

        const contentType = resp.headers['content-type'] || '';
        if (contentType.includes('text/html')) {
          const $ = cheerio.load(resp.data);

          // Meta
          metaTitle = $('title').first().text().trim() || null;
          metaDescription =
            $('meta[name="description"]').attr('content')?.trim() || null;

          // Content hash
          const text = $('body').text().replace(/\s+/g, ' ').trim();
          if (text.length > 0) {
            contentHash = crypto.createHash('md5').update(text).digest('hex');
          }

          // Links (only internal)
          $('a[href]').each((_, el) => {
            const href = $(el).attr('href');
            if (!href) return;
            const abs = makeAbsoluteUrl(rootUrl, href);
            if (!abs) return;

            // Internal = same domain as websiteUrl
            if (abs.startsWith(rootUrl)) {
              linkMap.push({ fromUrl: url, toUrl: abs });
            }
          });

          // Images
          $('img').each((_, el) => {
            const src = $(el).attr('src');
            if (!src) return;

            const absSrc = makeAbsoluteUrl(rootUrl, src);
            if (!absSrc) return;

            const alt = ($(el).attr('alt') || '').trim();
            allImages.push({ pageUrl: url, src: absSrc, alt });

            if (!alt) {
              issues.push({
                type: 'IMAGE_MISSING_ALT',
                severity: 'low',
                pageUrl: url,
                details: { src: absSrc },
              });
            }
          });
        }

        // HTTP errors
        if (statusCode >= 400) {
          issues.push({
            type: 'PAGE_ERROR_STATUS',
            severity: statusCode >= 500 ? 'high' : 'medium',
            pageUrl: url,
            details: { statusCode },
          });
        }

        // Slow
        if (responseTimeMs !== null && responseTimeMs > slowThresholdMs) {
          issues.push({
            type: 'SLOW_PAGE',
            severity: 'medium',
            pageUrl: url,
            details: { responseTimeMs },
          });
        }

        // Missing meta
        if (!metaTitle) {
          issues.push({
            type: 'MISSING_META_TITLE',
            severity: 'medium',
            pageUrl: url,
            details: {},
          });
        }
        if (!metaDescription) {
          issues.push({
            type: 'MISSING_META_DESCRIPTION',
            severity: 'medium',
            pageUrl: url,
            details: {},
          });
        }

        // Track duplicates
        if (metaTitle) {
          if (!titleMap[metaTitle]) titleMap[metaTitle] = [];
          titleMap[metaTitle].push(url);
        }
        if (contentHash) {
          if (!contentHashMap[contentHash]) contentHashMap[contentHash] = [];
          contentHashMap[contentHash].push(url);
        }
      } catch (err) {
        responseTimeMs = Date.now() - pageStart;
        issues.push({
          type: 'PAGE_FETCH_ERROR',
          severity: 'high',
          pageUrl: url,
          details: { error: err.message },
        });
      }

      pages.push({
        url,
        statusCode,
        responseTimeMs,
        metaTitle,
        metaDescription,
        contentHash,
      });
    }

    // 3) Broken links (check targets once)
    const uniqueTargets = [...new Set(linkMap.map((l) => l.toUrl))];
    const targetStatusMap = {};

    for (const target of uniqueTargets) {
      try {
        const resp = await axios.get(target, {
          timeout: slowThresholdMs + 5000,
          validateStatus: () => true,
        });
        targetStatusMap[target] = resp.status;
      } catch {
        targetStatusMap[target] = null;
      }
    }

    for (const link of linkMap) {
      const status = targetStatusMap[link.toUrl];
      if (!status || status >= 400) {
        issues.push({
          type: 'BROKEN_LINK',
          severity: 'high',
          pageUrl: link.fromUrl,
          details: { toUrl: link.toUrl, statusCode: status },
        });
      }
    }

    // 4) Image sizes
    const uniqueImageSrcs = [...new Set(allImages.map((i) => i.src))];
    const imageSizeMap = {};

    for (const src of uniqueImageSrcs) {
      try {
        const headResp = await axios.head(src, {
          timeout: 15000,
          validateStatus: () => true,
        });
        const len = headResp.headers['content-length'];
        if (!len) continue;

        const size = parseInt(len, 10);
        imageSizeMap[src] = size;

        if (size > largeImageBytes) {
          const pagesUsing = allImages
            .filter((i) => i.src === src)
            .map((i) => i.pageUrl);

          for (const pageUrl of pagesUsing) {
            issues.push({
              type: 'LARGE_IMAGE',
              severity: 'medium',
              pageUrl,
              details: { src, sizeBytes: size },
            });
          }
        }
      } catch {
        // ignore
      }
    }

    // 5) Duplicates
    let duplicateTitlesCount = 0;
    Object.entries(titleMap).forEach(([title, urls]) => {
      if (title && urls.length > 1) {
        duplicateTitlesCount += 1;
        issues.push({
          type: 'DUPLICATE_TITLE',
          severity: 'medium',
          pageUrl: urls[0],
          details: { title, urls },
        });
      }
    });

    let duplicateContentGroups = 0;
    Object.entries(contentHashMap).forEach(([hash, urls]) => {
      if (urls.length > 1) {
        duplicateContentGroups += 1;
        issues.push({
          type: 'DUPLICATE_CONTENT',
          severity: 'medium',
          pageUrl: urls[0],
          details: { hash, urls },
        });
      }
    });

    const finishedAt = new Date();

    const totalPages = pages.length;
    const brokenLinks = issues.filter((i) => i.type === 'BROKEN_LINK').length;
    const slowPages = issues.filter((i) => i.type === 'SLOW_PAGE').length;
    const missingMetaTitle = issues.filter(
      (i) => i.type === 'MISSING_META_TITLE'
    ).length;
    const missingMetaDescription = issues.filter(
      (i) => i.type === 'MISSING_META_DESCRIPTION'
    ).length;
    const largeImages = issues.filter((i) => i.type === 'LARGE_IMAGE').length;
    const imagesMissingAlt = issues.filter(
      (i) => i.type === 'IMAGE_MISSING_ALT'
    ).length;

    const avgResp =
      pages.length > 0
        ? Math.round(
            pages.reduce((sum, p) => sum + (p.responseTimeMs || 0), 0) /
              pages.length
          )
        : 0;

    const runDoc = await MonitorRun.create({
      websiteUrl: rootUrl,
      startedAt,
      finishedAt,
      stats: {
        totalPages,
        brokenLinks,
        slowPages,
        missingMetaTitle,
        missingMetaDescription,
        duplicateTitles: duplicateTitlesCount,
        duplicateContentGroups,
        largeImages,
        imagesMissingAlt,
        averageResponseTimeMs: avgResp,
      },
      issues,
    });

    res.json(runDoc);
  } catch (err) {
    console.error('Monitor run error:', err.message);
    res
      .status(500)
      .json({ error: 'Monitor run failed', details: err.message });
  }
});

module.exports = router;