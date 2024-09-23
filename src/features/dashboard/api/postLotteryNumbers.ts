import { useMutation } from 'react-query';
import type { AxiosResponse } from 'axios';

import { axios } from '@/lib/axios';
import type { PostLotteryDto } from '@/types';

const postLotteryNumbers = (
  postLotteryDto: PostLotteryDto,
): Promise<AxiosResponse> => {
  return axios.post('/api/web/play_lottery/?lottery_type=wyse_cash', postLotteryDto);
};

export const usePostLotteryNumbers = () => {
  return useMutation('post-lottery-numbers', postLotteryNumbers);
};
