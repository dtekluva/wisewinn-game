import { useMutation, useQueryClient } from 'react-query';
import type { AxiosResponse } from 'axios';
import { axios } from '@/lib/axios';
// import type { UpdateUserDto } from '@/types';

type UpdatePhoneNumberDto = {
  phone_number: string;
};

const updatePhoneNumber = (updatePhoneNumberDto: UpdatePhoneNumberDto): Promise<AxiosResponse> => {
  return axios.post('/api/web/update_phone_number/', updatePhoneNumberDto);
};

export const useUpdatePhoneNumber = () => {
  const queryClient = useQueryClient();

  return useMutation('update-user-phone-number', updatePhoneNumber, {
    onSuccess: () => {
      queryClient.invalidateQueries('user-details');
    },
  });
};
