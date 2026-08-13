import type { FC, ReactNode } from 'react';
import { Footer } from '~/features/navigation/organisms/footer';
import { Navbar } from '~/features/navigation/organisms/navbar';

type Props = {
  children: ReactNode;
};

export const SiteShell: FC<Props> = ({ children }) => (
  <div className='flex flex-col min-h-screen'>
    <Navbar />
    <main className='flex-1'>{children}</main>
    <Footer />
  </div>
);
