import * as React from 'react';

export const useIsFirstRender = () => {
  const ref = React.useRef(true);
  const firstRender = ref.current;
  ref.current = false;
  return firstRender;
};
