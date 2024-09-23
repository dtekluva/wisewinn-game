/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler, Controller, useWatch } from 'react-hook-form';
import { AxiosError } from 'axios';
import { InputError, InputField } from '@/components/form';
import {
  useResendPhoneNumberSignUpOtp,
  useVerifyPhoneNumberOtp,
  useVerifyPhoneNumberSignUp,
} from '@/features/auth';
import { formatAxiosErrorMessage, launchNotification } from '@/utils';
import { useModalControl, useNotificationModalControl } from '@/hooks';
import { Button, Modal, ModalCloseButton, NotificationModal } from '@/components/elements';
import PinInput from 'react-pin-input';
import clsx from 'clsx';

interface VerifyPhoneNumberSignUpModalProps {
  isVerifyPhoneNumberModal: boolean;
  closeVerifyPhoneNumberModal: () => void;
  onSuccess: () => void;
  phoneNumber: string | undefined;
  ussdCode: string | undefined;
}

export const VerifyPhoneNumberSignUpModal: React.FunctionComponent<
  VerifyPhoneNumberSignUpModalProps
> = ({
  isVerifyPhoneNumberModal,
  closeVerifyPhoneNumberModal,
  onSuccess,
  phoneNumber,
  ussdCode,
}) => {
  type OtpValues = {
    phone_number: string;
    code: string;
  };

  type PasswordValues = {
    phone_number: string;
    password: string;
    confirm_password: string;
  };

  // Initialize a boolean state
  const [passwordShown, setPasswordShown] = React.useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = React.useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const toggleConfirmPassword = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  const {
    message: errorModalMessage,
    isModalOpen: isErrorModalOpen,
    closeModal: closeErrorModal,
    openModal: openErrorModal,
  } = useNotificationModalControl();

  const {
    isModalOpen: isResendOtpModal,
    closeModal: closeResendOtpModal,
    openModal: openOtpModal,
  } = useModalControl();

  //FIRST STEP FORM
  const {
    handleSubmit: handleSubmitForOtp,
    formState: { errors: errorsForOtp },
    control: controlForOtp,
    setValue: setValueForOtp,
  } = useForm<OtpValues>({
    mode: 'onTouched',
  });

  //SECOND STEP FORM

  const {
    register: registerForPassword,
    handleSubmit: handleSubmitForPassword,
    watch: watchPassword,
    formState: { errors: errorsForPassword },
  } = useForm<PasswordValues>({
    mode: 'onTouched',
  });
  const { code, phone_number } = useWatch({
    control: controlForOtp,
  });

  const PHONE_NUMBER = phoneNumber;

  useEffect(() => {
    setValueForOtp('phone_number', PHONE_NUMBER || '0');
  }, [PHONE_NUMBER, setValueForOtp]);

  //FIRST STEP OF ONBOARDING (OTP)
  const [openPassword, setOpenPassword] = useState(false);
  const [otpInputState, setOtpInputState] = useState(false);

  const { mutate: postVerifyOtp } = useVerifyPhoneNumberOtp();

  const onSubmitOtp = () => {
    const data = {
      code,
      phone_number,
    };
    postVerifyOtp(data, {
      onSuccess: () => {
        setOpenPassword(true);
        setOtpInputState(true);
      },

      onError: (error: any) => {
        setOpenPassword(false);
        setOtpInputState(false);
        const errorMessage = formatAxiosErrorMessage(error as AxiosError);
        openErrorModal(errorMessage as string);
      },
    });
  };

  useEffect(() => {
    if (code?.length == 6) {
      onSubmitOtp();
    }
  }, [code]);
  //END OF FIRST STEP OF ONBOARDING (OTP)

  //SECOND STEP OF ONBOARDING PASSWORD ENTRY (PASSWORD)
  const { mutate: postActivatePhoneNumberSignUp, isLoading } = useVerifyPhoneNumberSignUp();

  const onSubmitPassword: SubmitHandler<PasswordValues> = data => {
    data = {
      ...data,
      phone_number: PHONE_NUMBER || '',
    };
    postActivatePhoneNumberSignUp(data, {
      onSuccess: () => {
        onSuccess();
      },

      onError: (error: any) => {
        const errorMessage = formatAxiosErrorMessage(error as AxiosError);
        openErrorModal(errorMessage as string);
      },
    });
  };

  //RESEND OTP (OPTIONS- SMS,VOICE)
  const { mutate: postResendPhoneNumberSignUpOtp, isLoading: resendOtpLoading } =
    useResendPhoneNumberSignUpOtp();

  const resendActivationSubmit = (otp_option: string) => {
    const data = {
      phone_number: PHONE_NUMBER || '',
      otp_option,
    };
    postResendPhoneNumberSignUpOtp(data, {
      onSuccess: ({ data }) => {
        launchNotification('success', data.message);
        closeResendOtpModal();
      },

      onError: error => {
        const errorMessage = formatAxiosErrorMessage(error as AxiosError);
        openErrorModal(errorMessage as string);
      },
    });
  };
  //END OF RESEND OTP (OPTIONS- SMS,VOICE)

  return (
    <>
      <Modal
        label="Verify Form"
        isModalOpen={isVerifyPhoneNumberModal}
        closeModal={closeVerifyPhoneNumberModal}
        width="453px"
        className="border-[0.5px] border-[#00E2C6] p-9 pb-[73px] text-center"
      >
        <NotificationModal
          headingText={errorModalMessage}
          label={errorModalMessage}
          type="error"
          allowDismiss
          closeModal={closeErrorModal}
          isModalOpen={isErrorModalOpen}
        />
        <div className="flex justify-end">
          <div aria-label="button" onClick={() => closeVerifyPhoneNumberModal()}>
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
        <div className="flex flex-col items-center text-white">
          <h2
            className={clsx(
              'my-2 text-2xl font-semibold',
              otpInputState ? 'text-[#818181]' : '#fff',
            )}
          >
            Verify Phone Number
          </h2>
          <p className="text-center text-sm text-[#818181]">
            Please enter the OTP code sent to your Phone Number{' '}
            <span className={otpInputState ? 'text-[#818181]' : 'text-white'}>
              {PHONE_NUMBER || '081xxxxxxxxx'}
            </span>{' '}
            to complete your game play and registration.
          </p>
        </div>
        <form onSubmit={handleSubmitForOtp(onSubmitOtp)}>
          <div className="mt-2 w-full">
            <div className="flex w-full flex-row justify-center ">
              <div className="winning_wallet_transfer pin-input-container flex w-full justify-center text-xl text-white">
                <Controller
                  control={controlForOtp}
                  name="code"
                  rules={{ required: true }}
                  render={({ field: { onChange } }) => (
                    <PinInput
                      secret={false}
                      length={6}
                      initialValue="o"
                      onChange={onChange}
                      disabled={otpInputState}
                      type="numeric"
                      inputMode="number"
                      style={{
                        paddingTop: '10px',
                        paddingBottom: '10px',
                        color: otpInputState ? '#818181' : '#fff',
                      }}
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
                {errorsForOtp.code && <InputError text="This field is required" />}
              </div>
              <div className="relative flex w-full flex-row items-center justify-between text-xs ">
                <p className="text-white "></p>
                <button
                  type="button"
                  onClick={() => openOtpModal()}
                  className="mr-0 block font-semibold text-[#B500FF] md:mr-4
"
                >
                  Resend OTP
                </button>
              </div>
            </div>
          </div>
        </form>

        <p className="my-2 text-left text-sm">
          Did not get an OTP code?
          <br /> Dial{' '}
          <span className="text-white-500 text-base font-bold md:text-lg">{ussdCode} </span> on your
          registered phone number to receive one.
        </p>

        {openPassword ? (
          <form onSubmit={handleSubmitForPassword(onSubmitPassword)}>
            <div className="create_password_section mt-6 ">
              <div className="text center">
                <h2 className="font-clash text-2xl text-white ">Create Password</h2>
                <p className="text-sm text-[#818181]">This password will be used for your logins</p>
              </div>

              <div className="mt-5">
                <div className="flex rounded-md !bg-[#15171D] p-0 pr-3">
                  <InputField
                    className="!bg-[#15171D] text-white"
                    id="password"
                    type={passwordShown ? 'text' : 'password'}
                    label="Password"
                    placeholder="Password"
                    registration={registerForPassword('password', {
                      required: true,
                    })}
                  />
                  <button onClick={togglePassword} type="button">
                    {passwordShown ? (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.8"
                          d="M17.7083 7.62503C17.3 6.97503 16.8333 6.3917 16.35 5.8667L13.2083 9.00837C13.3083 9.3167 13.3667 9.65003 13.3667 10C13.3667 11.8667 11.8583 13.3667 10 13.3667C9.65 13.3667 9.31667 13.3084 9.00833 13.2084L6.125 16.0917C7.34167 16.775 8.65833 17.1334 10 17.1334C11.4833 17.1334 12.925 16.7 14.2417 15.8917C15.5583 15.075 16.7417 13.8834 17.7083 12.3667C18.5417 11.0667 18.5417 8.93337 17.7083 7.62503Z"
                          fill="#818181"
                        />
                        <path
                          d="M11.6829 8.3167L8.31621 11.6834C7.89121 11.25 7.61621 10.65 7.61621 10C7.61621 8.6917 8.68288 7.6167 9.99954 7.6167C10.6495 7.6167 11.2495 7.8917 11.6829 8.3167Z"
                          fill="#818181"
                        />
                        <path
                          opacity="0.8"
                          d="M15.2087 4.79173L12.3837 7.61673C11.7753 7.00007 10.9337 6.6334 10.0003 6.6334C8.13366 6.6334 6.63366 8.14173 6.63366 10.0001C6.63366 10.9334 7.00866 11.7751 7.61699 12.3834L4.80033 15.2084H4.79199C3.86699 14.4584 3.01699 13.5001 2.29199 12.3667C1.45866 11.0584 1.45866 8.9334 2.29199 7.62506C3.25866 6.1084 4.44199 4.91673 5.75866 4.10007C7.07533 3.30007 8.51699 2.8584 10.0003 2.8584C11.8587 2.8584 13.6587 3.54173 15.2087 4.79173Z"
                          fill="#818181"
                        />
                        <path
                          d="M12.3834 10.0001C12.3834 11.3084 11.3167 12.3834 10.0001 12.3834C9.95007 12.3834 9.9084 12.3834 9.8584 12.3667L12.3667 9.8584C12.3834 9.9084 12.3834 9.95007 12.3834 10.0001Z"
                          fill="#818181"
                        />
                        <path
                          d="M18.1417 1.8584C17.8917 1.6084 17.4834 1.6084 17.2334 1.8584L1.8584 17.2417C1.6084 17.4917 1.6084 17.9001 1.8584 18.1501C1.9834 18.2667 2.14173 18.3334 2.3084 18.3334C2.47507 18.3334 2.6334 18.2667 2.7584 18.1417L18.1417 2.7584C18.4001 2.5084 18.4001 2.1084 18.1417 1.8584Z"
                          fill="#818181"
                        />
                      </svg>
                    ) : (
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
                    )}
                  </button>
                </div>

                {errorsForPassword.password && (
                  <InputError
                    text={errorsForPassword.password.message || 'This field is required'}
                  />
                )}
              </div>
              <div className="mt-5">
                <div className="flex rounded-md !bg-[#15171D] p-0 pr-3">
                  <InputField
                    className="!bg-[#15171D] text-white"
                    id="confirm_password"
                    type={confirmPasswordShown ? 'text' : 'password'}
                    label="Password"
                    placeholder="Confirm Password"
                    registration={registerForPassword('confirm_password', {
                      required: true,
                      validate: (val: string) => {
                        if (watchPassword('password') != val) {
                          return 'Your passwords do no match';
                        }
                      },
                    })}
                  />
                  <button onClick={toggleConfirmPassword} type="button">
                    {confirmPasswordShown ? (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.8"
                          d="M17.7083 7.62503C17.3 6.97503 16.8333 6.3917 16.35 5.8667L13.2083 9.00837C13.3083 9.3167 13.3667 9.65003 13.3667 10C13.3667 11.8667 11.8583 13.3667 10 13.3667C9.65 13.3667 9.31667 13.3084 9.00833 13.2084L6.125 16.0917C7.34167 16.775 8.65833 17.1334 10 17.1334C11.4833 17.1334 12.925 16.7 14.2417 15.8917C15.5583 15.075 16.7417 13.8834 17.7083 12.3667C18.5417 11.0667 18.5417 8.93337 17.7083 7.62503Z"
                          fill="#818181"
                        />
                        <path
                          d="M11.6829 8.3167L8.31621 11.6834C7.89121 11.25 7.61621 10.65 7.61621 10C7.61621 8.6917 8.68288 7.6167 9.99954 7.6167C10.6495 7.6167 11.2495 7.8917 11.6829 8.3167Z"
                          fill="#818181"
                        />
                        <path
                          opacity="0.8"
                          d="M15.2087 4.79173L12.3837 7.61673C11.7753 7.00007 10.9337 6.6334 10.0003 6.6334C8.13366 6.6334 6.63366 8.14173 6.63366 10.0001C6.63366 10.9334 7.00866 11.7751 7.61699 12.3834L4.80033 15.2084H4.79199C3.86699 14.4584 3.01699 13.5001 2.29199 12.3667C1.45866 11.0584 1.45866 8.9334 2.29199 7.62506C3.25866 6.1084 4.44199 4.91673 5.75866 4.10007C7.07533 3.30007 8.51699 2.8584 10.0003 2.8584C11.8587 2.8584 13.6587 3.54173 15.2087 4.79173Z"
                          fill="#818181"
                        />
                        <path
                          d="M12.3834 10.0001C12.3834 11.3084 11.3167 12.3834 10.0001 12.3834C9.95007 12.3834 9.9084 12.3834 9.8584 12.3667L12.3667 9.8584C12.3834 9.9084 12.3834 9.95007 12.3834 10.0001Z"
                          fill="#818181"
                        />
                        <path
                          d="M18.1417 1.8584C17.8917 1.6084 17.4834 1.6084 17.2334 1.8584L1.8584 17.2417C1.6084 17.4917 1.6084 17.9001 1.8584 18.1501C1.9834 18.2667 2.14173 18.3334 2.3084 18.3334C2.47507 18.3334 2.6334 18.2667 2.7584 18.1417L18.1417 2.7584C18.4001 2.5084 18.4001 2.1084 18.1417 1.8584Z"
                          fill="#818181"
                        />
                      </svg>
                    ) : (
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
                    )}
                  </button>
                </div>
                {errorsForPassword.confirm_password && (
                  <InputError
                    text={errorsForPassword?.confirm_password?.message || 'This field is required'}
                  />
                )}
              </div>

              <div>
                <div className="mt-[16px] md:mt-[36px]">
                  <Button type="submit" centered className="w-full" disabled={isLoading}>
                    {isLoading && <span>Loading</span>}
                    {!isLoading && <span>Continue to Login</span>}
                  </Button>
                </div>

                <p className="m mx-auto mb-4 mt-[20px] px-3 text-center text-[14px] text-[#373737] text-opacity-70 ">
                  Need help? <span className="font-bold text-[#4C1961]">Contact Support</span>
                </p>
              </div>
            </div>
          </form>
        ) : null}
      </Modal>

      <Modal
        label="Resend Otp Form"
        isModalOpen={isResendOtpModal}
        closeModal={closeResendOtpModal}
        width="453px"
        className="border-[0.5px] border-[#00E2C6] p-9  pb-[53px] text-center"
      >
        <ModalCloseButton onClick={closeResendOtpModal} className="absolute right-4 !mb-0 " />

        <div className="mb-4">
          <h2 className="text-center text-lg font-semibold md:text-xl ">Didn't receive OTP? </h2>
          <p className=" mx-auto max-w-[80%] text-sm text-[#818181] md:text-lg">
            Select from the options below to resend OTP
          </p>
        </div>

        <div className="">
          <button
            onClick={() => resendActivationSubmit('SMS')}
            disabled={resendOtpLoading}
            className="flex w-full flex-row items-center justify-start rounded-lg bg-[#fff]/20 px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="12" fill="white" />
                <path
                  d="M5.75 12.6062V8.86875C5.75 7.14375 7.15 5.75 8.875 5.75H15.125C16.85 5.75 18.25 7.14375 18.25 8.86875V13.2313C18.25 14.95 16.85 16.3438 15.125 16.3438H14.1875C13.9937 16.3438 13.8062 16.4375 13.6875 16.5938L12.75 17.8375C12.3375 18.3875 11.6625 18.3875 11.25 17.8375L10.3125 16.5938C10.2125 16.4563 9.9875 16.3438 9.8125 16.3438H8.875C7.15 16.3438 5.75 14.95 5.75 13.2313V12.6062Z"
                  fill="#4C1961"
                />
                <path
                  d="M12 12C11.65 12 11.375 11.7187 11.375 11.375C11.375 11.0312 11.6562 10.75 12 10.75C12.3438 10.75 12.625 11.0312 12.625 11.375C12.625 11.7187 12.35 12 12 12Z"
                  fill="white"
                />
                <path
                  d="M14.5 12C14.15 12 13.875 11.7187 13.875 11.375C13.875 11.0312 14.1562 10.75 14.5 10.75C14.8438 10.75 15.125 11.0312 15.125 11.375C15.125 11.7187 14.85 12 14.5 12Z"
                  fill="white"
                />
                <path
                  d="M9.5 12C9.15 12 8.875 11.7187 8.875 11.375C8.875 11.0312 9.15625 10.75 9.5 10.75C9.84375 10.75 10.125 11.0312 10.125 11.375C10.125 11.7187 9.85 12 9.5 12Z"
                  fill="white"
                />
              </svg>
            </span>

            <span className="ml-4 text-sm lg:text-base">Receive OTP via SMS</span>
          </button>

          <button
            onClick={() => resendActivationSubmit('VOICE')}
            disabled={resendOtpLoading}
            className="disabled:opacity-50: mt-4 flex w-full flex-row items-center justify-start rounded-lg bg-[#fff]/20 px-4 py-2 disabled:cursor-not-allowed"
          >
            <span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="12" fill="white" />
                <path
                  d="M11.8687 13.3812L9.825 15.425C9.6 15.225 9.38125 15.0187 9.16875 14.8062C8.525 14.1562 7.94375 13.475 7.425 12.7625C6.9125 12.05 6.5 11.3375 6.2 10.6312C5.9 9.91875 5.75 9.2375 5.75 8.5875C5.75 8.1625 5.825 7.75625 5.975 7.38125C6.125 7 6.3625 6.65 6.69375 6.3375C7.09375 5.94375 7.53125 5.75 7.99375 5.75C8.16875 5.75 8.34375 5.7875 8.5 5.8625C8.6625 5.9375 8.80625 6.05 8.91875 6.2125L10.3687 8.25625C10.4812 8.4125 10.5625 8.55625 10.6187 8.69375C10.675 8.825 10.7062 8.95625 10.7062 9.075C10.7062 9.225 10.6625 9.375 10.575 9.51875C10.4937 9.6625 10.375 9.8125 10.225 9.9625L9.75 10.4562C9.68125 10.525 9.65 10.6062 9.65 10.7062C9.65 10.7562 9.65625 10.8 9.66875 10.85C9.6875 10.9 9.70625 10.9375 9.71875 10.975C9.83125 11.1812 10.025 11.45 10.3 11.775C10.5812 12.1 10.8812 12.4312 11.2062 12.7625C11.4312 12.9812 11.65 13.1937 11.8687 13.3812Z"
                  fill="#4C1961"
                />
                <path
                  d="M18.2312 15.9566C18.2312 16.1316 18.2 16.3129 18.1375 16.4879C18.1187 16.5379 18.1 16.5879 18.075 16.6379C17.9687 16.8629 17.8312 17.0754 17.65 17.2754C17.3437 17.6129 17.0062 17.8566 16.625 18.0129C16.6187 18.0129 16.6125 18.0191 16.6062 18.0191C16.2375 18.1691 15.8375 18.2504 15.4062 18.2504C14.7687 18.2504 14.0875 18.1004 13.3687 17.7941C12.65 17.4879 11.9312 17.0754 11.2187 16.5566C10.975 16.3754 10.7312 16.1941 10.5 16.0004L12.5437 13.9566C12.7187 14.0879 12.875 14.1879 13.0062 14.2566C13.0375 14.2691 13.075 14.2879 13.1187 14.3066C13.1687 14.3254 13.2187 14.3316 13.275 14.3316C13.3812 14.3316 13.4625 14.2941 13.5312 14.2254L14.0062 13.7566C14.1625 13.6004 14.3125 13.4816 14.4562 13.4066C14.6 13.3191 14.7437 13.2754 14.9 13.2754C15.0187 13.2754 15.1437 13.3004 15.2812 13.3566C15.4187 13.4129 15.5625 13.4941 15.7187 13.6004L17.7875 15.0691C17.95 15.1816 18.0625 15.3129 18.1312 15.4691C18.1937 15.6254 18.2312 15.7816 18.2312 15.9566Z"
                  fill="#4C1961"
                />
              </svg>
            </span>

            <span className="ml-4 text-sm lg:text-base">Recieve OTP via Voice call</span>
          </button>
        </div>
      </Modal>
    </>
  );
};
