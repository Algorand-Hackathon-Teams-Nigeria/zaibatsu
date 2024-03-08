import React from "react";
import { Logo } from "@components/atoms";
import NAVIGATION from "@/constants/navigation/dashboard";
import { Link, useLocation } from "@remix-run/react";
import { useRecoilValue } from "recoil";
import { navAtom } from "@stores/atoms";
import { useMediaQuery } from "@ui/hooks";
import { breakpoints } from "@ui/constants";
import { returnIcon } from "@/components/ui/icon";
const SidebarNavigation = () => {
  const [active, setActive] = React.useState(0);
  const isOpen = useRecoilValue(navAtom);
  const isMobile = useMediaQuery(`(max-width: ${breakpoints.md})`);

  const location = useLocation();

  React.useEffect(() => {
    const activeNav = NAVIGATION.find((item) => item.path === location.pathname.replace("/", ""));
    if (activeNav !== undefined) {
      setActive(NAVIGATION.indexOf(activeNav));
    }
  }, [location]);

  return (
    <aside
      className={`md:relative transition-all  z-10 fixed h-screen bg-secondaryPool shadow-lg ${
        isMobile && isOpen ? "translate-x-0" : isMobile && !isOpen ? "-translate-x-full" : ""
      }`}
    >
      <Logo className="relative top-[34px] mr-[82.71px] ml-10 hidden md:block" />
      <div className=" mt-28">
        <ul className="flex flex-col space-y-[14px]">
          {NAVIGATION.map((item, id) => (
            <div key={item.name} className="group  transition-all">
              <Link className={`z-0 relative flex ${active === id ? " bg-secondaryPool-foreground" : " "}`} to={`${item.path}#`}>
                <span
                  className={`p-3 px-[147px] pl-10  md:group-hover:text-primary/50 group-hover:text-white  text-lg leading-6 transition-all flex flex-row gap-[10px] ${
                    active === id ? " text-white" : "text-[#868b95]"
                  } w-full h-full`}
                >
                  {returnIcon(item.icon, "Broken")}
                  {item.name}
                </span>
              </Link>
            </div>
          ))}
        </ul>
        <div key={"logout button"} className="group  transition-all bottom-[37px] left-[17px] absolute rounded-lg">
          <Link className={`z-0 relative flex  bg-secondaryPool-foreground rounded-lg`} to={`/logout#`}>
            <span
              className={`px-[71px] py-[11.5px]  group-hover:text-primary/50 text-lg leading-6 transition-all text-white w-full h-full rounded-lg flex flex-row items-center`}
            >
              <div className={`w-6 h-6 text-white mr-2`}>{returnIcon("logout")}</div>
              Logout
            </span>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default SidebarNavigation;
/** <div
                className={`h-8 w-full bg-[#E9FCF5] z-0 top-[-12px] right-0`}
              /> */
