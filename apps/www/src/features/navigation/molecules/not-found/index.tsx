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
        className='inline-flex items-center gap-2 bg-ink px-4 py-2.5 text-[12px] tracking-wide text-canvas transition-colors hover:bg-signal hover:text-ink'
      >
        Back home <ArrowRight size={14} />
      </Link>
    </section>
  </div>
);
