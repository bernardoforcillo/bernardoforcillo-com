import { pageHead } from '@monorepo/seo';
import { PageHeader } from '@monorepo/ui';
import { Link, createFileRoute } from '@tanstack/react-router';
import { FolderCode } from 'lucide-react';
import { projects } from '~/content';
import { formatDate } from '~/lib/format-date';

const DESCRIPTION = 'A showcase of my work, experiments, and contributions.';

export const Route = createFileRoute('/_default/projects/')({
  head: () =>
    pageHead({
      title: 'Projects',
      description: DESCRIPTION,
      path: '/projects',
    }),
  component: ProjectsIndexPage,
});

function ProjectsIndexPage() {
  return (
    <div className='relative'>
      <PageHeader
        icon={<FolderCode className='size-7' />}
        title='Projects'
        description={DESCRIPTION}
      />

      <section className='w-full max-w-7xl mx-auto px-6 pb-20'>
        <div className='grid grid-cols-1 gap-4'>
          {projects.map((project) => (
            <Link
              key={project.projectSlug}
              to='/projects/$projectSlug'
              params={{ projectSlug: project.projectSlug }}
              className='border border-gray-200 bg-white p-6 hover:border-black transition-colors'
            >
              <div className='text-xs text-gray-400 uppercase tracking-wider font-mono'>
                {formatDate(project.date)}
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
}
