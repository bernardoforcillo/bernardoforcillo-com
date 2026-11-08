import { Prose } from '@monorepo/components';
import { createFileRoute, notFound } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { findProject } from '~/content';
import { ArticleFooter } from '~/features/content/molecules/article-footer';
import { ArticleHeader } from '~/features/content/molecules/article-header';
import { ARTICLE_CLASS } from '~/features/content/styles';
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
    <>
      <ArticleHeader
        trail={[
          { name: 'Projects', path: '/projects' },
          { name: project.title, path: `/projects/${project.projectSlug}` },
        ]}
        title={project.title}
        description={project.description}
        date={project.date}
        dateLabel={formatDate(project.date)}
        tags={project.stack}
        actions={
          project.repoUrl || project.demoUrl ? (
            <>
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
                  Live demo <ArrowUpRight size={14} aria-hidden='true' />
                </a>
              ) : null}
            </>
          ) : undefined
        }
      />
      <article className={ARTICLE_CLASS}>
        <Prose html={project.html} />
      </article>
      <ArticleFooter
        title={project.title}
        back={{ to: '/projects', label: 'All projects' }}
      />
    </>
  );
}
