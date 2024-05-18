import React from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import { cn } from "@lib/utils";
import { Logo } from "@components/atoms";
import { ConnectWallet } from "@components/molecules";
import { useRecoilState } from "recoil";
import { navAtom } from "@stores/atoms";
import { returnIcon } from "@/components/ui/icon";

interface Props {
  className?: string;
}
const TopBar: React.FC<Props> = ({ className }) => {
  const [navOpen, setNavOpen] = useRecoilState(navAtom);
  const activeNotification = true;

  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", isDarkMode);
  };
  return (
    <nav className={cn("py-9 px-4 flex w-full items-center justify-between bg-secondaryPool ", className)}>
      <div>
        <Logo className="lg:hidden w-56 " />
      </div>
      <div className="flex justify-between w-full">
        <div className="flex items-center justify-end flex-row w-full ">
          <div className=" -mt-4 h-fit">
            <div className={`w-16 h-5 flex flex-row justify-end   text-white mr-6`}>
              {/**   <div className="relative" onClick={toggleDarkMode}>
              <div className={`dark:invisible visible absolute top-0`}>{returnIcon("sun")}</div>
              <div className={`dark:visible invisible absolute top-0 `}>{returnIcon("moon")}</div>
            </div> 

            <div className={`relative`}>
              {returnIcon("notification")}
              {activeNotification && (
                <div className={`w-[9.17px]  h-[9.17px] bg-[#f57600] border-2 border-white rounded-full absolute top-0 right-0`} />
              )}
            </div>
            */}
            </div>

            <ConnectWallet />
            <button onClick={() => setNavOpen((curr) => !curr)} type="button" className="p-2 lg:hidden">
              {navOpen ? <IoClose className="text-white" size={26} /> : <IoMenu className="text-white" size={26} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
