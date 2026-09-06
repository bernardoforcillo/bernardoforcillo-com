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
      className='grid grid-cols-1 gap-px border-x border-b border-line bg-line md:grid-cols-12'
    >
      <motion.div
        variants={fadeUp}
        className='flex min-h-[380px] flex-col justify-between gap-10 bg-canvas p-6 md:col-span-8 md:p-10'
      >
        <span className='industrial-label text-faint'>[01] Practice</span>
        <div className='space-y-5'>
          <h3 className='max-w-2xl text-3xl font-semibold uppercase leading-[1.02] tracking-[-0.04em] md:text-5xl'>
            Engineering ideas into systems that survive reality.
          </h3>
          <p className='max-w-xl text-sm leading-relaxed text-muted'>
            Research, product thinking, and deep engineering in one practice.
            From low-level infrastructure to the interface people touch.
          </p>
          <div className='flex flex-wrap gap-x-4 gap-y-2 border-t border-line pt-5'>
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
                className='font-mono text-[10px] uppercase tracking-[0.14em] text-faint'
              >
                / {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={fadeUp}
        className='flex min-h-[380px] flex-col justify-between gap-10 bg-canvas p-6 md:col-span-4 md:p-8'
      >
        <span className='industrial-label text-faint'>[02] Signal</span>
        <div className='space-y-6'>
          <p className='text-sm leading-relaxed text-muted'>
            Available for ambitious deep-tech systems, experimental products,
            and difficult technical problems.
          </p>
          <ul className='space-y-3 border-t border-line pt-5 font-mono text-xs uppercase tracking-[0.12em]'>
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
        index='03'
        to='/projects'
        label='Build'
        title='Projects'
        description='Production systems, experiments, and open-source machinery.'
        span='md:col-span-4'
        featured
      />
      <IndexLink
        index='04'
        to='/about'
        label='Operator'
        title='About'
        description='Engineering, hardware, design, and the path between them.'
        span='md:col-span-4'
      />
      <IndexLink
        index='05'
        to='/blog'
        label='Transmit'
        title='Blog'
        description='Long-form thinking on systems, technology, and products.'
        span='md:col-span-4'
      />
      <IndexLink
        index='06'
        to='/notes'
        label='Capture'
        title='Notes'
        description='Atomic ideas, references, and observations from the workbench.'
        span='md:col-span-12'
      />
    </motion.div>
  );
};

type IndexLinkProps = {
  index: string;
  to: '/projects' | '/about' | '/blog' | '/notes';
  label: string;
  title: string;
  description: string;
  span: string;
  featured?: boolean;
};

const IndexLink = ({
  index,
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
      className={`group flex min-h-[240px] h-full w-full flex-col justify-between gap-8 p-6 transition-colors duration-200 ${
        featured ? 'bg-ink text-canvas' : 'bg-canvas text-ink'
      } hover:bg-signal hover:text-ink`}
    >
      <div className='flex justify-between items-start'>
        <span
          className={`font-mono text-[10px] uppercase tracking-[0.18em] ${
            featured ? 'opacity-60' : 'text-faint'
          }`}
        >
          [{index}] {label}
        </span>
        <ArrowUpRight
          className={`w-4 h-4 ${featured ? 'opacity-60' : 'text-faint'}`}
        />
      </div>
      <div>
        <h2 className='mb-2 text-3xl font-semibold uppercase tracking-[-0.04em]'>
          {title}
        </h2>
        <p
          className={`max-w-xs text-sm leading-relaxed ${
            featured ? 'opacity-60' : 'text-muted'
          }`}
        >
          {description}
        </p>
      </div>
    </Link>
  </motion.div>
);
