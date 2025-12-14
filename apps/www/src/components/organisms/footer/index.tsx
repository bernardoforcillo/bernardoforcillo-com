import type { FC } from 'react';

export const Footer: FC = () => {
  return (
    <footer className='border-t border-gray-200 py-8 bg-white'>
      <div className='mx-auto max-w-7xl px-6'>
        <div className='flex flex-col items-center justify-between gap-4 text-xs font-mono text-gray-500 md:flex-row uppercase tracking-wide'>
          <span>&copy; {new Date().getFullYear()} Bernardo Forcillo</span>
          <span>Built with care in Europe</span>
        </div>
      </div>
    </footer>
  );
};
