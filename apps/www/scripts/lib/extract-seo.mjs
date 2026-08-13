const NAMED_ENTITIES = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: '\u00a0',
  copy: '\u00a9',
  bull: '\u2022',
  mdash: '\u2014',
  ndash: '\u2013',
  hellip: '\u2026',
  middot: '\u00b7',
};

export const decodeEntities = (value) =>
  value.replace(/&(#[xX]?[0-9a-fA-F]+|[a-zA-Z]+);/g, (match, entity) => {
    if (entity[0] === '#') {
      const hex = entity[1] === 'x' || entity[1] === 'X';
      const code = Number.parseInt(entity.slice(hex ? 2 : 1), hex ? 16 : 10);
      return Number.isNaN(code) ? match : String.fromCodePoint(code);
    }
    return NAMED_ENTITIES[entity] ?? match;
  });

const parseAttributes = (raw) => {
  const pattern =
    /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'`=<>]+))/g;
  const attributes = {};
  for (const match of raw.matchAll(pattern)) {
    const value = match[2] ?? match[3] ?? match[4] ?? '';
    attributes[match[1].toLowerCase()] = decodeEntities(value);
  }
  return attributes;
};

const collectTags = (html, tagName) =>
  [...html.matchAll(new RegExp(`<${tagName}\\b([^>]*)>`, 'gi'))].map((match) =>
    parseAttributes(match[1]),
  );

const collectElements = (html, tagName) =>
  [
    ...html.matchAll(
      new RegExp(`<${tagName}\\b([^>]*)>([\\s\\S]*?)</${tagName}>`, 'gi'),
    ),
  ].map((match) => ({
    attributes: parseAttributes(match[1]),
    inner: match[2],
  }));

const stripMarkup = (html) =>
  html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ');

export const normalizeText = (value) =>
  decodeEntities(stripMarkup(value)).replace(/\s+/g, ' ').trim();

const section = (html, tagName) => {
  const match = html.match(
    new RegExp(`<${tagName}\\b[^>]*>([\\s\\S]*)</${tagName}>`, 'i'),
  );
  return match ? match[1] : html;
};

export const extractSeo = (html) => {
  const head = section(html, 'head');
  const body = section(html, 'body');

  const metas = collectTags(head, 'meta');
  const links = collectTags(head, 'link');
  const titles = collectElements(head, 'title');

  const byPrefix = (attribute, prefix) =>
    Object.fromEntries(
      metas
        .filter((meta) => (meta[attribute] ?? '').startsWith(prefix))
        .map((meta) => [meta[attribute], meta.content ?? '']),
    );

  const jsonLd = collectElements(html, 'script')
    .filter(
      (element) =>
        (element.attributes.type ?? '').toLowerCase() === 'application/ld+json',
    )
    .map((element) => {
      try {
        return JSON.parse(decodeEntities(element.inner));
      } catch {
        return { parseError: element.inner.slice(0, 120) };
      }
    });

  const canonicals = links.filter((link) => link.rel === 'canonical');
  const text = normalizeText(body);

  return {
    // Never trimmed: the Next title template is ' %s - Bernardo Forcillo' and
    // the leading space is part of what this baseline has to prove.
    title: titles.length > 0 ? decodeEntities(titles[0].inner) : null,
    titleCount: titles.length,
    description:
      metas.find((meta) => meta.name === 'description')?.content ?? null,
    keywords: metas.find((meta) => meta.name === 'keywords')?.content ?? null,
    robots: metas.find((meta) => meta.name === 'robots')?.content ?? null,
    canonical: canonicals[0]?.href ?? null,
    canonicalCount: canonicals.length,
    og: byPrefix('property', 'og:'),
    article: byPrefix('property', 'article:'),
    twitter: byPrefix('name', 'twitter:'),
    h1: collectElements(body, 'h1').map((element) =>
      normalizeText(element.inner),
    ),
    jsonLd,
    text,
    textLength: text.length,
  };
};
