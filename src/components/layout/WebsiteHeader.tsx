import clsx from 'clsx';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

import { LinkButton } from '@/components/elements';
import { useModalControl } from '@/hooks';

import { WebsiteMobileMenuProps } from './WebsiteMobileMenu';

import Image from 'next/image';

// Type inspired by https://github.com/vercel/next.js/issues/4515#issuecomment-485236368
// Lazy load this component to avoid pulling in huge JS bundles when not necessary
const WebsiteMobileMenu = dynamic<WebsiteMobileMenuProps>(() =>
  import('./WebsiteMobileMenu').then(mod => mod.WebsiteMobileMenu),
);

interface WebsiteHeaderProps {
  sample?: string;
}

export const WebsiteHeader: React.FunctionComponent<WebsiteHeaderProps> = () => {
  const router = useRouter();
  const { isModalOpen, closeModal, openModal } = useModalControl();
  const [_isUnsubscribeModalOpen, _setIsUnsubscribeModalOpen] = React.useState(false);

  const navLinks = [
    {
      name: 'Home',
      url: '/',
    },
    {
      name: 'Results',
      url: '/results',
    },
    {
      name: 'Winners',
      url: '/winners',
    },
    {
      name: 'FAQs',
      url: '/faq',
    },
    {
      name: 'Contact us',
      url: '/contact',
    },
    // {
    //   name: 'Join our community',
    //   url: '/contact',
    // },
    {
      name: 'Unsubscribe',
      url: '/glo-salary-for-life?unsubscribe=true',
    },
  ];

  const isContactPage = router.pathname === '/contact';

  const [_isGloModalOpen, _setIsGloModalOpen] = React.useState(false);
  return (
    <>
      <WebsiteMobileMenu
        navLinks={navLinks}
        currentUrl={router.pathname}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
      />
      {/* <ChooseGameModal
        isOpen={isUnsubscribeModalOpen}
        setIsOpen={setIsUnsubscribeModalOpen}
        unsubscribe={true}
      /> */}
      <div id="anchorHeader" className="bg-[#00331C] py-5">
        <header
          className={clsx(
            'gap:5 container relative z-50 flex w-full items-center justify-between sm:gap-10',
            isContactPage && 'bg-[#00331C] md:py-4',
          )}
        >
          {!isModalOpen && (
            <Link href="/">
              <a className="inline	flex-1 overflow-visible">
                <div className="flex items-center gap-x-4">
                  <Image src={'/images/gloLogo.png'} width={50} height={50} alt="glo" />
                  <p className="text-2xl font-semibold text-white">Everwage</p>
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
                {/* <LinkButton
                  className="hidden bg-white bg-opacity-20 px-3 text-white md:block"
                  onClick={() => router.push('/user/login')}
                  variant="unstyled"
                  size="xs"
                >
                  <span className="text-xs font-semibold sm:text-base">Log in</span>
                </LinkButton> */}

                <button onClick={openModal} className="rounded-lg bg-[#006839] p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="15"
                    fill="none"
                    viewBox="0 0 26 15"
                  >
                    <path
                      stroke="#ffffff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1.66 13.333H25M1.66 1.667H25 1.66z"
                    ></path>
                  </svg>
                </button>
              </div>
            )}
          </div>

          <ul className="ml-auto hidden w-max lg:flex-1 lg:flex-wrap lg:justify-end lg:gap-5 xl:flex">
            {/* <li className="header-xl max-w-[210px] flex-grow">
              <button onClick={() => router.push('/user/login')}>
                <a className="inline-block w-full rounded-[7px] border-[0.5px] border-white border-opacity-50 bg-white bg-opacity-20 px-10 py-3 text-center font-medium text-white transition duration-500 ease-in-out hover:scale-[1.02] focus:outline-none  focus:ring-2  focus:ring-offset-2 active:scale-[0.95] disabled:cursor-not-allowed disabled:opacity-70">
                  Log in
                </a>
              </button>
            </li> */}
            <li className="header-xl max-w-[285px] flex-grow">
              <LinkButton
                // onClick={() => router.push('/dashboard')}
                onClick={() => router.push('/glo-salary-for-life')}
                variant="greenery_dark"
                size="sm"
                className="w-full text-center font-semibold"
              >
                Play now
              </LinkButton>
            </li>
          </ul>
        </header>

        <style jsx>{`
          @media (min-width: 1310px) {
            .header-xl {
              flex-grow: 0;
            }
          }
        `}</style>
      </div>
      {/* <ChooseGameModal isOpen={isGloModalOpen} setIsOpen={setIsGloModalOpen} /> */}
    </>
  );
};
