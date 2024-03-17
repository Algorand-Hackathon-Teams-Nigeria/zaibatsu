import { WalletAddress, WalletProvider } from "@components/atoms";
import { useWallet } from "@txnlab/use-wallet";
import { Button } from "@ui/button";
import { DialogOld } from "@ui/dialog";
import { returnIcon } from "@/components/ui/icon";
import React from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";

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

const TENOR_OPTIONS: Option[] = [
  { label: "nextjs", value: "Nextjs" },
  { label: "React", value: "react" },
  { label: "Remix", value: "remix" },
  { label: "Vite", value: "vite" },
  { label: "Nuxt", value: "nuxt" },
  { label: "Vue", value: "vue" },
  { label: "Svelte", value: "svelte" },
  { label: "Angular", value: "angular" },
  { label: "Ember", value: "ember" },
  { label: "Gatsby", value: "gatsby" },
  { label: "Astro", value: "astro" },
];

const CreatePool = () => {
  const [open, setOpen] = React.useState(false);
  const { providers, activeAccount } = useWallet();
  const connectedProvider = providers?.find((provider) => provider.isActive);
  const [assetsValue, setAssetsValue] = React.useState<Option[]>([
    { label: "Remix", value: "remix" },
    { label: "Vite", value: "vite" },
  ]);
  return (
    <DialogOld.Root open={open} onOpenChange={setOpen}>
      <DialogOld.Trigger>
        <Button
          variant={!activeAccount ? "wallet" : "default"}
          type="button"
          className={!activeAccount ? `px-[42px] py-[11.5px]   text-[14px] leading-[30.25px] ` : `bg-transparent`}
          size="lg"
        >
          <div className="flex flex-row items-center text-white">
            <div className={`w-6 h-6 text-white mr-2 flex items-center relative ${activeAccount && "w-[31px] h-[31px]"} `}>
              {!activeAccount
                ? returnIcon("wallet")
                : connectedProvider && (
                    <>
                      <img
                        className="rounded-full w-[31px] h-[31px] filter grayscale brightness-110"
                        src="/assets/images/avataroverlaid.png"
                        alt={connectedProvider.metadata.name}
                      />
                      {<div className="absolute inset-0 bg-secondaryPool-foreground  opacity-50 rounded-full "></div>}
                    </>
                  )}
            </div>
            {activeAccount ? <WalletAddress address={activeAccount.address} truncate /> : "Connect Wallet"}
          </div>
        </Button>
      </DialogOld.Trigger>
      <div className="flex -space-x-4 rtl:space-x-reverse">
        <img
          className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800 transition-transform duration-300 hover:-translate-y-3"
          src="/assets/images/avataroverlaid.png"
          alt=""
        />
        <img
          className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800 transition-transform duration-300 hover:-translate-x-3"
          src="/assets/images/avataroverlaid.png"
          alt=""
        />
        <img
          className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800 transition-transform duration-300 hover:-translate-x-3"
          src="/assets/images/avataroverlaid.png"
          alt=""
        />
        <a
          className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
          href="#"
        >
          +99
        </a>
      </div>

      <DialogOld.Content className="p-8 md:max-w-[597px]   overflow-y-auto max-w-[90vw] bg-[#00380f] border-none text-white rounded-[10px]">
        <DialogOld.Header className="w-full flex flex-col ">
          <DialogOld.Title className=" flex  justify-start font-medium text-2xl leading-8 flex-grow-0 tracking-[0.004em]">
            Create Pool
          </DialogOld.Title>
        </DialogOld.Header>
        <div className="flex flex-col w-full items-center relative mt-12">
          <div className="mb-6 w-full gap-6">
            <label className="font-Satoshi text-[16px] leading-[18px]  text-white">Pool Name</label>
            <input type="text" className="w-full h-[60px] border border-white rounded-lg mt-4 bg-secondaryPool-foreground" />
          </div>

          <div className="mb-6 w-full gap-6">
            <label className="font-Satoshi text-[16px] leading-[18px]  text-white">Assets</label>
            className=" bg-secondaryPool-foreground text-white"
            <MultipleSelector
              value={assetsValue}
              onChange={setAssetsValue}
              className="w-full h-[60px] border border-white rounded-lg mt-4 bg-secondaryPool-foreground"
              defaultOptions={ASSETS_OPTIONS}
              placeholder="Select crypto assets you like..."
              emptyIndicator={<p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">no results found.</p>}
            />
          </div>

          <div className="mb-6 w-full gap-6">
            <label className="font-Satoshi text-[16px] leading-[18px]  text-white">Interest</label>
            <input type="text" className="w-full h-[60px] border border-white rounded-lg mt-4 bg-secondaryPool-foreground" />
          </div>

          <div className="mb-6 w-full gap-6">
            <label className="font-Satoshi text-[16px] leading-[18px]  text-white">Tenor</label>

            <Select>
              <SelectTrigger className="w-full h-[60px] border border-white rounded-lg mt-4 bg-secondaryPool-foreground">
                <SelectValue placeholder="Select a duration" />
              </SelectTrigger>
              <SelectContent className=" bg-secondaryPool-foreground text-white">
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
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

        <button className="w-full h-[60px] text-[16px] leading-[18px] mt-10 bg-[#002600] text-white rounded-lg flex items-center justify-center ">
          Continue
        </button>
      </DialogOld.Content>
    </DialogOld.Root>
  );
};

export default CreatePool;

function FundPool() {
  return (
    <div>
      <div className="mb-6 w-full gap-6">
        <label className="font-Satoshi text-[16px] leading-[18px]  text-white">Assets</label>

        <Select>
          <SelectTrigger className="w-full h-[60px] border border-white rounded-lg mt-4 bg-secondaryPool-foreground">
            <SelectValue placeholder="Select a crypto" />
          </SelectTrigger>
          <SelectContent className=" bg-secondaryPool-foreground text-white">
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="mb-6 w-full gap-6">
        <label className="font-Satoshi text-[16px] leading-[18px]  text-white flex justify-between">
          Amount <span> Bal: 0.00 </span>
        </label>
        <input type="text" className="w-full h-[60px] border border-white rounded-lg mt-4 bg-secondaryPool-foreground" />
      </div>
    </div>
  );
}
