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
      name: 'Bernardo Forcillo - Software builder, Digital Artisan and Indie Entrepreneur',
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
      <section
        className='h-screen overflow-hidden p-3 relative'
        aria-labelledby='hero-heading'
      >
        <div className='relative h-full w-full rounded-xl'>
          <div className='mx-auto h-full max-w-5xl px-8 2xl:px-0'>
            <div className='flex h-full items-center px-2 md:px-0'>
              <div className='flex flex-col gap-20'>
                <div className='text-4xl md:text-5xl xl:text-[3.6rem]'>
                  <div className='max-w-5xl space-y-4 text-balance'>
                    <h1
                      id='hero-heading'
                      className='whitespace-pre-wrap font-semibold leading-tight'
                    >
                      Analyse, develop and launch&nbsp;
                      <span className='text-azure-radiance-600'>
                        digital products
                      </span>
                    </h1>
                  </div>
                </div>

                <div className='flex items-center gap-4 text-2xl'>
                  <ArrowRight aria-hidden='true' />
                  <span className='hidden md:block'>Want to reach out?</span>
                  <a
                    href='mailto:me@bernardoforcillo.com'
                    className='focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azure-radiance-600'
                  >
                    Get in touch!
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className='absolute bottom-8 left-0 right-0 flex justify-center'>
            <Link
              href='#about'
              className='px-3 py-2 text-sm font-medium text-center text-white bg-azure-radiance-600 rounded-lg hover:bg-azure-radiance-700 focus:ring-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-azure-radiance-300 transition-all duration-300'
              aria-label='Learn more about Bernardo Forcillo'
            >
              More about me
              <ArrowRight
                className='ml-2 inline-block transform rotate-90 animate-bounce'
                size={16}
                aria-hidden='true'
              />
            </Link>
          </div>
        </div>
      </section>
      <section id='about' className='pt-40' aria-labelledby='about-heading'>
        <div className='mx-auto max-w-5xl px-8 2xl:px-0'>
          <div className='flex items-start gap-44' />
          <div className='flex flex-col gap-8 text-xl font-normal text-foreground sm:text-[1.34rem]'>
            <h2 id='about-heading' className='sr-only'>
              About Bernardo Forcillo
            </h2>
            <p>
              Hi, I&apos;m&nbsp;
              <span
                itemProp='name'
                itemScope
                itemType='https://schema.org/Person'
              >
                Bernardo Forcillo
              </span>
              , a polymath software builder and computer science student at
              the&nbsp;
              <span>University of Basilicata</span>. Based in south of Italy,
              among the hills near Matera with a passion for technology and
              innovation.
            </p>
            <p>
              I help businesses, startups, and entrepreneurs build efficient,
              maintainable, and scalable software. Whether it's designing robust
              backend systems, creating seamless cross-platform experiences, or
              integrating AI-driven automation, I bring a problem-solving
              mindset and a passion for innovation to every project.
            </p>
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
