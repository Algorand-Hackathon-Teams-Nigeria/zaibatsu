import PoolTableActions from "@/components/atoms/a-pool-table-actions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PoolQuery } from "@/services/graphql/generated";

interface poolsCardProps {
  pools: PoolQuery["pool"][] | any[];
  fetching: boolean;
}

const PoolsTableMobile: React.FC<poolsCardProps> = ({ pools, fetching }) => {
  return (
    <div className="w-full lg:hidden gap-5 flex flex-col">
      {pools.length > 0 && !fetching && (
        <Accordion
          collapsible
          type="single"
          defaultValue={pools[0].id + " " + 0}
          className="flex flex-col gap-4"
        >
          {pools.map((pool, key) => (
            <AccordionItem
              key={pool.id + " " + key}
              value={pool.id + " " + key}
              className="bg-[#012F01] px-4  rounded-2xl"
            >
              <AccordionTrigger>
                <div className="py-2  leading-4 font-bold text-left ">
                  {pool.name}
                </div>
              </AccordionTrigger>
              <AccordionContent key={pool.id} className="pb-6">
                <div
                  key={pool.id}
                  className=" gap-4 text-white text-sm  leading-[18px] rounded-lg p-4 flex flex-col bg-background font-normal"
                >
                  <div className="  border-[#F7F7F7] flex flex-col gap-4">
                    <div className="py-1  font-normal flex flex-row justify-between ">
                      <div className="py-2 text-[#b0c5b0]">Assets</div>
                      <div className="py-2">
                        {" "}
                        <AvatarGroup>
                          {pool.assets.map((asset: any) => (
                            <Avatar
                              className="w-6 h-6 aspect-square"
                              key={asset.id}
                            >
                              <AvatarImage src={asset.imageUrl} />
                              <AvatarFallback>
                                {asset.unitName.slice(0, 3).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                        </AvatarGroup>
                      </div>
                    </div>
                    <div className="py-1  font-normal flex flex-row justify-between ">
                      <div className="py-2 text-[#b0c5b0]">Net Value</div>
                      <div className="py-2"> ${pool.netValue.toFixed(2)}</div>
                    </div>
                  </div>

                  <div className="  border-[#F7F7F7] flex flex-col gap-4">
                    <div className="py-1  font-normal flex flex-row justify-between ">
                      <div className="py-2 text-[#b0c5b0]">
                        Total Contributors
                      </div>
                      <div className="py-2"> {pool.totalContributors}</div>
                    </div>
                    <div className="py-1   font-normal flex flex-row justify-between ">
                      <div className="py-2 text-[#b0c5b0]">Loan Offerings</div>
                      <div className="py-2">{pool.totalLoanTemplates}</div>
                    </div>
                  </div>

                  <div className="pt-1 gap-4 flex flex-row h-10 justify-between items-center">
                    <div className="text-[#b0c5b0]">Actions</div>{" "}
                    <PoolTableActions pool={pool} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      {fetching &&
        Array.from({ length: 10 }).map((_, id) => (
          <PoolsTableMobileSkeleton key={id} />
        ))}
      {pools.length === 0 && !fetching && (
        <Card className="p-2 py-4">
          <div className="flex items-center justify-center text-muted-foreground p-10 py-16">
            <p className="border p-2 rounded-md px-4 opacity-60 text-center">
              There are currently no pools offerings available
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};
export default PoolsTableMobile;
const PoolsTableMobileSkeleton = () => {
  return (
    <Card className=" gap-3 text-white text-base  leading-[18px] rounded-lg p-3 flex flex-col">
      <div className="  border-[#F7F7F7] flex flex-col gap-1">
        <div className="py-2  leading-4 font-bold text-left ">
          <Skeleton className="h-8 w-screen max-w-[300px]" />
        </div>
        <div className="py-1  font-normal flex flex-row justify-between ">
          <div className="py-2 mt-2">Assets</div>
          <div className="py-2">
            {" "}
            <AvatarGroup>
              {Array.from({ length: 3 }).map((_, id) => (
                <Skeleton key={id} className="w-7 h-7 rounded-full" />
              ))}
            </AvatarGroup>
          </div>
        </div>
        <div className="py-1  font-normal flex flex-row justify-between ">
          <div className="py-2">Net Value</div>
          <Skeleton className="h-7 max-w-14 w-screen " />
        </div>
      </div>

      <div className="  border-[#F7F7F7] flex flex-col gap-1">
        <div className="py-1  font-normal flex flex-row justify-between ">
          <div className="py-2">Total Contributors</div>
          <Skeleton className="h-7 max-w-14 w-screen " />
        </div>
        <div className="py-1   font-normal flex flex-row justify-between ">
          <div className="py-2">Loan Offerings</div>
          <Skeleton className="h-7 max-w-14 w-screen " />
        </div>
      </div>

      <div className="pt-1 gap-4 flex flex-row h-10 ">
        <Skeleton className="w-full h-full text-center  rounded " />
        <Skeleton className="w-full h-full text-center  rounded " />
      </div>
    </Card>
  );
};
