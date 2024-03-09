var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { jsxDEV } from "react/jsx-dev-runtime";
var ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsxDEV(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.tsx",
          lineNumber: 47,
          columnNumber: 7
        },
        this
      ),
      {
        onAllReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsxDEV(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.tsx",
          lineNumber: 97,
          columnNumber: 7
        },
        this
      ),
      {
        onShellReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links,
  loader: () => loader,
  meta: () => meta
});

// css-bundle-plugin-ns:@remix-run/css-bundle
var cssBundleHref = "/build/css-bundle-CM767J64.css";

// app/tailwind.css
var tailwind_default = "/build/_assets/tailwind-36GWO4HB.css";

// app/root.tsx
import { RecoilRoot } from "recoil";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, json, useLoaderData } from "@remix-run/react";

// app/providers/wallet/index.tsx
import algosdk from "algosdk";
import {
  WalletProvider,
  useInitializeProviders,
  PROVIDER_ID
} from "@txnlab/use-wallet";
import { DeflyWalletConnect } from "@blockshake/defly-connect";
import { PeraWalletConnect } from "@perawallet/connect";
import { DaffiWalletConnect } from "@daffiwallet/connect";
import { WalletConnectModalSign } from "@walletconnect/modal-sign-html";

// app/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function getEnv() {
  if (typeof window < "u")
    return window.ENV;
}
function getAlgodConfigFromEnvironment() {
  let env = getEnv();
  return {
    nodeServer: env?.ALGORAND_ALGOD_SERVER ?? "https://testnet-api.algonode.cloud",
    nodePort: env?.ALGORAND_ALGOD_PORT ?? "",
    nodeToken: env?.ALGORAND_ALGOD_TOKEN ?? "",
    network: env?.ALGORAND_ALGOD_NETWORK ?? "testnet"
  };
}

// app/providers/wallet/index.tsx
import { jsxDEV as jsxDEV2 } from "react/jsx-dev-runtime";
var Provider = ({ children }) => {
  let env = getEnv(), algoConfig = getAlgodConfigFromEnvironment(), providers = useInitializeProviders({
    providers: env?.ALGORAND_ALGOD_NETWORK === "" ? [{ id: PROVIDER_ID.KMD }] : [
      { id: PROVIDER_ID.DEFLY, clientStatic: DeflyWalletConnect },
      { id: PROVIDER_ID.PERA, clientStatic: PeraWalletConnect },
      { id: PROVIDER_ID.DAFFI, clientStatic: DaffiWalletConnect },
      {
        id: PROVIDER_ID.WALLETCONNECT,
        clientStatic: WalletConnectModalSign,
        clientOptions: {
          projectId: env?.WALLET_CONNECT_PROJECT_ID ?? "",
          metadata: {
            name: env?.WALLET_CONNECT_PROJECT_NAME ?? "",
            description: env?.WALLET_CONNECT_PROJECT_DESCRIPTION ?? "",
            url: env?.WALLET_CONNECT_PROJECT_URL ?? "",
            icons: [env?.WALLET_CONNECT_PROJECT_ICON_URL ?? ""]
          },
          modalOptions: env?.WALLET_CONNECT_PROJECT_THEME ?? "light"
        }
      },
      { id: PROVIDER_ID.EXODUS }
    ],
    nodeConfig: algoConfig,
    algosdkStatic: algosdk
  });
  return /* @__PURE__ */ jsxDEV2(WalletProvider, { value: providers, children }, void 0, !1, {
    fileName: "app/providers/wallet/index.tsx",
    lineNumber: 49,
    columnNumber: 10
  }, this);
}, wallet_default = Provider;

// app/components/ui/hooks/mediaQuery.ts
import React from "react";
var useMediaQuery = (query) => {
  let [matches, setMatches] = React.useState(!1);
  return React.useEffect(() => {
    let media = window.matchMedia(query);
    media.matches !== matches && setMatches(media.matches);
    let listener = () => setMatches(media.matches);
    return window.addEventListener("resize", listener), () => window.removeEventListener("resize", listener);
  }, [matches, query]), matches;
}, mediaQuery_default = useMediaQuery;

// app/components/molecules/m-top-bar/index.tsx
import React2 from "react";
import { IoMenu, IoClose } from "react-icons/io5";

// app/components/atoms/a-logo/index.tsx
import { Fragment, jsxDEV as jsxDEV3 } from "react/jsx-dev-runtime";
var Logo = ({ className, variant = "full" }) => /* @__PURE__ */ jsxDEV3(Fragment, { children: variant === "full" ? /* @__PURE__ */ jsxDEV3(
  "img",
  {
    className,
    src: "/assets/images/zaibatsu_logo.svg",
    alt: "Zaibatsu"
  },
  void 0,
  !1,
  {
    fileName: "app/components/atoms/a-logo/index.tsx",
    lineNumber: 12,
    columnNumber: 9
  },
  this
) : /* @__PURE__ */ jsxDEV3(
  "img",
  {
    className,
    src: "/assets/images/zaibatsu_icon.png",
    alt: "Zaibatsu"
  },
  void 0,
  !1,
  {
    fileName: "app/components/atoms/a-logo/index.tsx",
    lineNumber: 18,
    columnNumber: 9
  },
  this
) }, void 0, !1, {
  fileName: "app/components/atoms/a-logo/index.tsx",
  lineNumber: 10,
  columnNumber: 5
}, this), a_logo_default = Logo;

// app/components/atoms/a-wallet-provider/index.tsx
import { jsxDEV as jsxDEV4 } from "react/jsx-dev-runtime";
var WalletProvider2 = ({ provider, onClick }) => {
  let handleClick = () => {
    provider.connect(), onClick && onClick();
  };
  return /* @__PURE__ */ jsxDEV4(
    "button",
    {
      disabled: provider.isConnected,
      onClick: handleClick,
      className: "h-20 w-full xmd:h-autox flex xmd:flex-colx xmd:justify-centerx aspect-square items-center gap-6 xmd:gap-2x p-3 rounded-[5.76px] xmd:rounded-[30px]x font-medium bg-[#305030]/60 hover:bg-black/20  transition-all",
      children: [
        /* @__PURE__ */ jsxDEV4(
          "img",
          {
            className: "aspect-square h-full xmd:h-autox  max-w-40 rounded-full",
            src: provider.metadata.icon,
            alt: `${provider.metadata.name} icon`
          },
          void 0,
          !1,
          {
            fileName: "app/components/atoms/a-wallet-provider/index.tsx",
            lineNumber: 20,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ jsxDEV4("span", { className: "text-[17.28px]", children: provider.metadata.name }, void 0, !1, {
          fileName: "app/components/atoms/a-wallet-provider/index.tsx",
          lineNumber: 25,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/components/atoms/a-wallet-provider/index.tsx",
      lineNumber: 15,
      columnNumber: 5
    },
    this
  );
}, a_wallet_provider_default = WalletProvider2;

// app/components/atoms/a-wallet-address/index.tsx
import { BsCopy } from "react-icons/bs";
import { jsxDEV as jsxDEV5 } from "react/jsx-dev-runtime";
function truncateAddress(address) {
  return `${address.slice(0, 10)}...${address.slice(-10)}`;
}
var WalletAddress = ({ address, truncate, copyable }) => {
  let copyToClipboard = () => {
    navigator.clipboard && navigator.clipboard.writeText(address);
  };
  return /* @__PURE__ */ jsxDEV5("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ jsxDEV5("span", { children: truncate ? truncateAddress(address) : address }, void 0, !1, {
      fileName: "app/components/atoms/a-wallet-address/index.tsx",
      lineNumber: 22,
      columnNumber: 7
    }, this),
    copyable && /* @__PURE__ */ jsxDEV5(
      "button",
      {
        title: "Copy Address",
        className: "shadow p-1 hover:bg-black/10 transition-all rounded",
        onClick: copyToClipboard,
        type: "button",
        children: /* @__PURE__ */ jsxDEV5(BsCopy, { size: 24 }, void 0, !1, {
          fileName: "app/components/atoms/a-wallet-address/index.tsx",
          lineNumber: 30,
          columnNumber: 11
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/components/atoms/a-wallet-address/index.tsx",
        lineNumber: 24,
        columnNumber: 9
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/components/atoms/a-wallet-address/index.tsx",
    lineNumber: 21,
    columnNumber: 5
  }, this);
}, a_wallet_address_default = WalletAddress;

// app/components/molecules/m-top-bar/index.tsx
import { useRecoilState } from "recoil";

// app/stores/atoms/navAtom.ts
import { atom } from "recoil";

// app/stores/atoms/keys.ts
var ATOM_KEYS = {
  NAV_ATOM: "@navAtom"
};

// app/stores/atoms/navAtom.ts
var navAtom = atom({
  key: ATOM_KEYS.NAV_ATOM,
  default: !1
}), navAtom_default = navAtom;

// app/components/ui/icon.tsx
import {
  Home,
  Chart1,
  Wallet2,
  Moon,
  NotificationBing,
  LogoutCurve,
  Sun1,
  SearchNormal1
} from "iconsax-react";
import { jsxDEV as jsxDEV6 } from "react/jsx-dev-runtime";
function returnIcon(icon, variant) {
  let IconComponent = null;
  switch (icon.toLowerCase()) {
    case "home":
      IconComponent = Home;
      break;
    case "chart":
      IconComponent = Chart1;
      break;
    case "wallet":
      IconComponent = Wallet2;
      break;
    case "moon":
      IconComponent = Moon;
      break;
    case "notification":
      IconComponent = NotificationBing;
      break;
    case "logout":
      IconComponent = LogoutCurve;
      break;
    case "sun":
      IconComponent = Sun1;
      break;
    case "search":
      IconComponent = SearchNormal1;
      break;
    default:
      break;
  }
  return IconComponent && /* @__PURE__ */ jsxDEV6(IconComponent, { variant: variant || "Linear" }, void 0, !1, {
    fileName: "app/components/ui/icon.tsx",
    lineNumber: 48,
    columnNumber: 22
  }, this);
}

// app/components/molecules/m-top-bar/index.tsx
import { jsxDEV as jsxDEV7 } from "react/jsx-dev-runtime";
var TopBar = ({ className }) => {
  let [navOpen, setNavOpen] = useRecoilState(navAtom_default), activeNotification = !0, [isDarkMode, setIsDarkMode] = React2.useState(!1), toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode), document.documentElement.classList.toggle("dark", isDarkMode);
  };
  return /* @__PURE__ */ jsxDEV7(
    "nav",
    {
      className: cn(
        "py-9 px-4 flex w-full items-center justify-between bg-secondaryPool ",
        className
      ),
      children: [
        /* @__PURE__ */ jsxDEV7("div", { children: /* @__PURE__ */ jsxDEV7(a_logo_default, { className: "md:hidden" }, void 0, !1, {
          fileName: "app/components/molecules/m-top-bar/index.tsx",
          lineNumber: 31,
          columnNumber: 9
        }, this) }, void 0, !1, {
          fileName: "app/components/molecules/m-top-bar/index.tsx",
          lineNumber: 30,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV7("div", { className: "flex justify-between w-full", children: [
          /* @__PURE__ */ jsxDEV7(
            "div",
            {
              className: "w-[427px] h-[46px] bg-secondaryPool-foreground py-[15px] pl-[15px] text-sm leading-4 text-white rounded-[10px]",
              children: "\xA0\xA0\xA0\xA0 Search anything here"
            },
            void 0,
            !1,
            {
              fileName: "app/components/molecules/m-top-bar/index.tsx",
              lineNumber: 34,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ jsxDEV7("div", { className: "flex items-center flex-row ", children: [
            /* @__PURE__ */ jsxDEV7(
              "div",
              {
                className: "w-16 h-5 flex flex-row justify-between   text-white mr-6",
                children: [
                  /* @__PURE__ */ jsxDEV7("div", { className: "relative", onClick: toggleDarkMode, children: [
                    /* @__PURE__ */ jsxDEV7("div", { className: "dark:invisible visible absolute top-0", children: returnIcon("sun") }, void 0, !1, {
                      fileName: "app/components/molecules/m-top-bar/index.tsx",
                      lineNumber: 44,
                      columnNumber: 15
                    }, this),
                    /* @__PURE__ */ jsxDEV7("div", { className: "dark:visible invisible absolute top-0 ", children: returnIcon("moon") }, void 0, !1, {
                      fileName: "app/components/molecules/m-top-bar/index.tsx",
                      lineNumber: 47,
                      columnNumber: 15
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "app/components/molecules/m-top-bar/index.tsx",
                    lineNumber: 43,
                    columnNumber: 13
                  }, this),
                  /* @__PURE__ */ jsxDEV7("div", { className: "relative", children: [
                    returnIcon("notification"),
                    activeNotification && /* @__PURE__ */ jsxDEV7(
                      "div",
                      {
                        className: "w-[9.17px]  h-[9.17px] bg-[#f57600] border-2 border-white rounded-full absolute top-0 right-0"
                      },
                      void 0,
                      !1,
                      {
                        fileName: "app/components/molecules/m-top-bar/index.tsx",
                        lineNumber: 55,
                        columnNumber: 17
                      },
                      this
                    )
                  ] }, void 0, !0, {
                    fileName: "app/components/molecules/m-top-bar/index.tsx",
                    lineNumber: 52,
                    columnNumber: 13
                  }, this)
                ]
              },
              void 0,
              !0,
              {
                fileName: "app/components/molecules/m-top-bar/index.tsx",
                lineNumber: 40,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ jsxDEV7(m_connect_wallet_default, {}, void 0, !1, {
              fileName: "app/components/molecules/m-top-bar/index.tsx",
              lineNumber: 62,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV7(
              "button",
              {
                onClick: () => setNavOpen((curr) => !curr),
                type: "button",
                className: "p-2 md:hidden",
                children: navOpen ? /* @__PURE__ */ jsxDEV7(IoClose, { className: "text-white", size: 26 }, void 0, !1, {
                  fileName: "app/components/molecules/m-top-bar/index.tsx",
                  lineNumber: 69,
                  columnNumber: 15
                }, this) : /* @__PURE__ */ jsxDEV7(IoMenu, { className: "text-white", size: 26 }, void 0, !1, {
                  fileName: "app/components/molecules/m-top-bar/index.tsx",
                  lineNumber: 71,
                  columnNumber: 15
                }, this)
              },
              void 0,
              !1,
              {
                fileName: "app/components/molecules/m-top-bar/index.tsx",
                lineNumber: 63,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/components/molecules/m-top-bar/index.tsx",
            lineNumber: 39,
            columnNumber: 9
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/molecules/m-top-bar/index.tsx",
          lineNumber: 33,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/components/molecules/m-top-bar/index.tsx",
      lineNumber: 24,
      columnNumber: 5
    },
    this
  );
}, m_top_bar_default = TopBar;

// app/components/molecules/m-sidebar-navigation/index.tsx
import React3 from "react";

// app/constants/navigation/dashboard.ts
var NAVIGATION = [
  {
    name: "Pool",
    path: "pool",
    icon: "Home"
  },
  {
    name: "Activities",
    path: "activities",
    icon: "Chart"
  },
  {
    name: "Lend",
    path: "lend",
    icon: "Chart"
  },
  {
    name: "Borrow",
    path: "borrow",
    icon: "Chart"
  },
  {
    name: "Profile",
    path: "profile",
    icon: "Wallet"
  }
], dashboard_default = NAVIGATION;

// app/components/molecules/m-sidebar-navigation/index.tsx
import { Link, useLocation } from "@remix-run/react";
import { useRecoilValue } from "recoil";

// app/components/ui/constants/breakpoints.ts
var breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px"
}, breakpoints_default = breakpoints;

// app/components/molecules/m-sidebar-navigation/index.tsx
import { jsxDEV as jsxDEV8 } from "react/jsx-dev-runtime";
var SidebarNavigation = () => {
  let [active, setActive] = React3.useState(0), isOpen = useRecoilValue(navAtom_default), isMobile = mediaQuery_default(`(max-width: ${breakpoints_default.md})`), location = useLocation();
  return React3.useEffect(() => {
    let activeNav = dashboard_default.find((item) => item.path === location.pathname.replace("/", ""));
    activeNav !== void 0 && setActive(dashboard_default.indexOf(activeNav));
  }, [location]), /* @__PURE__ */ jsxDEV8(
    "aside",
    {
      className: `md:relative transition-all  z-10 fixed h-screen bg-secondaryPool shadow-lg ${isMobile && isOpen ? "translate-x-0" : isMobile && !isOpen ? "-translate-x-full" : ""}`,
      children: [
        /* @__PURE__ */ jsxDEV8(a_logo_default, { className: "relative top-[34px] mr-[82.71px] ml-10 hidden md:block" }, void 0, !1, {
          fileName: "app/components/molecules/m-sidebar-navigation/index.tsx",
          lineNumber: 30,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV8("div", { className: " mt-28", children: [
          /* @__PURE__ */ jsxDEV8("ul", { className: "flex flex-col space-y-[14px]", children: dashboard_default.map((item, id) => /* @__PURE__ */ jsxDEV8("div", { className: "group  transition-all", children: /* @__PURE__ */ jsxDEV8(Link, { className: `z-0 relative flex ${active === id ? " bg-secondaryPool-foreground" : " "}`, to: `${item.path}#`, children: /* @__PURE__ */ jsxDEV8(
            "span",
            {
              className: `p-3 px-[147px] pl-10  md:group-hover:text-primary/50 group-hover:text-white  text-lg leading-6 transition-all flex flex-row gap-[10px] ${active === id ? " text-white" : "text-[#868b95]"} w-full h-full`,
              children: [
                returnIcon(item.icon, "Broken"),
                item.name
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/components/molecules/m-sidebar-navigation/index.tsx",
              lineNumber: 36,
              columnNumber: 17
            },
            this
          ) }, void 0, !1, {
            fileName: "app/components/molecules/m-sidebar-navigation/index.tsx",
            lineNumber: 35,
            columnNumber: 15
          }, this) }, item.name, !1, {
            fileName: "app/components/molecules/m-sidebar-navigation/index.tsx",
            lineNumber: 34,
            columnNumber: 13
          }, this)) }, void 0, !1, {
            fileName: "app/components/molecules/m-sidebar-navigation/index.tsx",
            lineNumber: 32,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV8("div", { className: "group  transition-all bottom-[37px] left-[17px] absolute rounded-lg", children: /* @__PURE__ */ jsxDEV8(Link, { className: "z-0 relative flex  bg-secondaryPool-foreground rounded-lg", to: "/logout#", children: /* @__PURE__ */ jsxDEV8(
            "span",
            {
              className: "px-[71px] py-[11.5px]  group-hover:text-primary/50 text-lg leading-6 transition-all text-white w-full h-full rounded-lg flex flex-row items-center",
              children: [
                /* @__PURE__ */ jsxDEV8("div", { className: "w-6 h-6 text-white mr-2", children: returnIcon("logout") }, void 0, !1, {
                  fileName: "app/components/molecules/m-sidebar-navigation/index.tsx",
                  lineNumber: 53,
                  columnNumber: 15
                }, this),
                "Logout"
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/components/molecules/m-sidebar-navigation/index.tsx",
              lineNumber: 50,
              columnNumber: 13
            },
            this
          ) }, void 0, !1, {
            fileName: "app/components/molecules/m-sidebar-navigation/index.tsx",
            lineNumber: 49,
            columnNumber: 11
          }, this) }, "logout button", !1, {
            fileName: "app/components/molecules/m-sidebar-navigation/index.tsx",
            lineNumber: 48,
            columnNumber: 9
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/molecules/m-sidebar-navigation/index.tsx",
          lineNumber: 31,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/components/molecules/m-sidebar-navigation/index.tsx",
      lineNumber: 25,
      columnNumber: 5
    },
    this
  );
}, m_sidebar_navigation_default = SidebarNavigation;

// app/components/molecules/m-connect-wallet/index.tsx
import { useWallet } from "@txnlab/use-wallet";

// app/components/ui/button.tsx
import * as React4 from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { jsxDEV as jsxDEV9 } from "react/jsx-dev-runtime";
var buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-primary text-primary hover:bg-primary/80 hover:text-white bg-transparent shadow-sm",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        wallet: "bg-secondaryPool-foreground text-white shadow hover:bg-secondaryPool-foreground/90"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), Button = React4.forwardRef(
  ({ className, variant, size, asChild = !1, ...props }, ref) => /* @__PURE__ */ jsxDEV9(
    asChild ? Slot : "button",
    {
      className: cn(buttonVariants({ variant, size, className })),
      ref,
      ...props
    },
    void 0,
    !1,
    {
      fileName: "app/components/ui/button.tsx",
      lineNumber: 49,
      columnNumber: 7
    },
    this
  )
);
Button.displayName = "Button";

// app/components/ui/dialog.tsx
import * as React5 from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { jsxDEV as jsxDEV10 } from "react/jsx-dev-runtime";
var Dialog = DialogPrimitive.Root, DialogTrigger = DialogPrimitive.Trigger, DialogPortal = DialogPrimitive.Portal, DialogClose = DialogPrimitive.Close, DialogOverlay = React5.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV10(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/dialog.tsx",
    lineNumber: 20,
    columnNumber: 3
  },
  this
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
var DialogContent = React5.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxDEV10(DialogPortal, { children: [
  /* @__PURE__ */ jsxDEV10(DialogOverlay, {}, void 0, !1, {
    fileName: "app/components/ui/dialog.tsx",
    lineNumber: 36,
    columnNumber: 5
  }, this),
  /* @__PURE__ */ jsxDEV10(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-3xl",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxDEV10(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxDEV10(Cross2Icon, { className: "h-4 w-4" }, void 0, !1, {
            fileName: "app/components/ui/dialog.tsx",
            lineNumber: 47,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV10("span", { className: "sr-only", children: "Close" }, void 0, !1, {
            fileName: "app/components/ui/dialog.tsx",
            lineNumber: 48,
            columnNumber: 9
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/ui/dialog.tsx",
          lineNumber: 46,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/components/ui/dialog.tsx",
      lineNumber: 37,
      columnNumber: 5
    },
    this
  )
] }, void 0, !0, {
  fileName: "app/components/ui/dialog.tsx",
  lineNumber: 35,
  columnNumber: 3
}, this));
DialogContent.displayName = DialogPrimitive.Content.displayName;
var DialogHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxDEV10(
  "div",
  {
    className: cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/dialog.tsx",
    lineNumber: 59,
    columnNumber: 3
  },
  this
);
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxDEV10(
  "div",
  {
    className: cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/dialog.tsx",
    lineNumber: 73,
    columnNumber: 3
  },
  this
);
DialogFooter.displayName = "DialogFooter";
var DialogTitle = React5.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV10(
  DialogPrimitive.Title,
  {
    ref,
    className: cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/dialog.tsx",
    lineNumber: 87,
    columnNumber: 3
  },
  this
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
var DialogDescription = React5.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV10(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/dialog.tsx",
    lineNumber: 102,
    columnNumber: 3
  },
  this
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
var Component = {
  Root: Dialog,
  Portal: DialogPortal,
  Overlay: DialogOverlay,
  Trigger: DialogTrigger,
  Close: DialogClose,
  Content: DialogContent,
  Header: DialogHeader,
  Footer: DialogFooter,
  Title: DialogTitle,
  Description: DialogDescription
};

// app/components/molecules/m-connect-wallet/index.tsx
import React6 from "react";
import { Fragment as Fragment2, jsxDEV as jsxDEV11 } from "react/jsx-dev-runtime";
var ConnectWallet = () => {
  let [open, setOpen] = React6.useState(!1), { providers, activeAccount } = useWallet(), connectedProvider = providers?.find((provider) => provider.isActive);
  return /* @__PURE__ */ jsxDEV11(Component.Root, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxDEV11(Component.Trigger, { children: /* @__PURE__ */ jsxDEV11(
      Button,
      {
        variant: activeAccount ? "default" : "wallet",
        type: "button",
        className: activeAccount ? "bg-transparent" : "px-[42px] py-[11.5px]   text-[14px] leading-[30.25px] ",
        size: "lg",
        children: /* @__PURE__ */ jsxDEV11("div", { className: "flex flex-row items-center text-white", children: [
          /* @__PURE__ */ jsxDEV11(
            "div",
            {
              className: `w-6 h-6 text-white mr-2 flex items-center relative ${activeAccount && "w-[31px] h-[31px]"} `,
              children: activeAccount ? connectedProvider && /* @__PURE__ */ jsxDEV11(Fragment2, { children: [
                /* @__PURE__ */ jsxDEV11(
                  "img",
                  {
                    className: "rounded-full w-[31px] h-[31px] filter grayscale brightness-110",
                    src: "/assets/images/avataroverlaid.png",
                    alt: connectedProvider.metadata.name
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/components/molecules/m-connect-wallet/index.tsx",
                    lineNumber: 35,
                    columnNumber: 23
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV11("div", { className: "absolute inset-0 bg-secondaryPool-foreground  opacity-50 rounded-full " }, void 0, !1, {
                  fileName: "app/components/molecules/m-connect-wallet/index.tsx",
                  lineNumber: 41,
                  columnNumber: 25
                }, this)
              ] }, void 0, !0, {
                fileName: "app/components/molecules/m-connect-wallet/index.tsx",
                lineNumber: 34,
                columnNumber: 21
              }, this) : returnIcon("wallet")
            },
            void 0,
            !1,
            {
              fileName: "app/components/molecules/m-connect-wallet/index.tsx",
              lineNumber: 26,
              columnNumber: 13
            },
            this
          ),
          activeAccount ? /* @__PURE__ */ jsxDEV11(a_wallet_address_default, { address: activeAccount.address, truncate: !0 }, void 0, !1, {
            fileName: "app/components/molecules/m-connect-wallet/index.tsx",
            lineNumber: 47,
            columnNumber: 15
          }, this) : "Connect Wallet"
        ] }, void 0, !0, {
          fileName: "app/components/molecules/m-connect-wallet/index.tsx",
          lineNumber: 25,
          columnNumber: 11
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/components/molecules/m-connect-wallet/index.tsx",
        lineNumber: 15,
        columnNumber: 9
      },
      this
    ) }, void 0, !1, {
      fileName: "app/components/molecules/m-connect-wallet/index.tsx",
      lineNumber: 14,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV11(Component.Content, { className: "p-7 px-4 w-full md:max-w-[680px] md:px-16 overflow-y-auto max-w-[90vw] bg-[#00380f] border-none text-white", children: [
      /* @__PURE__ */ jsxDEV11(Component.Header, { className: "w-full flex flex-col items-center", children: [
        /* @__PURE__ */ jsxDEV11(Component.Title, { className: "py-4 flex items-center justify-center font-semibold text-lg leading-[150%]", children: activeAccount ? "Connected Wallet" : "Connect Wallet" }, void 0, !1, {
          fileName: "app/components/molecules/m-connect-wallet/index.tsx",
          lineNumber: 56,
          columnNumber: 11
        }, this),
        !activeAccount && /* @__PURE__ */ jsxDEV11(Component.Description, { className: "text-center md:max-w-[70%] flex items-center justify-center text-sm leading-[130%] text-white", children: "Connect to any supported wallet to securely store your cryptocurrencies" }, void 0, !1, {
          fileName: "app/components/molecules/m-connect-wallet/index.tsx",
          lineNumber: 60,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/molecules/m-connect-wallet/index.tsx",
        lineNumber: 55,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV11("div", { className: "flex flex-col w-full items-center mt-5", children: activeAccount ? /* @__PURE__ */ jsxDEV11("div", { className: "flex flex-col items-center gap-3", children: [
        /* @__PURE__ */ jsxDEV11("div", { className: "flex border rounded-lg p-1 items-center gap-4", children: [
          connectedProvider && /* @__PURE__ */ jsxDEV11(
            "img",
            {
              className: "w-7 h-7 rounded-md",
              src: connectedProvider.metadata.icon,
              alt: connectedProvider.metadata.name
            },
            void 0,
            !1,
            {
              fileName: "app/components/molecules/m-connect-wallet/index.tsx",
              lineNumber: 81,
              columnNumber: 19
            },
            this
          ),
          /* @__PURE__ */ jsxDEV11(
            a_wallet_address_default,
            {
              truncate: !0,
              copyable: !0,
              address: activeAccount.address
            },
            void 0,
            !1,
            {
              fileName: "app/components/molecules/m-connect-wallet/index.tsx",
              lineNumber: 87,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/components/molecules/m-connect-wallet/index.tsx",
          lineNumber: 79,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV11(
          Button,
          {
            onClick: () => {
              connectedProvider?.disconnect(), setOpen(!1);
            },
            variant: "destructive",
            type: "button",
            children: "Disconnect"
          },
          void 0,
          !1,
          {
            fileName: "app/components/molecules/m-connect-wallet/index.tsx",
            lineNumber: 93,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/components/molecules/m-connect-wallet/index.tsx",
        lineNumber: 78,
        columnNumber: 13
      }, this) : /* @__PURE__ */ jsxDEV11("ul", { className: "grid grid-cols-1 w-full  gap-14 gap-y-4 xmd:grid-cols-2x xmd:gap-y-7x", children: providers?.map((provider) => /* @__PURE__ */ jsxDEV11(
        a_wallet_provider_default,
        {
          onClick: () => setOpen(!1),
          provider
        },
        provider.metadata.id,
        !1,
        {
          fileName: "app/components/molecules/m-connect-wallet/index.tsx",
          lineNumber: 70,
          columnNumber: 17
        },
        this
      )) }, void 0, !1, {
        fileName: "app/components/molecules/m-connect-wallet/index.tsx",
        lineNumber: 68,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/components/molecules/m-connect-wallet/index.tsx",
        lineNumber: 66,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/molecules/m-connect-wallet/index.tsx",
      lineNumber: 54,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/molecules/m-connect-wallet/index.tsx",
    lineNumber: 13,
    columnNumber: 5
  }, this);
}, m_connect_wallet_default = ConnectWallet;

// app/components/organisms/o-app-shell-with-navigation/index.tsx
import { jsxDEV as jsxDEV12 } from "react/jsx-dev-runtime";
var AppShellWithNavigation = ({ children }) => {
  let isMobile = mediaQuery_default(`(max-width: ${breakpoints_default.md})`);
  return /* @__PURE__ */ jsxDEV12("div", { className: "flex  bg-secondaryPool h-screen w-screen overflow-hidden", children: [
    /* @__PURE__ */ jsxDEV12(m_sidebar_navigation_default, {}, void 0, !1, {
      fileName: "app/components/organisms/o-app-shell-with-navigation/index.tsx",
      lineNumber: 14,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV12(
      "div",
      {
        style: { width: "calc(100vw - 262px)" },
        className: "flex flex-col w-full p-2 md:p-0 flex-1",
        children: [
          /* @__PURE__ */ jsxDEV12(m_top_bar_default, {}, void 0, !1, {
            fileName: "app/components/organisms/o-app-shell-with-navigation/index.tsx",
            lineNumber: 19,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV12(
            "main",
            {
              style: {
                height: isMobile ? "calc(100vh - 60px)" : "calc(100vh - 82px)"
              },
              className: " p-2  h-screen w-full overflow-y-auto",
              children
            },
            void 0,
            !1,
            {
              fileName: "app/components/organisms/o-app-shell-with-navigation/index.tsx",
              lineNumber: 20,
              columnNumber: 9
            },
            this
          )
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/components/organisms/o-app-shell-with-navigation/index.tsx",
        lineNumber: 15,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/components/organisms/o-app-shell-with-navigation/index.tsx",
    lineNumber: 13,
    columnNumber: 5
  }, this);
}, o_app_shell_with_navigation_default = AppShellWithNavigation;

// app/providers/contract/index.tsx
import { createContext, useContext, useEffect, useState } from "react";

// app/services/contract/utils.ts
import algosdk2 from "algosdk";

// app/services/contract/service.ts
import * as algokit from "@algorandfoundation/algokit-utils";
import { AtomicTransactionComposer, modelsv2 } from "algosdk";
var APP_SPEC = {
  hints: {
    "create_zaibatsu_token()(string,string,uint64,uint64)": {
      structs: {
        output: {
          name: "Asset",
          elements: [
            [
              "key",
              "string"
            ],
            [
              "name",
              "string"
            ],
            [
              "asset_id",
              "uint64"
            ],
            [
              "total",
              "uint64"
            ]
          ]
        }
      },
      call_config: {
        no_op: "CALL"
      }
    },
    "fund_account_with_zuto(axfer,account,asset,uint64)(string,string,uint64,uint64)": {
      structs: {
        output: {
          name: "Asset",
          elements: [
            [
              "key",
              "string"
            ],
            [
              "name",
              "string"
            ],
            [
              "asset_id",
              "uint64"
            ],
            [
              "total",
              "uint64"
            ]
          ]
        }
      },
      call_config: {
        no_op: "CALL"
      }
    },
    "save_pool(pay,string,string)(string,string,address,uint64)": {
      structs: {
        output: {
          name: "Pool",
          elements: [
            [
              "key",
              "string"
            ],
            [
              "name",
              "string"
            ],
            [
              "manager",
              "address"
            ],
            [
              "date_created",
              "uint64"
            ]
          ]
        }
      },
      call_config: {
        no_op: "CALL"
      }
    },
    "lend_to_pool(axfer,string)(string,address,uint64,uint64,uint64)": {
      structs: {
        output: {
          name: "PoolContribution",
          elements: [
            [
              "key",
              "string"
            ],
            [
              "contributor",
              "address"
            ],
            [
              "asset_id",
              "uint64"
            ],
            [
              "amount",
              "uint64"
            ],
            [
              "last_update",
              "uint64"
            ]
          ]
        }
      },
      call_config: {
        no_op: "CALL"
      }
    }
  },
  source: {
    approval: "I3ByYWdtYSB2ZXJzaW9uIDgKaW50Y2Jsb2NrIDAgMSA0IDY1NTM2CmJ5dGVjYmxvY2sgMHggMHgxNTFmN2M3NSAweDcwNmY2ZjZjNWY2MzcyNjU2MTc0Njk2ZjZlNWY2NjY1NjUgMHgwMDA0NWE3NTc0NmYKdHhuIE51bUFwcEFyZ3MKaW50Y18wIC8vIDAKPT0KYm56IG1haW5fbDEwCnR4bmEgQXBwbGljYXRpb25BcmdzIDAKcHVzaGJ5dGVzIDB4YTQyYjUzOTEgLy8gImNyZWF0ZV96YWliYXRzdV90b2tlbigpKHN0cmluZyxzdHJpbmcsdWludDY0LHVpbnQ2NCkiCj09CmJueiBtYWluX2w5CnR4bmEgQXBwbGljYXRpb25BcmdzIDAKcHVzaGJ5dGVzIDB4NDZkNDBkOTEgLy8gImZ1bmRfYWNjb3VudF93aXRoX3p1dG8oYXhmZXIsYWNjb3VudCxhc3NldCx1aW50NjQpKHN0cmluZyxzdHJpbmcsdWludDY0LHVpbnQ2NCkiCj09CmJueiBtYWluX2w4CnR4bmEgQXBwbGljYXRpb25BcmdzIDAKcHVzaGJ5dGVzIDB4NjdjY2M2N2UgLy8gInNhdmVfcG9vbChwYXksc3RyaW5nLHN0cmluZykoc3RyaW5nLHN0cmluZyxhZGRyZXNzLHVpbnQ2NCkiCj09CmJueiBtYWluX2w3CnR4bmEgQXBwbGljYXRpb25BcmdzIDAKcHVzaGJ5dGVzIDB4ZDZkNDAwZTggLy8gImxlbmRfdG9fcG9vbChheGZlcixzdHJpbmcpKHN0cmluZyxhZGRyZXNzLHVpbnQ2NCx1aW50NjQsdWludDY0KSIKPT0KYm56IG1haW5fbDYKZXJyCm1haW5fbDY6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CmNhbGxzdWIgbGVuZHRvcG9vbGNhc3Rlcl8xNQppbnRjXzEgLy8gMQpyZXR1cm4KbWFpbl9sNzoKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQomJgphc3NlcnQKY2FsbHN1YiBzYXZlcG9vbGNhc3Rlcl8xMgppbnRjXzEgLy8gMQpyZXR1cm4KbWFpbl9sODoKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQomJgphc3NlcnQKY2FsbHN1YiBmdW5kYWNjb3VudHdpdGh6dXRvY2FzdGVyXzExCmludGNfMSAvLyAxCnJldHVybgptYWluX2w5Ogp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCiE9CiYmCmFzc2VydApjYWxsc3ViIGNyZWF0ZXphaWJhdHN1dG9rZW5jYXN0ZXJfNgppbnRjXzEgLy8gMQpyZXR1cm4KbWFpbl9sMTA6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KYm56IG1haW5fbDEyCmVycgptYWluX2wxMjoKdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKPT0KYXNzZXJ0CmNhbGxzdWIgY3JlYXRlXzAKaW50Y18xIC8vIDEKcmV0dXJuCgovLyBjcmVhdGUKY3JlYXRlXzA6CnByb3RvIDAgMApieXRlY18yIC8vICJwb29sX2NyZWF0aW9uX2ZlZSIKcHVzaGludCAxMDAwIC8vIDEwMDAKYXBwX2dsb2JhbF9wdXQKcmV0c3ViCgovLyBjcmVhdGVfemFpYmF0c3VfdG9rZW4KY3JlYXRlemFpYmF0c3V0b2tlbl8xOgpwcm90byAwIDEKYnl0ZWNfMCAvLyAiIgppbnRjXzAgLy8gMApieXRlY18wIC8vICIiCmR1cG4gMgppbnRjXzAgLy8gMApieXRlY18wIC8vICIiCnR4biBTZW5kZXIKZ2xvYmFsIENyZWF0b3JBZGRyZXNzCj09Ci8vIHVuYXV0aG9yaXplZAphc3NlcnQKcHVzaGludCAxMDAwMDAwMDAwMDAwMDAgLy8gMTAwMDAwMDAwMDAwMDAwCmZyYW1lX2J1cnkgMQpieXRlY18zIC8vIDB4MDAwNDVhNzU3NDZmCmZyYW1lX2J1cnkgMgpwdXNoYnl0ZXMgMHgwMDAzNWE1NTU0IC8vIDB4MDAwMzVhNTU1NApmcmFtZV9idXJ5IDMKcHVzaGJ5dGVzIDB4MDA1ZjY4NzQ3NDcwNzMzYTJmMmY3MjY1NzMyZTYzNmM2Zjc1NjQ2OTZlNjE3Mjc5MmU2MzZmNmQyZjY0NjU3NjJkNmQ2NTY0Njk2MTJmNjk2ZDYxNjc2NTJmNzU3MDZjNmY2MTY0MmY3NjMxMzczMDM3MzgzMzMzMzYzNDM4MmY3YTYxNjk2MjYxNzQ3Mzc1MmY2ZTYxNzc2MzZhNzM2NTczNjM3MTM0NjY2MjY4NzE3NDZiMzA3NTY0MmU3MDZlNjcgLy8gMHgwMDVmNjg3NDc0NzA3MzNhMmYyZjcyNjU3MzJlNjM2YzZmNzU2NDY5NmU2MTcyNzkyZTYzNmY2ZDJmNjQ2NTc2MmQ2ZDY1NjQ2OTYxMmY2OTZkNjE2NzY1MmY3NTcwNmM2ZjYxNjQyZjc2MzEzNzMwMzczODMzMzMzNjM0MzgyZjdhNjE2OTYyNjE3NDczNzUyZjZlNjE3NzYzNmE3MzY1NzM2MzcxMzQ2NjYyNjg3MTc0NmIzMDc1NjQyZTcwNmU2NwpmcmFtZV9idXJ5IDQKcHVzaGludCA2IC8vIDYKZnJhbWVfYnVyeSA1CnB1c2hieXRlcyAweDAwMjBmZDllNDZjMTYzZWVlZWEzOGVkY2YwM2I2YzJkOGQxOGQxNzU3NmM4YmQwYTJmMDYzYjMwZmUwZDYxOTg5YjEyIC8vIDB4MDAyMGZkOWU0NmMxNjNlZWVlYTM4ZWRjZjAzYjZjMmQ4ZDE4ZDE3NTc2YzhiZDBhMmYwNjNiMzBmZTBkNjE5ODliMTIKZnJhbWVfYnVyeSA2CmZyYW1lX2RpZyAyCmZyYW1lX2RpZyAxCmZyYW1lX2RpZyAyCmZyYW1lX2RpZyAzCmZyYW1lX2RpZyA0CmZyYW1lX2RpZyA1CmZyYW1lX2RpZyA2CmNhbGxzdWIgYm9vdHN0cmFwdG9rZW5fNQpmcmFtZV9kaWcgMgpleHRyYWN0IDIgMApib3hfZ2V0CnN0b3JlIDEKc3RvcmUgMApsb2FkIDEKYXNzZXJ0CmxvYWQgMApmcmFtZV9idXJ5IDAKcmV0c3ViCgovLyBmdW5kX2FjY291bnRfd2l0aF96dXRvCmZ1bmRhY2NvdW50d2l0aHp1dG9fMjoKcHJvdG8gNCAxCmJ5dGVjXzAgLy8gIiIKZHVwbiAyCmludGNfMCAvLyAwCmZyYW1lX2RpZyAtNApjYWxsc3ViIGVuc3VyZXhmZXJhc3NldGlzenV0b18xMApieXRlY18zIC8vIDB4MDAwNDVhNzU3NDZmCmZyYW1lX2J1cnkgMQpmcmFtZV9kaWcgMQpleHRyYWN0IDIgMApib3hfZ2V0CnN0b3JlIDUKc3RvcmUgNApsb2FkIDUKYXNzZXJ0CmxvYWQgNApmcmFtZV9idXJ5IDIKZnJhbWVfZGlnIDIKaW50Y18yIC8vIDQKZXh0cmFjdF91aW50NjQKZnJhbWVfYnVyeSAzCmZyYW1lX2RpZyAtMgp0eG5hcyBBc3NldHMKZnJhbWVfZGlnIDMKPT0KLy8gVGhlIGFzc2V0IHBhc3NlZCBpcyBub3QgenV0bwphc3NlcnQKZnJhbWVfZGlnIDEKZnJhbWVfZGlnIC0zCmZyYW1lX2RpZyAtMQpjYWxsc3ViIHNlbmRzdG9yZWRhc3NldF83CmZyYW1lX2RpZyAxCmV4dHJhY3QgMiAwCmJveF9nZXQKc3RvcmUgNwpzdG9yZSA2CmxvYWQgNwphc3NlcnQKbG9hZCA2CmZyYW1lX2J1cnkgMApyZXRzdWIKCi8vIHNhdmVfcG9vbApzYXZlcG9vbF8zOgpwcm90byAzIDEKYnl0ZWNfMCAvLyAiIgpkdXBuIDIKaW50Y18wIC8vIDAKYnl0ZWNfMCAvLyAiIgppbnRjXzAgLy8gMApkdXAKYnl0ZWNfMCAvLyAiIgpkdXAKZnJhbWVfZGlnIC0zCmd0eG5zIFNlbmRlcgpmcmFtZV9idXJ5IDIKZnJhbWVfZGlnIDIKbGVuCnB1c2hpbnQgMzIgLy8gMzIKPT0KYXNzZXJ0Cmdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKZnJhbWVfYnVyeSAzCmZyYW1lX2RpZyAtMgpleHRyYWN0IDIgMApib3hfbGVuCnN0b3JlIDE1CnN0b3JlIDE0CmxvYWQgMTUKYm56IHNhdmVwb29sXzNfbDIKZnJhbWVfZGlnIC0zCmd0eG5zIEFtb3VudApieXRlY18yIC8vICJwb29sX2NyZWF0aW9uX2ZlZSIKYXBwX2dsb2JhbF9nZXQKPT0KLy8gVHJhbnNhY3Rpb24gYW1vdW50IG11c3QgYmUgZXF1YWwgdG8gcG9vbCBjcmVhdGlvbiBmZWUKYXNzZXJ0CmZyYW1lX2RpZyAtMwpndHhucyBSZWNlaXZlcgpnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwo9PQovLyBUaGUgYXBwbGljYXRpb24gc2hvdWxkIGJlIHRoZSByZWNlaXZlciBvZiB0aGUgZmVlCmFzc2VydApiIHNhdmVwb29sXzNfbDMKc2F2ZXBvb2xfM19sMjoKZnJhbWVfZGlnIC0yCmV4dHJhY3QgMiAwCmJveF9nZXQKc3RvcmUgMTcKc3RvcmUgMTYKbG9hZCAxNwphc3NlcnQKbG9hZCAxNgpmcmFtZV9idXJ5IDEKZnJhbWVfZGlnIDEKZXh0cmFjdCA0IDMyCmZyYW1lX2J1cnkgNApmcmFtZV9kaWcgNApmcmFtZV9kaWcgMgo9PQovLyBPbmx5IHRoZSBtYW5hZ2VyIG9mIGEgcG9vbCBpcyBhbGxvd2VkIHRvIHVwZGF0ZSB0aGUgcG9vbAphc3NlcnQKc2F2ZXBvb2xfM19sMzoKZnJhbWVfZGlnIC0yCmZyYW1lX2J1cnkgOApmcmFtZV9kaWcgOApmcmFtZV9idXJ5IDcKcHVzaGludCA0NCAvLyA0NApmcmFtZV9idXJ5IDUKZnJhbWVfZGlnIDUKZnJhbWVfZGlnIDgKbGVuCisKZnJhbWVfYnVyeSA2CmZyYW1lX2RpZyA2CmludGNfMyAvLyA2NTUzNgo8CmFzc2VydApmcmFtZV9kaWcgNQppdG9iCmV4dHJhY3QgNiAwCmZyYW1lX2RpZyAtMQpmcmFtZV9idXJ5IDgKZnJhbWVfZGlnIDcKZnJhbWVfZGlnIDgKY29uY2F0CmZyYW1lX2J1cnkgNwpmcmFtZV9kaWcgNgpmcmFtZV9idXJ5IDUKZnJhbWVfZGlnIDUKaXRvYgpleHRyYWN0IDYgMApjb25jYXQKZnJhbWVfZGlnIDIKY29uY2F0CmZyYW1lX2RpZyAzCml0b2IKY29uY2F0CmZyYW1lX2RpZyA3CmNvbmNhdApmcmFtZV9idXJ5IDEKZnJhbWVfZGlnIC0yCmV4dHJhY3QgMiAwCmJveF9kZWwKcG9wCmZyYW1lX2RpZyAtMgpleHRyYWN0IDIgMApmcmFtZV9kaWcgMQpib3hfcHV0CmZyYW1lX2RpZyAtMgpleHRyYWN0IDIgMApib3hfZ2V0CnN0b3JlIDE5CnN0b3JlIDE4CmxvYWQgMTkKYXNzZXJ0CmxvYWQgMTgKZnJhbWVfYnVyeSAwCnJldHN1YgoKLy8gbGVuZF90b19wb29sCmxlbmR0b3Bvb2xfNDoKcHJvdG8gMiAxCmJ5dGVjXzAgLy8gIiIKZHVwCmZyYW1lX2RpZyAtMgpjYWxsc3ViIGVuc3VyZWFwcHJlY2VpdmVyXzgKZnJhbWVfZGlnIC0xCmV4dHJhY3QgMiAwCmJveF9sZW4Kc3RvcmUgMjEKc3RvcmUgMjAKbG9hZCAyMQpibnogbGVuZHRvcG9vbF80X2wyCmZyYW1lX2RpZyAtMQpmcmFtZV9kaWcgLTIKY2FsbHN1YiBuZXdjb250cmlidXRpb25fMTQKYiBsZW5kdG9wb29sXzRfbDMKbGVuZHRvcG9vbF80X2wyOgpwdXNoYnl0ZXMgMHgwMDA4Njk2ZTYzNzI2NTYxNzM2NSAvLyAweDAwMDg2OTZlNjM3MjY1NjE3MzY1CmZyYW1lX2J1cnkgMQpmcmFtZV9kaWcgLTEKZnJhbWVfZGlnIC0yCmZyYW1lX2RpZyAxCmNhbGxzdWIgdXBkYXRlY29udHJpYnV0aW9uc18xMwpsZW5kdG9wb29sXzRfbDM6CmZyYW1lX2RpZyAtMQpleHRyYWN0IDIgMApib3hfZ2V0CnN0b3JlIDIzCnN0b3JlIDIyCmxvYWQgMjMKYXNzZXJ0CmxvYWQgMjIKZnJhbWVfYnVyeSAwCnJldHN1YgoKLy8gYm9vdHN0cmFwX3Rva2VuCmJvb3RzdHJhcHRva2VuXzU6CnByb3RvIDcgMAppbnRjXzAgLy8gMApieXRlY18wIC8vICIiCmludGNfMCAvLyAwCmR1cApieXRlY18wIC8vICIiCmR1cApmcmFtZV9kaWcgLTcKZXh0cmFjdCAyIDAKYm94X2xlbgpzdG9yZSAzCnN0b3JlIDIKbG9hZCAzCiEKLy8gQW4gQXNzZXQgd2l0aCB0aGlzIGtleSBhbHJlYWR5IGV4aXN0cwphc3NlcnQKaXR4bl9iZWdpbgpwdXNoaW50IDMgLy8gYWNmZwppdHhuX2ZpZWxkIFR5cGVFbnVtCmZyYW1lX2RpZyAtNgppdHhuX2ZpZWxkIENvbmZpZ0Fzc2V0VG90YWwKZnJhbWVfZGlnIC01CmV4dHJhY3QgMiAwCml0eG5fZmllbGQgQ29uZmlnQXNzZXROYW1lCmZyYW1lX2RpZyAtNApleHRyYWN0IDIgMAppdHhuX2ZpZWxkIENvbmZpZ0Fzc2V0VW5pdE5hbWUKZnJhbWVfZGlnIC0zCmV4dHJhY3QgMiAwCml0eG5fZmllbGQgQ29uZmlnQXNzZXRVUkwKZnJhbWVfZGlnIC0yCml0eG5fZmllbGQgQ29uZmlnQXNzZXREZWNpbWFscwpmcmFtZV9kaWcgLTEKZXh0cmFjdCAyIDAKaXR4bl9maWVsZCBDb25maWdBc3NldE1ldGFkYXRhSGFzaApnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwppdHhuX2ZpZWxkIENvbmZpZ0Fzc2V0RnJlZXplCmdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCml0eG5fZmllbGQgQ29uZmlnQXNzZXRNYW5hZ2VyCmdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCml0eG5fZmllbGQgQ29uZmlnQXNzZXRSZXNlcnZlCmdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCml0eG5fZmllbGQgQ29uZmlnQXNzZXRDbGF3YmFjawppdHhuX3N1Ym1pdAppdHhuIENyZWF0ZWRBc3NldElECmZyYW1lX2J1cnkgMApmcmFtZV9kaWcgLTcKZnJhbWVfYnVyeSA1CmZyYW1lX2RpZyA1CmZyYW1lX2J1cnkgNApwdXNoaW50IDIwIC8vIDIwCmZyYW1lX2J1cnkgMgpmcmFtZV9kaWcgMgpmcmFtZV9kaWcgNQpsZW4KKwpmcmFtZV9idXJ5IDMKZnJhbWVfZGlnIDMKaW50Y18zIC8vIDY1NTM2CjwKYXNzZXJ0CmZyYW1lX2RpZyAyCml0b2IKZXh0cmFjdCA2IDAKZnJhbWVfZGlnIC01CmZyYW1lX2J1cnkgNQpmcmFtZV9kaWcgNApmcmFtZV9kaWcgNQpjb25jYXQKZnJhbWVfYnVyeSA0CmZyYW1lX2RpZyAzCmZyYW1lX2J1cnkgMgpmcmFtZV9kaWcgMgppdG9iCmV4dHJhY3QgNiAwCmNvbmNhdApmcmFtZV9kaWcgMAppdG9iCmNvbmNhdApmcmFtZV9kaWcgLTYKaXRvYgpjb25jYXQKZnJhbWVfZGlnIDQKY29uY2F0CmZyYW1lX2J1cnkgMQpmcmFtZV9kaWcgLTcKZXh0cmFjdCAyIDAKYm94X2RlbApwb3AKZnJhbWVfZGlnIC03CmV4dHJhY3QgMiAwCmZyYW1lX2RpZyAxCmJveF9wdXQKcmV0c3ViCgovLyBjcmVhdGVfemFpYmF0c3VfdG9rZW5fY2FzdGVyCmNyZWF0ZXphaWJhdHN1dG9rZW5jYXN0ZXJfNjoKcHJvdG8gMCAwCmJ5dGVjXzAgLy8gIiIKY2FsbHN1YiBjcmVhdGV6YWliYXRzdXRva2VuXzEKZnJhbWVfYnVyeSAwCmJ5dGVjXzEgLy8gMHgxNTFmN2M3NQpmcmFtZV9kaWcgMApjb25jYXQKbG9nCnJldHN1YgoKLy8gc2VuZF9zdG9yZWRfYXNzZXQKc2VuZHN0b3JlZGFzc2V0Xzc6CnByb3RvIDMgMApieXRlY18wIC8vICIiCmR1cAppbnRjXzAgLy8gMApkdXBuIDMKYnl0ZWNfMCAvLyAiIgpkdXAKZnJhbWVfZGlnIC0zCmNhbGxzdWIgZW5zdXJlc3RvcmVkYXNzZXRleGlzdHNfOQpmcmFtZV9kaWcgLTMKZXh0cmFjdCAyIDAKYm94X2dldApzdG9yZSA5CnN0b3JlIDgKbG9hZCA5CmFzc2VydApsb2FkIDgKZnJhbWVfYnVyeSAwCmZyYW1lX2RpZyAwCmZyYW1lX2RpZyAwCnB1c2hpbnQgMiAvLyAyCmV4dHJhY3RfdWludDE2CmRpZyAxCmxlbgpzdWJzdHJpbmczCmZyYW1lX2J1cnkgMQpmcmFtZV9kaWcgMAppbnRjXzIgLy8gNApleHRyYWN0X3VpbnQ2NApmcmFtZV9idXJ5IDIKZnJhbWVfZGlnIDAKcHVzaGludCAxMiAvLyAxMgpleHRyYWN0X3VpbnQ2NApmcmFtZV9idXJ5IDMKZnJhbWVfZGlnIDMKZnJhbWVfZGlnIC0xCj49Ci8vIFRoZSBhbW91bnQgYmVpbmcgc2VudCBjYW5ub3QgYmUgZ3JlYXRlciB0aGFuIHRoZSBhdmFpbGFibGUgYmFsYW5jZQphc3NlcnQKaXR4bl9iZWdpbgppbnRjXzIgLy8gYXhmZXIKaXR4bl9maWVsZCBUeXBlRW51bQpmcmFtZV9kaWcgLTEKaXR4bl9maWVsZCBBc3NldEFtb3VudApmcmFtZV9kaWcgLTIKdHhuYXMgQWNjb3VudHMKaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCmZyYW1lX2RpZyAyCml0eG5fZmllbGQgWGZlckFzc2V0Cml0eG5fc3VibWl0CmZyYW1lX2RpZyAzCmZyYW1lX2RpZyAtMQotCmZyYW1lX2J1cnkgMwpmcmFtZV9kaWcgLTMKZnJhbWVfYnVyeSA3CmZyYW1lX2RpZyA3CmZyYW1lX2J1cnkgNgpwdXNoaW50IDIwIC8vIDIwCmZyYW1lX2J1cnkgNApmcmFtZV9kaWcgNApmcmFtZV9kaWcgNwpsZW4KKwpmcmFtZV9idXJ5IDUKZnJhbWVfZGlnIDUKaW50Y18zIC8vIDY1NTM2CjwKYXNzZXJ0CmZyYW1lX2RpZyA0Cml0b2IKZXh0cmFjdCA2IDAKZnJhbWVfZGlnIDEKZnJhbWVfYnVyeSA3CmZyYW1lX2RpZyA2CmZyYW1lX2RpZyA3CmNvbmNhdApmcmFtZV9idXJ5IDYKZnJhbWVfZGlnIDUKZnJhbWVfYnVyeSA0CmZyYW1lX2RpZyA0Cml0b2IKZXh0cmFjdCA2IDAKY29uY2F0CmZyYW1lX2RpZyAyCml0b2IKY29uY2F0CmZyYW1lX2RpZyAzCml0b2IKY29uY2F0CmZyYW1lX2RpZyA2CmNvbmNhdApmcmFtZV9idXJ5IDAKZnJhbWVfZGlnIC0zCmV4dHJhY3QgMiAwCmJveF9kZWwKcG9wCmZyYW1lX2RpZyAtMwpleHRyYWN0IDIgMApmcmFtZV9kaWcgMApib3hfcHV0CnJldHN1YgoKLy8gZW5zdXJlX2FwcF9yZWNlaXZlcgplbnN1cmVhcHByZWNlaXZlcl84Ogpwcm90byAxIDAKZnJhbWVfZGlnIC0xCmd0eG5zIEFzc2V0UmVjZWl2ZXIKZ2xvYmFsIEN1cnJlbnRBcHBsaWNhdGlvbkFkZHJlc3MKPT0KLy8gVGhlIGFwcGxpY2F0aW9uIG11c3QgYmUgdGhlIHJlY2VpdmVyIG9mIHRoaXMgYXNzZXQKYXNzZXJ0CnJldHN1YgoKLy8gZW5zdXJlX3N0b3JlZF9hc3NldF9leGlzdHMKZW5zdXJlc3RvcmVkYXNzZXRleGlzdHNfOToKcHJvdG8gMSAwCmZyYW1lX2RpZyAtMQpleHRyYWN0IDIgMApib3hfbGVuCnN0b3JlIDExCnN0b3JlIDEwCmxvYWQgMTEKLy8gQW4gYXNzZXQgd2l0aCB0aGlzIGtleSBkb2VzIG5vdCBleGlzdHMKYXNzZXJ0CnJldHN1YgoKLy8gZW5zdXJlX3hmZXJfYXNzZXRfaXNfenV0bwplbnN1cmV4ZmVyYXNzZXRpc3p1dG9fMTA6CnByb3RvIDEgMApieXRlY18wIC8vICIiCmludGNfMCAvLyAwCnB1c2hieXRlcyAweDVhNzU3NDZmIC8vICJadXRvIgpib3hfZ2V0CnN0b3JlIDEzCnN0b3JlIDEyCmxvYWQgMTMKYXNzZXJ0CmxvYWQgMTIKZnJhbWVfYnVyeSAwCmZyYW1lX2RpZyAwCmludGNfMiAvLyA0CmV4dHJhY3RfdWludDY0CmZyYW1lX2J1cnkgMQpmcmFtZV9kaWcgLTEKZ3R4bnMgWGZlckFzc2V0CmZyYW1lX2RpZyAxCj09Ci8vIFRoZSBhc3NldCBtdXN0IGJlIHRoZSB6YWliYXRzdSB0b2tlbgphc3NlcnQKcmV0c3ViCgovLyBmdW5kX2FjY291bnRfd2l0aF96dXRvX2Nhc3RlcgpmdW5kYWNjb3VudHdpdGh6dXRvY2FzdGVyXzExOgpwcm90byAwIDAKYnl0ZWNfMCAvLyAiIgppbnRjXzAgLy8gMApkdXBuIDMKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQppbnRjXzAgLy8gMApnZXRieXRlCmZyYW1lX2J1cnkgMgp0eG5hIEFwcGxpY2F0aW9uQXJncyAyCmludGNfMCAvLyAwCmdldGJ5dGUKZnJhbWVfYnVyeSAzCnR4bmEgQXBwbGljYXRpb25BcmdzIDMKYnRvaQpmcmFtZV9idXJ5IDQKdHhuIEdyb3VwSW5kZXgKaW50Y18xIC8vIDEKLQpmcmFtZV9idXJ5IDEKZnJhbWVfZGlnIDEKZ3R4bnMgVHlwZUVudW0KaW50Y18yIC8vIGF4ZmVyCj09CmFzc2VydApmcmFtZV9kaWcgMQpmcmFtZV9kaWcgMgpmcmFtZV9kaWcgMwpmcmFtZV9kaWcgNApjYWxsc3ViIGZ1bmRhY2NvdW50d2l0aHp1dG9fMgpmcmFtZV9idXJ5IDAKYnl0ZWNfMSAvLyAweDE1MWY3Yzc1CmZyYW1lX2RpZyAwCmNvbmNhdApsb2cKcmV0c3ViCgovLyBzYXZlX3Bvb2xfY2FzdGVyCnNhdmVwb29sY2FzdGVyXzEyOgpwcm90byAwIDAKYnl0ZWNfMCAvLyAiIgppbnRjXzAgLy8gMApieXRlY18wIC8vICIiCmR1cAp0eG5hIEFwcGxpY2F0aW9uQXJncyAxCmZyYW1lX2J1cnkgMgp0eG5hIEFwcGxpY2F0aW9uQXJncyAyCmZyYW1lX2J1cnkgMwp0eG4gR3JvdXBJbmRleAppbnRjXzEgLy8gMQotCmZyYW1lX2J1cnkgMQpmcmFtZV9kaWcgMQpndHhucyBUeXBlRW51bQppbnRjXzEgLy8gcGF5Cj09CmFzc2VydApmcmFtZV9kaWcgMQpmcmFtZV9kaWcgMgpmcmFtZV9kaWcgMwpjYWxsc3ViIHNhdmVwb29sXzMKZnJhbWVfYnVyeSAwCmJ5dGVjXzEgLy8gMHgxNTFmN2M3NQpmcmFtZV9kaWcgMApjb25jYXQKbG9nCnJldHN1YgoKLy8gdXBkYXRlX2NvbnRyaWJ1dGlvbnMKdXBkYXRlY29udHJpYnV0aW9uc18xMzoKcHJvdG8gMyAwCmJ5dGVjXzAgLy8gIiIKZHVwbiAyCmludGNfMCAvLyAwCmR1cG4gNApieXRlY18wIC8vICIiCmR1cApmcmFtZV9kaWcgLTMKZXh0cmFjdCAyIDAKYm94X2dldApzdG9yZSAyNQpzdG9yZSAyNApsb2FkIDI1CmFzc2VydApsb2FkIDI0CmZyYW1lX2J1cnkgMApmcmFtZV9kaWcgMApmcmFtZV9kaWcgMAppbnRjXzAgLy8gMApleHRyYWN0X3VpbnQxNgpkaWcgMQpsZW4Kc3Vic3RyaW5nMwpmcmFtZV9idXJ5IDEKZnJhbWVfZGlnIDAKZXh0cmFjdCAyIDMyCmZyYW1lX2J1cnkgMgpmcmFtZV9kaWcgMApwdXNoaW50IDM0IC8vIDM0CmV4dHJhY3RfdWludDY0CmZyYW1lX2J1cnkgMwpmcmFtZV9kaWcgMApwdXNoaW50IDQyIC8vIDQyCmV4dHJhY3RfdWludDY0CmZyYW1lX2J1cnkgNApmcmFtZV9kaWcgMApwdXNoaW50IDUwIC8vIDUwCmV4dHJhY3RfdWludDY0CmZyYW1lX2J1cnkgNQpmcmFtZV9kaWcgLTEKZXh0cmFjdCAyIDAKcHVzaGJ5dGVzIDB4Njk2ZTYzNzI2NTYxNzM2NSAvLyAiaW5jcmVhc2UiCj09CmJueiB1cGRhdGVjb250cmlidXRpb25zXzEzX2wyCmZyYW1lX2RpZyA0CmZyYW1lX2RpZyAtMgpndHhucyBBc3NldEFtb3VudAotCmZyYW1lX2J1cnkgNApiIHVwZGF0ZWNvbnRyaWJ1dGlvbnNfMTNfbDMKdXBkYXRlY29udHJpYnV0aW9uc18xM19sMjoKZnJhbWVfZGlnIDQKZnJhbWVfZGlnIC0yCmd0eG5zIEFzc2V0QW1vdW50CisKZnJhbWVfYnVyeSA0CnVwZGF0ZWNvbnRyaWJ1dGlvbnNfMTNfbDM6Cmdsb2JhbCBMYXRlc3RUaW1lc3RhbXAKZnJhbWVfYnVyeSA1CmZyYW1lX2RpZyAxCmZyYW1lX2J1cnkgOQpmcmFtZV9kaWcgOQpmcmFtZV9idXJ5IDgKcHVzaGludCA1OCAvLyA1OApmcmFtZV9idXJ5IDYKZnJhbWVfZGlnIDYKaXRvYgpleHRyYWN0IDYgMApmcmFtZV9kaWcgMgpjb25jYXQKZnJhbWVfZGlnIDMKaXRvYgpjb25jYXQKZnJhbWVfZGlnIDQKaXRvYgpjb25jYXQKZnJhbWVfZGlnIDUKaXRvYgpjb25jYXQKZnJhbWVfZGlnIDgKY29uY2F0CmZyYW1lX2J1cnkgMApmcmFtZV9kaWcgMQpleHRyYWN0IDIgMApib3hfZGVsCnBvcApmcmFtZV9kaWcgMQpleHRyYWN0IDIgMApmcmFtZV9kaWcgMApib3hfcHV0CnJldHN1YgoKLy8gbmV3X2NvbnRyaWJ1dGlvbgpuZXdjb250cmlidXRpb25fMTQ6CnByb3RvIDIgMApieXRlY18wIC8vICIiCmludGNfMCAvLyAwCmR1cG4gMgpieXRlY18wIC8vICIiCmludGNfMCAvLyAwCmR1cApieXRlY18wIC8vICIiCmR1cApmcmFtZV9kaWcgLTEKZ3R4bnMgU2VuZGVyCmZyYW1lX2J1cnkgMApmcmFtZV9kaWcgMApsZW4KcHVzaGludCAzMiAvLyAzMgo9PQphc3NlcnQKZnJhbWVfZGlnIC0xCmd0eG5zIFhmZXJBc3NldApmcmFtZV9idXJ5IDEKZnJhbWVfZGlnIC0xCmd0eG5zIEFzc2V0QW1vdW50CmZyYW1lX2J1cnkgMgpnbG9iYWwgTGF0ZXN0VGltZXN0YW1wCmZyYW1lX2J1cnkgMwpmcmFtZV9kaWcgLTIKZnJhbWVfYnVyeSA4CmZyYW1lX2RpZyA4CmZyYW1lX2J1cnkgNwpwdXNoaW50IDU4IC8vIDU4CmZyYW1lX2J1cnkgNQpmcmFtZV9kaWcgNQppdG9iCmV4dHJhY3QgNiAwCmZyYW1lX2RpZyAwCmNvbmNhdApmcmFtZV9kaWcgMQppdG9iCmNvbmNhdApmcmFtZV9kaWcgMgppdG9iCmNvbmNhdApmcmFtZV9kaWcgMwppdG9iCmNvbmNhdApmcmFtZV9kaWcgNwpjb25jYXQKZnJhbWVfYnVyeSA0CmZyYW1lX2RpZyAtMgpleHRyYWN0IDIgMApib3hfZGVsCnBvcApmcmFtZV9kaWcgLTIKZXh0cmFjdCAyIDAKZnJhbWVfZGlnIDQKYm94X3B1dApyZXRzdWIKCi8vIGxlbmRfdG9fcG9vbF9jYXN0ZXIKbGVuZHRvcG9vbGNhc3Rlcl8xNToKcHJvdG8gMCAwCmJ5dGVjXzAgLy8gIiIKaW50Y18wIC8vIDAKYnl0ZWNfMCAvLyAiIgp0eG5hIEFwcGxpY2F0aW9uQXJncyAxCmZyYW1lX2J1cnkgMgp0eG4gR3JvdXBJbmRleAppbnRjXzEgLy8gMQotCmZyYW1lX2J1cnkgMQpmcmFtZV9kaWcgMQpndHhucyBUeXBlRW51bQppbnRjXzIgLy8gYXhmZXIKPT0KYXNzZXJ0CmZyYW1lX2RpZyAxCmZyYW1lX2RpZyAyCmNhbGxzdWIgbGVuZHRvcG9vbF80CmZyYW1lX2J1cnkgMApieXRlY18xIC8vIDB4MTUxZjdjNzUKZnJhbWVfZGlnIDAKY29uY2F0CmxvZwpyZXRzdWI=",
    clear: "I3ByYWdtYSB2ZXJzaW9uIDgKcHVzaGludCAwIC8vIDAKcmV0dXJu"
  },
  state: {
    global: {
      num_byte_slices: 0,
      num_uints: 1
    },
    local: {
      num_byte_slices: 0,
      num_uints: 0
    }
  },
  schema: {
    global: {
      declared: {
        pool_creation_fee: {
          type: "uint64",
          key: "pool_creation_fee",
          descr: ""
        }
      },
      reserved: {}
    },
    local: {
      declared: {},
      reserved: {}
    }
  },
  contract: {
    name: "Zaibatsu_Service",
    methods: [
      {
        name: "create_zaibatsu_token",
        args: [],
        returns: {
          type: "(string,string,uint64,uint64)"
        }
      },
      {
        name: "fund_account_with_zuto",
        args: [
          {
            type: "axfer",
            name: "opt_in_txn"
          },
          {
            type: "account",
            name: "receiver"
          },
          {
            type: "asset",
            name: "zuto"
          },
          {
            type: "uint64",
            name: "amt"
          }
        ],
        returns: {
          type: "(string,string,uint64,uint64)"
        }
      },
      {
        name: "save_pool",
        args: [
          {
            type: "pay",
            name: "txn"
          },
          {
            type: "string",
            name: "key"
          },
          {
            type: "string",
            name: "name"
          }
        ],
        returns: {
          type: "(string,string,address,uint64)"
        }
      },
      {
        name: "lend_to_pool",
        args: [
          {
            type: "axfer",
            name: "txn"
          },
          {
            type: "string",
            name: "contribution_key"
          }
        ],
        returns: {
          type: "(string,address,uint64,uint64,uint64)"
        }
      }
    ],
    networks: {}
  },
  bare_call_config: {
    no_op: "CREATE"
  }
};
function Asset([key, name, asset_id, total]) {
  return {
    key,
    name,
    asset_id,
    total
  };
}
function Pool([key, name, manager, date_created]) {
  return {
    key,
    name,
    manager,
    date_created
  };
}
function PoolContribution([key, contributor, asset_id, amount, last_update]) {
  return {
    key,
    contributor,
    asset_id,
    amount,
    last_update
  };
}
var ZaibatsuServiceCallFactory = class {
  /**
   * Gets available create call factories
   */
  static get create() {
    return {
      /**
       * Constructs a create call for the Zaibatsu_Service smart contract using a bare call
       *
       * @param params Any parameters for the call
       * @returns A TypedCallParams object for the call
       */
      bare(params = {}) {
        return {
          method: void 0,
          methodArgs: void 0,
          ...params
        };
      }
    };
  }
  /**
   * Constructs a no op call for the create_zaibatsu_token()(string,string,uint64,uint64) ABI method
   *
   * @param args Any args for the contract call
   * @param params Any additional parameters for the call
   * @returns A TypedCallParams object for the call
   */
  static createZaibatsuToken(args, params) {
    return {
      method: "create_zaibatsu_token()(string,string,uint64,uint64)",
      methodArgs: Array.isArray(args) ? args : [],
      ...params
    };
  }
  /**
   * Constructs a no op call for the fund_account_with_zuto(axfer,account,asset,uint64)(string,string,uint64,uint64) ABI method
   *
   * @param args Any args for the contract call
   * @param params Any additional parameters for the call
   * @returns A TypedCallParams object for the call
   */
  static fundAccountWithZuto(args, params) {
    return {
      method: "fund_account_with_zuto(axfer,account,asset,uint64)(string,string,uint64,uint64)",
      methodArgs: Array.isArray(args) ? args : [args.opt_in_txn, args.receiver, args.zuto, args.amt],
      ...params
    };
  }
  /**
   * Constructs a no op call for the save_pool(pay,string,string)(string,string,address,uint64) ABI method
   *
   * @param args Any args for the contract call
   * @param params Any additional parameters for the call
   * @returns A TypedCallParams object for the call
   */
  static savePool(args, params) {
    return {
      method: "save_pool(pay,string,string)(string,string,address,uint64)",
      methodArgs: Array.isArray(args) ? args : [args.txn, args.key, args.name],
      ...params
    };
  }
  /**
   * Constructs a no op call for the lend_to_pool(axfer,string)(string,address,uint64,uint64,uint64) ABI method
   *
   * @param args Any args for the contract call
   * @param params Any additional parameters for the call
   * @returns A TypedCallParams object for the call
   */
  static lendToPool(args, params) {
    return {
      method: "lend_to_pool(axfer,string)(string,address,uint64,uint64,uint64)",
      methodArgs: Array.isArray(args) ? args : [args.txn, args.contribution_key],
      ...params
    };
  }
}, ZaibatsuServiceClient = class {
  /**
   * Creates a new instance of `ZaibatsuServiceClient`
   *
   * @param appDetails appDetails The details to identify the app to deploy
   * @param algod An algod client instance
   */
  constructor(appDetails, algod) {
    this.algod = algod;
    this.sender = appDetails.sender, this.appClient = algokit.getAppClient({
      ...appDetails,
      app: APP_SPEC
    }, algod);
  }
  /**
   * The underlying `ApplicationClient` for when you want to have more flexibility
   */
  appClient;
  sender;
  /**
   * Checks for decode errors on the AppCallTransactionResult and maps the return value to the specified generic type
   *
   * @param result The AppCallTransactionResult to be mapped
   * @param returnValueFormatter An optional delegate to format the return value if required
   * @returns The smart contract response with an updated return value
   */
  mapReturnValue(result, returnValueFormatter) {
    if (result.return?.decodeError)
      throw result.return.decodeError;
    let returnValue = result.return?.returnValue !== void 0 && returnValueFormatter !== void 0 ? returnValueFormatter(result.return.returnValue) : result.return?.returnValue;
    return { ...result, return: returnValue };
  }
  /**
   * Calls the ABI method with the matching signature using an onCompletion code of NO_OP
   *
   * @param typedCallParams An object containing the method signature, args, and any other relevant parameters
   * @param returnValueFormatter An optional delegate which when provided will be used to map non-undefined return values to the target type
   * @returns The result of the smart contract call
   */
  async call(typedCallParams, returnValueFormatter) {
    return this.mapReturnValue(await this.appClient.call(typedCallParams), returnValueFormatter);
  }
  /**
   * Idempotently deploys the Zaibatsu_Service smart contract.
   *
   * @param params The arguments for the contract calls and any additional parameters for the call
   * @returns The deployment result
   */
  deploy(params = {}) {
    let createArgs = params.createCall?.(ZaibatsuServiceCallFactory.create);
    return this.appClient.deploy({
      ...params,
      createArgs,
      createOnCompleteAction: createArgs?.onCompleteAction
    });
  }
  /**
   * Gets available create methods
   */
  get create() {
    let $this = this;
    return {
      /**
       * Creates a new instance of the Zaibatsu_Service smart contract using a bare call.
       *
       * @param args The arguments for the bare call
       * @returns The create result
       */
      async bare(args = {}) {
        return $this.mapReturnValue(await $this.appClient.create(args));
      }
    };
  }
  /**
   * Makes a clear_state call to an existing instance of the Zaibatsu_Service smart contract.
   *
   * @param args The arguments for the bare call
   * @returns The clear_state result
   */
  clearState(args = {}) {
    return this.appClient.clearState(args);
  }
  /**
   * Calls the create_zaibatsu_token()(string,string,uint64,uint64) ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The result of the call
   */
  createZaibatsuToken(args, params = {}) {
    return this.call(ZaibatsuServiceCallFactory.createZaibatsuToken(args, params), Asset);
  }
  /**
   * Calls the fund_account_with_zuto(axfer,account,asset,uint64)(string,string,uint64,uint64) ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The result of the call
   */
  fundAccountWithZuto(args, params = {}) {
    return this.call(ZaibatsuServiceCallFactory.fundAccountWithZuto(args, params), Asset);
  }
  /**
   * Calls the save_pool(pay,string,string)(string,string,address,uint64) ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The result of the call
   */
  savePool(args, params = {}) {
    return this.call(ZaibatsuServiceCallFactory.savePool(args, params), Pool);
  }
  /**
   * Calls the lend_to_pool(axfer,string)(string,address,uint64,uint64,uint64) ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The result of the call
   */
  lendToPool(args, params = {}) {
    return this.call(ZaibatsuServiceCallFactory.lendToPool(args, params), PoolContribution);
  }
  /**
   * Extracts a binary state value out of an AppState dictionary
   *
   * @param state The state dictionary containing the state value
   * @param key The key of the state value
   * @returns A BinaryState instance containing the state value, or undefined if the key was not found
   */
  static getBinaryState(state, key) {
    let value = state[key];
    if (value) {
      if (!("valueRaw" in value))
        throw new Error(`Failed to parse state value for ${key}; received an int when expected a byte array`);
      return {
        asString() {
          return value.value;
        },
        asByteArray() {
          return value.valueRaw;
        }
      };
    }
  }
  /**
   * Extracts a integer state value out of an AppState dictionary
   *
   * @param state The state dictionary containing the state value
   * @param key The key of the state value
   * @returns An IntegerState instance containing the state value, or undefined if the key was not found
   */
  static getIntegerState(state, key) {
    let value = state[key];
    if (value) {
      if ("valueRaw" in value)
        throw new Error(`Failed to parse state value for ${key}; received a byte array when expected a number`);
      return {
        asBigInt() {
          return typeof value.value == "bigint" ? value.value : BigInt(value.value);
        },
        asNumber() {
          return typeof value.value == "bigint" ? Number(value.value) : value.value;
        }
      };
    }
  }
  /**
   * Returns the smart contract's global state wrapped in a strongly typed accessor with options to format the stored value
   */
  async getGlobalState() {
    let state = await this.appClient.getGlobalState();
    return {
      get pool_creation_fee() {
        return ZaibatsuServiceClient.getIntegerState(state, "pool_creation_fee");
      }
    };
  }
  compose() {
    let client2 = this, atc = new AtomicTransactionComposer(), promiseChain = Promise.resolve(), resultMappers = [];
    return {
      createZaibatsuToken(args, params) {
        return promiseChain = promiseChain.then(() => client2.createZaibatsuToken(args, { ...params, sendParams: { ...params?.sendParams, skipSending: !0, atc } })), resultMappers.push(Asset), this;
      },
      fundAccountWithZuto(args, params) {
        return promiseChain = promiseChain.then(() => client2.fundAccountWithZuto(args, { ...params, sendParams: { ...params?.sendParams, skipSending: !0, atc } })), resultMappers.push(Asset), this;
      },
      savePool(args, params) {
        return promiseChain = promiseChain.then(() => client2.savePool(args, { ...params, sendParams: { ...params?.sendParams, skipSending: !0, atc } })), resultMappers.push(Pool), this;
      },
      lendToPool(args, params) {
        return promiseChain = promiseChain.then(() => client2.lendToPool(args, { ...params, sendParams: { ...params?.sendParams, skipSending: !0, atc } })), resultMappers.push(PoolContribution), this;
      },
      clearState(args) {
        return promiseChain = promiseChain.then(() => client2.clearState({ ...args, sendParams: { ...args?.sendParams, skipSending: !0, atc } })), resultMappers.push(void 0), this;
      },
      addTransaction(txn, defaultSender) {
        return promiseChain = promiseChain.then(async () => atc.addTransaction(await algokit.getTransactionWithSigner(txn, defaultSender ?? client2.sender))), this;
      },
      async atc() {
        return await promiseChain, atc;
      },
      async simulate(options) {
        await promiseChain;
        let result = await atc.simulate(client2.algod, new modelsv2.SimulateRequest({ txnGroups: [], ...options }));
        return {
          ...result,
          returns: result.methodResults?.map((val, i) => resultMappers[i] !== void 0 ? resultMappers[i](val.returnValue) : val.returnValue)
        };
      },
      async execute(sendParams) {
        await promiseChain;
        let result = await algokit.sendAtomicTransactionComposer({ atc, sendParams }, client2.algod);
        return {
          ...result,
          returns: result.returns?.map((val, i) => resultMappers[i] !== void 0 ? resultMappers[i](val.returnValue) : val.returnValue)
        };
      }
    };
  }
};

// app/services/contract/utils.ts
var getAlgodClient = () => {
  let env = getEnv();
  return env?.ALGORAND_ALGOD_PORT, new algosdk2.Algodv2(env?.ALGORAND_ALGOD_TOKEN ?? "", env?.ALGORAND_ALGOD_SERVER ?? "", env?.ALGORAND_ALGOD_PORT ?? "");
}, createZaibatsuServiceClient = (sender) => {
  let env = getEnv(), client2 = getAlgodClient(), appDetails = {
    resolveBy: "id",
    id: Number(env?.ZAIBATSU_SERVICE_APPLICATION_ID),
    sender
  };
  return new ZaibatsuServiceClient(appDetails, client2);
};

// app/providers/contract/index.tsx
import { useWallet as useWallet2 } from "@txnlab/use-wallet";
import { jsxDEV as jsxDEV13 } from "react/jsx-dev-runtime";
var { activeAddress, signer } = useWallet2(), client = createZaibatsuServiceClient({ addr: activeAddress, signer }), ContractContext = createContext(null), useContract = () => {
  let context = useContext(ContractContext);
  if (!context)
    throw new Error("useContract must be used within a ContractProvider");
  return context;
}, ContractProvider = ({ children }) => {
  let { activeAddress: activeAddress2, signer: signer2 } = useWallet2(), [serviceClient, setServiceClient] = useState(null);
  return useEffect(() => {
    if (activeAddress2 && signer2) {
      let client2 = createZaibatsuServiceClient({ addr: activeAddress2, signer: signer2 });
      setServiceClient(client2);
    }
  }, [activeAddress2, signer2]), /* @__PURE__ */ jsxDEV13(ContractContext.Provider, { value: { serviceClient }, children }, void 0, !1, {
    fileName: "app/providers/contract/index.tsx",
    lineNumber: 34,
    columnNumber: 10
  }, this);
}, contract_default = ContractProvider;

// app/root.tsx
import { jsxDEV as jsxDEV14 } from "react/jsx-dev-runtime";
var links = () => [
  { rel: "stylesheet", href: tailwind_default },
  ...cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []
], meta = () => [
  { title: "Zaibatsu" },
  {
    name: "description",
    content: "Bridging the gap between decentralized and centralized currencies"
  }
];
async function loader() {
  return json({
    ENV: {
      ZAIBATSU_SERVICE_APPLICATION_ID: process.env.ZAIBATSU_SERVICE_APPLICATION_ID,
      WALLET_CONNECT_PROJECT_ID: process.env.WALLET_CONNECT_PROJECT_ID,
      WALLET_CONNECT_PROJECT_NAME: process.env.WALLET_CONNECT_PROJECT_NAME,
      WALLET_CONNECT_PROJECT_DESCRIPTION: process.env.WALLET_CONNECT_PROJECT_DESCRIPTION,
      WALLET_CONNECT_PROJECT_URL: process.env.WALLET_CONNECT_PROJECT_URL,
      WALLET_CONNECT_PROJECT_ICON_URL: process.env.WALLET_CONNECT_PROJECT_ICON_URL,
      WALLET_CONNECT_PROJECT_THEME: process.env.WALLET_CONNECT_PROJECT_THEME,
      ALGORAND_ENVIRONMENT: process.env.ALGORAND_ENVIRONMENT,
      ALGORAND_ALGOD_TOKEN: process.env.ALGORAND_ALGOD_TOKEN,
      ALGORAND_ALGOD_SERVER: process.env.ALGORAND_ALGOD_SERVER,
      ALGORAND_ALGOD_PORT: process.env.ALGORAND_ALGOD_PORT,
      ALGORAND_ALGOD_NETWORK: process.env.ALGORAND_ALGOD_NETWORK,
      ALGORAND_INDEXER_TOKEN: process.env.ALGORAND_INDEXER_TOKEN,
      ALGORAND_INDEXER_SERVER: process.env.ALGORAND_INDEXER_SERVER,
      ALGORAND_INDEXER_PORT: process.env.ALGORAND_INDEXER_PORT
    }
  });
}
function App() {
  let data2 = useLoaderData();
  return /* @__PURE__ */ jsxDEV14("html", { lang: "en", children: [
    /* @__PURE__ */ jsxDEV14("head", { children: [
      /* @__PURE__ */ jsxDEV14("meta", { charSet: "utf-8" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 55,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV14("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 56,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV14(Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 57,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV14(Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 58,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 54,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV14("body", { className: "font-inter", children: [
      /* @__PURE__ */ jsxDEV14(RecoilRoot, { children: /* @__PURE__ */ jsxDEV14(wallet_default, { children: [
        /* @__PURE__ */ jsxDEV14(
          "script",
          {
            dangerouslySetInnerHTML: {
              __html: `window.ENV= ${JSON.stringify(data2.ENV)}`
            }
          },
          void 0,
          !1,
          {
            fileName: "app/root.tsx",
            lineNumber: 63,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV14(contract_default, { children: /* @__PURE__ */ jsxDEV14(o_app_shell_with_navigation_default, { children: /* @__PURE__ */ jsxDEV14(Outlet, {}, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 71,
          columnNumber: 17
        }, this) }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 70,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 69,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/root.tsx",
        lineNumber: 62,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 61,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV14(ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 76,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV14(Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 77,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV14(LiveReload, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 78,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 60,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 53,
    columnNumber: 5
  }, this);
}

// app/routes/activities.tsx
var activities_exports = {};
__export(activities_exports, {
  default: () => activities_default
});
import { jsxDEV as jsxDEV15 } from "react/jsx-dev-runtime";
var ActivityPage = () => /* @__PURE__ */ jsxDEV15("div", { children: "Activity" }, void 0, !1, {
  fileName: "app/routes/activities.tsx",
  lineNumber: 2,
  columnNumber: 10
}, this), activities_default = ActivityPage;

// app/routes/activity.tsx
var activity_exports = {};
__export(activity_exports, {
  default: () => activity_default
});
import { jsxDEV as jsxDEV16 } from "react/jsx-dev-runtime";
var ActivityPage2 = () => /* @__PURE__ */ jsxDEV16("div", { children: "Activity" }, void 0, !1, {
  fileName: "app/routes/activity.tsx",
  lineNumber: 2,
  columnNumber: 10
}, this), activity_default = ActivityPage2;

// app/routes/profile.tsx
var profile_exports = {};
__export(profile_exports, {
  default: () => profile_default
});
import { jsxDEV as jsxDEV17 } from "react/jsx-dev-runtime";
var ProfilePage = () => /* @__PURE__ */ jsxDEV17("div", { children: "Profile" }, void 0, !1, {
  fileName: "app/routes/profile.tsx",
  lineNumber: 2,
  columnNumber: 10
}, this), profile_default = ProfilePage;

// app/routes/borrow.tsx
var borrow_exports = {};
__export(borrow_exports, {
  default: () => borrow_default
});

// app/components/molecules/m-lend/m-lend-header/index.tsx
import { jsxDEV as jsxDEV18 } from "react/jsx-dev-runtime";
var Lendheader = () => /* @__PURE__ */ jsxDEV18("div", { className: "flex flex-row  justify-between  mb-[16px] ", children: /* @__PURE__ */ jsxDEV18("div", { className: "text-2xl text-white p-6 py-[10px] ", children: "Lend" }, void 0, !1, {
  fileName: "app/components/molecules/m-lend/m-lend-header/index.tsx",
  lineNumber: 7,
  columnNumber: 7
}, this) }, void 0, !1, {
  fileName: "app/components/molecules/m-lend/m-lend-header/index.tsx",
  lineNumber: 6,
  columnNumber: 5
}, this), m_lend_header_default = Lendheader;

// app/routes/borrow.tsx
import { jsxDEV as jsxDEV19 } from "react/jsx-dev-runtime";
var BorrowPage = () => /* @__PURE__ */ jsxDEV19("div", { id: "lend page", className: "flex flex-col w-full  ml-[30px]  pr-[47px]", children: [
  /* @__PURE__ */ jsxDEV19(m_lend_header_default, {}, void 0, !1, {
    fileName: "app/routes/borrow.tsx",
    lineNumber: 5,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ jsxDEV19("div", { className: "mt-[62px]", children: /* @__PURE__ */ jsxDEV19(LoanForm, {}, void 0, !1, {
    fileName: "app/routes/borrow.tsx",
    lineNumber: 9,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/borrow.tsx",
    lineNumber: 6,
    columnNumber: 7
  }, this)
] }, void 0, !0, {
  fileName: "app/routes/borrow.tsx",
  lineNumber: 4,
  columnNumber: 5
}, this), borrow_default = BorrowPage, LoanForm = () => /* @__PURE__ */ jsxDEV19("div", { className: "flex h-screen", children: [
  /* @__PURE__ */ jsxDEV19("div", { className: "flex flex-col  items-start flex-grow p-6", children: [
    /* @__PURE__ */ jsxDEV19("div", { className: "mb-6 w-full", children: [
      /* @__PURE__ */ jsxDEV19("label", { className: "font-Aeonik font-regular text-[16px] leading-[160%]  text-white", children: "Asset to lend" }, void 0, !1, {
        fileName: "app/routes/borrow.tsx",
        lineNumber: 23,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV19("select", { className: "w-full h-12 rounded-lg mt-2 bg-secondaryPool-foreground" }, void 0, !1, {
        fileName: "app/routes/borrow.tsx",
        lineNumber: 24,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/borrow.tsx",
      lineNumber: 22,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV19("div", { className: "mb-6 w-full", children: [
      /* @__PURE__ */ jsxDEV19("label", { className: "font-Aeonik font-regular text-[16px] leading-[160%] mt-6 text-white", children: "Lend capacity" }, void 0, !1, {
        fileName: "app/routes/borrow.tsx",
        lineNumber: 27,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV19("input", { type: "text", className: "w-full h-12 border border-white rounded-lg mt-2 bg-secondaryPool-foreground" }, void 0, !1, {
        fileName: "app/routes/borrow.tsx",
        lineNumber: 28,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/borrow.tsx",
      lineNumber: 26,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV19("div", { className: "mb-6 w-full", children: [
      /* @__PURE__ */ jsxDEV19("label", { className: "font-Aeonik font-regular text-16 leading-[160%] mt-6 text-white", children: "Select Pool" }, void 0, !1, {
        fileName: "app/routes/borrow.tsx",
        lineNumber: 31,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV19("select", { className: "w-full h-12 rounded-lg bg-secondaryPool-foreground mt-4 mb-[86px]" }, void 0, !1, {
        fileName: "app/routes/borrow.tsx",
        lineNumber: 32,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/borrow.tsx",
      lineNumber: 30,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV19("button", { className: "w-full h-12 bg-primary text-white rounded-lg ", children: "Lend Loan" }, void 0, !1, {
      fileName: "app/routes/borrow.tsx",
      lineNumber: 34,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/borrow.tsx",
    lineNumber: 21,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ jsxDEV19("div", { className: "flex flex-col w-[38.94%] h-full ", children: [
    /* @__PURE__ */ jsxDEV19("label", { className: "font-Aeonik font-regular text-16 leading-[160%] mt-6 text-white", children: "Pending Loan" }, void 0, !1, {
      fileName: "app/routes/borrow.tsx",
      lineNumber: 38,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV19("div", { className: "flex flex-col justify-center items-center w-full  bg-[#0b300c] rounded-lg h-full mb-[39px] mt-2", children: /* @__PURE__ */ jsxDEV19("div", { className: "font-Aeonik font-regular text-16 leading-[160%] text-grey-5  ", children: "You are yet to lend." }, void 0, !1, {
      fileName: "app/routes/borrow.tsx",
      lineNumber: 40,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/borrow.tsx",
      lineNumber: 39,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/borrow.tsx",
    lineNumber: 37,
    columnNumber: 7
  }, this)
] }, void 0, !0, {
  fileName: "app/routes/borrow.tsx",
  lineNumber: 19,
  columnNumber: 5
}, this);

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => Index
});

// app/routes/pool.tsx
var pool_exports = {};
__export(pool_exports, {
  default: () => pool_default
});

// app/components/molecules/m-pool/m-pool-infobar/m-pool-infobar-infoitem/index.tsx
import { MdOutlineTrendingDown, MdOutlineTrendingUp } from "react-icons/md";
import { jsxDEV as jsxDEV20 } from "react/jsx-dev-runtime";
var Infoitem = ({
  label,
  value,
  icon,
  percentage,
  time
}) => /* @__PURE__ */ jsxDEV20(
  "div",
  {
    className: "flex flex-col w-[262px] h-[161px] p-4  bg-secondaryPool-foreground rounded-[14px]",
    children: [
      /* @__PURE__ */ jsxDEV20(
        "div",
        {
          className: "flex relative flex-row h-full justify-between",
          children: [
            /* @__PURE__ */ jsxDEV20("div", { className: "text-white font-bold space-y-4 ", children: [
              /* @__PURE__ */ jsxDEV20("div", { className: "text-base leading-[22px] text-[#B1BFB1]", children: [
                " ",
                label
              ] }, void 0, !0, {
                fileName: "app/components/molecules/m-pool/m-pool-infobar/m-pool-infobar-infoitem/index.tsx",
                lineNumber: 29,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ jsxDEV20("div", { className: "text-[28px] leading-[38px]", children: value }, void 0, !1, {
                fileName: "app/components/molecules/m-pool/m-pool-infobar/m-pool-infobar-infoitem/index.tsx",
                lineNumber: 34,
                columnNumber: 11
              }, this)
            ] }, void 0, !0, {
              fileName: "app/components/molecules/m-pool/m-pool-infobar/m-pool-infobar-infoitem/index.tsx",
              lineNumber: 28,
              columnNumber: 9
            }, this),
            icon && /* @__PURE__ */ jsxDEV20("div", { children: /* @__PURE__ */ jsxDEV20("button", { className: "flex p-4 mb--3 rounded-3xl bg-[#456346]  text-primary text-base leading-[26px] h-[fit-content] transition-transform transform-gpu hover:scale-105 active:scale-95 ", children: /* @__PURE__ */ jsxDEV20(
              "img",
              {
                className: " w-7 h-7 ",
                src: `/assets/images/${icon}`,
                alt: label
              },
              void 0,
              !1,
              {
                fileName: "app/components/molecules/m-pool/m-pool-infobar/m-pool-infobar-infoitem/index.tsx",
                lineNumber: 39,
                columnNumber: 15
              },
              this
            ) }, void 0, !1, {
              fileName: "app/components/molecules/m-pool/m-pool-infobar/m-pool-infobar-infoitem/index.tsx",
              lineNumber: 38,
              columnNumber: 13
            }, this) }, void 0, !1, {
              fileName: "app/components/molecules/m-pool/m-pool-infobar/m-pool-infobar-infoitem/index.tsx",
              lineNumber: 37,
              columnNumber: 11
            }, this)
          ]
        },
        "label",
        !0,
        {
          fileName: "app/components/molecules/m-pool/m-pool-infobar/m-pool-infobar-infoitem/index.tsx",
          lineNumber: 24,
          columnNumber: 7
        },
        this
      ),
      /* @__PURE__ */ jsxDEV20("div", { className: "flex flex-row text-white items-center", children: [
        /* @__PURE__ */ jsxDEV20(
          "div",
          {
            className: `w-6 h-6 text-green-600 text-2xl mr-2  ${!value && "text-[#F93C65]"}`,
            children: value ? /* @__PURE__ */ jsxDEV20(MdOutlineTrendingUp, {}, void 0, !1, {
              fileName: "app/components/molecules/m-pool/m-pool-infobar/m-pool-infobar-infoitem/index.tsx",
              lineNumber: 55,
              columnNumber: 20
            }, this) : /* @__PURE__ */ jsxDEV20(MdOutlineTrendingDown, {}, void 0, !1, {
              fileName: "app/components/molecules/m-pool/m-pool-infobar/m-pool-infobar-infoitem/index.tsx",
              lineNumber: 55,
              columnNumber: 46
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "app/components/molecules/m-pool/m-pool-infobar/m-pool-infobar-infoitem/index.tsx",
            lineNumber: 50,
            columnNumber: 9
          },
          this
        ),
        /* @__PURE__ */ jsxDEV20("span", { className: `text-green-600 ${!value && "text-[#F93C65]"}`, children: [
          " ",
          percentage,
          "%",
          " "
        ] }, void 0, !0, {
          fileName: "app/components/molecules/m-pool/m-pool-infobar/m-pool-infobar-infoitem/index.tsx",
          lineNumber: 57,
          columnNumber: 9
        }, this),
        "\xA0 Up from ",
        time
      ] }, void 0, !0, {
        fileName: "app/components/molecules/m-pool/m-pool-infobar/m-pool-infobar-infoitem/index.tsx",
        lineNumber: 49,
        columnNumber: 7
      }, this)
    ]
  },
  void 0,
  !0,
  {
    fileName: "app/components/molecules/m-pool/m-pool-infobar/m-pool-infobar-infoitem/index.tsx",
    lineNumber: 21,
    columnNumber: 5
  },
  this
), m_pool_infobar_infoitem_default = Infoitem;

// app/components/molecules/m-pool/m-pool-infobar/m-pool-infobar-view/index.tsx
import { jsxDEV as jsxDEV21 } from "react/jsx-dev-runtime";
var Infoview = ({ content }) => /* @__PURE__ */ jsxDEV21(
  "div",
  {
    className: "flex w-full flex-row md:flex-wrap xl:flex-nowrap md:gap-5 gap-3 md:pb-[52px] pb-[27px] overflow-x-scroll  justify-center sm:pl-[480px] pl-[560px] md:pl-[360px] lg:pl-0",
    style: { scrollbarWidth: "none" },
    children: content.map((item, index) => /* @__PURE__ */ jsxDEV21("div", { className: "flex-shrink-0  ", children: /* @__PURE__ */ jsxDEV21(
      m_pool_infobar_infoitem_default,
      {
        label: item.label,
        value: item.value,
        icon: item.icon,
        percentage: item.percentage,
        time: item.time
      },
      void 0,
      !1,
      {
        fileName: "app/components/molecules/m-pool/m-pool-infobar/m-pool-infobar-view/index.tsx",
        lineNumber: 18,
        columnNumber: 11
      },
      this
    ) }, item.label + index, !1, {
      fileName: "app/components/molecules/m-pool/m-pool-infobar/m-pool-infobar-view/index.tsx",
      lineNumber: 17,
      columnNumber: 9
    }, this))
  },
  void 0,
  !1,
  {
    fileName: "app/components/molecules/m-pool/m-pool-infobar/m-pool-infobar-view/index.tsx",
    lineNumber: 12,
    columnNumber: 5
  },
  this
), m_pool_infobar_view_default = Infoview;

// app/components/molecules/m-pool/m-pool-infobar/index.tsx
import { jsxDEV as jsxDEV22 } from "react/jsx-dev-runtime";
var Infobar = () => /* @__PURE__ */ jsxDEV22("div", { children: /* @__PURE__ */ jsxDEV22(m_pool_infobar_view_default, { content: [
  {
    label: "Total User",
    value: "60,000",
    icon: "people.svg",
    percentage: "8",
    time: "yesterday"
  },
  {
    label: "Total Supply",
    value: "0.00",
    icon: "cube.svg",
    percentage: "8",
    time: "yesterday"
  },
  {
    label: "Total Borrow",
    value: "0.00",
    icon: "chart.svg",
    percentage: "8",
    time: "yesterday"
  },
  {
    label: "Total Borrow",
    value: "0.00",
    icon: "history.svg",
    percentage: "8",
    time: "yesterday"
  }
] }, void 0, !1, {
  fileName: "app/components/molecules/m-pool/m-pool-infobar/index.tsx",
  lineNumber: 38,
  columnNumber: 7
}, this) }, void 0, !1, {
  fileName: "app/components/molecules/m-pool/m-pool-infobar/index.tsx",
  lineNumber: 37,
  columnNumber: 5
}, this), m_pool_infobar_default = Infobar;

// app/components/molecules/m-pool/m-pool-header-searchbar/index.tsx
import { jsxDEV as jsxDEV23 } from "react/jsx-dev-runtime";
var Poolheader = () => /* @__PURE__ */ jsxDEV23("div", { className: "flex flex-row  justify-between  mb-[16px] ", children: [
  /* @__PURE__ */ jsxDEV23("div", { className: "text-2xl  py-[10px]", children: "Pool" }, void 0, !1, {
    fileName: "app/components/molecules/m-pool/m-pool-header-searchbar/index.tsx",
    lineNumber: 7,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ jsxDEV23(
    "div",
    {
      className: "w-[427px] h-[46px] bg-secondaryPool-foreground py-[15px] pl-[15px] text-sm leading-4 text-white rounded-[10px]",
      children: "\xA0\xA0\xA0\xA0 Search anything here"
    },
    void 0,
    !1,
    {
      fileName: "app/components/molecules/m-pool/m-pool-header-searchbar/index.tsx",
      lineNumber: 8,
      columnNumber: 7
    },
    this
  )
] }, void 0, !0, {
  fileName: "app/components/molecules/m-pool/m-pool-header-searchbar/index.tsx",
  lineNumber: 6,
  columnNumber: 5
}, this), m_pool_header_searchbar_default = Poolheader;

// app/components/molecules/m-pool/m-pool-table/index.tsx
import { jsxDEV as jsxDEV24 } from "react/jsx-dev-runtime";
var data = [
  {
    poolName: "Crystal CoveCrystal Cove",
    assets: "asset12",
    totalSupplied: "1.27B",
    totalBorrowed: "34.99m",
    poolAPR: "10%",
    tenor: "3 months"
  },
  {
    poolName: "Crystal Cove",
    assets: "asset12",
    totalSupplied: "1.27B",
    totalBorrowed: "34.99m",
    poolAPR: "10%",
    tenor: "3 months"
  }
  // Add more data as needed
], TableView = ({ poolData }) => /* @__PURE__ */ jsxDEV24("table", { className: "w-full", children: [
  /* @__PURE__ */ jsxDEV24("thead", { className: "", children: /* @__PURE__ */ jsxDEV24("tr", { children: [
    /* @__PURE__ */ jsxDEV24("th", { className: "pr-4 py-[10px] max-w-[158.43px] text-left", children: "Pool name" }, void 0, !1, {
      fileName: "app/components/molecules/m-pool/m-pool-table/index.tsx",
      lineNumber: 29,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV24("th", { className: "pr-4 py-[10px] max-w-[158.43px] text-left", children: "Assets" }, void 0, !1, {
      fileName: "app/components/molecules/m-pool/m-pool-table/index.tsx",
      lineNumber: 30,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV24("th", { className: "pr-4 py-[10px] max-w-[158.43px] text-left", children: "Total supplied" }, void 0, !1, {
      fileName: "app/components/molecules/m-pool/m-pool-table/index.tsx",
      lineNumber: 31,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV24("th", { className: "pr-4 py-[10px] max-w-[158.43px] text-left", children: "Total borrowed" }, void 0, !1, {
      fileName: "app/components/molecules/m-pool/m-pool-table/index.tsx",
      lineNumber: 32,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV24("th", { className: "pr-4 py-[10px] max-w-[158.43px] text-left", children: "Pool APR" }, void 0, !1, {
      fileName: "app/components/molecules/m-pool/m-pool-table/index.tsx",
      lineNumber: 33,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV24("th", { className: "pr-4 py-[10px] max-w-[158.43px] text-left", children: "Tenor" }, void 0, !1, {
      fileName: "app/components/molecules/m-pool/m-pool-table/index.tsx",
      lineNumber: 34,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV24("th", { className: "pr-4 py-[10px] min-w-[158.44px] " }, void 0, !1, {
      fileName: "app/components/molecules/m-pool/m-pool-table/index.tsx",
      lineNumber: 35,
      columnNumber: 11
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/molecules/m-pool/m-pool-table/index.tsx",
    lineNumber: 28,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/components/molecules/m-pool/m-pool-table/index.tsx",
    lineNumber: 27,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ jsxDEV24("tbody", { children: poolData.map((item, index) => /* @__PURE__ */ jsxDEV24("tr", { children: [
    /* @__PURE__ */ jsxDEV24("td", { className: "pr-4 py-[11.15px] ", children: item.poolName }, void 0, !1, {
      fileName: "app/components/molecules/m-pool/m-pool-table/index.tsx",
      lineNumber: 41,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV24("td", { className: "pr-4 py-[11.15px] ", children: item.assets }, void 0, !1, {
      fileName: "app/components/molecules/m-pool/m-pool-table/index.tsx",
      lineNumber: 42,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV24("td", { className: "pr-4 py-[11.15px] ", children: item.totalSupplied }, void 0, !1, {
      fileName: "app/components/molecules/m-pool/m-pool-table/index.tsx",
      lineNumber: 43,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV24("td", { className: "pr-4 py-[11.15px] ", children: item.totalBorrowed }, void 0, !1, {
      fileName: "app/components/molecules/m-pool/m-pool-table/index.tsx",
      lineNumber: 44,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV24("td", { className: "pr-4 py-[11.15px] ", children: item.poolAPR }, void 0, !1, {
      fileName: "app/components/molecules/m-pool/m-pool-table/index.tsx",
      lineNumber: 45,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV24("td", { className: "pr-4 py-[11.15px] ", children: item.tenor }, void 0, !1, {
      fileName: "app/components/molecules/m-pool/m-pool-table/index.tsx",
      lineNumber: 46,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV24("td", { className: " py-[11.15px] flex items-center", children: [
      /* @__PURE__ */ jsxDEV24("button", { className: " mr-5 py-[11px] px-[6.61px]  bg-secondaryPool-foreground rounded-sm text-white", children: "Supply" }, void 0, !1, {
        fileName: "app/components/molecules/m-pool/m-pool-table/index.tsx",
        lineNumber: 48,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDEV24("button", { className: "py-[11px] px-[6.61px]  border-2 border-secondaryPool-foreground rounded-sm text-white ", children: "Borrow" }, void 0, !1, {
        fileName: "app/components/molecules/m-pool/m-pool-table/index.tsx",
        lineNumber: 49,
        columnNumber: 15
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/molecules/m-pool/m-pool-table/index.tsx",
      lineNumber: 47,
      columnNumber: 13
    }, this)
  ] }, index, !0, {
    fileName: "app/components/molecules/m-pool/m-pool-table/index.tsx",
    lineNumber: 40,
    columnNumber: 11
  }, this)) }, void 0, !1, {
    fileName: "app/components/molecules/m-pool/m-pool-table/index.tsx",
    lineNumber: 38,
    columnNumber: 7
  }, this)
] }, void 0, !0, {
  fileName: "app/components/molecules/m-pool/m-pool-table/index.tsx",
  lineNumber: 26,
  columnNumber: 5
}, this), Pooltable = () => /* @__PURE__ */ jsxDEV24("div", { className: "bg-transparent flex ", children: /* @__PURE__ */ jsxDEV24(TableView, { poolData: data }, void 0, !1, {
  fileName: "app/components/molecules/m-pool/m-pool-table/index.tsx",
  lineNumber: 61,
  columnNumber: 7
}, this) }, void 0, !1, {
  fileName: "app/components/molecules/m-pool/m-pool-table/index.tsx",
  lineNumber: 60,
  columnNumber: 5
}, this), m_pool_table_default = Pooltable;

// app/routes/pool.tsx
import { jsxDEV as jsxDEV25 } from "react/jsx-dev-runtime";
var PoolPage = () => {
  let { serviceClient } = useContract();
  return /* @__PURE__ */ jsxDEV25("div", { id: "pool page", className: "flex flex-col w-full  md:ml-[30px] md:pt-7 md:pr-[47px]  ml-[10px] pt-2 pr-[10px]", children: [
    /* @__PURE__ */ jsxDEV25(m_pool_infobar_default, {}, void 0, !1, {
      fileName: "app/routes/pool.tsx",
      lineNumber: 11,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV25("div", { children: [
      /* @__PURE__ */ jsxDEV25(m_pool_header_searchbar_default, {}, void 0, !1, {
        fileName: "app/routes/pool.tsx",
        lineNumber: 13,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV25(m_pool_table_default, {}, void 0, !1, {
        fileName: "app/routes/pool.tsx",
        lineNumber: 14,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/pool.tsx",
      lineNumber: 12,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/pool.tsx",
    lineNumber: 10,
    columnNumber: 5
  }, this);
}, pool_default = PoolPage;

// app/routes/_index.tsx
import { jsxDEV as jsxDEV26 } from "react/jsx-dev-runtime";
function Index() {
  return /* @__PURE__ */ jsxDEV26(pool_default, {}, void 0, !1, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 4,
    columnNumber: 10
  }, this);
}

// app/routes/lend.tsx
var lend_exports = {};
__export(lend_exports, {
  default: () => lend_default
});
import { jsxDEV as jsxDEV27 } from "react/jsx-dev-runtime";
var LendPage = () => /* @__PURE__ */ jsxDEV27("div", { id: "lend page", className: "flex flex-col w-full  ml-[30px]  pr-[47px]", children: [
  /* @__PURE__ */ jsxDEV27(m_lend_header_default, {}, void 0, !1, {
    fileName: "app/routes/lend.tsx",
    lineNumber: 5,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ jsxDEV27("div", { className: "mt-[62px]", children: /* @__PURE__ */ jsxDEV27(LoanForm2, {}, void 0, !1, {
    fileName: "app/routes/lend.tsx",
    lineNumber: 9,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/lend.tsx",
    lineNumber: 6,
    columnNumber: 7
  }, this)
] }, void 0, !0, {
  fileName: "app/routes/lend.tsx",
  lineNumber: 4,
  columnNumber: 5
}, this), lend_default = LendPage, LoanForm2 = () => /* @__PURE__ */ jsxDEV27("div", { className: "flex h-screen", children: [
  /* @__PURE__ */ jsxDEV27("div", { className: "flex flex-col  items-start flex-grow p-6", children: [
    /* @__PURE__ */ jsxDEV27("div", { className: "mb-6 w-full", children: [
      /* @__PURE__ */ jsxDEV27("label", { className: "font-Aeonik font-regular text-[16px] leading-[160%]  text-white", children: "Asset to lend" }, void 0, !1, {
        fileName: "app/routes/lend.tsx",
        lineNumber: 23,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV27("select", { className: "w-full h-12 rounded-lg mt-2 bg-secondaryPool-foreground" }, void 0, !1, {
        fileName: "app/routes/lend.tsx",
        lineNumber: 24,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/lend.tsx",
      lineNumber: 22,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV27("div", { className: "mb-6 w-full", children: [
      /* @__PURE__ */ jsxDEV27("label", { className: "font-Aeonik font-regular text-[16px] leading-[160%] mt-6 text-white", children: "Lend capacity" }, void 0, !1, {
        fileName: "app/routes/lend.tsx",
        lineNumber: 27,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV27("input", { type: "text", className: "w-full h-12 border border-white rounded-lg mt-2 bg-secondaryPool-foreground" }, void 0, !1, {
        fileName: "app/routes/lend.tsx",
        lineNumber: 28,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/lend.tsx",
      lineNumber: 26,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV27("div", { className: "mb-6 w-full", children: [
      /* @__PURE__ */ jsxDEV27("label", { className: "font-Aeonik font-regular text-16 leading-[160%] mt-6 text-white", children: "Select Pool" }, void 0, !1, {
        fileName: "app/routes/lend.tsx",
        lineNumber: 31,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV27("select", { className: "w-full h-12 rounded-lg bg-secondaryPool-foreground mt-4 mb-[86px]" }, void 0, !1, {
        fileName: "app/routes/lend.tsx",
        lineNumber: 32,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/lend.tsx",
      lineNumber: 30,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV27("button", { className: "w-full h-12 bg-primary text-white rounded-lg ", children: "Lend Loan" }, void 0, !1, {
      fileName: "app/routes/lend.tsx",
      lineNumber: 34,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/lend.tsx",
    lineNumber: 21,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ jsxDEV27("div", { className: "flex flex-col w-[38.94%] h-full ", children: [
    /* @__PURE__ */ jsxDEV27("label", { className: "font-Aeonik font-regular text-16 leading-[160%] mt-6 text-white", children: "Pending Loan" }, void 0, !1, {
      fileName: "app/routes/lend.tsx",
      lineNumber: 38,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV27("div", { className: "flex flex-col justify-center items-center w-full  bg-[#0b300c] rounded-lg h-full mb-[39px] mt-2", children: /* @__PURE__ */ jsxDEV27("div", { className: "font-Aeonik font-regular text-16 leading-[160%] text-grey-5  ", children: "You are yet to lend." }, void 0, !1, {
      fileName: "app/routes/lend.tsx",
      lineNumber: 40,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/lend.tsx",
      lineNumber: 39,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/lend.tsx",
    lineNumber: 37,
    columnNumber: 7
  }, this)
] }, void 0, !0, {
  fileName: "app/routes/lend.tsx",
  lineNumber: 19,
  columnNumber: 5
}, this);

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-MOSDU7QX.js", imports: ["/build/_shared/chunk-WRM53ZUV.js", "/build/_shared/chunk-BHQCQFCN.js", "/build/_shared/chunk-ATRQC2ZO.js", "/build/_shared/chunk-FGAZNT4N.js", "/build/_shared/chunk-PAEK5ACD.js", "/build/_shared/chunk-QJQJJ6FU.js", "/build/_shared/chunk-JM3EFX3L.js", "/build/_shared/chunk-MYHRZK7S.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-A6YW2STT.js", imports: ["/build/_shared/chunk-DMHNC7M5.js", "/build/_shared/chunk-DCEKC72K.js", "/build/_shared/chunk-7PSQEEMX.js", "/build/_shared/chunk-R5V3VJTO.js", "/build/_shared/chunk-73NW7KFA.js", "/build/_shared/chunk-JUPUTQ6K.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-5OHCDQMR.js", imports: ["/build/_shared/chunk-FX6VEMM6.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/activities": { id: "routes/activities", parentId: "root", path: "activities", index: void 0, caseSensitive: void 0, module: "/build/routes/activities-N4RJ4A4K.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/activity": { id: "routes/activity", parentId: "root", path: "activity", index: void 0, caseSensitive: void 0, module: "/build/routes/activity-4NPS74LF.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/borrow": { id: "routes/borrow", parentId: "root", path: "borrow", index: void 0, caseSensitive: void 0, module: "/build/routes/borrow-PU5JD47R.js", imports: ["/build/_shared/chunk-UE43ZWDY.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/lend": { id: "routes/lend", parentId: "root", path: "lend", index: void 0, caseSensitive: void 0, module: "/build/routes/lend-DA3XGAF5.js", imports: ["/build/_shared/chunk-UE43ZWDY.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/pool": { id: "routes/pool", parentId: "root", path: "pool", index: void 0, caseSensitive: void 0, module: "/build/routes/pool-VTZJHBAS.js", imports: ["/build/_shared/chunk-FX6VEMM6.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/profile": { id: "routes/profile", parentId: "root", path: "profile", index: void 0, caseSensitive: void 0, module: "/build/routes/profile-G7HGUNYE.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "9973f7ca", hmr: { runtime: "/build/_shared\\chunk-PAEK5ACD.js", timestamp: 1710010821780 }, url: "/build/manifest-9973F7CA.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "development", assetsBuildDirectory = "public\\build", future = { v3_fetcherPersist: !1, v3_relativeSplatPath: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/activities": {
    id: "routes/activities",
    parentId: "root",
    path: "activities",
    index: void 0,
    caseSensitive: void 0,
    module: activities_exports
  },
  "routes/activity": {
    id: "routes/activity",
    parentId: "root",
    path: "activity",
    index: void 0,
    caseSensitive: void 0,
    module: activity_exports
  },
  "routes/profile": {
    id: "routes/profile",
    parentId: "root",
    path: "profile",
    index: void 0,
    caseSensitive: void 0,
    module: profile_exports
  },
  "routes/borrow": {
    id: "routes/borrow",
    parentId: "root",
    path: "borrow",
    index: void 0,
    caseSensitive: void 0,
    module: borrow_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  },
  "routes/lend": {
    id: "routes/lend",
    parentId: "root",
    path: "lend",
    index: void 0,
    caseSensitive: void 0,
    module: lend_exports
  },
  "routes/pool": {
    id: "routes/pool",
    parentId: "root",
    path: "pool",
    index: void 0,
    caseSensitive: void 0,
    module: pool_exports
  }
};
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
};
//# sourceMappingURL=index.js.map
