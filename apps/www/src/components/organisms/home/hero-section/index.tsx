'use client';

import { motion } from 'motion/react';
import Link from 'next/link';

export const HeroSection = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className='flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-gray-200 pb-12'
    >
      <div className='space-y-4'>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className='relative overflow-hidden inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-xs font-mono text-gray-600'
        >
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              repeatType: 'loop',
              duration: 2,
              repeatDelay: 3,
              ease: 'linear',
            }}
            className='absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none'
          />
          <span className='relative flex h-2 w-2'>
            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75' />
            <span className='relative inline-flex rounded-full h-2 w-2 bg-orange-500' />
          </span>
          Currently building Hoooly at Ganiga
        </motion.div>
        <h1 className='text-7xl md:text-9xl font-bold tracking-tighter text-black leading-[0.8]'>
          BERNARDO
          <br />
          FORCILLO.
        </h1>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className='flex flex-col gap-4 max-w-md'
      >
        <p className='font-mono text-sm md:text-base text-gray-500 leading-relaxed'>
          {'// Software Engineer & Polymath'}
          <br />
          Specializing in distributed systems, high-performance scalable digital
          products, and AI infrastructure. Currently building at{' '}
          <a
            href='https://ganiga.ai'
            target='_blank'
            rel='noopener noreferrer'
            className='text-black hover:underline underline-offset-4 decoration-1'
          >
            Ganiga Innovation
          </a>
          .
        </p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className='pt-4'
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className='pt-6'
          >
            <span className='font-serif italic text-2xl md:text-3xl text-black/80 block leading-tight'>
              Be Relentless. <br className='hidden md:inline' />
              Act Different. <br className='hidden md:inline' />
              Ship Fast.
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.header>
  );
};
