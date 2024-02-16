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
var tailwind_default = "/build/_assets/tailwind-Z6XCS6YN.css";

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

// app/root.tsx
import { jsxDEV as jsxDEV3 } from "react/jsx-dev-runtime";
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
  return /* @__PURE__ */ jsxDEV3("html", { lang: "en", children: [
    /* @__PURE__ */ jsxDEV3("head", { children: [
      /* @__PURE__ */ jsxDEV3("meta", { charSet: "utf-8" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 53,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 54,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3(Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 55,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3(Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 56,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 52,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV3("body", { className: "font-inter", children: [
      /* @__PURE__ */ jsxDEV3(RecoilRoot, { children: /* @__PURE__ */ jsxDEV3(wallet_default, { children: [
        /* @__PURE__ */ jsxDEV3(
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
            lineNumber: 61,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV3(Outlet, {}, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 66,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/root.tsx",
        lineNumber: 60,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 59,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3(ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 69,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3(Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 70,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV3(LiveReload, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 71,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 58,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 51,
    columnNumber: 5
  }, this);
}

// app/routes/dapp.activity.tsx
var dapp_activity_exports = {};
__export(dapp_activity_exports, {
  default: () => dapp_activity_default
});
import { jsxDEV as jsxDEV4 } from "react/jsx-dev-runtime";
var ActivityPage = () => /* @__PURE__ */ jsxDEV4("div", { children: "Activity" }, void 0, !1, {
  fileName: "app/routes/dapp.activity.tsx",
  lineNumber: 2,
  columnNumber: 10
}, this), dapp_activity_default = ActivityPage;

// app/routes/dapp._index.tsx
var dapp_index_exports = {};
__export(dapp_index_exports, {
  default: () => dapp_index_default
});
import { jsxDEV as jsxDEV5 } from "react/jsx-dev-runtime";
var DashboardPage = () => /* @__PURE__ */ jsxDEV5("div", { children: "Dashboard" }, void 0, !1, {
  fileName: "app/routes/dapp._index.tsx",
  lineNumber: 2,
  columnNumber: 10
}, this), dapp_index_default = DashboardPage;

// app/routes/dapp.borrow.tsx
var dapp_borrow_exports = {};
__export(dapp_borrow_exports, {
  default: () => dapp_borrow_default
});
import { jsxDEV as jsxDEV6 } from "react/jsx-dev-runtime";
var BorrowPage = () => /* @__PURE__ */ jsxDEV6("div", { children: "BorrowPage" }, void 0, !1, {
  fileName: "app/routes/dapp.borrow.tsx",
  lineNumber: 2,
  columnNumber: 10
}, this), dapp_borrow_default = BorrowPage;

// app/routes/dapp.lend.tsx
var dapp_lend_exports = {};
__export(dapp_lend_exports, {
  default: () => dapp_lend_default
});
import { jsxDEV as jsxDEV7 } from "react/jsx-dev-runtime";
var LendPage = () => /* @__PURE__ */ jsxDEV7("div", { children: "Lend" }, void 0, !1, {
  fileName: "app/routes/dapp.lend.tsx",
  lineNumber: 2,
  columnNumber: 10
}, this), dapp_lend_default = LendPage;

// app/routes/dapp.pool.tsx
var dapp_pool_exports = {};
__export(dapp_pool_exports, {
  default: () => dapp_pool_default
});
import { jsxDEV as jsxDEV8 } from "react/jsx-dev-runtime";
var PoolPage = () => /* @__PURE__ */ jsxDEV8("div", { children: "Pool Page" }, void 0, !1, {
  fileName: "app/routes/dapp.pool.tsx",
  lineNumber: 2,
  columnNumber: 10
}, this), dapp_pool_default = PoolPage;

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => Index,
  meta: () => meta
});

// app/components/ui/constants/breakpoints.ts
var breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px"
}, breakpoints_default = breakpoints;

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

// app/components/atoms/a-logo/index.tsx
import { Fragment, jsxDEV as jsxDEV9 } from "react/jsx-dev-runtime";
var Logo = ({ className, variant = "full" }) => /* @__PURE__ */ jsxDEV9(Fragment, { children: variant === "full" ? /* @__PURE__ */ jsxDEV9(
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
) : /* @__PURE__ */ jsxDEV9(
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
import { jsxDEV as jsxDEV10 } from "react/jsx-dev-runtime";
var WalletProvider2 = ({ provider, onClick }) => {
  let handleClick = () => {
    provider.connect(), onClick && onClick();
  };
  return /* @__PURE__ */ jsxDEV10(
    "button",
    {
      disabled: provider.isConnected,
      onClick: handleClick,
      className: "h-20 w-full md:h-auto flex md:flex-col md:justify-center aspect-square items-center gap-4 md:gap-2 p-3 rounded-3xl md:rounded-[30px] font-medium hover:bg-black/20 transition-all",
      children: [
        /* @__PURE__ */ jsxDEV10(
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
        /* @__PURE__ */ jsxDEV10("span", { className: "text-xl", children: provider.metadata.name }, void 0, !1, {
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
import { jsxDEV as jsxDEV11 } from "react/jsx-dev-runtime";
function truncateAddress(address) {
  return `${address.slice(0, 10)}...${address.slice(-10)}`;
}
var WalletAddress = ({ address, truncate, copyable }) => {
  let copyToClipboard = () => {
    navigator.clipboard && navigator.clipboard.writeText(address);
  };
  return /* @__PURE__ */ jsxDEV11("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ jsxDEV11("span", { children: truncate ? truncateAddress(address) : address }, void 0, !1, {
      fileName: "app/components/atoms/a-wallet-address/index.tsx",
      lineNumber: 22,
      columnNumber: 7
    }, this),
    copyable && /* @__PURE__ */ jsxDEV11(
      "button",
      {
        title: "Copy Address",
        className: "shadow p-1 hover:bg-black/10 transition-all rounded",
        onClick: copyToClipboard,
        type: "button",
        children: /* @__PURE__ */ jsxDEV11(BsCopy, { size: 24 }, void 0, !1, {
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

// app/components/molecules/m-landing-page-navigation/index.tsx
import { Link } from "@remix-run/react";
import React2 from "react";
import { HiMenu } from "react-icons/hi";
import { CgClose } from "react-icons/cg";
import { jsxDEV as jsxDEV12 } from "react/jsx-dev-runtime";
var LandingPageNavigation = () => {
  let isLarge = mediaQuery_default(`(min-width: ${breakpoints_default.md})`), [open, setOpen] = React2.useState(!1);
  return /* @__PURE__ */ jsxDEV12("div", { className: "fixed z-[1000] bg-white right-0 top-0 w-screen p-4 md:p-0 md:px-8 flex flex-col justify-between md:flex-row transition-all", children: [
    /* @__PURE__ */ jsxDEV12("div", { className: "flex items-center justify-between flex-[0.5] lg:flex-[0.7] xl:flex-[0.7]", children: [
      /* @__PURE__ */ jsxDEV12(
        a_logo_default,
        {
          className: "max-w-8 md:max-w-max",
          variant: isLarge ? "full" : "icon"
        },
        void 0,
        !1,
        {
          fileName: "app/components/molecules/m-landing-page-navigation/index.tsx",
          lineNumber: 15,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV12(
        "button",
        {
          onClick: () => setOpen((c) => !c),
          "aria-label": "toggle navigation",
          type: "button",
          className: "md:hidden",
          children: open ? /* @__PURE__ */ jsxDEV12(CgClose, { size: 24 }, void 0, !1, {
            fileName: "app/components/molecules/m-landing-page-navigation/index.tsx",
            lineNumber: 25,
            columnNumber: 19
          }, this) : /* @__PURE__ */ jsxDEV12(HiMenu, { size: 24 }, void 0, !1, {
            fileName: "app/components/molecules/m-landing-page-navigation/index.tsx",
            lineNumber: 25,
            columnNumber: 43
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "app/components/molecules/m-landing-page-navigation/index.tsx",
          lineNumber: 19,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/components/molecules/m-landing-page-navigation/index.tsx",
      lineNumber: 14,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV12(
      "nav",
      {
        "data-open": open,
        className: `flex items-start md:items-center gap-8 md:py-5 flex-col md:flex-row bg-white justify-between overflow-hidden
          transition-all data-[open=true]:max-h-52 max-h-0 md:max-h-fit w-full flex-1`,
        children: [
          /* @__PURE__ */ jsxDEV12("ul", { className: "flex flex-col md:flex-row items-start md:items-center gap-4 transition-all mt-4 md:mt-0", children: [
            /* @__PURE__ */ jsxDEV12(Link, { className: "hover:text-primary", to: "#", children: "Governance" }, void 0, !1, {
              fileName: "app/components/molecules/m-landing-page-navigation/index.tsx",
              lineNumber: 34,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV12(Link, { className: "hover:text-primary", to: "#", children: "Security" }, void 0, !1, {
              fileName: "app/components/molecules/m-landing-page-navigation/index.tsx",
              lineNumber: 37,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV12(Link, { className: "hover:text-primary", to: "#", children: "Docs" }, void 0, !1, {
              fileName: "app/components/molecules/m-landing-page-navigation/index.tsx",
              lineNumber: 40,
              columnNumber: 11
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/molecules/m-landing-page-navigation/index.tsx",
            lineNumber: 33,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV12(
            Link,
            {
              className: "bg-primary text-white p-3 px-14 hover:bg-primary/70 whitespace-nowrap transition-all rounded-3xl",
              to: "/dapp",
              children: "Launch App"
            },
            void 0,
            !1,
            {
              fileName: "app/components/molecules/m-landing-page-navigation/index.tsx",
              lineNumber: 44,
              columnNumber: 9
            },
            this
          )
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/components/molecules/m-landing-page-navigation/index.tsx",
        lineNumber: 28,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/components/molecules/m-landing-page-navigation/index.tsx",
    lineNumber: 13,
    columnNumber: 5
  }, this);
}, m_landing_page_navigation_default = LandingPageNavigation;

// app/components/molecules/m-landing-page-hero/index.tsx
import { Link as Link2 } from "@remix-run/react";
import { jsxDEV as jsxDEV13 } from "react/jsx-dev-runtime";
var LandingPageHero = () => /* @__PURE__ */ jsxDEV13(
  "div",
  {
    id: "who-we-are",
    className: "flex flex-col w-full mt-10 items-center justify-center",
    children: /* @__PURE__ */ jsxDEV13("div", { className: "md:p-14 md:py-28", children: [
      /* @__PURE__ */ jsxDEV13("h1", { className: "text-center font-bold text-4xl md:text-6xl", children: [
        "Decentralized Finance: ",
        /* @__PURE__ */ jsxDEV13("br", {}, void 0, !1, {
          fileName: "app/components/molecules/m-landing-page-hero/index.tsx",
          lineNumber: 11,
          columnNumber: 34
        }, this),
        " Earn interest & borrow assets"
      ] }, void 0, !0, {
        fileName: "app/components/molecules/m-landing-page-hero/index.tsx",
        lineNumber: 10,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV13("p", { className: "mt-4 text-center", children: "Zaibatsu provides a decentralized, zero-loss and competitive lending and borrowing platform for the common man." }, void 0, !1, {
        fileName: "app/components/molecules/m-landing-page-hero/index.tsx",
        lineNumber: 13,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV13("div", { className: "flex w-full flex-col md:flex-row justify-center mt-10 items-center gap-6", children: [
        /* @__PURE__ */ jsxDEV13(
          Link2,
          {
            className: "bg-primary p-3 px-14 rounded-3xl w-full max-w-52 flex items-center justify-center hover:bg-primary/70 transition-all text-white",
            to: "#",
            children: "Lend"
          },
          void 0,
          !1,
          {
            fileName: "app/components/molecules/m-landing-page-hero/index.tsx",
            lineNumber: 18,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV13(
          Link2,
          {
            className: "border border-primary p-3 px-14 w-full max-w-52 flex items-center justify-center hover:bg-primary/20 transition-all rounded-3xl text-green-600",
            to: "#",
            children: "Borrow"
          },
          void 0,
          !1,
          {
            fileName: "app/components/molecules/m-landing-page-hero/index.tsx",
            lineNumber: 24,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/components/molecules/m-landing-page-hero/index.tsx",
        lineNumber: 17,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/molecules/m-landing-page-hero/index.tsx",
      lineNumber: 9,
      columnNumber: 7
    }, this)
  },
  void 0,
  !1,
  {
    fileName: "app/components/molecules/m-landing-page-hero/index.tsx",
    lineNumber: 5,
    columnNumber: 5
  },
  this
), m_landing_page_hero_default = LandingPageHero;

// app/components/molecules/m-landing-page-what-we-do/index.tsx
import { PiHandCoinsLight } from "react-icons/pi";
import { MdOutlineCurrencyExchange } from "react-icons/md";
import { jsxDEV as jsxDEV14 } from "react/jsx-dev-runtime";
var LandingPageWhatWeDo = () => /* @__PURE__ */ jsxDEV14(
  "div",
  {
    id: "what-we-do",
    className: "flex flex-col gap-8 w-full items-center justify-center mt-40 md:mt-4",
    children: [
      /* @__PURE__ */ jsxDEV14("h3", { className: "font-medium text-3xl md:text-5xl", children: "What we do" }, void 0, !1, {
        fileName: "app/components/molecules/m-landing-page-what-we-do/index.tsx",
        lineNumber: 10,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ jsxDEV14("p", { className: "text-center", children: "Bridging the gap between decentralized and centralized currencies" }, void 0, !1, {
        fileName: "app/components/molecules/m-landing-page-what-we-do/index.tsx",
        lineNumber: 11,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ jsxDEV14("ul", { className: "flex flex-col md:flex-row gap-12 items-center justify-evenly w-full", children: [
        /* @__PURE__ */ jsxDEV14("div", { className: "flex flex-col relative items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsxDEV14("div", { className: "text-primary bg-primary/10 p-6 rounded-3xl", children: /* @__PURE__ */ jsxDEV14(PiHandCoinsLight, { size: 52 }, void 0, !1, {
            fileName: "app/components/molecules/m-landing-page-what-we-do/index.tsx",
            lineNumber: 17,
            columnNumber: 13
          }, this) }, void 0, !1, {
            fileName: "app/components/molecules/m-landing-page-what-we-do/index.tsx",
            lineNumber: 16,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV14("p", { className: "font-medium text-xl", children: "Borrow" }, void 0, !1, {
            fileName: "app/components/molecules/m-landing-page-what-we-do/index.tsx",
            lineNumber: 19,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV14("p", { className: "max-w-[276px] text-center", children: "Borrow at the interest rate and tenor that works for you" }, void 0, !1, {
            fileName: "app/components/molecules/m-landing-page-what-we-do/index.tsx",
            lineNumber: 20,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV14(
            "img",
            {
              src: "/assets/images/dark_wavy_line.svg",
              alt: "wavy line",
              className: "max-w-[250px] z-[-10] hidden xl:block absolute top-0 -right-[75%] self-start"
            },
            void 0,
            !1,
            {
              fileName: "app/components/molecules/m-landing-page-what-we-do/index.tsx",
              lineNumber: 23,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/components/molecules/m-landing-page-what-we-do/index.tsx",
          lineNumber: 15,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV14("div", { className: "flex flex-col relative items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsxDEV14("div", { className: "text-primary bg-primary/10 p-6 rounded-3xl", children: /* @__PURE__ */ jsxDEV14(PiHandCoinsLight, { size: 52 }, void 0, !1, {
            fileName: "app/components/molecules/m-landing-page-what-we-do/index.tsx",
            lineNumber: 31,
            columnNumber: 13
          }, this) }, void 0, !1, {
            fileName: "app/components/molecules/m-landing-page-what-we-do/index.tsx",
            lineNumber: 30,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV14("p", { className: "font-medium text-xl", children: "Lend" }, void 0, !1, {
            fileName: "app/components/molecules/m-landing-page-what-we-do/index.tsx",
            lineNumber: 33,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV14("p", { className: "max-w-[276px] text-center", children: "Diversify your portfolio and lend to a wider range of borrowers" }, void 0, !1, {
            fileName: "app/components/molecules/m-landing-page-what-we-do/index.tsx",
            lineNumber: 34,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV14(
            "img",
            {
              src: "/assets/images/dark_wavy_line.svg",
              alt: "wavy line",
              className: "max-w-[250px] z-[-10] hidden xl:block absolute top-0 -right-[75%] self-start"
            },
            void 0,
            !1,
            {
              fileName: "app/components/molecules/m-landing-page-what-we-do/index.tsx",
              lineNumber: 37,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/components/molecules/m-landing-page-what-we-do/index.tsx",
          lineNumber: 29,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV14("div", { className: "flex flex-col items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsxDEV14("div", { className: "text-primary bg-primary/10 p-6 rounded-3xl", children: /* @__PURE__ */ jsxDEV14(MdOutlineCurrencyExchange, { size: 52 }, void 0, !1, {
            fileName: "app/components/molecules/m-landing-page-what-we-do/index.tsx",
            lineNumber: 45,
            columnNumber: 13
          }, this) }, void 0, !1, {
            fileName: "app/components/molecules/m-landing-page-what-we-do/index.tsx",
            lineNumber: 44,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV14("p", { className: "font-medium text-xl", children: "Convert" }, void 0, !1, {
            fileName: "app/components/molecules/m-landing-page-what-we-do/index.tsx",
            lineNumber: 47,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV14("p", { className: "max-w-[276px] text-center", children: "Diversify your portfolio and lend to a wider range of borrowers" }, void 0, !1, {
            fileName: "app/components/molecules/m-landing-page-what-we-do/index.tsx",
            lineNumber: 48,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/molecules/m-landing-page-what-we-do/index.tsx",
          lineNumber: 43,
          columnNumber: 9
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/molecules/m-landing-page-what-we-do/index.tsx",
        lineNumber: 14,
        columnNumber: 7
      }, this)
    ]
  },
  void 0,
  !0,
  {
    fileName: "app/components/molecules/m-landing-page-what-we-do/index.tsx",
    lineNumber: 6,
    columnNumber: 5
  },
  this
), m_landing_page_what_we_do_default = LandingPageWhatWeDo;

// app/components/ui/button.tsx
import * as React3 from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { jsxDEV as jsxDEV15 } from "react/jsx-dev-runtime";
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
  ({ className, variant, size, asChild = !1, ...props }, ref) => /* @__PURE__ */ jsxDEV15(
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

// app/components/molecules/m-landing-page-how-we-do-it/index.tsx
import { jsxDEV as jsxDEV16 } from "react/jsx-dev-runtime";
var LandingPageHowWeDoIt = () => /* @__PURE__ */ jsxDEV16("div", { className: "flex flex-col mt-32 gap-6 items-center justify-center", children: [
  /* @__PURE__ */ jsxDEV16("h3", { className: "font-medium text-3xl md:text-5xl", children: "How we do it" }, void 0, !1, {
    fileName: "app/components/molecules/m-landing-page-how-we-do-it/index.tsx",
    lineNumber: 6,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ jsxDEV16("p", { className: "max-w-[530px] text-center", children: "How we offer our services including the methods we use, the technology used etc" }, void 0, !1, {
    fileName: "app/components/molecules/m-landing-page-how-we-do-it/index.tsx",
    lineNumber: 7,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ jsxDEV16("div", { className: "flex flex-col flex-wrap items-center gap-16 md:gap-0 md:items-start mt-14 justify-evenly md:flex-row w-full", children: [
    /* @__PURE__ */ jsxDEV16("div", { className: "flex flex-col items-start md:mt-14 gap-4", children: [
      /* @__PURE__ */ jsxDEV16("div", { className: "bg-[#EFE4FC] shadow rounded-full p-4", children: /* @__PURE__ */ jsxDEV16("img", { src: "/assets/images/green-upstatus.svg", alt: "up status" }, void 0, !1, {
        fileName: "app/components/molecules/m-landing-page-how-we-do-it/index.tsx",
        lineNumber: 14,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/components/molecules/m-landing-page-how-we-do-it/index.tsx",
        lineNumber: 13,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV16("h4", { className: "font-medium text-2xl", children: "Create" }, void 0, !1, {
        fileName: "app/components/molecules/m-landing-page-how-we-do-it/index.tsx",
        lineNumber: 16,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV16("p", { className: "max-w-[262px]", children: "Built on the secure and innovative algorand network, Zaibatsu operates without a central authority." }, void 0, !1, {
        fileName: "app/components/molecules/m-landing-page-how-we-do-it/index.tsx",
        lineNumber: 17,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV16(Button, { className: "mt-6", type: "button", children: "Create" }, void 0, !1, {
        fileName: "app/components/molecules/m-landing-page-how-we-do-it/index.tsx",
        lineNumber: 21,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/molecules/m-landing-page-how-we-do-it/index.tsx",
      lineNumber: 12,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV16("div", { className: "flex flex-col items-start gap-4", children: [
      /* @__PURE__ */ jsxDEV16("div", { className: "bg-[#EFE4FC] shadow rounded-full p-4", children: /* @__PURE__ */ jsxDEV16("img", { src: "/assets/images/purple-pie-chart.svg", alt: "chart" }, void 0, !1, {
        fileName: "app/components/molecules/m-landing-page-how-we-do-it/index.tsx",
        lineNumber: 27,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/components/molecules/m-landing-page-how-we-do-it/index.tsx",
        lineNumber: 26,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV16("h4", { className: "font-medium text-2xl", children: "Instant payment" }, void 0, !1, {
        fileName: "app/components/molecules/m-landing-page-how-we-do-it/index.tsx",
        lineNumber: 29,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV16("p", { className: "max-w-[262px]", children: "Put NFTs on sale or on auction. Get paid for your digital collectables" }, void 0, !1, {
        fileName: "app/components/molecules/m-landing-page-how-we-do-it/index.tsx",
        lineNumber: 30,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV16(Button, { className: "mt-6", type: "button", children: "Sale now" }, void 0, !1, {
        fileName: "app/components/molecules/m-landing-page-how-we-do-it/index.tsx",
        lineNumber: 34,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/molecules/m-landing-page-how-we-do-it/index.tsx",
      lineNumber: 25,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV16("div", { className: "flex flex-col items-start md:mt-20 gap-4", children: [
      /* @__PURE__ */ jsxDEV16("div", { className: "bg-[#EFE4FC] shadow rounded-full p-4", children: /* @__PURE__ */ jsxDEV16("img", { src: "/assets/images/favorite-chart.svg", alt: "chart" }, void 0, !1, {
        fileName: "app/components/molecules/m-landing-page-how-we-do-it/index.tsx",
        lineNumber: 40,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/components/molecules/m-landing-page-how-we-do-it/index.tsx",
        lineNumber: 39,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV16("h4", { className: "font-medium text-2xl", children: "Set up your wallet" }, void 0, !1, {
        fileName: "app/components/molecules/m-landing-page-how-we-do-it/index.tsx",
        lineNumber: 42,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV16("p", { className: "max-w-[262px]", children: "Once you\u2019ve set up your wallet of choice, connect it by clicking the wallet icon in the top right corner." }, void 0, !1, {
        fileName: "app/components/molecules/m-landing-page-how-we-do-it/index.tsx",
        lineNumber: 43,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV16(Button, { className: "mt-6", type: "button", children: "Sale now" }, void 0, !1, {
        fileName: "app/components/molecules/m-landing-page-how-we-do-it/index.tsx",
        lineNumber: 47,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/molecules/m-landing-page-how-we-do-it/index.tsx",
      lineNumber: 38,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/molecules/m-landing-page-how-we-do-it/index.tsx",
    lineNumber: 11,
    columnNumber: 7
  }, this)
] }, void 0, !0, {
  fileName: "app/components/molecules/m-landing-page-how-we-do-it/index.tsx",
  lineNumber: 5,
  columnNumber: 5
}, this), m_landing_page_how_we_do_it_default = LandingPageHowWeDoIt;

// app/components/molecules/m-landing-page-why-choose-us/index.tsx
import { GoLock } from "react-icons/go";
import { FaRegCheckCircle } from "react-icons/fa";
import { jsxDEV as jsxDEV17 } from "react/jsx-dev-runtime";
var LandingPageWhyChooseUs = () => /* @__PURE__ */ jsxDEV17("div", { className: "flex flex-col items-center justify-center mt-44", children: [
  /* @__PURE__ */ jsxDEV17("h3", { className: "font-bold text-3xl md:text-5xl text-primary", children: "Why choose us?" }, void 0, !1, {
    fileName: "app/components/molecules/m-landing-page-why-choose-us/index.tsx",
    lineNumber: 7,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ jsxDEV17("div", { className: "flex flex-col md:flex-row gap-16 md:gap-0 items-center flex-wrap justify-evenly md:px-10 w-full mt-10", children: [
    /* @__PURE__ */ jsxDEV17("div", { className: "border p-8 py-10 flex font-inter md:even:mt-20 flex-col gap-4 rounded-2xl max-w-[277px]", children: [
      /* @__PURE__ */ jsxDEV17(GoLock, { className: "text-primary", size: 36 }, void 0, !1, {
        fileName: "app/components/molecules/m-landing-page-why-choose-us/index.tsx",
        lineNumber: 12,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV17("h4", { className: "font-bold text-2xl", children: [
        "Security ",
        /* @__PURE__ */ jsxDEV17("br", {}, void 0, !1, {
          fileName: "app/components/molecules/m-landing-page-why-choose-us/index.tsx",
          lineNumber: 14,
          columnNumber: 22
        }, this),
        " Focused"
      ] }, void 0, !0, {
        fileName: "app/components/molecules/m-landing-page-why-choose-us/index.tsx",
        lineNumber: 13,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV17("p", { children: "With on-chain transactions and smart contracts, your money stays safe and accessible, every step of the way." }, void 0, !1, {
        fileName: "app/components/molecules/m-landing-page-why-choose-us/index.tsx",
        lineNumber: 16,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/molecules/m-landing-page-why-choose-us/index.tsx",
      lineNumber: 11,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV17("div", { className: "border p-8 py-10 flex font-inter md:even:mt-20 flex-col gap-4 rounded-2xl max-w-[277px]", children: [
      /* @__PURE__ */ jsxDEV17(FaRegCheckCircle, { className: "text-primary", size: 36 }, void 0, !1, {
        fileName: "app/components/molecules/m-landing-page-why-choose-us/index.tsx",
        lineNumber: 22,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV17("h4", { className: "font-bold text-2xl", children: [
        "Trans ",
        /* @__PURE__ */ jsxDEV17("br", {}, void 0, !1, {
          fileName: "app/components/molecules/m-landing-page-why-choose-us/index.tsx",
          lineNumber: 24,
          columnNumber: 19
        }, this),
        " parent"
      ] }, void 0, !0, {
        fileName: "app/components/molecules/m-landing-page-why-choose-us/index.tsx",
        lineNumber: 23,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV17("p", { children: "All transactions on our platform are recorded on the blockchain, and fully visible to all users." }, void 0, !1, {
        fileName: "app/components/molecules/m-landing-page-why-choose-us/index.tsx",
        lineNumber: 26,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/molecules/m-landing-page-why-choose-us/index.tsx",
      lineNumber: 21,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV17("div", { className: "border p-8 py-10 flex font-inter md:even:mt-20 flex-col gap-4 rounded-2xl max-w-[277px]", children: [
      /* @__PURE__ */ jsxDEV17(
        "img",
        {
          className: "w-9 h-12",
          src: "/assets/images/clipboard-badge.svg",
          alt: "clipboard badge"
        },
        void 0,
        !1,
        {
          fileName: "app/components/molecules/m-landing-page-why-choose-us/index.tsx",
          lineNumber: 32,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV17("h4", { className: "font-bold text-2xl", children: [
        "Access ",
        /* @__PURE__ */ jsxDEV17("br", {}, void 0, !1, {
          fileName: "app/components/molecules/m-landing-page-why-choose-us/index.tsx",
          lineNumber: 38,
          columnNumber: 20
        }, this),
        " ible"
      ] }, void 0, !0, {
        fileName: "app/components/molecules/m-landing-page-why-choose-us/index.tsx",
        lineNumber: 37,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV17("p", { children: "Our platform is open to anyone with an internet connection, regardless of their location or credit history." }, void 0, !1, {
        fileName: "app/components/molecules/m-landing-page-why-choose-us/index.tsx",
        lineNumber: 40,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/molecules/m-landing-page-why-choose-us/index.tsx",
      lineNumber: 31,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV17("div", { className: "border p-8 py-10 flex font-inter md:even:mt-20 flex-col gap-4 rounded-2xl max-w-[277px]", children: [
      /* @__PURE__ */ jsxDEV17(
        "img",
        {
          className: "w-9 h-12",
          src: "/assets/images/user-cycle.svg",
          alt: "clipboard badge"
        },
        void 0,
        !1,
        {
          fileName: "app/components/molecules/m-landing-page-why-choose-us/index.tsx",
          lineNumber: 46,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV17("h4", { className: "font-bold text-2xl", children: [
        "User ",
        /* @__PURE__ */ jsxDEV17("br", {}, void 0, !1, {
          fileName: "app/components/molecules/m-landing-page-why-choose-us/index.tsx",
          lineNumber: 52,
          columnNumber: 18
        }, this),
        " Friendly"
      ] }, void 0, !0, {
        fileName: "app/components/molecules/m-landing-page-why-choose-us/index.tsx",
        lineNumber: 51,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV17("p", { children: "An easy-to-use interface that is simple enough for people of all technical backgrounds to use." }, void 0, !1, {
        fileName: "app/components/molecules/m-landing-page-why-choose-us/index.tsx",
        lineNumber: 54,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/molecules/m-landing-page-why-choose-us/index.tsx",
      lineNumber: 45,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/molecules/m-landing-page-why-choose-us/index.tsx",
    lineNumber: 10,
    columnNumber: 7
  }, this)
] }, void 0, !0, {
  fileName: "app/components/molecules/m-landing-page-why-choose-us/index.tsx",
  lineNumber: 6,
  columnNumber: 5
}, this), m_landing_page_why_choose_us_default = LandingPageWhyChooseUs;

// app/components/ui/accordion.tsx
import * as React4 from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { jsxDEV as jsxDEV18 } from "react/jsx-dev-runtime";
var Accordion = AccordionPrimitive.Root, AccordionItem = React4.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV18(
  AccordionPrimitive.Item,
  {
    ref,
    className: cn("border-b", className),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/accordion.tsx",
    lineNumber: 13,
    columnNumber: 3
  },
  this
));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = React4.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxDEV18(AccordionPrimitive.Header, { className: "flex", children: /* @__PURE__ */ jsxDEV18(
  AccordionPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxDEV18(ChevronDownIcon, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" }, void 0, !1, {
        fileName: "app/components/ui/accordion.tsx",
        lineNumber: 35,
        columnNumber: 7
      }, this)
    ]
  },
  void 0,
  !0,
  {
    fileName: "app/components/ui/accordion.tsx",
    lineNumber: 26,
    columnNumber: 5
  },
  this
) }, void 0, !1, {
  fileName: "app/components/ui/accordion.tsx",
  lineNumber: 25,
  columnNumber: 3
}, this));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
var AccordionContent = React4.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxDEV18(
  AccordionPrimitive.Content,
  {
    ref,
    className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...props,
    children: /* @__PURE__ */ jsxDEV18("div", { className: cn("pb-4 pt-0", className), children }, void 0, !1, {
      fileName: "app/components/ui/accordion.tsx",
      lineNumber: 50,
      columnNumber: 5
    }, this)
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/accordion.tsx",
    lineNumber: 45,
    columnNumber: 3
  },
  this
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

// app/constants/landingpage/qAndAs.ts
var QandAs = [
  {
    title: "What is Zaibatsu?",
    paragraphs: [
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."
    ]
  },
  {
    title: "How do we calculate interest?",
    paragraphs: [
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."
    ]
  },
  {
    title: "How can I borrow?",
    paragraphs: [
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."
    ]
  },
  {
    title: "How can I Lend?",
    paragraphs: [
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."
    ]
  }
], qAndAs_default = QandAs;

// app/components/molecules/m-landing-page-q-and-a/index.tsx
import { jsxDEV as jsxDEV19 } from "react/jsx-dev-runtime";
var LandingPageQAndA = () => /* @__PURE__ */ jsxDEV19("div", { className: "flex flex-col items-center font-inter w-full mt-32", children: /* @__PURE__ */ jsxDEV19("div", { className: "bg-primary/5 max-w-[880px] w-full gap-28 py-16 flex flex-col items-center rounded-[72px] p-5", children: [
  /* @__PURE__ */ jsxDEV19("div", { className: "flex flex-col items-center justify-center font-bold ", children: [
    /* @__PURE__ */ jsxDEV19("h3", { className: "text-5xl", children: "Your questions," }, void 0, !1, {
      fileName: "app/components/molecules/m-landing-page-q-and-a/index.tsx",
      lineNumber: 14,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV19("h3", { className: "text-5xl text-primary", children: "answered" }, void 0, !1, {
      fileName: "app/components/molecules/m-landing-page-q-and-a/index.tsx",
      lineNumber: 15,
      columnNumber: 11
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/molecules/m-landing-page-q-and-a/index.tsx",
    lineNumber: 13,
    columnNumber: 9
  }, this),
  /* @__PURE__ */ jsxDEV19(
    Accordion,
    {
      type: "single",
      defaultValue: qAndAs_default[0].title,
      collapsible: !0,
      className: "w-full max-w-[737px] border rounded-3xl p-12",
      children: qAndAs_default.map((qAndA) => /* @__PURE__ */ jsxDEV19(
        AccordionItem,
        {
          value: qAndA.title,
          className: "w-full",
          children: [
            /* @__PURE__ */ jsxDEV19(AccordionTrigger, { className: "font-semibold text-start text-xl w-full flex items-start justify-between", children: qAndA.title }, void 0, !1, {
              fileName: "app/components/molecules/m-landing-page-q-and-a/index.tsx",
              lineNumber: 29,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV19(AccordionContent, { className: "font-normal flex flex-col gap-3", children: qAndA.paragraphs.map((p) => /* @__PURE__ */ jsxDEV19("p", { children: p }, void 0, !1, {
              fileName: "app/components/molecules/m-landing-page-q-and-a/index.tsx",
              lineNumber: 34,
              columnNumber: 19
            }, this)) }, void 0, !1, {
              fileName: "app/components/molecules/m-landing-page-q-and-a/index.tsx",
              lineNumber: 32,
              columnNumber: 15
            }, this)
          ]
        },
        qAndA.title,
        !0,
        {
          fileName: "app/components/molecules/m-landing-page-q-and-a/index.tsx",
          lineNumber: 24,
          columnNumber: 13
        },
        this
      ))
    },
    void 0,
    !1,
    {
      fileName: "app/components/molecules/m-landing-page-q-and-a/index.tsx",
      lineNumber: 17,
      columnNumber: 9
    },
    this
  )
] }, void 0, !0, {
  fileName: "app/components/molecules/m-landing-page-q-and-a/index.tsx",
  lineNumber: 12,
  columnNumber: 7
}, this) }, void 0, !1, {
  fileName: "app/components/molecules/m-landing-page-q-and-a/index.tsx",
  lineNumber: 11,
  columnNumber: 5
}, this), m_landing_page_q_and_a_default = LandingPageQAndA;

// app/constants/navigation/footer.ts
import { FaTwitter } from "react-icons/fa";
import { FaInstagram, FaYoutube } from "react-icons/fa6";
var SOCIAL_LINKS = [
  {
    name: "Twitter",
    href: "#",
    icon: FaTwitter
  },
  {
    name: "Instagram",
    href: "#",
    icon: FaInstagram
  },
  {
    name: "YouTube",
    href: "#",
    icon: FaYoutube
  }
], QUICK_LINKS = [
  {
    name: "About",
    href: "#"
  },
  {
    name: "Governance",
    href: "#"
  },
  {
    name: "Docs",
    href: "#"
  },
  {
    name: "Security",
    href: "#"
  }
], COMMUNITY_LINKS = [
  {
    name: "How it works",
    href: "#"
  },
  {
    name: "Get in touch",
    href: "#"
  }
];

// app/components/molecules/m-landing-page-footer/index.tsx
import { Link as Link3 } from "@remix-run/react";
import { jsxDEV as jsxDEV20 } from "react/jsx-dev-runtime";
var LandingPageFooter = () => /* @__PURE__ */ jsxDEV20("footer", { className: "border-t font-inter p-2 pt-20 md:p-20 mt-48 md:mt-56 flex flex-col gap-20", children: [
  /* @__PURE__ */ jsxDEV20("div", { className: "flex flex-col md:flex-row w-full justify-between", children: [
    /* @__PURE__ */ jsxDEV20("div", { className: "flex flex-col gap-6", children: [
      /* @__PURE__ */ jsxDEV20(a_logo_default, { className: "w-[153px] mb-4" }, void 0, !1, {
        fileName: "app/components/molecules/m-landing-page-footer/index.tsx",
        lineNumber: 10,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV20("p", { className: "md:max-w-[370px]", children: "Join our Discord channel or follow us on Twitter to keep up to date with our latest work and announcements." }, void 0, !1, {
        fileName: "app/components/molecules/m-landing-page-footer/index.tsx",
        lineNumber: 11,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV20("ul", { className: "flex items-center gap-4", children: SOCIAL_LINKS.map(({ icon: Icon, ...item }) => /* @__PURE__ */ jsxDEV20(Link3, { to: item.href, children: /* @__PURE__ */ jsxDEV20(Icon, { size: 24 }, void 0, !1, {
        fileName: "app/components/molecules/m-landing-page-footer/index.tsx",
        lineNumber: 14,
        columnNumber: 53
      }, this) }, item.name, !1, {
        fileName: "app/components/molecules/m-landing-page-footer/index.tsx",
        lineNumber: 14,
        columnNumber: 15
      }, this)) }, void 0, !1, {
        fileName: "app/components/molecules/m-landing-page-footer/index.tsx",
        lineNumber: 12,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/molecules/m-landing-page-footer/index.tsx",
      lineNumber: 9,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV20("div", { className: "grid grid-cols-2 gap-10", children: [
      /* @__PURE__ */ jsxDEV20("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsxDEV20("h4", { className: "font-bold text-2xl", children: "Quick Link" }, void 0, !1, {
          fileName: "app/components/molecules/m-landing-page-footer/index.tsx",
          lineNumber: 20,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV20("ul", { className: "flex flex-col transition-all gap-2 text-black/80", children: QUICK_LINKS.map((link) => /* @__PURE__ */ jsxDEV20(Link3, { className: "hover:text-black", to: link.href, children: link.name }, link.name, !1, {
          fileName: "app/components/molecules/m-landing-page-footer/index.tsx",
          lineNumber: 23,
          columnNumber: 17
        }, this)) }, void 0, !1, {
          fileName: "app/components/molecules/m-landing-page-footer/index.tsx",
          lineNumber: 21,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/molecules/m-landing-page-footer/index.tsx",
        lineNumber: 19,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV20("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsxDEV20("h4", { className: "font-bold text-2xl", children: "Community" }, void 0, !1, {
          fileName: "app/components/molecules/m-landing-page-footer/index.tsx",
          lineNumber: 28,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV20("ul", { className: "flex flex-col transition-all gap-2 text-black/80", children: COMMUNITY_LINKS.map((link) => /* @__PURE__ */ jsxDEV20(Link3, { className: "hover:text-black", to: link.href, children: link.name }, link.name, !1, {
          fileName: "app/components/molecules/m-landing-page-footer/index.tsx",
          lineNumber: 31,
          columnNumber: 17
        }, this)) }, void 0, !1, {
          fileName: "app/components/molecules/m-landing-page-footer/index.tsx",
          lineNumber: 29,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/molecules/m-landing-page-footer/index.tsx",
        lineNumber: 27,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/molecules/m-landing-page-footer/index.tsx",
      lineNumber: 18,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/molecules/m-landing-page-footer/index.tsx",
    lineNumber: 8,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ jsxDEV20("div", { className: "flex items-center flex-col w-full md:flex-row justify-between", children: [
    /* @__PURE__ */ jsxDEV20("p", { children: [
      "Copyright ",
      /* @__PURE__ */ jsxDEV20("span", { children: "\xA9" }, void 0, !1, {
        fileName: "app/components/molecules/m-landing-page-footer/index.tsx",
        lineNumber: 38,
        columnNumber: 22
      }, this),
      " ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " Zaibatsu All Rights Reserved."
    ] }, void 0, !0, {
      fileName: "app/components/molecules/m-landing-page-footer/index.tsx",
      lineNumber: 38,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV20("div", { className: "flex items-center gap-6 transition-all text-black/70", children: [
      /* @__PURE__ */ jsxDEV20(Link3, { className: "hover:text-black", to: "#", children: "Privacy policy" }, void 0, !1, {
        fileName: "app/components/molecules/m-landing-page-footer/index.tsx",
        lineNumber: 40,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV20(Link3, { className: "hover:text-black", to: "#", children: "Terms of Use" }, void 0, !1, {
        fileName: "app/components/molecules/m-landing-page-footer/index.tsx",
        lineNumber: 41,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/molecules/m-landing-page-footer/index.tsx",
      lineNumber: 39,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/molecules/m-landing-page-footer/index.tsx",
    lineNumber: 37,
    columnNumber: 7
  }, this)
] }, void 0, !0, {
  fileName: "app/components/molecules/m-landing-page-footer/index.tsx",
  lineNumber: 7,
  columnNumber: 5
}, this), m_landing_page_footer_default = LandingPageFooter;

// app/components/molecules/m-landing-page-get-started/index.tsx
import { Link as Link4 } from "@remix-run/react";
import { GoArrowUpRight } from "react-icons/go";
import { jsxDEV as jsxDEV21 } from "react/jsx-dev-runtime";
var LandingPageGetStarted = () => /* @__PURE__ */ jsxDEV21("div", { className: "relative flex flex-col items-center justify-center mt-48 md:mt-64", children: [
  /* @__PURE__ */ jsxDEV21("div", { className: "absolute -z-50", children: /* @__PURE__ */ jsxDEV21("div", { className: "h-screen relative z-0 max-h-[250px] md:max-h-[506px] overflow-hidden w-screen flex flex-col items-center justify-center", children: [
    /* @__PURE__ */ jsxDEV21("div", { className: "absolute bg-gradient-to-b z-50 from-white to-transparent top-0 w-screen h-[50%]" }, void 0, !1, {
      fileName: "app/components/molecules/m-landing-page-get-started/index.tsx",
      lineNumber: 9,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV21("img", { className: "w-screen absolute -z-10 self-center object-cover", src: "/assets/images/trade.jpeg" }, void 0, !1, {
      fileName: "app/components/molecules/m-landing-page-get-started/index.tsx",
      lineNumber: 10,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV21("div", { className: "absolute bg-gradient-to-b from-transparent to-white bottom-0 w-screen h-[50%]" }, void 0, !1, {
      fileName: "app/components/molecules/m-landing-page-get-started/index.tsx",
      lineNumber: 11,
      columnNumber: 11
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/molecules/m-landing-page-get-started/index.tsx",
    lineNumber: 8,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/components/molecules/m-landing-page-get-started/index.tsx",
    lineNumber: 7,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ jsxDEV21("div", { className: "font-inter gap-3 md:gap-6 flex flex-col items-center", children: [
    /* @__PURE__ */ jsxDEV21("h3", { className: "font-extrabold text-5xl lg:text-8xl text-white", children: "Let's Start" }, void 0, !1, {
      fileName: "app/components/molecules/m-landing-page-get-started/index.tsx",
      lineNumber: 15,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV21("p", { className: "md:text-2xl font-medium text-white/80", children: "Borrow, lend and convert" }, void 0, !1, {
      fileName: "app/components/molecules/m-landing-page-get-started/index.tsx",
      lineNumber: 16,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV21(Link4, { className: "bg-primary flex items-center gap-1 p-4 px-10 text-white font-medium rounded-[30px]", to: "#", children: [
      /* @__PURE__ */ jsxDEV21("span", { children: "Get started" }, void 0, !1, {
        fileName: "app/components/molecules/m-landing-page-get-started/index.tsx",
        lineNumber: 18,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV21(GoArrowUpRight, { size: 24 }, void 0, !1, {
        fileName: "app/components/molecules/m-landing-page-get-started/index.tsx",
        lineNumber: 19,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/molecules/m-landing-page-get-started/index.tsx",
      lineNumber: 17,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/molecules/m-landing-page-get-started/index.tsx",
    lineNumber: 14,
    columnNumber: 7
  }, this)
] }, void 0, !0, {
  fileName: "app/components/molecules/m-landing-page-get-started/index.tsx",
  lineNumber: 6,
  columnNumber: 5
}, this), m_landing_page_get_started_default = LandingPageGetStarted;

// app/routes/_index.tsx
import { jsxDEV as jsxDEV22 } from "react/jsx-dev-runtime";
var meta = () => [
  { title: "Zaibatsu" },
  {
    name: "description",
    content: "Bridging the gap between decentralized and centralized currencies"
  }
];
function Index() {
  return /* @__PURE__ */ jsxDEV22("div", { className: "font-trispace w-screen overflow-hidden z-0 transition-all", children: [
    /* @__PURE__ */ jsxDEV22("div", { className: "p-7", children: [
      /* @__PURE__ */ jsxDEV22(m_landing_page_navigation_default, {}, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 26,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV22(m_landing_page_hero_default, {}, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 27,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV22(m_landing_page_what_we_do_default, {}, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 28,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV22(m_landing_page_how_we_do_it_default, {}, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 29,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV22(m_landing_page_why_choose_us_default, {}, void 0, !1, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 30,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 25,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV22(m_landing_page_q_and_a_default, {}, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 32,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV22(m_landing_page_get_started_default, {}, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 33,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV22(m_landing_page_footer_default, {}, void 0, !1, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 34,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 24,
    columnNumber: 5
  }, this);
}

// app/routes/dapp.tsx
var dapp_exports = {};
__export(dapp_exports, {
  default: () => dapp_default2
});
import { Outlet as Outlet2 } from "@remix-run/react";

// app/components/molecules/m-top-bar/index.tsx
import { IoMenu, IoClose } from "react-icons/io5";
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
import { jsxDEV as jsxDEV23 } from "react/jsx-dev-runtime";
var TopBar = ({ className }) => {
  let [navOpen, setNavOpen] = useRecoilState(navAtom_default);
  return /* @__PURE__ */ jsxDEV23(
    "nav",
    {
      className: cn(
        "py-3 p-2 flex w-full items-center justify-between",
        className
      ),
      children: [
        /* @__PURE__ */ jsxDEV23("div", { children: /* @__PURE__ */ jsxDEV23(a_logo_default, { className: "md:hidden" }, void 0, !1, {
          fileName: "app/components/molecules/m-top-bar/index.tsx",
          lineNumber: 23,
          columnNumber: 9
        }, this) }, void 0, !1, {
          fileName: "app/components/molecules/m-top-bar/index.tsx",
          lineNumber: 22,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV23("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsxDEV23(m_connect_wallet_default, {}, void 0, !1, {
            fileName: "app/components/molecules/m-top-bar/index.tsx",
            lineNumber: 26,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV23(
            "button",
            {
              onClick: () => setNavOpen((curr) => !curr),
              type: "button",
              className: "p-2 md:hidden",
              children: navOpen ? /* @__PURE__ */ jsxDEV23(IoClose, { size: 26 }, void 0, !1, {
                fileName: "app/components/molecules/m-top-bar/index.tsx",
                lineNumber: 32,
                columnNumber: 22
              }, this) : /* @__PURE__ */ jsxDEV23(IoMenu, { size: 26 }, void 0, !1, {
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
import React5 from "react";

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
import { Link as Link5, useLocation } from "@remix-run/react";
import { useRecoilValue } from "recoil";
import { jsxDEV as jsxDEV24 } from "react/jsx-dev-runtime";
var SidebarNavigation = () => {
  let [active, setActive] = React5.useState(0), isOpen = useRecoilValue(navAtom_default), isMobile = mediaQuery_default(`(max-width: ${breakpoints_default.md})`), location = useLocation();
  return React5.useEffect(() => {
    let activeNav = dapp_default.find(
      (item) => item.path === location.pathname.replace("/dapp", "")
    );
    activeNav !== void 0 && setActive(dapp_default.indexOf(activeNav));
  }, [location]), /* @__PURE__ */ jsxDEV24(
    "aside",
    {
      className: `md:relative transition-all top-14 fixed h-screen pl-14 bg-[#E9FCF5] ${isMobile && isOpen ? "translate-x-0" : isMobile && !isOpen ? "-translate-x-full" : ""}`,
      children: [
        /* @__PURE__ */ jsxDEV24(a_logo_default, { className: "absolute top-7 right-7 hidden md:block" }, void 0, !1, {
          fileName: "app/components/molecules/m-sidebar-navigation/index.tsx",
          lineNumber: 36,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV24("div", { className: " mt-28", children: /* @__PURE__ */ jsxDEV24("ul", { className: "flex flex-col bg-white", children: dapp_default.map((item, id) => /* @__PURE__ */ jsxDEV24("div", { className: "group transition-all", children: [
          /* @__PURE__ */ jsxDEV24(
            "div",
            {
              className: `h-5 w-full bg-[#E9FCF5] z-0 ${active === id ? "rounded-br-3xl" : ""} top-[-12px] right-0`
            },
            void 0,
            !1,
            {
              fileName: "app/components/molecules/m-sidebar-navigation/index.tsx",
              lineNumber: 41,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDEV24(
            Link5,
            {
              className: "z-0 relative flex bg-[#E9FCF5]",
              to: `/dapp${item.path}#`,
              children: /* @__PURE__ */ jsxDEV24(
                "span",
                {
                  className: `p-3 px-14 pr-16 rounded-l-3xl group-hover:text-primary/50 transition-all ${active === id ? "bg-white text-primary" : "bg-[#E9FCF5]"} w-full h-full`,
                  children: item.name
                },
                void 0,
                !1,
                {
                  fileName: "app/components/molecules/m-sidebar-navigation/index.tsx",
                  lineNumber: 50,
                  columnNumber: 17
                },
                this
              )
            },
            void 0,
            !1,
            {
              fileName: "app/components/molecules/m-sidebar-navigation/index.tsx",
              lineNumber: 46,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDEV24(
            "div",
            {
              className: `h-5 w-full bg-[#E9FCF5] z-0 ${active === id ? "rounded-tr-3xl" : ""} top-[-12px] right-0`
            },
            void 0,
            !1,
            {
              fileName: "app/components/molecules/m-sidebar-navigation/index.tsx",
              lineNumber: 58,
              columnNumber: 15
            },
            this
          )
        ] }, item.name, !0, {
          fileName: "app/components/molecules/m-sidebar-navigation/index.tsx",
          lineNumber: 40,
          columnNumber: 13
        }, this)) }, void 0, !1, {
          fileName: "app/components/molecules/m-sidebar-navigation/index.tsx",
          lineNumber: 38,
          columnNumber: 9
        }, this) }, void 0, !1, {
          fileName: "app/components/molecules/m-sidebar-navigation/index.tsx",
          lineNumber: 37,
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

// app/components/ui/dialog.tsx
import * as React6 from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { jsxDEV as jsxDEV25 } from "react/jsx-dev-runtime";
var Dialog = DialogPrimitive.Root, DialogTrigger = DialogPrimitive.Trigger, DialogPortal = DialogPrimitive.Portal, DialogClose = DialogPrimitive.Close, DialogOverlay = React6.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV25(
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
var DialogContent = React6.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxDEV25(DialogPortal, { children: [
  /* @__PURE__ */ jsxDEV25(DialogOverlay, {}, void 0, !1, {
    fileName: "app/components/ui/dialog.tsx",
    lineNumber: 36,
    columnNumber: 5
  }, this),
  /* @__PURE__ */ jsxDEV25(
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
        /* @__PURE__ */ jsxDEV25(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxDEV25(Cross2Icon, { className: "h-4 w-4" }, void 0, !1, {
            fileName: "app/components/ui/dialog.tsx",
            lineNumber: 47,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV25("span", { className: "sr-only", children: "Close" }, void 0, !1, {
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
}) => /* @__PURE__ */ jsxDEV25(
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
}) => /* @__PURE__ */ jsxDEV25(
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
var DialogTitle = React6.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV25(
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
var DialogDescription = React6.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV25(
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
import React7 from "react";
import { jsxDEV as jsxDEV26 } from "react/jsx-dev-runtime";
var ConnectWallet = () => {
  let [open, setOpen] = React7.useState(!1), { providers, activeAccount } = useWallet(), connectedProvider = providers?.find((provider) => provider.isActive);
  return /* @__PURE__ */ jsxDEV26(Component.Root, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxDEV26(Component.Trigger, { children: /* @__PURE__ */ jsxDEV26(
      Button,
      {
        variant: "outline",
        type: "button",
        className: "md:p-8 md:rounded-l-[40px] text-lg",
        size: "lg",
        children: activeAccount ? /* @__PURE__ */ jsxDEV26(a_wallet_address_default, { address: activeAccount.address, truncate: !0 }, void 0, !1, {
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
    /* @__PURE__ */ jsxDEV26(Component.Content, { className: "p-7 px-4 w-full md:max-w-[680px] md:px-16 overflow-y-auto max-w-[90vw]", children: [
      /* @__PURE__ */ jsxDEV26(Component.Header, { className: "w-full flex flex-col items-center", children: [
        /* @__PURE__ */ jsxDEV26(Component.Title, { className: "py-4 flex items-center justify-center font-semibold text-2xl", children: activeAccount ? "Connected Wallet" : "Connect Wallet" }, void 0, !1, {
          fileName: "app/components/molecules/m-connect-wallet/index.tsx",
          lineNumber: 29,
          columnNumber: 11
        }, this),
        !activeAccount && /* @__PURE__ */ jsxDEV26(Component.Description, { className: "text-center md:max-w-[70%] flex items-center justify-center text-sm", children: "Connect to any of the supported wallet providers to start trading on Zaibatsu" }, void 0, !1, {
          fileName: "app/components/molecules/m-connect-wallet/index.tsx",
          lineNumber: 33,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/molecules/m-connect-wallet/index.tsx",
        lineNumber: 28,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV26("div", { className: "flex flex-col w-full items-center mt-5", children: activeAccount ? /* @__PURE__ */ jsxDEV26("div", { className: "flex flex-col items-center gap-3", children: [
        /* @__PURE__ */ jsxDEV26("div", { className: "flex border rounded-lg p-1 items-center gap-4", children: [
          connectedProvider && /* @__PURE__ */ jsxDEV26(
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
          /* @__PURE__ */ jsxDEV26(
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
        /* @__PURE__ */ jsxDEV26(
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
      }, this) : /* @__PURE__ */ jsxDEV26("ul", { className: "grid grid-cols-1 w-full md:grid-cols-2 gap-14 gap-y-4 md:gap-y-7", children: providers?.map((provider) => /* @__PURE__ */ jsxDEV26(
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
import { jsxDEV as jsxDEV27 } from "react/jsx-dev-runtime";
var AppShellWithNavigation = ({ children }) => {
  let isMobile = mediaQuery_default(`(max-width: ${breakpoints_default.md})`);
  return /* @__PURE__ */ jsxDEV27("div", { className: "flex bg-[#E9FCF5] h-screen w-screen overflow-hidden", children: [
    /* @__PURE__ */ jsxDEV27(m_sidebar_navigation_default, {}, void 0, !1, {
      fileName: "app/components/organisms/o-app-shell-with-navigation/index.tsx",
      lineNumber: 14,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV27(
      "div",
      {
        style: { width: "calc(100vw - 262px)" },
        className: "flex flex-col w-full p-2 md:p-0 flex-1",
        children: [
          /* @__PURE__ */ jsxDEV27(m_top_bar_default, {}, void 0, !1, {
            fileName: "app/components/organisms/o-app-shell-with-navigation/index.tsx",
            lineNumber: 19,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV27(
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

// app/routes/dapp.tsx
import { jsxDEV as jsxDEV28 } from "react/jsx-dev-runtime";
var DappRoute = () => /* @__PURE__ */ jsxDEV28(o_app_shell_with_navigation_default, { children: /* @__PURE__ */ jsxDEV28(Outlet2, {}, void 0, !1, {
  fileName: "app/routes/dapp.tsx",
  lineNumber: 7,
  columnNumber: 7
}, this) }, void 0, !1, {
  fileName: "app/routes/dapp.tsx",
  lineNumber: 6,
  columnNumber: 5
}, this), dapp_default2 = DappRoute;

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-62TJZJUD.js", imports: ["/build/_shared/chunk-WRM53ZUV.js", "/build/_shared/chunk-BODZSRRX.js", "/build/_shared/chunk-ATRQC2ZO.js", "/build/_shared/chunk-FGAZNT4N.js", "/build/_shared/chunk-WBJQR5K3.js", "/build/_shared/chunk-QJQJJ6FU.js", "/build/_shared/chunk-JM3EFX3L.js", "/build/_shared/chunk-MYHRZK7S.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-TPRZLJGG.js", imports: ["/build/_shared/chunk-7PSQEEMX.js", "/build/_shared/chunk-DMHNC7M5.js", "/build/_shared/chunk-V7MC4E7F.js", "/build/_shared/chunk-NIAAYOWA.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-V6D6B53Z.js", imports: ["/build/_shared/chunk-DKNALD2U.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/dapp": { id: "routes/dapp", parentId: "root", path: "dapp", index: void 0, caseSensitive: void 0, module: "/build/routes/dapp-OI7WL2Q4.js", imports: ["/build/_shared/chunk-DKNALD2U.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/dapp._index": { id: "routes/dapp._index", parentId: "routes/dapp", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/dapp._index-PXNPB5V3.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/dapp.activity": { id: "routes/dapp.activity", parentId: "routes/dapp", path: "activity", index: void 0, caseSensitive: void 0, module: "/build/routes/dapp.activity-AHX5OI2A.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/dapp.borrow": { id: "routes/dapp.borrow", parentId: "routes/dapp", path: "borrow", index: void 0, caseSensitive: void 0, module: "/build/routes/dapp.borrow-JFMQIZVS.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/dapp.lend": { id: "routes/dapp.lend", parentId: "routes/dapp", path: "lend", index: void 0, caseSensitive: void 0, module: "/build/routes/dapp.lend-W7M4IVC6.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/dapp.pool": { id: "routes/dapp.pool", parentId: "routes/dapp", path: "pool", index: void 0, caseSensitive: void 0, module: "/build/routes/dapp.pool-36P3VG5D.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "c465d318", hmr: { runtime: "/build/_shared/chunk-WBJQR5K3.js", timestamp: 1708095614641 }, url: "/build/manifest-C465D318.js" };

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
  "routes/dapp.activity": {
    id: "routes/dapp.activity",
    parentId: "routes/dapp",
    path: "activity",
    index: void 0,
    caseSensitive: void 0,
    module: dapp_activity_exports
  },
  "routes/dapp._index": {
    id: "routes/dapp._index",
    parentId: "routes/dapp",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: dapp_index_exports
  },
  "routes/dapp.borrow": {
    id: "routes/dapp.borrow",
    parentId: "routes/dapp",
    path: "borrow",
    index: void 0,
    caseSensitive: void 0,
    module: dapp_borrow_exports
  },
  "routes/dapp.lend": {
    id: "routes/dapp.lend",
    parentId: "routes/dapp",
    path: "lend",
    index: void 0,
    caseSensitive: void 0,
    module: dapp_lend_exports
  },
  "routes/dapp.pool": {
    id: "routes/dapp.pool",
    parentId: "routes/dapp",
    path: "pool",
    index: void 0,
    caseSensitive: void 0,
    module: dapp_pool_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  },
  "routes/dapp": {
    id: "routes/dapp",
    parentId: "root",
    path: "dapp",
    index: void 0,
    caseSensitive: void 0,
    module: dapp_exports
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
