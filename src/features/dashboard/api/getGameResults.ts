import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { GetPlay } from '@/types';

export const getGameResults = async (): Promise<GetPlay> => {
  const { data } = await axios.get(`/api/web/lottery_games_result/`);

  return data;
};

export const useGetGameResults = () => useQuery('get-game-results',getGameResults);
