import * as React from 'react';
import { useRouter } from 'next/router';
import type { AxiosError } from 'axios';

import { usePostPayment } from '@/features/dashboard';
import { addCommasToNumber, formatAxiosErrorMessage } from '@/utils';
import { useModalControl } from '@/hooks';
import { ReferralWalletModal } from '@/features/shared';
import { useSubmissionsStore } from '@/stores';
import { shallow } from 'zustand/shallow';
import { FullPageLoader } from '@/components/elements';

interface PayWithReferrerWalletButtonProps {
  isWalletBalanceEnough: boolean;
  openErrorModal: (errorMessage: string) => void;
  isLoading: boolean;
  wallet_balance: number | undefined;
  totalAmount: number;
  game_play_id: string;
}

const PayWithReferrerWalletButton: React.FunctionComponent<PayWithReferrerWalletButtonProps> = ({
  isWalletBalanceEnough,
  openErrorModal,
  isLoading,
  wallet_balance,
  totalAmount,
  game_play_id,
}) => {
  const router = useRouter();
  const fullAddressPath = router.asPath;

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

  const {
    isModalOpen: isLimitedReferralWalletModal,
    closeModal: closeLimitedReferralWalletModal,
    openModal: openLimitedReferralWalletModal,
  } = useModalControl();

  //PAY WITH REFERRAL WALLET
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
            openLimitedReferralWalletModal();
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

      <ReferralWalletModal
        isModalOpen={isLimitedReferralWalletModal}
        closeModal={closeLimitedReferralWalletModal}
        handleClick={handlePayment}
        isLoading={isPostPaymentLoading}
      />
      <button
        className="disabled:opacity-60mx-auto mb-6 flex w-full items-center justify-between gap-4 rounded-[10px] border-[0.3px] border-[#EEEEEE] bg-[#F9FAFB] py-3 px-3 text-center text-black transition duration-500 ease-in-out hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-wise-purple-light focus:ring-opacity-30 focus:ring-offset-2 focus:ring-offset-white active:scale-[0.95] disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-50 md:px-4 md:pl-4"
        onClick={() => {
          if (isWalletBalanceEnough) {
            handlePayment();
          } else {
            router.push(`/fund-wallet/fund-channels?lowBalance=true&gameQuery=${fullAddressPath}`);
          }
        }}
        disabled={isLoading || isPostPaymentLoading}
      >
        <span className="inline-flex w-max items-center gap-2 text-left">
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="15" cy="15" r="15" fill="white" />
            <path
              d="M15.3747 17.0625H13.4997C13.1922 17.0625 12.9372 16.8075 12.9372 16.5C12.9372 16.1925 13.1922 15.9375 13.4997 15.9375H15.3747C17.3397 15.9375 18.9372 14.34 18.9372 12.375C18.9372 10.41 17.3397 8.8125 15.3747 8.8125H11.6247C9.65969 8.8125 8.06219 10.41 8.06219 12.375C8.06219 13.2 8.35469 14.0025 8.87969 14.64C9.07469 14.88 9.04469 15.2325 8.80469 15.435C8.56469 15.63 8.21219 15.6 8.00969 15.36C7.31219 14.52 6.92969 13.4625 6.92969 12.375C6.92969 9.7875 9.02969 7.6875 11.6172 7.6875H15.3672C17.9547 7.6875 20.0547 9.7875 20.0547 12.375C20.0547 14.9625 17.9622 17.0625 15.3747 17.0625Z"
              fill="#4C1961"
            />
            <path
              opacity="0.4"
              d="M18.375 22.3125H14.625C12.0375 22.3125 9.9375 20.2125 9.9375 17.625C9.9375 15.0375 12.0375 12.9375 14.625 12.9375H16.5C16.8075 12.9375 17.0625 13.1925 17.0625 13.5C17.0625 13.8075 16.8075 14.0625 16.5 14.0625H14.625C12.66 14.0625 11.0625 15.66 11.0625 17.625C11.0625 19.59 12.66 21.1875 14.625 21.1875H18.375C20.34 21.1875 21.9375 19.59 21.9375 17.625C21.9375 16.8 21.645 15.9975 21.12 15.36C20.925 15.12 20.955 14.7675 21.195 14.565C21.435 14.3625 21.7875 14.4 21.99 14.64C22.6875 15.48 23.07 16.5375 23.07 17.625C23.0625 20.2125 20.9625 22.3125 18.375 22.3125Z"
              fill="#4C1961"
            />
          </svg>

          <span className="text-[15px] font-bold">Referral Wallet</span>
          <span className="text-xs">
            Balance: ₦{!!wallet_balance ? addCommasToNumber(wallet_balance) : '0'}.00
          </span>
        </span>

        <span className="text-sm">₦{!!totalAmount ? addCommasToNumber(totalAmount) : '0'}.00</span>
      </button>
    </>
  );
};

export default PayWithReferrerWalletButton;
