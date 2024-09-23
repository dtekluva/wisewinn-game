import * as React from 'react';

import { Modal, ModalCloseButton } from '@/components/elements';

interface WhyDoIPayModalProps {
  isWhyDoIPayModalOpen: boolean;
  closeWhyDoIPayModal: () => void;
}

export const WhyDoIPayModal: React.FunctionComponent<WhyDoIPayModalProps> = ({
  isWhyDoIPayModalOpen,
  closeWhyDoIPayModal,
}) => {
  return (
    <Modal
      label="Why do I pay?"
      isModalOpen={isWhyDoIPayModalOpen}
      closeModal={closeWhyDoIPayModal}
      width="571px"
      allowDismiss
      className="md:p-[50px]"
    >
      <div className="mb-12 inline-flex w-full  flex-wrap items-center justify-between gap-6 text-xl">
        <h2 className="font-clash text-2xl sm:text-3xl md:text-4xl">Why do I pay?</h2>

        <ModalCloseButton onClick={closeWhyDoIPayModal} className="mb-0" />
      </div>

      <ol className="space-y-9">
        <li>
          <span
            aria-hidden
            className="mr-2 inline-flex h-[41px] w-[41px] items-center justify-center rounded-full bg-[#F5F3FF] font-medium"
          >
            <span>1.</span>
          </span>
          <span>To succesfully register your tickets.</span>
        </li>

        <li>
          <span
            aria-hidden
            className="mr-2 inline-flex h-[41px] w-[41px] items-center justify-center rounded-full bg-[#F5F3FF] font-medium"
          >
            <span>2.</span>
          </span>
          <span>The higher the tickets the higher your chances of winning.</span>
        </li>

        <li>
          <span
            aria-hidden
            className="mr-2 inline-flex h-[41px] w-[41px] items-center justify-center rounded-full bg-[#F5F3FF] font-medium"
          >
            <span>3.</span>
          </span>
          <span>Tickets will be randomly selected.</span>
        </li>

        <li>
          <span
            aria-hidden
            className="mr-2 inline-flex h-[41px] w-[41px] items-center justify-center rounded-full bg-[#F5F3FF] font-medium"
          >
            <span>4.</span>
          </span>

          <span>We ensure bias elimination in our Random Selection.</span>
        </li>
      </ol>
    </Modal>
  );
};
