import { Listbox } from '@headlessui/react';
import { rankItem } from '@tanstack/match-sorter-utils';
import {
  ColumnDef,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';
import * as React from 'react';

import { DebouncedInput, EmptyTableNotice } from '@/components/table';

// Guide for generics used: https://stackoverflow.com/a/62705164/15063835

interface TableProps<DataType extends { id: number }> {
  isLoading: boolean;
  data: DataType[] | undefined;
  columns: ColumnDef<DataType>[];
  isTableEmpty: boolean;
  emptyNotice?: string;
  emptyNoticeSubheading?: string;
  showFilters?: boolean;
  allButtonFilters?: boolean;
  ResultPicksComponent?: React.ReactNode;
  title?: string;
  placeholder?: string;
  pagination?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the ranking info
  addMeta(itemRank);

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

export const Table = <DataType extends { id: number }>({
  isLoading,
  data,
  columns,
  isTableEmpty,
  emptyNotice,
  emptyNoticeSubheading,
  showFilters = true,
  allButtonFilters = false,
  ResultPicksComponent,
  title = '',
  placeholder = 'Search',
  pagination = false,
}: React.PropsWithChildren<TableProps<DataType>>) => {
  const defaultData = React.useMemo(() => [], []);

  const [globalFilter, setGlobalFilter] = React.useState('');
  const table = useReactTable({
    data: data ?? defaultData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      globalFilter,
    },
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getFilteredRowModel: getFilteredRowModel(),
  });

  const pageSizeArray = [10, 20, 30, 40, 50];

  const [selectedPageSize, setSelectedPageSize] = React.useState(pageSizeArray[0]);

  const pageIndex = Number(table.getState().pagination.pageIndex);
  const pageSize = Number(table.getState().pagination.pageSize);
  return (
    <>
      {isLoading ? (
        <div className="mt-[74px]">
          <p className="sr-only">Loading</p>
        </div>
      ) : (
        <div className="shadow-[0px 8px 24px] shadow-[rgba(149, 157, 165, 0.2)] rounded-[10px]">
          {showFilters && (
            <div className="mt-8 mb-2 flex w-full flex-row items-center justify-between gap-10 overflow-auto">
              <DebouncedInput
                value={globalFilter ?? ''}
                onChange={value => setGlobalFilter(String(value))}
                placeholder={placeholder}
              />

              {allButtonFilters ? (
                <div className="flex flex-row items-center justify-between gap-4 gap-x-4  text-sm">
                  <button className="block rounded-md border border-[#404040] bg-[#15171D] px-6 py-2">
                    Today
                  </button>

                  <button className="hidden rounded-md border border-[#404040] bg-[#000] px-6 py-2 lg:block">
                    Yesterday
                  </button>

                  <button className=" block whitespace-nowrap rounded-md border border-[#404040] bg-[#000] px-6 py-2">
                    <span className="inline-block align-middle">
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
                    <span className="ml-2 hidden align-middle lg:inline-block">Custom Filter</span>
                  </button>
                </div>
              ) : (
                <button className="flex items-center space-x-2 rounded bg-main-gray-bg-dark p-3">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.51239 1.5H9.18741C9.74241 1.5 10.1999 1.9575 10.1999 2.5125V3.62249C10.1999 4.02749 9.9449 4.53 9.6974 4.785L7.52243 6.705C7.22243 6.96 7.01989 7.46249 7.01989 7.86749V10.0425C7.01989 10.3425 6.81741 10.7475 6.56241 10.905L5.8574 11.3625C5.1974 11.7675 4.28988 11.31 4.28988 10.5V7.82249C4.28988 7.46999 4.0874 7.01251 3.8849 6.75751L1.9649 4.7325C1.7099 4.4775 1.50742 4.02749 1.50742 3.71999V2.5575C1.49992 1.9575 1.95739 1.5 2.51239 1.5Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M1.5 8.99969V11.2497C1.5 14.9997 3 16.4997 6.75 16.4997H11.25C15 16.4997 16.5 14.9997 16.5 11.2497V6.74969C16.5 4.40969 15.915 2.93969 14.5575 2.17469C14.175 1.95719 13.41 1.79219 12.7125 1.67969"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.75 9.75H13.5"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.25 12.75H13.5"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <span className="text-xs">Filter</span>
                </button>
              )}
            </div>
          )}

          {isTableEmpty ? (
            <EmptyTableNotice
              notice={emptyNotice || 'No data available'}
              noticeSubheading={emptyNoticeSubheading || ''}
            />
          ) : (
            <div className="space-y-6 rounded-[10px] pb-[50px]">
              {ResultPicksComponent}

              {title && <h2 className="mt-8 text-white">{title}</h2>}

              <div className="overflow-x-auto">
                <table className="mt-2 w-full border-separate border-spacing-y-3">
                  <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                      <tr className="bg-[#0b261c]" key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                          <th
                            className="p-4 py-8 text-center text-xs font-normal transition duration-500 ease-in-out md:text-base"
                            key={header.id}
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(header.column.columnDef.header, header.getContext())}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>

                  <tbody className="-z-10 mt-14 translate-y-1.5 space-y-3 text-center">
                    {table.getRowModel().rows.map((row, index) => {
                      const isEven = index % 2 == 0;

                      return (
                        <tr
                          className="font-normal transition duration-300 ease-in-out"
                          key={row.id}
                        >
                          {row.getVisibleCells().map(cell => (
                            <td
                              className={clsx(
                                'p-4 text-[13px]',
                                isEven && 'bg-[#062b1c]',
                                !isEven && 'bg-[#041f18]',
                              )}
                              key={cell.id}
                            >
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {pagination && (data?.length || 0) > 0 && (
                  <div className="pagination-box my-4 w-full">
                    <div className="no-wrap flex w-full flex-row items-center justify-between gap-2 overflow-x-auto">
                      <div className="go-to-page flex flex-row">
                        <Listbox
                          as="div"
                          className="relative"
                          value={table.getState().pagination.pageSize}
                          onChange={(value: number) => {
                            setSelectedPageSize(value);
                            table.setPageSize(Number(value));
                          }}
                        >
                          <Listbox.Button className="flex items-center gap-5 rounded bg-[#15171D] p-2 text-xs text-white md:px-4 md:text-sm">
                            <span className="font-semibold">{selectedPageSize}</span>{' '}
                            <span>
                              <svg
                                width="12"
                                height="7"
                                viewBox="0 0 12 7"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M8.35694 5.48777C7.09859 6.85158 5.08445 6.89704 3.77571 5.62415L3.6429 5.48777L0.410664 1.7672C0.0852261 1.41449 0.0852261 0.842628 0.410664 0.489918C0.711066 0.164338 1.18376 0.139294 1.51067 0.414784L1.58917 0.489918L4.82141 4.21049C5.43802 4.87878 6.41759 4.91395 7.07242 4.31601L7.17843 4.21049L10.4107 0.489918C10.7361 0.137207 11.2637 0.137207 11.5892 0.489918C11.8896 0.815497 11.9127 1.32781 11.6585 1.68211L11.5892 1.7672L8.35694 5.48777Z"
                                  fill="#00EB6F"
                                />
                              </svg>
                            </span>
                          </Listbox.Button>

                          <Listbox.Options className="text-liberty-teal absolute z-10 mt-1 w-full rounded bg-[#025A34] text-xs text-opacity-90 md:text-sm">
                            {pageSizeArray.map(pageSize => (
                              <Listbox.Option
                                key={pageSize}
                                value={pageSize}
                                // disabled={day.unavailable}
                                className="cursor-pointer rounded py-2 px-4 hover:bg-wise-green-bg hover:bg-opacity-40"
                              >
                                {pageSize}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Listbox>

                        <span className="flex items-center gap-1">
                          <span className="ml-4 text-[10px] text-[#ffffff] lg:text-sm">
                            Showing {pageIndex == 0 ? pageIndex + 1 : pageIndex * pageSize + 1}
                            &nbsp;to&nbsp;
                            {(pageIndex + 1) * pageSize}
                            &nbsp;out of&nbsp;
                            {data?.length} entries
                          </span>
                        </span>
                      </div>

                      <div className="flex">
                        <button
                          className="mx-1 inline-block h-10 w-10 rounded border transition duration-500 ease-in-out hover:border-none hover:bg-hoverPurple"
                          onClick={() => table.setPageIndex(0)}
                          disabled={!table.getCanPreviousPage()}
                        >
                          {'<<'}
                        </button>
                        <button
                          className="mx-1 h-10 w-10 rounded border transition duration-500 ease-in-out hover:border-none hover:bg-hoverPurple"
                          onClick={() => table.previousPage()}
                          disabled={!table.getCanPreviousPage()}
                        >
                          {'<'}
                        </button>
                        <button
                          className="mx-1 h-10 w-10 rounded border transition duration-500 ease-in-out hover:border-none hover:bg-hoverPurple"
                          onClick={() => table.nextPage()}
                          disabled={!table.getCanNextPage()}
                        >
                          {'>'}
                        </button>
                        <button
                          className="mx-1 h-10 w-10 rounded border transition duration-500 ease-in-out hover:border-none hover:bg-hoverPurple"
                          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                          disabled={!table.getCanNextPage()}
                        >
                          {'>>'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
         {
          /* Border radiuses: 
           * https://stackoverflow.com/a/4094151/15063835
           * https://stackoverflow.com/a/9874292/15063835
         */
        }

        table {
          border-collapse: separate;
          border-spacing: 0;
        }

        td {
          border: solid 1px transparent;
          border-style: none solid solid none;
        }

        tr th:first-child {
          border-top-left-radius: 10px;
        }

        tr th:last-child {
          border-top-right-radius: 10px;
        }

        tr:first-child td:first-child {
          border-top-left-radius: 11px;
        }
        tr:first-child td:last-child {
          border-top-right-radius: 11px;
        }

        tr:last-child td:first-child {
          border-bottom-left-radius: 11px;
        }
        tr:last-child td:last-child {
          border-bottom-right-radius: 11px;
        }
        // tr:last-child td {
        //   background: #15171d;
        // }

        tr:first-child td {
          border-top-style: solid;
        }
        tr td:first-child {
          border-left-style: solid;
        }
      `}</style>
    </>
  );
};
