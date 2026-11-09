import type { ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import type { NavItem } from '../types';
import { Navbar } from './index';

// Route matching belongs to TanStack; the stub only records which option we pass.
const Link = ({
  to,
  children,
  className,
  activeOptions,
}: {
  to: string;
  children?: ReactNode;
  className?: string;
  activeOptions?: { exact: boolean };
}) => (
  <a href={to} data-exact={String(activeOptions?.exact)} className={className}>
    {children}
  </a>
);

const items: NavItem[] = [
  { label: 'Home', to: '/', exact: true },
  { label: 'Blog', to: '/blog' },
];

const render = () =>
  renderToStaticMarkup(
    <Navbar
      Link={Link}
      brand='Bernardo Forcillo'
      items={items}
      cta={{ label: 'Get in touch', href: 'mailto:me@bernardoforcillo.com' }}
    />,
  );

describe('Navbar', () => {
  it('renders the CTA as a mailto link without target', () => {
    const html = render();
    expect(html).toContain('href="mailto:me@bernardoforcillo.com"');
    expect(html).toContain('Get in touch');
    expect(html).not.toContain('target="_blank"');
    expect(html).toContain('Bernardo Forcillo');
  });

  it('passes exact matching only to items marked exact', () => {
    const html = render();
    expect(html).toContain('href="/" data-exact="true"');
    expect(html).toContain('href="/blog" data-exact="false"');
  });
});
