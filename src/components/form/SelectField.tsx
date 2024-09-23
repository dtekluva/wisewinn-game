import * as React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import * as Select from '@radix-ui/react-select';
import { Icon } from '@/components/elements';
import clsx from 'clsx';

interface SelectFieldProps {
  id: string;
  label: string;
  options:
    | {
        text: string;
        value: string;
      }[]
    | undefined;
  placeholder?: string;
  autoFocus?: boolean;
  required?: boolean;
  defaultValue?: string;
  registration?: Partial<UseFormRegisterReturn>;
  className?: string;
  setHookFormValue: () => void;
  disabled?: boolean;
}

export const SelectField: React.FunctionComponent<SelectFieldProps> = ({
  label,
  options,
  placeholder,
  setHookFormValue,
  disabled,
}) => {
  return (
    <div>
      <div className="text-[#8B8B8B] ">
        <p aria-hidden className="mb-2 flex gap-2 text-sm text-[#fff]">
          {label}
        </p>

        <Select.Root onValueChange={setHookFormValue}>
          <Select.Trigger
            aria-label={label}
            disabled={disabled}
            className={clsx(
              'w-full rounded-[10px] outline-none outline-0 ring-0 ',
              'disabled:cursor-not-allowed disabled:opacity-60 ',
            )}
          >
            <div className="flex w-full items-center justify-between gap-6 rounded-md bg-gray-900 px-6 py-3.5">
              <Select.Value placeholder={placeholder} />
              <Select.Icon className="py-[7px]">
                <Icon key="select-chevron" id="select-chevron" width="18" height="10" />
              </Select.Icon>
            </div>
          </Select.Trigger>

          <Select.Portal>
            <Select.Content className="rounded-md border-[0.5px] border-[#E0E0E0] bg-white">
              <Select.ScrollUpButton />
              <Select.Viewport className="p-4">
                <Select.Group>
                  <Select.Label className="text-employment-blue mb-1 text-xs text-opacity-50">
                    {label}
                  </Select.Label>
                  {options?.map(({ value, text }) => {
                    return (
                      <Select.Item
                        key={value}
                        value={value}
                        className="data-highlighted:bg-employment-blue-light data-highlighted:bg-opacity-20 data-highlighted:outline-none flex items-center justify-between rounded-md p-2 text-sm transition duration-200 ease-in-out"
                      >
                        <Select.ItemText>{text}</Select.ItemText>
                        <Select.ItemIndicator>
                          <Icon key="select-check" id="select-check" width="14" height="10" />
                        </Select.ItemIndicator>
                      </Select.Item>
                    );
                  })}
                </Select.Group>

                <Select.Separator />
              </Select.Viewport>
              <Select.ScrollDownButton />
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
    </div>
  );
};
