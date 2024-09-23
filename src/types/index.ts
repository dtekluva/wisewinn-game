// import { faker } from '@faker-js/faker';

// const range = (len: number) => {
//   const arr = [];
//   for (let i = 0; i < len; i++) {
//     arr.push(i);
//   }
//   return arr;
// };

export interface Winner {
  top_3_winners: WinnerDataEntity[];
  jackpot_winners: SingleJackpotWinnerEntity[];
  other_winners: Other_WinnersEntity[];
}

export interface Other_WinnersEntity {
  salary_for_life: WinnerDataEntity[];
  instant_cashout: WinnerDataEntity[];
  wyse_cash: WinnerDataEntity[];
}

export interface JackpotWinnersEntity {
  MEGA_JACKPOT: SingleJackpotWinnerEntity[];
  CROWN_JUMBO_JACKPOT: SingleJackpotWinnerEntity[];
  SUPER_JACKPOT: SingleJackpotWinnerEntity[];
}

export interface SingleJackpotWinnerEntity {
  user: number;
  jackpot: number;
  amount: number;
  earning: string;
  win_type: string;
  date: Date;
  phone_number: string;
  total_jackpot_amount: string;
}

export interface WinnerDataEntity {
  phone_number: string;
  earning: string;
  total_jackpot_amount: string;
  game_play_id: string;
  win_type: string;
  lotto_type: string;
  date_won: string;
  ticket: string[];
}

export interface JackpotDataEntity {
  status: number;
  message: string;
  data: JackpotEntity[];
}
export interface JackpotEntity {
  threshold: number;
  contributed_amount: number;
  jackpot_type: string;
  jackpot_id: string;
  percentage: number;
}

export interface ActiveGamesEntity {
  whyse_cahs: SingleActiveGameEntity[];
  lotto: SingleActiveGameEntity[];
}
interface SingleActiveGameEntity {
  account_no: string;
  agent_profile: string;
  band: string;
  batch: number;
  channel: string;
  date: string;
  game_play_id?: string;
  has_interest: boolean;
  instance_number: number;
  lucky_number: string;
  paid: boolean;
  phone: string;
  pool: string;
  stake_amount: number;
  unique_id: string;
  user_profile: number;
  ticket: string[];
}

export interface Lottery {
  status: number;
  message: string;
  data: LotteryDataEntity;
}

export interface LotteryDataEntity {
  lottery_data: LotteryNumbers;
  bands: BandCategories;
}

export interface BandCategories {
  [key: number]: string;
}

export interface LotteryNumbers {
  [key: number]: LotteryNumber[];
}

export interface LotteryNumber {
  number: string;
  stake: string;
}

export interface PostLotteryDto {
  ten: PostLotteryDtoEntity[];
  fifty: PostLotteryDtoEntity[];
  two_fifty: PostLotteryDtoEntity[];
  five_hundred: PostLotteryDtoEntity[];
}

export interface UpdateUserDto {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
  gender?: string;
}

export interface PostLotteryDtoEntity {
  stake_amount: string;
  lucky_number: string;
  consent: string;
  band: string;
}

export interface PostPaymentDto {
  from_referral_wallet: boolean;
  from_play_wallet: boolean;
  paystack: boolean;
  amount: string;
  game_play_id: string;
}

export interface LotteryStatusDto {
  game_play_id: string;
}

export interface SingleWyseCashGame {
  id: string;
  percentage: number;
  band: number;
  average_stake: number;
  average_potential_winning: number;
}

export interface WyseCashGameDto {
  [key: string]: SingleWyseCashGame;
}

export interface PostFundWalletDto {
  amount: number;
  fund_wallet_type: string;
  bank_code?: string;
  pin?: string;
}

export interface TransactionHistory {
  id: number;
  all_transactions?: TransactionHistoryEntity[];
}
export interface TransactionHistoryEntity {
  id: number;
  transaction_type: string;
  transaction_reference: string;
  method: string;
  amount: number;
  status: 'Pending' | 'Successful' | 'Unsuccessful';
  date_created: string;
  subRows?: TransactionHistoryEntity[];
}

export type ToastNotification = 'success' | 'error' | 'neutral';

export interface GameHistoryInfoProps {
  gameName: string;
  gameID: string;
  picks?: string | number | undefined;
  amountWon?: number | string;
  date: string;
  totalStake: number;
  potentialWinning?: number;
  gameStatus: string;
  isHaveBtn?: boolean;
}

export interface GameNumberPicksProps {
  gamesBalls: number[];
  stake: number;
  status: GameStatus;
  serialNo: number;
  amountWon?: number;
}
export interface ReferAndEarnEntity {
  id: number;
  date_created: string;
  user_name: string;
  user_phone: string;
  amount: string;
  play_percentage: string;
  status: string;
  subRows?: ReferAndEarnEntity[];
  // referred_users: string;
  // user_email: string;
}

export interface DashboardEntity {
  id: number;
  date: string;
  winner: string;
  stake: string;
  amountWon: string;
  gameType: string;
  matchType: string;
  // matchType: 'Exact (NAP) 5/5' | 'Random (PERM) 4/5';
  subRows?: DashboardEntity[];
}

export interface GameWonHistoryDto {
  id: number;
  phone_number: string;
  earning: number;
  stake_amount: number;
  total_jackpot_amount: string;
  ticket: string[][] | number[] | string;
  game_play_id: string;
  win_type: string;
  lotto_type: string;
  date_won: Date;
}

export interface GameWonHistoryProps {
  top_winning_ticket: GameWonHistoryDto[];
  games: GameWonHistoryDto[];
  jackpot_winners: GameWonHistoryDto[];
  total_page?: number;
  total_data_count?: number;
  page_count?: number;
}

export interface LotteryHistory {
  game_play_id: string;
  lottery_type: string;
  potential_winning: number;
  date: Date;
  number_of_ticket: number;
  status: string;
}

// const newDashboard = (): DashboardEntity => {
//   return {
//     id: faker.datatype.number(),
//     date: faker.date.past().toDateString(),
//     winner: faker.internet.email(),
//     stake: faker.datatype.number(100000).toString(),
//     amountWon: faker.datatype.number(100000).toString(),
//     gameType: 'Salary for Life',
//     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//     matchType: faker.helpers.shuffle<DashboardEntity['matchType']>([
//       'Exact (NAP) 5/5',
//       'Random (PERM) 4/5',
//     ])[0]!,
//   };
// };

// export function makesDashboardData(...lens: number[]) {
//   const makeDataLevel = (depth = 0): DashboardEntity[] => {
//     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//     const len = lens[depth]!;
//     return range(len).map((): DashboardEntity => {
//       return {
//         ...newDashboard(),
//         subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
//       };
//     });
//   };
//   return makeDataLevel();
// }

export interface GetPlay {
  salary_for_life: Game;
  instant_cashout: Game;
  wyse_cash: Game;
}

export interface Game {
  [key: string]: GAME_RESULTS_PROPS[];
}

export interface GAME_RESULTS_PROPS {
  amount: number;
  batch: number;
  date: string;
  lottery_type: string;
  phone_number: string;
  ticket_number: string | string[];
}

export interface SingleGetPlay {
  id: number;
  band?: number;
  percentage: number;
  average_stake: number;
  average_potential_winning: number;
  game_type?: string;
}

export interface PeoplePlayEntity {
  id: number;
  gameTypes: 'Salary for life' | 'cashout' | 'Wyse Cash';
  percentPlay: string;
  averageStakeAmount: string;
  averagePotentialWinningAmount: string;
  subRows?: PeoplePlayEntity[];
}

export type GameStatus = 'won' | 'lost' | 'pending';

export type GameHistoryStatus = 'all-games' | 'won' | 'pending';

export interface BanksDto {
  bank_code: string;
  bank_short_name: string;
  cbn_code: string;
  disabled_for_vnuban: string;
  logo: string;
  name: string;
}

export interface AwoofItem {
  base?: { min: number; mid: number; max: number };
  id?: number;
  illusion?: { min: number; mid: number; max: number };
  instant_cashout?: { min: number; mid: number; max: number };
  item_price?: number;
  images?: string[];
  item_name?: string;
  item_status?: string;
  life_style?: { min: number; mid: number; max: number };
  percentage?: number;
}
