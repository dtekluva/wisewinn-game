import * as React from 'react';

import { RedirectCountdownModal } from '@/components/elements';
import { useModalControl, useSyntheticTimeout } from '@/hooks';

interface RedirectCountdownModalWrapperProps {
  gameRoute: string;
}

const FIFTEEN_SECONDS_IN_MS = 15 * 1000;

export const RedirectCountdownModalWrapper: React.FunctionComponent<
  RedirectCountdownModalWrapperProps
> = ({ gameRoute }) => {
  const {
    isModalOpen: isRedirectModalOpen,
    openModal: openRedirectModal,
    closeModal,
  } = useModalControl(false);

  // useSyntheticTimeout has been selected here as it returns a timeRemaining value.
  // Unlike useTimeout, this value maked debugging easier.
  const { resetTimeout, timeRemaining } = useSyntheticTimeout(() => {
    openRedirectModal();
  }, FIFTEEN_SECONDS_IN_MS);

  return (
    <>
      <p className="mt-4 w-full text-center">
        Continue playing in <span className="text-xl font-semibold">{timeRemaining / 1000}s</span>
      </p>
      {isRedirectModalOpen && (
        <RedirectCountdownModal
          isRedirectModalOpen={isRedirectModalOpen}
          redirectLink={gameRoute}
          restartCountdownModalTimeout={resetTimeout}
          closeModal={closeModal}
        />
      )}
    </>
  );
};
