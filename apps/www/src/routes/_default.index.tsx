import {
  SITE_DESCRIPTION,
  TITLE_ABSOLUTE,
  buildHomeJsonLdGraph,
  pageHead,
} from '@monorepo/seo';
import { createFileRoute } from '@tanstack/react-router';
import { BentoGridSection } from '~/features/home/organisms/bento-grid-section';
import { HeroSection } from '~/features/home/organisms/hero-section';
import { StatsBar } from '~/features/home/organisms/stats-bar';

export const Route = createFileRoute('/_default/')({
  head: () =>
    pageHead({
      absoluteTitle: TITLE_ABSOLUTE,
      description: SITE_DESCRIPTION,
      path: '/',
      jsonLd: [buildHomeJsonLdGraph()],
    }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className='mx-auto flex min-h-screen max-w-6xl flex-col gap-4 px-6 pb-24 pt-28 md:px-8 md:pb-32 md:pt-32'>
      <HeroSection />
      <StatsBar />
      <BentoGridSection />
    </div>
  );
}
