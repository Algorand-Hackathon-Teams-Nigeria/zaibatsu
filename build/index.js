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
  loader: () => loader
});

// css-bundle-plugin-ns:@remix-run/css-bundle
var cssBundleHref = "/build/css-bundle-CM767J64.css";

// app/tailwind.css
var tailwind_default = "/build/_assets/tailwind-36GWO4HB.css";

// app/root.tsx
import { RecoilRoot } from "recoil";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData
} from "@remix-run/react";

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
      className: "h-20 w-full md:h-auto flex md:flex-col md:justify-center aspect-square items-center gap-4 md:gap-2 p-3 rounded-3xl md:rounded-[30px] font-medium hover:bg-black/20 transition-all",
      children: [
        /* @__PURE__ */ jsxDEV4(
          "img",
          {
            className: "aspect-square h-full md:h-auto max-w-40 rounded-full",
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
        /* @__PURE__ */ jsxDEV4("span", { className: "text-xl", children: provider.metadata.name }, void 0, !1, {
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

// app/root.tsx
import { jsxDEV as jsxDEV13 } from "react/jsx-dev-runtime";
var links = () => [
  { rel: "stylesheet", href: tailwind_default },
  ...cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []
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
  return /* @__PURE__ */ jsxDEV13("html", { lang: "en", children: [
    /* @__PURE__ */ jsxDEV13("head", { children: [
      /* @__PURE__ */ jsxDEV13("meta", { charSet: "utf-8" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 55,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV13("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 56,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV13(Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 57,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV13(Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 58,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 54,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV13("body", { className: "font-inter", children: [
      /* @__PURE__ */ jsxDEV13(RecoilRoot, { children: /* @__PURE__ */ jsxDEV13(wallet_default, { children: [
        /* @__PURE__ */ jsxDEV13(
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
        /* @__PURE__ */ jsxDEV13(o_app_shell_with_navigation_default, { children: /* @__PURE__ */ jsxDEV13(Outlet, {}, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 69,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 68,
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
      /* @__PURE__ */ jsxDEV13(ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 73,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV13(Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 74,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV13(LiveReload, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 75,
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
import { jsxDEV as jsxDEV14 } from "react/jsx-dev-runtime";
var ActivityPage = () => /* @__PURE__ */ jsxDEV14("div", { children: "Activity" }, void 0, !1, {
  fileName: "app/routes/activities.tsx",
  lineNumber: 2,
  columnNumber: 10
}, this), activities_default = ActivityPage;

// app/routes/activity.tsx
var activity_exports = {};
__export(activity_exports, {
  default: () => activity_default
});
import { jsxDEV as jsxDEV15 } from "react/jsx-dev-runtime";
var ActivityPage2 = () => /* @__PURE__ */ jsxDEV15("div", { children: "Activity" }, void 0, !1, {
  fileName: "app/routes/activity.tsx",
  lineNumber: 2,
  columnNumber: 10
}, this), activity_default = ActivityPage2;

// app/routes/profile.tsx
var profile_exports = {};
__export(profile_exports, {
  default: () => profile_default
});
import { jsxDEV as jsxDEV16 } from "react/jsx-dev-runtime";
var ProfilePage = () => /* @__PURE__ */ jsxDEV16("div", { children: "Profile" }, void 0, !1, {
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
import { jsxDEV as jsxDEV17 } from "react/jsx-dev-runtime";
var Lendheader = () => /* @__PURE__ */ jsxDEV17("div", { className: "flex flex-row  justify-between  mb-[16px] ", children: /* @__PURE__ */ jsxDEV17("div", { className: "text-2xl text-white p-6 py-[10px] ", children: "Lend" }, void 0, !1, {
  fileName: "app/components/molecules/m-lend/m-lend-header/index.tsx",
  lineNumber: 7,
  columnNumber: 7
}, this) }, void 0, !1, {
  fileName: "app/components/molecules/m-lend/m-lend-header/index.tsx",
  lineNumber: 6,
  columnNumber: 5
}, this), m_lend_header_default = Lendheader;

// app/routes/borrow.tsx
import { jsxDEV as jsxDEV18 } from "react/jsx-dev-runtime";
var BorrowPage = () => /* @__PURE__ */ jsxDEV18("div", { id: "lend page", className: "flex flex-col w-full  ml-[30px]  pr-[47px]", children: [
  /* @__PURE__ */ jsxDEV18(m_lend_header_default, {}, void 0, !1, {
    fileName: "app/routes/borrow.tsx",
    lineNumber: 5,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ jsxDEV18("div", { className: "mt-[62px]", children: /* @__PURE__ */ jsxDEV18(LoanForm, {}, void 0, !1, {
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
}, this), borrow_default = BorrowPage, LoanForm = () => /* @__PURE__ */ jsxDEV18("div", { className: "flex h-screen", children: [
  /* @__PURE__ */ jsxDEV18("div", { className: "flex flex-col  items-start flex-grow p-6", children: [
    /* @__PURE__ */ jsxDEV18("div", { className: "mb-6 w-full", children: [
      /* @__PURE__ */ jsxDEV18("label", { className: "font-Aeonik font-regular text-[16px] leading-[160%]  text-white", children: "Asset to lend" }, void 0, !1, {
        fileName: "app/routes/borrow.tsx",
        lineNumber: 23,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV18("select", { className: "w-full h-12 rounded-lg mt-2 bg-secondaryPool-foreground" }, void 0, !1, {
        fileName: "app/routes/borrow.tsx",
        lineNumber: 24,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/borrow.tsx",
      lineNumber: 22,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV18("div", { className: "mb-6 w-full", children: [
      /* @__PURE__ */ jsxDEV18("label", { className: "font-Aeonik font-regular text-[16px] leading-[160%] mt-6 text-white", children: "Lend capacity" }, void 0, !1, {
        fileName: "app/routes/borrow.tsx",
        lineNumber: 27,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV18("input", { type: "text", className: "w-full h-12 border border-white rounded-lg mt-2 bg-secondaryPool-foreground" }, void 0, !1, {
        fileName: "app/routes/borrow.tsx",
        lineNumber: 28,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/borrow.tsx",
      lineNumber: 26,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV18("div", { className: "mb-6 w-full", children: [
      /* @__PURE__ */ jsxDEV18("label", { className: "font-Aeonik font-regular text-16 leading-[160%] mt-6 text-white", children: "Select Pool" }, void 0, !1, {
        fileName: "app/routes/borrow.tsx",
        lineNumber: 31,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV18("select", { className: "w-full h-12 rounded-lg bg-secondaryPool-foreground mt-4 mb-[86px]" }, void 0, !1, {
        fileName: "app/routes/borrow.tsx",
        lineNumber: 32,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/borrow.tsx",
      lineNumber: 30,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV18("button", { className: "w-full h-12 bg-primary text-white rounded-lg ", children: "Lend Loan" }, void 0, !1, {
      fileName: "app/routes/borrow.tsx",
      lineNumber: 34,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/borrow.tsx",
    lineNumber: 21,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ jsxDEV18("div", { className: "flex flex-col w-[38.94%] h-full ", children: [
    /* @__PURE__ */ jsxDEV18("label", { className: "font-Aeonik font-regular text-16 leading-[160%] mt-6 text-white", children: "Pending Loan" }, void 0, !1, {
      fileName: "app/routes/borrow.tsx",
      lineNumber: 38,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV18("div", { className: "flex flex-col justify-center items-center w-full  bg-[#0b300c] rounded-lg h-full mb-[39px] mt-2", children: /* @__PURE__ */ jsxDEV18("div", { className: "font-Aeonik font-regular text-16 leading-[160%] text-grey-5  ", children: "You are yet to lend." }, void 0, !1, {
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
  default: () => Index,
  meta: () => meta
});

// app/routes/pool.tsx
var pool_exports = {};
__export(pool_exports, {
  default: () => pool_default
});

// app/components/molecules/m-pool/m-pool-infobar/m-pool-infobar-infoitem/index.tsx
import { MdOutlineTrendingDown, MdOutlineTrendingUp } from "react-icons/md";
import { jsxDEV as jsxDEV19 } from "react/jsx-dev-runtime";
var Infoitem = ({
  label,
  value,
  icon,
  percentage,
  time
}) => /* @__PURE__ */ jsxDEV19(
  "div",
  {
    className: "flex flex-col w-[262px] h-[161px] p-4  bg-secondaryPool-foreground rounded-[14px]",
    children: [
      /* @__PURE__ */ jsxDEV19(
        "div",
        {
          className: "flex relative flex-row h-full justify-between",
          children: [
            /* @__PURE__ */ jsxDEV19("div", { className: "text-white font-bold space-y-4 ", children: [
              /* @__PURE__ */ jsxDEV19("div", { className: "text-base leading-[22px] text-[#B1BFB1]", children: [
                " ",
                label
              ] }, void 0, !0, {
                fileName: "app/components/molecules/m-pool/m-pool-infobar/m-pool-infobar-infoitem/index.tsx",
                lineNumber: 29,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ jsxDEV19("div", { className: "text-[28px] leading-[38px]", children: value }, void 0, !1, {
                fileName: "app/components/molecules/m-pool/m-pool-infobar/m-pool-infobar-infoitem/index.tsx",
                lineNumber: 34,
                columnNumber: 11
              }, this)
            ] }, void 0, !0, {
              fileName: "app/components/molecules/m-pool/m-pool-infobar/m-pool-infobar-infoitem/index.tsx",
              lineNumber: 28,
              columnNumber: 9
            }, this),
            icon && /* @__PURE__ */ jsxDEV19("div", { children: /* @__PURE__ */ jsxDEV19("button", { className: "flex p-4 mb--3 rounded-3xl bg-[#456346]  text-primary text-base leading-[26px] h-[fit-content] transition-transform transform-gpu hover:scale-105 active:scale-95 ", children: /* @__PURE__ */ jsxDEV19(
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
      /* @__PURE__ */ jsxDEV19("div", { className: "flex flex-row text-white items-center", children: [
        /* @__PURE__ */ jsxDEV19(
          "div",
          {
            className: `w-6 h-6 text-green-600 text-2xl mr-2  ${!value && "text-[#F93C65]"}`,
            children: value ? /* @__PURE__ */ jsxDEV19(MdOutlineTrendingUp, {}, void 0, !1, {
              fileName: "app/components/molecules/m-pool/m-pool-infobar/m-pool-infobar-infoitem/index.tsx",
              lineNumber: 55,
              columnNumber: 20
            }, this) : /* @__PURE__ */ jsxDEV19(MdOutlineTrendingDown, {}, void 0, !1, {
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
        /* @__PURE__ */ jsxDEV19("span", { className: `text-green-600 ${!value && "text-[#F93C65]"}`, children: [
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
import { jsxDEV as jsxDEV20 } from "react/jsx-dev-runtime";
var Infoview = ({ content }) => /* @__PURE__ */ jsxDEV20(
  "div",
  {
    className: "flex w-full flex-row md:flex-wrap xl:flex-nowrap md:gap-5 gap-3 md:pb-[52px] pb-[27px] overflow-x-scroll  justify-center sm:pl-[480px] pl-[560px] md:pl-[360px] lg:pl-0",
    style: { scrollbarWidth: "none" },
    children: content.map((item, index) => /* @__PURE__ */ jsxDEV20("div", { className: "flex-shrink-0  ", children: /* @__PURE__ */ jsxDEV20(
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
import { jsxDEV as jsxDEV21 } from "react/jsx-dev-runtime";
var Infobar = () => /* @__PURE__ */ jsxDEV21("div", { children: /* @__PURE__ */ jsxDEV21(m_pool_infobar_view_default, { content: [
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
import { jsxDEV as jsxDEV22 } from "react/jsx-dev-runtime";
var Poolheader = () => /* @__PURE__ */ jsxDEV22("div", { className: "flex flex-row  justify-between  mb-[16px] ", children: [
  /* @__PURE__ */ jsxDEV22("div", { className: "text-2xl  py-[10px]", children: "Pool" }, void 0, !1, {
    fileName: "app/components/molecules/m-pool/m-pool-header-searchbar/index.tsx",
    lineNumber: 7,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ jsxDEV22(
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
import { jsxDEV as jsxDEV23 } from "react/jsx-dev-runtime";
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
], TableView = ({ poolData }) => /* @__PURE__ */ jsxDEV23("table", { className: "w-full", children: [
  /* @__PURE__ */ jsxDEV23("thead", { className: "", children: /* @__PURE__ */ jsxDEV23("tr", { children: [
    /* @__PURE__ */ jsxDEV23("th", { className: "pr-4 py-[10px] max-w-[158.43px] text-left", children: "Pool name" }, void 0, !1, {
      fileName: "app/components/molecules/m-pool/m-pool-table/index.tsx",
      lineNumber: 29,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV23("th", { className: "pr-4 py-[10px] max-w-[158.43px] text-left", children: "Assets" }, void 0, !1, {
      fileName: "app/components/molecules/m-pool/m-pool-table/index.tsx",
      lineNumber: 30,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV23("th", { className: "pr-4 py-[10px] max-w-[158.43px] text-left", children: "Total supplied" }, void 0, !1, {
      fileName: "app/components/molecules/m-pool/m-pool-table/index.tsx",
      lineNumber: 31,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV23("th", { className: "pr-4 py-[10px] max-w-[158.43px] text-left", children: "Total borrowed" }, void 0, !1, {
      fileName: "app/components/molecules/m-pool/m-pool-table/index.tsx",
      lineNumber: 32,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV23("th", { className: "pr-4 py-[10px] max-w-[158.43px] text-left", children: "Pool APR" }, void 0, !1, {
      fileName: "app/components/molecules/m-pool/m-pool-table/index.tsx",
      lineNumber: 33,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV23("th", { className: "pr-4 py-[10px] max-w-[158.43px] text-left", children: "Tenor" }, void 0, !1, {
      fileName: "app/components/molecules/m-pool/m-pool-table/index.tsx",
      lineNumber: 34,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV23("th", { className: "pr-4 py-[10px] min-w-[158.44px] " }, void 0, !1, {
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
  /* @__PURE__ */ jsxDEV23("tbody", { children: poolData.map((item, index) => /* @__PURE__ */ jsxDEV23("tr", { children: [
    /* @__PURE__ */ jsxDEV23("td", { className: "pr-4 py-[11.15px] ", children: item.poolName }, void 0, !1, {
      fileName: "app/components/molecules/m-pool/m-pool-table/index.tsx",
      lineNumber: 41,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV23("td", { className: "pr-4 py-[11.15px] ", children: item.assets }, void 0, !1, {
      fileName: "app/components/molecules/m-pool/m-pool-table/index.tsx",
      lineNumber: 42,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV23("td", { className: "pr-4 py-[11.15px] ", children: item.totalSupplied }, void 0, !1, {
      fileName: "app/components/molecules/m-pool/m-pool-table/index.tsx",
      lineNumber: 43,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV23("td", { className: "pr-4 py-[11.15px] ", children: item.totalBorrowed }, void 0, !1, {
      fileName: "app/components/molecules/m-pool/m-pool-table/index.tsx",
      lineNumber: 44,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV23("td", { className: "pr-4 py-[11.15px] ", children: item.poolAPR }, void 0, !1, {
      fileName: "app/components/molecules/m-pool/m-pool-table/index.tsx",
      lineNumber: 45,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV23("td", { className: "pr-4 py-[11.15px] ", children: item.tenor }, void 0, !1, {
      fileName: "app/components/molecules/m-pool/m-pool-table/index.tsx",
      lineNumber: 46,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV23("td", { className: " py-[11.15px] flex items-center", children: [
      /* @__PURE__ */ jsxDEV23("button", { className: " mr-5 py-[11px] px-[6.61px]  bg-secondaryPool-foreground rounded-sm text-white", children: "Supply" }, void 0, !1, {
        fileName: "app/components/molecules/m-pool/m-pool-table/index.tsx",
        lineNumber: 48,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDEV23("button", { className: "py-[11px] px-[6.61px]  border-2 border-secondaryPool-foreground rounded-sm text-white ", children: "Borrow" }, void 0, !1, {
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
}, this), Pooltable = () => /* @__PURE__ */ jsxDEV23("div", { className: "bg-transparent flex ", children: /* @__PURE__ */ jsxDEV23(TableView, { poolData: data }, void 0, !1, {
  fileName: "app/components/molecules/m-pool/m-pool-table/index.tsx",
  lineNumber: 61,
  columnNumber: 7
}, this) }, void 0, !1, {
  fileName: "app/components/molecules/m-pool/m-pool-table/index.tsx",
  lineNumber: 60,
  columnNumber: 5
}, this), m_pool_table_default = Pooltable;

// app/routes/pool.tsx
import { jsxDEV as jsxDEV24 } from "react/jsx-dev-runtime";
var PoolPage = () => /* @__PURE__ */ jsxDEV24("div", { id: "pool page", className: "flex flex-col w-full  md:ml-[30px] md:pt-7 md:pr-[47px]  ml-[10px] pt-2 pr-[10px]", children: [
  /* @__PURE__ */ jsxDEV24(m_pool_infobar_default, {}, void 0, !1, {
    fileName: "app/routes/pool.tsx",
    lineNumber: 7,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ jsxDEV24("div", { children: [
    /* @__PURE__ */ jsxDEV24(m_pool_header_searchbar_default, {}, void 0, !1, {
      fileName: "app/routes/pool.tsx",
      lineNumber: 9,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV24(m_pool_table_default, {}, void 0, !1, {
      fileName: "app/routes/pool.tsx",
      lineNumber: 10,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/pool.tsx",
    lineNumber: 8,
    columnNumber: 7
  }, this)
] }, void 0, !0, {
  fileName: "app/routes/pool.tsx",
  lineNumber: 6,
  columnNumber: 5
}, this), pool_default = PoolPage;

// app/routes/_index.tsx
import { jsxDEV as jsxDEV25 } from "react/jsx-dev-runtime";
var meta = () => [
  { title: "Zaibatsu" },
  {
    name: "description",
    content: "Bridging the gap between decentralized and centralized currencies"
  }
];
function Index() {
  return /* @__PURE__ */ jsxDEV25(pool_default, {}, void 0, !1, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 14,
    columnNumber: 10
  }, this);
}

// app/routes/lend.tsx
var lend_exports = {};
__export(lend_exports, {
  default: () => lend_default
});
import { jsxDEV as jsxDEV26 } from "react/jsx-dev-runtime";
var LendPage = () => /* @__PURE__ */ jsxDEV26("div", { id: "lend page", className: "flex flex-col w-full  ml-[30px]  pr-[47px]", children: [
  /* @__PURE__ */ jsxDEV26(m_lend_header_default, {}, void 0, !1, {
    fileName: "app/routes/lend.tsx",
    lineNumber: 5,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ jsxDEV26("div", { className: "mt-[62px]", children: /* @__PURE__ */ jsxDEV26(LoanForm2, {}, void 0, !1, {
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
}, this), lend_default = LendPage, LoanForm2 = () => /* @__PURE__ */ jsxDEV26("div", { className: "flex h-screen", children: [
  /* @__PURE__ */ jsxDEV26("div", { className: "flex flex-col  items-start flex-grow p-6", children: [
    /* @__PURE__ */ jsxDEV26("div", { className: "mb-6 w-full", children: [
      /* @__PURE__ */ jsxDEV26("label", { className: "font-Aeonik font-regular text-[16px] leading-[160%]  text-white", children: "Asset to lend" }, void 0, !1, {
        fileName: "app/routes/lend.tsx",
        lineNumber: 23,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV26("select", { className: "w-full h-12 rounded-lg mt-2 bg-secondaryPool-foreground" }, void 0, !1, {
        fileName: "app/routes/lend.tsx",
        lineNumber: 24,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/lend.tsx",
      lineNumber: 22,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV26("div", { className: "mb-6 w-full", children: [
      /* @__PURE__ */ jsxDEV26("label", { className: "font-Aeonik font-regular text-[16px] leading-[160%] mt-6 text-white", children: "Lend capacity" }, void 0, !1, {
        fileName: "app/routes/lend.tsx",
        lineNumber: 27,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV26("input", { type: "text", className: "w-full h-12 border border-white rounded-lg mt-2 bg-secondaryPool-foreground" }, void 0, !1, {
        fileName: "app/routes/lend.tsx",
        lineNumber: 28,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/lend.tsx",
      lineNumber: 26,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV26("div", { className: "mb-6 w-full", children: [
      /* @__PURE__ */ jsxDEV26("label", { className: "font-Aeonik font-regular text-16 leading-[160%] mt-6 text-white", children: "Select Pool" }, void 0, !1, {
        fileName: "app/routes/lend.tsx",
        lineNumber: 31,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV26("select", { className: "w-full h-12 rounded-lg bg-secondaryPool-foreground mt-4 mb-[86px]" }, void 0, !1, {
        fileName: "app/routes/lend.tsx",
        lineNumber: 32,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/lend.tsx",
      lineNumber: 30,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV26("button", { className: "w-full h-12 bg-primary text-white rounded-lg ", children: "Lend Loan" }, void 0, !1, {
      fileName: "app/routes/lend.tsx",
      lineNumber: 34,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/lend.tsx",
    lineNumber: 21,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ jsxDEV26("div", { className: "flex flex-col w-[38.94%] h-full ", children: [
    /* @__PURE__ */ jsxDEV26("label", { className: "font-Aeonik font-regular text-16 leading-[160%] mt-6 text-white", children: "Pending Loan" }, void 0, !1, {
      fileName: "app/routes/lend.tsx",
      lineNumber: 38,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV26("div", { className: "flex flex-col justify-center items-center w-full  bg-[#0b300c] rounded-lg h-full mb-[39px] mt-2", children: /* @__PURE__ */ jsxDEV26("div", { className: "font-Aeonik font-regular text-16 leading-[160%] text-grey-5  ", children: "You are yet to lend." }, void 0, !1, {
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
var assets_manifest_default = { entry: { module: "/build/entry.client-MOSDU7QX.js", imports: ["/build/_shared/chunk-WRM53ZUV.js", "/build/_shared/chunk-BHQCQFCN.js", "/build/_shared/chunk-ATRQC2ZO.js", "/build/_shared/chunk-FGAZNT4N.js", "/build/_shared/chunk-PAEK5ACD.js", "/build/_shared/chunk-QJQJJ6FU.js", "/build/_shared/chunk-JM3EFX3L.js", "/build/_shared/chunk-MYHRZK7S.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-NR6QATTF.js", imports: ["/build/_shared/chunk-7PSQEEMX.js", "/build/_shared/chunk-DMHNC7M5.js", "/build/_shared/chunk-VXZQAZYG.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-PSP7I5PV.js", imports: ["/build/_shared/chunk-A3SAVGMW.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/activities": { id: "routes/activities", parentId: "root", path: "activities", index: void 0, caseSensitive: void 0, module: "/build/routes/activities-N4RJ4A4K.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/activity": { id: "routes/activity", parentId: "root", path: "activity", index: void 0, caseSensitive: void 0, module: "/build/routes/activity-4NPS74LF.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/borrow": { id: "routes/borrow", parentId: "root", path: "borrow", index: void 0, caseSensitive: void 0, module: "/build/routes/borrow-PU5JD47R.js", imports: ["/build/_shared/chunk-UE43ZWDY.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/lend": { id: "routes/lend", parentId: "root", path: "lend", index: void 0, caseSensitive: void 0, module: "/build/routes/lend-DA3XGAF5.js", imports: ["/build/_shared/chunk-UE43ZWDY.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/pool": { id: "routes/pool", parentId: "root", path: "pool", index: void 0, caseSensitive: void 0, module: "/build/routes/pool-SB2DBHP5.js", imports: ["/build/_shared/chunk-A3SAVGMW.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/profile": { id: "routes/profile", parentId: "root", path: "profile", index: void 0, caseSensitive: void 0, module: "/build/routes/profile-G7HGUNYE.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "5f6c3efe", hmr: { runtime: "/build/_shared\\chunk-PAEK5ACD.js", timestamp: 1709923813272 }, url: "/build/manifest-5F6C3EFE.js" };

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
