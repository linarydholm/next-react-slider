'use client';

import { isNonFragmentReactElement, isNumber, useEvent, useForwardedRef } from '.';
import type { RefObject } from 'react';
import { Children, cloneElement, forwardRef, useRef } from 'react';

type Position = { x: number; y: number };
type Movement = { movementX: number; movementY: number };
type Delta = { deltaX: number; deltaY: number };

type Direction = 'up' | 'right' | 'down' | 'left' | null;
type PointerType = 'mouse' | 'touch' | 'pen';

export interface GestureStartEvent extends Position {
  nativeEvent: PointerEvent;
  pointerType: PointerType;
  abort: () => void;
}

export interface GestureMoveEvent extends Position, Movement, Delta {
  nativeEvent: PointerEvent;
  pointerType: PointerType;
  duration: number;
  direction: Direction;
  abort: () => void;
}

export interface GestureEndEvent extends Position, Movement, Delta {
  nativeEvent: PointerEvent;
  pointerType: PointerType;
  duration: number;
  direction: Direction;
  aborted: boolean;
  expired: boolean;
}

export type GestureOptions = {
  when?: boolean;
  axis?: 'x' | 'y';
  pointerType?: PointerType;
  deadZone?: number;
  lifespan?: number;
  onGestureStart?: (event: GestureStartEvent) => void;
  onGestureMove?: (event: GestureMoveEvent) => void;
  onGestureEnd?: (event: GestureEndEvent) => void;
};

export const useGesture = (
  ref: RefObject<HTMLElement>,
  {
    when = true,
    axis,
    pointerType,
    deadZone = 3,
    lifespan,
    onGestureStart,
    onGestureMove,
    onGestureEnd,
  }: GestureOptions = {}
) => {
  const startPosition = useRef<Position>({ x: 0, y: 0 });
  const startTime = useRef<number | null>(null);

  const previousDelta = useRef<Delta>({ deltaX: 0, deltaY: 0 });
  const previousMovement = useRef<Movement>({ movementX: 0, movementY: 0 });

  const isLocked = useRef(true);
  const offset = useRef<Position>({ x: 0, y: 0 });

  const previousDirection = useRef<Direction>(null);

  const lifespanTimer = useRef<NodeJS.Timeout>();

  const handleGestureMove = (event: PointerEvent) => {
    event.preventDefault();

    const { x, y, movementX, movementY } = event;
    let dX = !axis || axis === 'x' ? x - startPosition.current.x : 0;
    let dY = !axis || axis === 'y' ? y - startPosition.current.y : 0;

    previousMovement.current = { movementX, movementY };

    // Calculate the distance moved from the start position
    const distance = Math.sqrt(dX * dX + dY * dY);

    // Prevent accidental Gestures by ensuring distance is greater than deadZone
    if (isLocked.current) {
      if (distance < deadZone) {
        offset.current = { x: dX, y: dY };
        return;
      }

      isLocked.current = false;
    }

    dX -= offset.current.x;
    dY -= offset.current.y;

    previousDelta.current = { deltaX: dX, deltaY: dY };

    // Determine the most significant current directionality of the Gesture
    let direction: Direction = null;

    const directionFromAxis = {
      x: movementX > 0 ? 'right' : 'left',
      y: movementY > 0 ? 'down' : 'up',
      determine: Math.abs(movementX) > Math.abs(movementY) ? 'x' : 'y',
    } as const;

    if (axis) direction = directionFromAxis[axis];
    if (!axis) direction = directionFromAxis[directionFromAxis.determine];

    previousDirection.current = direction;

    onGestureMove?.({
      nativeEvent: event,
      pointerType: event.pointerType as PointerType,
      duration: Math.round(performance.now() - (startTime.current || 0)),
      direction,
      abort: () => abort(event),
      x,
      y,
      movementX,
      movementY,
      deltaX: dX,
      deltaY: dY,
    });
  };

  const handleGestureEnd = (event: PointerEvent, reason?: 'expire' | 'abort') => {
    document.removeEventListener('pointermove', handleGestureMove);
    document.removeEventListener('pointerup', handleGestureEnd);

    const { x, y } = event;

    onGestureEnd?.({
      nativeEvent: event,
      pointerType: event.pointerType as PointerType,
      duration: Math.round(performance.now() - (startTime.current || 0)),
      direction: previousDirection.current,
      aborted: reason === 'abort',
      expired: reason === 'expire',
      x,
      y,
      ...previousMovement.current,
      ...previousDelta.current,
    });

    startPosition.current = { x: 0, y: 0 };
    startTime.current = null;

    previousDelta.current = { deltaX: 0, deltaY: 0 };
    previousMovement.current = { movementX: 0, movementY: 0 };

    isLocked.current = true;
    offset.current = { x: 0, y: 0 };

    previousDirection.current = null;

    clearTimeout(lifespanTimer.current);
    lifespanTimer.current = undefined;
  };

  const handleGestureStart = (event: PointerEvent) => {
    if (pointerType && event.pointerType !== pointerType) return;
    if (event.button !== 0) return;

    document.addEventListener('pointermove', handleGestureMove);
    document.addEventListener('pointerup', handleGestureEnd);

    startTime.current = performance.now();
    startPosition.current = { x: event.x, y: event.y };

    if (isNumber(lifespan)) {
      lifespanTimer.current = setTimeout(() => {
        handleGestureEnd(event, 'expire');
      }, lifespan);
    }

    onGestureStart?.({
      nativeEvent: event,
      ...startPosition.current,
      pointerType: event.pointerType as PointerType,
      abort: () => abort(event),
    });
  };

  function abort(event: PointerEvent) {
    handleGestureEnd?.(event, 'abort');
  }

  useEvent(when && ref, 'pointerdown', handleGestureStart);
};

export type UseGestureProps = GestureOptions & {
  children: JSX.Element;
};

export const UseGesture = forwardRef<HTMLElement, UseGestureProps>(function UseGesture(
  {
    children,
    when = true,
    axis,
    pointerType,
    deadZone,
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
    throw new Error('<UseGesture /> component expects a single non-fragment child ReactElement.');
  }

  if ('ref' in childElement && childElement.ref) {
    throw new Error(
      '<UseGesture /> child cannot have a ref explicitly set. If you need to access the ref, set it on the <UseGesture /> component itself.'
    );
  }

  useGesture(forwardedRef, {
    when,
    axis,
    pointerType,
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
