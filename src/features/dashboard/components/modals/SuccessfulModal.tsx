/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import Image from 'next/image';
import { Modal, ModalCloseButton } from '@/components/elements';
import { addCommasToNumber } from '@/utils';

type DataProps = {
  date: string;
  game_play_id: string;
  game_type: string;
  lost: string;
  number_of_ticket: number;
  stake_amount: number;
  status: string;
  won: string;
};
interface SucessfulModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  data: DataProps[];
}
export const SuccessfulModal: React.FunctionComponent<SucessfulModalProps> = ({
  isModalOpen,
  closeModal,
  data: dataObject,
}) => {
  const data = dataObject?.[0];

  return (
    <>
      <Modal
        label="Game play ID Summary Modal"
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        width="462px"
        className="relative overflow-visible bg-[#000410] px-6 sm:px-[40px]"
      >
        <OverLayIcon
          transactionStatus={
            !data?.won && !data?.lost ? true : data?.won ? true : data?.lost ? false : true
          }
          className="absolute left-0 right-0 -top-24 z-20 mx-auto my-0 inline-block w-full text-center"
        />

        <div className="absolute -left-[0.5px] top-[160px] z-10 h-[30px] w-[15px] rounded-r-full border-[0.5px] border-[#00E2C6] border-l-main-gray-bg-darkish bg-main-gray-bg-darkish"></div>
        <div className="absolute -right-[0.5px] top-[160px] z-10 h-[30px] w-[15px] rounded-l-full border-[0.5px] border-[#00E2C6] border-r-main-gray-bg-darkish bg-main-gray-bg-darkish  backdrop-blur-lg"></div>

        <header className="mt-5 flex items-center justify-between gap-10">
          <ModalCloseButton
            onClick={() => {
              closeModal();
            }}
            className="relative z-40 mb-0"
          />
        </header>

        <h2 className="my-4 text-center text-2xl font-semibold text-white">
          {!data?.won && !data?.lost ? 'Pending' : data?.won ? 'Won' : data?.lost ? 'Lost' : null}
        </h2>

        <div className="absolute top-[172px] right-[0px] w-full border-t border-dashed border-[#263238]"></div>
        <div className="mt-20">
          <div className="mt-4 flex flex-row justify-between">
            <p className="text-sm text-[#A6A6A6]">Game status</p>
            <p className="text-base font-semibold capitalize text-white">{data?.status}</p>
          </div>

          {/* <div className="mt-4 flex flex-row justify-between">
            <p className="text-sm text-[#A6A6A6]">Game type</p>
            <p className="text-base font-semibold capitalize text-white">
              {data?.game_type.split('_').join(' ')}
            </p>
          </div> */}

          <div className="mt-4 flex flex-row justify-between">
            <p className="text-sm text-[#A6A6A6]">Game ID</p>
            <p className="text-base font-semibold text-white">{data?.game_play_id}</p>
          </div>

          <div className="mt-4 flex flex-row justify-between">
            <p className="text-sm text-[#A6A6A6]">Stake per pick</p>
            <p className="text-base font-semibold text-white">
              ₦{addCommasToNumber(data?.stake_amount)}{' '}
            </p>
          </div>

          <div className="mt-4 flex flex-row justify-between">
            <p className="text-sm text-[#A6A6A6]">Total tickets </p>
            <p className="text-base font-semibold text-white">{data?.number_of_ticket}</p>
          </div>

          <div className="mt-4 flex flex-row justify-between">
            <p className="text-sm text-[#A6A6A6]">Total stake</p>
            <p className="text-base font-semibold text-white">
              ₦{addCommasToNumber(data?.stake_amount * data?.number_of_ticket || 0)}
            </p>
          </div>
        </div>

        <div className="mt-4 border-t border-solid border-[#263238] pt-4">
          {/* <div className="mt-4 flex flex-row justify-between">
            <p className="text-sm text-[#A6A6A6]">Potential winning</p>
            <p className="text-base font-semibold text-white">₦32,400,000.00</p>
          </div> */}
          <button className="my-4 block flex hidden w-full flex-row flex-nowrap justify-center gap-2 whitespace-nowrap rounded-md rounded bg-[#fff]/20 py-4 px-8 text-sm text-white">
            <span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.8"
                  d="M17.7077 7.62506C15.7827 4.60006 12.966 2.8584 9.99935 2.8584C8.51602 2.8584 7.07435 3.29173 5.75768 4.10006C4.44102 4.91673 3.25768 6.1084 2.29102 7.62506C1.45768 8.9334 1.45768 11.0584 2.29102 12.3667C4.21602 15.4001 7.03268 17.1334 9.99935 17.1334C11.4827 17.1334 12.9243 16.7001 14.241 15.8917C15.5577 15.0751 16.741 13.8834 17.7077 12.3667C18.541 11.0667 18.541 8.9334 17.7077 7.62506ZM9.99935 13.3667C8.13268 13.3667 6.63268 11.8584 6.63268 10.0001C6.63268 8.14173 8.13268 6.6334 9.99935 6.6334C11.866 6.6334 13.366 8.14173 13.366 10.0001C13.366 11.8584 11.866 13.3667 9.99935 13.3667Z"
                  fill="white"
                />
                <path
                  d="M10 7.61621C8.69167 7.61621 7.625 8.68288 7.625 9.99954C7.625 11.3079 8.69167 12.3745 10 12.3745C11.3083 12.3745 12.3833 11.3079 12.3833 9.99954C12.3833 8.69121 11.3083 7.61621 10 7.61621Z"
                  fill="white"
                />
              </svg>
            </span>{' '}
            <span>View details</span>
          </button>

          <button className="my-4 block flex hidden w-full flex-row flex-nowrap justify-center gap-2 whitespace-nowrap rounded-md rounded bg-[#000E41] py-4 px-8 text-sm text-white">
            <span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.4 1.59976C5.07451 1.59976 4 2.67427 4 3.99976V15.1995C4 16.5252 5.07451 17.5995 6.4 17.5995H12.3139C10.6876 16.6197 9.60002 14.8366 9.60002 12.7995C9.60002 9.70672 12.1072 7.19965 15.1999 7.19965C15.756 7.19965 16.293 7.28067 16.8 7.43161V3.99961C16.8 2.67412 15.7254 1.59961 14.4 1.59961L6.4 1.59976ZM6.4 4.79971C6.4 4.35787 6.75811 3.99976 7.19995 3.99976H12C12.4418 3.99976 12.7999 4.35787 12.7999 4.79971C12.7999 5.24155 12.4418 5.59967 12 5.59967H7.19995C6.75811 5.59967 6.4 5.24155 6.4 4.79971ZM7.19995 8.79983C6.75811 8.79983 6.4 9.15794 6.4 9.59978C6.4 10.0416 6.75811 10.3997 7.19995 10.3997H8.8C9.24184 10.3997 9.59995 10.0416 9.59995 9.59978C9.59995 9.15794 9.24184 8.79983 8.8 8.79983H7.19995ZM6.4 7.19978C6.4 6.75794 6.75811 6.39983 7.19995 6.39983H10.3999C10.8417 6.39983 11.2 6.75794 11.2 7.19978C11.2 7.64162 10.8417 7.99974 10.3999 7.99974H7.19995C6.75811 7.99974 6.4 7.64162 6.4 7.19978Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.2004 8C12.5494 8 10.4004 10.149 10.4004 12.8C10.4004 15.451 12.5494 17.6 15.2004 17.6C17.8514 17.6 20.0004 15.451 20.0004 12.8C20.0004 10.149 17.8514 8 15.2004 8ZM17.0583 13.6736C17.3707 13.3611 17.3707 12.8546 17.0583 12.5422C16.7694 12.2533 16.3143 12.2316 16.0005 12.4771V11.2001C16.0005 10.7582 15.6422 10.4 15.2004 10.4C14.7586 10.4 14.4004 10.7582 14.4004 11.2001V12.4771C14.0865 12.2316 13.6314 12.2533 13.3426 12.5422C13.0301 12.8546 13.0301 13.3612 13.3426 13.6736L14.6348 14.9658C14.9471 15.2781 15.4537 15.2781 15.7661 14.9658L17.0583 13.6736Z"
                  fill="white"
                />
              </svg>
            </span>
            <span>Download receipt</span>
          </button>
        </div>

        <p className="my-8 text-center text-sm font-semibold text-white">Play more games</p>

        <div className="flex flex-row items-center justify-between">
          <Image
            src={'/images/salary-for-life-small.svg'}
            alt=""
            width="100"
            height="100"
            className="h-full !w-20"
          />

          <Image
            src={'/images/instant-cashout-small.svg'}
            alt=""
            width="100"
            height="100"
            className="h-full !w-20"
          />

          <Image
            src={'/images/wyse-cash-small.svg'}
            alt=""
            width="100"
            height="100"
            className="h-full !w-20"
          />
        </div>
      </Modal>
    </>
  );
};

interface OverProps {
  className: string;
  transactionStatus: boolean;
}

function OverLayIcon({ className, transactionStatus = true }: OverProps) {
  return (
    <>
      {transactionStatus ? (
        <svg
          className={className}
          xmlns="http://www.w3.org/2000/svg"
          width="182"
          height="176"
          fill="none"
          viewBox="0 0 182 176"
        >
          <circle cx="91.999" cy="94" r="71" fill="#01AE53" fillOpacity="0.2"></circle>
          <circle
            cx="92.382"
            cy="92.382"
            r="56"
            fill="url(#paint0_linear_2875_12684)"
            transform="rotate(117.146 92.382 92.382)"
          ></circle>
          <circle cx="8" cy="54" r="8" fill="#1CA78B"></circle>
          <circle cx="174.5" cy="66.5" r="3.5" fill="#D9D9D9"></circle>
          <circle cx="11" cy="130" r="2" fill="#D9D9D9"></circle>
          <circle cx="128.5" cy="17.5" r="2.5" fill="#F8A629"></circle>
          <circle cx="180.5" cy="25.5" r="1.5" fill="#4C1961"></circle>
          <circle cx="46.5" cy="172.5" r="3.5" fill="#01A7DB"></circle>
          <circle cx="72" cy="3" r="3" fill="#4C1961"></circle>
          <path
            fill="#fff"
            fillRule="evenodd"
            d="M119.072 78.176L86.744 111.8c-1.8 1.872-4.68 1.872-6.48 0L64.136 94.88c-1.8-1.872-1.8-4.896 0-6.768 1.8-1.872 4.68-1.872 6.48 0l12.96 13.536 29.088-30.24c1.8-1.872 4.68-1.872 6.48 0 1.728 1.872 1.728 4.896-.072 6.768z"
            clipRule="evenodd"
          ></path>
          <path
            fill="#D9D9D9"
            d="M145.5 40l1.485 4.014L151 45.5l-4.015 1.486L145.5 51l-1.485-4.014L140 45.5l4.015-1.486L145.5 40zM37.5 138l1.486 4.015L43 143.5l-4.014 1.485L37.5 149l-1.486-4.015L32 143.5l4.014-1.485L37.5 138z"
          ></path>
          <defs>
            <linearGradient
              id="paint0_linear_2875_12684"
              x1="92.382"
              x2="92.382"
              y1="36.382"
              y2="148.382"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#1A9E7D"></stop>
              <stop offset="1" stopColor="#60CE60"></stop>
            </linearGradient>
          </defs>
        </svg>
      ) : (
        <svg
          className={className}
          width="182"
          height="176"
          viewBox="0 0 150 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="74.618" cy="76.6098" r="70.6404" fill="#9E1A1A" fillOpacity="0.4" />
          <circle
            cx="75"
            cy="75.0002"
            r="55.7164"
            transform="rotate(117.146 75 75.0002)"
            fill="url(#paint0_linear_3236_18435)"
          />
          <path
            d="M79.722 75.559L92.4124 62.8981C92.9681 62.3424 93.2804 61.5886 93.2804 60.8027C93.2804 60.0168 92.9681 59.263 92.4124 58.7073C91.8567 58.1516 91.1029 57.8394 90.317 57.8394C89.5311 57.8394 88.7774 58.1516 88.2216 58.7073L75.5607 71.3978L62.8997 58.7073C62.344 58.1516 61.5902 57.8394 60.8043 57.8394C60.0184 57.8394 59.2647 58.1516 58.7089 58.7073C58.1532 59.263 57.841 60.0168 57.841 60.8027C57.841 61.5886 58.1532 62.3424 58.7089 62.8981L71.3994 75.559L58.7089 88.22C58.4323 88.4944 58.2127 88.8208 58.0629 89.1804C57.9131 89.54 57.8359 89.9258 57.8359 90.3154C57.8359 90.705 57.9131 91.0907 58.0629 91.4504C58.2127 91.81 58.4323 92.1364 58.7089 92.4108C58.9833 92.6874 59.3097 92.907 59.6693 93.0568C60.029 93.2066 60.4147 93.2838 60.8043 93.2838C61.1939 93.2838 61.5797 93.2066 61.9393 93.0568C62.2989 92.907 62.6254 92.6874 62.8997 92.4108L75.5607 79.7203L88.2216 92.4108C88.496 92.6874 88.8224 92.907 89.182 93.0568C89.5417 93.2066 89.9274 93.2838 90.317 93.2838C90.7066 93.2838 91.0924 93.2066 91.452 93.0568C91.8116 92.907 92.1381 92.6874 92.4124 92.4108C92.689 92.1364 92.9086 91.81 93.0584 91.4504C93.2083 91.0907 93.2854 90.705 93.2854 90.3154C93.2854 89.9258 93.2083 89.54 93.0584 89.1804C92.9086 88.8208 92.689 88.4944 92.4124 88.22L79.722 75.559Z"
            fill="#FDFDFD"
          />
          <defs>
            <linearGradient
              id="paint0_linear_3236_18435"
              x1="75"
              y1="19.2838"
              x2="75"
              y2="130.717"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FC0000" />
              <stop offset="1" stopColor="#CE1A1A" />
            </linearGradient>
          </defs>
        </svg>
      )}
    </>
  );
}
