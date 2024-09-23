import { useMutation } from 'react-query';
import type { AxiosResponse } from 'axios';

import { axios } from '@/lib/axios';
import type { changePasswordDto, TokenResponse } from '@/features/auth';

const changePassword = (
  changePasswordDto: changePasswordDto,
): Promise<AxiosResponse<TokenResponse>> => {
  return axios.post('/api/web/change_password/', changePasswordDto);
};

export const useChangePassword = () => {
  return useMutation('changePassword', changePassword);
};
