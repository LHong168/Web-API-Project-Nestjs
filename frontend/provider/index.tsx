"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/**
 * Default react query provider
 *
 * @link https://betterprogramming.pub/7-tips-for-using-react-query-in-large-projects-22ccc49d61c2
 * @link https://tkdodo.eu/blog/react-query-error-handling#the-global-callbacks
 * @link https://kentcdodds.com/blog/use-react-error-boundary-to-handle-errors-in-react
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 30000,
    },
  },
});

/**
 * @ref https://tanstack.com/query/v4/docs/reference/QueryClient/#queryclientremovequeries
 */
export function resetQueryCache(key: string[]) {
  queryClient.resetQueries({ queryKey: key });
}
export function invalidateQueryCache(key: string[]) {
  queryClient.invalidateQueries({ queryKey: key });
}

export async function invalidateQuery() {
  await queryClient.invalidateQueries();
  await queryClient.refetchQueries();
}

export const DataProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
