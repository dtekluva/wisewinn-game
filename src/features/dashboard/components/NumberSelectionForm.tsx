import * as React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { shallow } from 'zustand/shallow';

import {
  ApplicationNumberInput,
  useLotteryNumbers,
  MobileSlideBackButton,
  DesktopSlideBackButton,
  SummaryModal,
} from '@/features/dashboard';
import { useModalControl } from '@/hooks';
import { useSubmissionsStore } from '@/stores';
import clsx from 'clsx';

type FormResults = {
  [key: string]: string | boolean | undefined;
};

interface NumberSelectionFormProps {
  applicationNumbers: {
    number: string;
    stake: string;
  }[];
  renderedFormIndex: number;
  setRenderedFormIndex: React.Dispatch<React.SetStateAction<number>>;
  numberOfGroups: number;
  isSummaryModalOpen: boolean;
  summaryModalStates: boolean[];
  setSummaryModalStates: React.Dispatch<React.SetStateAction<boolean[]>>;
  dynamicStakeAmountsList: number[];
  wyseCashDynamicBands: { [key: string]: string };
  allApplicationNumbers: { number: string; stake: number }[][];
}

export const NumberSelectionForm: React.FunctionComponent<NumberSelectionFormProps> = ({
  applicationNumbers,
  renderedFormIndex,
  setRenderedFormIndex,
  numberOfGroups,
  isSummaryModalOpen: defaultIsSummaryModalOpen,
  summaryModalStates,
  setSummaryModalStates,
  dynamicStakeAmountsList,
  wyseCashDynamicBands,
  allApplicationNumbers,
}) => {
  const { updateSelections, selections } = useSubmissionsStore(
    state => ({
      selections: state.selections,
      updateSelections: state.updateSelections,
    }),
    shallow,
  );

  const amountGroup = applicationNumbers[0]?.stake;

  const { data: lotteryNumbers } = useLotteryNumbers();

  // const arrayOfLotteryNumbersAfterPageLoad = lotteryNumbers?.data.lottery_data[
  //   Number(amountGroup)
  // ]?.map(({ number }) => number);

  //This groups tickets to their now updated stake amounts(from dynamic data API)
  const groupTicketsToDynamicStakeAmount = (
    inputArray: { number: string; stake: number }[][],
  ): {
    [key: string]: { number: string; stake: number }[];
  } => {
    return inputArray.reduce(
      (result: { [key: string]: { number: string; stake: number }[] }, arr) => {
        arr.forEach(obj => {
          const { stake } = obj;
          if (!result[stake]) {
            result[stake] = [];
          }
          result[stake].push(obj);
        });
        return result;
      },
      {},
    );
  };

  const arrayOfLotteryNumbersAfterPageLoad = groupTicketsToDynamicStakeAmount(
    allApplicationNumbers,
  )?.[Number(amountGroup)]?.map(({ number }) => number);

  const formattedSelectionsForPrefilling = Object.values(selections)
    .flat()
    .filter(
      ({ stake_amount, lucky_number }) =>
        String(stake_amount) === String(amountGroup) &&
        arrayOfLotteryNumbersAfterPageLoad?.includes(lucky_number as string),
    );

  const prefilledFormValuesArray = formattedSelectionsForPrefilling.map(
    ({ lucky_number, stake_amount }) => {
      return {
        [lucky_number as string]: String(stake_amount),
      };
    },
  );

  const prefilledSelectedNumbersInOrder = formattedSelectionsForPrefilling.map(
    ({ lucky_number }) => {
      return lucky_number;
    },
  );
  const defaultValues = Object.assign({}, ...prefilledFormValuesArray);

  const { register, control, setValue } = useForm({
    defaultValues,
  });

  const selectedNumbersInOrder = React.useRef<string[]>(
    prefilledSelectedNumbersInOrder as string[],
  );

  const allFormResults: FormResults = useWatch({
    control,
  });

  const {
    isModalOpen: isSummaryModalOpen,
    closeModal: closeSummaryModal,
    openModal: openSummaryModal,
  } = useModalControl(defaultIsSummaryModalOpen);

  //No longer using the bands coming directly from the tickets api
  // const { bands } = lotteryNumbers?.data || {};

  const allFormNumbers = Object.keys(allFormResults);
  const allFormAmounts = Object.values(allFormResults);

  const selectedNumbers = allFormNumbers.filter((number, index) => {
    const amount = allFormAmounts[index];
    return !!amount;
  });

  const dataForSubmission = selectedNumbers.map(number => {
    const amount = allFormResults[number];

    return {
      stake_amount: Number(amount),
      lucky_number: number,
      consent: 'True',
      band: wyseCashDynamicBands?.[Number(amount as string)],
    };
  });

  React.useEffect(() => {
    updateSelections(dataForSubmission, amountGroup);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allFormResults, selectedNumbersInOrder]);

  const formattedSelectionSummary = Object.values(selections);

  const allSelections = formattedSelectionSummary.flat();

  const areThereSelections = !!allSelections.length;
  React.useEffect(() => {
    if (!areThereSelections) {
      closeSummaryModal();
    }
  }, [areThereSelections, closeSummaryModal]);

  const handleManualNumberRemoval = (number: string) => {
    setValue(number, false); // remove number from RHF state
    selectedNumbersInOrder.current = selectedNumbersInOrder.current.filter(n => n !== number); // remove number from order tracker state
  };

  return (
    <>
      <MobileSlideBackButton
        setRenderedFormIndex={setRenderedFormIndex}
        setSummaryModalStates={setSummaryModalStates}
        renderedFormIndex={renderedFormIndex}
        numberOfGroups={numberOfGroups}
        direction="backwards"
      />
      <MobileSlideBackButton
        setRenderedFormIndex={setRenderedFormIndex}
        setSummaryModalStates={setSummaryModalStates}
        renderedFormIndex={renderedFormIndex}
        numberOfGroups={numberOfGroups}
        direction="forwards"
      />

      <DesktopSlideBackButton
        setRenderedFormIndex={setRenderedFormIndex}
        setSummaryModalStates={setSummaryModalStates}
        renderedFormIndex={renderedFormIndex}
        numberOfGroups={numberOfGroups}
        direction="forwards"
      />
      <DesktopSlideBackButton
        setRenderedFormIndex={setRenderedFormIndex}
        setSummaryModalStates={setSummaryModalStates}
        renderedFormIndex={renderedFormIndex}
        numberOfGroups={numberOfGroups}
        direction="backwards"
      />

      <form className="mb-9">
        <legend className="mb-2 text-sm text-[#fff]  text-opacity-90">
          Select single or multiple ticket numbers
        </legend>

        <div className="grid grid-cols-2 justify-center gap-4 sm:grid-cols-3">
          {applicationNumbers?.map((singleAppNumber, index) => {
            const isLastItem = applicationNumbers.length - 1 === index; //used to center last item

            return (
              <div
                key={singleAppNumber?.number}
                className={clsx(isLastItem && 'col-start-2 col-end-3')}
              >
                <ApplicationNumberInput
                  amount={singleAppNumber?.stake}
                  number={singleAppNumber?.number}
                  registration={register(singleAppNumber?.number)}
                  selectedNumbersInOrder={selectedNumbersInOrder.current}
                  selectedNumbersFromHookForm={selectedNumbers}
                  setValue={setValue}
                  renderedFormIndex={renderedFormIndex}
                  dynamicStakeAmountsList={dynamicStakeAmountsList}
                />
              </div>
            );
          })}
        </div>
      </form>

      <button
        onClick={openSummaryModal}
        disabled={!areThereSelections}
        className="mb-4 rounded-md bg-white bg-opacity-10 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
      >
        View summary of picks
      </button>

      <SummaryModal
        isSummaryModalOpen={isSummaryModalOpen}
        closeSummaryModal={closeSummaryModal}
        formattedSelectionSummary={formattedSelectionSummary}
        lotteryNumbers={lotteryNumbers}
        amountGroup={amountGroup}
        setRenderedFormIndex={setRenderedFormIndex}
        dynamicStakeAmountsList={dynamicStakeAmountsList}
        setSummaryModalStates={setSummaryModalStates}
        summaryModalStates={summaryModalStates}
        handleManualNumberRemoval={handleManualNumberRemoval}
      />
    </>
  );
};
