import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';

export interface DynamicData {
  has_pin: boolean;
  has_profile_img: boolean;
  has_bvn: boolean;
  collect_bvn: boolean;
}

export const getDynamicData = async (): Promise<DynamicData> => {
  const { data } = await axios.get('/api/dynamic_data/');
  return data;
};

export const useDynamicData = () => useQuery('dynamic-data', getDynamicData);
