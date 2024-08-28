"use client";

import LetsIconsAddSquareLight from "~icons/lets-icons/add-square-light.jsx";
import { Button } from "@ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@ui/separator";
import React from "react";
import PoolForm from "@molecules/m-pool-form";

const PoolActions: React.FC = () => {
  const [formOpen, setFormOpen] = React.useState(false);
  return (
    <div className="flex items-center gap-4 w-full md:w-fit">
      <Dialog open={formOpen} onOpenChange={(v) => setFormOpen(v)}>
        <DialogTrigger className="w-full md:w-fit">
          <Button className="flex items-center gap-2 w-full md:w-fit">
            <LetsIconsAddSquareLight className=" text-2xl" />
            <span>Create Pool</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[90vw] max-h-[70vh] overflow-y-auto md:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Create a pool</DialogTitle>
            <DialogDescription>
              You will be required to make an initial contribution worth at
              least $20.
            </DialogDescription>
          </DialogHeader>
          <Separator />
          <PoolForm onClose={() => setFormOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PoolActions;
