import { Shield } from 'lucide-react';
import type { FC } from 'react';
import PageHeader from '~/components/molecules/page-header';

export const metadata = {
  title: 'Policies',
  description: 'Privacy policy, terms of use, and other legal information',
  openGraph: {
    title: 'Policies - Bernardo Forcillo',
    description: 'Privacy policy, terms of use, and other legal information',
    type: 'website',
    url: 'https://bernardoforcillo.com/policies',
    siteName: 'Bernardo Forcillo',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Policies - Bernardo Forcillo',
    description: 'Privacy policy, terms of use, and other legal information',
  },
};

const Page: FC = () => {
  return (
    <div className='relative'>
      <PageHeader
        icon={<Shield className='size-7' />}
        title='Policies'
        description='Privacy policy, terms of use, and other legal information'
      />
    </div>
  );
};

export default Page;
