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
import {
	LoanEnumType,
	useNewLoanTemplateMutation,
} from "@/services/graphql/generated";
import React from "react";
import { useWallet } from "@txnlab/use-wallet";
import { useToast } from "@/components/ui/use-toast";

interface Props {
	onClose?: CallableFunction;
	loanType: LoanEnumType;
}

const LoanTemplateForm: React.FC<Props> = ({ onClose, loanType }) => {
	const form = useTemplateForm();
	const [{ fetching }, mutate] = useNewLoanTemplateMutation();
	const { activeAddress } = useWallet();

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
		const { error } = await mutate({
			input: {
				...value,
				collateralPercentage: Number(value.collateralPercentage),
				earlyRepaymentPenaltyPercentage: Number(
					value.earlyRepaymentPenaltyPercentage,
				),
				poolId: undefined,
				creatorAddress: activeAddress,
				repaymentPeriods: Number(value.repaymentPeriods),
				maxLoanAmount: Number(value.maxLoanAmount),
				minLoanTenure: Number(value.minLoanTenure),
				maxLoanTenure: Number(value.maxLoanTenure),
				interestRate: Number(value.interestRate),
				loanType,
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
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 mt-6">
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
										onSelect={(v) => field.onChange(String(v?.assetId))}
									/>
								</FormControl>
								<FormDescription />
								<FormMessage />
							</FormItem>
						)}
					/>
				</fieldset>
				<div className="w-full flex items-end justify-end">
					<Button
						loading={fetching}
						disabled={fetching}
						className="w-full max-w-[100px]"
					>
						Save
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default LoanTemplateForm;
