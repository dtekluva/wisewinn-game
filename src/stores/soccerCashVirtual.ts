import { create, StateCreator } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


export interface SelectedVirtualScoreMatch {
  match: string | undefined;
  homeTeam: string | undefined;
  homeTeamLogo: string | undefined;
  homeTeamId: number | undefined;
  homeTeamCode: string | undefined;
  awayTeam: string | undefined;
  awayTeamLogo: string | undefined;
  awayTeamId: number | undefined;
  awayTeamCode: string | undefined;
  homeTeamPrediction: string;
  awayTeamPrediction: string;
  fullPrediction: string;
}

interface SelectedVirtualScoresSlice {
  selectedVirtualScores: SelectedVirtualScoreMatch[];
  maximumSelections: number;
  addNewVirtualScore: (newMatch: SelectedVirtualScoreMatch) => void;
  deleteAllVirtualScores: () => void;
  changeAllVirtualScores: (newVirtualScores: SelectedVirtualScoreMatch[]) => void;
}

const createSelectedVirtualScoresSlice: StateCreator<
  SelectedVirtualScoresSlice,
  [['zustand/persist', unknown]],
  [],
  SelectedVirtualScoresSlice
> = set => ({
  selectedVirtualScores: [],
  maximumSelections: 5,

  addNewVirtualScore: newMatch =>
    set(state => {
      const previouslyAddedMatch = state.selectedVirtualScores.find(
        score => score.match === newMatch.match,
      );
      const hasMatchBeenAdded = !!previouslyAddedMatch;

      if (state.selectedVirtualScores.length === 0 || !hasMatchBeenAdded) {
        // Remove the first item if the array is already at the maximum.
        if (state.selectedVirtualScores.length >= state.maximumSelections) {
          return { selectedVirtualScores: [...state.selectedVirtualScores.slice(1), newMatch] };
        } else {
          return { selectedVirtualScores: [...state.selectedVirtualScores, newMatch] };
        }
      }

      return {
        selectedVirtualScores: state.selectedVirtualScores.map(score => {
          return score.match === newMatch.match ? newMatch : score;
        }),
      };
    }),

  deleteAllVirtualScores: () =>
    set(() => ({
      selectedVirtualScores: [],
    })),

  changeAllVirtualScores: (newVirtualScores: SelectedVirtualScoreMatch[]) =>
    set(() => ({
      selectedVirtualScores: newVirtualScores,
    })),
});

export const useSoccerCashVirtualStore = create<SelectedVirtualScoresSlice>()(
  persist(
    (...a) => {
      return {
        ...createSelectedVirtualScoresSlice(...a),
      };
    },
    {
      name: 'soccer-cash-virtual-store',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
