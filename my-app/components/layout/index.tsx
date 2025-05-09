import type { NextPage } from 'next';
import Navbar from '../Navbar';
import Footer from '../Footer';
import type { ReactNode } from 'react';
interface LayoutProps {
  children: ReactNode;
}
const Layout: NextPage<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
