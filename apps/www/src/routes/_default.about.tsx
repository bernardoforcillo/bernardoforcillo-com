import { PageHeader } from '@monorepo/components';
import { createFileRoute } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import GithubIcon from '~/assets/icons/github-mark';
import LinkedinMark from '~/assets/icons/linkedin-mark';
import XMark from '~/assets/icons/x-mark';
import { ClosingCtaSection } from '~/features/home/organisms/closing-cta-section';
import { NowSection } from '~/features/home/organisms/now-section';
import { PracticeSection } from '~/features/home/organisms/practice-section';
import { FOCUS_RING } from '~/features/home/styles';
import { pageHead } from '~/lib/seo';

// Kept as-is: the document description is part of the SEO parity baseline.
const DESCRIPTION = 'About Bernardo';

const PROFILES = [
  {
    label: 'GitHub',
    handle: 'bernardoforcillo',
    href: 'https://github.com/bernardoforcillo',
    icon: <GithubIcon aria-hidden='true' className='h-4 w-4' />,
  },
  {
    label: 'LinkedIn',
    handle: 'in/bernardoforcillo',
    href: 'https://linkedin.com/in/bernardoforcillo',
    icon: <LinkedinMark aria-hidden='true' className='h-4 w-4' />,
  },
  {
    label: 'X',
    handle: '@bernforcillo',
    href: 'https://x.com/bernforcillo',
    icon: <XMark aria-hidden='true' className='h-3.5 w-3.5' />,
  },
];

export const Route = createFileRoute('/_default/about')({
  head: () =>
    pageHead({
      title: 'About',
      description: DESCRIPTION,
      path: '/about',
    }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHeader
        title='About'
        description='Polymath software engineer. Distributed systems, high-performance products, and AI infrastructure.'
      />

      <section
        aria-label='Introduction'
        className='grid border-b border-deep-blue-200 md:grid-cols-[1fr_1.2fr]'
      >
        <div className='border-b border-deep-blue-200 px-6 py-11 md:border-b-0 md:border-r md:px-10'>
          <p className='font-serif text-[28px] italic leading-[1.2] text-deep-blue-700 md:text-[34px]'>
            Be relentless. Act different. Ship fast.
          </p>
        </div>
        <div className='space-y-4 px-6 py-11 text-base leading-[1.75] text-deep-blue-800 md:px-10'>
          <p>
            I work where research meets production: independent thinking and
            deep engineering for systems that move from research to reality.
          </p>
          <p>
            Right now I am at{' '}
            <a
              href='https://ganiga.ai'
              target='_blank'
              rel='noopener noreferrer'
              className={`rounded-sm text-azure-radiance-700 underline decoration-azure-radiance-300 underline-offset-4 hover:decoration-azure-radiance-700 ${FOCUS_RING}`}
            >
              Ganiga Innovation
            </a>
            , building infrastructure and products.
          </p>
          <ul className='flex flex-wrap gap-2.5 pt-3'>
            {PROFILES.map((profile) => (
              <li key={profile.href}>
                <a
                  href={profile.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={`inline-flex items-center gap-2 rounded-full border border-deep-blue-200 bg-white py-1.5 pl-3 pr-3.5 text-sm text-deep-blue-900 transition-colors hover:bg-deep-blue-50 ${FOCUS_RING}`}
                >
                  {profile.icon}
                  <span className='sr-only'>{profile.label}: </span>
                  {profile.handle}
                  <ArrowUpRight
                    size={14}
                    aria-hidden='true'
                    className='text-deep-blue-400'
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PracticeSection />
      <NowSection />
      <ClosingCtaSection />
    </>
  );
}
