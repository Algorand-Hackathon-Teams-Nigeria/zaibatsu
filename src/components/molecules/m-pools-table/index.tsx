"use client";
import PoolTableActions from "@/components/atoms/a-pool-table-actions";
import SearchInput from "@/components/atoms/a-search-input";
import PoolsTableMobile from "@/components/molecules/m-pools-table-mobile";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  CustomTableHeader,
} from "@/components/ui/table";
import { usePoolsQuery } from "@/services/graphql/generated";
import listOptionsAtoms from "@state/atoms/listOptions";
import { Grid2, Task } from "iconsax-react";
import { useAtomValue } from "jotai";
import Link from "next/link";
import React from "react";
import PoolsTableCard from "./m-pools-table-card";
import { cn } from "@/lib/utils/ui";

const PoolsTable = () => {
  const listOpts = useAtomValue(listOptionsAtoms.pools);
  const [{ fetching, data }] = usePoolsQuery({
    variables: { opts: listOpts, assetOpts: { limit: 4 } },
  });

  const pools = data?.pools ?? [];
  const [tableType, setTableType] = React.useState("grid");
  const tableColumns = [
    "Name",
    "Assets",
    "Net Value",
    "Total Contributors",
    "Loan Offerings",
    "Actions",
  ];
  return (
    <div className="flex flex-col w-full gap-6">
      <ActionHeader tableType={tableType} setTableType={setTableType} />
      {tableType == "table" ? (
        <>
          <div className="xp-2 py-4 hidden lg:block">
            <Table borderless>
              <CustomTableHeader columns={tableColumns} />
              <TableBody>
                {pools.length > 0 &&
                  !fetching &&
                  pools.map((pool) => (
                    <TableRow
                      key={pool.id}
                      className="!border-b  border-border"
                    >
                      <TableCell>
                        <Link
                          href={`/pools/${pool.id}`}
                          className="hover:underline hover:text-primary transition-all "
                        >
                          {pool.name}
                        </Link>
                      </TableCell>
                      <TableCell className="flex flex-col items-center  ">
                        <AvatarGroup>
                          {pool.assets.map((asset) => (
                            <Avatar
                              className="w-6 h-6 aspect-square"
                              key={asset.id}
                            >
                              <AvatarImage src={asset.imageUrl} />
                              <AvatarFallback>
                                {asset.unitName.slice(0, 3).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                        </AvatarGroup>
                      </TableCell>
                      <TableCell className="text-center">
                        ${pool.netValue.toPrecision(2)}
                      </TableCell>
                      <TableCell className="text-center">
                        {pool.totalContributors}
                      </TableCell>
                      <TableCell className="text-center">
                        {pool.totalLoanTemplates}
                      </TableCell>
                      <TableCell className="table-cell w-fit ">
                        <PoolTableActions pool={pool} />
                      </TableCell>
                    </TableRow>
                  ))}
                {fetching &&
                  Array.from({ length: 10 }).map((_, id) => (
                    <PoolRowSkeleton key={id} />
                  ))}
              </TableBody>
            </Table>
            <div className="flex flex-row justify-between w-full mt-4 text-sm">
              <div>Page 1 of 1</div> <div>&lt; Prev Next &gt;</div>{" "}
            </div>
            {pools.length === 0 && !fetching && (
              <div className="flex items-center justify-center text-muted-foreground p-10 py-16">
                <p className="border p-2 rounded-md px-4 opacity-60 text-center">
                  There are currently no pools offerings available
                </p>
              </div>
            )}
          </div>
          <PoolsTableMobile fetching={fetching} pools={pools} />
        </>
      ) : (
        <PoolsTableCard fetching={fetching} pools={pools} />
      )}
    </div>
  );
};

export default PoolsTable;

const PoolRowSkeleton = () => {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="h-6 w-screen max-w-[200px]" />
      </TableCell>
      <TableCell className="flex flex-col items-center">
        <AvatarGroup>
          {Array.from({ length: 3 }).map((_, id) => (
            <Skeleton key={id} className="w-6 h-6 rounded-full" />
          ))}
        </AvatarGroup>
      </TableCell>
      <TableCell className="text-center">
        <Skeleton className="h-6 max-w-14 w-screen mx-auto" />
      </TableCell>
      <TableCell className="text-center">
        <Skeleton className="h-6 max-w-14 w-screen mx-auto" />
      </TableCell>
      <TableCell className="text-center">
        <Skeleton className="h-6 max-w-14 w-screen mx-auto" />
      </TableCell>
      <TableCell className="hidden xl:table-cell">
        <div className="w-screen grid gap-x-2 max-w-[150px] mx-auto grid-cols-2">
          <Skeleton className="h-7" />
          <Skeleton className="h-7" />
        </div>
      </TableCell>
    </TableRow>
  );
};

const ActionHeader = ({
  tableType,
  setTableType,
}: {
  tableType: string;
  setTableType: (value: string) => void;
}) => {
  return (
    <div className=" gap-y-6 flex w-full items-center justify-between  flex-col md:flex-row">
      <div className="w-full md:w-fit">
        <SearchInput placeholder="Search by token name, symbol" />
      </div>

      <div className="flex flex-row gap-2 items-center justify-between w-full md:w-fit">
        <div className="flex w-[133px] p-2">All pools</div>
        <div className="flex flex-row gap-2 items-center ">
          Switch view:
          <button onClick={() => setTableType("grid")}>
            <Grid2
              className={`p-2 ${tableType == "grid" && " text-primary bg-card rounded-lg "}`}
              size="48"
            />
          </button>
          <button onClick={() => setTableType("table")}>
            <Task
              size="48"
              className={`p-2 ${tableType == "table" && " text-primary bg-card rounded-lg "}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
