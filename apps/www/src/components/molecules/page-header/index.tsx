import type { FC, HTMLProps, ReactNode } from 'react';

/**
 * PageHeader - Minimalist title redesign: clean, bold, no underline/accent, neutral color.
 */
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
      className={`w-full flex flex-col items-center justify-center px-4 pt-16 pb-10 md:pt-28 md:pb-16 ${className}`.trim()}
      {...rest}
    >
      <div className='w-full max-w-5xl mx-auto rounded-2xl px-8 py-10 bg-white/80 backdrop-blur-xl border border-neutral-200/50 shadow-lg shadow-black/5 flex flex-col items-center'>
        {icon && (
          <div className='mb-4 flex items-center justify-center text-neutral-700 text-4xl'>
            {icon}
          </div>
        )}
        {title && (
          <h1 className='text-3xl md:text-5xl font-extrabold text-center text-neutral-900 mb-4 tracking-tight'>
            {title}
          </h1>
        )}
        {description && (
          <p className='text-base md:text-lg text-center text-neutral-700/80 mb-4 max-w-2xl'>
            {description}
          </p>
        )}
        {actions && (
          <div className='flex flex-wrap gap-2 justify-center mb-4'>
            {actions}
          </div>
        )}
        {children && <div className='w-full mt-2'>{children}</div>}
      </div>
    </section>
  );
};

export default PageHeader;
