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

const LINK_CLASS = 'text-sm text-muted transition-colors hover:text-ink';

export const Footer: FC = () => {
  return (
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
            <span className='text-sm font-medium tracking-tight'>
              Bernardo Forcillo
            </span>
            <p className='text-sm leading-relaxed text-muted'>
              Independent thinking and deep engineering for systems that move
              from research to reality.
            </p>
          </div>

          <div className='flex flex-wrap gap-x-14 gap-y-8'>
            <div className='flex flex-col gap-3'>
              <span className='text-sm text-muted'>Index</span>
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
              <span className='text-sm text-muted'>Legal</span>
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
              <span className='text-sm text-muted'>Elsewhere</span>
              <ul className='space-y-2'>
                <li>
                  <a
                    href='https://github.com/bernardoforcillo'
                    target='_blank'
                    rel='noopener noreferrer'
                    className={LINK_CLASS}
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href='https://linkedin.com/in/bernardoforcillo'
                    target='_blank'
                    rel='noopener noreferrer'
                    className={LINK_CLASS}
                  >
                    LinkedIn
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

        <div className='mt-12 flex flex-col items-start justify-between gap-2 border-t border-line/80 pt-6 text-sm text-muted md:flex-row md:items-center'>
          <span>Pisa, EU</span>
          <span>{m.footer_rights({ year: BUILD_YEAR })}</span>
        </div>
      </div>
    </motion.footer>
  );
};
