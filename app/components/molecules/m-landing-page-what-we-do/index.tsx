import { PiHandCoinsLight } from "react-icons/pi";
import { MdOutlineCurrencyExchange } from "react-icons/md";

const LandingPageWhatWeDo = () => {
  return (
    <div
      id="what-we-do"
      className="flex flex-col gap-8 w-full items-center justify-center mt-40 md:mt-4"
    >
      <h3 className="font-medium text-3xl md:text-5xl">What we do</h3>
      <p className="text-center">
        Bridging the gap between decentralized and centralized currencies
      </p>
      <ul className="flex flex-col md:flex-row gap-12 items-center justify-evenly w-full">
        <div className="flex flex-col relative items-center justify-center gap-2">
          <div className="text-primary bg-primary/10 p-6 rounded-3xl">
            <PiHandCoinsLight size={52} />
          </div>
          <p className="font-medium text-xl">Borrow</p>
          <p className="max-w-[276px] text-center">
            Borrow at the interest rate and tenor that works for you
          </p>
          <img
            src="/assets/images/dark_wavy_line.svg"
            alt="wavy line"
            className="max-w-[250px] z-[-10] hidden xl:block absolute top-0 -right-[75%] self-start"
          />
        </div>
        <div className="flex flex-col relative items-center justify-center gap-2">
          <div className="text-primary bg-primary/10 p-6 rounded-3xl">
            <PiHandCoinsLight size={52} />
          </div>
          <p className="font-medium text-xl">Lend</p>
          <p className="max-w-[276px] text-center">
            Diversify your portfolio and lend to a wider range of borrowers
          </p>
          <img
            src="/assets/images/dark_wavy_line.svg"
            alt="wavy line"
            className="max-w-[250px] z-[-10] hidden xl:block absolute top-0 -right-[75%] self-start"
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="text-primary bg-primary/10 p-6 rounded-3xl">
            <MdOutlineCurrencyExchange size={52} />
          </div>
          <p className="font-medium text-xl">Convert</p>
          <p className="max-w-[276px] text-center">
            Diversify your portfolio and lend to a wider range of borrowers
          </p>
        </div>
      </ul>
    </div>
  );
};

export default LandingPageWhatWeDo;
