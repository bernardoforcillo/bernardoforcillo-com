import { SectionLabel } from '@monorepo/components';
import { PRACTICE } from '../../data';

// A statement on the left, four plain lines on the right: no boxes, no icons.
export const PracticeSection = () => (
  <section aria-labelledby='practice'>
    <SectionLabel>
      {/* biome-ignore lint/a11y/useSemanticElements: SectionLabel wraps its children in a <span>, where an <h2> is not valid content. */}
      <span id='practice' role='heading' aria-level={2}>
        Practice
      </span>
    </SectionLabel>
    <div className='grid gap-12 px-6 sm:px-10 md:grid-cols-[1fr_1.1fr] md:gap-16'>
      <div className='flex flex-col gap-6'>
        <p className='font-serif text-[28px] italic leading-[1.2] text-deep-blue-800 md:text-[34px]'>
          Engineering ideas into systems that survive reality.
        </p>
        <p className='max-w-[42ch] text-[15px] leading-[1.7] text-deep-blue-600'>
          Research, product thinking, and deep engineering in one practice —
          from infrastructure to the interface people touch.
        </p>
      </div>
      <ul>
        {PRACTICE.map((item) => (
          <li
            key={item.key}
            className='grid gap-1 border-t border-deep-blue-100 py-5 first:border-t-0 first:pt-1 sm:grid-cols-[11rem_1fr] sm:gap-6'
          >
            <h3 className='text-[15px] font-semibold text-deep-blue-900'>
              {item.title}
            </h3>
            <p className='text-[15px] leading-[1.6] text-deep-blue-600'>
              {item.text}
            </p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
