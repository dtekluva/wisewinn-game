import * as React from 'react';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import clsx from 'clsx';

import { Button } from '@/components/elements';

interface NotificationModalProps {
  headingText: string;
  type: 'success' | 'error';
  isModalOpen: boolean;
  closeModal: () => void;
  label: string;
  width?: string;
  className?: string;
  allowDismiss?: boolean;
}

export const NotificationModal: React.FunctionComponent<NotificationModalProps> = ({
  headingText,
  type,
  isModalOpen,
  label = 'modal',
  width = '568px',
  className = '',
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
      <div className="w-full flex-shrink-0">
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
            background: 'white',
          }}
        >
          <div
            className={clsx(
              'overflow-auto rounded-[10px]',
              type === 'success' && 'bg-green-2 text-green-12',
              type === 'error' && 'bg-red-2 text-red-12',
              className,
            )}
          >
            <header className="p-8 pb-5 text-2xl font-bold">
              <h2 className="w-full max-w-[350px]">{headingText}</h2>
            </header>

            <div className="relative bg-white text-sm">
              <p className="w-full max-w-[361px] px-8 py-5 opacity-60">
                You can go ahead and close this alert by clicking the button below.
              </p>

              {type === 'success' && (
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 80 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute right-8 -top-1/2 hidden sm:block"
                >
                  <path
                    d="M40 7.5C33.5721 7.5 27.2886 9.40609 21.944 12.9772C16.5994 16.5484 12.4338 21.6242 9.97393 27.5628C7.51408 33.5014 6.87047 40.0361 8.12449 46.3404C9.37851 52.6448 12.4738 58.4358 17.019 62.981C21.5643 67.5262 27.3552 70.6215 33.6596 71.8755C39.964 73.1295 46.4986 72.4859 52.4372 70.0261C58.3758 67.5662 63.4516 63.4006 67.0228 58.056C70.5939 52.7114 72.5 46.4279 72.5 40C72.4835 31.3855 69.0541 23.1286 62.9627 17.0373C56.8714 10.9459 48.6145 7.51652 40 7.5V7.5ZM55.4688 34.3125L37.1563 51.8125C36.6828 52.2579 36.0562 52.504 35.4063 52.5C35.0886 52.5046 34.7731 52.4461 34.4781 52.3281C34.1831 52.2101 33.9144 52.0349 33.6875 51.8125L24.5313 43.0625C24.2773 42.8409 24.0708 42.5703 23.9241 42.2669C23.7774 41.9634 23.6935 41.6335 23.6776 41.2968C23.6617 40.9602 23.714 40.6238 23.8314 40.3079C23.9488 39.9919 24.1288 39.703 24.3607 39.4585C24.5927 39.2139 24.8716 39.0188 25.1809 38.8848C25.4901 38.7508 25.8233 38.6807 26.1603 38.6787C26.4973 38.6768 26.8313 38.743 27.142 38.8734C27.4528 39.0038 27.734 39.1957 27.9688 39.4375L35.4063 46.5312L52.0313 30.6875C52.5174 30.2634 53.1486 30.0436 53.793 30.0741C54.4373 30.1046 55.045 30.383 55.4889 30.8511C55.9328 31.3192 56.1785 31.9407 56.1748 32.5858C56.171 33.2309 55.9181 33.8496 55.4688 34.3125Z"
                    fill="#92CEAC"
                  />
                </svg>
              )}
              {type === 'error' && (
                <svg
                  fill="#F3AEAF"
                  height="80px"
                  width="80px"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 295.428 295.428"
                  xmlSpace="preserve"
                  className="absolute right-8 -top-1/2 hidden sm:block"
                >
                  <g>
                    <path
                      d="M147.714,0C66.264,0,0,66.264,0,147.714s66.264,147.714,147.714,147.714s147.714-66.264,147.714-147.714
 S229.164,0,147.714,0z M147.714,265.428C82.807,265.428,30,212.621,30,147.714S82.807,30,147.714,30
 s117.714,52.807,117.714,117.714S212.621,265.428,147.714,265.428z"
                    />
                    <path
                      d="M147.714,61.68c-8.284,0-15,6.716-15,15v79c0,8.284,6.716,15,15,15s15-6.716,15-15v-79
 C162.714,68.396,155.998,61.68,147.714,61.68z"
                    />
                    <circle cx="147.714" cy="217.68" r="15" />
                  </g>
                </svg>
              )}
            </div>

            <div className="p-8">
              <Button
                size="base"
                type="button"
                className={clsx(
                  'w-full text-center text-white',
                  type === 'success' && 'bg-green-9 hover:bg-green-10 focus:ring-green-6',
                  type === 'error' && 'bg-red-9 hover:bg-red-10 focus:ring-red-6',
                )}
                centered
                onClick={closeModal}
              >
                Okay
              </Button>
            </div>
          </div>
        </DialogContent>
      </div>
    </DialogOverlay>
  );
};
