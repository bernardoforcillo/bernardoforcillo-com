import { UserCircle2 } from 'lucide-react';
import type { FC } from 'react';
import PageHeader from '~/components/molecules/page-header';

export const metadata = {
  title: 'About',
  description: 'About Bernardo',
  openGraph: {
    title: 'About - Bernardo Forcillo',
    description: 'About Bernardo',
    type: 'website',
    url: 'https://bernardoforcillo.com/about',
    siteName: 'Bernardo Forcillo',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About - Bernardo Forcillo',
    description: 'About Bernardo',
  },
};

const Page: FC = () => {
  return (
    <div className='relative'>
      <PageHeader
        icon={<UserCircle2 className='size-7' />}
        title='About'
        description='About Bernardo'
      />
    </div>
  );
};

export default Page;
