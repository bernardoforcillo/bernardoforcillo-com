import { Link } from '@tanstack/react-router';
import { BookOpen, Folder, Home, StickyNote, User } from 'lucide-react';
import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import {
  Button,
  Menu,
  MenuItem,
  MenuTrigger,
  Popover,
} from 'react-aria-components';

type NavLink = {
  index: string;
  label: string;
  to: '/' | '/blog' | '/projects' | '/notes' | '/about';
  icon: ReactNode;
  /** Home must match exactly; every other entry is a prefix match. */
  exact: boolean;
};

const mainNavLinks: NavLink[] = [
  {
    index: '01',
    label: 'Home',
    to: '/',
    icon: <Home size={16} />,
    exact: true,
  },
  {
    index: '02',
    label: 'Blog',
    to: '/blog',
    icon: <BookOpen size={16} />,
    exact: false,
  },
  {
    index: '03',
    label: 'Projects',
    to: '/projects',
    icon: <Folder size={16} />,
    exact: false,
  },
  {
    index: '04',
    label: 'Notes',
    to: '/notes',
    icon: <StickyNote size={16} />,
    exact: false,
  },
  {
    index: '05',
    label: 'About',
    to: '/about',
    icon: <User size={16} />,
    exact: false,
  },
];

const DESKTOP_LINK_CLASS =
  'block border-l border-line px-4 py-3 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors duration-200';

const MOBILE_LINK_CLASS =
  'flex items-center gap-3 border-b border-line px-4 py-3 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors';

export const Navbar = () => {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className='pointer-events-none fixed top-0 z-50 w-full px-4 pt-4 md:px-8'
    >
      <div className='pointer-events-auto mx-auto flex max-w-6xl items-stretch justify-between border border-line bg-canvas/95 backdrop-blur-md'>
        <Link
          to='/'
          className='flex items-center gap-2 px-4 font-mono text-[10px] font-semibold uppercase tracking-[0.16em]'
        >
          <span className='size-2 bg-signal' />
          BF/00
        </Link>
        <nav className='hidden sm:block'>
          <ol className='flex'>
            {mainNavLinks.map((el) => (
              <li key={el.to}>
                <Link
                  to={el.to}
                  activeOptions={{ exact: el.exact }}
                  className={DESKTOP_LINK_CLASS}
                  activeProps={{ className: 'bg-signal text-ink' }}
                  inactiveProps={{
                    className: 'text-muted hover:text-ink',
                  }}
                >
                  {el.index} / {el.label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        <div className='flex sm:hidden'>
          <MenuTrigger>
            <Button
              type='button'
              className='border-l border-line p-3 text-muted transition-colors hover:bg-signal hover:text-ink'
              aria-label='Open menu'
            >
              <span className='sr-only'>Open Menu</span>
              <div className='flex flex-col gap-1 w-5 h-5 items-center justify-center'>
                <div className='w-4 h-px bg-current' />
                <div className='w-4 h-px bg-current' />
              </div>
            </Button>
            <Popover className='mt-2 w-52 origin-top overflow-hidden border border-line bg-canvas/95 backdrop-blur-xl'>
              <Menu className='flex flex-col outline-none'>
                {mainNavLinks.map((el) => (
                  <MenuItem key={el.to} className='outline-none'>
                    <Link
                      to={el.to}
                      activeOptions={{ exact: el.exact }}
                      className={MOBILE_LINK_CLASS}
                      activeProps={{ className: 'bg-signal text-ink' }}
                      inactiveProps={{
                        className: 'text-muted hover:bg-line/40 hover:text-ink',
                      }}
                    >
                      {el.icon}
                      {el.index} / {el.label}
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Popover>
          </MenuTrigger>
        </div>
      </div>
    </motion.header>
  );
};
