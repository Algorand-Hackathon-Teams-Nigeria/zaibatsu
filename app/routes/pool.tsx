import Infobar from "@/components/molecules/m-pool/m-pool-infobar";
import Poolheader from "@/components/molecules/m-pool/m-pool-header-searchbar";
import Pooltable from "@/components/molecules/m-pool/m-pool-table";
import { useContract } from "@/providers/contract";
import { useWallet } from "@txnlab/use-wallet";
import { createZaibatsuServiceClient } from "@/services/contract/utils";
const PoolPage = () => {
  const { serviceClient } = useContract();

  // @ts-ignore

  // console.log(serviceClient.create);
  //  alert(serviceClient.create);
  function createPool() {
    console.log(serviceClient.savePool({ appAddress: "test", asset: "eth" }));
    // @ts-ignore
    serviceClient.lendToPool;
    alert(serviceClient.create);
  }

  return (
    <div id="pool page" className="flex flex-col w-full  md:ml-[30px] md:pt-7 md:pr-[47px]  ml-[10px] pt-2 pr-[10px]">
      <Infobar />
      <div>
        <button onClick={createPool}>tester</button>
        <Poolheader />
        <Pooltable />
      </div>
    </div>
  );
};

export default PoolPage;
