import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Rail } from './index';

describe('Rail', () => {
  it('renders children inside the bordered column', () => {
    const html = renderToStaticMarkup(<Rail>hi</Rail>);
    expect(html).toContain('max-w-[1100px]');
    expect(html).toContain('border-deep-blue-200');
    expect(html).toContain('hi');
  });
});
