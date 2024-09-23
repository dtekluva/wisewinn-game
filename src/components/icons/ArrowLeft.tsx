import * as React from "react";
import { SVGProps } from "react";
const SVGComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M22 16.19V7.81C22 4.17 19.83 2 16.19 2L7.82 2C4.17 2 2 4.17 2 7.81V16.18C2 19.82 4.17 21.99 7.81 21.99H16.19C19.83 22 22 19.83 22 16.19Z"
      fill="#31A632"
    />
    <path
      opacity={0.01}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.35298 17.647L6.35298 6.35285L17.6471 6.35285V17.647H6.35298Z"
      fill="white"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.1393 13.3309C10.4287 12.6203 10.4051 11.4829 11.0683 10.7438L11.1393 10.6688L13.0779 8.84354C13.2617 8.65977 13.5596 8.65977 13.7434 8.84354C13.9131 9.01318 13.9261 9.28011 13.7826 9.46472L13.7434 9.50905L11.8049 11.3343C11.4566 11.6825 11.4383 12.2357 11.7499 12.6055L11.8049 12.6653L13.7434 14.4906C13.9272 14.6744 13.9272 14.9723 13.7434 15.1561C13.5738 15.3258 13.3068 15.3388 13.1222 15.1953L13.0779 15.1561L11.1393 13.3309Z"
      fill="white"
    />
  </svg>
);
export default SVGComponent;
