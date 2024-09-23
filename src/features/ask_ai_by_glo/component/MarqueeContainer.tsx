import React from 'react';

type MarqueeContainerProps = {
  phoneNumberList: Array<string>;
};
const MarqueeContainer: React.FunctionComponent<MarqueeContainerProps> = ({ phoneNumberList }) => {
  return (
    <div className="border-y-[.5rem] border-black/40 lg:border-y-[1rem]">
      <div className="marquee-container flex gap-4 overflow-hidden bg-black/5 py-4 text-[10px] text-white lg:text-sm">
        <ul className="marquee flex gap-4">
          {phoneNumberList.map(message => {
            return (
              <li className="slide whitespace-nowrap" key={message}>
                {message}
              </li>
            );
          })}
        </ul>

        <ul className="marquee flex gap-4" aria-hidden>
          {phoneNumberList.map(message => {
            return (
              <li className="slide whitespace-nowrap" key={message}>
                {message}
              </li>
            );
          })}
        </ul>

        <ul className="marquee flex gap-4" aria-hidden>
          {phoneNumberList.map(message => {
            return (
              <li className="slide whitespace-nowrap" key={message}>
                {message}
              </li>
            );
          })}
        </ul>

        <ul className="marquee flex gap-4" aria-hidden>
          {phoneNumberList.map(message => {
            return (
              <li className="slide whitespace-nowrap" key={message}>
                {message}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MarqueeContainer;
