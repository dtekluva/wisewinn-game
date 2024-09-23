import { useMutation } from 'react-query';
import axios from 'axios';
import { axios as CustomAxios, setAxiosDefaultToken } from '@/lib/axios';
import { getUser } from '@/features/auth';
import { tokenStorage } from '@/features/auth';
import { useAuth } from '@/contexts/authentication';

type ActivateUserResponse = {
  data: {
    message: string;
    token: string;
  };
};

type ActivatePhoneNumberDto = {
  phone_number: string;
  password: string;
  confirm_password: string;
};

const verifyPhoneNumberSignUp = (
  activatePhoneNumberSignUpDto: ActivatePhoneNumberDto,
): Promise<ActivateUserResponse> => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;
  return axios.post(
    `${API_BASE_URL}/api/web/verify_phone_number_onboarding/`,
    activatePhoneNumberSignUpDto,
  );
};

export const useVerifyPhoneNumberSignUp = () => {
  const { authDispatch } = useAuth();
  return useMutation('activate phone number sign-up(otp_code)', verifyPhoneNumberSignUp, {
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
