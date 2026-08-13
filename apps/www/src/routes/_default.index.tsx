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
    <div className='min-h-screen max-w-[1400px] mx-auto px-4 md:px-8 py-24 md:py-32 flex flex-col gap-12'>
      <HeroSection />
      <StatsBar />
      <BentoGridSection />
    </div>
  );
}
