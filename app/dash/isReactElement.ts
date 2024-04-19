import type { ReactElement } from 'react';
import { isValidElement } from 'react';

/**
 * Returns a `boolean` whether the given value `x` is of type `ReactElement`.
 * @note Also matches `JSX.Element` as they are equivalent.
 * @note Will only work in React applications.
 */
export const isReactElement = <Alias extends ReactElement>(
  x: unknown
): x is Alias => isValidElement(x);
