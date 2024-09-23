import * as React from 'react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  FilterFn,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
} from '@tanstack/react-table';
import { rankItem } from '@tanstack/match-sorter-utils';
import { Listbox } from '@headlessui/react';
import { FullPageLoader } from '@/components/elements';
import { EmptyTableNotice } from '@/components/table';

// Guide for generics used: https://stackoverflow.com/a/62705164/15063835

interface TableProps<DataType extends { id: number }> {
  isLoading: boolean;
  data: DataType[] | undefined;
  columns: ColumnDef<DataType>[];
  isTableEmpty: boolean;
  hasTableHead?: boolean;
  emptyNotice?: string;
  emptyNoticeSubheading?: string;
  allButtonFilters?: boolean;
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

const mock_data = [
  {
    date_won: '2024-02-15',
    pick: [10, 17, 37, 47, 48],
  },
  {
    date_won: '2024-02-14',
    pick: [3, 32, 39, 41, 49],
  },
  {
    date_won: '2024-02-14',
    pick: [3, 32, 39, 41, 49],
  },
  {
    date_won: '2024-02-14',
    pick: [3, 32, 39, 41, 49],
  },
  {
    date_won: '2024-02-14',
    pick: [3, 32, 39, 41, 49],
  },
  {
    date_won: '2024-02-14',
    pick: [3, 32, 39, 41, 49],
  },
  {
    date_won: '2024-02-14',
    pick: [3, 32, 39, 41, 49],
  },
  {
    date_won: '2024-02-14',
    pick: [3, 32, 39, 41, 49],
  },
];

export const ResultsTable = <DataType extends { id: number }>({
  isLoading,
  data,
  columns,
  isTableEmpty,
  emptyNotice,
  hasTableHead = true,
  emptyNoticeSubheading,
  pagination = false,
}: React.PropsWithChildren<TableProps<DataType>>) => {
  console.log(data, 'data');
  const defaultData = React.useMemo(() => [], []);

  const [globalFilter, setGlobalFilter] = React.useState('');
  const table = useReactTable({
    data: mock_data ?? defaultData,
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
          <FullPageLoader />
        </div>
      ) : (
        <div className="shadow-[0px 8px 24px] shadow-[rgba(149, 157, 165, 0.2)] rounded-[10px]">
          {isTableEmpty ? (
            <EmptyTableNotice
              notice={emptyNotice || 'No data available'}
              noticeSubheading={emptyNoticeSubheading || ''}
            />
          ) : (
            <div className="space-y-6 rounded-[10px] pb-[50px]">
              <div className="overflow-x-auto">
                <table className="mt-4 w-full border-separate border-spacing-y-4">
                  {hasTableHead && (
                    <thead>
                      {table.getHeaderGroups().map(headerGroup => (
                        <tr className="bg-[#062b1c]" key={headerGroup.id}>
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
                  )}

                  <tbody className="-z-10 mt-14 translate-y-1.5 space-y-3 text-center ">
                    {table.getRowModel().rows.map(row => {
                      return (
                        <tr
                          className="align-bottom font-normal transition duration-300 ease-in-out"
                          key={row.id}
                        >
                          {row.getVisibleCells().map(cell => (
                            <td className="bg-[#062b1c] p-4 text-[13px] opacity-90" key={cell.id}>
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
                          <Listbox.Button className="flex items-center gap-5 rounded bg-wise-green-bg bg-opacity-20 p-2 text-xs text-white md:px-4 md:text-sm">
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
                          <span className="ml-4 text-[10px] text-[#848484] lg:text-sm">
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

        td {
          border: solid 1px transparent;
          border-style: none solid solid none;
        }

        tr th {
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
        }

        tr td:first-child {
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
        }

        tr td:last-child {
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
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
