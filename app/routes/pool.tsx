import Infobar from "@/components/molecules/m-pool/m-pool-infobar";
import Poolheader from "@/components/molecules/m-pool/m-pool-header-searchbar";
import Pooltable from "@/components/molecules/m-pool/m-pool-table";
import { useContract } from "@/providers/contract";

const PoolPage = () => {
  const { serviceClient } = useContract();

  return (
    <div id="pool page" className="flex flex-col w-full  md:ml-[30px] md:pt-7 md:pr-[47px]  ml-[10px] pt-2 pr-[10px]">
      <Infobar />
      <div>
        <Poolheader />
        <Pooltable />
      </div>
    </div>
  );
};

export default PoolPage;
