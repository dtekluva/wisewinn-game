
import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { GameResultsSlideshow } from './GameResultsSlideshow';

interface BOX_RESULTS_PROPS {
  amount: number;
  batch: number;
  date: string;
  lottery_type: string;
  phone_number: string;
  ticket_number: string[];
}

const ResultBox = ({ data }: { data: BOX_RESULTS_PROPS[] }) => {
  const gameBg = (gameType: string) => {
    if (gameType === 'SALARY_FOR_LIFE') {
      return `bg-[url('/images/games-results/salary-4-life.svg')]`;
    } else if (gameType === 'INSTANT_CASHOUT') {
      return `bg-[url('/images/games-results/instant-cash.svg')]`;
    } else if (gameType === 'WYSE_CASH') {
      return `bg-[url('/images/games-results/wyse-cash.svg')]`;
    }
  };
  return (
    <li className="shadow_winnings mt-[10px] h-[160px] flex-grow rounded-[7px] bg-[#00071E] px-[13px] py-4">
      <Link href={'#'}>
        <a>
          <div className="relative h-full">
            <div className="flex items-center gap-2">
              <div
                className={clsx(
                  'relative block h-[40px] w-[50px] rounded-[10px] bg-cover bg-center bg-no-repeat',
                  gameBg(data[0]?.lottery_type),
                )}
              ></div>
              <div>
                <div>
                  <p
                    className={`whitespace-nowrap text-[14px] font-semibold capitalize text-white ${'gameCode' && 'text-center'
                      }`}
                  >
                    {data[0]?.lottery_type.split('_').join(' ')}
                  </p>
                </div>
              </div>

              <p className="basis-1/2 text-right text-[12px]">Batch: {data[0]?.batch} </p>
            </div>

            <GameResultsSlideshow resultsData={data} />
          </div>
        </a>
      </Link>
    </li>
  );
};

// interface GAME_RESULTS_PROPS {
//   FIRST_BOX_RESULTS: BOX_RESULTS_PROPS[];
//   SECOND_BOX_RESULTS: BOX_RESULTS_PROPS[];
//   THIRD_BOX_RESULTS: BOX_RESULTS_PROPS[];
// }
/* eslint-disable @typescript-eslint/no-explicit-any */
export const GameResults = ({
  FIRST_BOX_RESULTS,
  SECOND_BOX_RESULTS,
  THIRD_BOX_RESULTS,
}: any) => {

  const checkValidity = (BOX_RESULTS: BOX_RESULTS_PROPS[]) => {
    return BOX_RESULTS?.length > 0 && BOX_RESULTS != undefined && Array.isArray(BOX_RESULTS);
  };
  return (
    <>
      {checkValidity(FIRST_BOX_RESULTS) && (
        <h1 className="my-2 text-sm font-medium sm:my-4 sm:text-lg">Game Results</h1>
      )}
      <div className="overflow-x-auto sm:mt-4">
        <ul className="w-full items-center  justify-between gap-[1rem] sm:flex">
          {checkValidity(FIRST_BOX_RESULTS) && <ResultBox data={FIRST_BOX_RESULTS} />}
          {checkValidity(SECOND_BOX_RESULTS) && <ResultBox data={SECOND_BOX_RESULTS} />}
          {checkValidity(THIRD_BOX_RESULTS) && <ResultBox data={THIRD_BOX_RESULTS} />}
        </ul>
      </div>
    </>
  );
};
