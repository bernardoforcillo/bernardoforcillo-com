import type { HTMLAttributes } from 'react';
import { cn } from '~/components/utils';

type ContainerProps = {} & HTMLAttributes<HTMLDivElement>;

export default function Container({ className, ...props }: ContainerProps) {
  className = cn('max-w-screen-xl mx-auto p-5', className);
  return <div className={className} {...props} />;
}
