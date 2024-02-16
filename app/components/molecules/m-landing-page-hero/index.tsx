import { Link } from "@remix-run/react";

const LandingPageHero = () => {
  return (
    <div
      id="who-we-are"
      className="flex flex-col w-full mt-10 items-center justify-center"
    >
      <div className="md:p-14 md:py-28">
        <h1 className="text-center font-bold text-4xl md:text-6xl">
          Decentralized Finance: <br /> Earn interest & borrow assets
        </h1>
        <p className="mt-4 text-center">
          Zaibatsu provides a decentralized, zero-loss and competitive lending
          and borrowing platform for the common man.
        </p>
        <div className="flex w-full flex-col md:flex-row justify-center mt-10 items-center gap-6">
          <Link
            className="bg-primary p-3 px-14 rounded-3xl w-full max-w-52 flex items-center justify-center hover:bg-primary/70 transition-all text-white"
            to="#"
          >
            Lend
          </Link>
          <Link
            className="border border-primary p-3 px-14 w-full max-w-52 flex items-center justify-center hover:bg-primary/20 transition-all rounded-3xl text-green-600"
            to="#"
          >
            Borrow
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPageHero;
