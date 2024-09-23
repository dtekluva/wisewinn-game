import * as React from 'react';
import { useForm, SubmitHandler, useWatch } from 'react-hook-form';
import { Button, Modal, ModalCloseButton } from '@/components/elements';
import { InputError, InputField } from '@/components/form';
import { addCommasToNumber } from '@/utils';
// import { useModalControl } from '@/hooks';
// import { SuccessfulModal } from '@/features/dashboard';
import { useRouter } from 'next/router';

interface FundWalletModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  totalAmount?: number;
  fullAddressPath?: string;
  stakeAmount: number;
}

export type MessageFormValues = {
  amount: string;
};

export const LowFundWalletModal: React.FunctionComponent<FundWalletModalProps> = ({
  isModalOpen,
  closeModal,
  // totalAmount = 600,
  fullAddressPath = '',
  stakeAmount,
}) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<MessageFormValues>({
    mode: 'onTouched',
  });

  // const {
  //   isModalOpen: isSuccessfulModalOpen,
  //   closeModal: closeSuccessfulModal,
  //   openModal: openSuccessfulModal,
  // } = useModalControl();

  const amountQ = useWatch({ control, name: 'amount' });
  const removeCommas = (commas: string | number) => {
    commas = commas?.toString().split(',').join('');
    if (isNaN(Number(commas))) {
      return '';
    }
    return commas;
  };

  const onSubmit: SubmitHandler<MessageFormValues> = data => {
    let { amount } = data;
    amount = removeCommas(amount);
    router.push(`/fund-wallet/fund-channels/?amount=${amount}&gameQuery=${fullAddressPath}`);
  };

  React.useEffect(() => {
    setValue('amount', addCommasToNumber(Number(removeCommas(amountQ)), 'INPUT').toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amountQ]);

  return (
    <Modal
      label="Fund your wallet"
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      width="465px"
      className="pt-[20px] pb-[20px] "
    >
      <ModalCloseButton onClick={closeModal} />
      <h2 className="mb-1.5 text-center font-clash text-[24px] font-semibold">
        Your wallet balance is too low
      </h2>

      <p className="mx-auto mb-4 max-w-[345px] text-center text-xs text-[#fff] md:text-xs">
        Fund your wallet with ₦{addCommasToNumber(stakeAmount)}.00 or more to complete your payment.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="amount" className="text-sm text-white ">
          Enter amount
        </label>
        <InputField
          bgVariants="bg-main-gray-bg-dark"
          id="amount"
          type="text"
          label="Amount"
          defaultValue=""
          className="text-white"
          registration={register('amount', {
            required: true,
          })}
        />
        {errors.amount && <InputError text="This field is required" />}
        <div className="mt-6 mb-8">
          <Button type="submit" className="w-full" centered>
            Continue
          </Button>
        </div>
      </form>
    </Modal>
  );
};
