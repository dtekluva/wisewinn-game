import * as React from 'react';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import Image from 'next/image';

interface SubscriptionModalProps {
  headingText: string;
  type: 'success' | 'error';
  isModalOpen: boolean;
  closeModal: () => void;
  label: string;
  width?: string;
  className?: string;
  allowDismiss?: boolean;
  phoneNumber: string;
}

export const SubscriptionModal: React.FunctionComponent<SubscriptionModalProps> = ({
  //   headingText,
  //   type,
  //   className = '',
  isModalOpen,
  label = 'modal',
  width = '500px',
  closeModal,
  allowDismiss = false,
  phoneNumber,
}) => {
  return (
    <DialogOverlay
      isOpen={isModalOpen}
      onDismiss={allowDismiss ? closeModal : () => null}
      style={{ backgroundColor: 'hsla(0, 0%, 0%, 0.38)', zIndex: 1000 }}
      allowPinchZoom={true}
    >
      <div className="w-full flex-shrink-0 bg-transparent">
        <DialogContent
          aria-label={label}
          /**
           * Reach UI doesn't work very well with Styled JSX or Tailwind.
           * Override defaults inline and style containing div instead.
           */
          style={{
            width: '90%',
            padding: '0',
            position: 'relative',
            zIndex: 4,
            maxWidth: width,
          }}
          className="modal__border"
        >
          <div className="modal__gradient h-16 rounded-tl-[12px] rounded-tr-[12px]">
            <div
              aria-label="button"
              className="mr-6 flex h-full shrink-0 items-center justify-end"
              onClick={closeModal}
            >
              <svg
                width="29"
                height="29"
                viewBox="0 0 29 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="14.0625" cy="14.8545" r="14" fill="white" fillOpacity="0.2" />
                <line
                  x1="11.5596"
                  y1="11.29"
                  x2="18.3076"
                  y2="18.038"
                  stroke="white"
                  strokeWidth="1.5"
                />
                <line
                  y1="-0.75"
                  x2="9.54311"
                  y2="-0.75"
                  transform="matrix(-0.707107 0.707107 0.707107 0.707107 18.2598 11.8203)"
                  stroke="white"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>

          <div className=" px-6 pb-6">
            <div className="-mt-12 flex items-center justify-center">
              <Image
                src={'/images/ask-ai-by-glo/subscription_main.svg'}
                width={250}
                height={250}
                alt="subscription"
              />
            </div>
            <h2 className="-mt-6 pb-4 text-center text-xl font-[600] ">Subscribe to ask and win</h2>

            <p className="text-center text-sm">
              An SMS has been sent to your mobile number{' '}
              <span className="font-[600]">{phoneNumber}</span>. Kindly follow the steps provided to
              subscribe so you can start asking questions and winning
            </p>
          </div>
        </DialogContent>
      </div>
    </DialogOverlay>
  );
};
