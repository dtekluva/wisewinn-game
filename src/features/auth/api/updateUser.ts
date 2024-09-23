import { useMutation, useQueryClient } from 'react-query';

import { axios } from '@/lib/axios';

const updateUser = (updateUserDto: FormData) => {
  return axios.put(`/api/web/user/`, updateUserDto, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation('update-user', updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('user-details');
    },
  });
};
