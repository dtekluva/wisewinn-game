import { create, StateCreator } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { DefaultStreamChatGenerics } from 'stream-chat-react/dist/types/types';
import type { Channel } from 'stream-chat/dist/types/channel';

interface ChannelsSlice {
  activeChannel: Channel<DefaultStreamChatGenerics> | undefined;
  setActiveChannel: (channel: Channel<DefaultStreamChatGenerics> | undefined) => void;
}

const createChannelsSlice: StateCreator<
  ChannelsSlice,
  [['zustand/persist', unknown]],
  [],
  ChannelsSlice
> = set => ({
  activeChannel: undefined,

  setActiveChannel: channel =>
    set(() => ({
      activeChannel: channel,
    })),
});

export const useChatsZustandStore = create<ChannelsSlice>()(
  persist(
    (...a) => {
      return {
        ...createChannelsSlice(...a),
      };
    },
    {
      name: 'soccer-cash-store',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
