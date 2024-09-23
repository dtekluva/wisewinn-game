import { useUser } from '@/features/auth';
import { useRouter } from 'next/router';

export const useCheckUser = (routeForCompleteDetails = '/dashboard', type = '') => {
  const router = useRouter();
  const { data: userDetails } = useUser();
  const { first_name, last_name, gender, phone_number } = userDetails || {};
  const areUserDetailsComplete = !!first_name && !!last_name && !!phone_number && !!gender;

  const personalInfoRouteForIncompleteDetails = () => {
    if (areUserDetailsComplete) {
      router.push(routeForCompleteDetails);
    } else {
      router.push(`/user/personal-info?type=${type}`);
    }
  };

  return {
    personalInfoRouteForIncompleteDetails,
  };
};
