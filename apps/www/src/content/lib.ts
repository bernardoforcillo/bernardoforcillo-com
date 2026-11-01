export type DatedEntry = { date: string };

export const byDateDesc = <T extends DatedEntry>(a: T, b: T) =>
  new Date(b.date).getTime() - new Date(a.date).getTime();

export type CategorizedEntry = { categorySlug: string };

export const countByCategory = <T extends CategorizedEntry>(
  entries: readonly T[],
) => {
  const byCategory = new Map<string, number>();
  for (const entry of entries) {
    byCategory.set(
      entry.categorySlug,
      (byCategory.get(entry.categorySlug) ?? 0) + 1,
    );
  }
  return [...byCategory.entries()]
    .map(([categorySlug, count]) => ({ categorySlug, count }))
    .sort((a, b) => a.categorySlug.localeCompare(b.categorySlug));
};

/**
 * Content Collections sets `_meta.path` to the path inside the collection
 * directory with the extension removed: `engineering/hello-world`.
 *
 * It builds that value with the host OS separator, so on Windows the same
 * document arrives as `engineering\hello-world`. Normalising here is what
 * keeps the derived slugs — and therefore every `/blog/:category/:post` URL —
 * identical on every machine that builds the site.
 */
export const splitBlogPath = (metaPath: string) => {
  const [categorySlug = '', postSlug = ''] = metaPath
    .replaceAll('\\', '/')
    .split('/');
  return { categorySlug, postSlug };
};

export type WritingItem = {
  kind: 'post' | 'note';
  title: string;
  description: string;
  date: string;
  to: string;
  params: Record<string, string>;
};

export const mergeLatest = (
  posts: readonly {
    title: string;
    description: string;
    date: string;
    categorySlug: string;
    postSlug: string;
  }[],
  notes: readonly {
    title: string;
    description: string;
    date: string;
    noteSlug: string;
  }[],
  limit: number,
): WritingItem[] =>
  [
    ...posts.map(
      (p): WritingItem => ({
        kind: 'post',
        title: p.title,
        description: p.description,
        date: p.date,
        to: '/blog/$categorySlug/$postSlug',
        params: { categorySlug: p.categorySlug, postSlug: p.postSlug },
      }),
    ),
    ...notes.map(
      (n): WritingItem => ({
        kind: 'note',
        title: n.title,
        description: n.description,
        date: n.date,
        to: '/notes/$noteSlug',
        params: { noteSlug: n.noteSlug },
      }),
    ),
  ]
    .sort(byDateDesc)
    .slice(0, limit);
