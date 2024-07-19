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
import { validZodNumber } from "@/lib/utils/forms/fields";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AssetSelectCombobox from "../m-asset-select-combobox";
import { LoanTemplateQuery, useCalculateLoanSpecificsMutation } from "@/services/graphql/generated";
import { getMinDecimalPlacesValues, getMultiplierForDecimalPlaces } from "@utils/math";
import { useWallet } from "@txnlab/use-wallet";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  loanAmount: validZodNumber(),
  assetId: z.number({ message: "Please select an asset" }),
  tenure: validZodNumber(),
});

type CollectLoanFormSchema = z.infer<typeof formSchema>;

interface Props {
  template?: LoanTemplateQuery["loanTemplate"];
}

const CollectLoanForm: React.FC<Props> = ({ template }) => {
  const router = useRouter();
  const { toast } = useToast();
  const { activeAddress } = useWallet();
  const [{ fetching }, calculateSpecificsMutate] = useCalculateLoanSpecificsMutation();
  const [formData, setFormData] = React.useState<CollectLoanFormSchema>({
    loanAmount: "0.00",
    assetId: undefined as any,
    tenure: undefined as any,
  });
  const form = useForm<CollectLoanFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
  });

  const onSubmit = async (value: CollectLoanFormSchema) => {
    if (Number(value.loanAmount) < getMinDecimalPlacesValues(template?.asset.decimals ?? 1)) {
      form.setError("loanAmount", {
        message: `Value cannot be lower that ${getMinDecimalPlacesValues(template?.asset.decimals ?? 1)}`,
        type: "min",
      });
    }
    setFormData(value);
    if (!activeAddress) {
      toast({
        title: "Unidentified User",
        description: "Please connect your wallet to proceed",
        variant: "destructive",
      });
      return;
    }

    if (!template) {
      toast({
        title: "Missing Template",
        description: "Loan Template not found when one was required",
        variant: "destructive",
      });
      return;
    }

    const { data, error } = await calculateSpecificsMutate({
      args: {
        tenure: Number(value.tenure),
        loanType: template.loanType,
        principalAmount:
          Number(value.loanAmount) * getMultiplierForDecimalPlaces(template.asset.decimals),
        templateId: template.id,
        borrowerAddress: activeAddress,
        collateralAssetId: value.assetId,
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
      router.push(`/loans/${data?.calculateLoanSpecifics.id}`);
    }
  };

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="loanAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Loan Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0.00"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="assetId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Collaterl Asset</FormLabel>
              <FormControl>
                <AssetSelectCombobox
                  exclude={template?.asset ? [String(template.asset.assetId)] : undefined}
                  onSelect={(v) => field.onChange(v?.assetId)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tenure"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Loan Tenure</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0.00"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button loading={fetching} disabled={fetching}>
          Proceed
        </Button>
      </form>
    </Form>
  );
};

export default CollectLoanForm;
