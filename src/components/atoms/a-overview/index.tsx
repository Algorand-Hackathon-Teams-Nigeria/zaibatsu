import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils/ui";
import React from "react";

interface ItemProps {
  fetching?: boolean;
  title?: string;
  children?: React.ReactNode;
}

const Item: React.FC<ItemProps> = ({ fetching, children, title }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-2">
      <p className="text-muted-foreground">{title}</p>
      {fetching ? (
        <Skeleton className="max-w-[300px]" />
      ) : (
        <p className="font-medium">{children}</p>
      )}
    </div>
  );
};

interface RootProps {
  children?: React.ReactNode;
  className?: string;
}

const Root: React.FC<RootProps> = ({ children, className }) => {
  return <Card className={cn("p-4 grid gap-y-4", className)}>{children}</Card>;
};

const Overview = { Root, Item };
export default Overview;
