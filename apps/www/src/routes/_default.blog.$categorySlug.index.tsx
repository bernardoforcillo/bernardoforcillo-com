import { pageHead } from '@monorepo/seo';
import { PageHeader } from '@monorepo/ui';
import { Link, createFileRoute, notFound } from '@tanstack/react-router';
import { BookOpen } from 'lucide-react';
import { postsByCategory } from '~/content';
import { formatDate } from '~/lib/format-date';

export const Route = createFileRoute('/_default/blog/$categorySlug/')({
  loader: ({ params }) => {
    const posts = postsByCategory(params.categorySlug);
    if (posts.length === 0) {
      throw notFound();
    }
    return { categorySlug: params.categorySlug, posts };
  },
  head: ({ loaderData }) => {
    // loaderData is optional in the head context: it is undefined while the
    // route is pending and after an error.
    const categorySlug = loaderData?.categorySlug;
    if (!categorySlug) {
      return {};
    }
    return pageHead({
      title: `${categorySlug} blog posts`,
      description: `Articles in the ${categorySlug} category.`,
      path: `/blog/${categorySlug}`,
    });
  },
  component: BlogCategoryPage,
});

function BlogCategoryPage() {
  const { categorySlug, posts } = Route.useLoaderData();

  return (
    <div className='relative'>
      <PageHeader
        icon={<BookOpen className='size-7' />}
        title={categorySlug}
        description={`Posts inside ${categorySlug}.`}
      />

      <section className='w-full max-w-7xl mx-auto px-6 pb-20'>
        <div className='grid grid-cols-1 gap-4'>
          {posts.map((post) => (
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
                {formatDate(post.date)}
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
