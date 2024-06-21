"use client";

import { cn } from "@/lib/utils/ui";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import React from "react";

const Collapsible = CollapsiblePrimitive.Root;

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

type CollapsibleContentProps = CollapsiblePrimitive.CollapsibleContentProps &
	React.RefAttributes<HTMLDivElement>;
const CollapsibleContent = React.forwardRef<
	HTMLDivElement,
	CollapsibleContentProps
>(({ className, ...props }, ref) => {
	return (
		<CollapsiblePrimitive.CollapsibleContent
			className={cn(
				"overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up",
				className,
			)}
			ref={ref}
			{...props}
		/>
	);
});

CollapsibleContent.displayName = "CollapsibleContent";

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
