import { axios } from '@/lib/axios';

import { useMutation } from 'react-query';

import type { AxiosResponse } from 'axios';

export interface postgetQuestionsAskedDto {
  phone_number: string;
}

export type QuestionsResponse = Array<{
  prompt: string;
  response: string;
  created_at: string;
}>;

const getQuestionsAsked = (
  getQuestionsAskedDto: postgetQuestionsAskedDto,
): Promise<AxiosResponse<QuestionsResponse>> => {
  return axios.post(`/awoof/ask_ai_history/?phone=${getQuestionsAskedDto.phone_number}`);
};

export const usePostGetQuestionsAsked = () => {
  return useMutation('get-questions-asked', getQuestionsAsked);
};
