import { useToast } from './use-toast';

export const useError = () => {
  const { toast } = useToast();

  function isNetworkError(error: unknown) {
    const NETWORK_ERROR = 'Network request failed'; // no internet
    const NETWORK_TIMEOUT = 'Network request timed out'; // server not respond
    return error instanceof Error && (error.message === NETWORK_ERROR || error.message === NETWORK_TIMEOUT);
  }

  const handleError = (error: unknown) => {
    if (isNetworkError(error)) {
      toast({
        title: 'Network Error',
        description: 'Please check your internet connection.',
        variant: 'destructive'
      });
      return;
    }

    if (error instanceof Error) toast({ title: 'Error', description: error.message, variant: 'destructive' });

    // eslint-disable-next-line no-console
    console.error(error);
  };

  return { handleError };
};
