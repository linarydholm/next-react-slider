import { Fragment } from 'react';
import { isReactElement } from '.';

/**
 * Returns a `boolean` whether the given value `x` is of type `Fragment`.
 * @note Will only work in React applications.
 */
export const isReactFragment = <Alias extends typeof Fragment>(
  x: unknown
): x is Alias => {
  return x === Fragment || (isReactElement(x) && x.type === Fragment);
};
