import type { Metadata, Viewport } from 'next';
import type { FC, ReactNode } from 'react';
import { Inter } from '~/assets/fonts/inter';
import { Footer } from '~/components/organisms/footer';

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
    absolute:
      'Bernardo Forcillo - Software builder, Digital Artisan and Indie Entrepreneur',
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
    <html lang='en' className={`${Inter.variable}`}>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
