import {
  require_react_dom
} from "/build/_shared/chunk-ATRQC2ZO.js";
import {
  require_react
} from "/build/_shared/chunk-JM3EFX3L.js";
import {
  __privateAdd,
  __privateGet,
  __privateMethod,
  __privateSet,
  __publicField,
  __toESM
} from "/build/_shared/chunk-MYHRZK7S.js";

// node_modules/.pnpm/recoil@0.7.7_react-dom@18.2.0_react@18.2.0/node_modules/recoil/es/index.js
var import_react = __toESM(require_react());
var import_react_dom = __toESM(require_react_dom());
function err(message) {
  const error = new Error(message);
  if (error.stack === void 0) {
    try {
      throw error;
    } catch (_2) {
    }
  }
  return error;
}
var err_1 = err;
var Recoil_err = err_1;
function isPromise(p2) {
  return !!p2 && typeof p2.then === "function";
}
var Recoil_isPromise = isPromise;
function nullthrows(x2, message) {
  if (x2 != null) {
    return x2;
  }
  throw Recoil_err(message !== null && message !== void 0 ? message : "Got unexpected null or undefined");
}
var Recoil_nullthrows = nullthrows;
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
var BaseLoadable = class {
  getValue() {
    throw Recoil_err("BaseLoadable");
  }
  toPromise() {
    throw Recoil_err("BaseLoadable");
  }
  valueMaybe() {
    throw Recoil_err("BaseLoadable");
  }
  valueOrThrow() {
    throw Recoil_err(`Loadable expected value, but in "${this.state}" state`);
  }
  promiseMaybe() {
    throw Recoil_err("BaseLoadable");
  }
  promiseOrThrow() {
    throw Recoil_err(`Loadable expected promise, but in "${this.state}" state`);
  }
  errorMaybe() {
    throw Recoil_err("BaseLoadable");
  }
  errorOrThrow() {
    throw Recoil_err(`Loadable expected error, but in "${this.state}" state`);
  }
  is(other) {
    return other.state === this.state && other.contents === this.contents;
  }
  map(_map) {
    throw Recoil_err("BaseLoadable");
  }
};
var ValueLoadable = class extends BaseLoadable {
  constructor(value) {
    super();
    _defineProperty(this, "state", "hasValue");
    _defineProperty(this, "contents", void 0);
    this.contents = value;
  }
  getValue() {
    return this.contents;
  }
  toPromise() {
    return Promise.resolve(this.contents);
  }
  valueMaybe() {
    return this.contents;
  }
  valueOrThrow() {
    return this.contents;
  }
  promiseMaybe() {
    return void 0;
  }
  errorMaybe() {
    return void 0;
  }
  map(map) {
    try {
      const next = map(this.contents);
      return Recoil_isPromise(next) ? loadableWithPromise(next) : isLoadable(next) ? next : loadableWithValue(next);
    } catch (e) {
      return Recoil_isPromise(e) ? (
        // If we "suspended", then try again.
        // errors and subsequent retries will be handled in 'loading' case
        // $FlowFixMe[prop-missing]
        loadableWithPromise(e.next(() => this.map(map)))
      ) : loadableWithError(e);
    }
  }
};
var ErrorLoadable = class extends BaseLoadable {
  constructor(error) {
    super();
    _defineProperty(this, "state", "hasError");
    _defineProperty(this, "contents", void 0);
    this.contents = error;
  }
  getValue() {
    throw this.contents;
  }
  toPromise() {
    return Promise.reject(this.contents);
  }
  valueMaybe() {
    return void 0;
  }
  promiseMaybe() {
    return void 0;
  }
  errorMaybe() {
    return this.contents;
  }
  errorOrThrow() {
    return this.contents;
  }
  map(_map) {
    return this;
  }
};
var LoadingLoadable = class extends BaseLoadable {
  constructor(promise) {
    super();
    _defineProperty(this, "state", "loading");
    _defineProperty(this, "contents", void 0);
    this.contents = promise;
  }
  getValue() {
    throw this.contents;
  }
  toPromise() {
    return this.contents;
  }
  valueMaybe() {
    return void 0;
  }
  promiseMaybe() {
    return this.contents;
  }
  promiseOrThrow() {
    return this.contents;
  }
  errorMaybe() {
    return void 0;
  }
  map(map) {
    return loadableWithPromise(this.contents.then((value) => {
      const next = map(value);
      if (isLoadable(next)) {
        const nextLoadable = next;
        switch (nextLoadable.state) {
          case "hasValue":
            return nextLoadable.contents;
          case "hasError":
            throw nextLoadable.contents;
          case "loading":
            return nextLoadable.contents;
        }
      }
      return next;
    }).catch((e) => {
      if (Recoil_isPromise(e)) {
        return e.then(() => this.map(map).contents);
      }
      throw e;
    }));
  }
};
function loadableWithValue(value) {
  return Object.freeze(new ValueLoadable(value));
}
function loadableWithError(error) {
  return Object.freeze(new ErrorLoadable(error));
}
function loadableWithPromise(promise) {
  return Object.freeze(new LoadingLoadable(promise));
}
function loadableLoading() {
  return Object.freeze(new LoadingLoadable(new Promise(() => {
  })));
}
function loadableAllArray(inputs) {
  return inputs.every((i2) => i2.state === "hasValue") ? loadableWithValue(inputs.map((i2) => i2.contents)) : inputs.some((i2) => i2.state === "hasError") ? loadableWithError(Recoil_nullthrows(inputs.find((i2) => i2.state === "hasError"), "Invalid loadable passed to loadableAll").contents) : loadableWithPromise(Promise.all(inputs.map((i2) => i2.contents)));
}
function loadableAll(inputs) {
  const unwrapedInputs = Array.isArray(inputs) ? inputs : Object.getOwnPropertyNames(inputs).map((key) => inputs[key]);
  const normalizedInputs = unwrapedInputs.map((x2) => isLoadable(x2) ? x2 : Recoil_isPromise(x2) ? loadableWithPromise(x2) : loadableWithValue(x2));
  const output = loadableAllArray(normalizedInputs);
  return Array.isArray(inputs) ? (
    // $FlowIssue[incompatible-return]
    output
  ) : (
    // Object.getOwnPropertyNames() has consistent key ordering with ES6
    // $FlowIssue[incompatible-call]
    output.map((outputs) => Object.getOwnPropertyNames(inputs).reduce(
      // $FlowFixMe[invalid-computed-prop]
      (out, key, idx) => ({
        ...out,
        [key]: outputs[idx]
      }),
      {}
    ))
  );
}
function isLoadable(x2) {
  return x2 instanceof BaseLoadable;
}
var LoadableStaticInterface = {
  of: (value) => Recoil_isPromise(value) ? loadableWithPromise(value) : isLoadable(value) ? value : loadableWithValue(value),
  error: (error) => loadableWithError(error),
  // $FlowIssue[incompatible-return]
  loading: () => loadableLoading(),
  // $FlowIssue[unclear-type]
  all: loadableAll,
  isLoadable
};
var Recoil_Loadable = {
  loadableWithValue,
  loadableWithError,
  loadableWithPromise,
  loadableLoading,
  loadableAll,
  isLoadable,
  RecoilLoadable: LoadableStaticInterface
};
var Recoil_Loadable_1 = Recoil_Loadable.loadableWithValue;
var Recoil_Loadable_2 = Recoil_Loadable.loadableWithError;
var Recoil_Loadable_3 = Recoil_Loadable.loadableWithPromise;
var Recoil_Loadable_4 = Recoil_Loadable.loadableLoading;
var Recoil_Loadable_5 = Recoil_Loadable.loadableAll;
var Recoil_Loadable_6 = Recoil_Loadable.isLoadable;
var Recoil_Loadable_7 = Recoil_Loadable.RecoilLoadable;
var Recoil_Loadable$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  loadableWithValue: Recoil_Loadable_1,
  loadableWithError: Recoil_Loadable_2,
  loadableWithPromise: Recoil_Loadable_3,
  loadableLoading: Recoil_Loadable_4,
  loadableAll: Recoil_Loadable_5,
  isLoadable: Recoil_Loadable_6,
  RecoilLoadable: Recoil_Loadable_7
});
var env = {
  RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED: true,
  // Note: RECOIL_GKS_ENABLED settings will only be honored in OSS builds of Recoil
  RECOIL_GKS_ENABLED: /* @__PURE__ */ new Set(["recoil_hamt_2020", "recoil_sync_external_store", "recoil_suppress_rerender_in_callback", "recoil_memory_managament_2020"])
};
function readProcessEnvBooleanFlag(name, set) {
  var _process$env$name, _process$env$name$toL;
  const sanitizedValue = (_process$env$name = process.env[name]) === null || _process$env$name === void 0 ? void 0 : (_process$env$name$toL = _process$env$name.toLowerCase()) === null || _process$env$name$toL === void 0 ? void 0 : _process$env$name$toL.trim();
  if (sanitizedValue == null || sanitizedValue === "") {
    return;
  }
  const allowedValues = ["true", "false"];
  if (!allowedValues.includes(sanitizedValue)) {
    throw Recoil_err(`process.env.${name} value must be 'true', 'false', or empty: ${sanitizedValue}`);
  }
  set(sanitizedValue === "true");
}
function readProcessEnvStringArrayFlag(name, set) {
  var _process$env$name2;
  const sanitizedValue = (_process$env$name2 = process.env[name]) === null || _process$env$name2 === void 0 ? void 0 : _process$env$name2.trim();
  if (sanitizedValue == null || sanitizedValue === "") {
    return;
  }
  set(sanitizedValue.split(/\s*,\s*|\s+/));
}
function applyProcessEnvFlagOverrides() {
  var _process;
  if (typeof process === "undefined") {
    return;
  }
  if (((_process = process) === null || _process === void 0 ? void 0 : _process.env) == null) {
    return;
  }
  readProcessEnvBooleanFlag("RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED", (value) => {
    env.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = value;
  });
  readProcessEnvStringArrayFlag("RECOIL_GKS_ENABLED", (value) => {
    value.forEach((gk) => {
      env.RECOIL_GKS_ENABLED.add(gk);
    });
  });
}
applyProcessEnvFlagOverrides();
var Recoil_RecoilEnv = env;
function Recoil_gkx_OSS(gk) {
  return Recoil_RecoilEnv.RECOIL_GKS_ENABLED.has(gk);
}
Recoil_gkx_OSS.setPass = (gk) => {
  Recoil_RecoilEnv.RECOIL_GKS_ENABLED.add(gk);
};
Recoil_gkx_OSS.setFail = (gk) => {
  Recoil_RecoilEnv.RECOIL_GKS_ENABLED.delete(gk);
};
Recoil_gkx_OSS.clear = () => {
  Recoil_RecoilEnv.RECOIL_GKS_ENABLED.clear();
};
var Recoil_gkx = Recoil_gkx_OSS;
function recoverableViolation(message, _projectName, {
  error
} = {}) {
  if (true) {
    console.error(message, error);
  }
  return null;
}
var recoverableViolation_1 = recoverableViolation;
var Recoil_recoverableViolation = recoverableViolation_1;
var _createMutableSource;
var _useMutableSource;
var _useSyncExternalStore;
var createMutableSource = (
  // flowlint-next-line unclear-type:off
  (_createMutableSource = import_react.default.createMutableSource) !== null && _createMutableSource !== void 0 ? _createMutableSource : import_react.default.unstable_createMutableSource
);
var useMutableSource = (
  // flowlint-next-line unclear-type:off
  (_useMutableSource = import_react.default.useMutableSource) !== null && _useMutableSource !== void 0 ? _useMutableSource : import_react.default.unstable_useMutableSource
);
var useSyncExternalStore = (
  // flowlint-next-line unclear-type:off
  (_useSyncExternalStore = import_react.default.useSyncExternalStore) !== null && _useSyncExternalStore !== void 0 ? _useSyncExternalStore : (
    // flowlint-next-line unclear-type:off
    import_react.default.unstable_useSyncExternalStore
  )
);
var ReactRendererVersionMismatchWarnOnce = false;
function currentRendererSupportsUseSyncExternalStore() {
  var _ReactCurrentDispatch;
  const {
    ReactCurrentDispatcher,
    ReactCurrentOwner
  } = (
    /* $FlowFixMe[prop-missing] This workaround was approved as a safer mechanism
     * to detect if the current renderer supports useSyncExternalStore()
     * https://fb.workplace.com/groups/reactjs/posts/9558682330846963/ */
    import_react.default.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
  );
  const dispatcher = (_ReactCurrentDispatch = ReactCurrentDispatcher === null || ReactCurrentDispatcher === void 0 ? void 0 : ReactCurrentDispatcher.current) !== null && _ReactCurrentDispatch !== void 0 ? _ReactCurrentDispatch : ReactCurrentOwner.currentDispatcher;
  const isUseSyncExternalStoreSupported = dispatcher.useSyncExternalStore != null;
  if (useSyncExternalStore && !isUseSyncExternalStoreSupported && !ReactRendererVersionMismatchWarnOnce) {
    ReactRendererVersionMismatchWarnOnce = true;
    Recoil_recoverableViolation("A React renderer without React 18+ API support is being used with React 18+.");
  }
  return isUseSyncExternalStoreSupported;
}
function reactMode() {
  if (Recoil_gkx("recoil_transition_support")) {
    return {
      mode: "TRANSITION_SUPPORT",
      early: true,
      concurrent: true
    };
  }
  if (Recoil_gkx("recoil_sync_external_store") && useSyncExternalStore != null) {
    return {
      mode: "SYNC_EXTERNAL_STORE",
      early: true,
      concurrent: false
    };
  }
  if (Recoil_gkx("recoil_mutable_source") && useMutableSource != null && typeof window !== "undefined" && !window.$disableRecoilValueMutableSource_TEMP_HACK_DO_NOT_USE) {
    return Recoil_gkx("recoil_suppress_rerender_in_callback") ? {
      mode: "MUTABLE_SOURCE",
      early: true,
      concurrent: true
    } : {
      mode: "MUTABLE_SOURCE",
      early: false,
      concurrent: false
    };
  }
  return Recoil_gkx("recoil_suppress_rerender_in_callback") ? {
    mode: "LEGACY",
    early: true,
    concurrent: false
  } : {
    mode: "LEGACY",
    early: false,
    concurrent: false
  };
}
function isFastRefreshEnabled() {
  return false;
}
var Recoil_ReactMode = {
  createMutableSource,
  useMutableSource,
  useSyncExternalStore,
  currentRendererSupportsUseSyncExternalStore,
  reactMode,
  isFastRefreshEnabled
};
var AbstractRecoilValue = class {
  constructor(newKey) {
    _defineProperty(this, "key", void 0);
    this.key = newKey;
  }
  toJSON() {
    return {
      key: this.key
    };
  }
};
var RecoilState = class extends AbstractRecoilValue {
};
var RecoilValueReadOnly = class extends AbstractRecoilValue {
};
function isRecoilValue(x2) {
  return x2 instanceof RecoilState || x2 instanceof RecoilValueReadOnly;
}
var Recoil_RecoilValue = {
  AbstractRecoilValue,
  RecoilState,
  RecoilValueReadOnly,
  isRecoilValue
};
var Recoil_RecoilValue_1 = Recoil_RecoilValue.AbstractRecoilValue;
var Recoil_RecoilValue_2 = Recoil_RecoilValue.RecoilState;
var Recoil_RecoilValue_3 = Recoil_RecoilValue.RecoilValueReadOnly;
var Recoil_RecoilValue_4 = Recoil_RecoilValue.isRecoilValue;
var Recoil_RecoilValue$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  AbstractRecoilValue: Recoil_RecoilValue_1,
  RecoilState: Recoil_RecoilValue_2,
  RecoilValueReadOnly: Recoil_RecoilValue_3,
  isRecoilValue: Recoil_RecoilValue_4
});
function sprintf(format, ...args) {
  let index = 0;
  return format.replace(/%s/g, () => String(args[index++]));
}
var sprintf_1 = sprintf;
function expectationViolation(format, ...args) {
  if (true) {
    const message = sprintf_1.call(null, format, ...args);
    const error = new Error(message);
    error.name = "Expectation Violation";
    console.error(error);
  }
}
var expectationViolation_1 = expectationViolation;
var Recoil_expectationViolation = expectationViolation_1;
function mapIterable(iterable, callback) {
  return function* () {
    let index = 0;
    for (const value of iterable) {
      yield callback(value, index++);
    }
  }();
}
var Recoil_mapIterable = mapIterable;
var {
  isFastRefreshEnabled: isFastRefreshEnabled$1
} = Recoil_ReactMode;
var DefaultValue = class {
};
var DEFAULT_VALUE = new DefaultValue();
var nodes = /* @__PURE__ */ new Map();
var recoilValues = /* @__PURE__ */ new Map();
function recoilValuesForKeys(keys) {
  return Recoil_mapIterable(keys, (key) => Recoil_nullthrows(recoilValues.get(key)));
}
function checkForDuplicateAtomKey(key) {
  if (nodes.has(key)) {
    const message = `Duplicate atom key "${key}". This is a FATAL ERROR in
      production. But it is safe to ignore this warning if it occurred because of
      hot module replacement.`;
    if (true) {
      if (!isFastRefreshEnabled$1()) {
        Recoil_expectationViolation(message, "recoil");
      }
    } else {
      console.warn(message);
    }
  }
}
function registerNode(node) {
  if (Recoil_RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED) {
    checkForDuplicateAtomKey(node.key);
  }
  nodes.set(node.key, node);
  const recoilValue = node.set == null ? new Recoil_RecoilValue$1.RecoilValueReadOnly(node.key) : new Recoil_RecoilValue$1.RecoilState(node.key);
  recoilValues.set(node.key, recoilValue);
  return recoilValue;
}
var NodeMissingError = class extends Error {
};
function getNode(key) {
  const node = nodes.get(key);
  if (node == null) {
    throw new NodeMissingError(`Missing definition for RecoilValue: "${key}""`);
  }
  return node;
}
function getNodeMaybe(key) {
  return nodes.get(key);
}
var configDeletionHandlers = /* @__PURE__ */ new Map();
function deleteNodeConfigIfPossible(key) {
  var _node$shouldDeleteCon;
  if (!Recoil_gkx("recoil_memory_managament_2020")) {
    return;
  }
  const node = nodes.get(key);
  if (node !== null && node !== void 0 && (_node$shouldDeleteCon = node.shouldDeleteConfigOnRelease) !== null && _node$shouldDeleteCon !== void 0 && _node$shouldDeleteCon.call(node)) {
    var _getConfigDeletionHan;
    nodes.delete(key);
    (_getConfigDeletionHan = getConfigDeletionHandler(key)) === null || _getConfigDeletionHan === void 0 ? void 0 : _getConfigDeletionHan();
    configDeletionHandlers.delete(key);
  }
}
function setConfigDeletionHandler(key, fn2) {
  if (!Recoil_gkx("recoil_memory_managament_2020")) {
    return;
  }
  if (fn2 === void 0) {
    configDeletionHandlers.delete(key);
  } else {
    configDeletionHandlers.set(key, fn2);
  }
}
function getConfigDeletionHandler(key) {
  return configDeletionHandlers.get(key);
}
var Recoil_Node = {
  nodes,
  recoilValues,
  registerNode,
  getNode,
  getNodeMaybe,
  deleteNodeConfigIfPossible,
  setConfigDeletionHandler,
  getConfigDeletionHandler,
  recoilValuesForKeys,
  NodeMissingError,
  DefaultValue,
  DEFAULT_VALUE
};
function enqueueExecution(s2, f2) {
  f2();
}
var Recoil_Queue = {
  enqueueExecution
};
function createCommonjsModule(fn2, module) {
  return module = { exports: {} }, fn2(module, module.exports), module.exports;
}
var hamt_1 = createCommonjsModule(function(module) {
  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };
  var hamt = {};
  var SIZE = 5;
  var BUCKET_SIZE = Math.pow(2, SIZE);
  var MASK = BUCKET_SIZE - 1;
  var MAX_INDEX_NODE = BUCKET_SIZE / 2;
  var MIN_ARRAY_NODE = BUCKET_SIZE / 4;
  var nothing = {};
  var constant = function constant2(x2) {
    return function() {
      return x2;
    };
  };
  var hash = hamt.hash = function(str) {
    var type = typeof str === "undefined" ? "undefined" : _typeof(str);
    if (type === "number")
      return str;
    if (type !== "string")
      str += "";
    var hash2 = 0;
    for (var i2 = 0, len = str.length; i2 < len; ++i2) {
      var c2 = str.charCodeAt(i2);
      hash2 = (hash2 << 5) - hash2 + c2 | 0;
    }
    return hash2;
  };
  var popcount = function popcount2(x2) {
    x2 -= x2 >> 1 & 1431655765;
    x2 = (x2 & 858993459) + (x2 >> 2 & 858993459);
    x2 = x2 + (x2 >> 4) & 252645135;
    x2 += x2 >> 8;
    x2 += x2 >> 16;
    return x2 & 127;
  };
  var hashFragment = function hashFragment2(shift, h2) {
    return h2 >>> shift & MASK;
  };
  var toBitmap = function toBitmap2(x2) {
    return 1 << x2;
  };
  var fromBitmap = function fromBitmap2(bitmap, bit) {
    return popcount(bitmap & bit - 1);
  };
  var arrayUpdate = function arrayUpdate2(mutate2, at, v2, arr) {
    var out = arr;
    if (!mutate2) {
      var len = arr.length;
      out = new Array(len);
      for (var i2 = 0; i2 < len; ++i2) {
        out[i2] = arr[i2];
      }
    }
    out[at] = v2;
    return out;
  };
  var arraySpliceOut = function arraySpliceOut2(mutate2, at, arr) {
    var newLen = arr.length - 1;
    var i2 = 0;
    var g2 = 0;
    var out = arr;
    if (mutate2) {
      i2 = g2 = at;
    } else {
      out = new Array(newLen);
      while (i2 < at) {
        out[g2++] = arr[i2++];
      }
    }
    ++i2;
    while (i2 <= newLen) {
      out[g2++] = arr[i2++];
    }
    if (mutate2) {
      out.length = newLen;
    }
    return out;
  };
  var arraySpliceIn = function arraySpliceIn2(mutate2, at, v2, arr) {
    var len = arr.length;
    if (mutate2) {
      var _i = len;
      while (_i >= at) {
        arr[_i--] = arr[_i];
      }
      arr[at] = v2;
      return arr;
    }
    var i2 = 0, g2 = 0;
    var out = new Array(len + 1);
    while (i2 < at) {
      out[g2++] = arr[i2++];
    }
    out[at] = v2;
    while (i2 < len) {
      out[++g2] = arr[i2++];
    }
    return out;
  };
  var LEAF = 1;
  var COLLISION = 2;
  var INDEX = 3;
  var ARRAY = 4;
  var empty = {
    __hamt_isEmpty: true
  };
  var isEmptyNode = function isEmptyNode2(x2) {
    return x2 === empty || x2 && x2.__hamt_isEmpty;
  };
  var Leaf = function Leaf2(edit, hash2, key, value) {
    return {
      type: LEAF,
      edit,
      hash: hash2,
      key,
      value,
      _modify: Leaf__modify
    };
  };
  var Collision = function Collision2(edit, hash2, children) {
    return {
      type: COLLISION,
      edit,
      hash: hash2,
      children,
      _modify: Collision__modify
    };
  };
  var IndexedNode = function IndexedNode2(edit, mask, children) {
    return {
      type: INDEX,
      edit,
      mask,
      children,
      _modify: IndexedNode__modify
    };
  };
  var ArrayNode = function ArrayNode2(edit, size, children) {
    return {
      type: ARRAY,
      edit,
      size,
      children,
      _modify: ArrayNode__modify
    };
  };
  var isLeaf = function isLeaf2(node) {
    return node === empty || node.type === LEAF || node.type === COLLISION;
  };
  var expand = function expand2(edit, frag, child, bitmap, subNodes) {
    var arr = [];
    var bit = bitmap;
    var count2 = 0;
    for (var i2 = 0; bit; ++i2) {
      if (bit & 1)
        arr[i2] = subNodes[count2++];
      bit >>>= 1;
    }
    arr[frag] = child;
    return ArrayNode(edit, count2 + 1, arr);
  };
  var pack = function pack2(edit, count2, removed, elements) {
    var children = new Array(count2 - 1);
    var g2 = 0;
    var bitmap = 0;
    for (var i2 = 0, len = elements.length; i2 < len; ++i2) {
      if (i2 !== removed) {
        var elem = elements[i2];
        if (elem && !isEmptyNode(elem)) {
          children[g2++] = elem;
          bitmap |= 1 << i2;
        }
      }
    }
    return IndexedNode(edit, bitmap, children);
  };
  var mergeLeaves = function mergeLeaves2(edit, shift, h1, n1, h2, n2) {
    if (h1 === h2)
      return Collision(edit, h1, [n2, n1]);
    var subH1 = hashFragment(shift, h1);
    var subH2 = hashFragment(shift, h2);
    return IndexedNode(edit, toBitmap(subH1) | toBitmap(subH2), subH1 === subH2 ? [mergeLeaves2(edit, shift + SIZE, h1, n1, h2, n2)] : subH1 < subH2 ? [n1, n2] : [n2, n1]);
  };
  var updateCollisionList = function updateCollisionList2(mutate2, edit, keyEq, h2, list, f2, k2, size) {
    var len = list.length;
    for (var i2 = 0; i2 < len; ++i2) {
      var child = list[i2];
      if (keyEq(k2, child.key)) {
        var value = child.value;
        var _newValue = f2(value);
        if (_newValue === value)
          return list;
        if (_newValue === nothing) {
          --size.value;
          return arraySpliceOut(mutate2, i2, list);
        }
        return arrayUpdate(mutate2, i2, Leaf(edit, h2, k2, _newValue), list);
      }
    }
    var newValue = f2();
    if (newValue === nothing)
      return list;
    ++size.value;
    return arrayUpdate(mutate2, len, Leaf(edit, h2, k2, newValue), list);
  };
  var canEditNode = function canEditNode2(edit, node) {
    return edit === node.edit;
  };
  var Leaf__modify = function Leaf__modify2(edit, keyEq, shift, f2, h2, k2, size) {
    if (keyEq(k2, this.key)) {
      var _v = f2(this.value);
      if (_v === this.value)
        return this;
      else if (_v === nothing) {
        --size.value;
        return empty;
      }
      if (canEditNode(edit, this)) {
        this.value = _v;
        return this;
      }
      return Leaf(edit, h2, k2, _v);
    }
    var v2 = f2();
    if (v2 === nothing)
      return this;
    ++size.value;
    return mergeLeaves(edit, shift, this.hash, this, h2, Leaf(edit, h2, k2, v2));
  };
  var Collision__modify = function Collision__modify2(edit, keyEq, shift, f2, h2, k2, size) {
    if (h2 === this.hash) {
      var canEdit = canEditNode(edit, this);
      var list = updateCollisionList(canEdit, edit, keyEq, this.hash, this.children, f2, k2, size);
      if (list === this.children)
        return this;
      return list.length > 1 ? Collision(edit, this.hash, list) : list[0];
    }
    var v2 = f2();
    if (v2 === nothing)
      return this;
    ++size.value;
    return mergeLeaves(edit, shift, this.hash, this, h2, Leaf(edit, h2, k2, v2));
  };
  var IndexedNode__modify = function IndexedNode__modify2(edit, keyEq, shift, f2, h2, k2, size) {
    var mask = this.mask;
    var children = this.children;
    var frag = hashFragment(shift, h2);
    var bit = toBitmap(frag);
    var indx = fromBitmap(mask, bit);
    var exists = mask & bit;
    var current = exists ? children[indx] : empty;
    var child = current._modify(edit, keyEq, shift + SIZE, f2, h2, k2, size);
    if (current === child)
      return this;
    var canEdit = canEditNode(edit, this);
    var bitmap = mask;
    var newChildren = void 0;
    if (exists && isEmptyNode(child)) {
      bitmap &= ~bit;
      if (!bitmap)
        return empty;
      if (children.length <= 2 && isLeaf(children[indx ^ 1]))
        return children[indx ^ 1];
      newChildren = arraySpliceOut(canEdit, indx, children);
    } else if (!exists && !isEmptyNode(child)) {
      if (children.length >= MAX_INDEX_NODE)
        return expand(edit, frag, child, mask, children);
      bitmap |= bit;
      newChildren = arraySpliceIn(canEdit, indx, child, children);
    } else {
      newChildren = arrayUpdate(canEdit, indx, child, children);
    }
    if (canEdit) {
      this.mask = bitmap;
      this.children = newChildren;
      return this;
    }
    return IndexedNode(edit, bitmap, newChildren);
  };
  var ArrayNode__modify = function ArrayNode__modify2(edit, keyEq, shift, f2, h2, k2, size) {
    var count2 = this.size;
    var children = this.children;
    var frag = hashFragment(shift, h2);
    var child = children[frag];
    var newChild = (child || empty)._modify(edit, keyEq, shift + SIZE, f2, h2, k2, size);
    if (child === newChild)
      return this;
    var canEdit = canEditNode(edit, this);
    var newChildren = void 0;
    if (isEmptyNode(child) && !isEmptyNode(newChild)) {
      ++count2;
      newChildren = arrayUpdate(canEdit, frag, newChild, children);
    } else if (!isEmptyNode(child) && isEmptyNode(newChild)) {
      --count2;
      if (count2 <= MIN_ARRAY_NODE)
        return pack(edit, count2, frag, children);
      newChildren = arrayUpdate(canEdit, frag, empty, children);
    } else {
      newChildren = arrayUpdate(canEdit, frag, newChild, children);
    }
    if (canEdit) {
      this.size = count2;
      this.children = newChildren;
      return this;
    }
    return ArrayNode(edit, count2, newChildren);
  };
  empty._modify = function(edit, keyEq, shift, f2, h2, k2, size) {
    var v2 = f2();
    if (v2 === nothing)
      return empty;
    ++size.value;
    return Leaf(edit, h2, k2, v2);
  };
  function Map2(editable, edit, config, root, size) {
    this._editable = editable;
    this._edit = edit;
    this._config = config;
    this._root = root;
    this._size = size;
  }
  Map2.prototype.setTree = function(newRoot, newSize) {
    if (this._editable) {
      this._root = newRoot;
      this._size = newSize;
      return this;
    }
    return newRoot === this._root ? this : new Map2(this._editable, this._edit, this._config, newRoot, newSize);
  };
  var tryGetHash = hamt.tryGetHash = function(alt, hash2, key, map) {
    var node = map._root;
    var shift = 0;
    var keyEq = map._config.keyEq;
    while (true) {
      switch (node.type) {
        case LEAF: {
          return keyEq(key, node.key) ? node.value : alt;
        }
        case COLLISION: {
          if (hash2 === node.hash) {
            var children = node.children;
            for (var i2 = 0, len = children.length; i2 < len; ++i2) {
              var child = children[i2];
              if (keyEq(key, child.key))
                return child.value;
            }
          }
          return alt;
        }
        case INDEX: {
          var frag = hashFragment(shift, hash2);
          var bit = toBitmap(frag);
          if (node.mask & bit) {
            node = node.children[fromBitmap(node.mask, bit)];
            shift += SIZE;
            break;
          }
          return alt;
        }
        case ARRAY: {
          node = node.children[hashFragment(shift, hash2)];
          if (node) {
            shift += SIZE;
            break;
          }
          return alt;
        }
        default:
          return alt;
      }
    }
  };
  Map2.prototype.tryGetHash = function(alt, hash2, key) {
    return tryGetHash(alt, hash2, key, this);
  };
  var tryGet = hamt.tryGet = function(alt, key, map) {
    return tryGetHash(alt, map._config.hash(key), key, map);
  };
  Map2.prototype.tryGet = function(alt, key) {
    return tryGet(alt, key, this);
  };
  var getHash = hamt.getHash = function(hash2, key, map) {
    return tryGetHash(void 0, hash2, key, map);
  };
  Map2.prototype.getHash = function(hash2, key) {
    return getHash(hash2, key, this);
  };
  var get = hamt.get = function(key, map) {
    return tryGetHash(void 0, map._config.hash(key), key, map);
  };
  Map2.prototype.get = function(key, alt) {
    return tryGet(alt, key, this);
  };
  var hasHash = hamt.has = function(hash2, key, map) {
    return tryGetHash(nothing, hash2, key, map) !== nothing;
  };
  Map2.prototype.hasHash = function(hash2, key) {
    return hasHash(hash2, key, this);
  };
  var has = hamt.has = function(key, map) {
    return hasHash(map._config.hash(key), key, map);
  };
  Map2.prototype.has = function(key) {
    return has(key, this);
  };
  var defKeyCompare = function defKeyCompare2(x2, y2) {
    return x2 === y2;
  };
  hamt.make = function(config) {
    return new Map2(0, 0, {
      keyEq: config && config.keyEq || defKeyCompare,
      hash: config && config.hash || hash
    }, empty, 0);
  };
  hamt.empty = hamt.make();
  var isEmpty = hamt.isEmpty = function(map) {
    return map && !!isEmptyNode(map._root);
  };
  Map2.prototype.isEmpty = function() {
    return isEmpty(this);
  };
  var modifyHash = hamt.modifyHash = function(f2, hash2, key, map) {
    var size = {
      value: map._size
    };
    var newRoot = map._root._modify(map._editable ? map._edit : NaN, map._config.keyEq, 0, f2, hash2, key, size);
    return map.setTree(newRoot, size.value);
  };
  Map2.prototype.modifyHash = function(hash2, key, f2) {
    return modifyHash(f2, hash2, key, this);
  };
  var modify = hamt.modify = function(f2, key, map) {
    return modifyHash(f2, map._config.hash(key), key, map);
  };
  Map2.prototype.modify = function(key, f2) {
    return modify(f2, key, this);
  };
  var setHash = hamt.setHash = function(hash2, key, value, map) {
    return modifyHash(constant(value), hash2, key, map);
  };
  Map2.prototype.setHash = function(hash2, key, value) {
    return setHash(hash2, key, value, this);
  };
  var set = hamt.set = function(key, value, map) {
    return setHash(map._config.hash(key), key, value, map);
  };
  Map2.prototype.set = function(key, value) {
    return set(key, value, this);
  };
  var del = constant(nothing);
  var removeHash = hamt.removeHash = function(hash2, key, map) {
    return modifyHash(del, hash2, key, map);
  };
  Map2.prototype.removeHash = Map2.prototype.deleteHash = function(hash2, key) {
    return removeHash(hash2, key, this);
  };
  var remove = hamt.remove = function(key, map) {
    return removeHash(map._config.hash(key), key, map);
  };
  Map2.prototype.remove = Map2.prototype.delete = function(key) {
    return remove(key, this);
  };
  var beginMutation = hamt.beginMutation = function(map) {
    return new Map2(map._editable + 1, map._edit + 1, map._config, map._root, map._size);
  };
  Map2.prototype.beginMutation = function() {
    return beginMutation(this);
  };
  var endMutation = hamt.endMutation = function(map) {
    map._editable = map._editable && map._editable - 1;
    return map;
  };
  Map2.prototype.endMutation = function() {
    return endMutation(this);
  };
  var mutate = hamt.mutate = function(f2, map) {
    var transient = beginMutation(map);
    f2(transient);
    return endMutation(transient);
  };
  Map2.prototype.mutate = function(f2) {
    return mutate(f2, this);
  };
  var appk = function appk2(k2) {
    return k2 && lazyVisitChildren(k2[0], k2[1], k2[2], k2[3], k2[4]);
  };
  var lazyVisitChildren = function lazyVisitChildren2(len, children, i2, f2, k2) {
    while (i2 < len) {
      var child = children[i2++];
      if (child && !isEmptyNode(child))
        return lazyVisit(child, f2, [len, children, i2, f2, k2]);
    }
    return appk(k2);
  };
  var lazyVisit = function lazyVisit2(node, f2, k2) {
    switch (node.type) {
      case LEAF:
        return {
          value: f2(node),
          rest: k2
        };
      case COLLISION:
      case ARRAY:
      case INDEX:
        var children = node.children;
        return lazyVisitChildren(children.length, children, 0, f2, k2);
      default:
        return appk(k2);
    }
  };
  var DONE = {
    done: true
  };
  function MapIterator(v2) {
    this.v = v2;
  }
  MapIterator.prototype.next = function() {
    if (!this.v)
      return DONE;
    var v0 = this.v;
    this.v = appk(v0.rest);
    return v0;
  };
  MapIterator.prototype[Symbol.iterator] = function() {
    return this;
  };
  var visit = function visit2(map, f2) {
    return new MapIterator(lazyVisit(map._root, f2));
  };
  var buildPairs = function buildPairs2(x2) {
    return [x2.key, x2.value];
  };
  var entries = hamt.entries = function(map) {
    return visit(map, buildPairs);
  };
  Map2.prototype.entries = Map2.prototype[Symbol.iterator] = function() {
    return entries(this);
  };
  var buildKeys = function buildKeys2(x2) {
    return x2.key;
  };
  var keys = hamt.keys = function(map) {
    return visit(map, buildKeys);
  };
  Map2.prototype.keys = function() {
    return keys(this);
  };
  var buildValues = function buildValues2(x2) {
    return x2.value;
  };
  var values = hamt.values = Map2.prototype.values = function(map) {
    return visit(map, buildValues);
  };
  Map2.prototype.values = function() {
    return values(this);
  };
  var fold = hamt.fold = function(f2, z2, m) {
    var root = m._root;
    if (root.type === LEAF)
      return f2(z2, root.value, root.key);
    var toVisit = [root.children];
    var children = void 0;
    while (children = toVisit.pop()) {
      for (var i2 = 0, len = children.length; i2 < len; ) {
        var child = children[i2++];
        if (child && child.type) {
          if (child.type === LEAF)
            z2 = f2(z2, child.value, child.key);
          else
            toVisit.push(child.children);
        }
      }
    }
    return z2;
  };
  Map2.prototype.fold = function(f2, z2) {
    return fold(f2, z2, this);
  };
  var forEach = hamt.forEach = function(f2, map) {
    return fold(function(_2, value, key) {
      return f2(value, key, map);
    }, null, map);
  };
  Map2.prototype.forEach = function(f2) {
    return forEach(f2, this);
  };
  var count = hamt.count = function(map) {
    return map._size;
  };
  Map2.prototype.count = function() {
    return count(this);
  };
  Object.defineProperty(Map2.prototype, "size", {
    get: Map2.prototype.count
  });
  if (module.exports) {
    module.exports = hamt;
  } else {
    (void 0).hamt = hamt;
  }
});
var BuiltInMap = class {
  constructor(existing) {
    _defineProperty(this, "_map", void 0);
    this._map = new Map(existing === null || existing === void 0 ? void 0 : existing.entries());
  }
  keys() {
    return this._map.keys();
  }
  entries() {
    return this._map.entries();
  }
  get(k2) {
    return this._map.get(k2);
  }
  has(k2) {
    return this._map.has(k2);
  }
  set(k2, v2) {
    this._map.set(k2, v2);
    return this;
  }
  delete(k2) {
    this._map.delete(k2);
    return this;
  }
  clone() {
    return persistentMap(this);
  }
  toMap() {
    return new Map(this._map);
  }
};
var HashArrayMappedTrieMap = class {
  // Because hamt.empty is not a function there is no way to introduce type
  // parameters on it, so empty is typed as HAMTPlusMap<string, mixed>.
  // $FlowIssue
  constructor(existing) {
    _defineProperty(this, "_hamt", hamt_1.empty.beginMutation());
    if (existing instanceof HashArrayMappedTrieMap) {
      const h2 = existing._hamt.endMutation();
      existing._hamt = h2.beginMutation();
      this._hamt = h2.beginMutation();
    } else if (existing) {
      for (const [k2, v2] of existing.entries()) {
        this._hamt.set(k2, v2);
      }
    }
  }
  keys() {
    return this._hamt.keys();
  }
  entries() {
    return this._hamt.entries();
  }
  get(k2) {
    return this._hamt.get(k2);
  }
  has(k2) {
    return this._hamt.has(k2);
  }
  set(k2, v2) {
    this._hamt.set(k2, v2);
    return this;
  }
  delete(k2) {
    this._hamt.delete(k2);
    return this;
  }
  clone() {
    return persistentMap(this);
  }
  toMap() {
    return new Map(this._hamt);
  }
};
function persistentMap(existing) {
  if (Recoil_gkx("recoil_hamt_2020")) {
    return new HashArrayMappedTrieMap(existing);
  } else {
    return new BuiltInMap(existing);
  }
}
var Recoil_PersistentMap = {
  persistentMap
};
var Recoil_PersistentMap_1 = Recoil_PersistentMap.persistentMap;
var Recoil_PersistentMap$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  persistentMap: Recoil_PersistentMap_1
});
function differenceSets(set, ...setsWithValuesToRemove) {
  const ret = /* @__PURE__ */ new Set();
  FIRST:
    for (const value of set) {
      for (const otherSet of setsWithValuesToRemove) {
        if (otherSet.has(value)) {
          continue FIRST;
        }
      }
      ret.add(value);
    }
  return ret;
}
var Recoil_differenceSets = differenceSets;
function mapMap(map, callback) {
  const result = /* @__PURE__ */ new Map();
  map.forEach((value, key) => {
    result.set(key, callback(value, key));
  });
  return result;
}
var Recoil_mapMap = mapMap;
function makeGraph() {
  return {
    nodeDeps: /* @__PURE__ */ new Map(),
    nodeToNodeSubscriptions: /* @__PURE__ */ new Map()
  };
}
function cloneGraph(graph2) {
  return {
    nodeDeps: Recoil_mapMap(graph2.nodeDeps, (s2) => new Set(s2)),
    nodeToNodeSubscriptions: Recoil_mapMap(graph2.nodeToNodeSubscriptions, (s2) => new Set(s2))
  };
}
function mergeDepsIntoGraph(key, newDeps, graph2, olderGraph) {
  const {
    nodeDeps,
    nodeToNodeSubscriptions
  } = graph2;
  const oldDeps = nodeDeps.get(key);
  if (oldDeps && olderGraph && oldDeps !== olderGraph.nodeDeps.get(key)) {
    return;
  }
  nodeDeps.set(key, newDeps);
  const addedDeps = oldDeps == null ? newDeps : Recoil_differenceSets(newDeps, oldDeps);
  for (const dep of addedDeps) {
    if (!nodeToNodeSubscriptions.has(dep)) {
      nodeToNodeSubscriptions.set(dep, /* @__PURE__ */ new Set());
    }
    const existing = Recoil_nullthrows(nodeToNodeSubscriptions.get(dep));
    existing.add(key);
  }
  if (oldDeps) {
    const removedDeps = Recoil_differenceSets(oldDeps, newDeps);
    for (const dep of removedDeps) {
      if (!nodeToNodeSubscriptions.has(dep)) {
        return;
      }
      const existing = Recoil_nullthrows(nodeToNodeSubscriptions.get(dep));
      existing.delete(key);
      if (existing.size === 0) {
        nodeToNodeSubscriptions.delete(dep);
      }
    }
  }
}
function saveDepsToStore(key, deps, store, version) {
  var _storeState$nextTree, _storeState$previousT, _storeState$previousT2, _storeState$previousT3;
  const storeState = store.getState();
  if (!(version === storeState.currentTree.version || version === ((_storeState$nextTree = storeState.nextTree) === null || _storeState$nextTree === void 0 ? void 0 : _storeState$nextTree.version) || version === ((_storeState$previousT = storeState.previousTree) === null || _storeState$previousT === void 0 ? void 0 : _storeState$previousT.version))) {
    Recoil_recoverableViolation("Tried to save dependencies to a discarded tree");
  }
  const graph2 = store.getGraph(version);
  mergeDepsIntoGraph(key, deps, graph2);
  if (version === ((_storeState$previousT2 = storeState.previousTree) === null || _storeState$previousT2 === void 0 ? void 0 : _storeState$previousT2.version)) {
    const currentGraph = store.getGraph(storeState.currentTree.version);
    mergeDepsIntoGraph(key, deps, currentGraph, graph2);
  }
  if (version === ((_storeState$previousT3 = storeState.previousTree) === null || _storeState$previousT3 === void 0 ? void 0 : _storeState$previousT3.version) || version === storeState.currentTree.version) {
    var _storeState$nextTree2;
    const nextVersion = (_storeState$nextTree2 = storeState.nextTree) === null || _storeState$nextTree2 === void 0 ? void 0 : _storeState$nextTree2.version;
    if (nextVersion !== void 0) {
      const nextGraph = store.getGraph(nextVersion);
      mergeDepsIntoGraph(key, deps, nextGraph, graph2);
    }
  }
}
var Recoil_Graph = {
  cloneGraph,
  graph: makeGraph,
  saveDepsToStore
};
var nextTreeStateVersion = 0;
var getNextTreeStateVersion = () => nextTreeStateVersion++;
var nextStoreID = 0;
var getNextStoreID = () => nextStoreID++;
var nextComponentID = 0;
var getNextComponentID = () => nextComponentID++;
var Recoil_Keys = {
  getNextTreeStateVersion,
  getNextStoreID,
  getNextComponentID
};
var {
  persistentMap: persistentMap$1
} = Recoil_PersistentMap$1;
var {
  graph
} = Recoil_Graph;
var {
  getNextTreeStateVersion: getNextTreeStateVersion$1
} = Recoil_Keys;
function makeEmptyTreeState() {
  const version = getNextTreeStateVersion$1();
  return {
    version,
    stateID: version,
    transactionMetadata: {},
    dirtyAtoms: /* @__PURE__ */ new Set(),
    atomValues: persistentMap$1(),
    nonvalidatedAtoms: persistentMap$1()
  };
}
function makeEmptyStoreState() {
  const currentTree = makeEmptyTreeState();
  return {
    currentTree,
    nextTree: null,
    previousTree: null,
    commitDepth: 0,
    knownAtoms: /* @__PURE__ */ new Set(),
    knownSelectors: /* @__PURE__ */ new Set(),
    transactionSubscriptions: /* @__PURE__ */ new Map(),
    nodeTransactionSubscriptions: /* @__PURE__ */ new Map(),
    nodeToComponentSubscriptions: /* @__PURE__ */ new Map(),
    queuedComponentCallbacks_DEPRECATED: [],
    suspendedComponentResolvers: /* @__PURE__ */ new Set(),
    graphsByVersion: (/* @__PURE__ */ new Map()).set(currentTree.version, graph()),
    retention: {
      referenceCounts: /* @__PURE__ */ new Map(),
      nodesRetainedByZone: /* @__PURE__ */ new Map(),
      retainablesToCheckForRelease: /* @__PURE__ */ new Set()
    },
    nodeCleanupFunctions: /* @__PURE__ */ new Map()
  };
}
var Recoil_State = {
  makeEmptyTreeState,
  makeEmptyStoreState,
  getNextTreeStateVersion: getNextTreeStateVersion$1
};
var RetentionZone = class {
};
function retentionZone() {
  return new RetentionZone();
}
var Recoil_RetentionZone = {
  RetentionZone,
  retentionZone
};
function setByAddingToSet(set, v2) {
  const next = new Set(set);
  next.add(v2);
  return next;
}
function setByDeletingFromSet(set, v2) {
  const next = new Set(set);
  next.delete(v2);
  return next;
}
function mapBySettingInMap(map, k2, v2) {
  const next = new Map(map);
  next.set(k2, v2);
  return next;
}
function mapByUpdatingInMap(map, k2, updater) {
  const next = new Map(map);
  next.set(k2, updater(next.get(k2)));
  return next;
}
function mapByDeletingFromMap(map, k2) {
  const next = new Map(map);
  next.delete(k2);
  return next;
}
function mapByDeletingMultipleFromMap(map, ks) {
  const next = new Map(map);
  ks.forEach((k2) => next.delete(k2));
  return next;
}
var Recoil_CopyOnWrite = {
  setByAddingToSet,
  setByDeletingFromSet,
  mapBySettingInMap,
  mapByUpdatingInMap,
  mapByDeletingFromMap,
  mapByDeletingMultipleFromMap
};
function* filterIterable(iterable, predicate) {
  let index = 0;
  for (const value of iterable) {
    if (predicate(value, index++)) {
      yield value;
    }
  }
}
var Recoil_filterIterable = filterIterable;
function lazyProxy(base, factories) {
  const proxy = new Proxy(base, {
    // Compute and cache lazy property if not already done.
    get: (target, prop) => {
      if (!(prop in target) && prop in factories) {
        target[prop] = factories[prop]();
      }
      return target[prop];
    },
    // This method allows user to iterate keys as normal
    ownKeys: (target) => {
      return Object.keys(target);
    }
  });
  return proxy;
}
var Recoil_lazyProxy = lazyProxy;
var {
  getNode: getNode$1,
  getNodeMaybe: getNodeMaybe$1,
  recoilValuesForKeys: recoilValuesForKeys$1
} = Recoil_Node;
var {
  RetentionZone: RetentionZone$1
} = Recoil_RetentionZone;
var {
  setByAddingToSet: setByAddingToSet$1
} = Recoil_CopyOnWrite;
var emptySet = Object.freeze(/* @__PURE__ */ new Set());
var ReadOnlyRecoilValueError = class extends Error {
};
function initializeRetentionForNode(store, nodeKey, retainedBy) {
  if (!Recoil_gkx("recoil_memory_managament_2020")) {
    return () => void 0;
  }
  const {
    nodesRetainedByZone: nodesRetainedByZone2
  } = store.getState().retention;
  function addToZone(zone) {
    let set = nodesRetainedByZone2.get(zone);
    if (!set) {
      nodesRetainedByZone2.set(zone, set = /* @__PURE__ */ new Set());
    }
    set.add(nodeKey);
  }
  if (retainedBy instanceof RetentionZone$1) {
    addToZone(retainedBy);
  } else if (Array.isArray(retainedBy)) {
    for (const zone of retainedBy) {
      addToZone(zone);
    }
  }
  return () => {
    if (!Recoil_gkx("recoil_memory_managament_2020")) {
      return;
    }
    const {
      retention
    } = store.getState();
    function deleteFromZone(zone) {
      const set = retention.nodesRetainedByZone.get(zone);
      set === null || set === void 0 ? void 0 : set.delete(nodeKey);
      if (set && set.size === 0) {
        retention.nodesRetainedByZone.delete(zone);
      }
    }
    if (retainedBy instanceof RetentionZone$1) {
      deleteFromZone(retainedBy);
    } else if (Array.isArray(retainedBy)) {
      for (const zone of retainedBy) {
        deleteFromZone(zone);
      }
    }
  };
}
function initializeNodeIfNewToStore(store, treeState, key, trigger) {
  const storeState = store.getState();
  if (storeState.nodeCleanupFunctions.has(key)) {
    return;
  }
  const node = getNode$1(key);
  const retentionCleanup = initializeRetentionForNode(store, key, node.retainedBy);
  const nodeCleanup = node.init(store, treeState, trigger);
  storeState.nodeCleanupFunctions.set(key, () => {
    nodeCleanup();
    retentionCleanup();
  });
}
function initializeNode(store, key, trigger) {
  initializeNodeIfNewToStore(store, store.getState().currentTree, key, trigger);
}
function cleanUpNode(store, key) {
  var _state$nodeCleanupFun;
  const state = store.getState();
  (_state$nodeCleanupFun = state.nodeCleanupFunctions.get(key)) === null || _state$nodeCleanupFun === void 0 ? void 0 : _state$nodeCleanupFun();
  state.nodeCleanupFunctions.delete(key);
}
function getNodeLoadable(store, state, key) {
  initializeNodeIfNewToStore(store, state, key, "get");
  return getNode$1(key).get(store, state);
}
function peekNodeLoadable(store, state, key) {
  return getNode$1(key).peek(store, state);
}
function setUnvalidatedAtomValue_DEPRECATED(state, key, newValue) {
  var _node$invalidate;
  const node = getNodeMaybe$1(key);
  node === null || node === void 0 ? void 0 : (_node$invalidate = node.invalidate) === null || _node$invalidate === void 0 ? void 0 : _node$invalidate.call(node, state);
  return {
    ...state,
    atomValues: state.atomValues.clone().delete(key),
    nonvalidatedAtoms: state.nonvalidatedAtoms.clone().set(key, newValue),
    dirtyAtoms: setByAddingToSet$1(state.dirtyAtoms, key)
  };
}
function setNodeValue(store, state, key, newValue) {
  const node = getNode$1(key);
  if (node.set == null) {
    throw new ReadOnlyRecoilValueError(`Attempt to set read-only RecoilValue: ${key}`);
  }
  const set = node.set;
  initializeNodeIfNewToStore(store, state, key, "set");
  return set(store, state, newValue);
}
function peekNodeInfo(store, state, key) {
  const storeState = store.getState();
  const graph2 = store.getGraph(state.version);
  const type = getNode$1(key).nodeType;
  return Recoil_lazyProxy({
    type
  }, {
    // $FlowFixMe[underconstrained-implicit-instantiation]
    loadable: () => peekNodeLoadable(store, state, key),
    isActive: () => storeState.knownAtoms.has(key) || storeState.knownSelectors.has(key),
    isSet: () => type === "selector" ? false : state.atomValues.has(key),
    isModified: () => state.dirtyAtoms.has(key),
    // Report current dependencies.  If the node hasn't been evaluated, then
    // dependencies may be missing based on the current state.
    deps: () => {
      var _graph$nodeDeps$get;
      return recoilValuesForKeys$1((_graph$nodeDeps$get = graph2.nodeDeps.get(key)) !== null && _graph$nodeDeps$get !== void 0 ? _graph$nodeDeps$get : []);
    },
    // Reports all "current" subscribers.  Evaluating other nodes or
    // previous in-progress async evaluations may introduce new subscribers.
    subscribers: () => {
      var _storeState$nodeToCom, _storeState$nodeToCom2;
      return {
        nodes: recoilValuesForKeys$1(Recoil_filterIterable(getDownstreamNodes(store, state, /* @__PURE__ */ new Set([key])), (nodeKey) => nodeKey !== key)),
        components: Recoil_mapIterable((_storeState$nodeToCom = (_storeState$nodeToCom2 = storeState.nodeToComponentSubscriptions.get(key)) === null || _storeState$nodeToCom2 === void 0 ? void 0 : _storeState$nodeToCom2.values()) !== null && _storeState$nodeToCom !== void 0 ? _storeState$nodeToCom : [], ([name]) => ({
          name
        }))
      };
    }
  });
}
function getDownstreamNodes(store, state, keys) {
  const visitedNodes = /* @__PURE__ */ new Set();
  const visitingNodes = Array.from(keys);
  const graph2 = store.getGraph(state.version);
  for (let key = visitingNodes.pop(); key; key = visitingNodes.pop()) {
    var _graph$nodeToNodeSubs;
    visitedNodes.add(key);
    const subscribedNodes = (_graph$nodeToNodeSubs = graph2.nodeToNodeSubscriptions.get(key)) !== null && _graph$nodeToNodeSubs !== void 0 ? _graph$nodeToNodeSubs : emptySet;
    for (const downstreamNode of subscribedNodes) {
      if (!visitedNodes.has(downstreamNode)) {
        visitingNodes.push(downstreamNode);
      }
    }
  }
  return visitedNodes;
}
var Recoil_FunctionalCore = {
  getNodeLoadable,
  peekNodeLoadable,
  setNodeValue,
  initializeNode,
  cleanUpNode,
  setUnvalidatedAtomValue_DEPRECATED,
  peekNodeInfo,
  getDownstreamNodes
};
var _invalidateMemoizedSnapshot = null;
function setInvalidateMemoizedSnapshot(invalidate) {
  _invalidateMemoizedSnapshot = invalidate;
}
function invalidateMemoizedSnapshot() {
  var _invalidateMemoizedSn;
  (_invalidateMemoizedSn = _invalidateMemoizedSnapshot) === null || _invalidateMemoizedSn === void 0 ? void 0 : _invalidateMemoizedSn();
}
var Recoil_SnapshotCache = {
  setInvalidateMemoizedSnapshot,
  invalidateMemoizedSnapshot
};
var {
  getDownstreamNodes: getDownstreamNodes$1,
  getNodeLoadable: getNodeLoadable$1,
  setNodeValue: setNodeValue$1
} = Recoil_FunctionalCore;
var {
  getNextComponentID: getNextComponentID$1
} = Recoil_Keys;
var {
  getNode: getNode$2,
  getNodeMaybe: getNodeMaybe$2
} = Recoil_Node;
var {
  DefaultValue: DefaultValue$1
} = Recoil_Node;
var {
  reactMode: reactMode$1
} = Recoil_ReactMode;
var {
  AbstractRecoilValue: AbstractRecoilValue$1,
  RecoilState: RecoilState$1,
  RecoilValueReadOnly: RecoilValueReadOnly$1,
  isRecoilValue: isRecoilValue$1
} = Recoil_RecoilValue$1;
var {
  invalidateMemoizedSnapshot: invalidateMemoizedSnapshot$1
} = Recoil_SnapshotCache;
function getRecoilValueAsLoadable(store, {
  key
}, treeState = store.getState().currentTree) {
  var _storeState$nextTree, _storeState$previousT;
  const storeState = store.getState();
  if (!(treeState.version === storeState.currentTree.version || treeState.version === ((_storeState$nextTree = storeState.nextTree) === null || _storeState$nextTree === void 0 ? void 0 : _storeState$nextTree.version) || treeState.version === ((_storeState$previousT = storeState.previousTree) === null || _storeState$previousT === void 0 ? void 0 : _storeState$previousT.version))) {
    Recoil_recoverableViolation("Tried to read from a discarded tree");
  }
  const loadable = getNodeLoadable$1(store, treeState, key);
  if (loadable.state === "loading") {
    loadable.contents.catch(() => {
      return;
    });
  }
  return loadable;
}
function applyAtomValueWrites(atomValues, writes) {
  const result = atomValues.clone();
  writes.forEach((v2, k2) => {
    if (v2.state === "hasValue" && v2.contents instanceof DefaultValue$1) {
      result.delete(k2);
    } else {
      result.set(k2, v2);
    }
  });
  return result;
}
function valueFromValueOrUpdater(store, state, {
  key
}, valueOrUpdater) {
  if (typeof valueOrUpdater === "function") {
    const current = getNodeLoadable$1(store, state, key);
    if (current.state === "loading") {
      const msg = `Tried to set atom or selector "${key}" using an updater function while the current state is pending, this is not currently supported.`;
      Recoil_recoverableViolation(msg);
      throw Recoil_err(msg);
    } else if (current.state === "hasError") {
      throw current.contents;
    }
    return valueOrUpdater(current.contents);
  } else {
    return valueOrUpdater;
  }
}
function applyAction(store, state, action) {
  if (action.type === "set") {
    const {
      recoilValue,
      valueOrUpdater
    } = action;
    const newValue = valueFromValueOrUpdater(store, state, recoilValue, valueOrUpdater);
    const writes = setNodeValue$1(store, state, recoilValue.key, newValue);
    for (const [key, loadable] of writes.entries()) {
      writeLoadableToTreeState(state, key, loadable);
    }
  } else if (action.type === "setLoadable") {
    const {
      recoilValue: {
        key
      },
      loadable
    } = action;
    writeLoadableToTreeState(state, key, loadable);
  } else if (action.type === "markModified") {
    const {
      recoilValue: {
        key
      }
    } = action;
    state.dirtyAtoms.add(key);
  } else if (action.type === "setUnvalidated") {
    var _node$invalidate;
    const {
      recoilValue: {
        key
      },
      unvalidatedValue
    } = action;
    const node = getNodeMaybe$2(key);
    node === null || node === void 0 ? void 0 : (_node$invalidate = node.invalidate) === null || _node$invalidate === void 0 ? void 0 : _node$invalidate.call(node, state);
    state.atomValues.delete(key);
    state.nonvalidatedAtoms.set(key, unvalidatedValue);
    state.dirtyAtoms.add(key);
  } else {
    Recoil_recoverableViolation(`Unknown action ${action.type}`);
  }
}
function writeLoadableToTreeState(state, key, loadable) {
  if (loadable.state === "hasValue" && loadable.contents instanceof DefaultValue$1) {
    state.atomValues.delete(key);
  } else {
    state.atomValues.set(key, loadable);
  }
  state.dirtyAtoms.add(key);
  state.nonvalidatedAtoms.delete(key);
}
function applyActionsToStore(store, actions) {
  store.replaceState((state) => {
    const newState = copyTreeState(state);
    for (const action of actions) {
      applyAction(store, newState, action);
    }
    invalidateDownstreams(store, newState);
    invalidateMemoizedSnapshot$1();
    return newState;
  });
}
function queueOrPerformStateUpdate(store, action) {
  if (batchStack.length) {
    const actionsByStore = batchStack[batchStack.length - 1];
    let actions = actionsByStore.get(store);
    if (!actions) {
      actionsByStore.set(store, actions = []);
    }
    actions.push(action);
  } else {
    applyActionsToStore(store, [action]);
  }
}
var batchStack = [];
function batchStart() {
  const actionsByStore = /* @__PURE__ */ new Map();
  batchStack.push(actionsByStore);
  return () => {
    for (const [store, actions] of actionsByStore) {
      applyActionsToStore(store, actions);
    }
    const popped = batchStack.pop();
    if (popped !== actionsByStore) {
      Recoil_recoverableViolation("Incorrect order of batch popping");
    }
  };
}
function copyTreeState(state) {
  return {
    ...state,
    atomValues: state.atomValues.clone(),
    nonvalidatedAtoms: state.nonvalidatedAtoms.clone(),
    dirtyAtoms: new Set(state.dirtyAtoms)
  };
}
function invalidateDownstreams(store, state) {
  const downstreams = getDownstreamNodes$1(store, state, state.dirtyAtoms);
  for (const key of downstreams) {
    var _getNodeMaybe, _getNodeMaybe$invalid;
    (_getNodeMaybe = getNodeMaybe$2(key)) === null || _getNodeMaybe === void 0 ? void 0 : (_getNodeMaybe$invalid = _getNodeMaybe.invalidate) === null || _getNodeMaybe$invalid === void 0 ? void 0 : _getNodeMaybe$invalid.call(_getNodeMaybe, state);
  }
}
function setRecoilValue(store, recoilValue, valueOrUpdater) {
  queueOrPerformStateUpdate(store, {
    type: "set",
    recoilValue,
    valueOrUpdater
  });
}
function setRecoilValueLoadable(store, recoilValue, loadable) {
  if (loadable instanceof DefaultValue$1) {
    return setRecoilValue(store, recoilValue, loadable);
  }
  queueOrPerformStateUpdate(store, {
    type: "setLoadable",
    recoilValue,
    loadable
  });
}
function markRecoilValueModified(store, recoilValue) {
  queueOrPerformStateUpdate(store, {
    type: "markModified",
    recoilValue
  });
}
function setUnvalidatedRecoilValue(store, recoilValue, unvalidatedValue) {
  queueOrPerformStateUpdate(store, {
    type: "setUnvalidated",
    recoilValue,
    unvalidatedValue
  });
}
function subscribeToRecoilValue(store, {
  key
}, callback, componentDebugName = null) {
  const subID = getNextComponentID$1();
  const storeState = store.getState();
  if (!storeState.nodeToComponentSubscriptions.has(key)) {
    storeState.nodeToComponentSubscriptions.set(key, /* @__PURE__ */ new Map());
  }
  Recoil_nullthrows(storeState.nodeToComponentSubscriptions.get(key)).set(subID, [componentDebugName !== null && componentDebugName !== void 0 ? componentDebugName : "<not captured>", callback]);
  const mode = reactMode$1();
  if (mode.early && (mode.mode === "LEGACY" || mode.mode === "MUTABLE_SOURCE")) {
    const nextTree = store.getState().nextTree;
    if (nextTree && nextTree.dirtyAtoms.has(key)) {
      callback(nextTree);
    }
  }
  return {
    release: () => {
      const releaseStoreState = store.getState();
      const subs = releaseStoreState.nodeToComponentSubscriptions.get(key);
      if (subs === void 0 || !subs.has(subID)) {
        Recoil_recoverableViolation(`Subscription missing at release time for atom ${key}. This is a bug in Recoil.`);
        return;
      }
      subs.delete(subID);
      if (subs.size === 0) {
        releaseStoreState.nodeToComponentSubscriptions.delete(key);
      }
    }
  };
}
function refreshRecoilValue(store, recoilValue) {
  var _node$clearCache;
  const {
    currentTree
  } = store.getState();
  const node = getNode$2(recoilValue.key);
  (_node$clearCache = node.clearCache) === null || _node$clearCache === void 0 ? void 0 : _node$clearCache.call(node, store, currentTree);
}
var Recoil_RecoilValueInterface = {
  RecoilValueReadOnly: RecoilValueReadOnly$1,
  AbstractRecoilValue: AbstractRecoilValue$1,
  RecoilState: RecoilState$1,
  getRecoilValueAsLoadable,
  setRecoilValue,
  setRecoilValueLoadable,
  markRecoilValueModified,
  setUnvalidatedRecoilValue,
  subscribeToRecoilValue,
  isRecoilValue: isRecoilValue$1,
  applyAtomValueWrites,
  // TODO Remove export when deprecating initialStoreState_DEPRECATED in RecoilRoot
  batchStart,
  writeLoadableToTreeState,
  invalidateDownstreams,
  copyTreeState,
  refreshRecoilValue
};
function someSet(set, callback, context) {
  const iterator = set.entries();
  let current = iterator.next();
  while (!current.done) {
    const entry = current.value;
    if (callback.call(context, entry[1], entry[0], set)) {
      return true;
    }
    current = iterator.next();
  }
  return false;
}
var Recoil_someSet = someSet;
var {
  cleanUpNode: cleanUpNode$1
} = Recoil_FunctionalCore;
var {
  deleteNodeConfigIfPossible: deleteNodeConfigIfPossible$1,
  getNode: getNode$3
} = Recoil_Node;
var {
  RetentionZone: RetentionZone$2
} = Recoil_RetentionZone;
var SUSPENSE_TIMEOUT_MS = 12e4;
var emptySet$1 = /* @__PURE__ */ new Set();
function releaseRetainablesNowOnCurrentTree(store, retainables) {
  const storeState = store.getState();
  const treeState = storeState.currentTree;
  if (storeState.nextTree) {
    Recoil_recoverableViolation("releaseNodesNowOnCurrentTree should only be called at the end of a batch");
    return;
  }
  const nodes2 = /* @__PURE__ */ new Set();
  for (const r2 of retainables) {
    if (r2 instanceof RetentionZone$2) {
      for (const n2 of nodesRetainedByZone(storeState, r2)) {
        nodes2.add(n2);
      }
    } else {
      nodes2.add(r2);
    }
  }
  const releasableNodes = findReleasableNodes(store, nodes2);
  for (const node of releasableNodes) {
    releaseNode(store, treeState, node);
  }
}
function findReleasableNodes(store, searchFromNodes) {
  const storeState = store.getState();
  const treeState = storeState.currentTree;
  const graph2 = store.getGraph(treeState.version);
  const releasableNodes = /* @__PURE__ */ new Set();
  const nonReleasableNodes = /* @__PURE__ */ new Set();
  findReleasableNodesInner(searchFromNodes);
  return releasableNodes;
  function findReleasableNodesInner(searchFromNodes2) {
    const releasableNodesFoundThisIteration = /* @__PURE__ */ new Set();
    const downstreams = getDownstreamNodesInTopologicalOrder(
      store,
      treeState,
      searchFromNodes2,
      releasableNodes,
      // don't descend into these
      nonReleasableNodes
      // don't descend into these
    );
    for (const node of downstreams) {
      var _storeState$retention;
      if (getNode$3(node).retainedBy === "recoilRoot") {
        nonReleasableNodes.add(node);
        continue;
      }
      if (((_storeState$retention = storeState.retention.referenceCounts.get(node)) !== null && _storeState$retention !== void 0 ? _storeState$retention : 0) > 0) {
        nonReleasableNodes.add(node);
        continue;
      }
      if (zonesThatCouldRetainNode(node).some((z2) => storeState.retention.referenceCounts.get(z2))) {
        nonReleasableNodes.add(node);
        continue;
      }
      const nodeChildren = graph2.nodeToNodeSubscriptions.get(node);
      if (nodeChildren && Recoil_someSet(nodeChildren, (child) => nonReleasableNodes.has(child))) {
        nonReleasableNodes.add(node);
        continue;
      }
      releasableNodes.add(node);
      releasableNodesFoundThisIteration.add(node);
    }
    const parents = /* @__PURE__ */ new Set();
    for (const node of releasableNodesFoundThisIteration) {
      for (const parent of (_graph$nodeDeps$get = graph2.nodeDeps.get(node)) !== null && _graph$nodeDeps$get !== void 0 ? _graph$nodeDeps$get : emptySet$1) {
        var _graph$nodeDeps$get;
        if (!releasableNodes.has(parent)) {
          parents.add(parent);
        }
      }
    }
    if (parents.size) {
      findReleasableNodesInner(parents);
    }
  }
}
function getDownstreamNodesInTopologicalOrder(store, treeState, nodes2, doNotDescendInto1, doNotDescendInto2) {
  const graph2 = store.getGraph(treeState.version);
  const answer = [];
  const visited = /* @__PURE__ */ new Set();
  while (nodes2.size > 0) {
    visit(Recoil_nullthrows(nodes2.values().next().value));
  }
  return answer;
  function visit(node) {
    if (doNotDescendInto1.has(node) || doNotDescendInto2.has(node)) {
      nodes2.delete(node);
      return;
    }
    if (visited.has(node)) {
      return;
    }
    const children = graph2.nodeToNodeSubscriptions.get(node);
    if (children) {
      for (const child of children) {
        visit(child);
      }
    }
    visited.add(node);
    nodes2.delete(node);
    answer.push(node);
  }
}
function releaseNode(store, treeState, node) {
  if (!Recoil_gkx("recoil_memory_managament_2020")) {
    return;
  }
  cleanUpNode$1(store, node);
  const storeState = store.getState();
  storeState.knownAtoms.delete(node);
  storeState.knownSelectors.delete(node);
  storeState.nodeTransactionSubscriptions.delete(node);
  storeState.retention.referenceCounts.delete(node);
  const zones = zonesThatCouldRetainNode(node);
  for (const zone of zones) {
    var _storeState$retention2;
    (_storeState$retention2 = storeState.retention.nodesRetainedByZone.get(zone)) === null || _storeState$retention2 === void 0 ? void 0 : _storeState$retention2.delete(node);
  }
  treeState.atomValues.delete(node);
  treeState.dirtyAtoms.delete(node);
  treeState.nonvalidatedAtoms.delete(node);
  const graph2 = storeState.graphsByVersion.get(treeState.version);
  if (graph2) {
    const deps = graph2.nodeDeps.get(node);
    if (deps !== void 0) {
      graph2.nodeDeps.delete(node);
      for (const dep of deps) {
        var _graph$nodeToNodeSubs;
        (_graph$nodeToNodeSubs = graph2.nodeToNodeSubscriptions.get(dep)) === null || _graph$nodeToNodeSubs === void 0 ? void 0 : _graph$nodeToNodeSubs.delete(node);
      }
    }
    graph2.nodeToNodeSubscriptions.delete(node);
  }
  deleteNodeConfigIfPossible$1(node);
}
function nodesRetainedByZone(storeState, zone) {
  var _storeState$retention3;
  return (_storeState$retention3 = storeState.retention.nodesRetainedByZone.get(zone)) !== null && _storeState$retention3 !== void 0 ? _storeState$retention3 : emptySet$1;
}
function zonesThatCouldRetainNode(node) {
  const retainedBy = getNode$3(node).retainedBy;
  if (retainedBy === void 0 || retainedBy === "components" || retainedBy === "recoilRoot") {
    return [];
  } else if (retainedBy instanceof RetentionZone$2) {
    return [retainedBy];
  } else {
    return retainedBy;
  }
}
function scheduleOrPerformPossibleReleaseOfRetainable(store, retainable) {
  const state = store.getState();
  if (state.nextTree) {
    state.retention.retainablesToCheckForRelease.add(retainable);
  } else {
    releaseRetainablesNowOnCurrentTree(store, /* @__PURE__ */ new Set([retainable]));
  }
}
function updateRetainCount(store, retainable, delta) {
  var _map$get;
  if (!Recoil_gkx("recoil_memory_managament_2020")) {
    return;
  }
  const map = store.getState().retention.referenceCounts;
  const newCount = ((_map$get = map.get(retainable)) !== null && _map$get !== void 0 ? _map$get : 0) + delta;
  if (newCount === 0) {
    updateRetainCountToZero(store, retainable);
  } else {
    map.set(retainable, newCount);
  }
}
function updateRetainCountToZero(store, retainable) {
  if (!Recoil_gkx("recoil_memory_managament_2020")) {
    return;
  }
  const map = store.getState().retention.referenceCounts;
  map.delete(retainable);
  scheduleOrPerformPossibleReleaseOfRetainable(store, retainable);
}
function releaseScheduledRetainablesNow(store) {
  if (!Recoil_gkx("recoil_memory_managament_2020")) {
    return;
  }
  const state = store.getState();
  releaseRetainablesNowOnCurrentTree(store, state.retention.retainablesToCheckForRelease);
  state.retention.retainablesToCheckForRelease.clear();
}
function retainedByOptionWithDefault(r2) {
  return r2 === void 0 ? "recoilRoot" : r2;
}
var Recoil_Retention = {
  SUSPENSE_TIMEOUT_MS,
  updateRetainCount,
  updateRetainCountToZero,
  releaseScheduledRetainablesNow,
  retainedByOptionWithDefault
};
var {
  unstable_batchedUpdates
} = import_react_dom.default;
var ReactBatchedUpdates = {
  unstable_batchedUpdates
};
var {
  unstable_batchedUpdates: unstable_batchedUpdates$1
} = ReactBatchedUpdates;
var Recoil_ReactBatchedUpdates = {
  unstable_batchedUpdates: unstable_batchedUpdates$1
};
var {
  batchStart: batchStart$1
} = Recoil_RecoilValueInterface;
var {
  unstable_batchedUpdates: unstable_batchedUpdates$2
} = Recoil_ReactBatchedUpdates;
var batcher = unstable_batchedUpdates$2 || ((batchFn) => batchFn());
var setBatcher = (newBatcher) => {
  batcher = newBatcher;
};
var getBatcher = () => batcher;
var batchUpdates = (callback) => {
  batcher(() => {
    let batchEnd = () => void 0;
    try {
      batchEnd = batchStart$1();
      callback();
    } finally {
      batchEnd();
    }
  });
};
var Recoil_Batching = {
  getBatcher,
  setBatcher,
  batchUpdates
};
function* concatIterables(iters) {
  for (const iter of iters) {
    for (const val of iter) {
      yield val;
    }
  }
}
var Recoil_concatIterables = concatIterables;
var isSSR = (
  // $FlowFixMe(site=recoil) Window does not have a FlowType definition https://github.com/facebook/flow/issues/6709
  typeof Window === "undefined" || typeof window === "undefined"
);
var isWindow = (value) => !isSSR && // $FlowFixMe(site=recoil) Window does not have a FlowType definition https://github.com/facebook/flow/issues/6709
(value === window || value instanceof Window);
var isReactNative = typeof navigator !== "undefined" && navigator.product === "ReactNative";
var Recoil_Environment = {
  isSSR,
  isReactNative,
  isWindow
};
function memoizeWithArgsHash(fn2, hashFunction) {
  let cache;
  return (...args) => {
    if (!cache) {
      cache = {};
    }
    const key = hashFunction(...args);
    if (!Object.hasOwnProperty.call(cache, key)) {
      cache[key] = fn2(...args);
    }
    return cache[key];
  };
}
function memoizeOneWithArgsHash(fn2, hashFunction) {
  let lastKey;
  let lastResult;
  return (...args) => {
    const key = hashFunction(...args);
    if (lastKey === key) {
      return lastResult;
    }
    lastKey = key;
    lastResult = fn2(...args);
    return lastResult;
  };
}
function memoizeOneWithArgsHashAndInvalidation(fn2, hashFunction) {
  let lastKey;
  let lastResult;
  const memoizedFn = (...args) => {
    const key = hashFunction(...args);
    if (lastKey === key) {
      return lastResult;
    }
    lastKey = key;
    lastResult = fn2(...args);
    return lastResult;
  };
  const invalidate = () => {
    lastKey = null;
  };
  return [memoizedFn, invalidate];
}
var Recoil_Memoize = {
  memoizeWithArgsHash,
  memoizeOneWithArgsHash,
  memoizeOneWithArgsHashAndInvalidation
};
var {
  batchUpdates: batchUpdates$1
} = Recoil_Batching;
var {
  initializeNode: initializeNode$1,
  peekNodeInfo: peekNodeInfo$1
} = Recoil_FunctionalCore;
var {
  graph: graph$1
} = Recoil_Graph;
var {
  getNextStoreID: getNextStoreID$1
} = Recoil_Keys;
var {
  DEFAULT_VALUE: DEFAULT_VALUE$1,
  recoilValues: recoilValues$1,
  recoilValuesForKeys: recoilValuesForKeys$2
} = Recoil_Node;
var {
  AbstractRecoilValue: AbstractRecoilValue$2,
  getRecoilValueAsLoadable: getRecoilValueAsLoadable$1,
  setRecoilValue: setRecoilValue$1,
  setUnvalidatedRecoilValue: setUnvalidatedRecoilValue$1
} = Recoil_RecoilValueInterface;
var {
  updateRetainCount: updateRetainCount$1
} = Recoil_Retention;
var {
  setInvalidateMemoizedSnapshot: setInvalidateMemoizedSnapshot$1
} = Recoil_SnapshotCache;
var {
  getNextTreeStateVersion: getNextTreeStateVersion$2,
  makeEmptyStoreState: makeEmptyStoreState$1
} = Recoil_State;
var {
  isSSR: isSSR$1
} = Recoil_Environment;
var {
  memoizeOneWithArgsHashAndInvalidation: memoizeOneWithArgsHashAndInvalidation$1
} = Recoil_Memoize;
var retainWarning = `
Recoil Snapshots only last for the duration of the callback they are provided to. To keep a Snapshot longer, do this:

  const release = snapshot.retain();
  try {
    await doSomethingWithSnapshot(snapshot);
  } finally {
    release();
  }

This is currently a DEV-only warning but will become a thrown exception in the next release of Recoil.
`;
var Snapshot = class {
  // eslint-disable-next-line fb-www/no-uninitialized-properties
  constructor(storeState, parentStoreID) {
    _defineProperty(this, "_store", void 0);
    _defineProperty(this, "_refCount", 1);
    _defineProperty(this, "getLoadable", (recoilValue) => {
      this.checkRefCount_INTERNAL();
      return getRecoilValueAsLoadable$1(this._store, recoilValue);
    });
    _defineProperty(this, "getPromise", (recoilValue) => {
      this.checkRefCount_INTERNAL();
      return this.getLoadable(recoilValue).toPromise();
    });
    _defineProperty(this, "getNodes_UNSTABLE", (opt) => {
      this.checkRefCount_INTERNAL();
      if ((opt === null || opt === void 0 ? void 0 : opt.isModified) === true) {
        if ((opt === null || opt === void 0 ? void 0 : opt.isInitialized) === false) {
          return [];
        }
        const state = this._store.getState().currentTree;
        return recoilValuesForKeys$2(state.dirtyAtoms);
      }
      const knownAtoms = this._store.getState().knownAtoms;
      const knownSelectors = this._store.getState().knownSelectors;
      return (opt === null || opt === void 0 ? void 0 : opt.isInitialized) == null ? recoilValues$1.values() : opt.isInitialized === true ? recoilValuesForKeys$2(Recoil_concatIterables([knownAtoms, knownSelectors])) : Recoil_filterIterable(recoilValues$1.values(), ({
        key
      }) => !knownAtoms.has(key) && !knownSelectors.has(key));
    });
    _defineProperty(this, "getInfo_UNSTABLE", ({
      key
    }) => {
      this.checkRefCount_INTERNAL();
      return peekNodeInfo$1(this._store, this._store.getState().currentTree, key);
    });
    _defineProperty(this, "map", (mapper) => {
      this.checkRefCount_INTERNAL();
      const mutableSnapshot = new MutableSnapshot(this, batchUpdates$1);
      mapper(mutableSnapshot);
      return mutableSnapshot;
    });
    _defineProperty(this, "asyncMap", async (mapper) => {
      this.checkRefCount_INTERNAL();
      const mutableSnapshot = new MutableSnapshot(this, batchUpdates$1);
      mutableSnapshot.retain();
      await mapper(mutableSnapshot);
      mutableSnapshot.autoRelease_INTERNAL();
      return mutableSnapshot;
    });
    this._store = {
      storeID: getNextStoreID$1(),
      parentStoreID,
      getState: () => storeState,
      replaceState: (replacer) => {
        storeState.currentTree = replacer(storeState.currentTree);
      },
      getGraph: (version) => {
        const graphs = storeState.graphsByVersion;
        if (graphs.has(version)) {
          return Recoil_nullthrows(graphs.get(version));
        }
        const newGraph = graph$1();
        graphs.set(version, newGraph);
        return newGraph;
      },
      subscribeToTransactions: () => ({
        release: () => {
        }
      }),
      addTransactionMetadata: () => {
        throw Recoil_err("Cannot subscribe to Snapshots");
      }
    };
    for (const nodeKey of this._store.getState().knownAtoms) {
      initializeNode$1(this._store, nodeKey, "get");
      updateRetainCount$1(this._store, nodeKey, 1);
    }
    this.autoRelease_INTERNAL();
  }
  retain() {
    if (this._refCount <= 0) {
      if (true) {
        throw Recoil_err("Snapshot has already been released.");
      } else {
        Recoil_recoverableViolation("Attempt to retain() Snapshot that was already released.");
      }
    }
    this._refCount++;
    let released = false;
    return () => {
      if (!released) {
        released = true;
        this._release();
      }
    };
  }
  /**
   * Release the snapshot on the next tick.  This means the snapshot is retained
   * during the execution of the current function using it.
   */
  autoRelease_INTERNAL() {
    if (!isSSR$1) {
      window.setTimeout(() => this._release(), 10);
    }
  }
  _release() {
    this._refCount--;
    if (this._refCount === 0) {
      this._store.getState().nodeCleanupFunctions.forEach((cleanup) => cleanup());
      this._store.getState().nodeCleanupFunctions.clear();
      if (!Recoil_gkx("recoil_memory_managament_2020")) {
        return;
      }
    } else if (this._refCount < 0) {
      if (true) {
        Recoil_recoverableViolation("Snapshot released an extra time.");
      }
    }
  }
  isRetained() {
    return this._refCount > 0;
  }
  checkRefCount_INTERNAL() {
    if (Recoil_gkx("recoil_memory_managament_2020") && this._refCount <= 0) {
      if (true) {
        Recoil_recoverableViolation(retainWarning);
      }
    }
  }
  getStore_INTERNAL() {
    this.checkRefCount_INTERNAL();
    return this._store;
  }
  getID() {
    this.checkRefCount_INTERNAL();
    return this._store.getState().currentTree.stateID;
  }
  getStoreID() {
    this.checkRefCount_INTERNAL();
    return this._store.storeID;
  }
  // We want to allow the methods to be destructured and used as accessors
  /* eslint-disable fb-www/extra-arrow-initializer */
  /* eslint-enable fb-www/extra-arrow-initializer */
};
function cloneStoreState(store, treeState, bumpVersion = false) {
  const storeState = store.getState();
  const version = bumpVersion ? getNextTreeStateVersion$2() : treeState.version;
  return {
    // Always clone the TreeState to isolate stores from accidental mutations.
    // For example, reading a selector from a cloned snapshot shouldn't cache
    // in the original treestate which may cause the original to skip
    // initialization of upstream atoms.
    currentTree: {
      // TODO snapshots shouldn't really have versions because a new version number
      // is always assigned when the snapshot is gone to.
      version: bumpVersion ? version : treeState.version,
      stateID: bumpVersion ? version : treeState.stateID,
      transactionMetadata: {
        ...treeState.transactionMetadata
      },
      dirtyAtoms: new Set(treeState.dirtyAtoms),
      atomValues: treeState.atomValues.clone(),
      nonvalidatedAtoms: treeState.nonvalidatedAtoms.clone()
    },
    commitDepth: 0,
    nextTree: null,
    previousTree: null,
    knownAtoms: new Set(storeState.knownAtoms),
    // FIXME here's a copy
    knownSelectors: new Set(storeState.knownSelectors),
    // FIXME here's a copy
    transactionSubscriptions: /* @__PURE__ */ new Map(),
    nodeTransactionSubscriptions: /* @__PURE__ */ new Map(),
    nodeToComponentSubscriptions: /* @__PURE__ */ new Map(),
    queuedComponentCallbacks_DEPRECATED: [],
    suspendedComponentResolvers: /* @__PURE__ */ new Set(),
    graphsByVersion: (/* @__PURE__ */ new Map()).set(version, store.getGraph(treeState.version)),
    retention: {
      referenceCounts: /* @__PURE__ */ new Map(),
      nodesRetainedByZone: /* @__PURE__ */ new Map(),
      retainablesToCheckForRelease: /* @__PURE__ */ new Set()
    },
    // FIXME here's a copy
    // Create blank cleanup handlers for atoms so snapshots don't re-run
    // atom effects.
    nodeCleanupFunctions: new Map(Recoil_mapIterable(storeState.nodeCleanupFunctions.entries(), ([key]) => [key, () => {
    }]))
  };
}
function freshSnapshot(initializeState) {
  const snapshot = new Snapshot(makeEmptyStoreState$1());
  return initializeState != null ? snapshot.map(initializeState) : snapshot;
}
var [memoizedCloneSnapshot, invalidateMemoizedSnapshot$2] = memoizeOneWithArgsHashAndInvalidation$1(
  // $FlowFixMe[missing-local-annot]
  (store, version) => {
    var _storeState$nextTree;
    const storeState = store.getState();
    const treeState = version === "latest" ? (_storeState$nextTree = storeState.nextTree) !== null && _storeState$nextTree !== void 0 ? _storeState$nextTree : storeState.currentTree : Recoil_nullthrows(storeState.previousTree);
    return new Snapshot(cloneStoreState(store, treeState), store.storeID);
  },
  (store, version) => {
    var _store$getState$nextT, _store$getState$previ;
    return String(version) + String(store.storeID) + String((_store$getState$nextT = store.getState().nextTree) === null || _store$getState$nextT === void 0 ? void 0 : _store$getState$nextT.version) + String(store.getState().currentTree.version) + String((_store$getState$previ = store.getState().previousTree) === null || _store$getState$previ === void 0 ? void 0 : _store$getState$previ.version);
  }
);
setInvalidateMemoizedSnapshot$1(invalidateMemoizedSnapshot$2);
function cloneSnapshot(store, version = "latest") {
  const snapshot = memoizedCloneSnapshot(store, version);
  if (!snapshot.isRetained()) {
    invalidateMemoizedSnapshot$2();
    return memoizedCloneSnapshot(store, version);
  }
  return snapshot;
}
var MutableSnapshot = class extends Snapshot {
  constructor(snapshot, batch) {
    super(cloneStoreState(snapshot.getStore_INTERNAL(), snapshot.getStore_INTERNAL().getState().currentTree, true), snapshot.getStoreID());
    _defineProperty(this, "_batch", void 0);
    _defineProperty(this, "set", (recoilState, newValueOrUpdater) => {
      this.checkRefCount_INTERNAL();
      const store = this.getStore_INTERNAL();
      this._batch(() => {
        updateRetainCount$1(store, recoilState.key, 1);
        setRecoilValue$1(this.getStore_INTERNAL(), recoilState, newValueOrUpdater);
      });
    });
    _defineProperty(this, "reset", (recoilState) => {
      this.checkRefCount_INTERNAL();
      const store = this.getStore_INTERNAL();
      this._batch(() => {
        updateRetainCount$1(store, recoilState.key, 1);
        setRecoilValue$1(this.getStore_INTERNAL(), recoilState, DEFAULT_VALUE$1);
      });
    });
    _defineProperty(this, "setUnvalidatedAtomValues_DEPRECATED", (values) => {
      this.checkRefCount_INTERNAL();
      const store = this.getStore_INTERNAL();
      batchUpdates$1(() => {
        for (const [k2, v2] of values.entries()) {
          updateRetainCount$1(store, k2, 1);
          setUnvalidatedRecoilValue$1(store, new AbstractRecoilValue$2(k2), v2);
        }
      });
    });
    this._batch = batch;
  }
};
var Recoil_Snapshot = {
  Snapshot,
  MutableSnapshot,
  freshSnapshot,
  cloneSnapshot
};
var Recoil_Snapshot_1 = Recoil_Snapshot.Snapshot;
var Recoil_Snapshot_2 = Recoil_Snapshot.MutableSnapshot;
var Recoil_Snapshot_3 = Recoil_Snapshot.freshSnapshot;
var Recoil_Snapshot_4 = Recoil_Snapshot.cloneSnapshot;
var Recoil_Snapshot$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  Snapshot: Recoil_Snapshot_1,
  MutableSnapshot: Recoil_Snapshot_2,
  freshSnapshot: Recoil_Snapshot_3,
  cloneSnapshot: Recoil_Snapshot_4
});
function unionSets(...sets) {
  const result = /* @__PURE__ */ new Set();
  for (const set of sets) {
    for (const value of set) {
      result.add(value);
    }
  }
  return result;
}
var Recoil_unionSets = unionSets;
var {
  useRef
} = import_react.default;
function useRefInitOnce(initialValue) {
  const ref = useRef(initialValue);
  if (ref.current === initialValue && typeof initialValue === "function") {
    ref.current = initialValue();
  }
  return ref;
}
var Recoil_useRefInitOnce = useRefInitOnce;
var {
  getNextTreeStateVersion: getNextTreeStateVersion$3,
  makeEmptyStoreState: makeEmptyStoreState$2
} = Recoil_State;
var {
  cleanUpNode: cleanUpNode$2,
  getDownstreamNodes: getDownstreamNodes$2,
  initializeNode: initializeNode$2,
  setNodeValue: setNodeValue$2,
  setUnvalidatedAtomValue_DEPRECATED: setUnvalidatedAtomValue_DEPRECATED$1
} = Recoil_FunctionalCore;
var {
  graph: graph$2
} = Recoil_Graph;
var {
  cloneGraph: cloneGraph$1
} = Recoil_Graph;
var {
  getNextStoreID: getNextStoreID$2
} = Recoil_Keys;
var {
  createMutableSource: createMutableSource$1,
  reactMode: reactMode$2
} = Recoil_ReactMode;
var {
  applyAtomValueWrites: applyAtomValueWrites$1
} = Recoil_RecoilValueInterface;
var {
  releaseScheduledRetainablesNow: releaseScheduledRetainablesNow$1
} = Recoil_Retention;
var {
  freshSnapshot: freshSnapshot$1
} = Recoil_Snapshot$1;
var {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef: useRef$1,
  useState
} = import_react.default;
function notInAContext() {
  throw Recoil_err("This component must be used inside a <RecoilRoot> component.");
}
var defaultStore = Object.freeze({
  storeID: getNextStoreID$2(),
  getState: notInAContext,
  replaceState: notInAContext,
  getGraph: notInAContext,
  subscribeToTransactions: notInAContext,
  addTransactionMetadata: notInAContext
});
var stateReplacerIsBeingExecuted = false;
function startNextTreeIfNeeded(store) {
  if (stateReplacerIsBeingExecuted) {
    throw Recoil_err("An atom update was triggered within the execution of a state updater function. State updater functions provided to Recoil must be pure functions.");
  }
  const storeState = store.getState();
  if (storeState.nextTree === null) {
    if (Recoil_gkx("recoil_memory_managament_2020") && Recoil_gkx("recoil_release_on_cascading_update_killswitch_2021")) {
      if (storeState.commitDepth > 0) {
        releaseScheduledRetainablesNow$1(store);
      }
    }
    const version = storeState.currentTree.version;
    const nextVersion = getNextTreeStateVersion$3();
    storeState.nextTree = {
      ...storeState.currentTree,
      version: nextVersion,
      stateID: nextVersion,
      dirtyAtoms: /* @__PURE__ */ new Set(),
      transactionMetadata: {}
    };
    storeState.graphsByVersion.set(nextVersion, cloneGraph$1(Recoil_nullthrows(storeState.graphsByVersion.get(version))));
  }
}
var AppContext = import_react.default.createContext({
  current: defaultStore
});
var useStoreRef = () => useContext(AppContext);
var MutableSourceContext = import_react.default.createContext(null);
function useRecoilMutableSource() {
  const mutableSource = useContext(MutableSourceContext);
  if (mutableSource == null) {
    Recoil_expectationViolation("Attempted to use a Recoil hook outside of a <RecoilRoot>. <RecoilRoot> must be an ancestor of any component that uses Recoil hooks.");
  }
  return mutableSource;
}
function notifyComponents(store, storeState, treeState) {
  const dependentNodes = getDownstreamNodes$2(store, treeState, treeState.dirtyAtoms);
  for (const key of dependentNodes) {
    const comps = storeState.nodeToComponentSubscriptions.get(key);
    if (comps) {
      for (const [_subID, [_debugName, callback]] of comps) {
        callback(treeState);
      }
    }
  }
}
function sendEndOfBatchNotifications(store) {
  const storeState = store.getState();
  const treeState = storeState.currentTree;
  const dirtyAtoms = treeState.dirtyAtoms;
  if (dirtyAtoms.size) {
    for (const [key, subscriptions] of storeState.nodeTransactionSubscriptions) {
      if (dirtyAtoms.has(key)) {
        for (const [_2, subscription] of subscriptions) {
          subscription(store);
        }
      }
    }
    for (const [_2, subscription] of storeState.transactionSubscriptions) {
      subscription(store);
    }
    if (!reactMode$2().early || storeState.suspendedComponentResolvers.size > 0) {
      notifyComponents(store, storeState, treeState);
      storeState.suspendedComponentResolvers.forEach((cb) => cb());
      storeState.suspendedComponentResolvers.clear();
    }
  }
  storeState.queuedComponentCallbacks_DEPRECATED.forEach((cb) => cb(treeState));
  storeState.queuedComponentCallbacks_DEPRECATED.splice(0, storeState.queuedComponentCallbacks_DEPRECATED.length);
}
function endBatch(store) {
  const storeState = store.getState();
  storeState.commitDepth++;
  try {
    const {
      nextTree
    } = storeState;
    if (nextTree == null) {
      return;
    }
    storeState.previousTree = storeState.currentTree;
    storeState.currentTree = nextTree;
    storeState.nextTree = null;
    sendEndOfBatchNotifications(store);
    if (storeState.previousTree != null) {
      storeState.graphsByVersion.delete(storeState.previousTree.version);
    } else {
      Recoil_recoverableViolation("Ended batch with no previous state, which is unexpected", "recoil");
    }
    storeState.previousTree = null;
    if (Recoil_gkx("recoil_memory_managament_2020")) {
      if (nextTree == null) {
        releaseScheduledRetainablesNow$1(store);
      }
    }
  } finally {
    storeState.commitDepth--;
  }
}
function Batcher({
  setNotifyBatcherOfChange
}) {
  const storeRef = useStoreRef();
  const [, setState] = useState([]);
  setNotifyBatcherOfChange(() => setState({}));
  useEffect(() => {
    setNotifyBatcherOfChange(() => setState({}));
    return () => {
      setNotifyBatcherOfChange(() => {
      });
    };
  }, [setNotifyBatcherOfChange]);
  useEffect(() => {
    Recoil_Queue.enqueueExecution("Batcher", () => {
      endBatch(storeRef.current);
    });
  });
  return null;
}
if (true) {
  if (typeof window !== "undefined" && !window.$recoilDebugStates) {
    window.$recoilDebugStates = [];
  }
}
function initialStoreState_DEPRECATED(store, initializeState) {
  const initial = makeEmptyStoreState$2();
  initializeState({
    set: (atom2, value) => {
      const state = initial.currentTree;
      const writes = setNodeValue$2(store, state, atom2.key, value);
      const writtenNodes = new Set(writes.keys());
      const nonvalidatedAtoms = state.nonvalidatedAtoms.clone();
      for (const n2 of writtenNodes) {
        nonvalidatedAtoms.delete(n2);
      }
      initial.currentTree = {
        ...state,
        dirtyAtoms: Recoil_unionSets(state.dirtyAtoms, writtenNodes),
        atomValues: applyAtomValueWrites$1(state.atomValues, writes),
        // NB: PLEASE un-export applyAtomValueWrites when deleting this code
        nonvalidatedAtoms
      };
    },
    setUnvalidatedAtomValues: (atomValues) => {
      atomValues.forEach((v2, k2) => {
        initial.currentTree = setUnvalidatedAtomValue_DEPRECATED$1(initial.currentTree, k2, v2);
      });
    }
  });
  return initial;
}
function initialStoreState(initializeState) {
  const snapshot = freshSnapshot$1(initializeState);
  const storeState = snapshot.getStore_INTERNAL().getState();
  snapshot.retain();
  storeState.nodeCleanupFunctions.forEach((cleanup) => cleanup());
  storeState.nodeCleanupFunctions.clear();
  return storeState;
}
var nextID = 0;
function RecoilRoot_INTERNAL({
  initializeState_DEPRECATED,
  initializeState,
  store_INTERNAL: storeProp,
  // For use with React "context bridging"
  children
}) {
  let storeStateRef;
  const getGraph = (version) => {
    const graphs = storeStateRef.current.graphsByVersion;
    if (graphs.has(version)) {
      return Recoil_nullthrows(graphs.get(version));
    }
    const newGraph = graph$2();
    graphs.set(version, newGraph);
    return newGraph;
  };
  const subscribeToTransactions = (callback, key) => {
    if (key == null) {
      const {
        transactionSubscriptions
      } = storeRef.current.getState();
      const id = nextID++;
      transactionSubscriptions.set(id, callback);
      return {
        release: () => {
          transactionSubscriptions.delete(id);
        }
      };
    } else {
      const {
        nodeTransactionSubscriptions
      } = storeRef.current.getState();
      if (!nodeTransactionSubscriptions.has(key)) {
        nodeTransactionSubscriptions.set(key, /* @__PURE__ */ new Map());
      }
      const id = nextID++;
      Recoil_nullthrows(nodeTransactionSubscriptions.get(key)).set(id, callback);
      return {
        release: () => {
          const subs = nodeTransactionSubscriptions.get(key);
          if (subs) {
            subs.delete(id);
            if (subs.size === 0) {
              nodeTransactionSubscriptions.delete(key);
            }
          }
        }
      };
    }
  };
  const addTransactionMetadata = (metadata) => {
    startNextTreeIfNeeded(storeRef.current);
    for (const k2 of Object.keys(metadata)) {
      Recoil_nullthrows(storeRef.current.getState().nextTree).transactionMetadata[k2] = metadata[k2];
    }
  };
  const replaceState = (replacer) => {
    startNextTreeIfNeeded(storeRef.current);
    const nextTree = Recoil_nullthrows(storeStateRef.current.nextTree);
    let replaced;
    try {
      stateReplacerIsBeingExecuted = true;
      replaced = replacer(nextTree);
    } finally {
      stateReplacerIsBeingExecuted = false;
    }
    if (replaced === nextTree) {
      return;
    }
    if (true) {
      if (typeof window !== "undefined") {
        window.$recoilDebugStates.push(replaced);
      }
    }
    storeStateRef.current.nextTree = replaced;
    if (reactMode$2().early) {
      notifyComponents(storeRef.current, storeStateRef.current, replaced);
    }
    Recoil_nullthrows(notifyBatcherOfChange.current)();
  };
  const notifyBatcherOfChange = useRef$1(null);
  const setNotifyBatcherOfChange = useCallback((x2) => {
    notifyBatcherOfChange.current = x2;
  }, [notifyBatcherOfChange]);
  const storeRef = Recoil_useRefInitOnce(() => storeProp !== null && storeProp !== void 0 ? storeProp : {
    storeID: getNextStoreID$2(),
    getState: () => storeStateRef.current,
    replaceState,
    getGraph,
    subscribeToTransactions,
    addTransactionMetadata
  });
  if (storeProp != null) {
    storeRef.current = storeProp;
  }
  storeStateRef = Recoil_useRefInitOnce(() => initializeState_DEPRECATED != null ? initialStoreState_DEPRECATED(storeRef.current, initializeState_DEPRECATED) : initializeState != null ? initialStoreState(initializeState) : makeEmptyStoreState$2());
  const mutableSource = useMemo(() => createMutableSource$1 === null || createMutableSource$1 === void 0 ? void 0 : createMutableSource$1(storeStateRef, () => storeStateRef.current.currentTree.version), [storeStateRef]);
  useEffect(() => {
    const store = storeRef.current;
    for (const atomKey of new Set(store.getState().knownAtoms)) {
      initializeNode$2(store, atomKey, "get");
    }
    return () => {
      for (const atomKey of store.getState().knownAtoms) {
        cleanUpNode$2(store, atomKey);
      }
    };
  }, [storeRef]);
  return /* @__PURE__ */ import_react.default.createElement(AppContext.Provider, {
    value: storeRef
  }, /* @__PURE__ */ import_react.default.createElement(MutableSourceContext.Provider, {
    value: mutableSource
  }, /* @__PURE__ */ import_react.default.createElement(Batcher, {
    setNotifyBatcherOfChange
  }), children));
}
function RecoilRoot(props) {
  const {
    override,
    ...propsExceptOverride
  } = props;
  const ancestorStoreRef = useStoreRef();
  if (override === false && ancestorStoreRef.current !== defaultStore) {
    return props.children;
  }
  return /* @__PURE__ */ import_react.default.createElement(RecoilRoot_INTERNAL, propsExceptOverride);
}
function useRecoilStoreID() {
  return useStoreRef().current.storeID;
}
var Recoil_RecoilRoot = {
  RecoilRoot,
  useStoreRef,
  useRecoilMutableSource,
  useRecoilStoreID,
  notifyComponents_FOR_TESTING: notifyComponents,
  sendEndOfBatchNotifications_FOR_TESTING: sendEndOfBatchNotifications
};
function shallowArrayEqual(a2, b2) {
  if (a2 === b2) {
    return true;
  }
  if (a2.length !== b2.length) {
    return false;
  }
  for (let i2 = 0, l2 = a2.length; i2 < l2; i2++) {
    if (a2[i2] !== b2[i2]) {
      return false;
    }
  }
  return true;
}
var Recoil_shallowArrayEqual = shallowArrayEqual;
var {
  useEffect: useEffect$1,
  useRef: useRef$2
} = import_react.default;
function usePrevious(value) {
  const ref = useRef$2();
  useEffect$1(() => {
    ref.current = value;
  });
  return ref.current;
}
var Recoil_usePrevious = usePrevious;
var {
  useStoreRef: useStoreRef$1
} = Recoil_RecoilRoot;
var {
  SUSPENSE_TIMEOUT_MS: SUSPENSE_TIMEOUT_MS$1
} = Recoil_Retention;
var {
  updateRetainCount: updateRetainCount$2
} = Recoil_Retention;
var {
  RetentionZone: RetentionZone$3
} = Recoil_RetentionZone;
var {
  useEffect: useEffect$2,
  useRef: useRef$3
} = import_react.default;
var {
  isSSR: isSSR$2
} = Recoil_Environment;
function useRetain(toRetain) {
  if (!Recoil_gkx("recoil_memory_managament_2020")) {
    return;
  }
  return useRetain_ACTUAL(toRetain);
}
function useRetain_ACTUAL(toRetain) {
  const array = Array.isArray(toRetain) ? toRetain : [toRetain];
  const retainables = array.map((a2) => a2 instanceof RetentionZone$3 ? a2 : a2.key);
  const storeRef = useStoreRef$1();
  useEffect$2(() => {
    if (!Recoil_gkx("recoil_memory_managament_2020")) {
      return;
    }
    const store = storeRef.current;
    if (timeoutID.current && !isSSR$2) {
      window.clearTimeout(timeoutID.current);
      timeoutID.current = null;
    } else {
      for (const r2 of retainables) {
        updateRetainCount$2(store, r2, 1);
      }
    }
    return () => {
      for (const r2 of retainables) {
        updateRetainCount$2(store, r2, -1);
      }
    };
  }, [storeRef, ...retainables]);
  const timeoutID = useRef$3();
  const previousRetainables = Recoil_usePrevious(retainables);
  if (!isSSR$2 && (previousRetainables === void 0 || !Recoil_shallowArrayEqual(previousRetainables, retainables))) {
    const store = storeRef.current;
    for (const r2 of retainables) {
      updateRetainCount$2(store, r2, 1);
    }
    if (previousRetainables) {
      for (const r2 of previousRetainables) {
        updateRetainCount$2(store, r2, -1);
      }
    }
    if (timeoutID.current) {
      window.clearTimeout(timeoutID.current);
    }
    timeoutID.current = window.setTimeout(() => {
      timeoutID.current = null;
      for (const r2 of retainables) {
        updateRetainCount$2(store, r2, -1);
      }
    }, SUSPENSE_TIMEOUT_MS$1);
  }
}
var Recoil_useRetain = useRetain;
function useComponentName() {
  return "<component name not available>";
}
var Recoil_useComponentName = useComponentName;
var {
  batchUpdates: batchUpdates$2
} = Recoil_Batching;
var {
  DEFAULT_VALUE: DEFAULT_VALUE$2
} = Recoil_Node;
var {
  currentRendererSupportsUseSyncExternalStore: currentRendererSupportsUseSyncExternalStore$1,
  reactMode: reactMode$3,
  useMutableSource: useMutableSource$1,
  useSyncExternalStore: useSyncExternalStore$1
} = Recoil_ReactMode;
var {
  useRecoilMutableSource: useRecoilMutableSource$1,
  useStoreRef: useStoreRef$2
} = Recoil_RecoilRoot;
var {
  isRecoilValue: isRecoilValue$2
} = Recoil_RecoilValue$1;
var {
  AbstractRecoilValue: AbstractRecoilValue$3,
  getRecoilValueAsLoadable: getRecoilValueAsLoadable$2,
  setRecoilValue: setRecoilValue$2,
  setUnvalidatedRecoilValue: setUnvalidatedRecoilValue$2,
  subscribeToRecoilValue: subscribeToRecoilValue$1
} = Recoil_RecoilValueInterface;
var {
  useCallback: useCallback$1,
  useEffect: useEffect$3,
  useMemo: useMemo$1,
  useRef: useRef$4,
  useState: useState$1
} = import_react.default;
var {
  setByAddingToSet: setByAddingToSet$2
} = Recoil_CopyOnWrite;
var {
  isSSR: isSSR$3
} = Recoil_Environment;
function handleLoadable(loadable, recoilValue, storeRef) {
  if (loadable.state === "hasValue") {
    return loadable.contents;
  } else if (loadable.state === "loading") {
    const promise = new Promise((resolve) => {
      const suspendedComponentResolvers = storeRef.current.getState().suspendedComponentResolvers;
      suspendedComponentResolvers.add(resolve);
      if (isSSR$3 && Recoil_isPromise(loadable.contents)) {
        loadable.contents.finally(() => {
          suspendedComponentResolvers.delete(resolve);
        });
      }
    });
    throw promise;
  } else if (loadable.state === "hasError") {
    throw loadable.contents;
  } else {
    throw Recoil_err(`Invalid value of loadable atom "${recoilValue.key}"`);
  }
}
function validateRecoilValue(recoilValue, hookName) {
  if (!isRecoilValue$2(recoilValue)) {
    throw Recoil_err(`Invalid argument to ${hookName}: expected an atom or selector but got ${String(recoilValue)}`);
  }
}
function useRecoilInterface_DEPRECATED() {
  const componentName = Recoil_useComponentName();
  const storeRef = useStoreRef$2();
  const [, forceUpdate] = useState$1([]);
  const recoilValuesUsed = useRef$4(/* @__PURE__ */ new Set());
  recoilValuesUsed.current = /* @__PURE__ */ new Set();
  const previousSubscriptions = useRef$4(/* @__PURE__ */ new Set());
  const subscriptions = useRef$4(/* @__PURE__ */ new Map());
  const unsubscribeFrom = useCallback$1((key) => {
    const sub = subscriptions.current.get(key);
    if (sub) {
      sub.release();
      subscriptions.current.delete(key);
    }
  }, [subscriptions]);
  const updateState = useCallback$1((_state, key) => {
    if (subscriptions.current.has(key)) {
      forceUpdate([]);
    }
  }, []);
  useEffect$3(() => {
    const store = storeRef.current;
    Recoil_differenceSets(recoilValuesUsed.current, previousSubscriptions.current).forEach((key) => {
      if (subscriptions.current.has(key)) {
        Recoil_expectationViolation(`Double subscription to RecoilValue "${key}"`);
        return;
      }
      const sub = subscribeToRecoilValue$1(store, new AbstractRecoilValue$3(key), (state2) => updateState(state2, key), componentName);
      subscriptions.current.set(key, sub);
      const state = store.getState();
      if (state.nextTree) {
        store.getState().queuedComponentCallbacks_DEPRECATED.push(() => {
          updateState(store.getState(), key);
        });
      } else {
        updateState(store.getState(), key);
      }
    });
    Recoil_differenceSets(previousSubscriptions.current, recoilValuesUsed.current).forEach((key) => {
      unsubscribeFrom(key);
    });
    previousSubscriptions.current = recoilValuesUsed.current;
  });
  useEffect$3(() => {
    const currentSubscriptions = subscriptions.current;
    Recoil_differenceSets(recoilValuesUsed.current, new Set(currentSubscriptions.keys())).forEach((key) => {
      const sub = subscribeToRecoilValue$1(storeRef.current, new AbstractRecoilValue$3(key), (state) => updateState(state, key), componentName);
      currentSubscriptions.set(key, sub);
    });
    return () => currentSubscriptions.forEach((_2, key) => unsubscribeFrom(key));
  }, [componentName, storeRef, unsubscribeFrom, updateState]);
  return useMemo$1(() => {
    function useSetRecoilState2(recoilState) {
      if (true) {
        validateRecoilValue(recoilState, "useSetRecoilState");
      }
      return (newValueOrUpdater) => {
        setRecoilValue$2(storeRef.current, recoilState, newValueOrUpdater);
      };
    }
    function useResetRecoilState2(recoilState) {
      if (true) {
        validateRecoilValue(recoilState, "useResetRecoilState");
      }
      return () => setRecoilValue$2(storeRef.current, recoilState, DEFAULT_VALUE$2);
    }
    function useRecoilValueLoadable2(recoilValue) {
      var _storeState$nextTree;
      if (true) {
        validateRecoilValue(recoilValue, "useRecoilValueLoadable");
      }
      if (!recoilValuesUsed.current.has(recoilValue.key)) {
        recoilValuesUsed.current = setByAddingToSet$2(recoilValuesUsed.current, recoilValue.key);
      }
      const storeState = storeRef.current.getState();
      return getRecoilValueAsLoadable$2(storeRef.current, recoilValue, reactMode$3().early ? (_storeState$nextTree = storeState.nextTree) !== null && _storeState$nextTree !== void 0 ? _storeState$nextTree : storeState.currentTree : storeState.currentTree);
    }
    function useRecoilValue2(recoilValue) {
      if (true) {
        validateRecoilValue(recoilValue, "useRecoilValue");
      }
      const loadable = useRecoilValueLoadable2(recoilValue);
      return handleLoadable(loadable, recoilValue, storeRef);
    }
    function useRecoilState2(recoilState) {
      if (true) {
        validateRecoilValue(recoilState, "useRecoilState");
      }
      return [useRecoilValue2(recoilState), useSetRecoilState2(recoilState)];
    }
    function useRecoilStateLoadable2(recoilState) {
      if (true) {
        validateRecoilValue(recoilState, "useRecoilStateLoadable");
      }
      return [useRecoilValueLoadable2(recoilState), useSetRecoilState2(recoilState)];
    }
    return {
      getRecoilValue: useRecoilValue2,
      getRecoilValueLoadable: useRecoilValueLoadable2,
      getRecoilState: useRecoilState2,
      getRecoilStateLoadable: useRecoilStateLoadable2,
      getSetRecoilState: useSetRecoilState2,
      getResetRecoilState: useResetRecoilState2
    };
  }, [recoilValuesUsed, storeRef]);
}
var recoilComponentGetRecoilValueCount_FOR_TESTING = {
  current: 0
};
function useRecoilValueLoadable_SYNC_EXTERNAL_STORE(recoilValue) {
  const storeRef = useStoreRef$2();
  const componentName = Recoil_useComponentName();
  const getSnapshot = useCallback$1(() => {
    var _storeState$nextTree2;
    if (true) {
      recoilComponentGetRecoilValueCount_FOR_TESTING.current++;
    }
    const store = storeRef.current;
    const storeState = store.getState();
    const treeState = reactMode$3().early ? (_storeState$nextTree2 = storeState.nextTree) !== null && _storeState$nextTree2 !== void 0 ? _storeState$nextTree2 : storeState.currentTree : storeState.currentTree;
    const loadable = getRecoilValueAsLoadable$2(store, recoilValue, treeState);
    return {
      loadable,
      key: recoilValue.key
    };
  }, [storeRef, recoilValue]);
  const memoizePreviousSnapshot = useCallback$1((getState) => {
    let prevState;
    return () => {
      var _prevState, _prevState2;
      const nextState = getState();
      if ((_prevState = prevState) !== null && _prevState !== void 0 && _prevState.loadable.is(nextState.loadable) && ((_prevState2 = prevState) === null || _prevState2 === void 0 ? void 0 : _prevState2.key) === nextState.key) {
        return prevState;
      }
      prevState = nextState;
      return nextState;
    };
  }, []);
  const getMemoizedSnapshot = useMemo$1(() => memoizePreviousSnapshot(getSnapshot), [getSnapshot, memoizePreviousSnapshot]);
  const subscribe = useCallback$1((notify) => {
    const store = storeRef.current;
    const subscription = subscribeToRecoilValue$1(store, recoilValue, notify, componentName);
    return subscription.release;
  }, [storeRef, recoilValue, componentName]);
  return useSyncExternalStore$1(
    subscribe,
    getMemoizedSnapshot,
    // getSnapshot()
    getMemoizedSnapshot
    // getServerSnapshot() for SSR support
  ).loadable;
}
function useRecoilValueLoadable_MUTABLE_SOURCE(recoilValue) {
  const storeRef = useStoreRef$2();
  const getLoadable = useCallback$1(() => {
    var _storeState$nextTree3;
    const store = storeRef.current;
    const storeState = store.getState();
    const treeState = reactMode$3().early ? (_storeState$nextTree3 = storeState.nextTree) !== null && _storeState$nextTree3 !== void 0 ? _storeState$nextTree3 : storeState.currentTree : storeState.currentTree;
    return getRecoilValueAsLoadable$2(store, recoilValue, treeState);
  }, [storeRef, recoilValue]);
  const getLoadableWithTesting = useCallback$1(() => {
    if (true) {
      recoilComponentGetRecoilValueCount_FOR_TESTING.current++;
    }
    return getLoadable();
  }, [getLoadable]);
  const componentName = Recoil_useComponentName();
  const subscribe = useCallback$1((_storeState, notify) => {
    const store = storeRef.current;
    const subscription = subscribeToRecoilValue$1(store, recoilValue, () => {
      if (!Recoil_gkx("recoil_suppress_rerender_in_callback")) {
        return notify();
      }
      const newLoadable = getLoadable();
      if (!prevLoadableRef.current.is(newLoadable)) {
        notify();
      }
      prevLoadableRef.current = newLoadable;
    }, componentName);
    return subscription.release;
  }, [storeRef, recoilValue, componentName, getLoadable]);
  const source = useRecoilMutableSource$1();
  if (source == null) {
    throw Recoil_err("Recoil hooks must be used in components contained within a <RecoilRoot> component.");
  }
  const loadable = useMutableSource$1(source, getLoadableWithTesting, subscribe);
  const prevLoadableRef = useRef$4(loadable);
  useEffect$3(() => {
    prevLoadableRef.current = loadable;
  });
  return loadable;
}
function useRecoilValueLoadable_TRANSITION_SUPPORT(recoilValue) {
  const storeRef = useStoreRef$2();
  const componentName = Recoil_useComponentName();
  const getLoadable = useCallback$1(() => {
    var _storeState$nextTree4;
    if (true) {
      recoilComponentGetRecoilValueCount_FOR_TESTING.current++;
    }
    const store = storeRef.current;
    const storeState = store.getState();
    const treeState = reactMode$3().early ? (_storeState$nextTree4 = storeState.nextTree) !== null && _storeState$nextTree4 !== void 0 ? _storeState$nextTree4 : storeState.currentTree : storeState.currentTree;
    return getRecoilValueAsLoadable$2(store, recoilValue, treeState);
  }, [storeRef, recoilValue]);
  const getState = useCallback$1(() => ({
    loadable: getLoadable(),
    key: recoilValue.key
  }), [getLoadable, recoilValue.key]);
  const updateState = useCallback$1((prevState) => {
    const nextState = getState();
    return prevState.loadable.is(nextState.loadable) && prevState.key === nextState.key ? prevState : nextState;
  }, [getState]);
  useEffect$3(() => {
    const subscription = subscribeToRecoilValue$1(storeRef.current, recoilValue, (_state) => {
      setState(updateState);
    }, componentName);
    setState(updateState);
    return subscription.release;
  }, [componentName, recoilValue, storeRef, updateState]);
  const [state, setState] = useState$1(getState);
  return state.key !== recoilValue.key ? getState().loadable : state.loadable;
}
function useRecoilValueLoadable_LEGACY(recoilValue) {
  const storeRef = useStoreRef$2();
  const [, forceUpdate] = useState$1([]);
  const componentName = Recoil_useComponentName();
  const getLoadable = useCallback$1(() => {
    var _storeState$nextTree5;
    if (true) {
      recoilComponentGetRecoilValueCount_FOR_TESTING.current++;
    }
    const store = storeRef.current;
    const storeState = store.getState();
    const treeState = reactMode$3().early ? (_storeState$nextTree5 = storeState.nextTree) !== null && _storeState$nextTree5 !== void 0 ? _storeState$nextTree5 : storeState.currentTree : storeState.currentTree;
    return getRecoilValueAsLoadable$2(store, recoilValue, treeState);
  }, [storeRef, recoilValue]);
  const loadable = getLoadable();
  const prevLoadableRef = useRef$4(loadable);
  useEffect$3(() => {
    prevLoadableRef.current = loadable;
  });
  useEffect$3(() => {
    const store = storeRef.current;
    const storeState = store.getState();
    const subscription = subscribeToRecoilValue$1(store, recoilValue, (_state) => {
      var _prevLoadableRef$curr;
      if (!Recoil_gkx("recoil_suppress_rerender_in_callback")) {
        return forceUpdate([]);
      }
      const newLoadable = getLoadable();
      if (!((_prevLoadableRef$curr = prevLoadableRef.current) !== null && _prevLoadableRef$curr !== void 0 && _prevLoadableRef$curr.is(newLoadable))) {
        forceUpdate(newLoadable);
      }
      prevLoadableRef.current = newLoadable;
    }, componentName);
    if (storeState.nextTree) {
      store.getState().queuedComponentCallbacks_DEPRECATED.push(() => {
        prevLoadableRef.current = null;
        forceUpdate([]);
      });
    } else {
      var _prevLoadableRef$curr2;
      if (!Recoil_gkx("recoil_suppress_rerender_in_callback")) {
        return forceUpdate([]);
      }
      const newLoadable = getLoadable();
      if (!((_prevLoadableRef$curr2 = prevLoadableRef.current) !== null && _prevLoadableRef$curr2 !== void 0 && _prevLoadableRef$curr2.is(newLoadable))) {
        forceUpdate(newLoadable);
      }
      prevLoadableRef.current = newLoadable;
    }
    return subscription.release;
  }, [componentName, getLoadable, recoilValue, storeRef]);
  return loadable;
}
function useRecoilValueLoadable(recoilValue) {
  if (true) {
    validateRecoilValue(recoilValue, "useRecoilValueLoadable");
  }
  if (Recoil_gkx("recoil_memory_managament_2020")) {
    Recoil_useRetain(recoilValue);
  }
  return {
    TRANSITION_SUPPORT: useRecoilValueLoadable_TRANSITION_SUPPORT,
    // Recoil will attemp to detect if `useSyncExternalStore()` is supported with
    // `reactMode()` before calling it.  However, sometimes the host React
    // environment supports it but uses additional React renderers (such as with
    // `react-three-fiber`) which do not.  While this is technically a user issue
    // by using a renderer with React 18+ that doesn't fully support React 18 we
    // don't want to break users if it can be avoided. As the current renderer can
    // change at runtime, we need to dynamically check and fallback if necessary.
    SYNC_EXTERNAL_STORE: currentRendererSupportsUseSyncExternalStore$1() ? useRecoilValueLoadable_SYNC_EXTERNAL_STORE : useRecoilValueLoadable_TRANSITION_SUPPORT,
    MUTABLE_SOURCE: useRecoilValueLoadable_MUTABLE_SOURCE,
    LEGACY: useRecoilValueLoadable_LEGACY
  }[reactMode$3().mode](recoilValue);
}
function useRecoilValue(recoilValue) {
  if (true) {
    validateRecoilValue(recoilValue, "useRecoilValue");
  }
  const storeRef = useStoreRef$2();
  const loadable = useRecoilValueLoadable(recoilValue);
  return handleLoadable(loadable, recoilValue, storeRef);
}
function useSetRecoilState(recoilState) {
  if (true) {
    validateRecoilValue(recoilState, "useSetRecoilState");
  }
  const storeRef = useStoreRef$2();
  return useCallback$1((newValueOrUpdater) => {
    setRecoilValue$2(storeRef.current, recoilState, newValueOrUpdater);
  }, [storeRef, recoilState]);
}
function useResetRecoilState(recoilState) {
  if (true) {
    validateRecoilValue(recoilState, "useResetRecoilState");
  }
  const storeRef = useStoreRef$2();
  return useCallback$1(() => {
    setRecoilValue$2(storeRef.current, recoilState, DEFAULT_VALUE$2);
  }, [storeRef, recoilState]);
}
function useRecoilState(recoilState) {
  if (true) {
    validateRecoilValue(recoilState, "useRecoilState");
  }
  return [useRecoilValue(recoilState), useSetRecoilState(recoilState)];
}
function useRecoilStateLoadable(recoilState) {
  if (true) {
    validateRecoilValue(recoilState, "useRecoilStateLoadable");
  }
  return [useRecoilValueLoadable(recoilState), useSetRecoilState(recoilState)];
}
function useSetUnvalidatedAtomValues() {
  const storeRef = useStoreRef$2();
  return (values, transactionMetadata = {}) => {
    batchUpdates$2(() => {
      storeRef.current.addTransactionMetadata(transactionMetadata);
      values.forEach((value, key) => setUnvalidatedRecoilValue$2(storeRef.current, new AbstractRecoilValue$3(key), value));
    });
  };
}
function useRecoilValueLoadable_TRANSITION_SUPPORT_UNSTABLE(recoilValue) {
  if (true) {
    validateRecoilValue(recoilValue, "useRecoilValueLoadable_TRANSITION_SUPPORT_UNSTABLE");
    if (!reactMode$3().early) {
      Recoil_recoverableViolation("Attepmt to use a hook with UNSTABLE_TRANSITION_SUPPORT in a rendering mode incompatible with concurrent rendering.  Try enabling the recoil_sync_external_store or recoil_transition_support GKs.");
    }
  }
  if (Recoil_gkx("recoil_memory_managament_2020")) {
    Recoil_useRetain(recoilValue);
  }
  return useRecoilValueLoadable_TRANSITION_SUPPORT(recoilValue);
}
function useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(recoilValue) {
  if (true) {
    validateRecoilValue(recoilValue, "useRecoilValue_TRANSITION_SUPPORT_UNSTABLE");
  }
  const storeRef = useStoreRef$2();
  const loadable = useRecoilValueLoadable_TRANSITION_SUPPORT_UNSTABLE(recoilValue);
  return handleLoadable(loadable, recoilValue, storeRef);
}
function useRecoilState_TRANSITION_SUPPORT_UNSTABLE(recoilState) {
  if (true) {
    validateRecoilValue(recoilState, "useRecoilState_TRANSITION_SUPPORT_UNSTABLE");
  }
  return [useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(recoilState), useSetRecoilState(recoilState)];
}
var Recoil_Hooks = {
  recoilComponentGetRecoilValueCount_FOR_TESTING,
  useRecoilInterface: useRecoilInterface_DEPRECATED,
  useRecoilState,
  useRecoilStateLoadable,
  useRecoilValue,
  useRecoilValueLoadable,
  useResetRecoilState,
  useSetRecoilState,
  useSetUnvalidatedAtomValues,
  useRecoilValueLoadable_TRANSITION_SUPPORT_UNSTABLE,
  useRecoilValue_TRANSITION_SUPPORT_UNSTABLE,
  useRecoilState_TRANSITION_SUPPORT_UNSTABLE
};
function filterMap(map, callback) {
  const result = /* @__PURE__ */ new Map();
  for (const [key, value] of map) {
    if (callback(value, key)) {
      result.set(key, value);
    }
  }
  return result;
}
var Recoil_filterMap = filterMap;
function filterSet(set, callback) {
  const result = /* @__PURE__ */ new Set();
  for (const value of set) {
    if (callback(value)) {
      result.add(value);
    }
  }
  return result;
}
var Recoil_filterSet = filterSet;
function mergeMaps(...maps) {
  const result = /* @__PURE__ */ new Map();
  for (let i2 = 0; i2 < maps.length; i2++) {
    const iterator = maps[i2].keys();
    let nextKey;
    while (!(nextKey = iterator.next()).done) {
      result.set(nextKey.value, maps[i2].get(nextKey.value));
    }
  }
  return result;
}
var Recoil_mergeMaps = mergeMaps;
var {
  batchUpdates: batchUpdates$3
} = Recoil_Batching;
var {
  DEFAULT_VALUE: DEFAULT_VALUE$3,
  getNode: getNode$4,
  nodes: nodes$1
} = Recoil_Node;
var {
  useStoreRef: useStoreRef$3
} = Recoil_RecoilRoot;
var {
  AbstractRecoilValue: AbstractRecoilValue$4,
  setRecoilValueLoadable: setRecoilValueLoadable$1
} = Recoil_RecoilValueInterface;
var {
  SUSPENSE_TIMEOUT_MS: SUSPENSE_TIMEOUT_MS$2
} = Recoil_Retention;
var {
  cloneSnapshot: cloneSnapshot$1
} = Recoil_Snapshot$1;
var {
  useCallback: useCallback$2,
  useEffect: useEffect$4,
  useRef: useRef$5,
  useState: useState$2
} = import_react.default;
var {
  isSSR: isSSR$4
} = Recoil_Environment;
function useTransactionSubscription(callback) {
  const storeRef = useStoreRef$3();
  useEffect$4(() => {
    const sub = storeRef.current.subscribeToTransactions(callback);
    return sub.release;
  }, [callback, storeRef]);
}
function externallyVisibleAtomValuesInState(state) {
  const atomValues = state.atomValues.toMap();
  const persistedAtomContentsValues = Recoil_mapMap(Recoil_filterMap(atomValues, (v2, k2) => {
    const node = getNode$4(k2);
    const persistence = node.persistence_UNSTABLE;
    return persistence != null && persistence.type !== "none" && v2.state === "hasValue";
  }), (v2) => v2.contents);
  return Recoil_mergeMaps(state.nonvalidatedAtoms.toMap(), persistedAtomContentsValues);
}
function useTransactionObservation_DEPRECATED(callback) {
  useTransactionSubscription(useCallback$2((store) => {
    let previousTree = store.getState().previousTree;
    const currentTree = store.getState().currentTree;
    if (!previousTree) {
      Recoil_recoverableViolation("Transaction subscribers notified without a previous tree being present -- this is a bug in Recoil");
      previousTree = store.getState().currentTree;
    }
    const atomValues = externallyVisibleAtomValuesInState(currentTree);
    const previousAtomValues = externallyVisibleAtomValuesInState(previousTree);
    const atomInfo = Recoil_mapMap(nodes$1, (node) => {
      var _node$persistence_UNS, _node$persistence_UNS2, _node$persistence_UNS3, _node$persistence_UNS4;
      return {
        persistence_UNSTABLE: {
          type: (_node$persistence_UNS = (_node$persistence_UNS2 = node.persistence_UNSTABLE) === null || _node$persistence_UNS2 === void 0 ? void 0 : _node$persistence_UNS2.type) !== null && _node$persistence_UNS !== void 0 ? _node$persistence_UNS : "none",
          backButton: (_node$persistence_UNS3 = (_node$persistence_UNS4 = node.persistence_UNSTABLE) === null || _node$persistence_UNS4 === void 0 ? void 0 : _node$persistence_UNS4.backButton) !== null && _node$persistence_UNS3 !== void 0 ? _node$persistence_UNS3 : false
        }
      };
    });
    const modifiedAtoms = Recoil_filterSet(currentTree.dirtyAtoms, (k2) => atomValues.has(k2) || previousAtomValues.has(k2));
    callback({
      atomValues,
      previousAtomValues,
      atomInfo,
      modifiedAtoms,
      transactionMetadata: {
        ...currentTree.transactionMetadata
      }
    });
  }, [callback]));
}
function useRecoilTransactionObserver(callback) {
  useTransactionSubscription(useCallback$2((store) => {
    const snapshot = cloneSnapshot$1(store, "latest");
    const previousSnapshot = cloneSnapshot$1(store, "previous");
    callback({
      snapshot,
      previousSnapshot
    });
  }, [callback]));
}
function useRecoilSnapshot() {
  const storeRef = useStoreRef$3();
  const [snapshot, setSnapshot] = useState$2(() => cloneSnapshot$1(storeRef.current));
  const previousSnapshot = Recoil_usePrevious(snapshot);
  const timeoutID = useRef$5();
  const releaseRef = useRef$5();
  useTransactionSubscription(useCallback$2((store) => setSnapshot(cloneSnapshot$1(store)), []));
  useEffect$4(() => {
    const release = snapshot.retain();
    if (timeoutID.current && !isSSR$4) {
      var _releaseRef$current;
      window.clearTimeout(timeoutID.current);
      timeoutID.current = null;
      (_releaseRef$current = releaseRef.current) === null || _releaseRef$current === void 0 ? void 0 : _releaseRef$current.call(releaseRef);
      releaseRef.current = null;
    }
    return () => {
      window.setTimeout(release, 10);
    };
  }, [snapshot]);
  if (previousSnapshot !== snapshot && !isSSR$4) {
    if (timeoutID.current) {
      var _releaseRef$current2;
      window.clearTimeout(timeoutID.current);
      timeoutID.current = null;
      (_releaseRef$current2 = releaseRef.current) === null || _releaseRef$current2 === void 0 ? void 0 : _releaseRef$current2.call(releaseRef);
      releaseRef.current = null;
    }
    releaseRef.current = snapshot.retain();
    timeoutID.current = window.setTimeout(() => {
      var _releaseRef$current3;
      timeoutID.current = null;
      (_releaseRef$current3 = releaseRef.current) === null || _releaseRef$current3 === void 0 ? void 0 : _releaseRef$current3.call(releaseRef);
      releaseRef.current = null;
    }, SUSPENSE_TIMEOUT_MS$2);
  }
  return snapshot;
}
function gotoSnapshot(store, snapshot) {
  var _storeState$nextTree;
  const storeState = store.getState();
  const prev = (_storeState$nextTree = storeState.nextTree) !== null && _storeState$nextTree !== void 0 ? _storeState$nextTree : storeState.currentTree;
  const next = snapshot.getStore_INTERNAL().getState().currentTree;
  batchUpdates$3(() => {
    const keysToUpdate = /* @__PURE__ */ new Set();
    for (const keys of [prev.atomValues.keys(), next.atomValues.keys()]) {
      for (const key of keys) {
        var _prev$atomValues$get, _next$atomValues$get;
        if (((_prev$atomValues$get = prev.atomValues.get(key)) === null || _prev$atomValues$get === void 0 ? void 0 : _prev$atomValues$get.contents) !== ((_next$atomValues$get = next.atomValues.get(key)) === null || _next$atomValues$get === void 0 ? void 0 : _next$atomValues$get.contents) && getNode$4(key).shouldRestoreFromSnapshots) {
          keysToUpdate.add(key);
        }
      }
    }
    keysToUpdate.forEach((key) => {
      setRecoilValueLoadable$1(store, new AbstractRecoilValue$4(key), next.atomValues.has(key) ? Recoil_nullthrows(next.atomValues.get(key)) : DEFAULT_VALUE$3);
    });
    store.replaceState((state) => ({
      ...state,
      stateID: snapshot.getID()
    }));
  });
}
function useGotoRecoilSnapshot() {
  const storeRef = useStoreRef$3();
  return useCallback$2((snapshot) => gotoSnapshot(storeRef.current, snapshot), [storeRef]);
}
var Recoil_SnapshotHooks = {
  useRecoilSnapshot,
  gotoSnapshot,
  useGotoRecoilSnapshot,
  useRecoilTransactionObserver,
  useTransactionObservation_DEPRECATED,
  useTransactionSubscription_DEPRECATED: useTransactionSubscription
};
var {
  peekNodeInfo: peekNodeInfo$2
} = Recoil_FunctionalCore;
var {
  useStoreRef: useStoreRef$4
} = Recoil_RecoilRoot;
function useGetRecoilValueInfo() {
  const storeRef = useStoreRef$4();
  return ({
    key
  }) => peekNodeInfo$2(storeRef.current, storeRef.current.getState().currentTree, key);
}
var Recoil_useGetRecoilValueInfo = useGetRecoilValueInfo;
var {
  reactMode: reactMode$4
} = Recoil_ReactMode;
var {
  RecoilRoot: RecoilRoot$1,
  useStoreRef: useStoreRef$5
} = Recoil_RecoilRoot;
var {
  useMemo: useMemo$2
} = import_react.default;
function useRecoilBridgeAcrossReactRoots() {
  if (reactMode$4().mode === "MUTABLE_SOURCE") {
    console.warn("Warning: There are known issues using useRecoilBridgeAcrossReactRoots() in recoil_mutable_source rendering mode.  Please consider upgrading to recoil_sync_external_store mode.");
  }
  const store = useStoreRef$5().current;
  return useMemo$2(() => {
    function RecoilBridge({
      children
    }) {
      return /* @__PURE__ */ import_react.default.createElement(RecoilRoot$1, {
        store_INTERNAL: store
      }, children);
    }
    return RecoilBridge;
  }, [store]);
}
var Recoil_useRecoilBridgeAcrossReactRoots = useRecoilBridgeAcrossReactRoots;
var {
  loadableWithValue: loadableWithValue$1
} = Recoil_Loadable$1;
var {
  initializeNode: initializeNode$3
} = Recoil_FunctionalCore;
var {
  DEFAULT_VALUE: DEFAULT_VALUE$4,
  getNode: getNode$5
} = Recoil_Node;
var {
  copyTreeState: copyTreeState$1,
  getRecoilValueAsLoadable: getRecoilValueAsLoadable$3,
  invalidateDownstreams: invalidateDownstreams$1,
  writeLoadableToTreeState: writeLoadableToTreeState$1
} = Recoil_RecoilValueInterface;
function isAtom(recoilValue) {
  return getNode$5(recoilValue.key).nodeType === "atom";
}
var TransactionInterfaceImpl = class {
  constructor(store, treeState) {
    _defineProperty(this, "_store", void 0);
    _defineProperty(this, "_treeState", void 0);
    _defineProperty(this, "_changes", void 0);
    _defineProperty(this, "get", (recoilValue) => {
      if (this._changes.has(recoilValue.key)) {
        return this._changes.get(recoilValue.key);
      }
      if (!isAtom(recoilValue)) {
        throw Recoil_err("Reading selectors within atomicUpdate is not supported");
      }
      const loadable = getRecoilValueAsLoadable$3(this._store, recoilValue, this._treeState);
      if (loadable.state === "hasValue") {
        return loadable.contents;
      } else if (loadable.state === "hasError") {
        throw loadable.contents;
      } else {
        throw Recoil_err(`Expected Recoil atom ${recoilValue.key} to have a value, but it is in a loading state.`);
      }
    });
    _defineProperty(this, "set", (recoilState, valueOrUpdater) => {
      if (!isAtom(recoilState)) {
        throw Recoil_err("Setting selectors within atomicUpdate is not supported");
      }
      if (typeof valueOrUpdater === "function") {
        const current = this.get(recoilState);
        this._changes.set(recoilState.key, valueOrUpdater(current));
      } else {
        initializeNode$3(this._store, recoilState.key, "set");
        this._changes.set(recoilState.key, valueOrUpdater);
      }
    });
    _defineProperty(this, "reset", (recoilState) => {
      this.set(recoilState, DEFAULT_VALUE$4);
    });
    this._store = store;
    this._treeState = treeState;
    this._changes = /* @__PURE__ */ new Map();
  }
  // Allow destructing
  // eslint-disable-next-line fb-www/extra-arrow-initializer
  newTreeState_INTERNAL() {
    if (this._changes.size === 0) {
      return this._treeState;
    }
    const newState = copyTreeState$1(this._treeState);
    for (const [k2, v2] of this._changes) {
      writeLoadableToTreeState$1(newState, k2, loadableWithValue$1(v2));
    }
    invalidateDownstreams$1(this._store, newState);
    return newState;
  }
};
function atomicUpdater(store) {
  return (fn2) => {
    store.replaceState((treeState) => {
      const changeset = new TransactionInterfaceImpl(store, treeState);
      fn2(changeset);
      return changeset.newTreeState_INTERNAL();
    });
  };
}
var Recoil_AtomicUpdates = {
  atomicUpdater
};
var Recoil_AtomicUpdates_1 = Recoil_AtomicUpdates.atomicUpdater;
var Recoil_AtomicUpdates$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  atomicUpdater: Recoil_AtomicUpdates_1
});
function invariant(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}
var invariant_1 = invariant;
var Recoil_invariant = invariant_1;
var {
  atomicUpdater: atomicUpdater$1
} = Recoil_AtomicUpdates$1;
var {
  batchUpdates: batchUpdates$4
} = Recoil_Batching;
var {
  DEFAULT_VALUE: DEFAULT_VALUE$5
} = Recoil_Node;
var {
  useStoreRef: useStoreRef$6
} = Recoil_RecoilRoot;
var {
  refreshRecoilValue: refreshRecoilValue$1,
  setRecoilValue: setRecoilValue$3
} = Recoil_RecoilValueInterface;
var {
  cloneSnapshot: cloneSnapshot$2
} = Recoil_Snapshot$1;
var {
  gotoSnapshot: gotoSnapshot$1
} = Recoil_SnapshotHooks;
var {
  useCallback: useCallback$3
} = import_react.default;
var Sentinel = class {
};
var SENTINEL = new Sentinel();
function recoilCallback(store, fn2, args, extraInterface) {
  let ret = SENTINEL;
  let releaseSnapshot;
  batchUpdates$4(() => {
    const errMsg = "useRecoilCallback() expects a function that returns a function: it accepts a function of the type (RecoilInterface) => (Args) => ReturnType and returns a callback function (Args) => ReturnType, where RecoilInterface is an object {snapshot, set, ...} and Args and ReturnType are the argument and return types of the callback you want to create.  Please see the docs at recoiljs.org for details.";
    if (typeof fn2 !== "function") {
      throw Recoil_err(errMsg);
    }
    const callbackInterface = Recoil_lazyProxy({
      ...extraInterface !== null && extraInterface !== void 0 ? extraInterface : {},
      // flowlint-line unclear-type:off
      // $FlowFixMe[missing-local-annot]
      set: (node, newValue) => setRecoilValue$3(store, node, newValue),
      // $FlowFixMe[missing-local-annot]
      reset: (node) => setRecoilValue$3(store, node, DEFAULT_VALUE$5),
      // $FlowFixMe[missing-local-annot]
      refresh: (node) => refreshRecoilValue$1(store, node),
      gotoSnapshot: (snapshot) => gotoSnapshot$1(store, snapshot),
      transact_UNSTABLE: (transaction) => atomicUpdater$1(store)(transaction)
    }, {
      snapshot: () => {
        const snapshot = cloneSnapshot$2(store);
        releaseSnapshot = snapshot.retain();
        return snapshot;
      }
    });
    const callback = fn2(callbackInterface);
    if (typeof callback !== "function") {
      throw Recoil_err(errMsg);
    }
    ret = callback(...args);
  });
  !!(ret instanceof Sentinel) ? true ? Recoil_invariant(false, "batchUpdates should return immediately") : Recoil_invariant(false) : void 0;
  if (Recoil_isPromise(ret)) {
    ret = ret.finally(() => {
      var _releaseSnapshot;
      (_releaseSnapshot = releaseSnapshot) === null || _releaseSnapshot === void 0 ? void 0 : _releaseSnapshot();
    });
  } else {
    var _releaseSnapshot2;
    (_releaseSnapshot2 = releaseSnapshot) === null || _releaseSnapshot2 === void 0 ? void 0 : _releaseSnapshot2();
  }
  return ret;
}
function useRecoilCallback(fn2, deps) {
  const storeRef = useStoreRef$6();
  return useCallback$3(
    // $FlowIssue[incompatible-call]
    (...args) => {
      return recoilCallback(storeRef.current, fn2, args);
    },
    deps != null ? [...deps, storeRef] : void 0
    // eslint-disable-line fb-www/react-hooks-deps
  );
}
var Recoil_useRecoilCallback = {
  recoilCallback,
  useRecoilCallback
};
var {
  useStoreRef: useStoreRef$7
} = Recoil_RecoilRoot;
var {
  refreshRecoilValue: refreshRecoilValue$2
} = Recoil_RecoilValueInterface;
var {
  useCallback: useCallback$4
} = import_react.default;
function useRecoilRefresher(recoilValue) {
  const storeRef = useStoreRef$7();
  return useCallback$4(() => {
    const store = storeRef.current;
    refreshRecoilValue$2(store, recoilValue);
  }, [recoilValue, storeRef]);
}
var Recoil_useRecoilRefresher = useRecoilRefresher;
var {
  atomicUpdater: atomicUpdater$2
} = Recoil_AtomicUpdates$1;
var {
  useStoreRef: useStoreRef$8
} = Recoil_RecoilRoot;
var {
  useMemo: useMemo$3
} = import_react.default;
function useRecoilTransaction(fn2, deps) {
  const storeRef = useStoreRef$8();
  return useMemo$3(
    () => (...args) => {
      const atomicUpdate = atomicUpdater$2(storeRef.current);
      atomicUpdate((transactionInterface) => {
        fn2(transactionInterface)(...args);
      });
    },
    deps != null ? [...deps, storeRef] : void 0
    // eslint-disable-line fb-www/react-hooks-deps
  );
}
var Recoil_useRecoilTransaction = useRecoilTransaction;
var WrappedValue = class {
  constructor(value) {
    _defineProperty(this, "value", void 0);
    this.value = value;
  }
};
var Recoil_Wrapper = {
  WrappedValue
};
var Recoil_Wrapper_1 = Recoil_Wrapper.WrappedValue;
var Recoil_Wrapper$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  WrappedValue: Recoil_Wrapper_1
});
var {
  isFastRefreshEnabled: isFastRefreshEnabled$2
} = Recoil_ReactMode;
var ChangedPathError = class extends Error {
};
var TreeCache = class {
  // $FlowIssue[unclear-type]
  constructor(options) {
    var _options$onHit, _options$onSet, _options$mapNodeValue;
    _defineProperty(this, "_name", void 0);
    _defineProperty(this, "_numLeafs", void 0);
    _defineProperty(this, "_root", void 0);
    _defineProperty(this, "_onHit", void 0);
    _defineProperty(this, "_onSet", void 0);
    _defineProperty(this, "_mapNodeValue", void 0);
    this._name = options === null || options === void 0 ? void 0 : options.name;
    this._numLeafs = 0;
    this._root = null;
    this._onHit = (_options$onHit = options === null || options === void 0 ? void 0 : options.onHit) !== null && _options$onHit !== void 0 ? _options$onHit : () => {
    };
    this._onSet = (_options$onSet = options === null || options === void 0 ? void 0 : options.onSet) !== null && _options$onSet !== void 0 ? _options$onSet : () => {
    };
    this._mapNodeValue = (_options$mapNodeValue = options === null || options === void 0 ? void 0 : options.mapNodeValue) !== null && _options$mapNodeValue !== void 0 ? _options$mapNodeValue : (val) => val;
  }
  size() {
    return this._numLeafs;
  }
  // $FlowIssue[unclear-type]
  root() {
    return this._root;
  }
  get(getNodeValue, handlers) {
    var _this$getLeafNode;
    return (_this$getLeafNode = this.getLeafNode(getNodeValue, handlers)) === null || _this$getLeafNode === void 0 ? void 0 : _this$getLeafNode.value;
  }
  getLeafNode(getNodeValue, handlers) {
    if (this._root == null) {
      return void 0;
    }
    let node = this._root;
    while (node) {
      handlers === null || handlers === void 0 ? void 0 : handlers.onNodeVisit(node);
      if (node.type === "leaf") {
        this._onHit(node);
        return node;
      }
      const nodeValue = this._mapNodeValue(getNodeValue(node.nodeKey));
      node = node.branches.get(nodeValue);
    }
    return void 0;
  }
  set(route, value, handlers) {
    const addLeaf = () => {
      var _node2, _node3, _this$_root2, _handlers$onNodeVisit2;
      let node;
      let branchKey;
      for (const [nodeKey, nodeValue] of route) {
        var _node, _handlers$onNodeVisit, _this$_root;
        const root = this._root;
        if ((root === null || root === void 0 ? void 0 : root.type) === "leaf") {
          throw this.invalidCacheError();
        }
        const parent = node;
        node = parent ? parent.branches.get(branchKey) : root;
        node = (_node = node) !== null && _node !== void 0 ? _node : {
          type: "branch",
          nodeKey,
          parent,
          branches: /* @__PURE__ */ new Map(),
          branchKey
        };
        if (node.type !== "branch" || node.nodeKey !== nodeKey) {
          throw this.invalidCacheError();
        }
        parent === null || parent === void 0 ? void 0 : parent.branches.set(branchKey, node);
        handlers === null || handlers === void 0 ? void 0 : (_handlers$onNodeVisit = handlers.onNodeVisit) === null || _handlers$onNodeVisit === void 0 ? void 0 : _handlers$onNodeVisit.call(handlers, node);
        branchKey = this._mapNodeValue(nodeValue);
        this._root = (_this$_root = this._root) !== null && _this$_root !== void 0 ? _this$_root : node;
      }
      const oldLeaf = node ? (_node2 = node) === null || _node2 === void 0 ? void 0 : _node2.branches.get(branchKey) : this._root;
      if (oldLeaf != null && (oldLeaf.type !== "leaf" || oldLeaf.branchKey !== branchKey)) {
        throw this.invalidCacheError();
      }
      const leafNode = {
        type: "leaf",
        value,
        parent: node,
        branchKey
      };
      (_node3 = node) === null || _node3 === void 0 ? void 0 : _node3.branches.set(branchKey, leafNode);
      this._root = (_this$_root2 = this._root) !== null && _this$_root2 !== void 0 ? _this$_root2 : leafNode;
      this._numLeafs++;
      this._onSet(leafNode);
      handlers === null || handlers === void 0 ? void 0 : (_handlers$onNodeVisit2 = handlers.onNodeVisit) === null || _handlers$onNodeVisit2 === void 0 ? void 0 : _handlers$onNodeVisit2.call(handlers, leafNode);
    };
    try {
      addLeaf();
    } catch (error) {
      if (error instanceof ChangedPathError) {
        this.clear();
        addLeaf();
      } else {
        throw error;
      }
    }
  }
  // Returns true if leaf was actually deleted from the tree
  delete(leaf) {
    const root = this.root();
    if (!root) {
      return false;
    }
    if (leaf === root) {
      this._root = null;
      this._numLeafs = 0;
      return true;
    }
    let node = leaf.parent;
    let branchKey = leaf.branchKey;
    while (node) {
      var _node4;
      node.branches.delete(branchKey);
      if (node === root) {
        if (node.branches.size === 0) {
          this._root = null;
          this._numLeafs = 0;
        } else {
          this._numLeafs--;
        }
        return true;
      }
      if (node.branches.size > 0) {
        break;
      }
      branchKey = (_node4 = node) === null || _node4 === void 0 ? void 0 : _node4.branchKey;
      node = node.parent;
    }
    for (; node !== root; node = node.parent) {
      if (node == null) {
        return false;
      }
    }
    this._numLeafs--;
    return true;
  }
  clear() {
    this._numLeafs = 0;
    this._root = null;
  }
  invalidCacheError() {
    const CHANGED_PATH_ERROR_MESSAGE = isFastRefreshEnabled$2() ? "Possible Fast Refresh module reload detected.  This may also be caused by an selector returning inconsistent values. Resetting cache." : "Invalid cache values.  This happens when selectors do not return consistent values for the same input dependency values.  That may also be caused when using Fast Refresh to change a selector implementation.  Resetting cache.";
    Recoil_recoverableViolation(CHANGED_PATH_ERROR_MESSAGE + (this._name != null ? ` - ${this._name}` : ""));
    throw new ChangedPathError();
  }
};
var Recoil_TreeCache = {
  TreeCache
};
var Recoil_TreeCache_1 = Recoil_TreeCache.TreeCache;
var Recoil_TreeCache$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  TreeCache: Recoil_TreeCache_1
});
var LRUCache = class {
  constructor(options) {
    var _options$mapKey;
    _defineProperty(this, "_maxSize", void 0);
    _defineProperty(this, "_size", void 0);
    _defineProperty(this, "_head", void 0);
    _defineProperty(this, "_tail", void 0);
    _defineProperty(this, "_map", void 0);
    _defineProperty(this, "_keyMapper", void 0);
    this._maxSize = options.maxSize;
    this._size = 0;
    this._head = null;
    this._tail = null;
    this._map = /* @__PURE__ */ new Map();
    this._keyMapper = (_options$mapKey = options.mapKey) !== null && _options$mapKey !== void 0 ? _options$mapKey : (v2) => v2;
  }
  head() {
    return this._head;
  }
  tail() {
    return this._tail;
  }
  size() {
    return this._size;
  }
  maxSize() {
    return this._maxSize;
  }
  has(key) {
    return this._map.has(this._keyMapper(key));
  }
  get(key) {
    const mappedKey = this._keyMapper(key);
    const node = this._map.get(mappedKey);
    if (!node) {
      return void 0;
    }
    this.set(key, node.value);
    return node.value;
  }
  set(key, val) {
    const mappedKey = this._keyMapper(key);
    const existingNode = this._map.get(mappedKey);
    if (existingNode) {
      this.delete(key);
    }
    const head = this.head();
    const node = {
      key,
      right: head,
      left: null,
      value: val
    };
    if (head) {
      head.left = node;
    } else {
      this._tail = node;
    }
    this._map.set(mappedKey, node);
    this._head = node;
    this._size++;
    this._maybeDeleteLRU();
  }
  _maybeDeleteLRU() {
    if (this.size() > this.maxSize()) {
      this.deleteLru();
    }
  }
  deleteLru() {
    const tail = this.tail();
    if (tail) {
      this.delete(tail.key);
    }
  }
  delete(key) {
    const mappedKey = this._keyMapper(key);
    if (!this._size || !this._map.has(mappedKey)) {
      return;
    }
    const node = Recoil_nullthrows(this._map.get(mappedKey));
    const right = node.right;
    const left = node.left;
    if (right) {
      right.left = node.left;
    }
    if (left) {
      left.right = node.right;
    }
    if (node === this.head()) {
      this._head = right;
    }
    if (node === this.tail()) {
      this._tail = left;
    }
    this._map.delete(mappedKey);
    this._size--;
  }
  clear() {
    this._size = 0;
    this._head = null;
    this._tail = null;
    this._map = /* @__PURE__ */ new Map();
  }
};
var Recoil_LRUCache = {
  LRUCache
};
var Recoil_LRUCache_1 = Recoil_LRUCache.LRUCache;
var Recoil_LRUCache$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  LRUCache: Recoil_LRUCache_1
});
var {
  LRUCache: LRUCache$1
} = Recoil_LRUCache$1;
var {
  TreeCache: TreeCache$1
} = Recoil_TreeCache$1;
function treeCacheLRU({
  name,
  maxSize,
  mapNodeValue = (v2) => v2
}) {
  const lruCache = new LRUCache$1({
    maxSize
  });
  const cache = new TreeCache$1({
    name,
    mapNodeValue,
    onHit: (node) => {
      lruCache.set(node, true);
    },
    onSet: (node) => {
      const lruNode = lruCache.tail();
      lruCache.set(node, true);
      if (lruNode && cache.size() > maxSize) {
        cache.delete(lruNode.key);
      }
    }
  });
  return cache;
}
var Recoil_treeCacheLRU = treeCacheLRU;
var TIME_WARNING_THRESHOLD_MS = 15;
function stringify(x2, opt, key) {
  if (typeof x2 === "string" && !x2.includes('"') && !x2.includes("\\")) {
    return `"${x2}"`;
  }
  switch (typeof x2) {
    case "undefined":
      return "";
    case "boolean":
      return x2 ? "true" : "false";
    case "number":
    case "symbol":
      return String(x2);
    case "string":
      return JSON.stringify(x2);
    case "function":
      if ((opt === null || opt === void 0 ? void 0 : opt.allowFunctions) !== true) {
        throw Recoil_err("Attempt to serialize function in a Recoil cache key");
      }
      return `__FUNCTION(${x2.name})__`;
  }
  if (x2 === null) {
    return "null";
  }
  if (typeof x2 !== "object") {
    var _JSON$stringify;
    return (_JSON$stringify = JSON.stringify(x2)) !== null && _JSON$stringify !== void 0 ? _JSON$stringify : "";
  }
  if (Recoil_isPromise(x2)) {
    return "__PROMISE__";
  }
  if (Array.isArray(x2)) {
    return `[${x2.map((v2, i2) => stringify(v2, opt, i2.toString()))}]`;
  }
  if (typeof x2.toJSON === "function") {
    return stringify(x2.toJSON(key), opt, key);
  }
  if (x2 instanceof Map) {
    const obj = {};
    for (const [k2, v2] of x2) {
      obj[typeof k2 === "string" ? k2 : stringify(k2, opt)] = v2;
    }
    return stringify(obj, opt, key);
  }
  if (x2 instanceof Set) {
    return stringify(
      // $FlowFixMe[missing-local-annot]
      Array.from(x2).sort((a2, b2) => stringify(a2, opt).localeCompare(stringify(b2, opt))),
      opt,
      key
    );
  }
  if (Symbol !== void 0 && x2[Symbol.iterator] != null && typeof x2[Symbol.iterator] === "function") {
    return stringify(Array.from(x2), opt, key);
  }
  return `{${Object.keys(x2).filter((k2) => x2[k2] !== void 0).sort().map((k2) => `${stringify(k2, opt)}:${stringify(x2[k2], opt, k2)}`).join(",")}}`;
}
function stableStringify(x2, opt = {
  allowFunctions: false
}) {
  if (true) {
    if (typeof window !== "undefined") {
      const startTime = window.performance ? window.performance.now() : 0;
      const str = stringify(x2, opt);
      const endTime = window.performance ? window.performance.now() : 0;
      if (endTime - startTime > TIME_WARNING_THRESHOLD_MS) {
        console.groupCollapsed(`Recoil: Spent ${endTime - startTime}ms computing a cache key`);
        console.warn(x2, str);
        console.groupEnd();
      }
      return str;
    }
  }
  return stringify(x2, opt);
}
var Recoil_stableStringify = stableStringify;
var {
  TreeCache: TreeCache$2
} = Recoil_TreeCache$1;
var defaultPolicy = {
  equality: "reference",
  eviction: "keep-all",
  maxSize: Infinity
};
function treeCacheFromPolicy({
  equality = defaultPolicy.equality,
  eviction = defaultPolicy.eviction,
  maxSize = defaultPolicy.maxSize
} = defaultPolicy, name) {
  const valueMapper = getValueMapper(equality);
  return getTreeCache(eviction, maxSize, valueMapper, name);
}
function getValueMapper(equality) {
  switch (equality) {
    case "reference":
      return (val) => val;
    case "value":
      return (val) => Recoil_stableStringify(val);
  }
  throw Recoil_err(`Unrecognized equality policy ${equality}`);
}
function getTreeCache(eviction, maxSize, mapNodeValue, name) {
  switch (eviction) {
    case "keep-all":
      return new TreeCache$2({
        name,
        mapNodeValue
      });
    case "lru":
      return Recoil_treeCacheLRU({
        name,
        maxSize: Recoil_nullthrows(maxSize),
        mapNodeValue
      });
    case "most-recent":
      return Recoil_treeCacheLRU({
        name,
        maxSize: 1,
        mapNodeValue
      });
  }
  throw Recoil_err(`Unrecognized eviction policy ${eviction}`);
}
var Recoil_treeCacheFromPolicy = treeCacheFromPolicy;
function isNode(object) {
  var _ownerDocument, _doc$defaultView;
  if (typeof window === "undefined") {
    return false;
  }
  const doc = object != null ? (_ownerDocument = object.ownerDocument) !== null && _ownerDocument !== void 0 ? _ownerDocument : object : document;
  const defaultView = (_doc$defaultView = doc.defaultView) !== null && _doc$defaultView !== void 0 ? _doc$defaultView : window;
  return !!(object != null && (typeof defaultView.Node === "function" ? object instanceof defaultView.Node : typeof object === "object" && typeof object.nodeType === "number" && typeof object.nodeName === "string"));
}
var Recoil_isNode = isNode;
var {
  isReactNative: isReactNative$1,
  isWindow: isWindow$1
} = Recoil_Environment;
function shouldNotBeFrozen(value) {
  if (value === null || typeof value !== "object") {
    return true;
  }
  switch (typeof value.$$typeof) {
    case "symbol":
      return true;
    case "number":
      return true;
  }
  if (value["@@__IMMUTABLE_ITERABLE__@@"] != null || value["@@__IMMUTABLE_KEYED__@@"] != null || value["@@__IMMUTABLE_INDEXED__@@"] != null || value["@@__IMMUTABLE_ORDERED__@@"] != null || value["@@__IMMUTABLE_RECORD__@@"] != null) {
    return true;
  }
  if (Recoil_isNode(value)) {
    return true;
  }
  if (Recoil_isPromise(value)) {
    return true;
  }
  if (value instanceof Error) {
    return true;
  }
  if (ArrayBuffer.isView(value)) {
    return true;
  }
  if (!isReactNative$1 && isWindow$1(value)) {
    return true;
  }
  return false;
}
function deepFreezeValue(value) {
  if (typeof value !== "object" || shouldNotBeFrozen(value)) {
    return;
  }
  Object.freeze(value);
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      const prop = value[key];
      if (typeof prop === "object" && prop != null && !Object.isFrozen(prop)) {
        deepFreezeValue(prop);
      }
    }
  }
  Object.seal(value);
}
var Recoil_deepFreezeValue = deepFreezeValue;
function startPerfBlock(_id) {
  return () => null;
}
var Recoil_PerformanceTimings = {
  startPerfBlock
};
var {
  isLoadable: isLoadable$1,
  loadableWithError: loadableWithError$1,
  loadableWithPromise: loadableWithPromise$1,
  loadableWithValue: loadableWithValue$2
} = Recoil_Loadable$1;
var {
  WrappedValue: WrappedValue$1
} = Recoil_Wrapper$1;
var {
  getNodeLoadable: getNodeLoadable$2,
  peekNodeLoadable: peekNodeLoadable$1,
  setNodeValue: setNodeValue$3
} = Recoil_FunctionalCore;
var {
  saveDepsToStore: saveDepsToStore$1
} = Recoil_Graph;
var {
  DEFAULT_VALUE: DEFAULT_VALUE$6,
  getConfigDeletionHandler: getConfigDeletionHandler$1,
  getNode: getNode$6,
  registerNode: registerNode$1
} = Recoil_Node;
var {
  isRecoilValue: isRecoilValue$3
} = Recoil_RecoilValue$1;
var {
  markRecoilValueModified: markRecoilValueModified$1
} = Recoil_RecoilValueInterface;
var {
  retainedByOptionWithDefault: retainedByOptionWithDefault$1
} = Recoil_Retention;
var {
  recoilCallback: recoilCallback$1
} = Recoil_useRecoilCallback;
var {
  startPerfBlock: startPerfBlock$1
} = Recoil_PerformanceTimings;
var Canceled = class {
};
var CANCELED = new Canceled();
var dependencyStack = [];
var waitingStores = /* @__PURE__ */ new Map();
var getNewExecutionID = (() => {
  let executionID = 0;
  return () => executionID++;
})();
function selector(options) {
  let recoilValue = null;
  const {
    key,
    get,
    cachePolicy_UNSTABLE: cachePolicy
  } = options;
  const set = options.set != null ? options.set : void 0;
  if (true) {
    if (typeof key !== "string") {
      throw Recoil_err("A key option with a unique string value must be provided when creating a selector.");
    }
    if (typeof get !== "function") {
      throw Recoil_err("Selectors must specify a get callback option to get the selector value.");
    }
  }
  const discoveredDependencyNodeKeys = /* @__PURE__ */ new Set();
  const cache = Recoil_treeCacheFromPolicy(cachePolicy !== null && cachePolicy !== void 0 ? cachePolicy : {
    equality: "reference",
    eviction: "keep-all"
  }, key);
  const retainedBy = retainedByOptionWithDefault$1(options.retainedBy_UNSTABLE);
  const executionInfoMap = /* @__PURE__ */ new Map();
  let liveStoresCount = 0;
  function selectorIsLive() {
    return !Recoil_gkx("recoil_memory_managament_2020") || liveStoresCount > 0;
  }
  function selectorInit(store) {
    store.getState().knownSelectors.add(key);
    liveStoresCount++;
    return () => {
      liveStoresCount--;
    };
  }
  function selectorShouldDeleteConfigOnRelease() {
    return getConfigDeletionHandler$1(key) !== void 0 && !selectorIsLive();
  }
  function resolveAsync(store, state, executionID, loadable, depValues) {
    setCache(state, loadable, depValues);
    notifyStoresOfResolvedAsync(store, executionID);
  }
  function notifyStoresOfResolvedAsync(store, executionID) {
    if (isLatestExecution(store, executionID)) {
      clearExecutionInfo(store);
    }
    notifyWaitingStores(executionID, true);
  }
  function notifyStoresOfNewAsyncDep(store, executionID) {
    if (isLatestExecution(store, executionID)) {
      const executionInfo = Recoil_nullthrows(getExecutionInfo(store));
      executionInfo.stateVersions.clear();
      notifyWaitingStores(executionID, false);
    }
  }
  function notifyWaitingStores(executionID, clearWaitlist) {
    const stores = waitingStores.get(executionID);
    if (stores != null) {
      for (const waitingStore of stores) {
        markRecoilValueModified$1(waitingStore, Recoil_nullthrows(recoilValue));
      }
      if (clearWaitlist) {
        waitingStores.delete(executionID);
      }
    }
  }
  function markStoreWaitingForResolvedAsync(store, executionID) {
    let stores = waitingStores.get(executionID);
    if (stores == null) {
      waitingStores.set(executionID, stores = /* @__PURE__ */ new Set());
    }
    stores.add(store);
  }
  function wrapResultPromise(store, promise, state, depValues, executionID, loadingDepsState) {
    return promise.then((value) => {
      if (!selectorIsLive()) {
        clearExecutionInfo(store);
        throw CANCELED;
      }
      const loadable = loadableWithValue$2(value);
      resolveAsync(store, state, executionID, loadable, depValues);
      return value;
    }).catch((errorOrPromise) => {
      if (!selectorIsLive()) {
        clearExecutionInfo(store);
        throw CANCELED;
      }
      if (Recoil_isPromise(errorOrPromise)) {
        return wrapPendingDependencyPromise(store, errorOrPromise, state, depValues, executionID, loadingDepsState);
      }
      const loadable = loadableWithError$1(errorOrPromise);
      resolveAsync(store, state, executionID, loadable, depValues);
      throw errorOrPromise;
    });
  }
  function wrapPendingDependencyPromise(store, promise, state, existingDeps, executionID, loadingDepsState) {
    return promise.then((resolvedDep) => {
      if (!selectorIsLive()) {
        clearExecutionInfo(store);
        throw CANCELED;
      }
      if (loadingDepsState.loadingDepKey != null && loadingDepsState.loadingDepPromise === promise) {
        state.atomValues.set(loadingDepsState.loadingDepKey, loadableWithValue$2(resolvedDep));
      } else {
        store.getState().knownSelectors.forEach((nodeKey) => {
          state.atomValues.delete(nodeKey);
        });
      }
      const cachedLoadable = getLoadableFromCacheAndUpdateDeps(store, state);
      if (cachedLoadable && cachedLoadable.state !== "loading") {
        if (isLatestExecution(store, executionID) || getExecutionInfo(store) == null) {
          notifyStoresOfResolvedAsync(store, executionID);
        }
        if (cachedLoadable.state === "hasValue") {
          return cachedLoadable.contents;
        } else {
          throw cachedLoadable.contents;
        }
      }
      if (!isLatestExecution(store, executionID)) {
        const executionInfo = getInProgressExecutionInfo(store, state);
        if (executionInfo != null) {
          return executionInfo.loadingLoadable.contents;
        }
      }
      const [loadable, depValues] = evaluateSelectorGetter(store, state, executionID);
      if (loadable.state !== "loading") {
        resolveAsync(store, state, executionID, loadable, depValues);
      }
      if (loadable.state === "hasError") {
        throw loadable.contents;
      }
      return loadable.contents;
    }).catch((error) => {
      if (error instanceof Canceled) {
        throw CANCELED;
      }
      if (!selectorIsLive()) {
        clearExecutionInfo(store);
        throw CANCELED;
      }
      const loadable = loadableWithError$1(error);
      resolveAsync(store, state, executionID, loadable, existingDeps);
      throw error;
    });
  }
  function updateDeps(store, state, deps, executionID) {
    var _store$getState, _store$getState$curre, _store$getState2, _store$getState2$next;
    if (isLatestExecution(store, executionID) || state.version === ((_store$getState = store.getState()) === null || _store$getState === void 0 ? void 0 : (_store$getState$curre = _store$getState.currentTree) === null || _store$getState$curre === void 0 ? void 0 : _store$getState$curre.version) || state.version === ((_store$getState2 = store.getState()) === null || _store$getState2 === void 0 ? void 0 : (_store$getState2$next = _store$getState2.nextTree) === null || _store$getState2$next === void 0 ? void 0 : _store$getState2$next.version)) {
      var _store$getState$nextT, _store$getState3, _store$getState3$next;
      saveDepsToStore$1(key, deps, store, (_store$getState$nextT = (_store$getState3 = store.getState()) === null || _store$getState3 === void 0 ? void 0 : (_store$getState3$next = _store$getState3.nextTree) === null || _store$getState3$next === void 0 ? void 0 : _store$getState3$next.version) !== null && _store$getState$nextT !== void 0 ? _store$getState$nextT : store.getState().currentTree.version);
    }
    for (const nodeKey of deps) {
      discoveredDependencyNodeKeys.add(nodeKey);
    }
  }
  function evaluateSelectorGetter(store, state, executionID) {
    const endPerfBlock = startPerfBlock$1(key);
    let duringSynchronousExecution = true;
    let duringAsynchronousExecution = true;
    const finishEvaluation = () => {
      endPerfBlock();
      duringAsynchronousExecution = false;
    };
    let result;
    let resultIsError = false;
    let loadable;
    const loadingDepsState = {
      loadingDepKey: null,
      loadingDepPromise: null
    };
    const depValues = /* @__PURE__ */ new Map();
    function getRecoilValue({
      key: depKey
    }) {
      const depLoadable = getNodeLoadable$2(store, state, depKey);
      depValues.set(depKey, depLoadable);
      if (!duringSynchronousExecution) {
        updateDeps(store, state, new Set(depValues.keys()), executionID);
        notifyStoresOfNewAsyncDep(store, executionID);
      }
      switch (depLoadable.state) {
        case "hasValue":
          return depLoadable.contents;
        case "hasError":
          throw depLoadable.contents;
        case "loading":
          loadingDepsState.loadingDepKey = depKey;
          loadingDepsState.loadingDepPromise = depLoadable.contents;
          throw depLoadable.contents;
      }
      throw Recoil_err("Invalid Loadable state");
    }
    const getCallback = (fn2) => {
      return (...args) => {
        if (duringAsynchronousExecution) {
          throw Recoil_err("Callbacks from getCallback() should only be called asynchronously after the selector is evalutated.  It can be used for selectors to return objects with callbacks that can work with Recoil state without a subscription.");
        }
        !(recoilValue != null) ? true ? Recoil_invariant(false, "Recoil Value can never be null") : Recoil_invariant(false) : void 0;
        return recoilCallback$1(
          store,
          fn2,
          args,
          {
            node: recoilValue
          }
          // flowlint-line unclear-type:off
        );
      };
    };
    try {
      result = get({
        get: getRecoilValue,
        getCallback
      });
      result = isRecoilValue$3(result) ? getRecoilValue(result) : result;
      if (isLoadable$1(result)) {
        if (result.state === "hasError") {
          resultIsError = true;
        }
        result = result.contents;
      }
      if (Recoil_isPromise(result)) {
        result = wrapResultPromise(store, result, state, depValues, executionID, loadingDepsState).finally(finishEvaluation);
      } else {
        finishEvaluation();
      }
      result = result instanceof WrappedValue$1 ? result.value : result;
    } catch (errorOrDepPromise) {
      result = errorOrDepPromise;
      if (Recoil_isPromise(result)) {
        result = wrapPendingDependencyPromise(store, result, state, depValues, executionID, loadingDepsState).finally(finishEvaluation);
      } else {
        resultIsError = true;
        finishEvaluation();
      }
    }
    if (resultIsError) {
      loadable = loadableWithError$1(result);
    } else if (Recoil_isPromise(result)) {
      loadable = loadableWithPromise$1(result);
    } else {
      loadable = loadableWithValue$2(result);
    }
    duringSynchronousExecution = false;
    updateExecutionInfoDepValues(store, executionID, depValues);
    updateDeps(store, state, new Set(depValues.keys()), executionID);
    return [loadable, depValues];
  }
  function getLoadableFromCacheAndUpdateDeps(store, state) {
    let cachedLoadable = state.atomValues.get(key);
    if (cachedLoadable != null) {
      return cachedLoadable;
    }
    const depsAfterCacheLookup = /* @__PURE__ */ new Set();
    try {
      cachedLoadable = cache.get((nodeKey) => {
        !(typeof nodeKey === "string") ? true ? Recoil_invariant(false, "Cache nodeKey is type string") : Recoil_invariant(false) : void 0;
        return getNodeLoadable$2(store, state, nodeKey).contents;
      }, {
        onNodeVisit: (node) => {
          if (node.type === "branch" && node.nodeKey !== key) {
            depsAfterCacheLookup.add(node.nodeKey);
          }
        }
      });
    } catch (error) {
      throw Recoil_err(`Problem with cache lookup for selector "${key}": ${error.message}`);
    }
    if (cachedLoadable) {
      var _getExecutionInfo;
      state.atomValues.set(key, cachedLoadable);
      updateDeps(store, state, depsAfterCacheLookup, (_getExecutionInfo = getExecutionInfo(store)) === null || _getExecutionInfo === void 0 ? void 0 : _getExecutionInfo.executionID);
    }
    return cachedLoadable;
  }
  function getSelectorLoadableAndUpdateDeps(store, state) {
    const cachedVal = getLoadableFromCacheAndUpdateDeps(store, state);
    if (cachedVal != null) {
      clearExecutionInfo(store);
      return cachedVal;
    }
    const inProgressExecutionInfo = getInProgressExecutionInfo(store, state);
    if (inProgressExecutionInfo != null) {
      var _inProgressExecutionI;
      if (((_inProgressExecutionI = inProgressExecutionInfo.loadingLoadable) === null || _inProgressExecutionI === void 0 ? void 0 : _inProgressExecutionI.state) === "loading") {
        markStoreWaitingForResolvedAsync(store, inProgressExecutionInfo.executionID);
      }
      return inProgressExecutionInfo.loadingLoadable;
    }
    const newExecutionID = getNewExecutionID();
    const [loadable, newDepValues] = evaluateSelectorGetter(store, state, newExecutionID);
    if (loadable.state === "loading") {
      setExecutionInfo(store, newExecutionID, loadable, newDepValues, state);
      markStoreWaitingForResolvedAsync(store, newExecutionID);
    } else {
      clearExecutionInfo(store);
      setCache(state, loadable, newDepValues);
    }
    return loadable;
  }
  function getInProgressExecutionInfo(store, state) {
    const pendingExecutions = Recoil_concatIterables([executionInfoMap.has(store) ? [Recoil_nullthrows(executionInfoMap.get(store))] : [], Recoil_mapIterable(Recoil_filterIterable(executionInfoMap, ([s2]) => s2 !== store), ([, execInfo]) => execInfo)]);
    function anyDepChanged(execDepValues) {
      for (const [depKey, execLoadable] of execDepValues) {
        if (!getNodeLoadable$2(store, state, depKey).is(execLoadable)) {
          return true;
        }
      }
      return false;
    }
    for (const execInfo of pendingExecutions) {
      if (
        // If this execution was already checked to be valid with this version
        // of state, then let's use it!
        execInfo.stateVersions.get(state.version) || // If the deps for the execution match our current state, then it's valid
        !anyDepChanged(execInfo.depValuesDiscoveredSoFarDuringAsyncWork)
      ) {
        execInfo.stateVersions.set(state.version, true);
        return execInfo;
      } else {
        execInfo.stateVersions.set(state.version, false);
      }
    }
    return void 0;
  }
  function getExecutionInfo(store) {
    return executionInfoMap.get(store);
  }
  function setExecutionInfo(store, newExecutionID, loadable, depValues, state) {
    executionInfoMap.set(store, {
      depValuesDiscoveredSoFarDuringAsyncWork: depValues,
      executionID: newExecutionID,
      loadingLoadable: loadable,
      stateVersions: /* @__PURE__ */ new Map([[state.version, true]])
    });
  }
  function updateExecutionInfoDepValues(store, executionID, depValues) {
    if (isLatestExecution(store, executionID)) {
      const executionInfo = getExecutionInfo(store);
      if (executionInfo != null) {
        executionInfo.depValuesDiscoveredSoFarDuringAsyncWork = depValues;
      }
    }
  }
  function clearExecutionInfo(store) {
    executionInfoMap.delete(store);
  }
  function isLatestExecution(store, executionID) {
    var _getExecutionInfo2;
    return executionID === ((_getExecutionInfo2 = getExecutionInfo(store)) === null || _getExecutionInfo2 === void 0 ? void 0 : _getExecutionInfo2.executionID);
  }
  function depValuesToDepRoute(depValues) {
    return Array.from(depValues.entries()).map(([depKey, valLoadable]) => [depKey, valLoadable.contents]);
  }
  function setCache(state, loadable, depValues) {
    if (true) {
      if (loadable.state !== "loading" && Boolean(options.dangerouslyAllowMutability) === false) {
        Recoil_deepFreezeValue(loadable.contents);
      }
    }
    state.atomValues.set(key, loadable);
    try {
      cache.set(depValuesToDepRoute(depValues), loadable);
    } catch (error) {
      throw Recoil_err(`Problem with setting cache for selector "${key}": ${error.message}`);
    }
  }
  function detectCircularDependencies(fn2) {
    if (dependencyStack.includes(key)) {
      const message = `Recoil selector has circular dependencies: ${dependencyStack.slice(dependencyStack.indexOf(key)).join(" \u2192 ")}`;
      return loadableWithError$1(Recoil_err(message));
    }
    dependencyStack.push(key);
    try {
      return fn2();
    } finally {
      dependencyStack.pop();
    }
  }
  function selectorPeek(store, state) {
    const cachedLoadable = state.atomValues.get(key);
    if (cachedLoadable != null) {
      return cachedLoadable;
    }
    return cache.get((nodeKey) => {
      var _peekNodeLoadable;
      !(typeof nodeKey === "string") ? true ? Recoil_invariant(false, "Cache nodeKey is type string") : Recoil_invariant(false) : void 0;
      return (_peekNodeLoadable = peekNodeLoadable$1(store, state, nodeKey)) === null || _peekNodeLoadable === void 0 ? void 0 : _peekNodeLoadable.contents;
    });
  }
  function selectorGet(store, state) {
    return detectCircularDependencies(() => getSelectorLoadableAndUpdateDeps(store, state));
  }
  function invalidateSelector(state) {
    state.atomValues.delete(key);
  }
  function clearSelectorCache(store, treeState) {
    !(recoilValue != null) ? true ? Recoil_invariant(false, "Recoil Value can never be null") : Recoil_invariant(false) : void 0;
    for (const nodeKey of discoveredDependencyNodeKeys) {
      var _node$clearCache;
      const node = getNode$6(nodeKey);
      (_node$clearCache = node.clearCache) === null || _node$clearCache === void 0 ? void 0 : _node$clearCache.call(node, store, treeState);
    }
    discoveredDependencyNodeKeys.clear();
    invalidateSelector(treeState);
    cache.clear();
    markRecoilValueModified$1(store, recoilValue);
  }
  if (set != null) {
    const selectorSet = (store, state, newValue) => {
      let syncSelectorSetFinished = false;
      const writes = /* @__PURE__ */ new Map();
      function getRecoilValue({
        key: depKey
      }) {
        if (syncSelectorSetFinished) {
          throw Recoil_err("Recoil: Async selector sets are not currently supported.");
        }
        const loadable = getNodeLoadable$2(store, state, depKey);
        if (loadable.state === "hasValue") {
          return loadable.contents;
        } else if (loadable.state === "loading") {
          const msg = `Getting value of asynchronous atom or selector "${depKey}" in a pending state while setting selector "${key}" is not yet supported.`;
          Recoil_recoverableViolation(msg);
          throw Recoil_err(msg);
        } else {
          throw loadable.contents;
        }
      }
      function setRecoilState(recoilState, valueOrUpdater) {
        if (syncSelectorSetFinished) {
          const msg = "Recoil: Async selector sets are not currently supported.";
          Recoil_recoverableViolation(msg);
          throw Recoil_err(msg);
        }
        const setValue = typeof valueOrUpdater === "function" ? (
          // cast to any because we can't restrict type S from being a function itself without losing support for opaque types
          // flowlint-next-line unclear-type:off
          valueOrUpdater(getRecoilValue(recoilState))
        ) : valueOrUpdater;
        const upstreamWrites = setNodeValue$3(store, state, recoilState.key, setValue);
        upstreamWrites.forEach((v2, k2) => writes.set(k2, v2));
      }
      function resetRecoilState(recoilState) {
        setRecoilState(recoilState, DEFAULT_VALUE$6);
      }
      const ret = set({
        set: setRecoilState,
        get: getRecoilValue,
        reset: resetRecoilState
      }, newValue);
      if (ret !== void 0) {
        throw Recoil_isPromise(ret) ? Recoil_err("Recoil: Async selector sets are not currently supported.") : Recoil_err("Recoil: selector set should be a void function.");
      }
      syncSelectorSetFinished = true;
      return writes;
    };
    return recoilValue = registerNode$1({
      key,
      nodeType: "selector",
      peek: selectorPeek,
      get: selectorGet,
      set: selectorSet,
      init: selectorInit,
      invalidate: invalidateSelector,
      clearCache: clearSelectorCache,
      shouldDeleteConfigOnRelease: selectorShouldDeleteConfigOnRelease,
      dangerouslyAllowMutability: options.dangerouslyAllowMutability,
      shouldRestoreFromSnapshots: false,
      retainedBy
    });
  } else {
    return recoilValue = registerNode$1({
      key,
      nodeType: "selector",
      peek: selectorPeek,
      get: selectorGet,
      init: selectorInit,
      invalidate: invalidateSelector,
      clearCache: clearSelectorCache,
      shouldDeleteConfigOnRelease: selectorShouldDeleteConfigOnRelease,
      dangerouslyAllowMutability: options.dangerouslyAllowMutability,
      shouldRestoreFromSnapshots: false,
      retainedBy
    });
  }
}
selector.value = (value) => new WrappedValue$1(value);
var Recoil_selector = selector;
var {
  isLoadable: isLoadable$2,
  loadableWithError: loadableWithError$2,
  loadableWithPromise: loadableWithPromise$2,
  loadableWithValue: loadableWithValue$3
} = Recoil_Loadable$1;
var {
  WrappedValue: WrappedValue$2
} = Recoil_Wrapper$1;
var {
  peekNodeInfo: peekNodeInfo$3
} = Recoil_FunctionalCore;
var {
  DEFAULT_VALUE: DEFAULT_VALUE$7,
  DefaultValue: DefaultValue$2,
  getConfigDeletionHandler: getConfigDeletionHandler$2,
  registerNode: registerNode$2,
  setConfigDeletionHandler: setConfigDeletionHandler$1
} = Recoil_Node;
var {
  isRecoilValue: isRecoilValue$4
} = Recoil_RecoilValue$1;
var {
  getRecoilValueAsLoadable: getRecoilValueAsLoadable$4,
  markRecoilValueModified: markRecoilValueModified$2,
  setRecoilValue: setRecoilValue$4,
  setRecoilValueLoadable: setRecoilValueLoadable$2
} = Recoil_RecoilValueInterface;
var {
  retainedByOptionWithDefault: retainedByOptionWithDefault$2
} = Recoil_Retention;
var unwrap = (x2) => x2 instanceof WrappedValue$2 ? x2.value : x2;
function baseAtom(options) {
  const {
    key,
    persistence_UNSTABLE: persistence
  } = options;
  const retainedBy = retainedByOptionWithDefault$2(options.retainedBy_UNSTABLE);
  let liveStoresCount = 0;
  function unwrapPromise(promise) {
    return loadableWithPromise$2(promise.then((value) => {
      defaultLoadable = loadableWithValue$3(value);
      return value;
    }).catch((error) => {
      defaultLoadable = loadableWithError$2(error);
      throw error;
    }));
  }
  let defaultLoadable = Recoil_isPromise(options.default) ? unwrapPromise(options.default) : isLoadable$2(options.default) ? options.default.state === "loading" ? unwrapPromise(options.default.contents) : options.default : (
    // $FlowFixMe[incompatible-call]
    loadableWithValue$3(unwrap(options.default))
  );
  maybeFreezeValueOrPromise(defaultLoadable.contents);
  let cachedAnswerForUnvalidatedValue = void 0;
  const cleanupEffectsByStore = /* @__PURE__ */ new Map();
  function maybeFreezeValueOrPromise(valueOrPromise) {
    if (true) {
      if (options.dangerouslyAllowMutability !== true) {
        if (Recoil_isPromise(valueOrPromise)) {
          return valueOrPromise.then((value) => {
            Recoil_deepFreezeValue(value);
            return value;
          });
        } else {
          Recoil_deepFreezeValue(valueOrPromise);
          return valueOrPromise;
        }
      }
    }
    return valueOrPromise;
  }
  function wrapPendingPromise(store, promise) {
    const wrappedPromise = promise.then((value) => {
      var _store$getState$nextT, _state$atomValues$get;
      const state = (_store$getState$nextT = store.getState().nextTree) !== null && _store$getState$nextT !== void 0 ? _store$getState$nextT : store.getState().currentTree;
      if (((_state$atomValues$get = state.atomValues.get(key)) === null || _state$atomValues$get === void 0 ? void 0 : _state$atomValues$get.contents) === wrappedPromise) {
        setRecoilValue$4(store, node, value);
      }
      return value;
    }).catch((error) => {
      var _store$getState$nextT2, _state$atomValues$get2;
      const state = (_store$getState$nextT2 = store.getState().nextTree) !== null && _store$getState$nextT2 !== void 0 ? _store$getState$nextT2 : store.getState().currentTree;
      if (((_state$atomValues$get2 = state.atomValues.get(key)) === null || _state$atomValues$get2 === void 0 ? void 0 : _state$atomValues$get2.contents) === wrappedPromise) {
        setRecoilValueLoadable$2(store, node, loadableWithError$2(error));
      }
      throw error;
    });
    return wrappedPromise;
  }
  function initAtom(store, initState, trigger) {
    var _options$effects;
    liveStoresCount++;
    const cleanupAtom = () => {
      var _cleanupEffectsByStor;
      liveStoresCount--;
      (_cleanupEffectsByStor = cleanupEffectsByStore.get(store)) === null || _cleanupEffectsByStor === void 0 ? void 0 : _cleanupEffectsByStor.forEach((cleanup) => cleanup());
      cleanupEffectsByStore.delete(store);
    };
    store.getState().knownAtoms.add(key);
    if (defaultLoadable.state === "loading") {
      const notifyDefaultSubscribers = () => {
        var _store$getState$nextT3;
        const state = (_store$getState$nextT3 = store.getState().nextTree) !== null && _store$getState$nextT3 !== void 0 ? _store$getState$nextT3 : store.getState().currentTree;
        if (!state.atomValues.has(key)) {
          markRecoilValueModified$2(store, node);
        }
      };
      defaultLoadable.contents.finally(notifyDefaultSubscribers);
    }
    const effects = (_options$effects = options.effects) !== null && _options$effects !== void 0 ? _options$effects : options.effects_UNSTABLE;
    if (effects != null) {
      let getLoadable = function(recoilValue) {
        if (isDuringInit && recoilValue.key === key) {
          const retValue = initValue;
          return retValue instanceof DefaultValue$2 ? peekAtom(store, initState) : Recoil_isPromise(retValue) ? loadableWithPromise$2(retValue.then((v2) => v2 instanceof DefaultValue$2 ? (
            // Cast T to S
            defaultLoadable.toPromise()
          ) : v2)) : (
            // $FlowFixMe[incompatible-call]
            loadableWithValue$3(retValue)
          );
        }
        return getRecoilValueAsLoadable$4(store, recoilValue);
      }, getPromise = function(recoilValue) {
        return getLoadable(recoilValue).toPromise();
      }, getInfo_UNSTABLE = function(recoilValue) {
        var _store$getState$nextT4;
        const info = peekNodeInfo$3(store, (_store$getState$nextT4 = store.getState().nextTree) !== null && _store$getState$nextT4 !== void 0 ? _store$getState$nextT4 : store.getState().currentTree, recoilValue.key);
        return isDuringInit && recoilValue.key === key && !(initValue instanceof DefaultValue$2) ? {
          ...info,
          isSet: true,
          loadable: getLoadable(recoilValue)
        } : info;
      };
      let initValue = DEFAULT_VALUE$7;
      let isDuringInit = true;
      let isInitError = false;
      let pendingSetSelf = null;
      const setSelf = (effect) => (valueOrUpdater) => {
        if (isDuringInit) {
          const currentLoadable = getLoadable(node);
          const currentValue = currentLoadable.state === "hasValue" ? currentLoadable.contents : DEFAULT_VALUE$7;
          initValue = typeof valueOrUpdater === "function" ? (
            // cast to any because we can't restrict T from being a function without losing support for opaque types
            valueOrUpdater(currentValue)
          ) : valueOrUpdater;
          if (Recoil_isPromise(initValue)) {
            initValue = initValue.then((value) => {
              pendingSetSelf = {
                effect,
                value
              };
              return value;
            });
          }
        } else {
          if (Recoil_isPromise(valueOrUpdater)) {
            throw Recoil_err("Setting atoms to async values is not implemented.");
          }
          if (typeof valueOrUpdater !== "function") {
            pendingSetSelf = {
              effect,
              value: unwrap(valueOrUpdater)
            };
          }
          setRecoilValue$4(store, node, typeof valueOrUpdater === "function" ? (currentValue) => {
            const newValue = unwrap(
              // cast to any because we can't restrict T from being a function without losing support for opaque types
              valueOrUpdater(currentValue)
              // flowlint-line unclear-type:off
            );
            pendingSetSelf = {
              effect,
              value: newValue
            };
            return newValue;
          } : unwrap(valueOrUpdater));
        }
      };
      const resetSelf = (effect) => () => setSelf(effect)(DEFAULT_VALUE$7);
      const onSet = (effect) => (handler) => {
        var _cleanupEffectsByStor2;
        const {
          release
        } = store.subscribeToTransactions((currentStore) => {
          var _currentTree$atomValu;
          let {
            currentTree,
            previousTree
          } = currentStore.getState();
          if (!previousTree) {
            Recoil_recoverableViolation("Transaction subscribers notified without a next tree being present -- this is a bug in Recoil");
            previousTree = currentTree;
          }
          const newLoadable = (_currentTree$atomValu = currentTree.atomValues.get(key)) !== null && _currentTree$atomValu !== void 0 ? _currentTree$atomValu : defaultLoadable;
          if (newLoadable.state === "hasValue") {
            var _previousTree$atomVal, _pendingSetSelf, _pendingSetSelf2, _pendingSetSelf3;
            const newValue = newLoadable.contents;
            const oldLoadable = (_previousTree$atomVal = previousTree.atomValues.get(key)) !== null && _previousTree$atomVal !== void 0 ? _previousTree$atomVal : defaultLoadable;
            const oldValue = oldLoadable.state === "hasValue" ? oldLoadable.contents : DEFAULT_VALUE$7;
            if (((_pendingSetSelf = pendingSetSelf) === null || _pendingSetSelf === void 0 ? void 0 : _pendingSetSelf.effect) !== effect || ((_pendingSetSelf2 = pendingSetSelf) === null || _pendingSetSelf2 === void 0 ? void 0 : _pendingSetSelf2.value) !== newValue) {
              handler(newValue, oldValue, !currentTree.atomValues.has(key));
            } else if (((_pendingSetSelf3 = pendingSetSelf) === null || _pendingSetSelf3 === void 0 ? void 0 : _pendingSetSelf3.effect) === effect) {
              pendingSetSelf = null;
            }
          }
        }, key);
        cleanupEffectsByStore.set(store, [...(_cleanupEffectsByStor2 = cleanupEffectsByStore.get(store)) !== null && _cleanupEffectsByStor2 !== void 0 ? _cleanupEffectsByStor2 : [], release]);
      };
      for (const effect of effects) {
        try {
          const cleanup = effect({
            node,
            storeID: store.storeID,
            parentStoreID_UNSTABLE: store.parentStoreID,
            trigger,
            setSelf: setSelf(effect),
            resetSelf: resetSelf(effect),
            onSet: onSet(effect),
            getPromise,
            getLoadable,
            getInfo_UNSTABLE
          });
          if (cleanup != null) {
            var _cleanupEffectsByStor3;
            cleanupEffectsByStore.set(store, [...(_cleanupEffectsByStor3 = cleanupEffectsByStore.get(store)) !== null && _cleanupEffectsByStor3 !== void 0 ? _cleanupEffectsByStor3 : [], cleanup]);
          }
        } catch (error) {
          initValue = error;
          isInitError = true;
        }
      }
      isDuringInit = false;
      if (!(initValue instanceof DefaultValue$2)) {
        var _store$getState$nextT5;
        const initLoadable = isInitError ? loadableWithError$2(initValue) : Recoil_isPromise(initValue) ? loadableWithPromise$2(wrapPendingPromise(store, initValue)) : loadableWithValue$3(unwrap(initValue));
        maybeFreezeValueOrPromise(initLoadable.contents);
        initState.atomValues.set(key, initLoadable);
        (_store$getState$nextT5 = store.getState().nextTree) === null || _store$getState$nextT5 === void 0 ? void 0 : _store$getState$nextT5.atomValues.set(key, initLoadable);
      }
    }
    return cleanupAtom;
  }
  function peekAtom(_store, state) {
    var _ref, _state$atomValues$get3;
    return (_ref = (_state$atomValues$get3 = state.atomValues.get(key)) !== null && _state$atomValues$get3 !== void 0 ? _state$atomValues$get3 : cachedAnswerForUnvalidatedValue) !== null && _ref !== void 0 ? _ref : defaultLoadable;
  }
  function getAtom(_store, state) {
    if (state.atomValues.has(key)) {
      return Recoil_nullthrows(state.atomValues.get(key));
    } else if (state.nonvalidatedAtoms.has(key)) {
      if (cachedAnswerForUnvalidatedValue != null) {
        return cachedAnswerForUnvalidatedValue;
      }
      if (persistence == null) {
        Recoil_expectationViolation(`Tried to restore a persisted value for atom ${key} but it has no persistence settings.`);
        return defaultLoadable;
      }
      const nonvalidatedValue = state.nonvalidatedAtoms.get(key);
      const validatorResult = persistence.validator(nonvalidatedValue, DEFAULT_VALUE$7);
      const validatedValueLoadable = validatorResult instanceof DefaultValue$2 ? defaultLoadable : loadableWithValue$3(validatorResult);
      cachedAnswerForUnvalidatedValue = validatedValueLoadable;
      return cachedAnswerForUnvalidatedValue;
    } else {
      return defaultLoadable;
    }
  }
  function invalidateAtom() {
    cachedAnswerForUnvalidatedValue = void 0;
  }
  function setAtom(_store, state, newValue) {
    if (state.atomValues.has(key)) {
      const existing = Recoil_nullthrows(state.atomValues.get(key));
      if (existing.state === "hasValue" && newValue === existing.contents) {
        return /* @__PURE__ */ new Map();
      }
    } else if (!state.nonvalidatedAtoms.has(key) && newValue instanceof DefaultValue$2) {
      return /* @__PURE__ */ new Map();
    }
    maybeFreezeValueOrPromise(newValue);
    cachedAnswerForUnvalidatedValue = void 0;
    return (/* @__PURE__ */ new Map()).set(key, loadableWithValue$3(newValue));
  }
  function shouldDeleteConfigOnReleaseAtom() {
    return getConfigDeletionHandler$2(key) !== void 0 && liveStoresCount <= 0;
  }
  const node = registerNode$2({
    key,
    nodeType: "atom",
    peek: peekAtom,
    get: getAtom,
    set: setAtom,
    init: initAtom,
    invalidate: invalidateAtom,
    shouldDeleteConfigOnRelease: shouldDeleteConfigOnReleaseAtom,
    dangerouslyAllowMutability: options.dangerouslyAllowMutability,
    persistence_UNSTABLE: options.persistence_UNSTABLE ? {
      type: options.persistence_UNSTABLE.type,
      backButton: options.persistence_UNSTABLE.backButton
    } : void 0,
    shouldRestoreFromSnapshots: true,
    retainedBy
  });
  return node;
}
function atom(options) {
  if (true) {
    if (typeof options.key !== "string") {
      throw Recoil_err("A key option with a unique string value must be provided when creating an atom.");
    }
  }
  const {
    // @fb-only: scopeRules_APPEND_ONLY_READ_THE_DOCS,
    ...restOptions
  } = options;
  const optionsDefault = "default" in options ? (
    // $FlowIssue[incompatible-type] No way to refine in Flow that property is not defined
    options.default
  ) : new Promise(() => {
  });
  if (isRecoilValue$4(optionsDefault)) {
    return atomWithFallback({
      ...restOptions,
      default: optionsDefault
      // @fb-only: scopeRules_APPEND_ONLY_READ_THE_DOCS,
    });
  } else {
    return baseAtom({
      ...restOptions,
      default: optionsDefault
    });
  }
}
function atomWithFallback(options) {
  const base = atom({
    ...options,
    default: DEFAULT_VALUE$7,
    persistence_UNSTABLE: options.persistence_UNSTABLE === void 0 ? void 0 : {
      ...options.persistence_UNSTABLE,
      validator: (storedValue) => storedValue instanceof DefaultValue$2 ? storedValue : Recoil_nullthrows(options.persistence_UNSTABLE).validator(storedValue, DEFAULT_VALUE$7)
    },
    // TODO Hack for now.
    effects: options.effects,
    // flowlint-line unclear-type: off
    effects_UNSTABLE: options.effects_UNSTABLE
    // flowlint-line unclear-type: off
  });
  const sel = Recoil_selector({
    key: `${options.key}__withFallback`,
    get: ({
      get
    }) => {
      const baseValue = get(base);
      return baseValue instanceof DefaultValue$2 ? options.default : baseValue;
    },
    // $FlowFixMe[incompatible-call]
    set: ({
      set
    }, newValue) => set(base, newValue),
    // This selector does not need to cache as it is a wrapper selector
    // and the selector within the wrapper selector will have a cache
    // option by default
    cachePolicy_UNSTABLE: {
      eviction: "most-recent"
    },
    dangerouslyAllowMutability: options.dangerouslyAllowMutability
  });
  setConfigDeletionHandler$1(sel.key, getConfigDeletionHandler$2(options.key));
  return sel;
}
atom.value = (value) => new WrappedValue$2(value);
var Recoil_atom = atom;
var MapCache = class {
  constructor(options) {
    var _options$mapKey;
    _defineProperty(this, "_map", void 0);
    _defineProperty(this, "_keyMapper", void 0);
    this._map = /* @__PURE__ */ new Map();
    this._keyMapper = (_options$mapKey = options === null || options === void 0 ? void 0 : options.mapKey) !== null && _options$mapKey !== void 0 ? _options$mapKey : (v2) => v2;
  }
  size() {
    return this._map.size;
  }
  has(key) {
    return this._map.has(this._keyMapper(key));
  }
  get(key) {
    return this._map.get(this._keyMapper(key));
  }
  set(key, val) {
    this._map.set(this._keyMapper(key), val);
  }
  delete(key) {
    this._map.delete(this._keyMapper(key));
  }
  clear() {
    this._map.clear();
  }
};
var Recoil_MapCache = {
  MapCache
};
var Recoil_MapCache_1 = Recoil_MapCache.MapCache;
var Recoil_MapCache$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  MapCache: Recoil_MapCache_1
});
var {
  LRUCache: LRUCache$2
} = Recoil_LRUCache$1;
var {
  MapCache: MapCache$1
} = Recoil_MapCache$1;
var defaultPolicy$1 = {
  equality: "reference",
  eviction: "none",
  maxSize: Infinity
};
function cacheFromPolicy({
  equality = defaultPolicy$1.equality,
  eviction = defaultPolicy$1.eviction,
  maxSize = defaultPolicy$1.maxSize
} = defaultPolicy$1) {
  const valueMapper = getValueMapper$1(equality);
  const cache = getCache(eviction, maxSize, valueMapper);
  return cache;
}
function getValueMapper$1(equality) {
  switch (equality) {
    case "reference":
      return (val) => val;
    case "value":
      return (val) => Recoil_stableStringify(val);
  }
  throw Recoil_err(`Unrecognized equality policy ${equality}`);
}
function getCache(eviction, maxSize, mapKey) {
  switch (eviction) {
    case "keep-all":
      return new MapCache$1({
        mapKey
      });
    case "lru":
      return new LRUCache$2({
        mapKey,
        maxSize: Recoil_nullthrows(maxSize)
      });
    case "most-recent":
      return new LRUCache$2({
        mapKey,
        maxSize: 1
      });
  }
  throw Recoil_err(`Unrecognized eviction policy ${eviction}`);
}
var Recoil_cacheFromPolicy = cacheFromPolicy;
var {
  setConfigDeletionHandler: setConfigDeletionHandler$2
} = Recoil_Node;
function atomFamily(options) {
  var _options$cachePolicyF, _options$cachePolicyF2;
  const atomCache = Recoil_cacheFromPolicy({
    equality: (_options$cachePolicyF = (_options$cachePolicyF2 = options.cachePolicyForParams_UNSTABLE) === null || _options$cachePolicyF2 === void 0 ? void 0 : _options$cachePolicyF2.equality) !== null && _options$cachePolicyF !== void 0 ? _options$cachePolicyF : "value",
    eviction: "keep-all"
  });
  return (params) => {
    var _stableStringify, _options$effects;
    const cachedAtom = atomCache.get(params);
    if (cachedAtom != null) {
      return cachedAtom;
    }
    const {
      cachePolicyForParams_UNSTABLE,
      ...atomOptions
    } = options;
    const optionsDefault = "default" in options ? (
      // $FlowIssue[incompatible-type] No way to refine in Flow that property is not defined
      options.default
    ) : new Promise(() => {
    });
    const newAtom = Recoil_atom({
      ...atomOptions,
      key: `${options.key}__${(_stableStringify = Recoil_stableStringify(params)) !== null && _stableStringify !== void 0 ? _stableStringify : "void"}`,
      default: typeof optionsDefault === "function" ? (
        // The default was parameterized
        // Flow doesn't know that T isn't a function, so we need to case to any
        // $FlowIssue[incompatible-use]
        optionsDefault(params)
      ) : (
        // Default may be a static value, promise, or RecoilValue
        optionsDefault
      ),
      retainedBy_UNSTABLE: typeof options.retainedBy_UNSTABLE === "function" ? options.retainedBy_UNSTABLE(params) : options.retainedBy_UNSTABLE,
      effects: typeof options.effects === "function" ? options.effects(params) : typeof options.effects_UNSTABLE === "function" ? options.effects_UNSTABLE(params) : (_options$effects = options.effects) !== null && _options$effects !== void 0 ? _options$effects : options.effects_UNSTABLE
      // prettier-ignore
      // @fb-only: scopeRules_APPEND_ONLY_READ_THE_DOCS: mapScopeRules(
      // @fb-only: options.scopeRules_APPEND_ONLY_READ_THE_DOCS,
      // @fb-only: params,
      // @fb-only: ),
    });
    atomCache.set(params, newAtom);
    setConfigDeletionHandler$2(newAtom.key, () => {
      atomCache.delete(params);
    });
    return newAtom;
  };
}
var Recoil_atomFamily = atomFamily;
var {
  setConfigDeletionHandler: setConfigDeletionHandler$3
} = Recoil_Node;
var nextIndex = 0;
function selectorFamily(options) {
  var _options$cachePolicyF, _options$cachePolicyF2;
  const selectorCache = Recoil_cacheFromPolicy({
    equality: (_options$cachePolicyF = (_options$cachePolicyF2 = options.cachePolicyForParams_UNSTABLE) === null || _options$cachePolicyF2 === void 0 ? void 0 : _options$cachePolicyF2.equality) !== null && _options$cachePolicyF !== void 0 ? _options$cachePolicyF : "value",
    eviction: "keep-all"
  });
  return (params) => {
    var _stableStringify;
    let cachedSelector;
    try {
      cachedSelector = selectorCache.get(params);
    } catch (error) {
      throw Recoil_err(`Problem with cache lookup for selector ${options.key}: ${error.message}`);
    }
    if (cachedSelector != null) {
      return cachedSelector;
    }
    const myKey = `${options.key}__selectorFamily/${(_stableStringify = Recoil_stableStringify(params, {
      // It is possible to use functions in parameters if the user uses
      // a cache with reference equality thanks to the incrementing index.
      allowFunctions: true
    })) !== null && _stableStringify !== void 0 ? _stableStringify : "void"}/${nextIndex++}`;
    const myGet = (callbacks) => options.get(params)(callbacks);
    const myCachePolicy = options.cachePolicy_UNSTABLE;
    const retainedBy = typeof options.retainedBy_UNSTABLE === "function" ? options.retainedBy_UNSTABLE(params) : options.retainedBy_UNSTABLE;
    let newSelector;
    if (options.set != null) {
      const set = options.set;
      const mySet = (callbacks, newValue) => set(params)(callbacks, newValue);
      newSelector = Recoil_selector({
        key: myKey,
        get: myGet,
        set: mySet,
        cachePolicy_UNSTABLE: myCachePolicy,
        dangerouslyAllowMutability: options.dangerouslyAllowMutability,
        retainedBy_UNSTABLE: retainedBy
      });
    } else {
      newSelector = Recoil_selector({
        key: myKey,
        get: myGet,
        cachePolicy_UNSTABLE: myCachePolicy,
        dangerouslyAllowMutability: options.dangerouslyAllowMutability,
        retainedBy_UNSTABLE: retainedBy
      });
    }
    selectorCache.set(params, newSelector);
    setConfigDeletionHandler$3(newSelector.key, () => {
      selectorCache.delete(params);
    });
    return newSelector;
  };
}
var Recoil_selectorFamily = selectorFamily;
var constantSelector = Recoil_selectorFamily({
  key: "__constant",
  get: (constant) => () => constant,
  cachePolicyForParams_UNSTABLE: {
    equality: "reference"
  }
});
function constSelector(constant) {
  return constantSelector(constant);
}
var Recoil_constSelector = constSelector;
var throwingSelector = Recoil_selectorFamily({
  key: "__error",
  get: (message) => () => {
    throw Recoil_err(message);
  },
  // TODO Why?
  cachePolicyForParams_UNSTABLE: {
    equality: "reference"
  }
});
function errorSelector(message) {
  return throwingSelector(message);
}
var Recoil_errorSelector = errorSelector;
function readOnlySelector(atom2) {
  return atom2;
}
var Recoil_readOnlySelector = readOnlySelector;
var {
  loadableWithError: loadableWithError$3,
  loadableWithPromise: loadableWithPromise$3,
  loadableWithValue: loadableWithValue$4
} = Recoil_Loadable$1;
function concurrentRequests(getRecoilValue, deps) {
  const results = Array(deps.length).fill(void 0);
  const exceptions = Array(deps.length).fill(void 0);
  for (const [i2, dep] of deps.entries()) {
    try {
      results[i2] = getRecoilValue(dep);
    } catch (e) {
      exceptions[i2] = e;
    }
  }
  return [results, exceptions];
}
function isError(exp) {
  return exp != null && !Recoil_isPromise(exp);
}
function unwrapDependencies(dependencies) {
  return Array.isArray(dependencies) ? dependencies : Object.getOwnPropertyNames(dependencies).map((key) => dependencies[key]);
}
function wrapResults(dependencies, results) {
  return Array.isArray(dependencies) ? results : (
    // Object.getOwnPropertyNames() has consistent key ordering with ES6
    Object.getOwnPropertyNames(dependencies).reduce((out, key, idx) => ({
      ...out,
      [key]: results[idx]
    }), {})
  );
}
function wrapLoadables(dependencies, results, exceptions) {
  const output = exceptions.map((exception, idx) => exception == null ? loadableWithValue$4(results[idx]) : Recoil_isPromise(exception) ? loadableWithPromise$3(exception) : loadableWithError$3(exception));
  return wrapResults(dependencies, output);
}
function combineAsyncResultsWithSyncResults(syncResults, asyncResults) {
  return asyncResults.map((result, idx) => (
    /**
     * it's important we use === undefined as opposed to == null, because the
     * resolved value of the async promise could be `null`, in which case we
     * don't want to use syncResults[idx], which would be undefined. If async
     * promise resolves to `undefined`, that's ok because `syncResults[idx]`
     * will also be `undefined`. That's a little hacky, but it works.
     */
    result === void 0 ? syncResults[idx] : result
  ));
}
var waitForNone = Recoil_selectorFamily({
  key: "__waitForNone",
  get: (dependencies) => ({
    get
  }) => {
    const deps = unwrapDependencies(dependencies);
    const [results, exceptions] = concurrentRequests(get, deps);
    return wrapLoadables(dependencies, results, exceptions);
  },
  dangerouslyAllowMutability: true
});
var waitForAny = Recoil_selectorFamily({
  key: "__waitForAny",
  get: (dependencies) => ({
    get
  }) => {
    const deps = unwrapDependencies(dependencies);
    const [results, exceptions] = concurrentRequests(get, deps);
    if (exceptions.some((exp) => !Recoil_isPromise(exp))) {
      return wrapLoadables(dependencies, results, exceptions);
    }
    return new Promise((resolve) => {
      for (const [i2, exp] of exceptions.entries()) {
        if (Recoil_isPromise(exp)) {
          exp.then((result) => {
            results[i2] = result;
            exceptions[i2] = void 0;
            resolve(wrapLoadables(dependencies, results, exceptions));
          }).catch((error) => {
            exceptions[i2] = error;
            resolve(wrapLoadables(dependencies, results, exceptions));
          });
        }
      }
    });
  },
  dangerouslyAllowMutability: true
});
var waitForAll = Recoil_selectorFamily({
  key: "__waitForAll",
  get: (dependencies) => ({
    get
  }) => {
    const deps = unwrapDependencies(dependencies);
    const [results, exceptions] = concurrentRequests(get, deps);
    if (exceptions.every((exp) => exp == null)) {
      return wrapResults(dependencies, results);
    }
    const error = exceptions.find(isError);
    if (error != null) {
      throw error;
    }
    return Promise.all(exceptions).then((exceptionResults) => wrapResults(dependencies, combineAsyncResultsWithSyncResults(results, exceptionResults)));
  },
  dangerouslyAllowMutability: true
});
var waitForAllSettled = Recoil_selectorFamily({
  key: "__waitForAllSettled",
  get: (dependencies) => ({
    get
  }) => {
    const deps = unwrapDependencies(dependencies);
    const [results, exceptions] = concurrentRequests(get, deps);
    if (exceptions.every((exp) => !Recoil_isPromise(exp))) {
      return wrapLoadables(dependencies, results, exceptions);
    }
    return Promise.all(exceptions.map((exp, i2) => Recoil_isPromise(exp) ? exp.then((result) => {
      results[i2] = result;
      exceptions[i2] = void 0;
    }).catch((error) => {
      results[i2] = void 0;
      exceptions[i2] = error;
    }) : null)).then(() => wrapLoadables(dependencies, results, exceptions));
  },
  dangerouslyAllowMutability: true
});
var noWait = Recoil_selectorFamily({
  key: "__noWait",
  get: (dependency) => ({
    get
  }) => {
    try {
      return Recoil_selector.value(loadableWithValue$4(get(dependency)));
    } catch (exception) {
      return Recoil_selector.value(Recoil_isPromise(exception) ? loadableWithPromise$3(exception) : loadableWithError$3(exception));
    }
  },
  dangerouslyAllowMutability: true
});
var Recoil_WaitFor = {
  waitForNone,
  waitForAny,
  waitForAll,
  waitForAllSettled,
  noWait
};
var {
  RecoilLoadable
} = Recoil_Loadable$1;
var {
  DefaultValue: DefaultValue$3
} = Recoil_Node;
var {
  RecoilRoot: RecoilRoot$2,
  useRecoilStoreID: useRecoilStoreID$1
} = Recoil_RecoilRoot;
var {
  isRecoilValue: isRecoilValue$5
} = Recoil_RecoilValue$1;
var {
  retentionZone: retentionZone$1
} = Recoil_RetentionZone;
var {
  freshSnapshot: freshSnapshot$2
} = Recoil_Snapshot$1;
var {
  useRecoilState: useRecoilState$1,
  useRecoilState_TRANSITION_SUPPORT_UNSTABLE: useRecoilState_TRANSITION_SUPPORT_UNSTABLE$1,
  useRecoilStateLoadable: useRecoilStateLoadable$1,
  useRecoilValue: useRecoilValue$1,
  useRecoilValue_TRANSITION_SUPPORT_UNSTABLE: useRecoilValue_TRANSITION_SUPPORT_UNSTABLE$1,
  useRecoilValueLoadable: useRecoilValueLoadable$1,
  useRecoilValueLoadable_TRANSITION_SUPPORT_UNSTABLE: useRecoilValueLoadable_TRANSITION_SUPPORT_UNSTABLE$1,
  useResetRecoilState: useResetRecoilState$1,
  useSetRecoilState: useSetRecoilState$1
} = Recoil_Hooks;
var {
  useGotoRecoilSnapshot: useGotoRecoilSnapshot$1,
  useRecoilSnapshot: useRecoilSnapshot$1,
  useRecoilTransactionObserver: useRecoilTransactionObserver$1
} = Recoil_SnapshotHooks;
var {
  useRecoilCallback: useRecoilCallback$1
} = Recoil_useRecoilCallback;
var {
  noWait: noWait$1,
  waitForAll: waitForAll$1,
  waitForAllSettled: waitForAllSettled$1,
  waitForAny: waitForAny$1,
  waitForNone: waitForNone$1
} = Recoil_WaitFor;
var Recoil_index = {
  // Types
  DefaultValue: DefaultValue$3,
  isRecoilValue: isRecoilValue$5,
  RecoilLoadable,
  // Global Recoil environment settiongs
  RecoilEnv: Recoil_RecoilEnv,
  // Recoil Root
  RecoilRoot: RecoilRoot$2,
  useRecoilStoreID: useRecoilStoreID$1,
  useRecoilBridgeAcrossReactRoots_UNSTABLE: Recoil_useRecoilBridgeAcrossReactRoots,
  // Atoms/Selectors
  atom: Recoil_atom,
  selector: Recoil_selector,
  // Convenience Atoms/Selectors
  atomFamily: Recoil_atomFamily,
  selectorFamily: Recoil_selectorFamily,
  constSelector: Recoil_constSelector,
  errorSelector: Recoil_errorSelector,
  readOnlySelector: Recoil_readOnlySelector,
  // Concurrency Helpers for Atoms/Selectors
  noWait: noWait$1,
  waitForNone: waitForNone$1,
  waitForAny: waitForAny$1,
  waitForAll: waitForAll$1,
  waitForAllSettled: waitForAllSettled$1,
  // Hooks for Atoms/Selectors
  useRecoilValue: useRecoilValue$1,
  useRecoilValueLoadable: useRecoilValueLoadable$1,
  useRecoilState: useRecoilState$1,
  useRecoilStateLoadable: useRecoilStateLoadable$1,
  useSetRecoilState: useSetRecoilState$1,
  useResetRecoilState: useResetRecoilState$1,
  useGetRecoilValueInfo_UNSTABLE: Recoil_useGetRecoilValueInfo,
  useRecoilRefresher_UNSTABLE: Recoil_useRecoilRefresher,
  useRecoilValueLoadable_TRANSITION_SUPPORT_UNSTABLE: useRecoilValueLoadable_TRANSITION_SUPPORT_UNSTABLE$1,
  useRecoilValue_TRANSITION_SUPPORT_UNSTABLE: useRecoilValue_TRANSITION_SUPPORT_UNSTABLE$1,
  useRecoilState_TRANSITION_SUPPORT_UNSTABLE: useRecoilState_TRANSITION_SUPPORT_UNSTABLE$1,
  // Hooks for complex operations
  useRecoilCallback: useRecoilCallback$1,
  useRecoilTransaction_UNSTABLE: Recoil_useRecoilTransaction,
  // Snapshots
  useGotoRecoilSnapshot: useGotoRecoilSnapshot$1,
  useRecoilSnapshot: useRecoilSnapshot$1,
  useRecoilTransactionObserver_UNSTABLE: useRecoilTransactionObserver$1,
  snapshot_UNSTABLE: freshSnapshot$2,
  // Memory Management
  useRetain: Recoil_useRetain,
  retentionZone: retentionZone$1
};
var Recoil_index_1 = Recoil_index.DefaultValue;
var Recoil_index_2 = Recoil_index.isRecoilValue;
var Recoil_index_3 = Recoil_index.RecoilLoadable;
var Recoil_index_4 = Recoil_index.RecoilEnv;
var Recoil_index_5 = Recoil_index.RecoilRoot;
var Recoil_index_6 = Recoil_index.useRecoilStoreID;
var Recoil_index_7 = Recoil_index.useRecoilBridgeAcrossReactRoots_UNSTABLE;
var Recoil_index_8 = Recoil_index.atom;
var Recoil_index_9 = Recoil_index.selector;
var Recoil_index_10 = Recoil_index.atomFamily;
var Recoil_index_11 = Recoil_index.selectorFamily;
var Recoil_index_12 = Recoil_index.constSelector;
var Recoil_index_13 = Recoil_index.errorSelector;
var Recoil_index_14 = Recoil_index.readOnlySelector;
var Recoil_index_15 = Recoil_index.noWait;
var Recoil_index_16 = Recoil_index.waitForNone;
var Recoil_index_17 = Recoil_index.waitForAny;
var Recoil_index_18 = Recoil_index.waitForAll;
var Recoil_index_19 = Recoil_index.waitForAllSettled;
var Recoil_index_20 = Recoil_index.useRecoilValue;
var Recoil_index_21 = Recoil_index.useRecoilValueLoadable;
var Recoil_index_22 = Recoil_index.useRecoilState;
var Recoil_index_23 = Recoil_index.useRecoilStateLoadable;
var Recoil_index_24 = Recoil_index.useSetRecoilState;
var Recoil_index_25 = Recoil_index.useResetRecoilState;
var Recoil_index_26 = Recoil_index.useGetRecoilValueInfo_UNSTABLE;
var Recoil_index_27 = Recoil_index.useRecoilRefresher_UNSTABLE;
var Recoil_index_28 = Recoil_index.useRecoilValueLoadable_TRANSITION_SUPPORT_UNSTABLE;
var Recoil_index_29 = Recoil_index.useRecoilValue_TRANSITION_SUPPORT_UNSTABLE;
var Recoil_index_30 = Recoil_index.useRecoilState_TRANSITION_SUPPORT_UNSTABLE;
var Recoil_index_31 = Recoil_index.useRecoilCallback;
var Recoil_index_32 = Recoil_index.useRecoilTransaction_UNSTABLE;
var Recoil_index_33 = Recoil_index.useGotoRecoilSnapshot;
var Recoil_index_34 = Recoil_index.useRecoilSnapshot;
var Recoil_index_35 = Recoil_index.useRecoilTransactionObserver_UNSTABLE;
var Recoil_index_36 = Recoil_index.snapshot_UNSTABLE;
var Recoil_index_37 = Recoil_index.useRetain;
var Recoil_index_38 = Recoil_index.retentionZone;

// node_modules/.pnpm/@txnlab+use-wallet@2.4.0_@blockshake+defly-connect@1.1.6_@daffiwallet+connect@1.0.3_@perawall_k6wwmerrwhyc64uhdtj4a3q3ya/node_modules/@txnlab/use-wallet/dist/esm/index.js
var import_react2 = __toESM(require_react());
var PROVIDER_ID;
(function(PROVIDER_ID2) {
  PROVIDER_ID2["KMD"] = "kmd";
  PROVIDER_ID2["CUSTOM"] = "custom";
  PROVIDER_ID2["PERA"] = "pera";
  PROVIDER_ID2["DAFFI"] = "daffi";
  PROVIDER_ID2["LUTE"] = "lute";
  PROVIDER_ID2["MYALGO"] = "myalgo";
  PROVIDER_ID2["ALGOSIGNER"] = "algosigner";
  PROVIDER_ID2["DEFLY"] = "defly";
  PROVIDER_ID2["EXODUS"] = "exodus";
  PROVIDER_ID2["WALLETCONNECT"] = "walletconnect";
  PROVIDER_ID2["MNEMONIC"] = "mnemonic";
})(PROVIDER_ID || (PROVIDER_ID = {}));
var DEFAULT_NETWORK = "mainnet";
var DEFAULT_NODE_BASEURL = "https://mainnet-api.algonode.cloud";
var DEFAULT_NODE_TOKEN = "";
var DEFAULT_NODE_PORT = "";
var getAlgosdk = async () => {
  return (await import("/build/_shared/esm-R3OSU2ZZ.js")).default;
};
var getAlgodClient = (algosdk, algodClientOptions) => {
  const [tokenOrBaseClient = DEFAULT_NODE_TOKEN, baseServer = DEFAULT_NODE_BASEURL, port = DEFAULT_NODE_PORT, headers] = algodClientOptions || [];
  return new algosdk.Algodv2(tokenOrBaseClient, baseServer, port, headers);
};
var Algod = class {
  algosdk;
  algodClient;
  constructor(algosdk, algodClient) {
    this.algosdk = algosdk;
    this.algodClient = algodClient;
  }
  static async init(algodOptions) {
    const algosdk = await getAlgosdk();
    const algodClient = getAlgodClient(algosdk, algodOptions);
    return new Algod(algosdk, algodClient);
  }
};
var audio = "data:audio/mp3;base64,SUQzBAAAAAIYBlRJVDIAAAAWAAAAMTAgU2Vjb25kcyBvZiBTaWxlbmNlVFBFMQAAABIAAABBbmFyIFNvZnR3YXJlIExMQ1RBTEIAAAAMAAAAQmxhbmsgQXVkaW9BUElDAAIPAgAAAGltYWdlL2pwZWcAAwCJUE5HDQoaCgAAAA1JSERSAAAEOAAABDgIBgAAAOwQbI8AAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAACD0AAAg9AQWVVbYAAAAHdElNRQffCgsFHDEDbwR2AAAgAElEQVR42uzde5RVZd0H8N8wDDcBAS8o6oCJVyxTsDSxojJvgVYq3jVNUQgzaZWmpqh56+ItNa+kr4Cay9Q0DQ1DWb2WeSm8pGRy0RAEgRFhuIzz/tFbC5yZc86eOWfmPDOfz1rvemvvZz9779+zz3DOt2fvXRER9QEAAACQsE5KAAAAAKROwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8ABAAAAJE/AAQAAACRPwAEAAAAkT8BBq9pss81i4sSJMXToUMUAAACgaCoiol4ZaA177rln3HzzzdG/f/+oqamJww8/PGbNmqUwAAAAtJgZHLSKk046Ke67777o379/RET07t07pk6dGtXV1YoDAABAi5nBQcmde+65MW7cuEbXvfjii3HIIYfE2rVrFQoAAIBmq4yIC5WBUqioqIgf/ehHceqppzbZZosttohevXrFk08+qWAAAAA0/zdomMFBCVRWVsZPfvKTGD16dEHtjzrqqJgxY4bCAQAA0CwCDoquU6dOccMNN8SoUaMK3mbOnDkxYsSIWL16tQICAACQmVtUKLoLL7wwjj766Ezb9OnTJz788MP44x//qIAAAABkZgYHRXXyySfHxRdf3Kxt16xZEyNGjIg333xTIQEAAMjEa2Ipmv333z8mTpzY7O27dOnSou0BAADouMzgoCh23333uO+++6J79+4t7utLX/pSvPLKK4oKAABAwczgoMW22mqruOOOO4oSbkREjBs3TlEBAADIxAwOWqRTp05x3333xV577VW0Puvq6uIzn/lMzJ8/X4EBAAAo7PepEtASp59+elHDjYiIysrKOO200xQXAACAgpnBQbPtuuuu8cgjj0RVVVXR+66trY0999wzlixZotAAAADkZQYHzdKtW7e4/vrrSxJu/Kf/r3/96woNAABAQQQcNMv5558f22+/fUn3MWrUKIUGAACgIAIOMvvCF74Q3/jGN0q+nz322COqq6sVHAAAgLwEHGRSVVUVl156adH7Xbp0aaPLzeIAAACgEAIOMjn22GOLPqvimWeeic997nOxaNGiBusOOeQQRQcAACAvAQcF69GjR5x55plF7fOhhx6KI488MhYvXhxTp05tsH7IkCGx3XbbKT4AAAA5CTgo2De/+c3YbLPNitbfM888E+PGjYs1a9ZERMTkyZOjvr7hW4vN4gAAACAfAQcF6dOnT4wdO7Zo/S1dujTGjh0bdXV1/1321ltvxaxZsxq0HTFihAEAAAAgJwEHBfnWt74VvXv3Llp/Z555ZrzzzjsNlj/++OMNln3iE5+Irl27GgQAAACaJOAgr/79+8dJJ51UtP5uu+22RoOMiIhp06Y1WFZVVRWf+MQnDAQAAABNEnCQ19ixY6Nbt25F6evdd9+Nyy+/vMn1s2bNanRmx5577mkgAAAAaJKAg9wXSKdOMWrUqKL199Of/jQ++OCDnG0am90h4AAAACDn71clIJe99tor+vfvX5S+3njjjZgyZUredo0FHMOGDTMYAAAANEnAQU4jR44sWl8/+tGPYt26dXnbPf3007Fq1aoNlm2yySax7bbbGhAAAAAaJeCgSZWVlXHwwQcXpa9nn302HnvssYLarl69Ol588cUGyz/1qU8ZFAAAABol4KBJe++9d2y66aZF6euiiy7K1P6VV15psGyPPfYwKAAAADRKwEGTDjnkkKL088gjj8Rzzz2XaZuXX365wbKBAwcaFAAAABol4KBRnTt3joMOOqjF/axbty4uvfTSzNs1NoNjq622MjAAAAA0SsBBo/bZZ5/o27dvi/v5n//5n3jzzTczb/faa69FfX39BssGDBhgYAAAAGiUgINGFeOBnitWrIirrrqqWduuXr063n///Q2Wde/evSihCwAAAO2PgING7brrri3u46abborFixc3e/ulS5c2WOY2FQAAABoj4KBRQ4YMadH2a9eujV/+8pct6mPZsmUNlrlNBQAAgMYIOGigT58+LQ4SHnrooViyZEmL+mgs4DCDAwAAgMYIOGhg8ODBLe6jpbM3IiI++OCDBssEHAAAADRGwEED/fr1a9H2s2bNiueee67Fx9HYA0UFHAAAADRGwEEDLX1TyaRJk4pyHJtvvnmDZZ7BAQAAQGMEHDTQkhkcy5YtiwceeKAox7HZZps1WNazZ08DBAAAQAMCDhro06dPs7e9++67o7a2tsXH0KVLl+jdu3eD5Z07dzZAAAAANCDgoIHKyspmbVdfXx933nlnUY5hu+22K+qxAQAA0L4JOGhg5cqVzdpu+vTpMWfOnKIcw/7779/ocgEHAAAAjRFw0EBzA45ivBr2Pw488MBGl7tFBQAAgMYIOGjggw8+yLzN3Llz48knnyzK/rfaaqv4+Mc/3ug6AQcAAACNEXDQQHNmcEyePDk+/PDDouz/oIMOanKdW1QAAABojICDBpoTcDz22GNF2XePHj1i7NixTa4XcAAAANAYAQcNZL1FZc6cOfGPf/yjKPseP3589O/fv8n1Ag4AAAAaI+CggawzOKZNm1aU/W699dZx2mmn5WzjGRwAAAA0RsBBA1lncDz++ONF2e95550XXbt2zdmmWM/5AAAAoH0RcNBAlhkcNTU18ac//anF+9xzzz1j1KhRedstWrTIAAEAANCAgIMG3nnnnaivry+o7fTp02PdunUt2l9FRUVMnDixoLb/+te/DBAAAAANCDhoYPXq1bFw4cKC2hbj+RuHHXZYfPKTnyyo7YIFCwwQAAAADQg4aNScOXPytlm3bl1Mnz69Rfvp0aNH/OAHPyi4vYADAACAxgg4aNTcuXPztvnzn/8cNTU1LdrPuHHjcr4W9qMEHAAAADRGwEGjCgk4Xn/99RbtY6uttorTTz890zaewQEAAEBjBBw0qpBbVJYvX96ifVx55ZXRrVu3TNuYwQEAAEBjBBw0at68eXnbtCTgOO6442LEiBGZtxNwAAAA0JjOSkBjCpnBsWzZsmb1PXDgwLjgggsyb7dmzZp47733DA4AANCqKioqmr0sa9tCt1+3bl18+OGHBmc9Ao717LTTTrHjjju2yoVbqu1b+mFaf3ltbW3OW0h233336Ny5c6Z9VVRUxJgxY6JHjx6Zx2fBggVx4oknluRcy2Vcy+EPain2laVdSuea0nWVyjXoXNvn562tx6pcz7UUY9Xevos4V99FfBfxXaRcPgPl6OSTT45HH33UD/n1xzQi6pXh3yZMmBATJkxQCAAAAMraKaecEo888ohCrMcMjiJZvHhxo7ds1Nc3nh9lWZ61j6Zk7bu6ujp69+7dZH8LFiyIxYsXF3yM3bp1ix122KHZSens2bPj/fffb9b5t8U4pDDG5VyTVMcy6z6LcZ4pjHG51NvnNYyxz6ux7EDfF4yxsWwP36E68vf7Aw44IMaNG9fk+k6dPFJTwFEi1113Xdxyyy3t6py+973vxZlnntnk+nvvvTeuuOKKgvqqqqqK3/72t80ON9asWRNf/vKXY/Xq1S42AACg3dtpp51yrk/9FptSEPnQpL/97W851/fp06fgvs4666wYMmRIs4/lL3/5i3ADAADoMPI9QNQMjkZqogQ0ZdasWTnX9+3bt6B+9thjj/jWt77VomP54x//aEAAAIAOQ8CRnYrQpLfffjvna1kLmcHRrVu3uPbaa6OysrJFxzJz5kwDAgAAdBj5ntch4GikJkpALrlmcVRXV+fd/rzzzouPfexjLTqGVatWxQsvvGAwAACADsMMjuxUhJxyPYejuro6unbt2uT64cOHxze+8Y0WH8PMmTNj7dq1BgMAAOgw8s3g8JDRhgQc5JQr4OjUqVOTszM22WSTuOaaa4ryobvzzjsNBAAA0KHkm8HR0scAtEcCDnLK96DR7bffvtEP2o033hhbbrlli/c/Z86cmD59uoEAAAA6FLeoZKci5DRv3rxYvnx5k+sbCzjOOeecGD58eFH2f8cdd+SdmgUAANDeeMhodipCXrlmcXw04Dj44INj7NixRdnvqlWrYurUqQYAAADocMzgyE5FyCvXczjWDzgGDx4cV111VdH2e//990dNTY0BAAAAOpx8AYeHjDbUWQnIJ1fAsd1220VlZWV07949br/99ujZs2fR9jtp0iTFBwAAOiQzOLJTEfLKFXB06dIlqqur46qrrorBgwcXbZ9/+tOf4pVXXlF8AACgQxJwZKci5DV37tyct4pcfvnlcfDBBxd1nzfeeKPCAwAAHZaHjGanIhT0wXrppZeaXL/vvvsWdX9PPfVUTJs2TeEBAIAO/Tss5495AUfDmigBhch1m0oxrVu3Ls4//3wFBwAAOjS3qGSnIhQk16tii+n222+P2bNnKzgAANChCTiyUxEK0hozOBYvXhw/+9nPFBsAAOjwBBzZqQgFefPNN2PFihUl3cell16a82GmAAAAHYWAIzsVoeAP18svv1yy/l988cW45557FBoAACA8ZLQ5VISCvfLKKyX74J533nl5P8AAAAAdRb4ZHBUVFYr0EQIOCjJkyJA47LDDStL3TTfdFM8//7wiAwAA/D+3qGSnIuQ1aNCgmDJlSvTq1avofb/44otx2WWXKTIAAMB6BBzZqQg59e/fP+65557YbLPNit73+++/H6effnqsXbtWoQEAANYj4MhORWjSxhtvHFOnTo1tttmmJP1/73vfi7lz5yo0AABA1h/zAo6GNVECGtO9e/e46667YqeddipJ/1OnTo0HH3xQoQEAABphBkd2KkIDVVVVceutt8bQoUNL0v/rr78e5513nkIDAAA0QcCRnYqwgYqKirjmmmtixIgRJel/9erVcdppp8WqVasUGwAAoAkCjuxUhA1ccsklceihh5as/3PPPTf+/ve/KzQAAEAOAo7sOisBEf+euXHppZfGCSecULJ93HjjjTFlyhTFBgAAyCNfwFFRUaFIHyHgIDp16hQ//elPY/To0SXbxyOPPBKXXHKJYgMAABSgvr4+7+84NiTg6OgXQOfOce2115b0tpTnn38+xo8fn/cDCgAAwL+5RaUZv2+VoOOqqqqKG2+8MQ466KCS7WPevHlx4oknRm1trYIDAABlpbHbPJq69aNYywtt27lz7p/rAo6GBBxFMmzYsFi9enWbfwgKXV5VVRWjR4+OHXbYoWQ1qa2tjYcffjgOP/zwZp9j1vMs5R+jch3LcqxJKc+znGpVLv9QpjrGqX5e29sY+7waS2NsjP0b4zthR/hO2B4JOAQcJTNy5MgYOXKkQqynW7duMXbsWIUAAAAoMgFHQwKOIlm8eHEsW7aswfLGnjvR1LMoWtq2Keu3raioiIEDB0aPHj1KWo958+bF0qVLS16HLLVpzbEo13Mrh/PNcm6pjaVza/3jNZbOrb2dm3/v2te5+Qym9z3FZ9C5ldP3lL59+8a9994r4BBwtL7rrrsubrnllrI+xt69e8eUKVNKHm5ERBx88MGxZMkSFwYAAEAzbLLJJjnXCzgaqYkSdAz9+vWL++67L/bYY49W2V9r7QcAAKA98haV7FSkA+jdu3fce++9seuuu7baPocPH67wAAAAzSTgyE5F2rlu3brFHXfcEbvsskur7lfAAQAA0Hz5ni3Skd4YUygBRzvWuXPnuOmmm+LTn/50q+97p512ik033dQgAAAANIMZHNmpSDtVUVERP/vZz2K//fZrs/2bxQEAANA8Ao7sVKSduvDCC+Owww4r6T5mzpwZNTU1Ta7fd999DQQAAEAzCDiyU5F2aPz48XHKKaeUdB/PPfdcnHjiifHXv/61yTYCDgAAgObJF3BUVlYq0kcIONqZL37xi3H22WeXdB+vvvpqHHvssbFy5cp4/vnnm2y39dZbx6BBgwwKAABARh4ymp2Aox0ZOHBg/PznPy/phT537tw4+uijY/ny5RER8cILL+Rs7zkcAAAA2blFJTsVaSe6desWt956a2y88cYl28eiRYviqKOOioULF/53Wb6Aw20qAAAA2Qk4slORduLyyy+PIUOGlKz/mpqaOOqoo2LOnDkbLH/33XfjrbfeanK7ffbZx9QpAACAjPLdoiLgaKQmSpC+448/Po444oiS9V9bWxvHH398vPrqq42uzzWLo1+/fiUNXgAAANqrXLM4BByN1EQJ0rbHHnvExRdfXLL+161bF6eeemr8+c9/brKN21QAAACKL1fAYaZ8QwKOhHXp0iWuvfbaqKqqKkn/9fX1ceaZZ8YTTzyRs12uN6lEeNAoAABAc3+TNflj3gyOhjVRgnSNHz8+Pvaxj5Ws/x/+8Idx//335203a9asWLduXZPr99prr5KFMAAAAO1VXV1d0z/mBRwNa6IEadp2221j/PjxJev/5z//edx2220FtV21alW89tprTa7v3r17DB061KABAABkkOsWlcrKSgX6CAFHoq644oro0qVLSfr+/e9/H5dffnmmbfLdpuI5HAAAANl4Bkc2nZUgPV/72tdK9lyLN998M8aNG5f3ncsf9fzzz8dxxx3X5Prhw4fHj3/844iI2GSTTWLPPfeMXXbZJfr16xd9+/bd4P/36dMnVq5cGUuWLInFixfH4sWL//uf586dGzNmzIhly5a5EAAAgHbNW1SyEXAkpnfv3nHhhReWpO8PPvggvvGNb0RNTU3mbV988cWc63fbbbf42c9+Fp/61KcKem5Iz549Y/PNN290XV1dXTz77LPx+OOPx7Rp0+KNN95wYQAAAO2Oh4xmI+BIzLnnnhubbrppST44Z5xxRrz++uvN2n727NmxYsWK6NmzZ6Pru3TpEkceeWRRjrWysjL22muv2GuvveL888+PN998Mx577LG4+eabY+HChS4SAACgXTCDIxsVScigQYPimGOOKUnf11xzTTz66KMt+uDlm8VRKttuu22cfvrpMXPmzBg/fnzJnk0CAADQmgQc2ahIQk455ZSSXMRPPPFE/OQnP2n29hUVFXHEEUfE4MGD27Q+G220UZxzzjkxY8aMOPDAA10wAABA0gQc2ahIIjbeeOMYPXp00ft9880341vf+lbmh4r+xy677BIPPvhgXH311bHFFluURa0GDhwYt912W9x7772x8847u3gAAIAkeYtKNgKORBx33HHRo0ePon9YzjjjjGY9VLRXr15x8cUXx+9+97sYNmxYWdZs+PDh8dhjj8URRxzhAgIAAJLjIaPZqEgCqqqq4uSTTy56vzfffHM899xzmbf76le/Gk8//XScfPLJUVlZWfa1u/rqq2PChAkuJAAAICluUclGRRJwyCGHRP/+/Yva5z//+c+48sorM21TWVkZl156aVx//fVNvsK1XE2YMCGuuuqqqKqqckEBAABJyBVwlPv/2NwWBBwJGDNmTNE/JN/5zneitra24G169+4dd911V5x44onJ1nH06NFx1113Ra9evVxUAABA2fMMjmwEHGVu+PDhMWTIkKL2efvtt8ezzz5bcPuBAwfGb37zm/jc5z6XfD333XffeOCBB4o+IwYAAKDY3KKSjYqUua9+9atF7W/OnDlx2WWXFdz+05/+dDzyyCOx/fbbt5ua7rzzzvHLX/4yunXr5gIDAADKloeMZtNZCcpbsWdNfPe7341Vq1YV1PaTn/xkTJ06tV0GAbvttltcddVVcfrpp7vIAICSa2oqeTGWZ52mXoy+2+J8inGe5XTcxTjPFI67PV2zbTGWuZ4hKOAQcJTMgQceGNtss01RPwQbb7xxDBgwoGjHOH/+/Bg1alSMGjUq77H07NkzDjjggHY9y+GQQw6JwYMHx9///vd2/Y9WOf3x949W+/likuoXLWNsjP0w8m9MW/2NACg2AUcjf5cjojspCGQAACAASURBVF4Z/m3ChAleJwoAAEDZW7hwYey+++4KsR4zOIrk1Vdfjblz5zZY3tg9U03dR/XR5cOGDSvawzDnz58fL7zwQt5jiPj3cze22GKLDjN2a9eujccffzyWLVtWlHErZdumlOIYWvt8s9SgXMfHuXXMczOWzs25Ff/flfb8GfT3xbm5Tp1blrZPPPFEbLfddo22N4NDwFEyd999d9xyyy1F66+qqipeeeWVov2AP/zww2PevHl5206cOLFDhRv/qfWuu+4aX/jCF2LlypUuZgAAoCzU1dU1uU7A0UhNlKA8DR06NDbaaKOi9HXXXXcVFG7svffeccopp3TIeldXV8cZZ5zhwgMAAMpGrtfEVlZWKtBHCDjK1Gc/+9mi9LNy5cq4+uqr818InTrFxIkTO3TNTzvttBg0aJCLDwAAKAteE5uNipSpYr0e9t5774133303b7vRo0fHrrvu2qFr3qVLlw4f8gAAAOUj1wwOb3JqSMBRpnbaaaei9DN58uS8bXr27Blnn322okfEfvvtF1/84hcVAgAAaHO5Ag4zOBqpiRKUn169ekX37t1b3M9f//rXePnll/O2+/a3vx2bbbaZwv+/iy66KKqqqhQCAABoUwKObFSkDG2++eZF6WfKlCl522y55ZYd9sGiTdl2223j1FNPVQgAAKBNCTiy8ZrYMtS/f/8W97Fy5cr49a9/nbfdqFGjokuXLm1ynq+++mrceuutUV1dHQMHDozq6uqorq6OTTfdtM3HYMyYMXHzzTfH2rVrXZAAAECbEHBkI+AoQ8W4XeShhx6KFStW5G138MEHF/346+rq4sknn4y+ffvG0KFDm2zXp0+fmDp1aoPlgwYNimOOOSZGjx7dZmHHpptuGgcccED85je/cUECAABtItdbVDxktCGRTxkqxgyOQn6Y9+/fP2cAkdW8efPiyiuvjD333DOOP/74eOyxx3K233LLLaNnz54Nls+ZMyd+9KMfxdChQ+PUU0+Np556KucHu1SOO+44FyMAANBmzODIRkXKUEufwbF27dp45pln8rY76KCDipL6zZo1K4488sjYe++94+qrr4533nknIiJef/31vNvusMMOOc/j4YcfjiOPPDI+85nPxOOPP96q47DPPvvEoEGDXJAAAECbEHBkoyJlqKUBx1/+8pdYtWpV3nYHHnhgi/ZTU1MT5557bhx00EGNzrJ47bXX8vax/fbbF7SvuXPnxoknnhgTJ05stediVFRUxLHHHuuCBAAA2kSugCNCyNGgHkpQflp6i8rTTz+dt02/fv1i7733bvY+fv/738dnP/vZmDRpUtTV1TXaZv78+bFy5cqc/eSawfFR9fX1cdNNN8UhhxwS8+bNa5WxGD16tFfGAgAAbULAkY1qlKGWzuAoJODYb7/9orKysln9X3vttXHCCSfEokWLcrarr6+P2bNn52yTJeD4jxdffDG+/OUvt8oDQDfZZJM44IADXJQAAECry/csQg8a3ZCAo515//3348UXX8zbbtttt83c99q1a2PMmDFx+eWX500S/yPfbSrNCTgi/n17zJgxY+Luu+8ueU332WcfFxYAANDqzODIRjXK0OLFi5u97d///vcmbxlZX9++fTP3feGFF2aeNZHvQaNbb7119OjRo9nne/bZZ8dzzz1X0vHYY489XJQAAECrE3BkoxplaMmSJc3e9o033iioXZ8+fTL1e++998akSZMyH0++GRwVFRUxePDgZp/vmjVr4pvf/GYsXLiwZOOx0047Rffu3V2YAABAqxJwZKMaZaglAcc//vGPgtplmcHxt7/9Lb7//e8363gKeZNKc29T+Y+FCxfGySefHGvWrCnJeHTu3Dl22203FyYAANCqBBzZqEYZasktKsUOOJYsWRInn3xyrF69ulnH8/bbb8cHH3yQs01LA46IiOeff77ZIUwh3KYCAAC0Ng8ZzUbAUYbK6RaVCRMmxNtvv92iD2S+53AUI+CIiLjnnnvi97//fUnGRMABAAC0tnwBR3PfjNleCTjKUHNncHz44Ycxd+7cgtr27t07b5t58+bF448/3uLzKdWbVBpz0003lWRMdt99dxcmAADQqtyiko1qlKH58+c3a7sVK1bEunXrCmq7dOnSvG2mTJmSNzEsRL6Ao7q6Orp27VqU2s2cOTNefvnloo9J1oeyAgAAtJSAIxvVKEMvv/xyQQHERy1btqzgtvPmzcu5ft26dXHPPfcU5XzyBRydOnWK7bbbrmj1K8Usji5durgwAQCAViXgyEY1yvQifvrppzNvt3z58oLb5psl8sQTTxTt1aut8SaV9T344IPxzjvvFHVMKisr3d8GAAC0Kg8ZzUbAUaZmzJiReZssAUe+Z3X89re/Ldq5LFiwIN5///2cbYoZcKxduzZuu+22oo+JWRwAAEBrMoMjG9UoU80JOIp5i8qCBQuKej6t9SaV/5g8eXJRnh+yPgEHAADQmgQc2ahGmfrXv/4Vs2fPzrRNXV1dwW3z3aJS7Fs85syZk3N9MZ/BEfHvsKclr7dtTLEehAoAAFAIAUc2qlHGss7i6NevX8FtZ8+enfONK4sWLSrqueS7JWabbbYpev0KefZHpg+LPx4AAEArEnBk/M2mBOXrySefzNQ+S8BRU1MTzzzzTKPrVq1alfeZGVnluyWmR48esckmmxR1n8UMONatWxeLFy92UQIAAK3GQ0azEXCUsaeeeirTbRZZAo6IiGnTprXahyTfDI6I4s/iyPfcjyzeeuutnDNeAAAAii3fDA5vetyQgKOM1dXVxR133FFw+6wzIJoKOLp16xabbbZZUc+lkICjurq6qPss5gyOfM8QAQAAKDa3qGTTWQnK25QpU+K73/1uQW/w6NKlS2y00UbxwQcfFNT3vHnz4tVXX42dd965wbptttkm3n333aKdx8KFC2PNmjU5z2Prrbcuau1mz54d9fX1RZmR8uabb7oYAYAWaew7SVPfU4q1vFR9l/K4i3GOKZ9Pa49lW12brtnC2vfp00fAIeBofQceeGCjt1gU4wMzb968GDx4cEHHcfXVVzf5rIjG+m7qtouzzz670VkLLTmf2tranAHHkUceGdtvv31RvySsXLkyNtpooxaP79ChQ+P6669P8o95Of2R78hfQFI+n478BcQY+5Lph1HH+jem1NcVQLH5O/SRekREvTL824QJE2LChAkKAQAAQNnbb7/94uWXX1aI/2cGR5G89NJL8cYbbzRY3thTb5t6Em6utiNGjCjoIaJLliyJ6dOnZzqGvfbaKwYOHLjB+qVLl/73GR3NOd7Glu+5556xww47NHnsNTU18dBDDxWtZhERhx12WPTs2bPF43vPPffEihUrilKH1mrblHI93izbZ6lBSufr3NI9t/b6Gcxybq5T5+bc0vn7Yiydm3Nr23PLsv1ll10WJ5xwQpPH4hYVAUdJ/OpXv4pbbrmlZP1/9atfbfIWifX17ds3Lrjggli2bFnBfe+4444xffr0DaY39e3bN3784x/Hv/71r6Kdw5gxY+KCCy5ocn3Xrl3j+9//fqY/LvmMHDmyxQHH66+/Ht/5zndc5AAAQKvykNFsVCMRDz74YLz66qv5B7RTp/jsZz+bqe/XXnstHnvssQbL999//6KeQ743qXTt2jU233zzou6zR48eLe5jxowZLkAAAKDV5fsffwUcH6mHEqThww8/jIsvvrigtiNGjMjc/9VXX91g2UknnVTU9yoX8qrYYr5JZcCAAdG9e/cW9yPgAAAA2kJdXV3uH/QCjg3roQTp+MMf/hBPPfVU3nb77bdf5h/2s2bNismTJ2+wbLvttotDDz20aMc/f/78vG2qq6uLtr/dd9+9xX2sWbMm/vd//9fFBwAAtDq3qGSjGom56KKL8l7k/fr1i+OPP75Zfb/99tsbLPv+979f0MNNC7FixYpYsmRJzjblFnD8+c9/jlWrVrnwAACAVifgyEY1EvPKK6/Efffdl7fd6aefHt26dcvU9/vvvx/f/e53N1i29dZbxxlnnFG04583b17O9dtss03R9lWMgOP+++930QEAAG3CMziyUY0EXXHFFVFbW5uzzeabbx7HHnts5r5nzJgRt99++wbLli5dWrRjzxdwFGsGR/fu3WO33XZrUR+LFy8WcAAAAG3GMziyUY0ELViwIK677rq87caNGxddu3bN3P8Pf/jDuOeee/773996662iHXu+B40W6yGjX/nKV1r8BpU77rgj1qxZ44IDAADaRL5bVCoqKhRpPQKORF133XXxt7/9LWeb/v37xzHHHNOsD9GECRNi0qRJsWbNmgbP5WiJfAHHVlttVZQU8sgjj2zR9mvWrIk777zThQYAALQZz+DIRjUStW7duvj2t7+dd4bB+PHjY+ONN27WB+ncc8+NIUOGxAsvvFC04853i0pVVVVsscUWLdrHoEGDYq+99mpRH7/+9a/j3XffdaEBAABtRsCRjWok7LXXXosrr7wyZ5v+/fvH1Vdf3ex9fPDBB7F69eqiHXO+GRwRLX8Ox+jRo1s0VWvt2rVxww03uMAAAIA2JeDIRjUS94tf/CL+8pe/5Gyz//77x6mnnloWx7tgwYJYu3ZtzjYteZNKr169mnVbzvp+/vOfx+zZs11cAABAmxJwZKMa7eCCP+OMM2LVqlU525177rlFeW1qS9XV1eV9pkdLZnBMmDAhNt1002ZvP3v27BbNeAEAACjm772cP+gFHBvWQwnSN2fOnDj//PNztqmqqopf/OIX0bt37zY/3nzP4Wjum1R23HHHOOmkk1r0x+Oss87KO8MEAACgNXhNbDaq0U5MmTIlJk+enLPNNttsUxazE/I9h2PAgAHN6vfiiy+Ozp07N/u4Jk2aFM8995yLCQAAKAv19fW5f9ALODashxK0Hz/4wQ/i+eefz9nmgAMOiEsuuaRNPwj5Ao7m3GIycuTIGD58eLOP6aWXXorLLrvMRQQAAJQNt6hkoxrtyNq1a+Ob3/xm3tebnnTSSXHjjTdGly5d2uQ4892istlmm2Xqb8cdd8z7Nplc5syZE8ccc0ysXLnSRQQAAJQNt6hkoxrtzDvvvBNjxoyJdevW5Ww3cuTImDp1aps8kyPfDI5+/foV/EHdaqutYurUqbHxxhs361gWLlwYRx55ZN5QCAAAoLXlm8FRUVGhSOsRcLRDzzzzTJxzzjl579fae++949e//nVsscUWrXp8+QKOTp06Rb9+/fL207dv35g6dWqzj7+mpiaOPvrovDNKAAAA2oJncGSjGu3U5MmT49xzz83bbuedd46HH344dthhh1Y7tpqamli+fHnONvluU+nevXvceeedMXjw4GYdw4oVK+KEE06IV1991cUCAACUJc/gyEY12rFf/vKXBYUcAwYMiN/85jcxZsyYqKqqapVja8mDRgcMGBBTpkyJoUOHNmvfc+bMia985Svxpz/9yUUCAACULc/gyEY12rlJkyYVFHL06tUrLrjggpgxY0bsv//+JT+ufAFHUzM4Dj300Jg+fXp8+tOfbtZ+Z8yYEQceeGC8/vrrLg4AAKCsmcGRjWp0AJMmTYrzzjuvoLaDBg2KSZMmxa9+9avYZZddSnZM8+fPz7n+ozM4evfuHTfccEPccMMNzX4w6k033RTHHnts3ttjAAAAyoGAIxvV6CBuv/32OP/88wtuv88++8S0adPiJz/5SebXthYiywyOz3/+8/Hkk0/GoYce2qx91dTUxPjx42PixIl5p3gBAACUCwFHNp2VoOO47bbboqKiIi666KKC2nfq1CmOPvro+PrXvx5PPfVU/O53v4snnngiFi1a1OJjyRdwDB48OE477bQ46qijYvvtt2/2fh544IG48MILi3LMAAAArUnAkY2Ao4O59dZb4/3334+LLrooevXqVdA2Xbt2jf322y/222+/qK+vj+effz6mTZsW06ZNi9dee61Zx/Huu+/mXL///vu36Fkg//znP+Pss8+OmTNnGnQAACBJAo5sBBwd0D333BNPPfVUXHHFFfGlL30p07YVFRUxdOjQGDp0aJxzzjkxZ86cePzxx+Oll16KOXPmxNy5c/POlqisrIyuXbuW5NxWr14d1157bVx//fWxZs0agw0AACRLwJGNgKODWrBgQRx//PHxta99Lb73ve9FdXV1s/oZNGhQnHLKKRssW7lyZSxYsCBWrVoVq1evjtra2qitrY2qqqqorq6Orbbaquivo62trY2pU6fGjTfeGG+99ZYBBgAAkpcv4KioqFCk9Qg4Orj7778/HnzwwRg5cmSMGzcuhgwZ0uI+e/ToEdttt12rHH9NTU1MmjQpbr311liyZIkBBQAA2g0zOLIRcBB1dXXxwAMPxAMPPBCf//zn49RTT43hw4dH587le3ksXLgwbrnllrjzzjtjxYoVBhEAAGh3BBzZCDjYwB/+8If4wx/+EP369YsDDzwwRo4cGZ/5zGfKIuxYsWJFTJ8+PR599NF49NFHPWMDAABo1+rq6nKuF3BsSMBBo957772YPHlyTJ48+b9hx7777hvDhg2LAQMGtNpxLFq0KH73u9/FY489FjNnzoy1a9caHAAAoEMwgyMbAQd5rR92RERsscUWMWzYsBg6dGgMGzYshgwZEt26dSv6fi+++OL4xS9+EfX19QYBAADocPL9FhJwbEjAQWbvvPNOPPzww/Hwww//d1m/fv1iyy23jAEDBsSWW2753//cs2fPqKura/T/dtxxxxg2bFiT+6mtrRVuAAAAJdPUW0iKsTzrG04aa58vwBBw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AAAAwJ7gAAAAAPYEBwAAALAnOAAAAIA9wQEAAADsCQ4AAABgT3AAAAAAe4IDAAAA2BMcAAAAwJ7gAAAAAPYEBwAAALAnOAAAAIA9wQEAAADsCQ4AAABgT3AAAAAAe4IDAAAA2BMcAAAAwJ7gAAAAAPYEBwAAALAnOAAAAIA9wQEAAADsCQ4AAABgT3AAAAAAe4IDAAAA2BMcAAAAwJ7gAAAAAPYEBwAAALAnOAAAAIA9wQEAAADsCQ4AAABgT3AAAAAAe4IDAAAA2BMcAAAAwJ7gAAAAAPYEBwAAALAnOAAAAIA9wQEAAADsCQ4AAABgT3AAAAAAe4IDAAAA2BMcAAAAwJ7gAAAAAPYEBwAAALAnOAAAAIA9wQEAAADsCQ4AAABgT3AAAAAAe4IDAAAA2BMcAAAAwJ7gAAAAAPYEBwAAALAnOAAAAIA9wQEAAADsCQ4AAABgT3AAAAAAe4IDAAAA2BMcAAAAwJ7gAAAAAPYEBwAAALAnOAAAAIA9wQEAAADsCQ4AAABgT3AAAAAAe4IDAAAA2BMcAAAAwJ7gAAAAAPYEBwAAALAnOAAAAIA9wQEAAADsCQ4AAABgT3AAAAAAe4IDAAAA2BMcAAAAwJ7gAAAAAPYEBwAAALAnOAAAAIA9wQEAAADsCQ4AAABgT3AAAAAAe4IDAAAA2BMcAAAAwJ7gAAAAAPYEBwAAALAnOAAAAIA9wQEAAADsCQ4AAABgT3AAAAAAe4IDAAAA2BMcAAAAwJ7gAAAAAPYEBwAAALAnOAAAAIA9wQEAAADsCQ4AAABgT3AAAAAAe4IDAAAA2BMcAAAAwJ7gAAAAAPYEBwAAALAnOAAAAIA9wQEAAADsCQ4AAABgT3AAAAAAe4IDAAAA2BMcAAAAwJ7gAAAAAPYEBwAAALAnOAAAAIA9wQEAAADsCQ4AAABgT3AAAAAAe4IDAAAA2BMcAAAAwJ7gAAAAAPYEBwAAALAnOAAAAIA9wQEAAADsCQ4AAABgT3AAAAAAe4IDAAAA2BMcAAAAwJ7gAAAAAPYEBwAAALAnOAAAAIA9wQEAAADsCQ4AAABgT3AAAAAAe4IDAAAA2BMcAAAAwJ7gAAAAAPYEBwAAALAnOAAAAIA9wQEAAADsCQ4AAABgT3AAAAAAe4IDAAAA2BMcAAAAwJ7gAAAAAPYEBwAAALAnOAAAAIA9wQEAAADsCQ4A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/+MYxPkNE2IkGABNSVOQ7HM+7DuUt3Q7mjpUFmcjr1unl8NuVbD7m6plQSJtQIuLMFbkdTOVo4XNGpkZmZshRj5KVGyRR6oW/+MYxP8P82okOACTLDX0hZ/NMwIyV2MZOyleP56///LM+7JePftrs1g+k+jJlnog5CvNvjmcS3cDTZkDKhtl8r35yOV+jgtR/+MYxPoOQ2YYEABTSKmIjcsiPb5ZfXf7UH8zFxqUaDwmSPCizYFGwQGwyZIIX0pOLKIpjETlo1U/56E0qoAczJRAWM5G8HJA/+MYxPwK8148GABNSUZyKUXZ6Ik9o/PNrPO4Xd3k45s5ZbFOhlkKfJ2SMjFyc9KZLMjQ60Ps1iyQiQycScX711gnjk89MiiI/+MYxP8TC2oIAACTEM0f+Z/SNfy///f9lc5XLIHLMz46Yck2h2K0dtqT0bECVySOS9qTEGr9rfbPd2TQq7VMzuRDg3vYJJEn/+MYxO0ME2YcEABNSJ2RxzMIKcrhC0U0F3kImjyb03for+r/zq1OmMvJ/7vbWJlSA5zVyGFyjBs22U4ODIPh4hDbrVUbv/ln/+MYxPcNW2YcEABNSGWrMglL8cicpXM60b///+8h4bKpxqdMwhMvkpTs/hZPkDJUtJu2TccDTSJKRRGOl+v/1//9Omu/2pdE/+MYxPwPu2oQCABTLHWi9r07yp99tVRSsxysZJwFXKcDYBwxzjoPraIHIgUpiCmopmXHJwp268/L++7oMjOERqsPR/WT59fe/+MYxPgMU1ooGABTSLv/8+5at2WSQuEzX00HAFGyipKM5p5VFojkAmjknWmIKaimZccnBdUObf4ovk//MMX///X/yt/uOXlx/+MYxP8SW2IIAACTEKktqFqTxCJSJF/JNmSImOhln2AosFn0lTEFNRTMuOTguMlVVVVVVVVMQU1FMy45OC4yVVVVVVVVVVVV/+MYxPAMw2IgEABTSVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVMQU1FMy45OC4yVVVVVVVVVVVV/+MYxPgK215IGACNTFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxP8MW2I4GABNSFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxP8Ks1oUGABTZVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxP8AAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVEFHMTAgU2Vjb25kcyBvZiBTaWxlbmNlAAAAAAAAAAAAQW5hciBTb2Z0d2FyZSBMTEMAAAAAAAAAAAAAAAAAQmxhbmsgQXVkaW8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8=";
var getIsIOS = () => {
  if (typeof window !== "undefined") {
    return /iPad|iPhone|iPod/.test(navigator?.userAgent) && !window?.MSStream;
  } else {
    return false;
  }
};
var isIOS = getIsIOS();
var BaseClient = class {
  algosdk;
  algodClient;
  clientOptions;
  keepWCAlive;
  metadata;
  constructor(metadata, algosdk, algodClient, clientOptions) {
    this.algosdk = algosdk;
    this.algodClient = algodClient;
    this.clientOptions = clientOptions;
    this.keepWCAlive = new Audio();
    this.metadata = metadata;
  }
  async healthCheck() {
    return await this.algodClient.healthCheck().do();
  }
  async getAccountInfo(address) {
    const accountInfo = await this.algodClient.accountInformation(address).do();
    if (!accountInfo) {
      throw new Error("Unable to get account information");
    }
    return accountInfo;
  }
  async getAssets(address) {
    const accountInfo = await this.algodClient.accountInformation(address).do();
    if (!accountInfo || accountInfo.assets === void 0) {
      throw new Error("Unable to get account assets");
    }
    return accountInfo.assets;
  }
  async waitForConfirmation(txId, timeout = 4) {
    const confirmation = await this.algosdk.waitForConfirmation(this.algodClient, txId, timeout);
    return { txId, ...confirmation };
  }
  decodeTransaction = (txn, isSigned) => {
    return isSigned ? this.algosdk.decodeSignedTransaction(new Uint8Array(Buffer.from(txn, "base64"))).txn : this.algosdk.decodeUnsignedTransaction(new Uint8Array(Buffer.from(txn, "base64")));
  };
  logEncodedTransaction(txn, isSigned) {
    const txnObj = this.decodeTransaction(txn, isSigned);
    console.log("TRANSACTION", {
      isSigned,
      from: txnObj.from && this.algosdk.encodeAddress(txnObj.from.publicKey),
      to: txnObj.to && this.algosdk.encodeAddress(txnObj.to.publicKey),
      type: txnObj.type,
      txn: txnObj
    });
  }
  groupTransactionsBySender(transactions) {
    function groupBySender(objectArray) {
      return objectArray.reduce(function(acc, obj) {
        const sender = obj.from;
        if (!acc[sender]) {
          acc[sender] = [];
        }
        acc[sender].push(obj);
        return acc;
      }, {});
    }
    const decodedGroup = transactions.reduce((acc, [type, txn], index) => {
      if (type === "u") {
        const decodedTxn = this.decodeTransaction(txn, false);
        const from = decodedTxn.from ? this.algosdk.encodeAddress(decodedTxn.from.publicKey) : "";
        const to = decodedTxn.to ? this.algosdk.encodeAddress(decodedTxn.to.publicKey) : "";
        const type2 = decodedTxn.type || "";
        const amount = Number(decodedTxn.amount) || 0;
        const txnObj = {
          groupIndex: index,
          amount,
          from,
          to,
          type: type2,
          txn
        };
        acc.push(txnObj);
      }
      return acc;
    }, []);
    return groupBySender(decodedGroup);
  }
  async sendRawTransactions(transactions, waitRoundsToConfirm) {
    const sentTransaction = await this.algodClient.sendRawTransaction(transactions).do();
    if (!sentTransaction) {
      throw new Error("Transaction failed.");
    }
    const decodedTxn = this.algosdk.decodeSignedTransaction(transactions[0]);
    const waitRounds = waitRoundsToConfirm || decodedTxn.txn.lastRound - decodedTxn.txn.firstRound;
    const confirmedTransaction = await this.waitForConfirmation(sentTransaction.txId, waitRounds);
    return {
      id: sentTransaction.txId,
      ...confirmedTransaction
    };
  }
  async keepWCAliveStart() {
    if (!isIOS) {
      return;
    }
    this.keepWCAlive.src = audio;
    this.keepWCAlive.autoplay = true;
    this.keepWCAlive.volume = 0;
    this.keepWCAlive.loop = true;
    await this.keepWCAlive.play();
  }
  keepWCAliveStop() {
    if (!isIOS) {
      return;
    }
    this.keepWCAlive.pause();
  }
};
__publicField(BaseClient, "metadata");
function n(n2) {
  for (var r2 = arguments.length, t2 = Array(r2 > 1 ? r2 - 1 : 0), e = 1; e < r2; e++)
    t2[e - 1] = arguments[e];
  if (true) {
    var i2 = Y[n2], o2 = i2 ? "function" == typeof i2 ? i2.apply(null, t2) : i2 : "unknown error nr: " + n2;
    throw Error("[Immer] " + o2);
  }
  throw Error("[Immer] minified error nr: " + n2 + (t2.length ? " " + t2.map(function(n3) {
    return "'" + n3 + "'";
  }).join(",") : "") + ". Find the full error at: https://bit.ly/3cXEKWf");
}
function r(n2) {
  return !!n2 && !!n2[Q];
}
function t(n2) {
  var r2;
  return !!n2 && (function(n3) {
    if (!n3 || "object" != typeof n3)
      return false;
    var r3 = Object.getPrototypeOf(n3);
    if (null === r3)
      return true;
    var t2 = Object.hasOwnProperty.call(r3, "constructor") && r3.constructor;
    return t2 === Object || "function" == typeof t2 && Function.toString.call(t2) === Z;
  }(n2) || Array.isArray(n2) || !!n2[L] || !!(null === (r2 = n2.constructor) || void 0 === r2 ? void 0 : r2[L]) || s(n2) || v(n2));
}
function i(n2, r2, t2) {
  void 0 === t2 && (t2 = false), 0 === o(n2) ? (t2 ? Object.keys : nn)(n2).forEach(function(e) {
    t2 && "symbol" == typeof e || r2(e, n2[e], n2);
  }) : n2.forEach(function(t3, e) {
    return r2(e, t3, n2);
  });
}
function o(n2) {
  var r2 = n2[Q];
  return r2 ? r2.i > 3 ? r2.i - 4 : r2.i : Array.isArray(n2) ? 1 : s(n2) ? 2 : v(n2) ? 3 : 0;
}
function u(n2, r2) {
  return 2 === o(n2) ? n2.has(r2) : Object.prototype.hasOwnProperty.call(n2, r2);
}
function a(n2, r2) {
  return 2 === o(n2) ? n2.get(r2) : n2[r2];
}
function f(n2, r2, t2) {
  var e = o(n2);
  2 === e ? n2.set(r2, t2) : 3 === e ? n2.add(t2) : n2[r2] = t2;
}
function c(n2, r2) {
  return n2 === r2 ? 0 !== n2 || 1 / n2 == 1 / r2 : n2 != n2 && r2 != r2;
}
function s(n2) {
  return X && n2 instanceof Map;
}
function v(n2) {
  return q && n2 instanceof Set;
}
function p(n2) {
  return n2.o || n2.t;
}
function l(n2) {
  if (Array.isArray(n2))
    return Array.prototype.slice.call(n2);
  var r2 = rn(n2);
  delete r2[Q];
  for (var t2 = nn(r2), e = 0; e < t2.length; e++) {
    var i2 = t2[e], o2 = r2[i2];
    false === o2.writable && (o2.writable = true, o2.configurable = true), (o2.get || o2.set) && (r2[i2] = { configurable: true, writable: true, enumerable: o2.enumerable, value: n2[i2] });
  }
  return Object.create(Object.getPrototypeOf(n2), r2);
}
function d(n2, e) {
  return void 0 === e && (e = false), y(n2) || r(n2) || !t(n2) || (o(n2) > 1 && (n2.set = n2.add = n2.clear = n2.delete = h), Object.freeze(n2), e && i(n2, function(n3, r2) {
    return d(r2, true);
  }, true)), n2;
}
function h() {
  n(2);
}
function y(n2) {
  return null == n2 || "object" != typeof n2 || Object.isFrozen(n2);
}
function b(r2) {
  var t2 = tn[r2];
  return t2 || n(18, r2), t2;
}
function _() {
  return U || n(0), U;
}
function j(n2, r2) {
  r2 && (b("Patches"), n2.u = [], n2.s = [], n2.v = r2);
}
function g(n2) {
  O(n2), n2.p.forEach(S), n2.p = null;
}
function O(n2) {
  n2 === U && (U = n2.l);
}
function w(n2) {
  return U = { p: [], l: U, h: n2, m: true, _: 0 };
}
function S(n2) {
  var r2 = n2[Q];
  0 === r2.i || 1 === r2.i ? r2.j() : r2.g = true;
}
function P(r2, e) {
  e._ = e.p.length;
  var i2 = e.p[0], o2 = void 0 !== r2 && r2 !== i2;
  return e.h.O || b("ES5").S(e, r2, o2), o2 ? (i2[Q].P && (g(e), n(4)), t(r2) && (r2 = M(e, r2), e.l || x(e, r2)), e.u && b("Patches").M(i2[Q].t, r2, e.u, e.s)) : r2 = M(e, i2, []), g(e), e.u && e.v(e.u, e.s), r2 !== H ? r2 : void 0;
}
function M(n2, r2, t2) {
  if (y(r2))
    return r2;
  var e = r2[Q];
  if (!e)
    return i(r2, function(i2, o3) {
      return A(n2, e, r2, i2, o3, t2);
    }, true), r2;
  if (e.A !== n2)
    return r2;
  if (!e.P)
    return x(n2, e.t, true), e.t;
  if (!e.I) {
    e.I = true, e.A._--;
    var o2 = 4 === e.i || 5 === e.i ? e.o = l(e.k) : e.o, u2 = o2, a2 = false;
    3 === e.i && (u2 = new Set(o2), o2.clear(), a2 = true), i(u2, function(r3, i2) {
      return A(n2, e, o2, r3, i2, t2, a2);
    }), x(n2, o2, false), t2 && n2.u && b("Patches").N(e, t2, n2.u, n2.s);
  }
  return e.o;
}
function A(e, i2, o2, a2, c2, s2, v2) {
  if (c2 === o2 && n(5), r(c2)) {
    var p2 = M(e, c2, s2 && i2 && 3 !== i2.i && !u(i2.R, a2) ? s2.concat(a2) : void 0);
    if (f(o2, a2, p2), !r(p2))
      return;
    e.m = false;
  } else
    v2 && o2.add(c2);
  if (t(c2) && !y(c2)) {
    if (!e.h.D && e._ < 1)
      return;
    M(e, c2), i2 && i2.A.l || x(e, c2);
  }
}
function x(n2, r2, t2) {
  void 0 === t2 && (t2 = false), !n2.l && n2.h.D && n2.m && d(r2, t2);
}
function z(n2, r2) {
  var t2 = n2[Q];
  return (t2 ? p(t2) : n2)[r2];
}
function I(n2, r2) {
  if (r2 in n2)
    for (var t2 = Object.getPrototypeOf(n2); t2; ) {
      var e = Object.getOwnPropertyDescriptor(t2, r2);
      if (e)
        return e;
      t2 = Object.getPrototypeOf(t2);
    }
}
function k(n2) {
  n2.P || (n2.P = true, n2.l && k(n2.l));
}
function E(n2) {
  n2.o || (n2.o = l(n2.t));
}
function N(n2, r2, t2) {
  var e = s(r2) ? b("MapSet").F(r2, t2) : v(r2) ? b("MapSet").T(r2, t2) : n2.O ? function(n3, r3) {
    var t3 = Array.isArray(n3), e2 = { i: t3 ? 1 : 0, A: r3 ? r3.A : _(), P: false, I: false, R: {}, l: r3, t: n3, k: null, o: null, j: null, C: false }, i2 = e2, o2 = en;
    t3 && (i2 = [e2], o2 = on);
    var u2 = Proxy.revocable(i2, o2), a2 = u2.revoke, f2 = u2.proxy;
    return e2.k = f2, e2.j = a2, f2;
  }(r2, t2) : b("ES5").J(r2, t2);
  return (t2 ? t2.A : _()).p.push(e), e;
}
function R(e) {
  return r(e) || n(22, e), function n2(r2) {
    if (!t(r2))
      return r2;
    var e2, u2 = r2[Q], c2 = o(r2);
    if (u2) {
      if (!u2.P && (u2.i < 4 || !b("ES5").K(u2)))
        return u2.t;
      u2.I = true, e2 = D(r2, c2), u2.I = false;
    } else
      e2 = D(r2, c2);
    return i(e2, function(r3, t2) {
      u2 && a(u2.t, r3) === t2 || f(e2, r3, n2(t2));
    }), 3 === c2 ? new Set(e2) : e2;
  }(e);
}
function D(n2, r2) {
  switch (r2) {
    case 2:
      return new Map(n2);
    case 3:
      return Array.from(n2);
  }
  return l(n2);
}
var G;
var U;
var W = "undefined" != typeof Symbol && "symbol" == typeof Symbol("x");
var X = "undefined" != typeof Map;
var q = "undefined" != typeof Set;
var B = "undefined" != typeof Proxy && void 0 !== Proxy.revocable && "undefined" != typeof Reflect;
var H = W ? Symbol.for("immer-nothing") : ((G = {})["immer-nothing"] = true, G);
var L = W ? Symbol.for("immer-draftable") : "__$immer_draftable";
var Q = W ? Symbol.for("immer-state") : "__$immer_state";
var Y = { 0: "Illegal state", 1: "Immer drafts cannot have computed properties", 2: "This object has been frozen and should not be mutated", 3: function(n2) {
  return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + n2;
}, 4: "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.", 5: "Immer forbids circular references", 6: "The first or second argument to `produce` must be a function", 7: "The third argument to `produce` must be a function or undefined", 8: "First argument to `createDraft` must be a plain object, an array, or an immerable object", 9: "First argument to `finishDraft` must be a draft returned by `createDraft`", 10: "The given draft is already finalized", 11: "Object.defineProperty() cannot be used on an Immer draft", 12: "Object.setPrototypeOf() cannot be used on an Immer draft", 13: "Immer only supports deleting array indices", 14: "Immer only supports setting array indices and the 'length' property", 15: function(n2) {
  return "Cannot apply patch, path doesn't resolve: " + n2;
}, 16: 'Sets cannot have "replace" patches.', 17: function(n2) {
  return "Unsupported patch operation: " + n2;
}, 18: function(n2) {
  return "The plugin for '" + n2 + "' has not been loaded into Immer. To enable the plugin, import and call `enable" + n2 + "()` when initializing your application.";
}, 20: "Cannot use proxies if Proxy, Proxy.revocable or Reflect are not available", 21: function(n2) {
  return "produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '" + n2 + "'";
}, 22: function(n2) {
  return "'current' expects a draft, got: " + n2;
}, 23: function(n2) {
  return "'original' expects a draft, got: " + n2;
}, 24: "Patching reserved attributes like __proto__, prototype and constructor is not allowed" };
var Z = "" + Object.prototype.constructor;
var nn = "undefined" != typeof Reflect && Reflect.ownKeys ? Reflect.ownKeys : void 0 !== Object.getOwnPropertySymbols ? function(n2) {
  return Object.getOwnPropertyNames(n2).concat(Object.getOwnPropertySymbols(n2));
} : Object.getOwnPropertyNames;
var rn = Object.getOwnPropertyDescriptors || function(n2) {
  var r2 = {};
  return nn(n2).forEach(function(t2) {
    r2[t2] = Object.getOwnPropertyDescriptor(n2, t2);
  }), r2;
};
var tn = {};
var en = { get: function(n2, r2) {
  if (r2 === Q)
    return n2;
  var e = p(n2);
  if (!u(e, r2))
    return function(n3, r3, t2) {
      var e2, i3 = I(r3, t2);
      return i3 ? "value" in i3 ? i3.value : null === (e2 = i3.get) || void 0 === e2 ? void 0 : e2.call(n3.k) : void 0;
    }(n2, e, r2);
  var i2 = e[r2];
  return n2.I || !t(i2) ? i2 : i2 === z(n2.t, r2) ? (E(n2), n2.o[r2] = N(n2.A.h, i2, n2)) : i2;
}, has: function(n2, r2) {
  return r2 in p(n2);
}, ownKeys: function(n2) {
  return Reflect.ownKeys(p(n2));
}, set: function(n2, r2, t2) {
  var e = I(p(n2), r2);
  if (null == e ? void 0 : e.set)
    return e.set.call(n2.k, t2), true;
  if (!n2.P) {
    var i2 = z(p(n2), r2), o2 = null == i2 ? void 0 : i2[Q];
    if (o2 && o2.t === t2)
      return n2.o[r2] = t2, n2.R[r2] = false, true;
    if (c(t2, i2) && (void 0 !== t2 || u(n2.t, r2)))
      return true;
    E(n2), k(n2);
  }
  return n2.o[r2] === t2 && (void 0 !== t2 || r2 in n2.o) || Number.isNaN(t2) && Number.isNaN(n2.o[r2]) || (n2.o[r2] = t2, n2.R[r2] = true), true;
}, deleteProperty: function(n2, r2) {
  return void 0 !== z(n2.t, r2) || r2 in n2.t ? (n2.R[r2] = false, E(n2), k(n2)) : delete n2.R[r2], n2.o && delete n2.o[r2], true;
}, getOwnPropertyDescriptor: function(n2, r2) {
  var t2 = p(n2), e = Reflect.getOwnPropertyDescriptor(t2, r2);
  return e ? { writable: true, configurable: 1 !== n2.i || "length" !== r2, enumerable: e.enumerable, value: t2[r2] } : e;
}, defineProperty: function() {
  n(11);
}, getPrototypeOf: function(n2) {
  return Object.getPrototypeOf(n2.t);
}, setPrototypeOf: function() {
  n(12);
} };
var on = {};
i(en, function(n2, r2) {
  on[n2] = function() {
    return arguments[0] = arguments[0][0], r2.apply(this, arguments);
  };
}), on.deleteProperty = function(r2, t2) {
  return isNaN(parseInt(t2)) && n(13), on.set.call(this, r2, t2, void 0);
}, on.set = function(r2, t2, e) {
  return "length" !== t2 && isNaN(parseInt(t2)) && n(14), en.set.call(this, r2[0], t2, e, r2[0]);
};
var un = function() {
  function e(r2) {
    var e2 = this;
    this.O = B, this.D = true, this.produce = function(r3, i3, o2) {
      if ("function" == typeof r3 && "function" != typeof i3) {
        var u2 = i3;
        i3 = r3;
        var a2 = e2;
        return function(n2) {
          var r4 = this;
          void 0 === n2 && (n2 = u2);
          for (var t2 = arguments.length, e3 = Array(t2 > 1 ? t2 - 1 : 0), o3 = 1; o3 < t2; o3++)
            e3[o3 - 1] = arguments[o3];
          return a2.produce(n2, function(n3) {
            var t3;
            return (t3 = i3).call.apply(t3, [r4, n3].concat(e3));
          });
        };
      }
      var f2;
      if ("function" != typeof i3 && n(6), void 0 !== o2 && "function" != typeof o2 && n(7), t(r3)) {
        var c2 = w(e2), s2 = N(e2, r3, void 0), v2 = true;
        try {
          f2 = i3(s2), v2 = false;
        } finally {
          v2 ? g(c2) : O(c2);
        }
        return "undefined" != typeof Promise && f2 instanceof Promise ? f2.then(function(n2) {
          return j(c2, o2), P(n2, c2);
        }, function(n2) {
          throw g(c2), n2;
        }) : (j(c2, o2), P(f2, c2));
      }
      if (!r3 || "object" != typeof r3) {
        if (void 0 === (f2 = i3(r3)) && (f2 = r3), f2 === H && (f2 = void 0), e2.D && d(f2, true), o2) {
          var p2 = [], l2 = [];
          b("Patches").M(r3, f2, p2, l2), o2(p2, l2);
        }
        return f2;
      }
      n(21, r3);
    }, this.produceWithPatches = function(n2, r3) {
      if ("function" == typeof n2)
        return function(r4) {
          for (var t3 = arguments.length, i4 = Array(t3 > 1 ? t3 - 1 : 0), o3 = 1; o3 < t3; o3++)
            i4[o3 - 1] = arguments[o3];
          return e2.produceWithPatches(r4, function(r5) {
            return n2.apply(void 0, [r5].concat(i4));
          });
        };
      var t2, i3, o2 = e2.produce(n2, r3, function(n3, r4) {
        t2 = n3, i3 = r4;
      });
      return "undefined" != typeof Promise && o2 instanceof Promise ? o2.then(function(n3) {
        return [n3, t2, i3];
      }) : [o2, t2, i3];
    }, "boolean" == typeof (null == r2 ? void 0 : r2.useProxies) && this.setUseProxies(r2.useProxies), "boolean" == typeof (null == r2 ? void 0 : r2.autoFreeze) && this.setAutoFreeze(r2.autoFreeze);
  }
  var i2 = e.prototype;
  return i2.createDraft = function(e2) {
    t(e2) || n(8), r(e2) && (e2 = R(e2));
    var i3 = w(this), o2 = N(this, e2, void 0);
    return o2[Q].C = true, O(i3), o2;
  }, i2.finishDraft = function(r2, t2) {
    var e2 = r2 && r2[Q];
    e2 && e2.C || n(9), e2.I && n(10);
    var i3 = e2.A;
    return j(i3, t2), P(void 0, i3);
  }, i2.setAutoFreeze = function(n2) {
    this.D = n2;
  }, i2.setUseProxies = function(r2) {
    r2 && !B && n(20), this.O = r2;
  }, i2.applyPatches = function(n2, t2) {
    var e2;
    for (e2 = t2.length - 1; e2 >= 0; e2--) {
      var i3 = t2[e2];
      if (0 === i3.path.length && "replace" === i3.op) {
        n2 = i3.value;
        break;
      }
    }
    e2 > -1 && (t2 = t2.slice(e2 + 1));
    var o2 = b("Patches").$;
    return r(n2) ? o2(n2, t2) : this.produce(n2, function(n3) {
      return o2(n3, t2);
    });
  }, e;
}();
var an = new un();
var fn = an.produce;
an.produceWithPatches.bind(an);
an.setAutoFreeze.bind(an);
an.setUseProxies.bind(an);
an.applyPatches.bind(an);
an.createDraft.bind(an);
an.finishDraft.bind(an);
var immerImpl = (initializer) => (set, get, store) => {
  store.setState = (updater, replace, ...a2) => {
    const nextState = typeof updater === "function" ? fn(updater) : updater;
    return set(nextState, replace, ...a2);
  };
  return initializer(store.setState, get, store);
};
var immer = immerImpl;
var createStoreImpl = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object") ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const destroy = () => {
    if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production") {
      console.warn(
        "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
      );
    }
    listeners.clear();
  };
  const api = { setState, getState, subscribe, destroy };
  state = createState(setState, getState, api);
  return api;
};
var createStore = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;
function getDefaultExportFromCjs(x2) {
  return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
}
var withSelector = { exports: {} };
var shim = { exports: {} };
var useSyncExternalStoreShim_development = {};
var hasRequiredUseSyncExternalStoreShim_development;
function requireUseSyncExternalStoreShim_development() {
  if (hasRequiredUseSyncExternalStoreShim_development)
    return useSyncExternalStoreShim_development;
  hasRequiredUseSyncExternalStoreShim_development = 1;
  if (true) {
    (function() {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function") {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      }
      var React = import_react2.default;
      var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      function error(format) {
        {
          {
            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }
            printWarning("error", format, args);
          }
        }
      }
      function printWarning(level, format, args) {
        {
          var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
          var stack = ReactDebugCurrentFrame.getStackAddendum();
          if (stack !== "") {
            format += "%s";
            args = args.concat([stack]);
          }
          var argsWithFormat = args.map(function(item) {
            return String(item);
          });
          argsWithFormat.unshift("Warning: " + format);
          Function.prototype.apply.call(console[level], console, argsWithFormat);
        }
      }
      function is(x2, y2) {
        return x2 === y2 && (x2 !== 0 || 1 / x2 === 1 / y2) || x2 !== x2 && y2 !== y2;
      }
      var objectIs = typeof Object.is === "function" ? Object.is : is;
      var useState3 = React.useState, useEffect3 = React.useEffect, useLayoutEffect = React.useLayoutEffect, useDebugValue2 = React.useDebugValue;
      var didWarnOld18Alpha = false;
      var didWarnUncachedGetSnapshot = false;
      function useSyncExternalStore2(subscribe, getSnapshot, getServerSnapshot) {
        {
          if (!didWarnOld18Alpha) {
            if (React.startTransition !== void 0) {
              didWarnOld18Alpha = true;
              error("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release.");
            }
          }
        }
        var value = getSnapshot();
        {
          if (!didWarnUncachedGetSnapshot) {
            var cachedValue = getSnapshot();
            if (!objectIs(value, cachedValue)) {
              error("The result of getSnapshot should be cached to avoid an infinite loop");
              didWarnUncachedGetSnapshot = true;
            }
          }
        }
        var _useState = useState3({
          inst: {
            value,
            getSnapshot
          }
        }), inst = _useState[0].inst, forceUpdate = _useState[1];
        useLayoutEffect(function() {
          inst.value = value;
          inst.getSnapshot = getSnapshot;
          if (checkIfSnapshotChanged(inst)) {
            forceUpdate({
              inst
            });
          }
        }, [subscribe, value, getSnapshot]);
        useEffect3(function() {
          if (checkIfSnapshotChanged(inst)) {
            forceUpdate({
              inst
            });
          }
          var handleStoreChange = function() {
            if (checkIfSnapshotChanged(inst)) {
              forceUpdate({
                inst
              });
            }
          };
          return subscribe(handleStoreChange);
        }, [subscribe]);
        useDebugValue2(value);
        return value;
      }
      function checkIfSnapshotChanged(inst) {
        var latestGetSnapshot = inst.getSnapshot;
        var prevValue = inst.value;
        try {
          var nextValue = latestGetSnapshot();
          return !objectIs(prevValue, nextValue);
        } catch (error2) {
          return true;
        }
      }
      function useSyncExternalStore$12(subscribe, getSnapshot, getServerSnapshot) {
        return getSnapshot();
      }
      var canUseDOM = !!(typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined");
      var isServerEnvironment = !canUseDOM;
      var shim2 = isServerEnvironment ? useSyncExternalStore$12 : useSyncExternalStore2;
      var useSyncExternalStore$2 = React.useSyncExternalStore !== void 0 ? React.useSyncExternalStore : shim2;
      useSyncExternalStoreShim_development.useSyncExternalStore = useSyncExternalStore$2;
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function") {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
      }
    })();
  }
  return useSyncExternalStoreShim_development;
}
var hasRequiredShim;
function requireShim() {
  if (hasRequiredShim)
    return shim.exports;
  hasRequiredShim = 1;
  if (false) {
    shim.exports = requireUseSyncExternalStoreShim_production_min();
  } else {
    shim.exports = requireUseSyncExternalStoreShim_development();
  }
  return shim.exports;
}
var withSelector_development = {};
var hasRequiredWithSelector_development;
function requireWithSelector_development() {
  if (hasRequiredWithSelector_development)
    return withSelector_development;
  hasRequiredWithSelector_development = 1;
  if (true) {
    (function() {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function") {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      }
      var React = import_react2.default;
      var shim2 = requireShim();
      function is(x2, y2) {
        return x2 === y2 && (x2 !== 0 || 1 / x2 === 1 / y2) || x2 !== x2 && y2 !== y2;
      }
      var objectIs = typeof Object.is === "function" ? Object.is : is;
      var useSyncExternalStore2 = shim2.useSyncExternalStore;
      var useRef2 = React.useRef, useEffect3 = React.useEffect, useMemo3 = React.useMemo, useDebugValue2 = React.useDebugValue;
      function useSyncExternalStoreWithSelector2(subscribe, getSnapshot, getServerSnapshot, selector2, isEqual) {
        var instRef = useRef2(null);
        var inst;
        if (instRef.current === null) {
          inst = {
            hasValue: false,
            value: null
          };
          instRef.current = inst;
        } else {
          inst = instRef.current;
        }
        var _useMemo = useMemo3(function() {
          var hasMemo = false;
          var memoizedSnapshot;
          var memoizedSelection;
          var memoizedSelector = function(nextSnapshot) {
            if (!hasMemo) {
              hasMemo = true;
              memoizedSnapshot = nextSnapshot;
              var _nextSelection = selector2(nextSnapshot);
              if (isEqual !== void 0) {
                if (inst.hasValue) {
                  var currentSelection = inst.value;
                  if (isEqual(currentSelection, _nextSelection)) {
                    memoizedSelection = currentSelection;
                    return currentSelection;
                  }
                }
              }
              memoizedSelection = _nextSelection;
              return _nextSelection;
            }
            var prevSnapshot = memoizedSnapshot;
            var prevSelection = memoizedSelection;
            if (objectIs(prevSnapshot, nextSnapshot)) {
              return prevSelection;
            }
            var nextSelection = selector2(nextSnapshot);
            if (isEqual !== void 0 && isEqual(prevSelection, nextSelection)) {
              return prevSelection;
            }
            memoizedSnapshot = nextSnapshot;
            memoizedSelection = nextSelection;
            return nextSelection;
          };
          var maybeGetServerSnapshot = getServerSnapshot === void 0 ? null : getServerSnapshot;
          var getSnapshotWithSelector = function() {
            return memoizedSelector(getSnapshot());
          };
          var getServerSnapshotWithSelector = maybeGetServerSnapshot === null ? void 0 : function() {
            return memoizedSelector(maybeGetServerSnapshot());
          };
          return [getSnapshotWithSelector, getServerSnapshotWithSelector];
        }, [getSnapshot, getServerSnapshot, selector2, isEqual]), getSelection = _useMemo[0], getServerSelection = _useMemo[1];
        var value = useSyncExternalStore2(subscribe, getSelection, getServerSelection);
        useEffect3(function() {
          inst.hasValue = true;
          inst.value = value;
        }, [value]);
        useDebugValue2(value);
        return value;
      }
      withSelector_development.useSyncExternalStoreWithSelector = useSyncExternalStoreWithSelector2;
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function") {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
      }
    })();
  }
  return withSelector_development;
}
if (false) {
  withSelector.exports = requireWithSelector_production_min();
} else {
  withSelector.exports = requireWithSelector_development();
}
var withSelectorExports = withSelector.exports;
var useSyncExternalStoreExports = /* @__PURE__ */ getDefaultExportFromCjs(withSelectorExports);
var { useSyncExternalStoreWithSelector } = useSyncExternalStoreExports;
function useStore(api, selector2 = api.getState, equalityFn) {
  const slice = useSyncExternalStoreWithSelector(
    api.subscribe,
    api.getState,
    api.getServerState || api.getState,
    selector2,
    equalityFn
  );
  (0, import_react2.useDebugValue)(slice);
  return slice;
}
var createImpl = (createState) => {
  if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production" && typeof createState !== "function") {
    console.warn(
      "[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`."
    );
  }
  const api = typeof createState === "function" ? createStore(createState) : createState;
  const useBoundStore = (selector2, equalityFn) => useStore(api, selector2, equalityFn);
  Object.assign(useBoundStore, api);
  return useBoundStore;
};
var create = (createState) => createState ? createImpl(createState) : createImpl;
var trackedConnections = /* @__PURE__ */ new Map();
var getTrackedConnectionState = (name) => {
  const api = trackedConnections.get(name);
  if (!api)
    return {};
  return Object.fromEntries(
    Object.entries(api.stores).map(([key, api2]) => [key, api2.getState()])
  );
};
var extractConnectionInformation = (store, extensionConnector, options) => {
  if (store === void 0) {
    return {
      type: "untracked",
      connection: extensionConnector.connect(options)
    };
  }
  const existingConnection = trackedConnections.get(options.name);
  if (existingConnection) {
    return { type: "tracked", store, ...existingConnection };
  }
  const newConnection = {
    connection: extensionConnector.connect(options),
    stores: {}
  };
  trackedConnections.set(options.name, newConnection);
  return { type: "tracked", store, ...newConnection };
};
var devtoolsImpl = (fn2, devtoolsOptions = {}) => (set, get, api) => {
  const { enabled, anonymousActionType, store, ...options } = devtoolsOptions;
  let extensionConnector;
  try {
    extensionConnector = (enabled != null ? enabled : (import.meta.env ? import.meta.env.MODE : void 0) !== "production") && window.__REDUX_DEVTOOLS_EXTENSION__;
  } catch (e) {
  }
  if (!extensionConnector) {
    if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production" && enabled) {
      console.warn(
        "[zustand devtools middleware] Please install/enable Redux devtools extension"
      );
    }
    return fn2(set, get, api);
  }
  const { connection, ...connectionInformation } = extractConnectionInformation(store, extensionConnector, options);
  let isRecording = true;
  api.setState = (state, replace, nameOrAction) => {
    const r2 = set(state, replace);
    if (!isRecording)
      return r2;
    const action = nameOrAction === void 0 ? { type: anonymousActionType || "anonymous" } : typeof nameOrAction === "string" ? { type: nameOrAction } : nameOrAction;
    if (store === void 0) {
      connection == null ? void 0 : connection.send(action, get());
      return r2;
    }
    connection == null ? void 0 : connection.send(
      {
        ...action,
        type: `${store}/${action.type}`
      },
      {
        ...getTrackedConnectionState(options.name),
        [store]: api.getState()
      }
    );
    return r2;
  };
  const setStateFromDevtools = (...a2) => {
    const originalIsRecording = isRecording;
    isRecording = false;
    set(...a2);
    isRecording = originalIsRecording;
  };
  const initialState = fn2(api.setState, get, api);
  if (connectionInformation.type === "untracked") {
    connection == null ? void 0 : connection.init(initialState);
  } else {
    connectionInformation.stores[connectionInformation.store] = api;
    connection == null ? void 0 : connection.init(
      Object.fromEntries(
        Object.entries(connectionInformation.stores).map(([key, store2]) => [
          key,
          key === connectionInformation.store ? initialState : store2.getState()
        ])
      )
    );
  }
  if (api.dispatchFromDevtools && typeof api.dispatch === "function") {
    let didWarnAboutReservedActionType = false;
    const originalDispatch = api.dispatch;
    api.dispatch = (...a2) => {
      if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production" && a2[0].type === "__setState" && !didWarnAboutReservedActionType) {
        console.warn(
          '[zustand devtools middleware] "__setState" action type is reserved to set state from the devtools. Avoid using it.'
        );
        didWarnAboutReservedActionType = true;
      }
      originalDispatch(...a2);
    };
  }
  connection.subscribe((message) => {
    var _a;
    switch (message.type) {
      case "ACTION":
        if (typeof message.payload !== "string") {
          console.error(
            "[zustand devtools middleware] Unsupported action format"
          );
          return;
        }
        return parseJsonThen(
          message.payload,
          (action) => {
            if (action.type === "__setState") {
              if (store === void 0) {
                setStateFromDevtools(action.state);
                return;
              }
              if (Object.keys(action.state).length !== 1) {
                console.error(
                  `
                    [zustand devtools middleware] Unsupported __setState action format. 
                    When using 'store' option in devtools(), the 'state' should have only one key, which is a value of 'store' that was passed in devtools(),
                    and value of this only key should be a state object. Example: { "type": "__setState", "state": { "abc123Store": { "foo": "bar" } } }
                    `
                );
              }
              const stateFromDevtools = action.state[store];
              if (stateFromDevtools === void 0 || stateFromDevtools === null) {
                return;
              }
              if (JSON.stringify(api.getState()) !== JSON.stringify(stateFromDevtools)) {
                setStateFromDevtools(stateFromDevtools);
              }
              return;
            }
            if (!api.dispatchFromDevtools)
              return;
            if (typeof api.dispatch !== "function")
              return;
            api.dispatch(action);
          }
        );
      case "DISPATCH":
        switch (message.payload.type) {
          case "RESET":
            setStateFromDevtools(initialState);
            if (store === void 0) {
              return connection == null ? void 0 : connection.init(api.getState());
            }
            return connection == null ? void 0 : connection.init(getTrackedConnectionState(options.name));
          case "COMMIT":
            if (store === void 0) {
              connection == null ? void 0 : connection.init(api.getState());
              return;
            }
            return connection == null ? void 0 : connection.init(getTrackedConnectionState(options.name));
          case "ROLLBACK":
            return parseJsonThen(message.state, (state) => {
              if (store === void 0) {
                setStateFromDevtools(state);
                connection == null ? void 0 : connection.init(api.getState());
                return;
              }
              setStateFromDevtools(state[store]);
              connection == null ? void 0 : connection.init(getTrackedConnectionState(options.name));
            });
          case "JUMP_TO_STATE":
          case "JUMP_TO_ACTION":
            return parseJsonThen(message.state, (state) => {
              if (store === void 0) {
                setStateFromDevtools(state);
                return;
              }
              if (JSON.stringify(api.getState()) !== JSON.stringify(state[store])) {
                setStateFromDevtools(state[store]);
              }
            });
          case "IMPORT_STATE": {
            const { nextLiftedState } = message.payload;
            const lastComputedState = (_a = nextLiftedState.computedStates.slice(-1)[0]) == null ? void 0 : _a.state;
            if (!lastComputedState)
              return;
            if (store === void 0) {
              setStateFromDevtools(lastComputedState);
            } else {
              setStateFromDevtools(lastComputedState[store]);
            }
            connection == null ? void 0 : connection.send(
              null,
              // FIXME no-any
              nextLiftedState
            );
            return;
          }
          case "PAUSE_RECORDING":
            return isRecording = !isRecording;
        }
        return;
    }
  });
  return initialState;
};
var devtools = devtoolsImpl;
var parseJsonThen = (stringified, f2) => {
  let parsed;
  try {
    parsed = JSON.parse(stringified);
  } catch (e) {
    console.error(
      "[zustand devtools middleware] Could not parse the received json",
      e
    );
  }
  if (parsed !== void 0)
    f2(parsed);
};
function createJSONStorage(getStorage, options) {
  let storage;
  try {
    storage = getStorage();
  } catch (e) {
    return;
  }
  const persistStorage = {
    getItem: (name) => {
      var _a;
      const parse = (str2) => {
        if (str2 === null) {
          return null;
        }
        return JSON.parse(str2, options == null ? void 0 : options.reviver);
      };
      const str = (_a = storage.getItem(name)) != null ? _a : null;
      if (str instanceof Promise) {
        return str.then(parse);
      }
      return parse(str);
    },
    setItem: (name, newValue) => storage.setItem(
      name,
      JSON.stringify(newValue, options == null ? void 0 : options.replacer)
    ),
    removeItem: (name) => storage.removeItem(name)
  };
  return persistStorage;
}
var toThenable = (fn2) => (input) => {
  try {
    const result = fn2(input);
    if (result instanceof Promise) {
      return result;
    }
    return {
      then(onFulfilled) {
        return toThenable(onFulfilled)(result);
      },
      catch(_onRejected) {
        return this;
      }
    };
  } catch (e) {
    return {
      then(_onFulfilled) {
        return this;
      },
      catch(onRejected) {
        return toThenable(onRejected)(e);
      }
    };
  }
};
var oldImpl = (config, baseOptions) => (set, get, api) => {
  let options = {
    getStorage: () => localStorage,
    serialize: JSON.stringify,
    deserialize: JSON.parse,
    partialize: (state) => state,
    version: 0,
    merge: (persistedState, currentState) => ({
      ...currentState,
      ...persistedState
    }),
    ...baseOptions
  };
  let hasHydrated = false;
  const hydrationListeners = /* @__PURE__ */ new Set();
  const finishHydrationListeners = /* @__PURE__ */ new Set();
  let storage;
  try {
    storage = options.getStorage();
  } catch (e) {
  }
  if (!storage) {
    return config(
      (...args) => {
        console.warn(
          `[zustand persist middleware] Unable to update item '${options.name}', the given storage is currently unavailable.`
        );
        set(...args);
      },
      get,
      api
    );
  }
  const thenableSerialize = toThenable(options.serialize);
  const setItem = () => {
    const state = options.partialize({ ...get() });
    let errorInSync;
    const thenable = thenableSerialize({ state, version: options.version }).then(
      (serializedValue) => storage.setItem(options.name, serializedValue)
    ).catch((e) => {
      errorInSync = e;
    });
    if (errorInSync) {
      throw errorInSync;
    }
    return thenable;
  };
  const savedSetState = api.setState;
  api.setState = (state, replace) => {
    savedSetState(state, replace);
    void setItem();
  };
  const configResult = config(
    (...args) => {
      set(...args);
      void setItem();
    },
    get,
    api
  );
  let stateFromStorage;
  const hydrate = () => {
    var _a;
    if (!storage)
      return;
    hasHydrated = false;
    hydrationListeners.forEach((cb) => cb(get()));
    const postRehydrationCallback = ((_a = options.onRehydrateStorage) == null ? void 0 : _a.call(options, get())) || void 0;
    return toThenable(storage.getItem.bind(storage))(options.name).then((storageValue) => {
      if (storageValue) {
        return options.deserialize(storageValue);
      }
    }).then((deserializedStorageValue) => {
      if (deserializedStorageValue) {
        if (typeof deserializedStorageValue.version === "number" && deserializedStorageValue.version !== options.version) {
          if (options.migrate) {
            return options.migrate(
              deserializedStorageValue.state,
              deserializedStorageValue.version
            );
          }
          console.error(
            `State loaded from storage couldn't be migrated since no migrate function was provided`
          );
        } else {
          return deserializedStorageValue.state;
        }
      }
    }).then((migratedState) => {
      var _a2;
      stateFromStorage = options.merge(
        migratedState,
        (_a2 = get()) != null ? _a2 : configResult
      );
      set(stateFromStorage, true);
      return setItem();
    }).then(() => {
      postRehydrationCallback == null ? void 0 : postRehydrationCallback(stateFromStorage, void 0);
      hasHydrated = true;
      finishHydrationListeners.forEach((cb) => cb(stateFromStorage));
    }).catch((e) => {
      postRehydrationCallback == null ? void 0 : postRehydrationCallback(void 0, e);
    });
  };
  api.persist = {
    setOptions: (newOptions) => {
      options = {
        ...options,
        ...newOptions
      };
      if (newOptions.getStorage) {
        storage = newOptions.getStorage();
      }
    },
    clearStorage: () => {
      storage == null ? void 0 : storage.removeItem(options.name);
    },
    getOptions: () => options,
    rehydrate: () => hydrate(),
    hasHydrated: () => hasHydrated,
    onHydrate: (cb) => {
      hydrationListeners.add(cb);
      return () => {
        hydrationListeners.delete(cb);
      };
    },
    onFinishHydration: (cb) => {
      finishHydrationListeners.add(cb);
      return () => {
        finishHydrationListeners.delete(cb);
      };
    }
  };
  hydrate();
  return stateFromStorage || configResult;
};
var newImpl = (config, baseOptions) => (set, get, api) => {
  let options = {
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => state,
    version: 0,
    merge: (persistedState, currentState) => ({
      ...currentState,
      ...persistedState
    }),
    ...baseOptions
  };
  let hasHydrated = false;
  const hydrationListeners = /* @__PURE__ */ new Set();
  const finishHydrationListeners = /* @__PURE__ */ new Set();
  let storage = options.storage;
  if (!storage) {
    return config(
      (...args) => {
        console.warn(
          `[zustand persist middleware] Unable to update item '${options.name}', the given storage is currently unavailable.`
        );
        set(...args);
      },
      get,
      api
    );
  }
  const setItem = () => {
    const state = options.partialize({ ...get() });
    return storage.setItem(options.name, {
      state,
      version: options.version
    });
  };
  const savedSetState = api.setState;
  api.setState = (state, replace) => {
    savedSetState(state, replace);
    void setItem();
  };
  const configResult = config(
    (...args) => {
      set(...args);
      void setItem();
    },
    get,
    api
  );
  let stateFromStorage;
  const hydrate = () => {
    var _a, _b;
    if (!storage)
      return;
    hasHydrated = false;
    hydrationListeners.forEach((cb) => {
      var _a2;
      return cb((_a2 = get()) != null ? _a2 : configResult);
    });
    const postRehydrationCallback = ((_b = options.onRehydrateStorage) == null ? void 0 : _b.call(options, (_a = get()) != null ? _a : configResult)) || void 0;
    return toThenable(storage.getItem.bind(storage))(options.name).then((deserializedStorageValue) => {
      if (deserializedStorageValue) {
        if (typeof deserializedStorageValue.version === "number" && deserializedStorageValue.version !== options.version) {
          if (options.migrate) {
            return options.migrate(
              deserializedStorageValue.state,
              deserializedStorageValue.version
            );
          }
          console.error(
            `State loaded from storage couldn't be migrated since no migrate function was provided`
          );
        } else {
          return deserializedStorageValue.state;
        }
      }
    }).then((migratedState) => {
      var _a2;
      stateFromStorage = options.merge(
        migratedState,
        (_a2 = get()) != null ? _a2 : configResult
      );
      set(stateFromStorage, true);
      return setItem();
    }).then(() => {
      postRehydrationCallback == null ? void 0 : postRehydrationCallback(stateFromStorage, void 0);
      stateFromStorage = get();
      hasHydrated = true;
      finishHydrationListeners.forEach((cb) => cb(stateFromStorage));
    }).catch((e) => {
      postRehydrationCallback == null ? void 0 : postRehydrationCallback(void 0, e);
    });
  };
  api.persist = {
    setOptions: (newOptions) => {
      options = {
        ...options,
        ...newOptions
      };
      if (newOptions.storage) {
        storage = newOptions.storage;
      }
    },
    clearStorage: () => {
      storage == null ? void 0 : storage.removeItem(options.name);
    },
    getOptions: () => options,
    rehydrate: () => hydrate(),
    hasHydrated: () => hasHydrated,
    onHydrate: (cb) => {
      hydrationListeners.add(cb);
      return () => {
        hydrationListeners.delete(cb);
      };
    },
    onFinishHydration: (cb) => {
      finishHydrationListeners.add(cb);
      return () => {
        finishHydrationListeners.delete(cb);
      };
    }
  };
  if (!options.skipHydration) {
    hydrate();
  }
  return stateFromStorage || configResult;
};
var persistImpl = (config, baseOptions) => {
  if ("getStorage" in baseOptions || "serialize" in baseOptions || "deserialize" in baseOptions) {
    if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production") {
      console.warn(
        "[DEPRECATED] `getStorage`, `serialize` and `deserialize` options are deprecated. Use `storage` option instead."
      );
    }
    return oldImpl(config, baseOptions);
  }
  return newImpl(config, baseOptions);
};
var persist = persistImpl;
var walletStoreSelector = (state) => ({
  accounts: state.accounts,
  activeAccount: state.activeAccount,
  setActiveAccount: state.setActiveAccount,
  clearActiveAccount: state.clearActiveAccount,
  addAccounts: state.addAccounts,
  removeAccounts: state.removeAccounts
});
var emptyState = {
  accounts: [],
  activeAccount: void 0,
  setActiveAccount: () => {
    return;
  },
  clearActiveAccount: () => {
    return;
  },
  addAccounts: () => {
    return;
  },
  removeAccounts: () => {
    return;
  }
};
var useWalletStore = create()(immer(persist(devtools((set, _get) => ({
  accounts: [],
  activeAccount: null,
  setActiveAccount: (account) => {
    set((state) => {
      state.activeAccount = account;
    });
  },
  clearActiveAccount: (id) => {
    set((state) => {
      if (id === state.activeAccount?.providerId)
        state.activeAccount = null;
    });
  },
  addAccounts: (accounts) => {
    set((state) => {
      const uniqueAccounts = [...state.accounts, ...accounts].reduce((uniqueAccounts2, o2) => {
        if (!uniqueAccounts2.some((obj) => obj.providerId === o2.providerId && obj.address === o2.address)) {
          uniqueAccounts2.push(o2);
        }
        return uniqueAccounts2;
      }, []);
      state.accounts = uniqueAccounts;
    });
  },
  removeAccounts: (providerId) => {
    set((state) => {
      state.accounts = state.accounts.filter((account) => account.providerId !== providerId);
    });
  }
})), {
  name: "txnlab-use-wallet",
  version: 1
  // increment to deprecate stored data
})));
var useHydratedWalletStore = (selector2, compare) => {
  const store = useWalletStore(selector2, compare);
  const [hydrated, setHydrated] = (0, import_react2.useState)(false);
  (0, import_react2.useEffect)(() => setHydrated(true), []);
  return hydrated ? store : selector2(emptyState);
};
var useDebugStore = create((set) => ({
  debug: false,
  setDebug: (debug) => set({ debug })
}));
var debugLog = (...args) => {
  const { debug } = useDebugStore.getState();
  if (debug) {
    console.log("%c[USE-WALLET]", "color: #FF602E; font-weight: bold;", ...args);
  }
};
var getProviderList = (providers) => {
  return providers.map((provider) => {
    if (typeof provider === "string") {
      return provider;
    }
    return provider.id;
  }).map((id) => id.toUpperCase()).join(", ");
};
var ICON$a = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNzcgMTg3Ij48cmVjdCB4PSItMTEuMzgiIHk9Ii0yNS45NyIgd2lkdGg9IjIwMC4wMiIgaGVpZ2h0PSIyMzEuNTMiIHN0eWxlPSJmaWxsOiNmZTU7Ii8+PHBhdGggZD0iTTk0LjA1LDU5LjYxYzIuMDUsOC40OCwxLjM2LDE1Ljk0LTEuNTUsMTYuNjYtMi45LC43Mi02LjkxLTUuNTctOC45Ni0xNC4wNS0yLjA1LTguNDgtMS4zNi0xNS45NCwxLjU1LTE2LjY2LDIuOS0uNzIsNi45MSw1LjU3LDguOTYsMTQuMDVaIiBzdHlsZT0iZmlsbDojMWMxYzFjOyIvPjxwYXRoIGQ9Ik0xMjcuODUsNjYuOWMtNC41My00LjgxLTEzLjU1LTMuNS0yMC4xNSwyLjkxLTYuNTksNi40MS04LjI2LDE1LjUtMy43MywyMC4zMSw0LjUzLDQuOCwxMy41NSwzLjUsMjAuMTUtMi45MXM4LjI2LTE1LjUsMy43My0yMC4zMVoiIHN0eWxlPSJmaWxsOiMxYzFjMWM7Ii8+PHBhdGggZD0iTTkxLjc5LDE0MC40N2MyLjktLjcyLDMuNDktOC42LDEuMzItMTcuNjEtMi4xNy05LTYuMjktMTUuNzEtOS4xOS0xNC45OS0yLjksLjcyLTMuNDksOC42LTEuMzIsMTcuNjEsMi4xNyw5LDYuMjksMTUuNzEsOS4xOSwxNC45OVoiIHN0eWxlPSJmaWxsOiMxYzFjMWM7Ii8+PHBhdGggZD0iTTYyLjIyLDcxLjNjOC4zNywyLjQ3LDE0LjQ4LDYuOCwxMy42Niw5LjY3LS44MywyLjg3LTguMjgsMy4yLTE2LjY1LC43My04LjM3LTIuNDctMTQuNDgtNi44LTEzLjY2LTkuNjcsLjgzLTIuODcsOC4yOC0zLjIsMTYuNjUtLjczWiIgc3R5bGU9ImZpbGw6IzFjMWMxYzsiLz48cGF0aCBkPSJNMTE2LjU0LDEwMy43NGM4Ljg4LDIuNjIsMTUuNDEsNy4wNywxNC41OSw5Ljk0LS44MywyLjg3LTguNywzLjA4LTE3LjU4LC40Ni04Ljg4LTIuNjItMTUuNDEtNy4wNy0xNC41OS05Ljk0LC44My0yLjg3LDguNy0zLjA4LDE3LjU4LS40NloiIHN0eWxlPSJmaWxsOiMxYzFjMWM7Ii8+PHBhdGggZD0iTTcxLjY0LDk3LjcxYy0yLjA4LTIuMTUtOC44OCwuOTgtMTUuMiw2Ljk5LTYuMzIsNi4wMS05Ljc2LDEyLjYzLTcuNjksMTQuNzgsMi4wOCwyLjE1LDguODgtLjk4LDE1LjItNi45OSw2LjMyLTYuMDEsOS43Ni0xMi42Myw3LjY5LTE0Ljc4WiIgc3R5bGU9ImZpbGw6IzFjMWMxYzsiLz48L3N2Zz4=";
var _client;
var _PeraWalletClient = class extends BaseClient {
  constructor({ metadata, client, clientOptions, algosdk, algodClient, network }) {
    super(metadata, algosdk, algodClient);
    __privateAdd(this, _client, void 0);
    __publicField(this, "clientOptions");
    __publicField(this, "network");
    __privateSet(this, _client, client);
    this.clientOptions = clientOptions;
    this.network = network;
    this.metadata = _PeraWalletClient.metadata;
  }
  static async init({ clientOptions, algodOptions, clientStatic, getDynamicClient, algosdkStatic, network = DEFAULT_NETWORK }) {
    try {
      debugLog(`${PROVIDER_ID.PERA.toUpperCase()} initializing...`);
      let PeraWalletConnect;
      if (clientStatic) {
        PeraWalletConnect = clientStatic;
      } else if (getDynamicClient) {
        PeraWalletConnect = await getDynamicClient();
      } else {
        throw new Error("Pera Wallet provider missing required property: clientStatic or getDynamicClient");
      }
      const algosdk = algosdkStatic || (await Algod.init(algodOptions)).algosdk;
      const algodClient = getAlgodClient(algosdk, algodOptions);
      const peraWallet = new PeraWalletConnect({
        ...clientOptions && clientOptions
      });
      const provider = new _PeraWalletClient({
        metadata: _PeraWalletClient.metadata,
        client: peraWallet,
        clientOptions,
        algosdk,
        algodClient,
        network
      });
      debugLog(`${PROVIDER_ID.PERA.toUpperCase()} initialized`, "\u2705");
      return provider;
    } catch (e) {
      console.error("Error initializing...", e);
      return null;
    }
  }
  async connect(onDisconnect) {
    const accounts = await __privateGet(this, _client).connect();
    __privateGet(this, _client).connector?.on("disconnect", onDisconnect);
    if (accounts.length === 0) {
      throw new Error(`No accounts found for ${_PeraWalletClient.metadata.id}`);
    }
    const mappedAccounts = accounts.map((address, index) => ({
      name: `Pera Wallet ${index + 1}`,
      address,
      providerId: _PeraWalletClient.metadata.id
    }));
    return {
      ..._PeraWalletClient.metadata,
      accounts: mappedAccounts
    };
  }
  async reconnect(onDisconnect) {
    const accounts = await __privateGet(this, _client).reconnectSession().catch(console.info);
    __privateGet(this, _client).connector?.on("disconnect", onDisconnect);
    if (!accounts) {
      onDisconnect();
      return null;
    }
    return {
      ..._PeraWalletClient.metadata,
      accounts: accounts.map((address, index) => ({
        name: `Pera Wallet ${index + 1}`,
        address,
        providerId: _PeraWalletClient.metadata.id
      }))
    };
  }
  async disconnect() {
    await __privateGet(this, _client).disconnect();
  }
  async signTransactions(connectedAccounts, txnGroups, indexesToSign, returnGroup = true) {
    const transactions = Array.isArray(txnGroups[0]) ? txnGroups.flatMap((txn) => txn) : txnGroups;
    const decodedTxns = transactions.map((txn) => {
      return this.algosdk.decodeObj(txn);
    });
    const signedIndexes = [];
    const txnsToSign = decodedTxns.reduce((acc, txn, i2) => {
      const isSigned = "txn" in txn;
      if (indexesToSign && indexesToSign.length && indexesToSign.includes(i2)) {
        signedIndexes.push(i2);
        acc.push({
          txn: this.algosdk.decodeUnsignedTransaction(transactions[i2])
        });
      } else if (indexesToSign && indexesToSign.length && !indexesToSign.includes(i2)) {
        acc.push({
          txn: isSigned ? this.algosdk.decodeSignedTransaction(transactions[i2]).txn : this.algosdk.decodeUnsignedTransaction(transactions[i2]),
          signers: []
        });
      } else if (!isSigned && connectedAccounts.includes(this.algosdk.encodeAddress(txn["snd"]))) {
        signedIndexes.push(i2);
        acc.push({
          txn: this.algosdk.decodeUnsignedTransaction(transactions[i2])
        });
      } else if (isSigned) {
        acc.push({
          txn: this.algosdk.decodeSignedTransaction(transactions[i2]).txn,
          signers: []
        });
      } else if (!isSigned) {
        acc.push({
          txn: this.algosdk.decodeUnsignedTransaction(transactions[i2]),
          signers: []
        });
      }
      return acc;
    }, []);
    const result = await __privateGet(this, _client).signTransaction([txnsToSign]);
    const signedTxns = transactions.reduce((acc, txn, i2) => {
      if (signedIndexes.includes(i2)) {
        const signedByUser = result.shift();
        signedByUser && acc.push(signedByUser);
      } else if (returnGroup) {
        acc.push(transactions[i2]);
      }
      return acc;
    }, []);
    return signedTxns;
  }
};
var PeraWalletClient = _PeraWalletClient;
_client = new WeakMap();
__publicField(PeraWalletClient, "metadata", {
  id: PROVIDER_ID.PERA,
  name: "Pera",
  icon: ICON$a,
  isWalletConnect: true
});
var ICON$9 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5gkNFS8Vlp9VjgAAIABJREFUeJzs3XmcXVWVN/zf2vucO9+akkASklSFMTKICIgiyJyJIA6tjIoT6vM8tHPbw9tPq/12v90qM8gkoCIooCgIKrYKKBqZFAfIPFYGEjLVcO89497r/eNWQURCksq995yqWt/PJx/zkXDPKnLu2evsvdfagBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghRgdKOgAhRPMxABxzjPMMgMHSszxz9TTHOk62nYgnZLM+Jk2yz1QqdBwAevbZONlohRCtIAmAECn39DHHOPtv9stR1i8VQ6fDuraTDToc0m0x2y4mdBCoHcxFJpQBKjBziQgumEoEVgxkQeQCYAIzM1wAORAYII8Aw/XnAREQgDliopiAKgMBwDUwVTVhMAbXCOgjUJ9m3h4DAwTqUzbeEVvVV8rElY61awdoKO8QQqSTJABCJOi5WbPciUHQSVZPjg1PVpqmWkvdIOwPYCrA+wPUyUAnGG2KkMsQIUsENfT1Jbz8RbYAGAwGXv7Fw79nAAQa+r0d+nfU0P9bH60ZNPRniF7+bBr6M2ro3xn+bAAwYATMCJktAJ8ZAwTeDtAOgDeRohcs8ILDtDZgu7kI3hCGvGXK5qO3E344HIYQosUkARCiyXjWLHddxUzSZHpcpWeETIdq2JkGmKlAUyzzZEXUViAFl14eZA0YBvVXczv0e+a/HtzT4K+SBCJoABoETfXkQg8lFwwgZIbH1gwlCZsYtFEpWsngtcS8DJbWKhX07tfbu4UASQ6EaCJJAIRoEAZo27RDpoTgg5TG4cw0ywCHa6DHgqdmSZVyRC8NiDEYMTNiAJZ56O19bCMMJQVEcEBwqJ4gEOr/PTxmRNYOKNA6C16jgEVaYXEIuzhQvOqg1atfTPhHEGLMkARAiBFgnKy39Lx4IBl+XUD2aA11NJhnMWFGlqicJ/XSoBYNDfKGWV5pd2M4OXBBcIeSAwvAY4vAcp8iXs1QS5jtHw3ZP5U0L+pcvXqdPMiE2HvyvRFiD2yddsjUQKsjydrjiPhYBh0BYGZJqYw7NEiFzIiG3urH+pt8qykAzkuJQX2ZJKgvJ1QJWM3gPzOpZ0xk/qANPz9186qtSccsRNpJAiDEKzCALT2HHWINjgfZEwE6jsGz8qTas1Qf7AOuv9kbyGCfFEJ9tiADQmYoKfDYwmfeRozFIDzlgn8bMf1hyrrlaxIOV4jUkQRACAAbZhxymMM4AcBJTHgzA7PalHYVgHBol7u82acfAXCHqiRcEGIwqtbWwFisQAsB/MZR+omutYt7k45ViKRJAiDGpS3TD51iyb6FSJ1qGCcDfESb0i6h/nYfDL3di9FteJYgi3pSYMCoWFsl0F+I7OMa9GigzdNTV8mSgRh/JAEQ48KyGTMyRc4e5xJOY+B0Bo4tKdWuQQiY4cuAP244RMgNJQVD+wi2AniKgUc17C8m9a78kzQxEuOBJABizOqfcmhXmMVJscHZTHx6hujgIqmXy81YnvHj3fCSQX6oPLPfGgD4iwb+h4Cfco6enLRsWSXhMIVoCkkAxJiyYebM6crqM4jVAgAnFxXt54DqZWRShid2QwPIkkKOCAEYnuX1YH5Mk3ogF0SPtUl1gRhDJAEQo96GmTOna+POJsa5THxKm9JtDKDGFpFs3BMjRAAyRCiQggGjZu0WBh7VxPfnlPlFefXqLUnHKMS+kARAjEpbph86JVZ2rgP1TsP1Qd/i5UFfiEYbTga4XlmwFcAviem+DGV+3tH7XF/S8QmxtyQBEKPGspkzy+1xZjbIvoeB2W1Kd8qgL5LwV8kA243MeJiAe7cU9CNHLlkSJR2fEHtCEgCRepunHfpWVnwBAQsKSnVrECoy6IuUyBKhSGqofNQuIeB+Jr57/7Ur/pR0bEK8FkkARCptm3LgNJvR7zWMCxyi44qkUBvayCfDvkgjApAnhTwR+qy1AB5XzHfGrrlf+gyINJIEQKTGPYA6dcYhZynCB2LG2R1Kl8P65ivZvS9GFQ2gqBQ0CIPWvAimHwJ8x/7rli9MOjYhhkkCIBK3ddohU1mr85nt+7NKHe3KFL8YQ4aXCKpsYZgXKuCbNQTf6+7tlY2DIlGSAIjEbOo+8M0O9Idixns6lO7wmVFjK1P8YkxSqM8KOPVZgQ0A7mGjvjF5w9Lnko5NjE+SAIiWem7WLHc/377TWv6YQ3R6kRQqbBHK274YR3JEKCqFfmMiAj0YE986de3ynyYdlxhfJAEQLbHxwAMnOpFzERQuLZI6wtYPZZG1fTGuaRDKqt6eOrD2KSa+0fqD907ZvLmWdGxi7JMEQDTVphmHzFTARwF8oKz05IAZVZZhX4idEerLAy4IVbYrYvBtPjvfmNm7eHPSsYmxSxIA0RSbDjjsSKX5/xD4orLS5cpQCZ8Q4rXlSaFAhH5rthCr2w3sTVPWLV+TdFxi7JEEQDTUlgMOPQ4an2bw35WVzgzKbn4hRiRLhBIpDFgzQETfCpm/dkDv8qVJxyXGDkkARENsnn7IiUz4JIH+rk0pNWAtYtnPL8Q+c4nQphQGjPUU8K2Q+Jqpa5cvSTouMfpJAiD2yQvTDjleKfyLJnpHof62ApN0UEKMQQ4R2klhwFoPhDti8NWSCIh9IQmAGJGNMw56o4b6PEDnlZUM/EK0ys6JAAPfgjVf3X/9ylVJxyVGH0kAxF7ZMOOQw1yif2Lmi9uUdvpl4Bei5Rj1Ewnb6rNugwTc4llcOWP98o1JxyZGD0kAxB5ZNuWgAzpd57NM/LE2UoV+axGB5QYSIkE7JwKD1r5I4Gv7VXTdQWvWDCQdm0g/eX6L17S4/dDSpA7+ewY+XSY9aWCoa5/cOEKkB6PeXbBECoNsVsHiy4+sW37reZBeW2LX5Dkudmnz9EMu0UT/UlLq0Apb+DLwC5F6BVLIEWGA7e/Zmi9NXrfywaRjEukkz3PxNyxwmtc2+UuFTObk4c59cqMIMbqUSQEArB8+4FY3f1EBf0w4JJEy8lwXL/nDY284eNlvTv3i5OVbLsqCMWDlZD4hRjMFoF1pVIjCFw6dcNOFwTX/ob6ELUnHJdJBEgCBBx6YnD+np/LpawcX/MPDpUs7ZhYInjFycwgxFhDgksbSAQ///Pw162YPLPwP9YnKLUmHJZInz/hxbv3vZy4oOuF/RbnykQvWfQYbwg575oSMbXO1E1t5/xditMtohTW1IP7VAKvT7Rp13+ZrYEL+dRjSPxc+sW5h0vGJ5KikAxDJWPvUjJmbnp35nXyOHmxzoyOv2HhavCLcHxqhWlTxwJatZIdCjG6aCJXImCWDAXVwoB5zD7Z36BOM1uHbdEY/Ht3UfW3/dVO6ko5TJEMSgHFo3e+7P5V19TPForoAvo/f9U+Pv+e9VZXJg0uEzb5xev3IukpSACFGMwVgacXnmrHaISDPkbp2whxsDttNxkTKyeu/zzmZP9S+NuOipGMVrScJwDiy7unuN73wbM+vO8r6KhC6tvfFgDH2ltpcDKKo3KGefloRllYCqsTGaJIkQIjRKKMIL/iRWedFKqMIDCBvQ6zK7Kdv6jyTOfZtbdAg41B3Pq/vDG7svt+/rueQpOMWrSMJwDiw8J6puY3P9vyn49Bv8zl18vY+Cz9ktCkPj4VH2v/xj1Fl8l7a8a8A1IzVSwYDKGkkIsSoo4jgG2sXV3xA0UvPeQbQZj3c0XGSWpzrtnkboBowPM8ik1fnKpef9m/s/lSCoYsWkgRgjFv71MwzZh6aeaK9pP/FMjl9A/Xx3CGLqs2ZG2pnA0RD7wcvyyjCej/SG4LIZmQpQIhRxSFgWTW0/bHVziv+mcsG/U5RXTlhPsDWagDMQLVioUDt2by6Kryp55eDX5t5VBKxi9aRBGCMevTejuKGP/RcnsviF9msOnrrDoM4ZhDV3wLK5OEHwVvsH6MDnSL5r/oZRIQlgz75xhrJAYQYHVxF2BLEZk01UK+2j4cBtJkaHiq9QT1SPNLmbA2MeklYEDO8ioWbodMzmp/wv9bz+VbHL1pHEoAxaN3T3accdmjHEx1t+rNxzBgY/OtZ/BxF2Gi64turZ6q8Cnf5OZqAgdjqZbWQHdkLIETqEQGxtXZRxWdD2GXersAAkbp80tnwKWvcnVb6GEC1ZqGAQraovhze1PPLwatlNmAskgRgDLn33lnuxt/3/KfrqsdyGXXklu0Gsak/FHaWR4hveGdwr91PZxG95me6irCmGqgtQRy7kgQIkWouEVbVIrstNM7uvq8l6+Op/EHOXe1v5Yzx/uqfEYAwZtQqBm6WTs/m+Hf+jT2faGLoIgHyRB8j1iycfkymoG9sL+kT+gYsooj/ZuAHgCIFWBIfEL9/x6eVIa2coZ3/ryVmRoer47d2FBSIlLQHEiJ9HCIMxMb8ZnsVFtB78nYXkIuJ8YD5ae9XMclUdECv3DFQ3x+Qcwk6R4h8fqgamr/v/MS6NQ3/AUTLyQzAGLDume5P5grObwtZdcLW7S+v9b8SgQFme2NtHgZReKnsb3ccImwPjbPSk94AQqRR/VvJdtGgxxHzHg3+AJDjCGszE/WNnWeytsGrfzbttDcgSwuKGfXk4PXTL2xQ6CJBkgCMYksXTpv6wrMz7+9od65mRn54h/+utJGHR8Oj7C+CN/xV2d+ecBRhRcVXfZGNZT+AEOniKsJaL7KbAqP2ZqmuXhbo4472t6rncj2msIskYPjPVisWjqL9SgXnLv9r3bds/reO4r5HL5IiCcAotfap6QvaC84TpaI6d0efQbiLKf9hDlkM2py9sTafCPibsr/dUQAiQC0a9MDMVnIAIdJBE6ESW7N00Cdnp5r/PeWywaCTV1dMmAtmtuo1ng1EgBcyfM8iW1KXdk1tX1i9vvtN+/QDiMRIAjDK/Ou/gtY/0/3fhbzzoNZq+rYdBrwHY3kZNdwXvNX+KZ6pd1X2tzsuETYFsbPWj6xsCBQiHRSAJRXf1uyeT/3vjAG0Gw8/KR9DPy+/3ubM7mcHLQO1QQvHVa/PuPhV9bruT47g0iJh8hQfRZY+PmNmqUC3d7Q7p+7oN4jjv93h/2qyFGObKZkL+z6Hbdy2253/r8UCcAnmpM4iCq7WRk4MFCIxGUXY4IXmqT6P3BG8/e+sqnI4yu81P+y9klyCivfg/ZAZyLoEJ0fwPXt3UIv+d8dnN+7YlzhE68gMwCix9nc957SV1RPlkj5163YD8yrlfbuSR4BvemfyejtJ5/Zh8AfqN4xnWS+pBkzM0iZYiIQoIvixtYsrARTt2+APAEXr45n8TP2d9pNsxtT26N8hqpcLelWLXEGfXyi6C/uv637zvsYiWkMSgFFg3dPdXyqW6EeOpv229+3dmFskH89GM833vBP3euPfrmSIsN6L1EY/ljbBQiTEIWBZLbQDsdW6QV/Dog1xQ9cZ6gV3osnynr8sMAO1AQPXVbPyGTxa/Vr3/2pMRKKZJAFIsWW/PnDihj/0/Kir0/m3IASqtdfe6PdKQxv97E21uagiv0c1/3tKEanFFZ88Y42S/QBCtNRQu994dS2gRpbm1ssCJ6kbOs/aZVngLtFQB0GmXKGgbvBv7L6l91NTcw0LTjScJAAptezxGSeU2+zC9rI+Z+t2g9js3eDPAMrKwy+Co+2jwdG6UW//wzQBg7HVy6ohOzL+C9EyBCC2bBcN+sT1r2LD1MsCa7iz40T159yBr1kW+KqxDfUM8GsW2YK+dP/DMr/su/6AgxoYomggSQBSaO2T3Ze0t+lHsxl1yNbtI3trd2ExaHL25to8UsTY27K/PbrGUJvgF4M4lgZBQrSGqwgra6HdFhndjJ4cLltU9J6VBe5KvUrAIJOjE4uu89vK9TPmNDxQsc8kAUiZDb+f+eX2Nv1NZuQHBu1evfXvrKxq+H5wkv1z1KMLtJdTeXuIADCRen7Qp9iykZUAIZrLUYQdoTErKr5ympR0108L9PBw+Q364dLRNmdHPns41Dho/4yrfjJ4ffenGhmn2HeSAKTE6ke72zc+O/P+jnb1+UrNIgj3bsp/Z1mK0BtPMt+snv6ap/01gkPAjsjolbVAegMI0UQEgJmxuOIjAlQzH94EhgJwxcT5VFM5s6dtw//mcwioBgxYqFJJXeXf0H3jI1+Abmy0YqQkAUiB1b+dcVi2nR5vK9G5wyV++yKH0N7unckbeKLa17K/PVFvExzoHZGRNsFCNMlQu994UxBTK5LtovXxbL5H39l+kn3laYF7gwBEhuFXLbJF/fG3Tu55ePCr+09qXKRipCQBSNjap3vOzBf144W8Omrr9n0vqy8qH3+MZtr7vLc0rOxvd15uE+zX2wS34JpCjCcvtfutjKzd70gVbIgbus5UL7iT4r0pC3w1L+0LyNOZ2XLu8cGrDziqQWGKEZIEIEFrnpz54VwGP3EcTOobGPl6/zAFBlvYG2vzUUNeOWhdnx6XCJuD2FkjJwYK0VCE+oN6ccVnb4TtfkcqxxF63Yn6+s6zoGzYkOS+OmjhuuqwbM79Vf/V3fMa8JFihCQBSMi6p7u/2N5GtzKTW6mOfL1/2HDZ38/Do+1jwVFOq97+d+YowrKKrwYjY7QsBQjREK4ibAiieL0XqUyLv1f1skAPd3WcqP6cm2nze9sb4FXQUL8AV6OzkKcHq9dP/+i+RypGQhKAFrvnnVAbnum5tbPD+UK1xvD3YbPfzlwyGLB5c0t1HinVnLK/3RlqE6wWV3xW0iZYiH32UrvfQZ9UC6f+d+ayQVXn1OUTz4YdYVngK720OZChCwXn5uoN3V/c90jF3pLdmC30xE9mlo9a0HFfR7s+b3ufgbWNOY2JAXRQDd/2Tzf3+W91yjTyDTv7ShOhP7Ioudp2ZbQyclaQECPmKsLzlcBsCmInySqbLMdYlD0ARwYbzeuCXh2Su8/PLgJgLMAGyBX0qf94VtsB9Mb+h37960ZELPaEzAC0yNKF06bOmMo/7yjrs7du37MjfPdUniKssfvF36idqQpNLvvbE7RTm2BZChBiZFxFeDGI4zXVQCW9r4bA0LDqignzVFXlR1wW+Gpiy/CrBvmSvvT/mdL9wxe+un+hYR8uXpMkAC2w5LczDmvLO4+UCvqELdsa98UZlkVob6+ehRds1z4d9dsomoBKbPXSis8KLdyJKMQYQTTU7rfigQmp2FZbtAGezffob7efvE9lga9muEIgV9LndhZzP9v4n/tPbOgFxKuSBKDJlv5q5vEdJf1IPq8O277DNGS9f2cl8vH76CD7A//Nqky1BFb+X91QzbJ6MYylKkCIveQSYUU1sNtD66Spt0bR+rih6wy1wd1vr04L3FO1QYNsQZ80sSv3yx1XdXc3/ALir0gC0EQrfjv99PYO/p+MQ1P7+ve9zO+VFBiWyd5cmwcPOaVT9LJNALjeG4BCy3JioBB7yCHC9tCYldWwoSf9NUKOY6x3J+jrO8/iRpUFvlKtYuDm1OsLeXp04Jrpr2vCJcQQSQCaZOXC6QvKRf1jR6mOgUrjB38GUCYPPwvfYB8Lj1JJbvzbFYeo3ia4GrBDKcpOhEipoXa/dnHF5wjc0JP+GoEBtNsa7uo4Uf0hfzDnrd+U61QrFpkMzcxl1SN9V0w7vikXEZIANMPqJ7rPL5ecH5CiXKXW+MEfqJf99XPe3FKdSxpWJVH2tydcRVhVDdT2MOZmHV4ixFjhKsIaL7Sbg1il9WwNhy08nVVXTJgPy2hIWeArEQHVqoXrqsmFovPTgaumndzwiwhJABpt9e+6LykU1HeZ4da8xtT4v5oyPNxdOxnPme6mnfbXCAQgAqlFFZ8ts6GUPtSESJomwmBszbJq0NJ2v3tr+LTAX5SOpB+3vZFzpjlNx15uGEQTcnn9k8FrZpzahMuMa6m9yUajVU/0fLS9TX+TLeD5zRv8cxRhldnf3OGfgWKKB/9hLgEvBsZZU4vYlfFfiL8x1O7XLql47JnWtvsdieGywCsnzENFF0ymgWWBf3UdAqq+hauplMupH/dfM31BUy40TqX9Phs1Vj3Rc2lHWd0chAw/aN7gD9TL/m6rnYVNtktnETfvQg1UbxPsqQFpEyzE33AVYb0f2fVepDKjZKmsaAP8Kdet7+g4GW6DywJ3Vk8CGJpQyGfVfVVJAhpGEoAGWLWw56MdZXVLEDKCBrX23ZUS+fh9fLB9wH8zpansb3cUgIChFld8JjkxUIiXKCJ4hs3iQZ8UqVH1TC7aADd2nk7rM/s3pSxwGBFQCxhaUSaTU9+XJKAxRtXNlkarFvZ8tKO9/ubf7MFfgWGY7A2V+eQjm6qyvz3hEmGjH6v1gfQGEGKYQ8DSiscVY3Xqtv3vRo4jbHAnqGu75rC2YUNam+8KEeAFDEWUzeTU9/uvmn5OEy83LkgCsA9WPdVzaUc7tWTwHy77ezh8o308OkKXqNa8izWRUqSWVHyqxdImWAhXETb7kVlbCxNv9zsSDKDd1HB32wnqmfwhplllgcN2TgIKRfW9/mtnzG/qBcc4SQBGaNUTPe/rKNItQYimD/4AkIHBDlu0t1TnkQPb1Ey7mTSAirF6aVXaBIvxTREQGWsXVXxmolE4/NdpWHgqqy6fOB8W1JSywJ0NJwEalM1n1L1SHTBykgCMwOrfdZ9XytMdQdSawR8ASsrD3f7b7OJ4us6Pgp3/r8UlQq8XqRdlKUCMYw4RVniR3RGlq93vSLRZD78sHqEfKr/R5kzzZyeH9wS4GsVcXv1o4Oppb236RccgSQD20rKFMxfkC+pOBhA0ebf/sBxFWBlPNt+unaoKqrlTbK1QbxNM6vmKT5FlIzmAGG8cRdgexmbloD8qp/5ficBwYXHlhHk0oIvW5eaUBf7VNYeqAxyFci7nPNB3zYw3Nv2iY4wkAHth+e+6T2kr8PcUwWlmnf8r1cv+ZvNm7lSjpexvdxwC+iKjl1cDHu1vP0LsDQLAlu2iis9xSk76a4SCDfDn3Az9rY63Wde2pjU5EVD1GK5LE/JZ9ZB/7YzDWnLhMUISgD204jfTjy0X6H7HUblmdvh7pRL5eDo8hB/w36TK1JyOW0l5uU2wiaVNsBgv6u1+I/tiYJy0tvsdqZL1cVPXGdSbmRznmlgWuLPhjoGZDE0hV/1k2+UHTmvJhccASQD2wMonew4pFvVDGUd1VKrN6e3/ahQYMZO90ZvPATKjruxvdwhADKjnBz2ylq20CRZjnUOEgciYpRWfxmLSm+UYm5wOfW3XbJCNWtbvY/jsgEyODiwUzI/7rpja2aJLj2qSAOzGol9Nn5xz8eN8Tk1uxql+u8IA2lQND4fHmceDw1Uphaf9NYJLhC2h0au9yEqbYDGW1W/v+kl/Pqe/3e9IMOobAu9pO0E9kz/YNrsscGdEQK1qkSvo1+cK7v29l0/Ntezio9RYvAcb5rlHZxXbivpH5ZI+pG+gdYM/AGTIYJspmZurc5Sr7Bh8V3iZowjLKz5Jm2AxlrmKsN6LeKMfqcwYvs81WwQ6o66YOB+mBWWBr1SrGGQL+m0Tc5nvtPTCo5AkALvA90C1l/zvdbTr47fvMC0d/BlAiTx813sbL4mn6TxGd9nf7igAgWW9uBowQdoEi7FHE6FmrFlSCTDa2v2ORNn4+GXxCOfB0httzra+aZk3aJAvq3dWrp9xQ8svPoqM+RtxpHp7er7e1annbWvx4A8ABQqxIp4c3+mdTiU1tgf/Ya4ibPQitc6LpDeAGHM0AUsr/qhs9zsSL5UFTpxPA6pkWlEWuDMG4FcMimXnf1Wu6/m/Lb34KCIJwKtY/WT3Fyd26Q9t29HamxaorxO6iOxttTnYwu06M0bK/vaEIlJLK4G0CRZjiqsIm/zI9NaiMVHzv6cKNsBfctP1bR2ncqvKAndmGQirBsUC/Xvl2u5LWh7AKCAJwCusfKL7g53t+gs7Bgw4gZq7Ivl4KjrU/mgMlv3tjqZ6m+Al9TbBQox6CmOj3e9Ila2Pr3edRmsyU+Ichy2/fmSBOGJkc/T1waunn97yAFJOnrM7WfHb6aeX8uoW32fErX/5hwIjYmVvqM5HgIxSY6zsb0+4irCuFqnNQRyPp7clMTY5irC8Ftq+yDrOOLydsxxjs9Ohr+2a09KywGEEIIgYDsHN5NT3Bq7qntXiEFJNEoAhK3/dc0ixoO/VGo4fcMsP2xku+/tJcKxdGB6uymO07G93CAAT1KJBj0LLRslSgBilHEXYFsRmVTVQY7Hmf08wgHZbw73tb1JPFw5raVngsOGWwZmM6nJz+CHfMKOj5UGklCQAALY+MbOcLeAH+byaUKm2rsvfzobL/r5em0suxQrjavL/rzlE6IttvU2wnBgoRiGindr9AmN/2/9rUGwRKld9deI8GFZWJ/Bse6lHQF7NqjHdk8TybhqN5/vyJTXF3+lo10f29be21n9nRXj4jn+qXRpP03lq/VpZ2riKsLoaqG2RseP17UmMXi4RVnuR3RKOvXa/I1E2Ph4rHKHubzvOZk0tmdcbAmoVi0JJz65e131dEiGkzbhPAFb/rvsrE7r0giTK/YblKcRKMyW+s3aqKo2B0/4aod4mmNSi4TbBSQckxB5yVL3d77Ix2u53JOplgUZdOXEe9Tllk2lxWeDO6uWB6rKBa7o/nlgQKTGuE4BVC3ve19Wp/2FHf3I3I1Av+7tlHJb97Y5LwJbQ6FW1UHoDiFGBAICH2v3asdnud6QKNsDi7AH6to7TEikLHGYZiANGLkfXDVwz7W2JBZIC4/b+XPGbmcfm87jFS2jH/7AS+XgimmUf9N+k2iihqbEUG2oTrAZiG8uxwSLtXEVY50V2ox+pjCStf6NkfdzaeYpanZ1qkigLHBZEDFeRk8k4d2+9ZsoBiQWSsHGZAKx/ckpXLo/vZbMql8SO/2EKdrjsj2I4qtU9s0cDBSAE1KIBj8AsGwJFamki1GJjl1R8Umpc7/vbpQzHeNFpV1d3zQbZOLGlvXplgEUjk+VjAAAgAElEQVQ2R1PyOnPP0zcd4yQUSqLG5U1qkP12R5uaOTCY3KY/AGhTHh4KjrdPRLP0WD3trxFcIrwQxNTrx1beqkRaKQBLq4GtGtY66WBSrN14uK/tBHqycJjNJ7gUMFwZUCjrt74u2nZ1YoEkaNwlAKuf6P7SxAl6fpKb/gDAJYOtpmxurc0hl2Tdf3eUIrW04lNV2gSLFHIVYXMYx2vHWbvfkdCwCMlRX504n2LoRMoCd+ZXDIol/X/6r572gUQDScC4SgBWPjnz7LaS/re+gWQ3/QH10/7u8k/j5eYAnYeU/e2OBlA1Vi+t+KwgSwEiPRQRQmPtogGPMA7b/e4tBtBmPfyq8Dr9g7bjbda0/rTAnVkG4pCRyzk3bL+2+/WJBtNi4yYBWPXb7hl5l79lmRFFycaSpxBLo6nmrtopqkhS9renXEXo9SK1KTBSFSBSwyHU2/3GVo/Hdr8jlUWMqyfMox1Om8lwsrOgQcjIuJTPOfxdvr6jmGgwLTQuEgBmkHZxV6moJlRryXT6G1Y/7S+2t3hzeSu3KSn723MEAERq0aBPobXSJlgk7uV2vyFJUrp38jbEkuxUfVvHqewk0CJ4Z0RAzbPIF53Dq9x+U6LBtNC4SADWPNH9XxMnOCftSLDT37CS8vDbcBb/xD/OkbK/vecQ0B8bvawasrxtiSQRAGvZLqr6bMBabse9V7Yebu08Va3MHpBoWeCw+n4AdfHAdTMuTTqWVhjzCcDq33XPK5f1P+7oS37ZWMEisI69qTofMRxI2d/IDLcJ3hLERt66RFJcRVhdC+2WwChp9zsyGTbY4rSpaybM4STLAocNNwnKuurq4IYDjkg4nKYb0wnA6idn7J/J0O0AI46THWzrp/0Nl/0dJmV/+4AAWJBaXPHZWDaUWCcHMV45ROiPjFleDchRNKafo800fFrgfeXj1e8KsxItCxwWRIxMhgqGnTvtNTMyScfTTGP6xiWo29vKenJSJ/ztLEsxXozb7K21OZRVsu6/rxwCtobGWVUL2R3Td7FIm/qjhO3iQR8BS7vffaWZEStHfXXifIRwrE74AFAioFazyJf0GypEVyQaTJON2Xt35cLuT03s0vN39CVb7z+sCN/e6Z9mV5ipUvbXIMNtgvtDY+TQFdEqw+1+Xwgikqn/fccAysbD44VZzn3lN9msSX4WAACCqkG5oC7rv6rnnKRjaZYxmQCseqL79YUCfXmwYlOxyl6gEIvjafY73ilUIi8VMY0FCkDIUIsqPiAnBooW0ESoGmuWVHxSJO1+GymLGNdOnEPbnfbEywIBILYAW0Ymw18fvGHmpKTjaYYxdwM/99wsVyt8K59VmSBMfqglABqx/XptDnZwWbtIvgnRWOIqwqYg1r1+JL0BRNMpAEsrPlcNa9n231gFG2Jpdqq+NQVlgUD92e0FjFxR7Y/YfD3peJphzCUAxUHv/53Y5byhP+E+/8PqZX+vsz8JjlNlKftrCqUISyoBVaRNsGiioWQz7pV2v03BqJcF3tZ5Kq3IHBDnU1AWCAK8qkWpTZ87cO30jyQdTqONqQRg1ZPdJxeK6h/7+pMv+QPqPa9969ibavNgoOW0vybRAGrSJlg0kSLU2/0OegSCDP9NkmGDrU5ZXz1xLpCCskAA4KHSwExGXdl3zbQDk46nkcZMArDhmcl5R9GtrkOIEi75A4ayWeXhoeAE82R4mCNlf83lKsI6P1Ibg1iWAkTDOURYXgtNf2y0I7NMTcMA2k0NPygfr35TPMLkbTr2TAURI5tVZVfpm5OOpZHGTAIQxtn/b0KnPnSgko6p/yzF2Gzazders5WU/TVf/a+c1OJBnwIjbYJF47iKsLXe7le5su+v6RQYhrT66sR5FMKxTgom9Qj1pYBCmz6z/+rpn0g6nkYZE3fz6t91n1IqqE/t6DepaQlTgI87vNPtSjNF56TsryUcAgZiq5dXQ3aSDkaMCUSAsWwXVXy20u63ZcrWw28Lhzrfb3+zyaagORBQn52IPYtsVv+nd8OMmUnH0wijPgHoXTg1px3crDUhTsmLdoFCLDHT4rtrJ+uySsfNO17U27MGamtkYlkKEPvKJcIqL7RbQ+PI1H9r5TjGtV2zVVrKAoGhpYAclUxMtyQdSyOM+gQggvvvEzqdwwZTMvU/XPZ3c3Uu96GsHCn7a6nhNsHPD3qILZtRf4OLxGg11O63EpA0mmq9vA2xNDtF39J5uk1DWSBQnxHyqhbFNnXmwDWj/8CgUf187H3qgOOKBfWZvgGLtMz9l8jDb8LD7cPBsbpMtaTDGZccArYNtQmWB7cYCQJAzHbRoMehlXa/SWmzHm7veJtelp1u8jZIOhwA9aUAEzBcV325euO0qUnHsy9G7X19zz1QgHtjLks6itKwT/Tlsr8ba/NhoKTsL0GOIqyo+KovjI1M3Yq95SpCrxfZFwIjNf8JyrDBNqesrpwwF2CTirJAAPBDRq6gOm2ork06ln0xahOA47tnfLqrSx+XloY/w2V/94dvtk9HhzolSseU1XilAISAWlQNmFnaBIs9p4lQjevtfrWc9Jeo4bLAB8rH0a+KR3BaygKJAL9qUCrrd1ev73l70vGM1Ki8udc8Mb0n66ovVirJl4cMy1KMTabD3FabQ1mKkg5HoL6Ba5MfO9ImWOwNRcCSis81w1onHYyAAsOSUldMnI8ArnUTPi1wmGWADQNkr+HrZxWTjmckRmUCAFJXtZVVyQ/SkAvWFcjHHd7pvNrsL2V/KeIowlJpEyz2kKsIm/woXudJu980KVsPCwuH6u+1n2AzJj17q7yAUSg5PVVT+2LSsYzEqEsA1j7Vc057m35H30A6pv4BoEABng9nmLtrJ6uydPxLFYV6m+AlFZ8VUvLqIFJJESGwbBZVfBCRDP8pk+cI106YQ1udztSUBQJAWLPI5OiTleu7j046lr01qhKA3oVTc8y4yhjApuRRTmBoWHtLbQ76UVJy2l/6uIqw3oucDbIUIF6DQ8DySsD9kXWk40/65G2IFZnJ+ubOM1JxWuCwyDBcV7mwfE3SseytUZUAGHL/adIEfVC1lo7RnwGUycevwyPsz8JjSU77SycCACIsqfgUGJY2weJvOIqwJYjN6logU/8pxaiXBX6j82S1JNedmrJAAuDVLIplfcrgtTMuSjqevTFqEoC1T087MJtVnx8YTMfgDwAOWdQ4Y2+szSMGSdlfijkEDBirl1U9dmQpQOyEsHO7XznpL81cNujTRXVl1xyAbWqqexiAjRiOpv+218wsJx3Pnho1CQAb56vlksoHYXoG2TI8/NB/i/19dIguStlf6rlEWFOL1JZQTgwUL3MVYVUttNuk3W/qMYA24+HB8rH60eKRnE/JOQHAUG+Akp5Whf3XpGPZU6MiAVj71IwzymX1rr4Bk5qNf1mKsdF02ttrZ1KOZNf/aPBym2CfYmOtLAUIhwh9oTHLqwFJUjg6KDBYEa6YOA8+XOukaEIvqlm4GXyy/6qeQ5OOZU+kPgHge6CY6XJF6dn4BwB5+PiWdxqvsfvrHKTuf7RwCNgeGb3Si6wjz/txjQAw2C6qehyxnPQ3mpSMjycKh+h729/CaSoLDA0jm1dZpe1Xko5lT6Q+AVjb0/OhiV3OGwZS1PSnQAGei7vN97yTqUzp6Ewl9txLbYIjE8tZAePXcLvfTb5RrswGjTp5jnDdhNl40elKTVkgAfCrFsWCPnfw+umnJx3P7qQ6AVj58542RfhSzUvP4E9gKFh7c3Uu+lGUsr9RSAGIAPX8oE9spU3weKSJUImtWVrxySFp9zsa1csC99c3paws0HK9VbCy6iv8r2k5pu7VpfrGV2X+3IQuPbXmpeMdu97v38dj4ZH258Ex1CZv/6OWS4TNQazXetIbYDxSeLndr/z1j04MoN16+FbHSWpRtjvOczrKAgHA8ywKZXVsdb/pFycdy2tJbQKw/qkDp7kOfXogJYf9AIADi4rJ2Btr88FEimT4H9UcIiytBlSJjbQJHkcyirAxiOL10u531HPZoN8pqasmzgOstWl5JjMAjgEi+ne+eXI+6Xh2JbUJQGjMFzraVSktZX/1t/8a7g/eYp4ND3Kk7G/0UwR41urFlYBJegOMC4oIvmGzeNADpN3vqFcvC6zhwdIx6pHSkTZv0jMr6wUWhTbdUw0ylyUdy66kMgFY++T0w3NZ+kD/AKfm7T9LMTbGXeb22lkqr6Tsb6xwibDei9QGP7IZGQ7GPIeAZdWAB2J2pApkbFBggEhdMXE+fMpal9OTyxufoTR9vv+6KV1Jx/JqnKQDeDWW1ZfKJeVs25Ge6f8CfFzjncO9dj+ngypJhyMahAAoR6tlltTkQgEFR8NyWt4hRCM5ivBCLUQvB47r6HTVFYt9UrI+nswf7Hy348TogzseUbFOx+m8QcQolPVEM5j5BwD/nHQ8r5SS4fVlvU/PPD6TwRNRxCot388iBVgST43fv+MzypBWjuz8HxuUgi4VYCq1MIjix49qyy8/uJhRUUruO9E4BMAh8JN9NXohiI/MZtwTKZ+FrdQASfjGBJ9c7B/3m5/2fgVdpqZDSsf7bcYhxJYHrbGHFf9+3QtJx7OzdPwX2kls+IsdOaW2B5yK7ITAAFt7U3UeBlFQ7ZADf8YCVciDjYGted+A5cvXL3jfovVJByVa5sCf3X0iecE/qkL+7TAG1vORmulGMSJ5jrA6s5++oePM+Atb7rXQpVQscYcxo1BS5eoA/gXA3ycdz85SdceveqrnbeUC/cr3ORWzcwygXdXwS//18WX9H1cFFcrO/9FOK+hyGbZS/Ytl+6lVsy94JOmQRHIOevi77yVHfUUVCt1mYFBmA0a5mDQUG/vg2ivt4eEGx1PZpEMCALiaYME1q9SswsdWr0s6nmGpyJBewvxvGYdSMfgDgAuLqs2aG6vzCVL2N+qpYgHKdWEHK1cMvhC8WQZ/sXLuBfcaExxvKpU7VbEAlcslHZLYBy4bDOiiunLiPICtTcsJrVG9RXDBhvZfko5lZ6mZAeh9qudthYL6ledZ2HT8naFDVfCt2pnRlwbPdztUNelwxEgwgzIZqEIetub9kaPoH1fOu+h/kg5LpM+BP7v7PKXVf6lifqatVMGRSdETUuwpC0KNMrhzw43xmdU/O1VVSMVfo6sBwwhh48Pzl21YmXQ8QIpmAGLD/+Y4SM3gn6UY6+MJ5vbamVL2N1oRQXe0AcAOW638k7P9uTfJ4C92ZdWc8++pbes/1lZrX2GiQLeVJAEYhYbKAvHVifPhqZxxU9LiIzJArqAysdWfTTqWYam4vdc+0XNSoUiP+0E61v4BoIOq9j8r77G3enOcTin7G3VUPg8QYMPwO4j4/66cf8GqpGMSo8fBP7vzaNbul3UuN8eGIdgPZJPgKLNdl/DVTd+NP7zjF04tJWWBriYYcI0NXle4bG1v0vGkYgaACf+UcdOz9l8kH3+MZvK93kmqjdJz1KTYPdIauqMNNo4W28B/+8qzzr9IBn+xt1bMufhPK888b66tVD/ExrygO9sBlYrHpdhDRQ5wfdeZapM7wWQ5HUe2R4aRK6iCtfiHpGMBUpAArHzqgOPyOTo7Lcf9Dm30szfV5qKKvHJSMn0kdk8VC4BSxgzWvrJt+5bjV86+8MGkYxKj24q5F35DVyvH2krtGyqbhcrnkJJ9ZWI3cjbC2swk9bXOM6Bteg4Kij2GcnBJ9brpU5KOJfEEQLHz+XxOpeLtv97v38Mvg9fbR4KjqSyn/aUfM8ipv/VzGD1lg/BtK2ef9499771Mdm2Khlj2jo+8sOKs8z5kPf/tNjYrdGebzAaMAgygzdZwZ8dJ9JfcgaaQkiQgjBn5oipbUOI9ARK9i1f/vntWNkPvSMvbv0sWgyZnb67NIyJI2d8ooEpFMFFsKpUvlldsf+uqsy9emHRMYmxaOe/CB71t/W+yleotKputlwxK34BUc9liUOfVlRPngplTUxZofIZWdGnfDTM6kowj2TQ2wmfKJeUak46/lDJ5uC94q/1TNFPLaX8ppxR0RztsGD7LQXTKyrMu+NKzH/94nHRYYmzbeN6lO1acdf7HbOi/neN4je5ol82BKcYA2o2Hn5TeoH9WPppzxks6JAD1MwLyRT3RsfhIknEklgCse2LKAY6miwYH0zH4ZynCuniC+Wb1DCn7SzNmqHwOKpuBGRi8ytu27kR56xettnL2hQ/aqHK8qVTvUqUiKJOR2YCUIjAUgCsmzENV5W1a9nXZ0AKMy3ovn5pY96nEEgAD9+OdHboQxen40uQR2tu8s3g9T1I5pGPHqHgFQn2tPza9se8tWDnngs9sPO9zMlUjErFq/oe3rpx9/sVcrX0YzH2qrZx0SGIXitbH7/Mz9V0dJ9mMSUdlVxAyiiXdPTGv35NUDIkkAFsWH1oiTR+p1tKRiRXJxx+iA/kH3olKNv6lEDPIcaDbyrDV2g+C/u0nrJ578Y+TDksIAFgx54Lbyffewr7/uJQLplfRhrih83T1gjspFWWBDAAGYEufSmryKJE7tVYJL+xqdyb7QfJDbf20P9ibqvNQRU6O+k0bZqhiAUwUmb6Bz6046/x3r3v3xzclHZYQO1u+4JIlUx5fdJrtH/iqymVB2awsCaRMjiP0Ziapr3WdxdqmY5nXDywKef3GynUzzkji+i1PAJhB1vBlYZj8l4MBtCkPP4+Oto9FR0nZXwrpjjZwZJYbLzh95fyLr0g6HiF25fEvfcmsmHPh52PPezdbs1XLkkCq1MsCPdzV/hb15/yBpmCTXz20DEABRPSJJK7f8gRg9VPdZ7W36aOqXvLT/y4s+k3O3lyZRwosZX8pQlpDt7fBVmr3220DJ645532/STomIfbE6rkX/cB61bdY318oVQLp4rJBRefV5RPmMzNSURYY+haOxrz+G3oObfW1W54AEOMyrZKfHas3/anh+/5J9i9xjy5QOppEjHvM9enTjIt4YPALK2af/85V5314a9JhCbE3Vp/zoRXOdjrVDA7epMslkOsk/9AT9VkA4+FnpaPUw6U32DSUBcYWyBaVq439WKuv3dLUdP2TPYeQg+cZcE3CS+05irDZtJmLdvwD+lDSGdn5nzxmqHIJHIQ7bBh8aNX8992fdEhC7KuDH/7ux+Hqa0lr19Y8mRFIgarK4Qh/nXlg3RVwmXVMOtF4si4hiOyWgqsOpo+tGWjVdVs6A2DAH2lvU4kP/gCQRWhvr53FG7lLZ2XwTwXd0Q72g78Yzz9ZBn8xVqyYe8FN7IWz2ZgNUiqYDkXr4w/5Hn1n+8k2Y5OfBQgiRqGkJ1Uj895WXrdlCcBzj84qAnRxtZb8NFiRfDwbHWh/6L9Fyv7SYKirn6nUfhRVaievPuf9zycdkhCNtHLBxY9RxT/Jet6TuqMtJQexj29FG+CGzjP0RndSnIayQMQAW/poKy/ZsgSglAve0dGhpiZd+qfAYIa9qTYPNeTktL8kMer1/aUCzODglStnn3fu2nd+sD/psIRohuXnvn9NtdZ/WjxYvVu3y4FCSctxjHWZier6rrNY2dAmnZP5gUU+p47vv677za26ZsvuQCZ7adIn/g2f9veL6BjzaHCUI2//CWIG5TKAoxEPDH5i5ewLPpt0SEI026ZzP+atmn3+BWZg8L91sQByHDleOCHDpwXe1X6i/mP+IJtPuCzQMqAzBAf4cKuu2ZIEoPepA47IZOikajXZDMAlgwGTNzdV5ipNDCn7S8hQcx8AFVutvmvVvIuvSzokIVpp5ZwL/9lUKpfB0fVEWCoEEuGyRU3n1BUT58GmoCzQ+Awifre9bkpXK67XkgSAoT/QXlbaJDj+M4ASebgnONk+F3dL2V9Shnf6x/Em6wVzVi245IdJhyREElbOvehrplp7D4CaKuQlCUjAcFng/xRf7/y0fIzNmWRnhYOYkS/pzkBn392K6zU9AehdODXHTOfVvGRv7jxFWBPtZ75ZO0MV5LS/ZDBDtZfBQbCMPO80OcVPjHerF7z/+3GlNs+aeJsqFSUJSACBoWFxxcR5qOiCcZNuB2+A2NgPtuJSzZ8B0O7cjjY93Ut4818Wob3dO4s3WSn7S4ruaIOten8gzztt+YJLliQdjxBpsObtl/w6GvTPtGG4TrWVJAlIQNEG+GOux7mj/WTOJNwcKAgsMo46oXJ999HNvlbTEwALXEKERDe6lJSP30cH2R/6b1ZlqsnKfwJ0RxtMpfZrXQnOWn7OBzYmHY8QadL7jkv+aL3q6ewFy1RbWZKABBStj5u6Tqf1mf0SPS3QWCCTJ0XMFzf7Wk1NAHqfPWSqUnRWkrX/Cgxryd5Ymwdfyv4SoTvaYAYrP3f7ts5f9q5LticdjxBptPqcD60g3zvN1rzndUebJAEtluMY690ufW3nbGgbJtqqwYYMBt6z+hvTss28TlMTABuG7+5s18UoTuZGHi77+1nwBvvr4ChVkrK/ltMd7TADlYfcPn32kvdeVk06HiHSbPk5H9gY1ipn2WrtmXoSkHRE4wcDaLce7m5/Cz2TP9gkWRYYhIxiQXdPGlRNPSa4qQkAMy5MavAHgAwZ7DAFe3NtHjlk5bS/FqsP/oMPuf36XUve+17ZeCHEHlj3jo+8QC/2zzUV7yndLssBreSwhaez6sqJ82FBiZUFMlA/JljhwmZep2kJwNonpx+ecen4WquO/aWhXwpgDViHUNAe7vHfZhfF3TovZX8tpTvaYAYqD7r9i2XwF2IvLb/oY9t0xZ9nq7VndLssB7TKcFngz4tH6h+X32hzQQ0UA2QA4vqvVjEBg5jm9V0xtbNZ12jiDIB6T3ub1g09+GenQR4aYAewDmA1LBMMLGLlwbh9HHZsDMymdZP9O2qnqaJKtsPTeDP05v9zt1+9e8l7/10GfyFGYNm7Ltkeht4CU6s9LxsDW4fAcGFx+aS52NJTDOL9TRy2IYoziK2CgYWhGJZiQMWAsgDZxicH9Z4Aqku7zvzGfvLLnGZ8KDNo9ZP4uxH1/aed/pcAppc+05IFyMCqCKRCNjogrQM2yofWAawKoVQEUAwnH4f4r/3PcDdN6lSdVpaeW4J5ePB/fFv/9nf2vfcyGfyF2Ae9Cz64ecp9t8wpgh5V5dIhdrAixwm3QMEGeE7PcG6bcgr+V+4naocpQRtYigAdsFEBtBMiIA+ODtmokLQKwcqCYEE0/HKthqbzdxrL9pqi8wHc1aAf7a805U5a++T0YzNZ55k4Zuyy/z+9/MtS/beWYdXQIE8hlBNxTD60E8IoH0r5gI4AFYMQgRRD0U6fx0O/CuzjD7kD43fM+KTSzErLzv/mG2ryY6veH7wdg2duPO/SHUmHJMRYceADdxxEhexjKpuZZitVSQJaIISDMmr2rs4reKreoX249XFmp3lzZlhYQMVgFQMqYKsDKB2gniQEbGgoOSADRRYgekVyoHa91zPjECLDgyZSB5c/tfrFRv+MzZkBgH5Xuaiwrc/Uf7jhwR4vD/LKwlAEpUM2yofSPlgFgA5AKgQoApSBJgtNgAbwchZF9XV+xt/+h1NgGCb7lYnzyVNZ1WGk7r/phtr72pq/QtcqC2TwF6KxVp37/pXdD31jgUv0qCrkO23NkySgyTKIsZk71W3e7Pg/St+2PrsKXJ/uH0aAAgFwAOsCpkg6AsCArv9ZApmhF9f6zAHpALHyoZ0ARkXQFILJQsEAiqAYAA0lBVHMyBdVuVox5wC4rdE/Y8PvoHsY6vhne/5UytKR3iDHFIGckK0KAe0DOgCTD60jWAqhlQGTrQ/whJ2ShRFOmRRMDQ+0vSn+yNQPO23Wk2O3m40ZqpCHjeMXo1rtbb1v/+DSpEMSYqw66KE7T6V89mEAWQ7CJs3himEWCobJ3tp+LR+bWaUrnNu7D9hpSXt45oAxtF+gvpeAdPxSYsA6ACsPSoXgoSVtLmaV4w2anxY+09vwvQANv3367u45TjlYyFV2KUCkImhq8CC/Ky4beOTYBTM+xyuyk3XBys7/pmLUTzKz7Nlq9cxV535QevsL0WQH/fhb71XF0j0cReA44b71YxwBGOA8TnIXmRvbv0YhMso2atgc/pidlwL4b5ODTEwue9jhkTm8Z966TY25+EuXbiz3RXtuuZ9ctw9wfLjKQkFBs/Pyrn3W9WyokYM/ALjWwzc7TrHP5abL4N8C5GqQVjBh8D4Z/IVojZVnX3JvXPU+qwoFWQZoMgZQJh+/CQ/XPwvfaMuqgUvKw2vYZqjMsL6/rf57QMOBMgVya+1A7jDdyV1qTqMuPayhCQADsIQF4OYN8ruS4whrM5PNzZ2nqlKCHZzGDSKoQgF2sPq51fPfd1/S4Qgxnqw+++Ir476Br+mOtqRDGQcYDlncXJ1HO0zJZKgFsy47JwcxgIihiM5t9GUamgCE1x90uOuoo4KwtbvuCYCyIa7rms0vuF0qy3FLrz8e6Y42xP39t6xc8P4rko5FiPFo1fyLLjN9Az+TboHNl6cAi+Pp+rv+KbZIrT8tsOYx2PJpvc81tilQQxMAw9G8bJ60aXHVXd56eDp/aHxP+5tVu5Vd/03FDN1WhukbfGxVbsX/TjocIcYtInj91QtspbpclYqSBDRZSfn4dvVUvTKeHOcobOm1w4jR3q47TNU9pZGf29AEwALnoMV7UhQYMbS9fNJ8BMpVDkvNf9MwQxULMLXaOhvweTj9S7IDSYgEbTzv0h1RaN7DYVSlbFMPjhv3MojxIjrUbbXZnEHc8oFGa0CBzmnkZzYsAaheM+UAIrwpCluXhTKAnKnhR+Vj7SOFw52ykdP+molcFxzHEYfx+avPvbDhTSmEEHtv7YKL/2Rq3qWUcQHV1PPdxrX6hkAPD/gn6KejQ2ypxS3mPZ/BzGeufqRxRwQ37G5h7Z5WKOp8ZFo3BGdg0K/L5uoJc8lFw4ozxKshgirmYT3/s6vOvlh2/AuRIr61MZIAACAASURBVKvffsl37WDlat1WTjqUMU3DIoSrbqzOg2Fl/n/27jxejrLaF/5vPU9VV1d1770zEIYAmYMBUVEkoiAyyOzsUTwqzsjgeI94zzn3eq/3dXjPe171OCuIxwgIEoSDDJkIhHmSSRREpgRCmDPt7t49VT1r3T82UYaE3b27q6t3sr5/oZ9d1euT3Uk99TxrMD2cDtRoCMLQzKCieUO37tm1BQABx3TrXq3yXQ2LJr1NtOwvZQLYoQG4TaXfrn7Hx36cdThKqZd7bdn/SjJcutkOFDUfIEVFquHG5j7ekvobZIB6l3MmAhRCA4Lt2rO2KwuAJ87cNRSht3EPt//z0sRjud2SX0w5jLTsL0UiMIUQrjTysBsZOSXrcJRSW3fJCScwVZsnulp9mPKaD5AWAuAbh19Uj6WNbqA3ZYHPayYCET6qW/frygJgsvP3DwPao5n0ZgFAAIhj/sGUo/GMN2S17C895HuQOHHC7sRHP3hyKet4lFLb9sj7PrFaGs1TjK/5AGkK0cQDbg97Xu0QKaJ3ZYG1msAQXv/knTNndON+XfmGCJu3mxyBe7QBEHINt0UL+HdDC80Qa+JfmkyxAK7V/s/qYz9ya9axKKXGtvodJ17gSpVf20E9CkhTkeo4r3YYPeR2S0LqzeTzxAmGBm3QbMpbu3G/7iwABIejRy/hFoJELH9np+PQNL6xWvaXjucn/CWbhm9a/Y6PfSvrcJRSrWOSL7pSeY2JoqxD2W7lkOA5GbK/rB4FH73rfkcEwNCR3bhXxwuAyhl77krAG5I4/ZWmAAhcFZcOvpGvKyzwBrXsLzWU8yH1+giTfEr7jSs1saw57sSyOPcZQPQoICUCYJBquLy+0NwWv4oHetQhsN4QQOiQe+9d4Hd6r46/GeTMm6PIFJo9KP/bUvb3/anHUE7f/FNlChFcvfG1R4898cGsY1FKtW/1cSeuciO1n9rBYtahbLcMGDF887OR46gplk0PXkkbTYGfo9mFavXVnd6r4wWACA4dHfSbPt/V8KvJh/Jf8nto2V9aRGAGCkg2Dd+05viP/SDrcJRS4+fF9X9xw+VHTdjmHHvVsiLVcHNzb3tF4wAe7Oa0wG1gBgaLBIE5pNN7dbQAEAAkcnAvzv/z0sTq3HT3i8mH6bS/FJHvgevNpsTJqdpZSamJ7cH3fKbCnHwBxgBG/0KnJUcJflk9mtb3qCyQGTCCbBcA9R/tOQuEfZspn/+Plv0l/P2pR+NZb1DL/lJkikVIs/HdNe/+xJ+zjkUp1bk1x33sCleuXKgNgtITUhMPJrvb82qHSrEHuQD1hgDAgU/csWvYyX06WgAkBgdEkc0lKZ//h1zDrdGr+L8GF9Kg02l/aTFhHm54eE1k5dtZx6KU6h5xfLqrVEuUy2UdynaraOo4r3aoeTCe7sKUpwU2Y0GQo93rEu7byX06WgAQzMHdnSf4chaMGB5/Z6fjKTaesfr4TwcR4FmQc6ffe/THqlmHo5TqnjXv+vjj0ki+bQodvTCqV5BDgg0yaH5RPQo+Ek7zwIUZKBQInsibO7lPh49veXPa5/+Bq+GSwTfy9dECO+h613FpR2OLBbjh8sqHj//Yf2Udi1Kq+xKz4Qdu8/ADJtRFQBq2TAtc0lhob24uSP0oQBiAyEGd3GPcC4DKGXvuCqF90qz/98Vhkx3kH0w9hoJedRraEVkDrtfZCH0161CUUulYe/yXmmD6Z7IG2tsjHQaMBB5+Xj0ODfE4zR3rRlPAoP1vv/313njvMf4dgMS8vhCaQpxi/1+fa/jPyYfy/cHuNuJ0z1R2ZLZYgDSaZz/8jo/ek3UsSqn0PHL8Ry5NyuXrTEE7BKalSDXc2nyVvaJxAA+kWBbYjAWexaxpdv388d5j3AsAIhwIL72k0lCaeDjY3Z01+VAzyHU9+U8JeR5cZaSaCP2frGNRSvWA0P9AnGiHwBQFz5cFPpsMco7S2b12DhgsGsuxOWC89xj/N0BkIVJqxkcAwAn/YMrRWO8NmpyW/aVDRjv+SZyc8dg7Pro263CUUulbffxHb3a12mW2qLsAaclTEw8l0+15jcO4gPT61hgDGNDCcV8/noueOHPXkJlewymc/wtGy/5uKuwtlwweQEOsZX9poZyHpFwZlsD+e9axKKV6R3z7Da43dBcgRUVTw/kjh5gHkt1TKwtsxgAgbxzv9eP67Q81gvm+h93jFOr/PTCa8Ph7U49DYjxjtHFFakwhgiT88zVv//CzWceilOqdNUd9+E6uNS6zmguQmhwcNmLQnFU9RryUygKbTQGAVz1xx65Tx3P9+JZ/Bq8P8gauy0cAo9P+avivwYV8feFVdkDL/lJDngdXKpcTwz/MOhalVO9Jzn6DG7oLkJbRssAqljTeaG5q7s1F0/3nWZwIwryZ1HDBPuO5fny/ecH+aTQACiTBBm/I/XDq0ZTXc/9UmUIEce7sx4898emsY1FK9d6aoz58J9cby3UXID0GAgdrfl49Fg32nKXuvjWLAGHewBK9fnzxjQfhdUhh3oHHdfxy0mHy12C6DbXsLzVkLVyl0oARnfan1I6M8B1JEu0LkKIi1fCH+FXeZfUDZCCV5kACgbxhPFe2vQDgf9+rCJFXdTsBMJQmHgr2TH416RAzyLr1nyZTCCGxu2z1MR97JOtYlFLZWX3ciat4pHqHjgtOV0AJ/rN6ND3rhly3ywKbMUBCrxnPtW0vAKqFxlzP0i7dbAD0t7K/qUdjvT9ocpL+OMUdFhG4GYON/CjrUJRS2ROyPyZv3M3kVAvyaOJhN92eWzuUoy6XBcaxAJA5T9wxv+1EwLYXAAJ+dZA34C4dZWwp+7sx2ocvGXijGdJpf6kyYR5crd756LEn3ph1LEqp7OUq3sWuVHpKJwWma8DU8Nvq2+xf3R5J1MWywMQJgsBMirmxV7vXtr0AMGJeB4OuPaS3lP19d6fj4Iw1Rh//qSLfA4z9RdZxKKX6w18/+MEREZyvxwDp8uGwCQPmzJFjYLtYFsgMRCGB2LQ9Grj9HACSfbuZABi4Gi4aOtDdWNjL07K/dJHvwQ2XNwXk/S7rWJRS/UMcL3IjI4mWBKZny7TAZY39zY3NfXigi2WBRAAT2s4DaOu3LYthCDRPutQAKPd82d8PphxttOwvfaNjQOXS+485YVPWsSil+sead37sPm7Gt+guQLoMGAxjfl49DjXnse1SP/0kAQxh7/bjaUP16d12g2CPpEs7ANbV+ReTj+CHg1217C9tRJA4hoicm3UoSqn+Y8icS9ZmHcZ2r0h13N6c713WWMgDptaVQ+9mIgAw9957F/jtXNfWAoB8b3aYo8h1oQIg5CYeyu/Jv5p8iBnQsr/UmSAHN1J9eGjayPVZx6KU6j8c06VJqVzWioD0BWZ0WuAzbsgFXSgLTGJARKYXKyO7t3NdWwsAZiwwOUKnz38DAJLw96cei022aH0t+0sdBQFAdOndB5yiZy1KqZdZ8+4PP0vASj0GSF8eTazh3ezZtSMkQqPj+zkWFEITgDCnneva2wEALUAXUhfzXMMNhVfz7wfeYAZdtfMbqldGBK7XIaBLsg5FKdW/SHBx1jHsKIpUwwXVt5r74j1dRJ0tAkSAICAQTFulgG2mfNJeneYsWDAa8Pn/3+l4YmO07K8HKMiBa42H1qwt35Z1LEqp/uVsfqUeA/SGD4dhFM2Z1aNhwR2/WxMBAryqnWtaXgCIABDMQocVAIGr4sKhA/mWaL4dcN3tiKS2zgQ5wGA5TtHtf6XUtq05+v3PEegGkw+yDmW7t2Va4JXN/e0NzX2STucEJA4gonntXNPyAmD45zMmCTDddXBcn5ME6/0p7kdTj6a8xOO/kWodESROAKFlWYeilJoADJbCaj+AXjAQCAg/GzmOquJzJ9MCk0QgjFnSxjt6y7/lEG53YzAp6SAD0HKdz5x0uDyS28VGWvbXE+R5cCPVDQnjlqxjUUr1P2PM1a484rQpUG8UqI474vn20vqbeIDGXxaYJIAQpj9+y/TJrV7T8m84Zm9GGBg73hkAoTTw1/xMWTTprWaQu1P7qMZGQQ4EumXtOz6yOetYlFL976Hr73sAzv3FBDoboFdC08Qvq0fTk27yuMsCHQuswRC8YHqr17SRAyCzYcc3A4AgADN/f8rR2OQVjZb99Q5ZAwhdk3UcSqkJ4lvfEhbcQH5bPWVUBwLEeJR3sWdXD0OE+rhes5mBQmgsDLfcC6D1PR6iWeNJU9wy7e+a4r5y+cD+pNP+esgQuFqDI6fNf5RSLTPGXCvdGvmqWjJANfyu9la6N5kp4ykLFAE8D3AOs1u9puUFAAlmjacE0AejhoC/O/U4iCEt++sh8nxwM17XLOfuzToWpdTEYUF/cJVKQ1sD985oWWDBnDlyNAx4XNMCjQWIaGbLP9/ynUl2b3cBIAByrobFk97Ct0bzbFHL/nqKcj5IcNeTJ5ygf/BKqZY9eMyHHiOhByinxwC9IgAGqYaVzTfQ9c19xzUngB0AxoxWf76lBcCDP5yRI6FdpM0KgEASPOtPdj+Z8naKRLP+e42sAQzdmnUcSqkJhgiA3EG+NgTqJRotCzQ/HzmWRpzPXptlgY4BGNmj1Z9vaQGwm98YEsg01+YOgMd1nDHp7bI6t4sNWev+e4oI3Izh2N2edShKqYlHiLRzaAYKVMed8Tx7SfMtrt3mQIkTkNDOq1a9taWzm5YWADnOTQOo2M4UwJAbuD8/Mzl70sFa9pcBsgZSrVUt0f1Zx6KUmniMoz9yrQ6YLgyAUW0JTRO/GjnSPJFMcbk2ygKdA4Qwba7/2EArP9/SAqApZloUkGn1+T867Y/5e1OPw7AXadlfBsjzIcDqR25+4MmsY1FKTTy+Zx/iZrxJEwF7L0CMtbyzPbt+OEdotLz3zgxAZKhpvamt/HxrSYBCu5CllpoACEan/V1dfK27YmA/M+j07T8TvgcQ/QXf+pb+8Sul2nb/MSdsIsLD2g8gG0Wq4aLqwfbPyQwutFgWyCzI5YzvmWSnVn6+pQWAIdkNprUmQD4Ydcq57+10LIG07C8rZAgQaPmfUmrcROh+8nQHIAs+HEqIzJnVY0FgphaepSJAPkdgQvcWACDZudUmQDlXxW8H3yJ/COd6WvaXHUkYxuC+rONQSk1of0HHg2rVeAhGdwGuauxnrm20VhYoAhgDWMEurXxGSwsAFtq5lRf5QBI84011P5l6JIVa9pcdYyC1GoRpddahKKUmLhL8VToZAas68vy0QPOz6vEY4cC1UhZoLUCGdm7t/i0gkmljLQAIgOE6/3zy22VNbmct+8sQGQNO3LAU7bqsY1FKTWBEj41WAuhkwKwUqI4/xnO8i+tvkQGqtnAFQUDTWrl3i79VmjpWF8CQG7gvP5vP0bK/7HkWRHhy9VPYmHUoSqmJi23yhDhXIl0AZCo0TSyqHknrkqljTgtkFkCkO1UAAgAiQ5BtP9INABHh/5h6LEpeqGV/GSNrAcITOOEEneahlBq3Pfw9NhLwFDQRMFN5xHjcTbNn14/gcIyyQBaAiLqzAHjy67uGAAZkGx85WvZXxVXF1/CSgf3MkJb9ZY6sAUCPZR2HUmpiu+Hwwx0gT4/+m6KyIgCKpobfVQ+yf0pmvmJZoDAAweRW7jvmb7UwaPIADbhtPNV9MGomcN/d6TgQYFopVVApIwKD9PxfKdUN6zQHIHs+HCoomDNHjgXJtssCWQAWGXyFTfu/GfO3OjgQRkQSbetmOVfFeYMHye3hXK/IWvbXD8QxyDntAKiU6piQeZKMHgFkTQAMUBUrG/uZq5qv3WZZILOAiIqP3zI9P9Y9x1wANONkQEC5rS0AAonxlL+T++mUI6kgrXUqUikjACIgS09nHYpSauITkqexrTNg1VMEARHMmdXjqOzy7G+lLJAZIJLIhX4w1v3GXAA45oJnYGUraw3DTf7ZlCPlsdw0m9eyv/5ABIljsNCGrENRSk18RvCstDsKVqWmQHXck8y2FzcO4gFUX/ZkZgYAisK66XwBQGQi39LLigAiruPP4Wz5zdBBZohfHoTKCkEaTYa1m7OORCk18QljPUQA0o6A/SKkJn49coRZ66a5PL345VsEEJFAQi8a6z5jLgAYEpmXLAAMBCLg7005BmWbN55uD/UNGv1L2qC8DGcdi1Jq4iNrhyWOtSNwH8kjxuMyzfy6doS8tCxwtHcgLIQ7XwCQoPDCX/yWaX9XDryOlw/sZ7Xsr88YAgi1oGZGsg5FKTXxMUtF4gS6AugfAmCQqri49hZzdzxHXlQWKIA1ZJscd54ESIIQL5gE7INRpTx/d+qxZDCalKD6CBFEqOrqZU3KUEp1zKA5IpAG6RFAX/HAqCA0Z4wcAxH5W1mgCOBZAmLThR0ADy+6Sc5V8Zuht/Kd4Wxb0LK//mMMCFI1zUEty1BKdcwnW4Ug1hyA/jJaFljDNc3X0VXN1/HgC8oCjQEM2B/rHmPnALDktvx3IDGe9Ke5n059OxVYp/31LaL63qL9mJVSnWOPm4QxGtCrTBAEhsScWT2Wypx3PjEEgOcRHNnOdwAEFIJGT38sN/DTKUfJ4/5UmxfdYe5HRASINC7ROQBKqS6IYxMLpAajOwD9KKIG/hzPshfW3yoD1F5F3tj9HQUhMDrt74/hXHfe0Jt12l/f0706pVR3+M2GAGPNg1VZikwTZ1cPp8eSnVweMcxo3t7gWNeNvQAgMCAQEf7e1OMwYvM67a+fjfbsbmVotFJKqe1ADjGe4Kl2Ue0oydPo8TyRjNm/uYUqAPLANawY2I+vLL6GBrXsr++JntcppdQOZYBquLj2ZnNXPCcpUB0AjfmoHnMB4EkyICbCaNmf6LS/iUAPAJRSaodiwagib35eOZZYAN80O18A+MlGuWjwINwVzrYF1sqyCUHYyzoEpZRSvTVANVwXv9aurO+H3cwznTcCuqmwP/9s6pHQUb8TBDMINGb5h1JKqe0LQWCJcWb9WNztFoRj/fyYC4Dr58/H07lJ8EWPlSeOrQ1vVkqpcRI9WJwo8tTEg83dcfHaI0pj/eyYC4AvDl0aH+XfibLoS+WEQRTga1/Tv7BKqc4V/BwRIrC+V/Q7AjBsIry3dDu+seasMcv1xq4CYK6dHC3DIFU5wZhVBSpjMvryHywwRvMAlFIdqzfYF+g//hNBkzxMjUv85Q3LYYwd8/k+5g+s50m0T24tPpS/nisy5pGCyhozhCXCvjvnxv5hpZR6ZQE4AsHXk8X+RgBKJsBnNl/Hu8TrUPcmd14FwARqIMDHw6tptnnK1aHPlb4mAhAiL5o85iAIpZQaS+IXIhLkRBcAfW3EBNin8WRy0qZrDMyYBQAAWmsE5BrsYRdv2J4UrZCGVpj1NxEQId/Ix5q0oZTqmHFxkXzPQHvA9C0B0ITlr2xYhklcMoAHMaY81nVjLgCswTAEKEuId+X/YN6Ue8DpUUD/EhZAkEedxuwDrZRSYyFgkHxfn/99igCUbYgjRu6Td5fu8Bpm9N1PhDtPAtzCiUFAiflctEQ8JMytX6p6SkC+Z5u+rwsApVTHRGgyjNHq4j6VkEHgmnz6hqWwYDBo9FdFGLN2f+xxwMyVLb/3soR4c+4B8878H7gsoRaG9iMBKJeDFUzOOhSl1PaApuko4P40WvYX4h9Lt7oDqg/amsmDCBAnMGRqY10/dhIgTPOF/zuGbz4brcA0GnZNaD5A3xEBjAG5ZOesQ1FKTXxMsjMZ3fHtR3XysUe80X1x4wrjTA6C0WHwjgGwNMe6fuw6QZYKy98nzNfExzzvKe/EaJVUuLVMQ9VbZAhi7C5Zx6GUmviIsIue//enEZPDaRuvwh7NZ22D/l745VjALGP27x97GqCHGvOL/7+yhPjH/HW0j7fW1SQYR9gqVUQgyPSsw1BKTXwE7NZCPpnqsYrJY//aGnfi5hupaf5e9EUgOEHi5dH5EQDgqnHy4kbQsVhMtiP25GipJGJY20T3F2GGgHbPOg6l1HZhN20D3F8EBAH49A1LpSA1E9MLHuUEAJIwbHWs+4y5AGgKVZNE/nYEsOX+ZY5wTPBHc1jwZ00I7DeOAZE9sg5DKTWx7XrpmaEIdpFEdwD6BQEYtiGOL/+Rjyr/ydTNi5+/ZvRn6km92vkOgJ8zI44lIXrxI55BMCTmlGgpFVDnRMsC+4Y4B4B2nbHkh9q2USk1boXBaAoB06BHAH0jJotBV3Nf2bCUQGT4Ja/fRAALas/Vws6TAF3FVQjUoK284lckjzf4q+n94c1ckkh3AfqFcyDILnl/2tSsQ1FKTVzcMNPJ90LRI4C+sKXs75ObrpdX1x+zNfPyHDxjAAJV3BPceRIghGoiMrKtKpAacuZT4Ura0zzn6tD28/1AWADPK8QxNBFQKdWJPSkIgJdmgqtMVE0O85pPJ6dsvpqSrTz8gdEdAIGM7PXjtZ3vAHDMNSKqbGsBUJcc9vA22E+FK6XGuuPcF5hh8nlYD7OyDkUpNXERYz5ZnQTcL+rw+MvrV2BavMk2aRt9eIhgiEqt3G/MBcDsw9c1RKRsttEJiiCoSIj35282+/sPuxHR3gD9gKyBsOyVdRxKqYmLgFdlHYMaVbYhDq4+KB8o3WYa9hXm8YzuAGxq5Z4tZe4Rmc2v1AgqEYOCbZhTo6UgES0L7AsCgehfXqVUJ+ZLMmZLeZUyJgPLCX91wxLkEJtXTLo3AAEbWrlvi6n7smGsTpBljvC24F46Jn+nJgT2AUkcSHT1rpQan31XnBMJZLYuALK1JfHvH0q3u4NH7rc1M0bZPQEAdXUBsH6sWRACwMGaU6JlmIwyN6HnRlmSOIEQ5sy68EydCqiUalujYfckol21B0C2GuRhWjLsvrxhuWHjjd2VWQAhea6Ve7e2ADDmmZf2AdiaqgTY21vnfTi6njUXIFviHMjYnb3BcFbWsSilJh72aS8TRVYrALJVMXmcvPEamdN80taphUR7AcDUvQUAOXmWW5wFXUGIE8NVNM8+5WrQqoDMMMNEIZjt3lmHopSaeAT8WvJ1JzdLVRPgNfW17tObrjXxKyX+PY8AgAEQnmnl/i0tABInzzADLWwCoCkWO9mSPSlaJjG3sF2hUkPWgAxen3UcSqmJhwT7ib79Z0ZAiGH4KxuWySCPmLiFY3UiII4FCZv1rXxGa0cAHj0Tx63l9m+ZE/DO/B30ltxfkoqMvWpR6ZDEQVh0AaCUao8sNgDtK7EmAGaBAJRsiCNH7uV3lO8y9Rbe/gHAGkIj4Wbgue4tAAy752o1cdRiyiCD4IHt5wpLESBmp3MCMiFxDAheve8550Rj/7RSSo2asaQyU0hmQxcAmUjIIHJ1/ur6JWQgL+v3vy2GAAMM1xu0saWfb+WHmjn/OYFUttUMaGsqksdC/0HvXflbpaxlgZmQxMH4dvfyFDM/61iUUhOHT/nX2kIhEB0C1HOjZX8RPjp8C7++9oitmtYT6q0FBHju7s0zKq38fEsLgIeeSkoAPee1mQ/SQA4nRVdiV7PRNbCNtoUqPcwwhQi+wf5Zh6KUmjiIsJC80aeJ6q06+ZjRXO8+v+lKcqbNRPrRl/RnD/9/bmhp5dbSAuD449c2ifCste29x9fExxzvGfvx/NVS5a0PLlBpIzBwYNZRKKUmDiF5k9b/Z2PE5PjzG1fKbs3nbIPaHLBnADK0ro0fb41AHm93JgQBKEuIE8IbaF/vMVcVXQT0msQxiLAw6ziUUhPDzEsWDQnLftKMsw5lh1MxeSysPcIfGb7RNO04UrcIAMtjrf54ywsAEjxmx5HLF4vFkK3ZUwtLhYV0TkCPcTOGAAtmLls0M+tYlFL9z/f915ownKotgHtr9Nko/NX1SymUhonHkzwvgBNZ2+qPt74DQPJYi72AXoQAlDjE23P3mMODP0pZxuhjrLrLOXjFYuAh0F0ApdSYhOhgk88B4/kHX40LAdhsI7yrdKccUfnz2P3+t3YPApAIDMmjrV7T+gLA0Zo4bq0Z0MuuBQGGzGmFZVJElVtpaKC6yBqwyGFZh6GU6n9i8DZx2gCol2KymJxU3D9tXA4hg/HslBsCag1xPqWQA2DFPF6pMo81FXBbRjjAa71HzQnhjazNgXpLmjEM5GB87Wu6+aKU2qYZV5w3iYQPkEYj61B2GASgZEKctPlaXlBfa2tmfLlyniEwY7jWcE+1ek3Lj3Nj608KY9i20QvgparIm09EV9NM84xroM3sRjVu3IwBY/aeddCrtB+AUmqbfIuFJoqmaAVA71RNDq9qPOlO2rjKJmb8L8fWAkR4cuifntzU6jUtLwDOuPypTQJ5wuugnL8pHnazm+xnCiukzjooqGecgx0oegbm0IwjUUr1MWG8nXJ6/t9LDXj48oblMsWVTJM6OB43BEAea+eYvuUFwLe+BTGERz2vs13kMod4b3AbHZB7MKnoyODeEQFBjsw6DKVUP5MjpNnMOogdRsmGOKR6f/K+0u2m0WK//22yABE91M4lbZ3oC8mDXpvNgF7KwSAwsT0tWgIrzK32OFad4UYDAhwye+m5A1nHopTqP7OW/HY+WfsabugCoBccGficuH9evwQ+nOl4Zo4AQniwnUva+kRm84B0YWuowiEOyt1vjg/v4LLonJpekDiBjaKdieUtWceilOo/FnyUHSz40BHAqRvt9x/iQ8O3ypuqD3q1Nvr9b/V+W0oAhR9o57q2FgBk5YF6Q8ZVCvhCAiCBZz4bLqepVNKywF4QAfkeYM07sw5FKdV/hOR4aPlfTzTIw27xZveljSuIjdfxyAVrCNU6N+Fa7wEAtLsDQGZ1tSa1dmcCbE1NctjLe8J+NLyGK6y5AL3AjSbAOOqtq1bpiksp9TezV1w8DUQHcV3L/3qhYgI+dePVMqP5tK1T5wnxvgEEeCqAabkHANDmAmDO/mueBOQJv0uD/UYQ4iPhtbTArnM1nROQOmk0YfLBQHhBqwAAIABJREFU/CcaTx2QdSxKqT7i6kd6A8VBbf+bvhET4HX1x/gTw9dT3EHZ3wvR6Ev5I+ZLa9tK4GjvCIDgiOgh3+9O4l5TLKbYij25sFwSGV/3I9UGEZgwAIHelXUoSql+wu/Twr/0CQgOxKevX4aiq9q4k7K/F7IACPe3e1nbaYfCuM/rUswEoMwRjg3uNAfn7nMVnROQOmnGEHbvweLFHaacKqW2B3svXzzZkDlcdPs/VYTRsr9jyvfI8ZW7vXqnZX8vvT/Rn9u9pu2HAAF/6maSKINgScznCksljwYnnZZCqFfE9QZMmN97zmCiw4GUUoi5eZwdKE6WWMf/pikmi2JS469uWAZg9NnXDYYAbgpI3L1tX9v+x/F9lapgvDMBtqYieezvP2zel7+Fy6xzAlIlApPPQ1g+mHUoSqnsidCHpOM8dPVKRvv953Fi6Sb3mvoaW+2w7O+FPEOoNbnkEr+tJkDAOBYAiWcejmN+rtOOgC/VQM58OrqSppsN3NQ5Aanieh0Eef+MB5doP2aldmB7/f783WDNYVKrZx3Kdq1mfMxuPuc+t3GlceMc9rMtngcQsGbgy2uebffathcAc9/4aElADwZdSgTcoiY+ZnrP2U8Wruaq6HMpTdKMYQeKM4JHht+edSxKqewkgXzADhYLOvwnXTXk+IsbVsgu8UbboC6V0W3hEWDaP/8HxnUEABDhHr/LL+lbEgI/kL+R9vNWu6rOCUiPCMgYsMinsg5FKZUh4U9IrKV/aSqbPN5ce4g/VLq1837/W0MAC+4ez6XjO8kXuiuNbpExDIpUt6dGS0UgrGWB6eFqDbDm2DnLf7tH1rEopXpv7vLfvtnkw9ezbv+nhkEwwvzV9UsQSNN0O8mdCJAmAJbeLQBI3N3dTgQEnt8FkAiH5f5sjgru5rJEugRIiYyOCI7g+BNZx6KU6j1x7lQT6OjftBCAYRvhveU7+JCR+0zNdL/M3beEWoNL8GzbFQDAOBcA5VrpgTjmp/0uJwICo3MCmIw5OVpOg6jonIAUcb0BIvnMHqsWaRtGpXYge155/m5k7Xu5Ws06lO1WkzzsFJf4nzYsJ5Bn0lhmeR5BCA8MnLbmufFcP64FwL6HbR4hovuCXDrv51UJsK/3mP3H6AYui5YFpkUaDdihgZl+039f1rEopXrHT/gkO1QsavJfekomj89uvpbnNdbZmkkpsd0CAN813svHvYkvwB+8LiczvlAVeXwsvJrmmqdcHVoVkBZxDMPy37KOQynVGwuuubBAoJP17D89VZPDPo11yac3X9u1fv/bxPSH8V467gUAEW6NE3Q8GnhbGuJhFztsP1tYwQ1OcaWxg+NqDaZQOGDW8vO1JFCpHUCjEZ9oJw1Ml0Zbc2NUiwRAE5a/smG5TEpK3ev3/xKWgEZVWNjePt57jHsBYMXcVa5wV0YDb82WssB3BH+wB/oPuIoeBaRDBLAGlvlfsg5FKZWuBRde6JOTr0hT2/6mpWQjvL36F3536Q7bsFFqn5PzCAnz44X57oHx3mPcC4A9Fq5eJ8Bf08oDAAAHQmAS87niEvGQMOucgFRwpQoThUfMXXbu27KORSmVnrgQf8ibNDBPt//T4cggdA0+ff0SsmDjUqxjI59gCHea49sbAfxCnT1RGbcGKR/PlznEgf5fzTuD27ikuwDpEAFZCwj+V9ahKKXSMWPJD3Mg+Zo2/knHaL//CP84fCu/sfqQrXWx3/9WGQCgmzq+xfiv5pvSaAj0Uk345rPRCtqZNrsmNB8gDW6kChMVjpi97Lwjso5FKdV9npn6STtpaC99+09HnXzsHm9IvrhxBTmTS3W8kiHANQQJ860d3aeji61363CZ47TyALaoSw7z/KftidE1UmUtWU+FCGAIxPytrENRSnXXgmsuLAD0P6XRyDqU7daIyfFpG67C7vGztkHpDrTLeYR6k58eMIV7OrlPRwuAX7xh9Wrn8EA+xTyALSoS4sP568w+3uOuJroISAOPVGGHBg+cu+Q3OipYqe1Ic6T+ZW/S0J5c1wVAGkZMgP3ra/hjwzeaZoqJf1sYn0CgO+jzfx3p6D6dXPwtgliDG4IePI+bYjHJVs3JhaWSiNE5AWlJEojBt7U7oFLbh/mX/3o6fP+rPKJd/9IgILCAv/rcUkRS63q//60ygECu7cJtOuTkOteDPIDRssAQR+fuNocFf+KydL+vsgK4Voc3aWhevu59OetYlFKdY7Lf9AaLQ9LUuv9u29Lv//jKH/nIyj2mnnbTH4ye/yd1QSL2+o7v1ekNGtbeNFziWppdAbdgEIjInFpYigLq3JOV1g6IR2oQz/sfcy7RSYFKTWRzl577JgqDT7lSJb2ubTuwmCwGkxE+fcMyAhnDPXgtDXxCI+bHNq2P/9TpvTp+gs5fuHqdiNyTD3rzMB6RAK/31njvz98oJUn/rGVHJM0YtlgYRM59N+tYlFIdEPoR5XygF+VaO5jRsr8Qn9p8nexTf9TWTG9OTckngHDz7G+s6ziho0tPbVqV62G7/hpy+EzhKplhnnUNpJttuUMiwJUrsMXohDlXnHN01uEopdo3d8lvTrOTBxdyRc/+01AzOcxrPO1O3bwKSdo1/y8ldGU3btOdBYDwVfV673aY6uJjutnofSpaKXXWQUGp4OerWK334+mLF/f4262U6sTcpefuTjn7ba5p1n9aavD4SxuWy9R4s21Sb/rTeAaoVTm27Do+/we6tACoJfnbR0bcMzm/NysAAlCWEO/P30JvyD2cjIg+n9LA1Rq8SQPz8wPNb2Ydi1KqdSL4iSkUJmndfzrKJsTB1Qf4A6XbTMP2rkNtLmcgjHvCL61b3Y37dWUBsPfBD1aIcF0Y9i7JxMEgoqY9LVoCAnMvki92RFwegQny/zRnyW/eknUsSqmxzbni3A/ZoYH3aOJfOhgGniT83zcspRwS43qZjO4BDFrZrdt1LXIiu6zXX7WyhDgkd585NriLyxLpEiAFkjiQ5xky5pfTF39Xt1qU6mN7/v783Sjn/1ia8Wh3T9VVo2V/IT4w/Ac+aOR+W+tB2d8WhgBuCizJsq7ds1s38qxbtXnYNTyvd49hAeDgmZOjZZiMMsdIZ+7yDo0ArlZhJw3sHQ7s/G9Zh6OU2racz2fYYrSTaMe/VDTIw87JsPvSxuXE5KXa7/+lch6h1pB1+Xp8e7fu2bUFwPT9H1vrmO4I8719D69KDgu8dd5Houu4zDotMC2uVIGJil/WqgCl+tPsK8491U4efJdu/aenbPI4eeMqmd18ytZNbxPQTY4g4FXm9Ce7Ns2pq4cXxsgVfg93ALaoIo+P5K8xe3lPuDq0KiAVzKNjg3P+r2ZffM60rMNRSv3d7MvPebXN577H1bpu/aekagK8tr7WfWrTdSbu4db/34zOa7usm7fs7gLAmiWlMrPpcYO+hniY5pXMZ6Pl0hAPOicgHVyrwRYL001ofpV1LEqpUXusWhQY3z+PgiDUdr/pEBASNnz6+qUyKCOmSb09bs55hGrVDTs/f20379vVR/Ueb1hzbzPmv4T53q4ARucERDguuMMcnPtLUtGywHQQwQ2XYScPvWPO5ef896zDUUoBubr3IztUfB2XR3TrPwUEoEwhDnX3JsfX7qa66f0cGi9HANP1gyc/tKGb9+3qk5oIQkSXBUHvv4QMgk/OnBYtQSAxs84JSA1XRmAK4b/NuWzR4VnHotSObPblZ3/SGxz8rCuVoRuf6UhgEEqdT520hCQnEMngD5oAMbik27ft+lPSGrm0WmX0+hgAAEYkxEL/Ie894a1cYp0WmBaJE5AxhvLhb+YuPXf3rONRakc0+/dn72+i8GfcaPy9c6fqujKH+ED+Zn599IgtBXmhHo9V8C2hNsJVsm5Ft+/d9cf005hyV7XOD+Yz2AUQAA3k8JnoStrVbOIGetOecYdDBK7WYAvRbjD2Apxxhv5BK9VD8y87b6qJchca389LQ8/909KAj93tevfJcKWpU2CSIqSntX8A/IAgghsKp657stv37voC4IAD7k4McGmv8wC2qImP2d4z9hPR1Vzl3kxn2iERwZXKsEODB8+ZUfxZ1uEotcMQAefot7ZYmMMVPfdPU41z/KnoKpnhbTAN8ZEUiBjo7R4AAUJ8URq3TuUpTUQXlkeyOQYYnRMQ4YTwBnqN/2hSFV0EpMkNl+BNGjxpzhXnnp51LErtCOYu/+1P7NDAkW64rA//FI1IHq/3H+F/CG4yJQ5BDCQRSHz0LAsgZwm1KldIsCSN+6fyiN7zskfvrDf4vqx2AWIxGDQ1e0q0FAxiLQtMkQh4pAZbjL4z54qz35t1OEptz+YuOfe/2cHi59xwOetQtmsCAoT5tMJSFGzDJDCAAJwDcQDp1R6AlyckLNcVvvD4U2ncP50dgG9BQLg4i2oAYHQXoMQh3h7cY44I7uGSaEJgmiROIMww+fxv5v3+nIVZx6PU9mj2knPeZwrRf3C1qs1+UkQAShLhmPzdfGjuXq+8JaFcAPFg4jzQy0RAQ7ggtXundWMXJxeWSs7ZjNrzj771G3NqtBSDqOqcgDQRIPUGyPcjKQaXzF366zlZh6TU9mT2ZWcfZPPhb4QZErusw9muxbCYRBV3crSMHOyLG8sRkAwAvUgEDDxCdcRtShpJKtv/QIoLgHkHPXFfM5bbozC7evwRCfBa71FzQngDl0XnBKSKCDxShQmC6fDyS7RdsFLdMffSX+9jovzvyZpQ6g2t909ZmUP8Y3idvNp73Fblxa3lCYArENikfwhgR3fQl076ypOb0vqMVJ/ORDg/i9kAL1RF3nw8WkWzzdNcFz/TWLZ7ROByBbYQLTBF//K9fv/LYtYhKTWRzbzolzMQhUtMLrcTV2ua9JeyOnKY5z3pTsyvMhW8vKMsMZDkQexDKMVdAAIABhLG+el9StoLAI8v2jTsRnw/uy9tQzzsZjbZT0dXSkMHBaVvS3ngQPFNLh/+fsGFF+qqS6lxmH3pWTt7g8WlNszP0nK/3miwx5+NlssuXsk0ZSvtTV6YCJjiAiDIEUaq7tEBwVXpfUrKC4CZ+z/+FLOsLITZfXFHywJDvCd/Ky30HnAVPQroCTdcgh0aPCIedBfpIkCp9kxffNZkGw1cYYvRq0fb/OrDP21lCfGW3P38juB2U+Jo6yctWxIBw3QTAU2OIEK/M19am2qXp9QP6EXwa5Zsv78OBnlKzKmFpWLF6ZyAHnGbS7CTBt4VD7rUsliV2t5MX3zW5HDKwDJTiA5wm0v68O8BhkEOiTutsBQ54wyPkWiRDKSXB2gN0KgxwybnpvQRf5P6k9ByvGJzyT2eRWvgF6pIiINy95t35G/XssAecpuGYYeK75u74vzf9CR1VqkJbPrisyaHkweW2ULhTW5YH/69MFr2F+Ld+VvlQP9Br8yvvEtMAFwEMKWTCBgEBkmCmwc+98Sf07j/C6W+AJjxlifrhnB+lOExADD66Engmc9Gy2knDHNT5wT0jBsuwQ4OfGTulRdcrMcBSm3d9MVnTQ4nFZfbYvQmt7kETffvjQY87EKb3UnRldTA2P88EQMuJJJcSomAFgDx2Snc+WV6shcuzGcPlzizngBb1CSHvbwn7YmFa7miLYJ7R54/DhgceF88yV20x6JF+oev1AvMuGLRLtHUweV2oLBwdNs/64h2HCMc4BPR1TLHe9rWWqkUY4B9kAu73xEw8AjVCm9IGu7i7t5563qyAJh14OP3xwmuK0bZn71XEOLD+WtpgV3natDnUC+5TcOwA8V3Bbvnl2iJoFKjZl6yaGYuCK8yYbhQz/x7qyoB9vUfSz6Yv8GU2xghL/b5RMAu7wDYPEEYF6VZ+/9CPXsiC8sv+uF73RSLKbZiT46WScIGOiegt9zmEmyxeIQrDqycceGiXbKOR6kszb78nFf7xegaE4b76pl/bwkITohPiZZikq2adrvFuiJEurgHYA2QNAQE85/duudYerYAyPmNyzYN87p8PtsvOAEoc4Rjg7vMW3P3uYomBPacGy7BhuGB/uTomln/dfb8rONRKguzLvnVwSYKVlGQm62lfr21pTz8iOBPfFTunrbe/oHRN/8kArHXvczmIDCoN/mWwhfX3N6te46lZwuA3d/4dA3AOVn2BNiCQbAk5tRoCfJocKJlgT3nhksw+WBvbyi8du4V57w563iU6qU5y37zXm9wYIWx3s7a5Kf3ElgUUeNTo6UEQ2OW/b0UCeDyXU4ENACBftGlu7X6kb1DJvnPzSVuejb7L3tF8nhj7hF6X/5mLusuQO893zaYrDedwvzK2UvPfX/WISnVC3NWnP8FG+T/C4RI2/tmo8QhPhDeyK/LPWpHeBy5YM8nAiZdagiU9wnVins6CoOLOr9b63q6AJh5wLrVSYwrBor98YWvI2c+HV1Ju5sNrt5C+YfqMiJwtQoQFWwYXTRn2XmnZx2SUmmau/y33/OKhR+Jc5B6Ux/+GWjAxwz7bPLJ6CqqdlINZmCSQncmM5uAwKCzzWcerHR+tzY+t5cfNop/0oylL773dfExw1tvPxldJTXROQGZIBr9hzCJ4Q0OfGfOlRecga9/XWc3q+3K9MVnTZ67cvGldmjgn1ylCkkSLfXLSJ1zfFJhBabbTbaxtX7/LSIASTQ6HqCTeDwD1KvcdJSc1cl9xqPnC4BZB669plSRu/qhJJAAVDjCPwQ3mf281W5EXj79SfUAAZI4uHIF3kDx5HkH73Pl/Mt/PT3rsJTqhtmX/vo10dSh62whepfbPAxw6pNk1TZUJMT+/kPy3uDWthP/XopkdDSweJ0NBsqFBs7h0kmff+KRDsIZl0yewmTkx16fNOKLYVC0dXNaYYlAhLUsMEMicJuHYaLwcAmjm+Zefu7bsg5JqU7MXXbuB2wxup4C/zVu83DW4ezQGAZWEv5cYYnkTWxcp48/BlwA4g4SAQ0BnAiMpR91Fsw4Pz+LDx3eVL9w42ZeF2ZcEghsKQsMcah/rzkqf7fOCegDbrgE8r1ZFAYr56w4/wtZx6PUeMxdccH/a6LChSCaxGXN9M/SlrK/Y/N3uoNzf/EqY/T7b4kAbEEuGv8CIJ83qNb41ui0R2/sPKD2ZbIA2O/oZ6oAzohC0xfjYQQEJmtOjZZhEka43YYQqsuIwCNVAOJ7xeKP5q684JyZlywayjospVox84pfzpi7cvEKO1j4V2k0IA1N9staEx6mUMmdHC03CbpXvE8GJi6AxpMISABgAGvkP7oUTtsyO4h3TGdt3OxKgd8ffzGqksM+3lrvQ9H1XJYurA5VZ4ggcQJXrsAWCyd6xfAW7Reg+t3cZb95lx8O3mKj8Ci3uQRxet7fDyqcx0fDa2WB/4TtdsK3K9C4EgHzAaFa4YdWP1v4fVcDakNmC4C5b17zrHPy64Fif+wCAEAVeXwsXEVz7VOuDq0K6AsicJuGYYJgbwqC6+asXKylgqrv7LFoUTDvygu+a8LwUjJmuhsuZR2Sel5NArzKW+c+El5rKl1+uSMG4hAkfvvHAJQjsPAP9/3GX+OuBtWGTFPxTeJ+OFxyDd/rj12AhnjYxQ7bk8Ll0mQPWqfTJ4jAlREA8L1C9J15KxcvmXPpOXOzDkspAJh12blvzO9RuNEMFL7CjSa43tAt/75BiMXwZ6PlspMtm6Z0+XhXAM6BXNBeJUDeJ9RK7ql6LezJ2N9tyXQBMPPgdasbMX432CeNgbYkirwz+IM50P+rq2hZYP8ggiTJaAvhKDzOFILb5l15wSeyDkvt2OauuOBfbCG4gfK5N7rNJS3x6zNlCfHW3H18XHCnKXHU/Vc6AcQD2u0IaPIGTPjptH/ubeOfl8WR5YcDgGfo/6uMSGL7JO/OiUFgnDm1sBQeEubs/4jUS4xOTTNTKQoXzV25+KKZyxbNzDomtWOZe9m5r5+7cvG1dqDwb8SS53Km/46rrXAwCNB0pxaWkWe47X7/rSKCiYtoeQMg5xHqFd7IfvOMVAJqQ+ZPtxkL19xXq8tlgwN9sgLAaLOIN+ceoHfnb9OywH5EBGk2wZUR2Ch8v+9Hd8y58vyTsw5Lbf8W/O//7c+78rf/i6LgJhPm3+aGS8939dN/JfrJ6G5uhPeFN8sB/kO2wunu5nKRINRaIqAXGiTMZw6e/PSGVINqQeYLAAAgy98cGWHul10AARDDMydFK7AzbXZN9EnXIvViIlt2A3byCsUz5q5cvGLeFb95XdZhqe3T3OUXHJocsu/NZqD4DYiEXCpnHZLahgY87EYb3KfDldRIOaGbGEgCkPjgsRIBcx6hVnFlA/lxqkG1qC8WALMXrv1jreGWDRT7IhwAQE1ymGuf8T5eWMXjmhaleuP53QBXKsOG+aMk79867+rF35y99NyBrENT24f5l/96+rwrLziDfHsN5fw3us361t/vqhzwpwpX8SzvWVuTlAe9PZ8ImASj7YFfiRcasJNfFL7w+FPpBtWavnniEvDNRkNg+iYioIw8PpS/3uzjrXU16CKg37lSGSTImyj6mvFzd81ZsfhjWcekJq49Fi0K5q1c/GWJojtNsXCyJMnzDapUPxuRAK/z1sg/BDfaTvv9t2Q0EdC4AuSVDgFyHqEx4kpE8r20Q2pV3zxuZx+49raREf790EDfhIRYLCaZqj21sEwSIeicgD63pVJgcwnk2Xm2kD977soLbpmz4vz3ZB2amjgWXPi//XlXL/5ksEd0pymE3wdoV83wnxgEBBHwqYWlGLB106uurgQgLr7yBoAXGiSJnNUvb/9AnxW6r/nDjP3yvr3TsRjnso5mlIEgjwZ/vnQKr2q+zhuiat80LlJjM4UIEAE3G7eQmB8/vAmX4IQT6lnHpfrPbivPnlKQ/AdBOM1E+ddInIBr+lWZKAjAZolwTO7O5AdDZ5mq5E2vXtrEA/xhJEN/FkPm5S/WOY+QsAyz4711AfAK1tw288Kpk+0HNm7ivjliK1AD9yV7Jh/f9GUDImM7G/+seo0IJsyDjUFYbzz81mkDi6XZvOiMhe/5Y9ahqWx9fdUqW57WXLipGX/kpo0j7+Mo2o3iWB/8E1ACCwvnzp30H7KX/6RX7WXulgGoCTfpHoGXwMpLnl3RgEVlc/LtgS+t/Vrvghpbnzxi/+6x2+bu4+fcPcLwkj7ZBQCASVThb1Y+xL+qHelNoYruAkxATRG8dsoAXr3zJJQ3DUNY/gRQlQwARhOQqnTwd4IAEUKZpJ2WIC8mIgYGVQjVMc5YyADihEEokzEdfVWZxRBhgGTM/KZXIoAUIAiIxv9nAxIrgo6SO8mQQFAEwRMGiDDJ5vwFYRTijqc24OFyDbl+efNQbdnERZxaWJr8c/FibxMXe/75QuBJ94kLhuHzC04eAp/QTGR9UmssGDw9+9K/F+rLb/qjt836z52m2E+t3+j6ZhcgoBgbXdF9ePPpWM9DNqDM2jercXACFC25t04tggALa+AFORA9v1tHGM3q7uRxSQB14QvbjXuAqDv3ASBdOPsenZbW+bJZuMN7EIAX3IOZ4RoNGAGqiXM3bqxQDOqnXGTVgjpy2M1sdOcNfZcGbc00pfel2+wBAw9LXHgSPr/g46MBg1o5+Zfo84//e8+DGkN/FriL++ZwGR/K5SiK4/54166Lj929DfYzhZXx10sf1gXABMMimFfMi2/Ii1kAx4irus2rRjkAA761s6J8cn+lbnKmT948VEsa7OEzxRWyq7fZbuJCJm+2BCAZTQRkPJ9gn88RamV+vIzyTzIIaUx9udCddeDjj8YJfjY00D+TAglAmSO8J3ez3T/3UDKiI4MnjESAnQKb7B54Jun0DVJttxIBZkU+DXjGOf2aTBgVCfGm3APJu4PbTDnDzq0kQBwRsYUQRp8ZJkcQkW/u8vnNIxmF9Yr6cgEAAM26+feNm9yGfNA/K/EEBgUbm9OipSA4Tqu3tOqe0Z1n4flRHtZ0eCCutmssgtAaOycKxIl+UyYChoGHhD8XLUVAiXGS4SONAQ5AnBv97zBvMFLm+/7iT12UXVCvrG8XAHsdsnp9wvLtYtQ/IY7uAoQ4JHefOTa4U8qSwnQp1VWJCHbNe7xzzurbvxpTLII9Q58m+8Yl+nXpawSgJCHemf8DvyV3v1fOeldWAPEBF2J0GWIAAv3rAafcnWQb2Lb1z9N1a0bcz9ZvdA8X+mgRIAAcPHNKYblMobLOCehjAsACPL+QBwzp278akwjgG7LzCnkREa337WNNeJhGw+6kcAU1kXK731ZZmCSCBHmDkYq7pvCFRy/POqRX0j9P1q2Yffi6BoP+1ff7q+12VXJYYNd5Hw6vlYrkdRegT8Ui2CPvyxTfevr2r1oVs2C3wDPTclZ0F6B/VTjgE8NVMt9/ytYk3YE/LRNABoniWJhIvpp1OGPp6wUAAMx505qLNm521w9OMnhpc4UsVRDixPAa2ss+4aopT5tS7WMAAZGbWwj6JpFUTRzWkJlfzAtJx4WHKgU1CbCP/zh/JLyeKllv/b8QA8WdjNcALyp84fE7sw5nLH2/AACAYAN9hR9n57nRWkvxkHkHg6ZY7GTL9rPRcsQZ1JyqV5awYEaYkyHf2kQTulSbYhZMy1mzW+ixfn/6i4CQiOFTwmU0yY7YpvTJHHkAeY+wibm0eXb89axjacWEWABMP+7RO4K7ZNHuDxMGHpAkt0ESMFyWiwECUOIIxwd30EH+X1zmCSjqb1iAyBo3J8qRlnOpcSMy8wt5eC9qHaSyRADKEuLQ4M98dP5u6sm0vzYMFAwaDt/e87innsg6llZMiAUAAISe+Z+NzbJx8kbyhu6DmfxHkYGHJPE34e+LAYueLgYYBM+w+VxhiQRosps4f5zbtUQEs6OcFDxjtZxLjVfCgkmeNXuEPsf6PeoLCQxCNNwp4VIyJKafSrGLBYP1G5O/zi7kv591LK2aME8s8+U1z8bCXzcFA/JgvAa8wlPwJt3rYhQ6AAAgAElEQVQrZvI9IgOrJfaHJYH0djFQ4TwO8B8y783fylk2oVCjnACDnnEzoxxpApfqFANmbhRQXocBZ27Lrus/5G+U/YPVtsL5rEP6G0Ojieps8E+0718nTJvYCbMAAIDi59f+tFpJ7gpDAzb/t707j7Ksqu8F/v3tfeZbczdNj9VdPYEoikoDzZSgCCpo0CiIMQoiyNDQIDhl5Q3x8RJ9WVlRnyyTPKPJy4vxJSbPBO0GGRUUROYWgW6ga6Dnmu98z9n79/64VdAo0DXcuufeqt9nrV6u5aLu+dW9t875nX32/u7qfABoKKcEJ/Mi3I4dSKUZKMNTl0U/pqU0bMuyLDBVlhnrMj4HirSVuzYxS4YZba7WqzO+lZUk6Sqxi1V60HwyulM1zKx/VJeOdrRrjGft/+vZ1Lc97Xqmo6kaACKwsbzVGIZzWOV8eDNQfLkZ6HiSueUFTtwxTtjCWndu5gyU2EWPc1BfGt1lCw3UlS40CTO6XG1W+Y6K5WQtaiRhoCf0KOMo00AblC44RfZwWXg7up0hVeIGWfcPwPcJ4zmTA5vPpF3LdDVVAwAAbdcN3F8s2b/1M/pVNxc7vBlwC3BaXoTTvgOq60m2rc9z7I7MzQTCLEe4MLyPjnd3JwWWJqDeJjabs+tbfNZaIn9F7VhmRM5ERLA0lqnIc4C3ec8nHwwfoPFGm/jXolAp881rThnoTbuW6Wq6BgAAuFL5fClvDh5pn4DJZoAmRwYG4HY+Bep8grnleU68YU5gDmsGZvFuxKzQqkr6quhHsAzLDfUVnf8SZiwJHLvMkw1/RO0lltEdOKrD1RIRXGcMAtjaq8MfIaMqKmmQyxYz0NaiMDiUPDnodP1F2vXMRGO8k9PUdtP+IWPsZ5VLU77MsgKsC7CCdkpwWvaguprgCebWnZz4g5wghrEadibNwOQ+AWd7O9TZ/uMsEwLrhwEonoj8JYn8FbVnAfhaqXUZn1nmltTN5MS/dweP2d/xn1JZ2zjJq44DxAnDMF2zaVPj5v2/nqZsAACg5dqB/13I2dvDjMJ0/x5fMWegDCezH07br6G6nmBuf4atf4ATKsFYBcsugClOImQQLJG6KrMdrSjYGI0TUDGfxcxYHrp2sauVhLaIuRJbxgrfUYs8GQWolxganSpnroy2kYFSjTKyygx0tmvkCvzNdaf03p92PTPVtA0AAChKrqmUOO+7M/9SvNQMOFA6hhMegtP+LFTnk4yOp9mEL3Ks80gsYKeyoqDAPo53eumi8D5ZFlgHDMAD7IbIJ6bm/j6LxsaoRgRvbAkYkI2C5lp1VDXAxeFP+Dh3jy6wn3ZJL8lEhKFRM0A+fzHtWmajqU+Y4ZY9z5cq9r844dQfBbweppeihpU20MEw3NbnoDueZOrcwTbTW11R8IpJhK/yDhYQqE+Ed1GP2m+Ksk/AnIotozvybYertTz7F3MttowlrlZLfUfCgeZYER7WO/uSP4zuplwDXfwVAY5DMAlf2/PWvrG065mNph+jdk4ce/Bkt+2cKKNXVeIaDhBRdXQAGqQYyilD+aNQ/iDYHwK7ORhlYK0mWBeAAwJVu9aEFY7SWeVSYu8ovVUF1DS5EE3FAvCVMie0haRlu19RJ0oRRVrbF4sVgKiRNiqdNxhA0fr4Qsv37SbvOSffILuuMgOLOhWGRuw/rT2l70/Trme2GuE9nbXsLSuO95TzMBF5cR0ezpGt/mPAGg+cZMCVDiBpJyQhyLrQDlloY+ynRrbyI/F63ULFOa9roalYxnGtQXJsi+9U5O5f1JGryD42VrC9hdjx1Lw4jTaULIfY7D5j/qb9G1SBo2yDDFaHAaFS4QOlcvH49acdOJR2PbPVGO/qLLVes2dHHOO/umF9fp3JeQMvPSoYhdP6ApyOHUydTzK37eTY2U9xVEnsVa0/tEoltlG+wPOFYaDVUWZ16Erkr6g7y9WIYJ8kIrjWLBQ8xPaqaBtcsg1z8ScCfI9gDG2ZDxd/YJ40AACQOdj35UI2+XkUTX9VwGwwAVYD7AIgaKcIJ9oPt+1ZaPcxH+/59dP4YOGXZkzLhMBassxYG/kcaiWRv6LuDDPaXa27I4kIriUCMM4hLggetKd4O3W2QULVmIGuDo3hUfO91Sfv/n7a9dTKvGkA6GawMfypcsWWZrMqYLYOX1VAlhw17rifOXCbWhKP2TLJPgG1kDDQ4emkO3RJJmKJtCQMrI08ymiJCK6VMlwcTSPmU+GPqYzGifvNRITRcbO3SJVr0q6lluZNAwAAbVsHni6X8QUnUA1xt80EFB0Payt79adH7rFZ1RjdbLNjZrs+8uEo0nL9F2mxzMg4Sq+JPIkIrpG89XFJeBfWugd0o+T9aw04mlCp4MrjTt43nHY9tTSvGgAAaN/a97VCzvw4bKnvo4DXE6sQnxy7l44v9Zu8apzlLM0oZsYS37HLfYn8FelLGFgdetTmKGPk6zgrExkq5qLwPsraMO1yALwc+DM6Zv567ebeW9Oup9bmXQMAADCVT5aLPBQeYa+AeqmQRluS0zcObucESvYJmAXFsOsjj5Qs+xMNwDIj0KTXZ3w2jXLH0YQYBMNkr8xs43ZdVI2QosoMtLUqDI0mz4yNl5pup7+pmJcNQGbrvj2l2FytNEE1wG9IAEo6wvnZR9W5+R12XCYEzkiFGctCxx7lOyTb/YpGcVhEcCIrUqaPUF32d7b/hH2X/4RqlN3+PJdQqbBJYnzihHMPFNKuZy40wOVxbnRcN/DPuYL9VpBJv5MEAAuCJlY3Dm6jyJRtTPP2rZ8TDMDFyxv+pF2PEJMYgKOVWp8J0DDPHZtIDI0WKpqrMtsJoIbJ+29vVcgX7H9au7nvobRrmSvz+kTa4pWvK+aSp6OwMeYDFFSAtxaf1x8b+5kdV1GDfM2bQ8yMVaFvOx0tz/5Fw0ksY5mn1ZLASWRlytRN7qJ6YXAfv9nt1fkGiPxlBjo7FA4NJ3esO7Xvz9KuZy7N6waAPr2/yISPxbEteykuDTycUR62DP+YuiuDpkSNMcu10VkAAcGuz3gw8/w7K5oTA4AitTEKoAFpUaeoBA+r9YHkkuhuKnL6+6YwV5f8jWftwbLxLkm7nrk270+mmav7Hy2X+SY3IDRCYmeZXCyLB/W1I3fYgkr/C98MEstYEwW2xVGOTLQSjSqxjEWeUssD18q21FNTtK79VHQ7luvhhlj25ziAUoQktpcec+quvWnXM9fmfQMAAK1b+79RzNp/CVr0RKueroqK8NGR+/WmwvMmJ9kAr8sw0OIo0xNJ5K9ofAxS6yKfXEhE8JHkOMAmdyd/IPiFyjbIxL+udo3xnPnKmlP6t6VdSz0siAYAAMoJLi/mza56RwW/mpgUQpTV54a2McDWNsRXvzEZifwVTSRhRqcnEcFHYkHQMPbqzDYEKlZJypeil577jyT3/u2tfV9MtZg6WjANQOcNfWNs7MWV2JbTjAoGqhNfiirEWbkd6v3ZR2VZ4GswDHS42nQHriz7E03DMLA29CjSysgowG+rLvuLcJ7/sD3D+zXlUr77ZwYyGUI2Zw9QbP7g5psbYZy4PhZMAwAAmWsHHilX7BbHT38+AIMApdSNg9vQmeRshRpjuWIjscx2fcZnT5NeMH+RoukZZrS41YhgmQvw2ypw0EXj5orM7YjhpB7o5boEtkC+gD/sPvXFef/c/3ALqgEAgLbrBr5VyNv/FbSkf8Etko9jygPOJ0d/arNKRgEOlzCw2NO83HeU3P2LZpMwsCZ0qVU2CvotORvgY+G9fIyz10l75j/RxHr/vP3CxtN770i1mBQsuAYAAKKD4TWlnHkwyjTAfAAV4NMjd9HG8j4jqwIOw4wNmYC1RP6KJlSNCFZ6XcaXjYIOU4SPY5wB8wfhvSqX8la/zMCiDo2h4eRfejb3fSXVYlKyIBsA+tIzMTMuqpTtwShQqT7wqZCDrmRcXz+0nctw5FSBaujPUt8xS3wtd/+iacWWsSpwqcvVRlawVB97xlbZT0e38WKdVRVObxSWGehoVxgZNzs8v3RJaoWkbEE2AAAQbenrL1b4o4bZeDq9wXcCUNYRPpx9iM4sPG2zujF2wUoLA3AAu6ElYIn8Fc2MATiqulEQMy/o+YCE6rK/072n7Hv9R9S4TS8JlRmIQkKxZEcrRXxo2QnzM+d/Khb0Cbbjuv67SiV7Q9ohQQYEzUZ/fnAbPJtYs4A/ltgyVoSu7fK0I8uoRLNLLGOZ76glvrbxAv46J1AIuGy3tGyDJlZpLn323Or5vlCgP1x7eu/O1AppAAv3SjOh9br+/5nPmm+mPSmwqEKcVHhGXTj2II8t0GWBFoBPsOsin+TaL+YDBqAUqQ2ZAIp5QX6tJ3f7+2D0gD3Rfc5J89m/IqCthTCe5c+tO3X3D1MrpEEs+AYAADIH+68p5sydUYtKLSmQAVjlqeuHb8fyZNSUVfqxmPWWWMbqyLftrtYS+Svmi9gyjvK0WhY6CzIiuAwXy9WwuSy8I/W8/65OjcFh+521p/b+eaqFNAhpAADQzeDYVi4qFezONFcGlMlFd2W/vnLoLs5R+rti1ZMFkNHK9ESeRP6KeYepOgrgLMCNggrWs5eEd3K3M5ha3j8z0NWhMDya3HtId16RShENSBqACe3X7huOY3tBpcIjUUCpNQGxDnHJ2E/ohGKvyauF0wQkltETeZxxJPJXzD+JZXS42ukOXbuQVrbkOcBb3Bfsh4P7VVqJf8xAe5vCeM7uKhb0hzdteixJoYyGJA3AYdq2DjxdLJkLjUWSVlxwBRottqBvGtrGBqqaGDjPGQbaXZWslrt/MY9ZBnoinwJNCyIimEFghr0q2k6tuqTiFC43zEBLRCiVebgQmws2nvnCYN2LaGDSAPyGjusH7iyU+ArHI+gU3h0CUFIR3pN9XL07+7hZCBMCDTPWRQF8RXL3L+Ytw4w2V+s1oc/zfYULARjnEOcGj9l3+E/qNHb7YwYCn2CY40LBXLjh5IFf17mEhicNwKto39r3nXye/7Of0aksD7QgEJH63NA2bk2KNp7H+wRMRP6alYFE/or5L2FGT+RSi6OMmcdf9xgabVQwnw63k01pJNN1Ad8n5HO4bN2p/XfVvYAmIA3Aa2i5tve/5bPmr4MWncodeEH5eFOp1/nE2P12fF7vE8DYkPEl8lcsCJaBUCu9NvJ4Pq90ydkQF4c/tW/y+nSB6z+XSSmgrVVhdMx8ce2pvf9Q9wKahDQAr6NlS9+VxZz5Qdiazh14onxcPXIn9cQHTXEeLguMmXG07yRLZMMfsYDEzOgOXNXh6nk5ClCChx69z3w8uEsXUljzTwR0dWgMDZuv9pzS9+W6F9BEpAE4gqAYX1wumJ9GKQQFVcjBknhYXzd4OxfJnVfzhhiAZtgNGR8kkb9iAWEGXK3U+ozHdh5GBJetYy/P3M5LnTFVZqfux1/UqTE4bL675uS+G+p+8CYjJ94jUDftLZUK8QXlgnkyjYyAig7xkfEHaHPhOZtV82efgMnI30Wuo+b7hCghflNiGct9Vy329bwKB8pxiJO9Z+z7/YfUONf/0eWiTo3hseS27tyqj9f50E1JGoAp6Lhx70i+oM8rl/iFTJ2bgAQKPsf6c4M/gmZj08zQrhULwJuI/GX5DooFiAFoIrUxCkDzJBzIQsGBMddktsFXibJcvz/tyaCfsaz5+ZAu/T694z5Tt4M3MTn5TtGim154sRLb91YqvC8T1bcJKKoQZ+SfUh/IPmLHdHq7aNXKZORvh6v1fLr7EWI6YmYc5Wu11G/+iODJZX/vD37Bm91nnZyt32glM9DZoTCetU+ODZXfd8IC3t1vuqQBmIa26/qfLZbt+XHMQ5mwfmmBDADkqBuGttPiZNxWqP7P1WrFAggnIn+lRReiGhGsm3wUoAwHR9GYuTy6nWK4ddtShRnobFfIF+yu8aJ593Hv2jdcp0PPC9IATFPH1v5Hi2X7vjhBLlPHyOCi8rCu/CJdPnKvzar0dtOarcnI3xZHyYY/YsFLmNHparUydG3cxH8Peevj49HdvN7Zrwt1yvtnBjraFQpF7s3m7LlvOH1gX10OPI9IAzAD7Vv7HyiX7fsSy9nIr18TkOhQfWrkHjqu9KIpqHR31ZoJA6DNUWZNKJG/QkyygFof+eRTc44CFOHjOKc/uTj4icpxUJdHlJP5/sUS78mWk/cec0b/7jocdt6RBmCGWrf235sv2d83zOV6NQExNDpMVn9maDvHaL7HAMYy1mZ8DrRE/goxaTIieHXkN91GQQxCYpX9dGY7OnVBVXjul0szV0N+SmXek8sm52w8ZeDpOT/oPCUNwCx0bB24o1CwHzbM5bBOTUBZR/i97CPqrPxTZryJ9glIGOhytVkloT9C/JaEgZ7Qo4xWTbNREAHIcoizvB38Hv8xZ7wOef+TF/9KhQ/l85VzN5wh+f6zIQ3ALLXfMHBroWI/bOs0EmBA0LDqc4M/4sBUbNIkGTrMbNe3+OxoJZG/QvwGy4yMo3RPxmuajYISaEQo2isz2wDQnOf9v3zxt4fyeX7v+tP2PDWnB1wAmuPq0eDarx24tVKyH6rX44CiCvD2wi518dgDdkw1/rLAmIElvuZlnoT+CPFaEmasDj1qb4KNggjAuA3xofDn9m3eCzo/x3n/k8/8yxW7Z7RI71x3Wu/Dc3rABUIagBrJbB34YanM5yU896sDGIDVnrp25Me0sjJkSw28LJABKLDdmAlYyYY/Qrwmy4CvSK/L+Nzoc2RKcLFKHTSfDO+kYh0u/h1t1Wf++Tyde+zm3Tvm9IALiDQANdR6Xf9d+ZJ9X8VyNhPMbVhQmVysrBzUV4/cZfMNvCwwZsZy3+XFnpZn/0IcQcyMlaFLi1xtGjkcqGg9e1nmTl7lDOrSHOb9Ty71K5W5N5+vnLv+tN0y7F9D0gDUWOfW/ntLBZwTGx6a68TAio7w8bH76O3FF0wjNgEMwAXs+owHlg1/hDgiZkAT6Q0tAYPRkPMB8xzg7e5z/MHg52rczt0jyMmEv0LR7hrLmnfIM//ak5PyHGi/oe/BStmeHce8Zy73DkigEJmi/uzgNrZgO9eTcKYrtozuyLUdrqPl2b8QUxNbxtG+VkcHTsOFAzEIxGyvzmzjjKqoZA4vIYs6NfIF+8Sh0fJZss5/bkgDMEdatvY/Ppaz76yU7XOZOdxKuKRDvCv3hDo/93hD7RNgAYSK7NrQp4a8jRGikRGpjRm/oSKCqxP/Irw7eMSe6T3lZO3chf4s6tQYz5mf788Wz37LWfv2zNFhFjxpAObQUTf1P5svq3fEZftoNEdNgAUBSqkbB7dTe5K3Mc19EMdUJJaxJvJtq6sl8leIaUoso8vVakXgNsxGQRU46KSsvTLaTgZqTpb9EQGLuzRGx8z2kbHRc9525oHBmh9EvEQagDnWdf3ugUK+cna5aO6NWvWcdMxF8nFcqVdfOnqfHVPphwMZAC2OMmsiVyJ/hZghS6TWZXxyG2QUIGcDfDT6iX2D+6IuzMHMf6Wqd/4jY+Yf9z3c+/43nTWar/lBxCtIA1AHHTfuHfH3mXeXcub7YauGmoMrdKICXDlyJ20o7zfFlPcJMJaxNvI51Eoif4WYIWMZHa7W3Q0QEVyChw3OnuRjwT0qz7WdcMwAHIfQ0aYwPJp8feXbez+26UokNT2IeFXSANQJfenFcnhN34eL2eSWIKPg6Np2ARVysDgZ0VuHbuM0cwESBjpdbbpDl2K59gsxKwkDayOPopQjgstW2yvC27DEGVeVGi77YwYCjxAFhOFR88VVJ/ZtrdmLiyOSBqDOoi39W/I588eeR/Cd2gYGlXWED4//Qp2W32myOqzdC08DM2N9xmdPkWa5+xdiViwzWhyle6L0IoKzHOI0/2l7fvCwM26jmr0uM5CJCKQQj46ZS1ef1Pflmr24mBJpAFLQsqX/v+cL9lImjmuZGmig4CFRnx/6ITs2sabOswFiBo7ydbJcNvwRomaqEcEutaUQEWyg4CO210TbyCFbnXRcA5PRvsZgOJ+15/ds7vu7mrywmBZpAFLScm3f35WK9r2x4UO1zAooqhCb88+oD409ZMfruCxwMvJ3feSTIon8FaJWLAOBVnWPCJ7c7e/3ggftSe5Onavhs/9FnQqlkn12dBy/u/a0vh/X7IXFtEgDkKLW6wfuLBVxZlzhHZnW2nwUDICVq24Yvg1HJ2OmXKf5AAkzlgauXeK71GjhJUI0u9gyVvqu6nS1qdfKmjIcLKURc3n0YyqjNhOLJ5f5ZXP27kNDdOaxZ0quf5qkAUhZ2w19zxwcLv9uXDTbolaNWswNLJGLNeV9zhXD93CuDhHBDMAB7IbIB0i+U0LUGgNwNKn1GZ+ZuS7zAfPWxyeiu7jHOaCL7M7qtZirM/07OzSGR83fPjPae86bz959sEalihlKe8m4mMAASt9c/dUgUFuTMqMcM2gWn47LBiVyzPndN2GXv1RHtlyzWn9TxTJ6Ijc5oS1y5O5fiLlBABRgHxwt2IOVxHFnc4I4ggIH2OgMJP/Q8ZdKw6oEMw8YYwaikEAElEr8+VWbev9HDUsVsyB3aw2CAIRX9V1fGLdXMSHOhLObHBiTRqvJ6xsHt3EyR6ldQDXyNyDYdZFE/goxlxgAqWpEsJrDcCAGwTLbqzLb0aaKKp7lxb+jXcEyRnJ5e4Fc/BuLNAANJrO176/KJXtObPBipmV2H09Jhzg/+6g6J7cjGddzkxCYWMbqjG/bJPJXiDmXWMZiz1HLA9fOxbLAyYl/7/SftGd7T6hxO/PzBhFw1CKNYsk+MZKvnNlzSt+/17JWMXvSADSg1q399+bG+bS4zPdErRpqhp+SBUERq88O/QgZU7JxjXfktQxktDI9oSeRv0LUCQNqQ8aHS7UfBYih0UJFc2W0nQBSMxk5nHze39WhMTZuv7fnEM58w6l7flXjUkUNSAPQoLo+29d//77ed1UK5utBoBC4M3skUFQB3lJ8wfmDsZ/xuKrtssCEGWszHkeORP4KUS8JMzpc7ayqcUQwAchxiAuDn+It7m6dn0HePzPQEhFcBxgaSf5o+dt2X3ziu3rHa1akqClpABrYO/4Exr+qb2u+YD9pgFwmmv7HxQCM8rBl+A50Vw7ZkprdbN5JhoF2R5nuwFUS+StEfRkG1oYehQq2VnNvSnCxWh0wl4R3UwEzWz3U1akQG+zN5+17Vp/U92c1Kk3MEWkAmkDLlr7v5CvmzDi2T0Qz2EyoTC6WxYP62qE7bIFqs57XMmN9S8C+Vkoif4WoL8OMVlfpNZFfs7kARevay6LbebkzMq28f2ZA65fW9981PGQ392zuu60mRYk5JQ1Ak+i8duCx3n3qjHLe/H0QKfjTfCRQ0RE+Ov4zOqn4fDLbbICEGYt9nazwtUT+CpGShIE1kUetjjJmlq+V4xCb3J32A8EvVNZOfR+RyTz/wFcYGU2+vOJtvWe/8Z19/bMsR9SJNABNZOOf7M4GV/ddUsonlzOQy2Sm/vElUAi5rD976EcAs51VpjfDbogCaKUk8leIlFhmhFrptZHPZhaNuAVBs7HXZLZRqGKVTOOysKhTIzHYm82ZC1ae2PfFGRchUiENQBMKtwx8K1vm0ypl+8uoVUNP8VMsqhBn5X+lLsg9asdmuCwwZmBp4NglnlZp7U4mhKhKGFgVOKrT1TPaKKi67C/C+eEv7ene0zo7hWV/zIDrEhZ1auTyZtvwkN0sS/yakzQATarrur4n+yp8eilnvuZ7CpF/5A2FGAQorT4zuA1dSd7GNL2ADwagwXZDJgCUbPgjRNosMzyt1PoZbhRUgYMuGjeXh7dTDAdHegVmoK1VQSmOx8aSLyx7a+95MuTfvKQBaGIbt/ZXwmv6ri8U7QdiYwcyreqI8cFF8rCxPOBcNnKvHVdTf9YHVDckWRG6tstVjtz9C9EYYstY5mt1lK+TZJpNQM4G+Hh0jz3G3aOL/NoThBmAVtVgn0rZ7sjm7O+sOLHvK7MsXaRMGoB5IHNt3w8qBXtSXLT/HEZHzgxIVIArRu+hY8p7TVFNbVUAA/Cp+uzfzmEGuRBieqoXZ6U2ZALQNCKCi+zhGGfAfDT8icrxa98MTK7tD0OF0TFzy+Do6OYNp/U/UJPiRaqkAZgnWj4zsN+7qu+ifD653ADDmRb1ms/yKuSgKxnTNwzdxmVMbblPzIzujG/bXOXMZsKREKL2YstY4mm1LHDs1EYBCAlre1VmO3epnK7wqz8OVKq6vC9J0JvL2/eveHvvljedNZqvbfUiLdIAzDMtWwa+VSzGJ8dl3ha2vPZywbKO8IHxh9TvFJ5OxvXrPwqwACKlzFqJ/BWiYTGRWh8FcKYwCpDlEKd7T9l3e4+qV5v4N7mDX2tGYSxn/y6Xx0mrT+q9da5qF+mQBmAear9+z3Pelb3nlXLJFgMefbXRAAOCC6s+f+hH8G1szet8FRLL6Ik8zkjkrxANK7GMLlerlaH7uhHBBgoByubqaBtpxeo3lwRP3vUbw/3jWfORFW/dfen603Yfmuv6Rf1JAzCPhVsGbilV6KS4zLeGGYXQpVfM8i2qACcVn3UuHPvFay4LNAy0OcqsDj2a7gQjIUR9GUCti3wKtDKvFhE8uezvg+HP+UTvOZ2zL4eCVUN9FDKhwnjWfPvgIG3qPqnv/9ateFF3MptrgSh+Y9WntKNudgN1dClvXxoj9DnGHqfTvLf7JhrXkfI4ecXPxZZxQnuY9ESeU5Fn/0I0PI8IT+VKybO5suP9Rm54mV10qZz5x44/p6P0uCqzW13X7wAdbRrjObMrNvzZ7hNlXf9CICMAC0S4ZeBbiamcGBftPwS+QhRUTwxlctFd2a+vGr7b5tQrd/9KGOhytVkZuBL5K0STSAD0RB61aPVb83WL7OGS8E5e7RxSJa5uDNbepqA0YSxnv1oYxIly8V84ZARgAYd9jCAAAAtESURBVCp9Y837lYMvu6F6Q1yw4CRBTMq8b9WNeDpYoTO2DABImO2mjsguD1xHGgAhmoenCLvy5WTHeOmlUYA8BzjO6Uv+vv2rigjK8TQyGUIuxw9UDD67+sTdP0u5bFFnMgKwAAVbev9jZO/opkrR/ikTl7wWDxlb1DcNbmMLAoMQM2OJ79ilniORv0I0mYSB7tCjDlcZwxMpoMz26mgb2tyyau9wwYyh7Li54eov7T5dLv4Lk4wALHC5r69+s+vxn3qeOg+VEj6x+Arzw7a36vYkbzd3Zewiz5HUPyGakKsI/cVK8thowcmjFe/xHzLfXvEdPW4ClCv8f8pl/uOezX19adcp0iMNgAAAFL65+iMBl/5kX/uajacv3oqjfD85pc1z4qle+2WFgBD1M4U0TgJAYPvT4TJXqKz/ffnXsKLS/8vhOPyj1Zt675z7IkWjkwZAvGTwaz2ti3DoM19adulndr7xQ20tKCGuzil6bVwNIIEmdcSdRA5HNOX/nKqHAQivtrLp9UpTAE3rZ0DTfyxG02x+iKf5MxNvwHSPU7OmbJrRz0x02Ic2NXbyZ6Z7nOni6X2HJgbPp0OBp/frEzC9z4oAWDZk+XWLYwAh4AzGLnrG/23Pn7X9/Vf+5dnsLRddNN33QMxX0gCI3/LAtz+4/sDji/9oWe++jzlgN89cwWuczwjgxHUc6zrOlE5iXP2hShjAKvVaL/vKYzBgtLKlTFie6u9AzEg8F7HvTevCGfuux1rpqZ69mQiV0AdP8YxPABLXMeUwqKD6U1M4CCP2PRjXndaFInEdD1odeZvI1yyWAGOsE5vKdH7GqVTgVOIpNQ7VrwNxUCh6OjF6SpUSQJbhF6f8dQCIQEmSuOU4nmpDwyB45TJ0bKb6SQFgCnNFTzFPbbdMIugkgVesTP0YRNBxEus4Mfwq53AGoADVQsotEeX2HNf9zUXnPP8XZ521/cBUfwuxMEgDIF6TBZ1V7Fj2nwLXPcuAkbN28vr9MprcfmS6d6fTr2fqYwazO850WT29QQMmspZoypURAKsITDStP1irlJ71XzgDylozjf8cihlkeVpvvbJWT6tUZqiZzE2Z5sjETN6/aY8ZzOQ4RNV/hzV3DICI0EYKCRhcjv/VH993swIen35BYiGQBkAc0f6VGz6iNX2xhdSbi2xRlOf9s8MzbGZmcJyaqMNZgjH9RwDilVqUggNCgc39MePm5f27bk+7JtHY5E9OTMmvjj3WPSpvrlCEG9uU7smyRVkaASFSF5FCQIQs2x3W2i8vHXjuu2nXJJqDNABiWnavXt2egXcNMV3XqtTRWbaoSCMgRN2FRIhIIcv2Ocv4y4dR+tZ5/f1Tn68hFjxpAMSM7O7uProFwRYQX92qdFfWSiMgRD0ERGhRCmPG9BHh64Oj9DdvGNuZS7su0XykARCz8uKytSsDT2+xwOXtSneNSyMgxJwIiRAphXFr9ijgljyXv7m6v3807bpE85IGQNTE4LJ1K+CpLQx8qpX04jxblKQREGLWIlIIiTBuTZ8i/FWpQn+zct/O4bTrEs1PGgBRU32rNi4LFF9JjMvblF5WYEaRJXdEiOkgABml4IGQtXYXCN/Mo/ztnr6+sbRrE/OHNABiTuxZumGRcukyDVzRotW6GIz8RI6AEOLVKVSX8xGAouXHmfkWU/G/u+zArwpp1ybmH2kAxJz6VcexmSVt9iIiXB0QvZ0AZK2VLFIhDuOA0KoUSmxhGPcq0C1d/c/+K9UlykosVNIAiLr4Y4C2rtr4PkN8tSY6t6W6fAmxzBMQC5hPhBZSGLemzMAPLNRfLet/9t606xILgzQAou4Ordh4Ihy+wjJd2K5Ue3FinoC0AmIhOPz5/pg1+zTw3YTtt5cNPP/rtGsTC4s0ACI1e5b2rPJcfTGT+kSo6DgFIGcZibQCYh5yJ+72K8wos/2lIvp2uYJ/lhn9Ii3SAIjU8bHHugeK5jxiXArg3Hal/QIzSjIqIJoc4eWo3lFrcoroB9biO0sHdt6ddm1CSAMgGsre1RuO1eCPKqaLAqU2KhDyMldANBlv4m6/xIyY+TFifC9W+nvL+57uT7s2ISZJAyAaUv/y5YHntZyjGR8zzO9u17o1ZkbBWkx5b1oh6sgBIVIEDULWmkMKuBVM/7h4YOfdcqIVjUi+l6Lh7enpWeWz9wFj7UcA2tyuFGTioGgECkCkFHwQhq2JNdO9pOifjKr8cNnu3YfSrk+I1yMNgGgqI93rToihLrTgCzxSbwhJoTgROyzNgKgHBSAkBb+6BS+s5Ucche+XSP3byt5nd6ZdnxBTJQ2AaEp34wx9/OqDpxvwB9nivFDROp9ImgExJw6/6OfYwjDvUKBbifFvRw3sfCTt+oSYCWkARNPbvXKl30rBGVap9yXM7w1IrQ+JUJ54TCCpg2ImNAihIvio3ukb5h0a9B+k+d8X7d71sKT0iWYnDYCYV3Z2d3uLbbApUXy+Ad6jQG9p0woJM4rVGdlplygaFKG6Vj8kgqqG9MQKeJhA2xKD25bt2fmIXPTFfCINgJi3GMC+7mPfppG8k1i9yxCf3KpUmwKhxBZlZhkdWOA0gGBiaD8Bo2DtISb+BTPd7hLuXNy365m0axRirkgDIBaMwXXrVthEnW4Z5zBwuiba2EoKBowSMyoyd2DeU6iu0Q+ouuPemDUGwFOK6B5l6S4/sD9v27VrKOUyhagLaQDEgsTHHuvuz5kTWOFMZv5dgE4MFS0NSSEBozzxuEBGCJrb5AXfJwUNIFcNlepjxkOOorttEt+3dM/up+REKBYi+d4LAWBk9er2BMEJhu3pFjiDGW/xFS3NkIIFUJ4YITAyRtCwCIAmggeCT9VTW5YtLHMvgMcZuF+R/tn+kvPkCQd+VUizViEagTQAQryK3atXt3vWe6MGnQTiUxg4AcDaVqVcjerz4srEKIEkE9YfAVAguFTdUleDEIORN7ZIhOcAegRsHzTghxDnn1mxf38x7ZqFaDTSAAgxBXcD+vg1x6xj8AnG2BMt6O0g3qhAK1uVhgZgJpsCAEbmE9QMAXCI4ILgEkEDSMDIWZtY5gGAngbzo56jfula3tHRv2t32jUL0QykARBihvYd/aaInPI6KD7egt7MwJuJsAGMFaFSoU8EQvViFTMjQbUxkHkFr06hOoTvTNzZO6CJxy8WReacZu63RDuZeIdj8YQB/3opxc+r/v5K2rUL0YykARCihvjYY939ebPCENY5zG+Eog3G4g0EXsNEy3yiKJgYsmZURw0SrjYJhgGL+TtyoFAdtlcTF3dn4n+B6u9fZEaFbVaD9jDQS8DTxHimwvYZZfiFFfte2EuQ/kmIWpEGQIg6sN3d3t7YWUKO7tYK3QnzBge02jB6FHipBS0jQmtA5HgTQTSE6tXOHtYcmIn/jyceMUz+SwMd/o+oegcPQE0M0+uJ34FRrb3MjBJzDPAYgfYx835FeN4y9TvgnVZhQFun/6g1Rx2i++6TqRVCzDFpAIRIGeMDatfRT3R1+npRCbTcIV5imbsZtEwxljCwlMBdFuggUDuBMyDyPSJ4E6MJwMsX45dfd/JftUWYyq3z4a9BExfwV3/Nw+Y8MMMyl4mQBWiUGGOWMESgfSB7kKzaS0QvxjY5GLDdW7Hu8Ip9O4fl5CNEuuRvUIgm0b98eeAEQUtonEwetsMStytDbY6iFmu5g4E2C7RoohYGAgZHBPgARagOGrQSQb32iAETMWImyhFADM4DiDVTzpAtE6ssE7LMyDqaRmE5Zy2NWeZx7ThjXE7yy7xyVp7JCyGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIMSv/H4rOruCTL+3PAAAAAElFTkSuQmCC";
var _client2;
var _DaffiWalletClient = class extends BaseClient {
  constructor({ metadata, client, clientOptions, algosdk, algodClient, network }) {
    super(metadata, algosdk, algodClient);
    __privateAdd(this, _client2, void 0);
    __publicField(this, "clientOptions");
    __publicField(this, "network");
    __privateSet(this, _client2, client);
    this.clientOptions = clientOptions;
    this.network = network;
    this.metadata = _DaffiWalletClient.metadata;
  }
  static async init({ clientOptions, algodOptions, clientStatic, getDynamicClient, algosdkStatic, network = DEFAULT_NETWORK }) {
    try {
      debugLog(`${PROVIDER_ID.DAFFI.toUpperCase()} initializing...`);
      let DaffiWalletConnect;
      if (clientStatic) {
        DaffiWalletConnect = clientStatic;
      } else if (getDynamicClient) {
        DaffiWalletConnect = await getDynamicClient();
      } else {
        throw new Error("Daffi Wallet provider missing required property: clientStatic or getDynamicClient");
      }
      const algosdk = algosdkStatic || (await Algod.init(algodOptions)).algosdk;
      const algodClient = getAlgodClient(algosdk, algodOptions);
      const daffiWallet = new DaffiWalletConnect({
        ...clientOptions && clientOptions
      });
      const provider = new _DaffiWalletClient({
        metadata: _DaffiWalletClient.metadata,
        client: daffiWallet,
        clientOptions,
        algosdk,
        algodClient,
        network
      });
      debugLog(`${PROVIDER_ID.DAFFI.toUpperCase()} initialized`, "\u2705");
      return provider;
    } catch (e) {
      console.error("Error initializing...", e);
      return null;
    }
  }
  async connect(onDisconnect) {
    const accounts = await __privateGet(this, _client2).connect();
    __privateGet(this, _client2).connector?.on("disconnect", onDisconnect);
    if (accounts.length === 0) {
      throw new Error(`No accounts found for ${_DaffiWalletClient.metadata.id}`);
    }
    const mappedAccounts = accounts.map((address, index) => ({
      name: `Daffi Wallet ${index + 1}`,
      address,
      providerId: _DaffiWalletClient.metadata.id
    }));
    return {
      ..._DaffiWalletClient.metadata,
      accounts: mappedAccounts
    };
  }
  async reconnect(onDisconnect) {
    const accounts = await __privateGet(this, _client2).reconnectSession().catch(console.info);
    __privateGet(this, _client2).connector?.on("disconnect", onDisconnect);
    if (!accounts) {
      onDisconnect();
      return null;
    }
    return {
      ..._DaffiWalletClient.metadata,
      accounts: accounts.map((address, index) => ({
        name: `Daffi Wallet ${index + 1}`,
        address,
        providerId: _DaffiWalletClient.metadata.id
      }))
    };
  }
  async disconnect() {
    await __privateGet(this, _client2).disconnect();
  }
  async signTransactions(connectedAccounts, txnGroups, indexesToSign, returnGroup = true) {
    const transactions = Array.isArray(txnGroups[0]) ? txnGroups.flatMap((txn) => txn) : txnGroups;
    const decodedTxns = transactions.map((txn) => {
      return this.algosdk.decodeObj(txn);
    });
    const signedIndexes = [];
    const txnsToSign = decodedTxns.reduce((acc, txn, i2) => {
      const isSigned = "txn" in txn;
      if (indexesToSign && indexesToSign.length && indexesToSign.includes(i2)) {
        signedIndexes.push(i2);
        acc.push({
          txn: this.algosdk.decodeUnsignedTransaction(transactions[i2])
        });
      } else if (indexesToSign && indexesToSign.length && !indexesToSign.includes(i2)) {
        acc.push({
          txn: isSigned ? this.algosdk.decodeSignedTransaction(transactions[i2]).txn : this.algosdk.decodeUnsignedTransaction(transactions[i2]),
          signers: []
        });
      } else if (!isSigned && connectedAccounts.includes(this.algosdk.encodeAddress(txn["snd"]))) {
        signedIndexes.push(i2);
        acc.push({
          txn: this.algosdk.decodeUnsignedTransaction(transactions[i2])
        });
      } else if (isSigned) {
        acc.push({
          txn: this.algosdk.decodeSignedTransaction(transactions[i2]).txn,
          signers: []
        });
      } else if (!isSigned) {
        acc.push({
          txn: this.algosdk.decodeUnsignedTransaction(transactions[i2]),
          signers: []
        });
      }
      return acc;
    }, []);
    const result = await __privateGet(this, _client2).signTransaction([txnsToSign]);
    const signedTxns = transactions.reduce((acc, txn, i2) => {
      if (signedIndexes.includes(i2)) {
        const signedByUser = result.shift();
        signedByUser && acc.push(signedByUser);
      } else if (returnGroup) {
        acc.push(transactions[i2]);
      }
      return acc;
    }, []);
    return signedTxns;
  }
};
var DaffiWalletClient = _DaffiWalletClient;
_client2 = new WeakMap();
__publicField(DaffiWalletClient, "metadata", {
  id: PROVIDER_ID.DAFFI,
  name: "Daffi",
  icon: ICON$9,
  isWalletConnect: true
});
var ICON$8 = "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMzIgMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogIDxjaXJjbGUgZmlsbD0iIzI0NUVDNiIgY3g9IjE2IiBjeT0iMTYiIHI9IjE2Ii8+CiAgPHBvbHlnb24gZmlsbD0iI0ZGRkZGRiIgcG9pbnRzPSIxMi40LDIxLjIgMTQuNSwyMS4yIDE1LjMsMTkuOSAxNi42LDE3LjYgMTguMSwxNC45IDE5LjksMTEuNyAyMC4yLDExLjIgMjAuMywxMS43IDIyLjksMjEuMiAyNSwyMS4yIDIxLjUsOC45IDIxLjQsOC42IDE5LjUsOC42IDE5LjUsOC43IDE3LjgsMTEuOCAxNiwxNC45IDE1LjgsMTQuMSAxNS4yLDExLjcgMTUuMSwxMS41IDE0LjQsOC45IDE0LjMsOC42IDEyLjQsOC42IDEyLjQsOC43IDEwLjcsMTEuOCA4LjksMTUgNy4xLDE4IDUuMywyMS4yIDcuNCwyMS4yIDkuMiwxOCAxMSwxNC44IDEyLjgsMTEuNiAxMy4xLDExLjEgMTMuMiwxMS42IDEzLjcsMTMuNyAxNC40LDE2LjMgMTQuNiwxNy4yIDE0LjIsMTgiLz4KPC9zdmc+";
var _client3;
var _MyAlgoWalletClient = class extends BaseClient {
  constructor({ metadata, client, clientOptions, algosdk, algodClient, network }) {
    super(metadata, algosdk, algodClient);
    __privateAdd(this, _client3, void 0);
    __publicField(this, "clientOptions");
    __publicField(this, "network");
    __privateSet(this, _client3, client);
    this.clientOptions = clientOptions;
    this.network = network;
    this.metadata = _MyAlgoWalletClient.metadata;
  }
  static async init({ clientOptions, algodOptions, clientStatic, getDynamicClient, algosdkStatic, network = DEFAULT_NETWORK }) {
    try {
      debugLog(`${PROVIDER_ID.MYALGO.toUpperCase()} initializing...`);
      let MyAlgoConnect;
      if (clientStatic) {
        MyAlgoConnect = clientStatic;
      } else if (getDynamicClient) {
        MyAlgoConnect = await getDynamicClient();
      } else {
        throw new Error("MyAlgo Wallet provider missing required property: clientStatic or getDynamicClient");
      }
      const algosdk = algosdkStatic || (await Algod.init(algodOptions)).algosdk;
      const algodClient = getAlgodClient(algosdk, algodOptions);
      const myAlgo = new MyAlgoConnect({
        ...clientOptions ? clientOptions : { disableLedgerNano: false }
      });
      const provider = new _MyAlgoWalletClient({
        metadata: _MyAlgoWalletClient.metadata,
        client: myAlgo,
        clientOptions,
        algosdk,
        algodClient,
        network
      });
      debugLog(`${PROVIDER_ID.MYALGO.toUpperCase()} initialized`, "\u2705");
      return provider;
    } catch (e) {
      console.error("Error initializing...", e);
      return null;
    }
  }
  async connect() {
    const accounts = await __privateGet(this, _client3).connect();
    if (accounts.length === 0) {
      throw new Error(`No accounts found for ${_MyAlgoWalletClient.metadata.id}`);
    }
    const mappedAccounts = accounts.map((account) => ({
      ...account,
      providerId: _MyAlgoWalletClient.metadata.id
    }));
    return {
      ..._MyAlgoWalletClient.metadata,
      accounts: mappedAccounts
    };
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async reconnect() {
    return null;
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async disconnect() {
    return;
  }
  async signTransactions(connectedAccounts, transactions, indexesToSign, returnGroup = true) {
    const decodedTxns = transactions.map((txn) => {
      return this.algosdk.decodeObj(txn);
    });
    const signedIndexes = [];
    const txnsToSign = decodedTxns.reduce((acc, txn, i2) => {
      const isSigned = "txn" in txn;
      if (indexesToSign && indexesToSign.length && indexesToSign?.includes(i2)) {
        signedIndexes.push(i2);
        acc.push(transactions[i2]);
      } else if (!isSigned && connectedAccounts.includes(this.algosdk.encodeAddress(txn["snd"]))) {
        signedIndexes.push(i2);
        acc.push(transactions[i2]);
      }
      return acc;
    }, []);
    const result = await __privateGet(this, _client3).signTransaction(txnsToSign);
    const signedTxns = transactions.reduce((acc, txn, i2) => {
      if (signedIndexes.includes(i2)) {
        const signedByUser = result.shift()?.blob;
        signedByUser && acc.push(signedByUser);
      } else if (returnGroup) {
        acc.push(txn);
      }
      return acc;
    }, []);
    return signedTxns;
  }
};
var MyAlgoWalletClient = _MyAlgoWalletClient;
_client3 = new WeakMap();
__publicField(MyAlgoWalletClient, "metadata", {
  id: PROVIDER_ID.MYALGO,
  name: "MyAlgo",
  icon: ICON$8,
  isWalletConnect: false
});
var ICON$7 = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxuczpzZXJpZj0iaHR0cDovL3d3dy5zZXJpZi5jb20vIiBzdHlsZT0iZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjI7Ij4KICAgIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDI0IiBoZWlnaHQ9IjEwMjQiLz4KICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDEuNjgyMDksMCwwLDEuNjgyMDksMjI2LjM2OCwyMTIuODE4KSI+CiAgICAgICAgPHBhdGggZD0iTTMyNy4wNDksMjgwLjE5MkwxNjkuNTI0LDEzTDEyLDI4MC4xOTJMMTY5LjUyNCwxODkuMDg0TDMyNy4wNDksMjgwLjE5MloiIHN0eWxlPSJmaWxsOndoaXRlO2ZpbGwtcnVsZTpub256ZXJvOyIvPgogICAgPC9nPgogICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMS42ODIwOSwwLDAsMS42ODIwOSwyMjYuMzY4LDIxMi44MTgpIj4KICAgICAgICA8cGF0aCBkPSJNMjk5LjU0NiwzMDdMMTY5LjUyNSwyMzguNDczTDM5LjUwNCwzMDdMMTY5LjUyNSwyNjQuNjdMMjk5LjU0NiwzMDdaIiBzdHlsZT0iZmlsbDp3aGl0ZTtmaWxsLXJ1bGU6bm9uemVybzsiLz4KICAgIDwvZz4KPC9zdmc+Cg==";
var _client4;
var _DeflyWalletClient = class extends BaseClient {
  constructor({ metadata, client, clientOptions, algosdk, algodClient, network }) {
    super(metadata, algosdk, algodClient);
    __privateAdd(this, _client4, void 0);
    __publicField(this, "clientOptions");
    __publicField(this, "network");
    __privateSet(this, _client4, client);
    this.clientOptions = clientOptions;
    this.network = network;
    this.metadata = _DeflyWalletClient.metadata;
  }
  static async init({ clientOptions, algodOptions, clientStatic, getDynamicClient, algosdkStatic, network = DEFAULT_NETWORK }) {
    try {
      debugLog(`${PROVIDER_ID.DEFLY.toUpperCase()} initializing...`);
      let DeflyWalletConnect;
      if (clientStatic) {
        DeflyWalletConnect = clientStatic;
      } else if (getDynamicClient) {
        DeflyWalletConnect = await getDynamicClient();
      } else {
        throw new Error("Defly Wallet provider missing required property: clientStatic or getDynamicClient");
      }
      const algosdk = algosdkStatic || (await Algod.init(algodOptions)).algosdk;
      const algodClient = getAlgodClient(algosdk, algodOptions);
      const deflyWallet = new DeflyWalletConnect({
        ...clientOptions && clientOptions
      });
      const provider = new _DeflyWalletClient({
        metadata: _DeflyWalletClient.metadata,
        client: deflyWallet,
        algosdk,
        algodClient,
        network
      });
      debugLog(`${PROVIDER_ID.DEFLY.toUpperCase()} initialized`, "\u2705");
      return provider;
    } catch (e) {
      console.error("Error initializing...", e);
      return null;
    }
  }
  async connect(onDisconnect) {
    const accounts = await __privateGet(this, _client4).connect().catch(console.info);
    __privateGet(this, _client4).connector?.on("disconnect", onDisconnect);
    if (!accounts || accounts.length === 0) {
      throw new Error(`No accounts found for ${_DeflyWalletClient.metadata.id}`);
    }
    const mappedAccounts = accounts.map((address, index) => ({
      name: `Defly Wallet ${index + 1}`,
      address,
      providerId: _DeflyWalletClient.metadata.id
    }));
    return {
      ..._DeflyWalletClient.metadata,
      accounts: mappedAccounts
    };
  }
  async reconnect(onDisconnect) {
    const accounts = await __privateGet(this, _client4).reconnectSession().catch(console.info);
    __privateGet(this, _client4).connector?.on("disconnect", onDisconnect);
    if (!accounts) {
      return null;
    }
    return {
      ..._DeflyWalletClient.metadata,
      accounts: accounts.map((address, index) => ({
        name: `Defly Wallet ${index + 1}`,
        address,
        providerId: _DeflyWalletClient.metadata.id
      }))
    };
  }
  async disconnect() {
    await __privateGet(this, _client4).disconnect();
  }
  async signTransactions(connectedAccounts, txnGroups, indexesToSign, returnGroup = true) {
    const transactions = Array.isArray(txnGroups[0]) ? txnGroups.flatMap((txn) => txn) : txnGroups;
    const decodedTxns = transactions.map((txn) => {
      return this.algosdk.decodeObj(txn);
    });
    const signedIndexes = [];
    const txnsToSign = decodedTxns.reduce((acc, txn, i2) => {
      const isSigned = "txn" in txn;
      if (indexesToSign && indexesToSign.length && indexesToSign.includes(i2)) {
        signedIndexes.push(i2);
        acc.push({
          txn: this.algosdk.decodeUnsignedTransaction(transactions[i2])
        });
      } else if (indexesToSign && indexesToSign.length && !indexesToSign.includes(i2)) {
        acc.push({
          txn: isSigned ? this.algosdk.decodeSignedTransaction(transactions[i2]).txn : this.algosdk.decodeUnsignedTransaction(transactions[i2]),
          signers: []
        });
      } else if (!isSigned && connectedAccounts.includes(this.algosdk.encodeAddress(txn["snd"]))) {
        signedIndexes.push(i2);
        acc.push({
          txn: this.algosdk.decodeUnsignedTransaction(transactions[i2])
        });
      } else if (isSigned) {
        acc.push({
          txn: this.algosdk.decodeSignedTransaction(transactions[i2]).txn,
          signers: []
        });
      } else if (!isSigned) {
        acc.push({
          txn: this.algosdk.decodeUnsignedTransaction(transactions[i2]),
          signers: []
        });
      }
      return acc;
    }, []);
    const result = await __privateGet(this, _client4).signTransaction([txnsToSign]);
    const signedTxns = transactions.reduce((acc, txn, i2) => {
      if (signedIndexes.includes(i2)) {
        const signedByUser = result.shift();
        signedByUser && acc.push(signedByUser);
      } else if (returnGroup) {
        acc.push(transactions[i2]);
      }
      return acc;
    }, []);
    return signedTxns;
  }
};
var DeflyWalletClient = _DeflyWalletClient;
_client4 = new WeakMap();
__publicField(DeflyWalletClient, "metadata", {
  id: PROVIDER_ID.DEFLY,
  name: "Defly",
  icon: ICON$7,
  isWalletConnect: true
});
var ICON$6 = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI2LjUuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAzMDAgMzAwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMDAgMzAwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6dXJsKCNTVkdJRF8xXyk7fQoJLnN0MXtmaWxsOnVybCgjU1ZHSURfMDAwMDAwNDM0MjYxNjcxNDAxMDY1ODIyNzAwMDAwMDIxMzA3Njg5MDYwNzMxMTM0ODRfKTt9Cgkuc3Qye2ZpbGw6dXJsKCNTVkdJRF8wMDAwMDEwMjUxOTMxNjAxNTI3NjU4MTY0MDAwMDAxNjI3NDExMjM4MzE3NTY0MTc1OV8pO2ZpbHRlcjp1cmwoI0Fkb2JlX09wYWNpdHlNYXNrRmlsdGVyKTt9Cgkuc3Qze2ZpbGw6dXJsKCNTVkdJRF8wMDAwMDEzODU2MzM4MjQ2MjA4NjAyMDM1MDAwMDAxNDg3ODQ5MDI3MDc4MjA3MTIwN18pO30KCS5zdDR7bWFzazp1cmwoI21hc2swXzE2NjFfMjk1XzAwMDAwMDg4MTMyMjUxNTk3NDQxNTczNDkwMDAwMDExNjkzNjEyMDE4NTA2NjgxNDgxXyk7fQoJLnN0NXtmaWxsOnVybCgjU1ZHSURfMDAwMDAxMDYxMjA2MzI0NjE3OTI4NzExNjAwMDAwMDc0MzM5MTMwMzgzMzc3NjY1NzZfKTt9Cjwvc3R5bGU+CjxnPgoJCgkJPGxpbmVhckdyYWRpZW50IGlkPSJTVkdJRF8xXyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSIyNDYuNjAzIiB5MT0iOS4yMjEyIiB4Mj0iMTc0LjE1OCIgeTI9IjMwOC41NDI2IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIC0xIDAgMzAyKSI+CgkJPHN0b3AgIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6IzBCNDZGOSIvPgoJCTxzdG9wICBvZmZzZXQ9IjEiIHN0eWxlPSJzdG9wLWNvbG9yOiNCQkZCRTAiLz4KCTwvbGluZWFyR3JhZGllbnQ+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMjc0LjcsOTMuOUwxNjYuNiwyM3YzOS42bDY5LjQsNDUuMWwtOC4yLDI1LjhoLTYxLjJ2MzIuOWg2MS4ybDguMiwyNS44bC02OS40LDQ1LjFWMjc3bDEwOC4yLTcwLjdMMjU3LDE1MC4xCgkJTDI3NC43LDkzLjl6Ii8+CgkKCQk8bGluZWFyR3JhZGllbnQgaWQ9IlNWR0lEXzAwMDAwMDE4MjI4MjM3MTUxMjM5MTUxMzIwMDAwMDE3ODM4NjY0MjU5NzY2MjczOTI1XyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSIxMjkuMzUxNiIgeTE9Ii0xOS4xNTczIiB4Mj0iNTYuOTA2NiIgeTI9IjI4MC4xNjQxIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIC0xIDAgMzAyKSI+CgkJPHN0b3AgIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6IzBCNDZGOSIvPgoJCTxzdG9wICBvZmZzZXQ9IjEiIHN0eWxlPSJzdG9wLWNvbG9yOiNCQkZCRTAiLz4KCTwvbGluZWFyR3JhZGllbnQ+Cgk8cGF0aCBzdHlsZT0iZmlsbDp1cmwoI1NWR0lEXzAwMDAwMDE4MjI4MjM3MTUxMjM5MTUxMzIwMDAwMDE3ODM4NjY0MjU5NzY2MjczOTI1Xyk7IiBkPSJNNzIuNSwxNjYuNGg2MXYtMzIuOUg3Mi4ybC03LjktMjUuOAoJCWw2OS4yLTQ1LjFWMjNMMjUuMyw5My45TDQzLDE1MC4xbC0xNy43LDU2LjJMMTMzLjcsMjc3di0zOS42bC02OS40LTQ1LjFMNzIuNSwxNjYuNHoiLz4KCTxkZWZzPgoJCTxmaWx0ZXIgaWQ9IkFkb2JlX09wYWNpdHlNYXNrRmlsdGVyIiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIHg9IjI1LjQiIHk9IjIzIiB3aWR0aD0iMjQ3LjYiIGhlaWdodD0iMjU0Ij4KCQkJPGZlQ29sb3JNYXRyaXggIHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIxIDAgMCAwIDAgIDAgMSAwIDAgMCAgMCAwIDEgMCAwICAwIDAgMCAxIDAiLz4KCQk8L2ZpbHRlcj4KCTwvZGVmcz4KCQoJCTxtYXNrIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiIHg9IjI1LjQiIHk9IjIzIiB3aWR0aD0iMjQ3LjYiIGhlaWdodD0iMjU0IiBpZD0ibWFzazBfMTY2MV8yOTVfMDAwMDAwODgxMzIyNTE1OTc0NDE1NzM0OTAwMDAwMTE2OTM2MTIwMTg1MDY2ODE0ODFfIj4KCQkKCQkJPGxpbmVhckdyYWRpZW50IGlkPSJTVkdJRF8wMDAwMDE2NTkyOTcyNDMwMzE2NDIwMzAwMDAwMDAwNzEwMTkwNDk4NDUxOTkxNTE2Ml8iIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iMjQ2LjYwMzgiIHkxPSI5LjIyMTQiIHgyPSIxNzQuMTU4OCIgeTI9IjMwOC41NDI4IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIC0xIDAgMzAyKSI+CgkJCTxzdG9wICBvZmZzZXQ9IjAiIHN0eWxlPSJzdG9wLWNvbG9yOiMwQjQ2RjkiLz4KCQkJPHN0b3AgIG9mZnNldD0iMSIgc3R5bGU9InN0b3AtY29sb3I6I0JCRkJFMCIvPgoJCTwvbGluZWFyR3JhZGllbnQ+CgkJPHBhdGggc3R5bGU9ImZpbGw6dXJsKCNTVkdJRF8wMDAwMDE2NTkyOTcyNDMwMzE2NDIwMzAwMDAwMDAwNzEwMTkwNDk4NDUxOTkxNTE2Ml8pO2ZpbHRlcjp1cmwoI0Fkb2JlX09wYWNpdHlNYXNrRmlsdGVyKTsiIGQ9IgoJCQlNMjc0LjcsOTMuOUwxNjYuNiwyM3YzOS42bDY5LjQsNDUuMWwtOC4yLDI1LjhoLTYxLjJ2MzIuOWg2MS4ybDguMiwyNS44bC02OS40LDQ1LjFWMjc3bDEwOC4yLTcwLjdMMjU3LDE1MC4xTDI3NC43LDkzLjl6Ii8+CgkJCgkJCTxsaW5lYXJHcmFkaWVudCBpZD0iU1ZHSURfMDAwMDAxMTk4MTE3MDc2MjE0NzI4MTQyNzAwMDAwMTA4Mjk2NTkzODM4NTEyMDI0OTFfIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjEyOS4zNTIxIiB5MT0iLTE5LjE1NzEiIHgyPSI1Ni45MDcxIiB5Mj0iMjgwLjE2NDIiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoMSAwIDAgLTEgMCAzMDIpIj4KCQkJPHN0b3AgIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6IzBCNDZGOSIvPgoJCQk8c3RvcCAgb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojQkJGQkUwIi8+CgkJPC9saW5lYXJHcmFkaWVudD4KCQk8cGF0aCBzdHlsZT0iZmlsbDp1cmwoI1NWR0lEXzAwMDAwMTE5ODExNzA3NjIxNDcyODE0MjcwMDAwMDEwODI5NjU5MzgzODUxMjAyNDkxXyk7IiBkPSJNNzIuNSwxNjYuNGg2MXYtMzIuOUg3Mi4ybC03LjktMjUuOAoJCQlsNjkuMi00NS4xVjIzTDI1LjMsOTMuOUw0MywxNTAuMWwtMTcuNyw1Ni4yTDEzMy43LDI3N3YtMzkuNmwtNjkuNC00NS4xTDcyLjUsMTY2LjR6Ii8+Cgk8L21hc2s+Cgk8ZyBjbGFzcz0ic3Q0Ij4KCQkKCQkJPGxpbmVhckdyYWRpZW50IGlkPSJTVkdJRF8wMDAwMDEwOTAxOTkxODU1Nzc3MzA1MzQyMDAwMDAxNzYwMjQwNTkwODA2NzEyMDMwMF8iIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iNDYuNDY2MiIgeTE9IjIyOC43NTU0IiB4Mj0iMTcxLjg2MzgiIHkyPSIxMzUuMTAzOSIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAtMSAwIDMwMikiPgoJCQk8c3RvcCAgb2Zmc2V0PSIwLjExOTgiIHN0eWxlPSJzdG9wLWNvbG9yOiM4OTUyRkY7c3RvcC1vcGFjaXR5OjAuODciLz4KCQkJPHN0b3AgIG9mZnNldD0iMSIgc3R5bGU9InN0b3AtY29sb3I6I0RBQkRGRjtzdG9wLW9wYWNpdHk6MCIvPgoJCTwvbGluZWFyR3JhZGllbnQ+CgkJCgkJCTxyZWN0IHg9IjI1LjQiIHk9IjIzIiBzdHlsZT0iZmlsbDp1cmwoI1NWR0lEXzAwMDAwMTA5MDE5OTE4NTU3NzczMDUzNDIwMDAwMDE3NjAyNDA1OTA4MDY3MTIwMzAwXyk7IiB3aWR0aD0iMjQ3LjYiIGhlaWdodD0iMjU0Ii8+Cgk8L2c+CjwvZz4KPC9zdmc+Cg==";
var _client5;
var _ExodusClient = class extends BaseClient {
  constructor({ metadata, client, clientOptions, algosdk, algodClient, network }) {
    super(metadata, algosdk, algodClient);
    __privateAdd(this, _client5, void 0);
    __publicField(this, "clientOptions");
    __publicField(this, "network");
    __privateSet(this, _client5, client);
    this.clientOptions = clientOptions;
    this.network = network;
    this.metadata = _ExodusClient.metadata;
  }
  static async init({ clientOptions, algodOptions, algosdkStatic, network = DEFAULT_NETWORK }) {
    try {
      debugLog(`${PROVIDER_ID.EXODUS.toUpperCase()} initializing...`);
      if (typeof window == "undefined" || window.exodus === void 0) {
        throw new Error("Exodus is not available.");
      }
      const algosdk = algosdkStatic || (await Algod.init(algodOptions)).algosdk;
      const algodClient = getAlgodClient(algosdk, algodOptions);
      const exodus = window.exodus.algorand;
      const provider = new _ExodusClient({
        metadata: _ExodusClient.metadata,
        client: exodus,
        algosdk,
        algodClient,
        clientOptions: clientOptions || { onlyIfTrusted: false },
        network
      });
      debugLog(`${PROVIDER_ID.EXODUS.toUpperCase()} initialized`, "\u2705");
      return provider;
    } catch (e) {
      console.warn(e);
      console.warn(`Error initializing ${_ExodusClient.metadata.name}.`, "Do you have the extension installed?", "https://www.exodus.com/web3-wallet");
      return null;
    }
  }
  async connect() {
    const { address } = await __privateGet(this, _client5).connect({
      onlyIfTrusted: this.clientOptions.onlyIfTrusted
    });
    if (!address) {
      throw new Error(`No accounts found for ${_ExodusClient.metadata.id}`);
    }
    const accounts = [
      {
        name: `Exodus 1`,
        address,
        providerId: _ExodusClient.metadata.id
      }
    ];
    return {
      ..._ExodusClient.metadata,
      accounts
    };
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async reconnect(onDisconnect) {
    if (window === void 0 || window.exodus === void 0 || window.exodus.algorand.isConnected !== true) {
      onDisconnect();
    }
    return null;
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async disconnect() {
    return;
  }
  async signTransactions(connectedAccounts, txnGroups, indexesToSign, returnGroup = true) {
    const transactions = Array.isArray(txnGroups[0]) ? txnGroups.flatMap((txn) => txn) : txnGroups;
    const decodedTxns = transactions.map((txn) => {
      return this.algosdk.decodeObj(txn);
    });
    const signedIndexes = [];
    const txnsToSign = decodedTxns.reduce((acc, txn, i2) => {
      const isSigned = "txn" in txn;
      if (indexesToSign && indexesToSign.length && indexesToSign.includes(i2)) {
        signedIndexes.push(i2);
        acc.push(transactions[i2]);
      } else if (!isSigned && connectedAccounts.includes(this.algosdk.encodeAddress(txn["snd"]))) {
        signedIndexes.push(i2);
        acc.push(transactions[i2]);
      }
      return acc;
    }, []);
    const result = await __privateGet(this, _client5).signTransaction(txnsToSign);
    const signedTxns = transactions.reduce((acc, txn, i2) => {
      if (signedIndexes.includes(i2)) {
        const signedByUser = result.shift();
        signedByUser && acc.push(signedByUser);
      } else if (returnGroup) {
        acc.push(transactions[i2]);
      }
      return acc;
    }, []);
    return signedTxns;
  }
};
var ExodusClient = _ExodusClient;
_client5 = new WeakMap();
__publicField(ExodusClient, "metadata", {
  id: PROVIDER_ID.EXODUS,
  name: "Exodus",
  icon: ICON$6,
  isWalletConnect: false
});
var ICON$5 = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjM4IiBoZWlnaHQ9IjIzOCIgdmlld0JveD0iMCAwIDIzOCAyMzgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik01MS43MDUgMTQ1LjA0MkgxMTYuNzA1TDEwNy43MDUgMTU1LjA0Mkg1MS43MDVWMTQ1LjA0MloiIGZpbGw9IiNENjQ1MDAiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNDcuNTE5IDE5MS41NTdMMTI5LjU3NyAxNDQuMzk0TDE0Mi40MDQgMTI3LjExMkwxNjcuODc1IDE5MS41NTdIMTQ3LjUxOVpNMTEwLjkzNiA5NS4zOTMyTDEyMC42MTMgMTIwLjgzMUwxMzMuMzU5IDEwNC4yMjhMMTE3LjQ3NSA2NC4wNDIyQzExNS45MjggNjAuMTI4IDExMi4xNDYgNTcuNTU2NSAxMDcuOTM4IDU3LjU1NjVDMTAzLjcyOSA1Ny41NTY1IDk5Ljk0NzQgNjAuMTI4IDk4LjQwMDMgNjQuMDQyMkw2Ny45NjU5IDE0MS4wNDJIODcuNzgwN0M5NS40MTUzIDEyMS4wMTEgMTAyLjg5MyAxMDEuMzk5IDEwNS4xOTggOTUuMzU0MUMxMDUuNjQxIDk0LjE5MTIgMTA2Ljc0MyA5My40NTk5IDEwNy45ODcgOTMuNDU5OUgxMDguMTMyQzEwOS4zNzggOTMuNDU5OSAxMTAuNDkzIDk0LjIyOTMgMTEwLjkzNiA5NS4zOTMyWk04MC45MjEgMTU5LjA0MkM3NC45Mjg5IDE3NC43NjggNjkuODY2MSAxODguMDYzIDY4LjU0NDcgMTkxLjU1N0g0OEw2MC44NTE0IDE1OS4wNDJIODAuOTIxWiIgZmlsbD0iIzIyMkI2MCIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE3Ni4wMjYgNTQuNzUwOUMxNzcuOTk3IDUyLjA4NzIgMTgxLjc1NCA1MS41MjU3IDE4NC40MTggNTMuNDk2N0MxODcuMDgyIDU1LjQ2NzggMTg3LjY0MyA1OS4yMjUxIDE4NS42NzIgNjEuODg4OEwxMzAuMDEzIDEzNy4xMDdDMTI5LjcxNCAxMzcuNTEyIDEyOS4zNDEgMTM3Ljg1NyAxMjguOTEzIDEzOC4xMjNMMTE3Ljg1NiAxNDUuMDEzQzExNy4wODcgMTQ1LjQ5MyAxMTYuMTI4IDE0NC43ODMgMTE2LjM2MSAxNDMuOTA3TDExOS43MTggMTMxLjMxOEMxMTkuODQ3IDEzMC44MzIgMTIwLjA2OCAxMzAuMzc0IDEyMC4zNjcgMTI5Ljk3TDE3MC42NyA2MS45ODlMMTY5LjkyOSA2MS40NDA1QzE2OS40ODUgNjEuMTEyIDE2OC44NTkgNjEuMjA1NiAxNjguNTMgNjEuNjQ5NkwxNTIuMzExIDgzLjU2ODhDMTUyLjU4NiA4NC4yMDIzIDE1Mi41MjQgODQuOTYxMiAxNTIuMDg0IDg1LjU1NjJMMTQ5LjExIDg5LjU3NTVDMTQ4LjQ1MyA5MC40NjM0IDE0Ny4yMDEgOTAuNjUwNiAxNDYuMzEzIDg5Ljk5MzZDMTQ1LjQyNSA4OS4zMzY2IDE0NS4yMzggODguMDg0MSAxNDUuODk1IDg3LjE5NjJMMTQ3LjY3OSA4NC43ODQ3TDE0OC44NjkgODMuMTc2OUwxNjcuMzA4IDU4LjI1NzRDMTY4LjYyMiA1Ni40ODE1IDE3MS4xMjcgNTYuMTA3MiAxNzIuOTAzIDU3LjQyMTJMMTczLjY0NCA1Ny45Njk3TDE3Ni4wMjYgNTQuNzUwOVoiIGZpbGw9IiNENjQ1MDAiLz4KPC9zdmc+Cg==";
var _client6;
var _AlgoSignerClient = class extends BaseClient {
  constructor({ metadata, client, algosdk, algodClient, network }) {
    super(metadata, algosdk, algodClient);
    __privateAdd(this, _client6, void 0);
    __publicField(this, "network");
    __publicField(this, "walletStore");
    __privateSet(this, _client6, client);
    this.network = network;
    this.walletStore = useWalletStore;
  }
  static async init({ algodOptions, algosdkStatic, network = DEFAULT_NETWORK }) {
    try {
      debugLog(`${PROVIDER_ID.ALGOSIGNER.toUpperCase()} initializing...`);
      if (typeof window == "undefined" || window.algorand === void 0) {
        throw new Error("AlgoSigner is not available.");
      }
      const algosdk = algosdkStatic || (await Algod.init(algodOptions)).algosdk;
      const algodClient = getAlgodClient(algosdk, algodOptions);
      const algosigner = window.algorand;
      const provider = new _AlgoSignerClient({
        metadata: _AlgoSignerClient.metadata,
        client: algosigner,
        algosdk,
        algodClient,
        network
      });
      debugLog(`${PROVIDER_ID.ALGOSIGNER.toUpperCase()} initialized`, "\u2705");
      return provider;
    } catch (e) {
      console.warn(e);
      console.warn(`Error initializing ${_AlgoSignerClient.metadata.name}.`, "Do you have the extension installed?", "https://www.purestake.com/technology/algosigner");
      return null;
    }
  }
  async connect() {
    const { accounts } = await __privateGet(this, _client6).enable({ genesisID: this.getGenesisID() });
    if (accounts.length === 0) {
      throw new Error(`No accounts found for ${_AlgoSignerClient.metadata.id}`);
    }
    const mappedAccounts = await Promise.all(accounts.map(async (address, index) => {
      const { "auth-addr": authAddr } = await this.getAccountInfo(address);
      return {
        name: `AlgoSigner ${index + 1}`,
        address,
        providerId: _AlgoSignerClient.metadata.id,
        ...authAddr && { authAddr }
      };
    }));
    mappedAccounts.sort((a2, b2) => accounts.indexOf(a2.address) - accounts.indexOf(b2.address));
    return {
      ..._AlgoSignerClient.metadata,
      accounts: mappedAccounts
    };
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async reconnect(onDisconnect) {
    if (window === void 0 || window.algorand === void 0) {
      onDisconnect();
    }
    return null;
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async disconnect() {
    return;
  }
  async signTransactions(connectedAccounts, transactions, indexesToSign, returnGroup = true) {
    const decodedTxns = transactions.map((txn) => {
      return this.algosdk.decodeObj(txn);
    });
    const signedIndexes = [];
    const txnsToSign = decodedTxns.reduce((acc, txn, i2) => {
      const isSigned = "txn" in txn;
      const sender = this.algosdk.encodeAddress(isSigned ? txn.txn.snd : txn.snd);
      const authAddress = this.getAuthAddress(sender);
      if (indexesToSign && indexesToSign.length && indexesToSign.includes(i2)) {
        signedIndexes.push(i2);
        acc.push({
          txn: __privateGet(this, _client6).encoding.msgpackToBase64(transactions[i2]),
          ...authAddress && { authAddr: authAddress }
        });
      } else if (!isSigned && connectedAccounts.includes(sender)) {
        signedIndexes.push(i2);
        acc.push({
          txn: __privateGet(this, _client6).encoding.msgpackToBase64(transactions[i2]),
          ...authAddress && { authAddr: authAddress }
        });
      } else {
        acc.push({
          txn: __privateGet(this, _client6).encoding.msgpackToBase64(isSigned ? this.algosdk.decodeSignedTransaction(transactions[i2]).txn.toByte() : this.algosdk.decodeUnsignedTransaction(transactions[i2]).toByte()),
          signers: []
        });
      }
      return acc;
    }, []);
    const result = await __privateGet(this, _client6).signTxns(txnsToSign);
    const signedTxns = transactions.reduce((acc, txn, i2) => {
      if (signedIndexes.includes(i2)) {
        const signedByUser = result[i2];
        signedByUser && acc.push(new Uint8Array(Buffer.from(signedByUser, "base64")));
      } else if (returnGroup) {
        acc.push(txn);
      }
      return acc;
    }, []);
    return signedTxns;
  }
  getGenesisID() {
    if (this.network === "betanet") {
      return "betanet-v1.0";
    }
    if (this.network === "testnet") {
      return "testnet-v1.0";
    }
    if (this.network === "mainnet") {
      return "mainnet-v1.0";
    }
    return this.network;
  }
  getAuthAddress(address) {
    const accounts = this.walletStore.getState().accounts;
    const account = accounts.find((acct) => acct.address === address && acct.providerId === this.metadata.id);
    return account?.authAddr;
  }
};
var AlgoSignerClient = _AlgoSignerClient;
_client6 = new WeakMap();
__publicField(AlgoSignerClient, "metadata", {
  id: PROVIDER_ID.ALGOSIGNER,
  name: "AlgoSigner",
  icon: ICON$5,
  isWalletConnect: false
});
var ICON$4 = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNjAuMjUxIiBoZWlnaHQ9IjU2LjU1NSIgZmlsbD0iI2FiNDdiYyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgNjAuMjUxIDU2LjU1NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KIDxwYXRoIGQ9Im00Ni45MzQgNDEuMDU1Yy0wLjExNjM3IDZlLTMgLTAuMjUzOTItMC4wMjM5LTAuMzU3OTQtMC4wNzYxLTAuMTExMDUtMC4wNTU3LTAuMjIyNDEtMC4xNTQ5LTAuMjk0MjgtMC4yNTYxNi0wLjA4LTAuMTEyNzUtMC4xNDAxMS0wLjI2NjE3LTAuMTYzNzUtMC40MDIzNC0wLjAyNjktMC4xNTQ4LTAuMDE3Ni0wLjM0MDI2IDAuMDE4Ni0wLjQ5MzE1IDAuMDQxMy0wLjE3NDI5IDAuMTMwMTEtMC4zNjUxOSAwLjIzMTg5LTAuNTEyNTMgMC4xMTU0LTAuMTY3MjcgMC4yODUtMC4zMzQ2MyAwLjQ1MDQ1LTAuNDUyNTkgMC4xODY1NC0wLjEzMjg3IDAuNDI4MjItMC4yNDc1NCAwLjY0NzY0LTAuMzEzMDEgMC4yNDQ5OS0wLjA3MzIgMC41NDA5Ni0wLjEwOTQ1IDAuNzk2NTgtMC4xMDI4NSAwLjI4MyA3ZS0zIDAuNjA3MDggMC4wNjg4IDAuODc0NzQgMC4xNjA5OCAwLjI5NDE3IDAuMTAxMzUgMC42MTQgMC4yNzExNyAwLjg2NTM2IDAuNDU0NSAwLjI3NDM2IDAuMjAwMDYgMC41NTQzOCAwLjQ3ODU3IDAuNzU5NDMgMC43NDkyMSAwLjIyMjQgMC4yOTM2NCAwLjQyNzA0IDAuNjY5NTggMC41NTY5MyAxLjAxNDIgMC4xNDAyMSAwLjM3MTc4IDAuMjM3NzQgMC44MjI4OCAwLjI2ODA4IDEuMjE5IDAuMDMyNSAwLjQyNTIzLTJlLTMgMC45MTkzNC0wLjA4ODUgMS4zMzY5LTAuMDkyOCAwLjQ0NjMxLTAuMjczNzMgMC45NDM3My0wLjQ4NTcgMS4zNDcyLTAuMjI1NzEgMC40Mjk1OS0wLjU1NTg3IDAuODg2MDMtMC44OTAzOCAxLjIzNzctMC4zNTQ5NiAwLjM3MzA2LTAuODIzNzMgMC43NDM1Ni0xLjI2NjYgMS4wMDYxLTAuNDY4NDYgMC4yNzc3Ny0xLjA1MTggMC41MjA3NC0xLjU3NzggMC42NjE0OC0wLjU1NDggMC4xNDg1Mi0xLjIxNjIgMC4yMjk0NC0xLjc5MDUgMC4yMjMwNS0wLjYwNDE5LTZlLTMgLTEuMjk3MS0wLjExMTM3LTEuODc3My0wLjI3OTc5LTAuNjA4ODgtMC4xNzY4NS0xLjI4MDItMC40NzczLTEuODE5Ni0wLjgxMDMyLTAuNTY0OTItMC4zNDg5LTEuMTU4NC0wLjgzOTYtMS42MS0xLjMyNjQtMC40NzE4Ni0wLjUwODctMC45MzMyOS0xLjE2OC0xLjI1MjktMS43ODQtMC4zMzM0Ni0wLjY0MjYzLTAuNjE0ODQtMS40MzM1LTAuNzY1OTItMi4xNDE1LTAuMTU3MzYtMC43Mzc0LTAuMjIxNjctMS42MDk0LTAuMTc4MTItMi4zNjIgMC4wNDU0LTAuNzgyNzUgMC4yMjA1OS0xLjY3NDggMC40NzEyMy0yLjQxNzYgMC4yNjAzLTAuNzcxNDYgMC42ODA0Mi0xLjYxNjcgMS4xMzUtMi4yOTIxIDAuNDcxNDMtMC43MDAzNSAxLjEyMjgtMS40MzA5IDEuNzYyMS0xLjk4MjIgMC42NjIyMi0wLjU3MDk4IDEuNTEyMi0xLjEyMzIgMi4zMDE1LTEuNDk5NyAwLjgxNjM4LTAuMzg5NTYgMS44MTUtMC43MDkzOCAyLjcwNTEtMC44NzA0NyAwLjkxOTc3LTAuMTY2NCAyLjAwMjItMC4yMTQxIDIuOTMzNC0wLjEzMzA4IDAuOTYxMjkgMC4wODM3IDIuMDUyNSAwLjMyOTUxIDIuOTU4MSAwLjY2MjU1IDAuOTMzOTMgMC4zNDM1NiAxLjk1MzQgMC44ODMzNSAyLjc2NDQgMS40NTk2IDAuODM1ODcgMC41OTM5NyAxLjcwMzcgMS40MDYgMi4zNTQ1IDIuMTk4MSAwLjY3MDIyIDAuODE1NTQgMS4zMTM0IDEuODU2MiAxLjc0NjYgMi44MTg4IDAuNDQ1NTcgMC45OTAxNCAwLjgwMzkyIDIuMTk2NSAwLjk3NDggMy4yNjg3IDAuMTc1NjggMS4xMDIyIDAuMjA2ODcgMi4zOTUzIDAuMDg4MSAzLjUwNS0wLjEyMTkgMS4xMzk3LTAuNDM4MzIgMi40MzAxLTAuODUzODcgMy40OTgzLTAuNDI2NjEgMS4wOTY1LTEuMDg2MiAyLjI5LTEuNzg0NCAzLjIzNjktMC43MTYzMSAwLjk3MTMtMS42ODkgMS45NzYzLTIuNjM0IDIuNzI2OC0wLjk2ODc1IDAuNzY5MzMtMi4yMDAzIDEuNTAzNS0zLjMzNjIgMS45OTMzLTEuMTYzOCAwLjUwMTc5LTIuNTc4IDAuODk4NjktMy44MzI0IDEuMDc5NC0xLjI4NDQgMC4xODUwMy0yLjc4ODMgMC4xOTk2Mi00LjA3NjQgMC4wNDMxLTEuMzE4My0wLjE2MDAyLTIuODA3OC0wLjU0NjkzLTQuMDM4Ny0xLjA0NTItMS4yNTktMC41MDk2Ni0yLjYyNjctMS4yODg5LTMuNzA5My0yLjEwOTEtMS4xMDY4LTAuODM4NTMtMi4yNDkxLTEuOTcyLTMuMDk5MS0zLjA2OTktMC44Njg1NS0xLjEyMi0xLjY5MzgtMi41NDQxLTIuMjQwMS0zLjg1MzctMC41NTgtMS4zMzczLTAuOTkzNDQtMi45NTk0LTEuMTgzOC00LjM5Ni0wLjE3NzM4LTEuMTkzNi0wLjU2MTUxLTIuNTM4Ni0xLjA0NDQtMy42NDQ1LTAuNDcwOS0xLjA3ODItMS4xNzQ5LTIuMjQ2MS0xLjkxMTEtMy4xNjM4LTAuNzE3MjctMC44OTQxLTEuNjc2Ni0xLjgxMzItMi42MDI3LTIuNDg4Ny0wLjkwMTY3LTAuNjU3NjUtMi4wMzcxLTEuMjc3My0zLjA3OTQtMS42NzYxLTEuMDE0LTAuMzg4MTgtMi4yMzgtMC42ODA5Ni0zLjMxODMtMC43OTAxOS0xLjA1MDItMC4xMDYxNS0yLjI3MzEtMC4wNjk0LTMuMzE0NCAwLjEwMzE2LTEuMDExNSAwLjE2NzU4LTIuMTQ4NiAwLjUxMzE3LTMuMDgwOCAwLjk0LTAuOTA0NzYgMC40MTQyNi0xLjg4MiAxLjAyNzItMi42NDY1IDEuNjY0My0wLjc0MTIgMC42MTc3My0xLjQ5OTYgMS40Mzk4LTIuMDUyOCAyLjIzMDQtMC41MzU4MSAwLjc2NTkyLTEuMDM1NyAxLjcyNzMtMS4zNTE1IDIuNjA3LTAuMzA1NTYgMC44NTEzMS0wLjUyNzg2IDEuODc2Mi0wLjU5ODc4IDIuNzc3OC0wLjA2ODUgMC44NzE3NC0wLjAxNTMgMS44ODQgMC4xNDgxIDIuNzQzIDAuMTU3NzUgMC44MjkzOCAwLjQ2NDc5IDEuNzU4NyAwLjgzNTU3IDIuNTE3MiAwLjM1NzU2IDAuNzMxNDQgMC44Nzk1MyAxLjUxNzkgMS40MTc1IDIuMTI5IDAuNTE4MDYgMC41ODg0MyAxLjIwMjkgMS4xODYyIDEuODU4MSAxLjYxNjkgMC42MzAwNiAwLjQxNDA1IDEuNDE3NCAwLjc5NDI0IDIuMTM0NSAxLjAyNjggMC42ODg3NCAwLjIyMzE2IDEuNTE0NCAwLjM3NDg3IDIuMjM3NiAwLjQwNzM0IDAuNjkzMjEgMC4wMzEyIDEuNDk0OS0wLjAzODcgMi4xNzE1LTAuMTkzMDIgMC42NDczMi0wLjE0NzY3IDEuMzY5LTAuNDE2MjggMS45NTM2LTAuNzMxMTEgMC41NTgyLTAuMzAwNjYgMS4xNTQtMC43MzE3NSAxLjYxMTYtMS4xNzA3IDAuNDM1OTktMC40MTgyMSAwLjg3MzEzLTAuOTY1OTggMS4xODA5LTEuNDg1OSAwLjI5MjY4LTAuNDk0MjIgMC41NTMzMS0xLjEwNzUgMC43MDIxNS0xLjY2MjIgMC4xNDEwNi0wLjUyNTk0IDAuMjIyMy0xLjE1MjYgMC4yMTYwMi0xLjY5NzItNmUtMyAtMC41MTQ4Ny0wLjA5MjQtMS4xMDYxLTAuMjM4MDYtMS42LTAuMTM3MjMtMC40NjU0OC0wLjM2NzQyLTAuOTc5NzItMC42MjY1NS0xLjM4OTktMC4yNDM1LTAuMzg1NDItMC41ODM4OC0wLjc5MDczLTAuOTIzOTItMS4wOTQyLTAuMzE4MjQtMC4yODM5Ni0wLjcyOTEtMC41NjA2Ni0xLjExMzYtMC43NDUxNi0wLjM1ODE1LTAuMTcxODQtMC43OTc2NS0wLjMxMjkyLTEuMTg5Ny0wLjM3NzMzLTAuMzYzNDgtMC4wNTk4LTAuNzkxMzgtMC4wNzA3LTEuMTU2OS0wLjAyNDgtMC4zMzY4NiAwLjA0MjMtMC43MTgxMiAwLjE0NTQ0LTEuMDI4NSAwLjI4MzEtMC4yODQ0NyAwLjEyNjA1LTAuNTkxNTIgMC4zMTgwMi0wLjgyNjQgMC41MjIxMi0wLjIxMzY3IDAuMTg1NzgtMC40Mjg4NSAwLjQzNTY2LTAuNTc2NzMgMC42NzcxMi0wLjEzMzUxIDAuMjE4MDQtMC4yNTAwOSAwLjQ5MjYzLTAuMzA5MTggMC43NDEzMy0wLjA1MzEgMC4yMjI3My0wLjA3NDYgMC40ODk0My0wLjA1MjcgMC43MTcyNyAwLjAxOTQgMC4yMDIyOCAwLjA3OTUgMC40MzI3OCAwLjE2NjYzIDAuNjE2NDQgMC4wNzY4IDAuMTYxODMgMC4xOTc3MSAwLjMzNDIgMC4zMjgwMiAwLjQ1NzA2IDAuMTE0MjQgMC4xMDc3NSAwLjI3MDIyIDAuMjA4NTcgMC40MTc2NyAwLjI2MjY2IDAuMTI5NzggMC4wNDc4IDAuMjkyNjggMC4wNzIzIDAuNDMwMzQgMC4wNTk0IDAuMTIzNi0wLjAxMTYgMC4yNjUyMS0wLjA1ODQgMC4zNjkwMS0wLjEyNjcgMC4wOTczLTAuMDY0IDAuMTkxOTYtMC4xNjgyMiAwLjI0NDg4LTAuMjcxOTEgMC4wNTI4LTAuMTAzODEgMC4xNDc1NS0wLjIwODAzIDAuMjQ0ODctMC4yNzIwMyAwLjEwMzY5LTAuMDY4MiAwLjI0NTMtMC4xMTUwOCAwLjM2OTAxLTAuMTI2NjkgMC4xMzc2Ni0wLjAxMjkgMC4zMDA0NiAwLjAxMTkgMC40MzAyMyAwLjA1OTQgMC4xNDc0NiAwLjA1NDEgMC4zMDM1NCAwLjE1NDkxIDAuNDE3NzggMC4yNjI2NSAwLjEzMDMyIDAuMTIyODcgMC4yNTEyNiAwLjI5NTI0IDAuMzI4MDIgMC40NTcwNyAwLjA4NzEgMC4xODM2NCAwLjE0NzE0IDAuNDE0MTUgMC4xNjY2MyAwLjYxNjQ0IDAuMDIxOCAwLjIyNzk0IDJlLTQgMC40OTQ2NC0wLjA1MjcgMC43MTcyNy0wLjA1OTIgMC4yNDg4MS0wLjE3NTc4IDAuNTIzMjgtMC4zMDkzIDAuNzQxMzItMC4xNDc3NyAwLjI0MTQ4LTAuMzYzMDQgMC40OTEzNS0wLjU3NjcyIDAuNjc3MTQtMC4yMzQ4NiAwLjIwNDEtMC41NDE5MiAwLjM5NjA1LTAuODI2MjkgMC41MjIxMS0wLjMxMDQ2IDAuMTM3NjYtMC42OTE2MSAwLjI0MDgzLTEuMDI4NiAwLjI4MzEtMC4zNjU0IDAuMDQ1Ny0wLjc5MzM5IDAuMDM1LTEuMTU2OC0wLjAyNDctMC4zOTIxMi0wLjA2NDUtMC44MzE1LTAuMjA1NTktMS4xODk4LTAuMzc3NDItMC4zODQ1Ni0wLjE4NDUyLTAuNzk1MzEtMC40NjEyMi0xLjExMzYtMC43NDUxNi0wLjM0MDE1LTAuMzAzNDMtMC42ODA0My0wLjcwODc1LTAuOTIzOTItMS4wOTQyLTAuMjU5MjQtMC40MTAyMi0wLjQ4OTQyLTAuOTI0NDQtMC42MjY2Ni0xLjM4OTktMC4xNDU2NC0wLjQ5Mzg5LTAuMjMyMS0xLjA4NTEtMC4yMzgwNi0xLjYtNmUtMyAtMC41NDQ1NyAwLjA3NDktMS4xNzEyIDAuMjE2MTMtMS42OTcyIDAuMTQ4ODQtMC41NTQ2OSAwLjQwOTM3LTEuMTY3OSAwLjcwMjA0LTEuNjYyMiAwLjMwNzkxLTAuNTE5ODggMC43NDUwNi0xLjA2NzYgMS4xODEtMS40ODU4IDAuNDU3NDktMC40Mzg5NyAxLjA1MzMtMC44NzAwNiAxLjYxMTYtMS4xNzA3IDAuNTg0NS0wLjMxNDgzIDEuMzA2Mi0wLjU4MzQ0IDEuOTUzNi0wLjczMTExIDAuNjc2NDktMC4xNTQyNyAxLjQ3ODItMC4yMjQyMiAyLjE3MTUtMC4xOTMwMiAwLjcyMzIzIDAuMDMyNSAxLjU0ODggMC4xODQxOSAyLjIzNzUgMC40MDc0NCAwLjcxNzI2IDAuMjMyNDIgMS41MDQ1IDAuNjEyNjEgMi4xMzQ2IDEuMDI2OCAwLjY1NTIgMC40MzA1NSAxLjM0MDEgMS4wMjg0IDEuODU4MiAxLjYxNjggMC41Mzc5NyAwLjYxMTExIDEuMDU5OSAxLjM5NzYgMS40MTc1IDIuMTI5IDAuMzcwNzEgMC43NTg0NyAwLjY3Nzc3IDEuNjg3OCAwLjgzNTU1IDIuNTE3MiAwLjE2MzMzIDAuODU4OTcgMC4yMTY2NiAxLjg3MTMgMC4xNDgxMSAyLjc0My0wLjA3MDkgMC45MDE3OC0wLjI5MzIyIDEuOTI2NS0wLjU5ODc3IDIuNzc3OC0wLjMxNTc5IDAuODc5ODQtMC44MTU2NiAxLjg0MTEtMS4zNTE1IDIuNjA3MS0wLjU1MzExIDAuNzkwNjEtMS4zMTE2IDEuNjEyNi0yLjA1MjggMi4yMzA0LTAuNzY0NDIgMC42MzcxMS0xLjc0MTYgMS4yNS0yLjY0NjMgMS42NjQzLTAuOTMyMjIgMC40MjY4NC0yLjA2OTQgMC43NzI0Mi0zLjA4MDkgMC45NDAwMS0xLjA0MTIgMC4xNzI1OC0yLjI2NDIgMC4yMDkzMS0zLjMxNDQgMC4xMDMxNi0xLjA4MDItMC4xMDkyNC0yLjMwNDItMC40MDIwMi0zLjMxODMtMC43OTAwOS0xLjA0MjItMC4zOTg5NC0yLjE3NzctMS4wMTg2LTMuMDc5NC0xLjY3NjItMC45MjYwOS0wLjY3NTQyLTEuODg1NC0xLjU5NDYtMi42MDI3LTIuNDg4Ny0wLjczNjI1LTAuOTE3NjQtMS40NDAxLTIuMDg1Ni0xLjkxMS0zLjE2MzgtMC40ODMwMi0xLjEwNTktMC44NjcwOC0yLjQ1MDktMS4wNDQ1LTMuNjQ0NS0wLjE4MTktMS4yMjM2LTAuMjAxOTktMi42NTczLTAuMDU4Mi0zLjg4NTkgMC4xNDczNS0xLjI1ODggMC41MTA3NS0yLjY4MTkgMC45ODE0Ni0zLjg1ODYgMC40ODE5Ny0xLjIwNDggMS4yMjEzLTIuNTE0NSAyLjAwMDgtMy41NTE4IDAuNzk3NzUtMS4wNjE2IDEuODc3Ni0yLjE1ODIgMi45MjQ2LTIuOTc1IDEuMDcwOC0wLjgzNTU1IDIuNDI5Ni0xLjYzMDQgMy42ODEyLTIuMTU3OSAxLjI3OTUtMC41MzkyNiAyLjgzMjItMC45NjE4MyA0LjIwODEtMS4xNDkgMS40MDU5LTAuMTkxMiAzLjA1MDMtMC4xOTQ3MiA0LjQ1NzMtMC4wMTMxIDEuNDM3MyAwLjE4NTQ2IDMuMDU5NyAwLjYxOTQyIDQuMzk5IDEuMTcyOCAxLjEyMjUgMC40NDMxMSAyLjQ3OTIgMC43ODI5NiAzLjY3ODQgMC45MTc2MyAxLjE2OTIgMC4xMzEyOCAyLjUzMjUgMC4xMDU2MiAzLjY5NTUtMC4wNzMxIDEuMTMyOS0wLjE3NDE3IDIuNDA4Ni0wLjU0NTMyIDMuNDU2Ni0xLjAwOTYgMS4wMjA0LTAuNDUyMDYgMi4xMjQ4LTEuMTI1NyAyLjk5MTMtMS44Mjg4IDAuODQzMTEtMC42ODQxNSAxLjcwODgtMS41OTc4IDIuMzQzNC0yLjQ3ODYgMC42MTY5OC0wLjg1NjQzIDEuMTk2Ny0xLjkzMzkgMS41Njc5LTIuOTIyIDAuMzYwNTEtMC45NTk3OSAwLjYyOTg2LTIuMTE3MyAwLjcyNjMzLTMuMTM4MSAwLjA5MzYtMC45OTA2OCAwLjA1MTUtMi4xNDM0LTAuMTE4MDgtMy4xMjQtMC4xNjQzOS0wLjk1MDc0LTAuNDk3MS0yLjAxODYtMC45MDUyOC0yLjg5MjktMC4zOTUzMi0wLjg0NzA2LTAuOTc4MDEtMS43NjA3LTEuNTgyLTIuNDc0LTAuNTg0NS0wLjY5MDIyLTEuMzYwOS0xLjM5NTEtMi4xMDYzLTEuOTA3NS0wLjcyMDU3LTAuNDk1MTgtMS42MjQtMC45NTUyMi0yLjQ0OTUtMS4yNDMyLTAuNzk3MTItMC4yNzgwOS0xLjc1NTUtMC40NzY4Ny0yLjU5NzgtMC41MzUtMC44MTIyNC0wLjA1Ni0xLjc1NDMgM2UtMyAtMi41NTI0IDAuMTYzMTEtMC43Njg2OCAwLjE1NDM4LTEuNjI4OCAwLjQ0ODU1LTIuMzI5NCAwLjgwMDc0LTAuNjczNjIgMC4zMzg1Ni0xLjM5NjUgMC44MzAyMi0xLjk1NjQgMS4zMzUyLTAuNTM3NjcgMC40ODQ4NC0xLjA4MTkgMS4xMjQtMS40NzE3IDEuNzM0LTAuMzczNDkgMC41ODQ4My0wLjcxMzg2IDEuMzE0LTAuOTE4NDkgMS45NzcxLTAuMTk1OCAwLjYzNDQ0LTAuMzI0MDggMS4zOTM4LTAuMzQzNjggMi4wNTc1LTAuMDE4NiAwLjYzMzY4IDAuMDU2OCAxLjM2NTIgMC4yMDgxNCAxLjk4MDkgMC4xNDQxNiAwLjU4Njc0IDAuNCAxLjIzOTIgMC42OTYxOSAxLjc2NTggMC4yODE3MiAwLjUwMDUxIDAuNjgyNDYgMS4wMzI4IDEuMDg4NSAxLjQzOTEgMC4zODQ4NyAwLjM4NTIgMC44ODY5OCAwLjc2ODkgMS4zNjE3IDEuMDM1NyAwLjQ0ODg2IDAuMjUyMjIgMS4wMDQyIDAuNDczMDMgMS41MDQ3IDAuNTkzODcgMC40NzE3NSAwLjExMzgyIDEuMDMyMSAwLjE3MTYzIDEuNTE3IDAuMTUyMjUgMC40NTU0Ny0wLjAxODEgMC45NzY2Mi0wLjExMDE5IDEuNDA5NS0wLjI1MzA3IDAuNDA1LTAuMTMzNjIgMC44NTAwNC0wLjM1MTAzIDEuMjAyMS0wLjU5MTc0IDAuMzI3OTEtMC4yMjQzMyAwLjY2OTc4LTAuNTM0NDcgMC45MjE2OC0wLjg0MTczIDAuMjMzNDctMC4yODQ3OSAwLjQ1Njc0LTAuNjQ5OTggMC41OTk3My0wLjk4OTQgMC4xMzE5MS0wLjMxMjkgMC4yMzMxNi0wLjY5NDU5IDAuMjY5MjUtMS4wMzIzIDAuMDMzMS0wLjMwOTQgMC4wMjAyLTAuNjcxMjgtMC4wMzkxLTAuOTc2NjMtMC4wNTQxLTAuMjc3OTktMC4xNjI5LTAuNTg5My0wLjI5OC0wLjgzODEtMC4xMjIxMS0wLjIyNDY1LTAuMzAxNjItMC40NjI4MS0wLjQ4NzQtMC42MzgzNy0wLjE2NjQxLTAuMTU3MjYtMC4zODY1OC0wLjMwOTQtMC41OTQ4My0wLjQwNDM3LTAuMTg0OTMtMC4wODQ0LTAuNDE0NTgtMC4xNDc1Ny0wLjYxNzE4LTAuMTYzODUtMC4xNzg0NS0wLjAxNDUtMC4zODgzIDRlLTMgLTAuNTU5ODIgMC4wNTU1LTAuMTUwNDMgMC4wNDUxLTAuMzE1NzggMC4xMjk3OC0wLjQzNjQgMC4yMzA0LTAuMTA2MTUgMC4wODg2LTAuMjA4ODggMC4yMTczLTAuMjY2NDkgMC4zNDMwMy0wLjA1MTkgMC4xMTI4Ni0wLjA4MjEgMC4yNTg5My0wLjA3NDggMC4zODI4NiA2ZS0zIDAuMTE2MjcgMC4wNDk2IDAuMjUwNDEgMC4xMTMwNyAwLjM0ODA0IDAuMDYzNCAwLjA5NzcgMC4xMDYzNiAwLjIzMTc4IDAuMTEzMTcgMC4zNDgxNSA2ZS0zIDAuMTIzOTItMC4wMjMxIDAuMjctMC4wNzQ4IDAuMzgyODUtMC4wNTc2IDAuMTI1NjMtMC4xNjA0NSAwLjI1NDM1LTAuMjY2NjEgMC4zNDI5My0wLjEyMDUgMC4xMDA3Mi0wLjI4NTg0IDAuMTg1MzYtMC40MzYyOSAwLjIzMDUxLTAuMTcxNTEgMC4wNTEzLTAuMzgxMzYgMC4wNjk5LTAuNTU5ODEgMC4wNTU1LTAuMjAyNi0wLjAxNjQtMC40MzIyNS0wLjA3OTUtMC42MTcxOC0wLjE2Mzk2LTAuMjA4MzUtMC4wOTUtMC40Mjg1My0wLjI0Njk5LTAuNTk0ODMtMC40MDQyNS0wLjE4NTg5LTAuMTc1NTYtMC4zNjUyOS0wLjQxMzgzLTAuNDg3NDEtMC42MzgzOC0wLjEzNTIxLTAuMjQ4ODEtMC4yNDQwMi0wLjU2MDIyLTAuMjk3OTktMC44MzgxLTAuMDU5NS0wLjMwNTQ2LTAuMDcyLTAuNjY3MzQtMC4wMzkxLTAuOTc2NzMgMC4wMzYtMC4zMzc2IDAuMTM3MzQtMC43MTkyOCAwLjI2OTE1LTEuMDMyMiAwLjE0MzEtMC4zMzk0MyAwLjM2NjM2LTAuNzA0NyAwLjU5OTg0LTAuOTg5NSAwLjI1MTktMC4zMDcyNyAwLjU5Mzc2LTAuNjE3MyAwLjkyMTY5LTAuODQxNjMgMC4zNTE5Ny0wLjI0MDgzIDAuNzk3MTItMC40NTgyNCAxLjIwMjEtMC41OTE4NSAwLjQzMjg5LTAuMTQyNzcgMC45NTQwNS0wLjIzNDg2IDEuNDA5NS0wLjI1Mjk3IDAuNDg0OTYtMC4wMTk0IDEuMDQ1MyAwLjAzODMgMS41MTcgMC4xNTIyNSAwLjUwMDUgMC4xMjA4NSAxLjA1NTggMC4zNDE1NSAxLjUwNDcgMC41OTM4OCAwLjQ3NDczIDAuMjY2OCAwLjk3NjczIDAuNjUwNTEgMS4zNjE3IDEuMDM1NyAwLjQwNTk2IDAuNDA2MjcgMC44MDY4IDAuOTM4NTEgMS4wODg0IDEuNDM5MSAwLjI5NjMgMC41MjY0OCAwLjU1MjAzIDEuMTc5IDAuNjk2MjkgMS43NjU2IDAuMTUxNCAwLjYxNTY5IDAuMjI2NzggMS4zNDcyIDAuMjA4MDMgMS45ODEtMC4wMTk1IDAuNjYzNzItMC4xNDc3NyAxLjQyMjktMC4zNDM1NiAyLjA1NzQtMC4yMDQ2MyAwLjY2MzA3LTAuNTQ1IDEuMzkyNC0wLjkxODU5IDEuOTc3MS0wLjM4OTY4IDAuNjEwMTYtMC45MzM5NCAxLjI0OTMtMS40NzE2IDEuNzM0MS0wLjU1OTkxIDAuNTA0ODYtMS4yODI4IDAuOTk2NTItMS45NTY2IDEuMzM1Mi0wLjcwMDQ0IDAuMzUyMDktMS41NjA2IDAuNjQ2MzctMi4zMjkzIDAuODAwNzUtMC43OTgxOSAwLjE2MDMzLTEuNzQwMyAwLjIxOTEtMi41NTI0IDAuMTYzMS0wLjg0MjI3LTAuMDU4Mi0xLjgwMDctMC4yNTY5MS0yLjU5NzgtMC41MzUtMC44MjU2NS0wLjI4ODEtMS43Mjg5LTAuNzQ4MDMtMi40NDk2LTEuMjQzMy0wLjc0NTUtMC41MTIyMS0xLjUyMTctMS4yMTcxLTIuMTA2NC0xLjkwNzUtMC42MDM5OS0wLjcxMzMzLTEuMTg2Ni0xLjYyNjktMS41ODItMi40NzM5LTAuNDA4MDgtMC44NzQzLTAuNzQwNzktMS45NDIyLTAuOTA1MTgtMi44OTMtMC4xNjk1LTAuOTgwNTYtMC4yMTE2Ni0yLjEzMzMtMC4xMTgwNy0zLjEyMzkgMC4wOTY1LTEuMDIwNyAwLjM2NTcxLTIuMTc4MyAwLjcyNjMyLTMuMTM4MSAwLjM3MTI1LTAuOTg4MTEgMC45NTA4NS0yLjA2NTYgMS41Njc5LTIuOTIyIDAuNjM0NjQtMC44ODA5MSAxLjUwMDItMS43OTQ0IDIuMzQzMy0yLjQ3ODYgMC44NjY2NC0wLjcwMzIyIDEuOTcwOS0xLjM3NjcgMi45OTEzLTEuODI4OCAxLjA0OC0wLjQ2NDMgMi4zMjM3LTAuODM1NTUgMy40NTY3LTEuMDA5NyAxLjE2MjgtMC4xNzg3NiAyLjUyNjItMC4yMDQ0MSAzLjY5NTUtMC4wNzMxIDEuMTk5MiAwLjEzNDY4IDIuNTU2IDAuNDc0NTIgMy42Nzg0IDAuOTE3NzUgMS4xNTA2IDAuNDU0MjggMi40MDIyIDEuMTUzNyAzLjM5NDQgMS44OTI2IDEuMDE2NCAwLjc1Njk4IDIuMDY3MyAxLjc4MzMgMi44NTA5IDIuNzc5MyAwLjgwMjQzIDEuMDE5OCAxLjU2NyAyLjMxNDkgMi4wNzU2IDMuNTA4NyAwLjUyMDUyIDEuMjIxNiAwLjkzMDIgMi43MDUxIDEuMTE0MiA0LjAyMDIgMC4xODgxMiAxLjM0NTIgMC4xOTcxNyAyLjkxOTMgMC4wMjgxIDQuMjY3LTAuMTcyODEgMS4zNzc3LTAuNTgzMjMgMi45MzM3LTEuMTA5MSA0LjIxODgtMC41MzczNCAxLjMxMzEtMS4zNTY1IDIuNzM4OS0yLjIxNzMgMy44NjY4LTAuODc5MzEgMS4xNTE5LTIuMDY2MyAyLjMzOTktMy4yMTUyIDMuMjIzMi0wLjk0NSAwLjc1MDQ4LTEuOTE3OCAxLjc1NTUtMi42MzQgMi43MjY4LTAuNjk4MjEgMC45NDY4LTEuMzU3OCAyLjE0MDQtMS43ODQ0IDMuMjM2OC0wLjQxNTY0IDEuMDY4My0wLjczMTk2IDIuMzU4Ny0wLjg1Mzg3IDMuNDk4NC0wLjExODcxIDEuMTA5Ny0wLjA4NzYgMi40MDI5IDAuMDg4MSAzLjUwNSAwLjE3MDk5IDEuMDcyMSAwLjUyOTM1IDIuMjc4NiAwLjk3NDkyIDMuMjY4NyAwLjQzMzExIDAuOTYyNDYgMS4wNzY0IDIuMDAzMyAxLjc0NjUgMi44MTg4IDAuNjUwOTMgMC43OTIxMiAxLjUxODcgMS42MDQxIDIuMzU0NSAyLjE5OCAwLjgxMTE4IDAuNTc2NDIgMS44MzA2IDEuMTE2MiAyLjc2NDUgMS40NTk4IDAuOTA1NjEgMC4zMzMwNCAxLjk5NjggMC41Nzg4NyAyLjk1OCAwLjY2MjU2IDAuOTMxMjcgMC4wODEgMi4wMTM3IDAuMDMzMiAyLjkzMzUtMC4xMzMwOSAwLjg5MDA3LTAuMTYxMDkgMS44ODg3LTAuNDgxMDIgMi43MDUxLTAuODcwNDcgMC43ODkxMy0wLjM3NjQ3IDEuNjM5Mi0wLjkyODcyIDIuMzAxNC0xLjQ5OTcgMC42Mzk0NC0wLjU1MTI4IDEuMjkwOC0xLjI4MTggMS43NjIyLTEuOTgyMiAwLjQ1NDYxLTAuNjc1NDIgMC44NzQ3My0xLjUyMDcgMS4xMzUtMi4yOTIxIDAuMjUwNjMtMC43NDI4MiAwLjQyNTg3LTEuNjM0OSAwLjQ3MTEyLTIuNDE3NiAwLjA0MzYtMC43NTI3Mi0wLjAyMDctMS42MjQ2LTAuMTc4LTIuMzYyLTAuMTUxMDktMC43MDgtMC40MzI0OC0xLjQ5ODgtMC43NjU5My0yLjE0MTUtMC4zMTk3Mi0wLjYxNTktMC43ODEwNC0xLjI3NTMtMS4yNTMtMS43ODQtMC40NTE1My0wLjQ4Njc3LTEuMDQ1LTAuOTc3NTktMS42MDk5LTEuMzI2NC0wLjUzOTU3LTAuMzMzMDMtMS4yMTA3LTAuNjMzNTktMS44MTk2LTAuODEwMzItMC41ODAyNS0wLjE2ODQ0LTEuMjczMi0wLjI3MzE5LTEuODc3My0wLjI3OTgtMC41NzQyOS02ZS0zIC0xLjIzNTYgMC4wNzQ1LTEuNzkwNCAwLjIyMzA0LTAuNTI2MTcgMC4xNDA3NS0xLjEwOTQgMC4zODM3Mi0xLjU3NzggMC42NjE0OS0wLjQ0MjkxIDAuMjYyNTUtMC45MTE3OSAwLjYzMzA0LTEuMjY2NiAxLjAwNjEtMC4zMzQ1MiAwLjM1MTY1LTAuNjY0NzggMC44MDc5OC0wLjg5MDUgMS4yMzc3LTAuMjExOTcgMC40MDM1LTAuMzkyODYgMC45MDA5Mi0wLjQ4NTU5IDEuMzQ3Mi0wLjA4NjggMC40MTc1Ni0wLjEyMTA0IDAuOTExNjctMC4wODg0IDEuMzM2OSAwLjAzMDQgMC4zOTYxNyAwLjEyNzg2IDAuODQ3MjcgMC4yNjc5NyAxLjIxOSAwLjEzIDAuMzQ0NjIgMC4zMzQ2NCAwLjcyMDU2IDAuNTU3MDQgMS4wMTQyIDAuMjA1MDYgMC4yNzA2NCAwLjQ4NDk1IDAuNTQ5MTUgMC43NTk0MyAwLjc0OTIxIDAuMjUxMzcgMC4xODMzNCAwLjU3MTE4IDAuMzUzMTUgMC44NjUzNiAwLjQ1NDUgMC4yNjc2NiAwLjA5MjIgMC41OTE3NCAwLjE1MzY0IDAuODc0NzMgMC4xNjA5OCAwLjI1NTYzIDZlLTMgMC41NTE2MS0wLjAyOTggMC43OTY1OS0wLjEwMjg0IDAuMjE5NDItMC4wNjU1IDAuNDYxMTEtMC4xODAxNSAwLjY0NzUzLTAuMzEzMDEgMC4xNjU1Ni0wLjExODA4IDAuMzM1MDUtMC4yODUzMyAwLjQ1MDU2LTAuNDUyNiAwLjEwMTc4LTAuMTQ3MzUgMC4xOTA1OC0wLjMzODM1IDAuMjMxODktMC41MTI1MyAwLjAzNjItMC4xNTI4OSAwLjA0NTUtMC4zMzgzNSAwLjAxODYtMC40OTMxNS0wLjAyMzgtMC4xMzYxNy0wLjA4MzgtMC4yODk1OS0wLjE2Mzc1LTAuNDAyMzMtMC4wNzE5LTAuMTAxMjctMC4xODMzMy0wLjIwMDQ5LTAuMjk0MjgtMC4yNTYxNy0wLjEwNDEyLTAuMDUyMy0wLjI0MTU2LTAuMDgyMi0wLjM1Nzk0LTAuMDc2MXoiIHN0cm9rZS13aWR0aD0iLjAxMDY0NyIvPgo8L3N2Zz4K";
var _client7;
var _LuteClient = class extends BaseClient {
  constructor({ metadata, client, clientOptions, algosdk, algodClient, network }) {
    super(metadata, algosdk, algodClient);
    __privateAdd(this, _client7, void 0);
    __publicField(this, "clientOptions");
    __publicField(this, "network");
    __privateSet(this, _client7, client);
    this.clientOptions = clientOptions;
    this.network = network;
    this.metadata = _LuteClient.metadata;
  }
  static async init({ clientOptions, algodOptions, clientStatic, getDynamicClient, algosdkStatic, network = DEFAULT_NETWORK }) {
    try {
      debugLog(`${PROVIDER_ID.LUTE.toUpperCase()} initializing...`);
      let LuteConnect;
      if (clientStatic) {
        LuteConnect = clientStatic;
      } else if (getDynamicClient) {
        LuteConnect = await getDynamicClient();
      } else {
        throw new Error("Lute provider missing required property: clientStatic or getDynamicClient");
      }
      const algosdk = algosdkStatic || (await Algod.init(algodOptions)).algosdk;
      const algodClient = getAlgodClient(algosdk, algodOptions);
      if (!clientOptions) {
        throw new Error("Lute provider missing required property: clientOptions");
      }
      const lute = new LuteConnect(clientOptions.siteName);
      const provider = new _LuteClient({
        metadata: _LuteClient.metadata,
        client: lute,
        clientOptions,
        algosdk,
        algodClient,
        network
      });
      debugLog(`${PROVIDER_ID.LUTE.toUpperCase()} initialized`, "\u2705");
      return provider;
    } catch (e) {
      console.error("Error initializing...", e);
      return null;
    }
  }
  async connect() {
    const genesis = await this.algodClient.genesis().do();
    const genesisID = `${genesis.network}-${genesis.id}`;
    const addresses = await __privateGet(this, _client7).connect(genesisID);
    if (addresses.length === 0) {
      throw new Error(`No accounts found for ${_LuteClient.metadata.id}`);
    }
    const mappedAccounts = addresses.map((address, index) => ({
      name: `Lute Wallet ${index + 1}`,
      address,
      providerId: _LuteClient.metadata.id
    }));
    return {
      ..._LuteClient.metadata,
      accounts: mappedAccounts
    };
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async reconnect() {
    return null;
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async disconnect() {
    return;
  }
  shouldSignTxnObject(txn, addresses, indexesToSign, idx) {
    const isIndexMatch = !indexesToSign || indexesToSign.includes(idx);
    const isSigned = "txn" in txn;
    const canSign = !isSigned && addresses.includes(this.algosdk.encodeAddress(txn.snd));
    const shouldSign = isIndexMatch && canSign;
    return shouldSign;
  }
  async signTransactions(connectedAccounts, transactions, indexesToSign, returnGroup = true) {
    const decodedTxns = transactions.map((txn) => {
      return this.algosdk.decodeObj(txn);
    });
    const signedIndexes = [];
    const txnsToSign = decodedTxns.reduce((acc, txn, idx) => {
      const isSigned = "txn" in txn;
      const shouldSign = this.shouldSignTxnObject(txn, connectedAccounts, indexesToSign, idx);
      if (shouldSign) {
        signedIndexes.push(idx);
        acc.push({
          txn: Buffer.from(transactions[idx]).toString("base64")
        });
      } else {
        acc.push({
          txn: isSigned ? Buffer.from(this.algosdk.decodeSignedTransaction(transactions[idx]).txn.toByte()).toString("base64") : Buffer.from(transactions[idx]).toString("base64"),
          stxn: isSigned ? Buffer.from(transactions[idx]).toString("base64") : void 0,
          signers: []
        });
      }
      return acc;
    }, []);
    const result = await __privateGet(this, _client7).signTxns(txnsToSign);
    const signedTxns = transactions.reduce((acc, txn, i2) => {
      if (signedIndexes.includes(i2)) {
        const signedByUser = result.shift();
        signedByUser && acc.push(signedByUser);
      } else if (returnGroup) {
        acc.push(txn);
      }
      return acc;
    }, []);
    return signedTxns;
  }
};
var LuteClient = _LuteClient;
_client7 = new WeakMap();
__publicField(LuteClient, "metadata", {
  id: PROVIDER_ID.LUTE,
  name: "Lute",
  icon: ICON$4,
  isWalletConnect: false
});
var isPublicNetwork = (network) => {
  return network === "betanet" || network === "testnet" || network === "mainnet";
};
var ICON$3 = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgNDgwIDQ4MCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDgwIDQ4MDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiMzMzk2RkY7fQo8L3N0eWxlPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTI2LjYsMTY4YzYyLjYtNjEuMywxNjQuMi02MS4zLDIyNi44LDBsNy41LDcuNGMzLjEsMy4xLDMuMSw4LDAsMTEuMWwtMjUuOCwyNS4yYy0xLjYsMS41LTQuMSwxLjUtNS43LDAKCWwtMTAuNC0xMC4yYy00My43LTQyLjgtMTE0LjUtNDIuOC0xNTguMiwwbC0xMS4xLDEwLjljLTEuNiwxLjUtNC4xLDEuNS01LjcsMGwtMjUuOC0yNS4yYy0zLjEtMy4xLTMuMS04LDAtMTEuMUwxMjYuNiwxNjh6CgkgTTQwNi43LDIyMC4ybDIyLjksMjIuNWMzLjEsMy4xLDMuMSw4LDAsMTEuMUwzMjYuMiwzNTUuMWMtMy4xLDMuMS04LjIsMy4xLTExLjMsMGwtNzMuNC03MS45Yy0wLjgtMC44LTIuMS0wLjgtMi44LDBsLTczLjQsNzEuOQoJYy0zLjEsMy4xLTguMiwzLjEtMTEuMywwTDUwLjMsMjUzLjhjLTMuMS0zLjEtMy4xLTgsMC0xMS4xbDIyLjktMjIuNWMzLjEtMy4xLDguMi0zLjEsMTEuMywwbDczLjQsNzEuOWMwLjgsMC44LDIuMSwwLjgsMi44LDAKCWw3My40LTcxLjljMy4xLTMuMSw4LjItMy4xLDExLjMsMGw3My40LDcxLjljMC44LDAuOCwyLjEsMC44LDIuOCwwbDczLjQtNzEuOUMzOTguNSwyMTcuMSw0MDMuNiwyMTcuMSw0MDYuNywyMjAuMkw0MDYuNywyMjAuMnoiLz4KPC9zdmc+Cg==";
var ALGORAND_CHAINS = {
  mainnet: "algorand:wGHE2Pwdvd7S12BL5FaOP20EGYesN73k",
  testnet: "algorand:SGO1GKSzyE7IEPItTxCByw9x8FmnrCDe",
  betanet: "algorand:mFgazF-2uRS1tMiL9dsj01hJGySEmPN2"
};
var getPayloadId = () => {
  const date = Date.now() * Math.pow(10, 3);
  const extra = Math.floor(Math.random() * Math.pow(10, 3));
  return date + extra;
};
var formatJsonRpcRequest = (method, params) => {
  return {
    id: getPayloadId(),
    jsonrpc: "2.0",
    method,
    params
  };
};
var _client8, _composeTransactions, composeTransactions_fn, _getSession, getSession_fn, _mapAccounts, mapAccounts_fn;
var _WalletConnectClient = class extends BaseClient {
  constructor({ metadata, client, clientOptions, algosdk, algodClient, network, chain }) {
    super(metadata, algosdk, algodClient);
    __privateAdd(this, _composeTransactions);
    __privateAdd(this, _getSession);
    __privateAdd(this, _mapAccounts);
    __privateAdd(this, _client8, void 0);
    __publicField(this, "clientOptions");
    __publicField(this, "network");
    __publicField(this, "chain");
    __privateSet(this, _client8, client);
    this.clientOptions = clientOptions;
    this.network = network;
    this.chain = chain;
    this.metadata = _WalletConnectClient.metadata;
  }
  static async init({ clientOptions, algodOptions, clientStatic, getDynamicClient, algosdkStatic, network = DEFAULT_NETWORK }) {
    try {
      debugLog(`${PROVIDER_ID.WALLETCONNECT.toUpperCase()} initializing...`);
      let Client;
      if (clientStatic) {
        Client = clientStatic;
      } else if (getDynamicClient) {
        Client = await getDynamicClient();
      } else {
        throw new Error("WalletConnect provider missing required property: clientStatic or getDynamicClient");
      }
      if (!clientOptions) {
        throw new Error("WalletConnect provider missing required property: clientOptions");
      }
      if (!isPublicNetwork(network)) {
        throw new Error(`WalletConnect only supports Algorand mainnet, testnet, and betanet. "${network}" is not supported.`);
      }
      const chain = ALGORAND_CHAINS[network];
      const client = new Client({
        ...clientOptions,
        modalOptions: {
          explorerExcludedWalletIds: "ALL",
          ...clientOptions.modalOptions
        }
      });
      const algosdk = algosdkStatic || (await Algod.init(algodOptions)).algosdk;
      const algodClient = getAlgodClient(algosdk, algodOptions);
      const provider = new _WalletConnectClient({
        metadata: _WalletConnectClient.metadata,
        client,
        clientOptions,
        algosdk,
        algodClient,
        network,
        chain
      });
      debugLog(`${PROVIDER_ID.WALLETCONNECT.toUpperCase()} initialized`, "\u2705");
      return provider;
    } catch (error) {
      console.error("Error initializing WalletConnect client", error);
      return null;
    }
  }
  async connect() {
    const requiredNamespaces = {
      algorand: {
        chains: [this.chain],
        methods: ["algo_signTxn"],
        events: []
      }
    };
    try {
      const session = await __privateGet(this, _client8).connect({
        requiredNamespaces
      });
      const { accounts } = session.namespaces.algorand;
      return {
        ..._WalletConnectClient.metadata,
        accounts: __privateMethod(this, _mapAccounts, mapAccounts_fn).call(this, accounts)
      };
    } catch (error) {
      console.error("Error connecting to WalletConnect", error);
      throw error;
    }
  }
  async reconnect() {
    const session = await __privateGet(this, _client8).getSession();
    if (typeof session === "undefined") {
      return null;
    }
    const { accounts } = session.namespaces.algorand;
    return {
      ..._WalletConnectClient.metadata,
      accounts: __privateMethod(this, _mapAccounts, mapAccounts_fn).call(this, accounts)
    };
  }
  async disconnect() {
    try {
      const session = await __privateMethod(this, _getSession, getSession_fn).call(this);
      await __privateGet(this, _client8).disconnect({
        topic: session.topic,
        // replicates getSdkError('USER_DISCONNECTED') from @walletconnect/utils
        reason: {
          message: "User disconnected.",
          code: 6e3
        }
      });
    } catch (error) {
      console.error("Error disconnecting", error);
    }
  }
  async signTransactions(connectedAccounts, txnGroups, indexesToSign = [], returnGroup = true) {
    const transactions = Array.isArray(txnGroups[0]) ? txnGroups.flatMap((txn) => txn) : txnGroups;
    const { txnsToSign, signedIndexes } = __privateMethod(this, _composeTransactions, composeTransactions_fn).call(this, transactions, connectedAccounts, indexesToSign);
    const request = formatJsonRpcRequest("algo_signTxn", [txnsToSign]);
    const session = await __privateMethod(this, _getSession, getSession_fn).call(this);
    const response = await __privateGet(this, _client8).request({
      chainId: this.chain,
      topic: session.topic,
      request
    });
    const lengthsMatch = response.length === transactions.length;
    const signedTxns = transactions.reduce((acc, txn, i2) => {
      if (signedIndexes.includes(i2)) {
        const signedTxn = lengthsMatch ? response[i2] : response.shift();
        signedTxn && acc.push(new Uint8Array(Buffer.from(signedTxn, "base64")));
      } else if (returnGroup) {
        acc.push(txn);
      }
      return acc;
    }, []);
    return signedTxns;
  }
};
var WalletConnectClient = _WalletConnectClient;
_client8 = new WeakMap();
_composeTransactions = new WeakSet();
composeTransactions_fn = function(transactions, connectedAccounts, indexesToSign) {
  const decodedTxns = transactions.map((txn) => {
    return this.algosdk.decodeObj(txn);
  });
  const signedIndexes = [];
  const txnsToSign = decodedTxns.reduce((acc, txn, i2) => {
    const isSigned = "txn" in txn;
    const senderAccount = !isSigned ? this.algosdk.encodeAddress(txn["snd"]) : this.algosdk.encodeAddress(txn.txn["snd"]);
    const shouldSign = indexesToSign.includes(i2) || !isSigned && connectedAccounts.includes(senderAccount);
    if (shouldSign) {
      signedIndexes.push(i2);
      acc.push({
        txn: Buffer.from(transactions[i2]).toString("base64")
      });
    } else {
      acc.push({
        txn: isSigned ? Buffer.from(this.algosdk.encodeUnsignedTransaction(this.algosdk.decodeSignedTransaction(transactions[i2]).txn)).toString("base64") : Buffer.from(transactions[i2]).toString("base64"),
        signers: []
      });
    }
    return acc;
  }, []);
  return { txnsToSign, signedIndexes };
};
_getSession = new WeakSet();
getSession_fn = async function() {
  const session = await __privateGet(this, _client8).getSession();
  if (typeof session === "undefined") {
    throw new Error("Session is not connected");
  }
  return session;
};
_mapAccounts = new WeakSet();
mapAccounts_fn = function(accounts) {
  return accounts.map((accountStr, index) => ({
    name: `WalletConnect ${index + 1}`,
    address: accountStr.split(":").pop(),
    providerId: _WalletConnectClient.metadata.id
  }));
};
__publicField(WalletConnectClient, "metadata", {
  id: PROVIDER_ID.WALLETCONNECT,
  name: "WalletConnect",
  icon: ICON$3,
  isWalletConnect: true
});
var ICON$2 = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDkuODMgMjEwLjMzIj48dGV4dCB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIDE2MS4zMSkiIHN0eWxlPSJmb250LWZhbWlseTpJQk1QbGV4U2Fucy1NZWRtLCAmYXBvcztJQk0gUGxleCBTYW5zJmFwb3M7OyBmb250LXNpemU6MTkwcHg7Ij48dHNwYW4geD0iMCIgeT0iMCI+S01EPC90c3Bhbj48L3RleHQ+PC9zdmc+";
var _client9, _wallet, _password;
var _KMDWalletClient = class extends BaseClient {
  constructor({ metadata, client, wallet, password, algosdk, algodClient, network }) {
    super(metadata, algosdk, algodClient);
    __privateAdd(this, _client9, void 0);
    __privateAdd(this, _wallet, void 0);
    __privateAdd(this, _password, void 0);
    __publicField(this, "walletId");
    __publicField(this, "network");
    __privateSet(this, _client9, client);
    __privateSet(this, _wallet, wallet);
    __privateSet(this, _password, password);
    this.walletId = "";
    this.network = network;
    this.metadata = _KMDWalletClient.metadata;
  }
  static async init({ clientOptions, algodOptions, algosdkStatic, network = DEFAULT_NETWORK }) {
    try {
      debugLog(`${PROVIDER_ID.KMD.toUpperCase()} initializing...`);
      const { token = "a".repeat(64), host = "http://localhost", port = "4002", wallet = "unencrypted-default-wallet", password = "" } = clientOptions || {};
      const algosdk = algosdkStatic || (await Algod.init(algodOptions)).algosdk;
      const algodClient = getAlgodClient(algosdk, algodOptions);
      const kmdClient = new algosdk.Kmd(token, host, port);
      const provider = new _KMDWalletClient({
        metadata: _KMDWalletClient.metadata,
        password,
        wallet,
        client: kmdClient,
        algosdk,
        algodClient,
        network
      });
      debugLog(`${PROVIDER_ID.KMD.toUpperCase()} initialized`, "\u2705");
      return provider;
    } catch (e) {
      console.error("Error initializing...", e);
      return null;
    }
  }
  async connect() {
    return {
      ..._KMDWalletClient.metadata,
      accounts: await this.listAccounts(__privateGet(this, _wallet), this.requestPassword())
    };
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async disconnect() {
    return;
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async reconnect() {
    return null;
  }
  requestPassword() {
    const pw = prompt("KMD password");
    return pw ? pw : "";
  }
  async getWalletToken(walletId, password) {
    const handleResp = await __privateGet(this, _client9).initWalletHandle(walletId, password);
    return handleResp.wallet_handle_token;
  }
  async releaseToken(token) {
    await __privateGet(this, _client9).releaseWalletHandle(token);
  }
  async listWallets() {
    const walletResponse = await __privateGet(this, _client9).listWallets();
    const walletList = walletResponse["wallets"];
    const walletMap = {};
    for (const w2 of walletList) {
      walletMap[w2.name] = w2.id;
    }
    return walletMap;
  }
  async listAccounts(wallet, password) {
    const walletId = await this.getWalletId();
    const token = await this.getWalletToken(walletId, password);
    const listResponse = await __privateGet(this, _client9).listKeys(token);
    const addresses = listResponse["addresses"];
    const mappedAccounts = addresses.map((address, index) => {
      return {
        name: `KMDWallet ${index + 1}`,
        address,
        providerId: _KMDWalletClient.metadata.id
      };
    });
    await this.releaseToken(token);
    return mappedAccounts;
  }
  async getWalletId() {
    if (this.walletId !== "")
      return this.walletId;
    const walletMap = await this.listWallets();
    if (!(__privateGet(this, _wallet) in walletMap))
      throw Error("No wallet named: " + __privateGet(this, _wallet));
    this.walletId = walletMap[__privateGet(this, _wallet)];
    return this.walletId;
  }
  async signTransactions(connectedAccounts, txnGroups, indexesToSign, returnGroup = true) {
    const transactions = Array.isArray(txnGroups[0]) ? txnGroups.flatMap((txn) => txn) : txnGroups;
    const decodedTxns = transactions.map((txn) => {
      return this.algosdk.decodeObj(txn);
    });
    const walletId = await this.getWalletId();
    const pw = this.requestPassword();
    const token = await this.getWalletToken(walletId, pw);
    const signedTxns = [];
    const signingPromises = [];
    decodedTxns.forEach((dtxn, idx) => {
      const isSigned = "txn" in dtxn;
      signedTxns.push(transactions[idx]);
      if (isSigned) {
        return;
      } else if (indexesToSign && indexesToSign.length && !indexesToSign.includes(Number(idx))) {
        return;
      } else {
        const senderAddress = this.algosdk.encodeAddress(dtxn.snd);
        const rekeyAddress = dtxn.rekey ? this.algosdk.encodeAddress(dtxn.rekey) : null;
        const isSignerConnected = rekeyAddress ? connectedAccounts.includes(rekeyAddress) && connectedAccounts.includes(senderAddress) : connectedAccounts.includes(senderAddress);
        if (!isSignerConnected) {
          return;
        }
      }
      signedTxns[idx] = new Uint8Array();
      const txn = this.algosdk.Transaction.from_obj_for_encoding(dtxn);
      const promise = txn.reKeyTo ? __privateGet(this, _client9).signTransactionWithSpecificPublicKey(token, pw, txn, txn.reKeyTo.publicKey) : __privateGet(this, _client9).signTransaction(token, pw, txn);
      signingPromises.push(promise);
    });
    const signingResults = await Promise.all(signingPromises);
    let signedIdx = 0;
    const formattedTxns = signedTxns.reduce((acc, txn) => {
      if (txn.length === 0) {
        acc.push(signingResults[signedIdx]);
        signedIdx += 1;
      } else if (returnGroup) {
        acc.push(txn);
      }
      return acc;
    }, []);
    return formattedTxns;
  }
};
var KMDWalletClient = _KMDWalletClient;
_client9 = new WeakMap();
_wallet = new WeakMap();
_password = new WeakMap();
__publicField(KMDWalletClient, "metadata", {
  id: PROVIDER_ID.KMD,
  name: "KMD",
  icon: ICON$2,
  isWalletConnect: false
});
var ICON$1 = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8'%3f%3e %3c!-- Generated by Pixelmator Pro 3.2.2 --%3e %3csvg width='409' height='210' viewBox='0 0 409 210' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3ctext id='MNEMONIC' xml:space='preserve' x='0' y='129' font-family='Helvetica' font-size='72' fill='black'%3eMNEMONIC%3c/text%3e%3c/svg%3e";
var _client10;
var _MnemonicWalletClient = class extends BaseClient {
  constructor({ metadata, algosdk, algodClient, network }) {
    super(metadata, algosdk, algodClient);
    __privateAdd(this, _client10, void 0);
    __publicField(this, "network");
    this.network = network;
    this.metadata = _MnemonicWalletClient.metadata;
  }
  static async init({ algodOptions, algosdkStatic, network = DEFAULT_NETWORK }) {
    try {
      debugLog(`${PROVIDER_ID.MNEMONIC.toUpperCase()} initializing...`);
      const algosdk = algosdkStatic || (await Algod.init(algodOptions)).algosdk;
      const algodClient = getAlgodClient(algosdk, algodOptions);
      const provider = new _MnemonicWalletClient({
        metadata: _MnemonicWalletClient.metadata,
        algosdk,
        algodClient,
        network
      });
      debugLog(`${PROVIDER_ID.MNEMONIC.toUpperCase()} initialized`);
      return provider;
    } catch (e) {
      console.error("Error initializing...", e);
      return null;
    }
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async connect() {
    const password = this.requestPassword();
    if (!password) {
      __privateSet(this, _client10, void 0);
      throw new Error("Mnemonic passphrase is required");
    }
    __privateSet(this, _client10, this.algosdk.mnemonicToSecretKey(password));
    return {
      ..._MnemonicWalletClient.metadata,
      accounts: [
        {
          name: `MnemonicWallet 1`,
          address: __privateGet(this, _client10).addr,
          providerId: _MnemonicWalletClient.metadata.id
        }
      ]
    };
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async disconnect() {
    __privateSet(this, _client10, void 0);
    return;
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async reconnect() {
    return null;
  }
  requestPassword() {
    const pass = prompt("enter mnemonic passphrase, 25 words");
    return pass ? pass : "";
  }
  signTransactions(connectedAccounts, txnGroups, indexesToSign, returnGroup = true) {
    if (!__privateGet(this, _client10)) {
      throw new Error("Client not connected");
    }
    const transactions = Array.isArray(txnGroups[0]) ? txnGroups.flatMap((txn) => txn) : txnGroups;
    const decodedTxns = transactions.map((txn) => {
      return this.algosdk.decodeObj(txn);
    });
    const signedTxns = [];
    const signingResults = [];
    decodedTxns.forEach((dtxn, idx) => {
      const isSigned = "txn" in dtxn;
      signedTxns.push(transactions[idx]);
      if (isSigned) {
        return;
      } else if (indexesToSign && indexesToSign.length && !indexesToSign.includes(Number(idx))) {
        return;
      } else if (!connectedAccounts.includes(this.algosdk.encodeAddress(dtxn.snd))) {
        return;
      }
      signedTxns[idx] = new Uint8Array();
      const txn = this.algosdk.Transaction.from_obj_for_encoding(dtxn);
      const signedTxn = txn.signTxn(__privateGet(this, _client10)?.sk);
      signingResults.push(signedTxn);
    });
    let signedIdx = 0;
    const formattedTxns = signedTxns.reduce((acc, txn) => {
      if (txn.length === 0) {
        acc.push(signingResults[signedIdx]);
        signedIdx += 1;
      } else if (returnGroup) {
        acc.push(txn);
      }
      return acc;
    }, []);
    return Promise.resolve(formattedTxns);
  }
  signEncodedTransactions(_transactions) {
    throw new Error("Method not implemented.");
  }
};
var MnemonicWalletClient = _MnemonicWalletClient;
_client10 = new WeakMap();
__publicField(MnemonicWalletClient, "metadata", {
  id: PROVIDER_ID.MNEMONIC,
  name: "MNEMONIC",
  icon: ICON$1,
  isWalletConnect: false
});
var ICON = "data:image/svg+xml,%3Csvg fill='%23000000' width='800px' height='800px' viewBox='0 0 24 24' id='wallet' data-name='Flat Line' xmlns='http://www.w3.org/2000/svg' class='icon flat-line'%3E%3Cpath id='secondary' d='M16,12h5V8H5A2,2,0,0,1,3,6V19a1,1,0,0,0,1,1H20a1,1,0,0,0,1-1V16H16a1,1,0,0,1-1-1V13A1,1,0,0,1,16,12Z' style='fill: rgb(44, 169, 188); stroke-width: 2;'%3E%3C/path%3E%3Cpath id='primary' d='M19,4H5A2,2,0,0,0,3,6H3A2,2,0,0,0,5,8H21' style='fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;'%3E%3C/path%3E%3Cpath id='primary-2' data-name='primary' d='M21,8V19a1,1,0,0,1-1,1H4a1,1,0,0,1-1-1V6A2,2,0,0,0,5,8Zm0,4H16a1,1,0,0,0-1,1v2a1,1,0,0,0,1,1h5Z' style='fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;'%3E%3C/path%3E%3C/svg%3E";
var _CustomWalletClient = class extends BaseClient {
  network;
  providerProxy;
  constructor({ providerProxy, metadata, algosdk, algodClient, network }) {
    super(metadata, algosdk, algodClient);
    this.providerProxy = providerProxy;
    this.network = network;
  }
  static async init({ clientOptions, algodOptions, algosdkStatic, network = DEFAULT_NETWORK }) {
    try {
      debugLog(`${PROVIDER_ID.CUSTOM.toUpperCase()} initializing...`);
      if (!clientOptions) {
        throw new Error(`Attempt to create custom wallet with no provider specified.`);
      }
      const algosdk = algosdkStatic || (await Algod.init(algodOptions)).algosdk;
      const algodClient = getAlgodClient(algosdk, algodOptions);
      try {
        return new _CustomWalletClient({
          providerProxy: clientOptions.getProvider({
            algod: algodClient,
            algosdkStatic: algosdk,
            network
          }),
          metadata: {
            ..._CustomWalletClient.metadata,
            name: clientOptions.name,
            icon: clientOptions.icon ?? _CustomWalletClient.metadata.icon
          },
          algodClient,
          algosdk,
          network
        });
      } finally {
        debugLog(`${PROVIDER_ID.CUSTOM.toUpperCase()} initialized`, "\u2705");
      }
    } catch (e) {
      console.error("Error initializing...", e);
      return null;
    }
  }
  async connect() {
    return await this.providerProxy.connect(this.metadata);
  }
  async disconnect() {
    await this.providerProxy.disconnect();
  }
  async reconnect() {
    return await this.providerProxy.reconnect(this.metadata);
  }
  async signTransactions(connectedAccounts, txnGroups, indexesToSign, returnGroup = true) {
    return await this.providerProxy.signTransactions(connectedAccounts, txnGroups, indexesToSign, returnGroup);
  }
};
var CustomWalletClient = _CustomWalletClient;
__publicField(CustomWalletClient, "metadata", {
  id: PROVIDER_ID.CUSTOM,
  icon: ICON,
  isWalletConnect: false,
  name: "Custom"
});
var allClients = {
  [PeraWalletClient.metadata.id]: PeraWalletClient,
  [DaffiWalletClient.metadata.id]: DaffiWalletClient,
  [MyAlgoWalletClient.metadata.id]: MyAlgoWalletClient,
  [DeflyWalletClient.metadata.id]: DeflyWalletClient,
  [ExodusClient.metadata.id]: ExodusClient,
  [AlgoSignerClient.metadata.id]: AlgoSignerClient,
  [LuteClient.metadata.id]: LuteClient,
  [WalletConnectClient.metadata.id]: WalletConnectClient,
  [KMDWalletClient.metadata.id]: KMDWalletClient,
  [MnemonicWalletClient.metadata.id]: MnemonicWalletClient,
  [CustomWalletClient.metadata.id]: CustomWalletClient
};
var initializeProviders = async (providers, nodeConfig, algosdkStatic) => {
  if (typeof window === "undefined") {
    debugLog("Window object is not available, skipping initialization");
    return {};
  }
  const initializedProviders = providers.reduce((acc, provider) => {
    const providerId = typeof provider === "string" ? provider : provider.id;
    acc[providerId] = null;
    return acc;
  }, {});
  const { network = DEFAULT_NETWORK, nodeServer = DEFAULT_NODE_BASEURL, nodePort = DEFAULT_NODE_PORT, nodeToken = DEFAULT_NODE_TOKEN } = nodeConfig || {};
  const initClient = async (provider) => {
    const { id, ...providerConfig } = typeof provider === "string" ? { id: provider } : provider;
    const initParams = {
      network,
      algodOptions: [nodeToken, nodeServer, nodePort],
      algosdkStatic,
      ...providerConfig
    };
    const client = await allClients[id].init(initParams);
    initializedProviders[id] = client;
  };
  debugLog("Initializing providers:", getProviderList(providers));
  const initPromises = providers.map((provider) => initClient(provider));
  await Promise.all(initPromises);
  return initializedProviders;
};
var clearAccounts = (id) => {
  const { clearActiveAccount, removeAccounts } = useWalletStore.getState();
  clearActiveAccount(id);
  removeAccounts(id);
};
var getActiveProviders = () => {
  const accounts = useWalletStore.getState().accounts;
  return [...new Set(accounts.map((acct) => acct.providerId))];
};
var isActiveProvider = (id) => {
  const activeProviders = getActiveProviders();
  return activeProviders.includes(id);
};
var reconnectProviders = async (providers) => {
  try {
    const clients = Object.values(providers);
    for (const client of clients) {
      const id = client?.metadata.id;
      if (id && isActiveProvider(id)) {
        await client.reconnect(() => clearAccounts(id));
      }
    }
  } catch (e) {
    console.error(e);
  }
};
var WalletContext = (0, import_react2.createContext)(null);
var useWalletContext = () => {
  const context = (0, import_react2.useContext)(WalletContext);
  if (context === void 0) {
    throw new Error("useWallet must be used within the WalletProvider");
  }
  return context;
};
var WalletProvider = ({ children, value }) => {
  return import_react2.default.createElement(WalletContext.Provider, { value }, children);
};
function shallow(objA, objB) {
  if (Object.is(objA, objB)) {
    return true;
  }
  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
    return false;
  }
  if (objA instanceof Map && objB instanceof Map) {
    if (objA.size !== objB.size)
      return false;
    for (const [key, value] of objA) {
      if (!Object.is(value, objB.get(key))) {
        return false;
      }
    }
    return true;
  }
  if (objA instanceof Set && objB instanceof Set) {
    if (objA.size !== objB.size)
      return false;
    for (const value of objA) {
      if (!objB.has(value)) {
        return false;
      }
    }
    return true;
  }
  const keysA = Object.keys(objA);
  if (keysA.length !== Object.keys(objB).length) {
    return false;
  }
  for (let i2 = 0; i2 < keysA.length; i2++) {
    if (!Object.prototype.hasOwnProperty.call(objB, keysA[i2]) || !Object.is(objA[keysA[i2]], objB[keysA[i2]])) {
      return false;
    }
  }
  return true;
}
function useWallet() {
  const [providers, setProviders] = (0, import_react2.useState)(null);
  const clients = useWalletContext();
  const { activeAccount, accounts: connectedAccounts, setActiveAccount: _setActiveAccount, addAccounts } = useHydratedWalletStore(walletStoreSelector, shallow);
  const getAccountsByProvider = (id) => {
    return connectedAccounts.filter((account) => account.providerId === id);
  };
  const connectedActiveAccounts = (0, import_react2.useMemo)(() => connectedAccounts.filter((account) => account.providerId === activeAccount?.providerId), [connectedAccounts, activeAccount]);
  (0, import_react2.useEffect)(() => {
    if (!clients) {
      setProviders(null);
      return;
    }
    const supportedClients = Object.keys(clients);
    setProviders(supportedClients.filter((id) => !!clients?.[id]).map((id) => {
      return {
        ...allClients[id],
        // Override static details with any instance details
        ...clients[id],
        accounts: getAccountsByProvider(id),
        isActive: activeAccount?.providerId === id,
        isConnected: connectedAccounts.some((accounts) => accounts.providerId === id),
        connect: () => connect(id),
        disconnect: () => disconnect(id),
        reconnect: () => reconnect(id),
        setActiveProvider: () => setActive(id),
        setActiveAccount: (account) => selectActiveAccount(id, account)
      };
    }));
  }, [clients, connectedAccounts, connectedActiveAccounts, activeAccount]);
  const getClient = (id) => {
    if (!id)
      throw new Error("Provider ID is missing.");
    const walletClient = clients?.[id];
    if (!walletClient)
      throw new Error(`Client not found for ID: ${id}`);
    return walletClient;
  };
  const status = (0, import_react2.useMemo)(() => {
    if (activeAccount === void 0) {
      return "initializing";
    }
    if (activeAccount === null && connectedAccounts.length) {
      return "connected";
    }
    if (activeAccount === null && !connectedAccounts.length) {
      return "disconnected";
    }
    if (activeAccount && activeAccount.address) {
      return "active";
    }
    return "error";
  }, [activeAccount, connectedAccounts.length]);
  const isActive = (0, import_react2.useMemo)(() => {
    return status === "active";
  }, [status]);
  const isReady = (0, import_react2.useMemo)(() => {
    return status !== "initializing";
  }, [status]);
  const selectActiveAccount = (providerId, address) => {
    try {
      const account = connectedActiveAccounts.find((acct) => acct.address === address && acct.providerId === providerId);
      if (!account) {
        throw new Error(`No accounts with address ${address} found.`);
      }
      _setActiveAccount(account);
    } catch (e) {
      console.error(e);
    }
  };
  const connect = async (id) => {
    try {
      const walletClient = getClient(id);
      const walletInfo = await walletClient?.connect(() => clearAccounts(id));
      if (!walletInfo || !walletInfo.accounts.length) {
        throw new Error("Failed to connect " + id);
      }
      _setActiveAccount(walletInfo.accounts[0]);
      addAccounts(walletInfo.accounts);
    } catch (e) {
      console.error(e);
    }
  };
  const reconnect = async (id) => {
    try {
      const walletClient = getClient(id);
      const walletInfo = await walletClient?.reconnect(() => clearAccounts(id));
      if (walletInfo && walletInfo.accounts.length) {
        addAccounts(walletInfo.accounts);
      }
    } catch (e) {
      console.error(e);
      await disconnect(id);
    }
  };
  const disconnect = async (id) => {
    try {
      const walletClient = getClient(id);
      await walletClient?.disconnect();
    } catch (e) {
      console.error(e);
    } finally {
      clearAccounts(id);
    }
  };
  const setActive = (id) => {
    try {
      const accounts = getAccountsByProvider(id);
      _setActiveAccount(accounts[0]);
    } catch (e) {
      console.error(e);
    }
  };
  const signTransactions = async (transactions, indexesToSign, returnGroup = true) => {
    const walletClient = getClient(activeAccount?.providerId);
    if (!walletClient || !activeAccount?.address) {
      throw new Error("No wallet found.");
    }
    const signedTransactions = await walletClient.signTransactions(connectedActiveAccounts.map((acct) => acct.address), transactions, indexesToSign, returnGroup);
    return signedTransactions;
  };
  const sendTransactions = async (transactions, waitRoundsToConfirm) => {
    const walletClient = getClient(activeAccount?.providerId);
    const result = await walletClient?.sendRawTransactions(transactions, waitRoundsToConfirm);
    return result;
  };
  const signer = async (txnGroup, indexesToSign) => {
    const algosdk = await getAlgosdk();
    const txnBlobs = txnGroup.map(algosdk.encodeUnsignedTransaction);
    return await Promise.resolve(signTransactions(txnBlobs, indexesToSign, false));
  };
  const getAccountInfo = async () => {
    if (!activeAccount)
      throw new Error("No selected account.");
    const walletClient = getClient(activeAccount.providerId);
    const accountInfo = await walletClient?.getAccountInfo(activeAccount.address);
    return accountInfo;
  };
  const getAddress = () => {
    return activeAccount?.address;
  };
  const getAssets = async () => {
    if (!activeAccount)
      throw new Error("No selected account.");
    const walletClient = getClient(activeAccount.providerId);
    return await walletClient?.getAssets(activeAccount.address);
  };
  const groupTransactionsBySender = (transactions) => {
    const walletClient = getClient(activeAccount?.providerId);
    return walletClient?.groupTransactionsBySender(transactions);
  };
  return {
    clients,
    providers,
    connectedAccounts,
    connectedActiveAccounts,
    activeAccount,
    activeAddress: activeAccount?.address,
    status,
    isActive,
    isReady,
    signer,
    signTransactions,
    sendTransactions,
    getAddress,
    groupTransactionsBySender,
    getAccountInfo,
    getAssets
  };
}
function useInitializeProviders({ providers, nodeConfig, algosdkStatic, debug = false }) {
  const { setDebug } = useDebugStore();
  (0, import_react2.useEffect)(() => setDebug(debug), [debug, setDebug]);
  const [walletProviders, setWalletProviders] = (0, import_react2.useState)(null);
  (0, import_react2.useEffect)(() => {
    async function initializeAndConnect() {
      try {
        const initializedProviders = await initializeProviders(providers, nodeConfig, algosdkStatic);
        setWalletProviders(initializedProviders);
        await reconnectProviders(initializedProviders);
      } catch (error) {
        console.error("Error initializing wallet providers:", error);
      }
    }
    void initializeAndConnect();
  }, []);
  return walletProviders;
}

export {
  Recoil_index_5,
  Recoil_index_8,
  Recoil_index_20,
  Recoil_index_22,
  PROVIDER_ID,
  WalletProvider,
  useWallet,
  useInitializeProviders
};
/*! Bundled license information:

@txnlab/use-wallet/dist/esm/index.js:
  (**
   * @license React
   * use-sync-external-store-shim.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

@txnlab/use-wallet/dist/esm/index.js:
  (**
   * @license React
   * use-sync-external-store-shim.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
  (**
   * @license React
   * use-sync-external-store-shim/with-selector.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

@txnlab/use-wallet/dist/esm/index.js:
  (**
   * @license React
   * use-sync-external-store-shim/with-selector.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=/build/_shared/chunk-V7MC4E7F.js.map
