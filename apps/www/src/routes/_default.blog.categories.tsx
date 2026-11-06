import { PageHeader } from '@monorepo/components';
import { Link, createFileRoute } from '@tanstack/react-router';
import { FolderTree } from 'lucide-react';
import { blogCategories } from '~/content';
import { ROW_CLASS } from '~/features/content/styles';
import {
  SITE_DESCRIPTION,
  TITLE_ABSOLUTE,
  buildBreadcrumbJsonLd,
  pageHead,
} from '~/lib/seo';

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
      jsonLd: [
        buildBreadcrumbJsonLd([
          { name: 'Blog', path: '/blog' },
          { name: 'Categories', path: '/blog/categories' },
        ]),
      ],
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

      <section>
        {blogCategories.map((category) => (
          <Link
            key={category.categorySlug}
            to='/blog/$categorySlug'
            params={{ categorySlug: category.categorySlug }}
            className={`${ROW_CLASS} flex items-baseline justify-between gap-6`}
          >
            <span className='text-xl font-medium tracking-tight text-deep-blue-900 md:text-2xl'>
              {category.categorySlug}
            </span>
            <span className='shrink-0 text-sm text-deep-blue-600'>
              {category.count} posts
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}
