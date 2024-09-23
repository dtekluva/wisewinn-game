import { axios } from '@/lib/axios';
import { useQuery } from 'react-query';

type BidNumber = {
  min: number;
  mid: number;
  max: number;
};
type BidItem = Array<{
  id: number;
  item_name: string;
  percentage: number;
  item_status: string;
  service_type: string;
  images: string[];
  item_price: number;
  base: BidNumber;
  life_style: BidNumber;
  instant_cashout: BidNumber;
  illusion: BidNumber;
}>;

export const getAiBidItems = async (): Promise<BidItem> => {
  const { data } = await axios.get('/awoof/get_ask_ai_items/');
  return data;
};

export const useGetAiBidItems = () => {
  return useQuery('get-ai-items', getAiBidItems, {});
};
