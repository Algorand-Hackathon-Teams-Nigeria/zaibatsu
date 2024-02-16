import {
  createHotContext
} from "/build/_shared/chunk-KTXKSMJR.js";
import "/build/_shared/chunk-QJQJJ6FU.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-FGAZNT4N.js";
import "/build/_shared/chunk-JM3EFX3L.js";
import {
  __toESM
} from "/build/_shared/chunk-MYHRZK7S.js";

// app/routes/lend.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/lend.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/lend.tsx"
  );
  import.meta.hot.lastModified = "1708096306654.1543";
}
var LendPage = () => {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: "Lend" }, void 0, false, {
    fileName: "app/routes/lend.tsx",
    lineNumber: 22,
    columnNumber: 10
  }, this);
};
_c = LendPage;
var lend_default = LendPage;
var _c;
$RefreshReg$(_c, "LendPage");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  lend_default as default
};
//# sourceMappingURL=/build/routes/lend-R353RYE7.js.map
