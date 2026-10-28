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
        location='Pisa'
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
    expect(html.match(/noopener noreferrer/g)).toHaveLength(1);
  });
});
