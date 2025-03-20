
import { ReactNode } from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-[#f9f9f9]">
      <Navbar />
      <main className="flex-1 container pb-16 px-4 sm:px-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;
