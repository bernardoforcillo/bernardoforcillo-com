import type { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  id?: string;
};

export const SectionLabel: FC<Props> = ({ children, id }) => (
  <div
    id={id}
    className='border-b border-deep-blue-200 bg-hatch py-7 text-center'
  >
    <span className='inline-block rounded-full border border-deep-blue-200 bg-white px-4 py-1.5 text-xs uppercase tracking-[0.14em] text-deep-blue-600'>
      {children}
    </span>
  </div>
);
