import { useMutation, useQueryClient } from 'react-query';
import type { AxiosResponse } from 'axios';
import { axios } from '@/lib/axios';
import type { UpdateUserDto } from '@/types';

const updateUser = (updateUserDto: UpdateUserDto): Promise<AxiosResponse> => {
  return axios.put('/api/web/user/', updateUserDto);
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation('update-user-personal-info', updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('user-details');
    },
  });
};
