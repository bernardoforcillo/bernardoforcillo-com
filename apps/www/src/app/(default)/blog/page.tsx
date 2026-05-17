import { BookOpen } from 'lucide-react';
import Link from 'next/link';
import type { FC } from 'react';
import PageHeader from '~/components/molecules/page-header';
import { getBlogPosts } from '~/lib/content';

export const metadata = {
  title: 'Thoughts, ideas, and insights about technology and development',
  description:
    'Thoughts, ideas, and insights about technology and development.',
  openGraph: {
    title: 'Blog - Bernardo Forcillo',
    description:
      'Thoughts, ideas, and insights about technology and development.',
    type: 'website',
    url: 'https://bernardoforcillo.com/blog',
    siteName: 'Bernardo Forcillo',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Bernardo Forcillo',
    description:
      'Thoughts, ideas, and insights about technology and development.',
  },
};

const dateFormatter = new Intl.DateTimeFormat('en', {
  dateStyle: 'medium',
});

const Page: FC = async () => {
  const posts = await getBlogPosts();

  return (
    <div className='relative'>
      <PageHeader
        icon={<BookOpen className='size-7' />}
        title='Blog'
        description='Thoughts, ideas, and insights about technology and development.'
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
                {post.categorySlug} •{' '}
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
