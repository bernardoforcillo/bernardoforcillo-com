'use client';

import { motion } from 'motion/react';
import type { FC } from 'react';

export const Footer: FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className='border-t border-gray-200 py-12 bg-white'
    >
      <div className='mx-auto max-w-7xl px-6 flex flex-col md:flex-row justify-between items-center gap-6'>
        <div className='flex flex-col gap-1'>
          <span className='font-bold tracking-tighter text-lg'>
            BERNARDO FORCILLO.
          </span>
        </div>

        <div className='flex flex-col items-center md:items-end gap-2 text-xs font-mono text-gray-400 uppercase tracking-wide'>
          <span>Built with Next.js, Tailwind, & Love.</span>
          <span>&copy; {new Date().getFullYear()} — All Rights Reserved.</span>
        </div>
      </div>
    </motion.footer>
  );
};
