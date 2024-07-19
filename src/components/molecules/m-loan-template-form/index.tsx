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
import { LoanTemplateFormSchema, useTemplateForm } from "./schema";
import { Input } from "@ui/input";
import AssetSelectCombobox from "../m-asset-select-combobox";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@ui/dialog";
import {
  AlgorandStandardAssetsQuery,
  LoanEnumType,
  useNewLoanTemplateMutation,
  useNewPoolLoanTemplateProposalVoteMutation,
} from "@/services/graphql/generated";
import React from "react";
import { useWallet } from "@txnlab/use-wallet";
import { useToast } from "@/components/ui/use-toast";
import { getMultiplierForDecimalPlaces } from "@/lib/utils/math";
import ConfirmPoolFormVoteForm from "../m-confirm-pool-vote-form";
import { useContractClients } from "@/components/providers/contract";
import algosdk from "algosdk";

interface DaoProps {
  loanType: "Dao";
  onClose?: CallableFunction;
  proposalId: string;
  poolId: string;
}

interface P2PProps {
  loanType: "P2P";
  onClose?: CallableFunction;
}

type Props = DaoProps | P2PProps;

const LoanTemplateForm: React.FC<Props> = ({ onClose, ...props }) => {
  const form = useTemplateForm();
  const { activeAddress } = useWallet();
  const [{ fetching }, mutate] = useNewLoanTemplateMutation();
  const [{}, voteMutate] = useNewPoolLoanTemplateProposalVoteMutation();
  const { authAndDaoClient, algodClient } = useContractClients();
  const [contractProgress, setContractProgress] = React.useState(false);
  const [principalAsset, setPrincipalAsset] = React.useState<
    AlgorandStandardAssetsQuery["algorandStandardAssets"][number] | undefined
  >();
  const [voteMultiplier, setVoteMultiplier] = React.useState({
    multiplier: 1,
    asset: undefined as Number | undefined,
    poolKey: undefined as string | undefined,
  });

  const formRef = React.useRef<HTMLFormElement>(null);

  const { toast } = useToast();

  const onSubmit = async (value: LoanTemplateFormSchema) => {
    if (!activeAddress) {
      toast({
        title: "Unidentified User",
        description: "Please connect your wallet to proceed",
        variant: "destructive",
      });
      onClose && onClose();
      return;
    }
    if (!principalAsset) {
      toast({
        title: "Unidentified Asset",
        description: "Please make sure you've selected an Asset",
        variant: "destructive",
      });
      onClose && onClose();
      return;
    }
    if (props.loanType === "Dao") {
      setContractProgress(true);
      const encoder = new TextEncoder();
      const sp = await algodClient.getTransactionParams().do();
      const appRef = await authAndDaoClient.appClient.getAppReference();
      const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: activeAddress,
        to: appRef.appAddress,
        assetIndex: Number(voteMultiplier.asset ?? 0),
        note: encoder.encode("Approval for vote"),
        amount: voteMultiplier.multiplier,
        suggestedParams: sp,
      });
      try {
        authAndDaoClient.approvePoolVote(
          {
            txn,
            poolKey: voteMultiplier.poolKey ?? "",
          },
          { boxes: [{ appId: appRef.appId, name: voteMultiplier.poolKey ?? "" }] },
        );
        setContractProgress(false);
      } catch (e) {
        console.log({ e });
        setContractProgress(false);
        toast({
          title: "Contract Error",
          description: "Failed to approve vote",
          variant: "destructive",
        });
        return;
      }
    }
    const { error } =
      props.loanType === "P2P"
        ? await mutate({
            input: {
              ...value,
              collateralPercentage: Number(value.collateralPercentage),
              earlyRepaymentPenaltyPercentage: Number(value.earlyRepaymentPenaltyPercentage),
              poolId: undefined,
              creatorAddress: activeAddress,
              repaymentPeriods: Number(value.repaymentPeriods),
              maxLoanAmount:
                Number(value.maxLoanAmount) *
                getMultiplierForDecimalPlaces(principalAsset.decimals),
              minLoanTenure: Number(value.minLoanTenure),
              maxLoanTenure: Number(value.maxLoanTenure),
              interestRate: Number(value.interestRate),
              loanType: LoanEnumType.P2P,
            },
          })
        : await voteMutate({
            input: {
              ...value,
              collateralPercentage: Number(value.collateralPercentage),
              earlyRepaymentPenaltyPercentage: Number(value.earlyRepaymentPenaltyPercentage),
              voterAddress: activeAddress,
              repaymentPeriods: Number(value.repaymentPeriods),
              maxLoanAmount:
                Number(value.maxLoanAmount) *
                getMultiplierForDecimalPlaces(principalAsset.decimals),
              minLoanTenure: Number(value.minLoanTenure),
              maxLoanTenure: Number(value.maxLoanTenure),
              interestRate: Number(value.interestRate),
              multiplier: voteMultiplier.multiplier,
              proposalId: props.proposalId,
            },
          });
    if (error?.graphQLErrors) {
      error.graphQLErrors.map((err) =>
        toast({
          title: "Error",
          description: err.message,
          variant: "destructive",
        }),
      );
    } else {
      toast({
        title: "Success",
        description: "Your loan template has been saved",
      });
      onClose && onClose();
    }
  };
  return (
    <Form {...form}>
      <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 mt-6">
        <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <FormField
            control={form.control}
            name="minLoanTenure"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Min Loan Tenure</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxLoanTenure"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Loan Tenure</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>
        <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <FormField
            control={form.control}
            name="interestRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interest Rate</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0.0" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="collateralPercentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Collateral Percentage</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0.0" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>
        <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <FormField
            control={form.control}
            name="repaymentPeriods"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Repayment Periods</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="earlyRepaymentPenaltyPercentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Early Pepayment Penalty Percentage</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0.0" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>
        <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <FormField
            control={form.control}
            name="maxLoanAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Loan Amount</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0.0" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="assetId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Asset</FormLabel>
                <FormControl>
                  <AssetSelectCombobox
                    onSelect={(v) => {
                      setPrincipalAsset(v);
                      field.onChange(String(v?.assetId));
                    }}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>
        <div className="w-full flex items-end justify-end pt-6">
          {props.loanType === "Dao" ? (
            <Dialog>
              <DialogTrigger className="w-full">
                <Button
                  type="button"
                  loading={fetching || contractProgress}
                  disabled={fetching || contractProgress}
                  className="w-full max-w-[374px]"
                >
                  Place Vote
                </Button>
              </DialogTrigger>
              <DialogContent>
                <ConfirmPoolFormVoteForm
                  onConfirm={(v) => {
                    setVoteMultiplier({
                      multiplier: v.multiplier,
                      asset: v.poolAsset,
                      poolKey: v.poolKey,
                    });
                    formRef.current?.submit();
                  }}
                  poolId={props.poolId}
                />
              </DialogContent>
            </Dialog>
          ) : (
            <Button loading={fetching} disabled={fetching} className="w-full max-w-[374px]">
              Save
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default LoanTemplateForm;
