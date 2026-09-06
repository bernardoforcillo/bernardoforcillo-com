import { motion } from 'motion/react';

const stats = [
  { index: '01', label: 'Years building', value: '05+' },
  { index: '02', label: 'Products shipped', value: '10+' },
  { index: '03', label: 'Open source', value: '∞' },
  { index: '04', label: 'Base', value: 'PISA/EU' },
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
      className='grid grid-cols-2 gap-px border-x border-b border-line bg-line lg:grid-cols-4'
    >
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          variants={itemVariants}
          className='flex min-h-32 flex-col justify-between gap-5 bg-canvas p-4 md:p-5'
        >
          <span className='industrial-label text-faint'>[{stat.index}]</span>
          <span className='font-mono text-2xl font-medium tracking-[-0.05em] md:text-3xl'>
            {stat.value}
          </span>
          <span className='font-mono text-[9px] uppercase tracking-[0.16em] text-faint'>
            {stat.label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
};
