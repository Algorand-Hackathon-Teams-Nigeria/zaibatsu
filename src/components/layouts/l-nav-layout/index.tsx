import Sidebar from "@molecules/m-sidebar";
import TopNav from "@molecules/m-top-nav";
import React from "react";

interface Props {
  children?: React.ReactNode;
}

const NavLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] ">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="flex flex-col">
        <TopNav />
        <div className="max-h-[95vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default NavLayout;
