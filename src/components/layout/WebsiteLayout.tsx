import * as React from 'react';

// import { WebsiteHeader } from '@/components/layout';
// import dynamic from 'next/dynamic';

interface WebsiteLayoutProps {
  children: React.ReactNode;
}

// Inspired by https://github.com/vercel/next.js/issues/4515#issuecomment-810635574
// Lazy load this component to avoid pulling in huge JS bundles when not necessary
// const Footer = dynamic(() => {
//   const promise = import('./Footer').then(mod => mod.Footer);
//   return promise;
// });

export const WebsiteLayout: React.FunctionComponent<WebsiteLayoutProps> = ({ children }) => {
  return (
    <>
      {/* <div className="bg-gradient-to-r from-[#141414]  to-[#3e1b4c] md:pt-10"> */}
      <div className="min-w-screen flex h-screen flex-col bg-[#00331C]">
        {/* <WebsiteHeader /> */}
        <main className="h-full">{children}</main>

        {/* <Footer /> */}
      </div>
    </>
  );
};
