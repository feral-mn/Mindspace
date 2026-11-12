import ogs from 'open-graph-scraper';
import { ApiError } from '../utils/ApiError.js';

const PRIVATE_HOST = /^(localhost|127\.|10\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.|0\.0\.0\.0|\[?::1\]?)/i;

function assertSafeUrl(raw) {
  const url = new URL(raw);
  if (!['http:', 'https:'].includes(url.protocol)) throw ApiError.badRequest('Only http(s) links are allowed');
  if (PRIVATE_HOST.test(url.hostname)) throw ApiError.badRequest('That address is not allowed');
  return url;
}

function youtubeThumb(url) {
  const host = url.hostname.replace('www.', '');
  let id = null;
  if (host === 'youtu.be') id = url.pathname.slice(1);
  if (host.endsWith('youtube.com')) id = url.searchParams.get('v') || url.pathname.split('/').pop();
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : '';
}

/**
 * Returns { title, description, thumbnail, siteName } for any link.
 * Never throws on scrape failure: falls back to a basic card from the domain.
 */
export async function getLinkPreview(rawUrl) {
  const url = assertSafeUrl(rawUrl);
  const domain = url.hostname.replace('www.', '');

  const fallback = {
    title: domain,
    description: '',
    thumbnail: youtubeThumb(url),
    siteName: domain,
  };

  try {
    const { result } = await ogs({
      url: url.href,
      timeout: 8000,
      fetchOptions: { headers: { 'user-agent': 'Mozilla/5.0 (compatible; MindspaceBot/1.0)' } },
    });

    return {
      title: result.ogTitle || result.twitterTitle || fallback.title,
      description: result.ogDescription || result.twitterDescription || '',
      thumbnail: result.ogImage?.[0]?.url || result.twitterImage?.[0]?.url || fallback.thumbnail,
      siteName: result.ogSiteName || fallback.siteName,
    };
  } catch {
    return fallback; // X/Pinterest/Instagram often block scrapers; still save the link.
  }
}
