import * as React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';

const salaryForLifepreferredGames = [
  {
    imageStyles: `bg-[url('/images/preferred-games/salary-for-life.jpg')]`,
    link: '/salary-for-life',
  },
  {
    imageStyles: `bg-[url('/images/preferred-games/salary_for_life2.jpg')]`,
    link: '/salary-for-life',
  },
  {
    imageStyles: `bg-[url('/images/preferred-games/salary_for_life3.jpg')]`,
    link: '/salary-for-life',
  },
];

const instantCashoutPreferredGames = [
  {
    imageStyles: `bg-[url('/images/preferred-games/instant-cashout.jpg')]`,
    link: '/instant-cashout',
  },
  {
    imageStyles: `bg-[url('/images/preferred-games/instant_cashout2.jpg')]`,
    link: '/instant-cashout',
  },
  {
    imageStyles: `bg-[url('/images/preferred-games/instant_cashout3.jpg')]`,
    link: '/instant-cashout',
  },
];

const wyseCashPreferredGames = [
  {
    imageStyles: `bg-[url('/images/preferred-games/wyse-cash.jpg')]`,
    link: '/wyse-cash',
  },
  {
    imageStyles: `bg-[url('/images/preferred-games/wyse_cash2.jpg')]`,
    link: '/wyse-cash',
  },
  {
    imageStyles: `bg-[url('/images/preferred-games/wyse_cash3.jpg')]`,
    link: '/wyse-cash',
  },
];

interface PreferredProps {
  campaignType?: 'SALARLY_FOR_LIFE' | 'INSTANT_CASHOUT' | 'WYSE_CASH';
}

export const CampaignPreferredGames: React.FunctionComponent<PreferredProps> = ({
  campaignType = 'SALARLY_FOR_LIFE',
}: PreferredProps) => {
  const [type, setType] = React.useState<{ imageStyles: string; link: string }[]>();

  React.useEffect(() => {
    if (campaignType === 'SALARLY_FOR_LIFE') {
      setType(salaryForLifepreferredGames);
    } else if (campaignType === 'INSTANT_CASHOUT') {
      setType(instantCashoutPreferredGames);
    } else if (campaignType == 'WYSE_CASH') {
      setType(wyseCashPreferredGames);
    }
  }, [campaignType]);

  const router = useRouter();
  return (
    <div className="bg-black">
      <h2 className="mb-4 text-sm font-medium sm:text-lg">Select preferred game</h2>
      <ul className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-3">
        {type?.map(({ imageStyles, link }) => {
          return (
            <li key={imageStyles} className="relative flex-grow">
              <button
                className="block w-full transition duration-500 ease-in-out hover:scale-[1.02] active:scale-[0.95]"
                onClick={() => {
                  router.push(link);
                }}
              >
                <div
                  className={clsx(
                    'relative block h-[140px] rounded-[19px] bg-cover bg-center bg-no-repeat md:h-[230px] xl:h-[300px] 2xl:h-[200px]',
                    imageStyles,
                  )}
                ></div>

                <p
                  className={clsx(
                    'playnow-btn relative mx-auto mt-4 block rounded-md px-2 py-2 text-center text-xs font-semibold text-white md:py-4 2xl:px-9 2xl:py-2.5 2xl:text-base',
                  )}
                >
                  Play now
                </p>
              </button>
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

export default CampaignPreferredGames;
