"use client";

import { useContractClients } from "@/components/providers/contract";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { validZodNumber } from "@/lib/utils/forms/fields";
import { getMultiplierForDecimalPlaces } from "@/lib/utils/math";
import {
  UserPoolAssetHoldingsQuery,
  useWithdrawFromPoolMutation,
} from "@/services/graphql/generated";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWallet } from "@txnlab/use-wallet";
import algosdk from "algosdk";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  assetAmount: validZodNumber("Please enter a valid amount"),
});

type FormSchema = z.infer<typeof formSchema>;

interface Props {
  poolId: string;
  onSuccess?: () => void;
  address: string;
  holding: UserPoolAssetHoldingsQuery["userPoolAssetHoldings"][number];
}

const WithdrawFromPoolForm: React.FC<Props> = ({
  poolId,
  onSuccess,
  address,
  holding,
}) => {
  const { toast } = useToast();
  const { algodClient } = useContractClients();
  const [contractLoading, setContractLoading] = React.useState(false);
  const { signTransactions, sendTransactions } = useWallet();
  const [{ fetching }, withdrawMutate] = useWithdrawFromPoolMutation();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (value: FormSchema) => {
    const max =
      holding.balance / getMultiplierForDecimalPlaces(holding.asset.decimals);
    if (Number(value.assetAmount) > max) {
      form.setError("assetAmount", {
        message: "Amount exceeds available balance",
      });
      return;
    }

    try {
      setContractLoading(true);
      const sp = await algodClient.getTransactionParams().do();
      const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: address,
        to: address,
        amount: 0,
        suggestedParams: sp,
        assetIndex: Number(holding.asset.assetId),
      });
      const signedTxn = await signTransactions([txn.toByte()]);
      const txnInfo = await sendTransactions(signedTxn);
      setContractLoading(false);

      const { error } = await withdrawMutate({
        input: {
          poolId,
          assetId: holding.asset.assetId,
          assetAmount: Math.round(
            Number(value.assetAmount) *
              getMultiplierForDecimalPlaces(holding.asset.decimals),
          ),
          txnId: txnInfo.txId,
        },
      });

      if (error?.graphQLErrors) {
        error.graphQLErrors.map((err) =>
          toast({
            title: "Withdrawal Error",
            description: err.message,
            variant: "destructive",
          }),
        );
        setContractLoading(false);
      } else {
        toast({
          title: "Withdrawal Success",
          description: "Your withdrawal has been successfully processed",
        });
        onSuccess && onSuccess();
      }
    } catch (error) {
      console.log(error);
      setContractLoading(false);
      toast({
        title: "Transaction Error",
        description: "Failed to process withdrawal transaction",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <div className="flex items-center gap-4">
        <Image
          width={54}
          height={54}
          src={holding.asset.imageUrl}
          alt={holding.asset.unitName}
        />
        <div className="font-light flex-1">
          <div className="w-full flex items-center justify-between">
            <span>
              {(
                holding.balance /
                getMultiplierForDecimalPlaces(holding.asset.decimals)
              ).toPrecision(6)}
            </span>
            <span className="font-semibold">Asset Balance</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-0.5">
              <span className="text-xl">$</span>
              <span>
                {(
                  (holding.balance /
                    getMultiplierForDecimalPlaces(holding.asset.decimals)) *
                  holding.assetPrice
                ).toPrecision(4)}
              </span>
            </div>
            <span className="font-semibold">Value</span>
          </div>
        </div>
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mt-2"
      >
        <FormField
          control={form.control}
          name="assetAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">Amount</FormLabel>
              <FormControl>
                <Input
                  max={
                    holding.balance /
                    getMultiplierForDecimalPlaces(holding.asset.decimals)
                  }
                  type="number"
                  step="0.001"
                  placeholder="0.00"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={fetching || contractLoading}
          loading={fetching || contractLoading}
          className="md:w-full"
        >
          Withdraw
        </Button>
      </form>
    </Form>
  );
};

export default WithdrawFromPoolForm;
