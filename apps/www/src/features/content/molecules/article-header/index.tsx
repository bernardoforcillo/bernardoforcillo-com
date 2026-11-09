import type { FC, ReactNode } from 'react';
import { Breadcrumbs, type Crumb } from '../breadcrumbs';

type Props = {
  trail: Crumb[];
  title: string;
  description: string;
  /** ISO date. */
  date: string;
  /** Human date, already formatted. */
  dateLabel: string;
  minutes?: number;
  tags?: readonly string[];
  /** Extra controls under the meta line, e.g. repository links. */
  actions?: ReactNode;
};

// Detail-page header: where you are, what this is, and how long it takes —
// in reading order, on the same measure as the body text below it.
export const ArticleHeader: FC<Props> = ({
  trail,
  title,
  description,
  date,
  dateLabel,
  minutes,
  tags,
  actions,
}) => (
  <header className='relative px-6 pt-12 pb-10 md:px-10 md:pt-16'>
    <div className='animate-rise mx-auto max-w-[68ch]'>
      <Breadcrumbs trail={trail} />
      <h1 className='mt-8 text-[clamp(2.25rem,6vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-balance text-deep-blue-900'>
        {title}
      </h1>
      <p className='mt-4 text-lg leading-relaxed text-pretty text-deep-blue-600'>
        {description}
      </p>
      <div className='mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[13px] text-deep-blue-600'>
        <time dateTime={date}>{dateLabel}</time>
        {minutes ? (
          <>
            <span
              aria-hidden='true'
              className='size-1 rounded-full bg-deep-blue-300'
            />
            <span>{minutes} min read</span>
          </>
        ) : null}
        {tags && tags.length > 0 ? (
          <ul aria-label='Topics' className='flex flex-wrap gap-x-3 gap-y-1'>
            {tags.map((tag) => (
              <li key={tag} className='lowercase text-azure-radiance-700'>
                <span aria-hidden='true'>#</span>
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      {actions ? (
        <div className='mt-6 flex flex-wrap gap-2.5'>{actions}</div>
      ) : null}
    </div>
    <div
      aria-hidden='true'
      className='rule-fade absolute inset-x-4 bottom-0 sm:inset-x-6'
    />
  </header>
);
