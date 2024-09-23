import * as React from 'react';
import Link from 'next/link';

import { Button } from '@/components/elements';
import { useToggle } from '@/hooks';
import { useUser } from '@/features/auth';
import { addCommasToNumber } from '@/utils';

interface BalanceCardProps {
  sample?: string;
}

export const BalanceCard: React.FunctionComponent<BalanceCardProps> = () => {
  const [isBalanceShown, toggleIsBalanceShown] = useToggle(true);
  const { data: userDetails } = useUser();

  const { play_balance } = userDetails || {};

  return (
    <>
      <div className="relative mb-6 w-full overflow-hidden rounded-[20px] font-medium">
        <div className="card-gradient absolute -z-10 h-full w-full"></div>

        <div className="z-10 bg-[url('/images/card-backgrounds/main-dash-bg.svg')] bg-cover bg-no-repeat p-8 pb-6 text-white md:p-11">
          <h2 className="mb-[18px] block text-base text-white text-opacity-70 md:text-xl">
            Available Balance{' '}
          </h2>

          <div className="mb-4 flex items-center gap-8 md:mb-[23px] 2xl:gap-9">
            <p className="text-3xl font-bold md:text-[34px]">
              {isBalanceShown
                ? `₦${!!play_balance ? addCommasToNumber(play_balance) : '0'}.00`
                : '****'}
            </p>

            <button
              className="transition duration-200 ease-in-out hover:scale-[1.02] active:scale-[0.95]"
              onClick={toggleIsBalanceShown as React.MouseEventHandler<HTMLButtonElement>}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0"
              >
                <path
                  opacity="0.8"
                  d="M28.3333 12.2C25.2533 7.36 20.7466 4.57333 16 4.57333C13.6266 4.57333 11.32 5.26667 9.21329 6.56C7.10663 7.86667 5.21329 9.77333 3.66663 12.2C2.33329 14.2933 2.33329 17.6933 3.66663 19.7867C6.74663 24.64 11.2533 27.4133 16 27.4133C18.3733 27.4133 20.68 26.72 22.7866 25.4267C24.8933 24.12 26.7866 22.2133 28.3333 19.7867C29.6666 17.7067 29.6666 14.2933 28.3333 12.2ZM16 21.3867C13.0133 21.3867 10.6133 18.9733 10.6133 16C10.6133 13.0267 13.0133 10.6133 16 10.6133C18.9866 10.6133 21.3866 13.0267 21.3866 16C21.3866 18.9733 18.9866 21.3867 16 21.3867Z"
                  fill="white"
                />
                <path
                  d="M16 12.1867C13.9066 12.1867 12.2 13.8933 12.2 16C12.2 18.0933 13.9066 19.8 16 19.8C18.0933 19.8 19.8133 18.0933 19.8133 16C19.8133 13.9067 18.0933 12.1867 16 12.1867Z"
                  fill="white"
                />
              </svg>

              <span className="sr-only">Show balance</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-4 2xl:gap-16">
            <Link href="/withdrawals/withdrawal-steps">
              <a>
                <Button
                  variant="unstyled"
                  size="smNoPadding"
                  className="border-[0.5px] border-white border-opacity-50 bg-white bg-opacity-20 py-2 px-[14px] text-xs md:py-3 2xl:text-sm"
                >
                  Withdrawal
                </Button>
              </a>
            </Link>

            <Link href="/fund-wallet/fund-channels">
              <a>
                <Button
                  size="smNoPadding"
                  className="whitespace-nowrap border-[0.5px] border-white border-opacity-50 bg-white bg-opacity-20 py-2 px-[23px] text-xs md:py-3 2xl:text-sm"
                >
                  Top up
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .card-gradient {
          background: linear-gradient(92.01deg, #9602ad -66.38%, #4c1961 66.48%);
          transform: matrix(-1, 0, 0, 1, 0, 0);
        }
      `}</style>
    </>
  );
};
