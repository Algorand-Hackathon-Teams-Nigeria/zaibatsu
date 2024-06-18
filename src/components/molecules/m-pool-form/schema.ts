import { validZodNumber } from "@/lib/utils/forms/fields";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(3, { message: "Please enter a valid pool name" }),
  assetId: z.number({ message: "Please select an asset" }),
  fundAmount: validZodNumber(),
});

export type PoolFormSchema = z.infer<typeof formSchema>;

export const usePoolForm = () => {
  const form = useForm<PoolFormSchema>({
    resolver: zodResolver(formSchema),
  });

  return form;
};
