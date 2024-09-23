import * as React from 'react';

export const BlobTrio: React.FunctionComponent = () => {
  return (
    <div className="blobs-container rounded-full">
      <div className="absolute bottom-16	right-28 h-[20%] w-[20%] animate-blob rounded-full bg-indigo-9 opacity-40 mix-blend-multiply blur-xl filter"></div>
      <div className="absolute bottom-4	right-4 h-[20%] w-[20%] animate-blob rounded-full bg-purple-9 opacity-40 mix-blend-multiply blur-xl filter "></div>
      <div className="absolute bottom-28	right-16 h-[20%] w-[20%] animate-blob rounded-full bg-plum-9 opacity-40 mix-blend-multiply blur-xl filter "></div>
    </div>
  );
};
