import { useQuery } from 'react-query';
import { axios } from '@/lib/axios';
// import { GetPlay } from '@/types';

// : Promise<GetPlay >
export const getLiveResultICO = async (page: number) => {
  const { data } = await axios.get(`/api/web/instant_cash_out_result/?page=${page}`);
  return data;
};

export const useGetLiveResultICO = (page: number, selectedTabIndex: number) =>
  useQuery(['get-ico-game-results', page], () => getLiveResultICO(page), {
    cacheTime: 1000 * 60 * 5,
    enabled: selectedTabIndex === 1,
  });
