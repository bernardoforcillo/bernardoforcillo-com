import { StickyNote } from 'lucide-react';
import type { FC } from 'react';
import PageHeader from '~/components/molecules/page-header';

const Page: FC = () => {
  return (
    <div className='relative'>
      <PageHeader
        pageIcon={<StickyNote className='size-7' />}
        pageTitle={<>Notes</>}
        description={<>Quick thoughts, snippets, and personal observations</>}
      />
    </div>
  );
};

export default Page;
