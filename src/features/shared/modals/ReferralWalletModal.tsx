import React from 'react';
import { Button, Modal, ModalCloseButton } from '@/components/elements';

type ReferralWalletModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
  handleClick: () => void;
  isLoading: boolean;
};

export const ReferralWalletModal: React.FunctionComponent<ReferralWalletModalProps> = ({
  isModalOpen,
  closeModal,
  handleClick,
  isLoading,
}) => {
  return (
    <Modal
      label="Fund your wallet"
      isModalOpen={isModalOpen}
      closeModal={closeModal}
      width="465px"
      className="relative pt-[20px] pb-[20px] text-center"
    >
      <ModalCloseButton onClick={closeModal} />
      <h2 className="mb-1.5 font-clash !text-2xl font-semibold md:whitespace-nowrap ">
        Insufficient referral wallet balance
      </h2>

      <p className="![text-[#A6A6A6] text-sm">
        Kindly refer new users to earn referral bonus or play with main wallet
      </p>

      <div className="mt-[16px] md:mt-[36px]">
        <Button onClick={handleClick} centered>
          {isLoading && <span>Loading</span>}
          {!isLoading && <span> Buy ticket with main wallet</span>}
        </Button>
      </div>
    </Modal>
  );
};
