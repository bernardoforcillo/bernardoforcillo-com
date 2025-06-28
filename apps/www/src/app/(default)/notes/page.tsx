import { StickyNote } from 'lucide-react';
import type { FC } from 'react';
import PageHeader from '~/components/molecules/page-header';

export const metadata = {
  title: 'Notes',
  description: 'Quick thoughts, snippets, and personal observations',
  openGraph: {
    title: 'Notes - Bernardo Forcillo',
    description: 'Quick thoughts, snippets, and personal observations',
    type: 'website',
    url: 'https://bernardoforcillo.com/notes',
    siteName: 'Bernardo Forcillo',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Notes - Bernardo Forcillo',
    description: 'Quick thoughts, snippets, and personal observations',
  },
};

const Page: FC = () => {
  return (
    <div className='relative'>
      <PageHeader
        icon={<StickyNote className='size-7' />}
        title='Notes'
        description='Quick thoughts, snippets, and personal observations'
      />
    </div>
  );
};

export default Page;
