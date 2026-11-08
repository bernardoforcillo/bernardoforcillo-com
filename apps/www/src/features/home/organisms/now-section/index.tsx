import { SectionLabel } from '@monorepo/components';
import type { CSSProperties } from 'react';
import { NOW } from '../../data';

type Step = (typeof NOW)[number];

const Dot = ({ current }: { current?: boolean }) => (
  <span
    aria-hidden='true'
    className={`grid size-6 shrink-0 place-items-center rounded-full border bg-white ${current ? 'border-azure-radiance-300' : 'border-deep-blue-200'}`}
  >
    <span
      className={`size-2 rounded-full ${current ? 'bg-azure-radiance-500 shadow-[0_0_0_4px_var(--color-azure-radiance-100)]' : 'bg-deep-blue-300'}`}
    />
  </span>
);

const When = ({ step }: { step: Step }) => (
  <span
    className={`block font-mono text-[13px] lowercase ${step.current ? 'text-bubble-gum-pink-800' : 'text-deep-blue-600'}`}
  >
    {step.when}
  </span>
);

// One entry reads as a status line; a timeline only appears once there is
// more than one point to connect.
export const NowSection = () => (
  <section aria-labelledby='now'>
    <SectionLabel>
      {/* biome-ignore lint/a11y/useSemanticElements: SectionLabel wraps its children in a <span>, where an <h2> is not valid content. */}
      <span id='now' role='heading' aria-level={2}>
        Now
      </span>
    </SectionLabel>
    {NOW.length === 1 && NOW[0] ? <NowSingle step={NOW[0]} /> : <NowTimeline />}
  </section>
);

const NowSingle = ({ step }: { step: Step }) => (
  <div className='flex items-start gap-4 px-6 pt-2 pb-6 sm:items-center sm:px-10'>
    <Dot current={step.current} />
    <div className='flex flex-col gap-x-6 gap-y-1 sm:flex-row sm:items-baseline'>
      <When step={step} />
      <h3 className='text-lg font-semibold tracking-[-0.015em] text-deep-blue-900'>
        {step.title}
      </h3>
      <p className='text-sm text-deep-blue-600'>{step.text}</p>
    </div>
  </div>
);

const NowTimeline = () => (
  <div className='relative'>
    {/* The connecting line: vertical through the dots below md, horizontal above. */}
    <span
      aria-hidden='true'
      className='absolute bottom-0 left-[27.5px] top-0 w-px bg-linear-to-b from-azure-radiance-300 to-deep-blue-200 sm:left-[39.5px] md:bottom-auto md:left-0 md:right-0 md:top-[46px] md:h-px md:w-auto md:bg-linear-to-r'
    />
    <ol
      className='relative grid py-4 md:grid-cols-(--now-cols) md:py-0'
      style={
        {
          '--now-cols': `repeat(${Math.min(NOW.length, 4)}, minmax(0, 1fr))`,
        } as CSSProperties
      }
    >
      {NOW.map((step) => (
        <li
          key={step.title}
          className='flex gap-4 px-4 py-4 sm:px-7 md:block md:border-r md:border-deep-blue-100 md:px-6 md:pb-7.5 md:pt-8.5 md:last:border-r-0'
        >
          <Dot current={step.current} />
          <div className='md:mt-4.5'>
            <When step={step} />
            <h3 className='mt-1 text-[15px] font-semibold text-deep-blue-900'>
              {step.title}
            </h3>
            <p className='mt-1 text-sm leading-normal text-deep-blue-600'>
              {step.text}
            </p>
          </div>
        </li>
      ))}
    </ol>
  </div>
);
