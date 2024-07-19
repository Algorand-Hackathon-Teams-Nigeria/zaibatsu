"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePoolsQuery } from "@/services/graphql/generated";
import Link from "next/link";
import { useAtomValue } from "jotai";
import listOptionsAtoms from "@state/atoms/listOptions";
import { Card } from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import PoolContributeModal from "@/components/atoms/a-pool-contribute-modal";
import { PoolAssetHoldingFilter } from "../../../services/graphql/generated";

const PoolsTable = () => {
  const listOpts = useAtomValue(listOptionsAtoms.pools);
  const [{ fetching, data }] = usePoolsQuery({
    variables: { opts: listOpts, assetOpts: { limit: 4 } },
  });

  const pools = data?.pools ?? [];
  return (
    <>
      <Card className="p-2 py-4">
        <Table className="hidden lg:table" borderless>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="text-center">Assets</TableHead>
              <TableHead className="table-cell text-center">
                Net Value
              </TableHead>
              <TableHead className="table-cell text-center">
                Total Contributors
              </TableHead>
              <TableHead className="table-cell text-center">
                Loan Offerings
              </TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pools.length > 0 &&
              !fetching &&
              pools.map((pool) => (
                <TableRow key={pool.id}>
                  <TableCell>
                    <Link
                      href={`/pools/${pool.id}`}
                      className="hover:underline hover:text-primary transition-all"
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
                    ${pool.netValue.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-center">
                    {pool.totalContributors}
                  </TableCell>
                  <TableCell className="text-center">
                    {pool.totalLoanTemplates}
                  </TableCell>
                  <TableCell className="hidden md:table-cell ">
                    <div className="flex justify-center items-center gap-2">
                      <PoolContributeModal pool={pool} />
                      <Link
                        className="border border-primary/60 p-2 rounded-md hover:text-primary-foreground hover:bg-primary/60 transition-all"
                        href={`/pools/${pool.id}/borrow`}
                      >
                        Borrow
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            {fetching &&
              Array.from({ length: 10 }).map((_, id) => (
                <PoolRowSkeleton key={id} />
              ))}
          </TableBody>
        </Table>
        {pools.length === 0 && !fetching && (
          <div className="flex items-center justify-center text-muted-foreground p-10 py-16">
            <p className="border p-2 rounded-md px-4 opacity-60 text-center">
              There are currently no pools offerings available
            </p>
          </div>
        )}
      </Card>
      <div className="w-full lg:hidden gap-5 flex flex-col">
        {pools.length > 0 &&
          !fetching &&
          pools.map((pool) => (
            <Card
              key={pool.id}
              className=" gap-3 text-white text-base  leading-[18px] rounded-lg p-3 flex flex-col"
            >
              <div className=" border-b-[1px] border-[#F7F7F7] flex flex-col gap-1">
                <div className="py-2  leading-4 font-bold text-left ">
                  {pool.name}
                </div>
                <div className="py-1  font-normal flex flex-row justify-between ">
                  <div className="py-2">Assets</div>
                  <div className="py-2">
                    {" "}
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
                  </div>
                </div>
                <div className="py-1  font-normal flex flex-row justify-between ">
                  <div className="py-2">Net Value</div>
                  <div className="py-2"> ${pool.netValue.toFixed(2)}</div>
                </div>
              </div>

              <div className=" border-b-[1px] border-[#F7F7F7] flex flex-col gap-1">
                <div className="py-1  font-normal flex flex-row justify-between ">
                  <div className="py-2">Total Contributors</div>
                  <div className="py-2"> {pool.totalContributors}</div>
                </div>
                <div className="py-1   font-normal flex flex-row justify-between ">
                  <div className="py-2">Loan Offerings</div>
                  <div className="py-2">{pool.totalLoanTemplates}</div>
                </div>
              </div>

              <div className="pt-1 gap-4 flex flex-row h-10 ">
                <PoolContributeModal pool={pool} />
                <Link
                  className="border border-primary/60 w-full  text-center p-2 rounded-md hover:text-primary-foreground hover:bg-primary/60 transition-all"
                  href={`/pools/${pool.id}/borrow`}
                >
                  Borrow
                </Link>
              </div>
            </Card>
          ))}
        {fetching &&
          Array.from({ length: 10 }).map((_, id) => (
            <PoolCardSkelton key={id} />
          ))}
      </div>
    </>
  );
};

export default PoolsTable;

const PoolCardSkelton = () => {
  return (
    <Card className=" gap-3 text-white text-base  leading-[18px] rounded-lg p-3 flex flex-col">
      <div className=" border-b-[1px] border-[#F7F7F7] flex flex-col gap-1">
        <div className="py-2  leading-4 font-bold text-left ">
          <Skeleton className="h-8 w-screen max-w-[300px]" />
        </div>
        <div className="py-1  font-normal flex flex-row justify-between ">
          <div className="py-2 mt-2">Assets</div>
          <div className="py-2">
            {" "}
            <AvatarGroup>
              {Array.from({ length: 3 }).map((_, id) => (
                <Skeleton key={id} className="w-7 h-7 rounded-full" />
              ))}
            </AvatarGroup>
          </div>
        </div>
        <div className="py-1  font-normal flex flex-row justify-between ">
          <div className="py-2">Net Value</div>
          <Skeleton className="h-7 max-w-14 w-screen " />
        </div>
      </div>

      <div className=" border-b-[1px] border-[#F7F7F7] flex flex-col gap-1">
        <div className="py-1  font-normal flex flex-row justify-between ">
          <div className="py-2">Total Contributors</div>
          <Skeleton className="h-7 max-w-14 w-screen " />
        </div>
        <div className="py-1   font-normal flex flex-row justify-between ">
          <div className="py-2">Loan Offerings</div>
          <Skeleton className="h-7 max-w-14 w-screen " />
        </div>
      </div>

      <div className="pt-1 gap-4 flex flex-row h-10 ">
        <Skeleton className="w-full h-full text-center  rounded " />
        <Skeleton className="w-full h-full text-center  rounded " />
      </div>
    </Card>
  );
};

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
