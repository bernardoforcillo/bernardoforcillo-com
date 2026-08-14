import { pageHead } from '@monorepo/seo';
import { createFileRoute } from '@tanstack/react-router';
import { NotFound } from '~/features/navigation/molecules/not-found';

export const Route = createFileRoute('/_default/404')({
  head: () =>
    pageHead({
      title: 'Page not found',
      description: 'The page you were looking for does not exist.',
      path: '/404',
      noIndex: true,
    }),
  component: NotFoundPage,
});

function NotFoundPage() {
  return <NotFound />;
}
