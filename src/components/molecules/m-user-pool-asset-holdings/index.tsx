"use client";

import UserPoolAssetHolding from "@/components/atoms/a-user-pool-asset-holding";
import {
  usePoolQuery,
  useUserPoolAssetHoldingsQuery,
} from "@/services/graphql/generated";
import React from "react";
import PoolDetailsActions from "@/components/atoms/a-pool-details-actions";
import { ArrowLeft2 } from "iconsax-react";
import Link from "next/link";
import SIDEBAR_NAVS from "@/constants/navigations/sidebar";
interface Props {
  poolId: string;
  address: string;
}

const UserPoolAssetHoldings: React.FC<Props> = ({ poolId, address }) => {
  const [{ data: poolData }] = usePoolQuery({
    variables: { poolId },
  });
  const [{ data }] = useUserPoolAssetHoldingsQuery({
    variables: { poolId, address },
  });

  return (
    <div>
      <Link
        href={
          SIDEBAR_NAVS.find((_) => {
            return _.title.includes("pool") || _.title.includes("pools");
          })?.href ?? "/"
        }
        className="inline-flex items-center gap-x-2 text-[0.875rem] h-fit"
      >
        <ArrowLeft2 size={26} />
        Back
      </Link>
      <div className="flex flex-col gap-8">
        <div className="flex gap-y-4 md:items-center flex-col md:flex-row justify-between">
          <h3 className="font-bold text-2xl">
            {poolData?.pool?.name ?? "Pool Asset Holdings"}
          </h3>
          {poolData?.pool && (
            <div className="flex-[0.3]">
              <PoolDetailsActions pool={poolData?.pool} />
            </div>
          )}
        </div>
        <ul className="flex flex-wrap gap-2">
          {data?.userPoolAssetHoldings.map((holding) => (
            <UserPoolAssetHolding
              address={address}
              key={holding.id}
              holding={holding}
              poolId={poolId}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserPoolAssetHoldings;
