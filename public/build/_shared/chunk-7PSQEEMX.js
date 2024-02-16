import {
  __commonJS,
  __esm,
  __export,
  __require,
  __toESM
} from "/build/_shared/chunk-MYHRZK7S.js";

// node-modules-polyfills:buffer
function dew$2() {
  if (_dewExec$2)
    return exports$3;
  _dewExec$2 = true;
  exports$3.byteLength = byteLength;
  exports$3.toByteArray = toByteArray;
  exports$3.fromByteArray = fromByteArray;
  var lookup = [];
  var revLookup = [];
  var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
  var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for (var i = 0, len = code.length; i < len; ++i) {
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
  }
  revLookup["-".charCodeAt(0)] = 62;
  revLookup["_".charCodeAt(0)] = 63;
  function getLens(b64) {
    var len2 = b64.length;
    if (len2 % 4 > 0) {
      throw new Error("Invalid string. Length must be a multiple of 4");
    }
    var validLen = b64.indexOf("=");
    if (validLen === -1)
      validLen = len2;
    var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
    return [validLen, placeHoldersLen];
  }
  function byteLength(b64) {
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
  }
  function _byteLength(b64, validLen, placeHoldersLen) {
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
  }
  function toByteArray(b64) {
    var tmp;
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
    var curByte = 0;
    var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
    var i2;
    for (i2 = 0; i2 < len2; i2 += 4) {
      tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
      arr[curByte++] = tmp >> 16 & 255;
      arr[curByte++] = tmp >> 8 & 255;
      arr[curByte++] = tmp & 255;
    }
    if (placeHoldersLen === 2) {
      tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
      arr[curByte++] = tmp & 255;
    }
    if (placeHoldersLen === 1) {
      tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
      arr[curByte++] = tmp >> 8 & 255;
      arr[curByte++] = tmp & 255;
    }
    return arr;
  }
  function tripletToBase64(num) {
    return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
  }
  function encodeChunk(uint8, start, end) {
    var tmp;
    var output = [];
    for (var i2 = start; i2 < end; i2 += 3) {
      tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
      output.push(tripletToBase64(tmp));
    }
    return output.join("");
  }
  function fromByteArray(uint8) {
    var tmp;
    var len2 = uint8.length;
    var extraBytes = len2 % 3;
    var parts = [];
    var maxChunkLength = 16383;
    for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
      parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
    }
    if (extraBytes === 1) {
      tmp = uint8[len2 - 1];
      parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "==");
    } else if (extraBytes === 2) {
      tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
      parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "=");
    }
    return parts.join("");
  }
  return exports$3;
}
function dew$1() {
  if (_dewExec$1)
    return exports$2;
  _dewExec$1 = true;
  exports$2.read = function(buffer, offset, isLE, mLen, nBytes) {
    var e, m;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var nBits = -7;
    var i = isLE ? nBytes - 1 : 0;
    var d = isLE ? -1 : 1;
    var s = buffer[offset + i];
    i += d;
    e = s & (1 << -nBits) - 1;
    s >>= -nBits;
    nBits += eLen;
    for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
    }
    m = e & (1 << -nBits) - 1;
    e >>= -nBits;
    nBits += mLen;
    for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
    }
    if (e === 0) {
      e = 1 - eBias;
    } else if (e === eMax) {
      return m ? NaN : (s ? -1 : 1) * Infinity;
    } else {
      m = m + Math.pow(2, mLen);
      e = e - eBias;
    }
    return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
  };
  exports$2.write = function(buffer, value, offset, isLE, mLen, nBytes) {
    var e, m, c;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
    var i = isLE ? 0 : nBytes - 1;
    var d = isLE ? 1 : -1;
    var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
    value = Math.abs(value);
    if (isNaN(value) || value === Infinity) {
      m = isNaN(value) ? 1 : 0;
      e = eMax;
    } else {
      e = Math.floor(Math.log(value) / Math.LN2);
      if (value * (c = Math.pow(2, -e)) < 1) {
        e--;
        c *= 2;
      }
      if (e + eBias >= 1) {
        value += rt / c;
      } else {
        value += rt * Math.pow(2, 1 - eBias);
      }
      if (value * c >= 2) {
        e++;
        c /= 2;
      }
      if (e + eBias >= eMax) {
        m = 0;
        e = eMax;
      } else if (e + eBias >= 1) {
        m = (value * c - 1) * Math.pow(2, mLen);
        e = e + eBias;
      } else {
        m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
        e = 0;
      }
    }
    for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
    }
    e = e << mLen | m;
    eLen += mLen;
    for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
    }
    buffer[offset + i - d] |= s * 128;
  };
  return exports$2;
}
function dew() {
  if (_dewExec)
    return exports$1;
  _dewExec = true;
  const base64 = dew$2();
  const ieee754 = dew$1();
  const customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
  exports$1.Buffer = Buffer2;
  exports$1.SlowBuffer = SlowBuffer;
  exports$1.INSPECT_MAX_BYTES = 50;
  const K_MAX_LENGTH = 2147483647;
  exports$1.kMaxLength = K_MAX_LENGTH;
  Buffer2.TYPED_ARRAY_SUPPORT = typedArraySupport();
  if (!Buffer2.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
    console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
  }
  function typedArraySupport() {
    try {
      const arr = new Uint8Array(1);
      const proto = {
        foo: function() {
          return 42;
        }
      };
      Object.setPrototypeOf(proto, Uint8Array.prototype);
      Object.setPrototypeOf(arr, proto);
      return arr.foo() === 42;
    } catch (e) {
      return false;
    }
  }
  Object.defineProperty(Buffer2.prototype, "parent", {
    enumerable: true,
    get: function() {
      if (!Buffer2.isBuffer(this))
        return void 0;
      return this.buffer;
    }
  });
  Object.defineProperty(Buffer2.prototype, "offset", {
    enumerable: true,
    get: function() {
      if (!Buffer2.isBuffer(this))
        return void 0;
      return this.byteOffset;
    }
  });
  function createBuffer(length) {
    if (length > K_MAX_LENGTH) {
      throw new RangeError('The value "' + length + '" is invalid for option "size"');
    }
    const buf = new Uint8Array(length);
    Object.setPrototypeOf(buf, Buffer2.prototype);
    return buf;
  }
  function Buffer2(arg, encodingOrOffset, length) {
    if (typeof arg === "number") {
      if (typeof encodingOrOffset === "string") {
        throw new TypeError('The "string" argument must be of type string. Received type number');
      }
      return allocUnsafe(arg);
    }
    return from(arg, encodingOrOffset, length);
  }
  Buffer2.poolSize = 8192;
  function from(value, encodingOrOffset, length) {
    if (typeof value === "string") {
      return fromString(value, encodingOrOffset);
    }
    if (ArrayBuffer.isView(value)) {
      return fromArrayView(value);
    }
    if (value == null) {
      throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
    }
    if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
      return fromArrayBuffer(value, encodingOrOffset, length);
    }
    if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
      return fromArrayBuffer(value, encodingOrOffset, length);
    }
    if (typeof value === "number") {
      throw new TypeError('The "value" argument must not be of type number. Received type number');
    }
    const valueOf = value.valueOf && value.valueOf();
    if (valueOf != null && valueOf !== value) {
      return Buffer2.from(valueOf, encodingOrOffset, length);
    }
    const b = fromObject(value);
    if (b)
      return b;
    if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
      return Buffer2.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
    }
    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
  }
  Buffer2.from = function(value, encodingOrOffset, length) {
    return from(value, encodingOrOffset, length);
  };
  Object.setPrototypeOf(Buffer2.prototype, Uint8Array.prototype);
  Object.setPrototypeOf(Buffer2, Uint8Array);
  function assertSize(size) {
    if (typeof size !== "number") {
      throw new TypeError('"size" argument must be of type number');
    } else if (size < 0) {
      throw new RangeError('The value "' + size + '" is invalid for option "size"');
    }
  }
  function alloc(size, fill, encoding) {
    assertSize(size);
    if (size <= 0) {
      return createBuffer(size);
    }
    if (fill !== void 0) {
      return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
    }
    return createBuffer(size);
  }
  Buffer2.alloc = function(size, fill, encoding) {
    return alloc(size, fill, encoding);
  };
  function allocUnsafe(size) {
    assertSize(size);
    return createBuffer(size < 0 ? 0 : checked(size) | 0);
  }
  Buffer2.allocUnsafe = function(size) {
    return allocUnsafe(size);
  };
  Buffer2.allocUnsafeSlow = function(size) {
    return allocUnsafe(size);
  };
  function fromString(string, encoding) {
    if (typeof encoding !== "string" || encoding === "") {
      encoding = "utf8";
    }
    if (!Buffer2.isEncoding(encoding)) {
      throw new TypeError("Unknown encoding: " + encoding);
    }
    const length = byteLength(string, encoding) | 0;
    let buf = createBuffer(length);
    const actual = buf.write(string, encoding);
    if (actual !== length) {
      buf = buf.slice(0, actual);
    }
    return buf;
  }
  function fromArrayLike(array) {
    const length = array.length < 0 ? 0 : checked(array.length) | 0;
    const buf = createBuffer(length);
    for (let i = 0; i < length; i += 1) {
      buf[i] = array[i] & 255;
    }
    return buf;
  }
  function fromArrayView(arrayView) {
    if (isInstance(arrayView, Uint8Array)) {
      const copy = new Uint8Array(arrayView);
      return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
    }
    return fromArrayLike(arrayView);
  }
  function fromArrayBuffer(array, byteOffset, length) {
    if (byteOffset < 0 || array.byteLength < byteOffset) {
      throw new RangeError('"offset" is outside of buffer bounds');
    }
    if (array.byteLength < byteOffset + (length || 0)) {
      throw new RangeError('"length" is outside of buffer bounds');
    }
    let buf;
    if (byteOffset === void 0 && length === void 0) {
      buf = new Uint8Array(array);
    } else if (length === void 0) {
      buf = new Uint8Array(array, byteOffset);
    } else {
      buf = new Uint8Array(array, byteOffset, length);
    }
    Object.setPrototypeOf(buf, Buffer2.prototype);
    return buf;
  }
  function fromObject(obj) {
    if (Buffer2.isBuffer(obj)) {
      const len = checked(obj.length) | 0;
      const buf = createBuffer(len);
      if (buf.length === 0) {
        return buf;
      }
      obj.copy(buf, 0, 0, len);
      return buf;
    }
    if (obj.length !== void 0) {
      if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
        return createBuffer(0);
      }
      return fromArrayLike(obj);
    }
    if (obj.type === "Buffer" && Array.isArray(obj.data)) {
      return fromArrayLike(obj.data);
    }
  }
  function checked(length) {
    if (length >= K_MAX_LENGTH) {
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
    }
    return length | 0;
  }
  function SlowBuffer(length) {
    if (+length != length) {
      length = 0;
    }
    return Buffer2.alloc(+length);
  }
  Buffer2.isBuffer = function isBuffer(b) {
    return b != null && b._isBuffer === true && b !== Buffer2.prototype;
  };
  Buffer2.compare = function compare(a, b) {
    if (isInstance(a, Uint8Array))
      a = Buffer2.from(a, a.offset, a.byteLength);
    if (isInstance(b, Uint8Array))
      b = Buffer2.from(b, b.offset, b.byteLength);
    if (!Buffer2.isBuffer(a) || !Buffer2.isBuffer(b)) {
      throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
    }
    if (a === b)
      return 0;
    let x = a.length;
    let y = b.length;
    for (let i = 0, len = Math.min(x, y); i < len; ++i) {
      if (a[i] !== b[i]) {
        x = a[i];
        y = b[i];
        break;
      }
    }
    if (x < y)
      return -1;
    if (y < x)
      return 1;
    return 0;
  };
  Buffer2.isEncoding = function isEncoding(encoding) {
    switch (String(encoding).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return true;
      default:
        return false;
    }
  };
  Buffer2.concat = function concat(list, length) {
    if (!Array.isArray(list)) {
      throw new TypeError('"list" argument must be an Array of Buffers');
    }
    if (list.length === 0) {
      return Buffer2.alloc(0);
    }
    let i;
    if (length === void 0) {
      length = 0;
      for (i = 0; i < list.length; ++i) {
        length += list[i].length;
      }
    }
    const buffer = Buffer2.allocUnsafe(length);
    let pos = 0;
    for (i = 0; i < list.length; ++i) {
      let buf = list[i];
      if (isInstance(buf, Uint8Array)) {
        if (pos + buf.length > buffer.length) {
          if (!Buffer2.isBuffer(buf))
            buf = Buffer2.from(buf);
          buf.copy(buffer, pos);
        } else {
          Uint8Array.prototype.set.call(buffer, buf, pos);
        }
      } else if (!Buffer2.isBuffer(buf)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      } else {
        buf.copy(buffer, pos);
      }
      pos += buf.length;
    }
    return buffer;
  };
  function byteLength(string, encoding) {
    if (Buffer2.isBuffer(string)) {
      return string.length;
    }
    if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
      return string.byteLength;
    }
    if (typeof string !== "string") {
      throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string);
    }
    const len = string.length;
    const mustMatch = arguments.length > 2 && arguments[2] === true;
    if (!mustMatch && len === 0)
      return 0;
    let loweredCase = false;
    for (; ; ) {
      switch (encoding) {
        case "ascii":
        case "latin1":
        case "binary":
          return len;
        case "utf8":
        case "utf-8":
          return utf8ToBytes(string).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return len * 2;
        case "hex":
          return len >>> 1;
        case "base64":
          return base64ToBytes(string).length;
        default:
          if (loweredCase) {
            return mustMatch ? -1 : utf8ToBytes(string).length;
          }
          encoding = ("" + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  }
  Buffer2.byteLength = byteLength;
  function slowToString(encoding, start, end) {
    let loweredCase = false;
    if (start === void 0 || start < 0) {
      start = 0;
    }
    if (start > this.length) {
      return "";
    }
    if (end === void 0 || end > this.length) {
      end = this.length;
    }
    if (end <= 0) {
      return "";
    }
    end >>>= 0;
    start >>>= 0;
    if (end <= start) {
      return "";
    }
    if (!encoding)
      encoding = "utf8";
    while (true) {
      switch (encoding) {
        case "hex":
          return hexSlice(this, start, end);
        case "utf8":
        case "utf-8":
          return utf8Slice(this, start, end);
        case "ascii":
          return asciiSlice(this, start, end);
        case "latin1":
        case "binary":
          return latin1Slice(this, start, end);
        case "base64":
          return base64Slice(this, start, end);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return utf16leSlice(this, start, end);
        default:
          if (loweredCase)
            throw new TypeError("Unknown encoding: " + encoding);
          encoding = (encoding + "").toLowerCase();
          loweredCase = true;
      }
    }
  }
  Buffer2.prototype._isBuffer = true;
  function swap(b, n, m) {
    const i = b[n];
    b[n] = b[m];
    b[m] = i;
  }
  Buffer2.prototype.swap16 = function swap16() {
    const len = this.length;
    if (len % 2 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    }
    for (let i = 0; i < len; i += 2) {
      swap(this, i, i + 1);
    }
    return this;
  };
  Buffer2.prototype.swap32 = function swap32() {
    const len = this.length;
    if (len % 4 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    }
    for (let i = 0; i < len; i += 4) {
      swap(this, i, i + 3);
      swap(this, i + 1, i + 2);
    }
    return this;
  };
  Buffer2.prototype.swap64 = function swap64() {
    const len = this.length;
    if (len % 8 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    }
    for (let i = 0; i < len; i += 8) {
      swap(this, i, i + 7);
      swap(this, i + 1, i + 6);
      swap(this, i + 2, i + 5);
      swap(this, i + 3, i + 4);
    }
    return this;
  };
  Buffer2.prototype.toString = function toString() {
    const length = this.length;
    if (length === 0)
      return "";
    if (arguments.length === 0)
      return utf8Slice(this, 0, length);
    return slowToString.apply(this, arguments);
  };
  Buffer2.prototype.toLocaleString = Buffer2.prototype.toString;
  Buffer2.prototype.equals = function equals(b) {
    if (!Buffer2.isBuffer(b))
      throw new TypeError("Argument must be a Buffer");
    if (this === b)
      return true;
    return Buffer2.compare(this, b) === 0;
  };
  Buffer2.prototype.inspect = function inspect() {
    let str = "";
    const max = exports$1.INSPECT_MAX_BYTES;
    str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
    if (this.length > max)
      str += " ... ";
    return "<Buffer " + str + ">";
  };
  if (customInspectSymbol) {
    Buffer2.prototype[customInspectSymbol] = Buffer2.prototype.inspect;
  }
  Buffer2.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
    if (isInstance(target, Uint8Array)) {
      target = Buffer2.from(target, target.offset, target.byteLength);
    }
    if (!Buffer2.isBuffer(target)) {
      throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target);
    }
    if (start === void 0) {
      start = 0;
    }
    if (end === void 0) {
      end = target ? target.length : 0;
    }
    if (thisStart === void 0) {
      thisStart = 0;
    }
    if (thisEnd === void 0) {
      thisEnd = this.length;
    }
    if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
      throw new RangeError("out of range index");
    }
    if (thisStart >= thisEnd && start >= end) {
      return 0;
    }
    if (thisStart >= thisEnd) {
      return -1;
    }
    if (start >= end) {
      return 1;
    }
    start >>>= 0;
    end >>>= 0;
    thisStart >>>= 0;
    thisEnd >>>= 0;
    if (this === target)
      return 0;
    let x = thisEnd - thisStart;
    let y = end - start;
    const len = Math.min(x, y);
    const thisCopy = this.slice(thisStart, thisEnd);
    const targetCopy = target.slice(start, end);
    for (let i = 0; i < len; ++i) {
      if (thisCopy[i] !== targetCopy[i]) {
        x = thisCopy[i];
        y = targetCopy[i];
        break;
      }
    }
    if (x < y)
      return -1;
    if (y < x)
      return 1;
    return 0;
  };
  function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
    if (buffer.length === 0)
      return -1;
    if (typeof byteOffset === "string") {
      encoding = byteOffset;
      byteOffset = 0;
    } else if (byteOffset > 2147483647) {
      byteOffset = 2147483647;
    } else if (byteOffset < -2147483648) {
      byteOffset = -2147483648;
    }
    byteOffset = +byteOffset;
    if (numberIsNaN(byteOffset)) {
      byteOffset = dir ? 0 : buffer.length - 1;
    }
    if (byteOffset < 0)
      byteOffset = buffer.length + byteOffset;
    if (byteOffset >= buffer.length) {
      if (dir)
        return -1;
      else
        byteOffset = buffer.length - 1;
    } else if (byteOffset < 0) {
      if (dir)
        byteOffset = 0;
      else
        return -1;
    }
    if (typeof val === "string") {
      val = Buffer2.from(val, encoding);
    }
    if (Buffer2.isBuffer(val)) {
      if (val.length === 0) {
        return -1;
      }
      return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
    } else if (typeof val === "number") {
      val = val & 255;
      if (typeof Uint8Array.prototype.indexOf === "function") {
        if (dir) {
          return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
        } else {
          return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
        }
      }
      return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
    }
    throw new TypeError("val must be string, number or Buffer");
  }
  function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
    let indexSize = 1;
    let arrLength = arr.length;
    let valLength = val.length;
    if (encoding !== void 0) {
      encoding = String(encoding).toLowerCase();
      if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
        if (arr.length < 2 || val.length < 2) {
          return -1;
        }
        indexSize = 2;
        arrLength /= 2;
        valLength /= 2;
        byteOffset /= 2;
      }
    }
    function read(buf, i2) {
      if (indexSize === 1) {
        return buf[i2];
      } else {
        return buf.readUInt16BE(i2 * indexSize);
      }
    }
    let i;
    if (dir) {
      let foundIndex = -1;
      for (i = byteOffset; i < arrLength; i++) {
        if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
          if (foundIndex === -1)
            foundIndex = i;
          if (i - foundIndex + 1 === valLength)
            return foundIndex * indexSize;
        } else {
          if (foundIndex !== -1)
            i -= i - foundIndex;
          foundIndex = -1;
        }
      }
    } else {
      if (byteOffset + valLength > arrLength)
        byteOffset = arrLength - valLength;
      for (i = byteOffset; i >= 0; i--) {
        let found = true;
        for (let j = 0; j < valLength; j++) {
          if (read(arr, i + j) !== read(val, j)) {
            found = false;
            break;
          }
        }
        if (found)
          return i;
      }
    }
    return -1;
  }
  Buffer2.prototype.includes = function includes(val, byteOffset, encoding) {
    return this.indexOf(val, byteOffset, encoding) !== -1;
  };
  Buffer2.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
  };
  Buffer2.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
  };
  function hexWrite(buf, string, offset, length) {
    offset = Number(offset) || 0;
    const remaining = buf.length - offset;
    if (!length) {
      length = remaining;
    } else {
      length = Number(length);
      if (length > remaining) {
        length = remaining;
      }
    }
    const strLen = string.length;
    if (length > strLen / 2) {
      length = strLen / 2;
    }
    let i;
    for (i = 0; i < length; ++i) {
      const parsed = parseInt(string.substr(i * 2, 2), 16);
      if (numberIsNaN(parsed))
        return i;
      buf[offset + i] = parsed;
    }
    return i;
  }
  function utf8Write(buf, string, offset, length) {
    return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
  }
  function asciiWrite(buf, string, offset, length) {
    return blitBuffer(asciiToBytes(string), buf, offset, length);
  }
  function base64Write(buf, string, offset, length) {
    return blitBuffer(base64ToBytes(string), buf, offset, length);
  }
  function ucs2Write(buf, string, offset, length) {
    return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
  }
  Buffer2.prototype.write = function write(string, offset, length, encoding) {
    if (offset === void 0) {
      encoding = "utf8";
      length = this.length;
      offset = 0;
    } else if (length === void 0 && typeof offset === "string") {
      encoding = offset;
      length = this.length;
      offset = 0;
    } else if (isFinite(offset)) {
      offset = offset >>> 0;
      if (isFinite(length)) {
        length = length >>> 0;
        if (encoding === void 0)
          encoding = "utf8";
      } else {
        encoding = length;
        length = void 0;
      }
    } else {
      throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
    }
    const remaining = this.length - offset;
    if (length === void 0 || length > remaining)
      length = remaining;
    if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
      throw new RangeError("Attempt to write outside buffer bounds");
    }
    if (!encoding)
      encoding = "utf8";
    let loweredCase = false;
    for (; ; ) {
      switch (encoding) {
        case "hex":
          return hexWrite(this, string, offset, length);
        case "utf8":
        case "utf-8":
          return utf8Write(this, string, offset, length);
        case "ascii":
        case "latin1":
        case "binary":
          return asciiWrite(this, string, offset, length);
        case "base64":
          return base64Write(this, string, offset, length);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return ucs2Write(this, string, offset, length);
        default:
          if (loweredCase)
            throw new TypeError("Unknown encoding: " + encoding);
          encoding = ("" + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  };
  Buffer2.prototype.toJSON = function toJSON() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function base64Slice(buf, start, end) {
    if (start === 0 && end === buf.length) {
      return base64.fromByteArray(buf);
    } else {
      return base64.fromByteArray(buf.slice(start, end));
    }
  }
  function utf8Slice(buf, start, end) {
    end = Math.min(buf.length, end);
    const res = [];
    let i = start;
    while (i < end) {
      const firstByte = buf[i];
      let codePoint = null;
      let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
      if (i + bytesPerSequence <= end) {
        let secondByte, thirdByte, fourthByte, tempCodePoint;
        switch (bytesPerSequence) {
          case 1:
            if (firstByte < 128) {
              codePoint = firstByte;
            }
            break;
          case 2:
            secondByte = buf[i + 1];
            if ((secondByte & 192) === 128) {
              tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
              if (tempCodePoint > 127) {
                codePoint = tempCodePoint;
              }
            }
            break;
          case 3:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];
            if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
              tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
              if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                codePoint = tempCodePoint;
              }
            }
            break;
          case 4:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];
            fourthByte = buf[i + 3];
            if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
              tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
              if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                codePoint = tempCodePoint;
              }
            }
        }
      }
      if (codePoint === null) {
        codePoint = 65533;
        bytesPerSequence = 1;
      } else if (codePoint > 65535) {
        codePoint -= 65536;
        res.push(codePoint >>> 10 & 1023 | 55296);
        codePoint = 56320 | codePoint & 1023;
      }
      res.push(codePoint);
      i += bytesPerSequence;
    }
    return decodeCodePointsArray(res);
  }
  const MAX_ARGUMENTS_LENGTH = 4096;
  function decodeCodePointsArray(codePoints) {
    const len = codePoints.length;
    if (len <= MAX_ARGUMENTS_LENGTH) {
      return String.fromCharCode.apply(String, codePoints);
    }
    let res = "";
    let i = 0;
    while (i < len) {
      res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
    }
    return res;
  }
  function asciiSlice(buf, start, end) {
    let ret = "";
    end = Math.min(buf.length, end);
    for (let i = start; i < end; ++i) {
      ret += String.fromCharCode(buf[i] & 127);
    }
    return ret;
  }
  function latin1Slice(buf, start, end) {
    let ret = "";
    end = Math.min(buf.length, end);
    for (let i = start; i < end; ++i) {
      ret += String.fromCharCode(buf[i]);
    }
    return ret;
  }
  function hexSlice(buf, start, end) {
    const len = buf.length;
    if (!start || start < 0)
      start = 0;
    if (!end || end < 0 || end > len)
      end = len;
    let out = "";
    for (let i = start; i < end; ++i) {
      out += hexSliceLookupTable[buf[i]];
    }
    return out;
  }
  function utf16leSlice(buf, start, end) {
    const bytes = buf.slice(start, end);
    let res = "";
    for (let i = 0; i < bytes.length - 1; i += 2) {
      res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
    }
    return res;
  }
  Buffer2.prototype.slice = function slice(start, end) {
    const len = this.length;
    start = ~~start;
    end = end === void 0 ? len : ~~end;
    if (start < 0) {
      start += len;
      if (start < 0)
        start = 0;
    } else if (start > len) {
      start = len;
    }
    if (end < 0) {
      end += len;
      if (end < 0)
        end = 0;
    } else if (end > len) {
      end = len;
    }
    if (end < start)
      end = start;
    const newBuf = this.subarray(start, end);
    Object.setPrototypeOf(newBuf, Buffer2.prototype);
    return newBuf;
  };
  function checkOffset(offset, ext, length) {
    if (offset % 1 !== 0 || offset < 0)
      throw new RangeError("offset is not uint");
    if (offset + ext > length)
      throw new RangeError("Trying to access beyond buffer length");
  }
  Buffer2.prototype.readUintLE = Buffer2.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
    offset = offset >>> 0;
    byteLength2 = byteLength2 >>> 0;
    if (!noAssert)
      checkOffset(offset, byteLength2, this.length);
    let val = this[offset];
    let mul = 1;
    let i = 0;
    while (++i < byteLength2 && (mul *= 256)) {
      val += this[offset + i] * mul;
    }
    return val;
  };
  Buffer2.prototype.readUintBE = Buffer2.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
    offset = offset >>> 0;
    byteLength2 = byteLength2 >>> 0;
    if (!noAssert) {
      checkOffset(offset, byteLength2, this.length);
    }
    let val = this[offset + --byteLength2];
    let mul = 1;
    while (byteLength2 > 0 && (mul *= 256)) {
      val += this[offset + --byteLength2] * mul;
    }
    return val;
  };
  Buffer2.prototype.readUint8 = Buffer2.prototype.readUInt8 = function readUInt8(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 1, this.length);
    return this[offset];
  };
  Buffer2.prototype.readUint16LE = Buffer2.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 2, this.length);
    return this[offset] | this[offset + 1] << 8;
  };
  Buffer2.prototype.readUint16BE = Buffer2.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 2, this.length);
    return this[offset] << 8 | this[offset + 1];
  };
  Buffer2.prototype.readUint32LE = Buffer2.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
  };
  Buffer2.prototype.readUint32BE = Buffer2.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
  };
  Buffer2.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === void 0 || last === void 0) {
      boundsError(offset, this.length - 8);
    }
    const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
    const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
    return BigInt(lo) + (BigInt(hi) << BigInt(32));
  });
  Buffer2.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === void 0 || last === void 0) {
      boundsError(offset, this.length - 8);
    }
    const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
    const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
    return (BigInt(hi) << BigInt(32)) + BigInt(lo);
  });
  Buffer2.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
    offset = offset >>> 0;
    byteLength2 = byteLength2 >>> 0;
    if (!noAssert)
      checkOffset(offset, byteLength2, this.length);
    let val = this[offset];
    let mul = 1;
    let i = 0;
    while (++i < byteLength2 && (mul *= 256)) {
      val += this[offset + i] * mul;
    }
    mul *= 128;
    if (val >= mul)
      val -= Math.pow(2, 8 * byteLength2);
    return val;
  };
  Buffer2.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
    offset = offset >>> 0;
    byteLength2 = byteLength2 >>> 0;
    if (!noAssert)
      checkOffset(offset, byteLength2, this.length);
    let i = byteLength2;
    let mul = 1;
    let val = this[offset + --i];
    while (i > 0 && (mul *= 256)) {
      val += this[offset + --i] * mul;
    }
    mul *= 128;
    if (val >= mul)
      val -= Math.pow(2, 8 * byteLength2);
    return val;
  };
  Buffer2.prototype.readInt8 = function readInt8(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 1, this.length);
    if (!(this[offset] & 128))
      return this[offset];
    return (255 - this[offset] + 1) * -1;
  };
  Buffer2.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 2, this.length);
    const val = this[offset] | this[offset + 1] << 8;
    return val & 32768 ? val | 4294901760 : val;
  };
  Buffer2.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 2, this.length);
    const val = this[offset + 1] | this[offset] << 8;
    return val & 32768 ? val | 4294901760 : val;
  };
  Buffer2.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
  };
  Buffer2.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
  };
  Buffer2.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === void 0 || last === void 0) {
      boundsError(offset, this.length - 8);
    }
    const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
    return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
  });
  Buffer2.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === void 0 || last === void 0) {
      boundsError(offset, this.length - 8);
    }
    const val = (first << 24) + // Overflow
    this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
    return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
  });
  Buffer2.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return ieee754.read(this, offset, true, 23, 4);
  };
  Buffer2.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 4, this.length);
    return ieee754.read(this, offset, false, 23, 4);
  };
  Buffer2.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 8, this.length);
    return ieee754.read(this, offset, true, 52, 8);
  };
  Buffer2.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert)
      checkOffset(offset, 8, this.length);
    return ieee754.read(this, offset, false, 52, 8);
  };
  function checkInt(buf, value, offset, ext, max, min) {
    if (!Buffer2.isBuffer(buf))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (value > max || value < min)
      throw new RangeError('"value" argument is out of bounds');
    if (offset + ext > buf.length)
      throw new RangeError("Index out of range");
  }
  Buffer2.prototype.writeUintLE = Buffer2.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
    value = +value;
    offset = offset >>> 0;
    byteLength2 = byteLength2 >>> 0;
    if (!noAssert) {
      const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
      checkInt(this, value, offset, byteLength2, maxBytes, 0);
    }
    let mul = 1;
    let i = 0;
    this[offset] = value & 255;
    while (++i < byteLength2 && (mul *= 256)) {
      this[offset + i] = value / mul & 255;
    }
    return offset + byteLength2;
  };
  Buffer2.prototype.writeUintBE = Buffer2.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
    value = +value;
    offset = offset >>> 0;
    byteLength2 = byteLength2 >>> 0;
    if (!noAssert) {
      const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
      checkInt(this, value, offset, byteLength2, maxBytes, 0);
    }
    let i = byteLength2 - 1;
    let mul = 1;
    this[offset + i] = value & 255;
    while (--i >= 0 && (mul *= 256)) {
      this[offset + i] = value / mul & 255;
    }
    return offset + byteLength2;
  };
  Buffer2.prototype.writeUint8 = Buffer2.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 1, 255, 0);
    this[offset] = value & 255;
    return offset + 1;
  };
  Buffer2.prototype.writeUint16LE = Buffer2.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 2, 65535, 0);
    this[offset] = value & 255;
    this[offset + 1] = value >>> 8;
    return offset + 2;
  };
  Buffer2.prototype.writeUint16BE = Buffer2.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 2, 65535, 0);
    this[offset] = value >>> 8;
    this[offset + 1] = value & 255;
    return offset + 2;
  };
  Buffer2.prototype.writeUint32LE = Buffer2.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 4, 4294967295, 0);
    this[offset + 3] = value >>> 24;
    this[offset + 2] = value >>> 16;
    this[offset + 1] = value >>> 8;
    this[offset] = value & 255;
    return offset + 4;
  };
  Buffer2.prototype.writeUint32BE = Buffer2.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 4, 4294967295, 0);
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 255;
    return offset + 4;
  };
  function wrtBigUInt64LE(buf, value, offset, min, max) {
    checkIntBI(value, min, max, buf, offset, 7);
    let lo = Number(value & BigInt(4294967295));
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    let hi = Number(value >> BigInt(32) & BigInt(4294967295));
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    return offset;
  }
  function wrtBigUInt64BE(buf, value, offset, min, max) {
    checkIntBI(value, min, max, buf, offset, 7);
    let lo = Number(value & BigInt(4294967295));
    buf[offset + 7] = lo;
    lo = lo >> 8;
    buf[offset + 6] = lo;
    lo = lo >> 8;
    buf[offset + 5] = lo;
    lo = lo >> 8;
    buf[offset + 4] = lo;
    let hi = Number(value >> BigInt(32) & BigInt(4294967295));
    buf[offset + 3] = hi;
    hi = hi >> 8;
    buf[offset + 2] = hi;
    hi = hi >> 8;
    buf[offset + 1] = hi;
    hi = hi >> 8;
    buf[offset] = hi;
    return offset + 8;
  }
  Buffer2.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
    return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
  });
  Buffer2.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
    return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
  });
  Buffer2.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      const limit = Math.pow(2, 8 * byteLength2 - 1);
      checkInt(this, value, offset, byteLength2, limit - 1, -limit);
    }
    let i = 0;
    let mul = 1;
    let sub = 0;
    this[offset] = value & 255;
    while (++i < byteLength2 && (mul *= 256)) {
      if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
        sub = 1;
      }
      this[offset + i] = (value / mul >> 0) - sub & 255;
    }
    return offset + byteLength2;
  };
  Buffer2.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      const limit = Math.pow(2, 8 * byteLength2 - 1);
      checkInt(this, value, offset, byteLength2, limit - 1, -limit);
    }
    let i = byteLength2 - 1;
    let mul = 1;
    let sub = 0;
    this[offset + i] = value & 255;
    while (--i >= 0 && (mul *= 256)) {
      if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
        sub = 1;
      }
      this[offset + i] = (value / mul >> 0) - sub & 255;
    }
    return offset + byteLength2;
  };
  Buffer2.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 1, 127, -128);
    if (value < 0)
      value = 255 + value + 1;
    this[offset] = value & 255;
    return offset + 1;
  };
  Buffer2.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 2, 32767, -32768);
    this[offset] = value & 255;
    this[offset + 1] = value >>> 8;
    return offset + 2;
  };
  Buffer2.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 2, 32767, -32768);
    this[offset] = value >>> 8;
    this[offset + 1] = value & 255;
    return offset + 2;
  };
  Buffer2.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 4, 2147483647, -2147483648);
    this[offset] = value & 255;
    this[offset + 1] = value >>> 8;
    this[offset + 2] = value >>> 16;
    this[offset + 3] = value >>> 24;
    return offset + 4;
  };
  Buffer2.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert)
      checkInt(this, value, offset, 4, 2147483647, -2147483648);
    if (value < 0)
      value = 4294967295 + value + 1;
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 255;
    return offset + 4;
  };
  Buffer2.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
    return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  Buffer2.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
    return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  function checkIEEE754(buf, value, offset, ext, max, min) {
    if (offset + ext > buf.length)
      throw new RangeError("Index out of range");
    if (offset < 0)
      throw new RangeError("Index out of range");
  }
  function writeFloat(buf, value, offset, littleEndian, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      checkIEEE754(buf, value, offset, 4);
    }
    ieee754.write(buf, value, offset, littleEndian, 23, 4);
    return offset + 4;
  }
  Buffer2.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
    return writeFloat(this, value, offset, true, noAssert);
  };
  Buffer2.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
    return writeFloat(this, value, offset, false, noAssert);
  };
  function writeDouble(buf, value, offset, littleEndian, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      checkIEEE754(buf, value, offset, 8);
    }
    ieee754.write(buf, value, offset, littleEndian, 52, 8);
    return offset + 8;
  }
  Buffer2.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
    return writeDouble(this, value, offset, true, noAssert);
  };
  Buffer2.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
    return writeDouble(this, value, offset, false, noAssert);
  };
  Buffer2.prototype.copy = function copy(target, targetStart, start, end) {
    if (!Buffer2.isBuffer(target))
      throw new TypeError("argument should be a Buffer");
    if (!start)
      start = 0;
    if (!end && end !== 0)
      end = this.length;
    if (targetStart >= target.length)
      targetStart = target.length;
    if (!targetStart)
      targetStart = 0;
    if (end > 0 && end < start)
      end = start;
    if (end === start)
      return 0;
    if (target.length === 0 || this.length === 0)
      return 0;
    if (targetStart < 0) {
      throw new RangeError("targetStart out of bounds");
    }
    if (start < 0 || start >= this.length)
      throw new RangeError("Index out of range");
    if (end < 0)
      throw new RangeError("sourceEnd out of bounds");
    if (end > this.length)
      end = this.length;
    if (target.length - targetStart < end - start) {
      end = target.length - targetStart + start;
    }
    const len = end - start;
    if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
      this.copyWithin(targetStart, start, end);
    } else {
      Uint8Array.prototype.set.call(target, this.subarray(start, end), targetStart);
    }
    return len;
  };
  Buffer2.prototype.fill = function fill(val, start, end, encoding) {
    if (typeof val === "string") {
      if (typeof start === "string") {
        encoding = start;
        start = 0;
        end = this.length;
      } else if (typeof end === "string") {
        encoding = end;
        end = this.length;
      }
      if (encoding !== void 0 && typeof encoding !== "string") {
        throw new TypeError("encoding must be a string");
      }
      if (typeof encoding === "string" && !Buffer2.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      if (val.length === 1) {
        const code = val.charCodeAt(0);
        if (encoding === "utf8" && code < 128 || encoding === "latin1") {
          val = code;
        }
      }
    } else if (typeof val === "number") {
      val = val & 255;
    } else if (typeof val === "boolean") {
      val = Number(val);
    }
    if (start < 0 || this.length < start || this.length < end) {
      throw new RangeError("Out of range index");
    }
    if (end <= start) {
      return this;
    }
    start = start >>> 0;
    end = end === void 0 ? this.length : end >>> 0;
    if (!val)
      val = 0;
    let i;
    if (typeof val === "number") {
      for (i = start; i < end; ++i) {
        this[i] = val;
      }
    } else {
      const bytes = Buffer2.isBuffer(val) ? val : Buffer2.from(val, encoding);
      const len = bytes.length;
      if (len === 0) {
        throw new TypeError('The value "' + val + '" is invalid for argument "value"');
      }
      for (i = 0; i < end - start; ++i) {
        this[i + start] = bytes[i % len];
      }
    }
    return this;
  };
  const errors = {};
  function E(sym, getMessage, Base) {
    errors[sym] = class NodeError extends Base {
      constructor() {
        super();
        Object.defineProperty(this, "message", {
          value: getMessage.apply(this, arguments),
          writable: true,
          configurable: true
        });
        this.name = `${this.name} [${sym}]`;
        this.stack;
        delete this.name;
      }
      get code() {
        return sym;
      }
      set code(value) {
        Object.defineProperty(this, "code", {
          configurable: true,
          enumerable: true,
          value,
          writable: true
        });
      }
      toString() {
        return `${this.name} [${sym}]: ${this.message}`;
      }
    };
  }
  E("ERR_BUFFER_OUT_OF_BOUNDS", function(name) {
    if (name) {
      return `${name} is outside of buffer bounds`;
    }
    return "Attempt to access memory outside buffer bounds";
  }, RangeError);
  E("ERR_INVALID_ARG_TYPE", function(name, actual) {
    return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
  }, TypeError);
  E("ERR_OUT_OF_RANGE", function(str, range, input) {
    let msg = `The value of "${str}" is out of range.`;
    let received = input;
    if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
      received = addNumericalSeparator(String(input));
    } else if (typeof input === "bigint") {
      received = String(input);
      if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
        received = addNumericalSeparator(received);
      }
      received += "n";
    }
    msg += ` It must be ${range}. Received ${received}`;
    return msg;
  }, RangeError);
  function addNumericalSeparator(val) {
    let res = "";
    let i = val.length;
    const start = val[0] === "-" ? 1 : 0;
    for (; i >= start + 4; i -= 3) {
      res = `_${val.slice(i - 3, i)}${res}`;
    }
    return `${val.slice(0, i)}${res}`;
  }
  function checkBounds(buf, offset, byteLength2) {
    validateNumber(offset, "offset");
    if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
      boundsError(offset, buf.length - (byteLength2 + 1));
    }
  }
  function checkIntBI(value, min, max, buf, offset, byteLength2) {
    if (value > max || value < min) {
      const n = typeof min === "bigint" ? "n" : "";
      let range;
      if (byteLength2 > 3) {
        if (min === 0 || min === BigInt(0)) {
          range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
        } else {
          range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
        }
      } else {
        range = `>= ${min}${n} and <= ${max}${n}`;
      }
      throw new errors.ERR_OUT_OF_RANGE("value", range, value);
    }
    checkBounds(buf, offset, byteLength2);
  }
  function validateNumber(value, name) {
    if (typeof value !== "number") {
      throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
    }
  }
  function boundsError(value, length, type) {
    if (Math.floor(value) !== value) {
      validateNumber(value, type);
      throw new errors.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
    }
    if (length < 0) {
      throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
    }
    throw new errors.ERR_OUT_OF_RANGE(type || "offset", `>= ${type ? 1 : 0} and <= ${length}`, value);
  }
  const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
  function base64clean(str) {
    str = str.split("=")[0];
    str = str.trim().replace(INVALID_BASE64_RE, "");
    if (str.length < 2)
      return "";
    while (str.length % 4 !== 0) {
      str = str + "=";
    }
    return str;
  }
  function utf8ToBytes(string, units) {
    units = units || Infinity;
    let codePoint;
    const length = string.length;
    let leadSurrogate = null;
    const bytes = [];
    for (let i = 0; i < length; ++i) {
      codePoint = string.charCodeAt(i);
      if (codePoint > 55295 && codePoint < 57344) {
        if (!leadSurrogate) {
          if (codePoint > 56319) {
            if ((units -= 3) > -1)
              bytes.push(239, 191, 189);
            continue;
          } else if (i + 1 === length) {
            if ((units -= 3) > -1)
              bytes.push(239, 191, 189);
            continue;
          }
          leadSurrogate = codePoint;
          continue;
        }
        if (codePoint < 56320) {
          if ((units -= 3) > -1)
            bytes.push(239, 191, 189);
          leadSurrogate = codePoint;
          continue;
        }
        codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
      } else if (leadSurrogate) {
        if ((units -= 3) > -1)
          bytes.push(239, 191, 189);
      }
      leadSurrogate = null;
      if (codePoint < 128) {
        if ((units -= 1) < 0)
          break;
        bytes.push(codePoint);
      } else if (codePoint < 2048) {
        if ((units -= 2) < 0)
          break;
        bytes.push(codePoint >> 6 | 192, codePoint & 63 | 128);
      } else if (codePoint < 65536) {
        if ((units -= 3) < 0)
          break;
        bytes.push(codePoint >> 12 | 224, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
      } else if (codePoint < 1114112) {
        if ((units -= 4) < 0)
          break;
        bytes.push(codePoint >> 18 | 240, codePoint >> 12 & 63 | 128, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
      } else {
        throw new Error("Invalid code point");
      }
    }
    return bytes;
  }
  function asciiToBytes(str) {
    const byteArray = [];
    for (let i = 0; i < str.length; ++i) {
      byteArray.push(str.charCodeAt(i) & 255);
    }
    return byteArray;
  }
  function utf16leToBytes(str, units) {
    let c, hi, lo;
    const byteArray = [];
    for (let i = 0; i < str.length; ++i) {
      if ((units -= 2) < 0)
        break;
      c = str.charCodeAt(i);
      hi = c >> 8;
      lo = c % 256;
      byteArray.push(lo);
      byteArray.push(hi);
    }
    return byteArray;
  }
  function base64ToBytes(str) {
    return base64.toByteArray(base64clean(str));
  }
  function blitBuffer(src, dst, offset, length) {
    let i;
    for (i = 0; i < length; ++i) {
      if (i + offset >= dst.length || i >= src.length)
        break;
      dst[i + offset] = src[i];
    }
    return i;
  }
  function isInstance(obj, type) {
    return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
  }
  function numberIsNaN(obj) {
    return obj !== obj;
  }
  const hexSliceLookupTable = function() {
    const alphabet = "0123456789abcdef";
    const table = new Array(256);
    for (let i = 0; i < 16; ++i) {
      const i16 = i * 16;
      for (let j = 0; j < 16; ++j) {
        table[i16 + j] = alphabet[i] + alphabet[j];
      }
    }
    return table;
  }();
  function defineBigIntMethod(fn) {
    return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
  }
  function BufferBigIntNotDefined() {
    throw new Error("BigInt not supported");
  }
  return exports$1;
}
var exports$3, _dewExec$2, exports$2, _dewExec$1, exports$1, _dewExec, exports, Buffer, INSPECT_MAX_BYTES, kMaxLength;
var init_buffer = __esm({
  "node-modules-polyfills:buffer"() {
    exports$3 = {};
    _dewExec$2 = false;
    exports$2 = {};
    _dewExec$1 = false;
    exports$1 = {};
    _dewExec = false;
    exports = dew();
    exports["Buffer"];
    exports["SlowBuffer"];
    exports["INSPECT_MAX_BYTES"];
    exports["kMaxLength"];
    Buffer = exports.Buffer;
    INSPECT_MAX_BYTES = exports.INSPECT_MAX_BYTES;
    kMaxLength = exports.kMaxLength;
  }
});

// node-modules-polyfills-empty:crypto
var require_crypto = __commonJS({
  "node-modules-polyfills-empty:crypto"(exports2, module) {
    module.exports = {};
  }
});

// node_modules/.pnpm/tweetnacl@1.0.3/node_modules/tweetnacl/nacl-fast.js
var require_nacl_fast = __commonJS({
  "node_modules/.pnpm/tweetnacl@1.0.3/node_modules/tweetnacl/nacl-fast.js"(exports2, module) {
    (function(nacl2) {
      "use strict";
      var gf = function(init) {
        var i, r = new Float64Array(16);
        if (init)
          for (i = 0; i < init.length; i++)
            r[i] = init[i];
        return r;
      };
      var randombytes = function() {
        throw new Error("no PRNG");
      };
      var _0 = new Uint8Array(16);
      var _9 = new Uint8Array(32);
      _9[0] = 9;
      var gf0 = gf(), gf1 = gf([1]), _121665 = gf([56129, 1]), D = gf([30883, 4953, 19914, 30187, 55467, 16705, 2637, 112, 59544, 30585, 16505, 36039, 65139, 11119, 27886, 20995]), D2 = gf([61785, 9906, 39828, 60374, 45398, 33411, 5274, 224, 53552, 61171, 33010, 6542, 64743, 22239, 55772, 9222]), X = gf([54554, 36645, 11616, 51542, 42930, 38181, 51040, 26924, 56412, 64982, 57905, 49316, 21502, 52590, 14035, 8553]), Y = gf([26200, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214]), I = gf([41136, 18958, 6951, 50414, 58488, 44335, 6150, 12099, 55207, 15867, 153, 11085, 57099, 20417, 9344, 11139]);
      function ts64(x, i, h, l) {
        x[i] = h >> 24 & 255;
        x[i + 1] = h >> 16 & 255;
        x[i + 2] = h >> 8 & 255;
        x[i + 3] = h & 255;
        x[i + 4] = l >> 24 & 255;
        x[i + 5] = l >> 16 & 255;
        x[i + 6] = l >> 8 & 255;
        x[i + 7] = l & 255;
      }
      function vn(x, xi, y, yi, n) {
        var i, d = 0;
        for (i = 0; i < n; i++)
          d |= x[xi + i] ^ y[yi + i];
        return (1 & d - 1 >>> 8) - 1;
      }
      function crypto_verify_16(x, xi, y, yi) {
        return vn(x, xi, y, yi, 16);
      }
      function crypto_verify_32(x, xi, y, yi) {
        return vn(x, xi, y, yi, 32);
      }
      function core_salsa20(o, p, k, c) {
        var j0 = c[0] & 255 | (c[1] & 255) << 8 | (c[2] & 255) << 16 | (c[3] & 255) << 24, j1 = k[0] & 255 | (k[1] & 255) << 8 | (k[2] & 255) << 16 | (k[3] & 255) << 24, j2 = k[4] & 255 | (k[5] & 255) << 8 | (k[6] & 255) << 16 | (k[7] & 255) << 24, j3 = k[8] & 255 | (k[9] & 255) << 8 | (k[10] & 255) << 16 | (k[11] & 255) << 24, j4 = k[12] & 255 | (k[13] & 255) << 8 | (k[14] & 255) << 16 | (k[15] & 255) << 24, j5 = c[4] & 255 | (c[5] & 255) << 8 | (c[6] & 255) << 16 | (c[7] & 255) << 24, j6 = p[0] & 255 | (p[1] & 255) << 8 | (p[2] & 255) << 16 | (p[3] & 255) << 24, j7 = p[4] & 255 | (p[5] & 255) << 8 | (p[6] & 255) << 16 | (p[7] & 255) << 24, j8 = p[8] & 255 | (p[9] & 255) << 8 | (p[10] & 255) << 16 | (p[11] & 255) << 24, j9 = p[12] & 255 | (p[13] & 255) << 8 | (p[14] & 255) << 16 | (p[15] & 255) << 24, j10 = c[8] & 255 | (c[9] & 255) << 8 | (c[10] & 255) << 16 | (c[11] & 255) << 24, j11 = k[16] & 255 | (k[17] & 255) << 8 | (k[18] & 255) << 16 | (k[19] & 255) << 24, j12 = k[20] & 255 | (k[21] & 255) << 8 | (k[22] & 255) << 16 | (k[23] & 255) << 24, j13 = k[24] & 255 | (k[25] & 255) << 8 | (k[26] & 255) << 16 | (k[27] & 255) << 24, j14 = k[28] & 255 | (k[29] & 255) << 8 | (k[30] & 255) << 16 | (k[31] & 255) << 24, j15 = c[12] & 255 | (c[13] & 255) << 8 | (c[14] & 255) << 16 | (c[15] & 255) << 24;
        var x0 = j0, x1 = j1, x2 = j2, x3 = j3, x4 = j4, x5 = j5, x6 = j6, x7 = j7, x8 = j8, x9 = j9, x10 = j10, x11 = j11, x12 = j12, x13 = j13, x14 = j14, x15 = j15, u;
        for (var i = 0; i < 20; i += 2) {
          u = x0 + x12 | 0;
          x4 ^= u << 7 | u >>> 32 - 7;
          u = x4 + x0 | 0;
          x8 ^= u << 9 | u >>> 32 - 9;
          u = x8 + x4 | 0;
          x12 ^= u << 13 | u >>> 32 - 13;
          u = x12 + x8 | 0;
          x0 ^= u << 18 | u >>> 32 - 18;
          u = x5 + x1 | 0;
          x9 ^= u << 7 | u >>> 32 - 7;
          u = x9 + x5 | 0;
          x13 ^= u << 9 | u >>> 32 - 9;
          u = x13 + x9 | 0;
          x1 ^= u << 13 | u >>> 32 - 13;
          u = x1 + x13 | 0;
          x5 ^= u << 18 | u >>> 32 - 18;
          u = x10 + x6 | 0;
          x14 ^= u << 7 | u >>> 32 - 7;
          u = x14 + x10 | 0;
          x2 ^= u << 9 | u >>> 32 - 9;
          u = x2 + x14 | 0;
          x6 ^= u << 13 | u >>> 32 - 13;
          u = x6 + x2 | 0;
          x10 ^= u << 18 | u >>> 32 - 18;
          u = x15 + x11 | 0;
          x3 ^= u << 7 | u >>> 32 - 7;
          u = x3 + x15 | 0;
          x7 ^= u << 9 | u >>> 32 - 9;
          u = x7 + x3 | 0;
          x11 ^= u << 13 | u >>> 32 - 13;
          u = x11 + x7 | 0;
          x15 ^= u << 18 | u >>> 32 - 18;
          u = x0 + x3 | 0;
          x1 ^= u << 7 | u >>> 32 - 7;
          u = x1 + x0 | 0;
          x2 ^= u << 9 | u >>> 32 - 9;
          u = x2 + x1 | 0;
          x3 ^= u << 13 | u >>> 32 - 13;
          u = x3 + x2 | 0;
          x0 ^= u << 18 | u >>> 32 - 18;
          u = x5 + x4 | 0;
          x6 ^= u << 7 | u >>> 32 - 7;
          u = x6 + x5 | 0;
          x7 ^= u << 9 | u >>> 32 - 9;
          u = x7 + x6 | 0;
          x4 ^= u << 13 | u >>> 32 - 13;
          u = x4 + x7 | 0;
          x5 ^= u << 18 | u >>> 32 - 18;
          u = x10 + x9 | 0;
          x11 ^= u << 7 | u >>> 32 - 7;
          u = x11 + x10 | 0;
          x8 ^= u << 9 | u >>> 32 - 9;
          u = x8 + x11 | 0;
          x9 ^= u << 13 | u >>> 32 - 13;
          u = x9 + x8 | 0;
          x10 ^= u << 18 | u >>> 32 - 18;
          u = x15 + x14 | 0;
          x12 ^= u << 7 | u >>> 32 - 7;
          u = x12 + x15 | 0;
          x13 ^= u << 9 | u >>> 32 - 9;
          u = x13 + x12 | 0;
          x14 ^= u << 13 | u >>> 32 - 13;
          u = x14 + x13 | 0;
          x15 ^= u << 18 | u >>> 32 - 18;
        }
        x0 = x0 + j0 | 0;
        x1 = x1 + j1 | 0;
        x2 = x2 + j2 | 0;
        x3 = x3 + j3 | 0;
        x4 = x4 + j4 | 0;
        x5 = x5 + j5 | 0;
        x6 = x6 + j6 | 0;
        x7 = x7 + j7 | 0;
        x8 = x8 + j8 | 0;
        x9 = x9 + j9 | 0;
        x10 = x10 + j10 | 0;
        x11 = x11 + j11 | 0;
        x12 = x12 + j12 | 0;
        x13 = x13 + j13 | 0;
        x14 = x14 + j14 | 0;
        x15 = x15 + j15 | 0;
        o[0] = x0 >>> 0 & 255;
        o[1] = x0 >>> 8 & 255;
        o[2] = x0 >>> 16 & 255;
        o[3] = x0 >>> 24 & 255;
        o[4] = x1 >>> 0 & 255;
        o[5] = x1 >>> 8 & 255;
        o[6] = x1 >>> 16 & 255;
        o[7] = x1 >>> 24 & 255;
        o[8] = x2 >>> 0 & 255;
        o[9] = x2 >>> 8 & 255;
        o[10] = x2 >>> 16 & 255;
        o[11] = x2 >>> 24 & 255;
        o[12] = x3 >>> 0 & 255;
        o[13] = x3 >>> 8 & 255;
        o[14] = x3 >>> 16 & 255;
        o[15] = x3 >>> 24 & 255;
        o[16] = x4 >>> 0 & 255;
        o[17] = x4 >>> 8 & 255;
        o[18] = x4 >>> 16 & 255;
        o[19] = x4 >>> 24 & 255;
        o[20] = x5 >>> 0 & 255;
        o[21] = x5 >>> 8 & 255;
        o[22] = x5 >>> 16 & 255;
        o[23] = x5 >>> 24 & 255;
        o[24] = x6 >>> 0 & 255;
        o[25] = x6 >>> 8 & 255;
        o[26] = x6 >>> 16 & 255;
        o[27] = x6 >>> 24 & 255;
        o[28] = x7 >>> 0 & 255;
        o[29] = x7 >>> 8 & 255;
        o[30] = x7 >>> 16 & 255;
        o[31] = x7 >>> 24 & 255;
        o[32] = x8 >>> 0 & 255;
        o[33] = x8 >>> 8 & 255;
        o[34] = x8 >>> 16 & 255;
        o[35] = x8 >>> 24 & 255;
        o[36] = x9 >>> 0 & 255;
        o[37] = x9 >>> 8 & 255;
        o[38] = x9 >>> 16 & 255;
        o[39] = x9 >>> 24 & 255;
        o[40] = x10 >>> 0 & 255;
        o[41] = x10 >>> 8 & 255;
        o[42] = x10 >>> 16 & 255;
        o[43] = x10 >>> 24 & 255;
        o[44] = x11 >>> 0 & 255;
        o[45] = x11 >>> 8 & 255;
        o[46] = x11 >>> 16 & 255;
        o[47] = x11 >>> 24 & 255;
        o[48] = x12 >>> 0 & 255;
        o[49] = x12 >>> 8 & 255;
        o[50] = x12 >>> 16 & 255;
        o[51] = x12 >>> 24 & 255;
        o[52] = x13 >>> 0 & 255;
        o[53] = x13 >>> 8 & 255;
        o[54] = x13 >>> 16 & 255;
        o[55] = x13 >>> 24 & 255;
        o[56] = x14 >>> 0 & 255;
        o[57] = x14 >>> 8 & 255;
        o[58] = x14 >>> 16 & 255;
        o[59] = x14 >>> 24 & 255;
        o[60] = x15 >>> 0 & 255;
        o[61] = x15 >>> 8 & 255;
        o[62] = x15 >>> 16 & 255;
        o[63] = x15 >>> 24 & 255;
      }
      function core_hsalsa20(o, p, k, c) {
        var j0 = c[0] & 255 | (c[1] & 255) << 8 | (c[2] & 255) << 16 | (c[3] & 255) << 24, j1 = k[0] & 255 | (k[1] & 255) << 8 | (k[2] & 255) << 16 | (k[3] & 255) << 24, j2 = k[4] & 255 | (k[5] & 255) << 8 | (k[6] & 255) << 16 | (k[7] & 255) << 24, j3 = k[8] & 255 | (k[9] & 255) << 8 | (k[10] & 255) << 16 | (k[11] & 255) << 24, j4 = k[12] & 255 | (k[13] & 255) << 8 | (k[14] & 255) << 16 | (k[15] & 255) << 24, j5 = c[4] & 255 | (c[5] & 255) << 8 | (c[6] & 255) << 16 | (c[7] & 255) << 24, j6 = p[0] & 255 | (p[1] & 255) << 8 | (p[2] & 255) << 16 | (p[3] & 255) << 24, j7 = p[4] & 255 | (p[5] & 255) << 8 | (p[6] & 255) << 16 | (p[7] & 255) << 24, j8 = p[8] & 255 | (p[9] & 255) << 8 | (p[10] & 255) << 16 | (p[11] & 255) << 24, j9 = p[12] & 255 | (p[13] & 255) << 8 | (p[14] & 255) << 16 | (p[15] & 255) << 24, j10 = c[8] & 255 | (c[9] & 255) << 8 | (c[10] & 255) << 16 | (c[11] & 255) << 24, j11 = k[16] & 255 | (k[17] & 255) << 8 | (k[18] & 255) << 16 | (k[19] & 255) << 24, j12 = k[20] & 255 | (k[21] & 255) << 8 | (k[22] & 255) << 16 | (k[23] & 255) << 24, j13 = k[24] & 255 | (k[25] & 255) << 8 | (k[26] & 255) << 16 | (k[27] & 255) << 24, j14 = k[28] & 255 | (k[29] & 255) << 8 | (k[30] & 255) << 16 | (k[31] & 255) << 24, j15 = c[12] & 255 | (c[13] & 255) << 8 | (c[14] & 255) << 16 | (c[15] & 255) << 24;
        var x0 = j0, x1 = j1, x2 = j2, x3 = j3, x4 = j4, x5 = j5, x6 = j6, x7 = j7, x8 = j8, x9 = j9, x10 = j10, x11 = j11, x12 = j12, x13 = j13, x14 = j14, x15 = j15, u;
        for (var i = 0; i < 20; i += 2) {
          u = x0 + x12 | 0;
          x4 ^= u << 7 | u >>> 32 - 7;
          u = x4 + x0 | 0;
          x8 ^= u << 9 | u >>> 32 - 9;
          u = x8 + x4 | 0;
          x12 ^= u << 13 | u >>> 32 - 13;
          u = x12 + x8 | 0;
          x0 ^= u << 18 | u >>> 32 - 18;
          u = x5 + x1 | 0;
          x9 ^= u << 7 | u >>> 32 - 7;
          u = x9 + x5 | 0;
          x13 ^= u << 9 | u >>> 32 - 9;
          u = x13 + x9 | 0;
          x1 ^= u << 13 | u >>> 32 - 13;
          u = x1 + x13 | 0;
          x5 ^= u << 18 | u >>> 32 - 18;
          u = x10 + x6 | 0;
          x14 ^= u << 7 | u >>> 32 - 7;
          u = x14 + x10 | 0;
          x2 ^= u << 9 | u >>> 32 - 9;
          u = x2 + x14 | 0;
          x6 ^= u << 13 | u >>> 32 - 13;
          u = x6 + x2 | 0;
          x10 ^= u << 18 | u >>> 32 - 18;
          u = x15 + x11 | 0;
          x3 ^= u << 7 | u >>> 32 - 7;
          u = x3 + x15 | 0;
          x7 ^= u << 9 | u >>> 32 - 9;
          u = x7 + x3 | 0;
          x11 ^= u << 13 | u >>> 32 - 13;
          u = x11 + x7 | 0;
          x15 ^= u << 18 | u >>> 32 - 18;
          u = x0 + x3 | 0;
          x1 ^= u << 7 | u >>> 32 - 7;
          u = x1 + x0 | 0;
          x2 ^= u << 9 | u >>> 32 - 9;
          u = x2 + x1 | 0;
          x3 ^= u << 13 | u >>> 32 - 13;
          u = x3 + x2 | 0;
          x0 ^= u << 18 | u >>> 32 - 18;
          u = x5 + x4 | 0;
          x6 ^= u << 7 | u >>> 32 - 7;
          u = x6 + x5 | 0;
          x7 ^= u << 9 | u >>> 32 - 9;
          u = x7 + x6 | 0;
          x4 ^= u << 13 | u >>> 32 - 13;
          u = x4 + x7 | 0;
          x5 ^= u << 18 | u >>> 32 - 18;
          u = x10 + x9 | 0;
          x11 ^= u << 7 | u >>> 32 - 7;
          u = x11 + x10 | 0;
          x8 ^= u << 9 | u >>> 32 - 9;
          u = x8 + x11 | 0;
          x9 ^= u << 13 | u >>> 32 - 13;
          u = x9 + x8 | 0;
          x10 ^= u << 18 | u >>> 32 - 18;
          u = x15 + x14 | 0;
          x12 ^= u << 7 | u >>> 32 - 7;
          u = x12 + x15 | 0;
          x13 ^= u << 9 | u >>> 32 - 9;
          u = x13 + x12 | 0;
          x14 ^= u << 13 | u >>> 32 - 13;
          u = x14 + x13 | 0;
          x15 ^= u << 18 | u >>> 32 - 18;
        }
        o[0] = x0 >>> 0 & 255;
        o[1] = x0 >>> 8 & 255;
        o[2] = x0 >>> 16 & 255;
        o[3] = x0 >>> 24 & 255;
        o[4] = x5 >>> 0 & 255;
        o[5] = x5 >>> 8 & 255;
        o[6] = x5 >>> 16 & 255;
        o[7] = x5 >>> 24 & 255;
        o[8] = x10 >>> 0 & 255;
        o[9] = x10 >>> 8 & 255;
        o[10] = x10 >>> 16 & 255;
        o[11] = x10 >>> 24 & 255;
        o[12] = x15 >>> 0 & 255;
        o[13] = x15 >>> 8 & 255;
        o[14] = x15 >>> 16 & 255;
        o[15] = x15 >>> 24 & 255;
        o[16] = x6 >>> 0 & 255;
        o[17] = x6 >>> 8 & 255;
        o[18] = x6 >>> 16 & 255;
        o[19] = x6 >>> 24 & 255;
        o[20] = x7 >>> 0 & 255;
        o[21] = x7 >>> 8 & 255;
        o[22] = x7 >>> 16 & 255;
        o[23] = x7 >>> 24 & 255;
        o[24] = x8 >>> 0 & 255;
        o[25] = x8 >>> 8 & 255;
        o[26] = x8 >>> 16 & 255;
        o[27] = x8 >>> 24 & 255;
        o[28] = x9 >>> 0 & 255;
        o[29] = x9 >>> 8 & 255;
        o[30] = x9 >>> 16 & 255;
        o[31] = x9 >>> 24 & 255;
      }
      function crypto_core_salsa20(out, inp, k, c) {
        core_salsa20(out, inp, k, c);
      }
      function crypto_core_hsalsa20(out, inp, k, c) {
        core_hsalsa20(out, inp, k, c);
      }
      var sigma = new Uint8Array([101, 120, 112, 97, 110, 100, 32, 51, 50, 45, 98, 121, 116, 101, 32, 107]);
      function crypto_stream_salsa20_xor(c, cpos, m, mpos, b, n, k) {
        var z = new Uint8Array(16), x = new Uint8Array(64);
        var u, i;
        for (i = 0; i < 16; i++)
          z[i] = 0;
        for (i = 0; i < 8; i++)
          z[i] = n[i];
        while (b >= 64) {
          crypto_core_salsa20(x, z, k, sigma);
          for (i = 0; i < 64; i++)
            c[cpos + i] = m[mpos + i] ^ x[i];
          u = 1;
          for (i = 8; i < 16; i++) {
            u = u + (z[i] & 255) | 0;
            z[i] = u & 255;
            u >>>= 8;
          }
          b -= 64;
          cpos += 64;
          mpos += 64;
        }
        if (b > 0) {
          crypto_core_salsa20(x, z, k, sigma);
          for (i = 0; i < b; i++)
            c[cpos + i] = m[mpos + i] ^ x[i];
        }
        return 0;
      }
      function crypto_stream_salsa20(c, cpos, b, n, k) {
        var z = new Uint8Array(16), x = new Uint8Array(64);
        var u, i;
        for (i = 0; i < 16; i++)
          z[i] = 0;
        for (i = 0; i < 8; i++)
          z[i] = n[i];
        while (b >= 64) {
          crypto_core_salsa20(x, z, k, sigma);
          for (i = 0; i < 64; i++)
            c[cpos + i] = x[i];
          u = 1;
          for (i = 8; i < 16; i++) {
            u = u + (z[i] & 255) | 0;
            z[i] = u & 255;
            u >>>= 8;
          }
          b -= 64;
          cpos += 64;
        }
        if (b > 0) {
          crypto_core_salsa20(x, z, k, sigma);
          for (i = 0; i < b; i++)
            c[cpos + i] = x[i];
        }
        return 0;
      }
      function crypto_stream(c, cpos, d, n, k) {
        var s = new Uint8Array(32);
        crypto_core_hsalsa20(s, n, k, sigma);
        var sn = new Uint8Array(8);
        for (var i = 0; i < 8; i++)
          sn[i] = n[i + 16];
        return crypto_stream_salsa20(c, cpos, d, sn, s);
      }
      function crypto_stream_xor(c, cpos, m, mpos, d, n, k) {
        var s = new Uint8Array(32);
        crypto_core_hsalsa20(s, n, k, sigma);
        var sn = new Uint8Array(8);
        for (var i = 0; i < 8; i++)
          sn[i] = n[i + 16];
        return crypto_stream_salsa20_xor(c, cpos, m, mpos, d, sn, s);
      }
      var poly1305 = function(key) {
        this.buffer = new Uint8Array(16);
        this.r = new Uint16Array(10);
        this.h = new Uint16Array(10);
        this.pad = new Uint16Array(8);
        this.leftover = 0;
        this.fin = 0;
        var t0, t1, t2, t3, t4, t5, t6, t7;
        t0 = key[0] & 255 | (key[1] & 255) << 8;
        this.r[0] = t0 & 8191;
        t1 = key[2] & 255 | (key[3] & 255) << 8;
        this.r[1] = (t0 >>> 13 | t1 << 3) & 8191;
        t2 = key[4] & 255 | (key[5] & 255) << 8;
        this.r[2] = (t1 >>> 10 | t2 << 6) & 7939;
        t3 = key[6] & 255 | (key[7] & 255) << 8;
        this.r[3] = (t2 >>> 7 | t3 << 9) & 8191;
        t4 = key[8] & 255 | (key[9] & 255) << 8;
        this.r[4] = (t3 >>> 4 | t4 << 12) & 255;
        this.r[5] = t4 >>> 1 & 8190;
        t5 = key[10] & 255 | (key[11] & 255) << 8;
        this.r[6] = (t4 >>> 14 | t5 << 2) & 8191;
        t6 = key[12] & 255 | (key[13] & 255) << 8;
        this.r[7] = (t5 >>> 11 | t6 << 5) & 8065;
        t7 = key[14] & 255 | (key[15] & 255) << 8;
        this.r[8] = (t6 >>> 8 | t7 << 8) & 8191;
        this.r[9] = t7 >>> 5 & 127;
        this.pad[0] = key[16] & 255 | (key[17] & 255) << 8;
        this.pad[1] = key[18] & 255 | (key[19] & 255) << 8;
        this.pad[2] = key[20] & 255 | (key[21] & 255) << 8;
        this.pad[3] = key[22] & 255 | (key[23] & 255) << 8;
        this.pad[4] = key[24] & 255 | (key[25] & 255) << 8;
        this.pad[5] = key[26] & 255 | (key[27] & 255) << 8;
        this.pad[6] = key[28] & 255 | (key[29] & 255) << 8;
        this.pad[7] = key[30] & 255 | (key[31] & 255) << 8;
      };
      poly1305.prototype.blocks = function(m, mpos, bytes) {
        var hibit = this.fin ? 0 : 1 << 11;
        var t0, t1, t2, t3, t4, t5, t6, t7, c;
        var d0, d1, d2, d3, d4, d5, d6, d7, d8, d9;
        var h0 = this.h[0], h1 = this.h[1], h2 = this.h[2], h3 = this.h[3], h4 = this.h[4], h5 = this.h[5], h6 = this.h[6], h7 = this.h[7], h8 = this.h[8], h9 = this.h[9];
        var r0 = this.r[0], r1 = this.r[1], r2 = this.r[2], r3 = this.r[3], r4 = this.r[4], r5 = this.r[5], r6 = this.r[6], r7 = this.r[7], r8 = this.r[8], r9 = this.r[9];
        while (bytes >= 16) {
          t0 = m[mpos + 0] & 255 | (m[mpos + 1] & 255) << 8;
          h0 += t0 & 8191;
          t1 = m[mpos + 2] & 255 | (m[mpos + 3] & 255) << 8;
          h1 += (t0 >>> 13 | t1 << 3) & 8191;
          t2 = m[mpos + 4] & 255 | (m[mpos + 5] & 255) << 8;
          h2 += (t1 >>> 10 | t2 << 6) & 8191;
          t3 = m[mpos + 6] & 255 | (m[mpos + 7] & 255) << 8;
          h3 += (t2 >>> 7 | t3 << 9) & 8191;
          t4 = m[mpos + 8] & 255 | (m[mpos + 9] & 255) << 8;
          h4 += (t3 >>> 4 | t4 << 12) & 8191;
          h5 += t4 >>> 1 & 8191;
          t5 = m[mpos + 10] & 255 | (m[mpos + 11] & 255) << 8;
          h6 += (t4 >>> 14 | t5 << 2) & 8191;
          t6 = m[mpos + 12] & 255 | (m[mpos + 13] & 255) << 8;
          h7 += (t5 >>> 11 | t6 << 5) & 8191;
          t7 = m[mpos + 14] & 255 | (m[mpos + 15] & 255) << 8;
          h8 += (t6 >>> 8 | t7 << 8) & 8191;
          h9 += t7 >>> 5 | hibit;
          c = 0;
          d0 = c;
          d0 += h0 * r0;
          d0 += h1 * (5 * r9);
          d0 += h2 * (5 * r8);
          d0 += h3 * (5 * r7);
          d0 += h4 * (5 * r6);
          c = d0 >>> 13;
          d0 &= 8191;
          d0 += h5 * (5 * r5);
          d0 += h6 * (5 * r4);
          d0 += h7 * (5 * r3);
          d0 += h8 * (5 * r2);
          d0 += h9 * (5 * r1);
          c += d0 >>> 13;
          d0 &= 8191;
          d1 = c;
          d1 += h0 * r1;
          d1 += h1 * r0;
          d1 += h2 * (5 * r9);
          d1 += h3 * (5 * r8);
          d1 += h4 * (5 * r7);
          c = d1 >>> 13;
          d1 &= 8191;
          d1 += h5 * (5 * r6);
          d1 += h6 * (5 * r5);
          d1 += h7 * (5 * r4);
          d1 += h8 * (5 * r3);
          d1 += h9 * (5 * r2);
          c += d1 >>> 13;
          d1 &= 8191;
          d2 = c;
          d2 += h0 * r2;
          d2 += h1 * r1;
          d2 += h2 * r0;
          d2 += h3 * (5 * r9);
          d2 += h4 * (5 * r8);
          c = d2 >>> 13;
          d2 &= 8191;
          d2 += h5 * (5 * r7);
          d2 += h6 * (5 * r6);
          d2 += h7 * (5 * r5);
          d2 += h8 * (5 * r4);
          d2 += h9 * (5 * r3);
          c += d2 >>> 13;
          d2 &= 8191;
          d3 = c;
          d3 += h0 * r3;
          d3 += h1 * r2;
          d3 += h2 * r1;
          d3 += h3 * r0;
          d3 += h4 * (5 * r9);
          c = d3 >>> 13;
          d3 &= 8191;
          d3 += h5 * (5 * r8);
          d3 += h6 * (5 * r7);
          d3 += h7 * (5 * r6);
          d3 += h8 * (5 * r5);
          d3 += h9 * (5 * r4);
          c += d3 >>> 13;
          d3 &= 8191;
          d4 = c;
          d4 += h0 * r4;
          d4 += h1 * r3;
          d4 += h2 * r2;
          d4 += h3 * r1;
          d4 += h4 * r0;
          c = d4 >>> 13;
          d4 &= 8191;
          d4 += h5 * (5 * r9);
          d4 += h6 * (5 * r8);
          d4 += h7 * (5 * r7);
          d4 += h8 * (5 * r6);
          d4 += h9 * (5 * r5);
          c += d4 >>> 13;
          d4 &= 8191;
          d5 = c;
          d5 += h0 * r5;
          d5 += h1 * r4;
          d5 += h2 * r3;
          d5 += h3 * r2;
          d5 += h4 * r1;
          c = d5 >>> 13;
          d5 &= 8191;
          d5 += h5 * r0;
          d5 += h6 * (5 * r9);
          d5 += h7 * (5 * r8);
          d5 += h8 * (5 * r7);
          d5 += h9 * (5 * r6);
          c += d5 >>> 13;
          d5 &= 8191;
          d6 = c;
          d6 += h0 * r6;
          d6 += h1 * r5;
          d6 += h2 * r4;
          d6 += h3 * r3;
          d6 += h4 * r2;
          c = d6 >>> 13;
          d6 &= 8191;
          d6 += h5 * r1;
          d6 += h6 * r0;
          d6 += h7 * (5 * r9);
          d6 += h8 * (5 * r8);
          d6 += h9 * (5 * r7);
          c += d6 >>> 13;
          d6 &= 8191;
          d7 = c;
          d7 += h0 * r7;
          d7 += h1 * r6;
          d7 += h2 * r5;
          d7 += h3 * r4;
          d7 += h4 * r3;
          c = d7 >>> 13;
          d7 &= 8191;
          d7 += h5 * r2;
          d7 += h6 * r1;
          d7 += h7 * r0;
          d7 += h8 * (5 * r9);
          d7 += h9 * (5 * r8);
          c += d7 >>> 13;
          d7 &= 8191;
          d8 = c;
          d8 += h0 * r8;
          d8 += h1 * r7;
          d8 += h2 * r6;
          d8 += h3 * r5;
          d8 += h4 * r4;
          c = d8 >>> 13;
          d8 &= 8191;
          d8 += h5 * r3;
          d8 += h6 * r2;
          d8 += h7 * r1;
          d8 += h8 * r0;
          d8 += h9 * (5 * r9);
          c += d8 >>> 13;
          d8 &= 8191;
          d9 = c;
          d9 += h0 * r9;
          d9 += h1 * r8;
          d9 += h2 * r7;
          d9 += h3 * r6;
          d9 += h4 * r5;
          c = d9 >>> 13;
          d9 &= 8191;
          d9 += h5 * r4;
          d9 += h6 * r3;
          d9 += h7 * r2;
          d9 += h8 * r1;
          d9 += h9 * r0;
          c += d9 >>> 13;
          d9 &= 8191;
          c = (c << 2) + c | 0;
          c = c + d0 | 0;
          d0 = c & 8191;
          c = c >>> 13;
          d1 += c;
          h0 = d0;
          h1 = d1;
          h2 = d2;
          h3 = d3;
          h4 = d4;
          h5 = d5;
          h6 = d6;
          h7 = d7;
          h8 = d8;
          h9 = d9;
          mpos += 16;
          bytes -= 16;
        }
        this.h[0] = h0;
        this.h[1] = h1;
        this.h[2] = h2;
        this.h[3] = h3;
        this.h[4] = h4;
        this.h[5] = h5;
        this.h[6] = h6;
        this.h[7] = h7;
        this.h[8] = h8;
        this.h[9] = h9;
      };
      poly1305.prototype.finish = function(mac, macpos) {
        var g = new Uint16Array(10);
        var c, mask, f, i;
        if (this.leftover) {
          i = this.leftover;
          this.buffer[i++] = 1;
          for (; i < 16; i++)
            this.buffer[i] = 0;
          this.fin = 1;
          this.blocks(this.buffer, 0, 16);
        }
        c = this.h[1] >>> 13;
        this.h[1] &= 8191;
        for (i = 2; i < 10; i++) {
          this.h[i] += c;
          c = this.h[i] >>> 13;
          this.h[i] &= 8191;
        }
        this.h[0] += c * 5;
        c = this.h[0] >>> 13;
        this.h[0] &= 8191;
        this.h[1] += c;
        c = this.h[1] >>> 13;
        this.h[1] &= 8191;
        this.h[2] += c;
        g[0] = this.h[0] + 5;
        c = g[0] >>> 13;
        g[0] &= 8191;
        for (i = 1; i < 10; i++) {
          g[i] = this.h[i] + c;
          c = g[i] >>> 13;
          g[i] &= 8191;
        }
        g[9] -= 1 << 13;
        mask = (c ^ 1) - 1;
        for (i = 0; i < 10; i++)
          g[i] &= mask;
        mask = ~mask;
        for (i = 0; i < 10; i++)
          this.h[i] = this.h[i] & mask | g[i];
        this.h[0] = (this.h[0] | this.h[1] << 13) & 65535;
        this.h[1] = (this.h[1] >>> 3 | this.h[2] << 10) & 65535;
        this.h[2] = (this.h[2] >>> 6 | this.h[3] << 7) & 65535;
        this.h[3] = (this.h[3] >>> 9 | this.h[4] << 4) & 65535;
        this.h[4] = (this.h[4] >>> 12 | this.h[5] << 1 | this.h[6] << 14) & 65535;
        this.h[5] = (this.h[6] >>> 2 | this.h[7] << 11) & 65535;
        this.h[6] = (this.h[7] >>> 5 | this.h[8] << 8) & 65535;
        this.h[7] = (this.h[8] >>> 8 | this.h[9] << 5) & 65535;
        f = this.h[0] + this.pad[0];
        this.h[0] = f & 65535;
        for (i = 1; i < 8; i++) {
          f = (this.h[i] + this.pad[i] | 0) + (f >>> 16) | 0;
          this.h[i] = f & 65535;
        }
        mac[macpos + 0] = this.h[0] >>> 0 & 255;
        mac[macpos + 1] = this.h[0] >>> 8 & 255;
        mac[macpos + 2] = this.h[1] >>> 0 & 255;
        mac[macpos + 3] = this.h[1] >>> 8 & 255;
        mac[macpos + 4] = this.h[2] >>> 0 & 255;
        mac[macpos + 5] = this.h[2] >>> 8 & 255;
        mac[macpos + 6] = this.h[3] >>> 0 & 255;
        mac[macpos + 7] = this.h[3] >>> 8 & 255;
        mac[macpos + 8] = this.h[4] >>> 0 & 255;
        mac[macpos + 9] = this.h[4] >>> 8 & 255;
        mac[macpos + 10] = this.h[5] >>> 0 & 255;
        mac[macpos + 11] = this.h[5] >>> 8 & 255;
        mac[macpos + 12] = this.h[6] >>> 0 & 255;
        mac[macpos + 13] = this.h[6] >>> 8 & 255;
        mac[macpos + 14] = this.h[7] >>> 0 & 255;
        mac[macpos + 15] = this.h[7] >>> 8 & 255;
      };
      poly1305.prototype.update = function(m, mpos, bytes) {
        var i, want;
        if (this.leftover) {
          want = 16 - this.leftover;
          if (want > bytes)
            want = bytes;
          for (i = 0; i < want; i++)
            this.buffer[this.leftover + i] = m[mpos + i];
          bytes -= want;
          mpos += want;
          this.leftover += want;
          if (this.leftover < 16)
            return;
          this.blocks(this.buffer, 0, 16);
          this.leftover = 0;
        }
        if (bytes >= 16) {
          want = bytes - bytes % 16;
          this.blocks(m, mpos, want);
          mpos += want;
          bytes -= want;
        }
        if (bytes) {
          for (i = 0; i < bytes; i++)
            this.buffer[this.leftover + i] = m[mpos + i];
          this.leftover += bytes;
        }
      };
      function crypto_onetimeauth(out, outpos, m, mpos, n, k) {
        var s = new poly1305(k);
        s.update(m, mpos, n);
        s.finish(out, outpos);
        return 0;
      }
      function crypto_onetimeauth_verify(h, hpos, m, mpos, n, k) {
        var x = new Uint8Array(16);
        crypto_onetimeauth(x, 0, m, mpos, n, k);
        return crypto_verify_16(h, hpos, x, 0);
      }
      function crypto_secretbox(c, m, d, n, k) {
        var i;
        if (d < 32)
          return -1;
        crypto_stream_xor(c, 0, m, 0, d, n, k);
        crypto_onetimeauth(c, 16, c, 32, d - 32, c);
        for (i = 0; i < 16; i++)
          c[i] = 0;
        return 0;
      }
      function crypto_secretbox_open(m, c, d, n, k) {
        var i;
        var x = new Uint8Array(32);
        if (d < 32)
          return -1;
        crypto_stream(x, 0, 32, n, k);
        if (crypto_onetimeauth_verify(c, 16, c, 32, d - 32, x) !== 0)
          return -1;
        crypto_stream_xor(m, 0, c, 0, d, n, k);
        for (i = 0; i < 32; i++)
          m[i] = 0;
        return 0;
      }
      function set25519(r, a) {
        var i;
        for (i = 0; i < 16; i++)
          r[i] = a[i] | 0;
      }
      function car25519(o) {
        var i, v, c = 1;
        for (i = 0; i < 16; i++) {
          v = o[i] + c + 65535;
          c = Math.floor(v / 65536);
          o[i] = v - c * 65536;
        }
        o[0] += c - 1 + 37 * (c - 1);
      }
      function sel25519(p, q, b) {
        var t, c = ~(b - 1);
        for (var i = 0; i < 16; i++) {
          t = c & (p[i] ^ q[i]);
          p[i] ^= t;
          q[i] ^= t;
        }
      }
      function pack25519(o, n) {
        var i, j, b;
        var m = gf(), t = gf();
        for (i = 0; i < 16; i++)
          t[i] = n[i];
        car25519(t);
        car25519(t);
        car25519(t);
        for (j = 0; j < 2; j++) {
          m[0] = t[0] - 65517;
          for (i = 1; i < 15; i++) {
            m[i] = t[i] - 65535 - (m[i - 1] >> 16 & 1);
            m[i - 1] &= 65535;
          }
          m[15] = t[15] - 32767 - (m[14] >> 16 & 1);
          b = m[15] >> 16 & 1;
          m[14] &= 65535;
          sel25519(t, m, 1 - b);
        }
        for (i = 0; i < 16; i++) {
          o[2 * i] = t[i] & 255;
          o[2 * i + 1] = t[i] >> 8;
        }
      }
      function neq25519(a, b) {
        var c = new Uint8Array(32), d = new Uint8Array(32);
        pack25519(c, a);
        pack25519(d, b);
        return crypto_verify_32(c, 0, d, 0);
      }
      function par25519(a) {
        var d = new Uint8Array(32);
        pack25519(d, a);
        return d[0] & 1;
      }
      function unpack25519(o, n) {
        var i;
        for (i = 0; i < 16; i++)
          o[i] = n[2 * i] + (n[2 * i + 1] << 8);
        o[15] &= 32767;
      }
      function A(o, a, b) {
        for (var i = 0; i < 16; i++)
          o[i] = a[i] + b[i];
      }
      function Z(o, a, b) {
        for (var i = 0; i < 16; i++)
          o[i] = a[i] - b[i];
      }
      function M(o, a, b) {
        var v, c, t0 = 0, t1 = 0, t2 = 0, t3 = 0, t4 = 0, t5 = 0, t6 = 0, t7 = 0, t8 = 0, t9 = 0, t10 = 0, t11 = 0, t12 = 0, t13 = 0, t14 = 0, t15 = 0, t16 = 0, t17 = 0, t18 = 0, t19 = 0, t20 = 0, t21 = 0, t22 = 0, t23 = 0, t24 = 0, t25 = 0, t26 = 0, t27 = 0, t28 = 0, t29 = 0, t30 = 0, b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7], b8 = b[8], b9 = b[9], b10 = b[10], b11 = b[11], b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];
        v = a[0];
        t0 += v * b0;
        t1 += v * b1;
        t2 += v * b2;
        t3 += v * b3;
        t4 += v * b4;
        t5 += v * b5;
        t6 += v * b6;
        t7 += v * b7;
        t8 += v * b8;
        t9 += v * b9;
        t10 += v * b10;
        t11 += v * b11;
        t12 += v * b12;
        t13 += v * b13;
        t14 += v * b14;
        t15 += v * b15;
        v = a[1];
        t1 += v * b0;
        t2 += v * b1;
        t3 += v * b2;
        t4 += v * b3;
        t5 += v * b4;
        t6 += v * b5;
        t7 += v * b6;
        t8 += v * b7;
        t9 += v * b8;
        t10 += v * b9;
        t11 += v * b10;
        t12 += v * b11;
        t13 += v * b12;
        t14 += v * b13;
        t15 += v * b14;
        t16 += v * b15;
        v = a[2];
        t2 += v * b0;
        t3 += v * b1;
        t4 += v * b2;
        t5 += v * b3;
        t6 += v * b4;
        t7 += v * b5;
        t8 += v * b6;
        t9 += v * b7;
        t10 += v * b8;
        t11 += v * b9;
        t12 += v * b10;
        t13 += v * b11;
        t14 += v * b12;
        t15 += v * b13;
        t16 += v * b14;
        t17 += v * b15;
        v = a[3];
        t3 += v * b0;
        t4 += v * b1;
        t5 += v * b2;
        t6 += v * b3;
        t7 += v * b4;
        t8 += v * b5;
        t9 += v * b6;
        t10 += v * b7;
        t11 += v * b8;
        t12 += v * b9;
        t13 += v * b10;
        t14 += v * b11;
        t15 += v * b12;
        t16 += v * b13;
        t17 += v * b14;
        t18 += v * b15;
        v = a[4];
        t4 += v * b0;
        t5 += v * b1;
        t6 += v * b2;
        t7 += v * b3;
        t8 += v * b4;
        t9 += v * b5;
        t10 += v * b6;
        t11 += v * b7;
        t12 += v * b8;
        t13 += v * b9;
        t14 += v * b10;
        t15 += v * b11;
        t16 += v * b12;
        t17 += v * b13;
        t18 += v * b14;
        t19 += v * b15;
        v = a[5];
        t5 += v * b0;
        t6 += v * b1;
        t7 += v * b2;
        t8 += v * b3;
        t9 += v * b4;
        t10 += v * b5;
        t11 += v * b6;
        t12 += v * b7;
        t13 += v * b8;
        t14 += v * b9;
        t15 += v * b10;
        t16 += v * b11;
        t17 += v * b12;
        t18 += v * b13;
        t19 += v * b14;
        t20 += v * b15;
        v = a[6];
        t6 += v * b0;
        t7 += v * b1;
        t8 += v * b2;
        t9 += v * b3;
        t10 += v * b4;
        t11 += v * b5;
        t12 += v * b6;
        t13 += v * b7;
        t14 += v * b8;
        t15 += v * b9;
        t16 += v * b10;
        t17 += v * b11;
        t18 += v * b12;
        t19 += v * b13;
        t20 += v * b14;
        t21 += v * b15;
        v = a[7];
        t7 += v * b0;
        t8 += v * b1;
        t9 += v * b2;
        t10 += v * b3;
        t11 += v * b4;
        t12 += v * b5;
        t13 += v * b6;
        t14 += v * b7;
        t15 += v * b8;
        t16 += v * b9;
        t17 += v * b10;
        t18 += v * b11;
        t19 += v * b12;
        t20 += v * b13;
        t21 += v * b14;
        t22 += v * b15;
        v = a[8];
        t8 += v * b0;
        t9 += v * b1;
        t10 += v * b2;
        t11 += v * b3;
        t12 += v * b4;
        t13 += v * b5;
        t14 += v * b6;
        t15 += v * b7;
        t16 += v * b8;
        t17 += v * b9;
        t18 += v * b10;
        t19 += v * b11;
        t20 += v * b12;
        t21 += v * b13;
        t22 += v * b14;
        t23 += v * b15;
        v = a[9];
        t9 += v * b0;
        t10 += v * b1;
        t11 += v * b2;
        t12 += v * b3;
        t13 += v * b4;
        t14 += v * b5;
        t15 += v * b6;
        t16 += v * b7;
        t17 += v * b8;
        t18 += v * b9;
        t19 += v * b10;
        t20 += v * b11;
        t21 += v * b12;
        t22 += v * b13;
        t23 += v * b14;
        t24 += v * b15;
        v = a[10];
        t10 += v * b0;
        t11 += v * b1;
        t12 += v * b2;
        t13 += v * b3;
        t14 += v * b4;
        t15 += v * b5;
        t16 += v * b6;
        t17 += v * b7;
        t18 += v * b8;
        t19 += v * b9;
        t20 += v * b10;
        t21 += v * b11;
        t22 += v * b12;
        t23 += v * b13;
        t24 += v * b14;
        t25 += v * b15;
        v = a[11];
        t11 += v * b0;
        t12 += v * b1;
        t13 += v * b2;
        t14 += v * b3;
        t15 += v * b4;
        t16 += v * b5;
        t17 += v * b6;
        t18 += v * b7;
        t19 += v * b8;
        t20 += v * b9;
        t21 += v * b10;
        t22 += v * b11;
        t23 += v * b12;
        t24 += v * b13;
        t25 += v * b14;
        t26 += v * b15;
        v = a[12];
        t12 += v * b0;
        t13 += v * b1;
        t14 += v * b2;
        t15 += v * b3;
        t16 += v * b4;
        t17 += v * b5;
        t18 += v * b6;
        t19 += v * b7;
        t20 += v * b8;
        t21 += v * b9;
        t22 += v * b10;
        t23 += v * b11;
        t24 += v * b12;
        t25 += v * b13;
        t26 += v * b14;
        t27 += v * b15;
        v = a[13];
        t13 += v * b0;
        t14 += v * b1;
        t15 += v * b2;
        t16 += v * b3;
        t17 += v * b4;
        t18 += v * b5;
        t19 += v * b6;
        t20 += v * b7;
        t21 += v * b8;
        t22 += v * b9;
        t23 += v * b10;
        t24 += v * b11;
        t25 += v * b12;
        t26 += v * b13;
        t27 += v * b14;
        t28 += v * b15;
        v = a[14];
        t14 += v * b0;
        t15 += v * b1;
        t16 += v * b2;
        t17 += v * b3;
        t18 += v * b4;
        t19 += v * b5;
        t20 += v * b6;
        t21 += v * b7;
        t22 += v * b8;
        t23 += v * b9;
        t24 += v * b10;
        t25 += v * b11;
        t26 += v * b12;
        t27 += v * b13;
        t28 += v * b14;
        t29 += v * b15;
        v = a[15];
        t15 += v * b0;
        t16 += v * b1;
        t17 += v * b2;
        t18 += v * b3;
        t19 += v * b4;
        t20 += v * b5;
        t21 += v * b6;
        t22 += v * b7;
        t23 += v * b8;
        t24 += v * b9;
        t25 += v * b10;
        t26 += v * b11;
        t27 += v * b12;
        t28 += v * b13;
        t29 += v * b14;
        t30 += v * b15;
        t0 += 38 * t16;
        t1 += 38 * t17;
        t2 += 38 * t18;
        t3 += 38 * t19;
        t4 += 38 * t20;
        t5 += 38 * t21;
        t6 += 38 * t22;
        t7 += 38 * t23;
        t8 += 38 * t24;
        t9 += 38 * t25;
        t10 += 38 * t26;
        t11 += 38 * t27;
        t12 += 38 * t28;
        t13 += 38 * t29;
        t14 += 38 * t30;
        c = 1;
        v = t0 + c + 65535;
        c = Math.floor(v / 65536);
        t0 = v - c * 65536;
        v = t1 + c + 65535;
        c = Math.floor(v / 65536);
        t1 = v - c * 65536;
        v = t2 + c + 65535;
        c = Math.floor(v / 65536);
        t2 = v - c * 65536;
        v = t3 + c + 65535;
        c = Math.floor(v / 65536);
        t3 = v - c * 65536;
        v = t4 + c + 65535;
        c = Math.floor(v / 65536);
        t4 = v - c * 65536;
        v = t5 + c + 65535;
        c = Math.floor(v / 65536);
        t5 = v - c * 65536;
        v = t6 + c + 65535;
        c = Math.floor(v / 65536);
        t6 = v - c * 65536;
        v = t7 + c + 65535;
        c = Math.floor(v / 65536);
        t7 = v - c * 65536;
        v = t8 + c + 65535;
        c = Math.floor(v / 65536);
        t8 = v - c * 65536;
        v = t9 + c + 65535;
        c = Math.floor(v / 65536);
        t9 = v - c * 65536;
        v = t10 + c + 65535;
        c = Math.floor(v / 65536);
        t10 = v - c * 65536;
        v = t11 + c + 65535;
        c = Math.floor(v / 65536);
        t11 = v - c * 65536;
        v = t12 + c + 65535;
        c = Math.floor(v / 65536);
        t12 = v - c * 65536;
        v = t13 + c + 65535;
        c = Math.floor(v / 65536);
        t13 = v - c * 65536;
        v = t14 + c + 65535;
        c = Math.floor(v / 65536);
        t14 = v - c * 65536;
        v = t15 + c + 65535;
        c = Math.floor(v / 65536);
        t15 = v - c * 65536;
        t0 += c - 1 + 37 * (c - 1);
        c = 1;
        v = t0 + c + 65535;
        c = Math.floor(v / 65536);
        t0 = v - c * 65536;
        v = t1 + c + 65535;
        c = Math.floor(v / 65536);
        t1 = v - c * 65536;
        v = t2 + c + 65535;
        c = Math.floor(v / 65536);
        t2 = v - c * 65536;
        v = t3 + c + 65535;
        c = Math.floor(v / 65536);
        t3 = v - c * 65536;
        v = t4 + c + 65535;
        c = Math.floor(v / 65536);
        t4 = v - c * 65536;
        v = t5 + c + 65535;
        c = Math.floor(v / 65536);
        t5 = v - c * 65536;
        v = t6 + c + 65535;
        c = Math.floor(v / 65536);
        t6 = v - c * 65536;
        v = t7 + c + 65535;
        c = Math.floor(v / 65536);
        t7 = v - c * 65536;
        v = t8 + c + 65535;
        c = Math.floor(v / 65536);
        t8 = v - c * 65536;
        v = t9 + c + 65535;
        c = Math.floor(v / 65536);
        t9 = v - c * 65536;
        v = t10 + c + 65535;
        c = Math.floor(v / 65536);
        t10 = v - c * 65536;
        v = t11 + c + 65535;
        c = Math.floor(v / 65536);
        t11 = v - c * 65536;
        v = t12 + c + 65535;
        c = Math.floor(v / 65536);
        t12 = v - c * 65536;
        v = t13 + c + 65535;
        c = Math.floor(v / 65536);
        t13 = v - c * 65536;
        v = t14 + c + 65535;
        c = Math.floor(v / 65536);
        t14 = v - c * 65536;
        v = t15 + c + 65535;
        c = Math.floor(v / 65536);
        t15 = v - c * 65536;
        t0 += c - 1 + 37 * (c - 1);
        o[0] = t0;
        o[1] = t1;
        o[2] = t2;
        o[3] = t3;
        o[4] = t4;
        o[5] = t5;
        o[6] = t6;
        o[7] = t7;
        o[8] = t8;
        o[9] = t9;
        o[10] = t10;
        o[11] = t11;
        o[12] = t12;
        o[13] = t13;
        o[14] = t14;
        o[15] = t15;
      }
      function S(o, a) {
        M(o, a, a);
      }
      function inv25519(o, i) {
        var c = gf();
        var a;
        for (a = 0; a < 16; a++)
          c[a] = i[a];
        for (a = 253; a >= 0; a--) {
          S(c, c);
          if (a !== 2 && a !== 4)
            M(c, c, i);
        }
        for (a = 0; a < 16; a++)
          o[a] = c[a];
      }
      function pow2523(o, i) {
        var c = gf();
        var a;
        for (a = 0; a < 16; a++)
          c[a] = i[a];
        for (a = 250; a >= 0; a--) {
          S(c, c);
          if (a !== 1)
            M(c, c, i);
        }
        for (a = 0; a < 16; a++)
          o[a] = c[a];
      }
      function crypto_scalarmult(q, n, p) {
        var z = new Uint8Array(32);
        var x = new Float64Array(80), r, i;
        var a = gf(), b = gf(), c = gf(), d = gf(), e = gf(), f = gf();
        for (i = 0; i < 31; i++)
          z[i] = n[i];
        z[31] = n[31] & 127 | 64;
        z[0] &= 248;
        unpack25519(x, p);
        for (i = 0; i < 16; i++) {
          b[i] = x[i];
          d[i] = a[i] = c[i] = 0;
        }
        a[0] = d[0] = 1;
        for (i = 254; i >= 0; --i) {
          r = z[i >>> 3] >>> (i & 7) & 1;
          sel25519(a, b, r);
          sel25519(c, d, r);
          A(e, a, c);
          Z(a, a, c);
          A(c, b, d);
          Z(b, b, d);
          S(d, e);
          S(f, a);
          M(a, c, a);
          M(c, b, e);
          A(e, a, c);
          Z(a, a, c);
          S(b, a);
          Z(c, d, f);
          M(a, c, _121665);
          A(a, a, d);
          M(c, c, a);
          M(a, d, f);
          M(d, b, x);
          S(b, e);
          sel25519(a, b, r);
          sel25519(c, d, r);
        }
        for (i = 0; i < 16; i++) {
          x[i + 16] = a[i];
          x[i + 32] = c[i];
          x[i + 48] = b[i];
          x[i + 64] = d[i];
        }
        var x32 = x.subarray(32);
        var x16 = x.subarray(16);
        inv25519(x32, x32);
        M(x16, x16, x32);
        pack25519(q, x16);
        return 0;
      }
      function crypto_scalarmult_base(q, n) {
        return crypto_scalarmult(q, n, _9);
      }
      function crypto_box_keypair(y, x) {
        randombytes(x, 32);
        return crypto_scalarmult_base(y, x);
      }
      function crypto_box_beforenm(k, y, x) {
        var s = new Uint8Array(32);
        crypto_scalarmult(s, x, y);
        return crypto_core_hsalsa20(k, _0, s, sigma);
      }
      var crypto_box_afternm = crypto_secretbox;
      var crypto_box_open_afternm = crypto_secretbox_open;
      function crypto_box(c, m, d, n, y, x) {
        var k = new Uint8Array(32);
        crypto_box_beforenm(k, y, x);
        return crypto_box_afternm(c, m, d, n, k);
      }
      function crypto_box_open(m, c, d, n, y, x) {
        var k = new Uint8Array(32);
        crypto_box_beforenm(k, y, x);
        return crypto_box_open_afternm(m, c, d, n, k);
      }
      var K = [
        1116352408,
        3609767458,
        1899447441,
        602891725,
        3049323471,
        3964484399,
        3921009573,
        2173295548,
        961987163,
        4081628472,
        1508970993,
        3053834265,
        2453635748,
        2937671579,
        2870763221,
        3664609560,
        3624381080,
        2734883394,
        310598401,
        1164996542,
        607225278,
        1323610764,
        1426881987,
        3590304994,
        1925078388,
        4068182383,
        2162078206,
        991336113,
        2614888103,
        633803317,
        3248222580,
        3479774868,
        3835390401,
        2666613458,
        4022224774,
        944711139,
        264347078,
        2341262773,
        604807628,
        2007800933,
        770255983,
        1495990901,
        1249150122,
        1856431235,
        1555081692,
        3175218132,
        1996064986,
        2198950837,
        2554220882,
        3999719339,
        2821834349,
        766784016,
        2952996808,
        2566594879,
        3210313671,
        3203337956,
        3336571891,
        1034457026,
        3584528711,
        2466948901,
        113926993,
        3758326383,
        338241895,
        168717936,
        666307205,
        1188179964,
        773529912,
        1546045734,
        1294757372,
        1522805485,
        1396182291,
        2643833823,
        1695183700,
        2343527390,
        1986661051,
        1014477480,
        2177026350,
        1206759142,
        2456956037,
        344077627,
        2730485921,
        1290863460,
        2820302411,
        3158454273,
        3259730800,
        3505952657,
        3345764771,
        106217008,
        3516065817,
        3606008344,
        3600352804,
        1432725776,
        4094571909,
        1467031594,
        275423344,
        851169720,
        430227734,
        3100823752,
        506948616,
        1363258195,
        659060556,
        3750685593,
        883997877,
        3785050280,
        958139571,
        3318307427,
        1322822218,
        3812723403,
        1537002063,
        2003034995,
        1747873779,
        3602036899,
        1955562222,
        1575990012,
        2024104815,
        1125592928,
        2227730452,
        2716904306,
        2361852424,
        442776044,
        2428436474,
        593698344,
        2756734187,
        3733110249,
        3204031479,
        2999351573,
        3329325298,
        3815920427,
        3391569614,
        3928383900,
        3515267271,
        566280711,
        3940187606,
        3454069534,
        4118630271,
        4000239992,
        116418474,
        1914138554,
        174292421,
        2731055270,
        289380356,
        3203993006,
        460393269,
        320620315,
        685471733,
        587496836,
        852142971,
        1086792851,
        1017036298,
        365543100,
        1126000580,
        2618297676,
        1288033470,
        3409855158,
        1501505948,
        4234509866,
        1607167915,
        987167468,
        1816402316,
        1246189591
      ];
      function crypto_hashblocks_hl(hh, hl, m, n) {
        var wh = new Int32Array(16), wl = new Int32Array(16), bh0, bh1, bh2, bh3, bh4, bh5, bh6, bh7, bl0, bl1, bl2, bl3, bl4, bl5, bl6, bl7, th, tl, i, j, h, l, a, b, c, d;
        var ah0 = hh[0], ah1 = hh[1], ah2 = hh[2], ah3 = hh[3], ah4 = hh[4], ah5 = hh[5], ah6 = hh[6], ah7 = hh[7], al0 = hl[0], al1 = hl[1], al2 = hl[2], al3 = hl[3], al4 = hl[4], al5 = hl[5], al6 = hl[6], al7 = hl[7];
        var pos = 0;
        while (n >= 128) {
          for (i = 0; i < 16; i++) {
            j = 8 * i + pos;
            wh[i] = m[j + 0] << 24 | m[j + 1] << 16 | m[j + 2] << 8 | m[j + 3];
            wl[i] = m[j + 4] << 24 | m[j + 5] << 16 | m[j + 6] << 8 | m[j + 7];
          }
          for (i = 0; i < 80; i++) {
            bh0 = ah0;
            bh1 = ah1;
            bh2 = ah2;
            bh3 = ah3;
            bh4 = ah4;
            bh5 = ah5;
            bh6 = ah6;
            bh7 = ah7;
            bl0 = al0;
            bl1 = al1;
            bl2 = al2;
            bl3 = al3;
            bl4 = al4;
            bl5 = al5;
            bl6 = al6;
            bl7 = al7;
            h = ah7;
            l = al7;
            a = l & 65535;
            b = l >>> 16;
            c = h & 65535;
            d = h >>> 16;
            h = (ah4 >>> 14 | al4 << 32 - 14) ^ (ah4 >>> 18 | al4 << 32 - 18) ^ (al4 >>> 41 - 32 | ah4 << 32 - (41 - 32));
            l = (al4 >>> 14 | ah4 << 32 - 14) ^ (al4 >>> 18 | ah4 << 32 - 18) ^ (ah4 >>> 41 - 32 | al4 << 32 - (41 - 32));
            a += l & 65535;
            b += l >>> 16;
            c += h & 65535;
            d += h >>> 16;
            h = ah4 & ah5 ^ ~ah4 & ah6;
            l = al4 & al5 ^ ~al4 & al6;
            a += l & 65535;
            b += l >>> 16;
            c += h & 65535;
            d += h >>> 16;
            h = K[i * 2];
            l = K[i * 2 + 1];
            a += l & 65535;
            b += l >>> 16;
            c += h & 65535;
            d += h >>> 16;
            h = wh[i % 16];
            l = wl[i % 16];
            a += l & 65535;
            b += l >>> 16;
            c += h & 65535;
            d += h >>> 16;
            b += a >>> 16;
            c += b >>> 16;
            d += c >>> 16;
            th = c & 65535 | d << 16;
            tl = a & 65535 | b << 16;
            h = th;
            l = tl;
            a = l & 65535;
            b = l >>> 16;
            c = h & 65535;
            d = h >>> 16;
            h = (ah0 >>> 28 | al0 << 32 - 28) ^ (al0 >>> 34 - 32 | ah0 << 32 - (34 - 32)) ^ (al0 >>> 39 - 32 | ah0 << 32 - (39 - 32));
            l = (al0 >>> 28 | ah0 << 32 - 28) ^ (ah0 >>> 34 - 32 | al0 << 32 - (34 - 32)) ^ (ah0 >>> 39 - 32 | al0 << 32 - (39 - 32));
            a += l & 65535;
            b += l >>> 16;
            c += h & 65535;
            d += h >>> 16;
            h = ah0 & ah1 ^ ah0 & ah2 ^ ah1 & ah2;
            l = al0 & al1 ^ al0 & al2 ^ al1 & al2;
            a += l & 65535;
            b += l >>> 16;
            c += h & 65535;
            d += h >>> 16;
            b += a >>> 16;
            c += b >>> 16;
            d += c >>> 16;
            bh7 = c & 65535 | d << 16;
            bl7 = a & 65535 | b << 16;
            h = bh3;
            l = bl3;
            a = l & 65535;
            b = l >>> 16;
            c = h & 65535;
            d = h >>> 16;
            h = th;
            l = tl;
            a += l & 65535;
            b += l >>> 16;
            c += h & 65535;
            d += h >>> 16;
            b += a >>> 16;
            c += b >>> 16;
            d += c >>> 16;
            bh3 = c & 65535 | d << 16;
            bl3 = a & 65535 | b << 16;
            ah1 = bh0;
            ah2 = bh1;
            ah3 = bh2;
            ah4 = bh3;
            ah5 = bh4;
            ah6 = bh5;
            ah7 = bh6;
            ah0 = bh7;
            al1 = bl0;
            al2 = bl1;
            al3 = bl2;
            al4 = bl3;
            al5 = bl4;
            al6 = bl5;
            al7 = bl6;
            al0 = bl7;
            if (i % 16 === 15) {
              for (j = 0; j < 16; j++) {
                h = wh[j];
                l = wl[j];
                a = l & 65535;
                b = l >>> 16;
                c = h & 65535;
                d = h >>> 16;
                h = wh[(j + 9) % 16];
                l = wl[(j + 9) % 16];
                a += l & 65535;
                b += l >>> 16;
                c += h & 65535;
                d += h >>> 16;
                th = wh[(j + 1) % 16];
                tl = wl[(j + 1) % 16];
                h = (th >>> 1 | tl << 32 - 1) ^ (th >>> 8 | tl << 32 - 8) ^ th >>> 7;
                l = (tl >>> 1 | th << 32 - 1) ^ (tl >>> 8 | th << 32 - 8) ^ (tl >>> 7 | th << 32 - 7);
                a += l & 65535;
                b += l >>> 16;
                c += h & 65535;
                d += h >>> 16;
                th = wh[(j + 14) % 16];
                tl = wl[(j + 14) % 16];
                h = (th >>> 19 | tl << 32 - 19) ^ (tl >>> 61 - 32 | th << 32 - (61 - 32)) ^ th >>> 6;
                l = (tl >>> 19 | th << 32 - 19) ^ (th >>> 61 - 32 | tl << 32 - (61 - 32)) ^ (tl >>> 6 | th << 32 - 6);
                a += l & 65535;
                b += l >>> 16;
                c += h & 65535;
                d += h >>> 16;
                b += a >>> 16;
                c += b >>> 16;
                d += c >>> 16;
                wh[j] = c & 65535 | d << 16;
                wl[j] = a & 65535 | b << 16;
              }
            }
          }
          h = ah0;
          l = al0;
          a = l & 65535;
          b = l >>> 16;
          c = h & 65535;
          d = h >>> 16;
          h = hh[0];
          l = hl[0];
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d += c >>> 16;
          hh[0] = ah0 = c & 65535 | d << 16;
          hl[0] = al0 = a & 65535 | b << 16;
          h = ah1;
          l = al1;
          a = l & 65535;
          b = l >>> 16;
          c = h & 65535;
          d = h >>> 16;
          h = hh[1];
          l = hl[1];
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d += c >>> 16;
          hh[1] = ah1 = c & 65535 | d << 16;
          hl[1] = al1 = a & 65535 | b << 16;
          h = ah2;
          l = al2;
          a = l & 65535;
          b = l >>> 16;
          c = h & 65535;
          d = h >>> 16;
          h = hh[2];
          l = hl[2];
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d += c >>> 16;
          hh[2] = ah2 = c & 65535 | d << 16;
          hl[2] = al2 = a & 65535 | b << 16;
          h = ah3;
          l = al3;
          a = l & 65535;
          b = l >>> 16;
          c = h & 65535;
          d = h >>> 16;
          h = hh[3];
          l = hl[3];
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d += c >>> 16;
          hh[3] = ah3 = c & 65535 | d << 16;
          hl[3] = al3 = a & 65535 | b << 16;
          h = ah4;
          l = al4;
          a = l & 65535;
          b = l >>> 16;
          c = h & 65535;
          d = h >>> 16;
          h = hh[4];
          l = hl[4];
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d += c >>> 16;
          hh[4] = ah4 = c & 65535 | d << 16;
          hl[4] = al4 = a & 65535 | b << 16;
          h = ah5;
          l = al5;
          a = l & 65535;
          b = l >>> 16;
          c = h & 65535;
          d = h >>> 16;
          h = hh[5];
          l = hl[5];
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d += c >>> 16;
          hh[5] = ah5 = c & 65535 | d << 16;
          hl[5] = al5 = a & 65535 | b << 16;
          h = ah6;
          l = al6;
          a = l & 65535;
          b = l >>> 16;
          c = h & 65535;
          d = h >>> 16;
          h = hh[6];
          l = hl[6];
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d += c >>> 16;
          hh[6] = ah6 = c & 65535 | d << 16;
          hl[6] = al6 = a & 65535 | b << 16;
          h = ah7;
          l = al7;
          a = l & 65535;
          b = l >>> 16;
          c = h & 65535;
          d = h >>> 16;
          h = hh[7];
          l = hl[7];
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d += c >>> 16;
          hh[7] = ah7 = c & 65535 | d << 16;
          hl[7] = al7 = a & 65535 | b << 16;
          pos += 128;
          n -= 128;
        }
        return n;
      }
      function crypto_hash(out, m, n) {
        var hh = new Int32Array(8), hl = new Int32Array(8), x = new Uint8Array(256), i, b = n;
        hh[0] = 1779033703;
        hh[1] = 3144134277;
        hh[2] = 1013904242;
        hh[3] = 2773480762;
        hh[4] = 1359893119;
        hh[5] = 2600822924;
        hh[6] = 528734635;
        hh[7] = 1541459225;
        hl[0] = 4089235720;
        hl[1] = 2227873595;
        hl[2] = 4271175723;
        hl[3] = 1595750129;
        hl[4] = 2917565137;
        hl[5] = 725511199;
        hl[6] = 4215389547;
        hl[7] = 327033209;
        crypto_hashblocks_hl(hh, hl, m, n);
        n %= 128;
        for (i = 0; i < n; i++)
          x[i] = m[b - n + i];
        x[n] = 128;
        n = 256 - 128 * (n < 112 ? 1 : 0);
        x[n - 9] = 0;
        ts64(x, n - 8, b / 536870912 | 0, b << 3);
        crypto_hashblocks_hl(hh, hl, x, n);
        for (i = 0; i < 8; i++)
          ts64(out, 8 * i, hh[i], hl[i]);
        return 0;
      }
      function add(p, q) {
        var a = gf(), b = gf(), c = gf(), d = gf(), e = gf(), f = gf(), g = gf(), h = gf(), t = gf();
        Z(a, p[1], p[0]);
        Z(t, q[1], q[0]);
        M(a, a, t);
        A(b, p[0], p[1]);
        A(t, q[0], q[1]);
        M(b, b, t);
        M(c, p[3], q[3]);
        M(c, c, D2);
        M(d, p[2], q[2]);
        A(d, d, d);
        Z(e, b, a);
        Z(f, d, c);
        A(g, d, c);
        A(h, b, a);
        M(p[0], e, f);
        M(p[1], h, g);
        M(p[2], g, f);
        M(p[3], e, h);
      }
      function cswap(p, q, b) {
        var i;
        for (i = 0; i < 4; i++) {
          sel25519(p[i], q[i], b);
        }
      }
      function pack(r, p) {
        var tx = gf(), ty = gf(), zi = gf();
        inv25519(zi, p[2]);
        M(tx, p[0], zi);
        M(ty, p[1], zi);
        pack25519(r, ty);
        r[31] ^= par25519(tx) << 7;
      }
      function scalarmult(p, q, s) {
        var b, i;
        set25519(p[0], gf0);
        set25519(p[1], gf1);
        set25519(p[2], gf1);
        set25519(p[3], gf0);
        for (i = 255; i >= 0; --i) {
          b = s[i / 8 | 0] >> (i & 7) & 1;
          cswap(p, q, b);
          add(q, p);
          add(p, p);
          cswap(p, q, b);
        }
      }
      function scalarbase(p, s) {
        var q = [gf(), gf(), gf(), gf()];
        set25519(q[0], X);
        set25519(q[1], Y);
        set25519(q[2], gf1);
        M(q[3], X, Y);
        scalarmult(p, q, s);
      }
      function crypto_sign_keypair(pk, sk, seeded) {
        var d = new Uint8Array(64);
        var p = [gf(), gf(), gf(), gf()];
        var i;
        if (!seeded)
          randombytes(sk, 32);
        crypto_hash(d, sk, 32);
        d[0] &= 248;
        d[31] &= 127;
        d[31] |= 64;
        scalarbase(p, d);
        pack(pk, p);
        for (i = 0; i < 32; i++)
          sk[i + 32] = pk[i];
        return 0;
      }
      var L = new Float64Array([237, 211, 245, 92, 26, 99, 18, 88, 214, 156, 247, 162, 222, 249, 222, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16]);
      function modL(r, x) {
        var carry, i, j, k;
        for (i = 63; i >= 32; --i) {
          carry = 0;
          for (j = i - 32, k = i - 12; j < k; ++j) {
            x[j] += carry - 16 * x[i] * L[j - (i - 32)];
            carry = Math.floor((x[j] + 128) / 256);
            x[j] -= carry * 256;
          }
          x[j] += carry;
          x[i] = 0;
        }
        carry = 0;
        for (j = 0; j < 32; j++) {
          x[j] += carry - (x[31] >> 4) * L[j];
          carry = x[j] >> 8;
          x[j] &= 255;
        }
        for (j = 0; j < 32; j++)
          x[j] -= carry * L[j];
        for (i = 0; i < 32; i++) {
          x[i + 1] += x[i] >> 8;
          r[i] = x[i] & 255;
        }
      }
      function reduce(r) {
        var x = new Float64Array(64), i;
        for (i = 0; i < 64; i++)
          x[i] = r[i];
        for (i = 0; i < 64; i++)
          r[i] = 0;
        modL(r, x);
      }
      function crypto_sign(sm, m, n, sk) {
        var d = new Uint8Array(64), h = new Uint8Array(64), r = new Uint8Array(64);
        var i, j, x = new Float64Array(64);
        var p = [gf(), gf(), gf(), gf()];
        crypto_hash(d, sk, 32);
        d[0] &= 248;
        d[31] &= 127;
        d[31] |= 64;
        var smlen = n + 64;
        for (i = 0; i < n; i++)
          sm[64 + i] = m[i];
        for (i = 0; i < 32; i++)
          sm[32 + i] = d[32 + i];
        crypto_hash(r, sm.subarray(32), n + 32);
        reduce(r);
        scalarbase(p, r);
        pack(sm, p);
        for (i = 32; i < 64; i++)
          sm[i] = sk[i];
        crypto_hash(h, sm, n + 64);
        reduce(h);
        for (i = 0; i < 64; i++)
          x[i] = 0;
        for (i = 0; i < 32; i++)
          x[i] = r[i];
        for (i = 0; i < 32; i++) {
          for (j = 0; j < 32; j++) {
            x[i + j] += h[i] * d[j];
          }
        }
        modL(sm.subarray(32), x);
        return smlen;
      }
      function unpackneg(r, p) {
        var t = gf(), chk = gf(), num = gf(), den = gf(), den2 = gf(), den4 = gf(), den6 = gf();
        set25519(r[2], gf1);
        unpack25519(r[1], p);
        S(num, r[1]);
        M(den, num, D);
        Z(num, num, r[2]);
        A(den, r[2], den);
        S(den2, den);
        S(den4, den2);
        M(den6, den4, den2);
        M(t, den6, num);
        M(t, t, den);
        pow2523(t, t);
        M(t, t, num);
        M(t, t, den);
        M(t, t, den);
        M(r[0], t, den);
        S(chk, r[0]);
        M(chk, chk, den);
        if (neq25519(chk, num))
          M(r[0], r[0], I);
        S(chk, r[0]);
        M(chk, chk, den);
        if (neq25519(chk, num))
          return -1;
        if (par25519(r[0]) === p[31] >> 7)
          Z(r[0], gf0, r[0]);
        M(r[3], r[0], r[1]);
        return 0;
      }
      function crypto_sign_open(m, sm, n, pk) {
        var i;
        var t = new Uint8Array(32), h = new Uint8Array(64);
        var p = [gf(), gf(), gf(), gf()], q = [gf(), gf(), gf(), gf()];
        if (n < 64)
          return -1;
        if (unpackneg(q, pk))
          return -1;
        for (i = 0; i < n; i++)
          m[i] = sm[i];
        for (i = 0; i < 32; i++)
          m[i + 32] = pk[i];
        crypto_hash(h, m, n);
        reduce(h);
        scalarmult(p, q, h);
        scalarbase(q, sm.subarray(32));
        add(p, q);
        pack(t, p);
        n -= 64;
        if (crypto_verify_32(sm, 0, t, 0)) {
          for (i = 0; i < n; i++)
            m[i] = 0;
          return -1;
        }
        for (i = 0; i < n; i++)
          m[i] = sm[i + 64];
        return n;
      }
      var crypto_secretbox_KEYBYTES = 32, crypto_secretbox_NONCEBYTES = 24, crypto_secretbox_ZEROBYTES = 32, crypto_secretbox_BOXZEROBYTES = 16, crypto_scalarmult_BYTES = 32, crypto_scalarmult_SCALARBYTES = 32, crypto_box_PUBLICKEYBYTES = 32, crypto_box_SECRETKEYBYTES = 32, crypto_box_BEFORENMBYTES = 32, crypto_box_NONCEBYTES = crypto_secretbox_NONCEBYTES, crypto_box_ZEROBYTES = crypto_secretbox_ZEROBYTES, crypto_box_BOXZEROBYTES = crypto_secretbox_BOXZEROBYTES, crypto_sign_BYTES = 64, crypto_sign_PUBLICKEYBYTES = 32, crypto_sign_SECRETKEYBYTES = 64, crypto_sign_SEEDBYTES = 32, crypto_hash_BYTES = 64;
      nacl2.lowlevel = {
        crypto_core_hsalsa20,
        crypto_stream_xor,
        crypto_stream,
        crypto_stream_salsa20_xor,
        crypto_stream_salsa20,
        crypto_onetimeauth,
        crypto_onetimeauth_verify,
        crypto_verify_16,
        crypto_verify_32,
        crypto_secretbox,
        crypto_secretbox_open,
        crypto_scalarmult,
        crypto_scalarmult_base,
        crypto_box_beforenm,
        crypto_box_afternm,
        crypto_box,
        crypto_box_open,
        crypto_box_keypair,
        crypto_hash,
        crypto_sign,
        crypto_sign_keypair,
        crypto_sign_open,
        crypto_secretbox_KEYBYTES,
        crypto_secretbox_NONCEBYTES,
        crypto_secretbox_ZEROBYTES,
        crypto_secretbox_BOXZEROBYTES,
        crypto_scalarmult_BYTES,
        crypto_scalarmult_SCALARBYTES,
        crypto_box_PUBLICKEYBYTES,
        crypto_box_SECRETKEYBYTES,
        crypto_box_BEFORENMBYTES,
        crypto_box_NONCEBYTES,
        crypto_box_ZEROBYTES,
        crypto_box_BOXZEROBYTES,
        crypto_sign_BYTES,
        crypto_sign_PUBLICKEYBYTES,
        crypto_sign_SECRETKEYBYTES,
        crypto_sign_SEEDBYTES,
        crypto_hash_BYTES,
        gf,
        D,
        L,
        pack25519,
        unpack25519,
        M,
        A,
        S,
        Z,
        pow2523,
        add,
        set25519,
        modL,
        scalarmult,
        scalarbase
      };
      function checkLengths(k, n) {
        if (k.length !== crypto_secretbox_KEYBYTES)
          throw new Error("bad key size");
        if (n.length !== crypto_secretbox_NONCEBYTES)
          throw new Error("bad nonce size");
      }
      function checkBoxLengths(pk, sk) {
        if (pk.length !== crypto_box_PUBLICKEYBYTES)
          throw new Error("bad public key size");
        if (sk.length !== crypto_box_SECRETKEYBYTES)
          throw new Error("bad secret key size");
      }
      function checkArrayTypes() {
        for (var i = 0; i < arguments.length; i++) {
          if (!(arguments[i] instanceof Uint8Array))
            throw new TypeError("unexpected type, use Uint8Array");
        }
      }
      function cleanup(arr) {
        for (var i = 0; i < arr.length; i++)
          arr[i] = 0;
      }
      nacl2.randomBytes = function(n) {
        var b = new Uint8Array(n);
        randombytes(b, n);
        return b;
      };
      nacl2.secretbox = function(msg, nonce, key) {
        checkArrayTypes(msg, nonce, key);
        checkLengths(key, nonce);
        var m = new Uint8Array(crypto_secretbox_ZEROBYTES + msg.length);
        var c = new Uint8Array(m.length);
        for (var i = 0; i < msg.length; i++)
          m[i + crypto_secretbox_ZEROBYTES] = msg[i];
        crypto_secretbox(c, m, m.length, nonce, key);
        return c.subarray(crypto_secretbox_BOXZEROBYTES);
      };
      nacl2.secretbox.open = function(box, nonce, key) {
        checkArrayTypes(box, nonce, key);
        checkLengths(key, nonce);
        var c = new Uint8Array(crypto_secretbox_BOXZEROBYTES + box.length);
        var m = new Uint8Array(c.length);
        for (var i = 0; i < box.length; i++)
          c[i + crypto_secretbox_BOXZEROBYTES] = box[i];
        if (c.length < 32)
          return null;
        if (crypto_secretbox_open(m, c, c.length, nonce, key) !== 0)
          return null;
        return m.subarray(crypto_secretbox_ZEROBYTES);
      };
      nacl2.secretbox.keyLength = crypto_secretbox_KEYBYTES;
      nacl2.secretbox.nonceLength = crypto_secretbox_NONCEBYTES;
      nacl2.secretbox.overheadLength = crypto_secretbox_BOXZEROBYTES;
      nacl2.scalarMult = function(n, p) {
        checkArrayTypes(n, p);
        if (n.length !== crypto_scalarmult_SCALARBYTES)
          throw new Error("bad n size");
        if (p.length !== crypto_scalarmult_BYTES)
          throw new Error("bad p size");
        var q = new Uint8Array(crypto_scalarmult_BYTES);
        crypto_scalarmult(q, n, p);
        return q;
      };
      nacl2.scalarMult.base = function(n) {
        checkArrayTypes(n);
        if (n.length !== crypto_scalarmult_SCALARBYTES)
          throw new Error("bad n size");
        var q = new Uint8Array(crypto_scalarmult_BYTES);
        crypto_scalarmult_base(q, n);
        return q;
      };
      nacl2.scalarMult.scalarLength = crypto_scalarmult_SCALARBYTES;
      nacl2.scalarMult.groupElementLength = crypto_scalarmult_BYTES;
      nacl2.box = function(msg, nonce, publicKey, secretKey) {
        var k = nacl2.box.before(publicKey, secretKey);
        return nacl2.secretbox(msg, nonce, k);
      };
      nacl2.box.before = function(publicKey, secretKey) {
        checkArrayTypes(publicKey, secretKey);
        checkBoxLengths(publicKey, secretKey);
        var k = new Uint8Array(crypto_box_BEFORENMBYTES);
        crypto_box_beforenm(k, publicKey, secretKey);
        return k;
      };
      nacl2.box.after = nacl2.secretbox;
      nacl2.box.open = function(msg, nonce, publicKey, secretKey) {
        var k = nacl2.box.before(publicKey, secretKey);
        return nacl2.secretbox.open(msg, nonce, k);
      };
      nacl2.box.open.after = nacl2.secretbox.open;
      nacl2.box.keyPair = function() {
        var pk = new Uint8Array(crypto_box_PUBLICKEYBYTES);
        var sk = new Uint8Array(crypto_box_SECRETKEYBYTES);
        crypto_box_keypair(pk, sk);
        return { publicKey: pk, secretKey: sk };
      };
      nacl2.box.keyPair.fromSecretKey = function(secretKey) {
        checkArrayTypes(secretKey);
        if (secretKey.length !== crypto_box_SECRETKEYBYTES)
          throw new Error("bad secret key size");
        var pk = new Uint8Array(crypto_box_PUBLICKEYBYTES);
        crypto_scalarmult_base(pk, secretKey);
        return { publicKey: pk, secretKey: new Uint8Array(secretKey) };
      };
      nacl2.box.publicKeyLength = crypto_box_PUBLICKEYBYTES;
      nacl2.box.secretKeyLength = crypto_box_SECRETKEYBYTES;
      nacl2.box.sharedKeyLength = crypto_box_BEFORENMBYTES;
      nacl2.box.nonceLength = crypto_box_NONCEBYTES;
      nacl2.box.overheadLength = nacl2.secretbox.overheadLength;
      nacl2.sign = function(msg, secretKey) {
        checkArrayTypes(msg, secretKey);
        if (secretKey.length !== crypto_sign_SECRETKEYBYTES)
          throw new Error("bad secret key size");
        var signedMsg = new Uint8Array(crypto_sign_BYTES + msg.length);
        crypto_sign(signedMsg, msg, msg.length, secretKey);
        return signedMsg;
      };
      nacl2.sign.open = function(signedMsg, publicKey) {
        checkArrayTypes(signedMsg, publicKey);
        if (publicKey.length !== crypto_sign_PUBLICKEYBYTES)
          throw new Error("bad public key size");
        var tmp = new Uint8Array(signedMsg.length);
        var mlen = crypto_sign_open(tmp, signedMsg, signedMsg.length, publicKey);
        if (mlen < 0)
          return null;
        var m = new Uint8Array(mlen);
        for (var i = 0; i < m.length; i++)
          m[i] = tmp[i];
        return m;
      };
      nacl2.sign.detached = function(msg, secretKey) {
        var signedMsg = nacl2.sign(msg, secretKey);
        var sig = new Uint8Array(crypto_sign_BYTES);
        for (var i = 0; i < sig.length; i++)
          sig[i] = signedMsg[i];
        return sig;
      };
      nacl2.sign.detached.verify = function(msg, sig, publicKey) {
        checkArrayTypes(msg, sig, publicKey);
        if (sig.length !== crypto_sign_BYTES)
          throw new Error("bad signature size");
        if (publicKey.length !== crypto_sign_PUBLICKEYBYTES)
          throw new Error("bad public key size");
        var sm = new Uint8Array(crypto_sign_BYTES + msg.length);
        var m = new Uint8Array(crypto_sign_BYTES + msg.length);
        var i;
        for (i = 0; i < crypto_sign_BYTES; i++)
          sm[i] = sig[i];
        for (i = 0; i < msg.length; i++)
          sm[i + crypto_sign_BYTES] = msg[i];
        return crypto_sign_open(m, sm, sm.length, publicKey) >= 0;
      };
      nacl2.sign.keyPair = function() {
        var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
        var sk = new Uint8Array(crypto_sign_SECRETKEYBYTES);
        crypto_sign_keypair(pk, sk);
        return { publicKey: pk, secretKey: sk };
      };
      nacl2.sign.keyPair.fromSecretKey = function(secretKey) {
        checkArrayTypes(secretKey);
        if (secretKey.length !== crypto_sign_SECRETKEYBYTES)
          throw new Error("bad secret key size");
        var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
        for (var i = 0; i < pk.length; i++)
          pk[i] = secretKey[32 + i];
        return { publicKey: pk, secretKey: new Uint8Array(secretKey) };
      };
      nacl2.sign.keyPair.fromSeed = function(seed) {
        checkArrayTypes(seed);
        if (seed.length !== crypto_sign_SEEDBYTES)
          throw new Error("bad seed size");
        var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
        var sk = new Uint8Array(crypto_sign_SECRETKEYBYTES);
        for (var i = 0; i < 32; i++)
          sk[i] = seed[i];
        crypto_sign_keypair(pk, sk, true);
        return { publicKey: pk, secretKey: sk };
      };
      nacl2.sign.publicKeyLength = crypto_sign_PUBLICKEYBYTES;
      nacl2.sign.secretKeyLength = crypto_sign_SECRETKEYBYTES;
      nacl2.sign.seedLength = crypto_sign_SEEDBYTES;
      nacl2.sign.signatureLength = crypto_sign_BYTES;
      nacl2.hash = function(msg) {
        checkArrayTypes(msg);
        var h = new Uint8Array(crypto_hash_BYTES);
        crypto_hash(h, msg, msg.length);
        return h;
      };
      nacl2.hash.hashLength = crypto_hash_BYTES;
      nacl2.verify = function(x, y) {
        checkArrayTypes(x, y);
        if (x.length === 0 || y.length === 0)
          return false;
        if (x.length !== y.length)
          return false;
        return vn(x, 0, y, 0, x.length) === 0 ? true : false;
      };
      nacl2.setPRNG = function(fn) {
        randombytes = fn;
      };
      (function() {
        var crypto2 = typeof self !== "undefined" ? self.crypto || self.msCrypto : null;
        if (crypto2 && crypto2.getRandomValues) {
          var QUOTA = 65536;
          nacl2.setPRNG(function(x, n) {
            var i, v = new Uint8Array(n);
            for (i = 0; i < n; i += QUOTA) {
              crypto2.getRandomValues(v.subarray(i, i + Math.min(n - i, QUOTA)));
            }
            for (i = 0; i < n; i++)
              x[i] = v[i];
            cleanup(v);
          });
        } else if (typeof __require !== "undefined") {
          crypto2 = require_crypto();
          if (crypto2 && crypto2.randomBytes) {
            nacl2.setPRNG(function(x, n) {
              var i, v = crypto2.randomBytes(n);
              for (i = 0; i < n; i++)
                x[i] = v[i];
              cleanup(v);
            });
          }
        }
      })();
    })(typeof module !== "undefined" && module.exports ? module.exports : self.nacl = self.nacl || {});
  }
});

// node_modules/.pnpm/js-sha512@0.8.0/node_modules/js-sha512/src/sha512.js
var require_sha512 = __commonJS({
  "node_modules/.pnpm/js-sha512@0.8.0/node_modules/js-sha512/src/sha512.js"(exports2, module) {
    (function() {
      "use strict";
      var INPUT_ERROR = "input is invalid type";
      var FINALIZE_ERROR = "finalize already called";
      var WINDOW = typeof window === "object";
      var root = WINDOW ? window : {};
      if (root.JS_SHA512_NO_WINDOW) {
        WINDOW = false;
      }
      var WEB_WORKER = !WINDOW && typeof self === "object";
      var NODE_JS = !root.JS_SHA512_NO_NODE_JS && typeof process === "object" && process.versions && process.versions.node;
      if (NODE_JS) {
        root = globalThis;
      } else if (WEB_WORKER) {
        root = self;
      }
      var COMMON_JS = !root.JS_SHA512_NO_COMMON_JS && typeof module === "object" && module.exports;
      var AMD = typeof define === "function" && define.amd;
      var ARRAY_BUFFER = !root.JS_SHA512_NO_ARRAY_BUFFER && typeof ArrayBuffer !== "undefined";
      var HEX_CHARS = "0123456789abcdef".split("");
      var EXTRA = [-2147483648, 8388608, 32768, 128];
      var SHIFT = [24, 16, 8, 0];
      var K = [
        1116352408,
        3609767458,
        1899447441,
        602891725,
        3049323471,
        3964484399,
        3921009573,
        2173295548,
        961987163,
        4081628472,
        1508970993,
        3053834265,
        2453635748,
        2937671579,
        2870763221,
        3664609560,
        3624381080,
        2734883394,
        310598401,
        1164996542,
        607225278,
        1323610764,
        1426881987,
        3590304994,
        1925078388,
        4068182383,
        2162078206,
        991336113,
        2614888103,
        633803317,
        3248222580,
        3479774868,
        3835390401,
        2666613458,
        4022224774,
        944711139,
        264347078,
        2341262773,
        604807628,
        2007800933,
        770255983,
        1495990901,
        1249150122,
        1856431235,
        1555081692,
        3175218132,
        1996064986,
        2198950837,
        2554220882,
        3999719339,
        2821834349,
        766784016,
        2952996808,
        2566594879,
        3210313671,
        3203337956,
        3336571891,
        1034457026,
        3584528711,
        2466948901,
        113926993,
        3758326383,
        338241895,
        168717936,
        666307205,
        1188179964,
        773529912,
        1546045734,
        1294757372,
        1522805485,
        1396182291,
        2643833823,
        1695183700,
        2343527390,
        1986661051,
        1014477480,
        2177026350,
        1206759142,
        2456956037,
        344077627,
        2730485921,
        1290863460,
        2820302411,
        3158454273,
        3259730800,
        3505952657,
        3345764771,
        106217008,
        3516065817,
        3606008344,
        3600352804,
        1432725776,
        4094571909,
        1467031594,
        275423344,
        851169720,
        430227734,
        3100823752,
        506948616,
        1363258195,
        659060556,
        3750685593,
        883997877,
        3785050280,
        958139571,
        3318307427,
        1322822218,
        3812723403,
        1537002063,
        2003034995,
        1747873779,
        3602036899,
        1955562222,
        1575990012,
        2024104815,
        1125592928,
        2227730452,
        2716904306,
        2361852424,
        442776044,
        2428436474,
        593698344,
        2756734187,
        3733110249,
        3204031479,
        2999351573,
        3329325298,
        3815920427,
        3391569614,
        3928383900,
        3515267271,
        566280711,
        3940187606,
        3454069534,
        4118630271,
        4000239992,
        116418474,
        1914138554,
        174292421,
        2731055270,
        289380356,
        3203993006,
        460393269,
        320620315,
        685471733,
        587496836,
        852142971,
        1086792851,
        1017036298,
        365543100,
        1126000580,
        2618297676,
        1288033470,
        3409855158,
        1501505948,
        4234509866,
        1607167915,
        987167468,
        1816402316,
        1246189591
      ];
      var OUTPUT_TYPES = ["hex", "array", "digest", "arrayBuffer"];
      var blocks = [];
      if (root.JS_SHA512_NO_NODE_JS || !Array.isArray) {
        Array.isArray = function(obj) {
          return Object.prototype.toString.call(obj) === "[object Array]";
        };
      }
      if (ARRAY_BUFFER && (root.JS_SHA512_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView)) {
        ArrayBuffer.isView = function(obj) {
          return typeof obj === "object" && obj.buffer && obj.buffer.constructor === ArrayBuffer;
        };
      }
      var createOutputMethod = function(outputType, bits) {
        return function(message) {
          return new Sha512(bits, true).update(message)[outputType]();
        };
      };
      var createMethod = function(bits) {
        var method = createOutputMethod("hex", bits);
        method.create = function() {
          return new Sha512(bits);
        };
        method.update = function(message) {
          return method.create().update(message);
        };
        for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
          var type = OUTPUT_TYPES[i];
          method[type] = createOutputMethod(type, bits);
        }
        return method;
      };
      var createHmacOutputMethod = function(outputType, bits) {
        return function(key, message) {
          return new HmacSha512(key, bits, true).update(message)[outputType]();
        };
      };
      var createHmacMethod = function(bits) {
        var method = createHmacOutputMethod("hex", bits);
        method.create = function(key) {
          return new HmacSha512(key, bits);
        };
        method.update = function(key, message) {
          return method.create(key).update(message);
        };
        for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
          var type = OUTPUT_TYPES[i];
          method[type] = createHmacOutputMethod(type, bits);
        }
        return method;
      };
      function Sha512(bits, sharedMemory) {
        if (sharedMemory) {
          blocks[0] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = blocks[16] = blocks[17] = blocks[18] = blocks[19] = blocks[20] = blocks[21] = blocks[22] = blocks[23] = blocks[24] = blocks[25] = blocks[26] = blocks[27] = blocks[28] = blocks[29] = blocks[30] = blocks[31] = blocks[32] = 0;
          this.blocks = blocks;
        } else {
          this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
        if (bits == 384) {
          this.h0h = 3418070365;
          this.h0l = 3238371032;
          this.h1h = 1654270250;
          this.h1l = 914150663;
          this.h2h = 2438529370;
          this.h2l = 812702999;
          this.h3h = 355462360;
          this.h3l = 4144912697;
          this.h4h = 1731405415;
          this.h4l = 4290775857;
          this.h5h = 2394180231;
          this.h5l = 1750603025;
          this.h6h = 3675008525;
          this.h6l = 1694076839;
          this.h7h = 1203062813;
          this.h7l = 3204075428;
        } else if (bits == 256) {
          this.h0h = 573645204;
          this.h0l = 4230739756;
          this.h1h = 2673172387;
          this.h1l = 3360449730;
          this.h2h = 596883563;
          this.h2l = 1867755857;
          this.h3h = 2520282905;
          this.h3l = 1497426621;
          this.h4h = 2519219938;
          this.h4l = 2827943907;
          this.h5h = 3193839141;
          this.h5l = 1401305490;
          this.h6h = 721525244;
          this.h6l = 746961066;
          this.h7h = 246885852;
          this.h7l = 2177182882;
        } else if (bits == 224) {
          this.h0h = 2352822216;
          this.h0l = 424955298;
          this.h1h = 1944164710;
          this.h1l = 2312950998;
          this.h2h = 502970286;
          this.h2l = 855612546;
          this.h3h = 1738396948;
          this.h3l = 1479516111;
          this.h4h = 258812777;
          this.h4l = 2077511080;
          this.h5h = 2011393907;
          this.h5l = 79989058;
          this.h6h = 1067287976;
          this.h6l = 1780299464;
          this.h7h = 286451373;
          this.h7l = 2446758561;
        } else {
          this.h0h = 1779033703;
          this.h0l = 4089235720;
          this.h1h = 3144134277;
          this.h1l = 2227873595;
          this.h2h = 1013904242;
          this.h2l = 4271175723;
          this.h3h = 2773480762;
          this.h3l = 1595750129;
          this.h4h = 1359893119;
          this.h4l = 2917565137;
          this.h5h = 2600822924;
          this.h5l = 725511199;
          this.h6h = 528734635;
          this.h6l = 4215389547;
          this.h7h = 1541459225;
          this.h7l = 327033209;
        }
        this.bits = bits;
        this.block = this.start = this.bytes = this.hBytes = 0;
        this.finalized = this.hashed = false;
      }
      Sha512.prototype.update = function(message) {
        if (this.finalized) {
          throw new Error(FINALIZE_ERROR);
        }
        var notString, type = typeof message;
        if (type !== "string") {
          if (type === "object") {
            if (message === null) {
              throw new Error(INPUT_ERROR);
            } else if (ARRAY_BUFFER && message.constructor === ArrayBuffer) {
              message = new Uint8Array(message);
            } else if (!Array.isArray(message)) {
              if (!ARRAY_BUFFER || !ArrayBuffer.isView(message)) {
                throw new Error(INPUT_ERROR);
              }
            }
          } else {
            throw new Error(INPUT_ERROR);
          }
          notString = true;
        }
        var code, index = 0, i, length = message.length, blocks2 = this.blocks;
        while (index < length) {
          if (this.hashed) {
            this.hashed = false;
            blocks2[0] = this.block;
            blocks2[1] = blocks2[2] = blocks2[3] = blocks2[4] = blocks2[5] = blocks2[6] = blocks2[7] = blocks2[8] = blocks2[9] = blocks2[10] = blocks2[11] = blocks2[12] = blocks2[13] = blocks2[14] = blocks2[15] = blocks2[16] = blocks2[17] = blocks2[18] = blocks2[19] = blocks2[20] = blocks2[21] = blocks2[22] = blocks2[23] = blocks2[24] = blocks2[25] = blocks2[26] = blocks2[27] = blocks2[28] = blocks2[29] = blocks2[30] = blocks2[31] = blocks2[32] = 0;
          }
          if (notString) {
            for (i = this.start; index < length && i < 128; ++index) {
              blocks2[i >> 2] |= message[index] << SHIFT[i++ & 3];
            }
          } else {
            for (i = this.start; index < length && i < 128; ++index) {
              code = message.charCodeAt(index);
              if (code < 128) {
                blocks2[i >> 2] |= code << SHIFT[i++ & 3];
              } else if (code < 2048) {
                blocks2[i >> 2] |= (192 | code >> 6) << SHIFT[i++ & 3];
                blocks2[i >> 2] |= (128 | code & 63) << SHIFT[i++ & 3];
              } else if (code < 55296 || code >= 57344) {
                blocks2[i >> 2] |= (224 | code >> 12) << SHIFT[i++ & 3];
                blocks2[i >> 2] |= (128 | code >> 6 & 63) << SHIFT[i++ & 3];
                blocks2[i >> 2] |= (128 | code & 63) << SHIFT[i++ & 3];
              } else {
                code = 65536 + ((code & 1023) << 10 | message.charCodeAt(++index) & 1023);
                blocks2[i >> 2] |= (240 | code >> 18) << SHIFT[i++ & 3];
                blocks2[i >> 2] |= (128 | code >> 12 & 63) << SHIFT[i++ & 3];
                blocks2[i >> 2] |= (128 | code >> 6 & 63) << SHIFT[i++ & 3];
                blocks2[i >> 2] |= (128 | code & 63) << SHIFT[i++ & 3];
              }
            }
          }
          this.lastByteIndex = i;
          this.bytes += i - this.start;
          if (i >= 128) {
            this.block = blocks2[32];
            this.start = i - 128;
            this.hash();
            this.hashed = true;
          } else {
            this.start = i;
          }
        }
        if (this.bytes > 4294967295) {
          this.hBytes += this.bytes / 4294967296 << 0;
          this.bytes = this.bytes % 4294967296;
        }
        return this;
      };
      Sha512.prototype.finalize = function() {
        if (this.finalized) {
          return;
        }
        this.finalized = true;
        var blocks2 = this.blocks, i = this.lastByteIndex;
        blocks2[32] = this.block;
        blocks2[i >> 2] |= EXTRA[i & 3];
        this.block = blocks2[32];
        if (i >= 112) {
          if (!this.hashed) {
            this.hash();
          }
          blocks2[0] = this.block;
          blocks2[1] = blocks2[2] = blocks2[3] = blocks2[4] = blocks2[5] = blocks2[6] = blocks2[7] = blocks2[8] = blocks2[9] = blocks2[10] = blocks2[11] = blocks2[12] = blocks2[13] = blocks2[14] = blocks2[15] = blocks2[16] = blocks2[17] = blocks2[18] = blocks2[19] = blocks2[20] = blocks2[21] = blocks2[22] = blocks2[23] = blocks2[24] = blocks2[25] = blocks2[26] = blocks2[27] = blocks2[28] = blocks2[29] = blocks2[30] = blocks2[31] = blocks2[32] = 0;
        }
        blocks2[30] = this.hBytes << 3 | this.bytes >>> 29;
        blocks2[31] = this.bytes << 3;
        this.hash();
      };
      Sha512.prototype.hash = function() {
        var h0h = this.h0h, h0l = this.h0l, h1h = this.h1h, h1l = this.h1l, h2h = this.h2h, h2l = this.h2l, h3h = this.h3h, h3l = this.h3l, h4h = this.h4h, h4l = this.h4l, h5h = this.h5h, h5l = this.h5l, h6h = this.h6h, h6l = this.h6l, h7h = this.h7h, h7l = this.h7l, blocks2 = this.blocks, j, s0h, s0l, s1h, s1l, c1, c2, c3, c4, abh, abl, dah, dal, cdh, cdl, bch, bcl, majh, majl, t1h, t1l, t2h, t2l, chh, chl;
        for (j = 32; j < 160; j += 2) {
          t1h = blocks2[j - 30];
          t1l = blocks2[j - 29];
          s0h = (t1h >>> 1 | t1l << 31) ^ (t1h >>> 8 | t1l << 24) ^ t1h >>> 7;
          s0l = (t1l >>> 1 | t1h << 31) ^ (t1l >>> 8 | t1h << 24) ^ (t1l >>> 7 | t1h << 25);
          t1h = blocks2[j - 4];
          t1l = blocks2[j - 3];
          s1h = (t1h >>> 19 | t1l << 13) ^ (t1l >>> 29 | t1h << 3) ^ t1h >>> 6;
          s1l = (t1l >>> 19 | t1h << 13) ^ (t1h >>> 29 | t1l << 3) ^ (t1l >>> 6 | t1h << 26);
          t1h = blocks2[j - 32];
          t1l = blocks2[j - 31];
          t2h = blocks2[j - 14];
          t2l = blocks2[j - 13];
          c1 = (t2l & 65535) + (t1l & 65535) + (s0l & 65535) + (s1l & 65535);
          c2 = (t2l >>> 16) + (t1l >>> 16) + (s0l >>> 16) + (s1l >>> 16) + (c1 >>> 16);
          c3 = (t2h & 65535) + (t1h & 65535) + (s0h & 65535) + (s1h & 65535) + (c2 >>> 16);
          c4 = (t2h >>> 16) + (t1h >>> 16) + (s0h >>> 16) + (s1h >>> 16) + (c3 >>> 16);
          blocks2[j] = c4 << 16 | c3 & 65535;
          blocks2[j + 1] = c2 << 16 | c1 & 65535;
        }
        var ah = h0h, al = h0l, bh = h1h, bl = h1l, ch = h2h, cl = h2l, dh = h3h, dl = h3l, eh = h4h, el = h4l, fh = h5h, fl = h5l, gh = h6h, gl = h6l, hh = h7h, hl = h7l;
        bch = bh & ch;
        bcl = bl & cl;
        for (j = 0; j < 160; j += 8) {
          s0h = (ah >>> 28 | al << 4) ^ (al >>> 2 | ah << 30) ^ (al >>> 7 | ah << 25);
          s0l = (al >>> 28 | ah << 4) ^ (ah >>> 2 | al << 30) ^ (ah >>> 7 | al << 25);
          s1h = (eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (el >>> 9 | eh << 23);
          s1l = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (eh >>> 9 | el << 23);
          abh = ah & bh;
          abl = al & bl;
          majh = abh ^ ah & ch ^ bch;
          majl = abl ^ al & cl ^ bcl;
          chh = eh & fh ^ ~eh & gh;
          chl = el & fl ^ ~el & gl;
          t1h = blocks2[j];
          t1l = blocks2[j + 1];
          t2h = K[j];
          t2l = K[j + 1];
          c1 = (t2l & 65535) + (t1l & 65535) + (chl & 65535) + (s1l & 65535) + (hl & 65535);
          c2 = (t2l >>> 16) + (t1l >>> 16) + (chl >>> 16) + (s1l >>> 16) + (hl >>> 16) + (c1 >>> 16);
          c3 = (t2h & 65535) + (t1h & 65535) + (chh & 65535) + (s1h & 65535) + (hh & 65535) + (c2 >>> 16);
          c4 = (t2h >>> 16) + (t1h >>> 16) + (chh >>> 16) + (s1h >>> 16) + (hh >>> 16) + (c3 >>> 16);
          t1h = c4 << 16 | c3 & 65535;
          t1l = c2 << 16 | c1 & 65535;
          c1 = (majl & 65535) + (s0l & 65535);
          c2 = (majl >>> 16) + (s0l >>> 16) + (c1 >>> 16);
          c3 = (majh & 65535) + (s0h & 65535) + (c2 >>> 16);
          c4 = (majh >>> 16) + (s0h >>> 16) + (c3 >>> 16);
          t2h = c4 << 16 | c3 & 65535;
          t2l = c2 << 16 | c1 & 65535;
          c1 = (dl & 65535) + (t1l & 65535);
          c2 = (dl >>> 16) + (t1l >>> 16) + (c1 >>> 16);
          c3 = (dh & 65535) + (t1h & 65535) + (c2 >>> 16);
          c4 = (dh >>> 16) + (t1h >>> 16) + (c3 >>> 16);
          hh = c4 << 16 | c3 & 65535;
          hl = c2 << 16 | c1 & 65535;
          c1 = (t2l & 65535) + (t1l & 65535);
          c2 = (t2l >>> 16) + (t1l >>> 16) + (c1 >>> 16);
          c3 = (t2h & 65535) + (t1h & 65535) + (c2 >>> 16);
          c4 = (t2h >>> 16) + (t1h >>> 16) + (c3 >>> 16);
          dh = c4 << 16 | c3 & 65535;
          dl = c2 << 16 | c1 & 65535;
          s0h = (dh >>> 28 | dl << 4) ^ (dl >>> 2 | dh << 30) ^ (dl >>> 7 | dh << 25);
          s0l = (dl >>> 28 | dh << 4) ^ (dh >>> 2 | dl << 30) ^ (dh >>> 7 | dl << 25);
          s1h = (hh >>> 14 | hl << 18) ^ (hh >>> 18 | hl << 14) ^ (hl >>> 9 | hh << 23);
          s1l = (hl >>> 14 | hh << 18) ^ (hl >>> 18 | hh << 14) ^ (hh >>> 9 | hl << 23);
          dah = dh & ah;
          dal = dl & al;
          majh = dah ^ dh & bh ^ abh;
          majl = dal ^ dl & bl ^ abl;
          chh = hh & eh ^ ~hh & fh;
          chl = hl & el ^ ~hl & fl;
          t1h = blocks2[j + 2];
          t1l = blocks2[j + 3];
          t2h = K[j + 2];
          t2l = K[j + 3];
          c1 = (t2l & 65535) + (t1l & 65535) + (chl & 65535) + (s1l & 65535) + (gl & 65535);
          c2 = (t2l >>> 16) + (t1l >>> 16) + (chl >>> 16) + (s1l >>> 16) + (gl >>> 16) + (c1 >>> 16);
          c3 = (t2h & 65535) + (t1h & 65535) + (chh & 65535) + (s1h & 65535) + (gh & 65535) + (c2 >>> 16);
          c4 = (t2h >>> 16) + (t1h >>> 16) + (chh >>> 16) + (s1h >>> 16) + (gh >>> 16) + (c3 >>> 16);
          t1h = c4 << 16 | c3 & 65535;
          t1l = c2 << 16 | c1 & 65535;
          c1 = (majl & 65535) + (s0l & 65535);
          c2 = (majl >>> 16) + (s0l >>> 16) + (c1 >>> 16);
          c3 = (majh & 65535) + (s0h & 65535) + (c2 >>> 16);
          c4 = (majh >>> 16) + (s0h >>> 16) + (c3 >>> 16);
          t2h = c4 << 16 | c3 & 65535;
          t2l = c2 << 16 | c1 & 65535;
          c1 = (cl & 65535) + (t1l & 65535);
          c2 = (cl >>> 16) + (t1l >>> 16) + (c1 >>> 16);
          c3 = (ch & 65535) + (t1h & 65535) + (c2 >>> 16);
          c4 = (ch >>> 16) + (t1h >>> 16) + (c3 >>> 16);
          gh = c4 << 16 | c3 & 65535;
          gl = c2 << 16 | c1 & 65535;
          c1 = (t2l & 65535) + (t1l & 65535);
          c2 = (t2l >>> 16) + (t1l >>> 16) + (c1 >>> 16);
          c3 = (t2h & 65535) + (t1h & 65535) + (c2 >>> 16);
          c4 = (t2h >>> 16) + (t1h >>> 16) + (c3 >>> 16);
          ch = c4 << 16 | c3 & 65535;
          cl = c2 << 16 | c1 & 65535;
          s0h = (ch >>> 28 | cl << 4) ^ (cl >>> 2 | ch << 30) ^ (cl >>> 7 | ch << 25);
          s0l = (cl >>> 28 | ch << 4) ^ (ch >>> 2 | cl << 30) ^ (ch >>> 7 | cl << 25);
          s1h = (gh >>> 14 | gl << 18) ^ (gh >>> 18 | gl << 14) ^ (gl >>> 9 | gh << 23);
          s1l = (gl >>> 14 | gh << 18) ^ (gl >>> 18 | gh << 14) ^ (gh >>> 9 | gl << 23);
          cdh = ch & dh;
          cdl = cl & dl;
          majh = cdh ^ ch & ah ^ dah;
          majl = cdl ^ cl & al ^ dal;
          chh = gh & hh ^ ~gh & eh;
          chl = gl & hl ^ ~gl & el;
          t1h = blocks2[j + 4];
          t1l = blocks2[j + 5];
          t2h = K[j + 4];
          t2l = K[j + 5];
          c1 = (t2l & 65535) + (t1l & 65535) + (chl & 65535) + (s1l & 65535) + (fl & 65535);
          c2 = (t2l >>> 16) + (t1l >>> 16) + (chl >>> 16) + (s1l >>> 16) + (fl >>> 16) + (c1 >>> 16);
          c3 = (t2h & 65535) + (t1h & 65535) + (chh & 65535) + (s1h & 65535) + (fh & 65535) + (c2 >>> 16);
          c4 = (t2h >>> 16) + (t1h >>> 16) + (chh >>> 16) + (s1h >>> 16) + (fh >>> 16) + (c3 >>> 16);
          t1h = c4 << 16 | c3 & 65535;
          t1l = c2 << 16 | c1 & 65535;
          c1 = (majl & 65535) + (s0l & 65535);
          c2 = (majl >>> 16) + (s0l >>> 16) + (c1 >>> 16);
          c3 = (majh & 65535) + (s0h & 65535) + (c2 >>> 16);
          c4 = (majh >>> 16) + (s0h >>> 16) + (c3 >>> 16);
          t2h = c4 << 16 | c3 & 65535;
          t2l = c2 << 16 | c1 & 65535;
          c1 = (bl & 65535) + (t1l & 65535);
          c2 = (bl >>> 16) + (t1l >>> 16) + (c1 >>> 16);
          c3 = (bh & 65535) + (t1h & 65535) + (c2 >>> 16);
          c4 = (bh >>> 16) + (t1h >>> 16) + (c3 >>> 16);
          fh = c4 << 16 | c3 & 65535;
          fl = c2 << 16 | c1 & 65535;
          c1 = (t2l & 65535) + (t1l & 65535);
          c2 = (t2l >>> 16) + (t1l >>> 16) + (c1 >>> 16);
          c3 = (t2h & 65535) + (t1h & 65535) + (c2 >>> 16);
          c4 = (t2h >>> 16) + (t1h >>> 16) + (c3 >>> 16);
          bh = c4 << 16 | c3 & 65535;
          bl = c2 << 16 | c1 & 65535;
          s0h = (bh >>> 28 | bl << 4) ^ (bl >>> 2 | bh << 30) ^ (bl >>> 7 | bh << 25);
          s0l = (bl >>> 28 | bh << 4) ^ (bh >>> 2 | bl << 30) ^ (bh >>> 7 | bl << 25);
          s1h = (fh >>> 14 | fl << 18) ^ (fh >>> 18 | fl << 14) ^ (fl >>> 9 | fh << 23);
          s1l = (fl >>> 14 | fh << 18) ^ (fl >>> 18 | fh << 14) ^ (fh >>> 9 | fl << 23);
          bch = bh & ch;
          bcl = bl & cl;
          majh = bch ^ bh & dh ^ cdh;
          majl = bcl ^ bl & dl ^ cdl;
          chh = fh & gh ^ ~fh & hh;
          chl = fl & gl ^ ~fl & hl;
          t1h = blocks2[j + 6];
          t1l = blocks2[j + 7];
          t2h = K[j + 6];
          t2l = K[j + 7];
          c1 = (t2l & 65535) + (t1l & 65535) + (chl & 65535) + (s1l & 65535) + (el & 65535);
          c2 = (t2l >>> 16) + (t1l >>> 16) + (chl >>> 16) + (s1l >>> 16) + (el >>> 16) + (c1 >>> 16);
          c3 = (t2h & 65535) + (t1h & 65535) + (chh & 65535) + (s1h & 65535) + (eh & 65535) + (c2 >>> 16);
          c4 = (t2h >>> 16) + (t1h >>> 16) + (chh >>> 16) + (s1h >>> 16) + (eh >>> 16) + (c3 >>> 16);
          t1h = c4 << 16 | c3 & 65535;
          t1l = c2 << 16 | c1 & 65535;
          c1 = (majl & 65535) + (s0l & 65535);
          c2 = (majl >>> 16) + (s0l >>> 16) + (c1 >>> 16);
          c3 = (majh & 65535) + (s0h & 65535) + (c2 >>> 16);
          c4 = (majh >>> 16) + (s0h >>> 16) + (c3 >>> 16);
          t2h = c4 << 16 | c3 & 65535;
          t2l = c2 << 16 | c1 & 65535;
          c1 = (al & 65535) + (t1l & 65535);
          c2 = (al >>> 16) + (t1l >>> 16) + (c1 >>> 16);
          c3 = (ah & 65535) + (t1h & 65535) + (c2 >>> 16);
          c4 = (ah >>> 16) + (t1h >>> 16) + (c3 >>> 16);
          eh = c4 << 16 | c3 & 65535;
          el = c2 << 16 | c1 & 65535;
          c1 = (t2l & 65535) + (t1l & 65535);
          c2 = (t2l >>> 16) + (t1l >>> 16) + (c1 >>> 16);
          c3 = (t2h & 65535) + (t1h & 65535) + (c2 >>> 16);
          c4 = (t2h >>> 16) + (t1h >>> 16) + (c3 >>> 16);
          ah = c4 << 16 | c3 & 65535;
          al = c2 << 16 | c1 & 65535;
        }
        c1 = (h0l & 65535) + (al & 65535);
        c2 = (h0l >>> 16) + (al >>> 16) + (c1 >>> 16);
        c3 = (h0h & 65535) + (ah & 65535) + (c2 >>> 16);
        c4 = (h0h >>> 16) + (ah >>> 16) + (c3 >>> 16);
        this.h0h = c4 << 16 | c3 & 65535;
        this.h0l = c2 << 16 | c1 & 65535;
        c1 = (h1l & 65535) + (bl & 65535);
        c2 = (h1l >>> 16) + (bl >>> 16) + (c1 >>> 16);
        c3 = (h1h & 65535) + (bh & 65535) + (c2 >>> 16);
        c4 = (h1h >>> 16) + (bh >>> 16) + (c3 >>> 16);
        this.h1h = c4 << 16 | c3 & 65535;
        this.h1l = c2 << 16 | c1 & 65535;
        c1 = (h2l & 65535) + (cl & 65535);
        c2 = (h2l >>> 16) + (cl >>> 16) + (c1 >>> 16);
        c3 = (h2h & 65535) + (ch & 65535) + (c2 >>> 16);
        c4 = (h2h >>> 16) + (ch >>> 16) + (c3 >>> 16);
        this.h2h = c4 << 16 | c3 & 65535;
        this.h2l = c2 << 16 | c1 & 65535;
        c1 = (h3l & 65535) + (dl & 65535);
        c2 = (h3l >>> 16) + (dl >>> 16) + (c1 >>> 16);
        c3 = (h3h & 65535) + (dh & 65535) + (c2 >>> 16);
        c4 = (h3h >>> 16) + (dh >>> 16) + (c3 >>> 16);
        this.h3h = c4 << 16 | c3 & 65535;
        this.h3l = c2 << 16 | c1 & 65535;
        c1 = (h4l & 65535) + (el & 65535);
        c2 = (h4l >>> 16) + (el >>> 16) + (c1 >>> 16);
        c3 = (h4h & 65535) + (eh & 65535) + (c2 >>> 16);
        c4 = (h4h >>> 16) + (eh >>> 16) + (c3 >>> 16);
        this.h4h = c4 << 16 | c3 & 65535;
        this.h4l = c2 << 16 | c1 & 65535;
        c1 = (h5l & 65535) + (fl & 65535);
        c2 = (h5l >>> 16) + (fl >>> 16) + (c1 >>> 16);
        c3 = (h5h & 65535) + (fh & 65535) + (c2 >>> 16);
        c4 = (h5h >>> 16) + (fh >>> 16) + (c3 >>> 16);
        this.h5h = c4 << 16 | c3 & 65535;
        this.h5l = c2 << 16 | c1 & 65535;
        c1 = (h6l & 65535) + (gl & 65535);
        c2 = (h6l >>> 16) + (gl >>> 16) + (c1 >>> 16);
        c3 = (h6h & 65535) + (gh & 65535) + (c2 >>> 16);
        c4 = (h6h >>> 16) + (gh >>> 16) + (c3 >>> 16);
        this.h6h = c4 << 16 | c3 & 65535;
        this.h6l = c2 << 16 | c1 & 65535;
        c1 = (h7l & 65535) + (hl & 65535);
        c2 = (h7l >>> 16) + (hl >>> 16) + (c1 >>> 16);
        c3 = (h7h & 65535) + (hh & 65535) + (c2 >>> 16);
        c4 = (h7h >>> 16) + (hh >>> 16) + (c3 >>> 16);
        this.h7h = c4 << 16 | c3 & 65535;
        this.h7l = c2 << 16 | c1 & 65535;
      };
      Sha512.prototype.hex = function() {
        this.finalize();
        var h0h = this.h0h, h0l = this.h0l, h1h = this.h1h, h1l = this.h1l, h2h = this.h2h, h2l = this.h2l, h3h = this.h3h, h3l = this.h3l, h4h = this.h4h, h4l = this.h4l, h5h = this.h5h, h5l = this.h5l, h6h = this.h6h, h6l = this.h6l, h7h = this.h7h, h7l = this.h7l, bits = this.bits;
        var hex = HEX_CHARS[h0h >> 28 & 15] + HEX_CHARS[h0h >> 24 & 15] + HEX_CHARS[h0h >> 20 & 15] + HEX_CHARS[h0h >> 16 & 15] + HEX_CHARS[h0h >> 12 & 15] + HEX_CHARS[h0h >> 8 & 15] + HEX_CHARS[h0h >> 4 & 15] + HEX_CHARS[h0h & 15] + HEX_CHARS[h0l >> 28 & 15] + HEX_CHARS[h0l >> 24 & 15] + HEX_CHARS[h0l >> 20 & 15] + HEX_CHARS[h0l >> 16 & 15] + HEX_CHARS[h0l >> 12 & 15] + HEX_CHARS[h0l >> 8 & 15] + HEX_CHARS[h0l >> 4 & 15] + HEX_CHARS[h0l & 15] + HEX_CHARS[h1h >> 28 & 15] + HEX_CHARS[h1h >> 24 & 15] + HEX_CHARS[h1h >> 20 & 15] + HEX_CHARS[h1h >> 16 & 15] + HEX_CHARS[h1h >> 12 & 15] + HEX_CHARS[h1h >> 8 & 15] + HEX_CHARS[h1h >> 4 & 15] + HEX_CHARS[h1h & 15] + HEX_CHARS[h1l >> 28 & 15] + HEX_CHARS[h1l >> 24 & 15] + HEX_CHARS[h1l >> 20 & 15] + HEX_CHARS[h1l >> 16 & 15] + HEX_CHARS[h1l >> 12 & 15] + HEX_CHARS[h1l >> 8 & 15] + HEX_CHARS[h1l >> 4 & 15] + HEX_CHARS[h1l & 15] + HEX_CHARS[h2h >> 28 & 15] + HEX_CHARS[h2h >> 24 & 15] + HEX_CHARS[h2h >> 20 & 15] + HEX_CHARS[h2h >> 16 & 15] + HEX_CHARS[h2h >> 12 & 15] + HEX_CHARS[h2h >> 8 & 15] + HEX_CHARS[h2h >> 4 & 15] + HEX_CHARS[h2h & 15] + HEX_CHARS[h2l >> 28 & 15] + HEX_CHARS[h2l >> 24 & 15] + HEX_CHARS[h2l >> 20 & 15] + HEX_CHARS[h2l >> 16 & 15] + HEX_CHARS[h2l >> 12 & 15] + HEX_CHARS[h2l >> 8 & 15] + HEX_CHARS[h2l >> 4 & 15] + HEX_CHARS[h2l & 15] + HEX_CHARS[h3h >> 28 & 15] + HEX_CHARS[h3h >> 24 & 15] + HEX_CHARS[h3h >> 20 & 15] + HEX_CHARS[h3h >> 16 & 15] + HEX_CHARS[h3h >> 12 & 15] + HEX_CHARS[h3h >> 8 & 15] + HEX_CHARS[h3h >> 4 & 15] + HEX_CHARS[h3h & 15];
        if (bits >= 256) {
          hex += HEX_CHARS[h3l >> 28 & 15] + HEX_CHARS[h3l >> 24 & 15] + HEX_CHARS[h3l >> 20 & 15] + HEX_CHARS[h3l >> 16 & 15] + HEX_CHARS[h3l >> 12 & 15] + HEX_CHARS[h3l >> 8 & 15] + HEX_CHARS[h3l >> 4 & 15] + HEX_CHARS[h3l & 15];
        }
        if (bits >= 384) {
          hex += HEX_CHARS[h4h >> 28 & 15] + HEX_CHARS[h4h >> 24 & 15] + HEX_CHARS[h4h >> 20 & 15] + HEX_CHARS[h4h >> 16 & 15] + HEX_CHARS[h4h >> 12 & 15] + HEX_CHARS[h4h >> 8 & 15] + HEX_CHARS[h4h >> 4 & 15] + HEX_CHARS[h4h & 15] + HEX_CHARS[h4l >> 28 & 15] + HEX_CHARS[h4l >> 24 & 15] + HEX_CHARS[h4l >> 20 & 15] + HEX_CHARS[h4l >> 16 & 15] + HEX_CHARS[h4l >> 12 & 15] + HEX_CHARS[h4l >> 8 & 15] + HEX_CHARS[h4l >> 4 & 15] + HEX_CHARS[h4l & 15] + HEX_CHARS[h5h >> 28 & 15] + HEX_CHARS[h5h >> 24 & 15] + HEX_CHARS[h5h >> 20 & 15] + HEX_CHARS[h5h >> 16 & 15] + HEX_CHARS[h5h >> 12 & 15] + HEX_CHARS[h5h >> 8 & 15] + HEX_CHARS[h5h >> 4 & 15] + HEX_CHARS[h5h & 15] + HEX_CHARS[h5l >> 28 & 15] + HEX_CHARS[h5l >> 24 & 15] + HEX_CHARS[h5l >> 20 & 15] + HEX_CHARS[h5l >> 16 & 15] + HEX_CHARS[h5l >> 12 & 15] + HEX_CHARS[h5l >> 8 & 15] + HEX_CHARS[h5l >> 4 & 15] + HEX_CHARS[h5l & 15];
        }
        if (bits == 512) {
          hex += HEX_CHARS[h6h >> 28 & 15] + HEX_CHARS[h6h >> 24 & 15] + HEX_CHARS[h6h >> 20 & 15] + HEX_CHARS[h6h >> 16 & 15] + HEX_CHARS[h6h >> 12 & 15] + HEX_CHARS[h6h >> 8 & 15] + HEX_CHARS[h6h >> 4 & 15] + HEX_CHARS[h6h & 15] + HEX_CHARS[h6l >> 28 & 15] + HEX_CHARS[h6l >> 24 & 15] + HEX_CHARS[h6l >> 20 & 15] + HEX_CHARS[h6l >> 16 & 15] + HEX_CHARS[h6l >> 12 & 15] + HEX_CHARS[h6l >> 8 & 15] + HEX_CHARS[h6l >> 4 & 15] + HEX_CHARS[h6l & 15] + HEX_CHARS[h7h >> 28 & 15] + HEX_CHARS[h7h >> 24 & 15] + HEX_CHARS[h7h >> 20 & 15] + HEX_CHARS[h7h >> 16 & 15] + HEX_CHARS[h7h >> 12 & 15] + HEX_CHARS[h7h >> 8 & 15] + HEX_CHARS[h7h >> 4 & 15] + HEX_CHARS[h7h & 15] + HEX_CHARS[h7l >> 28 & 15] + HEX_CHARS[h7l >> 24 & 15] + HEX_CHARS[h7l >> 20 & 15] + HEX_CHARS[h7l >> 16 & 15] + HEX_CHARS[h7l >> 12 & 15] + HEX_CHARS[h7l >> 8 & 15] + HEX_CHARS[h7l >> 4 & 15] + HEX_CHARS[h7l & 15];
        }
        return hex;
      };
      Sha512.prototype.toString = Sha512.prototype.hex;
      Sha512.prototype.digest = function() {
        this.finalize();
        var h0h = this.h0h, h0l = this.h0l, h1h = this.h1h, h1l = this.h1l, h2h = this.h2h, h2l = this.h2l, h3h = this.h3h, h3l = this.h3l, h4h = this.h4h, h4l = this.h4l, h5h = this.h5h, h5l = this.h5l, h6h = this.h6h, h6l = this.h6l, h7h = this.h7h, h7l = this.h7l, bits = this.bits;
        var arr = [
          h0h >> 24 & 255,
          h0h >> 16 & 255,
          h0h >> 8 & 255,
          h0h & 255,
          h0l >> 24 & 255,
          h0l >> 16 & 255,
          h0l >> 8 & 255,
          h0l & 255,
          h1h >> 24 & 255,
          h1h >> 16 & 255,
          h1h >> 8 & 255,
          h1h & 255,
          h1l >> 24 & 255,
          h1l >> 16 & 255,
          h1l >> 8 & 255,
          h1l & 255,
          h2h >> 24 & 255,
          h2h >> 16 & 255,
          h2h >> 8 & 255,
          h2h & 255,
          h2l >> 24 & 255,
          h2l >> 16 & 255,
          h2l >> 8 & 255,
          h2l & 255,
          h3h >> 24 & 255,
          h3h >> 16 & 255,
          h3h >> 8 & 255,
          h3h & 255
        ];
        if (bits >= 256) {
          arr.push(h3l >> 24 & 255, h3l >> 16 & 255, h3l >> 8 & 255, h3l & 255);
        }
        if (bits >= 384) {
          arr.push(
            h4h >> 24 & 255,
            h4h >> 16 & 255,
            h4h >> 8 & 255,
            h4h & 255,
            h4l >> 24 & 255,
            h4l >> 16 & 255,
            h4l >> 8 & 255,
            h4l & 255,
            h5h >> 24 & 255,
            h5h >> 16 & 255,
            h5h >> 8 & 255,
            h5h & 255,
            h5l >> 24 & 255,
            h5l >> 16 & 255,
            h5l >> 8 & 255,
            h5l & 255
          );
        }
        if (bits == 512) {
          arr.push(
            h6h >> 24 & 255,
            h6h >> 16 & 255,
            h6h >> 8 & 255,
            h6h & 255,
            h6l >> 24 & 255,
            h6l >> 16 & 255,
            h6l >> 8 & 255,
            h6l & 255,
            h7h >> 24 & 255,
            h7h >> 16 & 255,
            h7h >> 8 & 255,
            h7h & 255,
            h7l >> 24 & 255,
            h7l >> 16 & 255,
            h7l >> 8 & 255,
            h7l & 255
          );
        }
        return arr;
      };
      Sha512.prototype.array = Sha512.prototype.digest;
      Sha512.prototype.arrayBuffer = function() {
        this.finalize();
        var bits = this.bits;
        var buffer = new ArrayBuffer(bits / 8);
        var dataView = new DataView(buffer);
        dataView.setUint32(0, this.h0h);
        dataView.setUint32(4, this.h0l);
        dataView.setUint32(8, this.h1h);
        dataView.setUint32(12, this.h1l);
        dataView.setUint32(16, this.h2h);
        dataView.setUint32(20, this.h2l);
        dataView.setUint32(24, this.h3h);
        if (bits >= 256) {
          dataView.setUint32(28, this.h3l);
        }
        if (bits >= 384) {
          dataView.setUint32(32, this.h4h);
          dataView.setUint32(36, this.h4l);
          dataView.setUint32(40, this.h5h);
          dataView.setUint32(44, this.h5l);
        }
        if (bits == 512) {
          dataView.setUint32(48, this.h6h);
          dataView.setUint32(52, this.h6l);
          dataView.setUint32(56, this.h7h);
          dataView.setUint32(60, this.h7l);
        }
        return buffer;
      };
      Sha512.prototype.clone = function() {
        var hash = new Sha512(this.bits, false);
        this.copyTo(hash);
        return hash;
      };
      Sha512.prototype.copyTo = function(hash) {
        var i = 0, attrs = [
          "h0h",
          "h0l",
          "h1h",
          "h1l",
          "h2h",
          "h2l",
          "h3h",
          "h3l",
          "h4h",
          "h4l",
          "h5h",
          "h5l",
          "h6h",
          "h6l",
          "h7h",
          "h7l",
          "start",
          "bytes",
          "hBytes",
          "finalized",
          "hashed",
          "lastByteIndex"
        ];
        for (i = 0; i < attrs.length; ++i) {
          hash[attrs[i]] = this[attrs[i]];
        }
        for (i = 0; i < this.blocks.length; ++i) {
          hash.blocks[i] = this.blocks[i];
        }
      };
      function HmacSha512(key, bits, sharedMemory) {
        var notString, type = typeof key;
        if (type !== "string") {
          if (type === "object") {
            if (key === null) {
              throw new Error(INPUT_ERROR);
            } else if (ARRAY_BUFFER && key.constructor === ArrayBuffer) {
              key = new Uint8Array(key);
            } else if (!Array.isArray(key)) {
              if (!ARRAY_BUFFER || !ArrayBuffer.isView(key)) {
                throw new Error(INPUT_ERROR);
              }
            }
          } else {
            throw new Error(INPUT_ERROR);
          }
          notString = true;
        }
        var length = key.length;
        if (!notString) {
          var bytes = [], length = key.length, index = 0, code;
          for (var i = 0; i < length; ++i) {
            code = key.charCodeAt(i);
            if (code < 128) {
              bytes[index++] = code;
            } else if (code < 2048) {
              bytes[index++] = 192 | code >> 6;
              bytes[index++] = 128 | code & 63;
            } else if (code < 55296 || code >= 57344) {
              bytes[index++] = 224 | code >> 12;
              bytes[index++] = 128 | code >> 6 & 63;
              bytes[index++] = 128 | code & 63;
            } else {
              code = 65536 + ((code & 1023) << 10 | key.charCodeAt(++i) & 1023);
              bytes[index++] = 240 | code >> 18;
              bytes[index++] = 128 | code >> 12 & 63;
              bytes[index++] = 128 | code >> 6 & 63;
              bytes[index++] = 128 | code & 63;
            }
          }
          key = bytes;
        }
        if (key.length > 128) {
          key = new Sha512(bits, true).update(key).array();
        }
        var oKeyPad = [], iKeyPad = [];
        for (var i = 0; i < 128; ++i) {
          var b = key[i] || 0;
          oKeyPad[i] = 92 ^ b;
          iKeyPad[i] = 54 ^ b;
        }
        Sha512.call(this, bits, sharedMemory);
        this.update(iKeyPad);
        this.oKeyPad = oKeyPad;
        this.inner = true;
        this.sharedMemory = sharedMemory;
      }
      HmacSha512.prototype = new Sha512();
      HmacSha512.prototype.finalize = function() {
        Sha512.prototype.finalize.call(this);
        if (this.inner) {
          this.inner = false;
          var innerHash = this.array();
          Sha512.call(this, this.bits, this.sharedMemory);
          this.update(this.oKeyPad);
          this.update(innerHash);
          Sha512.prototype.finalize.call(this);
        }
      };
      HmacSha512.prototype.clone = function() {
        var hash = new HmacSha512([], this.bits, false);
        this.copyTo(hash);
        hash.inner = this.inner;
        for (var i = 0; i < this.oKeyPad.length; ++i) {
          hash.oKeyPad[i] = this.oKeyPad[i];
        }
        return hash;
      };
      var exports3 = createMethod(512);
      exports3.sha512 = exports3;
      exports3.sha384 = createMethod(384);
      exports3.sha512_256 = createMethod(256);
      exports3.sha512_224 = createMethod(224);
      exports3.sha512.hmac = createHmacMethod(512);
      exports3.sha384.hmac = createHmacMethod(384);
      exports3.sha512_256.hmac = createHmacMethod(256);
      exports3.sha512_224.hmac = createHmacMethod(224);
      if (COMMON_JS) {
        module.exports = exports3;
      } else {
        root.sha512 = exports3.sha512;
        root.sha384 = exports3.sha384;
        root.sha512_256 = exports3.sha512_256;
        root.sha512_224 = exports3.sha512_224;
        if (AMD) {
          define(function() {
            return exports3;
          });
        }
      }
    })();
  }
});

// node_modules/.pnpm/bignumber.js@9.1.2/node_modules/bignumber.js/bignumber.js
var require_bignumber = __commonJS({
  "node_modules/.pnpm/bignumber.js@9.1.2/node_modules/bignumber.js/bignumber.js"(exports2, module) {
    (function(globalObject) {
      "use strict";
      var BigNumber, isNumeric = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i, mathceil = Math.ceil, mathfloor = Math.floor, bignumberError = "[BigNumber Error] ", tooManyDigits = bignumberError + "Number primitive has more than 15 significant digits: ", BASE = 1e14, LOG_BASE = 14, MAX_SAFE_INTEGER = 9007199254740991, POWS_TEN = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13], SQRT_BASE = 1e7, MAX = 1e9;
      function clone(configObject) {
        var div, convertBase, parseNumeric, P = BigNumber2.prototype = { constructor: BigNumber2, toString: null, valueOf: null }, ONE = new BigNumber2(1), DECIMAL_PLACES = 20, ROUNDING_MODE = 4, TO_EXP_NEG = -7, TO_EXP_POS = 21, MIN_EXP = -1e7, MAX_EXP = 1e7, CRYPTO = false, MODULO_MODE = 1, POW_PRECISION = 0, FORMAT = {
          prefix: "",
          groupSize: 3,
          secondaryGroupSize: 0,
          groupSeparator: ",",
          decimalSeparator: ".",
          fractionGroupSize: 0,
          fractionGroupSeparator: "\xA0",
          // non-breaking space
          suffix: ""
        }, ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyz", alphabetHasNormalDecimalDigits = true;
        function BigNumber2(v, b) {
          var alphabet, c, caseChanged, e, i, isNum, len, str, x = this;
          if (!(x instanceof BigNumber2))
            return new BigNumber2(v, b);
          if (b == null) {
            if (v && v._isBigNumber === true) {
              x.s = v.s;
              if (!v.c || v.e > MAX_EXP) {
                x.c = x.e = null;
              } else if (v.e < MIN_EXP) {
                x.c = [x.e = 0];
              } else {
                x.e = v.e;
                x.c = v.c.slice();
              }
              return;
            }
            if ((isNum = typeof v == "number") && v * 0 == 0) {
              x.s = 1 / v < 0 ? (v = -v, -1) : 1;
              if (v === ~~v) {
                for (e = 0, i = v; i >= 10; i /= 10, e++)
                  ;
                if (e > MAX_EXP) {
                  x.c = x.e = null;
                } else {
                  x.e = e;
                  x.c = [v];
                }
                return;
              }
              str = String(v);
            } else {
              if (!isNumeric.test(str = String(v)))
                return parseNumeric(x, str, isNum);
              x.s = str.charCodeAt(0) == 45 ? (str = str.slice(1), -1) : 1;
            }
            if ((e = str.indexOf(".")) > -1)
              str = str.replace(".", "");
            if ((i = str.search(/e/i)) > 0) {
              if (e < 0)
                e = i;
              e += +str.slice(i + 1);
              str = str.substring(0, i);
            } else if (e < 0) {
              e = str.length;
            }
          } else {
            intCheck(b, 2, ALPHABET.length, "Base");
            if (b == 10 && alphabetHasNormalDecimalDigits) {
              x = new BigNumber2(v);
              return round(x, DECIMAL_PLACES + x.e + 1, ROUNDING_MODE);
            }
            str = String(v);
            if (isNum = typeof v == "number") {
              if (v * 0 != 0)
                return parseNumeric(x, str, isNum, b);
              x.s = 1 / v < 0 ? (str = str.slice(1), -1) : 1;
              if (BigNumber2.DEBUG && str.replace(/^0\.0*|\./, "").length > 15) {
                throw Error(tooManyDigits + v);
              }
            } else {
              x.s = str.charCodeAt(0) === 45 ? (str = str.slice(1), -1) : 1;
            }
            alphabet = ALPHABET.slice(0, b);
            e = i = 0;
            for (len = str.length; i < len; i++) {
              if (alphabet.indexOf(c = str.charAt(i)) < 0) {
                if (c == ".") {
                  if (i > e) {
                    e = len;
                    continue;
                  }
                } else if (!caseChanged) {
                  if (str == str.toUpperCase() && (str = str.toLowerCase()) || str == str.toLowerCase() && (str = str.toUpperCase())) {
                    caseChanged = true;
                    i = -1;
                    e = 0;
                    continue;
                  }
                }
                return parseNumeric(x, String(v), isNum, b);
              }
            }
            isNum = false;
            str = convertBase(str, b, 10, x.s);
            if ((e = str.indexOf(".")) > -1)
              str = str.replace(".", "");
            else
              e = str.length;
          }
          for (i = 0; str.charCodeAt(i) === 48; i++)
            ;
          for (len = str.length; str.charCodeAt(--len) === 48; )
            ;
          if (str = str.slice(i, ++len)) {
            len -= i;
            if (isNum && BigNumber2.DEBUG && len > 15 && (v > MAX_SAFE_INTEGER || v !== mathfloor(v))) {
              throw Error(tooManyDigits + x.s * v);
            }
            if ((e = e - i - 1) > MAX_EXP) {
              x.c = x.e = null;
            } else if (e < MIN_EXP) {
              x.c = [x.e = 0];
            } else {
              x.e = e;
              x.c = [];
              i = (e + 1) % LOG_BASE;
              if (e < 0)
                i += LOG_BASE;
              if (i < len) {
                if (i)
                  x.c.push(+str.slice(0, i));
                for (len -= LOG_BASE; i < len; ) {
                  x.c.push(+str.slice(i, i += LOG_BASE));
                }
                i = LOG_BASE - (str = str.slice(i)).length;
              } else {
                i -= len;
              }
              for (; i--; str += "0")
                ;
              x.c.push(+str);
            }
          } else {
            x.c = [x.e = 0];
          }
        }
        BigNumber2.clone = clone;
        BigNumber2.ROUND_UP = 0;
        BigNumber2.ROUND_DOWN = 1;
        BigNumber2.ROUND_CEIL = 2;
        BigNumber2.ROUND_FLOOR = 3;
        BigNumber2.ROUND_HALF_UP = 4;
        BigNumber2.ROUND_HALF_DOWN = 5;
        BigNumber2.ROUND_HALF_EVEN = 6;
        BigNumber2.ROUND_HALF_CEIL = 7;
        BigNumber2.ROUND_HALF_FLOOR = 8;
        BigNumber2.EUCLID = 9;
        BigNumber2.config = BigNumber2.set = function(obj) {
          var p, v;
          if (obj != null) {
            if (typeof obj == "object") {
              if (obj.hasOwnProperty(p = "DECIMAL_PLACES")) {
                v = obj[p];
                intCheck(v, 0, MAX, p);
                DECIMAL_PLACES = v;
              }
              if (obj.hasOwnProperty(p = "ROUNDING_MODE")) {
                v = obj[p];
                intCheck(v, 0, 8, p);
                ROUNDING_MODE = v;
              }
              if (obj.hasOwnProperty(p = "EXPONENTIAL_AT")) {
                v = obj[p];
                if (v && v.pop) {
                  intCheck(v[0], -MAX, 0, p);
                  intCheck(v[1], 0, MAX, p);
                  TO_EXP_NEG = v[0];
                  TO_EXP_POS = v[1];
                } else {
                  intCheck(v, -MAX, MAX, p);
                  TO_EXP_NEG = -(TO_EXP_POS = v < 0 ? -v : v);
                }
              }
              if (obj.hasOwnProperty(p = "RANGE")) {
                v = obj[p];
                if (v && v.pop) {
                  intCheck(v[0], -MAX, -1, p);
                  intCheck(v[1], 1, MAX, p);
                  MIN_EXP = v[0];
                  MAX_EXP = v[1];
                } else {
                  intCheck(v, -MAX, MAX, p);
                  if (v) {
                    MIN_EXP = -(MAX_EXP = v < 0 ? -v : v);
                  } else {
                    throw Error(bignumberError + p + " cannot be zero: " + v);
                  }
                }
              }
              if (obj.hasOwnProperty(p = "CRYPTO")) {
                v = obj[p];
                if (v === !!v) {
                  if (v) {
                    if (typeof crypto != "undefined" && crypto && (crypto.getRandomValues || crypto.randomBytes)) {
                      CRYPTO = v;
                    } else {
                      CRYPTO = !v;
                      throw Error(bignumberError + "crypto unavailable");
                    }
                  } else {
                    CRYPTO = v;
                  }
                } else {
                  throw Error(bignumberError + p + " not true or false: " + v);
                }
              }
              if (obj.hasOwnProperty(p = "MODULO_MODE")) {
                v = obj[p];
                intCheck(v, 0, 9, p);
                MODULO_MODE = v;
              }
              if (obj.hasOwnProperty(p = "POW_PRECISION")) {
                v = obj[p];
                intCheck(v, 0, MAX, p);
                POW_PRECISION = v;
              }
              if (obj.hasOwnProperty(p = "FORMAT")) {
                v = obj[p];
                if (typeof v == "object")
                  FORMAT = v;
                else
                  throw Error(bignumberError + p + " not an object: " + v);
              }
              if (obj.hasOwnProperty(p = "ALPHABET")) {
                v = obj[p];
                if (typeof v == "string" && !/^.?$|[+\-.\s]|(.).*\1/.test(v)) {
                  alphabetHasNormalDecimalDigits = v.slice(0, 10) == "0123456789";
                  ALPHABET = v;
                } else {
                  throw Error(bignumberError + p + " invalid: " + v);
                }
              }
            } else {
              throw Error(bignumberError + "Object expected: " + obj);
            }
          }
          return {
            DECIMAL_PLACES,
            ROUNDING_MODE,
            EXPONENTIAL_AT: [TO_EXP_NEG, TO_EXP_POS],
            RANGE: [MIN_EXP, MAX_EXP],
            CRYPTO,
            MODULO_MODE,
            POW_PRECISION,
            FORMAT,
            ALPHABET
          };
        };
        BigNumber2.isBigNumber = function(v) {
          if (!v || v._isBigNumber !== true)
            return false;
          if (!BigNumber2.DEBUG)
            return true;
          var i, n, c = v.c, e = v.e, s = v.s;
          out:
            if ({}.toString.call(c) == "[object Array]") {
              if ((s === 1 || s === -1) && e >= -MAX && e <= MAX && e === mathfloor(e)) {
                if (c[0] === 0) {
                  if (e === 0 && c.length === 1)
                    return true;
                  break out;
                }
                i = (e + 1) % LOG_BASE;
                if (i < 1)
                  i += LOG_BASE;
                if (String(c[0]).length == i) {
                  for (i = 0; i < c.length; i++) {
                    n = c[i];
                    if (n < 0 || n >= BASE || n !== mathfloor(n))
                      break out;
                  }
                  if (n !== 0)
                    return true;
                }
              }
            } else if (c === null && e === null && (s === null || s === 1 || s === -1)) {
              return true;
            }
          throw Error(bignumberError + "Invalid BigNumber: " + v);
        };
        BigNumber2.maximum = BigNumber2.max = function() {
          return maxOrMin(arguments, -1);
        };
        BigNumber2.minimum = BigNumber2.min = function() {
          return maxOrMin(arguments, 1);
        };
        BigNumber2.random = function() {
          var pow2_53 = 9007199254740992;
          var random53bitInt = Math.random() * pow2_53 & 2097151 ? function() {
            return mathfloor(Math.random() * pow2_53);
          } : function() {
            return (Math.random() * 1073741824 | 0) * 8388608 + (Math.random() * 8388608 | 0);
          };
          return function(dp) {
            var a, b, e, k, v, i = 0, c = [], rand = new BigNumber2(ONE);
            if (dp == null)
              dp = DECIMAL_PLACES;
            else
              intCheck(dp, 0, MAX);
            k = mathceil(dp / LOG_BASE);
            if (CRYPTO) {
              if (crypto.getRandomValues) {
                a = crypto.getRandomValues(new Uint32Array(k *= 2));
                for (; i < k; ) {
                  v = a[i] * 131072 + (a[i + 1] >>> 11);
                  if (v >= 9e15) {
                    b = crypto.getRandomValues(new Uint32Array(2));
                    a[i] = b[0];
                    a[i + 1] = b[1];
                  } else {
                    c.push(v % 1e14);
                    i += 2;
                  }
                }
                i = k / 2;
              } else if (crypto.randomBytes) {
                a = crypto.randomBytes(k *= 7);
                for (; i < k; ) {
                  v = (a[i] & 31) * 281474976710656 + a[i + 1] * 1099511627776 + a[i + 2] * 4294967296 + a[i + 3] * 16777216 + (a[i + 4] << 16) + (a[i + 5] << 8) + a[i + 6];
                  if (v >= 9e15) {
                    crypto.randomBytes(7).copy(a, i);
                  } else {
                    c.push(v % 1e14);
                    i += 7;
                  }
                }
                i = k / 7;
              } else {
                CRYPTO = false;
                throw Error(bignumberError + "crypto unavailable");
              }
            }
            if (!CRYPTO) {
              for (; i < k; ) {
                v = random53bitInt();
                if (v < 9e15)
                  c[i++] = v % 1e14;
              }
            }
            k = c[--i];
            dp %= LOG_BASE;
            if (k && dp) {
              v = POWS_TEN[LOG_BASE - dp];
              c[i] = mathfloor(k / v) * v;
            }
            for (; c[i] === 0; c.pop(), i--)
              ;
            if (i < 0) {
              c = [e = 0];
            } else {
              for (e = -1; c[0] === 0; c.splice(0, 1), e -= LOG_BASE)
                ;
              for (i = 1, v = c[0]; v >= 10; v /= 10, i++)
                ;
              if (i < LOG_BASE)
                e -= LOG_BASE - i;
            }
            rand.e = e;
            rand.c = c;
            return rand;
          };
        }();
        BigNumber2.sum = function() {
          var i = 1, args = arguments, sum = new BigNumber2(args[0]);
          for (; i < args.length; )
            sum = sum.plus(args[i++]);
          return sum;
        };
        convertBase = function() {
          var decimal = "0123456789";
          function toBaseOut(str, baseIn, baseOut, alphabet) {
            var j, arr = [0], arrL, i = 0, len = str.length;
            for (; i < len; ) {
              for (arrL = arr.length; arrL--; arr[arrL] *= baseIn)
                ;
              arr[0] += alphabet.indexOf(str.charAt(i++));
              for (j = 0; j < arr.length; j++) {
                if (arr[j] > baseOut - 1) {
                  if (arr[j + 1] == null)
                    arr[j + 1] = 0;
                  arr[j + 1] += arr[j] / baseOut | 0;
                  arr[j] %= baseOut;
                }
              }
            }
            return arr.reverse();
          }
          return function(str, baseIn, baseOut, sign2, callerIsToString) {
            var alphabet, d, e, k, r, x, xc, y, i = str.indexOf("."), dp = DECIMAL_PLACES, rm = ROUNDING_MODE;
            if (i >= 0) {
              k = POW_PRECISION;
              POW_PRECISION = 0;
              str = str.replace(".", "");
              y = new BigNumber2(baseIn);
              x = y.pow(str.length - i);
              POW_PRECISION = k;
              y.c = toBaseOut(
                toFixedPoint(coeffToString(x.c), x.e, "0"),
                10,
                baseOut,
                decimal
              );
              y.e = y.c.length;
            }
            xc = toBaseOut(str, baseIn, baseOut, callerIsToString ? (alphabet = ALPHABET, decimal) : (alphabet = decimal, ALPHABET));
            e = k = xc.length;
            for (; xc[--k] == 0; xc.pop())
              ;
            if (!xc[0])
              return alphabet.charAt(0);
            if (i < 0) {
              --e;
            } else {
              x.c = xc;
              x.e = e;
              x.s = sign2;
              x = div(x, y, dp, rm, baseOut);
              xc = x.c;
              r = x.r;
              e = x.e;
            }
            d = e + dp + 1;
            i = xc[d];
            k = baseOut / 2;
            r = r || d < 0 || xc[d + 1] != null;
            r = rm < 4 ? (i != null || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : i > k || i == k && (rm == 4 || r || rm == 6 && xc[d - 1] & 1 || rm == (x.s < 0 ? 8 : 7));
            if (d < 1 || !xc[0]) {
              str = r ? toFixedPoint(alphabet.charAt(1), -dp, alphabet.charAt(0)) : alphabet.charAt(0);
            } else {
              xc.length = d;
              if (r) {
                for (--baseOut; ++xc[--d] > baseOut; ) {
                  xc[d] = 0;
                  if (!d) {
                    ++e;
                    xc = [1].concat(xc);
                  }
                }
              }
              for (k = xc.length; !xc[--k]; )
                ;
              for (i = 0, str = ""; i <= k; str += alphabet.charAt(xc[i++]))
                ;
              str = toFixedPoint(str, e, alphabet.charAt(0));
            }
            return str;
          };
        }();
        div = function() {
          function multiply(x, k, base) {
            var m, temp, xlo, xhi, carry = 0, i = x.length, klo = k % SQRT_BASE, khi = k / SQRT_BASE | 0;
            for (x = x.slice(); i--; ) {
              xlo = x[i] % SQRT_BASE;
              xhi = x[i] / SQRT_BASE | 0;
              m = khi * xlo + xhi * klo;
              temp = klo * xlo + m % SQRT_BASE * SQRT_BASE + carry;
              carry = (temp / base | 0) + (m / SQRT_BASE | 0) + khi * xhi;
              x[i] = temp % base;
            }
            if (carry)
              x = [carry].concat(x);
            return x;
          }
          function compare2(a, b, aL, bL) {
            var i, cmp;
            if (aL != bL) {
              cmp = aL > bL ? 1 : -1;
            } else {
              for (i = cmp = 0; i < aL; i++) {
                if (a[i] != b[i]) {
                  cmp = a[i] > b[i] ? 1 : -1;
                  break;
                }
              }
            }
            return cmp;
          }
          function subtract(a, b, aL, base) {
            var i = 0;
            for (; aL--; ) {
              a[aL] -= i;
              i = a[aL] < b[aL] ? 1 : 0;
              a[aL] = i * base + a[aL] - b[aL];
            }
            for (; !a[0] && a.length > 1; a.splice(0, 1))
              ;
          }
          return function(x, y, dp, rm, base) {
            var cmp, e, i, more, n, prod, prodL, q, qc, rem, remL, rem0, xi, xL, yc0, yL, yz, s = x.s == y.s ? 1 : -1, xc = x.c, yc = y.c;
            if (!xc || !xc[0] || !yc || !yc[0]) {
              return new BigNumber2(
                // Return NaN if either NaN, or both Infinity or 0.
                !x.s || !y.s || (xc ? yc && xc[0] == yc[0] : !yc) ? NaN : (
                  // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
                  xc && xc[0] == 0 || !yc ? s * 0 : s / 0
                )
              );
            }
            q = new BigNumber2(s);
            qc = q.c = [];
            e = x.e - y.e;
            s = dp + e + 1;
            if (!base) {
              base = BASE;
              e = bitFloor(x.e / LOG_BASE) - bitFloor(y.e / LOG_BASE);
              s = s / LOG_BASE | 0;
            }
            for (i = 0; yc[i] == (xc[i] || 0); i++)
              ;
            if (yc[i] > (xc[i] || 0))
              e--;
            if (s < 0) {
              qc.push(1);
              more = true;
            } else {
              xL = xc.length;
              yL = yc.length;
              i = 0;
              s += 2;
              n = mathfloor(base / (yc[0] + 1));
              if (n > 1) {
                yc = multiply(yc, n, base);
                xc = multiply(xc, n, base);
                yL = yc.length;
                xL = xc.length;
              }
              xi = yL;
              rem = xc.slice(0, yL);
              remL = rem.length;
              for (; remL < yL; rem[remL++] = 0)
                ;
              yz = yc.slice();
              yz = [0].concat(yz);
              yc0 = yc[0];
              if (yc[1] >= base / 2)
                yc0++;
              do {
                n = 0;
                cmp = compare2(yc, rem, yL, remL);
                if (cmp < 0) {
                  rem0 = rem[0];
                  if (yL != remL)
                    rem0 = rem0 * base + (rem[1] || 0);
                  n = mathfloor(rem0 / yc0);
                  if (n > 1) {
                    if (n >= base)
                      n = base - 1;
                    prod = multiply(yc, n, base);
                    prodL = prod.length;
                    remL = rem.length;
                    while (compare2(prod, rem, prodL, remL) == 1) {
                      n--;
                      subtract(prod, yL < prodL ? yz : yc, prodL, base);
                      prodL = prod.length;
                      cmp = 1;
                    }
                  } else {
                    if (n == 0) {
                      cmp = n = 1;
                    }
                    prod = yc.slice();
                    prodL = prod.length;
                  }
                  if (prodL < remL)
                    prod = [0].concat(prod);
                  subtract(rem, prod, remL, base);
                  remL = rem.length;
                  if (cmp == -1) {
                    while (compare2(yc, rem, yL, remL) < 1) {
                      n++;
                      subtract(rem, yL < remL ? yz : yc, remL, base);
                      remL = rem.length;
                    }
                  }
                } else if (cmp === 0) {
                  n++;
                  rem = [0];
                }
                qc[i++] = n;
                if (rem[0]) {
                  rem[remL++] = xc[xi] || 0;
                } else {
                  rem = [xc[xi]];
                  remL = 1;
                }
              } while ((xi++ < xL || rem[0] != null) && s--);
              more = rem[0] != null;
              if (!qc[0])
                qc.splice(0, 1);
            }
            if (base == BASE) {
              for (i = 1, s = qc[0]; s >= 10; s /= 10, i++)
                ;
              round(q, dp + (q.e = i + e * LOG_BASE - 1) + 1, rm, more);
            } else {
              q.e = e;
              q.r = +more;
            }
            return q;
          };
        }();
        function format(n, i, rm, id) {
          var c0, e, ne, len, str;
          if (rm == null)
            rm = ROUNDING_MODE;
          else
            intCheck(rm, 0, 8);
          if (!n.c)
            return n.toString();
          c0 = n.c[0];
          ne = n.e;
          if (i == null) {
            str = coeffToString(n.c);
            str = id == 1 || id == 2 && (ne <= TO_EXP_NEG || ne >= TO_EXP_POS) ? toExponential(str, ne) : toFixedPoint(str, ne, "0");
          } else {
            n = round(new BigNumber2(n), i, rm);
            e = n.e;
            str = coeffToString(n.c);
            len = str.length;
            if (id == 1 || id == 2 && (i <= e || e <= TO_EXP_NEG)) {
              for (; len < i; str += "0", len++)
                ;
              str = toExponential(str, e);
            } else {
              i -= ne;
              str = toFixedPoint(str, e, "0");
              if (e + 1 > len) {
                if (--i > 0)
                  for (str += "."; i--; str += "0")
                    ;
              } else {
                i += e - len;
                if (i > 0) {
                  if (e + 1 == len)
                    str += ".";
                  for (; i--; str += "0")
                    ;
                }
              }
            }
          }
          return n.s < 0 && c0 ? "-" + str : str;
        }
        function maxOrMin(args, n) {
          var k, y, i = 1, x = new BigNumber2(args[0]);
          for (; i < args.length; i++) {
            y = new BigNumber2(args[i]);
            if (!y.s || (k = compare(x, y)) === n || k === 0 && x.s === n) {
              x = y;
            }
          }
          return x;
        }
        function normalise(n, c, e) {
          var i = 1, j = c.length;
          for (; !c[--j]; c.pop())
            ;
          for (j = c[0]; j >= 10; j /= 10, i++)
            ;
          if ((e = i + e * LOG_BASE - 1) > MAX_EXP) {
            n.c = n.e = null;
          } else if (e < MIN_EXP) {
            n.c = [n.e = 0];
          } else {
            n.e = e;
            n.c = c;
          }
          return n;
        }
        parseNumeric = function() {
          var basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i, dotAfter = /^([^.]+)\.$/, dotBefore = /^\.([^.]+)$/, isInfinityOrNaN = /^-?(Infinity|NaN)$/, whitespaceOrPlus = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
          return function(x, str, isNum, b) {
            var base, s = isNum ? str : str.replace(whitespaceOrPlus, "");
            if (isInfinityOrNaN.test(s)) {
              x.s = isNaN(s) ? null : s < 0 ? -1 : 1;
            } else {
              if (!isNum) {
                s = s.replace(basePrefix, function(m, p1, p2) {
                  base = (p2 = p2.toLowerCase()) == "x" ? 16 : p2 == "b" ? 2 : 8;
                  return !b || b == base ? p1 : m;
                });
                if (b) {
                  base = b;
                  s = s.replace(dotAfter, "$1").replace(dotBefore, "0.$1");
                }
                if (str != s)
                  return new BigNumber2(s, base);
              }
              if (BigNumber2.DEBUG) {
                throw Error(bignumberError + "Not a" + (b ? " base " + b : "") + " number: " + str);
              }
              x.s = null;
            }
            x.c = x.e = null;
          };
        }();
        function round(x, sd, rm, r) {
          var d, i, j, k, n, ni, rd, xc = x.c, pows10 = POWS_TEN;
          if (xc) {
            out: {
              for (d = 1, k = xc[0]; k >= 10; k /= 10, d++)
                ;
              i = sd - d;
              if (i < 0) {
                i += LOG_BASE;
                j = sd;
                n = xc[ni = 0];
                rd = mathfloor(n / pows10[d - j - 1] % 10);
              } else {
                ni = mathceil((i + 1) / LOG_BASE);
                if (ni >= xc.length) {
                  if (r) {
                    for (; xc.length <= ni; xc.push(0))
                      ;
                    n = rd = 0;
                    d = 1;
                    i %= LOG_BASE;
                    j = i - LOG_BASE + 1;
                  } else {
                    break out;
                  }
                } else {
                  n = k = xc[ni];
                  for (d = 1; k >= 10; k /= 10, d++)
                    ;
                  i %= LOG_BASE;
                  j = i - LOG_BASE + d;
                  rd = j < 0 ? 0 : mathfloor(n / pows10[d - j - 1] % 10);
                }
              }
              r = r || sd < 0 || // Are there any non-zero digits after the rounding digit?
              // The expression  n % pows10[d - j - 1]  returns all digits of n to the right
              // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
              xc[ni + 1] != null || (j < 0 ? n : n % pows10[d - j - 1]);
              r = rm < 4 ? (rd || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : rd > 5 || rd == 5 && (rm == 4 || r || rm == 6 && // Check whether the digit to the left of the rounding digit is odd.
              (i > 0 ? j > 0 ? n / pows10[d - j] : 0 : xc[ni - 1]) % 10 & 1 || rm == (x.s < 0 ? 8 : 7));
              if (sd < 1 || !xc[0]) {
                xc.length = 0;
                if (r) {
                  sd -= x.e + 1;
                  xc[0] = pows10[(LOG_BASE - sd % LOG_BASE) % LOG_BASE];
                  x.e = -sd || 0;
                } else {
                  xc[0] = x.e = 0;
                }
                return x;
              }
              if (i == 0) {
                xc.length = ni;
                k = 1;
                ni--;
              } else {
                xc.length = ni + 1;
                k = pows10[LOG_BASE - i];
                xc[ni] = j > 0 ? mathfloor(n / pows10[d - j] % pows10[j]) * k : 0;
              }
              if (r) {
                for (; ; ) {
                  if (ni == 0) {
                    for (i = 1, j = xc[0]; j >= 10; j /= 10, i++)
                      ;
                    j = xc[0] += k;
                    for (k = 1; j >= 10; j /= 10, k++)
                      ;
                    if (i != k) {
                      x.e++;
                      if (xc[0] == BASE)
                        xc[0] = 1;
                    }
                    break;
                  } else {
                    xc[ni] += k;
                    if (xc[ni] != BASE)
                      break;
                    xc[ni--] = 0;
                    k = 1;
                  }
                }
              }
              for (i = xc.length; xc[--i] === 0; xc.pop())
                ;
            }
            if (x.e > MAX_EXP) {
              x.c = x.e = null;
            } else if (x.e < MIN_EXP) {
              x.c = [x.e = 0];
            }
          }
          return x;
        }
        function valueOf(n) {
          var str, e = n.e;
          if (e === null)
            return n.toString();
          str = coeffToString(n.c);
          str = e <= TO_EXP_NEG || e >= TO_EXP_POS ? toExponential(str, e) : toFixedPoint(str, e, "0");
          return n.s < 0 ? "-" + str : str;
        }
        P.absoluteValue = P.abs = function() {
          var x = new BigNumber2(this);
          if (x.s < 0)
            x.s = 1;
          return x;
        };
        P.comparedTo = function(y, b) {
          return compare(this, new BigNumber2(y, b));
        };
        P.decimalPlaces = P.dp = function(dp, rm) {
          var c, n, v, x = this;
          if (dp != null) {
            intCheck(dp, 0, MAX);
            if (rm == null)
              rm = ROUNDING_MODE;
            else
              intCheck(rm, 0, 8);
            return round(new BigNumber2(x), dp + x.e + 1, rm);
          }
          if (!(c = x.c))
            return null;
          n = ((v = c.length - 1) - bitFloor(this.e / LOG_BASE)) * LOG_BASE;
          if (v = c[v])
            for (; v % 10 == 0; v /= 10, n--)
              ;
          if (n < 0)
            n = 0;
          return n;
        };
        P.dividedBy = P.div = function(y, b) {
          return div(this, new BigNumber2(y, b), DECIMAL_PLACES, ROUNDING_MODE);
        };
        P.dividedToIntegerBy = P.idiv = function(y, b) {
          return div(this, new BigNumber2(y, b), 0, 1);
        };
        P.exponentiatedBy = P.pow = function(n, m) {
          var half, isModExp, i, k, more, nIsBig, nIsNeg, nIsOdd, y, x = this;
          n = new BigNumber2(n);
          if (n.c && !n.isInteger()) {
            throw Error(bignumberError + "Exponent not an integer: " + valueOf(n));
          }
          if (m != null)
            m = new BigNumber2(m);
          nIsBig = n.e > 14;
          if (!x.c || !x.c[0] || x.c[0] == 1 && !x.e && x.c.length == 1 || !n.c || !n.c[0]) {
            y = new BigNumber2(Math.pow(+valueOf(x), nIsBig ? n.s * (2 - isOdd(n)) : +valueOf(n)));
            return m ? y.mod(m) : y;
          }
          nIsNeg = n.s < 0;
          if (m) {
            if (m.c ? !m.c[0] : !m.s)
              return new BigNumber2(NaN);
            isModExp = !nIsNeg && x.isInteger() && m.isInteger();
            if (isModExp)
              x = x.mod(m);
          } else if (n.e > 9 && (x.e > 0 || x.e < -1 || (x.e == 0 ? x.c[0] > 1 || nIsBig && x.c[1] >= 24e7 : x.c[0] < 8e13 || nIsBig && x.c[0] <= 9999975e7))) {
            k = x.s < 0 && isOdd(n) ? -0 : 0;
            if (x.e > -1)
              k = 1 / k;
            return new BigNumber2(nIsNeg ? 1 / k : k);
          } else if (POW_PRECISION) {
            k = mathceil(POW_PRECISION / LOG_BASE + 2);
          }
          if (nIsBig) {
            half = new BigNumber2(0.5);
            if (nIsNeg)
              n.s = 1;
            nIsOdd = isOdd(n);
          } else {
            i = Math.abs(+valueOf(n));
            nIsOdd = i % 2;
          }
          y = new BigNumber2(ONE);
          for (; ; ) {
            if (nIsOdd) {
              y = y.times(x);
              if (!y.c)
                break;
              if (k) {
                if (y.c.length > k)
                  y.c.length = k;
              } else if (isModExp) {
                y = y.mod(m);
              }
            }
            if (i) {
              i = mathfloor(i / 2);
              if (i === 0)
                break;
              nIsOdd = i % 2;
            } else {
              n = n.times(half);
              round(n, n.e + 1, 1);
              if (n.e > 14) {
                nIsOdd = isOdd(n);
              } else {
                i = +valueOf(n);
                if (i === 0)
                  break;
                nIsOdd = i % 2;
              }
            }
            x = x.times(x);
            if (k) {
              if (x.c && x.c.length > k)
                x.c.length = k;
            } else if (isModExp) {
              x = x.mod(m);
            }
          }
          if (isModExp)
            return y;
          if (nIsNeg)
            y = ONE.div(y);
          return m ? y.mod(m) : k ? round(y, POW_PRECISION, ROUNDING_MODE, more) : y;
        };
        P.integerValue = function(rm) {
          var n = new BigNumber2(this);
          if (rm == null)
            rm = ROUNDING_MODE;
          else
            intCheck(rm, 0, 8);
          return round(n, n.e + 1, rm);
        };
        P.isEqualTo = P.eq = function(y, b) {
          return compare(this, new BigNumber2(y, b)) === 0;
        };
        P.isFinite = function() {
          return !!this.c;
        };
        P.isGreaterThan = P.gt = function(y, b) {
          return compare(this, new BigNumber2(y, b)) > 0;
        };
        P.isGreaterThanOrEqualTo = P.gte = function(y, b) {
          return (b = compare(this, new BigNumber2(y, b))) === 1 || b === 0;
        };
        P.isInteger = function() {
          return !!this.c && bitFloor(this.e / LOG_BASE) > this.c.length - 2;
        };
        P.isLessThan = P.lt = function(y, b) {
          return compare(this, new BigNumber2(y, b)) < 0;
        };
        P.isLessThanOrEqualTo = P.lte = function(y, b) {
          return (b = compare(this, new BigNumber2(y, b))) === -1 || b === 0;
        };
        P.isNaN = function() {
          return !this.s;
        };
        P.isNegative = function() {
          return this.s < 0;
        };
        P.isPositive = function() {
          return this.s > 0;
        };
        P.isZero = function() {
          return !!this.c && this.c[0] == 0;
        };
        P.minus = function(y, b) {
          var i, j, t, xLTy, x = this, a = x.s;
          y = new BigNumber2(y, b);
          b = y.s;
          if (!a || !b)
            return new BigNumber2(NaN);
          if (a != b) {
            y.s = -b;
            return x.plus(y);
          }
          var xe = x.e / LOG_BASE, ye = y.e / LOG_BASE, xc = x.c, yc = y.c;
          if (!xe || !ye) {
            if (!xc || !yc)
              return xc ? (y.s = -b, y) : new BigNumber2(yc ? x : NaN);
            if (!xc[0] || !yc[0]) {
              return yc[0] ? (y.s = -b, y) : new BigNumber2(xc[0] ? x : (
                // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
                ROUNDING_MODE == 3 ? -0 : 0
              ));
            }
          }
          xe = bitFloor(xe);
          ye = bitFloor(ye);
          xc = xc.slice();
          if (a = xe - ye) {
            if (xLTy = a < 0) {
              a = -a;
              t = xc;
            } else {
              ye = xe;
              t = yc;
            }
            t.reverse();
            for (b = a; b--; t.push(0))
              ;
            t.reverse();
          } else {
            j = (xLTy = (a = xc.length) < (b = yc.length)) ? a : b;
            for (a = b = 0; b < j; b++) {
              if (xc[b] != yc[b]) {
                xLTy = xc[b] < yc[b];
                break;
              }
            }
          }
          if (xLTy) {
            t = xc;
            xc = yc;
            yc = t;
            y.s = -y.s;
          }
          b = (j = yc.length) - (i = xc.length);
          if (b > 0)
            for (; b--; xc[i++] = 0)
              ;
          b = BASE - 1;
          for (; j > a; ) {
            if (xc[--j] < yc[j]) {
              for (i = j; i && !xc[--i]; xc[i] = b)
                ;
              --xc[i];
              xc[j] += BASE;
            }
            xc[j] -= yc[j];
          }
          for (; xc[0] == 0; xc.splice(0, 1), --ye)
            ;
          if (!xc[0]) {
            y.s = ROUNDING_MODE == 3 ? -1 : 1;
            y.c = [y.e = 0];
            return y;
          }
          return normalise(y, xc, ye);
        };
        P.modulo = P.mod = function(y, b) {
          var q, s, x = this;
          y = new BigNumber2(y, b);
          if (!x.c || !y.s || y.c && !y.c[0]) {
            return new BigNumber2(NaN);
          } else if (!y.c || x.c && !x.c[0]) {
            return new BigNumber2(x);
          }
          if (MODULO_MODE == 9) {
            s = y.s;
            y.s = 1;
            q = div(x, y, 0, 3);
            y.s = s;
            q.s *= s;
          } else {
            q = div(x, y, 0, MODULO_MODE);
          }
          y = x.minus(q.times(y));
          if (!y.c[0] && MODULO_MODE == 1)
            y.s = x.s;
          return y;
        };
        P.multipliedBy = P.times = function(y, b) {
          var c, e, i, j, k, m, xcL, xlo, xhi, ycL, ylo, yhi, zc, base, sqrtBase, x = this, xc = x.c, yc = (y = new BigNumber2(y, b)).c;
          if (!xc || !yc || !xc[0] || !yc[0]) {
            if (!x.s || !y.s || xc && !xc[0] && !yc || yc && !yc[0] && !xc) {
              y.c = y.e = y.s = null;
            } else {
              y.s *= x.s;
              if (!xc || !yc) {
                y.c = y.e = null;
              } else {
                y.c = [0];
                y.e = 0;
              }
            }
            return y;
          }
          e = bitFloor(x.e / LOG_BASE) + bitFloor(y.e / LOG_BASE);
          y.s *= x.s;
          xcL = xc.length;
          ycL = yc.length;
          if (xcL < ycL) {
            zc = xc;
            xc = yc;
            yc = zc;
            i = xcL;
            xcL = ycL;
            ycL = i;
          }
          for (i = xcL + ycL, zc = []; i--; zc.push(0))
            ;
          base = BASE;
          sqrtBase = SQRT_BASE;
          for (i = ycL; --i >= 0; ) {
            c = 0;
            ylo = yc[i] % sqrtBase;
            yhi = yc[i] / sqrtBase | 0;
            for (k = xcL, j = i + k; j > i; ) {
              xlo = xc[--k] % sqrtBase;
              xhi = xc[k] / sqrtBase | 0;
              m = yhi * xlo + xhi * ylo;
              xlo = ylo * xlo + m % sqrtBase * sqrtBase + zc[j] + c;
              c = (xlo / base | 0) + (m / sqrtBase | 0) + yhi * xhi;
              zc[j--] = xlo % base;
            }
            zc[j] = c;
          }
          if (c) {
            ++e;
          } else {
            zc.splice(0, 1);
          }
          return normalise(y, zc, e);
        };
        P.negated = function() {
          var x = new BigNumber2(this);
          x.s = -x.s || null;
          return x;
        };
        P.plus = function(y, b) {
          var t, x = this, a = x.s;
          y = new BigNumber2(y, b);
          b = y.s;
          if (!a || !b)
            return new BigNumber2(NaN);
          if (a != b) {
            y.s = -b;
            return x.minus(y);
          }
          var xe = x.e / LOG_BASE, ye = y.e / LOG_BASE, xc = x.c, yc = y.c;
          if (!xe || !ye) {
            if (!xc || !yc)
              return new BigNumber2(a / 0);
            if (!xc[0] || !yc[0])
              return yc[0] ? y : new BigNumber2(xc[0] ? x : a * 0);
          }
          xe = bitFloor(xe);
          ye = bitFloor(ye);
          xc = xc.slice();
          if (a = xe - ye) {
            if (a > 0) {
              ye = xe;
              t = yc;
            } else {
              a = -a;
              t = xc;
            }
            t.reverse();
            for (; a--; t.push(0))
              ;
            t.reverse();
          }
          a = xc.length;
          b = yc.length;
          if (a - b < 0) {
            t = yc;
            yc = xc;
            xc = t;
            b = a;
          }
          for (a = 0; b; ) {
            a = (xc[--b] = xc[b] + yc[b] + a) / BASE | 0;
            xc[b] = BASE === xc[b] ? 0 : xc[b] % BASE;
          }
          if (a) {
            xc = [a].concat(xc);
            ++ye;
          }
          return normalise(y, xc, ye);
        };
        P.precision = P.sd = function(sd, rm) {
          var c, n, v, x = this;
          if (sd != null && sd !== !!sd) {
            intCheck(sd, 1, MAX);
            if (rm == null)
              rm = ROUNDING_MODE;
            else
              intCheck(rm, 0, 8);
            return round(new BigNumber2(x), sd, rm);
          }
          if (!(c = x.c))
            return null;
          v = c.length - 1;
          n = v * LOG_BASE + 1;
          if (v = c[v]) {
            for (; v % 10 == 0; v /= 10, n--)
              ;
            for (v = c[0]; v >= 10; v /= 10, n++)
              ;
          }
          if (sd && x.e + 1 > n)
            n = x.e + 1;
          return n;
        };
        P.shiftedBy = function(k) {
          intCheck(k, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER);
          return this.times("1e" + k);
        };
        P.squareRoot = P.sqrt = function() {
          var m, n, r, rep, t, x = this, c = x.c, s = x.s, e = x.e, dp = DECIMAL_PLACES + 4, half = new BigNumber2("0.5");
          if (s !== 1 || !c || !c[0]) {
            return new BigNumber2(!s || s < 0 && (!c || c[0]) ? NaN : c ? x : 1 / 0);
          }
          s = Math.sqrt(+valueOf(x));
          if (s == 0 || s == 1 / 0) {
            n = coeffToString(c);
            if ((n.length + e) % 2 == 0)
              n += "0";
            s = Math.sqrt(+n);
            e = bitFloor((e + 1) / 2) - (e < 0 || e % 2);
            if (s == 1 / 0) {
              n = "5e" + e;
            } else {
              n = s.toExponential();
              n = n.slice(0, n.indexOf("e") + 1) + e;
            }
            r = new BigNumber2(n);
          } else {
            r = new BigNumber2(s + "");
          }
          if (r.c[0]) {
            e = r.e;
            s = e + dp;
            if (s < 3)
              s = 0;
            for (; ; ) {
              t = r;
              r = half.times(t.plus(div(x, t, dp, 1)));
              if (coeffToString(t.c).slice(0, s) === (n = coeffToString(r.c)).slice(0, s)) {
                if (r.e < e)
                  --s;
                n = n.slice(s - 3, s + 1);
                if (n == "9999" || !rep && n == "4999") {
                  if (!rep) {
                    round(t, t.e + DECIMAL_PLACES + 2, 0);
                    if (t.times(t).eq(x)) {
                      r = t;
                      break;
                    }
                  }
                  dp += 4;
                  s += 4;
                  rep = 1;
                } else {
                  if (!+n || !+n.slice(1) && n.charAt(0) == "5") {
                    round(r, r.e + DECIMAL_PLACES + 2, 1);
                    m = !r.times(r).eq(x);
                  }
                  break;
                }
              }
            }
          }
          return round(r, r.e + DECIMAL_PLACES + 1, ROUNDING_MODE, m);
        };
        P.toExponential = function(dp, rm) {
          if (dp != null) {
            intCheck(dp, 0, MAX);
            dp++;
          }
          return format(this, dp, rm, 1);
        };
        P.toFixed = function(dp, rm) {
          if (dp != null) {
            intCheck(dp, 0, MAX);
            dp = dp + this.e + 1;
          }
          return format(this, dp, rm);
        };
        P.toFormat = function(dp, rm, format2) {
          var str, x = this;
          if (format2 == null) {
            if (dp != null && rm && typeof rm == "object") {
              format2 = rm;
              rm = null;
            } else if (dp && typeof dp == "object") {
              format2 = dp;
              dp = rm = null;
            } else {
              format2 = FORMAT;
            }
          } else if (typeof format2 != "object") {
            throw Error(bignumberError + "Argument not an object: " + format2);
          }
          str = x.toFixed(dp, rm);
          if (x.c) {
            var i, arr = str.split("."), g1 = +format2.groupSize, g2 = +format2.secondaryGroupSize, groupSeparator = format2.groupSeparator || "", intPart = arr[0], fractionPart = arr[1], isNeg = x.s < 0, intDigits = isNeg ? intPart.slice(1) : intPart, len = intDigits.length;
            if (g2) {
              i = g1;
              g1 = g2;
              g2 = i;
              len -= i;
            }
            if (g1 > 0 && len > 0) {
              i = len % g1 || g1;
              intPart = intDigits.substr(0, i);
              for (; i < len; i += g1)
                intPart += groupSeparator + intDigits.substr(i, g1);
              if (g2 > 0)
                intPart += groupSeparator + intDigits.slice(i);
              if (isNeg)
                intPart = "-" + intPart;
            }
            str = fractionPart ? intPart + (format2.decimalSeparator || "") + ((g2 = +format2.fractionGroupSize) ? fractionPart.replace(
              new RegExp("\\d{" + g2 + "}\\B", "g"),
              "$&" + (format2.fractionGroupSeparator || "")
            ) : fractionPart) : intPart;
          }
          return (format2.prefix || "") + str + (format2.suffix || "");
        };
        P.toFraction = function(md) {
          var d, d0, d1, d2, e, exp, n, n0, n1, q, r, s, x = this, xc = x.c;
          if (md != null) {
            n = new BigNumber2(md);
            if (!n.isInteger() && (n.c || n.s !== 1) || n.lt(ONE)) {
              throw Error(bignumberError + "Argument " + (n.isInteger() ? "out of range: " : "not an integer: ") + valueOf(n));
            }
          }
          if (!xc)
            return new BigNumber2(x);
          d = new BigNumber2(ONE);
          n1 = d0 = new BigNumber2(ONE);
          d1 = n0 = new BigNumber2(ONE);
          s = coeffToString(xc);
          e = d.e = s.length - x.e - 1;
          d.c[0] = POWS_TEN[(exp = e % LOG_BASE) < 0 ? LOG_BASE + exp : exp];
          md = !md || n.comparedTo(d) > 0 ? e > 0 ? d : n1 : n;
          exp = MAX_EXP;
          MAX_EXP = 1 / 0;
          n = new BigNumber2(s);
          n0.c[0] = 0;
          for (; ; ) {
            q = div(n, d, 0, 1);
            d2 = d0.plus(q.times(d1));
            if (d2.comparedTo(md) == 1)
              break;
            d0 = d1;
            d1 = d2;
            n1 = n0.plus(q.times(d2 = n1));
            n0 = d2;
            d = n.minus(q.times(d2 = d));
            n = d2;
          }
          d2 = div(md.minus(d0), d1, 0, 1);
          n0 = n0.plus(d2.times(n1));
          d0 = d0.plus(d2.times(d1));
          n0.s = n1.s = x.s;
          e = e * 2;
          r = div(n1, d1, e, ROUNDING_MODE).minus(x).abs().comparedTo(
            div(n0, d0, e, ROUNDING_MODE).minus(x).abs()
          ) < 1 ? [n1, d1] : [n0, d0];
          MAX_EXP = exp;
          return r;
        };
        P.toNumber = function() {
          return +valueOf(this);
        };
        P.toPrecision = function(sd, rm) {
          if (sd != null)
            intCheck(sd, 1, MAX);
          return format(this, sd, rm, 2);
        };
        P.toString = function(b) {
          var str, n = this, s = n.s, e = n.e;
          if (e === null) {
            if (s) {
              str = "Infinity";
              if (s < 0)
                str = "-" + str;
            } else {
              str = "NaN";
            }
          } else {
            if (b == null) {
              str = e <= TO_EXP_NEG || e >= TO_EXP_POS ? toExponential(coeffToString(n.c), e) : toFixedPoint(coeffToString(n.c), e, "0");
            } else if (b === 10 && alphabetHasNormalDecimalDigits) {
              n = round(new BigNumber2(n), DECIMAL_PLACES + e + 1, ROUNDING_MODE);
              str = toFixedPoint(coeffToString(n.c), n.e, "0");
            } else {
              intCheck(b, 2, ALPHABET.length, "Base");
              str = convertBase(toFixedPoint(coeffToString(n.c), e, "0"), 10, b, s, true);
            }
            if (s < 0 && n.c[0])
              str = "-" + str;
          }
          return str;
        };
        P.valueOf = P.toJSON = function() {
          return valueOf(this);
        };
        P._isBigNumber = true;
        if (configObject != null)
          BigNumber2.set(configObject);
        return BigNumber2;
      }
      function bitFloor(n) {
        var i = n | 0;
        return n > 0 || n === i ? i : i - 1;
      }
      function coeffToString(a) {
        var s, z, i = 1, j = a.length, r = a[0] + "";
        for (; i < j; ) {
          s = a[i++] + "";
          z = LOG_BASE - s.length;
          for (; z--; s = "0" + s)
            ;
          r += s;
        }
        for (j = r.length; r.charCodeAt(--j) === 48; )
          ;
        return r.slice(0, j + 1 || 1);
      }
      function compare(x, y) {
        var a, b, xc = x.c, yc = y.c, i = x.s, j = y.s, k = x.e, l = y.e;
        if (!i || !j)
          return null;
        a = xc && !xc[0];
        b = yc && !yc[0];
        if (a || b)
          return a ? b ? 0 : -j : i;
        if (i != j)
          return i;
        a = i < 0;
        b = k == l;
        if (!xc || !yc)
          return b ? 0 : !xc ^ a ? 1 : -1;
        if (!b)
          return k > l ^ a ? 1 : -1;
        j = (k = xc.length) < (l = yc.length) ? k : l;
        for (i = 0; i < j; i++)
          if (xc[i] != yc[i])
            return xc[i] > yc[i] ^ a ? 1 : -1;
        return k == l ? 0 : k > l ^ a ? 1 : -1;
      }
      function intCheck(n, min, max, name) {
        if (n < min || n > max || n !== mathfloor(n)) {
          throw Error(bignumberError + (name || "Argument") + (typeof n == "number" ? n < min || n > max ? " out of range: " : " not an integer: " : " not a primitive number: ") + String(n));
        }
      }
      function isOdd(n) {
        var k = n.c.length - 1;
        return bitFloor(n.e / LOG_BASE) == k && n.c[k] % 2 != 0;
      }
      function toExponential(str, e) {
        return (str.length > 1 ? str.charAt(0) + "." + str.slice(1) : str) + (e < 0 ? "e" : "e+") + e;
      }
      function toFixedPoint(str, e, z) {
        var len, zs;
        if (e < 0) {
          for (zs = z + "."; ++e; zs += z)
            ;
          str = zs + str;
        } else {
          len = str.length;
          if (++e > len) {
            for (zs = z, e -= len; --e; zs += z)
              ;
            str += zs;
          } else if (e < len) {
            str = str.slice(0, e) + "." + str.slice(e);
          }
        }
        return str;
      }
      BigNumber = clone();
      BigNumber["default"] = BigNumber.BigNumber = BigNumber;
      if (typeof define == "function" && define.amd) {
        define(function() {
          return BigNumber;
        });
      } else if (typeof module != "undefined" && module.exports) {
        module.exports = BigNumber;
      } else {
        if (!globalObject) {
          globalObject = typeof self != "undefined" && self ? self : window;
        }
        globalObject.BigNumber = BigNumber;
      }
    })(exports2);
  }
});

// node_modules/.pnpm/json-bigint@1.0.0/node_modules/json-bigint/lib/stringify.js
var require_stringify = __commonJS({
  "node_modules/.pnpm/json-bigint@1.0.0/node_modules/json-bigint/lib/stringify.js"(exports2, module) {
    var BigNumber = require_bignumber();
    var JSON2 = module.exports;
    (function() {
      "use strict";
      function f(n) {
        return n < 10 ? "0" + n : n;
      }
      var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
        // table of character substitutions
        "\b": "\\b",
        "	": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
      }, rep;
      function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function(a) {
          var c = meta[a];
          return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
      }
      function str(key, holder) {
        var i, k, v, length, mind = gap, partial, value = holder[key], isBigNumber = value != null && (value instanceof BigNumber || BigNumber.isBigNumber(value));
        if (value && typeof value === "object" && typeof value.toJSON === "function") {
          value = value.toJSON(key);
        }
        if (typeof rep === "function") {
          value = rep.call(holder, key, value);
        }
        switch (typeof value) {
          case "string":
            if (isBigNumber) {
              return value;
            } else {
              return quote(value);
            }
          case "number":
            return isFinite(value) ? String(value) : "null";
          case "boolean":
          case "null":
          case "bigint":
            return String(value);
          case "object":
            if (!value) {
              return "null";
            }
            gap += indent;
            partial = [];
            if (Object.prototype.toString.apply(value) === "[object Array]") {
              length = value.length;
              for (i = 0; i < length; i += 1) {
                partial[i] = str(i, value) || "null";
              }
              v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
              gap = mind;
              return v;
            }
            if (rep && typeof rep === "object") {
              length = rep.length;
              for (i = 0; i < length; i += 1) {
                if (typeof rep[i] === "string") {
                  k = rep[i];
                  v = str(k, value);
                  if (v) {
                    partial.push(quote(k) + (gap ? ": " : ":") + v);
                  }
                }
              }
            } else {
              Object.keys(value).forEach(function(k2) {
                var v2 = str(k2, value);
                if (v2) {
                  partial.push(quote(k2) + (gap ? ": " : ":") + v2);
                }
              });
            }
            v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
            gap = mind;
            return v;
        }
      }
      if (typeof JSON2.stringify !== "function") {
        JSON2.stringify = function(value, replacer, space) {
          var i;
          gap = "";
          indent = "";
          if (typeof space === "number") {
            for (i = 0; i < space; i += 1) {
              indent += " ";
            }
          } else if (typeof space === "string") {
            indent = space;
          }
          rep = replacer;
          if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
            throw new Error("JSON.stringify");
          }
          return str("", { "": value });
        };
      }
    })();
  }
});

// node_modules/.pnpm/json-bigint@1.0.0/node_modules/json-bigint/lib/parse.js
var require_parse = __commonJS({
  "node_modules/.pnpm/json-bigint@1.0.0/node_modules/json-bigint/lib/parse.js"(exports2, module) {
    var BigNumber = null;
    var suspectProtoRx = /(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])/;
    var suspectConstructorRx = /(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)/;
    var json_parse = function(options) {
      "use strict";
      var _options = {
        strict: false,
        // not being strict means do not generate syntax errors for "duplicate key"
        storeAsString: false,
        // toggles whether the values should be stored as BigNumber (default) or a string
        alwaysParseAsBig: false,
        // toggles whether all numbers should be Big
        useNativeBigInt: false,
        // toggles whether to use native BigInt instead of bignumber.js
        protoAction: "error",
        constructorAction: "error"
      };
      if (options !== void 0 && options !== null) {
        if (options.strict === true) {
          _options.strict = true;
        }
        if (options.storeAsString === true) {
          _options.storeAsString = true;
        }
        _options.alwaysParseAsBig = options.alwaysParseAsBig === true ? options.alwaysParseAsBig : false;
        _options.useNativeBigInt = options.useNativeBigInt === true ? options.useNativeBigInt : false;
        if (typeof options.constructorAction !== "undefined") {
          if (options.constructorAction === "error" || options.constructorAction === "ignore" || options.constructorAction === "preserve") {
            _options.constructorAction = options.constructorAction;
          } else {
            throw new Error(
              `Incorrect value for constructorAction option, must be "error", "ignore" or undefined but passed ${options.constructorAction}`
            );
          }
        }
        if (typeof options.protoAction !== "undefined") {
          if (options.protoAction === "error" || options.protoAction === "ignore" || options.protoAction === "preserve") {
            _options.protoAction = options.protoAction;
          } else {
            throw new Error(
              `Incorrect value for protoAction option, must be "error", "ignore" or undefined but passed ${options.protoAction}`
            );
          }
        }
      }
      var at, ch, escapee = {
        '"': '"',
        "\\": "\\",
        "/": "/",
        b: "\b",
        f: "\f",
        n: "\n",
        r: "\r",
        t: "	"
      }, text, error = function(m) {
        throw {
          name: "SyntaxError",
          message: m,
          at,
          text
        };
      }, next = function(c) {
        if (c && c !== ch) {
          error("Expected '" + c + "' instead of '" + ch + "'");
        }
        ch = text.charAt(at);
        at += 1;
        return ch;
      }, number = function() {
        var number2, string2 = "";
        if (ch === "-") {
          string2 = "-";
          next("-");
        }
        while (ch >= "0" && ch <= "9") {
          string2 += ch;
          next();
        }
        if (ch === ".") {
          string2 += ".";
          while (next() && ch >= "0" && ch <= "9") {
            string2 += ch;
          }
        }
        if (ch === "e" || ch === "E") {
          string2 += ch;
          next();
          if (ch === "-" || ch === "+") {
            string2 += ch;
            next();
          }
          while (ch >= "0" && ch <= "9") {
            string2 += ch;
            next();
          }
        }
        number2 = +string2;
        if (!isFinite(number2)) {
          error("Bad number");
        } else {
          if (BigNumber == null)
            BigNumber = require_bignumber();
          if (string2.length > 15)
            return _options.storeAsString ? string2 : _options.useNativeBigInt ? BigInt(string2) : new BigNumber(string2);
          else
            return !_options.alwaysParseAsBig ? number2 : _options.useNativeBigInt ? BigInt(number2) : new BigNumber(number2);
        }
      }, string = function() {
        var hex, i, string2 = "", uffff;
        if (ch === '"') {
          var startAt = at;
          while (next()) {
            if (ch === '"') {
              if (at - 1 > startAt)
                string2 += text.substring(startAt, at - 1);
              next();
              return string2;
            }
            if (ch === "\\") {
              if (at - 1 > startAt)
                string2 += text.substring(startAt, at - 1);
              next();
              if (ch === "u") {
                uffff = 0;
                for (i = 0; i < 4; i += 1) {
                  hex = parseInt(next(), 16);
                  if (!isFinite(hex)) {
                    break;
                  }
                  uffff = uffff * 16 + hex;
                }
                string2 += String.fromCharCode(uffff);
              } else if (typeof escapee[ch] === "string") {
                string2 += escapee[ch];
              } else {
                break;
              }
              startAt = at;
            }
          }
        }
        error("Bad string");
      }, white = function() {
        while (ch && ch <= " ") {
          next();
        }
      }, word = function() {
        switch (ch) {
          case "t":
            next("t");
            next("r");
            next("u");
            next("e");
            return true;
          case "f":
            next("f");
            next("a");
            next("l");
            next("s");
            next("e");
            return false;
          case "n":
            next("n");
            next("u");
            next("l");
            next("l");
            return null;
        }
        error("Unexpected '" + ch + "'");
      }, value, array = function() {
        var array2 = [];
        if (ch === "[") {
          next("[");
          white();
          if (ch === "]") {
            next("]");
            return array2;
          }
          while (ch) {
            array2.push(value());
            white();
            if (ch === "]") {
              next("]");
              return array2;
            }
            next(",");
            white();
          }
        }
        error("Bad array");
      }, object = function() {
        var key, object2 = /* @__PURE__ */ Object.create(null);
        if (ch === "{") {
          next("{");
          white();
          if (ch === "}") {
            next("}");
            return object2;
          }
          while (ch) {
            key = string();
            white();
            next(":");
            if (_options.strict === true && Object.hasOwnProperty.call(object2, key)) {
              error('Duplicate key "' + key + '"');
            }
            if (suspectProtoRx.test(key) === true) {
              if (_options.protoAction === "error") {
                error("Object contains forbidden prototype property");
              } else if (_options.protoAction === "ignore") {
                value();
              } else {
                object2[key] = value();
              }
            } else if (suspectConstructorRx.test(key) === true) {
              if (_options.constructorAction === "error") {
                error("Object contains forbidden constructor property");
              } else if (_options.constructorAction === "ignore") {
                value();
              } else {
                object2[key] = value();
              }
            } else {
              object2[key] = value();
            }
            white();
            if (ch === "}") {
              next("}");
              return object2;
            }
            next(",");
            white();
          }
        }
        error("Bad object");
      };
      value = function() {
        white();
        switch (ch) {
          case "{":
            return object();
          case "[":
            return array();
          case '"':
            return string();
          case "-":
            return number();
          default:
            return ch >= "0" && ch <= "9" ? number() : word();
        }
      };
      return function(source, reviver) {
        var result;
        text = source + "";
        at = 0;
        ch = " ";
        result = value();
        white();
        if (ch) {
          error("Syntax error");
        }
        return typeof reviver === "function" ? function walk(holder, key) {
          var k, v, value2 = holder[key];
          if (value2 && typeof value2 === "object") {
            Object.keys(value2).forEach(function(k2) {
              v = walk(value2, k2);
              if (v !== void 0) {
                value2[k2] = v;
              } else {
                delete value2[k2];
              }
            });
          }
          return reviver.call(holder, key, value2);
        }({ "": result }, "") : result;
      };
    };
    module.exports = json_parse;
  }
});

// node_modules/.pnpm/json-bigint@1.0.0/node_modules/json-bigint/index.js
var require_json_bigint = __commonJS({
  "node_modules/.pnpm/json-bigint@1.0.0/node_modules/json-bigint/index.js"(exports2, module) {
    var json_stringify = require_stringify().stringify;
    var json_parse = require_parse();
    module.exports = function(options) {
      return {
        parse: json_parse(options),
        stringify: json_stringify
      };
    };
    module.exports.parse = json_parse();
    module.exports.stringify = json_stringify;
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/types/intDecoding.js
var IntDecoding, intDecoding_default;
var init_intDecoding = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/types/intDecoding.js"() {
    (function(IntDecoding2) {
      IntDecoding2["DEFAULT"] = "default";
      IntDecoding2["SAFE"] = "safe";
      IntDecoding2["MIXED"] = "mixed";
      IntDecoding2["BIGINT"] = "bigint";
    })(IntDecoding || (IntDecoding = {}));
    intDecoding_default = IntDecoding;
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/utils/utils.js
function parseJSON(str, options) {
  const intDecoding = options && options.intDecoding ? options.intDecoding : intDecoding_default.DEFAULT;
  return JSONbig.parse(str, (_, value) => {
    if (value != null && typeof value === "object" && Object.getPrototypeOf(value) == null) {
      Object.setPrototypeOf(value, Object.prototype);
    }
    if (typeof value === "bigint") {
      if (intDecoding === "safe" && value > Number.MAX_SAFE_INTEGER) {
        throw new Error(`Integer exceeds maximum safe integer: ${value.toString()}. Try parsing with a different intDecoding option.`);
      }
      if (intDecoding === "bigint" || intDecoding === "mixed" && value > Number.MAX_SAFE_INTEGER) {
        return value;
      }
      return Number(value);
    }
    if (typeof value === "number") {
      if (intDecoding === "bigint" && Number.isInteger(value)) {
        return BigInt(value);
      }
    }
    return value;
  });
}
function arrayEqual(a, b) {
  if (a.length !== b.length) {
    return false;
  }
  return Array.from(a).every((val, i) => val === b[i]);
}
function concatArrays(...arrs) {
  const size = arrs.reduce((sum, arr) => sum + arr.length, 0);
  const c = new Uint8Array(size);
  let offset = 0;
  for (let i = 0; i < arrs.length; i++) {
    c.set(arrs[i], offset);
    offset += arrs[i].length;
  }
  return c;
}
function removeUndefinedProperties(obj) {
  const mutableCopy = { ...obj };
  Object.keys(mutableCopy).forEach((key) => {
    if (typeof mutableCopy[key] === "undefined")
      delete mutableCopy[key];
  });
  return mutableCopy;
}
function isReactNative() {
  const { navigator } = globalThis;
  if (typeof navigator === "object" && navigator.product === "ReactNative") {
    return true;
  }
  return false;
}
var import_json_bigint, JSONbig;
var init_utils = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/utils/utils.js"() {
    import_json_bigint = __toESM(require_json_bigint());
    init_intDecoding();
    JSONbig = (0, import_json_bigint.default)({ useNativeBigInt: true, strict: true });
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/nacl/naclWrappers.js
function genericHash(arr) {
  return import_js_sha512.default.sha512_256.array(arr);
}
function randomBytes(length) {
  if (isReactNative()) {
    console.warn(`It looks like you're running in react-native. In order to perform common crypto operations you will need to polyfill common operations such as crypto.getRandomValues`);
  }
  return import_tweetnacl.default.randomBytes(length);
}
function keyPairFromSeed(seed) {
  return import_tweetnacl.default.sign.keyPair.fromSeed(seed);
}
function keyPair() {
  const seed = randomBytes(import_tweetnacl.default.box.secretKeyLength);
  return keyPairFromSeed(seed);
}
function isValidSignatureLength(len) {
  return len === import_tweetnacl.default.sign.signatureLength;
}
function keyPairFromSecretKey(sk) {
  return import_tweetnacl.default.sign.keyPair.fromSecretKey(sk);
}
function sign(msg, secretKey) {
  return import_tweetnacl.default.sign.detached(msg, secretKey);
}
function bytesEqual(a, b) {
  return import_tweetnacl.default.verify(a, b);
}
function verify(message, signature, verifyKey) {
  return import_tweetnacl.default.sign.detached.verify(message, signature, verifyKey);
}
var import_tweetnacl, import_js_sha512, PUBLIC_KEY_LENGTH, SECRET_KEY_LENGTH, HASH_BYTES_LENGTH, SEED_BTYES_LENGTH;
var init_naclWrappers = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/nacl/naclWrappers.js"() {
    import_tweetnacl = __toESM(require_nacl_fast());
    import_js_sha512 = __toESM(require_sha512());
    init_utils();
    PUBLIC_KEY_LENGTH = import_tweetnacl.default.sign.publicKeyLength;
    SECRET_KEY_LENGTH = import_tweetnacl.default.sign.secretKeyLength;
    HASH_BYTES_LENGTH = 32;
    SEED_BTYES_LENGTH = 32;
  }
});

// node_modules/.pnpm/hi-base32@0.5.1/node_modules/hi-base32/src/base32.js
var require_base32 = __commonJS({
  "node_modules/.pnpm/hi-base32@0.5.1/node_modules/hi-base32/src/base32.js"(exports2, module) {
    (function() {
      "use strict";
      var root = typeof window === "object" ? window : {};
      var NODE_JS = !root.HI_BASE32_NO_NODE_JS && typeof process === "object" && process.versions && process.versions.node;
      if (NODE_JS) {
        root = globalThis;
      }
      var COMMON_JS = !root.HI_BASE32_NO_COMMON_JS && typeof module === "object" && module.exports;
      var AMD = typeof define === "function" && define.amd;
      var BASE32_ENCODE_CHAR = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567".split("");
      var BASE32_DECODE_CHAR = {
        "A": 0,
        "B": 1,
        "C": 2,
        "D": 3,
        "E": 4,
        "F": 5,
        "G": 6,
        "H": 7,
        "I": 8,
        "J": 9,
        "K": 10,
        "L": 11,
        "M": 12,
        "N": 13,
        "O": 14,
        "P": 15,
        "Q": 16,
        "R": 17,
        "S": 18,
        "T": 19,
        "U": 20,
        "V": 21,
        "W": 22,
        "X": 23,
        "Y": 24,
        "Z": 25,
        "2": 26,
        "3": 27,
        "4": 28,
        "5": 29,
        "6": 30,
        "7": 31
      };
      var blocks = [0, 0, 0, 0, 0, 0, 0, 0];
      var throwInvalidUtf8 = function(position, partial) {
        if (partial.length > 10) {
          partial = "..." + partial.substr(-10);
        }
        var err = new Error("Decoded data is not valid UTF-8. Maybe try base32.decode.asBytes()? Partial data after reading " + position + " bytes: " + partial + " <-");
        err.position = position;
        throw err;
      };
      var toUtf8String = function(bytes) {
        var str = "", length = bytes.length, i = 0, followingChars = 0, b, c;
        while (i < length) {
          b = bytes[i++];
          if (b <= 127) {
            str += String.fromCharCode(b);
            continue;
          } else if (b > 191 && b <= 223) {
            c = b & 31;
            followingChars = 1;
          } else if (b <= 239) {
            c = b & 15;
            followingChars = 2;
          } else if (b <= 247) {
            c = b & 7;
            followingChars = 3;
          } else {
            throwInvalidUtf8(i, str);
          }
          for (var j = 0; j < followingChars; ++j) {
            b = bytes[i++];
            if (b < 128 || b > 191) {
              throwInvalidUtf8(i, str);
            }
            c <<= 6;
            c += b & 63;
          }
          if (c >= 55296 && c <= 57343) {
            throwInvalidUtf8(i, str);
          }
          if (c > 1114111) {
            throwInvalidUtf8(i, str);
          }
          if (c <= 65535) {
            str += String.fromCharCode(c);
          } else {
            c -= 65536;
            str += String.fromCharCode((c >> 10) + 55296);
            str += String.fromCharCode((c & 1023) + 56320);
          }
        }
        return str;
      };
      var decodeAsBytes = function(base32Str) {
        if (base32Str === "") {
          return [];
        } else if (!/^[A-Z2-7=]+$/.test(base32Str)) {
          throw new Error("Invalid base32 characters");
        }
        base32Str = base32Str.replace(/=/g, "");
        var v1, v2, v3, v4, v5, v6, v7, v8, bytes = [], index = 0, length = base32Str.length;
        for (var i = 0, count = length >> 3 << 3; i < count; ) {
          v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
          v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
          v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
          v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
          v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
          v6 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
          v7 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
          v8 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
          bytes[index++] = (v1 << 3 | v2 >>> 2) & 255;
          bytes[index++] = (v2 << 6 | v3 << 1 | v4 >>> 4) & 255;
          bytes[index++] = (v4 << 4 | v5 >>> 1) & 255;
          bytes[index++] = (v5 << 7 | v6 << 2 | v7 >>> 3) & 255;
          bytes[index++] = (v7 << 5 | v8) & 255;
        }
        var remain = length - count;
        if (remain === 2) {
          v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
          v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
          bytes[index++] = (v1 << 3 | v2 >>> 2) & 255;
        } else if (remain === 4) {
          v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
          v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
          v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
          v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
          bytes[index++] = (v1 << 3 | v2 >>> 2) & 255;
          bytes[index++] = (v2 << 6 | v3 << 1 | v4 >>> 4) & 255;
        } else if (remain === 5) {
          v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
          v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
          v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
          v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
          v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
          bytes[index++] = (v1 << 3 | v2 >>> 2) & 255;
          bytes[index++] = (v2 << 6 | v3 << 1 | v4 >>> 4) & 255;
          bytes[index++] = (v4 << 4 | v5 >>> 1) & 255;
        } else if (remain === 7) {
          v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
          v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
          v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
          v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
          v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
          v6 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
          v7 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
          bytes[index++] = (v1 << 3 | v2 >>> 2) & 255;
          bytes[index++] = (v2 << 6 | v3 << 1 | v4 >>> 4) & 255;
          bytes[index++] = (v4 << 4 | v5 >>> 1) & 255;
          bytes[index++] = (v5 << 7 | v6 << 2 | v7 >>> 3) & 255;
        }
        return bytes;
      };
      var encodeAscii = function(str) {
        var v1, v2, v3, v4, v5, base32Str = "", length = str.length;
        for (var i = 0, count = parseInt(length / 5) * 5; i < count; ) {
          v1 = str.charCodeAt(i++);
          v2 = str.charCodeAt(i++);
          v3 = str.charCodeAt(i++);
          v4 = str.charCodeAt(i++);
          v5 = str.charCodeAt(i++);
          base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] + BASE32_ENCODE_CHAR[(v3 << 1 | v4 >>> 7) & 31] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[(v4 << 3 | v5 >>> 5) & 31] + BASE32_ENCODE_CHAR[v5 & 31];
        }
        var remain = length - count;
        if (remain === 1) {
          v1 = str.charCodeAt(i);
          base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[v1 << 2 & 31] + "======";
        } else if (remain === 2) {
          v1 = str.charCodeAt(i++);
          v2 = str.charCodeAt(i);
          base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[v2 << 4 & 31] + "====";
        } else if (remain === 3) {
          v1 = str.charCodeAt(i++);
          v2 = str.charCodeAt(i++);
          v3 = str.charCodeAt(i);
          base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] + BASE32_ENCODE_CHAR[v3 << 1 & 31] + "===";
        } else if (remain === 4) {
          v1 = str.charCodeAt(i++);
          v2 = str.charCodeAt(i++);
          v3 = str.charCodeAt(i++);
          v4 = str.charCodeAt(i);
          base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] + BASE32_ENCODE_CHAR[(v3 << 1 | v4 >>> 7) & 31] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[v4 << 3 & 31] + "=";
        }
        return base32Str;
      };
      var encodeUtf8 = function(str) {
        var v1, v2, v3, v4, v5, code, end = false, base32Str = "", index = 0, i, start = 0, bytes = 0, length = str.length;
        if (str === "") {
          return base32Str;
        }
        do {
          blocks[0] = blocks[5];
          blocks[1] = blocks[6];
          blocks[2] = blocks[7];
          for (i = start; index < length && i < 5; ++index) {
            code = str.charCodeAt(index);
            if (code < 128) {
              blocks[i++] = code;
            } else if (code < 2048) {
              blocks[i++] = 192 | code >> 6;
              blocks[i++] = 128 | code & 63;
            } else if (code < 55296 || code >= 57344) {
              blocks[i++] = 224 | code >> 12;
              blocks[i++] = 128 | code >> 6 & 63;
              blocks[i++] = 128 | code & 63;
            } else {
              code = 65536 + ((code & 1023) << 10 | str.charCodeAt(++index) & 1023);
              blocks[i++] = 240 | code >> 18;
              blocks[i++] = 128 | code >> 12 & 63;
              blocks[i++] = 128 | code >> 6 & 63;
              blocks[i++] = 128 | code & 63;
            }
          }
          bytes += i - start;
          start = i - 5;
          if (index === length) {
            ++index;
          }
          if (index > length && i < 6) {
            end = true;
          }
          v1 = blocks[0];
          if (i > 4) {
            v2 = blocks[1];
            v3 = blocks[2];
            v4 = blocks[3];
            v5 = blocks[4];
            base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] + BASE32_ENCODE_CHAR[(v3 << 1 | v4 >>> 7) & 31] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[(v4 << 3 | v5 >>> 5) & 31] + BASE32_ENCODE_CHAR[v5 & 31];
          } else if (i === 1) {
            base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[v1 << 2 & 31] + "======";
          } else if (i === 2) {
            v2 = blocks[1];
            base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[v2 << 4 & 31] + "====";
          } else if (i === 3) {
            v2 = blocks[1];
            v3 = blocks[2];
            base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] + BASE32_ENCODE_CHAR[v3 << 1 & 31] + "===";
          } else {
            v2 = blocks[1];
            v3 = blocks[2];
            v4 = blocks[3];
            base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] + BASE32_ENCODE_CHAR[(v3 << 1 | v4 >>> 7) & 31] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[v4 << 3 & 31] + "=";
          }
        } while (!end);
        return base32Str;
      };
      var encodeBytes = function(bytes) {
        var v1, v2, v3, v4, v5, base32Str = "", length = bytes.length;
        for (var i = 0, count = parseInt(length / 5) * 5; i < count; ) {
          v1 = bytes[i++];
          v2 = bytes[i++];
          v3 = bytes[i++];
          v4 = bytes[i++];
          v5 = bytes[i++];
          base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] + BASE32_ENCODE_CHAR[(v3 << 1 | v4 >>> 7) & 31] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[(v4 << 3 | v5 >>> 5) & 31] + BASE32_ENCODE_CHAR[v5 & 31];
        }
        var remain = length - count;
        if (remain === 1) {
          v1 = bytes[i];
          base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[v1 << 2 & 31] + "======";
        } else if (remain === 2) {
          v1 = bytes[i++];
          v2 = bytes[i];
          base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[v2 << 4 & 31] + "====";
        } else if (remain === 3) {
          v1 = bytes[i++];
          v2 = bytes[i++];
          v3 = bytes[i];
          base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] + BASE32_ENCODE_CHAR[v3 << 1 & 31] + "===";
        } else if (remain === 4) {
          v1 = bytes[i++];
          v2 = bytes[i++];
          v3 = bytes[i++];
          v4 = bytes[i];
          base32Str += BASE32_ENCODE_CHAR[v1 >>> 3] + BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] + BASE32_ENCODE_CHAR[v2 >>> 1 & 31] + BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] + BASE32_ENCODE_CHAR[(v3 << 1 | v4 >>> 7) & 31] + BASE32_ENCODE_CHAR[v4 >>> 2 & 31] + BASE32_ENCODE_CHAR[v4 << 3 & 31] + "=";
        }
        return base32Str;
      };
      var encode3 = function(input, asciiOnly) {
        var notString = typeof input !== "string";
        if (notString && input.constructor === ArrayBuffer) {
          input = new Uint8Array(input);
        }
        if (notString) {
          return encodeBytes(input);
        } else if (asciiOnly) {
          return encodeAscii(input);
        } else {
          return encodeUtf8(input);
        }
      };
      var decode4 = function(base32Str, asciiOnly) {
        if (!asciiOnly) {
          return toUtf8String(decodeAsBytes(base32Str));
        }
        if (base32Str === "") {
          return "";
        } else if (!/^[A-Z2-7=]+$/.test(base32Str)) {
          throw new Error("Invalid base32 characters");
        }
        var v1, v2, v3, v4, v5, v6, v7, v8, str = "", length = base32Str.indexOf("=");
        if (length === -1) {
          length = base32Str.length;
        }
        for (var i = 0, count = length >> 3 << 3; i < count; ) {
          v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
          v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
          v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
          v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
          v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
          v6 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
          v7 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
          v8 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
          str += String.fromCharCode((v1 << 3 | v2 >>> 2) & 255) + String.fromCharCode((v2 << 6 | v3 << 1 | v4 >>> 4) & 255) + String.fromCharCode((v4 << 4 | v5 >>> 1) & 255) + String.fromCharCode((v5 << 7 | v6 << 2 | v7 >>> 3) & 255) + String.fromCharCode((v7 << 5 | v8) & 255);
        }
        var remain = length - count;
        if (remain === 2) {
          v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
          v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
          str += String.fromCharCode((v1 << 3 | v2 >>> 2) & 255);
        } else if (remain === 4) {
          v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
          v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
          v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
          v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
          str += String.fromCharCode((v1 << 3 | v2 >>> 2) & 255) + String.fromCharCode((v2 << 6 | v3 << 1 | v4 >>> 4) & 255);
        } else if (remain === 5) {
          v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
          v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
          v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
          v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
          v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
          str += String.fromCharCode((v1 << 3 | v2 >>> 2) & 255) + String.fromCharCode((v2 << 6 | v3 << 1 | v4 >>> 4) & 255) + String.fromCharCode((v4 << 4 | v5 >>> 1) & 255);
        } else if (remain === 7) {
          v1 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
          v2 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
          v3 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
          v4 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
          v5 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
          v6 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
          v7 = BASE32_DECODE_CHAR[base32Str.charAt(i++)];
          str += String.fromCharCode((v1 << 3 | v2 >>> 2) & 255) + String.fromCharCode((v2 << 6 | v3 << 1 | v4 >>> 4) & 255) + String.fromCharCode((v4 << 4 | v5 >>> 1) & 255) + String.fromCharCode((v5 << 7 | v6 << 2 | v7 >>> 3) & 255);
        }
        return str;
      };
      var exports3 = {
        encode: encode3,
        decode: decode4
      };
      decode4.asBytes = decodeAsBytes;
      if (COMMON_JS) {
        module.exports = exports3;
      } else {
        root.base32 = exports3;
        if (AMD) {
          define(function() {
            return exports3;
          });
        }
      }
    })();
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/encoding/uint64.js
function encodeUint64(num) {
  const isInteger = typeof num === "bigint" || Number.isInteger(num);
  if (!isInteger || num < 0 || num > BigInt("0xffffffffffffffff")) {
    throw new Error("Input is not a 64-bit unsigned integer");
  }
  const encoding = new Uint8Array(8);
  const view = new DataView(encoding.buffer);
  view.setBigUint64(0, BigInt(num));
  return encoding;
}
function decodeUint64(data, decodingMode = "safe") {
  if (decodingMode !== "safe" && decodingMode !== "mixed" && decodingMode !== "bigint") {
    throw new Error(`Unknown decodingMode option: ${decodingMode}`);
  }
  if (data.byteLength === 0 || data.byteLength > 8) {
    throw new Error(`Data has unacceptable length. Expected length is between 1 and 8, got ${data.byteLength}`);
  }
  const padding = new Uint8Array(8 - data.byteLength);
  const encoding = concatArrays(padding, data);
  const view = new DataView(encoding.buffer);
  const num = view.getBigUint64(0);
  const isBig = num > BigInt(Number.MAX_SAFE_INTEGER);
  if (decodingMode === "safe") {
    if (isBig) {
      throw new Error(`Integer exceeds maximum safe integer: ${num.toString()}. Try decoding with "mixed" or "safe" decodingMode.`);
    }
    return Number(num);
  }
  if (decodingMode === "mixed" && !isBig) {
    return Number(num);
  }
  return num;
}
var init_uint64 = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/encoding/uint64.js"() {
    init_utils();
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/encoding/address.js
function decodeAddress(address) {
  if (typeof address !== "string" || address.length !== ALGORAND_ADDRESS_LENGTH)
    throw new Error(MALFORMED_ADDRESS_ERROR_MSG);
  const decoded = import_hi_base32.default.decode.asBytes(address.toString());
  if (decoded.length !== ALGORAND_ADDRESS_BYTE_LENGTH)
    throw new Error(MALFORMED_ADDRESS_ERROR_MSG);
  const pk = new Uint8Array(decoded.slice(0, ALGORAND_ADDRESS_BYTE_LENGTH - ALGORAND_CHECKSUM_BYTE_LENGTH));
  const cs = new Uint8Array(decoded.slice(PUBLIC_KEY_LENGTH, ALGORAND_ADDRESS_BYTE_LENGTH));
  const checksum = genericHash(pk).slice(HASH_BYTES_LENGTH - ALGORAND_CHECKSUM_BYTE_LENGTH, HASH_BYTES_LENGTH);
  if (!arrayEqual(checksum, cs))
    throw new Error(CHECKSUM_ADDRESS_ERROR_MSG);
  return { publicKey: pk, checksum: cs };
}
function isValidAddress(address) {
  try {
    decodeAddress(address);
  } catch (e) {
    return false;
  }
  return true;
}
function encodeAddress(address) {
  const checksum = genericHash(address).slice(PUBLIC_KEY_LENGTH - ALGORAND_CHECKSUM_BYTE_LENGTH, PUBLIC_KEY_LENGTH);
  const addr = import_hi_base32.default.encode(concatArrays(address, checksum));
  return addr.toString().slice(0, ALGORAND_ADDRESS_LENGTH);
}
function fromMultisigPreImg({ version, threshold, pks }) {
  if (version !== 1 || version > 255 || version < 0) {
    throw new Error(INVALID_MSIG_VERSION_ERROR_MSG);
  }
  if (threshold === 0 || pks.length === 0 || threshold > pks.length || threshold > 255) {
    throw new Error(INVALID_MSIG_THRESHOLD_ERROR_MSG);
  }
  const pkLen = ALGORAND_ADDRESS_BYTE_LENGTH - ALGORAND_CHECKSUM_BYTE_LENGTH;
  if (pkLen !== PUBLIC_KEY_LENGTH) {
    throw new Error(UNEXPECTED_PK_LEN_ERROR_MSG);
  }
  const merged = new Uint8Array(MULTISIG_PREIMG2ADDR_PREFIX.length + 2 + pkLen * pks.length);
  merged.set(MULTISIG_PREIMG2ADDR_PREFIX, 0);
  merged.set([version], MULTISIG_PREIMG2ADDR_PREFIX.length);
  merged.set([threshold], MULTISIG_PREIMG2ADDR_PREFIX.length + 1);
  for (let i = 0; i < pks.length; i++) {
    if (pks[i].length !== pkLen) {
      throw new Error(INVALID_MSIG_PK_ERROR_MSG);
    }
    merged.set(pks[i], MULTISIG_PREIMG2ADDR_PREFIX.length + 2 + i * pkLen);
  }
  return new Uint8Array(genericHash(merged));
}
function fromMultisigPreImgAddrs({ version, threshold, addrs }) {
  const pks = addrs.map((addr) => decodeAddress(addr).publicKey);
  return encodeAddress(fromMultisigPreImg({ version, threshold, pks }));
}
function getApplicationAddress(appID) {
  const toBeSigned = concatArrays(APP_ID_PREFIX, encodeUint64(appID));
  const hash = genericHash(toBeSigned);
  return encodeAddress(new Uint8Array(hash));
}
var import_hi_base32, ALGORAND_ADDRESS_BYTE_LENGTH, ALGORAND_CHECKSUM_BYTE_LENGTH, ALGORAND_ADDRESS_LENGTH, ALGORAND_ZERO_ADDRESS_STRING, MULTISIG_PREIMG2ADDR_PREFIX, APP_ID_PREFIX, MALFORMED_ADDRESS_ERROR_MSG, CHECKSUM_ADDRESS_ERROR_MSG, INVALID_MSIG_VERSION_ERROR_MSG, INVALID_MSIG_THRESHOLD_ERROR_MSG, INVALID_MSIG_PK_ERROR_MSG, UNEXPECTED_PK_LEN_ERROR_MSG;
var init_address = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/encoding/address.js"() {
    init_buffer();
    import_hi_base32 = __toESM(require_base32());
    init_naclWrappers();
    init_utils();
    init_uint64();
    ALGORAND_ADDRESS_BYTE_LENGTH = 36;
    ALGORAND_CHECKSUM_BYTE_LENGTH = 4;
    ALGORAND_ADDRESS_LENGTH = 58;
    ALGORAND_ZERO_ADDRESS_STRING = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ";
    MULTISIG_PREIMG2ADDR_PREFIX = new Uint8Array([
      77,
      117,
      108,
      116,
      105,
      115,
      105,
      103,
      65,
      100,
      100,
      114
    ]);
    APP_ID_PREFIX = Buffer.from("appID");
    MALFORMED_ADDRESS_ERROR_MSG = "address seems to be malformed";
    CHECKSUM_ADDRESS_ERROR_MSG = "wrong checksum for address";
    INVALID_MSIG_VERSION_ERROR_MSG = "invalid multisig version";
    INVALID_MSIG_THRESHOLD_ERROR_MSG = "bad multisig threshold";
    INVALID_MSIG_PK_ERROR_MSG = "bad multisig public key - wrong length";
    UNEXPECTED_PK_LEN_ERROR_MSG = "nacl public key length is not 32 bytes";
  }
});

// node_modules/.pnpm/algo-msgpack-with-bigint@2.1.1/node_modules/algo-msgpack-with-bigint/dist.es5/msgpack.min.js
var require_msgpack_min = __commonJS({
  "node_modules/.pnpm/algo-msgpack-with-bigint@2.1.1/node_modules/algo-msgpack-with-bigint/dist.es5/msgpack.min.js"(exports2, module) {
    !function(t, e) {
      "object" == typeof exports2 && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports2 ? exports2.MessagePack = e() : t.MessagePack = e();
    }(exports2, function() {
      return function(t) {
        var e = {};
        function r(n) {
          if (e[n])
            return e[n].exports;
          var i = e[n] = { i: n, l: false, exports: {} };
          return t[n].call(i.exports, i, i.exports, r), i.l = true, i.exports;
        }
        return r.m = t, r.c = e, r.d = function(t2, e2, n) {
          r.o(t2, e2) || Object.defineProperty(t2, e2, { enumerable: true, get: n });
        }, r.r = function(t2) {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t2, "__esModule", { value: true });
        }, r.t = function(t2, e2) {
          if (1 & e2 && (t2 = r(t2)), 8 & e2)
            return t2;
          if (4 & e2 && "object" == typeof t2 && t2 && t2.__esModule)
            return t2;
          var n = /* @__PURE__ */ Object.create(null);
          if (r.r(n), Object.defineProperty(n, "default", { enumerable: true, value: t2 }), 2 & e2 && "string" != typeof t2)
            for (var i in t2)
              r.d(n, i, function(e3) {
                return t2[e3];
              }.bind(null, i));
          return n;
        }, r.n = function(t2) {
          var e2 = t2 && t2.__esModule ? function() {
            return t2.default;
          } : function() {
            return t2;
          };
          return r.d(e2, "a", e2), e2;
        }, r.o = function(t2, e2) {
          return Object.prototype.hasOwnProperty.call(t2, e2);
        }, r.p = "", r(r.s = 0);
      }([function(t, e, r) {
        "use strict";
        r.r(e), r.d(e, "encode", function() {
          return T;
        }), r.d(e, "decode", function() {
          return V;
        }), r.d(e, "decodeAsync", function() {
          return Y;
        }), r.d(e, "decodeArrayStream", function() {
          return Z;
        }), r.d(e, "decodeStream", function() {
          return $;
        }), r.d(e, "Decoder", function() {
          return O;
        }), r.d(e, "Encoder", function() {
          return I;
        }), r.d(e, "ExtensionCodec", function() {
          return S;
        }), r.d(e, "ExtData", function() {
          return p;
        }), r.d(e, "EXT_TIMESTAMP", function() {
          return w;
        }), r.d(e, "encodeDateToTimeSpec", function() {
          return g;
        }), r.d(e, "encodeTimeSpecToTimestamp", function() {
          return v;
        }), r.d(e, "decodeTimestampToTimeSpec", function() {
          return U;
        }), r.d(e, "encodeTimestampExtension", function() {
          return b;
        }), r.d(e, "decodeTimestampExtension", function() {
          return m;
        });
        var n = function(t2, e2) {
          var r2 = "function" == typeof Symbol && t2[Symbol.iterator];
          if (!r2)
            return t2;
          var n2, i2, o2 = r2.call(t2), s2 = [];
          try {
            for (; (void 0 === e2 || e2-- > 0) && !(n2 = o2.next()).done; )
              s2.push(n2.value);
          } catch (t3) {
            i2 = { error: t3 };
          } finally {
            try {
              n2 && !n2.done && (r2 = o2.return) && r2.call(o2);
            } finally {
              if (i2)
                throw i2.error;
            }
          }
          return s2;
        }, i = function() {
          for (var t2 = [], e2 = 0; e2 < arguments.length; e2++)
            t2 = t2.concat(n(arguments[e2]));
          return t2;
        }, o = "undefined" != typeof process && "undefined" != typeof TextEncoder && "undefined" != typeof TextDecoder;
        function s(t2) {
          for (var e2 = t2.length, r2 = 0, n2 = 0; n2 < e2; ) {
            var i2 = t2.charCodeAt(n2++);
            if (0 != (4294967168 & i2))
              if (0 == (4294965248 & i2))
                r2 += 2;
              else {
                if (i2 >= 55296 && i2 <= 56319 && n2 < e2) {
                  var o2 = t2.charCodeAt(n2);
                  56320 == (64512 & o2) && (++n2, i2 = ((1023 & i2) << 10) + (1023 & o2) + 65536);
                }
                r2 += 0 == (4294901760 & i2) ? 3 : 4;
              }
            else
              r2++;
          }
          return r2;
        }
        var a = o ? new TextEncoder() : void 0, h = "undefined" != typeof process ? 200 : 0;
        var u = (null == a ? void 0 : a.encodeInto) ? function(t2, e2, r2) {
          a.encodeInto(t2, e2.subarray(r2));
        } : function(t2, e2, r2) {
          e2.set(a.encode(t2), r2);
        };
        function c(t2, e2, r2) {
          for (var n2 = e2, o2 = n2 + r2, s2 = [], a2 = ""; n2 < o2; ) {
            var h2 = t2[n2++];
            if (0 == (128 & h2))
              s2.push(h2);
            else if (192 == (224 & h2)) {
              var u2 = 63 & t2[n2++];
              s2.push((31 & h2) << 6 | u2);
            } else if (224 == (240 & h2)) {
              u2 = 63 & t2[n2++];
              var c2 = 63 & t2[n2++];
              s2.push((31 & h2) << 12 | u2 << 6 | c2);
            } else if (240 == (248 & h2)) {
              var f2 = (7 & h2) << 18 | (u2 = 63 & t2[n2++]) << 12 | (c2 = 63 & t2[n2++]) << 6 | 63 & t2[n2++];
              f2 > 65535 && (f2 -= 65536, s2.push(f2 >>> 10 & 1023 | 55296), f2 = 56320 | 1023 & f2), s2.push(f2);
            } else
              s2.push(h2);
            s2.length >= 4096 && (a2 += String.fromCharCode.apply(String, i(s2)), s2.length = 0);
          }
          return s2.length > 0 && (a2 += String.fromCharCode.apply(String, i(s2))), a2;
        }
        var f = o ? new TextDecoder() : null, l = "undefined" != typeof process ? 200 : 0;
        var p = function(t2, e2) {
          this.type = t2, this.data = e2;
        };
        function d(t2, e2, r2) {
          var n2 = Math.floor(r2 / 4294967296), i2 = r2;
          t2.setUint32(e2, n2), t2.setUint32(e2 + 4, i2);
        }
        function y(t2, e2) {
          var r2 = t2.getInt32(e2), n2 = t2.getUint32(e2 + 4), i2 = r2 < Math.floor(Number.MIN_SAFE_INTEGER / 4294967296) || r2 === Math.floor(Number.MIN_SAFE_INTEGER / 4294967296) && 0 === n2, o2 = r2 > Math.floor(Number.MAX_SAFE_INTEGER / 4294967296);
          return i2 || o2 ? BigInt(r2) * BigInt(4294967296) + BigInt(n2) : 4294967296 * r2 + n2;
        }
        var w = -1;
        function v(t2) {
          var e2 = t2.sec, r2 = t2.nsec;
          if (e2 >= 0 && r2 >= 0 && e2 <= 17179869183) {
            if (0 === r2 && e2 <= 4294967295) {
              var n2 = new Uint8Array(4);
              return (s2 = new DataView(n2.buffer)).setUint32(0, e2), n2;
            }
            var i2 = e2 / 4294967296, o2 = 4294967295 & e2;
            n2 = new Uint8Array(8);
            return (s2 = new DataView(n2.buffer)).setUint32(0, r2 << 2 | 3 & i2), s2.setUint32(4, o2), n2;
          }
          var s2;
          n2 = new Uint8Array(12);
          return (s2 = new DataView(n2.buffer)).setUint32(0, r2), d(s2, 4, e2), n2;
        }
        function g(t2) {
          var e2 = t2.getTime(), r2 = Math.floor(e2 / 1e3), n2 = 1e6 * (e2 - 1e3 * r2), i2 = Math.floor(n2 / 1e9);
          return { sec: r2 + i2, nsec: n2 - 1e9 * i2 };
        }
        function b(t2) {
          return t2 instanceof Date ? v(g(t2)) : null;
        }
        function U(t2) {
          var e2 = new DataView(t2.buffer, t2.byteOffset, t2.byteLength);
          switch (t2.byteLength) {
            case 4:
              return { sec: e2.getUint32(0), nsec: 0 };
            case 8:
              var r2 = e2.getUint32(0);
              return { sec: 4294967296 * (3 & r2) + e2.getUint32(4), nsec: r2 >>> 2 };
            case 12:
              return { sec: y(e2, 4), nsec: e2.getUint32(0) };
            default:
              throw new Error("Unrecognized data size for timestamp: " + t2.length);
          }
        }
        function m(t2) {
          var e2 = U(t2);
          return new Date(1e3 * e2.sec + e2.nsec / 1e6);
        }
        var x = { type: w, encode: b, decode: m }, S = function() {
          function t2() {
            this.builtInEncoders = [], this.builtInDecoders = [], this.encoders = [], this.decoders = [], this.register(x);
          }
          return t2.prototype.register = function(t3) {
            var e2 = t3.type, r2 = t3.encode, n2 = t3.decode;
            if (e2 >= 0)
              this.encoders[e2] = r2, this.decoders[e2] = n2;
            else {
              var i2 = 1 + e2;
              this.builtInEncoders[i2] = r2, this.builtInDecoders[i2] = n2;
            }
          }, t2.prototype.tryToEncode = function(t3, e2) {
            for (var r2 = 0; r2 < this.builtInEncoders.length; r2++) {
              if (null != (n2 = this.builtInEncoders[r2])) {
                if (null != (i2 = n2(t3, e2)))
                  return new p(-1 - r2, i2);
              }
            }
            for (r2 = 0; r2 < this.encoders.length; r2++) {
              var n2, i2;
              if (null != (n2 = this.encoders[r2])) {
                if (null != (i2 = n2(t3, e2)))
                  return new p(r2, i2);
              }
            }
            return t3 instanceof p ? t3 : null;
          }, t2.prototype.decode = function(t3, e2, r2) {
            var n2 = e2 < 0 ? this.builtInDecoders[-1 - e2] : this.decoders[e2];
            return n2 ? n2(t3, e2, r2) : new p(e2, t3);
          }, t2.defaultCodec = new t2(), t2;
        }();
        function B(t2) {
          return t2 instanceof Uint8Array ? t2 : ArrayBuffer.isView(t2) ? new Uint8Array(t2.buffer, t2.byteOffset, t2.byteLength) : t2 instanceof ArrayBuffer ? new Uint8Array(t2) : Uint8Array.from(t2);
        }
        var E = function(t2) {
          var e2 = "function" == typeof Symbol && Symbol.iterator, r2 = e2 && t2[e2], n2 = 0;
          if (r2)
            return r2.call(t2);
          if (t2 && "number" == typeof t2.length)
            return { next: function() {
              return t2 && n2 >= t2.length && (t2 = void 0), { value: t2 && t2[n2++], done: !t2 };
            } };
          throw new TypeError(e2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
        }, I = function() {
          function t2(t3, e2, r2, n2, i2, o2, s2, a2) {
            void 0 === t3 && (t3 = S.defaultCodec), void 0 === e2 && (e2 = void 0), void 0 === r2 && (r2 = 100), void 0 === n2 && (n2 = 2048), void 0 === i2 && (i2 = false), void 0 === o2 && (o2 = false), void 0 === s2 && (s2 = false), void 0 === a2 && (a2 = false), this.extensionCodec = t3, this.context = e2, this.maxDepth = r2, this.initialBufferSize = n2, this.sortKeys = i2, this.forceFloat32 = o2, this.ignoreUndefined = s2, this.forceIntegerToFloat = a2, this.pos = 0, this.view = new DataView(new ArrayBuffer(this.initialBufferSize)), this.bytes = new Uint8Array(this.view.buffer);
          }
          return t2.prototype.getUint8Array = function() {
            return this.bytes.subarray(0, this.pos);
          }, t2.prototype.reinitializeState = function() {
            this.pos = 0;
          }, t2.prototype.encode = function(t3) {
            return this.reinitializeState(), this.doEncode(t3, 1), this.getUint8Array();
          }, t2.prototype.doEncode = function(t3, e2) {
            if (e2 > this.maxDepth)
              throw new Error("Too deep objects in depth " + e2);
            null == t3 ? this.encodeNil() : "boolean" == typeof t3 ? this.encodeBoolean(t3) : "number" == typeof t3 ? this.encodeNumber(t3) : "string" == typeof t3 ? this.encodeString(t3) : "bigint" == typeof t3 ? this.encodebigint(t3) : this.encodeObject(t3, e2);
          }, t2.prototype.ensureBufferSizeToWrite = function(t3) {
            var e2 = this.pos + t3;
            this.view.byteLength < e2 && this.resizeBuffer(2 * e2);
          }, t2.prototype.resizeBuffer = function(t3) {
            var e2 = new ArrayBuffer(t3), r2 = new Uint8Array(e2), n2 = new DataView(e2);
            r2.set(this.bytes), this.view = n2, this.bytes = r2;
          }, t2.prototype.encodeNil = function() {
            this.writeU8(192);
          }, t2.prototype.encodeBoolean = function(t3) {
            false === t3 ? this.writeU8(194) : this.writeU8(195);
          }, t2.prototype.encodeNumber = function(t3) {
            Number.isSafeInteger(t3) && !this.forceIntegerToFloat ? t3 >= 0 ? t3 < 128 ? this.writeU8(t3) : t3 < 256 ? (this.writeU8(204), this.writeU8(t3)) : t3 < 65536 ? (this.writeU8(205), this.writeU16(t3)) : t3 < 4294967296 ? (this.writeU8(206), this.writeU32(t3)) : (this.writeU8(207), this.writeU64(t3)) : t3 >= -32 ? this.writeU8(224 | t3 + 32) : t3 >= -128 ? (this.writeU8(208), this.writeI8(t3)) : t3 >= -32768 ? (this.writeU8(209), this.writeI16(t3)) : t3 >= -2147483648 ? (this.writeU8(210), this.writeI32(t3)) : (this.writeU8(211), this.writeI64(t3)) : this.forceFloat32 ? (this.writeU8(202), this.writeF32(t3)) : (this.writeU8(203), this.writeF64(t3));
          }, t2.prototype.encodebigint = function(t3) {
            t3 >= BigInt(0) ? t3 < BigInt(128) ? this.writeU8(Number(t3)) : t3 < BigInt(256) ? (this.writeU8(204), this.writeU8(Number(t3))) : t3 < BigInt(65536) ? (this.writeU8(205), this.writeU16(Number(t3))) : t3 < BigInt(4294967296) ? (this.writeU8(206), this.writeU32(Number(t3))) : (this.writeU8(207), this.writeBig64(t3)) : t3 >= BigInt(-32) ? this.writeU8(224 | Number(t3) + 32) : t3 >= BigInt(-128) ? (this.writeU8(208), this.writeI8(Number(t3))) : t3 >= BigInt(-32768) ? (this.writeU8(209), this.writeI16(Number(t3))) : t3 >= BigInt(-2147483648) ? (this.writeU8(210), this.writeI32(Number(t3))) : (this.writeU8(211), this.writeBig64(t3));
          }, t2.prototype.writeStringHeader = function(t3) {
            if (t3 < 32)
              this.writeU8(160 + t3);
            else if (t3 < 256)
              this.writeU8(217), this.writeU8(t3);
            else if (t3 < 65536)
              this.writeU8(218), this.writeU16(t3);
            else {
              if (!(t3 < 4294967296))
                throw new Error("Too long string: " + t3 + " bytes in UTF-8");
              this.writeU8(219), this.writeU32(t3);
            }
          }, t2.prototype.encodeString = function(t3) {
            var e2 = t3.length;
            if (o && e2 > h) {
              var r2 = s(t3);
              this.ensureBufferSizeToWrite(5 + r2), this.writeStringHeader(r2), u(t3, this.bytes, this.pos), this.pos += r2;
            } else {
              r2 = s(t3);
              this.ensureBufferSizeToWrite(5 + r2), this.writeStringHeader(r2), function(t4, e3, r3) {
                for (var n2 = t4.length, i2 = r3, o2 = 0; o2 < n2; ) {
                  var s2 = t4.charCodeAt(o2++);
                  if (0 != (4294967168 & s2)) {
                    if (0 == (4294965248 & s2))
                      e3[i2++] = s2 >> 6 & 31 | 192;
                    else {
                      if (s2 >= 55296 && s2 <= 56319 && o2 < n2) {
                        var a2 = t4.charCodeAt(o2);
                        56320 == (64512 & a2) && (++o2, s2 = ((1023 & s2) << 10) + (1023 & a2) + 65536);
                      }
                      0 == (4294901760 & s2) ? (e3[i2++] = s2 >> 12 & 15 | 224, e3[i2++] = s2 >> 6 & 63 | 128) : (e3[i2++] = s2 >> 18 & 7 | 240, e3[i2++] = s2 >> 12 & 63 | 128, e3[i2++] = s2 >> 6 & 63 | 128);
                    }
                    e3[i2++] = 63 & s2 | 128;
                  } else
                    e3[i2++] = s2;
                }
              }(t3, this.bytes, this.pos), this.pos += r2;
            }
          }, t2.prototype.encodeObject = function(t3, e2) {
            var r2 = this.extensionCodec.tryToEncode(t3, this.context);
            if (null != r2)
              this.encodeExtension(r2);
            else if (Array.isArray(t3))
              this.encodeArray(t3, e2);
            else if (ArrayBuffer.isView(t3))
              this.encodeBinary(t3);
            else {
              if ("object" != typeof t3)
                throw new Error("Unrecognized object: " + Object.prototype.toString.apply(t3));
              this.encodeMap(t3, e2);
            }
          }, t2.prototype.encodeBinary = function(t3) {
            var e2 = t3.byteLength;
            if (e2 < 256)
              this.writeU8(196), this.writeU8(e2);
            else if (e2 < 65536)
              this.writeU8(197), this.writeU16(e2);
            else {
              if (!(e2 < 4294967296))
                throw new Error("Too large binary: " + e2);
              this.writeU8(198), this.writeU32(e2);
            }
            var r2 = B(t3);
            this.writeU8a(r2);
          }, t2.prototype.encodeArray = function(t3, e2) {
            var r2, n2, i2 = t3.length;
            if (i2 < 16)
              this.writeU8(144 + i2);
            else if (i2 < 65536)
              this.writeU8(220), this.writeU16(i2);
            else {
              if (!(i2 < 4294967296))
                throw new Error("Too large array: " + i2);
              this.writeU8(221), this.writeU32(i2);
            }
            try {
              for (var o2 = E(t3), s2 = o2.next(); !s2.done; s2 = o2.next()) {
                var a2 = s2.value;
                this.doEncode(a2, e2 + 1);
              }
            } catch (t4) {
              r2 = { error: t4 };
            } finally {
              try {
                s2 && !s2.done && (n2 = o2.return) && n2.call(o2);
              } finally {
                if (r2)
                  throw r2.error;
              }
            }
          }, t2.prototype.countWithoutUndefined = function(t3, e2) {
            var r2, n2, i2 = 0;
            try {
              for (var o2 = E(e2), s2 = o2.next(); !s2.done; s2 = o2.next()) {
                void 0 !== t3[s2.value] && i2++;
              }
            } catch (t4) {
              r2 = { error: t4 };
            } finally {
              try {
                s2 && !s2.done && (n2 = o2.return) && n2.call(o2);
              } finally {
                if (r2)
                  throw r2.error;
              }
            }
            return i2;
          }, t2.prototype.encodeMap = function(t3, e2) {
            var r2, n2, i2 = Object.keys(t3);
            this.sortKeys && i2.sort();
            var o2 = this.ignoreUndefined ? this.countWithoutUndefined(t3, i2) : i2.length;
            if (o2 < 16)
              this.writeU8(128 + o2);
            else if (o2 < 65536)
              this.writeU8(222), this.writeU16(o2);
            else {
              if (!(o2 < 4294967296))
                throw new Error("Too large map object: " + o2);
              this.writeU8(223), this.writeU32(o2);
            }
            try {
              for (var s2 = E(i2), a2 = s2.next(); !a2.done; a2 = s2.next()) {
                var h2 = a2.value, u2 = t3[h2];
                this.ignoreUndefined && void 0 === u2 || (this.encodeString(h2), this.doEncode(u2, e2 + 1));
              }
            } catch (t4) {
              r2 = { error: t4 };
            } finally {
              try {
                a2 && !a2.done && (n2 = s2.return) && n2.call(s2);
              } finally {
                if (r2)
                  throw r2.error;
              }
            }
          }, t2.prototype.encodeExtension = function(t3) {
            var e2 = t3.data.length;
            if (1 === e2)
              this.writeU8(212);
            else if (2 === e2)
              this.writeU8(213);
            else if (4 === e2)
              this.writeU8(214);
            else if (8 === e2)
              this.writeU8(215);
            else if (16 === e2)
              this.writeU8(216);
            else if (e2 < 256)
              this.writeU8(199), this.writeU8(e2);
            else if (e2 < 65536)
              this.writeU8(200), this.writeU16(e2);
            else {
              if (!(e2 < 4294967296))
                throw new Error("Too large extension object: " + e2);
              this.writeU8(201), this.writeU32(e2);
            }
            this.writeI8(t3.type), this.writeU8a(t3.data);
          }, t2.prototype.writeU8 = function(t3) {
            this.ensureBufferSizeToWrite(1), this.view.setUint8(this.pos, t3), this.pos++;
          }, t2.prototype.writeU8a = function(t3) {
            var e2 = t3.length;
            this.ensureBufferSizeToWrite(e2), this.bytes.set(t3, this.pos), this.pos += e2;
          }, t2.prototype.writeI8 = function(t3) {
            this.ensureBufferSizeToWrite(1), this.view.setInt8(this.pos, t3), this.pos++;
          }, t2.prototype.writeU16 = function(t3) {
            this.ensureBufferSizeToWrite(2), this.view.setUint16(this.pos, t3), this.pos += 2;
          }, t2.prototype.writeI16 = function(t3) {
            this.ensureBufferSizeToWrite(2), this.view.setInt16(this.pos, t3), this.pos += 2;
          }, t2.prototype.writeU32 = function(t3) {
            this.ensureBufferSizeToWrite(4), this.view.setUint32(this.pos, t3), this.pos += 4;
          }, t2.prototype.writeI32 = function(t3) {
            this.ensureBufferSizeToWrite(4), this.view.setInt32(this.pos, t3), this.pos += 4;
          }, t2.prototype.writeF32 = function(t3) {
            this.ensureBufferSizeToWrite(4), this.view.setFloat32(this.pos, t3), this.pos += 4;
          }, t2.prototype.writeF64 = function(t3) {
            this.ensureBufferSizeToWrite(8), this.view.setFloat64(this.pos, t3), this.pos += 8;
          }, t2.prototype.writeU64 = function(t3) {
            this.ensureBufferSizeToWrite(8), function(t4, e2, r2) {
              var n2 = r2 / 4294967296, i2 = r2;
              t4.setUint32(e2, n2), t4.setUint32(e2 + 4, i2);
            }(this.view, this.pos, t3), this.pos += 8;
          }, t2.prototype.writeI64 = function(t3) {
            this.ensureBufferSizeToWrite(8), d(this.view, this.pos, t3), this.pos += 8;
          }, t2.prototype.writeBig64 = function(t3) {
            this.ensureBufferSizeToWrite(8), function(t4, e2, r2) {
              var n2 = Number(r2 / BigInt(4294967296)), i2 = Number(r2 % BigInt(4294967296));
              n2 < 0 && 0 !== i2 && (n2 -= 1), t4.setUint32(e2, n2), t4.setUint32(e2 + 4, i2);
            }(this.view, this.pos, t3), this.pos += 8;
          }, t2;
        }(), A = {};
        function T(t2, e2) {
          return void 0 === e2 && (e2 = A), new I(e2.extensionCodec, e2.context, e2.maxDepth, e2.initialBufferSize, e2.sortKeys, e2.forceFloat32, e2.ignoreUndefined, e2.forceIntegerToFloat).encode(t2);
        }
        function L(t2) {
          return (t2 < 0 ? "-" : "") + "0x" + Math.abs(t2).toString(16).padStart(2, "0");
        }
        var M = function() {
          function t2(t3, e2) {
            void 0 === t3 && (t3 = 16), void 0 === e2 && (e2 = 16), this.maxKeyLength = t3, this.maxLengthPerKey = e2, this.hit = 0, this.miss = 0, this.caches = [];
            for (var r2 = 0; r2 < this.maxKeyLength; r2++)
              this.caches.push([]);
          }
          return t2.prototype.canBeCached = function(t3) {
            return t3 > 0 && t3 <= this.maxKeyLength;
          }, t2.prototype.get = function(t3, e2, r2) {
            var n2 = this.caches[r2 - 1], i2 = n2.length;
            t:
              for (var o2 = 0; o2 < i2; o2++) {
                for (var s2 = n2[o2], a2 = s2.bytes, h2 = 0; h2 < r2; h2++)
                  if (a2[h2] !== t3[e2 + h2])
                    continue t;
                return s2.value;
              }
            return null;
          }, t2.prototype.store = function(t3, e2) {
            var r2 = this.caches[t3.length - 1], n2 = { bytes: t3, value: e2 };
            r2.length >= this.maxLengthPerKey ? r2[Math.random() * r2.length | 0] = n2 : r2.push(n2);
          }, t2.prototype.decode = function(t3, e2, r2) {
            var n2 = this.get(t3, e2, r2);
            if (null != n2)
              return this.hit++, n2;
            this.miss++;
            var i2 = c(t3, e2, r2), o2 = Uint8Array.prototype.slice.call(t3, e2, e2 + r2);
            return this.store(o2, i2), i2;
          }, t2;
        }(), k = function(t2, e2, r2, n2) {
          return new (r2 || (r2 = Promise))(function(i2, o2) {
            function s2(t3) {
              try {
                h2(n2.next(t3));
              } catch (t4) {
                o2(t4);
              }
            }
            function a2(t3) {
              try {
                h2(n2.throw(t3));
              } catch (t4) {
                o2(t4);
              }
            }
            function h2(t3) {
              var e3;
              t3.done ? i2(t3.value) : (e3 = t3.value, e3 instanceof r2 ? e3 : new r2(function(t4) {
                t4(e3);
              })).then(s2, a2);
            }
            h2((n2 = n2.apply(t2, e2 || [])).next());
          });
        }, z = function(t2, e2) {
          var r2, n2, i2, o2, s2 = { label: 0, sent: function() {
            if (1 & i2[0])
              throw i2[1];
            return i2[1];
          }, trys: [], ops: [] };
          return o2 = { next: a2(0), throw: a2(1), return: a2(2) }, "function" == typeof Symbol && (o2[Symbol.iterator] = function() {
            return this;
          }), o2;
          function a2(o3) {
            return function(a3) {
              return function(o4) {
                if (r2)
                  throw new TypeError("Generator is already executing.");
                for (; s2; )
                  try {
                    if (r2 = 1, n2 && (i2 = 2 & o4[0] ? n2.return : o4[0] ? n2.throw || ((i2 = n2.return) && i2.call(n2), 0) : n2.next) && !(i2 = i2.call(n2, o4[1])).done)
                      return i2;
                    switch (n2 = 0, i2 && (o4 = [2 & o4[0], i2.value]), o4[0]) {
                      case 0:
                      case 1:
                        i2 = o4;
                        break;
                      case 4:
                        return s2.label++, { value: o4[1], done: false };
                      case 5:
                        s2.label++, n2 = o4[1], o4 = [0];
                        continue;
                      case 7:
                        o4 = s2.ops.pop(), s2.trys.pop();
                        continue;
                      default:
                        if (!(i2 = s2.trys, (i2 = i2.length > 0 && i2[i2.length - 1]) || 6 !== o4[0] && 2 !== o4[0])) {
                          s2 = 0;
                          continue;
                        }
                        if (3 === o4[0] && (!i2 || o4[1] > i2[0] && o4[1] < i2[3])) {
                          s2.label = o4[1];
                          break;
                        }
                        if (6 === o4[0] && s2.label < i2[1]) {
                          s2.label = i2[1], i2 = o4;
                          break;
                        }
                        if (i2 && s2.label < i2[2]) {
                          s2.label = i2[2], s2.ops.push(o4);
                          break;
                        }
                        i2[2] && s2.ops.pop(), s2.trys.pop();
                        continue;
                    }
                    o4 = e2.call(t2, s2);
                  } catch (t3) {
                    o4 = [6, t3], n2 = 0;
                  } finally {
                    r2 = i2 = 0;
                  }
                if (5 & o4[0])
                  throw o4[1];
                return { value: o4[0] ? o4[1] : void 0, done: true };
              }([o3, a3]);
            };
          }
        }, D = function(t2) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var e2, r2 = t2[Symbol.asyncIterator];
          return r2 ? r2.call(t2) : (t2 = "function" == typeof __values ? __values(t2) : t2[Symbol.iterator](), e2 = {}, n2("next"), n2("throw"), n2("return"), e2[Symbol.asyncIterator] = function() {
            return this;
          }, e2);
          function n2(r3) {
            e2[r3] = t2[r3] && function(e3) {
              return new Promise(function(n3, i2) {
                (function(t3, e4, r4, n4) {
                  Promise.resolve(n4).then(function(e5) {
                    t3({ value: e5, done: r4 });
                  }, e4);
                })(n3, i2, (e3 = t2[r3](e3)).done, e3.value);
              });
            };
          }
        }, N = function(t2) {
          return this instanceof N ? (this.v = t2, this) : new N(t2);
        }, C = function(t2, e2, r2) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var n2, i2 = r2.apply(t2, e2 || []), o2 = [];
          return n2 = {}, s2("next"), s2("throw"), s2("return"), n2[Symbol.asyncIterator] = function() {
            return this;
          }, n2;
          function s2(t3) {
            i2[t3] && (n2[t3] = function(e3) {
              return new Promise(function(r3, n3) {
                o2.push([t3, e3, r3, n3]) > 1 || a2(t3, e3);
              });
            });
          }
          function a2(t3, e3) {
            try {
              (r3 = i2[t3](e3)).value instanceof N ? Promise.resolve(r3.value.v).then(h2, u2) : c2(o2[0][2], r3);
            } catch (t4) {
              c2(o2[0][3], t4);
            }
            var r3;
          }
          function h2(t3) {
            a2("next", t3);
          }
          function u2(t3) {
            a2("throw", t3);
          }
          function c2(t3, e3) {
            t3(e3), o2.shift(), o2.length && a2(o2[0][0], o2[0][1]);
          }
        }, P = new DataView(new ArrayBuffer(0)), F = new Uint8Array(P.buffer), j = function() {
          try {
            P.getInt8(0);
          } catch (t2) {
            return t2.constructor;
          }
          throw new Error("never reached");
        }(), _ = new j("Insufficient data"), W = new M(), O = function() {
          function t2(t3, e2, r2, n2, i2, o2, s2, a2) {
            void 0 === t3 && (t3 = S.defaultCodec), void 0 === e2 && (e2 = void 0), void 0 === r2 && (r2 = 4294967295), void 0 === n2 && (n2 = 4294967295), void 0 === i2 && (i2 = 4294967295), void 0 === o2 && (o2 = 4294967295), void 0 === s2 && (s2 = 4294967295), void 0 === a2 && (a2 = W), this.extensionCodec = t3, this.context = e2, this.maxStrLength = r2, this.maxBinLength = n2, this.maxArrayLength = i2, this.maxMapLength = o2, this.maxExtLength = s2, this.keyDecoder = a2, this.totalPos = 0, this.pos = 0, this.view = P, this.bytes = F, this.headByte = -1, this.stack = [];
          }
          return t2.prototype.reinitializeState = function() {
            this.totalPos = 0, this.headByte = -1;
          }, t2.prototype.setBuffer = function(t3) {
            this.bytes = B(t3), this.view = function(t4) {
              if (t4 instanceof ArrayBuffer)
                return new DataView(t4);
              var e2 = B(t4);
              return new DataView(e2.buffer, e2.byteOffset, e2.byteLength);
            }(this.bytes), this.pos = 0;
          }, t2.prototype.appendBuffer = function(t3) {
            if (-1 !== this.headByte || this.hasRemaining()) {
              var e2 = this.bytes.subarray(this.pos), r2 = B(t3), n2 = new Uint8Array(e2.length + r2.length);
              n2.set(e2), n2.set(r2, e2.length), this.setBuffer(n2);
            } else
              this.setBuffer(t3);
          }, t2.prototype.hasRemaining = function(t3) {
            return void 0 === t3 && (t3 = 1), this.view.byteLength - this.pos >= t3;
          }, t2.prototype.createNoExtraBytesError = function(t3) {
            var e2 = this.view, r2 = this.pos;
            return new RangeError("Extra " + (e2.byteLength - r2) + " of " + e2.byteLength + " byte(s) found at buffer[" + t3 + "]");
          }, t2.prototype.decode = function(t3) {
            return this.reinitializeState(), this.setBuffer(t3), this.doDecodeSingleSync();
          }, t2.prototype.doDecodeSingleSync = function() {
            var t3 = this.doDecodeSync();
            if (this.hasRemaining())
              throw this.createNoExtraBytesError(this.pos);
            return t3;
          }, t2.prototype.decodeAsync = function(t3) {
            var e2, r2, n2, i2;
            return k(this, void 0, void 0, function() {
              var o2, s2, a2, h2, u2, c2, f2, l2;
              return z(this, function(p2) {
                switch (p2.label) {
                  case 0:
                    o2 = false, p2.label = 1;
                  case 1:
                    p2.trys.push([1, 6, 7, 12]), e2 = D(t3), p2.label = 2;
                  case 2:
                    return [4, e2.next()];
                  case 3:
                    if ((r2 = p2.sent()).done)
                      return [3, 5];
                    if (a2 = r2.value, o2)
                      throw this.createNoExtraBytesError(this.totalPos);
                    this.appendBuffer(a2);
                    try {
                      s2 = this.doDecodeSync(), o2 = true;
                    } catch (t4) {
                      if (!(t4 instanceof j))
                        throw t4;
                    }
                    this.totalPos += this.pos, p2.label = 4;
                  case 4:
                    return [3, 2];
                  case 5:
                    return [3, 12];
                  case 6:
                    return h2 = p2.sent(), n2 = { error: h2 }, [3, 12];
                  case 7:
                    return p2.trys.push([7, , 10, 11]), r2 && !r2.done && (i2 = e2.return) ? [4, i2.call(e2)] : [3, 9];
                  case 8:
                    p2.sent(), p2.label = 9;
                  case 9:
                    return [3, 11];
                  case 10:
                    if (n2)
                      throw n2.error;
                    return [7];
                  case 11:
                    return [7];
                  case 12:
                    if (o2) {
                      if (this.hasRemaining())
                        throw this.createNoExtraBytesError(this.totalPos);
                      return [2, s2];
                    }
                    throw c2 = (u2 = this).headByte, f2 = u2.pos, l2 = u2.totalPos, new RangeError("Insufficient data in parcing " + L(c2) + " at " + l2 + " (" + f2 + " in the current buffer)");
                }
              });
            });
          }, t2.prototype.decodeArrayStream = function(t3) {
            return this.decodeMultiAsync(t3, true);
          }, t2.prototype.decodeStream = function(t3) {
            return this.decodeMultiAsync(t3, false);
          }, t2.prototype.decodeMultiAsync = function(t3, e2) {
            return C(this, arguments, function() {
              var r2, n2, i2, o2, s2, a2, h2, u2, c2;
              return z(this, function(f2) {
                switch (f2.label) {
                  case 0:
                    r2 = e2, n2 = -1, f2.label = 1;
                  case 1:
                    f2.trys.push([1, 13, 14, 19]), i2 = D(t3), f2.label = 2;
                  case 2:
                    return [4, N(i2.next())];
                  case 3:
                    if ((o2 = f2.sent()).done)
                      return [3, 12];
                    if (s2 = o2.value, e2 && 0 === n2)
                      throw this.createNoExtraBytesError(this.totalPos);
                    this.appendBuffer(s2), r2 && (n2 = this.readArraySize(), r2 = false, this.complete()), f2.label = 4;
                  case 4:
                    f2.trys.push([4, 9, , 10]), f2.label = 5;
                  case 5:
                    return [4, N(this.doDecodeSync())];
                  case 6:
                    return [4, f2.sent()];
                  case 7:
                    return f2.sent(), 0 == --n2 ? [3, 8] : [3, 5];
                  case 8:
                    return [3, 10];
                  case 9:
                    if (!((a2 = f2.sent()) instanceof j))
                      throw a2;
                    return [3, 10];
                  case 10:
                    this.totalPos += this.pos, f2.label = 11;
                  case 11:
                    return [3, 2];
                  case 12:
                    return [3, 19];
                  case 13:
                    return h2 = f2.sent(), u2 = { error: h2 }, [3, 19];
                  case 14:
                    return f2.trys.push([14, , 17, 18]), o2 && !o2.done && (c2 = i2.return) ? [4, N(c2.call(i2))] : [3, 16];
                  case 15:
                    f2.sent(), f2.label = 16;
                  case 16:
                    return [3, 18];
                  case 17:
                    if (u2)
                      throw u2.error;
                    return [7];
                  case 18:
                    return [7];
                  case 19:
                    return [2];
                }
              });
            });
          }, t2.prototype.doDecodeSync = function() {
            t:
              for (; ; ) {
                var t3 = this.readHeadByte(), e2 = void 0;
                if (t3 >= 224)
                  e2 = t3 - 256;
                else if (t3 < 192)
                  if (t3 < 128)
                    e2 = t3;
                  else if (t3 < 144) {
                    if (0 !== (n2 = t3 - 128)) {
                      this.pushMapState(n2), this.complete();
                      continue t;
                    }
                    e2 = {};
                  } else if (t3 < 160) {
                    if (0 !== (n2 = t3 - 144)) {
                      this.pushArrayState(n2), this.complete();
                      continue t;
                    }
                    e2 = [];
                  } else {
                    var r2 = t3 - 160;
                    e2 = this.decodeUtf8String(r2, 0);
                  }
                else if (192 === t3)
                  e2 = null;
                else if (194 === t3)
                  e2 = false;
                else if (195 === t3)
                  e2 = true;
                else if (202 === t3)
                  e2 = this.readF32();
                else if (203 === t3)
                  e2 = this.readF64();
                else if (204 === t3)
                  e2 = this.readU8();
                else if (205 === t3)
                  e2 = this.readU16();
                else if (206 === t3)
                  e2 = this.readU32();
                else if (207 === t3)
                  e2 = this.readU64();
                else if (208 === t3)
                  e2 = this.readI8();
                else if (209 === t3)
                  e2 = this.readI16();
                else if (210 === t3)
                  e2 = this.readI32();
                else if (211 === t3)
                  e2 = this.readI64();
                else if (217 === t3) {
                  r2 = this.lookU8();
                  e2 = this.decodeUtf8String(r2, 1);
                } else if (218 === t3) {
                  r2 = this.lookU16();
                  e2 = this.decodeUtf8String(r2, 2);
                } else if (219 === t3) {
                  r2 = this.lookU32();
                  e2 = this.decodeUtf8String(r2, 4);
                } else if (220 === t3) {
                  if (0 !== (n2 = this.readU16())) {
                    this.pushArrayState(n2), this.complete();
                    continue t;
                  }
                  e2 = [];
                } else if (221 === t3) {
                  if (0 !== (n2 = this.readU32())) {
                    this.pushArrayState(n2), this.complete();
                    continue t;
                  }
                  e2 = [];
                } else if (222 === t3) {
                  if (0 !== (n2 = this.readU16())) {
                    this.pushMapState(n2), this.complete();
                    continue t;
                  }
                  e2 = {};
                } else if (223 === t3) {
                  if (0 !== (n2 = this.readU32())) {
                    this.pushMapState(n2), this.complete();
                    continue t;
                  }
                  e2 = {};
                } else if (196 === t3) {
                  var n2 = this.lookU8();
                  e2 = this.decodeBinary(n2, 1);
                } else if (197 === t3) {
                  n2 = this.lookU16();
                  e2 = this.decodeBinary(n2, 2);
                } else if (198 === t3) {
                  n2 = this.lookU32();
                  e2 = this.decodeBinary(n2, 4);
                } else if (212 === t3)
                  e2 = this.decodeExtension(1, 0);
                else if (213 === t3)
                  e2 = this.decodeExtension(2, 0);
                else if (214 === t3)
                  e2 = this.decodeExtension(4, 0);
                else if (215 === t3)
                  e2 = this.decodeExtension(8, 0);
                else if (216 === t3)
                  e2 = this.decodeExtension(16, 0);
                else if (199 === t3) {
                  n2 = this.lookU8();
                  e2 = this.decodeExtension(n2, 1);
                } else if (200 === t3) {
                  n2 = this.lookU16();
                  e2 = this.decodeExtension(n2, 2);
                } else {
                  if (201 !== t3)
                    throw new Error("Unrecognized type byte: " + L(t3));
                  n2 = this.lookU32();
                  e2 = this.decodeExtension(n2, 4);
                }
                this.complete();
                for (var i2 = this.stack; i2.length > 0; ) {
                  var o2 = i2[i2.length - 1];
                  if (0 === o2.type) {
                    if (o2.array[o2.position] = e2, o2.position++, o2.position !== o2.size)
                      continue t;
                    i2.pop(), e2 = o2.array;
                  } else {
                    if (1 === o2.type) {
                      if (s2 = void 0, "string" !== (s2 = typeof e2) && "number" !== s2)
                        throw new Error("The type of key must be string or number but " + typeof e2);
                      o2.key = e2, o2.type = 2;
                      continue t;
                    }
                    if (o2.map[o2.key] = e2, o2.readCount++, o2.readCount !== o2.size) {
                      o2.key = null, o2.type = 1;
                      continue t;
                    }
                    i2.pop(), e2 = o2.map;
                  }
                }
                return e2;
              }
            var s2;
          }, t2.prototype.readHeadByte = function() {
            return -1 === this.headByte && (this.headByte = this.readU8()), this.headByte;
          }, t2.prototype.complete = function() {
            this.headByte = -1;
          }, t2.prototype.readArraySize = function() {
            var t3 = this.readHeadByte();
            switch (t3) {
              case 220:
                return this.readU16();
              case 221:
                return this.readU32();
              default:
                if (t3 < 160)
                  return t3 - 144;
                throw new Error("Unrecognized array type byte: " + L(t3));
            }
          }, t2.prototype.pushMapState = function(t3) {
            if (t3 > this.maxMapLength)
              throw new Error("Max length exceeded: map length (" + t3 + ") > maxMapLengthLength (" + this.maxMapLength + ")");
            this.stack.push({ type: 1, size: t3, key: null, readCount: 0, map: {} });
          }, t2.prototype.pushArrayState = function(t3) {
            if (t3 > this.maxArrayLength)
              throw new Error("Max length exceeded: array length (" + t3 + ") > maxArrayLength (" + this.maxArrayLength + ")");
            this.stack.push({ type: 0, size: t3, array: new Array(t3), position: 0 });
          }, t2.prototype.decodeUtf8String = function(t3, e2) {
            var r2;
            if (t3 > this.maxStrLength)
              throw new Error("Max length exceeded: UTF-8 byte length (" + t3 + ") > maxStrLength (" + this.maxStrLength + ")");
            if (this.bytes.byteLength < this.pos + e2 + t3)
              throw _;
            var n2, i2 = this.pos + e2;
            return n2 = this.stateIsMapKey() && (null === (r2 = this.keyDecoder) || void 0 === r2 ? void 0 : r2.canBeCached(t3)) ? this.keyDecoder.decode(this.bytes, i2, t3) : o && t3 > l ? function(t4, e3, r3) {
              var n3 = t4.subarray(e3, e3 + r3);
              return f.decode(n3);
            }(this.bytes, i2, t3) : c(this.bytes, i2, t3), this.pos += e2 + t3, n2;
          }, t2.prototype.stateIsMapKey = function() {
            return this.stack.length > 0 && 1 === this.stack[this.stack.length - 1].type;
          }, t2.prototype.decodeBinary = function(t3, e2) {
            if (t3 > this.maxBinLength)
              throw new Error("Max length exceeded: bin length (" + t3 + ") > maxBinLength (" + this.maxBinLength + ")");
            if (!this.hasRemaining(t3 + e2))
              throw _;
            var r2 = this.pos + e2, n2 = this.bytes.subarray(r2, r2 + t3);
            return this.pos += e2 + t3, n2;
          }, t2.prototype.decodeExtension = function(t3, e2) {
            if (t3 > this.maxExtLength)
              throw new Error("Max length exceeded: ext length (" + t3 + ") > maxExtLength (" + this.maxExtLength + ")");
            var r2 = this.view.getInt8(this.pos + e2), n2 = this.decodeBinary(t3, e2 + 1);
            return this.extensionCodec.decode(n2, r2, this.context);
          }, t2.prototype.lookU8 = function() {
            return this.view.getUint8(this.pos);
          }, t2.prototype.lookU16 = function() {
            return this.view.getUint16(this.pos);
          }, t2.prototype.lookU32 = function() {
            return this.view.getUint32(this.pos);
          }, t2.prototype.readU8 = function() {
            var t3 = this.view.getUint8(this.pos);
            return this.pos++, t3;
          }, t2.prototype.readI8 = function() {
            var t3 = this.view.getInt8(this.pos);
            return this.pos++, t3;
          }, t2.prototype.readU16 = function() {
            var t3 = this.view.getUint16(this.pos);
            return this.pos += 2, t3;
          }, t2.prototype.readI16 = function() {
            var t3 = this.view.getInt16(this.pos);
            return this.pos += 2, t3;
          }, t2.prototype.readU32 = function() {
            var t3 = this.view.getUint32(this.pos);
            return this.pos += 4, t3;
          }, t2.prototype.readI32 = function() {
            var t3 = this.view.getInt32(this.pos);
            return this.pos += 4, t3;
          }, t2.prototype.readU64 = function() {
            var t3, e2, r2, n2, i2 = (t3 = this.view, e2 = this.pos, r2 = t3.getUint32(e2), n2 = t3.getUint32(e2 + 4), r2 > Math.floor(Number.MAX_SAFE_INTEGER / 4294967296) ? BigInt(r2) * BigInt(4294967296) + BigInt(n2) : 4294967296 * r2 + n2);
            return this.pos += 8, i2;
          }, t2.prototype.readI64 = function() {
            var t3 = y(this.view, this.pos);
            return this.pos += 8, t3;
          }, t2.prototype.readF32 = function() {
            var t3 = this.view.getFloat32(this.pos);
            return this.pos += 4, t3;
          }, t2.prototype.readF64 = function() {
            var t3 = this.view.getFloat64(this.pos);
            return this.pos += 8, t3;
          }, t2;
        }(), R = {};
        function V(t2, e2) {
          return void 0 === e2 && (e2 = R), new O(e2.extensionCodec, e2.context, e2.maxStrLength, e2.maxBinLength, e2.maxArrayLength, e2.maxMapLength, e2.maxExtLength).decode(t2);
        }
        var K = function(t2, e2) {
          var r2, n2, i2, o2, s2 = { label: 0, sent: function() {
            if (1 & i2[0])
              throw i2[1];
            return i2[1];
          }, trys: [], ops: [] };
          return o2 = { next: a2(0), throw: a2(1), return: a2(2) }, "function" == typeof Symbol && (o2[Symbol.iterator] = function() {
            return this;
          }), o2;
          function a2(o3) {
            return function(a3) {
              return function(o4) {
                if (r2)
                  throw new TypeError("Generator is already executing.");
                for (; s2; )
                  try {
                    if (r2 = 1, n2 && (i2 = 2 & o4[0] ? n2.return : o4[0] ? n2.throw || ((i2 = n2.return) && i2.call(n2), 0) : n2.next) && !(i2 = i2.call(n2, o4[1])).done)
                      return i2;
                    switch (n2 = 0, i2 && (o4 = [2 & o4[0], i2.value]), o4[0]) {
                      case 0:
                      case 1:
                        i2 = o4;
                        break;
                      case 4:
                        return s2.label++, { value: o4[1], done: false };
                      case 5:
                        s2.label++, n2 = o4[1], o4 = [0];
                        continue;
                      case 7:
                        o4 = s2.ops.pop(), s2.trys.pop();
                        continue;
                      default:
                        if (!(i2 = s2.trys, (i2 = i2.length > 0 && i2[i2.length - 1]) || 6 !== o4[0] && 2 !== o4[0])) {
                          s2 = 0;
                          continue;
                        }
                        if (3 === o4[0] && (!i2 || o4[1] > i2[0] && o4[1] < i2[3])) {
                          s2.label = o4[1];
                          break;
                        }
                        if (6 === o4[0] && s2.label < i2[1]) {
                          s2.label = i2[1], i2 = o4;
                          break;
                        }
                        if (i2 && s2.label < i2[2]) {
                          s2.label = i2[2], s2.ops.push(o4);
                          break;
                        }
                        i2[2] && s2.ops.pop(), s2.trys.pop();
                        continue;
                    }
                    o4 = e2.call(t2, s2);
                  } catch (t3) {
                    o4 = [6, t3], n2 = 0;
                  } finally {
                    r2 = i2 = 0;
                  }
                if (5 & o4[0])
                  throw o4[1];
                return { value: o4[0] ? o4[1] : void 0, done: true };
              }([o3, a3]);
            };
          }
        }, G = function(t2) {
          return this instanceof G ? (this.v = t2, this) : new G(t2);
        }, H = function(t2, e2, r2) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var n2, i2 = r2.apply(t2, e2 || []), o2 = [];
          return n2 = {}, s2("next"), s2("throw"), s2("return"), n2[Symbol.asyncIterator] = function() {
            return this;
          }, n2;
          function s2(t3) {
            i2[t3] && (n2[t3] = function(e3) {
              return new Promise(function(r3, n3) {
                o2.push([t3, e3, r3, n3]) > 1 || a2(t3, e3);
              });
            });
          }
          function a2(t3, e3) {
            try {
              (r3 = i2[t3](e3)).value instanceof G ? Promise.resolve(r3.value.v).then(h2, u2) : c2(o2[0][2], r3);
            } catch (t4) {
              c2(o2[0][3], t4);
            }
            var r3;
          }
          function h2(t3) {
            a2("next", t3);
          }
          function u2(t3) {
            a2("throw", t3);
          }
          function c2(t3, e3) {
            t3(e3), o2.shift(), o2.length && a2(o2[0][0], o2[0][1]);
          }
        };
        function X(t2) {
          if (null == t2)
            throw new Error("Assertion Failure: value must not be null nor undefined");
        }
        function q(t2) {
          return null != t2[Symbol.asyncIterator] ? t2 : function(t3) {
            return H(this, arguments, function() {
              var e2, r2, n2, i2;
              return K(this, function(o2) {
                switch (o2.label) {
                  case 0:
                    e2 = t3.getReader(), o2.label = 1;
                  case 1:
                    o2.trys.push([1, , 9, 10]), o2.label = 2;
                  case 2:
                    return [4, G(e2.read())];
                  case 3:
                    return r2 = o2.sent(), n2 = r2.done, i2 = r2.value, n2 ? [4, G(void 0)] : [3, 5];
                  case 4:
                    return [2, o2.sent()];
                  case 5:
                    return X(i2), [4, G(i2)];
                  case 6:
                    return [4, o2.sent()];
                  case 7:
                    return o2.sent(), [3, 2];
                  case 8:
                    return [3, 10];
                  case 9:
                    return e2.releaseLock(), [7];
                  case 10:
                    return [2];
                }
              });
            });
          }(t2);
        }
        var J = function(t2, e2, r2, n2) {
          return new (r2 || (r2 = Promise))(function(i2, o2) {
            function s2(t3) {
              try {
                h2(n2.next(t3));
              } catch (t4) {
                o2(t4);
              }
            }
            function a2(t3) {
              try {
                h2(n2.throw(t3));
              } catch (t4) {
                o2(t4);
              }
            }
            function h2(t3) {
              var e3;
              t3.done ? i2(t3.value) : (e3 = t3.value, e3 instanceof r2 ? e3 : new r2(function(t4) {
                t4(e3);
              })).then(s2, a2);
            }
            h2((n2 = n2.apply(t2, e2 || [])).next());
          });
        }, Q = function(t2, e2) {
          var r2, n2, i2, o2, s2 = { label: 0, sent: function() {
            if (1 & i2[0])
              throw i2[1];
            return i2[1];
          }, trys: [], ops: [] };
          return o2 = { next: a2(0), throw: a2(1), return: a2(2) }, "function" == typeof Symbol && (o2[Symbol.iterator] = function() {
            return this;
          }), o2;
          function a2(o3) {
            return function(a3) {
              return function(o4) {
                if (r2)
                  throw new TypeError("Generator is already executing.");
                for (; s2; )
                  try {
                    if (r2 = 1, n2 && (i2 = 2 & o4[0] ? n2.return : o4[0] ? n2.throw || ((i2 = n2.return) && i2.call(n2), 0) : n2.next) && !(i2 = i2.call(n2, o4[1])).done)
                      return i2;
                    switch (n2 = 0, i2 && (o4 = [2 & o4[0], i2.value]), o4[0]) {
                      case 0:
                      case 1:
                        i2 = o4;
                        break;
                      case 4:
                        return s2.label++, { value: o4[1], done: false };
                      case 5:
                        s2.label++, n2 = o4[1], o4 = [0];
                        continue;
                      case 7:
                        o4 = s2.ops.pop(), s2.trys.pop();
                        continue;
                      default:
                        if (!(i2 = s2.trys, (i2 = i2.length > 0 && i2[i2.length - 1]) || 6 !== o4[0] && 2 !== o4[0])) {
                          s2 = 0;
                          continue;
                        }
                        if (3 === o4[0] && (!i2 || o4[1] > i2[0] && o4[1] < i2[3])) {
                          s2.label = o4[1];
                          break;
                        }
                        if (6 === o4[0] && s2.label < i2[1]) {
                          s2.label = i2[1], i2 = o4;
                          break;
                        }
                        if (i2 && s2.label < i2[2]) {
                          s2.label = i2[2], s2.ops.push(o4);
                          break;
                        }
                        i2[2] && s2.ops.pop(), s2.trys.pop();
                        continue;
                    }
                    o4 = e2.call(t2, s2);
                  } catch (t3) {
                    o4 = [6, t3], n2 = 0;
                  } finally {
                    r2 = i2 = 0;
                  }
                if (5 & o4[0])
                  throw o4[1];
                return { value: o4[0] ? o4[1] : void 0, done: true };
              }([o3, a3]);
            };
          }
        };
        function Y(t2, e2) {
          return void 0 === e2 && (e2 = R), J(this, void 0, void 0, function() {
            var r2;
            return Q(this, function(n2) {
              return r2 = q(t2), [2, new O(e2.extensionCodec, e2.context, e2.maxStrLength, e2.maxBinLength, e2.maxArrayLength, e2.maxMapLength, e2.maxExtLength).decodeAsync(r2)];
            });
          });
        }
        function Z(t2, e2) {
          void 0 === e2 && (e2 = R);
          var r2 = q(t2);
          return new O(e2.extensionCodec, e2.context, e2.maxStrLength, e2.maxBinLength, e2.maxArrayLength, e2.maxMapLength, e2.maxExtLength).decodeArrayStream(r2);
        }
        function $(t2, e2) {
          void 0 === e2 && (e2 = R);
          var r2 = q(t2);
          return new O(e2.extensionCodec, e2.context, e2.maxStrLength, e2.maxBinLength, e2.maxArrayLength, e2.maxMapLength, e2.maxExtLength).decodeStream(r2);
        }
      }]);
    });
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/encoding/encoding.js
function containsEmpty(obj) {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (!obj[key] || obj[key].length === 0) {
        return { containsEmpty: true, firstEmptyKey: key };
      }
    }
  }
  return { containsEmpty: false, firstEmptyKey: void 0 };
}
function rawEncode(obj) {
  const options = { sortKeys: true };
  return msgpack.encode(obj, options);
}
function encode2(obj) {
  const emptyCheck = containsEmpty(obj);
  if (emptyCheck.containsEmpty) {
    throw new Error(ERROR_CONTAINS_EMPTY_STRING + emptyCheck.firstEmptyKey);
  }
  return rawEncode(obj);
}
function decode2(buffer) {
  return msgpack.decode(buffer);
}
var msgpack, ERROR_CONTAINS_EMPTY_STRING;
var init_encoding = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/encoding/encoding.js"() {
    msgpack = __toESM(require_msgpack_min());
    ERROR_CONTAINS_EMPTY_STRING = "The object contains empty or 0 values. First empty or 0 value encountered during encoding: ";
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/boxStorage.js
function translateBoxReference(reference, foreignApps, appIndex) {
  const referenceId = reference.appIndex;
  const referenceName = reference.name;
  const isOwnReference = referenceId === 0 || referenceId === appIndex;
  let index = 0;
  if (foreignApps != null) {
    index = foreignApps.indexOf(referenceId) + 1;
  }
  if (index === 0 && !isOwnReference) {
    throw new Error(`Box ref with appId ${referenceId} not in foreign-apps`);
  }
  return { i: index, n: referenceName };
}
function translateBoxReferences(references, foreignApps, appIndex) {
  if (references == null)
    return [];
  return references.map((bx) => translateBoxReference(bx, foreignApps, appIndex));
}
var init_boxStorage = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/boxStorage.js"() {
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/types/transactions/base.js
function isTransactionType(s) {
  return s === TransactionType.pay || s === TransactionType.keyreg || s === TransactionType.acfg || s === TransactionType.axfer || s === TransactionType.afrz || s === TransactionType.appl || s === TransactionType.stpf;
}
var TransactionType, OnApplicationComplete;
var init_base = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/types/transactions/base.js"() {
    (function(TransactionType2) {
      TransactionType2["pay"] = "pay";
      TransactionType2["keyreg"] = "keyreg";
      TransactionType2["acfg"] = "acfg";
      TransactionType2["axfer"] = "axfer";
      TransactionType2["afrz"] = "afrz";
      TransactionType2["appl"] = "appl";
      TransactionType2["stpf"] = "stpf";
    })(TransactionType || (TransactionType = {}));
    (function(OnApplicationComplete2) {
      OnApplicationComplete2[OnApplicationComplete2["NoOpOC"] = 0] = "NoOpOC";
      OnApplicationComplete2[OnApplicationComplete2["OptInOC"] = 1] = "OptInOC";
      OnApplicationComplete2[OnApplicationComplete2["CloseOutOC"] = 2] = "CloseOutOC";
      OnApplicationComplete2[OnApplicationComplete2["ClearStateOC"] = 3] = "ClearStateOC";
      OnApplicationComplete2[OnApplicationComplete2["UpdateApplicationOC"] = 4] = "UpdateApplicationOC";
      OnApplicationComplete2[OnApplicationComplete2["DeleteApplicationOC"] = 5] = "DeleteApplicationOC";
    })(OnApplicationComplete || (OnApplicationComplete = {}));
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/transaction.js
function getKeyregKey(input, inputName, length) {
  if (input == null) {
    return void 0;
  }
  let inputAsBuffer;
  if (typeof input === "string") {
    inputAsBuffer = Buffer.from(input, "base64");
  } else if (input.constructor === Uint8Array) {
    inputAsBuffer = Buffer.from(input);
  } else if (Buffer.isBuffer(input)) {
    inputAsBuffer = input;
  }
  if (inputAsBuffer == null || inputAsBuffer.byteLength !== length) {
    throw Error(`${inputName} must be a ${length} byte Uint8Array or Buffer or base64 string.`);
  }
  return inputAsBuffer;
}
function encodeUnsignedSimulateTransaction(transactionObject) {
  const objToEncode = {
    txn: transactionObject.get_obj_for_encoding()
  };
  return encode2(objToEncode);
}
function encodeUnsignedTransaction(transactionObject) {
  const objToEncode = transactionObject.get_obj_for_encoding();
  return encode2(objToEncode);
}
function decodeUnsignedTransaction(transactionBuffer) {
  const partlyDecodedObject = decode2(transactionBuffer);
  return Transaction.from_obj_for_encoding(partlyDecodedObject);
}
function decodeSignedTransaction(transactionBuffer) {
  const stxnDecoded = decode2(transactionBuffer);
  const stxn = {
    ...stxnDecoded,
    txn: Transaction.from_obj_for_encoding(stxnDecoded.txn)
  };
  return stxn;
}
function instantiateTxnIfNeeded(transactionLike) {
  return transactionLike instanceof Transaction ? transactionLike : new Transaction(transactionLike);
}
var import_hi_base322, ALGORAND_TRANSACTION_LENGTH, ALGORAND_MIN_TX_FEE, ALGORAND_TRANSACTION_LEASE_LENGTH, ALGORAND_MAX_ASSET_DECIMALS, NUM_ADDL_BYTES_AFTER_SIGNING, ALGORAND_TRANSACTION_LEASE_LABEL_LENGTH, ALGORAND_TRANSACTION_ADDRESS_LENGTH, ALGORAND_TRANSACTION_REKEY_LABEL_LENGTH, ASSET_METADATA_HASH_LENGTH, KEYREG_VOTE_KEY_LENGTH, KEYREG_SELECTION_KEY_LENGTH, KEYREG_STATE_PROOF_KEY_LENGTH, Transaction;
var init_transaction = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/transaction.js"() {
    init_buffer();
    import_hi_base322 = __toESM(require_base32());
    init_address();
    init_encoding();
    init_naclWrappers();
    init_utils();
    init_boxStorage();
    init_base();
    ALGORAND_TRANSACTION_LENGTH = 52;
    ALGORAND_MIN_TX_FEE = 1e3;
    ALGORAND_TRANSACTION_LEASE_LENGTH = 32;
    ALGORAND_MAX_ASSET_DECIMALS = 19;
    NUM_ADDL_BYTES_AFTER_SIGNING = 75;
    ALGORAND_TRANSACTION_LEASE_LABEL_LENGTH = 5;
    ALGORAND_TRANSACTION_ADDRESS_LENGTH = 32;
    ALGORAND_TRANSACTION_REKEY_LABEL_LENGTH = 5;
    ASSET_METADATA_HASH_LENGTH = 32;
    KEYREG_VOTE_KEY_LENGTH = 32;
    KEYREG_SELECTION_KEY_LENGTH = 32;
    KEYREG_STATE_PROOF_KEY_LENGTH = 64;
    Transaction = class {
      constructor({ ...transaction }) {
        this.name = "Transaction";
        this.tag = Buffer.from("TX");
        const defaults = {
          type: TransactionType.pay,
          flatFee: false,
          nonParticipation: false
        };
        if (typeof transaction.type === "undefined") {
          transaction.type = defaults.type;
        }
        if (typeof transaction.flatFee === "undefined") {
          transaction.flatFee = defaults.flatFee;
        }
        if (transaction.type === TransactionType.keyreg && typeof transaction.voteKey !== "undefined" && typeof transaction.nonParticipation === "undefined") {
          transaction.nonParticipation = defaults.nonParticipation;
        }
        if (transaction.suggestedParams !== void 0) {
          const reference = transaction;
          reference.genesisHash = reference.suggestedParams.genesisHash;
          reference.fee = reference.suggestedParams.fee;
          if (reference.suggestedParams.flatFee !== void 0)
            reference.flatFee = reference.suggestedParams.flatFee;
          reference.firstRound = reference.suggestedParams.firstRound;
          reference.lastRound = reference.suggestedParams.lastRound;
          reference.genesisID = reference.suggestedParams.genesisID;
        }
        const txn = transaction;
        txn.from = decodeAddress(txn.from);
        if (txn.to !== void 0)
          txn.to = decodeAddress(txn.to);
        if (txn.closeRemainderTo !== void 0)
          txn.closeRemainderTo = decodeAddress(txn.closeRemainderTo);
        if (txn.assetManager !== void 0)
          txn.assetManager = decodeAddress(txn.assetManager);
        if (txn.assetReserve !== void 0)
          txn.assetReserve = decodeAddress(txn.assetReserve);
        if (txn.assetFreeze !== void 0)
          txn.assetFreeze = decodeAddress(txn.assetFreeze);
        if (txn.assetClawback !== void 0)
          txn.assetClawback = decodeAddress(txn.assetClawback);
        if (txn.assetRevocationTarget !== void 0)
          txn.assetRevocationTarget = decodeAddress(txn.assetRevocationTarget);
        if (txn.freezeAccount !== void 0)
          txn.freezeAccount = decodeAddress(txn.freezeAccount);
        if (txn.reKeyTo !== void 0)
          txn.reKeyTo = decodeAddress(txn.reKeyTo);
        if (txn.genesisHash === void 0)
          throw Error("genesis hash must be specified and in a base64 string.");
        txn.genesisHash = Buffer.from(txn.genesisHash, "base64");
        if (txn.amount !== void 0 && (!(Number.isSafeInteger(txn.amount) || typeof txn.amount === "bigint" && txn.amount <= BigInt("0xffffffffffffffff")) || txn.amount < 0))
          throw Error("Amount must be a positive number and smaller than 2^64-1. If the number is larger than 2^53-1, use bigint.");
        if (!Number.isSafeInteger(txn.fee) || txn.fee < 0)
          throw Error("fee must be a positive number and smaller than 2^53-1");
        if (!Number.isSafeInteger(txn.firstRound) || txn.firstRound < 0)
          throw Error("firstRound must be a positive number");
        if (!Number.isSafeInteger(txn.lastRound) || txn.lastRound < 0)
          throw Error("lastRound must be a positive number");
        if (txn.extraPages !== void 0 && (!Number.isInteger(txn.extraPages) || txn.extraPages < 0 || txn.extraPages > 3))
          throw Error("extraPages must be an Integer between and including 0 to 3");
        if (txn.assetTotal !== void 0 && (!(Number.isSafeInteger(txn.assetTotal) || typeof txn.assetTotal === "bigint" && txn.assetTotal <= BigInt("0xffffffffffffffff")) || txn.assetTotal < 0))
          throw Error("Total asset issuance must be a positive number and smaller than 2^64-1. If the number is larger than 2^53-1, use bigint.");
        if (txn.assetDecimals !== void 0 && (!Number.isSafeInteger(txn.assetDecimals) || txn.assetDecimals < 0 || txn.assetDecimals > ALGORAND_MAX_ASSET_DECIMALS))
          throw Error(`assetDecimals must be a positive number and smaller than ${ALGORAND_MAX_ASSET_DECIMALS.toString()}`);
        if (txn.assetIndex !== void 0 && (!Number.isSafeInteger(txn.assetIndex) || txn.assetIndex < 0))
          throw Error("Asset index must be a positive number and smaller than 2^53-1");
        if (txn.appIndex !== void 0 && (!Number.isSafeInteger(txn.appIndex) || txn.appIndex < 0))
          throw Error("Application index must be a positive number and smaller than 2^53-1");
        if (txn.appLocalInts !== void 0 && (!Number.isSafeInteger(txn.appLocalInts) || txn.appLocalInts < 0))
          throw Error("Application local ints count must be a positive number and smaller than 2^53-1");
        if (txn.appLocalByteSlices !== void 0 && (!Number.isSafeInteger(txn.appLocalByteSlices) || txn.appLocalByteSlices < 0))
          throw Error("Application local byte slices count must be a positive number and smaller than 2^53-1");
        if (txn.appGlobalInts !== void 0 && (!Number.isSafeInteger(txn.appGlobalInts) || txn.appGlobalInts < 0))
          throw Error("Application global ints count must be a positive number and smaller than 2^53-1");
        if (txn.appGlobalByteSlices !== void 0 && (!Number.isSafeInteger(txn.appGlobalByteSlices) || txn.appGlobalByteSlices < 0))
          throw Error("Application global byte slices count must be a positive number and smaller than 2^53-1");
        if (txn.appApprovalProgram !== void 0) {
          if (txn.appApprovalProgram.constructor !== Uint8Array)
            throw Error("appApprovalProgram must be a Uint8Array.");
        }
        if (txn.appClearProgram !== void 0) {
          if (txn.appClearProgram.constructor !== Uint8Array)
            throw Error("appClearProgram must be a Uint8Array.");
        }
        if (txn.appArgs !== void 0) {
          if (!Array.isArray(txn.appArgs))
            throw Error("appArgs must be an Array of Uint8Array.");
          txn.appArgs = txn.appArgs.slice();
          txn.appArgs.forEach((arg) => {
            if (arg.constructor !== Uint8Array)
              throw Error("each element of AppArgs must be a Uint8Array.");
          });
        } else {
          txn.appArgs = [];
        }
        if (txn.appAccounts !== void 0) {
          if (!Array.isArray(txn.appAccounts))
            throw Error("appAccounts must be an Array of addresses.");
          txn.appAccounts = txn.appAccounts.map((addressAsString) => decodeAddress(addressAsString));
        }
        if (txn.appForeignApps !== void 0) {
          if (!Array.isArray(txn.appForeignApps))
            throw Error("appForeignApps must be an Array of integers.");
          txn.appForeignApps = txn.appForeignApps.slice();
          txn.appForeignApps.forEach((foreignAppIndex) => {
            if (!Number.isSafeInteger(foreignAppIndex) || foreignAppIndex < 0)
              throw Error("each foreign application index must be a positive number and smaller than 2^53-1");
          });
        }
        if (txn.appForeignAssets !== void 0) {
          if (!Array.isArray(txn.appForeignAssets))
            throw Error("appForeignAssets must be an Array of integers.");
          txn.appForeignAssets = txn.appForeignAssets.slice();
          txn.appForeignAssets.forEach((foreignAssetIndex) => {
            if (!Number.isSafeInteger(foreignAssetIndex) || foreignAssetIndex < 0)
              throw Error("each foreign asset index must be a positive number and smaller than 2^53-1");
          });
        }
        if (txn.boxes !== void 0) {
          if (!Array.isArray(txn.boxes))
            throw Error("boxes must be an Array of BoxReference.");
          txn.boxes = txn.boxes.slice();
          txn.boxes.forEach((box) => {
            if (!Number.isSafeInteger(box.appIndex) || box.name.constructor !== Uint8Array)
              throw Error("box app index must be a number and name must be an Uint8Array.");
          });
        }
        if (txn.assetMetadataHash !== void 0 && txn.assetMetadataHash.length !== 0) {
          if (typeof txn.assetMetadataHash === "string") {
            txn.assetMetadataHash = new Uint8Array(Buffer.from(txn.assetMetadataHash));
          }
          if (txn.assetMetadataHash.constructor !== Uint8Array || txn.assetMetadataHash.byteLength !== ASSET_METADATA_HASH_LENGTH) {
            throw Error(`assetMetadataHash must be a ${ASSET_METADATA_HASH_LENGTH} byte Uint8Array or string.`);
          }
          if (txn.assetMetadataHash.every((value) => value === 0)) {
            txn.assetMetadataHash = void 0;
          }
        } else {
          txn.assetMetadataHash = void 0;
        }
        if (txn.note !== void 0) {
          if (txn.note.constructor !== Uint8Array)
            throw Error("note must be a Uint8Array.");
        } else {
          txn.note = new Uint8Array(0);
        }
        if (txn.lease !== void 0) {
          if (txn.lease.constructor !== Uint8Array)
            throw Error("lease must be a Uint8Array.");
          if (txn.lease.length !== ALGORAND_TRANSACTION_LEASE_LENGTH)
            throw Error(`lease must be of length ${ALGORAND_TRANSACTION_LEASE_LENGTH.toString()}.`);
          if (txn.lease.every((value) => value === 0)) {
            txn.lease = new Uint8Array(0);
          }
        } else {
          txn.lease = new Uint8Array(0);
        }
        txn.voteKey = getKeyregKey(txn.voteKey, "voteKey", KEYREG_VOTE_KEY_LENGTH);
        txn.selectionKey = getKeyregKey(txn.selectionKey, "selectionKey", KEYREG_SELECTION_KEY_LENGTH);
        txn.stateProofKey = getKeyregKey(txn.stateProofKey, "stateProofKey", KEYREG_STATE_PROOF_KEY_LENGTH);
        if (txn.nonParticipation && (txn.voteKey || txn.selectionKey || txn.voteFirst || txn.stateProofKey || txn.voteLast || txn.voteKeyDilution)) {
          throw new Error("nonParticipation is true but participation params are present.");
        }
        if (!txn.nonParticipation && (txn.voteKey || txn.selectionKey || txn.stateProofKey || txn.voteFirst || txn.voteLast || txn.voteKeyDilution) && !(txn.voteKey && txn.selectionKey && txn.voteFirst && txn.voteLast && txn.voteKeyDilution)) {
          throw new Error("online key registration missing at least one of the following fields: voteKey, selectionKey, voteFirst, voteLast, voteKeyDilution");
        }
        delete txn.suggestedParams;
        Object.assign(this, removeUndefinedProperties(txn));
        if (!txn.flatFee) {
          this.fee *= this.estimateSize();
          if (this.fee < ALGORAND_MIN_TX_FEE) {
            this.fee = ALGORAND_MIN_TX_FEE;
          }
        }
        this.group = void 0;
        if (txn.stateProofType !== void 0 && (!Number.isSafeInteger(txn.stateProofType) || txn.stateProofType < 0))
          throw Error("State Proof type must be a positive number and smaller than 2^53-1");
        if (txn.stateProofMessage !== void 0) {
          if (txn.stateProofMessage.constructor !== Uint8Array)
            throw Error("stateProofMessage must be a Uint8Array.");
        } else {
          txn.stateProofMessage = new Uint8Array(0);
        }
        if (txn.stateProof !== void 0) {
          if (txn.stateProof.constructor !== Uint8Array)
            throw Error("stateProof must be a Uint8Array.");
        } else {
          txn.stateProof = new Uint8Array(0);
        }
      }
      // eslint-disable-next-line camelcase
      get_obj_for_encoding() {
        if (this.type === "pay") {
          const txn = {
            amt: this.amount,
            fee: this.fee,
            fv: this.firstRound,
            lv: this.lastRound,
            note: Buffer.from(this.note),
            snd: Buffer.from(this.from.publicKey),
            type: "pay",
            gen: this.genesisID,
            gh: this.genesisHash,
            lx: Buffer.from(this.lease),
            grp: this.group
          };
          if (this.closeRemainderTo !== void 0 && encodeAddress(this.closeRemainderTo.publicKey) !== ALGORAND_ZERO_ADDRESS_STRING) {
            txn.close = Buffer.from(this.closeRemainderTo.publicKey);
          }
          if (this.reKeyTo !== void 0) {
            txn.rekey = Buffer.from(this.reKeyTo.publicKey);
          }
          if (this.to !== void 0)
            txn.rcv = Buffer.from(this.to.publicKey);
          if (!txn.note.length)
            delete txn.note;
          if (!txn.amt)
            delete txn.amt;
          if (!txn.fee)
            delete txn.fee;
          if (!txn.fv)
            delete txn.fv;
          if (!txn.gen)
            delete txn.gen;
          if (txn.grp === void 0)
            delete txn.grp;
          if (!txn.lx.length)
            delete txn.lx;
          if (!txn.rekey)
            delete txn.rekey;
          return txn;
        }
        if (this.type === "keyreg") {
          const txn = {
            fee: this.fee,
            fv: this.firstRound,
            lv: this.lastRound,
            note: Buffer.from(this.note),
            snd: Buffer.from(this.from.publicKey),
            type: this.type,
            gen: this.genesisID,
            gh: this.genesisHash,
            lx: Buffer.from(this.lease),
            grp: this.group,
            votekey: this.voteKey,
            selkey: this.selectionKey,
            sprfkey: this.stateProofKey,
            votefst: this.voteFirst,
            votelst: this.voteLast,
            votekd: this.voteKeyDilution
          };
          if (!txn.note.length)
            delete txn.note;
          if (!txn.lx.length)
            delete txn.lx;
          if (!txn.fee)
            delete txn.fee;
          if (!txn.fv)
            delete txn.fv;
          if (!txn.gen)
            delete txn.gen;
          if (txn.grp === void 0)
            delete txn.grp;
          if (this.reKeyTo !== void 0) {
            txn.rekey = Buffer.from(this.reKeyTo.publicKey);
          }
          if (this.nonParticipation) {
            txn.nonpart = true;
          }
          if (!txn.selkey)
            delete txn.selkey;
          if (!txn.votekey)
            delete txn.votekey;
          if (!txn.sprfkey)
            delete txn.sprfkey;
          if (!txn.votefst)
            delete txn.votefst;
          if (!txn.votelst)
            delete txn.votelst;
          if (!txn.votekd)
            delete txn.votekd;
          return txn;
        }
        if (this.type === "acfg") {
          const txn = {
            fee: this.fee,
            fv: this.firstRound,
            lv: this.lastRound,
            note: Buffer.from(this.note),
            snd: Buffer.from(this.from.publicKey),
            type: this.type,
            gen: this.genesisID,
            gh: this.genesisHash,
            lx: Buffer.from(this.lease),
            grp: this.group,
            caid: this.assetIndex,
            apar: {
              t: this.assetTotal,
              df: this.assetDefaultFrozen,
              dc: this.assetDecimals
            }
          };
          if (this.assetManager !== void 0)
            txn.apar.m = Buffer.from(this.assetManager.publicKey);
          if (this.assetReserve !== void 0)
            txn.apar.r = Buffer.from(this.assetReserve.publicKey);
          if (this.assetFreeze !== void 0)
            txn.apar.f = Buffer.from(this.assetFreeze.publicKey);
          if (this.assetClawback !== void 0)
            txn.apar.c = Buffer.from(this.assetClawback.publicKey);
          if (this.assetName !== void 0)
            txn.apar.an = this.assetName;
          if (this.assetUnitName !== void 0)
            txn.apar.un = this.assetUnitName;
          if (this.assetURL !== void 0)
            txn.apar.au = this.assetURL;
          if (this.assetMetadataHash !== void 0)
            txn.apar.am = Buffer.from(this.assetMetadataHash);
          if (!txn.note.length)
            delete txn.note;
          if (!txn.lx.length)
            delete txn.lx;
          if (!txn.amt)
            delete txn.amt;
          if (!txn.fee)
            delete txn.fee;
          if (!txn.fv)
            delete txn.fv;
          if (!txn.gen)
            delete txn.gen;
          if (this.reKeyTo !== void 0) {
            txn.rekey = Buffer.from(this.reKeyTo.publicKey);
          }
          if (!txn.caid)
            delete txn.caid;
          if (!txn.apar.t && !txn.apar.un && !txn.apar.an && !txn.apar.df && !txn.apar.m && !txn.apar.r && !txn.apar.f && !txn.apar.c && !txn.apar.au && !txn.apar.am && !txn.apar.dc) {
            delete txn.apar;
          } else {
            if (!txn.apar.t)
              delete txn.apar.t;
            if (!txn.apar.dc)
              delete txn.apar.dc;
            if (!txn.apar.un)
              delete txn.apar.un;
            if (!txn.apar.an)
              delete txn.apar.an;
            if (!txn.apar.df)
              delete txn.apar.df;
            if (!txn.apar.m)
              delete txn.apar.m;
            if (!txn.apar.r)
              delete txn.apar.r;
            if (!txn.apar.f)
              delete txn.apar.f;
            if (!txn.apar.c)
              delete txn.apar.c;
            if (!txn.apar.au)
              delete txn.apar.au;
            if (!txn.apar.am)
              delete txn.apar.am;
          }
          if (txn.grp === void 0)
            delete txn.grp;
          return txn;
        }
        if (this.type === "axfer") {
          const txn = {
            aamt: this.amount,
            fee: this.fee,
            fv: this.firstRound,
            lv: this.lastRound,
            note: Buffer.from(this.note),
            snd: Buffer.from(this.from.publicKey),
            arcv: Buffer.from(this.to.publicKey),
            type: this.type,
            gen: this.genesisID,
            gh: this.genesisHash,
            lx: Buffer.from(this.lease),
            grp: this.group,
            xaid: this.assetIndex
          };
          if (this.closeRemainderTo !== void 0)
            txn.aclose = Buffer.from(this.closeRemainderTo.publicKey);
          if (this.assetRevocationTarget !== void 0)
            txn.asnd = Buffer.from(this.assetRevocationTarget.publicKey);
          if (!txn.note.length)
            delete txn.note;
          if (!txn.lx.length)
            delete txn.lx;
          if (!txn.aamt)
            delete txn.aamt;
          if (!txn.amt)
            delete txn.amt;
          if (!txn.fee)
            delete txn.fee;
          if (!txn.fv)
            delete txn.fv;
          if (!txn.gen)
            delete txn.gen;
          if (txn.grp === void 0)
            delete txn.grp;
          if (!txn.aclose)
            delete txn.aclose;
          if (!txn.asnd)
            delete txn.asnd;
          if (!txn.rekey)
            delete txn.rekey;
          if (this.reKeyTo !== void 0) {
            txn.rekey = Buffer.from(this.reKeyTo.publicKey);
          }
          return txn;
        }
        if (this.type === "afrz") {
          const txn = {
            fee: this.fee,
            fv: this.firstRound,
            lv: this.lastRound,
            note: Buffer.from(this.note),
            snd: Buffer.from(this.from.publicKey),
            type: this.type,
            gen: this.genesisID,
            gh: this.genesisHash,
            lx: Buffer.from(this.lease),
            grp: this.group,
            faid: this.assetIndex,
            afrz: this.freezeState
          };
          if (this.freezeAccount !== void 0)
            txn.fadd = Buffer.from(this.freezeAccount.publicKey);
          if (!txn.note.length)
            delete txn.note;
          if (!txn.lx.length)
            delete txn.lx;
          if (!txn.amt)
            delete txn.amt;
          if (!txn.fee)
            delete txn.fee;
          if (!txn.fv)
            delete txn.fv;
          if (!txn.gen)
            delete txn.gen;
          if (!txn.afrz)
            delete txn.afrz;
          if (txn.grp === void 0)
            delete txn.grp;
          if (this.reKeyTo !== void 0) {
            txn.rekey = Buffer.from(this.reKeyTo.publicKey);
          }
          return txn;
        }
        if (this.type === "appl") {
          const txn = {
            fee: this.fee,
            fv: this.firstRound,
            lv: this.lastRound,
            note: Buffer.from(this.note),
            snd: Buffer.from(this.from.publicKey),
            type: this.type,
            gen: this.genesisID,
            gh: this.genesisHash,
            lx: Buffer.from(this.lease),
            grp: this.group,
            apid: this.appIndex,
            apan: this.appOnComplete,
            apls: {
              nui: this.appLocalInts,
              nbs: this.appLocalByteSlices
            },
            apgs: {
              nui: this.appGlobalInts,
              nbs: this.appGlobalByteSlices
            },
            apfa: this.appForeignApps,
            apas: this.appForeignAssets,
            apep: this.extraPages,
            apbx: translateBoxReferences(this.boxes, this.appForeignApps, this.appIndex)
          };
          if (this.reKeyTo !== void 0) {
            txn.rekey = Buffer.from(this.reKeyTo.publicKey);
          }
          if (this.appApprovalProgram !== void 0) {
            txn.apap = Buffer.from(this.appApprovalProgram);
          }
          if (this.appClearProgram !== void 0) {
            txn.apsu = Buffer.from(this.appClearProgram);
          }
          if (this.appArgs !== void 0) {
            txn.apaa = this.appArgs.map((arg) => Buffer.from(arg));
          }
          if (this.appAccounts !== void 0) {
            txn.apat = this.appAccounts.map((decodedAddress) => Buffer.from(decodedAddress.publicKey));
          }
          if (!txn.note.length)
            delete txn.note;
          if (!txn.lx.length)
            delete txn.lx;
          if (!txn.amt)
            delete txn.amt;
          if (!txn.fee)
            delete txn.fee;
          if (!txn.fv)
            delete txn.fv;
          if (!txn.gen)
            delete txn.gen;
          if (!txn.apid)
            delete txn.apid;
          if (!txn.apls.nui)
            delete txn.apls.nui;
          if (!txn.apls.nbs)
            delete txn.apls.nbs;
          if (!txn.apls.nui && !txn.apls.nbs)
            delete txn.apls;
          if (!txn.apgs.nui)
            delete txn.apgs.nui;
          if (!txn.apgs.nbs)
            delete txn.apgs.nbs;
          if (!txn.apaa || !txn.apaa.length)
            delete txn.apaa;
          if (!txn.apgs.nui && !txn.apgs.nbs)
            delete txn.apgs;
          if (!txn.apap)
            delete txn.apap;
          if (!txn.apsu)
            delete txn.apsu;
          if (!txn.apan)
            delete txn.apan;
          if (!txn.apfa || !txn.apfa.length)
            delete txn.apfa;
          if (!txn.apas || !txn.apas.length)
            delete txn.apas;
          for (const box of txn.apbx) {
            if (!box.i)
              delete box.i;
            if (!box.n || !box.n.length)
              delete box.n;
          }
          if (!txn.apbx || !txn.apbx.length)
            delete txn.apbx;
          if (!txn.apat || !txn.apat.length)
            delete txn.apat;
          if (!txn.apep)
            delete txn.apep;
          if (txn.grp === void 0)
            delete txn.grp;
          return txn;
        }
        if (this.type === "stpf") {
          const txn = {
            fee: this.fee,
            fv: this.firstRound,
            lv: this.lastRound,
            note: Buffer.from(this.note),
            snd: Buffer.from(this.from.publicKey),
            type: this.type,
            gen: this.genesisID,
            gh: this.genesisHash,
            lx: Buffer.from(this.lease),
            sptype: this.stateProofType,
            spmsg: Buffer.from(this.stateProofMessage),
            sp: Buffer.from(this.stateProof)
          };
          if (!txn.sptype)
            delete txn.sptype;
          if (!txn.note.length)
            delete txn.note;
          if (!txn.lx.length)
            delete txn.lx;
          if (!txn.amt)
            delete txn.amt;
          if (!txn.fee)
            delete txn.fee;
          if (!txn.fv)
            delete txn.fv;
          if (!txn.gen)
            delete txn.gen;
          if (!txn.apid)
            delete txn.apid;
          if (!txn.apaa || !txn.apaa.length)
            delete txn.apaa;
          if (!txn.apap)
            delete txn.apap;
          if (!txn.apsu)
            delete txn.apsu;
          if (!txn.apan)
            delete txn.apan;
          if (!txn.apfa || !txn.apfa.length)
            delete txn.apfa;
          if (!txn.apas || !txn.apas.length)
            delete txn.apas;
          if (!txn.apat || !txn.apat.length)
            delete txn.apat;
          if (!txn.apep)
            delete txn.apep;
          if (txn.grp === void 0)
            delete txn.grp;
          return txn;
        }
        return void 0;
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(txnForEnc) {
        const txn = Object.create(this.prototype);
        txn.name = "Transaction";
        txn.tag = Buffer.from("TX");
        txn.genesisID = txnForEnc.gen;
        txn.genesisHash = Buffer.from(txnForEnc.gh);
        if (!isTransactionType(txnForEnc.type)) {
          throw new Error(`Unrecognized transaction type: ${txnForEnc.type}`);
        }
        txn.type = txnForEnc.type;
        txn.fee = txnForEnc.fee;
        txn.firstRound = txnForEnc.fv;
        txn.lastRound = txnForEnc.lv;
        txn.note = new Uint8Array(txnForEnc.note);
        txn.lease = new Uint8Array(txnForEnc.lx);
        txn.from = decodeAddress(encodeAddress(new Uint8Array(txnForEnc.snd)));
        if (txnForEnc.grp !== void 0)
          txn.group = Buffer.from(txnForEnc.grp);
        if (txnForEnc.rekey !== void 0)
          txn.reKeyTo = decodeAddress(encodeAddress(new Uint8Array(txnForEnc.rekey)));
        if (txnForEnc.type === "pay") {
          txn.amount = txnForEnc.amt;
          txn.to = decodeAddress(encodeAddress(new Uint8Array(txnForEnc.rcv)));
          if (txnForEnc.close !== void 0)
            txn.closeRemainderTo = decodeAddress(encodeAddress(txnForEnc.close));
        } else if (txnForEnc.type === "keyreg") {
          if (txnForEnc.votekey !== void 0) {
            txn.voteKey = Buffer.from(txnForEnc.votekey);
          }
          if (txnForEnc.selkey !== void 0) {
            txn.selectionKey = Buffer.from(txnForEnc.selkey);
          }
          if (txnForEnc.sprfkey !== void 0) {
            txn.stateProofKey = Buffer.from(txnForEnc.sprfkey);
          }
          if (txnForEnc.votekd !== void 0) {
            txn.voteKeyDilution = txnForEnc.votekd;
          }
          if (txnForEnc.votefst !== void 0) {
            txn.voteFirst = txnForEnc.votefst;
          }
          if (txnForEnc.votelst !== void 0) {
            txn.voteLast = txnForEnc.votelst;
          }
          if (txnForEnc.nonpart !== void 0) {
            txn.nonParticipation = txnForEnc.nonpart;
          }
        } else if (txnForEnc.type === "acfg") {
          if (txnForEnc.caid !== void 0) {
            txn.assetIndex = txnForEnc.caid;
          }
          if (txnForEnc.apar !== void 0) {
            txn.assetTotal = txnForEnc.apar.t;
            txn.assetDefaultFrozen = txnForEnc.apar.df;
            if (txnForEnc.apar.dc !== void 0)
              txn.assetDecimals = txnForEnc.apar.dc;
            if (txnForEnc.apar.m !== void 0)
              txn.assetManager = decodeAddress(encodeAddress(new Uint8Array(txnForEnc.apar.m)));
            if (txnForEnc.apar.r !== void 0)
              txn.assetReserve = decodeAddress(encodeAddress(new Uint8Array(txnForEnc.apar.r)));
            if (txnForEnc.apar.f !== void 0)
              txn.assetFreeze = decodeAddress(encodeAddress(new Uint8Array(txnForEnc.apar.f)));
            if (txnForEnc.apar.c !== void 0)
              txn.assetClawback = decodeAddress(encodeAddress(new Uint8Array(txnForEnc.apar.c)));
            if (txnForEnc.apar.un !== void 0)
              txn.assetUnitName = txnForEnc.apar.un;
            if (txnForEnc.apar.an !== void 0)
              txn.assetName = txnForEnc.apar.an;
            if (txnForEnc.apar.au !== void 0)
              txn.assetURL = txnForEnc.apar.au;
            if (txnForEnc.apar.am !== void 0)
              txn.assetMetadataHash = txnForEnc.apar.am;
          }
        } else if (txnForEnc.type === "axfer") {
          if (txnForEnc.xaid !== void 0) {
            txn.assetIndex = txnForEnc.xaid;
          }
          if (txnForEnc.aamt !== void 0)
            txn.amount = txnForEnc.aamt;
          if (txnForEnc.aclose !== void 0) {
            txn.closeRemainderTo = decodeAddress(encodeAddress(new Uint8Array(txnForEnc.aclose)));
          }
          if (txnForEnc.asnd !== void 0) {
            txn.assetRevocationTarget = decodeAddress(encodeAddress(new Uint8Array(txnForEnc.asnd)));
          }
          txn.to = decodeAddress(encodeAddress(new Uint8Array(txnForEnc.arcv)));
        } else if (txnForEnc.type === "afrz") {
          if (txnForEnc.afrz !== void 0) {
            txn.freezeState = txnForEnc.afrz;
          }
          if (txnForEnc.faid !== void 0) {
            txn.assetIndex = txnForEnc.faid;
          }
          txn.freezeAccount = decodeAddress(encodeAddress(new Uint8Array(txnForEnc.fadd)));
        } else if (txnForEnc.type === "appl") {
          if (txnForEnc.apid !== void 0) {
            txn.appIndex = txnForEnc.apid;
          }
          if (txnForEnc.apan !== void 0) {
            txn.appOnComplete = txnForEnc.apan;
          }
          if (txnForEnc.apls !== void 0) {
            if (txnForEnc.apls.nui !== void 0)
              txn.appLocalInts = txnForEnc.apls.nui;
            if (txnForEnc.apls.nbs !== void 0)
              txn.appLocalByteSlices = txnForEnc.apls.nbs;
          }
          if (txnForEnc.apgs !== void 0) {
            if (txnForEnc.apgs.nui !== void 0)
              txn.appGlobalInts = txnForEnc.apgs.nui;
            if (txnForEnc.apgs.nbs !== void 0)
              txn.appGlobalByteSlices = txnForEnc.apgs.nbs;
          }
          if (txnForEnc.apep !== void 0) {
            txn.extraPages = txnForEnc.apep;
          }
          if (txnForEnc.apap !== void 0) {
            txn.appApprovalProgram = new Uint8Array(txnForEnc.apap);
          }
          if (txnForEnc.apsu !== void 0) {
            txn.appClearProgram = new Uint8Array(txnForEnc.apsu);
          }
          if (txnForEnc.apaa !== void 0) {
            txn.appArgs = txnForEnc.apaa.map((arg) => new Uint8Array(arg));
          }
          if (txnForEnc.apat !== void 0) {
            txn.appAccounts = txnForEnc.apat.map((addressBytes) => decodeAddress(encodeAddress(new Uint8Array(addressBytes))));
          }
          if (txnForEnc.apfa !== void 0) {
            txn.appForeignApps = txnForEnc.apfa;
          }
          if (txnForEnc.apas !== void 0) {
            txn.appForeignAssets = txnForEnc.apas;
          }
          if (txnForEnc.apbx !== void 0) {
            txn.boxes = txnForEnc.apbx.map((box) => ({
              // We return 0 for the app ID so that it's guaranteed translateBoxReferences will
              // translate the app index back to 0. If we instead returned the called app ID,
              // translateBoxReferences would translate the app index to a nonzero value if the called
              // app is also in the foreign app array.
              appIndex: box.i ? txn.appForeignApps[box.i - 1] : 0,
              name: box.n
            }));
          }
        } else if (txnForEnc.type === "stpf") {
          if (txnForEnc.sptype !== void 0) {
            txn.stateProofType = txnForEnc.sptype;
          }
          if (txnForEnc.sp !== void 0) {
            txn.stateProof = txnForEnc.sp;
          }
          if (txnForEnc.spmsg !== void 0) {
            txn.stateProofMessage = txnForEnc.spmsg;
          }
        }
        return txn;
      }
      estimateSize() {
        return this.toByte().length + NUM_ADDL_BYTES_AFTER_SIGNING;
      }
      bytesToSign() {
        const encodedMsg = this.toByte();
        return Buffer.from(concatArrays(this.tag, encodedMsg));
      }
      toByte() {
        return encode2(this.get_obj_for_encoding());
      }
      // returns the raw signature
      rawSignTxn(sk) {
        const toBeSigned = this.bytesToSign();
        const sig = sign(toBeSigned, sk);
        return Buffer.from(sig);
      }
      signTxn(sk) {
        const sTxn = {
          sig: this.rawSignTxn(sk),
          txn: this.get_obj_for_encoding()
        };
        const keypair = keyPairFromSecretKey(sk);
        const pubKeyFromSk = keypair.publicKey;
        if (encodeAddress(pubKeyFromSk) !== encodeAddress(this.from.publicKey)) {
          sTxn.sgnr = Buffer.from(pubKeyFromSk);
        }
        return new Uint8Array(encode2(sTxn));
      }
      attachSignature(signerAddr, signature) {
        if (!isValidSignatureLength(signature.length)) {
          throw new Error("Invalid signature length");
        }
        const sTxn = {
          sig: Buffer.from(signature),
          txn: this.get_obj_for_encoding()
        };
        if (signerAddr !== encodeAddress(this.from.publicKey)) {
          const signerPublicKey = decodeAddress(signerAddr).publicKey;
          sTxn.sgnr = Buffer.from(signerPublicKey);
        }
        return new Uint8Array(encode2(sTxn));
      }
      rawTxID() {
        const enMsg = this.toByte();
        const gh = Buffer.from(concatArrays(this.tag, enMsg));
        return Buffer.from(genericHash(gh));
      }
      txID() {
        const hash = this.rawTxID();
        return import_hi_base322.default.encode(hash).slice(0, ALGORAND_TRANSACTION_LENGTH);
      }
      // add a lease to a transaction not yet having
      // supply feePerByte to increment fee accordingly
      addLease(lease, feePerByte = 0) {
        let mutableLease;
        if (lease !== void 0) {
          if (lease.constructor !== Uint8Array)
            throw Error("lease must be a Uint8Array.");
          if (lease.length !== ALGORAND_TRANSACTION_LEASE_LENGTH)
            throw Error(`lease must be of length ${ALGORAND_TRANSACTION_LEASE_LENGTH.toString()}.`);
          mutableLease = new Uint8Array(lease);
        } else {
          mutableLease = new Uint8Array(0);
        }
        this.lease = mutableLease;
        if (feePerByte !== 0) {
          this.fee += (ALGORAND_TRANSACTION_LEASE_LABEL_LENGTH + ALGORAND_TRANSACTION_LEASE_LENGTH) * feePerByte;
        }
      }
      // add the rekey-to field to a transaction not yet having it
      // supply feePerByte to increment fee accordingly
      addRekey(reKeyTo, feePerByte = 0) {
        if (reKeyTo !== void 0) {
          this.reKeyTo = decodeAddress(reKeyTo);
        }
        if (feePerByte !== 0) {
          this.fee += (ALGORAND_TRANSACTION_REKEY_LABEL_LENGTH + ALGORAND_TRANSACTION_ADDRESS_LENGTH) * feePerByte;
        }
      }
      // build display dict for prettyPrint and toString
      // eslint-disable-next-line no-underscore-dangle
      _getDictForDisplay() {
        const forPrinting = {
          ...this
        };
        forPrinting.tag = forPrinting.tag.toString();
        forPrinting.from = encodeAddress(forPrinting.from.publicKey);
        if (forPrinting.to !== void 0)
          forPrinting.to = encodeAddress(forPrinting.to.publicKey);
        if (forPrinting.freezeAccount !== void 0)
          forPrinting.freezeAccount = encodeAddress(forPrinting.freezeAccount.publicKey);
        if (forPrinting.closeRemainderTo !== void 0)
          forPrinting.closeRemainderTo = encodeAddress(forPrinting.closeRemainderTo.publicKey);
        if (forPrinting.assetManager !== void 0)
          forPrinting.assetManager = encodeAddress(forPrinting.assetManager.publicKey);
        if (forPrinting.assetReserve !== void 0)
          forPrinting.assetReserve = encodeAddress(forPrinting.assetReserve.publicKey);
        if (forPrinting.assetFreeze !== void 0)
          forPrinting.assetFreeze = encodeAddress(forPrinting.assetFreeze.publicKey);
        if (forPrinting.assetClawback !== void 0)
          forPrinting.assetClawback = encodeAddress(forPrinting.assetClawback.publicKey);
        if (forPrinting.assetRevocationTarget !== void 0)
          forPrinting.assetRevocationTarget = encodeAddress(forPrinting.assetRevocationTarget.publicKey);
        if (forPrinting.reKeyTo !== void 0)
          forPrinting.reKeyTo = encodeAddress(forPrinting.reKeyTo.publicKey);
        forPrinting.genesisHash = forPrinting.genesisHash.toString("base64");
        return forPrinting;
      }
      // pretty print the transaction to console
      prettyPrint() {
        console.log(this._getDictForDisplay());
      }
      // get string representation
      toString() {
        return JSON.stringify(this._getDictForDisplay());
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/bid.js
var Bid;
var init_bid = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/bid.js"() {
    init_buffer();
    init_address();
    init_encoding();
    init_naclWrappers();
    init_utils();
    Bid = class {
      constructor({ bidderKey, bidAmount, bidID, auctionKey, auctionID, maxPrice }) {
        this.name = "Bid";
        this.tag = Buffer.from([97, 66]);
        const decodedBidderKey = decodeAddress(bidderKey);
        const decodedAuctionKey = decodeAddress(auctionKey);
        if (!Number.isSafeInteger(bidAmount) || bidAmount < 0)
          throw Error("Bid amount must be positive and 2^53-1");
        if (!Number.isSafeInteger(bidID) || bidID < 0)
          throw Error("BidID must be positive and 2^53-1");
        if (!Number.isSafeInteger(auctionID) || auctionID < 0)
          throw Error("auctionID must be positive");
        Object.assign(this, {
          bidderKey: decodedBidderKey,
          bidAmount,
          bidID,
          auctionKey: decodedAuctionKey,
          auctionID,
          maxPrice
        });
      }
      // eslint-disable-next-line camelcase
      get_obj_for_encoding() {
        return {
          bidder: Buffer.from(this.bidderKey.publicKey),
          cur: this.bidAmount,
          price: this.maxPrice,
          id: this.bidID,
          auc: Buffer.from(this.auctionKey.publicKey),
          aid: this.auctionID
        };
      }
      signBid(sk) {
        const encodedMsg = encode2(this.get_obj_for_encoding());
        const toBeSigned = Buffer.from(concatArrays(this.tag, encodedMsg));
        const sig = sign(toBeSigned, sk);
        const sBid = {
          sig: Buffer.from(sig),
          bid: this.get_obj_for_encoding()
        };
        const note = {
          t: "b",
          b: sBid
        };
        return new Uint8Array(encode2(note));
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/convert.js
function microalgosToAlgos(microalgos) {
  if (microalgos < 0 || !Number.isSafeInteger(microalgos)) {
    throw new Error(INVALID_MICROALGOS_ERROR_MSG);
  }
  return microalgos / MICROALGOS_TO_ALGOS_RATIO;
}
function algosToMicroalgos(algos) {
  const microalgos = algos * MICROALGOS_TO_ALGOS_RATIO;
  return Math.round(microalgos);
}
var MICROALGOS_TO_ALGOS_RATIO, INVALID_MICROALGOS_ERROR_MSG;
var init_convert = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/convert.js"() {
    MICROALGOS_TO_ALGOS_RATIO = 1e6;
    INVALID_MICROALGOS_ERROR_MSG = "Microalgos should be positive and less than 2^53 - 1.";
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/urlTokenBaseHTTPClient.js
var URLTokenBaseHTTPError, URLTokenBaseHTTPClient;
var init_urlTokenBaseHTTPClient = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/urlTokenBaseHTTPClient.js"() {
    init_buffer();
    URLTokenBaseHTTPError = class extends Error {
      constructor(message, response) {
        super(message);
        this.response = response;
        this.name = "URLTokenBaseHTTPError";
        this.response = response;
      }
    };
    URLTokenBaseHTTPClient = class {
      constructor(tokenHeader, baseServer, port, defaultHeaders = {}) {
        this.defaultHeaders = defaultHeaders;
        const fixedBaseServer = baseServer.endsWith("/") ? baseServer : `${baseServer}/`;
        const baseServerURL = new URL(fixedBaseServer);
        if (typeof port !== "undefined") {
          baseServerURL.port = port.toString();
        }
        if (baseServerURL.protocol.length === 0) {
          throw new Error("Invalid base server URL, protocol must be defined.");
        }
        this.baseURL = baseServerURL;
        this.tokenHeader = tokenHeader;
      }
      /**
       * Compute the URL for a path relative to the instance's address
       * @param relativePath - A path string
       * @param query - An optional key-value object of query parameters to add to the URL. If the
       *   relativePath already has query parameters on it, the additional parameters defined here will
       *   be added to the URL without modifying those (unless a key collision occurs).
       * @returns A URL string
       */
      getURL(relativePath, query) {
        let fixedRelativePath;
        if (relativePath.startsWith("./")) {
          fixedRelativePath = relativePath;
        } else if (relativePath.startsWith("/")) {
          fixedRelativePath = `.${relativePath}`;
        } else {
          fixedRelativePath = `./${relativePath}`;
        }
        const address = new URL(fixedRelativePath, this.baseURL);
        if (query) {
          for (const [key, value] of Object.entries(query)) {
            address.searchParams.set(key, value);
          }
        }
        return address.toString();
      }
      static formatFetchResponseHeaders(headers) {
        const headersObj = {};
        headers.forEach((key, value) => {
          headersObj[key] = value;
        });
        return headersObj;
      }
      static async checkHttpError(res) {
        if (res.ok) {
          return;
        }
        let body = null;
        let bodyErrorMessage = null;
        try {
          body = new Uint8Array(await res.arrayBuffer());
          const decoded = JSON.parse(Buffer.from(body).toString());
          if (decoded.message) {
            bodyErrorMessage = decoded.message;
          }
        } catch (_) {
        }
        let message = `Network request error. Received status ${res.status} (${res.statusText})`;
        if (bodyErrorMessage) {
          message += `: ${bodyErrorMessage}`;
        }
        throw new URLTokenBaseHTTPError(message, {
          body,
          status: res.status,
          headers: URLTokenBaseHTTPClient.formatFetchResponseHeaders(res.headers)
        });
      }
      static async formatFetchResponse(res) {
        await this.checkHttpError(res);
        return {
          body: new Uint8Array(await res.arrayBuffer()),
          status: res.status,
          headers: URLTokenBaseHTTPClient.formatFetchResponseHeaders(res.headers)
        };
      }
      async get(relativePath, query, requestHeaders = {}) {
        const headers = {
          ...this.tokenHeader,
          ...this.defaultHeaders,
          ...requestHeaders
        };
        const res = await fetch(this.getURL(relativePath, query), {
          headers
        });
        return URLTokenBaseHTTPClient.formatFetchResponse(res);
      }
      async post(relativePath, data, query, requestHeaders = {}) {
        const headers = {
          ...this.tokenHeader,
          ...this.defaultHeaders,
          ...requestHeaders
        };
        const res = await fetch(this.getURL(relativePath, query), {
          method: "POST",
          body: data,
          headers
        });
        return URLTokenBaseHTTPClient.formatFetchResponse(res);
      }
      async delete(relativePath, data, query, requestHeaders = {}) {
        const headers = {
          ...this.tokenHeader,
          ...this.defaultHeaders,
          ...requestHeaders
        };
        const res = await fetch(this.getURL(relativePath, query), {
          method: "DELETE",
          body: data,
          headers
        });
        return URLTokenBaseHTTPClient.formatFetchResponse(res);
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/client.js
function removeFalsyOrEmpty(obj) {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (!obj[key] || obj[key].length === 0)
        delete obj[key];
    }
  }
  return obj;
}
function tolowerCaseKeys(o) {
  return Object.keys(o).reduce((c, k) => (c[k.toLowerCase()] = o[k], c), {});
}
function getAcceptFormat(query) {
  if (query !== void 0 && Object.prototype.hasOwnProperty.call(query, "format")) {
    switch (query.format) {
      case "msgpack":
        return "application/msgpack";
      case "json":
      default:
        return "application/json";
    }
  } else
    return "application/json";
}
var HTTPClient;
var init_client = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/client.js"() {
    init_buffer();
    init_utils();
    init_urlTokenBaseHTTPClient();
    HTTPClient = class {
      constructor(bcOrTokenHeader, baseServer, port, defaultHeaders = {}) {
        if (baseServer !== void 0) {
          this.bc = new URLTokenBaseHTTPClient(bcOrTokenHeader, baseServer, port, defaultHeaders);
        } else {
          this.bc = bcOrTokenHeader;
        }
      }
      /**
       * Parse JSON using either the built-in JSON.parse or utils.parseJSON
       * depending on whether jsonOptions are provided or not
       *
       * @param text - JSON data
       * @param status - Status of the response (used in case parseJSON fails)
       * @param jsonOptions - Options object to use to decode JSON responses. See
       *   utils.parseJSON for the options available.
       */
      static parseJSON(text, status, jsonOptions = {}) {
        try {
          if (Object.keys(jsonOptions).length === 0) {
            return text && JSON.parse(text);
          }
          return text && parseJSON(text, jsonOptions);
        } catch (err_) {
          const err = err_;
          err.rawResponse = text || null;
          err.statusCode = status;
          throw err;
        }
      }
      /**
       * Serialize the data according to the requestHeaders
       * Assumes that requestHeaders contain a key "content-type"
       * If the content-type is "application/json", data is JSON serialized
       * Otherwise, data needs to be either an UTF-8 string that is converted to an Uint8Array
       * or an Uint8Array
       * @private
       */
      static serializeData(data, requestHeaders) {
        if (!data) {
          return new Uint8Array(0);
        }
        if (requestHeaders["content-type"] === "application/json") {
          return new Uint8Array(Buffer.from(JSON.stringify(data)));
        }
        if (typeof data === "string") {
          return new Uint8Array(Buffer.from(data));
        }
        if (data instanceof Uint8Array) {
          return data;
        }
        throw new Error("provided data is neither a string nor a Uint8Array and content-type is not application/json");
      }
      /**
       * Convert a BaseHTTPClientResponse into a full HTTPClientResponse
       * Parse the body in
       * Modifies in place res and return the result
       */
      static prepareResponse(res, format, parseBody, jsonOptions = {}) {
        let { body } = res;
        let text;
        if (format !== "application/msgpack") {
          text = body && Buffer.from(body).toString() || "";
        }
        if (parseBody && format === "application/json") {
          body = HTTPClient.parseJSON(text, res.status, jsonOptions);
        }
        return {
          ...res,
          body,
          text,
          ok: Math.trunc(res.status / 100) === 2
        };
      }
      /**
       * Prepare an error with a response
       * (the type of errors BaseHTTPClient are supposed to throw)
       * by adding the status and preparing the internal response
       * @private
       */
      static prepareResponseError(err) {
        if (err.response) {
          err.response = HTTPClient.prepareResponse(err.response, "application/json", true);
          err.status = err.response.status;
        }
        return err;
      }
      /**
       * Send a GET request.
       * @param relativePath - The path of the request.
       * @param query - An object containing the query parameters of the request.
       * @param requestHeaders - An object containing additional request headers to use.
       * @param jsonOptions - Options object to use to decode JSON responses. See
       *   utils.parseJSON for the options available.
       * @param parseBody - An optional boolean indicating whether the response body should be parsed
       *   or not.
       * @returns Response object.
       */
      async get(relativePath, query, requestHeaders = {}, jsonOptions = {}, parseBody = true) {
        const format = getAcceptFormat(query);
        const fullHeaders = { ...requestHeaders, accept: format };
        try {
          const res = await this.bc.get(relativePath, removeFalsyOrEmpty(query), fullHeaders);
          return HTTPClient.prepareResponse(res, format, parseBody, jsonOptions);
        } catch (err) {
          throw HTTPClient.prepareResponseError(err);
        }
      }
      /**
       * Send a POST request.
       * If no content-type present, adds the header "content-type: application/json"
       * and data is serialized in JSON (if not empty)
       */
      async post(relativePath, data, requestHeaders = {}, query, parseBody = true) {
        const fullHeaders = {
          "content-type": "application/json",
          ...tolowerCaseKeys(requestHeaders)
        };
        try {
          const res = await this.bc.post(relativePath, HTTPClient.serializeData(data, fullHeaders), query, fullHeaders);
          return HTTPClient.prepareResponse(res, "application/json", parseBody);
        } catch (err) {
          throw HTTPClient.prepareResponseError(err);
        }
      }
      /**
       * Send a DELETE request.
       * If no content-type present, adds the header "content-type: application/json"
       * and data is serialized in JSON (if not empty)
       */
      async delete(relativePath, data, requestHeaders = {}, parseBody = true) {
        const fullHeaders = {
          "content-type": "application/json",
          ...tolowerCaseKeys(requestHeaders)
        };
        const res = await this.bc.delete(relativePath, HTTPClient.serializeData(data, fullHeaders), void 0, fullHeaders);
        return HTTPClient.prepareResponse(res, "application/json", parseBody);
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/serviceClient.js
function convertTokenStringToTokenHeader(token = "", headerIdentifier) {
  const tokenHeader = {};
  if (token === "") {
    return tokenHeader;
  }
  tokenHeader[headerIdentifier] = token;
  return tokenHeader;
}
function isBaseHTTPClient(tbc) {
  return typeof tbc.get === "function";
}
var ServiceClient;
var init_serviceClient = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/serviceClient.js"() {
    init_client();
    init_intDecoding();
    ServiceClient = class {
      constructor(tokenHeaderIdentifier, tokenHeaderOrStrOrBaseClient, baseServer, port, defaultHeaders = {}) {
        if (isBaseHTTPClient(tokenHeaderOrStrOrBaseClient)) {
          this.c = new HTTPClient(tokenHeaderOrStrOrBaseClient);
        } else {
          let tokenHeader;
          if (typeof tokenHeaderOrStrOrBaseClient === "string") {
            tokenHeader = convertTokenStringToTokenHeader(tokenHeaderOrStrOrBaseClient, tokenHeaderIdentifier);
          } else {
            tokenHeader = tokenHeaderOrStrOrBaseClient;
          }
          this.c = new HTTPClient(tokenHeader, baseServer, port, defaultHeaders);
        }
        this.intDecoding = intDecoding_default.DEFAULT;
      }
      /**
       * Set the default int decoding method for all JSON requests this client creates.
       * @param method - \{"default" | "safe" | "mixed" | "bigint"\} method The method to use when parsing the
       *   response for request. Must be one of "default", "safe", "mixed", or "bigint". See
       *   JSONRequest.setIntDecoding for more details about what each method does.
       */
      setIntEncoding(method) {
        this.intDecoding = method;
      }
      /**
       * Get the default int decoding method for all JSON requests this client creates.
       */
      getIntEncoding() {
        return this.intDecoding;
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/basemodel.js
function _is_primitive(val) {
  return val === void 0 || val == null || typeof val !== "object" && typeof val !== "function";
}
function _get_obj_for_encoding(val, binary) {
  let targetPropValue;
  if (val instanceof Uint8Array) {
    targetPropValue = binary ? val : Buffer.from(val).toString("base64");
  } else if (typeof val.get_obj_for_encoding === "function") {
    targetPropValue = val.get_obj_for_encoding(binary);
  } else if (Array.isArray(val)) {
    targetPropValue = [];
    for (const elem of val) {
      targetPropValue.push(_get_obj_for_encoding(elem, binary));
    }
  } else if (typeof val === "object") {
    const obj = {};
    for (const prop of Object.keys(val)) {
      obj[prop] = _get_obj_for_encoding(val[prop], binary);
    }
    targetPropValue = obj;
  } else if (_is_primitive(val)) {
    targetPropValue = val;
  } else {
    throw new Error(`Unsupported value: ${String(val)}`);
  }
  return targetPropValue;
}
var BaseModel;
var init_basemodel = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/basemodel.js"() {
    init_buffer();
    BaseModel = class {
      /**
       * Get an object ready for encoding to either JSON or msgpack.
       * @param binary - Use true to indicate that the encoding can handle raw binary objects
       *   (Uint8Arrays). Use false to indicate that raw binary objects should be converted to base64
       *   strings. True should be used for objects that will be encoded with msgpack, and false should
       *   be used for objects that will be encoded with JSON.
       */
      get_obj_for_encoding(binary = false) {
        const obj = {};
        for (const prop of Object.keys(this.attribute_map)) {
          const name = this.attribute_map[prop];
          const value = this[prop];
          if (typeof value !== "undefined") {
            obj[name] = value === null ? null : _get_obj_for_encoding(value, binary);
          }
        }
        return obj;
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/models/types.js
var types_exports = {};
__export(types_exports, {
  Account: () => Account,
  AccountApplicationResponse: () => AccountApplicationResponse,
  AccountAssetResponse: () => AccountAssetResponse,
  AccountParticipation: () => AccountParticipation,
  AccountStateDelta: () => AccountStateDelta,
  Application: () => Application,
  ApplicationInitialStates: () => ApplicationInitialStates,
  ApplicationKVStorage: () => ApplicationKVStorage,
  ApplicationLocalReference: () => ApplicationLocalReference,
  ApplicationLocalState: () => ApplicationLocalState,
  ApplicationParams: () => ApplicationParams,
  ApplicationStateOperation: () => ApplicationStateOperation,
  ApplicationStateSchema: () => ApplicationStateSchema,
  Asset: () => Asset,
  AssetHolding: () => AssetHolding,
  AssetHoldingReference: () => AssetHoldingReference,
  AssetParams: () => AssetParams,
  AvmKeyValue: () => AvmKeyValue,
  AvmValue: () => AvmValue,
  BlockHashResponse: () => BlockHashResponse,
  BlockResponse: () => BlockResponse,
  BlockTxidsResponse: () => BlockTxidsResponse,
  Box: () => Box,
  BoxDescriptor: () => BoxDescriptor,
  BoxReference: () => BoxReference,
  BoxesResponse: () => BoxesResponse,
  BuildVersion: () => BuildVersion,
  CompileResponse: () => CompileResponse,
  DisassembleResponse: () => DisassembleResponse,
  DryrunRequest: () => DryrunRequest,
  DryrunResponse: () => DryrunResponse,
  DryrunSource: () => DryrunSource,
  DryrunState: () => DryrunState,
  DryrunTxnResult: () => DryrunTxnResult,
  ErrorResponse: () => ErrorResponse,
  EvalDelta: () => EvalDelta,
  EvalDeltaKeyValue: () => EvalDeltaKeyValue,
  GetBlockTimeStampOffsetResponse: () => GetBlockTimeStampOffsetResponse,
  GetSyncRoundResponse: () => GetSyncRoundResponse,
  KvDelta: () => KvDelta,
  LedgerStateDeltaForTransactionGroup: () => LedgerStateDeltaForTransactionGroup,
  LightBlockHeaderProof: () => LightBlockHeaderProof,
  NodeStatusResponse: () => NodeStatusResponse,
  PendingTransactionResponse: () => PendingTransactionResponse,
  PendingTransactionsResponse: () => PendingTransactionsResponse,
  PostTransactionsResponse: () => PostTransactionsResponse,
  ScratchChange: () => ScratchChange,
  SimulateInitialStates: () => SimulateInitialStates,
  SimulateRequest: () => SimulateRequest,
  SimulateRequestTransactionGroup: () => SimulateRequestTransactionGroup,
  SimulateResponse: () => SimulateResponse,
  SimulateTraceConfig: () => SimulateTraceConfig,
  SimulateTransactionGroupResult: () => SimulateTransactionGroupResult,
  SimulateTransactionResult: () => SimulateTransactionResult,
  SimulateUnnamedResourcesAccessed: () => SimulateUnnamedResourcesAccessed,
  SimulationEvalOverrides: () => SimulationEvalOverrides,
  SimulationOpcodeTraceUnit: () => SimulationOpcodeTraceUnit,
  SimulationTransactionExecTrace: () => SimulationTransactionExecTrace,
  StateProof: () => StateProof,
  StateProofMessage: () => StateProofMessage,
  SupplyResponse: () => SupplyResponse,
  TealKeyValue: () => TealKeyValue,
  TealValue: () => TealValue,
  TransactionGroupLedgerStateDeltasForRoundResponse: () => TransactionGroupLedgerStateDeltasForRoundResponse,
  TransactionParametersResponse: () => TransactionParametersResponse,
  TransactionProofResponse: () => TransactionProofResponse,
  Version: () => Version
});
var Account, AccountApplicationResponse, AccountAssetResponse, AccountParticipation, AccountStateDelta, Application, ApplicationInitialStates, ApplicationKVStorage, ApplicationLocalReference, ApplicationLocalState, ApplicationParams, ApplicationStateOperation, ApplicationStateSchema, Asset, AssetHolding, AssetHoldingReference, AssetParams, AvmKeyValue, AvmValue, BlockHashResponse, BlockResponse, BlockTxidsResponse, Box, BoxDescriptor, BoxReference, BoxesResponse, BuildVersion, CompileResponse, DisassembleResponse, DryrunRequest, DryrunResponse, DryrunSource, DryrunState, DryrunTxnResult, ErrorResponse, EvalDelta, EvalDeltaKeyValue, GetBlockTimeStampOffsetResponse, GetSyncRoundResponse, KvDelta, LedgerStateDeltaForTransactionGroup, LightBlockHeaderProof, NodeStatusResponse, PendingTransactionResponse, PendingTransactionsResponse, PostTransactionsResponse, ScratchChange, SimulateInitialStates, SimulateRequest, SimulateRequestTransactionGroup, SimulateResponse, SimulateTraceConfig, SimulateTransactionGroupResult, SimulateTransactionResult, SimulateUnnamedResourcesAccessed, SimulationEvalOverrides, SimulationOpcodeTraceUnit, SimulationTransactionExecTrace, StateProof, StateProofMessage, SupplyResponse, TealKeyValue, TealValue, TransactionGroupLedgerStateDeltasForRoundResponse, TransactionParametersResponse, TransactionProofResponse, Version;
var init_types = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/models/types.js"() {
    init_buffer();
    init_basemodel();
    Account = class extends BaseModel {
      /**
       * Creates a new `Account` object.
       * @param address - the account public key
       * @param amount - (algo) total number of MicroAlgos in the account
       * @param amountWithoutPendingRewards - specifies the amount of MicroAlgos in the account, without the pending rewards.
       * @param minBalance - MicroAlgo balance required by the account.
       * The requirement grows based on asset and application usage.
       * @param pendingRewards - amount of MicroAlgos of pending rewards in this account.
       * @param rewards - (ern) total rewards of MicroAlgos the account has received, including pending
       * rewards.
       * @param round - The round for which this information is relevant.
       * @param status - (onl) delegation status of the account's MicroAlgos
       * * Offline - indicates that the associated account is delegated.
       * * Online - indicates that the associated account used as part of the delegation
       * pool.
       * * NotParticipating - indicates that the associated account is neither a
       * delegator nor a delegate.
       * @param totalAppsOptedIn - The count of all applications that have been opted in, equivalent to the count
       * of application local data (AppLocalState objects) stored in this account.
       * @param totalAssetsOptedIn - The count of all assets that have been opted in, equivalent to the count of
       * AssetHolding objects held by this account.
       * @param totalCreatedApps - The count of all apps (AppParams objects) created by this account.
       * @param totalCreatedAssets - The count of all assets (AssetParams objects) created by this account.
       * @param appsLocalState - (appl) applications local data stored in this account.
       * Note the raw object uses `map[int] -> AppLocalState` for this type.
       * @param appsTotalExtraPages - (teap) the sum of all extra application program pages for this account.
       * @param appsTotalSchema - (tsch) stores the sum of all of the local schemas and global schemas in this
       * account.
       * Note: the raw account uses `StateSchema` for this type.
       * @param assets - (asset) assets held by this account.
       * Note the raw object uses `map[int] -> AssetHolding` for this type.
       * @param authAddr - (spend) the address against which signing should be checked. If empty, the
       * address of the current account is used. This field can be updated in any
       * transaction by setting the RekeyTo field.
       * @param createdApps - (appp) parameters of applications created by this account including app global
       * data.
       * Note: the raw account uses `map[int] -> AppParams` for this type.
       * @param createdAssets - (apar) parameters of assets created by this account.
       * Note: the raw account uses `map[int] -> Asset` for this type.
       * @param participation - AccountParticipation describes the parameters used by this account in consensus
       * protocol.
       * @param rewardBase - (ebase) used as part of the rewards computation. Only applicable to accounts
       * which are participating.
       * @param sigType - Indicates what type of signature is used by this account, must be one of:
       * * sig
       * * msig
       * * lsig
       * @param totalBoxBytes - (tbxb) The total number of bytes used by this account's app's box keys and
       * values.
       * @param totalBoxes - (tbx) The number of existing boxes created by this account's app.
       */
      constructor({ address, amount, amountWithoutPendingRewards, minBalance, pendingRewards, rewards, round, status, totalAppsOptedIn, totalAssetsOptedIn, totalCreatedApps, totalCreatedAssets, appsLocalState, appsTotalExtraPages, appsTotalSchema, assets, authAddr, createdApps, createdAssets, participation, rewardBase, sigType, totalBoxBytes, totalBoxes }) {
        super();
        this.address = address;
        this.amount = amount;
        this.amountWithoutPendingRewards = amountWithoutPendingRewards;
        this.minBalance = minBalance;
        this.pendingRewards = pendingRewards;
        this.rewards = rewards;
        this.round = round;
        this.status = status;
        this.totalAppsOptedIn = totalAppsOptedIn;
        this.totalAssetsOptedIn = totalAssetsOptedIn;
        this.totalCreatedApps = totalCreatedApps;
        this.totalCreatedAssets = totalCreatedAssets;
        this.appsLocalState = appsLocalState;
        this.appsTotalExtraPages = appsTotalExtraPages;
        this.appsTotalSchema = appsTotalSchema;
        this.assets = assets;
        this.authAddr = authAddr;
        this.createdApps = createdApps;
        this.createdAssets = createdAssets;
        this.participation = participation;
        this.rewardBase = rewardBase;
        this.sigType = sigType;
        this.totalBoxBytes = totalBoxBytes;
        this.totalBoxes = totalBoxes;
        this.attribute_map = {
          address: "address",
          amount: "amount",
          amountWithoutPendingRewards: "amount-without-pending-rewards",
          minBalance: "min-balance",
          pendingRewards: "pending-rewards",
          rewards: "rewards",
          round: "round",
          status: "status",
          totalAppsOptedIn: "total-apps-opted-in",
          totalAssetsOptedIn: "total-assets-opted-in",
          totalCreatedApps: "total-created-apps",
          totalCreatedAssets: "total-created-assets",
          appsLocalState: "apps-local-state",
          appsTotalExtraPages: "apps-total-extra-pages",
          appsTotalSchema: "apps-total-schema",
          assets: "assets",
          authAddr: "auth-addr",
          createdApps: "created-apps",
          createdAssets: "created-assets",
          participation: "participation",
          rewardBase: "reward-base",
          sigType: "sig-type",
          totalBoxBytes: "total-box-bytes",
          totalBoxes: "total-boxes"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["address"] === "undefined")
          throw new Error(`Response is missing required field 'address': ${data}`);
        if (typeof data["amount"] === "undefined")
          throw new Error(`Response is missing required field 'amount': ${data}`);
        if (typeof data["amount-without-pending-rewards"] === "undefined")
          throw new Error(`Response is missing required field 'amount-without-pending-rewards': ${data}`);
        if (typeof data["min-balance"] === "undefined")
          throw new Error(`Response is missing required field 'min-balance': ${data}`);
        if (typeof data["pending-rewards"] === "undefined")
          throw new Error(`Response is missing required field 'pending-rewards': ${data}`);
        if (typeof data["rewards"] === "undefined")
          throw new Error(`Response is missing required field 'rewards': ${data}`);
        if (typeof data["round"] === "undefined")
          throw new Error(`Response is missing required field 'round': ${data}`);
        if (typeof data["status"] === "undefined")
          throw new Error(`Response is missing required field 'status': ${data}`);
        if (typeof data["total-apps-opted-in"] === "undefined")
          throw new Error(`Response is missing required field 'total-apps-opted-in': ${data}`);
        if (typeof data["total-assets-opted-in"] === "undefined")
          throw new Error(`Response is missing required field 'total-assets-opted-in': ${data}`);
        if (typeof data["total-created-apps"] === "undefined")
          throw new Error(`Response is missing required field 'total-created-apps': ${data}`);
        if (typeof data["total-created-assets"] === "undefined")
          throw new Error(`Response is missing required field 'total-created-assets': ${data}`);
        return new Account({
          address: data["address"],
          amount: data["amount"],
          amountWithoutPendingRewards: data["amount-without-pending-rewards"],
          minBalance: data["min-balance"],
          pendingRewards: data["pending-rewards"],
          rewards: data["rewards"],
          round: data["round"],
          status: data["status"],
          totalAppsOptedIn: data["total-apps-opted-in"],
          totalAssetsOptedIn: data["total-assets-opted-in"],
          totalCreatedApps: data["total-created-apps"],
          totalCreatedAssets: data["total-created-assets"],
          appsLocalState: typeof data["apps-local-state"] !== "undefined" ? data["apps-local-state"].map(ApplicationLocalState.from_obj_for_encoding) : void 0,
          appsTotalExtraPages: data["apps-total-extra-pages"],
          appsTotalSchema: typeof data["apps-total-schema"] !== "undefined" ? ApplicationStateSchema.from_obj_for_encoding(data["apps-total-schema"]) : void 0,
          assets: typeof data["assets"] !== "undefined" ? data["assets"].map(AssetHolding.from_obj_for_encoding) : void 0,
          authAddr: data["auth-addr"],
          createdApps: typeof data["created-apps"] !== "undefined" ? data["created-apps"].map(Application.from_obj_for_encoding) : void 0,
          createdAssets: typeof data["created-assets"] !== "undefined" ? data["created-assets"].map(Asset.from_obj_for_encoding) : void 0,
          participation: typeof data["participation"] !== "undefined" ? AccountParticipation.from_obj_for_encoding(data["participation"]) : void 0,
          rewardBase: data["reward-base"],
          sigType: data["sig-type"],
          totalBoxBytes: data["total-box-bytes"],
          totalBoxes: data["total-boxes"]
        });
      }
    };
    AccountApplicationResponse = class extends BaseModel {
      /**
       * Creates a new `AccountApplicationResponse` object.
       * @param round - The round for which this information is relevant.
       * @param appLocalState - (appl) the application local data stored in this account.
       * The raw account uses `AppLocalState` for this type.
       * @param createdApp - (appp) parameters of the application created by this account including app
       * global data.
       * The raw account uses `AppParams` for this type.
       */
      constructor({ round, appLocalState, createdApp }) {
        super();
        this.round = round;
        this.appLocalState = appLocalState;
        this.createdApp = createdApp;
        this.attribute_map = {
          round: "round",
          appLocalState: "app-local-state",
          createdApp: "created-app"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["round"] === "undefined")
          throw new Error(`Response is missing required field 'round': ${data}`);
        return new AccountApplicationResponse({
          round: data["round"],
          appLocalState: typeof data["app-local-state"] !== "undefined" ? ApplicationLocalState.from_obj_for_encoding(data["app-local-state"]) : void 0,
          createdApp: typeof data["created-app"] !== "undefined" ? ApplicationParams.from_obj_for_encoding(data["created-app"]) : void 0
        });
      }
    };
    AccountAssetResponse = class extends BaseModel {
      /**
       * Creates a new `AccountAssetResponse` object.
       * @param round - The round for which this information is relevant.
       * @param assetHolding - (asset) Details about the asset held by this account.
       * The raw account uses `AssetHolding` for this type.
       * @param createdAsset - (apar) parameters of the asset created by this account.
       * The raw account uses `AssetParams` for this type.
       */
      constructor({ round, assetHolding, createdAsset }) {
        super();
        this.round = round;
        this.assetHolding = assetHolding;
        this.createdAsset = createdAsset;
        this.attribute_map = {
          round: "round",
          assetHolding: "asset-holding",
          createdAsset: "created-asset"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["round"] === "undefined")
          throw new Error(`Response is missing required field 'round': ${data}`);
        return new AccountAssetResponse({
          round: data["round"],
          assetHolding: typeof data["asset-holding"] !== "undefined" ? AssetHolding.from_obj_for_encoding(data["asset-holding"]) : void 0,
          createdAsset: typeof data["created-asset"] !== "undefined" ? AssetParams.from_obj_for_encoding(data["created-asset"]) : void 0
        });
      }
    };
    AccountParticipation = class extends BaseModel {
      /**
       * Creates a new `AccountParticipation` object.
       * @param selectionParticipationKey - (sel) Selection public key (if any) currently registered for this round.
       * @param voteFirstValid - (voteFst) First round for which this participation is valid.
       * @param voteKeyDilution - (voteKD) Number of subkeys in each batch of participation keys.
       * @param voteLastValid - (voteLst) Last round for which this participation is valid.
       * @param voteParticipationKey - (vote) root participation public key (if any) currently registered for this
       * round.
       * @param stateProofKey - (stprf) Root of the state proof key (if any)
       */
      constructor({ selectionParticipationKey, voteFirstValid, voteKeyDilution, voteLastValid, voteParticipationKey, stateProofKey }) {
        super();
        this.selectionParticipationKey = typeof selectionParticipationKey === "string" ? new Uint8Array(Buffer.from(selectionParticipationKey, "base64")) : selectionParticipationKey;
        this.voteFirstValid = voteFirstValid;
        this.voteKeyDilution = voteKeyDilution;
        this.voteLastValid = voteLastValid;
        this.voteParticipationKey = typeof voteParticipationKey === "string" ? new Uint8Array(Buffer.from(voteParticipationKey, "base64")) : voteParticipationKey;
        this.stateProofKey = typeof stateProofKey === "string" ? new Uint8Array(Buffer.from(stateProofKey, "base64")) : stateProofKey;
        this.attribute_map = {
          selectionParticipationKey: "selection-participation-key",
          voteFirstValid: "vote-first-valid",
          voteKeyDilution: "vote-key-dilution",
          voteLastValid: "vote-last-valid",
          voteParticipationKey: "vote-participation-key",
          stateProofKey: "state-proof-key"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["selection-participation-key"] === "undefined")
          throw new Error(`Response is missing required field 'selection-participation-key': ${data}`);
        if (typeof data["vote-first-valid"] === "undefined")
          throw new Error(`Response is missing required field 'vote-first-valid': ${data}`);
        if (typeof data["vote-key-dilution"] === "undefined")
          throw new Error(`Response is missing required field 'vote-key-dilution': ${data}`);
        if (typeof data["vote-last-valid"] === "undefined")
          throw new Error(`Response is missing required field 'vote-last-valid': ${data}`);
        if (typeof data["vote-participation-key"] === "undefined")
          throw new Error(`Response is missing required field 'vote-participation-key': ${data}`);
        return new AccountParticipation({
          selectionParticipationKey: data["selection-participation-key"],
          voteFirstValid: data["vote-first-valid"],
          voteKeyDilution: data["vote-key-dilution"],
          voteLastValid: data["vote-last-valid"],
          voteParticipationKey: data["vote-participation-key"],
          stateProofKey: data["state-proof-key"]
        });
      }
    };
    AccountStateDelta = class extends BaseModel {
      /**
       * Creates a new `AccountStateDelta` object.
       * @param address -
       * @param delta - Application state delta.
       */
      constructor({ address, delta }) {
        super();
        this.address = address;
        this.delta = delta;
        this.attribute_map = {
          address: "address",
          delta: "delta"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["address"] === "undefined")
          throw new Error(`Response is missing required field 'address': ${data}`);
        if (!Array.isArray(data["delta"]))
          throw new Error(`Response is missing required array field 'delta': ${data}`);
        return new AccountStateDelta({
          address: data["address"],
          delta: data["delta"].map(EvalDeltaKeyValue.from_obj_for_encoding)
        });
      }
    };
    Application = class extends BaseModel {
      /**
       * Creates a new `Application` object.
       * @param id - (appidx) application index.
       * @param params - (appparams) application parameters.
       */
      constructor({ id, params }) {
        super();
        this.id = id;
        this.params = params;
        this.attribute_map = {
          id: "id",
          params: "params"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["id"] === "undefined")
          throw new Error(`Response is missing required field 'id': ${data}`);
        if (typeof data["params"] === "undefined")
          throw new Error(`Response is missing required field 'params': ${data}`);
        return new Application({
          id: data["id"],
          params: ApplicationParams.from_obj_for_encoding(data["params"])
        });
      }
    };
    ApplicationInitialStates = class extends BaseModel {
      /**
       * Creates a new `ApplicationInitialStates` object.
       * @param id - Application index.
       * @param appBoxes - An application's global/local/box state.
       * @param appGlobals - An application's global/local/box state.
       * @param appLocals - An application's initial local states tied to different accounts.
       */
      constructor({ id, appBoxes, appGlobals, appLocals }) {
        super();
        this.id = id;
        this.appBoxes = appBoxes;
        this.appGlobals = appGlobals;
        this.appLocals = appLocals;
        this.attribute_map = {
          id: "id",
          appBoxes: "app-boxes",
          appGlobals: "app-globals",
          appLocals: "app-locals"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["id"] === "undefined")
          throw new Error(`Response is missing required field 'id': ${data}`);
        return new ApplicationInitialStates({
          id: data["id"],
          appBoxes: typeof data["app-boxes"] !== "undefined" ? ApplicationKVStorage.from_obj_for_encoding(data["app-boxes"]) : void 0,
          appGlobals: typeof data["app-globals"] !== "undefined" ? ApplicationKVStorage.from_obj_for_encoding(data["app-globals"]) : void 0,
          appLocals: typeof data["app-locals"] !== "undefined" ? data["app-locals"].map(ApplicationKVStorage.from_obj_for_encoding) : void 0
        });
      }
    };
    ApplicationKVStorage = class extends BaseModel {
      /**
       * Creates a new `ApplicationKVStorage` object.
       * @param kvs - Key-Value pairs representing application states.
       * @param account - The address of the account associated with the local state.
       */
      constructor({ kvs, account }) {
        super();
        this.kvs = kvs;
        this.account = account;
        this.attribute_map = {
          kvs: "kvs",
          account: "account"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (!Array.isArray(data["kvs"]))
          throw new Error(`Response is missing required array field 'kvs': ${data}`);
        return new ApplicationKVStorage({
          kvs: data["kvs"].map(AvmKeyValue.from_obj_for_encoding),
          account: data["account"]
        });
      }
    };
    ApplicationLocalReference = class extends BaseModel {
      /**
       * Creates a new `ApplicationLocalReference` object.
       * @param account - Address of the account with the local state.
       * @param app - Application ID of the local state application.
       */
      constructor({ account, app }) {
        super();
        this.account = account;
        this.app = app;
        this.attribute_map = {
          account: "account",
          app: "app"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["account"] === "undefined")
          throw new Error(`Response is missing required field 'account': ${data}`);
        if (typeof data["app"] === "undefined")
          throw new Error(`Response is missing required field 'app': ${data}`);
        return new ApplicationLocalReference({
          account: data["account"],
          app: data["app"]
        });
      }
    };
    ApplicationLocalState = class extends BaseModel {
      /**
       * Creates a new `ApplicationLocalState` object.
       * @param id - The application which this local state is for.
       * @param schema - (hsch) schema.
       * @param keyValue - (tkv) storage.
       */
      constructor({ id, schema, keyValue }) {
        super();
        this.id = id;
        this.schema = schema;
        this.keyValue = keyValue;
        this.attribute_map = {
          id: "id",
          schema: "schema",
          keyValue: "key-value"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["id"] === "undefined")
          throw new Error(`Response is missing required field 'id': ${data}`);
        if (typeof data["schema"] === "undefined")
          throw new Error(`Response is missing required field 'schema': ${data}`);
        return new ApplicationLocalState({
          id: data["id"],
          schema: ApplicationStateSchema.from_obj_for_encoding(data["schema"]),
          keyValue: typeof data["key-value"] !== "undefined" ? data["key-value"].map(TealKeyValue.from_obj_for_encoding) : void 0
        });
      }
    };
    ApplicationParams = class extends BaseModel {
      /**
       * Creates a new `ApplicationParams` object.
       * @param approvalProgram - (approv) approval program.
       * @param clearStateProgram - (clearp) approval program.
       * @param creator - The address that created this application. This is the address where the
       * parameters and global state for this application can be found.
       * @param extraProgramPages - (epp) the amount of extra program pages available to this app.
       * @param globalState - (gs) global state
       * @param globalStateSchema - (gsch) global schema
       * @param localStateSchema - (lsch) local schema
       */
      constructor({ approvalProgram, clearStateProgram, creator, extraProgramPages, globalState, globalStateSchema, localStateSchema }) {
        super();
        this.approvalProgram = typeof approvalProgram === "string" ? new Uint8Array(Buffer.from(approvalProgram, "base64")) : approvalProgram;
        this.clearStateProgram = typeof clearStateProgram === "string" ? new Uint8Array(Buffer.from(clearStateProgram, "base64")) : clearStateProgram;
        this.creator = creator;
        this.extraProgramPages = extraProgramPages;
        this.globalState = globalState;
        this.globalStateSchema = globalStateSchema;
        this.localStateSchema = localStateSchema;
        this.attribute_map = {
          approvalProgram: "approval-program",
          clearStateProgram: "clear-state-program",
          creator: "creator",
          extraProgramPages: "extra-program-pages",
          globalState: "global-state",
          globalStateSchema: "global-state-schema",
          localStateSchema: "local-state-schema"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["approval-program"] === "undefined")
          throw new Error(`Response is missing required field 'approval-program': ${data}`);
        if (typeof data["clear-state-program"] === "undefined")
          throw new Error(`Response is missing required field 'clear-state-program': ${data}`);
        if (typeof data["creator"] === "undefined")
          throw new Error(`Response is missing required field 'creator': ${data}`);
        return new ApplicationParams({
          approvalProgram: data["approval-program"],
          clearStateProgram: data["clear-state-program"],
          creator: data["creator"],
          extraProgramPages: data["extra-program-pages"],
          globalState: typeof data["global-state"] !== "undefined" ? data["global-state"].map(TealKeyValue.from_obj_for_encoding) : void 0,
          globalStateSchema: typeof data["global-state-schema"] !== "undefined" ? ApplicationStateSchema.from_obj_for_encoding(data["global-state-schema"]) : void 0,
          localStateSchema: typeof data["local-state-schema"] !== "undefined" ? ApplicationStateSchema.from_obj_for_encoding(data["local-state-schema"]) : void 0
        });
      }
    };
    ApplicationStateOperation = class extends BaseModel {
      /**
       * Creates a new `ApplicationStateOperation` object.
       * @param appStateType - Type of application state. Value `g` is **global state**, `l` is **local
       * state**, `b` is **boxes**.
       * @param key - The key (name) of the global/local/box state.
       * @param operation - Operation type. Value `w` is **write**, `d` is **delete**.
       * @param account - For local state changes, the address of the account associated with the local
       * state.
       * @param newValue - Represents an AVM value.
       */
      constructor({ appStateType, key, operation, account, newValue }) {
        super();
        this.appStateType = appStateType;
        this.key = typeof key === "string" ? new Uint8Array(Buffer.from(key, "base64")) : key;
        this.operation = operation;
        this.account = account;
        this.newValue = newValue;
        this.attribute_map = {
          appStateType: "app-state-type",
          key: "key",
          operation: "operation",
          account: "account",
          newValue: "new-value"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["app-state-type"] === "undefined")
          throw new Error(`Response is missing required field 'app-state-type': ${data}`);
        if (typeof data["key"] === "undefined")
          throw new Error(`Response is missing required field 'key': ${data}`);
        if (typeof data["operation"] === "undefined")
          throw new Error(`Response is missing required field 'operation': ${data}`);
        return new ApplicationStateOperation({
          appStateType: data["app-state-type"],
          key: data["key"],
          operation: data["operation"],
          account: data["account"],
          newValue: typeof data["new-value"] !== "undefined" ? AvmValue.from_obj_for_encoding(data["new-value"]) : void 0
        });
      }
    };
    ApplicationStateSchema = class extends BaseModel {
      /**
       * Creates a new `ApplicationStateSchema` object.
       * @param numUint - (nui) num of uints.
       * @param numByteSlice - (nbs) num of byte slices.
       */
      constructor({ numUint, numByteSlice }) {
        super();
        this.numUint = numUint;
        this.numByteSlice = numByteSlice;
        this.attribute_map = {
          numUint: "num-uint",
          numByteSlice: "num-byte-slice"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["num-uint"] === "undefined")
          throw new Error(`Response is missing required field 'num-uint': ${data}`);
        if (typeof data["num-byte-slice"] === "undefined")
          throw new Error(`Response is missing required field 'num-byte-slice': ${data}`);
        return new ApplicationStateSchema({
          numUint: data["num-uint"],
          numByteSlice: data["num-byte-slice"]
        });
      }
    };
    Asset = class extends BaseModel {
      /**
       * Creates a new `Asset` object.
       * @param index - unique asset identifier
       * @param params - AssetParams specifies the parameters for an asset.
       * (apar) when part of an AssetConfig transaction.
       * Definition:
       * data/transactions/asset.go : AssetParams
       */
      constructor({ index, params }) {
        super();
        this.index = index;
        this.params = params;
        this.attribute_map = {
          index: "index",
          params: "params"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["index"] === "undefined")
          throw new Error(`Response is missing required field 'index': ${data}`);
        if (typeof data["params"] === "undefined")
          throw new Error(`Response is missing required field 'params': ${data}`);
        return new Asset({
          index: data["index"],
          params: AssetParams.from_obj_for_encoding(data["params"])
        });
      }
    };
    AssetHolding = class extends BaseModel {
      /**
       * Creates a new `AssetHolding` object.
       * @param amount - (a) number of units held.
       * @param assetId - Asset ID of the holding.
       * @param isFrozen - (f) whether or not the holding is frozen.
       */
      constructor({ amount, assetId, isFrozen }) {
        super();
        this.amount = amount;
        this.assetId = assetId;
        this.isFrozen = isFrozen;
        this.attribute_map = {
          amount: "amount",
          assetId: "asset-id",
          isFrozen: "is-frozen"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["amount"] === "undefined")
          throw new Error(`Response is missing required field 'amount': ${data}`);
        if (typeof data["asset-id"] === "undefined")
          throw new Error(`Response is missing required field 'asset-id': ${data}`);
        if (typeof data["is-frozen"] === "undefined")
          throw new Error(`Response is missing required field 'is-frozen': ${data}`);
        return new AssetHolding({
          amount: data["amount"],
          assetId: data["asset-id"],
          isFrozen: data["is-frozen"]
        });
      }
    };
    AssetHoldingReference = class extends BaseModel {
      /**
       * Creates a new `AssetHoldingReference` object.
       * @param account - Address of the account holding the asset.
       * @param asset - Asset ID of the holding.
       */
      constructor({ account, asset }) {
        super();
        this.account = account;
        this.asset = asset;
        this.attribute_map = {
          account: "account",
          asset: "asset"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["account"] === "undefined")
          throw new Error(`Response is missing required field 'account': ${data}`);
        if (typeof data["asset"] === "undefined")
          throw new Error(`Response is missing required field 'asset': ${data}`);
        return new AssetHoldingReference({
          account: data["account"],
          asset: data["asset"]
        });
      }
    };
    AssetParams = class extends BaseModel {
      /**
       * Creates a new `AssetParams` object.
       * @param creator - The address that created this asset. This is the address where the parameters
       * for this asset can be found, and also the address where unwanted asset units can
       * be sent in the worst case.
       * @param decimals - (dc) The number of digits to use after the decimal point when displaying this
       * asset. If 0, the asset is not divisible. If 1, the base unit of the asset is in
       * tenths. If 2, the base unit of the asset is in hundredths, and so on. This value
       * must be between 0 and 19 (inclusive).
       * @param total - (t) The total number of units of this asset.
       * @param clawback - (c) Address of account used to clawback holdings of this asset. If empty,
       * clawback is not permitted.
       * @param defaultFrozen - (df) Whether holdings of this asset are frozen by default.
       * @param freeze - (f) Address of account used to freeze holdings of this asset. If empty, freezing
       * is not permitted.
       * @param manager - (m) Address of account used to manage the keys of this asset and to destroy it.
       * @param metadataHash - (am) A commitment to some unspecified asset metadata. The format of this
       * metadata is up to the application.
       * @param name - (an) Name of this asset, as supplied by the creator. Included only when the
       * asset name is composed of printable utf-8 characters.
       * @param nameB64 - Base64 encoded name of this asset, as supplied by the creator.
       * @param reserve - (r) Address of account holding reserve (non-minted) units of this asset.
       * @param unitName - (un) Name of a unit of this asset, as supplied by the creator. Included only
       * when the name of a unit of this asset is composed of printable utf-8 characters.
       * @param unitNameB64 - Base64 encoded name of a unit of this asset, as supplied by the creator.
       * @param url - (au) URL where more information about the asset can be retrieved. Included only
       * when the URL is composed of printable utf-8 characters.
       * @param urlB64 - Base64 encoded URL where more information about the asset can be retrieved.
       */
      constructor({ creator, decimals, total, clawback, defaultFrozen, freeze, manager, metadataHash, name, nameB64, reserve, unitName, unitNameB64, url, urlB64 }) {
        super();
        this.creator = creator;
        this.decimals = decimals;
        this.total = total;
        this.clawback = clawback;
        this.defaultFrozen = defaultFrozen;
        this.freeze = freeze;
        this.manager = manager;
        this.metadataHash = typeof metadataHash === "string" ? new Uint8Array(Buffer.from(metadataHash, "base64")) : metadataHash;
        this.name = name;
        this.nameB64 = typeof nameB64 === "string" ? new Uint8Array(Buffer.from(nameB64, "base64")) : nameB64;
        this.reserve = reserve;
        this.unitName = unitName;
        this.unitNameB64 = typeof unitNameB64 === "string" ? new Uint8Array(Buffer.from(unitNameB64, "base64")) : unitNameB64;
        this.url = url;
        this.urlB64 = typeof urlB64 === "string" ? new Uint8Array(Buffer.from(urlB64, "base64")) : urlB64;
        this.attribute_map = {
          creator: "creator",
          decimals: "decimals",
          total: "total",
          clawback: "clawback",
          defaultFrozen: "default-frozen",
          freeze: "freeze",
          manager: "manager",
          metadataHash: "metadata-hash",
          name: "name",
          nameB64: "name-b64",
          reserve: "reserve",
          unitName: "unit-name",
          unitNameB64: "unit-name-b64",
          url: "url",
          urlB64: "url-b64"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["creator"] === "undefined")
          throw new Error(`Response is missing required field 'creator': ${data}`);
        if (typeof data["decimals"] === "undefined")
          throw new Error(`Response is missing required field 'decimals': ${data}`);
        if (typeof data["total"] === "undefined")
          throw new Error(`Response is missing required field 'total': ${data}`);
        return new AssetParams({
          creator: data["creator"],
          decimals: data["decimals"],
          total: data["total"],
          clawback: data["clawback"],
          defaultFrozen: data["default-frozen"],
          freeze: data["freeze"],
          manager: data["manager"],
          metadataHash: data["metadata-hash"],
          name: data["name"],
          nameB64: data["name-b64"],
          reserve: data["reserve"],
          unitName: data["unit-name"],
          unitNameB64: data["unit-name-b64"],
          url: data["url"],
          urlB64: data["url-b64"]
        });
      }
    };
    AvmKeyValue = class extends BaseModel {
      /**
       * Creates a new `AvmKeyValue` object.
       * @param key -
       * @param value - Represents an AVM value.
       */
      constructor({ key, value }) {
        super();
        this.key = typeof key === "string" ? new Uint8Array(Buffer.from(key, "base64")) : key;
        this.value = value;
        this.attribute_map = {
          key: "key",
          value: "value"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["key"] === "undefined")
          throw new Error(`Response is missing required field 'key': ${data}`);
        if (typeof data["value"] === "undefined")
          throw new Error(`Response is missing required field 'value': ${data}`);
        return new AvmKeyValue({
          key: data["key"],
          value: AvmValue.from_obj_for_encoding(data["value"])
        });
      }
    };
    AvmValue = class extends BaseModel {
      /**
       * Creates a new `AvmValue` object.
       * @param type - value type. Value `1` refers to **bytes**, value `2` refers to **uint64**
       * @param bytes - bytes value.
       * @param uint - uint value.
       */
      constructor({ type, bytes, uint }) {
        super();
        this.type = type;
        this.bytes = typeof bytes === "string" ? new Uint8Array(Buffer.from(bytes, "base64")) : bytes;
        this.uint = uint;
        this.attribute_map = {
          type: "type",
          bytes: "bytes",
          uint: "uint"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["type"] === "undefined")
          throw new Error(`Response is missing required field 'type': ${data}`);
        return new AvmValue({
          type: data["type"],
          bytes: data["bytes"],
          uint: data["uint"]
        });
      }
    };
    BlockHashResponse = class extends BaseModel {
      /**
       * Creates a new `BlockHashResponse` object.
       * @param blockhash - Block header hash.
       */
      constructor({ blockhash }) {
        super();
        this.blockhash = blockhash;
        this.attribute_map = {
          blockhash: "blockHash"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["blockHash"] === "undefined")
          throw new Error(`Response is missing required field 'blockHash': ${data}`);
        return new BlockHashResponse({
          blockhash: data["blockHash"]
        });
      }
    };
    BlockResponse = class extends BaseModel {
      /**
       * Creates a new `BlockResponse` object.
       * @param block - Block header data.
       * @param cert - Optional certificate object. This is only included when the format is set to
       * message pack.
       */
      constructor({ block, cert }) {
        super();
        this.block = block;
        this.cert = cert;
        this.attribute_map = {
          block: "block",
          cert: "cert"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["block"] === "undefined")
          throw new Error(`Response is missing required field 'block': ${data}`);
        return new BlockResponse({
          block: data["block"],
          cert: data["cert"]
        });
      }
    };
    BlockTxidsResponse = class extends BaseModel {
      /**
       * Creates a new `BlockTxidsResponse` object.
       * @param blocktxids - Block transaction IDs.
       */
      constructor({ blocktxids }) {
        super();
        this.blocktxids = blocktxids;
        this.attribute_map = {
          blocktxids: "blockTxids"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (!Array.isArray(data["blockTxids"]))
          throw new Error(`Response is missing required array field 'blockTxids': ${data}`);
        return new BlockTxidsResponse({
          blocktxids: data["blockTxids"]
        });
      }
    };
    Box = class extends BaseModel {
      /**
       * Creates a new `Box` object.
       * @param name - (name) box name, base64 encoded
       * @param round - The round for which this information is relevant
       * @param value - (value) box value, base64 encoded.
       */
      constructor({ name, round, value }) {
        super();
        this.name = typeof name === "string" ? new Uint8Array(Buffer.from(name, "base64")) : name;
        this.round = round;
        this.value = typeof value === "string" ? new Uint8Array(Buffer.from(value, "base64")) : value;
        this.attribute_map = {
          name: "name",
          round: "round",
          value: "value"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["name"] === "undefined")
          throw new Error(`Response is missing required field 'name': ${data}`);
        if (typeof data["round"] === "undefined")
          throw new Error(`Response is missing required field 'round': ${data}`);
        if (typeof data["value"] === "undefined")
          throw new Error(`Response is missing required field 'value': ${data}`);
        return new Box({
          name: data["name"],
          round: data["round"],
          value: data["value"]
        });
      }
    };
    BoxDescriptor = class extends BaseModel {
      /**
       * Creates a new `BoxDescriptor` object.
       * @param name - Base64 encoded box name
       */
      constructor({ name }) {
        super();
        this.name = typeof name === "string" ? new Uint8Array(Buffer.from(name, "base64")) : name;
        this.attribute_map = {
          name: "name"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["name"] === "undefined")
          throw new Error(`Response is missing required field 'name': ${data}`);
        return new BoxDescriptor({
          name: data["name"]
        });
      }
    };
    BoxReference = class extends BaseModel {
      /**
       * Creates a new `BoxReference` object.
       * @param app - Application ID which this box belongs to
       * @param name - Base64 encoded box name
       */
      constructor({ app, name }) {
        super();
        this.app = app;
        this.name = typeof name === "string" ? new Uint8Array(Buffer.from(name, "base64")) : name;
        this.attribute_map = {
          app: "app",
          name: "name"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["app"] === "undefined")
          throw new Error(`Response is missing required field 'app': ${data}`);
        if (typeof data["name"] === "undefined")
          throw new Error(`Response is missing required field 'name': ${data}`);
        return new BoxReference({
          app: data["app"],
          name: data["name"]
        });
      }
    };
    BoxesResponse = class extends BaseModel {
      /**
       * Creates a new `BoxesResponse` object.
       * @param boxes -
       */
      constructor({ boxes }) {
        super();
        this.boxes = boxes;
        this.attribute_map = {
          boxes: "boxes"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (!Array.isArray(data["boxes"]))
          throw new Error(`Response is missing required array field 'boxes': ${data}`);
        return new BoxesResponse({
          boxes: data["boxes"].map(BoxDescriptor.from_obj_for_encoding)
        });
      }
    };
    BuildVersion = class extends BaseModel {
      /**
       * Creates a new `BuildVersion` object.
       * @param branch -
       * @param buildNumber -
       * @param channel -
       * @param commitHash -
       * @param major -
       * @param minor -
       */
      constructor({ branch, buildNumber, channel, commitHash, major, minor }) {
        super();
        this.branch = branch;
        this.buildNumber = buildNumber;
        this.channel = channel;
        this.commitHash = commitHash;
        this.major = major;
        this.minor = minor;
        this.attribute_map = {
          branch: "branch",
          buildNumber: "build_number",
          channel: "channel",
          commitHash: "commit_hash",
          major: "major",
          minor: "minor"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["branch"] === "undefined")
          throw new Error(`Response is missing required field 'branch': ${data}`);
        if (typeof data["build_number"] === "undefined")
          throw new Error(`Response is missing required field 'build_number': ${data}`);
        if (typeof data["channel"] === "undefined")
          throw new Error(`Response is missing required field 'channel': ${data}`);
        if (typeof data["commit_hash"] === "undefined")
          throw new Error(`Response is missing required field 'commit_hash': ${data}`);
        if (typeof data["major"] === "undefined")
          throw new Error(`Response is missing required field 'major': ${data}`);
        if (typeof data["minor"] === "undefined")
          throw new Error(`Response is missing required field 'minor': ${data}`);
        return new BuildVersion({
          branch: data["branch"],
          buildNumber: data["build_number"],
          channel: data["channel"],
          commitHash: data["commit_hash"],
          major: data["major"],
          minor: data["minor"]
        });
      }
    };
    CompileResponse = class extends BaseModel {
      /**
       * Creates a new `CompileResponse` object.
       * @param hash - base32 SHA512_256 of program bytes (Address style)
       * @param result - base64 encoded program bytes
       * @param sourcemap - JSON of the source map
       */
      constructor({ hash, result, sourcemap }) {
        super();
        this.hash = hash;
        this.result = result;
        this.sourcemap = sourcemap;
        this.attribute_map = {
          hash: "hash",
          result: "result",
          sourcemap: "sourcemap"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["hash"] === "undefined")
          throw new Error(`Response is missing required field 'hash': ${data}`);
        if (typeof data["result"] === "undefined")
          throw new Error(`Response is missing required field 'result': ${data}`);
        return new CompileResponse({
          hash: data["hash"],
          result: data["result"],
          sourcemap: data["sourcemap"]
        });
      }
    };
    DisassembleResponse = class extends BaseModel {
      /**
       * Creates a new `DisassembleResponse` object.
       * @param result - disassembled Teal code
       */
      constructor({ result }) {
        super();
        this.result = result;
        this.attribute_map = {
          result: "result"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["result"] === "undefined")
          throw new Error(`Response is missing required field 'result': ${data}`);
        return new DisassembleResponse({
          result: data["result"]
        });
      }
    };
    DryrunRequest = class extends BaseModel {
      /**
       * Creates a new `DryrunRequest` object.
       * @param accounts -
       * @param apps -
       * @param latestTimestamp - LatestTimestamp is available to some TEAL scripts. Defaults to the latest
       * confirmed timestamp this algod is attached to.
       * @param protocolVersion - ProtocolVersion specifies a specific version string to operate under, otherwise
       * whatever the current protocol of the network this algod is running in.
       * @param round - Round is available to some TEAL scripts. Defaults to the current round on the
       * network this algod is attached to.
       * @param sources -
       * @param txns -
       */
      constructor({ accounts, apps, latestTimestamp, protocolVersion, round, sources, txns }) {
        super();
        this.accounts = accounts;
        this.apps = apps;
        this.latestTimestamp = latestTimestamp;
        this.protocolVersion = protocolVersion;
        this.round = round;
        this.sources = sources;
        this.txns = txns;
        this.attribute_map = {
          accounts: "accounts",
          apps: "apps",
          latestTimestamp: "latest-timestamp",
          protocolVersion: "protocol-version",
          round: "round",
          sources: "sources",
          txns: "txns"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (!Array.isArray(data["accounts"]))
          throw new Error(`Response is missing required array field 'accounts': ${data}`);
        if (!Array.isArray(data["apps"]))
          throw new Error(`Response is missing required array field 'apps': ${data}`);
        if (typeof data["latest-timestamp"] === "undefined")
          throw new Error(`Response is missing required field 'latest-timestamp': ${data}`);
        if (typeof data["protocol-version"] === "undefined")
          throw new Error(`Response is missing required field 'protocol-version': ${data}`);
        if (typeof data["round"] === "undefined")
          throw new Error(`Response is missing required field 'round': ${data}`);
        if (!Array.isArray(data["sources"]))
          throw new Error(`Response is missing required array field 'sources': ${data}`);
        if (!Array.isArray(data["txns"]))
          throw new Error(`Response is missing required array field 'txns': ${data}`);
        return new DryrunRequest({
          accounts: data["accounts"].map(Account.from_obj_for_encoding),
          apps: data["apps"].map(Application.from_obj_for_encoding),
          latestTimestamp: data["latest-timestamp"],
          protocolVersion: data["protocol-version"],
          round: data["round"],
          sources: data["sources"].map(DryrunSource.from_obj_for_encoding),
          txns: data["txns"]
        });
      }
    };
    DryrunResponse = class extends BaseModel {
      /**
       * Creates a new `DryrunResponse` object.
       * @param error -
       * @param protocolVersion - Protocol version is the protocol version Dryrun was operated under.
       * @param txns -
       */
      constructor({ error, protocolVersion, txns }) {
        super();
        this.error = error;
        this.protocolVersion = protocolVersion;
        this.txns = txns;
        this.attribute_map = {
          error: "error",
          protocolVersion: "protocol-version",
          txns: "txns"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["error"] === "undefined")
          throw new Error(`Response is missing required field 'error': ${data}`);
        if (typeof data["protocol-version"] === "undefined")
          throw new Error(`Response is missing required field 'protocol-version': ${data}`);
        if (!Array.isArray(data["txns"]))
          throw new Error(`Response is missing required array field 'txns': ${data}`);
        return new DryrunResponse({
          error: data["error"],
          protocolVersion: data["protocol-version"],
          txns: data["txns"].map(DryrunTxnResult.from_obj_for_encoding)
        });
      }
    };
    DryrunSource = class extends BaseModel {
      /**
       * Creates a new `DryrunSource` object.
       * @param fieldName - FieldName is what kind of sources this is. If lsig then it goes into the
       * transactions[this.TxnIndex].LogicSig. If approv or clearp it goes into the
       * Approval Program or Clear State Program of application[this.AppIndex].
       * @param source -
       * @param txnIndex -
       * @param appIndex -
       */
      constructor({ fieldName, source, txnIndex, appIndex }) {
        super();
        this.fieldName = fieldName;
        this.source = source;
        this.txnIndex = txnIndex;
        this.appIndex = appIndex;
        this.attribute_map = {
          fieldName: "field-name",
          source: "source",
          txnIndex: "txn-index",
          appIndex: "app-index"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["field-name"] === "undefined")
          throw new Error(`Response is missing required field 'field-name': ${data}`);
        if (typeof data["source"] === "undefined")
          throw new Error(`Response is missing required field 'source': ${data}`);
        if (typeof data["txn-index"] === "undefined")
          throw new Error(`Response is missing required field 'txn-index': ${data}`);
        if (typeof data["app-index"] === "undefined")
          throw new Error(`Response is missing required field 'app-index': ${data}`);
        return new DryrunSource({
          fieldName: data["field-name"],
          source: data["source"],
          txnIndex: data["txn-index"],
          appIndex: data["app-index"]
        });
      }
    };
    DryrunState = class extends BaseModel {
      /**
       * Creates a new `DryrunState` object.
       * @param line - Line number
       * @param pc - Program counter
       * @param stack -
       * @param error - Evaluation error if any
       * @param scratch -
       */
      constructor({ line, pc, stack, error, scratch }) {
        super();
        this.line = line;
        this.pc = pc;
        this.stack = stack;
        this.error = error;
        this.scratch = scratch;
        this.attribute_map = {
          line: "line",
          pc: "pc",
          stack: "stack",
          error: "error",
          scratch: "scratch"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["line"] === "undefined")
          throw new Error(`Response is missing required field 'line': ${data}`);
        if (typeof data["pc"] === "undefined")
          throw new Error(`Response is missing required field 'pc': ${data}`);
        if (!Array.isArray(data["stack"]))
          throw new Error(`Response is missing required array field 'stack': ${data}`);
        return new DryrunState({
          line: data["line"],
          pc: data["pc"],
          stack: data["stack"].map(TealValue.from_obj_for_encoding),
          error: data["error"],
          scratch: typeof data["scratch"] !== "undefined" ? data["scratch"].map(TealValue.from_obj_for_encoding) : void 0
        });
      }
    };
    DryrunTxnResult = class extends BaseModel {
      /**
       * Creates a new `DryrunTxnResult` object.
       * @param disassembly - Disassembled program line by line.
       * @param appCallMessages -
       * @param appCallTrace -
       * @param budgetAdded - Budget added during execution of app call transaction.
       * @param budgetConsumed - Budget consumed during execution of app call transaction.
       * @param globalDelta - Application state delta.
       * @param localDeltas -
       * @param logicSigDisassembly - Disassembled lsig program line by line.
       * @param logicSigMessages -
       * @param logicSigTrace -
       * @param logs -
       */
      constructor({ disassembly, appCallMessages, appCallTrace, budgetAdded, budgetConsumed, globalDelta, localDeltas, logicSigDisassembly, logicSigMessages, logicSigTrace, logs }) {
        super();
        this.disassembly = disassembly;
        this.appCallMessages = appCallMessages;
        this.appCallTrace = appCallTrace;
        this.budgetAdded = budgetAdded;
        this.budgetConsumed = budgetConsumed;
        this.globalDelta = globalDelta;
        this.localDeltas = localDeltas;
        this.logicSigDisassembly = logicSigDisassembly;
        this.logicSigMessages = logicSigMessages;
        this.logicSigTrace = logicSigTrace;
        this.logs = logs;
        this.attribute_map = {
          disassembly: "disassembly",
          appCallMessages: "app-call-messages",
          appCallTrace: "app-call-trace",
          budgetAdded: "budget-added",
          budgetConsumed: "budget-consumed",
          globalDelta: "global-delta",
          localDeltas: "local-deltas",
          logicSigDisassembly: "logic-sig-disassembly",
          logicSigMessages: "logic-sig-messages",
          logicSigTrace: "logic-sig-trace",
          logs: "logs"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (!Array.isArray(data["disassembly"]))
          throw new Error(`Response is missing required array field 'disassembly': ${data}`);
        return new DryrunTxnResult({
          disassembly: data["disassembly"],
          appCallMessages: data["app-call-messages"],
          appCallTrace: typeof data["app-call-trace"] !== "undefined" ? data["app-call-trace"].map(DryrunState.from_obj_for_encoding) : void 0,
          budgetAdded: data["budget-added"],
          budgetConsumed: data["budget-consumed"],
          globalDelta: typeof data["global-delta"] !== "undefined" ? data["global-delta"].map(EvalDeltaKeyValue.from_obj_for_encoding) : void 0,
          localDeltas: typeof data["local-deltas"] !== "undefined" ? data["local-deltas"].map(AccountStateDelta.from_obj_for_encoding) : void 0,
          logicSigDisassembly: data["logic-sig-disassembly"],
          logicSigMessages: data["logic-sig-messages"],
          logicSigTrace: typeof data["logic-sig-trace"] !== "undefined" ? data["logic-sig-trace"].map(DryrunState.from_obj_for_encoding) : void 0,
          logs: data["logs"]
        });
      }
    };
    ErrorResponse = class extends BaseModel {
      /**
       * Creates a new `ErrorResponse` object.
       * @param message -
       * @param data -
       */
      constructor({ message, data }) {
        super();
        this.message = message;
        this.data = data;
        this.attribute_map = {
          message: "message",
          data: "data"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["message"] === "undefined")
          throw new Error(`Response is missing required field 'message': ${data}`);
        return new ErrorResponse({
          message: data["message"],
          data: data["data"]
        });
      }
    };
    EvalDelta = class extends BaseModel {
      /**
       * Creates a new `EvalDelta` object.
       * @param action - (at) delta action.
       * @param bytes - (bs) bytes value.
       * @param uint - (ui) uint value.
       */
      constructor({ action, bytes, uint }) {
        super();
        this.action = action;
        this.bytes = bytes;
        this.uint = uint;
        this.attribute_map = {
          action: "action",
          bytes: "bytes",
          uint: "uint"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["action"] === "undefined")
          throw new Error(`Response is missing required field 'action': ${data}`);
        return new EvalDelta({
          action: data["action"],
          bytes: data["bytes"],
          uint: data["uint"]
        });
      }
    };
    EvalDeltaKeyValue = class extends BaseModel {
      /**
       * Creates a new `EvalDeltaKeyValue` object.
       * @param key -
       * @param value - Represents a TEAL value delta.
       */
      constructor({ key, value }) {
        super();
        this.key = key;
        this.value = value;
        this.attribute_map = {
          key: "key",
          value: "value"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["key"] === "undefined")
          throw new Error(`Response is missing required field 'key': ${data}`);
        if (typeof data["value"] === "undefined")
          throw new Error(`Response is missing required field 'value': ${data}`);
        return new EvalDeltaKeyValue({
          key: data["key"],
          value: EvalDelta.from_obj_for_encoding(data["value"])
        });
      }
    };
    GetBlockTimeStampOffsetResponse = class extends BaseModel {
      /**
       * Creates a new `GetBlockTimeStampOffsetResponse` object.
       * @param offset - Timestamp offset in seconds.
       */
      constructor({ offset }) {
        super();
        this.offset = offset;
        this.attribute_map = {
          offset: "offset"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["offset"] === "undefined")
          throw new Error(`Response is missing required field 'offset': ${data}`);
        return new GetBlockTimeStampOffsetResponse({
          offset: data["offset"]
        });
      }
    };
    GetSyncRoundResponse = class extends BaseModel {
      /**
       * Creates a new `GetSyncRoundResponse` object.
       * @param round - The minimum sync round for the ledger.
       */
      constructor({ round }) {
        super();
        this.round = round;
        this.attribute_map = {
          round: "round"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["round"] === "undefined")
          throw new Error(`Response is missing required field 'round': ${data}`);
        return new GetSyncRoundResponse({
          round: data["round"]
        });
      }
    };
    KvDelta = class extends BaseModel {
      /**
       * Creates a new `KvDelta` object.
       * @param key - The key, base64 encoded.
       * @param value - The new value of the KV store entry, base64 encoded.
       */
      constructor({ key, value }) {
        super();
        this.key = typeof key === "string" ? new Uint8Array(Buffer.from(key, "base64")) : key;
        this.value = typeof value === "string" ? new Uint8Array(Buffer.from(value, "base64")) : value;
        this.attribute_map = {
          key: "key",
          value: "value"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        return new KvDelta({
          key: data["key"],
          value: data["value"]
        });
      }
    };
    LedgerStateDeltaForTransactionGroup = class extends BaseModel {
      /**
       * Creates a new `LedgerStateDeltaForTransactionGroup` object.
       * @param delta - Ledger StateDelta object
       * @param ids -
       */
      constructor({ delta, ids }) {
        super();
        this.delta = delta;
        this.ids = ids;
        this.attribute_map = {
          delta: "Delta",
          ids: "Ids"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["Delta"] === "undefined")
          throw new Error(`Response is missing required field 'Delta': ${data}`);
        if (!Array.isArray(data["Ids"]))
          throw new Error(`Response is missing required array field 'Ids': ${data}`);
        return new LedgerStateDeltaForTransactionGroup({
          delta: data["Delta"],
          ids: data["Ids"]
        });
      }
    };
    LightBlockHeaderProof = class extends BaseModel {
      /**
       * Creates a new `LightBlockHeaderProof` object.
       * @param index - The index of the light block header in the vector commitment tree
       * @param proof - The encoded proof.
       * @param treedepth - Represents the depth of the tree that is being proven, i.e. the number of edges
       * from a leaf to the root.
       */
      constructor({ index, proof, treedepth }) {
        super();
        this.index = index;
        this.proof = typeof proof === "string" ? new Uint8Array(Buffer.from(proof, "base64")) : proof;
        this.treedepth = treedepth;
        this.attribute_map = {
          index: "index",
          proof: "proof",
          treedepth: "treedepth"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["index"] === "undefined")
          throw new Error(`Response is missing required field 'index': ${data}`);
        if (typeof data["proof"] === "undefined")
          throw new Error(`Response is missing required field 'proof': ${data}`);
        if (typeof data["treedepth"] === "undefined")
          throw new Error(`Response is missing required field 'treedepth': ${data}`);
        return new LightBlockHeaderProof({
          index: data["index"],
          proof: data["proof"],
          treedepth: data["treedepth"]
        });
      }
    };
    NodeStatusResponse = class extends BaseModel {
      /**
       * Creates a new `NodeStatusResponse` object.
       * @param catchupTime - CatchupTime in nanoseconds
       * @param lastRound - LastRound indicates the last round seen
       * @param lastVersion - LastVersion indicates the last consensus version supported
       * @param nextVersion - NextVersion of consensus protocol to use
       * @param nextVersionRound - NextVersionRound is the round at which the next consensus version will apply
       * @param nextVersionSupported - NextVersionSupported indicates whether the next consensus version is supported
       * by this node
       * @param stoppedAtUnsupportedRound - StoppedAtUnsupportedRound indicates that the node does not support the new
       * rounds and has stopped making progress
       * @param timeSinceLastRound - TimeSinceLastRound in nanoseconds
       * @param catchpoint - The current catchpoint that is being caught up to
       * @param catchpointAcquiredBlocks - The number of blocks that have already been obtained by the node as part of the
       * catchup
       * @param catchpointProcessedAccounts - The number of accounts from the current catchpoint that have been processed so
       * far as part of the catchup
       * @param catchpointProcessedKvs - The number of key-values (KVs) from the current catchpoint that have been
       * processed so far as part of the catchup
       * @param catchpointTotalAccounts - The total number of accounts included in the current catchpoint
       * @param catchpointTotalBlocks - The total number of blocks that are required to complete the current catchpoint
       * catchup
       * @param catchpointTotalKvs - The total number of key-values (KVs) included in the current catchpoint
       * @param catchpointVerifiedAccounts - The number of accounts from the current catchpoint that have been verified so
       * far as part of the catchup
       * @param catchpointVerifiedKvs - The number of key-values (KVs) from the current catchpoint that have been
       * verified so far as part of the catchup
       * @param lastCatchpoint - The last catchpoint seen by the node
       * @param upgradeDelay - Upgrade delay
       * @param upgradeNextProtocolVoteBefore - Next protocol round
       * @param upgradeNoVotes - No votes cast for consensus upgrade
       * @param upgradeNodeVote - This node's upgrade vote
       * @param upgradeVoteRounds - Total voting rounds for current upgrade
       * @param upgradeVotes - Total votes cast for consensus upgrade
       * @param upgradeVotesRequired - Yes votes required for consensus upgrade
       * @param upgradeYesVotes - Yes votes cast for consensus upgrade
       */
      constructor({ catchupTime, lastRound, lastVersion, nextVersion, nextVersionRound, nextVersionSupported, stoppedAtUnsupportedRound, timeSinceLastRound, catchpoint, catchpointAcquiredBlocks, catchpointProcessedAccounts, catchpointProcessedKvs, catchpointTotalAccounts, catchpointTotalBlocks, catchpointTotalKvs, catchpointVerifiedAccounts, catchpointVerifiedKvs, lastCatchpoint, upgradeDelay, upgradeNextProtocolVoteBefore, upgradeNoVotes, upgradeNodeVote, upgradeVoteRounds, upgradeVotes, upgradeVotesRequired, upgradeYesVotes }) {
        super();
        this.catchupTime = catchupTime;
        this.lastRound = lastRound;
        this.lastVersion = lastVersion;
        this.nextVersion = nextVersion;
        this.nextVersionRound = nextVersionRound;
        this.nextVersionSupported = nextVersionSupported;
        this.stoppedAtUnsupportedRound = stoppedAtUnsupportedRound;
        this.timeSinceLastRound = timeSinceLastRound;
        this.catchpoint = catchpoint;
        this.catchpointAcquiredBlocks = catchpointAcquiredBlocks;
        this.catchpointProcessedAccounts = catchpointProcessedAccounts;
        this.catchpointProcessedKvs = catchpointProcessedKvs;
        this.catchpointTotalAccounts = catchpointTotalAccounts;
        this.catchpointTotalBlocks = catchpointTotalBlocks;
        this.catchpointTotalKvs = catchpointTotalKvs;
        this.catchpointVerifiedAccounts = catchpointVerifiedAccounts;
        this.catchpointVerifiedKvs = catchpointVerifiedKvs;
        this.lastCatchpoint = lastCatchpoint;
        this.upgradeDelay = upgradeDelay;
        this.upgradeNextProtocolVoteBefore = upgradeNextProtocolVoteBefore;
        this.upgradeNoVotes = upgradeNoVotes;
        this.upgradeNodeVote = upgradeNodeVote;
        this.upgradeVoteRounds = upgradeVoteRounds;
        this.upgradeVotes = upgradeVotes;
        this.upgradeVotesRequired = upgradeVotesRequired;
        this.upgradeYesVotes = upgradeYesVotes;
        this.attribute_map = {
          catchupTime: "catchup-time",
          lastRound: "last-round",
          lastVersion: "last-version",
          nextVersion: "next-version",
          nextVersionRound: "next-version-round",
          nextVersionSupported: "next-version-supported",
          stoppedAtUnsupportedRound: "stopped-at-unsupported-round",
          timeSinceLastRound: "time-since-last-round",
          catchpoint: "catchpoint",
          catchpointAcquiredBlocks: "catchpoint-acquired-blocks",
          catchpointProcessedAccounts: "catchpoint-processed-accounts",
          catchpointProcessedKvs: "catchpoint-processed-kvs",
          catchpointTotalAccounts: "catchpoint-total-accounts",
          catchpointTotalBlocks: "catchpoint-total-blocks",
          catchpointTotalKvs: "catchpoint-total-kvs",
          catchpointVerifiedAccounts: "catchpoint-verified-accounts",
          catchpointVerifiedKvs: "catchpoint-verified-kvs",
          lastCatchpoint: "last-catchpoint",
          upgradeDelay: "upgrade-delay",
          upgradeNextProtocolVoteBefore: "upgrade-next-protocol-vote-before",
          upgradeNoVotes: "upgrade-no-votes",
          upgradeNodeVote: "upgrade-node-vote",
          upgradeVoteRounds: "upgrade-vote-rounds",
          upgradeVotes: "upgrade-votes",
          upgradeVotesRequired: "upgrade-votes-required",
          upgradeYesVotes: "upgrade-yes-votes"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["catchup-time"] === "undefined")
          throw new Error(`Response is missing required field 'catchup-time': ${data}`);
        if (typeof data["last-round"] === "undefined")
          throw new Error(`Response is missing required field 'last-round': ${data}`);
        if (typeof data["last-version"] === "undefined")
          throw new Error(`Response is missing required field 'last-version': ${data}`);
        if (typeof data["next-version"] === "undefined")
          throw new Error(`Response is missing required field 'next-version': ${data}`);
        if (typeof data["next-version-round"] === "undefined")
          throw new Error(`Response is missing required field 'next-version-round': ${data}`);
        if (typeof data["next-version-supported"] === "undefined")
          throw new Error(`Response is missing required field 'next-version-supported': ${data}`);
        if (typeof data["stopped-at-unsupported-round"] === "undefined")
          throw new Error(`Response is missing required field 'stopped-at-unsupported-round': ${data}`);
        if (typeof data["time-since-last-round"] === "undefined")
          throw new Error(`Response is missing required field 'time-since-last-round': ${data}`);
        return new NodeStatusResponse({
          catchupTime: data["catchup-time"],
          lastRound: data["last-round"],
          lastVersion: data["last-version"],
          nextVersion: data["next-version"],
          nextVersionRound: data["next-version-round"],
          nextVersionSupported: data["next-version-supported"],
          stoppedAtUnsupportedRound: data["stopped-at-unsupported-round"],
          timeSinceLastRound: data["time-since-last-round"],
          catchpoint: data["catchpoint"],
          catchpointAcquiredBlocks: data["catchpoint-acquired-blocks"],
          catchpointProcessedAccounts: data["catchpoint-processed-accounts"],
          catchpointProcessedKvs: data["catchpoint-processed-kvs"],
          catchpointTotalAccounts: data["catchpoint-total-accounts"],
          catchpointTotalBlocks: data["catchpoint-total-blocks"],
          catchpointTotalKvs: data["catchpoint-total-kvs"],
          catchpointVerifiedAccounts: data["catchpoint-verified-accounts"],
          catchpointVerifiedKvs: data["catchpoint-verified-kvs"],
          lastCatchpoint: data["last-catchpoint"],
          upgradeDelay: data["upgrade-delay"],
          upgradeNextProtocolVoteBefore: data["upgrade-next-protocol-vote-before"],
          upgradeNoVotes: data["upgrade-no-votes"],
          upgradeNodeVote: data["upgrade-node-vote"],
          upgradeVoteRounds: data["upgrade-vote-rounds"],
          upgradeVotes: data["upgrade-votes"],
          upgradeVotesRequired: data["upgrade-votes-required"],
          upgradeYesVotes: data["upgrade-yes-votes"]
        });
      }
    };
    PendingTransactionResponse = class extends BaseModel {
      /**
       * Creates a new `PendingTransactionResponse` object.
       * @param poolError - Indicates that the transaction was kicked out of this node's transaction pool
       * (and specifies why that happened). An empty string indicates the transaction
       * wasn't kicked out of this node's txpool due to an error.
       * @param txn - The raw signed transaction.
       * @param applicationIndex - The application index if the transaction was found and it created an
       * application.
       * @param assetClosingAmount - The number of the asset's unit that were transferred to the close-to address.
       * @param assetIndex - The asset index if the transaction was found and it created an asset.
       * @param closeRewards - Rewards in microalgos applied to the close remainder to account.
       * @param closingAmount - Closing amount for the transaction.
       * @param confirmedRound - The round where this transaction was confirmed, if present.
       * @param globalStateDelta - Global state key/value changes for the application being executed by this
       * transaction.
       * @param innerTxns - Inner transactions produced by application execution.
       * @param localStateDelta - Local state key/value changes for the application being executed by this
       * transaction.
       * @param logs - Logs for the application being executed by this transaction.
       * @param receiverRewards - Rewards in microalgos applied to the receiver account.
       * @param senderRewards - Rewards in microalgos applied to the sender account.
       */
      constructor({ poolError, txn, applicationIndex, assetClosingAmount, assetIndex, closeRewards, closingAmount, confirmedRound, globalStateDelta, innerTxns, localStateDelta, logs, receiverRewards, senderRewards }) {
        super();
        this.poolError = poolError;
        this.txn = txn;
        this.applicationIndex = applicationIndex;
        this.assetClosingAmount = assetClosingAmount;
        this.assetIndex = assetIndex;
        this.closeRewards = closeRewards;
        this.closingAmount = closingAmount;
        this.confirmedRound = confirmedRound;
        this.globalStateDelta = globalStateDelta;
        this.innerTxns = innerTxns;
        this.localStateDelta = localStateDelta;
        this.logs = logs;
        this.receiverRewards = receiverRewards;
        this.senderRewards = senderRewards;
        this.attribute_map = {
          poolError: "pool-error",
          txn: "txn",
          applicationIndex: "application-index",
          assetClosingAmount: "asset-closing-amount",
          assetIndex: "asset-index",
          closeRewards: "close-rewards",
          closingAmount: "closing-amount",
          confirmedRound: "confirmed-round",
          globalStateDelta: "global-state-delta",
          innerTxns: "inner-txns",
          localStateDelta: "local-state-delta",
          logs: "logs",
          receiverRewards: "receiver-rewards",
          senderRewards: "sender-rewards"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["pool-error"] === "undefined")
          throw new Error(`Response is missing required field 'pool-error': ${data}`);
        if (typeof data["txn"] === "undefined")
          throw new Error(`Response is missing required field 'txn': ${data}`);
        return new PendingTransactionResponse({
          poolError: data["pool-error"],
          txn: data["txn"],
          applicationIndex: data["application-index"],
          assetClosingAmount: data["asset-closing-amount"],
          assetIndex: data["asset-index"],
          closeRewards: data["close-rewards"],
          closingAmount: data["closing-amount"],
          confirmedRound: data["confirmed-round"],
          globalStateDelta: typeof data["global-state-delta"] !== "undefined" ? data["global-state-delta"].map(EvalDeltaKeyValue.from_obj_for_encoding) : void 0,
          innerTxns: typeof data["inner-txns"] !== "undefined" ? data["inner-txns"].map(PendingTransactionResponse.from_obj_for_encoding) : void 0,
          localStateDelta: typeof data["local-state-delta"] !== "undefined" ? data["local-state-delta"].map(AccountStateDelta.from_obj_for_encoding) : void 0,
          logs: data["logs"],
          receiverRewards: data["receiver-rewards"],
          senderRewards: data["sender-rewards"]
        });
      }
    };
    PendingTransactionsResponse = class extends BaseModel {
      /**
       * Creates a new `PendingTransactionsResponse` object.
       * @param topTransactions - An array of signed transaction objects.
       * @param totalTransactions - Total number of transactions in the pool.
       */
      constructor({ topTransactions, totalTransactions }) {
        super();
        this.topTransactions = topTransactions;
        this.totalTransactions = totalTransactions;
        this.attribute_map = {
          topTransactions: "top-transactions",
          totalTransactions: "total-transactions"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (!Array.isArray(data["top-transactions"]))
          throw new Error(`Response is missing required array field 'top-transactions': ${data}`);
        if (typeof data["total-transactions"] === "undefined")
          throw new Error(`Response is missing required field 'total-transactions': ${data}`);
        return new PendingTransactionsResponse({
          topTransactions: data["top-transactions"],
          totalTransactions: data["total-transactions"]
        });
      }
    };
    PostTransactionsResponse = class extends BaseModel {
      /**
       * Creates a new `PostTransactionsResponse` object.
       * @param txid - encoding of the transaction hash.
       */
      constructor({ txid }) {
        super();
        this.txid = txid;
        this.attribute_map = {
          txid: "txId"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["txId"] === "undefined")
          throw new Error(`Response is missing required field 'txId': ${data}`);
        return new PostTransactionsResponse({
          txid: data["txId"]
        });
      }
    };
    ScratchChange = class extends BaseModel {
      /**
       * Creates a new `ScratchChange` object.
       * @param newValue - Represents an AVM value.
       * @param slot - The scratch slot written.
       */
      constructor({ newValue, slot }) {
        super();
        this.newValue = newValue;
        this.slot = slot;
        this.attribute_map = {
          newValue: "new-value",
          slot: "slot"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["new-value"] === "undefined")
          throw new Error(`Response is missing required field 'new-value': ${data}`);
        if (typeof data["slot"] === "undefined")
          throw new Error(`Response is missing required field 'slot': ${data}`);
        return new ScratchChange({
          newValue: AvmValue.from_obj_for_encoding(data["new-value"]),
          slot: data["slot"]
        });
      }
    };
    SimulateInitialStates = class extends BaseModel {
      /**
       * Creates a new `SimulateInitialStates` object.
       * @param appInitialStates - The initial states of accessed application before simulation. The order of this
       * array is arbitrary.
       */
      constructor({ appInitialStates }) {
        super();
        this.appInitialStates = appInitialStates;
        this.attribute_map = {
          appInitialStates: "app-initial-states"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        return new SimulateInitialStates({
          appInitialStates: typeof data["app-initial-states"] !== "undefined" ? data["app-initial-states"].map(ApplicationInitialStates.from_obj_for_encoding) : void 0
        });
      }
    };
    SimulateRequest = class extends BaseModel {
      /**
       * Creates a new `SimulateRequest` object.
       * @param txnGroups - The transaction groups to simulate.
       * @param allowEmptySignatures - Allows transactions without signatures to be simulated as if they had correct
       * signatures.
       * @param allowMoreLogging - Lifts limits on log opcode usage during simulation.
       * @param allowUnnamedResources - Allows access to unnamed resources during simulation.
       * @param execTraceConfig - An object that configures simulation execution trace.
       * @param extraOpcodeBudget - Applies extra opcode budget during simulation for each transaction group.
       * @param round - If provided, specifies the round preceding the simulation. State changes through
       * this round will be used to run this simulation. Usually only the 4 most recent
       * rounds will be available (controlled by the node config value MaxAcctLookback).
       * If not specified, defaults to the latest available round.
       */
      constructor({ txnGroups, allowEmptySignatures, allowMoreLogging, allowUnnamedResources, execTraceConfig, extraOpcodeBudget, round }) {
        super();
        this.txnGroups = txnGroups;
        this.allowEmptySignatures = allowEmptySignatures;
        this.allowMoreLogging = allowMoreLogging;
        this.allowUnnamedResources = allowUnnamedResources;
        this.execTraceConfig = execTraceConfig;
        this.extraOpcodeBudget = extraOpcodeBudget;
        this.round = round;
        this.attribute_map = {
          txnGroups: "txn-groups",
          allowEmptySignatures: "allow-empty-signatures",
          allowMoreLogging: "allow-more-logging",
          allowUnnamedResources: "allow-unnamed-resources",
          execTraceConfig: "exec-trace-config",
          extraOpcodeBudget: "extra-opcode-budget",
          round: "round"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (!Array.isArray(data["txn-groups"]))
          throw new Error(`Response is missing required array field 'txn-groups': ${data}`);
        return new SimulateRequest({
          txnGroups: data["txn-groups"].map(SimulateRequestTransactionGroup.from_obj_for_encoding),
          allowEmptySignatures: data["allow-empty-signatures"],
          allowMoreLogging: data["allow-more-logging"],
          allowUnnamedResources: data["allow-unnamed-resources"],
          execTraceConfig: typeof data["exec-trace-config"] !== "undefined" ? SimulateTraceConfig.from_obj_for_encoding(data["exec-trace-config"]) : void 0,
          extraOpcodeBudget: data["extra-opcode-budget"],
          round: data["round"]
        });
      }
    };
    SimulateRequestTransactionGroup = class extends BaseModel {
      /**
       * Creates a new `SimulateRequestTransactionGroup` object.
       * @param txns - An atomic transaction group.
       */
      constructor({ txns }) {
        super();
        this.txns = txns;
        this.attribute_map = {
          txns: "txns"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (!Array.isArray(data["txns"]))
          throw new Error(`Response is missing required array field 'txns': ${data}`);
        return new SimulateRequestTransactionGroup({
          txns: data["txns"]
        });
      }
    };
    SimulateResponse = class extends BaseModel {
      /**
       * Creates a new `SimulateResponse` object.
       * @param lastRound - The round immediately preceding this simulation. State changes through this
       * round were used to run this simulation.
       * @param txnGroups - A result object for each transaction group that was simulated.
       * @param version - The version of this response object.
       * @param evalOverrides - The set of parameters and limits override during simulation. If this set of
       * parameters is present, then evaluation parameters may differ from standard
       * evaluation in certain ways.
       * @param execTraceConfig - An object that configures simulation execution trace.
       * @param initialStates - Initial states of resources that were accessed during simulation.
       */
      constructor({ lastRound, txnGroups, version, evalOverrides, execTraceConfig, initialStates }) {
        super();
        this.lastRound = lastRound;
        this.txnGroups = txnGroups;
        this.version = version;
        this.evalOverrides = evalOverrides;
        this.execTraceConfig = execTraceConfig;
        this.initialStates = initialStates;
        this.attribute_map = {
          lastRound: "last-round",
          txnGroups: "txn-groups",
          version: "version",
          evalOverrides: "eval-overrides",
          execTraceConfig: "exec-trace-config",
          initialStates: "initial-states"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["last-round"] === "undefined")
          throw new Error(`Response is missing required field 'last-round': ${data}`);
        if (!Array.isArray(data["txn-groups"]))
          throw new Error(`Response is missing required array field 'txn-groups': ${data}`);
        if (typeof data["version"] === "undefined")
          throw new Error(`Response is missing required field 'version': ${data}`);
        return new SimulateResponse({
          lastRound: data["last-round"],
          txnGroups: data["txn-groups"].map(SimulateTransactionGroupResult.from_obj_for_encoding),
          version: data["version"],
          evalOverrides: typeof data["eval-overrides"] !== "undefined" ? SimulationEvalOverrides.from_obj_for_encoding(data["eval-overrides"]) : void 0,
          execTraceConfig: typeof data["exec-trace-config"] !== "undefined" ? SimulateTraceConfig.from_obj_for_encoding(data["exec-trace-config"]) : void 0,
          initialStates: typeof data["initial-states"] !== "undefined" ? SimulateInitialStates.from_obj_for_encoding(data["initial-states"]) : void 0
        });
      }
    };
    SimulateTraceConfig = class extends BaseModel {
      /**
       * Creates a new `SimulateTraceConfig` object.
       * @param enable - A boolean option for opting in execution trace features simulation endpoint.
       * @param scratchChange - A boolean option enabling returning scratch slot changes together with execution
       * trace during simulation.
       * @param stackChange - A boolean option enabling returning stack changes together with execution trace
       * during simulation.
       * @param stateChange - A boolean option enabling returning application state changes (global, local,
       * and box changes) with the execution trace during simulation.
       */
      constructor({ enable, scratchChange, stackChange, stateChange }) {
        super();
        this.enable = enable;
        this.scratchChange = scratchChange;
        this.stackChange = stackChange;
        this.stateChange = stateChange;
        this.attribute_map = {
          enable: "enable",
          scratchChange: "scratch-change",
          stackChange: "stack-change",
          stateChange: "state-change"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        return new SimulateTraceConfig({
          enable: data["enable"],
          scratchChange: data["scratch-change"],
          stackChange: data["stack-change"],
          stateChange: data["state-change"]
        });
      }
    };
    SimulateTransactionGroupResult = class extends BaseModel {
      /**
       * Creates a new `SimulateTransactionGroupResult` object.
       * @param txnResults - Simulation result for individual transactions
       * @param appBudgetAdded - Total budget added during execution of app calls in the transaction group.
       * @param appBudgetConsumed - Total budget consumed during execution of app calls in the transaction group.
       * @param failedAt - If present, indicates which transaction in this group caused the failure. This
       * array represents the path to the failing transaction. Indexes are zero based,
       * the first element indicates the top-level transaction, and successive elements
       * indicate deeper inner transactions.
       * @param failureMessage - If present, indicates that the transaction group failed and specifies why that
       * happened
       * @param unnamedResourcesAccessed - These are resources that were accessed by this group that would normally have
       * caused failure, but were allowed in simulation. Depending on where this object
       * is in the response, the unnamed resources it contains may or may not qualify for
       * group resource sharing. If this is a field in SimulateTransactionGroupResult,
       * the resources do qualify, but if this is a field in SimulateTransactionResult,
       * they do not qualify. In order to make this group valid for actual submission,
       * resources that qualify for group sharing can be made available by any
       * transaction of the group; otherwise, resources must be placed in the same
       * transaction which accessed them.
       */
      constructor({ txnResults, appBudgetAdded, appBudgetConsumed, failedAt, failureMessage, unnamedResourcesAccessed }) {
        super();
        this.txnResults = txnResults;
        this.appBudgetAdded = appBudgetAdded;
        this.appBudgetConsumed = appBudgetConsumed;
        this.failedAt = failedAt;
        this.failureMessage = failureMessage;
        this.unnamedResourcesAccessed = unnamedResourcesAccessed;
        this.attribute_map = {
          txnResults: "txn-results",
          appBudgetAdded: "app-budget-added",
          appBudgetConsumed: "app-budget-consumed",
          failedAt: "failed-at",
          failureMessage: "failure-message",
          unnamedResourcesAccessed: "unnamed-resources-accessed"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (!Array.isArray(data["txn-results"]))
          throw new Error(`Response is missing required array field 'txn-results': ${data}`);
        return new SimulateTransactionGroupResult({
          txnResults: data["txn-results"].map(SimulateTransactionResult.from_obj_for_encoding),
          appBudgetAdded: data["app-budget-added"],
          appBudgetConsumed: data["app-budget-consumed"],
          failedAt: data["failed-at"],
          failureMessage: data["failure-message"],
          unnamedResourcesAccessed: typeof data["unnamed-resources-accessed"] !== "undefined" ? SimulateUnnamedResourcesAccessed.from_obj_for_encoding(data["unnamed-resources-accessed"]) : void 0
        });
      }
    };
    SimulateTransactionResult = class extends BaseModel {
      /**
       * Creates a new `SimulateTransactionResult` object.
       * @param txnResult - Details about a pending transaction. If the transaction was recently confirmed,
       * includes confirmation details like the round and reward details.
       * @param appBudgetConsumed - Budget used during execution of an app call transaction. This value includes
       * budged used by inner app calls spawned by this transaction.
       * @param execTrace - The execution trace of calling an app or a logic sig, containing the inner app
       * call trace in a recursive way.
       * @param logicSigBudgetConsumed - Budget used during execution of a logic sig transaction.
       * @param unnamedResourcesAccessed - These are resources that were accessed by this group that would normally have
       * caused failure, but were allowed in simulation. Depending on where this object
       * is in the response, the unnamed resources it contains may or may not qualify for
       * group resource sharing. If this is a field in SimulateTransactionGroupResult,
       * the resources do qualify, but if this is a field in SimulateTransactionResult,
       * they do not qualify. In order to make this group valid for actual submission,
       * resources that qualify for group sharing can be made available by any
       * transaction of the group; otherwise, resources must be placed in the same
       * transaction which accessed them.
       */
      constructor({ txnResult, appBudgetConsumed, execTrace, logicSigBudgetConsumed, unnamedResourcesAccessed }) {
        super();
        this.txnResult = txnResult;
        this.appBudgetConsumed = appBudgetConsumed;
        this.execTrace = execTrace;
        this.logicSigBudgetConsumed = logicSigBudgetConsumed;
        this.unnamedResourcesAccessed = unnamedResourcesAccessed;
        this.attribute_map = {
          txnResult: "txn-result",
          appBudgetConsumed: "app-budget-consumed",
          execTrace: "exec-trace",
          logicSigBudgetConsumed: "logic-sig-budget-consumed",
          unnamedResourcesAccessed: "unnamed-resources-accessed"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["txn-result"] === "undefined")
          throw new Error(`Response is missing required field 'txn-result': ${data}`);
        return new SimulateTransactionResult({
          txnResult: PendingTransactionResponse.from_obj_for_encoding(data["txn-result"]),
          appBudgetConsumed: data["app-budget-consumed"],
          execTrace: typeof data["exec-trace"] !== "undefined" ? SimulationTransactionExecTrace.from_obj_for_encoding(data["exec-trace"]) : void 0,
          logicSigBudgetConsumed: data["logic-sig-budget-consumed"],
          unnamedResourcesAccessed: typeof data["unnamed-resources-accessed"] !== "undefined" ? SimulateUnnamedResourcesAccessed.from_obj_for_encoding(data["unnamed-resources-accessed"]) : void 0
        });
      }
    };
    SimulateUnnamedResourcesAccessed = class extends BaseModel {
      /**
       * Creates a new `SimulateUnnamedResourcesAccessed` object.
       * @param accounts - The unnamed accounts that were referenced. The order of this array is arbitrary.
       * @param appLocals - The unnamed application local states that were referenced. The order of this
       * array is arbitrary.
       * @param apps - The unnamed applications that were referenced. The order of this array is
       * arbitrary.
       * @param assetHoldings - The unnamed asset holdings that were referenced. The order of this array is
       * arbitrary.
       * @param assets - The unnamed assets that were referenced. The order of this array is arbitrary.
       * @param boxes - The unnamed boxes that were referenced. The order of this array is arbitrary.
       * @param extraBoxRefs - The number of extra box references used to increase the IO budget. This is in
       * addition to the references defined in the input transaction group and any
       * referenced to unnamed boxes.
       */
      constructor({ accounts, appLocals, apps, assetHoldings, assets, boxes, extraBoxRefs }) {
        super();
        this.accounts = accounts;
        this.appLocals = appLocals;
        this.apps = apps;
        this.assetHoldings = assetHoldings;
        this.assets = assets;
        this.boxes = boxes;
        this.extraBoxRefs = extraBoxRefs;
        this.attribute_map = {
          accounts: "accounts",
          appLocals: "app-locals",
          apps: "apps",
          assetHoldings: "asset-holdings",
          assets: "assets",
          boxes: "boxes",
          extraBoxRefs: "extra-box-refs"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        return new SimulateUnnamedResourcesAccessed({
          accounts: data["accounts"],
          appLocals: typeof data["app-locals"] !== "undefined" ? data["app-locals"].map(ApplicationLocalReference.from_obj_for_encoding) : void 0,
          apps: data["apps"],
          assetHoldings: typeof data["asset-holdings"] !== "undefined" ? data["asset-holdings"].map(AssetHoldingReference.from_obj_for_encoding) : void 0,
          assets: data["assets"],
          boxes: typeof data["boxes"] !== "undefined" ? data["boxes"].map(BoxReference.from_obj_for_encoding) : void 0,
          extraBoxRefs: data["extra-box-refs"]
        });
      }
    };
    SimulationEvalOverrides = class extends BaseModel {
      /**
       * Creates a new `SimulationEvalOverrides` object.
       * @param allowEmptySignatures - If true, transactions without signatures are allowed and simulated as if they
       * were properly signed.
       * @param allowUnnamedResources - If true, allows access to unnamed resources during simulation.
       * @param extraOpcodeBudget - The extra opcode budget added to each transaction group during simulation
       * @param maxLogCalls - The maximum log calls one can make during simulation
       * @param maxLogSize - The maximum byte number to log during simulation
       */
      constructor({ allowEmptySignatures, allowUnnamedResources, extraOpcodeBudget, maxLogCalls, maxLogSize }) {
        super();
        this.allowEmptySignatures = allowEmptySignatures;
        this.allowUnnamedResources = allowUnnamedResources;
        this.extraOpcodeBudget = extraOpcodeBudget;
        this.maxLogCalls = maxLogCalls;
        this.maxLogSize = maxLogSize;
        this.attribute_map = {
          allowEmptySignatures: "allow-empty-signatures",
          allowUnnamedResources: "allow-unnamed-resources",
          extraOpcodeBudget: "extra-opcode-budget",
          maxLogCalls: "max-log-calls",
          maxLogSize: "max-log-size"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        return new SimulationEvalOverrides({
          allowEmptySignatures: data["allow-empty-signatures"],
          allowUnnamedResources: data["allow-unnamed-resources"],
          extraOpcodeBudget: data["extra-opcode-budget"],
          maxLogCalls: data["max-log-calls"],
          maxLogSize: data["max-log-size"]
        });
      }
    };
    SimulationOpcodeTraceUnit = class extends BaseModel {
      /**
       * Creates a new `SimulationOpcodeTraceUnit` object.
       * @param pc - The program counter of the current opcode being evaluated.
       * @param scratchChanges - The writes into scratch slots.
       * @param spawnedInners - The indexes of the traces for inner transactions spawned by this opcode, if any.
       * @param stackAdditions - The values added by this opcode to the stack.
       * @param stackPopCount - The number of deleted stack values by this opcode.
       * @param stateChanges - The operations against the current application's states.
       */
      constructor({ pc, scratchChanges, spawnedInners, stackAdditions, stackPopCount, stateChanges }) {
        super();
        this.pc = pc;
        this.scratchChanges = scratchChanges;
        this.spawnedInners = spawnedInners;
        this.stackAdditions = stackAdditions;
        this.stackPopCount = stackPopCount;
        this.stateChanges = stateChanges;
        this.attribute_map = {
          pc: "pc",
          scratchChanges: "scratch-changes",
          spawnedInners: "spawned-inners",
          stackAdditions: "stack-additions",
          stackPopCount: "stack-pop-count",
          stateChanges: "state-changes"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["pc"] === "undefined")
          throw new Error(`Response is missing required field 'pc': ${data}`);
        return new SimulationOpcodeTraceUnit({
          pc: data["pc"],
          scratchChanges: typeof data["scratch-changes"] !== "undefined" ? data["scratch-changes"].map(ScratchChange.from_obj_for_encoding) : void 0,
          spawnedInners: data["spawned-inners"],
          stackAdditions: typeof data["stack-additions"] !== "undefined" ? data["stack-additions"].map(AvmValue.from_obj_for_encoding) : void 0,
          stackPopCount: data["stack-pop-count"],
          stateChanges: typeof data["state-changes"] !== "undefined" ? data["state-changes"].map(ApplicationStateOperation.from_obj_for_encoding) : void 0
        });
      }
    };
    SimulationTransactionExecTrace = class extends BaseModel {
      /**
       * Creates a new `SimulationTransactionExecTrace` object.
       * @param approvalProgramHash - SHA512_256 hash digest of the approval program executed in transaction.
       * @param approvalProgramTrace - Program trace that contains a trace of opcode effects in an approval program.
       * @param clearStateProgramHash - SHA512_256 hash digest of the clear state program executed in transaction.
       * @param clearStateProgramTrace - Program trace that contains a trace of opcode effects in a clear state program.
       * @param innerTrace - An array of SimulationTransactionExecTrace representing the execution trace of
       * any inner transactions executed.
       * @param logicSigHash - SHA512_256 hash digest of the logic sig executed in transaction.
       * @param logicSigTrace - Program trace that contains a trace of opcode effects in a logic sig.
       */
      constructor({ approvalProgramHash, approvalProgramTrace, clearStateProgramHash, clearStateProgramTrace, innerTrace, logicSigHash, logicSigTrace }) {
        super();
        this.approvalProgramHash = typeof approvalProgramHash === "string" ? new Uint8Array(Buffer.from(approvalProgramHash, "base64")) : approvalProgramHash;
        this.approvalProgramTrace = approvalProgramTrace;
        this.clearStateProgramHash = typeof clearStateProgramHash === "string" ? new Uint8Array(Buffer.from(clearStateProgramHash, "base64")) : clearStateProgramHash;
        this.clearStateProgramTrace = clearStateProgramTrace;
        this.innerTrace = innerTrace;
        this.logicSigHash = typeof logicSigHash === "string" ? new Uint8Array(Buffer.from(logicSigHash, "base64")) : logicSigHash;
        this.logicSigTrace = logicSigTrace;
        this.attribute_map = {
          approvalProgramHash: "approval-program-hash",
          approvalProgramTrace: "approval-program-trace",
          clearStateProgramHash: "clear-state-program-hash",
          clearStateProgramTrace: "clear-state-program-trace",
          innerTrace: "inner-trace",
          logicSigHash: "logic-sig-hash",
          logicSigTrace: "logic-sig-trace"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        return new SimulationTransactionExecTrace({
          approvalProgramHash: data["approval-program-hash"],
          approvalProgramTrace: typeof data["approval-program-trace"] !== "undefined" ? data["approval-program-trace"].map(SimulationOpcodeTraceUnit.from_obj_for_encoding) : void 0,
          clearStateProgramHash: data["clear-state-program-hash"],
          clearStateProgramTrace: typeof data["clear-state-program-trace"] !== "undefined" ? data["clear-state-program-trace"].map(SimulationOpcodeTraceUnit.from_obj_for_encoding) : void 0,
          innerTrace: typeof data["inner-trace"] !== "undefined" ? data["inner-trace"].map(SimulationTransactionExecTrace.from_obj_for_encoding) : void 0,
          logicSigHash: data["logic-sig-hash"],
          logicSigTrace: typeof data["logic-sig-trace"] !== "undefined" ? data["logic-sig-trace"].map(SimulationOpcodeTraceUnit.from_obj_for_encoding) : void 0
        });
      }
    };
    StateProof = class extends BaseModel {
      /**
       * Creates a new `StateProof` object.
       * @param message - Represents the message that the state proofs are attesting to.
       * @param stateproof - The encoded StateProof for the message.
       */
      constructor({ message, stateproof }) {
        super();
        this.message = message;
        this.stateproof = typeof stateproof === "string" ? new Uint8Array(Buffer.from(stateproof, "base64")) : stateproof;
        this.attribute_map = {
          message: "Message",
          stateproof: "StateProof"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["Message"] === "undefined")
          throw new Error(`Response is missing required field 'Message': ${data}`);
        if (typeof data["StateProof"] === "undefined")
          throw new Error(`Response is missing required field 'StateProof': ${data}`);
        return new StateProof({
          message: StateProofMessage.from_obj_for_encoding(data["Message"]),
          stateproof: data["StateProof"]
        });
      }
    };
    StateProofMessage = class extends BaseModel {
      /**
       * Creates a new `StateProofMessage` object.
       * @param blockheaderscommitment - The vector commitment root on all light block headers within a state proof
       * interval.
       * @param firstattestedround - The first round the message attests to.
       * @param lastattestedround - The last round the message attests to.
       * @param lnprovenweight - An integer value representing the natural log of the proven weight with 16 bits
       * of precision. This value would be used to verify the next state proof.
       * @param voterscommitment - The vector commitment root of the top N accounts to sign the next StateProof.
       */
      constructor({ blockheaderscommitment, firstattestedround, lastattestedround, lnprovenweight, voterscommitment }) {
        super();
        this.blockheaderscommitment = typeof blockheaderscommitment === "string" ? new Uint8Array(Buffer.from(blockheaderscommitment, "base64")) : blockheaderscommitment;
        this.firstattestedround = firstattestedround;
        this.lastattestedround = lastattestedround;
        this.lnprovenweight = lnprovenweight;
        this.voterscommitment = typeof voterscommitment === "string" ? new Uint8Array(Buffer.from(voterscommitment, "base64")) : voterscommitment;
        this.attribute_map = {
          blockheaderscommitment: "BlockHeadersCommitment",
          firstattestedround: "FirstAttestedRound",
          lastattestedround: "LastAttestedRound",
          lnprovenweight: "LnProvenWeight",
          voterscommitment: "VotersCommitment"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["BlockHeadersCommitment"] === "undefined")
          throw new Error(`Response is missing required field 'BlockHeadersCommitment': ${data}`);
        if (typeof data["FirstAttestedRound"] === "undefined")
          throw new Error(`Response is missing required field 'FirstAttestedRound': ${data}`);
        if (typeof data["LastAttestedRound"] === "undefined")
          throw new Error(`Response is missing required field 'LastAttestedRound': ${data}`);
        if (typeof data["LnProvenWeight"] === "undefined")
          throw new Error(`Response is missing required field 'LnProvenWeight': ${data}`);
        if (typeof data["VotersCommitment"] === "undefined")
          throw new Error(`Response is missing required field 'VotersCommitment': ${data}`);
        return new StateProofMessage({
          blockheaderscommitment: data["BlockHeadersCommitment"],
          firstattestedround: data["FirstAttestedRound"],
          lastattestedround: data["LastAttestedRound"],
          lnprovenweight: data["LnProvenWeight"],
          voterscommitment: data["VotersCommitment"]
        });
      }
    };
    SupplyResponse = class extends BaseModel {
      /**
       * Creates a new `SupplyResponse` object.
       * @param currentRound - Round
       * @param onlineMoney - OnlineMoney
       * @param totalMoney - TotalMoney
       */
      constructor({ currentRound, onlineMoney, totalMoney }) {
        super();
        this.currentRound = currentRound;
        this.onlineMoney = onlineMoney;
        this.totalMoney = totalMoney;
        this.attribute_map = {
          currentRound: "current_round",
          onlineMoney: "online-money",
          totalMoney: "total-money"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["current_round"] === "undefined")
          throw new Error(`Response is missing required field 'current_round': ${data}`);
        if (typeof data["online-money"] === "undefined")
          throw new Error(`Response is missing required field 'online-money': ${data}`);
        if (typeof data["total-money"] === "undefined")
          throw new Error(`Response is missing required field 'total-money': ${data}`);
        return new SupplyResponse({
          currentRound: data["current_round"],
          onlineMoney: data["online-money"],
          totalMoney: data["total-money"]
        });
      }
    };
    TealKeyValue = class extends BaseModel {
      /**
       * Creates a new `TealKeyValue` object.
       * @param key -
       * @param value - Represents a TEAL value.
       */
      constructor({ key, value }) {
        super();
        this.key = key;
        this.value = value;
        this.attribute_map = {
          key: "key",
          value: "value"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["key"] === "undefined")
          throw new Error(`Response is missing required field 'key': ${data}`);
        if (typeof data["value"] === "undefined")
          throw new Error(`Response is missing required field 'value': ${data}`);
        return new TealKeyValue({
          key: data["key"],
          value: TealValue.from_obj_for_encoding(data["value"])
        });
      }
    };
    TealValue = class extends BaseModel {
      /**
       * Creates a new `TealValue` object.
       * @param type - (tt) value type. Value `1` refers to **bytes**, value `2` refers to **uint**
       * @param bytes - (tb) bytes value.
       * @param uint - (ui) uint value.
       */
      constructor({ type, bytes, uint }) {
        super();
        this.type = type;
        this.bytes = bytes;
        this.uint = uint;
        this.attribute_map = {
          type: "type",
          bytes: "bytes",
          uint: "uint"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["type"] === "undefined")
          throw new Error(`Response is missing required field 'type': ${data}`);
        if (typeof data["bytes"] === "undefined")
          throw new Error(`Response is missing required field 'bytes': ${data}`);
        if (typeof data["uint"] === "undefined")
          throw new Error(`Response is missing required field 'uint': ${data}`);
        return new TealValue({
          type: data["type"],
          bytes: data["bytes"],
          uint: data["uint"]
        });
      }
    };
    TransactionGroupLedgerStateDeltasForRoundResponse = class extends BaseModel {
      /**
       * Creates a new `TransactionGroupLedgerStateDeltasForRoundResponse` object.
       * @param deltas -
       */
      constructor({ deltas }) {
        super();
        this.deltas = deltas;
        this.attribute_map = {
          deltas: "Deltas"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (!Array.isArray(data["Deltas"]))
          throw new Error(`Response is missing required array field 'Deltas': ${data}`);
        return new TransactionGroupLedgerStateDeltasForRoundResponse({
          deltas: data["Deltas"].map(LedgerStateDeltaForTransactionGroup.from_obj_for_encoding)
        });
      }
    };
    TransactionParametersResponse = class extends BaseModel {
      /**
       * Creates a new `TransactionParametersResponse` object.
       * @param consensusVersion - ConsensusVersion indicates the consensus protocol version
       * as of LastRound.
       * @param fee - Fee is the suggested transaction fee
       * Fee is in units of micro-Algos per byte.
       * Fee may fall to zero but transactions must still have a fee of
       * at least MinTxnFee for the current network protocol.
       * @param genesisHash - GenesisHash is the hash of the genesis block.
       * @param genesisId - GenesisID is an ID listed in the genesis block.
       * @param lastRound - LastRound indicates the last round seen
       * @param minFee - The minimum transaction fee (not per byte) required for the
       * txn to validate for the current network protocol.
       */
      constructor({ consensusVersion, fee, genesisHash, genesisId, lastRound, minFee }) {
        super();
        this.consensusVersion = consensusVersion;
        this.fee = fee;
        this.genesisHash = typeof genesisHash === "string" ? new Uint8Array(Buffer.from(genesisHash, "base64")) : genesisHash;
        this.genesisId = genesisId;
        this.lastRound = lastRound;
        this.minFee = minFee;
        this.attribute_map = {
          consensusVersion: "consensus-version",
          fee: "fee",
          genesisHash: "genesis-hash",
          genesisId: "genesis-id",
          lastRound: "last-round",
          minFee: "min-fee"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["consensus-version"] === "undefined")
          throw new Error(`Response is missing required field 'consensus-version': ${data}`);
        if (typeof data["fee"] === "undefined")
          throw new Error(`Response is missing required field 'fee': ${data}`);
        if (typeof data["genesis-hash"] === "undefined")
          throw new Error(`Response is missing required field 'genesis-hash': ${data}`);
        if (typeof data["genesis-id"] === "undefined")
          throw new Error(`Response is missing required field 'genesis-id': ${data}`);
        if (typeof data["last-round"] === "undefined")
          throw new Error(`Response is missing required field 'last-round': ${data}`);
        if (typeof data["min-fee"] === "undefined")
          throw new Error(`Response is missing required field 'min-fee': ${data}`);
        return new TransactionParametersResponse({
          consensusVersion: data["consensus-version"],
          fee: data["fee"],
          genesisHash: data["genesis-hash"],
          genesisId: data["genesis-id"],
          lastRound: data["last-round"],
          minFee: data["min-fee"]
        });
      }
    };
    TransactionProofResponse = class extends BaseModel {
      /**
       * Creates a new `TransactionProofResponse` object.
       * @param idx - Index of the transaction in the block's payset.
       * @param proof - Proof of transaction membership.
       * @param stibhash - Hash of SignedTxnInBlock for verifying proof.
       * @param treedepth - Represents the depth of the tree that is being proven, i.e. the number of edges
       * from a leaf to the root.
       * @param hashtype - The type of hash function used to create the proof, must be one of:
       * * sha512_256
       * * sha256
       */
      constructor({ idx, proof, stibhash, treedepth, hashtype }) {
        super();
        this.idx = idx;
        this.proof = typeof proof === "string" ? new Uint8Array(Buffer.from(proof, "base64")) : proof;
        this.stibhash = typeof stibhash === "string" ? new Uint8Array(Buffer.from(stibhash, "base64")) : stibhash;
        this.treedepth = treedepth;
        this.hashtype = hashtype;
        this.attribute_map = {
          idx: "idx",
          proof: "proof",
          stibhash: "stibhash",
          treedepth: "treedepth",
          hashtype: "hashtype"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["idx"] === "undefined")
          throw new Error(`Response is missing required field 'idx': ${data}`);
        if (typeof data["proof"] === "undefined")
          throw new Error(`Response is missing required field 'proof': ${data}`);
        if (typeof data["stibhash"] === "undefined")
          throw new Error(`Response is missing required field 'stibhash': ${data}`);
        if (typeof data["treedepth"] === "undefined")
          throw new Error(`Response is missing required field 'treedepth': ${data}`);
        return new TransactionProofResponse({
          idx: data["idx"],
          proof: data["proof"],
          stibhash: data["stibhash"],
          treedepth: data["treedepth"],
          hashtype: data["hashtype"]
        });
      }
    };
    Version = class extends BaseModel {
      /**
       * Creates a new `Version` object.
       * @param build -
       * @param genesisHashB64 -
       * @param genesisId -
       * @param versions -
       */
      constructor({ build, genesisHashB64, genesisId, versions }) {
        super();
        this.build = build;
        this.genesisHashB64 = typeof genesisHashB64 === "string" ? new Uint8Array(Buffer.from(genesisHashB64, "base64")) : genesisHashB64;
        this.genesisId = genesisId;
        this.versions = versions;
        this.attribute_map = {
          build: "build",
          genesisHashB64: "genesis_hash_b64",
          genesisId: "genesis_id",
          versions: "versions"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["build"] === "undefined")
          throw new Error(`Response is missing required field 'build': ${data}`);
        if (typeof data["genesis_hash_b64"] === "undefined")
          throw new Error(`Response is missing required field 'genesis_hash_b64': ${data}`);
        if (typeof data["genesis_id"] === "undefined")
          throw new Error(`Response is missing required field 'genesis_id': ${data}`);
        if (!Array.isArray(data["versions"]))
          throw new Error(`Response is missing required array field 'versions': ${data}`);
        return new Version({
          build: BuildVersion.from_obj_for_encoding(data["build"]),
          genesisHashB64: data["genesis_hash_b64"],
          genesisId: data["genesis_id"],
          versions: data["versions"]
        });
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/jsonrequest.js
var JSONRequest;
var init_jsonrequest = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/jsonrequest.js"() {
    init_intDecoding();
    JSONRequest = class {
      /**
       * @param client - HTTPClient object.
       * @param intDecoding - The method to use
       *   for decoding integers from this request's response. See the setIntDecoding method for more
       *   details.
       */
      constructor(client, intDecoding) {
        this.c = client;
        this.query = {};
        this.intDecoding = intDecoding || intDecoding_default.DEFAULT;
      }
      /**
       * Prepare a JSON response before returning it.
       *
       * Use this method to change and restructure response
       * data as needed after receiving it from the `do()` method.
       * @param body - Response body received
       * @category JSONRequest
       */
      // eslint-disable-next-line class-methods-use-this
      prepare(body) {
        return body;
      }
      /**
       * Execute the request.
       * @param headers - Additional headers to send in the request. Optional.
       * @returns A promise which resolves to the parsed response data.
       * @category JSONRequest
       */
      async do(headers = {}) {
        const jsonOptions = {};
        if (this.intDecoding !== "default") {
          jsonOptions.intDecoding = this.intDecoding;
        }
        const res = await this.c.get(this.path(), this.query, headers, jsonOptions);
        return this.prepare(res.body);
      }
      /**
       * Execute the request, but do not process the response data in any way.
       * @param headers - Additional headers to send in the request. Optional.
       * @returns A promise which resolves to the raw response data, exactly as returned by the server.
       * @category JSONRequest
       */
      async doRaw(headers = {}) {
        const res = await this.c.get(this.path(), this.query, headers, {}, false);
        return res.body;
      }
      /**
       * Configure how integers in this request's JSON response will be decoded.
       *
       * The options are:
       * * "default": Integers will be decoded according to JSON.parse, meaning they will all be
       *   Numbers and any values greater than Number.MAX_SAFE_INTEGER will lose precision.
       * * "safe": All integers will be decoded as Numbers, but if any values are greater than
       *   Number.MAX_SAFE_INTEGER an error will be thrown.
       * * "mixed": Integers will be decoded as Numbers if they are less than or equal to
       *   Number.MAX_SAFE_INTEGER, otherwise they will be decoded as BigInts.
       * * "bigint": All integers will be decoded as BigInts.
       *
       * @param method - The method to use when parsing the
       *   response for this request. Must be one of "default", "safe", "mixed", or "bigint".
       * @category JSONRequest
       */
      setIntDecoding(method) {
        if (method !== "default" && method !== "safe" && method !== "mixed" && method !== "bigint")
          throw new Error(`Invalid method for int decoding: ${method}`);
        this.intDecoding = method;
        return this;
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/accountInformation.js
var AccountInformation;
var init_accountInformation = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/accountInformation.js"() {
    init_jsonrequest();
    AccountInformation = class extends JSONRequest {
      constructor(c, intDecoding, account) {
        super(c, intDecoding);
        this.account = account;
        this.account = account;
      }
      path() {
        return `/v2/accounts/${this.account}`;
      }
      /**
       * Exclude assets and application data from results
       *
       * #### Example
       * ```typescript
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const accountInfo = await algodClient.accountInformation(address)
       *        .exclude('all')
       *        .do();
       * ```
       *
       * @param round
       * @category query
       */
      exclude(exclude) {
        this.query.exclude = exclude;
        return this;
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/accountAssetInformation.js
var AccountAssetInformation;
var init_accountAssetInformation = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/accountAssetInformation.js"() {
    init_jsonrequest();
    AccountAssetInformation = class extends JSONRequest {
      constructor(c, intDecoding, account, assetID) {
        super(c, intDecoding);
        this.account = account;
        this.assetID = assetID;
        this.account = account;
        this.assetID = assetID;
      }
      path() {
        return `/v2/accounts/${this.account}/assets/${this.assetID}`;
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/accountApplicationInformation.js
var AccountApplicationInformation;
var init_accountApplicationInformation = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/accountApplicationInformation.js"() {
    init_jsonrequest();
    AccountApplicationInformation = class extends JSONRequest {
      constructor(c, intDecoding, account, applicationID) {
        super(c, intDecoding);
        this.account = account;
        this.applicationID = applicationID;
        this.account = account;
        this.applicationID = applicationID;
      }
      path() {
        return `/v2/accounts/${this.account}/applications/${this.applicationID}`;
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/block.js
var Block;
var init_block = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/block.js"() {
    init_encoding();
    init_jsonrequest();
    Block = class extends JSONRequest {
      constructor(c, roundNumber) {
        super(c);
        if (!Number.isInteger(roundNumber))
          throw Error("roundNumber should be an integer");
        this.round = roundNumber;
        this.query = { format: "msgpack" };
      }
      path() {
        return `/v2/blocks/${this.round}`;
      }
      // eslint-disable-next-line class-methods-use-this
      prepare(body) {
        if (body && body.byteLength > 0) {
          return decode2(body);
        }
        return void 0;
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/compile.js
function setHeaders(headers = {}) {
  let hdrs = headers;
  if (Object.keys(hdrs).every((key) => key.toLowerCase() !== "content-type")) {
    hdrs = { ...headers };
    hdrs["Content-Type"] = "text/plain";
  }
  return hdrs;
}
var Compile;
var init_compile = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/compile.js"() {
    init_buffer();
    init_jsonrequest();
    Compile = class extends JSONRequest {
      constructor(c, source) {
        super(c);
        this.source = source;
        this.source = source;
      }
      // eslint-disable-next-line class-methods-use-this
      path() {
        return `/v2/teal/compile`;
      }
      sourcemap(map = true) {
        this.query.sourcemap = map;
        return this;
      }
      /**
       * Executes compile
       * @param headers - A headers object
       */
      async do(headers = {}) {
        const txHeaders = setHeaders(headers);
        const res = await this.c.post(this.path(), Buffer.from(this.source), txHeaders, this.query);
        return res.body;
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/dryrun.js
var Dryrun;
var init_dryrun = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/dryrun.js"() {
    init_buffer();
    init_jsonrequest();
    init_encoding();
    init_compile();
    Dryrun = class extends JSONRequest {
      constructor(c, dr) {
        super(c);
        this.blob = encode2(dr.get_obj_for_encoding(true));
      }
      // eslint-disable-next-line class-methods-use-this
      path() {
        return "/v2/teal/dryrun";
      }
      /**
       * Executes dryrun
       * @param headers - A headers object
       */
      async do(headers = {}) {
        const txHeaders = setHeaders(headers);
        const res = await this.c.post(this.path(), Buffer.from(this.blob), txHeaders);
        return res.body;
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/genesis.js
var Genesis;
var init_genesis = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/genesis.js"() {
    init_jsonrequest();
    Genesis = class extends JSONRequest {
      // eslint-disable-next-line class-methods-use-this
      path() {
        return "/genesis";
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/getAssetByID.js
var GetAssetByID;
var init_getAssetByID = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/getAssetByID.js"() {
    init_jsonrequest();
    GetAssetByID = class extends JSONRequest {
      constructor(c, intDecoding, index) {
        super(c, intDecoding);
        this.index = index;
        this.index = index;
      }
      path() {
        return `/v2/assets/${this.index}`;
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/getApplicationByID.js
var GetApplicationByID;
var init_getApplicationByID = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/getApplicationByID.js"() {
    init_jsonrequest();
    GetApplicationByID = class extends JSONRequest {
      constructor(c, intDecoding, index) {
        super(c, intDecoding);
        this.index = index;
        this.index = index;
      }
      path() {
        return `/v2/applications/${this.index}`;
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/getBlockHash.js
var GetBlockHash;
var init_getBlockHash = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/getBlockHash.js"() {
    init_jsonrequest();
    GetBlockHash = class extends JSONRequest {
      constructor(c, intDecoding, roundNumber) {
        super(c, intDecoding);
        if (!Number.isInteger(roundNumber))
          throw Error("roundNumber should be an integer");
        this.round = roundNumber;
      }
      path() {
        return `/v2/blocks/${this.round}/hash`;
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/getBlockTxids.js
var GetBlockTxids;
var init_getBlockTxids = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/getBlockTxids.js"() {
    init_jsonrequest();
    GetBlockTxids = class extends JSONRequest {
      constructor(c, intDecoding, roundNumber) {
        super(c, intDecoding);
        if (!Number.isInteger(roundNumber))
          throw Error("roundNumber should be an integer");
        this.round = roundNumber;
      }
      path() {
        return `/v2/blocks/${this.round}/txids`;
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/getApplicationBoxByName.js
var GetApplicationBoxByName;
var init_getApplicationBoxByName = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/getApplicationBoxByName.js"() {
    init_buffer();
    init_jsonrequest();
    init_types();
    GetApplicationBoxByName = class extends JSONRequest {
      constructor(c, intDecoding, index, name) {
        super(c, intDecoding);
        this.index = index;
        this.index = index;
        const encodedName = Buffer.from(name).toString("base64");
        this.query.name = encodeURI(`b64:${encodedName}`);
      }
      /**
       * @returns `/v2/applications/${index}/box`
       */
      path() {
        return `/v2/applications/${this.index}/box`;
      }
      // eslint-disable-next-line class-methods-use-this
      prepare(body) {
        return Box.from_obj_for_encoding(body);
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/getApplicationBoxes.js
var GetApplicationBoxes;
var init_getApplicationBoxes = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/getApplicationBoxes.js"() {
    init_jsonrequest();
    init_types();
    GetApplicationBoxes = class extends JSONRequest {
      constructor(c, intDecoding, index) {
        super(c, intDecoding);
        this.index = index;
        this.index = index;
        this.query.max = 0;
      }
      /**
       * @returns `/v2/applications/${index}/boxes`
       */
      path() {
        return `/v2/applications/${this.index}/boxes`;
      }
      /**
       * Limit results for pagination.
       *
       * #### Example
       * ```typescript
       * const maxResults = 20;
       * const boxesResult = await algodClient
       *        .GetApplicationBoxes(1234)
       *        .limit(maxResults)
       *        .do();
       * ```
       *
       * @param limit - maximum number of results to return.
       * @category query
       */
      max(max) {
        this.query.max = max;
        return this;
      }
      // eslint-disable-next-line class-methods-use-this
      prepare(body) {
        return BoxesResponse.from_obj_for_encoding(body);
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/healthCheck.js
var HealthCheck;
var init_healthCheck = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/healthCheck.js"() {
    init_jsonrequest();
    HealthCheck = class extends JSONRequest {
      // eslint-disable-next-line class-methods-use-this
      path() {
        return "/health";
      }
      async do(headers = {}) {
        const res = await this.c.get(this.path(), {}, headers);
        if (!res.ok) {
          throw new Error(`Health response: ${res.status}`);
        }
        return {};
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/pendingTransactionInformation.js
var PendingTransactionInformation;
var init_pendingTransactionInformation = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/pendingTransactionInformation.js"() {
    init_jsonrequest();
    init_encoding();
    PendingTransactionInformation = class extends JSONRequest {
      constructor(c, txid) {
        super(c);
        this.txid = txid;
        this.txid = txid;
        this.query.format = "msgpack";
      }
      // eslint-disable-next-line class-methods-use-this
      prepare(body) {
        if (body && body.byteLength > 0) {
          return decode2(body);
        }
        return void 0;
      }
      path() {
        return `/v2/transactions/pending/${this.txid}`;
      }
      // max sets the maximum number of txs to return
      max(max) {
        this.query.max = max;
        return this;
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/pendingTransactions.js
var PendingTransactions;
var init_pendingTransactions = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/pendingTransactions.js"() {
    init_jsonrequest();
    init_encoding();
    PendingTransactions = class extends JSONRequest {
      constructor(c) {
        super(c);
        this.query.format = "msgpack";
      }
      /* eslint-disable class-methods-use-this */
      path() {
        return "/v2/transactions/pending";
      }
      prepare(body) {
        if (body && body.byteLength > 0) {
          return decode2(body);
        }
        return void 0;
      }
      /* eslint-enable class-methods-use-this */
      // max sets the maximum number of txs to return
      max(max) {
        this.query.max = max;
        return this;
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/pendingTransactionsByAddress.js
var PendingTransactionsByAddress;
var init_pendingTransactionsByAddress = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/pendingTransactionsByAddress.js"() {
    init_jsonrequest();
    init_encoding();
    PendingTransactionsByAddress = class extends JSONRequest {
      constructor(c, address) {
        super(c);
        this.address = address;
        this.address = address;
        this.query.format = "msgpack";
      }
      // eslint-disable-next-line class-methods-use-this
      prepare(body) {
        if (body && body.byteLength > 0) {
          return decode2(body);
        }
        return void 0;
      }
      path() {
        return `/v2/accounts/${this.address}/transactions/pending`;
      }
      // max sets the maximum number of txs to return
      max(max) {
        this.query.max = max;
        return this;
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/getTransactionProof.js
var GetTransactionProof;
var init_getTransactionProof = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/getTransactionProof.js"() {
    init_jsonrequest();
    GetTransactionProof = class extends JSONRequest {
      constructor(c, intDecoding, round, txID) {
        super(c, intDecoding);
        this.round = round;
        this.txID = txID;
        this.round = round;
        this.txID = txID;
      }
      path() {
        return `/v2/blocks/${this.round}/transactions/${this.txID}/proof`;
      }
      /**
       * Exclude assets and application data from results
       * The type of hash function used to create the proof, must be one of: "sha512_256", "sha256"
       *
       * #### Example
       * ```typescript
       * const hashType = "sha256";
       * const round = 123456;
       * const txId = "abc123;
       * const txProof = await algodClient.getTransactionProof(round, txId)
       *        .hashType(hashType)
       *        .do();
       * ```
       *
       * @param hashType
       * @category query
       */
      hashType(hashType) {
        this.query.hashtype = hashType;
        return this;
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/sendRawTransaction.js
function setSendTransactionHeaders(headers = {}) {
  let hdrs = headers;
  if (Object.keys(hdrs).every((key) => key.toLowerCase() !== "content-type")) {
    hdrs = { ...headers };
    hdrs["Content-Type"] = "application/x-binary";
  }
  return hdrs;
}
function isByteArray(array) {
  return array && array.byteLength !== void 0;
}
var SendRawTransaction;
var init_sendRawTransaction = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/sendRawTransaction.js"() {
    init_buffer();
    init_jsonrequest();
    init_utils();
    SendRawTransaction = class extends JSONRequest {
      constructor(c, stxOrStxs) {
        super(c);
        let forPosting = stxOrStxs;
        if (Array.isArray(stxOrStxs)) {
          if (!stxOrStxs.every(isByteArray)) {
            throw new TypeError("Array elements must be byte arrays");
          }
          forPosting = concatArrays(...stxOrStxs);
        } else if (!isByteArray(forPosting)) {
          throw new TypeError("Argument must be byte array");
        }
        this.txnBytesToPost = forPosting;
      }
      // eslint-disable-next-line class-methods-use-this
      path() {
        return "/v2/transactions";
      }
      async do(headers = {}) {
        const txHeaders = setSendTransactionHeaders(headers);
        const res = await this.c.post(this.path(), Buffer.from(this.txnBytesToPost), txHeaders);
        return res.body;
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/status.js
var Status;
var init_status = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/status.js"() {
    init_jsonrequest();
    Status = class extends JSONRequest {
      // eslint-disable-next-line class-methods-use-this
      path() {
        return "/v2/status";
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/statusAfterBlock.js
var StatusAfterBlock;
var init_statusAfterBlock = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/statusAfterBlock.js"() {
    init_jsonrequest();
    StatusAfterBlock = class extends JSONRequest {
      constructor(c, intDecoding, round) {
        super(c, intDecoding);
        this.round = round;
        if (!Number.isInteger(round))
          throw Error("round should be an integer");
        this.round = round;
      }
      path() {
        return `/v2/status/wait-for-block-after/${this.round}`;
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/suggestedParams.js
var SuggestedParamsRequest;
var init_suggestedParams = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/suggestedParams.js"() {
    init_jsonrequest();
    SuggestedParamsRequest = class extends JSONRequest {
      /* eslint-disable class-methods-use-this */
      path() {
        return "/v2/transactions/params";
      }
      prepare(body) {
        return {
          flatFee: false,
          fee: body.fee,
          firstRound: body["last-round"],
          lastRound: body["last-round"] + 1e3,
          genesisID: body["genesis-id"],
          genesisHash: body["genesis-hash"],
          minFee: body["min-fee"]
        };
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/supply.js
var Supply;
var init_supply = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/supply.js"() {
    init_jsonrequest();
    Supply = class extends JSONRequest {
      // eslint-disable-next-line class-methods-use-this
      path() {
        return "/v2/ledger/supply";
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/versions.js
var Versions;
var init_versions = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/versions.js"() {
    init_jsonrequest();
    Versions = class extends JSONRequest {
      // eslint-disable-next-line class-methods-use-this
      path() {
        return "/versions";
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/lightBlockHeaderProof.js
var LightBlockHeaderProof2;
var init_lightBlockHeaderProof = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/lightBlockHeaderProof.js"() {
    init_jsonrequest();
    LightBlockHeaderProof2 = class extends JSONRequest {
      constructor(c, intDecoding, round) {
        super(c, intDecoding);
        this.round = round;
        this.round = round;
      }
      path() {
        return `/v2/blocks/${this.round}/lightheader/proof`;
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/stateproof.js
var StateProof2;
var init_stateproof = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/stateproof.js"() {
    init_jsonrequest();
    StateProof2 = class extends JSONRequest {
      constructor(c, intDecoding, round) {
        super(c, intDecoding);
        this.round = round;
        this.round = round;
      }
      path() {
        return `/v2/stateproofs/${this.round}`;
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/setSyncRound.js
var SetSyncRound;
var init_setSyncRound = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/setSyncRound.js"() {
    init_jsonrequest();
    SetSyncRound = class extends JSONRequest {
      constructor(c, intDecoding, round) {
        super(c, intDecoding);
        this.round = round;
        this.round = round;
      }
      path() {
        return `/v2/ledger/sync/${this.round}`;
      }
      async do(headers = {}) {
        const res = await this.c.post(this.path(), headers);
        return res.body;
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/getSyncRound.js
var GetSyncRound;
var init_getSyncRound = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/getSyncRound.js"() {
    init_jsonrequest();
    init_types();
    GetSyncRound = class extends JSONRequest {
      // eslint-disable-next-line class-methods-use-this
      path() {
        return `/v2/ledger/sync`;
      }
      // eslint-disable-next-line class-methods-use-this
      prepare(body) {
        return GetSyncRoundResponse.from_obj_for_encoding(body);
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/setBlockOffsetTimestamp.js
var SetBlockOffsetTimestamp;
var init_setBlockOffsetTimestamp = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/setBlockOffsetTimestamp.js"() {
    init_jsonrequest();
    SetBlockOffsetTimestamp = class extends JSONRequest {
      constructor(c, intDecoding, offset) {
        super(c, intDecoding);
        this.offset = offset;
        this.offset = offset;
      }
      path() {
        return `/v2/devmode/blocks/offset/${this.offset}`;
      }
      async do(headers = {}) {
        const res = await this.c.post(this.path(), headers);
        return res.body;
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/getBlockOffsetTimestamp.js
var GetBlockOffsetTimestamp;
var init_getBlockOffsetTimestamp = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/getBlockOffsetTimestamp.js"() {
    init_jsonrequest();
    init_types();
    GetBlockOffsetTimestamp = class extends JSONRequest {
      // eslint-disable-next-line class-methods-use-this
      path() {
        return `/v2/devmode/blocks/offset`;
      }
      // eslint-disable-next-line class-methods-use-this
      prepare(body) {
        return GetBlockTimeStampOffsetResponse.from_obj_for_encoding(body);
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/disassemble.js
function setHeaders2(headers = {}) {
  let hdrs = headers;
  if (Object.keys(hdrs).every((key) => key.toLowerCase() !== "content-type")) {
    hdrs = { ...headers };
    hdrs["Content-Type"] = "text/plain";
  }
  return hdrs;
}
var Disassemble;
var init_disassemble = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/disassemble.js"() {
    init_buffer();
    init_jsonrequest();
    Disassemble = class extends JSONRequest {
      constructor(c, source) {
        super(c);
        this.source = source;
        this.source = source;
      }
      // eslint-disable-next-line class-methods-use-this
      path() {
        return `/v2/teal/disassemble`;
      }
      /**
       * Executes disassemble
       * @param headers - A headers object
       */
      async do(headers = {}) {
        const txHeaders = setHeaders2(headers);
        const res = await this.c.post(this.path(), Buffer.from(this.source), txHeaders, this.query);
        return res.body;
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/simulateTransaction.js
function setSimulateTransactionsHeaders(headers = {}) {
  let hdrs = headers;
  if (Object.keys(hdrs).every((key) => key.toLowerCase() !== "content-type")) {
    hdrs = { ...headers };
    hdrs["Content-Type"] = "application/msgpack";
  }
  return hdrs;
}
var SimulateRawTransactions;
var init_simulateTransaction = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/simulateTransaction.js"() {
    init_buffer();
    init_encoding();
    init_jsonrequest();
    init_types();
    SimulateRawTransactions = class extends JSONRequest {
      constructor(c, request) {
        super(c);
        this.query.format = "msgpack";
        this.requestBytes = rawEncode(request.get_obj_for_encoding(true));
      }
      // eslint-disable-next-line class-methods-use-this
      path() {
        return "/v2/transactions/simulate";
      }
      async do(headers = {}) {
        const txHeaders = setSimulateTransactionsHeaders(headers);
        const res = await this.c.post(this.path(), Buffer.from(this.requestBytes), txHeaders, this.query, false);
        return this.prepare(res.body);
      }
      // eslint-disable-next-line class-methods-use-this
      prepare(body) {
        const decoded = decode2(body);
        return SimulateResponse.from_obj_for_encoding(decoded);
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/ready.js
var Ready;
var init_ready = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/ready.js"() {
    init_jsonrequest();
    Ready = class extends JSONRequest {
      // eslint-disable-next-line class-methods-use-this
      path() {
        return `/ready`;
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/unsetSyncRound.js
var UnsetSyncRound;
var init_unsetSyncRound = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/unsetSyncRound.js"() {
    init_jsonrequest();
    UnsetSyncRound = class extends JSONRequest {
      // eslint-disable-next-line class-methods-use-this
      path() {
        return `/v2/ledger/sync`;
      }
      async do(headers = {}) {
        const res = await this.c.delete(this.path(), headers);
        return res.body;
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/getLedgerStateDeltaForTransactionGroup.js
var GetLedgerStateDeltaForTransactionGroup;
var init_getLedgerStateDeltaForTransactionGroup = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/getLedgerStateDeltaForTransactionGroup.js"() {
    init_jsonrequest();
    GetLedgerStateDeltaForTransactionGroup = class extends JSONRequest {
      constructor(c, intDecoding, id) {
        super(c, intDecoding);
        this.id = id;
        this.id = id;
        this.query = { format: "json" };
      }
      // eslint-disable-next-line class-methods-use-this
      path() {
        return `/v2/deltas/txn/group/${this.id}`;
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/getLedgerStateDelta.js
var GetLedgerStateDelta;
var init_getLedgerStateDelta = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/getLedgerStateDelta.js"() {
    init_jsonrequest();
    GetLedgerStateDelta = class extends JSONRequest {
      constructor(c, intDecoding, round) {
        super(c, intDecoding);
        this.round = round;
        this.round = round;
        this.query = { format: "json" };
      }
      // eslint-disable-next-line class-methods-use-this
      path() {
        return `/v2/deltas/${this.round}`;
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/getTransactionGroupLedgerStateDeltasForRound.js
var GetTransactionGroupLedgerStateDeltasForRound;
var init_getTransactionGroupLedgerStateDeltasForRound = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/getTransactionGroupLedgerStateDeltasForRound.js"() {
    init_jsonrequest();
    init_types();
    GetTransactionGroupLedgerStateDeltasForRound = class extends JSONRequest {
      constructor(c, intDecoding, round) {
        super(c, intDecoding);
        this.round = round;
        this.round = round;
        this.query = { format: "json" };
      }
      // eslint-disable-next-line class-methods-use-this
      path() {
        return `/v2/deltas/${this.round}/txn/group`;
      }
      // eslint-disable-next-line class-methods-use-this
      prepare(body) {
        return TransactionGroupLedgerStateDeltasForRoundResponse.from_obj_for_encoding(body);
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/algod.js
var AlgodClient;
var init_algod = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/algod/algod.js"() {
    init_serviceClient();
    init_types();
    init_accountInformation();
    init_accountAssetInformation();
    init_accountApplicationInformation();
    init_block();
    init_compile();
    init_dryrun();
    init_genesis();
    init_getAssetByID();
    init_getApplicationByID();
    init_getBlockHash();
    init_getBlockTxids();
    init_getApplicationBoxByName();
    init_getApplicationBoxes();
    init_healthCheck();
    init_pendingTransactionInformation();
    init_pendingTransactions();
    init_pendingTransactionsByAddress();
    init_getTransactionProof();
    init_sendRawTransaction();
    init_status();
    init_statusAfterBlock();
    init_suggestedParams();
    init_supply();
    init_versions();
    init_lightBlockHeaderProof();
    init_stateproof();
    init_setSyncRound();
    init_getSyncRound();
    init_setBlockOffsetTimestamp();
    init_getBlockOffsetTimestamp();
    init_disassemble();
    init_simulateTransaction();
    init_encoding();
    init_ready();
    init_unsetSyncRound();
    init_getLedgerStateDeltaForTransactionGroup();
    init_getLedgerStateDelta();
    init_getTransactionGroupLedgerStateDeltasForRound();
    AlgodClient = class extends ServiceClient {
      /**
       * Create an AlgodClient from
       * * either a token, baseServer, port, and optional headers
       * * or a base client server for interoperability with external dApp wallets
       *
       * #### Example
       * ```typescript
       * const token  = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
       * const server = "http://localhost";
       * const port   = 4001;
       * const algodClient = new algosdk.Algodv2(token, server, port);
       * ```
       * @remarks
       * The above configuration is for a sandbox private network.
       * For applications on production, you are encouraged to run your own node, or use an Algorand REST API provider with a dedicated API key.
       *
       * @param tokenOrBaseClient - The algod token from the Algorand node you are interacting with
       * @param baseServer - REST endpoint
       * @param port - Port number if specifically configured by the server
       * @param headers - Optional headers
       */
      constructor(tokenOrBaseClient, baseServer, port, headers = {}) {
        super("X-Algo-API-Token", tokenOrBaseClient, baseServer, port, headers);
      }
      /**
       * Returns OK if healthy.
       *
       * #### Example
       * ```typescript
       * const health = await algodClient.healthCheck().do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/algod/#get-health)
       * @category GET
       */
      healthCheck() {
        return new HealthCheck(this.c);
      }
      /**
       * Retrieves the supported API versions, binary build versions, and genesis information.
       *
       * #### Example
       * ```typescript
       * const versionsDetails = await algodClient.versionsCheck().do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/algod/#get-versions)
       * @category GET
       */
      versionsCheck() {
        return new Versions(this.c);
      }
      /**
       * Broadcasts a raw transaction to the network.
       *
       * #### Example
       * ```typescript
       * const { txId } = await algodClient.sendRawTransaction(signedTxns).do();
       * const result = await waitForConfirmation(algodClient, txid, 3);
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/algod/#post-v2transactions)
       *
       * @remarks
       * Often used with {@linkcode waitForConfirmation}
       * @param stxOrStxs - Signed transactions
       * @category POST
       */
      sendRawTransaction(stxOrStxs) {
        return new SendRawTransaction(this.c, stxOrStxs);
      }
      /**
       * Returns the given account's status, balance and spendable amounts.
       *
       * #### Example
       * ```typescript
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const accountInfo = await algodClient.accountInformation(address).do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/algod/#get-v2accountsaddress)
       * @param account - The address of the account to look up.
       * @category GET
       */
      accountInformation(account) {
        return new AccountInformation(this.c, this.intDecoding, account);
      }
      /**
       * Returns the given account's asset information for a specific asset.
       *
       * #### Example
       * ```typescript
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const index = 60553466;
       * const accountAssetInfo = await algodClient.accountAssetInformation(address, index).do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/algod/#get-v2accountsaddress)
       * @param account - The address of the account to look up.
       * @param index - The asset ID to look up.
       * @category GET
       */
      accountAssetInformation(account, index) {
        return new AccountAssetInformation(this.c, this.intDecoding, account, index);
      }
      /**
       * Returns the given account's application information for a specific application.
       *
       * #### Example
       * ```typescript
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const index = 60553466;
       * const accountInfo = await algodClient.accountApplicationInformation(address, index).do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/algod/#get-v2accountsaddress)
       * @param account - The address of the account to look up.
       * @param index - The application ID to look up.
       * @category GET
       */
      accountApplicationInformation(account, index) {
        return new AccountApplicationInformation(this.c, this.intDecoding, account, index);
      }
      /**
       * Gets the block info for the given round.
       *
       * #### Example
       * ```typescript
       * const roundNumber = 18038133;
       * const block = await algodClient.block(roundNumber).do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/algod/#get-v2blocksround)
       * @param roundNumber - The round number of the block to get.
       * @category GET
       */
      block(roundNumber) {
        return new Block(this.c, roundNumber);
      }
      /**
       * Get the block hash for the block on the given round.
       *
       * #### Example
       * ```typescript
       * const roundNumber = 18038133;
       * const block = await algodClient.getBlockHash(roundNumber).do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/algod/#get-v2blocksroundhash)
       * @param roundNumber - The round number of the block to get.
       * @category GET
       */
      getBlockHash(roundNumber) {
        return new GetBlockHash(this.c, this.intDecoding, roundNumber);
      }
      /**
       * Get the top level transaction IDs for the block on the given round.
       *
       * #### Example
       * ```typescript
       * const roundNumber = 18038133;
       * const block = await algodClient.getBlockTxids(roundNumber).do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/algod/#get-v2blocksroundtxids)
       * @param roundNumber - The round number of the block to get.
       * @category GET
       */
      getBlockTxids(roundNumber) {
        return new GetBlockTxids(this.c, this.intDecoding, roundNumber);
      }
      /**
       * Returns the transaction information for a specific pending transaction.
       *
       * #### Example
       * ```typescript
       * const txId = "DRJS6R745A7GFVMXEXWP4TGVDGKW7VILFTA7HC2BR2GRLHNY5CTA";
       * const pending = await algodClient.pendingTransactionInformation(txId).do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/algod/#get-v2transactionspendingtxid)
       *
       * @remarks
       * <br><br>
       * There are several cases when this might succeed:
       * - transaction committed (committed round > 0)
       * - transaction still in the pool (committed round = 0, pool error = "")
       * - transaction removed from pool due to error (committed round = 0, pool error != "")
       *
       * Or the transaction may have happened sufficiently long ago that the node no longer remembers it, and this will return an error.
       *
       * @param txid - The TxID string of the pending transaction to look up.
       * @category GET
       */
      pendingTransactionInformation(txid) {
        return new PendingTransactionInformation(this.c, txid);
      }
      /**
       * Returns the list of pending transactions in the pool, sorted by priority, in decreasing order, truncated at the end at MAX.
       * If MAX = 0, returns all pending transactions.
       *
       * #### Example 1
       * ```typescript
       * const pendingTxns = await algodClient.pendingTransactionsInformation().do();
       * ```
       *
       * #### Example 2
       * ```typescript
       * const maxTxns = 5;
       * const pendingTxns = await algodClient
       *     .pendingTransactionsInformation()
       *     .max(maxTxns)
       *     .do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/algod/#get-v2transactionspending)
       * @category GET
       */
      pendingTransactionsInformation() {
        return new PendingTransactions(this.c);
      }
      /**
       * Returns the list of pending transactions sent by the address, sorted by priority, in decreasing order, truncated at the end at MAX.
       * If MAX = 0, returns all pending transactions.
       *
       * #### Example 1
       * ```typescript
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const pendingTxnsByAddr = await algodClient.pendingTransactionByAddress(address).do();
       * ```
       *
       * #### Example 2
       * ```typescript
       * const maxTxns = 5;
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const pendingTxns = await algodClient
       *     .pendingTransactionByAddress(address)
       *     .max(maxTxns)
       *     .do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/algod/#get-v2accountsaddresstransactionspending)
       * @param address - The address of the sender.
       * @category GET
       */
      pendingTransactionByAddress(address) {
        return new PendingTransactionsByAddress(this.c, address);
      }
      /**
       * Retrieves the StatusResponse from the running node.
       *
       * #### Example
       * ```typescript
       * const status = await algodClient.status().do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/algod/#get-v2status)
       * @category GET
       */
      status() {
        return new Status(this.c, this.intDecoding);
      }
      /**
       * Waits for a specific round to occur then returns the `StatusResponse` for that round.
       *
       * #### Example
       * ```typescript
       * const round = 18038133;
       * const statusAfterBlock = await algodClient.statusAfterBlock(round).do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/algod/#get-v2statuswait-for-block-afterround)
       * @param round - The number of the round to wait for.
       * @category GET
       */
      statusAfterBlock(round) {
        return new StatusAfterBlock(this.c, this.intDecoding, round);
      }
      /**
       * Returns the common needed parameters for a new transaction.
       *
       * #### Example
       * ```typescript
       * const suggestedParams = await algodClient.getTransactionParams().do();
       * const amountInMicroAlgos = algosdk.algosToMicroalgos(2); // 2 Algos
       * const unsignedTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
       *   from: senderAddress,
       *   to: receiverAddress,
       *   amount: amountInMicroAlgos,
       *   suggestedParams: suggestedParams,
       * });
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/algod/#get-v2transactionsparams)
       *
       * @remarks
       * Often used with
       * {@linkcode makePaymentTxnWithSuggestedParamsFromObject}, {@linkcode algosToMicroalgos}
       * @category GET
       */
      getTransactionParams() {
        return new SuggestedParamsRequest(this.c);
      }
      /**
       * Returns the supply details for the specified node's ledger.
       *
       * #### Example
       * ```typescript
       * const supplyDetails = await algodClient.supply().do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/algod/#get-v2ledgersupply)
       * @category GET
       */
      supply() {
        return new Supply(this.c, this.intDecoding);
      }
      /**
       * Compiles TEAL source code to binary, returns base64 encoded program bytes and base32 SHA512_256 hash of program bytes (Address style).
       *
       * #### Example
       * ```typescript
       * const source = "TEAL SOURCE CODE";
       * const compiledSmartContract = await algodClient.compile(source).do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/algod/#post-v2tealcompile)
       * @remarks
       * This endpoint is only enabled when a node's configuration file sets `EnableDeveloperAPI` to true.
       * @param source
       * @category POST
       */
      compile(source) {
        return new Compile(this.c, source);
      }
      /**
       * Given the program bytes, return the TEAL source code in plain text.
       *
       * #### Example
       * ```typescript
       * const bytecode = "TEAL bytecode";
       * const disassembledSource = await algodClient.disassemble(bytecode).do();
       * ```
       *
       * @remarks This endpoint is only enabled when a node's configuration file sets EnableDeveloperAPI to true.
       * @param source
       */
      disassemble(source) {
        return new Disassemble(this.c, source);
      }
      /**
       * Provides debugging information for a transaction (or group).
       *
       * Executes TEAL program(s) in context and returns debugging information about the execution. This endpoint is only enabled when a node's configureation file sets `EnableDeveloperAPI` to true.
       *
       * #### Example
       * ```typescript
       * const dryRunResult = await algodClient.dryrun(dr).do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/algod/#post-v2tealdryrun)
       * @param dr
       * @category POST
       */
      dryrun(dr) {
        return new Dryrun(this.c, dr);
      }
      /**
       * Given an asset ID, return asset information including creator, name, total supply and
       * special addresses.
       *
       * #### Example
       * ```typescript
       * const asset_id = 163650;
       * const asset = await algodClient.getAssetByID(asset_id).do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/algod/#get-v2assetsasset-id)
       * @param index - The asset ID to look up.
       * @category GET
       */
      getAssetByID(index) {
        return new GetAssetByID(this.c, this.intDecoding, index);
      }
      /**
       * Given an application ID, return the application information including creator, approval
       * and clear programs, global and local schemas, and global state.
       *
       * #### Example
       * ```typescript
       * const index = 60553466;
       * const app = await algodClient.getApplicationByID(index).do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/algod/#get-v2applicationsapplication-id)
       * @param index - The application ID to look up.
       * @category GET
       */
      getApplicationByID(index) {
        return new GetApplicationByID(this.c, this.intDecoding, index);
      }
      /**
       * Given an application ID and the box name (key), return the value stored in the box.
       *
       * #### Example
       * ```typescript
       * const index = 60553466;
       * const boxName = Buffer.from("foo");
       * const boxResponse = await algodClient.getApplicationBoxByName(index, boxName).do();
       * const boxValue = boxResponse.value;
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/algod/#get-v2applicationsapplication-idbox)
       * @param index - The application ID to look up.
       * @category GET
       */
      getApplicationBoxByName(index, boxName) {
        return new GetApplicationBoxByName(this.c, this.intDecoding, index, boxName);
      }
      /**
       * Given an application ID, return all the box names associated with the app.
       *
       * #### Example
       * ```typescript
       * const index = 60553466;
       * const boxesResponse = await algodClient.getApplicationBoxes(index).max(3).do();
       * const boxNames = boxesResponse.boxes.map(box => box.name);
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/algod/#get-v2applicationsapplication-idboxes)
       * @param index - The application ID to look up.
       * @category GET
       */
      getApplicationBoxes(index) {
        return new GetApplicationBoxes(this.c, this.intDecoding, index);
      }
      /**
       * Returns the entire genesis file.
       *
       * #### Example
       * ```typescript
       * const genesis = await algodClient.genesis().do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/algod/#get-genesis)
       * @category GET
       */
      genesis() {
        return new Genesis(this.c, this.intDecoding);
      }
      /**
       * Returns a Merkle proof for a given transaction in a block.
       *
       * #### Example
       * ```typescript
       * const round = 18038133;
       * const txId = "MEUOC4RQJB23CQZRFRKYEI6WBO73VTTPST5A7B3S5OKBUY6LFUDA";
       * const proof = await algodClient.getTransactionProof(round, txId).do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/algod/#get-v2blocksroundtransactionstxidproof)
       * @param round - The round in which the transaction appears.
       * @param txID - The transaction ID for which to generate a proof.
       * @category GET
       */
      getTransactionProof(round, txID) {
        return new GetTransactionProof(this.c, this.intDecoding, round, txID);
      }
      /**
       * Gets a proof for a given light block header inside a state proof commitment.
       *
       * #### Example
       * ```typescript
       * const round = 11111111;
       * const lightBlockHeaderProof = await algodClient.getLightBlockHeaderProof(round).do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/algod/v2#get-v2blocksroundlightheaderproof)
       * @param round
       */
      getLightBlockHeaderProof(round) {
        return new LightBlockHeaderProof2(this.c, this.intDecoding, round);
      }
      /**
       * Gets a state proof that covers a given round.
       *
       * #### Example
       * ```typescript
       * const round = 11111111;
       * const stateProof = await algodClient.getStateProof(round).do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/algod/v2#get-v2stateproofsround)
       * @param round
       */
      getStateProof(round) {
        return new StateProof2(this.c, this.intDecoding, round);
      }
      /**
       * Simulate a list of a signed transaction objects being sent to the network.
       *
       * #### Example
       * ```typescript
       * const txn1 = algosdk.makePaymentTxnWithSuggestedParamsFromObject(txn1Params);
       * const txn2 = algosdk.makePaymentTxnWithSuggestedParamsFromObject(txn2Params);
       * const txgroup = algosdk.assignGroupID([txn1, txn2]);
       *
       * // Actually sign the first transaction
       * const signedTxn1 = txgroup[0].signTxn(senderSk).blob;
       * // Simulate does not require signed transactions -- use this method to encode an unsigned transaction
       * const signedTxn2 = algosdk.encodeUnsignedSimulateTransaction(txgroup[1]);
       *
       * const resp = await client.simulateRawTransactions([signedTxn1, signedTxn2]).do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/algod/#post-v2transactionssimulate)
       * @param stxOrStxs
       * @category POST
       */
      simulateRawTransactions(stxOrStxs) {
        const txnObjects = [];
        if (Array.isArray(stxOrStxs)) {
          for (const stxn of stxOrStxs) {
            txnObjects.push(decode2(stxn));
          }
        } else {
          txnObjects.push(decode2(stxOrStxs));
        }
        const request = new SimulateRequest({
          txnGroups: [
            new SimulateRequestTransactionGroup({
              txns: txnObjects
            })
          ]
        });
        return this.simulateTransactions(request);
      }
      /**
       * Simulate transactions being sent to the network.
       *
       * #### Example
       * ```typescript
       * const txn1 = algosdk.makePaymentTxnWithSuggestedParamsFromObject(txn1Params);
       * const txn2 = algosdk.makePaymentTxnWithSuggestedParamsFromObject(txn2Params);
       * const txgroup = algosdk.assignGroupID([txn1, txn2]);
       *
       * // Actually sign the first transaction
       * const signedTxn1 = txgroup[0].signTxn(senderSk).blob;
       * // Simulate does not require signed transactions -- use this method to encode an unsigned transaction
       * const signedTxn2 = algosdk.encodeUnsignedSimulateTransaction(txgroup[1]);
       *
       * const request = new modelsv2.SimulateRequest({
       *  txnGroups: [
       *    new modelsv2.SimulateRequestTransactionGroup({
       *       // Must decode the signed txn bytes into an object
       *       txns: [algosdk.decodeObj(signedTxn1), algosdk.decodeObj(signedTxn2)]
       *     }),
       *   ],
       * });
       * const resp = await client.simulateRawTransactions(request).do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/algod/#post-v2transactionssimulate)
       * @param request
       * @category POST
       */
      simulateTransactions(request) {
        return new SimulateRawTransactions(this.c, request);
      }
      /**
       * Set the offset (in seconds) applied to the block timestamp when creating new blocks in devmode.
       *
       *  #### Example
       *  ```typesecript
       *  const offset = 60
       *  await client.setBlockOffsetTimestamp(offset).do();
       *  ```
       *
       [Response data schema details](https://developer.algorand.org/docs/rest-apis/algod/#post-v2devmodeblocksoffsetoffset)
       * @param offset
       * @category POST
       */
      setBlockOffsetTimestamp(offset) {
        return new SetBlockOffsetTimestamp(this.c, this.intDecoding, offset);
      }
      /**
       * Get the offset (in seconds) applied to the block timestamp when creating new blocks in devmode.
       *
       *  #### Example
       *  ```typesecript
       *  const currentOffset = await client.getBlockOffsetTimestamp().do();
       *  ```
       *
       [Response data schema details](https://developer.algorand.org/docs/rest-apis/algod/#get-v2devmodeblocksoffset)
       * @category GET
       */
      getBlockOffsetTimestamp() {
        return new GetBlockOffsetTimestamp(this.c, this.intDecoding);
      }
      /**
       * Set the sync round on the ledger (algod must have EnableFollowMode: true), restricting catchup.
       *
       *  #### Example
       *  ```typesecript
       *  const round = 10000
       *  await client.setSyncRound(round).do();
       *  ```
       *
       [Response data schema details](https://developer.algorand.org/docs/rest-apis/algod/#post-v2ledgersyncround)
       * @param round
       * @category POST
       */
      setSyncRound(round) {
        return new SetSyncRound(this.c, this.intDecoding, round);
      }
      /**
       * Un-Set the sync round on the ledger (algod must have EnableFollowMode: true), removing the restriction on catchup.
       *
       *  #### Example
       *  ```typesecript
       *  await client.unsetSyncRound().do();
       *  ```
       *
       [Response data schema details](https://developer.algorand.org/docs/rest-apis/algod/#delete-v2ledgersync)
       * @category DELETE
       */
      unsetSyncRound() {
        return new UnsetSyncRound(this.c, this.intDecoding);
      }
      /**
       * Get the current sync round on the ledger (algod must have EnableFollowMode: true).
       *
       *  #### Example
       *  ```typesecript
       *  const currentSyncRound = await client.getSyncRound().do();
       *  ```
       *
       [Response data schema details](https://developer.algorand.org/docs/rest-apis/algod/#get-v2ledgersync)
       * @category GET
       */
      getSyncRound() {
        return new GetSyncRound(this.c, this.intDecoding);
      }
      /**
       * Ready check which returns 200 OK if algod is healthy and caught up
       *
       *  #### Example
       *  ```typesecript
       *  await client.ready().do();
       *  ```
       *
       [Response data schema details](https://developer.algorand.org/docs/rest-apis/algod/#get-ready)
       * @category GET
       */
      ready() {
        return new Ready(this.c, this.intDecoding);
      }
      /**
       * GetLedgerStateDeltaForTransactionGroup returns the ledger delta for the txn group identified by id
       *
       * #### Example
       * ```typescript
       * const id = "ABC123";
       * await client.getLedgerStateDeltaForTransactionGroup(id).do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/algod/#get-v2deltastxngroupid)
       * @param id txn ID or group ID to be searched for
       * @category GET
       */
      getLedgerStateDeltaForTransactionGroup(id) {
        return new GetLedgerStateDeltaForTransactionGroup(this.c, this.intDecoding, id);
      }
      /**
       * GetLedgerStateDelta returns the ledger delta for the entire round
       *
       * #### Example
       * ```typescript
       * const round = 12345;
       * await client.getLedgerStateDelta(round).do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/algod/#get-v2deltasround)
       * @param round the round number to be searched for
       * @category GET
       */
      getLedgerStateDelta(round) {
        return new GetLedgerStateDelta(this.c, this.intDecoding, round);
      }
      /**
       * GetTransactionGroupLedgerStateDeltasForRound returns all ledger deltas for txn groups in the provided round
       *
       * #### Example
       * ```typescript
       * const round = 12345;
       * await client.getTransactionGroupLedgerStateDeltasForRound(round).do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/algod/#get-v2deltasroundtxngroup)
       * @param round the round number to be searched for
       * @category GET
       */
      getTransactionGroupLedgerStateDeltasForRound(round) {
        return new GetTransactionGroupLedgerStateDeltasForRound(this.c, this.intDecoding, round);
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/kmd.js
var Kmd;
var init_kmd = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/kmd.js"() {
    init_buffer();
    init_serviceClient();
    init_transaction();
    Kmd = class extends ServiceClient {
      constructor(token, baseServer = "http://127.0.0.1", port = 7833, headers = {}) {
        super("X-KMD-API-Token", token, baseServer, port, headers);
      }
      /**
       * version returns a VersionResponse containing a list of kmd API versions supported by this running kmd instance.
       */
      async versions() {
        const res = await this.c.get("/versions");
        return res.body;
      }
      /**
       * listWallets returns a ListWalletsResponse containing the list of wallets known to kmd. Using a wallet ID
       * returned from this endpoint, you can initialize a wallet handle with client.InitWalletHandle
       */
      async listWallets() {
        const res = await this.c.get("/v1/wallets");
        return res.body;
      }
      /**
       * createWallet creates a wallet with the specified name, password, driver,
       * and master derivation key. If the master derivation key is blank, one is
       * generated internally to kmd. CreateWallet returns a CreateWalletResponse
       * containing information about the new wallet.
       * @param walletName
       * @param walletPassword
       * @param walletDriverName
       * @param walletMDK
       */
      async createWallet(walletName, walletPassword, walletMDK = new Uint8Array(), walletDriverName = "sqlite") {
        const req = {
          wallet_name: walletName,
          wallet_driver_name: walletDriverName,
          wallet_password: walletPassword,
          master_derivation_key: Buffer.from(walletMDK).toString("base64")
        };
        const res = await this.c.post("/v1/wallet", req);
        return res.body;
      }
      /**
       * initWalletHandle accepts a wallet ID and a wallet password, and returns an
       * initWalletHandleResponse containing a wallet handle token. This wallet
       * handle token can be used for subsequent operations on this wallet, like key
       * generation, transaction signing, etc.. WalletHandleTokens expire after a
       * configurable number of seconds, and must be renewed periodically with
       * RenewWalletHandle. It is good practice to call ReleaseWalletHandle when
       * you're done interacting with this wallet.
       * @param walletID
       * @param walletPassword
       */
      async initWalletHandle(walletID, walletPassword) {
        const req = {
          wallet_id: walletID,
          wallet_password: walletPassword
        };
        const res = await this.c.post("/v1/wallet/init", req);
        return res.body;
      }
      /**
       * releaseWalletHandle invalidates the passed wallet handle token, making
       * it unusuable for subsequent wallet operations.
       * @param walletHandle
       */
      async releaseWalletHandle(walletHandle) {
        const req = {
          wallet_handle_token: walletHandle
        };
        const res = await this.c.post("/v1/wallet/release", req);
        return res.body;
      }
      /**
       * renewWalletHandle accepts a wallet handle and attempts to renew it, moving
       * the expiration time to some number of seconds in the future. It returns a
       * RenewWalletHandleResponse containing the walletHandle and the number of
       * seconds until expiration
       * @param walletHandle
       */
      async renewWalletHandle(walletHandle) {
        const req = {
          wallet_handle_token: walletHandle
        };
        const res = await this.c.post("/v1/wallet/renew", req);
        return res.body;
      }
      /**
       * renameWallet accepts a wallet ID, wallet password, and a new wallet name,
       * and renames the underlying wallet.
       * @param walletID
       * @param walletPassword
       * @param newWalletName
       */
      async renameWallet(walletID, walletPassword, newWalletName) {
        const req = {
          wallet_id: walletID,
          wallet_password: walletPassword,
          wallet_name: newWalletName
        };
        const res = await this.c.post("/v1/wallet/rename", req);
        return res.body;
      }
      /**
       * getWallet accepts a wallet handle and returns high level information about
       * this wallet in a GetWalletResponse.
       * @param walletHandle
       */
      async getWallet(walletHandle) {
        const req = {
          wallet_handle_token: walletHandle
        };
        const res = await this.c.post("/v1/wallet/info", req);
        return res.body;
      }
      /**
       * exportMasterDerivationKey accepts a wallet handle and a wallet password, and
       * returns an ExportMasterDerivationKeyResponse containing the master
       * derivation key. This key can be used as an argument to CreateWallet in
       * order to recover the keys generated by this wallet. The master derivation
       * key can be encoded as a sequence of words using the mnemonic library, and
       * @param walletHandle
       * @param walletPassword
       */
      async exportMasterDerivationKey(walletHandle, walletPassword) {
        const req = {
          wallet_handle_token: walletHandle,
          wallet_password: walletPassword
        };
        const res = await this.c.post("/v1/master-key/export", req);
        return {
          master_derivation_key: Buffer.from(res.body.master_derivation_key, "base64")
        };
      }
      /**
       * importKey accepts a wallet handle and an ed25519 private key, and imports
       * the key into the wallet. It returns an ImportKeyResponse containing the
       * address corresponding to this private key.
       * @param walletHandle
       * @param secretKey
       */
      async importKey(walletHandle, secretKey) {
        const req = {
          wallet_handle_token: walletHandle,
          private_key: Buffer.from(secretKey).toString("base64")
        };
        const res = await this.c.post("/v1/key/import", req);
        return res.body;
      }
      /**
       * exportKey accepts a wallet handle, wallet password, and address, and returns
       * an ExportKeyResponse containing the ed25519 private key corresponding to the
       * address stored in the wallet.
       * @param walletHandle
       * @param walletPassword
       * @param addr
       */
      async exportKey(walletHandle, walletPassword, addr) {
        const req = {
          wallet_handle_token: walletHandle,
          address: addr,
          wallet_password: walletPassword
        };
        const res = await this.c.post("/v1/key/export", req);
        return { private_key: Buffer.from(res.body.private_key, "base64") };
      }
      /**
       * generateKey accepts a wallet handle, and then generates the next key in the
       * wallet using its internal master derivation key. Two wallets with the same
       * master derivation key will generate the same sequence of keys.
       * @param walletHandle
       */
      async generateKey(walletHandle) {
        const req = {
          wallet_handle_token: walletHandle,
          display_mnemonic: false
        };
        const res = await this.c.post("/v1/key", req);
        return res.body;
      }
      /**
       * deleteKey accepts a wallet handle, wallet password, and address, and deletes
       * the information about this address from the wallet (including address and
       * secret key). If DeleteKey is called on a key generated using GenerateKey,
       * the same key will not be generated again. However, if a wallet is recovered
       * using the master derivation key, a key generated in this way can be
       * recovered.
       * @param walletHandle
       * @param walletPassword
       * @param addr
       */
      async deleteKey(walletHandle, walletPassword, addr) {
        const req = {
          wallet_handle_token: walletHandle,
          address: addr,
          wallet_password: walletPassword
        };
        const res = await this.c.delete("/v1/key", req);
        return res.body;
      }
      /**
       * ListKeys accepts a wallet handle and returns a ListKeysResponse containing
       * all of the addresses for which this wallet contains secret keys.
       * @param walletHandle
       */
      async listKeys(walletHandle) {
        const req = {
          wallet_handle_token: walletHandle
        };
        const res = await this.c.post("/v1/key/list", req);
        return res.body;
      }
      /**
       * signTransaction accepts a wallet handle, wallet password, and a transaction,
       * and returns and SignTransactionResponse containing an encoded, signed
       * transaction. The transaction is signed using the key corresponding to the
       * Sender field.
       * @param walletHandle
       * @param walletPassword
       * @param transaction
       */
      async signTransaction(walletHandle, walletPassword, transaction) {
        const tx = instantiateTxnIfNeeded(transaction);
        const req = {
          wallet_handle_token: walletHandle,
          wallet_password: walletPassword,
          transaction: Buffer.from(tx.toByte()).toString("base64")
        };
        const res = await this.c.post("/v1/transaction/sign", req);
        if (res.status === 200) {
          return Buffer.from(res.body.signed_transaction, "base64");
        }
        return res.body;
      }
      /**
       * signTransactionWithSpecificPublicKey accepts a wallet handle, wallet password, a transaction, and a public key,
       * and returns and SignTransactionResponse containing an encoded, signed
       * transaction. The transaction is signed using the key corresponding to the
       * publicKey arg.
       * @param walletHandle
       * @param walletPassword
       * @param transaction
       * @param publicKey - sign the txn with the key corresponding to publicKey (used for working with a rekeyed addr)
       */
      async signTransactionWithSpecificPublicKey(walletHandle, walletPassword, transaction, publicKey) {
        const tx = instantiateTxnIfNeeded(transaction);
        const req = {
          wallet_handle_token: walletHandle,
          wallet_password: walletPassword,
          transaction: Buffer.from(tx.toByte()).toString("base64"),
          public_key: Buffer.from(publicKey).toString("base64")
        };
        const res = await this.c.post("/v1/transaction/sign", req);
        if (res.status === 200) {
          return Buffer.from(res.body.signed_transaction, "base64");
        }
        return res.body;
      }
      /**
       * listMultisig accepts a wallet handle and returns a ListMultisigResponse
       * containing the multisig addresses whose preimages are stored in this wallet.
       * A preimage is the information needed to reconstruct this multisig address,
       * including multisig version information, threshold information, and a list
       * of public keys.
       * @param walletHandle
       */
      async listMultisig(walletHandle) {
        const req = {
          wallet_handle_token: walletHandle
        };
        const res = await this.c.post("/v1/multisig/list", req);
        return res.body;
      }
      /**
       * importMultisig accepts a wallet handle and the information required to
       * generate a multisig address. It derives this address, and stores all of the
       * information within the wallet. It returns a ImportMultisigResponse with the
       * derived address.
       * @param walletHandle
       * @param version
       * @param threshold
       * @param pks
       */
      async importMultisig(walletHandle, version, threshold, pks) {
        const req = {
          wallet_handle_token: walletHandle,
          multisig_version: version,
          threshold,
          pks
        };
        const res = await this.c.post("/v1/multisig/import", req);
        return res.body;
      }
      /**
       * exportMultisig accepts a wallet handle, wallet password, and multisig
       * address, and returns an ExportMultisigResponse containing the stored
       * multisig preimage. The preimage contains all of the information necessary
       * to derive the multisig address, including version, threshold, and a list of
       * public keys.
       * @param walletHandle
       * @param walletPassword
       * @param addr
       */
      async exportMultisig(walletHandle, addr) {
        const req = {
          wallet_handle_token: walletHandle,
          address: addr
        };
        const res = await this.c.post("/v1/multisig/export", req);
        return res.body;
      }
      /**
       * signMultisigTransaction accepts a wallet handle, wallet password,
       * transaction, public key (*not* an address), and an optional partial
       * MultisigSig. It looks up the secret key corresponding to the public key, and
       * returns a SignMultisigTransactionResponse containing a MultisigSig with a
       * signature by the secret key included.
       * @param walletHandle
       * @param pw
       * @param tx
       * @param pk
       * @param partial
       */
      async signMultisigTransaction(walletHandle, pw, transaction, pk, partial) {
        const tx = instantiateTxnIfNeeded(transaction);
        const req = {
          wallet_handle_token: walletHandle,
          transaction: Buffer.from(tx.toByte()).toString("base64"),
          public_key: Buffer.from(pk).toString("base64"),
          partial_multisig: partial,
          wallet_password: pw
        };
        const res = await this.c.post("/v1/multisig/sign", req);
        return res.body;
      }
      /**
       * deleteMultisig accepts a wallet handle, wallet password, and multisig
       * address, and deletes the information about this multisig address from the
       * wallet (including address and secret key).
       * @param walletHandle
       * @param walletPassword
       * @param addr
       */
      async deleteMultisig(walletHandle, walletPassword, addr) {
        const req = {
          wallet_handle_token: walletHandle,
          address: addr,
          wallet_password: walletPassword
        };
        const res = await this.c.delete("/v1/multisig", req);
        return res.body;
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/indexer/makeHealthCheck.js
var MakeHealthCheck;
var init_makeHealthCheck = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/indexer/makeHealthCheck.js"() {
    init_jsonrequest();
    MakeHealthCheck = class extends JSONRequest {
      /**
       * @returns `/health`
       */
      // eslint-disable-next-line class-methods-use-this
      path() {
        return "/health";
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/indexer/lookupAssetBalances.js
var LookupAssetBalances;
var init_lookupAssetBalances = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/indexer/lookupAssetBalances.js"() {
    init_jsonrequest();
    LookupAssetBalances = class extends JSONRequest {
      /**
       * Returns the list of accounts which hold the given asset and their balance.
       *
       * #### Example
       * ```typescript
       * const assetId = 163650;
       * const assetBalances = await indexerClient.lookupAssetBalances(assetId).do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2assetsasset-idbalances)
       * @param index - The asset ID to look up.
       */
      constructor(c, intDecoding, index) {
        super(c, intDecoding);
        this.index = index;
        this.index = index;
      }
      /**
       * @returns `/v2/assets/${index}/balances`
       */
      path() {
        return `/v2/assets/${this.index}/balances`;
      }
      /**
       * Limit results for pagination.
       *
       * #### Example
       * ```typescript
       * const assetId = 163650;
       * const maxResults = 20;
       * const assetBalances = await indexerClient
       *        .lookupAssetBalances(assetId)
       *        .limit(maxResults)
       *        .do();
       * ```
       *
       * @param limit - maximum number of results to return.
       * @category query
       */
      limit(limit) {
        this.query.limit = limit;
        return this;
      }
      /**
       * Filtered results should have an asset balance greater than this value.
       *
       * #### Example
       * ```typescript
       * const assetId = 163650;
       * const minBalance = 1000000;
       * const assetBalances = await indexerClient
       *        .lookupAssetBalances(assetId)
       *        .currencyGreaterThan(minBalance)
       *        .do();
       * ```
       * @param greater
       * @category query
       */
      currencyGreaterThan(greater) {
        this.query["currency-greater-than"] = greater.toString();
        return this;
      }
      /**
       * Filtered results should have an asset balance less than this value.
       *
       * #### Example
       * ```typescript
       * const assetId = 163650;
       * const maxBalance = 2000000;
       * const assetBalances = await indexerClient
       *        .lookupAssetBalances(assetId)
       *        .currencyLessThan(maxBalance)
       *        .do();
       * ```
       * @param lesser
       * @category query
       */
      currencyLessThan(lesser) {
        this.query["currency-less-than"] = lesser;
        return this;
      }
      /**
       * Specify the next page of results.
       *
       * #### Example
       * ```typescript
       * const assetId = 163650;
       * const maxResults = 20;
       *
       * const assetBalancesPage1 = await indexerClient
       *        .lookupAssetBalances(assetId)
       *        .limit(maxResults)
       *        .do();
       *
       * const assetBalancesPage2 = await indexerClient
       *        .lookupAssetBalances(assetId)
       *        .limit(maxResults)
       *        .nextToken(assetBalancesPage1["next-token"])
       *        .do();
       * ```
       * @param nextToken - provided by the previous results.
       * @category query
       */
      nextToken(nextToken) {
        this.query.next = nextToken;
        return this;
      }
      /**
       * Include all items including closed accounts, deleted applications, destroyed assets, opted-out asset holdings, and closed-out application localstates.
       *
       * #### Example 1
       * ```typescript
       * const assetId = 163650;
       * const assetBalances = await indexerClient
       *        .lookupAssetBalances(assetId)
       *        .includeAll(false)
       *        .do();
       * ```
       *
       * #### Example 2
       * ```typescript
       * const assetId = 163650;
       * const assetBalances = await indexerClient
       *        .lookupAssetBalances(assetId)
       *        .includeAll()
       *        .do();
       * ```
       *
       * @param value
       * @category query
       */
      includeAll(value = true) {
        this.query["include-all"] = value;
        return this;
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/indexer/lookupAccountTransactions.js
function base64StringFunnel(data) {
  if (typeof data === "string") {
    return data;
  }
  return Buffer.from(data).toString("base64");
}
var LookupAccountTransactions;
var init_lookupAccountTransactions = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/indexer/lookupAccountTransactions.js"() {
    init_buffer();
    init_jsonrequest();
    LookupAccountTransactions = class extends JSONRequest {
      /**
       * Returns transactions relating to the given account.
       *
       * #### Example
       * ```typescript
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const accountTxns = await indexerClient.lookupAccountTransactions(address).do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2accountsaccount-idtransactions)
       * @param account - The address of the account.
       */
      constructor(c, intDecoding, account) {
        super(c, intDecoding);
        this.account = account;
        this.account = account;
      }
      /**
       * @returns `/v2/accounts/${account}/transactions`
       */
      path() {
        return `/v2/accounts/${this.account}/transactions`;
      }
      /**
       * Specifies a prefix which must be contained in the note field.
       *
       * #### Example
       * ```typescript
       * const notePrefixBase64Encoded = "Y3JlYXRl";
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const accountTxns = await indexerClient
       *        .lookupAccountTransactions(address)
       *        .notePrefix(notePrefixBase64Encoded)
       *        .do();
       * ```
       *
       * @param prefix - base64 string or uint8array
       * @category query
       */
      notePrefix(prefix) {
        this.query["note-prefix"] = base64StringFunnel(prefix);
        return this;
      }
      /**
       * Type of transaction to filter with.
       *
       * #### Example
       * ```typescript
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const accountTxns = await indexerClient
       *        .lookupAccountTransactions(address)
       *        .txType("appl")
       *        .do();
       * ```
       *
       * @param type - one of `pay`, `keyreg`, `acfg`, `axfer`, `afrz`, `appl`, `stpf`
       * @category query
       */
      txType(type) {
        this.query["tx-type"] = type;
        return this;
      }
      /**
       * Type of signature to filter with.
       * - sig: Standard
       * - msig: MultiSig
       * - lsig: LogicSig
       *
       * #### Example
       * ```typescript
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const accountTxns = await indexerClient
       *        .lookupAccountTransactions(address)
       *        .sigType("msig")
       *        .do();
       * ```
       *
       * @param type - one of `sig`, `msig`, `lsig`
       * @category query
       */
      sigType(type) {
        this.query["sig-type"] = type;
        return this;
      }
      /**
       * Lookup the specific transaction by ID.
       *
       * #### Example
       * ```typescript
       * const txId = "MEUOC4RQJB23CQZRFRKYEI6WBO73VTTPST5A7B3S5OKBUY6LFUDA";
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const accountTxns = await indexerClient
       *        .lookupAccountTransactions(address)
       *        .txid(txId)
       *        .do();
       * ```
       * @remarks Alternatively, use `indexerClient.lookupTransactionByID(txnId).do()`
       * @param txid
       * @category query
       */
      txid(txid) {
        this.query.txid = txid;
        return this;
      }
      /**
       * Include results for the specified round.
       *
       * #### Example
       * ```typescript
       * const targetBlock = 18309917;
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const accountTxns = await indexerClient
       *        .lookupAccountTransactions(address)
       *        .round(targetBlock)
       *        .do();
       * ```
       *
       * @param round
       * @category query
       */
      round(round) {
        this.query.round = round;
        return this;
      }
      /**
       * Include results at or after the specified min-round.
       *
       * #### Example
       * ```typescript
       * const minRound = 18309917;
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const accountTxns = await indexerClient
       *        .lookupAccountTransactions(address)
       *        .minRound(minRound)
       *        .do();
       * ```
       *
       * @param round
       * @category query
       */
      minRound(round) {
        this.query["min-round"] = round;
        return this;
      }
      /**
       * Include results at or before the specified max-round.
       *
       * #### Example
       * ```typescript
       * const maxRound = 18309917;
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const accountTxns = await indexerClient
       *        .lookupAccountTransactions(address)
       *        .maxRound(maxRound)
       *        .do();
       * ```
       *
       * @param round
       * @category query
       */
      maxRound(round) {
        this.query["max-round"] = round;
        return this;
      }
      /**
       * Asset ID to filter with.
       *
       * #### Example
       * ```typescript
       * const assetID = 163650;
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const accountTxns = await indexerClient
       *        .lookupAccountTransactions(address)
       *        .assetID(assetID)
       *        .do();
       * ```
       *
       * @param id
       * @category query
       */
      assetID(id) {
        this.query["asset-id"] = id;
        return this;
      }
      /**
       * Maximum number of results to return.
       *
       * #### Example
       * ```typescript
       * const maxResults = 25;
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const accountTxns = await indexerClient
       *        .lookupAccountTransactions(address)
       *        .limit(maxResults)
       *        .do();
       * ```
       *
       * @param limit
       * @category query
       */
      limit(limit) {
        this.query.limit = limit;
        return this;
      }
      /**
       * Include results before the given time.
       *
       * #### Example
       * ```typescript
       * const beforeTime = "2022-02-02T20:20:22.02Z";
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const accountTxns = await indexerClient
       *        .lookupAccountTransactions(address)
       *        .beforeTime(beforeTime)
       *        .do();
       * ```
       *
       * @param before - rfc3339 string
       * @category query
       */
      beforeTime(before) {
        this.query["before-time"] = before;
        return this;
      }
      /**
       * Include results after the given time.
       *
       * #### Example
       * ```typescript
       * const afterTime = "2022-10-21T00:00:11.55Z";
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const accountTxns = await indexerClient
       *        .lookupAccountTransactions(address)
       *        .afterTime(afterTime)
       *        .do();
       * ```
       *
       * @param after - rfc3339 string
       * @category query
       */
      afterTime(after) {
        this.query["after-time"] = after;
        return this;
      }
      /**
       * Filtered results should have an amount greater than this value, as int, representing microAlgos, unless an asset-id is provided, in which case units are in the asset's units.
       *
       * #### Example 1
       * ```typescript
       * const minBalance = 300000;
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const accountTxns = await indexerClient
       *        .lookupAccountTransactions(address)
       *        .currencyGreaterThan(minBalance - 1)
       *        .do();
       * ```
       *
       * #### Example 2
       * ```typescript
       * const assetID = 163650;
       * const minBalance = 300000;
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const accountTxns = await indexerClient
       *        .lookupAccountTransactions(address)
       *        .assetID(assetID)
       *        .currencyGreaterThan(minBalance - 1)
       *        .do();
       * ```
       *
       * @param greater
       * @category query
       */
      currencyGreaterThan(greater) {
        this.query["currency-greater-than"] = greater.toString();
        return this;
      }
      /**
       * Filtered results should have an amount less than this value, as int, representing microAlgos, unless an asset-id is provided, in which case units are in the asset's units.
       *
       * #### Example 1
       * ```typescript
       * const maxBalance = 500000;
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const accountTxns = await indexerClient
       *        .lookupAccountTransactions(address)
       *        .currencyLessThan(maxBalance + 1)
       *        .do();
       * ```
       *
       * #### Example 2
       * ```typescript
       * const assetID = 163650;
       * const maxBalance = 500000;
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const accountTxns = await indexerClient
       *        .lookupAccountTransactions(address)
       *        .assetID(assetID)
       *        .currencyLessThan(maxBalance + 1)
       *        .do();
       * ```
       *
       * @param lesser
       * @category query
       */
      currencyLessThan(lesser) {
        this.query["currency-less-than"] = lesser;
        return this;
      }
      /**
       * The next page of results. Use the next token provided by the previous results.
       *
       * #### Example
       * ```typescript
       * const maxResults = 25;
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       *
       * const accountTxnsPage1 = await indexerClient
       *        .lookupAccountTransactions(address)
       *        .limit(maxResults)
       *        .do();
       *
       * const accountTxnsPage2 = await indexerClient
       *        .lookupAccountTransactions(address)
       *        .limit(maxResults)
       *        .nextToken(accountTxnsPage1["next-token"])
       *        .do();
       * ```
       *
       * @param nextToken - provided by the previous results.
       * @category query
       */
      nextToken(nextToken) {
        this.query.next = nextToken;
        return this;
      }
      /**
       * Whether or not to include rekeying transactions.
       *
       * #### Example
       * ```typescript
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const accountTxns = await indexerClient
       *        .lookupAccountTransactions(address)
       *        .rekeyTo(false)
       *        .do();
       * ```
       *
       * @param rekeyTo
       * @category query
       */
      rekeyTo(rekeyTo) {
        this.query["rekey-to"] = rekeyTo;
        return this;
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/indexer/lookupAssetTransactions.js
var LookupAssetTransactions;
var init_lookupAssetTransactions = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/indexer/lookupAssetTransactions.js"() {
    init_jsonrequest();
    init_lookupAccountTransactions();
    LookupAssetTransactions = class extends JSONRequest {
      /**
       * Returns transactions relating to the given asset.
       *
       * #### Example
       * ```typescript
       * const assetId = 163650;
       * const assetTxns = await indexerClient.lookupAssetTransactions(assetId).do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2assetsasset-idtransactions)
       * @param index - The asset ID to look up.
       */
      constructor(c, intDecoding, index) {
        super(c, intDecoding);
        this.index = index;
        this.index = index;
      }
      /**
       * @returns `/v2/assets/${index}/transactions`
       */
      path() {
        return `/v2/assets/${this.index}/transactions`;
      }
      /**
       * Specifies a prefix which must be contained in the note field.
       *
       * #### Example
       * ```typescript
       * const notePrefixBase64Encoded = "Y3JlYXRl";
       * const assetId = 163650;
       * const assetTxns = await indexerClient
       *        .lookupAssetTransactions(assetId)
       *        .notePrefix(notePrefixBase64Encoded)
       *        .do();
       * ```
       *
       * @param prefix - base64 string or uint8array
       * @category query
       */
      notePrefix(prefix) {
        this.query["note-prefix"] = base64StringFunnel(prefix);
        return this;
      }
      /**
       * Type of transaction to filter with.
       *
       * #### Example
       * ```typescript
       * const assetId = 163650;
       * const assetTxns = await indexerClient
       *        .lookupAssetTransactions(assetId)
       *        .txType("axfer")
       *        .do();
       * ```
       *
       * @param type - one of `pay`, `keyreg`, `acfg`, `axfer`, `afrz`, `appl`
       * @category query
       */
      txType(type) {
        this.query["tx-type"] = type;
        return this;
      }
      /**
       * Type of signature to filter with.
       * - sig: Standard
       * - msig: MultiSig
       * - lsig: LogicSig
       *
       * #### Example
       * ```typescript
       * const assetId = 163650;
       * const assetTxns = await indexerClient
       *        .lookupAssetTransactions(assetId)
       *        .sigType("lsig")
       *        .do();
       * ```
       *
       * @param type - one of `sig`, `msig`, `lsig`
       * @category query
       */
      sigType(type) {
        this.query["sig-type"] = type;
        return this;
      }
      /**
       * Lookup the specific transaction by ID.
       *
       * #### Example
       * ```typescript
       * const txId = "MEUOC4RQJB23CQZRFRKYEI6WBO73VTTPST5A7B3S5OKBUY6LFUDA";
       * const assetId = 163650;
       * const assetTxns = await indexerClient
       *        .lookupAssetTransactions(assetId)
       *        .txid(txId)
       *        .do();
       * ```
       *
       * @param txid
       * @category query
       */
      txid(txid) {
        this.query.txid = txid;
        return this;
      }
      /**
       * Include results for the specified round.
       *
       * #### Example
       * ```typescript
       * const targetBlock = 18309917;
       * const assetId = 163650;
       * const assetTxns = await indexerClient
       *        .lookupAssetTransactions(assetId)
       *        .round(targetBlock)
       *        .do();
       * ```
       *
       * @param round
       * @category query
       */
      round(round) {
        this.query.round = round;
        return this;
      }
      /**
       * Include results at or after the specified min-round.
       *
       * #### Example
       * ```typescript
       * const minRound = 18309917;
       * const assetId = 163650;
       * const assetTxns = await indexerClient
       *        .lookupAssetTransactions(assetId)
       *        .minRound(minRound)
       *        .do();
       * ```
       *
       * @param round
       * @category query
       */
      minRound(round) {
        this.query["min-round"] = round;
        return this;
      }
      /**
       * Include results at or before the specified max-round.
       *
       * #### Example
       * ```typescript
       * const maxRound = 18309917;
       * const assetId = 163650;
       * const assetTxns = await indexerClient
       *        .lookupAssetTransactions(assetId)
       *        .maxRound(maxRound)
       *        .do();
       * ```
       *
       * @param round
       * @category query
       */
      maxRound(round) {
        this.query["max-round"] = round;
        return this;
      }
      /**
       * Maximum number of results to return.
       *
       * #### Example
       * ```typescript
       * const maxResults = 25;
       * const assetId = 163650;
       * const assetTxns = await indexerClient
       *        .lookupAssetTransactions(assetId)
       *        .limit(maxResults)
       *        .do();
       * ```
       *
       * @param limit
       * @category query
       */
      limit(limit) {
        this.query.limit = limit;
        return this;
      }
      /**
       * Include results before the given time.
       *
       * #### Example
       * ```typescript
       * const beforeTime = "2022-02-02T20:20:22.02Z";
       * const assetId = 163650;
       * const assetTxns = await indexerClient
       *        .lookupAssetTransactions(assetId)
       *        .beforeTime(beforeTime)
       *        .do();
       * ```
       *
       * @param before - rfc3339 string
       * @category query
       */
      beforeTime(before) {
        this.query["before-time"] = before;
        return this;
      }
      /**
       * Include results after the given time.
       *
       * #### Example
       * ```typescript
       * const afterTime = "2022-10-21T00:00:11.55Z";
       * const assetId = 163650;
       * const assetTxns = await indexerClient
       *        .lookupAssetTransactions(assetId)
       *        .afterTime(afterTime)
       *        .do();
       * ```
       *
       * @param after - rfc3339 string
       * @category query
       */
      afterTime(after) {
        this.query["after-time"] = after;
        return this;
      }
      /**
       * Filtered results should have an amount greater than this value, as int, representing asset units.
       *
       * #### Example
       * ```typescript
       * const minBalance = 300000;
       * const assetId = 163650;
       * const assetTxns = await indexerClient
       *        .lookupAssetTransactions(assetId)
       *        .currencyGreaterThan(minBalance - 1)
       *        .do();
       * ```
       *
       * @param greater
       * @category query
       */
      currencyGreaterThan(greater) {
        this.query["currency-greater-than"] = greater.toString();
        return this;
      }
      /**
       * Filtered results should have an amount less than this value, as int, representing asset units.
       *
       * #### Example
       * ```typescript
       * const maxBalance = 500000;
       * const assetId = 163650;
       * const assetTxns = await indexerClient
       *        .lookupAssetTransactions(assetId)
       *        .currencyLessThan(maxBalance + 1)
       *        .do();
       * ```
       *
       * @param lesser
       * @category query
       */
      currencyLessThan(lesser) {
        this.query["currency-less-than"] = lesser;
        return this;
      }
      /**
       * Combined with address, defines what address to filter on, as string.
       *
       * #### Example
       * ```typescript
       * const assetId = 163650;
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const role = "sender";
       * const assetTxns = await indexerClient
       *        .lookupAssetTransactions(assetId)
       *        .address(address)
       *        .addressRole(role)
       *        .do();
       * ```
       *
       * @param role - one of `sender`, `receiver`, `freeze-target`
       * @category query
       */
      addressRole(role) {
        this.query["address-role"] = role;
        return this;
      }
      /**
       * Only include transactions with this address in one of the transaction fields.
       *
       * #### Example
       * ```typescript
       * const assetId = 163650;
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const assetTxns = await indexerClient
       *        .lookupAssetTransactions(assetId)
       *        .address(address)
       *        .do();
       * ```
       *
       * @param address
       * @category query
       */
      address(address) {
        this.query.address = address;
        return this;
      }
      /**
       * Whether or not to consider the `close-to` field as a receiver when filtering transactions, as bool. Set to `true` to ignore `close-to`.
       *
       * #### Example
       * ```typescript
       * const assetId = 163650;
       * const assetTxns = await indexerClient
       *        .lookupAssetTransactions(assetId)
       *        .excludeCloseTo(true)
       *        .do();
       * ```
       *
       * @param exclude
       * @category query
       */
      excludeCloseTo(exclude) {
        this.query["exclude-close-to"] = exclude;
        return this;
      }
      /**
       * The next page of results.
       *
       * #### Example
       * ```typescript
       * const maxResults = 25;
       * const assetId = 163650;
       *
       * const assetTxnsPage1 = await indexerClient
       *        .lookupAssetTransactions(assetId)
       *        .limit(maxResults)
       *        .do();
       *
       * const assetTxnsPage2 = await indexerClient
       *        .lookupAssetTransactions(assetId)
       *        .limit(maxResults)
       *        .nextToken(assetTxnsPage1["next-token"])
       *        .do();
       * ```
       *
       * @param nextToken - provided by the previous results.
       * @category query
       */
      nextToken(nextToken) {
        this.query.next = nextToken;
        return this;
      }
      /**
       * Whether or not to include rekeying transactions.
       *
       * #### Example
       * ```typescript
       * const assetId = 163650;
       * const assetTxns = await indexerClient
       *        .lookupAssetTransactions(assetId)
       *        .rekeyTo(false)
       *        .do();
       * ```
       *
       * @param rekeyTo
       * @category query
       */
      rekeyTo(rekeyTo) {
        this.query["rekey-to"] = rekeyTo;
        return this;
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/indexer/lookupBlock.js
var LookupBlock;
var init_lookupBlock = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/indexer/lookupBlock.js"() {
    init_jsonrequest();
    LookupBlock = class extends JSONRequest {
      /**
       * Returns the block for the passed round.
       *
       * #### Example
       * ```typescript
       * const targetBlock = 18309917;
       * const blockInfo = await indexerClient.lookupBlock(targetBlock).do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2blocksround-number)
       * @param round - The number of the round to look up.
       * @category GET
       */
      constructor(c, intDecoding, round) {
        super(c, intDecoding);
        this.round = round;
        this.round = round;
      }
      /**
       * @returns `/v2/blocks/${round}`
       */
      path() {
        return `/v2/blocks/${this.round}`;
      }
      /**
       * Header only flag. When this is set to true, returned block does not contain the
       * transactions.
       */
      headerOnly(headerOnly) {
        this.query["header-only"] = headerOnly;
        return this;
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/indexer/lookupTransactionByID.js
var LookupTransactionByID;
var init_lookupTransactionByID = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/indexer/lookupTransactionByID.js"() {
    init_jsonrequest();
    LookupTransactionByID = class extends JSONRequest {
      /**
       * Returns information about the given transaction.
       *
       * #### Example
       * ```typescript
       * const txnId = "MEUOC4RQJB23CQZRFRKYEI6WBO73VTTPST5A7B3S5OKBUY6LFUDA";
       * const txnInfo = await indexerClient.lookupTransactionByID(txnId).do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2transactionstxid)
       * @param txID - The ID of the transaction to look up.
       * @category GET
       */
      constructor(c, intDecoding, txID) {
        super(c, intDecoding);
        this.txID = txID;
        this.txID = txID;
      }
      /**
       * @returns `/v2/transactions/${txID}`
       */
      path() {
        return `/v2/transactions/${this.txID}`;
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/indexer/lookupAccountByID.js
var LookupAccountByID;
var init_lookupAccountByID = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/indexer/lookupAccountByID.js"() {
    init_jsonrequest();
    LookupAccountByID = class extends JSONRequest {
      /**
       * Returns information about the given account.
       *
       * #### Example
       * ```typescript
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const accountInfo = await indexerClient.lookupAccountByID(address).do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2accountsaccount-id)
       * @param account - The address of the account to look up.
       * @category GET
       */
      constructor(c, intDecoding, account) {
        super(c, intDecoding);
        this.account = account;
        this.account = account;
      }
      /**
       * @returns `/v2/accounts/${account}`
       */
      path() {
        return `/v2/accounts/${this.account}`;
      }
      /**
       * Specify round to filter with.
       *
       * #### Example
       * ```typescript
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const targetBlock = 18309917;
       * const accountInfo = await indexerClient
       *        .lookupAccountByID(address)
       *        .round(targetBlock)
       *        .do();
       * ```
       * @param round
       */
      round(round) {
        this.query.round = round;
        return this;
      }
      /**
       * Include all items including closed accounts, deleted applications, destroyed assets, opted-out asset holdings, and closed-out application localstates.
       *
       * #### Example 1
       * ```typescript
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const accountInfo = await indexerClient
       *        .lookupAccountByID(address)
       *        .includeAll(false)
       *        .do();
       * ```
       *
       * #### Example 2
       * ```typescript
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const accountInfo = await indexerClient
       *        .lookupAccountByID(address)
       *        .includeAll()
       *        .do();
       * ```
       * @param value
       */
      includeAll(value = true) {
        this.query["include-all"] = value;
        return this;
      }
      /**
       * Exclude additional items such as asset holdings, application local data stored for this account, asset parameters created by this account, and application parameters created by this account.
       *
       * #### Example 1
       * ```typescript
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const accountInfo = await indexerClient
       *        .lookupAccountByID(address)
       *        .exclude("all")
       *        .do();
       * ```
       *
       * #### Example 2
       * ```typescript
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const accountInfo = await indexerClient
       *        .lookupAccountByID(address)
       *        .exclude("assets,created-assets")
       *        .do();
       * ```
       * @remarks By default, it behaves as exclude=none
       * @param exclude - Array of `all`, `assets`, `created-assets`, `apps-local-state`, `created-apps`, `none`
       * @category query
       */
      exclude(exclude) {
        this.query.exclude = exclude;
        return this;
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/indexer/lookupAccountAssets.js
var LookupAccountAssets;
var init_lookupAccountAssets = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/indexer/lookupAccountAssets.js"() {
    init_jsonrequest();
    LookupAccountAssets = class extends JSONRequest {
      /**
       * Returns asset about the given account.
       *
       * #### Example
       * ```typescript
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const accountAssets = await indexerClient.lookupAccountAssets(address).do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2accountsaccount-idassets)
       * @param account - The address of the account to look up.
       * @category GET
       */
      constructor(c, intDecoding, account) {
        super(c, intDecoding);
        this.account = account;
        this.account = account;
      }
      /**
       * @returns `/v2/accounts/${account}/assets`
       */
      path() {
        return `/v2/accounts/${this.account}/assets`;
      }
      /**
       * Add a limit for filter.
       *
       * #### Example
       * ```typescript
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const maxResults = 20;
       * const accountAssets = await indexerClient
       *        .lookupAccountAssets(address)
       *        .limit(maxResults)
       *        .do();
       * ```
       *
       * @param limit - maximum number of results to return.
       * @category query
       */
      limit(limit) {
        this.query.limit = limit;
        return this;
      }
      /**
       * Specify round to filter with.
       *
       * #### Example
       * ```typescript
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const targetBlock = 18309917;
       * const accountAssets = await indexerClient
       *        .lookupAccountAssets(address)
       *        .round(targetBlock)
       *        .do();
       * ```
       * @param round
       * @category query
       */
      round(round) {
        this.query.round = round;
        return this;
      }
      /**
       * Specify the next page of results.
       *
       * #### Example
       * ```typescript
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const maxResults = 20;
       *
       * const accountAssetsPage1 = await indexerClient
       *        .lookupAccountAssets(address)
       *        .limit(maxResults)
       *        .do();
       *
       * const accountAssetsPage2 = await indexerClient
       *        .lookupAccountAssets(address)
       *        .limit(maxResults)
       *        .next(accountAssetsPage1["next-token"])
       *        .do();
       * ```
       * @param nextToken - provided by the previous results.
       * @category query
       */
      nextToken(nextToken) {
        this.query.next = nextToken;
        return this;
      }
      /**
       * Include all items including closed accounts, deleted applications, destroyed assets, opted-out asset holdings, and closed-out application localstates
       *
       * #### Example
       * ```typescript
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const accountAssets = await indexerClient
       *        .lookupAccountAssets(address)
       *        .includeAll(false)
       *        .do();
       * ```
       * @param value
       * @category query
       */
      includeAll(value = true) {
        this.query["include-all"] = value;
        return this;
      }
      /**
       * Specify an assetID to search for.
       *
       * #### Example
       * ```typescript
       * const assetId = 163650;
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const assetAssets = await indexerClient
       *        .lookupAccountAssets(address)
       *        .assetId(assetId)
       *        .do();
       * ```
       * @param index - the assetID
       * @category query
       */
      assetId(index) {
        this.query["asset-id"] = index;
        return this;
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/indexer/lookupAccountCreatedAssets.js
var LookupAccountCreatedAssets;
var init_lookupAccountCreatedAssets = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/indexer/lookupAccountCreatedAssets.js"() {
    init_jsonrequest();
    LookupAccountCreatedAssets = class extends JSONRequest {
      /**
       * Returns asset information created by the given account.
       *
       * #### Example
       * ```typescript
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const accountCreatedAssets = await indexerClient.lookupAccountCreatedAssets(address).do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2accountsaccount-idcreated-assets)
       * @param account - The address of the account to look up.
       * @category GET
       */
      constructor(c, intDecoding, account) {
        super(c, intDecoding);
        this.account = account;
        this.account = account;
      }
      /**
       * @returns `/v2/accounts/${account}/created-assets`
       */
      path() {
        return `/v2/accounts/${this.account}/created-assets`;
      }
      /**
       * Add a limit for filter.
       *
       * #### Example
       * ```typescript
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const maxResults = 20;
       * const accountAssets = await indexerClient
       *        .lookupAccountCreatedAssets(address)
       *        .limit(maxResults)
       *        .do();
       * ```
       *
       * @param limit - maximum number of results to return.
       * @category query
       */
      limit(limit) {
        this.query.limit = limit;
        return this;
      }
      /**
       * Specify round to filter with.
       *
       * #### Example
       * ```typescript
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const targetBlock = 18309917;
       * const accountAssets = await indexerClient
       *        .lookupAccountCreatedAssets(address)
       *        .round(targetBlock)
       *        .do();
       * ```
       * @param round
       * @category query
       */
      round(round) {
        this.query.round = round;
        return this;
      }
      /**
       * Specify the next page of results.
       *
       * #### Example
       * ```typescript
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const maxResults = 20;
       *
       * const accountAssetsPage1 = await indexerClient
       *        .lookupAccountCreatedAssets(address)
       *        .limit(maxResults)
       *        .do();
       * ```
       *
       * const accountAssetsPage2 = await indexerClient
       *        .lookupAccountCreatedAssets(address)
       *        .limit(maxResults)
       *        .next(accountAssetsPage1["next-token"])
       *        .do();
       * ```
       * @param nextToken - provided by the previous results.
       * @category query
       */
      nextToken(nextToken) {
        this.query.next = nextToken;
        return this;
      }
      /**
       * Include all items including closed accounts, deleted applications, destroyed assets, opted-out asset holdings, and closed-out application localstates
       *
       * #### Example
       * ```typescript
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const accountAssets = await indexerClient
       *        .lookupAccountCreatedAssets(address)
       *        .includeAll(false)
       *        .do();
       * ```
       * @param value
       * @category query
       */
      includeAll(value = true) {
        this.query["include-all"] = value;
        return this;
      }
      /**
       * Specify an assetID to search for.
       *
       * #### Example
       * ```typescript
       * const assetID = 163650;
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const assetAssets = await indexerClient
       *        .lookupAccountCreatedAssets(address)
       *        .assetID(assetID)
       *        .do();
       * ```
       * @param index - the assetID
       * @category query
       */
      assetID(index) {
        this.query["asset-id"] = index;
        return this;
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/indexer/lookupAccountAppLocalStates.js
var LookupAccountAppLocalStates;
var init_lookupAccountAppLocalStates = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/indexer/lookupAccountAppLocalStates.js"() {
    init_jsonrequest();
    LookupAccountAppLocalStates = class extends JSONRequest {
      /**
       * Returns application local state about the given account.
       *
       * #### Example
       * ```typescript
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const accountAppLocalStates = await indexerClient.lookupAccountAppLocalStates(address).do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2accountsaccount-idapps-local-state)
       * @param account - The address of the account to look up.
       * @category GET
       */
      constructor(c, intDecoding, account) {
        super(c, intDecoding);
        this.account = account;
        this.account = account;
      }
      /**
       * @returns `/v2/accounts/${account}/apps-local-state`
       */
      path() {
        return `/v2/accounts/${this.account}/apps-local-state`;
      }
      /**
       * Add a limit for filter.
       *
       * #### Example
       * ```typescript
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const maxResults = 20;
       * const accountAssets = await indexerClient
       *        .lookupAccountAppLocalStates(address)
       *        .limit(maxResults)
       *        .do();
       * ```
       *
       * @param limit - maximum number of results to return.
       * @category query
       */
      limit(limit) {
        this.query.limit = limit;
        return this;
      }
      /**
       * Specify round to filter with.
       *
       * #### Example
       * ```typescript
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const targetBlock = 18309917;
       * const accountAssets = await indexerClient
       *        .lookupAccountAppLocalStates(address)
       *        .round(targetBlock)
       *        .do();
       * ```
       * @param round
       * @category query
       */
      round(round) {
        this.query.round = round;
        return this;
      }
      /**
       * Specify the next page of results.
       *
       * #### Example
       * ```typescript
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const maxResults = 20;
       *
       * const accountAssetsPage1 = await indexerClient
       *        .lookupAccountAppLocalStates(address)
       *        .limit(maxResults)
       *        .do();
       *
       * const accountAssetsPage2 = await indexerClient
       *        .lookupAccountAppLocalStates(address)
       *        .limit(maxResults)
       *        .next(accountAssetsPage1["next-token"])
       *        .do();
       * ```
       * @param nextToken - provided by the previous results.
       */
      nextToken(nextToken) {
        this.query.next = nextToken;
        return this;
      }
      /**
       * Include all items including closed accounts, deleted applications, destroyed assets, opted-out asset holdings, and closed-out application localstates
       *
       * #### Example
       * ```typescript
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const accountAssets = await indexerClient
       *        .lookupAccountAppLocalStates(address)
       *        .includeAll(false)
       *        .do();
       * ```
       * @param value
       * @category query
       */
      includeAll(value = true) {
        this.query["include-all"] = value;
        return this;
      }
      /**
       * Specify an applicationID to search for.
       *
       * #### Example
       * ```typescript
       * const applicationID = 163650;
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const accountApplications = await indexerClient
       *        .lookupAccountAppLocalStates(address)
       *        .applicationID(applicationID)
       *        .do();
       * ```
       * @param index - the applicationID
       * @category query
       */
      applicationID(index) {
        this.query["application-id"] = index;
        return this;
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/indexer/lookupAccountCreatedApplications.js
var LookupAccountCreatedApplications;
var init_lookupAccountCreatedApplications = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/indexer/lookupAccountCreatedApplications.js"() {
    init_jsonrequest();
    LookupAccountCreatedApplications = class extends JSONRequest {
      /**
       * Returns application information created by the given account.
       *
       * #### Example
       * ```typescript
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const accountCreatedApps = await indexerClient.lookupAccountCreatedApplications(address).do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2accountsaccount-idcreated-applications)
       * @param account - The address of the account to look up.
       * @category GET
       */
      constructor(c, intDecoding, account) {
        super(c, intDecoding);
        this.account = account;
        this.account = account;
      }
      /**
       * @returns `/v2/accounts/${account}/created-applications`
       */
      path() {
        return `/v2/accounts/${this.account}/created-applications`;
      }
      /**
       * Add a limit for filter.
       *
       * #### Example
       * ```typescript
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const maxResults = 20;
       * const accountAssets = await indexerClient
       *        .lookupAccountCreatedApplications(address)
       *        .limit(maxResults)
       *        .do();
       * ```
       *
       * @param limit - maximum number of results to return.
       * @category query
       */
      limit(limit) {
        this.query.limit = limit;
        return this;
      }
      /**
       * Specify round to filter with.
       *
       * #### Example
       * ```typescript
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const targetBlock = 18309917;
       * const accountAssets = await indexerClient
       *        .lookupAccountCreatedApplications(address)
       *        .round(targetBlock)
       *        .do();
       * ```
       * @param round
       * @category query
       */
      round(round) {
        this.query.round = round;
        return this;
      }
      /**
       * Specify the next page of results.
       *
       * #### Example
       * ```typescript
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const maxResults = 20;
       *
       * const accountAssetsPage1 = await indexerClient
       *        .lookupAccountCreatedApplications(address)
       *        .limit(maxResults)
       *        .do();
       *
       * const accountAssetsPage2 = await indexerClient
       *        .lookupAccountCreatedApplications(address)
       *        .limit(maxResults)
       *        .next(accountAssetsPage1["next-token"])
       *        .do();
       * ```
       * @param nextToken - provided by the previous results.
       * @category query
       */
      nextToken(nextToken) {
        this.query.next = nextToken;
        return this;
      }
      /**
       * Include all items including closed accounts, deleted applications, destroyed assets, opted-out asset holdings, and closed-out application localstates
       *
       * #### Example
       * ```typescript
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const accountAssets = await indexerClient
       *        .lookupAccountCreatedApplications(address)
       *        .includeAll(false)
       *        .do();
       * ```
       * @param value
       * @category query
       */
      includeAll(value = true) {
        this.query["include-all"] = value;
        return this;
      }
      /**
       * Specify an applicationID to search for.
       *
       * #### Example
       * ```typescript
       * const applicationID = 163650;
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const accountApplications = await indexerClient
       *        .lookupAccountAppLocalStates(address)
       *        .applicationID(applicationID)
       *        .do();
       * ```
       * @param index - the applicationID
       * @category query
       */
      applicationID(index) {
        this.query["application-id"] = index;
        return this;
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/indexer/lookupAssetByID.js
var LookupAssetByID;
var init_lookupAssetByID = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/indexer/lookupAssetByID.js"() {
    init_jsonrequest();
    LookupAssetByID = class extends JSONRequest {
      /**
       * Returns asset information of the queried asset.
       *
       * #### Example
       * ```typescript
       * const assetId = 163650;
       * const assetInfo = await indexerClient.lookupAssetByID(assetId).do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2assetsasset-id)
       * @param index - The asset ID to look up.
       */
      constructor(c, intDecoding, index) {
        super(c, intDecoding);
        this.index = index;
        this.index = index;
      }
      /**
       * @returns `/v2/assets/${index}`
       */
      path() {
        return `/v2/assets/${this.index}`;
      }
      /**
       * Includes all items including closed accounts, deleted applications, destroyed assets, opted-out asset holdings, and closed-out application localstates
       *
       * #### Example 1
       * ```typescript
       * const assetId = 163650;
       * const assetInfo = await indexerClient
       *        .lookupAssetByID(assetId)
       *        .includeAll(false)
       *        .do();
       * ```
       *
       * #### Example 2
       * ```typescript
       * const assetId = 163650;
       * const assetInfo = await indexerClient
       *        .lookupAssetByID(assetId)
       *        .includeAll()
       *        .do();
       * ```
       *
       * @param value - default true when called without passing a value
       * @category query
       */
      includeAll(value = true) {
        this.query["include-all"] = value;
        return this;
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/indexer/lookupApplications.js
var LookupApplications;
var init_lookupApplications = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/indexer/lookupApplications.js"() {
    init_jsonrequest();
    LookupApplications = class extends JSONRequest {
      /**
       * Returns information about the passed application.
       *
       * #### Example
       * ```typescript
       * const appId = 60553466;
       * const appInfo = await indexerClient.lookupApplications(appId).do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2applicationsapplication-id)
       * @param index - The ID of the application to look up.
       * @category GET
       */
      constructor(c, intDecoding, index) {
        super(c, intDecoding);
        this.index = index;
        this.index = index;
      }
      /**
       * @returns `/v2/applications/${index}`
       */
      path() {
        return `/v2/applications/${this.index}`;
      }
      /**
       * Includes all items including closed accounts, deleted applications, destroyed assets, opted-out asset holdings, and closed-out application localstates
       *
       * #### Example 1
       * ```typescript
       * const appId = 60553466;
       * const appInfo = await indexerClient
       *        .lookupApplications(appId)
       *        .includeAll(false)
       *        .do();
       * ```
       *
       * #### Example 2
       * ```typescript
       * const appId = 60553466;
       * const appInfo = await indexerClient
       *        .lookupApplications(appId)
       *        .includeAll()
       *        .do();
       * ```
       *
       * @param value - default true when called without passing a value
       * @category query
       */
      includeAll(value = true) {
        this.query["include-all"] = value;
        return this;
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/indexer/lookupApplicationLogs.js
var LookupApplicationLogs;
var init_lookupApplicationLogs = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/indexer/lookupApplicationLogs.js"() {
    init_jsonrequest();
    LookupApplicationLogs = class extends JSONRequest {
      /**
       * Returns log messages generated by the passed in application.
       *
       * #### Example
       * ```typescript
       * const appId = 60553466;
       * const appLogs = await indexerClient.lookupApplicationLogs(appId).do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2applicationsapplication-idlogs)
       * @param appID - The ID of the application which generated the logs.
       * @category GET
       */
      constructor(c, intDecoding, appID) {
        super(c, intDecoding);
        this.appID = appID;
        this.appID = appID;
      }
      /**
       * @returns `/v2/applications/${appID}/logs`
       */
      path() {
        return `/v2/applications/${this.appID}/logs`;
      }
      /**
       * Limit results for pagination.
       *
       * #### Example
       * ```typescript
       * const maxResults = 20;
       * const appLogs = await indexerClient
       *        .lookupApplicationLogs(appId)
       *        .limit(maxResults)
       *        .do();
       * ```
       *
       * @param limit - maximum number of results to return.
       */
      limit(limit) {
        this.query.limit = limit;
        return this;
      }
      /**
       * Include results at or after the specified min-round.
       *
       * #### Example
       * ```typescript
       * const minRound = 18309917;
       * const appLogs = await indexerClient
       *        .lookupApplicationLogs(appId)
       *        .minRound(minRound)
       *        .do();
       * ```
       *
       * @param round
       * @category query
       */
      minRound(round) {
        this.query["min-round"] = round;
        return this;
      }
      /**
       * Include results at or before the specified max-round.
       *
       * #### Example
       * ```typescript
       * const maxRound = 18309917;
       * const appLogs = await indexerClient
       *        .lookupApplicationLogs(appId)
       *        .maxRound(maxRound)
       *        .do();
       * ```
       *
       * @param round
       * @category query
       */
      maxRound(round) {
        this.query["max-round"] = round;
        return this;
      }
      /**
       * The next page of results.
       *
       * #### Example
       * ```typescript
       * const maxResults = 25;
       *
       * const appLogsPage1 = await indexerClient
       *        .lookupApplicationLogs(appId)
       *        .limit(maxResults)
       *        .do();
       *
       * const appLogsPage2 = await indexerClient
       *        .lookupApplicationLogs(appId)
       *        .limit(maxResults)
       *        .nextToken(appLogsPage1["next-token"])
       *        .do();
       * ```
       *
       * @param nextToken - provided by the previous results.
       * @category query
       */
      nextToken(nextToken) {
        this.query.next = nextToken;
        return this;
      }
      /**
       * Only include transactions with this sender address.
       *
       * #### Example
       * ```typescript
       * const sender = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const appLogs = await indexerClient
       *        .lookupApplicationLogs(appId)
       *        .sender(sender)
       *        .do();
       * ```
       *
       * @param senderAddress
       * @category query
       */
      sender(senderAddress) {
        this.query["sender-address"] = senderAddress;
        return this;
      }
      /**
       * Lookup the specific transaction by ID.
       *
       * #### Example
       * ```typescript
       * const txId = "MEUOC4RQJB23CQZRFRKYEI6WBO73VTTPST5A7B3S5OKBUY6LFUDA";
       * const appLogs = await indexerClient
       *        .lookupApplicationLogs(appId)
       *        .txid(txId)
       *        .do();
       * ```
       *
       * @param txid
       * @category query
       */
      txid(txid) {
        this.query.txid = txid;
        return this;
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/indexer/models/types.js
var types_exports2 = {};
__export(types_exports2, {
  Account: () => Account2,
  AccountParticipation: () => AccountParticipation2,
  AccountResponse: () => AccountResponse,
  AccountStateDelta: () => AccountStateDelta2,
  AccountsResponse: () => AccountsResponse,
  Application: () => Application2,
  ApplicationLocalState: () => ApplicationLocalState2,
  ApplicationLocalStatesResponse: () => ApplicationLocalStatesResponse,
  ApplicationLogData: () => ApplicationLogData,
  ApplicationLogsResponse: () => ApplicationLogsResponse,
  ApplicationParams: () => ApplicationParams2,
  ApplicationResponse: () => ApplicationResponse,
  ApplicationStateSchema: () => ApplicationStateSchema2,
  ApplicationsResponse: () => ApplicationsResponse,
  Asset: () => Asset2,
  AssetBalancesResponse: () => AssetBalancesResponse,
  AssetHolding: () => AssetHolding2,
  AssetHoldingsResponse: () => AssetHoldingsResponse,
  AssetParams: () => AssetParams2,
  AssetResponse: () => AssetResponse,
  AssetsResponse: () => AssetsResponse,
  Block: () => Block2,
  BlockRewards: () => BlockRewards,
  BlockUpgradeState: () => BlockUpgradeState,
  BlockUpgradeVote: () => BlockUpgradeVote,
  Box: () => Box2,
  BoxDescriptor: () => BoxDescriptor2,
  BoxesResponse: () => BoxesResponse2,
  ErrorResponse: () => ErrorResponse2,
  EvalDelta: () => EvalDelta2,
  EvalDeltaKeyValue: () => EvalDeltaKeyValue2,
  HashFactory: () => HashFactory,
  HealthCheck: () => HealthCheck2,
  IndexerStateProofMessage: () => IndexerStateProofMessage,
  MerkleArrayProof: () => MerkleArrayProof,
  MiniAssetHolding: () => MiniAssetHolding,
  ParticipationUpdates: () => ParticipationUpdates,
  StateProofFields: () => StateProofFields,
  StateProofParticipant: () => StateProofParticipant,
  StateProofReveal: () => StateProofReveal,
  StateProofSigSlot: () => StateProofSigSlot,
  StateProofSignature: () => StateProofSignature,
  StateProofTracking: () => StateProofTracking,
  StateProofVerifier: () => StateProofVerifier,
  StateSchema: () => StateSchema,
  TealKeyValue: () => TealKeyValue2,
  TealValue: () => TealValue2,
  Transaction: () => Transaction2,
  TransactionApplication: () => TransactionApplication,
  TransactionAssetConfig: () => TransactionAssetConfig,
  TransactionAssetFreeze: () => TransactionAssetFreeze,
  TransactionAssetTransfer: () => TransactionAssetTransfer,
  TransactionKeyreg: () => TransactionKeyreg,
  TransactionPayment: () => TransactionPayment,
  TransactionResponse: () => TransactionResponse,
  TransactionSignature: () => TransactionSignature,
  TransactionSignatureLogicsig: () => TransactionSignatureLogicsig,
  TransactionSignatureMultisig: () => TransactionSignatureMultisig,
  TransactionSignatureMultisigSubsignature: () => TransactionSignatureMultisigSubsignature,
  TransactionStateProof: () => TransactionStateProof,
  TransactionsResponse: () => TransactionsResponse
});
var Account2, AccountParticipation2, AccountResponse, AccountStateDelta2, AccountsResponse, Application2, ApplicationLocalState2, ApplicationLocalStatesResponse, ApplicationLogData, ApplicationLogsResponse, ApplicationParams2, ApplicationResponse, ApplicationStateSchema2, ApplicationsResponse, Asset2, AssetBalancesResponse, AssetHolding2, AssetHoldingsResponse, AssetParams2, AssetResponse, AssetsResponse, Block2, BlockRewards, BlockUpgradeState, BlockUpgradeVote, Box2, BoxDescriptor2, BoxesResponse2, ErrorResponse2, EvalDelta2, EvalDeltaKeyValue2, HashFactory, HealthCheck2, IndexerStateProofMessage, MerkleArrayProof, MiniAssetHolding, ParticipationUpdates, StateProofFields, StateProofParticipant, StateProofReveal, StateProofSigSlot, StateProofSignature, StateProofTracking, StateProofVerifier, StateSchema, TealKeyValue2, TealValue2, Transaction2, TransactionApplication, TransactionAssetConfig, TransactionAssetFreeze, TransactionAssetTransfer, TransactionKeyreg, TransactionPayment, TransactionResponse, TransactionSignature, TransactionSignatureLogicsig, TransactionSignatureMultisig, TransactionSignatureMultisigSubsignature, TransactionStateProof, TransactionsResponse;
var init_types2 = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/indexer/models/types.js"() {
    init_buffer();
    init_basemodel();
    Account2 = class extends BaseModel {
      /**
       * Creates a new `Account` object.
       * @param address - the account public key
       * @param amount - (algo) total number of MicroAlgos in the account
       * @param amountWithoutPendingRewards - specifies the amount of MicroAlgos in the account, without the pending rewards.
       * @param pendingRewards - amount of MicroAlgos of pending rewards in this account.
       * @param rewards - (ern) total rewards of MicroAlgos the account has received, including pending
       * rewards.
       * @param round - The round for which this information is relevant.
       * @param status - (onl) delegation status of the account's MicroAlgos
       * * Offline - indicates that the associated account is delegated.
       * * Online - indicates that the associated account used as part of the delegation
       * pool.
       * * NotParticipating - indicates that the associated account is neither a
       * delegator nor a delegate.
       * @param totalAppsOptedIn - The count of all applications that have been opted in, equivalent to the count
       * of application local data (AppLocalState objects) stored in this account.
       * @param totalAssetsOptedIn - The count of all assets that have been opted in, equivalent to the count of
       * AssetHolding objects held by this account.
       * @param totalBoxBytes - For app-accounts only. The total number of bytes allocated for the keys and
       * values of boxes which belong to the associated application.
       * @param totalBoxes - For app-accounts only. The total number of boxes which belong to the associated
       * application.
       * @param totalCreatedApps - The count of all apps (AppParams objects) created by this account.
       * @param totalCreatedAssets - The count of all assets (AssetParams objects) created by this account.
       * @param appsLocalState - (appl) applications local data stored in this account.
       * Note the raw object uses `map[int] -> AppLocalState` for this type.
       * @param appsTotalExtraPages - (teap) the sum of all extra application program pages for this account.
       * @param appsTotalSchema - (tsch) stores the sum of all of the local schemas and global schemas in this
       * account.
       * Note: the raw account uses `StateSchema` for this type.
       * @param assets - (asset) assets held by this account.
       * Note the raw object uses `map[int] -> AssetHolding` for this type.
       * @param authAddr - (spend) the address against which signing should be checked. If empty, the
       * address of the current account is used. This field can be updated in any
       * transaction by setting the RekeyTo field.
       * @param closedAtRound - Round during which this account was most recently closed.
       * @param createdApps - (appp) parameters of applications created by this account including app global
       * data.
       * Note: the raw account uses `map[int] -> AppParams` for this type.
       * @param createdAssets - (apar) parameters of assets created by this account.
       * Note: the raw account uses `map[int] -> Asset` for this type.
       * @param createdAtRound - Round during which this account first appeared in a transaction.
       * @param deleted - Whether or not this account is currently closed.
       * @param participation - AccountParticipation describes the parameters used by this account in consensus
       * protocol.
       * @param rewardBase - (ebase) used as part of the rewards computation. Only applicable to accounts
       * which are participating.
       * @param sigType - Indicates what type of signature is used by this account, must be one of:
       * * sig
       * * msig
       * * lsig
       * * or null if unknown
       */
      constructor({ address, amount, amountWithoutPendingRewards, pendingRewards, rewards, round, status, totalAppsOptedIn, totalAssetsOptedIn, totalBoxBytes, totalBoxes, totalCreatedApps, totalCreatedAssets, appsLocalState, appsTotalExtraPages, appsTotalSchema, assets, authAddr, closedAtRound, createdApps, createdAssets, createdAtRound, deleted, participation, rewardBase, sigType }) {
        super();
        this.address = address;
        this.amount = amount;
        this.amountWithoutPendingRewards = amountWithoutPendingRewards;
        this.pendingRewards = pendingRewards;
        this.rewards = rewards;
        this.round = round;
        this.status = status;
        this.totalAppsOptedIn = totalAppsOptedIn;
        this.totalAssetsOptedIn = totalAssetsOptedIn;
        this.totalBoxBytes = totalBoxBytes;
        this.totalBoxes = totalBoxes;
        this.totalCreatedApps = totalCreatedApps;
        this.totalCreatedAssets = totalCreatedAssets;
        this.appsLocalState = appsLocalState;
        this.appsTotalExtraPages = appsTotalExtraPages;
        this.appsTotalSchema = appsTotalSchema;
        this.assets = assets;
        this.authAddr = authAddr;
        this.closedAtRound = closedAtRound;
        this.createdApps = createdApps;
        this.createdAssets = createdAssets;
        this.createdAtRound = createdAtRound;
        this.deleted = deleted;
        this.participation = participation;
        this.rewardBase = rewardBase;
        this.sigType = sigType;
        this.attribute_map = {
          address: "address",
          amount: "amount",
          amountWithoutPendingRewards: "amount-without-pending-rewards",
          pendingRewards: "pending-rewards",
          rewards: "rewards",
          round: "round",
          status: "status",
          totalAppsOptedIn: "total-apps-opted-in",
          totalAssetsOptedIn: "total-assets-opted-in",
          totalBoxBytes: "total-box-bytes",
          totalBoxes: "total-boxes",
          totalCreatedApps: "total-created-apps",
          totalCreatedAssets: "total-created-assets",
          appsLocalState: "apps-local-state",
          appsTotalExtraPages: "apps-total-extra-pages",
          appsTotalSchema: "apps-total-schema",
          assets: "assets",
          authAddr: "auth-addr",
          closedAtRound: "closed-at-round",
          createdApps: "created-apps",
          createdAssets: "created-assets",
          createdAtRound: "created-at-round",
          deleted: "deleted",
          participation: "participation",
          rewardBase: "reward-base",
          sigType: "sig-type"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["address"] === "undefined")
          throw new Error(`Response is missing required field 'address': ${data}`);
        if (typeof data["amount"] === "undefined")
          throw new Error(`Response is missing required field 'amount': ${data}`);
        if (typeof data["amount-without-pending-rewards"] === "undefined")
          throw new Error(`Response is missing required field 'amount-without-pending-rewards': ${data}`);
        if (typeof data["pending-rewards"] === "undefined")
          throw new Error(`Response is missing required field 'pending-rewards': ${data}`);
        if (typeof data["rewards"] === "undefined")
          throw new Error(`Response is missing required field 'rewards': ${data}`);
        if (typeof data["round"] === "undefined")
          throw new Error(`Response is missing required field 'round': ${data}`);
        if (typeof data["status"] === "undefined")
          throw new Error(`Response is missing required field 'status': ${data}`);
        if (typeof data["total-apps-opted-in"] === "undefined")
          throw new Error(`Response is missing required field 'total-apps-opted-in': ${data}`);
        if (typeof data["total-assets-opted-in"] === "undefined")
          throw new Error(`Response is missing required field 'total-assets-opted-in': ${data}`);
        if (typeof data["total-box-bytes"] === "undefined")
          throw new Error(`Response is missing required field 'total-box-bytes': ${data}`);
        if (typeof data["total-boxes"] === "undefined")
          throw new Error(`Response is missing required field 'total-boxes': ${data}`);
        if (typeof data["total-created-apps"] === "undefined")
          throw new Error(`Response is missing required field 'total-created-apps': ${data}`);
        if (typeof data["total-created-assets"] === "undefined")
          throw new Error(`Response is missing required field 'total-created-assets': ${data}`);
        return new Account2({
          address: data["address"],
          amount: data["amount"],
          amountWithoutPendingRewards: data["amount-without-pending-rewards"],
          pendingRewards: data["pending-rewards"],
          rewards: data["rewards"],
          round: data["round"],
          status: data["status"],
          totalAppsOptedIn: data["total-apps-opted-in"],
          totalAssetsOptedIn: data["total-assets-opted-in"],
          totalBoxBytes: data["total-box-bytes"],
          totalBoxes: data["total-boxes"],
          totalCreatedApps: data["total-created-apps"],
          totalCreatedAssets: data["total-created-assets"],
          appsLocalState: typeof data["apps-local-state"] !== "undefined" ? data["apps-local-state"].map(ApplicationLocalState2.from_obj_for_encoding) : void 0,
          appsTotalExtraPages: data["apps-total-extra-pages"],
          appsTotalSchema: typeof data["apps-total-schema"] !== "undefined" ? ApplicationStateSchema2.from_obj_for_encoding(data["apps-total-schema"]) : void 0,
          assets: typeof data["assets"] !== "undefined" ? data["assets"].map(AssetHolding2.from_obj_for_encoding) : void 0,
          authAddr: data["auth-addr"],
          closedAtRound: data["closed-at-round"],
          createdApps: typeof data["created-apps"] !== "undefined" ? data["created-apps"].map(Application2.from_obj_for_encoding) : void 0,
          createdAssets: typeof data["created-assets"] !== "undefined" ? data["created-assets"].map(Asset2.from_obj_for_encoding) : void 0,
          createdAtRound: data["created-at-round"],
          deleted: data["deleted"],
          participation: typeof data["participation"] !== "undefined" ? AccountParticipation2.from_obj_for_encoding(data["participation"]) : void 0,
          rewardBase: data["reward-base"],
          sigType: data["sig-type"]
        });
      }
    };
    AccountParticipation2 = class extends BaseModel {
      /**
       * Creates a new `AccountParticipation` object.
       * @param selectionParticipationKey - (sel) Selection public key (if any) currently registered for this round.
       * @param voteFirstValid - (voteFst) First round for which this participation is valid.
       * @param voteKeyDilution - (voteKD) Number of subkeys in each batch of participation keys.
       * @param voteLastValid - (voteLst) Last round for which this participation is valid.
       * @param voteParticipationKey - (vote) root participation public key (if any) currently registered for this
       * round.
       * @param stateProofKey - (stprf) Root of the state proof key (if any)
       */
      constructor({ selectionParticipationKey, voteFirstValid, voteKeyDilution, voteLastValid, voteParticipationKey, stateProofKey }) {
        super();
        this.selectionParticipationKey = typeof selectionParticipationKey === "string" ? new Uint8Array(Buffer.from(selectionParticipationKey, "base64")) : selectionParticipationKey;
        this.voteFirstValid = voteFirstValid;
        this.voteKeyDilution = voteKeyDilution;
        this.voteLastValid = voteLastValid;
        this.voteParticipationKey = typeof voteParticipationKey === "string" ? new Uint8Array(Buffer.from(voteParticipationKey, "base64")) : voteParticipationKey;
        this.stateProofKey = typeof stateProofKey === "string" ? new Uint8Array(Buffer.from(stateProofKey, "base64")) : stateProofKey;
        this.attribute_map = {
          selectionParticipationKey: "selection-participation-key",
          voteFirstValid: "vote-first-valid",
          voteKeyDilution: "vote-key-dilution",
          voteLastValid: "vote-last-valid",
          voteParticipationKey: "vote-participation-key",
          stateProofKey: "state-proof-key"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["selection-participation-key"] === "undefined")
          throw new Error(`Response is missing required field 'selection-participation-key': ${data}`);
        if (typeof data["vote-first-valid"] === "undefined")
          throw new Error(`Response is missing required field 'vote-first-valid': ${data}`);
        if (typeof data["vote-key-dilution"] === "undefined")
          throw new Error(`Response is missing required field 'vote-key-dilution': ${data}`);
        if (typeof data["vote-last-valid"] === "undefined")
          throw new Error(`Response is missing required field 'vote-last-valid': ${data}`);
        if (typeof data["vote-participation-key"] === "undefined")
          throw new Error(`Response is missing required field 'vote-participation-key': ${data}`);
        return new AccountParticipation2({
          selectionParticipationKey: data["selection-participation-key"],
          voteFirstValid: data["vote-first-valid"],
          voteKeyDilution: data["vote-key-dilution"],
          voteLastValid: data["vote-last-valid"],
          voteParticipationKey: data["vote-participation-key"],
          stateProofKey: data["state-proof-key"]
        });
      }
    };
    AccountResponse = class extends BaseModel {
      /**
       * Creates a new `AccountResponse` object.
       * @param account - Account information at a given round.
       * Definition:
       * data/basics/userBalance.go : AccountData
       * @param currentRound - Round at which the results were computed.
       */
      constructor({ account, currentRound }) {
        super();
        this.account = account;
        this.currentRound = currentRound;
        this.attribute_map = {
          account: "account",
          currentRound: "current-round"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["account"] === "undefined")
          throw new Error(`Response is missing required field 'account': ${data}`);
        if (typeof data["current-round"] === "undefined")
          throw new Error(`Response is missing required field 'current-round': ${data}`);
        return new AccountResponse({
          account: Account2.from_obj_for_encoding(data["account"]),
          currentRound: data["current-round"]
        });
      }
    };
    AccountStateDelta2 = class extends BaseModel {
      /**
       * Creates a new `AccountStateDelta` object.
       * @param address -
       * @param delta - Application state delta.
       */
      constructor({ address, delta }) {
        super();
        this.address = address;
        this.delta = delta;
        this.attribute_map = {
          address: "address",
          delta: "delta"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["address"] === "undefined")
          throw new Error(`Response is missing required field 'address': ${data}`);
        if (!Array.isArray(data["delta"]))
          throw new Error(`Response is missing required array field 'delta': ${data}`);
        return new AccountStateDelta2({
          address: data["address"],
          delta: data["delta"].map(EvalDeltaKeyValue2.from_obj_for_encoding)
        });
      }
    };
    AccountsResponse = class extends BaseModel {
      /**
       * Creates a new `AccountsResponse` object.
       * @param accounts -
       * @param currentRound - Round at which the results were computed.
       * @param nextToken - Used for pagination, when making another request provide this token with the
       * next parameter.
       */
      constructor({ accounts, currentRound, nextToken }) {
        super();
        this.accounts = accounts;
        this.currentRound = currentRound;
        this.nextToken = nextToken;
        this.attribute_map = {
          accounts: "accounts",
          currentRound: "current-round",
          nextToken: "next-token"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (!Array.isArray(data["accounts"]))
          throw new Error(`Response is missing required array field 'accounts': ${data}`);
        if (typeof data["current-round"] === "undefined")
          throw new Error(`Response is missing required field 'current-round': ${data}`);
        return new AccountsResponse({
          accounts: data["accounts"].map(Account2.from_obj_for_encoding),
          currentRound: data["current-round"],
          nextToken: data["next-token"]
        });
      }
    };
    Application2 = class extends BaseModel {
      /**
       * Creates a new `Application` object.
       * @param id - (appidx) application index.
       * @param params - (appparams) application parameters.
       * @param createdAtRound - Round when this application was created.
       * @param deleted - Whether or not this application is currently deleted.
       * @param deletedAtRound - Round when this application was deleted.
       */
      constructor({ id, params, createdAtRound, deleted, deletedAtRound }) {
        super();
        this.id = id;
        this.params = params;
        this.createdAtRound = createdAtRound;
        this.deleted = deleted;
        this.deletedAtRound = deletedAtRound;
        this.attribute_map = {
          id: "id",
          params: "params",
          createdAtRound: "created-at-round",
          deleted: "deleted",
          deletedAtRound: "deleted-at-round"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["id"] === "undefined")
          throw new Error(`Response is missing required field 'id': ${data}`);
        if (typeof data["params"] === "undefined")
          throw new Error(`Response is missing required field 'params': ${data}`);
        return new Application2({
          id: data["id"],
          params: ApplicationParams2.from_obj_for_encoding(data["params"]),
          createdAtRound: data["created-at-round"],
          deleted: data["deleted"],
          deletedAtRound: data["deleted-at-round"]
        });
      }
    };
    ApplicationLocalState2 = class extends BaseModel {
      /**
       * Creates a new `ApplicationLocalState` object.
       * @param id - The application which this local state is for.
       * @param schema - (hsch) schema.
       * @param closedOutAtRound - Round when account closed out of the application.
       * @param deleted - Whether or not the application local state is currently deleted from its
       * account.
       * @param keyValue - (tkv) storage.
       * @param optedInAtRound - Round when the account opted into the application.
       */
      constructor({ id, schema, closedOutAtRound, deleted, keyValue, optedInAtRound }) {
        super();
        this.id = id;
        this.schema = schema;
        this.closedOutAtRound = closedOutAtRound;
        this.deleted = deleted;
        this.keyValue = keyValue;
        this.optedInAtRound = optedInAtRound;
        this.attribute_map = {
          id: "id",
          schema: "schema",
          closedOutAtRound: "closed-out-at-round",
          deleted: "deleted",
          keyValue: "key-value",
          optedInAtRound: "opted-in-at-round"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["id"] === "undefined")
          throw new Error(`Response is missing required field 'id': ${data}`);
        if (typeof data["schema"] === "undefined")
          throw new Error(`Response is missing required field 'schema': ${data}`);
        return new ApplicationLocalState2({
          id: data["id"],
          schema: ApplicationStateSchema2.from_obj_for_encoding(data["schema"]),
          closedOutAtRound: data["closed-out-at-round"],
          deleted: data["deleted"],
          keyValue: typeof data["key-value"] !== "undefined" ? data["key-value"].map(TealKeyValue2.from_obj_for_encoding) : void 0,
          optedInAtRound: data["opted-in-at-round"]
        });
      }
    };
    ApplicationLocalStatesResponse = class extends BaseModel {
      /**
       * Creates a new `ApplicationLocalStatesResponse` object.
       * @param appsLocalStates -
       * @param currentRound - Round at which the results were computed.
       * @param nextToken - Used for pagination, when making another request provide this token with the
       * next parameter.
       */
      constructor({ appsLocalStates, currentRound, nextToken }) {
        super();
        this.appsLocalStates = appsLocalStates;
        this.currentRound = currentRound;
        this.nextToken = nextToken;
        this.attribute_map = {
          appsLocalStates: "apps-local-states",
          currentRound: "current-round",
          nextToken: "next-token"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (!Array.isArray(data["apps-local-states"]))
          throw new Error(`Response is missing required array field 'apps-local-states': ${data}`);
        if (typeof data["current-round"] === "undefined")
          throw new Error(`Response is missing required field 'current-round': ${data}`);
        return new ApplicationLocalStatesResponse({
          appsLocalStates: data["apps-local-states"].map(ApplicationLocalState2.from_obj_for_encoding),
          currentRound: data["current-round"],
          nextToken: data["next-token"]
        });
      }
    };
    ApplicationLogData = class extends BaseModel {
      /**
       * Creates a new `ApplicationLogData` object.
       * @param logs - (lg) Logs for the application being executed by the transaction.
       * @param txid - Transaction ID
       */
      constructor({ logs, txid }) {
        super();
        this.logs = logs;
        this.txid = txid;
        this.attribute_map = {
          logs: "logs",
          txid: "txid"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (!Array.isArray(data["logs"]))
          throw new Error(`Response is missing required array field 'logs': ${data}`);
        if (typeof data["txid"] === "undefined")
          throw new Error(`Response is missing required field 'txid': ${data}`);
        return new ApplicationLogData({
          logs: data["logs"],
          txid: data["txid"]
        });
      }
    };
    ApplicationLogsResponse = class extends BaseModel {
      /**
       * Creates a new `ApplicationLogsResponse` object.
       * @param applicationId - (appidx) application index.
       * @param currentRound - Round at which the results were computed.
       * @param logData -
       * @param nextToken - Used for pagination, when making another request provide this token with the
       * next parameter.
       */
      constructor({ applicationId, currentRound, logData, nextToken }) {
        super();
        this.applicationId = applicationId;
        this.currentRound = currentRound;
        this.logData = logData;
        this.nextToken = nextToken;
        this.attribute_map = {
          applicationId: "application-id",
          currentRound: "current-round",
          logData: "log-data",
          nextToken: "next-token"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["application-id"] === "undefined")
          throw new Error(`Response is missing required field 'application-id': ${data}`);
        if (typeof data["current-round"] === "undefined")
          throw new Error(`Response is missing required field 'current-round': ${data}`);
        return new ApplicationLogsResponse({
          applicationId: data["application-id"],
          currentRound: data["current-round"],
          logData: typeof data["log-data"] !== "undefined" ? data["log-data"].map(ApplicationLogData.from_obj_for_encoding) : void 0,
          nextToken: data["next-token"]
        });
      }
    };
    ApplicationParams2 = class extends BaseModel {
      /**
       * Creates a new `ApplicationParams` object.
       * @param approvalProgram - (approv) approval program.
       * @param clearStateProgram - (clearp) approval program.
       * @param creator - The address that created this application. This is the address where the
       * parameters and global state for this application can be found.
       * @param extraProgramPages - (epp) the amount of extra program pages available to this app.
       * @param globalState - [\gs) global schema
       * @param globalStateSchema - [\gsch) global schema
       * @param localStateSchema - [\lsch) local schema
       */
      constructor({ approvalProgram, clearStateProgram, creator, extraProgramPages, globalState, globalStateSchema, localStateSchema }) {
        super();
        this.approvalProgram = typeof approvalProgram === "string" ? new Uint8Array(Buffer.from(approvalProgram, "base64")) : approvalProgram;
        this.clearStateProgram = typeof clearStateProgram === "string" ? new Uint8Array(Buffer.from(clearStateProgram, "base64")) : clearStateProgram;
        this.creator = creator;
        this.extraProgramPages = extraProgramPages;
        this.globalState = globalState;
        this.globalStateSchema = globalStateSchema;
        this.localStateSchema = localStateSchema;
        this.attribute_map = {
          approvalProgram: "approval-program",
          clearStateProgram: "clear-state-program",
          creator: "creator",
          extraProgramPages: "extra-program-pages",
          globalState: "global-state",
          globalStateSchema: "global-state-schema",
          localStateSchema: "local-state-schema"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["approval-program"] === "undefined")
          throw new Error(`Response is missing required field 'approval-program': ${data}`);
        if (typeof data["clear-state-program"] === "undefined")
          throw new Error(`Response is missing required field 'clear-state-program': ${data}`);
        return new ApplicationParams2({
          approvalProgram: data["approval-program"],
          clearStateProgram: data["clear-state-program"],
          creator: data["creator"],
          extraProgramPages: data["extra-program-pages"],
          globalState: typeof data["global-state"] !== "undefined" ? data["global-state"].map(TealKeyValue2.from_obj_for_encoding) : void 0,
          globalStateSchema: typeof data["global-state-schema"] !== "undefined" ? ApplicationStateSchema2.from_obj_for_encoding(data["global-state-schema"]) : void 0,
          localStateSchema: typeof data["local-state-schema"] !== "undefined" ? ApplicationStateSchema2.from_obj_for_encoding(data["local-state-schema"]) : void 0
        });
      }
    };
    ApplicationResponse = class extends BaseModel {
      /**
       * Creates a new `ApplicationResponse` object.
       * @param currentRound - Round at which the results were computed.
       * @param application - Application index and its parameters
       */
      constructor({ currentRound, application }) {
        super();
        this.currentRound = currentRound;
        this.application = application;
        this.attribute_map = {
          currentRound: "current-round",
          application: "application"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["current-round"] === "undefined")
          throw new Error(`Response is missing required field 'current-round': ${data}`);
        return new ApplicationResponse({
          currentRound: data["current-round"],
          application: typeof data["application"] !== "undefined" ? Application2.from_obj_for_encoding(data["application"]) : void 0
        });
      }
    };
    ApplicationStateSchema2 = class extends BaseModel {
      /**
       * Creates a new `ApplicationStateSchema` object.
       * @param numByteSlice - (nbs) num of byte slices.
       * @param numUint - (nui) num of uints.
       */
      constructor({ numByteSlice, numUint }) {
        super();
        this.numByteSlice = numByteSlice;
        this.numUint = numUint;
        this.attribute_map = {
          numByteSlice: "num-byte-slice",
          numUint: "num-uint"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["num-byte-slice"] === "undefined")
          throw new Error(`Response is missing required field 'num-byte-slice': ${data}`);
        if (typeof data["num-uint"] === "undefined")
          throw new Error(`Response is missing required field 'num-uint': ${data}`);
        return new ApplicationStateSchema2({
          numByteSlice: data["num-byte-slice"],
          numUint: data["num-uint"]
        });
      }
    };
    ApplicationsResponse = class extends BaseModel {
      /**
       * Creates a new `ApplicationsResponse` object.
       * @param applications -
       * @param currentRound - Round at which the results were computed.
       * @param nextToken - Used for pagination, when making another request provide this token with the
       * next parameter.
       */
      constructor({ applications, currentRound, nextToken }) {
        super();
        this.applications = applications;
        this.currentRound = currentRound;
        this.nextToken = nextToken;
        this.attribute_map = {
          applications: "applications",
          currentRound: "current-round",
          nextToken: "next-token"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (!Array.isArray(data["applications"]))
          throw new Error(`Response is missing required array field 'applications': ${data}`);
        if (typeof data["current-round"] === "undefined")
          throw new Error(`Response is missing required field 'current-round': ${data}`);
        return new ApplicationsResponse({
          applications: data["applications"].map(Application2.from_obj_for_encoding),
          currentRound: data["current-round"],
          nextToken: data["next-token"]
        });
      }
    };
    Asset2 = class extends BaseModel {
      /**
       * Creates a new `Asset` object.
       * @param index - unique asset identifier
       * @param params - AssetParams specifies the parameters for an asset.
       * (apar) when part of an AssetConfig transaction.
       * Definition:
       * data/transactions/asset.go : AssetParams
       * @param createdAtRound - Round during which this asset was created.
       * @param deleted - Whether or not this asset is currently deleted.
       * @param destroyedAtRound - Round during which this asset was destroyed.
       */
      constructor({ index, params, createdAtRound, deleted, destroyedAtRound }) {
        super();
        this.index = index;
        this.params = params;
        this.createdAtRound = createdAtRound;
        this.deleted = deleted;
        this.destroyedAtRound = destroyedAtRound;
        this.attribute_map = {
          index: "index",
          params: "params",
          createdAtRound: "created-at-round",
          deleted: "deleted",
          destroyedAtRound: "destroyed-at-round"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["index"] === "undefined")
          throw new Error(`Response is missing required field 'index': ${data}`);
        if (typeof data["params"] === "undefined")
          throw new Error(`Response is missing required field 'params': ${data}`);
        return new Asset2({
          index: data["index"],
          params: AssetParams2.from_obj_for_encoding(data["params"]),
          createdAtRound: data["created-at-round"],
          deleted: data["deleted"],
          destroyedAtRound: data["destroyed-at-round"]
        });
      }
    };
    AssetBalancesResponse = class extends BaseModel {
      /**
       * Creates a new `AssetBalancesResponse` object.
       * @param balances -
       * @param currentRound - Round at which the results were computed.
       * @param nextToken - Used for pagination, when making another request provide this token with the
       * next parameter.
       */
      constructor({ balances, currentRound, nextToken }) {
        super();
        this.balances = balances;
        this.currentRound = currentRound;
        this.nextToken = nextToken;
        this.attribute_map = {
          balances: "balances",
          currentRound: "current-round",
          nextToken: "next-token"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (!Array.isArray(data["balances"]))
          throw new Error(`Response is missing required array field 'balances': ${data}`);
        if (typeof data["current-round"] === "undefined")
          throw new Error(`Response is missing required field 'current-round': ${data}`);
        return new AssetBalancesResponse({
          balances: data["balances"].map(MiniAssetHolding.from_obj_for_encoding),
          currentRound: data["current-round"],
          nextToken: data["next-token"]
        });
      }
    };
    AssetHolding2 = class extends BaseModel {
      /**
       * Creates a new `AssetHolding` object.
       * @param amount - (a) number of units held.
       * @param assetId - Asset ID of the holding.
       * @param isFrozen - (f) whether or not the holding is frozen.
       * @param deleted - Whether or not the asset holding is currently deleted from its account.
       * @param optedInAtRound - Round during which the account opted into this asset holding.
       * @param optedOutAtRound - Round during which the account opted out of this asset holding.
       */
      constructor({ amount, assetId, isFrozen, deleted, optedInAtRound, optedOutAtRound }) {
        super();
        this.amount = amount;
        this.assetId = assetId;
        this.isFrozen = isFrozen;
        this.deleted = deleted;
        this.optedInAtRound = optedInAtRound;
        this.optedOutAtRound = optedOutAtRound;
        this.attribute_map = {
          amount: "amount",
          assetId: "asset-id",
          isFrozen: "is-frozen",
          deleted: "deleted",
          optedInAtRound: "opted-in-at-round",
          optedOutAtRound: "opted-out-at-round"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["amount"] === "undefined")
          throw new Error(`Response is missing required field 'amount': ${data}`);
        if (typeof data["asset-id"] === "undefined")
          throw new Error(`Response is missing required field 'asset-id': ${data}`);
        if (typeof data["is-frozen"] === "undefined")
          throw new Error(`Response is missing required field 'is-frozen': ${data}`);
        return new AssetHolding2({
          amount: data["amount"],
          assetId: data["asset-id"],
          isFrozen: data["is-frozen"],
          deleted: data["deleted"],
          optedInAtRound: data["opted-in-at-round"],
          optedOutAtRound: data["opted-out-at-round"]
        });
      }
    };
    AssetHoldingsResponse = class extends BaseModel {
      /**
       * Creates a new `AssetHoldingsResponse` object.
       * @param assets -
       * @param currentRound - Round at which the results were computed.
       * @param nextToken - Used for pagination, when making another request provide this token with the
       * next parameter.
       */
      constructor({ assets, currentRound, nextToken }) {
        super();
        this.assets = assets;
        this.currentRound = currentRound;
        this.nextToken = nextToken;
        this.attribute_map = {
          assets: "assets",
          currentRound: "current-round",
          nextToken: "next-token"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (!Array.isArray(data["assets"]))
          throw new Error(`Response is missing required array field 'assets': ${data}`);
        if (typeof data["current-round"] === "undefined")
          throw new Error(`Response is missing required field 'current-round': ${data}`);
        return new AssetHoldingsResponse({
          assets: data["assets"].map(AssetHolding2.from_obj_for_encoding),
          currentRound: data["current-round"],
          nextToken: data["next-token"]
        });
      }
    };
    AssetParams2 = class extends BaseModel {
      /**
       * Creates a new `AssetParams` object.
       * @param creator - The address that created this asset. This is the address where the parameters
       * for this asset can be found, and also the address where unwanted asset units can
       * be sent in the worst case.
       * @param decimals - (dc) The number of digits to use after the decimal point when displaying this
       * asset. If 0, the asset is not divisible. If 1, the base unit of the asset is in
       * tenths. If 2, the base unit of the asset is in hundredths, and so on. This value
       * must be between 0 and 19 (inclusive).
       * @param total - (t) The total number of units of this asset.
       * @param clawback - (c) Address of account used to clawback holdings of this asset. If empty,
       * clawback is not permitted.
       * @param defaultFrozen - (df) Whether holdings of this asset are frozen by default.
       * @param freeze - (f) Address of account used to freeze holdings of this asset. If empty, freezing
       * is not permitted.
       * @param manager - (m) Address of account used to manage the keys of this asset and to destroy it.
       * @param metadataHash - (am) A commitment to some unspecified asset metadata. The format of this
       * metadata is up to the application.
       * @param name - (an) Name of this asset, as supplied by the creator. Included only when the
       * asset name is composed of printable utf-8 characters.
       * @param nameB64 - Base64 encoded name of this asset, as supplied by the creator.
       * @param reserve - (r) Address of account holding reserve (non-minted) units of this asset.
       * @param unitName - (un) Name of a unit of this asset, as supplied by the creator. Included only
       * when the name of a unit of this asset is composed of printable utf-8 characters.
       * @param unitNameB64 - Base64 encoded name of a unit of this asset, as supplied by the creator.
       * @param url - (au) URL where more information about the asset can be retrieved. Included only
       * when the URL is composed of printable utf-8 characters.
       * @param urlB64 - Base64 encoded URL where more information about the asset can be retrieved.
       */
      constructor({ creator, decimals, total, clawback, defaultFrozen, freeze, manager, metadataHash, name, nameB64, reserve, unitName, unitNameB64, url, urlB64 }) {
        super();
        this.creator = creator;
        this.decimals = decimals;
        this.total = total;
        this.clawback = clawback;
        this.defaultFrozen = defaultFrozen;
        this.freeze = freeze;
        this.manager = manager;
        this.metadataHash = typeof metadataHash === "string" ? new Uint8Array(Buffer.from(metadataHash, "base64")) : metadataHash;
        this.name = name;
        this.nameB64 = typeof nameB64 === "string" ? new Uint8Array(Buffer.from(nameB64, "base64")) : nameB64;
        this.reserve = reserve;
        this.unitName = unitName;
        this.unitNameB64 = typeof unitNameB64 === "string" ? new Uint8Array(Buffer.from(unitNameB64, "base64")) : unitNameB64;
        this.url = url;
        this.urlB64 = typeof urlB64 === "string" ? new Uint8Array(Buffer.from(urlB64, "base64")) : urlB64;
        this.attribute_map = {
          creator: "creator",
          decimals: "decimals",
          total: "total",
          clawback: "clawback",
          defaultFrozen: "default-frozen",
          freeze: "freeze",
          manager: "manager",
          metadataHash: "metadata-hash",
          name: "name",
          nameB64: "name-b64",
          reserve: "reserve",
          unitName: "unit-name",
          unitNameB64: "unit-name-b64",
          url: "url",
          urlB64: "url-b64"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["creator"] === "undefined")
          throw new Error(`Response is missing required field 'creator': ${data}`);
        if (typeof data["decimals"] === "undefined")
          throw new Error(`Response is missing required field 'decimals': ${data}`);
        if (typeof data["total"] === "undefined")
          throw new Error(`Response is missing required field 'total': ${data}`);
        return new AssetParams2({
          creator: data["creator"],
          decimals: data["decimals"],
          total: data["total"],
          clawback: data["clawback"],
          defaultFrozen: data["default-frozen"],
          freeze: data["freeze"],
          manager: data["manager"],
          metadataHash: data["metadata-hash"],
          name: data["name"],
          nameB64: data["name-b64"],
          reserve: data["reserve"],
          unitName: data["unit-name"],
          unitNameB64: data["unit-name-b64"],
          url: data["url"],
          urlB64: data["url-b64"]
        });
      }
    };
    AssetResponse = class extends BaseModel {
      /**
       * Creates a new `AssetResponse` object.
       * @param asset - Specifies both the unique identifier and the parameters for an asset
       * @param currentRound - Round at which the results were computed.
       */
      constructor({ asset, currentRound }) {
        super();
        this.asset = asset;
        this.currentRound = currentRound;
        this.attribute_map = {
          asset: "asset",
          currentRound: "current-round"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["asset"] === "undefined")
          throw new Error(`Response is missing required field 'asset': ${data}`);
        if (typeof data["current-round"] === "undefined")
          throw new Error(`Response is missing required field 'current-round': ${data}`);
        return new AssetResponse({
          asset: Asset2.from_obj_for_encoding(data["asset"]),
          currentRound: data["current-round"]
        });
      }
    };
    AssetsResponse = class extends BaseModel {
      /**
       * Creates a new `AssetsResponse` object.
       * @param assets -
       * @param currentRound - Round at which the results were computed.
       * @param nextToken - Used for pagination, when making another request provide this token with the
       * next parameter.
       */
      constructor({ assets, currentRound, nextToken }) {
        super();
        this.assets = assets;
        this.currentRound = currentRound;
        this.nextToken = nextToken;
        this.attribute_map = {
          assets: "assets",
          currentRound: "current-round",
          nextToken: "next-token"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (!Array.isArray(data["assets"]))
          throw new Error(`Response is missing required array field 'assets': ${data}`);
        if (typeof data["current-round"] === "undefined")
          throw new Error(`Response is missing required field 'current-round': ${data}`);
        return new AssetsResponse({
          assets: data["assets"].map(Asset2.from_obj_for_encoding),
          currentRound: data["current-round"],
          nextToken: data["next-token"]
        });
      }
    };
    Block2 = class extends BaseModel {
      /**
       * Creates a new `Block` object.
       * @param genesisHash - (gh) hash to which this block belongs.
       * @param genesisId - (gen) ID to which this block belongs.
       * @param previousBlockHash - (prev) Previous block hash.
       * @param round - (rnd) Current round on which this block was appended to the chain.
       * @param seed - (seed) Sortition seed.
       * @param timestamp - (ts) Block creation timestamp in seconds since eposh
       * @param transactionsRoot - (txn) TransactionsRoot authenticates the set of transactions appearing in the
       * block. More specifically, it's the root of a merkle tree whose leaves are the
       * block's Txids, in lexicographic order. For the empty block, it's 0. Note that
       * the TxnRoot does not authenticate the signatures on the transactions, only the
       * transactions themselves. Two blocks with the same transactions but in a
       * different order and with different signatures will have the same TxnRoot.
       * @param transactionsRootSha256 - (txn256) TransactionsRootSHA256 is an auxiliary TransactionRoot, built using a
       * vector commitment instead of a merkle tree, and SHA256 hash function instead of
       * the default SHA512_256. This commitment can be used on environments where only
       * the SHA256 function exists.
       * @param participationUpdates - Participation account data that needs to be checked/acted on by the network.
       * @param rewards - Fields relating to rewards,
       * @param stateProofTracking - Tracks the status of state proofs.
       * @param transactions - (txns) list of transactions corresponding to a given round.
       * @param txnCounter - (tc) TxnCounter counts the number of transactions committed in the ledger, from
       * the time at which support for this feature was introduced.
       * Specifically, TxnCounter is the number of the next transaction that will be
       * committed after this block. It is 0 when no transactions have ever been
       * committed (since TxnCounter started being supported).
       * @param upgradeState - Fields relating to a protocol upgrade.
       * @param upgradeVote - Fields relating to voting for a protocol upgrade.
       */
      constructor({ genesisHash, genesisId, previousBlockHash, round, seed, timestamp, transactionsRoot, transactionsRootSha256, participationUpdates, rewards, stateProofTracking, transactions, txnCounter, upgradeState, upgradeVote }) {
        super();
        this.genesisHash = typeof genesisHash === "string" ? new Uint8Array(Buffer.from(genesisHash, "base64")) : genesisHash;
        this.genesisId = genesisId;
        this.previousBlockHash = typeof previousBlockHash === "string" ? new Uint8Array(Buffer.from(previousBlockHash, "base64")) : previousBlockHash;
        this.round = round;
        this.seed = typeof seed === "string" ? new Uint8Array(Buffer.from(seed, "base64")) : seed;
        this.timestamp = timestamp;
        this.transactionsRoot = typeof transactionsRoot === "string" ? new Uint8Array(Buffer.from(transactionsRoot, "base64")) : transactionsRoot;
        this.transactionsRootSha256 = typeof transactionsRootSha256 === "string" ? new Uint8Array(Buffer.from(transactionsRootSha256, "base64")) : transactionsRootSha256;
        this.participationUpdates = participationUpdates;
        this.rewards = rewards;
        this.stateProofTracking = stateProofTracking;
        this.transactions = transactions;
        this.txnCounter = txnCounter;
        this.upgradeState = upgradeState;
        this.upgradeVote = upgradeVote;
        this.attribute_map = {
          genesisHash: "genesis-hash",
          genesisId: "genesis-id",
          previousBlockHash: "previous-block-hash",
          round: "round",
          seed: "seed",
          timestamp: "timestamp",
          transactionsRoot: "transactions-root",
          transactionsRootSha256: "transactions-root-sha256",
          participationUpdates: "participation-updates",
          rewards: "rewards",
          stateProofTracking: "state-proof-tracking",
          transactions: "transactions",
          txnCounter: "txn-counter",
          upgradeState: "upgrade-state",
          upgradeVote: "upgrade-vote"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["genesis-hash"] === "undefined")
          throw new Error(`Response is missing required field 'genesis-hash': ${data}`);
        if (typeof data["genesis-id"] === "undefined")
          throw new Error(`Response is missing required field 'genesis-id': ${data}`);
        if (typeof data["previous-block-hash"] === "undefined")
          throw new Error(`Response is missing required field 'previous-block-hash': ${data}`);
        if (typeof data["round"] === "undefined")
          throw new Error(`Response is missing required field 'round': ${data}`);
        if (typeof data["seed"] === "undefined")
          throw new Error(`Response is missing required field 'seed': ${data}`);
        if (typeof data["timestamp"] === "undefined")
          throw new Error(`Response is missing required field 'timestamp': ${data}`);
        if (typeof data["transactions-root"] === "undefined")
          throw new Error(`Response is missing required field 'transactions-root': ${data}`);
        if (typeof data["transactions-root-sha256"] === "undefined")
          throw new Error(`Response is missing required field 'transactions-root-sha256': ${data}`);
        return new Block2({
          genesisHash: data["genesis-hash"],
          genesisId: data["genesis-id"],
          previousBlockHash: data["previous-block-hash"],
          round: data["round"],
          seed: data["seed"],
          timestamp: data["timestamp"],
          transactionsRoot: data["transactions-root"],
          transactionsRootSha256: data["transactions-root-sha256"],
          participationUpdates: typeof data["participation-updates"] !== "undefined" ? ParticipationUpdates.from_obj_for_encoding(data["participation-updates"]) : void 0,
          rewards: typeof data["rewards"] !== "undefined" ? BlockRewards.from_obj_for_encoding(data["rewards"]) : void 0,
          stateProofTracking: typeof data["state-proof-tracking"] !== "undefined" ? data["state-proof-tracking"].map(StateProofTracking.from_obj_for_encoding) : void 0,
          transactions: typeof data["transactions"] !== "undefined" ? data["transactions"].map(Transaction2.from_obj_for_encoding) : void 0,
          txnCounter: data["txn-counter"],
          upgradeState: typeof data["upgrade-state"] !== "undefined" ? BlockUpgradeState.from_obj_for_encoding(data["upgrade-state"]) : void 0,
          upgradeVote: typeof data["upgrade-vote"] !== "undefined" ? BlockUpgradeVote.from_obj_for_encoding(data["upgrade-vote"]) : void 0
        });
      }
    };
    BlockRewards = class extends BaseModel {
      /**
       * Creates a new `BlockRewards` object.
       * @param feeSink - (fees) accepts transaction fees, it can only spend to the incentive pool.
       * @param rewardsCalculationRound - (rwcalr) number of leftover MicroAlgos after the distribution of rewards-rate
       * MicroAlgos for every reward unit in the next round.
       * @param rewardsLevel - (earn) How many rewards, in MicroAlgos, have been distributed to each RewardUnit
       * of MicroAlgos since genesis.
       * @param rewardsPool - (rwd) accepts periodic injections from the fee-sink and continually
       * redistributes them as rewards.
       * @param rewardsRate - (rate) Number of new MicroAlgos added to the participation stake from rewards at
       * the next round.
       * @param rewardsResidue - (frac) Number of leftover MicroAlgos after the distribution of
       * RewardsRate/rewardUnits MicroAlgos for every reward unit in the next round.
       */
      constructor({ feeSink, rewardsCalculationRound, rewardsLevel, rewardsPool, rewardsRate, rewardsResidue }) {
        super();
        this.feeSink = feeSink;
        this.rewardsCalculationRound = rewardsCalculationRound;
        this.rewardsLevel = rewardsLevel;
        this.rewardsPool = rewardsPool;
        this.rewardsRate = rewardsRate;
        this.rewardsResidue = rewardsResidue;
        this.attribute_map = {
          feeSink: "fee-sink",
          rewardsCalculationRound: "rewards-calculation-round",
          rewardsLevel: "rewards-level",
          rewardsPool: "rewards-pool",
          rewardsRate: "rewards-rate",
          rewardsResidue: "rewards-residue"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["fee-sink"] === "undefined")
          throw new Error(`Response is missing required field 'fee-sink': ${data}`);
        if (typeof data["rewards-calculation-round"] === "undefined")
          throw new Error(`Response is missing required field 'rewards-calculation-round': ${data}`);
        if (typeof data["rewards-level"] === "undefined")
          throw new Error(`Response is missing required field 'rewards-level': ${data}`);
        if (typeof data["rewards-pool"] === "undefined")
          throw new Error(`Response is missing required field 'rewards-pool': ${data}`);
        if (typeof data["rewards-rate"] === "undefined")
          throw new Error(`Response is missing required field 'rewards-rate': ${data}`);
        if (typeof data["rewards-residue"] === "undefined")
          throw new Error(`Response is missing required field 'rewards-residue': ${data}`);
        return new BlockRewards({
          feeSink: data["fee-sink"],
          rewardsCalculationRound: data["rewards-calculation-round"],
          rewardsLevel: data["rewards-level"],
          rewardsPool: data["rewards-pool"],
          rewardsRate: data["rewards-rate"],
          rewardsResidue: data["rewards-residue"]
        });
      }
    };
    BlockUpgradeState = class extends BaseModel {
      /**
       * Creates a new `BlockUpgradeState` object.
       * @param currentProtocol - (proto) The current protocol version.
       * @param nextProtocol - (nextproto) The next proposed protocol version.
       * @param nextProtocolApprovals - (nextyes) Number of blocks which approved the protocol upgrade.
       * @param nextProtocolSwitchOn - (nextswitch) Round on which the protocol upgrade will take effect.
       * @param nextProtocolVoteBefore - (nextbefore) Deadline round for this protocol upgrade (No votes will be consider
       * after this round).
       */
      constructor({ currentProtocol, nextProtocol, nextProtocolApprovals, nextProtocolSwitchOn, nextProtocolVoteBefore }) {
        super();
        this.currentProtocol = currentProtocol;
        this.nextProtocol = nextProtocol;
        this.nextProtocolApprovals = nextProtocolApprovals;
        this.nextProtocolSwitchOn = nextProtocolSwitchOn;
        this.nextProtocolVoteBefore = nextProtocolVoteBefore;
        this.attribute_map = {
          currentProtocol: "current-protocol",
          nextProtocol: "next-protocol",
          nextProtocolApprovals: "next-protocol-approvals",
          nextProtocolSwitchOn: "next-protocol-switch-on",
          nextProtocolVoteBefore: "next-protocol-vote-before"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["current-protocol"] === "undefined")
          throw new Error(`Response is missing required field 'current-protocol': ${data}`);
        return new BlockUpgradeState({
          currentProtocol: data["current-protocol"],
          nextProtocol: data["next-protocol"],
          nextProtocolApprovals: data["next-protocol-approvals"],
          nextProtocolSwitchOn: data["next-protocol-switch-on"],
          nextProtocolVoteBefore: data["next-protocol-vote-before"]
        });
      }
    };
    BlockUpgradeVote = class extends BaseModel {
      /**
       * Creates a new `BlockUpgradeVote` object.
       * @param upgradeApprove - (upgradeyes) Indicates a yes vote for the current proposal.
       * @param upgradeDelay - (upgradedelay) Indicates the time between acceptance and execution.
       * @param upgradePropose - (upgradeprop) Indicates a proposed upgrade.
       */
      constructor({ upgradeApprove, upgradeDelay, upgradePropose }) {
        super();
        this.upgradeApprove = upgradeApprove;
        this.upgradeDelay = upgradeDelay;
        this.upgradePropose = upgradePropose;
        this.attribute_map = {
          upgradeApprove: "upgrade-approve",
          upgradeDelay: "upgrade-delay",
          upgradePropose: "upgrade-propose"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        return new BlockUpgradeVote({
          upgradeApprove: data["upgrade-approve"],
          upgradeDelay: data["upgrade-delay"],
          upgradePropose: data["upgrade-propose"]
        });
      }
    };
    Box2 = class extends BaseModel {
      /**
       * Creates a new `Box` object.
       * @param name - (name) box name, base64 encoded
       * @param value - (value) box value, base64 encoded.
       */
      constructor({ name, value }) {
        super();
        this.name = typeof name === "string" ? new Uint8Array(Buffer.from(name, "base64")) : name;
        this.value = typeof value === "string" ? new Uint8Array(Buffer.from(value, "base64")) : value;
        this.attribute_map = {
          name: "name",
          value: "value"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["name"] === "undefined")
          throw new Error(`Response is missing required field 'name': ${data}`);
        if (typeof data["value"] === "undefined")
          throw new Error(`Response is missing required field 'value': ${data}`);
        return new Box2({
          name: data["name"],
          value: data["value"]
        });
      }
    };
    BoxDescriptor2 = class extends BaseModel {
      /**
       * Creates a new `BoxDescriptor` object.
       * @param name - Base64 encoded box name
       */
      constructor({ name }) {
        super();
        this.name = typeof name === "string" ? new Uint8Array(Buffer.from(name, "base64")) : name;
        this.attribute_map = {
          name: "name"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["name"] === "undefined")
          throw new Error(`Response is missing required field 'name': ${data}`);
        return new BoxDescriptor2({
          name: data["name"]
        });
      }
    };
    BoxesResponse2 = class extends BaseModel {
      /**
       * Creates a new `BoxesResponse` object.
       * @param applicationId - (appidx) application index.
       * @param boxes -
       * @param nextToken - Used for pagination, when making another request provide this token with the
       * next parameter.
       */
      constructor({ applicationId, boxes, nextToken }) {
        super();
        this.applicationId = applicationId;
        this.boxes = boxes;
        this.nextToken = nextToken;
        this.attribute_map = {
          applicationId: "application-id",
          boxes: "boxes",
          nextToken: "next-token"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["application-id"] === "undefined")
          throw new Error(`Response is missing required field 'application-id': ${data}`);
        if (!Array.isArray(data["boxes"]))
          throw new Error(`Response is missing required array field 'boxes': ${data}`);
        return new BoxesResponse2({
          applicationId: data["application-id"],
          boxes: data["boxes"].map(BoxDescriptor2.from_obj_for_encoding),
          nextToken: data["next-token"]
        });
      }
    };
    ErrorResponse2 = class extends BaseModel {
      /**
       * Creates a new `ErrorResponse` object.
       * @param message -
       * @param data -
       */
      constructor({ message, data }) {
        super();
        this.message = message;
        this.data = data;
        this.attribute_map = {
          message: "message",
          data: "data"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["message"] === "undefined")
          throw new Error(`Response is missing required field 'message': ${data}`);
        return new ErrorResponse2({
          message: data["message"],
          data: data["data"]
        });
      }
    };
    EvalDelta2 = class extends BaseModel {
      /**
       * Creates a new `EvalDelta` object.
       * @param action - (at) delta action.
       * @param bytes - (bs) bytes value.
       * @param uint - (ui) uint value.
       */
      constructor({ action, bytes, uint }) {
        super();
        this.action = action;
        this.bytes = bytes;
        this.uint = uint;
        this.attribute_map = {
          action: "action",
          bytes: "bytes",
          uint: "uint"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["action"] === "undefined")
          throw new Error(`Response is missing required field 'action': ${data}`);
        return new EvalDelta2({
          action: data["action"],
          bytes: data["bytes"],
          uint: data["uint"]
        });
      }
    };
    EvalDeltaKeyValue2 = class extends BaseModel {
      /**
       * Creates a new `EvalDeltaKeyValue` object.
       * @param key -
       * @param value - Represents a TEAL value delta.
       */
      constructor({ key, value }) {
        super();
        this.key = key;
        this.value = value;
        this.attribute_map = {
          key: "key",
          value: "value"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["key"] === "undefined")
          throw new Error(`Response is missing required field 'key': ${data}`);
        if (typeof data["value"] === "undefined")
          throw new Error(`Response is missing required field 'value': ${data}`);
        return new EvalDeltaKeyValue2({
          key: data["key"],
          value: EvalDelta2.from_obj_for_encoding(data["value"])
        });
      }
    };
    HashFactory = class extends BaseModel {
      /**
       * Creates a new `HashFactory` object.
       * @param hashType - (t)
       */
      constructor({ hashType }) {
        super();
        this.hashType = hashType;
        this.attribute_map = {
          hashType: "hash-type"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        return new HashFactory({
          hashType: data["hash-type"]
        });
      }
    };
    HealthCheck2 = class extends BaseModel {
      /**
       * Creates a new `HealthCheck` object.
       * @param dbAvailable -
       * @param isMigrating -
       * @param message -
       * @param round -
       * @param version - Current version.
       * @param data -
       * @param errors -
       */
      constructor({ dbAvailable, isMigrating, message, round, version, data, errors }) {
        super();
        this.dbAvailable = dbAvailable;
        this.isMigrating = isMigrating;
        this.message = message;
        this.round = round;
        this.version = version;
        this.data = data;
        this.errors = errors;
        this.attribute_map = {
          dbAvailable: "db-available",
          isMigrating: "is-migrating",
          message: "message",
          round: "round",
          version: "version",
          data: "data",
          errors: "errors"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["db-available"] === "undefined")
          throw new Error(`Response is missing required field 'db-available': ${data}`);
        if (typeof data["is-migrating"] === "undefined")
          throw new Error(`Response is missing required field 'is-migrating': ${data}`);
        if (typeof data["message"] === "undefined")
          throw new Error(`Response is missing required field 'message': ${data}`);
        if (typeof data["round"] === "undefined")
          throw new Error(`Response is missing required field 'round': ${data}`);
        if (typeof data["version"] === "undefined")
          throw new Error(`Response is missing required field 'version': ${data}`);
        return new HealthCheck2({
          dbAvailable: data["db-available"],
          isMigrating: data["is-migrating"],
          message: data["message"],
          round: data["round"],
          version: data["version"],
          data: data["data"],
          errors: data["errors"]
        });
      }
    };
    IndexerStateProofMessage = class extends BaseModel {
      /**
       * Creates a new `IndexerStateProofMessage` object.
       * @param blockHeadersCommitment - (b)
       * @param firstAttestedRound - (f)
       * @param latestAttestedRound - (l)
       * @param lnProvenWeight - (P)
       * @param votersCommitment - (v)
       */
      constructor({ blockHeadersCommitment, firstAttestedRound, latestAttestedRound, lnProvenWeight, votersCommitment }) {
        super();
        this.blockHeadersCommitment = typeof blockHeadersCommitment === "string" ? new Uint8Array(Buffer.from(blockHeadersCommitment, "base64")) : blockHeadersCommitment;
        this.firstAttestedRound = firstAttestedRound;
        this.latestAttestedRound = latestAttestedRound;
        this.lnProvenWeight = lnProvenWeight;
        this.votersCommitment = typeof votersCommitment === "string" ? new Uint8Array(Buffer.from(votersCommitment, "base64")) : votersCommitment;
        this.attribute_map = {
          blockHeadersCommitment: "block-headers-commitment",
          firstAttestedRound: "first-attested-round",
          latestAttestedRound: "latest-attested-round",
          lnProvenWeight: "ln-proven-weight",
          votersCommitment: "voters-commitment"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        return new IndexerStateProofMessage({
          blockHeadersCommitment: data["block-headers-commitment"],
          firstAttestedRound: data["first-attested-round"],
          latestAttestedRound: data["latest-attested-round"],
          lnProvenWeight: data["ln-proven-weight"],
          votersCommitment: data["voters-commitment"]
        });
      }
    };
    MerkleArrayProof = class extends BaseModel {
      /**
       * Creates a new `MerkleArrayProof` object.
       * @param hashFactory -
       * @param path - (pth)
       * @param treeDepth - (td)
       */
      constructor({ hashFactory, path, treeDepth }) {
        super();
        this.hashFactory = hashFactory;
        this.path = path;
        this.treeDepth = treeDepth;
        this.attribute_map = {
          hashFactory: "hash-factory",
          path: "path",
          treeDepth: "tree-depth"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        return new MerkleArrayProof({
          hashFactory: typeof data["hash-factory"] !== "undefined" ? HashFactory.from_obj_for_encoding(data["hash-factory"]) : void 0,
          path: data["path"],
          treeDepth: data["tree-depth"]
        });
      }
    };
    MiniAssetHolding = class extends BaseModel {
      /**
       * Creates a new `MiniAssetHolding` object.
       * @param address -
       * @param amount -
       * @param isFrozen -
       * @param deleted - Whether or not this asset holding is currently deleted from its account.
       * @param optedInAtRound - Round during which the account opted into the asset.
       * @param optedOutAtRound - Round during which the account opted out of the asset.
       */
      constructor({ address, amount, isFrozen, deleted, optedInAtRound, optedOutAtRound }) {
        super();
        this.address = address;
        this.amount = amount;
        this.isFrozen = isFrozen;
        this.deleted = deleted;
        this.optedInAtRound = optedInAtRound;
        this.optedOutAtRound = optedOutAtRound;
        this.attribute_map = {
          address: "address",
          amount: "amount",
          isFrozen: "is-frozen",
          deleted: "deleted",
          optedInAtRound: "opted-in-at-round",
          optedOutAtRound: "opted-out-at-round"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["address"] === "undefined")
          throw new Error(`Response is missing required field 'address': ${data}`);
        if (typeof data["amount"] === "undefined")
          throw new Error(`Response is missing required field 'amount': ${data}`);
        if (typeof data["is-frozen"] === "undefined")
          throw new Error(`Response is missing required field 'is-frozen': ${data}`);
        return new MiniAssetHolding({
          address: data["address"],
          amount: data["amount"],
          isFrozen: data["is-frozen"],
          deleted: data["deleted"],
          optedInAtRound: data["opted-in-at-round"],
          optedOutAtRound: data["opted-out-at-round"]
        });
      }
    };
    ParticipationUpdates = class extends BaseModel {
      /**
       * Creates a new `ParticipationUpdates` object.
       * @param expiredParticipationAccounts - (partupdrmv) a list of online accounts that needs to be converted to offline
       * since their participation key expired.
       */
      constructor({ expiredParticipationAccounts }) {
        super();
        this.expiredParticipationAccounts = expiredParticipationAccounts;
        this.attribute_map = {
          expiredParticipationAccounts: "expired-participation-accounts"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        return new ParticipationUpdates({
          expiredParticipationAccounts: data["expired-participation-accounts"]
        });
      }
    };
    StateProofFields = class extends BaseModel {
      /**
       * Creates a new `StateProofFields` object.
       * @param partProofs - (P)
       * @param positionsToReveal - (pr) Sequence of reveal positions.
       * @param reveals - (r) Note that this is actually stored as a map[uint64] - Reveal in the actual
       * msgp
       * @param saltVersion - (v) Salt version of the merkle signature.
       * @param sigCommit - (c)
       * @param sigProofs - (S)
       * @param signedWeight - (w)
       */
      constructor({ partProofs, positionsToReveal, reveals, saltVersion, sigCommit, sigProofs, signedWeight }) {
        super();
        this.partProofs = partProofs;
        this.positionsToReveal = positionsToReveal;
        this.reveals = reveals;
        this.saltVersion = saltVersion;
        this.sigCommit = typeof sigCommit === "string" ? new Uint8Array(Buffer.from(sigCommit, "base64")) : sigCommit;
        this.sigProofs = sigProofs;
        this.signedWeight = signedWeight;
        this.attribute_map = {
          partProofs: "part-proofs",
          positionsToReveal: "positions-to-reveal",
          reveals: "reveals",
          saltVersion: "salt-version",
          sigCommit: "sig-commit",
          sigProofs: "sig-proofs",
          signedWeight: "signed-weight"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        return new StateProofFields({
          partProofs: typeof data["part-proofs"] !== "undefined" ? MerkleArrayProof.from_obj_for_encoding(data["part-proofs"]) : void 0,
          positionsToReveal: data["positions-to-reveal"],
          reveals: typeof data["reveals"] !== "undefined" ? data["reveals"].map(StateProofReveal.from_obj_for_encoding) : void 0,
          saltVersion: data["salt-version"],
          sigCommit: data["sig-commit"],
          sigProofs: typeof data["sig-proofs"] !== "undefined" ? MerkleArrayProof.from_obj_for_encoding(data["sig-proofs"]) : void 0,
          signedWeight: data["signed-weight"]
        });
      }
    };
    StateProofParticipant = class extends BaseModel {
      /**
       * Creates a new `StateProofParticipant` object.
       * @param verifier - (p)
       * @param weight - (w)
       */
      constructor({ verifier, weight }) {
        super();
        this.verifier = verifier;
        this.weight = weight;
        this.attribute_map = {
          verifier: "verifier",
          weight: "weight"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        return new StateProofParticipant({
          verifier: typeof data["verifier"] !== "undefined" ? StateProofVerifier.from_obj_for_encoding(data["verifier"]) : void 0,
          weight: data["weight"]
        });
      }
    };
    StateProofReveal = class extends BaseModel {
      /**
       * Creates a new `StateProofReveal` object.
       * @param participant - (p)
       * @param position - The position in the signature and participants arrays corresponding to this
       * entry.
       * @param sigSlot - (s)
       */
      constructor({ participant, position, sigSlot }) {
        super();
        this.participant = participant;
        this.position = position;
        this.sigSlot = sigSlot;
        this.attribute_map = {
          participant: "participant",
          position: "position",
          sigSlot: "sig-slot"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        return new StateProofReveal({
          participant: typeof data["participant"] !== "undefined" ? StateProofParticipant.from_obj_for_encoding(data["participant"]) : void 0,
          position: data["position"],
          sigSlot: typeof data["sig-slot"] !== "undefined" ? StateProofSigSlot.from_obj_for_encoding(data["sig-slot"]) : void 0
        });
      }
    };
    StateProofSigSlot = class extends BaseModel {
      /**
       * Creates a new `StateProofSigSlot` object.
       * @param lowerSigWeight - (l) The total weight of signatures in the lower-numbered slots.
       * @param signature -
       */
      constructor({ lowerSigWeight, signature }) {
        super();
        this.lowerSigWeight = lowerSigWeight;
        this.signature = signature;
        this.attribute_map = {
          lowerSigWeight: "lower-sig-weight",
          signature: "signature"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        return new StateProofSigSlot({
          lowerSigWeight: data["lower-sig-weight"],
          signature: typeof data["signature"] !== "undefined" ? StateProofSignature.from_obj_for_encoding(data["signature"]) : void 0
        });
      }
    };
    StateProofSignature = class extends BaseModel {
      /**
       * Creates a new `StateProofSignature` object.
       * @param falconSignature -
       * @param merkleArrayIndex -
       * @param proof -
       * @param verifyingKey - (vkey)
       */
      constructor({ falconSignature, merkleArrayIndex, proof, verifyingKey }) {
        super();
        this.falconSignature = typeof falconSignature === "string" ? new Uint8Array(Buffer.from(falconSignature, "base64")) : falconSignature;
        this.merkleArrayIndex = merkleArrayIndex;
        this.proof = proof;
        this.verifyingKey = typeof verifyingKey === "string" ? new Uint8Array(Buffer.from(verifyingKey, "base64")) : verifyingKey;
        this.attribute_map = {
          falconSignature: "falcon-signature",
          merkleArrayIndex: "merkle-array-index",
          proof: "proof",
          verifyingKey: "verifying-key"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        return new StateProofSignature({
          falconSignature: data["falcon-signature"],
          merkleArrayIndex: data["merkle-array-index"],
          proof: typeof data["proof"] !== "undefined" ? MerkleArrayProof.from_obj_for_encoding(data["proof"]) : void 0,
          verifyingKey: data["verifying-key"]
        });
      }
    };
    StateProofTracking = class extends BaseModel {
      /**
       * Creates a new `StateProofTracking` object.
       * @param nextRound - (n) Next round for which we will accept a state proof transaction.
       * @param onlineTotalWeight - (t) The total number of microalgos held by the online accounts during the
       * StateProof round.
       * @param type - State Proof Type. Note the raw object uses map with this as key.
       * @param votersCommitment - (v) Root of a vector commitment containing online accounts that will help sign
       * the proof.
       */
      constructor({ nextRound, onlineTotalWeight, type, votersCommitment }) {
        super();
        this.nextRound = nextRound;
        this.onlineTotalWeight = onlineTotalWeight;
        this.type = type;
        this.votersCommitment = typeof votersCommitment === "string" ? new Uint8Array(Buffer.from(votersCommitment, "base64")) : votersCommitment;
        this.attribute_map = {
          nextRound: "next-round",
          onlineTotalWeight: "online-total-weight",
          type: "type",
          votersCommitment: "voters-commitment"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        return new StateProofTracking({
          nextRound: data["next-round"],
          onlineTotalWeight: data["online-total-weight"],
          type: data["type"],
          votersCommitment: data["voters-commitment"]
        });
      }
    };
    StateProofVerifier = class extends BaseModel {
      /**
       * Creates a new `StateProofVerifier` object.
       * @param commitment - (cmt) Represents the root of the vector commitment tree.
       * @param keyLifetime - (lf) Key lifetime.
       */
      constructor({ commitment, keyLifetime }) {
        super();
        this.commitment = typeof commitment === "string" ? new Uint8Array(Buffer.from(commitment, "base64")) : commitment;
        this.keyLifetime = keyLifetime;
        this.attribute_map = {
          commitment: "commitment",
          keyLifetime: "key-lifetime"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        return new StateProofVerifier({
          commitment: data["commitment"],
          keyLifetime: data["key-lifetime"]
        });
      }
    };
    StateSchema = class extends BaseModel {
      /**
       * Creates a new `StateSchema` object.
       * @param numByteSlice - Maximum number of TEAL byte slices that may be stored in the key/value store.
       * @param numUint - Maximum number of TEAL uints that may be stored in the key/value store.
       */
      constructor({ numByteSlice, numUint }) {
        super();
        this.numByteSlice = numByteSlice;
        this.numUint = numUint;
        this.attribute_map = {
          numByteSlice: "num-byte-slice",
          numUint: "num-uint"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["num-byte-slice"] === "undefined")
          throw new Error(`Response is missing required field 'num-byte-slice': ${data}`);
        if (typeof data["num-uint"] === "undefined")
          throw new Error(`Response is missing required field 'num-uint': ${data}`);
        return new StateSchema({
          numByteSlice: data["num-byte-slice"],
          numUint: data["num-uint"]
        });
      }
    };
    TealKeyValue2 = class extends BaseModel {
      /**
       * Creates a new `TealKeyValue` object.
       * @param key -
       * @param value - Represents a TEAL value.
       */
      constructor({ key, value }) {
        super();
        this.key = key;
        this.value = value;
        this.attribute_map = {
          key: "key",
          value: "value"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["key"] === "undefined")
          throw new Error(`Response is missing required field 'key': ${data}`);
        if (typeof data["value"] === "undefined")
          throw new Error(`Response is missing required field 'value': ${data}`);
        return new TealKeyValue2({
          key: data["key"],
          value: TealValue2.from_obj_for_encoding(data["value"])
        });
      }
    };
    TealValue2 = class extends BaseModel {
      /**
       * Creates a new `TealValue` object.
       * @param bytes - (tb) bytes value.
       * @param type - (tt) value type. Value `1` refers to **bytes**, value `2` refers to **uint**
       * @param uint - (ui) uint value.
       */
      constructor({ bytes, type, uint }) {
        super();
        this.bytes = bytes;
        this.type = type;
        this.uint = uint;
        this.attribute_map = {
          bytes: "bytes",
          type: "type",
          uint: "uint"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["bytes"] === "undefined")
          throw new Error(`Response is missing required field 'bytes': ${data}`);
        if (typeof data["type"] === "undefined")
          throw new Error(`Response is missing required field 'type': ${data}`);
        if (typeof data["uint"] === "undefined")
          throw new Error(`Response is missing required field 'uint': ${data}`);
        return new TealValue2({
          bytes: data["bytes"],
          type: data["type"],
          uint: data["uint"]
        });
      }
    };
    Transaction2 = class extends BaseModel {
      /**
       * Creates a new `Transaction` object.
       * @param fee - (fee) Transaction fee.
       * @param firstValid - (fv) First valid round for this transaction.
       * @param lastValid - (lv) Last valid round for this transaction.
       * @param sender - (snd) Sender's address.
       * @param applicationTransaction - Fields for application transactions.
       * Definition:
       * data/transactions/application.go : ApplicationCallTxnFields
       * @param assetConfigTransaction - Fields for asset allocation, re-configuration, and destruction.
       * A zero value for asset-id indicates asset creation.
       * A zero value for the params indicates asset destruction.
       * Definition:
       * data/transactions/asset.go : AssetConfigTxnFields
       * @param assetFreezeTransaction - Fields for an asset freeze transaction.
       * Definition:
       * data/transactions/asset.go : AssetFreezeTxnFields
       * @param assetTransferTransaction - Fields for an asset transfer transaction.
       * Definition:
       * data/transactions/asset.go : AssetTransferTxnFields
       * @param authAddr - (sgnr) this is included with signed transactions when the signing address does
       * not equal the sender. The backend can use this to ensure that auth addr is equal
       * to the accounts auth addr.
       * @param closeRewards - (rc) rewards applied to close-remainder-to account.
       * @param closingAmount - (ca) closing amount for transaction.
       * @param confirmedRound - Round when the transaction was confirmed.
       * @param createdApplicationIndex - Specifies an application index (ID) if an application was created with this
       * transaction.
       * @param createdAssetIndex - Specifies an asset index (ID) if an asset was created with this transaction.
       * @param genesisHash - (gh) Hash of genesis block.
       * @param genesisId - (gen) genesis block ID.
       * @param globalStateDelta - (gd) Global state key/value changes for the application being executed by this
       * transaction.
       * @param group - (grp) Base64 encoded byte array of a sha512/256 digest. When present indicates
       * that this transaction is part of a transaction group and the value is the
       * sha512/256 hash of the transactions in that group.
       * @param id - Transaction ID
       * @param innerTxns - Inner transactions produced by application execution.
       * @param intraRoundOffset - Offset into the round where this transaction was confirmed.
       * @param keyregTransaction - Fields for a keyreg transaction.
       * Definition:
       * data/transactions/keyreg.go : KeyregTxnFields
       * @param lease - (lx) Base64 encoded 32-byte array. Lease enforces mutual exclusion of
       * transactions. If this field is nonzero, then once the transaction is confirmed,
       * it acquires the lease identified by the (Sender, Lease) pair of the transaction
       * until the LastValid round passes. While this transaction possesses the lease, no
       * other transaction specifying this lease can be confirmed.
       * @param localStateDelta - (ld) Local state key/value changes for the application being executed by this
       * transaction.
       * @param logs - (lg) Logs for the application being executed by this transaction.
       * @param note - (note) Free form data.
       * @param paymentTransaction - Fields for a payment transaction.
       * Definition:
       * data/transactions/payment.go : PaymentTxnFields
       * @param receiverRewards - (rr) rewards applied to receiver account.
       * @param rekeyTo - (rekey) when included in a valid transaction, the accounts auth addr will be
       * updated with this value and future signatures must be signed with the key
       * represented by this address.
       * @param roundTime - Time when the block this transaction is in was confirmed.
       * @param senderRewards - (rs) rewards applied to sender account.
       * @param signature - Validation signature associated with some data. Only one of the signatures
       * should be provided.
       * @param stateProofTransaction - Fields for a state proof transaction.
       * Definition:
       * data/transactions/stateproof.go : StateProofTxnFields
       * @param txType - (type) Indicates what type of transaction this is. Different types have
       * different fields.
       * Valid types, and where their fields are stored:
       * * (pay) payment-transaction
       * * (keyreg) keyreg-transaction
       * * (acfg) asset-config-transaction
       * * (axfer) asset-transfer-transaction
       * * (afrz) asset-freeze-transaction
       * * (appl) application-transaction
       * * (stpf) state-proof-transaction
       */
      constructor({ fee, firstValid, lastValid, sender, applicationTransaction, assetConfigTransaction, assetFreezeTransaction, assetTransferTransaction, authAddr, closeRewards, closingAmount, confirmedRound, createdApplicationIndex, createdAssetIndex, genesisHash, genesisId, globalStateDelta, group, id, innerTxns, intraRoundOffset, keyregTransaction, lease, localStateDelta, logs, note, paymentTransaction, receiverRewards, rekeyTo, roundTime, senderRewards, signature, stateProofTransaction, txType }) {
        super();
        this.fee = fee;
        this.firstValid = firstValid;
        this.lastValid = lastValid;
        this.sender = sender;
        this.applicationTransaction = applicationTransaction;
        this.assetConfigTransaction = assetConfigTransaction;
        this.assetFreezeTransaction = assetFreezeTransaction;
        this.assetTransferTransaction = assetTransferTransaction;
        this.authAddr = authAddr;
        this.closeRewards = closeRewards;
        this.closingAmount = closingAmount;
        this.confirmedRound = confirmedRound;
        this.createdApplicationIndex = createdApplicationIndex;
        this.createdAssetIndex = createdAssetIndex;
        this.genesisHash = typeof genesisHash === "string" ? new Uint8Array(Buffer.from(genesisHash, "base64")) : genesisHash;
        this.genesisId = genesisId;
        this.globalStateDelta = globalStateDelta;
        this.group = typeof group === "string" ? new Uint8Array(Buffer.from(group, "base64")) : group;
        this.id = id;
        this.innerTxns = innerTxns;
        this.intraRoundOffset = intraRoundOffset;
        this.keyregTransaction = keyregTransaction;
        this.lease = typeof lease === "string" ? new Uint8Array(Buffer.from(lease, "base64")) : lease;
        this.localStateDelta = localStateDelta;
        this.logs = logs;
        this.note = typeof note === "string" ? new Uint8Array(Buffer.from(note, "base64")) : note;
        this.paymentTransaction = paymentTransaction;
        this.receiverRewards = receiverRewards;
        this.rekeyTo = rekeyTo;
        this.roundTime = roundTime;
        this.senderRewards = senderRewards;
        this.signature = signature;
        this.stateProofTransaction = stateProofTransaction;
        this.txType = txType;
        this.attribute_map = {
          fee: "fee",
          firstValid: "first-valid",
          lastValid: "last-valid",
          sender: "sender",
          applicationTransaction: "application-transaction",
          assetConfigTransaction: "asset-config-transaction",
          assetFreezeTransaction: "asset-freeze-transaction",
          assetTransferTransaction: "asset-transfer-transaction",
          authAddr: "auth-addr",
          closeRewards: "close-rewards",
          closingAmount: "closing-amount",
          confirmedRound: "confirmed-round",
          createdApplicationIndex: "created-application-index",
          createdAssetIndex: "created-asset-index",
          genesisHash: "genesis-hash",
          genesisId: "genesis-id",
          globalStateDelta: "global-state-delta",
          group: "group",
          id: "id",
          innerTxns: "inner-txns",
          intraRoundOffset: "intra-round-offset",
          keyregTransaction: "keyreg-transaction",
          lease: "lease",
          localStateDelta: "local-state-delta",
          logs: "logs",
          note: "note",
          paymentTransaction: "payment-transaction",
          receiverRewards: "receiver-rewards",
          rekeyTo: "rekey-to",
          roundTime: "round-time",
          senderRewards: "sender-rewards",
          signature: "signature",
          stateProofTransaction: "state-proof-transaction",
          txType: "tx-type"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["fee"] === "undefined")
          throw new Error(`Response is missing required field 'fee': ${data}`);
        if (typeof data["first-valid"] === "undefined")
          throw new Error(`Response is missing required field 'first-valid': ${data}`);
        if (typeof data["last-valid"] === "undefined")
          throw new Error(`Response is missing required field 'last-valid': ${data}`);
        if (typeof data["sender"] === "undefined")
          throw new Error(`Response is missing required field 'sender': ${data}`);
        return new Transaction2({
          fee: data["fee"],
          firstValid: data["first-valid"],
          lastValid: data["last-valid"],
          sender: data["sender"],
          applicationTransaction: typeof data["application-transaction"] !== "undefined" ? TransactionApplication.from_obj_for_encoding(data["application-transaction"]) : void 0,
          assetConfigTransaction: typeof data["asset-config-transaction"] !== "undefined" ? TransactionAssetConfig.from_obj_for_encoding(data["asset-config-transaction"]) : void 0,
          assetFreezeTransaction: typeof data["asset-freeze-transaction"] !== "undefined" ? TransactionAssetFreeze.from_obj_for_encoding(data["asset-freeze-transaction"]) : void 0,
          assetTransferTransaction: typeof data["asset-transfer-transaction"] !== "undefined" ? TransactionAssetTransfer.from_obj_for_encoding(data["asset-transfer-transaction"]) : void 0,
          authAddr: data["auth-addr"],
          closeRewards: data["close-rewards"],
          closingAmount: data["closing-amount"],
          confirmedRound: data["confirmed-round"],
          createdApplicationIndex: data["created-application-index"],
          createdAssetIndex: data["created-asset-index"],
          genesisHash: data["genesis-hash"],
          genesisId: data["genesis-id"],
          globalStateDelta: typeof data["global-state-delta"] !== "undefined" ? data["global-state-delta"].map(EvalDeltaKeyValue2.from_obj_for_encoding) : void 0,
          group: data["group"],
          id: data["id"],
          innerTxns: typeof data["inner-txns"] !== "undefined" ? data["inner-txns"].map(Transaction2.from_obj_for_encoding) : void 0,
          intraRoundOffset: data["intra-round-offset"],
          keyregTransaction: typeof data["keyreg-transaction"] !== "undefined" ? TransactionKeyreg.from_obj_for_encoding(data["keyreg-transaction"]) : void 0,
          lease: data["lease"],
          localStateDelta: typeof data["local-state-delta"] !== "undefined" ? data["local-state-delta"].map(AccountStateDelta2.from_obj_for_encoding) : void 0,
          logs: data["logs"],
          note: data["note"],
          paymentTransaction: typeof data["payment-transaction"] !== "undefined" ? TransactionPayment.from_obj_for_encoding(data["payment-transaction"]) : void 0,
          receiverRewards: data["receiver-rewards"],
          rekeyTo: data["rekey-to"],
          roundTime: data["round-time"],
          senderRewards: data["sender-rewards"],
          signature: typeof data["signature"] !== "undefined" ? TransactionSignature.from_obj_for_encoding(data["signature"]) : void 0,
          stateProofTransaction: typeof data["state-proof-transaction"] !== "undefined" ? TransactionStateProof.from_obj_for_encoding(data["state-proof-transaction"]) : void 0,
          txType: data["tx-type"]
        });
      }
    };
    TransactionApplication = class extends BaseModel {
      /**
       * Creates a new `TransactionApplication` object.
       * @param applicationId - (apid) ID of the application being configured or empty if creating.
       * @param accounts - (apat) List of accounts in addition to the sender that may be accessed from the
       * application's approval-program and clear-state-program.
       * @param applicationArgs - (apaa) transaction specific arguments accessed from the application's
       * approval-program and clear-state-program.
       * @param approvalProgram - (apap) Logic executed for every application transaction, except when
       * on-completion is set to "clear". It can read and write global state for the
       * application, as well as account-specific local state. Approval programs may
       * reject the transaction.
       * @param clearStateProgram - (apsu) Logic executed for application transactions with on-completion set to
       * "clear". It can read and write global state for the application, as well as
       * account-specific local state. Clear state programs cannot reject the
       * transaction.
       * @param extraProgramPages - (epp) specifies the additional app program len requested in pages.
       * @param foreignApps - (apfa) Lists the applications in addition to the application-id whose global
       * states may be accessed by this application's approval-program and
       * clear-state-program. The access is read-only.
       * @param foreignAssets - (apas) lists the assets whose parameters may be accessed by this application's
       * ApprovalProgram and ClearStateProgram. The access is read-only.
       * @param globalStateSchema - Represents a (apls) local-state or (apgs) global-state schema. These schemas
       * determine how much storage may be used in a local-state or global-state for an
       * application. The more space used, the larger minimum balance must be maintained
       * in the account holding the data.
       * @param localStateSchema - Represents a (apls) local-state or (apgs) global-state schema. These schemas
       * determine how much storage may be used in a local-state or global-state for an
       * application. The more space used, the larger minimum balance must be maintained
       * in the account holding the data.
       * @param onCompletion - (apan) defines the what additional actions occur with the transaction.
       * Valid types:
       * * noop
       * * optin
       * * closeout
       * * clear
       * * update
       * * update
       * * delete
       */
      constructor({ applicationId, accounts, applicationArgs, approvalProgram, clearStateProgram, extraProgramPages, foreignApps, foreignAssets, globalStateSchema, localStateSchema, onCompletion }) {
        super();
        this.applicationId = applicationId;
        this.accounts = accounts;
        this.applicationArgs = applicationArgs;
        this.approvalProgram = typeof approvalProgram === "string" ? new Uint8Array(Buffer.from(approvalProgram, "base64")) : approvalProgram;
        this.clearStateProgram = typeof clearStateProgram === "string" ? new Uint8Array(Buffer.from(clearStateProgram, "base64")) : clearStateProgram;
        this.extraProgramPages = extraProgramPages;
        this.foreignApps = foreignApps;
        this.foreignAssets = foreignAssets;
        this.globalStateSchema = globalStateSchema;
        this.localStateSchema = localStateSchema;
        this.onCompletion = onCompletion;
        this.attribute_map = {
          applicationId: "application-id",
          accounts: "accounts",
          applicationArgs: "application-args",
          approvalProgram: "approval-program",
          clearStateProgram: "clear-state-program",
          extraProgramPages: "extra-program-pages",
          foreignApps: "foreign-apps",
          foreignAssets: "foreign-assets",
          globalStateSchema: "global-state-schema",
          localStateSchema: "local-state-schema",
          onCompletion: "on-completion"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["application-id"] === "undefined")
          throw new Error(`Response is missing required field 'application-id': ${data}`);
        return new TransactionApplication({
          applicationId: data["application-id"],
          accounts: data["accounts"],
          applicationArgs: data["application-args"],
          approvalProgram: data["approval-program"],
          clearStateProgram: data["clear-state-program"],
          extraProgramPages: data["extra-program-pages"],
          foreignApps: data["foreign-apps"],
          foreignAssets: data["foreign-assets"],
          globalStateSchema: typeof data["global-state-schema"] !== "undefined" ? StateSchema.from_obj_for_encoding(data["global-state-schema"]) : void 0,
          localStateSchema: typeof data["local-state-schema"] !== "undefined" ? StateSchema.from_obj_for_encoding(data["local-state-schema"]) : void 0,
          onCompletion: data["on-completion"]
        });
      }
    };
    TransactionAssetConfig = class extends BaseModel {
      /**
       * Creates a new `TransactionAssetConfig` object.
       * @param assetId - (xaid) ID of the asset being configured or empty if creating.
       * @param params - AssetParams specifies the parameters for an asset.
       * (apar) when part of an AssetConfig transaction.
       * Definition:
       * data/transactions/asset.go : AssetParams
       */
      constructor({ assetId, params }) {
        super();
        this.assetId = assetId;
        this.params = params;
        this.attribute_map = {
          assetId: "asset-id",
          params: "params"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        return new TransactionAssetConfig({
          assetId: data["asset-id"],
          params: typeof data["params"] !== "undefined" ? AssetParams2.from_obj_for_encoding(data["params"]) : void 0
        });
      }
    };
    TransactionAssetFreeze = class extends BaseModel {
      /**
       * Creates a new `TransactionAssetFreeze` object.
       * @param address - (fadd) Address of the account whose asset is being frozen or thawed.
       * @param assetId - (faid) ID of the asset being frozen or thawed.
       * @param newFreezeStatus - (afrz) The new freeze status.
       */
      constructor({ address, assetId, newFreezeStatus }) {
        super();
        this.address = address;
        this.assetId = assetId;
        this.newFreezeStatus = newFreezeStatus;
        this.attribute_map = {
          address: "address",
          assetId: "asset-id",
          newFreezeStatus: "new-freeze-status"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["address"] === "undefined")
          throw new Error(`Response is missing required field 'address': ${data}`);
        if (typeof data["asset-id"] === "undefined")
          throw new Error(`Response is missing required field 'asset-id': ${data}`);
        if (typeof data["new-freeze-status"] === "undefined")
          throw new Error(`Response is missing required field 'new-freeze-status': ${data}`);
        return new TransactionAssetFreeze({
          address: data["address"],
          assetId: data["asset-id"],
          newFreezeStatus: data["new-freeze-status"]
        });
      }
    };
    TransactionAssetTransfer = class extends BaseModel {
      /**
       * Creates a new `TransactionAssetTransfer` object.
       * @param amount - (aamt) Amount of asset to transfer. A zero amount transferred to self allocates
       * that asset in the account's Assets map.
       * @param assetId - (xaid) ID of the asset being transferred.
       * @param receiver - (arcv) Recipient address of the transfer.
       * @param closeAmount - Number of assets transfered to the close-to account as part of the transaction.
       * @param closeTo - (aclose) Indicates that the asset should be removed from the account's Assets
       * map, and specifies where the remaining asset holdings should be transferred.
       * It's always valid to transfer remaining asset holdings to the creator account.
       * @param sender - (asnd) The effective sender during a clawback transactions. If this is not a
       * zero value, the real transaction sender must be the Clawback address from the
       * AssetParams.
       */
      constructor({ amount, assetId, receiver, closeAmount, closeTo, sender }) {
        super();
        this.amount = amount;
        this.assetId = assetId;
        this.receiver = receiver;
        this.closeAmount = closeAmount;
        this.closeTo = closeTo;
        this.sender = sender;
        this.attribute_map = {
          amount: "amount",
          assetId: "asset-id",
          receiver: "receiver",
          closeAmount: "close-amount",
          closeTo: "close-to",
          sender: "sender"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["amount"] === "undefined")
          throw new Error(`Response is missing required field 'amount': ${data}`);
        if (typeof data["asset-id"] === "undefined")
          throw new Error(`Response is missing required field 'asset-id': ${data}`);
        if (typeof data["receiver"] === "undefined")
          throw new Error(`Response is missing required field 'receiver': ${data}`);
        return new TransactionAssetTransfer({
          amount: data["amount"],
          assetId: data["asset-id"],
          receiver: data["receiver"],
          closeAmount: data["close-amount"],
          closeTo: data["close-to"],
          sender: data["sender"]
        });
      }
    };
    TransactionKeyreg = class extends BaseModel {
      /**
       * Creates a new `TransactionKeyreg` object.
       * @param nonParticipation - (nonpart) Mark the account as participating or non-participating.
       * @param selectionParticipationKey - (selkey) Public key used with the Verified Random Function (VRF) result during
       * committee selection.
       * @param stateProofKey - (sprfkey) State proof key used in key registration transactions.
       * @param voteFirstValid - (votefst) First round this participation key is valid.
       * @param voteKeyDilution - (votekd) Number of subkeys in each batch of participation keys.
       * @param voteLastValid - (votelst) Last round this participation key is valid.
       * @param voteParticipationKey - (votekey) Participation public key used in key registration transactions.
       */
      constructor({ nonParticipation, selectionParticipationKey, stateProofKey, voteFirstValid, voteKeyDilution, voteLastValid, voteParticipationKey }) {
        super();
        this.nonParticipation = nonParticipation;
        this.selectionParticipationKey = typeof selectionParticipationKey === "string" ? new Uint8Array(Buffer.from(selectionParticipationKey, "base64")) : selectionParticipationKey;
        this.stateProofKey = typeof stateProofKey === "string" ? new Uint8Array(Buffer.from(stateProofKey, "base64")) : stateProofKey;
        this.voteFirstValid = voteFirstValid;
        this.voteKeyDilution = voteKeyDilution;
        this.voteLastValid = voteLastValid;
        this.voteParticipationKey = typeof voteParticipationKey === "string" ? new Uint8Array(Buffer.from(voteParticipationKey, "base64")) : voteParticipationKey;
        this.attribute_map = {
          nonParticipation: "non-participation",
          selectionParticipationKey: "selection-participation-key",
          stateProofKey: "state-proof-key",
          voteFirstValid: "vote-first-valid",
          voteKeyDilution: "vote-key-dilution",
          voteLastValid: "vote-last-valid",
          voteParticipationKey: "vote-participation-key"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        return new TransactionKeyreg({
          nonParticipation: data["non-participation"],
          selectionParticipationKey: data["selection-participation-key"],
          stateProofKey: data["state-proof-key"],
          voteFirstValid: data["vote-first-valid"],
          voteKeyDilution: data["vote-key-dilution"],
          voteLastValid: data["vote-last-valid"],
          voteParticipationKey: data["vote-participation-key"]
        });
      }
    };
    TransactionPayment = class extends BaseModel {
      /**
       * Creates a new `TransactionPayment` object.
       * @param amount - (amt) number of MicroAlgos intended to be transferred.
       * @param receiver - (rcv) receiver's address.
       * @param closeAmount - Number of MicroAlgos that were sent to the close-remainder-to address when
       * closing the sender account.
       * @param closeRemainderTo - (close) when set, indicates that the sending account should be closed and all
       * remaining funds be transferred to this address.
       */
      constructor({ amount, receiver, closeAmount, closeRemainderTo }) {
        super();
        this.amount = amount;
        this.receiver = receiver;
        this.closeAmount = closeAmount;
        this.closeRemainderTo = closeRemainderTo;
        this.attribute_map = {
          amount: "amount",
          receiver: "receiver",
          closeAmount: "close-amount",
          closeRemainderTo: "close-remainder-to"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["amount"] === "undefined")
          throw new Error(`Response is missing required field 'amount': ${data}`);
        if (typeof data["receiver"] === "undefined")
          throw new Error(`Response is missing required field 'receiver': ${data}`);
        return new TransactionPayment({
          amount: data["amount"],
          receiver: data["receiver"],
          closeAmount: data["close-amount"],
          closeRemainderTo: data["close-remainder-to"]
        });
      }
    };
    TransactionResponse = class extends BaseModel {
      /**
       * Creates a new `TransactionResponse` object.
       * @param currentRound - Round at which the results were computed.
       * @param transaction - Contains all fields common to all transactions and serves as an envelope to all
       * transactions type. Represents both regular and inner transactions.
       * Definition:
       * data/transactions/signedtxn.go : SignedTxn
       * data/transactions/transaction.go : Transaction
       */
      constructor({ currentRound, transaction }) {
        super();
        this.currentRound = currentRound;
        this.transaction = transaction;
        this.attribute_map = {
          currentRound: "current-round",
          transaction: "transaction"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["current-round"] === "undefined")
          throw new Error(`Response is missing required field 'current-round': ${data}`);
        if (typeof data["transaction"] === "undefined")
          throw new Error(`Response is missing required field 'transaction': ${data}`);
        return new TransactionResponse({
          currentRound: data["current-round"],
          transaction: Transaction2.from_obj_for_encoding(data["transaction"])
        });
      }
    };
    TransactionSignature = class extends BaseModel {
      /**
       * Creates a new `TransactionSignature` object.
       * @param logicsig - (lsig) Programatic transaction signature.
       * Definition:
       * data/transactions/logicsig.go
       * @param multisig - (msig) structure holding multiple subsignatures.
       * Definition:
       * crypto/multisig.go : MultisigSig
       * @param sig - (sig) Standard ed25519 signature.
       */
      constructor({ logicsig, multisig, sig }) {
        super();
        this.logicsig = logicsig;
        this.multisig = multisig;
        this.sig = typeof sig === "string" ? new Uint8Array(Buffer.from(sig, "base64")) : sig;
        this.attribute_map = {
          logicsig: "logicsig",
          multisig: "multisig",
          sig: "sig"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        return new TransactionSignature({
          logicsig: typeof data["logicsig"] !== "undefined" ? TransactionSignatureLogicsig.from_obj_for_encoding(data["logicsig"]) : void 0,
          multisig: typeof data["multisig"] !== "undefined" ? TransactionSignatureMultisig.from_obj_for_encoding(data["multisig"]) : void 0,
          sig: data["sig"]
        });
      }
    };
    TransactionSignatureLogicsig = class extends BaseModel {
      /**
       * Creates a new `TransactionSignatureLogicsig` object.
       * @param logic - (l) Program signed by a signature or multi signature, or hashed to be the
       * address of ana ccount. Base64 encoded TEAL program.
       * @param args - (arg) Logic arguments, base64 encoded.
       * @param multisigSignature - (msig) structure holding multiple subsignatures.
       * Definition:
       * crypto/multisig.go : MultisigSig
       * @param signature - (sig) ed25519 signature.
       */
      constructor({ logic, args, multisigSignature, signature }) {
        super();
        this.logic = typeof logic === "string" ? new Uint8Array(Buffer.from(logic, "base64")) : logic;
        this.args = args;
        this.multisigSignature = multisigSignature;
        this.signature = typeof signature === "string" ? new Uint8Array(Buffer.from(signature, "base64")) : signature;
        this.attribute_map = {
          logic: "logic",
          args: "args",
          multisigSignature: "multisig-signature",
          signature: "signature"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["logic"] === "undefined")
          throw new Error(`Response is missing required field 'logic': ${data}`);
        return new TransactionSignatureLogicsig({
          logic: data["logic"],
          args: data["args"],
          multisigSignature: typeof data["multisig-signature"] !== "undefined" ? TransactionSignatureMultisig.from_obj_for_encoding(data["multisig-signature"]) : void 0,
          signature: data["signature"]
        });
      }
    };
    TransactionSignatureMultisig = class extends BaseModel {
      /**
       * Creates a new `TransactionSignatureMultisig` object.
       * @param subsignature - (subsig) holds pairs of public key and signatures.
       * @param threshold - (thr)
       * @param version - (v)
       */
      constructor({ subsignature, threshold, version }) {
        super();
        this.subsignature = subsignature;
        this.threshold = threshold;
        this.version = version;
        this.attribute_map = {
          subsignature: "subsignature",
          threshold: "threshold",
          version: "version"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        return new TransactionSignatureMultisig({
          subsignature: typeof data["subsignature"] !== "undefined" ? data["subsignature"].map(TransactionSignatureMultisigSubsignature.from_obj_for_encoding) : void 0,
          threshold: data["threshold"],
          version: data["version"]
        });
      }
    };
    TransactionSignatureMultisigSubsignature = class extends BaseModel {
      /**
       * Creates a new `TransactionSignatureMultisigSubsignature` object.
       * @param publicKey - (pk)
       * @param signature - (s)
       */
      constructor({ publicKey, signature }) {
        super();
        this.publicKey = typeof publicKey === "string" ? new Uint8Array(Buffer.from(publicKey, "base64")) : publicKey;
        this.signature = typeof signature === "string" ? new Uint8Array(Buffer.from(signature, "base64")) : signature;
        this.attribute_map = {
          publicKey: "public-key",
          signature: "signature"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        return new TransactionSignatureMultisigSubsignature({
          publicKey: data["public-key"],
          signature: data["signature"]
        });
      }
    };
    TransactionStateProof = class extends BaseModel {
      /**
       * Creates a new `TransactionStateProof` object.
       * @param message - (spmsg)
       * @param stateProof - (sp) represents a state proof.
       * Definition:
       * crypto/stateproof/structs.go : StateProof
       * @param stateProofType - (sptype) Type of the state proof. Integer representing an entry defined in
       * protocol/stateproof.go
       */
      constructor({ message, stateProof, stateProofType }) {
        super();
        this.message = message;
        this.stateProof = stateProof;
        this.stateProofType = stateProofType;
        this.attribute_map = {
          message: "message",
          stateProof: "state-proof",
          stateProofType: "state-proof-type"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        return new TransactionStateProof({
          message: typeof data["message"] !== "undefined" ? IndexerStateProofMessage.from_obj_for_encoding(data["message"]) : void 0,
          stateProof: typeof data["state-proof"] !== "undefined" ? StateProofFields.from_obj_for_encoding(data["state-proof"]) : void 0,
          stateProofType: data["state-proof-type"]
        });
      }
    };
    TransactionsResponse = class extends BaseModel {
      /**
       * Creates a new `TransactionsResponse` object.
       * @param currentRound - Round at which the results were computed.
       * @param transactions -
       * @param nextToken - Used for pagination, when making another request provide this token with the
       * next parameter.
       */
      constructor({ currentRound, transactions, nextToken }) {
        super();
        this.currentRound = currentRound;
        this.transactions = transactions;
        this.nextToken = nextToken;
        this.attribute_map = {
          currentRound: "current-round",
          transactions: "transactions",
          nextToken: "next-token"
        };
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(data) {
        if (typeof data["current-round"] === "undefined")
          throw new Error(`Response is missing required field 'current-round': ${data}`);
        if (!Array.isArray(data["transactions"]))
          throw new Error(`Response is missing required array field 'transactions': ${data}`);
        return new TransactionsResponse({
          currentRound: data["current-round"],
          transactions: data["transactions"].map(Transaction2.from_obj_for_encoding),
          nextToken: data["next-token"]
        });
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/indexer/lookupApplicationBoxByIDandName.js
var LookupApplicationBoxByIDandName;
var init_lookupApplicationBoxByIDandName = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/indexer/lookupApplicationBoxByIDandName.js"() {
    init_buffer();
    init_jsonrequest();
    init_types2();
    LookupApplicationBoxByIDandName = class extends JSONRequest {
      /**
       * Returns information about indexed application boxes.
       *
       * #### Example
       * ```typescript
       * const boxName = Buffer.from("foo");
       * const boxResponse = await indexerClient
       *        .LookupApplicationBoxByIDandName(1234, boxName)
       *        .do();
       * const boxValue = boxResponse.value;
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2applicationsapplication-idbox)
       * @oaram index - application index.
       * @category GET
       */
      constructor(c, intDecoding, index, boxName) {
        super(c, intDecoding);
        this.index = index;
        this.index = index;
        const encodedName = Buffer.from(boxName).toString("base64");
        this.query.name = encodeURI(`b64:${encodedName}`);
      }
      /**
       * @returns `/v2/applications/${index}/box`
       */
      path() {
        return `/v2/applications/${this.index}/box`;
      }
      // eslint-disable-next-line class-methods-use-this
      prepare(body) {
        return Box2.from_obj_for_encoding(body);
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/indexer/searchAccounts.js
var SearchAccounts;
var init_searchAccounts = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/indexer/searchAccounts.js"() {
    init_jsonrequest();
    SearchAccounts = class extends JSONRequest {
      /**
       * @returns `/v2/accounts`
       */
      // eslint-disable-next-line class-methods-use-this
      path() {
        return "/v2/accounts";
      }
      /**
       * Filtered results should have an amount greater than this value, as int, representing microAlgos, unless an asset-id is provided, in which case units are in the asset's units.
       *
       * #### Example 1
       * ```typescript
       * const minBalance = 300000;
       * const accounts = await indexerClient
       *        .searchAccounts()
       *        .currencyGreaterThan(minBalance - 1)
       *        .do();
       * ```
       *
       * #### Example 2
       * ```typescript
       * const assetID = 163650;
       * const minBalance = 300000;
       * const accounts = await indexerClient
       *        .searchAccounts()
       *        .assetID(assetID)
       *        .currencyGreaterThan(minBalance - 1)
       *        .do();
       * ```
       * @remarks
       * If you are looking for accounts with the currency amount greater than 0, simply construct the query without `currencyGreaterThan` because it doesn't accept `-1`, and passing the `0` `currency-greater-than` value would exclude accounts with a 0 amount.
       *
       * @param greater
       * @category query
       */
      currencyGreaterThan(greater) {
        this.query["currency-greater-than"] = greater.toString();
        return this;
      }
      /**
       * Filtered results should have an amount less than this value, as int, representing microAlgos, unless an asset-id is provided, in which case units are in the asset's units.
       *
       * #### Example 1
       * ```typescript
       * const maxBalance = 500000;
       * const accounts = await indexerClient
       *        .searchAccounts()
       *        .currencyLessThan(maxBalance + 1)
       *        .do();
       * ```
       *
       * #### Example 2
       * ```typescript
       * const assetID = 163650;
       * const maxBalance = 500000;
       * const accounts = await indexerClient
       *        .searchAccounts()
       *        .assetID(assetID)
       *        .currencyLessThan(maxBalance + 1)
       *        .do();
       * ```
       *
       * @param lesser
       * @category query
       */
      currencyLessThan(lesser) {
        this.query["currency-less-than"] = lesser;
        return this;
      }
      /**
       * Maximum number of results to return.
       *
       * #### Example
       * ```typescript
       * const maxResults = 25;
       * const accounts = await indexerClient
       *        .searchAccounts()
       *        .limit(maxResults)
       *        .do();
       * ```
       *
       * @param limit
       * @category query
       */
      limit(limit) {
        this.query.limit = limit;
        return this;
      }
      /**
       * Asset ID to filter with.
       *
       * #### Example
       * ```typescript
       * const assetID = 163650;
       * const accounts = await indexerClient
       *        .searchAccounts()
       *        .assetID(assetID)
       *        .do();
       * ```
       *
       * @param id
       * @category query
       */
      assetID(id) {
        this.query["asset-id"] = id;
        return this;
      }
      /**
       * The next page of results.
       *
       * #### Example
       * ```typescript
       * const maxResults = 25;
       *
       * const accountsPage1 = await indexerClient
       *        .searchAccounts()
       *        .limit(maxResults)
       *        .do();
       *
       * const accountsPage2 = await indexerClient
       *        .searchAccounts()
       *        .limit(maxResults)
       *        .nextToken(accountsPage1["next-token"])
       *        .do();
       * ```
       *
       * @param nextToken - provided by the previous results
       * @category query
       */
      nextToken(nextToken) {
        this.query.next = nextToken;
        return this;
      }
      /**
       * Include results for the specified round.
       *
       * #### Example
       * ```typescript
       * const targetBlock = 18309917;
       * const accounts = await indexerClient
       *        .searchAccounts()
       *        .round(targetBlock)
       *        .do();
       * ```
       * @remarks For performance reasons, this parameter may be disabled on some configurations.
       * @param round
       * @category query
       */
      round(round) {
        this.query.round = round;
        return this;
      }
      /**
       * Include accounts that use this spending key.
       *
       * #### Example
       * ```typescript
       * const authAddr = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const accounts = await indexerClient
       *        .searchAccounts()
       *        .authAddr(authAddr)
       *        .do();
       * ```
       *
       * @param authAddr
       */
      authAddr(authAddr) {
        this.query["auth-addr"] = authAddr;
        return this;
      }
      /**
       * Filter for this application.
       *
       * #### Example
       * ```typescript
       * const appId = 60553466;
       * const accounts = await indexerClient
       *        .searchAccounts()
       *        .applicationID(appId)
       *        .do();
       * ```
       *
       * @param applicationID
       * @category query
       */
      applicationID(applicationID) {
        this.query["application-id"] = applicationID;
        return this;
      }
      /**
       * Includes all items including closed accounts, deleted applications, destroyed assets, opted-out asset holdings, and closed-out application localstates
       *
       * #### Example 1
       * ```typescript
       * const assetId = 163650;
       * const accounts = await indexerClient
       *        .searchAccounts()
       *        .includeAll(false)
       *        .do();
       * ```
       *
       * #### Example 2
       * ```typescript
       * const assetId = 163650;
       * const accounts = await indexerClient
       *        .searchAccounts()
       *        .includeAll()
       *        .do();
       * ```
       *
       * @param value - default true when called without passing a value
       * @category query
       */
      includeAll(value = true) {
        this.query["include-all"] = value;
        return this;
      }
      /**
       * Exclude additional items such as asset holdings, application local data stored for this account, asset parameters created by this account, and application parameters created by this account.
       *
       * #### Example 1
       * ```typescript
       * const accounts = await indexerClient
       *        .searchAccounts()
       *        .exclude("all")
       *        .do();
       * ```
       *
       * #### Example 2
       * ```typescript
       * const accounts = await indexerClient
       *        .searchAccounts()
       *        .exclude("assets,created-assets")
       *        .do();
       * ```
       * @remarks By default, it behaves as exclude=none
       * @param exclude - Array of `all`, `assets`, `created-assets`, `apps-local-state`, `created-apps`, `none`
       * @category query
       */
      exclude(exclude) {
        this.query.exclude = exclude;
        return this;
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/indexer/searchForTransactions.js
var SearchForTransactions;
var init_searchForTransactions = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/indexer/searchForTransactions.js"() {
    init_jsonrequest();
    init_lookupAccountTransactions();
    SearchForTransactions = class extends JSONRequest {
      /**
       * @returns `/v2/transactions`
       */
      // eslint-disable-next-line class-methods-use-this
      path() {
        return "/v2/transactions";
      }
      /**
       * Specifies a prefix which must be contained in the note field.
       *
       * #### Example
       * ```typescript
       * const notePrefixBase64Encoded = "Y3JlYXRl";
       * const txns = await indexerClient
       *        .searchForTransactions()
       *        .notePrefix(notePrefixBase64Encoded)
       *        .do();
       * ```
       *
       * @param prefix - base64 string or uint8array
       * @category query
       */
      notePrefix(prefix) {
        this.query["note-prefix"] = base64StringFunnel(prefix);
        return this;
      }
      /**
       * Type of transaction to filter with.
       *
       * #### Example
       * ```typescript
       * const txns = await indexerClient
       *        .searchForTransactions()
       *        .txType("keyreg")
       *        .do();
       * ```
       *
       * @param type - one of `pay`, `keyreg`, `acfg`, `axfer`, `afrz`, `appl`, `stpf`
       * @category query
       */
      txType(type) {
        this.query["tx-type"] = type;
        return this;
      }
      /**
       * Type of signature to filter with.
       * - sig: Standard
       * - msig: MultiSig
       * - lsig: LogicSig
       *
       * #### Example
       * ```typescript
       * const txns = await indexerClient
       *        .searchForTransactions()
       *        .sigType("sig")
       *        .do();
       * ```
       *
       * @param type - one of `sig`, `msig`, `lsig`
       * @category query
       */
      sigType(type) {
        this.query["sig-type"] = type;
        return this;
      }
      /**
       * Lookup the specific transaction by ID.
       *
       * #### Example
       * ```typescript
       * const txId = "MEUOC4RQJB23CQZRFRKYEI6WBO73VTTPST5A7B3S5OKBUY6LFUDA";
       * const txns = await indexerClient
       *        .searchForTransactions()
       *        .txid(txId)
       *        .do();
       * ```
       * @remarks Alternatively, use `indexerClient.lookupTransactionByID(txnId).do()`
       * @param txid
       * @category query
       */
      txid(txid) {
        this.query.txid = txid;
        return this;
      }
      /**
       * Include results for the specified round.
       *
       * #### Example
       * ```typescript
       * const targetBlock = 18309917;
       * const txns = await indexerClient
       *        .searchForTransactions()
       *        .round(targetBlock)
       *        .do();
       * ```
       * @remarks Alternatively, use `indexerClient.lookupBlock(targetBlock).do()`
       * @param round
       * @category query
       */
      round(round) {
        this.query.round = round;
        return this;
      }
      /**
       * Include results at or after the specified min-round.
       *
       * #### Example
       * ```typescript
       * const minRound = 18309917;
       * const txns = await indexerClient
       *        .searchForTransactions()
       *        .minRound(minRound)
       *        .do();
       * ```
       *
       * @param round
       * @category query
       */
      minRound(round) {
        this.query["min-round"] = round;
        return this;
      }
      /**
       * Include results at or before the specified max-round.
       *
       * #### Example
       * ```typescript
       * const maxRound = 18309917;
       * const txns = await indexerClient
       *        .searchForTransactions()
       *        .maxRound(maxRound)
       *        .do();
       * ```
       *
       * @param round
       * @category query
       */
      maxRound(round) {
        this.query["max-round"] = round;
        return this;
      }
      /**
       * Asset ID to filter with.
       *
       * #### Example
       * ```typescript
       * const assetID = 163650;
       * const txns = await indexerClient
       *        .searchForTransactions()
       *        .assetID(assetID)
       *        .do();
       * ```
       * @remarks Alternatively, use `indexerClient.lookupAssetTransactions(assetId).do()`
       * @param id
       * @category query
       */
      assetID(id) {
        this.query["asset-id"] = id;
        return this;
      }
      /**
       * Maximum number of results to return.
       *
       * #### Example
       * ```typescript
       * const maxResults = 25;
       * const txns = await indexerClient
       *        .searchForTransactions()
       *        .limit(maxResults)
       *        .do();
       * ```
       *
       * @param limit
       * @category query
       */
      limit(limit) {
        this.query.limit = limit;
        return this;
      }
      /**
       * Include results before the given time.
       *
       * #### Example
       * ```typescript
       * const beforeTime = "2022-02-02T20:20:22.02Z";
       * const txns = await indexerClient
       *        .searchForTransactions()
       *        .beforeTime(beforeTime)
       *        .do();
       * ```
       *
       * @param before - rfc3339 string
       * @category query
       */
      beforeTime(before) {
        this.query["before-time"] = before;
        return this;
      }
      /**
       * Include results after the given time.
       *
       * #### Example
       * ```typescript
       * const afterTime = "2022-10-21T00:00:11.55Z";
       * const txns = await indexerClient
       *        .searchForTransactions()
       *        .afterTime(afterTime)
       *        .do();
       * ```
       *
       * @param after - rfc3339 string
       * @category query
       */
      afterTime(after) {
        this.query["after-time"] = after;
        return this;
      }
      /**
       * Combined with address, defines what address to filter on, as string.
       *
       * #### Example
       * ```typescript
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const role = "freeze-target";
       * const txns = await indexerClient
       *        .searchForTransactions()
       *        .address(address)
       *        .addressRole(role)
       *        .do();
       * ```
       *
       * @param role - one of `sender`, `receiver`, `freeze-target`
       * @category query
       */
      addressRole(role) {
        this.query["address-role"] = role;
        return this;
      }
      /**
       * Only include transactions with this address in one of the transaction fields.
       *
       * #### Example
       * ```typescript
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const txns = await indexerClient
       *        .searchForTransactions()
       *        .address(address)
       *        .do();
       * ```
       * @remarks Alternatively, use `indexerClient.lookupAccountTransactions(address).do()`
       * @param address
       * @category query
       */
      address(address) {
        this.query.address = address;
        return this;
      }
      /**
       * Whether or not to consider the `close-to` field as a receiver when filtering transactions, as bool. Set to `true` to ignore `close-to`.
       *
       * #### Example
       * ```typescript
       * const txns = await indexerClient
       *        .searchForTransactions()
       *        .excludeCloseTo(true)
       *        .do();
       * ```
       *
       * @param exclude
       * @category query
       */
      excludeCloseTo(exclude) {
        this.query["exclude-close-to"] = exclude;
        return this;
      }
      /**
       * The next page of results.
       *
       * #### Example
       * ```typescript
       * const maxResults = 25;
       *
       * const txnsPage1 = await indexerClient
       *        .searchForTransactions()
       *        .limit(maxResults)
       *        .do();
       *
       * const txnsPage2 = await indexerClient
       *        .searchForTransactions()
       *        .limit(maxResults)
       *        .nextToken(txnsPage1["next-token"])
       *        .do();
       * ```
       *
       * @param nextToken - provided by the previous results
       * @category query
       */
      nextToken(nextToken) {
        this.query.next = nextToken;
        return this;
      }
      /**
       * Whether or not to include rekeying transactions.
       *
       * #### Example
       * ```typescript
       * const txns = await indexerClient
       *        .searchForTransactions()
       *        .rekeyTo(false)
       *        .do();
       * ```
       *
       * @param rekeyTo
       * @category query
       */
      rekeyTo(rekeyTo) {
        this.query["rekey-to"] = rekeyTo;
        return this;
      }
      /**
       * Filter for this application.
       *
       * #### Example
       * ```typescript
       * const appId = 60553466;
       * const txns = await indexerClient
       *        .searchForTransactions()
       *        .applicationID(appId)
       *        .do();
       * ```
       *
       * @param applicationID
       * @category query
       */
      applicationID(applicationID) {
        this.query["application-id"] = applicationID;
        return this;
      }
      /**
       * Filtered results should have an amount greater than this value, as int, representing microAlgos, unless an asset-id is provided, in which case units are in the asset's units.
       *
       * #### Example 1
       * ```typescript
       * const minBalance = 300000;
       * const txns = await indexerClient
       *        .searchForTransactions()
       *        .currencyGreaterThan(minBalance - 1)
       *        .do();
       * ```
       *
       * #### Example 2
       * ```typescript
       * const assetID = 163650;
       * const minBalance = 300000;
       * const txns = await indexerClient
       *        .searchForTransactions()
       *        .assetID(assetID)
       *        .currencyGreaterThan(minBalance - 1)
       *        .do();
       * ```
       *
       * @param greater
       * @category query
       */
      currencyGreaterThan(greater) {
        this.query["currency-greater-than"] = greater.toString();
        return this;
      }
      /**
       * Filtered results should have an amount less than this value, as int, representing microAlgos, unless an asset-id is provided, in which case units are in the asset's units.
       *
       * #### Example 1
       * ```typescript
       * const maxBalance = 500000;
       * const txns = await indexerClient
       *        .searchForTransactions()
       *        .currencyLessThan(maxBalance + 1)
       *        .do();
       * ```
       *
       * #### Example 2
       * ```typescript
       * const assetID = 163650;
       * const maxBalance = 500000;
       * const txns = await indexerClient
       *        .searchForTransactions()
       *        .assetID(assetID)
       *        .currencyLessThan(maxBalance + 1)
       *        .do();
       * ```
       *
       * @param lesser
       * @category query
       */
      currencyLessThan(lesser) {
        this.query["currency-less-than"] = lesser;
        return this;
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/indexer/searchForAssets.js
var SearchForAssets;
var init_searchForAssets = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/indexer/searchForAssets.js"() {
    init_jsonrequest();
    SearchForAssets = class extends JSONRequest {
      /**
       * @returns `/v2/assets`
       */
      // eslint-disable-next-line class-methods-use-this
      path() {
        return "/v2/assets";
      }
      /**
       * Limit results for pagination.
       *
       * #### Example
       * ```typescript
       * const maxResults = 20;
       * const assets = await indexerClient
       *        .searchForAssets()
       *        .limit(maxResults)
       *        .do();
       * ```
       *
       * @param limit - maximum number of results to return.
       * @category query
       */
      limit(limit) {
        this.query.limit = limit;
        return this;
      }
      /**
       * Filter just assets with the given creator address.
       *
       * #### Example
       * ```typescript
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const assets = await indexerClient
       *        .searchForAssets()
       *        .creator(address)
       *        .do();
       * ```
       *
       * @param creator
       * @category query
       */
      creator(creator) {
        this.query.creator = creator;
        return this;
      }
      /**
       * Filter just assets with the given name.
       *
       * #### Example
       * ```typescript
       * const name = "Test Token";
       * const assets = await indexerClient
       *        .searchForAssets()
       *        .name(name)
       *        .do();
       * ```
       *
       * @param name
       * @category query
       */
      name(name) {
        this.query.name = name;
        return this;
      }
      /**
       * Filter just assets with the given unit.
       *
       * #### Example
       * ```typescript
       * const unit = "test";
       * const assets = await indexerClient
       *        .searchForAssets()
       *        .unit(unit)
       *        .do();
       * ```
       *
       * @param unit
       * @category query
       */
      unit(unit) {
        this.query.unit = unit;
        return this;
      }
      /**
       * Asset ID for filter, as int.
       *
       * #### Example
       * ```typescript
       * const assetId = 163650;
       * const assets = await indexerClient
       *        .searchForAssets()
       *        .index(assetId)
       *        .do();
       * ```
       * @remarks Alternatively, use `indexerClient.lookupAssetByID(assetId).do();`
       * @param index
       * @category query
       */
      index(index) {
        this.query["asset-id"] = index;
        return this;
      }
      /**
       * Specify the next page of results.
       *
       * #### Example
       * ```typescript
       * const maxResults = 20;
       *
       * const assetsPage1 = await indexerClient
       *        .searchForAssets()
       *        .limit(maxResults)
       *        .do();
       *
       * const assetsPage2 = await indexerClient
       *        .searchForAssets()
       *        .limit(maxResults)
       *        .nextToken(assetsPage1["next-token"])
       *        .do();
       * ```
       * @param nextToken - provided by the previous results.
       * @category query
       */
      nextToken(nextToken) {
        this.query.next = nextToken;
        return this;
      }
      /**
       * Includes all items including closed accounts, deleted applications, destroyed assets, opted-out asset holdings, and closed-out application localstates
       *
       * #### Example 1
       * ```typescript
       * const assets = await indexerClient
       *        .searchForAssets()
       *        .includeAll(false)
       *        .do();
       * ```
       *
       * #### Example 2
       * ```typescript
       * const assets = await indexerClient
       *        .searchForAssets()
       *        .includeAll()
       *        .do();
       * ```
       *
       * @param value - default true when called without passing a value
       * @category query
       */
      includeAll(value = true) {
        this.query["include-all"] = value;
        return this;
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/indexer/searchForApplications.js
var SearchForApplications;
var init_searchForApplications = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/indexer/searchForApplications.js"() {
    init_jsonrequest();
    SearchForApplications = class extends JSONRequest {
      /**
       * @returns `/v2/applications`
       */
      // eslint-disable-next-line class-methods-use-this
      path() {
        return "/v2/applications";
      }
      /**
       * Application ID for filter, as int
       *
       * #### Example
       * ```typescript
       * const appId = 60553466;
       * const apps = await indexerClient
       *        .searchForApplications()
       *        .index(appId)
       *        .do();
       * ```
       * @remarks Alternatively, use `indexerClient.lookupApplications(appId).do()`
       * @param index
       * @category query
       */
      index(index) {
        this.query["application-id"] = index;
        return this;
      }
      /**
       * Creator for filter, as string
       *
       * #### Example
       * ```typescript
       * const creator = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const apps = await indexerClient
       *        .searchForApplications()
       *        .creator(creator)
       *        .do();
       * ```
       * @param creator
       * @category query
       */
      creator(creator) {
        this.query.creator = creator;
        return this;
      }
      /**
       * Specify the next page of results.
       *
       * #### Example
       * ```typescript
       * const maxResults = 20;
       *
       * const appsPage1 = await indexerClient
       *        .searchForApplications()
       *        .limit(maxResults)
       *        .do();
       *
       * const appsPage2 = await indexerClient
       *        .searchForApplications()
       *        .limit(maxResults)
       *        .nextToken(appsPage1["next-token"])
       *        .do();
       * ```
       * @param nextToken - provided by the previous results.
       * @category query
       */
      nextToken(next) {
        this.query.next = next;
        return this;
      }
      /**
       * Limit results for pagination.
       *
       * #### Example
       * ```typescript
       * const maxResults = 20;
       * const apps = await indexerClient
       *        .searchForApplications()
       *        .limit(maxResults)
       *        .do();
       * ```
       *
       * @param limit - maximum number of results to return.
       * @category query
       */
      limit(limit) {
        this.query.limit = limit;
        return this;
      }
      /**
       * Includes all items including closed accounts, deleted applications, destroyed assets, opted-out asset holdings, and closed-out application localstates
       *
       * #### Example 1
       * ```typescript
       * const apps = await indexerClient
       *        .searchForApplications()
       *        .includeAll(false)
       *        .do();
       * ```
       *
       * #### Example 2
       * ```typescript
       * const apps = await indexerClient
       *        .searchForApplications()
       *        .includeAll()
       *        .do();
       * ```
       *
       * @param value - default true when called without passing a value
       * @category query
       */
      includeAll(value = true) {
        this.query["include-all"] = value;
        return this;
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/indexer/searchForApplicationBoxes.js
var SearchForApplicationBoxes;
var init_searchForApplicationBoxes = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/indexer/searchForApplicationBoxes.js"() {
    init_jsonrequest();
    init_types2();
    SearchForApplicationBoxes = class extends JSONRequest {
      /**
       * Returns information about indexed application boxes.
       *
       * #### Example
       * ```typescript
       * const maxResults = 20;
       * const appID = 1234;
       *
       * const responsePage1 = await indexerClient
       *        .searchForApplicationBoxes(appID)
       *        .limit(maxResults)
       *        .do();
       * const boxNamesPage1 = responsePage1.boxes.map(box => box.name);
       *
       * const responsePage2 = await indexerClient
       *        .searchForApplicationBoxes(appID)
       *        .limit(maxResults)
       *        .nextToken(responsePage1.nextToken)
       *        .do();
       * const boxNamesPage2 = responsePage2.boxes.map(box => box.name);
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2applicationsapplication-idboxes)
       * @oaram index - application index.
       * @category GET
       */
      constructor(c, intDecoding, index) {
        super(c, intDecoding);
        this.index = index;
        this.index = index;
      }
      /**
       * @returns `/v2/applications/${index}/boxes`
       */
      path() {
        return `/v2/applications/${this.index}/boxes`;
      }
      /**
       * Specify the next page of results.
       *
       * #### Example
       * ```typescript
       * const maxResults = 20;
       * const appID = 1234;
       *
       * const responsePage1 = await indexerClient
       *        .searchForApplicationBoxes(appID)
       *        .limit(maxResults)
       *        .do();
       * const boxNamesPage1 = responsePage1.boxes.map(box => box.name);
       *
       * const responsePage2 = await indexerClient
       *        .searchForApplicationBoxes(appID)
       *        .limit(maxResults)
       *        .nextToken(responsePage1.nextToken)
       *        .do();
       * const boxNamesPage2 = responsePage2.boxes.map(box => box.name);
       * ```
       * @param nextToken - provided by the previous results.
       * @category query
       */
      nextToken(next) {
        this.query.next = next;
        return this;
      }
      /**
       * Limit results for pagination.
       *
       * #### Example
       * ```typescript
       * const maxResults = 20;
       * const boxesResponse = await indexerClient
       *        .searchForApplicationBoxes(1234)
       *        .limit(maxResults)
       *        .do();
       * ```
       *
       * @param limit - maximum number of results to return.
       * @category query
       */
      limit(limit) {
        this.query.limit = limit;
        return this;
      }
      // eslint-disable-next-line class-methods-use-this
      prepare(body) {
        return BoxesResponse2.from_obj_for_encoding(body);
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/indexer/indexer.js
var IndexerClient;
var init_indexer = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/client/v2/indexer/indexer.js"() {
    init_serviceClient();
    init_makeHealthCheck();
    init_lookupAssetBalances();
    init_lookupAssetTransactions();
    init_lookupAccountTransactions();
    init_lookupBlock();
    init_lookupTransactionByID();
    init_lookupAccountByID();
    init_lookupAccountAssets();
    init_lookupAccountCreatedAssets();
    init_lookupAccountAppLocalStates();
    init_lookupAccountCreatedApplications();
    init_lookupAssetByID();
    init_lookupApplications();
    init_lookupApplicationLogs();
    init_lookupApplicationBoxByIDandName();
    init_searchAccounts();
    init_searchForTransactions();
    init_searchForAssets();
    init_searchForApplications();
    init_searchForApplicationBoxes();
    IndexerClient = class extends ServiceClient {
      /**
       * Create an IndexerClient from
       * * either a token, baseServer, port, and optional headers
       * * or a base client server for interoperability with external dApp wallets
       *
       * #### Example
       * ```typescript
       * const token  = "";
       * const server = "http://localhost";
       * const port   = 8980;
       * const indexerClient = new algosdk.Indexer(token, server, port);
       * ```
       * @remarks
       * The above configuration is for a sandbox private network.
       * For applications on production, you are encouraged to run your own node with indexer, or use an Algorand REST API provider with a dedicated API key.
       *
       * @param tokenOrBaseClient - The API token for the Indexer API
       * @param baseServer - REST endpoint
       * @param port - Port number if specifically configured by the server
       * @param headers - Optional headers
       */
      constructor(tokenOrBaseClient, baseServer = "http://127.0.0.1", port = 8080, headers = {}) {
        super("X-Indexer-API-Token", tokenOrBaseClient, baseServer, port, headers);
      }
      /**
       * Returns the health object for the service.
       * Returns 200 if healthy.
       *
       * #### Example
       * ```typescript
       * const health = await indexerClient.makeHealthCheck().do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-health)
       * @category GET
       */
      makeHealthCheck() {
        return new MakeHealthCheck(this.c, this.intDecoding);
      }
      /**
       * Returns the list of accounts who hold the given asset and their balance.
       *
       * #### Example
       * ```typescript
       * const assetId = 163650;
       * const assetBalances = await indexerClient.lookupAssetBalances(assetId).do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2assetsasset-idbalances)
       * @param index - The asset ID to look up.
       * @category GET
       */
      lookupAssetBalances(index) {
        return new LookupAssetBalances(this.c, this.intDecoding, index);
      }
      /**
       * Returns transactions relating to the given asset.
       *
       * #### Example
       * ```typescript
       * const assetId = 163650;
       * const assetTxns = await indexerClient.lookupAssetTransactions(assetId).do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2assetsasset-idtransactions)
       * @param index - The asset ID to look up.
       * @category GET
       */
      lookupAssetTransactions(index) {
        return new LookupAssetTransactions(this.c, this.intDecoding, index);
      }
      /**
       * Returns transactions relating to the given account.
       *
       * #### Example
       * ```typescript
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const accountTxns = await indexerClient.lookupAccountTransactions(address).do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2accountsaccount-idtransactions)
       * @param account - The address of the account.
       * @category GET
       */
      lookupAccountTransactions(account) {
        return new LookupAccountTransactions(this.c, this.intDecoding, account);
      }
      /**
       * Returns the block for the passed round.
       *
       * #### Example
       * ```typescript
       * const targetBlock = 18309917;
       * const blockInfo = await indexerClient.lookupBlock(targetBlock).do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2blocksround-number)
       * @param round - The number of the round to look up.
       * @category GET
       */
      lookupBlock(round) {
        return new LookupBlock(this.c, this.intDecoding, round);
      }
      /**
       * Returns information about the given transaction.
       *
       * #### Example
       * ```typescript
       * const txnId = "MEUOC4RQJB23CQZRFRKYEI6WBO73VTTPST5A7B3S5OKBUY6LFUDA";
       * const txnInfo = await indexerClient.lookupTransactionByID(txnId).do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2transactionstxid)
       * @param txID - The ID of the transaction to look up.
       * @category GET
       */
      lookupTransactionByID(txID) {
        return new LookupTransactionByID(this.c, this.intDecoding, txID);
      }
      /**
       * Returns information about the given account.
       *
       * #### Example
       * ```typescript
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const accountInfo = await indexerClient.lookupAccountByID(address).do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2accountsaccount-id)
       * @param account - The address of the account to look up.
       * @category GET
       */
      lookupAccountByID(account) {
        return new LookupAccountByID(this.c, this.intDecoding, account);
      }
      /**
       * Returns asset about the given account.
       *
       * #### Example
       * ```typescript
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const accountAssets = await indexerClient.lookupAccountAssets(address).do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2accountsaccount-idassets)
       * @param account - The address of the account to look up.
       * @category GET
       */
      lookupAccountAssets(account) {
        return new LookupAccountAssets(this.c, this.intDecoding, account);
      }
      /**
       * Returns asset information created by the given account.
       *
       * #### Example
       * ```typescript
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const accountCreatedAssets = await indexerClient.lookupAccountCreatedAssets(address).do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2accountsaccount-idcreated-assets)
       * @param account - The address of the account to look up.
       * @category GET
       */
      lookupAccountCreatedAssets(account) {
        return new LookupAccountCreatedAssets(this.c, this.intDecoding, account);
      }
      /**
       * Returns application local state about the given account.
       *
       * #### Example
       * ```typescript
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const accountAppLocalStates = await indexerClient.lookupAccountAppLocalStates(address).do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2accountsaccount-idapps-local-state)
       * @param account - The address of the account to look up.
       * @category GET
       */
      lookupAccountAppLocalStates(account) {
        return new LookupAccountAppLocalStates(this.c, this.intDecoding, account);
      }
      /**
       * Returns application information created by the given account.
       *
       * #### Example
       * ```typescript
       * const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
       * const accountCreatedApps = await indexerClient.lookupAccountCreatedApplications(address).do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2accountsaccount-idcreated-applications)
       * @param account - The address of the account to look up.
       * @category GET
       */
      lookupAccountCreatedApplications(account) {
        return new LookupAccountCreatedApplications(this.c, this.intDecoding, account);
      }
      /**
       * Returns information about the passed asset.
       *
       * #### Example
       * ```typescript
       * const assetId = 163650;
       * const assetInfo = await indexerClient.lookupAssetByID(assetId).do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2assetsasset-id)
       * @param index - The ID of the asset ot look up.
       * @category GET
       */
      lookupAssetByID(index) {
        return new LookupAssetByID(this.c, this.intDecoding, index);
      }
      /**
       * Returns information about the passed application.
       *
       * #### Example
       * ```typescript
       * const appId = 60553466;
       * const appInfo = await indexerClient.lookupApplications(appId).do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2applicationsapplication-id)
       * @param index - The ID of the application to look up.
       * @category GET
       */
      lookupApplications(index) {
        return new LookupApplications(this.c, this.intDecoding, index);
      }
      /**
       * Returns log messages generated by the passed in application.
       *
       * #### Example
       * ```typescript
       * const appId = 60553466;
       * const appLogs = await indexerClient.lookupApplicationLogs(appId).do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2applicationsapplication-idlogs)
       * @param appID - The ID of the application which generated the logs.
       * @category GET
       */
      lookupApplicationLogs(appID) {
        return new LookupApplicationLogs(this.c, this.intDecoding, appID);
      }
      /**
       * Returns information about indexed accounts.
       *
       * #### Example
       * ```typescript
       * const accounts = await indexerClient.searchAccounts().do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2accounts)
       * @category GET
       */
      searchAccounts() {
        return new SearchAccounts(this.c, this.intDecoding);
      }
      /**
       * Returns information about indexed transactions.
       *
       * #### Example
       * ```typescript
       * const txns = await indexerClient.searchForTransactions().do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2transactions)
       * @category GET
       */
      searchForTransactions() {
        return new SearchForTransactions(this.c, this.intDecoding);
      }
      /**
       * Returns information about indexed assets.
       *
       * #### Example
       * ```typescript
       * const assets = await indexerClient.searchForAssets().do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2assets)
       * @category GET
       */
      searchForAssets() {
        return new SearchForAssets(this.c, this.intDecoding);
      }
      /**
       * Returns information about indexed applications.
       *
       * #### Example
       * ```typescript
       * const apps = await indexerClient.searchForApplications().do();
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2applications)
       * @category GET
       */
      searchForApplications() {
        return new SearchForApplications(this.c, this.intDecoding);
      }
      /**
       * Returns information about indexed application boxes.
       *
       * #### Example
       * ```typescript
       * const maxResults = 20;
       * const appID = 1234;
       *
       * const responsePage1 = await indexerClient
       *        .searchForApplicationBoxes(appID)
       *        .limit(maxResults)
       *        .do();
       * const boxNamesPage1 = responsePage1.boxes.map(box => box.name);
       *
       * const responsePage2 = await indexerClient
       *        .searchForApplicationBoxes(appID)
       *        .limit(maxResults)
       *        .nextToken(responsePage1.nextToken)
       *        .do();
       * const boxNamesPage2 = responsePage2.boxes.map(box => box.name);
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2applicationsapplication-idboxes)
       * @param appID - The ID of the application with boxes.
       * @category GET
       */
      searchForApplicationBoxes(appID) {
        return new SearchForApplicationBoxes(this.c, this.intDecoding, appID);
      }
      /**
       * Returns information about the application box given its name.
       *
       * #### Example
       * ```typescript
       * const boxName = Buffer.from("foo");
       * const boxResponse = await indexerClient
       *        .LookupApplicationBoxByIDandName(1234, boxName)
       *        .do();
       * const boxValue = boxResponse.value;
       * ```
       *
       * [Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2applicationsapplication-idbox)
       * @param appID - The ID of the application with boxes.
       * @category GET
       */
      lookupApplicationBoxByIDandName(appID, boxName) {
        return new LookupApplicationBoxByIDandName(this.c, this.intDecoding, appID, boxName);
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/wait.js
async function waitForConfirmation(client, txid, waitRounds) {
  const status = await client.status().do();
  if (typeof status === "undefined") {
    throw new Error("Unable to get node status");
  }
  const startRound = status["last-round"] + 1;
  let currentRound = startRound;
  while (currentRound < startRound + waitRounds) {
    let poolError = false;
    try {
      const pendingInfo = await client.pendingTransactionInformation(txid).do();
      if (pendingInfo["confirmed-round"]) {
        return pendingInfo;
      }
      if (pendingInfo["pool-error"]) {
        poolError = true;
        throw new Error(`Transaction Rejected: ${pendingInfo["pool-error"]}`);
      }
    } catch (err) {
      if (poolError) {
        throw err;
      }
    }
    await client.statusAfterBlock(currentRound).do();
    currentRound += 1;
  }
  throw new Error(`Transaction not confirmed after ${waitRounds} rounds`);
}
var init_wait = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/wait.js"() {
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/encoding/bigint.js
function bigIntToBytes(bi, size) {
  let hex = bi.toString(16);
  if (hex.length !== size * 2) {
    hex = hex.padStart(size * 2, "0");
  }
  const byteArray = new Uint8Array(hex.length / 2);
  for (let i = 0, j = 0; i < hex.length / 2; i++, j += 2) {
    byteArray[i] = parseInt(hex.slice(j, j + 2), 16);
  }
  return byteArray;
}
function bytesToBigInt(bytes) {
  let res = BigInt(0);
  const buf = Buffer.from(bytes);
  for (let i = 0; i < bytes.length; i++) {
    res = BigInt(Number(buf.readUIntBE(i, 1))) + res * BigInt(256);
  }
  return res;
}
var init_bigint = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/encoding/bigint.js"() {
    init_buffer();
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/account.js
function generateAccount() {
  const keys = keyPair();
  const encodedPk = encodeAddress(keys.publicKey);
  return { addr: encodedPk, sk: keys.secretKey };
}
var init_account = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/account.js"() {
    init_naclWrappers();
    init_address();
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/mnemonic/wordlists/english.js
var english, english_default;
var init_english = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/mnemonic/wordlists/english.js"() {
    english = [
      "abandon",
      "ability",
      "able",
      "about",
      "above",
      "absent",
      "absorb",
      "abstract",
      "absurd",
      "abuse",
      "access",
      "accident",
      "account",
      "accuse",
      "achieve",
      "acid",
      "acoustic",
      "acquire",
      "across",
      "act",
      "action",
      "actor",
      "actress",
      "actual",
      "adapt",
      "add",
      "addict",
      "address",
      "adjust",
      "admit",
      "adult",
      "advance",
      "advice",
      "aerobic",
      "affair",
      "afford",
      "afraid",
      "again",
      "age",
      "agent",
      "agree",
      "ahead",
      "aim",
      "air",
      "airport",
      "aisle",
      "alarm",
      "album",
      "alcohol",
      "alert",
      "alien",
      "all",
      "alley",
      "allow",
      "almost",
      "alone",
      "alpha",
      "already",
      "also",
      "alter",
      "always",
      "amateur",
      "amazing",
      "among",
      "amount",
      "amused",
      "analyst",
      "anchor",
      "ancient",
      "anger",
      "angle",
      "angry",
      "animal",
      "ankle",
      "announce",
      "annual",
      "another",
      "answer",
      "antenna",
      "antique",
      "anxiety",
      "any",
      "apart",
      "apology",
      "appear",
      "apple",
      "approve",
      "april",
      "arch",
      "arctic",
      "area",
      "arena",
      "argue",
      "arm",
      "armed",
      "armor",
      "army",
      "around",
      "arrange",
      "arrest",
      "arrive",
      "arrow",
      "art",
      "artefact",
      "artist",
      "artwork",
      "ask",
      "aspect",
      "assault",
      "asset",
      "assist",
      "assume",
      "asthma",
      "athlete",
      "atom",
      "attack",
      "attend",
      "attitude",
      "attract",
      "auction",
      "audit",
      "august",
      "aunt",
      "author",
      "auto",
      "autumn",
      "average",
      "avocado",
      "avoid",
      "awake",
      "aware",
      "away",
      "awesome",
      "awful",
      "awkward",
      "axis",
      "baby",
      "bachelor",
      "bacon",
      "badge",
      "bag",
      "balance",
      "balcony",
      "ball",
      "bamboo",
      "banana",
      "banner",
      "bar",
      "barely",
      "bargain",
      "barrel",
      "base",
      "basic",
      "basket",
      "battle",
      "beach",
      "bean",
      "beauty",
      "because",
      "become",
      "beef",
      "before",
      "begin",
      "behave",
      "behind",
      "believe",
      "below",
      "belt",
      "bench",
      "benefit",
      "best",
      "betray",
      "better",
      "between",
      "beyond",
      "bicycle",
      "bid",
      "bike",
      "bind",
      "biology",
      "bird",
      "birth",
      "bitter",
      "black",
      "blade",
      "blame",
      "blanket",
      "blast",
      "bleak",
      "bless",
      "blind",
      "blood",
      "blossom",
      "blouse",
      "blue",
      "blur",
      "blush",
      "board",
      "boat",
      "body",
      "boil",
      "bomb",
      "bone",
      "bonus",
      "book",
      "boost",
      "border",
      "boring",
      "borrow",
      "boss",
      "bottom",
      "bounce",
      "box",
      "boy",
      "bracket",
      "brain",
      "brand",
      "brass",
      "brave",
      "bread",
      "breeze",
      "brick",
      "bridge",
      "brief",
      "bright",
      "bring",
      "brisk",
      "broccoli",
      "broken",
      "bronze",
      "broom",
      "brother",
      "brown",
      "brush",
      "bubble",
      "buddy",
      "budget",
      "buffalo",
      "build",
      "bulb",
      "bulk",
      "bullet",
      "bundle",
      "bunker",
      "burden",
      "burger",
      "burst",
      "bus",
      "business",
      "busy",
      "butter",
      "buyer",
      "buzz",
      "cabbage",
      "cabin",
      "cable",
      "cactus",
      "cage",
      "cake",
      "call",
      "calm",
      "camera",
      "camp",
      "can",
      "canal",
      "cancel",
      "candy",
      "cannon",
      "canoe",
      "canvas",
      "canyon",
      "capable",
      "capital",
      "captain",
      "car",
      "carbon",
      "card",
      "cargo",
      "carpet",
      "carry",
      "cart",
      "case",
      "cash",
      "casino",
      "castle",
      "casual",
      "cat",
      "catalog",
      "catch",
      "category",
      "cattle",
      "caught",
      "cause",
      "caution",
      "cave",
      "ceiling",
      "celery",
      "cement",
      "census",
      "century",
      "cereal",
      "certain",
      "chair",
      "chalk",
      "champion",
      "change",
      "chaos",
      "chapter",
      "charge",
      "chase",
      "chat",
      "cheap",
      "check",
      "cheese",
      "chef",
      "cherry",
      "chest",
      "chicken",
      "chief",
      "child",
      "chimney",
      "choice",
      "choose",
      "chronic",
      "chuckle",
      "chunk",
      "churn",
      "cigar",
      "cinnamon",
      "circle",
      "citizen",
      "city",
      "civil",
      "claim",
      "clap",
      "clarify",
      "claw",
      "clay",
      "clean",
      "clerk",
      "clever",
      "click",
      "client",
      "cliff",
      "climb",
      "clinic",
      "clip",
      "clock",
      "clog",
      "close",
      "cloth",
      "cloud",
      "clown",
      "club",
      "clump",
      "cluster",
      "clutch",
      "coach",
      "coast",
      "coconut",
      "code",
      "coffee",
      "coil",
      "coin",
      "collect",
      "color",
      "column",
      "combine",
      "come",
      "comfort",
      "comic",
      "common",
      "company",
      "concert",
      "conduct",
      "confirm",
      "congress",
      "connect",
      "consider",
      "control",
      "convince",
      "cook",
      "cool",
      "copper",
      "copy",
      "coral",
      "core",
      "corn",
      "correct",
      "cost",
      "cotton",
      "couch",
      "country",
      "couple",
      "course",
      "cousin",
      "cover",
      "coyote",
      "crack",
      "cradle",
      "craft",
      "cram",
      "crane",
      "crash",
      "crater",
      "crawl",
      "crazy",
      "cream",
      "credit",
      "creek",
      "crew",
      "cricket",
      "crime",
      "crisp",
      "critic",
      "crop",
      "cross",
      "crouch",
      "crowd",
      "crucial",
      "cruel",
      "cruise",
      "crumble",
      "crunch",
      "crush",
      "cry",
      "crystal",
      "cube",
      "culture",
      "cup",
      "cupboard",
      "curious",
      "current",
      "curtain",
      "curve",
      "cushion",
      "custom",
      "cute",
      "cycle",
      "dad",
      "damage",
      "damp",
      "dance",
      "danger",
      "daring",
      "dash",
      "daughter",
      "dawn",
      "day",
      "deal",
      "debate",
      "debris",
      "decade",
      "december",
      "decide",
      "decline",
      "decorate",
      "decrease",
      "deer",
      "defense",
      "define",
      "defy",
      "degree",
      "delay",
      "deliver",
      "demand",
      "demise",
      "denial",
      "dentist",
      "deny",
      "depart",
      "depend",
      "deposit",
      "depth",
      "deputy",
      "derive",
      "describe",
      "desert",
      "design",
      "desk",
      "despair",
      "destroy",
      "detail",
      "detect",
      "develop",
      "device",
      "devote",
      "diagram",
      "dial",
      "diamond",
      "diary",
      "dice",
      "diesel",
      "diet",
      "differ",
      "digital",
      "dignity",
      "dilemma",
      "dinner",
      "dinosaur",
      "direct",
      "dirt",
      "disagree",
      "discover",
      "disease",
      "dish",
      "dismiss",
      "disorder",
      "display",
      "distance",
      "divert",
      "divide",
      "divorce",
      "dizzy",
      "doctor",
      "document",
      "dog",
      "doll",
      "dolphin",
      "domain",
      "donate",
      "donkey",
      "donor",
      "door",
      "dose",
      "double",
      "dove",
      "draft",
      "dragon",
      "drama",
      "drastic",
      "draw",
      "dream",
      "dress",
      "drift",
      "drill",
      "drink",
      "drip",
      "drive",
      "drop",
      "drum",
      "dry",
      "duck",
      "dumb",
      "dune",
      "during",
      "dust",
      "dutch",
      "duty",
      "dwarf",
      "dynamic",
      "eager",
      "eagle",
      "early",
      "earn",
      "earth",
      "easily",
      "east",
      "easy",
      "echo",
      "ecology",
      "economy",
      "edge",
      "edit",
      "educate",
      "effort",
      "egg",
      "eight",
      "either",
      "elbow",
      "elder",
      "electric",
      "elegant",
      "element",
      "elephant",
      "elevator",
      "elite",
      "else",
      "embark",
      "embody",
      "embrace",
      "emerge",
      "emotion",
      "employ",
      "empower",
      "empty",
      "enable",
      "enact",
      "end",
      "endless",
      "endorse",
      "enemy",
      "energy",
      "enforce",
      "engage",
      "engine",
      "enhance",
      "enjoy",
      "enlist",
      "enough",
      "enrich",
      "enroll",
      "ensure",
      "enter",
      "entire",
      "entry",
      "envelope",
      "episode",
      "equal",
      "equip",
      "era",
      "erase",
      "erode",
      "erosion",
      "error",
      "erupt",
      "escape",
      "essay",
      "essence",
      "estate",
      "eternal",
      "ethics",
      "evidence",
      "evil",
      "evoke",
      "evolve",
      "exact",
      "example",
      "excess",
      "exchange",
      "excite",
      "exclude",
      "excuse",
      "execute",
      "exercise",
      "exhaust",
      "exhibit",
      "exile",
      "exist",
      "exit",
      "exotic",
      "expand",
      "expect",
      "expire",
      "explain",
      "expose",
      "express",
      "extend",
      "extra",
      "eye",
      "eyebrow",
      "fabric",
      "face",
      "faculty",
      "fade",
      "faint",
      "faith",
      "fall",
      "false",
      "fame",
      "family",
      "famous",
      "fan",
      "fancy",
      "fantasy",
      "farm",
      "fashion",
      "fat",
      "fatal",
      "father",
      "fatigue",
      "fault",
      "favorite",
      "feature",
      "february",
      "federal",
      "fee",
      "feed",
      "feel",
      "female",
      "fence",
      "festival",
      "fetch",
      "fever",
      "few",
      "fiber",
      "fiction",
      "field",
      "figure",
      "file",
      "film",
      "filter",
      "final",
      "find",
      "fine",
      "finger",
      "finish",
      "fire",
      "firm",
      "first",
      "fiscal",
      "fish",
      "fit",
      "fitness",
      "fix",
      "flag",
      "flame",
      "flash",
      "flat",
      "flavor",
      "flee",
      "flight",
      "flip",
      "float",
      "flock",
      "floor",
      "flower",
      "fluid",
      "flush",
      "fly",
      "foam",
      "focus",
      "fog",
      "foil",
      "fold",
      "follow",
      "food",
      "foot",
      "force",
      "forest",
      "forget",
      "fork",
      "fortune",
      "forum",
      "forward",
      "fossil",
      "foster",
      "found",
      "fox",
      "fragile",
      "frame",
      "frequent",
      "fresh",
      "friend",
      "fringe",
      "frog",
      "front",
      "frost",
      "frown",
      "frozen",
      "fruit",
      "fuel",
      "fun",
      "funny",
      "furnace",
      "fury",
      "future",
      "gadget",
      "gain",
      "galaxy",
      "gallery",
      "game",
      "gap",
      "garage",
      "garbage",
      "garden",
      "garlic",
      "garment",
      "gas",
      "gasp",
      "gate",
      "gather",
      "gauge",
      "gaze",
      "general",
      "genius",
      "genre",
      "gentle",
      "genuine",
      "gesture",
      "ghost",
      "giant",
      "gift",
      "giggle",
      "ginger",
      "giraffe",
      "girl",
      "give",
      "glad",
      "glance",
      "glare",
      "glass",
      "glide",
      "glimpse",
      "globe",
      "gloom",
      "glory",
      "glove",
      "glow",
      "glue",
      "goat",
      "goddess",
      "gold",
      "good",
      "goose",
      "gorilla",
      "gospel",
      "gossip",
      "govern",
      "gown",
      "grab",
      "grace",
      "grain",
      "grant",
      "grape",
      "grass",
      "gravity",
      "great",
      "green",
      "grid",
      "grief",
      "grit",
      "grocery",
      "group",
      "grow",
      "grunt",
      "guard",
      "guess",
      "guide",
      "guilt",
      "guitar",
      "gun",
      "gym",
      "habit",
      "hair",
      "half",
      "hammer",
      "hamster",
      "hand",
      "happy",
      "harbor",
      "hard",
      "harsh",
      "harvest",
      "hat",
      "have",
      "hawk",
      "hazard",
      "head",
      "health",
      "heart",
      "heavy",
      "hedgehog",
      "height",
      "hello",
      "helmet",
      "help",
      "hen",
      "hero",
      "hidden",
      "high",
      "hill",
      "hint",
      "hip",
      "hire",
      "history",
      "hobby",
      "hockey",
      "hold",
      "hole",
      "holiday",
      "hollow",
      "home",
      "honey",
      "hood",
      "hope",
      "horn",
      "horror",
      "horse",
      "hospital",
      "host",
      "hotel",
      "hour",
      "hover",
      "hub",
      "huge",
      "human",
      "humble",
      "humor",
      "hundred",
      "hungry",
      "hunt",
      "hurdle",
      "hurry",
      "hurt",
      "husband",
      "hybrid",
      "ice",
      "icon",
      "idea",
      "identify",
      "idle",
      "ignore",
      "ill",
      "illegal",
      "illness",
      "image",
      "imitate",
      "immense",
      "immune",
      "impact",
      "impose",
      "improve",
      "impulse",
      "inch",
      "include",
      "income",
      "increase",
      "index",
      "indicate",
      "indoor",
      "industry",
      "infant",
      "inflict",
      "inform",
      "inhale",
      "inherit",
      "initial",
      "inject",
      "injury",
      "inmate",
      "inner",
      "innocent",
      "input",
      "inquiry",
      "insane",
      "insect",
      "inside",
      "inspire",
      "install",
      "intact",
      "interest",
      "into",
      "invest",
      "invite",
      "involve",
      "iron",
      "island",
      "isolate",
      "issue",
      "item",
      "ivory",
      "jacket",
      "jaguar",
      "jar",
      "jazz",
      "jealous",
      "jeans",
      "jelly",
      "jewel",
      "job",
      "join",
      "joke",
      "journey",
      "joy",
      "judge",
      "juice",
      "jump",
      "jungle",
      "junior",
      "junk",
      "just",
      "kangaroo",
      "keen",
      "keep",
      "ketchup",
      "key",
      "kick",
      "kid",
      "kidney",
      "kind",
      "kingdom",
      "kiss",
      "kit",
      "kitchen",
      "kite",
      "kitten",
      "kiwi",
      "knee",
      "knife",
      "knock",
      "know",
      "lab",
      "label",
      "labor",
      "ladder",
      "lady",
      "lake",
      "lamp",
      "language",
      "laptop",
      "large",
      "later",
      "latin",
      "laugh",
      "laundry",
      "lava",
      "law",
      "lawn",
      "lawsuit",
      "layer",
      "lazy",
      "leader",
      "leaf",
      "learn",
      "leave",
      "lecture",
      "left",
      "leg",
      "legal",
      "legend",
      "leisure",
      "lemon",
      "lend",
      "length",
      "lens",
      "leopard",
      "lesson",
      "letter",
      "level",
      "liar",
      "liberty",
      "library",
      "license",
      "life",
      "lift",
      "light",
      "like",
      "limb",
      "limit",
      "link",
      "lion",
      "liquid",
      "list",
      "little",
      "live",
      "lizard",
      "load",
      "loan",
      "lobster",
      "local",
      "lock",
      "logic",
      "lonely",
      "long",
      "loop",
      "lottery",
      "loud",
      "lounge",
      "love",
      "loyal",
      "lucky",
      "luggage",
      "lumber",
      "lunar",
      "lunch",
      "luxury",
      "lyrics",
      "machine",
      "mad",
      "magic",
      "magnet",
      "maid",
      "mail",
      "main",
      "major",
      "make",
      "mammal",
      "man",
      "manage",
      "mandate",
      "mango",
      "mansion",
      "manual",
      "maple",
      "marble",
      "march",
      "margin",
      "marine",
      "market",
      "marriage",
      "mask",
      "mass",
      "master",
      "match",
      "material",
      "math",
      "matrix",
      "matter",
      "maximum",
      "maze",
      "meadow",
      "mean",
      "measure",
      "meat",
      "mechanic",
      "medal",
      "media",
      "melody",
      "melt",
      "member",
      "memory",
      "mention",
      "menu",
      "mercy",
      "merge",
      "merit",
      "merry",
      "mesh",
      "message",
      "metal",
      "method",
      "middle",
      "midnight",
      "milk",
      "million",
      "mimic",
      "mind",
      "minimum",
      "minor",
      "minute",
      "miracle",
      "mirror",
      "misery",
      "miss",
      "mistake",
      "mix",
      "mixed",
      "mixture",
      "mobile",
      "model",
      "modify",
      "mom",
      "moment",
      "monitor",
      "monkey",
      "monster",
      "month",
      "moon",
      "moral",
      "more",
      "morning",
      "mosquito",
      "mother",
      "motion",
      "motor",
      "mountain",
      "mouse",
      "move",
      "movie",
      "much",
      "muffin",
      "mule",
      "multiply",
      "muscle",
      "museum",
      "mushroom",
      "music",
      "must",
      "mutual",
      "myself",
      "mystery",
      "myth",
      "naive",
      "name",
      "napkin",
      "narrow",
      "nasty",
      "nation",
      "nature",
      "near",
      "neck",
      "need",
      "negative",
      "neglect",
      "neither",
      "nephew",
      "nerve",
      "nest",
      "net",
      "network",
      "neutral",
      "never",
      "news",
      "next",
      "nice",
      "night",
      "noble",
      "noise",
      "nominee",
      "noodle",
      "normal",
      "north",
      "nose",
      "notable",
      "note",
      "nothing",
      "notice",
      "novel",
      "now",
      "nuclear",
      "number",
      "nurse",
      "nut",
      "oak",
      "obey",
      "object",
      "oblige",
      "obscure",
      "observe",
      "obtain",
      "obvious",
      "occur",
      "ocean",
      "october",
      "odor",
      "off",
      "offer",
      "office",
      "often",
      "oil",
      "okay",
      "old",
      "olive",
      "olympic",
      "omit",
      "once",
      "one",
      "onion",
      "online",
      "only",
      "open",
      "opera",
      "opinion",
      "oppose",
      "option",
      "orange",
      "orbit",
      "orchard",
      "order",
      "ordinary",
      "organ",
      "orient",
      "original",
      "orphan",
      "ostrich",
      "other",
      "outdoor",
      "outer",
      "output",
      "outside",
      "oval",
      "oven",
      "over",
      "own",
      "owner",
      "oxygen",
      "oyster",
      "ozone",
      "pact",
      "paddle",
      "page",
      "pair",
      "palace",
      "palm",
      "panda",
      "panel",
      "panic",
      "panther",
      "paper",
      "parade",
      "parent",
      "park",
      "parrot",
      "party",
      "pass",
      "patch",
      "path",
      "patient",
      "patrol",
      "pattern",
      "pause",
      "pave",
      "payment",
      "peace",
      "peanut",
      "pear",
      "peasant",
      "pelican",
      "pen",
      "penalty",
      "pencil",
      "people",
      "pepper",
      "perfect",
      "permit",
      "person",
      "pet",
      "phone",
      "photo",
      "phrase",
      "physical",
      "piano",
      "picnic",
      "picture",
      "piece",
      "pig",
      "pigeon",
      "pill",
      "pilot",
      "pink",
      "pioneer",
      "pipe",
      "pistol",
      "pitch",
      "pizza",
      "place",
      "planet",
      "plastic",
      "plate",
      "play",
      "please",
      "pledge",
      "pluck",
      "plug",
      "plunge",
      "poem",
      "poet",
      "point",
      "polar",
      "pole",
      "police",
      "pond",
      "pony",
      "pool",
      "popular",
      "portion",
      "position",
      "possible",
      "post",
      "potato",
      "pottery",
      "poverty",
      "powder",
      "power",
      "practice",
      "praise",
      "predict",
      "prefer",
      "prepare",
      "present",
      "pretty",
      "prevent",
      "price",
      "pride",
      "primary",
      "print",
      "priority",
      "prison",
      "private",
      "prize",
      "problem",
      "process",
      "produce",
      "profit",
      "program",
      "project",
      "promote",
      "proof",
      "property",
      "prosper",
      "protect",
      "proud",
      "provide",
      "public",
      "pudding",
      "pull",
      "pulp",
      "pulse",
      "pumpkin",
      "punch",
      "pupil",
      "puppy",
      "purchase",
      "purity",
      "purpose",
      "purse",
      "push",
      "put",
      "puzzle",
      "pyramid",
      "quality",
      "quantum",
      "quarter",
      "question",
      "quick",
      "quit",
      "quiz",
      "quote",
      "rabbit",
      "raccoon",
      "race",
      "rack",
      "radar",
      "radio",
      "rail",
      "rain",
      "raise",
      "rally",
      "ramp",
      "ranch",
      "random",
      "range",
      "rapid",
      "rare",
      "rate",
      "rather",
      "raven",
      "raw",
      "razor",
      "ready",
      "real",
      "reason",
      "rebel",
      "rebuild",
      "recall",
      "receive",
      "recipe",
      "record",
      "recycle",
      "reduce",
      "reflect",
      "reform",
      "refuse",
      "region",
      "regret",
      "regular",
      "reject",
      "relax",
      "release",
      "relief",
      "rely",
      "remain",
      "remember",
      "remind",
      "remove",
      "render",
      "renew",
      "rent",
      "reopen",
      "repair",
      "repeat",
      "replace",
      "report",
      "require",
      "rescue",
      "resemble",
      "resist",
      "resource",
      "response",
      "result",
      "retire",
      "retreat",
      "return",
      "reunion",
      "reveal",
      "review",
      "reward",
      "rhythm",
      "rib",
      "ribbon",
      "rice",
      "rich",
      "ride",
      "ridge",
      "rifle",
      "right",
      "rigid",
      "ring",
      "riot",
      "ripple",
      "risk",
      "ritual",
      "rival",
      "river",
      "road",
      "roast",
      "robot",
      "robust",
      "rocket",
      "romance",
      "roof",
      "rookie",
      "room",
      "rose",
      "rotate",
      "rough",
      "round",
      "route",
      "royal",
      "rubber",
      "rude",
      "rug",
      "rule",
      "run",
      "runway",
      "rural",
      "sad",
      "saddle",
      "sadness",
      "safe",
      "sail",
      "salad",
      "salmon",
      "salon",
      "salt",
      "salute",
      "same",
      "sample",
      "sand",
      "satisfy",
      "satoshi",
      "sauce",
      "sausage",
      "save",
      "say",
      "scale",
      "scan",
      "scare",
      "scatter",
      "scene",
      "scheme",
      "school",
      "science",
      "scissors",
      "scorpion",
      "scout",
      "scrap",
      "screen",
      "script",
      "scrub",
      "sea",
      "search",
      "season",
      "seat",
      "second",
      "secret",
      "section",
      "security",
      "seed",
      "seek",
      "segment",
      "select",
      "sell",
      "seminar",
      "senior",
      "sense",
      "sentence",
      "series",
      "service",
      "session",
      "settle",
      "setup",
      "seven",
      "shadow",
      "shaft",
      "shallow",
      "share",
      "shed",
      "shell",
      "sheriff",
      "shield",
      "shift",
      "shine",
      "ship",
      "shiver",
      "shock",
      "shoe",
      "shoot",
      "shop",
      "short",
      "shoulder",
      "shove",
      "shrimp",
      "shrug",
      "shuffle",
      "shy",
      "sibling",
      "sick",
      "side",
      "siege",
      "sight",
      "sign",
      "silent",
      "silk",
      "silly",
      "silver",
      "similar",
      "simple",
      "since",
      "sing",
      "siren",
      "sister",
      "situate",
      "six",
      "size",
      "skate",
      "sketch",
      "ski",
      "skill",
      "skin",
      "skirt",
      "skull",
      "slab",
      "slam",
      "sleep",
      "slender",
      "slice",
      "slide",
      "slight",
      "slim",
      "slogan",
      "slot",
      "slow",
      "slush",
      "small",
      "smart",
      "smile",
      "smoke",
      "smooth",
      "snack",
      "snake",
      "snap",
      "sniff",
      "snow",
      "soap",
      "soccer",
      "social",
      "sock",
      "soda",
      "soft",
      "solar",
      "soldier",
      "solid",
      "solution",
      "solve",
      "someone",
      "song",
      "soon",
      "sorry",
      "sort",
      "soul",
      "sound",
      "soup",
      "source",
      "south",
      "space",
      "spare",
      "spatial",
      "spawn",
      "speak",
      "special",
      "speed",
      "spell",
      "spend",
      "sphere",
      "spice",
      "spider",
      "spike",
      "spin",
      "spirit",
      "split",
      "spoil",
      "sponsor",
      "spoon",
      "sport",
      "spot",
      "spray",
      "spread",
      "spring",
      "spy",
      "square",
      "squeeze",
      "squirrel",
      "stable",
      "stadium",
      "staff",
      "stage",
      "stairs",
      "stamp",
      "stand",
      "start",
      "state",
      "stay",
      "steak",
      "steel",
      "stem",
      "step",
      "stereo",
      "stick",
      "still",
      "sting",
      "stock",
      "stomach",
      "stone",
      "stool",
      "story",
      "stove",
      "strategy",
      "street",
      "strike",
      "strong",
      "struggle",
      "student",
      "stuff",
      "stumble",
      "style",
      "subject",
      "submit",
      "subway",
      "success",
      "such",
      "sudden",
      "suffer",
      "sugar",
      "suggest",
      "suit",
      "summer",
      "sun",
      "sunny",
      "sunset",
      "super",
      "supply",
      "supreme",
      "sure",
      "surface",
      "surge",
      "surprise",
      "surround",
      "survey",
      "suspect",
      "sustain",
      "swallow",
      "swamp",
      "swap",
      "swarm",
      "swear",
      "sweet",
      "swift",
      "swim",
      "swing",
      "switch",
      "sword",
      "symbol",
      "symptom",
      "syrup",
      "system",
      "table",
      "tackle",
      "tag",
      "tail",
      "talent",
      "talk",
      "tank",
      "tape",
      "target",
      "task",
      "taste",
      "tattoo",
      "taxi",
      "teach",
      "team",
      "tell",
      "ten",
      "tenant",
      "tennis",
      "tent",
      "term",
      "test",
      "text",
      "thank",
      "that",
      "theme",
      "then",
      "theory",
      "there",
      "they",
      "thing",
      "this",
      "thought",
      "three",
      "thrive",
      "throw",
      "thumb",
      "thunder",
      "ticket",
      "tide",
      "tiger",
      "tilt",
      "timber",
      "time",
      "tiny",
      "tip",
      "tired",
      "tissue",
      "title",
      "toast",
      "tobacco",
      "today",
      "toddler",
      "toe",
      "together",
      "toilet",
      "token",
      "tomato",
      "tomorrow",
      "tone",
      "tongue",
      "tonight",
      "tool",
      "tooth",
      "top",
      "topic",
      "topple",
      "torch",
      "tornado",
      "tortoise",
      "toss",
      "total",
      "tourist",
      "toward",
      "tower",
      "town",
      "toy",
      "track",
      "trade",
      "traffic",
      "tragic",
      "train",
      "transfer",
      "trap",
      "trash",
      "travel",
      "tray",
      "treat",
      "tree",
      "trend",
      "trial",
      "tribe",
      "trick",
      "trigger",
      "trim",
      "trip",
      "trophy",
      "trouble",
      "truck",
      "true",
      "truly",
      "trumpet",
      "trust",
      "truth",
      "try",
      "tube",
      "tuition",
      "tumble",
      "tuna",
      "tunnel",
      "turkey",
      "turn",
      "turtle",
      "twelve",
      "twenty",
      "twice",
      "twin",
      "twist",
      "two",
      "type",
      "typical",
      "ugly",
      "umbrella",
      "unable",
      "unaware",
      "uncle",
      "uncover",
      "under",
      "undo",
      "unfair",
      "unfold",
      "unhappy",
      "uniform",
      "unique",
      "unit",
      "universe",
      "unknown",
      "unlock",
      "until",
      "unusual",
      "unveil",
      "update",
      "upgrade",
      "uphold",
      "upon",
      "upper",
      "upset",
      "urban",
      "urge",
      "usage",
      "use",
      "used",
      "useful",
      "useless",
      "usual",
      "utility",
      "vacant",
      "vacuum",
      "vague",
      "valid",
      "valley",
      "valve",
      "van",
      "vanish",
      "vapor",
      "various",
      "vast",
      "vault",
      "vehicle",
      "velvet",
      "vendor",
      "venture",
      "venue",
      "verb",
      "verify",
      "version",
      "very",
      "vessel",
      "veteran",
      "viable",
      "vibrant",
      "vicious",
      "victory",
      "video",
      "view",
      "village",
      "vintage",
      "violin",
      "virtual",
      "virus",
      "visa",
      "visit",
      "visual",
      "vital",
      "vivid",
      "vocal",
      "voice",
      "void",
      "volcano",
      "volume",
      "vote",
      "voyage",
      "wage",
      "wagon",
      "wait",
      "walk",
      "wall",
      "walnut",
      "want",
      "warfare",
      "warm",
      "warrior",
      "wash",
      "wasp",
      "waste",
      "water",
      "wave",
      "way",
      "wealth",
      "weapon",
      "wear",
      "weasel",
      "weather",
      "web",
      "wedding",
      "weekend",
      "weird",
      "welcome",
      "west",
      "wet",
      "whale",
      "what",
      "wheat",
      "wheel",
      "when",
      "where",
      "whip",
      "whisper",
      "wide",
      "width",
      "wife",
      "wild",
      "will",
      "win",
      "window",
      "wine",
      "wing",
      "wink",
      "winner",
      "winter",
      "wire",
      "wisdom",
      "wise",
      "wish",
      "witness",
      "wolf",
      "woman",
      "wonder",
      "wood",
      "wool",
      "word",
      "work",
      "world",
      "worry",
      "worth",
      "wrap",
      "wreck",
      "wrestle",
      "wrist",
      "write",
      "wrong",
      "yard",
      "year",
      "yellow",
      "you",
      "young",
      "youth",
      "zebra",
      "zero",
      "zone",
      "zoo"
    ];
    english_default = english;
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/mnemonic/mnemonic.js
function toUint11Array(buffer8) {
  const buffer11 = [];
  let acc = 0;
  let accBits = 0;
  function add(octet) {
    acc |= octet << accBits;
    accBits += 8;
    if (accBits >= 11) {
      buffer11.push(acc & 2047);
      acc >>= 11;
      accBits -= 11;
    }
  }
  function flush() {
    if (accBits) {
      buffer11.push(acc);
    }
  }
  buffer8.forEach(add);
  flush();
  return buffer11;
}
function applyWords(nums) {
  return nums.map((n) => english_default[n]);
}
function computeChecksum(seed) {
  const hashBuffer = genericHash(seed);
  const uint11Hash = toUint11Array(hashBuffer);
  const words = applyWords(uint11Hash);
  return words[0];
}
function mnemonicFromSeed(seed) {
  if (seed.length !== SEED_BTYES_LENGTH) {
    throw new RangeError(`Seed length must be ${SEED_BTYES_LENGTH}`);
  }
  const uint11Array = toUint11Array(seed);
  const words = applyWords(uint11Array);
  const checksumWord = computeChecksum(seed);
  return `${words.join(" ")} ${checksumWord}`;
}
function toUint8Array(buffer11) {
  const buffer8 = [];
  let acc = 0;
  let accBits = 0;
  function add(ui11) {
    acc |= ui11 << accBits;
    accBits += 11;
    while (accBits >= 8) {
      buffer8.push(acc & 255);
      acc >>= 8;
      accBits -= 8;
    }
  }
  function flush() {
    if (accBits) {
      buffer8.push(acc);
    }
  }
  buffer11.forEach(add);
  flush();
  return new Uint8Array(buffer8);
}
function seedFromMnemonic(mnemonic) {
  const words = mnemonic.split(" ");
  const key = words.slice(0, 24);
  for (const w of key) {
    if (english_default.indexOf(w) === -1)
      throw new Error(NOT_IN_WORDS_LIST_ERROR_MSG);
  }
  const checksum = words[words.length - 1];
  const uint11Array = key.map((word) => english_default.indexOf(word));
  let uint8Array = toUint8Array(uint11Array);
  if (uint8Array.length !== 33)
    throw new Error(FAIL_TO_DECODE_MNEMONIC_ERROR_MSG);
  if (uint8Array[uint8Array.length - 1] !== 0)
    throw new Error(FAIL_TO_DECODE_MNEMONIC_ERROR_MSG);
  uint8Array = uint8Array.slice(0, uint8Array.length - 1);
  const cs = computeChecksum(uint8Array);
  if (cs === checksum)
    return uint8Array;
  throw new Error(FAIL_TO_DECODE_MNEMONIC_ERROR_MSG);
}
function mnemonicToSecretKey(mn) {
  const seed = seedFromMnemonic(mn);
  const keys = keyPairFromSeed(seed);
  const encodedPk = encodeAddress(keys.publicKey);
  return { addr: encodedPk, sk: keys.secretKey };
}
function secretKeyToMnemonic(sk) {
  const seed = sk.slice(0, SEED_BTYES_LENGTH);
  return mnemonicFromSeed(seed);
}
function mnemonicToMasterDerivationKey(mn) {
  return seedFromMnemonic(mn);
}
function masterDerivationKeyToMnemonic(mdk) {
  return mnemonicFromSeed(mdk);
}
var FAIL_TO_DECODE_MNEMONIC_ERROR_MSG, NOT_IN_WORDS_LIST_ERROR_MSG;
var init_mnemonic = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/mnemonic/mnemonic.js"() {
    init_english();
    init_naclWrappers();
    init_address();
    FAIL_TO_DECODE_MNEMONIC_ERROR_MSG = "failed to decode mnemonic";
    NOT_IN_WORDS_LIST_ERROR_MSG = "the mnemonic contains a word that is not in the wordlist";
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/group.js
function computeGroupID(txns) {
  const hashes = [];
  for (const txn of txns) {
    const tx = instantiateTxnIfNeeded(txn);
    hashes.push(tx.rawTxID());
  }
  const txgroup = new TxGroup(hashes);
  const bytes = txgroup.toByte();
  const toBeHashed = Buffer.from(concatArrays(txgroup.tag, bytes));
  const gid = genericHash(toBeHashed);
  return Buffer.from(gid);
}
function assignGroupID(txns, from) {
  const gid = computeGroupID(txns);
  const result = [];
  for (const txn of txns) {
    const tx = instantiateTxnIfNeeded(txn);
    if (!from || encodeAddress(tx.from.publicKey) === from) {
      tx.group = gid;
      result.push(tx);
    }
  }
  return result;
}
var ALGORAND_MAX_TX_GROUP_SIZE, TxGroup;
var init_group = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/group.js"() {
    init_buffer();
    init_transaction();
    init_naclWrappers();
    init_encoding();
    init_address();
    init_utils();
    ALGORAND_MAX_TX_GROUP_SIZE = 16;
    TxGroup = class {
      constructor(hashes) {
        this.name = "Transaction group";
        this.tag = Buffer.from("TG");
        if (hashes.length > ALGORAND_MAX_TX_GROUP_SIZE) {
          const errorMsg = `${hashes.length.toString()} transactions grouped together but max group size is ${ALGORAND_MAX_TX_GROUP_SIZE.toString()}`;
          throw Error(errorMsg);
        }
        this.txGroupHashes = hashes;
      }
      // eslint-disable-next-line camelcase
      get_obj_for_encoding() {
        const txgroup = {
          txlist: this.txGroupHashes
        };
        return txgroup;
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(txgroupForEnc) {
        const txn = Object.create(this.prototype);
        txn.name = "Transaction group";
        txn.tag = Buffer.from("TG");
        txn.txGroupHashes = [];
        for (const hash of txgroupForEnc.txlist) {
          txn.txGroupHashes.push(Buffer.from(hash));
        }
        return txn;
      }
      toByte() {
        return encode2(this.get_obj_for_encoding());
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/multisig.js
function createMultisigTransaction(txn, { version, threshold, addrs }) {
  const pks = addrs.map((addr) => decodeAddress(addr).publicKey);
  const subsigs = pks.map((pk) => ({ pk: Buffer.from(pk) }));
  const msig = {
    v: version,
    thr: threshold,
    subsig: subsigs
  };
  const txnForEncoding = txn.get_obj_for_encoding();
  const signedTxn = {
    msig,
    txn: txnForEncoding
  };
  const msigAddr = fromMultisigPreImg({
    version,
    threshold,
    pks
  });
  if (encodeAddress(txnForEncoding.snd) !== encodeAddress(msigAddr)) {
    signedTxn.sgnr = Buffer.from(msigAddr);
  }
  return new Uint8Array(encode2(signedTxn));
}
function createMultisigTransactionWithSignature(txn, { rawSig, myPk }, { version, threshold, pks }) {
  const encodedMsig = createMultisigTransaction(txn, {
    version,
    threshold,
    addrs: pks.map((pk) => encodeAddress(pk))
  });
  const signedTxn = decode2(encodedMsig);
  let keyExist = false;
  signedTxn.msig.subsig.forEach((subsig, i) => {
    if (bytesEqual(subsig.pk, myPk)) {
      keyExist = true;
      signedTxn.msig.subsig[i].s = rawSig;
    }
  });
  if (keyExist === false) {
    throw new Error(MULTISIG_KEY_NOT_EXIST_ERROR_MSG);
  }
  const msigAddr = fromMultisigPreImg({
    version,
    threshold,
    pks
  });
  if (encodeAddress(signedTxn.txn.snd) !== encodeAddress(msigAddr)) {
    signedTxn.sgnr = Buffer.from(msigAddr);
  }
  return new Uint8Array(encode2(signedTxn));
}
function mergeMultisigTransactions(multisigTxnBlobs) {
  if (multisigTxnBlobs.length < 2) {
    throw new Error(MULTISIG_MERGE_LESSTHANTWO_ERROR_MSG);
  }
  const refSigTx = decode2(multisigTxnBlobs[0]);
  const refTxID = MultisigTransaction.from_obj_for_encoding(refSigTx.txn).txID();
  const refAuthAddr = refSigTx.sgnr ? encodeAddress(refSigTx.sgnr) : void 0;
  const refPreImage = {
    version: refSigTx.msig.v,
    threshold: refSigTx.msig.thr,
    pks: refSigTx.msig.subsig.map((subsig) => subsig.pk)
  };
  const refMsigAddr = encodeAddress(fromMultisigPreImg(refPreImage));
  const newSubsigs = refSigTx.msig.subsig.map((sig) => ({ ...sig }));
  for (let i = 1; i < multisigTxnBlobs.length; i++) {
    const unisig = decode2(multisigTxnBlobs[i]);
    const unisigAlgoTxn = MultisigTransaction.from_obj_for_encoding(unisig.txn);
    if (unisigAlgoTxn.txID() !== refTxID) {
      throw new Error(MULTISIG_MERGE_MISMATCH_ERROR_MSG);
    }
    const authAddr = unisig.sgnr ? encodeAddress(unisig.sgnr) : void 0;
    if (refAuthAddr !== authAddr) {
      throw new Error(MULTISIG_MERGE_MISMATCH_AUTH_ADDR_MSG);
    }
    if (unisig.msig.subsig.length !== refSigTx.msig.subsig.length) {
      throw new Error(MULTISIG_MERGE_WRONG_PREIMAGE_ERROR_MSG);
    }
    const preimg = {
      version: unisig.msig.v,
      threshold: unisig.msig.thr,
      pks: unisig.msig.subsig.map((subsig) => subsig.pk)
    };
    const msgigAddr = encodeAddress(fromMultisigPreImg(preimg));
    if (refMsigAddr !== msgigAddr) {
      throw new Error(MULTISIG_MERGE_WRONG_PREIMAGE_ERROR_MSG);
    }
    unisig.msig.subsig.forEach((uniSubsig, index) => {
      if (!uniSubsig.s)
        return;
      const current = newSubsigs[index];
      if (current.s && Buffer.compare(Buffer.from(uniSubsig.s), Buffer.from(current.s)) !== 0) {
        throw new Error(MULTISIG_MERGE_SIG_MISMATCH_ERROR_MSG);
      }
      current.s = uniSubsig.s;
    });
  }
  const msig = {
    v: refSigTx.msig.v,
    thr: refSigTx.msig.thr,
    subsig: newSubsigs
  };
  const signedTxn = {
    msig,
    txn: refSigTx.txn
  };
  if (typeof refAuthAddr !== "undefined") {
    signedTxn.sgnr = Buffer.from(decodeAddress(refAuthAddr).publicKey);
  }
  return new Uint8Array(encode2(signedTxn));
}
function verifyMultisig(toBeVerified, msig, publicKey) {
  const version = msig.v;
  const threshold = msig.thr;
  const subsigs = msig.subsig;
  const pks = subsigs.map((subsig) => subsig.pk);
  if (msig.subsig.length < threshold) {
    return false;
  }
  let pk;
  try {
    pk = fromMultisigPreImg({ version, threshold, pks });
  } catch (e) {
    return false;
  }
  if (!arrayEqual(pk, publicKey)) {
    return false;
  }
  let counter = 0;
  for (const subsig of subsigs) {
    if (subsig.s !== void 0) {
      counter += 1;
    }
  }
  if (counter < threshold) {
    return false;
  }
  let verifiedCounter = 0;
  for (const subsig of subsigs) {
    if (subsig.s !== void 0) {
      if (verify(toBeVerified, subsig.s, subsig.pk)) {
        verifiedCounter += 1;
      }
    }
  }
  if (verifiedCounter < threshold) {
    return false;
  }
  return true;
}
function signMultisigTransaction(txn, { version, threshold, addrs }, sk) {
  const expectedFromRaw = fromMultisigPreImgAddrs({
    version,
    threshold,
    addrs
  });
  if (!Object.prototype.hasOwnProperty.call(txn, "from")) {
    txn.from = expectedFromRaw;
  }
  const pks = addrs.map((addr) => decodeAddress(addr).publicKey);
  const txnAlreadyBuilt = txn instanceof Transaction;
  let algoTxn;
  let blob;
  if (txnAlreadyBuilt) {
    algoTxn = txn;
    blob = MultisigTransaction.prototype.partialSignTxn.call(algoTxn, { version, threshold, pks }, sk);
  } else {
    algoTxn = new MultisigTransaction(txn);
    blob = algoTxn.partialSignTxn({ version, threshold, pks }, sk);
  }
  return {
    txID: algoTxn.txID().toString(),
    blob
  };
}
function appendSignMultisigTransaction(multisigTxnBlob, { version, threshold, addrs }, sk) {
  const pks = addrs.map((addr) => decodeAddress(addr).publicKey);
  const multisigTxObj = decode2(multisigTxnBlob);
  const msigTxn = MultisigTransaction.from_obj_for_encoding(multisigTxObj.txn);
  const partialSignedBlob = msigTxn.partialSignTxn({ version, threshold, pks }, sk);
  return {
    txID: msigTxn.txID().toString(),
    blob: mergeMultisigTransactions([multisigTxnBlob, partialSignedBlob])
  };
}
function appendSignRawMultisigSignature(multisigTxnBlob, { version, threshold, addrs }, signerAddr, signature) {
  const pks = addrs.map((addr) => decodeAddress(addr).publicKey);
  const multisigTxObj = decode2(multisigTxnBlob);
  const msigTxn = MultisigTransaction.from_obj_for_encoding(multisigTxObj.txn);
  const partialSignedBlob = msigTxn.partialSignWithMultisigSignature({ version, threshold, pks }, signerAddr, signature);
  return {
    txID: msigTxn.txID().toString(),
    blob: mergeMultisigTransactions([multisigTxnBlob, partialSignedBlob])
  };
}
function multisigAddress({ version, threshold, addrs }) {
  return fromMultisigPreImgAddrs({ version, threshold, addrs });
}
var MULTISIG_MERGE_LESSTHANTWO_ERROR_MSG, MULTISIG_MERGE_MISMATCH_ERROR_MSG, MULTISIG_MERGE_MISMATCH_AUTH_ADDR_MSG, MULTISIG_MERGE_WRONG_PREIMAGE_ERROR_MSG, MULTISIG_MERGE_SIG_MISMATCH_ERROR_MSG, MULTISIG_KEY_NOT_EXIST_ERROR_MSG, MULTISIG_NO_MUTATE_ERROR_MSG, MULTISIG_USE_PARTIAL_SIGN_ERROR_MSG, MULTISIG_SIGNATURE_LENGTH_ERROR_MSG, MultisigTransaction;
var init_multisig = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/multisig.js"() {
    init_buffer();
    init_naclWrappers();
    init_address();
    init_encoding();
    init_transaction();
    init_utils();
    MULTISIG_MERGE_LESSTHANTWO_ERROR_MSG = "Not enough multisig transactions to merge. Need at least two";
    MULTISIG_MERGE_MISMATCH_ERROR_MSG = "Cannot merge txs. txIDs differ";
    MULTISIG_MERGE_MISMATCH_AUTH_ADDR_MSG = "Cannot merge txs. Auth addrs differ";
    MULTISIG_MERGE_WRONG_PREIMAGE_ERROR_MSG = "Cannot merge txs. Multisig preimages differ";
    MULTISIG_MERGE_SIG_MISMATCH_ERROR_MSG = "Cannot merge txs. subsigs are mismatched.";
    MULTISIG_KEY_NOT_EXIST_ERROR_MSG = "Key does not exist";
    MULTISIG_NO_MUTATE_ERROR_MSG = "Cannot mutate a multisig field as it would invalidate all existing signatures.";
    MULTISIG_USE_PARTIAL_SIGN_ERROR_MSG = "Cannot sign a multisig transaction using `signTxn`. Use `partialSignTxn` instead.";
    MULTISIG_SIGNATURE_LENGTH_ERROR_MSG = "Cannot add multisig signature. Signature is not of the correct length.";
    MultisigTransaction = class extends Transaction {
      /* eslint-disable class-methods-use-this,@typescript-eslint/no-unused-vars,no-dupe-class-members */
      /**
       * Override inherited method to throw an error, as mutating transactions are prohibited in this context
       */
      addLease() {
        throw new Error(MULTISIG_NO_MUTATE_ERROR_MSG);
      }
      /**
       * Override inherited method to throw an error, as mutating transactions are prohibited in this context
       */
      addRekey() {
        throw new Error(MULTISIG_NO_MUTATE_ERROR_MSG);
      }
      signTxn(sk) {
        throw new Error(MULTISIG_USE_PARTIAL_SIGN_ERROR_MSG);
      }
      /* eslint-enable class-methods-use-this,@typescript-eslint/no-unused-vars,no-dupe-class-members */
      /**
       * partialSignTxn partially signs this transaction and returns a partially-signed multisig transaction,
       * encoded with msgpack as a typed array.
       * @param version - multisig version
       * @param threshold - multisig threshold
       * @param pks - multisig public key list, order is important.
       * @param sk - an Algorand secret key to sign with.
       * @returns an encoded, partially signed multisig transaction.
       */
      partialSignTxn({ version, threshold, pks }, sk) {
        const myPk = keyPairFromSecretKey(sk).publicKey;
        return createMultisigTransactionWithSignature(this, { rawSig: this.rawSignTxn(sk), myPk }, { version, threshold, pks });
      }
      /**
       * partialSignWithMultisigSignature partially signs this transaction with an external raw multisig signature and returns
       * a partially-signed multisig transaction, encoded with msgpack as a typed array.
       * @param metadata - multisig metadata
       * @param signerAddr - address of the signer
       * @param signature - raw multisig signature
       * @returns an encoded, partially signed multisig transaction.
       */
      partialSignWithMultisigSignature(metadata, signerAddr, signature) {
        if (!isValidSignatureLength(signature.length)) {
          throw new Error(MULTISIG_SIGNATURE_LENGTH_ERROR_MSG);
        }
        return createMultisigTransactionWithSignature(this, {
          rawSig: signature,
          myPk: decodeAddress(signerAddr).publicKey
        }, metadata);
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(txnForEnc) {
        return super.from_obj_for_encoding(txnForEnc);
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/logicsig.js
function sanityCheckProgram(program) {
  if (!program || program.length === 0)
    throw new Error("empty program");
  const lineBreakOrd = "\n".charCodeAt(0);
  const blankSpaceOrd = " ".charCodeAt(0);
  const tildeOrd = "~".charCodeAt(0);
  const isPrintable = (x) => blankSpaceOrd <= x && x <= tildeOrd;
  const isAsciiPrintable = program.every((x) => x === lineBreakOrd || isPrintable(x));
  if (isAsciiPrintable) {
    const programStr = Buffer.from(program).toString();
    if (isValidAddress(programStr))
      throw new Error("requesting program bytes, get Algorand address");
    if (Buffer.from(programStr, "base64").toString("base64") === programStr)
      throw new Error("program should not be b64 encoded");
    throw new Error("program bytes are all ASCII printable characters, not looking like Teal byte code");
  }
}
function signLogicSigTransactionWithAddress(txn, lsig, lsigAddress) {
  if (!lsig.verify(lsigAddress)) {
    throw new Error("Logic signature verification failed. Ensure the program and signature are valid.");
  }
  const signedTxn = {
    lsig: lsig.get_obj_for_encoding(),
    txn: txn.get_obj_for_encoding()
  };
  if (!bytesEqual(lsigAddress, txn.from.publicKey)) {
    signedTxn.sgnr = Buffer.from(lsigAddress);
  }
  return {
    txID: txn.txID().toString(),
    blob: encode2(signedTxn)
  };
}
function signLogicSigTransactionObject(txn, lsigObject) {
  let lsig;
  let lsigAddress;
  if (lsigObject instanceof LogicSigAccount) {
    lsig = lsigObject.lsig;
    lsigAddress = decodeAddress(lsigObject.address()).publicKey;
  } else {
    lsig = lsigObject;
    if (lsig.sig) {
      lsigAddress = txn.from.publicKey;
    } else if (lsig.msig) {
      const msigMetadata = {
        version: lsig.msig.v,
        threshold: lsig.msig.thr,
        pks: lsig.msig.subsig.map((subsig) => subsig.pk)
      };
      lsigAddress = fromMultisigPreImg(msigMetadata);
    } else {
      lsigAddress = decodeAddress(lsig.address()).publicKey;
    }
  }
  return signLogicSigTransactionWithAddress(txn, lsig, lsigAddress);
}
function signLogicSigTransaction(txn, lsigObject) {
  const algoTxn = instantiateTxnIfNeeded(txn);
  return signLogicSigTransactionObject(algoTxn, lsigObject);
}
function logicSigFromByte(encoded) {
  return LogicSig.fromByte(encoded);
}
function tealSign(sk, data, programHash) {
  const parts = concatArrays(decodeAddress(programHash).publicKey, data);
  const toBeSigned = Buffer.from(concatArrays(SIGN_PROGRAM_DATA_PREFIX, parts));
  return sign(toBeSigned, sk);
}
function verifyTealSign(data, programHash, sig, pk) {
  const parts = concatArrays(decodeAddress(programHash).publicKey, data);
  const toBeSigned = Buffer.from(concatArrays(SIGN_PROGRAM_DATA_PREFIX, parts));
  return verify(toBeSigned, sig, pk);
}
function tealSignFromProgram(sk, data, program) {
  const lsig = new LogicSig(program);
  const contractAddress = lsig.address();
  return tealSign(sk, data, contractAddress);
}
var LogicSig, LogicSigAccount, SIGN_PROGRAM_DATA_PREFIX;
var init_logicsig = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/logicsig.js"() {
    init_buffer();
    init_naclWrappers();
    init_address();
    init_encoding();
    init_multisig();
    init_utils();
    init_transaction();
    init_address();
    LogicSig = class {
      constructor(program, programArgs) {
        this.tag = Buffer.from("Program");
        if (programArgs && (!Array.isArray(programArgs) || !programArgs.every((arg) => arg.constructor === Uint8Array || Buffer.isBuffer(arg)))) {
          throw new TypeError("Invalid arguments");
        }
        let args;
        if (programArgs != null)
          args = programArgs.map((arg) => new Uint8Array(arg));
        sanityCheckProgram(program);
        this.logic = program;
        this.args = args;
        this.sig = void 0;
        this.msig = void 0;
      }
      // eslint-disable-next-line camelcase
      get_obj_for_encoding() {
        const obj = {
          l: this.logic
        };
        if (this.args) {
          obj.arg = this.args;
        }
        if (this.sig) {
          obj.sig = this.sig;
        } else if (this.msig) {
          obj.msig = this.msig;
        }
        return obj;
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(encoded) {
        const lsig = new LogicSig(encoded.l, encoded.arg);
        lsig.sig = encoded.sig;
        lsig.msig = encoded.msig;
        return lsig;
      }
      /**
       * Performs signature verification
       * @param publicKey - Verification key (derived from sender address or escrow address)
       */
      verify(publicKey) {
        if (this.sig && this.msig) {
          return false;
        }
        try {
          sanityCheckProgram(this.logic);
        } catch (e) {
          return false;
        }
        const toBeSigned = concatArrays(this.tag, this.logic);
        if (!this.sig && !this.msig) {
          const hash = genericHash(toBeSigned);
          return arrayEqual(hash, publicKey);
        }
        if (this.sig) {
          return verify(toBeSigned, this.sig, publicKey);
        }
        return verifyMultisig(toBeSigned, this.msig, publicKey);
      }
      /**
       * Compute hash of the logic sig program (that is the same as escrow account address) as string address
       * @returns String representation of the address
       */
      address() {
        const toBeSigned = concatArrays(this.tag, this.logic);
        const hash = genericHash(toBeSigned);
        return encodeAddress(new Uint8Array(hash));
      }
      /**
       * Creates signature (if no msig provided) or multi signature otherwise
       * @param secretKey - Secret key to sign with
       * @param msig - Multisig account as \{version, threshold, addrs\}
       */
      sign(secretKey, msig) {
        if (msig == null) {
          this.sig = this.signProgram(secretKey);
        } else {
          const subsigs = msig.addrs.map((addr) => ({
            pk: decodeAddress(addr).publicKey
          }));
          this.msig = {
            v: msig.version,
            thr: msig.threshold,
            subsig: subsigs
          };
          const [sig, index] = this.singleSignMultisig(secretKey, this.msig);
          this.msig.subsig[index].s = sig;
        }
      }
      /**
       * Appends a signature to multi signature
       * @param secretKey - Secret key to sign with
       */
      appendToMultisig(secretKey) {
        if (this.msig === void 0) {
          throw new Error("no multisig present");
        }
        const [sig, index] = this.singleSignMultisig(secretKey, this.msig);
        this.msig.subsig[index].s = sig;
      }
      signProgram(secretKey) {
        const toBeSigned = concatArrays(this.tag, this.logic);
        const sig = sign(toBeSigned, secretKey);
        return sig;
      }
      singleSignMultisig(secretKey, msig) {
        let index = -1;
        const myPk = keyPairFromSecretKey(secretKey).publicKey;
        for (let i = 0; i < msig.subsig.length; i++) {
          const { pk } = msig.subsig[i];
          if (arrayEqual(pk, myPk)) {
            index = i;
            break;
          }
        }
        if (index === -1) {
          throw new Error("invalid secret key");
        }
        const sig = this.signProgram(secretKey);
        return [sig, index];
      }
      toByte() {
        return encode2(this.get_obj_for_encoding());
      }
      static fromByte(encoded) {
        const decodedObj = decode2(encoded);
        return LogicSig.from_obj_for_encoding(decodedObj);
      }
    };
    LogicSigAccount = class {
      /**
       * Create a new LogicSigAccount. By default this will create an escrow
       * LogicSig account. Call `sign` or `signMultisig` on the newly created
       * LogicSigAccount to make it a delegated account.
       *
       * @param program - The compiled TEAL program which contains the logic for
       *   this LogicSig.
       * @param args - An optional array of arguments for the program.
       */
      constructor(program, args) {
        this.lsig = new LogicSig(program, args);
        this.sigkey = void 0;
      }
      // eslint-disable-next-line camelcase
      get_obj_for_encoding() {
        const obj = {
          lsig: this.lsig.get_obj_for_encoding()
        };
        if (this.sigkey) {
          obj.sigkey = this.sigkey;
        }
        return obj;
      }
      // eslint-disable-next-line camelcase
      static from_obj_for_encoding(encoded) {
        const lsigAccount = new LogicSigAccount(encoded.lsig.l, encoded.lsig.arg);
        lsigAccount.lsig = LogicSig.from_obj_for_encoding(encoded.lsig);
        lsigAccount.sigkey = encoded.sigkey;
        return lsigAccount;
      }
      /**
       * Encode this object into msgpack.
       */
      toByte() {
        return encode2(this.get_obj_for_encoding());
      }
      /**
       * Decode a msgpack object into a LogicSigAccount.
       * @param encoded - The encoded LogicSigAccount.
       */
      static fromByte(encoded) {
        const decodedObj = decode2(encoded);
        return LogicSigAccount.from_obj_for_encoding(decodedObj);
      }
      /**
       * Check if this LogicSigAccount has been delegated to another account with a
       * signature.
       *
       * Note this function only checks for the presence of a delegation signature.
       * To verify the delegation signature, use `verify`.
       */
      isDelegated() {
        return !!(this.lsig.sig || this.lsig.msig);
      }
      /**
       * Verifies this LogicSig's program and signatures.
       * @returns true if and only if the LogicSig program and signatures are valid.
       */
      verify() {
        const addr = this.address();
        return this.lsig.verify(decodeAddress(addr).publicKey);
      }
      /**
       * Get the address of this LogicSigAccount.
       *
       * If the LogicSig is delegated to another account, this will return the
       * address of that account.
       *
       * If the LogicSig is not delegated to another account, this will return an
       *  escrow address that is the hash of the LogicSig's program code.
       */
      address() {
        if (this.lsig.sig && this.lsig.msig) {
          throw new Error("LogicSig has too many signatures. At most one of sig or msig may be present");
        }
        if (this.lsig.sig) {
          if (!this.sigkey) {
            throw new Error("Signing key for delegated account is missing");
          }
          return encodeAddress(this.sigkey);
        }
        if (this.lsig.msig) {
          const msigMetadata = {
            version: this.lsig.msig.v,
            threshold: this.lsig.msig.thr,
            pks: this.lsig.msig.subsig.map((subsig) => subsig.pk)
          };
          return encodeAddress(fromMultisigPreImg(msigMetadata));
        }
        return this.lsig.address();
      }
      /**
       * Turns this LogicSigAccount into a delegated LogicSig. This type of LogicSig
       * has the authority to sign transactions on behalf of another account, called
       * the delegating account. Use this function if the delegating account is a
       * multisig account.
       *
       * @param msig - The multisig delegating account
       * @param secretKey - The secret key of one of the members of the delegating
       *   multisig account. Use `appendToMultisig` to add additional signatures
       *   from other members.
       */
      signMultisig(msig, secretKey) {
        this.lsig.sign(secretKey, msig);
      }
      /**
       * Adds an additional signature from a member of the delegating multisig
       * account.
       *
       * @param secretKey - The secret key of one of the members of the delegating
       *   multisig account.
       */
      appendToMultisig(secretKey) {
        this.lsig.appendToMultisig(secretKey);
      }
      /**
       * Turns this LogicSigAccount into a delegated LogicSig. This type of LogicSig
       * has the authority to sign transactions on behalf of another account, called
       * the delegating account. If the delegating account is a multisig account,
       * use `signMultisig` instead.
       *
       * @param secretKey - The secret key of the delegating account.
       */
      sign(secretKey) {
        this.lsig.sign(secretKey);
        this.sigkey = keyPairFromSecretKey(secretKey).publicKey;
      }
    };
    SIGN_PROGRAM_DATA_PREFIX = Buffer.from("ProgData");
  }
});

// node_modules/.pnpm/vlq@2.0.4/node_modules/vlq/src/index.js
function decode3(string) {
  let result = [];
  let shift = 0;
  let value = 0;
  for (let i = 0; i < string.length; i += 1) {
    let integer = char_to_integer[string[i]];
    if (integer === void 0) {
      throw new Error("Invalid character (" + string[i] + ")");
    }
    const has_continuation_bit = integer & 32;
    integer &= 31;
    value += integer << shift;
    if (has_continuation_bit) {
      shift += 5;
    } else {
      const should_negate = value & 1;
      value >>>= 1;
      if (should_negate) {
        result.push(value === 0 ? -2147483648 : -value);
      } else {
        result.push(value);
      }
      value = shift = 0;
    }
  }
  return result;
}
var char_to_integer, integer_to_char;
var init_src = __esm({
  "node_modules/.pnpm/vlq@2.0.4/node_modules/vlq/src/index.js"() {
    char_to_integer = {};
    integer_to_char = {};
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".split("").forEach(function(char, i) {
      char_to_integer[char] = i;
      integer_to_char[i] = char;
    });
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/logic/sourcemap.js
var SourceMap;
var init_sourcemap = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/logic/sourcemap.js"() {
    init_src();
    SourceMap = class {
      constructor({ version, sources, names, mappings }) {
        this.version = version;
        this.sources = sources;
        this.names = names;
        this.mappings = mappings;
        if (this.version !== 3)
          throw new Error(`Only version 3 is supported, got ${this.version}`);
        if (this.mappings === void 0)
          throw new Error("mapping undefined, cannot build source map without `mapping`");
        const pcList = this.mappings.split(";").map((m) => {
          const decoded = decode3(m);
          if (decoded.length > 2)
            return decoded[2];
          return void 0;
        });
        this.pcToLine = {};
        this.lineToPc = {};
        let lastLine = 0;
        for (const [pc, lineDelta] of pcList.entries()) {
          if (lineDelta !== void 0) {
            lastLine += lineDelta;
          }
          if (!(lastLine in this.lineToPc))
            this.lineToPc[lastLine] = [];
          this.lineToPc[lastLine].push(pc);
          this.pcToLine[pc] = lastLine;
        }
      }
      getLineForPc(pc) {
        return this.pcToLine[pc];
      }
      getPcsForLine(line) {
        return this.lineToPc[line];
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/types/transactions/encoded.js
var init_encoded = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/types/transactions/encoded.js"() {
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/types/transactions/index.js
var init_transactions = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/types/transactions/index.js"() {
    init_base();
    init_encoded();
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/dryrun.js
function decodePrograms(ap) {
  ap.params["approval-program"] = Buffer.from(ap.params["approval-program"].toString(), "base64");
  ap.params["clear-state-program"] = Buffer.from(ap.params["clear-state-program"].toString(), "base64");
  return ap;
}
async function createDryrun({ client, txns, protocolVersion, latestTimestamp, round, sources }) {
  const appInfos = [];
  const acctInfos = [];
  const apps = [];
  const assets = [];
  const accts = [];
  for (const t of txns) {
    if (t.txn.type === TransactionType.appl) {
      accts.push(encodeAddress(t.txn.from.publicKey));
      if (t.txn.appAccounts)
        accts.push(...t.txn.appAccounts.map((a) => encodeAddress(a.publicKey)));
      if (t.txn.appForeignApps) {
        apps.push(...t.txn.appForeignApps);
        accts.push(...t.txn.appForeignApps.map((aidx) => getApplicationAddress(aidx)));
      }
      if (t.txn.appForeignAssets)
        assets.push(...t.txn.appForeignAssets);
      if (t.txn.appIndex === void 0 || t.txn.appIndex === 0) {
        appInfos.push(new Application({
          id: defaultAppId,
          params: new ApplicationParams({
            creator: encodeAddress(t.txn.from.publicKey),
            approvalProgram: t.txn.appApprovalProgram,
            clearStateProgram: t.txn.appClearProgram,
            localStateSchema: new ApplicationStateSchema({
              numUint: t.txn.appLocalInts,
              numByteSlice: t.txn.appLocalByteSlices
            }),
            globalStateSchema: new ApplicationStateSchema({
              numUint: t.txn.appGlobalInts,
              numByteSlice: t.txn.appGlobalByteSlices
            })
          })
        }));
      } else {
        apps.push(t.txn.appIndex);
        accts.push(getApplicationAddress(t.txn.appIndex));
      }
    }
  }
  const assetPromises = [];
  for (const assetId of [...new Set(assets)]) {
    assetPromises.push(client.getAssetByID(assetId).do().then((assetInfo) => {
      accts.push(assetInfo.params.creator);
    }));
  }
  await Promise.all(assetPromises);
  const appPromises = [];
  for (const appId of [...new Set(apps)]) {
    appPromises.push(client.getApplicationByID(appId).do().then((appInfo) => {
      const ai = decodePrograms(appInfo);
      appInfos.push(ai);
      accts.push(ai.params.creator);
    }));
  }
  await Promise.all(appPromises);
  const acctPromises = [];
  for (const acct of [...new Set(accts)]) {
    acctPromises.push(client.accountInformation(acct).do().then((acctInfo) => {
      if ("created-apps" in acctInfo) {
        acctInfo["created-apps"] = acctInfo["created-apps"].map((app) => decodePrograms(app));
      }
      acctInfos.push(acctInfo);
    }));
  }
  await Promise.all(acctPromises);
  return new DryrunRequest({
    txns: txns.map((st) => ({ ...st, txn: st.txn.get_obj_for_encoding() })),
    accounts: acctInfos,
    apps: appInfos,
    latestTimestamp,
    round,
    protocolVersion,
    sources
  });
}
function truncate(str, maxValueWidth) {
  if (str.length > maxValueWidth && maxValueWidth > 0) {
    return `${str.slice(0, maxValueWidth)}...`;
  }
  return str;
}
function scratchToString(prevScratch, currScratch) {
  if (currScratch.length === 0)
    return "";
  let newScratchIdx = null;
  for (let idx = 0; idx < currScratch.length; idx++) {
    if (idx > prevScratch.length) {
      newScratchIdx = idx;
      continue;
    }
    if (JSON.stringify(prevScratch[idx]) !== JSON.stringify(currScratch[idx])) {
      newScratchIdx = idx;
    }
  }
  if (newScratchIdx == null)
    return "";
  const newScratch = currScratch[newScratchIdx];
  if (newScratch.bytes.length > 0) {
    return `${newScratchIdx} = 0x${Buffer.from(newScratch.bytes, "base64").toString("hex")}`;
  }
  return `${newScratchIdx} = ${newScratch.uint.toString()}`;
}
function stackToString(stack, reverse) {
  const svs = reverse ? stack.reverse() : stack;
  return `[${svs.map((sv) => {
    switch (sv.type) {
      case 1:
        return `0x${Buffer.from(sv.bytes, "base64").toString("hex")}`;
      case 2:
        return `${sv.uint.toString()}`;
      default:
        return "";
    }
  }).join(", ")}]`;
}
var defaultAppId, defaultMaxWidth, DryrunStackValue, DryrunTraceLine, DryrunTrace, DryrunTransactionResult, DryrunResult;
var init_dryrun2 = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/dryrun.js"() {
    init_buffer();
    init_types();
    init_transactions();
    init_address();
    defaultAppId = 1380011588;
    defaultMaxWidth = 30;
    DryrunStackValue = class {
      constructor(sv) {
        this.type = 0;
        this.bytes = "";
        this.uint = 0;
        this.type = sv.type;
        this.bytes = sv.bytes;
        this.uint = sv.uint;
      }
      toString() {
        if (this.type === 1) {
          return `0x${Buffer.from(this.bytes, "base64").toString("hex")}`;
        }
        return this.uint.toString();
      }
    };
    DryrunTraceLine = class {
      constructor(line) {
        this.error = "";
        this.line = 0;
        this.pc = 0;
        this.scratch = [];
        this.stack = [];
        this.error = line.error === void 0 ? "" : line.error;
        this.line = line.line;
        this.pc = line.pc;
        this.scratch = line.scratch;
        this.stack = line.stack.map((sv) => new DryrunStackValue(sv));
      }
    };
    DryrunTrace = class {
      constructor(t) {
        this.trace = [];
        if (t == null)
          return;
        this.trace = t.map((line) => new DryrunTraceLine(line));
      }
    };
    DryrunTransactionResult = class {
      constructor(dtr) {
        this.disassembly = [];
        this.appCallMessages = [];
        this.localDeltas = [];
        this.globalDelta = [];
        this.cost = 0;
        this.logicSigMessages = [];
        this.logicSigDisassembly = [];
        this.logs = [];
        this.appCallTrace = void 0;
        this.logicSigTrace = void 0;
        this.required = ["disassembly"];
        this.optionals = [
          "app-call-messages",
          "local-deltas",
          "global-delta",
          "cost",
          "logic-sig-messages",
          "logic-sig-disassembly",
          "logs"
        ];
        this.traces = ["app-call-trace", "logic-sig-trace"];
        this.disassembly = dtr.disassembly;
        this.appCallMessages = dtr["app-call-messages"];
        this.localDeltas = dtr["local-deltas"];
        this.globalDelta = dtr["global-delta"];
        this.cost = dtr.cost;
        this.logicSigMessages = dtr["logic-sig-messages"];
        this.logicSigDisassembly = dtr["logic-sig-disassembly"];
        this.logs = dtr.logs;
        this.appCallTrace = new DryrunTrace(dtr["app-call-trace"]);
        this.logicSigTrace = new DryrunTrace(dtr["logic-sig-trace"]);
      }
      appCallRejected() {
        return this.appCallMessages !== void 0 && this.appCallMessages.includes("REJECT");
      }
      logicSigRejected() {
        return this.logicSigMessages !== void 0 && this.logicSigMessages.includes("REJECT");
      }
      static trace(drt, disassembly, spc) {
        const maxWidth = spc.maxValueWidth || defaultMaxWidth;
        const lines = [["pc#", "ln#", "source", "scratch", "stack"]];
        for (let idx = 0; idx < drt.trace.length; idx++) {
          const { line, error, pc, scratch, stack } = drt.trace[idx];
          const currScratch = scratch !== void 0 ? scratch : [];
          const prevScratch = idx > 0 && drt.trace[idx - 1].scratch !== void 0 ? drt.trace[idx - 1].scratch : [];
          const src = error === "" ? disassembly[line] : `!! ${error} !!`;
          lines.push([
            pc.toString().padEnd(3, " "),
            line.toString().padEnd(3, " "),
            truncate(src, maxWidth),
            truncate(scratchToString(prevScratch, currScratch), maxWidth),
            truncate(stackToString(stack, spc.topOfStackFirst), maxWidth)
          ]);
        }
        const maxLengths = lines.reduce((prev, curr) => {
          const newVal = new Array(lines[0].length).fill(0);
          for (let idx = 0; idx < prev.length; idx++) {
            newVal[idx] = curr[idx].length > prev[idx] ? curr[idx].length : prev[idx];
          }
          return newVal;
        }, new Array(lines[0].length).fill(0));
        return `${lines.map((line) => line.map((v, idx) => v.padEnd(maxLengths[idx] + 1, " ")).join("|").trim()).join("\n")}
`;
      }
      appTrace(spc) {
        if (this.appCallTrace === void 0 || !this.disassembly)
          return "";
        let conf = spc;
        if (spc === void 0)
          conf = {
            maxValueWidth: defaultMaxWidth,
            topOfStackFirst: false
          };
        return DryrunTransactionResult.trace(this.appCallTrace, this.disassembly, conf);
      }
      lsigTrace(spc) {
        if (this.logicSigTrace === void 0 || this.logicSigDisassembly === void 0)
          return "";
        let conf = spc;
        if (spc === void 0)
          conf = {
            maxValueWidth: defaultMaxWidth,
            topOfStackFirst: true
          };
        return DryrunTransactionResult.trace(this.logicSigTrace, this.logicSigDisassembly, conf);
      }
    };
    DryrunResult = class {
      constructor(drrResp) {
        this.error = "";
        this.protocolVersion = "";
        this.txns = [];
        this.error = drrResp.error;
        this.protocolVersion = drrResp["protocol-version"];
        this.txns = drrResp.txns.map((txn) => new DryrunTransactionResult(txn));
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/makeTxn.js
function makePaymentTxnWithSuggestedParams(from, to, amount, closeRemainderTo, note, suggestedParams, rekeyTo) {
  const o = {
    from,
    to,
    amount,
    closeRemainderTo,
    note,
    suggestedParams,
    type: TransactionType.pay,
    reKeyTo: rekeyTo
  };
  return new Transaction(o);
}
function makePaymentTxnWithSuggestedParamsFromObject(o) {
  return makePaymentTxnWithSuggestedParams(o.from, o.to, o.amount, o.closeRemainderTo, o.note, o.suggestedParams, o.rekeyTo);
}
function makeKeyRegistrationTxnWithSuggestedParams(from, note, voteKey, selectionKey, voteFirst, voteLast, voteKeyDilution, suggestedParams, rekeyTo, nonParticipation = false, stateProofKey = void 0) {
  const o = {
    from,
    note,
    voteKey,
    selectionKey,
    voteFirst,
    voteLast,
    voteKeyDilution,
    suggestedParams,
    type: TransactionType.keyreg,
    reKeyTo: rekeyTo,
    nonParticipation,
    stateProofKey
  };
  return new Transaction(o);
}
function makeKeyRegistrationTxnWithSuggestedParamsFromObject(o) {
  return makeKeyRegistrationTxnWithSuggestedParams(o.from, o.note, o.voteKey, o.selectionKey, o.voteFirst, o.voteLast, o.voteKeyDilution, o.suggestedParams, o.rekeyTo, o.nonParticipation, o.stateProofKey);
}
function makeAssetCreateTxnWithSuggestedParams(from, note, total, decimals, defaultFrozen, manager, reserve, freeze, clawback, unitName, assetName, assetURL, assetMetadataHash, suggestedParams, rekeyTo) {
  const o = {
    from,
    note,
    suggestedParams,
    assetTotal: total,
    assetDecimals: decimals,
    assetDefaultFrozen: defaultFrozen,
    assetUnitName: unitName,
    assetName,
    assetURL,
    assetMetadataHash,
    assetManager: manager,
    assetReserve: reserve,
    assetFreeze: freeze,
    assetClawback: clawback,
    type: TransactionType.acfg,
    reKeyTo: rekeyTo
  };
  return new Transaction(o);
}
function makeAssetCreateTxnWithSuggestedParamsFromObject(o) {
  return makeAssetCreateTxnWithSuggestedParams(o.from, o.note, o.total, o.decimals, o.defaultFrozen, o.manager, o.reserve, o.freeze, o.clawback, o.unitName, o.assetName, o.assetURL, o.assetMetadataHash, o.suggestedParams, o.rekeyTo);
}
function makeAssetConfigTxnWithSuggestedParams(from, note, assetIndex, manager, reserve, freeze, clawback, suggestedParams, strictEmptyAddressChecking = true, rekeyTo) {
  if (strictEmptyAddressChecking && (manager === void 0 || reserve === void 0 || freeze === void 0 || clawback === void 0)) {
    throw Error("strict empty address checking was turned on, but at least one empty address was provided");
  }
  const o = {
    from,
    suggestedParams,
    assetIndex,
    assetManager: manager,
    assetReserve: reserve,
    assetFreeze: freeze,
    assetClawback: clawback,
    type: TransactionType.acfg,
    note,
    reKeyTo: rekeyTo
  };
  return new Transaction(o);
}
function makeAssetConfigTxnWithSuggestedParamsFromObject(o) {
  return makeAssetConfigTxnWithSuggestedParams(o.from, o.note, o.assetIndex, o.manager, o.reserve, o.freeze, o.clawback, o.suggestedParams, o.strictEmptyAddressChecking, o.rekeyTo);
}
function makeAssetDestroyTxnWithSuggestedParams(from, note, assetIndex, suggestedParams, rekeyTo) {
  const o = {
    from,
    suggestedParams,
    assetIndex,
    type: TransactionType.acfg,
    note,
    reKeyTo: rekeyTo
  };
  return new Transaction(o);
}
function makeAssetDestroyTxnWithSuggestedParamsFromObject(o) {
  return makeAssetDestroyTxnWithSuggestedParams(o.from, o.note, o.assetIndex, o.suggestedParams, o.rekeyTo);
}
function makeAssetFreezeTxnWithSuggestedParams(from, note, assetIndex, freezeTarget, freezeState, suggestedParams, rekeyTo) {
  const o = {
    from,
    type: TransactionType.afrz,
    freezeAccount: freezeTarget,
    assetIndex,
    freezeState,
    note,
    suggestedParams,
    reKeyTo: rekeyTo
  };
  return new Transaction(o);
}
function makeAssetFreezeTxnWithSuggestedParamsFromObject(o) {
  return makeAssetFreezeTxnWithSuggestedParams(o.from, o.note, o.assetIndex, o.freezeTarget, o.freezeState, o.suggestedParams, o.rekeyTo);
}
function makeAssetTransferTxnWithSuggestedParams(from, to, closeRemainderTo, revocationTarget, amount, note, assetIndex, suggestedParams, rekeyTo) {
  const o = {
    type: TransactionType.axfer,
    from,
    to,
    amount,
    suggestedParams,
    assetIndex,
    note,
    assetRevocationTarget: revocationTarget,
    closeRemainderTo,
    reKeyTo: rekeyTo
  };
  return new Transaction(o);
}
function makeAssetTransferTxnWithSuggestedParamsFromObject(o) {
  return makeAssetTransferTxnWithSuggestedParams(o.from, o.to, o.closeRemainderTo, o.revocationTarget, o.amount, o.note, o.assetIndex, o.suggestedParams, o.rekeyTo);
}
function makeApplicationCreateTxn(from, suggestedParams, onComplete, approvalProgram, clearProgram, numLocalInts, numLocalByteSlices, numGlobalInts, numGlobalByteSlices, appArgs, accounts, foreignApps, foreignAssets, note, lease, rekeyTo, extraPages, boxes) {
  const o = {
    type: TransactionType.appl,
    from,
    suggestedParams,
    appIndex: 0,
    appOnComplete: onComplete,
    appLocalInts: numLocalInts,
    appLocalByteSlices: numLocalByteSlices,
    appGlobalInts: numGlobalInts,
    appGlobalByteSlices: numGlobalByteSlices,
    appApprovalProgram: approvalProgram,
    appClearProgram: clearProgram,
    appArgs,
    appAccounts: accounts,
    appForeignApps: foreignApps,
    appForeignAssets: foreignAssets,
    boxes,
    note,
    lease,
    reKeyTo: rekeyTo,
    extraPages
  };
  return new Transaction(o);
}
function makeApplicationCreateTxnFromObject(o) {
  return makeApplicationCreateTxn(o.from, o.suggestedParams, o.onComplete, o.approvalProgram, o.clearProgram, o.numLocalInts, o.numLocalByteSlices, o.numGlobalInts, o.numGlobalByteSlices, o.appArgs, o.accounts, o.foreignApps, o.foreignAssets, o.note, o.lease, o.rekeyTo, o.extraPages, o.boxes);
}
function makeApplicationUpdateTxn(from, suggestedParams, appIndex, approvalProgram, clearProgram, appArgs, accounts, foreignApps, foreignAssets, note, lease, rekeyTo, boxes) {
  const o = {
    type: TransactionType.appl,
    from,
    suggestedParams,
    appIndex,
    appApprovalProgram: approvalProgram,
    appOnComplete: OnApplicationComplete.UpdateApplicationOC,
    appClearProgram: clearProgram,
    appArgs,
    appAccounts: accounts,
    appForeignApps: foreignApps,
    appForeignAssets: foreignAssets,
    boxes,
    note,
    lease,
    reKeyTo: rekeyTo
  };
  return new Transaction(o);
}
function makeApplicationUpdateTxnFromObject(o) {
  return makeApplicationUpdateTxn(o.from, o.suggestedParams, o.appIndex, o.approvalProgram, o.clearProgram, o.appArgs, o.accounts, o.foreignApps, o.foreignAssets, o.note, o.lease, o.rekeyTo, o.boxes);
}
function makeApplicationDeleteTxn(from, suggestedParams, appIndex, appArgs, accounts, foreignApps, foreignAssets, note, lease, rekeyTo, boxes) {
  const o = {
    type: TransactionType.appl,
    from,
    suggestedParams,
    appIndex,
    appOnComplete: OnApplicationComplete.DeleteApplicationOC,
    appArgs,
    appAccounts: accounts,
    appForeignApps: foreignApps,
    appForeignAssets: foreignAssets,
    boxes,
    note,
    lease,
    reKeyTo: rekeyTo
  };
  return new Transaction(o);
}
function makeApplicationDeleteTxnFromObject(o) {
  return makeApplicationDeleteTxn(o.from, o.suggestedParams, o.appIndex, o.appArgs, o.accounts, o.foreignApps, o.foreignAssets, o.note, o.lease, o.rekeyTo, o.boxes);
}
function makeApplicationOptInTxn(from, suggestedParams, appIndex, appArgs, accounts, foreignApps, foreignAssets, note, lease, rekeyTo, boxes) {
  const o = {
    type: TransactionType.appl,
    from,
    suggestedParams,
    appIndex,
    appOnComplete: OnApplicationComplete.OptInOC,
    appArgs,
    appAccounts: accounts,
    appForeignApps: foreignApps,
    appForeignAssets: foreignAssets,
    boxes,
    note,
    lease,
    reKeyTo: rekeyTo
  };
  return new Transaction(o);
}
function makeApplicationOptInTxnFromObject(o) {
  return makeApplicationOptInTxn(o.from, o.suggestedParams, o.appIndex, o.appArgs, o.accounts, o.foreignApps, o.foreignAssets, o.note, o.lease, o.rekeyTo, o.boxes);
}
function makeApplicationCloseOutTxn(from, suggestedParams, appIndex, appArgs, accounts, foreignApps, foreignAssets, note, lease, rekeyTo, boxes) {
  const o = {
    type: TransactionType.appl,
    from,
    suggestedParams,
    appIndex,
    appOnComplete: OnApplicationComplete.CloseOutOC,
    appArgs,
    appAccounts: accounts,
    appForeignApps: foreignApps,
    appForeignAssets: foreignAssets,
    boxes,
    note,
    lease,
    reKeyTo: rekeyTo
  };
  return new Transaction(o);
}
function makeApplicationCloseOutTxnFromObject(o) {
  return makeApplicationCloseOutTxn(o.from, o.suggestedParams, o.appIndex, o.appArgs, o.accounts, o.foreignApps, o.foreignAssets, o.note, o.lease, o.rekeyTo, o.boxes);
}
function makeApplicationClearStateTxn(from, suggestedParams, appIndex, appArgs, accounts, foreignApps, foreignAssets, note, lease, rekeyTo, boxes) {
  const o = {
    type: TransactionType.appl,
    from,
    suggestedParams,
    appIndex,
    appOnComplete: OnApplicationComplete.ClearStateOC,
    appArgs,
    appAccounts: accounts,
    appForeignApps: foreignApps,
    appForeignAssets: foreignAssets,
    boxes,
    note,
    lease,
    reKeyTo: rekeyTo
  };
  return new Transaction(o);
}
function makeApplicationClearStateTxnFromObject(o) {
  return makeApplicationClearStateTxn(o.from, o.suggestedParams, o.appIndex, o.appArgs, o.accounts, o.foreignApps, o.foreignAssets, o.note, o.lease, o.rekeyTo, o.boxes);
}
function makeApplicationNoOpTxn(from, suggestedParams, appIndex, appArgs, accounts, foreignApps, foreignAssets, note, lease, rekeyTo, boxes) {
  const o = {
    type: TransactionType.appl,
    from,
    suggestedParams,
    appIndex,
    appOnComplete: OnApplicationComplete.NoOpOC,
    appArgs,
    appAccounts: accounts,
    appForeignApps: foreignApps,
    appForeignAssets: foreignAssets,
    boxes,
    note,
    lease,
    reKeyTo: rekeyTo
  };
  return new Transaction(o);
}
function makeApplicationNoOpTxnFromObject(o) {
  return makeApplicationNoOpTxn(o.from, o.suggestedParams, o.appIndex, o.appArgs, o.accounts, o.foreignApps, o.foreignAssets, o.note, o.lease, o.rekeyTo, o.boxes);
}
function makeApplicationCallTxnFromObject(options) {
  const o = {
    type: TransactionType.appl,
    from: options.from,
    suggestedParams: options.suggestedParams,
    appIndex: options.appIndex,
    appOnComplete: options.onComplete,
    appLocalInts: options.numLocalInts,
    appLocalByteSlices: options.numLocalByteSlices,
    appGlobalInts: options.numGlobalInts,
    appGlobalByteSlices: options.numGlobalByteSlices,
    appApprovalProgram: options.approvalProgram,
    appClearProgram: options.clearProgram,
    appArgs: options.appArgs,
    appAccounts: options.accounts,
    appForeignApps: options.foreignApps,
    appForeignAssets: options.foreignAssets,
    boxes: options.boxes,
    note: options.note,
    lease: options.lease,
    reKeyTo: options.rekeyTo,
    extraPages: options.extraPages
  };
  return new Transaction(o);
}
var init_makeTxn = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/makeTxn.js"() {
    init_transaction();
    init_base();
    init_transactions();
    init_base();
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/signer.js
function makeBasicAccountTransactionSigner(account) {
  return (txnGroup, indexesToSign) => {
    const signed = [];
    for (const index of indexesToSign) {
      signed.push(txnGroup[index].signTxn(account.sk));
    }
    return Promise.resolve(signed);
  };
}
function makeLogicSigAccountTransactionSigner(account) {
  return (txnGroup, indexesToSign) => {
    const signed = [];
    for (const index of indexesToSign) {
      const { blob } = signLogicSigTransactionObject(txnGroup[index], account);
      signed.push(blob);
    }
    return Promise.resolve(signed);
  };
}
function makeMultiSigAccountTransactionSigner(msig, sks) {
  return (txnGroup, indexesToSign) => {
    const signed = [];
    for (const index of indexesToSign) {
      const txn = txnGroup[index];
      const partialSigs = [];
      for (const sk of sks) {
        const { blob } = signMultisigTransaction(txn, msig, sk);
        partialSigs.push(blob);
      }
      if (partialSigs.length > 1) {
        signed.push(mergeMultisigTransactions(partialSigs));
      } else {
        signed.push(partialSigs[0]);
      }
    }
    return Promise.resolve(signed);
  };
}
function makeEmptyTransactionSigner() {
  return (txnGroup, indexesToSign) => {
    const unsigned = [];
    for (const index of indexesToSign) {
      unsigned.push(encodeUnsignedSimulateTransaction(txnGroup[index]));
    }
    return Promise.resolve(unsigned);
  };
}
function isTransactionWithSigner(value) {
  return typeof value === "object" && Object.keys(value).length === 2 && typeof value.txn === "object" && typeof value.signer === "function";
}
var init_signer = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/signer.js"() {
    init_transaction();
    init_logicsig();
    init_multisig();
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/abi/abi_type.js
function compressMultipleBool(valueList) {
  let res = 0;
  if (valueList.length > 8) {
    throw new Error("value list passed in should be no greater than length 8");
  }
  for (let i = 0; i < valueList.length; i++) {
    const boolVal = valueList[i];
    if (typeof boolVal !== "boolean") {
      throw new Error("non-boolean values cannot be compressed into a byte");
    }
    if (boolVal) {
      res |= 1 << 7 - i;
    }
  }
  return res;
}
function findBoolLR(typeList, index, delta) {
  let until = 0;
  while (true) {
    const curr = index + delta * until;
    if (typeList[curr].constructor === ABIBoolType) {
      if (curr !== typeList.length - 1 && delta === 1) {
        until += 1;
      } else if (curr > 0 && delta === -1) {
        until += 1;
      } else {
        break;
      }
    } else {
      until -= 1;
      break;
    }
  }
  return until;
}
var MAX_LEN, ADDR_BYTE_SIZE, SINGLE_BYTE_SIZE, SINGLE_BOOL_SIZE, LENGTH_ENCODE_BYTE_SIZE, staticArrayRegexp, ufixedRegexp, ABIType, ABIUintType, ABIUfixedType, ABIAddressType, ABIBoolType, ABIByteType, ABIStringType, ABIArrayStaticType, ABIArrayDynamicType, ABITupleType;
var init_abi_type = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/abi/abi_type.js"() {
    init_buffer();
    init_address();
    init_bigint();
    init_utils();
    MAX_LEN = 2 ** 16 - 1;
    ADDR_BYTE_SIZE = 32;
    SINGLE_BYTE_SIZE = 1;
    SINGLE_BOOL_SIZE = 1;
    LENGTH_ENCODE_BYTE_SIZE = 2;
    staticArrayRegexp = /^([a-z\d[\](),]+)\[(0|[1-9][\d]*)]$/;
    ufixedRegexp = /^ufixed([1-9][\d]*)x([1-9][\d]*)$/;
    ABIType = class {
      // De-serializes the ABI type from a string using the ABI specs
      static from(str) {
        if (str.endsWith("[]")) {
          const arrayArgType = ABIType.from(str.slice(0, str.length - 2));
          return new ABIArrayDynamicType(arrayArgType);
        }
        if (str.endsWith("]")) {
          const stringMatches = str.match(staticArrayRegexp);
          if (stringMatches.length !== 3) {
            throw new Error(`malformed static array string: ${str}`);
          }
          const arrayLengthStr = stringMatches[2];
          const arrayLength = parseInt(arrayLengthStr, 10);
          if (arrayLength > MAX_LEN) {
            throw new Error(`array length exceeds limit ${MAX_LEN}`);
          }
          const arrayType = ABIType.from(stringMatches[1]);
          return new ABIArrayStaticType(arrayType, arrayLength);
        }
        if (str.startsWith("uint")) {
          const digitsOnly = (string) => [...string].every((c) => "0123456789".includes(c));
          const typeSizeStr = str.slice(4, str.length);
          if (!digitsOnly(typeSizeStr)) {
            throw new Error(`malformed uint string: ${typeSizeStr}`);
          }
          const typeSize = parseInt(typeSizeStr, 10);
          if (typeSize > MAX_LEN) {
            throw new Error(`malformed uint string: ${typeSize}`);
          }
          return new ABIUintType(typeSize);
        }
        if (str === "byte") {
          return new ABIByteType();
        }
        if (str.startsWith("ufixed")) {
          const stringMatches = str.match(ufixedRegexp);
          if (stringMatches.length !== 3) {
            throw new Error(`malformed ufixed type: ${str}`);
          }
          const ufixedSize = parseInt(stringMatches[1], 10);
          const ufixedPrecision = parseInt(stringMatches[2], 10);
          return new ABIUfixedType(ufixedSize, ufixedPrecision);
        }
        if (str === "bool") {
          return new ABIBoolType();
        }
        if (str === "address") {
          return new ABIAddressType();
        }
        if (str === "string") {
          return new ABIStringType();
        }
        if (str.length >= 2 && str[0] === "(" && str[str.length - 1] === ")") {
          const tupleContent = ABITupleType.parseTupleContent(str.slice(1, str.length - 1));
          const tupleTypes = [];
          for (let i = 0; i < tupleContent.length; i++) {
            const ti = ABIType.from(tupleContent[i]);
            tupleTypes.push(ti);
          }
          return new ABITupleType(tupleTypes);
        }
        throw new Error(`cannot convert a string ${str} to an ABI type`);
      }
    };
    ABIUintType = class extends ABIType {
      constructor(size) {
        super();
        if (size % 8 !== 0 || size < 8 || size > 512) {
          throw new Error(`unsupported uint type bitSize: ${size}`);
        }
        this.bitSize = size;
      }
      toString() {
        return `uint${this.bitSize}`;
      }
      equals(other) {
        return other instanceof ABIUintType && this.bitSize === other.bitSize;
      }
      isDynamic() {
        return false;
      }
      byteLen() {
        return this.bitSize / 8;
      }
      encode(value) {
        if (typeof value !== "bigint" && typeof value !== "number") {
          throw new Error(`Cannot encode value as uint${this.bitSize}: ${value}`);
        }
        if (value >= BigInt(2 ** this.bitSize) || value < BigInt(0)) {
          throw new Error(`${value} is not a non-negative int or too big to fit in size uint${this.bitSize}`);
        }
        if (typeof value === "number" && !Number.isSafeInteger(value)) {
          throw new Error(`${value} should be converted into a BigInt before it is encoded`);
        }
        return bigIntToBytes(value, this.bitSize / 8);
      }
      decode(byteString) {
        if (byteString.length !== this.bitSize / 8) {
          throw new Error(`byte string must correspond to a uint${this.bitSize}`);
        }
        return bytesToBigInt(byteString);
      }
    };
    ABIUfixedType = class extends ABIType {
      constructor(size, denominator) {
        super();
        if (size % 8 !== 0 || size < 8 || size > 512) {
          throw new Error(`unsupported ufixed type bitSize: ${size}`);
        }
        if (denominator > 160 || denominator < 1) {
          throw new Error(`unsupported ufixed type precision: ${denominator}`);
        }
        this.bitSize = size;
        this.precision = denominator;
      }
      toString() {
        return `ufixed${this.bitSize}x${this.precision}`;
      }
      equals(other) {
        return other instanceof ABIUfixedType && this.bitSize === other.bitSize && this.precision === other.precision;
      }
      isDynamic() {
        return false;
      }
      byteLen() {
        return this.bitSize / 8;
      }
      encode(value) {
        if (typeof value !== "bigint" && typeof value !== "number") {
          throw new Error(`Cannot encode value as ${this.toString()}: ${value}`);
        }
        if (value >= BigInt(2 ** this.bitSize) || value < BigInt(0)) {
          throw new Error(`${value} is not a non-negative int or too big to fit in size ${this.toString()}`);
        }
        if (typeof value === "number" && !Number.isSafeInteger(value)) {
          throw new Error(`${value} should be converted into a BigInt before it is encoded`);
        }
        return bigIntToBytes(value, this.bitSize / 8);
      }
      decode(byteString) {
        if (byteString.length !== this.bitSize / 8) {
          throw new Error(`byte string must correspond to a ${this.toString()}`);
        }
        return bytesToBigInt(byteString);
      }
    };
    ABIAddressType = class extends ABIType {
      toString() {
        return "address";
      }
      equals(other) {
        return other instanceof ABIAddressType;
      }
      isDynamic() {
        return false;
      }
      byteLen() {
        return ADDR_BYTE_SIZE;
      }
      encode(value) {
        if (typeof value !== "string" && !(value instanceof Uint8Array)) {
          throw new Error(`Cannot encode value as ${this.toString()}: ${value}`);
        }
        if (typeof value === "string") {
          const decodedAddress = decodeAddress(value);
          return decodedAddress.publicKey;
        }
        if (value.byteLength !== 32) {
          throw new Error(`byte string must be 32 bytes long for an address`);
        }
        return value;
      }
      decode(byteString) {
        if (byteString.byteLength !== 32) {
          throw new Error(`byte string must be 32 bytes long for an address`);
        }
        return encodeAddress(byteString);
      }
    };
    ABIBoolType = class extends ABIType {
      toString() {
        return "bool";
      }
      equals(other) {
        return other instanceof ABIBoolType;
      }
      isDynamic() {
        return false;
      }
      byteLen() {
        return SINGLE_BOOL_SIZE;
      }
      encode(value) {
        if (typeof value !== "boolean") {
          throw new Error(`Cannot encode value as bool: ${value}`);
        }
        if (value) {
          return new Uint8Array([128]);
        }
        return new Uint8Array([0]);
      }
      decode(byteString) {
        if (byteString.byteLength !== 1) {
          throw new Error(`bool string must be 1 byte long`);
        }
        const value = byteString[0];
        if (value === 128) {
          return true;
        }
        if (value === 0) {
          return false;
        }
        throw new Error(`boolean could not be decoded from the byte string`);
      }
    };
    ABIByteType = class extends ABIType {
      toString() {
        return "byte";
      }
      equals(other) {
        return other instanceof ABIByteType;
      }
      isDynamic() {
        return false;
      }
      byteLen() {
        return SINGLE_BYTE_SIZE;
      }
      encode(value) {
        if (typeof value !== "number" && typeof value !== "bigint") {
          throw new Error(`Cannot encode value as byte: ${value}`);
        }
        if (typeof value === "bigint") {
          value = Number(value);
        }
        if (value < 0 || value > 255) {
          throw new Error(`${value} cannot be encoded into a byte`);
        }
        return new Uint8Array([value]);
      }
      decode(byteString) {
        if (byteString.byteLength !== 1) {
          throw new Error(`byte string must be 1 byte long`);
        }
        return byteString[0];
      }
    };
    ABIStringType = class extends ABIType {
      toString() {
        return "string";
      }
      equals(other) {
        return other instanceof ABIStringType;
      }
      isDynamic() {
        return true;
      }
      byteLen() {
        throw new Error(`${this.toString()} is a dynamic type`);
      }
      encode(value) {
        if (typeof value !== "string" && !(value instanceof Uint8Array)) {
          throw new Error(`Cannot encode value as string: ${value}`);
        }
        const encodedBytes = Buffer.from(value);
        const encodedLength = bigIntToBytes(encodedBytes.length, LENGTH_ENCODE_BYTE_SIZE);
        const mergedBytes = new Uint8Array(encodedBytes.length + LENGTH_ENCODE_BYTE_SIZE);
        mergedBytes.set(encodedLength);
        mergedBytes.set(encodedBytes, LENGTH_ENCODE_BYTE_SIZE);
        return mergedBytes;
      }
      decode(byteString) {
        if (byteString.length < LENGTH_ENCODE_BYTE_SIZE) {
          throw new Error(`byte string is too short to be decoded. Actual length is ${byteString.length}, but expected at least ${LENGTH_ENCODE_BYTE_SIZE}`);
        }
        const buf = Buffer.from(byteString);
        const byteLength = buf.readUIntBE(0, LENGTH_ENCODE_BYTE_SIZE);
        const byteValue = byteString.slice(LENGTH_ENCODE_BYTE_SIZE, byteString.length);
        if (byteLength !== byteValue.length) {
          throw new Error(`string length bytes do not match the actual length of string. Expected ${byteLength}, got ${byteValue.length}`);
        }
        return Buffer.from(byteValue).toString("utf-8");
      }
    };
    ABIArrayStaticType = class extends ABIType {
      constructor(argType, arrayLength) {
        super();
        if (arrayLength < 0) {
          throw new Error(`static array must have a non negative length: ${arrayLength}`);
        }
        this.childType = argType;
        this.staticLength = arrayLength;
      }
      toString() {
        return `${this.childType.toString()}[${this.staticLength}]`;
      }
      equals(other) {
        return other instanceof ABIArrayStaticType && this.staticLength === other.staticLength && this.childType.equals(other.childType);
      }
      isDynamic() {
        return this.childType.isDynamic();
      }
      byteLen() {
        if (this.childType.constructor === ABIBoolType) {
          return Math.ceil(this.staticLength / 8);
        }
        return this.staticLength * this.childType.byteLen();
      }
      encode(value) {
        if (!Array.isArray(value) && !(value instanceof Uint8Array)) {
          throw new Error(`Cannot encode value as ${this.toString()}: ${value}`);
        }
        if (value.length !== this.staticLength) {
          throw new Error(`Value array does not match static array length. Expected ${this.staticLength}, got ${value.length}`);
        }
        const convertedTuple = this.toABITupleType();
        return convertedTuple.encode(value);
      }
      decode(byteString) {
        const convertedTuple = this.toABITupleType();
        return convertedTuple.decode(byteString);
      }
      toABITupleType() {
        return new ABITupleType(Array(this.staticLength).fill(this.childType));
      }
    };
    ABIArrayDynamicType = class extends ABIType {
      constructor(argType) {
        super();
        this.childType = argType;
      }
      toString() {
        return `${this.childType.toString()}[]`;
      }
      equals(other) {
        return other instanceof ABIArrayDynamicType && this.childType.equals(other.childType);
      }
      isDynamic() {
        return true;
      }
      byteLen() {
        throw new Error(`${this.toString()} is a dynamic type`);
      }
      encode(value) {
        if (!Array.isArray(value) && !(value instanceof Uint8Array)) {
          throw new Error(`Cannot encode value as ${this.toString()}: ${value}`);
        }
        const convertedTuple = this.toABITupleType(value.length);
        const encodedTuple = convertedTuple.encode(value);
        const encodedLength = bigIntToBytes(convertedTuple.childTypes.length, LENGTH_ENCODE_BYTE_SIZE);
        const mergedBytes = concatArrays(encodedLength, encodedTuple);
        return mergedBytes;
      }
      decode(byteString) {
        const buf = Buffer.from(byteString);
        const byteLength = buf.readUIntBE(0, LENGTH_ENCODE_BYTE_SIZE);
        const convertedTuple = this.toABITupleType(byteLength);
        return convertedTuple.decode(byteString.slice(LENGTH_ENCODE_BYTE_SIZE, byteString.length));
      }
      toABITupleType(length) {
        return new ABITupleType(Array(length).fill(this.childType));
      }
    };
    ABITupleType = class extends ABIType {
      constructor(argTypes) {
        super();
        if (argTypes.length >= MAX_LEN) {
          throw new Error("tuple type child type number larger than maximum uint16 error");
        }
        this.childTypes = argTypes;
      }
      toString() {
        const typeStrings = [];
        for (let i = 0; i < this.childTypes.length; i++) {
          typeStrings[i] = this.childTypes[i].toString();
        }
        return `(${typeStrings.join(",")})`;
      }
      equals(other) {
        return other instanceof ABITupleType && this.childTypes.length === other.childTypes.length && this.childTypes.every((child, index) => child.equals(other.childTypes[index]));
      }
      isDynamic() {
        const isDynamic = (child) => child.isDynamic();
        return this.childTypes.some(isDynamic);
      }
      byteLen() {
        let size = 0;
        for (let i = 0; i < this.childTypes.length; i++) {
          if (this.childTypes[i].constructor === ABIBoolType) {
            const after = findBoolLR(this.childTypes, i, 1);
            const boolNum = after + 1;
            i += after;
            size += Math.trunc((boolNum + 7) / 8);
          } else {
            const childByteSize = this.childTypes[i].byteLen();
            size += childByteSize;
          }
        }
        return size;
      }
      encode(value) {
        if (!Array.isArray(value) && !(value instanceof Uint8Array)) {
          throw new Error(`Cannot encode value as ${this.toString()}: ${value}`);
        }
        const values = Array.from(value);
        if (value.length > MAX_LEN) {
          throw new Error("length of tuple array should not exceed a uint16");
        }
        const tupleTypes = this.childTypes;
        const heads = [];
        const tails = [];
        const isDynamicIndex = /* @__PURE__ */ new Map();
        let i = 0;
        while (i < tupleTypes.length) {
          const tupleType = tupleTypes[i];
          if (tupleType.isDynamic()) {
            isDynamicIndex.set(heads.length, true);
            heads.push(new Uint8Array([0, 0]));
            tails.push(tupleType.encode(values[i]));
          } else {
            if (tupleType.constructor === ABIBoolType) {
              const before = findBoolLR(tupleTypes, i, -1);
              let after = findBoolLR(tupleTypes, i, 1);
              if (before % 8 !== 0) {
                throw new Error("expected before index should have number of bool mod 8 equal 0");
              }
              after = Math.min(7, after);
              const compressedInt = compressMultipleBool(values.slice(i, i + after + 1));
              heads.push(bigIntToBytes(compressedInt, 1));
              i += after;
            } else {
              const encodedTupleValue = tupleType.encode(values[i]);
              heads.push(encodedTupleValue);
            }
            isDynamicIndex.set(i, false);
            tails.push(new Uint8Array());
          }
          i += 1;
        }
        let headLength = 0;
        for (const headElement of heads) {
          headLength += headElement.length;
        }
        let tailLength = 0;
        for (let j = 0; j < heads.length; j++) {
          if (isDynamicIndex.get(j)) {
            const headValue = headLength + tailLength;
            if (headValue > MAX_LEN) {
              throw new Error(`byte length of ${headValue} should not exceed a uint16`);
            }
            heads[j] = bigIntToBytes(headValue, LENGTH_ENCODE_BYTE_SIZE);
          }
          tailLength += tails[j].length;
        }
        return concatArrays(...heads, ...tails);
      }
      decode(byteString) {
        const tupleTypes = this.childTypes;
        const dynamicSegments = [];
        const valuePartition = [];
        let i = 0;
        let iterIndex = 0;
        const buf = Buffer.from(byteString);
        while (i < tupleTypes.length) {
          const tupleType = tupleTypes[i];
          if (tupleType.isDynamic()) {
            if (byteString.slice(iterIndex, byteString.length).length < LENGTH_ENCODE_BYTE_SIZE) {
              throw new Error("dynamic type in tuple is too short to be decoded");
            }
            const dynamicIndex = buf.readUIntBE(iterIndex, LENGTH_ENCODE_BYTE_SIZE);
            if (dynamicSegments.length > 0) {
              dynamicSegments[dynamicSegments.length - 1].right = dynamicIndex;
              if (dynamicIndex < dynamicSegments[dynamicSegments.length - 1].left) {
                throw new Error("dynamic index segment miscalculation: left is greater than right index");
              }
            }
            const seg = {
              left: dynamicIndex,
              right: -1
            };
            dynamicSegments.push(seg);
            valuePartition.push(null);
            iterIndex += LENGTH_ENCODE_BYTE_SIZE;
          } else {
            if (tupleType.constructor === ABIBoolType) {
              const before = findBoolLR(this.childTypes, i, -1);
              let after = findBoolLR(this.childTypes, i, 1);
              if (before % 8 !== 0) {
                throw new Error("expected before bool number mod 8 === 0");
              }
              after = Math.min(7, after);
              for (let boolIndex = 0; boolIndex <= after; boolIndex++) {
                const boolMask = 128 >> boolIndex;
                if ((byteString[iterIndex] & boolMask) > 0) {
                  valuePartition.push(new Uint8Array([128]));
                } else {
                  valuePartition.push(new Uint8Array([0]));
                }
              }
              i += after;
              iterIndex += 1;
            } else {
              const currLen = tupleType.byteLen();
              valuePartition.push(byteString.slice(iterIndex, iterIndex + currLen));
              iterIndex += currLen;
            }
          }
          if (i !== tupleTypes.length - 1 && iterIndex >= byteString.length) {
            throw new Error("input byte not enough to decode");
          }
          i += 1;
        }
        if (dynamicSegments.length > 0) {
          dynamicSegments[dynamicSegments.length - 1].right = byteString.length;
          iterIndex = byteString.length;
        }
        if (iterIndex < byteString.length) {
          throw new Error("input byte not fully consumed");
        }
        for (let j = 0; j < dynamicSegments.length; j++) {
          const seg = dynamicSegments[j];
          if (seg.left > seg.right) {
            throw new Error("dynamic segment should display a [l, r] space with l <= r");
          }
          if (j !== dynamicSegments.length - 1 && seg.right !== dynamicSegments[j + 1].left) {
            throw new Error("dynamic segment should be consecutive");
          }
        }
        let segIndex = 0;
        for (let j = 0; j < tupleTypes.length; j++) {
          if (tupleTypes[j].isDynamic()) {
            valuePartition[j] = byteString.slice(dynamicSegments[segIndex].left, dynamicSegments[segIndex].right);
            segIndex += 1;
          }
        }
        const returnValues = [];
        for (let j = 0; j < tupleTypes.length; j++) {
          const valueTi = tupleTypes[j].decode(valuePartition[j]);
          returnValues.push(valueTi);
        }
        return returnValues;
      }
      static parseTupleContent(str) {
        if (str.length === 0) {
          return [];
        }
        if (str.endsWith(",") || str.startsWith(",")) {
          throw new Error("tuple string should not start with comma");
        }
        if (str.includes(",,")) {
          throw new Error("tuple string should not have consecutive commas");
        }
        const tupleStrings = [];
        let depth = 0;
        let word = "";
        for (const char of str) {
          word += char;
          if (char === "(") {
            depth += 1;
          } else if (char === ")") {
            depth -= 1;
          } else if (char === ",") {
            if (depth === 0) {
              tupleStrings.push(word.slice(0, word.length - 1));
              word = "";
            }
          }
        }
        if (word.length !== 0) {
          tupleStrings.push(word);
        }
        if (depth !== 0) {
          throw new Error("tuple string has mismatched parentheses");
        }
        return tupleStrings;
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/abi/transaction.js
function abiTypeIsTransaction(type) {
  return type === ABITransactionType.any || type === ABITransactionType.pay || type === ABITransactionType.keyreg || type === ABITransactionType.acfg || type === ABITransactionType.axfer || type === ABITransactionType.afrz || type === ABITransactionType.appl;
}
function abiCheckTransactionType(type, txn) {
  if (type === ABITransactionType.any) {
    return true;
  }
  return txn.type && txn.type.toString() === type.toString();
}
var ABITransactionType;
var init_transaction2 = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/abi/transaction.js"() {
    (function(ABITransactionType2) {
      ABITransactionType2["any"] = "txn";
      ABITransactionType2["pay"] = "pay";
      ABITransactionType2["keyreg"] = "keyreg";
      ABITransactionType2["acfg"] = "acfg";
      ABITransactionType2["axfer"] = "axfer";
      ABITransactionType2["afrz"] = "afrz";
      ABITransactionType2["appl"] = "appl";
    })(ABITransactionType || (ABITransactionType = {}));
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/abi/reference.js
function abiTypeIsReference(type) {
  return type === ABIReferenceType.account || type === ABIReferenceType.application || type === ABIReferenceType.asset;
}
var ABIReferenceType;
var init_reference = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/abi/reference.js"() {
    (function(ABIReferenceType2) {
      ABIReferenceType2["account"] = "account";
      ABIReferenceType2["application"] = "application";
      ABIReferenceType2["asset"] = "asset";
    })(ABIReferenceType || (ABIReferenceType = {}));
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/abi/method.js
function parseMethodSignature(signature) {
  const argsStart = signature.indexOf("(");
  if (argsStart === -1) {
    throw new Error(`Invalid method signature: ${signature}`);
  }
  let argsEnd = -1;
  let depth = 0;
  for (let i = argsStart; i < signature.length; i++) {
    const char = signature[i];
    if (char === "(") {
      depth += 1;
    } else if (char === ")") {
      if (depth === 0) {
        break;
      }
      depth -= 1;
      if (depth === 0) {
        argsEnd = i;
        break;
      }
    }
  }
  if (argsEnd === -1) {
    throw new Error(`Invalid method signature: ${signature}`);
  }
  return {
    name: signature.slice(0, argsStart),
    args: ABITupleType.parseTupleContent(signature.slice(argsStart + 1, argsEnd)),
    returns: signature.slice(argsEnd + 1)
  };
}
function getMethodByName(methods, name) {
  if (methods === null || !Array.isArray(methods) || !methods.every((item) => item instanceof ABIMethod))
    throw new Error("Methods list provided is null or not the correct type");
  const filteredMethods = methods.filter((m) => m.name === name);
  if (filteredMethods.length > 1)
    throw new Error(`found ${filteredMethods.length} methods with the same name ${filteredMethods.map((m) => m.getSignature()).join(",")}`);
  if (filteredMethods.length === 0)
    throw new Error(`found 0 methods with the name ${name}`);
  return filteredMethods[0];
}
var ABIMethod;
var init_method = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/abi/method.js"() {
    init_naclWrappers();
    init_abi_type();
    init_transaction2();
    init_reference();
    ABIMethod = class {
      constructor(params) {
        if (typeof params.name !== "string" || typeof params.returns !== "object" || !Array.isArray(params.args)) {
          throw new Error("Invalid ABIMethod parameters");
        }
        this.name = params.name;
        this.description = params.desc;
        this.args = params.args.map(({ type, name, desc }) => {
          if (abiTypeIsTransaction(type) || abiTypeIsReference(type)) {
            return {
              type,
              name,
              description: desc
            };
          }
          return {
            type: ABIType.from(type),
            name,
            description: desc
          };
        });
        this.returns = {
          type: params.returns.type === "void" ? params.returns.type : ABIType.from(params.returns.type),
          description: params.returns.desc
        };
      }
      getSignature() {
        const args = this.args.map((arg) => arg.type.toString()).join(",");
        const returns = this.returns.type.toString();
        return `${this.name}(${args})${returns}`;
      }
      getSelector() {
        const hash = genericHash(this.getSignature());
        return new Uint8Array(hash.slice(0, 4));
      }
      txnCount() {
        let count = 1;
        for (const arg of this.args) {
          if (typeof arg.type === "string" && abiTypeIsTransaction(arg.type)) {
            count += 1;
          }
        }
        return count;
      }
      toJSON() {
        return {
          name: this.name,
          desc: this.description,
          args: this.args.map(({ type, name, description }) => ({
            type: type.toString(),
            name,
            desc: description
          })),
          returns: {
            type: this.returns.type.toString(),
            desc: this.returns.description
          }
        };
      }
      static fromSignature(signature) {
        const { name, args, returns } = parseMethodSignature(signature);
        return new ABIMethod({
          name,
          args: args.map((arg) => ({ type: arg })),
          returns: { type: returns }
        });
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/abi/contract.js
var ABIContract;
var init_contract = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/abi/contract.js"() {
    init_method();
    ABIContract = class {
      constructor(params) {
        if (typeof params.name !== "string" || !Array.isArray(params.methods) || params.networks && typeof params.networks !== "object") {
          throw new Error("Invalid ABIContract parameters");
        }
        this.name = params.name;
        this.description = params.desc;
        this.networks = params.networks ? { ...params.networks } : {};
        this.methods = params.methods.map((method) => new ABIMethod(method));
      }
      toJSON() {
        return {
          name: this.name,
          desc: this.description,
          networks: this.networks,
          methods: this.methods.map((method) => method.toJSON())
        };
      }
      getMethodByName(name) {
        return getMethodByName(this.methods, name);
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/abi/interface.js
var ABIInterface;
var init_interface = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/abi/interface.js"() {
    init_method();
    ABIInterface = class {
      constructor(params) {
        if (typeof params.name !== "string" || !Array.isArray(params.methods)) {
          throw new Error("Invalid ABIInterface parameters");
        }
        this.name = params.name;
        this.description = params.desc;
        this.methods = params.methods.map((method) => new ABIMethod(method));
      }
      toJSON() {
        return {
          name: this.name,
          desc: this.description,
          methods: this.methods.map((method) => method.toJSON())
        };
      }
      getMethodByName(name) {
        return getMethodByName(this.methods, name);
      }
    };
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/abi/index.js
var init_abi = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/abi/index.js"() {
    init_abi_type();
    init_contract();
    init_interface();
    init_method();
    init_transaction2();
    init_reference();
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/composer.js
function populateForeignArray(valueToAdd, array, zeroValue) {
  if (zeroValue != null && valueToAdd === zeroValue) {
    return 0;
  }
  const offset = zeroValue == null ? 0 : 1;
  for (let i = 0; i < array.length; i++) {
    if (valueToAdd === array[i]) {
      return i + offset;
    }
  }
  array.push(valueToAdd);
  return array.length - 1 + offset;
}
var RETURN_PREFIX, MAX_APP_ARGS, AtomicTransactionComposerStatus, AtomicTransactionComposer;
var init_composer = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/composer.js"() {
    init_buffer();
    init_abi();
    init_types();
    init_group();
    init_makeTxn();
    init_signer();
    init_transaction();
    init_base();
    init_wait();
    init_encoding();
    RETURN_PREFIX = Buffer.from([21, 31, 124, 117]);
    MAX_APP_ARGS = 16;
    (function(AtomicTransactionComposerStatus2) {
      AtomicTransactionComposerStatus2[AtomicTransactionComposerStatus2["BUILDING"] = 0] = "BUILDING";
      AtomicTransactionComposerStatus2[AtomicTransactionComposerStatus2["BUILT"] = 1] = "BUILT";
      AtomicTransactionComposerStatus2[AtomicTransactionComposerStatus2["SIGNED"] = 2] = "SIGNED";
      AtomicTransactionComposerStatus2[AtomicTransactionComposerStatus2["SUBMITTED"] = 3] = "SUBMITTED";
      AtomicTransactionComposerStatus2[AtomicTransactionComposerStatus2["COMMITTED"] = 4] = "COMMITTED";
    })(AtomicTransactionComposerStatus || (AtomicTransactionComposerStatus = {}));
    AtomicTransactionComposer = class {
      constructor() {
        this.status = AtomicTransactionComposerStatus.BUILDING;
        this.transactions = [];
        this.methodCalls = /* @__PURE__ */ new Map();
        this.signedTxns = [];
        this.txIDs = [];
      }
      /**
       * Get the status of this composer's transaction group.
       */
      getStatus() {
        return this.status;
      }
      /**
       * Get the number of transactions currently in this atomic group.
       */
      count() {
        return this.transactions.length;
      }
      /**
       * Create a new composer with the same underlying transactions. The new composer's status will be
       * BUILDING, so additional transactions may be added to it.
       */
      clone() {
        const theClone = new AtomicTransactionComposer();
        theClone.transactions = this.transactions.map(({ txn, signer }) => ({
          // not quite a deep copy, but good enough for our purposes (modifying txn.group in buildGroup)
          txn: Transaction.from_obj_for_encoding({
            ...txn.get_obj_for_encoding(),
            // erase the group ID
            grp: void 0
          }),
          signer
        }));
        theClone.methodCalls = new Map(this.methodCalls);
        return theClone;
      }
      /**
       * Add a transaction to this atomic group.
       *
       * An error will be thrown if the transaction has a nonzero group ID, the composer's status is
       * not BUILDING, or if adding this transaction causes the current group to exceed MAX_GROUP_SIZE.
       */
      addTransaction(txnAndSigner) {
        if (this.status !== AtomicTransactionComposerStatus.BUILDING) {
          throw new Error("Cannot add transactions when composer status is not BUILDING");
        }
        if (this.transactions.length === AtomicTransactionComposer.MAX_GROUP_SIZE) {
          throw new Error(`Adding an additional transaction exceeds the maximum atomic group size of ${AtomicTransactionComposer.MAX_GROUP_SIZE}`);
        }
        if (txnAndSigner.txn.group && txnAndSigner.txn.group.some((v) => v !== 0)) {
          throw new Error("Cannot add a transaction with nonzero group ID");
        }
        this.transactions.push(txnAndSigner);
      }
      /**
       * Add a smart contract method call to this atomic group.
       *
       * An error will be thrown if the composer's status is not BUILDING, if adding this transaction
       * causes the current group to exceed MAX_GROUP_SIZE, or if the provided arguments are invalid
       * for the given method.
       */
      addMethodCall({ appID, method, methodArgs, sender, suggestedParams, onComplete, approvalProgram, clearProgram, numGlobalInts, numGlobalByteSlices, numLocalInts, numLocalByteSlices, extraPages, appAccounts, appForeignApps, appForeignAssets, boxes, note, lease, rekeyTo, signer }) {
        if (this.status !== AtomicTransactionComposerStatus.BUILDING) {
          throw new Error("Cannot add transactions when composer status is not BUILDING");
        }
        if (this.transactions.length + method.txnCount() > AtomicTransactionComposer.MAX_GROUP_SIZE) {
          throw new Error(`Adding additional transactions exceeds the maximum atomic group size of ${AtomicTransactionComposer.MAX_GROUP_SIZE}`);
        }
        if (appID === 0) {
          if (approvalProgram == null || clearProgram == null || numGlobalInts == null || numGlobalByteSlices == null || numLocalInts == null || numLocalByteSlices == null) {
            throw new Error("One of the following required parameters for application creation is missing: approvalProgram, clearProgram, numGlobalInts, numGlobalByteSlices, numLocalInts, numLocalByteSlices");
          }
        } else if (onComplete === OnApplicationComplete.UpdateApplicationOC) {
          if (approvalProgram == null || clearProgram == null) {
            throw new Error("One of the following required parameters for OnApplicationComplete.UpdateApplicationOC is missing: approvalProgram, clearProgram");
          }
          if (numGlobalInts != null || numGlobalByteSlices != null || numLocalInts != null || numLocalByteSlices != null || extraPages != null) {
            throw new Error("One of the following application creation parameters were set on a non-creation call: numGlobalInts, numGlobalByteSlices, numLocalInts, numLocalByteSlices, extraPages");
          }
        } else if (approvalProgram != null || clearProgram != null || numGlobalInts != null || numGlobalByteSlices != null || numLocalInts != null || numLocalByteSlices != null || extraPages != null) {
          throw new Error("One of the following application creation parameters were set on a non-creation call: approvalProgram, clearProgram, numGlobalInts, numGlobalByteSlices, numLocalInts, numLocalByteSlices, extraPages");
        }
        if (methodArgs == null) {
          methodArgs = [];
        }
        if (methodArgs.length !== method.args.length) {
          throw new Error(`Incorrect number of method arguments. Expected ${method.args.length}, got ${methodArgs.length}`);
        }
        let basicArgTypes = [];
        let basicArgValues = [];
        const txnArgs = [];
        const refArgTypes = [];
        const refArgValues = [];
        const refArgIndexToBasicArgIndex = /* @__PURE__ */ new Map();
        const boxReferences = !boxes ? [] : boxes;
        for (let i = 0; i < methodArgs.length; i++) {
          let argType = method.args[i].type;
          const argValue = methodArgs[i];
          if (abiTypeIsTransaction(argType)) {
            if (!isTransactionWithSigner(argValue) || !abiCheckTransactionType(argType, argValue.txn)) {
              throw new Error(`Expected ${argType} TransactionWithSigner for argument at index ${i}`);
            }
            if (argValue.txn.group && argValue.txn.group.some((v) => v !== 0)) {
              throw new Error("Cannot add a transaction with nonzero group ID");
            }
            txnArgs.push(argValue);
            continue;
          }
          if (isTransactionWithSigner(argValue)) {
            throw new Error(`Expected non-transaction value for argument at index ${i}`);
          }
          if (abiTypeIsReference(argType)) {
            refArgIndexToBasicArgIndex.set(refArgTypes.length, basicArgTypes.length);
            refArgTypes.push(argType);
            refArgValues.push(argValue);
            argType = new ABIUintType(8);
          }
          if (typeof argType === "string") {
            throw new Error(`Unknown ABI type: ${argType}`);
          }
          basicArgTypes.push(argType);
          basicArgValues.push(argValue);
        }
        const resolvedRefIndexes = [];
        const foreignAccounts = appAccounts == null ? [] : appAccounts.slice();
        const foreignApps = appForeignApps == null ? [] : appForeignApps.slice();
        const foreignAssets = appForeignAssets == null ? [] : appForeignAssets.slice();
        for (let i = 0; i < refArgTypes.length; i++) {
          const refType = refArgTypes[i];
          const refValue = refArgValues[i];
          let resolved = 0;
          switch (refType) {
            case ABIReferenceType.account: {
              const addressType = new ABIAddressType();
              const address = addressType.decode(addressType.encode(refValue));
              resolved = populateForeignArray(address, foreignAccounts, sender);
              break;
            }
            case ABIReferenceType.application: {
              const uint64Type = new ABIUintType(64);
              const refAppID = uint64Type.decode(uint64Type.encode(refValue));
              if (refAppID > Number.MAX_SAFE_INTEGER) {
                throw new Error(`Expected safe integer for application value, got ${refAppID}`);
              }
              resolved = populateForeignArray(Number(refAppID), foreignApps, appID);
              break;
            }
            case ABIReferenceType.asset: {
              const uint64Type = new ABIUintType(64);
              const refAssetID = uint64Type.decode(uint64Type.encode(refValue));
              if (refAssetID > Number.MAX_SAFE_INTEGER) {
                throw new Error(`Expected safe integer for asset value, got ${refAssetID}`);
              }
              resolved = populateForeignArray(Number(refAssetID), foreignAssets);
              break;
            }
            default:
              throw new Error(`Unknown reference type: ${refType}`);
          }
          resolvedRefIndexes.push(resolved);
        }
        for (let i = 0; i < resolvedRefIndexes.length; i++) {
          const basicArgIndex = refArgIndexToBasicArgIndex.get(i);
          basicArgValues[basicArgIndex] = resolvedRefIndexes[i];
        }
        if (basicArgTypes.length > MAX_APP_ARGS - 1) {
          const lastArgTupleTypes = basicArgTypes.slice(MAX_APP_ARGS - 2);
          const lastArgTupleValues = basicArgValues.slice(MAX_APP_ARGS - 2);
          basicArgTypes = basicArgTypes.slice(0, MAX_APP_ARGS - 2);
          basicArgValues = basicArgValues.slice(0, MAX_APP_ARGS - 2);
          basicArgTypes.push(new ABITupleType(lastArgTupleTypes));
          basicArgValues.push(lastArgTupleValues);
        }
        const appArgsEncoded = [method.getSelector()];
        for (let i = 0; i < basicArgTypes.length; i++) {
          appArgsEncoded.push(basicArgTypes[i].encode(basicArgValues[i]));
        }
        const appCall = {
          txn: makeApplicationCallTxnFromObject({
            from: sender,
            appIndex: appID,
            appArgs: appArgsEncoded,
            accounts: foreignAccounts,
            foreignApps,
            foreignAssets,
            boxes: boxReferences,
            onComplete: onComplete == null ? OnApplicationComplete.NoOpOC : onComplete,
            approvalProgram,
            clearProgram,
            numGlobalInts,
            numGlobalByteSlices,
            numLocalInts,
            numLocalByteSlices,
            extraPages,
            lease,
            note,
            rekeyTo,
            suggestedParams
          }),
          signer
        };
        this.transactions.push(...txnArgs, appCall);
        this.methodCalls.set(this.transactions.length - 1, method);
      }
      /**
       * Finalize the transaction group and returned the finalized transactions.
       *
       * The composer's status will be at least BUILT after executing this method.
       */
      buildGroup() {
        if (this.status === AtomicTransactionComposerStatus.BUILDING) {
          if (this.transactions.length === 0) {
            throw new Error("Cannot build a group with 0 transactions");
          }
          if (this.transactions.length > 1) {
            assignGroupID(this.transactions.map((txnWithSigner) => txnWithSigner.txn));
          }
          this.status = AtomicTransactionComposerStatus.BUILT;
        }
        return this.transactions;
      }
      /**
       * Obtain signatures for each transaction in this group. If signatures have already been obtained,
       * this method will return cached versions of the signatures.
       *
       * The composer's status will be at least SIGNED after executing this method.
       *
       * An error will be thrown if signing any of the transactions fails.
       *
       * @returns A promise that resolves to an array of signed transactions.
       */
      async gatherSignatures() {
        if (this.status >= AtomicTransactionComposerStatus.SIGNED) {
          return this.signedTxns;
        }
        const txnsWithSigners = this.buildGroup();
        const txnGroup = txnsWithSigners.map((txnWithSigner) => txnWithSigner.txn);
        const indexesPerSigner = /* @__PURE__ */ new Map();
        for (let i = 0; i < txnsWithSigners.length; i++) {
          const { signer } = txnsWithSigners[i];
          if (!indexesPerSigner.has(signer)) {
            indexesPerSigner.set(signer, []);
          }
          indexesPerSigner.get(signer).push(i);
        }
        const orderedSigners = Array.from(indexesPerSigner);
        const batchedSigs = await Promise.all(orderedSigners.map(([signer, indexes]) => signer(txnGroup, indexes)));
        const signedTxns = txnsWithSigners.map(() => null);
        for (let signerIndex = 0; signerIndex < orderedSigners.length; signerIndex++) {
          const indexes = orderedSigners[signerIndex][1];
          const sigs = batchedSigs[signerIndex];
          for (let i = 0; i < indexes.length; i++) {
            signedTxns[indexes[i]] = sigs[i];
          }
        }
        if (!signedTxns.every((sig) => sig != null)) {
          throw new Error(`Missing signatures. Got ${signedTxns}`);
        }
        const txIDs = signedTxns.map((stxn, index) => {
          try {
            return decodeSignedTransaction(stxn).txn.txID();
          } catch (err) {
            throw new Error(`Cannot decode signed transaction at index ${index}. ${err}`);
          }
        });
        this.signedTxns = signedTxns;
        this.txIDs = txIDs;
        this.status = AtomicTransactionComposerStatus.SIGNED;
        return signedTxns;
      }
      /**
       * Send the transaction group to the network, but don't wait for it to be committed to a block. An
       * error will be thrown if submission fails.
       *
       * The composer's status must be SUBMITTED or lower before calling this method. If submission is
       * successful, this composer's status will update to SUBMITTED.
       *
       * Note: a group can only be submitted again if it fails.
       *
       * @param client - An Algodv2 client
       *
       * @returns A promise that, upon success, resolves to a list of TxIDs of the submitted transactions.
       */
      async submit(client) {
        if (this.status > AtomicTransactionComposerStatus.SUBMITTED) {
          throw new Error("Transaction group cannot be resubmitted");
        }
        const stxns = await this.gatherSignatures();
        await client.sendRawTransaction(stxns).do();
        this.status = AtomicTransactionComposerStatus.SUBMITTED;
        return this.txIDs;
      }
      /**
       * Simulates the transaction group in the network.
       *
       * The composer will try to sign any transactions in the group, then simulate
       * the results.
       * Simulating the group will not change the composer's status.
       *
       * @param client - An Algodv2 client
       * @param request - SimulateRequest with options in simulation.
       *   If provided, the request's transaction group will be overrwritten by the composer's group,
       *   only simulation related options will be used.
       *
       * @returns A promise that, upon success, resolves to an object containing an
       *   array of results containing one element for each method call transaction
       *   in this group (ABIResult[]) and the SimulateResponse object.
       */
      async simulate(client, request) {
        if (this.status > AtomicTransactionComposerStatus.SUBMITTED) {
          throw new Error("Simulated Transaction group has already been submitted to the network");
        }
        const stxns = await this.gatherSignatures();
        const txnObjects = stxns.map((stxn) => decode2(stxn));
        const currentRequest = request == null ? new SimulateRequest({ txnGroups: [] }) : request;
        currentRequest.txnGroups = [
          new SimulateRequestTransactionGroup({
            txns: txnObjects
          })
        ];
        const simulateResponse = await client.simulateTransactions(currentRequest).do();
        const methodResults = [];
        for (const [txnIndex, method] of this.methodCalls) {
          const txID = this.txIDs[txnIndex];
          const pendingInfo = simulateResponse.txnGroups[0].txnResults[txnIndex].txnResult;
          const methodResult = {
            txID,
            rawReturnValue: new Uint8Array(),
            method
          };
          methodResults.push(AtomicTransactionComposer.parseMethodResponse(method, methodResult, pendingInfo.get_obj_for_encoding()));
        }
        return { methodResults, simulateResponse };
      }
      /**
       * Send the transaction group to the network and wait until it's committed to a block. An error
       * will be thrown if submission or execution fails.
       *
       * The composer's status must be SUBMITTED or lower before calling this method, since execution is
       * only allowed once. If submission is successful, this composer's status will update to SUBMITTED.
       * If the execution is also successful, this composer's status will update to COMMITTED.
       *
       * Note: a group can only be submitted again if it fails.
       *
       * @param client - An Algodv2 client
       * @param waitRounds - The maximum number of rounds to wait for transaction confirmation
       *
       * @returns A promise that, upon success, resolves to an object containing the confirmed round for
       *   this transaction, the txIDs of the submitted transactions, and an array of results containing
       *   one element for each method call transaction in this group.
       */
      async execute(client, waitRounds) {
        if (this.status === AtomicTransactionComposerStatus.COMMITTED) {
          throw new Error("Transaction group has already been executed successfully");
        }
        const txIDs = await this.submit(client);
        this.status = AtomicTransactionComposerStatus.SUBMITTED;
        const firstMethodCallIndex = this.transactions.findIndex((_, index) => this.methodCalls.has(index));
        const indexToWaitFor = firstMethodCallIndex === -1 ? 0 : firstMethodCallIndex;
        const confirmedTxnInfo = await waitForConfirmation(client, txIDs[indexToWaitFor], waitRounds);
        this.status = AtomicTransactionComposerStatus.COMMITTED;
        const confirmedRound = confirmedTxnInfo["confirmed-round"];
        const methodResults = [];
        for (const [txnIndex, method] of this.methodCalls) {
          const txID = txIDs[txnIndex];
          let methodResult = {
            txID,
            rawReturnValue: new Uint8Array(),
            method
          };
          try {
            const pendingInfo = txnIndex === firstMethodCallIndex ? confirmedTxnInfo : (
              // eslint-disable-next-line no-await-in-loop
              await client.pendingTransactionInformation(txID).do()
            );
            methodResult = AtomicTransactionComposer.parseMethodResponse(method, methodResult, pendingInfo);
          } catch (err) {
            methodResult.decodeError = err;
          }
          methodResults.push(methodResult);
        }
        return {
          confirmedRound,
          txIDs,
          methodResults
        };
      }
      /**
       * Parses a single ABI Method transaction log into a ABI result object.
       *
       * @param method
       * @param methodResult
       * @param pendingInfo
       * @returns An ABIResult object
       */
      static parseMethodResponse(method, methodResult, pendingInfo) {
        const returnedResult = methodResult;
        try {
          returnedResult.txInfo = pendingInfo;
          if (method.returns.type !== "void") {
            const logs = pendingInfo.logs || [];
            if (logs.length === 0) {
              throw new Error("App call transaction did not log a return value");
            }
            const lastLog = Buffer.from(logs[logs.length - 1], "base64");
            if (lastLog.byteLength < 4 || !lastLog.slice(0, 4).equals(RETURN_PREFIX)) {
              throw new Error("App call transaction did not log a return value");
            }
            returnedResult.rawReturnValue = new Uint8Array(lastLog.slice(4));
            returnedResult.returnValue = method.returns.type.decode(methodResult.rawReturnValue);
          }
        } catch (err) {
          returnedResult.decodeError = err;
        }
        return returnedResult;
      }
    };
    AtomicTransactionComposer.MAX_GROUP_SIZE = 16;
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/types/multisig.js
var init_multisig2 = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/types/multisig.js"() {
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/types/address.js
var init_address2 = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/types/address.js"() {
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/types/index.js
var init_types3 = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/types/index.js"() {
    init_transactions();
    init_multisig2();
    init_address2();
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/main.js
var main_exports = {};
__export(main_exports, {
  ABIAddressType: () => ABIAddressType,
  ABIArrayDynamicType: () => ABIArrayDynamicType,
  ABIArrayStaticType: () => ABIArrayStaticType,
  ABIBoolType: () => ABIBoolType,
  ABIByteType: () => ABIByteType,
  ABIContract: () => ABIContract,
  ABIInterface: () => ABIInterface,
  ABIMethod: () => ABIMethod,
  ABIReferenceType: () => ABIReferenceType,
  ABIStringType: () => ABIStringType,
  ABITransactionType: () => ABITransactionType,
  ABITupleType: () => ABITupleType,
  ABIType: () => ABIType,
  ABIUfixedType: () => ABIUfixedType,
  ABIUintType: () => ABIUintType,
  ADDR_BYTE_SIZE: () => ADDR_BYTE_SIZE,
  ALGORAND_MIN_TX_FEE: () => ALGORAND_MIN_TX_FEE,
  Algodv2: () => AlgodClient,
  AtomicTransactionComposer: () => AtomicTransactionComposer,
  AtomicTransactionComposerStatus: () => AtomicTransactionComposerStatus,
  DryrunResult: () => DryrunResult,
  ERROR_INVALID_MICROALGOS: () => ERROR_INVALID_MICROALGOS,
  ERROR_MULTISIG_BAD_SENDER: () => ERROR_MULTISIG_BAD_SENDER,
  INVALID_MICROALGOS_ERROR_MSG: () => INVALID_MICROALGOS_ERROR_MSG,
  Indexer: () => IndexerClient,
  IntDecoding: () => intDecoding_default,
  Kmd: () => Kmd,
  LENGTH_ENCODE_BYTE_SIZE: () => LENGTH_ENCODE_BYTE_SIZE,
  LogicSig: () => LogicSig,
  LogicSigAccount: () => LogicSigAccount,
  MAX_LEN: () => MAX_LEN,
  MULTISIG_BAD_SENDER_ERROR_MSG: () => MULTISIG_BAD_SENDER_ERROR_MSG,
  OnApplicationComplete: () => OnApplicationComplete,
  SINGLE_BOOL_SIZE: () => SINGLE_BOOL_SIZE,
  SINGLE_BYTE_SIZE: () => SINGLE_BYTE_SIZE,
  SourceMap: () => SourceMap,
  Transaction: () => Transaction,
  TransactionType: () => TransactionType,
  abiCheckTransactionType: () => abiCheckTransactionType,
  abiTypeIsReference: () => abiTypeIsReference,
  abiTypeIsTransaction: () => abiTypeIsTransaction,
  algosToMicroalgos: () => algosToMicroalgos,
  appendSignMultisigTransaction: () => appendSignMultisigTransaction,
  appendSignRawMultisigSignature: () => appendSignRawMultisigSignature,
  assignGroupID: () => assignGroupID,
  bigIntToBytes: () => bigIntToBytes,
  bytesToBigInt: () => bytesToBigInt,
  computeGroupID: () => computeGroupID,
  createDryrun: () => createDryrun,
  createMultisigTransaction: () => createMultisigTransaction,
  decodeAddress: () => decodeAddress,
  decodeObj: () => decodeObj,
  decodeSignedTransaction: () => decodeSignedTransaction,
  decodeUint64: () => decodeUint64,
  decodeUnsignedTransaction: () => decodeUnsignedTransaction,
  encodeAddress: () => encodeAddress,
  encodeObj: () => encodeObj,
  encodeUint64: () => encodeUint64,
  encodeUnsignedSimulateTransaction: () => encodeUnsignedSimulateTransaction,
  encodeUnsignedTransaction: () => encodeUnsignedTransaction,
  generateAccount: () => generateAccount,
  getApplicationAddress: () => getApplicationAddress,
  getMethodByName: () => getMethodByName,
  indexerModels: () => types_exports2,
  instantiateTxnIfNeeded: () => instantiateTxnIfNeeded,
  isTransactionWithSigner: () => isTransactionWithSigner,
  isValidAddress: () => isValidAddress,
  logicSigFromByte: () => logicSigFromByte,
  makeApplicationCallTxnFromObject: () => makeApplicationCallTxnFromObject,
  makeApplicationClearStateTxn: () => makeApplicationClearStateTxn,
  makeApplicationClearStateTxnFromObject: () => makeApplicationClearStateTxnFromObject,
  makeApplicationCloseOutTxn: () => makeApplicationCloseOutTxn,
  makeApplicationCloseOutTxnFromObject: () => makeApplicationCloseOutTxnFromObject,
  makeApplicationCreateTxn: () => makeApplicationCreateTxn,
  makeApplicationCreateTxnFromObject: () => makeApplicationCreateTxnFromObject,
  makeApplicationDeleteTxn: () => makeApplicationDeleteTxn,
  makeApplicationDeleteTxnFromObject: () => makeApplicationDeleteTxnFromObject,
  makeApplicationNoOpTxn: () => makeApplicationNoOpTxn,
  makeApplicationNoOpTxnFromObject: () => makeApplicationNoOpTxnFromObject,
  makeApplicationOptInTxn: () => makeApplicationOptInTxn,
  makeApplicationOptInTxnFromObject: () => makeApplicationOptInTxnFromObject,
  makeApplicationUpdateTxn: () => makeApplicationUpdateTxn,
  makeApplicationUpdateTxnFromObject: () => makeApplicationUpdateTxnFromObject,
  makeAssetConfigTxnWithSuggestedParams: () => makeAssetConfigTxnWithSuggestedParams,
  makeAssetConfigTxnWithSuggestedParamsFromObject: () => makeAssetConfigTxnWithSuggestedParamsFromObject,
  makeAssetCreateTxnWithSuggestedParams: () => makeAssetCreateTxnWithSuggestedParams,
  makeAssetCreateTxnWithSuggestedParamsFromObject: () => makeAssetCreateTxnWithSuggestedParamsFromObject,
  makeAssetDestroyTxnWithSuggestedParams: () => makeAssetDestroyTxnWithSuggestedParams,
  makeAssetDestroyTxnWithSuggestedParamsFromObject: () => makeAssetDestroyTxnWithSuggestedParamsFromObject,
  makeAssetFreezeTxnWithSuggestedParams: () => makeAssetFreezeTxnWithSuggestedParams,
  makeAssetFreezeTxnWithSuggestedParamsFromObject: () => makeAssetFreezeTxnWithSuggestedParamsFromObject,
  makeAssetTransferTxnWithSuggestedParams: () => makeAssetTransferTxnWithSuggestedParams,
  makeAssetTransferTxnWithSuggestedParamsFromObject: () => makeAssetTransferTxnWithSuggestedParamsFromObject,
  makeBasicAccountTransactionSigner: () => makeBasicAccountTransactionSigner,
  makeEmptyTransactionSigner: () => makeEmptyTransactionSigner,
  makeKeyRegistrationTxnWithSuggestedParams: () => makeKeyRegistrationTxnWithSuggestedParams,
  makeKeyRegistrationTxnWithSuggestedParamsFromObject: () => makeKeyRegistrationTxnWithSuggestedParamsFromObject,
  makeLogicSigAccountTransactionSigner: () => makeLogicSigAccountTransactionSigner,
  makeMultiSigAccountTransactionSigner: () => makeMultiSigAccountTransactionSigner,
  makePaymentTxnWithSuggestedParams: () => makePaymentTxnWithSuggestedParams,
  makePaymentTxnWithSuggestedParamsFromObject: () => makePaymentTxnWithSuggestedParamsFromObject,
  masterDerivationKeyToMnemonic: () => masterDerivationKeyToMnemonic,
  mergeMultisigTransactions: () => mergeMultisigTransactions,
  microalgosToAlgos: () => microalgosToAlgos,
  mnemonicFromSeed: () => mnemonicFromSeed,
  mnemonicToMasterDerivationKey: () => mnemonicToMasterDerivationKey,
  mnemonicToSecretKey: () => mnemonicToSecretKey,
  modelsv2: () => types_exports,
  multisigAddress: () => multisigAddress,
  secretKeyToMnemonic: () => secretKeyToMnemonic,
  seedFromMnemonic: () => seedFromMnemonic,
  signBid: () => signBid,
  signBytes: () => signBytes,
  signLogicSigTransaction: () => signLogicSigTransaction,
  signLogicSigTransactionObject: () => signLogicSigTransactionObject,
  signMultisigTransaction: () => signMultisigTransaction,
  signTransaction: () => signTransaction,
  tealSign: () => tealSign,
  tealSignFromProgram: () => tealSignFromProgram,
  verifyBytes: () => verifyBytes,
  verifyMultisig: () => verifyMultisig,
  verifyTealSign: () => verifyTealSign,
  waitForConfirmation: () => waitForConfirmation
});
function signTransaction(txn, sk) {
  if (typeof txn.from === "undefined") {
    const key = keyPairFromSecretKey(sk);
    txn.from = encodeAddress(key.publicKey);
  }
  const algoTxn = instantiateTxnIfNeeded(txn);
  return {
    txID: algoTxn.txID().toString(),
    blob: algoTxn.signTxn(sk)
  };
}
function signBid(bid, sk) {
  const signedBid = new Bid(bid);
  return signedBid.signBid(sk);
}
function signBytes(bytes, sk) {
  const toBeSigned = Buffer.from(concatArrays(SIGN_BYTES_PREFIX, bytes));
  const sig = sign(toBeSigned, sk);
  return sig;
}
function verifyBytes(bytes, signature, addr) {
  const toBeVerified = Buffer.from(concatArrays(SIGN_BYTES_PREFIX, bytes));
  const pk = decodeAddress(addr).publicKey;
  return verify(toBeVerified, signature, pk);
}
function encodeObj(o) {
  return new Uint8Array(encode2(o));
}
function decodeObj(o) {
  return decode2(o);
}
var SIGN_BYTES_PREFIX, MULTISIG_BAD_SENDER_ERROR_MSG, ERROR_MULTISIG_BAD_SENDER, ERROR_INVALID_MICROALGOS;
var init_main = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/main.js"() {
    init_buffer();
    init_naclWrappers();
    init_address();
    init_encoding();
    init_transaction();
    init_bid();
    init_convert();
    init_utils();
    init_algod();
    init_kmd();
    init_intDecoding();
    init_indexer();
    init_wait();
    init_address();
    init_bigint();
    init_uint64();
    init_account();
    init_types();
    init_types2();
    init_mnemonic();
    init_convert();
    init_group();
    init_logicsig();
    init_multisig();
    init_sourcemap();
    init_dryrun2();
    init_makeTxn();
    init_transaction();
    init_signer();
    init_composer();
    init_types3();
    init_abi();
    SIGN_BYTES_PREFIX = Buffer.from([77, 88]);
    MULTISIG_BAD_SENDER_ERROR_MSG = "The transaction sender address and multisig preimage do not match.";
    ERROR_MULTISIG_BAD_SENDER = new Error(MULTISIG_BAD_SENDER_ERROR_MSG);
    ERROR_INVALID_MICROALGOS = new Error(INVALID_MICROALGOS_ERROR_MSG);
  }
});

// node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/index.js
var esm_exports = {};
__export(esm_exports, {
  ABIAddressType: () => ABIAddressType,
  ABIArrayDynamicType: () => ABIArrayDynamicType,
  ABIArrayStaticType: () => ABIArrayStaticType,
  ABIBoolType: () => ABIBoolType,
  ABIByteType: () => ABIByteType,
  ABIContract: () => ABIContract,
  ABIInterface: () => ABIInterface,
  ABIMethod: () => ABIMethod,
  ABIReferenceType: () => ABIReferenceType,
  ABIStringType: () => ABIStringType,
  ABITransactionType: () => ABITransactionType,
  ABITupleType: () => ABITupleType,
  ABIType: () => ABIType,
  ABIUfixedType: () => ABIUfixedType,
  ABIUintType: () => ABIUintType,
  ADDR_BYTE_SIZE: () => ADDR_BYTE_SIZE,
  ALGORAND_MIN_TX_FEE: () => ALGORAND_MIN_TX_FEE,
  Algodv2: () => AlgodClient,
  AtomicTransactionComposer: () => AtomicTransactionComposer,
  AtomicTransactionComposerStatus: () => AtomicTransactionComposerStatus,
  DryrunResult: () => DryrunResult,
  ERROR_INVALID_MICROALGOS: () => ERROR_INVALID_MICROALGOS,
  ERROR_MULTISIG_BAD_SENDER: () => ERROR_MULTISIG_BAD_SENDER,
  INVALID_MICROALGOS_ERROR_MSG: () => INVALID_MICROALGOS_ERROR_MSG,
  Indexer: () => IndexerClient,
  IntDecoding: () => intDecoding_default,
  Kmd: () => Kmd,
  LENGTH_ENCODE_BYTE_SIZE: () => LENGTH_ENCODE_BYTE_SIZE,
  LogicSig: () => LogicSig,
  LogicSigAccount: () => LogicSigAccount,
  MAX_LEN: () => MAX_LEN,
  MULTISIG_BAD_SENDER_ERROR_MSG: () => MULTISIG_BAD_SENDER_ERROR_MSG,
  OnApplicationComplete: () => OnApplicationComplete,
  SINGLE_BOOL_SIZE: () => SINGLE_BOOL_SIZE,
  SINGLE_BYTE_SIZE: () => SINGLE_BYTE_SIZE,
  SourceMap: () => SourceMap,
  Transaction: () => Transaction,
  TransactionType: () => TransactionType,
  abiCheckTransactionType: () => abiCheckTransactionType,
  abiTypeIsReference: () => abiTypeIsReference,
  abiTypeIsTransaction: () => abiTypeIsTransaction,
  algosToMicroalgos: () => algosToMicroalgos,
  appendSignMultisigTransaction: () => appendSignMultisigTransaction,
  appendSignRawMultisigSignature: () => appendSignRawMultisigSignature,
  assignGroupID: () => assignGroupID,
  bigIntToBytes: () => bigIntToBytes,
  bytesToBigInt: () => bytesToBigInt,
  computeGroupID: () => computeGroupID,
  createDryrun: () => createDryrun,
  createMultisigTransaction: () => createMultisigTransaction,
  decodeAddress: () => decodeAddress,
  decodeObj: () => decodeObj,
  decodeSignedTransaction: () => decodeSignedTransaction,
  decodeUint64: () => decodeUint64,
  decodeUnsignedTransaction: () => decodeUnsignedTransaction,
  default: () => esm_default,
  encodeAddress: () => encodeAddress,
  encodeObj: () => encodeObj,
  encodeUint64: () => encodeUint64,
  encodeUnsignedSimulateTransaction: () => encodeUnsignedSimulateTransaction,
  encodeUnsignedTransaction: () => encodeUnsignedTransaction,
  generateAccount: () => generateAccount,
  getApplicationAddress: () => getApplicationAddress,
  getMethodByName: () => getMethodByName,
  indexerModels: () => types_exports2,
  instantiateTxnIfNeeded: () => instantiateTxnIfNeeded,
  isTransactionWithSigner: () => isTransactionWithSigner,
  isValidAddress: () => isValidAddress,
  logicSigFromByte: () => logicSigFromByte,
  makeApplicationCallTxnFromObject: () => makeApplicationCallTxnFromObject,
  makeApplicationClearStateTxn: () => makeApplicationClearStateTxn,
  makeApplicationClearStateTxnFromObject: () => makeApplicationClearStateTxnFromObject,
  makeApplicationCloseOutTxn: () => makeApplicationCloseOutTxn,
  makeApplicationCloseOutTxnFromObject: () => makeApplicationCloseOutTxnFromObject,
  makeApplicationCreateTxn: () => makeApplicationCreateTxn,
  makeApplicationCreateTxnFromObject: () => makeApplicationCreateTxnFromObject,
  makeApplicationDeleteTxn: () => makeApplicationDeleteTxn,
  makeApplicationDeleteTxnFromObject: () => makeApplicationDeleteTxnFromObject,
  makeApplicationNoOpTxn: () => makeApplicationNoOpTxn,
  makeApplicationNoOpTxnFromObject: () => makeApplicationNoOpTxnFromObject,
  makeApplicationOptInTxn: () => makeApplicationOptInTxn,
  makeApplicationOptInTxnFromObject: () => makeApplicationOptInTxnFromObject,
  makeApplicationUpdateTxn: () => makeApplicationUpdateTxn,
  makeApplicationUpdateTxnFromObject: () => makeApplicationUpdateTxnFromObject,
  makeAssetConfigTxnWithSuggestedParams: () => makeAssetConfigTxnWithSuggestedParams,
  makeAssetConfigTxnWithSuggestedParamsFromObject: () => makeAssetConfigTxnWithSuggestedParamsFromObject,
  makeAssetCreateTxnWithSuggestedParams: () => makeAssetCreateTxnWithSuggestedParams,
  makeAssetCreateTxnWithSuggestedParamsFromObject: () => makeAssetCreateTxnWithSuggestedParamsFromObject,
  makeAssetDestroyTxnWithSuggestedParams: () => makeAssetDestroyTxnWithSuggestedParams,
  makeAssetDestroyTxnWithSuggestedParamsFromObject: () => makeAssetDestroyTxnWithSuggestedParamsFromObject,
  makeAssetFreezeTxnWithSuggestedParams: () => makeAssetFreezeTxnWithSuggestedParams,
  makeAssetFreezeTxnWithSuggestedParamsFromObject: () => makeAssetFreezeTxnWithSuggestedParamsFromObject,
  makeAssetTransferTxnWithSuggestedParams: () => makeAssetTransferTxnWithSuggestedParams,
  makeAssetTransferTxnWithSuggestedParamsFromObject: () => makeAssetTransferTxnWithSuggestedParamsFromObject,
  makeBasicAccountTransactionSigner: () => makeBasicAccountTransactionSigner,
  makeEmptyTransactionSigner: () => makeEmptyTransactionSigner,
  makeKeyRegistrationTxnWithSuggestedParams: () => makeKeyRegistrationTxnWithSuggestedParams,
  makeKeyRegistrationTxnWithSuggestedParamsFromObject: () => makeKeyRegistrationTxnWithSuggestedParamsFromObject,
  makeLogicSigAccountTransactionSigner: () => makeLogicSigAccountTransactionSigner,
  makeMultiSigAccountTransactionSigner: () => makeMultiSigAccountTransactionSigner,
  makePaymentTxnWithSuggestedParams: () => makePaymentTxnWithSuggestedParams,
  makePaymentTxnWithSuggestedParamsFromObject: () => makePaymentTxnWithSuggestedParamsFromObject,
  masterDerivationKeyToMnemonic: () => masterDerivationKeyToMnemonic,
  mergeMultisigTransactions: () => mergeMultisigTransactions,
  microalgosToAlgos: () => microalgosToAlgos,
  mnemonicFromSeed: () => mnemonicFromSeed,
  mnemonicToMasterDerivationKey: () => mnemonicToMasterDerivationKey,
  mnemonicToSecretKey: () => mnemonicToSecretKey,
  modelsv2: () => types_exports,
  multisigAddress: () => multisigAddress,
  secretKeyToMnemonic: () => secretKeyToMnemonic,
  seedFromMnemonic: () => seedFromMnemonic,
  signBid: () => signBid,
  signBytes: () => signBytes,
  signLogicSigTransaction: () => signLogicSigTransaction,
  signLogicSigTransactionObject: () => signLogicSigTransactionObject,
  signMultisigTransaction: () => signMultisigTransaction,
  signTransaction: () => signTransaction,
  tealSign: () => tealSign,
  tealSignFromProgram: () => tealSignFromProgram,
  verifyBytes: () => verifyBytes,
  verifyMultisig: () => verifyMultisig,
  verifyTealSign: () => verifyTealSign,
  waitForConfirmation: () => waitForConfirmation
});
var esm_default;
var init_esm = __esm({
  "node_modules/.pnpm/algosdk@2.7.0/node_modules/algosdk/dist/esm/index.js"() {
    init_main();
    init_main();
    esm_default = main_exports;
  }
});

export {
  Buffer,
  INSPECT_MAX_BYTES,
  kMaxLength,
  init_buffer,
  require_crypto,
  intDecoding_default,
  encodeUint64,
  decodeUint64,
  decodeAddress,
  isValidAddress,
  encodeAddress,
  getApplicationAddress,
  TransactionType,
  OnApplicationComplete,
  ALGORAND_MIN_TX_FEE,
  Transaction,
  encodeUnsignedSimulateTransaction,
  encodeUnsignedTransaction,
  decodeUnsignedTransaction,
  decodeSignedTransaction,
  instantiateTxnIfNeeded,
  INVALID_MICROALGOS_ERROR_MSG,
  microalgosToAlgos,
  algosToMicroalgos,
  types_exports,
  AlgodClient,
  Kmd,
  types_exports2,
  IndexerClient,
  waitForConfirmation,
  bigIntToBytes,
  bytesToBigInt,
  generateAccount,
  mnemonicFromSeed,
  seedFromMnemonic,
  mnemonicToSecretKey,
  secretKeyToMnemonic,
  mnemonicToMasterDerivationKey,
  masterDerivationKeyToMnemonic,
  computeGroupID,
  assignGroupID,
  createMultisigTransaction,
  mergeMultisigTransactions,
  verifyMultisig,
  signMultisigTransaction,
  appendSignMultisigTransaction,
  appendSignRawMultisigSignature,
  multisigAddress,
  LogicSig,
  LogicSigAccount,
  signLogicSigTransactionObject,
  signLogicSigTransaction,
  logicSigFromByte,
  tealSign,
  verifyTealSign,
  tealSignFromProgram,
  SourceMap,
  createDryrun,
  DryrunResult,
  makePaymentTxnWithSuggestedParams,
  makePaymentTxnWithSuggestedParamsFromObject,
  makeKeyRegistrationTxnWithSuggestedParams,
  makeKeyRegistrationTxnWithSuggestedParamsFromObject,
  makeAssetCreateTxnWithSuggestedParams,
  makeAssetCreateTxnWithSuggestedParamsFromObject,
  makeAssetConfigTxnWithSuggestedParams,
  makeAssetConfigTxnWithSuggestedParamsFromObject,
  makeAssetDestroyTxnWithSuggestedParams,
  makeAssetDestroyTxnWithSuggestedParamsFromObject,
  makeAssetFreezeTxnWithSuggestedParams,
  makeAssetFreezeTxnWithSuggestedParamsFromObject,
  makeAssetTransferTxnWithSuggestedParams,
  makeAssetTransferTxnWithSuggestedParamsFromObject,
  makeApplicationCreateTxn,
  makeApplicationCreateTxnFromObject,
  makeApplicationUpdateTxn,
  makeApplicationUpdateTxnFromObject,
  makeApplicationDeleteTxn,
  makeApplicationDeleteTxnFromObject,
  makeApplicationOptInTxn,
  makeApplicationOptInTxnFromObject,
  makeApplicationCloseOutTxn,
  makeApplicationCloseOutTxnFromObject,
  makeApplicationClearStateTxn,
  makeApplicationClearStateTxnFromObject,
  makeApplicationNoOpTxn,
  makeApplicationNoOpTxnFromObject,
  makeApplicationCallTxnFromObject,
  makeBasicAccountTransactionSigner,
  makeLogicSigAccountTransactionSigner,
  makeMultiSigAccountTransactionSigner,
  makeEmptyTransactionSigner,
  isTransactionWithSigner,
  MAX_LEN,
  ADDR_BYTE_SIZE,
  SINGLE_BYTE_SIZE,
  SINGLE_BOOL_SIZE,
  LENGTH_ENCODE_BYTE_SIZE,
  ABIType,
  ABIUintType,
  ABIUfixedType,
  ABIAddressType,
  ABIBoolType,
  ABIByteType,
  ABIStringType,
  ABIArrayStaticType,
  ABIArrayDynamicType,
  ABITupleType,
  ABITransactionType,
  abiTypeIsTransaction,
  abiCheckTransactionType,
  ABIReferenceType,
  abiTypeIsReference,
  ABIMethod,
  getMethodByName,
  ABIContract,
  ABIInterface,
  AtomicTransactionComposerStatus,
  AtomicTransactionComposer,
  MULTISIG_BAD_SENDER_ERROR_MSG,
  signTransaction,
  signBid,
  signBytes,
  verifyBytes,
  encodeObj,
  decodeObj,
  ERROR_MULTISIG_BAD_SENDER,
  ERROR_INVALID_MICROALGOS,
  esm_default,
  esm_exports,
  init_esm
};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
/*! Bundled license information:

js-sha512/src/sha512.js:
  (*
   * [js-sha512]{@link https://github.com/emn178/js-sha512}
   *
   * @version 0.8.0
   * @author Chen, Yi-Cyuan [emn178@gmail.com]
   * @copyright Chen, Yi-Cyuan 2014-2018
   * @license MIT
   *)

hi-base32/src/base32.js:
  (*
   * [hi-base32]{@link https://github.com/emn178/hi-base32}
   *
   * @version 0.5.0
   * @author Chen, Yi-Cyuan [emn178@gmail.com]
   * @copyright Chen, Yi-Cyuan 2015-2018
   * @license MIT
   *)
*/
//# sourceMappingURL=/build/_shared/chunk-7PSQEEMX.js.map
