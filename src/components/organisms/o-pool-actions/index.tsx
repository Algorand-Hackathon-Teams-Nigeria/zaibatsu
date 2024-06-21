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
import SearchInput from "@atoms/a-search-input";

const PoolActions: React.FC = () => {
  const [formOpen, setFormOpen] = React.useState(false);
  return (
    <div className="flex items-center gap-4">
      <SearchInput placeholder="Search pools..." />
      <Dialog open={formOpen} onOpenChange={(v) => setFormOpen(v)}>
        <DialogTrigger>
          <Button className="flex items-center gap-2">
            <LetsIconsAddSquareLight />
            <span>Create Pool</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[700px]">
          <DialogHeader>
            <DialogTitle>New Pool</DialogTitle>
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
