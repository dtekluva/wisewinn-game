import * as React from 'react';

export const useFocus = () => {
  const htmlElRef = React.useRef(null);
  const setFocus = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    htmlElRef.current && (htmlElRef.current as any).focus();
  };

  return { htmlElRef, setFocus };
};
