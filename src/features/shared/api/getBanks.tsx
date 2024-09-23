import { useQuery } from 'react-query';
import { axios } from '@/lib/axios';
import { BanksDto } from '@/types';

export const getBanks = async (): Promise<BanksDto[]> => {
  const { data } = await axios.get('/api/fetch_banks/');
  return data;
};

export const useBanks = () => useQuery('fetch-banks', getBanks);
