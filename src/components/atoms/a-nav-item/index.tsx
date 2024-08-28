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
  return (
    <Link
      onClick={onClick}
      title={nav.title}
      href={nav.href}
      className={`${pathname?.includes(nav.href) && "bg-primary/10 border-l-2 border-white  text-white font-bold "} text-[#B0C5B0] active:bg-primary/30 focus:bg-primary/30 flex items-center gap-3 pl-10 md:px-3 lg:px-6 py-3  transition-all hover:text-primary hover:bg-primary/20`}
    >
      {nav.icon}
      <span>{nav.title}</span>
    </Link>
  );
};

export default NavItem;
