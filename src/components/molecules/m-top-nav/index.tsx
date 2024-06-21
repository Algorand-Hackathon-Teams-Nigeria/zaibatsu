"use client";
import BxMenu from "~icons/bx/menu.jsx";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "../m-sidebar";
import Image from "next/image";
import ConnectWallet from "../m-connect-wallet";
import { useWallet } from "@txnlab/use-wallet";
import { ellipseAddress } from "@/lib/utils/address";

const TopNav = () => {
	const { activeAddress } = useWallet();
	return (
		<header className="flex justify-between h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
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
				<Sheet>
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
						<Sidebar />
					</SheetContent>
				</Sheet>
			</div>
		</header>
	);
};
export default TopNav;
