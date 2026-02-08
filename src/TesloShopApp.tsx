import { RouterProvider } from 'react-router';
import { appRouter } from './app.router';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import type { PropsWithChildren } from 'react';
import CustomLoading from './components/custom/CustomLoading';
import { useAuthStore } from './auth/store/auth.store';
const queryClient = new QueryClient();

const CheckingProvider = ({ children }: PropsWithChildren) => {
  const { checkAuthStatus } = useAuthStore();
  const { isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: checkAuthStatus,
    retry: false,
    refetchInterval: 1000 * 60 * 1.5,
    refetchOnWindowFocus: true,
  });
  if (isLoading) return <CustomLoading />;
  return children;
};

export const TesloShopApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* The rest of your application */}
      <Toaster />
      <CheckingProvider>
        {/* este va hacia arriba a verificar */}
        <RouterProvider router={appRouter} />
      </CheckingProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
// http-> tanstack
