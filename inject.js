!function() {
    "use strict";
    var D = Object.defineProperty
      , C = Object.defineProperties
      , R = Object.getOwnPropertyDescriptors
      , F = Object.getOwnPropertySymbols
      , z = Object.prototype.hasOwnProperty
      , L = Object.prototype.propertyIsEnumerable
      , q = (e,t,n)=>t in e ? D(e, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: n
    }) : e[t] = n
      , V = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
    function W(e) {
        return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
    }
    var I = {}
      , e = {
        byteLength: function(e) {
            var e = H(e)
              , t = e[0]
              , e = e[1];
            return 3 * (t + e) / 4 - e
        }
    };
    e.toByteArray = function(e) {
        var t, n, r = H(e), o = r[0], r = r[1], i = new J(function(e, t) {
            return 3 * (e + t) / 4 - t
        }(o, r)), a = 0, s = 0 < r ? o - 4 : o;
        for (n = 0; n < s; n += 4)
            t = c[e.charCodeAt(n)] << 18 | c[e.charCodeAt(n + 1)] << 12 | c[e.charCodeAt(n + 2)] << 6 | c[e.charCodeAt(n + 3)],
            i[a++] = t >> 16 & 255,
            i[a++] = t >> 8 & 255,
            i[a++] = 255 & t;
        2 === r && (t = c[e.charCodeAt(n)] << 2 | c[e.charCodeAt(n + 1)] >> 4,
        i[a++] = 255 & t);
        1 === r && (t = c[e.charCodeAt(n)] << 10 | c[e.charCodeAt(n + 1)] << 4 | c[e.charCodeAt(n + 2)] >> 2,
        i[a++] = t >> 8 & 255,
        i[a++] = 255 & t);
        return i
    }
    ,
    e.fromByteArray = function(e) {
        for (var t, n = e.length, r = n % 3, o = [], i = 0, a = n - r; i < a; i += 16383)
            o.push(function(e, t, n) {
                for (var r, o = [], i = t; i < n; i += 3)
                    r = (e[i] << 16 & 16711680) + (e[i + 1] << 8 & 65280) + (255 & e[i + 2]),
                    o.push(function(e) {
                        return s[e >> 18 & 63] + s[e >> 12 & 63] + s[e >> 6 & 63] + s[63 & e]
                    }(r));
                return o.join("")
            }(e, i, a < i + 16383 ? a : i + 16383));
        1 == r ? (t = e[n - 1],
        o.push(s[t >> 2] + s[t << 4 & 63] + "==")) : 2 == r && (t = (e[n - 2] << 8) + e[n - 1],
        o.push(s[t >> 10] + s[t >> 4 & 63] + s[t << 2 & 63] + "="));
        return o.join("")
    }
    ;
    for (var s = [], c = [], J = "undefined" != typeof Uint8Array ? Uint8Array : Array, $ = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", t = 0, G = $.length; t < G; ++t)
        s[t] = $[t],
        c[$.charCodeAt(t)] = t;
    function H(e) {
        var t = e.length;
        if (0 < t % 4)
            throw new Error("Invalid string. Length must be a multiple of 4");
        e = e.indexOf("="),
        t = (e = -1 === e ? t : e) === t ? 0 : 4 - e % 4;
        return [e, t]
    }
    c["-".charCodeAt(0)] = 62,
    c["_".charCodeAt(0)] = 63;
    var n = {
        read: function(e, t, n, r, o) {
            var i, a, s = 8 * o - r - 1, c = (1 << s) - 1, u = c >> 1, f = -7, p = n ? o - 1 : 0, l = n ? -1 : 1, o = e[t + p];
            for (p += l,
            i = o & (1 << -f) - 1,
            o >>= -f,
            f += s; 0 < f; i = 256 * i + e[t + p],
            p += l,
            f -= 8)
                ;
            for (a = i & (1 << -f) - 1,
            i >>= -f,
            f += r; 0 < f; a = 256 * a + e[t + p],
            p += l,
            f -= 8)
                ;
            if (0 === i)
                i = 1 - u;
            else {
                if (i === c)
                    return a ? NaN : 1 / 0 * (o ? -1 : 1);
                a += Math.pow(2, r),
                i -= u
            }
            return (o ? -1 : 1) * a * Math.pow(2, i - r)
        },
        write: function(e, t, n, r, o, i) {
            var a, s, c = 8 * i - o - 1, u = (1 << c) - 1, f = u >> 1, p = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0, l = r ? 0 : i - 1, h = r ? 1 : -1, i = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
            for (t = Math.abs(t),
            isNaN(t) || t === 1 / 0 ? (s = isNaN(t) ? 1 : 0,
            a = u) : (a = Math.floor(Math.log(t) / Math.LN2),
            t * (r = Math.pow(2, -a)) < 1 && (a--,
            r *= 2),
            2 <= (t += 1 <= a + f ? p / r : p * Math.pow(2, 1 - f)) * r && (a++,
            r /= 2),
            u <= a + f ? (s = 0,
            a = u) : 1 <= a + f ? (s = (t * r - 1) * Math.pow(2, o),
            a += f) : (s = t * Math.pow(2, f - 1) * Math.pow(2, o),
            a = 0)); 8 <= o; e[n + l] = 255 & s,
            l += h,
            s /= 256,
            o -= 8)
                ;
            for (a = a << o | s,
            c += o; 0 < c; e[n + l] = 255 & a,
            l += h,
            a /= 256,
            c -= 8)
                ;
            e[n + l - h] |= 128 * i
        }
    };
    {
        var K = I;
        const pi = e
          , T = n
          , li = (e = "function" == typeof Symbol && "function" == typeof Symbol.for ? Symbol.for("nodejs.util.inspect.custom") : null,
        K.Buffer = f,
        K.SlowBuffer = function(e) {
            +e != e && (e = 0);
            return f.alloc(+e)
        }
        ,
        K.INSPECT_MAX_BYTES = 50,
        2147483647);
        function u(e) {
            if (e > li)
                throw new RangeError('The value "' + e + '" is invalid for option "size"');
            e = new Uint8Array(e);
            return Object.setPrototypeOf(e, f.prototype),
            e
        }
        function f(e, t, n) {
            if ("number" != typeof e)
                return Q(e, t, n);
            if ("string" == typeof t)
                throw new TypeError('The "string" argument must be of type string. Received type number');
            return Z(e)
        }
        function Q(t, n, e) {
            if ("string" == typeof t) {
                var r = t;
                var o = n;
                "string" == typeof o && "" !== o || (o = "utf8");
                if (!f.isEncoding(o))
                    throw new TypeError("Unknown encoding: " + o);
                var i = 0 | ne(r, o);
                let e = u(i);
                r = e.write(r, o);
                r !== i && (e = e.slice(0, r));
                return e
            }
            if (ArrayBuffer.isView(t))
                return h(o = t, Uint8Array) ? ee((i = new Uint8Array(o)).buffer, i.byteOffset, i.byteLength) : X(o);
            if (null == t)
                throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t);
            if (h(t, ArrayBuffer) || t && h(t.buffer, ArrayBuffer))
                return ee(t, n, e);
            if ("undefined" != typeof SharedArrayBuffer && (h(t, SharedArrayBuffer) || t && h(t.buffer, SharedArrayBuffer)))
                return ee(t, n, e);
            if ("number" == typeof t)
                throw new TypeError('The "value" argument must not be of type number. Received type number');
            r = t.valueOf && t.valueOf();
            if (null != r && r !== t)
                return f.from(r, n, e);
            var a = function(e) {
                {
                    var t, n;
                    if (f.isBuffer(e))
                        return t = 0 | te(e.length),
                        0 === (n = u(t)).length || e.copy(n, 0, 0, t),
                        n
                }
                if (void 0 !== e.length)
                    return "number" != typeof e.length || Oe(e.length) ? u(0) : X(e);
                if ("Buffer" === e.type && Array.isArray(e.data))
                    return X(e.data)
            }(t);
            if (a)
                return a;
            if ("undefined" != typeof Symbol && null != Symbol.toPrimitive && "function" == typeof t[Symbol.toPrimitive])
                return f.from(t[Symbol.toPrimitive]("string"), n, e);
            throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t)
        }
        function Y(e) {
            if ("number" != typeof e)
                throw new TypeError('"size" argument must be of type number');
            if (e < 0)
                throw new RangeError('The value "' + e + '" is invalid for option "size"')
        }
        function Z(e) {
            return Y(e),
            u(e < 0 ? 0 : 0 | te(e))
        }
        function X(t) {
            var n = t.length < 0 ? 0 : 0 | te(t.length);
            const r = u(n);
            for (let e = 0; e < n; e += 1)
                r[e] = 255 & t[e];
            return r
        }
        function ee(e, t, n) {
            if (t < 0 || e.byteLength < t)
                throw new RangeError('"offset" is outside of buffer bounds');
            if (e.byteLength < t + (n || 0))
                throw new RangeError('"length" is outside of buffer bounds');
            let r;
            return r = void 0 === t && void 0 === n ? new Uint8Array(e) : void 0 === n ? new Uint8Array(e,t) : new Uint8Array(e,t,n),
            Object.setPrototypeOf(r, f.prototype),
            r
        }
        function te(e) {
            if (e >= li)
                throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + li.toString(16) + " bytes");
            return 0 | e
        }
        function ne(e, t) {
            if (f.isBuffer(e))
                return e.length;
            if (ArrayBuffer.isView(e) || h(e, ArrayBuffer))
                return e.byteLength;
            if ("string" != typeof e)
                throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof e);
            var n = e.length
              , r = 2 < arguments.length && !0 === arguments[2];
            if (!r && 0 === n)
                return 0;
            let o = !1;
            for (; ; )
                switch (t) {
                case "ascii":
                case "latin1":
                case "binary":
                    return n;
                case "utf8":
                case "utf-8":
                    return me(e).length;
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return 2 * n;
                case "hex":
                    return n >>> 1;
                case "base64":
                    return we(e).length;
                default:
                    if (o)
                        return r ? -1 : me(e).length;
                    t = ("" + t).toLowerCase(),
                    o = !0
                }
        }
        function re(e, n, r) {
            let t = !1;
            if ((n = void 0 === n || n < 0 ? 0 : n) > this.length)
                return "";
            if ((r = void 0 === r || r > this.length ? this.length : r) <= 0)
                return "";
            if ((r >>>= 0) <= (n >>>= 0))
                return "";
            for (e = e || "utf8"; ; )
                switch (e) {
                case "hex":
                    {
                        var o = this;
                        var i = n;
                        var a = r;
                        var s = o.length;
                        (!i || i < 0) && (i = 0);
                        (!a || a < 0 || s < a) && (a = s);
                        let t = "";
                        for (let e = i; e < a; ++e)
                            t += yi[o[e]];
                        return t;
                        return
                    }
                case "utf8":
                case "utf-8":
                    return ce(this, n, r);
                case "ascii":
                    {
                        var c = this;
                        s = n;
                        var u = r;
                        let t = "";
                        u = Math.min(c.length, u);
                        for (let e = s; e < u; ++e)
                            t += String.fromCharCode(127 & c[e]);
                        return t;
                        return
                    }
                case "latin1":
                case "binary":
                    {
                        var f = this;
                        i = n;
                        var p = r;
                        let t = "";
                        p = Math.min(f.length, p);
                        for (let e = i; e < p; ++e)
                            t += String.fromCharCode(f[e]);
                        return t;
                        return
                    }
                case "base64":
                    return h = this,
                    y = r,
                    0 === (d = n) && y === h.length ? pi.fromByteArray(h) : pi.fromByteArray(h.slice(d, y));
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    {
                        h = this;
                        d = n;
                        y = r;
                        var l = h.slice(d, y);
                        let t = "";
                        for (let e = 0; e < l.length - 1; e += 2)
                            t += String.fromCharCode(l[e] + 256 * l[e + 1]);
                        return t;
                        return
                    }
                default:
                    if (t)
                        throw new TypeError("Unknown encoding: " + e);
                    e = (e + "").toLowerCase(),
                    t = !0
                }
            var h, d, y
        }
        function r(e, t, n) {
            var r = e[t];
            e[t] = e[n],
            e[n] = r
        }
        function oe(e, t, n, r, o) {
            if (0 === e.length)
                return -1;
            if ("string" == typeof n ? (r = n,
            n = 0) : 2147483647 < n ? n = 2147483647 : n < -2147483648 && (n = -2147483648),
            (n = (n = Oe(n = +n) ? o ? 0 : e.length - 1 : n) < 0 ? e.length + n : n) >= e.length) {
                if (o)
                    return -1;
                n = e.length - 1
            } else if (n < 0) {
                if (!o)
                    return -1;
                n = 0
            }
            if ("string" == typeof t && (t = f.from(t, r)),
            f.isBuffer(t))
                return 0 === t.length ? -1 : ie(e, t, n, r, o);
            if ("number" == typeof t)
                return t &= 255,
                "function" == typeof Uint8Array.prototype.indexOf ? (o ? Uint8Array.prototype.indexOf : Uint8Array.prototype.lastIndexOf).call(e, t, n) : ie(e, [t], n, r, o);
            throw new TypeError("val must be string, number or Buffer")
        }
        function ie(n, r, t, e, o) {
            let i = 1
              , a = n.length
              , s = r.length;
            if (void 0 !== e && ("ucs2" === (e = String(e).toLowerCase()) || "ucs-2" === e || "utf16le" === e || "utf-16le" === e)) {
                if (n.length < 2 || r.length < 2)
                    return -1;
                i = 2,
                a /= 2,
                s /= 2,
                t /= 2
            }
            function c(e, t) {
                return 1 === i ? e[t] : e.readUInt16BE(t * i)
            }
            let u;
            if (o) {
                let e = -1;
                for (u = t; u < a; u++)
                    if (c(n, u) === c(r, -1 === e ? 0 : u - e)) {
                        if (-1 === e && (e = u),
                        u - e + 1 === s)
                            return e * i
                    } else
                        -1 !== e && (u -= u - e),
                        e = -1
            } else
                for (t + s > a && (t = a - s),
                u = t; 0 <= u; u--) {
                    let t = !0;
                    for (let e = 0; e < s; e++)
                        if (c(n, u + e) !== c(r, e)) {
                            t = !1;
                            break
                        }
                    if (t)
                        return u
                }
            return -1
        }
        function ae(e, t, n, r) {
            return ve(function(t) {
                const n = [];
                for (let e = 0; e < t.length; ++e)
                    n.push(255 & t.charCodeAt(e));
                return n
            }(t), e, n, r)
        }
        function se(e, t, n, r) {
            return ve(function(t, n) {
                var r, o;
                const i = [];
                for (let e = 0; e < t.length && !((n -= 2) < 0); ++e)
                    o = t.charCodeAt(e),
                    r = o >> 8,
                    o = o % 256,
                    i.push(o),
                    i.push(r);
                return i
            }(t, e.length - n), e, n, r)
        }
        function ce(a, e, t) {
            t = Math.min(a.length, t);
            const n = [];
            let s = e;
            for (; s < t; ) {
                var c = a[s];
                let o = null
                  , i = 239 < c ? 4 : 223 < c ? 3 : 191 < c ? 2 : 1;
                if (s + i <= t) {
                    let e, t, n, r;
                    switch (i) {
                    case 1:
                        c < 128 && (o = c);
                        break;
                    case 2:
                        128 == (192 & (e = a[s + 1])) && 127 < (r = (31 & c) << 6 | 63 & e) && (o = r);
                        break;
                    case 3:
                        e = a[s + 1],
                        t = a[s + 2],
                        128 == (192 & e) && 128 == (192 & t) && 2047 < (r = (15 & c) << 12 | (63 & e) << 6 | 63 & t) && (r < 55296 || 57343 < r) && (o = r);
                        break;
                    case 4:
                        e = a[s + 1],
                        t = a[s + 2],
                        n = a[s + 3],
                        128 == (192 & e) && 128 == (192 & t) && 128 == (192 & n) && 65535 < (r = (15 & c) << 18 | (63 & e) << 12 | (63 & t) << 6 | 63 & n) && r < 1114112 && (o = r)
                    }
                }
                null === o ? (o = 65533,
                i = 1) : 65535 < o && (o -= 65536,
                n.push(o >>> 10 & 1023 | 55296),
                o = 56320 | 1023 & o),
                n.push(o),
                s += i
            }
            {
                var r = n
                  , o = r.length;
                if (o <= hi)
                    return String.fromCharCode.apply(String, r);
                let e = ""
                  , t = 0;
                for (; t < o; )
                    e += String.fromCharCode.apply(String, r.slice(t, t += hi));
                return e
            }
        }
        K.kMaxLength = li,
        (f.TYPED_ARRAY_SUPPORT = function() {
            try {
                const t = new Uint8Array(1);
                var e = {
                    foo: function() {
                        return 42
                    }
                };
                return Object.setPrototypeOf(e, Uint8Array.prototype),
                Object.setPrototypeOf(t, e),
                42 === t.foo()
            } catch (e) {
                return !1
            }
        }()) || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),
        Object.defineProperty(f.prototype, "parent", {
            enumerable: !0,
            get: function() {
                if (f.isBuffer(this))
                    return this.buffer
            }
        }),
        Object.defineProperty(f.prototype, "offset", {
            enumerable: !0,
            get: function() {
                if (f.isBuffer(this))
                    return this.byteOffset
            }
        }),
        f.poolSize = 8192,
        f.from = Q,
        Object.setPrototypeOf(f.prototype, Uint8Array.prototype),
        Object.setPrototypeOf(f, Uint8Array),
        f.alloc = function(e, t, n) {
            return t = t,
            n = n,
            Y(e = e),
            !(e <= 0) && void 0 !== t ? "string" == typeof n ? u(e).fill(t, n) : u(e).fill(t) : u(e)
        }
        ,
        f.allocUnsafe = Z,
        f.allocUnsafeSlow = Z,
        f.isBuffer = function(e) {
            return null != e && !0 === e._isBuffer && e !== f.prototype
        }
        ,
        f.compare = function(n, r) {
            if (h(n, Uint8Array) && (n = f.from(n, n.offset, n.byteLength)),
            h(r, Uint8Array) && (r = f.from(r, r.offset, r.byteLength)),
            !f.isBuffer(n) || !f.isBuffer(r))
                throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
            if (n === r)
                return 0;
            let o = n.length
              , i = r.length;
            for (let e = 0, t = Math.min(o, i); e < t; ++e)
                if (n[e] !== r[e]) {
                    o = n[e],
                    i = r[e];
                    break
                }
            return o < i ? -1 : i < o ? 1 : 0
        }
        ,
        f.isEncoding = function(e) {
            switch (String(e).toLowerCase()) {
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
                return !0;
            default:
                return !1
            }
        }
        ,
        f.concat = function(t, e) {
            if (!Array.isArray(t))
                throw new TypeError('"list" argument must be an Array of Buffers');
            if (0 === t.length)
                return f.alloc(0);
            let n;
            if (void 0 === e)
                for (e = 0,
                n = 0; n < t.length; ++n)
                    e += t[n].length;
            var r = f.allocUnsafe(e);
            let o = 0;
            for (n = 0; n < t.length; ++n) {
                let e = t[n];
                if (h(e, Uint8Array))
                    o + e.length > r.length ? (e = f.isBuffer(e) ? e : f.from(e)).copy(r, o) : Uint8Array.prototype.set.call(r, e, o);
                else {
                    if (!f.isBuffer(e))
                        throw new TypeError('"list" argument must be an Array of Buffers');
                    e.copy(r, o)
                }
                o += e.length
            }
            return r
        }
        ,
        f.byteLength = ne,
        f.prototype._isBuffer = !0,
        f.prototype.swap16 = function() {
            var t = this.length;
            if (t % 2 != 0)
                throw new RangeError("Buffer size must be a multiple of 16-bits");
            for (let e = 0; e < t; e += 2)
                r(this, e, e + 1);
            return this
        }
        ,
        f.prototype.swap32 = function() {
            var t = this.length;
            if (t % 4 != 0)
                throw new RangeError("Buffer size must be a multiple of 32-bits");
            for (let e = 0; e < t; e += 4)
                r(this, e, e + 3),
                r(this, e + 1, e + 2);
            return this
        }
        ,
        f.prototype.swap64 = function() {
            var t = this.length;
            if (t % 8 != 0)
                throw new RangeError("Buffer size must be a multiple of 64-bits");
            for (let e = 0; e < t; e += 8)
                r(this, e, e + 7),
                r(this, e + 1, e + 6),
                r(this, e + 2, e + 5),
                r(this, e + 3, e + 4);
            return this
        }
        ,
        f.prototype.toLocaleString = f.prototype.toString = function() {
            var e = this.length;
            return 0 === e ? "" : 0 === arguments.length ? ce(this, 0, e) : re.apply(this, arguments)
        }
        ,
        f.prototype.equals = function(e) {
            if (f.isBuffer(e))
                return this === e || 0 === f.compare(this, e);
            throw new TypeError("Argument must be a Buffer")
        }
        ,
        f.prototype.inspect = function() {
            let e = "";
            var t = K.INSPECT_MAX_BYTES;
            return e = this.toString("hex", 0, t).replace(/(.{2})/g, "$1 ").trim(),
            this.length > t && (e += " ... "),
            "<Buffer " + e + ">"
        }
        ,
        e && (f.prototype[e] = f.prototype.inspect),
        f.prototype.compare = function(e, t, n, r, o) {
            if (h(e, Uint8Array) && (e = f.from(e, e.offset, e.byteLength)),
            !f.isBuffer(e))
                throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof e);
            if (void 0 === n && (n = e ? e.length : 0),
            void 0 === r && (r = 0),
            void 0 === o && (o = this.length),
            (t = void 0 === t ? 0 : t) < 0 || n > e.length || r < 0 || o > this.length)
                throw new RangeError("out of range index");
            if (o <= r && n <= t)
                return 0;
            if (o <= r)
                return -1;
            if (n <= t)
                return 1;
            if (this === e)
                return 0;
            let i = (o >>>= 0) - (r >>>= 0)
              , a = (n >>>= 0) - (t >>>= 0);
            var s = Math.min(i, a)
              , c = this.slice(r, o)
              , u = e.slice(t, n);
            for (let e = 0; e < s; ++e)
                if (c[e] !== u[e]) {
                    i = c[e],
                    a = u[e];
                    break
                }
            return i < a ? -1 : a < i ? 1 : 0
        }
        ,
        f.prototype.includes = function(e, t, n) {
            return -1 !== this.indexOf(e, t, n)
        }
        ,
        f.prototype.indexOf = function(e, t, n) {
            return oe(this, e, t, n, !0)
        }
        ,
        f.prototype.lastIndexOf = function(e, t, n) {
            return oe(this, e, t, n, !1)
        }
        ,
        f.prototype.write = function(t, n, r, e) {
            if (void 0 === n)
                e = "utf8",
                r = this.length,
                n = 0;
            else if (void 0 === r && "string" == typeof n)
                e = n,
                r = this.length,
                n = 0;
            else {
                if (!isFinite(n))
                    throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                n >>>= 0,
                isFinite(r) ? (r >>>= 0,
                void 0 === e && (e = "utf8")) : (e = r,
                r = void 0)
            }
            var o, i, a, s = this.length - n;
            if ((void 0 === r || s < r) && (r = s),
            0 < t.length && (r < 0 || n < 0) || n > this.length)
                throw new RangeError("Attempt to write outside buffer bounds");
            e = e || "utf8";
            let c = !1;
            for (; ; )
                switch (e) {
                case "hex":
                    {
                        var u = this;
                        var f = t;
                        var p = n;
                        var l = r;
                        p = Number(p) || 0;
                        var h = u.length - p;
                        (!l || h < (l = Number(l))) && (l = h),
                        (h = f.length) / 2 < l && (l = h / 2);
                        let e;
                        for (e = 0; e < l; ++e) {
                            var d = parseInt(f.substr(2 * e, 2), 16);
                            if (Oe(d))
                                return e;
                            u[p + e] = d
                        }
                        return e;
                        return
                    }
                case "utf8":
                case "utf-8":
                    return h = n,
                    a = r,
                    ve(me(t, (i = this).length - h), i, h, a);
                case "ascii":
                case "latin1":
                case "binary":
                    return ae(this, t, n, r);
                case "base64":
                    return i = this,
                    a = n,
                    o = r,
                    ve(we(t), i, a, o);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return se(this, t, n, r);
                default:
                    if (c)
                        throw new TypeError("Unknown encoding: " + e);
                    e = ("" + e).toLowerCase(),
                    c = !0
                }
        }
        ,
        f.prototype.toJSON = function() {
            return {
                type: "Buffer",
                data: Array.prototype.slice.call(this._arr || this, 0)
            }
        }
        ;
        const hi = 4096;
        function a(e, t, n) {
            if (e % 1 != 0 || e < 0)
                throw new RangeError("offset is not uint");
            if (n < e + t)
                throw new RangeError("Trying to access beyond buffer length")
        }
        function p(e, t, n, r, o, i) {
            if (!f.isBuffer(e))
                throw new TypeError('"buffer" argument must be a Buffer instance');
            if (o < t || t < i)
                throw new RangeError('"value" argument is out of bounds');
            if (n + r > e.length)
                throw new RangeError("Index out of range")
        }
        function ue(e, t, n, r, o) {
            ge(t, r, o, e, n, 7);
            r = Number(t & BigInt(4294967295)),
            e[n++] = r,
            e[n++] = r >>= 8,
            e[n++] = r >>= 8,
            e[n++] = r >>= 8,
            o = Number(t >> BigInt(32) & BigInt(4294967295));
            return e[n++] = o,
            e[n++] = o >>= 8,
            e[n++] = o >>= 8,
            e[n++] = o >>= 8,
            n
        }
        function fe(e, t, n, r, o) {
            ge(t, r, o, e, n, 7);
            r = Number(t & BigInt(4294967295)),
            e[n + 7] = r,
            e[n + 6] = r >>= 8,
            e[n + 5] = r >>= 8,
            e[n + 4] = r >>= 8,
            o = Number(t >> BigInt(32) & BigInt(4294967295));
            return e[n + 3] = o,
            e[n + 2] = o >>= 8,
            e[n + 1] = o >>= 8,
            e[n] = o >>= 8,
            n + 8
        }
        function pe(e, t, n, r) {
            if (n + r > e.length)
                throw new RangeError("Index out of range");
            if (n < 0)
                throw new RangeError("Index out of range")
        }
        function le(e, t, n, r, o) {
            return t = +t,
            n >>>= 0,
            o || pe(e, 0, n, 4),
            T.write(e, t, n, r, 23, 4),
            n + 4
        }
        function he(e, t, n, r, o) {
            return t = +t,
            n >>>= 0,
            o || pe(e, 0, n, 8),
            T.write(e, t, n, r, 52, 8),
            n + 8
        }
        f.prototype.slice = function(e, t) {
            var n = this.length
              , n = ((e = ~~e) < 0 ? (e += n) < 0 && (e = 0) : n < e && (e = n),
            (t = void 0 === t ? n : ~~t) < 0 ? (t += n) < 0 && (t = 0) : n < t && (t = n),
            t < e && (t = e),
            this.subarray(e, t));
            return Object.setPrototypeOf(n, f.prototype),
            n
        }
        ,
        f.prototype.readUintLE = f.prototype.readUIntLE = function(e, t, n) {
            e >>>= 0,
            t >>>= 0,
            n || a(e, t, this.length);
            let r = this[e]
              , o = 1
              , i = 0;
            for (; ++i < t && (o *= 256); )
                r += this[e + i] * o;
            return r
        }
        ,
        f.prototype.readUintBE = f.prototype.readUIntBE = function(e, t, n) {
            e >>>= 0,
            t >>>= 0,
            n || a(e, t, this.length);
            let r = this[e + --t]
              , o = 1;
            for (; 0 < t && (o *= 256); )
                r += this[e + --t] * o;
            return r
        }
        ,
        f.prototype.readUint8 = f.prototype.readUInt8 = function(e, t) {
            return e >>>= 0,
            t || a(e, 1, this.length),
            this[e]
        }
        ,
        f.prototype.readUint16LE = f.prototype.readUInt16LE = function(e, t) {
            return e >>>= 0,
            t || a(e, 2, this.length),
            this[e] | this[e + 1] << 8
        }
        ,
        f.prototype.readUint16BE = f.prototype.readUInt16BE = function(e, t) {
            return e >>>= 0,
            t || a(e, 2, this.length),
            this[e] << 8 | this[e + 1]
        }
        ,
        f.prototype.readUint32LE = f.prototype.readUInt32LE = function(e, t) {
            return e >>>= 0,
            t || a(e, 4, this.length),
            (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
        }
        ,
        f.prototype.readUint32BE = f.prototype.readUInt32BE = function(e, t) {
            return e >>>= 0,
            t || a(e, 4, this.length),
            16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
        }
        ,
        f.prototype.readBigUInt64LE = o(function(e) {
            l(e >>>= 0, "offset");
            var t = this[e]
              , n = this[e + 7]
              , t = (void 0 !== t && void 0 !== n || be(e, this.length - 8),
            t + 256 * this[++e] + 65536 * this[++e] + this[++e] * 2 ** 24)
              , e = this[++e] + 256 * this[++e] + 65536 * this[++e] + n * 2 ** 24;
            return BigInt(t) + (BigInt(e) << BigInt(32))
        }),
        f.prototype.readBigUInt64BE = o(function(e) {
            l(e >>>= 0, "offset");
            var t = this[e]
              , n = this[e + 7]
              , t = (void 0 !== t && void 0 !== n || be(e, this.length - 8),
            t * 2 ** 24 + 65536 * this[++e] + 256 * this[++e] + this[++e])
              , e = this[++e] * 2 ** 24 + 65536 * this[++e] + 256 * this[++e] + n;
            return (BigInt(t) << BigInt(32)) + BigInt(e)
        }),
        f.prototype.readIntLE = function(e, t, n) {
            e >>>= 0,
            t >>>= 0,
            n || a(e, t, this.length);
            let r = this[e]
              , o = 1
              , i = 0;
            for (; ++i < t && (o *= 256); )
                r += this[e + i] * o;
            return o *= 128,
            r >= o && (r -= Math.pow(2, 8 * t)),
            r
        }
        ,
        f.prototype.readIntBE = function(e, t, n) {
            e >>>= 0,
            t >>>= 0,
            n || a(e, t, this.length);
            let r = t
              , o = 1
              , i = this[e + --r];
            for (; 0 < r && (o *= 256); )
                i += this[e + --r] * o;
            return o *= 128,
            i >= o && (i -= Math.pow(2, 8 * t)),
            i
        }
        ,
        f.prototype.readInt8 = function(e, t) {
            return e >>>= 0,
            t || a(e, 1, this.length),
            128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
        }
        ,
        f.prototype.readInt16LE = function(e, t) {
            e >>>= 0,
            t || a(e, 2, this.length);
            t = this[e] | this[e + 1] << 8;
            return 32768 & t ? 4294901760 | t : t
        }
        ,
        f.prototype.readInt16BE = function(e, t) {
            e >>>= 0,
            t || a(e, 2, this.length);
            t = this[e + 1] | this[e] << 8;
            return 32768 & t ? 4294901760 | t : t
        }
        ,
        f.prototype.readInt32LE = function(e, t) {
            return e >>>= 0,
            t || a(e, 4, this.length),
            this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
        }
        ,
        f.prototype.readInt32BE = function(e, t) {
            return e >>>= 0,
            t || a(e, 4, this.length),
            this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
        }
        ,
        f.prototype.readBigInt64LE = o(function(e) {
            l(e >>>= 0, "offset");
            var t = this[e]
              , n = this[e + 7]
              , n = (void 0 !== t && void 0 !== n || be(e, this.length - 8),
            this[e + 4] + 256 * this[e + 5] + 65536 * this[e + 6] + (n << 24));
            return (BigInt(n) << BigInt(32)) + BigInt(t + 256 * this[++e] + 65536 * this[++e] + this[++e] * 2 ** 24)
        }),
        f.prototype.readBigInt64BE = o(function(e) {
            l(e >>>= 0, "offset");
            var t = this[e]
              , n = this[e + 7]
              , t = (void 0 !== t && void 0 !== n || be(e, this.length - 8),
            (t << 24) + 65536 * this[++e] + 256 * this[++e] + this[++e]);
            return (BigInt(t) << BigInt(32)) + BigInt(this[++e] * 2 ** 24 + 65536 * this[++e] + 256 * this[++e] + n)
        }),
        f.prototype.readFloatLE = function(e, t) {
            return e >>>= 0,
            t || a(e, 4, this.length),
            T.read(this, e, !0, 23, 4)
        }
        ,
        f.prototype.readFloatBE = function(e, t) {
            return e >>>= 0,
            t || a(e, 4, this.length),
            T.read(this, e, !1, 23, 4)
        }
        ,
        f.prototype.readDoubleLE = function(e, t) {
            return e >>>= 0,
            t || a(e, 8, this.length),
            T.read(this, e, !0, 52, 8)
        }
        ,
        f.prototype.readDoubleBE = function(e, t) {
            return e >>>= 0,
            t || a(e, 8, this.length),
            T.read(this, e, !1, 52, 8)
        }
        ,
        f.prototype.writeUintLE = f.prototype.writeUIntLE = function(e, t, n, r) {
            e = +e,
            t >>>= 0,
            n >>>= 0,
            r || p(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);
            let o = 1
              , i = 0;
            for (this[t] = 255 & e; ++i < n && (o *= 256); )
                this[t + i] = e / o & 255;
            return t + n
        }
        ,
        f.prototype.writeUintBE = f.prototype.writeUIntBE = function(e, t, n, r) {
            e = +e,
            t >>>= 0,
            n >>>= 0,
            r || p(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);
            let o = n - 1
              , i = 1;
            for (this[t + o] = 255 & e; 0 <= --o && (i *= 256); )
                this[t + o] = e / i & 255;
            return t + n
        }
        ,
        f.prototype.writeUint8 = f.prototype.writeUInt8 = function(e, t, n) {
            return e = +e,
            t >>>= 0,
            n || p(this, e, t, 1, 255, 0),
            this[t] = 255 & e,
            t + 1
        }
        ,
        f.prototype.writeUint16LE = f.prototype.writeUInt16LE = function(e, t, n) {
            return e = +e,
            t >>>= 0,
            n || p(this, e, t, 2, 65535, 0),
            this[t] = 255 & e,
            this[t + 1] = e >>> 8,
            t + 2
        }
        ,
        f.prototype.writeUint16BE = f.prototype.writeUInt16BE = function(e, t, n) {
            return e = +e,
            t >>>= 0,
            n || p(this, e, t, 2, 65535, 0),
            this[t] = e >>> 8,
            this[t + 1] = 255 & e,
            t + 2
        }
        ,
        f.prototype.writeUint32LE = f.prototype.writeUInt32LE = function(e, t, n) {
            return e = +e,
            t >>>= 0,
            n || p(this, e, t, 4, 4294967295, 0),
            this[t + 3] = e >>> 24,
            this[t + 2] = e >>> 16,
            this[t + 1] = e >>> 8,
            this[t] = 255 & e,
            t + 4
        }
        ,
        f.prototype.writeUint32BE = f.prototype.writeUInt32BE = function(e, t, n) {
            return e = +e,
            t >>>= 0,
            n || p(this, e, t, 4, 4294967295, 0),
            this[t] = e >>> 24,
            this[t + 1] = e >>> 16,
            this[t + 2] = e >>> 8,
            this[t + 3] = 255 & e,
            t + 4
        }
        ,
        f.prototype.writeBigUInt64LE = o(function(e, t=0) {
            return ue(this, e, t, BigInt(0), BigInt("0xffffffffffffffff"))
        }),
        f.prototype.writeBigUInt64BE = o(function(e, t=0) {
            return fe(this, e, t, BigInt(0), BigInt("0xffffffffffffffff"))
        }),
        f.prototype.writeIntLE = function(e, t, n, r) {
            e = +e,
            t >>>= 0,
            r || p(this, e, t, n, (r = Math.pow(2, 8 * n - 1)) - 1, -r);
            let o = 0
              , i = 1
              , a = 0;
            for (this[t] = 255 & e; ++o < n && (i *= 256); )
                e < 0 && 0 === a && 0 !== this[t + o - 1] && (a = 1),
                this[t + o] = (e / i >> 0) - a & 255;
            return t + n
        }
        ,
        f.prototype.writeIntBE = function(e, t, n, r) {
            e = +e,
            t >>>= 0,
            r || p(this, e, t, n, (r = Math.pow(2, 8 * n - 1)) - 1, -r);
            let o = n - 1
              , i = 1
              , a = 0;
            for (this[t + o] = 255 & e; 0 <= --o && (i *= 256); )
                e < 0 && 0 === a && 0 !== this[t + o + 1] && (a = 1),
                this[t + o] = (e / i >> 0) - a & 255;
            return t + n
        }
        ,
        f.prototype.writeInt8 = function(e, t, n) {
            return e = +e,
            t >>>= 0,
            n || p(this, e, t, 1, 127, -128),
            this[t] = 255 & (e = e < 0 ? 255 + e + 1 : e),
            t + 1
        }
        ,
        f.prototype.writeInt16LE = function(e, t, n) {
            return e = +e,
            t >>>= 0,
            n || p(this, e, t, 2, 32767, -32768),
            this[t] = 255 & e,
            this[t + 1] = e >>> 8,
            t + 2
        }
        ,
        f.prototype.writeInt16BE = function(e, t, n) {
            return e = +e,
            t >>>= 0,
            n || p(this, e, t, 2, 32767, -32768),
            this[t] = e >>> 8,
            this[t + 1] = 255 & e,
            t + 2
        }
        ,
        f.prototype.writeInt32LE = function(e, t, n) {
            return e = +e,
            t >>>= 0,
            n || p(this, e, t, 4, 2147483647, -2147483648),
            this[t] = 255 & e,
            this[t + 1] = e >>> 8,
            this[t + 2] = e >>> 16,
            this[t + 3] = e >>> 24,
            t + 4
        }
        ,
        f.prototype.writeInt32BE = function(e, t, n) {
            return e = +e,
            t >>>= 0,
            n || p(this, e, t, 4, 2147483647, -2147483648),
            this[t] = (e = e < 0 ? 4294967295 + e + 1 : e) >>> 24,
            this[t + 1] = e >>> 16,
            this[t + 2] = e >>> 8,
            this[t + 3] = 255 & e,
            t + 4
        }
        ,
        f.prototype.writeBigInt64LE = o(function(e, t=0) {
            return ue(this, e, t, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"))
        }),
        f.prototype.writeBigInt64BE = o(function(e, t=0) {
            return fe(this, e, t, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"))
        }),
        f.prototype.writeFloatLE = function(e, t, n) {
            return le(this, e, t, !0, n)
        }
        ,
        f.prototype.writeFloatBE = function(e, t, n) {
            return le(this, e, t, !1, n)
        }
        ,
        f.prototype.writeDoubleLE = function(e, t, n) {
            return he(this, e, t, !0, n)
        }
        ,
        f.prototype.writeDoubleBE = function(e, t, n) {
            return he(this, e, t, !1, n)
        }
        ,
        f.prototype.copy = function(e, t, n, r) {
            if (!f.isBuffer(e))
                throw new TypeError("argument should be a Buffer");
            if (n = n || 0,
            r || 0 === r || (r = this.length),
            t >= e.length && (t = e.length),
            (r = 0 < r && r < n ? n : r) === n)
                return 0;
            if (0 === e.length || 0 === this.length)
                return 0;
            if ((t = t || 0) < 0)
                throw new RangeError("targetStart out of bounds");
            if (n < 0 || n >= this.length)
                throw new RangeError("Index out of range");
            if (r < 0)
                throw new RangeError("sourceEnd out of bounds");
            r > this.length && (r = this.length);
            var o = (r = e.length - t < r - n ? e.length - t + n : r) - n;
            return this === e && "function" == typeof Uint8Array.prototype.copyWithin ? this.copyWithin(t, n, r) : Uint8Array.prototype.set.call(e, this.subarray(n, r), t),
            o
        }
        ,
        f.prototype.fill = function(e, t, n, r) {
            if ("string" == typeof e) {
                if ("string" == typeof t ? (r = t,
                t = 0,
                n = this.length) : "string" == typeof n && (r = n,
                n = this.length),
                void 0 !== r && "string" != typeof r)
                    throw new TypeError("encoding must be a string");
                if ("string" == typeof r && !f.isEncoding(r))
                    throw new TypeError("Unknown encoding: " + r);
                var o;
                1 === e.length && (o = e.charCodeAt(0),
                ("utf8" === r && o < 128 || "latin1" === r) && (e = o))
            } else
                "number" == typeof e ? e &= 255 : "boolean" == typeof e && (e = Number(e));
            if (t < 0 || this.length < t || this.length < n)
                throw new RangeError("Out of range index");
            if (n <= t)
                return this;
            t >>>= 0,
            n = void 0 === n ? this.length : n >>> 0;
            let i;
            if ("number" == typeof (e = e || 0))
                for (i = t; i < n; ++i)
                    this[i] = e;
            else {
                var a = f.isBuffer(e) ? e : f.from(e, r)
                  , s = a.length;
                if (0 === s)
                    throw new TypeError('The value "' + e + '" is invalid for argument "value"');
                for (i = 0; i < n - t; ++i)
                    this[i + t] = a[i % s]
            }
            return this
        }
        ;
        const U = {};
        function de(e, t, n) {
            U[e] = class extends n {
                constructor() {
                    super(),
                    Object.defineProperty(this, "message", {
                        value: t.apply(this, arguments),
                        writable: !0,
                        configurable: !0
                    }),
                    this.name = this.name + ` [${e}]`,
                    this.stack,
                    delete this.name
                }
                get code() {
                    return e
                }
                set code(e) {
                    Object.defineProperty(this, "code", {
                        configurable: !0,
                        enumerable: !0,
                        value: e,
                        writable: !0
                    })
                }
                toString() {
                    return this.name + ` [${e}]: ` + this.message
                }
            }
        }
        function ye(e) {
            let t = ""
              , n = e.length;
            for (var r = "-" === e[0] ? 1 : 0; n >= 4 + r; n -= 3)
                t = "_" + e.slice(n - 3, n) + t;
            return "" + e.slice(0, n) + t
        }
        function ge(t, n, r, e, o, i) {
            if (r < t || t < n) {
                var a = "bigint" == typeof n ? "n" : "";
                let e;
                throw e = 3 < i ? 0 === n || n === BigInt(0) ? `>= 0${a} and < 2${a} ** ` + 8 * (i + 1) + a : `>= -(2${a} ** ${8 * (i + 1) - 1}${a}) and < 2 ** ` + (8 * (i + 1) - 1) + a : `>= ${n}${a} and <= ` + r + a,
                new U.ERR_OUT_OF_RANGE("value",e,t)
            }
            n = e,
            r = i,
            l(a = o, "offset"),
            void 0 !== n[a] && void 0 !== n[a + r] || be(a, n.length - (r + 1))
        }
        function l(e, t) {
            if ("number" != typeof e)
                throw new U.ERR_INVALID_ARG_TYPE(t,"number",e)
        }
        function be(e, t, n) {
            if (Math.floor(e) !== e)
                throw l(e, n),
                new U.ERR_OUT_OF_RANGE(n || "offset","an integer",e);
            if (t < 0)
                throw new U.ERR_BUFFER_OUT_OF_BOUNDS;
            throw new U.ERR_OUT_OF_RANGE(n || "offset",`>= ${n ? 1 : 0} and <= ` + t,e)
        }
        de("ERR_BUFFER_OUT_OF_BOUNDS", function(e) {
            return e ? e + " is outside of buffer bounds" : "Attempt to access memory outside buffer bounds"
        }, RangeError),
        de("ERR_INVALID_ARG_TYPE", function(e, t) {
            return `The "${e}" argument must be of type number. Received type ` + typeof t
        }, TypeError),
        de("ERR_OUT_OF_RANGE", function(e, t, n) {
            e = `The value of "${e}" is out of range.`;
            let r = n;
            return Number.isInteger(n) && Math.abs(n) > 2 ** 32 ? r = ye(String(n)) : "bigint" == typeof n && (r = String(n),
            (n > BigInt(2) ** BigInt(32) || n < -(BigInt(2) ** BigInt(32))) && (r = ye(r)),
            r += "n"),
            e += ` It must be ${t}. Received ` + r
        }, RangeError);
        const di = /[^+/0-9A-Za-z-_]/g;
        function me(t, n) {
            n = n || 1 / 0;
            let r;
            var o = t.length;
            let i = null;
            const a = [];
            for (let e = 0; e < o; ++e) {
                if (55295 < (r = t.charCodeAt(e)) && r < 57344) {
                    if (!i) {
                        if (56319 < r) {
                            -1 < (n -= 3) && a.push(239, 191, 189);
                            continue
                        }
                        if (e + 1 === o) {
                            -1 < (n -= 3) && a.push(239, 191, 189);
                            continue
                        }
                        i = r;
                        continue
                    }
                    if (r < 56320) {
                        -1 < (n -= 3) && a.push(239, 191, 189),
                        i = r;
                        continue
                    }
                    r = 65536 + (i - 55296 << 10 | r - 56320)
                } else
                    i && -1 < (n -= 3) && a.push(239, 191, 189);
                if (i = null,
                r < 128) {
                    if (--n < 0)
                        break;
                    a.push(r)
                } else if (r < 2048) {
                    if ((n -= 2) < 0)
                        break;
                    a.push(r >> 6 | 192, 63 & r | 128)
                } else if (r < 65536) {
                    if ((n -= 3) < 0)
                        break;
                    a.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128)
                } else {
                    if (!(r < 1114112))
                        throw new Error("Invalid code point");
                    if ((n -= 4) < 0)
                        break;
                    a.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128)
                }
            }
            return a
        }
        function we(e) {
            return pi.toByteArray(function(e) {
                if ((e = (e = e.split("=")[0]).trim().replace(di, "")).length < 2)
                    return "";
                for (; e.length % 4 != 0; )
                    e += "=";
                return e
            }(e))
        }
        function ve(e, t, n, r) {
            let o;
            for (o = 0; o < r && !(o + n >= t.length || o >= e.length); ++o)
                t[o + n] = e[o];
            return o
        }
        function h(e, t) {
            return e instanceof t || null != e && null != e.constructor && null != e.constructor.name && e.constructor.name === t.name
        }
        function Oe(e) {
            return e != e
        }
        const yi = function() {
            var n = "0123456789abcdef";
            const r = new Array(256);
            for (let t = 0; t < 16; ++t) {
                var o = 16 * t;
                for (let e = 0; e < 16; ++e)
                    r[o + e] = n[t] + n[e]
            }
            return r
        }();
        function o(e) {
            return "undefined" == typeof BigInt ? Ae : e
        }
        function Ae() {
            throw new Error("BigInt not supported")
        }
    }
    n = [EvalError, RangeError, ReferenceError, SyntaxError, TypeError, URIError, globalThis.DOMException, globalThis.AssertionError, globalThis.SystemError].filter(Boolean).map(e=>[e.name, e]);
    const xe = new Map(n)
      , Se = [{
        property: "name",
        enumerable: !1
    }, {
        property: "message",
        enumerable: !1
    }, {
        property: "stack",
        enumerable: !1
    }, {
        property: "code",
        enumerable: !0
    }, {
        property: "cause",
        enumerable: !1
    }]
      , Ee = Symbol(".toJSON was called")
      , je = e=>{
        e[Ee] = !0;
        var t = e.toJSON();
        return delete e[Ee],
        t
    }
      , Pe = e=>xe.get(e) ?? Error
      , Ie = ({from: e, seen: t, to: n, forceEnumerable: r, maxDepth: o, depth: i, useToJSON: a, serialize: s})=>{
        if (!n)
            if (Array.isArray(e))
                n = [];
            else if (!s && Me(e)) {
                const h = Pe(e.name);
                n = new h
            } else
                n = {};
        if (t.push(e),
        o <= i)
            return n;
        if (a && "function" == typeof e.toJSON && !0 !== e[Ee])
            return je(e);
        var c, u, f, p, l = e=>Ie({
            from: e,
            seen: [...t],
            forceEnumerable: r,
            maxDepth: o,
            depth: i,
            useToJSON: a,
            serialize: s
        });
        for ([c,u] of Object.entries(e))
            "function" == typeof I.Buffer && I.Buffer.isBuffer(u) ? n[c] = "[object Buffer]" : null !== u && "object" == typeof u && "function" == typeof u.pipe ? n[c] = "[object Stream]" : "function" != typeof u && (u && "object" == typeof u ? t.includes(e[c]) ? n[c] = "[Circular]" : (i++,
            n[c] = l(e[c])) : n[c] = u);
        for ({property: f, enumerable: p} of Se)
            void 0 !== e[f] && null !== e[f] && Object.defineProperty(n, f, {
                value: Me(e[f]) ? l(e[f]) : e[f],
                enumerable: !!r || p,
                configurable: !0,
                writable: !0
            });
        return n
    }
    ;
    function Me(e) {
        return Boolean(e) && "object" == typeof e && "name"in e && "message"in e && "stack"in e
    }
    var Ne = {
        exports: {}
    };
    var e = (e=7,t=!1)=>Array.from({
        length: e
    }, (t=>"undefined" != typeof crypto && "function" == typeof crypto.getRandomValues ? ()=>{
        const e = crypto.getRandomValues(new Uint8Array(1))[0];
        return (e >= t ? e % t : e).toString(t)
    }
    : ()=>Math.floor(Math.random() * t).toString(t))(t ? 16 : 36)).join("")
      , d = (Ne.exports = e,
    Ne.exports.default = e,
    "window")
      , ke = Ne.exports()
      , Be = new Map
      , _e = new Map
      , Te = async a=>{
        const {transactionId: e, messageID: s, messageType: t} = a;
        var n = async()=>{
            let e, t, n = !1;
            try {
                const i = _e.get(s);
                if ("function" != typeof i)
                    throw n = !0,
                    new Error(`[webext-bridge] No handler registered in '${d}' to accept messages with id '${s}'`);
                e = await i({
                    sender: a.origin,
                    id: s,
                    data: a.data,
                    timestamp: a.timestamp
                })
            } catch (e) {
                t = e
            } finally {
                if (t && (a.err = function(e, t={}) {
                    var {maxDepth: t=Number.POSITIVE_INFINITY, useToJSON: n=!0} = t;
                    return "object" == typeof e && null !== e ? Ie({
                        from: e,
                        seen: [],
                        forceEnumerable: !0,
                        maxDepth: t,
                        depth: 0,
                        useToJSON: n,
                        serialize: !0
                    }) : "function" == typeof e ? `[Function: ${e.name ?? "anonymous"}]` : e
                }(t)),
                Ue((r = ((e,t)=>{
                    for (var n in t = t || {})
                        z.call(t, n) && q(e, n, t[n]);
                    if (F)
                        for (var n of F(t))
                            L.call(t, n) && q(e, n, t[n]);
                    return e
                }
                )({}, a),
                o = {
                    messageType: "reply",
                    data: e,
                    origin: {
                        context: d,
                        tabId: null
                    },
                    destination: a.origin,
                    hops: []
                },
                C(r, R(o)))),
                t && !n)
                    throw e
            }
            var r, o
        }
        ;
        switch (t) {
        case "reply":
            {
                const i = Be.get(e);
                if (i) {
                    var {err: r, data: o} = a;
                    if (r) {
                        const c = r
                          , u = self[c.name]
                          , f = new ("function" == typeof u ? u : Error)(c.message);
                        Object.keys(c).forEach(e=>{
                            f[e] = c[e]
                        }
                        ),
                        i.reject(f)
                    } else
                        i.resolve(o);
                    Be.delete(e)
                }
                return
            }
        case "message":
            return n();
        default:
            throw new Error("unknown message type")
        }
    }
      , Ue = (window.addEventListener("message", De),
    e=>{
        var t = e["destination"];
        e.hops.includes(ke) || (e.hops.push(ke),
        t ? t.context && Ce(window, e) : Te(e))
    }
    );
    async function De({data: e, ports: t}) {
        if ("__crx_bridge_verify_listening" === e.cmd && e.scope === ui && e.context !== d) {
            const n = t[0];
            n.postMessage(!0)
        } else
            "__crx_bridge_route_message" === e.cmd && e.scope === ui && e.context !== d && (t = e["payload"],
            Ue(t))
    }
    var Ce = (e,t)=>{
        if ("string" != typeof ui || 0 === ui.length)
            throw new Error(`webext-bridge uses window.postMessage to talk with other "window"(s), for message routing and stuff,which is global/conflicting operation in case there are other scripts using webext-bridge. Call Bridge#setNamespace(nsps) to isolate your app. Example: setNamespace('com.facebook.react-devtools'). Make sure to use same namespace across all your scripts whereever window.postMessage is likely to be used\``);
        const n = new MessageChannel
          , r = setTimeout(()=>{
            n.port1.onmessage = null,
            Ce(e, t)
        }
        , 300);
        n.port1.onmessage = ()=>{
            clearTimeout(r),
            e.postMessage({
                cmd: "__crx_bridge_route_message",
                scope: ui,
                context: d,
                payload: t
            }, "*")
        }
        ,
        e.postMessage({
            cmd: "__crx_bridge_verify_listening",
            scope: ui,
            context: d
        }, "*", [n.port2])
    }
    ;
    var Re = /^((?:background$)|devtools|popup|options|content-script|window)(?:@(\d+)(?:\.(\d+))?)?$/
      , Fe = e=>{
        var [,e,t,n] = e.match(Re) || [];
        return {
            context: e,
            tabId: +t,
            frameId: n ? +n : void 0
        }
    }
    ;
    var ze, Le, qe, n = "1.0.2";
    (e = ze = ze || {}).WINDOW_REQUEST = "samara_window_request",
    e.NEWWINDOW_REQUEST = "samara_new_window_request",
    e.ACTION_REQUEST = "samara_action_request",
    e.CS_REQUEST = "samara_cs_request",
    e.BACKGROUND_REQUEST = "samara_background_request",
    (e = Le = Le || {}).contentScript = "content-script",
    e.background = "background",
    e.window = "window",
    e.newWindow = "new-window",
    e.popup = "popup",
    (_ = _ || {}).main = "samara-inject",
    (e = qe = qe || {}).getEthereumEncryptionPublicKey = "samara_eth_encryption_pubkey",
    e.ethereumDecrypt = "samara_eth_decrypt",
    e.sign = "samara_sign_hash",
    e.unlock = "samara_unlock_keyring",
    e.lock = "samara_lock_keyring",
    e.isLocked = "samara_is_locked_keyring",
    e.newWindowInit = "samara_newWindowInit",
    e.getSettings = "samara_getAllSettings",
    e.newWindowUnload = "samara_newWindowUnload",
    e.sendToTab = "samara_sendToTab",
    e.getNewAccount = "samara_getNewAccount",
    e.saveNewAccount = "samara_saveNewAccount",
    e.changeNetwork = "samara_changeNetwork";
    var Ve = {};
    function We() {
        var r = [].slice.call(arguments);
        return function() {
            for (var e = [].slice.call(arguments), t = 0, n = {}; t < e.length; t++)
                !function(t, n) {
                    Object.keys(n).forEach(function(e) {
                        ~r.indexOf(e) || (t[e] = n[e])
                    })
                }(n, e[t]);
            return n
        }
    }
    var Je = $e;
    function $e(e, t, n) {
        var r, o = We("name", "message", "stack", "constructor", "toJSON")(t || {});
        for (r in this.message = e || "Unspecified AssertionError",
        this.showDiff = !1,
        o)
            this[r] = o[r];
        if (n = n || $e,
        Error.captureStackTrace)
            Error.captureStackTrace(this, n);
        else
            try {
                throw new Error
            } catch (e) {
                this.stack = e.stack
            }
    }
    ($e.prototype = Object.create(Error.prototype)).name = "AssertionError",
    ($e.prototype.constructor = $e).prototype.toJSON = function(e) {
        var t = We("constructor", "toJSON", "stack")({
            name: this.name
        }, this);
        return !1 !== e && this.stack && (t.stack = this.stack),
        t
    }
    ;
    var i = {};
    function Ge(e, t) {
        return null != e && t in Object(e)
    }
    function He(e) {
        return e.replace(/([^\\])\[/g, "$1.[").match(/(\\\.|[^.]+?)+/g).map(function(e) {
            if ("constructor" === e || "__proto__" === e || "prototype" === e)
                return {};
            var t = /^\[(\d+)\]$/.exec(e);
            return t ? {
                i: parseFloat(t[1])
            } : {
                p: e.replace(/\\([.[\]])/g, "$1")
            }
        })
    }
    function Ke(e, t, n) {
        var r = e
          , o = null;
        n = void 0 === n ? t.length : n;
        for (var i = 0; i < n; i++) {
            var a = t[i];
            r && (r = void 0 === a.p ? r[a.i] : r[a.p],
            i === n - 1 && (o = r))
        }
        return o
    }
    function Qe(e, t) {
        var t = He(t)
          , n = t[t.length - 1]
          , n = {
            parent: 1 < t.length ? Ke(e, t, t.length - 1) : e,
            name: n.p || n.i,
            value: Ke(e, t)
        };
        return n.exists = Ge(n.parent, n.name),
        n
    }
    var Ye, Ze, Xe, et, tt, nt, rt, ot, it, at, st, ct, ut, ft, pt = {
        hasProperty: Ge,
        getPathInfo: Qe,
        getPathValue: function(e, t) {
            return Qe(e, t).value
        },
        setPathValue: function(e, t, n) {
            for (var t = He(t), r = n, o = t, i = e, a = o.length, s = 0; s < a; s++) {
                var c, u = null, f = null, p = o[s];
                s === a - 1 ? i[u = void 0 === p.p ? p.i : p.p] = r : i = void 0 !== p.p && i[p.p] ? i[p.p] : void 0 !== p.i && i[p.i] ? i[p.i] : (c = o[s + 1],
                u = void 0 === p.p ? p.i : p.p,
                f = void 0 === c.p ? [] : {},
                i[u] = f,
                i[u])
            }
            return e
        }
    }, y = function(e, t, n) {
        e = e.__flags || (e.__flags = Object.create(null));
        if (3 !== arguments.length)
            return e[t];
        e[t] = n
    }, lt = y, ht = function(e, t) {
        e = lt(e, "negate"),
        t = t[0];
        return e ? !t : t
    }, dt = {
        exports: {}
    }, yt = (dt.exports = (Ye = "function" == typeof Promise,
    Ze = "object" == typeof self ? self : V,
    e = "undefined" != typeof Symbol,
    Xe = "undefined" != typeof Map,
    et = "undefined" != typeof Set,
    tt = "undefined" != typeof WeakMap,
    nt = "undefined" != typeof WeakSet,
    rt = "undefined" != typeof DataView,
    O = e && void 0 !== Symbol.iterator,
    ot = e && void 0 !== Symbol.toStringTag,
    e = et && "function" == typeof Set.prototype.entries,
    g = Xe && "function" == typeof Map.prototype.entries,
    it = e && Object.getPrototypeOf((new Set).entries()),
    at = g && Object.getPrototypeOf((new Map).entries()),
    st = O && "function" == typeof Array.prototype[Symbol.iterator],
    ct = st && Object.getPrototypeOf([][Symbol.iterator]()),
    ut = O && "function" == typeof String.prototype[Symbol.iterator],
    ft = ut && Object.getPrototypeOf(""[Symbol.iterator]()),
    function(e) {
        var t = typeof e;
        if ("object" != t)
            return t;
        if (null === e)
            return "null";
        if (e === Ze)
            return "global";
        if (Array.isArray(e) && (!1 == ot || !(Symbol.toStringTag in e)))
            return "Array";
        if ("object" == typeof window && null !== window) {
            if ("object" == typeof window.location && e === window.location)
                return "Location";
            if ("object" == typeof window.document && e === window.document)
                return "Document";
            if ("object" == typeof window.navigator) {
                if ("object" == typeof window.navigator.mimeTypes && e === window.navigator.mimeTypes)
                    return "MimeTypeArray";
                if ("object" == typeof window.navigator.plugins && e === window.navigator.plugins)
                    return "PluginArray"
            }
            if (("function" == typeof window.HTMLElement || "object" == typeof window.HTMLElement) && e instanceof window.HTMLElement) {
                if ("BLOCKQUOTE" === e.tagName)
                    return "HTMLQuoteElement";
                if ("TD" === e.tagName)
                    return "HTMLTableDataCellElement";
                if ("TH" === e.tagName)
                    return "HTMLTableHeaderCellElement"
            }
        }
        t = ot && e[Symbol.toStringTag];
        if ("string" == typeof t)
            return t;
        t = Object.getPrototypeOf(e);
        if (t === RegExp.prototype)
            return "RegExp";
        if (t === Date.prototype)
            return "Date";
        if (Ye && t === Promise.prototype)
            return "Promise";
        if (et && t === Set.prototype)
            return "Set";
        if (Xe && t === Map.prototype)
            return "Map";
        if (nt && t === WeakSet.prototype)
            return "WeakSet";
        if (tt && t === WeakMap.prototype)
            return "WeakMap";
        if (rt && t === DataView.prototype)
            return "DataView";
        if (Xe && t === at)
            return "Map Iterator";
        if (et && t === it)
            return "Set Iterator";
        if (st && t === ct)
            return "Array Iterator";
        if (ut && t === ft)
            return "String Iterator";
        return null !== t ? Object.prototype.toString.call(e).slice(8, -1) : "Object"
    }
    ),
    Je), gt = y, bt = dt.exports, mt = function(e, r) {
        var t = gt(e, "message")
          , n = gt(e, "ssfi")
          , t = t ? t + ": " : ""
          , o = (e = gt(e, "object"),
        (r = r.map(function(e) {
            return e.toLowerCase()
        })).sort(),
        r.map(function(e, t) {
            var n = ~["a", "e", "i", "o", "u"].indexOf(e.charAt(0)) ? "an" : "a";
            return (1 < r.length && t === r.length - 1 ? "or " : "") + n + " " + e
        }).join(", "))
          , i = bt(e).toLowerCase();
        if (!r.some(function(e) {
            return i === e
        }))
            throw new yt(t + "object tested must be " + o + ", but " + i + " given",void 0,n)
    }, wt = function(e, t) {
        return 4 < t.length ? t[4] : e._obj
    }, vt = Function.prototype.toString, Ot = /\s*function(?:\s|\s*\/\*[^(?:*\/)]+\*\/\s*)*([^\s\(\/]+)/;
    var At, xt, St, Et, jt, Pt, It, Mt, Nt, kt, Bt, _t, Tt, Ut, Dt = function(e) {
        if ("function" != typeof e)
            return null;
        var t, n = "";
        return void 0 === Function.prototype.name && void 0 === e.name ? (t = vt.call(e).match(Ot)) && (n = t[1]) : n = e.name,
        n
    }, e = {
        exports: {}
    }, Ct = {}, Rt = {};
    function Ft() {
        return xt ? At : (xt = 1,
        At = function() {
            if ("function" != typeof Symbol || "function" != typeof Object.getOwnPropertySymbols)
                return !1;
            if ("symbol" == typeof Symbol.iterator)
                return !0;
            var e = {}
              , t = Symbol("test")
              , n = Object(t);
            if ("string" == typeof t)
                return !1;
            if ("[object Symbol]" !== Object.prototype.toString.call(t))
                return !1;
            if ("[object Symbol]" !== Object.prototype.toString.call(n))
                return !1;
            for (t in e[t] = 42,
            e)
                return !1;
            if ("function" == typeof Object.keys && 0 !== Object.keys(e).length)
                return !1;
            if ("function" == typeof Object.getOwnPropertyNames && 0 !== Object.getOwnPropertyNames(e).length)
                return !1;
            n = Object.getOwnPropertySymbols(e);
            if (1 !== n.length || n[0] !== t)
                return !1;
            if (!Object.prototype.propertyIsEnumerable.call(e, t))
                return !1;
            if ("function" == typeof Object.getOwnPropertyDescriptor) {
                n = Object.getOwnPropertyDescriptor(e, t);
                if (42 !== n.value || !0 !== n.enumerable)
                    return !1
            }
            return !0
        }
        )
    }
    function zt() {
        if (Et)
            return St;
        Et = 1;
        var e = Ft();
        return St = function() {
            return e() && !!Symbol.toStringTag
        }
    }
    function Lt() {
        if (kt)
            return Nt;
        kt = 1;
        var e = function() {
            if (Mt)
                return It;
            Mt = 1;
            var c = "Function.prototype.bind called on incompatible "
              , u = Array.prototype.slice
              , f = Object.prototype.toString
              , p = "[object Function]";
            return It = function(t) {
                var n = this;
                if ("function" != typeof n || f.call(n) !== p)
                    throw new TypeError(c + n);
                for (var r, e, o = u.call(arguments, 1), i = Math.max(0, n.length - o.length), a = [], s = 0; s < i; s++)
                    a.push("$" + s);
                return r = Function("binder", "return function (" + a.join(",") + "){ return binder.apply(this,arguments); }")(function() {
                    var e;
                    return this instanceof r ? (e = n.apply(this, o.concat(u.call(arguments))),
                    Object(e) === e ? e : this) : n.apply(t, o.concat(u.call(arguments)))
                }),
                n.prototype && ((e = function() {}
                ).prototype = n.prototype,
                r.prototype = new e,
                e.prototype = null),
                r
            }
        }();
        return Nt = Function.prototype.bind || e
    }
    function qt() {
        if (Ut)
            return Tt;
        function r(e) {
            try {
                return t('"use strict"; return (' + e + ").constructor;")()
            } catch (e) {}
        }
        Ut = 1;
        var e, l = SyntaxError, t = Function, h = TypeError, d = Object.getOwnPropertyDescriptor;
        if (d)
            try {
                d({}, "")
            } catch (e) {
                d = null
            }
        function n() {
            throw new h
        }
        function i(e) {
            var t, n;
            return "%AsyncFunction%" === e ? t = r("async function () {}") : "%GeneratorFunction%" === e ? t = r("function* () {}") : "%AsyncGeneratorFunction%" === e ? t = r("async function* () {}") : "%AsyncGenerator%" === e ? (n = i("%AsyncGeneratorFunction%")) && (t = n.prototype) : "%AsyncIteratorPrototype%" === e && (n = i("%AsyncGenerator%")) && (t = s(n.prototype)),
            y[e] = t
        }
        var o = d ? function() {
            try {
                return n
            } catch (e) {
                try {
                    return d(arguments, "callee").get
                } catch (e) {
                    return n
                }
            }
        }() : n
          , a = function() {
            if (Pt)
                return jt;
            Pt = 1;
            var e = "undefined" != typeof Symbol && Symbol
              , t = Ft();
            return jt = function() {
                return "function" == typeof e && ("function" == typeof Symbol && ("symbol" == typeof e("foo") && ("symbol" == typeof Symbol("bar") && t())))
            }
        }()()
          , s = Object.getPrototypeOf || function(e) {
            return e.__proto__
        }
          , c = {}
          , u = "undefined" == typeof Uint8Array ? e : s(Uint8Array)
          , y = {
            "%AggregateError%": "undefined" == typeof AggregateError ? e : AggregateError,
            "%Array%": Array,
            "%ArrayBuffer%": "undefined" == typeof ArrayBuffer ? e : ArrayBuffer,
            "%ArrayIteratorPrototype%": a ? s([][Symbol.iterator]()) : e,
            "%AsyncFromSyncIteratorPrototype%": e,
            "%AsyncFunction%": c,
            "%AsyncGenerator%": c,
            "%AsyncGeneratorFunction%": c,
            "%AsyncIteratorPrototype%": c,
            "%Atomics%": "undefined" == typeof Atomics ? e : Atomics,
            "%BigInt%": "undefined" == typeof BigInt ? e : BigInt,
            "%Boolean%": Boolean,
            "%DataView%": "undefined" == typeof DataView ? e : DataView,
            "%Date%": Date,
            "%decodeURI%": decodeURI,
            "%decodeURIComponent%": decodeURIComponent,
            "%encodeURI%": encodeURI,
            "%encodeURIComponent%": encodeURIComponent,
            "%Error%": Error,
            "%eval%": eval,
            "%EvalError%": EvalError,
            "%Float32Array%": "undefined" == typeof Float32Array ? e : Float32Array,
            "%Float64Array%": "undefined" == typeof Float64Array ? e : Float64Array,
            "%FinalizationRegistry%": "undefined" == typeof FinalizationRegistry ? e : FinalizationRegistry,
            "%Function%": t,
            "%GeneratorFunction%": c,
            "%Int8Array%": "undefined" == typeof Int8Array ? e : Int8Array,
            "%Int16Array%": "undefined" == typeof Int16Array ? e : Int16Array,
            "%Int32Array%": "undefined" == typeof Int32Array ? e : Int32Array,
            "%isFinite%": isFinite,
            "%isNaN%": isNaN,
            "%IteratorPrototype%": a ? s(s([][Symbol.iterator]())) : e,
            "%JSON%": "object" == typeof JSON ? JSON : e,
            "%Map%": "undefined" == typeof Map ? e : Map,
            "%MapIteratorPrototype%": "undefined" != typeof Map && a ? s((new Map)[Symbol.iterator]()) : e,
            "%Math%": Math,
            "%Number%": Number,
            "%Object%": Object,
            "%parseFloat%": parseFloat,
            "%parseInt%": parseInt,
            "%Promise%": "undefined" == typeof Promise ? e : Promise,
            "%Proxy%": "undefined" == typeof Proxy ? e : Proxy,
            "%RangeError%": RangeError,
            "%ReferenceError%": ReferenceError,
            "%Reflect%": "undefined" == typeof Reflect ? e : Reflect,
            "%RegExp%": RegExp,
            "%Set%": "undefined" == typeof Set ? e : Set,
            "%SetIteratorPrototype%": "undefined" != typeof Set && a ? s((new Set)[Symbol.iterator]()) : e,
            "%SharedArrayBuffer%": "undefined" == typeof SharedArrayBuffer ? e : SharedArrayBuffer,
            "%String%": String,
            "%StringIteratorPrototype%": a ? s(""[Symbol.iterator]()) : e,
            "%Symbol%": a ? Symbol : e,
            "%SyntaxError%": l,
            "%ThrowTypeError%": o,
            "%TypedArray%": u,
            "%TypeError%": h,
            "%Uint8Array%": "undefined" == typeof Uint8Array ? e : Uint8Array,
            "%Uint8ClampedArray%": "undefined" == typeof Uint8ClampedArray ? e : Uint8ClampedArray,
            "%Uint16Array%": "undefined" == typeof Uint16Array ? e : Uint16Array,
            "%Uint32Array%": "undefined" == typeof Uint32Array ? e : Uint32Array,
            "%URIError%": URIError,
            "%WeakMap%": "undefined" == typeof WeakMap ? e : WeakMap,
            "%WeakRef%": "undefined" == typeof WeakRef ? e : WeakRef,
            "%WeakSet%": "undefined" == typeof WeakSet ? e : WeakSet
        }
          , f = {
            "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
            "%ArrayPrototype%": ["Array", "prototype"],
            "%ArrayProto_entries%": ["Array", "prototype", "entries"],
            "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
            "%ArrayProto_keys%": ["Array", "prototype", "keys"],
            "%ArrayProto_values%": ["Array", "prototype", "values"],
            "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
            "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
            "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
            "%BooleanPrototype%": ["Boolean", "prototype"],
            "%DataViewPrototype%": ["DataView", "prototype"],
            "%DatePrototype%": ["Date", "prototype"],
            "%ErrorPrototype%": ["Error", "prototype"],
            "%EvalErrorPrototype%": ["EvalError", "prototype"],
            "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
            "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
            "%FunctionPrototype%": ["Function", "prototype"],
            "%Generator%": ["GeneratorFunction", "prototype"],
            "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
            "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
            "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
            "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
            "%JSONParse%": ["JSON", "parse"],
            "%JSONStringify%": ["JSON", "stringify"],
            "%MapPrototype%": ["Map", "prototype"],
            "%NumberPrototype%": ["Number", "prototype"],
            "%ObjectPrototype%": ["Object", "prototype"],
            "%ObjProto_toString%": ["Object", "prototype", "toString"],
            "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
            "%PromisePrototype%": ["Promise", "prototype"],
            "%PromiseProto_then%": ["Promise", "prototype", "then"],
            "%Promise_all%": ["Promise", "all"],
            "%Promise_reject%": ["Promise", "reject"],
            "%Promise_resolve%": ["Promise", "resolve"],
            "%RangeErrorPrototype%": ["RangeError", "prototype"],
            "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
            "%RegExpPrototype%": ["RegExp", "prototype"],
            "%SetPrototype%": ["Set", "prototype"],
            "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
            "%StringPrototype%": ["String", "prototype"],
            "%SymbolPrototype%": ["Symbol", "prototype"],
            "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
            "%TypedArrayPrototype%": ["TypedArray", "prototype"],
            "%TypeErrorPrototype%": ["TypeError", "prototype"],
            "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
            "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
            "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
            "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
            "%URIErrorPrototype%": ["URIError", "prototype"],
            "%WeakMapPrototype%": ["WeakMap", "prototype"],
            "%WeakSetPrototype%": ["WeakSet", "prototype"]
        }
          , a = Lt()
          , g = function() {
            if (_t)
                return Bt;
            _t = 1;
            var e = Lt();
            return Bt = e.call(Function.call, Object.prototype.hasOwnProperty)
        }()
          , b = a.call(Function.call, Array.prototype.concat)
          , m = a.call(Function.apply, Array.prototype.splice)
          , p = a.call(Function.call, String.prototype.replace)
          , w = a.call(Function.call, String.prototype.slice)
          , v = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g
          , O = /\\(\\)?/g
          , A = function(e) {
            var t = w(e, 0, 1)
              , n = w(e, -1);
            if ("%" === t && "%" !== n)
                throw new l("invalid intrinsic syntax, expected closing `%`");
            if ("%" === n && "%" !== t)
                throw new l("invalid intrinsic syntax, expected opening `%`");
            var o = [];
            return p(e, v, function(e, t, n, r) {
                o[o.length] = n ? p(r, O, "$1") : t || e
            }),
            o
        }
          , x = function(e, t) {
            var n, r = e;
            if (g(f, r) && (r = "%" + (n = f[r])[0] + "%"),
            g(y, r)) {
                var o = y[r];
                if (void 0 !== (o = o === c ? i(r) : o) || t)
                    return {
                        alias: n,
                        name: r,
                        value: o
                    };
                throw new h("intrinsic " + e + " exists, but is not available. Please file an issue!")
            }
            throw new l("intrinsic " + e + " does not exist!")
        };
        return Tt = function(e, t) {
            if ("string" != typeof e || 0 === e.length)
                throw new h("intrinsic name must be a non-empty string");
            if (1 < arguments.length && "boolean" != typeof t)
                throw new h('"allowMissing" argument must be a boolean');
            var n = A(e)
              , r = 0 < n.length ? n[0] : ""
              , o = x("%" + r + "%", t)
              , i = (o.name,
            o.value)
              , a = !1
              , o = o.alias;
            o && (r = o[0],
            m(n, b([0, 1], o)));
            for (var s = 1, c = !0; s < n.length; s += 1) {
                var u = n[s]
                  , f = w(u, 0, 1)
                  , p = w(u, -1);
                if (('"' === f || "'" === f || "`" === f || '"' === p || "'" === p || "`" === p) && f !== p)
                    throw new l("property names with quotes must have matching quotes");
                if ("constructor" !== u && c || (a = !0),
                g(y, f = "%" + (r += "." + u) + "%"))
                    i = y[f];
                else if (null != i) {
                    if (!(u in i)) {
                        if (t)
                            return;
                        throw new h("base intrinsic for " + e + " exists, but the property is not available.")
                    }
                    i = d && s + 1 >= n.length ? (c = !!(p = d(i, u))) && "get"in p && !("originalValue"in p.get) ? p.get : i[u] : (c = g(i, u),
                    i[u]),
                    c && !a && (y[f] = i)
                }
            }
            return i
        }
    }
    var Vt, Wt, Jt, $t, Gt, Ht, Kt, Qt, Yt, Zt, Xt, en, tn, nn, rn, on, an, sn, cn, un, fn = {
        exports: {}
    };
    function pn() {
        if (Jt)
            return Wt;
        Jt = 1;
        var n = qt()
          , r = function() {
            if (Vt)
                return fn.exports;
            Vt = 1;
            var e = fn
              , n = Lt()
              , t = qt()
              , r = t("%Function.prototype.apply%")
              , o = t("%Function.prototype.call%")
              , i = t("%Reflect.apply%", !0) || n.call(o, r)
              , a = t("%Object.getOwnPropertyDescriptor%", !0)
              , s = t("%Object.defineProperty%", !0)
              , c = t("%Math.max%");
            if (s)
                try {
                    s({}, "a", {
                        value: 1
                    })
                } catch (e) {
                    s = null
                }
            function u() {
                return i(n, r, arguments)
            }
            return e.exports = function(e) {
                var t = i(n, o, arguments);
                return a && s && a(t, "length").configurable && s(t, "length", {
                    value: 1 + c(0, e.length - (arguments.length - 1))
                }),
                t
            }
            ,
            s ? s(e.exports, "apply", {
                value: u
            }) : e.exports.apply = u,
            fn.exports
        }()
          , o = r(n("String.prototype.indexOf"));
        return Wt = function(e, t) {
            t = n(e, !!t);
            return "function" == typeof t && -1 < o(e, ".prototype.") ? r(t) : t
        }
    }
    function ln() {
        if (Gt)
            return $t;
        Gt = 1;
        function t(e) {
            return !(n && e && "object" == typeof e && Symbol.toStringTag in e) && "[object Arguments]" === r(e)
        }
        function e(e) {
            return !!t(e) || null !== e && "object" == typeof e && "number" == typeof e.length && 0 <= e.length && "[object Array]" !== r(e) && "[object Function]" === r(e.callee)
        }
        var n = zt()()
          , r = pn()("Object.prototype.toString")
          , o = function() {
            return t(arguments)
        }();
        return t.isLegacyArguments = e,
        $t = o ? t : e
    }
    function hn() {
        if (Yt)
            return Qt;
        Yt = 1;
        var a = Object.prototype.hasOwnProperty
          , s = Object.prototype.toString;
        return Qt = function(e, t, n) {
            if ("[object Function]" !== s.call(t))
                throw new TypeError("iterator must be a function");
            var r = e.length;
            if (r === +r)
                for (var o = 0; o < r; o++)
                    t.call(n, e[o], o, e);
            else
                for (var i in e)
                    a.call(e, i) && t.call(n, e[i], i, e)
        }
    }
    function dn() {
        if (Xt)
            return Zt;
        Xt = 1;
        var n = ["BigInt64Array", "BigUint64Array", "Float32Array", "Float64Array", "Int16Array", "Int32Array", "Int8Array", "Uint16Array", "Uint32Array", "Uint8Array", "Uint8ClampedArray"]
          , r = "undefined" == typeof globalThis ? V : globalThis;
        return Zt = function() {
            for (var e = [], t = 0; t < n.length; t++)
                "function" == typeof r[n[t]] && (e[e.length] = n[t]);
            return e
        }
    }
    function yn() {
        if (tn)
            return en;
        tn = 1;
        var t = qt()("%Object.getOwnPropertyDescriptor%", !0);
        if (t)
            try {
                t([], "length")
            } catch (e) {
                t = null
            }
        return en = t
    }
    function gn() {
        if (rn)
            return nn;
        rn = 1;
        var e = hn()
          , t = dn()
          , n = pn()
          , r = n("Object.prototype.toString")
          , o = zt()()
          , i = "undefined" == typeof globalThis ? V : globalThis
          , a = t()
          , s = n("Array.prototype.indexOf", !0) || function(e, t) {
            for (var n = 0; n < e.length; n += 1)
                if (e[n] === t)
                    return n;
            return -1
        }
          , c = n("String.prototype.slice")
          , u = {}
          , f = yn()
          , p = Object.getPrototypeOf
          , l = (o && f && p && e(a, function(e) {
            var t, n = new i[e];
            Symbol.toStringTag in n && (n = p(n),
            (t = f(n, Symbol.toStringTag)) || (n = p(n),
            t = f(n, Symbol.toStringTag)),
            u[e] = t.get)
        }),
        function(n) {
            var r = !1;
            return e(u, function(e, t) {
                if (!r)
                    try {
                        r = e.call(n) === t
                    } catch (e) {}
            }),
            r
        }
        );
        return nn = function(e) {
            return !(!e || "object" != typeof e) && (o && Symbol.toStringTag in e ? !!f && l(e) : (e = c(r(e), 8, -1),
            -1 < s(a, e)))
        }
    }
    function bn() {
        return sn || (sn = 1,
        b = Rt,
        m = ln(),
        w = function() {
            if (Kt)
                return Ht;
            Kt = 1;
            var n, r = Object.prototype.toString, o = Function.prototype.toString, i = /^\s*(?:function)?\*/, a = zt()(), s = Object.getPrototypeOf, c = function() {
                if (!a)
                    return !1;
                try {
                    return Function("return function*() {}")()
                } catch (e) {}
            };
            return Ht = function(e) {
                return "function" == typeof e && (!!i.test(o.call(e)) || (a ? !!s && (void 0 === n && (t = c(),
                n = !!t && s(t)),
                s(e) === n) : "[object GeneratorFunction]" === r.call(e)));
                var t
            }
        }(),
        v = function() {
            if (an)
                return on;
            an = 1;
            var e = hn()
              , t = dn()
              , n = pn()
              , r = n("Object.prototype.toString")
              , o = zt()()
              , i = "undefined" == typeof globalThis ? V : globalThis
              , t = t()
              , a = n("String.prototype.slice")
              , s = {}
              , c = yn()
              , u = Object.getPrototypeOf
              , f = (o && c && u && e(t, function(e) {
                var t, n;
                "function" == typeof i[e] && (t = new i[e],
                Symbol.toStringTag in t && (t = u(t),
                (n = c(t, Symbol.toStringTag)) || (t = u(t),
                n = c(t, Symbol.toStringTag)),
                s[e] = n.get))
            }),
            function(r) {
                var o = !1;
                return e(s, function(e, t) {
                    if (!o)
                        try {
                            var n = e.call(r);
                            n === t && (o = n)
                        } catch (e) {}
                }),
                o
            }
            )
              , p = gn();
            return on = function(e) {
                return !!p(e) && (o && Symbol.toStringTag in e ? f(e) : a(r(e), 8, -1))
            }
        }(),
        O = gn(),
        S = "undefined" != typeof BigInt,
        E = "undefined" != typeof Symbol,
        j = e(Object.prototype.toString),
        P = e(Number.prototype.valueOf),
        I = e(String.prototype.valueOf),
        M = e(Boolean.prototype.valueOf),
        S && (A = e(BigInt.prototype.valueOf)),
        E && (x = e(Symbol.prototype.valueOf)),
        b.isArgumentsObject = m,
        b.isGeneratorFunction = w,
        b.isTypedArray = O,
        b.isPromise = function(e) {
            return "undefined" != typeof Promise && e instanceof Promise || null !== e && "object" == typeof e && "function" == typeof e.then && "function" == typeof e.catch
        }
        ,
        b.isArrayBufferView = function(e) {
            return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : O(e) || u(e)
        }
        ,
        b.isUint8Array = function(e) {
            return "Uint8Array" === v(e)
        }
        ,
        b.isUint8ClampedArray = function(e) {
            return "Uint8ClampedArray" === v(e)
        }
        ,
        b.isUint16Array = function(e) {
            return "Uint16Array" === v(e)
        }
        ,
        b.isUint32Array = function(e) {
            return "Uint32Array" === v(e)
        }
        ,
        b.isInt8Array = function(e) {
            return "Int8Array" === v(e)
        }
        ,
        b.isInt16Array = function(e) {
            return "Int16Array" === v(e)
        }
        ,
        b.isInt32Array = function(e) {
            return "Int32Array" === v(e)
        }
        ,
        b.isFloat32Array = function(e) {
            return "Float32Array" === v(e)
        }
        ,
        b.isFloat64Array = function(e) {
            return "Float64Array" === v(e)
        }
        ,
        b.isBigInt64Array = function(e) {
            return "BigInt64Array" === v(e)
        }
        ,
        b.isBigUint64Array = function(e) {
            return "BigUint64Array" === v(e)
        }
        ,
        n.working = "undefined" != typeof Map && n(new Map),
        b.isMap = function(e) {
            return "undefined" != typeof Map && (n.working ? n(e) : e instanceof Map)
        }
        ,
        r.working = "undefined" != typeof Set && r(new Set),
        b.isSet = function(e) {
            return "undefined" != typeof Set && (r.working ? r(e) : e instanceof Set)
        }
        ,
        o.working = "undefined" != typeof WeakMap && o(new WeakMap),
        b.isWeakMap = function(e) {
            return "undefined" != typeof WeakMap && (o.working ? o(e) : e instanceof WeakMap)
        }
        ,
        i.working = "undefined" != typeof WeakSet && i(new WeakSet),
        b.isWeakSet = i,
        a.working = "undefined" != typeof ArrayBuffer && a(new ArrayBuffer),
        b.isArrayBuffer = s,
        c.working = "undefined" != typeof ArrayBuffer && "undefined" != typeof DataView && c(new DataView(new ArrayBuffer(1),0,1)),
        b.isDataView = u,
        N = "undefined" != typeof SharedArrayBuffer ? SharedArrayBuffer : void 0,
        b.isSharedArrayBuffer = p,
        b.isAsyncFunction = function(e) {
            return "[object AsyncFunction]" === j(e)
        }
        ,
        b.isMapIterator = function(e) {
            return "[object Map Iterator]" === j(e)
        }
        ,
        b.isSetIterator = function(e) {
            return "[object Set Iterator]" === j(e)
        }
        ,
        b.isGeneratorObject = function(e) {
            return "[object Generator]" === j(e)
        }
        ,
        b.isWebAssemblyCompiledModule = function(e) {
            return "[object WebAssembly.Module]" === j(e)
        }
        ,
        b.isNumberObject = l,
        b.isStringObject = h,
        b.isBooleanObject = d,
        b.isBigIntObject = y,
        b.isSymbolObject = g,
        b.isBoxedPrimitive = function(e) {
            return l(e) || h(e) || d(e) || y(e) || g(e)
        }
        ,
        b.isAnyArrayBuffer = function(e) {
            return "undefined" != typeof Uint8Array && (s(e) || p(e))
        }
        ,
        ["isProxy", "isExternal", "isModuleNamespaceObject"].forEach(function(e) {
            Object.defineProperty(b, e, {
                enumerable: !1,
                value: function() {
                    throw new Error(e + " is not supported in userland")
                }
            })
        })),
        Rt;
        function e(e) {
            return e.call.bind(e)
        }
        function t(e, t) {
            if ("object" != typeof e)
                return !1;
            try {
                return t(e),
                !0
            } catch (e) {
                return !1
            }
        }
        function n(e) {
            return "[object Map]" === j(e)
        }
        function r(e) {
            return "[object Set]" === j(e)
        }
        function o(e) {
            return "[object WeakMap]" === j(e)
        }
        function i(e) {
            return "[object WeakSet]" === j(e)
        }
        function a(e) {
            return "[object ArrayBuffer]" === j(e)
        }
        function s(e) {
            return "undefined" != typeof ArrayBuffer && (a.working ? a(e) : e instanceof ArrayBuffer)
        }
        function c(e) {
            return "[object DataView]" === j(e)
        }
        function u(e) {
            return "undefined" != typeof DataView && (c.working ? c(e) : e instanceof DataView)
        }
        function f(e) {
            return "[object SharedArrayBuffer]" === j(e)
        }
        function p(e) {
            return void 0 !== N && ((f.working = void 0 === f.working ? f(new N) : f.working) ? f(e) : e instanceof N)
        }
        function l(e) {
            return t(e, P)
        }
        function h(e) {
            return t(e, I)
        }
        function d(e) {
            return t(e, M)
        }
        function y(e) {
            return S && t(e, A)
        }
        function g(e) {
            return E && t(e, x)
        }
        var b, m, w, v, O, A, x, S, E, j, P, I, M, N
    }
    var mn, wn, vn, On = {
        exports: {}
    }, An = {
        exports: {}
    };
    function xn() {
        if (wn)
            return On.exports;
        wn = 1;
        var t = On;
        try {
            var e = Sn();
            if ("function" != typeof e.inherits)
                throw "";
            t.exports = e.inherits
        } catch (e) {
            t.exports = (mn || (mn = 1,
            "function" == typeof Object.create ? An.exports = function(e, t) {
                t && (e.super_ = t,
                e.prototype = Object.create(t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }))
            }
            : An.exports = function(e, t) {
                var n;
                t && (e.super_ = t,
                (n = function() {}
                ).prototype = t.prototype,
                e.prototype = new n,
                e.prototype.constructor = e)
            }
            ),
            An.exports)
        }
        return On.exports
    }
    function Sn() {
        return vn || (vn = 1,
        S = Ct,
        a = Object.getOwnPropertyDescriptors || function(e) {
            for (var t = Object.keys(e), n = {}, r = 0; r < t.length; r++)
                n[t[r]] = Object.getOwnPropertyDescriptor(e, t[r]);
            return n
        }
        ,
        u = /%[sdj%]/g,
        S.format = function(e) {
            if (!b(e)) {
                for (var t = [], n = 0; n < arguments.length; n++)
                    t.push(s(arguments[n]));
                return t.join(" ")
            }
            for (var n = 1, r = arguments, o = r.length, i = String(e).replace(u, function(e) {
                if ("%%" === e)
                    return "%";
                if (o <= n)
                    return e;
                switch (e) {
                case "%s":
                    return String(r[n++]);
                case "%d":
                    return Number(r[n++]);
                case "%j":
                    try {
                        return JSON.stringify(r[n++])
                    } catch (e) {
                        return "[Circular]"
                    }
                default:
                    return e
                }
            }), a = r[n]; n < o; a = r[++n])
                y(a) || !c(a) ? i += " " + a : i += " " + s(a);
            return i
        }
        ,
        S.deprecate = function(e, t) {
            if ("undefined" != typeof process && !0 === process.noDeprecation)
                return e;
            if ("undefined" == typeof process)
                return function() {
                    return S.deprecate(e, t).apply(this, arguments)
                }
                ;
            var n = !1;
            return function() {
                if (!n) {
                    if (process.throwDeprecation)
                        throw new Error(t);
                    process.traceDeprecation ? console.trace(t) : console.error(t),
                    n = !0
                }
                return e.apply(this, arguments)
            }
        }
        ,
        i = {},
        E = /^$/,
        process.env.NODE_DEBUG && (e = (e = process.env.NODE_DEBUG).replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase(),
        E = new RegExp("^" + e + "$","i")),
        S.debuglog = function(t) {
            var n;
            return t = t.toUpperCase(),
            i[t] || (E.test(t) ? (n = process.pid,
            i[t] = function() {
                var e = S.format.apply(S, arguments);
                console.error("%s %d: %s", t, n, e)
            }
            ) : i[t] = function() {}
            ),
            i[t]
        }
        ,
        (S.inspect = s).colors = {
            bold: [1, 22],
            italic: [3, 23],
            underline: [4, 24],
            inverse: [7, 27],
            white: [37, 39],
            grey: [90, 39],
            black: [30, 39],
            blue: [34, 39],
            cyan: [36, 39],
            green: [32, 39],
            magenta: [35, 39],
            red: [31, 39],
            yellow: [33, 39]
        },
        s.styles = {
            special: "cyan",
            number: "yellow",
            boolean: "yellow",
            undefined: "grey",
            null: "bold",
            string: "green",
            date: "magenta",
            regexp: "red"
        },
        S.types = bn(),
        S.isArray = h,
        S.isBoolean = d,
        S.isNull = y,
        S.isNullOrUndefined = function(e) {
            return null == e
        }
        ,
        S.isNumber = g,
        S.isString = b,
        S.isSymbol = function(e) {
            return "symbol" == typeof e
        }
        ,
        S.isUndefined = m,
        S.isRegExp = w,
        S.types.isRegExp = w,
        S.isObject = c,
        S.isDate = v,
        S.types.isDate = v,
        S.isError = O,
        S.types.isNativeError = O,
        S.isFunction = A,
        S.isPrimitive = function(e) {
            return null === e || "boolean" == typeof e || "number" == typeof e || "string" == typeof e || "symbol" == typeof e || void 0 === e
        }
        ,
        S.isBuffer = un ? cn : (un = 1,
        cn = function(e) {
            return e instanceof I.Buffer
        }
        ),
        j = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        S.log = function() {
            var e, t;
            console.log("%s - %s", (e = new Date,
            t = [n(e.getHours()), n(e.getMinutes()), n(e.getSeconds())].join(":"),
            [e.getDate(), j[e.getMonth()], t].join(" ")), S.format.apply(S, arguments))
        }
        ,
        S.inherits = xn(),
        S._extend = function(e, t) {
            if (!t || !c(t))
                return e;
            for (var n = Object.keys(t), r = n.length; r--; )
                e[n[r]] = t[n[r]];
            return e
        }
        ,
        P = "undefined" != typeof Symbol ? Symbol("util.promisify.custom") : void 0,
        S.promisify = function(i) {
            if ("function" != typeof i)
                throw new TypeError('The "original" argument must be of type Function');
            if (P && i[P]) {
                var e;
                if ("function" != typeof (e = i[P]))
                    throw new TypeError('The "util.promisify.custom" argument must be of type Function');
                return Object.defineProperty(e, P, {
                    value: e,
                    enumerable: !1,
                    writable: !1,
                    configurable: !0
                }),
                e
            }
            function e() {
                for (var n, r, e = new Promise(function(e, t) {
                    n = e,
                    r = t
                }
                ), t = [], o = 0; o < arguments.length; o++)
                    t.push(arguments[o]);
                t.push(function(e, t) {
                    e ? r(e) : n(t)
                });
                try {
                    i.apply(this, t)
                } catch (e) {
                    r(e)
                }
                return e
            }
            return Object.setPrototypeOf(e, Object.getPrototypeOf(i)),
            P && Object.defineProperty(e, P, {
                value: e,
                enumerable: !1,
                writable: !1,
                configurable: !0
            }),
            Object.defineProperties(e, a(i))
        }
        ,
        S.promisify.custom = P,
        S.callbackify = function(i) {
            if ("function" != typeof i)
                throw new TypeError('The "original" argument must be of type Function');
            function e() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e.push(arguments[t]);
                var n = e.pop();
                if ("function" != typeof n)
                    throw new TypeError("The last argument must be of type Function");
                function r() {
                    return n.apply(o, arguments)
                }
                var o = this;
                i.apply(this, e).then(function(e) {
                    process.nextTick(r.bind(null, null, e))
                }, function(e) {
                    process.nextTick(function(e, t) {
                        var n;
                        return e || ((n = new Error("Promise was rejected with a falsy value")).reason = e,
                        e = n),
                        t(e)
                    }
                    .bind(null, e, r))
                })
            }
            return Object.setPrototypeOf(e, Object.getPrototypeOf(i)),
            Object.defineProperties(e, a(i)),
            e
        }
        ),
        Ct;
        function s(e, t) {
            var n = {
                seen: [],
                stylize: o
            };
            return 3 <= arguments.length && (n.depth = arguments[2]),
            4 <= arguments.length && (n.colors = arguments[3]),
            d(t) ? n.showHidden = t : t && S._extend(n, t),
            m(n.showHidden) && (n.showHidden = !1),
            m(n.depth) && (n.depth = 2),
            m(n.colors) && (n.colors = !1),
            m(n.customInspect) && (n.customInspect = !0),
            n.colors && (n.stylize = r),
            f(n, e, n.depth)
        }
        function r(e, t) {
            t = s.styles[t];
            return t ? "[" + s.colors[t][0] + "m" + e + "[" + s.colors[t][1] + "m" : e
        }
        function o(e, t) {
            return e
        }
        function f(t, n, r) {
            if (t.customInspect && n && A(n.inspect) && n.inspect !== S.inspect && (!n.constructor || n.constructor.prototype !== n))
                return b(e = n.inspect(r, t)) ? e : f(t, e, r);
            var e = function(e, t) {
                if (m(t))
                    return e.stylize("undefined", "undefined");
                {
                    var n;
                    if (b(t))
                        return n = "'" + JSON.stringify(t).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'",
                        e.stylize(n, "string")
                }
                return g(t) ? e.stylize("" + t, "number") : d(t) ? e.stylize("" + t, "boolean") : y(t) ? e.stylize("null", "null") : void 0
            }(t, n);
            if (e)
                return e;
            var o, e = Object.keys(n), i = (o = {},
            e.forEach(function(e, t) {
                o[e] = !0
            }),
            o);
            if (t.showHidden && (e = Object.getOwnPropertyNames(n)),
            O(n) && (0 <= e.indexOf("message") || 0 <= e.indexOf("description")))
                return p(n);
            if (0 === e.length) {
                if (A(n))
                    return a = n.name ? ": " + n.name : "",
                    t.stylize("[Function" + a + "]", "special");
                if (w(n))
                    return t.stylize(RegExp.prototype.toString.call(n), "regexp");
                if (v(n))
                    return t.stylize(Date.prototype.toString.call(n), "date");
                if (O(n))
                    return p(n)
            }
            var a = ""
              , s = !1
              , c = ["{", "}"];
            if (h(n) && (s = !0,
            c = ["[", "]"]),
            A(n) && (a = " [Function" + (n.name ? ": " + n.name : "") + "]"),
            w(n) && (a = " " + RegExp.prototype.toString.call(n)),
            v(n) && (a = " " + Date.prototype.toUTCString.call(n)),
            O(n) && (a = " " + p(n)),
            0 === e.length && (!s || 0 == n.length))
                return c[0] + a + c[1];
            if (r < 0)
                return w(n) ? t.stylize(RegExp.prototype.toString.call(n), "regexp") : t.stylize("[Object]", "special");
            t.seen.push(n),
            u = s ? function(t, n, r, o, e) {
                for (var i = [], a = 0, s = n.length; a < s; ++a)
                    x(n, String(a)) ? i.push(l(t, n, r, o, String(a), !0)) : i.push("");
                return e.forEach(function(e) {
                    e.match(/^\d+$/) || i.push(l(t, n, r, o, e, !0))
                }),
                i
            }(t, n, r, i, e) : e.map(function(e) {
                return l(t, n, r, i, e, s)
            }),
            t.seen.pop();
            var u;
            return 60 < u.reduce(function(e, t) {
                return t.indexOf("\n"),
                e + t.replace(/\u001b\[\d\d?m/g, "").length + 1
            }, 0) ? c[0] + ("" === a ? "" : a + "\n ") + " " + u.join(",\n  ") + " " + c[1] : c[0] + a + " " + u.join(", ") + " " + c[1]
        }
        function p(e) {
            return "[" + Error.prototype.toString.call(e) + "]"
        }
        function l(e, t, n, r, o, i) {
            var a, s, t = Object.getOwnPropertyDescriptor(t, o) || {
                value: t[o]
            };
            if (t.get ? s = t.set ? e.stylize("[Getter/Setter]", "special") : e.stylize("[Getter]", "special") : t.set && (s = e.stylize("[Setter]", "special")),
            x(r, o) || (a = "[" + o + "]"),
            s || (e.seen.indexOf(t.value) < 0 ? -1 < (s = y(n) ? f(e, t.value, null) : f(e, t.value, n - 1)).indexOf("\n") && (s = i ? s.split("\n").map(function(e) {
                return "  " + e
            }).join("\n").substr(2) : "\n" + s.split("\n").map(function(e) {
                return "   " + e
            }).join("\n")) : s = e.stylize("[Circular]", "special")),
            m(a)) {
                if (i && o.match(/^\d+$/))
                    return s;
                a = (a = JSON.stringify("" + o)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (a = a.substr(1, a.length - 2),
                e.stylize(a, "name")) : (a = a.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"),
                e.stylize(a, "string"))
            }
            return a + ": " + s
        }
        function h(e) {
            return Array.isArray(e)
        }
        function d(e) {
            return "boolean" == typeof e
        }
        function y(e) {
            return null === e
        }
        function g(e) {
            return "number" == typeof e
        }
        function b(e) {
            return "string" == typeof e
        }
        function m(e) {
            return void 0 === e
        }
        function w(e) {
            return c(e) && "[object RegExp]" === t(e)
        }
        function c(e) {
            return "object" == typeof e && null !== e
        }
        function v(e) {
            return c(e) && "[object Date]" === t(e)
        }
        function O(e) {
            return c(e) && ("[object Error]" === t(e) || e instanceof Error)
        }
        function A(e) {
            return "function" == typeof e
        }
        function t(e) {
            return Object.prototype.toString.call(e)
        }
        function n(e) {
            return e < 10 ? "0" + e.toString(10) : e.toString(10)
        }
        function x(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }
        var S, e, a, u, i, E, j, P
    }
    var g = e.exports;
    function En(e) {
        return (En = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        }
        : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }
        )(e)
    }
    function jn(e, t) {
        return Pn(e) || In(e, t) || Mn(e, t) || kn()
    }
    function Pn(e) {
        if (Array.isArray(e))
            return e
    }
    function In(e, t) {
        if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) {
            var n = []
              , r = !0
              , o = !1
              , i = void 0;
            try {
                for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done) && (n.push(a.value),
                !t || n.length !== t); r = !0)
                    ;
            } catch (e) {
                o = !0,
                i = e
            } finally {
                try {
                    r || null == s.return || s.return()
                } finally {
                    if (o)
                        throw i
                }
            }
            return n
        }
    }
    function Mn(e, t) {
        if (e) {
            if ("string" == typeof e)
                return Nn(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            return "Map" === (n = "Object" === n && e.constructor ? e.constructor.name : n) || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Nn(e, t) : void 0
        }
    }
    function Nn(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++)
            r[n] = e[n];
        return r
    }
    function kn() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
    }
    var Bn = {
        bold: ["1", "22"],
        dim: ["2", "22"],
        italic: ["3", "23"],
        underline: ["4", "24"],
        inverse: ["7", "27"],
        hidden: ["8", "28"],
        strike: ["9", "29"],
        black: ["30", "39"],
        red: ["31", "39"],
        green: ["32", "39"],
        yellow: ["33", "39"],
        blue: ["34", "39"],
        magenta: ["35", "39"],
        cyan: ["36", "39"],
        white: ["37", "39"],
        brightblack: ["30;1", "39"],
        brightred: ["31;1", "39"],
        brightgreen: ["32;1", "39"],
        brightyellow: ["33;1", "39"],
        brightblue: ["34;1", "39"],
        brightmagenta: ["35;1", "39"],
        brightcyan: ["36;1", "39"],
        brightwhite: ["37;1", "39"],
        grey: ["90", "39"]
    }
      , _n = {
        special: "cyan",
        number: "yellow",
        bigint: "yellow",
        boolean: "yellow",
        undefined: "grey",
        null: "bold",
        string: "green",
        symbol: "green",
        date: "magenta",
        regexp: "red"
    }
      , b = "…";
    function Tn(e, t) {
        t = Bn[_n[t]] || Bn[t];
        return t ? "[".concat(t[0], "m").concat(String(e), "[").concat(t[1], "m") : String(e)
    }
    function Un(e) {
        var e = 0 < arguments.length && void 0 !== e ? e : {}
          , t = e.showHidden
          , n = e.depth
          , n = void 0 === n ? 2 : n
          , r = e.colors
          , r = void 0 !== r && r
          , o = e.customInspect
          , o = void 0 === o || o
          , i = e.showProxy
          , i = void 0 !== i && i
          , a = e.maxArrayLength
          , a = void 0 === a ? 1 / 0 : a
          , s = e.breakLength
          , s = void 0 === s ? 1 / 0 : s
          , c = e.seen
          , c = void 0 === c ? [] : c
          , u = e.truncate
          , u = void 0 === u ? 1 / 0 : u
          , e = e.stylize
          , e = void 0 === e ? String : e
          , t = {
            showHidden: Boolean(void 0 !== t && t),
            depth: Number(n),
            colors: Boolean(r),
            customInspect: Boolean(o),
            showProxy: Boolean(i),
            maxArrayLength: Number(a),
            breakLength: Number(s),
            truncate: Number(u),
            seen: c,
            stylize: e
        };
        return t.colors && (t.stylize = Tn),
        t
    }
    function m(e, t, n) {
        var n = 2 < arguments.length && void 0 !== n ? n : b
          , r = (e = String(e),
        n.length)
          , o = e.length;
        return t < r && r < o ? n : t < o && r < o ? "".concat(e.slice(0, t - r)).concat(n) : e
    }
    function w(e, t, n, r) {
        var o = 3 < arguments.length && void 0 !== r ? r : ", "
          , i = (n = n || t.inspect,
        e.length);
        if (0 === i)
            return "";
        for (var a = t.truncate, s = "", c = "", u = "", f = 0; f < i; f += 1) {
            var p = f + 1 === e.length
              , l = f + 2 === e.length
              , u = "".concat(b, "(").concat(e.length - f, ")")
              , h = e[f]
              , h = (t.truncate = a - s.length - (p ? 0 : o.length),
            c || n(h, t) + (p ? "" : o))
              , d = s.length + h.length
              , y = d + u.length;
            if (p && a < d && s.length + u.length <= a)
                break;
            if (!p && !l && a < y)
                break;
            if (c = p ? "" : n(e[f + 1], t) + (l ? "" : o),
            !p && l && a < y && d + c.length > a)
                break;
            if (s += h,
            !p && !l && d + c.length >= a) {
                u = "".concat(b, "(").concat(e.length - f - 1, ")");
                break
            }
            u = ""
        }
        return "".concat(s).concat(u)
    }
    function Dn(e) {
        return e.match(/^[a-zA-Z_][a-zA-Z_0-9]*$/) ? e : JSON.stringify(e).replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'")
    }
    function Cn(e, t) {
        var e = jn(e, 2)
          , n = e[0]
          , e = e[1];
        return t.truncate -= 2,
        "string" == typeof n ? n = Dn(n) : "number" != typeof n && (n = "[".concat(t.inspect(n, t), "]")),
        t.truncate -= n.length,
        e = t.inspect(e, t),
        "".concat(n, ": ").concat(e)
    }
    function Rn(t, e) {
        var n = Object.keys(t).slice(t.length);
        if (!t.length && !n.length)
            return "[]";
        e.truncate -= 4;
        var r = w(t, e)
          , o = (e.truncate -= r.length,
        "");
        return n.length && (o = w(n.map(function(e) {
            return [e, t[e]]
        }), e, Cn)),
        "[ ".concat(r).concat(o ? ", ".concat(o) : "", " ]")
    }
    var Fn = Function.prototype.toString
      , zn = /\s*function(?:\s|\s*\/\*[^(?:*\/)]+\*\/\s*)*([^\s\(\/]+)/;
    function Ln(e) {
        if ("function" != typeof e)
            return null;
        var t, n = "";
        return void 0 === Function.prototype.name && void 0 === e.name ? (t = Fn.call(e).match(zn)) && (n = t[1]) : n = e.name,
        n
    }
    function qn(e) {
        return "function" == typeof I.Buffer && e instanceof I.Buffer ? "Buffer" : e[Symbol.toStringTag] || Vn(e.constructor)
    }
    var Vn = Ln;
    function v(t, e) {
        var n = qn(t)
          , r = (e.truncate -= n.length + 4,
        Object.keys(t).slice(t.length));
        if (!t.length && !r.length)
            return "".concat(n, "[]");
        for (var o = "", i = 0; i < t.length; i++) {
            var a = "".concat(e.stylize(m(t[i], e.truncate), "number")).concat(i === t.length - 1 ? "" : ", ");
            if (e.truncate -= a.length,
            t[i] !== t.length && e.truncate <= 3) {
                o += "".concat(b, "(").concat(t.length - t[i] + 1, ")");
                break
            }
            o += a
        }
        var s = "";
        return r.length && (s = w(r.map(function(e) {
            return [e, t[e]]
        }), e, Cn)),
        "".concat(n, "[ ").concat(o).concat(s ? ", ".concat(s) : "", " ]")
    }
    function Wn(e, t) {
        var e = e.toJSON().split("T")
          , n = e[0];
        return t.stylize("".concat(n, "T").concat(m(e[1], t.truncate - n.length - 1)), "date")
    }
    function Jn(e, t) {
        e = Vn(e);
        return e ? t.stylize("[Function ".concat(m(e, t.truncate - 11), "]"), "special") : t.stylize("[Function]", "special")
    }
    function $n(e, t) {
        var e = jn(e, 2)
          , n = e[0]
          , e = e[1];
        return t.truncate -= 4,
        n = t.inspect(n, t),
        t.truncate -= n.length,
        e = t.inspect(e, t),
        "".concat(n, " => ").concat(e)
    }
    function Gn(e) {
        var n = [];
        return e.forEach(function(e, t) {
            n.push([t, e])
        }),
        n
    }
    function Hn(e, t) {
        return e.size - 1 <= 0 ? "Map{}" : (t.truncate -= 7,
        "Map{ ".concat(w(Gn(e), t, $n), " }"))
    }
    var Kn = Number.isNaN || function(e) {
        return e != e
    }
    ;
    function Qn(e, t) {
        return Kn(e) ? t.stylize("NaN", "number") : e === 1 / 0 ? t.stylize("Infinity", "number") : e === -1 / 0 ? t.stylize("-Infinity", "number") : 0 === e ? t.stylize(1 / e == 1 / 0 ? "+0" : "-0", "number") : t.stylize(m(e, t.truncate), "number")
    }
    function Yn(e, t) {
        e = m(e.toString(), t.truncate - 1);
        return e !== b && (e += "n"),
        t.stylize(e, "bigint")
    }
    function Zn(e, t) {
        var n = e.toString().split("/")[2]
          , r = t.truncate - (2 + n.length)
          , e = e.source;
        return t.stylize("/".concat(m(e, r), "/").concat(n), "regexp")
    }
    function Xn(e) {
        var t = [];
        return e.forEach(function(e) {
            t.push(e)
        }),
        t
    }
    function er(e, t) {
        return 0 === e.size ? "Set{}" : (t.truncate -= 7,
        "Set{ ".concat(w(Xn(e), t), " }"))
    }
    var tr = new RegExp("['\\u0000-\\u001f\\u007f-\\u009f\\u00ad\\u0600-\\u0604\\u070f\\u17b4\\u17b5\\u200c-\\u200f\\u2028-\\u202f\\u2060-\\u206f\\ufeff\\ufff0-\\uffff]","g")
      , nr = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        "'": "\\'",
        "\\": "\\\\"
    }
      , rr = 16
      , or = 4;
    function ir(e) {
        return nr[e] || "\\u".concat("0000".concat(e.charCodeAt(0).toString(rr)).slice(-or))
    }
    function ar(e, t) {
        return tr.test(e) && (e = e.replace(tr, ir)),
        t.stylize("'".concat(m(e, t.truncate - 2), "'"), "string")
    }
    function sr(e) {
        return "description"in Symbol.prototype ? e.description ? "Symbol(".concat(e.description, ")") : "Symbol()" : e.toString()
    }
    var O = function() {
        return "Promise{…}"
    };
    try {
        var A = process.binding("util")
          , cr = A.getPromiseDetails
          , ur = A.kPending
          , fr = A.kRejected;
        Array.isArray(cr(Promise.resolve())) && (O = function(e, t) {
            var e = jn(cr(e), 2)
              , n = e[0]
              , e = e[1];
            return n === ur ? "Promise{<pending>}" : "Promise".concat(n === fr ? "!" : "", "{").concat(t.inspect(e, t), "}")
        }
        )
    } catch (e) {}
    function pr(t, e) {
        var n = Object.getOwnPropertyNames(t)
          , r = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(t) : [];
        if (0 === n.length && 0 === r.length)
            return "{}";
        if (e.truncate -= 4,
        e.seen = e.seen || [],
        0 <= e.seen.indexOf(t))
            return "[Circular]";
        e.seen.push(t);
        n = w(n.map(function(e) {
            return [e, t[e]]
        }), e, Cn),
        r = w(r.map(function(e) {
            return [e, t[e]]
        }), e, Cn),
        e.seen.pop(),
        e = "";
        return n && r && (e = ", "),
        "{ ".concat(n).concat(e).concat(r, " }")
    }
    A = O;
    var lr = !("undefined" == typeof Symbol || !Symbol.toStringTag) && Symbol.toStringTag;
    function hr(e, t) {
        var n = ""
          , n = (n = lr && lr in e ? e[lr] : n) || Vn(e.constructor);
        return t.truncate -= (n = n && "_class" !== n ? n : "<Anonymous Class>").length,
        "".concat(n).concat(pr(e, t))
    }
    function dr(e, t) {
        return 0 === e.length ? "Arguments[]" : (t.truncate -= 13,
        "Arguments[ ".concat(w(e, t), " ]"))
    }
    var yr = ["stack", "line", "column", "name", "message", "fileName", "lineNumber", "columnNumber", "number", "description"];
    function gr(t, e) {
        var n = Object.getOwnPropertyNames(t).filter(function(e) {
            return -1 === yr.indexOf(e)
        })
          , r = t.name
          , o = (e.truncate -= r.length,
        "")
          , n = ("string" == typeof t.message ? o = m(t.message, e.truncate) : n.unshift("message"),
        o = o ? ": ".concat(o) : "",
        e.truncate -= o.length + 5,
        w(n.map(function(e) {
            return [e, t[e]]
        }), e, Cn));
        return "".concat(r).concat(o).concat(n ? " { ".concat(n, " }") : "")
    }
    function br(e, t) {
        var e = jn(e, 2)
          , n = e[0]
          , e = e[1];
        return t.truncate -= 3,
        e ? "".concat(t.stylize(n, "yellow"), "=").concat(t.stylize('"'.concat(e, '"'), "string")) : "".concat(t.stylize(n, "yellow"))
    }
    function mr(e, t) {
        return w(e, t, wr, "\n")
    }
    function wr(t, e) {
        var n = t.getAttributeNames()
          , r = t.tagName.toLowerCase()
          , o = e.stylize("<".concat(r), "special")
          , i = e.stylize(">", "special")
          , a = e.stylize("</".concat(r, ">"), "special")
          , r = (e.truncate -= 2 * r.length + 5,
        "")
          , n = (0 < n.length && (r = (r += " ") + w(n.map(function(e) {
            return [e, t.getAttribute(e)]
        }), e, br, " ")),
        e.truncate -= r.length,
        e.truncate)
          , e = mr(t.children, e);
        return e && e.length > n && (e = "".concat(b, "(").concat(t.children.length, ")")),
        "".concat(o).concat(r).concat(i).concat(e).concat(a)
    }
    var vr = "function" == typeof Symbol && "function" == typeof Symbol.for ? Symbol.for("chai/inspect") : "@@chai/inspect"
      , x = !1;
    try {
        var Or = Sn();
        x = !!Or.inspect && Or.inspect.custom
    } catch (e) {
        x = !1
    }
    function Ar(e, t, n) {
        return vr in e && "function" == typeof e[vr] ? e[vr](t) : x && x in e && "function" == typeof e[x] ? e[x](t.depth, t) : "inspect"in e && "function" == typeof e.inspect ? e.inspect(t.depth, t) : "constructor"in e && xr.has(e.constructor) ? xr.get(e.constructor)(e, t) : Sr[n] ? Sr[n](e, t) : ""
    }
    var xr = new WeakMap
      , Sr = {}
      , Er = {
        undefined: function(e, t) {
            return t.stylize("undefined", "undefined")
        },
        null: function(e, t) {
            return t.stylize(null, "null")
        },
        boolean: function(e, t) {
            return t.stylize(e, "boolean")
        },
        Boolean: function(e, t) {
            return t.stylize(e, "boolean")
        },
        number: Qn,
        Number: Qn,
        bigint: Yn,
        BigInt: Yn,
        string: ar,
        String: ar,
        function: Jn,
        Function: Jn,
        symbol: sr,
        Symbol: sr,
        Array: Rn,
        Date: Wn,
        Map: Hn,
        Set: er,
        RegExp: Zn,
        Promise: A,
        WeakSet: function(e, t) {
            return t.stylize("WeakSet{…}", "special")
        },
        WeakMap: function(e, t) {
            return t.stylize("WeakMap{…}", "special")
        },
        Arguments: dr,
        Int8Array: v,
        Uint8Array: v,
        Uint8ClampedArray: v,
        Int16Array: v,
        Uint16Array: v,
        Int32Array: v,
        Uint32Array: v,
        Float32Array: v,
        Float64Array: v,
        Generator: function() {
            return ""
        },
        DataView: function() {
            return ""
        },
        ArrayBuffer: function() {
            return ""
        },
        Error: gr,
        HTMLCollection: mr,
        NodeList: mr
    }
      , jr = Object.prototype.toString;
    function Pr(e, t) {
        (t = Un(t)).inspect = Pr;
        var n = t.customInspect
          , r = null === e ? "null" : En(e);
        if ("object" === r && (r = jr.call(e).slice(8, -1)),
        Er[r])
            return Er[r](e, t);
        if (n && e) {
            n = Ar(e, t, r);
            if (n)
                return "string" == typeof n ? n : Pr(n, t)
        }
        n = !!e && Object.getPrototypeOf(e);
        return n === Object.prototype || null === n ? pr(e, t) : e && "function" == typeof HTMLElement && e instanceof HTMLElement ? wr(e, t) : "constructor"in e ? (e.constructor !== Object ? hr : pr)(e, t) : e === Object(e) ? pr(e, t) : t.stylize(String(e), r)
    }
    function Ir(e, t) {
        return !xr.has(e) && (xr.add(e, t),
        !0)
    }
    function Mr(e, t) {
        return !(e in Sr) && (Sr[e] = t,
        !0)
    }
    g.custom = vr,
    g.default = Pr,
    g.inspect = Pr,
    g.registerConstructor = Ir,
    g.registerStringTag = Mr,
    Object.defineProperty(g, "__esModule", {
        value: !0
    });
    var S = {
        includeStack: !1,
        showDiff: !0,
        truncateThreshold: 40,
        useProxy: !0,
        proxyExcludedKeys: ["then", "catch", "inspect", "toJSON"]
    }
      , Nr = e.exports
      , kr = S
      , Br = function(e, t, n, r) {
        r = {
            colors: r,
            depth: void 0 === n ? 2 : n,
            showHidden: t,
            truncate: kr.truncateThreshold || 1 / 0
        };
        return Nr.inspect(e, r)
    };
    var _r = Br
      , Tr = S
      , Ur = function(e) {
        var t = _r(e)
          , n = Object.prototype.toString.call(e);
        return Tr.truncateThreshold && t.length >= Tr.truncateThreshold ? "[object Function]" === n ? e.name && "" !== e.name ? "[Function: " + e.name + "]" : "[Function]" : "[object Array]" === n ? "[ Array(" + e.length + ") ]" : "[object Object]" === n ? "{ Object (" + (2 < (n = Object.keys(e)).length ? n.splice(0, 2).join(", ") + ", ..." : n.join(", ")) + ") }" : t : t
    }
      , Dr = y
      , Cr = wt
      , Rr = Ur
      , Fr = function(e, t) {
        var n = Dr(e, "negate")
          , r = Dr(e, "object")
          , o = t[3]
          , i = Cr(e, t)
          , n = n ? t[2] : t[1]
          , t = Dr(e, "message")
          , n = (n = (n = "function" == typeof n ? n() : n) || "").replace(/#\{this\}/g, function() {
            return Rr(r)
        }).replace(/#\{act\}/g, function() {
            return Rr(i)
        }).replace(/#\{exp\}/g, function() {
            return Rr(o)
        });
        return t ? t + ": " + n : n
    }
      , E = function(e, t, n) {
        var r, o = e.__flags || (e.__flags = Object.create(null));
        for (r in t.__flags || (t.__flags = Object.create(null)),
        n = 3 !== arguments.length || n,
        o)
            (n || "object" !== r && "ssfi" !== r && "lockSsfi" !== r && "message" != r) && (t.__flags[r] = o[r])
    }
      , zr = {
        exports: {}
    }
      , Lr = dt.exports;
    function qr() {
        this._key = "chai/deep-eql__" + Math.random() + Date.now()
    }
    qr.prototype = {
        get: function(e) {
            return e[this._key]
        },
        set: function(e, t) {
            Object.isExtensible(e) && Object.defineProperty(e, this._key, {
                value: t,
                configurable: !0
            })
        }
    };
    var Vr = "function" == typeof WeakMap ? WeakMap : qr;
    function Wr(e, t, n) {
        if (!n || P(e) || P(t))
            return null;
        n = n.get(e);
        if (n) {
            e = n.get(t);
            if ("boolean" == typeof e)
                return e
        }
        return null
    }
    function Jr(e, t, n, r) {
        var o;
        !n || P(e) || P(t) || ((o = n.get(e)) ? o.set(t, r) : ((o = new Vr).set(t, r),
        n.set(e, o)))
    }
    function $r(e, t, n) {
        if (n && n.comparator)
            return Hr(e, t, n);
        var r = Gr(e, t);
        return null !== r ? r : Hr(e, t, n)
    }
    function Gr(e, t) {
        return e === t ? 0 !== e || 1 / e == 1 / t : e != e && t != t || !P(e) && !P(t) && null
    }
    function Hr(e, t, n) {
        (n = n || {}).memoize = !1 !== n.memoize && (n.memoize || new Vr);
        var r = n && n.comparator
          , o = Wr(e, t, n.memoize);
        if (null !== o)
            return o;
        o = Wr(t, e, n.memoize);
        if (null !== o)
            return o;
        if (r) {
            o = r(e, t);
            if (!1 === o || !0 === o)
                return Jr(e, t, n.memoize, o),
                o;
            r = Gr(e, t);
            if (null !== r)
                return r
        }
        o = Lr(e);
        if (o !== Lr(t))
            return Jr(e, t, n.memoize, !1),
            !1;
        Jr(e, t, n.memoize, !0);
        r = function(e, t, n, r) {
            switch (n) {
            case "String":
            case "Number":
            case "Boolean":
            case "Date":
                return $r(e.valueOf(), t.valueOf());
            case "Promise":
            case "Symbol":
            case "function":
            case "WeakMap":
            case "WeakSet":
            case "Error":
                return e === t;
            case "Arguments":
            case "Int8Array":
            case "Uint8Array":
            case "Uint8ClampedArray":
            case "Int16Array":
            case "Uint16Array":
            case "Int32Array":
            case "Uint32Array":
            case "Float32Array":
            case "Float64Array":
            case "Array":
                return j(e, t, r);
            case "RegExp":
                return function(e, t) {
                    return e.toString() === t.toString()
                }(e, t);
            case "Generator":
                return function(e, t, n) {
                    return j(Yr(e), Yr(t), n)
                }(e, t, r);
            case "DataView":
                return j(new Uint8Array(e.buffer), new Uint8Array(t.buffer), r);
            case "ArrayBuffer":
                return j(new Uint8Array(e), new Uint8Array(t), r);
            case "Set":
            case "Map":
                return Kr(e, t, r);
            default:
                return function(e, t, n) {
                    var r = Zr(e)
                      , o = Zr(t);
                    if (r.length && r.length === o.length)
                        return r.sort(),
                        o.sort(),
                        !1 !== j(r, o) && function(e, t, n, r) {
                            var o = n.length;
                            if (0 === o)
                                return !0;
                            for (var i = 0; i < o; i += 1)
                                if (!1 === $r(e[n[i]], t[n[i]], r))
                                    return !1;
                            return !0
                        }(e, t, r, n);
                    e = Qr(e),
                    t = Qr(t);
                    if (e.length && e.length === t.length)
                        return e.sort(),
                        t.sort(),
                        j(e, t, n);
                    return 0 === r.length && 0 === e.length && 0 === o.length && 0 === t.length
                }(e, t, r)
            }
        }(e, t, o, n);
        return Jr(e, t, n.memoize, r),
        r
    }
    function Kr(e, t, n) {
        if (e.size !== t.size)
            return !1;
        if (0 === e.size)
            return !0;
        var r = []
          , o = [];
        return e.forEach(function(e, t) {
            r.push([e, t])
        }),
        t.forEach(function(e, t) {
            o.push([e, t])
        }),
        j(r.sort(), o.sort(), n)
    }
    function j(e, t, n) {
        var r = e.length;
        if (r !== t.length)
            return !1;
        if (0 === r)
            return !0;
        for (var o = -1; ++o < r; )
            if (!1 === $r(e[o], t[o], n))
                return !1;
        return !0
    }
    function Qr(e) {
        if (t = e,
        "undefined" != typeof Symbol && "object" == typeof t && void 0 !== Symbol.iterator && "function" == typeof t[Symbol.iterator])
            try {
                return Yr(e[Symbol.iterator]())
            } catch (e) {
                return []
            }
        var t;
        return []
    }
    function Yr(e) {
        for (var t = e.next(), n = [t.value]; !1 === t.done; )
            t = e.next(),
            n.push(t.value);
        return n
    }
    function Zr(e) {
        var t, n = [];
        for (t in e)
            n.push(t);
        return n
    }
    function P(e) {
        return null === e || "object" != typeof e
    }
    zr.exports = $r,
    zr.exports.MemoizeMap = Vr;
    var Xr, eo, to = S, no = function() {
        return to.useProxy && "undefined" != typeof Proxy && "undefined" != typeof Reflect
    };
    var ro, oo, io, ao, so, co, uo, fo, po, lo, ho = Object.getOwnPropertyDescriptor(function() {}, "length"), yo = function(e, t, n) {
        return ho.configurable && Object.defineProperty(e, "length", {
            get: function() {
                if (n)
                    throw Error("Invalid Chai property: " + t + '.length. Due to a compatibility issue, "length" cannot directly follow "' + t + '". Use "' + t + '.lengthOf" instead.');
                throw Error("Invalid Chai property: " + t + '.length. See docs for proper usage of "' + t + '".')
            }
        }),
        e
    }, go = S, bo = y, mo = function(e) {
        var t = Object.getOwnPropertyNames(e);
        function n(e) {
            -1 === t.indexOf(e) && t.push(e)
        }
        for (var r = Object.getPrototypeOf(e); null !== r; )
            Object.getOwnPropertyNames(r).forEach(n),
            r = Object.getPrototypeOf(r);
        return t
    }, wo = no, vo = ["__flags", "__methods", "_obj", "assert"], Oo = function(e, i) {
        return wo() ? new Proxy(e,{
            get: function e(t, n) {
                if ("string" != typeof n || -1 !== go.proxyExcludedKeys.indexOf(n) || Reflect.has(t, n))
                    return -1 !== vo.indexOf(n) || bo(t, "lockSsfi") || bo(t, "ssfi", e),
                    Reflect.get(t, n);
                if (i)
                    throw Error("Invalid Chai property: " + i + "." + n + '. See docs for proper usage of "' + i + '".');
                var r = null
                  , o = 4;
                throw mo(t).forEach(function(e) {
                    var t;
                    Object.prototype.hasOwnProperty(e) || -1 !== vo.indexOf(e) || (t = function(e, t, n) {
                        if (Math.abs(e.length - t.length) >= n)
                            return n;
                        for (var r = [], o = 0; o <= e.length; o++)
                            r[o] = Array(t.length + 1).fill(0),
                            r[o][0] = o;
                        for (var i = 0; i < t.length; i++)
                            r[0][i] = i;
                        for (o = 1; o <= e.length; o++)
                            for (var a = e.charCodeAt(o - 1), i = 1; i <= t.length; i++)
                                Math.abs(o - i) >= n ? r[o][i] = n : r[o][i] = Math.min(r[o - 1][i] + 1, r[o][i - 1] + 1, r[o - 1][i - 1] + (a === t.charCodeAt(i - 1) ? 0 : 1));
                        return r[e.length][t.length]
                    }(n, e, o)) < o && (r = e,
                    o = t)
                }),
                null !== r ? Error("Invalid Chai property: " + n + '. Did you mean "' + r + '"?') : Error("Invalid Chai property: " + n)
            }
        }) : e
    };
    function Ao() {
        if (oo)
            return ro;
        oo = 1;
        var o = yo
          , i = M()
          , a = y
          , s = Oo
          , c = E;
        return ro = function(e, t, n) {
            function r() {
                a(this, "lockSsfi") || a(this, "ssfi", r);
                var e = n.apply(this, arguments);
                return void 0 !== e || (e = new i.Assertion,
                c(this, e)),
                e
            }
            o(r, t, !1),
            e[t] = s(r, t)
        }
    }
    function xo() {
        if (co)
            return so;
        co = 1;
        var a = yo
          , s = M()
          , c = y
          , u = Oo
          , f = E;
        return so = function(e, t, n) {
            function r() {
                c(this, "lockSsfi") || c(this, "ssfi", r);
                var e = c(this, "lockSsfi")
                  , t = (c(this, "lockSsfi", !0),
                n(i).apply(this, arguments));
                return c(this, "lockSsfi", e),
                void 0 !== t ? t : (e = new s.Assertion,
                f(this, e),
                e)
            }
            var o = e[t]
              , i = function() {
                throw new Error(t + " is not a function")
            };
            o && "function" == typeof o && (i = o);
            a(r, t, !1),
            e[t] = u(r, t)
        }
    }
    var So = Br
      , Eo = function(e, t) {
        return So(e) < So(t) ? -1 : 1
    }
      , jo = function(t) {
        return "function" != typeof Object.getOwnPropertySymbols ? [] : Object.getOwnPropertySymbols(t).filter(function(e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable
        })
    }
      , Po = jo
      , Io = function(e) {
        return Object.keys(e).concat(Po(e))
    };
    var Mo = /\s*function(?:\s|\s*\/\*[^(?:*\/)]+\*\/\s*)*([^\(\/]+)/;
    function No(e) {
        var t, n = "";
        return void 0 === e.name ? (t = String(e).match(Mo)) && (n = t[1]) : n = e.name,
        n
    }
    var ko = {
        compatibleInstance: function(e, t) {
            return t instanceof Error && e === t
        },
        compatibleConstructor: function(e, t) {
            return t instanceof Error ? e.constructor === t.constructor || e instanceof t.constructor : (t.prototype instanceof Error || t === Error) && (e.constructor === t || e instanceof t)
        },
        compatibleMessage: function(e, t) {
            return e = "string" == typeof e ? e : e.message,
            t instanceof RegExp ? t.test(e) : "string" == typeof t && -1 !== e.indexOf(t)
        },
        getMessage: function(e) {
            var t = "";
            return e && e.message ? t = e.message : "string" == typeof e && (t = e),
            t
        },
        getConstructorName: function(e) {
            var t = e;
            return e instanceof Error ? t = No(e.constructor) : "function" == typeof e && (t = No(e).trim() || No(new e)),
            t
        }
    };
    var Bo = Number.isNaN || function(e) {
        return e != e
    }
      , _o = dt.exports
      , To = y;
    var Uo, Do = function(e, t) {
        var n = To(e, "operator")
          , e = To(e, "negate")
          , r = t[3]
          , e = e ? t[2] : t[1];
        if (n)
            return n;
        if ((e = (e = "function" == typeof e ? e() : e) || "") && !/\shave\s/.test(e))
            return t = _o(t = r),
            n = -1 !== ["Array", "Object", "function"].indexOf(t),
            /\snot\s/.test(e) ? n ? "notDeepStrictEqual" : "notStrictEqual" : n ? "deepStrictEqual" : "strictEqual"
    };
    function Co() {
        if (Uo)
            return i;
        Uo = 1;
        var e = pt;
        return i.test = ht,
        i.type = dt.exports,
        i.expectTypes = mt,
        i.getMessage = Fr,
        i.getActual = wt,
        i.inspect = Br,
        i.objDisplay = Ur,
        i.flag = y,
        i.transferFlags = E,
        i.eql = zr.exports,
        i.getPathInfo = e.getPathInfo,
        i.hasProperty = e.hasProperty,
        i.getName = Dt,
        i.addProperty = function() {
            if (eo)
                return Xr;
            eo = 1;
            var r = M()
              , o = y
              , i = no
              , a = E;
            return Xr = function(e, t, n) {
                n = void 0 === n ? function() {}
                : n,
                Object.defineProperty(e, t, {
                    get: function e() {
                        i() || o(this, "lockSsfi") || o(this, "ssfi", e);
                        var t = n.call(this);
                        if (void 0 !== t)
                            return t;
                        t = new r.Assertion;
                        return a(this, t),
                        t
                    },
                    configurable: !0
                })
            }
        }(),
        i.addMethod = Ao(),
        i.overwriteProperty = function() {
            if (ao)
                return io;
            ao = 1;
            var i = M()
              , a = y
              , s = no
              , c = E;
            return io = function(e, t, r) {
                var n = Object.getOwnPropertyDescriptor(e, t)
                  , o = function() {};
                n && "function" == typeof n.get && (o = n.get),
                Object.defineProperty(e, t, {
                    get: function e() {
                        s() || a(this, "lockSsfi") || a(this, "ssfi", e);
                        var t = a(this, "lockSsfi")
                          , n = (a(this, "lockSsfi", !0),
                        r(o).call(this));
                        if (a(this, "lockSsfi", t),
                        void 0 !== n)
                            return n;
                        t = new i.Assertion;
                        return c(this, t),
                        t
                    },
                    configurable: !0
                })
            }
        }(),
        i.overwriteMethod = xo(),
        i.addChainableMethod = function() {
            if (fo)
                return uo;
            function t() {}
            fo = 1;
            var i = yo
              , a = M()
              , s = y
              , c = Oo
              , u = E
              , f = "function" == typeof Object.setPrototypeOf
              , p = Object.getOwnPropertyNames(t).filter(function(e) {
                e = Object.getOwnPropertyDescriptor(t, e);
                return "object" != typeof e || !e.configurable
            })
              , l = Function.prototype.call
              , h = Function.prototype.apply;
            return uo = function(r, t, e, n) {
                var o = {
                    method: e,
                    chainingBehavior: n = "function" != typeof n ? function() {}
                    : n
                };
                r.__methods || (r.__methods = {}),
                r.__methods[t] = o,
                Object.defineProperty(r, t, {
                    get: function() {
                        o.chainingBehavior.call(this);
                        var e, n = function() {
                            s(this, "lockSsfi") || s(this, "ssfi", n);
                            var e = o.method.apply(this, arguments);
                            if (void 0 !== e)
                                return e;
                            e = new a.Assertion;
                            return u(this, e),
                            e
                        };
                        return i(n, t, !0),
                        f ? ((e = Object.create(this)).call = l,
                        e.apply = h,
                        Object.setPrototypeOf(n, e)) : Object.getOwnPropertyNames(r).forEach(function(e) {
                            var t;
                            -1 === p.indexOf(e) && (t = Object.getOwnPropertyDescriptor(r, e),
                            Object.defineProperty(n, e, t))
                        }),
                        u(this, n),
                        c(n)
                    },
                    configurable: !0
                })
            }
        }(),
        i.overwriteChainableMethod = function() {
            if (lo)
                return po;
            lo = 1;
            var a = M()
              , s = E;
            return po = function(e, t, n, r) {
                var e = e.__methods[t]
                  , o = e.chainingBehavior
                  , i = (e.chainingBehavior = function() {
                    var e = r(o).call(this);
                    if (void 0 !== e)
                        return e;
                    e = new a.Assertion;
                    return s(this, e),
                    e
                }
                ,
                e.method);
                e.method = function() {
                    var e = n(i).apply(this, arguments);
                    if (void 0 !== e)
                        return e;
                    e = new a.Assertion;
                    return s(this, e),
                    e
                }
            }
        }(),
        i.compareByInspect = Eo,
        i.getOwnEnumerablePropertySymbols = jo,
        i.getOwnEnumerableProperties = Io,
        i.checkError = ko,
        i.proxify = Oo,
        i.addLengthGuard = yo,
        i.isProxyEnabled = no,
        i.isNaN = Bo,
        i.getOperator = Do,
        i
    }
    function Ro(e, s) {
        var c = e.AssertionError
          , u = s.flag;
        function o(e, t, n, r) {
            return u(this, "ssfi", n || o),
            u(this, "lockSsfi", r),
            u(this, "object", e),
            u(this, "message", t),
            s.proxify(this)
        }
        e.Assertion = o,
        Object.defineProperty(o, "includeStack", {
            get: function() {
                return console.warn("Assertion.includeStack is deprecated, use chai.config.includeStack instead."),
                Wo.includeStack
            },
            set: function(e) {
                console.warn("Assertion.includeStack is deprecated, use chai.config.includeStack instead."),
                Wo.includeStack = e
            }
        }),
        Object.defineProperty(o, "showDiff", {
            get: function() {
                return console.warn("Assertion.showDiff is deprecated, use chai.config.showDiff instead."),
                Wo.showDiff
            },
            set: function(e) {
                console.warn("Assertion.showDiff is deprecated, use chai.config.showDiff instead."),
                Wo.showDiff = e
            }
        }),
        o.addProperty = function(e, t) {
            s.addProperty(this.prototype, e, t)
        }
        ,
        o.addMethod = function(e, t) {
            s.addMethod(this.prototype, e, t)
        }
        ,
        o.addChainableMethod = function(e, t, n) {
            s.addChainableMethod(this.prototype, e, t, n)
        }
        ,
        o.overwriteProperty = function(e, t) {
            s.overwriteProperty(this.prototype, e, t)
        }
        ,
        o.overwriteMethod = function(e, t) {
            s.overwriteMethod(this.prototype, e, t)
        }
        ,
        o.overwriteChainableMethod = function(e, t, n) {
            s.overwriteChainableMethod(this.prototype, e, t, n)
        }
        ,
        o.prototype.assert = function(e, t, n, r, o, i) {
            var a = s.test(this, arguments);
            if (!1 !== i && (i = !0),
            void 0 === r && void 0 === o && (i = !1),
            !0 !== Wo.showDiff && (i = !1),
            !a)
                throw t = s.getMessage(this, arguments),
                o = {
                    actual: s.getActual(this, arguments),
                    expected: r,
                    showDiff: i
                },
                (a = s.getOperator(this, arguments)) && (o.operator = a),
                new c(t,o,Wo.includeStack ? this.assert : u(this, "ssfi"))
        }
        ,
        Object.defineProperty(o.prototype, "_obj", {
            get: function() {
                return u(this, "object")
            },
            set: function(e) {
                u(this, "object", e)
            }
        })
    }
    function Fo(e, h) {
        var d = e.Assertion
          , y = e.AssertionError
          , g = h.flag;
        function t(e, t) {
            t && g(this, "message", t),
            e = e.toLowerCase();
            var t = g(this, "object")
              , n = ~["a", "e", "i", "o", "u"].indexOf(e.charAt(0)) ? "an " : "a ";
            this.assert(e === h.type(t).toLowerCase(), "expected #{this} to be " + n + e, "expected #{this} not to be " + n + e)
        }
        function b(e, t) {
            return h.isNaN(e) && h.isNaN(t) || e === t
        }
        function n() {
            g(this, "contains", !0)
        }
        function r(n, e) {
            e && g(this, "message", e);
            var r = g(this, "object")
              , t = h.type(r).toLowerCase()
              , o = g(this, "message")
              , i = g(this, "negate")
              , a = g(this, "ssfi")
              , s = g(this, "deep")
              , e = s ? "deep " : ""
              , o = o ? o + ": " : ""
              , c = !1;
            switch (t) {
            case "string":
                c = -1 !== r.indexOf(n);
                break;
            case "weakset":
                if (s)
                    throw new y(o + "unable to use .deep.include with WeakSet",void 0,a);
                c = r.has(n);
                break;
            case "map":
                var u = s ? h.eql : b;
                r.forEach(function(e) {
                    c = c || u(e, n)
                });
                break;
            case "set":
                s ? r.forEach(function(e) {
                    c = c || h.eql(e, n)
                }) : c = r.has(n);
                break;
            case "array":
                c = s ? r.some(function(e) {
                    return h.eql(e, n)
                }) : -1 !== r.indexOf(n);
                break;
            default:
                if (n !== Object(n))
                    throw new y(o + "the given combination of arguments (" + t + " and " + h.type(n).toLowerCase() + ") is invalid for this assertion. You can use an array, a map, an object, a set, a string, or a weakset instead of a " + h.type(n).toLowerCase(),void 0,a);
                var f = Object.keys(n)
                  , p = null
                  , l = 0;
                if (f.forEach(function(e) {
                    var t = new d(r);
                    if (h.transferFlags(this, t, !0),
                    g(t, "lockSsfi", !0),
                    i && 1 !== f.length)
                        try {
                            t.property(e, n[e])
                        } catch (e) {
                            if (!h.checkError.compatibleConstructor(e, y))
                                throw e;
                            null === p && (p = e),
                            l++
                        }
                    else
                        t.property(e, n[e])
                }, this),
                i && 1 < f.length && l === f.length)
                    throw p;
                return
            }
            this.assert(c, "expected #{this} to " + e + "include " + h.inspect(n), "expected #{this} to not " + e + "include " + h.inspect(n))
        }
        function o() {
            var e = g(this, "object");
            this.assert(null != e, "expected #{this} to exist", "expected #{this} to not exist")
        }
        function i() {
            var e = g(this, "object")
              , e = h.type(e);
            this.assert("Arguments" === e, "expected #{this} to be arguments but got " + e, "expected #{this} to not be arguments")
        }
        function a(e, t) {
            t && g(this, "message", t);
            var n, t = g(this, "object");
            g(this, "deep") ? (n = g(this, "lockSsfi"),
            g(this, "lockSsfi", !0),
            this.eql(e),
            g(this, "lockSsfi", n)) : this.assert(e === t, "expected #{this} to equal #{exp}", "expected #{this} to not equal #{exp}", e, this._obj, !0)
        }
        function s(e, t) {
            t && g(this, "message", t),
            this.assert(h.eql(e, g(this, "object")), "expected #{this} to deeply equal #{exp}", "expected #{this} to not deeply equal #{exp}", e, this._obj, !0)
        }
        function c(e, t) {
            t && g(this, "message", t);
            var n, t = g(this, "object"), r = g(this, "doLength"), o = g(this, "message"), i = o ? o + ": " : "", a = g(this, "ssfi"), s = h.type(t).toLowerCase(), c = h.type(e).toLowerCase(), u = !0;
            if (r && "map" !== s && "set" !== s && new d(t,o,a,!0).to.have.property("length"),
            r || "date" !== s || "date" === c ? "number" === c || !r && "number" !== s ? r || "date" === s || "number" === s ? u = !1 : n = i + "expected " + ("string" === s ? "'" + t + "'" : t) + " to be a number or a date" : n = i + "the argument to above must be a number" : n = i + "the argument to above must be a date",
            u)
                throw new y(n,void 0,a);
            r ? (o = "length",
            c = "map" === s || "set" === s ? (o = "size",
            t.size) : t.length,
            this.assert(e < c, "expected #{this} to have a " + o + " above #{exp} but got #{act}", "expected #{this} to not have a " + o + " above #{exp}", e, c)) : this.assert(e < t, "expected #{this} to be above #{exp}", "expected #{this} to be at most #{exp}", e)
        }
        function u(e, t) {
            t && g(this, "message", t);
            var n, t = g(this, "object"), r = g(this, "doLength"), o = g(this, "message"), i = o ? o + ": " : "", a = g(this, "ssfi"), s = h.type(t).toLowerCase(), c = h.type(e).toLowerCase(), u = !0;
            if (r && "map" !== s && "set" !== s && new d(t,o,a,!0).to.have.property("length"),
            r || "date" !== s || "date" === c ? "number" === c || !r && "number" !== s ? r || "date" === s || "number" === s ? u = !1 : n = i + "expected " + ("string" === s ? "'" + t + "'" : t) + " to be a number or a date" : n = i + "the argument to least must be a number" : n = i + "the argument to least must be a date",
            u)
                throw new y(n,void 0,a);
            r ? (o = "length",
            c = "map" === s || "set" === s ? (o = "size",
            t.size) : t.length,
            this.assert(e <= c, "expected #{this} to have a " + o + " at least #{exp} but got #{act}", "expected #{this} to have a " + o + " below #{exp}", e, c)) : this.assert(e <= t, "expected #{this} to be at least #{exp}", "expected #{this} to be below #{exp}", e)
        }
        function f(e, t) {
            t && g(this, "message", t);
            var n, t = g(this, "object"), r = g(this, "doLength"), o = g(this, "message"), i = o ? o + ": " : "", a = g(this, "ssfi"), s = h.type(t).toLowerCase(), c = h.type(e).toLowerCase(), u = !0;
            if (r && "map" !== s && "set" !== s && new d(t,o,a,!0).to.have.property("length"),
            r || "date" !== s || "date" === c ? "number" === c || !r && "number" !== s ? r || "date" === s || "number" === s ? u = !1 : n = i + "expected " + ("string" === s ? "'" + t + "'" : t) + " to be a number or a date" : n = i + "the argument to below must be a number" : n = i + "the argument to below must be a date",
            u)
                throw new y(n,void 0,a);
            r ? (o = "length",
            c = "map" === s || "set" === s ? (o = "size",
            t.size) : t.length,
            this.assert(c < e, "expected #{this} to have a " + o + " below #{exp} but got #{act}", "expected #{this} to not have a " + o + " below #{exp}", e, c)) : this.assert(t < e, "expected #{this} to be below #{exp}", "expected #{this} to be at least #{exp}", e)
        }
        function p(e, t) {
            t && g(this, "message", t);
            var n, t = g(this, "object"), r = g(this, "doLength"), o = g(this, "message"), i = o ? o + ": " : "", a = g(this, "ssfi"), s = h.type(t).toLowerCase(), c = h.type(e).toLowerCase(), u = !0;
            if (r && "map" !== s && "set" !== s && new d(t,o,a,!0).to.have.property("length"),
            r || "date" !== s || "date" === c ? "number" === c || !r && "number" !== s ? r || "date" === s || "number" === s ? u = !1 : n = i + "expected " + ("string" === s ? "'" + t + "'" : t) + " to be a number or a date" : n = i + "the argument to most must be a number" : n = i + "the argument to most must be a date",
            u)
                throw new y(n,void 0,a);
            r ? (o = "length",
            c = "map" === s || "set" === s ? (o = "size",
            t.size) : t.length,
            this.assert(c <= e, "expected #{this} to have a " + o + " at most #{exp} but got #{act}", "expected #{this} to have a " + o + " above #{exp}", e, c)) : this.assert(t <= e, "expected #{this} to be at most #{exp}", "expected #{this} to be above #{exp}", e)
        }
        function l(t, e) {
            e && g(this, "message", e);
            var e = g(this, "object")
              , n = g(this, "ssfi")
              , r = g(this, "message");
            try {
                var o = e instanceof t
            } catch (e) {
                if (e instanceof TypeError)
                    throw new y((r = r ? r + ": " : "") + "The instanceof assertion needs a constructor but " + h.type(t) + " was given.",void 0,n);
                throw e
            }
            e = h.getName(t);
            this.assert(o, "expected #{this} to be an instance of " + (e = null === e ? "an unnamed constructor" : e), "expected #{this} to not be an instance of " + e)
        }
        function m(e, t, n) {
            n && g(this, "message", n);
            var n = g(this, "nested")
              , r = g(this, "own")
              , o = g(this, "message")
              , i = g(this, "object")
              , a = g(this, "ssfi")
              , s = typeof e
              , o = o ? o + ": " : "";
            if (n) {
                if ("string" != s)
                    throw new y(o + "the argument to property must be a string when using nested syntax",void 0,a)
            } else if ("string" != s && "number" != s && "symbol" != s)
                throw new y(o + "the argument to property must be a string, number, or symbol",void 0,a);
            if (n && r)
                throw new y(o + 'The "nested" and "own" flags cannot be combined.',void 0,a);
            if (null == i)
                throw new y(o + "Target cannot be null or undefined.",void 0,a);
            var s = g(this, "deep")
              , o = g(this, "negate")
              , a = n ? h.getPathInfo(i, e) : null
              , c = n ? a.value : i[e]
              , u = "";
            s && (u += "deep "),
            r && (u += "own "),
            n && (u += "nested "),
            u += "property ",
            r = r ? Object.prototype.hasOwnProperty.call(i, e) : n ? a.exists : h.hasProperty(i, e),
            o && 1 !== arguments.length || this.assert(r, "expected #{this} to have " + u + h.inspect(e), "expected #{this} to not have " + u + h.inspect(e)),
            1 < arguments.length && this.assert(r && (s ? h.eql(t, c) : t === c), "expected #{this} to have " + u + h.inspect(e) + " of #{exp}, but got #{act}", "expected #{this} to not have " + u + h.inspect(e) + " of #{act}", t, c),
            g(this, "object", c)
        }
        function w(e, t, n) {
            g(this, "own", !0),
            m.apply(this, arguments)
        }
        function v(e, t, n) {
            "string" == typeof t && (n = t,
            t = null),
            n && g(this, "message", n);
            n = g(this, "object"),
            n = Object.getOwnPropertyDescriptor(Object(n), e);
            n && t ? this.assert(h.eql(t, n), "expected the own property descriptor for " + h.inspect(e) + " on #{this} to match " + h.inspect(t) + ", got " + h.inspect(n), "expected the own property descriptor for " + h.inspect(e) + " on #{this} to not match " + h.inspect(t), t, n, !0) : this.assert(n, "expected #{this} to have an own property descriptor for " + h.inspect(e), "expected #{this} to not have an own property descriptor for " + h.inspect(e)),
            g(this, "object", n)
        }
        function O() {
            g(this, "doLength", !0)
        }
        function A(e, t) {
            t && g(this, "message", t);
            var n, r = g(this, "object"), t = h.type(r).toLowerCase(), o = g(this, "message"), i = g(this, "ssfi"), a = "length";
            switch (t) {
            case "map":
            case "set":
                a = "size",
                n = r.size;
                break;
            default:
                new d(r,o,i,!0).to.have.property("length"),
                n = r.length
            }
            this.assert(n == e, "expected #{this} to have a " + a + " of #{exp} but got #{act}", "expected #{this} to not have a " + a + " of #{act}", e, n)
        }
        function x(e, t) {
            t && g(this, "message", t);
            t = g(this, "object");
            this.assert(e.exec(t), "expected #{this} to match " + e, "expected #{this} not to match " + e)
        }
        function S(e) {
            var t, n, r = g(this, "object"), o = h.type(r), i = h.type(e), a = g(this, "ssfi"), s = g(this, "deep"), c = "", u = !0, f = g(this, "message"), p = (f = f ? f + ": " : "") + "when testing keys against an object or an array you must give a single Array|Object|String argument or multiple String arguments";
            if ("Map" === o || "Set" === o)
                c = s ? "deeply " : "",
                n = [],
                r.forEach(function(e, t) {
                    n.push(t)
                }),
                "Array" !== i && (e = Array.prototype.slice.call(arguments));
            else {
                switch (n = h.getOwnEnumerableProperties(r),
                i) {
                case "Array":
                    if (1 < arguments.length)
                        throw new y(p,void 0,a);
                    break;
                case "Object":
                    if (1 < arguments.length)
                        throw new y(p,void 0,a);
                    e = Object.keys(e);
                    break;
                default:
                    e = Array.prototype.slice.call(arguments)
                }
                e = e.map(function(e) {
                    return "symbol" == typeof e ? e : String(e)
                })
            }
            if (!e.length)
                throw new y(f + "keys required",void 0,a);
            var l, o = e.length, r = g(this, "any"), i = g(this, "all"), f = e;
            r || i || (i = !0),
            r && (u = f.some(function(t) {
                return n.some(function(e) {
                    return s ? h.eql(t, e) : t === e
                })
            })),
            i && (u = f.every(function(t) {
                return n.some(function(e) {
                    return s ? h.eql(t, e) : t === e
                })
            }),
            g(this, "contains") || (u = u && e.length == n.length)),
            1 < o ? (l = (e = e.map(function(e) {
                return h.inspect(e)
            })).pop(),
            i && (t = e.join(", ") + ", and " + l),
            r && (t = e.join(", ") + ", or " + l)) : t = h.inspect(e[0]),
            t = (1 < o ? "keys " : "key ") + t,
            t = (g(this, "contains") ? "contain " : "have ") + t,
            this.assert(u, "expected #{this} to " + c + t, "expected #{this} to not " + c + t, f.slice(0).sort(h.compareByInspect), n.sort(h.compareByInspect), !0)
        }
        function E(e, t, n) {
            n && g(this, "message", n);
            var r, n = g(this, "object"), o = g(this, "ssfi"), i = g(this, "message"), a = g(this, "negate") || !1;
            new d(n,i,o,!0).is.a("function"),
            (e instanceof RegExp || "string" == typeof e) && (t = e,
            e = null);
            try {
                n()
            } catch (e) {
                r = e
            }
            var i = void 0 === e && void 0 === t
              , o = Boolean(e && t)
              , n = !1
              , s = !1;
            !i && a || (i = "an error",
            e instanceof Error ? i = "#{exp}" : e && (i = h.checkError.getConstructorName(e)),
            this.assert(r, "expected #{this} to throw " + i, "expected #{this} to not throw an error but #{act} was thrown", e && e.toString(), r instanceof Error ? r.toString() : "string" == typeof r ? r : r && h.checkError.getConstructorName(r))),
            e && r && (e instanceof Error && h.checkError.compatibleInstance(r, e) === a && (o && a ? n = !0 : this.assert(a, "expected #{this} to throw #{exp} but #{act} was thrown", "expected #{this} to not throw #{exp}" + (r && !a ? " but #{act} was thrown" : ""), e.toString(), r.toString())),
            h.checkError.compatibleConstructor(r, e) === a && (o && a ? n = !0 : this.assert(a, "expected #{this} to throw #{exp} but #{act} was thrown", "expected #{this} to not throw #{exp}" + (r ? " but #{act} was thrown" : ""), e instanceof Error ? e.toString() : e && h.checkError.getConstructorName(e), r instanceof Error ? r.toString() : r && h.checkError.getConstructorName(r)))),
            r && null != t && (i = "including",
            t instanceof RegExp && (i = "matching"),
            h.checkError.compatibleMessage(r, t) === a && (o && a ? s = !0 : this.assert(a, "expected #{this} to throw error " + i + " #{exp} but got #{act}", "expected #{this} to throw error not " + i + " #{exp}", t, h.checkError.getMessage(r)))),
            n && s && this.assert(a, "expected #{this} to throw #{exp} but #{act} was thrown", "expected #{this} to not throw #{exp}" + (r ? " but #{act} was thrown" : ""), e instanceof Error ? e.toString() : e && h.checkError.getConstructorName(e), r instanceof Error ? r.toString() : r && h.checkError.getConstructorName(r)),
            g(this, "object", r)
        }
        function j(e, t) {
            t && g(this, "message", t);
            var t = g(this, "object")
              , n = g(this, "itself")
              , n = ("function" != typeof t || n ? t : t.prototype)[e];
            this.assert("function" == typeof n, "expected #{this} to respond to " + h.inspect(e), "expected #{this} to not respond to " + h.inspect(e))
        }
        function P(e, t) {
            t && g(this, "message", t);
            t = e(g(this, "object"));
            this.assert(t, "expected #{this} to satisfy " + h.objDisplay(e), "expected #{this} to not satisfy" + h.objDisplay(e), !g(this, "negate"), t)
        }
        function I(e, t, n) {
            n && g(this, "message", n);
            var n = g(this, "object")
              , r = g(this, "message")
              , o = g(this, "ssfi");
            if (new d(n,r,o,!0).is.a("number"),
            "number" != typeof e || "number" != typeof t)
                throw new y((r = r ? r + ": " : "") + "the arguments to closeTo or approximately must be numbers" + (void 0 === t ? ", and a delta is required" : ""),void 0,o);
            this.assert(Math.abs(n - e) <= t, "expected #{this} to be close to " + e + " +/- " + t, "expected #{this} not to be close to " + e + " +/- " + t)
        }
        function M(e, t, n) {
            n && g(this, "message", n);
            var n = g(this, "object")
              , r = g(this, "message")
              , o = g(this, "ssfi")
              , o = (new d(n,r,o,!0).is.a("function"),
            r = t ? (new d(e,r,o,!0).to.have.property(t),
            e[t]) : (new d(e,r,o,!0).is.a("function"),
            e()),
            n(),
            null == t ? e() : e[t])
              , n = null == t ? r : "." + t;
            g(this, "deltaMsgObj", n),
            g(this, "initialDeltaValue", r),
            g(this, "finalDeltaValue", o),
            g(this, "deltaBehavior", "change"),
            g(this, "realDelta", o !== r),
            this.assert(r !== o, "expected " + n + " to change", "expected " + n + " to not change")
        }
        function N(e, t, n) {
            n && g(this, "message", n);
            var r, n = g(this, "object"), o = g(this, "message"), i = g(this, "ssfi"), o = (new d(n,o,i,!0).is.a("function"),
            r = t ? (new d(e,o,i,!0).to.have.property(t),
            e[t]) : (new d(e,o,i,!0).is.a("function"),
            e()),
            new d(r,o,i,!0).is.a("number"),
            n(),
            null == t ? e() : e[t]), i = null == t ? r : "." + t;
            g(this, "deltaMsgObj", i),
            g(this, "initialDeltaValue", r),
            g(this, "finalDeltaValue", o),
            g(this, "deltaBehavior", "increase"),
            g(this, "realDelta", o - r),
            this.assert(0 < o - r, "expected " + i + " to increase", "expected " + i + " to not increase")
        }
        function k(e, t, n) {
            n && g(this, "message", n);
            var r, n = g(this, "object"), o = g(this, "message"), i = g(this, "ssfi"), o = (new d(n,o,i,!0).is.a("function"),
            r = t ? (new d(e,o,i,!0).to.have.property(t),
            e[t]) : (new d(e,o,i,!0).is.a("function"),
            e()),
            new d(r,o,i,!0).is.a("number"),
            n(),
            null == t ? e() : e[t]), i = null == t ? r : "." + t;
            g(this, "deltaMsgObj", i),
            g(this, "initialDeltaValue", r),
            g(this, "finalDeltaValue", o),
            g(this, "deltaBehavior", "decrease"),
            g(this, "realDelta", r - o),
            this.assert(o - r < 0, "expected " + i + " to decrease", "expected " + i + " to not decrease")
        }
        ["to", "be", "been", "is", "and", "has", "have", "with", "that", "which", "at", "of", "same", "but", "does", "still", "also"].forEach(function(e) {
            d.addProperty(e)
        }),
        d.addProperty("not", function() {
            g(this, "negate", !0)
        }),
        d.addProperty("deep", function() {
            g(this, "deep", !0)
        }),
        d.addProperty("nested", function() {
            g(this, "nested", !0)
        }),
        d.addProperty("own", function() {
            g(this, "own", !0)
        }),
        d.addProperty("ordered", function() {
            g(this, "ordered", !0)
        }),
        d.addProperty("any", function() {
            g(this, "any", !0),
            g(this, "all", !1)
        }),
        d.addProperty("all", function() {
            g(this, "all", !0),
            g(this, "any", !1)
        }),
        d.addChainableMethod("an", t),
        d.addChainableMethod("a", t),
        d.addChainableMethod("include", r, n),
        d.addChainableMethod("contain", r, n),
        d.addChainableMethod("contains", r, n),
        d.addChainableMethod("includes", r, n),
        d.addProperty("ok", function() {
            this.assert(g(this, "object"), "expected #{this} to be truthy", "expected #{this} to be falsy")
        }),
        d.addProperty("true", function() {
            this.assert(!0 === g(this, "object"), "expected #{this} to be true", "expected #{this} to be false", !g(this, "negate"))
        }),
        d.addProperty("false", function() {
            this.assert(!1 === g(this, "object"), "expected #{this} to be false", "expected #{this} to be true", !!g(this, "negate"))
        }),
        d.addProperty("null", function() {
            this.assert(null === g(this, "object"), "expected #{this} to be null", "expected #{this} not to be null")
        }),
        d.addProperty("undefined", function() {
            this.assert(void 0 === g(this, "object"), "expected #{this} to be undefined", "expected #{this} not to be undefined")
        }),
        d.addProperty("NaN", function() {
            this.assert(h.isNaN(g(this, "object")), "expected #{this} to be NaN", "expected #{this} not to be NaN")
        }),
        d.addProperty("exist", o),
        d.addProperty("exists", o),
        d.addProperty("empty", function() {
            var e, t = g(this, "object"), n = g(this, "ssfi"), r = (r = g(this, "message")) ? r + ": " : "";
            switch (h.type(t).toLowerCase()) {
            case "array":
            case "string":
                e = t.length;
                break;
            case "map":
            case "set":
                e = t.size;
                break;
            case "weakmap":
            case "weakset":
                throw new y(r + ".empty was passed a weak collection",void 0,n);
            case "function":
                var o = r + ".empty was passed a function " + h.getName(t);
                throw new y(o.trim(),void 0,n);
            default:
                if (t !== Object(t))
                    throw new y(r + ".empty was passed non-string primitive " + h.inspect(t),void 0,n);
                e = Object.keys(t).length
            }
            this.assert(0 === e, "expected #{this} to be empty", "expected #{this} not to be empty")
        }),
        d.addProperty("arguments", i),
        d.addProperty("Arguments", i),
        d.addMethod("equal", a),
        d.addMethod("equals", a),
        d.addMethod("eq", a),
        d.addMethod("eql", s),
        d.addMethod("eqls", s),
        d.addMethod("above", c),
        d.addMethod("gt", c),
        d.addMethod("greaterThan", c),
        d.addMethod("least", u),
        d.addMethod("gte", u),
        d.addMethod("greaterThanOrEqual", u),
        d.addMethod("below", f),
        d.addMethod("lt", f),
        d.addMethod("lessThan", f),
        d.addMethod("most", p),
        d.addMethod("lte", p),
        d.addMethod("lessThanOrEqual", p),
        d.addMethod("within", function(e, t, n) {
            n && g(this, "message", n);
            var r, n = g(this, "object"), o = g(this, "doLength"), i = g(this, "message"), a = i ? i + ": " : "", s = g(this, "ssfi"), c = h.type(n).toLowerCase(), u = h.type(e).toLowerCase(), f = h.type(t).toLowerCase(), p = !0, l = "date" === u && "date" === f ? e.toISOString() + ".." + t.toISOString() : e + ".." + t;
            if (o && "map" !== c && "set" !== c && new d(n,i,s,!0).to.have.property("length"),
            o || "date" !== c || "date" === u && "date" === f ? "number" === u && "number" === f || !o && "number" !== c ? o || "date" === c || "number" === c ? p = !1 : r = a + "expected " + ("string" === c ? "'" + n + "'" : n) + " to be a number or a date" : r = a + "the arguments to within must be numbers" : r = a + "the arguments to within must be dates",
            p)
                throw new y(r,void 0,s);
            o ? (i = "length",
            u = "map" === c || "set" === c ? (i = "size",
            n.size) : n.length,
            this.assert(e <= u && u <= t, "expected #{this} to have a " + i + " within " + l, "expected #{this} to not have a " + i + " within " + l)) : this.assert(e <= n && n <= t, "expected #{this} to be within " + l, "expected #{this} to not be within " + l)
        }),
        d.addMethod("instanceof", l),
        d.addMethod("instanceOf", l),
        d.addMethod("property", m),
        d.addMethod("ownProperty", w),
        d.addMethod("haveOwnProperty", w),
        d.addMethod("ownPropertyDescriptor", v),
        d.addMethod("haveOwnPropertyDescriptor", v),
        d.addChainableMethod("length", A, O),
        d.addChainableMethod("lengthOf", A, O),
        d.addMethod("match", x),
        d.addMethod("matches", x),
        d.addMethod("string", function(e, t) {
            t && g(this, "message", t);
            var t = g(this, "object")
              , n = g(this, "message")
              , r = g(this, "ssfi");
            new d(t,n,r,!0).is.a("string"),
            this.assert(~t.indexOf(e), "expected #{this} to contain " + h.inspect(e), "expected #{this} to not contain " + h.inspect(e))
        }),
        d.addMethod("keys", S),
        d.addMethod("key", S),
        d.addMethod("throw", E),
        d.addMethod("throws", E),
        d.addMethod("Throw", E),
        d.addMethod("respondTo", j),
        d.addMethod("respondsTo", j),
        d.addProperty("itself", function() {
            g(this, "itself", !0)
        }),
        d.addMethod("satisfy", P),
        d.addMethod("satisfies", P),
        d.addMethod("closeTo", I),
        d.addMethod("approximately", I),
        d.addMethod("members", function(e, t) {
            t && g(this, "message", t);
            var n, t = g(this, "object"), r = g(this, "message"), o = g(this, "ssfi"), r = (new d(t,r,o,!0).to.be.an("array"),
            new d(e,r,o,!0).to.be.an("array"),
            g(this, "contains")), o = g(this, "ordered"), i = r ? (n = "expected #{this} to be " + (i = o ? "an ordered superset" : "a superset") + " of #{exp}",
            "expected #{this} to not be " + i + " of #{exp}") : (n = "expected #{this} to have the same " + (i = o ? "ordered members" : "members") + " as #{exp}",
            "expected #{this} to not have the same " + i + " as #{exp}"), a = g(this, "deep") ? h.eql : void 0;
            this.assert(function(e, r, o, i, t) {
                if (!i) {
                    if (e.length !== r.length)
                        return !1;
                    r = r.slice()
                }
                return e.every(function(n, e) {
                    return t ? o ? o(n, r[e]) : n === r[e] : o ? r.some(function(e, t) {
                        return !!o(n, e) && (i || r.splice(t, 1),
                        !0)
                    }) : -1 !== (e = r.indexOf(n)) && (i || r.splice(e, 1),
                    !0)
                })
            }(e, t, a, r, o), n, i, e, t, !0)
        }),
        d.addMethod("oneOf", function(e, t) {
            t && g(this, "message", t);
            var n = g(this, "object")
              , t = g(this, "message")
              , r = g(this, "ssfi")
              , o = g(this, "contains")
              , i = g(this, "deep");
            new d(e,t,r,!0).to.be.an("array"),
            o ? this.assert(e.some(function(e) {
                return -1 < n.indexOf(e)
            }), "expected #{this} to contain one of #{exp}", "expected #{this} to not contain one of #{exp}", e, n) : i ? this.assert(e.some(function(e) {
                return h.eql(n, e)
            }), "expected #{this} to deeply equal one of #{exp}", "expected #{this} to deeply equal one of #{exp}", e, n) : this.assert(-1 < e.indexOf(n), "expected #{this} to be one of #{exp}", "expected #{this} to not be one of #{exp}", e, n)
        }),
        d.addMethod("change", M),
        d.addMethod("changes", M),
        d.addMethod("increase", N),
        d.addMethod("increases", N),
        d.addMethod("decrease", k),
        d.addMethod("decreases", k),
        d.addMethod("by", function(e, t) {
            t && g(this, "message", t);
            var t = g(this, "deltaMsgObj")
              , n = g(this, "initialDeltaValue")
              , r = g(this, "finalDeltaValue")
              , o = g(this, "deltaBehavior")
              , i = g(this, "realDelta")
              , r = "change" === o ? Math.abs(r - n) === Math.abs(e) : i === Math.abs(e);
            this.assert(r, "expected " + t + " to " + o + " by " + e, "expected " + t + " to not " + o + " by " + e)
        }),
        d.addProperty("extensible", function() {
            var e = g(this, "object")
              , e = e === Object(e) && Object.isExtensible(e);
            this.assert(e, "expected #{this} to be extensible", "expected #{this} to not be extensible")
        }),
        d.addProperty("sealed", function() {
            var e = g(this, "object")
              , e = e !== Object(e) || Object.isSealed(e);
            this.assert(e, "expected #{this} to be sealed", "expected #{this} to not be sealed")
        }),
        d.addProperty("frozen", function() {
            var e = g(this, "object")
              , e = e !== Object(e) || Object.isFrozen(e);
            this.assert(e, "expected #{this} to be frozen", "expected #{this} to not be frozen")
        }),
        d.addProperty("finite", function(e) {
            var t = g(this, "object");
            this.assert("number" == typeof t && isFinite(t), "expected #{this} to be a finite number", "expected #{this} to not be a finite number")
        })
    }
    function zo(o, e) {
        o.expect = function(e, t) {
            return new o.Assertion(e,t)
        }
        ,
        o.expect.fail = function(e, t, n, r) {
            throw arguments.length < 2 && (n = e,
            e = void 0),
            new o.AssertionError(n = n || "expect.fail()",{
                actual: e,
                expected: t,
                operator: r
            },o.expect.fail)
        }
    }
    function Lo(i, e) {
        var a = i.Assertion;
        function t() {
            Object.defineProperty(Object.prototype, "should", {
                set: function(e) {
                    Object.defineProperty(this, "should", {
                        value: e,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    })
                },
                get: function e() {
                    return this instanceof String || this instanceof Number || this instanceof Boolean || "function" == typeof Symbol && this instanceof Symbol || "function" == typeof BigInt && this instanceof BigInt ? new a(this.valueOf(),null,e) : new a(this,null,e)
                },
                configurable: !0
            });
            var o = {
                fail: function(e, t, n, r) {
                    throw arguments.length < 2 && (n = e,
                    e = void 0),
                    new i.AssertionError(n = n || "should.fail()",{
                        actual: e,
                        expected: t,
                        operator: r
                    },o.fail)
                },
                equal: function(e, t, n) {
                    new a(e,n).to.equal(t)
                },
                Throw: function(e, t, n, r) {
                    new a(e,r).to.Throw(t, n)
                },
                exist: function(e, t) {
                    new a(e,t).to.exist
                },
                not: {}
            };
            return o.not.equal = function(e, t, n) {
                new a(e,n).to.not.equal(t)
            }
            ,
            o.not.Throw = function(e, t, n, r) {
                new a(e,r).to.not.Throw(t, n)
            }
            ,
            o.not.exist = function(e, t) {
                new a(e,t).to.not.exist
            }
            ,
            o.throw = o.Throw,
            o.not.throw = o.not.Throw,
            o
        }
        i.should = t,
        i.Should = t
    }
    function qo(a, s) {
        var c = a.Assertion
          , u = s.flag
          , f = a.assert = function(e, t) {
            new c(null,null,a.assert,!0).assert(e, t, "[ negation message unavailable ]")
        }
        ;
        f.fail = function(e, t, n, r) {
            throw arguments.length < 2 && (n = e,
            e = void 0),
            new a.AssertionError(n = n || "assert.fail()",{
                actual: e,
                expected: t,
                operator: r
            },f.fail)
        }
        ,
        f.isOk = function(e, t) {
            new c(e,t,f.isOk,!0).is.ok
        }
        ,
        f.isNotOk = function(e, t) {
            new c(e,t,f.isNotOk,!0).is.not.ok
        }
        ,
        f.equal = function(e, t, n) {
            n = new c(e,n,f.equal,!0);
            n.assert(t == u(n, "object"), "expected #{this} to equal #{exp}", "expected #{this} to not equal #{act}", t, e, !0)
        }
        ,
        f.notEqual = function(e, t, n) {
            n = new c(e,n,f.notEqual,!0);
            n.assert(t != u(n, "object"), "expected #{this} to not equal #{exp}", "expected #{this} to equal #{act}", t, e, !0)
        }
        ,
        f.strictEqual = function(e, t, n) {
            new c(e,n,f.strictEqual,!0).to.equal(t)
        }
        ,
        f.notStrictEqual = function(e, t, n) {
            new c(e,n,f.notStrictEqual,!0).to.not.equal(t)
        }
        ,
        f.deepEqual = f.deepStrictEqual = function(e, t, n) {
            new c(e,n,f.deepEqual,!0).to.eql(t)
        }
        ,
        f.notDeepEqual = function(e, t, n) {
            new c(e,n,f.notDeepEqual,!0).to.not.eql(t)
        }
        ,
        f.isAbove = function(e, t, n) {
            new c(e,n,f.isAbove,!0).to.be.above(t)
        }
        ,
        f.isAtLeast = function(e, t, n) {
            new c(e,n,f.isAtLeast,!0).to.be.least(t)
        }
        ,
        f.isBelow = function(e, t, n) {
            new c(e,n,f.isBelow,!0).to.be.below(t)
        }
        ,
        f.isAtMost = function(e, t, n) {
            new c(e,n,f.isAtMost,!0).to.be.most(t)
        }
        ,
        f.isTrue = function(e, t) {
            new c(e,t,f.isTrue,!0).is.true
        }
        ,
        f.isNotTrue = function(e, t) {
            new c(e,t,f.isNotTrue,!0).to.not.equal(!0)
        }
        ,
        f.isFalse = function(e, t) {
            new c(e,t,f.isFalse,!0).is.false
        }
        ,
        f.isNotFalse = function(e, t) {
            new c(e,t,f.isNotFalse,!0).to.not.equal(!1)
        }
        ,
        f.isNull = function(e, t) {
            new c(e,t,f.isNull,!0).to.equal(null)
        }
        ,
        f.isNotNull = function(e, t) {
            new c(e,t,f.isNotNull,!0).to.not.equal(null)
        }
        ,
        f.isNaN = function(e, t) {
            new c(e,t,f.isNaN,!0).to.be.NaN
        }
        ,
        f.isNotNaN = function(e, t) {
            new c(e,t,f.isNotNaN,!0).not.to.be.NaN
        }
        ,
        f.exists = function(e, t) {
            new c(e,t,f.exists,!0).to.exist
        }
        ,
        f.notExists = function(e, t) {
            new c(e,t,f.notExists,!0).to.not.exist
        }
        ,
        f.isUndefined = function(e, t) {
            new c(e,t,f.isUndefined,!0).to.equal(void 0)
        }
        ,
        f.isDefined = function(e, t) {
            new c(e,t,f.isDefined,!0).to.not.equal(void 0)
        }
        ,
        f.isFunction = function(e, t) {
            new c(e,t,f.isFunction,!0).to.be.a("function")
        }
        ,
        f.isNotFunction = function(e, t) {
            new c(e,t,f.isNotFunction,!0).to.not.be.a("function")
        }
        ,
        f.isObject = function(e, t) {
            new c(e,t,f.isObject,!0).to.be.a("object")
        }
        ,
        f.isNotObject = function(e, t) {
            new c(e,t,f.isNotObject,!0).to.not.be.a("object")
        }
        ,
        f.isArray = function(e, t) {
            new c(e,t,f.isArray,!0).to.be.an("array")
        }
        ,
        f.isNotArray = function(e, t) {
            new c(e,t,f.isNotArray,!0).to.not.be.an("array")
        }
        ,
        f.isString = function(e, t) {
            new c(e,t,f.isString,!0).to.be.a("string")
        }
        ,
        f.isNotString = function(e, t) {
            new c(e,t,f.isNotString,!0).to.not.be.a("string")
        }
        ,
        f.isNumber = function(e, t) {
            new c(e,t,f.isNumber,!0).to.be.a("number")
        }
        ,
        f.isNotNumber = function(e, t) {
            new c(e,t,f.isNotNumber,!0).to.not.be.a("number")
        }
        ,
        f.isFinite = function(e, t) {
            new c(e,t,f.isFinite,!0).to.be.finite
        }
        ,
        f.isBoolean = function(e, t) {
            new c(e,t,f.isBoolean,!0).to.be.a("boolean")
        }
        ,
        f.isNotBoolean = function(e, t) {
            new c(e,t,f.isNotBoolean,!0).to.not.be.a("boolean")
        }
        ,
        f.typeOf = function(e, t, n) {
            new c(e,n,f.typeOf,!0).to.be.a(t)
        }
        ,
        f.notTypeOf = function(e, t, n) {
            new c(e,n,f.notTypeOf,!0).to.not.be.a(t)
        }
        ,
        f.instanceOf = function(e, t, n) {
            new c(e,n,f.instanceOf,!0).to.be.instanceOf(t)
        }
        ,
        f.notInstanceOf = function(e, t, n) {
            new c(e,n,f.notInstanceOf,!0).to.not.be.instanceOf(t)
        }
        ,
        f.include = function(e, t, n) {
            new c(e,n,f.include,!0).include(t)
        }
        ,
        f.notInclude = function(e, t, n) {
            new c(e,n,f.notInclude,!0).not.include(t)
        }
        ,
        f.deepInclude = function(e, t, n) {
            new c(e,n,f.deepInclude,!0).deep.include(t)
        }
        ,
        f.notDeepInclude = function(e, t, n) {
            new c(e,n,f.notDeepInclude,!0).not.deep.include(t)
        }
        ,
        f.nestedInclude = function(e, t, n) {
            new c(e,n,f.nestedInclude,!0).nested.include(t)
        }
        ,
        f.notNestedInclude = function(e, t, n) {
            new c(e,n,f.notNestedInclude,!0).not.nested.include(t)
        }
        ,
        f.deepNestedInclude = function(e, t, n) {
            new c(e,n,f.deepNestedInclude,!0).deep.nested.include(t)
        }
        ,
        f.notDeepNestedInclude = function(e, t, n) {
            new c(e,n,f.notDeepNestedInclude,!0).not.deep.nested.include(t)
        }
        ,
        f.ownInclude = function(e, t, n) {
            new c(e,n,f.ownInclude,!0).own.include(t)
        }
        ,
        f.notOwnInclude = function(e, t, n) {
            new c(e,n,f.notOwnInclude,!0).not.own.include(t)
        }
        ,
        f.deepOwnInclude = function(e, t, n) {
            new c(e,n,f.deepOwnInclude,!0).deep.own.include(t)
        }
        ,
        f.notDeepOwnInclude = function(e, t, n) {
            new c(e,n,f.notDeepOwnInclude,!0).not.deep.own.include(t)
        }
        ,
        f.match = function(e, t, n) {
            new c(e,n,f.match,!0).to.match(t)
        }
        ,
        f.notMatch = function(e, t, n) {
            new c(e,n,f.notMatch,!0).to.not.match(t)
        }
        ,
        f.property = function(e, t, n) {
            new c(e,n,f.property,!0).to.have.property(t)
        }
        ,
        f.notProperty = function(e, t, n) {
            new c(e,n,f.notProperty,!0).to.not.have.property(t)
        }
        ,
        f.propertyVal = function(e, t, n, r) {
            new c(e,r,f.propertyVal,!0).to.have.property(t, n)
        }
        ,
        f.notPropertyVal = function(e, t, n, r) {
            new c(e,r,f.notPropertyVal,!0).to.not.have.property(t, n)
        }
        ,
        f.deepPropertyVal = function(e, t, n, r) {
            new c(e,r,f.deepPropertyVal,!0).to.have.deep.property(t, n)
        }
        ,
        f.notDeepPropertyVal = function(e, t, n, r) {
            new c(e,r,f.notDeepPropertyVal,!0).to.not.have.deep.property(t, n)
        }
        ,
        f.ownProperty = function(e, t, n) {
            new c(e,n,f.ownProperty,!0).to.have.own.property(t)
        }
        ,
        f.notOwnProperty = function(e, t, n) {
            new c(e,n,f.notOwnProperty,!0).to.not.have.own.property(t)
        }
        ,
        f.ownPropertyVal = function(e, t, n, r) {
            new c(e,r,f.ownPropertyVal,!0).to.have.own.property(t, n)
        }
        ,
        f.notOwnPropertyVal = function(e, t, n, r) {
            new c(e,r,f.notOwnPropertyVal,!0).to.not.have.own.property(t, n)
        }
        ,
        f.deepOwnPropertyVal = function(e, t, n, r) {
            new c(e,r,f.deepOwnPropertyVal,!0).to.have.deep.own.property(t, n)
        }
        ,
        f.notDeepOwnPropertyVal = function(e, t, n, r) {
            new c(e,r,f.notDeepOwnPropertyVal,!0).to.not.have.deep.own.property(t, n)
        }
        ,
        f.nestedProperty = function(e, t, n) {
            new c(e,n,f.nestedProperty,!0).to.have.nested.property(t)
        }
        ,
        f.notNestedProperty = function(e, t, n) {
            new c(e,n,f.notNestedProperty,!0).to.not.have.nested.property(t)
        }
        ,
        f.nestedPropertyVal = function(e, t, n, r) {
            new c(e,r,f.nestedPropertyVal,!0).to.have.nested.property(t, n)
        }
        ,
        f.notNestedPropertyVal = function(e, t, n, r) {
            new c(e,r,f.notNestedPropertyVal,!0).to.not.have.nested.property(t, n)
        }
        ,
        f.deepNestedPropertyVal = function(e, t, n, r) {
            new c(e,r,f.deepNestedPropertyVal,!0).to.have.deep.nested.property(t, n)
        }
        ,
        f.notDeepNestedPropertyVal = function(e, t, n, r) {
            new c(e,r,f.notDeepNestedPropertyVal,!0).to.not.have.deep.nested.property(t, n)
        }
        ,
        f.lengthOf = function(e, t, n) {
            new c(e,n,f.lengthOf,!0).to.have.lengthOf(t)
        }
        ,
        f.hasAnyKeys = function(e, t, n) {
            new c(e,n,f.hasAnyKeys,!0).to.have.any.keys(t)
        }
        ,
        f.hasAllKeys = function(e, t, n) {
            new c(e,n,f.hasAllKeys,!0).to.have.all.keys(t)
        }
        ,
        f.containsAllKeys = function(e, t, n) {
            new c(e,n,f.containsAllKeys,!0).to.contain.all.keys(t)
        }
        ,
        f.doesNotHaveAnyKeys = function(e, t, n) {
            new c(e,n,f.doesNotHaveAnyKeys,!0).to.not.have.any.keys(t)
        }
        ,
        f.doesNotHaveAllKeys = function(e, t, n) {
            new c(e,n,f.doesNotHaveAllKeys,!0).to.not.have.all.keys(t)
        }
        ,
        f.hasAnyDeepKeys = function(e, t, n) {
            new c(e,n,f.hasAnyDeepKeys,!0).to.have.any.deep.keys(t)
        }
        ,
        f.hasAllDeepKeys = function(e, t, n) {
            new c(e,n,f.hasAllDeepKeys,!0).to.have.all.deep.keys(t)
        }
        ,
        f.containsAllDeepKeys = function(e, t, n) {
            new c(e,n,f.containsAllDeepKeys,!0).to.contain.all.deep.keys(t)
        }
        ,
        f.doesNotHaveAnyDeepKeys = function(e, t, n) {
            new c(e,n,f.doesNotHaveAnyDeepKeys,!0).to.not.have.any.deep.keys(t)
        }
        ,
        f.doesNotHaveAllDeepKeys = function(e, t, n) {
            new c(e,n,f.doesNotHaveAllDeepKeys,!0).to.not.have.all.deep.keys(t)
        }
        ,
        f.throws = function(e, t, n, r) {
            ("string" == typeof t || t instanceof RegExp) && (n = t,
            t = null);
            e = new c(e,r,f.throws,!0).to.throw(t, n);
            return u(e, "object")
        }
        ,
        f.doesNotThrow = function(e, t, n, r) {
            ("string" == typeof t || t instanceof RegExp) && (n = t,
            t = null),
            new c(e,r,f.doesNotThrow,!0).to.not.throw(t, n)
        }
        ,
        f.operator = function(e, t, n, r) {
            var o;
            switch (t) {
            case "==":
                o = e == n;
                break;
            case "===":
                o = e === n;
                break;
            case ">":
                o = n < e;
                break;
            case ">=":
                o = n <= e;
                break;
            case "<":
                o = e < n;
                break;
            case "<=":
                o = e <= n;
                break;
            case "!=":
                o = e != n;
                break;
            case "!==":
                o = e !== n;
                break;
            default:
                throw new a.AssertionError((r = r && r + ": ") + 'Invalid operator "' + t + '"',void 0,f.operator)
            }
            var i = new c(o,r,f.operator,!0);
            i.assert(!0 === u(i, "object"), "expected " + s.inspect(e) + " to be " + t + " " + s.inspect(n), "expected " + s.inspect(e) + " to not be " + t + " " + s.inspect(n))
        }
        ,
        f.closeTo = function(e, t, n, r) {
            new c(e,r,f.closeTo,!0).to.be.closeTo(t, n)
        }
        ,
        f.approximately = function(e, t, n, r) {
            new c(e,r,f.approximately,!0).to.be.approximately(t, n)
        }
        ,
        f.sameMembers = function(e, t, n) {
            new c(e,n,f.sameMembers,!0).to.have.same.members(t)
        }
        ,
        f.notSameMembers = function(e, t, n) {
            new c(e,n,f.notSameMembers,!0).to.not.have.same.members(t)
        }
        ,
        f.sameDeepMembers = function(e, t, n) {
            new c(e,n,f.sameDeepMembers,!0).to.have.same.deep.members(t)
        }
        ,
        f.notSameDeepMembers = function(e, t, n) {
            new c(e,n,f.notSameDeepMembers,!0).to.not.have.same.deep.members(t)
        }
        ,
        f.sameOrderedMembers = function(e, t, n) {
            new c(e,n,f.sameOrderedMembers,!0).to.have.same.ordered.members(t)
        }
        ,
        f.notSameOrderedMembers = function(e, t, n) {
            new c(e,n,f.notSameOrderedMembers,!0).to.not.have.same.ordered.members(t)
        }
        ,
        f.sameDeepOrderedMembers = function(e, t, n) {
            new c(e,n,f.sameDeepOrderedMembers,!0).to.have.same.deep.ordered.members(t)
        }
        ,
        f.notSameDeepOrderedMembers = function(e, t, n) {
            new c(e,n,f.notSameDeepOrderedMembers,!0).to.not.have.same.deep.ordered.members(t)
        }
        ,
        f.includeMembers = function(e, t, n) {
            new c(e,n,f.includeMembers,!0).to.include.members(t)
        }
        ,
        f.notIncludeMembers = function(e, t, n) {
            new c(e,n,f.notIncludeMembers,!0).to.not.include.members(t)
        }
        ,
        f.includeDeepMembers = function(e, t, n) {
            new c(e,n,f.includeDeepMembers,!0).to.include.deep.members(t)
        }
        ,
        f.notIncludeDeepMembers = function(e, t, n) {
            new c(e,n,f.notIncludeDeepMembers,!0).to.not.include.deep.members(t)
        }
        ,
        f.includeOrderedMembers = function(e, t, n) {
            new c(e,n,f.includeOrderedMembers,!0).to.include.ordered.members(t)
        }
        ,
        f.notIncludeOrderedMembers = function(e, t, n) {
            new c(e,n,f.notIncludeOrderedMembers,!0).to.not.include.ordered.members(t)
        }
        ,
        f.includeDeepOrderedMembers = function(e, t, n) {
            new c(e,n,f.includeDeepOrderedMembers,!0).to.include.deep.ordered.members(t)
        }
        ,
        f.notIncludeDeepOrderedMembers = function(e, t, n) {
            new c(e,n,f.notIncludeDeepOrderedMembers,!0).to.not.include.deep.ordered.members(t)
        }
        ,
        f.oneOf = function(e, t, n) {
            new c(e,n,f.oneOf,!0).to.be.oneOf(t)
        }
        ,
        f.changes = function(e, t, n, r) {
            3 === arguments.length && "function" == typeof t && (r = n,
            n = null),
            new c(e,r,f.changes,!0).to.change(t, n)
        }
        ,
        f.changesBy = function(e, t, n, r, o) {
            var i;
            4 === arguments.length && "function" == typeof t ? (i = r,
            r = n,
            o = i) : 3 === arguments.length && (r = n,
            n = null),
            new c(e,o,f.changesBy,!0).to.change(t, n).by(r)
        }
        ,
        f.doesNotChange = function(e, t, n, r) {
            return 3 === arguments.length && "function" == typeof t && (r = n,
            n = null),
            new c(e,r,f.doesNotChange,!0).to.not.change(t, n)
        }
        ,
        f.changesButNotBy = function(e, t, n, r, o) {
            var i;
            4 === arguments.length && "function" == typeof t ? (i = r,
            r = n,
            o = i) : 3 === arguments.length && (r = n,
            n = null),
            new c(e,o,f.changesButNotBy,!0).to.change(t, n).but.not.by(r)
        }
        ,
        f.increases = function(e, t, n, r) {
            return 3 === arguments.length && "function" == typeof t && (r = n,
            n = null),
            new c(e,r,f.increases,!0).to.increase(t, n)
        }
        ,
        f.increasesBy = function(e, t, n, r, o) {
            var i;
            4 === arguments.length && "function" == typeof t ? (i = r,
            r = n,
            o = i) : 3 === arguments.length && (r = n,
            n = null),
            new c(e,o,f.increasesBy,!0).to.increase(t, n).by(r)
        }
        ,
        f.doesNotIncrease = function(e, t, n, r) {
            return 3 === arguments.length && "function" == typeof t && (r = n,
            n = null),
            new c(e,r,f.doesNotIncrease,!0).to.not.increase(t, n)
        }
        ,
        f.increasesButNotBy = function(e, t, n, r, o) {
            var i;
            4 === arguments.length && "function" == typeof t ? (i = r,
            r = n,
            o = i) : 3 === arguments.length && (r = n,
            n = null),
            new c(e,o,f.increasesButNotBy,!0).to.increase(t, n).but.not.by(r)
        }
        ,
        f.decreases = function(e, t, n, r) {
            return 3 === arguments.length && "function" == typeof t && (r = n,
            n = null),
            new c(e,r,f.decreases,!0).to.decrease(t, n)
        }
        ,
        f.decreasesBy = function(e, t, n, r, o) {
            var i;
            4 === arguments.length && "function" == typeof t ? (i = r,
            r = n,
            o = i) : 3 === arguments.length && (r = n,
            n = null),
            new c(e,o,f.decreasesBy,!0).to.decrease(t, n).by(r)
        }
        ,
        f.doesNotDecrease = function(e, t, n, r) {
            return 3 === arguments.length && "function" == typeof t && (r = n,
            n = null),
            new c(e,r,f.doesNotDecrease,!0).to.not.decrease(t, n)
        }
        ,
        f.doesNotDecreaseBy = function(e, t, n, r, o) {
            var i;
            return 4 === arguments.length && "function" == typeof t ? (i = r,
            r = n,
            o = i) : 3 === arguments.length && (r = n,
            n = null),
            new c(e,o,f.doesNotDecreaseBy,!0).to.not.decrease(t, n).by(r)
        }
        ,
        f.decreasesButNotBy = function(e, t, n, r, o) {
            var i;
            4 === arguments.length && "function" == typeof t ? (i = r,
            r = n,
            o = i) : 3 === arguments.length && (r = n,
            n = null),
            new c(e,o,f.decreasesButNotBy,!0).to.decrease(t, n).but.not.by(r)
        }
        ,
        f.ifError = function(e) {
            if (e)
                throw e
        }
        ,
        f.isExtensible = function(e, t) {
            new c(e,t,f.isExtensible,!0).to.be.extensible
        }
        ,
        f.isNotExtensible = function(e, t) {
            new c(e,t,f.isNotExtensible,!0).to.not.be.extensible
        }
        ,
        f.isSealed = function(e, t) {
            new c(e,t,f.isSealed,!0).to.be.sealed
        }
        ,
        f.isNotSealed = function(e, t) {
            new c(e,t,f.isNotSealed,!0).to.not.be.sealed
        }
        ,
        f.isFrozen = function(e, t) {
            new c(e,t,f.isFrozen,!0).to.be.frozen
        }
        ,
        f.isNotFrozen = function(e, t) {
            new c(e,t,f.isNotFrozen,!0).to.not.be.frozen
        }
        ,
        f.isEmpty = function(e, t) {
            new c(e,t,f.isEmpty,!0).to.be.empty
        }
        ,
        f.isNotEmpty = function(e, t) {
            new c(e,t,f.isNotEmpty,!0).to.not.be.empty
        }
        ,
        function e(t, n) {
            return f[n] = f[t],
            e
        }("isOk", "ok")("isNotOk", "notOk")("throws", "throw")("throws", "Throw")("isExtensible", "extensible")("isNotExtensible", "notExtensible")("isSealed", "sealed")("isNotSealed", "notSealed")("isFrozen", "frozen")("isNotFrozen", "notFrozen")("isEmpty", "empty")("isNotEmpty", "notEmpty")
    }
    var Vo, Wo = S;
    function M() {
        return Vo || (Vo = 1,
        n = [],
        (t = Ve).version = "4.3.3",
        t.AssertionError = Je,
        r = Co(),
        t.use = function(e) {
            return ~n.indexOf(e) || (e(t, r),
            n.push(e)),
            t
        }
        ,
        t.util = r,
        e = S,
        t.config = e,
        e = Ro,
        t.use(e),
        e = Fo,
        t.use(e),
        e = zo,
        t.use(e),
        e = Lo,
        t.use(e),
        e = qo,
        t.use(e)),
        Ve;
        var t, n, r, e
    }
    O = W(M());
    O.expect,
    O.version,
    O.Assertion,
    O.AssertionError,
    O.util,
    O.config,
    O.use,
    O.should;
    const Jo = O.assert
      , $o = (O.core,
    e=>async function(r, o, e="background") {
        const i = "string" == typeof e ? Fe(e) : e;
        if (i.context)
            return new Promise((e,t)=>{
                var n = {
                    messageID: r,
                    data: o,
                    destination: i,
                    messageType: "message",
                    transactionId: Ne.exports(),
                    origin: {
                        context: d,
                        tabId: null
                    },
                    hops: [],
                    timestamp: Date.now()
                };
                Be.set(n.transactionId, {
                    resolve: e,
                    reject: t
                }),
                Ue(n)
            }
            );
        throw new TypeError("Bridge#sendMessage -> Destination must be any one of known destinations")
    }(ze.WINDOW_REQUEST, e, Le.background).then(e=>e))
      , Go = (e,t)=>$o({
        provider: e,
        message: t
    }).then(e=>e.error ? Promise.reject(JSON.parse(e.error)) : JSON.parse(e.result));
    var Ho, N, Or = {
        exports: {}
    };
    function Ko() {}
    function Qo(e, t, n) {
        this.fn = e,
        this.context = t,
        this.once = n || !1
    }
    function Yo(e, t, n, r, o) {
        if ("function" != typeof n)
            throw new TypeError("The listener must be a function");
        n = new Qo(n,r || e,o),
        r = N ? N + t : t;
        return e._events[r] ? e._events[r].fn ? e._events[r] = [e._events[r], n] : e._events[r].push(n) : (e._events[r] = n,
        e._eventsCount++),
        e
    }
    function Zo(e, t) {
        0 == --e._eventsCount ? e._events = new Ko : delete e._events[t]
    }
    function k() {
        this._events = new Ko,
        this._eventsCount = 0
    }
    A = Or,
    Ho = Object.prototype.hasOwnProperty,
    N = "~",
    Object.create && (Ko.prototype = Object.create(null),
    (new Ko).__proto__ || (N = !1)),
    k.prototype.eventNames = function() {
        var e, t, n = [];
        if (0 === this._eventsCount)
            return n;
        for (t in e = this._events)
            Ho.call(e, t) && n.push(N ? t.slice(1) : t);
        return Object.getOwnPropertySymbols ? n.concat(Object.getOwnPropertySymbols(e)) : n
    }
    ,
    k.prototype.listeners = function(e) {
        var e = N ? N + e : e
          , t = this._events[e];
        if (!t)
            return [];
        if (t.fn)
            return [t.fn];
        for (var n = 0, r = t.length, o = new Array(r); n < r; n++)
            o[n] = t[n].fn;
        return o
    }
    ,
    k.prototype.listenerCount = function(e) {
        e = N ? N + e : e,
        e = this._events[e];
        return e ? e.fn ? 1 : e.length : 0
    }
    ,
    k.prototype.emit = function(e, t, n, r, o, i) {
        var a = N ? N + e : e;
        if (!this._events[a])
            return !1;
        var s, c = this._events[a], u = arguments.length;
        if (c.fn) {
            switch (c.once && this.removeListener(e, c.fn, void 0, !0),
            u) {
            case 1:
                return c.fn.call(c.context),
                !0;
            case 2:
                return c.fn.call(c.context, t),
                !0;
            case 3:
                return c.fn.call(c.context, t, n),
                !0;
            case 4:
                return c.fn.call(c.context, t, n, r),
                !0;
            case 5:
                return c.fn.call(c.context, t, n, r, o),
                !0;
            case 6:
                return c.fn.call(c.context, t, n, r, o, i),
                !0
            }
            for (l = 1,
            s = new Array(u - 1); l < u; l++)
                s[l - 1] = arguments[l];
            c.fn.apply(c.context, s)
        } else
            for (var f, p = c.length, l = 0; l < p; l++)
                switch (c[l].once && this.removeListener(e, c[l].fn, void 0, !0),
                u) {
                case 1:
                    c[l].fn.call(c[l].context);
                    break;
                case 2:
                    c[l].fn.call(c[l].context, t);
                    break;
                case 3:
                    c[l].fn.call(c[l].context, t, n);
                    break;
                case 4:
                    c[l].fn.call(c[l].context, t, n, r);
                    break;
                default:
                    if (!s)
                        for (f = 1,
                        s = new Array(u - 1); f < u; f++)
                            s[f - 1] = arguments[f];
                    c[l].fn.apply(c[l].context, s)
                }
        return !0
    }
    ,
    k.prototype.on = function(e, t, n) {
        return Yo(this, e, t, n, !1)
    }
    ,
    k.prototype.once = function(e, t, n) {
        return Yo(this, e, t, n, !0)
    }
    ,
    k.prototype.removeListener = function(e, t, n, r) {
        e = N ? N + e : e;
        if (!this._events[e])
            return this;
        if (!t)
            return Zo(this, e),
            this;
        var o = this._events[e];
        if (o.fn)
            o.fn !== t || r && !o.once || n && o.context !== n || Zo(this, e);
        else {
            for (var i = 0, a = [], s = o.length; i < s; i++)
                (o[i].fn !== t || r && !o[i].once || n && o[i].context !== n) && a.push(o[i]);
            a.length ? this._events[e] = 1 === a.length ? a[0] : a : Zo(this, e)
        }
        return this
    }
    ,
    k.prototype.removeAllListeners = function(e) {
        return e ? (e = N ? N + e : e,
        this._events[e] && Zo(this, e)) : (this._events = new Ko,
        this._eventsCount = 0),
        this
    }
    ,
    k.prototype.off = k.prototype.removeListener,
    k.prototype.addListener = k.prototype.on,
    k.prefixed = N,
    A.exports = k.EventEmitter = k;
    var Xo, ei, ti, ni, B, g = Or.exports;
    (e = Xo = Xo || {}).samara = "samara",
    e.radiant = "radiant",
    (ei = ei || {}).persistentEvents = "PersistentEvents",
    (O = ti = ti || {})[O.evm = 0] = "evm",
    O[O.radiant = 1] = "radiant",
    (e = ni = ni || {}).changeChainId = "changeChainId",
    e.changeAddress = "changeAddress",
    e.changeConnected = "changeConnected",
    e.subscription = "eth_subscription",
    (O = B = B || {}).accountsChanged = "accountsChanged",
    O.chainChanged = "chainChanged",
    O.connect = "connect",
    O.disconnect = "disconnect",
    O.message = "message";
    const ri = {
        4001: {
            name: "User Rejected Request",
            description: "The user rejected the request."
        },
        4100: {
            name: "Unauthorized",
            description: "\tThe requested method and/or account has not been authorized by the user."
        },
        4200: {
            name: "Unsupported Method",
            description: "The Provider does not support the requested method."
        },
        4900: {
            name: "Disconnected",
            description: "The Provider is disconnected from all chains."
        },
        4901: {
            name: "Chain Disconnected",
            description: "The Provider is not connected to the requested chain."
        }
    }
      , oi = {}
      , ii = (e,t)=>{
        try {
            const u = e;
            var n, r, o = JSON.parse(t);
            if (o.method === ni.changeConnected) {
                var i, a = o.params[0];
                (u.connected = a) ? (i = {
                    chainId: o.params[1]
                },
                u.chainId !== i.chainId && (u.chainId = i.chainId,
                u.emit(B.chainChanged, i.chainId)),
                u.emit(B.connect, i)) : u.emit(B.disconnect, ((e,t)=>{
                    Jo(ri[e], "error code is invalid");
                    const n = {
                        code: e,
                        message: ri[e].name + ": " + ri[e].description
                    };
                    return t && (n.data = t),
                    n
                }
                )(o.params[1]))
            } else if (o.method === ni.changeChainId) {
                var s = o.params[0];
                u.chainId !== s && (u.chainId = s,
                u.emit(B.chainChanged, s))
            } else if (o.method === ni.changeAddress) {
                var c = o.params[0];
                u.selectedAddress !== c && (u.selectedAddress = c,
                u.emit(B.accountsChanged, [c]))
            } else if (o.method === ni.subscription) {
                const f = o.params;
                oi[f.subscription] && (f.subscription = oi[f.subscription]),
                u.emit(B.message, {
                    data: f,
                    type: o.method
                })
            } else
                o.method === ei.persistentEvents ? "eth_subscribe" === o.params[0].method ? (n = o.params[1],
                r = o.params[2],
                oi[JSON.parse(r)] = JSON.parse(n)) : console.error("Unable to process persistentEvent:" + t) : console.error("Unable to process message:" + t)
        } catch (e) {
            console.error(e)
        }
    }
    ;
    class ai extends g {
        chainId;
        networkVersion;
        isSamara;
        isMetaMask;
        selectedAddress;
        connected;
        name;
        type;
        version = n;
        autoRefreshOnNetworkChange = !1;
        sendMessageHandler;
        constructor(e) {
            super(),
            this.chainId = null,
            this.networkVersion = "0x1",
            this.isSamara = !0,
            this.isMetaMask = !0,
            this.selectedAddress = null,
            this.connected = !0,
            this.name = e.name,
            this.type = e.type,
            this.sendMessageHandler = e.sendMessageHandler
        }
        async request(e) {
            return null === this.chainId && await this.sendMessageHandler(this.name, JSON.stringify({
                method: "eth_chainId"
            })).then(e=>{
                this.chainId = e,
                this.networkVersion = e
            }
            ),
            null === this.selectedAddress && "eth_requestAccounts" === e.method ? this.sendMessageHandler(this.name, JSON.stringify(e)).then(e=>(this.selectedAddress = e[0],
            e)) : this.sendMessageHandler(this.name, JSON.stringify(e))
        }
        enable() {
            return this.request({
                method: "eth_requestAccounts"
            })
        }
        isConnected() {
            return this.connected
        }
        send(e, t) {
            return this.request({
                method: e,
                params: t
            })
        }
        sendAsync(t, n) {
            var {method: e, params: r} = t;
            this.request({
                method: e,
                params: r
            }).then(e=>{
                n(null, {
                    id: t.id,
                    jsonrpc: "2.0",
                    result: e
                })
            }
            ).catch(e=>n(e))
        }
        handleMessage(e) {
            ii(this, e)
        }
    }
    const si = {
        proxymethods: ["request", "sendAsync", "send"],
        writableVars: ["autoRefreshOnNetworkChange"],
        ownKeys(e) {
            return Object.keys(e).concat(this.proxymethods)
        },
        set(e, t, n) {
            return this.ownKeys(e).includes(t) || this.proxymethods.push(t),
            Reflect.set(e, t, n)
        },
        getOwnPropertyDescriptor(e, t) {
            return {
                value: this.get(e, t),
                configurable: !0,
                writable: this.writableVars.includes(t),
                enumerable: !0
            }
        },
        get(e, t) {
            return "function" == typeof e[t] ? e[t].bind(e) : e[t]
        },
        has(e, t) {
            return this.ownKeys(e).includes(t)
        }
    };
    var ci, _, ui = "9EF100006F200F87AB417ABBD87C2EEEE16E6F1E491C2337C082411A2CADAD6D", e = (window.samara = {
        providers: {},
        settings: {}
    },
    document.getElementById(_.main));
    const fi = new URL(e.src);
    window.samara.settings = JSON.parse(fi.searchParams.get("settings")),
    ci = async e=>{
        window.samara.providers[e.provider].handleMessage(e.message)
    }
    ,
    O = ze.WINDOW_REQUEST,
    g = async e=>{
        Jo("background" === e.sender.context, "Message didnt come from background");
        const t = e.data;
        return t.sender = e.sender,
        ci(t)
    }
    ,
    _e.set(O, g),
    window.addEventListener("load", ()=>{
        Go(Xo.samara, JSON.stringify({
            method: qe.newWindowInit
        }))
    }
    ),
    window.addEventListener("beforeunload", ()=>{
        Go(Xo.samara, JSON.stringify({
            method: qe.newWindowUnload
        }))
    }
    ),
    console.info("hello from injected code"),
    n = window,
    _ = {
        name: Xo.radiant,
        type: ti.radiant,
        sendMessageHandler: Go
    },
    e = new ai(_),
    n.samara.settings.rvm.inject.disabled || (n[_.name] = new Proxy(e,si)),
    n.samara.providers[_.name] = e
}();
