import { FolderCode } from 'lucide-react';
import Link from 'next/link';
import type { FC } from 'react';
import PageHeader from '~/components/molecules/page-header';
import { getProjects } from '~/lib/content';

export const metadata = {
  title: 'Projects',
  description: 'A showcase of my work, experiments, and contributions.',
  openGraph: {
    title: 'Projects - Bernardo Forcillo',
    description: 'A showcase of my work, experiments, and contributions.',
    type: 'website',
    url: 'https://bernardoforcillo.com/projects',
    siteName: 'Bernardo Forcillo',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects - Bernardo Forcillo',
    description: 'A showcase of my work, experiments, and contributions.',
  },
};

const dateFormatter = new Intl.DateTimeFormat('en', {
  dateStyle: 'medium',
});

const Page: FC = async () => {
  const projects = await getProjects();

  return (
    <div className='relative'>
      <PageHeader
        icon={<FolderCode className='size-7' />}
        title='Projects'
        description='A showcase of my work, experiments, and contributions.'
      />

      <section className='w-full max-w-7xl mx-auto px-6 pb-20'>
        <div className='grid grid-cols-1 gap-4'>
          {projects.map((project) => (
            <Link
              key={project.projectSlug}
              href={`/projects/${project.projectSlug}`}
              className='border border-gray-200 bg-white p-6 hover:border-black transition-colors'
            >
              <div className='text-xs text-gray-400 uppercase tracking-wider font-mono'>
                {dateFormatter.format(new Date(project.date))}
              </div>
              <h2 className='text-2xl mt-2 font-semibold tracking-tight text-black'>
                {project.title}
              </h2>
              {project.description ? (
                <p className='mt-3 text-gray-600'>{project.description}</p>
              ) : null}
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
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Page;
