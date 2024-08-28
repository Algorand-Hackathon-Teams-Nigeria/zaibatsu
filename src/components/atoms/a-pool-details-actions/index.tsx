import { PoolsQuery } from "@/services/graphql/generated";
import PoolContributeModal from "@atoms/a-pool-contribute-modal";
import Link from "next/link";
import React from "react";
import { Eye, Add } from "iconsax-react";
import { Button } from "@/components/ui/button";
interface Props {
  pool: PoolsQuery["pools"][number];
}

const PoolDetailsActions: React.FC<Props> = ({ pool }) => {
  return (
    <div className="flex justify-center items-center gap-4">
      <Button className="border-primary text-primary" variant="outline">
        <Add size="26" />
        <span>Create Proposal</span>
      </Button>

      <PoolContributeModal pool={pool}>
        <Button>
          <Add size="26" />
          <span>Contribute</span>
        </Button>
      </PoolContributeModal>
    </div>
  );
};

export default PoolDetailsActions;
