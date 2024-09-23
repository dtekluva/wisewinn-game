import * as React from 'react';
import type { AxiosError } from 'axios';

import { addCommasToNumber, formatAxiosErrorMessage } from '@/utils';
import { usePostPayment } from '@/features/dashboard';
import { FullPageLoader } from '@/components/elements';

interface PaystackButtonProps {
  isDeleteLotteryNumberLoading: boolean;
  totalAmount: number;
  email: string;
}

export const PaystackButton: React.FunctionComponent<PaystackButtonProps> = ({
  isDeleteLotteryNumberLoading,
  totalAmount,
}) => {
  const { mutate: postPayment, isLoading: isPostPaymentLoading } = usePostPayment();

  const paymentPayload = {
    amount: totalAmount.toString(),
    paystack: true,
    from_play_wallet: false,
    game_play_id: '',
    from_referral_wallet: false,
  };

  const handlePayment = () => {
    postPayment(paymentPayload, {
      onSuccess: ({ data }) => {
        const { payment_link } = data;
        window.open(payment_link, '_ blank');
      },

      onError: error => {
        const errorMessage = formatAxiosErrorMessage(error as AxiosError);

        console.log(errorMessage);
      },
    });
  };

  return (
    <>
      {isPostPaymentLoading && <FullPageLoader />}

      <button
        disabled={isDeleteLotteryNumberLoading || isPostPaymentLoading}
        onClick={handlePayment}
        className="mx-auto mb-6 flex w-full items-center justify-between gap-4 rounded-[10px] border border-white border-opacity-20 bg-black py-3 px-3 text-center text-white transition duration-500 ease-in-out hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-wise-purple-light focus:ring-opacity-30 focus:ring-offset-2 focus:ring-offset-white active:scale-[0.95] disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-50 md:px-4 md:pl-4"
      >
        <span className="inline-flex items-center gap-2">
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <circle cx="15" cy="15" r="15" fill="white" />
            <rect x="8" y="8" width="15.2568" height="15" fill="url(#pattern0)" />
            <defs>
              <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use
                  xlinkHref="#image0_560_13871"
                  transform="translate(-0.363636 -0.376712) scale(0.003367 0.00342466)"
                />
              </pattern>
              <image
                id="image0_560_13871"
                width="500"
                height="500"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAYAAADL1t+KAAApX0lEQVR4Xu3dCbRddXko8H3me+6Um4EEQgAJUwATEKzzUME6FFu1ahV95S3bou1T61gcam3VLrTV1j4RF2qf8OQ5PeXZpVZF5clS8QkWkMEwhClMmchw53vP+PYBgiHcJCf3nmnv/TusEEj2/v+/7/f97/7O3mefc4LAgwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAIKoCqagGLu7OCExXaoX7pipH3rhz9nd+umX6rIlKbSAdBNVw9voev/YMZu81tfv/9/y9mXXXGH9fj/3tP9d+e/9ZM/N3Brizs+zPdH+RJNVrvtVpeDVjvafrXMa7x6gHqVRt7Ujh+mct77v8mMHsLUsK2cn5Bme/+Ar4QY1vbeedWb1eT928q/S0bz0w9bYfbZp+8a27ZpZNVlPBVKkcHqaaOU7Ne2o7EiAwp0AqyOcyQTGTDlb2Z8aeu6L/ipevLH7pBYcWv92fTdegEWgIaOjWwWMCjUb+wFTllH+9bexLX9s4ufbByVKQDldIJmzijYWSslqsFgJdE3j4klj4r3r4g1gOfx8IG/xzl/f9+j0njrz/zEOLP+haYCbuGQGH6J4pRXcDCZt55sot0x95+7U7PnDTrtkgW68FWauju0UxO4H9CNTCpl4Kn2ovKuSCd68ZuuCvTxo5ry+TnoGWXAGH7OTWfs8z8/Q37538X++4bsfZmyZng4JVYVUQiIxAo7FX0+ngTccu+u4nnrL47PDMfSIywQu0pQLZlo5msEgK/HjT1Iffeu3Os7c3mnl4x5sHAQLREWi8LBbUasFFG0ZfVsgEl5SqtdfnM+lSdDIQaasEHL5bJRnRce4aL70wPDP/4LapmSBnNUS0isJOukCjqeeCWvCZ20Zfdend43+VdI+k5u8QntTKP5r3J9aPXvqbXSWX2RO+DqQffYHGwbwenqn/0y3jH75jrHRs9DOS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sLzw7e5EYFYCyRXQ0JNb++AVh/d9OZ9NB3W3LiV4FbQ29VK4lp6zonjNk0fyN7R2ZKMRIHAgAQ39QEIx/vtXHDlw6VMWF+4quewe4yp3LrVa2MyL2Uxw7urBj4e/exdF5+jNROBhAQ09wQthJJ8de+/Ji85rHIQbB2MPAgsRKIWHk1ceMfCdVxw59K2FjGNfAgTmJ6Chz88tNnu94ojBy95y/NDnGgdjl95jU9aOJzJTSwVPXlzY/NF1i9/W8clNSICAM3Rr4BGBD61d/K5zjhn+bjmVdqZuURy0wGx4dWf1cH78ot9Z+uqjh/IbD3oAOxAg0BKBbEtGMUikBQZzmalds9VzBjOpCz5/x+gbauH192zKNfhIF7UDwTdepimFTwLDt6g9+JnTl/zRs5YXr+7AtKYgQGAfAt6EbGk8JlCu1lKX3D3x1k/cOvb3t++aWZILP3im8ZpM+DGxHgQeFmg8zauFr82Uw5UxmM8Erz1q6Bt/c9Ki844eyt2DiACB7go4VHfXvydnv2OstDps7O/61n1Tr7t3qrJ0YvaRD/zKhqtFc+/JkrU1qMa9FZVGIw9PyQu5XLCkkA6evbzvynNXD338xSv7L2/r5AYnQKBpAQ29aarkbbh1prLsF9tmnnXt9tnn3zFZXbNhrHTqpsnyysb7kSycZKyHetjNF+Uzk8cuKmw4uj9z69rF+V89c1nfD9ctLtycDAFZEoiOgONydGrV9Ui3z1SGp6v1gfCEba51s7+11MwL8s1s03WDCAQwVx3mst1zu73/fvf/p8J+nsqng9JwLr2zP+e95RGovxAJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAICIC/x+Qo4oWcEvLvQAAAABJRU5ErkJggg=="
              />
            </defs>
          </svg>

          <span className="text-base font-bold">paystack</span>
        </span>

        <span className="text-sm">₦{!!totalAmount ? addCommasToNumber(totalAmount) : '0'}.00</span>
      </button>
    </>
  );
};
