import type { FC } from 'react';

export const THEME_STORAGE_KEY = 'theme';

const FOCUS_RING =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azure-radiance-700';

// Which icon shows is decided by the `dark` class on <html> in CSS, not by
// React state, so the server-rendered button is already right once the
// pre-paint script has set the class: no flash, no hydration mismatch.
export const ThemeToggle: FC = () => {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.classList.contains('dark') ? 'light' : 'dark';
    root.classList.toggle('dark', next === 'dark');
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage can be blocked; the choice then lasts for this visit only.
    }
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', next === 'dark' ? '#0b1120' : '#f7f8fc');
  };

  return (
    <button
      type='button'
      onClick={toggle}
      aria-label='Switch between light and dark theme'
      title='Switch theme'
      className={`grid size-9 place-items-center rounded-full text-deep-blue-600 transition-colors hover:bg-deep-blue-100/70 hover:text-deep-blue-900 ${FOCUS_RING}`}
    >
      {/* Sun: offered while the page is dark. */}
      <svg
        aria-hidden='true'
        viewBox='0 0 24 24'
        className='hidden size-[18px] dark:block'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.8'
        strokeLinecap='round'
      >
        <circle cx='12' cy='12' r='4' />
        <path d='M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4L6 18M18 6l1.4-1.4' />
      </svg>
      {/* Moon: offered while the page is light. */}
      <svg
        aria-hidden='true'
        viewBox='0 0 24 24'
        className='block size-[18px] dark:hidden'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.8'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z' />
      </svg>
    </button>
  );
};

/**
 * Inline script for <head>: applies the saved choice (or the OS preference)
 * before first paint so the page never flashes the wrong theme.
 */
export const THEME_BOOTSTRAP = `(function(){try{var s=localStorage.getItem('${THEME_STORAGE_KEY}');var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d);var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content',d?'#0b1120':'#f7f8fc')}catch(e){}})();`;
