import { pageHead } from '@monorepo/seo';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_bare/wp-admin')({
  head: () =>
    pageHead({
      title: 'No Wordpress Here',
      description: 'Do you really think this is a wordpress site? 🥲.',
      path: '/wp-admin',
    }),
  component: WpAdminPage,
});

function WpAdminPage() {
  return (
    <div className='flex flex-col items-center justify-center h-screen w-screen p-3 mx-auto gap-3'>
      <h1 className='text-4xl font-bold'>
        Do you really think this is a wordpress site? 🥲
      </h1>
    </div>
  );
}
