import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
// import { GetPlay } from '@/types';

// : Promise<GetPlay >
export const getLiveResultS4L = async (page: number) => {
  const { data } = await axios.get(`/api/web/salary_for_live_result/?page=${page}`);
  return data;
};

export const useGetLiveResultS4L = (page: number, selectedTabIndex: number) =>
  useQuery(['get-s4l-game-results', page], () => getLiveResultS4L(page), {
    // cacheTime: 1000 * 60 * 5,
    enabled: selectedTabIndex === 0,
    keepPreviousData: true,
  });
