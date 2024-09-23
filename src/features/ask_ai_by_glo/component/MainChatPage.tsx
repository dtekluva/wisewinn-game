import { Button } from '@/components/elements';
import { Input } from '@/components/form';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { ChatMobileMenu } from './ChatMobileMenu';
import { useModalControl } from '@/hooks';

const MainChatPage = () => {
  const { isModalOpen, closeModal, openModal } = useModalControl();

  const router = useRouter();
  const navLinks = [
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
      url: '/ask-ai/contact',
    },
  ];
  return (
    <>
      <ChatMobileMenu closeModal={closeModal} isModalOpen={isModalOpen} />
      <div className="relative h-[100vh] w-full bg-[#111]">
        <div className="mobile__headers container flex items-center justify-between py-8 lg:hidden ">
          <Link href="/">
            <a className="inline flex-1 overflow-visible">
              <div className="flex items-center gap-x-4">
                <Image src={'/images/gloLogo.png'} width={50} height={50} alt="glo" />
                <p className="text-base font-semibold text-white lg:text-2xl">Ask Ai by Glo</p>
              </div>
            </a>
          </Link>

          <button className="rounded-lg p-2" onClick={openModal}>
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
        <div className="nav__links hidden py-16 lg:block">
          <nav
            className={clsx(
              'flex-1 text-sm text-neutral-400 ',
              // isModalOpen ? 'hidden' : 'lg:block',
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
                          'whitespace-nowrap font-semibold text-white hover:text-white',
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
        </div>

        <div className="title mx-auto flex flex-col items-center justify-center ">
          <div className="relative -bottom-2">
            <Image
              src={'/images/ask-ai-by-glo/right-facing-ai.svg'}
              alt={'ai face'}
              width={60}
              height={60}
              //
            />
          </div>
          <div className="flex items-center rounded-[8px] border-[.5rem] border-[#252525] bg-[#252525]">
            <Button className="!py-2 px-4 text-white md:p-2" variant="greenery">
              Ask AI
            </Button>

            <Button className="!bg-transparent !py-2 px-4 md:p-2" variant="unstyled">
              Trivia
            </Button>
          </div>

          <p className="my-8 max-w-[80%] text-center text-sm text-white/[.8] lg:max-w-[50%]">
            Ask questions about things that interest you and get answers immediately and also stand
            a chance to Win Up to N1,000,000 everytime you ask a question.
          </p>

          <div className="h-[.1px] w-[40%] bg-white/40"></div>
        </div>

        <div className="overflow-y chat"></div>

        <div className="fixed bottom-2 left-1/2 w-full translate-x-[-50%] bg-[#111] text-center md:w-1/2 lg:bottom-12">
          <div className="mx-auto mt-8 flex w-full shrink-0 flex-col items-center justify-center gap-4 p-6 md:flex-row">
            <Input
              id={'phone_no'}
              type={'text'}
              placeholder={'Ask your Question here...'}
              required={true}
              className=" w-full bg-[#fff]/10 text-white placeholder:text-[#fff] md:w-[50%]"
            />
            <Button
              variant="greenery"
              className="w-full whitespace-nowrap !text-xs md:w-auto"
              centered

              // onClick={openModal}
            >
              ✨ Submit question
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainChatPage;
