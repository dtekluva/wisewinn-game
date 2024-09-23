import { useMutation } from 'react-query';
import type { AxiosResponse } from 'axios';
import { axios } from '@/lib/axios';
import type { createPinDto, TokenResponse } from '@/features/auth';

const createPin = (createPinDto: createPinDto): Promise<AxiosResponse<TokenResponse>> => {
  return axios.post('/api/web/transaction/create_pin/', createPinDto);
};

export const useCreatePin = () => {
  return useMutation('create-pin', createPin);
};
