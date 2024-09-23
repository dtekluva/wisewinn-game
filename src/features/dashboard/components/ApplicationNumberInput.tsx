import * as React from 'react';
import { FieldValues, UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form';

import { removeValueFromArray } from '@/utils';
import clsx from 'clsx';

interface ApplicationNumberInputProps {
  number: string;
  amount: string;
  registration: UseFormRegisterReturn;
  selectedNumbersInOrder: string[];
  selectedNumbersFromHookForm: string[];
  setValue: UseFormSetValue<FieldValues>;
  renderedFormIndex: number;
  dynamicStakeAmountsList: number[];
}

// type LoanAmountColourIndex = {
//   [key: number]: { staticColor: string; bgStyles: string };
// };

// const loanAmountColourIndex: LoanAmountColourIndex = {
//   150: {
//     staticColor: '#1867CD',
//     bgStyles: 'bg-[#1867CD] bg-opacity-20 hover:bg-opacity-40',
//   },
//   250: {
//     staticColor: '#4C1961',
//     bgStyles: 'bg-[#4C1961] bg-opacity-20 hover:bg-opacity-40',
//   },
//   600: {
//     staticColor: '#008D43',
//     bgStyles: 'bg-[#008D43] bg-opacity-20 hover:bg-opacity-40',
//   },
//   1200: {
//     staticColor: '#9602AD',
//     bgStyles: 'bg-[#9602AD] bg-opacity-20 hover:bg-opacity-40',
//   },
//   // 1200: {
//   //   staticColor: '#117971',
//   //   bgStyles: 'bg-[#117971] bg-opacity-20 hover:bg-opacity-40',
//   // },
//   // 5: {
//   //   staticColor: '#E7453C',
//   //   bgStyles: 'bg-[#E7453C] bg-opacity-20 hover:bg-opacity-40',
//   // },
// };

export const ApplicationNumberInput: React.FunctionComponent<ApplicationNumberInputProps> = ({
  number,
  amount,
  registration,
  selectedNumbersInOrder,
  selectedNumbersFromHookForm,
  setValue,
  dynamicStakeAmountsList,
}) => {
  const areSelectedItemsComplete =
    selectedNumbersFromHookForm?.length > 4 && selectedNumbersInOrder?.length > 4;

  const isNumberAddedToOrderList = selectedNumbersInOrder?.includes(number);

  const colorStylesList = [
    {
      staticColor: '#1867CD',
      bgStyles: 'bg-[#1867CD] bg-opacity-20 hover:bg-opacity-40',
    },
    {
      staticColor: '#4C1961',
      bgStyles: 'bg-[#4C1961] bg-opacity-20 hover:bg-opacity-40',
    },
    {
      staticColor: '#008D43',
      bgStyles: 'bg-[#008D43] bg-opacity-20 hover:bg-opacity-40',
    },
    {
      staticColor: '#9602AD',
      bgStyles: 'bg-[#9602AD] bg-opacity-20 hover:bg-opacity-40',
    },
    {
      staticColor: '#117971',
      bgStyles: 'bg-[#117971] bg-opacity-20 hover:bg-opacity-40',
    },
    {
      staticColor: '#E7453C',
      bgStyles: 'bg-[#E7453C] bg-opacity-20 hover:bg-opacity-40',
    },
  ];

  const loanAmountColourIndexFunc = (list: number[]) => {
    const resultObject: {
      [key: number]: { staticColor: string; bgStyles: string };
    } = {};

    list.forEach((item: number, index: number) => {
      resultObject[item] = colorStylesList[index];
    });

    return resultObject;
  };

  const loanAmountColourIndex = loanAmountColourIndexFunc(dynamicStakeAmountsList);

  const { staticColor, bgStyles } =
    loanAmountColourIndex[Number(amount) as number] || colorStylesList[0];

  return (
    <>
      <input
        className="checkbox hidden cursor-pointer"
        type="checkbox"
        id={number}
        value={amount}
        {...registration}
        onChange={e => {
          registration.onChange(e);

          // Custom handler code
          if (areSelectedItemsComplete && e.target.checked) {
            const oldFirstValue = selectedNumbersInOrder.shift();
            if (!!oldFirstValue) setValue(oldFirstValue, false);
          }

          if (!isNumberAddedToOrderList && e.target.checked) {
            selectedNumbersInOrder?.push(number);
          }

          if (!e.target.checked) {
            removeValueFromArray(selectedNumbersInOrder, number);
          }
        }}
      />

      <label
        className={clsx(
          'flex cursor-pointer items-center justify-center gap-2 rounded-[7px] p-2 transition duration-300 ease-in-out',
          bgStyles,
        )}
        htmlFor={number}
      >
        <span className="checkbox-circle inline-block h-3.5 w-3.5 flex-shrink-0 rounded-full border-[3px] border-white bg-white transition duration-200 ease-in-out"></span>
        <span className="whitespace-nowrap text-sm">{number} </span>
        <span className="amount-background rounded-[3px] p-1 text-xs text-white">₦{amount}</span>
      </label>

      <style jsx>{`
        .checkbox:checked + label .checkbox-circle {
          background: ${staticColor};
        }

        .amount-background {
          background: ${staticColor};
        }
      `}</style>
    </>
  );
};
