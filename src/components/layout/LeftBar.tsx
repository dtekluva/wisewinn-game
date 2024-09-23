import * as React from "react";
import { useForm } from "react-hook-form";

import { NotificationModal } from "@/components/elements";


import { SuccessfulModal } from "@/features/dashboard";
import { useModalControl, useNotificationModalControl } from "@/hooks";

import GloIcon from "../icons/GloIcon";
import MainRobotIcon from "../icons/MainRobot";
import DiamondIcon from "../icons/Diamond";
import CrownIcon from "../icons/Crown";
import QuestionIcon from "../icons/QuestionIcon";


interface LeftBarProps {
  sample?: string;
}



export const LeftBar: React.FunctionComponent<LeftBarProps> = () => {
  type MessageFormValues = {
    game_play_id: string;
  };

  const {
    message: errorModalMessage,
    isModalOpen: isErrorModalOpen,
    closeModal: closeErrorModal,
    openModal: _openErrorModal,
  } = useNotificationModalControl();

  const {
    isModalOpen: isGameSlipModalOpen,
    closeModal: closeGameSlipModalModal,
    openModal: _openGameSlipModalModal,
  } = useModalControl();

  const {
    formState: { },
  } = useForm<MessageFormValues>({
    mode: 'onTouched',
  });

  const [lotteryDetails] = React.useState([]);


  return (
    <>
      <NotificationModal
        headingText={errorModalMessage}
        label={errorModalMessage}
        type="error"
        allowDismiss
        closeModal={closeErrorModal}
        isModalOpen={isErrorModalOpen}
      />

      <SuccessfulModal
        data={lotteryDetails}
        isModalOpen={isGameSlipModalOpen}
        closeModal={closeGameSlipModalModal}
      />

      <div className="leftbar-shadow ask_sidebar_bg_ai__bg hidden h-screen w-full max-w-[414px] shrink-0 overflow-y-auto bg-[#014526] py-[59px] md:flex md:flex-col md:gap-16 2xl:max-w-[414px] px-9">
        <div>
          <div className="flex items-center gap-2 font-bold leading-[31.25px] text-2xl">
            <GloIcon />
            <p className="">Glo AI fortune</p>
          </div>
          <div className="mt-[27px] w-full bg-[#FFFFFF66] h-[1px]"></div>
        </div>

        <div className=" w-full rounded-[16px] bg-[#142B21] px-5 py-[31px]">
          <div className="w-full flex flex-col justify-center items-center">
            <MainRobotIcon />
            <p className="font-semibold text-sm  text-white mt-[14px] ">
              0810**910*****
            </p>
          </div>

          <div className="w-full flex items-center justify-center gap-[21px] mt-4">
            <div>
              <div className="flex items-center gap-[4px]">
                <DiamondIcon />
                <p className="font-bold text-xl text-white">24</p>
              </div>
              <p className="text-[10px] text-white text-center mt-[5px]">Rewards</p>
            </div>

            <svg width="2" height="28" viewBox="0 0 2 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="1.23218" y1="28" x2="1.23218" stroke="white" strokeOpacity="0.24" />
            </svg>

            <div>
              <div className="flex items-center gap-[4px]">
                <CrownIcon />
                <p className="font-bold text-xl text-white">24</p>
              </div>
              <p className="text-[10px] text-white text-center mt-[5px]">Win Games</p>
            </div>

            <svg width="2" height="28" viewBox="0 0 2 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="1.23218" y1="28" x2="1.23218" stroke="white" strokeOpacity="0.24" />
            </svg>

            <div>
              <div className="flex items-center gap-[4px]">
                <QuestionIcon />
                <p className="font-bold text-xl text-white">24</p>
              </div>
              <p className="text-[10px] text-white text-center mt-[5px]">Questions</p>
            </div>

          </div>

          <div className="mt-[27px]">
            <p className="font-semibold text-sm  text-white mt-[14px] ">
              Claim History
            </p>
            <div className="mt-3 w-full bg-[#FFFFFF66] h-[1px]"></div>
          </div>

          <div className="mt-[18px] space-y-[6px]">
            <div className="w-full h-[65px] bg-[#171717] rounded-[8px] gap-2 p-4 flex items-center">
              <div className="bg-[url('/images/ai-fortune/img.png')] w-[41px] h-[32px]"></div>
              <div>
                <p className="font-semibold text-xs text-white">₦10,800,000.00</p>
                <p className="font-semibold text-[10px] mt-1 text-white">29-04-2022 20:44:02</p>
              </div>
            </div>
            <div className="w-full h-[65px] bg-[#171717] rounded-[8px] gap-2 p-4 flex items-center">
              <div className="bg-[url('/images/ai-fortune/img1.png')] w-[41px] h-[32px]"></div>
              <div>
                <p className="font-semibold text-xs text-white">₦10,800,000.00</p>
                <p className="font-semibold text-[10px] mt-1 text-white">29-04-2022 20:44:02</p>
              </div>
            </div>
            <div className="w-full h-[65px] bg-[#171717] rounded-[8px] gap-2 p-4 flex items-center">
              <div className="bg-[url('/images/ai-fortune/img.png')] w-[41px] h-[32px]"></div>
              <div>
                <p className="font-semibold text-xs text-white">₦10,800,000.00</p>
                <p className="font-semibold text-[10px] mt-1 text-white">29-04-2022 20:44:02</p>
              </div>
            </div>
            <div className="w-full h-[65px] bg-[#171717] rounded-[8px] gap-2 p-4 flex items-center">
              <div className="bg-[url('/images/ai-fortune/img.png')] w-[41px] h-[32px]"></div>
              <div>
                <p className="font-semibold text-xs text-white">₦10,800,000.00</p>
                <p className="font-semibold text-[10px] mt-1 text-white">29-04-2022 20:44:02</p>
              </div>
            </div>
            <div className="w-full h-[65px] bg-[#171717] rounded-[8px] gap-2 p-4 flex items-center">
              <div className="bg-[url('/images/ai-fortune/img1.png')] w-[41px] h-[32px]"></div>
              <div>
                <p className="font-semibold text-xs text-white">₦10,800,000.00</p>
                <p className="font-semibold text-[10px] mt-1 text-white">29-04-2022 20:44:02</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .leftbar-shadow {
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.12);
        }
      `}</style>
    </>
  );
};
