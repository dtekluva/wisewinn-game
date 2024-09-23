import * as React from 'react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { AxiosError } from 'axios';

import { Button, Modal, ModalCloseButton } from '@/components/elements';
import { useModalControl, useObjectURL, useNotificationModalControl } from '@/hooks';
import { useUpdateUser, useUser } from '@/features/auth';
import { convertToTitleCase, formatAxiosErrorMessage } from '@/utils';
import { InputError } from '@/components/form';
import { NotificationModal } from '@/components/elements';

type ProfileImageFormValues = {
  profile_img: FileList | undefined;
};

export const ProfileComponent: React.FunctionComponent = () => {
  const { data: userDetails } = useUser();
  const { mutate: updateUser, isLoading: isUpdateUserLoading } = useUpdateUser();

  const {
    user_profile_image,
    first_name,
    last_name,
    phone_number,
    gender,
    email,
    account_name,
    account_num,
    bank_name,
  } = userDetails || {};

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileImageFormValues>();

  const { isModalOpen, closeModal, openModal } = useModalControl();

  const {
    isModalOpen: isSuccessModalOpen,
    closeModal: closeSuccessModal,
    openModal: openSuccessModal,
  } = useModalControl();

  const {
    message: errorModalMessage,
    isModalOpen: isErrorModalOpen,
    closeModal: closeErrorModal,
    openModal: openErrorModal,
  } = useNotificationModalControl();

  const { profile_img } = useWatch({
    control,
  });

  const imageFile = profile_img?.[0];

  const imageSrc = useObjectURL(imageFile);

  const onSubmit: SubmitHandler<ProfileImageFormValues> = () => {
    const formData = new FormData();
    if (imageFile) {
      formData.append('profile_img', imageFile);
    }

    updateUser(formData, {
      onSuccess: () => {
        closeModal();
        openSuccessModal();
      },

      onError: error => {
        const errorMessage = formatAxiosErrorMessage(error as AxiosError);
        openErrorModal(errorMessage as string);
      },
    });
  };

  const areBankDetailsAvailable = !!bank_name && !!account_name && !!account_num;

  return (
    <>
      <NotificationModal
        headingText="Your profile image have been updated successfully"
        label="Your profile image have been updated successfully"
        type="success"
        allowDismiss
        closeModal={closeSuccessModal}
        isModalOpen={isSuccessModalOpen}
      />

      <NotificationModal
        headingText={errorModalMessage}
        label={errorModalMessage}
        type="error"
        allowDismiss
        closeModal={closeErrorModal}
        isModalOpen={isErrorModalOpen}
      />

      <Modal
        label="Consent confirmation"
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        width="400px"
        className="relative text-center"
        allowDismiss
      >
        <ModalCloseButton onClick={closeModal} />

        {!!profile_img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageSrc}
            alt="Your new profile image"
            className="mx-auto mb-4 h-32 w-32 rounded-full border bg-white"
          />
        ) : (
          <div className="mx-auto mb-4 h-32 w-32 rounded-full border bg-white"></div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="">
          <label
            htmlFor="change-photo"
            className="inline-block cursor-pointer rounded-[6px] bg-[#F5F3FF] px-[17px] py-[7px] text-[14px] text-[#4C1961]"
          >
            Select {!!profile_img ? 'another' : 'a'} photo
          </label>
          <input
            id="change-photo"
            type="file"
            className="sr-only"
            accept="image/*"
            {...register('profile_img', {
              required: true,
            })}
          />

          <div className="mb-10 flex justify-center">
            {errors.profile_img && <InputError text="An image is required" />}
          </div>

          <Button
            className="mx-auto mb-3 inline-block px-10 py-3 text-xl font-semibold"
            size="smNoPadding"
            type="submit"
            disabled={isUpdateUserLoading}
          >
            Update photo
          </Button>
        </form>
      </Modal>

      <div className="gap-28 xl:flex">
        <div className="mt-[22px] xl:flex">
          <div className="flex flex-shrink-0 flex-col sm:items-center">
            <h1 className="mb-4 font-clash text-[24px]">Profile</h1>
            {!!user_profile_image || user_profile_image !== 'None' ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user_profile_image || '/images/staticLightBg.jpg'}
                alt="Your new profile image"
                className="mb-4 h-[166px] w-[166px] rounded-full border bg-white sm:mx-auto"
              />
            ) : (
              <div className="mb-4 h-[166px] w-[166px] rounded-full border bg-neutral-200 sm:mx-auto"></div>
            )}

            <button
              onClick={openModal}
              className="w-max cursor-pointer rounded-[6px] bg-[#4C1961] px-[17px] py-[7px] text-[14px] text-white"
            >
              {!!user_profile_image ? 'Upload' : 'Set your profile'} photo
            </button>
          </div>
        </div>

        <div className="mx-auto mt-6 w-full max-w-[502px] sm:text-center xl:mx-0 xl:text-left">
          <div className="w-full">
            <h1 className="text-[18px] text-[#818181]">Details: </h1>
            <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-center xl:justify-between">
              <div className="mt-[14px] basis-1/2">
                <p className="text-[14px] text-[#818181]">Name</p>
                <p className="mt-[16px] text-[#fff]">
                  {first_name} {last_name}
                </p>
              </div>
              <div className="mt-[14px] basis-1/2">
                <p className="text-[14px] text-[#818181]">Email</p>
                <p className="mt-[16px] text-[#fff]">{email}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex w-full flex-col sm:flex-row sm:items-center sm:justify-center xl:justify-between">
            <div className="mt-[14px] basis-1/2 ">
              <p className="text-[14px] text-[#818181]">Phone Number</p>
              <p className="mt-[16px] text-[#fff]">{phone_number}</p>
            </div>
            <div className="mt-[14px] basis-1/2">
              <p className="basis-1/2 text-[14px] text-[#818181]">Gender</p>
              <p className="mt-[16px] text-[#fff]">{!!gender && convertToTitleCase(gender)}</p>
            </div>
          </div>

          {areBankDetailsAvailable && (
            <div className="">
              <h1 className="mt-[55px] text-[18px] text-[#818181] sm:text-center xl:text-left">
                Account detail:
              </h1>

              <div className="mx-auto mt-[22px] flex w-[274px] items-center rounded-[6px] border-[.2px] border-[#828282] p-[24px] xl:mx-0">
                {/* <Image
                  src="/images/zenith.jpg"
                  alt="Picture of the author"
                  width={79}
                  height={71}
                /> */}
                <div className="ml-[18px]">
                  <h1 className="text-[16px]">{account_name}</h1>
                  <p className="text-[14px] text-[#556575]">{account_num}</p>
                  <p className="text-[12px] text-[#898989]">{bank_name}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
