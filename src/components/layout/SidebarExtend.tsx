import * as React from 'react';
import Link from 'next/link';
import * as Collapsible from '@radix-ui/react-collapsible';
import clsx from 'clsx';

import { Icon } from '@/components/elements';

interface SidebarExtendProps {
  nestedLinks: { link: string; text: string }[];
  icon: JSX.Element;
  text: string;
  isLinkSelected: boolean;
}

export const SidebarExtend: React.FunctionComponent<SidebarExtendProps> = ({
  nestedLinks,
  icon,
  text,
  isLinkSelected,
}) => {
  return (
    <Collapsible.Root>
      <Collapsible.Trigger className="flex w-full items-center justify-between">
        <a
          className={clsx(
            'block border-l-[6px] px-6 py-4 pr-4 text-[#898989]',
            !isLinkSelected && 'border-l-transparent',
            isLinkSelected && 'border-l-wise-purple-dark bg-[#F5F3FF] font-medium',
          )}
        >
          <div className="flex items-center gap-5">
            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center">
              <>{{ ...icon, props: { isLinkSelected } }}</>
            </span>
            <span className={clsx(isLinkSelected && 'text-wise-purple-dark')}>{text}</span>
          </div>
        </a>

        <Icon key="right-caret" id="right-caret" width="16" height="16" />
      </Collapsible.Trigger>

      <Collapsible.Content        
        className="bbg-purple-1 rounded-md py-1 text-sm"
      >
        {nestedLinks.map(({ link, text }) => (
          <Link href={link} key={text}>
            <a className="block whitespace-nowrap px-4 py-2.5 pl-[73px] text-[#898989] transition duration-500 ease-in-out hover:bg-[#F5F3FF] hover:text-wise-purple-dark">
              {text}
            </a>
          </Link>
        ))}{' '}
      </Collapsible.Content>
    </Collapsible.Root>
  );
};
