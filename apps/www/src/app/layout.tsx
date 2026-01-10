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
        {/* Technical Grid Background */}
        <div className='fixed inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]'>
          <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PHZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2UpIiBvcGFjaXR5PSIwLjUiLz48L3N2Zz4=')]" />
          <div className='absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]' />
        </div>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
