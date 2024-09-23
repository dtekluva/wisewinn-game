import * as React from 'react';

const messages = [
  'Play and stand a chance to win the Super Jackpot, Mega jackpot or Crown jumbo jackpot>>>>>>',
];

// Marquee inspired by: https://ryanmulligan.dev/blog/css-marquee/
export const TextSlide: React.FunctionComponent = () => {
  return (
    <>
      <div className="marquee-container flex gap-4 overflow-hidden py-4 text-[10px] text-white lg:text-sm">
        <ul className="marquee flex gap-4">
          {messages.map(message => {
            return (
              <li className="slide whitespace-nowrap" key={message}>
                {message}
              </li>
            );
          })}
        </ul>

        <ul className="marquee flex gap-4" aria-hidden>
          {messages.map(message => {
            return (
              <li className="slide whitespace-nowrap" key={message}>
                {message}
              </li>
            );
          })}
        </ul>

        <ul className="marquee flex gap-4" aria-hidden>
          {messages.map(message => {
            return (
              <li className="slide whitespace-nowrap" key={message}>
                {message}
              </li>
            );
          })}
        </ul>

        <ul className="marquee flex gap-4" aria-hidden>
          {messages.map(message => {
            return (
              <li className="slide whitespace-nowrap" key={message}>
                {message}
              </li>
            );
          })}
        </ul>
      </div>

      <style jsx>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-100% - (1rem)));
          }
        }

        .marquee {
          animation: scroll 30s linear infinite;
        }

        .marquee-container:hover .marquee {
          animation-play-state: paused;
        }
      `}</style>
    </>
  );
};
