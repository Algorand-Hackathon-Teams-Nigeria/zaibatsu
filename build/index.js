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
var cssBundleHref = "/build/css-bundle-4225ZG7K.css";

// app/tailwind.css
var tailwind_default = "/build/_assets/tailwind-K35PVXZ5.css";

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

// app/components/molecules/m-top-bar/index.tsx
import { jsxDEV as jsxDEV6 } from "react/jsx-dev-runtime";
var TopBar = ({ className }) => {
  let [navOpen, setNavOpen] = useRecoilState(navAtom_default);
  return /* @__PURE__ */ jsxDEV6(
    "nav",
    {
      className: cn(
        "py-3 p-2 flex w-full items-center justify-between",
        className
      ),
      children: [
        /* @__PURE__ */ jsxDEV6("div", { children: /* @__PURE__ */ jsxDEV6(a_logo_default, { className: "md:hidden" }, void 0, !1, {
          fileName: "app/components/molecules/m-top-bar/index.tsx",
          lineNumber: 23,
          columnNumber: 9
        }, this) }, void 0, !1, {
          fileName: "app/components/molecules/m-top-bar/index.tsx",
          lineNumber: 22,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV6("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsxDEV6(m_connect_wallet_default, {}, void 0, !1, {
            fileName: "app/components/molecules/m-top-bar/index.tsx",
            lineNumber: 26,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV6(
            "button",
            {
              onClick: () => setNavOpen((curr) => !curr),
              type: "button",
              className: "p-2 md:hidden",
              children: navOpen ? /* @__PURE__ */ jsxDEV6(IoClose, { size: 26 }, void 0, !1, {
                fileName: "app/components/molecules/m-top-bar/index.tsx",
                lineNumber: 32,
                columnNumber: 22
              }, this) : /* @__PURE__ */ jsxDEV6(IoMenu, { size: 26 }, void 0, !1, {
                fileName: "app/components/molecules/m-top-bar/index.tsx",
                lineNumber: 32,
                columnNumber: 46
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "app/components/molecules/m-top-bar/index.tsx",
              lineNumber: 27,
              columnNumber: 9
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/components/molecules/m-top-bar/index.tsx",
          lineNumber: 25,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/components/molecules/m-top-bar/index.tsx",
      lineNumber: 16,
      columnNumber: 5
    },
    this
  );
}, m_top_bar_default = TopBar;

// app/components/molecules/m-sidebar-navigation/index.tsx
import React2 from "react";

// app/constants/navigation/dapp.ts
var DAPP_NAVIGATION = [
  {
    name: "Dashboard",
    path: "/"
  },
  {
    name: "Pool",
    path: "/pool"
  },
  {
    name: "Lend",
    path: "/lend"
  },
  {
    name: "Borrow",
    path: "/borrow"
  },
  {
    name: "Activity",
    path: "/activity"
  }
], dapp_default = DAPP_NAVIGATION;

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
import { jsxDEV as jsxDEV7 } from "react/jsx-dev-runtime";
var SidebarNavigation = () => {
  let [active, setActive] = React2.useState(0), isOpen = useRecoilValue(navAtom_default), isMobile = mediaQuery_default(`(max-width: ${breakpoints_default.md})`), location = useLocation();
  return React2.useEffect(() => {
    let activeNav = dapp_default.find(
      (item) => item.path === location.pathname.replace("/dapp", "")
    );
    activeNav !== void 0 && setActive(dapp_default.indexOf(activeNav));
  }, [location]), /* @__PURE__ */ jsxDEV7(
    "aside",
    {
      className: `md:relative transition-all top-14 fixed h-screen pl-14 bg-[#E9FCF5] ${isMobile && isOpen ? "translate-x-0" : isMobile && !isOpen ? "-translate-x-full" : ""}`,
      children: [
        /* @__PURE__ */ jsxDEV7(a_logo_default, { className: "absolute top-7 right-7 hidden md:block" }, void 0, !1, {
          fileName: "app/components/molecules/m-sidebar-navigation/index.tsx",
          lineNumber: 35,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV7("div", { className: " mt-28", children: /* @__PURE__ */ jsxDEV7("ul", { className: "flex flex-col bg-white", children: dapp_default.map((item, id) => /* @__PURE__ */ jsxDEV7("div", { className: "group transition-all", children: [
          /* @__PURE__ */ jsxDEV7(
            "div",
            {
              className: `h-5 w-full bg-[#E9FCF5] z-0 ${active === id ? "rounded-br-3xl" : ""} top-[-12px] right-0`
            },
            void 0,
            !1,
            {
              fileName: "app/components/molecules/m-sidebar-navigation/index.tsx",
              lineNumber: 40,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDEV7(
            Link,
            {
              className: "z-0 relative flex bg-[#E9FCF5]",
              to: `${item.path}#`,
              children: /* @__PURE__ */ jsxDEV7(
                "span",
                {
                  className: `p-3 px-14 pr-16 rounded-l-3xl group-hover:text-primary/50 transition-all ${active === id ? "bg-white text-primary" : "bg-[#E9FCF5]"} w-full h-full`,
                  children: item.name
                },
                void 0,
                !1,
                {
                  fileName: "app/components/molecules/m-sidebar-navigation/index.tsx",
                  lineNumber: 48,
                  columnNumber: 17
                },
                this
              )
            },
            void 0,
            !1,
            {
              fileName: "app/components/molecules/m-sidebar-navigation/index.tsx",
              lineNumber: 44,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDEV7(
            "div",
            {
              className: `h-5 w-full bg-[#E9FCF5] z-0 ${active === id ? "rounded-tr-3xl" : ""} top-[-12px] right-0`
            },
            void 0,
            !1,
            {
              fileName: "app/components/molecules/m-sidebar-navigation/index.tsx",
              lineNumber: 55,
              columnNumber: 15
            },
            this
          )
        ] }, item.name, !0, {
          fileName: "app/components/molecules/m-sidebar-navigation/index.tsx",
          lineNumber: 39,
          columnNumber: 13
        }, this)) }, void 0, !1, {
          fileName: "app/components/molecules/m-sidebar-navigation/index.tsx",
          lineNumber: 37,
          columnNumber: 9
        }, this) }, void 0, !1, {
          fileName: "app/components/molecules/m-sidebar-navigation/index.tsx",
          lineNumber: 36,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/components/molecules/m-sidebar-navigation/index.tsx",
      lineNumber: 27,
      columnNumber: 5
    },
    this
  );
}, m_sidebar_navigation_default = SidebarNavigation;

// app/components/molecules/m-connect-wallet/index.tsx
import { useWallet } from "@txnlab/use-wallet";

// app/components/ui/button.tsx
import * as React3 from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { jsxDEV as jsxDEV8 } from "react/jsx-dev-runtime";
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
        link: "text-primary underline-offset-4 hover:underline"
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
), Button = React3.forwardRef(
  ({ className, variant, size, asChild = !1, ...props }, ref) => /* @__PURE__ */ jsxDEV8(
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
      lineNumber: 47,
      columnNumber: 7
    },
    this
  )
);
Button.displayName = "Button";

// app/components/ui/dialog.tsx
import * as React4 from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { jsxDEV as jsxDEV9 } from "react/jsx-dev-runtime";
var Dialog = DialogPrimitive.Root, DialogTrigger = DialogPrimitive.Trigger, DialogPortal = DialogPrimitive.Portal, DialogClose = DialogPrimitive.Close, DialogOverlay = React4.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV9(
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
var DialogContent = React4.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxDEV9(DialogPortal, { children: [
  /* @__PURE__ */ jsxDEV9(DialogOverlay, {}, void 0, !1, {
    fileName: "app/components/ui/dialog.tsx",
    lineNumber: 36,
    columnNumber: 5
  }, this),
  /* @__PURE__ */ jsxDEV9(
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
        /* @__PURE__ */ jsxDEV9(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxDEV9(Cross2Icon, { className: "h-4 w-4" }, void 0, !1, {
            fileName: "app/components/ui/dialog.tsx",
            lineNumber: 47,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV9("span", { className: "sr-only", children: "Close" }, void 0, !1, {
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
}) => /* @__PURE__ */ jsxDEV9(
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
}) => /* @__PURE__ */ jsxDEV9(
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
var DialogTitle = React4.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV9(
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
var DialogDescription = React4.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV9(
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
import React5 from "react";
import { jsxDEV as jsxDEV10 } from "react/jsx-dev-runtime";
var ConnectWallet = () => {
  let [open, setOpen] = React5.useState(!1), { providers, activeAccount } = useWallet(), connectedProvider = providers?.find((provider) => provider.isActive);
  return /* @__PURE__ */ jsxDEV10(Component.Root, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxDEV10(Component.Trigger, { children: /* @__PURE__ */ jsxDEV10(
      Button,
      {
        variant: "outline",
        type: "button",
        className: "md:p-8 md:rounded-l-[40px] text-lg",
        size: "lg",
        children: activeAccount ? /* @__PURE__ */ jsxDEV10(a_wallet_address_default, { address: activeAccount.address, truncate: !0 }, void 0, !1, {
          fileName: "app/components/molecules/m-connect-wallet/index.tsx",
          lineNumber: 21,
          columnNumber: 13
        }, this) : "Connect Wallet"
      },
      void 0,
      !1,
      {
        fileName: "app/components/molecules/m-connect-wallet/index.tsx",
        lineNumber: 14,
        columnNumber: 9
      },
      this
    ) }, void 0, !1, {
      fileName: "app/components/molecules/m-connect-wallet/index.tsx",
      lineNumber: 13,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV10(Component.Content, { className: "p-7 px-4 w-full md:max-w-[680px] md:px-16 overflow-y-auto max-w-[90vw]", children: [
      /* @__PURE__ */ jsxDEV10(Component.Header, { className: "w-full flex flex-col items-center", children: [
        /* @__PURE__ */ jsxDEV10(Component.Title, { className: "py-4 flex items-center justify-center font-semibold text-2xl", children: activeAccount ? "Connected Wallet" : "Connect Wallet" }, void 0, !1, {
          fileName: "app/components/molecules/m-connect-wallet/index.tsx",
          lineNumber: 29,
          columnNumber: 11
        }, this),
        !activeAccount && /* @__PURE__ */ jsxDEV10(Component.Description, { className: "text-center md:max-w-[70%] flex items-center justify-center text-sm", children: "Connect to any of the supported wallet providers to start trading on Zaibatsu" }, void 0, !1, {
          fileName: "app/components/molecules/m-connect-wallet/index.tsx",
          lineNumber: 33,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/molecules/m-connect-wallet/index.tsx",
        lineNumber: 28,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV10("div", { className: "flex flex-col w-full items-center mt-5", children: activeAccount ? /* @__PURE__ */ jsxDEV10("div", { className: "flex flex-col items-center gap-3", children: [
        /* @__PURE__ */ jsxDEV10("div", { className: "flex border rounded-lg p-1 items-center gap-4", children: [
          connectedProvider && /* @__PURE__ */ jsxDEV10(
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
              lineNumber: 54,
              columnNumber: 19
            },
            this
          ),
          /* @__PURE__ */ jsxDEV10(
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
              lineNumber: 60,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/components/molecules/m-connect-wallet/index.tsx",
          lineNumber: 52,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV10(
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
            lineNumber: 66,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/components/molecules/m-connect-wallet/index.tsx",
        lineNumber: 51,
        columnNumber: 13
      }, this) : /* @__PURE__ */ jsxDEV10("ul", { className: "grid grid-cols-1 w-full md:grid-cols-2 gap-14 gap-y-4 md:gap-y-7", children: providers?.map((provider) => /* @__PURE__ */ jsxDEV10(
        a_wallet_provider_default,
        {
          onClick: () => setOpen(!1),
          provider
        },
        provider.metadata.id,
        !1,
        {
          fileName: "app/components/molecules/m-connect-wallet/index.tsx",
          lineNumber: 43,
          columnNumber: 17
        },
        this
      )) }, void 0, !1, {
        fileName: "app/components/molecules/m-connect-wallet/index.tsx",
        lineNumber: 41,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/components/molecules/m-connect-wallet/index.tsx",
        lineNumber: 39,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/molecules/m-connect-wallet/index.tsx",
      lineNumber: 27,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/molecules/m-connect-wallet/index.tsx",
    lineNumber: 12,
    columnNumber: 5
  }, this);
}, m_connect_wallet_default = ConnectWallet;

// app/components/organisms/o-app-shell-with-navigation/index.tsx
import { jsxDEV as jsxDEV11 } from "react/jsx-dev-runtime";
var AppShellWithNavigation = ({ children }) => {
  let isMobile = mediaQuery_default(`(max-width: ${breakpoints_default.md})`);
  return /* @__PURE__ */ jsxDEV11("div", { className: "flex bg-[#E9FCF5] h-screen w-screen overflow-hidden", children: [
    /* @__PURE__ */ jsxDEV11(m_sidebar_navigation_default, {}, void 0, !1, {
      fileName: "app/components/organisms/o-app-shell-with-navigation/index.tsx",
      lineNumber: 14,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV11(
      "div",
      {
        style: { width: "calc(100vw - 262px)" },
        className: "flex flex-col w-full p-2 md:p-0 flex-1",
        children: [
          /* @__PURE__ */ jsxDEV11(m_top_bar_default, {}, void 0, !1, {
            fileName: "app/components/organisms/o-app-shell-with-navigation/index.tsx",
            lineNumber: 19,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV11(
            "main",
            {
              style: {
                height: isMobile ? "calc(100vh - 60px)" : "calc(100vh - 82px)"
              },
              className: "bg-white p-2 rounded-t-2xl md:rounded-tr-none h-screen w-full overflow-y-auto",
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
import { jsxDEV as jsxDEV12 } from "react/jsx-dev-runtime";
var links = () => [
  { rel: "stylesheet", href: tailwind_default },
  ...cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []
];
async function loader() {
  return json({
    ENV: {
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
  let data = useLoaderData();
  return /* @__PURE__ */ jsxDEV12("html", { lang: "en", children: [
    /* @__PURE__ */ jsxDEV12("head", { children: [
      /* @__PURE__ */ jsxDEV12("meta", { charSet: "utf-8" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 54,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV12("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 55,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV12(Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 56,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV12(Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 57,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 53,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV12("body", { className: "font-inter", children: [
      /* @__PURE__ */ jsxDEV12(RecoilRoot, { children: /* @__PURE__ */ jsxDEV12(wallet_default, { children: [
        /* @__PURE__ */ jsxDEV12(
          "script",
          {
            dangerouslySetInnerHTML: {
              __html: `window.ENV= ${JSON.stringify(data.ENV)}`
            }
          },
          void 0,
          !1,
          {
            fileName: "app/root.tsx",
            lineNumber: 62,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV12(o_app_shell_with_navigation_default, { children: /* @__PURE__ */ jsxDEV12(Outlet, {}, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 68,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 67,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/root.tsx",
        lineNumber: 61,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 60,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV12(ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 72,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV12(Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 73,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV12(LiveReload, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 74,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 59,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 52,
    columnNumber: 5
  }, this);
}

// app/routes/activity.tsx
var activity_exports = {};
__export(activity_exports, {
  default: () => activity_default
});
import { jsxDEV as jsxDEV13 } from "react/jsx-dev-runtime";
var ActivityPage = () => /* @__PURE__ */ jsxDEV13("div", { children: "Activity" }, void 0, !1, {
  fileName: "app/routes/activity.tsx",
  lineNumber: 2,
  columnNumber: 10
}, this), activity_default = ActivityPage;

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => Index,
  meta: () => meta
});
import { jsxDEV as jsxDEV14 } from "react/jsx-dev-runtime";
var meta = () => [
  { title: "Zaibatsu" },
  {
    name: "description",
    content: "Bridging the gap between decentralized and centralized currencies"
  }
];
function Index() {
  return /* @__PURE__ */ jsxDEV14("div", { children: "Dashboard" }, void 0, !1, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 15,
    columnNumber: 10
  }, this);
}

// app/routes/borrow.tsx
var borrow_exports = {};
__export(borrow_exports, {
  default: () => borrow_default
});
import { jsxDEV as jsxDEV15 } from "react/jsx-dev-runtime";
var BorrowPage = () => /* @__PURE__ */ jsxDEV15("div", { children: "BorrowPage" }, void 0, !1, {
  fileName: "app/routes/borrow.tsx",
  lineNumber: 2,
  columnNumber: 10
}, this), borrow_default = BorrowPage;

// app/routes/lend.tsx
var lend_exports = {};
__export(lend_exports, {
  default: () => lend_default
});
import { jsxDEV as jsxDEV16 } from "react/jsx-dev-runtime";
var LendPage = () => /* @__PURE__ */ jsxDEV16("div", { children: "Lend" }, void 0, !1, {
  fileName: "app/routes/lend.tsx",
  lineNumber: 2,
  columnNumber: 10
}, this), lend_default = LendPage;

// app/routes/pool.tsx
var pool_exports = {};
__export(pool_exports, {
  default: () => pool_default
});
import { jsxDEV as jsxDEV17 } from "react/jsx-dev-runtime";
var PoolPage = () => /* @__PURE__ */ jsxDEV17("div", { children: "Pool Page" }, void 0, !1, {
  fileName: "app/routes/pool.tsx",
  lineNumber: 2,
  columnNumber: 10
}, this), pool_default = PoolPage;

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-KENWTMJJ.js", imports: ["/build/_shared/chunk-WRM53ZUV.js", "/build/_shared/chunk-NEZYOV4U.js", "/build/_shared/chunk-ATRQC2ZO.js", "/build/_shared/chunk-KTXKSMJR.js", "/build/_shared/chunk-QJQJJ6FU.js", "/build/_shared/chunk-FGAZNT4N.js", "/build/_shared/chunk-JM3EFX3L.js", "/build/_shared/chunk-MYHRZK7S.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-A4XF6ERM.js", imports: ["/build/_shared/chunk-DMHNC7M5.js", "/build/_shared/chunk-7PSQEEMX.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-S2IBUWD7.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/activity": { id: "routes/activity", parentId: "root", path: "activity", index: void 0, caseSensitive: void 0, module: "/build/routes/activity-6EYAX4ZP.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/borrow": { id: "routes/borrow", parentId: "root", path: "borrow", index: void 0, caseSensitive: void 0, module: "/build/routes/borrow-PVNA4Q74.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/lend": { id: "routes/lend", parentId: "root", path: "lend", index: void 0, caseSensitive: void 0, module: "/build/routes/lend-R353RYE7.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/pool": { id: "routes/pool", parentId: "root", path: "pool", index: void 0, caseSensitive: void 0, module: "/build/routes/pool-F3IYDE2I.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "0ac34f9b", hmr: { runtime: "/build/_shared/chunk-KTXKSMJR.js", timestamp: 1708096901617 }, url: "/build/manifest-0AC34F9B.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "development", assetsBuildDirectory = "public/build", future = { v3_fetcherPersist: !1, v3_relativeSplatPath: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/activity": {
    id: "routes/activity",
    parentId: "root",
    path: "activity",
    index: void 0,
    caseSensitive: void 0,
    module: activity_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  },
  "routes/borrow": {
    id: "routes/borrow",
    parentId: "root",
    path: "borrow",
    index: void 0,
    caseSensitive: void 0,
    module: borrow_exports
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
