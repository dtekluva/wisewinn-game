import * as React from 'react';
import { Menu } from '@headlessui/react';
import Link from 'next/link';
import clsx from 'clsx';

interface RightBarProfileMenuProps {
  handleLogOut: () => void;
  first_name: string | undefined;
}

export const RightBarProfileMenu: React.FunctionComponent<RightBarProfileMenuProps> = ({
  handleLogOut,
  first_name,
}) => {
  return (
    <Menu as="div" className="hidden w-full text-left md:inline-block">
      <Menu.Button className="flex w-full items-center justify-between gap-5 p-2 py-0">
        <span className="text-xl capitalize">{first_name}</span>
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="30" height="30" rx="4" fill="#F5F3FF" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.8284 17.8266C16.3184 19.3366 13.9014 19.3869 12.3309 17.9776L12.1716 17.8266L8.29289 13.7071C7.90237 13.3166 7.90237 12.6834 8.29289 12.2929C8.65338 11.9324 9.22061 11.9047 9.6129 12.2097L9.70711 12.2929L13.5858 16.4123C14.3257 17.1523 15.5012 17.1912 16.287 16.5292L16.4142 16.4123L20.2929 12.2929C20.6834 11.9024 21.3166 11.9024 21.7071 12.2929C22.0676 12.6534 22.0953 13.2206 21.7903 13.6129L21.7071 13.7071L17.8284 17.8266Z"
            fill="#4C1961"
          />
        </svg>
      </Menu.Button>

      <Menu.Items
        className="absolute left-0 right-0 mt-1 rounded-lg border-[0.3px] border-[#DFDFDF]
bg-white py-3.5"
      >
        <div>
          <Menu.Item>
            {({ active }) => (
              <Link href="/profile-settings/settings">
                <a
                  className={clsx(
                    'flex cursor-pointer items-center gap-2.5 px-4 py-2 text-sm transition duration-500 ease-in-out',
                    active && 'bg-wise-purple-light bg-opacity-10 text-black',
                  )}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 12.8799V11.1199C2 10.0799 2.85 9.21994 3.9 9.21994C5.71 9.21994 6.45 7.93994 5.54 6.36994C5.02 5.46994 5.33 4.29994 6.24 3.77994L7.97 2.78994C8.76 2.31994 9.78 2.59994 10.25 3.38994L10.36 3.57994C11.26 5.14994 12.74 5.14994 13.65 3.57994L13.76 3.38994C14.23 2.59994 15.25 2.31994 16.04 2.78994L17.77 3.77994C18.68 4.29994 18.99 5.46994 18.47 6.36994C17.56 7.93994 18.3 9.21994 20.11 9.21994C21.15 9.21994 22.01 10.0699 22.01 11.1199V12.8799C22.01 13.9199 21.16 14.7799 20.11 14.7799C18.3 14.7799 17.56 16.0599 18.47 17.6299C18.99 18.5399 18.68 19.6999 17.77 20.2199L16.04 21.2099C15.25 21.6799 14.23 21.3999 13.76 20.6099L13.65 20.4199C12.75 18.8499 11.27 18.8499 10.36 20.4199L10.25 20.6099C9.78 21.3999 8.76 21.6799 7.97 21.2099L6.24 20.2199C5.33 19.6999 5.02 18.5299 5.54 17.6299C6.45 16.0599 5.71 14.7799 3.9 14.7799C2.85 14.7799 2 13.9199 2 12.8799Z"
                      fill="#292D32"
                    />
                    <path
                      opacity="0.4"
                      d="M12 15.25C13.7949 15.25 15.25 13.7949 15.25 12C15.25 10.2051 13.7949 8.75 12 8.75C10.2051 8.75 8.75 10.2051 8.75 12C8.75 13.7949 10.2051 15.25 12 15.25Z"
                      fill="#292D32"
                    />
                  </svg>

                  <span className="text-black">Settings</span>
                </a>
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={clsx(
                  'flex w-full cursor-pointer items-center gap-2.5 px-4 py-2 text-sm text-black transition duration-500 ease-in-out',
                  active && 'bg-red-200',
                )}
                onClick={handleLogOut}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 7.2V16.79C15 20 13 22 9.8 22H7.21C4.01 22 2.01 20 2.01 16.8V7.2C2 4 4 2 7.2 2H9.8C13 2 15 4 15 7.2Z"
                    fill="#292D32"
                  />
                  <path
                    opacity="0.6"
                    d="M18.4301 8.12002L21.7801 11.47C22.0701 11.76 22.0701 12.24 21.7801 12.53L18.4301 15.88C18.1401 16.17 17.6601 16.17 17.3701 15.88C17.0801 15.59 17.0801 15.11 17.3701 14.82L19.4401 12.75H8.75006C8.34006 12.75 8.00006 12.41 8.00006 12C8.00006 11.59 8.34006 11.25 8.75006 11.25H19.4401L17.3701 9.18002C17.2201 9.03002 17.1501 8.84002 17.1501 8.65002C17.1501 8.46002 17.2201 8.26002 17.3701 8.12002C17.6601 7.82002 18.1301 7.82002 18.4301 8.12002Z"
                    fill="#292D32"
                  />
                </svg>
                <span>Log out</span>
              </button>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  );
};
