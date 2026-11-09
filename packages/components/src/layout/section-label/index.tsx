import type { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  id?: string;
};

// Two hairlines that fade into the page on either side of the pill, so a
// section opens on a soft break rather than a hard ruled band.
export const SectionLabel: FC<Props> = ({ children, id }) => (
  <div id={id} className='flex items-center gap-4 px-6 pt-20 pb-8 sm:px-10'>
    <span
      aria-hidden='true'
      className='h-px flex-1 bg-linear-to-r from-transparent to-deep-blue-200'
    />
    <span className='inline-block rounded-full border border-deep-blue-200 bg-white px-4 py-1.5 text-[13px] font-medium tracking-[-0.005em] text-deep-blue-600 shadow-[0_1px_2px_rgb(9_49_141/0.04)]'>
      {children}
    </span>
    <span
      aria-hidden='true'
      className='h-px flex-1 bg-linear-to-l from-transparent to-deep-blue-200'
    />
  </div>
);
