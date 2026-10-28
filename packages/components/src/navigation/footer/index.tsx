import { motion } from 'motion/react';
import type { FC } from 'react';
import type { LinkComponent, NavItem } from '../types';

type ExternalLink = { label: string; href: string };

type Props = {
  Link: LinkComponent;
  name: string;
  tagline: string;
  location: string;
  /** Pre-formatted rights line, so the app keeps ownership of i18n. */
  rights: string;
  index: NavItem[];
  legal: NavItem[];
  elsewhere: ExternalLink[];
};

const LINK_CLASS = 'text-sm text-muted transition-colors hover:text-ink';

export const Footer: FC<Props> = ({
  Link,
  name,
  tagline,
  location,
  rights,
  index,
  legal,
  elsewhere,
}) => (
  <motion.footer
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.5 }}
    className='border-t border-line/80 py-12'
  >
    <div className='mx-auto max-w-6xl px-6'>
      <div className='flex flex-col gap-12 md:flex-row md:items-start md:justify-between'>
        <div className='flex max-w-xs flex-col gap-4'>
          <span className='text-sm font-medium tracking-tight'>{name}</span>
          <p className='text-sm leading-relaxed text-muted'>{tagline}</p>
        </div>

        <div className='flex flex-wrap gap-x-14 gap-y-8'>
          <div className='flex flex-col gap-3'>
            <span className='text-sm text-muted'>Index</span>
            <ul className='space-y-2'>
              {index.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={LINK_CLASS}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className='flex flex-col gap-3'>
            <span className='text-sm text-muted'>Legal</span>
            <ul className='space-y-2'>
              {legal.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={LINK_CLASS}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className='flex flex-col gap-3'>
            <span className='text-sm text-muted'>Elsewhere</span>
            <ul className='space-y-2'>
              {elsewhere.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    {...(link.href.startsWith('mailto:')
                      ? {}
                      : { target: '_blank', rel: 'noopener noreferrer' })}
                    className={LINK_CLASS}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className='mt-12 flex flex-col items-start justify-between gap-2 border-t border-line/80 pt-6 text-sm text-muted md:flex-row md:items-center'>
        <span>{location}</span>
        <span>{rights}</span>
      </div>
    </div>
  </motion.footer>
);
