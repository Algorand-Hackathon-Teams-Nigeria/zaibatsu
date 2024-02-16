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

// app/routes/_index.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
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
  import.meta.hot.lastModified = "1708096671986.471";
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
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: "Dashboard" }, void 0, false, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 30,
    columnNumber: 10
  }, this);
}
_c = Index;
var _c;
$RefreshReg$(_c, "Index");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Index as default,
  meta
};
//# sourceMappingURL=/build/routes/_index-S2IBUWD7.js.map
