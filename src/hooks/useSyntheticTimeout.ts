import { useEffect, useState } from "react";


/**
 * A custom React hook that sets up a synthetic timeout using `setInterval`,
 * and executes a callback function when the timeout is complete.
 *
 * @param {Function} callback - The callback function to execute when the timeout is complete.
 * @param {number} delay - The delay in milliseconds for the timeout.
 * @param {number} interval - The interval in milliseconds for the timer. Default is 1000 ms.
 *
 * @returns {Object} An object containing the time remaining in the synthetic timeout,
 * and a function to reset the timeout.
 */
export function useSyntheticTimeout(
  callback: () => void,
  delay: number,
  interval = 1000,
): { timeRemaining: number; timeElapsed: number; resetTimeout: () => void } {
  const [timeRemaining, setTimeRemaining] = useState<number>(delay);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);

  const resetTimeout = () => {
    setTimeRemaining(delay);
    setTimeElapsed(0);
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (timeRemaining > 0) {
      // Set up the interval to decrement the time remaining and increment the time elapsed based on the interval.
      intervalId = setInterval(() => {
        setTimeRemaining(prevTimeRemaining => prevTimeRemaining - interval);
        setTimeElapsed(prevTimeElapsed => prevTimeElapsed + interval);
      }, interval);
    } else {
      // Call the callback function when the timeout is complete.
      callback();
    }

    // Clean up the interval when the component unmounts or when the interval needs to be reset.
    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    };
  }, [callback, timeRemaining, interval]);

  return { timeRemaining, timeElapsed, resetTimeout };
}
