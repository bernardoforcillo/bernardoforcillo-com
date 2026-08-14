import { pageHead } from '@monorepo/seo';
import { PageHeader } from '@monorepo/ui';
import { Link, createFileRoute } from '@tanstack/react-router';
import { BookOpen } from 'lucide-react';
import { blogPosts } from '~/content';
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

      <section className='w-full max-w-7xl mx-auto px-6 pb-20'>
        <div className='grid grid-cols-1 gap-4'>
          {blogPosts.map((post) => (
            <Link
              key={`${post.categorySlug}-${post.postSlug}`}
              to='/blog/$categorySlug/$postSlug'
              params={{
                categorySlug: post.categorySlug,
                postSlug: post.postSlug,
              }}
              className='border border-gray-200 bg-white p-6 hover:border-black transition-colors'
            >
              <div className='text-xs text-gray-400 uppercase tracking-wider font-mono'>
                {post.categorySlug} • {formatDate(post.date)}
              </div>
              <h2 className='text-2xl mt-2 font-semibold tracking-tight text-black'>
                {post.title}
              </h2>
              {post.description ? (
                <p className='mt-3 text-gray-600'>{post.description}</p>
              ) : null}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
