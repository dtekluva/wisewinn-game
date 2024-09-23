import React from 'react';
import Countdown from 'react-countdown';
import { formatDistanceStrict } from 'date-fns';

export const CounterDownHours: React.FunctionComponent = () => {
  type CounterProps = {
    hours: number;
    minutes: number;
    seconds: number;
    completed?: boolean;
  };

  const tommorrow = new Date();
  tommorrow.setHours(44);
  tommorrow.setMinutes(0);
  tommorrow.setSeconds(0);
  tommorrow.setMilliseconds(0);

  let result: string | number = formatDistanceStrict(tommorrow, new Date(), {
    unit: 'second',
    addSuffix: false,
  });

  result = Number(result.split(' ')[0]) * 1000;

  const renderer = ({ hours, minutes, seconds }: CounterProps) => {
    return (
      <span className="inline-block rounded-md bg-[#15171D] p-2 md:bg-transparent  md:p-0">
        {hours.toString().length < 2 ? '0' + hours : hours}:
        {minutes.toString().length < 2 ? '0' + minutes : minutes}:
        {seconds.toString().length < 2 ? '0' + seconds : seconds}
      </span>
    );
  };

  return (
    <div className="lg flex w-full flex-col justify-between overflow-auto p-0 sm:my-2 md:flex-row md:items-center md:px-8 lg:mb-5 lg:flex-row lg:bg-[#15171D] lg:p-4 lg:px-10">
      <p className="hidden text-sm font-medium text-[#A6A6A6] md:text-base lg:block">
        Game draw takes place at 8pm daily
      </p>
      <p className="flex flex-col whitespace-nowrap text-sm font-medium text-[#A6A6A6] md:mt-0 md:text-base">
        <span className="text-right text-sm md:text-base">
          Next <span className="hidden md:inline">game</span> draw:
        </span>
        <span className="block font-mono text-base font-semibold text-[#fff] md:inline-block lg:text-xl">
          <Countdown
            key={4}
            autoStart={true}
            overtime={true}
            date={Date.now() + result}
            renderer={renderer}
            daysInHours={true}
          />
        </span>
      </p>
    </div>
  );
};
