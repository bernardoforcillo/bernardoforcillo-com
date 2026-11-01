import { motion } from 'motion/react';
import type { FC } from 'react';
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
};

const DESKTOP_LINK_CLASS =
  'relative px-3 py-2 text-[15px] transition-colors duration-200';

const MOBILE_LINK_CLASS =
  'flex items-center gap-3 px-4 py-3 text-[15px] transition-colors';

export const Navbar: FC<Props> = ({ Link, brand, items }) => (
  <motion.header
    initial={{ y: -24, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    className='pointer-events-none fixed top-0 z-50 w-full px-4 pt-5 md:px-8'
  >
    <div className='pointer-events-auto mx-auto flex max-w-6xl items-center justify-between border-b border-deep-blue-200/70 bg-white/80 px-1 pb-3 backdrop-blur-md'>
      <Link
        to='/'
        className='flex items-center gap-2.5 text-[15px] tracking-tight'
      >
        <span className='size-1.5 rounded-full bg-azure-radiance-500' />
        {brand}
      </Link>
      <nav className='hidden sm:block'>
        <ol className='flex items-center'>
          {items.map((el) => (
            <li key={el.to}>
              <Link
                to={el.to}
                activeOptions={{ exact: el.exact ?? false }}
                className={DESKTOP_LINK_CLASS}
                activeProps={{
                  className:
                    'text-deep-blue-900 after:absolute after:left-3 after:right-3 after:-bottom-px after:h-px after:bg-azure-radiance-500',
                }}
                inactiveProps={{
                  className: 'text-deep-blue-600 hover:text-deep-blue-900',
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
            className='p-2 text-deep-blue-600 transition-colors hover:text-deep-blue-900'
            aria-label='Open menu'
          >
            <span className='sr-only'>Open Menu</span>
            <div className='flex h-5 w-5 flex-col items-center justify-center gap-1'>
              <div className='h-px w-4 bg-current' />
              <div className='h-px w-4 bg-current' />
            </div>
          </Button>
          <Popover className='mt-3 w-52 origin-top overflow-hidden border border-deep-blue-200 bg-white/95 backdrop-blur-xl'>
            <Menu className='flex flex-col outline-none'>
              {items.map((el) => (
                <MenuItem key={el.to} className='outline-none'>
                  <Link
                    to={el.to}
                    activeOptions={{ exact: el.exact ?? false }}
                    className={MOBILE_LINK_CLASS}
                    activeProps={{ className: 'text-deep-blue-900' }}
                    inactiveProps={{
                      className: 'text-deep-blue-600 hover:text-deep-blue-900',
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
