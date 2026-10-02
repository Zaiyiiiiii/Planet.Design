/* @ds-bundle: {"format":4,"namespace":"Planet","components":[{"name":"Button"},{"name":"TextField"},{"name":"Tabs"},{"name":"Stamp"},{"name":"CaseFile"},{"name":"Headline"},{"name":"Ticker"},{"name":"OrbitGauge"},{"name":"Poster"},{"name":"TopBar"},{"name":"Faction"},{"name":"Notice"},{"name":"Avatar"},{"name":"Icon"},{"name":"Switch"},{"name":"Checkbox"},{"name":"Progress"},{"name":"DataTable"},{"name":"Dialog"},{"name":"EmptyState"},{"name":"Select"},{"name":"Sidebar"},{"name":"Pagination"},{"name":"Tooltip"},{"name":"TagInput"},{"name":"Menu"},{"name":"List"},{"name":"NeonSign"},{"name":"Stall"},{"name":"Marquee"},{"name":"RouteBadge"},{"name":"Assistant"},{"name":"Logo"}]} */
(function () {
  var React = window.React, h = React.createElement;
  function cx() { return Array.prototype.filter.call(arguments, Boolean).join(" "); }
  function omit(o, keys) { var r = {}; for (var k in o) if (keys.indexOf(k) < 0) r[k] = o[k]; return r; }
  var uid = 0; function useId(prefix) { var r = React.useRef(null); if (!r.current) r.current = prefix + "-" + (++uid); return r.current; }

  /* Button — chamfered deco button. variant: primary | secondary | danger | ghost; size: sm | md | lg */
  function Button(p) {
    var variant = p.variant || "secondary", size = p.size || "md";
    var rest = omit(p, ["variant", "size", "icon", "className", "children"]);
    return h("button", Object.assign({ type: "button" }, rest, {
      className: cx("pl-btn", "pl-btn-" + variant, size !== "md" && "pl-btn-" + size, p.className)
    }), p.icon || null, p.children);
  }

  /* TextField — typewriter input with label, hint and error. */
  function TextField(p) {
    var id = useId("pl-field"), hintId = id + "-hint";
    var msg = p.error || p.hint;
    var rest = omit(p, ["label", "hint", "error", "className"]);
    return h("div", { className: cx("pl-field", p.error && "pl-field-invalid", p.className) },
      h("label", { className: "pl-field-label", htmlFor: id }, p.label),
      h("span", { className: "pl-field-frame" },
        h("input", Object.assign({}, rest, { id: id, className: "pl-field-input", "aria-invalid": p.error ? "true" : undefined, "aria-describedby": msg ? hintId : undefined }))),
      msg ? h("span", { id: hintId, className: "pl-field-hint" }, p.error ? "✕ " + p.error : p.hint) : null);
  }

  /* Tabs — folder tabs. items: [{id, label, content}] */
  function Tabs(p) {
    var items = p.items || [];
    var st = React.useState(p.defaultId || (items[0] && items[0].id)), cur = st[0], set = st[1];
    var base = useId("pl-tabs"), refs = React.useRef({});
    function onKey(e, i) {
      var n = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0; if (!n) return;
      e.preventDefault(); var nx = items[(i + n + items.length) % items.length]; set(nx.id); refs.current[nx.id] && refs.current[nx.id].focus();
    }
    var active = items.filter(function (t) { return t.id === cur; })[0];
    return h("div", { className: p.className },
      h("div", { className: "pl-tabs", role: "tablist", "aria-label": p.label },
        items.map(function (t, i) {
          var on = t.id === cur;
          return h("button", { key: t.id, ref: function (el) { refs.current[t.id] = el; }, type: "button", role: "tab", id: base + "-" + t.id,
            "aria-selected": on ? "true" : "false", "aria-controls": base + "-panel", tabIndex: on ? 0 : -1, className: "pl-tab",
            onClick: function () { set(t.id); }, onKeyDown: function (e) { onKey(e, i); } }, t.label);
        })),
      h("div", { className: "pl-tab-panel", role: "tabpanel", id: base + "-panel", "aria-labelledby": base + "-" + cur }, active ? active.content : null));
  }

  /* Stamp — rubber-stamp status. tone: brass | neon | signal | moss | ember | survey */
  function Stamp(p) {
    return h("span", { className: cx("pl-stamp", p.tone && p.tone !== "brass" && "pl-stamp-" + p.tone, p.tilt && "pl-stamp-tilt", p.className) }, p.children);
  }

  /* CaseFile — the dossier card: folder tab with case number, title, meta, body, optional stamp. */
  function CaseFile(p) {
    return h("article", { className: cx("pl-case", p.className) },
      p.caseNo ? h("div", { className: "pl-case-tab" }, p.caseNo) : null,
      h("div", { className: "pl-case-body" },
        h("h3", { className: "pl-case-title" }, p.title),
        p.meta ? h("p", { className: "pl-case-meta" }, p.meta) : null,
        h("div", { className: "pl-case-content" }, p.children)),
      p.stamp ? h("div", { className: "pl-case-stamp" }, p.stamp) : null);
  }

  /* Headline — "extra edition" headline block. size: xl | l */
  function Headline(p) {
    var Tag = p.as || "h1";
    return h("header", { className: cx("pl-headline", p.size === "l" && "pl-headline-l", p.className) },
      h("div", { className: "pl-headline-inner" },
        (p.kicker || p.dateline) ? h("div", { className: "pl-headline-kicker" }, h("span", null, p.kicker), h("span", null, p.dateline)) : null,
        h(Tag, { className: "pl-headline-title" }, p.title),
        p.deck ? h("p", { className: "pl-headline-deck" }, p.deck) : null));
  }

  /* Ticker — stellar-exchange tape. items: [{sym, name, price, delta}] */
  function Ticker(p) {
    var items = p.items || [];
    function row(dup) {
      return items.map(function (it, i) {
        var up = it.delta >= 0, d = Math.abs(it.delta).toFixed(1);
        return h("span", { key: (dup ? "b" : "a") + i, className: "pl-ticker-item", "aria-hidden": dup ? "true" : undefined },
          h("span", { className: "pl-ticker-sym" }, it.sym),
          it.name ? h("span", { className: "pl-ticker-name" }, it.name) : null,
          h("span", null, it.price),
          h("span", { className: up ? "pl-up" : "pl-down" }, (up ? "▲ +" : "▼ −") + d + "%"));
      });
    }
    return h("div", { className: cx("pl-ticker", p.className), role: "region", "aria-label": p.ariaLabel || "行情 Market tape" },
      h("div", { className: "pl-ticker-label" }, p.label || "行情 LIVE"),
      h("div", { className: "pl-ticker-viewport" }, h("div", { className: "pl-ticker-track" }, row(false), row(true))));
  }

  /* OrbitGauge — 270° deco dial. value 0–100, label, unit, tone: signal (default) | ember | moss */
  function OrbitGauge(p) {
    var v = Math.max(0, Math.min(100, Number(p.value) || 0));
    var r = 62, cx0 = 84, cy0 = 84, sweep = 270, start = 135;
    function pt(a, rr) { var t = a * Math.PI / 180; return [cx0 + rr * Math.cos(t), cy0 + rr * Math.sin(t)]; }
    function arc(a0, a1) { var s = pt(a0, r), e = pt(a1, r), large = (a1 - a0) > 180 ? 1 : 0; return "M" + s[0].toFixed(2) + " " + s[1].toFixed(2) + " A" + r + " " + r + " 0 " + large + " 1 " + e[0].toFixed(2) + " " + e[1].toFixed(2); }
    var ticks = []; for (var i = 0; i <= 10; i++) { var a = start + sweep * i / 10, o = pt(a, 76), n = pt(a, i % 5 ? 72 : 69); ticks.push(h("line", { key: i, className: "pl-gauge-tick", x1: o[0], y1: o[1], x2: n[0], y2: n[1] })); }
    return h("figure", { className: cx("pl-gauge", p.tone && p.tone !== "signal" && "pl-gauge-" + p.tone, p.className), style: { margin: 0 } },
      h("svg", { viewBox: "0 0 168 168", role: "img", "aria-label": (p.label || "") + " " + v + (p.unit || "") },
        h("circle", { className: "pl-gauge-orbit", cx: cx0, cy: cy0, r: 48 }),
        h("path", { className: "pl-gauge-track", d: arc(start, start + sweep) }),
        v > 0 ? h("path", { className: "pl-gauge-value", d: arc(start, start + sweep * v / 100) }) : null,
        ticks,
        h("text", { className: "pl-gauge-num", x: cx0, y: cy0 + 12, textAnchor: "middle" }, String(Math.round(v))),
        p.unit ? h("text", { className: "pl-gauge-unit", x: cx0, y: cy0 + 34, textAnchor: "middle" }, p.unit) : null),
      p.label ? h("figcaption", { className: "pl-gauge-label" }, p.label) : null);
  }

  /* Poster — a WANTED notice on old paper. */
  function Poster(p) {
    return h("section", { className: cx("pl-poster", p.className) },
      p.kicker ? h("p", { className: "pl-poster-kicker" }, p.kicker) : null,
      h("h2", { className: "pl-poster-title" }, p.title),
      p.subtitle ? h("p", { className: "pl-poster-sub" }, h("span", { className: "pl-poster-sub-bg" }, p.subtitle)) : null,
      p.reward ? h("span", { className: "pl-poster-reward" }, h("small", null, p.rewardLabel || "REWARD 赏金"), p.reward) : null,
      p.action || null);
  }

  /* The keyhole-planet mark, inline so it takes CSS color. */
  var markN = 0;
  function Mark() {
    var k = React.useRef(null); if (!k.current) k.current = "plm" + (++markN);
    var b = k.current + "b", f = k.current + "f";
    return h("svg", { viewBox: "0 0 64 64", fill: "currentColor", "aria-hidden": "true" },
      h("defs", null,
        h("mask", { id: b, maskUnits: "userSpaceOnUse", x: -40, y: -40, width: 80, height: 80 },
          h("rect", { x: -40, y: -40, width: 80, height: 80, fill: "#fff" }), h("path", { d: "M-19 0a19 19 0 0 1 38 0z", fill: "#000" })),
        h("mask", { id: f, maskUnits: "userSpaceOnUse", x: -40, y: -40, width: 80, height: 80 },
          h("rect", { x: -40, y: -40, width: 80, height: 80, fill: "#fff" }),
          h("path", { d: "M-29 0a29 7 0 0 0 58 0", fill: "none", stroke: "#000", strokeWidth: 8 }),
          h("circle", { cx: 0, cy: -3, r: 4, fill: "#000" }), h("path", { d: "M-2.4 -1h4.8l1.6 10h-8z", fill: "#000" }))),
      h("g", { transform: "translate(32 32) rotate(-18)" },
        h("circle", { r: 16, mask: "url(#" + f + ")" }),
        h("ellipse", { rx: 29, ry: 7, fill: "none", stroke: "currentColor", strokeWidth: 3.5, mask: "url(#" + b + ")" })));
  }

  /* TopBar — app header: mark + name, nav links, end slot. links: [{label, href, current}] */
  function TopBar(p) {
    return h("header", { className: cx("pl-topbar", p.className) },
      h("a", { className: "pl-topbar-brand", href: p.homeHref || "#" }, h(Mark), p.appName || "PLANET"),
      h("nav", { className: "pl-topbar-nav", "aria-label": "主导航 Main" },
        (p.links || []).map(function (l, i) {
          return h("a", { key: i, className: "pl-topbar-link", href: l.href || "#", "aria-current": l.current ? "page" : undefined }, l.label);
        })),
      p.end ? h("div", { className: "pl-topbar-end" }, p.end) : null);
  }


  /* Factions: the eight powers of Duskline, each with a 16px emblem drawn in currentColor. */
  var FACTIONS = {
    agency: { zh: "昏线侦探社", en: "Duskline Agency" },
    survey: { zh: "测绘局残部", en: "Survey Remnant" },
    union: { zh: "霓虹工会", en: "Tubeworkers' Union" },
    sunward: { zh: "向阳会", en: "The Sunward" },
    choir: { zh: "回声教团", en: "Choir of the Echo" },
    exchange: { zh: "潮汐交易所", en: "Tidal Exchange" },
    couriers: { zh: "航标鸟", en: "Beacon Couriers" },
    consulate: { zh: "母星领事馆", en: "Cradle Consulate" }
  };
  function Emblem(p) {
    var s = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "square", strokeLinejoin: "miter" }, k = p.faction, parts;
    if (k === "agency") parts = [h("circle", { key: 1, cx: 8, cy: 6, r: 3, fill: "currentColor" }), h("path", { key: 2, d: "M6.6 7.5L5.4 14h5.2L9.4 7.5z", fill: "currentColor" })];
    else if (k === "survey") parts = [h("circle", Object.assign({ key: 1, cx: 8, cy: 8, r: 6.2 }, s)), h("ellipse", Object.assign({ key: 2, cx: 8, cy: 8, rx: 2.8, ry: 6.2 }, s)), h("path", Object.assign({ key: 3, d: "M1.8 8h12.4" }, s))];
    else if (k === "union") parts = [h("path", Object.assign({ key: 1, d: "M1.5 11.5L4.8 4.5 8 11.5 11.2 4.5 14.5 11.5" }, s))];
    else if (k === "sunward") parts = [h("path", Object.assign({ key: 1, d: "M3 12a5 5 0 0 1 10 0zM1 14.5h14M8 2.5v2M2.9 5.4l1.4 1.4M13.1 5.4l-1.4 1.4" }, s))];
    else if (k === "choir") parts = [h("circle", { key: 1, cx: 8, cy: 8, r: 1.8, fill: "currentColor" }), h("circle", Object.assign({ key: 2, cx: 8, cy: 8, r: 4.3 }, s)), h("circle", Object.assign({ key: 3, cx: 8, cy: 8, r: 6.8 }, s))];
    else if (k === "exchange") parts = [h("path", Object.assign({ key: 1, d: "M8 2v9M2.5 4.5h11M2.5 4.5L1 9h3zM13.5 4.5L12 9h3zM1.5 13.5c2 -1.2 3.5 1.2 5.5 0s3.5 1.2 5.5 0 2 -.6 2.5 0" }, s))];
    else if (k === "couriers") parts = [h("path", Object.assign({ key: 1, d: "M2 9h12M10 5l4 4-4 4M2 5l4 4M4.5 3.5L9 9" }, s))];
    else if (k === "consulate") parts = [h("rect", Object.assign({ key: 1, x: 2, y: 2, width: 12, height: 12 }, s)), h("circle", { key: 2, cx: 8, cy: 8, r: 2.6, fill: "currentColor" })];
    else parts = [h("circle", Object.assign({ key: 1, cx: 8, cy: 8, r: 5 }, s))];
    return h("svg", { viewBox: "0 0 16 16", "aria-hidden": "true" }, parts);
  }

  /* Faction — a tag saying which power a piece of content belongs to. */
  function Faction(p) {
    var f = FACTIONS[p.faction] || FACTIONS.agency;
    return h("span", { className: cx("pl-faction", "pl-f-" + (FACTIONS[p.faction] ? p.faction : "agency"), p.className) },
      h(Emblem, { faction: p.faction }), p.children || (p.lang === "en" ? f.en : f.zh));
  }

  var SPEAKERS = {
    locket: { name: "PLANET · 昏线标志", faction: "agency", org: "卫星" },
    eli: { name: "伊莱·范 Eli Vann", faction: "agency" },
    zhaowu: { name: "宋朝雾", faction: "agency" },
    tally: { name: "账房 Tally", faction: "exchange" },
    tide: { name: "潮先生", faction: "exchange" },
    kite: { name: "小飞 Kite", faction: "couriers" },
    ophelia: { name: "奥菲莉亚·墨", faction: "survey" },
    edna: { name: "Consul Edna Kane", faction: "consulate" },
    hattie: { name: "哈蒂修女", faction: "choir" },
    marge: { name: "玛格·奥瑞", faction: "union" },
    august: { name: "奥古斯特·白", faction: "sunward" }
  };
  var ICON_STYLE = { w: 1.75, cap: "square", join: "miter" };

  var LIGHT = { dir: "h", hi: "rgba(255,214,150,0.32)", lo: "rgba(6,10,14,0.5)", sx: 0.3, sy: 0.28, gx: 0.2, gy: 0.15, glow: "rgba(255,240,210,0.35)" };

  /* Cast — the ensemble as flat 2D busts: shape, colour and props, no lighting. */
  var CAST = {"eli":[{"t":"path","fill":"#8f6f47","d":"M10 96C10 78 25 68.5 48 68.5S86 78 86 96Z","v":"vol"},{"t":"path","fill":"#e2b48c","d":"M41.5 52h13v17h-13z","v":"vol"},{"t":"path","fill":"rgba(0,0,0,0.18)","d":"M41.5 60c4 3 9 3 13 0v-3h-13z"},{"t":"path","fill":"#6e5334","d":"M30 70l10-4 8 14 8-14 10 4-6 26H36z","v":"vol"},{"t":"path","fill":"#e8e1d2","d":"M41 66l7 14 7-14z"},{"t":"path","fill":"#6b1f22","d":"M46.6 69h2.8l1.2 14-2.6 3-2.6-3z","v":"vol"},{"t":"path","fill":"#7a5c3a","d":"M33 72c3-8 6-12 9-14l2 10z","v":"vol"},{"t":"path","fill":"#7a5c3a","d":"M63 72c-3-8-6-12-9-14l-2 10z","v":"vol"},{"t":"ellipse","fill":"#e2b48c","cx":34.5,"cy":44,"rx":3,"ry":4.6,"v":"vol"},{"t":"ellipse","fill":"#e2b48c","cx":61.5,"cy":44,"rx":3,"ry":4.6,"v":"vol"},{"t":"path","fill":"#e2b48c","d":"M34 40C34 28 40 23.5 48 23.5S62 28 62 40C62 52.5 56 60.5 48 60.5S34 52.5 34 40Z","v":"sph"},{"t":"path","fill":"rgba(60,40,30,0.28)","d":"M37 50c2 7 6 10.5 11 10.5s9-3.5 11-10.5c-3 4-6.5 5.5-11 5.5s-8-1.5-11-5.5z"},{"t":"ellipse","fill":"#1d1a20","cx":42,"cy":43,"rx":1.8,"ry":1.7},{"t":"path","fill":"none","d":"M39.4 41.4q2.6-1.2 5.2 0","stroke":"rgba(60,30,20,0.55)","sw":1.1},{"t":"ellipse","fill":"#1d1a20","cx":54,"cy":43,"rx":1.8,"ry":1.7},{"t":"path","fill":"none","d":"M51.4 41.4q2.6-1.2 5.2 0","stroke":"rgba(60,30,20,0.55)","sw":1.1},{"t":"path","fill":"none","d":"M39.5 45.6q2.5 1.2 5 0M51.5 45.6q2.5 1.2 5 0","stroke":"rgba(80,40,40,0.35)","sw":0.9},{"t":"path","fill":"none","d":"M38 37.2q3.8-0.6 7.6 1M50.4 38.2q3.8-1.6 7.6-1","linecap":"round","stroke":"#4a3a2e","sw":1.8},{"t":"path","fill":"none","d":"M48.6 44.2q-2 4.2 0.4 5.6","stroke":"rgba(70,30,20,0.32)","sw":1.2},{"t":"path","fill":"none","d":"M44.6 53.4h6.8","linecap":"round","stroke":"#6b2d2a","sw":1.5},{"t":"ellipse","fill":"#2d2b30","cx":48,"cy":30.5,"rx":25,"ry":5.6,"v":"vol"},{"t":"path","fill":"#36343a","d":"M31 30.5C31 17 37 11.5 48 11.5S65 17 65 30.5Z","v":"vol"},{"t":"path","fill":"#8a5a1a","d":"M31.4 26h33.2v4.4H31.4z","v":"vol"},{"t":"path","fill":"rgba(0,0,0,0.25)","d":"M41 13.5c3-1.5 11-1.5 14 0l-1 3c-3-1-9-1-12 0z"}],"zhaowu":[{"t":"path","fill":"#1f1b24","d":"M28 44C28 26 37 20 48 20S68 26 68 44v16H28z","v":"vol"},{"t":"path","fill":"#c8902c","d":"M10 96C10 78 25 68.5 48 68.5S86 78 86 96Z","v":"vol"},{"t":"path","fill":"#f2d0b0","d":"M41.5 52h13v17h-13z","v":"vol"},{"t":"path","fill":"rgba(0,0,0,0.18)","d":"M41.5 60c4 3 9 3 13 0v-3h-13z"},{"t":"path","fill":"#f3eee2","d":"M38 69l10 9 10-9-2-1.5-8 6.5-8-6.5z"},{"t":"ellipse","fill":"#f2d0b0","cx":34.5,"cy":44,"rx":3,"ry":4.6,"v":"vol"},{"t":"ellipse","fill":"#f2d0b0","cx":61.5,"cy":44,"rx":3,"ry":4.6,"v":"vol"},{"t":"path","fill":"#f2d0b0","d":"M34 40C34 28 40 23.5 48 23.5S62 28 62 40C62 52.5 56 60.5 48 60.5S34 52.5 34 40Z","v":"sph"},{"t":"ellipse","fill":"#1d1a20","cx":42,"cy":42.5,"rx":2.3,"ry":2.8},{"t":"circle","fill":"#ffffff","cx":42.9,"cy":41.5,"r":0.85},{"t":"circle","fill":"#ffffff","cx":41.4,"cy":43.6,"r":0.35},{"t":"ellipse","fill":"#1d1a20","cx":54,"cy":42.5,"rx":2.3,"ry":2.8},{"t":"circle","fill":"#ffffff","cx":54.9,"cy":41.5,"r":0.85},{"t":"circle","fill":"#ffffff","cx":53.4,"cy":43.6,"r":0.35},{"t":"path","fill":"none","d":"M38.5 36.6q3.5-2.6 7-0.6M50.5 36q3.5-2 7 0.6","linecap":"round","stroke":"#1f1b24","sw":1.8},{"t":"path","fill":"none","d":"M48.6 44.2q-2 4.2 0.4 5.6","stroke":"rgba(70,30,20,0.32)","sw":1.2},{"t":"path","fill":"#5a1f22","d":"M43.2 51.6q4.8 6 9.6 0z"},{"t":"path","fill":"#ffffff","d":"M44 51.9q4 1.5 8 0l-.4 1.1q-3.6 1.2-7.2 0z"},{"t":"path","fill":"none","d":"M45.6 55.2q2.4 1.1 4.8 0","linecap":"round","stroke":"#c0605a","sw":1.1},{"t":"ellipse","fill":"rgba(220,90,90,0.3)","cx":39,"cy":49.2,"rx":2.8,"ry":1.5},{"t":"ellipse","fill":"rgba(220,90,90,0.3)","cx":57,"cy":49.2,"rx":2.8,"ry":1.5},{"t":"path","fill":"#1f1b24","d":"M33.5 40C33.5 27 40 22 48 22S62.5 27 62.5 40c-4-6-9-9.5-14.5-9.5S37.5 34 33.5 40z","v":"vol"},{"t":"path","fill":"#d9a441","d":"M60.5 33l7-6.5 1.2 1.3-7 6.6z"},{"t":"path","fill":"#3a2a20","d":"M67.5 26.5l1.2 1.3 1.2-2.6z"},{"t":"path","fill":"#3d4b55","d":"M24 76h48v20H24z","v":"vol"},{"t":"path","fill":"#f6f3ea","d":"M30 66h36v12H30z","v":"vol"},{"t":"path","fill":"none","d":"M34 70h22M34 73h16","stroke":"rgba(30,30,40,0.45)","sw":0.9},{"t":"path","fill":"none","d":"M28 82h40M28 87h40","linecap":"round","dash":"2.2 3.2","stroke":"#9aa6ae","sw":2.2}],"ophelia":[{"t":"path","fill":"#2f4a7a","d":"M10 96C10 78 25 68.5 48 68.5S86 78 86 96Z","v":"vol"},{"t":"path","fill":"#f0d4ba","d":"M41.5 52h13v17h-13z","v":"vol"},{"t":"path","fill":"rgba(0,0,0,0.18)","d":"M41.5 60c4 3 9 3 13 0v-3h-13z"},{"t":"path","fill":"#25395f","d":"M38 66h20l-2 8H40z","v":"vol"},{"t":"circle","fill":"#d9a441","cx":48,"cy":80,"r":3.2,"v":"sph"},{"t":"path","fill":"#8a5a3a","d":"M24 86h6v-6h4v6h6v10H24z","v":"vol"},{"t":"path","fill":"#5c3a24","d":"M26 82h12v4H26z"},{"t":"ellipse","fill":"#f0d4ba","cx":34.5,"cy":44,"rx":3,"ry":4.6,"v":"vol"},{"t":"ellipse","fill":"#f0d4ba","cx":61.5,"cy":44,"rx":3,"ry":4.6,"v":"vol"},{"t":"path","fill":"#f0d4ba","d":"M34 40C34 28 40 23.5 48 23.5S62 28 62 40C62 52.5 56 60.5 48 60.5S34 52.5 34 40Z","v":"sph"},{"t":"ellipse","fill":"#1d1a20","cx":42,"cy":42.5,"rx":1.9,"ry":2.3},{"t":"circle","fill":"#ffffff","cx":42.7,"cy":41.7,"r":0.65},{"t":"ellipse","fill":"#1d1a20","cx":54,"cy":42.5,"rx":1.9,"ry":2.3},{"t":"circle","fill":"#ffffff","cx":54.7,"cy":41.7,"r":0.65},{"t":"path","fill":"none","d":"M38.5 37.6q3.5-1.6 7 0M50.5 37.6q3.5-1.6 7 0","linecap":"round","stroke":"#2a2d38","sw":1.8},{"t":"path","fill":"none","d":"M48.6 44.2q-2 4.2 0.4 5.6","stroke":"rgba(70,30,20,0.32)","sw":1.2},{"t":"path","fill":"none","d":"M44.6 53.4h6.8","linecap":"round","stroke":"#6b2d2a","sw":1.5},{"t":"circle","fill":"#2a2d38","cx":48,"cy":16,"r":6.5,"v":"sph"},{"t":"path","fill":"#2a2d38","d":"M33.6 38C34 27 40 22.5 48 22.5S62 27 62.4 38c-3-4.8-8-7.8-14.4-7.8S36.6 33.2 33.6 38z","v":"vol"},{"t":"circle","fill":"rgba(200,225,255,0.25)","cx":42,"cy":42.5,"r":4.2,"stroke":"#1d1d22","sw":1.3},{"t":"circle","fill":"rgba(200,225,255,0.25)","cx":54,"cy":42.5,"r":4.2,"stroke":"#1d1d22","sw":1.3},{"t":"path","fill":"none","d":"M46.2 42h3.6","stroke":"#1d1d22","sw":1.3},{"t":"path","fill":"none","d":"M39.6 41l2-1.6M51.6 41l2-1.6","stroke":"rgba(255,255,255,0.8)","sw":1}],"marge":[{"t":"circle","fill":"#b7402a","cx":34,"cy":26,"r":8,"v":"sph"},{"t":"circle","fill":"#b7402a","cx":62,"cy":24,"r":8.5,"v":"sph"},{"t":"circle","fill":"#b7402a","cx":48,"cy":20,"r":10,"v":"sph"},{"t":"path","fill":"#3e5269","d":"M10 96C10 78 25 68.5 48 68.5S86 78 86 96Z","v":"vol"},{"t":"path","fill":"#c58a5c","d":"M41.5 52h13v17h-13z","v":"vol"},{"t":"path","fill":"rgba(0,0,0,0.18)","d":"M41.5 60c4 3 9 3 13 0v-3h-13z"},{"t":"path","fill":"#5a3a24","d":"M14 86L76 70l2 5L16 92z","v":"vol"},{"t":"path","fill":"#b9b9b9","d":"M57 73h6v6h-6z","v":"vol"},{"t":"path","fill":"#2e3e52","d":"M41.5 68.5l6.5 7 6.5-7z"},{"t":"ellipse","fill":"#c58a5c","cx":34.5,"cy":44,"rx":3,"ry":4.6,"v":"vol"},{"t":"ellipse","fill":"#c58a5c","cx":61.5,"cy":44,"rx":3,"ry":4.6,"v":"vol"},{"t":"path","fill":"#c58a5c","d":"M34 40C34 28 40 23.5 48 23.5S62 28 62 40C62 52.5 56 60.5 48 60.5S34 52.5 34 40Z","v":"sph"},{"t":"ellipse","fill":"#1d1a20","cx":42,"cy":42.5,"rx":1.9,"ry":2.3},{"t":"circle","fill":"#ffffff","cx":42.7,"cy":41.7,"r":0.65},{"t":"ellipse","fill":"#1d1a20","cx":54,"cy":42.5,"rx":1.9,"ry":2.3},{"t":"circle","fill":"#ffffff","cx":54.7,"cy":41.7,"r":0.65},{"t":"path","fill":"none","d":"M38 37.2q3.8-0.6 7.6 1M50.4 38.2q3.8-1.6 7.6-1","linecap":"round","stroke":"#7a2a1a","sw":1.8},{"t":"path","fill":"none","d":"M48.6 44.2q-2 4.2 0.4 5.6","stroke":"rgba(70,30,20,0.32)","sw":1.2},{"t":"path","fill":"#5a1f22","d":"M43.2 51.6q4.8 6 9.6 0z"},{"t":"path","fill":"#ffffff","d":"M44 51.9q4 1.5 8 0l-.4 1.1q-3.6 1.2-7.2 0z"},{"t":"path","fill":"none","d":"M45.6 55.2q2.4 1.1 4.8 0","linecap":"round","stroke":"#c0605a","sw":1.1},{"t":"circle","fill":"#8a4a2a","cx":38.5,"cy":48.5,"r":0.7},{"t":"circle","fill":"#8a4a2a","cx":40.5,"cy":50,"r":0.6},{"t":"circle","fill":"#8a4a2a","cx":56.5,"cy":48.5,"r":0.7},{"t":"circle","fill":"#8a4a2a","cx":58,"cy":50.3,"r":0.6},{"t":"path","fill":"none","d":"M55 54.5c2.5-.5 4.5 0 6 1.5","linecap":"round","stroke":"rgba(40,30,30,0.5)","sw":1.6},{"t":"path","fill":"#2b2b2e","d":"M33.5 33h29v3.6h-29z"},{"t":"circle","fill":"#2b2b2e","cx":41.5,"cy":32,"r":4.6},{"t":"circle","fill":"#2b2b2e","cx":54.5,"cy":32,"r":4.6},{"t":"circle","fill":"#6fd3e0","cx":41.5,"cy":32,"r":3.2,"v":"sph"},{"t":"circle","fill":"#6fd3e0","cx":54.5,"cy":32,"r":3.2,"v":"sph"}],"tally":[{"t":"path","fill":"#b08a4a","d":"M14 96V80c0-7 5-12 12-12h44c7 0 12 5 12 12v16z","v":"vol"},{"t":"path","fill":"#6d757d","d":"M42 54h12v15H42z","v":"vol"},{"t":"path","fill":"none","d":"M42 58h12M42 63h12","stroke":"#4a5158","sw":1.2},{"t":"path","fill":"#5b4426","d":"M26 76h44v16H26z","v":"vol"},{"t":"path","fill":"none","d":"M28 80h40M28 86h40","stroke":"#2a2018","sw":1},{"t":"circle","fill":"#c0392b","cx":33,"cy":80,"r":2.4,"v":"sph"},{"t":"circle","fill":"#1d1a20","cx":39,"cy":80,"r":2.4,"v":"sph"},{"t":"circle","fill":"#c0392b","cx":57,"cy":80,"r":2.4,"v":"sph"},{"t":"circle","fill":"#1d1a20","cx":44,"cy":86,"r":2.4,"v":"sph"},{"t":"circle","fill":"#c0392b","cx":62,"cy":86,"r":2.4,"v":"sph"},{"t":"path","fill":"#9aa4ad","d":"M33 22h30a5 5 0 0 1 5 5v24a5 5 0 0 1-5 5H33a5 5 0 0 1-5-5V27a5 5 0 0 1 5-5z","v":"vol"},{"t":"circle","fill":"#5e666e","cx":32,"cy":26,"r":1.1},{"t":"circle","fill":"#5e666e","cx":64,"cy":26,"r":1.1},{"t":"circle","fill":"#5e666e","cx":32,"cy":52,"r":1.1},{"t":"circle","fill":"#5e666e","cx":64,"cy":52,"r":1.1},{"t":"circle","fill":"#2a2f35","cx":40.5,"cy":38,"r":5.2},{"t":"circle","fill":"#2a2f35","cx":55.5,"cy":38,"r":5.2},{"t":"circle","fill":"#ffb43a","cx":40.5,"cy":38,"r":3,"v":"sph"},{"t":"circle","fill":"#ffb43a","cx":55.5,"cy":38,"r":3,"v":"sph"},{"t":"circle","fill":"#fff6dc","cx":41.4,"cy":37,"r":0.9},{"t":"circle","fill":"#fff6dc","cx":56.4,"cy":37,"r":0.9},{"t":"path","fill":"#2a2f35","d":"M40 48h16v3.2H40z"},{"t":"path","fill":"none","d":"M43 48v3.2M46 48v3.2M49 48v3.2M52 48v3.2","stroke":"#6d757d","sw":0.8},{"t":"path","fill":"#6d757d","d":"M47 22V12h2v10z"},{"t":"circle","fill":"#ffb43a","cx":48,"cy":10.5,"r":3.2,"v":"sph"}],"tide":[{"t":"path","fill":"#1f1d22","d":"M10 96C10 78 25 68.5 48 68.5S86 78 86 96Z","v":"vol"},{"t":"path","fill":"#d7a988","d":"M41.5 52h13v17h-13z","v":"vol"},{"t":"path","fill":"rgba(0,0,0,0.18)","d":"M41.5 60c4 3 9 3 13 0v-3h-13z"},{"t":"path","fill":"#e9e3d6","d":"M36 70l12 16 12-16-4-2-8 10-8-10z"},{"t":"path","fill":"#7a2233","d":"M44.5 72h7l-1.5 8-2 2-2-2z","v":"vol"},{"t":"ellipse","fill":"#d7a988","cx":34.5,"cy":44,"rx":3,"ry":4.6,"v":"vol"},{"t":"ellipse","fill":"#d7a988","cx":61.5,"cy":44,"rx":3,"ry":4.6,"v":"vol"},{"t":"path","fill":"#d7a988","d":"M34 40C34 28 40 23.5 48 23.5S62 28 62 40C62 52.5 56 60.5 48 60.5S34 52.5 34 40Z","v":"sph"},{"t":"path","fill":"rgba(10,8,14,0.82)","d":"M34 40C34 28 40 23.5 48 23.5S62 28 62 40C62 52.5 56 60.5 48 60.5S34 52.5 34 40Z"},{"t":"path","fill":"none","d":"M44.5 54q3.5 1.8 7 0","linecap":"round","stroke":"rgba(230,200,180,0.55)","sw":1.4},{"t":"circle","fill":"none","cx":54,"cy":43,"r":3.4,"stroke":"#e0b44a","sw":1.2},{"t":"circle","fill":"#fff1c4","cx":54.8,"cy":42.2,"r":0.8},{"t":"ellipse","fill":"#141216","cx":48,"cy":31,"rx":24,"ry":5,"v":"vol"},{"t":"path","fill":"#1c1a1f","d":"M35 31V8h26v23z","v":"vol"},{"t":"path","fill":"#7a2233","d":"M35 24h26v5H35z","v":"vol"},{"t":"path","fill":"#2a282e","d":"M64 96V84c0-4 2-7 6-7h4c4 0 6 3 6 7v12z","v":"vol"},{"t":"path","fill":"none","d":"M64 84h16","stroke":"#141216","sw":1},{"t":"circle","fill":"none","cx":72,"cy":82,"r":3.4,"stroke":"#e0b44a","sw":2.2},{"t":"circle","fill":"#e05a6a","cx":72,"cy":78.6,"r":1.6,"v":"sph"}],"hattie":[{"t":"path","fill":"#1f2c26","d":"M24 96V52c0-20 10-31 24-31s24 11 24 31v44z","v":"vol"},{"t":"path","fill":"#2a3a32","d":"M10 96C10 78 25 68.5 48 68.5S86 78 86 96Z","v":"vol"},{"t":"path","fill":"#e7c3a0","d":"M41.5 52h13v17h-13z","v":"vol"},{"t":"path","fill":"rgba(0,0,0,0.18)","d":"M41.5 60c4 3 9 3 13 0v-3h-13z"},{"t":"path","fill":"#efe9dc","d":"M35 44c0-12 6-18 13-18s13 6 13 18c0 10-5 17-13 17s-13-7-13-17z","v":"vol"},{"t":"path","fill":"#e7c3a0","d":"M37.5 42C37.5 33 42 29 48 29S58.5 33 58.5 42c0 10-4.5 16-10.5 16S37.5 52 37.5 42z","v":"sph"},{"t":"path","fill":"none","d":"M41 42.6q2.2 1.8 4.4 0M50.6 42.6q2.2 1.8 4.4 0","stroke":"#1d1a20","sw":1.3},{"t":"path","fill":"none","d":"M48.6 44.2q-1.6 3.6 0.4 4.8","stroke":"rgba(70,30,20,0.3)","sw":1.1},{"t":"path","fill":"none","d":"M45.4 51.6q2.6 1.6 5.2 0","linecap":"round","stroke":"#6b2d2a","sw":1.4},{"t":"ellipse","fill":"rgba(220,90,90,0.18)","cx":39,"cy":49.2,"rx":2.8,"ry":1.5},{"t":"ellipse","fill":"rgba(220,90,90,0.18)","cx":57,"cy":49.2,"rx":2.8,"ry":1.5},{"t":"path","fill":"none","d":"M30 40c0-14 8-22 18-22s18 8 18 22","stroke":"#b8862f","sw":3.2},{"t":"ellipse","fill":"#2b2b2e","cx":29.5,"cy":44,"rx":5,"ry":7.5,"v":"vol"},{"t":"ellipse","fill":"#2b2b2e","cx":66.5,"cy":44,"rx":5,"ry":7.5,"v":"vol"},{"t":"ellipse","fill":"#b8862f","cx":29.5,"cy":44,"rx":3,"ry":5,"v":"sph"},{"t":"ellipse","fill":"#b8862f","cx":66.5,"cy":44,"rx":3,"ry":5,"v":"sph"},{"t":"circle","fill":"none","cx":48,"cy":82,"r":5,"stroke":"#d9b24a","sw":1.3},{"t":"circle","fill":"none","cx":48,"cy":82,"r":2.5,"stroke":"#d9b24a","sw":1.3},{"t":"circle","fill":"#d9b24a","cx":48,"cy":82,"r":0.9},{"t":"path","fill":"none","d":"M48 72v5","stroke":"#d9b24a","sw":1}],"kite":[{"t":"path","fill":"#2fb3a3","d":"M50 70c12 0 24-4 34-14l6 9c-9 10-22 15-36 15z","v":"vol"},{"t":"path","fill":"#5c6b3a","d":"M10 96C10 78 25 68.5 48 68.5S86 78 86 96Z","v":"vol"},{"t":"path","fill":"#8d5a3b","d":"M41.5 52h13v17h-13z","v":"vol"},{"t":"path","fill":"rgba(0,0,0,0.18)","d":"M41.5 60c4 3 9 3 13 0v-3h-13z"},{"t":"path","fill":"#a14a3a","d":"M20 82h11v9H20z","v":"vol"},{"t":"path","fill":"#c9a03a","d":"M62 86h10v8H62z","v":"vol"},{"t":"path","fill":"none","d":"M22 84h7M24 89h5","dash":"1.4 1.2","stroke":"rgba(0,0,0,0.35)","sw":0.8},{"t":"path","fill":"#2fb3a3","d":"M34 70c4-3 9-4.5 14-4.5s10 1.5 14 4.5c-4 4-9 6-14 6s-10-2-14-6z","v":"vol"},{"t":"ellipse","fill":"#8d5a3b","cx":34.5,"cy":44,"rx":3,"ry":4.6,"v":"vol"},{"t":"ellipse","fill":"#8d5a3b","cx":61.5,"cy":44,"rx":3,"ry":4.6,"v":"vol"},{"t":"path","fill":"#8d5a3b","d":"M34 40C34 28 40 23.5 48 23.5S62 28 62 40C62 52.5 56 60.5 48 60.5S34 52.5 34 40Z","v":"sph"},{"t":"ellipse","fill":"#1d1a20","cx":42,"cy":42.5,"rx":2.3,"ry":2.8},{"t":"circle","fill":"#ffffff","cx":42.9,"cy":41.5,"r":0.85},{"t":"circle","fill":"#ffffff","cx":41.4,"cy":43.6,"r":0.35},{"t":"ellipse","fill":"#1d1a20","cx":54,"cy":42.5,"rx":2.3,"ry":2.8},{"t":"circle","fill":"#ffffff","cx":54.9,"cy":41.5,"r":0.85},{"t":"circle","fill":"#ffffff","cx":53.4,"cy":43.6,"r":0.35},{"t":"path","fill":"none","d":"M38.5 36.6q3.5-2.6 7-0.6M50.5 36q3.5-2 7 0.6","linecap":"round","stroke":"#2a1a12","sw":1.8},{"t":"path","fill":"none","d":"M48.6 44.2q-2 4.2 0.4 5.6","stroke":"rgba(70,30,20,0.32)","sw":1.2},{"t":"path","fill":"#5a1f22","d":"M43.2 51.6q4.8 6 9.6 0z"},{"t":"path","fill":"#ffffff","d":"M44 51.9q4 1.5 8 0l-.4 1.1q-3.6 1.2-7.2 0z"},{"t":"path","fill":"none","d":"M45.6 55.2q2.4 1.1 4.8 0","linecap":"round","stroke":"#c0605a","sw":1.1},{"t":"path","fill":"#e9cfa8","d":"M44.6 46.4l6.2-1.4.6 2.4-6.2 1.4z"},{"t":"path","fill":"none","d":"M47.2 45.9l.5 2.3M48.9 45.5l.5 2.3","stroke":"rgba(0,0,0,0.18)","sw":0.5},{"t":"path","fill":"#6b4a2e","d":"M32 44C32 27 39 20 48 20S64 27 64 44v10h-6V38H38v16h-6z","v":"vol"},{"t":"circle","fill":"#3a2a1c","cx":41,"cy":30,"r":5},{"t":"circle","fill":"#3a2a1c","cx":55,"cy":30,"r":5},{"t":"circle","fill":"#9fd8f0","cx":41,"cy":30,"r":3.6,"v":"sph"},{"t":"circle","fill":"#9fd8f0","cx":55,"cy":30,"r":3.6,"v":"sph"},{"t":"path","fill":"none","d":"M46 30h4","stroke":"#3a2a1c","sw":2},{"t":"path","fill":"#e8e1d2","d":"M64 34l12-6-3 9z","v":"vol"},{"t":"path","fill":"none","d":"M66 34.5l8-3.6","stroke":"rgba(0,0,0,0.2)","sw":0.8}],"august":[{"t":"path","fill":"#f2efe6","d":"M10 96C10 78 25 68.5 48 68.5S86 78 86 96Z","v":"vol"},{"t":"path","fill":"#f0cfb0","d":"M41.5 52h13v17h-13z","v":"vol"},{"t":"path","fill":"rgba(0,0,0,0.18)","d":"M41.5 60c4 3 9 3 13 0v-3h-13z"},{"t":"path","fill":"#dcd6c8","d":"M30 72l14-4 4 16 4-16 14 4-4 24H34z","v":"vol"},{"t":"path","fill":"#cfe0e8","d":"M42 66l6 14 6-14z"},{"t":"path","fill":"#c4602a","d":"M46.4 69h3.2l1.4 15-3 3-3-3z","v":"vol"},{"t":"circle","fill":"#e0b44a","cx":64,"cy":78,"r":3,"v":"sph"},{"t":"path","fill":"#c4602a","d":"M28 80l6-3 2 4-6 2z"},{"t":"ellipse","fill":"#f0cfb0","cx":34.5,"cy":44,"rx":3,"ry":4.6,"v":"vol"},{"t":"ellipse","fill":"#f0cfb0","cx":61.5,"cy":44,"rx":3,"ry":4.6,"v":"vol"},{"t":"path","fill":"#f0cfb0","d":"M34 40C34 28 40 23.5 48 23.5S62 28 62 40C62 52.5 56 60.5 48 60.5S34 52.5 34 40Z","v":"sph"},{"t":"path","fill":"#dedcd4","d":"M33.8 39C33.4 27 40 21.5 48.5 21.5c9 0 14 5.5 13.8 14.5-4-4.5-11-6.5-18-5-5 1-8 4-10.5 8z","v":"vol"},{"t":"path","fill":"none","d":"M40 25c4 1 8 3 10 7","stroke":"rgba(0,0,0,0.12)","sw":1},{"t":"path","fill":"none","d":"M38.5 37.8q3.5-1.4 7 0M50.5 35.6q3.5-2.4 7 0.2","linecap":"round","stroke":"#bdbab0","sw":1.8},{"t":"path","fill":"#14141a","d":"M37 40.5h9.5v4.5a3 3 0 0 1-3 3h-3.5a3 3 0 0 1-3-3z","v":"vol"},{"t":"path","fill":"#14141a","d":"M49.5 40.5H59v4.5a3 3 0 0 1-3 3h-3.5a3 3 0 0 1-3-3z","v":"vol"},{"t":"path","fill":"none","d":"M46.5 41.5h3","stroke":"#14141a","sw":1.4},{"t":"path","fill":"none","d":"M38.5 42l3-1M51 42l3-1","stroke":"rgba(255,220,160,0.7)","sw":1},{"t":"path","fill":"none","d":"M48.6 44.2q-2 4.2 0.4 5.6","stroke":"rgba(70,30,20,0.32)","sw":1.2},{"t":"path","fill":"none","d":"M44.5 53.6q4 0.8 7.4-1.6","linecap":"round","stroke":"#6b2d2a","sw":1.5}],"edna":[{"t":"circle","fill":"#b9b6ae","cx":48,"cy":58,"r":9,"v":"sph"},{"t":"path","fill":"#4f6f8a","d":"M10 96C10 78 25 68.5 48 68.5S86 78 86 96Z","v":"vol"},{"t":"path","fill":"#ecc6a4","d":"M41.5 52h13v17h-13z","v":"vol"},{"t":"path","fill":"rgba(0,0,0,0.18)","d":"M41.5 60c4 3 9 3 13 0v-3h-13z"},{"t":"path","fill":"#3e5a73","d":"M40 68h16l-2 6H42z","v":"vol"},{"t":"path","fill":"#d9a441","d":"M12 80l14-8 4 6-14 8z","v":"vol"},{"t":"path","fill":"#d9a441","d":"M84 80l-14-8-4 6 14 8z","v":"vol"},{"t":"path","fill":"none","d":"M14 84v4M17 82.5v4M20 81v4M76 81v4M79 82.5v4M82 84v4","stroke":"#d9a441","sw":1},{"t":"path","fill":"#c0392b","d":"M56 78h4v3h-4zM60.5 78h4v3h-4zM56 81.5h4v3h-4z"},{"t":"path","fill":"#2d6a82","d":"M60.5 81.5h4v3h-4z"},{"t":"ellipse","fill":"#ecc6a4","cx":34.5,"cy":44,"rx":3,"ry":4.6,"v":"vol"},{"t":"ellipse","fill":"#ecc6a4","cx":61.5,"cy":44,"rx":3,"ry":4.6,"v":"vol"},{"t":"path","fill":"#ecc6a4","d":"M34 40C34 28 40 23.5 48 23.5S62 28 62 40C62 52.5 56 60.5 48 60.5S34 52.5 34 40Z","v":"sph"},{"t":"ellipse","fill":"#1d1a20","cx":42,"cy":42.5,"rx":1.9,"ry":2.3},{"t":"circle","fill":"#ffffff","cx":42.7,"cy":41.7,"r":0.65},{"t":"ellipse","fill":"#1d1a20","cx":54,"cy":42.5,"rx":1.9,"ry":2.3},{"t":"circle","fill":"#ffffff","cx":54.7,"cy":41.7,"r":0.65},{"t":"path","fill":"none","d":"M38.5 37.8q3.5-1.4 7 0M50.5 35.6q3.5-2.4 7 0.2","linecap":"round","stroke":"#8a8680","sw":1.8},{"t":"path","fill":"none","d":"M48.6 44.2q-2 4.2 0.4 5.6","stroke":"rgba(70,30,20,0.32)","sw":1.2},{"t":"path","fill":"none","d":"M44.6 53.4h6.8","linecap":"round","stroke":"#6b2d2a","sw":1.5},{"t":"path","fill":"none","d":"M44 50.8q4-1 8 0","stroke":"rgba(80,40,30,0.25)","sw":0.8},{"t":"path","fill":"#4f6f8a","d":"M28 31C28 21 37 16 48 16S68 21 68 31z","v":"vol"},{"t":"path","fill":"#2a2a30","d":"M30 29h36v5H30z","v":"vol"},{"t":"path","fill":"#1a1a1e","d":"M31 34h34l-4 5.5H35z","v":"vol"},{"t":"circle","fill":"#d9a441","cx":48,"cy":24,"r":4,"v":"sph"},{"t":"path","fill":"none","d":"M45.6 21.6h4.8v4.8h-4.8z","stroke":"#7a5a10","sw":0.8},{"t":"circle","fill":"#9cc3d5","cx":48,"cy":24,"r":1.4}],"locket":[{"t":"circle","fill":"#d9d4c7","cx":48,"cy":46,"r":27,"v":"sph"},{"t":"circle","fill":"#b9b3a4","cx":34,"cy":32,"r":5,"stroke":"rgba(255,255,255,0.4)","sw":0.8},{"t":"circle","fill":"#b9b3a4","cx":62,"cy":58,"r":4,"stroke":"rgba(255,255,255,0.4)","sw":0.8},{"t":"circle","fill":"#b9b3a4","cx":66,"cy":34,"r":2.5},{"t":"circle","fill":"#b9b3a4","cx":30,"cy":58,"r":2},{"t":"circle","fill":"#2a2730","cx":48,"cy":44,"r":5.2},{"t":"path","fill":"#2a2730","d":"M45 47.5h6l2.2 12h-10.4z"},{"t":"ellipse","fill":"#1d1a20","cx":39,"cy":40,"rx":2,"ry":2.6},{"t":"circle","fill":"#fff","cx":39.8,"cy":39.1,"r":0.7},{"t":"path","fill":"none","d":"M54.5 40.5q2.5-2 5 0","linecap":"round","stroke":"#1d1a20","sw":1.5},{"t":"ellipse","fill":"rgba(230,120,120,0.35)","cx":35,"cy":48,"rx":3,"ry":1.6},{"t":"ellipse","fill":"rgba(230,120,120,0.35)","cx":62,"cy":48,"rx":3,"ry":1.6},{"t":"path","fill":"none","d":"M10 62c4 10 72 10 76 0","linecap":"round","stroke":"#d9a441","sw":3}]};

  var avN = 0;
  function Avatar(p) {
    var key = p.who, parts = CAST[key], sp = SPEAKERS[key] || {}, fk = FACTIONS[sp.faction] ? sp.faction : "agency", size = p.size || 48;
    var ref = React.useRef(null); if (!ref.current) ref.current = "pav" + (++avN);
    if (!parts) return null;
    var id = ref.current, L = LIGHT, hz = L.dir === "h";
    var stops = hz ? [[0, L.hi], [0.42, "rgba(0,0,0,0)"], [0.68, "rgba(0,0,0,0)"], [1, L.lo]] : [[0, L.lo], [0.38, "rgba(0,0,0,0)"], [0.7, "rgba(0,0,0,0)"], [1, L.hi]];
    function st(arr) { return arr.map(function (s, i) { return h("stop", { key: i, offset: s[0], stopColor: s[1] }); }); }
    function el(q, i, over) {
      var a = { key: i + (over ? "o" : "") };
      if (q.t === "path") a.d = q.d; else if (q.t === "circle") { a.cx = q.cx; a.cy = q.cy; a.r = q.r; } else { a.cx = q.cx; a.cy = q.cy; a.rx = q.rx; a.ry = q.ry; }
      if (over) { a.fill = "url(#" + id + (q.v === "sph" ? "s" : "v") + ")"; return h(q.t, a); }
      a.fill = q.fill; if (q.stroke) { a.stroke = q.stroke; a.strokeWidth = q.sw; } if (q.linecap) a.strokeLinecap = q.linecap; if (q.dash) a.strokeDasharray = q.dash;
      return h(q.t, a);
    }
    var kids = []; parts.forEach(function (q, i) { kids.push(el(q, i)); });
    return h("span", { className: cx("pl-av", "pl-f-" + fk, p.className), style: { width: size, height: size }, role: "img", "aria-label": sp.name || key },
      h("svg", { viewBox: "0 0 96 96", "aria-hidden": "true" },
        h("defs", null,
          h("linearGradient", { id: id + "v", x1: 0, y1: 0, x2: hz ? 1 : 0, y2: hz ? 0 : 1 }, st(stops)),
          h("radialGradient", { id: id + "s", cx: L.sx, cy: L.sy, r: 0.78 }, st([[0, L.hi], [0.5, "rgba(0,0,0,0)"], [1, L.lo]])),
          h("radialGradient", { id: id + "g", cx: L.gx, cy: L.gy, r: 0.9 }, st([[0, L.glow], [1, "rgba(0,0,0,0)"]]))),
        h("rect", { width: 96, height: 96, className: "pl-av-ground" }),
        kids));
  }
  /* Icon — one stroke set, drawn in this realm's line style. */
  var ICONS = {
    search: ["M15 15l5.5 5.5", "c:10.5,10.5,6"],
    folder: ["M3 6.5h6.5l2 2H21V19H3z"],
    satellite: ["M5.2 14.6C2.6 16 1.6 17.4 2.3 18.2c1.2 1.4 7-.4 12.9-4s9.8-8 8.5-9.4c-.6-.7-2.3-.5-4.6.4", "c:12,12,6"],
    key: ["M11 12h10M17 12v3M20 12v2", "c:7.5,12,3.5"],
    eye: ["M2 12c2.8-4.5 6.2-6.5 10-6.5s7.2 2 10 6.5c-2.8 4.5-6.2 6.5-10 6.5S4.8 16.5 2 12z", "c:12,12,2.5"],
    check: ["M4.5 12.5l5 5L19.5 7"],
    close: ["M6 6l12 12M18 6L6 18"],
    plus: ["M12 5v14M5 12h14"],
    upload: ["M12 15V4M7 9l5-5 5 5M4 15v5h16v-5"],
    download: ["M12 4v11M7 10l5 5 5-5M4 15v5h16v-5"],
    alert: ["M12 3.5L21.5 20h-19z", "M12 10v4.5M12 17.2v.3"],
    sync: ["M19.5 9.5A8 8 0 0 0 5 7.2M4.5 3.5v4h4", "M4.5 14.5A8 8 0 0 0 19 16.8M19.5 20.5v-4h-4"],
    lock: ["M5 11h14v9H5z", "M8 11V8a4 4 0 0 1 8 0v3"],
    sliders: ["M4 7h10M18 7h2M4 17h4M12 17h8", "c:16,7,2", "c:10,17,2"]
  };
  function Icon(p) {
    var spec = ICONS[p.name]; if (!spec) return null; var s = p.size || 20;
    return h("svg", { className: cx("pl-icon", p.className), width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: ICON_STYLE.w, strokeLinecap: ICON_STYLE.cap, strokeLinejoin: ICON_STYLE.join,
      role: p.title ? "img" : undefined, "aria-label": p.title, "aria-hidden": p.title ? undefined : "true" },
      spec.map(function (d, i) { if (d.indexOf("c:") === 0) { var a = d.slice(2).split(","); return h("circle", { key: i, cx: a[0], cy: a[1], r: a[2] }); } return h("path", { key: i, d: d }); }));
  }
  /* Notice — a system message signed by the character whose job it is; preset speakers show their avatar. */
  function Notice(p) {
    var key = typeof p.speaker === "string" ? p.speaker : null;
    var sp = key ? SPEAKERS[key] : p.speaker; sp = sp || SPEAKERS.zhaowu;
    var fk = FACTIONS[sp.faction] ? sp.faction : "agency", org = sp.org || FACTIONS[fk].zh;
    return h("section", { className: cx("pl-notice", "pl-f-" + fk, p.className), role: p.urgent ? "alert" : "status" },
      h("div", { className: "pl-notice-head" },
        key && CAST[key] ? h(Avatar, { who: key, size: 32 }) : h(Emblem, { faction: fk }),
        h("span", { className: "pl-notice-who" }, sp.name),
        h("span", { className: "pl-notice-org" }, h(Emblem, { faction: fk }), org)),
      h("p", { className: "pl-notice-body" }, p.children),
      p.actions ? h("div", { className: "pl-notice-actions" }, p.actions) : null);
  }




  /* Switch — a tap key, not a slider (after the tap-switch reference): on sinks, lights its LED and rolls its word; off springs back. */
  var hapticLabel = null;
  function haptic(on) {
    try { if (typeof navigator.vibrate === "function") { navigator.vibrate(on ? [14] : [8]); return; } } catch (e) {}
    try {
      if (!hapticLabel) {
        var id = "pl-haptic-" + Math.random().toString(36).slice(2), input = document.createElement("input"), label = document.createElement("label");
        var hide = "position:fixed;left:-9999px;top:0;width:1px;height:1px;opacity:0;pointer-events:none";
        input.type = "checkbox"; input.setAttribute("switch", ""); input.id = id; input.tabIndex = -1; input.style.cssText = hide; input.setAttribute("aria-hidden", "true");
        label.htmlFor = id; label.style.cssText = hide; label.setAttribute("aria-hidden", "true");
        document.body.append(input, label); hapticLabel = label;
      }
      hapticLabel.click();
    } catch (e) {}
  }
  function Switch(p) {
    var base = useId("pl-sw"), st = React.useState(!!p.defaultChecked), ctl = p.checked != null, on = ctl ? !!p.checked : st[0];
    var keyRef = React.useRef(null), ledRef = React.useRef(null);
    function toggle() {
      if (p.disabled) return;
      var next = !on; haptic(next);
      if (!ctl) st[1](next);
      var k = keyRef.current, l = ledRef.current;
      if (k && l) { k.classList.remove("pl-sw-ring", "pl-sw-thunk"); l.classList.remove("pl-sw-pop"); void k.offsetWidth; if (next) { k.classList.add("pl-sw-ring"); l.classList.add("pl-sw-pop"); } else k.classList.add("pl-sw-thunk"); }
      if (p.onChange) p.onChange(next);
    }
    return h("div", { className: cx("pl-switch", on && "pl-switch-checked", p.disabled && "pl-is-disabled", p.className) },
      h("button", { ref: keyRef, type: "button", role: "switch", "aria-checked": on ? "true" : "false", "aria-labelledby": base + "-l", "aria-describedby": p.hint ? base + "-h" : undefined, disabled: p.disabled, className: "pl-switch-key", onClick: toggle },
        h("span", { className: "pl-switch-face" },
          h("span", { ref: ledRef, className: "pl-switch-led", "aria-hidden": "true" }),
          h("span", { className: "pl-switch-txt", "aria-hidden": "true" },
            h("span", { className: "pl-switch-t pl-switch-on" }, p.onLabel || "开"),
            h("span", { className: "pl-switch-t pl-switch-off" }, p.offLabel || "关")))),
      h("span", { className: "pl-switch-text", onClick: toggle },
        h("span", { id: base + "-l", className: "pl-switch-label" }, p.label),
        p.hint ? h("span", { id: base + "-h", className: "pl-switch-hint" }, p.hint) : null),
      p.name && on ? h("input", { type: "hidden", name: p.name, value: p.value || "on" }) : null);
  }
  /* Checkbox — one of several independent choices. */
  function Checkbox(p) {
    var id = useId("pl-cb"), rest = omit(p, ["label", "className"]);
    return h("label", { className: cx("pl-check", p.disabled && "pl-is-disabled", p.className), htmlFor: id },
      h("input", Object.assign({ type: "checkbox" }, rest, { id: id, className: "pl-check-input" })),
      h("span", { className: "pl-check-box", "aria-hidden": "true" }, h("svg", { viewBox: "0 0 16 16" }, h("path", { d: "M3.5 8.5l3 3 6-7" }))),
      h("span", { className: "pl-check-label" }, p.label));
  }
  /* Progress — a determinate bar. tone: default | good | bad */
  function Progress(p) {
    var v = Math.max(0, Math.min(100, Number(p.value) || 0));
    return h("div", { className: cx("pl-progress", p.tone && p.tone !== "default" && "pl-progress-" + p.tone, p.className) },
      (p.label || p.showValue !== false) ? h("div", { className: "pl-progress-head" }, h("span", { className: "pl-progress-label" }, p.label), p.showValue === false ? null : h("span", { className: "pl-progress-value" }, p.valueText || (Math.round(v) + "%"))) : null,
      h("div", { className: "pl-progress-track", role: "progressbar", "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": Math.round(v), "aria-label": typeof p.label === "string" ? p.label : undefined },
        h("div", { className: "pl-progress-fill", style: { width: v + "%" } })));
  }
  /* DataTable — rows of records. columns: [{key, label, align, mono}] */
  function DataTable(p) {
    var cols = p.columns || [], rows = p.rows || [];
    return h("div", { className: cx("pl-table-wrap", p.className), "data-count": rows.length },
      h("table", { className: "pl-table" },
        p.caption ? h("caption", null, p.caption) : null,
        h("thead", null, h("tr", null, cols.map(function (c) { return h("th", { key: c.key, scope: "col", style: c.align ? { textAlign: c.align } : null }, c.label); }))),
        h("tbody", null, rows.map(function (r, i) {
          return h("tr", { key: r.id || i }, cols.map(function (c) { return h("td", { key: c.key, className: c.mono ? "pl-td-mono" : null, style: c.align ? { textAlign: c.align } : null }, r[c.key]); }));
        }))));
  }
  /* Dialog — a modal panel. inline renders it in place (for docs and previews). */
  function Dialog(p) {
    var tid = useId("pl-dlg"), ref = React.useRef(null);
    React.useEffect(function () {
      if (!p.open || p.inline) return;
      var el = ref.current, prev = document.activeElement;
      var f = el && el.querySelector("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"); if (f) f.focus();
      function key(e) { if (e.key === "Escape" && p.onClose) p.onClose(); }
      document.addEventListener("keydown", key);
      return function () { document.removeEventListener("keydown", key); if (prev && prev.focus) prev.focus(); };
    }, [p.open, p.inline]);
    if (!p.open) return null;
    var panel = h("div", { ref: ref, className: cx("pl-dialog", p.tone === "danger" && "pl-dialog-danger", p.className), role: p.tone === "danger" ? "alertdialog" : "dialog", "aria-modal": p.inline ? undefined : "true", "aria-labelledby": tid },
      h("div", { className: "pl-dialog-stripe", "aria-hidden": "true" }),
      h("div", { className: "pl-dialog-inner" },
        h("h2", { id: tid, className: "pl-dialog-title" }, p.title),
        p.children ? h("div", { className: "pl-dialog-body" }, p.children) : null,
        p.actions ? h("div", { className: "pl-dialog-actions" }, p.actions) : null));
    if (p.inline) return h("div", { className: "pl-dialog-stage" }, panel);
    return h("div", { className: "pl-dialog-scrim", onMouseDown: function (e) { if (e.target === e.currentTarget && p.onClose) p.onClose(); } }, panel);
  }
  /* EmptyState — nothing here yet, said by the character whose job it is. */
  function EmptyState(p) {
    var who = p.who || "zhaowu", sp = SPEAKERS[who] || {};
    return h("section", { className: cx("pl-empty", p.className) },
      CAST[who] ? h(Avatar, { who: who, size: p.size || 96 }) : null,
      h("h3", { className: "pl-empty-title" }, p.title),
      p.children ? h("p", { className: "pl-empty-body" }, p.children) : null,
      sp.name ? h("p", { className: "pl-empty-sign" }, "—— " + sp.name) : null,
      p.action ? h("div", { className: "pl-empty-action" }, p.action) : null);
  }


  /* Select — a native dropdown in this realm's field style. options: [{value, label}] */
  function Select(p) {
    var id = useId("pl-sel"), hintId = id + "-hint", msg = p.error || p.hint, rest = omit(p, ["label", "hint", "error", "options", "className"]);
    return h("div", { className: cx("pl-field", "pl-select", p.error && "pl-field-invalid", p.className) },
      h("label", { className: "pl-field-label", htmlFor: id }, p.label),
      h("span", { className: "pl-field-frame pl-select-frame" },
        h("select", Object.assign({}, rest, { id: id, className: "pl-field-input pl-select-input", "aria-invalid": p.error ? "true" : undefined, "aria-describedby": msg ? hintId : undefined }),
          (p.options || []).map(function (o) { return h("option", { key: o.value, value: o.value, disabled: o.disabled }, o.label); })),
        h("svg", { className: "pl-select-chevron", viewBox: "0 0 16 16", "aria-hidden": "true" }, h("path", { d: "M4 6l4 4 4-4" }))),
      msg ? h("span", { id: hintId, className: "pl-field-hint" }, p.error ? "✕ " + p.error : p.hint) : null);
  }
  /* Sidebar — section navigation. sections: [{label, items: [{label, href, icon, current, count}]}] */
  function Sidebar(p) {
    return h("nav", { className: cx("pl-sidebar", p.className), "aria-label": p.ariaLabel || "侧边导航" },
      p.title ? h("div", { className: "pl-sidebar-title" }, p.title) : null,
      (p.sections || []).map(function (s, i) {
        return h("div", { key: i, className: "pl-sidebar-section" },
          s.label ? h("div", { className: "pl-sidebar-label" }, s.label) : null,
          h("ul", { className: "pl-sidebar-list" }, s.items.map(function (it, j) {
            return h("li", { key: j }, h("a", { className: "pl-sidebar-item", href: it.href || "#", "aria-current": it.current ? "page" : undefined },
              it.icon ? h(Icon, { name: it.icon, size: 18 }) : null,
              h("span", { className: "pl-sidebar-text" }, it.label),
              it.count != null ? h("span", { className: "pl-sidebar-count" }, it.count) : null));
          })));
      }),
      p.footer ? h("div", { className: "pl-sidebar-foot" }, p.footer) : null);
  }
  /* Pagination — page through a long list. */
  function Pagination(p) {
    var st = React.useState(p.defaultPage || 1), cur = p.page != null ? p.page : st[0], total = Math.max(1, p.total || 1);
    function go(n) { n = Math.max(1, Math.min(total, n)); if (p.page == null) st[1](n); if (p.onChange) p.onChange(n); }
    var pages = [], lo = Math.max(2, cur - 1), hi = Math.min(total - 1, cur + 1);
    pages.push(1); if (lo > 2) pages.push("…a"); for (var i = lo; i <= hi; i++) pages.push(i); if (hi < total - 1) pages.push("…b"); if (total > 1) pages.push(total);
    return h("nav", { className: cx("pl-pager", p.className), "aria-label": p.ariaLabel || "分页" },
      h("button", { type: "button", className: "pl-pager-btn pl-pager-step", disabled: cur <= 1, onClick: function () { go(cur - 1); }, "aria-label": "上一页" }, "‹"),
      pages.map(function (n) {
        if (typeof n === "string") return h("span", { key: n, className: "pl-pager-gap", "aria-hidden": "true" }, "…");
        return h("button", { key: n, type: "button", className: "pl-pager-btn", "aria-current": n === cur ? "page" : undefined, onClick: function () { go(n); } }, String(n));
      }),
      h("button", { type: "button", className: "pl-pager-btn pl-pager-step", disabled: cur >= total, onClick: function () { go(cur + 1); }, "aria-label": "下一页" }, "›"));
  }
  /* Tooltip — a short label shown on hover and keyboard focus. */
  function Tooltip(p) {
    var id = useId("pl-tip"), child = React.Children.only(p.children);
    return h("span", { className: cx("pl-tip", p.open && "pl-tip-open", p.side === "bottom" && "pl-tip-bottom", p.className) },
      React.cloneElement(child, { "aria-describedby": id }),
      h("span", { id: id, role: "tooltip", className: "pl-tip-bubble" }, p.label));
  }
  /* TagInput — add short tags; Enter or comma adds, Backspace on empty removes the last. */
  function TagInput(p) {
    var id = useId("pl-tags"), st = React.useState(p.defaultTags || []), tags = p.tags || st[0], tx = React.useState(""), text = tx[0];
    function set(next) { if (!p.tags) st[1](next); if (p.onChange) p.onChange(next); }
    function add() { var v = text.trim().replace(/,$/, ""); if (v && tags.indexOf(v) < 0) set(tags.concat([v])); tx[1](""); }
    return h("div", { className: cx("pl-field", "pl-tags", p.className) },
      h("label", { className: "pl-field-label", htmlFor: id }, p.label),
      h("div", { className: "pl-field-frame pl-tags-frame" },
        tags.map(function (t) {
          return h("span", { key: t, className: "pl-tag" }, h("span", null, t),
            h("button", { type: "button", className: "pl-tag-x", "aria-label": "移除 " + t, onClick: function () { set(tags.filter(function (x) { return x !== t; })); } }, "×"));
        }),
        h("input", { id: id, className: "pl-tags-input", value: text, placeholder: tags.length ? "" : p.placeholder,
          onChange: function (e) { tx[1](e.target.value); },
          onKeyDown: function (e) { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); add(); } else if (e.key === "Backspace" && !text && tags.length) set(tags.slice(0, -1)); },
          onBlur: add })),
      p.hint ? h("span", { className: "pl-field-hint" }, p.hint) : null);
  }


  /* Menu — a trigger with a pop-up list of actions. items: [{label, icon, shortcut, danger, disabled, onSelect} | {separator: true}] */
  function Menu(p) {
    var st = React.useState(!!p.defaultOpen), open = p.open != null ? p.open : st[0];
    var base = useId("pl-menu"), wrap = React.useRef(null), trig = React.useRef(null), list = React.useRef(null);
    function setOpen(v) { if (p.open == null) st[1](v); if (p.onOpenChange) p.onOpenChange(v); }
    function items() { return list.current ? Array.prototype.slice.call(list.current.querySelectorAll('[role="menuitem"]:not([aria-disabled="true"])')) : []; }
    function focusAt(i) { var a = items(); if (a.length) a[(i + a.length) % a.length].focus(); }
    React.useEffect(function () {
      if (!open || p.open != null) return;
      focusAt(0);
      function out(e) { if (wrap.current && !wrap.current.contains(e.target)) setOpen(false); }
      document.addEventListener("mousedown", out);
      return function () { document.removeEventListener("mousedown", out); };
    }, [open]);
    function close(refocus) { setOpen(false); if (refocus && trig.current) trig.current.focus(); }
    function onKey(e) {
      var a = items(), i = a.indexOf(document.activeElement);
      if (e.key === "ArrowDown") { e.preventDefault(); focusAt(i + 1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); focusAt(i - 1); }
      else if (e.key === "Home") { e.preventDefault(); focusAt(0); }
      else if (e.key === "End") { e.preventDefault(); focusAt(a.length - 1); }
      else if (e.key === "Escape" || e.key === "Tab") { close(e.key === "Escape"); }
    }
    function choose(it) { if (it.disabled) return; if (it.onSelect) it.onSelect(); close(true); }
    return h("div", { ref: wrap, className: cx("pl-menu", p.align === "end" && "pl-menu-end", p.className) },
      h("button", { ref: trig, type: "button", className: cx("pl-btn", "pl-btn-" + (p.variant || "secondary"), p.size && p.size !== "md" && "pl-btn-" + p.size, "pl-menu-trigger"),
        id: base + "-t", "aria-haspopup": "menu", "aria-expanded": open ? "true" : "false", "aria-controls": base + "-m",
        onClick: function () { setOpen(!open); }, onKeyDown: function (e) { if (e.key === "ArrowDown" && !open) { e.preventDefault(); setOpen(true); } } },
        p.icon || null, p.label, h("svg", { className: "pl-menu-caret", viewBox: "0 0 16 16", "aria-hidden": "true" }, h("path", { d: "M4 6l4 4 4-4" }))),
      open ? h("ul", { ref: list, id: base + "-m", role: "menu", "aria-labelledby": base + "-t", className: "pl-menu-pop", onKeyDown: onKey },
        (p.items || []).map(function (it, i) {
          if (it.separator) return h("li", { key: "s" + i, role: "separator", className: "pl-menu-sep" });
          return h("li", { key: i, role: "menuitem", tabIndex: -1, "aria-disabled": it.disabled ? "true" : undefined, className: cx("pl-menu-item", it.danger && "pl-menu-danger"),
            onClick: function () { choose(it); }, onKeyDown: function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(it); } } },
            it.icon ? h(Icon, { name: it.icon, size: 18 }) : h("span", { className: "pl-menu-noicon", "aria-hidden": "true" }),
            h("span", { className: "pl-menu-label" }, it.label),
            it.shortcut ? h("kbd", { className: "pl-menu-kbd" }, it.shortcut) : null);
        })) : null);
  }
  /* List — rows of things. items: [{id, title, subtitle, avatar, icon, leading, meta, trailing, href, onClick, current}] */
  function List(p) {
    var anyNav = (p.items || []).some(function (it) { return it.href || it.onClick; });
    return h("ul", { className: cx("pl-list", p.className), "aria-label": p.ariaLabel, "data-count": (p.items || []).length },
      (p.items || []).map(function (it, i) {
        var lead = it.leading || (it.avatar ? h(Avatar, { who: it.avatar, size: 40 }) : it.icon ? h("span", { className: "pl-list-icon" }, h(Icon, { name: it.icon, size: 20 })) : null);
        var nav = it.href || it.onClick;
        var inner = [
          lead ? h("span", { key: "l", className: "pl-list-lead" }, lead) : null,
          h("span", { key: "m", className: "pl-list-main" }, h("span", { className: "pl-list-title" }, it.title), it.subtitle ? h("span", { className: "pl-list-sub" }, it.subtitle) : null),
          it.meta ? h("span", { key: "x", className: "pl-list-meta" }, it.meta) : null,
          it.trailing ? h("span", { key: "t", className: "pl-list-trail" }, it.trailing) : null,
          nav ? h("svg", { key: "c", className: "pl-list-chev", viewBox: "0 0 16 16", "aria-hidden": "true" }, h("path", { d: "M6 4l4 4-4 4" })) : null];
        var row = it.href ? h("a", { className: "pl-list-row", href: it.href, "aria-current": it.current ? "true" : undefined }, inner)
          : it.onClick ? h("button", { type: "button", className: "pl-list-row", onClick: it.onClick, "aria-current": it.current ? "true" : undefined }, inner)
          : h("div", { className: cx("pl-list-row", anyNav && "pl-list-static") }, inner);
        return h("li", { key: it.id || i, className: "pl-list-li" }, row);
      }));
  }


  /* NeonSign — a tube sign on a screwed backboard. tone: neon (turquoise) | sign (pink) | signal (argon) | brass (warm bulb); horizontal */
  function NeonSign(p) {
    return h("div", { className: cx("pl-neon", p.tone && p.tone !== "neon" && "pl-neon-" + p.tone, p.horizontal && "pl-neon-h", p.flicker && "pl-neon-flicker", p.className), role: "img", "aria-label": (typeof p.text === "string" ? p.text : "") + (p.sub ? " " + p.sub : "") },
      h("span", { className: "pl-neon-text", "aria-hidden": "true" }, p.text),
      p.sub ? h("span", { className: "pl-neon-sub", "aria-hidden": "true" }, p.sub) : null);
  }
  /* Stall — a taped price tag from the market under the tram viaduct. */
  function Stall(p) {
    return h("article", { className: cx("pl-stall", p.className), style: p.tilt != null ? { "--tilt": p.tilt + "deg" } : null },
      h("span", { className: "pl-stall-hole", "aria-hidden": "true" }),
      h("h3", { className: "pl-stall-item" }, p.item),
      h("div", { className: "pl-stall-price" },
        h("span", { className: "pl-stall-now" }, p.price),
        p.was ? h("span", { className: "pl-stall-was" }, h("span", { className: "pl-sr" }, "原价 "), p.was) : null),
      p.note ? h("p", { className: "pl-stall-note" }, p.note) : null,
      p.stamp ? h("span", { className: "pl-stall-stamp" }, p.stamp) : null);
  }


  /* Marquee — a bulb-lit theatre / saloon marquee. */
  function Marquee(p) {
    return h("section", { className: cx("pl-marquee", p.className) },
      h("span", { className: "pl-marquee-bulbs", "aria-hidden": "true" }),
      p.kicker ? h("p", { className: "pl-marquee-kicker" }, p.kicker) : null,
      h("h2", { className: "pl-marquee-title" }, p.title),
      p.sub ? h("p", { className: "pl-marquee-sub" }, p.sub) : null);
  }
  /* RouteBadge — a Ringline tram bullet, 1980s-subway style. line: "1"–"7" */
  function RouteBadge(p) {
    var n = String(p.line || "1"), cls = "pl-route-r" + ((parseInt(n, 10) - 1) % 7 + 1 || 1);
    return h("span", { className: cx("pl-route", cls, p.size === "sm" && "pl-route-sm", p.className) },
      h("span", { className: "pl-route-dot", role: p.label ? undefined : "img", "aria-label": p.label ? undefined : "环线 " + n + " 号" }, n),
      p.label ? h("span", { className: "pl-route-label" }, p.label, p.sub ? h("small", null, p.sub) : null) : null);
  }


  var AS_KIND = { kind: "locket", name: "小锁 Locket",
    backdrop: function () { return h("circle", { className: "pl-as-glow", r: 46 }); },
    core: function () { return [
      h("circle", { key: "o", className: "pl-as-orb", r: 32 }),
      h("circle", { key: "c1", className: "pl-as-crater", cx: -16, cy: -15, r: 5 }), h("circle", { key: "c2", className: "pl-as-crater", cx: 18, cy: 16, r: 3.6 }), h("circle", { key: "c3", className: "pl-as-crater", cx: 20, cy: -12, r: 2.2 }),
      h("g", { key: "kh", className: "pl-as-key" }, h("circle", { cy: 6, r: 5 }), h("path", { d: "M-2.8 9h5.6l2 11h-9.6z" })),
      h("g", { key: "eo", className: "pl-as-eyes-open" }, h("ellipse", { cx: -11, cy: -4, rx: 3, ry: 3.8 }), h("ellipse", { cx: 11, cy: -4, rx: 3, ry: 3.8 })),
      h("g", { key: "el", className: "pl-as-eyes-look" }, h("ellipse", { cx: -8, cy: -9, rx: 2.8, ry: 3.4 }), h("ellipse", { cx: 14, cy: -9, rx: 2.8, ry: 3.4 })),
      h("g", { key: "eh", className: "pl-as-eyes-happy" }, h("ellipse", { cx: -11, cy: -4, rx: 3, ry: 3.8 }), h("path", { d: "M7 -3q4 -4 8 0" })),
      h("path", { key: "ec", className: "pl-as-eyes-closed", d: "M-15 -3q4 3 8 0M7 -3q4 3 8 0" }),
      h("path", { key: "ew", className: "pl-as-brow-worried", d: "M-16 -12l8 3M16 -12l-8 3" }),
      h("ellipse", { key: "b1", className: "pl-as-blush", cx: -19, cy: 4, rx: 4, ry: 2 }), h("ellipse", { key: "b2", className: "pl-as-blush", cx: 19, cy: 4, rx: 4, ry: 2 }),
      h("g", { key: "sp", className: "pl-as-spark" }, h("path", { d: "M36 -36l2 -6 2 6 6 2 -6 2 -2 6 -2 -6 -6 -2z" })),
      h("text", { key: "z", className: "pl-as-z", x: 24, y: -30 }, "z")]; },
    sat: function (st) { return [h("circle", { key: "g", className: "pl-as-sg", r: 13 }), h("circle", { key: "s", className: "pl-as-sb", r: 9 })]; } };

  /* Logo — the animated PLANET mark of this realm: a core ringed by satellites (one per running app).
     state: idle | listening | thinking | success | error | sleep
     satellites: [{id, name, status: ok | busy | done | error | sleep, onClick}] */
  var AS_STATES = { idle: "待命", listening: "倾听中", thinking: "思考中", success: "完成", error: "出错了", sleep: "休息中" };
  var SAT_STATES = { ok: "正常", busy: "忙碌", done: "完成", error: "故障", sleep: "休眠" };
  function satFace(st) {
    if (st === "done") return [h("path", { key: "a", className: "pl-as-sf", d: "M-4.5 0.5q1.6-2.2 3.2 0M1.3 0.5q1.6-2.2 3.2 0" })];
    if (st === "error") return [h("path", { key: "a", className: "pl-as-sf", d: "M-4.6-1.6l2.6 2.6M-2-1.6l-2.6 2.6M2-1.6l2.6 2.6M4.6-1.6l-2.6 2.6" })];
    if (st === "sleep") return [h("path", { key: "a", className: "pl-as-sf", d: "M-4.6 0h3M1.6 0h3" })];
    if (st === "busy") return [h("circle", { key: "a", className: "pl-as-se", cx: -1.6, cy: -0.6, r: 1.2 }), h("circle", { key: "b", className: "pl-as-se", cx: 3.6, cy: -0.6, r: 1.2 })];
    return [h("circle", { key: "a", className: "pl-as-se", cx: -3, cy: 0, r: 1.2 }), h("circle", { key: "b", className: "pl-as-se", cx: 3, cy: 0, r: 1.2 })];
  }
  function OrbitMark(p) {
    var state = p.state || "idle", sats = p.satellites || [], shown = sats.slice(0, 7), extra = sats.length - shown.length, n = shown.length || 1;
    var cfg = AS_KIND, R = 72, size = p.size || 200, base = useId("pl-as");
    var orbit = shown.map(function (s, i) {
      var a = Math.round(i * 360 / n - 90), st = SAT_STATES[s.status] ? s.status : "ok";
      var body = h("g", { className: cx("pl-as-sat", "pl-as-sat-" + st) },
        cfg.sat(st), satFace(st),
        h("title", null, (s.name || "应用") + "：" + SAT_STATES[st]));
      var hit = s.onClick || p.onSatelliteClick
        ? h("a", { href: "#", role: "button", "aria-label": (s.name || "应用") + "，" + SAT_STATES[st], onClick: function (e) { e.preventDefault(); (s.onClick || p.onSatelliteClick)(s); } }, body)
        : body;
      return h("g", { key: s.id || i, transform: "rotate(" + a + ")" }, h("g", { transform: "translate(" + R + " 0)" }, h("g", { transform: "rotate(" + (-a) + ")" }, h("g", { className: "pl-as-counter" }, hit))));
    });
    return h("div", { className: cx("pl-as", "pl-as-" + cfg.kind, "pl-as-st-" + state, p.compact && "pl-as-compact", p.className) },
      h("div", { className: "pl-as-stage", style: { width: size, height: size } },
        h("svg", { viewBox: "-100 -100 200 200", role: "img", "aria-labelledby": base + "-t" },
          h("title", { id: base + "-t" }, cfg.name + "，" + AS_STATES[state] + "；" + sats.length + " 个应用在运行"),
          cfg.backdrop ? cfg.backdrop() : null,
          h("circle", { className: "pl-as-orbit", r: R }),
          h("g", { className: "pl-as-spin" }, orbit),
          h("g", { className: "pl-as-core" }, cfg.core()),
          extra > 0 ? h("g", { className: "pl-as-more", transform: "translate(66 70)" }, h("circle", { r: 13 }), h("text", { textAnchor: "middle", y: 4 }, "+" + extra)) : null)),
      (!p.compact && (p.message || p.aside)) ? h("div", { className: "pl-as-bubble", role: "status", "aria-live": "polite" },
        h("div", { className: "pl-as-who" }, h("span", { className: "pl-as-name" }, p.name || cfg.name), h("span", { className: "pl-as-state" }, AS_STATES[state])),
        p.aside ? h("p", { className: "pl-as-aside" }, p.aside) : null,
        p.message ? h("p", { className: "pl-as-msg" }, p.message) : null,
        p.footnote ? h("p", { className: "pl-as-foot" }, p.footnote) : null,
        p.actions ? h("div", { className: "pl-as-actions" }, p.actions) : null) : null);
  }

  function Logo(p) { return h(OrbitMark, Object.assign({}, p, { compact: true })); }

  var AST_CHAR = { kind: "cassie", name: "卡西 Cassie", viewBox: "0 0 200 190", ratio: 0.95,
    draw: function (p) {
      var apps = (p.satellites || []).slice(0, 7), k = [];
      function reel(x) { var t = []; for (var i = 0; i < 6; i++) t.push(h("rect", { key: i, x: x - 1.6, y: 109.5, width: 3.2, height: 5, rx: 1, transform: "rotate(" + i * 60 + " " + x + " 120)" }));
        return h("g", { className: "pl-ast-reel", style: { transformOrigin: x + "px 120px" } }, h("circle", { className: "pl-ast-reel-face", cx: x, cy: 120, r: 12.5 }), h("g", { className: "pl-ast-teeth" }, t)); }
      k.push(h("g", { key: "hat", className: "pl-ast-hat" },
        h("path", { className: "pl-ast-crown", d: "M72 60C70 42 78 31 88 33C93 27 107 27 112 33C122 31 130 42 128 60Z" }),
        h("path", { className: "pl-ast-dent", d: "M91 36C95 42 105 42 109 36" }),
        h("path", { className: "pl-ast-band", d: "M71.5 53H128.5V60H71.5Z" }),
        h("path", { className: "pl-ast-brim", d: "M42 60C50 69 76 69 100 67C124 69 150 69 158 60C162 69 142 78 100 78C58 78 38 69 42 60Z" })));
      k.push(h("rect", { key: "shell", className: "pl-ast-shell", x: 24, y: 66, width: 152, height: 100, rx: 12 }));
      k.push(h("rect", { key: "bevel", className: "pl-ast-bevel", x: 30, y: 72, width: 140, height: 88, rx: 8 }));
      k.push(h("rect", { key: "label", className: "pl-ast-label", x: 38, y: 78, width: 124, height: 26, rx: 3 }));
      k.push(h("rect", { key: "stripe", className: "pl-ast-stripe", x: 38, y: 78, width: 124, height: 7, rx: 2 }));
      apps.forEach(function (a, i) { k.push(h("circle", { key: "led" + i, className: cx("pl-ast-app", "pl-ast-led", "pl-ast-app-" + (AST_APP[a.status] ? a.status : "ok")), cx: 155 - i * 8, cy: 81.5, r: 2.4 }, h("title", null, (a.name || "应用") + "：" + (AST_APP[a.status] || "正常")))); });
      [["rest", "C-90 · 昏线混音"], ["think", "A 面 · 第 3 首"], ["success", "HIT!"], ["error", "卡带了！"], ["sleep", "‖ PAUSE"]].forEach(function (l) {
        k.push(h("text", { key: "l" + l[0], className: "pl-ast-x-" + l[0] + " pl-ast-label-text", x: 100, y: 99, textAnchor: "middle" }, l[1])); });
      k.push(h("rect", { key: "win", className: "pl-ast-window", x: 52, y: 106, width: 96, height: 30, rx: 15 }));
      k.push(h("rect", { key: "tape", className: "pl-ast-tape", x: 66, y: 128, width: 68, height: 5, rx: 2 }));
      k.push(reel(74)); k.push(reel(126));
      k.push(h("g", { key: "pup", className: "pl-ast-pupils" }, h("circle", { cx: 74, cy: 120, r: 5 }), h("circle", { cx: 126, cy: 120, r: 5 }), h("circle", { className: "pl-ast-glint", cx: 72.4, cy: 118.4, r: 1.5 }), h("circle", { className: "pl-ast-glint", cx: 124.4, cy: 118.4, r: 1.5 })));
      k.push(h("path", { key: "lh", className: "pl-ast-f-happy pl-ast-lid", d: "M61 120a13 13 0 0 1 26 0ZM113 120a13 13 0 0 1 26 0Z" }));
      k.push(h("path", { key: "lc", className: "pl-ast-f-closed pl-ast-lid", d: "M61 121a13 13 0 0 1 26 0a13 5 0 0 1-26 0ZM113 121a13 13 0 0 1 26 0a13 5 0 0 1-26 0Z" }));
      k.push(h("path", { key: "lcl", className: "pl-ast-f-closed pl-ast-lash", d: "M62 121q12 7 24 0M114 121q12 7 24 0" }));
      k.push(h("path", { key: "brow", className: "pl-ast-f-worried pl-ast-brow", d: "M60 99l17 5M140 99l-17 5" }));
      k.push(h("path", { key: "head", className: "pl-ast-head", d: "M58 166L66 150H134L142 166" }));
      k.push(h("rect", { key: "ms", className: "pl-ast-m-flat pl-ast-mouth", x: 86, y: 154, width: 28, height: 6, rx: 3 }));
      k.push(h("path", { key: "msm", className: "pl-ast-m-smile pl-ast-mouth", d: "M82 153q18 14 36 0Z" }));
      k.push(h("ellipse", { key: "mo", className: "pl-ast-m-o pl-ast-mouth", cx: 100, cy: 157, rx: 6, ry: 4.4 }));
      k.push(h("path", { key: "spill", className: "pl-ast-x-error pl-ast-spill", d: "M94 158c-10 10 10 14 0 22c-8 6 6 10 2 16M106 158c10 8-6 14 6 22c6 4-2 10 4 14" }));
      [[34, 76], [166, 76], [34, 156], [166, 156]].forEach(function (s, i) { k.push(h("g", { key: "sc" + i, className: "pl-ast-screw" }, h("circle", { cx: s[0], cy: s[1], r: 3 }), h("path", { d: "M" + (s[0] - 2) + " " + s[1] + "h4" }))); });
      k.push(h("g", { key: "ban", className: "pl-ast-bandana" }, h("path", { d: "M156 150C170 150 178 158 174 168L160 162Z" }), h("path", { d: "M171 164l16 12-12 2zM168 166l6 18-9-5z" }), h("circle", { className: "pl-ast-dot", cx: 166, cy: 157, r: 1.3 }), h("circle", { className: "pl-ast-dot", cx: 170, cy: 162, r: 1.1 })));
      k.push(h("g", { key: "notes", className: "pl-ast-x-think pl-ast-notes" }, h("text", { x: 168, y: 54 }, "♪"), h("text", { x: 182, y: 70, className: "pl-ast-note2" }, "♫")));
      k.push(h("g", { key: "sp", className: "pl-ast-x-success pl-ast-spark" }, h("path", { d: "M176 48l2.4-7 2.4 7 7 2.4-7 2.4-2.4 7-2.4-7-7-2.4z" }), h("path", { d: "M18 84l1.8-5 1.8 5 5 1.8-5 1.8-1.8 5-1.8-5-5-1.8z" })));
      k.push(h("text", { key: "z", className: "pl-ast-x-sleep pl-ast-z", x: 170, y: 52 }, "Z"));
      if ((p.satellites || []).length > 7) k.push(h("text", { key: "more", className: "pl-ast-more", x: 44, y: 84 }, "+" + ((p.satellites || []).length - 7)));
      return k;
    } };

  /* Assistant — this realm's helper character. state: idle | listening | thinking | success | error | sleep
     satellites: running apps [{id, name, status: ok | busy | done | error | sleep}] — each character shows them its own way. */
  var AST_STATES = { idle: "待命", listening: "倾听中", thinking: "思考中", success: "完成", error: "出错了", sleep: "休息中" };
  var AST_APP = { ok: "正常", busy: "忙碌", done: "完成", error: "故障", sleep: "休眠" };
  function Assistant(p) {
    var state = AST_STATES[p.state] ? p.state : "idle", C = AST_CHAR, size = p.size || 220, base = useId("pl-ast"), apps = p.satellites || [];
    var appTitle = apps.map(function (a) { return (a.name || "应用") + "：" + (AST_APP[a.status] || "正常"); }).join("；");
    return h("div", { className: cx("pl-ast", "pl-ast-" + C.kind, "pl-ast-st-" + state, p.compact && "pl-ast-compact", p.className) },
      h("div", { className: "pl-ast-stage", style: { width: size, height: size * C.ratio } },
        h("svg", { viewBox: C.viewBox, role: "img", "aria-labelledby": base + "-t" },
          h("title", { id: base + "-t" }, C.name + "，" + AST_STATES[state] + (apps.length ? "；" + apps.length + " 个应用在运行：" + appTitle : "")),
          h("g", { className: "pl-ast-body" }, C.draw(p)))),
      (!p.compact && (p.message || p.aside)) ? h("div", { className: "pl-ast-bubble", role: "status", "aria-live": "polite" },
        h("div", { className: "pl-ast-who" }, h("span", { className: "pl-ast-name" }, p.name || C.name), h("span", { className: "pl-ast-state" }, AST_STATES[state])),
        p.aside ? h("p", { className: "pl-ast-aside" }, p.aside) : null,
        p.message ? h("p", { className: "pl-ast-msg" }, p.message) : null,
        p.footnote ? h("p", { className: "pl-ast-foot" }, p.footnote) : null,
        p.actions ? h("div", { className: "pl-ast-actions" }, p.actions) : null) : null);
  }
  window.Planet = Object.assign(window.Planet || {}, { Logo: Logo, Assistant: Assistant, Marquee: Marquee, RouteBadge: RouteBadge, NeonSign: NeonSign, Stall: Stall, Menu: Menu, List: List, Select: Select, Sidebar: Sidebar, Pagination: Pagination, Tooltip: Tooltip, TagInput: TagInput, Switch: Switch, Checkbox: Checkbox, Progress: Progress, DataTable: DataTable, Dialog: Dialog, EmptyState: EmptyState, Avatar: Avatar, Icon: Icon, CAST: CAST, ICONS: ICONS,
    Button: Button, TextField: TextField, Tabs: Tabs, Stamp: Stamp, CaseFile: CaseFile, Headline: Headline,
    Ticker: Ticker, OrbitGauge: OrbitGauge, Poster: Poster, TopBar: TopBar, Mark: Mark, Faction: Faction, Notice: Notice, Emblem: Emblem, FACTIONS: FACTIONS, SPEAKERS: SPEAKERS
  });
})();
