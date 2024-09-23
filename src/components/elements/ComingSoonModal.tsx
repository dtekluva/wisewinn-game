import * as React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { Modal } from './Modal';
import { ModalCloseButton } from './ModalCloseButton';

interface ComingSoonModalProps {
  isComingSoonModalOpen: boolean;
  closeComingSoonModal: () => void;
  title?: string;
}

export const ComingSoonModal: React.FunctionComponent<ComingSoonModalProps> = ({
  isComingSoonModalOpen,
  closeComingSoonModal,
  title = 'Game History',
}) => {
  const router = useRouter();

  return (
    <Modal
      label="Consent confirmation"
      isModalOpen={isComingSoonModalOpen}
      closeModal={closeComingSoonModal}
      width="534px"
      className="relative border-0 px-4 py-9 text-center"
    >
      <Image
        alt="A football stadium"
        src="/images/soccer-cash/soccer-stadium-1.jpg"
        quality={100}
        layout="fill"
        sizes="100vw"
        objectFit="cover"
        objectPosition="center"
      />

      <ModalCloseButton onClick={() => router.push('/dashboard')} className="relative mb-0" />

      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/coming-soon-football.webp"
          alt="A football with a hat over it"
          className="mx-auto max-w-[150px]"
        />
        <h1 className="mb-2 text-2xl">{title}</h1>
        <p className="font-clash text-[40px] font-bold leading-[40px] text-white text-opacity-30">
          Coming <br /> soon!!
        </p>
      </div>
    </Modal>
  );
};
