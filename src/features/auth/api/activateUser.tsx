import { useMutation } from 'react-query';
import axios from 'axios';
import { axios as CustomAxios, setAxiosDefaultToken } from '@/lib/axios';
import { ActivateUserDto, getUser } from '@/features/auth';
import { tokenStorage } from '@/features/auth';
import { useAuth } from '@/contexts/authentication';

type ActivateUserResponse = {
  data: {
    message: string;
    token: string;
  };
};

const activateUser = (activateUserDto: ActivateUserDto): Promise<ActivateUserResponse> => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;
  return axios.post(`${API_BASE_URL}/api/web/activate_user/`, activateUserDto);
};

export const useActivateUser = () => {
  const { authDispatch } = useAuth();
  return useMutation('activate_user(otp_code)', activateUser, {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
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

// 3560
