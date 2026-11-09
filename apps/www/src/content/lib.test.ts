import { describe, expect, it } from 'vitest';
import { byDateDesc, countByCategory, mergeLatest, splitBlogPath } from './lib';

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

describe('mergeLatest', () => {
  it('merges posts and notes newest first and caps the count', () => {
    const r = mergeLatest(
      [
        {
          title: 'P',
          description: 'd',
          date: '2026-01-02',
          categorySlug: 'eng',
          postSlug: 'p',
        },
      ],
      [
        { title: 'N1', description: 'd', date: '2026-03-01', noteSlug: 'n1' },
        { title: 'N2', description: 'd', date: '2025-01-01', noteSlug: 'n2' },
      ],
      2,
    );
    expect(r.map((i) => i.title)).toEqual(['N1', 'P']);
    expect(r[1]).toMatchObject({
      kind: 'post',
      to: '/blog/$categorySlug/$postSlug',
      params: { categorySlug: 'eng', postSlug: 'p' },
    });
  });

  it('returns an empty list when there is nothing', () => {
    expect(mergeLatest([], [], 3)).toEqual([]);
  });
});
