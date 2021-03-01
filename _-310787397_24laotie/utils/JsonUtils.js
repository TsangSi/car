function r(r) {
    var t = Object.create(null), e = !0, o = !1, a = void 0;
    try {
        for (var i, u = r[Symbol.iterator](); !(e = (i = u.next()).done); e = !0) {
            var f = n(i.value, 2), l = f[0], c = f[1];
            t[l] = c;
        }
    } catch (r) {
        o = !0, a = r;
    } finally {
        try {
            !e && u.return && u.return();
        } finally {
            if (o) throw a;
        }
    }
    return t;
}

function t(r) {
    var t = new Map(), n = !0, e = !1, o = void 0;
    try {
        for (var a, i = Object.keys(r)[Symbol.iterator](); !(n = (a = i.next()).done); n = !0) {
            var u = a.value;
            t.set(u, r[u]);
        }
    } catch (r) {
        e = !0, o = r;
    } finally {
        try {
            !n && i.return && i.return();
        } finally {
            if (e) throw o;
        }
    }
    return t;
}

var n = function() {
    function r(r, t) {
        var n = [], e = !0, o = !1, a = void 0;
        try {
            for (var i, u = r[Symbol.iterator](); !(e = (i = u.next()).done) && (n.push(i.value), 
            !t || n.length !== t); e = !0) ;
        } catch (r) {
            o = !0, a = r;
        } finally {
            try {
                !e && u.return && u.return();
            } finally {
                if (o) throw a;
            }
        }
        return n;
    }
    return function(t, n) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return r(t, n);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}();

module.exports = {
    stringToJson: function(r) {
        return JSON.parse(r);
    },
    jsonToString: function(r) {
        return JSON.stringify(r);
    },
    mapToJson: function(t) {
        return JSON.stringify(r(t));
    },
    jsonToMap: function(r) {
        return t(JSON.parse(r));
    },
    strMapToObj: r,
    objToStrMap: t
};