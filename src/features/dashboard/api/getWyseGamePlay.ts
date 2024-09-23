import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { WyseCashGameDto } from '@/types';

export const getWyseCashGamePlay = async (): Promise<WyseCashGameDto[]> => {
  const { data } = await axios.get('/api/web/wyse_cash_statistics/');
  return data;
};

export const useGetWyseCashGamePlay = () => useQuery('wyse-cash-game-play', getWyseCashGamePlay);
