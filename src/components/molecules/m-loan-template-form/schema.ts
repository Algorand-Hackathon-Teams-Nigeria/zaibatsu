import { zodResolver } from "@hookform/resolvers/zod";
import { LoanEnumType } from "@/services/graphql/generated";
import { validZodNumber } from "@utils/forms/fields";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAtomValue } from "jotai";
import loanTemplateFormAtom from "@/state/atoms/loanTemplateFormAtom";

const formSchema = z.object({
	minLoanTenure: validZodNumber(),
	maxLoanTenure: validZodNumber(),
	interestRate: validZodNumber(),
	collateralPercentage: validZodNumber(),
	repaymentPeriods: validZodNumber().optional(),
	earlyRepaymentPenaltyPercentage: validZodNumber().optional(),
	assetId: validZodNumber(),
	loanType: z
		.enum([LoanEnumType.Dao, LoanEnumType.P2P, LoanEnumType.Zaibatsu], {
			message: "Please enter a valid loan_type",
		})
		.optional(),
	creatorAddress: z
		.string()
		.length(52, { message: "Pleae enter a valid algorand address" })
		.optional(),
	poolId: validZodNumber().optional(),
});

export type LoanTemplateFormSchema = z.infer<typeof formSchema>;

export const useTemplateForm = () => {
	const defaultValue = useAtomValue(loanTemplateFormAtom);
	return useForm<LoanTemplateFormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: defaultValue,
	});
};
