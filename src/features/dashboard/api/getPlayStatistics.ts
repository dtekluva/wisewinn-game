import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { GetPlay } from '@/types';

export const getPlayStatistics = async (dateQuery: string): Promise<GetPlay> => {
  const { data } = await axios.get(`/api/web/game_play_statistics/?date=${dateQuery}`);

  return data;
};

export const useGetPlayStatistics = (dateQuery: string) =>
  useQuery(['get-play-statistics', dateQuery], () => getPlayStatistics(dateQuery));
