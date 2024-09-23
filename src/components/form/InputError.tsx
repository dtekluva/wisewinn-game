import * as React from 'react';

import { Icon } from '@/components/elements';

interface InputErrorProps {
  text: string;
}

export const InputError: React.FunctionComponent<InputErrorProps> = ({ text }) => {
  return (
    <div
      role="alert"
      aria-label="This field is required"
      className="text-red-10 mt-2 flex space-x-2 text-sm"
    >
      <Icon key="warning" id="warning" width="16" height="16" className="mt-0.5 flex-shrink-0" />
      <span className="text-[12px] text-red-400">{text}</span>
    </div>
  );
};
