
import React from 'react';

interface WebsiteHeaderBottomHeroProps {
  title: string;
}

export const WebsiteHeaderBottomHero: React.FunctionComponent<WebsiteHeaderBottomHeroProps> = ({
  title,
}) => {
  return (
    <>
      <div className="-mt-4 flex  h-[205px] flex-col items-center justify-center gap-y-5 bg-cover bg-no-repeat ">
        <div className="mx-auto flex w-max items-center gap-x-2 rounded-full bg-[#092E1E] p-2 px-5">
       
          <p className="text-white">play more win more</p>
        </div>
        <h1 className="text-center font-clash text-3xl font-semibold md:text-6xl">.{title}.</h1>
      </div>

      {/* <style jsx>
        {`
          div {
            background: url('/images/bg-hero-green.png'), linear-gradient(180deg, #01AE53 22.82%, #4c1961 289.33%);
            backdrop-filter: blur(50px);
            background-repeat: no-repeat;
            background-size: cover;
          }
        `}
      </style> */}
    </>
  );
};
