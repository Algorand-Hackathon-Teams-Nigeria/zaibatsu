import Infobar from "@/components/molecules/m-pool/m-pool-infobar";
import Poolheader from "@/components/molecules/m-pool/m-pool-header-searchbar";
import Pooltable from "@/components/molecules/m-pool/m-pool-table";
import { useContract } from "@/providers/contract";
import { useWallet } from "@txnlab/use-wallet";
import { createZaibatsuServiceClient } from "@/services/contract/utils";
import algosdk from "algosdk";
import { WalletAddress, WalletProvider } from "@components/atoms";
import React from "react";
import CreatePool from "@/components/molecules/m-pool/m-pool-create-pool";
const PoolPage = () => {
  const { serviceClient, algodClient } = useContract();

  const [open, setOpen] = React.useState("");
  const { providers, activeAccount } = useWallet();
  const encoder = new TextEncoder();
  const args = {};

  function encodeIntoAtPosition(string: string): Uint8Array {
    return encoder.encode(string);
  }

  async function createPool() {
    const sp = await algodClient?.getTransactionParams().do();
    const appAddress = await serviceClient?.appClient.getAppReference(); //aka appid
    const activeAccountAddress = activeAccount?.address;
    const poolNote = "testing pool";

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
    const date = new Date();
    var isoDateTime = date.toISOString();
    isoDateTime.replace(/\.\d{3}/, "").replace(/[-:T]/g, "");

    const u8array = new Uint8Array(8);
    const boxName = encodeIntoAtPosition(String(isoDateTime));
    console.log(
      serviceClient?.savePool(
        { key: String(isoDateTime), name: "testing pool122", txn: txn },
        // @ts-ignore

        { boxes: [{ appId: appAddress?.appId, name: boxName }] }
      )
    );

    //{accounts: accounts,apps,assets,sender,boxes,lease,note,rekeyTo,sendParams}
    // @ts-ignore
  }

  return (
    <div id="pool page" className="flex flex-col w-full  md:ml-[30px] md:pt-7 md:pr-[47px]  ml-[10px] pt-2 pr-[10px]">
      <Infobar />
      <div>
        <button onClick={createPool}>tester </button>
        <CreatePool />
        <Poolheader />
        <Pooltable />
      </div>
    </div>
  );
};

export default PoolPage;
