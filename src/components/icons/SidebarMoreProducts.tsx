import * as React from 'react';

interface SidebarMoreProductsProps {
  isLinkSelected?: boolean;
}

export const SidebarMoreProducts: React.FunctionComponent<SidebarMoreProductsProps> = ({
  isLinkSelected,
}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path
        fill={isLinkSelected ? '#4C1961' : '#fff'}
        d="M15.59 1.75c-2.97 0-5.38 2.41-5.38 5.38 0 2.97 2.41 5.38 5.38 5.38 2.97 0 5.38-2.41 5.38-5.38 0-2.97-2.41-5.38-5.38-5.38z"
        opacity={isLinkSelected ? '0.3' : '0.6'}
      ></path>
      <path
        fill={isLinkSelected ? '#4C1961' : '#fff'}
        d="M6.36 13.03a3.329 3.329 0 10-.002 6.662 3.329 3.329 0 00.002-6.662zM16.62 16.62c-1.55 0-2.81 1.26-2.81 2.81s1.26 2.81 2.81 2.81 2.81-1.26 2.81-2.81-1.26-2.81-2.81-2.81z"
        opacity={isLinkSelected ? '1' : '0.3'}
      ></path>
    </svg>
  );
};
