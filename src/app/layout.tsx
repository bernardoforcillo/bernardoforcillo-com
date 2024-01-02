import { ReactNode } from 'react';

import '@/styles/global.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='it'>
      <body>{children}</body>
    </html>
  );
}
