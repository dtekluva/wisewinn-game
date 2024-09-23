import * as React from 'react';
import type { AxiosError } from 'axios';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';

import {
  Button,
  Modal,
  ModalCloseButton,
  NotificationModal,
  VerifyPhoneNumberSignUpModal,
} from '@/components/elements';
import { InputError, InputField } from '@/components/form';
// import { useUpdateUser } from '@/features/dashboard';
import { formatAxiosErrorMessage } from '@/utils';

import { useModalControl, useNotificationModalControl } from '@/hooks';
// import { useRouter } from 'next/router';
import { usePhoneNumberSignUp } from '@/features/auth';
import Link from 'next/link';

interface PhoneNumberUpdateModalProps {
  isPhoneNumberModalOpen: boolean;
  closePhoneNumberModal: () => void;
  onSuccess: () => void;
}

type PhoneNumberFormValues = {
  phone_number: string;
};

export const PhoneNumberSignUpModal: React.FunctionComponent<PhoneNumberUpdateModalProps> = ({
  onSuccess,
  isPhoneNumberModalOpen,
  closePhoneNumberModal,
}) => {
  const [ussdCode, setUssdCode] = React.useState('');

  const { mutate: signUpPhoneNumber, data, isLoading } = usePhoneNumberSignUp();
  const ussd_code = data?.data?.ussd_code;

  React.useEffect(() => {
    setUssdCode(ussd_code);
  }, [ussd_code]);

  const {
    register,
    handleSubmit,
    // reset,
    control,
    formState: { errors },
  } = useForm<PhoneNumberFormValues>({ mode: 'onTouched' });

  const { phone_number } = useWatch({
    control,
  });
  const {
    message: errorModalMessage,
    isModalOpen: isErrorModalOpen,
    closeModal: closeErrorModal,
    openModal: openErrorModal,
  } = useNotificationModalControl();

  const {
    isModalOpen: isVerifyPhoneNumberModal,
    closeModal: closeVerifyPhoneNumberModal,
    openModal: openVerifyPhoneNumberModal,
  } = useModalControl();

  const onSubmitPhoneNumber: SubmitHandler<PhoneNumberFormValues> = ({ phone_number }) => {
    signUpPhoneNumber(
      { phone_number },
      {
        onSuccess: () => {
          openVerifyPhoneNumberModal();
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
        isModalOpen={isPhoneNumberModalOpen}
        closeModal={closePhoneNumberModal}
        width="465px"
      >
        <header className=" flex flex-row items-start justify-between py-4 text-sm">
          <h1 className="mb-4 w-[80%] font-clash text-xl md:w-[85%]">
            Please enter your phone number to continue
          </h1>

          <ModalCloseButton onClick={closePhoneNumberModal} className="!mb-0" />
        </header>

        <form onSubmit={handleSubmit(onSubmitPhoneNumber)}>
          <p className="py-1 text-left text-sm font-medium text-white">Phone Number</p>
          <InputField
            id="phoneNumber"
            type="tel"
            label="phoneNumber"
            registration={register('phone_number', {
              required: true,
            })}
            className="!bg-gray-900"
          />
          {errors.phone_number && <InputError text="This field is required" />}

          <div className="mt-[16px] md:mt-[36px]">
            <Button type="submit" centered className="w-full" disabled={isLoading}>
              {isLoading && <span>Loading</span>}
              {!isLoading && <span>Submit</span>}
            </Button>
          </div>

          <p className="my-2 text-center text-[12px] text-white">
            Already signed up?
            <Link href="/user/login">
              <a className="text-[12px] font-semibold text-[#B500FF]"> Sign in </a>
            </Link>
          </p>
        </form>
      </Modal>

      <VerifyPhoneNumberSignUpModal
        phoneNumber={phone_number}
        ussdCode={ussdCode}
        isVerifyPhoneNumberModal={isVerifyPhoneNumberModal}
        closeVerifyPhoneNumberModal={closeVerifyPhoneNumberModal}
        onSuccess={onSuccess}
      />
    </>
  );
};
