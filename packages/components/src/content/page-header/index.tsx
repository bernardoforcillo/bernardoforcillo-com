import type { FC, HTMLProps, ReactNode } from 'react';

type Props = {
  icon?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
} & HTMLProps<HTMLDivElement>;

// Section titles end on a full stop ("Projects."), but a title that already
// carries its own punctuation keeps it rather than growing a second mark.
const withStop = (title: ReactNode) =>
  typeof title === 'string' && /[.?!…]$/.test(title) ? title : <>{title}.</>;

export const PageHeader: FC<Props> = ({
  icon: _icon,
  title,
  description,
  actions,
  children,
  className = '',
  ...rest
}) => (
  <section
    className={`relative w-full px-6 pt-16 pb-12 md:px-10 md:pt-20 ${className}`.trim()}
    {...rest}
  >
    {/* `animate-rise` is a CSS utility the app defines; without it the header
        simply renders in place. */}
    <div className='animate-rise flex w-full flex-col items-start gap-5'>
      <div className='space-y-4'>
        {title && (
          <h1 className='text-5xl font-semibold leading-[0.92] tracking-[-0.045em] text-deep-blue-900 md:text-7xl'>
            {withStop(title)}
          </h1>
        )}
        {description && (
          <p className='max-w-xl text-[15px] leading-7 text-deep-blue-600 md:text-base'>
            {description}
          </p>
        )}
      </div>

      {actions && <div className='flex flex-wrap gap-4 pt-2'>{actions}</div>}
      {children && <div className='mt-8 w-full'>{children}</div>}
    </div>
    {/* `rule-fade` is an app utility: a hairline that fades at both ends. */}
    <div
      aria-hidden='true'
      className='rule-fade absolute inset-x-4 bottom-0 sm:inset-x-6'
    />
  </section>
);
