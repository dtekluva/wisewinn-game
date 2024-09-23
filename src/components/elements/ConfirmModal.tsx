import React from 'react';
import clsx from 'clsx';
import { Modal } from './Modal';
interface ConfirmModalProps {
  isConfirmModal: boolean;
  closeConfirmModal: () => void;
  nextFunction: () => void;
}
export const ConfirmModal: React.FunctionComponent<ConfirmModalProps> = ({
  isConfirmModal,
  closeConfirmModal,
  nextFunction,
}) => {
  return (
    <Modal
      label="Confirm Modal"
      isModalOpen={isConfirmModal}
      closeModal={closeConfirmModal}
      width="465px"
      className="pt-[60px] pb-[47px] text-center"
    >
      <h2 className="mb-1.5 font-clash text-[28px] font-semibold">Do you wish to Proceed?</h2>
      <p className="mx-auto mb-4 max-w-sm text-base text-[#fff]">
        You can only select three <span className="font-bold">(3)</span> games (matches) with one
        <span className="font-bold"> (1) </span> score prediction each.
      </p>

      <div className="flex w-full flex-row items-center justify-between gap-x-4">
        <button
          onClick={closeConfirmModal}
          className={clsx(
            'block whitespace-nowrap rounded-[4px] px-3 py-2 text-sm font-semibold',
            'primary-bg w-full ',
          )}
        >
          No
        </button>

        <button
          onClick={() => {
            nextFunction();
          }}
          className={clsx(
            'block whitespace-nowrap rounded-[4px] px-3 py-2 text-sm font-semibold',
            'primary-bg w-full ',
          )}
        >
          Yes
        </button>
      </div>
    </Modal>
  );
};
