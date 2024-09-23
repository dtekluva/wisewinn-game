import React from 'react';
import { isFuture } from 'date-fns';

import { useCountdown } from '@/hooks';
import { ClientOnly } from '@/components/elements';

const countdownEndTimes = [10, 12, 14, 16, 18, 20, 22]; //10am, 12pm, 2pm, 4pm, 6pm, 8pm, 10pm

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setHours
const todaysTargetDates = countdownEndTimes.map(t => today.setHours(t, 0, 0));
const tomorrowsTargetDates = countdownEndTimes.map(t => tomorrow.setHours(t, 0, 0));

const targetDates = [...todaysTargetDates, ...tomorrowsTargetDates];

export const WyseCashDrawCountdown: React.FunctionComponent = () => {
  const firstFutureDate = Number(targetDates.find(d => isFuture(d)));

  const { strings: countdownStrings } = useCountdown(firstFutureDate);

  const [daysString, hoursString, minutesString, secondsString] = countdownStrings;

  return (
    <ClientOnly className="lg flex w-full flex-col justify-between overflow-auto p-0 sm:my-2 md:flex-row md:items-center md:px-8 lg:mb-5 lg:flex-row lg:bg-[#15171D] lg:p-4 lg:px-10">
      <p className="hidden text-sm font-medium text-[#A6A6A6] md:text-base lg:block">
        Game draws take place at 10am, 12pm, 2pm, 4pm, 6pm, 8pm, 10pm daily
      </p>
      <p className="flex flex-col whitespace-nowrap text-sm font-medium text-[#A6A6A6] md:mt-0 md:text-base">
        <span className="text-right text-sm md:text-base">
          Next <span className="hidden md:inline">game</span> draw:
        </span>
        <span className="block font-mono text-base font-semibold text-[#fff] md:inline-block lg:text-xl">
          {daysString}:{hoursString}:{minutesString}:{secondsString}
        </span>
      </p>
    </ClientOnly>
  );
};
