import * as React from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '@/contexts/authentication';
import { FullPageLoader } from '@/components/elements';

interface ProtectedRouteGuardProps {
  protectedRoutes: string[];
  children: React.ReactNode;
}

export const ProtectedRouteGuard: React.FunctionComponent<ProtectedRouteGuardProps> = ({
  protectedRoutes,
  children,
}) => {
  const router = useRouter();
  const { authState } = useAuth();

  const { isAuthenticated, isLoading } = authState;

  const pathIsProtected = protectedRoutes.indexOf(router.pathname) !== -1;

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated && pathIsProtected) {
      router.push('/user/login');
    }
  }, [isLoading, isAuthenticated, pathIsProtected, router]);

  if ((isLoading || !isAuthenticated) && pathIsProtected) {
    return <FullPageLoader purpleBg />;
  }

  return <>{children}</>;
};
