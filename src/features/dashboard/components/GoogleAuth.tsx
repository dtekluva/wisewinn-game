import React, { useEffect, useState } from 'react';
import { usePostGoogleAuth } from '@/features/auth';
import { FullPageLoader, NotificationModal } from '@/components/elements';
import { useNotificationModalControl } from '@/hooks';
import { formatAxiosErrorMessage } from '@/utils';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';

interface AuthProps {
  authType: 'SIGN_IN' | 'SIGN_UP';
  text: string;
}

// const GOOGLE_CREDENTIALS_LOCAL = {
//   CLIENT_ID: '503638253031-nkr0rb1ot887ova8kbgm8etbpjo40vnf.apps.googleusercontent.com',
//   CLIENT_SECRET: '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',
// };

const GOOGLE_CREDENTIALS_PRODUCTION = {
  CLIENT_ID: '407795120501-tuj2h7rvhtosh0jhj54ajvl3put9kkvs.apps.googleusercontent.com',
  CLIENT_SECRET: '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',
};

const REDIRECT_URL = {
  LOCAL: 'http://localhost:3000/user/login',
  PRODUCTION: 'https://www.wisewinn.com/user/login',
};

const GoogleAuth = ({ text }: AuthProps) => {
  const router = useRouter();
  const code = router.query.code as string;
  const source = router.query.source as string;

  const getGoogleUrl = () => {
    const rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`;

    const options = {
      client_id: GOOGLE_CREDENTIALS_PRODUCTION.CLIENT_ID,
      redirect_uri: REDIRECT_URL.PRODUCTION,
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
      ].join(' '), // space seperated string
      response_type: 'code',
      access_type: 'offline',
      prompt: 'consent',
    };
    const qs = new URLSearchParams(options);

    const googleLoginUrl = `${rootUrl}?${qs.toString()}`;
    return googleLoginUrl;
  };

  const {
    message: errorModalMessage,
    isModalOpen: isErrorModalOpen,
    closeModal: closeErrorModal,
    openModal: openErrorModal,
  } = useNotificationModalControl();

  const { mutate: postGoogleAuth } = usePostGoogleAuth();
  const [googleAuthLoading, setGoogleAuthLoading] = useState(false);
  async function getAccessTokenFromCode(code: string) {
    setGoogleAuthLoading(true);
    try {
      const { data } = await axios({
        url: `https://oauth2.googleapis.com/token`,
        method: 'POST',
        data: {
          client_id: GOOGLE_CREDENTIALS_PRODUCTION.CLIENT_ID,
          client_secret: GOOGLE_CREDENTIALS_PRODUCTION.CLIENT_SECRET,
          redirect_uri: REDIRECT_URL.PRODUCTION,
          grant_type: 'authorization_code',
          code,
        },
      });

      const updatedData = {
        user_id_token: data?.id_token,
      };

      postGoogleAuth(updatedData, {
        onSuccess: data => {
          if (data.status === 200) {
            router.push((source as string) || '/dashboard');
          }
        },

        onError: error => {
          const errorMessage = formatAxiosErrorMessage(error as AxiosError);
          openErrorModal(errorMessage as string);
          setGoogleAuthLoading(false);
        },
      });
    } catch (error) {
      setGoogleAuthLoading(false);
      console.log({ error });
    }
  }

  useEffect(() => {
    if (code) {
      getAccessTokenFromCode(code);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  return (
    <button
      onClick={() => (window.location.href = getGoogleUrl())}
      className="mt-4 flex h-[50px] w-full items-center justify-center rounded-[7px] border-0 bg-[#fff]/10 outline-0 backdrop-blur-2xl transition delay-150 duration-300 ease-in-out hover:scale-105"
    >
      {googleAuthLoading && <FullPageLoader />}
      <NotificationModal
        headingText={errorModalMessage}
        label={errorModalMessage}
        type="error"
        allowDismiss
        closeModal={closeErrorModal}
        isModalOpen={isErrorModalOpen}
      />
      <div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.8055 8.0415H19V8H10V12H15.6515C14.827 14.3285 12.6115 16 10 16C6.6865 16 4 13.3135 4 10C4 6.6865 6.6865 4 10 4C11.5295 4 12.921 4.577 13.9805 5.5195L16.809 2.691C15.023 1.0265 12.634 0 10 0C4.4775 0 0 4.4775 0 10C0 15.5225 4.4775 20 10 20C15.5225 20 20 15.5225 20 10C20 9.3295 19.931 8.675 19.8055 8.0415Z"
            fill="#FFC107"
          />
          <path
            d="M1.15234 5.3455L4.43784 7.755C5.32684 5.554 7.47984 4 9.99934 4C11.5288 4 12.9203 4.577 13.9798 5.5195L16.8083 2.691C15.0223 1.0265 12.6333 0 9.99934 0C6.15834 0 2.82734 2.1685 1.15234 5.3455Z"
            fill="#FF3D00"
          />
          <path
            d="M10.0002 20.0001C12.5832 20.0001 14.9302 19.0116 16.7047 17.4041L13.6097 14.7851C12.5719 15.5743 11.3039 16.0011 10.0002 16.0001C7.39916 16.0001 5.19066 14.3416 4.35866 12.0271L1.09766 14.5396C2.75266 17.7781 6.11366 20.0001 10.0002 20.0001Z"
            fill="#4CAF50"
          />
          <path
            d="M19.8055 8.0415H19V8H10V12H15.6515C15.2571 13.1082 14.5467 14.0766 13.608 14.7855L13.6095 14.7845L16.7045 17.4035C16.4855 17.6025 20 15 20 10C20 9.3295 19.931 8.675 19.8055 8.0415Z"
            fill="#1976D2"
          />
        </svg>
      </div>

      <h2 className="ml-2 text-sm">{text}</h2>
    </button>
  );
};

export default GoogleAuth;
