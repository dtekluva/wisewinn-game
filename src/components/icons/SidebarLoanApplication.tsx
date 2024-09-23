import * as React from 'react';

interface SidebarLoanApplicationProps {
  isLinkSelected?: boolean;
}

export const SidebarLoanApplication: React.FunctionComponent<SidebarLoanApplicationProps> = ({
  isLinkSelected,
}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
      <path
        fill={isLinkSelected ? '#4C1961' : '#fff'}
        d="M14.19 0H5.81C2.17 0 0 2.17 0 5.81v8.38C0 17.83 2.17 20 5.81 20h8.38c3.64 0 5.81-2.17 5.81-5.81V5.81C20 2.17 17.83 0 14.19 0z"
        opacity={isLinkSelected ? '1' : '0.3'}
      ></path>
      <path
        fill="#fff"
        d="M16.31 6.87c0 .41-.33.75-.75.75h-5.25c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h5.25c.42 0 .75.34.75.75zM7.97 5.9L5.72 8.15c-.15.15-.34.22-.53.22s-.39-.07-.53-.22l-.75-.75c-.3-.29-.3-.77 0-1.06.29-.29.76-.29 1.06 0l.22.22 1.72-1.72c.29-.29.76-.29 1.06 0 .29.29.29.77 0 1.06zM16.31 13.87c0 .41-.33.75-.75.75h-5.25c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h5.25c.42 0 .75.34.75.75zM7.97 12.9l-2.25 2.25c-.15.15-.34.22-.53.22s-.39-.07-.53-.22l-.75-.75c-.3-.29-.3-.77 0-1.06.29-.29.76-.29 1.06 0l.22.22 1.72-1.72c.29-.29.76-.29 1.06 0 .29.29.29.77 0 1.06z"
        opacity={isLinkSelected ? '1' : '0.6'}
      ></path>
    </svg>
  );
};
