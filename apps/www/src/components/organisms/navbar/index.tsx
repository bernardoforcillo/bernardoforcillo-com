'use client';

import { BookOpen, Folder, Home, StickyNote, User } from 'lucide-react';
import Link from 'next/link';
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
  return (
    <>
      <header className='fixed flex top-0 z-50 w-full'>
        <div className='mx-auto mt-6 rounded-2xl w-fit px-4 py-2 bg-neutral-100/40 backdrop-blur-xl border border-neutral-200/50 shadow-lg shadow-black/5 hidden sm:flex'>
          <ol className='flex gap-1'>
            {mainNavLinks.map((el, indx) => (
              <li key={`link-${indx * 10}`}>
                <Link
                  href={el.href}
                  className='py-2 px-4 rounded-xl text-sm font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-200/80 transition-all duration-200 ease-out flex items-center gap-2'
                >
                  {el.icon}
                  {el.label}
                </Link>
              </li>
            ))}
          </ol>
        </div>
        <div className='flex sm:hidden ml-4 mt-6 items-end absolute left-0'>
          <MenuTrigger>
            <Button
              type='button'
              className='py-3 px-4 group font-medium transition-all duration-200 flex items-center justify-center gap-2 text-neutral-700 rounded-2xl bg-neutral-100/40 backdrop-blur-xl border border-neutral-200/50 shadow-lg shadow-black/5 hover:bg-neutral-200/90'
              aria-label='Open menu'
            >
              <span>Menu</span>
            </Button>
            <Popover className='rounded-2xl bg-neutral-100/40 text-neutral-900 backdrop-blur-xl p-3 border border-neutral-200/50 shadow-xl shadow-black/10 sm:hidden'>
              <Menu className='flex flex-col gap-1'>
                {mainNavLinks.map((el, indx) => (
                  <MenuItem
                    key={`mobile-link-${indx * 10}`}
                    href={el.href}
                    className='rounded-xl px-4 py-3 hover:bg-neutral-200/80 transition-colors duration-200 flex items-center gap-2'
                  >
                    <Text
                      slot='label'
                      className='text-sm font-medium text-neutral-700 flex items-center gap-2'
                    >
                      {el.icon}
                      {el.label}
                    </Text>
                  </MenuItem>
                ))}
              </Menu>
            </Popover>
          </MenuTrigger>
        </div>
      </header>
    </>
  );
}
