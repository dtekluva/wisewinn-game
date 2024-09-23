import '@/styles/globals.css';
import '@/styles/CustomPreview.css';

import * as React from 'react';
import { Toaster } from 'react-hot-toast';

import { FullPageOverlay } from '@/components/elements';
import { AppLayout, WebsiteLayout } from '@/components/layout';
import { AuthProvider } from '@/contexts/authentication';
import { ProtectedRouteGuard } from '@/features/auth';
import { useRouteChangeEffects } from '@/hooks';
import ReactQueryProvider from '@/lib/react-query';

// import { StreamChatProvider } from "@/lib/stream-chat";

import type { AppProps } from 'next/app';
import ErrorBoundary from '@/components/ErrorBoundary';
function MyApp({ Component, pageProps, ...appProps }: AppProps) {
  const { isFullPageOverlayOpen } = useRouteChangeEffects();

  const routesWithWebsiteLayout = [
    '/testtt',
  ];

  const protectedRoutes = [
    '/wallet',
  ];

  const publicDashboardRoutes = [
    '/dashboard',
    '/aifortune-library/library-access',
    '/aifortune-library/library-pack-access',
    '/aifortune-library/library-pdf',
  ];

  // const askAiRoutesLayout = [
  //   '/ask-ai',
  //   '/ask-ai/chat',
  //   //
  //   //
  // ];

  // const hasAIWebsiteLayout = askAiRoutesLayout.some(route =>
  //   route.includes(appProps.router.pathname),
  // );

  const hasWebsiteLayout = routesWithWebsiteLayout.some(route =>
    route.includes(appProps.router.pathname),
  );

  const isProtected = protectedRoutes.some(route => route.includes(appProps.router.pathname));
  const isPublicDashboardRoute = publicDashboardRoutes.some(route =>
    route.includes(appProps.router.pathname),
  );

  const LayoutComponent = hasWebsiteLayout
    ? WebsiteLayout
    : isProtected || isPublicDashboardRoute
      ? AppLayout
      : React.Fragment;

  return (
    <ErrorBoundary>
      <ReactQueryProvider>
        <AuthProvider>
          <ProtectedRouteGuard protectedRoutes={protectedRoutes}>
            {/* <StreamChatProvider> */}
            <LayoutComponent>
              {isFullPageOverlayOpen && <FullPageOverlay />}
              <Component {...pageProps} />
            </LayoutComponent>
            {/* </StreamChatProvider> */}
          </ProtectedRouteGuard>
          <Toaster position="bottom-center" />
        </AuthProvider>
      </ReactQueryProvider>
    </ErrorBoundary>
  );
}

export default MyApp;
