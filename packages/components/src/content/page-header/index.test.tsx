import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { PageHeader } from './index';

describe('PageHeader', () => {
  it('renders the title as an h1 with a trailing full stop', () => {
    const html = renderToStaticMarkup(<PageHeader title='Blog' />);
    expect(html).toContain('<h1');
    expect(html).toContain('Blog');
    expect(html).toContain('.</h1>');
  });

  it('renders the description when given', () => {
    const html = renderToStaticMarkup(
      <PageHeader title='Blog' description='Thoughts.' />,
    );
    expect(html).toContain('Thoughts.');
  });

  it('keeps the original section spacing classes', () => {
    const html = renderToStaticMarkup(<PageHeader title='Blog' />);
    expect(html).toContain('max-w-7xl mx-auto px-6 pt-32 pb-12');
  });
});
