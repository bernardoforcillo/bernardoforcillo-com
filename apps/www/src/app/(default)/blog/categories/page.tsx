import { FolderTree } from 'lucide-react';
import Link from 'next/link';
import type { FC } from 'react';
import PageHeader from '~/components/molecules/page-header';
import { getBlogCategories } from '~/lib/content';

const Page: FC = async () => {
  const categories = await getBlogCategories();

  return (
    <div className='relative'>
      <PageHeader
        icon={<FolderTree className='size-7' />}
        title='Categories'
        description='Browse posts by topic.'
      />

      <section className='w-full max-w-7xl mx-auto px-6 pb-20'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {categories.map((category) => (
            <Link
              key={category.categorySlug}
              href={`/blog/${category.categorySlug}`}
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
};

export default Page;
