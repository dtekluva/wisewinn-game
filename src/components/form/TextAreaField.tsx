import * as React from 'react';
import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';

interface TextAreaFieldProps {
  id: string;
  placeholder?: string;
  autoFocus?: boolean;
  required?: boolean;
  registration: Partial<UseFormRegisterReturn>;
  className?: string;
  label?: string;
  rows?: number;
}

export const TextAreaField: React.FunctionComponent<TextAreaFieldProps> = ({
  id,
  placeholder,
  autoFocus = false,
  required = false,
  registration,
  className,
  label,
  rows,
}) => {
  return (
    <>
      {label && (
        <label htmlFor={id} className="ml-1.5 text-sm opacity-60">
          {label}
        </label>
      )}

      <textarea
        id={id}
        placeholder={placeholder}
        autoFocus={autoFocus}
        required={required}
        rows={rows || 3}
        className={clsx(
          'border-mauve-4 bg-purple-1 placeholder:text-mauve-7 focus:border-purple-9 focus:ring-purple-9 mt-1 block w-full rounded-md py-2.5 px-4 transition duration-500 ease-in-out md:text-sm',
          className,
        )}
        {...registration}
      />
    </>
  );
};
