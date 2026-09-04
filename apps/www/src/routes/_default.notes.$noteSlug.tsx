import { buildCreativeWorkJsonLd, pageHead } from '@monorepo/seo';
import { PageHeader, Prose } from '@monorepo/ui';
import { createFileRoute, notFound } from '@tanstack/react-router';
import { StickyNote } from 'lucide-react';
import { findNote } from '~/content';
import { formatDate } from '~/lib/format-date';

export const Route = createFileRoute('/_default/notes/$noteSlug')({
  loader: ({ params }) => {
    const note = findNote(params.noteSlug);
    if (!note) {
      throw notFound();
    }
    return { note };
  },
  head: ({ loaderData }) => {
    const note = loaderData?.note;
    if (!note) {
      return {};
    }
    const path = `/notes/${note.noteSlug}`;
    return pageHead({
      title: note.title,
      description: note.description,
      path,
      type: 'article',
      publishedTime: note.date,
      jsonLd: [
        buildCreativeWorkJsonLd({
          title: note.title,
          description: note.description,
          path,
          datePublished: note.date,
        }),
      ],
    });
  },
  component: NotePage,
});

function NotePage() {
  const { note } = Route.useLoaderData();

  return (
    <div className='relative'>
      <PageHeader
        icon={<StickyNote className='size-7' />}
        title={note.title}
        description={note.description}
      />

      <article className='w-full max-w-3xl mx-auto px-6 pb-24'>
        <p className='text-[11px] text-faint uppercase tracking-[0.16em]'>
          {formatDate(note.date)}
        </p>

        <Prose html={note.html} />
      </article>
    </div>
  );
}
