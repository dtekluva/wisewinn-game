import { LinkButton } from '@/components/elements';
import { useModalControl } from '@/hooks';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { AskAiWebsiteMobileMenu } from './AskAiWebsiteMobileMenu';

const LandingPageHeader = () => {
  const router = useRouter();

  const isContactPage = router.pathname === '/ask-ai/contact';

  const { isModalOpen, closeModal, openModal } = useModalControl();

  const navLinks = [
    {
      name: 'Winners',
      url: '/ask-ai/winners',
    },
    // {
    //   name: 'FAQs',
    //   url: '/faq',
    // },
    {
      name: 'Contact us',
      url: '/ask-ai/contact',
    },
  ];

  return (
    <>
      <AskAiWebsiteMobileMenu
        navLinks={navLinks}
        currentUrl={router.pathname}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
      />

      <header
        id="anchorHeader"
        className={clsx('relative z-[9999] h-full py-5', isContactPage && 'bg-[#00331C]')}
      >
        <div
          className={clsx(
            'gap:5 container relative z-[999] flex h-full w-full items-center justify-between sm:gap-10',
            isContactPage && 'h-full bg-[#00331C] md:py-4',
          )}
        >
          {!isModalOpen && (
            <Link href="/ask-ai">
              <a className="inlineflex-1 overflow-visible">
                <div className="flex items-center gap-x-4">
                  <Image src={'/images/gloLogo.png'} width={50} height={50} alt="glo" />
                  <p className="text-base font-semibold text-white lg:text-2xl">Ask Ai by Glo</p>
                </div>
              </a>
            </Link>
          )}

          <nav
            className={clsx(
              'hidden flex-1 text-sm text-neutral-400 ',
              isModalOpen ? 'hidden' : 'lg:block',
            )}
          >
            <ul className="flex justify-center gap-4 lg:gap-10">
              {navLinks.map(({ name, url }) => {
                const isActive = router.pathname === url;
                return (
                  <li key={name}>
                    <Link href={url as string}>
                      <a
                        className={clsx(
                          'whitespace-nowrap font-semibold hover:text-white',
                          isActive && 'font-semibold text-white',
                        )}
                      >
                        {name}
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="my-3 lg:hidden">
            {!isModalOpen && (
              <div className="mx-1 flex space-x-4">
                <button onClick={openModal} className="rounded-lg p-2">
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.5"
                      y="0.5"
                      width="35"
                      height="35"
                      rx="7.5"
                      stroke="white"
                      strokeOpacity="0.36"
                    />
                    <path
                      d="M10 24H26C26.55 24 27 23.55 27 23C27 22.45 26.55 22 26 22H10C9.45 22 9 22.45 9 23C9 23.55 9.45 24 10 24ZM10 19H26C26.55 19 27 18.55 27 18C27 17.45 26.55 17 26 17H10C9.45 17 9 17.45 9 18C9 18.55 9.45 19 10 19ZM9 13C9 13.55 9.45 14 10 14H26C26.55 14 27 13.55 27 13C27 12.45 26.55 12 26 12H10C9.45 12 9 12.45 9 13Z"
                      fill="#50B651"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>

          <ul className="ml-auto hidden w-max lg:flex-1 lg:flex-wrap lg:justify-end lg:gap-5 xl:flex">
            <li className="header-xl max-w-[285px] flex-grow">
              <LinkButton
                onClick={() => router.push('/glo-salary-for-life')}
                variant="greenry_light"
                size="xs"
                className="w-full text-center font-semibold"
              >
                Glo AI Fortune
              </LinkButton>
            </li>
          </ul>
        </div>

        <style jsx>{`
          @media (min-width: 1310px) {
            .header-xl {
              flex-grow: 0;
            }
          }
        `}</style>
      </header>
    </>
  );
};

export default LandingPageHeader;
