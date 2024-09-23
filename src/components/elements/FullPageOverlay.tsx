import * as React from 'react';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import '@reach/dialog/styles.css';

interface FullPageOverlayProps {
  className?: string;
  purpleBg?: boolean;
}

export const FullPageOverlay: React.FunctionComponent<FullPageOverlayProps> = ({
  purpleBg = false,
}) => {
  return (
    <DialogOverlay
      isOpen={true}
      onDismiss={() => null}
      style={{ backgroundColor: purpleBg ? '#F9F1FE' : 'hsla(0, 0%, 0%, 0.6)', zIndex: 200 }}
      className="flex items-center"
    >
      <div className="w-full flex-shrink-0">
        <DialogContent
          aria-label="Loading"
          /**
           * Reach UI doesn't work very well with Styled JSX or Tailwind.
           * Override defaults inline and style containing div instead.
           */
          style={{
            width: 'max-content',
            padding: '0',
            position: 'relative',
            zIndex: 200,
            background: 'transparent',
          }}
        >
          <p className="sr-only">Loading</p>
        </DialogContent>
      </div>
    </DialogOverlay>
  );
};
