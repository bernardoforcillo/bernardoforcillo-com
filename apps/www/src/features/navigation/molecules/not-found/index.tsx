import { PageHeader } from '@monorepo/components';
import { Link } from '@tanstack/react-router';
import { ArrowRight, Compass } from 'lucide-react';
import type { FC } from 'react';
import { BUTTON_PRIMARY } from '~/features/home/styles';

export const NotFound: FC = () => (
  <div className='relative'>
    <PageHeader
      icon={<Compass className='size-7' />}
      title='404'
      description='This page does not exist. It may have moved, or it may never have existed at all.'
      actions={
        <Link to='/' className={BUTTON_PRIMARY}>
          Back home <ArrowRight size={14} aria-hidden='true' />
        </Link>
      }
    />
  </div>
);
