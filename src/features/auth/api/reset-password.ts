import { useMutation } from 'react-query';
import type { AxiosResponse } from 'axios';

import { axios } from '@/lib/axios';
import type { ResetPasswordDto } from '@/features/auth';

type ResetResponse = {
  messaage: string;
};
const resetPassword = (
  resetPasswordDto: ResetPasswordDto,
): Promise<AxiosResponse<ResetResponse>> => {
  return axios.post('/api/web/password_reset/', resetPasswordDto);
};

export const useResetPassword = () => {
  return useMutation('resetPassword', resetPassword, {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onSuccess: () => {},
  });
};
