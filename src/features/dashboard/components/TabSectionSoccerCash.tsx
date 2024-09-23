import { ClientOnly } from '@/components/elements';
import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import React from 'react';
import { useGetGameWonHistory } from '../api';
import { DashTable } from './Table';

export const TabSectionSoccerCash = () => {
  const { pathname } = useRouter();

  const WHYSECASHROUTE = '/wyse-cash';
  const DASHBOARDROUTE = '/dashboard';
  const SALARYFORLIFEROUTE = '/salary-for-life';
  const INSTANTCASHOUTROUTE = '/instant-cashout';

  //CAMPAIGN ROUTES
  const CAMPAIGNSALARYFORLIFEROUTE = '/campaigns/salary-for-life';
  const CAMPAIGNINSTANTCASHOUTROUTE = '/campaigns/instant-cashout';
  const CAMPAIGNWHYSECASHROUTE = '/campaigns/wyse-cash';

  const pathNameIndexes: { [index: string]: number } = {
    [INSTANTCASHOUTROUTE]: 1,
    [WHYSECASHROUTE]: 2,
    [DASHBOARDROUTE]: 0,
    [SALARYFORLIFEROUTE]: 2,
    [CAMPAIGNSALARYFORLIFEROUTE]: 0,
    [CAMPAIGNINSTANTCASHOUTROUTE]: 1,
    [CAMPAIGNWHYSECASHROUTE]: 2,
  };

  const [selectedIndex, setSelectedIndex] = React.useState<number>(pathNameIndexes[pathname]);

  const [date] = React.useState('2022-09-16');
  const { data: salaryForLifeGameWonHistory, isLoading: isSalaryForLifeLoading } =
    useGetGameWonHistory('salary_for_life', date);
  const { data: instantCashOutGameWonHistory, isLoading: isInstantCashOutLoading } =
    useGetGameWonHistory('instant_cashout', date);
  const { data: wyseCashGameWonHistory, isLoading: isWyseCashGameWonHistory } =
    useGetGameWonHistory('wyse_cash', date);

  const SALARYFORLIFEGAMEWONHISTORY = {
    games: salaryForLifeGameWonHistory?.games,
    top_winning_ticket: salaryForLifeGameWonHistory?.top_winning_ticket,
  };

  const INSTANTCASHOUTGAMEWONHISTORY = {
    games: instantCashOutGameWonHistory?.games,
    top_winning_ticket: instantCashOutGameWonHistory?.top_winning_ticket,
  };

  const WYSECASHGAMEWONHISTORY = {
    games: wyseCashGameWonHistory?.games,
    top_winning_ticket: wyseCashGameWonHistory?.top_winning_ticket,
  };

  const games = () => {
    if (pathname === CAMPAIGNSALARYFORLIFEROUTE) {
      return salaryForLifeGameWonHistory?.jackpot_winners;
    } else if (pathname === CAMPAIGNINSTANTCASHOUTROUTE) {
      return instantCashOutGameWonHistory?.jackpot_winners;
    } else if (pathname === CAMPAIGNWHYSECASHROUTE) {
      return wyseCashGameWonHistory?.jackpot_winners;
    }
  };

  const JACKPOTGAMEWONHISTORY = {
    games: games(),
  };

  return (
    <section className="salary_for_life mt-[30px]">
      <h1 className="my-2 text-white">Winners</h1>

      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List className="flex items-center space-x-1 overflow-auto rounded-[10px] bg-[#15171D] p-1">
          <Tab
            className={({ selected }) =>
              clsx(
                'ml-4 w-full whitespace-nowrap border-b-[3px] p-3 text-sm font-medium  leading-5 ring-white ring-opacity-60 md:w-[25%] ',
                selected ? 'border-[#B500FF] text-[#B500FF]' : 'border-transparent text-white',
              )
            }
          >
            Soccer Cash
          </Tab>
          <Tab
            className={({ selected }) =>
              clsx(
                'ml-4 w-full whitespace-nowrap border-b-[3px] p-3 text-sm font-medium  leading-5 ring-white ring-opacity-60 md:w-[25%] ',
                selected ? 'border-[#B500FF] text-[#B500FF]' : 'border-transparent text-white',
              )
            }
          >
            Jackpot Winners
          </Tab>
        </Tab.List>

        <ClientOnly>
          <Tab.Panels>
            <Tab.Panel className="rounded-[10px] p-[0px] xl:py-[10px]">
              <h1 className="my-4">Salary for Life Winners</h1>
              <DashTable
                gameType="salaryForLife"
                emptyNotice={'No Game Won History yet'}
                data={SALARYFORLIFEGAMEWONHISTORY}
                hasResultPicksComponent={true}
                emptyNoticeSubheading={
                  'You are yet to have any Game won by any user. Details of your Game won by users would be displayed here.'
                }
                isLoading={isSalaryForLifeLoading}
              />
            </Tab.Panel>

            <Tab.Panel className="rounded-[10px] p-[0px] xl:py-[10px]">
              <h1 className="my-4">Instant Cashout Winners</h1>
              <DashTable
                gameType="instantCashout"
                emptyNotice={'No Game Won History yet'}
                emptyNoticeSubheading={
                  'You are yet to have any Game won by any user. Details of your Game won by users would be displayed here.'
                }
                data={INSTANTCASHOUTGAMEWONHISTORY}
                hasResultPicksComponent={true}
                isLoading={isInstantCashOutLoading}
              />
            </Tab.Panel>
            <Tab.Panel className="rounded-[10px] p-[0px] xl:py-[10px]">
              <h1 className="my-4">Wyse Cash Winners</h1>
              <DashTable
                gameType="wyseCash"
                emptyNotice={'No Game Won History yet'}
                emptyNoticeSubheading={
                  'You are yet to have any Game won by any user. Details of your Game won by users would be displayed here.'
                }
                data={WYSECASHGAMEWONHISTORY}
                hasResultPicksComponent={true}
                isLoading={isWyseCashGameWonHistory}
              />
            </Tab.Panel>
            <Tab.Panel className="rounded-[10px] p-[0px] xl:py-[10px]">
              <h1 className="my-4">Jackpot Winners</h1>
              <DashTable
                data={JACKPOTGAMEWONHISTORY}
                gameType="jackpotWinners"
                emptyNotice={'No Jackpot Winners yet'}
                emptyNoticeSubheading={
                  'You are yet to have any Jackpot won by any user. Details of your Jackpots won by users would be displayed here.'
                }
                isLoading={false}
              />
            </Tab.Panel>
          </Tab.Panels>
        </ClientOnly>
      </Tab.Group>
    </section>
  );
};
