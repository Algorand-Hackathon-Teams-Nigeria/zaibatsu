import { PoolsQuery } from "@/services/graphql/generated";
import PoolContributeModal from "@atoms/a-pool-contribute-modal";
import Link from "next/link";
import React from "react";
import { Eye, Add } from "iconsax-react";
interface Props {
  pool: PoolsQuery["pools"][number];
}

const PoolTableActions: React.FC<Props> = ({ pool }) => {
  return (
    <div className="flex justify-center items-center gap-4">
      <Link
        className="rounded-full bg-card flex items-center justify-center p-2"
        href={`/pools/${pool.id}/borrow`}
      >
        <Add size="24" />
      </Link>

      <PoolContributeModal pool={pool} />

      <Link
        className="rounded-full bg-card flex items-center justify-center p-2"
        href={`/pools/${pool.id}`}
      >
        <Eye size="24" />
      </Link>
    </div>
  );
};

export default PoolTableActions;
