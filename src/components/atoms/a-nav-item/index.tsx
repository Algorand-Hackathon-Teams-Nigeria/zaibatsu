"use client";
import { NavType } from "@constants/navigations/sidebar";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

interface Props {
  nav: NavType;
  onClick?: () => void;
}

const NavItem: React.FC<Props> = ({ nav, onClick }) => {
  const pathname = usePathname();
  console.log("current path name is: ", pathname);
  return (
    <Link
      onClick={onClick}
      title={nav.title}
      href={nav.href}
      className={`${pathname?.includes(nav.href) && "bg-primary/20"} active:bg-primary/30 focus:bg-primary/30 flex items-center gap-3 px-6 md:px-3 lg:px-6 py-4 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10`}
    >
      {nav.icon}
      <span>{nav.title}</span>
    </Link>
  );
};

export default NavItem;
