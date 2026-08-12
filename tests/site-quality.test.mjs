import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { extname, join, relative, resolve, sep } from 'node:path';
import test from 'node:test';

const root = resolve(import.meta.dirname, '..');
const dist = join(root, 'dist');
const canonicalOrigin = 'https://www.bespokecardstudio.com';

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function getCanonical(html) {
  return html.match(/<link\b(?=[^>]*\brel=["']canonical["'])[^>]*\bhref=["']([^"']+)["'][^>]*>/i)?.[1];
}

function pagePathFromFile(file) {
  const outputPath = relative(dist, file).split(sep).join('/');
  if (outputPath === 'index.html') return '/';
  return `/${outputPath.replace(/index\.html$/, '')}`;
}

function outputFileForPath(pathname) {
  if (extname(pathname)) return join(dist, pathname.slice(1));
  return join(dist, pathname.slice(1), 'index.html');
}

test('sitemap contains only canonical built pages and no blanket lastmod', () => {
  const sitemapFile = join(dist, 'sitemap.xml');
  assert.ok(existsSync(sitemapFile), 'dist/sitemap.xml must exist; run npm run build first');

  const xml = readFileSync(sitemapFile, 'utf8');
  assert.doesNotMatch(xml, /<lastmod>/, 'do not publish a build date as every page update date');

  const locations = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  assert.ok(locations.includes(`${canonicalOrigin}/editorial-team/`));
  assert.equal(new Set(locations).size, locations.length, 'sitemap URLs must be unique');

  for (const location of locations) {
    const url = new URL(location);
    assert.equal(url.origin, canonicalOrigin, `wrong sitemap origin: ${location}`);
    const file = outputFileForPath(url.pathname);
    assert.ok(existsSync(file), `sitemap URL has no built page: ${url.pathname}`);
    const html = readFileSync(file, 'utf8');
    assert.equal(getCanonical(html), location, `canonical mismatch on ${url.pathname}`);
  }
});

test('indexable built pages have essential metadata', () => {
  const htmlFiles = walk(dist).filter((file) => file.endsWith('.html'));

  for (const file of htmlFiles) {
    const html = readFileSync(file, 'utf8');
    if (/name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)) continue;

    const pagePath = pagePathFromFile(file);
    assert.match(html, /<title>[^<]{10,}<\/title>/i, `missing or short title: ${pagePath}`);
    assert.match(html, /<meta\s+name=["']description["']\s+content=(?:"[^"]{40,}"|'[^']{40,}')/i, `missing or short description: ${pagePath}`);
    assert.match(html, /<link\s+rel=["']canonical["']\s+href=["']https:\/\/www\.bespokecardstudio\.com\//i, `missing canonical: ${pagePath}`);
    assert.match(html, /<h1\b[^>]*>.*?<\/h1>/is, `missing H1: ${pagePath}`);
  }
});

test('built internal links resolve to output files', () => {
  const htmlFiles = walk(dist).filter((file) => file.endsWith('.html'));
  const missing = new Set();

  for (const file of htmlFiles) {
    const html = readFileSync(file, 'utf8');
    for (const match of html.matchAll(/\bhref=["']([^"']+)["']/gi)) {
      const href = match[1];
      if (href.startsWith('#') || /^(?:mailto:|tel:|javascript:)/i.test(href)) continue;
      const url = new URL(href, canonicalOrigin);
      if (url.origin !== canonicalOrigin) continue;
      if (!existsSync(outputFileForPath(decodeURIComponent(url.pathname)))) {
        missing.add(`${pagePathFromFile(file)} -> ${url.pathname}`);
      }
    }
  }

  assert.deepEqual([...missing], [], `broken internal links:\n${[...missing].join('\n')}`);
});

test('Vercel redirects and security headers preserve canonical routes', () => {
  const config = JSON.parse(readFileSync(join(root, 'vercel.json'), 'utf8'));
  const destinations = config.redirects.map(({ destination }) => destination);
  assert.ok(destinations.includes(`${canonicalOrigin}/invitations/wedding/for-kids/`));
  assert.ok(destinations.includes(`${canonicalOrigin}/invitations/:occasion/`));
  assert.ok(destinations.includes(`${canonicalOrigin}/templates/:occasion/`));
  assert.ok(config.redirects.every(({ permanent }) => permanent === true));
  assert.ok(config.redirects.slice(0, -1).every(({ destination }) => destination.endsWith('/')));

  const headerRules = config.headers.filter(({ headers }) =>
    headers.some(({ key }) => key === 'Content-Security-Policy'),
  );
  assert.deepEqual(headerRules.map(({ source }) => source), ['/', '/:path((?!.*\\.[^/]+$).*)']);
  for (const rule of headerRules) {
    const csp = rule.headers.find(({ key }) => key === 'Content-Security-Policy').value;
    assert.doesNotMatch(csp, /'unsafe-eval'/);
    assert.doesNotMatch(csp, /(?:^|;)\s*(?:default|script|style|img|connect|font)-src[^;]*\shttps:(?:\s|;|$)/);
    assert.ok(rule.headers.every(({ key }) => key !== 'Cache-Control'));
  }
});
