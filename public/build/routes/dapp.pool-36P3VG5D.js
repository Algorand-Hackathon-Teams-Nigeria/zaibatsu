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

// app/routes/dapp.pool.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/dapp.pool.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/dapp.pool.tsx"
  );
  import.meta.hot.lastModified = "1705871699709.7734";
}
var PoolPage = () => {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: "Pool Page" }, void 0, false, {
    fileName: "app/routes/dapp.pool.tsx",
    lineNumber: 22,
    columnNumber: 10
  }, this);
};
_c = PoolPage;
var dapp_pool_default = PoolPage;
var _c;
$RefreshReg$(_c, "PoolPage");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  dapp_pool_default as default
};
//# sourceMappingURL=/build/routes/dapp.pool-36P3VG5D.js.map
