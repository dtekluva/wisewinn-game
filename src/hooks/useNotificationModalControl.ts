import * as React from 'react';

export const useNotificationModalControl = (initialState = false) => {
  const [isModalOpen, setIsModalOpen] = React.useState(initialState);
  const [message, setMessage] = React.useState('');

  const openModal = (message: string) => {
    setIsModalOpen(true);
    setMessage(message);
  };
  const closeModal = () => setIsModalOpen(false);

  return {
    message,
    isModalOpen,
    openModal,
    closeModal,
  };
};
