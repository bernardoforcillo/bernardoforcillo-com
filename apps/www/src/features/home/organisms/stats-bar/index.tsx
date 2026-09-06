import { motion } from 'motion/react';

const stats = [
  { label: 'Years building', value: '5+' },
  { label: 'Products shipped', value: '10+' },
  { label: 'Open source', value: '∞' },
  { label: 'Base', value: 'Pisa' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
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
      className='grid grid-cols-2 gap-y-8 border-y border-line/80 py-8 lg:grid-cols-4 lg:py-10'
    >
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          variants={itemVariants}
          className='flex flex-col gap-1.5 lg:px-2 lg:first:pl-0'
        >
          <span className='text-2xl font-medium tracking-tight md:text-3xl'>
            {stat.value}
          </span>
          <span className='industrial-label text-faint'>{stat.label}</span>
        </motion.div>
      ))}
    </motion.div>
  );
};
