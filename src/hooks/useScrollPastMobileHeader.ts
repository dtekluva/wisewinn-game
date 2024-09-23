import * as React from 'react';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';

const HEADER_MOBILE_HEIGHT = 75;

const routesToScroll = [
  '/salary-for-life',
  '/instant-cashout',
  '/soccer-cash/game-selection',
  '/soccer-cash/predict-match-scores',
];

export const useScrollPastMobileHeader = () => {
  const router = useRouter();
  const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });
  const isRelevantRoute = routesToScroll.includes(router.pathname);

  React.useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      if (isSmallScreen && isRelevantRoute) {
        window.scrollTo(0, HEADER_MOBILE_HEIGHT);
      }
    });

    return () => {
      window.scrollTo(0, 0);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};
