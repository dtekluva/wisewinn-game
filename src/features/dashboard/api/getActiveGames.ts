import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { ActiveGamesEntity } from '@/types';

// : Promise<Lottery>
export const getActiveGames = async (): Promise<ActiveGamesEntity[]> => {
  const { data } = await axios.get('/api/web/active_games/');
  return data;
};

export const useActiveGames = () => useQuery('active-games', getActiveGames);
