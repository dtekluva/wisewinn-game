import * as React from 'react';
import clsx from 'clsx';

interface PlayResponsiblyAlertProps {
  className?: string;
}

export const PlayResponsiblyAlert: React.FunctionComponent<PlayResponsiblyAlertProps> = ({
  className,
}) => {
  return (
    <p className={clsx('space-x-2.5 text-xs text-white text-opacity-50', className)}>
      <span>Play responsibly</span>
      <span
        className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-[9px] font-bold
text-[#FF000F]"
      >
        18+
      </span>
    </p>
  );
};

