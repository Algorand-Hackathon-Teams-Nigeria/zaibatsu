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

// app/routes/dapp.lend.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/dapp.lend.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/dapp.lend.tsx"
  );
  import.meta.hot.lastModified = "1705871771721.9946";
}
var LendPage = () => {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: "Lend" }, void 0, false, {
    fileName: "app/routes/dapp.lend.tsx",
    lineNumber: 22,
    columnNumber: 10
  }, this);
};
_c = LendPage;
var dapp_lend_default = LendPage;
var _c;
$RefreshReg$(_c, "LendPage");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  dapp_lend_default as default
};
//# sourceMappingURL=/build/routes/dapp.lend-W7M4IVC6.js.map
