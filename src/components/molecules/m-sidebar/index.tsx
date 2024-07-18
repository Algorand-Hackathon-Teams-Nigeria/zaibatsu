import SolarLogout2Broken from "~icons/solar/logout-2-broken.jsx";
import Image from "next/image";
import SIDEBAR_NAVS from "@/constants/navigations/sidebar";
import NavItem from "@/components/atoms/a-nav-item";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="md:shadow-[rgba(0,0,0,0.05)_7px_2px_7px] max-w-full h-full md:bg-muted/40">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="md:flex hidden h-14 items-center px-4 lg:h-[100px] lg:px-6">
          <Image
            src="/images/full-logo.svg"
            alt="Zaibatsu"
            width={132}
            height={37}
          />
        </div>
        <div className="mt-16 md:mt-0 flex-1 ">
          <nav className="grid items-start text-sm font-medium">
            {SIDEBAR_NAVS.map((nav) => (
              <NavItem nav={nav} key={nav.href} />
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Link
            href="/logout"
            className="w-full bg-primary/20 hover:bg-primary/40 transition-all py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2"
          >
            <SolarLogout2Broken />
            <span>Logout</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
