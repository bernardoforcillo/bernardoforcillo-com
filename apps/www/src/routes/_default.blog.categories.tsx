import { SITE_DESCRIPTION, TITLE_ABSOLUTE, pageHead } from '@monorepo/seo';
import { PageHeader } from '@monorepo/ui';
import { Link, createFileRoute } from '@tanstack/react-router';
import { FolderTree } from 'lucide-react';
import { blogCategories } from '~/content';

export const Route = createFileRoute('/_default/blog/categories')({
  // This page declared no metadata title under Next, so it inherited the
  // root layout, whose title.absolute shadows title.default for every
  // descendant without a title of its own. tests/seo-baseline.json records
  // the string Next actually emitted here.
  head: () =>
    pageHead({
      absoluteTitle: TITLE_ABSOLUTE,
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

      <section className='w-full max-w-7xl mx-auto px-6 pb-24'>
        <div>
          {blogCategories.map((category) => (
            <Link
              key={category.categorySlug}
              to='/blog/$categorySlug'
              params={{ categorySlug: category.categorySlug }}
              className='content-row flex justify-between items-baseline gap-6'
            >
              <span className='text-xl md:text-2xl font-medium tracking-tight'>
                {category.categorySlug}
              </span>
              <span className='industrial-label shrink-0 text-faint'>
                {category.count} posts
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
