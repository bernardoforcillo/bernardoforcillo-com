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
      className={`w-full max-w-7xl mx-auto px-6 pt-32 pb-12 md:pt-40 md:pb-16 ${
        className
      }`.trim()}
      {...rest}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className='w-full flex flex-col items-start gap-5 border-b border-line pb-10'
      >
        <div className='space-y-4'>
          {title && (
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className='text-5xl md:text-7xl font-medium tracking-tight text-ink leading-[0.95]'
            >
              {title}.
            </motion.h1>
          )}
          {description && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className='text-base md:text-lg text-muted max-w-xl leading-relaxed'
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
