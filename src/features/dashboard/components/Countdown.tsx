import * as React from 'react';

import { useCountdown } from '@/hooks';

interface CountdownProps {
  sample?: string;
}

const countdownLabels = ['Days', 'Hours', 'Minutes', 'Seconds'];
// Use to calculate 3 days into the future dynamically
// const EXTRA_DAYS = 5 * 24 * 60 * 60 * 1000;
// const NOW_IN_MS = new Date().getTime();`

const targetDate = 1659006246224;

export const Countdown: React.FunctionComponent<CountdownProps> = () => {
  const { strings: countdownStrings } = useCountdown(targetDate);
  const [days, hours, minutes, seconds] = countdownStrings;
  const countdownValues = [days, hours, minutes, seconds];

  return (
    <div className="mb-6 flex flex-shrink-0 items-center justify-center rounded-[10px] border border-dashed border-[#DADADA] p-4 pb-6 pt-6">
      <div>
        <h2 className="mb-4 text-center text-base font-bold md:mb-[30px] md:text-xl">
          Countdown to next selection
        </h2>

        <div className=" mx-auto grid w-max grid-cols-4 justify-center gap-2">
          {countdownLabels.map((l, i) => {
            return (
              <p key={l} className="w-full transition-all duration-300 ease-in-out">
                <span className="mx-auto mb-1.5 block w-max text-center text-[10px] uppercase md:mb-2.5">
                  {l}
                </span>
                <span className="sr-only">: </span>
                <span className="relative block rounded bg-black py-2 px-3.5 text-center font-mono text-lg font-semibold text-white transition-all duration-300 ease-in-out md:text-3xl">
                  {countdownValues[i]}
                  <span
                    aria-hidden
                    className="absolute left-0 right-0 top-1/2 mx-auto h-[1px] w-[94%] bg-black"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="5"
                    height="5"
                    fill="none"
                    viewBox="0 0 5 5"
                    className="absolute left-0 top-[calc(50%-2px)]"
                  >
                    <path fill="#fff" d="M4.014 2.5L.252 4.644.276.314 4.014 2.5z"></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="5"
                    height="5"
                    fill="none"
                    viewBox="0 0 5 5"
                    className="absolute right-0 top-[calc(50%-2px)] rotate-180"
                  >
                    <path fill="#fff" d="M4.014 2.5L.252 4.644.276.314 4.014 2.5z"></path>
                  </svg>
                </span>
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};
