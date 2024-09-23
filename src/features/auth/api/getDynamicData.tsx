import { useAuth } from '@/contexts/authentication';
import { DynamicUserData } from '@/features/auth';
import { axios } from '@/lib/axios';
import { useQuery } from 'react-query';

export const getDynamicUserData = async (): Promise<DynamicUserData> => {
  const { data } = await axios.get('/api/dynamic_data/');
  return data;
};

export const useGetDynamicUserData = () => {
  const { authState } = useAuth();

  return useQuery('dynamic-user-details', getDynamicUserData, {
    // cacheTime: 1000 * 60 * 5,
    // Fetch for user only when user is authenticated
    enabled: authState.isAuthenticated,
  });
};
