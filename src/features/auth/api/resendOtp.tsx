import { useMutation } from 'react-query';
// import type { AxiosResponse } from 'axios';
import { axios } from '@/lib/axios';
import type { ResendActivateUserDto } from '@/features/auth';

type ActivateUserResponse = {
  data: {
    message: string;
  };
};

const activateUser = (
  resendActivateUserDto: ResendActivateUserDto,
): Promise<ActivateUserResponse> => {
  return axios.post('/api/web/resend_activation_code/', resendActivateUserDto);
};

export const useResendActivateUser = () => {
  return useMutation('resend_activate_user(otp_code)', activateUser, {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onSuccess: () => {},
  });
};
