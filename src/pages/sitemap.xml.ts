import type { APIRoute } from 'astro';
import {
  COMPARISON_PAGES,
  FEATURED_EVENT_MICROSITES,
  GUIDE_PAGES,
  MARKET_CLUSTERS,
  PHOTO_FOCUSED_OCCASIONS,
  PRODUCT_FEATURE_PAGES,
  SEASONAL_HUBS,
} from '../lib/content';
import { OCCASIONS } from '../lib/occasions';
import { absoluteUrl } from '../lib/site';

const staticPaths = [
  '/',
  '/about/',
  '/contact/',
  '/content-standards/',
  '/occasions/',
  '/templates/',
  '/invitations/',
  '/wording/',
  '/features/',
  '/photo/',
  '/guides/',
  '/compare/',
  '/seasonal/',
  '/events/',
  '/indian/',
];

const familyBuilders = [
  (slug: string) => `/make/${slug}/`,
  (slug: string) => `/invitations/${slug}/`,
  (slug: string) => `/templates/${slug}/`,
  (slug: string) => `/wording/${slug}/`,
];

const buildDate = new Date().toISOString().split('T')[0];

function getMeta(path: string) {
  if (path === '/') return { changefreq: 'daily', priority: '1.0' };
  if (path.startsWith('/make/')) return { changefreq: 'weekly', priority: '0.9' };
  if (path.startsWith('/invitations/') || path.startsWith('/templates/')) return { changefreq: 'weekly', priority: '0.8' };
  if (path.startsWith('/wording/') || path.startsWith('/guides/')) return { changefreq: 'monthly', priority: '0.7' };
  if (path.startsWith('/compare/') || path.startsWith('/features/') || path.startsWith('/events/') || path.startsWith('/photo/')) {
    return { changefreq: 'monthly', priority: '0.7' };
  }
  if (path.startsWith('/seasonal/') || path.startsWith('/indian/')) return { changefreq: 'weekly', priority: '0.8' };
  return { changefreq: 'monthly', priority: '0.5' };
}

function buildSitemapXml() {
  const urls = [
    ...staticPaths,
    ...OCCASIONS.flatMap((occasion) => familyBuilders.map((builder) => builder(occasion.slug))),
    ...PRODUCT_FEATURE_PAGES.map((feature) => `/features/${feature.slug}/`),
    ...PHOTO_FOCUSED_OCCASIONS.map((slug) => `/photo/${slug}/`),
    ...SEASONAL_HUBS.map((hub) => `/seasonal/${hub.slug}/`),
    ...GUIDE_PAGES.map((guide) => `/guides/${guide.slug}/`),
    ...COMPARISON_PAGES.map((page) => `/compare/${page.slug}/`),
    ...FEATURED_EVENT_MICROSITES.map((slug) => `/events/${slug}/`),
    ...MARKET_CLUSTERS.map((cluster) => `/indian/${cluster.slug}/`),
  ];

  const body = urls
    .map((path) => {
      const meta = getMeta(path);
      return `<url><loc>${absoluteUrl(path)}</loc><lastmod>${buildDate}</lastmod><changefreq>${meta.changefreq}</changefreq><priority>${meta.priority}</priority></url>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`;
}

export const GET: APIRoute = () => {
  return new Response(buildSitemapXml(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
