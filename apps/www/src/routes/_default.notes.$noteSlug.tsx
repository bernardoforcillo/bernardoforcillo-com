import { PageHeader, Prose } from '@monorepo/components';
import { createFileRoute, notFound } from '@tanstack/react-router';
import { StickyNote } from 'lucide-react';
import { findNote } from '~/content';
import { Breadcrumbs } from '~/features/content/molecules/breadcrumbs';
import { ARTICLE_CLASS } from '~/features/content/styles';
import { formatDate } from '~/lib/format-date';
import {
  buildBreadcrumbJsonLd,
  buildCreativeWorkJsonLd,
  pageHead,
} from '~/lib/seo';

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
        buildBreadcrumbJsonLd([
          { name: 'Notes', path: '/notes' },
          { name: note.title, path },
        ]),
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
      >
        <Breadcrumbs
          trail={[
            { name: 'Notes', path: '/notes' },
            { name: note.title, path: `/notes/${note.noteSlug}` },
          ]}
        />
      </PageHeader>

      <article className={ARTICLE_CLASS}>
        <p className='text-sm text-deep-blue-600'>
          <time dateTime={note.date}>{formatDate(note.date)}</time>
        </p>

        <Prose html={note.html} />
      </article>
    </div>
  );
}
