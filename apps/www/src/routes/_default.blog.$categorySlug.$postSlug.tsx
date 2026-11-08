import { Prose } from '@monorepo/components';
import { createFileRoute, notFound } from '@tanstack/react-router';
import { findPost } from '~/content';
import { ArticleFooter } from '~/features/content/molecules/article-footer';
import { ArticleHeader } from '~/features/content/molecules/article-header';
import { ARTICLE_CLASS } from '~/features/content/styles';
import { formatDate } from '~/lib/format-date';
import { readingMinutes } from '~/lib/reading-time';
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
    <>
      <ArticleHeader
        trail={[
          { name: 'Blog', path: '/blog' },
          { name: post.categorySlug, path: `/blog/${post.categorySlug}` },
          {
            name: post.title,
            path: `/blog/${post.categorySlug}/${post.postSlug}`,
          },
        ]}
        title={post.title}
        description={post.description}
        date={post.date}
        dateLabel={formatDate(post.date)}
        minutes={readingMinutes(post.content)}
        tags={post.tags}
      />
      <article className={ARTICLE_CLASS}>
        <Prose html={post.html} />
      </article>
      <ArticleFooter
        title={post.title}
        back={{ to: '/blog', label: 'All posts' }}
      />
    </>
  );
}
