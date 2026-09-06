import { Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import GithubIcon from '~/assets/icons/github-mark';
import LinkedinMark from '~/assets/icons/linkedin-mark';

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
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
            delayChildren: 0.08,
          },
        },
      }}
      className='flex flex-col'
    >
      <div className='grid gap-14 border-b border-line/80 py-14 md:grid-cols-12 md:gap-16 md:py-20'>
        <motion.div variants={fadeUp} className='md:col-span-7'>
          <span className='industrial-label text-faint'>Practice</span>
          <h3 className='mt-5 max-w-xl text-3xl font-medium leading-[1.12] tracking-[-0.03em] md:text-4xl'>
            Engineering ideas into systems that survive reality.
          </h3>
          <p className='mt-5 max-w-lg text-[15px] leading-7 text-muted'>
            Research, product thinking, and deep engineering in one practice —
            from infrastructure to the interface people touch.
          </p>
          <div className='mt-8 flex flex-wrap gap-x-4 gap-y-2'>
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
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className='md:col-span-5'>
          <span className='industrial-label text-faint'>Signal</span>
          <p className='mt-5 max-w-sm text-[15px] leading-7 text-muted'>
            Open to ambitious deep-tech systems, experimental products, and
            difficult technical problems.
          </p>
          <ul className='mt-8 space-y-3 text-[15px]'>
            <li>
              <a
                href='https://github.com/bernardoforcillo'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2.5 transition-colors hover:text-signal'
              >
                <GithubIcon className='h-4 w-4' />
                GitHub
              </a>
            </li>
            <li>
              <a
                href='https://linkedin.com/in/bernardoforcillo'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2.5 transition-colors hover:text-signal'
              >
                <LinkedinMark className='h-4 w-4' />
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href='mailto:hello@bernardoforcillo.com'
                className='transition-colors hover:text-signal'
              >
                Email
              </a>
            </li>
          </ul>
        </motion.div>
      </div>

      <nav className='flex flex-col'>
        <IndexLink
          to='/projects'
          label='Build'
          title='Projects'
          description='Production systems, experiments, and open-source work.'
        />
        <IndexLink
          to='/about'
          label='Path'
          title='About'
          description='Engineering, hardware, design, and the space between.'
        />
        <IndexLink
          to='/blog'
          label='Write'
          title='Blog'
          description='Long-form thinking on systems, technology, and products.'
        />
        <IndexLink
          to='/notes'
          label='Capture'
          title='Notes'
          description='Atomic ideas and observations from the workbench.'
        />
      </nav>
    </motion.div>
  );
};

type IndexLinkProps = {
  to: '/projects' | '/about' | '/blog' | '/notes';
  label: string;
  title: string;
  description: string;
};

const IndexLink = ({ to, label, title, description }: IndexLinkProps) => (
  <motion.div variants={fadeUp}>
    <Link
      to={to}
      className='group grid grid-cols-1 gap-2 border-b border-line/80 py-8 transition-colors md:grid-cols-[7rem_minmax(0,1fr)_auto] md:items-baseline md:gap-8 md:py-10'
    >
      <span className='industrial-label text-faint'>{label}</span>
      <div>
        <h2 className='text-2xl font-medium tracking-tight md:text-3xl'>
          {title}
        </h2>
        <p className='mt-2 max-w-md text-sm leading-relaxed text-muted'>
          {description}
        </p>
      </div>
      <ArrowUpRight className='mt-1 h-4 w-4 text-faint transition-colors group-hover:text-signal' />
    </Link>
  </motion.div>
);
