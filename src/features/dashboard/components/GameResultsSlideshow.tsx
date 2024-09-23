import * as React from 'react';
import clsx from 'clsx';
import { addCommasToNumber } from '@/utils';
import { format } from 'date-fns';

interface GameResultsSlideshowProps {
  resultsData: {
    amount: number;
    batch: number;
    date: string;
    lottery_type: string;
    phone_number: string;
    ticket_number: string[];
  }[];
}

export const GameResultsSlideshow: React.FunctionComponent<GameResultsSlideshowProps> = ({
  resultsData,
}) => {
  return (
    <div className={clsx('results-slideshow-container h-20 overflow-hidden')}>
      <div className="results-slideshow space-y-6">
        {resultsData?.map(({ ticket_number, date, batch, amount, lottery_type }, index) => {
          return (
            <div className="mx-auto w-max" key={index}>
              {lottery_type == 'WYSE_CASH' ? (
                <p className="rounded bg-[#d8d5fd]/10 px-8 py-2 text-center">{ticket_number}</p>
              ) : (
                <ul className="flex gap-[10px]">
                  {ticket_number?.map((num, index) => {
                    return (
                      <li
                        className="box_ball relative flex h-10 w-10 rounded-full text-center text-[16px] font-semibold leading-[0px] sm:h-10 sm:w-10"
                        key={index}
                      >
                        <span className="absolute bottom-1/2 block w-full text-center">{num}</span>
                      </li>
                    );
                  })}
                </ul>
              )}

              <p className="mt-1 text-center text-xs text-[#818181]">
                Batch {batch}: {format(new Date(date), 'dd-MM-yyyy')}
              </p>
              <p className="mt-1 text-center text-xs text-white">
                Win: ₦{addCommasToNumber(amount)}
              </p>
            </div>
          );
        })}

        <style jsx>{`
          @keyframes scroll-results {
            from {
              transform: translateY(0);
            }
            to {
              transform: translateY(calc(-100% + 78px));
            }
          }

          .results-slideshow {
            animation: scroll-results 60s linear infinite;
          }

          .results-slideshow-container:hover .results-slideshow {
            animation-play-state: paused;
          }
        `}</style>
      </div>
    </div>
  );
};
