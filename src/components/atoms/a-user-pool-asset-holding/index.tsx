import React from "react";
import { UserPoolAssetHoldingsQuery } from "@/services/graphql/generated";
import { Button } from "@/components/ui/button";
import { getMultiplierForDecimalPlaces } from "@/lib/utils/math";
import MiOptionsVertical from "~icons/mi/options-vertical.jsx";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import WithdrawFromPoolForm from "../a-withdraw-from-pool-form";

interface Props {
  poolId: string;
  address: string;
  holding: UserPoolAssetHoldingsQuery["userPoolAssetHoldings"][number];
}

const UserPoolAssetHolding: React.FC<Props> = ({
  holding,
  address,
  poolId,
}) => {
  const [formOpen, setFormOpen] = React.useState(false);
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  let val =
    holding.balance / getMultiplierForDecimalPlaces(holding.asset.decimals);
  console.log(val, holding.assetPrice);
  return (
    <li
      key={holding.id}
      className="bg-card w-fit rounded-lg p-4 flex items-center gap-6"
    >
      <div className="flex flex-col gap-1">
        <Image
          width={54}
          height={54}
          src={holding.asset.imageUrl}
          alt={holding.asset.unitName}
        />
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger>
            <Button variant="ghost" className="rounded-full" size="icon">
              <MiOptionsVertical />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Dialog open={formOpen} onOpenChange={setFormOpen}>
              <DialogTrigger>
                <button className="w-full">Withdraw</button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader className="pb-6">
                  <DialogTitle>Withdraw {holding.asset.unitName}</DialogTitle>
                </DialogHeader>
                <WithdrawFromPoolForm
                  holding={holding}
                  onSuccess={() => {
                    setFormOpen(false);
                    setPopoverOpen(false);
                  }}
                  poolId={poolId}
                  address={address}
                />
              </DialogContent>
            </Dialog>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-2">
        <div className="font-semibold text-lg">{holding.asset.unitName}</div>
        <div className="text-sm font-light">
          <div>
            {(
              holding.balance /
              getMultiplierForDecimalPlaces(holding.asset.decimals)
            ).toPrecision(6)}
          </div>
          <div className="flex items-center gap-0.5">
            <span className="text-lg">$</span>
            <span>
              {(
                (holding.balance /
                  getMultiplierForDecimalPlaces(holding.asset.decimals)) *
                holding.assetPrice
              ).toPrecision(4)}
            </span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default UserPoolAssetHolding;
