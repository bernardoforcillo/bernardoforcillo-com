import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Separator } from './index';

describe('Separator', () => {
  it('uses a real background colour, not the unresolved bg-border', () => {
    const html = renderToStaticMarkup(<Separator />);
    expect(html).toContain('bg-gray-200');
    expect(html).not.toContain('bg-border');
  });

  it('switches dimensions with the orientation', () => {
    expect(renderToStaticMarkup(<Separator />)).toContain('h-[1px] w-full');
    expect(
      renderToStaticMarkup(<Separator orientation='vertical' />),
    ).toContain('h-full w-[1px]');
  });

  it('is announced as a separator', () => {
    const html = renderToStaticMarkup(<Separator orientation='vertical' />);
    expect(html).toContain('role="separator"');
    expect(html).toContain('aria-orientation="vertical"');
  });
});
