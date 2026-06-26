import type { APIRoute } from 'astro';
import { OCCASIONS } from '../lib/occasions';
import { absoluteUrl } from '../lib/site';

const staticPaths = [
  '/',
  '/about/',
  '/occasions/',
  '/templates/',
  '/invitations/',
  '/wording/',
  '/privacy/',
  '/terms/',
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
