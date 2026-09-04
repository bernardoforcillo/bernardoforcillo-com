import { buildBlogPostingJsonLd, pageHead } from '@monorepo/seo';
import { PageHeader, Prose } from '@monorepo/ui';
import { createFileRoute, notFound } from '@tanstack/react-router';
import { BookOpen } from 'lucide-react';
import { findPost } from '~/content';
import { formatDate } from '~/lib/format-date';

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
      />

      <article className='w-full max-w-3xl mx-auto px-6 pb-24'>
        <p className='text-[11px] text-faint uppercase tracking-[0.16em]'>
          {post.categorySlug} · {formatDate(post.date)}
        </p>

        <Prose html={post.html} />
      </article>
    </div>
  );
}
