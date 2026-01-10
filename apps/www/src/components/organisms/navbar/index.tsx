'use client';

import { BookOpen, Folder, Home, StickyNote, User } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import {
  Button,
  Menu,
  MenuItem,
  MenuTrigger,
  Popover,
  Text,
} from 'react-aria-components';

type NavLink = {
  label: string;
  href: string;
  icon: ReactNode;
};

const mainNavLinks: NavLink[] = [
  { label: 'Home', href: '/', icon: <Home size={18} /> },
  { label: 'Blog', href: '/blog', icon: <BookOpen size={18} /> },
  { label: 'Project', href: '/projects', icon: <Folder size={18} /> },
  { label: 'Notes', href: '/notes', icon: <StickyNote size={18} /> },
  { label: 'About', href: '/about', icon: <User size={18} /> },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <>
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
              {mainNavLinks.map((el, indx) => {
                const isActive = pathname === el.href;
                return (
                  <li key={`link-${indx * 10}`}>
                    <Link
                      href={el.href}
                      className={`py-2 px-4 rounded-full text-xs font-mono font-medium transition-all duration-200 ease-out flex items-center gap-2 uppercase tracking-wide
                        ${
                          isActive
                            ? 'bg-black text-white'
                            : 'text-gray-500 hover:text-black hover:bg-gray-100'
                        }`}
                    >
                      {el.icon}
                      {el.label}
                    </Link>
                  </li>
                );
              })}
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
                  {mainNavLinks.map((el, indx) => {
                    const isActive = pathname === el.href;
                    return (
                      <MenuItem
                        key={`mobile-link-${indx * 10}`}
                        className='outline-none'
                      >
                        <Link
                          href={el.href}
                          className={`flex items-center gap-3 px-3 py-3 text-xs font-mono rounded-lg transition-colors
                               ${
                                 isActive
                                   ? 'bg-black text-white'
                                   : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                               }`}
                        >
                          {el.icon}
                          <span className='uppercase tracking-wide'>
                            {el.label}
                          </span>
                        </Link>
                      </MenuItem>
                    );
                  })}
                </Menu>
              </Popover>
            </MenuTrigger>
          </div>
        </div>
      </motion.header>
    </>
  );
}
