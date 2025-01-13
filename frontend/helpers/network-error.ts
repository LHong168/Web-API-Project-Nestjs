export function isNetworkError(error: unknown) {
  const NETWORK_ERROR = "Network request failed"; // no internet
  const NETWORK_TIMEOUT = "Network request timed out"; // server not respond
  return (
    error instanceof Error &&
    (error.message === NETWORK_ERROR || error.message === NETWORK_TIMEOUT)
  );
}
