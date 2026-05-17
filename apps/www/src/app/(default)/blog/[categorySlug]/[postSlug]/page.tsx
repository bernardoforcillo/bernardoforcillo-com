import { BookOpen } from 'lucide-react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import PageHeader from '~/components/molecules/page-header';
import { getBlogPostBySlug, getBlogPosts } from '~/lib/content';

type Props = {
  params: Promise<{ categorySlug: string; postSlug: string }>;
};

const dateFormatter = new Intl.DateTimeFormat('en', {
  dateStyle: 'medium',
});

export const generateStaticParams = async () => {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    categorySlug: post.categorySlug,
    postSlug: post.postSlug,
  }));
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { categorySlug, postSlug } = await params;
  const post = await getBlogPostBySlug(categorySlug, postSlug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
  };
};

const Page: FC<Props> = async ({ params }) => {
  const { categorySlug, postSlug } = await params;
  const post = await getBlogPostBySlug(categorySlug, postSlug);

  if (!post) {
    notFound();
  }

  return (
    <div className='relative'>
      <PageHeader
        icon={<BookOpen className='size-7' />}
        title={post.title}
        description={post.description}
      />

      <article className='w-full max-w-3xl mx-auto px-6 pb-24'>
        <p className='text-sm text-gray-400 uppercase tracking-wider font-mono'>
          {post.categorySlug} • {dateFormatter.format(new Date(post.date))}
        </p>

        <div className='mt-10 space-y-5 text-base leading-8 text-gray-700 [&_a]:underline [&_h1]:text-4xl [&_h1]:font-bold [&_h1]:tracking-tight [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h3]:text-2xl [&_h3]:font-semibold [&_li]:list-disc [&_li]:ml-6 [&_pre]:overflow-x-auto [&_pre]:bg-gray-100 [&_pre]:p-4'>
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
};

export default Page;
