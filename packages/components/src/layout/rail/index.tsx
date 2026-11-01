import type { FC, ReactNode } from 'react';
import { cn } from '../../lib/cn';

type Props = {
  children: ReactNode;
  className?: string;
};

export const Rail: FC<Props> = ({ children, className }) => (
  <div
    className={cn(
      'mx-auto min-h-screen w-full max-w-[1100px] border-deep-blue-200 bg-white sm:border-x',
      className,
    )}
  >
    {children}
  </div>
);
