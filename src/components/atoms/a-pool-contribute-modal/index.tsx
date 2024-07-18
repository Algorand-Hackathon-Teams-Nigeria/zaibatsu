import AssetSelectCombobox from "@/components/molecules/m-asset-select-combobox";
import TransactionConfirmModal from "@/components/molecules/m-transaction-confirm-modal";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { calcAmountPlusFee } from "@utils/finance";
import { ellipseText } from "@/lib/utils/text";
import useFundPool from "@/services/contract/hooks/fundPool";
import {
  AlgorandStandardAssetsQuery,
  PoolsQuery,
} from "@/services/graphql/generated";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  pool: PoolsQuery["pools"][number];
}

const formSchema = z.object({
  assetId: validZodNumber("Please select an asset"),
  amount: validZodNumber(),
});

type FormSchema = z.infer<typeof formSchema>;

type ContributionData = {
  asset?: AlgorandStandardAssetsQuery["algorandStandardAssets"][number];
  amount?: number;
  transactionFee?: number;
};

const PoolContributeModal: React.FC<Props> = ({ pool }) => {
  const [fundOpen, setFundOpen] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [formData, setFormData] = React.useState<ContributionData>();
  const { fund, processing } = useFundPool();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormSchema) => {
    if (formData?.asset?.decimals) {
      const assetAmount = Number(data.amount) * formData.asset.decimals;
      const amountPlusFee = calcAmountPlusFee(assetAmount);
      const transactionFee =
        (amountPlusFee - assetAmount) / formData.asset.decimals;
      const amount = assetAmount / formData.asset.decimals;

      setFormData((c) => ({
        ...c,
        amount,
        transactionFee,
      }));
      setConfirmOpen(true);
    }
  };

  const handleFundPool = () => {
    if (formData?.amount && formData.transactionFee && formData.asset) {
      const amount = formData?.amount + formData?.transactionFee;
      fund({
        pool,
        asset: formData.asset,
        amount,
        onSuccess: () => setFundOpen(false),
      });
    }
  };

  return (
    <>
      <Dialog open={fundOpen} onOpenChange={setFundOpen}>
        <DialogTrigger>
          <Button type="button">Contribute</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="text-2xl font-medium my-4">
            Fund Pool ({ellipseText(pool.name, 10)})
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="assetId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assets</FormLabel>
                    <FormControl>
                      <AssetSelectCombobox
                        className="py-6"
                        onSelect={(v) => {
                          setFormData((c) => ({ ...c, asset: v }));
                          field.onChange(String(v?.assetId));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        className="py-6"
                        placeholder="0.00"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={processing}
                loading={processing}
                type="submit"
                size="lg"
                className="py-6"
              >
                Confirm
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      {formData?.asset && (
        <TransactionConfirmModal
          open={confirmOpen}
          onOpenChange={setConfirmOpen}
          onConfirm={handleFundPool}
          transaction={{
            asset: formData.asset,
            charges: [
              {
                title: "Amount",
                amount: formData.amount ?? 0,
              },
              {
                title: "Transaction Fee",
                amount: formData.transactionFee ?? 0,
              },
            ],
          }}
        />
      )}
    </>
  );
};

export default PoolContributeModal;
