import { isObject } from '.';

/**
 * Returns a `boolean` whether the given value `x` is of type `MediaQueryList`.
 * @note Will not work in some JavaScript environments.
 */
export const isMediaQueryList = <Alias extends MediaQueryList>(
  x: unknown
): x is Alias =>
  isObject(x) &&
  'addEventListener' in x &&
  'removeEventListener' in x &&
  'matches' in x &&
  'media' in x;
