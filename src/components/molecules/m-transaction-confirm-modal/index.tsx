import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { AlgorandStandardAssetsQuery } from "@/services/graphql/generated";
import Image from "next/image";
import React from "react";

interface Props {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onConfirm?: () => void;
  transaction?: {
    asset: AlgorandStandardAssetsQuery["algorandStandardAssets"][number];
    charges?: {
      title: string;
      amount: number;
    }[];
  };
}

const TransactionConfirmModal: React.FC<Props> = ({
  open,
  onOpenChange,
  onConfirm,
  transaction,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="text-center font-bold text-2xl">
          Transaction Summary
        </DialogHeader>
        <Separator />
        <div className="flex flex-col gap-6">
          {transaction?.charges?.map((item) => (
            <div key={item.title} className="flex flex-col gap-2">
              <p className="font-semibold text-lg">{item.title}</p>
              <div className="flex items-center gap-2">
                <Image
                  src={transaction?.asset.imageUrl}
                  alt={transaction?.asset.unitName}
                  width={24}
                  height={24}
                />
                <span>{item.amount.toPrecision(2)}</span>
              </div>
            </div>
          ))}
          <div className="flex flex-col gap-2 mt-2">
            <p className="font-semibold text-xl">Total</p>
            <div className="flex items-center gap-2">
              <Image
                src={transaction?.asset.imageUrl ?? ""}
                alt={transaction?.asset.unitName ?? ""}
                width={24}
                height={24}
              />
              <span>
                {transaction?.charges
                  ?.flatMap((i) => i.amount)
                  .reduce((v, c) => v + c)
                  ?.toPrecision(2)}
              </span>
            </div>
          </div>
        </div>
        <DialogFooter className="flex flex-col w-full">
          <Button
            className="w-full py-6 mt-2"
            size="lg"
            onClick={() => {
              onConfirm && onConfirm();
              onOpenChange && onOpenChange(false);
            }}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionConfirmModal;
