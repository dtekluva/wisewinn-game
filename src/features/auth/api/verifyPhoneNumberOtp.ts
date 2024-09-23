import { useMutation } from 'react-query';
import axios from 'axios';

type ActivateUserResponse = {
  data: {
    message: string;
  };
};

type ActivatePhoneNumberDto = {
  phone_number: string | undefined;
  code: string | undefined;
};

const verifyPhoneNumberOtp = (
  activatePhoneNumberSignUpDto: ActivatePhoneNumberDto,
): Promise<ActivateUserResponse> => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;
  return axios.post(
    `${API_BASE_URL}/api/web/verify_phone_number_otp/`,
    activatePhoneNumberSignUpDto,
  );
};

export const useVerifyPhoneNumberOtp = () => {
  return useMutation('activate phone number sign-up(otp_code) step 1', verifyPhoneNumberOtp, {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onSuccess: ({}) => {},
  });
};
