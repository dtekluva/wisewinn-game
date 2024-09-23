import { useQuery } from 'react-query';
import { axios } from '@/lib/axios';
import { GameWonHistoryProps } from '@/types';

export const getGameWonHistory = async (
  game_type: string,
  date: string,
): Promise<GameWonHistoryProps> => {
  const { data } = await axios.get(`/api/web/lottery_winners/?game_type=${game_type}&date=${date}`);
  return data;
};

export const useGetGameWonHistory = (game_type: string, date: string, selectedTabIndex?: number) =>
  useQuery(['game-won-history', game_type, date], () => getGameWonHistory(game_type, date), {
    cacheTime: 1000 * 60 * 5,
    enabled: selectedTabIndex ? selectedTabIndex === 2 : true,
  });
