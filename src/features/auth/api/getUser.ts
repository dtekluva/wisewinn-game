import { useAuth } from '@/contexts/authentication';
import type { User } from '@/features/auth';
import { axios } from '@/lib/axios';
import { useQuery } from 'react-query';

export const getUser = async (): Promise<User> => {
  const { data } = await axios.get('/api/web/user/');
  return data;
};

export const useUser = () => {
  const { authState } = useAuth();

  return useQuery('user-details', getUser, {
    cacheTime: 1000 * 60 * 5,
    // Fetch for user only when user is authenticated
    enabled: authState.isAuthenticated,
  });
};
