import { BookOpen } from 'lucide-react';
import type { FC } from 'react';
import PageHeader from '~/components/molecules/page-header';

export const metadata = {
  title: 'Thoughts, ideas, and insights about technology and development',
  description:
    'Thoughts, ideas, and insights about technology and development.',
  openGraph: {
    title: 'Blog - Bernardo Forcillo',
    description:
      'Thoughts, ideas, and insights about technology and development.',
    type: 'website',
    url: 'https://bernardoforcillo.com/blog',
    siteName: 'Bernardo Forcillo',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Bernardo Forcillo',
    description:
      'Thoughts, ideas, and insights about technology and development.',
  },
};

const Page: FC = () => {
  return (
    <div className='relative'>
      <PageHeader
        icon={<BookOpen className='size-7' />}
        title='Blog'
        description='Thoughts, ideas, and insights about technology and development.'
      />
    </div>
  );
};

export default Page;
