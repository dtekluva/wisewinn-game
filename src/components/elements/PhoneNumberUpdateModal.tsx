import * as React from 'react';
import type { AxiosError } from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Modal, ModalCloseButton, NotificationModal } from '@/components/elements';
import { InputError, InputField } from '@/components/form';
import { useUpdatePhoneNumber } from '@/features/dashboard';
import { formatAxiosErrorMessage } from '@/utils';
import { useNotificationModalControl } from '@/hooks';
import { useRouter } from 'next/router';

interface PhoneNumberUpdateModalProps {
  isPhoneNumberModalOpen: boolean;
  closePhoneNumberModal: () => void;
}

type PhoneNumberFormValues = {
  phone_number: string;
};

export const PhoneNumberUpdateModal: React.FunctionComponent<PhoneNumberUpdateModalProps> = ({
  isPhoneNumberModalOpen,
  closePhoneNumberModal,
}) => {
  const router = useRouter();

  const { mutate: updatePhoneNumber, isLoading } = useUpdatePhoneNumber();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PhoneNumberFormValues>({ mode: 'onTouched' });

  const {
    message: errorModalMessage,
    isModalOpen: isErrorModalOpen,
    closeModal: closeErrorModal,
    openModal: openErrorModal,
  } = useNotificationModalControl();

  const source = router.pathname;

  const onSubmitPhoneNumber: SubmitHandler<PhoneNumberFormValues> = ({ phone_number }) => {
    updatePhoneNumber(
      { phone_number },
      {
        onSuccess: ({ data }) => {
          reset();
          router.push(
            `/profile-settings/phone-update-otp?phone_number=${phone_number}&ussd_code=${encodeURIComponent(
              data?.ussd_code,
            )}`,
          );
        },

        onError: error => {
          const errorResponse = error as AxiosError;

          if (errorResponse?.response?.status === 401) {
            router.push(`/user/login?source=${source}`);
            return;
          }

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
            Enter the new phone number{' '}
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
        </form>
      </Modal>
    </>
  );
};
