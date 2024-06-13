import { NavType } from "@constants/navigations/sidebar";
import Link from "next/link";
import React from "react";

interface Props {
  nav: NavType;
}

const NavItem: React.FC<Props> = ({ nav }) => {
  return (
    <Link
      title={nav.title}
      href={nav.href}
      className="flex items-center gap-3 px-6 md:px-3 lg:px-6 py-4 text-muted-foreground transition-all hover:text-primary hover:bg-primary/10"
    >
      {nav.icon}
      <span>{nav.title}</span>
    </Link>
  );
};

export default NavItem;
