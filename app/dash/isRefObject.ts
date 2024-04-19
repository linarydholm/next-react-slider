import type { RefObject } from 'react';
import { isObject } from '.';

/**
 * Returns a `boolean` whether the given value `x` is of type `RefObject<unknown>`.
 * @note Will also match `MutableRefObject<unknown>` objects.
 * @note Will only work in React applications.
 */
export const isRefObject = <Alias extends RefObject<unknown>>(
  x: unknown
): x is Alias => isObject(x) && Object.isExtensible(x) && 'current' in x;
