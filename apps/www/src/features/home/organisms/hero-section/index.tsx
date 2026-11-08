import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { STACK } from '../../data';
import { BUTTON_PRIMARY, BUTTON_SECONDARY, FOCUS_RING } from '../../styles';
import { FlowLines } from './flow-lines';

export const HeroSection = () => (
  <section className='relative overflow-hidden'>
    <FlowLines />
    <div className='animate-rise relative px-4 pb-14 pt-14 sm:px-10 md:pt-18'>
      <a
        href='https://ganiga.ai'
        target='_blank'
        rel='noopener noreferrer'
        className={`inline-flex max-w-full items-center gap-2 rounded-full border border-deep-blue-200 py-1 pl-1 pr-3 text-[12.5px] text-deep-blue-700 transition-colors hover:bg-deep-blue-50 ${FOCUS_RING}`}
      >
        <span className='shrink-0 rounded-full bg-bubble-gum-pink-200 px-2.5 py-0.5 font-semibold text-bubble-gum-pink-800'>
          Now
        </span>
        Building at Ganiga →
      </a>

      <h1 className='mt-6 text-[clamp(3.25rem,9vw,4.75rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-deep-blue-900'>
        Bernardo
        <br />
        <span className='bg-linear-to-r from-deep-blue-500 to-azure-radiance-700 bg-clip-text text-transparent'>
          Forcillo
        </span>
      </h1>

      <p className='mt-6 font-serif text-lg italic text-deep-blue-700 sm:text-[22px]'>
        Be relentless. Act different. Ship fast.
      </p>

      <p className='mt-3.5 max-w-[480px] text-base leading-[1.7] text-deep-blue-600'>
        Polymath software engineer. Distributed systems, high-performance
        products, and AI infrastructure — currently at{' '}
        <a
          href='https://ganiga.ai'
          target='_blank'
          rel='noopener noreferrer'
          className={`rounded-sm text-azure-radiance-700 underline decoration-azure-radiance-300 underline-offset-3 hover:decoration-azure-radiance-700 ${FOCUS_RING}`}
        >
          Ganiga Innovation
        </a>
        .
      </p>

      <div className='mt-7 flex flex-wrap gap-2.5'>
        <Link to='/projects' className={BUTTON_PRIMARY}>
          Selected work <ArrowRight size={14} aria-hidden='true' />
        </Link>
        <Link to='/blog' className={BUTTON_SECONDARY}>
          Writing
        </Link>
      </div>

      <p className='mt-12 font-mono text-[13px] text-deep-blue-600'>
        <span className='text-azure-radiance-600'>stack</span>{' '}
        {STACK.join(' / ').toLowerCase()}
      </p>
    </div>
  </section>
);
