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
    .map((path) => `<url><loc>${absoluteUrl(path)}</loc><changefreq>weekly</changefreq></url>`)
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
