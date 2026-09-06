import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const HeroSection = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className='relative border-x border-b border-line min-h-[680px] md:min-h-[720px] flex flex-col justify-between'
    >
      <div className='flex items-center justify-between border-b border-line px-4 py-3 md:px-6'>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className='industrial-label flex items-center gap-2 text-muted'
        >
          <span className='size-2 bg-signal' />
          Operational / Pisa, EU
        </motion.p>
        <span className='industrial-label hidden text-faint sm:block'>
          43.7228° N · 10.4017° E
        </span>
      </div>

      <div className='px-4 py-12 md:px-6'>
        <span className='industrial-label text-faint'>
          Engineer / Creator / Systems Thinker
        </span>
        <h1 className='mt-4 text-[clamp(3.5rem,12.5vw,9.25rem)] font-bold uppercase tracking-[-0.075em] text-ink leading-[0.76]'>
          Bernardo
          <br />
          Forcillo
        </h1>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className='grid border-t border-line md:grid-cols-2'
      >
        <div className='border-b border-line p-5 md:border-r md:border-b-0 md:p-6'>
          <span className='industrial-label text-faint'>Manifesto / 001</span>
          <p className='mt-5 max-w-sm text-xl font-semibold uppercase leading-[1.08] tracking-[-0.025em] md:text-2xl'>
            Be relentless.
            <br />
            Act different.
            <br />
            Ship fast.
          </p>
        </div>
        <div className='flex flex-col justify-between gap-8 p-5 md:p-6'>
          <p className='max-w-md text-sm leading-relaxed text-muted'>
            Polymath software engineer building distributed systems,
            high-performance products, and AI infrastructure at{' '}
            <a
              href='https://ganiga.ai'
              target='_blank'
              rel='noopener noreferrer'
              className='text-ink underline decoration-line underline-offset-4 hover:decoration-ink'
            >
              Ganiga Innovation
            </a>
            .
          </p>
          <div className='flex flex-wrap items-center gap-2'>
            <Link
              to='/projects'
              className='inline-flex items-center gap-8 border border-ink bg-ink px-4 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-canvas transition-colors hover:bg-signal hover:text-ink'
            >
              Selected work <ArrowRight size={13} />
            </Link>
            <Link
              to='/blog'
              className='inline-flex items-center gap-8 border border-line px-4 py-3 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors hover:border-ink'
            >
              Field notes <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
};
