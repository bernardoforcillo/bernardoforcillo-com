import { createFileRoute } from '@tanstack/react-router';
import { latestWriting, projects } from '~/content';
import { featuredProjects } from '~/features/home/featured';
import { ClosingCtaSection } from '~/features/home/organisms/closing-cta-section';
import { ExploreSection } from '~/features/home/organisms/explore-section';
import { FeaturedWorkSection } from '~/features/home/organisms/featured-work-section';
import { HeroSection } from '~/features/home/organisms/hero-section';
import { LatestWritingSection } from '~/features/home/organisms/latest-writing-section';
import { NowSection } from '~/features/home/organisms/now-section';
import { PracticeSection } from '~/features/home/organisms/practice-section';
import { StackStrip } from '~/features/home/organisms/stack-strip';
import {
  SITE_DESCRIPTION,
  TITLE_ABSOLUTE,
  buildHomeJsonLdGraph,
  pageHead,
} from '~/lib/seo';

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
    <>
      <HeroSection />
      <StackStrip />
      <PracticeSection />
      <NowSection />
      <FeaturedWorkSection projects={featuredProjects(projects)} />
      <ExploreSection />
      <LatestWritingSection items={latestWriting} />
      <ClosingCtaSection />
    </>
  );
}
