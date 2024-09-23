import * as React from 'react';

interface MultilineLoaderProps {
  numberofLines: number;
}

export const MultilineLoader: React.FunctionComponent<MultilineLoaderProps> = ({
  numberofLines,
}) => {
  return (
    <div className="space-y-2">
      <p className="sr-only">Loading</p>

      {Array(numberofLines)
        .fill('')
        .map((s, i) => {
          return <div key={`${s}${i}`} className="h-5 w-full animate-pulse rounded bg-gray-300" />;
        })}
    </div>
  );
};
