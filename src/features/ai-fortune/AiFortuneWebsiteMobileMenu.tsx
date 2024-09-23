import { Button } from '@/components/elements';

import Link from 'next/link';

import React from 'react';

import clsx from 'clsx';

export interface AskAiWebsiteMobileMenuProps {
  isModalOpen: boolean;
  closeModal: () => void;
  navLinks: { name: string; url?: string; action?: () => void }[];
  currentUrl: string;
}

export const AiFortuneWebsiteMobileMenu: React.FunctionComponent<AskAiWebsiteMobileMenuProps> = ({
  isModalOpen,
  closeModal,
  navLinks,
  currentUrl,
}) => {
  return (
    <>
      {isModalOpen ? (
        <div className="fixed inset-0 z-[9999999] m-0 h-full w-full bg-white">
          <div className="flex w-full items-center justify-between gap-4 py-2 px-6">
            <Button
              size="sm"
              onClick={closeModal}
              variant="greenery_darker"
              className="ml-auto mt-6 block bg-[#006839]"
            >
              Close
            </Button>
          </div>
          <div className="flex h-full w-full justify-center">
            <nav className="mt-10 flex flex-col text-sm text-neutral-400">
              <ul className="items-left flex flex-col justify-center gap-7">
                {navLinks.map(({ name, url, action }) => {
                  const isActive = currentUrl === url;
                  return (
                    <li onClick={action && action} key={name}>
                      <Link href={url as string}>
                        <a
                          className={clsx(
                            'whitespace-nowrap hover:text-[#006839]',
                            isActive && 'font-semibold text-[#006839]',
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
        </div>
      ) : null}
    </>
  );
};
