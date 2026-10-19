import { pageHead } from '@monorepo/seo';
import { PageHeader } from '@monorepo/ui';
import { Link, createFileRoute } from '@tanstack/react-router';
import { BookOpen } from 'lucide-react';
import { blogPosts } from '~/content';
import { ContentRow } from '~/features/content/molecules/content-row';
import { formatDate } from '~/lib/format-date';

const DESCRIPTION =
  'Thoughts, ideas, and insights about technology and development.';

export const Route = createFileRoute('/_default/blog/')({
  head: () =>
    pageHead({
      // The document title kept from the Next metadata verbatim, including the
      // trailing full stop that it does not have.
      title: 'Thoughts, ideas, and insights about technology and development',
      ogTitle: 'Blog - Bernardo Forcillo',
      description: DESCRIPTION,
      path: '/blog',
    }),
  component: BlogIndexPage,
});

function BlogIndexPage() {
  return (
    <div className='relative'>
      <PageHeader
        icon={<BookOpen className='size-7' />}
        title='Blog'
        description={DESCRIPTION}
      />

      <section className='w-full max-w-7xl mx-auto px-6 pb-24'>
        <div>
          {blogPosts.map((post) => (
            <Link
              key={`${post.categorySlug}-${post.postSlug}`}
              to='/blog/$categorySlug/$postSlug'
              params={{
                categorySlug: post.categorySlug,
                postSlug: post.postSlug,
              }}
              className='content-row'
            >
              <ContentRow
                title={post.title}
                description={post.description}
                meta={`${post.categorySlug} · ${formatDate(post.date)}`}
              />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
