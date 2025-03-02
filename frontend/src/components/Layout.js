import React from 'react';
import Navbar from './Navbar';
import Head from 'next/head';

const Layout = ({ children, title = 'Instagram Clone' }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Instagram Clone Demo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pt-5 pb-20 md:pt-20 md:pb-5 px-4">
          <div className="max-w-5xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </>
  );
};

export default Layout;
