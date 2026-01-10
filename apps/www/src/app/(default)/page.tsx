import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import GithubIcon from '~/assets/icons/github-mark';
import LinkedinMark from '~/assets/icons/linkedin-mark';
import { BentoGridSection } from '~/components/organisms/home/bento-grid-section';
import { HeroSection } from '~/components/organisms/home/hero-section';

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

      <main className='min-h-screen max-w-[1400px] mx-auto px-4 md:px-8 py-24 md:py-32 flex flex-col gap-12'>
        <HeroSection />
        <BentoGridSection />
      </main>
    </>
  );
}
