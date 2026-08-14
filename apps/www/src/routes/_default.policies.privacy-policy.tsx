import { SITE_DESCRIPTION, TITLE_ABSOLUTE, pageHead } from '@monorepo/seo';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_default/policies/privacy-policy')({
  // This page declared no metadata title under Next, so it inherited the
  // root layout, whose title.absolute shadows title.default for every
  // descendant without a title of its own. tests/seo-baseline.json records
  // the string Next actually emitted here.
  head: () =>
    pageHead({
      absoluteTitle: TITLE_ABSOLUTE,
      description: SITE_DESCRIPTION,
      path: '/policies/privacy-policy',
    }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return <div>Hello</div>;
}
