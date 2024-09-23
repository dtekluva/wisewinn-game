/* eslint-disable react/no-unescaped-entities */
import { NotificationModal } from '@/components/elements';
import { InputField, InputError } from '@/components/form';
import { useEmailLogin } from '@/features/auth';
import { useNotificationModalControl } from '@/hooks';
import { formatAxiosErrorMessage } from '@/utils';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

export const EmailLogin: React.FunctionComponent = () => {
  type MessageFormValues = {
    email: string;
    password: string;
  };

  const {
    message: errorModalMessage,
    isModalOpen: isErrorModalOpen,
    closeModal: closeErrorModal,
    openModal: openErrorModal,
  } = useNotificationModalControl();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MessageFormValues>({
    mode: 'onTouched',
  });
  const router = useRouter();
  const { source } = router.query;
  const { mutate: postLogIn, isLoading } = useEmailLogin();
  const onSubmit: SubmitHandler<MessageFormValues> = data => {
    postLogIn(data, {
      onSuccess: () => {
        reset();
        router.push((source as string) || '/dashboard');
      },

      onError: error => {
        const errorMessage = formatAxiosErrorMessage(error as AxiosError);
        openErrorModal(errorMessage as string);
      },
    });
  };

  // Initialize a boolean state
  const [passwordShown, setPasswordShown] = React.useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-5">
          <InputField
            id="email"
            type="text"
            label=""
            className="!bg-[#15171D] text-white"
            placeholder="Email "
            registration={register('email', {
              required: true,
            })}
          />

          {errors.email && <InputError text="This field is required" />}
        </div>
        <div className="my-5">
          <div className="flex rounded-md !bg-[#15171D] p-0 pr-3">
            <InputField
              className="!bg-[#15171D] text-white"
              id="password"
              type={passwordShown ? 'text' : 'password'}
              label="Password"
              placeholder="Password"
              registration={register('password', {
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

          {errors.password && <InputError text="This field is required" />}
        </div>

        <div className="flex flex-row items-center justify-between text-white">
          <div>
            <input id="checkbox" type="checkbox" className="align-middle default:ring-2" />
            <label
              htmlFor="checkbox"
              className="ml-2 align-middle text-[10px] text-[#818181]  md:text-xs"
            >
              Keep me Logged in
            </label>
          </div>

          <Link href="/user/reset-password">
            <a className="text-[10px] font-thin text-[#818181] md:text-sm">Forgot Password?</a>
          </Link>
        </div>

        <button
          type="submit"
          className="bg_red_gradient my-2 w-full rounded py-2 text-center text-base font-semibold text-white disabled:text-gray-400 md:py-4"
          disabled={isLoading}
        >
          {isLoading && <span>Loading</span>}
          {!isLoading && <span> Log in </span>}
        </button>
        <p className="my-4 text-center text-[12px] text-white">
          Don't have an account?{' '}
          <Link href="/user/signup">
            <a className="text-[12px] font-semibold text-[#B500FF]"> Sign up </a>
          </Link>{' '}
        </p>
        <p className="mt-2 text-center text-[12px] text-white">
          {' '}
          Need Help? &nbsp;
          <a className="font-semibold text-[#B500FF]">Contact Support </a>
        </p>
      </form>
    </>
  );
};
