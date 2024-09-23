import * as React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface CheckboxProps {
  id: string;
  required?: boolean;
  defaultValue?: string;
  registration: Partial<UseFormRegisterReturn>;
  className?: string;
  primaryLabel: string;
  secondaryLabel?: string;
}

export const Checkbox: React.FunctionComponent<CheckboxProps> = ({
  id,
  registration,
  required,
  defaultValue,
  primaryLabel,
  secondaryLabel,
}) => {
  return (
    <div className="flex items-start">
      <div className="flex h-5 items-center">
        <input
          id={id}
          type="checkbox"
          required={required}
          defaultValue={defaultValue}
          className="h-4 w-4 scale-110 cursor-pointer rounded border-mauve-4 text-purple-9 transition duration-500 ease-in-out focus:ring-purple-8"
          {...registration}
        />
      </div>

      <div className="ml-3 text-sm">
        <label htmlFor={id} className="cursor-pointer">
          {primaryLabel}

          {Boolean(secondaryLabel) && (
            <span className="block font-normal text-mauve-9">
              {secondaryLabel}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};
