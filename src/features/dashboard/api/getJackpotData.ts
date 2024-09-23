import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { JackpotEntity } from '@/types';

export const getJackpotData = async (): Promise<JackpotEntity[]> => {
  const { data } = await axios.get('/api/web/jackpot/');
  return data;
};

export const useJackpotData = () => useQuery('jackpot-data', getJackpotData);
