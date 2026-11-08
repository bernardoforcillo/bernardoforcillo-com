import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { PROSE_CLASS_NAME, Prose } from './index';

describe('Prose', () => {
  it('renders build-time compiled HTML verbatim', () => {
    const html = renderToStaticMarkup(
      <Prose html='<h2>Why</h2><pre><code>ok</code></pre>' />,
    );
    expect(html).toContain('<h2>Why</h2>');
    expect(html).toContain('<pre><code>ok</code></pre>');
  });

  it('keeps the article typography classes', () => {
    const html = renderToStaticMarkup(<Prose html='<p>a</p>' />);
    expect(html).toContain('[&amp;_pre]:overflow-x-auto');
    expect(PROSE_CLASS_NAME).toContain('leading-[1.75]');
    expect(PROSE_CLASS_NAME).toContain('[&_ol]:list-decimal');
    expect(PROSE_CLASS_NAME).toContain('text-azure-radiance-700');
  });

  it('merges an extra className', () => {
    const html = renderToStaticMarkup(<Prose html='' className='mt-0' />);
    expect(html).toContain('mt-0');
    expect(html).not.toContain('mt-10');
  });
});
