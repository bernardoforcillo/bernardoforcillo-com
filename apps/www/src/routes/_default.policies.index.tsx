import { PageHeader } from '@monorepo/components';
import { Link, createFileRoute } from '@tanstack/react-router';
import { Shield } from 'lucide-react';
import { ContentRow } from '~/features/content/molecules/content-row';
import { ROW_CLASS } from '~/features/content/styles';
import { pageHead } from '~/lib/seo';

const DESCRIPTION = 'Privacy policy, terms of use, and other legal information';

const POLICIES = [
  { to: '/policies/privacy-policy', title: 'Privacy policy' },
  { to: '/policies/cookies-policy', title: 'Cookies policy' },
  { to: '/attributions', title: 'Attributions' },
] as const;

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

      <section>
        {POLICIES.map((policy) => (
          <Link key={policy.to} to={policy.to} className={ROW_CLASS}>
            <ContentRow title={policy.title} meta='Legal' />
          </Link>
        ))}
      </section>
    </div>
  );
}
