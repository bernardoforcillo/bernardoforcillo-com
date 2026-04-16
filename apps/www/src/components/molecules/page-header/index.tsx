'use client';

import { motion } from 'motion/react';
import type { FC, HTMLProps, ReactNode } from 'react';

type Props = {
  icon?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
} & HTMLProps<HTMLDivElement>;

const PageHeader: FC<Props> = ({
  icon,
  title,
  description,
  actions,
  children,
  className = '',
  ...rest
}) => {
  return (
    <section
      className={`w-full max-w-7xl mx-auto px-6 pt-32 pb-12 md:pt-40 md:pb-16 ${
        className
      }`.trim()}
      {...rest}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className='w-full flex flex-col items-start gap-8 border-b border-gray-200 pb-12'
      >
        {icon && (
          <div className='flex items-center gap-2 font-mono text-xs text-gray-400'>
            <span className='p-2 border border-gray-200 text-gray-400'>
              {icon}
            </span>
          </div>
        )}
        <div className='space-y-4'>
          {title && (
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className='text-5xl md:text-8xl font-bold tracking-tighter text-black leading-none'
            >
              {title}.
            </motion.h1>
          )}
          {description && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className='text-lg md:text-xl text-gray-500 max-w-2xl leading-relaxed'
            >
              {description}
            </motion.p>
          )}
        </div>

        {actions && <div className='flex flex-wrap gap-4 pt-4'>{actions}</div>}
        {children && <div className='w-full mt-12'>{children}</div>}
      </motion.div>
    </section>
  );
};

export default PageHeader;
