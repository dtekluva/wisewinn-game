import * as React from 'react';
import clsx from 'clsx';

import { Button } from '@/components/elements';

interface ApplicationOptionsProps {
  openConsentModal: () => void;
  setClickedApplicationIndex?: React.Dispatch<React.SetStateAction<number>>;
}

const applicationOptions = [
  {
    id: 1,
    amount: '₦100',
    bonus: '₦50,000',
    buttonStyles: 'bg-[#0217d6]',
    itemStyles: 'bg-[#0082D9]',
    bonusStyles: 'text-[#1867CD]',
    linkStyles: `bg-[url('/images/card-backgrounds/blue-bg.svg')]`,
    overlayText: 'Play and win 10,000 to 50,000 with N100 or more',
    isComingSoon: false,
  },
  {
    id: 2,
    amount: '₦200',
    bonus: '₦250,000',
    buttonStyles: 'bg-[#9602AD]',
    itemStyles: 'bg-[#0C0024]',
    bonusStyles: 'text-[#4C1961]',
    linkStyles: `bg-[url('/images/card-backgrounds/purple-bg.svg')]`,
    overlayText: 'Play and win 50,000 to 250,000 with N200 or more',
    isComingSoon: false,
  },
  {
    id: 3,
    amount: '₦500',
    bonus: '₦1,250,000',
    buttonStyles: 'bg-[#008D43]',
    itemStyles: 'bg-gradient-to-r from-[#0F766E] to-[#5EEAD4]',
    bonusStyles: 'text-[#008D43]',
    linkStyles: `bg-[url('/images/card-backgrounds/green-bg.svg')]`,
    overlayText: 'Play and win 250,000 to 1,250,000 with N500 or more',
    isComingSoon: false,
  },
  {
    id: 4,
    amount: '₦1000',
    bonus: '₦2,500,000',
    buttonStyles: 'bg-[#9602AD]',
    itemStyles: 'bg-[#0C0024]',
    bonusStyles: 'text-[#4C1961]',
    linkStyles: `bg-[url('/images/card-backgrounds/deep-purple-bg.svg')]`,
    overlayText: 'Play and win 500,000 to 2,500,000 with N1000 or more',
    isComingSoon: false,
  },
  {
    id: 5,
    amount: '₦2000',
    bonus: '₦5,000,000',
    buttonStyles: 'bg-[#008D43]',
    itemStyles: 'bg-[#0C0B26]',
    bonusStyles: 'text-[#117971]',
    linkStyles: `bg-[url('/images/card-backgrounds/multicolor-bg.svg')]`,
    overlayText: 'Play and win 500,000 to 2,500,000 with N2000 or more',
    isComingSoon: true,
  },
  {
    id: 6,
    amount: '₦3000',
    bonus: '₦7,500,000',
    buttonStyles: 'bg-[#FFD100] text-black',
    itemStyles: 'bg-gradient-to-r from-[#E93434] to-[#E3AB77]',
    bonusStyles: 'text-[#E7453C]',
    linkStyles: `bg-[url('/images/card-backgrounds/naira-bg.svg')]`,
    overlayText: 'Play and win 500,000 to 2,500,000 with N3000 or more',
    isComingSoon: true,
  },
];

export const ApplicationOptions: React.FunctionComponent<ApplicationOptionsProps> = ({
  openConsentModal,
  setClickedApplicationIndex,
}) => {
  return (
    <div>
      <h2 className="mb-4 text-xl font-medium">Game options</h2>

      <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
        {applicationOptions.map(
          (
            {
              id,
              amount,
              bonus,
              buttonStyles,
              itemStyles,
              bonusStyles,
              linkStyles,
              isComingSoon,
              overlayText,
            },
            index,
          ) => {
            return (
              <div className={clsx('group overflow-hidden rounded-lg', itemStyles)} key={id}>
                <div
                  className={clsx(
                    'relative block bg-cover bg-no-repeat py-4 px-7 md:py-6',
                    linkStyles,
                  )}
                >
                  <div>
                    <p className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-black bg-opacity-30 text-sm font-bold text-white md:h-20 md:w-20 md:text-lg">
                      {amount}
                    </p>

                    <p
                      className={clsx(
                        'text-border mb-4 font-poppins text-3xl font-extrabold md:text-[40px]',
                        bonusStyles,
                      )}
                    >
                      {bonus}
                    </p>

                    <Button
                      size="xs"
                      variant="unstyled"
                      className={clsx('text-white', buttonStyles)}
                      onClick={() => {
                        openConsentModal();
                        !!setClickedApplicationIndex && setClickedApplicationIndex(index);
                      }}
                    >
                      Play now
                    </Button>
                  </div>

                  <div
                    className={clsx(
                      'absolute top-0 left-0 flex h-full w-full items-center justify-center rounded-lg bg-black bg-opacity-70 py-6 px-7 opacity-0 transition duration-500 ease-in-out group-hover:opacity-100',
                      isComingSoon && 'hidden',
                    )}
                  >
                    <div>
                      <p className="mb-5 px-4 text-center text-xl font-extrabold text-white">
                        {overlayText}
                      </p>

                      <div className="mx-auto w-max">
                        <Button
                          size="xs"
                          variant="unstyled"
                          className={clsx('mx-auto text-white', buttonStyles)}
                          onClick={() => {
                            openConsentModal();
                            !!setClickedApplicationIndex && setClickedApplicationIndex(index);
                          }}
                        >
                          Play now
                        </Button>
                      </div>
                    </div>
                  </div>

                  {isComingSoon && (
                    <div
                      className={clsx(
                        'absolute top-0 left-0 flex h-full w-full items-center justify-center rounded-lg bg-black bg-opacity-80 py-6 px-7 transition duration-200 ease-in-out',
                      )}
                    >
                      <p className="px-4 text-center text-3xl font-medium text-white">
                        Coming soon
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          },
        )}
      </ul>
    </div>
  );
};
