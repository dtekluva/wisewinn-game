import * as React from 'react';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import '@reach/dialog/styles.css';
import clsx from 'clsx';
import { ThreeBody } from '@uiball/loaders';

interface FullPageLoaderProps {
  className?: string;
  purpleBg?: boolean;
}

export const FullPageLoader: React.FunctionComponent<FullPageLoaderProps> = ({
  className,
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
          <div className={clsx('my-4 overflow-auto rounded-[10px] bg-white p-4 px-5', className)}>
            <p className="sr-only">Loading</p>
            <div aria-hidden>
              <ThreeBody size={42} speed={1.1} color="#006839" />
            </div>
          </div>
        </DialogContent>
      </div>
    </DialogOverlay>
  );
};
