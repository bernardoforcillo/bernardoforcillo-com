import { PageHeader } from '@monorepo/components';
import { createFileRoute } from '@tanstack/react-router';
import { UserCircle2 } from 'lucide-react';
import { pageHead } from '~/lib/seo';

const DESCRIPTION = 'About Bernardo';

export const Route = createFileRoute('/_default/about')({
  head: () =>
    pageHead({
      title: 'About',
      description: DESCRIPTION,
      path: '/about',
    }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className='relative'>
      <PageHeader
        icon={<UserCircle2 className='size-7' />}
        title='About'
        description={DESCRIPTION}
      />
    </div>
  );
}
