var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(r) {
    return typeof r;
} : function(r) {
    return r && "function" == typeof Symbol && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
}, t = "object" === ("undefined" == typeof window ? "undefined" : r(window)) ? window : {}, e = !t.HI_BASE64_NO_NODE_JS && "object" === ("undefined" == typeof process ? "undefined" : r(process)) && process.versions && process.versions.node;

e && (t = global);

var o, n, a = !t.HI_BASE64_NO_COMMON_JS && "object" === ("undefined" == typeof module ? "undefined" : r(module)) && module.exports, i = "function" == typeof define && define.amd, f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""), h = {
    A: 0,
    B: 1,
    C: 2,
    D: 3,
    E: 4,
    F: 5,
    G: 6,
    H: 7,
    I: 8,
    J: 9,
    K: 10,
    L: 11,
    M: 12,
    N: 13,
    O: 14,
    P: 15,
    Q: 16,
    R: 17,
    S: 18,
    T: 19,
    U: 20,
    V: 21,
    W: 22,
    X: 23,
    Y: 24,
    Z: 25,
    a: 26,
    b: 27,
    c: 28,
    d: 29,
    e: 30,
    f: 31,
    g: 32,
    h: 33,
    i: 34,
    j: 35,
    k: 36,
    l: 37,
    m: 38,
    n: 39,
    o: 40,
    p: 41,
    q: 42,
    r: 43,
    s: 44,
    t: 45,
    u: 46,
    v: 47,
    w: 48,
    x: 49,
    y: 50,
    z: 51,
    0: 52,
    1: 53,
    2: 54,
    3: 55,
    4: 56,
    5: 57,
    6: 58,
    7: 59,
    8: 60,
    9: 61,
    "+": 62,
    "/": 63,
    "-": 62,
    _: 63
}, c = function(r) {
    for (var t = [], e = 0; e < r.length; e++) {
        var o = r.charCodeAt(e);
        o < 128 ? t[t.length] = o : o < 2048 ? (t[t.length] = 192 | o >> 6, t[t.length] = 128 | 63 & o) : o < 55296 || o >= 57344 ? (t[t.length] = 224 | o >> 12, 
        t[t.length] = 128 | o >> 6 & 63, t[t.length] = 128 | 63 & o) : (o = 65536 + ((1023 & o) << 10 | 1023 & r.charCodeAt(++e)), 
        t[t.length] = 240 | o >> 18, t[t.length] = 128 | o >> 12 & 63, t[t.length] = 128 | o >> 6 & 63, 
        t[t.length] = 128 | 63 & o);
    }
    return t;
}, d = function(r) {
    var t, e, o, n, a = [], i = 0, f = r.length;
    "=" === r.charAt(f - 2) ? f -= 2 : "=" === r.charAt(f - 1) && (f -= 1);
    for (var c = 0, d = f >> 2 << 2; c < d; ) t = h[r.charAt(c++)], e = h[r.charAt(c++)], 
    o = h[r.charAt(c++)], n = h[r.charAt(c++)], a[i++] = 255 & (t << 2 | e >>> 4), a[i++] = 255 & (e << 4 | o >>> 2), 
    a[i++] = 255 & (o << 6 | n);
    var u = f - d;
    return 2 === u ? (t = h[r.charAt(c++)], e = h[r.charAt(c++)], a[i++] = 255 & (t << 2 | e >>> 4)) : 3 === u && (t = h[r.charAt(c++)], 
    e = h[r.charAt(c++)], o = h[r.charAt(c++)], a[i++] = 255 & (t << 2 | e >>> 4), a[i++] = 255 & (e << 4 | o >>> 2)), 
    a;
}, u = function(r) {
    for (var t, e, o, n = "", a = r.length, i = 0, h = 3 * parseInt(a / 3); i < h; ) t = r[i++], 
    e = r[i++], o = r[i++], n += f[t >>> 2] + f[63 & (t << 4 | e >>> 4)] + f[63 & (e << 2 | o >>> 6)] + f[63 & o];
    var c = a - h;
    return 1 === c ? (t = r[i], n += f[t >>> 2] + f[t << 4 & 63] + "==") : 2 === c && (t = r[i++], 
    e = r[i], n += f[t >>> 2] + f[63 & (t << 4 | e >>> 4)] + f[e << 2 & 63] + "="), 
    n;
}, C = t.btoa, g = t.atob;

if (e) {
    var s = require("buffer").Buffer;
    C = function(r) {
        return new s(r, "ascii").toString("base64");
    }, u = o = function(r) {
        return new s(r).toString("base64");
    }, g = function(r) {
        return new s(r, "base64").toString("ascii");
    }, n = function(r) {
        return new s(r, "base64").toString();
    };
} else C ? (o = function(r) {
    for (var t = "", e = 0; e < r.length; e++) {
        var o = r.charCodeAt(e);
        o < 128 ? t += String.fromCharCode(o) : o < 2048 ? t += String.fromCharCode(192 | o >> 6) + String.fromCharCode(128 | 63 & o) : o < 55296 || o >= 57344 ? t += String.fromCharCode(224 | o >> 12) + String.fromCharCode(128 | o >> 6 & 63) + String.fromCharCode(128 | 63 & o) : (o = 65536 + ((1023 & o) << 10 | 1023 & r.charCodeAt(++e)), 
        t += String.fromCharCode(240 | o >> 18) + String.fromCharCode(128 | o >> 12 & 63) + String.fromCharCode(128 | o >> 6 & 63) + String.fromCharCode(128 | 63 & o));
    }
    return C(t);
}, n = function(r) {
    var t = g(r.trim("=").replace(/-/g, "+").replace(/_/g, "/"));
    if (!/[^\x00-\x7F]/.test(t)) return t;
    for (var e, o, n = "", a = 0, i = t.length, f = 0; a < i; ) if ((e = t.charCodeAt(a++)) <= 127) n += String.fromCharCode(e); else {
        if (e > 191 && e <= 223) o = 31 & e, f = 1; else if (e <= 239) o = 15 & e, f = 2; else {
            if (!(e <= 247)) throw "not a UTF-8 string";
            o = 7 & e, f = 3;
        }
        for (var h = 0; h < f; ++h) {
            if ((e = t.charCodeAt(a++)) < 128 || e > 191) throw "not a UTF-8 string";
            o <<= 6, o += 63 & e;
        }
        if (o >= 55296 && o <= 57343) throw "not a UTF-8 string";
        if (o > 1114111) throw "not a UTF-8 string";
        o <= 65535 ? n += String.fromCharCode(o) : (o -= 65536, n += String.fromCharCode(55296 + (o >> 10)), 
        n += String.fromCharCode(56320 + (1023 & o)));
    }
    return n;
}) : (C = function(r) {
    for (var t, e, o, n = "", a = r.length, i = 0, h = 3 * parseInt(a / 3); i < h; ) t = r.charCodeAt(i++), 
    e = r.charCodeAt(i++), o = r.charCodeAt(i++), n += f[t >>> 2] + f[63 & (t << 4 | e >>> 4)] + f[63 & (e << 2 | o >>> 6)] + f[63 & o];
    var c = a - h;
    return 1 === c ? (t = r.charCodeAt(i), n += f[t >>> 2] + f[t << 4 & 63] + "==") : 2 === c && (t = r.charCodeAt(i++), 
    e = r.charCodeAt(i), n += f[t >>> 2] + f[63 & (t << 4 | e >>> 4)] + f[e << 2 & 63] + "="), 
    n;
}, o = function(r) {
    for (var t, e, o, n = "", a = c(r), i = a.length, h = 0, d = 3 * parseInt(i / 3); h < d; ) t = a[h++], 
    e = a[h++], o = a[h++], n += f[t >>> 2] + f[63 & (t << 4 | e >>> 4)] + f[63 & (e << 2 | o >>> 6)] + f[63 & o];
    var u = i - d;
    return 1 === u ? (t = a[h], n += f[t >>> 2] + f[t << 4 & 63] + "==") : 2 === u && (t = a[h++], 
    e = a[h], n += f[t >>> 2] + f[63 & (t << 4 | e >>> 4)] + f[e << 2 & 63] + "="), 
    n;
}, g = function(r) {
    var t, e, o, n, a = "", i = r.length;
    "=" === r.charAt(i - 2) ? i -= 2 : "=" === r.charAt(i - 1) && (i -= 1);
    for (var f = 0, c = i >> 2 << 2; f < c; ) t = h[r.charAt(f++)], e = h[r.charAt(f++)], 
    o = h[r.charAt(f++)], n = h[r.charAt(f++)], a += String.fromCharCode(255 & (t << 2 | e >>> 4)) + String.fromCharCode(255 & (e << 4 | o >>> 2)) + String.fromCharCode(255 & (o << 6 | n));
    var d = i - c;
    return 2 === d ? (t = h[r.charAt(f++)], e = h[r.charAt(f++)], a += String.fromCharCode(255 & (t << 2 | e >>> 4))) : 3 === d && (t = h[r.charAt(f++)], 
    e = h[r.charAt(f++)], o = h[r.charAt(f++)], a += String.fromCharCode(255 & (t << 2 | e >>> 4)) + String.fromCharCode(255 & (e << 4 | o >>> 2))), 
    a;
}, n = function(r) {
    for (var t, e, o = "", n = d(r), a = n.length, i = 0, f = 0; i < a; ) if ((t = n[i++]) <= 127) o += String.fromCharCode(t); else {
        if (t > 191 && t <= 223) e = 31 & t, f = 1; else if (t <= 239) e = 15 & t, f = 2; else {
            if (!(t <= 247)) throw "not a UTF-8 string";
            e = 7 & t, f = 3;
        }
        for (var h = 0; h < f; ++h) {
            if ((t = n[i++]) < 128 || t > 191) throw "not a UTF-8 string";
            e <<= 6, e += 63 & t;
        }
        if (e >= 55296 && e <= 57343) throw "not a UTF-8 string";
        if (e > 1114111) throw "not a UTF-8 string";
        e <= 65535 ? o += String.fromCharCode(e) : (e -= 65536, o += String.fromCharCode(55296 + (e >> 10)), 
        o += String.fromCharCode(56320 + (1023 & e)));
    }
    return o;
});

var l = function(r, t) {
    if (!r) return "";
    try {
        var e = r;
        return r == this.encode(n(e)) ? n(r) : r;
    } catch (t) {
        return r;
    }
};

l.bytes = d, l.string = l, a ? module.exports = exports : (t.base64 = exports, i && define(function() {
    return exports;
})), module.exports = {
    encode: function(r, e) {
        if (!r) return "";
        var n = "string" != typeof r;
        return n && r.constructor === t.ArrayBuffer && (r = new Uint8Array(r)), n ? u(r) : !e && /[^\x00-\x7F]/.test(r) ? o(r) : C(r);
    },
    decode: l,
    atob: g,
    btoa: C
};