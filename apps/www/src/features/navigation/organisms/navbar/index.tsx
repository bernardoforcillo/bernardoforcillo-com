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
  label: string;
  to: '/' | '/blog' | '/projects' | '/notes' | '/about';
  icon: ReactNode;
  /** Home must match exactly; every other entry is a prefix match. */
  exact: boolean;
};

const mainNavLinks: NavLink[] = [
  { label: 'Home', to: '/', icon: <Home size={16} />, exact: true },
  { label: 'Blog', to: '/blog', icon: <BookOpen size={16} />, exact: false },
  {
    label: 'Projects',
    to: '/projects',
    icon: <Folder size={16} />,
    exact: false,
  },
  {
    label: 'Notes',
    to: '/notes',
    icon: <StickyNote size={16} />,
    exact: false,
  },
  { label: 'About', to: '/about', icon: <User size={16} />, exact: false },
];

const DESKTOP_LINK_CLASS =
  'px-3 py-1.5 text-[13px] font-medium tracking-wide transition-colors duration-200';

const MOBILE_LINK_CLASS =
  'flex items-center gap-3 px-3 py-2.5 text-[13px] tracking-wide rounded-md transition-colors';

export const Navbar = () => {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className='fixed flex top-0 z-50 w-full px-6 pt-5 pointer-events-none'
    >
      <div className='pointer-events-auto ml-auto sm:mx-auto rounded-full px-2 py-1 bg-canvas/75 backdrop-blur-md border border-line flex items-center'>
        <nav className='hidden sm:block'>
          <ol className='flex'>
            {mainNavLinks.map((el) => (
              <li key={el.to}>
                <Link
                  to={el.to}
                  activeOptions={{ exact: el.exact }}
                  className={DESKTOP_LINK_CLASS}
                  activeProps={{ className: 'text-ink' }}
                  inactiveProps={{
                    className: 'text-muted hover:text-ink',
                  }}
                >
                  {el.label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        <div className='flex sm:hidden'>
          <MenuTrigger>
            <Button
              type='button'
              className='p-2 rounded-full hover:bg-line/60 transition-colors text-muted hover:text-ink'
              aria-label='Open menu'
            >
              <span className='sr-only'>Open Menu</span>
              <div className='flex flex-col gap-1 w-5 h-5 items-center justify-center'>
                <div className='w-4 h-px bg-current' />
                <div className='w-4 h-px bg-current' />
              </div>
            </Button>
            <Popover className='w-48 mt-3 rounded-xl bg-canvas/95 backdrop-blur-xl border border-line shadow-sm overflow-hidden origin-top'>
              <Menu className='flex flex-col p-1.5 outline-none'>
                {mainNavLinks.map((el) => (
                  <MenuItem key={el.to} className='outline-none'>
                    <Link
                      to={el.to}
                      activeOptions={{ exact: el.exact }}
                      className={MOBILE_LINK_CLASS}
                      activeProps={{ className: 'text-ink bg-line/50' }}
                      inactiveProps={{
                        className: 'text-muted hover:bg-line/40 hover:text-ink',
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
    </motion.header>
  );
};
