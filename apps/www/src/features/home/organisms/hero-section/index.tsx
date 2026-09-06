import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const HeroSection = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className='flex flex-col gap-14 pb-16 md:gap-20 md:pb-24'
    >
      <div className='flex items-center justify-between'>
        <p className='industrial-label flex items-center gap-2 text-muted'>
          <span className='size-1.5 rounded-full bg-signal' />
          Pisa, EU
        </p>
        <span className='industrial-label hidden text-faint sm:block'>
          43.72° N · 10.40° E
        </span>
      </div>

      <div className='grid gap-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,0.9fr)] md:items-end md:gap-16'>
        <div>
          <span className='industrial-label text-faint'>
            Engineer · Creator · Systems
          </span>
          <h1 className='mt-5 text-[clamp(3.25rem,10vw,8rem)] font-medium tracking-[-0.06em] leading-[0.86] text-ink'>
            Bernardo
            <br />
            Forcillo
          </h1>
        </div>

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
              className='text-ink underline decoration-line underline-offset-4 hover:decoration-signal'
            >
              Ganiga Innovation
            </a>
            .
          </p>
          <div className='flex flex-wrap items-center gap-x-7 gap-y-3'>
            <Link
              to='/projects'
              className='inline-flex items-center gap-2 bg-ink px-4 py-2.5 text-[12px] tracking-wide text-canvas transition-colors hover:bg-signal hover:text-ink'
            >
              Selected work <ArrowRight size={13} />
            </Link>
            <Link
              to='/blog'
              className='inline-flex items-center gap-1.5 text-[12px] tracking-wide text-ink transition-colors hover:text-signal'
            >
              Writing <ArrowRight size={13} />
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};
