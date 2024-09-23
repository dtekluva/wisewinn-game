import * as React from 'react';
import { useQueryClient } from 'react-query';
import { useAuth } from '@/contexts/authentication';
import {  LinkButton } from '@/components/elements';
import { useRouter } from 'next/router';
import { PhoneNumberUpdateModal } from '@/components/elements/PhoneNumberUpdateModal';
import { useModalControl } from '@/hooks';

export const PasswordSettings: React.FunctionComponent = () => {
  const { replace } = useRouter();
  const { authDispatch } = useAuth();
  const queryClient = useQueryClient();

  const handleLogOut = () => {
    if (authDispatch) authDispatch({ type: 'LOGOUT' });
    queryClient.clear();
    replace('/user/login');
  };

  const {
    isModalOpen: isPhoneNumberUpdateModal,
    closeModal: closePhoneNumberUpdateModal,
    openModal: openPhoneNumberUpdateModal,
  } = useModalControl();
  return (
    <>
      <PhoneNumberUpdateModal
        isPhoneNumberModalOpen={isPhoneNumberUpdateModal}
        closePhoneNumberModal={closePhoneNumberUpdateModal}
      />

      <div>
        <h1 className="text-[24px] text-[#fff]">Settings</h1>

        <div className="mt-[46px]">
          <p className="text-[18px] text-[#fff]">Update Phone Number</p>
          <p className="mt-[11px] text-[14px] text-[#A1A1A1]">Want to change Phone Number?</p>

          <div className="mt-[16px]">
            <LinkButton
              onClick={() => openPhoneNumberUpdateModal()}
              variant="unstyled"
              href="#"
              className="mt-[16px] w-max rounded-[6px] bg-[#4C1961] !px-[17px]
      py-3 text-[14px] text-[#fff] whitespace-nowrap lg:w-1/4"
            >
              Update Phone Number
            </LinkButton>
          </div>
        </div>

        <div className="mt-[46px]">
          <p className="text-[18px] text-[#fff]">Reset Password</p>
          <p className="mt-[11px] text-[14px] text-[#A1A1A1]">
            Can’t remember password ? Tap the reset password button
          </p>

          <div className="mt-[16px]">
            <LinkButton
              variant="unstyled"
              href="/profile-settings/change-password"
              className="mt-[16px] w-max rounded-[6px] bg-[#4C1961] px-[17px]
      py-3 text-[14px] text-[#fff] lg:w-1/4"
            >
              Reset Password
            </LinkButton>
          </div>
        </div>

        <div className="mt-[46px]">
          <p className="text-[18px] text-[#fff] ">Reset Transaction Pin</p>
          <p className="mt-[11px] text-[14px] text-[#A1A1A1]">
            Can’t rememeber password ? Tap the reset password button
          </p>
          <div className="mt-[16px]">
            <LinkButton
              variant="unstyled"
              href="/profile-settings/reset-transaction-pin"
              className="mt-[16px] w-[180px] rounded-[6px] bg-[#4C1961] px-[17px]
      py-3 text-[14px] text-[#fff] lg:w-1/4"
            >
              Reset Pin
            </LinkButton>
          </div>
        </div>

        <div className="mt-[46px]">
          <p className="text-[18px] text-[#fff]">Log Out</p>
          <p className="mt-[11px] text-[14px] text-[#A1A1A1]">
            To log out of your account, Tap the Log out button
          </p>

          <div className="mt-[16px]">
            <LinkButton
              variant="unstyled"
              onClick={handleLogOut}
              href={''}
              className="mt-[16px] w-[180px] rounded-[6px] !bg-red-500/20 px-[17px] py-3
      text-[14px] text-[#FF0000] text-[#fff] lg:w-1/4"
            >
              Log Out
            </LinkButton>
          </div>
        </div>
      </div>
    </>
  );
};
