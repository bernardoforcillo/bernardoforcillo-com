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
  { label: 'Home', to: '/', icon: <Home size={18} />, exact: true },
  { label: 'Blog', to: '/blog', icon: <BookOpen size={18} />, exact: false },
  {
    label: 'Projects',
    to: '/projects',
    icon: <Folder size={18} />,
    exact: false,
  },
  {
    label: 'Notes',
    to: '/notes',
    icon: <StickyNote size={18} />,
    exact: false,
  },
  { label: 'About', to: '/about', icon: <User size={18} />, exact: false },
];

const DESKTOP_LINK_CLASS =
  'py-2 px-4 rounded-full text-xs font-mono font-medium transition-all duration-200 ease-out flex items-center gap-2 uppercase tracking-wide';

const MOBILE_LINK_CLASS =
  'flex items-center gap-3 px-3 py-3 text-xs font-mono rounded-lg transition-colors';

export const Navbar = () => {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className='fixed flex top-0 z-50 w-full px-6 pt-6 pointer-events-none'
    >
      <div className='pointer-events-auto ml-auto sm:mx-auto rounded-full px-2 py-2 bg-white/80 backdrop-blur-md border border-gray-200 flex items-center gap-2 shadow-sm'>
        {/* Desktop Navigation */}
        <nav className='hidden sm:block'>
          <ol className='flex gap-1'>
            {mainNavLinks.map((el) => (
              <li key={el.to}>
                <Link
                  to={el.to}
                  activeOptions={{ exact: el.exact }}
                  className={DESKTOP_LINK_CLASS}
                  activeProps={{ className: 'bg-black text-white shadow-sm' }}
                  inactiveProps={{
                    className:
                      'text-gray-500 hover:text-black hover:bg-gray-100',
                  }}
                >
                  {el.icon}
                  {el.label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        {/* Mobile Menu Trigger */}
        <div className='flex sm:hidden'>
          <MenuTrigger>
            <Button
              type='button'
              className='p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-black'
              aria-label='Open menu'
            >
              <span className='sr-only'>Open Menu</span>
              <div className='flex flex-col gap-1 w-5 h-5 items-center justify-center'>
                <div className='w-4 h-[1.5px] bg-current' />
                <div className='w-4 h-[1.5px] bg-current' />
              </div>
            </Button>
            <Popover className='w-48 mt-4 rounded-xl bg-white/95 backdrop-blur-xl border border-gray-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top'>
              <Menu className='flex flex-col p-1 outline-none'>
                {mainNavLinks.map((el) => (
                  <MenuItem key={el.to} className='outline-none'>
                    <Link
                      to={el.to}
                      activeOptions={{ exact: el.exact }}
                      className={MOBILE_LINK_CLASS}
                      activeProps={{ className: 'bg-black text-white' }}
                      inactiveProps={{
                        className:
                          'text-gray-600 hover:bg-gray-100 hover:text-black',
                      }}
                    >
                      {el.icon}
                      <span className='uppercase tracking-wide'>
                        {el.label}
                      </span>
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
