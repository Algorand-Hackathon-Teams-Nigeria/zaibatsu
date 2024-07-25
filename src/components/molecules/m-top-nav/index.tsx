import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ellipseAddress } from "@/lib/utils/text";
import sidebarAtom from "@/state/atoms/sidebarAtom";
import { useWallet } from "@txnlab/use-wallet";
import { useAtom } from "jotai";
import Image from "next/image";
import BxMenu from "~icons/bx/menu.jsx";
import ConnectWallet from "../m-connect-wallet";
import Sidebar from "../m-sidebar";

("use client");
const TopNav = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useAtom(sidebarAtom);
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  const { activeAddress } = useWallet();
  return (
    <header className="flex justify-between h-14 items-center gap-4 px-4 lg:h-[60px] lg:px-6">
      <div>
        <div className="flex md:hidden h-14 items-center px-4 lg:h-[100px] lg:px-6">
          <Image
            src="/images/full-logo.svg"
            alt="Zaibatsu"
            width={132}
            height={37}
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Sheet>
          <SheetTrigger>
            <Button variant={activeAddress ? "outline" : "default"}>
              {activeAddress
                ? ellipseAddress(activeAddress, 10)
                : "Connect Wallet"}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-screen lg:max-w-[500px]">
            <ConnectWallet />
          </SheetContent>
        </Sheet>
        <Sheet onOpenChange={closeSidebar} open={isSidebarOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <BxMenu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="flex max-w-[350px] px-0 flex-col"
          >
            <Sidebar onNavChange={closeSidebar} open={isSidebarOpen} />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
export default TopNav;
