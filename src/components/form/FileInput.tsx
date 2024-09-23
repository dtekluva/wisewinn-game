import * as React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface FileInputProps {
  fileTypes: string;
  label: string;
  id: string;
  registration: Partial<UseFormRegisterReturn>;
}

export const FileInput: React.FunctionComponent<FileInputProps> = ({
  fileTypes,
  label,
  id,
  registration,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1 ml-1.5 block cursor-pointer text-sm opacity-60"
      >
        {label}
      </label>
      <input
        id={id}
        type="file"
        className="
          block w-full cursor-pointer space-x-2
          rounded-lg text-sm font-medium
          text-slate-500 transition duration-500 
          ease-in-out  file:mr-4 file:cursor-pointer
          file:rounded-full file:border-0 file:bg-purple-6 
          file:px-4 file:py-2 file:text-sm file:font-semibold 
          file:text-purple-700 file:transition file:duration-500 
          file:ease-in-out hover:file:bg-purple-4 focus:outline-none 
          active:scale-[0.95] disabled:scale-100 disabled:cursor-not-allowed
          disabled:opacity-60"
        accept={fileTypes}
        {...registration}
      />
    </div>
  );
};
