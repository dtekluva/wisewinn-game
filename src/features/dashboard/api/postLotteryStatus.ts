import { useMutation } from 'react-query';
import type { AxiosResponse } from 'axios';

import { axios } from '@/lib/axios';
import type { LotteryStatusDto } from '@/types';

const postLotteryStatus = (
  postLotteryDto: LotteryStatusDto,
): Promise<AxiosResponse> => {
  return axios.post('/api/lottery_status/', postLotteryDto);
};

export const usePostLotteryStatus = () => {
  return useMutation('get-lottery-status', postLotteryStatus);
};
