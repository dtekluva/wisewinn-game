import { axios } from '@/lib/axios';

import { useMutation } from 'react-query';

import type { AxiosResponse } from 'axios';

export interface PostAiSubscriptionDto {
  phone_number: string;
}

const postAiSubscription = (
  postAiSubscriptionDto: PostAiSubscriptionDto,
): Promise<AxiosResponse> => {
  return axios.post('/awoof/ask_ai_subscription/', postAiSubscriptionDto);
};

export const usePostAiSubscription = () => {
  return useMutation('post-ask-ai-subscription', postAiSubscription);
};
