import { useMutation } from 'react-query';
// import type { AxiosResponse } from 'axios';
import axios from 'axios';
// import { SignUpDto, SignUpResponse } from '@/features/auth';

type PhoneNumberOnboardingDto = {
  phone_number: string;
};

const phoneNumberSignUp = (phoneNumberOnboardingDto: PhoneNumberOnboardingDto) => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;
  return axios.post(`${API_BASE_URL}/api/web/onboard_via_phone/`, phoneNumberOnboardingDto);
};

export const usePhoneNumberSignUp = () => {
  return useMutation('phone_number_onboarding', phoneNumberSignUp, {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onSuccess: async () => {},
  });
};
