'use client';

import { isFunction, isReactElement, useIsomorphicEffect } from '.';
import type { ForwardedRef, RefObject } from 'react';
import { cloneElement, forwardRef, useRef } from 'react';

export const useForwardedRef = <T>(ref: ForwardedRef<T> | undefined) => {
  const innerRef = useRef<T>(null);

  useIsomorphicEffect(() => {
    if (!ref) return;

    if (isFunction(ref)) {
      ref(innerRef.current);
      return;
    }

    ref.current = innerRef.current;
  }, [ref]);

  return innerRef;
};

export type UseForwardedRefProps<T> = {
  ref: ForwardedRef<T>;
  children: (forwardedRef: RefObject<T>) => JSX.Element;
};

export const UseForwardedRef = forwardRef<HTMLElement, UseForwardedRefProps<unknown>>(
  function UseForwardedRef({ children, ...rest }, forwardRef) {
    const forwardedRef = useForwardedRef(forwardRef);

    if (!isFunction(children)) {
      throw new Error('<UseForwardedRef /> component expects a function as its only child.');
    }

    const childElement = children(forwardedRef);

    if (!isReactElement(childElement)) {
      throw new Error(
        '<UseForwardedRef /> child function expects a ReactElement as its return value.'
      );
    }

    return cloneElement(childElement, {
      ...rest,
      ...childElement.props,
    });
  }
) as <T>(props: UseForwardedRefProps<T>) => JSX.Element;
