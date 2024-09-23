import clsx from 'clsx';
import * as React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputFieldProps {
  id: string;
  type?: 'text' | 'tel' | 'number' | 'email' | 'password' | 'date' | 'datetime-local' | 'date';
  placeholder?: string;
  autoFocus?: boolean;
  required?: boolean;
  defaultValue?: string;
  registration: Partial<UseFormRegisterReturn>;
  className?: string;
  prefix?: string;
  suffix?: string;
  label?: string;
  bgVariants?: string;
  disabled?: boolean;
}

export const InputField: React.FunctionComponent<InputFieldProps> = ({
  id,
  type = 'text',
  placeholder,
  autoFocus = false,
  required = false,
  defaultValue,
  registration,
  className,
  prefix,
  suffix,
  disabled = false,
  // label,
  bgVariants = 'bg-gray-100',
}) => {
  return (
    <>
      {/* <label htmlFor={id} className="text-sm">
        {label}
      </label> */}

      <div className="mt-1 flex w-full items-center space-x-2 rounded-md border-0 border-transparent px-0 transition duration-500 ease-in-out focus:outline-0 md:text-sm">
        {Boolean(prefix) && <span className="bg-purple-4 rounded py-0.5 px-1.5">{prefix}</span>}

        <input
          id={id}
          type={type}
          placeholder={placeholder}
          autoFocus={autoFocus}
          required={required}
          defaultValue={defaultValue}
          disabled={disabled}
          // autoComplete="off"
          className={clsx(
            'placeholder:text-mauve-7 w-full rounded-md border-0 border-transparent bg-[#004F26] p-0 py-4 px-3 text-xs text-white caret-white outline-none outline-0 ring-0 autofill:text-white focus:border-0 focus:border-transparent focus:outline-none focus:outline-0 focus:ring-0 disabled:cursor-not-allowed disabled:opacity-60 md:text-sm',
            bgVariants,
            className,
          )}
          {...registration}
        />

        {suffix && <span className="bg-purple-4 rounded py-0.5 px-1.5">{suffix}</span>}
      </div>
    </>
  );
};
