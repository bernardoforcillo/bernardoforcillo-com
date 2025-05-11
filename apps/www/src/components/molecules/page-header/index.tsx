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
      <h1 className='font-bold leading-1 text-6xl mt-5 sm:mt-4 h2 sm:h1'>
        {props.pageTitle}
      </h1>
      <p data-fade='3' className='b1 sm:mt-1 mt-3'>
        {props.description}
      </p>
      {props.children && (
        <div data-fade='3' className='mt-7 w-full'>
          {props.children}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
