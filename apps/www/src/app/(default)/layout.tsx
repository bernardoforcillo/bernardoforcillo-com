import type { FC, ReactNode } from 'react';
import { Footer } from '~/components/organisms/footer';
import Navbar from '~/components/organisms/navbar';

type Props = {
  children: ReactNode;
};

const RootLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};
export default RootLayout;
