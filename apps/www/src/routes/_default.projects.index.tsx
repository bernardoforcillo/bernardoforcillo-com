import { PageHeader } from '@monorepo/components';
import { Link, createFileRoute } from '@tanstack/react-router';
import { FolderCode } from 'lucide-react';
import { projects } from '~/content';
import { ContentRow } from '~/features/content/molecules/content-row';
import { ROW_CLASS } from '~/features/content/styles';
import { formatDate } from '~/lib/format-date';
import { buildBreadcrumbJsonLd, pageHead } from '~/lib/seo';

const DESCRIPTION = 'A showcase of my work, experiments, and contributions.';

export const Route = createFileRoute('/_default/projects/')({
  head: () =>
    pageHead({
      title: 'Projects',
      description: DESCRIPTION,
      path: '/projects',
      jsonLd: [
        buildBreadcrumbJsonLd([{ name: 'Projects', path: '/projects' }]),
      ],
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

      <section>
        {projects.map((project) => (
          <Link
            key={project.projectSlug}
            to='/projects/$projectSlug'
            params={{ projectSlug: project.projectSlug }}
            className={ROW_CLASS}
          >
            <ContentRow
              title={project.title}
              description={project.description}
              meta={formatDate(project.date)}
              tags={project.stack}
            />
          </Link>
        ))}
      </section>
    </div>
  );
}
