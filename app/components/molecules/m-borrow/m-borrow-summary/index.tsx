import { DialogOld } from "@ui/dialog";
import { useState } from "react";

export function BorrowSummmary({ open, close }: { open?: any; close?: any }) {
  const [isConfirm, setIsConfirm] = useState(false);
  return (
    <DialogOld.Root open={open} onOpenChange={close}>
      <DialogOld.Content className="p-6 md:max-w-[597px]   overflow-y-auto max-w-[90vw] bg-[#00380f] border-none text-white rounded-[10px]">
        <DialogOld.Header className="w-full flex flex-col ">
          <DialogOld.Title className=" flex  justify-start font-medium text-2xl leading-8 flex-grow-0 tracking-[0.004em]">
            Summary{" "}
          </DialogOld.Title>
        </DialogOld.Header>

        {isConfirm ? <Confirm /> : <Summary />}
        <button
          onClick={() => {
            setIsConfirm(false);
          }}
          className="w-full h-11 md:h-[60px]  text-[16px] leading-[18px] mt-7 md:mt-10 bg-[#002600] text-white rounded-lg flex items-center justify-center "
        >
          {isConfirm ? "Confirm Transaction" : "Next"}
        </button>
      </DialogOld.Content>
    </DialogOld.Root>
  );
}

function Summary() {
  return (
    <div className="flex flex-row w-full gap-14">
      <div className="flex flex-col gap-6 w-1/2">
        <div className="flex flex-col items-start gap-4 ">
          <div className=" text-[13px] font-normal leading-[14px]">Pool</div>
          <div className="text-[10.89px] font-normal leading-[12.4px]"> Crystal Cove Lagoon</div>
        </div>

        <div className="flex flex-col   gap-4 ">
          <div className=" text-[13px] font-normal leading-[14px]">Asset to borrow</div>
          <div className="text-[10.89px] font-normal leading-[12.4px] flex flex-row items-center justify-between">
            <div className="flex flex-row items-center">
              <div className="rounded-full w-5 h-5 bg-blue-500 mr-[7.78ox]" />
              <div className="ml-2">WETH</div>
            </div>
            <div> 0.00</div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-4 ">
          <div className=" text-[13px] font-normal leading-[14px]">Pool APR</div>
          <div className="text-[10.89px] font-normal leading-[12.4px]"> 5%</div>
        </div>
      </div>

      <div className="flex flex-col gap-6 w-1/2">
        <div className="flex flex-col items-start gap-4 ">
          <div className=" text-[13px] font-normal leading-[14px]">Tenor</div>
          <div className="text-[10.89px] font-normal leading-[12.4px]">3 months</div>
        </div>

        <div className="flex flex-col   gap-4 ">
          <div className=" text-[13px] font-normal leading-[14px]">Collateral Asset</div>
          <div className="text-[10.89px] font-normal leading-[12.4px] flex flex-row items-center justify-between">
            <div className="flex flex-row items-center">
              <div className="rounded-full w-5 h-5 bg-blue-500 mr-[7.78ox]" />
              <div className="ml-2">WETH</div>
            </div>
            <div> 0.00</div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-4 ">
          <div className=" text-[13px] font-normal leading-[14px]">Loan to Value</div>
          <div className="text-[10.89px] font-normal leading-[12.4px]"> 5%</div>
        </div>
      </div>
    </div>
  );
}

function Confirm() {
  return (
    <div className="flex flex-row w-full gap-14">
      <div className="flex flex-col gap-6 w-1/2">
        <div className="flex flex-col items-start gap-4 ">
          <div className=" text-[13px] font-normal leading-[14px]">Pool</div>
          <div className="text-[10.89px] font-normal leading-[12.4px]"> Crystal Cove Lagoon</div>
        </div>

        <div className="flex flex-col   gap-4 ">
          <div className=" text-[13px] font-normal leading-[14px]">Asset to borrow</div>
          <div className="text-[10.89px] font-normal leading-[12.4px] flex flex-row items-center justify-between">
            <div className="flex flex-row items-center">
              <div className="rounded-full w-5 h-5 bg-blue-500 mr-[7.78ox]" />
              <div className="ml-2">WETH</div>
            </div>
            <div> 0.00</div>
          </div>
        </div>

        <div className="flex flex-col   gap-4 ">
          <div className=" text-[13px] font-normal leading-[14px]">Borrow Amount</div>
          <div className="text-[10.89px] font-normal leading-[12.4px] flex flex-row items-center justify-between">
            <div className="flex flex-row items-center">
              <div className="rounded-full w-5 h-5 bg-blue-500 mr-[7.78ox]" />
              <div className="ml-2">BOR</div>
            </div>
            <div> 0.00</div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-4 ">
          <div className=" text-[13px] font-normal leading-[14px]">Pool APR</div>
          <div className="text-[10.89px] font-normal leading-[12.4px]"> 5%</div>
        </div>
      </div>

      <div className="flex flex-col gap-6 w-1/2">
        <div className="flex flex-col items-start gap-4 ">
          <div className=" text-[13px] font-normal leading-[14px]">Tenor</div>
          <div className="text-[10.89px] font-normal leading-[12.4px]">3 months</div>
        </div>

        <div className="flex flex-col   gap-4 ">
          <div className=" text-[13px] font-normal leading-[14px]">Collateral Asset</div>
          <div className="text-[10.89px] font-normal leading-[12.4px] flex flex-row items-center justify-between">
            <div className="flex flex-row items-center">
              <div className="rounded-full w-5 h-5 bg-blue-500 mr-[7.78ox]" />
              <div className="ml-2">WETH</div>
            </div>
            <div> 0.00</div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-4 ">
          <div className=" text-[13px] font-normal leading-[14px]">Loan to Value</div>
          <div className="text-[10.89px] font-normal leading-[12.4px]"> 5%</div>
        </div>
      </div>
    </div>
  );
}
