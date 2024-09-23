import clsx from 'clsx';
import { useRouter } from 'next/router';
import * as React from 'react';
import { PlayResponsiblyAlert } from '@/components/elements';



interface PreferredProps {
  setGoToRoute: (link: string) => void;
  openInstantCashOutModal: () => void;
  openSalaryForLifeModal: () => void;
}

const CRASH_GAMES_ROUTE = 'https://games.wisewinn.com';
const WYSE_CASH_ROUTE = '/wyse-cash';
const SOCCER_CASH_ROUTE = '/soccer-cash/';
const QUIKA_ROUTE = '/quika';
const BANKER_ROUTE = '/banker';
const AWOOF_ROUTE = '/awoof';

export const PreferredGames: React.FunctionComponent<PreferredProps> = ({
  setGoToRoute,
  // openInstantCashOutModal,
  openSalaryForLifeModal,
}: PreferredProps) => {
  const router = useRouter();

  const preferredGames = [
    {
      name: 'crash-games',
      imageStyles: `bg-[url('/images/preferred-games/crash-games.jpg')]`,
      link: `/`,
    },
  
    {
      name: 'instant-cashout',
      imageStyles: `bg-[url('/images/preferred-games/instant-cashout.jpg')]`,
      link: '/instant-cashout',
    },
  
    {
      name: 'salary-for-life',
      imageStyles: `bg-[url('/images/preferred-games/salary-for-life.jpg')]`,
      link: '/salary-for-life',
    },
    {
      name: 'awoof',
      imageStyles: `bg-[url('/images/preferred-games/awoof.svg')]`,
      link: '/awoof',
      isComingSoon: false,
    },
    {
      name: 'wyse-cash',
      imageStyles: `bg-[url('/images/preferred-games/wyse-cash.jpg')]`,
      link: '/wyse-cash',
    },
    {
      name: 'banker',
      imageStyles: `bg-[url('/images/preferred-games/banker_logo.jpg')]`,
      link: '/banker',
      isComingSoon: false,
    },
    {
      name: 'quika-cash',
      imageStyles: `bg-[url('/images/preferred-games/quika_logo.jpg')]`,
      link: '/quika',
      isComingSoon: false,
    },
    {
      name: 'soccer-cash',
      imageStyles: `bg-[url('/images/preferred-games/soccer_cash_updated.webp')]`,
      link: '/',
      isComingSoon: false,
    },
  ];

  return (
    <div className="bg-black">
      <div className="flex flex-row items-center justify-between gap-5 py-4 text-sm md:justify-start">
        <div>
          <h2 className="mb-1 font-medium sm:text-lg">Select preferred game</h2>
          <PlayResponsiblyAlert className="text-[10px]" />
        </div>

        <button
          onClick={() => router.push('https://knowthegames.tiiny.site/')}
          className="how_to_play_btn ml-2 inline-block rounded-[7px] bg-[#1C1E23] px-3 py-2  text-xs text-white md:p-4 "
        >
          Know the games
        </button>
      </div>
      <ul className="game__projects grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-2 xl:grid-cols-3">
        {preferredGames.map(({ name, imageStyles, link, isComingSoon }) => {
          return (
            <li key={name} className="relative flex-grow">
              <button
                className="block w-full transition duration-500 ease-in-out hover:scale-[1.02] active:scale-[0.95]"
                onClick={() => {
                  if (isComingSoon) {
                    return;
                  }

                  if (name === 'crash-games') {
                    router.push(CRASH_GAMES_ROUTE);
                    return;
                  }

                  if (name === 'soccer-cash') {
                    router.push(SOCCER_CASH_ROUTE);
                    return;
                  }

                  if (name === 'quika-cash') {
                    router.push(QUIKA_ROUTE);
                    return;
                  }

                  if (name === 'banker') {
                    router.push(BANKER_ROUTE);
                    return;
                  }
                  if (name === 'awoof') {
                    router.push(AWOOF_ROUTE);
                    return;
                  }

                  name == 'wyse-cash'
                    ? router.push(WYSE_CASH_ROUTE)
                    : name == 'instant-cashout'
                      ? (() => {
                        router.push('/instant-cashout');
                        // openInstantCashOutModal();
                      })()
                      : (() => {
                        setGoToRoute(link);
                        openSalaryForLifeModal();
                      })();
                }}
              >
                <div className="rounded-3xl border border-wise-purple-dark border-opacity-80 p-2.5">
                  <div
                    className={clsx(
                      'relative block h-[140px] rounded-[19px] bg-cover bg-center bg-no-repeat md:h-[230px] xl:h-[140px] 2xl:h-[200px]',
                      imageStyles,
                    )}
                  >
                    <p className="text absolute top-3 right-3 flex h-10 w-10 rotate-[20deg] items-center justify-center rounded-full bg-white text-xs font-bold text-black transition duration-300 ease-in-out hover:rotate-0">
                      Play
                    </p>
                  </div>
                </div>

                <p
                  className={clsx(
                    'playnow-btn relative mx-auto -mt-6 block max-w-[80%] rounded-md px-2 py-2 text-center text-xs font-semibold text-white 2xl:px-9 2xl:py-2.5 2xl:text-base',
                    isComingSoon && 'hidden',
                  )}
                >
                  Play now
                </p>
              </button>

              {isComingSoon && (
                <div className="absolute inset-0 flex cursor-not-allowed items-center justify-center overflow-hidden bg-black bg-opacity-50">
                  <p className="rotate-[-15.98deg] whitespace-nowrap bg-white py-2.5 px-4 font-clash font-bold text-black">
                    Coming Soon !!
                  </p>

                  <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                    <svg
                      width="127"
                      height="83"
                      viewBox="0 0 127 83"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="19" cy="17" r="8" fill="#1CA78B" />
                      <circle cx="123.5" cy="45.5" r="3.5" fill="#D9D9D9" />
                      <circle cx="2" cy="48" r="2" fill="#D9D9D9" />
                      <path
                        d="M97 7.5C97 8.88071 95.8807 10 94.5 10C93.1193 10 92 8.88071 92 7.5C92 6.11929 93.1193 5 94.5 5C95.8807 5 97 6.11929 97 7.5Z"
                        fill="#F8A629"
                      />
                      <circle cx="46.5" cy="81.5" r="1.5" fill="#4C1961" />
                      <circle cx="84.5" cy="55.5" r="1.5" fill="#4C1961" />
                      <circle cx="45.5" cy="50.5" r="3.5" fill="#01A7DB" />
                      <circle cx="53" cy="3" r="3" fill="#4C1961" />
                    </svg>
                  </span>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <style jsx>{`
        .playnow-btn {
          background: linear-gradient(90deg, #4c1961 0%, #ff000f 242.97%);
        }
      `}</style>
    </div>
  );
};

export default PreferredGames;
