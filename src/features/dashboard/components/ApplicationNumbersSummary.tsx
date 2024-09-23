import * as React from 'react';

import { Button } from '@/components/elements';
import { addCommasToNumber } from '@/utils';

interface ApplicationNumbersSummaryProps {
  selectedNumbersLength: number;
  totalAmount: number;
  totalLoan: number;
  openWhyDoIPayModal: () => void;
  buttonClickHandler: () => void;
  isLoading: boolean;
}

export const ApplicationNumbersSummary: React.FunctionComponent<ApplicationNumbersSummaryProps> = ({
  selectedNumbersLength,
  totalAmount,
  totalLoan,
  openWhyDoIPayModal,
  buttonClickHandler,
  isLoading,
}) => {
  return (
    <>
      <div className="mb-2 space-y-1">
        <p className="flex items-center justify-between gap-10">
          <span className="text-left text-[13px] text-[#556575]">No. of selected tickets</span>
          <span className="text-right text-base text-white">{selectedNumbersLength}</span>
        </p>
        <p className="flex items-center justify-between gap-6">
          <span className="text-left text-[13px] text-[#556575]">Total stake amount</span>
          <span className="text-right text-base text-white">
            ₦{!!totalAmount ? addCommasToNumber(totalAmount) : '0'}.00
          </span>
        </p>
        <p className="flex items-center justify-between gap-6">
          <span className="text-left text-[13px] text-[#556575]">Expected payout amount</span>
          <span className="text-right text-base font-semibold text-white">
            ₦{!!totalLoan ? addCommasToNumber(totalLoan) : '0'}.00
          </span>
        </p>
      </div>

      <Button
        className="mx-auto mb-1.5 block w-full rounded-[10px] py-2 text-center text-lg font-semibold"
        size="smNoPadding"
        centered
        disabled={!totalAmount || isLoading}
        onClick={buttonClickHandler}
      >
        {isLoading
          ? 'Loading'
          : `Buy Tickets ₦${!!totalAmount ? addCommasToNumber(totalAmount) : '0'}.00`}
      </Button>

      <button
        onClick={openWhyDoIPayModal}
        className="mx-auto block w-max text-sm font-medium text-purple-400"
      >
        Why do I pay?
      </button>
    </>
  );
};
