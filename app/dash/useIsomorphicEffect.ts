'use client';

/** @todo Figure out how to add a component-hook for this. */

import { useEffect, useLayoutEffect } from 'react';

export const useIsomorphicEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect;
