import { SectionLabel } from '@monorepo/components';
import { Link } from '@tanstack/react-router';
import type { WritingItem } from '~/content/lib';
import { formatDate } from '~/lib/format-date';
import { FOCUS_RING } from '../../styles';

type Props = {
  items: readonly WritingItem[];
};

const KIND_LABEL: Record<WritingItem['kind'], string> = {
  post: 'Post',
  note: 'Note',
};

export const LatestWritingSection = ({ items }: Props) => {
  if (items.length === 0) return null;

  return (
    <section aria-labelledby='latest-writing'>
      <SectionLabel>
        {/* biome-ignore lint/a11y/useSemanticElements: SectionLabel wraps its children in a <span>, where an <h2> is not valid content. */}
        <span id='latest-writing' role='heading' aria-level={2}>
          Latest writing
        </span>
      </SectionLabel>
      {/* Rows rather than cards: any number of items fills the rail, and
          there is no empty thumbnail to stand in for missing imagery. */}
      <ul className='px-2 sm:px-6'>
        {items.map((item) => (
          <li
            key={`${item.kind}:${item.to}:${Object.values(item.params).join('/')}`}
          >
            {/* WritingItem carries its route as a string; the router's typed
                `to` cannot narrow it, so it is passed through as-is. */}
            <Link
              to={item.to as '/'}
              params={item.params as never}
              className={`group surface-hover grid gap-x-8 gap-y-1 rounded-[18px] px-4 py-6 sm:grid-cols-[8.5rem_1fr_auto] sm:items-baseline sm:px-5 ${FOCUS_RING}`}
            >
              <time
                dateTime={item.date}
                className='font-mono text-[13px] tabular-nums text-deep-blue-600'
              >
                {formatDate(item.date)}
              </time>
              <span>
                <span className='block text-lg font-semibold tracking-[-0.015em] text-deep-blue-900 transition-colors group-hover:text-azure-radiance-700'>
                  {item.title}
                </span>
                <span className='mt-1 block text-sm leading-[1.55] text-deep-blue-600'>
                  {item.description}
                </span>
              </span>
              <span className='font-mono text-[13px] lowercase text-deep-blue-600'>
                {KIND_LABEL[item.kind]}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
