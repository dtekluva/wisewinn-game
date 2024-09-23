import { useMutation } from 'react-query';
import type { AxiosResponse } from 'axios';

import { axios } from '@/lib/axios';
import type { ResetPinDto, TokenResponse } from '@/features/auth';

const resetPin = (
  resetPinDto: ResetPinDto,
): Promise<AxiosResponse<TokenResponse>> => {
  return axios.post('/api/web/transaction/change_pin/', resetPinDto);
};

export const useResetPin = () => {
  return useMutation('reset-pin', resetPin);
};
