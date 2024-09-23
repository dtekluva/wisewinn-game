import { create, StateCreator } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { SubmissionNumber } from '@/features/dashboard';

export interface SubmissionSlice {
  firstConsent: boolean;
  secondConsent: boolean;
  submissions: SubmissionNumber[];
  addSubmission: (submission: SubmissionNumber[]) => void;
  removeSubmissionNumber: (numberToRemove: string) => void;
  acceptFirstConsent: () => void;
  acceptSecondConsent: () => void;
  selections: {
    [key: string]: SubmissionNumber[];
  };
  updateSelections: (newSelections: SubmissionNumber[], newSelectionsKey: string) => void;
  clearSelections: () => void;
}

export const createSubmissionsSlice: StateCreator<
  SubmissionSlice & SuccessSlice,
  [['zustand/persist', unknown]],
  [],
  SubmissionSlice
> = set => ({
  firstConsent: false,
  secondConsent: false,
  submissions: [],
  selections: {},

  addSubmission: submission =>
    set(() => ({
      submissions: submission,
    })),

  updateSelections: (newSelections, newSelectionsKey) =>
    set(state => ({
      selections: { ...state.selections, [newSelectionsKey]: newSelections },
    })),

  clearSelections: () =>
    set(() => ({
      selections: {},
    })),

  removeSubmissionNumber: (numberToRemove: string) =>
    set(state => ({
      submissions: state.submissions.filter(s => s.lucky_number !== numberToRemove),
    })),

  acceptFirstConsent: () => set(() => ({ firstConsent: true })),
  acceptSecondConsent: () => set(() => ({ secondConsent: true })),
});

export interface WyseCashSuccessObject {
  game_id: string;
  game_status: string;
  game_type: string;
  pontential_winning: number;
  stake_per_line: number;
  // total_predictions: number;
  total_stake: number;
}

interface SuccessSlice {
  successObject: WyseCashSuccessObject;
  addSuccessObject: (successObject: WyseCashSuccessObject) => void;
}

const wyseCashSuccessSlice: StateCreator<
  SubmissionSlice & SuccessSlice,
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
    // total_predictions: 0,
    total_stake: 0,
  },

  addSuccessObject: successObject =>
    set(() => ({
      successObject: successObject,
    })),
});

export const useSubmissionsStore = create<SubmissionSlice & SuccessSlice>()(
  persist(
    (...a) => {
      return {
        ...createSubmissionsSlice(...a),
        ...wyseCashSuccessSlice(...a),
      };
    },
    {
      name: 'submissionsStore',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
