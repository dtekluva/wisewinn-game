import * as React from "react";
import { SVGProps } from "react";
const SVGComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.00004 6.66683C9.4728 6.66683 10.6667 5.47292 10.6667 4.00016C10.6667 2.5274 9.4728 1.3335 8.00004 1.3335C6.52728 1.3335 5.33337 2.5274 5.33337 4.00016C5.33337 5.47292 6.52728 6.66683 8.00004 6.66683Z"
      fill="white"
    />
    <path
      d="M13.3333 11.6665C13.3333 13.3232 13.3333 14.6665 7.99996 14.6665C2.66663 14.6665 2.66663 13.3232 2.66663 11.6665C2.66663 10.0098 5.05463 8.6665 7.99996 8.6665C10.9453 8.6665 13.3333 10.0098 13.3333 11.6665Z"
      fill="white"
    />
  </svg>
);
export default SVGComponent;
