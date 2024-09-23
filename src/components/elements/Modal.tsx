import * as React from 'react';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import '@reach/dialog/styles.css';
import clsx from 'clsx';

interface ModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
  label: string;
  width: string;
  className?: string;
  allowDismiss?: boolean;
}

export const Modal: React.FunctionComponent<ModalProps> = ({
  isModalOpen,
  children,
  label,
  width = '500px',
  className = '',
  closeModal,
  allowDismiss = false,
}) => {
  return (
    <DialogOverlay
      isOpen={isModalOpen}
      onDismiss={allowDismiss ? closeModal : () => null}
      style={{
        backgroundColor: '#000000aa',
        zIndex: 100,
        backdropFilter: 'blur(5px)',
      }}
      allowPinchZoom={true}
      className="dialog_overlay"
    >
      <div className="w-full flex-shrink-0">
        <DialogContent
          aria-label={label}
          /**
           * Reach UI doesn't work very well with Styled JSX or Tailwind.
           * Override defaults with inline styles and style containing div instead.
           */
          style={{
            width: '92.5%',
            padding: '0',
            position: 'relative',
            zIndex: 4,
            maxWidth: width,
            background: 'transparent',
          }}
        >
          <div
            className={clsx(
              'overflow-auto rounded-[10px] border-[0.5px] border-[#00E2C6] border-opacity-50 bg-transparent p-4 text-white sm:p-7 md:p-8',
              className,
            )}
          >
            {children}
          </div>
        </DialogContent>
      </div>
    </DialogOverlay>
  );
};
