/* eslint-disable react/no-unescaped-entities */
import React from 'react';
// import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Modal } from '@/components/elements';
import { InputError, InputField } from '@/components/form';
import { useModalControl } from '@/hooks';
import { SuccessModal } from './SuccessModal';
import { useChangePassword } from '../api';

interface LoginModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
// interface SignupUSerProps {}
export type ChangePasswordValues = {
  old_password: string;
  new_password: string;
  confirm_password: string;
};

export const ResetPasswordModal: React.FunctionComponent<LoginModalProps> = ({
  isModalOpen,
  closeModal,
}) => {
  const {
    isModalOpen: isSuccessModalOpen,
    closeModal: closeSuccessModal,
    openModal: openSuccessModal,
  } = useModalControl();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordValues>({
    mode: 'onTouched',
  });
  //   const isLoading = false;

  // Initialize a boolean state
  const [oldPinShown, setOldPinShown] = React.useState(false);
  const [pinShown, setPinShown] = React.useState(false);
  const [confirmPinShown, setConfirmPinShown] = React.useState(false);

  const toggleOldPin = () => {
    setOldPinShown(!oldPinShown);
  };

  const togglePin = () => {
    setPinShown(!pinShown);
  };

  const toggleConfirmPin = () => {
    setConfirmPinShown(!confirmPinShown);
  };

  const { mutate: postChangePassword, isLoading } = useChangePassword();

  const onSubmit: SubmitHandler<ChangePasswordValues> = data => {
    postChangePassword(data, {
      onSuccess: () => {
        reset();
        openSuccessModal();
      },

      onError: error => {
        console.log(error);
        // const errorMessage = formatAxiosErrorMessage(error as AxiosError);
        // openErrorModal(errorMessage as string);
      },
    });
  };

  return (
    <Modal
      label="Create Account"
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      width="465px"
      className="bg-[#000410] pt-[20px] pb-[20px] text-center"
    >
      <div className="flex justify-end">
        <div aria-label="button" onClick={() => closeModal()}>
          {' '}
          <svg
            width="56"
            height="33"
            viewBox="0 0 56 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="56" height="33" rx="5" fill="#FFE1E1" />
            <path
              d="M29.1393 16.2349L33.3107 20.7067M24.9678 20.7067L29.1393 16.2349L24.9678 20.7067ZM33.3107 11.7631L29.1385 16.2349L33.3107 11.7631ZM29.1385 16.2349L24.9678 11.7631L29.1385 16.2349Z"
              stroke="#FF0000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div
        className="flex flex-col items-center justify-center rounded-[10px] bg-[#000410] p-2 
          md:bg-[#000410] "
      >
        <div className="w-full">
          <div className="mt-[28px]">
            <h1 className="text-center font-clash text-[30px] font-normal text-white">
              Reset Password
            </h1>
            <p className="text-center text-[14px] font-extralight text-[#818181]">
              Fill the inputs below to reset password
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-5">
              <div className="flex rounded-md border-transparent !bg-[#15171D] p-0 pr-3">
                <InputField
                  id="oldpassword"
                  type={oldPinShown ? 'text' : 'password'}
                  label="Enter old password"
                  placeholder="Enter current password"
                  registration={register('old_password', {
                    required: true,
                  })}
                  className="!bg-[#15171D]"
                />

                <button onClick={toggleOldPin} type="button">
                  <svg
                    width="22"
                    height="16"
                    viewBox="0 0 22 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.257 6.962C20.731 7.582 20.731 8.419 20.257 9.038C18.764 10.987 15.182 15 11 15C6.81801 15 3.23601 10.987 1.74301 9.038C1.51239 8.74113 1.38721 8.37592 1.38721 8C1.38721 7.62408 1.51239 7.25887 1.74301 6.962C3.23601 5.013 6.81801 1 11 1C15.182 1 18.764 5.013 20.257 6.962V6.962Z"
                      stroke="#6B6B6B"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11 11C12.6569 11 14 9.65685 14 8C14 6.34315 12.6569 5 11 5C9.34315 5 8 6.34315 8 8C8 9.65685 9.34315 11 11 11Z"
                      stroke="#6B6B6B"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              {errors.old_password && <InputError text="This field is required" />}
            </div>

            <div className="mt-[15px]">
              <div className="flex rounded-md border-transparent !bg-[#15171D] p-0 pr-3">
                <InputField
                  id="newPassword"
                  type={pinShown ? 'text' : 'password'}
                  label="Enter new password"
                  placeholder="Enter new password"
                  registration={register('new_password', {
                    required: true,
                  })}
                  className="!bg-[#15171D]"
                />

                <button onClick={togglePin} type="button">
                  <svg
                    width="22"
                    height="16"
                    viewBox="0 0 22 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.257 6.962C20.731 7.582 20.731 8.419 20.257 9.038C18.764 10.987 15.182 15 11 15C6.81801 15 3.23601 10.987 1.74301 9.038C1.51239 8.74113 1.38721 8.37592 1.38721 8C1.38721 7.62408 1.51239 7.25887 1.74301 6.962C3.23601 5.013 6.81801 1 11 1C15.182 1 18.764 5.013 20.257 6.962V6.962Z"
                      stroke="#6B6B6B"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11 11C12.6569 11 14 9.65685 14 8C14 6.34315 12.6569 5 11 5C9.34315 5 8 6.34315 8 8C8 9.65685 9.34315 11 11 11Z"
                      stroke="#6B6B6B"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              {errors.new_password && <InputError text="This field is required" />}
            </div>

            <div className="mt-[15px]">
              <div className="flex rounded-md border-transparent !bg-[#15171D] p-0 pr-3">
                <InputField
                  id="confirmPassword"
                  type={confirmPinShown ? 'text' : 'password'}
                  label="Confirm password"
                  placeholder="Confirm new password"
                  registration={register('confirm_password', {
                    required: true,
                    validate: (val: string) => {
                      if (watch('new_password') != val) {
                        return 'Your passwords do no match';
                      }
                    },
                  })}
                  className="!bg-[#15171D]"
                />

                <button onClick={toggleConfirmPin} type="button">
                  <svg
                    width="22"
                    height="16"
                    viewBox="0 0 22 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.257 6.962C20.731 7.582 20.731 8.419 20.257 9.038C18.764 10.987 15.182 15 11 15C6.81801 15 3.23601 10.987 1.74301 9.038C1.51239 8.74113 1.38721 8.37592 1.38721 8C1.38721 7.62408 1.51239 7.25887 1.74301 6.962C3.23601 5.013 6.81801 1 11 1C15.182 1 18.764 5.013 20.257 6.962V6.962Z"
                      stroke="#6B6B6B"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11 11C12.6569 11 14 9.65685 14 8C14 6.34315 12.6569 5 11 5C9.34315 5 8 6.34315 8 8C8 9.65685 9.34315 11 11 11Z"
                      stroke="#6B6B6B"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              {errors.confirm_password && <InputError text="This field is required" />}
            </div>
            <SuccessModal
              isModalOpen={isSuccessModalOpen}
              closeModal={closeSuccessModal}
              title={'Password reset successful'}
              content={'Your password has been reset successfully. Login to continue.'}
              link={'/dashboard'}
            />
            <div>
              <div className="mt-[16px] md:mt-[36px]">
                <button
                  onClick={() => openSuccessModal()}
                  className="mx-auto mb-3 mt-[14px] block w-full space-x-2 rounded-lg bg-gradient-to-r from-wise-purple-dark to-wise-purple-light px-[74px] py-3 text-base font-medium text-white transition duration-500 ease-in-out hover:scale-[1.02] focus:outline-none focus:ring-2
              focus:ring-wise-purple-light focus:ring-opacity-30 focus:ring-offset-2 focus:ring-offset-white active:scale-[0.95] disabled:cursor-not-allowed disabled:opacity-70 "
                >
                  {isLoading && <span>Loading</span>}
                  {!isLoading && <span>Reset password</span>}
                </button>
              </div>

              <p className="m mx-auto mb-10 mt-[20px] px-3 text-center text-[14px] text-[#818181] text-opacity-70 ">
                Need help? <span className="font-bold text-[#4C1961]">Contact Support</span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};
