import { Prose } from '@monorepo/components';
import { createFileRoute, notFound } from '@tanstack/react-router';
import { findNote } from '~/content';
import { ArticleFooter } from '~/features/content/molecules/article-footer';
import { ArticleHeader } from '~/features/content/molecules/article-header';
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
    <>
      <ArticleHeader
        trail={[
          { name: 'Notes', path: '/notes' },
          { name: note.title, path: `/notes/${note.noteSlug}` },
        ]}
        title={note.title}
        description={note.description}
        date={note.date}
        dateLabel={formatDate(note.date)}
      />
      <article className={ARTICLE_CLASS}>
        <Prose html={note.html} />
      </article>
      <ArticleFooter
        title={note.title}
        back={{ to: '/notes', label: 'All notes' }}
      />
    </>
  );
}
