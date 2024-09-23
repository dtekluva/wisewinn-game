import { useMutation } from 'react-query';
import type { AxiosResponse } from 'axios';
import { axios as CustomAxios, setAxiosDefaultToken } from '@/lib/axios';
import type { EmailLoginDto, NewTokenResponse } from '@/features/auth';
import { getUser, tokenStorage } from '@/features/auth';
import { useAuth } from '@/contexts/authentication';
import axios from 'axios';

const login = (emailLoginDto: EmailLoginDto): Promise<AxiosResponse<NewTokenResponse>> => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;
  return axios.post(`${API_BASE_URL}/api/web/email-login/`, emailLoginDto);
};

export const useEmailLogin = () => {
  const { authDispatch } = useAuth();

  return useMutation('email-login', login, {
    onSuccess: async ({ data }) => {
      const { token } = data;

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
