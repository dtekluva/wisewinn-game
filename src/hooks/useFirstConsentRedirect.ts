import * as React from 'react';
import { useRouter } from 'next/router';
import { useSubmissionsStore } from '@/stores';

export const useFirstConsentRedirect = () => {
  const router = useRouter();
  const firstConsent = useSubmissionsStore(state => state.firstConsent);

  React.useEffect(() => {
    if (!firstConsent) {
      router.push('/dashboard');
    }
  }, [firstConsent, router]);
};
