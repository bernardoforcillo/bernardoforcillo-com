import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const HeroSection = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className='flex flex-col gap-10 md:flex-row md:items-end md:justify-between border-b border-line pb-16'
    >
      <div className='space-y-6'>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className='text-[11px] uppercase tracking-[0.2em] text-faint'
        >
          Currently building Hoooly at Ganiga
        </motion.p>
        <h1 className='text-[clamp(3.25rem,11vw,7.5rem)] font-medium tracking-[-0.05em] text-ink leading-[0.88]'>
          Bernardo
          <br />
          Forcillo.
        </h1>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className='flex flex-col gap-6 max-w-sm pb-1'
      >
        <p className='text-[15px] md:text-base text-muted leading-relaxed'>
          Software engineer & polymath. Distributed systems, high-performance
          products, and AI infrastructure — currently at{' '}
          <a
            href='https://ganiga.ai'
            target='_blank'
            rel='noopener noreferrer'
            className='text-ink underline decoration-line underline-offset-4 hover:decoration-ink transition-colors'
          >
            Ganiga Innovation
          </a>
          .
        </p>
        <blockquote>
          <span className='font-serif italic text-2xl md:text-[1.7rem] text-ink/80 block leading-[1.2]'>
            Be Relentless.
            <br />
            Act Different.
            <br />
            Ship Fast.
          </span>
        </blockquote>
        <div className='flex flex-wrap items-center gap-6 pt-2'>
          <Link
            to='/projects'
            className='inline-flex items-center gap-2 text-[13px] font-medium text-canvas bg-ink px-4 py-2 hover:opacity-80 transition-opacity'
          >
            Projects <ArrowRight size={14} />
          </Link>
          <Link
            to='/blog'
            className='inline-flex items-center gap-1.5 text-[13px] font-medium text-ink hover:opacity-60 transition-opacity'
          >
            Blog <ArrowRight size={14} />
          </Link>
        </div>
      </motion.div>
    </motion.header>
  );
};
