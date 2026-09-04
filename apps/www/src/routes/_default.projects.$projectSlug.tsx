import { buildCreativeWorkJsonLd, pageHead } from '@monorepo/seo';
import { PageHeader, Prose } from '@monorepo/ui';
import { createFileRoute, notFound } from '@tanstack/react-router';
import { FolderCode } from 'lucide-react';
import { findProject } from '~/content';
import { formatDate } from '~/lib/format-date';

const EXTERNAL_LINK_CLASS =
  'text-[13px] font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-ink transition-colors';

export const Route = createFileRoute('/_default/projects/$projectSlug')({
  loader: ({ params }) => {
    const project = findProject(params.projectSlug);
    if (!project) {
      throw notFound();
    }
    return { project };
  },
  head: ({ loaderData }) => {
    const project = loaderData?.project;
    if (!project) {
      return {};
    }
    const path = `/projects/${project.projectSlug}`;
    return pageHead({
      title: project.title,
      description: project.description,
      path,
      keywords: project.stack,
      jsonLd: [
        buildCreativeWorkJsonLd({
          title: project.title,
          description: project.description,
          path,
          datePublished: project.date,
          keywords: project.stack,
        }),
      ],
    });
  },
  component: ProjectPage,
});

function ProjectPage() {
  const { project } = Route.useLoaderData();

  return (
    <div className='relative'>
      <PageHeader
        icon={<FolderCode className='size-7' />}
        title={project.title}
        description={project.description}
      />

      <article className='w-full max-w-3xl mx-auto px-6 pb-24'>
        <p className='text-[11px] text-faint uppercase tracking-[0.16em]'>
          {formatDate(project.date)}
        </p>

        {project.stack.length > 0 ? (
          <div className='mt-4 flex flex-wrap gap-x-3 gap-y-1'>
            {project.stack.map((item) => (
              <span
                key={`${project.projectSlug}-${item}`}
                className='text-[11px] uppercase tracking-[0.14em] text-faint'
              >
                {item}
              </span>
            ))}
          </div>
        ) : null}

        {project.repoUrl || project.demoUrl ? (
          <div className='mt-6 flex flex-wrap gap-5'>
            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target='_blank'
                rel='noreferrer'
                className={EXTERNAL_LINK_CLASS}
              >
                Repository
              </a>
            ) : null}

            {project.demoUrl ? (
              <a
                href={project.demoUrl}
                target='_blank'
                rel='noreferrer'
                className={EXTERNAL_LINK_CLASS}
              >
                Live Demo
              </a>
            ) : null}
          </div>
        ) : null}

        <Prose html={project.html} />
      </article>
    </div>
  );
}
