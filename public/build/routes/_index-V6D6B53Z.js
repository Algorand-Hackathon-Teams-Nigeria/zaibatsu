import {
  $1746a345f3d73bb7$export$f680877a34711e37,
  $5e63c961fc1ce211$export$8c6ed5c666ac1360,
  $6ed0406888f73fc4$export$c7b2cbe3552a0d05,
  $71cd76cc60e0454e$export$6f32135080cb4c3,
  $8927f6f2acc4f386$export$250ffa63cdc0d034,
  $921a889cee6df7e8$export$99c2b779aa4e8b8b,
  $9f79659886946c16$export$e5c5a5f917a5871c,
  $c512c27ab02ef895$export$50c7b4e9d9f19c1,
  $e42e1063c40fb3ef$export$b9ecd428b558ff10,
  Button,
  ChevronDownIcon,
  GenIcon,
  _extends,
  a_logo_default,
  breakpoints_default,
  mediaQuery_default
} from "/build/_shared/chunk-DKNALD2U.js";
import {
  cn
} from "/build/_shared/chunk-NIAAYOWA.js";
import {
  Link
} from "/build/_shared/chunk-BODZSRRX.js";
import "/build/_shared/chunk-ATRQC2ZO.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-FGAZNT4N.js";
import {
  createHotContext
} from "/build/_shared/chunk-WBJQR5K3.js";
import "/build/_shared/chunk-QJQJJ6FU.js";
import {
  require_react
} from "/build/_shared/chunk-JM3EFX3L.js";
import {
  __toESM
} from "/build/_shared/chunk-MYHRZK7S.js";

// app/components/molecules/m-landing-page-navigation/index.tsx
var import_react2 = __toESM(require_react(), 1);

// node_modules/.pnpm/react-icons@5.0.1_react@18.2.0/node_modules/react-icons/hi/index.mjs
function HiMenu(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 20 20", "fill": "currentColor", "aria-hidden": "true" }, "child": [{ "tag": "path", "attr": { "fillRule": "evenodd", "d": "M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z", "clipRule": "evenodd" }, "child": [] }] })(props);
}

// node_modules/.pnpm/react-icons@5.0.1_react@18.2.0/node_modules/react-icons/cg/index.mjs
function CgClose(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24", "fill": "none" }, "child": [{ "tag": "path", "attr": { "d": "M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z", "fill": "currentColor" }, "child": [] }] })(props);
}

// app/components/molecules/m-landing-page-navigation/index.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/components/molecules/m-landing-page-navigation/index.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/components/molecules/m-landing-page-navigation/index.tsx"
  );
  import.meta.hot.lastModified = "1706672381957.8508";
}
var LandingPageNavigation = () => {
  _s();
  const isLarge = mediaQuery_default(`(min-width: ${breakpoints_default.md})`);
  const [open, setOpen] = import_react2.default.useState(false);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "fixed z-[1000] bg-white right-0 top-0 w-screen p-4 md:p-0 md:px-8 flex flex-col justify-between md:flex-row transition-all", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-between flex-[0.5] lg:flex-[0.7] xl:flex-[0.7]", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(a_logo_default, { className: "max-w-8 md:max-w-max", variant: isLarge ? "full" : "icon" }, void 0, false, {
        fileName: "app/components/molecules/m-landing-page-navigation/index.tsx",
        lineNumber: 35,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => setOpen((c) => !c), "aria-label": "toggle navigation", type: "button", className: "md:hidden", children: open ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CgClose, { size: 24 }, void 0, false, {
        fileName: "app/components/molecules/m-landing-page-navigation/index.tsx",
        lineNumber: 37,
        columnNumber: 19
      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HiMenu, { size: 24 }, void 0, false, {
        fileName: "app/components/molecules/m-landing-page-navigation/index.tsx",
        lineNumber: 37,
        columnNumber: 43
      }, this) }, void 0, false, {
        fileName: "app/components/molecules/m-landing-page-navigation/index.tsx",
        lineNumber: 36,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/molecules/m-landing-page-navigation/index.tsx",
      lineNumber: 34,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", { "data-open": open, className: `flex items-start md:items-center gap-8 md:py-5 flex-col md:flex-row bg-white justify-between overflow-hidden
          transition-all data-[open=true]:max-h-52 max-h-0 md:max-h-fit w-full flex-1`, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "flex flex-col md:flex-row items-start md:items-center gap-4 transition-all mt-4 md:mt-0", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { className: "hover:text-primary", to: "#", children: "Governance" }, void 0, false, {
          fileName: "app/components/molecules/m-landing-page-navigation/index.tsx",
          lineNumber: 43,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { className: "hover:text-primary", to: "#", children: "Security" }, void 0, false, {
          fileName: "app/components/molecules/m-landing-page-navigation/index.tsx",
          lineNumber: 46,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { className: "hover:text-primary", to: "#", children: "Docs" }, void 0, false, {
          fileName: "app/components/molecules/m-landing-page-navigation/index.tsx",
          lineNumber: 49,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/molecules/m-landing-page-navigation/index.tsx",
        lineNumber: 42,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { className: "bg-primary text-white p-3 px-14 hover:bg-primary/70 whitespace-nowrap transition-all rounded-3xl", to: "/dapp", children: "Launch App" }, void 0, false, {
        fileName: "app/components/molecules/m-landing-page-navigation/index.tsx",
        lineNumber: 53,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/molecules/m-landing-page-navigation/index.tsx",
      lineNumber: 40,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/molecules/m-landing-page-navigation/index.tsx",
    lineNumber: 33,
    columnNumber: 10
  }, this);
};
_s(LandingPageNavigation, "fOUO/55CiUy/mu2oH4Kp8P+h+Pc=", false, function() {
  return [mediaQuery_default];
});
_c = LandingPageNavigation;
var m_landing_page_navigation_default = LandingPageNavigation;
var _c;
$RefreshReg$(_c, "LandingPageNavigation");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/molecules/m-landing-page-hero/index.tsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/components/molecules/m-landing-page-hero/index.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/components/molecules/m-landing-page-hero/index.tsx"
  );
  import.meta.hot.lastModified = "1706671239059.1768";
}
var LandingPageHero = () => {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { id: "who-we-are", className: "flex flex-col w-full mt-10 items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "md:p-14 md:py-28", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h1", { className: "text-center font-bold text-4xl md:text-6xl", children: [
      "Decentralized Finance: ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("br", {}, void 0, false, {
        fileName: "app/components/molecules/m-landing-page-hero/index.tsx",
        lineNumber: 26,
        columnNumber: 34
      }, this),
      " Earn interest & borrow assets"
    ] }, void 0, true, {
      fileName: "app/components/molecules/m-landing-page-hero/index.tsx",
      lineNumber: 25,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("p", { className: "mt-4 text-center", children: "Zaibatsu provides a decentralized, zero-loss and competitive lending and borrowing platform for the common man." }, void 0, false, {
      fileName: "app/components/molecules/m-landing-page-hero/index.tsx",
      lineNumber: 28,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "flex w-full flex-col md:flex-row justify-center mt-10 items-center gap-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Link, { className: "bg-primary p-3 px-14 rounded-3xl w-full max-w-52 flex items-center justify-center hover:bg-primary/70 transition-all text-white", to: "#", children: "Lend" }, void 0, false, {
        fileName: "app/components/molecules/m-landing-page-hero/index.tsx",
        lineNumber: 33,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Link, { className: "border border-primary p-3 px-14 w-full max-w-52 flex items-center justify-center hover:bg-primary/20 transition-all rounded-3xl text-green-600", to: "#", children: "Borrow" }, void 0, false, {
        fileName: "app/components/molecules/m-landing-page-hero/index.tsx",
        lineNumber: 36,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/molecules/m-landing-page-hero/index.tsx",
      lineNumber: 32,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/molecules/m-landing-page-hero/index.tsx",
    lineNumber: 24,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/components/molecules/m-landing-page-hero/index.tsx",
    lineNumber: 23,
    columnNumber: 10
  }, this);
};
_c2 = LandingPageHero;
var m_landing_page_hero_default = LandingPageHero;
var _c2;
$RefreshReg$(_c2, "LandingPageHero");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// node_modules/.pnpm/react-icons@5.0.1_react@18.2.0/node_modules/react-icons/pi/index.mjs
function PiHandCoinsLight(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 256 256", "fill": "currentColor" }, "child": [{ "tag": "path", "attr": { "d": "M229.12,142.65a22.43,22.43,0,0,0-19.55-3.88l-45.24,10.4A26,26,0,0,0,140,114H89.94a29.78,29.78,0,0,0-21.21,8.79L45.52,146H16A14,14,0,0,0,2,160v40a14,14,0,0,0,14,14H120a6,6,0,0,0,1.46-.18l64-16a7.16,7.16,0,0,0,.89-.3L225.17,181l.33-.15a22.6,22.6,0,0,0,3.62-38.18ZM14,200V160a2,2,0,0,1,2-2H42v44H16A2,2,0,0,1,14,200Zm206.28-30-38.2,16.27L119.26,202H54V154.49l23.21-23.22A17.88,17.88,0,0,1,89.94,126H140a14,14,0,0,1,0,28H112a6,6,0,0,0,0,12h32a6,6,0,0,0,1.34-.15l67-15.41.24-.06A10.6,10.6,0,0,1,220.28,170ZM164,94a34.54,34.54,0,0,0,7.28-.78,34,34,0,1,0,25.46-42.43A34,34,0,1,0,164,94Zm62-10a22,22,0,1,1-22-22A22,22,0,0,1,226,84ZM164,38a21.94,21.94,0,0,1,21.51,17.49,34,34,0,0,0-15.38,25.65A22,22,0,1,1,164,38Z" }, "child": [] }] })(props);
}

// node_modules/.pnpm/react-icons@5.0.1_react@18.2.0/node_modules/react-icons/md/index.mjs
function MdOutlineCurrencyExchange(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "fill": "none", "d": "M0 0h24v24H0z" }, "child": [] }, { "tag": "path", "attr": { "d": "M12.89 11.1c-1.78-.59-2.64-.96-2.64-1.9 0-1.02 1.11-1.39 1.81-1.39 1.31 0 1.79.99 1.9 1.34l1.58-.67c-.15-.45-.82-1.92-2.54-2.24V5h-2v1.26c-2.48.56-2.49 2.86-2.49 2.96 0 2.27 2.25 2.91 3.35 3.31 1.58.56 2.28 1.07 2.28 2.03 0 1.13-1.05 1.61-1.98 1.61-1.82 0-2.34-1.87-2.4-2.09l-1.66.67c.63 2.19 2.28 2.78 2.9 2.96V19h2v-1.24c.4-.09 2.9-.59 2.9-3.22 0-1.39-.61-2.61-3.01-3.44zM3 21H1v-6h6v2H4.52c1.61 2.41 4.36 4 7.48 4a9 9 0 0 0 9-9h2c0 6.08-4.92 11-11 11-3.72 0-7.01-1.85-9-4.67V21zm-2-9C1 5.92 5.92 1 12 1c3.72 0 7.01 1.85 9 4.67V3h2v6h-6V7h2.48C17.87 4.59 15.12 3 12 3a9 9 0 0 0-9 9H1z" }, "child": [] }] })(props);
}

// app/components/molecules/m-landing-page-what-we-do/index.tsx
var import_jsx_dev_runtime3 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/components/molecules/m-landing-page-what-we-do/index.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/components/molecules/m-landing-page-what-we-do/index.tsx"
  );
  import.meta.hot.lastModified = "1706672153925.141";
}
var LandingPageWhatWeDo = () => {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { id: "what-we-do", className: "flex flex-col gap-8 w-full items-center justify-center mt-40 md:mt-4", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("h3", { className: "font-medium text-3xl md:text-5xl", children: "What we do" }, void 0, false, {
      fileName: "app/components/molecules/m-landing-page-what-we-do/index.tsx",
      lineNumber: 25,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("p", { className: "text-center", children: "Bridging the gap between decentralized and centralized currencies" }, void 0, false, {
      fileName: "app/components/molecules/m-landing-page-what-we-do/index.tsx",
      lineNumber: 26,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("ul", { className: "flex flex-col md:flex-row gap-12 items-center justify-evenly w-full", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "flex flex-col relative items-center justify-center gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "text-primary bg-primary/10 p-6 rounded-3xl", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(PiHandCoinsLight, { size: 52 }, void 0, false, {
          fileName: "app/components/molecules/m-landing-page-what-we-do/index.tsx",
          lineNumber: 32,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "app/components/molecules/m-landing-page-what-we-do/index.tsx",
          lineNumber: 31,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("p", { className: "font-medium text-xl", children: "Borrow" }, void 0, false, {
          fileName: "app/components/molecules/m-landing-page-what-we-do/index.tsx",
          lineNumber: 34,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("p", { className: "max-w-[276px] text-center", children: "Borrow at the interest rate and tenor that works for you" }, void 0, false, {
          fileName: "app/components/molecules/m-landing-page-what-we-do/index.tsx",
          lineNumber: 35,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("img", { src: "/assets/images/dark_wavy_line.svg", alt: "wavy line", className: "max-w-[250px] z-[-10] hidden xl:block absolute top-0 -right-[75%] self-start" }, void 0, false, {
          fileName: "app/components/molecules/m-landing-page-what-we-do/index.tsx",
          lineNumber: 38,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/molecules/m-landing-page-what-we-do/index.tsx",
        lineNumber: 30,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "flex flex-col relative items-center justify-center gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "text-primary bg-primary/10 p-6 rounded-3xl", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(PiHandCoinsLight, { size: 52 }, void 0, false, {
          fileName: "app/components/molecules/m-landing-page-what-we-do/index.tsx",
          lineNumber: 42,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "app/components/molecules/m-landing-page-what-we-do/index.tsx",
          lineNumber: 41,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("p", { className: "font-medium text-xl", children: "Lend" }, void 0, false, {
          fileName: "app/components/molecules/m-landing-page-what-we-do/index.tsx",
          lineNumber: 44,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("p", { className: "max-w-[276px] text-center", children: "Diversify your portfolio and lend to a wider range of borrowers" }, void 0, false, {
          fileName: "app/components/molecules/m-landing-page-what-we-do/index.tsx",
          lineNumber: 45,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("img", { src: "/assets/images/dark_wavy_line.svg", alt: "wavy line", className: "max-w-[250px] z-[-10] hidden xl:block absolute top-0 -right-[75%] self-start" }, void 0, false, {
          fileName: "app/components/molecules/m-landing-page-what-we-do/index.tsx",
          lineNumber: 48,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/molecules/m-landing-page-what-we-do/index.tsx",
        lineNumber: 40,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "flex flex-col items-center justify-center gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "text-primary bg-primary/10 p-6 rounded-3xl", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(MdOutlineCurrencyExchange, { size: 52 }, void 0, false, {
          fileName: "app/components/molecules/m-landing-page-what-we-do/index.tsx",
          lineNumber: 52,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "app/components/molecules/m-landing-page-what-we-do/index.tsx",
          lineNumber: 51,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("p", { className: "font-medium text-xl", children: "Convert" }, void 0, false, {
          fileName: "app/components/molecules/m-landing-page-what-we-do/index.tsx",
          lineNumber: 54,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("p", { className: "max-w-[276px] text-center", children: "Diversify your portfolio and lend to a wider range of borrowers" }, void 0, false, {
          fileName: "app/components/molecules/m-landing-page-what-we-do/index.tsx",
          lineNumber: 55,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/molecules/m-landing-page-what-we-do/index.tsx",
        lineNumber: 50,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/molecules/m-landing-page-what-we-do/index.tsx",
      lineNumber: 29,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/molecules/m-landing-page-what-we-do/index.tsx",
    lineNumber: 24,
    columnNumber: 10
  }, this);
};
_c3 = LandingPageWhatWeDo;
var m_landing_page_what_we_do_default = LandingPageWhatWeDo;
var _c3;
$RefreshReg$(_c3, "LandingPageWhatWeDo");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/molecules/m-landing-page-how-we-do-it/index.tsx
var import_jsx_dev_runtime4 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/components/molecules/m-landing-page-how-we-do-it/index.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/components/molecules/m-landing-page-how-we-do-it/index.tsx"
  );
  import.meta.hot.lastModified = "1706672105041.0208";
}
var LandingPageHowWeDoIt = () => {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "flex flex-col mt-32 gap-6 items-center justify-center", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("h3", { className: "font-medium text-3xl md:text-5xl", children: "How we do it" }, void 0, false, {
      fileName: "app/components/molecules/m-landing-page-how-we-do-it/index.tsx",
      lineNumber: 24,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("p", { className: "max-w-[530px] text-center", children: "How we offer our services including the methods we use, the technology used etc" }, void 0, false, {
      fileName: "app/components/molecules/m-landing-page-how-we-do-it/index.tsx",
      lineNumber: 25,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "flex flex-col flex-wrap items-center gap-16 md:gap-0 md:items-start mt-14 justify-evenly md:flex-row w-full", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "flex flex-col items-start md:mt-14 gap-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "bg-[#EFE4FC] shadow rounded-full p-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("img", { src: "/assets/images/green-upstatus.svg", alt: "up status" }, void 0, false, {
          fileName: "app/components/molecules/m-landing-page-how-we-do-it/index.tsx",
          lineNumber: 32,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "app/components/molecules/m-landing-page-how-we-do-it/index.tsx",
          lineNumber: 31,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("h4", { className: "font-medium text-2xl", children: "Create" }, void 0, false, {
          fileName: "app/components/molecules/m-landing-page-how-we-do-it/index.tsx",
          lineNumber: 34,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("p", { className: "max-w-[262px]", children: "Built on the secure and innovative algorand network, Zaibatsu operates without a central authority." }, void 0, false, {
          fileName: "app/components/molecules/m-landing-page-how-we-do-it/index.tsx",
          lineNumber: 35,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(Button, { className: "mt-6", type: "button", children: "Create" }, void 0, false, {
          fileName: "app/components/molecules/m-landing-page-how-we-do-it/index.tsx",
          lineNumber: 39,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/molecules/m-landing-page-how-we-do-it/index.tsx",
        lineNumber: 30,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "flex flex-col items-start gap-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "bg-[#EFE4FC] shadow rounded-full p-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("img", { src: "/assets/images/purple-pie-chart.svg", alt: "chart" }, void 0, false, {
          fileName: "app/components/molecules/m-landing-page-how-we-do-it/index.tsx",
          lineNumber: 45,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "app/components/molecules/m-landing-page-how-we-do-it/index.tsx",
          lineNumber: 44,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("h4", { className: "font-medium text-2xl", children: "Instant payment" }, void 0, false, {
          fileName: "app/components/molecules/m-landing-page-how-we-do-it/index.tsx",
          lineNumber: 47,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("p", { className: "max-w-[262px]", children: "Put NFTs on sale or on auction. Get paid for your digital collectables" }, void 0, false, {
          fileName: "app/components/molecules/m-landing-page-how-we-do-it/index.tsx",
          lineNumber: 48,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(Button, { className: "mt-6", type: "button", children: "Sale now" }, void 0, false, {
          fileName: "app/components/molecules/m-landing-page-how-we-do-it/index.tsx",
          lineNumber: 52,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/molecules/m-landing-page-how-we-do-it/index.tsx",
        lineNumber: 43,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "flex flex-col items-start md:mt-20 gap-4", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "bg-[#EFE4FC] shadow rounded-full p-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("img", { src: "/assets/images/favorite-chart.svg", alt: "chart" }, void 0, false, {
          fileName: "app/components/molecules/m-landing-page-how-we-do-it/index.tsx",
          lineNumber: 58,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "app/components/molecules/m-landing-page-how-we-do-it/index.tsx",
          lineNumber: 57,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("h4", { className: "font-medium text-2xl", children: "Set up your wallet" }, void 0, false, {
          fileName: "app/components/molecules/m-landing-page-how-we-do-it/index.tsx",
          lineNumber: 60,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("p", { className: "max-w-[262px]", children: "Once you\u2019ve set up your wallet of choice, connect it by clicking the wallet icon in the top right corner." }, void 0, false, {
          fileName: "app/components/molecules/m-landing-page-how-we-do-it/index.tsx",
          lineNumber: 61,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(Button, { className: "mt-6", type: "button", children: "Sale now" }, void 0, false, {
          fileName: "app/components/molecules/m-landing-page-how-we-do-it/index.tsx",
          lineNumber: 65,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/molecules/m-landing-page-how-we-do-it/index.tsx",
        lineNumber: 56,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/molecules/m-landing-page-how-we-do-it/index.tsx",
      lineNumber: 29,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/molecules/m-landing-page-how-we-do-it/index.tsx",
    lineNumber: 23,
    columnNumber: 10
  }, this);
};
_c4 = LandingPageHowWeDoIt;
var m_landing_page_how_we_do_it_default = LandingPageHowWeDoIt;
var _c4;
$RefreshReg$(_c4, "LandingPageHowWeDoIt");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// node_modules/.pnpm/react-icons@5.0.1_react@18.2.0/node_modules/react-icons/go/index.mjs
function GoArrowUpRight(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "d": "M18.25 15.5a.75.75 0 0 1-.75-.75V7.56L7.28 17.78a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L16.44 6.5H9.25a.75.75 0 0 1 0-1.5h9a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-.75.75Z" }, "child": [] }] })(props);
}
function GoLock(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "d": "M6 9V7.25C6 3.845 8.503 1 12 1s6 2.845 6 6.25V9h.5a2.5 2.5 0 0 1 2.5 2.5v8a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 19.5v-8A2.5 2.5 0 0 1 5.5 9Zm-1.5 2.5v8a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-13a1 1 0 0 0-1 1Zm3-4.25V9h9V7.25c0-2.67-1.922-4.75-4.5-4.75-2.578 0-4.5 2.08-4.5 4.75Z" }, "child": [] }] })(props);
}

// node_modules/.pnpm/react-icons@5.0.1_react@18.2.0/node_modules/react-icons/fa/index.mjs
function FaTwitter(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 512 512" }, "child": [{ "tag": "path", "attr": { "d": "M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" }, "child": [] }] })(props);
}
function FaRegCheckCircle(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 512 512" }, "child": [{ "tag": "path", "attr": { "d": "M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z" }, "child": [] }] })(props);
}

// app/components/molecules/m-landing-page-why-choose-us/index.tsx
var import_jsx_dev_runtime5 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/components/molecules/m-landing-page-why-choose-us/index.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/components/molecules/m-landing-page-why-choose-us/index.tsx"
  );
  import.meta.hot.lastModified = "1706672072944.9495";
}
var LandingPageWhyChooseUs = () => {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex flex-col items-center justify-center mt-44", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("h3", { className: "font-bold text-3xl md:text-5xl text-primary", children: "Why choose us?" }, void 0, false, {
      fileName: "app/components/molecules/m-landing-page-why-choose-us/index.tsx",
      lineNumber: 25,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex flex-col md:flex-row gap-16 md:gap-0 items-center flex-wrap justify-evenly md:px-10 w-full mt-10", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "border p-8 py-10 flex font-inter md:even:mt-20 flex-col gap-4 rounded-2xl max-w-[277px]", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(GoLock, { className: "text-primary", size: 36 }, void 0, false, {
          fileName: "app/components/molecules/m-landing-page-why-choose-us/index.tsx",
          lineNumber: 30,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("h4", { className: "font-bold text-2xl", children: [
          "Security ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("br", {}, void 0, false, {
            fileName: "app/components/molecules/m-landing-page-why-choose-us/index.tsx",
            lineNumber: 32,
            columnNumber: 22
          }, this),
          " Focused"
        ] }, void 0, true, {
          fileName: "app/components/molecules/m-landing-page-why-choose-us/index.tsx",
          lineNumber: 31,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("p", { children: "With on-chain transactions and smart contracts, your money stays safe and accessible, every step of the way." }, void 0, false, {
          fileName: "app/components/molecules/m-landing-page-why-choose-us/index.tsx",
          lineNumber: 34,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/molecules/m-landing-page-why-choose-us/index.tsx",
        lineNumber: 29,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "border p-8 py-10 flex font-inter md:even:mt-20 flex-col gap-4 rounded-2xl max-w-[277px]", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(FaRegCheckCircle, { className: "text-primary", size: 36 }, void 0, false, {
          fileName: "app/components/molecules/m-landing-page-why-choose-us/index.tsx",
          lineNumber: 40,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("h4", { className: "font-bold text-2xl", children: [
          "Trans ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("br", {}, void 0, false, {
            fileName: "app/components/molecules/m-landing-page-why-choose-us/index.tsx",
            lineNumber: 42,
            columnNumber: 19
          }, this),
          " parent"
        ] }, void 0, true, {
          fileName: "app/components/molecules/m-landing-page-why-choose-us/index.tsx",
          lineNumber: 41,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("p", { children: "All transactions on our platform are recorded on the blockchain, and fully visible to all users." }, void 0, false, {
          fileName: "app/components/molecules/m-landing-page-why-choose-us/index.tsx",
          lineNumber: 44,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/molecules/m-landing-page-why-choose-us/index.tsx",
        lineNumber: 39,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "border p-8 py-10 flex font-inter md:even:mt-20 flex-col gap-4 rounded-2xl max-w-[277px]", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("img", { className: "w-9 h-12", src: "/assets/images/clipboard-badge.svg", alt: "clipboard badge" }, void 0, false, {
          fileName: "app/components/molecules/m-landing-page-why-choose-us/index.tsx",
          lineNumber: 50,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("h4", { className: "font-bold text-2xl", children: [
          "Access ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("br", {}, void 0, false, {
            fileName: "app/components/molecules/m-landing-page-why-choose-us/index.tsx",
            lineNumber: 52,
            columnNumber: 20
          }, this),
          " ible"
        ] }, void 0, true, {
          fileName: "app/components/molecules/m-landing-page-why-choose-us/index.tsx",
          lineNumber: 51,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("p", { children: "Our platform is open to anyone with an internet connection, regardless of their location or credit history." }, void 0, false, {
          fileName: "app/components/molecules/m-landing-page-why-choose-us/index.tsx",
          lineNumber: 54,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/molecules/m-landing-page-why-choose-us/index.tsx",
        lineNumber: 49,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "border p-8 py-10 flex font-inter md:even:mt-20 flex-col gap-4 rounded-2xl max-w-[277px]", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("img", { className: "w-9 h-12", src: "/assets/images/user-cycle.svg", alt: "clipboard badge" }, void 0, false, {
          fileName: "app/components/molecules/m-landing-page-why-choose-us/index.tsx",
          lineNumber: 60,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("h4", { className: "font-bold text-2xl", children: [
          "User ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("br", {}, void 0, false, {
            fileName: "app/components/molecules/m-landing-page-why-choose-us/index.tsx",
            lineNumber: 62,
            columnNumber: 18
          }, this),
          " Friendly"
        ] }, void 0, true, {
          fileName: "app/components/molecules/m-landing-page-why-choose-us/index.tsx",
          lineNumber: 61,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("p", { children: "An easy-to-use interface that is simple enough for people of all technical backgrounds to use." }, void 0, false, {
          fileName: "app/components/molecules/m-landing-page-why-choose-us/index.tsx",
          lineNumber: 64,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/molecules/m-landing-page-why-choose-us/index.tsx",
        lineNumber: 59,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/molecules/m-landing-page-why-choose-us/index.tsx",
      lineNumber: 28,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/molecules/m-landing-page-why-choose-us/index.tsx",
    lineNumber: 24,
    columnNumber: 10
  }, this);
};
_c5 = LandingPageWhyChooseUs;
var m_landing_page_why_choose_us_default = LandingPageWhyChooseUs;
var _c5;
$RefreshReg$(_c5, "LandingPageWhyChooseUs");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/ui/accordion.tsx
var React2 = __toESM(require_react(), 1);

// node_modules/.pnpm/@radix-ui+react-accordion@1.1.2_@types+react-dom@18.2.18_@types+react@18.2.48_react-dom@18.2.0_react@18.2.0/node_modules/@radix-ui/react-accordion/dist/index.mjs
var import_react7 = __toESM(require_react(), 1);

// node_modules/.pnpm/@radix-ui+react-collection@1.0.3_@types+react-dom@18.2.18_@types+react@18.2.48_react-dom@18.2.0_react@18.2.0/node_modules/@radix-ui/react-collection/dist/index.mjs
var import_react4 = __toESM(require_react(), 1);
function $e02a7d9cb1dc128c$export$c74125a8e3af6bb2(name) {
  const PROVIDER_NAME = name + "CollectionProvider";
  const [createCollectionContext, createCollectionScope] = $c512c27ab02ef895$export$50c7b4e9d9f19c1(PROVIDER_NAME);
  const [CollectionProviderImpl, useCollectionContext] = createCollectionContext(PROVIDER_NAME, {
    collectionRef: {
      current: null
    },
    itemMap: /* @__PURE__ */ new Map()
  });
  const CollectionProvider = (props) => {
    const { scope, children } = props;
    const ref = import_react4.default.useRef(null);
    const itemMap = import_react4.default.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ import_react4.default.createElement(CollectionProviderImpl, {
      scope,
      itemMap,
      collectionRef: ref
    }, children);
  };
  /* @__PURE__ */ Object.assign(CollectionProvider, {
    displayName: PROVIDER_NAME
  });
  const COLLECTION_SLOT_NAME = name + "CollectionSlot";
  const CollectionSlot = /* @__PURE__ */ import_react4.default.forwardRef((props, forwardedRef) => {
    const { scope, children } = props;
    const context = useCollectionContext(COLLECTION_SLOT_NAME, scope);
    const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(forwardedRef, context.collectionRef);
    return /* @__PURE__ */ import_react4.default.createElement($5e63c961fc1ce211$export$8c6ed5c666ac1360, {
      ref: composedRefs
    }, children);
  });
  /* @__PURE__ */ Object.assign(CollectionSlot, {
    displayName: COLLECTION_SLOT_NAME
  });
  const ITEM_SLOT_NAME = name + "CollectionItemSlot";
  const ITEM_DATA_ATTR = "data-radix-collection-item";
  const CollectionItemSlot = /* @__PURE__ */ import_react4.default.forwardRef((props, forwardedRef) => {
    const { scope, children, ...itemData } = props;
    const ref = import_react4.default.useRef(null);
    const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(forwardedRef, ref);
    const context = useCollectionContext(ITEM_SLOT_NAME, scope);
    import_react4.default.useEffect(() => {
      context.itemMap.set(ref, {
        ref,
        ...itemData
      });
      return () => void context.itemMap.delete(ref);
    });
    return /* @__PURE__ */ import_react4.default.createElement($5e63c961fc1ce211$export$8c6ed5c666ac1360, {
      [ITEM_DATA_ATTR]: "",
      ref: composedRefs
    }, children);
  });
  /* @__PURE__ */ Object.assign(CollectionItemSlot, {
    displayName: ITEM_SLOT_NAME
  });
  function useCollection(scope) {
    const context = useCollectionContext(name + "CollectionConsumer", scope);
    const getItems = import_react4.default.useCallback(() => {
      const collectionNode = context.collectionRef.current;
      if (!collectionNode)
        return [];
      const orderedNodes = Array.from(collectionNode.querySelectorAll(`[${ITEM_DATA_ATTR}]`));
      const items = Array.from(context.itemMap.values());
      const orderedItems = items.sort(
        (a, b) => orderedNodes.indexOf(a.ref.current) - orderedNodes.indexOf(b.ref.current)
      );
      return orderedItems;
    }, [
      context.collectionRef,
      context.itemMap
    ]);
    return getItems;
  }
  return [
    {
      Provider: CollectionProvider,
      Slot: CollectionSlot,
      ItemSlot: CollectionItemSlot
    },
    useCollection,
    createCollectionScope
  ];
}

// node_modules/.pnpm/@radix-ui+react-collapsible@1.0.3_@types+react-dom@18.2.18_@types+react@18.2.48_react-dom@18.2.0_react@18.2.0/node_modules/@radix-ui/react-collapsible/dist/index.mjs
var import_react5 = __toESM(require_react(), 1);
var $409067139f391064$var$COLLAPSIBLE_NAME = "Collapsible";
var [$409067139f391064$var$createCollapsibleContext, $409067139f391064$export$952b32dcbe73087a] = $c512c27ab02ef895$export$50c7b4e9d9f19c1($409067139f391064$var$COLLAPSIBLE_NAME);
var [$409067139f391064$var$CollapsibleProvider, $409067139f391064$var$useCollapsibleContext] = $409067139f391064$var$createCollapsibleContext($409067139f391064$var$COLLAPSIBLE_NAME);
var $409067139f391064$export$6eb0f7ddcda6131f = /* @__PURE__ */ (0, import_react5.forwardRef)((props, forwardedRef) => {
  const { __scopeCollapsible, open: openProp, defaultOpen, disabled, onOpenChange, ...collapsibleProps } = props;
  const [open = false, setOpen] = $71cd76cc60e0454e$export$6f32135080cb4c3({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange
  });
  return /* @__PURE__ */ (0, import_react5.createElement)($409067139f391064$var$CollapsibleProvider, {
    scope: __scopeCollapsible,
    disabled,
    contentId: $1746a345f3d73bb7$export$f680877a34711e37(),
    open,
    onOpenToggle: (0, import_react5.useCallback)(
      () => setOpen(
        (prevOpen) => !prevOpen
      ),
      [
        setOpen
      ]
    )
  }, /* @__PURE__ */ (0, import_react5.createElement)($8927f6f2acc4f386$export$250ffa63cdc0d034.div, _extends({
    "data-state": $409067139f391064$var$getState(open),
    "data-disabled": disabled ? "" : void 0
  }, collapsibleProps, {
    ref: forwardedRef
  })));
});
var $409067139f391064$var$TRIGGER_NAME = "CollapsibleTrigger";
var $409067139f391064$export$c135dce7b15bbbdc = /* @__PURE__ */ (0, import_react5.forwardRef)((props, forwardedRef) => {
  const { __scopeCollapsible, ...triggerProps } = props;
  const context = $409067139f391064$var$useCollapsibleContext($409067139f391064$var$TRIGGER_NAME, __scopeCollapsible);
  return /* @__PURE__ */ (0, import_react5.createElement)($8927f6f2acc4f386$export$250ffa63cdc0d034.button, _extends({
    type: "button",
    "aria-controls": context.contentId,
    "aria-expanded": context.open || false,
    "data-state": $409067139f391064$var$getState(context.open),
    "data-disabled": context.disabled ? "" : void 0,
    disabled: context.disabled
  }, triggerProps, {
    ref: forwardedRef,
    onClick: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onClick, context.onOpenToggle)
  }));
});
var $409067139f391064$var$CONTENT_NAME = "CollapsibleContent";
var $409067139f391064$export$aadde00976f34151 = /* @__PURE__ */ (0, import_react5.forwardRef)((props, forwardedRef) => {
  const { forceMount, ...contentProps } = props;
  const context = $409067139f391064$var$useCollapsibleContext($409067139f391064$var$CONTENT_NAME, props.__scopeCollapsible);
  return /* @__PURE__ */ (0, import_react5.createElement)(
    $921a889cee6df7e8$export$99c2b779aa4e8b8b,
    {
      present: forceMount || context.open
    },
    ({ present }) => /* @__PURE__ */ (0, import_react5.createElement)($409067139f391064$var$CollapsibleContentImpl, _extends({}, contentProps, {
      ref: forwardedRef,
      present
    }))
  );
});
var $409067139f391064$var$CollapsibleContentImpl = /* @__PURE__ */ (0, import_react5.forwardRef)((props, forwardedRef) => {
  const { __scopeCollapsible, present, children, ...contentProps } = props;
  const context = $409067139f391064$var$useCollapsibleContext($409067139f391064$var$CONTENT_NAME, __scopeCollapsible);
  const [isPresent, setIsPresent] = (0, import_react5.useState)(present);
  const ref = (0, import_react5.useRef)(null);
  const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(forwardedRef, ref);
  const heightRef = (0, import_react5.useRef)(0);
  const height = heightRef.current;
  const widthRef = (0, import_react5.useRef)(0);
  const width = widthRef.current;
  const isOpen = context.open || isPresent;
  const isMountAnimationPreventedRef = (0, import_react5.useRef)(isOpen);
  const originalStylesRef = (0, import_react5.useRef)();
  (0, import_react5.useEffect)(() => {
    const rAF = requestAnimationFrame(
      () => isMountAnimationPreventedRef.current = false
    );
    return () => cancelAnimationFrame(rAF);
  }, []);
  $9f79659886946c16$export$e5c5a5f917a5871c(() => {
    const node = ref.current;
    if (node) {
      originalStylesRef.current = originalStylesRef.current || {
        transitionDuration: node.style.transitionDuration,
        animationName: node.style.animationName
      };
      node.style.transitionDuration = "0s";
      node.style.animationName = "none";
      const rect = node.getBoundingClientRect();
      heightRef.current = rect.height;
      widthRef.current = rect.width;
      if (!isMountAnimationPreventedRef.current) {
        node.style.transitionDuration = originalStylesRef.current.transitionDuration;
        node.style.animationName = originalStylesRef.current.animationName;
      }
      setIsPresent(present);
    }
  }, [
    context.open,
    present
  ]);
  return /* @__PURE__ */ (0, import_react5.createElement)($8927f6f2acc4f386$export$250ffa63cdc0d034.div, _extends({
    "data-state": $409067139f391064$var$getState(context.open),
    "data-disabled": context.disabled ? "" : void 0,
    id: context.contentId,
    hidden: !isOpen
  }, contentProps, {
    ref: composedRefs,
    style: {
      [`--radix-collapsible-content-height`]: height ? `${height}px` : void 0,
      [`--radix-collapsible-content-width`]: width ? `${width}px` : void 0,
      ...props.style
    }
  }), isOpen && children);
});
function $409067139f391064$var$getState(open) {
  return open ? "open" : "closed";
}
var $409067139f391064$export$be92b6f5f03c0fe9 = $409067139f391064$export$6eb0f7ddcda6131f;
var $409067139f391064$export$41fb9f06171c75f4 = $409067139f391064$export$c135dce7b15bbbdc;
var $409067139f391064$export$7c6e2c02157bb7d2 = $409067139f391064$export$aadde00976f34151;

// node_modules/.pnpm/@radix-ui+react-direction@1.0.1_@types+react@18.2.48_react@18.2.0/node_modules/@radix-ui/react-direction/dist/index.mjs
var import_react6 = __toESM(require_react(), 1);
var $f631663db3294ace$var$DirectionContext = /* @__PURE__ */ (0, import_react6.createContext)(void 0);
function $f631663db3294ace$export$b39126d51d94e6f3(localDir) {
  const globalDir = (0, import_react6.useContext)($f631663db3294ace$var$DirectionContext);
  return localDir || globalDir || "ltr";
}

// node_modules/.pnpm/@radix-ui+react-accordion@1.1.2_@types+react-dom@18.2.18_@types+react@18.2.48_react-dom@18.2.0_react@18.2.0/node_modules/@radix-ui/react-accordion/dist/index.mjs
var $1bf158f521e1b1b4$var$ACCORDION_NAME = "Accordion";
var $1bf158f521e1b1b4$var$ACCORDION_KEYS = [
  "Home",
  "End",
  "ArrowDown",
  "ArrowUp",
  "ArrowLeft",
  "ArrowRight"
];
var [$1bf158f521e1b1b4$var$Collection, $1bf158f521e1b1b4$var$useCollection, $1bf158f521e1b1b4$var$createCollectionScope] = $e02a7d9cb1dc128c$export$c74125a8e3af6bb2($1bf158f521e1b1b4$var$ACCORDION_NAME);
var [$1bf158f521e1b1b4$var$createAccordionContext, $1bf158f521e1b1b4$export$9748edc328a73be1] = $c512c27ab02ef895$export$50c7b4e9d9f19c1($1bf158f521e1b1b4$var$ACCORDION_NAME, [
  $1bf158f521e1b1b4$var$createCollectionScope,
  $409067139f391064$export$952b32dcbe73087a
]);
var $1bf158f521e1b1b4$var$useCollapsibleScope = $409067139f391064$export$952b32dcbe73087a();
var $1bf158f521e1b1b4$export$a766cd26d0d69044 = /* @__PURE__ */ import_react7.default.forwardRef((props, forwardedRef) => {
  const { type, ...accordionProps } = props;
  const singleProps = accordionProps;
  const multipleProps = accordionProps;
  return /* @__PURE__ */ import_react7.default.createElement($1bf158f521e1b1b4$var$Collection.Provider, {
    scope: props.__scopeAccordion
  }, type === "multiple" ? /* @__PURE__ */ import_react7.default.createElement($1bf158f521e1b1b4$var$AccordionImplMultiple, _extends({}, multipleProps, {
    ref: forwardedRef
  })) : /* @__PURE__ */ import_react7.default.createElement($1bf158f521e1b1b4$var$AccordionImplSingle, _extends({}, singleProps, {
    ref: forwardedRef
  })));
});
$1bf158f521e1b1b4$export$a766cd26d0d69044.propTypes = {
  type(props) {
    const value = props.value || props.defaultValue;
    if (props.type && ![
      "single",
      "multiple"
    ].includes(props.type))
      return new Error("Invalid prop `type` supplied to `Accordion`. Expected one of `single | multiple`.");
    if (props.type === "multiple" && typeof value === "string")
      return new Error("Invalid prop `type` supplied to `Accordion`. Expected `single` when `defaultValue` or `value` is type `string`.");
    if (props.type === "single" && Array.isArray(value))
      return new Error("Invalid prop `type` supplied to `Accordion`. Expected `multiple` when `defaultValue` or `value` is type `string[]`.");
    return null;
  }
};
var [$1bf158f521e1b1b4$var$AccordionValueProvider, $1bf158f521e1b1b4$var$useAccordionValueContext] = $1bf158f521e1b1b4$var$createAccordionContext($1bf158f521e1b1b4$var$ACCORDION_NAME);
var [$1bf158f521e1b1b4$var$AccordionCollapsibleProvider, $1bf158f521e1b1b4$var$useAccordionCollapsibleContext] = $1bf158f521e1b1b4$var$createAccordionContext($1bf158f521e1b1b4$var$ACCORDION_NAME, {
  collapsible: false
});
var $1bf158f521e1b1b4$var$AccordionImplSingle = /* @__PURE__ */ import_react7.default.forwardRef((props, forwardedRef) => {
  const { value: valueProp, defaultValue, onValueChange = () => {
  }, collapsible = false, ...accordionSingleProps } = props;
  const [value, setValue] = $71cd76cc60e0454e$export$6f32135080cb4c3({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange
  });
  return /* @__PURE__ */ import_react7.default.createElement($1bf158f521e1b1b4$var$AccordionValueProvider, {
    scope: props.__scopeAccordion,
    value: value ? [
      value
    ] : [],
    onItemOpen: setValue,
    onItemClose: import_react7.default.useCallback(
      () => collapsible && setValue(""),
      [
        collapsible,
        setValue
      ]
    )
  }, /* @__PURE__ */ import_react7.default.createElement($1bf158f521e1b1b4$var$AccordionCollapsibleProvider, {
    scope: props.__scopeAccordion,
    collapsible
  }, /* @__PURE__ */ import_react7.default.createElement($1bf158f521e1b1b4$var$AccordionImpl, _extends({}, accordionSingleProps, {
    ref: forwardedRef
  }))));
});
var $1bf158f521e1b1b4$var$AccordionImplMultiple = /* @__PURE__ */ import_react7.default.forwardRef((props, forwardedRef) => {
  const { value: valueProp, defaultValue, onValueChange = () => {
  }, ...accordionMultipleProps } = props;
  const [value1 = [], setValue] = $71cd76cc60e0454e$export$6f32135080cb4c3({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange
  });
  const handleItemOpen = import_react7.default.useCallback(
    (itemValue) => setValue(
      (prevValue = []) => [
        ...prevValue,
        itemValue
      ]
    ),
    [
      setValue
    ]
  );
  const handleItemClose = import_react7.default.useCallback(
    (itemValue) => setValue(
      (prevValue = []) => prevValue.filter(
        (value) => value !== itemValue
      )
    ),
    [
      setValue
    ]
  );
  return /* @__PURE__ */ import_react7.default.createElement($1bf158f521e1b1b4$var$AccordionValueProvider, {
    scope: props.__scopeAccordion,
    value: value1,
    onItemOpen: handleItemOpen,
    onItemClose: handleItemClose
  }, /* @__PURE__ */ import_react7.default.createElement($1bf158f521e1b1b4$var$AccordionCollapsibleProvider, {
    scope: props.__scopeAccordion,
    collapsible: true
  }, /* @__PURE__ */ import_react7.default.createElement($1bf158f521e1b1b4$var$AccordionImpl, _extends({}, accordionMultipleProps, {
    ref: forwardedRef
  }))));
});
var [$1bf158f521e1b1b4$var$AccordionImplProvider, $1bf158f521e1b1b4$var$useAccordionContext] = $1bf158f521e1b1b4$var$createAccordionContext($1bf158f521e1b1b4$var$ACCORDION_NAME);
var $1bf158f521e1b1b4$var$AccordionImpl = /* @__PURE__ */ import_react7.default.forwardRef((props, forwardedRef) => {
  const { __scopeAccordion, disabled, dir, orientation = "vertical", ...accordionProps } = props;
  const accordionRef = import_react7.default.useRef(null);
  const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(accordionRef, forwardedRef);
  const getItems = $1bf158f521e1b1b4$var$useCollection(__scopeAccordion);
  const direction = $f631663db3294ace$export$b39126d51d94e6f3(dir);
  const isDirectionLTR = direction === "ltr";
  const handleKeyDown = $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onKeyDown, (event) => {
    var _triggerCollection$cl;
    if (!$1bf158f521e1b1b4$var$ACCORDION_KEYS.includes(event.key))
      return;
    const target = event.target;
    const triggerCollection = getItems().filter((item) => {
      var _item$ref$current;
      return !((_item$ref$current = item.ref.current) !== null && _item$ref$current !== void 0 && _item$ref$current.disabled);
    });
    const triggerIndex = triggerCollection.findIndex(
      (item) => item.ref.current === target
    );
    const triggerCount = triggerCollection.length;
    if (triggerIndex === -1)
      return;
    event.preventDefault();
    let nextIndex = triggerIndex;
    const homeIndex = 0;
    const endIndex = triggerCount - 1;
    const moveNext = () => {
      nextIndex = triggerIndex + 1;
      if (nextIndex > endIndex)
        nextIndex = homeIndex;
    };
    const movePrev = () => {
      nextIndex = triggerIndex - 1;
      if (nextIndex < homeIndex)
        nextIndex = endIndex;
    };
    switch (event.key) {
      case "Home":
        nextIndex = homeIndex;
        break;
      case "End":
        nextIndex = endIndex;
        break;
      case "ArrowRight":
        if (orientation === "horizontal") {
          if (isDirectionLTR)
            moveNext();
          else
            movePrev();
        }
        break;
      case "ArrowDown":
        if (orientation === "vertical")
          moveNext();
        break;
      case "ArrowLeft":
        if (orientation === "horizontal") {
          if (isDirectionLTR)
            movePrev();
          else
            moveNext();
        }
        break;
      case "ArrowUp":
        if (orientation === "vertical")
          movePrev();
        break;
    }
    const clampedIndex = nextIndex % triggerCount;
    (_triggerCollection$cl = triggerCollection[clampedIndex].ref.current) === null || _triggerCollection$cl === void 0 || _triggerCollection$cl.focus();
  });
  return /* @__PURE__ */ import_react7.default.createElement($1bf158f521e1b1b4$var$AccordionImplProvider, {
    scope: __scopeAccordion,
    disabled,
    direction: dir,
    orientation
  }, /* @__PURE__ */ import_react7.default.createElement($1bf158f521e1b1b4$var$Collection.Slot, {
    scope: __scopeAccordion
  }, /* @__PURE__ */ import_react7.default.createElement($8927f6f2acc4f386$export$250ffa63cdc0d034.div, _extends({}, accordionProps, {
    "data-orientation": orientation,
    ref: composedRefs,
    onKeyDown: disabled ? void 0 : handleKeyDown
  }))));
});
var $1bf158f521e1b1b4$var$ITEM_NAME = "AccordionItem";
var [$1bf158f521e1b1b4$var$AccordionItemProvider, $1bf158f521e1b1b4$var$useAccordionItemContext] = $1bf158f521e1b1b4$var$createAccordionContext($1bf158f521e1b1b4$var$ITEM_NAME);
var $1bf158f521e1b1b4$export$d99097c13d4dac9f = /* @__PURE__ */ import_react7.default.forwardRef((props, forwardedRef) => {
  const { __scopeAccordion, value, ...accordionItemProps } = props;
  const accordionContext = $1bf158f521e1b1b4$var$useAccordionContext($1bf158f521e1b1b4$var$ITEM_NAME, __scopeAccordion);
  const valueContext = $1bf158f521e1b1b4$var$useAccordionValueContext($1bf158f521e1b1b4$var$ITEM_NAME, __scopeAccordion);
  const collapsibleScope = $1bf158f521e1b1b4$var$useCollapsibleScope(__scopeAccordion);
  const triggerId = $1746a345f3d73bb7$export$f680877a34711e37();
  const open1 = value && valueContext.value.includes(value) || false;
  const disabled = accordionContext.disabled || props.disabled;
  return /* @__PURE__ */ import_react7.default.createElement($1bf158f521e1b1b4$var$AccordionItemProvider, {
    scope: __scopeAccordion,
    open: open1,
    disabled,
    triggerId
  }, /* @__PURE__ */ import_react7.default.createElement($409067139f391064$export$be92b6f5f03c0fe9, _extends({
    "data-orientation": accordionContext.orientation,
    "data-state": $1bf158f521e1b1b4$var$getState(open1)
  }, collapsibleScope, accordionItemProps, {
    ref: forwardedRef,
    disabled,
    open: open1,
    onOpenChange: (open) => {
      if (open)
        valueContext.onItemOpen(value);
      else
        valueContext.onItemClose(value);
    }
  })));
});
var $1bf158f521e1b1b4$var$HEADER_NAME = "AccordionHeader";
var $1bf158f521e1b1b4$export$5e3e5deaaf81ee41 = /* @__PURE__ */ import_react7.default.forwardRef((props, forwardedRef) => {
  const { __scopeAccordion, ...headerProps } = props;
  const accordionContext = $1bf158f521e1b1b4$var$useAccordionContext($1bf158f521e1b1b4$var$ACCORDION_NAME, __scopeAccordion);
  const itemContext = $1bf158f521e1b1b4$var$useAccordionItemContext($1bf158f521e1b1b4$var$HEADER_NAME, __scopeAccordion);
  return /* @__PURE__ */ import_react7.default.createElement($8927f6f2acc4f386$export$250ffa63cdc0d034.h3, _extends({
    "data-orientation": accordionContext.orientation,
    "data-state": $1bf158f521e1b1b4$var$getState(itemContext.open),
    "data-disabled": itemContext.disabled ? "" : void 0
  }, headerProps, {
    ref: forwardedRef
  }));
});
var $1bf158f521e1b1b4$var$TRIGGER_NAME = "AccordionTrigger";
var $1bf158f521e1b1b4$export$94e939b1f85bdd73 = /* @__PURE__ */ import_react7.default.forwardRef((props, forwardedRef) => {
  const { __scopeAccordion, ...triggerProps } = props;
  const accordionContext = $1bf158f521e1b1b4$var$useAccordionContext($1bf158f521e1b1b4$var$ACCORDION_NAME, __scopeAccordion);
  const itemContext = $1bf158f521e1b1b4$var$useAccordionItemContext($1bf158f521e1b1b4$var$TRIGGER_NAME, __scopeAccordion);
  const collapsibleContext = $1bf158f521e1b1b4$var$useAccordionCollapsibleContext($1bf158f521e1b1b4$var$TRIGGER_NAME, __scopeAccordion);
  const collapsibleScope = $1bf158f521e1b1b4$var$useCollapsibleScope(__scopeAccordion);
  return /* @__PURE__ */ import_react7.default.createElement($1bf158f521e1b1b4$var$Collection.ItemSlot, {
    scope: __scopeAccordion
  }, /* @__PURE__ */ import_react7.default.createElement($409067139f391064$export$41fb9f06171c75f4, _extends({
    "aria-disabled": itemContext.open && !collapsibleContext.collapsible || void 0,
    "data-orientation": accordionContext.orientation,
    id: itemContext.triggerId
  }, collapsibleScope, triggerProps, {
    ref: forwardedRef
  })));
});
var $1bf158f521e1b1b4$var$CONTENT_NAME = "AccordionContent";
var $1bf158f521e1b1b4$export$985b9a77379b54a0 = /* @__PURE__ */ import_react7.default.forwardRef((props, forwardedRef) => {
  const { __scopeAccordion, ...contentProps } = props;
  const accordionContext = $1bf158f521e1b1b4$var$useAccordionContext($1bf158f521e1b1b4$var$ACCORDION_NAME, __scopeAccordion);
  const itemContext = $1bf158f521e1b1b4$var$useAccordionItemContext($1bf158f521e1b1b4$var$CONTENT_NAME, __scopeAccordion);
  const collapsibleScope = $1bf158f521e1b1b4$var$useCollapsibleScope(__scopeAccordion);
  return /* @__PURE__ */ import_react7.default.createElement($409067139f391064$export$7c6e2c02157bb7d2, _extends({
    role: "region",
    "aria-labelledby": itemContext.triggerId,
    "data-orientation": accordionContext.orientation
  }, collapsibleScope, contentProps, {
    ref: forwardedRef,
    style: {
      ["--radix-accordion-content-height"]: "var(--radix-collapsible-content-height)",
      ["--radix-accordion-content-width"]: "var(--radix-collapsible-content-width)",
      ...props.style
    }
  }));
});
function $1bf158f521e1b1b4$var$getState(open) {
  return open ? "open" : "closed";
}
var $1bf158f521e1b1b4$export$be92b6f5f03c0fe9 = $1bf158f521e1b1b4$export$a766cd26d0d69044;
var $1bf158f521e1b1b4$export$6d08773d2e66f8f2 = $1bf158f521e1b1b4$export$d99097c13d4dac9f;
var $1bf158f521e1b1b4$export$8b251419efc915eb = $1bf158f521e1b1b4$export$5e3e5deaaf81ee41;
var $1bf158f521e1b1b4$export$41fb9f06171c75f4 = $1bf158f521e1b1b4$export$94e939b1f85bdd73;
var $1bf158f521e1b1b4$export$7c6e2c02157bb7d2 = $1bf158f521e1b1b4$export$985b9a77379b54a0;

// app/components/ui/accordion.tsx
var import_jsx_dev_runtime6 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/components/ui/accordion.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/components/ui/accordion.tsx"
  );
  import.meta.hot.lastModified = "1706792071015.9727";
}
var Accordion = $1bf158f521e1b1b4$export$be92b6f5f03c0fe9;
var AccordionItem = React2.forwardRef(_c6 = ({
  className,
  ...props
}, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)($1bf158f521e1b1b4$export$6d08773d2e66f8f2, { ref, className: cn("border-b", className), ...props }, void 0, false, {
  fileName: "app/components/ui/accordion.tsx",
  lineNumber: 29,
  columnNumber: 12
}, this));
_c22 = AccordionItem;
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = React2.forwardRef(_c32 = ({
  className,
  children,
  ...props
}, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)($1bf158f521e1b1b4$export$8b251419efc915eb, { className: "flex", children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)($1bf158f521e1b1b4$export$41fb9f06171c75f4, { ref, className: cn("flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180", className), ...props, children: [
  children,
  /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(ChevronDownIcon, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" }, void 0, false, {
    fileName: "app/components/ui/accordion.tsx",
    lineNumber: 39,
    columnNumber: 7
  }, this)
] }, void 0, true, {
  fileName: "app/components/ui/accordion.tsx",
  lineNumber: 37,
  columnNumber: 5
}, this) }, void 0, false, {
  fileName: "app/components/ui/accordion.tsx",
  lineNumber: 36,
  columnNumber: 12
}, this));
_c42 = AccordionTrigger;
AccordionTrigger.displayName = $1bf158f521e1b1b4$export$41fb9f06171c75f4.displayName;
var AccordionContent = React2.forwardRef(_c52 = ({
  className,
  children,
  ...props
}, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)($1bf158f521e1b1b4$export$7c6e2c02157bb7d2, { ref, className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down", ...props, children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: cn("pb-4 pt-0", className), children }, void 0, false, {
  fileName: "app/components/ui/accordion.tsx",
  lineNumber: 49,
  columnNumber: 5
}, this) }, void 0, false, {
  fileName: "app/components/ui/accordion.tsx",
  lineNumber: 48,
  columnNumber: 12
}, this));
_c62 = AccordionContent;
AccordionContent.displayName = $1bf158f521e1b1b4$export$7c6e2c02157bb7d2.displayName;
var _c6;
var _c22;
var _c32;
var _c42;
var _c52;
var _c62;
$RefreshReg$(_c6, "AccordionItem$React.forwardRef");
$RefreshReg$(_c22, "AccordionItem");
$RefreshReg$(_c32, "AccordionTrigger$React.forwardRef");
$RefreshReg$(_c42, "AccordionTrigger");
$RefreshReg$(_c52, "AccordionContent$React.forwardRef");
$RefreshReg$(_c62, "AccordionContent");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/constants/landingpage/qAndAs.ts
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/constants/landingpage/qAndAs.ts"
  );
  import.meta.hot.lastModified = "1706794008117.4736";
}
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
];
var qAndAs_default = QandAs;

// app/components/molecules/m-landing-page-q-and-a/index.tsx
var import_jsx_dev_runtime7 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/components/molecules/m-landing-page-q-and-a/index.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/components/molecules/m-landing-page-q-and-a/index.tsx"
  );
  import.meta.hot.lastModified = "1706794433351.4246";
}
var LandingPageQAndA = () => {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "flex flex-col items-center font-inter w-full mt-32", children: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "bg-primary/5 max-w-[880px] w-full gap-28 py-16 flex flex-col items-center rounded-[72px] p-5", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "flex flex-col items-center justify-center font-bold ", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("h3", { className: "text-5xl", children: "Your questions," }, void 0, false, {
        fileName: "app/components/molecules/m-landing-page-q-and-a/index.tsx",
        lineNumber: 27,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("h3", { className: "text-5xl text-primary", children: "answered" }, void 0, false, {
        fileName: "app/components/molecules/m-landing-page-q-and-a/index.tsx",
        lineNumber: 28,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/molecules/m-landing-page-q-and-a/index.tsx",
      lineNumber: 26,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(Accordion, { type: "single", defaultValue: qAndAs_default[0].title, collapsible: true, className: "w-full max-w-[737px] border rounded-3xl p-12", children: qAndAs_default.map((qAndA) => /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(AccordionItem, { value: qAndA.title, className: "w-full", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(AccordionTrigger, { className: "font-semibold text-start text-xl w-full flex items-start justify-between", children: qAndA.title }, void 0, false, {
        fileName: "app/components/molecules/m-landing-page-q-and-a/index.tsx",
        lineNumber: 32,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(AccordionContent, { className: "font-normal flex flex-col gap-3", children: qAndA.paragraphs.map((p) => /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("p", { children: p }, void 0, false, {
        fileName: "app/components/molecules/m-landing-page-q-and-a/index.tsx",
        lineNumber: 36,
        columnNumber: 44
      }, this)) }, void 0, false, {
        fileName: "app/components/molecules/m-landing-page-q-and-a/index.tsx",
        lineNumber: 35,
        columnNumber: 15
      }, this)
    ] }, qAndA.title, true, {
      fileName: "app/components/molecules/m-landing-page-q-and-a/index.tsx",
      lineNumber: 31,
      columnNumber: 32
    }, this)) }, void 0, false, {
      fileName: "app/components/molecules/m-landing-page-q-and-a/index.tsx",
      lineNumber: 30,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/molecules/m-landing-page-q-and-a/index.tsx",
    lineNumber: 25,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/components/molecules/m-landing-page-q-and-a/index.tsx",
    lineNumber: 24,
    columnNumber: 10
  }, this);
};
_c7 = LandingPageQAndA;
var m_landing_page_q_and_a_default = LandingPageQAndA;
var _c7;
$RefreshReg$(_c7, "LandingPageQAndA");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// node_modules/.pnpm/react-icons@5.0.1_react@18.2.0/node_modules/react-icons/fa6/index.mjs
function FaInstagram(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 448 512" }, "child": [{ "tag": "path", "attr": { "d": "M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" }, "child": [] }] })(props);
}
function FaYoutube(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 576 512" }, "child": [{ "tag": "path", "attr": { "d": "M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" }, "child": [] }] })(props);
}

// app/constants/navigation/footer.ts
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/constants/navigation/footer.ts"
  );
  import.meta.hot.lastModified = "1707313113805.7007";
}
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
];
var QUICK_LINKS = [
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
];
var COMMUNITY_LINKS = [
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
var import_jsx_dev_runtime8 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/components/molecules/m-landing-page-footer/index.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/components/molecules/m-landing-page-footer/index.tsx"
  );
  import.meta.hot.lastModified = "1707313689313.003";
}
var LandingPageFooter = () => {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("footer", { className: "border-t font-inter p-2 pt-20 md:p-20 mt-48 md:mt-56 flex flex-col gap-20", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "flex flex-col md:flex-row w-full justify-between", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "flex flex-col gap-6", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(a_logo_default, { className: "w-[153px] mb-4" }, void 0, false, {
          fileName: "app/components/molecules/m-landing-page-footer/index.tsx",
          lineNumber: 28,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("p", { className: "md:max-w-[370px]", children: "Join our Discord channel or follow us on Twitter to keep up to date with our latest work and announcements." }, void 0, false, {
          fileName: "app/components/molecules/m-landing-page-footer/index.tsx",
          lineNumber: 29,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("ul", { className: "flex items-center gap-4", children: SOCIAL_LINKS.map(({
          icon: Icon,
          ...item
        }) => /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(Link, { to: item.href, children: /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(Icon, { size: 24 }, void 0, false, {
          fileName: "app/components/molecules/m-landing-page-footer/index.tsx",
          lineNumber: 34,
          columnNumber: 55
        }, this) }, item.name, false, {
          fileName: "app/components/molecules/m-landing-page-footer/index.tsx",
          lineNumber: 34,
          columnNumber: 17
        }, this)) }, void 0, false, {
          fileName: "app/components/molecules/m-landing-page-footer/index.tsx",
          lineNumber: 30,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/molecules/m-landing-page-footer/index.tsx",
        lineNumber: 27,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "grid grid-cols-2 gap-10", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("h4", { className: "font-bold text-2xl", children: "Quick Link" }, void 0, false, {
            fileName: "app/components/molecules/m-landing-page-footer/index.tsx",
            lineNumber: 39,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("ul", { className: "flex flex-col transition-all gap-2 text-black/80", children: QUICK_LINKS.map((link) => /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(Link, { className: "hover:text-black", to: link.href, children: link.name }, link.name, false, {
            fileName: "app/components/molecules/m-landing-page-footer/index.tsx",
            lineNumber: 41,
            columnNumber: 40
          }, this)) }, void 0, false, {
            fileName: "app/components/molecules/m-landing-page-footer/index.tsx",
            lineNumber: 40,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/molecules/m-landing-page-footer/index.tsx",
          lineNumber: 38,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("h4", { className: "font-bold text-2xl", children: "Community" }, void 0, false, {
            fileName: "app/components/molecules/m-landing-page-footer/index.tsx",
            lineNumber: 45,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("ul", { className: "flex flex-col transition-all gap-2 text-black/80", children: COMMUNITY_LINKS.map((link) => /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(Link, { className: "hover:text-black", to: link.href, children: link.name }, link.name, false, {
            fileName: "app/components/molecules/m-landing-page-footer/index.tsx",
            lineNumber: 47,
            columnNumber: 44
          }, this)) }, void 0, false, {
            fileName: "app/components/molecules/m-landing-page-footer/index.tsx",
            lineNumber: 46,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/components/molecules/m-landing-page-footer/index.tsx",
          lineNumber: 44,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/molecules/m-landing-page-footer/index.tsx",
        lineNumber: 37,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/molecules/m-landing-page-footer/index.tsx",
      lineNumber: 26,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "flex items-center flex-col w-full md:flex-row justify-between", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("p", { children: [
        "Copyright ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("span", { children: "\xA9" }, void 0, false, {
          fileName: "app/components/molecules/m-landing-page-footer/index.tsx",
          lineNumber: 53,
          columnNumber: 22
        }, this),
        " ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Zaibatsu All Rights Reserved."
      ] }, void 0, true, {
        fileName: "app/components/molecules/m-landing-page-footer/index.tsx",
        lineNumber: 53,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "flex items-center gap-6 transition-all text-black/70", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(Link, { className: "hover:text-black", to: "#", children: "Privacy policy" }, void 0, false, {
          fileName: "app/components/molecules/m-landing-page-footer/index.tsx",
          lineNumber: 55,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(Link, { className: "hover:text-black", to: "#", children: "Terms of Use" }, void 0, false, {
          fileName: "app/components/molecules/m-landing-page-footer/index.tsx",
          lineNumber: 56,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/molecules/m-landing-page-footer/index.tsx",
        lineNumber: 54,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/molecules/m-landing-page-footer/index.tsx",
      lineNumber: 52,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/molecules/m-landing-page-footer/index.tsx",
    lineNumber: 25,
    columnNumber: 10
  }, this);
};
_c8 = LandingPageFooter;
var m_landing_page_footer_default = LandingPageFooter;
var _c8;
$RefreshReg$(_c8, "LandingPageFooter");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/molecules/m-landing-page-get-started/index.tsx
var import_jsx_dev_runtime9 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/components/molecules/m-landing-page-get-started/index.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/components/molecules/m-landing-page-get-started/index.tsx"
  );
  import.meta.hot.lastModified = "1707313759154.507";
}
var LandingPageGetStarted = () => {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "relative flex flex-col items-center justify-center mt-48 md:mt-64", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "absolute -z-50", children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "h-screen relative z-0 max-h-[250px] md:max-h-[506px] overflow-hidden w-screen flex flex-col items-center justify-center", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "absolute bg-gradient-to-b z-50 from-white to-transparent top-0 w-screen h-[50%]" }, void 0, false, {
        fileName: "app/components/molecules/m-landing-page-get-started/index.tsx",
        lineNumber: 27,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("img", { className: "w-screen absolute -z-10 self-center object-cover", src: "/assets/images/trade.jpeg" }, void 0, false, {
        fileName: "app/components/molecules/m-landing-page-get-started/index.tsx",
        lineNumber: 28,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "absolute bg-gradient-to-b from-transparent to-white bottom-0 w-screen h-[50%]" }, void 0, false, {
        fileName: "app/components/molecules/m-landing-page-get-started/index.tsx",
        lineNumber: 29,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/molecules/m-landing-page-get-started/index.tsx",
      lineNumber: 26,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/components/molecules/m-landing-page-get-started/index.tsx",
      lineNumber: 25,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "font-inter gap-3 md:gap-6 flex flex-col items-center", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("h3", { className: "font-extrabold text-5xl lg:text-8xl text-white", children: "Let's Start" }, void 0, false, {
        fileName: "app/components/molecules/m-landing-page-get-started/index.tsx",
        lineNumber: 33,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("p", { className: "md:text-2xl font-medium text-white/80", children: "Borrow, lend and convert" }, void 0, false, {
        fileName: "app/components/molecules/m-landing-page-get-started/index.tsx",
        lineNumber: 34,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(Link, { className: "bg-primary flex items-center gap-1 p-4 px-10 text-white font-medium rounded-[30px]", to: "#", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("span", { children: "Get started" }, void 0, false, {
          fileName: "app/components/molecules/m-landing-page-get-started/index.tsx",
          lineNumber: 36,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(GoArrowUpRight, { size: 24 }, void 0, false, {
          fileName: "app/components/molecules/m-landing-page-get-started/index.tsx",
          lineNumber: 37,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/molecules/m-landing-page-get-started/index.tsx",
        lineNumber: 35,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/molecules/m-landing-page-get-started/index.tsx",
      lineNumber: 32,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/molecules/m-landing-page-get-started/index.tsx",
    lineNumber: 24,
    columnNumber: 10
  }, this);
};
_c9 = LandingPageGetStarted;
var m_landing_page_get_started_default = LandingPageGetStarted;
var _c9;
$RefreshReg$(_c9, "LandingPageGetStarted");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/routes/_index.tsx
var import_jsx_dev_runtime10 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/_index.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/_index.tsx"
  );
  import.meta.hot.lastModified = "1707311497808.829";
}
var meta = () => {
  return [{
    title: "Zaibatsu"
  }, {
    name: "description",
    content: "Bridging the gap between decentralized and centralized currencies"
  }];
};
function Index() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "font-trispace w-screen overflow-hidden z-0 transition-all", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "p-7", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(m_landing_page_navigation_default, {}, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 40,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(m_landing_page_hero_default, {}, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 41,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(m_landing_page_what_we_do_default, {}, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 42,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(m_landing_page_how_we_do_it_default, {}, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 43,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(m_landing_page_why_choose_us_default, {}, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 44,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 39,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(m_landing_page_q_and_a_default, {}, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 46,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(m_landing_page_get_started_default, {}, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 47,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(m_landing_page_footer_default, {}, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 48,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 38,
    columnNumber: 10
  }, this);
}
_c10 = Index;
var _c10;
$RefreshReg$(_c10, "Index");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Index as default,
  meta
};
//# sourceMappingURL=/build/routes/_index-V6D6B53Z.js.map
