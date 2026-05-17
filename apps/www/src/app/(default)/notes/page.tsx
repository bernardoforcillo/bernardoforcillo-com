import { StickyNote } from 'lucide-react';
import Link from 'next/link';
import type { FC } from 'react';
import PageHeader from '~/components/molecules/page-header';
import { getNotes } from '~/lib/content';

export const metadata = {
  title: 'Notes',
  description: 'Quick thoughts, snippets, and personal observations',
  openGraph: {
    title: 'Notes - Bernardo Forcillo',
    description: 'Quick thoughts, snippets, and personal observations',
    type: 'website',
    url: 'https://bernardoforcillo.com/notes',
    siteName: 'Bernardo Forcillo',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Notes - Bernardo Forcillo',
    description: 'Quick thoughts, snippets, and personal observations',
  },
};

const dateFormatter = new Intl.DateTimeFormat('en', {
  dateStyle: 'medium',
});

const Page: FC = async () => {
  const notes = await getNotes();

  return (
    <div className='relative'>
      <PageHeader
        icon={<StickyNote className='size-7' />}
        title='Notes'
        description='Quick thoughts, snippets, and personal observations'
      />

      <section className='w-full max-w-7xl mx-auto px-6 pb-20'>
        <div className='grid grid-cols-1 gap-4'>
          {notes.map((note) => (
            <Link
              key={note.noteSlug}
              href={`/notes/${note.noteSlug}`}
              className='border border-gray-200 bg-white p-6 hover:border-black transition-colors'
            >
              <div className='text-xs text-gray-400 uppercase tracking-wider font-mono'>
                {dateFormatter.format(new Date(note.date))}
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
};

export default Page;
