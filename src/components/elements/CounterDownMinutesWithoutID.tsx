import React from 'react';

import { useCountdown, useForceUpdate } from '@/hooks';

const EXTRA_MINUTES_IN_MS = 5 * 60 * 1000;

export const CounterDownMinutesWithoutID = () => {
  const targetDate = React.useRef(new Date().getTime() + EXTRA_MINUTES_IN_MS);
  const { numbers: countdownNumbers, strings: countdownStrings } = useCountdown(targetDate.current);

  const forceRerender = useForceUpdate();

  const [_daysString, hoursString, minutesString, secondsString] = countdownStrings;
  const [_days, _hours, minutes, seconds] = countdownNumbers;

  const isCountdownComplete = minutes < 1 && seconds < 1;
  const isAlertShown = minutes < 1 && seconds < 10;

  React.useEffect(() => {
    if (isCountdownComplete) {
      targetDate.current = new Date().getTime() + EXTRA_MINUTES_IN_MS;
      forceRerender();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCountdownComplete]);

  return (
    <div className="relative my-2 flex w-full items-center justify-between gap-2  overflow-y-visible bg-[#15171D]  px-4 md:gap-6 md:py-4 md:px-8 lg:px-10">
      <p className="text-right text-sm font-medium text-[#A6A6A6] lg:text-lg">
        <span>
          Expires in <span className="hidden md:inline">5 minutes</span>{' '}
        </span>
        <span className="font-mono text-sm font-semibold text-[#fff] lg:text-xl">
          {hoursString}:{minutesString}:{secondsString}
        </span>
      </p>

      {isAlertShown && (
        <p
          aria-hidden
          className="absolute -top-14 right-4 z-50 block max-w-[180px] rounded-[7px] bg-[#585A5F] py-3  px-4 text-center font-sans text-xs font-normal text-white lg:-top-12"
        >
          <span className="absolute -top-2.5 -left-2.5 flex h-5 w-5">
            <span className="absolute inline-flex h-5 w-5 animate-ping rounded-full bg-[#f26de8] opacity-75"></span>
            <span className="relative inline-flex h-5 w-5 rounded-full bg-[#4c1961]"></span>
          </span>

          <span>
            Next game batch starts in{' '}
            <span className="font-bold">
              {hoursString}:{minutesString}:{secondsString}
            </span>
          </span>

          <span className="absolute -bottom-3 left-1/2 w-max -translate-x-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="16"
              fill="none"
              viewBox="0 0 19 16"
            >
              <path
                fill="#585A5F"
                d="M12.098 14.5c-1.155 2-4.041 2-5.196 0l-5.63-9.75c-1.154-2 .29-4.5 2.599-4.5h11.258c2.31 0 3.753 2.5 2.598 4.5l-5.629 9.75z"
              ></path>
            </svg>
          </span>
        </p>
      )}
    </div>
  );
};
