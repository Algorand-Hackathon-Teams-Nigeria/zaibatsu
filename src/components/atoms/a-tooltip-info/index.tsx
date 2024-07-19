import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
interface TooltipDemoProps {
  icon?: React.ReactNode;
  description: string;
}

export function TooltipInfo({ icon, description }: TooltipDemoProps) {
  const [open, setOpen] = useState(false);

  return (
    <TooltipProvider>
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger
          data-state="delayed-open"
          asChild
          className="p-0 rounded-full text-xs bg-transparent"
          onClick={() => setOpen(!open)}
        >
          <span className="border border-betaBlue cursor-pointer hover:border-white duration-150 ease-in-out text-betaBlue hover:text-white">
            {icon || <QuestionMarkCircledIcon />}
          </span>
        </TooltipTrigger>
        <TooltipContent align="start">
          <p className="w-full max-w-[200px]">{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
