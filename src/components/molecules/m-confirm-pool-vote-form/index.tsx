// @ts-nocheck
"use client";

import { Input } from "@/components/ui/input";
import { validZodNumber } from "@/lib/utils/forms/fields";
import { usePoolQuery } from "@/services/graphql/generated";
import { zodResolver } from "@hookform/resolvers/zod";
import { Asset, useWallet } from "@txnlab/use-wallet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/form";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@ui/button";
import Image from "next/image";

const formSchema = z.object({
  amount: validZodNumber(),
});

type FormSchema = z.infer<typeof formSchema>;

interface Props {
  poolId: string;
  onConfirm?: (args: {
    multiplier: number;
    poolAsset: number;
    poolKey: string;
  }) => void;
}

const ConfirmPoolFormVoteForm: React.FC<Props> = ({ poolId, onConfirm }) => {
  const { getAccountInfo } = useWallet();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });
  const [{ fetching, data }] = usePoolQuery({
    variables: {
      poolId,
    },
  });
  const [poolAsset, setPoolAsset] = React.useState<Asset>();

  React.useEffect(() => {
    if (data?.pool) {
      (async () => {
        const info = await getAccountInfo();
        const poolAsset = info.assets?.find((item) => {
          const id = item["asset-id"];
          return id === Number(data.pool.poolAssetId);
        });
        // console.log(info.assets)
        // console.log(data.pool.poolAssetId)
        setPoolAsset(poolAsset);
      })();
    }
  }, [getAccountInfo, data?.pool]);

  const onSubmit = (value: FormSchema) => {
    onConfirm &&
      onConfirm({
        multiplier: Number(value.amount),
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center gap-2 justify-center">
          <h2 className="text-lg font-semibold text-foreground/60">
            Enter vote multiplier. Minimum 1
          </h2>
          {/* <div className="flex items-center gap-2 pt-4"> */}
          {/*   <Image */}
          {/*     src={data?.pool.imageUrl ?? ""} */}
          {/*     alt={data?.pool.tokenUnitName ?? ""} */}
          {/*     width={24} */}
          {/*     height={24} */}
          {/*     className="rounded-full" */}
          {/*   /> */}
          {/*   <span>{(poolAsset?.amount ?? 0).toFixed(4)}</span> */}
          {/* </div> */}
        </div>
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Multiplier</FormLabel>
              <FormControl>
                <Input
                  min={1}
                  step={1}
                  placeholder="0"
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-center w-full p-4">
          <Button type="submit" className="md:w-full">
            Proceed
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ConfirmPoolFormVoteForm;
