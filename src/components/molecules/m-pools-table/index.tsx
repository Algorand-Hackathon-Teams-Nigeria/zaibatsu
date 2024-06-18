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

const PoolsTable = () => {
  const listOpts = useAtomValue(listOptionsAtoms.pools);
  const [{ fetching, data }] = usePoolsQuery({
    variables: { opts: listOpts, assetOpts: { limit: 4 } },
  });

  const pools = data?.pools ?? [];
  return (
    <Card className="p-2 py-4">
      <Table borderless>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Assets</TableHead>
            <TableHead className="hidden lg:table-cell">Net Value</TableHead>
            <TableHead className="hidden lg:table-cell">
              Loan Offerings
            </TableHead>
            <TableHead>Actions</TableHead>
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
                <TableCell>
                  <AvatarGroup>
                    {pool.assets.map((asset) => (
                      <Avatar className="w-6 h-6 aspect-square" key={asset.id}>
                        <AvatarImage src={asset.imageUrl} />
                        <AvatarFallback>
                          {asset.unitName.slice(0, 3).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </AvatarGroup>
                </TableCell>
                <TableCell>${pool.netValue.toFixed(2)}</TableCell>
                <TableCell>{pool.totalLoanTemplates}</TableCell>
                <TableCell className="hidden xl:table-cell">
                  <div className="flex items-center gap-2">
                    <Link
                      className="p-2 rounded-md bg-primary/60 hover:bg-primary/80 transition-all text-primary-foreground"
                      href={`/pools/${pool.id}/contribute`}
                    >
                      Contribute
                    </Link>
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
        </TableBody>
      </Table>
      {pools.length === 0 && !fetching && (
        <div className="flex items-center justify-center text-muted-foreground p-10 py-16">
          <p className="border p-2 rounded-md px-4 opacity-60">
            There are currently no pools offerings available
          </p>
        </div>
      )}
    </Card>
  );
};

export default PoolsTable;
