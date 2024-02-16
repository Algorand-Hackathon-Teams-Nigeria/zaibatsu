import React from "react";
import { Logo } from "@components/atoms";
import DAPP_NAVIGATION from "@constants/navigation/dapp";
import { Link, useLocation } from "@remix-run/react";
import { useRecoilValue } from "recoil";
import { navAtom } from "@stores/atoms";
import { useMediaQuery } from "@ui/hooks";
import { breakpoints } from "@ui/constants";

const SidebarNavigation = () => {
  const [active, setActive] = React.useState(0);
  const isOpen = useRecoilValue(navAtom);
  const isMobile = useMediaQuery(`(max-width: ${breakpoints.md})`);

  const location = useLocation();

  React.useEffect(() => {
    const activeNav = DAPP_NAVIGATION.find(
      (item) => item.path === location.pathname.replace("/dapp", "")
    );
    if (activeNav !== undefined) {
      setActive(DAPP_NAVIGATION.indexOf(activeNav));
    }
  }, [location]);

  return (
    <aside
      className={`md:relative transition-all top-14 fixed h-screen pl-14 bg-[#E9FCF5] ${
        isMobile && isOpen
          ? "translate-x-0"
          : isMobile && !isOpen
          ? "-translate-x-full"
          : ""
      }`}
    >
      <Logo className="absolute top-7 right-7 hidden md:block" />
      <div className=" mt-28">
        <ul className="flex flex-col bg-white">
          {DAPP_NAVIGATION.map((item, id) => (
            <div key={item.name} className="group transition-all">
              <div
                className={`h-5 w-full bg-[#E9FCF5] z-0 ${
                  active === id ? "rounded-br-3xl" : ""
                } top-[-12px] right-0`}
              />
              <Link
                className="z-0 relative flex bg-[#E9FCF5]"
                to={`/dapp${item.path}#`}
              >
                <span
                  className={`p-3 px-14 pr-16 rounded-l-3xl group-hover:text-primary/50 transition-all ${
                    active === id ? "bg-white text-primary" : "bg-[#E9FCF5]"
                  } w-full h-full`}
                >
                  {item.name}
                </span>
              </Link>
              <div
                className={`h-5 w-full bg-[#E9FCF5] z-0 ${
                  active === id ? "rounded-tr-3xl" : ""
                } top-[-12px] right-0`}
              />
            </div>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default SidebarNavigation;
