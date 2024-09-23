import * as React from 'react';
import { useRouter } from 'next/router';

import { useSubmissionsStore } from '@/stores';

export const useSecondConsentRedirect = () => {
  const router = useRouter();
  const secondConsent = useSubmissionsStore(state => state.secondConsent);

  React.useEffect(() => {
    if (!secondConsent) {
      router.push('/application/payment-consent');
    }
  }, [secondConsent, router]);
};
