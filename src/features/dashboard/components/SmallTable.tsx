import * as React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { SingleGetPlay } from '@/types';
import { addCommasToNumber } from '@/utils';
import { Table } from '@/components/table';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface GamePlayProps {
  isLoading: boolean;
  data: SingleGetPlay[];
  isEmpty: boolean;
}

export const PeoplePlayTable: React.FunctionComponent<GamePlayProps> = ({
  isLoading,
  data,
  isEmpty,
}) => {
  const router = useRouter();

  const columns: ColumnDef<SingleGetPlay>[] = [
    // {
    //   header: '',
    //   accessorKey: 'band',
    //   cell: ({ getValue }) => (
    //     <p className="font-semibold text-white">
    //       <span
    //         className={`inline-block h-[15px] w-[15px] ${getValue() === 10000} bg-red-50`}
    //       ></span>
    //     </p>
    //   ),
    // },
    {
      header: 'Game types',
      accessorKey: 'game_type',
      cell: ({ getValue }) => (
        <div className={`flex items-center justify-start gap-2 overflow-hidden`}>
          <div className="h-8 w-8 flex-shrink-0 md:block">
            {getValue() === 'Salary For Life' && (
              <Image
                src={'/images/top-winners/salary-4-life.jpg'}
                alt=""
                width="32"
                height="32"
                className="h-full rounded-full"
              />
            )}

            {getValue() === 'Wyse Cash' && (
              <Image
                src={'/images/top-winners/wyse-cash.jpg'}
                alt=""
                width="32"
                height="32"
                className="h-full rounded-full"
              />
            )}

            {getValue() === 'Instant Cashout' && (
              <Image
                src={'/images/top-winners/instant-cash.jpg'}
                alt=""
                width="32"
                height="32"
                className="h-full rounded-full"
              />
            )}
          </div>

          <p className="ml-2 whitespace-nowrap text-left ">
            {getValue() == 'cashout' ? 'Instant cashout' : (getValue() as string)}
          </p>
        </div>
      ),
    },
    {
      header: 'Percentage of players',
      accessorKey: 'percentage',
      cell: ({ getValue }) => (
        <div className={`flex flex-row items-center justify-center gap-2`}>
          <div className="relative mx-auto hidden h-1 w-4/5 overflow-hidden rounded bg-white bg-opacity-20 md:block md:h-[6px] xl:w-full">
            <div
              className="h-1 rounded bg-white md:h-[6px]"
              style={{
                width: `${(getValue() as string) || 0}%`,
              }}
            />
          </div>
          <div>
            <p className=" inline-flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white text-center text-[11px] font-semibold text-[#4C1961]">
              {(getValue() as string) || 0}%
            </p>
          </div>
        </div>
      ),
    },
    {
      header: 'Average stake amount',
      accessorKey: 'average_stake',
      cell: ({ getValue }) => (
        <p className={`font-semibold text-white`}>
          ₦{addCommasToNumber((getValue() as number) || 0)}
        </p>
      ),
    },
    {
      header: 'Average potential winning amount',
      accessorKey: 'average_potential_winning',
      cell: ({ getValue }) => (
        <p className={`font-semibold text-white`}>
          ₦{addCommasToNumber((getValue() as number) || 0)}
        </p>
      ),
    },

    {
      header: 'Action',
      cell: ({ row }) => (
        <div className={`px-1`}>
          <button
            onClick={() => {
              if (row.getValue('game_type') === 'Salary For Life') {
                router.push('salary-for-life');
              } else if (row.getValue('game_type') === 'Instant Cashout') {
                router.push('/instant-cashout');
              } else if (row.getValue('game_type') === 'Wyse Cash') {
                router.push('/wyse-cash');
              }
            }}
            className="bg_red_gradient whitespace-nowrap rounded-md px-6 py-2 text-xs text-[#fff]"
          >
            Play game
          </button>
        </div>
      ),
    },
  ];

  return (

    <>
      <div className=" mt-[50px] mb-[24px] flex w-full items-center justify-between gap-2 overflow-auto rounded-[10px]  md:gap-10">
        <h2 className="whitespace-nowrap text-white">Game Plays</h2>
        <div className="flex items-center justify-between gap-x-4 text-sm">
          <button className="block rounded-md border border-[#404040] bg-[#15171D] px-4 py-2">
            Today
          </button>

          <button className="hidden rounded-md border border-[#404040] bg-[#000] px-4 py-2 md:block">
            Yesterday
          </button>

          <button className="item-center flex flex-nowrap whitespace-nowrap rounded-md border border-[#404040] bg-[#000] px-6 py-2">
            <span className="inline-block  align-middle">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.23323 1.33325H8.16658C8.65992 1.33325 9.06657 1.73992 9.06657 2.23326V3.21991C9.06657 3.57991 8.83991 4.02659 8.61991 4.25326L6.6866 5.95992C6.41994 6.18659 6.23991 6.63325 6.23991 6.99325V8.9266C6.23991 9.19326 6.05992 9.55326 5.83325 9.69326L5.20658 10.0999C4.61992 10.4599 3.81323 10.0533 3.81323 9.33325V6.95325C3.81323 6.63991 3.63325 6.23326 3.45325 6.00659L1.74658 4.20658C1.51991 3.97992 1.33992 3.57991 1.33992 3.30658V2.27325C1.33326 1.73992 1.7399 1.33325 2.23323 1.33325Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1.3335 8.00008V10.0001C1.3335 13.3334 2.66683 14.6667 6.00016 14.6667H10.0002C13.3335 14.6667 14.6668 13.3334 14.6668 10.0001V6.00008C14.6668 3.92008 14.1468 2.61341 12.9401 1.93341C12.6001 1.74008 11.9202 1.59341 11.3002 1.49341"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.6665 8.66675H11.9998"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.3335 11.3333H12.0002"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="ml-2 hidden align-middle md:block">Custom Filter</span>
          </button>
        </div>
      </div>
      <div className="game_play_view">
        <Table
          isLoading={isLoading}
          data={data}
          isTableEmpty={isEmpty}
          columns={columns}
          emptyNotice="No referred user"
          emptyNoticeSubheading="You are yet to refer any user. Details of your referred users would be displayed here."
          showFilters={false}
        />
      </div>
    </>
  );
};
