import * as React from 'react';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import Image from 'next/image';
import { Input } from '../form';
// import { Button } from './Button';
import { LinkButton } from './LinkButton';

interface AltSubscriptionModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  label?: string;
  width?: string;
  className?: string;
  allowDismiss?: boolean;
}

export const SubscriptionModalAlt: React.FunctionComponent<AltSubscriptionModalProps> = ({
  isModalOpen,
  label = 'modal',
  width = '500px',
  closeModal,
  allowDismiss = false,
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
          <div className="modal__gradient h-16 rounded-tl-[12px] rounded-tr-[12px] overflow-hidden">
            <div
              aria-label="button"
              className="mr-6 flex h-full shrink-0 items-center justify-end cursor-pointer"
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

          <div className=" px-8 pb-12 space-y-5">
            <div className="-mt-12 flex items-center justify-center">
              <Image
                src={'/images/ask-ai-by-glo/subscription_main.svg'}
                width={250}
                height={250}
                alt="subscription"
              />
            </div>
            <h2 className="-mt-6 pb-4 text-center text-2xl font-[700] font-sans max-w-[30ch] ">Learn, Earn, and Win with Nigeria&amp;s First SMS to Ai ! <span>🤖</span></h2>

            <p className="text-center">
              Subscribe and ask questions on topics you require answers to.
            </p>


            <Input type="text" placeholder="Enter your phone number" className='shadow-md border border-black/80' />

            <LinkButton className='w-full flex !justify-center items-center !py-2.5 text-sm text-center' variant='greenery' href="./library-pdf">Subscribe@#100</LinkButton>
 
            <footer className='flex bg-[#FFECAB] p-4 rounded-md'>
              <p className='text-[0.75rem]'>
                On Tapping on the subscribe button you will be send steps on how to complete the process
              </p>
            </footer>
          </div>
        </DialogContent>
      </div>
    </DialogOverlay>
  );
};
