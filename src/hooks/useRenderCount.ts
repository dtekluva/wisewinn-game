import * as React from 'react';

export const useRenderCount = () => {
  const renderCounter = React.useRef(0);
    renderCounter.current = renderCounter.current + 1;
    
    return renderCounter.current
};
