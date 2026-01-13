!(function (t, e) {
  !(function t(e, a, n, r) {
    var o = !!(
        e.Worker &&
        e.Blob &&
        e.Promise &&
        e.OffscreenCanvas &&
        e.OffscreenCanvasRenderingContext2D &&
        e.HTMLCanvasElement &&
        e.HTMLCanvasElement.prototype.transferControlToOffscreen &&
        e.URL &&
        e.URL.createObjectURL
      ),
      i = "function" == typeof Path2D && "function" == typeof DOMMatrix,
      l = (function () {
        if (!e.OffscreenCanvas) return !1;
        var t = new OffscreenCanvas(1, 1),
          a = t.getContext("2d");
        a.fillRect(0, 0, 1, 1);
        var n = t.transferToImageBitmap();
        try {
          a.createPattern(n, "no-repeat");
        } catch (t) {
          return !1;
        }
        return !0;
      })();
    function s() {}
    function c(t) {
      var n = a.exports.Promise,
        r = void 0 !== n ? n : e.Promise;
      return "function" == typeof r ? new r(t) : (t(s, s), null);
    }
    var h,
      f,
      u,
      d,
      m,
      g,
      p,
      b,
      M,
      v,
      y,
      w =
        ((h = l),
        (f = new Map()),
        {
          transform: function (t) {
            if (h) return t;
            if (f.has(t)) return f.get(t);
            var e = new OffscreenCanvas(t.width, t.height);
            return e.getContext("2d").drawImage(t, 0, 0), f.set(t, e), e;
          },
          clear: function () {
            f.clear();
          },
        }),
      x =
        ((m = Math.floor(1e3 / 60)),
        (g = {}),
        (p = 0),
        "function" == typeof requestAnimationFrame &&
        "function" == typeof cancelAnimationFrame
          ? ((u = function (t) {
              var e = Math.random();
              return (
                (g[e] = requestAnimationFrame(function a(n) {
                  p === n || p + m - 1 < n
                    ? ((p = n), delete g[e], t())
                    : (g[e] = requestAnimationFrame(a));
                })),
                e
              );
            }),
            (d = function (t) {
              g[t] && cancelAnimationFrame(g[t]);
            }))
          : ((u = function (t) {
              return setTimeout(t, m);
            }),
            (d = function (t) {
              return clearTimeout(t);
            })),
        { frame: u, cancel: d }),
      C =
        ((v = {}),
        function () {
          if (b) return b;
          if (!n && o) {
            var e = [
              "var CONFETTI, SIZE = {}, module = {};",
              "(" + t.toString() + ")(this, module, true, SIZE);",
              "onmessage = function(msg) {",
              "  if (msg.data.options) {",
              "    CONFETTI(msg.data.options).then(function () {",
              "      if (msg.data.callback) {",
              "        postMessage({ callback: msg.data.callback });",
              "      }",
              "    });",
              "  } else if (msg.data.reset) {",
              "    CONFETTI && CONFETTI.reset();",
              "  } else if (msg.data.resize) {",
              "    SIZE.width = msg.data.resize.width;",
              "    SIZE.height = msg.data.resize.height;",
              "  } else if (msg.data.canvas) {",
              "    SIZE.width = msg.data.canvas.width;",
              "    SIZE.height = msg.data.canvas.height;",
              "    CONFETTI = module.exports.create(msg.data.canvas);",
              "  }",
              "}",
            ].join("\n");
            try {
              b = new Worker(URL.createObjectURL(new Blob([e])));
            } catch (t) {
              return (
                void 0 !== typeof console &&
                  "function" == typeof console.warn &&
                  console.warn("🎊 Could not load worker", t),
                null
              );
            }
            !(function (t) {
              function e(e, a) {
                t.postMessage({ options: e || {}, callback: a });
              }
              (t.init = function (e) {
                var a = e.transferControlToOffscreen();
                t.postMessage({ canvas: a }, [a]);
              }),
                (t.fire = function (a, n, r) {
                  if (M) return e(a, null), M;
                  var o = Math.random().toString(36).slice(2);
                  return (M = c(function (n) {
                    function i(e) {
                      e.data.callback === o &&
                        (delete v[o],
                        t.removeEventListener("message", i),
                        (M = null),
                        w.clear(),
                        r(),
                        n());
                    }
                    t.addEventListener("message", i),
                      e(a, o),
                      (v[o] = i.bind(null, { data: { callback: o } }));
                  }));
                }),
                (t.reset = function () {
                  for (var e in (t.postMessage({ reset: !0 }), v))
                    v[e](), delete v[e];
                });
            })(b);
          }
          return b;
        }),
      I = {
        particleCount: 50,
        angle: 90,
        spread: 45,
        startVelocity: 45,
        decay: 0.9,
        gravity: 1,
        drift: 0,
        ticks: 200,
        x: 0.5,
        y: 0.5,
        shapes: ["square", "circle"],
        zIndex: 100,
        colors: [
          "#26ccff",
          "#a25afd",
          "#ff5e7e",
          "#88ff5a",
          "#fcff42",
          "#ffa62d",
          "#ff36ff",
        ],
        disableForReducedMotion: !1,
        scalar: 1,
      };
    function T(t, e, a) {
      return (function (t, e) {
        return e ? e(t) : t;
      })(t && null != t[e] ? t[e] : I[e], a);
    }
    function E(t) {
      return t < 0 ? 0 : Math.floor(t);
    }
    function P(t) {
      return parseInt(t, 16);
    }
    function S(t) {
      return t.map(O);
    }
    function O(t) {
      var e = String(t).replace(/[^0-9a-f]/gi, "");
      return (
        e.length < 6 && (e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2]),
        {
          r: P(e.substring(0, 2)),
          g: P(e.substring(2, 4)),
          b: P(e.substring(4, 6)),
        }
      );
    }
    function k(t) {
      (t.width = document.documentElement.clientWidth),
        (t.height = document.documentElement.clientHeight);
    }
    function B(t) {
      var e = t.getBoundingClientRect();
      (t.width = e.width), (t.height = e.height);
    }
    function F(t, e) {
      (e.x += Math.cos(e.angle2D) * e.velocity + e.drift),
        (e.y += Math.sin(e.angle2D) * e.velocity + e.gravity),
        (e.velocity *= e.decay),
        e.flat
          ? ((e.wobble = 0),
            (e.wobbleX = e.x + 10 * e.scalar),
            (e.wobbleY = e.y + 10 * e.scalar),
            (e.tiltSin = 0),
            (e.tiltCos = 0),
            (e.random = 1))
          : ((e.wobble += e.wobbleSpeed),
            (e.wobbleX = e.x + 10 * e.scalar * Math.cos(e.wobble)),
            (e.wobbleY = e.y + 10 * e.scalar * Math.sin(e.wobble)),
            (e.tiltAngle += 0.1),
            (e.tiltSin = Math.sin(e.tiltAngle)),
            (e.tiltCos = Math.cos(e.tiltAngle)),
            (e.random = Math.random() + 2));
      var a = e.tick++ / e.totalTicks,
        n = e.x + e.random * e.tiltCos,
        r = e.y + e.random * e.tiltSin,
        o = e.wobbleX + e.random * e.tiltCos,
        l = e.wobbleY + e.random * e.tiltSin;
      if (
        ((t.fillStyle =
          "rgba(" +
          e.color.r +
          ", " +
          e.color.g +
          ", " +
          e.color.b +
          ", " +
          (1 - a) +
          ")"),
        t.beginPath(),
        i &&
          "path" === e.shape.type &&
          "string" == typeof e.shape.path &&
          Array.isArray(e.shape.matrix))
      )
        t.fill(
          (function (t, e, a, n, r, o, i) {
            var l = new Path2D(t),
              s = new Path2D();
            s.addPath(l, new DOMMatrix(e));
            var c = new Path2D();
            return (
              c.addPath(
                s,
                new DOMMatrix([
                  Math.cos(i) * r,
                  Math.sin(i) * r,
                  -Math.sin(i) * o,
                  Math.cos(i) * o,
                  a,
                  n,
                ])
              ),
              c
            );
          })(
            e.shape.path,
            e.shape.matrix,
            e.x,
            e.y,
            0.1 * Math.abs(o - n),
            0.1 * Math.abs(l - r),
            (Math.PI / 10) * e.wobble
          )
        );
      else if ("bitmap" === e.shape.type) {
        var s = (Math.PI / 10) * e.wobble,
          c = 0.1 * Math.abs(o - n),
          h = 0.1 * Math.abs(l - r),
          f = e.shape.bitmap.width * e.scalar,
          u = e.shape.bitmap.height * e.scalar,
          d = new DOMMatrix([
            Math.cos(s) * c,
            Math.sin(s) * c,
            -Math.sin(s) * h,
            Math.cos(s) * h,
            e.x,
            e.y,
          ]);
        d.multiplySelf(new DOMMatrix(e.shape.matrix));
        var m = t.createPattern(w.transform(e.shape.bitmap), "no-repeat");
        m.setTransform(d),
          (t.globalAlpha = 1 - a),
          (t.fillStyle = m),
          t.fillRect(e.x - f / 2, e.y - u / 2, f, u),
          (t.globalAlpha = 1);
      } else if ("circle" === e.shape)
        t.ellipse
          ? t.ellipse(
              e.x,
              e.y,
              Math.abs(o - n) * e.ovalScalar,
              Math.abs(l - r) * e.ovalScalar,
              (Math.PI / 10) * e.wobble,
              0,
              2 * Math.PI
            )
          : (function (t, e, a, n, r, o, i, l, s) {
              t.save(),
                t.translate(e, a),
                t.rotate(o),
                t.scale(n, r),
                t.arc(0, 0, 1, i, l, s),
                t.restore();
            })(
              t,
              e.x,
              e.y,
              Math.abs(o - n) * e.ovalScalar,
              Math.abs(l - r) * e.ovalScalar,
              (Math.PI / 10) * e.wobble,
              0,
              2 * Math.PI
            );
      else if ("star" === e.shape)
        for (
          var g = (Math.PI / 2) * 3,
            p = 4 * e.scalar,
            b = 8 * e.scalar,
            M = e.x,
            v = e.y,
            y = 5,
            x = Math.PI / y;
          y--;

        )
          (M = e.x + Math.cos(g) * b),
            (v = e.y + Math.sin(g) * b),
            t.lineTo(M, v),
            (g += x),
            (M = e.x + Math.cos(g) * p),
            (v = e.y + Math.sin(g) * p),
            t.lineTo(M, v),
            (g += x);
      else
        t.moveTo(Math.floor(e.x), Math.floor(e.y)),
          t.lineTo(Math.floor(e.wobbleX), Math.floor(r)),
          t.lineTo(Math.floor(o), Math.floor(l)),
          t.lineTo(Math.floor(n), Math.floor(e.wobbleY));
      return t.closePath(), t.fill(), e.tick < e.totalTicks;
    }
    function A(t, a) {
      var i,
        l = !t,
        s = !!T(a || {}, "resize"),
        h = !1,
        f = T(a, "disableForReducedMotion", Boolean),
        u = o && !!T(a || {}, "useWorker") ? C() : null,
        d = l ? k : B,
        m = !(!t || !u) && !!t.__confetti_initialized,
        g =
          "function" == typeof matchMedia &&
          matchMedia("(prefers-reduced-motion)").matches;
      function p(e, a, o) {
        for (
          var l,
            s,
            h,
            f,
            u,
            m = T(e, "particleCount", E),
            g = T(e, "angle", Number),
            p = T(e, "spread", Number),
            b = T(e, "startVelocity", Number),
            M = T(e, "decay", Number),
            v = T(e, "gravity", Number),
            y = T(e, "drift", Number),
            C = T(e, "colors", S),
            I = T(e, "ticks", Number),
            P = T(e, "shapes"),
            O = T(e, "scalar"),
            k = !!T(e, "flat"),
            B = (function (t) {
              var e = T(t, "origin", Object);
              return (e.x = T(e, "x", Number)), (e.y = T(e, "y", Number)), e;
            })(e),
            A = m,
            R = [],
            N = t.width * B.x,
            z = t.height * B.y;
          A--;

        )
          R.push(
            ((l = {
              x: N,
              y: z,
              angle: g,
              spread: p,
              startVelocity: b,
              color: C[A % C.length],
              shape:
                P[
                  ((f = 0),
                  (u = P.length),
                  Math.floor(Math.random() * (u - f)) + f)
                ],
              ticks: I,
              decay: M,
              gravity: v,
              drift: y,
              scalar: O,
              flat: k,
            }),
            (s = void 0),
            (h = void 0),
            (s = l.angle * (Math.PI / 180)),
            (h = l.spread * (Math.PI / 180)),
            {
              x: l.x,
              y: l.y,
              wobble: 10 * Math.random(),
              wobbleSpeed: Math.min(0.11, 0.1 * Math.random() + 0.05),
              velocity: 0.5 * l.startVelocity + Math.random() * l.startVelocity,
              angle2D: -s + (0.5 * h - Math.random() * h),
              tiltAngle: (0.5 * Math.random() + 0.25) * Math.PI,
              color: l.color,
              shape: l.shape,
              tick: 0,
              totalTicks: l.ticks,
              decay: l.decay,
              drift: l.drift,
              random: Math.random() + 2,
              tiltSin: 0,
              tiltCos: 0,
              wobbleX: 0,
              wobbleY: 0,
              gravity: 3 * l.gravity,
              ovalScalar: 0.6,
              scalar: l.scalar,
              flat: l.flat,
            })
          );
        return i
          ? i.addFettis(R)
          : ((i = (function (t, e, a, o, i) {
              var l,
                s,
                h = e.slice(),
                f = t.getContext("2d"),
                u = c(function (e) {
                  function c() {
                    (l = s = null),
                      f.clearRect(0, 0, o.width, o.height),
                      w.clear(),
                      i(),
                      e();
                  }
                  (l = x.frame(function e() {
                    !n ||
                      (o.width === r.width && o.height === r.height) ||
                      ((o.width = t.width = r.width),
                      (o.height = t.height = r.height)),
                      o.width ||
                        o.height ||
                        (a(t), (o.width = t.width), (o.height = t.height)),
                      f.clearRect(0, 0, o.width, o.height),
                      (h = h.filter(function (t) {
                        return F(f, t);
                      })).length
                        ? (l = x.frame(e))
                        : c();
                  })),
                    (s = c);
                });
              return {
                addFettis: function (t) {
                  return (h = h.concat(t)), u;
                },
                canvas: t,
                promise: u,
                reset: function () {
                  l && x.cancel(l), s && s();
                },
              };
            })(t, R, d, a, o)),
            i.promise);
      }
      function b(a) {
        var n = f || T(a, "disableForReducedMotion", Boolean),
          r = T(a, "zIndex", Number);
        if (n && g)
          return c(function (t) {
            t();
          });
        l && i
          ? (t = i.canvas)
          : l &&
            !t &&
            ((t = (function (t) {
              var e = document.createElement("canvas");
              return (
                (e.style.position = "fixed"),
                (e.style.top = "0px"),
                (e.style.left = "0px"),
                (e.style.pointerEvents = "none"),
                (e.style.zIndex = t),
                e
              );
            })(r)),
            document.body.appendChild(t)),
          s && !m && d(t);
        var o = { width: t.width, height: t.height };
        function b() {
          if (u) {
            var e = {
              getBoundingClientRect: function () {
                if (!l) return t.getBoundingClientRect();
              },
            };
            return (
              d(e),
              void u.postMessage({
                resize: { width: e.width, height: e.height },
              })
            );
          }
          o.width = o.height = null;
        }
        function M() {
          (i = null),
            s && ((h = !1), e.removeEventListener("resize", b)),
            l &&
              t &&
              (document.body.contains(t) && document.body.removeChild(t),
              (t = null),
              (m = !1));
        }
        return (
          u && !m && u.init(t),
          (m = !0),
          u && (t.__confetti_initialized = !0),
          s && !h && ((h = !0), e.addEventListener("resize", b, !1)),
          u ? u.fire(a, o, M) : p(a, o, M)
        );
      }
      return (
        (b.reset = function () {
          u && u.reset(), i && i.reset();
        }),
        b
      );
    }
    function R() {
      return y || (y = A(null, { useWorker: !0, resize: !0 })), y;
    }
    (a.exports = function () {
      return R().apply(this, arguments);
    }),
      (a.exports.reset = function () {
        R().reset();
      }),
      (a.exports.create = A),
      (a.exports.shapeFromPath = function (t) {
        if (!i)
          throw new Error("path confetti are not supported in this browser");
        var e, a;
        "string" == typeof t ? (e = t) : ((e = t.path), (a = t.matrix));
        var n = new Path2D(e),
          r = document.createElement("canvas").getContext("2d");
        if (!a) {
          for (
            var o, l, s = 1e3, c = s, h = s, f = 0, u = 0, d = 0;
            d < s;
            d += 2
          )
            for (var m = 0; m < s; m += 2)
              r.isPointInPath(n, d, m, "nonzero") &&
                ((c = Math.min(c, d)),
                (h = Math.min(h, m)),
                (f = Math.max(f, d)),
                (u = Math.max(u, m)));
          (o = f - c), (l = u - h);
          var g = Math.min(10 / o, 10 / l);
          a = [
            g,
            0,
            0,
            g,
            -Math.round(o / 2 + c) * g,
            -Math.round(l / 2 + h) * g,
          ];
        }
        return { type: "path", path: e, matrix: a };
      }),
      (a.exports.shapeFromText = function (t) {
        var e,
          a = 1,
          n = "#000000",
          r =
            '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';
        "string" == typeof t
          ? (e = t)
          : ((e = t.text),
            (a = "scalar" in t ? t.scalar : a),
            (r = "fontFamily" in t ? t.fontFamily : r),
            (n = "color" in t ? t.color : n));
        var o = 10 * a,
          i = o + "px " + r,
          l = new OffscreenCanvas(o, o),
          s = l.getContext("2d");
        s.font = i;
        var c = s.measureText(e),
          h = Math.ceil(c.actualBoundingBoxRight + c.actualBoundingBoxLeft),
          f = Math.ceil(c.actualBoundingBoxAscent + c.actualBoundingBoxDescent),
          u = c.actualBoundingBoxLeft + 2,
          d = c.actualBoundingBoxAscent + 2;
        (h += 4),
          (f += 4),
          ((s = (l = new OffscreenCanvas(h, f)).getContext("2d")).font = i),
          (s.fillStyle = n),
          s.fillText(e, u, d);
        var m = 1 / a;
        return {
          type: "bitmap",
          bitmap: l.transferToImageBitmap(),
          matrix: [m, 0, 0, m, (-h * m) / 2, (-f * m) / 2],
        };
      });
  })(
    (function () {
      return void 0 !== t ? t : "undefined" != typeof self ? self : this || {};
    })(),
    e,
    !1
  ),
    (t.confetti = e.exports);
})(window, {});

!(function (t) {
  var n = {};
  function e(o) {
    if (n[o]) return n[o].exports;
    var a = (n[o] = { i: o, l: !1, exports: {} });
    return t[o].call(a.exports, a, a.exports, e), (a.l = !0), a.exports;
  }
  (e.m = t),
    (e.c = n),
    (e.d = function (t, n, o) {
      e.o(t, n) || Object.defineProperty(t, n, { enumerable: !0, get: o });
    }),
    (e.r = function (t) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (e.t = function (t, n) {
      if ((1 & n && (t = e(t)), 8 & n)) return t;
      if (4 & n && "object" == typeof t && t && t.__esModule) return t;
      var o = Object.create(null);
      if (
        (e.r(o),
        Object.defineProperty(o, "default", { enumerable: !0, value: t }),
        2 & n && "string" != typeof t)
      )
        for (var a in t)
          e.d(
            o,
            a,
            function (n) {
              return t[n];
            }.bind(null, a)
          );
      return o;
    }),
    (e.n = function (t) {
      var n =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return e.d(n, "a", n), n;
    }),
    (e.o = function (t, n) {
      return Object.prototype.hasOwnProperty.call(t, n);
    }),
    (e.p = ""),
    e((e.s = 1));
})([
  ,
  function (t, n, e) {
    "use strict";
    e.r(n);
    var o = {
      Arial: { google_font_name: "Arial", css_font_name: "'Arial', cursive" },
      Cookie: {
        google_font_name: "Cookie",
        css_font_name: "'Cookie', cursive",
      },
      Lato: { google_font_name: "Lato", css_font_name: "'Lato', cursive" },
      Comic: {
        google_font_name: "Comic+Neue",
        css_font_name: "'Comic Neue', cursive",
      },
      Inter: { google_font_name: "Inter", css_font_name: "'Inter', cursive" },
      Bree: {
        google_font_name: "Bree+Serif",
        css_font_name: "'Bree Serif', cursive",
      },
      Poppins: {
        google_font_name: "Poppins",
        css_font_name: "'Poppins', sans-serif",
      },
    };
    window.bmcBtnWidget =
      window.bmcBtnWidget ||
      function (t, n, e, a, C = "Cookie", r = "#fff", i = "#000", l = "#fd0") {
        (a &&
          (function () {
            try {
              let t = document.createElement("canvas").getContext("2d"),
                n = String.fromCharCode(55357) + String.fromCharCode(56835);
              return (
                (t.textBaseline = "top"),
                (t.font = "32px Arial"),
                t.fillText(n, 0, 0),
                0 !== t.getImageData(16, 16, 1, 1).data[0]
              );
            } catch {}
          })() &&
          "â–¡" != a) ||
          (a =
            '<svg viewBox="0 0 884 1279" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path d="M791.109 297.518L790.231 297.002L788.201 296.383C789.018 297.072 790.04 297.472 791.109 297.518Z" fill="#0D0C22"/>\n<path d="M803.896 388.891L802.916 389.166L803.896 388.891Z" fill="#0D0C22"/>\n<path d="M791.484 297.377C791.359 297.361 791.237 297.332 791.118 297.29C791.111 297.371 791.111 297.453 791.118 297.534C791.252 297.516 791.379 297.462 791.484 297.377Z" fill="#0D0C22"/>\n<path d="M791.113 297.529H791.244V297.447L791.113 297.529Z" fill="#0D0C22"/>\n<path d="M803.111 388.726L804.591 387.883L805.142 387.573L805.641 387.04C804.702 387.444 803.846 388.016 803.111 388.726Z" fill="#0D0C22"/>\n<path d="M793.669 299.515L792.223 298.138L791.243 297.605C791.77 298.535 792.641 299.221 793.669 299.515Z" fill="#0D0C22"/>\n<path d="M430.019 1186.18C428.864 1186.68 427.852 1187.46 427.076 1188.45L427.988 1187.87C428.608 1187.3 429.485 1186.63 430.019 1186.18Z" fill="#0D0C22"/>\n<path d="M641.187 1144.63C641.187 1143.33 640.551 1143.57 640.705 1148.21C640.705 1147.84 640.86 1147.46 640.929 1147.1C641.015 1146.27 641.084 1145.46 641.187 1144.63Z" fill="#0D0C22"/>\n<path d="M619.284 1186.18C618.129 1186.68 617.118 1187.46 616.342 1188.45L617.254 1187.87C617.873 1187.3 618.751 1186.63 619.284 1186.18Z" fill="#0D0C22"/>\n<path d="M281.304 1196.06C280.427 1195.3 279.354 1194.8 278.207 1194.61C279.136 1195.06 280.065 1195.51 280.684 1195.85L281.304 1196.06Z" fill="#0D0C22"/>\n<path d="M247.841 1164.01C247.704 1162.66 247.288 1161.35 246.619 1160.16C247.093 1161.39 247.489 1162.66 247.806 1163.94L247.841 1164.01Z" fill="#0D0C22"/>\n<path class="logo-coffee" d="M472.623 590.836C426.682 610.503 374.546 632.802 306.976 632.802C278.71 632.746 250.58 628.868 223.353 621.274L270.086 1101.08C271.74 1121.13 280.876 1139.83 295.679 1153.46C310.482 1167.09 329.87 1174.65 349.992 1174.65C349.992 1174.65 416.254 1178.09 438.365 1178.09C462.161 1178.09 533.516 1174.65 533.516 1174.65C553.636 1174.65 573.019 1167.08 587.819 1153.45C602.619 1139.82 611.752 1121.13 613.406 1101.08L663.459 570.876C641.091 563.237 618.516 558.161 593.068 558.161C549.054 558.144 513.591 573.303 472.623 590.836Z" fill="#FFDD00"/>\n<path d="M78.6885 386.132L79.4799 386.872L79.9962 387.182C79.5987 386.787 79.1603 386.435 78.6885 386.132Z" fill="#0D0C22"/>\n<path class="logo-outline" d="M879.567 341.849L872.53 306.352C866.215 274.503 851.882 244.409 819.19 232.898C808.711 229.215 796.821 227.633 788.786 220.01C780.751 212.388 778.376 200.55 776.518 189.572C773.076 169.423 769.842 149.257 766.314 129.143C763.269 111.85 760.86 92.4243 752.928 76.56C742.604 55.2584 721.182 42.8009 699.88 34.559C688.965 30.4844 677.826 27.0375 666.517 24.2352C613.297 10.1947 557.342 5.03277 502.591 2.09047C436.875 -1.53577 370.983 -0.443234 305.422 5.35968C256.625 9.79894 205.229 15.1674 158.858 32.0469C141.91 38.224 124.445 45.6399 111.558 58.7341C95.7448 74.8221 90.5829 99.7026 102.128 119.765C110.336 134.012 124.239 144.078 138.985 150.737C158.192 159.317 178.251 165.846 198.829 170.215C256.126 182.879 315.471 187.851 374.007 189.968C438.887 192.586 503.87 190.464 568.44 183.618C584.408 181.863 600.347 179.758 616.257 177.304C634.995 174.43 647.022 149.928 641.499 132.859C634.891 112.453 617.134 104.538 597.055 107.618C594.095 108.082 591.153 108.512 588.193 108.942L586.06 109.252C579.257 110.113 572.455 110.915 565.653 111.661C551.601 113.175 537.515 114.414 523.394 115.378C491.768 117.58 460.057 118.595 428.363 118.647C397.219 118.647 366.058 117.769 334.983 115.722C320.805 114.793 306.661 113.611 292.552 112.177C286.134 111.506 279.733 110.801 273.333 110.009L267.241 109.235L265.917 109.046L259.602 108.134C246.697 106.189 233.792 103.953 221.025 101.251C219.737 100.965 218.584 100.249 217.758 99.2193C216.932 98.1901 216.482 96.9099 216.482 95.5903C216.482 94.2706 216.932 92.9904 217.758 91.9612C218.584 90.9319 219.737 90.2152 221.025 89.9293H221.266C232.33 87.5721 243.479 85.5589 254.663 83.8038C258.392 83.2188 262.131 82.6453 265.882 82.0832H265.985C272.988 81.6186 280.026 80.3625 286.994 79.5366C347.624 73.2301 408.614 71.0801 469.538 73.1014C499.115 73.9618 528.676 75.6996 558.116 78.6935C564.448 79.3474 570.746 80.0357 577.043 80.8099C579.452 81.1025 581.878 81.4465 584.305 81.7391L589.191 82.4445C603.438 84.5667 617.61 87.1419 631.708 90.1703C652.597 94.7128 679.422 96.1925 688.713 119.077C691.673 126.338 693.015 134.408 694.649 142.03L696.732 151.752C696.786 151.926 696.826 152.105 696.852 152.285C701.773 175.227 706.7 198.169 711.632 221.111C711.994 222.806 712.002 224.557 711.657 226.255C711.312 227.954 710.621 229.562 709.626 230.982C708.632 232.401 707.355 233.6 705.877 234.504C704.398 235.408 702.75 235.997 701.033 236.236H700.895L697.884 236.649L694.908 237.044C685.478 238.272 676.038 239.419 666.586 240.486C647.968 242.608 629.322 244.443 610.648 245.992C573.539 249.077 536.356 251.102 499.098 252.066C480.114 252.57 461.135 252.806 442.162 252.771C366.643 252.712 291.189 248.322 216.173 239.625C208.051 238.662 199.93 237.629 191.808 236.58C198.106 237.389 187.231 235.96 185.029 235.651C179.867 234.928 174.705 234.177 169.543 233.397C152.216 230.798 134.993 227.598 117.7 224.793C96.7944 221.352 76.8005 223.073 57.8906 233.397C42.3685 241.891 29.8055 254.916 21.8776 270.735C13.7217 287.597 11.2956 305.956 7.64786 324.075C4.00009 342.193 -1.67805 361.688 0.472751 380.288C5.10128 420.431 33.165 453.054 73.5313 460.35C111.506 467.232 149.687 472.807 187.971 477.556C338.361 495.975 490.294 498.178 641.155 484.129C653.44 482.982 665.708 481.732 677.959 480.378C681.786 479.958 685.658 480.398 689.292 481.668C692.926 482.938 696.23 485.005 698.962 487.717C701.694 490.429 703.784 493.718 705.08 497.342C706.377 500.967 706.846 504.836 706.453 508.665L702.633 545.797C694.936 620.828 687.239 695.854 679.542 770.874C671.513 849.657 663.431 928.434 655.298 1007.2C653.004 1029.39 650.71 1051.57 648.416 1073.74C646.213 1095.58 645.904 1118.1 641.757 1139.68C635.218 1173.61 612.248 1194.45 578.73 1202.07C548.022 1209.06 516.652 1212.73 485.161 1213.01C450.249 1213.2 415.355 1211.65 380.443 1211.84C343.173 1212.05 297.525 1208.61 268.756 1180.87C243.479 1156.51 239.986 1118.36 236.545 1085.37C231.957 1041.7 227.409 998.039 222.9 954.381L197.607 711.615L181.244 554.538C180.968 551.94 180.693 549.376 180.435 546.76C178.473 528.023 165.207 509.681 144.301 510.627C126.407 511.418 106.069 526.629 108.168 546.76L120.298 663.214L145.385 904.104C152.532 972.528 159.661 1040.96 166.773 1109.41C168.15 1122.52 169.44 1135.67 170.885 1148.78C178.749 1220.43 233.465 1259.04 301.224 1269.91C340.799 1276.28 381.337 1277.59 421.497 1278.24C472.979 1279.07 524.977 1281.05 575.615 1271.72C650.653 1257.95 706.952 1207.85 714.987 1130.13C717.282 1107.69 719.576 1085.25 721.87 1062.8C729.498 988.559 737.115 914.313 744.72 840.061L769.601 597.451L781.009 486.263C781.577 480.749 783.905 475.565 787.649 471.478C791.392 467.391 796.352 464.617 801.794 463.567C823.25 459.386 843.761 452.245 859.023 435.916C883.318 409.918 888.153 376.021 879.567 341.849ZM72.4301 365.835C72.757 365.68 72.1548 368.484 71.8967 369.792C71.8451 367.813 71.9483 366.058 72.4301 365.835ZM74.5121 381.94C74.6842 381.819 75.2003 382.508 75.7337 383.334C74.925 382.576 74.4089 382.009 74.4949 381.94H74.5121ZM76.5597 384.641C77.2996 385.897 77.6953 386.689 76.5597 384.641V384.641ZM80.672 387.979H80.7752C80.7752 388.1 80.9645 388.22 81.0333 388.341C80.9192 388.208 80.7925 388.087 80.6548 387.979H80.672ZM800.796 382.989C793.088 390.319 781.473 393.726 769.996 395.43C641.292 414.529 510.713 424.199 380.597 419.932C287.476 416.749 195.336 406.407 103.144 393.382C94.1102 392.109 84.3197 390.457 78.1082 383.798C66.4078 371.237 72.1548 345.944 75.2003 330.768C77.9878 316.865 83.3218 298.334 99.8572 296.355C125.667 293.327 155.64 304.218 181.175 308.09C211.917 312.781 242.774 316.538 273.745 319.36C405.925 331.405 540.325 329.529 671.92 311.91C695.906 308.686 719.805 304.941 743.619 300.674C764.835 296.871 788.356 289.731 801.175 311.703C809.967 326.673 811.137 346.701 809.778 363.615C809.359 370.984 806.139 377.915 800.779 382.989H800.796Z" fill="#0D0C22"/>\n</svg>\n');
        const f =
          "<style>.bmc-btn svg {\n    height: 32px !important;\n    margin-bottom: 0px !important;\n    box-shadow: none !important;\n    border: none !important;\n    vertical-align: middle !important;\n    transform: scale(0.9);\n    flex-shrink: 0;\n}\n\n.bmc-btn {\n    min-width: 210px;\n    color: [FONT_COLOR] !important;\n    background-color: [BG_COLOR] !important;\n    height: 60px;\n    border-radius: 12px;\n    font-size: [FONT_SIZE];\n    font-weight: [FONT_WEIGHT];\n    border: none;\n    padding: 0px 24px;\n    line-height: 27px;\n    text-decoration: none !important;\n    display: inline-flex !important;\n    align-items: center;\n    font-family: [FONT] !important;\n    -webkit-box-sizing: border-box !important;\n    box-sizing: border-box !important;\n}\n\n.bmc-btn:hover, .bmc-btn:active, .bmc-btn:focus {\n    text-decoration: none !important;\n    cursor: pointer;\n}\n\n.bmc-btn-text {\n   text-align: left;\n   margin-left: 8px;\n   display: inline-block;\n   line-height: 0;\n   width: 100%;\n   flex-shrink: 0;\n   font-family: [FONT] !important;\n   white-space: nowrap;\n}\n\n.logo-outline {\n    fill: [OUTLINE_COLOR];\n}\n\n.logo-coffee {\n    fill: [COFFEE_COLOR];\n}</style>";
        let c = `<link href="https://fonts.googleapis.com/css?family=${o[C].google_font_name}&display=swap" rel="stylesheet">`,
          s = "28px",
          p = "Normal";
        ("Arial" !== o[C].google_font_name &&
          "Lato" !== o[C].google_font_name &&
          "Comic" !== o[C].google_font_name &&
          "Inter" !== o[C].google_font_name &&
          "Bree+Serif" !== o[C].google_font_name &&
          "Poppins" !== o[C].google_font_name) ||
          ((s = "24px"), (p = "Bold"));
        const m =
          c +
          '<div class="bmc-btn-container"><a class="bmc-btn" ' +
          `target="_blank" href="https://buymeacoffee.com/${n}">` +
          `${a}<span class="bmc-btn-text">${t}</span>` +
          "</a></div>";
        return (
          f
            .replace("[BG_COLOR]", e)
            .replace("[FONT]", o[C].css_font_name)
            .replace("[FONT_COLOR]", r)
            .replace("[FONT_SIZE]", s)
            .replace("[FONT_WEIGHT]", p)
            .replace("[OUTLINE_COLOR]", i)
            .replace("[COFFEE_COLOR]", l) + m
        );
      };
    let a = document.querySelector('script[data-name="bmc-button"]');
    a &&
      document.writeln(
        bmcBtnWidget(
          a.attributes["data-text"].value,
          a.attributes["data-slug"].value,
          a.attributes["data-color"].value,
          a.attributes["data-emoji"].value,
          a.attributes["data-font"].value,
          a.attributes["data-font-color"]
            ? a.attributes["data-font-color"].value
            : void 0,
          a.attributes["data-outline-color"]
            ? a.attributes["data-outline-color"].value
            : void 0,
          a.attributes["data-coffee-color"]
            ? a.attributes["data-coffee-color"].value
            : void 0
        )
      );
  },
]);

function render() {
  if (document.querySelector(".myContainer")) {
    document.querySelector(".myContainer").style.visibility = "visible";
    return;
  }

  const container = document.createElement("div");
  container.classList.add("myContainer");
  container.style.setProperty("background-color", "transparent", "important");
  container.style.position = "fixed";
  container.style.margin = "0";
  container.style.padding = "0";
  container.style.top = "0";
  container.style.width = "100%";
  container.style.display = "flex";
  container.style.justifyContent = "center";
  container.style.alignItems = "center";
  container.style.flexDirection = "column";
  container.style.zIndex = "99999";

  const shadowRoot = container.attachShadow({ mode: "open" });

  shadowRoot.innerHTML = `
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      .container {
        background-color: #ffff;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        z-index: 999;
        padding: 2px 0;
        position: relative;
      }

      .dark-mode.container {
        background-color: black;
      }

      input {
        background: inherit;
        border: none;
        color: black;
        font-size: 16px;
        outline: none;
        text-align: center;
      }

      .progress-bar {
        position: absolute;
        width: 100%;
        z-index: -2;
        height: 20px;
        background-color: inherit;
        overflow: hidden;
      }

      .progress {
        height: 100%;
        width: 0;
        background-color: #4caf50;
        transition: width 2s ease-out;
      }

      .dark-mode .progress {
        background-color: #00b22d;
      }

      .progress-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #1c1c1c;
        font-size: 14px;
        display: flex;
        align-items: center;
      }

      .dark-mode .progress-text {
        color: white;
      }

      .progress-text > input {
        width: 430px;
      }

      .timer {
        color: #1c1c1c;
        display: flex;
        margin-left: auto;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
      }

      .dark-mode  input,
      .dark-mode .timer,
      .dark-mode .play-btn,
      .dark-mode .reset-btn,
      .dark-mode .options-btn {
        color: white;
      }

      .timer > input {
        font-size: 16px;
        font-weight: lighter;
        width: 20px;
      }

      #timer-min {
        width: 30px;
      }

      .play-btn,
      .reset-btn {
        margin: 0;
        background: none;
        border: none;
        color: inherit;
        font-size: 16px;
        cursor: pointer;
      }

      .play-btn {
        margin: 0 10px ;
      }

      .reset-btn {
        margin: 0;
      }

      .collapsed {
        height: 4px;
        padding: 0;
        transition: all 1ms ease;
      }

      .collapsed .progress-bar {
        height: 4px;
      }

      .collapsed .progress {
        height: 100%;
      }

      .collapsed .progress-text,
      .collapsed .timer,
      .collapsed .options-btn
      {
        display: none;
      }

      .notch {
        width: 50px;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 8px solid white;
        cursor: pointer;
        position: relative;
      }

      .notch > svg {
        position: absolute;
        top: -10px;
        left: 50%;
        transform: translatex(-50%);
      }

      .dark-mode.notch {
        border-top: 8px solid black;
      }

      .input-error {
        border: 2px solid red;
      }

      .options-btn {
        background: none;
        border: none;
        color: #1c1c1c;
        font-weight: bolder;
        font-size: 18px;
        cursor: pointer;
        margin-right: 10px;
      }

      .dark-mode .options-btn {
        color: white;
      }

      .dropdown-menu {
        position: absolute;
        right: 10px;
        top: 30px;
        background-color: white;
        border: 1px solid #ccc;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        width: 220px;
        z-index: 1000;
        padding: 15px;
        border-radius: 5px;
      }

      .dropdown-item {
        margin-top: 10px;
        margin-bottom: 10px;
        display: flex;
        color: black;
        font-size: 14px;
        flex-direction: column;
        justify-content: space-between;
      }

      #animation-toggle-label,
      #darkmode-toggle-label {
        margin-top: 3px;
        width: 40px;
        height: 20px;
        position: relative;
        display: block;
        background: #ebebeb;
        border-radius: 200px;
        box-shadow:
          inset 0 5px 15px rgba(0, 0, 0, 0.4),
          inset 0 -5px 15px rgba(255, 255, 255, 0.4);
        cursor: pointer;
      }

      #animation-toggle-label:after,
      #darkmode-toggle-label:after {
        content: "";
        width: 18px;
        height: 18px;
        position: absolute;
        top: 1px;
        left: 1px;
        background: linear-gradient(180deg, #ffcc89, #d8860b);
        border-radius: 100%;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
      }

      #animation-toggle-label:after{
        background: linear-gradient(180deg, white, black);
      }

      #animation-toggle,
      #darkmode-toggle {
        width: 0;
        height: 0;
        visibility: hidden;
      }

      #darkmode-toggle:checked + #darkmode-toggle-label {
        background: #242424;
      }

      #animation-toggle:checked + #animation-toggle-label:after,
      #darkmode-toggle:checked + #darkmode-toggle-label:after {
        left: 39px;
        transform: translateX(-100%);
        background: linear-gradient(180deg, #777, #3a3a3a);
      }

      #animation-toggle:checked + #animation-toggle-label:after {
         background: linear-gradient(180deg, white, black);
      }

      #animation-toggle-label,
      #animation-toggle-label:after,
      #darkmode-toggle-label,
      #darkmode-toggle-label:after {
        transition: 0.3s;
      }

      #animation-toggle-label:active:after,
      #darkmode-toggle-label:active:after {
        transform: scaleX(1.2);
      }

      .shim {
        position: relative;
        overflow: hidden;
        background-color: rgba(0, 255, 0, 0.5);
      }

      .shim::after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transform: translateX(-100%);
        background-image: linear-gradient(
          90deg,
          rgba(233, 233, 233, 1) 0,
          rgba(233, 233, 233, 0.9) 50%,
          rgba(233, 233, 233, 0.8) 100%
        );
        animation: shimmer 2s ease-out infinite;
        content: "";
      }

      @keyframes shimmer {
        100% {
          transform: translateX(0%);
          opacity: 0;
        }
      }

      .links {
        justify-content: space-around;
      }

      a {
        color: rgba(0, 0, 0, 0.4);
        font-size: 12px;
      }

      .row {
        flex-direction: row;
      }

      .btn {
        padding: 5px 0 15px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #ccc;
      }

      .close-btn {
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
      }
      
      #snooze-btn {
        background-color: #ffffff;
        border: 1px solid gray;
        border-radius: 20px;
        padding: 10px;
        font-weight: bold;
        color: black;
        cursor: pointer;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }

      .heading {
        margin: 5px 0 15px 0;
        justify-content: center;
        gap: 5px;
      }

      .heading > a {
        text-decoration: none;
        font-size: 15px;
      }

      .dropdown-item:last-child {
        margin-bottom: 0;
      }

      .color-options {
        display: flex;
        width: 100%;
        height: 40px;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      }

      .color-option {
        width: 23px;
        height: 23px;
        border-radius: 50%;
        cursor: pointer;
      }

      .hidden {
        display: none;
      }

      button#theme-toggle {
        background: none;
        border: none;
        cursor: pointer;
      }

      .dark-mode svg {
        stroke: white !important;
        fill: white !important;
      }

      .dark-mode svg g g g {
        fill: white !important;
      }

      .dark-mode svg g path, .dark-mode svg g rect {
        fill: white !important;
      }
     
      .dark-mode .dropdown-menu {
        background-color: #ffffff !important;
        color: #000000 !important;
        border-color: #ccc !important;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
      }

      .dark-mode .dropdown-menu svg,
      .dark-mode .dropdown-menu svg g,
      .dark-mode .dropdown-menu svg path,
      .dark-mode .dropdown-menu svg rect {
        fill: initial !important;
        stroke: initial !important;
      }

      .dark-mode .dropdown-menu img {
        filter: none !important;
      }
    </style>

    <div class="container">
      <div class="progress-bar">
        <div class="progress"></div>
      </div>

      <div class="progress-text">
        <input
          type="text"
          id="focus-input"
          placeholder="What's the one thing you want to focus on right now?"
        />
      </div>

      <div class="timer">
        <input id="timer-min" inputmode="numeric" maxlength="3" value="000" />
        :
        <input id="timer-sec" inputmode="numeric" maxlength="2" value="00" />

        <button class="play-btn">
           <svg width="13px" height="13px" viewBox="-0.5 0 8 8" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>play [#1001]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-427.000000, -3765.000000)" fill="#000000"> <g id="icons" transform="translate(56.000000, 160.000000)"> <polygon id="play-[#1001]" points="371 3605 371 3613 378 3609"> </polygon> </g> </g> </g> </g></svg>
         </button>
        <button class="reset-btn">
         <svg width="13px" height="13px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="1" y="1" width="14" height="14" fill="#000000"></rect> </g></svg>
        </button>
      </div>
      <button class="options-btn">⋮</button>

      <div class="dropdown-menu hidden">
        <div class="close-btn">
          <svg width="17" height="17" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="#0F1729"></path> 
            </g>
          </svg>
        </div>
        <div class="dropdown-item row heading">
          <img src="chrome-extension://${chrome.runtime.id}/assests/menu_logo.svg" alt="Logo" height="20"/>
        </div>
        <div class="dropdown-item row">
          <span>Light Mode</span>
          <input type="checkbox" id="darkmode-toggle" />
          <label for="darkmode-toggle" id="darkmode-toggle-label"></label>
        </div>
        <div class="dropdown-item row">
          <span>Progress Animation</span>
          <input type="checkbox" id="animation-toggle" />
          <label for="animation-toggle" id="animation-toggle-label"></label>
        </div>
        <div class="dropdown-item">
          <span>Progress Bar Color</span>
            <div class="color-options">
              <span class="color-option" style="background-color: #4caf50"></span>
              <span class="color-option" style="background-color: #2196f3"></span>
              <span class="color-option" style="background-color: #ff9800"></span>
              <span class="color-option" style="background-color: #e91e63"></span>
              <span class="color-option" style="background-color: #9e9e9e"></span>
            </div>
        </div>
        <div class="dropdown-item row btn">
          <button id="snooze-btn">
            Snooze for 1 hour
          </button>
        </div>
        <div class="dropdown-item row links">
          <a href="https://links.cebe.fyi/ultra-focus" target="_blank">About</a>
          <a href="https://tally.so/r/n0REgA" target="_blank">Feedback</a>
        </div>
        <div class="dropdown-item row links">
          <a href="https://www.buymeacoffee.com/cebe" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 55px !important;width: 190px !important;" ></a>
        </div>
      </div>
    </div>
    <span class="notch">
   <svg fill="#000000" height="7px" width="7px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 511.74 511.74" xml:space="preserve" stroke="#000000" stroke-width="38.89186"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M508.788,371.087L263.455,125.753c-4.16-4.16-10.88-4.16-15.04,0L2.975,371.087c-4.053,4.267-3.947,10.987,0.213,15.04 c4.16,3.947,10.667,3.947,14.827,0l237.867-237.76l237.76,237.76c4.267,4.053,10.987,3.947,15.04-0.213 C512.734,381.753,512.734,375.247,508.788,371.087z"></path> </g> </g> </g></svg>
    </span>
  `;

  document.body.appendChild(container);

  let countdownInterval = null;
  let snoozeTimeout = null;
  let isRunning = false;
  let totalInitialTime = 0;
  let remainingTime = 0;

  const validateTimerInput = (e) => {
    const input = e.target;
    const isMin = input.id === "timer-min";
    const isSec = input.id === "timer-sec";

    input.value = input.value.replace(/\D/g, "");

    if (isMin) {
      input.value = input.value.slice(0, 3);

      if (input.value && parseInt(input.value, 10) > 999) {
        input.value = "999";
      }
    }

    if (isSec) {
      input.value = input.value.slice(0, 2);

      if (input.value && parseInt(input.value, 10) > 59) {
        input.value = "59";
      }
    }

    const isNumber = /^\d+$/;

    if (!isNumber.test(input.value.trim()) && input.value.trim() !== "") {
      input.classList.add("input-error");
      input.setAttribute("aria-invalid", "true");
    } else {
      input.classList.remove("input-error");
      input.removeAttribute("aria-invalid");
    }
  };

  const startTimer = () => {
    const minInput = shadowRoot.getElementById("timer-min");
    const secInput = shadowRoot.getElementById("timer-sec");
    const playBtn = shadowRoot.querySelector(".play-btn");

    const minutes = parseInt(minInput.value) || 0;
    const seconds = parseInt(secInput.value) || 0;

    totalInitialTime = totalInitialTime
      ? totalInitialTime
      : minutes * 60 + seconds;
    remainingTime = remainingTime ? remainingTime : totalInitialTime;

    if (remainingTime <= 0) return;

    isRunning = true;
    playBtn.innerHTML = `
      <svg width="13px" height="13px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 1H2V15H7V1Z" fill="#000000"></path> <path d="M14 1H9V15H14V1Z" fill="#000000"></path> </g></svg>
      `;

    countdownInterval = setInterval(() => {
      if (remainingTime <= 0) {
        updateProgress(0);
        clearInterval(countdownInterval);
        isRunning = false;
        totalInitialTime = 0;
        playBtn.innerHTML = `<svg width="13px" height="13px" viewBox="-0.5 0 8 8" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>play [#1001]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-427.000000, -3765.000000)" fill="#000000"> <g id="icons" transform="translate(56.000000, 160.000000)"> <polygon id="play-[#1001]" points="371 3605 371 3613 378 3609"> </polygon> </g> </g> </g> </g></svg>
        `;
        saveState();
        return;
      }

      remainingTime--;

      console.log(remainingTime, totalInitialTime);

      const currentMinutes = Math.floor(remainingTime / 60);
      const currentSeconds = remainingTime % 60;

      minInput.value = String(currentMinutes).padStart(3, "0");
      secInput.value = String(currentSeconds).padStart(2, "0");

      const progressPercentage =
        ((totalInitialTime - remainingTime) / totalInitialTime) * 100;

      updateProgress(progressPercentage);
      saveState();
    }, 1000);
    saveState();
  };

  const updateProgress = (percentage) => {
    const progressBar = shadowRoot.querySelector(".progress");
    progressBar.style.width = `${percentage}%`;
  };

  const stopTimer = () => {
    clearInterval(countdownInterval);
    isRunning = false;

    saveState();
  };

  const resetTimer = () => {
    stopTimer();
    resetInputs();
    totalInitialTime = 0;
    remainingTime = 0;
    const playBtn = shadowRoot.querySelector(".play-btn");
    playBtn.innerHTML = `<svg width="13px" height="13px" viewBox="-0.5 0 8 8" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>play [#1001]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-427.000000, -3765.000000)" fill="#000000"> <g id="icons" transform="translate(56.000000, 160.000000)"> <polygon id="play-[#1001]" points="371 3605 371 3613 378 3609"> </polygon> </g> </g> </g> </g></svg>
    `;
    saveState();
  };

  const resetInputs = () => {
    shadowRoot.getElementById("timer-min").value = "000";
    shadowRoot.getElementById("timer-sec").value = "00";
    shadowRoot.getElementById("focus-input").value = "";
    updateProgress(0);
  };

  const toggleTimer = () => {
    const playBtn = shadowRoot.querySelector(".play-btn");

    if (!isRunning) {
      startTimer();
    } else {
      stopTimer();
      playBtn.innerHTML = `<svg width="13px" height="13px" viewBox="-0.5 0 8 8" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>play [#1001]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-427.000000, -3765.000000)" fill="#000000"> <g id="icons" transform="translate(56.000000, 160.000000)"> <polygon id="play-[#1001]" points="371 3605 371 3613 378 3609"> </polygon> </g> </g> </g> </g></svg>
      `;
    }
    saveState();
  };

  shadowRoot
    .getElementById("timer-min")
    .addEventListener("input", validateTimerInput);
  shadowRoot
    .getElementById("timer-sec")
    .addEventListener("input", validateTimerInput);
  shadowRoot.querySelector(".play-btn").addEventListener("click", toggleTimer);
  shadowRoot.querySelector(".reset-btn").addEventListener("click", resetTimer);

  const progressContainer = shadowRoot.querySelector(".container");
  const notch = shadowRoot.querySelector(".notch");
  const snoozeBtn = shadowRoot.querySelector("#snooze-btn");
  const optionsBtn = shadowRoot.querySelector(".options-btn");
  const dropdownMenu = shadowRoot.querySelector(".dropdown-menu");
  const animationToggle = shadowRoot.getElementById("animation-toggle");
  const themeToggleBtn = shadowRoot.getElementById("darkmode-toggle");
  const colorOptions = shadowRoot.querySelectorAll(".color-option");
  const closeDropdownBtn = shadowRoot.querySelector(".close-btn");

  closeDropdownBtn.addEventListener("click", () => {
    dropdownMenu.classList.add("hidden");
  });

  notch.addEventListener("click", () => {
    const container = shadowRoot.querySelector(".container");
    const svg = notch.querySelector("svg");

    if (container.classList.contains("collapsed")) {
      container.classList.remove("collapsed");
      svg.style.transform = "";
    } else {
      container.classList.add("collapsed");
      svg.style.transform = `rotate(180deg) translateX(50%)`;
      dropdownMenu.classList.add("hidden");
    }

    saveState();
  });

  snoozeBtn.addEventListener("click", () => {
    snooze();
  });

  optionsBtn.addEventListener("click", () => {
    dropdownMenu.classList.toggle("hidden");
    saveState();
  });

  colorOptions.forEach((el) => {
    const progress = shadowRoot.querySelector(".progress");
    el.addEventListener("click", () => {
      const color = el.style.backgroundColor;
      progress.style.backgroundColor = color;
      saveState();
    });
  });

  animationToggle.addEventListener("change", () => {
    const progress = shadowRoot.querySelector(".progress");

    if (animationToggle.checked) {
      progress.classList.add("shim");
    } else {
      progress.classList.remove("shim");
    }
    saveState();
  });

  themeToggleBtn.addEventListener("change", () => {
    if (themeToggleBtn.checked) {
      progressContainer.classList.add("dark-mode");
    } else {
      progressContainer.classList.remove("dark-mode");
    }
    notch.classList.toggle("dark-mode");
    saveState();
  });

  const saveState = () => {
    const progressText = shadowRoot.getElementById("focus-input").value;
    const timerMin = shadowRoot.getElementById("timer-min").value;
    const timerSec = shadowRoot.getElementById("timer-sec").value;
    const isCollapsed = shadowRoot
      .querySelector(".container")
      .classList.contains("collapsed");
    const isDarkMode = shadowRoot
      .querySelector(".container")
      .classList.contains("dark-mode");
    const progressWidth = shadowRoot.querySelector(".progress").style.width;
    const resetBtn = shadowRoot.querySelector(".reset-btn").style.display;
    const progressColor =
      shadowRoot.querySelector(".progress").style.backgroundColor;
    const progressAnimation = shadowRoot
      .querySelector(".progress")
      .classList.contains("shim");
    const snoozed = container.style.visibility === "hidden";

    const state = {
      progressColor,
      progressAnimation,
      isDarkMode,
      progressText,
      timerMin,
      timerSec,
      isRunning,
      totalInitialTime,
      remainingTime,
      isCollapsed,
      progressWidth,
      resetBtn,
      snoozed,
    };

    chrome.storage.sync.set({ state });
  };

  const loadState = () => {
    chrome.storage.sync.get("state", ({ state }) => {
      if (state) {
        const {
          isDarkMode,
          progressText,
          progressColor,
          progressAnimation,
          timerMin,
          timerSec,
          isRunning: running,
          totalInitialTime: initialTime,
          remainingTime: remaining,
          isCollapsed,
          progressWidth,
          resetBtn,
          snoozed,
        } = state;

        if (snoozed) {
          container.style.visibility = "hidden";
        }

        shadowRoot.getElementById("focus-input").value = progressText;
        shadowRoot.getElementById("timer-min").value = timerMin;
        shadowRoot.getElementById("timer-sec").value = timerSec;

        if (progressAnimation) {
          const animationToggle = shadowRoot.querySelector("#animation-toggle");
          if (animationToggle) animationToggle.checked = true;
          shadowRoot.querySelector(".progress").classList.add("shim");
        }

        if (progressColor) {
          shadowRoot.querySelector(".progress").style.backgroundColor =
            progressColor;
        }

        if (isCollapsed) {
          shadowRoot.querySelector(".container").classList.add("collapsed");
          const svg = shadowRoot.querySelector(".notch svg");
          svg.style.transform = `rotate(180deg) translateX(50%)`;
        }

        if (isDarkMode) {
          const darkModeToggle = shadowRoot.querySelector("#darkmode-toggle");
          if (darkModeToggle) {
            darkModeToggle.checked = true;
            shadowRoot.querySelector(".container").classList.add("dark-mode");
            shadowRoot.querySelector(".notch").classList.add("dark-mode");
          }
        }

        shadowRoot.querySelector(".progress").style.width = progressWidth;
        shadowRoot.querySelector(".reset-btn").style.display = resetBtn;

        isRunning = running;
        totalInitialTime = initialTime;
        remainingTime = remaining;
      }
    });
  };

  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === "sync") {
      const {
        isDarkMode,
        progressText,
        progressColor,
        progressAnimation,
        timerMin,
        timerSec,
        isRunning: running,
        totalInitialTime: initialTime,
        remainingTime: remaining,
        isCollapsed,
        progressWidth,
        resetBtn,
        snoozed,
      } = changes.state.newValue;

      if (snoozed) {
        container.style.visibility = "hidden";
      } else {
        container.style.visibility = "visible";
      }

      shadowRoot.getElementById("focus-input").value = progressText;
      shadowRoot.getElementById("timer-min").value = timerMin;
      shadowRoot.getElementById("timer-sec").value = timerSec;

      if (progressAnimation) {
        const animationToggle = shadowRoot.querySelector("#animation-toggle");
        if (animationToggle) animationToggle.checked = true;
        shadowRoot.querySelector(".progress").classList.add("shim");
      } else {
        const animationToggle = shadowRoot.querySelector("#animation-toggle");
        if (animationToggle) animationToggle.checked = false;
        shadowRoot.querySelector(".progress").classList.remove("shim");
      }

      if (progressColor) {
        shadowRoot.querySelector(".progress").style.backgroundColor =
          progressColor;
      }

      if (isCollapsed) {
        shadowRoot.querySelector(".container").classList.add("collapsed");
        const svg = shadowRoot.querySelector(".notch svg");
        const menu = shadowRoot.querySelector(".dropdown-menu");
        svg.style.transform = `rotate(180deg) translateX(50%)`;
        menu.classList.add("hidden");
      } else {
        shadowRoot.querySelector(".container").classList.remove("collapsed");
        const svg = shadowRoot.querySelector(".notch svg");
        svg.style.transform = "";
      }

      if (isDarkMode) {
        const darkModeToggle = shadowRoot.querySelector("#darkmode-toggle");
        if (darkModeToggle) {
          darkModeToggle.checked = true;
          shadowRoot.querySelector(".container").classList.add("dark-mode");
          shadowRoot.querySelector(".notch").classList.add("dark-mode");
        }
      } else {
        const darkModeToggle = shadowRoot.querySelector("#darkmode-toggle");
        if (darkModeToggle) {
          darkModeToggle.checked = false;
          shadowRoot.querySelector(".container").classList.remove("dark-mode");
          shadowRoot.querySelector(".notch").classList.remove("dark-mode");
        }
      }
      shadowRoot.querySelector(".progress").style.width = progressWidth;
      shadowRoot.querySelector(".reset-btn").style.display = resetBtn;

      isRunning = running;
      totalInitialTime = initialTime;
      remainingTime = remaining;

      const playBtn = shadowRoot.querySelector(".play-btn");
      if (isRunning) {
        playBtn.innerHTML = `<svg width="13px" height="13px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 1H2V15H7V1Z" fill="#000000"></path> <path d="M14 1H9V15H14V1Z" fill="#000000"></path> </g></svg>
        `;
      } else {
        clearInterval(countdownInterval);
        playBtn.innerHTML = `<svg width="13px" height="13px" viewBox="-0.5 0 8 8" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000">
          <g id="SVGRepo_bgCarrier" stroke-width="0"/>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
          <g id="SVGRepo_iconCarrier">
            <title>play [#1001]</title>
            <desc>
              Created with Sketch.
            </desc>
            <defs/>
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="Dribbble-Light-Preview" transform="translate(-427.000000, -3765.000000)" fill="#000000">
                <g id="icons" transform="translate(56.000000, 160.000000)">
                  <polygon id="play-[#1001]" points="371 3605 371 3613 378 3609"/>
                </g>
              </g>
            </g>
          </g>
        </svg>
        `;
      }

      if (remaining === 0 && changes.state.oldValue.remainingTime === 0) {
        if (!running && changes.state.oldValue.isRunning) {
          triggerConfetti();
        }
      }
    }
  });

  loadState();

  function snooze() {
    const snoozeTime = 60 * 60 * 1000;

    container.style.visibility = "hidden";

    snoozeTimeout = setTimeout(() => {
      container.style.visibility = "visible";
      saveState();
    }, snoozeTime);
    saveState();
  }
}

render();

function triggerConfetti() {
  confetti({
    angle: 200,
    spread: 220,
    particleCount: 1000,
    origin: { x: 1, y: 0 },
  });

  confetti({
    angle: -20,
    spread: 220,
    particleCount: 1000,
    origin: { x: 0, y: 0 },
  });

  confetti({
    angle: -90,
    spread: 220,
    particleCount: 1000,
    origin: { x: 0.5, y: 0 },
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "render") {
    render();
  }
});
