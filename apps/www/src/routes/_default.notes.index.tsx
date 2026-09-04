import { pageHead } from '@monorepo/seo';
import { PageHeader } from '@monorepo/ui';
import { Link, createFileRoute } from '@tanstack/react-router';
import { StickyNote } from 'lucide-react';
import { notes } from '~/content';
import { ContentRow } from '~/features/content/molecules/content-row';
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

      <section className='w-full max-w-7xl mx-auto px-6 pb-24'>
        <div className='border-t border-line'>
          {notes.map((note) => (
            <Link
              key={note.noteSlug}
              to='/notes/$noteSlug'
              params={{ noteSlug: note.noteSlug }}
              className='content-row'
            >
              <ContentRow
                title={note.title}
                description={note.description}
                meta={formatDate(note.date)}
              />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
