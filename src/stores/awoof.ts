import { create, StateCreator } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { AwoofItem } from '@/types';

interface ItemAmountDesc {
  amount: number | undefined;
  amountType: 'mid' | 'min' | 'max';
}

interface GameSlice extends AwoofItem {
  selectedAmount: ItemAmountDesc;
  numberOfChances: number;
}

interface SelectedAwoofItemsSlice {
  selectedAwoofItems: GameSlice[];
  increaseNumberOfChances: () => void;
  decreaseNumberOfChances: () => void;
  addItem: (
    newSelectedItem: AwoofItem | undefined,
    itemAmountSelected: { amount: number | undefined; amountType: 'mid' | 'min' | 'max' },
  ) => void;
  deleteAllSelectedAwoofItems: () => void;
}

const createSelectedItemsSlice: StateCreator<
  SelectedAwoofItemsSlice & SuccessSlice,
  [['zustand/persist', unknown]],
  [],
  SelectedAwoofItemsSlice
> = set => ({
  selectedAwoofItems: [],

  addItem: (newSelectedItem, itemAmountSelected) =>
    set(state => {
      const previouslyAddedAwoofItem = state.selectedAwoofItems.find(
        selectedItem => selectedItem.id == newSelectedItem?.id,
      );

      const hasAwoofItemBeenAdded = !!previouslyAddedAwoofItem;

      if (!hasAwoofItemBeenAdded) {
        const newAwoofItem = {
          ...newSelectedItem,
          selectedAmount: itemAmountSelected,
          numberOfChances: 1,
        };

        return {
          selectedAwoofItems: [
            // ...state.selectedAwoofItems,
            newAwoofItem,
          ],
        };
      }

      const updatedAwoofItem = {
        ...previouslyAddedAwoofItem,
        selectedAmount: itemAmountSelected,
      };

      return {
        selectedAwoofItems: [
          ...state.selectedAwoofItems.map(item =>
            item.id == newSelectedItem?.id ? updatedAwoofItem : item,
          ),
        ],
      };
    }),

  increaseNumberOfChances: () =>
    set(state => {
      const checkSelectedItems = state.selectedAwoofItems.find((_item, index) => index == 0);
      const hasAwoofItemBeenAdded = !!checkSelectedItems;

      if (hasAwoofItemBeenAdded && checkSelectedItems.item_price && checkSelectedItems.life_style) {
        const fivePercentItemPrice = (5 / 100) * checkSelectedItems?.item_price;

        const singleLifeStyleStackAmount =
          checkSelectedItems.life_style[checkSelectedItems.selectedAmount.amountType];
        const confirmNumberOfChances = checkSelectedItems.numberOfChances + 1;

        const stakeAmountItemPriceDivision =
          (singleLifeStyleStackAmount * confirmNumberOfChances * 100) /
          checkSelectedItems.item_price;

        const shouldIncreaseChancesByOne = !!(stakeAmountItemPriceDivision > fivePercentItemPrice);

        if (!shouldIncreaseChancesByOne) {
          return {
            selectedAwoofItems: state.selectedAwoofItems.map((item, index) =>
              index == 0 ? { ...item, numberOfChances: item.numberOfChances + 1 } : item,
            ),
          };
        }
      }

      return state;
    }),

  decreaseNumberOfChances: () =>
    set(state => {
      return {
        selectedAwoofItems: [
          ...state.selectedAwoofItems.map((item, index) =>
            index == 0
              ? {
                  ...item,
                  numberOfChances: item.numberOfChances <= 1 ? 1 : item.numberOfChances - 1,
                }
              : item,
          ),
        ],
      };
    }),

  deleteAllSelectedAwoofItems: () =>
    set(() => ({
      selectedAwoofItems: [],
    })),
});

type AwoofSuccessResponse = {
  all_tickets: string[];
  status: string;
  bidId: string;
  cashoutPin: string;
  purchaseType: string;
  item: string;
  bidAmount: string;
  instantCashoutPicks: { stake_amount: number; pin: string; game_id: string; status: string }[];
};

interface SuccessSlice {
  successResponse: AwoofSuccessResponse;
  addSuccessResponse: (successResponseObject: AwoofSuccessResponse) => void;
}

const createSuccessSlice: StateCreator<
  SelectedAwoofItemsSlice & SuccessSlice,
  [['zustand/persist', unknown]],
  [],
  SuccessSlice
> = set => ({
  successResponse: {
    all_tickets: [],
    status: '',
    bidId: '',
    cashoutPin: '',
    purchaseType: '',
    item: '',
    bidAmount: '',
    instantCashoutPicks: [],
  },

  addSuccessResponse: successObject =>
    set(() => ({
      successResponse: successObject,
    })),
});

export const useAwoofStore = create<SelectedAwoofItemsSlice & SuccessSlice>()(
  persist(
    (...a) => {
      return {
        ...createSelectedItemsSlice(...a),
        ...createSuccessSlice(...a),
      };
    },
    {
      name: 'awoof-game-store',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
