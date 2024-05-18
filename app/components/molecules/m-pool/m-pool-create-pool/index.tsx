import { useWallet } from "@txnlab/use-wallet";
import { DialogOld } from "@ui/dialog";
import React from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { useState } from "react";
import { useContract } from "@/providers/contract";
import algosdk from "algosdk";
import Success from "@/components/atoms/a-success";
import FundPool from "../m-pool-fundPool";
import CreatePoolPage from "../m-pool-createDialog";
import { useMutation } from "@apollo/client/index.js";
import { CREATE_POOL } from "@/services/graphql/mutations";

const CreatePool = () => {
  const [tabInView, setTabInView] = useState("create");
  const [sendCreatePool, { data, loading, error }] = useMutation(CREATE_POOL);

  const [open, setOpen] = React.useState(false);
  const { providers, activeAccount } = useWallet();
  const connectedProvider = providers?.find((provider) => provider.isActive);

  const [assetsValue, setAssetsValue] = React.useState<Option[]>([
    { label: "Remix", value: "remix" },
    { label: "Vite", value: "vite" },
  ]);

  const [formData, setFormData] = React.useState({
    dateCreated: 123456,
    key: "",
    manager: "",
    interestRate: "",
    collateralPercentage: "",
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const { serviceClient, algodClient } = useContract();

  const encoder = new TextEncoder();
  const args = {};

  const date = new Date();
  var isoDateTime = date.toISOString();
  isoDateTime.replace(/\.\d{3}/, "").replace(/[-:T]/g, "");

  function encodeIntoAtPosition(string: string): Uint8Array {
    return encoder.encode(string);
  }

  async function createNewPool() {
    const sp = await algodClient?.getTransactionParams().do();
    const appAddress = await serviceClient?.appClient.getAppReference(); //aka appid
    const activeAccountAddress = activeAccount?.address;
    const poolNote = formData?.name;

    const args = {
      from: activeAccount?.address,
      to: activeAccountAddress,
      amount: 0,
      suggestedParams: sp,
      note: poolNote,
    };
    const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: String(args.from),
      to: String(args.to),
      amount: args.amount,
      // @ts-ignore
      suggestedParams: args.suggestedParams,

      note: args.note ? encoder.encode(args.note) : undefined,
    });

    appAddress?.appId;

    const u8array = new Uint8Array(8);
    const boxName = encodeIntoAtPosition(String(isoDateTime));
    console.log(
      serviceClient?.savePool(
        { key: activeAccountAddress, name: poolNote, txn: txn },
        // @ts-ignore

        { boxes: [{ appId: appAddress?.appId, name: boxName }] }
      )
    );

    //{accounts: accounts,apps,assets,sender,boxes,lease,note,rekeyTo,sendParams}
    // @ts-ignore
  }

  function createPoolNow() {
    setFormData((prevdata) => {
      const newData = prevdata;
      newData.key = String(isoDateTime);
      newData.manager = activeAccount && activeAccount.address;
      newData.interestRate = Number(prevdata.interestRate);
      newData.collateralPercentage = Number(prevdata.collateralPercentage);

      return newData;
    });
    console.log("data to be passed to create endpoint: ", formData);
    sendCreatePool({ variables: { input: formData } });
    console.log("create pool errors: ", error);
    console.log("returned data: ", data);
    createNewPool();
  }
  console.log("create pool errors: ", error);
  console.log("returned data: ", data);

  return (
    <DialogOld.Root open={open} onOpenChange={setOpen}>
      <DialogOld.Trigger>
        <div className=" p-3 flex items-center justify-center bg-secondaryPool-foreground rounded-lg"> Add +</div>
      </DialogOld.Trigger>

      <DialogOld.Content className="p-8 md:max-w-[597px]   overflow-y-auto max-w-[90vw] bg-[#00380f] border-none text-white rounded-[10px]">
        {tabInView == "success" ? (
          ""
        ) : (
          <DialogOld.Header className="w-full flex flex-col ">
            <DialogOld.Title className=" flex  justify-start font-medium text-2xl leading-8 flex-grow-0 tracking-[0.004em]">
              {tabInView == "create" ? "Create Pool" : "Fund Pool"}
            </DialogOld.Title>
          </DialogOld.Header>
        )}
        {tabInView == "create" ? (
          <CreatePoolPage
            formData={formData}
            onChange={handleChange}
            assetsValue={assetsValue}
            setAssetsValue={(value: any) => setAssetsValue(value)}
          />
        ) : tabInView == "success" ? (
          <Success description="Your pool has been created successfully" />
        ) : (
          <FundPool formData={formData} onChange={handleChange} />
        )}
        {tabInView !== "success" && (
          <button
            onClick={() => {
              //  tabInView == "create" ?{/** setTabInView("fund")  */}: setTabInView("success");
              // tabInView == "fund" && createNewPool();
              createPoolNow();
            }}
            className="w-full h-11 md:h-[60px]  text-[16px] leading-[18px] mt-4 md:mt-10 bg-[#002600] text-white rounded-lg flex items-center justify-center "
          >
            {
              //tabInView == "create" ? "Continue" : "Confirm"
            }
            {loading ? "Creating..." : "Confirm"}
          </button>
        )}
      </DialogOld.Content>
    </DialogOld.Root>
  );
};

export default CreatePool;
