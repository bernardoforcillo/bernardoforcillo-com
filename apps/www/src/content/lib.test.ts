import { describe, expect, it } from 'vitest';
import { byDateDesc, countByCategory, splitBlogPath } from './lib';

describe('byDateDesc', () => {
  it('sorts newest first', () => {
    const sorted = [
      { date: '2026-01-01' },
      { date: '2026-06-11' },
      { date: '2026-04-16' },
    ].sort(byDateDesc);
    expect(sorted.map((entry) => entry.date)).toEqual([
      '2026-06-11',
      '2026-04-16',
      '2026-01-01',
    ]);
  });
});

describe('countByCategory', () => {
  it('counts posts per category and sorts categories alphabetically', () => {
    expect(
      countByCategory([
        { categorySlug: 'engineering' },
        { categorySlug: 'design' },
        { categorySlug: 'engineering' },
      ]),
    ).toEqual([
      { categorySlug: 'design', count: 1 },
      { categorySlug: 'engineering', count: 2 },
    ]);
  });

  it('returns an empty list for no posts', () => {
    expect(countByCategory([])).toEqual([]);
  });
});

describe('splitBlogPath', () => {
  it('derives the category from the directory and the slug from the file', () => {
    expect(splitBlogPath('engineering/hello-world')).toEqual({
      categorySlug: 'engineering',
      postSlug: 'hello-world',
    });
  });

  it('leaves the post slug empty for a file at the collection root', () => {
    expect(splitBlogPath('orphan')).toEqual({
      categorySlug: 'orphan',
      postSlug: '',
    });
  });
});
