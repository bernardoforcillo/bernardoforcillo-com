import { PageHeader } from '@monorepo/components';
import { Link, createFileRoute } from '@tanstack/react-router';
import { StickyNote } from 'lucide-react';
import { notes } from '~/content';
import { ContentRow } from '~/features/content/molecules/content-row';
import { ROW_CLASS } from '~/features/content/styles';
import { formatDate } from '~/lib/format-date';
import { pageHead } from '~/lib/seo';

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

      <section>
        {notes.map((note) => (
          <Link
            key={note.noteSlug}
            to='/notes/$noteSlug'
            params={{ noteSlug: note.noteSlug }}
            className={ROW_CLASS}
          >
            <ContentRow
              title={note.title}
              description={note.description}
              meta={formatDate(note.date)}
            />
          </Link>
        ))}
      </section>
    </div>
  );
}
