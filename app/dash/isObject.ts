/**
 * Returns a `boolean` whether the given value `x` is of type `object`.
 * @see isPlainObject()
 */
export const isObject = <Alias extends object>(x: unknown): x is Alias =>
  typeof x === 'object' && x !== null;
