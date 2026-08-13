import { PageHeader } from '@monorepo/ui';
import { Link } from '@tanstack/react-router';
import { ArrowRight, Compass } from 'lucide-react';
import type { FC } from 'react';

export const NotFound: FC = () => (
  <div className='relative'>
    <PageHeader
      icon={<Compass className='size-7' />}
      title='404'
      description='This page does not exist. It may have moved, or it may never have existed at all.'
    />

    <section className='w-full max-w-7xl mx-auto px-6 pb-20'>
      <Link
        to='/'
        className='inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-gray-800 transition-colors'
      >
        Back Home <ArrowRight size={14} />
      </Link>
    </section>
  </div>
);
