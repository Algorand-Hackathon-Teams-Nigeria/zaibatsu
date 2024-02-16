import { breakpoints } from "@/components/ui/constants";
import { useMediaQuery } from "@/components/ui/hooks";
import { Logo } from "@components/atoms";
import { Link } from "@remix-run/react";
import React from "react";
import { HiMenu } from "react-icons/hi";
import { CgClose } from "react-icons/cg";

const LandingPageNavigation = () => {
  const isLarge = useMediaQuery(`(min-width: ${breakpoints.md})`);
  const [open, setOpen] = React.useState(false);
  return (
    <div className="fixed z-[1000] bg-white right-0 top-0 w-screen p-4 md:p-0 md:px-8 flex flex-col justify-between md:flex-row transition-all">
      <div className="flex items-center justify-between flex-[0.5] lg:flex-[0.7] xl:flex-[0.7]">
        <Logo
          className="max-w-8 md:max-w-max"
          variant={isLarge ? "full" : "icon"}
        />
        <button
          onClick={() => setOpen((c) => !c)}
          aria-label="toggle navigation"
          type="button"
          className="md:hidden"
        >
          {open ? <CgClose size={24} /> : <HiMenu size={24} />}
        </button>
      </div>
      <nav
        data-open={open}
        className={`flex items-start md:items-center gap-8 md:py-5 flex-col md:flex-row bg-white justify-between overflow-hidden
          transition-all data-[open=true]:max-h-52 max-h-0 md:max-h-fit w-full flex-1`}
      >
        <ul className="flex flex-col md:flex-row items-start md:items-center gap-4 transition-all mt-4 md:mt-0">
          <Link className="hover:text-primary" to="#">
            Governance
          </Link>
          <Link className="hover:text-primary" to="#">
            Security
          </Link>
          <Link className="hover:text-primary" to="#">
            Docs
          </Link>
        </ul>
        <Link
          className="bg-primary text-white p-3 px-14 hover:bg-primary/70 whitespace-nowrap transition-all rounded-3xl"
          to="/dapp"
        >
          Launch App
        </Link>
      </nav>
    </div>
  );
};

export default LandingPageNavigation;
