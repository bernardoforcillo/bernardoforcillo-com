'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import type { FC } from 'react';
import GithubIcon from '~/assets/icons/github-mark';
import LinkedinMark from '~/assets/icons/linkedin-mark';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Projects', href: '/projects' },
  { label: 'Notes', href: '/notes' },
  { label: 'About', href: '/about' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/policies/privacy-policy' },
  { label: 'Cookies Policy', href: '/policies/cookies-policy' },
  { label: 'Attributions', href: '/attributions' },
];

export const Footer: FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className='border-t border-gray-200 pt-16 pb-8 bg-white'
    >
      <div className='mx-auto max-w-7xl px-6'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-gray-100'>
          {/* Brand */}
          <div className='flex flex-col gap-4'>
            <span className='font-bold tracking-tighter text-xl'>
              BERNARDO FORCILLO.
            </span>
            <p className='text-xs font-mono text-gray-400 leading-relaxed max-w-xs'>
              Software Engineer building technologies for innovators,
              professionals and enthusiasts.
            </p>
            <span className='font-mono text-xs text-gray-300 uppercase tracking-wider'>
              Pisa, Italy — EU · CET/CEST
            </span>
          </div>

          {/* Navigation */}
          <div className='flex flex-col gap-4'>
            <span className='font-mono text-xs text-gray-400 uppercase tracking-wider'>
              Navigation
            </span>
            <ul className='space-y-2'>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className='text-sm text-gray-600 hover:text-black transition-colors font-medium'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className='flex flex-col gap-4'>
            <span className='font-mono text-xs text-gray-400 uppercase tracking-wider'>
              Legal
            </span>
            <ul className='space-y-2'>
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className='text-sm text-gray-600 hover:text-black transition-colors font-medium'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className='flex flex-col gap-4'>
            <span className='font-mono text-xs text-gray-400 uppercase tracking-wider'>
              Connect
            </span>
            <ul className='space-y-3'>
              <li>
                <a
                  href='https://github.com/bernardoforcillo'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors'
                >
                  <GithubIcon className='w-4 h-4' />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href='https://linkedin.com/in/bernardoforcillo'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors'
                >
                  <LinkedinMark className='w-4 h-4' />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href='mailto:hello@bernardoforcillo.com'
                  className='flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors'
                >
                  <span className='w-4 h-4 flex items-center justify-center font-mono text-xs border rounded-full border-gray-400'>
                    @
                  </span>
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className='pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-xs font-mono text-gray-400 uppercase tracking-wide'>
          <span>Built with Next.js, Tailwind, & Love.</span>
          <span>
            &copy; {new Date().getFullYear()} Bernardo Forcillo — All Rights
            Reserved.
          </span>
        </div>
      </div>
    </motion.footer>
  );
};
