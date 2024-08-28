import PoolContributeModal from "@/components/atoms/a-pool-contribute-modal";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils/ui";
import { PoolQuery } from "@/services/graphql/generated";
import { More } from "iconsax-react";
import React from "react";

interface PoolsCardProps {
  pools: PoolQuery["pool"][] | any[];
  fetching?: boolean;
}

// Reusable class variables
const cardWrapperClasses = "flex flex-col p-4 gap-4 bg-[#012F01] rounded-2xl";
const flexBetweenClasses = "flex justify-between items-center";
const textBoldWhiteClasses = "text-sm font-bold text-white";
const textMutedClasses = "text-sm text-[#b0c5b0]";
const popoverButtonClasses = "hover:bg-card active:bg-card rounded-full p-2";
const linkButtonClasses =
  "flex items-center leading-[180%] text-left h-11 py-[0.625rem] px-4 border-b border-[#103810]";

const CardWrapper: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div className={cn(cardWrapperClasses, className)} {...props}>
    {children}
  </div>
);

const FlexBetween: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div className={cn(flexBetweenClasses, className)} {...props}>
    {children}
  </div>
);

const TextBoldWhite: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div className={cn(textBoldWhiteClasses, className)} {...props}>
    {children}
  </div>
);

const TextMuted: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div className={cn(textMutedClasses, className)} {...props}>
    {children}
  </div>
);

const PopoverButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, className, ...props }) => (
  <button className={cn(popoverButtonClasses, className)} {...props}>
    {children}
  </button>
);

const LinkButton: React.FC<
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
> = ({ href, children, className, ...props }) => (
  <a href={href} className={cn(linkButtonClasses, className)} {...props}>
    {children}
  </a>
);

const PoolsTableCard: React.FC<PoolsCardProps> = ({ pools, fetching }) => {
  return (
    <div
      className={cn(
        "grid w-full mx-auto relative",
        "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        "gap-y-6 md:gap-6"
      )}
    >
      {pools?.map((pool) => (
        <CardWrapper key={pool?.id}>
          <TextBoldWhite>
            <FlexBetween>
              <div>{pool?.name}</div>
              <Popover>
                <PopoverTrigger>
                  <PopoverButton>
                    <More size="24" />
                  </PopoverButton>
                </PopoverTrigger>
                <PopoverContent
                  align="end"
                  className={cn(
                    "w-[11.75rem] flex flex-col h-fit",
                    "rounded-lg font-medium text-sm",
                    "bg-[#002600] p-0 shadow-custom"
                  )}
                >
                  <PoolContributeModal
                    className={linkButtonClasses}
                    pool={pool}
                  >
                    <span>Contribute</span>
                  </PoolContributeModal>

                  <LinkButton href={`/pools/${pool.id}/borrow`}>
                    Borrow
                  </LinkButton>
                  <LinkButton href={`/pools/${pool.id}`}>Details</LinkButton>
                </PopoverContent>
              </Popover>
            </FlexBetween>
          </TextBoldWhite>

          <div className="flex flex-col w-full gap-2">
            <TextMuted>
              <FlexBetween>
                <div className="text-left">Assets</div>
                <div className="text-right">Net Value</div>
              </FlexBetween>
            </TextMuted>

            <div className="w-full flex justify-between items-center font-bold">
              <AvatarGroup>
                {pool.assets.map((asset: any) => (
                  <Avatar className="w-6 h-6 aspect-square" key={asset.id}>
                    <AvatarImage src={asset.imageUrl} />
                    <AvatarFallback>
                      {asset.unitName.slice(0, 3).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </AvatarGroup>
              <div>${pool?.netValue.toFixed(2)}</div>
            </div>
          </div>

          <div className="flex flex-col w-full gap-2">
            <TextMuted>
              <FlexBetween className="gap-1 lg:gap-3">
                <div className="text-left">Total Contributors</div>
                <div className="text-right">Loan Offerings</div>
              </FlexBetween>
            </TextMuted>

            <div className="w-full flex justify-between font-bold items-center">
              <div>{pool?.totalContributors}</div>
              <div>{pool?.totalLoanTemplates}</div>
            </div>
          </div>
        </CardWrapper>
      ))}
      {fetching &&
        Array.from({ length: 6 }).map((_, id) => (
          <PoolsTableGridSkeleton key={id} />
        ))}
      {!pools?.length && !fetching && (
        <div className=" flex items-center justify-center text-muted-foreground p-10 py-16">
          <p className="border p-2 rounded-md px-4 opacity-60 text-center">
            There are currently no pools offerings available
          </p>
        </div>
      )}
    </div>
  );
};

export default PoolsTableCard;

const PoolsTableGridSkeleton: React.FC = () => {
  return (
    <CardWrapper>
      <TextBoldWhite>
        <FlexBetween>
          <Skeleton className="h-6 w-24" />
          <PopoverButton>
            <Skeleton className="h-6 w-6 rounded-full" />
          </PopoverButton>
        </FlexBetween>
      </TextBoldWhite>

      <div className="flex flex-col w-full gap-2">
        <TextMuted>
          <FlexBetween>
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-16" />
          </FlexBetween>
        </TextMuted>

        <div className="w-full flex justify-between items-center font-bold">
          <AvatarGroup>
            {Array.from({ length: 3 }).map((_, id) => (
              <Skeleton key={id} className="w-6 h-6 rounded-full" />
            ))}
          </AvatarGroup>
          <Skeleton className="h-5 w-20" />
        </div>
      </div>

      <div className="flex flex-col w-full gap-2">
        <TextMuted>
          <FlexBetween className="gap-1 lg:gap-3">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-24" />
          </FlexBetween>
        </TextMuted>

        <div className="w-full flex justify-between font-bold items-center">
          <Skeleton className="h-5 w-12" />
          <Skeleton className="h-5 w-12" />
        </div>
      </div>
    </CardWrapper>
  );
};
