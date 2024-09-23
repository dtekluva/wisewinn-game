import { axios } from '@/lib/axios';
import { useQuery } from 'react-query';

type GameVerifyPhoneNumber = {
  message: string;
  ussd_code: string;
};

export const getVerifyGamePhoneNumber = async (): Promise<GameVerifyPhoneNumber> => {
  const { data } = await axios.get('/api/web/phone_number_activation_sms/');
  return data;
};

export const useGetVerifyGamePhoneNumber = (enabledFetch: boolean) => {
  return useQuery('get-otp-first-phone-number-verification', getVerifyGamePhoneNumber, {
    // cacheTime: 1000 * 60 * 5,
    // Fetch for user only when enabledFetch is true
    enabled: enabledFetch,
  });
};
