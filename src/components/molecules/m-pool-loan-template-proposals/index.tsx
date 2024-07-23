"use client";

import React from "react";

import { parseISO, format } from "date-fns";
import { Switch } from "@ui/switch";
import { usePoolTemplateProposalsQuery } from "@/services/graphql/generated";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@ui/label";
import { Button } from "@ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@ui/dialog";
import LoanTemplateForm from "../m-loan-template-form";

interface Props {
  poolId: string;
}

const PoolLoanTemplateProposals: React.FC<Props> = ({ poolId }) => {
  const [open, setOpen] = React.useState(false);
  const [{ fetching, data }] = usePoolTemplateProposalsQuery({
    variables: {
      opts: {
        filter: {
          poolId,
          open,
        },
      },
    },
  });

  const proposals = data?.poolTemplateProposals ?? [];
  return (
    <section className="space-y-2">
      <h3 className="font-semibold text-xl">Proposals</h3>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <label>Open</label>
          <Switch checked={open} onCheckedChange={setOpen} />
        </div>
        <div className="pt-4 flex items-center flex-wrap gap-4">
          {proposals.map((item) => (
            <Card className="w-fit" key={item.id}>
              <CardHeader>
                <CardTitle>Loan Template Proposal</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label className="font-semibold text-foreground/70">
                    {new Date().getTime() < new Date(item.startTime).getTime()
                      ? "Started"
                      : "Starts"}
                  </Label>
                  <time dateTime={item.startTime} className="text-sm">
                    {format(parseISO(item.startTime), "dd MMM yyyy, h:mm a")}
                  </time>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="font-semibold text-foreground/70">
                    {new Date(item.endTime).getTime() < new Date().getTime() ? "Ends" : "Ended"}
                  </Label>
                  <time dateTime={item.endTime} className="text-sm">
                    {format(parseISO(item.endTime), "dd MMM yyyy, h:mm a")}
                  </time>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <div></div>
                <Dialog>
                  <DialogTrigger>
                    <Button
                      disabled={
                        new Date().getTime() > new Date(item.startTime).getTime() ||
                        new Date().getTime() > new Date(item.endTime).getTime()
                      }
                      className="bg-primary text-background p-1 px-2 rounded"
                    >
                      Vote
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-[90vw] max-h-[90vh] overflow-y-auto md:max-w-screen-md">
                    <LoanTemplateForm poolId={poolId} proposalId={item.id} loanType="Dao" />
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
        {proposals.length === 0 && (
          <div className="flex items-center justify-center">
            <p className="border p-2 px-4 text-foreground/50 rounded-md">
              There are currently no {open ? "Open" : "Closed"} proposals
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PoolLoanTemplateProposals;
