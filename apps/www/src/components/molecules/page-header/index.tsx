import type { FC, HTMLProps, ReactNode } from 'react';

type Props = {
  pageIcon: ReactNode;
  pageTitle: ReactNode;
  description: ReactNode;
  children?: ReactNode;
} & HTMLProps<HTMLDivElement>;

const PageHeader: FC<Props> = (props) => {
  return (
    <div className='page-layout text-center pb-12 pt-28 md:pb-20 md:pt-36 flex flex-col space-y-4 items-center justify-center'>
      <div className='isolate before:transition-opacity size-11 rounded-xl flex items-center justify-center relative bg-white/5 backdrop-blur-sm border'>
        {props.pageIcon}
      </div>
      <h1 className='font-bold leading-tight text-4xl md:text-6xl mt-3 sm:mt-2'>
        {props.pageTitle}
      </h1>
      <p className='text-lg text-gray-600 sm:mt-0 mt-2 max-w-2xl'>
        {props.description}
      </p>
      {props.children && <div className='mt-4 w-full'>{props.children}</div>}
    </div>
  );
};

export default PageHeader;
