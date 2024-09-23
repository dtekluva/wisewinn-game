import { useMutation } from 'react-query';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { axios as CustomAxios, setAxiosDefaultToken } from '@/lib/axios';
import { getUser, GoogleAuthDto, SignUpGoogleResponse, tokenStorage } from '@/features/auth';
import { useAuth } from '@/contexts/authentication';

const postGoogleAuth = (
  googleAuthDto: GoogleAuthDto,
): Promise<AxiosResponse<SignUpGoogleResponse>> => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

  return axios.post(`${API_BASE_URL}/api/web/google/`, googleAuthDto);
};

export const usePostGoogleAuth = () => {
  const { authDispatch } = useAuth();
  return useMutation('google_authentication', postGoogleAuth, {
    onSuccess: async data => {
      const token = data?.data?.token;

      tokenStorage.setToken(token);
      setAxiosDefaultToken(token, CustomAxios);

      const user = await getUser();

      if (authDispatch) {
        authDispatch({ type: 'LOGIN', payload: user });

        authDispatch({ type: 'STOP_LOADING' });
      }
    },
  });
};
