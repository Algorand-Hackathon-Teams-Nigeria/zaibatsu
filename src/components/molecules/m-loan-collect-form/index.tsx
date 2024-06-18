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

const formSchema = z.object({
  price: validZodNumber(),
  assetId: z.number({ message: "Please select an asset" }),
  tenure: validZodNumber(),
});

type CollectLoanFormSchema = z.infer<typeof formSchema>;

interface Props {
  maxTenure: number;
  minTenure: number;
}

const CollectLoanForm: React.FC<Props> = ({ maxTenure, minTenure }) => {
  const [formData, setFormData] = React.useState<CollectLoanFormSchema>({
    price: "0.00",
    assetId: undefined as any,
    tenure: undefined as any,
  });
  const form = useForm<CollectLoanFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
  });

  const onSubmit = async (value: CollectLoanFormSchema) => {
    setFormData(value);
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Loan Amount</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0.00" {...field} />
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
                  min={minTenure}
                  max={maxTenure}
                  type="number"
                  placeholder="0.00"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button>Proceed</Button>
      </form>
    </Form>
  );
};

export default CollectLoanForm;
