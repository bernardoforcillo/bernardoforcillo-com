import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type ContainerProps = {} & HTMLAttributes<HTMLDivElement>;

export default function Container({ className, ...props }: ContainerProps) {
  className = twMerge('max-w-screen-xl mx-auto p-5', className);
  return <div className={className} {...props} />;
}
