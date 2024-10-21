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
                ]),
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
            (Math.PI / 10) * e.wobble,
          ),
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
              2 * Math.PI,
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
              2 * Math.PI,
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
            }),
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
    !1,
  ),
    (t.confetti = e.exports);
})(window, {});

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
        width: 260px;
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
        <input type="text" id="timer-min" value="00" />
        :
        <input type="text" id="timer-sec" value="00" />
        <button class="play-btn">
           <svg width="13px" height="13px" viewBox="-0.5 0 8 8" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>play [#1001]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-427.000000, -3765.000000)" fill="#000000"> <g id="icons" transform="translate(56.000000, 160.000000)"> <polygon id="play-[#1001]" points="371 3605 371 3613 378 3609"> </polygon> </g> </g> </g> </g></svg>
         </button>
        <button class="reset-btn">
         <svg width="13px" height="13px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="1" y="1" width="14" height="14" fill="#000000"></rect> </g></svg>
        </button>
      </div>
      <button class="options-btn">⋮</button>

      <div class="dropdown-menu hidden">
        <div class="dropdown-item row heading">
          <h4>ULTRA FOCUS</h4>
          <a href="https://example.com/" target="_blank">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M5 12V6C5 5.44772 5.44772 5 6 5H18C18.5523 5 19 5.44772 19 6V18C19 18.5523 18.5523 19 18 19H12M8.11111 12H12M12 12V15.8889M12 12L5 19" stroke="#464455" stroke-linecap="round" stroke-linejoin="round"></path>
              </g>
            </svg>
          </a>
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
          <a href="https://example.com/" target="_blank">About</a>
          <a href="https://example.com/" target="_blank">Guide</a>
          <a href="https://example.com/" target="_blank">Feedback</a>
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

  const validateTimerInput = () => {
    const minInput = shadowRoot.getElementById("timer-min");
    const secInput = shadowRoot.getElementById("timer-sec");

    const isNumber = /^\d+$/;

    if (
      !isNumber.test(minInput.value.trim()) ||
      parseInt(minInput.value) > 59
    ) {
      minInput.classList.add("input-error");
      minInput.setAttribute("aria-invalid", "true");
    } else {
      minInput.classList.remove("input-error");
      minInput.removeAttribute("aria-invalid");
    }

    if (
      !isNumber.test(secInput.value.trim()) ||
      parseInt(secInput.value) > 59
    ) {
      secInput.classList.add("input-error");
      secInput.setAttribute("aria-invalid", "true");
    } else {
      secInput.classList.remove("input-error");
      secInput.removeAttribute("aria-invalid");
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

      minInput.value = String(currentMinutes).padStart(2, "0");
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
    shadowRoot.getElementById("timer-min").value = "00";
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

  notch.addEventListener("click", () => {
    const container = shadowRoot.querySelector(".container");
    const svg = notch.querySelector("svg");

    if (container.classList.contains("collapsed")) {
      container.classList.remove("collapsed");
      svg.style.transform = "";
    } else {
      container.classList.add("collapsed");
      svg.style.transform = `rotate(180deg) translateX(50%)`;
    }

    saveState();
  });

  const snoozeBtn = shadowRoot.querySelector("#snooze-btn");
  const optionsBtn = shadowRoot.querySelector(".options-btn");
  const dropdownMenu = shadowRoot.querySelector(".dropdown-menu");
  const animationToggle = shadowRoot.getElementById("animation-toggle");
  const themeToggleBtn = shadowRoot.getElementById("darkmode-toggle");
  const colorOptions = shadowRoot.querySelectorAll(".color-option");

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
        svg.style.transform = `rotate(180deg) translateX(50%)`;
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
