import { Link } from '@tanstack/react-router';
import { motion } from 'motion/react';

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
      className='flex flex-col gap-16 md:gap-20'
    >
      <motion.div variants={fadeUp} className='max-w-xl'>
        <p className='font-serif text-2xl italic leading-[1.3] text-ink/80 md:text-[1.65rem]'>
          Engineering ideas into systems that survive reality.
        </p>
        <p className='mt-5 text-[15px] leading-7 text-muted'>
          Research, product thinking, and deep engineering in one practice —
          from infrastructure to the interface people touch. Open to ambitious
          deep-tech systems and difficult technical problems.
        </p>
      </motion.div>

      <nav className='grid gap-x-16 gap-y-10 md:grid-cols-2 md:gap-y-0'>
        <Room
          to='/projects'
          title='Projects'
          description='Production systems, experiments, and open-source work.'
        />
        <Room
          to='/about'
          title='About'
          description='Engineering, hardware, design, and the space between.'
          className='md:pt-10'
        />
        <Room
          to='/blog'
          title='Blog'
          description='Long-form thinking on systems, technology, and products.'
          className='md:pt-4'
        />
        <Room
          to='/notes'
          title='Notes'
          description='Atomic ideas and observations from the workbench.'
          className='md:pt-14'
        />
      </nav>
    </motion.div>
  );
};

type RoomProps = {
  to: '/projects' | '/about' | '/blog' | '/notes';
  title: string;
  description: string;
  className?: string;
};

const Room = ({ to, title, description, className = '' }: RoomProps) => (
  <motion.div variants={fadeUp} className={className}>
    <Link to={to} className='group block max-w-sm py-2'>
      <h2 className='text-2xl font-medium tracking-tight md:text-3xl'>
        {title}
      </h2>
      <p className='mt-2 text-[15px] leading-7 text-muted group-hover:text-ink'>
        {description}
      </p>
    </Link>
  </motion.div>
);
