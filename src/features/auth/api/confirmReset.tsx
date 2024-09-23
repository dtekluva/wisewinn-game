import { useMutation } from 'react-query';
import type { AxiosResponse } from 'axios';

import { axios } from '@/lib/axios';
import type { ConfirmResetPasswordDto } from '@/features/auth';

type ResetResponse = {
  message: string;
};
const confirmResetPassword = (
  confirmResetPasswordDto: ConfirmResetPasswordDto,
): Promise<AxiosResponse<ResetResponse>> => {
  return axios.post('/api/web/password_reset/confirm/', confirmResetPasswordDto);
};

export const useConfirmResetPassword = () => {
  return useMutation('confirm-resetPassword', confirmResetPassword, {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onSuccess: () => {},
  });
};
