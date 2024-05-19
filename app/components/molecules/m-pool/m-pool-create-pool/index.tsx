import React, { useState } from "react";
import { useMutation } from "@apollo/client/index.js";
import { useWallet } from "@txnlab/use-wallet";
import algosdk from "algosdk";
import { DialogOld } from "@ui/dialog";
import { CREATE_POOL } from "@/services/graphql/mutations";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import Success from "@/components/atoms/a-success";
import FundPool from "../m-pool-fundPool";
import CreatePoolPage from "../m-pool-createDialog";
import { useContract } from "@/providers/contract";
import { SignalZero } from "lucide-react";

interface FormData {
  dateCreated: number;
  key: string;
  manager: string;
  interestRate: number;
  collateralPercentage: number;
  name: string;
}

const CreatePool: React.FC = () => {
  const [tabInView, setTabInView] = useState<"create" | "fund" | "success">("create");
  const [open, setOpen] = useState(false);
  const { providers, activeAccount, signer } = useWallet();
  const connectedProvider = providers?.find((provider) => provider.isActive);

  const [assetsValue, setAssetsValue] = useState<Option[]>([
    { label: "Remix", value: "remix" },
    { label: "Vite", value: "vite" },
  ]);

  const [formData, setFormData] = useState<FormData>({
    dateCreated: Date.now(),
    key: "",
    manager: "",
    interestRate: 0,
    collateralPercentage: 0,
    name: "",
  });

  const { serviceClient, algodClient } = useContract();
  const [sendCreatePool, { data, loading, error }] = useMutation(CREATE_POOL);

  const encoder = new TextEncoder();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  function encodeIntoAtPosition(string: string): Uint8Array {
    return encoder.encode(string);
  }

  async function createNewPool() {
    if (!algodClient || !serviceClient || !activeAccount) return;

    const sp = await algodClient.getTransactionParams().do();
    const appAddress = await serviceClient.appClient.getAppReference();
    const activeAccountAddress = activeAccount.address;
    const poolNote = formData.name || "";

    var txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: activeAccountAddress,
      to: appAddress?.appAddress,
      amount: 1,
      suggestedParams: sp,
      note: encoder.encode(poolNote),
    });

    const date = new Date();
    const isoDateTime = date
      .toISOString()
      .replace(/\.\d{3}/, "")
      .replace(/[-:T]/g, "");
    const boxName = encodeIntoAtPosition(isoDateTime);
    serviceClient.savePool(
      { key: activeAccountAddress, name: poolNote, txn: txn },
      { boxes: [{ appId: appAddress?.appId, name: boxName }] }
    );
  }

  function createPoolNow() {
    const datatosend = {
      ...formData,
      key: new Date()
        .toISOString()
        .replace(/\.\d{3}/, "")
        .replace(/[-:T]/g, ""),
      manager: activeAccount?.address || "",
      interestRate: Number(formData.interestRate),
      collateralPercentage: Number(formData.collateralPercentage),
    };
    setFormData((prevData) => ({
      ...prevData,
      key: new Date()
        .toISOString()
        .replace(/\.\d{3}/, "")
        .replace(/[-:T]/g, ""),
      manager: activeAccount?.address || "",
      interestRate: Number(prevData.interestRate),
      collateralPercentage: Number(prevData.collateralPercentage),
    }));
    console.log("data to send to graphql is: ", datatosend);
    sendCreatePool({ variables: { input: datatosend } })
      .then(() => {
        createNewPool();
        setTabInView("success");
      })
      .catch((err) => console.error(err));
  }
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
