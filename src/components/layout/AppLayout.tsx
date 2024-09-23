import MediaQuery from 'react-responsive';
import { useRouter } from 'next/router';
// import dynamic from 'next/dynamic';
import * as React from 'react';

import { DashboardHeader, LeftBar, MobileMenuBar, RightBar } from '@/components/layout';

// Inspired by https://github.com/vercel/next.js/issues/4515#issuecomment-810635574
// Lazy load this component to avoid pulling in huge JS bundles when not necessary
// const Footer = dynamic(() => {
//   const promise = import('@/components/layout').then(mod => mod.Footer);
//   return promise;
// });

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FunctionComponent<AppLayoutProps> = ({ children }) => {
  const mainRef = React.useRef<HTMLDivElement>(null);
  const headerRef = React.useRef<HTMLDivElement>(null);

  const executeScroll = () => {
    if (headerRef.current && mainRef.current) {
      headerRef.current.scrollIntoView();
      mainRef.current.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  };

  const router = useRouter();
  React.useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });

      if (mainRef.current)
        mainRef.current.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
    });

    executeScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="overflow-auto bg-[#111111] text-white md:flex md:w-full">
        <LeftBar />

        <div ref={mainRef} className="w-full md:h-screen md:min-h-full md:overflow-auto md:px-0">
          <div ref={headerRef}>
            <DashboardHeader />
          </div>

          <main className="mb-10 flex-grow">
            {children}

            <MediaQuery maxWidth={768}>
              <MobileMenuBar />
            </MediaQuery>
          </main>
        </div>

        <RightBar />
      </div>
      {/* 
      <Footer appColor={'#000'} /> */}
    </>
  );
};
