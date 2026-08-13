import { SITE_DESCRIPTION, pageHead } from '@monorepo/seo';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_default/policies/privacy-policy')({
  // No `title`: inherits the root default, as it did under Next.
  head: () =>
    pageHead({
      description: SITE_DESCRIPTION,
      path: '/policies/privacy-policy',
    }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return <div>Hello</div>;
}
