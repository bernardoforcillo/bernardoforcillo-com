import { SectionLabel } from '@monorepo/components';
import { Link } from '@tanstack/react-router';
import { BookOpen, Folder, StickyNote, User } from 'lucide-react';
import type { ReactNode } from 'react';
import { FOCUS_RING } from '../../styles';

type Room = {
  to: '/projects' | '/about' | '/blog' | '/notes';
  title: string;
  description: string;
  more: string;
  icon: ReactNode;
};

// Icons match the navbar's mobile menu.
const ROOMS: Room[] = [
  {
    to: '/projects',
    title: 'Projects',
    description: 'Production systems, experiments, and open-source work.',
    more: 'View projects',
    icon: <Folder size={16} />,
  },
  {
    to: '/about',
    title: 'About',
    description: 'Engineering, hardware, design, and the space between.',
    more: 'Read more',
    icon: <User size={16} />,
  },
  {
    to: '/blog',
    title: 'Blog',
    description: 'Long-form thinking on systems, technology, and products.',
    more: 'Read the blog',
    icon: <BookOpen size={16} />,
  },
  {
    to: '/notes',
    title: 'Notes',
    description: 'Atomic ideas and observations from the workbench.',
    more: 'Browse notes',
    icon: <StickyNote size={16} />,
  },
];

export const ExploreSection = () => (
  <section aria-labelledby='explore'>
    <SectionLabel>
      {/* biome-ignore lint/a11y/useSemanticElements: SectionLabel wraps its children in a <span>, where an <h2> is not valid content. */}
      <span id='explore' role='heading' aria-level={2}>
        Explore
      </span>
    </SectionLabel>
    <ul className='grid gap-px border-b border-deep-blue-200 bg-deep-blue-200 md:grid-cols-2'>
      {ROOMS.map((room) => (
        <li key={room.to} className='bg-white'>
          <Link
            to={room.to}
            className={`group block h-full px-4 py-8.5 transition-colors hover:bg-deep-blue-50 sm:px-7.5 ${FOCUS_RING}`}
          >
            <span
              aria-hidden='true'
              className='grid size-9 place-items-center rounded-[10px] border border-azure-radiance-200 bg-azure-radiance-50 text-azure-radiance-700'
            >
              {room.icon}
            </span>
            <h3 className='mt-4 text-xl font-semibold tracking-[-0.02em] text-deep-blue-900'>
              {room.title}
            </h3>
            <p className='mt-1.5 text-sm leading-[1.6] text-deep-blue-600'>
              {room.description}
            </p>
            <span className='mt-3 inline-block text-[13px] text-azure-radiance-700 group-hover:underline'>
              {room.more} →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  </section>
);
