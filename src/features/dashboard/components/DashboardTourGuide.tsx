/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setState: any;
  run: boolean;
  steps: Step[];
}

export function DashboardTourGuide({ setState, run, steps }: Props) {
  function logGroup(type: string, data: CallBackProps) {
    console.groupCollapsed(type);
    console.log(data);
    console.groupEnd();
  }

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type } = data;
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

interface State {
  run: boolean;
  steps: Step[];
}

export const DashboardTourGuideDefinition: State = {
  run: false,
  steps: [
    {
      content: (
        <div>
          <h2 className="font-clash text-base text-white md:text-2xl">Whisper Wyse Games</h2>
          <p className="my-2 text-base text-white">Want to Learn how to play?</p>
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
        <h2 className="font-clash !text-white">These are the different games you can play!</h2>
      ),
      placement: 'bottom',
      styles: {
        options: {
          width: 300,
        },
      },
      target: '.game__projects',
      // title: 'Our projects',
    },

    {
      content: (
        <h2 className="font-clash !text-white">
          These table reveals information about the{' '}
          <span className="italic">current percentage of players,</span>{' '}
          <span className="italic"> their average stake amount  </span>{' '} and
          <span className="italic"> potential winnings for the three games</span>.
        </h2>
      ),
      floaterProps: {
        // disableAnimation: false,
      },
      spotlightPadding: 20,
      placement: 'auto',
      target: '.game_play_view',
    },

    {
      content: (
        <h2 className="font-clash !text-white">
          All winners of the three major games are displayed in this section of the page.
        </h2>
      ),
      floaterProps: {
        // disableAnimation: false,
      },
      spotlightPadding: 20,
      placement: 'top',
      target: '.winners_table_view',
    },

    {
      content: (
        <h2 className="font-clash !text-white">
          For more information, Click on the <span className="font-bold">Know the games</span>{' '}
          button.
        </h2>
      ),
      floaterProps: {
        disableAnimation: false,
      },
      spotlightPadding: 20,
      placement: 'auto',
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
