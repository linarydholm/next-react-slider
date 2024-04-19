import type { Fragment, ReactElement } from 'react';
import { isValidElement } from 'react';
import { isReactFragment } from './isReactFragment';

/**
 * Returns a `boolean` whether the given value `x` is of type `ReactElement`.
 * @note Will explicitly exclude `Fragment` elements.
 * @note Will only work in React applications.
 */
export const isNonFragmentReactElement = <Alias extends ReactElement>(
  x: unknown
): x is Alias extends typeof Fragment ? never : Alias => isValidElement(x) && !isReactFragment(x);
