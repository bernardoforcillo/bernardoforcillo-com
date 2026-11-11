import { Prose } from '@monorepo/components';
import { createFileRoute, notFound } from '@tanstack/react-router';
import { findPost } from '~/content';
import { ArticleFooter } from '~/features/content/molecules/article-footer';
import { ArticleHeader } from '~/features/content/molecules/article-header';
import { ARTICLE_CLASS } from '~/features/content/styles';
import { formatDate } from '~/lib/format-date';
import { readingMinutes, wordCount } from '~/lib/reading-time';
import {
  buildBlogPostingJsonLd,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  extractCitations,
  extractFaq,
  pageHead,
} from '~/lib/seo';
import {
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  blogOgImagePath,
} from '~/lib/seo/og-image';

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
    const faq = extractFaq(post.content);
    return pageHead({
      // The page's <h1> stays the full headline; search results get the
      // shorter title when the post declares one.
      title: post.seoTitle ?? post.title,
      description: post.description,
      path,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.updated,
      tags: post.tags,
      keywords: post.tags,
      markdownAlternate: true,
      // Written after the build by scripts/og-images.mjs.
      image: {
        path: blogOgImagePath(post.categorySlug, post.postSlug),
        width: OG_IMAGE_WIDTH,
        height: OG_IMAGE_HEIGHT,
        alt: post.title,
      },
      jsonLd: [
        buildBlogPostingJsonLd({
          title: post.title,
          description: post.description,
          path,
          datePublished: post.date,
          dateModified: post.updated,
          keywords: post.tags,
          articleSection: post.categorySlug,
          wordCount: wordCount(post.content),
          readingMinutes: readingMinutes(post.content),
          citations: extractCitations(post.content),
          about: post.about,
        }),
        buildBreadcrumbJsonLd([
          { name: 'Blog', path: '/blog' },
          { name: post.categorySlug, path: `/blog/${post.categorySlug}` },
          { name: post.title, path },
        ]),
        ...(faq.length > 0 ? [buildFaqJsonLd(path, faq)] : []),
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
