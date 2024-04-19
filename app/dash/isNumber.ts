/** Returns a `boolean` whether the given value `x` is of type `number`. */
export const isNumber = <Alias extends number>(x: unknown): x is Alias =>
  typeof x === 'number';
