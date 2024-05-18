import React, { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FundPoolProps {
  formData: any;
  onChange: any;
}

const FundPool: React.FC<FundPoolProps> = React.memo(({ formData, onChange }) => {
  const [selectedAsset, setSelectedAsset] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  return (
    <div>
      <div className="w-full gap-6 mt-10 mb-6">
        <label className="font-Satoshi text-[16px] leading-[18px] text-white">Assets</label>

        <Select>
          <SelectTrigger className="w-full min-h-11 md:h-[60px] border border-white rounded-lg mt-3 md:mt-4 bg-secondaryPool-foreground">
            <SelectValue placeholder="Select a crypto" />
          </SelectTrigger>
          <SelectContent className="bg-secondaryPool-foreground text-white">
            <SelectGroup>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full">
        <label className="font-Satoshi text-[16px] leading-[18px] text-white flex justify-between">
          Amount <span> Bal: 0.00 </span>
        </label>
        <input
          type="text"
          value={formData.amount}
          name="amount"
          onChange={onChange}
          className="w-full h-11 md:h-[60px] border border-white rounded-lg mt-3 md:mt-4 bg-secondaryPool-foreground"
        />
      </div>
    </div>
  );
});

FundPool.displayName = "Fund Pool Dialog";

export default FundPool;
