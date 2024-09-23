import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { Lottery } from '@/types';

export const getLotteryNumbers = async (): Promise<Lottery> => {
  const { data } = await axios.get('/api/lottery/');
  return data;
};

export const useLotteryNumbers = () =>
  useQuery('lottery-numbers', getLotteryNumbers);
