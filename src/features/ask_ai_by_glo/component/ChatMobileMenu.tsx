import { LinkButton } from '@/components/elements';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface ChatMobileMenuProps {
  closeModal: () => void;
  isModalOpen: boolean;
}
export const ChatMobileMenu: React.FunctionComponent<ChatMobileMenuProps> = ({
  isModalOpen,
  closeModal,
}) => {
  const router = useRouter();
  const pathname = router.asPath;

  console.log({ pathname });
  const navLinks = [
    // {
    //   name: 'Results',
    //   url: '/results',
    // },
    {
      name: 'Winners',
      url: '/ask-ai/winners',
    },
    {
      name: 'FAQs',
      url: '/faq',
    },
    {
      name: 'Contact us',
      url: '/contact',
    },
    {
      name: 'Questions asked',
      url: pathname + '/questions-asked',
    },
  ];
  return (
    <>
      {isModalOpen ? (
        <div className="fixed inset-0 z-[99999] m-0 h-full w-full bg-[#00331C]">
          <div className="container flex items-center justify-between py-8">
            <div>
              <p className="text-sm text-white">Menu options</p>
            </div>
            <button className="inline-block" onClick={closeModal}>
              <svg
                width="33"
                height="33"
                viewBox="0 0 33 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.2324 12.6193L21.2208 19.8808"
                  stroke="#A0A0A0"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.0958 20.7442L20.3574 11.7557"
                  stroke="#A0A0A0"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle opacity="0.2" cx="15.9998" cy="16" r="15" fill="white" />
              </svg>
            </button>
          </div>

          <div className="container">
            <nav
              className={clsx(
                'flex-1 text-sm text-neutral-400 ',
                // isModalOpen ? 'hidden' : 'lg:block',
              )}
            >
              <ul className="flex flex-col justify-start gap-4 lg:gap-10">
                {navLinks.map(({ name, url }) => {
                  const isActive = router.pathname === url;
                  return (
                    <li className="border-b-[.01px] border-white/[.8] pb-4" key={name}>
                      <Link href={url as string}>
                        <a
                          className={clsx(
                            'whitespace-nowrap font-[400] text-white hover:text-white',
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

            <LinkButton
              onClick={() => router.push('/glo-salary-for-life')}
              variant="greenry_light"
              size="xs"
              className="mt-10 w-full text-center font-semibold"
            >
              Glo AI Fortune
            </LinkButton>
          </div>
        </div>
      ) : null}
    </>
  );
};
