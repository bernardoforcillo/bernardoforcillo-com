import type { FC, ReactNode } from 'react';
import { cn } from '../../lib/cn';

type Props = {
  children: ReactNode;
  className?: string;
};

export const Rail: FC<Props> = ({ children, className }) => (
  <div
    className={cn(
      // No side rules: the column is held by its measure and whitespace alone.
      'mx-auto min-h-screen w-full max-w-[1100px]',
      className,
    )}
  >
    {children}
  </div>
);
