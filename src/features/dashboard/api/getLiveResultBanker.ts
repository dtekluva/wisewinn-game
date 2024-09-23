import { useQuery } from 'react-query';
import { axios } from '@/lib/axios';

export const getLiveResultBanker = async (page: number) => {
  const { data } = await axios.get(`/api/banker/web-result/?page=${page}`);
  return data;
};

export const useGetLiveResultBanker = (page: number, selectedTabIndex: number) =>
  useQuery(['get-banker-game-results', page], () => getLiveResultBanker(page), {
    // cacheTime: 1000 * 60 * 5,
    enabled: selectedTabIndex === 3,
    keepPreviousData: true,
  });
