import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAtomValue } from "jotai";
import poolLoanTemplateProposalFormAtom from "@/state/atoms/poolLoanTemplateProposalAtom";

const formSchema = z.object({
  startTime: z.instanceof(Date),
  endTime: z.instanceof(Date),
  open: z.boolean(),
});

export type PoolLoanTemplateProposalFormSchema = z.infer<typeof formSchema>;

export const useTemplateProposalForm = () => {
  const defaultValue = useAtomValue(poolLoanTemplateProposalFormAtom);
  return useForm<PoolLoanTemplateProposalFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValue,
  });
};
