import * as React from 'react';

export const useToggle = (initialState = false): [boolean, unknown] => {
  const [state, setState] = React.useState<boolean>(initialState);

  const toggle = React.useCallback((): void => setState(state => !state), []);

  return [state, toggle];
};
