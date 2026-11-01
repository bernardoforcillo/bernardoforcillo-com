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
      <h2 className='text-xl font-medium tracking-tight text-deep-blue-900 md:text-2xl'>
        {title}
      </h2>
      <span className='shrink-0 text-sm text-deep-blue-600'>{meta}</span>
    </div>
    {description ? (
      <p className='mt-2 max-w-xl text-[15px] leading-7 text-deep-blue-600'>
        {description}
      </p>
    ) : null}
    {tags && tags.length > 0 ? (
      <div className='mt-3 flex flex-wrap gap-x-3 gap-y-1'>
        {tags.map((tag) => (
          <span key={tag} className='text-sm text-deep-blue-600'>
            {tag}
          </span>
        ))}
      </div>
    ) : null}
  </>
);
