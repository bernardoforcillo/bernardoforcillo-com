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
      className={`w-full max-w-7xl mx-auto px-6 pt-32 pb-12 md:pt-48 md:pb-16 ${className}`.trim()}
      {...rest}
    >
      <div className='w-full flex flex-col items-start gap-6 border-b border-gray-200 pb-12'>
        <div className='space-y-4'>
          {title && (
            <h1 className='text-4xl md:text-6xl font-bold tracking-tighter text-black'>
              {title}.
            </h1>
          )}
          {description && (
            <p className='text-lg text-gray-600 max-w-3xl leading-relaxed'>
              {description}
            </p>
          )}
        </div>

        {actions && <div className='flex flex-wrap gap-4 pt-4'>{actions}</div>}
        {children && <div className='w-full mt-8'>{children}</div>}
      </div>
    </section>
  );
};

export default PageHeader;
