import { SectionLabel } from '@monorepo/components';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { featuredProjects } from '../../featured';
import { FOCUS_RING } from '../../styles';

type FeaturedProject = {
  projectSlug: string;
  title: string;
  description: string;
  stack: readonly string[];
};

type Props = {
  projects: readonly FeaturedProject[];
};

const ROW_CLASS = `block px-4 py-5 transition-colors hover:bg-deep-blue-50 sm:px-6.5 ${FOCUS_RING}`;

// The section collapses with no projects; the panel below owns the hook, so
// the early return here never changes the hook order.
export const FeaturedWorkSection = ({ projects }: Props) => {
  if (projects.length === 0) return null;
  return <FeaturedWorkPanel projects={featuredProjects(projects)} />;
};

const FeaturedWorkPanel = ({ projects }: Props) => {
  const [selected, setSelected] = useState(0);
  const project = projects[selected] ?? projects[0];

  return (
    <section aria-labelledby='featured-work'>
      <SectionLabel>
        {/* biome-ignore lint/a11y/useSemanticElements: SectionLabel wraps its children in a <span>, where an <h2> is not valid content. */}
        <span id='featured-work' role='heading' aria-level={2}>
          Featured work
        </span>
      </SectionLabel>
      <div className='grid border-b border-deep-blue-200 md:grid-cols-[1fr_1.3fr]'>
        <ul className='divide-y divide-deep-blue-200 border-b border-deep-blue-200 md:border-b-0 md:border-r'>
          {projects.map((item, i) => (
            <li key={item.projectSlug}>
              <Link
                to='/projects/$projectSlug'
                params={{ projectSlug: item.projectSlug }}
                onMouseEnter={() => setSelected(i)}
                onFocus={() => setSelected(i)}
                data-selected={i === selected ? '' : undefined}
                className={`${ROW_CLASS} data-selected:bg-deep-blue-50 data-selected:shadow-[inset_3px_0_0_var(--color-azure-radiance-500)]`}
              >
                <span className='block text-sm font-semibold text-deep-blue-900'>
                  {item.title}
                </span>
                <span className='mt-1 block text-[13px] leading-[1.55] text-deep-blue-600'>
                  {item.description}
                </span>
              </Link>
            </li>
          ))}
          <li>
            <Link to='/projects' className={ROW_CLASS}>
              <span className='block text-sm font-semibold text-deep-blue-900'>
                All projects →
              </span>
              <span className='mt-1 block text-[13px] leading-[1.55] text-deep-blue-600'>
                Production systems, experiments, and open-source work.
              </span>
            </Link>
          </li>
        </ul>

        <div className='flex flex-col gap-4 bg-[radial-gradient(circle_at_80%_0%,var(--color-azure-radiance-50),transparent_60%)] p-4 sm:p-6.5'>
          <div
            aria-hidden='true'
            className='relative min-h-50 flex-1 overflow-hidden rounded-xl border border-deep-blue-200 bg-linear-to-br from-azure-radiance-100 to-deep-blue-100 after:absolute after:inset-x-4.5 after:top-4.5 after:h-2.5 after:rounded-full after:bg-white/70 after:shadow-[0_22px_0_rgb(255_255_255/0.5),0_44px_0_-2px_rgb(255_255_255/0.4)]'
          />
          <div className='flex items-end justify-between gap-4'>
            <div className='min-w-0'>
              <h3 className='text-lg font-semibold tracking-[-0.02em] text-deep-blue-900'>
                {project.title}
              </h3>
              <p className='mt-1 text-[13px] leading-[1.55] text-deep-blue-600'>
                {project.description}
              </p>
            </div>
            <span className='shrink-0 rounded-full bg-bubble-gum-pink-200 px-2.5 py-0.5 text-xs font-semibold text-bubble-gum-pink-800'>
              Featured
            </span>
          </div>
          {project.stack.length > 0 ? (
            <ul aria-label='Stack' className='flex flex-wrap gap-1.5'>
              {project.stack.map((tag) => (
                <li
                  key={tag}
                  className='rounded-full border border-deep-blue-200 bg-white px-2.5 py-0.5 text-xs text-deep-blue-700'
                >
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
          <Link
            to='/projects/$projectSlug'
            params={{ projectSlug: project.projectSlug }}
            className={`self-start rounded-sm py-1 text-[13px] text-azure-radiance-700 hover:underline ${FOCUS_RING}`}
          >
            View project<span className='sr-only'>: {project.title}</span> →
          </Link>
        </div>
      </div>
    </section>
  );
};
