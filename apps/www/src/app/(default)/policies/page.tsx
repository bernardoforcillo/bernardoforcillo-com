import { Shield } from 'lucide-react';
import type { FC } from 'react';
import PageHeader from '~/components/molecules/page-header';

const Page: FC = () => {
  return (
    <div className='relative'>
      <PageHeader
        pageIcon={<Shield className='size-7' />}
        pageTitle={<>Policies</>}
        description={
          <>Privacy policy, terms of use, and other legal information</>
        }
      />
    </div>
  );
};

export default Page;
