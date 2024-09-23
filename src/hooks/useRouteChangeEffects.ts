import * as React from 'react';
import nProgress from 'nprogress';
import { useRouter } from 'next/router';

import { useModalControl } from './useModalControl';

export const useRouteChangeEffects = () => {
  const router = useRouter();

  const {
    isModalOpen: isFullPageOverlayOpen,
    closeModal: closeFullPageOverlay,
    openModal: openFullPageOverlay,
  } = useModalControl();

  React.useEffect(() => {
    const handleRouteChangeStart = () => {
      nProgress.start();
      openFullPageOverlay();
    };
    const handleRouteChangeEnd = () => {
      nProgress.done();
      closeFullPageOverlay();
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeError', handleRouteChangeEnd);
    router.events.on('routeChangeComplete', handleRouteChangeEnd);

    return () => {
      // Make sure to remove the event handler on unmount!
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeEnd);
      router.events.off('routeChangeError', handleRouteChangeEnd);
    };
  }, []);

  return { isFullPageOverlayOpen };
};
