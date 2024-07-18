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
import React from "react";
import { LoanEnumType } from "@/services/graphql/generated";

interface Props {
  loanType: LoanEnumType;
}

const LoanTemplateActions: React.FC<Props> = ({ loanType }) => {
  const [formOpen, setFormOpen] = React.useState(false);
  return (
    <div className="flex items-center gap-4">
      <Link className="border p-2 text-sm px-4 rounded-lg" href="#">
        <span className="opacity-80">Your Offers</span>
      </Link>
      <Dialog open={formOpen} onOpenChange={(v) => setFormOpen(v)}>
        <DialogTrigger>
          <Button className="bg-card hover:bg-card/50 flex items-center gap-1">
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
          <LoanTemplateForm
            onClose={() => setFormOpen(false)}
            loanType={loanType}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoanTemplateActions;
