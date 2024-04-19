/** Returns a `boolean` whether the given value `x` is of type `string`. */
export const isString = <Alias extends string>(x: unknown): x is Alias =>
  typeof x === 'string';
