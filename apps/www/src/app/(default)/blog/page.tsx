import { BookOpen } from 'lucide-react';
import type { FC } from 'react';
import PageHeader from '~/components/molecules/page-header';

const Page: FC = () => {
  return (
    <div className='relative'>
      <PageHeader
        pageIcon={<BookOpen className='size-7' />}
        pageTitle={<>Blog</>}
        description={
          <>Thoughts, ideas, and insights about technology and development</>
        }
      />
    </div>
  );
};

export default Page;
