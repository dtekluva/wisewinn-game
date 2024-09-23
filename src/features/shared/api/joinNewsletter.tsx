import { useMutation } from 'react-query';
import type { AxiosResponse } from 'axios';

import { axios } from '@/lib/axios';

export interface NewsletterDto {
  email: string;
}

const postNewsletterSignup = (newsletterDto: NewsletterDto): Promise<AxiosResponse> => {
  return axios.post('/api/web/newsletter/', newsletterDto);
};

export const usePostNewsletterSignup = () => {
  return useMutation('post-newsletter-signup', postNewsletterSignup, {});
};
