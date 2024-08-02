"use client";

import PoolTableActions from "@/components/atoms/a-pool-table-actions";
import UserPoolAssetHolding from "@/components/atoms/a-user-pool-asset-holding";
import {
  usePoolQuery,
  useUserPoolAssetHoldingsQuery,
} from "@/services/graphql/generated";
import React from "react";

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
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-2xl">Pool Asset Holdings</h3>
          {poolData?.pool && (
            <div className="flex-[0.3]">
              <PoolTableActions pool={poolData?.pool} />
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
