'use client';

import { type ComponentRef, forwardRef } from 'react';
import { Separator as AriaSeparator } from 'react-aria-components';

import { cn } from '~/blocks/utils';

interface SeparatorProps {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

const Separator = forwardRef<
  ComponentRef<typeof AriaSeparator>,
  SeparatorProps
>(({ className, orientation = 'horizontal', ...props }, ref) => (
  <AriaSeparator
    ref={ref}
    orientation={orientation}
    className={cn(
      'shrink-0 bg-border',
      orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
      className,
    )}
    {...props}
  />
));

Separator.displayName = 'Separator';

export { Separator };
