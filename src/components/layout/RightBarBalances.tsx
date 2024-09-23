import { useToggle } from '@/hooks';
import { addCommasToNumber } from '@/utils';
import * as React from 'react';

interface RightBarBalancesProps {
  accountBalances: {
    wallet_balance?: number;
    bonus_balance?: null | number | undefined;
    winnings_wallet_balance?: number | string;
  };
}

export const RightBarBalances: React.FunctionComponent<RightBarBalancesProps> = ({
  accountBalances,
}) => {
  const [isPlayBalanceHidden, toggleIsPlayBalanceHidden] = useToggle(false);
  const [isBonusBalance, toggleIsBonusBalance] = useToggle(false);
  const [isWinningsBalanceHidden, toggleIsWinningsBalanceHidden] = useToggle(false);

  return (
    <div
      className="mt-8 h-auto w-auto space-y-4 overflow-auto rounded-[7px] bg-[#000410]
        px-5 py-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-1.5">
        <p className="mb-1">
          <span className="text-xs font-medium text-white text-opacity-70">
            Play wallet balance
          </span>
          <span className="block text-xl font-bold text-white text-opacity-100">
            {isPlayBalanceHidden
              ? '****'
              : '₦' + addCommasToNumber(Number(accountBalances?.wallet_balance) || 0)}
          </span>
        </p>

        <button onClick={toggleIsPlayBalanceHidden as React.MouseEventHandler<HTMLButtonElement>}>
          <svg
            width="18"
            height="16"
            viewBox="0 0 18 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.8"
              d="M16.7087 5.62409C14.7837 2.59909 11.967 0.857422 9.00033 0.857422C7.51699 0.857422 6.07533 1.29076 4.75866 2.09909C3.44199 2.91576 2.25866 4.10742 1.29199 5.62409C0.458659 6.93242 0.458659 9.05742 1.29199 10.3658C3.21699 13.3991 6.03366 15.1324 9.00033 15.1324C10.4837 15.1324 11.9253 14.6991 13.242 13.8908C14.5587 13.0741 15.742 11.8824 16.7087 10.3658C17.542 9.06575 17.542 6.93242 16.7087 5.62409ZM9.00033 11.3658C7.13366 11.3658 5.63366 9.85742 5.63366 7.99909C5.63366 6.14075 7.13366 4.63242 9.00033 4.63242C10.867 4.63242 12.367 6.14075 12.367 7.99909C12.367 9.85742 10.867 11.3658 9.00033 11.3658Z"
              fill="white"
            />
            <path
              d="M9 5.61719C7.69167 5.61719 6.625 6.68385 6.625 8.00052C6.625 9.30885 7.69167 10.3755 9 10.3755C10.3083 10.3755 11.3833 9.30885 11.3833 8.00052C11.3833 6.69219 10.3083 5.61719 9 5.61719Z"
              fill="white"
            />
          </svg>
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-1.5">
        <p className="mb-1">
          <span className="text-xs font-medium text-white text-opacity-70">Bonus Balance</span>
          <span className="block text-xl font-bold text-white text-opacity-100">
            {isBonusBalance
              ? '****'
              : '₦' + addCommasToNumber(Number(accountBalances?.bonus_balance) || 0)}
          </span>
        </p>

        <button onClick={toggleIsBonusBalance as React.MouseEventHandler<HTMLButtonElement>}>
          <svg
            width="18"
            height="16"
            viewBox="0 0 18 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.8"
              d="M16.7087 5.62409C14.7837 2.59909 11.967 0.857422 9.00033 0.857422C7.51699 0.857422 6.07533 1.29076 4.75866 2.09909C3.44199 2.91576 2.25866 4.10742 1.29199 5.62409C0.458659 6.93242 0.458659 9.05742 1.29199 10.3658C3.21699 13.3991 6.03366 15.1324 9.00033 15.1324C10.4837 15.1324 11.9253 14.6991 13.242 13.8908C14.5587 13.0741 15.742 11.8824 16.7087 10.3658C17.542 9.06575 17.542 6.93242 16.7087 5.62409ZM9.00033 11.3658C7.13366 11.3658 5.63366 9.85742 5.63366 7.99909C5.63366 6.14075 7.13366 4.63242 9.00033 4.63242C10.867 4.63242 12.367 6.14075 12.367 7.99909C12.367 9.85742 10.867 11.3658 9.00033 11.3658Z"
              fill="white"
            />
            <path
              d="M9 5.61719C7.69167 5.61719 6.625 6.68385 6.625 8.00052C6.625 9.30885 7.69167 10.3755 9 10.3755C10.3083 10.3755 11.3833 9.30885 11.3833 8.00052C11.3833 6.69219 10.3083 5.61719 9 5.61719Z"
              fill="white"
            />
          </svg>
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-1.5">
        <p className="mb-1">
          <span className="text-xs font-medium text-white text-opacity-70">
            Winnings wallet balance
          </span>
          <span className="block text-xl font-bold text-white text-opacity-100">
            {isWinningsBalanceHidden
              ? '****'
              : '₦' + addCommasToNumber(Number(accountBalances?.winnings_wallet_balance) || 0)}
          </span>
        </p>

        <button
          onClick={toggleIsWinningsBalanceHidden as React.MouseEventHandler<HTMLButtonElement>}
        >
          <svg
            width="18"
            height="16"
            viewBox="0 0 18 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.8"
              d="M16.7087 5.62409C14.7837 2.59909 11.967 0.857422 9.00033 0.857422C7.51699 0.857422 6.07533 1.29076 4.75866 2.09909C3.44199 2.91576 2.25866 4.10742 1.29199 5.62409C0.458659 6.93242 0.458659 9.05742 1.29199 10.3658C3.21699 13.3991 6.03366 15.1324 9.00033 15.1324C10.4837 15.1324 11.9253 14.6991 13.242 13.8908C14.5587 13.0741 15.742 11.8824 16.7087 10.3658C17.542 9.06575 17.542 6.93242 16.7087 5.62409ZM9.00033 11.3658C7.13366 11.3658 5.63366 9.85742 5.63366 7.99909C5.63366 6.14075 7.13366 4.63242 9.00033 4.63242C10.867 4.63242 12.367 6.14075 12.367 7.99909C12.367 9.85742 10.867 11.3658 9.00033 11.3658Z"
              fill="white"
            />
            <path
              d="M9 5.61719C7.69167 5.61719 6.625 6.68385 6.625 8.00052C6.625 9.30885 7.69167 10.3755 9 10.3755C10.3083 10.3755 11.3833 9.30885 11.3833 8.00052C11.3833 6.69219 10.3083 5.61719 9 5.61719Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
