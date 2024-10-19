import { cn } from '~/components/utils';
import { GridPattern } from '~/components/atoms/grid-background';

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
      <script
        id='schema'
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className='relative flex h-screen w-full flex-col items-center justify-center overflow-hidden'>
        <div className='max-w-5xl space-y-2 text-balance p-4'>
          <h1 className='pointer-events-none whitespace-pre-wrap text-4xl font-semibold leading-tight text-black sm:text-5xl md:text-7xl'>
            Analyse, develop and launch&nbsp;
            <span className='text-sky-600'>digital products</span>.
          </h1>
          <p className='prose'>
            Hi, I&apos;m&nbsp;
            <span id='name' itemID='https://bernardoforcillo.com/#person'>
              Bernardo Forcillo
            </span>
            , a polymath software builder and computer science student at
            the&nbsp;
            <span>University of Basilicata</span>. Based in south of Italy,
            among the hills near Matera with a passion for technology and
            innovation.
          </p>
        </div>
        <GridPattern
          width={30}
          height={30}
          x={-1}
          y={-1}
          strokeDasharray={'4 2'}
          className={cn(
            '[mask-image:linear-gradient(to_bottom,white,transparent,transparent)] ',
          )}
        />
      </section>
    </>
  );
}
