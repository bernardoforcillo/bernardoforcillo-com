import { motion } from 'motion/react';

const stats = [
  { label: 'Years Building', value: '5+' },
  { label: 'Products Shipped', value: '10+' },
  { label: 'Open Source', value: '∞' },
  { label: 'Based In', value: 'Pisa, EU' },
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
      className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3'
    >
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          variants={itemVariants}
          className='px-6 py-5 flex flex-col gap-1 rounded-xl bg-gray-50/80 hover:bg-white transition-colors'
        >
          <span className='text-2xl md:text-3xl font-bold tracking-tighter'>
            {stat.value}
          </span>
          <span className='font-mono text-xs text-gray-400 uppercase tracking-wider'>
            {stat.label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
};
