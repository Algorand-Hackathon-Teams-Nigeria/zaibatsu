import { GoLock } from "react-icons/go";
import { FaRegCheckCircle } from "react-icons/fa";

const LandingPageWhyChooseUs = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-44">
      <h3 className="font-bold text-3xl md:text-5xl text-primary">
        Why choose us?
      </h3>
      <div className="flex flex-col md:flex-row gap-16 md:gap-0 items-center flex-wrap justify-evenly md:px-10 w-full mt-10">
        <div className="border p-8 py-10 flex font-inter md:even:mt-20 flex-col gap-4 rounded-2xl max-w-[277px]">
          <GoLock className="text-primary" size={36} />
          <h4 className="font-bold text-2xl">
            Security <br /> Focused
          </h4>
          <p>
            With on-chain transactions and smart contracts, your money stays
            safe and accessible, every step of the way.
          </p>
        </div>
        <div className="border p-8 py-10 flex font-inter md:even:mt-20 flex-col gap-4 rounded-2xl max-w-[277px]">
          <FaRegCheckCircle className="text-primary" size={36} />
          <h4 className="font-bold text-2xl">
            Trans <br /> parent
          </h4>
          <p>
            All transactions on our platform are recorded on the blockchain, and
            fully visible to all users.
          </p>
        </div>
        <div className="border p-8 py-10 flex font-inter md:even:mt-20 flex-col gap-4 rounded-2xl max-w-[277px]">
          <img
            className="w-9 h-12"
            src="/assets/images/clipboard-badge.svg"
            alt="clipboard badge"
          />
          <h4 className="font-bold text-2xl">
            Access <br /> ible
          </h4>
          <p>
            Our platform is open to anyone with an internet connection,
            regardless of their location or credit history.
          </p>
        </div>
        <div className="border p-8 py-10 flex font-inter md:even:mt-20 flex-col gap-4 rounded-2xl max-w-[277px]">
          <img
            className="w-9 h-12"
            src="/assets/images/user-cycle.svg"
            alt="clipboard badge"
          />
          <h4 className="font-bold text-2xl">
            User <br /> Friendly
          </h4>
          <p>
            An easy-to-use interface that is simple enough for people of all
            technical backgrounds to use.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPageWhyChooseUs;
