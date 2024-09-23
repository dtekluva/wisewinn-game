import React from 'react';
import { format } from 'date-fns';
import { useRouter } from 'next/router';

interface ResultNumberPicksProps {
  gameType: 'salaryForLife' | 'instantCashout' | 'wyseCash' | 'jackpotWinners';
  // tickets: any;
  tickets: string | number[] | string[][] | undefined;
  dateWon: Date | undefined;
  playGameRoute?: string;
}

const numberPicks: { [key: string]: string } = {
  salaryForLife: 's 5/49',
  instantCashout: 's 4/40',
};

export const ResultNumberPicks: React.FunctionComponent<ResultNumberPicksProps> = ({
  gameType,
  tickets,
  dateWon,
  playGameRoute,
}) => {
  const router = useRouter();

  return (
    <div className="play_game flex flex-col items-start justify-between gap-4 overflow-auto rounded-[10px] bg-[#15171D] py-8 px-4 md:items-start md:px-8 lg:items-start xl:flex-row xl:items-end xl:gap-8">
      <div>
        <p className={`text-left text-sm font-medium text-white md:text-left`}>
          Result number pick{numberPicks[gameType]}
        </p>

        <div
          className={`mt-2 flex w-full flex-col items-start justify-center gap-2 overflow-auto md:flex-row md:gap-0  ${
            gameType === 'salaryForLife' ? 'lg:items-end' : 'lg:items-center'
          }`}
        >
          {gameType === 'salaryForLife' && (
            <ul className="flex flex-col gap-[10px] gap-2">
              {Array.isArray(tickets) &&
                tickets?.map((item, index) => {
                  return (
                    <div key={index} className="flex flex-row gap-2  ">
                      {Array.isArray(item) &&
                        item?.map((num: string, index: number) => {
                          return (
                            <li
                              className="box_ball relative flex h-[30px] w-[30px] rounded-[50%] text-center text-[12px] font-semibold 
                   leading-[0px] md:h-[40px]
                  md:w-[40px] md:text-[16px]"
                              key={index + num}
                            >
                              <span className="absolute bottom-1/2 block w-full text-center">
                                {num}
                              </span>
                            </li>
                          );
                        })}
                    </div>
                  );
                })}
            </ul>
          )}

          {gameType === 'instantCashout' && (
            <ul className="flex gap-[10px]">
              {Array.isArray(tickets) &&
                tickets?.map((num, index) => {
                  return (
                    <li
                      className="box_ball relative flex h-[30px] w-[30px] rounded-[50%] text-center text-[12px] font-semibold 
                   leading-[0px] md:h-[40px]
                  md:w-[40px] md:text-[16px]"
                      key={index}
                    >
                      <span className="absolute bottom-1/2 block w-full text-center">{num}</span>
                    </li>
                  );
                })}
            </ul>
          )}

          {gameType === 'wyseCash' && (
            <p className="rounded bg-[#d8d5fd]/10 px-8 py-2 text-center">{tickets}</p>
          )}
          {dateWon && (
            <p className="ml-2 text-xs text-[#A6A6A6]">
              Date:&nbsp;
              <span className="inline-block text-sm font-semibold text-white">
                {format(new Date(dateWon || 0), 'dd/MM/yyyy HH:MM:SS')}
              </span>
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => router.push(playGameRoute || '/salary-for-life')}
          className="bg_red_gradient whitespace-nowrap rounded px-3 py-3 text-sm font-medium md:px-6"
        >
          Play next game
        </button>
      </div>
    </div>
  );
};
