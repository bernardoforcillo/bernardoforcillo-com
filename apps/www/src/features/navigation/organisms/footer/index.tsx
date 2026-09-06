import { Link } from '@tanstack/react-router';
import { motion } from 'motion/react';
import type { FC } from 'react';
import { m } from '~/i18n';
import { BUILD_YEAR } from '~/lib/build-info';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Blog', to: '/blog' },
  { label: 'Projects', to: '/projects' },
  { label: 'Notes', to: '/notes' },
  { label: 'About', to: '/about' },
] as const;

const legalLinks = [
  { label: 'Privacy', to: '/policies/privacy-policy' },
  { label: 'Cookies', to: '/policies/cookies-policy' },
  { label: 'Attributions', to: '/attributions' },
] as const;

const LINK_CLASS =
  'font-mono text-[10px] uppercase tracking-[0.12em] text-muted hover:text-ink transition-colors';

export const Footer: FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className='border-t border-line py-8'
    >
      <div className='mx-auto max-w-6xl px-6'>
        <div className='grid gap-10 md:grid-cols-12'>
          <div className='flex max-w-xs flex-col gap-5 md:col-span-6'>
            <span className='text-xl font-semibold uppercase tracking-[-0.03em]'>
              Bernardo Forcillo / BF-00
            </span>
            <p className='max-w-sm text-sm leading-relaxed text-muted'>
              Independent thinking and deep engineering for systems that move
              from research to reality.
            </p>
            <span className='industrial-label flex items-center gap-2 text-muted'>
              <span className='size-2 bg-signal' />
              System operational
            </span>
          </div>

          <div className='flex flex-wrap gap-x-12 gap-y-8 md:col-span-6 md:justify-end'>
            <div className='flex flex-col gap-3'>
              <span className='industrial-label text-faint'>[01] Index</span>
              <ul className='space-y-2'>
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className={LINK_CLASS}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className='flex flex-col gap-3'>
              <span className='industrial-label text-faint'>[02] Legal</span>
              <ul className='space-y-2'>
                {legalLinks.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className={LINK_CLASS}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className='flex flex-col gap-3'>
              <span className='industrial-label text-faint'>[03] Signal</span>
              <ul className='space-y-2'>
                <li>
                  <a
                    href='https://github.com/bernardoforcillo'
                    target='_blank'
                    rel='noopener noreferrer'
                    className={LINK_CLASS}
                  >
                    GitHub ↗
                  </a>
                </li>
                <li>
                  <a
                    href='https://linkedin.com/in/bernardoforcillo'
                    target='_blank'
                    rel='noopener noreferrer'
                    className={LINK_CLASS}
                  >
                    LinkedIn ↗
                  </a>
                </li>
                <li>
                  <a
                    href='mailto:hello@bernardoforcillo.com'
                    className={LINK_CLASS}
                  >
                    Email
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className='mt-10 flex flex-col items-start justify-between gap-2 border-t border-line pt-5 font-mono text-[9px] uppercase tracking-[0.14em] text-faint md:flex-row md:items-center'>
          <span>Deep-tech creator / Pisa, EU / UTC+01</span>
          <span>{m.footer_rights({ year: BUILD_YEAR })}</span>
        </div>
      </div>
    </motion.footer>
  );
};
