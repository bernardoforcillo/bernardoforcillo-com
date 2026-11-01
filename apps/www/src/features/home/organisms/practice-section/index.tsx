import { SectionLabel } from '@monorepo/components';
import { PRACTICE } from '../../data';

export const PracticeSection = () => (
  <section aria-labelledby='practice'>
    <SectionLabel>
      {/* biome-ignore lint/a11y/useSemanticElements: SectionLabel wraps its children in a <span>, where an <h2> is not valid content. */}
      <span id='practice' role='heading' aria-level={2}>
        Practice
      </span>
    </SectionLabel>
    <div className='grid border-b border-deep-blue-200 md:grid-cols-[1fr_1.2fr]'>
      <div className='flex flex-col justify-between gap-6 border-b border-deep-blue-200 px-4 py-11 sm:px-9 md:border-b-0 md:border-r'>
        <p className='font-serif text-[26px] italic leading-[1.2] text-deep-blue-700 md:text-[32px]'>
          Engineering ideas into systems that{' '}
          <em className='text-azure-radiance-700'>survive reality.</em>
        </p>
        <p className='max-w-[360px] text-sm leading-[1.65] text-deep-blue-600'>
          Research, product thinking, and deep engineering in one practice —
          from infrastructure to the interface people touch.
        </p>
      </div>
      <ul className='grid gap-px bg-deep-blue-200 md:grid-cols-2'>
        {PRACTICE.map((item) => (
          <li key={item.n} className='bg-white px-4 py-6.5 sm:px-6'>
            <span className='font-mono text-xs text-bubble-gum-pink-800'>
              {item.n}
            </span>
            <h3 className='mt-2.5 text-[15px] font-semibold text-deep-blue-900'>
              {item.title}
            </h3>
            <p className='mt-1 text-[13px] leading-[1.55] text-deep-blue-600'>
              {item.text}
            </p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
