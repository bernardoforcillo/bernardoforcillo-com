import { FolderCode } from 'lucide-react';
import type { FC } from 'react';
import PageHeader from '~/components/molecules/page-header';

const Page: FC = () => {
  return (
    <div className='relative'>
      <PageHeader
        pageIcon={<FolderCode className='size-7' />}
        pageTitle={<>Projects</>}
        description={<>A showcase of my work, experiments, and contributions</>}
      />
    </div>
  );
};

export default Page;
