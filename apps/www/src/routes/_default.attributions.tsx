import { SITE_DESCRIPTION, pageHead } from '@monorepo/seo';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_default/attributions')({
  // No `title`: this page exported no metadata under Next and inherited the
  // root default, `Bernardo Forcillo`.
  head: () =>
    pageHead({
      description: SITE_DESCRIPTION,
      path: '/attributions',
    }),
  component: AttributionsPage,
});

function AttributionsPage() {
  return <div>Hello</div>;
}
