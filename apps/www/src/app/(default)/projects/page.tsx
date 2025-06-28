import { FolderCode } from 'lucide-react';
import type { FC } from 'react';
import PageHeader from '~/components/molecules/page-header';

export const metadata = {
  title: 'Projects',
  description: 'A showcase of my work, experiments, and contributions.',
  openGraph: {
    title: 'Projects - Bernardo Forcillo',
    description: 'A showcase of my work, experiments, and contributions.',
    type: 'website',
    url: 'https://bernardoforcillo.com/projects',
    siteName: 'Bernardo Forcillo',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects - Bernardo Forcillo',
    description: 'A showcase of my work, experiments, and contributions.',
  },
};

const Page: FC = () => {
  return (
    <div className='relative'>
      <PageHeader
        icon={<FolderCode className='size-7' />}
        title='Projects'
        description='A showcase of my work, experiments, and contributions.'
      />
    </div>
  );
};

export default Page;
