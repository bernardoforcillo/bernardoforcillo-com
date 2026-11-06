import { PageHeader, Prose } from '@monorepo/components';
import { createFileRoute, notFound } from '@tanstack/react-router';
import { BookOpen } from 'lucide-react';
import { findPost } from '~/content';
import { Breadcrumbs } from '~/features/content/molecules/breadcrumbs';
import { ARTICLE_CLASS } from '~/features/content/styles';
import { formatDate } from '~/lib/format-date';
import {
  buildBlogPostingJsonLd,
  buildBreadcrumbJsonLd,
  pageHead,
} from '~/lib/seo';

export const Route = createFileRoute('/_default/blog/$categorySlug/$postSlug')({
  loader: ({ params }) => {
    const post = findPost(params.categorySlug, params.postSlug);
    if (!post) {
      throw notFound();
    }
    return { post };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    if (!post) {
      return {};
    }
    const path = `/blog/${post.categorySlug}/${post.postSlug}`;
    return pageHead({
      title: post.title,
      description: post.description,
      path,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
      keywords: post.tags,
      jsonLd: [
        buildBlogPostingJsonLd({
          title: post.title,
          description: post.description,
          path,
          datePublished: post.date,
          keywords: post.tags,
          articleSection: post.categorySlug,
        }),
        buildBreadcrumbJsonLd([
          { name: 'Blog', path: '/blog' },
          { name: post.categorySlug, path: `/blog/${post.categorySlug}` },
          { name: post.title, path },
        ]),
      ],
    });
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post } = Route.useLoaderData();

  return (
    <div className='relative'>
      <PageHeader
        icon={<BookOpen className='size-7' />}
        title={post.title}
        description={post.description}
      >
        <Breadcrumbs
          trail={[
            { name: 'Blog', path: '/blog' },
            {
              name: post.categorySlug,
              path: `/blog/${post.categorySlug}`,
            },
            {
              name: post.title,
              path: `/blog/${post.categorySlug}/${post.postSlug}`,
            },
          ]}
        />
      </PageHeader>

      <article className={ARTICLE_CLASS}>
        <p className='text-sm text-deep-blue-600'>
          {post.categorySlug} ·{' '}
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>

        <Prose html={post.html} />
      </article>
    </div>
  );
}
