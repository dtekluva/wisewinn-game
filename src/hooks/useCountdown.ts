import { useEffect, useState } from 'react';

const getReturnValues = (countDown: number) => {
  // calculate time left
  // * This logic can be handled by date-fns's interval to duration method
  // * Consider using this for ease and customizablity in the future
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  const valuesWithNegativeNumbers = [days, hours, minutes, seconds];
  const valuesWithoutNegativeNumbers = valuesWithNegativeNumbers.map(v => Math.max(0, v));
  const valuesAsStrings = valuesWithoutNegativeNumbers.map(v => String(v).padStart(2, '0'));

  const hasCountdownEnded = days < 1 && hours < 1 && seconds < 1 && minutes < 1;

  return { numbers: valuesWithoutNegativeNumbers, strings: valuesAsStrings, hasCountdownEnded };
};

// TODO Improve hook with more options like stop start clear - just like the useTimeout Hook on this project
export const useCountdown = (targetDate: string | number) => {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(countDownDate - new Date().getTime());

  useEffect(() => {
    // reset countdown values based on current time, every second
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
};
