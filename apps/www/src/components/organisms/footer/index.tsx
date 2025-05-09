import type { FC } from 'react';

export const Footer: FC = () => {
  return (
    <div className='mt-64 flex w-full py-10'>
      <div className='mx-auto h-full w-full max-w-5xl px-8 2xl:px-0'>
        <div className='flex flex-col gap-20'>
          <div className='flex flex-col justify-between gap-y-8 text-center md:flex-row md:text-left'>
            <span className='text-grey text-sm md:text-base'>
              &copy; {new Date().getFullYear()} Bernardo Forcillo
            </span>
            <span className='text-grey text-sm md:text-base'>
              Proudly built in Europe by humans
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
