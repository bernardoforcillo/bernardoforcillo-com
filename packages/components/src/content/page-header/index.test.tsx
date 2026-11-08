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

  it('uses the rail-owned width with a fading bottom rule', () => {
    const html = renderToStaticMarkup(<PageHeader title='Blog' />);
    expect(html).toContain('rule-fade');
    expect(html).not.toContain('max-w-7xl');
  });
});
