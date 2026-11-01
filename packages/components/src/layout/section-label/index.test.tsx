import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { SectionLabel } from './index';

describe('SectionLabel', () => {
  it('renders the label in a pill and no heading tag', () => {
    const html = renderToStaticMarkup(<SectionLabel>Practice</SectionLabel>);
    expect(html).toContain('Practice');
    expect(html).toContain('bg-hatch');
    expect(html).not.toMatch(/<h[1-6]/);
  });
});
