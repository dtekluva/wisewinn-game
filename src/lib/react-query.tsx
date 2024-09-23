import { AxiosResponse } from 'axios';
import * as React from 'react';
import { DefaultOptions, QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

// import { useRouter } from 'next/router';
// import { useAuth } from '@/contexts/authentication';

interface ReactQueryProviderProps {
  children: React.ReactNode;
}

const ReactQueryProvider: React.FunctionComponent<ReactQueryProviderProps> = ({ children }) => {
  const twentyFourHoursInMs = 1000 * 60 * 60 * 24;

  const defaultOptions: DefaultOptions = {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
      // Globally default to 24 hrs
      staleTime: twentyFourHoursInMs,
      cacheTime: 0,
    },
  };

  // const { replace } = useRouter();
  // const { authDispatch } = useAuth();

  const queryCache = new QueryCache({
    onError: error => {
      const errorResponse = error as AxiosResponse;

      console.log(errorResponse);

      // if (errorResponse.request.status === 401) {
      //   if (authDispatch) authDispatch({ type: 'LOGOUT' });
      //   replace('/user/login');
      //   queryCache.clear();
      //   window.location.reload();
      // }
    },
  });

  const [queryClient] = React.useState(() => new QueryClient({ defaultOptions, queryCache }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}

      {process.env.NODE_ENV !== 'test' && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
