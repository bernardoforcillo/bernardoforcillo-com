import { pageHead } from '@monorepo/seo';
import { PageHeader } from '@monorepo/ui';
import { createFileRoute } from '@tanstack/react-router';
import { Shield } from 'lucide-react';

const DESCRIPTION = 'Privacy policy, terms of use, and other legal information';

export const Route = createFileRoute('/_default/policies/')({
  head: () =>
    pageHead({
      title: 'Policies',
      description: DESCRIPTION,
      path: '/policies',
    }),
  component: PoliciesPage,
});

function PoliciesPage() {
  return (
    <div className='relative'>
      <PageHeader
        icon={<Shield className='size-7' />}
        title='Policies'
        description={DESCRIPTION}
      />
    </div>
  );
}
