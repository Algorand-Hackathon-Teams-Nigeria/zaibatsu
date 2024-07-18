"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@ui/collapsible";
import React from "react";
import OcticonFilter16 from "~icons/octicon/filter-16.jsx";
import IconParkOutlineSearch from "~icons/icon-park-outline/search.jsx";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  children?: React.ReactNode;
  withSearch?: boolean;
}

const CollapsibleFilter: React.FC<Props> = ({
  title,
  children,
  withSearch,
  ...props
}) => {
  return (
    <Collapsible>
      <div className="flex items-center justify-between mb-4">
        <div></div>
        <div className="flex flex-col md:flex-row items-center gap-2">
          {withSearch && (
            <div className="flex items-center pl-3 focus-within:ring-ring focus-within:ring-1 rounded-md bg-card">
              <IconParkOutlineSearch />
              <Input
                placeholder="Search"
                {...props}
                className="focus-visible:ring-0 border-0"
              />
            </div>
          )}
          <CollapsibleTrigger>
            <Button
              className="bg-card flex gap-2 hover:bg-card/50 items-center"
              title="Loan offers filter"
            >
              <OcticonFilter16 />
              <span>Filter</span>
              <span className="sr-only">{title}</span>
            </Button>
          </CollapsibleTrigger>
        </div>
      </div>
      <CollapsibleContent>
        <Card className="border-none bg-background">
          <CardHeader>
            <CardDescription>{title}</CardDescription>
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CollapsibleFilter;
