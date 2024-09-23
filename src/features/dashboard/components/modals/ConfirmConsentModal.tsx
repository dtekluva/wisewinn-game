import React from 'react';
import { Button, Modal } from '@/components/elements';

interface ConfirmConsentModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  handleAcceptClick: () => void;
}

export const ConfirmConsentModal: React.FunctionComponent<ConfirmConsentModalProps> = ({
  isModalOpen,
  closeModal,
  handleAcceptClick,
}) => {
  return (
    <Modal
      label="Consent confirmation"
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      width="465px"
      className="pt-[60px] pb-[47px] text-center"
    >
      <svg
        width="134"
        height="134"
        viewBox="0 0 134 134"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto mb-8"
      >
        <circle cx="67" cy="67" r="67" fill="#F5F3FF" />
        <circle cx="67" cy="67" r="56" fill="#EDE9FE" />
        <path
          d="M67.5 24C43.4723 24 24 43.4723 24 67.5C24 91.5277 43.4723 111 67.5 111C91.5277 111 111 91.5277 111 67.5C111 43.4723 91.5277 24 67.5 24V24ZM71.6092 87.2402H63.9274V80.6302H71.6092V87.2402ZM71.6982 71.9658V75.7173H63.9274V64.7308H67.7679C70.9835 64.7308 73.5735 62.1408 73.5735 58.9252C73.5735 55.7096 70.9835 53.1196 67.7679 53.1196C64.5523 53.1196 61.9623 55.7096 61.9623 58.9252H54.1914C54.1914 51.4223 60.265 45.348 67.7685 45.348C75.2708 45.348 81.3451 51.4217 81.3451 58.9246C81.3451 65.088 77.3257 70.2687 71.6982 71.966V71.9658Z"
          fill="#4C1961"
        />
      </svg>

      <h2 className="mb-1.5 font-clash text-[34px] font-semibold">Consent</h2>
      <p className="mx-auto mb-4 max-w-sm text-sm text-[#556575]">
        I Consent that I am above 18 and eligible to take responsible decisions pertaining to these
        selections and choices.
      </p>

      <Button
        onClick={handleAcceptClick}
        className="mx-auto mb-3 block px-[74px] py-3 text-xl font-semibold"
        size="smNoPadding"
      >
        Accept
      </Button>

      <button
        onClick={closeModal}
        className="mx-auto block w-max text-sm font-semibold text-wise-purple-dark"
      >
        Decline
      </button>
    </Modal>
  );
};
