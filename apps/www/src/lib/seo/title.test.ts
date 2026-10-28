import { describe, expect, it } from 'vitest';
import { TITLE_ABSOLUTE, TITLE_DEFAULT } from './site';
import { absoluteUrl, formatTitle } from './title';

describe('formatTitle', () => {
  it('falls back to the root default when no title is given', () => {
    expect(formatTitle()).toBe(TITLE_DEFAULT);
    expect(formatTitle('')).toBe('Bernardo Forcillo');
  });

  it('reproduces the Next template, leading space included', () => {
    expect(formatTitle('About')).toBe(' About - Bernardo Forcillo');
  });

  it('exposes the absolute root title separately', () => {
    expect(TITLE_ABSOLUTE).toBe(
      'Bernardo Forcillo - A Polymath Product Builder',
    );
  });
});

describe('absoluteUrl', () => {
  it('resolves against the site origin', () => {
    expect(absoluteUrl('/about')).toBe('https://bernardoforcillo.com/about');
    expect(absoluteUrl('/')).toBe('https://bernardoforcillo.com/');
  });
});
