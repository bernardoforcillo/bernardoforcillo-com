import type { Metadata, Viewport } from 'next';
import type { FC, ReactNode } from 'react';
import { InterFont } from '~/assets/fonts';

import '~/styles/global.css';

type Props = {
  children: ReactNode;
};
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
};

export const metadata: Metadata = {
  title: {
    template: ' %s - Bernardo Forcillo',
    default: 'Bernardo Forcillo',
    absolute: 'Bernardo Forcillo - A Polymath Product Builder',
  },
  description:
    'Building technologies for innovators, professionals and enthusiasts.',
  metadataBase: new URL('https://bernardoforcillo.com'),
  keywords: [
    'React',
    'Golang',
    'Next.js',
    'Flutter',
    'Bernardo',
    'Forcillo',
    'Freelancer',
    'TypeScript',
    'Software Development',
  ],
  authors: [{ name: 'Bernardo Forcillo', url: 'https://bernardoforcillo.com' }],
  creator: 'Bernardo Forcillo',
  publisher: 'Bernardo Forcillo',
};

const RootLayout: FC<Props> = ({ children }) => {
  return (
    <html lang='en' className={`${InterFont.variable} antialiased h-full`}>
      <body className='relative min-h-full bg-white text-black overflow-x-hidden selection:bg-black selection:text-white'>
        {/* Dot Grid Background */}
        <div className='fixed inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]' />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
