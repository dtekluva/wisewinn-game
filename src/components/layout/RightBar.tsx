import * as React from 'react';
import { LinkButton, Slider } from '../elements';
import CoinIcon from '../icons/CoinIcon';

interface RightBarProps {
  sample?: string;
}

export const RightBar: React.FunctionComponent<RightBarProps> = () => {

  return (
    <>
      <aside className="rightbar-shadow right_sidebar_bg hidden h-screen w-full max-w-[250px] shrink-0 overflow-y-auto bg-[#014526] px-4 pb-10 pt-[71px] lg:block 2xl:max-w-[414px]">
        <div className='w-full flex justify-end items-end'>
          <LinkButton href='/ai-fortune' className='' variant='greenry_light'>
            Glo AI fortune
          </LinkButton>
        </div>

        <div className='mt-[54px]'>
          <p className='text-[18px] font-bold '>Winning pool 🥳</p>

          <div className="w-full rounded-[16px] mt-4 bg-[#142B21] px-5 py-6">
            <div className='flex items-end justify-between'>
              <p className='font-medium text-white text-xs max-w-[198px]'>Nokia 105 Dual SIM 1200 mAh,
                Removable</p>
              <p className='font-medium text-[#01AE53] text-xs '>64% open</p>
            </div>

            <div className='rounded-[9px] bg-[#FFFFFF29] w-full mt-[13px] px-[11px] py-1'>
              <Slider defaultValue={[33]} max={100} step={1} />
            </div>
          </div>
        </div>

        <div className='mt-[54px]'>
          <div className='flex items-center gap-2'>
            <p className='text-[18px] font-bold '>Winners</p>
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.4" d="M21.25 25.625H8.75C5 25.625 2.5 23.75 2.5 19.375V10.625C2.5 6.25 5 4.375 8.75 4.375H21.25C25 4.375 27.5 6.25 27.5 10.625V19.375C27.5 23.75 25 25.625 21.25 25.625Z" fill="#01AE53" />
              <path d="M15 18.75C17.0711 18.75 18.75 17.0711 18.75 15C18.75 12.9289 17.0711 11.25 15 11.25C12.9289 11.25 11.25 12.9289 11.25 15C11.25 17.0711 12.9289 18.75 15 18.75Z" fill="white" />
              <path d="M6.875 19.0625C6.3625 19.0625 5.9375 18.6375 5.9375 18.125V11.875C5.9375 11.3625 6.3625 10.9375 6.875 10.9375C7.3875 10.9375 7.8125 11.3625 7.8125 11.875V18.125C7.8125 18.6375 7.3875 19.0625 6.875 19.0625Z" fill="white" />
              <path d="M23.125 19.0625C22.6125 19.0625 22.1875 18.6375 22.1875 18.125V11.875C22.1875 11.3625 22.6125 10.9375 23.125 10.9375C23.6375 10.9375 24.0625 11.3625 24.0625 11.875V18.125C24.0625 18.6375 23.6375 19.0625 23.125 19.0625Z" fill="white" />
            </svg>

          </div>

          <div className="w-full h-[600px] overflow-auto rounded-[16px] mt-4 bg-[#142B21] px-[27px] py-6 bg-gradient-to-t from-[#001B0F] to-[#008148]">
            <div className='flex justify-between gap-2'>
              <div className='w-[94px] pb-[10px] bg-[#014526] rounded-[8px] flex flex-col items-center'>
                <div className="bg-[url('/images/ai-fortune/diwmond_sceond.png')] -mt-5 w-[55px] h-[44px] bg-no-repeat bg-center">
                </div>
                <div>
                  <p className="font-semibold text-[10px]  text-white mt-[4px] ">
                    0810**910*****
                  </p>
                  <div className='flex items-center gap-[2px] justify-center mt-[4px] py-1 bg-[#50B651] rounded-[17.52px]'>
                    <CoinIcon />
                    <p className='text-[10px] font-bold'>124</p>
                  </div>
                </div>
              </div>

              <div className='w-[94px] pb-[10px] bg-[#014526] rounded-[8px] flex flex-col items-center'>
                <div className="bg-[url('/images/ai-fortune/first_crown.png')] -mt-5 w-[55px] h-[44px] bg-no-repeat bg-center">

                </div>
                <div>
                  <p className="font-semibold text-[10px]  text-white mt-[4px] ">
                    0810**910*****
                  </p>
                  <div className='flex items-center gap-[2px] justify-center mt-[4px] py-1 bg-[#50B651] rounded-[17.52px]'>
                    <CoinIcon />
                    <p className='text-[10px] font-bold'>100</p>
                  </div>
                </div>
              </div>


              <div className='w-[94px] pb-[10px] bg-[#014526] rounded-[8px] flex flex-col items-center'>
                <div className="bg-[url('/images/ai-fortune/badge_third.png')] -mt-5 w-[46px] h-[37px] bg-no-repeat bg-center">
                  {/* <CrownIconFirst /> */}
                </div>
                <div>
                  <p className="font-semibold text-[10px]  text-white mt-[4px] ">
                    0810**910*****
                  </p>
                  <div className='flex items-center gap-[2px] justify-center mt-[4px] py-1 bg-[#50B651] rounded-[17.52px]'>
                    <CoinIcon />
                    <p className='text-[10px] font-bold'>124</p>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex gap w-full mt-[19px] pb-2 border-b border-[#FFFFFF29]'>
              <div className='flex gap-2 w-full'>
                <p className='text-xs'>#</p>
                <p className='text-xs'>Users</p>
              </div>
              <div className='flex items-center justify-between w-full'>
                <p className='text-xs'>Time</p>
                <p className='text-xs'>Wager</p>
              </div>
            </div>

            <div className='flex gap w-full py-2 border-b border-[#FFFFFF29]'>
              <div className='flex gap-2 w-full'>
                <p className='text-xs w-5 h-5 bg-[#014526] rounded-full text-center'>4</p>
                <p className='text-xs'>0810**910*****</p>
              </div>
              <div className='flex items-center justify-between w-full'>
                <p className='text-xs font-medium'>5s ago</p>
                <p className='text-xs flex items-center gap-[4px]'>
                  <CoinIcon />
                  <p className='text-[10px] font-medium'>6</p>
                </p>
              </div>
            </div>
          </div>
        </div >

      </aside >

      <style jsx>{`
        .rightbar-shadow {
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.12);
        }

        .testimonial-shadow {
          box-shadow: 0px 4px 18px rgba(202, 202, 202, 0.24);
        }
        .btn-gradient {
          background: linear-gradient(90deg, #4c1961 0%, #ff000f 242.97%);
        }

        .shadow_winnings {
          box-shadow: 0px 8px 18px rgba(0, 14, 65, 0.2), inset 0px 8px 18px #000e41;
        }

        .primary-bg {
          background: linear-gradient(90deg, #4c1961 0%, #ff000f 242.97%);
        }
      `}</style>
    </>
  );
};
