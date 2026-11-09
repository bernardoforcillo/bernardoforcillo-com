import type { FC, ReactNode } from 'react';
import type { LinkComponent, NavItem } from '../types';

type ExternalLink = { label: string; href: string; icon?: ReactNode };

type Props = {
  Link: LinkComponent;
  name: string;
  tagline: string;
  /** Left side of the bottom bar, e.g. the site's domain. */
  site: string;
  /** Pre-formatted rights line, so the app keeps ownership of i18n. */
  rights: string;
  index: NavItem[];
  legal: NavItem[];
  /** Items with an `icon` also render as round buttons under the tagline. */
  elsewhere: ExternalLink[];
};

const FOCUS_RING =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azure-radiance-700';

const LINK_CLASS = `rounded-sm text-sm text-deep-blue-600 transition-colors hover:text-deep-blue-900 ${FOCUS_RING}`;

const ICON_BUTTON_CLASS = `inline-flex size-9 items-center justify-center rounded-full border border-deep-blue-200 bg-white text-deep-blue-600 transition-colors hover:border-deep-blue-300 hover:text-deep-blue-900 ${FOCUS_RING}`;

const HEADING_CLASS = 'text-[13px] font-semibold text-deep-blue-900';

// mailto: opens the mail client in place; everything else is another site.
const externalProps = (href: string) =>
  href.startsWith('mailto:')
    ? {}
    : { target: '_blank', rel: 'noopener noreferrer' };

const InternalColumn: FC<{
  Link: LinkComponent;
  title: string;
  items: NavItem[];
}> = ({ Link, title, items }) => (
  <div>
    <p className={HEADING_CLASS}>{title}</p>
    <ul className='mt-3.5 grid gap-2.5'>
      {items.map((link) => (
        <li key={link.to}>
          <Link to={link.to} className={LINK_CLASS}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export const Footer: FC<Props> = ({
  Link,
  name,
  tagline,
  site,
  rights,
  index,
  legal,
  elsewhere,
}) => {
  const social = elsewhere.filter((link) => link.icon);

  return (
    <footer>
      {/* Opens on a hairline that fades into the rail, like the section breaks. */}
      <div
        aria-hidden='true'
        className='mx-4 h-px bg-[linear-gradient(90deg,transparent,var(--color-deep-blue-200)_20%,var(--color-deep-blue-200)_80%,transparent)] sm:mx-6'
      />
      <div className='grid grid-cols-2 gap-x-5 gap-y-10 px-5 pb-10 pt-11 sm:grid-cols-3 sm:px-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]'>
        <div className='col-span-2 sm:col-span-3 md:col-span-1'>
          <span className='font-semibold tracking-tight text-deep-blue-900'>
            {name}
          </span>
          <p className='mt-3.5 max-w-[300px] text-sm leading-relaxed text-deep-blue-600'>
            {tagline}
          </p>
          {social.length > 0 && (
            <ul className='mt-4.5 flex gap-2'>
              {social.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-label={link.label}
                    {...externalProps(link.href)}
                    className={ICON_BUTTON_CLASS}
                  >
                    {link.icon}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <InternalColumn Link={Link} title='Index' items={index} />
        <InternalColumn Link={Link} title='Legal' items={legal} />

        <div>
          <p className={HEADING_CLASS}>Elsewhere</p>
          <ul className='mt-3.5 grid gap-2.5'>
            {elsewhere.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  {...externalProps(link.href)}
                  className={LINK_CLASS}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className='flex flex-col gap-1 border-t border-deep-blue-200 px-5 py-4.5 text-[13px] text-deep-blue-600 sm:flex-row sm:justify-between sm:px-10'>
        <span>{site}</span>
        <span>{rights}</span>
      </div>
    </footer>
  );
};
