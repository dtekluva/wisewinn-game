import { useRouter } from 'next/router';
import { Button, Modal } from '@/components/elements';

interface SucessfulModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  title: string;
  content: string;
  link: string;
}
export const SuccessModal: React.FunctionComponent<SucessfulModalProps> = ({
  isModalOpen,
  closeModal,
  title,
  content,
  link,
}) => {
  const router = useRouter();
  return (
    <Modal
      label="ApplicationSummary"
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      width="462px"
      className="relative overflow-visible bg-[#000410] px-6 sm:px-[40px]"
    >
      <div className="flex flex-col items-center justify-center">
        <div>
          <svg
            width="182"
            height="176"
            viewBox="0 0 182 176"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="91.998" cy="93.9996" r="71" fill="#01AE53" fillOpacity="0.2" />
            <circle
              cx="92.3819"
              cy="92.3816"
              r="56"
              transform="rotate(117.146 92.3819 92.3816)"
              fill="url(#paint0_linear_3756_21080)"
            />
            <circle cx="8" cy="54" r="8" fill="#1CA78B" />
            <circle cx="174.5" cy="66.5" r="3.5" fill="#D9D9D9" />
            <circle cx="11" cy="130" r="2" fill="#D9D9D9" />
            <circle cx="128.5" cy="17.5" r="2.5" fill="#F8A629" />
            <circle cx="180.5" cy="25.5" r="1.5" fill="#4C1961" />
            <circle cx="46.5" cy="172.5" r="3.5" fill="#01A7DB" />
            <circle cx="72" cy="3" r="3" fill="#4C1961" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M119.073 78.1759L86.7449 111.8C84.9449 113.672 82.0651 113.672 80.2651 111.8L64.1371 94.8799C62.3371 93.0081 62.3371 89.9842 64.1371 88.1118C65.9371 86.2399 68.8169 86.2399 70.6169 88.1118L83.5769 101.648L112.665 71.4078C114.465 69.5359 117.345 69.5359 119.145 71.4078C120.873 73.2797 120.873 76.3041 119.073 78.1759H119.073Z"
              fill="white"
            />
            <path
              d="M145.5 40L146.985 44.0145L151 45.5L146.985 46.9855L145.5 51L144.015 46.9855L140 45.5L144.015 44.0145L145.5 40Z"
              fill="#D9D9D9"
            />
            <path
              d="M37.5 138L38.9855 142.015L43 143.5L38.9855 144.985L37.5 149L36.0145 144.985L32 143.5L36.0145 142.015L37.5 138Z"
              fill="#D9D9D9"
            />
            <defs>
              <linearGradient
                id="paint0_linear_3756_21080"
                x1="92.3819"
                y1="36.3816"
                x2="92.3819"
                y2="148.382"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#1A9E7D" />
                <stop offset="1" stopColor="#60CE60" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="px-4 text-center">
          <h2 className="whitespace-nowrap py-4 text-2xl font-bold">{title}</h2>

          <p className="text-sm text-[#818181]">{content} </p>

          <div>
            <div className="mt-[16px] md:mt-[36px]">
              <Button onClick={() => router.push(link)} centered className="w-full">
                Okay
              </Button>
            </div>

            <p className="m mx-auto mb-10 mt-[20px] px-3 text-center text-[14px] text-[#818181] text-opacity-70 ">
              Need help? <span className="font-bold text-[#4C1961]">Contact Support</span>
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};
