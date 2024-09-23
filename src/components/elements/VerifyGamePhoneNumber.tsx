import * as React from 'react';
import type { AxiosError } from 'axios';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import {
  Button,
  FullPageLoader,
  Modal,
  ModalCloseButton,
  NotificationModal,
} from '@/components/elements';
import { InputError } from '@/components/form';
import { formatAxiosErrorMessage } from '@/utils';
import { useNotificationModalControl } from '@/hooks';
import PinInput from 'react-pin-input';
import { useGetVerifyGamePhoneNumber, usePostVerifyPhoneNumber } from '@/features/auth';

interface PhoneNumberUpdateModalProps {
  onSuccess: (bank_code?: string) => void;
  isVerifyPhoneNumber: boolean;
  closeVerifyPhoneNumber: () => void;
}

type PhoneNumberFormValues = {
  code: string;
};

export const VerifyGamePhoneNumber: React.FunctionComponent<PhoneNumberUpdateModalProps> = ({
  onSuccess,
  isVerifyPhoneNumber,
  closeVerifyPhoneNumber,
}) => {
  const { data, isLoading } = useGetVerifyGamePhoneNumber(isVerifyPhoneNumber);

  const ussdCode = data?.ussd_code;

  const {
    // register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<PhoneNumberFormValues>({ mode: 'onTouched' });

  const {
    message: errorModalMessage,
    isModalOpen: isErrorModalOpen,
    closeModal: closeErrorModal,
    openModal: openErrorModal,
  } = useNotificationModalControl();

  const { mutate: postVerifyPhoneNumber, isLoading: isVerifyPhoneNumberLoading } =
    usePostVerifyPhoneNumber();

  const onSubmit: SubmitHandler<PhoneNumberFormValues> = ({ code }) => {
    postVerifyPhoneNumber(
      { code },
      {
        onSuccess: ({}) => {
          reset();
          onSuccess();
        },

        onError: error => {
          const errorResponse = error as AxiosError;
          const errorMessage = formatAxiosErrorMessage(errorResponse);
          openErrorModal(errorMessage as string);
        },
      },
    );
  };

  return (
    <>
      {<FullPageLoader /> && isLoading}
      <NotificationModal
        headingText={errorModalMessage}
        label={errorModalMessage}
        type="error"
        allowDismiss
        closeModal={closeErrorModal}
        isModalOpen={isErrorModalOpen}
      />

      <Modal
        label="Personal Information Modal"
        isModalOpen={isVerifyPhoneNumber}
        closeModal={closeVerifyPhoneNumber}
        width="465px"
      >
        <ModalCloseButton onClick={closeVerifyPhoneNumber} className="!mb-0" />

        <header className=" flex flex-row items-start justify-between py-4 text-sm">
          <h1 className=" w-full text-center font-clash text-xl ">
            Enter the OTP code sent to your Phone Number to complete Verification.{' '}
          </h1>
        </header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-2 w-full">
            <div className="flex w-full flex-row justify-center ">
              <div className="winning_wallet_transfer pin-input-container flex w-full justify-center text-xl text-white">
                <Controller
                  control={control}
                  name="code"
                  rules={{ required: true }}
                  render={({ field: { onChange } }) => (
                    <PinInput
                      secret={false}
                      length={6}
                      initialValue="o"
                      onChange={onChange}
                      type="numeric"
                      inputMode="number"
                      style={{ paddingTop: '10px', paddingBottom: '10px', color: 'white' }}
                      inputStyle={{
                        marginRight: '10px',
                        background: '#15171D',
                        borderRadius: '4px',
                        borderColor: '#000',
                      }}
                      inputFocusStyle={{ borderColor: '#4C1961' }}
                      autoSelect={false}
                    />
                  )}
                />
              </div>
            </div>
            <div className="w-full">
              <div className="text-left text-xs">
                {errors.code && <InputError text="This field is required" />}
              </div>
              <div className="relative flex w-full flex-row items-center justify-between text-xs ">
                <p className="text-white "></p>
                {/* <button
                  type="button"
                  onClick={() => ''}
                  className="mr-0 block font-thin text-[#B500FF] md:mr-4
"
                >
                  Resend OTP
                </button> */}
              </div>
            </div>
          </div>

          <div className="my-2 text-sm">
            <p className="my-2">Did not get an OTP code?</p>
            <p>
              {' '}
              Dial{' '}
              <span className="text-white-500 text-base font-bold md:text-lg">{ussdCode} </span> on
              your registered phone number to verify your account then attempt to buy ticket again .
            </p>
          </div>

          <p className="my-4 text-xs text-red-500">*This is a one-time verification process.</p>

          <Button type="submit" centered className="w-full" disabled={isLoading}>
            {isVerifyPhoneNumberLoading && <span>Loading</span>}
            {!isVerifyPhoneNumberLoading && <span>Continue</span>}
          </Button>
        </form>
      </Modal>
    </>
  );
};
