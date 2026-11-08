import { MotionConfig, motion } from 'motion/react';
import { type FC, useEffect, useState } from 'react';
import {
  Button,
  Menu,
  MenuItem,
  MenuTrigger,
  Popover,
} from 'react-aria-components';
import type { LinkComponent, NavItem } from '../types';

type Props = {
  Link: LinkComponent;
  brand: string;
  items: NavItem[];
  cta: { label: string; href: string };
};

const FOCUS_RING =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azure-radiance-700';

const PILL_CLASS = `relative block rounded-full border px-3.5 py-1.5 text-sm transition-colors duration-200 ${FOCUS_RING}`;

const ACTIVE_PILL_CLASS =
  'border-deep-blue-200 bg-white text-deep-blue-900 shadow-sm';

const INACTIVE_PILL_CLASS =
  'border-transparent text-deep-blue-600 hover:text-deep-blue-900';

const MOBILE_LINK_CLASS =
  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors';

const SCROLL_THRESHOLD = 8;

const useScrolled = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return scrolled;
};

export const Navbar: FC<Props> = ({ Link, brand, items, cta }) => {
  const scrolled = useScrolled();
  // The link under the pointer; a single highlight glides between them.
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <header className='sticky top-4 z-50 mx-4 sm:mx-7'>
      <div
        className={`mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-2xl border px-4 py-2.5 transition-all duration-300 ${
          scrolled
            ? 'border-deep-blue-200 bg-white/75 backdrop-blur-lg'
            : 'border-transparent bg-transparent'
        }`}
      >
        <Link
          to='/'
          className={`shrink-0 justify-self-start whitespace-nowrap rounded-sm font-semibold tracking-tight text-deep-blue-900 ${FOCUS_RING}`}
        >
          {brand}
        </Link>

        <nav aria-label='Main' className='hidden sm:block'>
          <MotionConfig reducedMotion='user'>
            <ol
              className='flex items-center gap-1'
              onMouseLeave={() => setHovered(null)}
            >
              {items.map((el) => (
                <li
                  key={el.to}
                  className='relative'
                  onMouseEnter={() => setHovered(el.to)}
                >
                  {hovered === el.to ? (
                    <motion.span
                      layoutId='nav-hover'
                      aria-hidden='true'
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 40,
                      }}
                      className='absolute inset-0 rounded-full bg-deep-blue-100/70'
                    />
                  ) : null}
                  <Link
                    to={el.to}
                    activeOptions={{ exact: el.exact ?? false }}
                    className={PILL_CLASS}
                    activeProps={{ className: ACTIVE_PILL_CLASS }}
                    inactiveProps={{ className: INACTIVE_PILL_CLASS }}
                  >
                    {el.label}
                  </Link>
                </li>
              ))}
            </ol>
          </MotionConfig>
        </nav>

        <div className='col-start-3 flex shrink-0 items-center gap-1.5 justify-self-end'>
          <a
            href={cta.href}
            className={`inline-flex items-center whitespace-nowrap rounded-full bg-deep-blue-500 px-3.5 py-2 text-sm font-medium text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.15)] transition-colors hover:bg-deep-blue-600 sm:px-4.5 ${FOCUS_RING}`}
          >
            {cta.label}
          </a>

          <div className='flex sm:hidden'>
            <MenuTrigger>
              <Button
                type='button'
                className={`rounded-full p-2 text-deep-blue-600 transition-colors hover:text-deep-blue-900 ${FOCUS_RING}`}
                aria-label='Open menu'
              >
                <div className='flex h-5 w-5 flex-col items-center justify-center gap-1'>
                  <div className='h-px w-4 bg-current' />
                  <div className='h-px w-4 bg-current' />
                </div>
              </Button>
              <Popover className='mt-3 w-52 origin-top overflow-hidden rounded-2xl border border-deep-blue-200 bg-white p-1.5 shadow-lg shadow-deep-blue-900/5'>
                <Menu className='flex flex-col outline-none'>
                  {items.map((el) => (
                    <MenuItem
                      key={el.to}
                      className={`rounded-xl data-[focused]:bg-deep-blue-50 ${FOCUS_RING}`}
                    >
                      <Link
                        to={el.to}
                        activeOptions={{ exact: el.exact ?? false }}
                        className={MOBILE_LINK_CLASS}
                        activeProps={{
                          className: 'bg-deep-blue-50 text-deep-blue-900',
                        }}
                        inactiveProps={{
                          className:
                            'text-deep-blue-600 hover:text-deep-blue-900',
                        }}
                      >
                        {el.icon}
                        {el.label}
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </Popover>
            </MenuTrigger>
          </div>
        </div>
      </div>
    </header>
  );
};
