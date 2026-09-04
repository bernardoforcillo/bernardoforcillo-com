import { pageHead } from '@monorepo/seo';
import { PageHeader } from '@monorepo/ui';
import { Link, createFileRoute } from '@tanstack/react-router';
import { FolderCode } from 'lucide-react';
import { projects } from '~/content';
import { ContentRow } from '~/features/content/molecules/content-row';
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

      <section className='w-full max-w-7xl mx-auto px-6 pb-24'>
        <div className='border-t border-line'>
          {projects.map((project) => (
            <Link
              key={project.projectSlug}
              to='/projects/$projectSlug'
              params={{ projectSlug: project.projectSlug }}
              className='content-row'
            >
              <ContentRow
                title={project.title}
                description={project.description}
                meta={formatDate(project.date)}
                tags={project.stack}
              />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
