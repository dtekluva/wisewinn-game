import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
// import { useChatContext } from 'stream-chat-react';

// import { useUser } from '@/features/auth';
// import { convertKebabAndSnakeToTitleCase } from '@/utils';
import { useModalControl } from '@/hooks';

interface DashboardHeaderProps {
  sample?: string;
}

export const DashboardHeader: React.FunctionComponent<DashboardHeaderProps> = () => {
  const { pathname } = useRouter();


  const navLinks = [
    {
      name: 'Library',
      url: '/',
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
  ];

  // const { channel: activeChannel } = useChatContext();

  // const peculiarPageNames: { [key: string]: string } = {
  //   '/': 'Dashboard',
  //   '/campaigns/salary-for-life': 'Dashboard',
  //   '/campaigns/instant-cashout': 'Dashboard',
  //   '/campaigns/wyse-cash': 'Dashboard',
  //   '/game-history/[gameID]': 'Game Detail',
  //   '/application/transaction-pin/[paymentType]': 'Transaction Pin',
  //   '/fund-wallet/fund-transfer/[amount]': 'Fund Wallet',
  //   '/fund-wallet/fund-channels/[amount]': 'Fund Channels',
  //   '/application/number-selection/[initRenderedFormIndex]': 'Number Selection',
  //   '/soccer-cash/game-selection': 'Soccer Cash',
  //   '/soccer-cash/predict-match-scores': 'Soccer Cash',
  //   '/chats-and-tips': 'Chats',
  //   '/chats-and-tips/[channelId]': activeChannel?.data?.name || 'Chats',
  //   '/soccer-cash/match-scores/virtual': 'Match Scores',
  //   '/soccer-cash/success/virtual': 'Match Outcome',
  //   '/soccer-cash/match-scores/virtual-static': 'Match Outcome',
  // };

  // const isPageNamePeculiar = Object.keys(peculiarPageNames).includes(pathname);

  // const pageName = isPageNamePeculiar
  //   ? peculiarPageNames[pathname]
  //   : convertKebabAndSnakeToTitleCase(pathname.split('/').slice(-1)[0]); // Split with slash and pick last item from resulting array.

  // const pagesWithoutMobileJackpots = [
  //   '/salary-for-life',
  //   '/banker',
  //   '/instant-cashout',
  //   '/quika',
  //   '/awoof',
  //   '/soccer-cash/game-selection',
  //   '/soccer-cash/game-selection/shared',
  //   '/soccer-cash/game-selection/all-in',
  //   '/soccer-cash/game-selection/virtual',
  //   '/soccer-cash/match-scores/virtual',
  //   '/soccer-cash/match-scores/virtual-static',
  //   '/soccer-cash/success/virtual',
  //   '/soccer-cash/predict-match-scores',
  //   '/soccer-cash/summary',
  //   '/chats-and-tips',
  //   '/chats-and-tips/[channelId]',
  // ];

  // const pagesWithoutDesktopJackpots = [
  //   '/chats-and-tips/[channelId]',
  //   '/soccer-cash/game-selection/virtual',
  //   '/soccer-cash/match-scores/virtual',
  //   '/soccer-cash/success/virtual',
  //   '/soccer-cash/match-scores/virtual-static',
  //   '/awoof/success',
  // ];

  // const pagesWithoutBackButton = ['/dashboard'];

  // const mobilewithBackButton = [
  //   '/salary-for-life',
  //   '/instant-cashout',
  //   '/wyse-cash',
  //   '/awoof',
  //   '/soccer-cash/game-selection',
  //   '/soccer-cash/game-selection/shared',
  //   '/soccer-cash/game-selection/all-in',
  //   '/soccer-cash/game-selection/virtual',
  //   '/soccer-cash/match-scores/virtual',
  //   '/soccer-cash/success/virtual',
  //   '/soccer-cash/match-scores/virtual-static',
  //   '/soccer-cash/predict-match-scores',
  // ];

  const pagesWithoutDesktopHeaders = [
    '/soccer-cash/game-selection',
    '/soccer-cash/game-selection/shared',
    '/soccer-cash/game-selection/all-in',
    // '/soccer-cash/game-selection/virtual',
    '/soccer-cash/predict-match-scores',
    '/soccer-cash/finalists',
  ];
  const pagesWithoutMobileHeaders = ['/salary-for-life', '/banker', '/quika'];

  // const pagesWithoutTopBar = ['/soccer-cash/summary'];

  // const istopBarHidden = pagesWithoutTopBar.includes(pathname);

  // const isMobileJackpotHidden = pagesWithoutMobileJackpots.includes(pathname);
  // const isDesktopJackpotHidden = pagesWithoutDesktopJackpots.includes(pathname);

  // const { data: userDetails } = useUser();

  // console.log(userDetails, "user dets")
  // const { play_balance } = userDetails || {};

  const [_isMobile, setIsMobile] = React.useState(false);

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  // create an event listener
  React.useEffect(() => {
    window.addEventListener('resize', handleResize);

    //cleanup function
    return () => window.removeEventListener('resize', handleResize);
  });
  const router = useRouter();
  const { isModalOpen } = useModalControl();
  // const [isUnsubscribeModalOpen, setIsUnsubscribeModalOpen] = React.useState(false);


  // const isContactPage = router.pathname === '/contact';

  // const [isGloModalOpen, setIsGloModalOpen] = React.useState(false);

  return (
    <header
      className={clsx(
        'overflow-x-auto px-4 md:px-8 md:pt-11 md:pb-4 lg:px-10',
        pathname === '/dashboard' && 'bg-[#111111]',
        pathname !== '/dashboard' && 'bg-[#111111]',
        pagesWithoutDesktopHeaders.includes(pathname) && 'md:hidden',
        pagesWithoutMobileHeaders.includes(pathname) && 'hidden md:block',
      )}
      id="anchorHeader"
    >
      <nav
        className={clsx(
          'hidden flex-1 text-sm text-neutral-400 ',
          isModalOpen ? 'hidden' : 'lg:block',
        )}
      >
        <ul className="flex justify-center gap-4 lg:gap-12">
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
    </header>
  );
};
