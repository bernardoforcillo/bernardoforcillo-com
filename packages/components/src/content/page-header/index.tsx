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

export const PageHeader: FC<Props> = ({
  icon: _icon,
  title,
  description,
  actions,
  children,
  className = '',
  ...rest
}) => {
  return (
    <section
      className={`w-full px-6 pt-16 pb-12 md:px-10 md:pt-20 border-b border-deep-blue-200 ${
        className
      }`.trim()}
      {...rest}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className='flex w-full flex-col items-start gap-5'
      >
        <div className='space-y-4'>
          {title && (
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className='text-5xl md:text-7xl font-semibold tracking-[-0.045em] leading-[0.92] text-deep-blue-900'
            >
              {title}.
            </motion.h1>
          )}
          {description && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className='max-w-xl text-[15px] leading-7 text-deep-blue-600 md:text-base'
            >
              {description}
            </motion.p>
          )}
        </div>

        {actions && <div className='flex flex-wrap gap-4 pt-2'>{actions}</div>}
        {children && <div className='w-full mt-8'>{children}</div>}
      </motion.div>
    </section>
  );
};
