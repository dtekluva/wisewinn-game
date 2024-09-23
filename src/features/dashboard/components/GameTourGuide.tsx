/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import Joyride, { CallBackProps, STATUS } from 'react-joyride';

interface Props {
  //   handleClickStart: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setState: any;
  run: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  steps: any;
}

export function GameTourGuide({ setState, run, steps }: Props) {
  function logGroup(type: string, data: CallBackProps) {
    console.groupCollapsed(type);
    console.log(data);
    console.groupEnd();
  }

  const [index, setIndex] = useState(0);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type } = data;

    setIndex(data?.index);
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setState({ run: false });
    }

    logGroup(type, data);
  };

  return (
    <>
      <Joyride
        callback={handleJoyrideCallback}
        continuous
        hideCloseButton
        run={run}
        scrollToFirstStep
        disableScrolling={index === 4 ? true : false}
        showProgress={false}
        showSkipButton
        steps={steps}
        styles={{
          options: {
            arrowColor: '#fff',
            backgroundColor: '#fff',
            beaconSize: 36,
            overlayColor: 'rgba(0, 0, 0, 0.5)',
            primaryColor: '#f04',
            spotlightShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
            textColor: '#333',
            width: undefined,
            zIndex: 100,
          },
        }}
      />

      <style jsx>{`
        .__floater__body {
          background: red !important;
        }
      `}</style>
    </>
  );
}

// interface State {
//   run: boolean;
//   steps: Step[];
// }

export const S4LGameTourGuideDefinition = (
  handleClick: React.MouseEventHandler<HTMLButtonElement> | undefined,
) => {
  return {
    run: false,
    steps: [
      {
        content: (
          <div>
            <h2 className="font-clash text-base text-white md:text-2xl">Salary For Life Game</h2>
            <p className="my-2 text-base text-white">Want to Learn how to play Salary For Life?</p>

            <button onClick={handleClick} className="relative top-[4.4rem] text-base !text-white">
              Don't show again
            </button>
          </div>
        ),
        locale: {
          skip: (
            <span className="!text-white" aria-label="skip">
              Skip
            </span>
          ),
          close: 'close',
        },
        spotlightPadding: 20,
        placement: 'center',
        target: 'body',
      },
      {
        content: (
          <div className="!p-0">
            <p className="text-center font-clash text-4xl font-semibold !text-white">1</p>
            <h2 className="font-clash !text-white">
              Start by selecting any of the 49 purple balls to fill the white balls.
            </h2>
            ,
          </div>
        ),
        floaterProps: {
          // disableAnimation: false,
        },
        spotlightPadding: 20,
        placement: 'auto',
        target: '.select_balls',
      },
      {
        content: (
          <div className="!p-0">
            <p className="text-center font-clash text-4xl font-semibold !text-white">2</p>
            <h2 className="font-clash !text-white">
              Your selected balls in the previous step would show here as you select them.{' '}
            </h2>
          </div>
        ),
        placement: 'bottom',
        styles: {
          options: {
            width: 300,
          },
        },
        target: '.picks_view',
        // title: 'Our projects',
      },
      {
        content: (
          <div className="!p-0">
            <p className="text-center font-clash text-4xl font-semibold !text-white">3</p>
            <h2 className="font-clash !text-white">Click on this button to buy ticket.</h2>
          </div>
        ),
        placement: 'top',
        target: '.buy_ticket_view',
        // title: 'Our Mission',
      },
      {
        content: (
          <div className="!p-0">
            <p className="text-center font-clash text-4xl font-semibold !text-white">4</p>
            <h2 className="font-clash !text-white">
              Want to know more? Click <span className="font-bold">How to Play</span>.
            </h2>
          </div>
        ),

        placement: 'auto',
        target: '.button__how__play',
        locale: {
          last: (
            <span className="!text-white" aria-label="last">
              Done
            </span>
          ),
        },
      },
    ],
  };
};

export const ICOGameTourGuideDefinition = (
  handleClick: React.MouseEventHandler<HTMLButtonElement> | undefined,
) => {
  return {
    run: false,
    steps: [
      {
        content: (
          <div>
            <h2 className="font-clash text-base text-white md:text-2xl">Instant Cashout Game</h2>
            <p className="my-2 text-base text-white">Want to Learn how to play Instant Cashout?</p>

            <button onClick={handleClick} className="relative top-[4.4rem] text-base !text-white">
              Don't show again
            </button>
          </div>
        ),
        locale: {
          skip: (
            <span className="!text-white" aria-label="skip">
              Skip
            </span>
          ),
        },
        spotlightPadding: 20,
        placement: 'center',
        target: 'body',
      },
      {
        content: (
          <div className="!p-0">
            <p className="text-center font-clash text-4xl font-semibold !text-white">1</p>
            <h2 className="font-clash !text-white">
              Start by selecting any of the 40 purple balls to fill the white balls.
            </h2>
            ,
          </div>
        ),
        floaterProps: {
          // disableAnimation: false,
        },
        spotlightPadding: 20,
        placement: 'auto',
        target: '.select_balls',
      },
      {
        content: (
          <div className="!p-0">
            <p className="text-center font-clash text-4xl font-semibold !text-white">2</p>
            <h2 className="font-clash !text-white">
              Your selected balls in the previous step would show here as you select them.{' '}
            </h2>
          </div>
        ),
        placement: 'bottom',
        styles: {
          options: {
            width: 300,
          },
        },
        target: '.picks_view',
        // title: 'Our projects',
      },
      {
        content: (
          <div className="!p-0">
            <p className="text-center font-clash text-4xl font-semibold !text-white">3</p>
            <h2 className="font-clash !text-white">Click on this button to buy ticket.</h2>
          </div>
        ),
        placement: 'top',
        target: '.buy_ticket_view',
        // title: 'Our Mission',
      },
      {
        content: (
          <div className="!p-0">
            <p className="text-center font-clash text-4xl font-semibold !text-white">4</p>
            <h2 className="font-clash !text-white">
              Want to know more? Click <span className="font-bold">How to Play</span>.
            </h2>
          </div>
        ),
        placement: 'bottom',
        target: '.how_to_play_btn',
        locale: {
          last: (
            <span className="!text-white" aria-label="last">
              Done
            </span>
          ),
        },
      },
    ],
  };
};

export const QuikaGameTourGuideDefinition = (
  handleClick: React.MouseEventHandler<HTMLButtonElement> | undefined,
) => {
  return {
    run: false,
    steps: [
      {
        content: (
          <div>
            <h2 className="font-clash text-base text-white md:text-2xl">Quika Game</h2>
            <p className="my-2 text-base text-white">Want to Learn how to play Quika?</p>

            <button onClick={handleClick} className="relative top-[4.4rem] text-base !text-white">
              Don't show again
            </button>
          </div>
        ),
        locale: {
          skip: (
            <span className="!text-white" aria-label="skip">
              Skip
            </span>
          ),
        },
        spotlightPadding: 20,
        placement: 'center',
        target: 'body',
      },
      {
        content: (
          <div className="!p-0">
            <p className="text-center font-clash text-4xl font-semibold !text-white">1</p>
            <h2 className="font-clash !text-white">
              Start by selecting any of the 40 purple balls to fill the white balls.
            </h2>
            ,
          </div>
        ),
        floaterProps: {
          // disableAnimation: false,
        },
        spotlightPadding: 20,
        placement: 'auto',
        target: '.select_balls',
      },
      {
        content: (
          <div className="!p-0">
            <p className="text-center font-clash text-4xl font-semibold !text-white">2</p>
            <h2 className="font-clash !text-white">
              Your selected balls in the previous step would show here as you select them.{' '}
            </h2>
          </div>
        ),
        placement: 'bottom',
        styles: {
          options: {
            width: 300,
          },
        },
        target: '.picks_view',
        // title: 'Our projects',
      },
      {
        content: (
          <div className="!p-0">
            <p className="text-center font-clash text-4xl font-semibold !text-white">3</p>
            <h2 className="font-clash !text-white">Click on this button to buy ticket.</h2>
          </div>
        ),
        placement: 'top',
        target: '.buy_ticket_view',
        // title: 'Our Mission',
      },
      {
        content: (
          <div className="!p-0">
            <p className="text-center font-clash text-4xl font-semibold !text-white">4</p>
            <h2 className="font-clash !text-white">
              Want to know more? Click <span className="font-bold">How to Play</span>.
            </h2>
          </div>
        ),
        placement: 'bottom',
        target: '.how_to_play_btn',
        locale: {
          last: (
            <span className="!text-white" aria-label="last">
              Done
            </span>
          ),
        },
      },
    ],
  };
};
