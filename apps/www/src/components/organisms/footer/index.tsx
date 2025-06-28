import type { FC } from 'react';

export const Footer: FC = () => {
  return (
    <footer className='border-t border-gray-200 py-8'>
      <div className='mx-auto max-w-5xl px-8 2xl:px-0'>
        <div className='flex flex-col items-center justify-between gap-4 text-sm text-gray-600 md:flex-row'>
          <span>&copy; {new Date().getFullYear()} Bernardo Forcillo</span>
          <span>Built with care in Europe</span>
        </div>
      </div>
    </footer>
  );
};
