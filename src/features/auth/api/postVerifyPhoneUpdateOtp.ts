import { useMutation, useQueryClient } from 'react-query';
import { axios } from '@/lib/axios';

type VerifyPhoneNumberUpdateOtpDto = {
  code: string;
  phone_number: string;
};

type ActivateUserResponse = {
  data: {
    message: string;
  };
};

const verifyPhoneNumberUpdateOtp = (
  verifyPhoneNumberUpdateOtpDto: VerifyPhoneNumberUpdateOtpDto,
): Promise<ActivateUserResponse> => {
  return axios.post(`/api/web/verify_phone_number_update/`, verifyPhoneNumberUpdateOtpDto);
};

export const usePostVerifyPhoneNumberUpdateOtp = () => {
  const queryClient = useQueryClient();
  return useMutation('phone_number_update_otp_code', verifyPhoneNumberUpdateOtp, {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onSuccess: () => {
      queryClient.invalidateQueries('user-details');
    },
  });
};
