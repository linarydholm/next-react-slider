/**
 * Returns a `boolean` whether the given value `x` is of type `HTMLElement`.
 *
 * Additionally accepts an `instance` parameter to check against a specific `HTMLElement` instance.
 *
 * @example
 * const element = createElement('div');
 * isElement(element); // true
 *
 * const element2 = new HTMLInputElement
 * isElement(element2, HTMLInputElement); // true
 */
export const isHTMLElement = <
  Instance extends HTMLElement,
  Alias extends Instance,
>(
  x: unknown,
  instance?: { new (): Instance }
): x is Alias extends Instance ? Alias : Instance =>
  x instanceof (instance || HTMLElement);
