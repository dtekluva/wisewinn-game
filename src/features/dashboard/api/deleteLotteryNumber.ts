import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';

const deleteLotteryNumber = (lotteryId: number) => {
  return axios.delete(`/api/web/play_lottery/?lottery_type=wyse_cash&id=${lotteryId}`);
};

export const useDeleteLotteryNumber = () => {
  return useMutation('delete-lottery-number', deleteLotteryNumber, {});
};
