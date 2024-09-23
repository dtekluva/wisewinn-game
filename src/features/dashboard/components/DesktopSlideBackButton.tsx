import clsx from 'clsx';
import * as React from 'react';

interface DesktopSlideBackButtonProps {
  setRenderedFormIndex: (value: React.SetStateAction<number>) => void;
  setSummaryModalStates: (value: React.SetStateAction<boolean[]>) => void;
  renderedFormIndex: number;
  numberOfGroups: number;
  direction: 'forwards' | 'backwards';
}

export const DesktopSlideBackButton: React.FunctionComponent<DesktopSlideBackButtonProps> = ({
  setRenderedFormIndex,
  setSummaryModalStates,
  numberOfGroups,
  renderedFormIndex,
  direction,
}) => {
  const isDirectionForwards = direction === 'forwards';

  const isHidden = isDirectionForwards
    ? renderedFormIndex + 1 === numberOfGroups
    : renderedFormIndex === 0;

  return (
    <button
      onClick={() => {
        setSummaryModalStates(new Array(numberOfGroups).fill(false));

        if (isDirectionForwards) {
          setRenderedFormIndex(current => current + 1);
        } else {
          setRenderedFormIndex(current => current - 1);
        }
      }}
      className={clsx(
        'absolute top-1/2 hidden -translate-y-1/2 space-y-4 bg-wise-purple-dark px-1 pb-7 pt-20 text-white md:block',
        isHidden && 'hidden md:hidden',
        isDirectionForwards && 'right-px rounded-l-lg',
        !isDirectionForwards && 'left-px rounded-r-lg',
      )}
    >
      <svg
        width="54"
        height="54"
        viewBox="0 0 54 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={clsx(!isDirectionForwards && 'rotate-180')}
      >
        <path
          d="M27 49.5C39.4264 49.5 49.5 39.4264 49.5 27C49.5 14.5736 39.4264 4.5 27 4.5C14.5736 4.5 4.5 14.5736 4.5 27C4.5 39.4264 14.5736 49.5 27 49.5Z"
          stroke="white"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24.165 34.9425L32.085 27L24.165 19.0575"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <span className="flex flex-col text-[11px]">
        <span>M</span>
        <span>o</span>
        <span>r</span>
        <span>e</span>
      </span>
    </button>
  );
};
