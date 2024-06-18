import SolarHomeAngle2Broken from "~icons/solar/home-angle-2-broken.jsx";
import MdiLightChartBar from "~icons/mdi-light/chart-bar.jsx";
import PhHandCoinsLight from "~icons/ph/hand-coins-light.jsx";
import TdesignUndertake from "~icons/tdesign/undertake";
import HeroiconsUserGroup from "~icons/heroicons/user-group.jsx";
import RiP2pLine from "~icons/ri/p2p-line";
import IconoirProfileCircle from "~icons/iconoir/profile-circle";

export type NavType = {
  href: string;
  icon: JSX.Element;
  title: string;
};

const SIDEBAR_NAVS: readonly NavType[] = [
  {
    href: "/",
    icon: <SolarHomeAngle2Broken />,
    title: "Dashboard",
  },
  {
    href: "/pools",
    icon: <HeroiconsUserGroup />,
    title: "Pool",
  },
  {
    href: "/activities",
    title: "Activities",
    icon: <MdiLightChartBar />,
  },
  {
    href: "/lend",
    title: "Lend",
    icon: <PhHandCoinsLight />,
  },
  {
    href: "/borrow",
    title: "Pool",
    icon: <TdesignUndertake />,
  },
  {
    href: "/p2p",
    title: "P2P",
    icon: <RiP2pLine />,
  },
  {
    href: "/profile",
    title: "Profile",
    icon: <IconoirProfileCircle />,
  },
];

export default SIDEBAR_NAVS;
