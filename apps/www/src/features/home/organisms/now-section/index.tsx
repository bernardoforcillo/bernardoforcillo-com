import { SectionLabel } from '@monorepo/components';
import { NOW } from '../../data';

export const NowSection = () => (
  <section aria-labelledby='now'>
    <SectionLabel>
      {/* biome-ignore lint/a11y/useSemanticElements: SectionLabel wraps its children in a <span>, where an <h2> is not valid content. */}
      <span id='now' role='heading' aria-level={2}>
        Now
      </span>
    </SectionLabel>
    <div className='relative border-b border-deep-blue-200'>
      {/* The connecting line: vertical through the dots below md, horizontal above. */}
      <span
        aria-hidden='true'
        className='absolute bottom-0 left-[27.5px] top-0 w-px bg-linear-to-b from-azure-radiance-300 to-deep-blue-200 sm:left-[39.5px] md:bottom-auto md:left-0 md:right-0 md:top-[46px] md:h-px md:w-auto md:bg-linear-to-r'
      />
      <ol className='relative grid py-4 md:grid-cols-4 md:py-0'>
        {NOW.map((step) => (
          <li
            key={step.title}
            className='flex gap-4 px-4 py-4 sm:px-7 md:block md:border-r md:border-deep-blue-200 md:px-6 md:pb-7.5 md:pt-8.5 md:last:border-r-0'
          >
            <span
              aria-hidden='true'
              className={`grid size-6 shrink-0 place-items-center rounded-full border bg-white ${step.current ? 'border-azure-radiance-300' : 'border-deep-blue-200'}`}
            >
              <span
                className={`size-2 rounded-full ${step.current ? 'bg-azure-radiance-500 shadow-[0_0_0_4px_var(--color-azure-radiance-100)]' : 'bg-deep-blue-300'}`}
              />
            </span>
            <div>
              <span
                className={`block font-mono text-xs md:mt-4.5 ${step.current ? 'text-bubble-gum-pink-800' : 'text-deep-blue-600'}`}
              >
                {step.when}
              </span>
              <h3 className='mt-1 text-[15px] font-semibold text-deep-blue-900'>
                {step.title}
              </h3>
              <p className='mt-1 text-[13px] leading-normal text-deep-blue-600'>
                {step.text}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);
