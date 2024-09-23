// import create from 'zustand';

// interface MyStoreState {
//   bankerStakeAmount: string;
// }

// export const useMyStore = create<MyStoreState>(set => ({
//   bankerStakeAmount: 'initial_value',
//   setBankerStakeAmount: (newValue: string) => set({ bankerStakeAmount: newValue }),
// }));
import { create, StateCreator } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface BankerSlice {
  bankerStakeAmount: number;
  setBankerStakeAmount: (amount: number) => void;
}

export const createBankersSlice: StateCreator<
  BankerSlice & SuccessSlice & SubmissionsSlice,
  [['zustand/persist', unknown]],
  [],
  BankerSlice
> = set => ({
  bankerStakeAmount: 0,

  setBankerStakeAmount: amount =>
    set(() => ({
      bankerStakeAmount: amount,
    })),
});

export interface BankerSubmission {
  data: { id: number; ticket: number[] }[];
  get_game_play_id: string;
  number_of_lines: number;
  potential_winning: number;
  stake: number;
}

interface SubmissionsSlice {
  submissions: BankerSubmission;
  addSubmission: (submission: BankerSubmission) => void;
  removeSubmissionNumber: (numberToRemove: number) => void;
}

const createSubmissionsSlice: StateCreator<
  BankerSlice & SubmissionsSlice & SuccessSlice,
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

export interface BankerSuccessObject {
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
  successObject: BankerSuccessObject;
  addSuccessObject: (successObject: BankerSuccessObject) => void;
}

const BankerSuccessSlice: StateCreator<
  BankerSlice & SuccessSlice & SubmissionsSlice,
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

export const useBankerStore = create<BankerSlice & SuccessSlice & SubmissionsSlice>()(
  persist(
    (...a) => {
      return {
        ...createBankersSlice(...a),
        ...BankerSuccessSlice(...a),
        ...createSubmissionsSlice(...a),
      };
    },
    {
      name: 'bankerStore',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
