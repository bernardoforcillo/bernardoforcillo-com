import type { FC, HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

type Props = {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
} & Omit<HTMLAttributes<HTMLDivElement>, 'role'>;

export const Separator: FC<Props> = ({
  className,
  orientation = 'horizontal',
  ...props
}) => (
  // biome-ignore lint/a11y/useFocusableInteractive: decorative separator, not a focusable splitter
  <div
    role='separator'
    aria-orientation={orientation}
    className={cn(
      'shrink-0 bg-gray-200',
      orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
      className,
    )}
    {...props}
  />
);
