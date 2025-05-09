import localFont from 'next/font/local';

export const InterFont = localFont({
  src: [
    {
      path: './variable-regular.woff2',
      style: 'normal',
    },
    {
      path: './variable-italic.woff2',
      style: 'italic',
    },
  ],
  variable: '--font-inter',
});
