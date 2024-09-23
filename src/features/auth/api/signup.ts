import { useMutation } from 'react-query';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { SignUpDto, SignUpResponse } from '@/features/auth';

const signUp = (signUpDto: SignUpDto): Promise<AxiosResponse<SignUpResponse>> => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;
  return axios.post(`${API_BASE_URL}/api/web/create-account/`, signUpDto);
};

export const useSignUp = () => {
  return useMutation('signup_email', signUp, {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onSuccess: async () => {},
  });
};
