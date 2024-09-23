import { useMutation } from 'react-query';
import axios from 'axios';

type ResendPhoneNumberOtp = {
  phone_number: string;
  otp_option:string;
};
type ActivateUserResponse = {
  data: {
    message: string;
  };
};

const resendPhoneNumberSignUpOtp = (
  resendActivateUserDto: ResendPhoneNumberOtp,
): Promise<ActivateUserResponse> => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;
  return axios.post(
    `${API_BASE_URL}/api/web/phone_number_onboarding_resend_otp/`,
    resendActivateUserDto,
  );
};

export const useResendPhoneNumberSignUpOtp = () => {
  return useMutation('resend_phone_number_signup(otp_code)', resendPhoneNumberSignUpOtp, {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onSuccess: () => {},
  });
};
