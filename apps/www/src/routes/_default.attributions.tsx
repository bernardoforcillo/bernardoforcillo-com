import { SITE_DESCRIPTION, TITLE_ABSOLUTE, pageHead } from '@monorepo/seo';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_default/attributions')({
  // This page declared no metadata title under Next, so it inherited the
  // root layout, whose title.absolute shadows title.default for every
  // descendant without a title of its own. tests/seo-baseline.json records
  // the string Next actually emitted here.
  head: () =>
    pageHead({
      absoluteTitle: TITLE_ABSOLUTE,
      description: SITE_DESCRIPTION,
      path: '/attributions',
    }),
  component: AttributionsPage,
});

function AttributionsPage() {
  return <div>Hello</div>;
}
