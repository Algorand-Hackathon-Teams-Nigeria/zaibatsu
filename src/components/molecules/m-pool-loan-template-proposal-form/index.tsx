"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/form";
import {
  PoolLoanTemplateProposalFormSchema,
  useTemplateProposalForm,
} from "./schema";
import { Button } from "@/components/ui/button";
import {
  PoolLoanTemplateProposalType,
  useCreateUpdatePoolLoanTemplateProposalMutation,
} from "@/services/graphql/generated";
import React from "react";
import { useWallet } from "@txnlab/use-wallet";
import { useToast } from "@/components/ui/use-toast";
import { DateTimePicker } from "@/components/ui/datetime-picker";
import { Switch } from "@ui/switch";

interface Props {
  onClose?: CallableFunction;
  defaultValue?: PoolLoanTemplateProposalType;
  poolId: string;
}

const PoolLoanTemplateProposalForm: React.FC<Props> = ({
  onClose,
  defaultValue,
  poolId,
}) => {
  const form = useTemplateProposalForm();
  const { activeAddress } = useWallet();
  const [{ fetching }, mutate] =
    useCreateUpdatePoolLoanTemplateProposalMutation();

  const { toast } = useToast();

  const onSubmit = async (value: PoolLoanTemplateProposalFormSchema) => {
    if (!activeAddress) {
      toast({
        title: "Unidentified User",
        description: "Please connect your wallet to proceed",
        variant: "destructive",
      });
      onClose && onClose();
      return;
    }

    const { error } = await mutate({
      input: {
        poolId,
        open: value.open === true,
        proposalId: defaultValue?.id,
        senderAddress: activeAddress,
        endTime: value.endTime.toISOString(),
        startTime: value.startTime.toISOString(),
      },
    });
    if (error?.graphQLErrors) {
      error.graphQLErrors.map((err) =>
        toast({
          title: "Error",
          description: err.message,
          variant: "destructive",
        })
      );
    } else {
      toast({
        title: "Success",
        description: "Your loan template proposal has been created",
      });
      onClose && onClose();
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-2">
        <fieldset className="flex flex-col md:flex-row items-center gap-4 justify-between">
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Start Time</FormLabel>
                <FormControl>
                  <DateTimePicker
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>End Time</FormLabel>
                <FormControl>
                  <DateTimePicker
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>
        <fieldset>
          <FormField
            control={form.control}
            name="open"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormLabel className="pt-2">Open</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={(v) => {
                      console.log({ v });
                      field.onChange(v);
                    }}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>
        <div className="w-full flex items-end justify-end">
          <Button loading={fetching} disabled={fetching} className="md:w-full">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PoolLoanTemplateProposalForm;
