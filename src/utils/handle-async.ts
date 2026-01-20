export type AsyncResult<T> = Promise<[null, T] | [Error, null]>;

/**
 * handleAsync wraps a promise to return a tuple [error, data].
 * Usage: const [err, data] = await handleAsync(myPromise);
 */
export const handleAsync = async <T>(promise: Promise<T>): AsyncResult<T> => {
  try {
    const data = await promise;
    return [null, data];
  } catch (error) {
    const normalizedError =
      error instanceof Error ? error : new Error(String(error));
    return [normalizedError, null];
  }
};
