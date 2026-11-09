import { Link } from '@tanstack/react-router';
import type { FC, ReactNode } from 'react';
import { FOCUS_RING } from '~/features/home/styles';

export type Crumb = {
  name: string;
  /** Root-relative path. */
  path: string;
};

type Props = {
  /** The trail below Home; the last item is the current page. */
  trail: Crumb[];
};

// TanStack's Link types `to` as the route union; crumbs carry plain strings.
const CrumbLink = Link as unknown as FC<{
  to: string;
  activeOptions?: { exact: boolean };
  className?: string;
  children: ReactNode;
}>;

const CRUMB_CLASS = `rounded-sm text-deep-blue-600 underline-offset-4 hover:text-deep-blue-900 hover:underline ${FOCUS_RING}`;

export const Breadcrumbs: FC<Props> = ({ trail }) => {
  const crumbs: Crumb[] = [{ name: 'Home', path: '/' }, ...trail];

  return (
    <nav aria-label='Breadcrumb'>
      <ol className='flex flex-wrap items-center gap-x-2 gap-y-1 text-sm'>
        {crumbs.map((crumb, index) => {
          const isCurrent = index === crumbs.length - 1;
          return (
            <li key={crumb.path} className='flex items-center gap-2'>
              {isCurrent ? (
                <span aria-current='page' className='text-deep-blue-900'>
                  {crumb.name}
                </span>
              ) : (
                <>
                  {/* Exact: the router would otherwise mark every ancestor
                      crumb aria-current, leaving several "current pages". */}
                  <CrumbLink
                    to={crumb.path}
                    activeOptions={{ exact: true }}
                    className={CRUMB_CLASS}
                  >
                    {crumb.name}
                  </CrumbLink>
                  <span aria-hidden='true' className='text-deep-blue-300'>
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
