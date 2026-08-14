import { pageHead } from '@monorepo/seo';
import { PageHeader } from '@monorepo/ui';
import { Link, createFileRoute } from '@tanstack/react-router';
import { StickyNote } from 'lucide-react';
import { notes } from '~/content';
import { formatDate } from '~/lib/format-date';

const DESCRIPTION = 'Quick thoughts, snippets, and personal observations';

export const Route = createFileRoute('/_default/notes/')({
  head: () =>
    pageHead({
      title: 'Notes',
      description: DESCRIPTION,
      path: '/notes',
    }),
  component: NotesIndexPage,
});

function NotesIndexPage() {
  return (
    <div className='relative'>
      <PageHeader
        icon={<StickyNote className='size-7' />}
        title='Notes'
        description={DESCRIPTION}
      />

      <section className='w-full max-w-7xl mx-auto px-6 pb-20'>
        <div className='grid grid-cols-1 gap-4'>
          {notes.map((note) => (
            <Link
              key={note.noteSlug}
              to='/notes/$noteSlug'
              params={{ noteSlug: note.noteSlug }}
              className='border border-gray-200 bg-white p-6 hover:border-black transition-colors'
            >
              <div className='text-xs text-gray-400 uppercase tracking-wider font-mono'>
                {formatDate(note.date)}
              </div>
              <h2 className='text-2xl mt-2 font-semibold tracking-tight text-black'>
                {note.title}
              </h2>
              {note.description ? (
                <p className='mt-3 text-gray-600'>{note.description}</p>
              ) : null}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
