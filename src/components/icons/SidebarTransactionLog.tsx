import * as React from 'react';

interface SidebarTransactionLogProps {
  isLinkSelected?: boolean;
}

export const SidebarTransactionLog: React.FunctionComponent<SidebarTransactionLogProps> = ({
  isLinkSelected,
}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path
        fill={isLinkSelected ? '#4C1961' : '#fff'}
        d="M16.24 3.65H7.76c-2.47 0-4.47 2.01-4.47 4.47v9.41C3.29 19.99 5.3 22 7.76 22h8.47c2.47 0 4.47-2.01 4.47-4.47V8.12c.01-2.47-2-4.47-4.46-4.47z"
        opacity={isLinkSelected ? '1' : '0.3'}
      ></path>
      <path
        fill="#fff"
        d="M14.35 2h-4.7c-1.04 0-1.89.84-1.89 1.88v.94c0 1.04.84 1.88 1.88 1.88h4.71c1.04 0 1.88-.84 1.88-1.88v-.94C16.24 2.84 15.39 2 14.35 2zM10.81 16.95c-.19 0-.38-.07-.53-.22l-1.5-1.5a.754.754 0 010-1.06c.29-.29.77-.29 1.06 0l.97.97 3.47-3.47c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06l-4 4c-.14.15-.34.22-.53.22z"
        opacity={isLinkSelected ? '1' : '0.6'}
      ></path>
    </svg>
  );
};
