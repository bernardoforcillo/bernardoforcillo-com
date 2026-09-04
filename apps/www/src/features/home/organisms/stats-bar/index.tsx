import { motion } from 'motion/react';

const stats = [
  { label: 'Years building', value: '5+' },
  { label: 'Products shipped', value: '10+' },
  { label: 'Open source', value: '∞' },
  { label: 'Based in', value: 'Pisa' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

export const StatsBar = () => {
  return (
    <motion.div
      initial='hidden'
      whileInView='show'
      viewport={{ once: true, margin: '-40px' }}
      variants={containerVariants}
      className='grid grid-cols-2 lg:grid-cols-4 gap-px bg-line border-y border-line'
    >
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          variants={itemVariants}
          className='bg-canvas px-6 py-6 lg:py-8 max-lg:odd:pl-0 lg:first:pl-0 flex flex-col gap-1.5'
        >
          <span className='text-2xl md:text-3xl font-medium tracking-tight'>
            {stat.value}
          </span>
          <span className='text-[11px] uppercase tracking-[0.16em] text-faint'>
            {stat.label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
};
