function i(e) {
	return u(e) || c(e) || s(e) || a()
}
function a() {
	throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function s(e, t) {
	if (e) {
		if ("string" == typeof e) return f(e, t);
		var n = Object.prototype.toString.call(e).slice(8, -1);
		return ("Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? f(e, t) : void 0)
	}
}
function c(e) {
	if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e)
}
function u(e) {
	if (Array.isArray(e)) return f(e)
}
function f(e, t) {
	(null == t || t > e.length) && (t = e.length);
	for (var n = 0,
		r = new Array(t); n < t; n++) r[n] = e[n];
	return r
}
function l(e, t) {
	for (var n = 0; n < t.length; n++) {
		var r = t[n]; (r.enumerable = r.enumerable || !1),
			(r.configurable = !0),
			"value" in r && (r.writable = !0),
			Object.defineProperty(e, r.key, r)
	}
}
function p(e, t, n) {
	return t && l(e.prototype, t),
		n && l(e, n),
		e
}
function d(e, t, n) {
	return (t in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0,
	}) : (e[t] = n), e)
}
function h(e, t) {
	if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function v(e, t) {
	if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function"); (e.prototype = Object.create(t && t.prototype, {
		constructor: {
			value: e,
			writable: !0,
			configurable: !0,
		},
	})),
		t && k(e, t)
}
function y(e) {
	var t = w();
	return function () {
		var n, r = S(e);
		if (t) {
			var o = S(this).constructor;
			n = Reflect.construct(r, arguments, o)
		} else n = r.apply(this, arguments);
		return g(this, n)
	}
}
function g(t, n) {
	return !n || ("object" !== (void 0 === n ? "undefined" : e(n)) && "function" != typeof n) ? _(t) : n
}
function _(e) {
	if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	return e
}
function m(e) {
	var t = "function" == typeof Map ? new Map() : void 0;
	return (m = function (e) {
		function n() {
			return b(e, arguments, S(this).constructor)
		}
		if (null === e || !O(e)) return e;
		if ("function" != typeof e) throw new TypeError("Super expression must either be null or a function");
		if (void 0 !== t) {
			if (t.has(e)) return t.get(e);
			t.set(e, n)
		}
		return ((n.prototype = Object.create(e.prototype, {
			constructor: {
				value: n,
				enumerable: !1,
				writable: !0,
				configurable: !0,
			},
		})), k(n, e))
	})(e)
}
function b(e, t, n) {
	return (b = w() ? Reflect.construct : function (e, t, n) {
		var r = [null];
		r.push.apply(r, t);
		var o = new (Function.bind.apply(e, r))();
		return n && k(o, n.prototype),
			o
	}).apply(null, arguments)
}
function w() {
	if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
	if (Reflect.construct.sham) return !1;
	if ("function" == typeof Proxy) return !0;
	try {
		return (Date.prototype.toString.call(Reflect.construct(Date, [],
			function () { })), !0)
	} catch (e) {
		return !1
	}
}
function O(e) {
	return - 1 !== Function.toString.call(e).indexOf("[native code]")
}
function k(e, t) {
	return (k = Object.setPrototypeOf ||
		function (e, t) {
			return (e.__proto__ = t),
				e
		})(e, t)
}
function S(e) {
	return (S = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
		return e.__proto__ || Object.getPrototypeOf(e)
	})(e)
}
function A(e, t, n) {
	return (e((n = {
		path: t,
		exports: {},
		require: function (e, t) {
			return (function () {
				throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
			})(null == t && n.path)
		},
	}), n.exports), n.exports)
}
function E(e) {
	return function (t) {
		if (!((t = t || {}).success || t.fail || t.complete)) return e.call(this, t);
		e.call(this, t).then(function (e) {
			t.success && t.success(e),
				t.complete && t.complete(e)
		}).
			catch(function (e) {
				t.fail && t.fail(e),
					t.complete && t.complete(e)
			})
	}
}
function T() {
	for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 8, t = ""; t.length < e;) t += Math.random().toString(32).substring(2);
	return t.substring(0, e)
}
function j() {
	if ("n" === P()) {
		try {
			D = plus.runtime.getDCloudId()
		} catch (e) {
			D = ""
		}
		return D
	}
	return (D || ((D = T(32)), o.setStorage({
		key: "__DC_CLOUD_UUID",
		data: D,
	})), D)
}
function P() {
	var e;
	return ((e = {
		"app-plus": "n",
		h5: "h5",
		"mp-weixin": "wx",
	}), d(e, ["y", "a", "p", "mp-ali"].reverse().join(""), "ali"), d(e, "mp-baidu", "bd"), d(e, "mp-toutiao", "tt"), d(e, "mp-qq", "qq"), d(e, "quickapp-native", "qn"), e)["mp-weixin"]
}
function x(e, t, n) {
	void 0 === n && (n = {});
	var r = /\?/.test(t),
		o = "";
	for (var i in n) "" === o ? !r && (t += "?") : (o += "&"),
		(o += i + "=" + encodeURIComponent(n[i]));
	return /^http(s)?:\/\//.test((t += o)) ? t : "" + e + t
}
function $(e) {
	we || ((we = {
		PLATFORM: "mp-weixin",
		OS: R,
		APPID: N.appid,
		CLIENT_SDK_VERSION: "1.0.0",
	}), (Oe = {
		ak: N.appid,
		p: "android" === R ? "a" : "i",
		ut: P(),
		uuid: j(),
	}));
	var t = JSON.parse(JSON.stringify(e.data || {})),
		n = e.name,
		r = this.config.spaceId,
		o = {
			tencent: "t",
			aliyun: "a",
		}[this.config.provider],
		i = Object.assign({},
			Oe, {
			fn: n,
			sid: r,
			pvd: o,
		});
	if ((Object.assign(t, {
		clientInfo: we,
		uniCloudClientInfo: encodeURIComponent(JSON.stringify(i)),
	}), !t.uniIdToken)) {
		var a = V.getStorageSync("uni_id_token") || V.getStorageSync("uniIdToken");
		a && (t.uniIdToken = a)
	}
	return (e.data = t),
		e
}
function I(e, t) {
	return ((e.then = "DoNotReturnProxyWithAFunctionNamedThen"), (e._internalType = Ee), new Proxy(e, {
		get: function (e, n, r) {
			return (function (e, t) {
				return Object.prototype.hasOwnProperty.call(e, t)
			})(e, n) || e[n] || "string" != typeof n ? e[n] : t.get(e, n, r)
		},
	}))
}
function C(e) {
	switch (((t = e), Object.prototype.toString.call(t).slice(8, -1).toLowerCase())) {
		case "array":
			return e.map(function (e) {
				return C(e)
			});
		case "object":
			return (e._internalType === Ee || Object.keys(e).forEach(function (t) {
				e[t] = C(e[t])
			}), e);
		case "regexp":
			return {
				$regexp:
				{
					source:
						e.source,
					flags: e.flags,
				},
			};
		case "date":
			return {
				$date:
					e.toISOString(),
			};
		default:
			return e
	}
	var t
}
var L = A(function (e, t) {
	var n;
	e.exports = n = n || (function (e, t) {
		var n = Object.create || (function () {
			function e() { }
			return function (t) {
				var n;
				return ((e.prototype = t), (n = new e()), (e.prototype = null), n)
			}
		})(),
			r = {},
			o = (r.lib = {}),
			i = (o.Base = {
				extend: function (e) {
					var t = n(this);
					return (e && t.mixIn(e), (t.hasOwnProperty("init") && this.init !== t.init) || (t.init = function () {
						t.$super.init.apply(this, arguments)
					}), (t.init.prototype = t), (t.$super = this), t)
				},
				create: function () {
					var e = this.extend();
					return e.init.apply(e, arguments),
						e
				},
				init: function () { },
				mixIn: function (e) {
					for (var t in e) e.hasOwnProperty(t) && (this[t] = e[t]);
					e.hasOwnProperty("toString") && (this.toString = e.toString)
				},
				clone: function () {
					return this.init.prototype.extend(this)
				},
			}),
			a = (o.WordArray = i.extend({
				init: function (e, t) {
					(e = this.words = e || []),
						(this.sigBytes = null != t ? t : 4 * e.length)
				},
				toString: function (e) {
					return (e || c).stringify(this)
				},
				concat: function (e) {
					var t = this.words,
						n = e.words,
						r = this.sigBytes,
						o = e.sigBytes;
					if ((this.clamp(), r % 4)) for (var i = 0; i < o; i++) {
						var a = (n[i >>> 2] >>> (24 - (i % 4) * 8)) & 255;
						t[(r + i) >>> 2] |= a << (24 - ((r + i) % 4) * 8)
					} else for (i = 0; i < o; i += 4) t[(r + i) >>> 2] = n[i >>> 2];
					return (this.sigBytes += o),
						this
				},
				clamp: function () {
					var t = this.words,
						n = this.sigBytes; (t[n >>> 2] &= 4294967295 << (32 - (n % 4) * 8)),
							(t.length = e.ceil(n / 4))
				},
				clone: function () {
					var e = i.clone.call(this);
					return (e.words = this.words.slice(0)),
						e
				},
				random: function (t) {
					for (var n, r = [], o = 0; o < t; o += 4) {
						var i = (function (t) {
							t = t;
							var n = 987654321,
								r = 4294967295;
							return function () {
								var o = (((n = (36969 * (65535 & n) + (n >> 16)) & r) << 16) + (t = (18e3 * (65535 & t) + (t >> 16)) & r)) & r;
								return ((o /= 4294967296), (o += 0.5) * (e.random() > 0.5 ? 1 : -1))
							}
						})(4294967296 * (n || e.random())); (n = 987654071 * i()),
							r.push((4294967296 * i()) | 0)
					}
					return new a.init(r, t)
				},
			})),
			s = (r.enc = {}),
			c = (s.Hex = {
				stringify: function (e) {
					for (var t = e.words,
						n = e.sigBytes,
						r = [], o = 0; o < n; o++) {
						var i = (t[o >>> 2] >>> (24 - (o % 4) * 8)) & 255;
						r.push((i >>> 4).toString(16)),
							r.push((15 & i).toString(16))
					}
					return r.join("")
				},
				parse: function (e) {
					for (var t = e.length,
						n = [], r = 0; r < t; r += 2) n[r >>> 3] |= parseInt(e.substr(r, 2), 16) << (24 - (r % 8) * 4);
					return new a.init(n, t / 2)
				},
			}),
			u = (s.Latin1 = {
				stringify: function (e) {
					for (var t = e.words,
						n = e.sigBytes,
						r = [], o = 0; o < n; o++) {
						var i = (t[o >>> 2] >>> (24 - (o % 4) * 8)) & 255;
						r.push(String.fromCharCode(i))
					}
					return r.join("")
				},
				parse: function (e) {
					for (var t = e.length,
						n = [], r = 0; r < t; r++) n[r >>> 2] |= (255 & e.charCodeAt(r)) << (24 - (r % 4) * 8);
					return new a.init(n, t)
				},
			}),
			f = (s.Utf8 = {
				stringify: function (e) {
					try {
						return decodeURIComponent(escape(u.stringify(e)))
					} catch (e) {
						throw new Error("Malformed UTF-8 data");
					}
				},
				parse: function (e) {
					return u.parse(unescape(encodeURIComponent(e)))
				},
			}),
			l = (o.BufferedBlockAlgorithm = i.extend({
				reset: function () {
					(this._data = new a.init()),
						(this._nDataBytes = 0)
				},
				_append: function (e) {
					"string" == typeof e && (e = f.parse(e)),
						this._data.concat(e),
						(this._nDataBytes += e.sigBytes)
				},
				_process: function (t) {
					var n = this._data,
						r = n.words,
						o = n.sigBytes,
						i = this.blockSize,
						s = o / (4 * i),
						c = (s = t ? e.ceil(s) : e.max((0 | s) - this._minBufferSize, 0)) * i,
						u = e.min(4 * c, o);
					if (c) {
						for (var f = 0; f < c; f += i) this._doProcessBlock(r, f);
						var l = r.splice(0, c);
						n.sigBytes -= u
					}
					return new a.init(l, u)
				},
				clone: function () {
					var e = i.clone.call(this);
					return (e._data = this._data.clone()),
						e
				},
				_minBufferSize: 0,
			})),
			p = ((o.Hasher = l.extend({
				cfg: i.extend(),
				init: function (e) {
					(this.cfg = this.cfg.extend(e)),
						this.reset()
				},
				reset: function () {
					l.reset.call(this),
						this._doReset()
				},
				update: function (e) {
					return this._append(e),
						this._process(),
						this
				},
				finalize: function (e) {
					return e && this._append(e),
						this._doFinalize()
				},
				blockSize: 16,
				_createHelper: function (e) {
					return function (t, n) {
						return new e.init(n).finalize(t)
					}
				},
				_createHmacHelper: function (e) {
					return function (t, n) {
						return new p.HMAC.init(e, n).finalize(t)
					}
				},
			})), (r.algo = {}));
		return r
	})(Math)
}),
	U = (A(function (e, t) {
		var n;
		e.exports = ((n = L), (function (e) {
			function t(e, t, n, r, o, i, a) {
				var s = e + ((t & n) | (~t & r)) + o + a;
				return ((s << i) | (s >>> (32 - i))) + t
			}
			function r(e, t, n, r, o, i, a) {
				var s = e + ((t & r) | (n & ~r)) + o + a;
				return ((s << i) | (s >>> (32 - i))) + t
			}
			function o(e, t, n, r, o, i, a) {
				var s = e + (t ^ n ^ r) + o + a;
				return ((s << i) | (s >>> (32 - i))) + t
			}
			function i(e, t, n, r, o, i, a) {
				var s = e + (n ^ (t | ~r)) + o + a;
				return ((s << i) | (s >>> (32 - i))) + t
			}
			var a = n,
				s = a.lib,
				c = s.WordArray,
				u = s.Hasher,
				f = a.algo,
				l = []; !(function () {
					for (var t = 0; t < 64; t++) l[t] = (4294967296 * e.abs(e.sin(t + 1))) | 0
				})();
			var p = (f.MD5 = u.extend({
				_doReset: function () {
					this._hash = new c.init([1732584193, 4023233417, 2562383102, 271733878,])
				},
				_doProcessBlock: function (e, n) {
					for (var a = 0; a < 16; a++) {
						var s = n + a,
							c = e[s];
						e[s] = (16711935 & ((c << 8) | (c >>> 24))) | (4278255360 & ((c << 24) | (c >>> 8)))
					}
					var u = this._hash.words,
						f = e[n + 0],
						p = e[n + 1],
						d = e[n + 2],
						h = e[n + 3],
						v = e[n + 4],
						y = e[n + 5],
						g = e[n + 6],
						_ = e[n + 7],
						m = e[n + 8],
						b = e[n + 9],
						w = e[n + 10],
						O = e[n + 11],
						k = e[n + 12],
						S = e[n + 13],
						A = e[n + 14],
						E = e[n + 15],
						T = u[0],
						j = u[1],
						P = u[2],
						x = u[3]; (T = i((T = o((T = o((T = o((T = o((T = r((T = r((T = r((T = r((T = t((T = t((T = t((T = t(T, j, P, x, f, 7, l[0])), (j = t(j, (P = t(P, (x = t(x, T, j, P, p, 12, l[1])), T, j, d, 17, l[2])), x, T, h, 22, l[3])), P, x, v, 7, l[4])), (j = t(j, (P = t(P, (x = t(x, T, j, P, y, 12, l[5])), T, j, g, 17, l[6])), x, T, _, 22, l[7])), P, x, m, 7, l[8])), (j = t(j, (P = t(P, (x = t(x, T, j, P, b, 12, l[9])), T, j, w, 17, l[10])), x, T, O, 22, l[11])), P, x, k, 7, l[12])), (j = t(j, (P = t(P, (x = t(x, T, j, P, S, 12, l[13])), T, j, A, 17, l[14])), x, T, E, 22, l[15])), P, x, p, 5, l[16])), (j = r(j, (P = r(P, (x = r(x, T, j, P, g, 9, l[17])), T, j, O, 14, l[18])), x, T, f, 20, l[19])), P, x, y, 5, l[20])), (j = r(j, (P = r(P, (x = r(x, T, j, P, w, 9, l[21])), T, j, E, 14, l[22])), x, T, v, 20, l[23])), P, x, b, 5, l[24])), (j = r(j, (P = r(P, (x = r(x, T, j, P, A, 9, l[25])), T, j, h, 14, l[26])), x, T, m, 20, l[27])), P, x, S, 5, l[28])), (j = r(j, (P = r(P, (x = r(x, T, j, P, d, 9, l[29])), T, j, _, 14, l[30])), x, T, k, 20, l[31])), P, x, y, 4, l[32])), (j = o(j, (P = o(P, (x = o(x, T, j, P, m, 11, l[33])), T, j, O, 16, l[34])), x, T, A, 23, l[35])), P, x, p, 4, l[36])), (j = o(j, (P = o(P, (x = o(x, T, j, P, v, 11, l[37])), T, j, _, 16, l[38])), x, T, w, 23, l[39])), P, x, S, 4, l[40])), (j = o(j, (P = o(P, (x = o(x, T, j, P, f, 11, l[41])), T, j, h, 16, l[42])), x, T, g, 23, l[43])), P, x, b, 4, l[44])), (j = o(j, (P = o(P, (x = o(x, T, j, P, k, 11, l[45])), T, j, E, 16, l[46])), x, T, d, 23, l[47])), P, x, f, 6, l[48])),
							(j = i((j = i((j = i((j = i(j, (P = i(P, (x = i(x, T, j, P, _, 10, l[49])), T, j, A, 15, l[50])), x, T, y, 21, l[51])), (P = i(P, (x = i(x, (T = i(T, j, P, x, k, 6, l[52])), j, P, h, 10, l[53])), T, j, w, 15, l[54])), x, T, p, 21, l[55])), (P = i(P, (x = i(x, (T = i(T, j, P, x, m, 6, l[56])), j, P, E, 10, l[57])), T, j, g, 15, l[58])), x, T, S, 21, l[59])), (P = i(P, (x = i(x, (T = i(T, j, P, x, v, 6, l[60])), j, P, O, 10, l[61])), T, j, d, 15, l[62])), x, T, b, 21, l[63])),
							(u[0] = (u[0] + T) | 0),
							(u[1] = (u[1] + j) | 0),
							(u[2] = (u[2] + P) | 0),
							(u[3] = (u[3] + x) | 0)
				},
				_doFinalize: function () {
					var t = this._data,
						n = t.words,
						r = 8 * this._nDataBytes,
						o = 8 * t.sigBytes;
					n[o >>> 5] |= 128 << (24 - (o % 32));
					var i = e.floor(r / 4294967296),
						a = r; (n[15 + (((o + 64) >>> 9) << 4)] = (16711935 & ((i << 8) | (i >>> 24))) | (4278255360 & ((i << 24) | (i >>> 8)))),
							(n[14 + (((o + 64) >>> 9) << 4)] = (16711935 & ((a << 8) | (a >>> 24))) | (4278255360 & ((a << 24) | (a >>> 8)))),
							(t.sigBytes = 4 * (n.length + 1)),
							this._process();
					for (var s = this._hash,
						c = s.words,
						u = 0; u < 4; u++) {
						var f = c[u];
						c[u] = (16711935 & ((f << 8) | (f >>> 24))) | (4278255360 & ((f << 24) | (f >>> 8)))
					}
					return s
				},
				clone: function () {
					var e = u.clone.call(this);
					return (e._hash = this._hash.clone()),
						e
				},
			})); (a.MD5 = u._createHelper(p)),
				(a.HmacMD5 = u._createHmacHelper(p))
		})(Math), n.MD5)
	}), A(function (e, t) {
		var n, r, o;
		e.exports = ((r = (n = L).lib.Base), (o = n.enc.Utf8), void (n.algo.HMAC = r.extend({
			init: function (e, t) {
				(e = this._hasher = new e.init()),
					"string" == typeof t && (t = o.parse(t));
				var n = e.blockSize,
					r = 4 * n;
				t.sigBytes > r && (t = e.finalize(t)),
					t.clamp();
				for (var i = (this._oKey = t.clone()), a = (this._iKey = t.clone()), s = i.words, c = a.words, u = 0; u < n; u++)(s[u] ^= 1549556828),
					(c[u] ^= 909522486); (i.sigBytes = a.sigBytes = r),
						this.reset()
			},
			reset: function () {
				var e = this._hasher;
				e.reset(),
					e.update(this._iKey)
			},
			update: function (e) {
				return this._hasher.update(e),
					this
			},
			finalize: function (e) {
				var t = this._hasher,
					n = t.finalize(e);
				return t.reset(),
					t.finalize(this._oKey.clone().concat(n))
			},
		})))
	}), A(function (e, t) {
		e.exports = L.HmacMD5
	})),
	q = (function (e) {
		function t(e) {
			var r;
			return (h(this, t), (r = n.call(this, e.message)), (r.errMsg = e.message || ""), Object.defineProperties(_(r), {
				code: {
					get: function () {
						return e.code
					},
				},
				requestId: {
					get: function () {
						return e.requestId
					},
				},
				message: {
					get: function () {
						return this.errMsg
					},
					set: function (e) {
						this.errMsg = e
					},
				},
			}), r)
		}
		v(t, m(Error));
		var n = y(t);
		return t
	})();
export default function (e, t) {
	var n = "";
	Object.keys(e).sort().forEach(function (t) {
		e[t] && (n = n + "&" + t + "=" + e[t])
	});
	n = n.slice(1);
	return U(n, t).toString()
}