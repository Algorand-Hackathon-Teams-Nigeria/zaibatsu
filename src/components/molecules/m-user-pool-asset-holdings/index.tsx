"use client";

import UserPoolAssetHolding from "@/components/atoms/a-user-pool-asset-holding";
import { useUserPoolAssetHoldingsQuery } from "@/services/graphql/generated";
import React from "react";

interface Props {
  poolId: string;
  address: string;
}

const UserPoolAssetHoldings: React.FC<Props> = ({ poolId, address }) => {
  const [{ data }] = useUserPoolAssetHoldingsQuery({
    variables: { poolId, address },
  });
  return (
    <div>
      <div className="flex flex-col gap-8">
        <h3 className="font-bold text-2xl">Pool Asset Holdings</h3>
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
