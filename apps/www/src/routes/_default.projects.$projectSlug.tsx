import { PageHeader, Prose } from '@monorepo/components';
import { createFileRoute, notFound } from '@tanstack/react-router';
import { ArrowUpRight, FolderCode } from 'lucide-react';
import { findProject } from '~/content';
import { Breadcrumbs } from '~/features/content/molecules/breadcrumbs';
import { ARTICLE_CLASS, TAG_CLASS } from '~/features/content/styles';
import { BUTTON_SECONDARY } from '~/features/home/styles';
import { formatDate } from '~/lib/format-date';
import {
  buildBreadcrumbJsonLd,
  buildCreativeWorkJsonLd,
  pageHead,
} from '~/lib/seo';

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
        buildBreadcrumbJsonLd([
          { name: 'Projects', path: '/projects' },
          { name: project.title, path },
        ]),
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
      >
        <Breadcrumbs
          trail={[
            { name: 'Projects', path: '/projects' },
            { name: project.title, path: `/projects/${project.projectSlug}` },
          ]}
        />
      </PageHeader>

      <article className={ARTICLE_CLASS}>
        <p className='text-sm text-deep-blue-600'>
          <time dateTime={project.date}>{formatDate(project.date)}</time>
        </p>

        {project.stack.length > 0 ? (
          <ul className='mt-4 flex flex-wrap gap-2'>
            {project.stack.map((item) => (
              <li key={`${project.projectSlug}-${item}`} className={TAG_CLASS}>
                {item}
              </li>
            ))}
          </ul>
        ) : null}

        {project.repoUrl || project.demoUrl ? (
          <div className='mt-6 flex flex-wrap gap-3'>
            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target='_blank'
                rel='noreferrer'
                className={BUTTON_SECONDARY}
              >
                Repository <ArrowUpRight size={14} aria-hidden='true' />
              </a>
            ) : null}

            {project.demoUrl ? (
              <a
                href={project.demoUrl}
                target='_blank'
                rel='noreferrer'
                className={BUTTON_SECONDARY}
              >
                Live Demo <ArrowUpRight size={14} aria-hidden='true' />
              </a>
            ) : null}
          </div>
        ) : null}

        <Prose html={project.html} />
      </article>
    </div>
  );
}
