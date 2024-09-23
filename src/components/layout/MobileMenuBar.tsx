import { clsx } from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { ClientOnly } from '@/components/elements';

export const MobileMenuBar = () => {
  const { pathname } = useRouter();
  const DASHBOARDROUTE = '/dashboard';
  const GAMEHISTORYROUTE = '/game-history';
  const CHATROUTE = '/chats-and-tips';
  const WALLETROUTE = '/wallet';
  const MENUROUTE = '/menu';

  const ROUTES_WITHOUT_TAB_BAR = [''];

  const checkRouter = (routeName: string) => {
    return pathname === routeName;
  };

  const isHidden = ROUTES_WITHOUT_TAB_BAR.includes(pathname);

  return (
    <ClientOnly>
      <div
        className={clsx(
          'fixed bottom-0 z-40 flex w-full flex-row items-center justify-between bg-[#15171D] px-4 py-2',
          isHidden && 'hidden',
        )}
      >
        <Link href="/dashboard">
          <a className="flex flex-col items-center justify-center gap-2">
            <div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24.0375 8.01252L15.85 1.46252C14.25 0.187523 11.75 0.175023 10.1625 1.45002L1.97501 8.01252C0.800015 8.95002 0.0875147 10.825 0.337515 12.3L1.91251 21.725C2.27501 23.8375 4.23751 25.5 6.37501 25.5H19.625C21.7375 25.5 23.7375 23.8 24.1 21.7125L25.675 12.2875C25.9 10.825 25.1875 8.95002 24.0375 8.01252Z"
                  fill="white"
                  opacity={checkRouter(DASHBOARDROUTE) ? '1' : '0.4'}
                />
                <path
                  d="M13 21.4375C12.4875 21.4375 12.0625 21.0125 12.0625 20.5V16.75C12.0625 16.2375 12.4875 15.8125 13 15.8125C13.5125 15.8125 13.9375 16.2375 13.9375 16.75V20.5C13.9375 21.0125 13.5125 21.4375 13 21.4375Z"
                  fill="#4C1961"
                  opacity={checkRouter(DASHBOARDROUTE) ? '1' : '0.6'}
                />
              </svg>
            </div>

            <p
              className={clsx(
                'text-xs',
                checkRouter(DASHBOARDROUTE) ? 'text-white' : 'text-[#fff]/40',
              )}
            >
              Home
            </p>
          </a>
        </Link>

        <Link href="/game-history">
          <a className="flex flex-col items-center justify-center gap-2">
            <div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity={checkRouter(GAMEHISTORYROUTE) ? '1' : '0.4'}
                  d="M17.028 0H6.972C2.604 0 0 2.604 0 6.972V17.028C0 21.396 2.604 24 6.972 24H17.028C21.396 24 24 21.396 24 17.028V6.972C24 2.604 21.396 0 17.028 0Z"
                  fill="white"
                />
                <path
                  opacity={checkRouter(GAMEHISTORYROUTE) ? '1' : '0.4'}
                  d="M19.572 8.24399C19.572 8.73599 19.176 9.14399 18.672 9.14399H12.372C11.88 9.14399 11.472 8.73599 11.472 8.24399C11.472 7.75199 11.88 7.34399 12.372 7.34399H18.672C19.176 7.34399 19.572 7.75199 19.572 8.24399Z"
                  fill={checkRouter(GAMEHISTORYROUTE) ? '#4C1961' : '#FFF'}
                />
                <path
                  opacity={checkRouter(GAMEHISTORYROUTE) ? '1' : '0.4'}
                  d="M9.564 7.08L6.864 9.78C6.684 9.96 6.456 10.044 6.228 10.044C6 10.044 5.76 9.96 5.592 9.78L4.692 8.88C4.332 8.532 4.332 7.956 4.692 7.608C5.04 7.26 5.604 7.26 5.964 7.608L6.228 7.872L8.292 5.808C8.64 5.46 9.204 5.46 9.564 5.808C9.912 6.156 9.912 6.732 9.564 7.08Z"
                  fill={checkRouter(GAMEHISTORYROUTE) ? '#4C1961' : '#FFF'}
                />
                <path
                  opacity={checkRouter(GAMEHISTORYROUTE) ? '1' : '0.4'}
                  d="M19.572 16.644C19.572 17.136 19.176 17.544 18.672 17.544H12.372C11.88 17.544 11.472 17.136 11.472 16.644C11.472 16.152 11.88 15.744 12.372 15.744H18.672C19.176 15.744 19.572 16.152 19.572 16.644Z"
                  fill={checkRouter(GAMEHISTORYROUTE) ? '#4C1961' : '#FFF'}
                />
                <path
                  opacity={checkRouter(GAMEHISTORYROUTE) ? '1' : '0.4'}
                  d="M9.564 15.48L6.864 18.18C6.684 18.36 6.456 18.444 6.228 18.444C6 18.444 5.76 18.36 5.592 18.18L4.692 17.28C4.332 16.932 4.332 16.356 4.692 16.008C5.04 15.66 5.604 15.66 5.964 16.008L6.228 16.272L8.292 14.208C8.64 13.86 9.204 13.86 9.564 14.208C9.912 14.556 9.912 15.132 9.564 15.48Z"
                  fill={checkRouter(GAMEHISTORYROUTE) ? '#4C1961' : '#FFF'}
                />
              </svg>
            </div>
            <p
              className={clsx(
                'text-xs',
                checkRouter(GAMEHISTORYROUTE) ? 'text-white' : 'text-[#fff]/40',
              )}
            >
              Game History
            </p>
          </a>
        </Link>

        <Link href={CHATROUTE}>
          <a rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-2">
            <div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity={checkRouter(CHATROUTE) ? '1' : '0.3'}
                  d="M17.98 10.79V14.79C17.98 15.05 17.97 15.3 17.94 15.54C17.71 18.24 16.12 19.58 13.19 19.58H12.79C12.54 19.58 12.3 19.7 12.15 19.9L10.95 21.5C10.42 22.21 9.56 22.21 9.03 21.5L7.82999 19.9C7.69999 19.73 7.41 19.58 7.19 19.58H6.79001C3.60001 19.58 2 18.79 2 14.79V10.79C2 7.86001 3.35001 6.27001 6.04001 6.04001C6.28001 6.01001 6.53001 6 6.79001 6H13.19C16.38 6 17.98 7.60001 17.98 10.79Z"
                  fill="white"
                />
                <path
                  d="M9.99023 14C9.43023 14 8.99023 13.55 8.99023 13C8.99023 12.45 9.44023 12 9.99023 12C10.5402 12 10.9902 12.45 10.9902 13C10.9902 13.55 10.5502 14 9.99023 14Z"
                  fill={checkRouter(CHATROUTE) ? '#4C1961' : '#fff'}
                />
                <path
                  d="M13.4902 14C12.9302 14 12.4902 13.55 12.4902 13C12.4902 12.45 12.9402 12 13.4902 12C14.0402 12 14.4902 12.45 14.4902 13C14.4902 13.55 14.0402 14 13.4902 14Z"
                  fill={checkRouter(CHATROUTE) ? '#4C1961' : '#fff'}
                />
                <path
                  d="M6.5 14C5.94 14 5.5 13.55 5.5 13C5.5 12.45 5.95 12 6.5 12C7.05 12 7.5 12.45 7.5 13C7.5 13.55 7.05 14 6.5 14Z"
                  fill={checkRouter(CHATROUTE) ? '#4C1961' : '#fff'}
                />
                <path
                  d="M21.98 6.79001V10.79C21.98 13.73 20.63 15.31 17.94 15.54C17.97 15.3 17.98 15.05 17.98 14.79V10.79C17.98 7.60001 16.38 6 13.19 6H6.79004C6.53004 6 6.28004 6.01001 6.04004 6.04001C6.27004 3.35001 7.86004 2 10.79 2H17.19C20.38 2 21.98 3.60001 21.98 6.79001Z"
                  fill={checkRouter(CHATROUTE) ? '#4C1961' : '#fff'}
                />
              </svg>
            </div>
            <p
              className={clsx('text-xs', checkRouter(CHATROUTE) ? 'text-white' : 'text-[#fff]/40')}
            >
              Chat
            </p>
          </a>
        </Link>

        <Link href="/wallet">
          <a className="flex flex-col items-center justify-center gap-2">
            <div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.6"
                  d="M27.4996 13.715V16.2901C27.4996 16.9776 26.9496 17.54 26.2496 17.565H23.7996C22.4496 17.565 21.2121 16.5775 21.0996 15.2275C21.0246 14.44 21.3246 13.7025 21.8496 13.19C22.3121 12.715 22.9496 12.4401 23.6496 12.4401H26.2496C26.9496 12.4651 27.4996 13.0275 27.4996 13.715Z"
                  fill={checkRouter(WALLETROUTE) ? '#4C1961' : '#FFF'}
                />
                <path
                  opacity={checkRouter(WALLETROUTE) ? '1' : '.4'}
                  d="M21.8495 13.1858C21.3245 13.6983 21.0246 14.4358 21.0996 15.2233C21.2121 16.5733 22.4495 17.5608 23.7995 17.5608H26.2496V19.3733C26.2496 23.1233 23.7496 25.6233 19.9996 25.6233H8.74957C4.99957 25.6233 2.49957 23.1233 2.49957 19.3733V10.6233C2.49957 7.22329 4.54958 4.84829 7.73707 4.44829C8.06207 4.39829 8.39957 4.37329 8.74957 4.37329H19.9996C20.3246 4.37329 20.6371 4.38578 20.9371 4.43578C24.1621 4.81078 26.2496 7.19829 26.2496 10.6233V12.4358H23.6495C22.9495 12.4358 22.312 12.7108 21.8495 13.1858Z"
                  fill="white"
                />
                <g opacity="0.6">
                  <path
                    d="M16.2504 12.1875H8.75043C8.23793 12.1875 7.81293 11.7625 7.81293 11.25C7.81293 10.7375 8.23793 10.3125 8.75043 10.3125H16.2504C16.7629 10.3125 17.1879 10.7375 17.1879 11.25C17.1879 11.7625 16.7629 12.1875 16.2504 12.1875Z"
                    fill={checkRouter(WALLETROUTE) ? '#4C1961' : '#FFF'}
                  />
                </g>
              </svg>
            </div>
            <p
              className={clsx(
                'text-xs',
                checkRouter(WALLETROUTE) ? 'text-white' : 'text-[#fff]/40',
              )}
            >
              Wallet
            </p>
          </a>
        </Link>

        {/* <Link href="/profile-settings/settings">
          <a className="flex flex-col items-center justify-center gap-2">
            <div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity={checkRouter(SETTINGSROUTE) ? '1' : '.2'}
                  d="M15 2.5C11.725 2.5 9.0625 5.1625 9.0625 8.4375C9.0625 11.65 11.575 14.25 14.85 14.3625C14.95 14.35 15.05 14.35 15.125 14.3625C15.15 14.3625 15.1625 14.3625 15.1875 14.3625C15.2 14.3625 15.2 14.3625 15.2125 14.3625C18.4125 14.25 20.925 11.65 20.9375 8.4375C20.9375 5.1625 18.275 2.5 15 2.5Z"
                  fill="white"
                />
                <path
                  opacity={checkRouter(SETTINGSROUTE) ? '1' : '.2'}
                  d="M21.35 17.6875C17.8625 15.3625 12.175 15.3625 8.66251 17.6875C7.07501 18.75 6.20001 20.1875 6.20001 21.725C6.20001 23.2625 7.07501 24.6875 8.65001 25.7375C10.4 26.9125 12.7 27.5 15 27.5C17.3 27.5 19.6 26.9125 21.35 25.7375C22.925 24.675 23.8 23.25 23.8 21.7C23.7875 20.1625 22.925 18.7375 21.35 17.6875Z"
                  fill="white"
                />
              </svg>
            </div>
            <p
              className={clsx(
                'text-xs',
                checkRouter(SETTINGSROUTE) ? 'text-white' : 'text-[#fff]/40',
              )}
            >
              Profile
            </p>
          </a>
        </Link> */}

        <Link href="/menu">
          <a className="flex flex-col items-center justify-center gap-2">
            <div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity={checkRouter(MENUROUTE) ? '1' : '.4'}>
                  <path
                    d="M21.7817 2.33331H19.565C17.0217 2.33331 15.68 3.67498 15.68 6.21831V8.43498C15.68 10.9783 17.0217 12.32 19.565 12.32H21.7817C24.325 12.32 25.6667 10.9783 25.6667 8.43498V6.21831C25.6667 3.67498 24.325 2.33331 21.7817 2.33331Z"
                    fill="white"
                  />
                  <path
                    d="M8.44665 15.6683H6.22998C3.67498 15.6683 2.33331 17.01 2.33331 19.5533V21.77C2.33331 24.325 3.67498 25.6667 6.21831 25.6667H8.43498C10.9783 25.6667 12.32 24.325 12.32 21.7817V19.565C12.3316 17.01 10.99 15.6683 8.44665 15.6683Z"
                    fill="white"
                  />
                  <path
                    d="M7.33831 12.3433C10.1025 12.3433 12.3433 10.1025 12.3433 7.33831C12.3433 4.57413 10.1025 2.33331 7.33831 2.33331C4.57413 2.33331 2.33331 4.57413 2.33331 7.33831C2.33331 10.1025 4.57413 12.3433 7.33831 12.3433Z"
                    fill="white"
                  />
                  <path
                    d="M20.6617 25.6667C23.4259 25.6667 25.6667 23.4259 25.6667 20.6617C25.6667 17.8975 23.4259 15.6567 20.6617 15.6567C17.8975 15.6567 15.6567 17.8975 15.6567 20.6617C15.6567 23.4259 17.8975 25.6667 20.6617 25.6667Z"
                    fill="white"
                  />
                </g>
              </svg>
            </div>

            <p
              className={clsx('text-xs', checkRouter(MENUROUTE) ? 'text-white' : 'text-[#fff]/40')}
            >
              Menu
            </p>
          </a>
        </Link>
      </div>
    </ClientOnly>
  );
};
