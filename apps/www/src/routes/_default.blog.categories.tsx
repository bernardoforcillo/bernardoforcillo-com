import { SITE_DESCRIPTION, pageHead } from '@monorepo/seo';
import { PageHeader } from '@monorepo/ui';
import { Link, createFileRoute } from '@tanstack/react-router';
import { FolderTree } from 'lucide-react';
import { blogCategories } from '~/content';

export const Route = createFileRoute('/_default/blog/categories')({
  // No `title`: this page exported no metadata under Next and inherited the
  // root default, `Bernardo Forcillo`.
  head: () =>
    pageHead({
      description: SITE_DESCRIPTION,
      path: '/blog/categories',
    }),
  component: BlogCategoriesPage,
});

function BlogCategoriesPage() {
  return (
    <div className='relative'>
      <PageHeader
        icon={<FolderTree className='size-7' />}
        title='Categories'
        description='Browse posts by topic.'
      />

      <section className='w-full max-w-7xl mx-auto px-6 pb-20'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {blogCategories.map((category) => (
            <Link
              key={category.categorySlug}
              to='/blog/$categorySlug'
              params={{ categorySlug: category.categorySlug }}
              className='border border-gray-200 bg-white p-6 hover:border-black transition-colors flex justify-between items-center'
            >
              <span className='text-xl font-semibold tracking-tight'>
                {category.categorySlug}
              </span>
              <span className='text-xs font-mono text-gray-400 uppercase tracking-wider'>
                {category.count} posts
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
