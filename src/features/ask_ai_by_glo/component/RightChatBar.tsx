import { LinkButton } from '@/components/elements';
import { addCommasToNumber } from '@/utils';
import Image from 'next/image';
// import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useGetAiBidItems } from '../api';

const RightChatBar = () => {
  const router = useRouter();

  const [winners] = useState([
    {
      phone_number: '08055033939',
      questions_asked: 8,
      date_created: '29-04-2022 20:44:02',
      luckynumber: '2',
      amount: '50000',
    },
    {
      phone_number: '08049594033',
      questions_asked: 6,
      date_created: '29-04-2022 20:44:02',
      luckynumber: '23',
      amount: '20000',
    },
    {
      phone_number: '08061045981',
      questions_asked: 3,
      date_created: '29-04-2022 20:44:02',
      luckynumber: '18',
      amount: '25000',
    },
    {
      phone_number: '08062133973',
      questions_asked: 7,
      date_created: '29-04-2022 20:44:02',
      luckynumber: '7',
      amount: '50000',
    },
    {
      phone_number: '08062043929',
      questions_asked: 15,
      date_created: '29-04-2022 20:44:02',
      luckynumber: '53',
      amount: '20000',
    },
    {
      phone_number: '08063036376',
      questions_asked: 4,
      date_created: '29-04-2022 20:44:02',
      luckynumber: '5',
      amount: '20000',
    },
  ]);

  const { data: items } = useGetAiBidItems();

  const bidItem = items?.[0];

  return (
    <>
      <aside className="rightbar-shadow relative hidden h-full w-full max-w-[250px] shrink-0 overflow-y-auto bg-[#002414] px-4 pb-10 pt-[71px] lg:block 2xl:max-w-[400px]">
        <div className="flex justify-end">
          <LinkButton
            onClick={() => router.push('/ask-ai')}
            variant="greenry_light"
            size="xs"
            className="w-[65%] text-center font-semibold"
          >
            Glo AI Fortune
          </LinkButton>
        </div>

        <div className="mt-12 h-full">
          <div>
            <h2 className="text-xl font-[700] text-white">Winning pool 🥳</h2>

            <div className="relative mt-4 rounded-[10px] border-[.5rem] border-[#fff]/[.01] bg-[#142B21] p-4">
              <div className="absolute -top-[4rem] right-0">
                <Image
                  src={'/images/ask-ai-by-glo/ai-face.svg'}
                  alt={'ai face'}
                  width={60}
                  height={60}
                />
              </div>

              <div className="flex items-center justify-between ">
                <p className="text-sm font-[400] text-white">{bidItem?.item_name}</p>

                <p className="text-sm text-[#01AE53]">{bidItem?.percentage || 62}% open</p>
              </div>
              <div className="bg-[#d9d9d921]">
                <div
                  className="my-2 h-[4px] rounded bg-[#fff]"
                  style={{
                    width: `${bidItem?.percentage || 62}%`,
                  }}
                />
              </div>
            </div>
          </div>
          <div className="my-6 flex items-center justify-start gap-2">
            <h2 className="text-xl font-[700] text-white">Winners</h2>
            <div>
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.4"
                  d="M21.25 25.625H8.75C5 25.625 2.5 23.75 2.5 19.375V10.625C2.5 6.25 5 4.375 8.75 4.375H21.25C25 4.375 27.5 6.25 27.5 10.625V19.375C27.5 23.75 25 25.625 21.25 25.625Z"
                  fill="#01AE53"
                />
                <path
                  d="M15 18.75C17.0711 18.75 18.75 17.0711 18.75 15C18.75 12.9289 17.0711 11.25 15 11.25C12.9289 11.25 11.25 12.9289 11.25 15C11.25 17.0711 12.9289 18.75 15 18.75Z"
                  fill="white"
                />
                <path
                  d="M6.875 19.0625C6.3625 19.0625 5.9375 18.6375 5.9375 18.125V11.875C5.9375 11.3625 6.3625 10.9375 6.875 10.9375C7.3875 10.9375 7.8125 11.3625 7.8125 11.875V18.125C7.8125 18.6375 7.3875 19.0625 6.875 19.0625Z"
                  fill="white"
                />
                <path
                  d="M23.125 19.0625C22.6125 19.0625 22.1875 18.6375 22.1875 18.125V11.875C22.1875 11.3625 22.6125 10.9375 23.125 10.9375C23.6375 10.9375 24.0625 11.3625 24.0625 11.875V18.125C24.0625 18.6375 23.6375 19.0625 23.125 19.0625Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>

          <div className="mb-6 h-[35rem] overflow-y-auto rounded-[12px] bg-[#142B21] p-4">
            <h3 className="text-base font-[600]">Winners 🎉</h3>

            <p className="mt-4 text-sm text-white">
              Top winners in the AI by Glo Raffle Draw! 🎁 Stay tuned for future draws and your
              chance to win with AI by Glo!
            </p>

            <div>
              {winners.map((message, index) => {
                return (
                  <div className="mt-4 rounded-[8px] bg-white/[.08] py-4 px-4" key={index}>
                    <div className="first__box flex items-center justify-between">
                      <div className="flex items-center justify-between gap-4">
                        <div className="box_ball relative h-[40px] w-[40px] rounded-[50%]">
                          <span className="absolute left-[81%] top-[20%]">
                            <span className="absolute right-[50%] flex h-[25px] w-[25px] items-center justify-center rounded-full bg-white  font-[800] text-black">
                              <span className="inline-block text-sm">2</span>
                            </span>
                          </span>
                        </div>

                        <div className="space-y-2">
                          <p className="text-xs font-[600]">
                            {message.phone_number.replace(/(\d{4})\d{2}(\d{3})\d{2}/, '$1**$2**')}
                          </p>
                          <p className="text-xs font-[800]">
                            ₦{addCommasToNumber(Number(message.amount))}.00
                          </p>
                        </div>
                      </div>

                      <div className="second__box space-y-2 text-right">
                        <p className="text-[10px] font-[500]">
                          {message.questions_asked} Questions asked
                        </p>
                        <p className="text-xs">{message.date_created}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <p className="absolute bottom-4 left-[50%] translate-x-[-50%] text-center text-xs text-white">
          Powered by Open AI
        </p>
      </aside>

      <style jsx>{`
        .rightbar-shadow {
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.12);
        }
      `}</style>
    </>
  );
};

export default RightChatBar;
