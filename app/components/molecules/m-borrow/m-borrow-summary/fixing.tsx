import { WalletAddress, WalletProvider } from "@components/atoms";
import { useWallet } from "@txnlab/use-wallet";
import { Button } from "@ui/button";
import { DialogOld } from "@ui/dialog";
import { returnIcon } from "@/components/ui/icon";
import React from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { useState } from "react";
import { IoCheckmark } from "react-icons/io5";
import { useContract } from "@/providers/contract";
import { createZaibatsuServiceClient } from "@/services/contract/utils";
import algosdk from "algosdk";

const ASSETS_OPTIONS: Option[] = [
  { label: "nextjs", value: "nextjs", fixed: true },
  { label: "React", value: "react" },
  { label: "Remix", value: "remix" },
  { label: "Vite", value: "vite" },
  { label: "Nuxt", value: "nuxt" },
  { label: "Vue", value: "vue" },
  { label: "Svelte", value: "svelte" },
  { label: "Angular", value: "angular" },
  { label: "Ember", value: "ember", disable: true },
  { label: "Gatsby", value: "gatsby", disable: true, fixed: true },
  { label: "Astro", value: "astro" },
];

interface FormData {
  poolName: string;
  assets: Option[];
  interest: string;
  tenor: string;
}

const CreatePool = () => {
  const [tabInView, setTabInView] = useState("create");
  const [open, setOpen] = useState(false);
  const { providers } = useWallet();
  const connectedProvider = providers?.find((provider) => provider.isActive);
  const { serviceClient, algodClient } = useContract();
  const [formData, setFormData] =
    useState <
    FormData >
    {
      poolName: "",
      assets: [
        { label: "Remix", value: "remix" },
        { label: "Vite", value: "vite" },
      ],
      interest: "",
      tenor: "",
    };

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleAssetsChange(newAssets: Option[]) {
    setFormData({
      ...formData,
      assets: newAssets,
    });
  }

  function handleSubmit() {
    if (tabInView === "create") {
      setTabInView("fund");
    } else {
      setTabInView("success");
      //   createNewPool(formData);
    }
  }

  return (
    <DialogOld.Root open={open} onOpenChange={setOpen}>
      <DialogOld.Trigger>
        <div className="p-3 flex items-center justify-center bg-secondaryPool-foreground rounded-lg">Add +</div>
      </DialogOld.Trigger>

      <DialogOld.Content className="p-8 md:max-w-[597px] overflow-y-auto max-w-[90vw] bg-[#00380f] border-none text-white rounded-[10px]">
        {tabInView === "success" ? (
          ""
        ) : (
          <DialogOld.Header className="w-full flex flex-col">
            <DialogOld.Title className="flex justify-start font-medium text-2xl leading-8 flex-grow-0 tracking-[0.004em]">
              {tabInView === "create" ? "Create Pool" : "Fund Pool"}
            </DialogOld.Title>
          </DialogOld.Header>
        )}
        {tabInView === "create" ? (
          <div className="flex flex-col gap-4 md:gap-6 w-full items-center relative mt-6 md:mt-12">
            <div className="w-full gap-6">
              <label className="font-Satoshi text-[16px] leading-[18px] text-white">Pool Name</label>
              <input
                type="text"
                name="poolName"
                value={formData.poolName}
                onChange={handleInputChange}
                className="w-full h-11 md:h-[60px] border border-white rounded-lg mt-3 md:mt-4 bg-secondaryPool-foreground"
              />
            </div>

            <div className="w-full gap-6">
              <label className="font-Satoshi text-[16px] leading-[18px] text-white">Assets</label>
              <MultipleSelector
                value={formData.assets}
                onChange={handleAssetsChange}
                className="w-full min-h-11 md:min-h-[60px] border border-white rounded-lg mt-3 md:mt-4 bg-secondaryPool-foreground"
                defaultOptions={ASSETS_OPTIONS}
                emptyIndicator={<p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">no results found.</p>}
              />
            </div>

            <div className="w-full gap-6">
              <label className="font-Satoshi text-[16px] leading-[18px] text-white">Interest</label>
              <input
                type="text"
                name="interest"
                value={formData.interest}
                onChange={handleInputChange}
                className="w-full h-11 md:h-[60px] border border-white rounded-lg mt-3 md:mt-4 bg-secondaryPool-foreground"
              />
            </div>

            <div className="w-full gap-6">
              <label className="font-Satoshi text-[16px] leading-[18px] text-white">Tenor</label>
              <Select>
                <SelectTrigger className="w-full h-11 md:h-[60px] border border-white rounded-lg mt-3 md:mt-4 bg-secondaryPool-foreground">
                  <SelectValue placeholder="Select a duration" />
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
          </div>
        ) : tabInView === "success" ? (
          <Success />
        ) : (
          <FundPool />
        )}
        {tabInView !== "success" && (
          <button
            onClick={handleSubmit}
            className="w-full h-11 md:h-[60px] text-[16px] leading-[18px] mt-4 md:mt-10 bg-[#002600] text-white rounded-lg flex items-center justify-center"
          >
            {tabInView === "create" ? "Continue" : "Confirm"}
          </button>
        )}
      </DialogOld.Content>
    </DialogOld.Root>
  );
};

export default CreatePool;
