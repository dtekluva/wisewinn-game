import React from 'react';
// import { useForm,SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { InputField, InputError } from '@/components/form';
// import { useResetPin } from '@/features/settings';
import PinInput from 'react-pin-input';
import { useModalControl, useToggle } from '@/hooks';
import { SuccessModal } from './SuccessModal';

export type MessageFormValues = {
  old_pin: string;
  new_pin: string;
  confirm_new_pin: string;
};

export const ResetTransactionForm: React.FunctionComponent = () => {
  // const { mutate: postResetPin, isLoading } = useResetPin();
  // const router = useRouter();

  // const {
  //   // register,
  //   handleSubmit,
  //   // control,
  //   // reset,
  //   // formState: { errors },
  // } = useForm<MessageFormValues>({
  //   mode: 'onTouched',
  // });

  const {
    isModalOpen: isSuccessModalOpen,
    closeModal: closeSuccessModal,
    openModal: openSuccessModal,
  } = useModalControl();
  // Initialize a boolean state
  const [oldPinMask, toggleOldPinMask] = useToggle(true);
  const [newPinMask, togglenewPinMask] = useToggle(true);
  const [confirmPinMask, toggleConfirmPinMask] = useToggle(true);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [confirmValue, setConfirmValue] = React.useState('');
  // const onSubmit: SubmitHandler<MessageFormValues> = data => {
  //   postResetPin(data, {
  //     onSuccess: () => {
  //       router.push('/user/signup-success');
  //     },

  //     onError: error => {
  //       console.log(error);
  //     },
  //   });
  // };

  // const handleComplete = (value: string) => {
  //   // const paymentPayload = {
  //   //   amount: Number(amount),
  //   //   paystack: false,
  //   //   from_referral_wallet: paymentType === 'referral-wallet',
  //   //   from_main_wallet: paymentType === 'main-wallet',
  //   //   pin: value,
  //   // };
  //   // setPaymentPayload(paymentPayload);
  // };

  // const handleChange = (value: string) => {
  //   console.log(value);
  // };

  const handleIsConfirmChange = (value: string) => {
    setConfirmValue(value);
  };

  const handleIsConfirmComplete = (value: string) => {
    setConfirmValue(value);
  };

  const isLoading = false;

  return (
    <div>
      {/* <form onSubmit={handleSubmit(onSubmit)}> */}
      <div className="mx-auto mt-10 max-w-xs">
        <div className="mb-2 flex items-end justify-end">
          <Link href="/profile-settings/forgot-pin">
            <a className="text-[14px] text-[#4C1961]">Forgot Pin</a>
          </Link>
        </div>
      </div>
      {/* <form action=""> */}

      <div className="mt-2">
        <label className="mx-auto block max-w-xs text-left text-sm">Enter old pin</label>
        <div className="mx-auto flex max-w-xs justify-between gap-4">
          <div className="pin-input-container mx-auto flex w-full max-w-[297px] justify-between gap-4 text-xl text-white">
            <PinInput
              secret={oldPinMask}
              length={4}
              initialValue="o"
              onChange={handleIsConfirmChange}
              type="numeric"
              inputMode="number"
              style={{ paddingTop: '10px', paddingBottom: '10px' }}
              inputStyle={{
                marginRight: '10px',
                background: '#15171D',
                borderRadius: '4px',
                borderColor: '#000',
              }}
              inputFocusStyle={{ borderColor: '#4C1961' }}
              onComplete={handleIsConfirmComplete}
              autoSelect={false}
            />
          </div>
          <button onClick={toggleOldPinMask as React.MouseEventHandler<HTMLButtonElement>}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.8"
                d="M17.7087 7.62604C15.7837 4.60104 12.967 2.85938 10.0003 2.85938C8.51699 2.85938 7.07533 3.29271 5.75866 4.10104C4.44199 4.91771 3.25866 6.10937 2.29199 7.62604C1.45866 8.93437 1.45866 11.0594 2.29199 12.3677C4.21699 15.401 7.03366 17.1344 10.0003 17.1344C11.4837 17.1344 12.9253 16.701 14.242 15.8927C15.5587 15.076 16.742 13.8844 17.7087 12.3677C18.542 11.0677 18.542 8.93437 17.7087 7.62604ZM10.0003 13.3677C8.13366 13.3677 6.63366 11.8594 6.63366 10.001C6.63366 8.14271 8.13366 6.63437 10.0003 6.63437C11.867 6.63437 13.367 8.14271 13.367 10.001C13.367 11.8594 11.867 13.3677 10.0003 13.3677Z"
                fill="#818181"
              />
              <path
                d="M10 7.61719C8.69167 7.61719 7.625 8.68385 7.625 10.0005C7.625 11.3089 8.69167 12.3755 10 12.3755C11.3083 12.3755 12.3833 11.3089 12.3833 10.0005C12.3833 8.69219 11.3083 7.61719 10 7.61719Z"
                fill="#818181"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="mt-2">
        <label className="mx-auto block max-w-xs text-left text-sm">Enter new pin</label>
        <div className="mx-auto flex max-w-xs justify-between gap-4">
          <div className="pin-input-container mx-auto flex w-full max-w-[297px] justify-between gap-4 text-xl text-white">
            <PinInput
              secret={newPinMask}
              length={4}
              initialValue="o"
              onChange={handleIsConfirmChange}
              type="numeric"
              inputMode="number"
              style={{ paddingTop: '10px', paddingBottom: '10px' }}
              inputStyle={{
                marginRight: '10px',
                background: '#15171D',
                borderRadius: '4px',
                borderColor: '#000',
              }}
              inputFocusStyle={{ borderColor: '#4C1961' }}
              onComplete={handleIsConfirmComplete}
              autoSelect={false}
            />
          </div>
          <button onClick={togglenewPinMask as React.MouseEventHandler<HTMLButtonElement>}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.8"
                d="M17.7087 7.62604C15.7837 4.60104 12.967 2.85938 10.0003 2.85938C8.51699 2.85938 7.07533 3.29271 5.75866 4.10104C4.44199 4.91771 3.25866 6.10937 2.29199 7.62604C1.45866 8.93437 1.45866 11.0594 2.29199 12.3677C4.21699 15.401 7.03366 17.1344 10.0003 17.1344C11.4837 17.1344 12.9253 16.701 14.242 15.8927C15.5587 15.076 16.742 13.8844 17.7087 12.3677C18.542 11.0677 18.542 8.93437 17.7087 7.62604ZM10.0003 13.3677C8.13366 13.3677 6.63366 11.8594 6.63366 10.001C6.63366 8.14271 8.13366 6.63437 10.0003 6.63437C11.867 6.63437 13.367 8.14271 13.367 10.001C13.367 11.8594 11.867 13.3677 10.0003 13.3677Z"
                fill="#818181"
              />
              <path
                d="M10 7.61719C8.69167 7.61719 7.625 8.68385 7.625 10.0005C7.625 11.3089 8.69167 12.3755 10 12.3755C11.3083 12.3755 12.3833 11.3089 12.3833 10.0005C12.3833 8.69219 11.3083 7.61719 10 7.61719Z"
                fill="#818181"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="mt-2">
        <label className="mx-auto block max-w-xs text-left text-sm">Confirm new pin</label>
        <div className="mx-auto flex max-w-xs justify-between gap-4">
          <div className="pin-input-container mx-auto flex w-full max-w-[297px] justify-between gap-4 text-xl text-white">
            <PinInput
              secret={confirmPinMask}
              length={4}
              initialValue="o"
              onChange={handleIsConfirmChange}
              type="numeric"
              inputMode="number"
              style={{ paddingTop: '10px', paddingBottom: '10px' }}
              inputStyle={{
                marginRight: '10px',
                background: '#15171D',
                borderRadius: '4px',
                borderColor: '#000',
              }}
              inputFocusStyle={{ borderColor: '#4C1961' }}
              onComplete={handleIsConfirmComplete}
              autoSelect={false}
            />
          </div>
          <button onClick={toggleConfirmPinMask as React.MouseEventHandler<HTMLButtonElement>}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.8"
                d="M17.7087 7.62604C15.7837 4.60104 12.967 2.85938 10.0003 2.85938C8.51699 2.85938 7.07533 3.29271 5.75866 4.10104C4.44199 4.91771 3.25866 6.10937 2.29199 7.62604C1.45866 8.93437 1.45866 11.0594 2.29199 12.3677C4.21699 15.401 7.03366 17.1344 10.0003 17.1344C11.4837 17.1344 12.9253 16.701 14.242 15.8927C15.5587 15.076 16.742 13.8844 17.7087 12.3677C18.542 11.0677 18.542 8.93437 17.7087 7.62604ZM10.0003 13.3677C8.13366 13.3677 6.63366 11.8594 6.63366 10.001C6.63366 8.14271 8.13366 6.63437 10.0003 6.63437C11.867 6.63437 13.367 8.14271 13.367 10.001C13.367 11.8594 11.867 13.3677 10.0003 13.3677Z"
                fill="#818181"
              />
              <path
                d="M10 7.61719C8.69167 7.61719 7.625 8.68385 7.625 10.0005C7.625 11.3089 8.69167 12.3755 10 12.3755C11.3083 12.3755 12.3833 11.3089 12.3833 10.0005C12.3833 8.69219 11.3083 7.61719 10 7.61719Z"
                fill="#818181"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* </form> */}

      <div>
        <SuccessModal
          isModalOpen={isSuccessModalOpen}
          closeModal={closeSuccessModal}
          title={'Success'}
          content={'Your transaction pin has been created successfully'}
          link={'/dashboard'}
        />
        <div className="mt-[16px] md:mt-[36px]">
          <button
            type="button"
            onClick={() => openSuccessModal()}
            className="mx-auto mb-3 mt-[14px] block w-full space-x-2 rounded-lg bg-gradient-to-r from-wise-purple-dark to-wise-purple-light px-[74px] py-3 text-base font-medium text-white transition duration-500 ease-in-out hover:scale-[1.02] focus:outline-none
              focus:ring-2 focus:ring-wise-purple-light focus:ring-opacity-30 focus:ring-offset-2 focus:ring-offset-white active:scale-[0.95] disabled:cursor-not-allowed disabled:opacity-70 "
          >
            {isLoading && <span>Loading</span>}
            {!isLoading && <span>Reset</span>}
          </button>
        </div>
        <p className="m mx-auto mb-4 mt-[20px] px-3 text-center text-[14px] text-[#373737] text-opacity-70 ">
          Need help? <span className="font-bold text-[#4C1961]">Contact Support</span>
        </p>
      </div>
      {/* </form> */}
    </div>
  );
};
