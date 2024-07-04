import Script from 'next/script';
import { ReactNode } from 'react';
import Footer from '~/organisms/footer';
import Navbar from '~/organisms/navbar';
import { Metadata, Viewport } from 'next';

import '~/styles/global.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
};

export const metadata: Metadata = {
  title: {
    template: ' %s - Bernardo Forcillo',
    default: 'Bernardo Forcillo',
    absolute: 'Bernardo Forcillo - Progetto, sviluppo, ottimizzo',
  },
  description:
    'Ciao, sono Bernardo! Aiuto imprenditori e professionisti a sviluppare prodotti e soluzioni digitali. Studio, progetto e sviluppo soluzioni basate sul cloud per...',
  metadataBase: new URL('https://bernardoforcillo.com'),
  keywords: [],
  authors: [{ name: 'Bernardo Forcillo', url: 'https://bernardoforcillo.com' }],
  creator: 'Bernardo Forcillo',
  publisher: 'Bernardo Forcillo',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='it'>
      <head>
        <Script
          id='google-tag-manager'
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GTM_ID}`}
        >
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${process.env.GTM_ID}');`}
        </Script>
      </head>
      <body>
        <main>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.GTM_ID}`}
              height='0'
              width='0'
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
          <Navbar />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
