import type { FC, ReactNode } from 'react';
import { Footer } from '~/components/organisms/footer';
import Navbar from '~/components/organisms/navbar';

type Props = {
  children: ReactNode;
};

const RootLayout: FC<Props> = ({ children }) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <main className='flex-1'>{children}</main>
      <Footer />
    </div>
  );
};
export default RootLayout;
