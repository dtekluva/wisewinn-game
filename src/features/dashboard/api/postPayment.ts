import { useMutation } from 'react-query';
import type { AxiosResponse } from 'axios';

import { axios } from '@/lib/axios';
import type { PostPaymentDto } from '@/types';

const postPayment = (
  postPaymentDto: PostPaymentDto,
): Promise<AxiosResponse> => {
  return axios.post('/api/web/lottery_payment/', postPaymentDto);
};

export const usePostPayment = () => {
  return useMutation('post-lottery-payment', postPayment);
};
