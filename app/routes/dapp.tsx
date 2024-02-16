import { Outlet } from "@remix-run/react";
import { AppShellWithNavigation } from "@components/organisms";

const DappRoute = () => {
  return (
    <AppShellWithNavigation>
      <Outlet />
    </AppShellWithNavigation>
  );
};

export default DappRoute;
