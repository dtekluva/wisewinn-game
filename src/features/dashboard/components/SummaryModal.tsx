import * as React from 'react';
import { Disclosure } from '@headlessui/react';
import clsx from 'clsx';

import { SubmissionNumber } from '@/features/dashboard';
import { Button, Modal, ModalCloseButton } from '@/components/elements';
import { Lottery } from '@/types';
import { replaceAtArrayIndex } from '@/utils';

interface SummaryModalProps {
  isSummaryModalOpen: boolean;
  closeSummaryModal: () => void;
  formattedSelectionSummary: SubmissionNumber[][];
  lotteryNumbers: Lottery | undefined;
  amountGroup: string;
  setRenderedFormIndex: (value: React.SetStateAction<number>) => void;
  setSummaryModalStates: (value: React.SetStateAction<boolean[]>) => void;
  summaryModalStates: boolean[];
  handleManualNumberRemoval: (number: string) => void;
  dynamicStakeAmountsList: number[];
}

export type ColorIndex = {
  [key: string]: {
    staticColor: string;
    buttonBgStyles: string;
    bodyBgStyles: string;
  };
};

export const loanAmountColourIndex: ColorIndex = {
  '100': {
    staticColor: '#1867CD',
    buttonBgStyles: 'bg-[#1867CD] bg-opacity-40',
    bodyBgStyles: 'bg-[#1867CD] bg-opacity-30 transition ease-in-out duration-500',
  },
  '200': {
    staticColor: '#4C1961',
    buttonBgStyles: 'bg-[#4C1961] bg-opacity-40',
    bodyBgStyles: 'bg-[#4C1961] bg-opacity-30 transition ease-in-out duration-500',
  },
  '500': {
    staticColor: '#008D43',
    buttonBgStyles: 'bg-[#008D43] bg-opacity-40',
    bodyBgStyles: 'bg-[#008D43] bg-opacity-30 transition ease-in-out duration-500',
  },
  '1000': {
    staticColor: '#9602AD',
    buttonBgStyles: 'bg-[#9602AD] bg-opacity-40',
    bodyBgStyles: 'bg-[#9602AD] bg-opacity-30 transition ease-in-out duration-500',
  },
  '2000': {
    staticColor: '#117971',
    buttonBgStyles: 'bg-[#117971] bg-opacity-40',
    bodyBgStyles: 'bg-[#117971] bg-opacity-30 transition ease-in-out duration-500',
  },
  '3000': {
    staticColor: '#E7453C',
    buttonBgStyles: 'bg-[#E7453C] bg-opacity-40',
    bodyBgStyles: 'bg-[#E7453C] bg-opacity-30 transition ease-in-out duration-500',
  },
};

export const SummaryModal: React.FunctionComponent<SummaryModalProps> = ({
  isSummaryModalOpen,
  closeSummaryModal,
  formattedSelectionSummary,
  lotteryNumbers,
  amountGroup,
  setRenderedFormIndex,
  setSummaryModalStates,
  summaryModalStates, // Used to track and control the open states of the multiple summary modals (each band has its own modal)
  handleManualNumberRemoval,
  dynamicStakeAmountsList,
}) => {
  const colorStylesList = [
    {
      staticColor: '#1867CD',
      buttonBgStyles: 'bg-[#1867CD] bg-opacity-40',
      bodyBgStyles: 'bg-[#1867CD] bg-opacity-30 transition ease-in-out duration-500',
    },
    {
      staticColor: '#4C1961',
      buttonBgStyles: 'bg-[#4C1961] bg-opacity-40',
      bodyBgStyles: 'bg-[#4C1961] bg-opacity-30 transition ease-in-out duration-500',
    },
    {
      staticColor: '#008D43',
      buttonBgStyles: 'bg-[#008D43] bg-opacity-40',
      bodyBgStyles: 'bg-[#008D43] bg-opacity-30 transition ease-in-out duration-500',
    },
    {
      staticColor: '#9602AD',
      buttonBgStyles: 'bg-[#9602AD] bg-opacity-40',
      bodyBgStyles: 'bg-[#9602AD] bg-opacity-30 transition ease-in-out duration-500',
    },
    {
      staticColor: '#117971',
      buttonBgStyles: 'bg-[#117971] bg-opacity-40',
      bodyBgStyles: 'bg-[#117971] bg-opacity-30 transition ease-in-out duration-500',
    },
    {
      staticColor: '#E7453C',
      buttonBgStyles: 'bg-[#E7453C] bg-opacity-40',
      bodyBgStyles: 'bg-[#E7453C] bg-opacity-30 transition ease-in-out duration-500',
    },
  ];

  const loanAmountColourIndexFunc = (list: number[]) => {
    const resultObject: {
      [key: number]: { staticColor: string; buttonBgStyles: string; bodyBgStyles: string };
    } = {};

    list.forEach((item: number, index: number) => {
      resultObject[item] = colorStylesList[index];
    });

    return resultObject;
  };

  const loanAmountColourIndex = loanAmountColourIndexFunc(dynamicStakeAmountsList);
  // console.log({ loanAmountColourIndex });
  // dynamicStakeAmountsList;
  return (
    <Modal
      label="ApplicationSummary"
      isModalOpen={isSummaryModalOpen}
      closeModal={closeSummaryModal}
      width="462px"
      className="px-6 sm:px-[40px]"
      allowDismiss
    >
      <>
        <ModalCloseButton onClick={closeSummaryModal} />

        <h1 className="font-clash text-xl font-bold sm:text-3xl ">Summary of picks</h1>
        <p className="mb-6 text-sm text-white text-opacity-60">
          Select any band to view(or delete) its contents
        </p>

        <div className="mb-6 space-y-6">
          {formattedSelectionSummary?.map(band => {
            if (!band.length) {
              return;
            }

            const allLoadedBands = !!lotteryNumbers
              ? Object.values(lotteryNumbers?.data.bands)
              : [];
            const { band: currentBand, stake_amount: currentStakeAmount } = band[0] || {};

            const indexToDeleteFrom = allLoadedBands?.findIndex(b => b === currentBand);
            const isBandToDeleteFrom = String(currentStakeAmount) === String(amountGroup);

            const { staticColor, buttonBgStyles, bodyBgStyles } =
              loanAmountColourIndex[currentStakeAmount as number] || colorStylesList[0];

            return (
              <Disclosure key={band[0]?.lucky_number as number} defaultOpen={isBandToDeleteFrom}>
                {({ open }) => (
                  <div>
                    <Disclosure.Button
                      className={clsx(
                        'mb-2 flex w-full justify-between rounded-lg bg-white bg-opacity-10 p-4 py-2',
                        buttonBgStyles,
                      )}
                      onClick={() => {
                        setRenderedFormIndex(indexToDeleteFrom);
                        setSummaryModalStates(
                          replaceAtArrayIndex(
                            summaryModalStates,
                            indexToDeleteFrom,
                            true,
                          ) as boolean[],
                        );
                      }}
                    >
                      <span>₦{band[0]?.stake_amount} band</span>

                      <svg
                        width="45"
                        height="25"
                        viewBox="0 0 45 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={clsx(
                          open && 'rotate-180 transform',
                          'transition duration-200 ease-in-out',
                        )}
                      >
                        <g filter="url(#filter0_b_6370_70730)">
                          <path
                            d="M0 5C0 2.23858 2.23858 0 5 0H39.4851C42.2465 0 44.4851 2.23858 44.4851 5V20C44.4851 22.7614 42.2465 25 39.4851 25H5C2.23858 25 0 22.7614 0 20V5Z"
                            fill="white"
                            fillOpacity="0.1"
                          />
                        </g>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M24.9321 14.5237C23.6948 15.782 21.7145 15.824 20.4277 14.6495L20.2971 14.5237L17.1191 11.0908C16.7991 10.7654 16.7991 10.2377 17.1191 9.91231C17.4144 9.61191 17.8792 9.5888 18.2006 9.84299L18.2778 9.91231L21.4559 13.3452C22.0621 13.9618 23.0253 13.9942 23.6691 13.4425L23.7733 13.3452L26.9514 9.91231C27.2713 9.58687 27.7901 9.58687 28.1101 9.91231C28.4055 10.2127 28.4282 10.6854 28.1783 11.0123L28.1101 11.0908L24.9321 14.5237Z"
                          fill="white"
                        />
                        <defs>
                          <filter
                            id="filter0_b_6370_70730"
                            x="-134"
                            y="-134"
                            width="312.485"
                            height="293"
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                          >
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feGaussianBlur in="BackgroundImageFix" stdDeviation="67" />
                            <feComposite
                              in2="SourceAlpha"
                              operator="in"
                              result="effect1_backgroundBlur_6370_70730"
                            />
                            <feBlend
                              mode="normal"
                              in="SourceGraphic"
                              in2="effect1_backgroundBlur_6370_70730"
                              result="shape"
                            />
                          </filter>
                        </defs>
                      </svg>
                    </Disclosure.Button>

                    <Disclosure.Panel>
                      <ul
                        className={clsx(
                          'grid grid-cols-2 gap-2 sm:gap-4',
                          isBandToDeleteFrom && 'rounded-lg bg-white bg-opacity-10 p-4',
                          bodyBgStyles,
                        )}
                      >
                        {band?.map(({ lucky_number, stake_amount }) => {
                          return (
                            <li
                              key={lucky_number}
                              className={clsx(
                                'relative flex items-center justify-center gap-2 rounded-[7px] bg-[#F0FDFA] py-2 sm:gap-5',
                              )}
                            >
                              <button
                                style={{ backgroundColor: staticColor }}
                                className="absolute -top-[9.55px] -left-[9.55px] rounded-full bg-[#115E59] p-[6.55px]"
                                onClick={() => {
                                  handleManualNumberRemoval(lucky_number as string);
                                  setRenderedFormIndex(indexToDeleteFrom);
                                }}
                              >
                                <svg
                                  width="6"
                                  height="6"
                                  viewBox="0 0 6 6"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M5.45206 0.974956L5.02251 0.54541L2.99751 2.57041L0.972514 0.54541L0.542969 0.974956L2.56797 2.99996L0.542969 5.02496L0.972514 5.4545L2.99751 3.4295L5.02251 5.4545L5.45206 5.02496L3.42706 2.99996L5.45206 0.974956Z"
                                    fill="white"
                                  />
                                </svg>
                              </button>
                              <span className="whitespace-nowrap text-sm text-black sm:text-sm">
                                {lucky_number}
                              </span>
                              <span
                                style={{ backgroundColor: staticColor }}
                                className="rounded-[3px] bg-[#115E59] p-0.5 text-[10px] text-white sm:p-1 sm:text-sm md:px-2"
                              >
                                ₦{stake_amount}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </Disclosure.Panel>
                  </div>
                )}
              </Disclosure>
            );
          })}
        </div>

        <Button
          className="mx-auto mb-6 block w-full rounded-[10px] py-2 text-center text-xl font-semibold"
          size="smNoPadding"
          centered
          onClick={closeSummaryModal}
        >
          Okay
        </Button>
      </>
    </Modal>
  );
};
