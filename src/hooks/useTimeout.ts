/* eslint-disable @typescript-eslint/no-explicit-any */
/* https://mantine.dev/hooks/use-timeout/ */

import { useEffect, useRef } from 'react';

/**
 *
 * @param callback function that will be called after the timer elapses
 * @param delay number of milliseconds the timer should wait before the specified function is executed
 * @param options determines whether the timer should be started on mount, defaults to false
 * @returns { start: starts the timer, clear: clears the timer }
 */
export function useTimeout(
  callback: (...callbackParams: any[]) => void,
  delay: number,
  options: { autoInvoke: boolean } = { autoInvoke: false },
) {
  const timeoutRef = useRef<number | null>(null);

  const start = (...callbackParams: any[]) => {
    if (!timeoutRef.current) {
      timeoutRef.current = window.setTimeout(() => {
        callback(callbackParams);
        timeoutRef.current = null;
      }, delay);
    }
  };

  const clear = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => {
    if (options.autoInvoke) {
      start();
    }

    return clear;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay]);

  return { start, clear };
}
