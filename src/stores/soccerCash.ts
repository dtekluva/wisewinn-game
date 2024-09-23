import { create, StateCreator } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface SelectedScoreMatch {
  matchName: string;
  matchDate: string | undefined;
  matchId: string | undefined;
  scores: {
    scoreText: string;
    amount: string;
  }[];
  customScores: {
    scoreText: string;
    amount: string;
  }[];
  freemium: boolean | undefined;
}

interface SelectedScoresSlice {
  selectedScores: SelectedScoreMatch[];
  addNewScore: (newMatch: SelectedScoreMatch, scoresType: 'scores' | 'customScores') => void;
  deleteScore: (
    matchId: string | undefined,
    scoreText: string,
    scoresType: 'scores' | 'customScores',
  ) => void;
  deleteAllScores: () => void;
}

const createSelectedScoresSlice: StateCreator<
  SelectedScoresSlice & SubmissionsSlice & SuccessSlice,
  [['zustand/persist', unknown]],
  [],
  SelectedScoresSlice
> = set => ({
  selectedScores: [],

  // scoresType parameter added to allow reuse of function for both regular and custom scores
  addNewScore: (newMatch, scoresType) =>
    set(state => {
      const previouslyAddedMatch = state.selectedScores.find(s => s.matchId === newMatch.matchId);
      const hasMatchBeenAdded = !!previouslyAddedMatch;

      // If match has not been added yet, add it.
      if (!hasMatchBeenAdded) {
        return { selectedScores: [...state.selectedScores, newMatch] };
      }

      const newScore = newMatch[scoresType][0];

      const previouslyAddedScore = previouslyAddedMatch[scoresType].find(
        s => s.scoreText === newScore.scoreText,
      );
      const hasScoreBeenAdded = !!previouslyAddedScore;

      const updatedMatch = {
        ...previouslyAddedMatch,
        [scoresType]: hasScoreBeenAdded
          ? // replace (refresh) score content if it has been added before
            previouslyAddedMatch[scoresType].map(s =>
              s.scoreText === newScore.scoreText ? newScore : s,
            )
          : // add it if it has not beeen added previously
            [...previouslyAddedMatch[scoresType], newScore],
      };

      return {
        selectedScores: [
          ...state.selectedScores.map(s => (s.matchId === updatedMatch.matchId ? updatedMatch : s)),
        ],
      };
    }),

  deleteAllScores: () =>
    set(() => ({
      selectedScores: [],
    })),

  deleteScore: (matchId, scoreText, scoresType) =>
    set(state => {
      const selectedMatch = state.selectedScores.find(s => s.matchId === matchId);

      // Do nothing if match does not exist
      if (!selectedMatch) {
        return { selectedScores: state.selectedScores };
      }

      // Remove score from match if it was found
      const updatedMatch = {
        ...selectedMatch,
        [scoresType]: selectedMatch?.[scoresType].filter(s => s.scoreText !== scoreText),
      };

      const isUpdatedMatchEmpty =
        updatedMatch?.scores.length === 0 && updatedMatch?.customScores.length === 0;

      const updatedSelectedScores = isUpdatedMatchEmpty
        ? state.selectedScores.filter(s => s.matchId !== updatedMatch.matchId) // remove updated match when it is empty (when it has no scores)
        : state.selectedScores.map(s => (s.matchId === updatedMatch.matchId ? updatedMatch : s)); // add updated match when it is not empty

      return {
        selectedScores: updatedSelectedScores,
      };
    }),
});

export interface SoccerCashSubmission {
  succeeded: boolean;
  message: string;
  game_play_id: string;
  game_summary: GameSummaryEntity[];
  matches_played: number;
  total_predictions: number;
  total_stake_amount: number;
  winning_amount: number;
}

export interface GameSummaryEntity {
  fixtures_id: string;
  home_team: string;
  away_team: string;
  home_logo: string;
  away_logo: string;
  fixture_date: string;
  predictions: PredictionsEntity[];
}
export interface PredictionsEntity {
  id: number;
  home_choice: number;
  away_choice: number;
  freemium: boolean;
  stake_amount: number;
}

interface SubmissionsSlice {
  submissions: SoccerCashSubmission;
  addSubmission: (submission: SoccerCashSubmission) => void;
}

const createSubmissionsSlice: StateCreator<
  SelectedScoresSlice & SubmissionsSlice & SuccessSlice,
  [['zustand/persist', unknown]],
  [],
  SubmissionsSlice
> = set => ({
  submissions: {
    succeeded: false,
    message: '',
    game_play_id: '',
    game_summary: [],
    matches_played: 0,
    total_predictions: 0,
    total_stake_amount: 0,
    winning_amount: 0,
  },

  addSubmission: submission =>
    set(() => ({
      submissions: submission,
    })),
});

export interface SoccerCashSuccessObject {
  game_id: string;
  game_status: string;
  game_type: string;
  pontential_winning: number;
  stake_per_line: number;
  total_predictions: number;
  total_stake: number;
}

interface SuccessSlice {
  successObject: SoccerCashSuccessObject;
  addSuccessObject: (successObject: SoccerCashSuccessObject) => void;
}

const soccerCashSuccessSlice: StateCreator<
  SelectedScoresSlice & SubmissionsSlice & SuccessSlice,
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
    total_predictions: 0,
    total_stake: 0,
  },

  addSuccessObject: successObject =>
    set(() => ({
      successObject: successObject,
    })),
});

export const useSoccerCashStore = create<SelectedScoresSlice & SubmissionsSlice & SuccessSlice>()(
  persist(
    (...a) => {
      return {
        ...createSelectedScoresSlice(...a),
        ...createSubmissionsSlice(...a),
        ...soccerCashSuccessSlice(...a),
      };
    },
    {
      name: 'soccer-cash-store',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
