import * as React from 'react';

interface SidebarDashboardProps {
  isLinkSelected?: boolean;
}

export const SidebarDashboard: React.FunctionComponent<SidebarDashboardProps> = ({
  isLinkSelected,
}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="none" viewBox="0 0 23 23">
      <rect
        width="10"
        height="10"
        x="13"
        y="13"
        fill={isLinkSelected ? '#4C1961' : '#fff'}
        opacity={isLinkSelected ? '1' : '0.3'}
        rx="3"
      ></rect>
      <rect
        width="10"
        height="10"
        y="13"
        fill={isLinkSelected ? '#4C1961' : '#fff'}
        opacity={isLinkSelected ? '1' : '0.3'}
        rx="3"
      ></rect>
      <rect
        width="10"
        height="10"
        fill={isLinkSelected ? '#4C1961' : '#fff'}
        opacity={isLinkSelected ? '1' : '0.3'}
        rx="3"
      ></rect>
      <rect
        width="10"
        height="10"
        x="13"
        fill={isLinkSelected ? '#4C1961' : '#fff'}
        opacity={isLinkSelected ? '0.3' : '0.6'}
        rx="5"
      ></rect>
    </svg>
  );
};
