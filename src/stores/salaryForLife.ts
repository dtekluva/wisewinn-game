import { nanoid } from 'nanoid';
import { create, StateCreator } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { insertAtArrayIndex, shuffleArray } from '@/utils';

interface MultiplierSlice {
  multiplier: number;
  dynamicPickNumber: number;
  setDynamicPickNumber: (newDynamicPickNumber: number) => void;
  setMultiplier: (newMultiplier: number) => void;
  setAddToMultiplier: (newMultiplier: number) => void;
  incrementMultiplier: () => void;
  decrementMultiplier: () => void;
}

const createMultiplierSlice: StateCreator<
  MultiplierSlice & PicksSlice & SubmissionsSlice & SuccessSlice,
  [['zustand/persist', unknown]],
  [],
  MultiplierSlice
> = set => ({
  multiplier: 2,
  dynamicPickNumber: 2,
  setAddToMultiplier: (newMultiplier: number) => {
    set(state => ({
      multiplier:
        state.multiplier + newMultiplier > state.dynamicPickNumber
          ? state.dynamicPickNumber
          : state.multiplier + newMultiplier,
    }));
  },
  setMultiplier: (newMultiplier: number) => set(() => ({ multiplier: newMultiplier })),
  incrementMultiplier: () => {
    set(state => ({
      multiplier: state.multiplier + 1,
    }));
  },
  decrementMultiplier: () =>
    set(state => ({
      multiplier: state.multiplier < 3 ? 2 : state.multiplier - 1,
    })),
  setDynamicPickNumber: (newDynamicPickNumber: number) =>
    set(() => ({ dynamicPickNumber: newDynamicPickNumber })),
});

export interface Digit {
  pickDigit: number | undefined;
  id: string;
}
export interface PickSFL {
  digitArray: Digit[];
  id: string;
}
interface PicksSlice {
  picks: PickSFL[];
  activeRow: Digit[];
  setPicks: (newPicks: PickSFL[]) => void;
  setActiveRow: (newActiveRow: Digit[]) => void;
  deletePicksRow: (rowId: string) => void;
  shuffleSingleRow: (rowId: string) => void;
  duplicateRow: (rowId: string) => void;
  addNewDigitToPicks: (digit: number) => void;
  addNewEmptyRow: () => void;
  deleteLastRow: () => void;
  shuffleAllRows: () => void;
  addNewRandomRow: () => void;
  fillUpAddedRows: () => void;
  replaceSingleNumber: (rowId: string, numberToReplace: string, replacementNumber: number) => void;
  replacePicksRow: (rowId: string, newRow: PickSFL) => void;
  clearPicksRow: (rowId: string) => void;
  fillUpIncompleteRows: () => void;
  clearAllRows: () => void;
}
const createPicksSlice: StateCreator<
  MultiplierSlice & PicksSlice & SubmissionsSlice & SuccessSlice,
  [['zustand/persist', unknown]],
  [],
  PicksSlice
> = set => ({
  picks: [],
  activeRow: [],

  setPicks: (newPicks: PickSFL[]) => set(() => ({ picks: newPicks })),

  setActiveRow: (newActiveRow: Digit[]) => set(() => ({ activeRow: newActiveRow })),

  deletePicksRow: (rowId: string) =>
    set(state => ({ picks: state.picks.filter(p => p.id !== rowId) })),

  replacePicksRow: (rowId: string, newRow: PickSFL) =>
    set(state => {
      const updatedPicks = state.picks.map(p => (p.id === rowId ? newRow : p));
      return { picks: updatedPicks };
    }),

  clearPicksRow: (rowId: string) =>
    set(state => {
      const emptyRowDigits = Array(5).fill(undefined);
      const emptyRow = { digitArray: emptyRowDigits, id: nanoid() };
      const updatedPicks = state.picks.map(p => (p.id === rowId ? emptyRow : p));
      return { picks: updatedPicks };
    }),

  clearAllRows: () =>
    set(state => {
      const emptyRows = Array(state.multiplier)
        .fill(undefined)
        .map(() => {
          return {
            digitArray: Array(5)
              .fill(undefined)
              .map(() => {
                return { pickDigit: undefined, id: nanoid() };
              }),
            id: nanoid(),
          };
        });

      return { picks: emptyRows };
    }),

  addNewEmptyRow: () =>
    set(state => {
      const newRow = Array(5).fill(undefined);
      state.incrementMultiplier();
      return { picks: [...state.picks, { digitArray: newRow, id: nanoid() }] };
    }),

  addNewRandomRow: () =>
    set(state => {
      const newRow = Array(5)
        .fill(undefined)
        .map(() => {
          return { pickDigit: Math.floor(Math.random() * 49 + 1), id: nanoid() };
        });
      state.incrementMultiplier();
      return { picks: [...state.picks, { digitArray: newRow, id: nanoid() }] };
    }),

  deleteLastRow: () => set(state => ({ picks: state.picks.slice(0, -1) })),

  shuffleAllRows: () =>
    set(state => {
      const shuffledPicks = state.picks.map(r => {
        return { digitArray: shuffleArray(r.digitArray) as Digit[], id: nanoid() };
      });

      return { picks: shuffledPicks };
    }),

  shuffleSingleRow: (rowId: string) =>
    set(state => {
      const picksWithShuffledRow = state.picks.map(r => {
        return r.id === rowId
          ? { digitArray: shuffleArray(r.digitArray) as Digit[], id: nanoid() }
          : r;
      });

      return { picks: picksWithShuffledRow };
    }),

  replaceSingleNumber: (rowId: string, numberIdToReplace: string, replacementNumber: number) =>
    set(state => {
      const picksWithReplacedNumber = state.picks.map(r => {
        if (r.id === rowId) {
          const rowToReplace = r.digitArray.slice();

          const editedRow = rowToReplace.map(d => {
            return d?.id === numberIdToReplace ? { pickDigit: replacementNumber, id: nanoid() } : d;
          });

          return { digitArray: editedRow, id: nanoid() };
        }

        return r;
      });

      return { picks: picksWithReplacedNumber };
    }),

  duplicateRow: (rowId: string) =>
    set(state => {
      const rowToDuplicate = state.picks.find(r => r.id === rowId);
      // Ensure ids of digits and rows are not duplicated.
      const rowDuplicateDigits = rowToDuplicate?.digitArray.map(d => ({
        pickDigit: d?.pickDigit,
        id: nanoid(),
      }));
      const rowDuplicate = { digitArray: rowDuplicateDigits, id: nanoid() };
      const rowDuplicateIndex = state.picks.findIndex(r => r.id === rowId) + 1;

      const picksWithDuplicateRow = insertAtArrayIndex(
        state.picks,
        rowDuplicateIndex,
        rowDuplicate,
      ) as PickSFL[];

      state.incrementMultiplier();
      return { picks: picksWithDuplicateRow };
    }),

  addNewDigitToPicks: (digit: number) =>
    set(state => {
      const oldPicks = state.picks;
      const areOldPicksEmpty = oldPicks.length === 0;
      const newDigitObject = { pickDigit: digit, id: nanoid() };

      if (areOldPicksEmpty) {
        const newRow = Array(5).fill(undefined);
        newRow[0] = newDigitObject;
        state.setActiveRow(newRow);
        return { picks: [...state.picks, { digitArray: newRow, id: nanoid() }] };
      }

      const firstPickRowWithFalsyData = oldPicks.find(p => {
        return p.digitArray.some(r => !r?.pickDigit);
      });
      const indexOfFirstFalsyValueInFirstFalsyRow = firstPickRowWithFalsyData?.digitArray.findIndex(
        r => !r?.pickDigit,
      );
      const isLastFalsyRowAvailable =
        !!firstPickRowWithFalsyData &&
        !!(indexOfFirstFalsyValueInFirstFalsyRow || indexOfFirstFalsyValueInFirstFalsyRow === 0);

      if (isLastFalsyRowAvailable) {
        return {
          picks: state.picks.map(r => {
            const newDigitArray = firstPickRowWithFalsyData.digitArray;
            newDigitArray[indexOfFirstFalsyValueInFirstFalsyRow] = newDigitObject;

            state.setActiveRow(newDigitArray);

            return r.id === firstPickRowWithFalsyData.id
              ? {
                  digitArray: newDigitArray,
                  id: nanoid(),
                }
              : r;
          }),
        };
      }

      const lastPickRow = oldPicks[oldPicks.length - 1];
      const areOldPickRowsCompleteAndTruthy =
        lastPickRow.digitArray.length === 5 && lastPickRow?.digitArray.every(r => !!r?.pickDigit);

      if (areOldPickRowsCompleteAndTruthy) {
        state.incrementMultiplier();
        const newRow = Array(5).fill(undefined);
        newRow[0] = newDigitObject;
        state.setActiveRow(newRow);
        return { picks: [...state.picks, { digitArray: newRow, id: nanoid() }] };
      }

      return { picks: state.picks };
    }),

  fillUpAddedRows: () =>
    set(state => {
      const generatedArrays = Array(state.multiplier)
        .fill(undefined)
        .map(() => {
          return {
            digitArray: Array(5)
              .fill(undefined)
              .map(() => {
                return { pickDigit: Math.floor(Math.random() * 49 + 1), id: nanoid() };
              }),
            id: nanoid(),
          };
        });

      return { picks: [...state.picks, ...generatedArrays] };
    }),

  fillUpIncompleteRows: () =>
    set(state => {
      const oldPicks = state.picks;

      const getIncompleteRows = oldPicks.filter(row => {
        return !row.digitArray ? row.digitArray : !row.digitArray.every(val => val?.pickDigit);
      });

      const oldPicksId = oldPicks.map(rows => rows.id);
      const getIncompleteRowsIndexArray = getIncompleteRows.reduce((accum: number[], value) => {
        const indexOfInCompleteRows = oldPicksId.indexOf(value.id);
        accum.push(indexOfInCompleteRows);
        return accum;
      }, []);

      const fillRowsWithNumbers = getIncompleteRows.map(row => {
        return {
          id: row.id,
          digitArray: row.digitArray.map(digits => {
            if (!digits?.pickDigit) {
              digits = { pickDigit: Math.floor(Math.random() * 49 + 1), id: nanoid() };
            }
            return digits;
          }),
        };
      });

      for (let i = 0; i < getIncompleteRowsIndexArray.length; i++) {
        oldPicks.splice(Number(getIncompleteRowsIndexArray[i]), 1, fillRowsWithNumbers[i]);
      }

      return { picks: [...state.picks] };
    }),
});

export interface SalaryForLifeSubmission {
  data: { id: number; ticket: number[] }[];
  get_game_play_id: string;
  number_of_lines: number;
  potential_winning: number;
  stake: number;
}

interface SubmissionsSlice {
  submissions: SalaryForLifeSubmission;
  addSubmission: (submission: SalaryForLifeSubmission) => void;
  removeSubmissionNumber: (numberToRemove: number) => void;
}

const createSubmissionsSlice: StateCreator<
  MultiplierSlice & PicksSlice & SubmissionsSlice & SuccessSlice,
  [['zustand/persist', unknown]],
  [],
  SubmissionsSlice
> = set => ({
  submissions: {
    data: [{ id: 0, ticket: [] }],
    get_game_play_id: '',
    number_of_lines: 0,
    potential_winning: 0,
    stake: 0,
  },

  addSubmission: submission =>
    set(() => ({
      submissions: submission,
    })),

  removeSubmissionNumber: (numberToRemove: number) =>
    set(state => {
      const filteredData = state.submissions.data.filter(s => s.id !== numberToRemove);
      return {
        submissions: {
          ...state.submissions,
          number_of_lines: state.submissions.number_of_lines - 1,
          data: filteredData,
        },
      };
    }),
});

export interface SalaryForLifeSuccessObject {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  game_id: string;
  game_status: string;
  game_type: string;
  pontential_winning: number;
  stake_per_line: number;
  total_lines: number;
  total_stake: number;
}

interface SuccessSlice {
  successObject: SalaryForLifeSuccessObject;
  addSuccessObject: (successObject: SalaryForLifeSuccessObject) => void;
}

const salaryForLifeSuccessSlice: StateCreator<
  MultiplierSlice & PicksSlice & SubmissionsSlice & SuccessSlice,
  [['zustand/persist', unknown]],
  [],
  SuccessSlice
> = set => ({
  successObject: {
    game_id: '',
    game_status: '',
    game_type: '',
    pontential_winning: 0,
    stake_per_line: 0,
    total_lines: 0,
    total_stake: 0,
  },

  addSuccessObject: successObject =>
    set(() => ({
      successObject: successObject,
    })),
});

export const useSalaryForLifeStore = create<
  MultiplierSlice & PicksSlice & SubmissionsSlice & SuccessSlice
>()(
  persist(
    (...a) => {
      return {
        ...createMultiplierSlice(...a),
        ...createPicksSlice(...a),
        ...createSubmissionsSlice(...a),
        ...salaryForLifeSuccessSlice(...a),
      };
    },
    {
      name: 'salary-for-life-store',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
