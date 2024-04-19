import { isNumber, isObject } from '.';

/**
 * Returns a `boolean` whether the given value `x` is of type `VisualViewport`.
 * @note Will not work in some JavaScript environments.
 */
export const isVisualViewport = <Alias extends VisualViewport>(
  x: unknown
): x is Alias =>
  isObject<VisualViewport>(x) &&
  isNumber(x.width) &&
  isNumber(x.height) &&
  isNumber(x.offsetLeft) &&
  isNumber(x.offsetTop) &&
  isNumber(x.pageLeft) &&
  isNumber(x.pageTop) &&
  isNumber(x.scale);
