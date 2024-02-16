import React from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import { cn } from "@lib/utils";
import { Logo } from "@components/atoms";
import { ConnectWallet } from "@components/molecules";
import { useRecoilState } from "recoil";
import { navAtom } from "@stores/atoms";

interface Props {
  className?: string;
}
const TopBar: React.FC<Props> = ({ className }) => {
  const [navOpen, setNavOpen] = useRecoilState(navAtom);

  return (
    <nav
      className={cn(
        "py-3 p-2 flex w-full items-center justify-between",
        className
      )}
    >
      <div>
        <Logo className="md:hidden" />
      </div>
      <div className="flex items-center">
        <ConnectWallet />
        <button
          onClick={() => setNavOpen((curr) => !curr)}
          type="button"
          className="p-2 md:hidden"
        >
          {navOpen ? <IoClose size={26} /> : <IoMenu size={26} />}
        </button>
      </div>
    </nav>
  );
};

export default TopBar;
