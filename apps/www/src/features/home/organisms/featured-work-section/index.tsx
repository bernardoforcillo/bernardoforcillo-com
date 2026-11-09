import { SectionLabel } from '@monorepo/components';
import { Link } from '@tanstack/react-router';
import { featuredProjects } from '../../featured';
import { FOCUS_RING } from '../../styles';

type FeaturedProject = {
  projectSlug: string;
  title: string;
  description: string;
  stack: readonly string[];
  /** ISO date; the row shows its year. */
  date?: string;
};

type Props = {
  projects: readonly FeaturedProject[];
};

// Selected work as large, quiet rows: the name carries the row, the stack and
// year sit beside it in mono like a manifest.
export const FeaturedWorkSection = ({ projects }: Props) => {
  if (projects.length === 0) return null;

  return (
    <section aria-labelledby='featured-work'>
      <SectionLabel>
        {/* biome-ignore lint/a11y/useSemanticElements: SectionLabel wraps its children in a <span>, where an <h2> is not valid content. */}
        <span id='featured-work' role='heading' aria-level={2}>
          Selected work
        </span>
      </SectionLabel>
      <ul className='mx-4 border-y border-deep-blue-100 py-2 sm:mx-10'>
        {featuredProjects(projects).map((project) => (
          <li key={project.projectSlug}>
            <Link
              to='/projects/$projectSlug'
              params={{ projectSlug: project.projectSlug }}
              className={`group surface-hover grid gap-x-10 gap-y-3 rounded-[18px] px-4 py-7 md:grid-cols-[1fr_auto] md:items-end ${FOCUS_RING}`}
            >
              <div>
                <div className='flex items-baseline gap-3'>
                  <h3 className='text-[clamp(2rem,5vw,2.75rem)] font-semibold leading-none tracking-[-0.045em] text-deep-blue-900'>
                    {project.title}
                  </h3>
                  <span
                    aria-hidden='true'
                    className='text-xl text-azure-radiance-600 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100'
                  >
                    ↗
                  </span>
                </div>
                <p className='mt-3 max-w-[52ch] text-[15px] leading-[1.6] text-deep-blue-600'>
                  {project.description}
                </p>
              </div>
              <div className='flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[13px] text-deep-blue-600 md:justify-end'>
                {project.stack.length > 0 ? (
                  <span>{project.stack.join(' / ').toLowerCase()}</span>
                ) : null}
                {project.date ? <span>{project.date.slice(0, 4)}</span> : null}
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className='px-6 pt-2 sm:px-10'>
        <Link
          to='/projects'
          className={`group inline-flex items-center gap-1.5 rounded-sm font-mono text-[13px] text-azure-radiance-700 ${FOCUS_RING}`}
        >
          all projects
          <span
            aria-hidden='true'
            className='transition-transform duration-300 group-hover:translate-x-1'
          >
            →
          </span>
        </Link>
      </div>
    </section>
  );
};
