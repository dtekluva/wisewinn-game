import { addCommasToNumber } from '@/utils';
import React from 'react';

interface JackPotCardProps {
  title: string;
  value: number;
  gauge: number;
}

const JackPotCard: React.FunctionComponent<JackPotCardProps> = ({ title, value, gauge }) => {
  return (
    <li key={title} className="flex-grow basis-1/3">
      <div className=" relative mb-3 rounded-[20px] bg-gradient-to-r from-[#024AA9] via-[#FFFFFF] to-[#024AA9] p-[2.5px]">
        <div className="h-full w-full rounded-[20px] bg-main-gray-bg-darker px-8 py-5">
          <span className="absolute top-0 left-0 right-0 mx-auto block h-[2.5px] w-[60%] bg-main-gray-bg-darker"></span>
          <span className="jackpot-text-shadow block whitespace-nowrap font-serif text-xl font-bold italic">
            {title}{' '}
          </span>
          <span className="text-[32px] font-bold">₦{addCommasToNumber(value)}</span>
        </div>
      </div>

      <div className="relative h-[9px] overflow-hidden rounded border">
        {/* Added to fill skew whitespace */}
        <div className="absolute h-[9px] w-[0.8%] bg-white" />

        <div
          className="h-[9px] -skew-x-[45deg] bg-white"
          style={{
            width: `${gauge}%`,
          }}
        />
      </div>
    </li>
  );
};

export default JackPotCard;
