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
import PoolsCard from "@/components/molecules/m-pools-table-mobile/index";
import PoolTableActions from "@/components/atoms/a-pool-table-actions";

const PoolsTable = () => {
  const listOpts = useAtomValue(listOptionsAtoms.pools);
  const [{ fetching, data }] = usePoolsQuery({
    variables: { opts: listOpts, assetOpts: { limit: 4 } },
  });

  const pools = data?.pools ?? [];
  return (
    <>
      <Card className="p-2 py-4 hidden lg:block">
        <Table borderless>
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
                    ${pool.netValue.toPrecision(2)}
                  </TableCell>
                  <TableCell className="text-center">
                    {pool.totalContributors}
                  </TableCell>
                  <TableCell className="text-center">
                    {pool.totalLoanTemplates}
                  </TableCell>
                  <TableCell className="hidden md:table-cell ">
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
        {pools.length === 0 && !fetching && (
          <div className="flex items-center justify-center text-muted-foreground p-10 py-16">
            <p className="border p-2 rounded-md px-4 opacity-60 text-center">
              There are currently no pools offerings available
            </p>
          </div>
        )}
      </Card>
      <PoolsCard fetching={fetching} pools={pools} />
    </>
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
