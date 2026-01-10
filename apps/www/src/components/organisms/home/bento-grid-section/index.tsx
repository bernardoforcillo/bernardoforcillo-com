'use client';

import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import GithubIcon from '~/assets/icons/github-mark';
import LinkedinMark from '~/assets/icons/linkedin-mark';

export const BentoGridSection = () => {
  return (
    <motion.div
      initial='hidden'
      animate='show'
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      className='grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[minmax(200px,auto)]'
    >
      {/* Main Bio/Philosophy Card */}
      <motion.div
        variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
        className='md:col-span-8 p-8 md:p-12 border border-gray-200 bg-white hover:border-black transition-colors duration-300 relative group overflow-hidden'
      >
        <div className='absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
          <ArrowRight className='w-6 h-6 -rotate-45' />
        </div>
        <div className='h-full flex flex-col justify-between gap-8'>
          <span className='font-mono text-xs text-gray-400'>
            01 — INTRODUCTION
          </span>
          <div>
            <h3 className='text-3xl md:text-5xl font-medium leading-tight mb-6'>
              Crafting digital tools with{' '}
              <span className='italic font-serif'>precision</span> and{' '}
              <span className='italic font-serif'>soul</span>.
            </h3>
            <p className='text-gray-500 max-w-xl text-lg'>
              I believe software should be as beautiful as it is functional. My
              work bridges the gap between complex engineering challenges and
              intuitive, seamless user experiences.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Connect/Socials Card */}
      <motion.div
        variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
        className='md:col-span-4 p-8 border border-gray-200 bg-white hover:border-black transition-colors duration-300 flex flex-col justify-between group'
      >
        <div className='flex justify-between items-start'>
          <span className='font-mono text-xs text-gray-400'>02 — NETWORK</span>
          <ArrowRight className='w-5 h-5 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1' />
        </div>

        <ul className='space-y-4 pt-12 text-xl md:text-2xl font-medium'>
          <li>
            <a
              href='https://github.com/bernardoforcillo'
              className='flex items-center gap-3 hover:text-gray-600 transition-colors'
            >
              <GithubIcon className='w-6 h-6' />
              <span>GitHub</span>
            </a>
          </li>
          <li>
            <a
              href='https://linkedin.com/in/bernardoforcillo'
              className='flex items-center gap-3 hover:text-blue-600 transition-colors'
            >
              <LinkedinMark className='w-6 h-6' />
              <span>LinkedIn</span>
            </a>
          </li>
          <li>
            <a
              href='mailto:hello@bernardoforcillo.com'
              className='flex items-center gap-3 hover:text-gray-600 transition-colors'
            >
              <span className='w-6 h-6 flex items-center justify-center font-mono text-sm border rounded-full border-black'>
                @
              </span>
              <span>Email</span>
            </a>
          </li>
        </ul>
      </motion.div>

      {/* Projects Link Card */}
      <motion.div
        variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
        className='md:col-span-5'
      >
        <Link
          href='/projects'
          className='h-full w-full p-8 border border-gray-200 bg-black text-white hover:bg-white hover:text-black hover:border-black transition-all duration-300 group flex flex-col justify-between min-h-[300px]'
        >
          <div className='flex justify-between items-start'>
            <span className='font-mono text-xs opacity-60'>
              03 — SELECTED WORK
            </span>
            <ArrowRight className='w-6 h-6 transform group-hover:rotate-0 -rotate-45 transition-transform duration-300' />
          </div>
          <div>
            <h2 className='text-4xl font-bold mb-2'>Projects</h2>
            <p className='text-sm opacity-60 max-w-[250px]'>
              Explore case studies, experiments, and production applications.
            </p>
          </div>
        </Link>
      </motion.div>

      {/* About/Profile Link Card */}
      <motion.div
        variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
        className='md:col-span-7'
      >
        <Link
          href='/about'
          className='h-full w-full p-8 border border-gray-200 bg-gray-50 hover:bg-white hover:border-black transition-all duration-300 group flex flex-col justify-between min-h-[300px]'
        >
          <div className='flex justify-between items-start'>
            <span className='font-mono text-xs text-gray-400'>
              04 — BIO & EXPERIENCE
            </span>
            <div className='w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center group-hover:bg-black group-hover:text-white group-hover:border-black transition-colors'>
              <ArrowRight className='w-4 h-4' />
            </div>
          </div>

          <div className='flex flex-col md:flex-row md:items-end justify-between gap-4'>
            <h2 className='text-4xl font-bold'>About Me</h2>
            <p className='font-mono text-xs text-gray-500 max-w-xs text-right'>
              From Bernalda, Italy. <br />
              Passionate about Open Source, Hardware, and Design.
            </p>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
};
