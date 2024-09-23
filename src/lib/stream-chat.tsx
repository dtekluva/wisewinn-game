import * as React from 'react';


import { useRouter } from 'next/router';


interface StreamChatProviderProps {
  children: React.ReactNode;
}

const pagesWithChat = ['/chats-and-tips', '/chats-and-tips/[channelId]'];

export const StreamChatProvider: React.FunctionComponent<StreamChatProviderProps> = ({
  children,
}) => {

  const { pathname } = useRouter();

  const isChatPage = pagesWithChat.includes(pathname);

  if (!isChatPage) {
    return <>{children}</>;
  }

  // if (!chatClient) {
  //   return <FullPageLoader />;
  // }

  return (
  <></>
  );
};
