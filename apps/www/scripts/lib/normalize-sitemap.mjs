// The TanStack sitemap plugin emits one <url> per crawled URL, and
// autoSubfolderIndex crawls both `/blog` and `/blog/` for the single file
// `blog/index.html`. Left alone the sitemap advertises the same page twice under
// two URLs, and for `/policies/` it advertises a URL that page's own canonical
// contradicts. It also declares the sitemaps.org namespace over https, which is
// a different namespace from the http one the protocol defines.

const WRONG_NAMESPACE = 'https://www.sitemaps.org/schemas/sitemap/0.9';
const SITEMAP_NAMESPACE = 'http://www.sitemaps.org/schemas/sitemap/0.9';

// Rewrites a <loc> into the form the page's own canonical declares: no trailing
// slash, except at the site root where the slash is the canonical form.
const canonicalise = (loc) => {
  const url = new URL(loc);
  url.pathname = url.pathname.replace(/\/+$/, '') || '/';

  return url.toString();
};

export const normalizeSitemap = (xml) => {
  const seen = new Set();

  return xml
    .replaceAll(WRONG_NAMESPACE, SITEMAP_NAMESPACE)
    .replaceAll(/[ \t]*<url>[\s\S]*?<\/url>\n?/g, (entry) => {
      const loc = entry.match(/<loc>([\s\S]*?)<\/loc>/)?.[1];

      if (!loc) {
        return entry;
      }

      const canonical = canonicalise(loc.trim());

      if (seen.has(canonical)) {
        return '';
      }

      seen.add(canonical);

      return entry.replace(loc, canonical);
    });
};
