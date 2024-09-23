import * as React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { GameWonHistoryDto } from '@/types';
import {
  addCommasToNumber,
  convertKebabAndSnakeToTitleCase,
  formatShortDate,
  hideMiddleValues,
} from '@/utils';
import { Table } from '@/components/table';
import { ResultNumberPicks } from './ResultNumberPicks';
// import { mockGamWonHistory } from '@/types/mockDashboardData';

export type FilterFormValues = {
  email: string;
  password: string;
};

type DataDto = {
  games?: GameWonHistoryDto[];
  top_winning_ticket?: GameWonHistoryDto[];
};

interface DashTableProps {
  gameType: 'salaryForLife' | 'instantCashout' | 'wyseCash' | 'jackpotWinners';
  showFilters?: boolean;
  title?: string;
  hasResultPicksComponent?: boolean;
  data: DataDto;
  emptyNotice: string;
  emptyNoticeSubheading: string;
  isLoading?: boolean;
  playGameRoute?: string;
}

export const DashTable: React.FunctionComponent<DashTableProps> = ({
  gameType,
  showFilters = true,
  title = 'Winners',
  hasResultPicksComponent,
  emptyNotice,
  emptyNoticeSubheading,
  data,
  playGameRoute,
}) => {
  const columns: ColumnDef<GameWonHistoryDto>[] = [
    {
      header: 'Date',
      accessorKey: 'date_won',
      cell: ({ getValue }) => <>{formatShortDate(getValue() as string, true)}</>,
    },
    {
      header: 'Game type',
      accessorKey: 'lotto_type',
      cell: ({ getValue }) => (
        <span className="whitespace-nowrap">
          {convertKebabAndSnakeToTitleCase(getValue<string>())}
        </span>
      ),
    },
    {
      header: 'Winner',
      accessorKey: 'phone_number',
      cell: ({ getValue }) => (
        <span className="whitespace-nowrap lowercase">
          {hideMiddleValues(getValue() as string, 5) || ''}
        </span>
      ),
    },
    {
      header: 'Stake',
      accessorKey: 'stake_amount',
      cell: ({ getValue }) => (
        <span className="lowercase"> ₦{addCommasToNumber(getValue<number>() || 0)}</span>
      ),
    },
    {
      header: 'Amount Won',
      accessorKey: 'earning',
      cell: ({ getValue }) => (
        <p className="font-semibold text-[#01AE53]">
          ₦{addCommasToNumber((getValue() as number) || 0)}
        </p>
      ),
    },

    {
      header: 'Match Type',
      accessorKey: 'win_type',
      cell: ({ getValue }) => (
        <p className="whitespace-nowrap">{convertKebabAndSnakeToTitleCase(getValue<string>())}</p>
      ),
    },
  ];
  const transactionHistoryData = data?.games;

  const isTransactionHistoryEmpty = !false && !transactionHistoryData?.length;

  const topWinningTickets = data?.top_winning_ticket?.[0]?.ticket || [];
  const dateWon = data?.top_winning_ticket?.[0]?.date_won;

  return (
    <>
      <Table
        isLoading={false}
        data={transactionHistoryData}
        isTableEmpty={isTransactionHistoryEmpty}
        columns={columns}
        emptyNotice={emptyNotice}
        emptyNoticeSubheading={emptyNoticeSubheading}
        showFilters={showFilters}
        allButtonFilters={true}
        ResultPicksComponent={
          gameType !== 'jackpotWinners' &&
          hasResultPicksComponent && (
            <ResultNumberPicks
              playGameRoute={playGameRoute}
              tickets={topWinningTickets}
              dateWon={dateWon}
              gameType={gameType}
            />
          )
        }
        title={title}
        placeholder="Email / Phone number"
        pagination={true}
      />
    </>
  );
};
