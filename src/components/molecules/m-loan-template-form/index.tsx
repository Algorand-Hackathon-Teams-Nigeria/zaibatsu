"use client";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from "@ui/form";
import { LoanTemplateFormSchema, useTemplateForm } from "./schema";
import { Input } from "@ui/input";
import AssetSelectCombobox from "../m-asset-select-combobox";
import { Button } from "@/components/ui/button";
import { useNewLoanTemplateMutation } from "@/services/graphql/generated";

const LoanTemplateForm = () => {
	const form = useTemplateForm();
	const [{ fetching }, mutate] = useNewLoanTemplateMutation();

	const onSubmit = async (value: LoanTemplateFormSchema) => {};
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
									<Input placeholder="0" {...field} />
								</FormControl>
								<FormDescription />
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
									<Input placeholder="0" {...field} />
								</FormControl>
								<FormDescription />
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
									<Input placeholder="0.0" {...field} />
								</FormControl>
								<FormDescription />
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
									<Input placeholder="0.0" {...field} />
								</FormControl>
								<FormDescription />
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
									<Input placeholder="0" {...field} />
								</FormControl>
								<FormDescription />
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
									<Input placeholder="0.0" {...field} />
								</FormControl>
								<FormDescription />
							</FormItem>
						)}
					/>
				</fieldset>
				<fieldset className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
					<FormField
						control={form.control}
						name="assetId"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Asset</FormLabel>
								<FormControl>
									<AssetSelectCombobox
										onSelect={(v) => field.onChange(v?.assetId)}
									/>
								</FormControl>
								<FormDescription />
							</FormItem>
						)}
					/>
					<div className="h-full flex items-end justify-end">
						<Button
							loading={fetching}
							disabled={fetching}
							className="w-full max-w-[100px]"
						>
							Save
						</Button>
					</div>
				</fieldset>
			</form>
		</Form>
	);
};

export default LoanTemplateForm;
