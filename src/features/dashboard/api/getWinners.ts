import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { Winner } from '@/types';

export const getWinners = async (): Promise<Winner> => {
  const { data } = await axios.get('/api/web/top_five_winners/');
  return data;
};

export const useWinners = () => useQuery('winners', getWinners);
