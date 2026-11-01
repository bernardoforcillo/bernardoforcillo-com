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

// Alternate thumbnail tints, as in the mockup: the second card leans pink.
const THUMB_TINTS = [
  'from-azure-radiance-50 to-deep-blue-100',
  'from-bubble-gum-pink-100 to-azure-radiance-50',
];

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
      <ul className='grid border-b border-deep-blue-200 md:grid-cols-3'>
        {items.map((item, i) => (
          <li
            key={`${item.kind}:${item.to}:${Object.values(item.params).join('/')}`}
            className='border-b border-deep-blue-200 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0'
          >
            {/* WritingItem carries its route as a string; the router's typed
                `to` cannot narrow it, so it is passed through as-is. */}
            <Link
              to={item.to as '/'}
              params={item.params as never}
              className={`block h-full p-4 transition-colors hover:bg-deep-blue-50 sm:p-5.5 ${FOCUS_RING}`}
            >
              <div
                aria-hidden='true'
                className={`aspect-[16/10] rounded-[10px] border border-deep-blue-200 bg-linear-to-br ${THUMB_TINTS[i % 2]}`}
              />
              <p className='mt-3.5 text-xs text-deep-blue-600'>
                <time dateTime={item.date}>{formatDate(item.date)}</time> ·{' '}
                {KIND_LABEL[item.kind]}
              </p>
              <h3 className='mt-1 text-base font-semibold text-deep-blue-900'>
                {item.title}
              </h3>
              <p className='mt-1 text-[13px] leading-[1.55] text-deep-blue-600'>
                {item.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
