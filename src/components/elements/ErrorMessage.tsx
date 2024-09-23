import * as React from 'react';
import clsx from 'clsx';

interface ErrorMessageProps {
  className?: string;
  text?: string;
}

export const ErrorMessage: React.FunctionComponent<ErrorMessageProps> = ({
  className,
  text,
}) => {
  return (
    <div
      className={clsx(
        'flex h-full w-full items-center justify-center bg-red-3 p-4 text-center text-red-11',
        className,
      )}
    >
      <div>
        <h3 className="mb-2 text-xl">Error</h3>
        <p>{text || 'There was an error loading this section.'}</p>
      </div>
    </div>
  );
};
