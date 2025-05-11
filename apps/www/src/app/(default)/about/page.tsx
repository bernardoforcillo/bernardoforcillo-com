import { UserCircle2 } from 'lucide-react';
import type { FC } from 'react';
import PageHeader from '~/components/molecules/page-header';

const Page: FC = () => {
  return (
    <div className='relative'>
      <PageHeader
        pageIcon={<UserCircle2 className='size-7' />}
        pageTitle={<>About</>}
        description={<>About this site</>}
      />
    </div>
  );
};

export default Page;
