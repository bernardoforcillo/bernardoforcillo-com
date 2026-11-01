import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { HERO_CHIPS } from '../../data';
import { BUTTON_PRIMARY, BUTTON_SECONDARY, FOCUS_RING } from '../../styles';

// Chip positions inside the visual panel, in HERO_CHIPS order.
const CHIP_POSITIONS = [
  'top-[18%] left-[14%]',
  'top-[26%] right-[10%]',
  'bottom-[22%] left-[10%]',
  'bottom-[14%] right-[16%]',
  'top-1/2 left-[6%]',
];

const CHIP_TONE = {
  blue: 'border-deep-blue-200 bg-white text-deep-blue-700',
  pink: 'border-bubble-gum-pink-300 bg-bubble-gum-pink-100 text-bubble-gum-pink-800',
};

const PANEL_BACKGROUND = {
  backgroundImage: [
    'radial-gradient(circle at 50% 55%, var(--color-azure-radiance-100), transparent 60%)',
    'linear-gradient(var(--color-deep-blue-100) 1px, transparent 1px)',
    'linear-gradient(90deg, var(--color-deep-blue-100) 1px, transparent 1px)',
  ].join(', '),
  backgroundSize: 'auto, 28px 28px, 28px 28px',
};

export const HeroSection = () => (
  <section className='grid border-b border-deep-blue-200 md:grid-cols-[1.25fr_1fr]'>
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className='px-4 pb-14 pt-14 sm:px-10 md:border-r md:border-deep-blue-200 md:pt-18'
    >
      <a
        href='https://ganiga.ai'
        target='_blank'
        rel='noopener noreferrer'
        className={`inline-flex max-w-full items-center gap-2 rounded-full border border-deep-blue-200 py-1 pl-1 pr-3 text-[12.5px] text-deep-blue-700 transition-colors hover:bg-deep-blue-50 ${FOCUS_RING}`}
      >
        <span className='shrink-0 rounded-full bg-bubble-gum-pink-200 px-2.5 py-0.5 font-semibold text-bubble-gum-pink-800'>
          Now
        </span>
        Building AI infrastructure at Ganiga →
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

      <p className='mt-3.5 max-w-[440px] text-[15px] leading-[1.7] text-deep-blue-600'>
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
    </motion.div>

    {/* Decorative: the same interests are spelled out in Practice below. */}
    <motion.div
      aria-hidden='true'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.25, duration: 0.8 }}
      className='relative hidden min-h-80 overflow-hidden md:block'
      style={PANEL_BACKGROUND}
    >
      {HERO_CHIPS.map((chip, i) => (
        <span
          key={chip.label}
          className={`absolute rounded-[10px] border px-2.5 py-1.5 font-mono text-xs shadow-[0_4px_14px_rgb(9_49_141/0.07)] ${CHIP_POSITIONS[i]} ${CHIP_TONE[chip.tone]}`}
        >
          {chip.label}
        </span>
      ))}
    </motion.div>
  </section>
);
