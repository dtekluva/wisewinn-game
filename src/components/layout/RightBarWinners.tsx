import clsx from 'clsx';
import { format } from 'date-fns';
import Link from 'next/link';
import * as React from 'react';

interface RightBarWinnersProps {
  topWinners?: {
    phone_number: string;
    earning: string;
    total_jackpot_amount: string;
    game_play_id: string;
    win_type: string;
    lotto_type: string;
    date_won: string;
  }[];
}

export const RightBarTopWinners: React.FunctionComponent<RightBarWinnersProps> = ({
  topWinners,
}) => {
  const imagesSelector = (imageType: string) => {
    if (imageType === 'SALARY_FOR_LIFE') {
      return {
        bgColor: `bg-[url('/images/top-winners/salary-4-life.jpg')]`,
        color: 'bg-[#4C1961]',
      };
    } else if (imageType === 'INSTANT_CASHOUT') {
      return {
        bgColor: `bg-[url('/images/top-winners/wyse-cash.jpg')]`,
        color: 'bg-[#CFAF36]',
      };
    } else if (imageType === 'WYSE_CASH') {
      return {
        bgColor: `bg-[url('/images/top-winners/instant-cash.jpg')]`,
        color: 'bg-[#88878E]',
      };
    }
  };
  return (
    <div className="mt-[37px]">
      <p className="mb-[14px] text-base font-medium text-white">
        <span className="text-[#848484]">Top </span> Winners ( {topWinners?.length || 0} )
      </p>

      <ul className="">
        {topWinners?.map(({ phone_number, earning, lotto_type, game_play_id }, index) => {
          return (
            <li
              key={game_play_id}
              className="mt-[10px] h-[auto] w-full rounded-[7px] bg-[#000410] py-[11px] pl-[16px] "
            >
              <Link href={'0#'}>
                <a>
                  <div className="flex w-full items-center justify-between">
                    <div className="flex gap-3">
                      <div
                        className={clsx(
                          'relative block h-[33px] w-[33px] rounded-[10px] bg-cover bg-center bg-no-repeat',
                          imagesSelector(lotto_type)?.bgColor, // imageStyles,
                        )}
                      ></div>
                      <div>
                        <p className="text-[10px] font-medium text-[#848484]">{phone_number}</p>
                        <p className="mt-1 text-xs font-medium text-[#ffffff]">{earning}</p>
                      </div>
                    </div>

                    <div
                      className={clsx(
                        'relative mr-[-10px] flex h-[24px] w-[24px] items-center justify-center rounded-full',
                        imagesSelector(lotto_type)?.color,
                      )}
                    >
                      <p className="text-center font-clash font-semibold ">{index + 1}</p>
                    </div>
                  </div>
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
      {(topWinners?.length == 0 || !topWinners) && <p className="text-xs">No winners yet</p>}
    </div>
  );
};

interface RightBarOtherWinnersProps {
  winners?: {
    phone_number: string;
    earning: string;
    total_jackpot_amount: string;
    game_play_id: string;
    win_type: string;
    lotto_type: string;
    date_won: string;
  }[];
  title: string;

  // winners: {
  //   name: string;
  //   winnerEmailAddress: string;
  //   winnings: string;
  //   link: string;
  // }[];
}

export const RightBarOtherWinners: React.FunctionComponent<RightBarOtherWinnersProps> = ({
  winners,
  title,
}) => {
  return (
    <>
      <div className="mt-5 first-of-type:mt-2.5">
        <ul
          className="shadow_winnings mt-[10px] h-[auto] w-full rounded-[7px]
                bg-[#000410] py-[17px] px-[16px]"
        >
          <h1 className="text-xs font-semibold">{title}</h1>
          <div className="mt-[17px] mb-[18px] h-[1px] w-full bg-white bg-opacity-30"></div>
          {winners?.map(
            ({
              phone_number,
              earning,
              game_play_id,
              // total_jackpot_amount,
              // date_won,
            }) => {
              return (
                <li key={game_play_id} className="">
                  <div className="">
                    <Link href={'#0'}>
                      <a>
                        <div className="">
                          <div className="flex items-center justify-between">
                            <p className="text-[10px] font-medium text-[#848484]">{phone_number}</p>
                            <p className="mt-1 text-[14px] font-semibold text-[#ffffff] ">
                              {earning}
                            </p>
                          </div>
                        </div>
                        <div className="mt-[11px] h-[0.5px] w-full bg-[#263238]"></div>
                      </a>
                    </Link>
                  </div>
                </li>
              );
            },
          )}
          {(winners?.length == 0 || !winners) && <p className="text-xs">No winners yet</p>}
        </ul>
      </div>

      <style jsx>{``}</style>
    </>
  );
};

interface RightBarJackpotProps {
  jackpotWinners: {
    user: number;
    jackpot: number;
    amount: number;
    earning: string;
    win_type: string;
    phone_number: string;
    total_jackpot_amount: string;
    date: Date;
    // name: string;
    // title: string;
    // jackpotEmail: string;
    // jackpotAmount: string;
    // link: string;
  }[];
}

export const RightBarJackpot: React.FunctionComponent<RightBarJackpotProps> = ({
  jackpotWinners,
}) => {
  return (
    <>
      <div className="mt-[37px]">
        <p className="mb-[14px] text-base font-medium text-white">
          {' '}
          <span className="text-[#848484]">Jackpot </span> Winners
        </p>
        <ul className="">
          {jackpotWinners.map(({ user, win_type, total_jackpot_amount, phone_number, date }) => {
            return (
              <li key={user} className="mt-[10px] h-[auto] w-full overflow-auto">
                <h1 className="mb-[7px] text-[10px] font-medium">{win_type}</h1>
                <div className="rounded-[7px] bg-[#000410] py-[11px] px-[16px] ">
                  <Link href={'#0'}>
                    <a>
                      <div className="flex w-full items-end justify-between gap-2">
                        <div className="">
                          <div>
                            <p className="text-[10px] font-medium text-[#848484]">{phone_number}</p>
                            <p className="mt-1 text-[12px] font-medium text-[#ffffff]">
                              {total_jackpot_amount}
                            </p>
                          </div>
                        </div>

                        <div>
                          <p className="text-right text-[10px] font-medium text-[#848484]">
                            {format(new Date(date), 'dd-MM-yyyy hh:mm:ss')}
                          </p>
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
        {(jackpotWinners?.length == 0 || !jackpotWinners) && (
          <p className="text-xs">No winners yet</p>
        )}
      </div>
    </>
  );
};
