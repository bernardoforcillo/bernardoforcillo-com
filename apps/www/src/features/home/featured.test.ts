import { describe, expect, it } from 'vitest';
import { featuredProjects } from './featured';

describe('featuredProjects', () => {
  it('caps the list at three', () => {
    expect(featuredProjects([1, 2, 3, 4])).toEqual([1, 2, 3]);
  });

  it('returns an empty list for no projects', () => {
    expect(featuredProjects([])).toEqual([]);
  });
});
