import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-FGAZNT4N.js";
import {
  createHotContext
} from "/build/_shared/chunk-WBJQR5K3.js";
import "/build/_shared/chunk-QJQJJ6FU.js";
import "/build/_shared/chunk-JM3EFX3L.js";
import {
  __toESM
} from "/build/_shared/chunk-MYHRZK7S.js";

// app/routes/dapp._index.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/dapp._index.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/dapp._index.tsx"
  );
  import.meta.hot.lastModified = "1705871482953.2551";
}
var DashboardPage = () => {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: "Dashboard" }, void 0, false, {
    fileName: "app/routes/dapp._index.tsx",
    lineNumber: 22,
    columnNumber: 10
  }, this);
};
_c = DashboardPage;
var dapp_index_default = DashboardPage;
var _c;
$RefreshReg$(_c, "DashboardPage");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  dapp_index_default as default
};
//# sourceMappingURL=/build/routes/dapp._index-PXNPB5V3.js.map
