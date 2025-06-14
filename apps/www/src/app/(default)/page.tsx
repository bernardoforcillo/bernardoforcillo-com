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
      name: 'Bernardo Forcillo - A Polymath Software Builder',
      description:
        'Building technologies for innovators, professionals and enthusiasts.',
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
      <script id='schema' type='application/ld+json'>
        {JSON.stringify(schema)}
      </script>

      {/* Hero Section */}
      <section className='min-h-screen flex items-center justify-center px-4 py-20'>
        <div className='max-w-4xl mx-auto text-center space-y-12'>
          <div className='space-y-8'>
            <div className='inline-flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full'>
              <span className='w-2 h-2 bg-green-500 rounded-full animate-pulse' />
              Currently building at{' '}
              <span className='font-medium'>
                <a href='https://ganiga.ai'>Ganiga Innovation</a>
              </span>
            </div>

            <h1 className='text-5xl md:text-7xl font-bold text-gray-900'>
              I'm Bernardo
            </h1>

            <p className='text-2xl md:text-3xl text-gray-700'>
              but I am usually called bern
            </p>

            <p className='text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto'>
              I work with modern web technologies, and explore the world of
              software development, digital craftsmanship, and entrepreneurship.
            </p>
          </div>

          <div className='flex flex-col sm:flex-row items-center justify-center gap-6'>
            <Link
              href='/about'
              className='group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-xl hover:from-gray-800 hover:to-gray-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
            >
              <span className='font-medium'>Discover My Journey</span>
              <ArrowRight
                size={18}
                className='group-hover:translate-x-1 transition-transform duration-300'
              />
            </Link>
            <Link
              href='/projects'
              className='group inline-flex items-center gap-3 px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1'
            >
              <span className='font-medium'>View My Work</span>
              <ArrowRight
                size={18}
                className='group-hover:translate-x-1 transition-transform duration-300'
              />
            </Link>
          </div>

          <div className='flex items-center justify-center gap-4 pt-8'>
            <nav aria-label='Social media links'>
              <ul className='flex gap-2 py-2'>
                <li>
                  <a
                    href='http://github.com/bernardoforcillo'
                    target='_blank'
                    rel='noreferrer'
                    aria-label="Visit Bernardo Forcillo's GitHub profile"
                    className='inline-flex focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azure-radiance-600'
                  >
                    <GithubIcon className='size-8' aria-hidden='true' />
                  </a>
                </li>
                <li>
                  <a
                    href='http://linkedin.com/in/bernardoforcillo'
                    target='_blank'
                    rel='noreferrer'
                    aria-label="Visit Bernardo Forcillo's LinkedIn profile"
                    className='inline-flex items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azure-radiance-600'
                  >
                    <LinkedinMark className='size-9' aria-hidden='true' />
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </>
  );
}
