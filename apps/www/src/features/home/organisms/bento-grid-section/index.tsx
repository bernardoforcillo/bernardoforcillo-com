import { Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import GithubIcon from '~/assets/icons/github-mark';
import LinkedinMark from '~/assets/icons/linkedin-mark';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export const BentoGridSection = () => {
  return (
    <motion.div
      initial='hidden'
      whileInView='show'
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
          },
        },
      }}
      className='grid grid-cols-1 md:grid-cols-12 gap-px bg-line border border-line'
    >
      <motion.div
        variants={fadeUp}
        className='md:col-span-8 p-8 md:p-12 bg-canvas min-h-[320px] flex flex-col justify-between gap-10'
      >
        <span className='text-[11px] uppercase tracking-[0.16em] text-faint'>
          Introduction
        </span>
        <div className='space-y-5'>
          <h3 className='text-3xl md:text-4xl font-medium leading-[1.15] tracking-tight'>
            Crafting digital tools with{' '}
            <span className='italic font-serif font-normal'>precision</span> and{' '}
            <span className='italic font-serif font-normal'>soul</span>.
          </h3>
          <p className='text-muted max-w-lg text-base leading-relaxed'>
            I believe software should be as beautiful as it is functional. My
            work bridges the gap between complex engineering challenges and
            intuitive, seamless user experiences.
          </p>
          <div className='flex flex-wrap gap-x-4 gap-y-1 pt-1'>
            {[
              'TypeScript',
              'Golang',
              'Next.js',
              'Flutter',
              'Kubernetes',
              'PostgreSQL',
            ].map((tag) => (
              <span
                key={tag}
                className='text-[11px] uppercase tracking-[0.14em] text-faint'
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={fadeUp}
        className='md:col-span-4 p-8 bg-canvas flex flex-col justify-between gap-10'
      >
        <span className='text-[11px] uppercase tracking-[0.16em] text-faint'>
          Network
        </span>
        <div className='space-y-6'>
          <p className='text-sm text-muted leading-relaxed'>
            Based in Pisa, Italy. Open to collaboration, consulting, and
            interesting problems.
          </p>
          <ul className='space-y-3 text-lg font-medium tracking-tight'>
            <li>
              <a
                href='https://github.com/bernardoforcillo'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2.5 hover:opacity-60 transition-opacity'
              >
                <GithubIcon className='w-4 h-4' />
                GitHub
              </a>
            </li>
            <li>
              <a
                href='https://linkedin.com/in/bernardoforcillo'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2.5 hover:opacity-60 transition-opacity'
              >
                <LinkedinMark className='w-4 h-4' />
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href='mailto:hello@bernardoforcillo.com'
                className='hover:opacity-60 transition-opacity'
              >
                Email
              </a>
            </li>
          </ul>
        </div>
      </motion.div>

      <IndexLink
        to='/projects'
        label='Selected work'
        title='Projects'
        description='Case studies, experiments, and production applications.'
        span='md:col-span-4'
        featured
      />
      <IndexLink
        to='/about'
        label='Bio'
        title='About'
        description='Pisa, Italy. Open source, hardware, design.'
        span='md:col-span-4'
      />
      <IndexLink
        to='/blog'
        label='Writing'
        title='Blog'
        description='Essays on technology, systems, and building products.'
        span='md:col-span-4'
      />
      <IndexLink
        to='/notes'
        label='Field notes'
        title='Notes'
        description='Atomic ideas and references, captured in the open.'
        span='md:col-span-12'
      />
    </motion.div>
  );
};

type IndexLinkProps = {
  to: '/projects' | '/about' | '/blog' | '/notes';
  label: string;
  title: string;
  description: string;
  span: string;
  featured?: boolean;
};

const IndexLink = ({
  to,
  label,
  title,
  description,
  span,
  featured = false,
}: IndexLinkProps) => (
  <motion.div variants={fadeUp} className={span}>
    <Link
      to={to}
      className={`h-full w-full p-8 min-h-[220px] flex flex-col justify-between gap-8 group transition-opacity duration-300 hover:opacity-70 ${
        featured ? 'bg-ink text-canvas' : 'bg-canvas text-ink'
      }`}
    >
      <div className='flex justify-between items-start'>
        <span
          className={`text-[11px] uppercase tracking-[0.16em] ${
            featured ? 'opacity-60' : 'text-faint'
          }`}
        >
          {label}
        </span>
        <ArrowUpRight
          className={`w-4 h-4 ${featured ? 'opacity-60' : 'text-faint'}`}
        />
      </div>
      <div>
        <h2 className='text-2xl md:text-3xl font-medium tracking-tight mb-2'>
          {title}
        </h2>
        <p
          className={`text-sm max-w-xs leading-relaxed ${
            featured ? 'opacity-60' : 'text-muted'
          }`}
        >
          {description}
        </p>
      </div>
    </Link>
  </motion.div>
);
