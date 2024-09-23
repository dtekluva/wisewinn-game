// import { AxiosError } from 'axios';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
// import { SubmitHandler, useForm } from 'react-hook-form';

// import { usePostNewsletterSignup } from '@/features/shared';
import { useNotificationModalControl } from '@/hooks';
// import { formatAxiosErrorMessage, launchNotification } from '@/utils';

import { NotificationModal } from '../elements';
// import { InputError } from '../form';
import { Facebook, Instagram, Twitter } from '../icons';

interface FooterProps {
  appColor?: string;
}

// type FormValues = {
//   email: string;
// };

export const socialMediaLinks = [
  {
    iconName: 'facebook',
    icon: <Facebook />,
    styles: '',
    link: 'https://www.facebook.com/people/WinWise/100086682304071/',
  },
  {
    iconName: 'twitter',
    icon: <Twitter />,
    link: 'https://twitter.com/whisperwyse',
    styles: '',
  },
  {
    iconName: 'instagram',
    icon: <Instagram />,
    link: '',
    styles: 'invisible', //hidden as link is still unavailable
  },
];

export const Footer = ({ appColor = '#000410' }: FooterProps) => {
  const { pathname } = useRouter();

  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   formState: { errors },
  // } = useForm<FormValues>();

  // const { mutate: joinNewsletter, isLoading } = usePostNewsletterSignup();

  const {
    message: errorModalMessage,
    isModalOpen: isErrorModalOpen,
    closeModal: closeErrorModal,
    openModal: _openErrorModal,
  } = useNotificationModalControl();

  const navLinks = [
    {
      name: 'Results',
      url: '/results',
    },
    {
      name: 'Winners',
      url: '/winners',
    },
    // {
    //   name: 'FAQs',
    //   url: '/faqs',
    // },
    // {
    //   name: 'About us',
    //   url: '/about',
    // },
    {
      name: 'Contact us',
      url: '/contact',
    },
  ];

  const pagesWithoutFooter = [
    '/salary-for-life',
    '/instant-cashout',
    '/soccer-cash/game-selection',
    '/soccer-cash/predict-match-scores',
    '/soccer-cash/summary',
    '/chats-and-tips',
    '/chats-and-tips/[channelId]',
  ];

  const isFooterHidden = pagesWithoutFooter.includes(pathname);

  // const onSubmit: SubmitHandler<FormValues> = data => {
  //   joinNewsletter(data, {
  //     onSuccess: () => {
  //       reset();
  //       launchNotification('success', 'You have successfully subscribed for the newsletter');
  //     },

  //     onError: error => {
  //       const errorMessage = formatAxiosErrorMessage(error as AxiosError);
  //       openErrorModal(errorMessage as string);
  //     },
  //   });
  // };

  return (
    <>
      <NotificationModal
        headingText={errorModalMessage}
        label={errorModalMessage}
        type="error"
        allowDismiss
        closeModal={closeErrorModal}
        isModalOpen={isErrorModalOpen}
      />

      <footer className={clsx(isFooterHidden && 'hidden')}>
        <div className={`bg-[${appColor}] px-7 pt-7 pb-16 lg:px-0`}>
          <div className="container mx-auto">
            <div className="lg:grid lg:grid-cols-4">
              <div>
                <h3 className="mb-4 font-clash text-3xl  text-white"><svg width="186" height="66" viewBox="0 0 186 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M58.12 31.2C54.78 31.2 52.5 29.56 52.5 26C52.5 22.8 54.76 20.78 58.06 20.78C61.34 20.78 63.52 22.5 63.52 25.64C63.52 26 63.48 26.26 63.44 26.6H55.28C55.36 28.14 56.08 28.8 58.02 28.8C59.8 28.8 60.42 28.34 60.42 27.48V27.28H63.42V27.5C63.42 29.68 61.3 31.2 58.12 31.2ZM58 23.12C56.22 23.12 55.46 23.72 55.32 25.02H60.64C60.56 23.7 59.76 23.12 58 23.12ZM72.4522 31H69.9722C67.6322 31 66.2122 29.9 66.2122 27.38V23.46H64.6322V20.98H66.2122V19.04H69.2122V20.98H72.4522V23.46H69.2122V27.04C69.2122 28.04 69.5922 28.3 70.6522 28.3H72.4522V31ZM83.5417 31H79.8017L77.0617 20.98H80.1617L81.3417 25.56L81.7617 28.68H81.9617L82.7617 25.26L84.2817 20.98H88.1417L89.6417 25.26L90.4417 28.68H90.6417L91.0817 25.56L92.2417 20.98H95.3017L92.4617 31H88.7217L87.0017 26.18L86.2617 23.42H86.0417L85.2817 26.18L83.5417 31ZM98.6239 34.4H96.9839V31.68H99.4439C100.184 31.68 100.504 31.48 100.704 31.04L95.8039 20.98H99.2039L101.324 25.56L102.164 27.92H102.364L103.164 25.54L105.064 20.98H108.404L103.444 31.72C102.484 33.82 101.144 34.4 98.6239 34.4ZM114.786 31.2C111.406 31.2 109.546 29.88 109.546 27.56V27.5H112.546V27.68C112.546 28.58 113.106 28.82 114.806 28.82C116.406 28.82 116.786 28.56 116.786 27.96C116.786 27.4 116.486 27.24 115.306 27.08L112.486 26.74C110.486 26.52 109.366 25.62 109.366 23.94C109.366 22.18 110.866 20.78 114.306 20.78C117.586 20.78 119.446 22.02 119.446 24.46V24.52H116.446V24.4C116.446 23.58 116.046 23.16 114.206 23.16C112.706 23.16 112.326 23.42 112.326 24.06C112.326 24.58 112.606 24.8 113.926 24.96L116.066 25.22C118.746 25.52 119.746 26.42 119.746 28.08C119.746 29.96 117.886 31.2 114.786 31.2ZM126.876 31.2C123.536 31.2 121.256 29.56 121.256 26C121.256 22.8 123.516 20.78 126.816 20.78C130.096 20.78 132.276 22.5 132.276 25.64C132.276 26 132.236 26.26 132.196 26.6H124.036C124.116 28.14 124.836 28.8 126.776 28.8C128.556 28.8 129.176 28.34 129.176 27.48V27.28H132.176V27.5C132.176 29.68 130.056 31.2 126.876 31.2ZM126.756 23.12C124.976 23.12 124.216 23.72 124.076 25.02H129.396C129.316 23.7 128.516 23.12 126.756 23.12Z" fill="white" />
                  <path d="M58.12 53.2C54.78 53.2 52.5 51.56 52.5 48C52.5 44.8 54.76 42.78 58.06 42.78C61.34 42.78 63.52 44.5 63.52 47.64C63.52 48 63.48 48.26 63.44 48.6H55.28C55.36 50.14 56.08 50.8 58.02 50.8C59.8 50.8 60.42 50.34 60.42 49.48V49.28H63.42V49.5C63.42 51.68 61.3 53.2 58.12 53.2ZM58 45.12C56.22 45.12 55.46 45.72 55.32 47.02H60.64C60.56 45.7 59.76 45.12 58 45.12ZM72.4522 53H69.9722C67.6322 53 66.2122 51.9 66.2122 49.38V45.46H64.6322V42.98H66.2122V41.04H69.2122V42.98H72.4522V45.46H69.2122V49.04C69.2122 50.04 69.5922 50.3 70.6522 50.3H72.4522V53ZM80.8617 53H77.8617V39.6H85.2617C88.5617 39.6 90.4417 41.06 90.4417 43.62C90.4417 45.8 89.1817 47.1 86.6617 47.34V47.5C87.8617 47.82 88.3217 48.46 88.8217 49.4L90.7617 53H87.2817L85.4417 49.52C84.9017 48.48 84.4017 48.14 82.8417 48.14H80.8617V53ZM80.8617 42.3V45.88H85.2417C86.6617 45.88 87.3017 45.48 87.3017 44.08C87.3017 42.76 86.6617 42.3 85.2417 42.3H80.8617ZM97.6294 53.2C94.2894 53.2 92.0094 51.56 92.0094 48C92.0094 44.8 94.2694 42.78 97.5694 42.78C100.849 42.78 103.029 44.5 103.029 47.64C103.029 48 102.989 48.26 102.949 48.6H94.7894C94.8694 50.14 95.5894 50.8 97.5294 50.8C99.3094 50.8 99.9294 50.34 99.9294 49.48V49.28H102.929V49.5C102.929 51.68 100.809 53.2 97.6294 53.2ZM97.5094 45.12C95.7294 45.12 94.9694 45.72 94.8294 47.02H100.149C100.069 45.7 99.2694 45.12 97.5094 45.12ZM110.582 53H106.842L104.102 42.98H107.202L108.382 47.56L108.802 50.68H109.002L109.802 47.26L111.322 42.98H115.182L116.682 47.26L117.482 50.68H117.682L118.122 47.56L119.282 42.98H122.342L119.502 53H115.762L114.042 48.18L113.302 45.42H113.082L112.322 48.18L110.582 53ZM126.824 53.2C124.664 53.2 123.364 52.2 123.364 50.52C123.364 49.04 124.464 48.12 126.604 47.9L130.904 47.46V47.08C130.904 45.78 130.324 45.42 128.724 45.42C127.204 45.42 126.584 45.82 126.584 46.96V47.04H123.564V46.98C123.564 44.5 125.644 42.78 128.944 42.78C132.284 42.78 133.864 44.5 133.864 47.12V53H131.064V50.7H130.904C130.444 52.26 129.044 53.2 126.824 53.2ZM126.384 50.32C126.384 50.86 126.804 51.08 127.684 51.08C129.724 51.08 130.824 50.6 130.904 49.18L127.424 49.58C126.704 49.64 126.384 49.84 126.384 50.32ZM138.984 53H135.984V42.98H138.764V45.64H138.944C139.224 44.02 140.284 42.78 142.304 42.78C144.544 42.78 145.464 44.32 145.464 46.28V47.94H142.464V46.9C142.464 45.8 142.024 45.32 140.804 45.32C139.464 45.32 138.984 45.94 138.984 47.2V53ZM151.631 53.2C148.511 53.2 146.791 51.16 146.791 48C146.791 44.8 148.491 42.78 151.471 42.78C153.851 42.78 155.071 43.96 155.411 45.64H155.591V39.6H158.591V53H155.791V50.22H155.631C155.251 52.2 153.931 53.2 151.631 53.2ZM149.831 48C149.831 49.82 150.731 50.46 152.651 50.46C154.551 50.46 155.591 49.8 155.591 48.06V47.9C155.591 46.16 154.571 45.52 152.651 45.52C150.731 45.52 149.831 46.16 149.831 48ZM166.098 53.2C162.758 53.2 160.478 51.56 160.478 48C160.478 44.8 162.738 42.78 166.038 42.78C169.318 42.78 171.498 44.5 171.498 47.64C171.498 48 171.458 48.26 171.418 48.6H163.258C163.338 50.14 164.058 50.8 165.998 50.8C167.778 50.8 168.398 50.34 168.398 49.48V49.28H171.398V49.5C171.398 51.68 169.278 53.2 166.098 53.2ZM165.978 45.12C164.198 45.12 163.438 45.72 163.298 47.02H168.618C168.538 45.7 167.738 45.12 165.978 45.12ZM177.85 53.2C174.73 53.2 173.01 51.16 173.01 48C173.01 44.8 174.71 42.78 177.69 42.78C180.07 42.78 181.29 43.96 181.63 45.64H181.81V39.6H184.81V53H182.01V50.22H181.85C181.47 52.2 180.15 53.2 177.85 53.2ZM176.05 48C176.05 49.82 176.95 50.46 178.87 50.46C180.77 50.46 181.81 49.8 181.81 48.06V47.9C181.81 46.16 180.79 45.52 178.87 45.52C176.95 45.52 176.05 46.16 176.05 48Z" fill="white" />
                  <path d="M19.116 50.54C7.722 50.54 1.08 43.196 1.08 31.91C1.08 20.624 8.856 13.28 22.032 13.28C34.29 13.28 41.58 18.68 41.58 27.644V28.022H30.24V27.644C30.24 24.296 28.188 23 21.762 23C13.986 23 11.88 24.728 11.88 31.91C11.88 39.092 13.878 40.82 21.222 40.82C28.728 40.82 30.888 40.442 31.374 37.688H20.25V30.236H41.634V50H32.184V42.278H31.644C30.672 46.49 27.594 50.54 19.116 50.54Z" fill="white" />
                </svg>
                </h3>
                <p className="max-w-[500px] text-[10px] text-[#D4D4D4] sm:text-xs lg:max-w-[500px]">
                  Whisperwyse is a product of Whispa Konnect Ltd, a licensed  mobile value added service company based in Lagos Nigeria. We provide services for industries like Fintech, Lending, Software development and gamification.
                  Other products include SMS messaging, USSD and Voice.
                </p>
                <p className="mt-6 text-[10px] text-white sm:text-xs lg:mt-[70px] lg:text-sm xl:mt-[98px]">
                  Get Wyse Get Rewarded is licensed by National lottery regulatory commission
                </p>
                <p className="mt-3 text-xs text-[#D9D9D9] lg:text-base">
                  License No:<span className="font-semibold text-white"> 124842101</span>
                </p>
              </div>
              <div className="mt-10 flex  justify-between space-x-[38px] lg:mt-0 lg:flex-col lg:items-center lg:space-y-[50px]">
                <ul className="space-y-[14px] text-xs font-medium text-white lg:text-base">
                  {navLinks.map(({ name, url }) => (
                    <li key={name}>
                      <Link href={url}>
                        <a>{name}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="flex-1">
                  <div className="relative mx-auto hidden h-[166px] w-[202px] xs:block lg:w-[244px]">
                    <Image
                      objectFit="contain"
                      src="/images/footerBalls.png"
                      layout="fill"
                      alt="snooker ball"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-11 lg:mt-0">
                <p className="text-sm text-white">Follow Us:</p>
                <ul className="mt-4 flex items-center gap-4">
                  {socialMediaLinks.map(({ icon, iconName, link, styles }) => (
                    <li key={iconName}>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={iconName}
                        href={link}
                        className={clsx(styles)}
                      >
                        {icon}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className=" flex justify-between lg:flex-wrap">
                  <div className="flex items-center justify-center gap-2 text-sm font-semibold text-white">
                    <p className="whitespace-nowrap text-[13px] lg:text-base">Play responsibly</p>
                    <p className="h-[30px] w-[30px] rounded-full bg-white text-center text-[11px] leading-[30px] text-black">
                      18+
                    </p>
                  </div>

                  <a
                    className="back-to-top-btn flex items-center space-x-[10px] rounded-[5px] bg-white bg-opacity-20 p-3 text-xs font-medium text-white"
                    href="#anchorHeader"
                  >
                    <span>Back to Top</span>
                    <svg
                      width="12"
                      height="11"
                      viewBox="0 0 12 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.30402 5.73317L0.854374 6.38594C0.956786 6.50112 1.13597 6.52675 1.25115 6.42434L5.66715 2.72514C5.84635 2.57157 6.14073 2.57157 6.31993 2.72514L10.7359 6.42434C10.8511 6.52675 11.0303 6.51398 11.1327 6.38594L11.6831 5.73317C11.7855 5.61799 11.7727 5.43879 11.6447 5.33639L6.33267 0.85639C6.15347 0.702818 5.85909 0.702818 5.67989 0.85639L0.34229 5.33639C0.227111 5.42603 0.201485 5.61799 0.303897 5.73317H0.30402Z"
                        fill="white"
                      />
                      <path
                        d="M0.30402 9.30446L0.854374 9.95723C0.956786 10.0724 1.13597 10.098 1.25115 9.99563L5.66715 6.29643C5.84635 6.14285 6.14073 6.14285 6.31993 6.29643L10.7359 9.99563C10.8511 10.098 11.0303 10.0853 11.1327 9.95723L11.6831 9.30446C11.7855 9.18928 11.7727 9.01008 11.6447 8.90768L6.33267 4.42768C6.15347 4.27411 5.85909 4.27411 5.67989 4.42768L0.34229 8.89488C0.227111 8.99729 0.201485 9.17648 0.303897 9.30452L0.30402 9.30446Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div>
              <div className="h-[1px] w-full bg-white lg:mt-4"></div>

              <div className="mt-[10px] flex justify-between text-[10px] text-white lg:text-sm">
                <p className="flex-1">All rights reserved. &copy; Whispa Konnect Ltd.</p>
                <div className="space-y-[24px] lg:flex lg:flex-1 lg:justify-between lg:space-y-0">
                  <ul>
                    <li>
                      <Link href="/">
                        <a>Privacy Policy</a>
                      </Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link href="/terms">
                        <a>Terms & Conditions</a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <style jsx>{`
              .primary-bg {
                background: linear-gradient(90deg, #4c1961 0%, #ff000f 242.97%);
              }

              .back-to-top-btn {
                backdrop-filter: blur(67px);
              }
            `}</style>
          </div>
        </div>
      </footer>
    </>
  );
};
