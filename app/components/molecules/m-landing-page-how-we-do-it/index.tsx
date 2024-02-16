import { Button } from "@ui/button";

const LandingPageHowWeDoIt = () => {
  return (
    <div className="flex flex-col mt-32 gap-6 items-center justify-center">
      <h3 className="font-medium text-3xl md:text-5xl">How we do it</h3>
      <p className="max-w-[530px] text-center">
        How we offer our services including the methods we use, the technology
        used etc
      </p>
      <div className="flex flex-col flex-wrap items-center gap-16 md:gap-0 md:items-start mt-14 justify-evenly md:flex-row w-full">
        <div className="flex flex-col items-start md:mt-14 gap-4">
          <div className="bg-[#EFE4FC] shadow rounded-full p-4">
            <img src="/assets/images/green-upstatus.svg" alt="up status" />
          </div>
          <h4 className="font-medium text-2xl">Create</h4>
          <p className="max-w-[262px]">
            Built on the secure and innovative algorand network, Zaibatsu
            operates without a central authority.
          </p>
          <Button className="mt-6" type="button">
            Create
          </Button>
        </div>
        <div className="flex flex-col items-start gap-4">
          <div className="bg-[#EFE4FC] shadow rounded-full p-4">
            <img src="/assets/images/purple-pie-chart.svg" alt="chart" />
          </div>
          <h4 className="font-medium text-2xl">Instant payment</h4>
          <p className="max-w-[262px]">
            Put NFTs on sale or on auction. Get paid for your digital
            collectables
          </p>
          <Button className="mt-6" type="button">
            Sale now
          </Button>
        </div>
        <div className="flex flex-col items-start md:mt-20 gap-4">
          <div className="bg-[#EFE4FC] shadow rounded-full p-4">
            <img src="/assets/images/favorite-chart.svg" alt="chart" />
          </div>
          <h4 className="font-medium text-2xl">Set up your wallet</h4>
          <p className="max-w-[262px]">
            Once you’ve set up your wallet of choice, connect it by clicking the
            wallet icon in the top right corner.
          </p>
          <Button className="mt-6" type="button">
            Sale now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPageHowWeDoIt;
