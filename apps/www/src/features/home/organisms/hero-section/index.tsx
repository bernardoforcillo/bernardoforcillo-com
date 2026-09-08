import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const HeroSection = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className='flex flex-col gap-14 pb-8 md:gap-20 md:pb-12'
    >
      <div className='grid gap-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,0.9fr)] md:items-end md:gap-16'>
        <h1 className='text-[clamp(3.25rem,10vw,8rem)] font-medium tracking-[-0.06em] leading-[0.86] text-ink'>
          Bernardo
          <br />
          Forcillo
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.8 }}
          className='flex max-w-md flex-col gap-8'
        >
          <p className='font-serif text-2xl italic leading-[1.25] text-ink/80 md:text-[1.65rem]'>
            Be relentless.
            <br />
            Act different.
            <br />
            Ship fast.
          </p>
          <p className='text-[15px] leading-7 text-muted'>
            Polymath software engineer. Distributed systems, high-performance
            products, and AI infrastructure — currently at{' '}
            <a
              href='https://ganiga.ai'
              target='_blank'
              rel='noopener noreferrer'
              className='text-ink underline decoration-line underline-offset-4 hover:decoration-ink'
            >
              Ganiga Innovation
            </a>
            . Pisa, EU. Five years building, ten products shipped, open source.
          </p>
          <div className='flex flex-wrap items-center gap-x-7 gap-y-3'>
            <Link
              to='/projects'
              className='inline-flex items-center gap-2 bg-ink px-4 py-2.5 text-[15px] text-canvas transition-opacity hover:opacity-90'
            >
              Selected work <ArrowRight size={13} />
            </Link>
            <Link
              to='/blog'
              className='inline-flex items-center gap-1.5 text-[15px] text-ink underline decoration-line underline-offset-4 hover:decoration-ink'
            >
              Writing <ArrowRight size={13} />
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};
