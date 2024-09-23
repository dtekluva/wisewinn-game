import * as React from "react";

import { Modal, ModalCloseButton } from "@/components/elements";
import { useJackpotData } from "@/features/dashboard";
import { useModalControl } from "@/hooks";
import {
  addCommasToNumber,
  convertKebabAndSnakeToTitleCase,
  convertToTitleCase
} from "@/utils";


const jackpotDetails = [
  { title: 'Super Jackpot', detail: 'Winner emerges everyday' },
  { title: 'Mega Jackpot', detail: 'Winner emerges every week' },
  { title: 'Crown jumbo  Jackpot', detail: 'Winner emerges every month' },
];

export const HeaderJackPotAmounts: React.FunctionComponent = () => {
  const { isModalOpen, closeModal, openModal } = useModalControl();

  const { data: jackpotAmounts } = useJackpotData();

  return (
    <>
      <Modal
        label="Consent confirmation"
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        width="453px"
        className="border-[0.5px] border-[#00E2C6] p-9 pb-[73px] text-center"
      >
        <header className="mb-4 gap-10 lg:gap-16">
          <h2 className="inline text-center text-[28px] font-bold">Jackpots</h2>

          <ModalCloseButton
            onClick={closeModal}
            className="absolute right-[30px] top-[35px] inline"
          />
        </header>

        <p className="mb-6 text-sm">
          By playing a game on Get Wyse Get Rewarded with as low as ₦100 or more, you stand chance
          to win any of our mouth watering jackpots displayed below :
        </p>

        <dl className="mx-auto space-y-5 text-sm">
          {jackpotDetails.map(({ title, detail }) => {
            return (
              <div key={title}>
                <dt className="mb-2 text-[10px]">{detail}</dt>
                <dd className="jackpot-text-shadow mx-auto max-w-[286px] rounded-2xl bg-main-gray-bg-dark py-5 font-serif text-xl font-bold italic tracking-tighter text-[#F676EF]">
                  {title}
                </dd>
              </div>
            );
          })}
        </dl>
      </Modal>

      <ul className="flex w-full max-w-6xl gap-4 overflow-x-auto text-center">
        {jackpotAmounts?.map(({ jackpot_type, threshold, percentage }) => {
          return (
            <li key={jackpot_type} className="flex-grow">
              <button
                onClick={openModal}
                className="card-bg relative w-full overflow-hidden rounded-md px-3 py-1.5 transition duration-500 ease-in-out hover:scale-[1.02] active:scale-[0.98] md:py-3 xl:px-4 2xl:px-8"
              >
                <span className="jackpot-text-shadow block whitespace-nowrap font-serif text-[10px] font-bold italic text-[#F676EF] sm:text-sm">
                  {convertKebabAndSnakeToTitleCase(convertToTitleCase(jackpot_type))}{' '}
                </span>
                <span className="jackpot-text-shadow text-sm font-bold sm:text-base xl:text-2xl">
                  ₦{addCommasToNumber(threshold)}
                </span>

                <div className="absolute bottom-0 left-0 right-0 mx-auto h-0.5 w-4/5 overflow-hidden rounded bg-white bg-opacity-20 xl:w-full">
                  <div
                    className="h-0.5 rounded bg-white"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      <style jsx>{`
        .card-bg {
          background-image: radial-gradient(
            59.67% 59.67% at 53.97% 40.33%,
            #4c1961 0%,
            #270336 100%
          );
        }
        .jackpot-text-shadow {
          {/* -webkit-text-stroke: 1px #f26de8; /* width and color */ */}

          text-shadow: 0px 4px 24px rgba(246, 118, 239, 0.5);
        }
      `}</style>
    </>
  );
};
