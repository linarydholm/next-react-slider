/**
 * Returns a `boolean` whether the given value `x` is of type `Function`.
 * @see isPlainFunction(), isAsyncFunction(), isGeneratorFunction(), isAsyncGeneratorFunction()
 */
export const isFunction = <Alias extends Function>(x: unknown): x is Alias =>
  x instanceof Function;
