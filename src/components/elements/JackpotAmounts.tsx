import { addCommasToNumber } from '@/utils';
import * as React from 'react';

const jackpotAmounts = [
  { title: 'Wyse King  Jackpot', value: 30000000, gauge: 40 },
  { title: 'Mega Jackpot', value: 500000, gauge: 90 },
  { title: 'Super Jackpot', value: 42120, gauge: 65 },
];

export const JackPotAmounts: React.FunctionComponent = () => {
  return (
    <>
      <ul className="flex w-full gap-4 overflow-x-auto text-center xl:flex xl:flex-wrap xl:gap-8 xl:space-y-0 2xl:gap-12">
        {jackpotAmounts.map(({ title, value, gauge }) => {
          return (
            <li key={title} className="flex-grow">
              <div className="card-bg mb-2 rounded-2xl px-3 py-2 xl:mb-3 xl:w-full xl:p-4 2xl:px-8 2xl:py-5">
                {/* <span className="absolute top-0 left-0 right-0 mx-auto block h-[2.5px] w-3/5 bg-[#000410]"></span> */}
                <span className="jackpot-text-shadow block whitespace-nowrap font-serif text-[10px] font-bold italic text-[#F676EF] sm:text-sm md:mb-1 xl:text-base">
                  {title}{' '}
                </span>
                <span className="jackpot-text-shadow text-sm font-bold sm:text-base xl:text-2xl 2xl:text-[32px]">
                  ₦{addCommasToNumber(value)}
                </span>
              </div>

              <div className="relative mx-auto h-1 w-4/5 overflow-hidden rounded bg-white bg-opacity-20 md:h-[6px] xl:w-full">
                <div
                  className="h-1 rounded bg-white md:h-[6px]"
                  style={{
                    width: `${gauge}%`,
                  }}
                />
              </div>
            </li>
          );
        })}
      </ul>

      <style jsx>{`
        .card-bg {
          background-image: radial-gradient(
            59.67% 59.67% at 53.97% 40.33%,
            #4c1961 0%,
            #270336 100%
          );
        }
        .jackpot-text-shadow {
          -webkit-text-stroke: 1px #f26de8; /* width and color */

          text-shadow: 0px 4px 24px rgba(246, 118, 239, 0.5);
        }
      `}</style>
    </>
  );
};
