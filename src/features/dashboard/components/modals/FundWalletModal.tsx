import * as React from 'react';
// import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Modal, ModalCloseButton } from '@/components/elements';
import { InputError, InputField } from '@/components/form';
import { addCommasToNumber } from '@/utils';
import { useModalControl } from '@/hooks';
import { SuccessfulModal } from '@/features/dashboard';
interface FundWalletModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  totalAmount?: number;
}

export type MessageFormValues = {
  amount: string;
};

export const FundWalletModal: React.FunctionComponent<FundWalletModalProps> = ({
  isModalOpen,
  closeModal,
  totalAmount = 600,
}) => {
  // const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MessageFormValues>({
    mode: 'onTouched',
  });

  const {
    isModalOpen: isSuccessfulModalOpen,
    closeModal: closeSuccessfulModal,
    openModal: openSuccessfulModal,
  } = useModalControl();

  const onSubmit: SubmitHandler<MessageFormValues> = data => {
    console.log(data);
    openSuccessfulModal();
 };

  return (
    <Modal
      label="Fund your wallet"
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      width="465px"
      className="pt-[20px] pb-[20px] text-center"
    >
      <SuccessfulModal
        data={[]}
        isModalOpen={isSuccessfulModalOpen}
        closeModal={closeSuccessfulModal}
      />

      <ModalCloseButton onClick={closeModal} />
      <h2 className="mb-1.5 font-clash text-[24px] font-semibold">
        Your wallet balance is too low
      </h2>
      {/* <p className="mx-auto mb-4 max-w-[345px] text-xs text-[#fff] md:text-xs">
        How much would you like to fund your Whisper Wyse wallet with ?
      </p>
      <p className="mx-auto mb-4 max-w-[345px] text-xs text-[#fff] md:text-xs">
        Fund your wallet with ₦400.00 or more to complete your payment.
      </p> */}
      <p className="mx-auto mb-4 max-w-[345px] text-xs text-[#fff] md:text-xs">
        {totalAmount
          ? `Please fund your wallet with ₦${addCommasToNumber(totalAmount)}.00 or more.`
          : 'How much would you like to fund your Whisper Wyse wallet with'}
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-10">
          <p className="py-1 text-left text-sm font-medium text-white">Enter Amount</p>

          <InputField
            id="amount"
            type="text"
            label="Amount"
            placeholder="Enter amount"
            registration={register('amount', {
              required: true,
            })}
            className="bg-opacity-10 text-white"
          />

          {errors.amount && <InputError text="This field is required" />}
        </div>
        <div>
          <div className="mt-[16px] md:mt-[36px]">
            <button
              className="mx-auto mb-3 mt-[14px] block space-x-2 rounded-lg bg-gradient-to-r from-wise-purple-dark to-wise-purple-light px-[74px] py-3 text-xl font-medium text-white transition duration-500 ease-in-out hover:scale-[1.02] focus:outline-none focus:ring-2
              focus:ring-wise-purple-light focus:ring-opacity-30 focus:ring-offset-2 focus:ring-offset-white active:scale-[0.95] disabled:cursor-not-allowed disabled:opacity-70 "
            >
              {/* {isLoading && <span>Loading</span>}
                      {!isLoading && <span>Submit</span>} */}
              Continue
            </button>
          </div>

          {!totalAmount && (
            <p className="m mx-auto mb-4 mt-[20px] px-3 text-center text-[14px] text-[#fff] text-opacity-70 ">
              Need help?{' '}
              <span className="vertical-middle font-bold text-[#4C1961]">Contact Support</span>
            </p>
          )}
        </div>
      </form>
    </Modal>
  );
};
