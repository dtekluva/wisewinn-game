import * as React from 'react';
import { useRouter } from 'next/router';
import type { AxiosError } from 'axios';
import { usePostPayment } from '@/features/dashboard';
import { addCommasToNumber, formatAxiosErrorMessage } from '@/utils';
import { useSubmissionsStore } from '@/stores';
import shallow from 'zustand/shallow';

import { FullPageLoader } from '@/components/elements';

interface PayWithWalletButtonProps {
  isWalletBalanceEnough: boolean;
  openErrorModal: (errorMessage: string) => void;
  isLoading: boolean;
  wallet_balance: number | undefined;
  totalAmount: number;
  game_play_id: string;
}

const PayWithWalletButton: React.FunctionComponent<PayWithWalletButtonProps> = ({
  isWalletBalanceEnough,
  openErrorModal,
  isLoading,
  wallet_balance,
  totalAmount,
  game_play_id,
}) => {
  const router = useRouter();
  const { mutate: postPayment, isLoading: isPostPaymentLoading } = usePostPayment();

  const { addSuccessObject } = useSubmissionsStore(
    state => ({
      addSuccessObject: state.addSuccessObject,
    }),
    shallow,
  );

  const paymentPayload = {
    from_referral_wallet: false,
    from_play_wallet: true,
    paystack: false,
    amount: totalAmount.toString(),
    game_play_id,
  };

  const fullAddressPath = router.asPath;

  //PAY WITH PLAY WALLET
  const handlePayment = () => {
    if (paymentPayload)
      postPayment(paymentPayload, {
        onSuccess: ({ data }) => {
          addSuccessObject(data);
          router.push('/application/success');
        },

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
          if (error?.response.data.message === 'Insufficient funds') {
            router.push(`/fund-wallet/fund-channels?lowBalance=true&gameQuery=${fullAddressPath}`);
          } else {
            const errorMessage = formatAxiosErrorMessage(error as AxiosError);
            openErrorModal(errorMessage as string);
          }
        },
      });
  };

  return (
    <>
      {isPostPaymentLoading && <FullPageLoader />}

      <button
        className="primary-bg mx-auto mb-6 flex w-full items-center justify-between gap-4 rounded-[10px] bg-gradient-to-r from-[#4C1961] to-[#FF000F] py-3 px-3 text-center text-white transition duration-500 ease-in-out hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-wise-purple-light focus:ring-opacity-30 focus:ring-offset-2 focus:ring-offset-white active:scale-[0.95] disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-50 md:px-4 md:pl-4"
        onClick={() => {
          if (isWalletBalanceEnough) {
            handlePayment();
          } else {
            router.push(`/fund-wallet/fund-channels?lowBalance=true&gameQuery=${fullAddressPath}`);
          }
        }}
        disabled={isLoading || isPostPaymentLoading}
      >
        <span className="inline-flex items-center gap-2">
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="15" cy="15" r="15" fill="#F5F3FF" />
            <path
              d="M25.0002 14.9699V17.03C25.0002 17.58 24.5602 18.0299 24.0002 18.0499H22.0402C20.9602 18.0499 19.9702 17.2599 19.8802 16.1799C19.8202 15.5499 20.0602 14.9599 20.4802 14.5499C20.8502 14.1699 21.3602 13.95 21.9202 13.95H24.0002C24.5602 13.97 25.0002 14.4199 25.0002 14.9699Z"
              fill="white"
            />
            <path
              d="M20.48 14.55C20.06 14.96 19.82 15.55 19.88 16.18C19.97 17.26 20.96 18.05 22.04 18.05H24V19.5C24 22.5 22 24.5 19 24.5H10C7 24.5 5 22.5 5 19.5V12.5C5 9.78 6.64 7.88 9.19 7.56C9.45 7.52 9.72 7.5 10 7.5H19C19.26 7.5 19.51 7.50999 19.75 7.54999C22.33 7.84999 24 9.76 24 12.5V13.95H21.92C21.36 13.95 20.85 14.17 20.48 14.55Z"
              fill="#4C1961"
            />
            <path
              d="M16 13.75H10C9.59 13.75 9.25 13.41 9.25 13C9.25 12.59 9.59 12.25 10 12.25H16C16.41 12.25 16.75 12.59 16.75 13C16.75 13.41 16.41 13.75 16 13.75Z"
              fill="white"
            />
          </svg>
          <span className="text-base font-bold">Wallet</span>
          <span className="text-xs">
            Balance: ₦{!!wallet_balance ? addCommasToNumber(wallet_balance) : '0'}.00
          </span>
        </span>

        <span className="text-sm">₦{!!totalAmount ? addCommasToNumber(totalAmount) : '0'}.00</span>

        <style jsx>{`
          .primary-bg {
            background: linear-gradient(90deg, #4c1961 0%, #ff000f 242.97%);
          }
        `}</style>
      </button>
    </>
  );
};

export default PayWithWalletButton;
