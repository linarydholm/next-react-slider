'use client';

/**
 * @todo Add ability to supply the hook with an easing function for inertial scroll.
 */

import { isNonFragmentReactElement, useForwardedRef, useGesture } from '.';
import type { RefObject } from 'react';
import { Children, cloneElement, forwardRef } from 'react';
import type { UseGestureProps } from '.';

type GestureProperties =
  | 'when'
  | 'axis'
  | 'deadZone'
  | 'onGestureStart'
  | 'onGestureMove'
  | 'onGestureEnd';

export type DragScrollOptions = Pick<UseGestureProps, GestureProperties>;

export const useDragScroll = (
  ref: RefObject<HTMLElement>,
  {
    when = true,
    axis,
    deadZone = 3,
    onGestureStart,
    onGestureMove,
    onGestureEnd,
  }: DragScrollOptions = {}
) => {
  useGesture(ref, {
    when,
    axis,
    pointerType: 'mouse',
    deadZone,
    onGestureStart,
    onGestureMove: (event) => {
      const { movementX, movementY } = event;

      const element = ref.current;
      if (!element) return;

      element.setAttribute('inert', 'true');

      element.scrollTop -= movementY;
      element.scrollLeft -= movementX;

      onGestureMove?.(event);
    },
    onGestureEnd: (event) => {
      onGestureEnd?.(event);

      const element = ref.current;
      if (!element) return;

      element.removeAttribute('inert');
    },
  });
};

export type UseDragScrollProps = DragScrollOptions & {
  children: JSX.Element;
};

export const UseDragScroll = forwardRef<HTMLElement, UseDragScrollProps>(function UseDragScroll(
  {
    children,
    when = true,
    axis,
    deadZone = 3,
    onGestureStart,
    onGestureMove,
    onGestureEnd,
    ...rest
  },
  forwardRef
) {
  const forwardedRef = useForwardedRef(forwardRef);

  const childElements = Children.toArray(children);
  const childElement = childElements[0];

  if (childElements.length > 1 || !isNonFragmentReactElement(childElement)) {
    throw new Error(
      '<UseDragScroll /> component expects a single non-fragment child ReactElement.'
    );
  }

  if ('ref' in childElement && childElement.ref) {
    throw new Error(
      '<UseDragScroll /> child cannot have a ref explicitly set. If you need to access the ref, set it on the <UseDragScroll /> component itself.'
    );
  }

  useDragScroll(forwardedRef, {
    when,
    axis,
    deadZone,
    onGestureStart,
    onGestureMove,
    onGestureEnd,
  });

  return cloneElement(childElement, {
    ref: forwardedRef,
    ...rest,
    ...childElement.props,
  });
});
