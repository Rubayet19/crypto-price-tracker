"use client";

import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

/**
 * Layout component to wrap the application
 */
interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;