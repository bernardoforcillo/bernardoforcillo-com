import { BookOpen } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { FC } from 'react';
import PageHeader from '~/components/molecules/page-header';
import { getBlogPosts } from '~/lib/content';

type Props = {
  params: Promise<{ categorySlug: string }>;
};

const dateFormatter = new Intl.DateTimeFormat('en', {
  dateStyle: 'medium',
});

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { categorySlug } = await params;

  return {
    title: `${categorySlug} blog posts`,
    description: `Articles in the ${categorySlug} category.`,
  };
};

const Page: FC<Props> = async ({ params }) => {
  const { categorySlug } = await params;
  const posts = (await getBlogPosts()).filter(
    (post) => post.categorySlug === categorySlug,
  );

  if (posts.length === 0) {
    notFound();
  }

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
              href={`/blog/${post.categorySlug}/${post.postSlug}`}
              className='border border-gray-200 bg-white p-6 hover:border-black transition-colors'
            >
              <div className='text-xs text-gray-400 uppercase tracking-wider font-mono'>
                {dateFormatter.format(new Date(post.date))}
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
};

export default Page;
