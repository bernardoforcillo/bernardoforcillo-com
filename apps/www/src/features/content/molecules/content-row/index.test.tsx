import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ContentRow } from './index';

describe('ContentRow', () => {
  it('renders the title, meta and description', () => {
    const html = renderToStaticMarkup(
      <ContentRow title='Amaro' meta='Aug 13, 2026' description='A tool.' />,
    );
    expect(html).toContain('Amaro');
    expect(html).toContain('Aug 13, 2026');
    expect(html).toContain('A tool.');
  });

  it('renders each tag as a bordered pill', () => {
    const html = renderToStaticMarkup(
      <ContentRow title='Amaro' meta='2026' tags={['Go', 'React']} />,
    );
    expect(
      html.match(/rounded-full border border-deep-blue-200/g),
    ).toHaveLength(2);
    expect(html).toContain('text-deep-blue-600');
  });

  it('renders no tag list without tags', () => {
    const html = renderToStaticMarkup(<ContentRow title='Amaro' meta='2026' />);
    expect(html).not.toContain('<ul');
  });
});
