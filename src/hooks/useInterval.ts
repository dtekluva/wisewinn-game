import { useEffect, useRef, useState } from 'react';

// github.com/mantinedev/mantine/blob/master/src/mantine-hooks/src/use-interval/use-interval.ts
export function useInterval(fn: () => void, interval: number) {
  const [active, setActive] = useState(false);
  const intervalRef = useRef<number>();
  const fnRef = useRef<() => void>();

  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  const start = () => {
    setActive(old => {
      if (!old && !intervalRef.current) {
        intervalRef.current = window.setInterval(fnRef.current as () => void, interval);
      }
      return true;
    });
  };

  const stop = () => {
    setActive(false);
    window.clearInterval(intervalRef.current);
    intervalRef.current = undefined;
  };

  const toggle = () => {
    if (active) {
      stop();
    } else {
      start();
    }
  };

  return { start, stop, toggle, active };
}
