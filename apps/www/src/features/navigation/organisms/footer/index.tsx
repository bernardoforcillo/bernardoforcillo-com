import { Link } from '@tanstack/react-router';
import { motion } from 'motion/react';
import type { FC } from 'react';
import GithubIcon from '~/assets/icons/github-mark';
import LinkedinMark from '~/assets/icons/linkedin-mark';
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

const LINK_CLASS = 'text-sm text-muted hover:text-ink transition-colors';

export const Footer: FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className='border-t border-line pt-12 pb-8'
    >
      <div className='mx-auto max-w-6xl px-6'>
        <div className='flex flex-col gap-10 md:flex-row md:items-start md:justify-between'>
          <div className='flex flex-col gap-3 max-w-xs'>
            <span className='text-sm font-medium tracking-tight'>
              Bernardo Forcillo
            </span>
            <p className='text-sm text-muted leading-relaxed'>
              Software engineer in Pisa, Italy. Building technologies for
              innovators, professionals, and enthusiasts.
            </p>
          </div>

          <div className='flex flex-wrap gap-x-10 gap-y-8'>
            <div className='flex flex-col gap-3'>
              <span className='text-[11px] uppercase tracking-[0.16em] text-faint'>
                Site
              </span>
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
              <span className='text-[11px] uppercase tracking-[0.16em] text-faint'>
                Legal
              </span>
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
              <span className='text-[11px] uppercase tracking-[0.16em] text-faint'>
                Connect
              </span>
              <ul className='space-y-2'>
                <li>
                  <a
                    href='https://github.com/bernardoforcillo'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors'
                  >
                    <GithubIcon className='w-3.5 h-3.5' />
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href='https://linkedin.com/in/bernardoforcillo'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors'
                  >
                    <LinkedinMark className='w-3.5 h-3.5' />
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href='mailto:hello@bernardoforcillo.com'
                    className='text-sm text-muted hover:text-ink transition-colors'
                  >
                    Email
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className='mt-12 pt-6 border-t border-line flex flex-col md:flex-row justify-between items-start md:items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-faint'>
          <span>TanStack Start · Tailwind · Love</span>
          <span>{m.footer_rights({ year: BUILD_YEAR })}</span>
        </div>
      </div>
    </motion.footer>
  );
};
