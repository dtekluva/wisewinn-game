import * as React from 'react';
import { format } from 'date-fns';
import { useActiveGames } from '@/features/dashboard';

// Marquee inspired by: https://ryanmulligan.dev/blog/css-marquee/
export const NumbersSlide: React.FunctionComponent = () => {
  const { data: activeGames } = useActiveGames();

  return (
    <>
      <div className="marquee-container z-0 mb-5 flex gap-4 overflow-hidden bg-main-gray-bg-dark py-4 pb-7 md:mb-8">
        <ul className="marquee flex gap-4">
          {activeGames?.[1]?.lotto?.map(({ ticket, date }, index) => {
            return (
              <li className="slide" key={index}>
                <div className="flex items-center gap-4">
                  <span className="block h-[5px] w-[5px] rounded-full bg-white"></span>

                  <div className="slide relative">
                    <ul className="slide mb-1 flex items-center gap-2.5">
                      {ticket.length > 0 &&
                        ticket.map((number: string, index) => {
                          return (
                            <li
                              key={index}
                              className="flex h-6 w-6 items-center justify-center rounded-full border border-[#626262] text-[9px]"
                            >
                              {number}
                            </li>
                          );
                        })}
                    </ul>

                    <span className="absolute right-0 text-[10px]">
                      {format(new Date(date), 'p')}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
          {activeGames?.[0]?.whyse_cahs?.map(({ game_play_id, date }, index) => {
            return (
              <li className="slide" key={index}>
                <div className="flex items-center gap-4">
                  <span className="block h-[5px] w-[5px] rounded-full bg-white"></span>
                  <div className="slide relative">
                    <span className="flex items-center justify-center whitespace-nowrap rounded border border-[#626262] px-4 py-1 text-[9px]">
                      {game_play_id}
                    </span>
                    <span className="absolute right-0 text-[10px]">
                      {format(new Date(date), 'p')}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <ul className="marquee flex gap-4">
          {activeGames?.[1]?.lotto?.map(({ ticket, date }, index) => {
            return (
              <li className="slide" key={index}>
                <div className="flex items-center gap-4">
                  <span className="block h-[5px] w-[5px] rounded-full bg-white"></span>

                  <div className="slide relative">
                    <ul className="slide mb-1 flex items-center gap-2.5">
                      {ticket.length > 0 &&
                        ticket.map((number: string, index) => {
                          return (
                            <li
                              key={index}
                              className="flex h-6 w-6 items-center justify-center rounded-full border border-[#626262] text-[9px]"
                            >
                              {number}
                            </li>
                          );
                        })}
                    </ul>

                    <span className="absolute right-0 text-[10px]">
                      {format(new Date(date), 'p')}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
          {activeGames?.[0]?.whyse_cahs?.map(({ game_play_id, date }, index) => {
            return (
              <li className="slide" key={index}>
                <div className="flex items-center gap-4">
                  <span className="block h-[5px] w-[5px] rounded-full bg-white"></span>
                  <div className="slide relative">
                    <span className="flex items-center justify-center whitespace-nowrap rounded border border-[#626262] px-4 py-1 text-[9px]">
                      {game_play_id}
                    </span>
                    <span className="absolute right-0 text-[10px]">
                      {format(new Date(date), 'p')}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <style jsx>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-100% - (1rem)));
          }
        }

        .marquee {
          animation: scroll 44s linear infinite;
        }

        .marquee-container:hover .marquee {
          animation-play-state: paused;
        }
      `}</style>
    </>
  );
};
