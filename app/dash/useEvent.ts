'use client';

/**
 * @todo Missing component-hook.
 */

import { isHTMLElement, isMediaQueryList, isRefObject, isString, isVisualViewport } from '.';
import { RefObject, useEffect } from 'react';

type EventReference<BaseReference> = BaseReference | null | false | undefined;

export type EventOptions = boolean | AddEventListenerOptions;

export function useEvent<Type extends keyof WindowEventMap>(
  reference: EventReference<'window'>,
  type: Type,
  listener: (event: WindowEventMap[Type]) => void,
  options?: EventOptions
): void;

export function useEvent<Type extends keyof DocumentEventMap>(
  reference: EventReference<'document'>,
  type: Type,
  listener: (event: DocumentEventMap[Type]) => void,
  options?: EventOptions
): void;

export function useEvent<Type extends keyof VisualViewportEventMap>(
  reference: EventReference<'visualViewport'>,
  type: Type,
  listener: (event: VisualViewportEventMap[Type]) => void,
  options?: EventOptions
): void;

export function useEvent<Type extends keyof HTMLElementEventMap, E extends HTMLElement>(
  reference: EventReference<RefObject<E>>,
  type: Type,
  listener: (event: HTMLElementEventMap[Type]) => void,
  options?: EventOptions
): void;

export function useEvent<Type extends keyof MediaQueryListEventMap>(
  reference: EventReference<RefObject<MediaQueryList>>,
  type: Type,
  listener: (event: MediaQueryListEventMap[Type]) => void,
  options?: EventOptions
): void;

export function useEvent(
  target: EventReference<
    'window' | 'document' | 'visualViewport' | RefObject<HTMLElement> | RefObject<MediaQueryList>
  >,
  type:
    | keyof WindowEventMap
    | keyof DocumentEventMap
    | keyof HTMLElementEventMap
    | keyof MediaQueryListEventMap
    | keyof VisualViewportEventMap,
  listener: (
    event:
      | WindowEventMap[keyof WindowEventMap]
      | DocumentEventMap[keyof DocumentEventMap]
      | HTMLElementEventMap[keyof HTMLElementEventMap]
      | MediaQueryListEventMap[keyof MediaQueryListEventMap]
      | VisualViewportEventMap[keyof VisualViewportEventMap]
  ) => void,
  options?: EventOptions
) {
  useEffect(() => {
    if (!target || (isRefObject(target) && !target.current)) return;

    let element: Window | Document | HTMLElement | MediaQueryList | VisualViewport | null = null;

    if (isString(target)) {
      if (target === 'window') {
        element = window;
      } else if (target === 'document') {
        element = document;
      } else if (target === 'visualViewport' && isVisualViewport(visualViewport)) {
        element = visualViewport;
      }
    } else if (isRefObject(target)) {
      if (isHTMLElement(target.current)) {
        element = target.current;
      } else if (isMediaQueryList(target.current)) {
        element = target.current;
      }
    }

    if (!element) {
      throw new Error(
        `Parameter target of useEvent() must be one of the following:\n\n- String: "window", "document", "visualViewport"\n- RefObject: HTMLElement | MediaQueryList\n\nPassed value: ${JSON.stringify(
          target
        )}`
      );
    }

    element.addEventListener(type, listener, options);
    return () => element?.removeEventListener(type, listener, options);
  }, [target, type, listener, JSON.stringify(options)]);
}
