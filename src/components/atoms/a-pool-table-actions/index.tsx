import { PoolsQuery } from "@/services/graphql/generated";
import PoolContributeModal from "@atoms/a-pool-contribute-modal";
import Link from "next/link";
import React from "react";

interface Props {
  pool: PoolsQuery["pools"][number];
}

const PoolTableActions: React.FC<Props> = ({ pool }) => {
  return (
    <div className="flex justify-center items-center gap-2">
      <PoolContributeModal pool={pool} />
      <Link
        className="border w-full text-center border-primary/60 p-2 py-1.5 rounded-md hover:text-primary-foreground hover:bg-primary/60 transition-all"
        href={`/pools/${pool.id}/borrow`}
      >
        Borrow
      </Link>
    </div>
  );
};

export default PoolTableActions;
