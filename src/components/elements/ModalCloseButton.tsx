import clsx from 'clsx';
import * as React from 'react';

interface ModalCloseButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export const ModalCloseButton: React.FunctionComponent<ModalCloseButtonProps> = ({
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'ml-auto mb-7 block rounded-[5px] transition duration-500 ease-in-out hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-30 focus:ring-offset-2 focus:ring-offset-white active:scale-[0.95]',
        className,
      )}
    >
      <>
        <svg
          width={34}
          height={34}
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          className="md:hidden"
        >
          <rect width={34} height={34} rx={5} fill="#FFE1E1" />
          <path
            d="m17 17 5.244 5.244m-10.486 0L17 17l-5.243 5.243Zm10.486-10.486L17 17l5.244-5.243ZM17 17l-5.242-5.243L17 17Z"
            stroke="red"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <svg
          width="51"
          height="33"
          viewBox="0 0 51 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="hidden md:block"
        >
          <rect width="51" height="33" rx="5" fill="#FFE1E1" />
          <path
            d="M27.1393 16.2349L31.3107 20.7067M22.9678 20.7067L27.1393 16.2349L22.9678 20.7067ZM31.3107 11.763L27.1385 16.2349L31.3107 11.763ZM27.1385 16.2349L22.9678 11.763L27.1385 16.2349Z"
            stroke="#FF0000"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </>
    </button>
  );
};
