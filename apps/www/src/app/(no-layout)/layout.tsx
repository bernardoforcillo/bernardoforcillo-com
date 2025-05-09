import type { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const metadata = {
  title: 'No Wordpress Here',
  description: 'Do you really think this is a wordpress site? 🥲.',
};

const RootLayout: FC<Props> = ({ children }) => {
  return <>{children}</>;
};
export default RootLayout;
