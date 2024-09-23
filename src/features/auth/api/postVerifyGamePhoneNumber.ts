import { useMutation, useQueryClient } from 'react-query';
import { axios } from '@/lib/axios';

type VerifyGamePhoneNumberDto = {
  code: string;
};

type ActivateUserResponse = {
  data: {
    message: string;
  };
};

const activateUser = (
  verifyGamePhoneNumberDto: VerifyGamePhoneNumberDto,
): Promise<ActivateUserResponse> => {
  return axios.post(`/api/web/activate_phone_number/`, verifyGamePhoneNumberDto);
};

export const usePostVerifyPhoneNumber = () => {
  const queryClient = useQueryClient();
  return useMutation('activate_phone_number(otp_code)', activateUser, {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onSuccess: () => {
      queryClient.invalidateQueries('user-details');
    },
  });
};
