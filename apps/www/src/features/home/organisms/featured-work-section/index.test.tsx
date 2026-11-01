import { describe, expect, it } from 'vitest';
import { FeaturedWorkSection } from '.';
import { LatestWritingSection } from '../latest-writing-section';

describe('home sections with no content', () => {
  it('FeaturedWorkSection renders nothing for no projects', () => {
    expect(FeaturedWorkSection({ projects: [] })).toBeNull();
  });

  it('LatestWritingSection renders nothing for no items', () => {
    expect(LatestWritingSection({ items: [] })).toBeNull();
  });
});
