import * as React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { useRouter } from 'next/router';

interface LeftBarLinkProps {
  text: string;
  link: string | undefined;
  icon: JSX.Element;
}

export const LeftBarLink: React.FunctionComponent<LeftBarLinkProps> = ({ icon, text, link }) => {
  const router = useRouter();

  const isLinkSelected = router.pathname === link;

  return (
    <div className="">
      <Link href={link as string}>
        <a
          className={clsx(
            'block border-l-[6px] px-6 py-4 pr-4 text-sm text-[#898989] 2xl:text-base',
            !isLinkSelected && 'border-l-transparent',
            isLinkSelected && 'border-l-wise-purple-dark bg-[#F5F3FF] font-semibold',
          )}
        >
          <div className="flex items-center gap-5">
            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center">
              <>{{ ...icon, props: { isLinkSelected } }}</>
            </span>
            <span className={clsx(isLinkSelected && 'text-wise-purple-dark')}>{text}</span>
          </div>
        </a>
      </Link>
    </div>
  );
};
