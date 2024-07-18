import MdiLightChartBar from "~icons/mdi-light/chart-bar.jsx";
import HeroiconsUserGroup from "~icons/heroicons/user-group.jsx";
import RiP2pLine from "~icons/ri/p2p-line.jsx";
import FluentWalletCreditCard28Regular from "~icons/fluent/wallet-credit-card-28-regular.jsx";

export type NavType = {
  href: string;
  icon: JSX.Element;
  title: string;
};

const SIDEBAR_NAVS: readonly NavType[] = [
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
    href: "/p2p",
    title: "P2P",
    icon: <RiP2pLine />,
  },
  {
    href: "/loans",
    title: "Loans",
    icon: <FluentWalletCreditCard28Regular />,
  },
];

export default SIDEBAR_NAVS;
