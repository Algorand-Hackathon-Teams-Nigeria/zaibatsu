"use client";

import React from "react";
import CollapsibleFilter from "@/components/atoms/a-collapsible-filter";
import LoanFilter from "@molecules/m-loan-filter";
import { Button } from "@/components/ui/button";
const ActivitiesActions = () => {
  return (
    <CollapsibleFilter nestedPrefix={<MarkRead />} title="Filter Activities">
      <LoanFilter />
    </CollapsibleFilter>
  );
};

const MarkRead = () => {
  return (
    <Button variant="ghost" className="text-[#B0B3B4] mr-2">
      Mark all as read
    </Button>
  );
};

export default ActivitiesActions;
