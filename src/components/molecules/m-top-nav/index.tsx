import Link from "next/link";
import {
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "../m-sidebar";
import Image from "next/image";

const TopNav = () => {
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
        <Button>Connect Wallet</Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
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
