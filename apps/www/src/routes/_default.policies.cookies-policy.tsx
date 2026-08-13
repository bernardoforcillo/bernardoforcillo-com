import { SITE_DESCRIPTION, pageHead } from '@monorepo/seo';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_default/policies/cookies-policy')({
  // No `title`: inherits the root default, as it did under Next.
  head: () =>
    pageHead({
      description: SITE_DESCRIPTION,
      path: '/policies/cookies-policy',
    }),
  component: CookiesPolicyPage,
});

function CookiesPolicyPage() {
  return <div>Hello</div>;
}
