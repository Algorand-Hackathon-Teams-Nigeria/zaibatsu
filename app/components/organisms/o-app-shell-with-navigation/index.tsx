import { useMediaQuery } from "@ui/hooks";
import { SidebarNavigation, TopBar } from "@components/molecules";
import { breakpoints } from "@ui/constants";
import React from "react";

interface Props {
  children?: React.ReactNode;
}

const AppShellWithNavigation: React.FC<Props> = ({ children }) => {
  const isMobile = useMediaQuery(`(max-width: ${breakpoints.md})`);
  return (
    <div className="flex  bg-secondaryPool h-screen w-screen overflow-hidden">
      <SidebarNavigation />
      <div
        style={{ width: "calc(100vw - 262px)" }}
        className="flex flex-col w-full p-2 md:p-0 flex-1"
      >
        <TopBar />
        <main
          style={{
            height: isMobile ? "calc(100vh - 60px)" : "calc(100vh - 82px)",
          }}
          className=" p-2  h-screen w-full overflow-y-auto"
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppShellWithNavigation;
