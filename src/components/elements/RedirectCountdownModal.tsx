import { DialogContent, DialogOverlay } from "@reach/dialog";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";

import { useCountdown } from "@/hooks";


interface RedirectCountdownModalProps {
  isRedirectModalOpen: boolean;
  closeModal: () => void;
  redirectLink: string;
  restartCountdownModalTimeout: () => void;
}

const COUNTDOWN_DURATION_IN_MS = 5 * 1000;

export const RedirectCountdownModal: React.FunctionComponent<RedirectCountdownModalProps> = ({
  isRedirectModalOpen,
  closeModal,
  redirectLink,
  restartCountdownModalTimeout,
}) => {
  const targetTime = React.useRef(new Date().getTime() + COUNTDOWN_DURATION_IN_MS);
  // const [hasUserClosedModal, setHasUserClosedModal] = React.useState(false);

  const router = useRouter();

  const { strings: countdownStrings, numbers: countdownNumbers } = useCountdown(targetTime.current);
  const [_days, _hours, minutes, seconds] = countdownStrings;
  const [daysNumber, hoursNumber, minutesNumber, secondsNumber] = countdownNumbers;
  const countdownValues = [minutes, seconds];

  const hasCountdownEnded =
    daysNumber < 1 && hoursNumber < 1 && secondsNumber < 1 && minutesNumber < 1;

  React.useEffect(() => {
    if (hasCountdownEnded && isRedirectModalOpen) {
      router.push(redirectLink);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsNumber]);

  const handleCancelClick = () => {
    restartCountdownModalTimeout();
    closeModal();
  };

  return (
    <>
      <DialogOverlay
        isOpen={isRedirectModalOpen}
        onDismiss={() => null}
        style={{
          backgroundColor: 'hsla(0, 0%, 0%, 0.5)',
          zIndex: 200,
          backdropFilter: 'blur(8px)',
        }}
        allowPinchZoom={true}
      >
        <div className="w-full flex-shrink-0">
          <DialogContent
            aria-label="You will be redirected shortly"
            /**
             * Reach UI doesn't work very well with Styled JSX or Tailwind.
             * Override defaults with inline styles and style containing div instead.
             */
            style={{
              width: '92.5vw',
              height: '92.5vw',
              padding: '0',
              position: 'relative',
              zIndex: 4,
              maxWidth: 500,
              maxHeight: 500,
              background: 'transparent',
            }}
          >
            <div className="redirect-circle-outer h-full w-full rounded-full p-16 text-white">
              <div className="redirect-circle-inner flex h-full w-full items-center justify-center rounded-full p-10 text-center text-white">
                <div className="flex flex-col items-center justify-center">
                  <p className="mb-3 max-w-[80%] font-clash text-base font-semibold md:mb-6 md:text-2xl">
                    You will be redirected in
                  </p>

                  <div className="mb-3 grid w-max grid-cols-2 gap-2 md:mb-6">
                    {countdownValues.map((v, i) => {
                      return (
                        <p key={i} className="w-full transition-all duration-300 ease-in-out">
                          <span className="sr-only">: </span>
                          <span className="relative block rounded bg-black px-3.5 text-center font-mono text-2xl font-semibold text-white transition-all duration-300 ease-in-out md:py-3 md:text-4xl lg:text-[50px]">
                            {v}
                            <span
                              aria-hidden
                              className="absolute left-0 right-0 top-1/2 mx-auto h-[1px] w-[94%] bg-black"
                            />
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="5"
                              height="5"
                              fill="none"
                              viewBox="0 0 5 5"
                              className="absolute left-0 top-[calc(50%-2px)]"
                            >
                              <path fill="#fff" d="M4.014 2.5L.252 4.644.276.314 4.014 2.5z"></path>
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="5"
                              height="5"
                              fill="none"
                              viewBox="0 0 5 5"
                              className="absolute right-0 top-[calc(50%-2px)] rotate-180"
                            >
                              <path fill="#fff" d="M4.014 2.5L.252 4.644.276.314 4.014 2.5z"></path>
                            </svg>
                          </span>
                        </p>
                      );
                    })}
                  </div>

                  <Link href="/instant-cashout">
                    <a className="mb-2 rounded-[7px] bg-white px-3.5 py-2 text-xs text-black md:py-3.5 md:px-12 md:text-sm">
                      Start playing
                    </a>
                  </Link>

                  <button onClick={handleCancelClick} className="text-xs md:text-sm">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </DialogContent>
        </div>
      </DialogOverlay>

      <style jsx>{`
        .redirect-circle-outer {
          background: linear-gradient(
            191.66deg,
            rgba(255, 255, 255, 0.21) 13.94%,
            rgba(255, 255, 255, 0) 108.14%
          );
          opacity: 0.7;
        }
        .redirect-circle-inner {
          background: linear-gradient(
            191.66deg,
            rgba(255, 255, 255, 0.21) 13.94%,
            rgba(255, 255, 255, 0) 108.14%
          );
        }
      `}</style>
    </>
  );
};
