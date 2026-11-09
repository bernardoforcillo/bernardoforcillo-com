import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Rail } from './index';

describe('Rail', () => {
  it('renders children inside the centred column', () => {
    const html = renderToStaticMarkup(<Rail>hi</Rail>);
    expect(html).toContain('max-w-[1100px]');
    expect(html).not.toContain('border-x');
    expect(html).toContain('hi');
  });
});
