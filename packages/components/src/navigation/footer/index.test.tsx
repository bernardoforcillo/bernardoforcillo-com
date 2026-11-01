import type { ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Footer } from './index';

const Link = ({
  to,
  children,
  className,
}: {
  to: string;
  children?: ReactNode;
  className?: string;
}) => (
  <a href={to} className={className}>
    {children}
  </a>
);

describe('Footer', () => {
  it('renders the groups and marks only non-mailto links as external', () => {
    const html = renderToStaticMarkup(
      <Footer
        Link={Link}
        name='Name'
        tagline='Tag'
        site='bernardoforcillo.com'
        wordmark='Bernardo Forcillo'
        rights='Rights 2026'
        index={[{ label: 'Home', to: '/' }]}
        legal={[{ label: 'Privacy', to: '/p' }]}
        elsewhere={[
          { label: 'GitHub', href: 'https://github.com/x' },
          { label: 'Email', href: 'mailto:a@b.c' },
        ]}
      />,
    );
    expect(html).toContain('href="/p"');
    expect(html).toContain('Rights 2026');
    // No `icon` is passed, so only the GitHub column link is external.
    expect(html.match(/noopener noreferrer/g)).toHaveLength(1);
    expect(html).not.toMatch(/<a[^>]*href="mailto:[^"]*"[^>]*target=/);
    expect(html).not.toMatch(/<a[^>]*target=[^>]*href="mailto:/);
    expect(html).toMatch(
      /aria-hidden="true"[^>]*>[^<]*<[^>]*>Bernardo Forcillo/,
    );
    expect(html).toContain('bernardoforcillo.com');
    expect(html).not.toContain('Pisa');
  });
});
