import type { FC } from 'react';

type Props = {
  title: string;
  description?: string;
  meta: string;
  tags?: readonly string[];
};

export const ContentRow: FC<Props> = ({ title, description, meta, tags }) => (
  <>
    <div className='flex flex-col-reverse gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8'>
      <h2 className='text-xl md:text-2xl font-semibold uppercase tracking-[-0.025em] text-current'>
        {title}
      </h2>
      <span className='shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-current opacity-50'>
        [{meta}]
      </span>
    </div>
    {description ? (
      <p className='mt-2 max-w-xl text-sm leading-relaxed text-current opacity-65'>
        {description}
      </p>
    ) : null}
    {tags && tags.length > 0 ? (
      <div className='mt-3 flex flex-wrap gap-x-3 gap-y-1'>
        {tags.map((tag) => (
          <span
            key={tag}
            className='font-mono text-[10px] uppercase tracking-[0.14em] text-current opacity-50'
          >
            #{tag}
          </span>
        ))}
      </div>
    ) : null}
  </>
);
