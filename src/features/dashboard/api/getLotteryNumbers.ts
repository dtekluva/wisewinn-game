import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { Lottery } from '@/types';
import { useSubmissionsStore } from '@/stores';

export const getLotteryNumbers = async (): Promise<Lottery> => {
  const { data } = await axios.get('/api/web/generate_wyse_cash_game/');
  return data;
};

export const useLotteryNumbers = () => {
  const clearSelections = useSubmissionsStore(state => state.clearSelections);

  return useQuery('lottery-numbers', getLotteryNumbers, {
    cacheTime: 1000 * 60 * 5, // 5 minutes

    onSuccess: () => {
      // Clear selections on load to prevent ui discrepancies.
      clearSelections();
    },
  });
};
