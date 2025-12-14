import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import GithubIcon from '~/assets/icons/github-mark';
import LinkedinMark from '~/assets/icons/linkedin-mark';

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': 'https://bernardoforcillo.com/#person',
      name: 'Bernardo Forcillo',
      givenName: 'Bernardo',
      familyName: 'Forcillo',
      url: 'https://bernardoforcillo.com/',
      jobTitle: 'Software Engineer',
      birthDate: '2000-04-13T10:30:00.000+02:00',
      birthPlace: {
        '@context': 'https://schema.org',
        '@type': 'Place',
        address: {
          '@context': 'https://schema.org',
          '@type': 'PostalAddress',
          addressLocality: 'Taranto',
          postalCode: '74121',
          addressRegion: 'TA',
          addressCountry: 'IT',
        },
      },
      homeLocation: [
        {
          '@context': 'https://schema.org',
          '@type': 'Place',
          name: 'Bernalda',
          address: {
            '@context': 'https://schema.org',
            '@type': 'PostalAddress',
            addressLocality: 'Bernalda',
            postalCode: '75012',
            addressRegion: 'MT',
            addressCountry: 'IT',
          },
        },
      ],
      memberOf: {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': 'https://syskrack.org/#organization',
        name: 'A.P.S. Syskrack Giuseppe Porsia',
        url: 'https://syskrack.org',
      },
      worksFor: {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Ganiga Innovation',
        url: 'https://ganiga.ai',
      },
      sameAs: [
        'https://g.co/kgs/vQk8YD',
        'https://www.facebook.com/bforcillo',
        'https://github.com/bernardoforcillo',
        'https://bernardoforcillo.com/#person',
        'https://orcid.org/0000-0003-3536-0244',
        'https://www.wikidata.org/wiki/Q111416328',
        'https://www.facebook.com/bernardo.forcillo',
        'https://www.instagram.com/bernardoforcillo',
        'https://www.linkedin.com/in/bernardoforcillo/',
        'https://www.youtube.com/channel/UClKcECSWHukazKYnN5tTjSQ',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': 'https://bernardoforcillo.com/#website',
      url: 'https://bernardoforcillo.com/',
      name: 'Website of Bernardo Forcillo',
      author: {
        '@context': 'https://schema.org',
        '@type': 'Person',
        '@id': 'https://bernardoforcillo.com/#person',
        name: 'Bernardo Forcillo',
        givenName: 'Bernardo',
        familyName: 'Forcillo',
      },
      accountablePerson: {
        '@context': 'https://schema.org',
        '@type': 'Person',
        '@id': 'https://bernardoforcillo.com/#person',
        name: 'Bernardo Forcillo',
        givenName: 'Bernardo',
        familyName: 'Forcillo',
      },
      copyrightHolder: {
        '@context': 'https://schema.org',
        '@type': 'Person',
        '@id': 'https://bernardoforcillo.com/#person',
        name: 'Bernardo Forcillo',
        givenName: 'Bernardo',
        familyName: 'Forcillo',
      },
      maintainer: {
        '@context': 'https://schema.org',
        '@type': 'Person',
        '@id': 'https://bernardoforcillo.com/#person',
        name: 'Bernardo Forcillo',
        givenName: 'Bernardo',
        familyName: 'Forcillo',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Bernardo Forcillo - Software Engineer & Polymath Builder',
      description:
        'Software Engineer building technologies for innovators, professionals and enthusiasts.',
      url: 'https://bernardoforcillo.com/',
      inLanguage: 'en',
      isPartOf: {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': 'https://bernardoforcillo.com/#website',
        url: 'https://bernardoforcillo.com/',
      },
      mainEntityOfPage: 'https://bernardoforcillo.com/',
      subjectOf: {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': 'https://bernardoforcillo.com/#website',
        url: 'https://bernardoforcillo.com/',
        name: 'Bernardo Forcillo - Sito Web',
      },
      publisher: {
        '@context': 'https://schema.org',
        '@type': 'Person',
        '@id': 'https://bernardoforcillo.com/#person',
        name: 'Bernardo Forcillo',
        givenName: 'Bernardo',
        familyName: 'Forcillo',
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script id='schema' type='application/ld+json'>
        {JSON.stringify(schema)}
      </script>

      <main className='min-h-screen px-6 pb-12 pt-32 md:px-12 md:pb-12 md:pt-40 lg:px-24 lg:pt-48 max-w-7xl mx-auto space-y-16'>
        {/* Header Section */}
        <header className='space-y-6'>
          <h1 className='text-6xl md:text-8xl font-bold tracking-tighter text-black'>
            Bernardo Forcillo.
          </h1>

          <div className='font-mono text-lg md:text-xl text-gray-600 border-l-2 border-gray-200 pl-4 py-1'>
            &gt; Software Engineer & Polymath.
            <br />
            &gt; Building scalable systems at{' '}
            <a
              href='https://ganiga.ai'
              target='_blank'
              rel='noopener noreferrer'
              className='underline hover:text-black transition-colors'
            >
              Ganiga Innovation
            </a>
            .
          </div>
        </header>

        {/* Grid Layout */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {/* Main Bio Card */}
          <div className='md:col-span-2 p-8 border border-gray-200 bg-white hover:border-black transition-colors duration-300'>
            <h2 className='font-mono text-sm text-gray-500 mb-4'>README.md</h2>
            <p className='text-xl md:text-2xl leading-relaxed font-medium'>
              I am a software engineer obsessed with craftsmanship. I build
              tools for functionality, precision, and speed. Currently focused
              on distributed systems and AI infrastructure.
            </p>
          </div>

          {/* Connect Card */}
          <div className='p-8 border border-gray-200 bg-white hover:border-black transition-colors duration-300 flex flex-col justify-between'>
            <div>
              <h2 className='font-mono text-sm text-gray-500 mb-4'>CONNECT</h2>
              <ul className='space-y-2'>
                <li>
                  <a
                    href='https://github.com/bernardoforcillo'
                    className='flex items-center gap-2 hover:underline decoration-1 underline-offset-4'
                  >
                    <GithubIcon className='w-5 h-5' />
                    <span>GitHub</span>
                  </a>
                </li>
                <li>
                  <a
                    href='https://linkedin.com/in/bernardoforcillo'
                    className='flex items-center gap-2 hover:underline decoration-1 underline-offset-4'
                  >
                    <LinkedinMark className='w-5 h-5' />
                    <span>LinkedIn</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className='mt-8 font-mono text-xs text-gray-400'>
              EST. 2000
            </div>
          </div>

          {/* Projects Link */}
          <Link
            href='/projects'
            className='group p-8 border border-gray-200 bg-white hover:bg-black hover:text-white transition-all duration-300 flex flex-col justify-between aspect-square md:aspect-auto'
          >
            <h2 className='font-mono text-sm text-gray-500 group-hover:text-gray-400 mb-4'>
              WORK
            </h2>
            <div className='flex items-center justify-between'>
              <span className='text-2xl font-bold'>Projects</span>
              <ArrowRight className='w-6 h-6 transform group-hover:-rotate-45 transition-transform duration-300' />
            </div>
          </Link>

          {/* About Link */}
          <Link
            href='/about'
            className='group md:col-span-2 p-8 border border-gray-200 bg-white hover:bg-black hover:text-white transition-all duration-300 flex items-center justify-between'
          >
            <div className='space-y-1'>
              <h2 className='font-mono text-sm text-gray-500 group-hover:text-gray-400'>
                PROFILE
              </h2>
              <span className='text-2xl font-bold'>About Me & Journey</span>
            </div>
            <ArrowRight className='w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300' />
          </Link>
        </div>
      </main>
    </>
  );
}
