import { FolderCode } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import PageHeader from '~/components/molecules/page-header';
import { getProjectBySlug, getProjects } from '~/lib/content';

type Props = {
  params: Promise<{ projectSlug: string }>;
};

const dateFormatter = new Intl.DateTimeFormat('en', {
  dateStyle: 'medium',
});

export const generateStaticParams = async () => {
  const projects = await getProjects();
  return projects.map((project) => ({ projectSlug: project.projectSlug }));
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { projectSlug } = await params;
  const project = await getProjectBySlug(projectSlug);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.description,
  };
};

const Page: FC<Props> = async ({ params }) => {
  const { projectSlug } = await params;
  const project = await getProjectBySlug(projectSlug);

  if (!project) {
    notFound();
  }

  return (
    <div className='relative'>
      <PageHeader
        icon={<FolderCode className='size-7' />}
        title={project.title}
        description={project.description}
      />

      <article className='w-full max-w-3xl mx-auto px-6 pb-24'>
        <p className='text-sm text-gray-400 uppercase tracking-wider font-mono'>
          {dateFormatter.format(new Date(project.date))}
        </p>

        {project.stack.length > 0 ? (
          <div className='mt-4 flex flex-wrap gap-2'>
            {project.stack.map((item) => (
              <span
                key={`${project.projectSlug}-${item}`}
                className='text-xs font-mono uppercase tracking-wide px-2 py-1 border border-gray-200 text-gray-500'
              >
                {item}
              </span>
            ))}
          </div>
        ) : null}

        {(project.repoUrl || project.demoUrl) && (
          <div className='mt-6 flex flex-wrap gap-3'>
            {project.repoUrl ? (
              <Link
                href={project.repoUrl}
                target='_blank'
                rel='noreferrer'
                className='text-sm font-mono uppercase tracking-wide border border-gray-200 px-3 py-2 hover:border-black transition-colors'
              >
                Repository
              </Link>
            ) : null}

            {project.demoUrl ? (
              <Link
                href={project.demoUrl}
                target='_blank'
                rel='noreferrer'
                className='text-sm font-mono uppercase tracking-wide border border-gray-200 px-3 py-2 hover:border-black transition-colors'
              >
                Live Demo
              </Link>
            ) : null}
          </div>
        )}

        <div className='mt-10 space-y-5 text-base leading-8 text-gray-700 [&_a]:underline [&_h1]:text-4xl [&_h1]:font-bold [&_h1]:tracking-tight [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h3]:text-2xl [&_h3]:font-semibold [&_li]:list-disc [&_li]:ml-6 [&_pre]:overflow-x-auto [&_pre]:bg-gray-100 [&_pre]:p-4'>
          <ReactMarkdown>{project.content}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
};

export default Page;
