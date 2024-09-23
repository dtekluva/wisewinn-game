import * as React from 'react';
import { useRouter } from 'next/router';

import { Modal, ModalCloseButton, PlayResponsiblyAlert } from '@/components/elements';
import { useSalaryForLifeStore } from '@/stores';

interface SalaryForLifeMultiplierModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

const multipliers = [
  {
    name: '2x',
    multiplier: 2,
    amount: '₦15,000',
  },
  {
    name: '4x',
    multiplier: 4,
    amount: '₦150,000',
  },
  {
    name: '6x',
    multiplier: 6,
    amount: '₦300,000',
  },
  {
    name: '8x',
    multiplier: 8,
    amount: '₦800,000',
  },
  {
    name: '9x',
    multiplier: 9,
    amount: '₦1,000,000',
  },

  {
    name: '10x',
    multiplier: 10,
    amount: '₦1,500,000',
  },
];
const SALARYFORLIFEROUTE = '/salary-for-life';

export const SalaryForLifeMultiplierModal: React.FunctionComponent<
  SalaryForLifeMultiplierModalProps
> = ({ isModalOpen, closeModal }) => {
  const router = useRouter();
  const setSalaryForLifeMultiplier = useSalaryForLifeStore(state => state.setMultiplier);

  return (
    <>
      <Modal
        label="Consent confirmation"
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        width="587px"
        className="border-[0.5px] border-[#00E2C6]	p-6 py-[30px] backdrop-blur-lg sm:p-[34px]"
      >
        <header className="flex flex-row items-center justify-between py-4 text-sm">
          <button
            onClick={() => router.push('/salary-for-life/how-to-play')}
            className=" inline-block rounded-[7px] bg-[#1C1E23] px-4 py-2 text-white "
          >
            How to play
          </button>

          <ModalCloseButton onClick={closeModal} className="!mb-0" />
        </header>

        <PlayResponsiblyAlert className="mb-4" />

        <div className="mb-8 text-sm md:text-base">
          <p className="leading-6">
            This unique product avails you the opportunity to qualify for a monthly salary of
            ₦30,000 for up to 20 years or a grand prize of
            <span className="font-semibold"> ₦10,000,000</span>
          </p>

          <p className="my-2 mt-3 leading-6">
            Stand a chance to win salary for life jackpot prize of
            <span className="font-semibold"> ₦10,000,000.00</span>
          </p>
        </div>

        <div>
          <div className="w-full rounded bg-main-gray-bg-darkNavy text-center transition duration-300 ease-in-out ">
            <p className="multipliers-text-shadow block overflow-x-auto p-2.5 px-4 text-3xl font-bold sm:text-[52px]">
              ₦10,000,000.00
            </p>
            <p className="block overflow-auto bg-[#16183180] p-1.5 px-1.5 text-xs font-semibold md:px-2.5 md:text-base">
              Play with: ₦100.00 or more
            </p>
          </div>
        </div>

        <p className="my-4 text-sm leading-6 text-white">
          Win more prizes and increase your winning amount with multiple stakes by selecting any of
          the cards displayed below.
        </p>

        <ul className="grid grid-cols-3 gap-2 sm:gap-4 md:grid-cols-3">
          {multipliers.map(({ name, multiplier, amount }) => {
            const handleMultiplierClick = () => {
              setSalaryForLifeMultiplier(multiplier);
              router.push(SALARYFORLIFEROUTE);
            };

            return (
              <li key={name}>
                <button
                  onClick={handleMultiplierClick}
                  className="w-full rounded bg-main-gray-bg-darkNavy transition duration-300 ease-in-out hover:scale-[1.09] hover:opacity-80 active:scale-[0.95]"
                >
                  <span className="multipliers-text-shadow block p-1.5 py-2.5 text-3xl font-bold sm:text-[52px] md:py-4">
                    {name}
                  </span>
                  <span className="block overflow-auto bg-[#16183180] p-1.5 px-1.5 text-[10px] font-semibold sm:text-sm md:px-2.5 md:text-sm">
                    Win {amount}
                    <span className="hidden sm:inline">.00</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </Modal>

      <style jsx>{`
        .jackpot-text-shadow {
          -webkit-text-stroke: 1px #00e2c6; /* width and color */

          text-shadow: 0px 4px 24px rgba(0, 226, 198, 0.5);
        }

        .multipliers-box-shadow {
          box-shadow: 10px 10px 113px -11px rgba(0, 226, 198, 0.75);
        }

        .multipliers-text-shadow {
          text-shadow: -4px -4px 0 #00e2c6, -4px -3px 0 #00e2c6, -4px -2px 0 #00e2c6,
            -4px -1px 0 #00e2c6, -4px 0px 0 #00e2c6, -4px 1px 0 #00e2c6, -4px 2px 0 #00e2c6,
            -4px 3px 0 #00e2c6, -4px 4px 0 #00e2c6, -3px -4px 0 #00e2c6, -3px -3px 0 #00e2c6,
            -3px -2px 0 #00e2c6, -3px -1px 0 #00e2c6, -3px 0px 0 #00e2c6, -3px 1px 0 #00e2c6,
            -3px 2px 0 #00e2c6, -3px 3px 0 #00e2c6, -3px 4px 0 #00e2c6, -2px -4px 0 #00e2c6,
            -2px -3px 0 #00e2c6, -2px -2px 0 #00e2c6, -2px -1px 0 #00e2c6, -2px 0px 0 #00e2c6,
            -2px 1px 0 #00e2c6, -2px 2px 0 #00e2c6, -2px 3px 0 #00e2c6, -2px 4px 0 #00e2c6,
            -1px -4px 0 #00e2c6, -1px -3px 0 #00e2c6, -1px -2px 0 #00e2c6, -1px -1px 0 #00e2c6,
            -1px 0px 0 #00e2c6, -1px 1px 0 #00e2c6, -1px 2px 0 #00e2c6, -1px 3px 0 #00e2c6,
            -1px 4px 0 #00e2c6, 0px -4px 0 #00e2c6, 0px -3px 0 #00e2c6, 0px -2px 0 #00e2c6,
            0px -1px 0 #00e2c6, 0px 0px 0 #00e2c6, 0px 1px 0 #00e2c6, 0px 2px 0 #00e2c6,
            0px 3px 0 #00e2c6, 0px 4px 0 #00e2c6, 1px -4px 0 #00e2c6, 1px -3px 0 #00e2c6,
            1px -2px 0 #00e2c6, 1px -1px 0 #00e2c6, 1px 0px 0 #00e2c6, 1px 1px 0 #00e2c6,
            1px 2px 0 #00e2c6, 1px 3px 0 #00e2c6, 1px 4px 0 #00e2c6, 2px -4px 0 #00e2c6,
            2px -3px 0 #00e2c6, 2px -2px 0 #00e2c6, 2px -1px 0 #00e2c6, 2px 0px 0 #00e2c6,
            2px 1px 0 #00e2c6, 2px 2px 0 #00e2c6, 2px 3px 0 #00e2c6, 2px 4px 0 #00e2c6,
            3px -4px 0 #00e2c6, 3px -3px 0 #00e2c6, 3px -2px 0 #00e2c6, 3px -1px 0 #00e2c6,
            3px 0px 0 #00e2c6, 3px 1px 0 #00e2c6, 3px 2px 0 #00e2c6, 3px 3px 0 #00e2c6,
            3px 4px 0 #00e2c6, 4px -4px 0 #00e2c6, 4px -3px 0 #00e2c6, 4px -2px 0 #00e2c6,
            4px -1px 0 #00e2c6, 4px 0px 0 #00e2c6, 4px 1px 0 #00e2c6, 4px 2px 0 #00e2c6,
            4px 3px 0 #00e2c6, 4px 4px 0 #00e2c6;
        }
      `}</style>
    </>
  );
};
