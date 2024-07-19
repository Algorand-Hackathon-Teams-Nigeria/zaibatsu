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
import PoolLoanTemplateProposalForm from "@/components/molecules/m-pool-loan-template-proposal-form";

interface DaoProps {
  loanType: "Dao";
  poolId: string;
}

interface P2PProps {
  loanType: "P2P";
}

type Props = DaoProps | P2PProps;

const LoanTemplateActions: React.FC<Props> = (props) => {
  const [formOpen, setFormOpen] = React.useState(false);
  return (
    <div className="flex items-center gap-4">
      {props.loanType === "P2P" && (
        <Link className="border p-2 text-sm px-4 rounded-lg" href="#">
          <span className="opacity-80">Your Offers</span>
        </Link>
      )}
      <Dialog open={formOpen} onOpenChange={(v) => setFormOpen(v)}>
        <DialogTrigger>
          <Button className="bg-card hover:bg-card/50 flex items-center gap-1">
            <LetsIconsAddSquareLight />
            <span>{props.loanType === "Dao" ? "Propose Offer" : "Create Offer"}</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[700px]">
          <DialogHeader>
            <DialogTitle>
              {props.loanType === "Dao" ? "New Loan Template Proposal" : "New Loan Template"}
            </DialogTitle>
            <DialogDescription className="pt-4">
              {props.loanType === "Dao"
                ? "Contributors to this pool will be able to vote and collectively generate a Loan template"
                : "This will be used to generate a loan on collateral payment and approval"}
            </DialogDescription>
          </DialogHeader>
          {props.loanType === "Dao" ? (
            <PoolLoanTemplateProposalForm onClose={() => setFormOpen(false)}  poolId={props.poolId} />
          ) : (
            <LoanTemplateForm onClose={() => setFormOpen(false)} loanType="P2P" />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoanTemplateActions;
