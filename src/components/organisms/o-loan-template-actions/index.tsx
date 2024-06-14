"use client";

import LetsIconsAddSquareLight from "~icons/lets-icons/add-square-light.jsx";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import LoanTemplateForm from "@/components/molecules/m-loan-template-form";

const LoanTemplateActions = () => {
	return (
		<div className="flex items-center gap-4">
			<Link className="border p-2 text-sm px-4 rounded-lg" href="#">
				<span className="opacity-80">Your Offers</span>
			</Link>
			<Dialog open>
				<DialogTrigger>
					<Button className="flex items-center gap-2">
						<LetsIconsAddSquareLight />
						<span>Create Offer</span>
					</Button>
				</DialogTrigger>
				<DialogContent className="max-w-[700px]">
					<DialogHeader>
						<DialogTitle>New Loan Template</DialogTitle>
						<DialogDescription>
							This will be used to generate a loan on collateral payment and
							approval
						</DialogDescription>
					</DialogHeader>
					<LoanTemplateForm />
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default LoanTemplateActions;
