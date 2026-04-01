import { computed as Y, reactive as Je, watch as ze, toRefs as qa, ref as Me, onBeforeUnmount as $t, nextTick as Qt, inject as yt, openBlock as A, createElementBlock as P, renderSlot as R, unref as z, Fragment as $e, renderList as Ae, normalizeClass as Fe, createCommentVNode as re, createElementVNode as Ye, createVNode as mt, Transition as on, withCtx as J, createBlock as nt, resolveDynamicComponent as xn, mergeProps as pe, toHandlers as Kt, normalizeProps as me, onMounted as Vn, toDisplayString as Oe, createTextVNode as en, withModifiers as Bn, normalizeStyle as qe, TransitionGroup as qn, createSlots as ot, useTemplateRef as Ua, useId as Ja, useAttrs as Xa, provide as Un, guardReactiveProps as ge } from "vue";
/**
  * vue-cal v5.0.1-rc.40
  * (c) 2024-2026 Antoni Andre <antoniandre.web@gmail.com>
  * @license MIT
  */
const Ve = {
  texts: {
    weekDays: Array(7).fill(""),
    weekDaysShort: [],
    months: Array(12).fill(""),
    years: "",
    year: "",
    month: "",
    week: "",
    day: "",
    today: "",
    noEvent: "",
    allDay: "",
    deleteEvent: "",
    createEvent: "",
    dateFormat: "dddd MMMM D, YYYY",
    am: "am",
    pm: "pm",
    truncations: !0
  },
  availableViews: {
    day: { cols: 1, rows: 1 },
    days: { cols: 10, rows: 1 },
    week: { cols: 7, rows: 1 },
    month: { cols: 7, rows: 6 },
    year: { cols: 4, rows: 3 },
    years: { cols: 5, rows: 5 }
    // Arbitrary range of quarters of century (25y).
  }
}, Ga = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], tn = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"], Qa = tn.reduce((n, e, t) => (n[e] = t || 7, n), {}), Ka = (n, e, t) => {
  const { dateUtils: s } = n, a = !1, r = Y(() => {
    if (e.view && E.value[e.view]) return e.view;
    if (e.view && !E.value[e.view])
      return console.warn(
        `Vue Cal: the provided view \`${e.view}\` is not in the list of available views. The first available view will be chosen: \`${Object.keys(E.value)[0]}\`.`
      ), Object.keys(E.value)[0];
    const d = e.datePicker ? "month" : "week";
    return E.value[d] ? d : Object.keys(E.value)[0];
  }), l = Y(() => e.sm && !e.xs), i = Y(() => e.xs || e.datePicker), c = Y(() => e.clickToNavigate || e.datePicker && e.clickToNavigate !== !1), w = Y(() => {
    const d = {
      cell: {},
      // All possible event listeners to attach to cells.
      event: {}
      // All possible event listeners to attach to calendar events.
    }, S = (C) => C.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    for (const [C, m] of Object.entries(t)) {
      const [U, Q, ne] = C.match(/^on(Cell|Event)(.+)$/) || [];
      U && (d[Q.toLowerCase()][S(ne).replace(/^-+|-+$/g, "")] = m);
    }
    return d;
  }), v = Y(() => {
    var S;
    const d = {};
    return e.hideWeekends && (d[6] = !0) && (d[7] = !0), (S = e.hideWeekdays) != null && S.length && e.hideWeekdays.forEach((C) => d[Qa[C]] = !0), d;
  }), f = Y(() => e.hideWeekends || v.value[6] && v.value[7]), E = Y(() => {
    const d = e.datePicker;
    let S = 0, C = {};
    const m = e.views;
    if (d && !m) return {
      month: { ...Ve.availableViews.month },
      year: { ...Ve.availableViews.year },
      years: { ...Ve.availableViews.years }
    };
    if (m)
      Array.isArray(m) ? C = m.reduce((U, Q) => (typeof Q == "string" && Ve.availableViews[Q] ? U[Q] = Ve.availableViews[Q] : S++, U), {}) : typeof m == "object" && (C = Object.entries(m).reduce((U, [Q, ne]) => {
        const { cols: ae, rows: ue } = Ve.availableViews[Q];
        return U[Q] = { cols: ne.cols || ae, rows: ne.rows || ue }, U;
      }, {})), S && console.warn("Vue Cal: the provided `views` prop contains invalid views that will be ignored."), Object.keys(C).length || (console.warn("Vue Cal: No valid view in the provided `views` prop. Falling back to default views."), C = { ...Ve.availableViews });
    else if (C = { ...Ve.availableViews }, e.horizontal) {
      const { days: U, week: Q } = Ve.availableViews;
      C.days = { cols: U.rows, rows: U.cols }, C.week = { cols: Q.rows, rows: Q.cols };
    }
    return C;
  }), k = Y(() => e.datePicker ? "month" : E.value.week ? "week" : Object.keys(E.value)[0]), g = Y(() => {
    if (typeof e.selectedDate == "string") return s.stringToDate(e.selectedDate);
    if (e.selectedDate instanceof Date) return e.selectedDate;
    e.selectedDate ? console.warn("Vue Cal: The provided selected date is invalid:", e.selectedDate) : console.log("Vue Cal: Info - The provided selected date is undefined.");
  }), p = Y(() => {
    if (!e.disableDays) return [];
    const d = [];
    if (Array.isArray(e.disableDays))
      for (let S of e.disableDays) {
        let C = S;
        typeof S == "string" ? C = s.stringToDate(S) : S instanceof Date && (S = s.formatDate(S, "YYYY-MM-DD")), C instanceof Date && !isNaN(C.getTime()) ? d.push(S) : console.warn("Vue Cal: The provided `disableDays` prop contains an invalid date:", S);
      }
    else console.warn("Vue Cal: The provided `disableDays` prop is invalid:", e.disableDays);
    return d;
  }), M = Y(() => {
    let d = null;
    return e.minDate && typeof e.minDate == "string" ? d = s.stringToDate(e.minDate) : e.minDate && e.minDate instanceof Date && (d = e.minDate), (d == null ? void 0 : d.getTime()) || null;
  }), h = Y(() => {
    let d = null;
    return e.maxDate && typeof e.maxDate == "string" ? d = s.stringToDate(e.maxDate) : e.maxDate && e.maxDate instanceof Date && (d = e.maxDate), (d == null ? void 0 : d.getTime()) || null;
  }), q = Y(() => {
    var C;
    const { view: d } = n;
    return e.schedules.length && (d.isDay || d.isDays || d.isWeek) && ((C = e.schedules) == null ? void 0 : C.map((m, U) => ({ ...m, id: m.id ?? U + 1 }))) || void 0;
  }), o = Y(() => {
    const d = {
      drag: !0,
      resize: !0,
      delete: !0,
      create: !0
    };
    return e.editableEvents === !0 ? d : e.editableEvents === !1 ? Object.keys(d).map((S) => d[S] = !1) : { ...d, ...e.editableEvents };
  }), O = Y(() => {
    const { view: d } = n, { eventCount: S } = e;
    return (Array.isArray(S) ? S.includes(d.id) : S) && (d.isMonth && !e.eventsOnMonthView || d.isYear);
  }), Z = Y(() => {
    const { view: d } = n;
    return e.allDayEvents && e.time && (d.isDay || d.isDays || d.isWeek);
  }), V = Y(() => {
    const { view: d } = n;
    return e.horizontal && (d.isDay || d.isDays || d.isWeek);
  }), _ = Y(() => e.timeAtCursor && e.time), N = async (d) => {
    var C;
    let S = /* @__PURE__ */ Object.assign({ "../i18n/ar.json": () => import("./i18n/ar.js").then((m) => m.default), "../i18n/bg.json": () => import("./i18n/bg.js").then((m) => m.default), "../i18n/bn.json": () => import("./i18n/bn.js").then((m) => m.default), "../i18n/bs.json": () => import("./i18n/bs.js").then((m) => m.default), "../i18n/ca.json": () => import("./i18n/ca.js").then((m) => m.default), "../i18n/cs.json": () => import("./i18n/cs.js").then((m) => m.default), "../i18n/da.json": () => import("./i18n/da.js").then((m) => m.default), "../i18n/de.json": () => import("./i18n/de.js").then((m) => m.default), "../i18n/el.json": () => import("./i18n/el.js").then((m) => m.default), "../i18n/en-gb.json": () => import("./i18n/en-gb.js").then((m) => m.default), "../i18n/en-us.json": () => Promise.resolve().then(() => Do).then((m) => m.default), "../i18n/es.json": () => import("./i18n/es.js").then((m) => m.default), "../i18n/et.json": () => import("./i18n/et.js").then((m) => m.default), "../i18n/fa.json": () => import("./i18n/fa.js").then((m) => m.default), "../i18n/fi.json": () => import("./i18n/fi.js").then((m) => m.default), "../i18n/fr.json": () => import("./i18n/fr.js").then((m) => m.default), "../i18n/he.json": () => import("./i18n/he.js").then((m) => m.default), "../i18n/hr.json": () => import("./i18n/hr.js").then((m) => m.default), "../i18n/hu.json": () => import("./i18n/hu.js").then((m) => m.default), "../i18n/id.json": () => import("./i18n/id.js").then((m) => m.default), "../i18n/is.json": () => import("./i18n/is.js").then((m) => m.default), "../i18n/it.json": () => import("./i18n/it.js").then((m) => m.default), "../i18n/ja.json": () => import("./i18n/ja.js").then((m) => m.default), "../i18n/ka.json": () => import("./i18n/ka.js").then((m) => m.default), "../i18n/kaa.json": () => import("./i18n/kaa.js").then((m) => m.default), "../i18n/kk.json": () => import("./i18n/kk.js").then((m) => m.default), "../i18n/ko.json": () => import("./i18n/ko.js").then((m) => m.default), "../i18n/ky.json": () => import("./i18n/ky.js").then((m) => m.default), "../i18n/lt.json": () => import("./i18n/lt.js").then((m) => m.default), "../i18n/mn.json": () => import("./i18n/mn.js").then((m) => m.default), "../i18n/nl.json": () => import("./i18n/nl.js").then((m) => m.default), "../i18n/no.json": () => import("./i18n/no.js").then((m) => m.default), "../i18n/pl.json": () => import("./i18n/pl.js").then((m) => m.default), "../i18n/pt-br.json": () => import("./i18n/pt-br.js").then((m) => m.default), "../i18n/pt-pt.json": () => import("./i18n/pt-pt.js").then((m) => m.default), "../i18n/ro.json": () => import("./i18n/ro.js").then((m) => m.default), "../i18n/ru.json": () => import("./i18n/ru.js").then((m) => m.default), "../i18n/sk.json": () => import("./i18n/sk.js").then((m) => m.default), "../i18n/sl.json": () => import("./i18n/sl.js").then((m) => m.default), "../i18n/sq.json": () => import("./i18n/sq.js").then((m) => m.default), "../i18n/sr.json": () => import("./i18n/sr.js").then((m) => m.default), "../i18n/sv.json": () => import("./i18n/sv.js").then((m) => m.default), "../i18n/tr.json": () => import("./i18n/tr.js").then((m) => m.default), "../i18n/uk.json": () => import("./i18n/uk.js").then((m) => m.default), "../i18n/uz-cryl.json": () => import("./i18n/uz-cryl.js").then((m) => m.default), "../i18n/uz.json": () => import("./i18n/uz.js").then((m) => m.default), "../i18n/vi.json": () => import("./i18n/vi.js").then((m) => m.default), "../i18n/zh-cn.json": () => import("./i18n/zh-cn.js").then((m) => m.default), "../i18n/zh-hk.json": () => import("./i18n/zh-hk.js").then((m) => m.default) });
    {
      if (!S[`../i18n/${d}.json`]) {
        console.warn(`Vue Cal: the locale \`${d}\` does not exist. Falling back to \`en-us\`.`), d = "en-us";
        return;
      }
      S = await ((C = S[`../i18n/${d}.json`]) == null ? void 0 : C.call(S));
    }
    n.texts = Object.assign(n.texts, Object.assign({ ...Ve.texts }, S)), s.updateTexts(n.texts);
  }, I = Je(e.events || []);
  return ze(
    [() => e.events, () => {
      var d;
      return (d = e.events) == null ? void 0 : d.length;
    }],
    ([d]) => I.splice(0, I.length, ...d || [])
  ), ze(() => e.locale, (d) => N(d || "en-us")), (e.locale || !n.texts.today) && N(e.locale || "en-us"), {
    ...qa(e),
    events: I,
    // All the events listeners for cells and events that the end user may have attached to vue-cal.
    eventListeners: w,
    defaultView: k,
    availableViews: E,
    disableDays: p,
    ready: a,
    sm: l,
    xs: i,
    clickToNavigate: c,
    hideWeekdays: v,
    hideWeekends: f,
    minTimestamp: M,
    maxTimestamp: h,
    schedules: q,
    selectedDate: g,
    editableEvents: o,
    showCellEventCount: O,
    allDayEvents: Z,
    horizontal: V,
    timeAtCursor: _,
    view: r,
    // Getters.
    get hasHiddenDays() {
      return Object.keys(v.value).length;
    },
    get size() {
      return i.value ? "xs" : l.value ? "sm" : "lg";
    },
    loadTexts: N
  };
}, ht = (n, e) => {
  const t = e.timeTo - e.timeFrom;
  return (n - e.timeFrom) * 100 / t;
}, lt = (n, e) => {
  const t = e.timeTo - e.timeFrom;
  return ~~(n * t / 100 + e.timeFrom);
}, Yn = (n, e) => {
  const t = e.clientHeight;
  return n * 100 / t;
}, Zt = Je({ id: null, date: null });
let Jn = !1, hn = !0;
const Ze = Je({ el: null, cell: null, timeout: null }), je = Je({
  eventId: null,
  fromVueCal: null,
  toVueCal: null
});
function er(n) {
  const { config: e, view: t, eventsManager: s, emit: a, uid: r, dateUtils: l } = n, i = (M) => {
    var _;
    const h = e.horizontal, { clientX: q, clientY: o } = ((_ = M.touches) == null ? void 0 : _[0]) || M, { top: O, left: Z } = M.currentTarget.getBoundingClientRect(), V = ~~M.dataTransfer.getData("cursor-grab-at");
    if (h) {
      const N = q - Z - V;
      return lt(N * 100 / M.currentTarget.clientWidth, e);
    } else {
      const N = o - O - V;
      return lt(Yn(N, M.currentTarget), e);
    }
  }, c = (M, h, q) => {
    const o = h.duration || w(h.start, h.end) || e.timeStep;
    let O = Math.max(i(M), 0);
    if (e.snapToInterval) {
      const N = O + e.snapToInterval / 2;
      O = N - N % e.snapToInterval;
    }
    const Z = l.dateFromDayAndMinutes(q, O), V = Math.min(O + o, 1440), _ = l.dateFromDayAndMinutes(q, V);
    return { start: Z, end: _ };
  }, w = (M, h) => Math.round((h - M) / 6e4);
  return {
    eventDragStart: (M, h) => {
      if (M.target.nodeType === 3 || n.touch.isResizingEvent) return M.preventDefault();
      M.dataTransfer.effectAllowed = "move", M.dataTransfer.dropEffect = "move";
      const q = { ...h, _: { id: h._.id, duration: w(h.start, h.end) } };
      try {
        M.dataTransfer.setData("text/plain", ""), M.dataTransfer.setData("event", JSON.stringify(q)), M.dataTransfer.setData("cursor-grab-at", e.horizontal ? M.offsetX : M.offsetY);
      } catch (O) {
        return console.warn("Vue Cal: Failed to set drag data:", O), M.preventDefault();
      }
      je.eventId = h._.id, je.fromVueCal = r, a("event-drag-start", {
        e: M,
        event: h
      });
      const o = M.target.closest(".vuecal__event");
      o.classList.add("vuecal__event--dragging-ghost"), setTimeout(() => {
        o.classList.add("vuecal__event--dragging-original"), o.classList.remove("vuecal__event--dragging-ghost");
      }, 0), Jn = !1, Object.assign(Zt, { id: t.id, date: t.firstCellDate }), hn = !0, n.touch.isDraggingEvent = !0;
    },
    eventDragEnd: (M, h) => {
      je.eventId = null, M.target.closest(".vuecal__event").classList.remove("vuecal__event--dragging-original");
      const { fromVueCal: q, toVueCal: o } = je;
      o && q !== o && s.deleteEvent(h._.id, 3), Jn && hn && Zt.id && t.switchView(Zt.id, Zt.date, !0), a("event-drag-end", {
        e: M,
        event: h,
        external: je.fromVueCal !== r
      }), je.fromVueCal = null, je.toVueCal = null, n.touch.isDraggingEvent = !1;
    },
    cellDragEnter: (M, h) => {
      const { start: q } = h, o = M.currentTarget;
      if (!M.currentTarget.contains(M.relatedTarget)) {
        if (o === Ze.el || !o.className.includes("vuecal__cell-content")) return !1;
        Ze.el && (Ze.cell.highlighted = !1), Object.assign(Ze, { el: o, cell: h, timeout: clearTimeout(Ze.timeout) }), h.highlighted = !0, ["years", "year", "month"].includes(t.id) && (Ze.timeout = setTimeout(() => n.switchToNarrowerView(q), 2e3));
      }
    },
    cellDragOver: (M, h) => {
      const { start: q, schedule: o } = h;
      M.preventDefault(), h.highlighted = !0, (o || o === 0) && (h.highlightedSchedule = o);
    },
    cellDragLeave: (M, h) => {
      M.preventDefault(), !M.currentTarget.contains(M.relatedTarget) && (h.highlightedSchedule = !1, Ze.cell === h && (clearTimeout(Ze.timeout), Object.assign(Ze, { el: null, cell: null, timeout: null }), h.highlighted = !1));
    },
    cellDragDrop: async (M, h, q = !1) => {
      var S, C, m;
      M.preventDefault(), clearTimeout(Ze.timeout), Object.assign(Ze, { el: null, cell: null, timeout: null });
      const o = JSON.parse(M.dataTransfer.getData("event") || "{}");
      o.start && (o.start = new Date(o.start)), o.end && (o.end = new Date(o.end));
      let O, Z, V;
      q ? (Z = new Date(h.start), V = new Date(h.end)) : { start: Z, end: V } = c(M, o, h.start);
      const { schedule: _ } = ((S = M.target.closest("[data-schedule]")) == null ? void 0 : S.dataset) || {};
      let N = () => {
      };
      je.fromVueCal === r ? (O = s.getEvent(o._.id), O && (O._.dragging = !1, N = (U) => {
        if (O.start = Z, O.end = V, O.allDay = q, _ !== void 0 && (O.schedule = ~~_), U && typeof U == "object") {
          const { _: Q, ...ne } = U;
          Object.assign(O, ne);
        }
      })) : (O = {
        ...o,
        start: Z,
        end: V,
        ..._ !== void 0 && { schedule: ~~_ },
        _: { id: ((C = o._) == null ? void 0 : C.id) || o.id, duration: w(Z, V) },
        getOverlappingEvents: () => s.getEventsInRange(Z, V, { schedule: ~~_ })
      }, N = (U) => {
        if (O = s.createEvent(O), U && typeof U == "object") {
          const { _: Q, ...ne } = U;
          Object.assign(O, ne);
        }
      });
      let I = !0;
      const { drop: d } = (m = e.eventListeners) == null ? void 0 : m.event;
      d && (I = await d({
        e: M,
        event: { ...O, start: Z, end: V, schedule: ~~_ },
        overlaps: O.getOverlappingEvents({ start: Z, end: V, schedule: ~~_ }),
        cell: h,
        external: je.fromVueCal !== r
      })), I !== !1 && N(I), h.highlighted = !1, h.highlightedSchedule = null, hn = !1, je.toVueCal = r, a("event-dropped", {
        e: M,
        cell: h,
        event: O,
        originalEvent: o,
        external: je.fromVueCal !== r
      });
    }
  };
}
class gt extends Error {
}
class tr extends gt {
  constructor(e) {
    super(`Invalid DateTime: ${e.toMessage()}`);
  }
}
class nr extends gt {
  constructor(e) {
    super(`Invalid Interval: ${e.toMessage()}`);
  }
}
class sr extends gt {
  constructor(e) {
    super(`Invalid Duration: ${e.toMessage()}`);
  }
}
class Tt extends gt {
}
class $s extends gt {
  constructor(e) {
    super(`Invalid unit ${e}`);
  }
}
class Ce extends gt {
}
class at extends gt {
  constructor() {
    super("Zone is an abstract class");
  }
}
const W = "numeric", Xe = "short", We = "long", nn = {
  year: W,
  month: W,
  day: W
}, Es = {
  year: W,
  month: Xe,
  day: W
}, ar = {
  year: W,
  month: Xe,
  day: W,
  weekday: Xe
}, Cs = {
  year: W,
  month: We,
  day: W
}, _s = {
  year: W,
  month: We,
  day: W,
  weekday: We
}, Ns = {
  hour: W,
  minute: W
}, Is = {
  hour: W,
  minute: W,
  second: W
}, zs = {
  hour: W,
  minute: W,
  second: W,
  timeZoneName: Xe
}, Vs = {
  hour: W,
  minute: W,
  second: W,
  timeZoneName: We
}, Ys = {
  hour: W,
  minute: W,
  hourCycle: "h23"
}, Fs = {
  hour: W,
  minute: W,
  second: W,
  hourCycle: "h23"
}, Ws = {
  hour: W,
  minute: W,
  second: W,
  hourCycle: "h23",
  timeZoneName: Xe
}, Ls = {
  hour: W,
  minute: W,
  second: W,
  hourCycle: "h23",
  timeZoneName: We
}, As = {
  year: W,
  month: W,
  day: W,
  hour: W,
  minute: W
}, Hs = {
  year: W,
  month: W,
  day: W,
  hour: W,
  minute: W,
  second: W
}, Rs = {
  year: W,
  month: Xe,
  day: W,
  hour: W,
  minute: W
}, Ps = {
  year: W,
  month: Xe,
  day: W,
  hour: W,
  minute: W,
  second: W
}, rr = {
  year: W,
  month: Xe,
  day: W,
  weekday: Xe,
  hour: W,
  minute: W
}, Zs = {
  year: W,
  month: We,
  day: W,
  hour: W,
  minute: W,
  timeZoneName: Xe
}, js = {
  year: W,
  month: We,
  day: W,
  hour: W,
  minute: W,
  second: W,
  timeZoneName: Xe
}, xs = {
  year: W,
  month: We,
  day: W,
  weekday: We,
  hour: W,
  minute: W,
  timeZoneName: We
}, Bs = {
  year: W,
  month: We,
  day: W,
  weekday: We,
  hour: W,
  minute: W,
  second: W,
  timeZoneName: We
};
class Lt {
  /**
   * The type of zone
   * @abstract
   * @type {string}
   */
  get type() {
    throw new at();
  }
  /**
   * The name of this zone.
   * @abstract
   * @type {string}
   */
  get name() {
    throw new at();
  }
  /**
   * The IANA name of this zone.
   * Defaults to `name` if not overwritten by a subclass.
   * @abstract
   * @type {string}
   */
  get ianaName() {
    return this.name;
  }
  /**
   * Returns whether the offset is known to be fixed for the whole year.
   * @abstract
   * @type {boolean}
   */
  get isUniversal() {
    throw new at();
  }
  /**
   * Returns the offset's common name (such as EST) at the specified timestamp
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to get the name
   * @param {Object} opts - Options to affect the format
   * @param {string} opts.format - What style of offset to return. Accepts 'long' or 'short'.
   * @param {string} opts.locale - What locale to return the offset name in.
   * @return {string}
   */
  offsetName(e, t) {
    throw new at();
  }
  /**
   * Returns the offset's value as a string
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to get the offset
   * @param {string} format - What style of offset to return.
   *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
   * @return {string}
   */
  formatOffset(e, t) {
    throw new at();
  }
  /**
   * Return the offset in minutes for this zone at the specified timestamp.
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to compute the offset
   * @return {number}
   */
  offset(e) {
    throw new at();
  }
  /**
   * Return whether this Zone is equal to another zone
   * @abstract
   * @param {Zone} otherZone - the zone to compare
   * @return {boolean}
   */
  equals(e) {
    throw new at();
  }
  /**
   * Return whether this Zone is valid.
   * @abstract
   * @type {boolean}
   */
  get isValid() {
    throw new at();
  }
}
let mn = null;
class ln extends Lt {
  /**
   * Get a singleton instance of the local zone
   * @return {SystemZone}
   */
  static get instance() {
    return mn === null && (mn = new ln()), mn;
  }
  /** @override **/
  get type() {
    return "system";
  }
  /** @override **/
  get name() {
    return new Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  /** @override **/
  get isUniversal() {
    return !1;
  }
  /** @override **/
  offsetName(e, { format: t, locale: s }) {
    return sa(e, t, s);
  }
  /** @override **/
  formatOffset(e, t) {
    return Ft(this.offset(e), t);
  }
  /** @override **/
  offset(e) {
    return -new Date(e).getTimezoneOffset();
  }
  /** @override **/
  equals(e) {
    return e.type === "system";
  }
  /** @override **/
  get isValid() {
    return !0;
  }
}
const Mn = /* @__PURE__ */ new Map();
function ir(n) {
  let e = Mn.get(n);
  return e === void 0 && (e = new Intl.DateTimeFormat("en-US", {
    hour12: !1,
    timeZone: n,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    era: "short"
  }), Mn.set(n, e)), e;
}
const or = {
  year: 0,
  month: 1,
  day: 2,
  era: 3,
  hour: 4,
  minute: 5,
  second: 6
};
function lr(n, e) {
  const t = n.format(e).replace(/\u200E/g, ""), s = /(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(t), [, a, r, l, i, c, w, v] = s;
  return [l, a, r, i, c, w, v];
}
function ur(n, e) {
  const t = n.formatToParts(e), s = [];
  for (let a = 0; a < t.length; a++) {
    const { type: r, value: l } = t[a], i = or[r];
    r === "era" ? s[i] = l : G(i) || (s[i] = parseInt(l, 10));
  }
  return s;
}
const vn = /* @__PURE__ */ new Map();
class st extends Lt {
  /**
   * @param {string} name - Zone name
   * @return {IANAZone}
   */
  static create(e) {
    let t = vn.get(e);
    return t === void 0 && vn.set(e, t = new st(e)), t;
  }
  /**
   * Reset local caches. Should only be necessary in testing scenarios.
   * @return {void}
   */
  static resetCache() {
    vn.clear(), Mn.clear();
  }
  /**
   * Returns whether the provided string is a valid specifier. This only checks the string's format, not that the specifier identifies a known zone; see isValidZone for that.
   * @param {string} s - The string to check validity on
   * @example IANAZone.isValidSpecifier("America/New_York") //=> true
   * @example IANAZone.isValidSpecifier("Sport~~blorp") //=> false
   * @deprecated For backward compatibility, this forwards to isValidZone, better use `isValidZone()` directly instead.
   * @return {boolean}
   */
  static isValidSpecifier(e) {
    return this.isValidZone(e);
  }
  /**
   * Returns whether the provided string identifies a real zone
   * @param {string} zone - The string to check
   * @example IANAZone.isValidZone("America/New_York") //=> true
   * @example IANAZone.isValidZone("Fantasia/Castle") //=> false
   * @example IANAZone.isValidZone("Sport~~blorp") //=> false
   * @return {boolean}
   */
  static isValidZone(e) {
    if (!e)
      return !1;
    try {
      return new Intl.DateTimeFormat("en-US", { timeZone: e }).format(), !0;
    } catch {
      return !1;
    }
  }
  constructor(e) {
    super(), this.zoneName = e, this.valid = st.isValidZone(e);
  }
  /**
   * The type of zone. `iana` for all instances of `IANAZone`.
   * @override
   * @type {string}
   */
  get type() {
    return "iana";
  }
  /**
   * The name of this zone (i.e. the IANA zone name).
   * @override
   * @type {string}
   */
  get name() {
    return this.zoneName;
  }
  /**
   * Returns whether the offset is known to be fixed for the whole year:
   * Always returns false for all IANA zones.
   * @override
   * @type {boolean}
   */
  get isUniversal() {
    return !1;
  }
  /**
   * Returns the offset's common name (such as EST) at the specified timestamp
   * @override
   * @param {number} ts - Epoch milliseconds for which to get the name
   * @param {Object} opts - Options to affect the format
   * @param {string} opts.format - What style of offset to return. Accepts 'long' or 'short'.
   * @param {string} opts.locale - What locale to return the offset name in.
   * @return {string}
   */
  offsetName(e, { format: t, locale: s }) {
    return sa(e, t, s, this.name);
  }
  /**
   * Returns the offset's value as a string
   * @override
   * @param {number} ts - Epoch milliseconds for which to get the offset
   * @param {string} format - What style of offset to return.
   *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
   * @return {string}
   */
  formatOffset(e, t) {
    return Ft(this.offset(e), t);
  }
  /**
   * Return the offset in minutes for this zone at the specified timestamp.
   * @override
   * @param {number} ts - Epoch milliseconds for which to compute the offset
   * @return {number}
   */
  offset(e) {
    if (!this.valid) return NaN;
    const t = new Date(e);
    if (isNaN(t)) return NaN;
    const s = ir(this.name);
    let [a, r, l, i, c, w, v] = s.formatToParts ? ur(s, t) : lr(s, t);
    i === "BC" && (a = -Math.abs(a) + 1);
    const E = cn({
      year: a,
      month: r,
      day: l,
      hour: c === 24 ? 0 : c,
      minute: w,
      second: v,
      millisecond: 0
    });
    let k = +t;
    const g = k % 1e3;
    return k -= g >= 0 ? g : 1e3 + g, (E - k) / (60 * 1e3);
  }
  /**
   * Return whether this Zone is equal to another zone
   * @override
   * @param {Zone} otherZone - the zone to compare
   * @return {boolean}
   */
  equals(e) {
    return e.type === "iana" && e.name === this.name;
  }
  /**
   * Return whether this Zone is valid.
   * @override
   * @type {boolean}
   */
  get isValid() {
    return this.valid;
  }
}
let Xn = {};
function cr(n, e = {}) {
  const t = JSON.stringify([n, e]);
  let s = Xn[t];
  return s || (s = new Intl.ListFormat(n, e), Xn[t] = s), s;
}
const Sn = /* @__PURE__ */ new Map();
function bn(n, e = {}) {
  const t = JSON.stringify([n, e]);
  let s = Sn.get(t);
  return s === void 0 && (s = new Intl.DateTimeFormat(n, e), Sn.set(t, s)), s;
}
const On = /* @__PURE__ */ new Map();
function dr(n, e = {}) {
  const t = JSON.stringify([n, e]);
  let s = On.get(t);
  return s === void 0 && (s = new Intl.NumberFormat(n, e), On.set(t, s)), s;
}
const $n = /* @__PURE__ */ new Map();
function fr(n, e = {}) {
  const { base: t, ...s } = e, a = JSON.stringify([n, s]);
  let r = $n.get(a);
  return r === void 0 && (r = new Intl.RelativeTimeFormat(n, e), $n.set(a, r)), r;
}
let zt = null;
function hr() {
  return zt || (zt = new Intl.DateTimeFormat().resolvedOptions().locale, zt);
}
const En = /* @__PURE__ */ new Map();
function qs(n) {
  let e = En.get(n);
  return e === void 0 && (e = new Intl.DateTimeFormat(n).resolvedOptions(), En.set(n, e)), e;
}
const Cn = /* @__PURE__ */ new Map();
function mr(n) {
  let e = Cn.get(n);
  if (!e) {
    const t = new Intl.Locale(n);
    e = "getWeekInfo" in t ? t.getWeekInfo() : t.weekInfo, "minimalDays" in e || (e = { ...Us, ...e }), Cn.set(n, e);
  }
  return e;
}
function vr(n) {
  const e = n.indexOf("-x-");
  e !== -1 && (n = n.substring(0, e));
  const t = n.indexOf("-u-");
  if (t === -1)
    return [n];
  {
    let s, a;
    try {
      s = bn(n).resolvedOptions(), a = n;
    } catch {
      const c = n.substring(0, t);
      s = bn(c).resolvedOptions(), a = c;
    }
    const { numberingSystem: r, calendar: l } = s;
    return [a, r, l];
  }
}
function yr(n, e, t) {
  return (t || e) && (n.includes("-u-") || (n += "-u"), t && (n += `-ca-${t}`), e && (n += `-nu-${e}`)), n;
}
function gr(n) {
  const e = [];
  for (let t = 1; t <= 12; t++) {
    const s = x.utc(2009, t, 1);
    e.push(n(s));
  }
  return e;
}
function wr(n) {
  const e = [];
  for (let t = 1; t <= 7; t++) {
    const s = x.utc(2016, 11, 13 + t);
    e.push(n(s));
  }
  return e;
}
function jt(n, e, t, s) {
  const a = n.listingMode();
  return a === "error" ? null : a === "en" ? t(e) : s(e);
}
function Dr(n) {
  return n.numberingSystem && n.numberingSystem !== "latn" ? !1 : n.numberingSystem === "latn" || !n.locale || n.locale.startsWith("en") || qs(n.locale).numberingSystem === "latn";
}
class pr {
  constructor(e, t, s) {
    this.padTo = s.padTo || 0, this.floor = s.floor || !1;
    const { padTo: a, floor: r, ...l } = s;
    if (!t || Object.keys(l).length > 0) {
      const i = { useGrouping: !1, ...s };
      s.padTo > 0 && (i.minimumIntegerDigits = s.padTo), this.inf = dr(e, i);
    }
  }
  format(e) {
    if (this.inf) {
      const t = this.floor ? Math.floor(e) : e;
      return this.inf.format(t);
    } else {
      const t = this.floor ? Math.floor(e) : Hn(e, 3);
      return Se(t, this.padTo);
    }
  }
}
class kr {
  constructor(e, t, s) {
    this.opts = s, this.originalZone = void 0;
    let a;
    if (this.opts.timeZone)
      this.dt = e;
    else if (e.zone.type === "fixed") {
      const l = -1 * (e.offset / 60), i = l >= 0 ? `Etc/GMT+${l}` : `Etc/GMT${l}`;
      e.offset !== 0 && st.create(i).valid ? (a = i, this.dt = e) : (a = "UTC", this.dt = e.offset === 0 ? e : e.setZone("UTC").plus({ minutes: e.offset }), this.originalZone = e.zone);
    } else e.zone.type === "system" ? this.dt = e : e.zone.type === "iana" ? (this.dt = e, a = e.zone.name) : (a = "UTC", this.dt = e.setZone("UTC").plus({ minutes: e.offset }), this.originalZone = e.zone);
    const r = { ...this.opts };
    r.timeZone = r.timeZone || a, this.dtf = bn(t, r);
  }
  format() {
    return this.originalZone ? this.formatToParts().map(({ value: e }) => e).join("") : this.dtf.format(this.dt.toJSDate());
  }
  formatToParts() {
    const e = this.dtf.formatToParts(this.dt.toJSDate());
    return this.originalZone ? e.map((t) => {
      if (t.type === "timeZoneName") {
        const s = this.originalZone.offsetName(this.dt.ts, {
          locale: this.dt.locale,
          format: this.opts.timeZoneName
        });
        return {
          ...t,
          value: s
        };
      } else
        return t;
    }) : e;
  }
  resolvedOptions() {
    return this.dtf.resolvedOptions();
  }
}
class Tr {
  constructor(e, t, s) {
    this.opts = { style: "long", ...s }, !t && ta() && (this.rtf = fr(e, s));
  }
  format(e, t) {
    return this.rtf ? this.rtf.format(e, t) : jr(t, e, this.opts.numeric, this.opts.style !== "long");
  }
  formatToParts(e, t) {
    return this.rtf ? this.rtf.formatToParts(e, t) : [];
  }
}
const Us = {
  firstDay: 1,
  minimalDays: 4,
  weekend: [6, 7]
};
class fe {
  static fromOpts(e) {
    return fe.create(
      e.locale,
      e.numberingSystem,
      e.outputCalendar,
      e.weekSettings,
      e.defaultToEN
    );
  }
  static create(e, t, s, a, r = !1) {
    const l = e || Te.defaultLocale, i = l || (r ? "en-US" : hr()), c = t || Te.defaultNumberingSystem, w = s || Te.defaultOutputCalendar, v = Nn(a) || Te.defaultWeekSettings;
    return new fe(i, c, w, v, l);
  }
  static resetCache() {
    zt = null, Sn.clear(), On.clear(), $n.clear(), En.clear(), Cn.clear();
  }
  static fromObject({ locale: e, numberingSystem: t, outputCalendar: s, weekSettings: a } = {}) {
    return fe.create(e, t, s, a);
  }
  constructor(e, t, s, a, r) {
    const [l, i, c] = vr(e);
    this.locale = l, this.numberingSystem = t || i || null, this.outputCalendar = s || c || null, this.weekSettings = a, this.intl = yr(this.locale, this.numberingSystem, this.outputCalendar), this.weekdaysCache = { format: {}, standalone: {} }, this.monthsCache = { format: {}, standalone: {} }, this.meridiemCache = null, this.eraCache = {}, this.specifiedLocale = r, this.fastNumbersCached = null;
  }
  get fastNumbers() {
    return this.fastNumbersCached == null && (this.fastNumbersCached = Dr(this)), this.fastNumbersCached;
  }
  listingMode() {
    const e = this.isEnglish(), t = (this.numberingSystem === null || this.numberingSystem === "latn") && (this.outputCalendar === null || this.outputCalendar === "gregory");
    return e && t ? "en" : "intl";
  }
  clone(e) {
    return !e || Object.getOwnPropertyNames(e).length === 0 ? this : fe.create(
      e.locale || this.specifiedLocale,
      e.numberingSystem || this.numberingSystem,
      e.outputCalendar || this.outputCalendar,
      Nn(e.weekSettings) || this.weekSettings,
      e.defaultToEN || !1
    );
  }
  redefaultToEN(e = {}) {
    return this.clone({ ...e, defaultToEN: !0 });
  }
  redefaultToSystem(e = {}) {
    return this.clone({ ...e, defaultToEN: !1 });
  }
  months(e, t = !1) {
    return jt(this, e, ia, () => {
      const s = this.intl === "ja" || this.intl.startsWith("ja-");
      t &= !s;
      const a = t ? { month: e, day: "numeric" } : { month: e }, r = t ? "format" : "standalone";
      if (!this.monthsCache[r][e]) {
        const l = s ? (i) => this.dtFormatter(i, a).format() : (i) => this.extract(i, a, "month");
        this.monthsCache[r][e] = gr(l);
      }
      return this.monthsCache[r][e];
    });
  }
  weekdays(e, t = !1) {
    return jt(this, e, ua, () => {
      const s = t ? { weekday: e, year: "numeric", month: "long", day: "numeric" } : { weekday: e }, a = t ? "format" : "standalone";
      return this.weekdaysCache[a][e] || (this.weekdaysCache[a][e] = wr(
        (r) => this.extract(r, s, "weekday")
      )), this.weekdaysCache[a][e];
    });
  }
  meridiems() {
    return jt(
      this,
      void 0,
      () => ca,
      () => {
        if (!this.meridiemCache) {
          const e = { hour: "numeric", hourCycle: "h12" };
          this.meridiemCache = [x.utc(2016, 11, 13, 9), x.utc(2016, 11, 13, 19)].map(
            (t) => this.extract(t, e, "dayperiod")
          );
        }
        return this.meridiemCache;
      }
    );
  }
  eras(e) {
    return jt(this, e, da, () => {
      const t = { era: e };
      return this.eraCache[e] || (this.eraCache[e] = [x.utc(-40, 1, 1), x.utc(2017, 1, 1)].map(
        (s) => this.extract(s, t, "era")
      )), this.eraCache[e];
    });
  }
  extract(e, t, s) {
    const a = this.dtFormatter(e, t), r = a.formatToParts(), l = r.find((i) => i.type.toLowerCase() === s);
    return l ? l.value : null;
  }
  numberFormatter(e = {}) {
    return new pr(this.intl, e.forceSimple || this.fastNumbers, e);
  }
  dtFormatter(e, t = {}) {
    return new kr(e, this.intl, t);
  }
  relFormatter(e = {}) {
    return new Tr(this.intl, this.isEnglish(), e);
  }
  listFormatter(e = {}) {
    return cr(this.intl, e);
  }
  isEnglish() {
    return this.locale === "en" || this.locale.toLowerCase() === "en-us" || qs(this.intl).locale.startsWith("en-us");
  }
  getWeekSettings() {
    return this.weekSettings ? this.weekSettings : na() ? mr(this.locale) : Us;
  }
  getStartOfWeek() {
    return this.getWeekSettings().firstDay;
  }
  getMinDaysInFirstWeek() {
    return this.getWeekSettings().minimalDays;
  }
  getWeekendDays() {
    return this.getWeekSettings().weekend;
  }
  equals(e) {
    return this.locale === e.locale && this.numberingSystem === e.numberingSystem && this.outputCalendar === e.outputCalendar;
  }
  toString() {
    return `Locale(${this.locale}, ${this.numberingSystem}, ${this.outputCalendar})`;
  }
}
let yn = null;
class Ie extends Lt {
  /**
   * Get a singleton instance of UTC
   * @return {FixedOffsetZone}
   */
  static get utcInstance() {
    return yn === null && (yn = new Ie(0)), yn;
  }
  /**
   * Get an instance with a specified offset
   * @param {number} offset - The offset in minutes
   * @return {FixedOffsetZone}
   */
  static instance(e) {
    return e === 0 ? Ie.utcInstance : new Ie(e);
  }
  /**
   * Get an instance of FixedOffsetZone from a UTC offset string, like "UTC+6"
   * @param {string} s - The offset string to parse
   * @example FixedOffsetZone.parseSpecifier("UTC+6")
   * @example FixedOffsetZone.parseSpecifier("UTC+06")
   * @example FixedOffsetZone.parseSpecifier("UTC-6:00")
   * @return {FixedOffsetZone}
   */
  static parseSpecifier(e) {
    if (e) {
      const t = e.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);
      if (t)
        return new Ie(dn(t[1], t[2]));
    }
    return null;
  }
  constructor(e) {
    super(), this.fixed = e;
  }
  /**
   * The type of zone. `fixed` for all instances of `FixedOffsetZone`.
   * @override
   * @type {string}
   */
  get type() {
    return "fixed";
  }
  /**
   * The name of this zone.
   * All fixed zones' names always start with "UTC" (plus optional offset)
   * @override
   * @type {string}
   */
  get name() {
    return this.fixed === 0 ? "UTC" : `UTC${Ft(this.fixed, "narrow")}`;
  }
  /**
   * The IANA name of this zone, i.e. `Etc/UTC` or `Etc/GMT+/-nn`
   *
   * @override
   * @type {string}
   */
  get ianaName() {
    return this.fixed === 0 ? "Etc/UTC" : `Etc/GMT${Ft(-this.fixed, "narrow")}`;
  }
  /**
   * Returns the offset's common name at the specified timestamp.
   *
   * For fixed offset zones this equals to the zone name.
   * @override
   */
  offsetName() {
    return this.name;
  }
  /**
   * Returns the offset's value as a string
   * @override
   * @param {number} ts - Epoch milliseconds for which to get the offset
   * @param {string} format - What style of offset to return.
   *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
   * @return {string}
   */
  formatOffset(e, t) {
    return Ft(this.fixed, t);
  }
  /**
   * Returns whether the offset is known to be fixed for the whole year:
   * Always returns true for all fixed offset zones.
   * @override
   * @type {boolean}
   */
  get isUniversal() {
    return !0;
  }
  /**
   * Return the offset in minutes for this zone at the specified timestamp.
   *
   * For fixed offset zones, this is constant and does not depend on a timestamp.
   * @override
   * @return {number}
   */
  offset() {
    return this.fixed;
  }
  /**
   * Return whether this Zone is equal to another zone (i.e. also fixed and same offset)
   * @override
   * @param {Zone} otherZone - the zone to compare
   * @return {boolean}
   */
  equals(e) {
    return e.type === "fixed" && e.fixed === this.fixed;
  }
  /**
   * Return whether this Zone is valid:
   * All fixed offset zones are valid.
   * @override
   * @type {boolean}
   */
  get isValid() {
    return !0;
  }
}
class Mr extends Lt {
  constructor(e) {
    super(), this.zoneName = e;
  }
  /** @override **/
  get type() {
    return "invalid";
  }
  /** @override **/
  get name() {
    return this.zoneName;
  }
  /** @override **/
  get isUniversal() {
    return !1;
  }
  /** @override **/
  offsetName() {
    return null;
  }
  /** @override **/
  formatOffset() {
    return "";
  }
  /** @override **/
  offset() {
    return NaN;
  }
  /** @override **/
  equals() {
    return !1;
  }
  /** @override **/
  get isValid() {
    return !1;
  }
}
function it(n, e) {
  if (G(n) || n === null)
    return e;
  if (n instanceof Lt)
    return n;
  if (Cr(n)) {
    const t = n.toLowerCase();
    return t === "default" ? e : t === "local" || t === "system" ? ln.instance : t === "utc" || t === "gmt" ? Ie.utcInstance : Ie.parseSpecifier(t) || st.create(n);
  } else return ut(n) ? Ie.instance(n) : typeof n == "object" && "offset" in n && typeof n.offset == "function" ? n : new Mr(n);
}
const Fn = {
  arab: "[٠-٩]",
  arabext: "[۰-۹]",
  bali: "[᭐-᭙]",
  beng: "[০-৯]",
  deva: "[०-९]",
  fullwide: "[０-９]",
  gujr: "[૦-૯]",
  hanidec: "[〇|一|二|三|四|五|六|七|八|九]",
  khmr: "[០-៩]",
  knda: "[೦-೯]",
  laoo: "[໐-໙]",
  limb: "[᥆-᥏]",
  mlym: "[൦-൯]",
  mong: "[᠐-᠙]",
  mymr: "[၀-၉]",
  orya: "[୦-୯]",
  tamldec: "[௦-௯]",
  telu: "[౦-౯]",
  thai: "[๐-๙]",
  tibt: "[༠-༩]",
  latn: "\\d"
}, Gn = {
  arab: [1632, 1641],
  arabext: [1776, 1785],
  bali: [6992, 7001],
  beng: [2534, 2543],
  deva: [2406, 2415],
  fullwide: [65296, 65303],
  gujr: [2790, 2799],
  khmr: [6112, 6121],
  knda: [3302, 3311],
  laoo: [3792, 3801],
  limb: [6470, 6479],
  mlym: [3430, 3439],
  mong: [6160, 6169],
  mymr: [4160, 4169],
  orya: [2918, 2927],
  tamldec: [3046, 3055],
  telu: [3174, 3183],
  thai: [3664, 3673],
  tibt: [3872, 3881]
}, Sr = Fn.hanidec.replace(/[\[|\]]/g, "").split("");
function br(n) {
  let e = parseInt(n, 10);
  if (isNaN(e)) {
    e = "";
    for (let t = 0; t < n.length; t++) {
      const s = n.charCodeAt(t);
      if (n[t].search(Fn.hanidec) !== -1)
        e += Sr.indexOf(n[t]);
      else
        for (const a in Gn) {
          const [r, l] = Gn[a];
          s >= r && s <= l && (e += s - r);
        }
    }
    return parseInt(e, 10);
  } else
    return e;
}
const _n = /* @__PURE__ */ new Map();
function Or() {
  _n.clear();
}
function xe({ numberingSystem: n }, e = "") {
  const t = n || "latn";
  let s = _n.get(t);
  s === void 0 && (s = /* @__PURE__ */ new Map(), _n.set(t, s));
  let a = s.get(e);
  return a === void 0 && (a = new RegExp(`${Fn[t]}${e}`), s.set(e, a)), a;
}
let Qn = () => Date.now(), Kn = "system", es = null, ts = null, ns = null, ss = 60, as, rs = null;
class Te {
  /**
   * Get the callback for returning the current timestamp.
   * @type {function}
   */
  static get now() {
    return Qn;
  }
  /**
   * Set the callback for returning the current timestamp.
   * The function should return a number, which will be interpreted as an Epoch millisecond count
   * @type {function}
   * @example Settings.now = () => Date.now() + 3000 // pretend it is 3 seconds in the future
   * @example Settings.now = () => 0 // always pretend it's Jan 1, 1970 at midnight in UTC time
   */
  static set now(e) {
    Qn = e;
  }
  /**
   * Set the default time zone to create DateTimes in. Does not affect existing instances.
   * Use the value "system" to reset this value to the system's time zone.
   * @type {string}
   */
  static set defaultZone(e) {
    Kn = e;
  }
  /**
   * Get the default time zone object currently used to create DateTimes. Does not affect existing instances.
   * The default value is the system's time zone (the one set on the machine that runs this code).
   * @type {Zone}
   */
  static get defaultZone() {
    return it(Kn, ln.instance);
  }
  /**
   * Get the default locale to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultLocale() {
    return es;
  }
  /**
   * Set the default locale to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultLocale(e) {
    es = e;
  }
  /**
   * Get the default numbering system to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultNumberingSystem() {
    return ts;
  }
  /**
   * Set the default numbering system to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultNumberingSystem(e) {
    ts = e;
  }
  /**
   * Get the default output calendar to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultOutputCalendar() {
    return ns;
  }
  /**
   * Set the default output calendar to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultOutputCalendar(e) {
    ns = e;
  }
  /**
   * @typedef {Object} WeekSettings
   * @property {number} firstDay
   * @property {number} minimalDays
   * @property {number[]} weekend
   */
  /**
   * @return {WeekSettings|null}
   */
  static get defaultWeekSettings() {
    return rs;
  }
  /**
   * Allows overriding the default locale week settings, i.e. the start of the week, the weekend and
   * how many days are required in the first week of a year.
   * Does not affect existing instances.
   *
   * @param {WeekSettings|null} weekSettings
   */
  static set defaultWeekSettings(e) {
    rs = Nn(e);
  }
  /**
   * Get the cutoff year for whether a 2-digit year string is interpreted in the current or previous century. Numbers higher than the cutoff will be considered to mean 19xx and numbers lower or equal to the cutoff will be considered 20xx.
   * @type {number}
   */
  static get twoDigitCutoffYear() {
    return ss;
  }
  /**
   * Set the cutoff year for whether a 2-digit year string is interpreted in the current or previous century. Numbers higher than the cutoff will be considered to mean 19xx and numbers lower or equal to the cutoff will be considered 20xx.
   * @type {number}
   * @example Settings.twoDigitCutoffYear = 0 // all 'yy' are interpreted as 20th century
   * @example Settings.twoDigitCutoffYear = 99 // all 'yy' are interpreted as 21st century
   * @example Settings.twoDigitCutoffYear = 50 // '49' -> 2049; '50' -> 1950
   * @example Settings.twoDigitCutoffYear = 1950 // interpreted as 50
   * @example Settings.twoDigitCutoffYear = 2050 // ALSO interpreted as 50
   */
  static set twoDigitCutoffYear(e) {
    ss = e % 100;
  }
  /**
   * Get whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
   * @type {boolean}
   */
  static get throwOnInvalid() {
    return as;
  }
  /**
   * Set whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
   * @type {boolean}
   */
  static set throwOnInvalid(e) {
    as = e;
  }
  /**
   * Reset Luxon's global caches. Should only be necessary in testing scenarios.
   * @return {void}
   */
  static resetCaches() {
    fe.resetCache(), st.resetCache(), x.resetCache(), Or();
  }
}
class Ue {
  constructor(e, t) {
    this.reason = e, this.explanation = t;
  }
  toMessage() {
    return this.explanation ? `${this.reason}: ${this.explanation}` : this.reason;
  }
}
const Js = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], Xs = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
function He(n, e) {
  return new Ue(
    "unit out of range",
    `you specified ${e} (of type ${typeof e}) as a ${n}, which is invalid`
  );
}
function Wn(n, e, t) {
  const s = new Date(Date.UTC(n, e - 1, t));
  n < 100 && n >= 0 && s.setUTCFullYear(s.getUTCFullYear() - 1900);
  const a = s.getUTCDay();
  return a === 0 ? 7 : a;
}
function Gs(n, e, t) {
  return t + (At(n) ? Xs : Js)[e - 1];
}
function Qs(n, e) {
  const t = At(n) ? Xs : Js, s = t.findIndex((r) => r < e), a = e - t[s];
  return { month: s + 1, day: a };
}
function Ln(n, e) {
  return (n - e + 7) % 7 + 1;
}
function sn(n, e = 4, t = 1) {
  const { year: s, month: a, day: r } = n, l = Gs(s, a, r), i = Ln(Wn(s, a, r), t);
  let c = Math.floor((l - i + 14 - e) / 7), w;
  return c < 1 ? (w = s - 1, c = Wt(w, e, t)) : c > Wt(s, e, t) ? (w = s + 1, c = 1) : w = s, { weekYear: w, weekNumber: c, weekday: i, ...fn(n) };
}
function is(n, e = 4, t = 1) {
  const { weekYear: s, weekNumber: a, weekday: r } = n, l = Ln(Wn(s, 1, e), t), i = Mt(s);
  let c = a * 7 + r - l - 7 + e, w;
  c < 1 ? (w = s - 1, c += Mt(w)) : c > i ? (w = s + 1, c -= Mt(s)) : w = s;
  const { month: v, day: f } = Qs(w, c);
  return { year: w, month: v, day: f, ...fn(n) };
}
function gn(n) {
  const { year: e, month: t, day: s } = n, a = Gs(e, t, s);
  return { year: e, ordinal: a, ...fn(n) };
}
function os(n) {
  const { year: e, ordinal: t } = n, { month: s, day: a } = Qs(e, t);
  return { year: e, month: s, day: a, ...fn(n) };
}
function ls(n, e) {
  if (!G(n.localWeekday) || !G(n.localWeekNumber) || !G(n.localWeekYear)) {
    if (!G(n.weekday) || !G(n.weekNumber) || !G(n.weekYear))
      throw new Tt(
        "Cannot mix locale-based week fields with ISO-based week fields"
      );
    return G(n.localWeekday) || (n.weekday = n.localWeekday), G(n.localWeekNumber) || (n.weekNumber = n.localWeekNumber), G(n.localWeekYear) || (n.weekYear = n.localWeekYear), delete n.localWeekday, delete n.localWeekNumber, delete n.localWeekYear, {
      minDaysInFirstWeek: e.getMinDaysInFirstWeek(),
      startOfWeek: e.getStartOfWeek()
    };
  } else
    return { minDaysInFirstWeek: 4, startOfWeek: 1 };
}
function $r(n, e = 4, t = 1) {
  const s = un(n.weekYear), a = Re(
    n.weekNumber,
    1,
    Wt(n.weekYear, e, t)
  ), r = Re(n.weekday, 1, 7);
  return s ? a ? r ? !1 : He("weekday", n.weekday) : He("week", n.weekNumber) : He("weekYear", n.weekYear);
}
function Er(n) {
  const e = un(n.year), t = Re(n.ordinal, 1, Mt(n.year));
  return e ? t ? !1 : He("ordinal", n.ordinal) : He("year", n.year);
}
function Ks(n) {
  const e = un(n.year), t = Re(n.month, 1, 12), s = Re(n.day, 1, an(n.year, n.month));
  return e ? t ? s ? !1 : He("day", n.day) : He("month", n.month) : He("year", n.year);
}
function ea(n) {
  const { hour: e, minute: t, second: s, millisecond: a } = n, r = Re(e, 0, 23) || e === 24 && t === 0 && s === 0 && a === 0, l = Re(t, 0, 59), i = Re(s, 0, 59), c = Re(a, 0, 999);
  return r ? l ? i ? c ? !1 : He("millisecond", a) : He("second", s) : He("minute", t) : He("hour", e);
}
function G(n) {
  return typeof n > "u";
}
function ut(n) {
  return typeof n == "number";
}
function un(n) {
  return typeof n == "number" && n % 1 === 0;
}
function Cr(n) {
  return typeof n == "string";
}
function _r(n) {
  return Object.prototype.toString.call(n) === "[object Date]";
}
function ta() {
  try {
    return typeof Intl < "u" && !!Intl.RelativeTimeFormat;
  } catch {
    return !1;
  }
}
function na() {
  try {
    return typeof Intl < "u" && !!Intl.Locale && ("weekInfo" in Intl.Locale.prototype || "getWeekInfo" in Intl.Locale.prototype);
  } catch {
    return !1;
  }
}
function Nr(n) {
  return Array.isArray(n) ? n : [n];
}
function us(n, e, t) {
  if (n.length !== 0)
    return n.reduce((s, a) => {
      const r = [e(a), a];
      return s && t(s[0], r[0]) === s[0] ? s : r;
    }, null)[1];
}
function Ir(n, e) {
  return e.reduce((t, s) => (t[s] = n[s], t), {});
}
function Ot(n, e) {
  return Object.prototype.hasOwnProperty.call(n, e);
}
function Nn(n) {
  if (n == null)
    return null;
  if (typeof n != "object")
    throw new Ce("Week settings must be an object");
  if (!Re(n.firstDay, 1, 7) || !Re(n.minimalDays, 1, 7) || !Array.isArray(n.weekend) || n.weekend.some((e) => !Re(e, 1, 7)))
    throw new Ce("Invalid week settings");
  return {
    firstDay: n.firstDay,
    minimalDays: n.minimalDays,
    weekend: Array.from(n.weekend)
  };
}
function Re(n, e, t) {
  return un(n) && n >= e && n <= t;
}
function zr(n, e) {
  return n - e * Math.floor(n / e);
}
function Se(n, e = 2) {
  const t = n < 0;
  let s;
  return t ? s = "-" + ("" + -n).padStart(e, "0") : s = ("" + n).padStart(e, "0"), s;
}
function rt(n) {
  if (!(G(n) || n === null || n === ""))
    return parseInt(n, 10);
}
function dt(n) {
  if (!(G(n) || n === null || n === ""))
    return parseFloat(n);
}
function An(n) {
  if (!(G(n) || n === null || n === "")) {
    const e = parseFloat("0." + n) * 1e3;
    return Math.floor(e);
  }
}
function Hn(n, e, t = "round") {
  const s = 10 ** e;
  switch (t) {
    case "expand":
      return n > 0 ? Math.ceil(n * s) / s : Math.floor(n * s) / s;
    case "trunc":
      return Math.trunc(n * s) / s;
    case "round":
      return Math.round(n * s) / s;
    case "floor":
      return Math.floor(n * s) / s;
    case "ceil":
      return Math.ceil(n * s) / s;
    default:
      throw new RangeError(`Value rounding ${t} is out of range`);
  }
}
function At(n) {
  return n % 4 === 0 && (n % 100 !== 0 || n % 400 === 0);
}
function Mt(n) {
  return At(n) ? 366 : 365;
}
function an(n, e) {
  const t = zr(e - 1, 12) + 1, s = n + (e - t) / 12;
  return t === 2 ? At(s) ? 29 : 28 : [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][t - 1];
}
function cn(n) {
  let e = Date.UTC(
    n.year,
    n.month - 1,
    n.day,
    n.hour,
    n.minute,
    n.second,
    n.millisecond
  );
  return n.year < 100 && n.year >= 0 && (e = new Date(e), e.setUTCFullYear(n.year, n.month - 1, n.day)), +e;
}
function cs(n, e, t) {
  return -Ln(Wn(n, 1, e), t) + e - 1;
}
function Wt(n, e = 4, t = 1) {
  const s = cs(n, e, t), a = cs(n + 1, e, t);
  return (Mt(n) - s + a) / 7;
}
function In(n) {
  return n > 99 ? n : n > Te.twoDigitCutoffYear ? 1900 + n : 2e3 + n;
}
function sa(n, e, t, s = null) {
  const a = new Date(n), r = {
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  };
  s && (r.timeZone = s);
  const l = { timeZoneName: e, ...r }, i = new Intl.DateTimeFormat(t, l).formatToParts(a).find((c) => c.type.toLowerCase() === "timezonename");
  return i ? i.value : null;
}
function dn(n, e) {
  let t = parseInt(n, 10);
  Number.isNaN(t) && (t = 0);
  const s = parseInt(e, 10) || 0, a = t < 0 || Object.is(t, -0) ? -s : s;
  return t * 60 + a;
}
function aa(n) {
  const e = Number(n);
  if (typeof n == "boolean" || n === "" || !Number.isFinite(e))
    throw new Ce(`Invalid unit value ${n}`);
  return e;
}
function rn(n, e) {
  const t = {};
  for (const s in n)
    if (Ot(n, s)) {
      const a = n[s];
      if (a == null) continue;
      t[e(s)] = aa(a);
    }
  return t;
}
function Ft(n, e) {
  const t = Math.trunc(Math.abs(n / 60)), s = Math.trunc(Math.abs(n % 60)), a = n >= 0 ? "+" : "-";
  switch (e) {
    case "short":
      return `${a}${Se(t, 2)}:${Se(s, 2)}`;
    case "narrow":
      return `${a}${t}${s > 0 ? `:${s}` : ""}`;
    case "techie":
      return `${a}${Se(t, 2)}${Se(s, 2)}`;
    default:
      throw new RangeError(`Value format ${e} is out of range for property format`);
  }
}
function fn(n) {
  return Ir(n, ["hour", "minute", "second", "millisecond"]);
}
const Vr = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
], ra = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
], Yr = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
function ia(n) {
  switch (n) {
    case "narrow":
      return [...Yr];
    case "short":
      return [...ra];
    case "long":
      return [...Vr];
    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    case "2-digit":
      return ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    default:
      return null;
  }
}
const oa = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
], la = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], Fr = ["M", "T", "W", "T", "F", "S", "S"];
function ua(n) {
  switch (n) {
    case "narrow":
      return [...Fr];
    case "short":
      return [...la];
    case "long":
      return [...oa];
    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7"];
    default:
      return null;
  }
}
const ca = ["AM", "PM"], Wr = ["Before Christ", "Anno Domini"], Lr = ["BC", "AD"], Ar = ["B", "A"];
function da(n) {
  switch (n) {
    case "narrow":
      return [...Ar];
    case "short":
      return [...Lr];
    case "long":
      return [...Wr];
    default:
      return null;
  }
}
function Hr(n) {
  return ca[n.hour < 12 ? 0 : 1];
}
function Rr(n, e) {
  return ua(e)[n.weekday - 1];
}
function Pr(n, e) {
  return ia(e)[n.month - 1];
}
function Zr(n, e) {
  return da(e)[n.year < 0 ? 0 : 1];
}
function jr(n, e, t = "always", s = !1) {
  const a = {
    years: ["year", "yr."],
    quarters: ["quarter", "qtr."],
    months: ["month", "mo."],
    weeks: ["week", "wk."],
    days: ["day", "day", "days"],
    hours: ["hour", "hr."],
    minutes: ["minute", "min."],
    seconds: ["second", "sec."]
  }, r = ["hours", "minutes", "seconds"].indexOf(n) === -1;
  if (t === "auto" && r) {
    const f = n === "days";
    switch (e) {
      case 1:
        return f ? "tomorrow" : `next ${a[n][0]}`;
      case -1:
        return f ? "yesterday" : `last ${a[n][0]}`;
      case 0:
        return f ? "today" : `this ${a[n][0]}`;
    }
  }
  const l = Object.is(e, -0) || e < 0, i = Math.abs(e), c = i === 1, w = a[n], v = s ? c ? w[1] : w[2] || w[1] : c ? a[n][0] : n;
  return l ? `${i} ${v} ago` : `in ${i} ${v}`;
}
function ds(n, e) {
  let t = "";
  for (const s of n)
    s.literal ? t += s.val : t += e(s.val);
  return t;
}
const xr = {
  D: nn,
  DD: Es,
  DDD: Cs,
  DDDD: _s,
  t: Ns,
  tt: Is,
  ttt: zs,
  tttt: Vs,
  T: Ys,
  TT: Fs,
  TTT: Ws,
  TTTT: Ls,
  f: As,
  ff: Rs,
  fff: Zs,
  ffff: xs,
  F: Hs,
  FF: Ps,
  FFF: js,
  FFFF: Bs
};
class _e {
  static create(e, t = {}) {
    return new _e(e, t);
  }
  static parseFormat(e) {
    let t = null, s = "", a = !1;
    const r = [];
    for (let l = 0; l < e.length; l++) {
      const i = e.charAt(l);
      i === "'" ? ((s.length > 0 || a) && r.push({
        literal: a || /^\s+$/.test(s),
        val: s === "" ? "'" : s
      }), t = null, s = "", a = !a) : a || i === t ? s += i : (s.length > 0 && r.push({ literal: /^\s+$/.test(s), val: s }), s = i, t = i);
    }
    return s.length > 0 && r.push({ literal: a || /^\s+$/.test(s), val: s }), r;
  }
  static macroTokenToFormatOpts(e) {
    return xr[e];
  }
  constructor(e, t) {
    this.opts = t, this.loc = e, this.systemLoc = null;
  }
  formatWithSystemDefault(e, t) {
    return this.systemLoc === null && (this.systemLoc = this.loc.redefaultToSystem()), this.systemLoc.dtFormatter(e, { ...this.opts, ...t }).format();
  }
  dtFormatter(e, t = {}) {
    return this.loc.dtFormatter(e, { ...this.opts, ...t });
  }
  formatDateTime(e, t) {
    return this.dtFormatter(e, t).format();
  }
  formatDateTimeParts(e, t) {
    return this.dtFormatter(e, t).formatToParts();
  }
  formatInterval(e, t) {
    return this.dtFormatter(e.start, t).dtf.formatRange(e.start.toJSDate(), e.end.toJSDate());
  }
  resolvedOptions(e, t) {
    return this.dtFormatter(e, t).resolvedOptions();
  }
  num(e, t = 0, s = void 0) {
    if (this.opts.forceSimple)
      return Se(e, t);
    const a = { ...this.opts };
    return t > 0 && (a.padTo = t), s && (a.signDisplay = s), this.loc.numberFormatter(a).format(e);
  }
  formatDateTimeFromString(e, t) {
    const s = this.loc.listingMode() === "en", a = this.loc.outputCalendar && this.loc.outputCalendar !== "gregory", r = (k, g) => this.loc.extract(e, k, g), l = (k) => e.isOffsetFixed && e.offset === 0 && k.allowZ ? "Z" : e.isValid ? e.zone.formatOffset(e.ts, k.format) : "", i = () => s ? Hr(e) : r({ hour: "numeric", hourCycle: "h12" }, "dayperiod"), c = (k, g) => s ? Pr(e, k) : r(g ? { month: k } : { month: k, day: "numeric" }, "month"), w = (k, g) => s ? Rr(e, k) : r(
      g ? { weekday: k } : { weekday: k, month: "long", day: "numeric" },
      "weekday"
    ), v = (k) => {
      const g = _e.macroTokenToFormatOpts(k);
      return g ? this.formatWithSystemDefault(e, g) : k;
    }, f = (k) => s ? Zr(e, k) : r({ era: k }, "era"), E = (k) => {
      switch (k) {
        // ms
        case "S":
          return this.num(e.millisecond);
        case "u":
        // falls through
        case "SSS":
          return this.num(e.millisecond, 3);
        // seconds
        case "s":
          return this.num(e.second);
        case "ss":
          return this.num(e.second, 2);
        // fractional seconds
        case "uu":
          return this.num(Math.floor(e.millisecond / 10), 2);
        case "uuu":
          return this.num(Math.floor(e.millisecond / 100));
        // minutes
        case "m":
          return this.num(e.minute);
        case "mm":
          return this.num(e.minute, 2);
        // hours
        case "h":
          return this.num(e.hour % 12 === 0 ? 12 : e.hour % 12);
        case "hh":
          return this.num(e.hour % 12 === 0 ? 12 : e.hour % 12, 2);
        case "H":
          return this.num(e.hour);
        case "HH":
          return this.num(e.hour, 2);
        // offset
        case "Z":
          return l({ format: "narrow", allowZ: this.opts.allowZ });
        case "ZZ":
          return l({ format: "short", allowZ: this.opts.allowZ });
        case "ZZZ":
          return l({ format: "techie", allowZ: this.opts.allowZ });
        case "ZZZZ":
          return e.zone.offsetName(e.ts, { format: "short", locale: this.loc.locale });
        case "ZZZZZ":
          return e.zone.offsetName(e.ts, { format: "long", locale: this.loc.locale });
        // zone
        case "z":
          return e.zoneName;
        // meridiems
        case "a":
          return i();
        // dates
        case "d":
          return a ? r({ day: "numeric" }, "day") : this.num(e.day);
        case "dd":
          return a ? r({ day: "2-digit" }, "day") : this.num(e.day, 2);
        // weekdays - standalone
        case "c":
          return this.num(e.weekday);
        case "ccc":
          return w("short", !0);
        case "cccc":
          return w("long", !0);
        case "ccccc":
          return w("narrow", !0);
        // weekdays - format
        case "E":
          return this.num(e.weekday);
        case "EEE":
          return w("short", !1);
        case "EEEE":
          return w("long", !1);
        case "EEEEE":
          return w("narrow", !1);
        // months - standalone
        case "L":
          return a ? r({ month: "numeric", day: "numeric" }, "month") : this.num(e.month);
        case "LL":
          return a ? r({ month: "2-digit", day: "numeric" }, "month") : this.num(e.month, 2);
        case "LLL":
          return c("short", !0);
        case "LLLL":
          return c("long", !0);
        case "LLLLL":
          return c("narrow", !0);
        // months - format
        case "M":
          return a ? r({ month: "numeric" }, "month") : this.num(e.month);
        case "MM":
          return a ? r({ month: "2-digit" }, "month") : this.num(e.month, 2);
        case "MMM":
          return c("short", !1);
        case "MMMM":
          return c("long", !1);
        case "MMMMM":
          return c("narrow", !1);
        // years
        case "y":
          return a ? r({ year: "numeric" }, "year") : this.num(e.year);
        case "yy":
          return a ? r({ year: "2-digit" }, "year") : this.num(e.year.toString().slice(-2), 2);
        case "yyyy":
          return a ? r({ year: "numeric" }, "year") : this.num(e.year, 4);
        case "yyyyyy":
          return a ? r({ year: "numeric" }, "year") : this.num(e.year, 6);
        // eras
        case "G":
          return f("short");
        case "GG":
          return f("long");
        case "GGGGG":
          return f("narrow");
        case "kk":
          return this.num(e.weekYear.toString().slice(-2), 2);
        case "kkkk":
          return this.num(e.weekYear, 4);
        case "W":
          return this.num(e.weekNumber);
        case "WW":
          return this.num(e.weekNumber, 2);
        case "n":
          return this.num(e.localWeekNumber);
        case "nn":
          return this.num(e.localWeekNumber, 2);
        case "ii":
          return this.num(e.localWeekYear.toString().slice(-2), 2);
        case "iiii":
          return this.num(e.localWeekYear, 4);
        case "o":
          return this.num(e.ordinal);
        case "ooo":
          return this.num(e.ordinal, 3);
        case "q":
          return this.num(e.quarter);
        case "qq":
          return this.num(e.quarter, 2);
        case "X":
          return this.num(Math.floor(e.ts / 1e3));
        case "x":
          return this.num(e.ts);
        default:
          return v(k);
      }
    };
    return ds(_e.parseFormat(t), E);
  }
  formatDurationFromString(e, t) {
    const s = this.opts.signMode === "negativeLargestOnly" ? -1 : 1, a = (v) => {
      switch (v[0]) {
        case "S":
          return "milliseconds";
        case "s":
          return "seconds";
        case "m":
          return "minutes";
        case "h":
          return "hours";
        case "d":
          return "days";
        case "w":
          return "weeks";
        case "M":
          return "months";
        case "y":
          return "years";
        default:
          return null;
      }
    }, r = (v, f) => (E) => {
      const k = a(E);
      if (k) {
        const g = f.isNegativeDuration && k !== f.largestUnit ? s : 1;
        let p;
        return this.opts.signMode === "negativeLargestOnly" && k !== f.largestUnit ? p = "never" : this.opts.signMode === "all" ? p = "always" : p = "auto", this.num(v.get(k) * g, E.length, p);
      } else
        return E;
    }, l = _e.parseFormat(t), i = l.reduce(
      (v, { literal: f, val: E }) => f ? v : v.concat(E),
      []
    ), c = e.shiftTo(...i.map(a).filter((v) => v)), w = {
      isNegativeDuration: c < 0,
      // this relies on "collapsed" being based on "shiftTo", which builds up the object
      // in order
      largestUnit: Object.keys(c.values)[0]
    };
    return ds(l, r(c, w));
  }
}
const fa = /[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;
function Et(...n) {
  const e = n.reduce((t, s) => t + s.source, "");
  return RegExp(`^${e}$`);
}
function Ct(...n) {
  return (e) => n.reduce(
    ([t, s, a], r) => {
      const [l, i, c] = r(e, a);
      return [{ ...t, ...l }, i || s, c];
    },
    [{}, null, 1]
  ).slice(0, 2);
}
function _t(n, ...e) {
  if (n == null)
    return [null, null];
  for (const [t, s] of e) {
    const a = t.exec(n);
    if (a)
      return s(a);
  }
  return [null, null];
}
function ha(...n) {
  return (e, t) => {
    const s = {};
    let a;
    for (a = 0; a < n.length; a++)
      s[n[a]] = rt(e[t + a]);
    return [s, null, t + a];
  };
}
const ma = /(?:([Zz])|([+-]\d\d)(?::?(\d\d))?)/, Br = `(?:${ma.source}?(?:\\[(${fa.source})\\])?)?`, Rn = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/, va = RegExp(`${Rn.source}${Br}`), Pn = RegExp(`(?:[Tt]${va.source})?`), qr = /([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/, Ur = /(\d{4})-?W(\d\d)(?:-?(\d))?/, Jr = /(\d{4})-?(\d{3})/, Xr = ha("weekYear", "weekNumber", "weekDay"), Gr = ha("year", "ordinal"), Qr = /(\d{4})-(\d\d)-(\d\d)/, ya = RegExp(
  `${Rn.source} ?(?:${ma.source}|(${fa.source}))?`
), Kr = RegExp(`(?: ${ya.source})?`);
function St(n, e, t) {
  const s = n[e];
  return G(s) ? t : rt(s);
}
function ei(n, e) {
  return [{
    year: St(n, e),
    month: St(n, e + 1, 1),
    day: St(n, e + 2, 1)
  }, null, e + 3];
}
function Nt(n, e) {
  return [{
    hours: St(n, e, 0),
    minutes: St(n, e + 1, 0),
    seconds: St(n, e + 2, 0),
    milliseconds: An(n[e + 3])
  }, null, e + 4];
}
function Ht(n, e) {
  const t = !n[e] && !n[e + 1], s = dn(n[e + 1], n[e + 2]), a = t ? null : Ie.instance(s);
  return [{}, a, e + 3];
}
function Rt(n, e) {
  const t = n[e] ? st.create(n[e]) : null;
  return [{}, t, e + 1];
}
const ti = RegExp(`^T?${Rn.source}$`), ni = /^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;
function si(n) {
  const [e, t, s, a, r, l, i, c, w] = n, v = e[0] === "-", f = c && c[0] === "-", E = (k, g = !1) => k !== void 0 && (g || k && v) ? -k : k;
  return [
    {
      years: E(dt(t)),
      months: E(dt(s)),
      weeks: E(dt(a)),
      days: E(dt(r)),
      hours: E(dt(l)),
      minutes: E(dt(i)),
      seconds: E(dt(c), c === "-0"),
      milliseconds: E(An(w), f)
    }
  ];
}
const ai = {
  GMT: 0,
  EDT: -240,
  EST: -300,
  CDT: -300,
  CST: -360,
  MDT: -360,
  MST: -420,
  PDT: -420,
  PST: -480
};
function Zn(n, e, t, s, a, r, l) {
  const i = {
    year: e.length === 2 ? In(rt(e)) : rt(e),
    month: ra.indexOf(t) + 1,
    day: rt(s),
    hour: rt(a),
    minute: rt(r)
  };
  return l && (i.second = rt(l)), n && (i.weekday = n.length > 3 ? oa.indexOf(n) + 1 : la.indexOf(n) + 1), i;
}
const ri = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;
function ii(n) {
  const [
    ,
    e,
    t,
    s,
    a,
    r,
    l,
    i,
    c,
    w,
    v,
    f
  ] = n, E = Zn(e, a, s, t, r, l, i);
  let k;
  return c ? k = ai[c] : w ? k = 0 : k = dn(v, f), [E, new Ie(k)];
}
function oi(n) {
  return n.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").trim();
}
const li = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/, ui = /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/, ci = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;
function fs(n) {
  const [, e, t, s, a, r, l, i] = n;
  return [Zn(e, a, s, t, r, l, i), Ie.utcInstance];
}
function di(n) {
  const [, e, t, s, a, r, l, i] = n;
  return [Zn(e, i, t, s, a, r, l), Ie.utcInstance];
}
const fi = Et(qr, Pn), hi = Et(Ur, Pn), mi = Et(Jr, Pn), vi = Et(va), ga = Ct(
  ei,
  Nt,
  Ht,
  Rt
), yi = Ct(
  Xr,
  Nt,
  Ht,
  Rt
), gi = Ct(
  Gr,
  Nt,
  Ht,
  Rt
), wi = Ct(
  Nt,
  Ht,
  Rt
);
function Di(n) {
  return _t(
    n,
    [fi, ga],
    [hi, yi],
    [mi, gi],
    [vi, wi]
  );
}
function pi(n) {
  return _t(oi(n), [ri, ii]);
}
function ki(n) {
  return _t(
    n,
    [li, fs],
    [ui, fs],
    [ci, di]
  );
}
function Ti(n) {
  return _t(n, [ni, si]);
}
const Mi = Ct(Nt);
function Si(n) {
  return _t(n, [ti, Mi]);
}
const bi = Et(Qr, Kr), Oi = Et(ya), $i = Ct(
  Nt,
  Ht,
  Rt
);
function Ei(n) {
  return _t(
    n,
    [bi, ga],
    [Oi, $i]
  );
}
const hs = "Invalid Duration", wa = {
  weeks: {
    days: 7,
    hours: 168,
    minutes: 10080,
    seconds: 10080 * 60,
    milliseconds: 10080 * 60 * 1e3
  },
  days: {
    hours: 24,
    minutes: 1440,
    seconds: 1440 * 60,
    milliseconds: 1440 * 60 * 1e3
  },
  hours: { minutes: 60, seconds: 3600, milliseconds: 3600 * 1e3 },
  minutes: { seconds: 60, milliseconds: 60 * 1e3 },
  seconds: { milliseconds: 1e3 }
}, Ci = {
  years: {
    quarters: 4,
    months: 12,
    weeks: 52,
    days: 365,
    hours: 365 * 24,
    minutes: 365 * 24 * 60,
    seconds: 365 * 24 * 60 * 60,
    milliseconds: 365 * 24 * 60 * 60 * 1e3
  },
  quarters: {
    months: 3,
    weeks: 13,
    days: 91,
    hours: 2184,
    minutes: 2184 * 60,
    seconds: 2184 * 60 * 60,
    milliseconds: 2184 * 60 * 60 * 1e3
  },
  months: {
    weeks: 4,
    days: 30,
    hours: 720,
    minutes: 720 * 60,
    seconds: 720 * 60 * 60,
    milliseconds: 720 * 60 * 60 * 1e3
  },
  ...wa
}, Le = 146097 / 400, Dt = 146097 / 4800, _i = {
  years: {
    quarters: 4,
    months: 12,
    weeks: Le / 7,
    days: Le,
    hours: Le * 24,
    minutes: Le * 24 * 60,
    seconds: Le * 24 * 60 * 60,
    milliseconds: Le * 24 * 60 * 60 * 1e3
  },
  quarters: {
    months: 3,
    weeks: Le / 28,
    days: Le / 4,
    hours: Le * 24 / 4,
    minutes: Le * 24 * 60 / 4,
    seconds: Le * 24 * 60 * 60 / 4,
    milliseconds: Le * 24 * 60 * 60 * 1e3 / 4
  },
  months: {
    weeks: Dt / 7,
    days: Dt,
    hours: Dt * 24,
    minutes: Dt * 24 * 60,
    seconds: Dt * 24 * 60 * 60,
    milliseconds: Dt * 24 * 60 * 60 * 1e3
  },
  ...wa
}, vt = [
  "years",
  "quarters",
  "months",
  "weeks",
  "days",
  "hours",
  "minutes",
  "seconds",
  "milliseconds"
], Ni = vt.slice(0).reverse();
function tt(n, e, t = !1) {
  const s = {
    values: t ? e.values : { ...n.values, ...e.values || {} },
    loc: n.loc.clone(e.loc),
    conversionAccuracy: e.conversionAccuracy || n.conversionAccuracy,
    matrix: e.matrix || n.matrix
  };
  return new ce(s);
}
function Da(n, e) {
  let t = e.milliseconds ?? 0;
  for (const s of Ni.slice(1))
    e[s] && (t += e[s] * n[s].milliseconds);
  return t;
}
function ms(n, e) {
  const t = Da(n, e) < 0 ? -1 : 1;
  vt.reduceRight((s, a) => {
    if (G(e[a]))
      return s;
    if (s) {
      const r = e[s] * t, l = n[a][s], i = Math.floor(r / l);
      e[a] += i * t, e[s] -= i * l * t;
    }
    return a;
  }, null), vt.reduce((s, a) => {
    if (G(e[a]))
      return s;
    if (s) {
      const r = e[s] % 1;
      e[s] -= r, e[a] += r * n[s][a];
    }
    return a;
  }, null);
}
function vs(n) {
  const e = {};
  for (const [t, s] of Object.entries(n))
    s !== 0 && (e[t] = s);
  return e;
}
class ce {
  /**
   * @private
   */
  constructor(e) {
    const t = e.conversionAccuracy === "longterm" || !1;
    let s = t ? _i : Ci;
    e.matrix && (s = e.matrix), this.values = e.values, this.loc = e.loc || fe.create(), this.conversionAccuracy = t ? "longterm" : "casual", this.invalid = e.invalid || null, this.matrix = s, this.isLuxonDuration = !0;
  }
  /**
   * Create Duration from a number of milliseconds.
   * @param {number} count of milliseconds
   * @param {Object} opts - options for parsing
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @return {Duration}
   */
  static fromMillis(e, t) {
    return ce.fromObject({ milliseconds: e }, t);
  }
  /**
   * Create a Duration from a JavaScript object with keys like 'years' and 'hours'.
   * If this object is empty then a zero milliseconds duration is returned.
   * @param {Object} obj - the object to create the DateTime from
   * @param {number} obj.years
   * @param {number} obj.quarters
   * @param {number} obj.months
   * @param {number} obj.weeks
   * @param {number} obj.days
   * @param {number} obj.hours
   * @param {number} obj.minutes
   * @param {number} obj.seconds
   * @param {number} obj.milliseconds
   * @param {Object} [opts=[]] - options for creating this Duration
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the preset conversion system to use
   * @param {string} [opts.matrix=Object] - the custom conversion system to use
   * @return {Duration}
   */
  static fromObject(e, t = {}) {
    if (e == null || typeof e != "object")
      throw new Ce(
        `Duration.fromObject: argument expected to be an object, got ${e === null ? "null" : typeof e}`
      );
    return new ce({
      values: rn(e, ce.normalizeUnit),
      loc: fe.fromObject(t),
      conversionAccuracy: t.conversionAccuracy,
      matrix: t.matrix
    });
  }
  /**
   * Create a Duration from DurationLike.
   *
   * @param {Object | number | Duration} durationLike
   * One of:
   * - object with keys like 'years' and 'hours'.
   * - number representing milliseconds
   * - Duration instance
   * @return {Duration}
   */
  static fromDurationLike(e) {
    if (ut(e))
      return ce.fromMillis(e);
    if (ce.isDuration(e))
      return e;
    if (typeof e == "object")
      return ce.fromObject(e);
    throw new Ce(
      `Unknown duration argument ${e} of type ${typeof e}`
    );
  }
  /**
   * Create a Duration from an ISO 8601 duration string.
   * @param {string} text - text to parse
   * @param {Object} opts - options for parsing
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the preset conversion system to use
   * @param {string} [opts.matrix=Object] - the preset conversion system to use
   * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
   * @example Duration.fromISO('P3Y6M1W4DT12H30M5S').toObject() //=> { years: 3, months: 6, weeks: 1, days: 4, hours: 12, minutes: 30, seconds: 5 }
   * @example Duration.fromISO('PT23H').toObject() //=> { hours: 23 }
   * @example Duration.fromISO('P5Y3M').toObject() //=> { years: 5, months: 3 }
   * @return {Duration}
   */
  static fromISO(e, t) {
    const [s] = Ti(e);
    return s ? ce.fromObject(s, t) : ce.invalid("unparsable", `the input "${e}" can't be parsed as ISO 8601`);
  }
  /**
   * Create a Duration from an ISO 8601 time string.
   * @param {string} text - text to parse
   * @param {Object} opts - options for parsing
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the preset conversion system to use
   * @param {string} [opts.matrix=Object] - the conversion system to use
   * @see https://en.wikipedia.org/wiki/ISO_8601#Times
   * @example Duration.fromISOTime('11:22:33.444').toObject() //=> { hours: 11, minutes: 22, seconds: 33, milliseconds: 444 }
   * @example Duration.fromISOTime('11:00').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @example Duration.fromISOTime('T11:00').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @example Duration.fromISOTime('1100').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @example Duration.fromISOTime('T1100').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @return {Duration}
   */
  static fromISOTime(e, t) {
    const [s] = Si(e);
    return s ? ce.fromObject(s, t) : ce.invalid("unparsable", `the input "${e}" can't be parsed as ISO 8601`);
  }
  /**
   * Create an invalid Duration.
   * @param {string} reason - simple string of why this datetime is invalid. Should not contain parameters or anything else data-dependent
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {Duration}
   */
  static invalid(e, t = null) {
    if (!e)
      throw new Ce("need to specify a reason the Duration is invalid");
    const s = e instanceof Ue ? e : new Ue(e, t);
    if (Te.throwOnInvalid)
      throw new sr(s);
    return new ce({ invalid: s });
  }
  /**
   * @private
   */
  static normalizeUnit(e) {
    const t = {
      year: "years",
      years: "years",
      quarter: "quarters",
      quarters: "quarters",
      month: "months",
      months: "months",
      week: "weeks",
      weeks: "weeks",
      day: "days",
      days: "days",
      hour: "hours",
      hours: "hours",
      minute: "minutes",
      minutes: "minutes",
      second: "seconds",
      seconds: "seconds",
      millisecond: "milliseconds",
      milliseconds: "milliseconds"
    }[e && e.toLowerCase()];
    if (!t) throw new $s(e);
    return t;
  }
  /**
   * Check if an object is a Duration. Works across context boundaries
   * @param {object} o
   * @return {boolean}
   */
  static isDuration(e) {
    return e && e.isLuxonDuration || !1;
  }
  /**
   * Get  the locale of a Duration, such 'en-GB'
   * @type {string}
   */
  get locale() {
    return this.isValid ? this.loc.locale : null;
  }
  /**
   * Get the numbering system of a Duration, such 'beng'. The numbering system is used when formatting the Duration
   *
   * @type {string}
   */
  get numberingSystem() {
    return this.isValid ? this.loc.numberingSystem : null;
  }
  /**
   * Returns a string representation of this Duration formatted according to the specified format string. You may use these tokens:
   * * `S` for milliseconds
   * * `s` for seconds
   * * `m` for minutes
   * * `h` for hours
   * * `d` for days
   * * `w` for weeks
   * * `M` for months
   * * `y` for years
   * Notes:
   * * Add padding by repeating the token, e.g. "yy" pads the years to two digits, "hhhh" pads the hours out to four digits
   * * Tokens can be escaped by wrapping with single quotes.
   * * The duration will be converted to the set of units in the format string using {@link Duration#shiftTo} and the Durations's conversion accuracy setting.
   * @param {string} fmt - the format string
   * @param {Object} opts - options
   * @param {boolean} [opts.floor=true] - floor numerical values
   * @param {'negative'|'all'|'negativeLargestOnly'} [opts.signMode=negative] - How to handle signs
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("y d s") //=> "1 6 2"
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("yy dd sss") //=> "01 06 002"
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("M S") //=> "12 518402000"
   * @example Duration.fromObject({ days: 6, seconds: 2 }).toFormat("d s", { signMode: "all" }) //=> "+6 +2"
   * @example Duration.fromObject({ days: -6, seconds: -2 }).toFormat("d s", { signMode: "all" }) //=> "-6 -2"
   * @example Duration.fromObject({ days: -6, seconds: -2 }).toFormat("d s", { signMode: "negativeLargestOnly" }) //=> "-6 2"
   * @return {string}
   */
  toFormat(e, t = {}) {
    const s = {
      ...t,
      floor: t.round !== !1 && t.floor !== !1
    };
    return this.isValid ? _e.create(this.loc, s).formatDurationFromString(this, e) : hs;
  }
  /**
   * Returns a string representation of a Duration with all units included.
   * To modify its behavior, use `listStyle` and any Intl.NumberFormat option, though `unitDisplay` is especially relevant.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options
   * @param {Object} opts - Formatting options. Accepts the same keys as the options parameter of the native `Intl.NumberFormat` constructor, as well as `listStyle`.
   * @param {string} [opts.listStyle='narrow'] - How to format the merged list. Corresponds to the `style` property of the options parameter of the native `Intl.ListFormat` constructor.
   * @param {boolean} [opts.showZeros=true] - Show all units previously used by the duration even if they are zero
   * @example
   * ```js
   * var dur = Duration.fromObject({ months: 1, weeks: 0, hours: 5, minutes: 6 })
   * dur.toHuman() //=> '1 month, 0 weeks, 5 hours, 6 minutes'
   * dur.toHuman({ listStyle: "long" }) //=> '1 month, 0 weeks, 5 hours, and 6 minutes'
   * dur.toHuman({ unitDisplay: "short" }) //=> '1 mth, 0 wks, 5 hr, 6 min'
   * dur.toHuman({ showZeros: false }) //=> '1 month, 5 hours, 6 minutes'
   * ```
   */
  toHuman(e = {}) {
    if (!this.isValid) return hs;
    const t = e.showZeros !== !1, s = vt.map((a) => {
      const r = this.values[a];
      return G(r) || r === 0 && !t ? null : this.loc.numberFormatter({ style: "unit", unitDisplay: "long", ...e, unit: a.slice(0, -1) }).format(r);
    }).filter((a) => a);
    return this.loc.listFormatter({ type: "conjunction", style: e.listStyle || "narrow", ...e }).format(s);
  }
  /**
   * Returns a JavaScript object with this Duration's values.
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toObject() //=> { years: 1, days: 6, seconds: 2 }
   * @return {Object}
   */
  toObject() {
    return this.isValid ? { ...this.values } : {};
  }
  /**
   * Returns an ISO 8601-compliant string representation of this Duration.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
   * @example Duration.fromObject({ years: 3, seconds: 45 }).toISO() //=> 'P3YT45S'
   * @example Duration.fromObject({ months: 4, seconds: 45 }).toISO() //=> 'P4MT45S'
   * @example Duration.fromObject({ months: 5 }).toISO() //=> 'P5M'
   * @example Duration.fromObject({ minutes: 5 }).toISO() //=> 'PT5M'
   * @example Duration.fromObject({ milliseconds: 6 }).toISO() //=> 'PT0.006S'
   * @return {string}
   */
  toISO() {
    if (!this.isValid) return null;
    let e = "P";
    return this.years !== 0 && (e += this.years + "Y"), (this.months !== 0 || this.quarters !== 0) && (e += this.months + this.quarters * 3 + "M"), this.weeks !== 0 && (e += this.weeks + "W"), this.days !== 0 && (e += this.days + "D"), (this.hours !== 0 || this.minutes !== 0 || this.seconds !== 0 || this.milliseconds !== 0) && (e += "T"), this.hours !== 0 && (e += this.hours + "H"), this.minutes !== 0 && (e += this.minutes + "M"), (this.seconds !== 0 || this.milliseconds !== 0) && (e += Hn(this.seconds + this.milliseconds / 1e3, 3) + "S"), e === "P" && (e += "T0S"), e;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this Duration, formatted as a time of day.
   * Note that this will return null if the duration is invalid, negative, or equal to or greater than 24 hours.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Times
   * @param {Object} opts - options
   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
   * @param {boolean} [opts.includePrefix=false] - include the `T` prefix
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @example Duration.fromObject({ hours: 11 }).toISOTime() //=> '11:00:00.000'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ suppressMilliseconds: true }) //=> '11:00:00'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ suppressSeconds: true }) //=> '11:00'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ includePrefix: true }) //=> 'T11:00:00.000'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ format: 'basic' }) //=> '110000.000'
   * @return {string}
   */
  toISOTime(e = {}) {
    if (!this.isValid) return null;
    const t = this.toMillis();
    return t < 0 || t >= 864e5 ? null : (e = {
      suppressMilliseconds: !1,
      suppressSeconds: !1,
      includePrefix: !1,
      format: "extended",
      ...e,
      includeOffset: !1
    }, x.fromMillis(t, { zone: "UTC" }).toISOTime(e));
  }
  /**
   * Returns an ISO 8601 representation of this Duration appropriate for use in JSON.
   * @return {string}
   */
  toJSON() {
    return this.toISO();
  }
  /**
   * Returns an ISO 8601 representation of this Duration appropriate for use in debugging.
   * @return {string}
   */
  toString() {
    return this.toISO();
  }
  /**
   * Returns a string representation of this Duration appropriate for the REPL.
   * @return {string}
   */
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.isValid ? `Duration { values: ${JSON.stringify(this.values)} }` : `Duration { Invalid, reason: ${this.invalidReason} }`;
  }
  /**
   * Returns an milliseconds value of this Duration.
   * @return {number}
   */
  toMillis() {
    return this.isValid ? Da(this.matrix, this.values) : NaN;
  }
  /**
   * Returns an milliseconds value of this Duration. Alias of {@link toMillis}
   * @return {number}
   */
  valueOf() {
    return this.toMillis();
  }
  /**
   * Make this Duration longer by the specified amount. Return a newly-constructed Duration.
   * @param {Duration|Object|number} duration - The amount to add. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   * @return {Duration}
   */
  plus(e) {
    if (!this.isValid) return this;
    const t = ce.fromDurationLike(e), s = {};
    for (const a of vt)
      (Ot(t.values, a) || Ot(this.values, a)) && (s[a] = t.get(a) + this.get(a));
    return tt(this, { values: s }, !0);
  }
  /**
   * Make this Duration shorter by the specified amount. Return a newly-constructed Duration.
   * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   * @return {Duration}
   */
  minus(e) {
    if (!this.isValid) return this;
    const t = ce.fromDurationLike(e);
    return this.plus(t.negate());
  }
  /**
   * Scale this Duration by the specified amount. Return a newly-constructed Duration.
   * @param {function} fn - The function to apply to each unit. Arity is 1 or 2: the value of the unit and, optionally, the unit name. Must return a number.
   * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnits(x => x * 2) //=> { hours: 2, minutes: 60 }
   * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnits((x, u) => u === "hours" ? x * 2 : x) //=> { hours: 2, minutes: 30 }
   * @return {Duration}
   */
  mapUnits(e) {
    if (!this.isValid) return this;
    const t = {};
    for (const s of Object.keys(this.values))
      t[s] = aa(e(this.values[s], s));
    return tt(this, { values: t }, !0);
  }
  /**
   * Get the value of unit.
   * @param {string} unit - a unit such as 'minute' or 'day'
   * @example Duration.fromObject({years: 2, days: 3}).get('years') //=> 2
   * @example Duration.fromObject({years: 2, days: 3}).get('months') //=> 0
   * @example Duration.fromObject({years: 2, days: 3}).get('days') //=> 3
   * @return {number}
   */
  get(e) {
    return this[ce.normalizeUnit(e)];
  }
  /**
   * "Set" the values of specified units. Return a newly-constructed Duration.
   * @param {Object} values - a mapping of units to numbers
   * @example dur.set({ years: 2017 })
   * @example dur.set({ hours: 8, minutes: 30 })
   * @return {Duration}
   */
  set(e) {
    if (!this.isValid) return this;
    const t = { ...this.values, ...rn(e, ce.normalizeUnit) };
    return tt(this, { values: t });
  }
  /**
   * "Set" the locale and/or numberingSystem.  Returns a newly-constructed Duration.
   * @example dur.reconfigure({ locale: 'en-GB' })
   * @return {Duration}
   */
  reconfigure({ locale: e, numberingSystem: t, conversionAccuracy: s, matrix: a } = {}) {
    const l = { loc: this.loc.clone({ locale: e, numberingSystem: t }), matrix: a, conversionAccuracy: s };
    return tt(this, l);
  }
  /**
   * Return the length of the duration in the specified unit.
   * @param {string} unit - a unit such as 'minutes' or 'days'
   * @example Duration.fromObject({years: 1}).as('days') //=> 365
   * @example Duration.fromObject({years: 1}).as('months') //=> 12
   * @example Duration.fromObject({hours: 60}).as('days') //=> 2.5
   * @return {number}
   */
  as(e) {
    return this.isValid ? this.shiftTo(e).get(e) : NaN;
  }
  /**
   * Reduce this Duration to its canonical representation in its current units.
   * Assuming the overall value of the Duration is positive, this means:
   * - excessive values for lower-order units are converted to higher-order units (if possible, see first and second example)
   * - negative lower-order units are converted to higher order units (there must be such a higher order unit, otherwise
   *   the overall value would be negative, see third example)
   * - fractional values for higher-order units are converted to lower-order units (if possible, see fourth example)
   *
   * If the overall value is negative, the result of this method is equivalent to `this.negate().normalize().negate()`.
   * @example Duration.fromObject({ years: 2, days: 5000 }).normalize().toObject() //=> { years: 15, days: 255 }
   * @example Duration.fromObject({ days: 5000 }).normalize().toObject() //=> { days: 5000 }
   * @example Duration.fromObject({ hours: 12, minutes: -45 }).normalize().toObject() //=> { hours: 11, minutes: 15 }
   * @example Duration.fromObject({ years: 2.5, days: 0, hours: 0 }).normalize().toObject() //=> { years: 2, days: 182, hours: 12 }
   * @return {Duration}
   */
  normalize() {
    if (!this.isValid) return this;
    const e = this.toObject();
    return ms(this.matrix, e), tt(this, { values: e }, !0);
  }
  /**
   * Rescale units to its largest representation
   * @example Duration.fromObject({ milliseconds: 90000 }).rescale().toObject() //=> { minutes: 1, seconds: 30 }
   * @return {Duration}
   */
  rescale() {
    if (!this.isValid) return this;
    const e = vs(this.normalize().shiftToAll().toObject());
    return tt(this, { values: e }, !0);
  }
  /**
   * Convert this Duration into its representation in a different set of units.
   * @example Duration.fromObject({ hours: 1, seconds: 30 }).shiftTo('minutes', 'milliseconds').toObject() //=> { minutes: 60, milliseconds: 30000 }
   * @return {Duration}
   */
  shiftTo(...e) {
    if (!this.isValid) return this;
    if (e.length === 0)
      return this;
    e = e.map((l) => ce.normalizeUnit(l));
    const t = {}, s = {}, a = this.toObject();
    let r;
    for (const l of vt)
      if (e.indexOf(l) >= 0) {
        r = l;
        let i = 0;
        for (const w in s)
          i += this.matrix[w][l] * s[w], s[w] = 0;
        ut(a[l]) && (i += a[l]);
        const c = Math.trunc(i);
        t[l] = c, s[l] = (i * 1e3 - c * 1e3) / 1e3;
      } else ut(a[l]) && (s[l] = a[l]);
    for (const l in s)
      s[l] !== 0 && (t[r] += l === r ? s[l] : s[l] / this.matrix[r][l]);
    return ms(this.matrix, t), tt(this, { values: t }, !0);
  }
  /**
   * Shift this Duration to all available units.
   * Same as shiftTo("years", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds")
   * @return {Duration}
   */
  shiftToAll() {
    return this.isValid ? this.shiftTo(
      "years",
      "months",
      "weeks",
      "days",
      "hours",
      "minutes",
      "seconds",
      "milliseconds"
    ) : this;
  }
  /**
   * Return the negative of this Duration.
   * @example Duration.fromObject({ hours: 1, seconds: 30 }).negate().toObject() //=> { hours: -1, seconds: -30 }
   * @return {Duration}
   */
  negate() {
    if (!this.isValid) return this;
    const e = {};
    for (const t of Object.keys(this.values))
      e[t] = this.values[t] === 0 ? 0 : -this.values[t];
    return tt(this, { values: e }, !0);
  }
  /**
   * Removes all units with values equal to 0 from this Duration.
   * @example Duration.fromObject({ years: 2, days: 0, hours: 0, minutes: 0 }).removeZeros().toObject() //=> { years: 2 }
   * @return {Duration}
   */
  removeZeros() {
    if (!this.isValid) return this;
    const e = vs(this.values);
    return tt(this, { values: e }, !0);
  }
  /**
   * Get the years.
   * @type {number}
   */
  get years() {
    return this.isValid ? this.values.years || 0 : NaN;
  }
  /**
   * Get the quarters.
   * @type {number}
   */
  get quarters() {
    return this.isValid ? this.values.quarters || 0 : NaN;
  }
  /**
   * Get the months.
   * @type {number}
   */
  get months() {
    return this.isValid ? this.values.months || 0 : NaN;
  }
  /**
   * Get the weeks
   * @type {number}
   */
  get weeks() {
    return this.isValid ? this.values.weeks || 0 : NaN;
  }
  /**
   * Get the days.
   * @type {number}
   */
  get days() {
    return this.isValid ? this.values.days || 0 : NaN;
  }
  /**
   * Get the hours.
   * @type {number}
   */
  get hours() {
    return this.isValid ? this.values.hours || 0 : NaN;
  }
  /**
   * Get the minutes.
   * @type {number}
   */
  get minutes() {
    return this.isValid ? this.values.minutes || 0 : NaN;
  }
  /**
   * Get the seconds.
   * @return {number}
   */
  get seconds() {
    return this.isValid ? this.values.seconds || 0 : NaN;
  }
  /**
   * Get the milliseconds.
   * @return {number}
   */
  get milliseconds() {
    return this.isValid ? this.values.milliseconds || 0 : NaN;
  }
  /**
   * Returns whether the Duration is invalid. Invalid durations are returned by diff operations
   * on invalid DateTimes or Intervals.
   * @return {boolean}
   */
  get isValid() {
    return this.invalid === null;
  }
  /**
   * Returns an error code if this Duration became invalid, or null if the Duration is valid
   * @return {string}
   */
  get invalidReason() {
    return this.invalid ? this.invalid.reason : null;
  }
  /**
   * Returns an explanation of why this Duration became invalid, or null if the Duration is valid
   * @type {string}
   */
  get invalidExplanation() {
    return this.invalid ? this.invalid.explanation : null;
  }
  /**
   * Equality check
   * Two Durations are equal iff they have the same units and the same values for each unit.
   * @param {Duration} other
   * @return {boolean}
   */
  equals(e) {
    if (!this.isValid || !e.isValid || !this.loc.equals(e.loc))
      return !1;
    function t(s, a) {
      return s === void 0 || s === 0 ? a === void 0 || a === 0 : s === a;
    }
    for (const s of vt)
      if (!t(this.values[s], e.values[s]))
        return !1;
    return !0;
  }
}
const pt = "Invalid Interval";
function Ii(n, e) {
  return !n || !n.isValid ? ke.invalid("missing or invalid start") : !e || !e.isValid ? ke.invalid("missing or invalid end") : e < n ? ke.invalid(
    "end before start",
    `The end of an interval must be after its start, but you had start=${n.toISO()} and end=${e.toISO()}`
  ) : null;
}
class ke {
  /**
   * @private
   */
  constructor(e) {
    this.s = e.start, this.e = e.end, this.invalid = e.invalid || null, this.isLuxonInterval = !0;
  }
  /**
   * Create an invalid Interval.
   * @param {string} reason - simple string of why this Interval is invalid. Should not contain parameters or anything else data-dependent
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {Interval}
   */
  static invalid(e, t = null) {
    if (!e)
      throw new Ce("need to specify a reason the Interval is invalid");
    const s = e instanceof Ue ? e : new Ue(e, t);
    if (Te.throwOnInvalid)
      throw new nr(s);
    return new ke({ invalid: s });
  }
  /**
   * Create an Interval from a start DateTime and an end DateTime. Inclusive of the start but not the end.
   * @param {DateTime|Date|Object} start
   * @param {DateTime|Date|Object} end
   * @return {Interval}
   */
  static fromDateTimes(e, t) {
    const s = It(e), a = It(t), r = Ii(s, a);
    return r ?? new ke({
      start: s,
      end: a
    });
  }
  /**
   * Create an Interval from a start DateTime and a Duration to extend to.
   * @param {DateTime|Date|Object} start
   * @param {Duration|Object|number} duration - the length of the Interval.
   * @return {Interval}
   */
  static after(e, t) {
    const s = ce.fromDurationLike(t), a = It(e);
    return ke.fromDateTimes(a, a.plus(s));
  }
  /**
   * Create an Interval from an end DateTime and a Duration to extend backwards to.
   * @param {DateTime|Date|Object} end
   * @param {Duration|Object|number} duration - the length of the Interval.
   * @return {Interval}
   */
  static before(e, t) {
    const s = ce.fromDurationLike(t), a = It(e);
    return ke.fromDateTimes(a.minus(s), a);
  }
  /**
   * Create an Interval from an ISO 8601 string.
   * Accepts `<start>/<end>`, `<start>/<duration>`, and `<duration>/<end>` formats.
   * @param {string} text - the ISO string to parse
   * @param {Object} [opts] - options to pass {@link DateTime#fromISO} and optionally {@link Duration#fromISO}
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @return {Interval}
   */
  static fromISO(e, t) {
    const [s, a] = (e || "").split("/", 2);
    if (s && a) {
      let r, l;
      try {
        r = x.fromISO(s, t), l = r.isValid;
      } catch {
        l = !1;
      }
      let i, c;
      try {
        i = x.fromISO(a, t), c = i.isValid;
      } catch {
        c = !1;
      }
      if (l && c)
        return ke.fromDateTimes(r, i);
      if (l) {
        const w = ce.fromISO(a, t);
        if (w.isValid)
          return ke.after(r, w);
      } else if (c) {
        const w = ce.fromISO(s, t);
        if (w.isValid)
          return ke.before(i, w);
      }
    }
    return ke.invalid("unparsable", `the input "${e}" can't be parsed as ISO 8601`);
  }
  /**
   * Check if an object is an Interval. Works across context boundaries
   * @param {object} o
   * @return {boolean}
   */
  static isInterval(e) {
    return e && e.isLuxonInterval || !1;
  }
  /**
   * Returns the start of the Interval
   * @type {DateTime}
   */
  get start() {
    return this.isValid ? this.s : null;
  }
  /**
   * Returns the end of the Interval. This is the first instant which is not part of the interval
   * (Interval is half-open).
   * @type {DateTime}
   */
  get end() {
    return this.isValid ? this.e : null;
  }
  /**
   * Returns the last DateTime included in the interval (since end is not part of the interval)
   * @type {DateTime}
   */
  get lastDateTime() {
    return this.isValid && this.e ? this.e.minus(1) : null;
  }
  /**
   * Returns whether this Interval's end is at least its start, meaning that the Interval isn't 'backwards'.
   * @type {boolean}
   */
  get isValid() {
    return this.invalidReason === null;
  }
  /**
   * Returns an error code if this Interval is invalid, or null if the Interval is valid
   * @type {string}
   */
  get invalidReason() {
    return this.invalid ? this.invalid.reason : null;
  }
  /**
   * Returns an explanation of why this Interval became invalid, or null if the Interval is valid
   * @type {string}
   */
  get invalidExplanation() {
    return this.invalid ? this.invalid.explanation : null;
  }
  /**
   * Returns the length of the Interval in the specified unit.
   * @param {string} unit - the unit (such as 'hours' or 'days') to return the length in.
   * @return {number}
   */
  length(e = "milliseconds") {
    return this.isValid ? this.toDuration(e).get(e) : NaN;
  }
  /**
   * Returns the count of minutes, hours, days, months, or years included in the Interval, even in part.
   * Unlike {@link Interval#length} this counts sections of the calendar, not periods of time, e.g. specifying 'day'
   * asks 'what dates are included in this interval?', not 'how many days long is this interval?'
   * @param {string} [unit='milliseconds'] - the unit of time to count.
   * @param {Object} opts - options
   * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week; this operation will always use the locale of the start DateTime
   * @return {number}
   */
  count(e = "milliseconds", t) {
    if (!this.isValid) return NaN;
    const s = this.start.startOf(e, t);
    let a;
    return t != null && t.useLocaleWeeks ? a = this.end.reconfigure({ locale: s.locale }) : a = this.end, a = a.startOf(e, t), Math.floor(a.diff(s, e).get(e)) + (a.valueOf() !== this.end.valueOf());
  }
  /**
   * Returns whether this Interval's start and end are both in the same unit of time
   * @param {string} unit - the unit of time to check sameness on
   * @return {boolean}
   */
  hasSame(e) {
    return this.isValid ? this.isEmpty() || this.e.minus(1).hasSame(this.s, e) : !1;
  }
  /**
   * Return whether this Interval has the same start and end DateTimes.
   * @return {boolean}
   */
  isEmpty() {
    return this.s.valueOf() === this.e.valueOf();
  }
  /**
   * Return whether this Interval's start is after the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  isAfter(e) {
    return this.isValid ? this.s > e : !1;
  }
  /**
   * Return whether this Interval's end is before the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  isBefore(e) {
    return this.isValid ? this.e <= e : !1;
  }
  /**
   * Return whether this Interval contains the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  contains(e) {
    return this.isValid ? this.s <= e && this.e > e : !1;
  }
  /**
   * "Sets" the start and/or end dates. Returns a newly-constructed Interval.
   * @param {Object} values - the values to set
   * @param {DateTime} values.start - the starting DateTime
   * @param {DateTime} values.end - the ending DateTime
   * @return {Interval}
   */
  set({ start: e, end: t } = {}) {
    return this.isValid ? ke.fromDateTimes(e || this.s, t || this.e) : this;
  }
  /**
   * Split this Interval at each of the specified DateTimes
   * @param {...DateTime} dateTimes - the unit of time to count.
   * @return {Array}
   */
  splitAt(...e) {
    if (!this.isValid) return [];
    const t = e.map(It).filter((l) => this.contains(l)).sort((l, i) => l.toMillis() - i.toMillis()), s = [];
    let { s: a } = this, r = 0;
    for (; a < this.e; ) {
      const l = t[r] || this.e, i = +l > +this.e ? this.e : l;
      s.push(ke.fromDateTimes(a, i)), a = i, r += 1;
    }
    return s;
  }
  /**
   * Split this Interval into smaller Intervals, each of the specified length.
   * Left over time is grouped into a smaller interval
   * @param {Duration|Object|number} duration - The length of each resulting interval.
   * @return {Array}
   */
  splitBy(e) {
    const t = ce.fromDurationLike(e);
    if (!this.isValid || !t.isValid || t.as("milliseconds") === 0)
      return [];
    let { s } = this, a = 1, r;
    const l = [];
    for (; s < this.e; ) {
      const i = this.start.plus(t.mapUnits((c) => c * a));
      r = +i > +this.e ? this.e : i, l.push(ke.fromDateTimes(s, r)), s = r, a += 1;
    }
    return l;
  }
  /**
   * Split this Interval into the specified number of smaller intervals.
   * @param {number} numberOfParts - The number of Intervals to divide the Interval into.
   * @return {Array}
   */
  divideEqually(e) {
    return this.isValid ? this.splitBy(this.length() / e).slice(0, e) : [];
  }
  /**
   * Return whether this Interval overlaps with the specified Interval
   * @param {Interval} other
   * @return {boolean}
   */
  overlaps(e) {
    return this.e > e.s && this.s < e.e;
  }
  /**
   * Return whether this Interval's end is adjacent to the specified Interval's start.
   * @param {Interval} other
   * @return {boolean}
   */
  abutsStart(e) {
    return this.isValid ? +this.e == +e.s : !1;
  }
  /**
   * Return whether this Interval's start is adjacent to the specified Interval's end.
   * @param {Interval} other
   * @return {boolean}
   */
  abutsEnd(e) {
    return this.isValid ? +e.e == +this.s : !1;
  }
  /**
   * Returns true if this Interval fully contains the specified Interval, specifically if the intersect (of this Interval and the other Interval) is equal to the other Interval; false otherwise.
   * @param {Interval} other
   * @return {boolean}
   */
  engulfs(e) {
    return this.isValid ? this.s <= e.s && this.e >= e.e : !1;
  }
  /**
   * Return whether this Interval has the same start and end as the specified Interval.
   * @param {Interval} other
   * @return {boolean}
   */
  equals(e) {
    return !this.isValid || !e.isValid ? !1 : this.s.equals(e.s) && this.e.equals(e.e);
  }
  /**
   * Return an Interval representing the intersection of this Interval and the specified Interval.
   * Specifically, the resulting Interval has the maximum start time and the minimum end time of the two Intervals.
   * Returns null if the intersection is empty, meaning, the intervals don't intersect.
   * @param {Interval} other
   * @return {Interval}
   */
  intersection(e) {
    if (!this.isValid) return this;
    const t = this.s > e.s ? this.s : e.s, s = this.e < e.e ? this.e : e.e;
    return t >= s ? null : ke.fromDateTimes(t, s);
  }
  /**
   * Return an Interval representing the union of this Interval and the specified Interval.
   * Specifically, the resulting Interval has the minimum start time and the maximum end time of the two Intervals.
   * @param {Interval} other
   * @return {Interval}
   */
  union(e) {
    if (!this.isValid) return this;
    const t = this.s < e.s ? this.s : e.s, s = this.e > e.e ? this.e : e.e;
    return ke.fromDateTimes(t, s);
  }
  /**
   * Merge an array of Intervals into an equivalent minimal set of Intervals.
   * Combines overlapping and adjacent Intervals.
   * The resulting array will contain the Intervals in ascending order, that is, starting with the earliest Interval
   * and ending with the latest.
   *
   * @param {Array} intervals
   * @return {Array}
   */
  static merge(e) {
    const [t, s] = e.sort((a, r) => a.s - r.s).reduce(
      ([a, r], l) => r ? r.overlaps(l) || r.abutsStart(l) ? [a, r.union(l)] : [a.concat([r]), l] : [a, l],
      [[], null]
    );
    return s && t.push(s), t;
  }
  /**
   * Return an array of Intervals representing the spans of time that only appear in one of the specified Intervals.
   * @param {Array} intervals
   * @return {Array}
   */
  static xor(e) {
    let t = null, s = 0;
    const a = [], r = e.map((c) => [
      { time: c.s, type: "s" },
      { time: c.e, type: "e" }
    ]), l = Array.prototype.concat(...r), i = l.sort((c, w) => c.time - w.time);
    for (const c of i)
      s += c.type === "s" ? 1 : -1, s === 1 ? t = c.time : (t && +t != +c.time && a.push(ke.fromDateTimes(t, c.time)), t = null);
    return ke.merge(a);
  }
  /**
   * Return an Interval representing the span of time in this Interval that doesn't overlap with any of the specified Intervals.
   * @param {...Interval} intervals
   * @return {Array}
   */
  difference(...e) {
    return ke.xor([this].concat(e)).map((t) => this.intersection(t)).filter((t) => t && !t.isEmpty());
  }
  /**
   * Returns a string representation of this Interval appropriate for debugging.
   * @return {string}
   */
  toString() {
    return this.isValid ? `[${this.s.toISO()} – ${this.e.toISO()})` : pt;
  }
  /**
   * Returns a string representation of this Interval appropriate for the REPL.
   * @return {string}
   */
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.isValid ? `Interval { start: ${this.s.toISO()}, end: ${this.e.toISO()} }` : `Interval { Invalid, reason: ${this.invalidReason} }`;
  }
  /**
   * Returns a localized string representing this Interval. Accepts the same options as the
   * Intl.DateTimeFormat constructor and any presets defined by Luxon, such as
   * {@link DateTime.DATE_FULL} or {@link DateTime.TIME_SIMPLE}. The exact behavior of this method
   * is browser-specific, but in general it will return an appropriate representation of the
   * Interval in the assigned locale. Defaults to the system's locale if no locale has been
   * specified.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param {Object} [formatOpts=DateTime.DATE_SHORT] - Either a DateTime preset or
   * Intl.DateTimeFormat constructor options.
   * @param {Object} opts - Options to override the configuration of the start DateTime.
   * @example Interval.fromISO('2022-11-07T09:00Z/2022-11-08T09:00Z').toLocaleString(); //=> 11/7/2022 – 11/8/2022
   * @example Interval.fromISO('2022-11-07T09:00Z/2022-11-08T09:00Z').toLocaleString(DateTime.DATE_FULL); //=> November 7 – 8, 2022
   * @example Interval.fromISO('2022-11-07T09:00Z/2022-11-08T09:00Z').toLocaleString(DateTime.DATE_FULL, { locale: 'fr-FR' }); //=> 7–8 novembre 2022
   * @example Interval.fromISO('2022-11-07T17:00Z/2022-11-07T19:00Z').toLocaleString(DateTime.TIME_SIMPLE); //=> 6:00 – 8:00 PM
   * @example Interval.fromISO('2022-11-07T17:00Z/2022-11-07T19:00Z').toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }); //=> Mon, Nov 07, 6:00 – 8:00 p
   * @return {string}
   */
  toLocaleString(e = nn, t = {}) {
    return this.isValid ? _e.create(this.s.loc.clone(t), e).formatInterval(this) : pt;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this Interval.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @param {Object} opts - The same options as {@link DateTime#toISO}
   * @return {string}
   */
  toISO(e) {
    return this.isValid ? `${this.s.toISO(e)}/${this.e.toISO(e)}` : pt;
  }
  /**
   * Returns an ISO 8601-compliant string representation of date of this Interval.
   * The time components are ignored.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @return {string}
   */
  toISODate() {
    return this.isValid ? `${this.s.toISODate()}/${this.e.toISODate()}` : pt;
  }
  /**
   * Returns an ISO 8601-compliant string representation of time of this Interval.
   * The date components are ignored.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @param {Object} opts - The same options as {@link DateTime#toISO}
   * @return {string}
   */
  toISOTime(e) {
    return this.isValid ? `${this.s.toISOTime(e)}/${this.e.toISOTime(e)}` : pt;
  }
  /**
   * Returns a string representation of this Interval formatted according to the specified format
   * string. **You may not want this.** See {@link Interval#toLocaleString} for a more flexible
   * formatting tool.
   * @param {string} dateFormat - The format string. This string formats the start and end time.
   * See {@link DateTime#toFormat} for details.
   * @param {Object} opts - Options.
   * @param {string} [opts.separator =  ' – '] - A separator to place between the start and end
   * representations.
   * @return {string}
   */
  toFormat(e, { separator: t = " – " } = {}) {
    return this.isValid ? `${this.s.toFormat(e)}${t}${this.e.toFormat(e)}` : pt;
  }
  /**
   * Return a Duration representing the time spanned by this interval.
   * @param {string|string[]} [unit=['milliseconds']] - the unit or units (such as 'hours' or 'days') to include in the duration.
   * @param {Object} opts - options that affect the creation of the Duration
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @example Interval.fromDateTimes(dt1, dt2).toDuration().toObject() //=> { milliseconds: 88489257 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration('days').toObject() //=> { days: 1.0241812152777778 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes']).toObject() //=> { hours: 24, minutes: 34.82095 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes', 'seconds']).toObject() //=> { hours: 24, minutes: 34, seconds: 49.257 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration('seconds').toObject() //=> { seconds: 88489.257 }
   * @return {Duration}
   */
  toDuration(e, t) {
    return this.isValid ? this.e.diff(this.s, e, t) : ce.invalid(this.invalidReason);
  }
  /**
   * Run mapFn on the interval start and end, returning a new Interval from the resulting DateTimes
   * @param {function} mapFn
   * @return {Interval}
   * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.toUTC())
   * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.plus({ hours: 2 }))
   */
  mapEndpoints(e) {
    return ke.fromDateTimes(e(this.s), e(this.e));
  }
}
class xt {
  /**
   * Return whether the specified zone contains a DST.
   * @param {string|Zone} [zone='local'] - Zone to check. Defaults to the environment's local zone.
   * @return {boolean}
   */
  static hasDST(e = Te.defaultZone) {
    const t = x.now().setZone(e).set({ month: 12 });
    return !e.isUniversal && t.offset !== t.set({ month: 6 }).offset;
  }
  /**
   * Return whether the specified zone is a valid IANA specifier.
   * @param {string} zone - Zone to check
   * @return {boolean}
   */
  static isValidIANAZone(e) {
    return st.isValidZone(e);
  }
  /**
   * Converts the input into a {@link Zone} instance.
   *
   * * If `input` is already a Zone instance, it is returned unchanged.
   * * If `input` is a string containing a valid time zone name, a Zone instance
   *   with that name is returned.
   * * If `input` is a string that doesn't refer to a known time zone, a Zone
   *   instance with {@link Zone#isValid} == false is returned.
   * * If `input is a number, a Zone instance with the specified fixed offset
   *   in minutes is returned.
   * * If `input` is `null` or `undefined`, the default zone is returned.
   * @param {string|Zone|number} [input] - the value to be converted
   * @return {Zone}
   */
  static normalizeZone(e) {
    return it(e, Te.defaultZone);
  }
  /**
   * Get the weekday on which the week starts according to the given locale.
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @returns {number} the start of the week, 1 for Monday through 7 for Sunday
   */
  static getStartOfWeek({ locale: e = null, locObj: t = null } = {}) {
    return (t || fe.create(e)).getStartOfWeek();
  }
  /**
   * Get the minimum number of days necessary in a week before it is considered part of the next year according
   * to the given locale.
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @returns {number}
   */
  static getMinimumDaysInFirstWeek({ locale: e = null, locObj: t = null } = {}) {
    return (t || fe.create(e)).getMinDaysInFirstWeek();
  }
  /**
   * Get the weekdays, which are considered the weekend according to the given locale
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @returns {number[]} an array of weekdays, 1 for Monday through 7 for Sunday
   */
  static getWeekendWeekdays({ locale: e = null, locObj: t = null } = {}) {
    return (t || fe.create(e)).getWeekendDays().slice();
  }
  /**
   * Return an array of standalone month names.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @param {string} [opts.outputCalendar='gregory'] - the calendar
   * @example Info.months()[0] //=> 'January'
   * @example Info.months('short')[0] //=> 'Jan'
   * @example Info.months('numeric')[0] //=> '1'
   * @example Info.months('short', { locale: 'fr-CA' } )[0] //=> 'janv.'
   * @example Info.months('numeric', { locale: 'ar' })[0] //=> '١'
   * @example Info.months('long', { outputCalendar: 'islamic' })[0] //=> 'Rabiʻ I'
   * @return {Array}
   */
  static months(e = "long", { locale: t = null, numberingSystem: s = null, locObj: a = null, outputCalendar: r = "gregory" } = {}) {
    return (a || fe.create(t, s, r)).months(e);
  }
  /**
   * Return an array of format month names.
   * Format months differ from standalone months in that they're meant to appear next to the day of the month. In some languages, that
   * changes the string.
   * See {@link Info#months}
   * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @param {string} [opts.outputCalendar='gregory'] - the calendar
   * @return {Array}
   */
  static monthsFormat(e = "long", { locale: t = null, numberingSystem: s = null, locObj: a = null, outputCalendar: r = "gregory" } = {}) {
    return (a || fe.create(t, s, r)).months(e, !0);
  }
  /**
   * Return an array of standalone week names.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param {string} [length='long'] - the length of the weekday representation, such as "narrow", "short", "long".
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @example Info.weekdays()[0] //=> 'Monday'
   * @example Info.weekdays('short')[0] //=> 'Mon'
   * @example Info.weekdays('short', { locale: 'fr-CA' })[0] //=> 'lun.'
   * @example Info.weekdays('short', { locale: 'ar' })[0] //=> 'الاثنين'
   * @return {Array}
   */
  static weekdays(e = "long", { locale: t = null, numberingSystem: s = null, locObj: a = null } = {}) {
    return (a || fe.create(t, s, null)).weekdays(e);
  }
  /**
   * Return an array of format week names.
   * Format weekdays differ from standalone weekdays in that they're meant to appear next to more date information. In some languages, that
   * changes the string.
   * See {@link Info#weekdays}
   * @param {string} [length='long'] - the length of the month representation, such as "narrow", "short", "long".
   * @param {Object} opts - options
   * @param {string} [opts.locale=null] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @return {Array}
   */
  static weekdaysFormat(e = "long", { locale: t = null, numberingSystem: s = null, locObj: a = null } = {}) {
    return (a || fe.create(t, s, null)).weekdays(e, !0);
  }
  /**
   * Return an array of meridiems.
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @example Info.meridiems() //=> [ 'AM', 'PM' ]
   * @example Info.meridiems({ locale: 'my' }) //=> [ 'နံနက်', 'ညနေ' ]
   * @return {Array}
   */
  static meridiems({ locale: e = null } = {}) {
    return fe.create(e).meridiems();
  }
  /**
   * Return an array of eras, such as ['BC', 'AD']. The locale can be specified, but the calendar system is always Gregorian.
   * @param {string} [length='short'] - the length of the era representation, such as "short" or "long".
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @example Info.eras() //=> [ 'BC', 'AD' ]
   * @example Info.eras('long') //=> [ 'Before Christ', 'Anno Domini' ]
   * @example Info.eras('long', { locale: 'fr' }) //=> [ 'avant Jésus-Christ', 'après Jésus-Christ' ]
   * @return {Array}
   */
  static eras(e = "short", { locale: t = null } = {}) {
    return fe.create(t, null, "gregory").eras(e);
  }
  /**
   * Return the set of available features in this environment.
   * Some features of Luxon are not available in all environments. For example, on older browsers, relative time formatting support is not available. Use this function to figure out if that's the case.
   * Keys:
   * * `relative`: whether this environment supports relative time formatting
   * * `localeWeek`: whether this environment supports different weekdays for the start of the week based on the locale
   * @example Info.features() //=> { relative: false, localeWeek: true }
   * @return {Object}
   */
  static features() {
    return { relative: ta(), localeWeek: na() };
  }
}
function ys(n, e) {
  const t = (a) => a.toUTC(0, { keepLocalTime: !0 }).startOf("day").valueOf(), s = t(e) - t(n);
  return Math.floor(ce.fromMillis(s).as("days"));
}
function zi(n, e, t) {
  const s = [
    ["years", (c, w) => w.year - c.year],
    ["quarters", (c, w) => w.quarter - c.quarter + (w.year - c.year) * 4],
    ["months", (c, w) => w.month - c.month + (w.year - c.year) * 12],
    [
      "weeks",
      (c, w) => {
        const v = ys(c, w);
        return (v - v % 7) / 7;
      }
    ],
    ["days", ys]
  ], a = {}, r = n;
  let l, i;
  for (const [c, w] of s)
    t.indexOf(c) >= 0 && (l = c, a[c] = w(n, e), i = r.plus(a), i > e ? (a[c]--, n = r.plus(a), n > e && (i = n, a[c]--, n = r.plus(a))) : n = i);
  return [n, a, i, l];
}
function Vi(n, e, t, s) {
  let [a, r, l, i] = zi(n, e, t);
  const c = e - a, w = t.filter(
    (f) => ["hours", "minutes", "seconds", "milliseconds"].indexOf(f) >= 0
  );
  w.length === 0 && (l < e && (l = a.plus({ [i]: 1 })), l !== a && (r[i] = (r[i] || 0) + c / (l - a)));
  const v = ce.fromObject(r, s);
  return w.length > 0 ? ce.fromMillis(c, s).shiftTo(...w).plus(v) : v;
}
const Yi = "missing Intl.DateTimeFormat.formatToParts support";
function de(n, e = (t) => t) {
  return { regex: n, deser: ([t]) => e(br(t)) };
}
const Fi = " ", pa = `[ ${Fi}]`, ka = new RegExp(pa, "g");
function Wi(n) {
  return n.replace(/\./g, "\\.?").replace(ka, pa);
}
function gs(n) {
  return n.replace(/\./g, "").replace(ka, " ").toLowerCase();
}
function Be(n, e) {
  return n === null ? null : {
    regex: RegExp(n.map(Wi).join("|")),
    deser: ([t]) => n.findIndex((s) => gs(t) === gs(s)) + e
  };
}
function ws(n, e) {
  return { regex: n, deser: ([, t, s]) => dn(t, s), groups: e };
}
function Bt(n) {
  return { regex: n, deser: ([e]) => e };
}
function Li(n) {
  return n.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
}
function Ai(n, e) {
  const t = xe(e), s = xe(e, "{2}"), a = xe(e, "{3}"), r = xe(e, "{4}"), l = xe(e, "{6}"), i = xe(e, "{1,2}"), c = xe(e, "{1,3}"), w = xe(e, "{1,6}"), v = xe(e, "{1,9}"), f = xe(e, "{2,4}"), E = xe(e, "{4,6}"), k = (M) => ({ regex: RegExp(Li(M.val)), deser: ([h]) => h, literal: !0 }), p = ((M) => {
    if (n.literal)
      return k(M);
    switch (M.val) {
      // era
      case "G":
        return Be(e.eras("short"), 0);
      case "GG":
        return Be(e.eras("long"), 0);
      // years
      case "y":
        return de(w);
      case "yy":
        return de(f, In);
      case "yyyy":
        return de(r);
      case "yyyyy":
        return de(E);
      case "yyyyyy":
        return de(l);
      // months
      case "M":
        return de(i);
      case "MM":
        return de(s);
      case "MMM":
        return Be(e.months("short", !0), 1);
      case "MMMM":
        return Be(e.months("long", !0), 1);
      case "L":
        return de(i);
      case "LL":
        return de(s);
      case "LLL":
        return Be(e.months("short", !1), 1);
      case "LLLL":
        return Be(e.months("long", !1), 1);
      // dates
      case "d":
        return de(i);
      case "dd":
        return de(s);
      // ordinals
      case "o":
        return de(c);
      case "ooo":
        return de(a);
      // time
      case "HH":
        return de(s);
      case "H":
        return de(i);
      case "hh":
        return de(s);
      case "h":
        return de(i);
      case "mm":
        return de(s);
      case "m":
        return de(i);
      case "q":
        return de(i);
      case "qq":
        return de(s);
      case "s":
        return de(i);
      case "ss":
        return de(s);
      case "S":
        return de(c);
      case "SSS":
        return de(a);
      case "u":
        return Bt(v);
      case "uu":
        return Bt(i);
      case "uuu":
        return de(t);
      // meridiem
      case "a":
        return Be(e.meridiems(), 0);
      // weekYear (k)
      case "kkkk":
        return de(r);
      case "kk":
        return de(f, In);
      // weekNumber (W)
      case "W":
        return de(i);
      case "WW":
        return de(s);
      // weekdays
      case "E":
      case "c":
        return de(t);
      case "EEE":
        return Be(e.weekdays("short", !1), 1);
      case "EEEE":
        return Be(e.weekdays("long", !1), 1);
      case "ccc":
        return Be(e.weekdays("short", !0), 1);
      case "cccc":
        return Be(e.weekdays("long", !0), 1);
      // offset/zone
      case "Z":
      case "ZZ":
        return ws(new RegExp(`([+-]${i.source})(?::(${s.source}))?`), 2);
      case "ZZZ":
        return ws(new RegExp(`([+-]${i.source})(${s.source})?`), 2);
      // we don't support ZZZZ (PST) or ZZZZZ (Pacific Standard Time) in parsing
      // because we don't have any way to figure out what they are
      case "z":
        return Bt(/[a-z_+-/]{1,256}?/i);
      // this special-case "token" represents a place where a macro-token expanded into a white-space literal
      // in this case we accept any non-newline white-space
      case " ":
        return Bt(/[^\S\n\r]/);
      default:
        return k(M);
    }
  })(n) || {
    invalidReason: Yi
  };
  return p.token = n, p;
}
const Hi = {
  year: {
    "2-digit": "yy",
    numeric: "yyyyy"
  },
  month: {
    numeric: "M",
    "2-digit": "MM",
    short: "MMM",
    long: "MMMM"
  },
  day: {
    numeric: "d",
    "2-digit": "dd"
  },
  weekday: {
    short: "EEE",
    long: "EEEE"
  },
  dayperiod: "a",
  dayPeriod: "a",
  hour12: {
    numeric: "h",
    "2-digit": "hh"
  },
  hour24: {
    numeric: "H",
    "2-digit": "HH"
  },
  minute: {
    numeric: "m",
    "2-digit": "mm"
  },
  second: {
    numeric: "s",
    "2-digit": "ss"
  },
  timeZoneName: {
    long: "ZZZZZ",
    short: "ZZZ"
  }
};
function Ri(n, e, t) {
  const { type: s, value: a } = n;
  if (s === "literal") {
    const c = /^\s+$/.test(a);
    return {
      literal: !c,
      val: c ? " " : a
    };
  }
  const r = e[s];
  let l = s;
  s === "hour" && (e.hour12 != null ? l = e.hour12 ? "hour12" : "hour24" : e.hourCycle != null ? e.hourCycle === "h11" || e.hourCycle === "h12" ? l = "hour12" : l = "hour24" : l = t.hour12 ? "hour12" : "hour24");
  let i = Hi[l];
  if (typeof i == "object" && (i = i[r]), i)
    return {
      literal: !1,
      val: i
    };
}
function Pi(n) {
  return [`^${n.map((t) => t.regex).reduce((t, s) => `${t}(${s.source})`, "")}$`, n];
}
function Zi(n, e, t) {
  const s = n.match(e);
  if (s) {
    const a = {};
    let r = 1;
    for (const l in t)
      if (Ot(t, l)) {
        const i = t[l], c = i.groups ? i.groups + 1 : 1;
        !i.literal && i.token && (a[i.token.val[0]] = i.deser(s.slice(r, r + c))), r += c;
      }
    return [s, a];
  } else
    return [s, {}];
}
function ji(n) {
  const e = (r) => {
    switch (r) {
      case "S":
        return "millisecond";
      case "s":
        return "second";
      case "m":
        return "minute";
      case "h":
      case "H":
        return "hour";
      case "d":
        return "day";
      case "o":
        return "ordinal";
      case "L":
      case "M":
        return "month";
      case "y":
        return "year";
      case "E":
      case "c":
        return "weekday";
      case "W":
        return "weekNumber";
      case "k":
        return "weekYear";
      case "q":
        return "quarter";
      default:
        return null;
    }
  };
  let t = null, s;
  return G(n.z) || (t = st.create(n.z)), G(n.Z) || (t || (t = new Ie(n.Z)), s = n.Z), G(n.q) || (n.M = (n.q - 1) * 3 + 1), G(n.h) || (n.h < 12 && n.a === 1 ? n.h += 12 : n.h === 12 && n.a === 0 && (n.h = 0)), n.G === 0 && n.y && (n.y = -n.y), G(n.u) || (n.S = An(n.u)), [Object.keys(n).reduce((r, l) => {
    const i = e(l);
    return i && (r[i] = n[l]), r;
  }, {}), t, s];
}
let wn = null;
function xi() {
  return wn || (wn = x.fromMillis(1555555555555)), wn;
}
function Bi(n, e) {
  if (n.literal)
    return n;
  const t = _e.macroTokenToFormatOpts(n.val), s = ba(t, e);
  return s == null || s.includes(void 0) ? n : s;
}
function Ta(n, e) {
  return Array.prototype.concat(...n.map((t) => Bi(t, e)));
}
class Ma {
  constructor(e, t) {
    if (this.locale = e, this.format = t, this.tokens = Ta(_e.parseFormat(t), e), this.units = this.tokens.map((s) => Ai(s, e)), this.disqualifyingUnit = this.units.find((s) => s.invalidReason), !this.disqualifyingUnit) {
      const [s, a] = Pi(this.units);
      this.regex = RegExp(s, "i"), this.handlers = a;
    }
  }
  explainFromTokens(e) {
    if (this.isValid) {
      const [t, s] = Zi(e, this.regex, this.handlers), [a, r, l] = s ? ji(s) : [null, null, void 0];
      if (Ot(s, "a") && Ot(s, "H"))
        throw new Tt(
          "Can't include meridiem when specifying 24-hour format"
        );
      return {
        input: e,
        tokens: this.tokens,
        regex: this.regex,
        rawMatches: t,
        matches: s,
        result: a,
        zone: r,
        specificOffset: l
      };
    } else
      return { input: e, tokens: this.tokens, invalidReason: this.invalidReason };
  }
  get isValid() {
    return !this.disqualifyingUnit;
  }
  get invalidReason() {
    return this.disqualifyingUnit ? this.disqualifyingUnit.invalidReason : null;
  }
}
function Sa(n, e, t) {
  return new Ma(n, t).explainFromTokens(e);
}
function qi(n, e, t) {
  const { result: s, zone: a, specificOffset: r, invalidReason: l } = Sa(n, e, t);
  return [s, a, r, l];
}
function ba(n, e) {
  if (!n)
    return null;
  const s = _e.create(e, n).dtFormatter(xi()), a = s.formatToParts(), r = s.resolvedOptions();
  return a.map((l) => Ri(l, n, r));
}
const Dn = "Invalid DateTime", Ds = 864e13;
function Vt(n) {
  return new Ue("unsupported zone", `the zone "${n.name}" is not supported`);
}
function pn(n) {
  return n.weekData === null && (n.weekData = sn(n.c)), n.weekData;
}
function kn(n) {
  return n.localWeekData === null && (n.localWeekData = sn(
    n.c,
    n.loc.getMinDaysInFirstWeek(),
    n.loc.getStartOfWeek()
  )), n.localWeekData;
}
function ft(n, e) {
  const t = {
    ts: n.ts,
    zone: n.zone,
    c: n.c,
    o: n.o,
    loc: n.loc,
    invalid: n.invalid
  };
  return new x({ ...t, ...e, old: t });
}
function Oa(n, e, t) {
  let s = n - e * 60 * 1e3;
  const a = t.offset(s);
  if (e === a)
    return [s, e];
  s -= (a - e) * 60 * 1e3;
  const r = t.offset(s);
  return a === r ? [s, a] : [n - Math.min(a, r) * 60 * 1e3, Math.max(a, r)];
}
function qt(n, e) {
  n += e * 60 * 1e3;
  const t = new Date(n);
  return {
    year: t.getUTCFullYear(),
    month: t.getUTCMonth() + 1,
    day: t.getUTCDate(),
    hour: t.getUTCHours(),
    minute: t.getUTCMinutes(),
    second: t.getUTCSeconds(),
    millisecond: t.getUTCMilliseconds()
  };
}
function Jt(n, e, t) {
  return Oa(cn(n), e, t);
}
function ps(n, e) {
  const t = n.o, s = n.c.year + Math.trunc(e.years), a = n.c.month + Math.trunc(e.months) + Math.trunc(e.quarters) * 3, r = {
    ...n.c,
    year: s,
    month: a,
    day: Math.min(n.c.day, an(s, a)) + Math.trunc(e.days) + Math.trunc(e.weeks) * 7
  }, l = ce.fromObject({
    years: e.years - Math.trunc(e.years),
    quarters: e.quarters - Math.trunc(e.quarters),
    months: e.months - Math.trunc(e.months),
    weeks: e.weeks - Math.trunc(e.weeks),
    days: e.days - Math.trunc(e.days),
    hours: e.hours,
    minutes: e.minutes,
    seconds: e.seconds,
    milliseconds: e.milliseconds
  }).as("milliseconds"), i = cn(r);
  let [c, w] = Oa(i, t, n.zone);
  return l !== 0 && (c += l, w = n.zone.offset(c)), { ts: c, o: w };
}
function kt(n, e, t, s, a, r) {
  const { setZone: l, zone: i } = t;
  if (n && Object.keys(n).length !== 0 || e) {
    const c = e || i, w = x.fromObject(n, {
      ...t,
      zone: c,
      specificOffset: r
    });
    return l ? w : w.setZone(i);
  } else
    return x.invalid(
      new Ue("unparsable", `the input "${a}" can't be parsed as ${s}`)
    );
}
function Ut(n, e, t = !0) {
  return n.isValid ? _e.create(fe.create("en-US"), {
    allowZ: t,
    forceSimple: !0
  }).formatDateTimeFromString(n, e) : null;
}
function Tn(n, e, t) {
  const s = n.c.year > 9999 || n.c.year < 0;
  let a = "";
  if (s && n.c.year >= 0 && (a += "+"), a += Se(n.c.year, s ? 6 : 4), t === "year") return a;
  if (e) {
    if (a += "-", a += Se(n.c.month), t === "month") return a;
    a += "-";
  } else if (a += Se(n.c.month), t === "month") return a;
  return a += Se(n.c.day), a;
}
function ks(n, e, t, s, a, r, l) {
  let i = !t || n.c.millisecond !== 0 || n.c.second !== 0, c = "";
  switch (l) {
    case "day":
    case "month":
    case "year":
      break;
    default:
      if (c += Se(n.c.hour), l === "hour") break;
      if (e) {
        if (c += ":", c += Se(n.c.minute), l === "minute") break;
        i && (c += ":", c += Se(n.c.second));
      } else {
        if (c += Se(n.c.minute), l === "minute") break;
        i && (c += Se(n.c.second));
      }
      if (l === "second") break;
      i && (!s || n.c.millisecond !== 0) && (c += ".", c += Se(n.c.millisecond, 3));
  }
  return a && (n.isOffsetFixed && n.offset === 0 && !r ? c += "Z" : n.o < 0 ? (c += "-", c += Se(Math.trunc(-n.o / 60)), c += ":", c += Se(Math.trunc(-n.o % 60))) : (c += "+", c += Se(Math.trunc(n.o / 60)), c += ":", c += Se(Math.trunc(n.o % 60)))), r && (c += "[" + n.zone.ianaName + "]"), c;
}
const $a = {
  month: 1,
  day: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
}, Ui = {
  weekNumber: 1,
  weekday: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
}, Ji = {
  ordinal: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
}, Xt = ["year", "month", "day", "hour", "minute", "second", "millisecond"], Xi = [
  "weekYear",
  "weekNumber",
  "weekday",
  "hour",
  "minute",
  "second",
  "millisecond"
], Gi = ["year", "ordinal", "hour", "minute", "second", "millisecond"];
function Gt(n) {
  const e = {
    year: "year",
    years: "year",
    month: "month",
    months: "month",
    day: "day",
    days: "day",
    hour: "hour",
    hours: "hour",
    minute: "minute",
    minutes: "minute",
    quarter: "quarter",
    quarters: "quarter",
    second: "second",
    seconds: "second",
    millisecond: "millisecond",
    milliseconds: "millisecond",
    weekday: "weekday",
    weekdays: "weekday",
    weeknumber: "weekNumber",
    weeksnumber: "weekNumber",
    weeknumbers: "weekNumber",
    weekyear: "weekYear",
    weekyears: "weekYear",
    ordinal: "ordinal"
  }[n.toLowerCase()];
  if (!e) throw new $s(n);
  return e;
}
function Ts(n) {
  switch (n.toLowerCase()) {
    case "localweekday":
    case "localweekdays":
      return "localWeekday";
    case "localweeknumber":
    case "localweeknumbers":
      return "localWeekNumber";
    case "localweekyear":
    case "localweekyears":
      return "localWeekYear";
    default:
      return Gt(n);
  }
}
function Qi(n) {
  if (Yt === void 0 && (Yt = Te.now()), n.type !== "iana")
    return n.offset(Yt);
  const e = n.name;
  let t = zn.get(e);
  return t === void 0 && (t = n.offset(Yt), zn.set(e, t)), t;
}
function Ms(n, e) {
  const t = it(e.zone, Te.defaultZone);
  if (!t.isValid)
    return x.invalid(Vt(t));
  const s = fe.fromObject(e);
  let a, r;
  if (G(n.year))
    a = Te.now();
  else {
    for (const c of Xt)
      G(n[c]) && (n[c] = $a[c]);
    const l = Ks(n) || ea(n);
    if (l)
      return x.invalid(l);
    const i = Qi(t);
    [a, r] = Jt(n, i, t);
  }
  return new x({ ts: a, zone: t, loc: s, o: r });
}
function Ss(n, e, t) {
  const s = G(t.round) ? !0 : t.round, a = G(t.rounding) ? "trunc" : t.rounding, r = (i, c) => (i = Hn(i, s || t.calendary ? 0 : 2, t.calendary ? "round" : a), e.loc.clone(t).relFormatter(t).format(i, c)), l = (i) => t.calendary ? e.hasSame(n, i) ? 0 : e.startOf(i).diff(n.startOf(i), i).get(i) : e.diff(n, i).get(i);
  if (t.unit)
    return r(l(t.unit), t.unit);
  for (const i of t.units) {
    const c = l(i);
    if (Math.abs(c) >= 1)
      return r(c, i);
  }
  return r(n > e ? -0 : 0, t.units[t.units.length - 1]);
}
function bs(n) {
  let e = {}, t;
  return n.length > 0 && typeof n[n.length - 1] == "object" ? (e = n[n.length - 1], t = Array.from(n).slice(0, n.length - 1)) : t = Array.from(n), [e, t];
}
let Yt;
const zn = /* @__PURE__ */ new Map();
class x {
  /**
   * @access private
   */
  constructor(e) {
    const t = e.zone || Te.defaultZone;
    let s = e.invalid || (Number.isNaN(e.ts) ? new Ue("invalid input") : null) || (t.isValid ? null : Vt(t));
    this.ts = G(e.ts) ? Te.now() : e.ts;
    let a = null, r = null;
    if (!s)
      if (e.old && e.old.ts === this.ts && e.old.zone.equals(t))
        [a, r] = [e.old.c, e.old.o];
      else {
        const i = ut(e.o) && !e.old ? e.o : t.offset(this.ts);
        a = qt(this.ts, i), s = Number.isNaN(a.year) ? new Ue("invalid input") : null, a = s ? null : a, r = s ? null : i;
      }
    this._zone = t, this.loc = e.loc || fe.create(), this.invalid = s, this.weekData = null, this.localWeekData = null, this.c = a, this.o = r, this.isLuxonDateTime = !0;
  }
  // CONSTRUCT
  /**
   * Create a DateTime for the current instant, in the system's time zone.
   *
   * Use Settings to override these default values if needed.
   * @example DateTime.now().toISO() //~> now in the ISO format
   * @return {DateTime}
   */
  static now() {
    return new x({});
  }
  /**
   * Create a local DateTime
   * @param {number} [year] - The calendar year. If omitted (as in, call `local()` with no arguments), the current time will be used
   * @param {number} [month=1] - The month, 1-indexed
   * @param {number} [day=1] - The day of the month, 1-indexed
   * @param {number} [hour=0] - The hour of the day, in 24-hour time
   * @param {number} [minute=0] - The minute of the hour, meaning a number between 0 and 59
   * @param {number} [second=0] - The second of the minute, meaning a number between 0 and 59
   * @param {number} [millisecond=0] - The millisecond of the second, meaning a number between 0 and 999
   * @example DateTime.local()                                  //~> now
   * @example DateTime.local({ zone: "America/New_York" })      //~> now, in US east coast time
   * @example DateTime.local(2017)                              //~> 2017-01-01T00:00:00
   * @example DateTime.local(2017, 3)                           //~> 2017-03-01T00:00:00
   * @example DateTime.local(2017, 3, 12, { locale: "fr" })     //~> 2017-03-12T00:00:00, with a French locale
   * @example DateTime.local(2017, 3, 12, 5)                    //~> 2017-03-12T05:00:00
   * @example DateTime.local(2017, 3, 12, 5, { zone: "utc" })   //~> 2017-03-12T05:00:00, in UTC
   * @example DateTime.local(2017, 3, 12, 5, 45)                //~> 2017-03-12T05:45:00
   * @example DateTime.local(2017, 3, 12, 5, 45, 10)            //~> 2017-03-12T05:45:10
   * @example DateTime.local(2017, 3, 12, 5, 45, 10, 765)       //~> 2017-03-12T05:45:10.765
   * @return {DateTime}
   */
  static local() {
    const [e, t] = bs(arguments), [s, a, r, l, i, c, w] = t;
    return Ms({ year: s, month: a, day: r, hour: l, minute: i, second: c, millisecond: w }, e);
  }
  /**
   * Create a DateTime in UTC
   * @param {number} [year] - The calendar year. If omitted (as in, call `utc()` with no arguments), the current time will be used
   * @param {number} [month=1] - The month, 1-indexed
   * @param {number} [day=1] - The day of the month
   * @param {number} [hour=0] - The hour of the day, in 24-hour time
   * @param {number} [minute=0] - The minute of the hour, meaning a number between 0 and 59
   * @param {number} [second=0] - The second of the minute, meaning a number between 0 and 59
   * @param {number} [millisecond=0] - The millisecond of the second, meaning a number between 0 and 999
   * @param {Object} options - configuration options for the DateTime
   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
   * @param {string} [options.outputCalendar] - the output calendar to set on the resulting DateTime instance
   * @param {string} [options.numberingSystem] - the numbering system to set on the resulting DateTime instance
   * @param {string} [options.weekSettings] - the week settings to set on the resulting DateTime instance
   * @example DateTime.utc()                                              //~> now
   * @example DateTime.utc(2017)                                          //~> 2017-01-01T00:00:00Z
   * @example DateTime.utc(2017, 3)                                       //~> 2017-03-01T00:00:00Z
   * @example DateTime.utc(2017, 3, 12)                                   //~> 2017-03-12T00:00:00Z
   * @example DateTime.utc(2017, 3, 12, 5)                                //~> 2017-03-12T05:00:00Z
   * @example DateTime.utc(2017, 3, 12, 5, 45)                            //~> 2017-03-12T05:45:00Z
   * @example DateTime.utc(2017, 3, 12, 5, 45, { locale: "fr" })          //~> 2017-03-12T05:45:00Z with a French locale
   * @example DateTime.utc(2017, 3, 12, 5, 45, 10)                        //~> 2017-03-12T05:45:10Z
   * @example DateTime.utc(2017, 3, 12, 5, 45, 10, 765, { locale: "fr" }) //~> 2017-03-12T05:45:10.765Z with a French locale
   * @return {DateTime}
   */
  static utc() {
    const [e, t] = bs(arguments), [s, a, r, l, i, c, w] = t;
    return e.zone = Ie.utcInstance, Ms({ year: s, month: a, day: r, hour: l, minute: i, second: c, millisecond: w }, e);
  }
  /**
   * Create a DateTime from a JavaScript Date object. Uses the default zone.
   * @param {Date} date - a JavaScript Date object
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
   * @return {DateTime}
   */
  static fromJSDate(e, t = {}) {
    const s = _r(e) ? e.valueOf() : NaN;
    if (Number.isNaN(s))
      return x.invalid("invalid input");
    const a = it(t.zone, Te.defaultZone);
    return a.isValid ? new x({
      ts: s,
      zone: a,
      loc: fe.fromObject(t)
    }) : x.invalid(Vt(a));
  }
  /**
   * Create a DateTime from a number of milliseconds since the epoch (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
   * @param {number} milliseconds - a number of milliseconds since 1970 UTC
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
   * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} options.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @param {string} options.weekSettings - the week settings to set on the resulting DateTime instance
   * @return {DateTime}
   */
  static fromMillis(e, t = {}) {
    if (ut(e))
      return e < -Ds || e > Ds ? x.invalid("Timestamp out of range") : new x({
        ts: e,
        zone: it(t.zone, Te.defaultZone),
        loc: fe.fromObject(t)
      });
    throw new Ce(
      `fromMillis requires a numerical input, but received a ${typeof e} with value ${e}`
    );
  }
  /**
   * Create a DateTime from a number of seconds since the epoch (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
   * @param {number} seconds - a number of seconds since 1970 UTC
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
   * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} options.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @param {string} options.weekSettings - the week settings to set on the resulting DateTime instance
   * @return {DateTime}
   */
  static fromSeconds(e, t = {}) {
    if (ut(e))
      return new x({
        ts: e * 1e3,
        zone: it(t.zone, Te.defaultZone),
        loc: fe.fromObject(t)
      });
    throw new Ce("fromSeconds requires a numerical input");
  }
  /**
   * Create a DateTime from a JavaScript object with keys like 'year' and 'hour' with reasonable defaults.
   * @param {Object} obj - the object to create the DateTime from
   * @param {number} obj.year - a year, such as 1987
   * @param {number} obj.month - a month, 1-12
   * @param {number} obj.day - a day of the month, 1-31, depending on the month
   * @param {number} obj.ordinal - day of the year, 1-365 or 366
   * @param {number} obj.weekYear - an ISO week year
   * @param {number} obj.weekNumber - an ISO week number, between 1 and 52 or 53, depending on the year
   * @param {number} obj.weekday - an ISO weekday, 1-7, where 1 is Monday and 7 is Sunday
   * @param {number} obj.localWeekYear - a week year, according to the locale
   * @param {number} obj.localWeekNumber - a week number, between 1 and 52 or 53, depending on the year, according to the locale
   * @param {number} obj.localWeekday - a weekday, 1-7, where 1 is the first and 7 is the last day of the week, according to the locale
   * @param {number} obj.hour - hour of the day, 0-23
   * @param {number} obj.minute - minute of the hour, 0-59
   * @param {number} obj.second - second of the minute, 0-59
   * @param {number} obj.millisecond - millisecond of the second, 0-999
   * @param {Object} opts - options for creating this DateTime
   * @param {string|Zone} [opts.zone='local'] - interpret the numbers in the context of a particular zone. Can take any value taken as the first argument to setZone()
   * @param {string} [opts.locale='system\'s locale'] - a locale to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
   * @example DateTime.fromObject({ year: 1982, month: 5, day: 25}).toISODate() //=> '1982-05-25'
   * @example DateTime.fromObject({ year: 1982 }).toISODate() //=> '1982-01-01'
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }) //~> today at 10:26:06
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'utc' }),
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'local' })
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'America/New_York' })
   * @example DateTime.fromObject({ weekYear: 2016, weekNumber: 2, weekday: 3 }).toISODate() //=> '2016-01-13'
   * @example DateTime.fromObject({ localWeekYear: 2022, localWeekNumber: 1, localWeekday: 1 }, { locale: "en-US" }).toISODate() //=> '2021-12-26'
   * @return {DateTime}
   */
  static fromObject(e, t = {}) {
    e = e || {};
    const s = it(t.zone, Te.defaultZone);
    if (!s.isValid)
      return x.invalid(Vt(s));
    const a = fe.fromObject(t), r = rn(e, Ts), { minDaysInFirstWeek: l, startOfWeek: i } = ls(r, a), c = Te.now(), w = G(t.specificOffset) ? s.offset(c) : t.specificOffset, v = !G(r.ordinal), f = !G(r.year), E = !G(r.month) || !G(r.day), k = f || E, g = r.weekYear || r.weekNumber;
    if ((k || v) && g)
      throw new Tt(
        "Can't mix weekYear/weekNumber units with year/month/day or ordinals"
      );
    if (E && v)
      throw new Tt("Can't mix ordinal dates with month/day");
    const p = g || r.weekday && !k;
    let M, h, q = qt(c, w);
    p ? (M = Xi, h = Ui, q = sn(q, l, i)) : v ? (M = Gi, h = Ji, q = gn(q)) : (M = Xt, h = $a);
    let o = !1;
    for (const d of M) {
      const S = r[d];
      G(S) ? o ? r[d] = h[d] : r[d] = q[d] : o = !0;
    }
    const O = p ? $r(r, l, i) : v ? Er(r) : Ks(r), Z = O || ea(r);
    if (Z)
      return x.invalid(Z);
    const V = p ? is(r, l, i) : v ? os(r) : r, [_, N] = Jt(V, w, s), I = new x({
      ts: _,
      zone: s,
      o: N,
      loc: a
    });
    return r.weekday && k && e.weekday !== I.weekday ? x.invalid(
      "mismatched weekday",
      `you can't specify both a weekday of ${r.weekday} and a date of ${I.toISO()}`
    ) : I.isValid ? I : x.invalid(I.invalid);
  }
  /**
   * Create a DateTime from an ISO 8601 string
   * @param {string} text - the ISO string
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the time to this zone
   * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} [opts.outputCalendar] - the output calendar to set on the resulting DateTime instance
   * @param {string} [opts.numberingSystem] - the numbering system to set on the resulting DateTime instance
   * @param {string} [opts.weekSettings] - the week settings to set on the resulting DateTime instance
   * @example DateTime.fromISO('2016-05-25T09:08:34.123')
   * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00')
   * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00', {setZone: true})
   * @example DateTime.fromISO('2016-05-25T09:08:34.123', {zone: 'utc'})
   * @example DateTime.fromISO('2016-W05-4')
   * @return {DateTime}
   */
  static fromISO(e, t = {}) {
    const [s, a] = Di(e);
    return kt(s, a, t, "ISO 8601", e);
  }
  /**
   * Create a DateTime from an RFC 2822 string
   * @param {string} text - the RFC 2822 string
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - convert the time to this zone. Since the offset is always specified in the string itself, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
   * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
   * @example DateTime.fromRFC2822('25 Nov 2016 13:23:12 GMT')
   * @example DateTime.fromRFC2822('Fri, 25 Nov 2016 13:23:12 +0600')
   * @example DateTime.fromRFC2822('25 Nov 2016 13:23 Z')
   * @return {DateTime}
   */
  static fromRFC2822(e, t = {}) {
    const [s, a] = pi(e);
    return kt(s, a, t, "RFC 2822", e);
  }
  /**
   * Create a DateTime from an HTTP header date
   * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
   * @param {string} text - the HTTP header date
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - convert the time to this zone. Since HTTP dates are always in UTC, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
   * @param {boolean} [opts.setZone=false] - override the zone with the fixed-offset zone specified in the string. For HTTP dates, this is always UTC, so this option is equivalent to setting the `zone` option to 'utc', but this option is included for consistency with similar methods.
   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
   * @example DateTime.fromHTTP('Sun, 06 Nov 1994 08:49:37 GMT')
   * @example DateTime.fromHTTP('Sunday, 06-Nov-94 08:49:37 GMT')
   * @example DateTime.fromHTTP('Sun Nov  6 08:49:37 1994')
   * @return {DateTime}
   */
  static fromHTTP(e, t = {}) {
    const [s, a] = ki(e);
    return kt(s, a, t, "HTTP", t);
  }
  /**
   * Create a DateTime from an input string and format string.
   * Defaults to en-US if no locale has been specified, regardless of the system's locale. For a table of tokens and their interpretations, see [here](https://moment.github.io/luxon/#/parsing?id=table-of-tokens).
   * @param {string} text - the string to parse
   * @param {string} fmt - the format the string is expected to be in (see the link below for the formats)
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
   * @param {boolean} [opts.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
   * @param {string} opts.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
   * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @return {DateTime}
   */
  static fromFormat(e, t, s = {}) {
    if (G(e) || G(t))
      throw new Ce("fromFormat requires an input string and a format");
    const { locale: a = null, numberingSystem: r = null } = s, l = fe.fromOpts({
      locale: a,
      numberingSystem: r,
      defaultToEN: !0
    }), [i, c, w, v] = qi(l, e, t);
    return v ? x.invalid(v) : kt(i, c, s, `format ${t}`, e, w);
  }
  /**
   * @deprecated use fromFormat instead
   */
  static fromString(e, t, s = {}) {
    return x.fromFormat(e, t, s);
  }
  /**
   * Create a DateTime from a SQL date, time, or datetime
   * Defaults to en-US if no locale has been specified, regardless of the system's locale
   * @param {string} text - the string to parse
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
   * @param {boolean} [opts.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
   * @param {string} opts.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
   * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @example DateTime.fromSQL('2017-05-15')
   * @example DateTime.fromSQL('2017-05-15 09:12:34')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342+06:00')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles', { setZone: true })
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342', { zone: 'America/Los_Angeles' })
   * @example DateTime.fromSQL('09:12:34.342')
   * @return {DateTime}
   */
  static fromSQL(e, t = {}) {
    const [s, a] = Ei(e);
    return kt(s, a, t, "SQL", e);
  }
  /**
   * Create an invalid DateTime.
   * @param {string} reason - simple string of why this DateTime is invalid. Should not contain parameters or anything else data-dependent.
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {DateTime}
   */
  static invalid(e, t = null) {
    if (!e)
      throw new Ce("need to specify a reason the DateTime is invalid");
    const s = e instanceof Ue ? e : new Ue(e, t);
    if (Te.throwOnInvalid)
      throw new tr(s);
    return new x({ invalid: s });
  }
  /**
   * Check if an object is an instance of DateTime. Works across context boundaries
   * @param {object} o
   * @return {boolean}
   */
  static isDateTime(e) {
    return e && e.isLuxonDateTime || !1;
  }
  /**
   * Produce the format string for a set of options
   * @param formatOpts
   * @param localeOpts
   * @returns {string}
   */
  static parseFormatForOpts(e, t = {}) {
    const s = ba(e, fe.fromObject(t));
    return s ? s.map((a) => a ? a.val : null).join("") : null;
  }
  /**
   * Produce the the fully expanded format token for the locale
   * Does NOT quote characters, so quoted tokens will not round trip correctly
   * @param fmt
   * @param localeOpts
   * @returns {string}
   */
  static expandFormat(e, t = {}) {
    return Ta(_e.parseFormat(e), fe.fromObject(t)).map((a) => a.val).join("");
  }
  static resetCache() {
    Yt = void 0, zn.clear();
  }
  // INFO
  /**
   * Get the value of unit.
   * @param {string} unit - a unit such as 'minute' or 'day'
   * @example DateTime.local(2017, 7, 4).get('month'); //=> 7
   * @example DateTime.local(2017, 7, 4).get('day'); //=> 4
   * @return {number}
   */
  get(e) {
    return this[e];
  }
  /**
   * Returns whether the DateTime is valid. Invalid DateTimes occur when:
   * * The DateTime was created from invalid calendar information, such as the 13th month or February 30
   * * The DateTime was created by an operation on another invalid date
   * @type {boolean}
   */
  get isValid() {
    return this.invalid === null;
  }
  /**
   * Returns an error code if this DateTime is invalid, or null if the DateTime is valid
   * @type {string}
   */
  get invalidReason() {
    return this.invalid ? this.invalid.reason : null;
  }
  /**
   * Returns an explanation of why this DateTime became invalid, or null if the DateTime is valid
   * @type {string}
   */
  get invalidExplanation() {
    return this.invalid ? this.invalid.explanation : null;
  }
  /**
   * Get the locale of a DateTime, such 'en-GB'. The locale is used when formatting the DateTime
   *
   * @type {string}
   */
  get locale() {
    return this.isValid ? this.loc.locale : null;
  }
  /**
   * Get the numbering system of a DateTime, such 'beng'. The numbering system is used when formatting the DateTime
   *
   * @type {string}
   */
  get numberingSystem() {
    return this.isValid ? this.loc.numberingSystem : null;
  }
  /**
   * Get the output calendar of a DateTime, such 'islamic'. The output calendar is used when formatting the DateTime
   *
   * @type {string}
   */
  get outputCalendar() {
    return this.isValid ? this.loc.outputCalendar : null;
  }
  /**
   * Get the time zone associated with this DateTime.
   * @type {Zone}
   */
  get zone() {
    return this._zone;
  }
  /**
   * Get the name of the time zone.
   * @type {string}
   */
  get zoneName() {
    return this.isValid ? this.zone.name : null;
  }
  /**
   * Get the year
   * @example DateTime.local(2017, 5, 25).year //=> 2017
   * @type {number}
   */
  get year() {
    return this.isValid ? this.c.year : NaN;
  }
  /**
   * Get the quarter
   * @example DateTime.local(2017, 5, 25).quarter //=> 2
   * @type {number}
   */
  get quarter() {
    return this.isValid ? Math.ceil(this.c.month / 3) : NaN;
  }
  /**
   * Get the month (1-12).
   * @example DateTime.local(2017, 5, 25).month //=> 5
   * @type {number}
   */
  get month() {
    return this.isValid ? this.c.month : NaN;
  }
  /**
   * Get the day of the month (1-30ish).
   * @example DateTime.local(2017, 5, 25).day //=> 25
   * @type {number}
   */
  get day() {
    return this.isValid ? this.c.day : NaN;
  }
  /**
   * Get the hour of the day (0-23).
   * @example DateTime.local(2017, 5, 25, 9).hour //=> 9
   * @type {number}
   */
  get hour() {
    return this.isValid ? this.c.hour : NaN;
  }
  /**
   * Get the minute of the hour (0-59).
   * @example DateTime.local(2017, 5, 25, 9, 30).minute //=> 30
   * @type {number}
   */
  get minute() {
    return this.isValid ? this.c.minute : NaN;
  }
  /**
   * Get the second of the minute (0-59).
   * @example DateTime.local(2017, 5, 25, 9, 30, 52).second //=> 52
   * @type {number}
   */
  get second() {
    return this.isValid ? this.c.second : NaN;
  }
  /**
   * Get the millisecond of the second (0-999).
   * @example DateTime.local(2017, 5, 25, 9, 30, 52, 654).millisecond //=> 654
   * @type {number}
   */
  get millisecond() {
    return this.isValid ? this.c.millisecond : NaN;
  }
  /**
   * Get the week year
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2014, 12, 31).weekYear //=> 2015
   * @type {number}
   */
  get weekYear() {
    return this.isValid ? pn(this).weekYear : NaN;
  }
  /**
   * Get the week number of the week year (1-52ish).
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2017, 5, 25).weekNumber //=> 21
   * @type {number}
   */
  get weekNumber() {
    return this.isValid ? pn(this).weekNumber : NaN;
  }
  /**
   * Get the day of the week.
   * 1 is Monday and 7 is Sunday
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2014, 11, 31).weekday //=> 4
   * @type {number}
   */
  get weekday() {
    return this.isValid ? pn(this).weekday : NaN;
  }
  /**
   * Returns true if this date is on a weekend according to the locale, false otherwise
   * @returns {boolean}
   */
  get isWeekend() {
    return this.isValid && this.loc.getWeekendDays().includes(this.weekday);
  }
  /**
   * Get the day of the week according to the locale.
   * 1 is the first day of the week and 7 is the last day of the week.
   * If the locale assigns Sunday as the first day of the week, then a date which is a Sunday will return 1,
   * @returns {number}
   */
  get localWeekday() {
    return this.isValid ? kn(this).weekday : NaN;
  }
  /**
   * Get the week number of the week year according to the locale. Different locales assign week numbers differently,
   * because the week can start on different days of the week (see localWeekday) and because a different number of days
   * is required for a week to count as the first week of a year.
   * @returns {number}
   */
  get localWeekNumber() {
    return this.isValid ? kn(this).weekNumber : NaN;
  }
  /**
   * Get the week year according to the locale. Different locales assign week numbers (and therefor week years)
   * differently, see localWeekNumber.
   * @returns {number}
   */
  get localWeekYear() {
    return this.isValid ? kn(this).weekYear : NaN;
  }
  /**
   * Get the ordinal (meaning the day of the year)
   * @example DateTime.local(2017, 5, 25).ordinal //=> 145
   * @type {number|DateTime}
   */
  get ordinal() {
    return this.isValid ? gn(this.c).ordinal : NaN;
  }
  /**
   * Get the human readable short month name, such as 'Oct'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).monthShort //=> Oct
   * @type {string}
   */
  get monthShort() {
    return this.isValid ? xt.months("short", { locObj: this.loc })[this.month - 1] : null;
  }
  /**
   * Get the human readable long month name, such as 'October'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).monthLong //=> October
   * @type {string}
   */
  get monthLong() {
    return this.isValid ? xt.months("long", { locObj: this.loc })[this.month - 1] : null;
  }
  /**
   * Get the human readable short weekday, such as 'Mon'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).weekdayShort //=> Mon
   * @type {string}
   */
  get weekdayShort() {
    return this.isValid ? xt.weekdays("short", { locObj: this.loc })[this.weekday - 1] : null;
  }
  /**
   * Get the human readable long weekday, such as 'Monday'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).weekdayLong //=> Monday
   * @type {string}
   */
  get weekdayLong() {
    return this.isValid ? xt.weekdays("long", { locObj: this.loc })[this.weekday - 1] : null;
  }
  /**
   * Get the UTC offset of this DateTime in minutes
   * @example DateTime.now().offset //=> -240
   * @example DateTime.utc().offset //=> 0
   * @type {number}
   */
  get offset() {
    return this.isValid ? +this.o : NaN;
  }
  /**
   * Get the short human name for the zone's current offset, for example "EST" or "EDT".
   * Defaults to the system's locale if no locale has been specified
   * @type {string}
   */
  get offsetNameShort() {
    return this.isValid ? this.zone.offsetName(this.ts, {
      format: "short",
      locale: this.locale
    }) : null;
  }
  /**
   * Get the long human name for the zone's current offset, for example "Eastern Standard Time" or "Eastern Daylight Time".
   * Defaults to the system's locale if no locale has been specified
   * @type {string}
   */
  get offsetNameLong() {
    return this.isValid ? this.zone.offsetName(this.ts, {
      format: "long",
      locale: this.locale
    }) : null;
  }
  /**
   * Get whether this zone's offset ever changes, as in a DST.
   * @type {boolean}
   */
  get isOffsetFixed() {
    return this.isValid ? this.zone.isUniversal : null;
  }
  /**
   * Get whether the DateTime is in a DST.
   * @type {boolean}
   */
  get isInDST() {
    return this.isOffsetFixed ? !1 : this.offset > this.set({ month: 1, day: 1 }).offset || this.offset > this.set({ month: 5 }).offset;
  }
  /**
   * Get those DateTimes which have the same local time as this DateTime, but a different offset from UTC
   * in this DateTime's zone. During DST changes local time can be ambiguous, for example
   * `2023-10-29T02:30:00` in `Europe/Berlin` can have offset `+01:00` or `+02:00`.
   * This method will return both possible DateTimes if this DateTime's local time is ambiguous.
   * @returns {DateTime[]}
   */
  getPossibleOffsets() {
    if (!this.isValid || this.isOffsetFixed)
      return [this];
    const e = 864e5, t = 6e4, s = cn(this.c), a = this.zone.offset(s - e), r = this.zone.offset(s + e), l = this.zone.offset(s - a * t), i = this.zone.offset(s - r * t);
    if (l === i)
      return [this];
    const c = s - l * t, w = s - i * t, v = qt(c, l), f = qt(w, i);
    return v.hour === f.hour && v.minute === f.minute && v.second === f.second && v.millisecond === f.millisecond ? [ft(this, { ts: c }), ft(this, { ts: w })] : [this];
  }
  /**
   * Returns true if this DateTime is in a leap year, false otherwise
   * @example DateTime.local(2016).isInLeapYear //=> true
   * @example DateTime.local(2013).isInLeapYear //=> false
   * @type {boolean}
   */
  get isInLeapYear() {
    return At(this.year);
  }
  /**
   * Returns the number of days in this DateTime's month
   * @example DateTime.local(2016, 2).daysInMonth //=> 29
   * @example DateTime.local(2016, 3).daysInMonth //=> 31
   * @type {number}
   */
  get daysInMonth() {
    return an(this.year, this.month);
  }
  /**
   * Returns the number of days in this DateTime's year
   * @example DateTime.local(2016).daysInYear //=> 366
   * @example DateTime.local(2013).daysInYear //=> 365
   * @type {number}
   */
  get daysInYear() {
    return this.isValid ? Mt(this.year) : NaN;
  }
  /**
   * Returns the number of weeks in this DateTime's year
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2004).weeksInWeekYear //=> 53
   * @example DateTime.local(2013).weeksInWeekYear //=> 52
   * @type {number}
   */
  get weeksInWeekYear() {
    return this.isValid ? Wt(this.weekYear) : NaN;
  }
  /**
   * Returns the number of weeks in this DateTime's local week year
   * @example DateTime.local(2020, 6, {locale: 'en-US'}).weeksInLocalWeekYear //=> 52
   * @example DateTime.local(2020, 6, {locale: 'de-DE'}).weeksInLocalWeekYear //=> 53
   * @type {number}
   */
  get weeksInLocalWeekYear() {
    return this.isValid ? Wt(
      this.localWeekYear,
      this.loc.getMinDaysInFirstWeek(),
      this.loc.getStartOfWeek()
    ) : NaN;
  }
  /**
   * Returns the resolved Intl options for this DateTime.
   * This is useful in understanding the behavior of formatting methods
   * @param {Object} opts - the same options as toLocaleString
   * @return {Object}
   */
  resolvedLocaleOptions(e = {}) {
    const { locale: t, numberingSystem: s, calendar: a } = _e.create(
      this.loc.clone(e),
      e
    ).resolvedOptions(this);
    return { locale: t, numberingSystem: s, outputCalendar: a };
  }
  // TRANSFORM
  /**
   * "Set" the DateTime's zone to UTC. Returns a newly-constructed DateTime.
   *
   * Equivalent to {@link DateTime#setZone}('utc')
   * @param {number} [offset=0] - optionally, an offset from UTC in minutes
   * @param {Object} [opts={}] - options to pass to `setZone()`
   * @return {DateTime}
   */
  toUTC(e = 0, t = {}) {
    return this.setZone(Ie.instance(e), t);
  }
  /**
   * "Set" the DateTime's zone to the host's local zone. Returns a newly-constructed DateTime.
   *
   * Equivalent to `setZone('local')`
   * @return {DateTime}
   */
  toLocal() {
    return this.setZone(Te.defaultZone);
  }
  /**
   * "Set" the DateTime's zone to specified zone. Returns a newly-constructed DateTime.
   *
   * By default, the setter keeps the underlying time the same (as in, the same timestamp), but the new instance will report different local times and consider DSTs when making computations, as with {@link DateTime#plus}. You may wish to use {@link DateTime#toLocal} and {@link DateTime#toUTC} which provide simple convenience wrappers for commonly used zones.
   * @param {string|Zone} [zone='local'] - a zone identifier. As a string, that can be any IANA zone supported by the host environment, or a fixed-offset name of the form 'UTC+3', or the strings 'local' or 'utc'. You may also supply an instance of a {@link DateTime#Zone} class.
   * @param {Object} opts - options
   * @param {boolean} [opts.keepLocalTime=false] - If true, adjust the underlying time so that the local time stays the same, but in the target zone. You should rarely need this.
   * @return {DateTime}
   */
  setZone(e, { keepLocalTime: t = !1, keepCalendarTime: s = !1 } = {}) {
    if (e = it(e, Te.defaultZone), e.equals(this.zone))
      return this;
    if (e.isValid) {
      let a = this.ts;
      if (t || s) {
        const r = e.offset(this.ts), l = this.toObject();
        [a] = Jt(l, r, e);
      }
      return ft(this, { ts: a, zone: e });
    } else
      return x.invalid(Vt(e));
  }
  /**
   * "Set" the locale, numberingSystem, or outputCalendar. Returns a newly-constructed DateTime.
   * @param {Object} properties - the properties to set
   * @example DateTime.local(2017, 5, 25).reconfigure({ locale: 'en-GB' })
   * @return {DateTime}
   */
  reconfigure({ locale: e, numberingSystem: t, outputCalendar: s } = {}) {
    const a = this.loc.clone({ locale: e, numberingSystem: t, outputCalendar: s });
    return ft(this, { loc: a });
  }
  /**
   * "Set" the locale. Returns a newly-constructed DateTime.
   * Just a convenient alias for reconfigure({ locale })
   * @example DateTime.local(2017, 5, 25).setLocale('en-GB')
   * @return {DateTime}
   */
  setLocale(e) {
    return this.reconfigure({ locale: e });
  }
  /**
   * "Set" the values of specified units. Returns a newly-constructed DateTime.
   * You can only set units with this method; for "setting" metadata, see {@link DateTime#reconfigure} and {@link DateTime#setZone}.
   *
   * This method also supports setting locale-based week units, i.e. `localWeekday`, `localWeekNumber` and `localWeekYear`.
   * They cannot be mixed with ISO-week units like `weekday`.
   * @param {Object} values - a mapping of units to numbers
   * @example dt.set({ year: 2017 })
   * @example dt.set({ hour: 8, minute: 30 })
   * @example dt.set({ weekday: 5 })
   * @example dt.set({ year: 2005, ordinal: 234 })
   * @return {DateTime}
   */
  set(e) {
    if (!this.isValid) return this;
    const t = rn(e, Ts), { minDaysInFirstWeek: s, startOfWeek: a } = ls(t, this.loc), r = !G(t.weekYear) || !G(t.weekNumber) || !G(t.weekday), l = !G(t.ordinal), i = !G(t.year), c = !G(t.month) || !G(t.day), w = i || c, v = t.weekYear || t.weekNumber;
    if ((w || l) && v)
      throw new Tt(
        "Can't mix weekYear/weekNumber units with year/month/day or ordinals"
      );
    if (c && l)
      throw new Tt("Can't mix ordinal dates with month/day");
    let f;
    r ? f = is(
      { ...sn(this.c, s, a), ...t },
      s,
      a
    ) : G(t.ordinal) ? (f = { ...this.toObject(), ...t }, G(t.day) && (f.day = Math.min(an(f.year, f.month), f.day))) : f = os({ ...gn(this.c), ...t });
    const [E, k] = Jt(f, this.o, this.zone);
    return ft(this, { ts: E, o: k });
  }
  /**
   * Add a period of time to this DateTime and return the resulting DateTime
   *
   * Adding hours, minutes, seconds, or milliseconds increases the timestamp by the right number of milliseconds. Adding days, months, or years shifts the calendar, accounting for DSTs and leap years along the way. Thus, `dt.plus({ hours: 24 })` may result in a different time than `dt.plus({ days: 1 })` if there's a DST shift in between.
   * @param {Duration|Object|number} duration - The amount to add. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   * @example DateTime.now().plus(123) //~> in 123 milliseconds
   * @example DateTime.now().plus({ minutes: 15 }) //~> in 15 minutes
   * @example DateTime.now().plus({ days: 1 }) //~> this time tomorrow
   * @example DateTime.now().plus({ days: -1 }) //~> this time yesterday
   * @example DateTime.now().plus({ hours: 3, minutes: 13 }) //~> in 3 hr, 13 min
   * @example DateTime.now().plus(Duration.fromObject({ hours: 3, minutes: 13 })) //~> in 3 hr, 13 min
   * @return {DateTime}
   */
  plus(e) {
    if (!this.isValid) return this;
    const t = ce.fromDurationLike(e);
    return ft(this, ps(this, t));
  }
  /**
   * Subtract a period of time to this DateTime and return the resulting DateTime
   * See {@link DateTime#plus}
   * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   @return {DateTime}
   */
  minus(e) {
    if (!this.isValid) return this;
    const t = ce.fromDurationLike(e).negate();
    return ft(this, ps(this, t));
  }
  /**
   * "Set" this DateTime to the beginning of a unit of time.
   * @param {string} unit - The unit to go to the beginning of. Can be 'year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', or 'millisecond'.
   * @param {Object} opts - options
   * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week
   * @example DateTime.local(2014, 3, 3).startOf('month').toISODate(); //=> '2014-03-01'
   * @example DateTime.local(2014, 3, 3).startOf('year').toISODate(); //=> '2014-01-01'
   * @example DateTime.local(2014, 3, 3).startOf('week').toISODate(); //=> '2014-03-03', weeks always start on Mondays
   * @example DateTime.local(2014, 3, 3, 5, 30).startOf('day').toISOTime(); //=> '00:00.000-05:00'
   * @example DateTime.local(2014, 3, 3, 5, 30).startOf('hour').toISOTime(); //=> '05:00:00.000-05:00'
   * @return {DateTime}
   */
  startOf(e, { useLocaleWeeks: t = !1 } = {}) {
    if (!this.isValid) return this;
    const s = {}, a = ce.normalizeUnit(e);
    switch (a) {
      case "years":
        s.month = 1;
      // falls through
      case "quarters":
      case "months":
        s.day = 1;
      // falls through
      case "weeks":
      case "days":
        s.hour = 0;
      // falls through
      case "hours":
        s.minute = 0;
      // falls through
      case "minutes":
        s.second = 0;
      // falls through
      case "seconds":
        s.millisecond = 0;
        break;
    }
    if (a === "weeks")
      if (t) {
        const r = this.loc.getStartOfWeek(), { weekday: l } = this;
        l < r && (s.weekNumber = this.weekNumber - 1), s.weekday = r;
      } else
        s.weekday = 1;
    if (a === "quarters") {
      const r = Math.ceil(this.month / 3);
      s.month = (r - 1) * 3 + 1;
    }
    return this.set(s);
  }
  /**
   * "Set" this DateTime to the end (meaning the last millisecond) of a unit of time
   * @param {string} unit - The unit to go to the end of. Can be 'year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', or 'millisecond'.
   * @param {Object} opts - options
   * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week
   * @example DateTime.local(2014, 3, 3).endOf('month').toISO(); //=> '2014-03-31T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3).endOf('year').toISO(); //=> '2014-12-31T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3).endOf('week').toISO(); // => '2014-03-09T23:59:59.999-05:00', weeks start on Mondays
   * @example DateTime.local(2014, 3, 3, 5, 30).endOf('day').toISO(); //=> '2014-03-03T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3, 5, 30).endOf('hour').toISO(); //=> '2014-03-03T05:59:59.999-05:00'
   * @return {DateTime}
   */
  endOf(e, t) {
    return this.isValid ? this.plus({ [e]: 1 }).startOf(e, t).minus(1) : this;
  }
  // OUTPUT
  /**
   * Returns a string representation of this DateTime formatted according to the specified format string.
   * **You may not want this.** See {@link DateTime#toLocaleString} for a more flexible formatting tool. For a table of tokens and their interpretations, see [here](https://moment.github.io/luxon/#/formatting?id=table-of-tokens).
   * Defaults to en-US if no locale has been specified, regardless of the system's locale.
   * @param {string} fmt - the format string
   * @param {Object} opts - opts to override the configuration options on this DateTime
   * @example DateTime.now().toFormat('yyyy LLL dd') //=> '2017 Apr 22'
   * @example DateTime.now().setLocale('fr').toFormat('yyyy LLL dd') //=> '2017 avr. 22'
   * @example DateTime.now().toFormat('yyyy LLL dd', { locale: "fr" }) //=> '2017 avr. 22'
   * @example DateTime.now().toFormat("HH 'hours and' mm 'minutes'") //=> '20 hours and 55 minutes'
   * @return {string}
   */
  toFormat(e, t = {}) {
    return this.isValid ? _e.create(this.loc.redefaultToEN(t)).formatDateTimeFromString(this, e) : Dn;
  }
  /**
   * Returns a localized string representing this date. Accepts the same options as the Intl.DateTimeFormat constructor and any presets defined by Luxon, such as `DateTime.DATE_FULL` or `DateTime.TIME_SIMPLE`.
   * The exact behavior of this method is browser-specific, but in general it will return an appropriate representation
   * of the DateTime in the assigned locale.
   * Defaults to the system's locale if no locale has been specified
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param formatOpts {Object} - Intl.DateTimeFormat constructor options and configuration options
   * @param {Object} opts - opts to override the configuration options on this DateTime
   * @example DateTime.now().toLocaleString(); //=> 4/20/2017
   * @example DateTime.now().setLocale('en-gb').toLocaleString(); //=> '20/04/2017'
   * @example DateTime.now().toLocaleString(DateTime.DATE_FULL); //=> 'April 20, 2017'
   * @example DateTime.now().toLocaleString(DateTime.DATE_FULL, { locale: 'fr' }); //=> '28 août 2022'
   * @example DateTime.now().toLocaleString(DateTime.TIME_SIMPLE); //=> '11:32 AM'
   * @example DateTime.now().toLocaleString(DateTime.DATETIME_SHORT); //=> '4/20/2017, 11:32 AM'
   * @example DateTime.now().toLocaleString({ weekday: 'long', month: 'long', day: '2-digit' }); //=> 'Thursday, April 20'
   * @example DateTime.now().toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }); //=> 'Thu, Apr 20, 11:27 AM'
   * @example DateTime.now().toLocaleString({ hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }); //=> '11:32'
   * @return {string}
   */
  toLocaleString(e = nn, t = {}) {
    return this.isValid ? _e.create(this.loc.clone(t), e).formatDateTime(this) : Dn;
  }
  /**
   * Returns an array of format "parts", meaning individual tokens along with metadata. This is allows callers to post-process individual sections of the formatted output.
   * Defaults to the system's locale if no locale has been specified
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat/formatToParts
   * @param opts {Object} - Intl.DateTimeFormat constructor options, same as `toLocaleString`.
   * @example DateTime.now().toLocaleParts(); //=> [
   *                                   //=>   { type: 'day', value: '25' },
   *                                   //=>   { type: 'literal', value: '/' },
   *                                   //=>   { type: 'month', value: '05' },
   *                                   //=>   { type: 'literal', value: '/' },
   *                                   //=>   { type: 'year', value: '1982' }
   *                                   //=> ]
   */
  toLocaleParts(e = {}) {
    return this.isValid ? _e.create(this.loc.clone(e), e).formatDateTimeParts(this) : [];
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime
   * @param {Object} opts - options
   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {boolean} [opts.extendedZone=false] - add the time zone format extension
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @param {string} [opts.precision='milliseconds'] - truncate output to desired presicion: 'years', 'months', 'days', 'hours', 'minutes', 'seconds' or 'milliseconds'. When precision and suppressSeconds or suppressMilliseconds are used together, precision sets the maximum unit shown in the output, however seconds or milliseconds will still be suppressed if they are 0.
   * @example DateTime.utc(1983, 5, 25).toISO() //=> '1982-05-25T00:00:00.000Z'
   * @example DateTime.now().toISO() //=> '2017-04-22T20:47:05.335-04:00'
   * @example DateTime.now().toISO({ includeOffset: false }) //=> '2017-04-22T20:47:05.335'
   * @example DateTime.now().toISO({ format: 'basic' }) //=> '20170422T204705.335-0400'
   * @example DateTime.now().toISO({ precision: 'day' }) //=> '2017-04-22Z'
   * @example DateTime.now().toISO({ precision: 'minute' }) //=> '2017-04-22T20:47Z'
   * @return {string|null}
   */
  toISO({
    format: e = "extended",
    suppressSeconds: t = !1,
    suppressMilliseconds: s = !1,
    includeOffset: a = !0,
    extendedZone: r = !1,
    precision: l = "milliseconds"
  } = {}) {
    if (!this.isValid)
      return null;
    l = Gt(l);
    const i = e === "extended";
    let c = Tn(this, i, l);
    return Xt.indexOf(l) >= 3 && (c += "T"), c += ks(
      this,
      i,
      t,
      s,
      a,
      r,
      l
    ), c;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's date component
   * @param {Object} opts - options
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @param {string} [opts.precision='day'] - truncate output to desired precision: 'years', 'months', or 'days'.
   * @example DateTime.utc(1982, 5, 25).toISODate() //=> '1982-05-25'
   * @example DateTime.utc(1982, 5, 25).toISODate({ format: 'basic' }) //=> '19820525'
   * @example DateTime.utc(1982, 5, 25).toISODate({ precision: 'month' }) //=> '1982-05'
   * @return {string|null}
   */
  toISODate({ format: e = "extended", precision: t = "day" } = {}) {
    return this.isValid ? Tn(this, e === "extended", Gt(t)) : null;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's week date
   * @example DateTime.utc(1982, 5, 25).toISOWeekDate() //=> '1982-W21-2'
   * @return {string}
   */
  toISOWeekDate() {
    return Ut(this, "kkkk-'W'WW-c");
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's time component
   * @param {Object} opts - options
   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {boolean} [opts.extendedZone=true] - add the time zone format extension
   * @param {boolean} [opts.includePrefix=false] - include the `T` prefix
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @param {string} [opts.precision='milliseconds'] - truncate output to desired presicion: 'hours', 'minutes', 'seconds' or 'milliseconds'. When precision and suppressSeconds or suppressMilliseconds are used together, precision sets the maximum unit shown in the output, however seconds or milliseconds will still be suppressed if they are 0.
   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime() //=> '07:34:19.361Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34, seconds: 0, milliseconds: 0 }).toISOTime({ suppressSeconds: true }) //=> '07:34Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime({ format: 'basic' }) //=> '073419.361Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime({ includePrefix: true }) //=> 'T07:34:19.361Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34, second: 56 }).toISOTime({ precision: 'minute' }) //=> '07:34Z'
   * @return {string}
   */
  toISOTime({
    suppressMilliseconds: e = !1,
    suppressSeconds: t = !1,
    includeOffset: s = !0,
    includePrefix: a = !1,
    extendedZone: r = !1,
    format: l = "extended",
    precision: i = "milliseconds"
  } = {}) {
    return this.isValid ? (i = Gt(i), (a && Xt.indexOf(i) >= 3 ? "T" : "") + ks(
      this,
      l === "extended",
      t,
      e,
      s,
      r,
      i
    )) : null;
  }
  /**
   * Returns an RFC 2822-compatible string representation of this DateTime
   * @example DateTime.utc(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 +0000'
   * @example DateTime.local(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 -0400'
   * @return {string}
   */
  toRFC2822() {
    return Ut(this, "EEE, dd LLL yyyy HH:mm:ss ZZZ", !1);
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in HTTP headers. The output is always expressed in GMT.
   * Specifically, the string conforms to RFC 1123.
   * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
   * @example DateTime.utc(2014, 7, 13).toHTTP() //=> 'Sun, 13 Jul 2014 00:00:00 GMT'
   * @example DateTime.utc(2014, 7, 13, 19).toHTTP() //=> 'Sun, 13 Jul 2014 19:00:00 GMT'
   * @return {string}
   */
  toHTTP() {
    return Ut(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in SQL Date
   * @example DateTime.utc(2014, 7, 13).toSQLDate() //=> '2014-07-13'
   * @return {string|null}
   */
  toSQLDate() {
    return this.isValid ? Tn(this, !0) : null;
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in SQL Time
   * @param {Object} opts - options
   * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {boolean} [opts.includeOffsetSpace=true] - include the space between the time and the offset, such as '05:15:16.345 -04:00'
   * @example DateTime.utc().toSQL() //=> '05:15:16.345'
   * @example DateTime.now().toSQL() //=> '05:15:16.345 -04:00'
   * @example DateTime.now().toSQL({ includeOffset: false }) //=> '05:15:16.345'
   * @example DateTime.now().toSQL({ includeZone: false }) //=> '05:15:16.345 America/New_York'
   * @return {string}
   */
  toSQLTime({ includeOffset: e = !0, includeZone: t = !1, includeOffsetSpace: s = !0 } = {}) {
    let a = "HH:mm:ss.SSS";
    return (t || e) && (s && (a += " "), t ? a += "z" : e && (a += "ZZ")), Ut(this, a, !0);
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in SQL DateTime
   * @param {Object} opts - options
   * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {boolean} [opts.includeOffsetSpace=true] - include the space between the time and the offset, such as '05:15:16.345 -04:00'
   * @example DateTime.utc(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 Z'
   * @example DateTime.local(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 -04:00'
   * @example DateTime.local(2014, 7, 13).toSQL({ includeOffset: false }) //=> '2014-07-13 00:00:00.000'
   * @example DateTime.local(2014, 7, 13).toSQL({ includeZone: true }) //=> '2014-07-13 00:00:00.000 America/New_York'
   * @return {string}
   */
  toSQL(e = {}) {
    return this.isValid ? `${this.toSQLDate()} ${this.toSQLTime(e)}` : null;
  }
  /**
   * Returns a string representation of this DateTime appropriate for debugging
   * @return {string}
   */
  toString() {
    return this.isValid ? this.toISO() : Dn;
  }
  /**
   * Returns a string representation of this DateTime appropriate for the REPL.
   * @return {string}
   */
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.isValid ? `DateTime { ts: ${this.toISO()}, zone: ${this.zone.name}, locale: ${this.locale} }` : `DateTime { Invalid, reason: ${this.invalidReason} }`;
  }
  /**
   * Returns the epoch milliseconds of this DateTime. Alias of {@link DateTime#toMillis}
   * @return {number}
   */
  valueOf() {
    return this.toMillis();
  }
  /**
   * Returns the epoch milliseconds of this DateTime.
   * @return {number}
   */
  toMillis() {
    return this.isValid ? this.ts : NaN;
  }
  /**
   * Returns the epoch seconds (including milliseconds in the fractional part) of this DateTime.
   * @return {number}
   */
  toSeconds() {
    return this.isValid ? this.ts / 1e3 : NaN;
  }
  /**
   * Returns the epoch seconds (as a whole number) of this DateTime.
   * @return {number}
   */
  toUnixInteger() {
    return this.isValid ? Math.floor(this.ts / 1e3) : NaN;
  }
  /**
   * Returns an ISO 8601 representation of this DateTime appropriate for use in JSON.
   * @return {string}
   */
  toJSON() {
    return this.toISO();
  }
  /**
   * Returns a BSON serializable equivalent to this DateTime.
   * @return {Date}
   */
  toBSON() {
    return this.toJSDate();
  }
  /**
   * Returns a JavaScript object with this DateTime's year, month, day, and so on.
   * @param opts - options for generating the object
   * @param {boolean} [opts.includeConfig=false] - include configuration attributes in the output
   * @example DateTime.now().toObject() //=> { year: 2017, month: 4, day: 22, hour: 20, minute: 49, second: 42, millisecond: 268 }
   * @return {Object}
   */
  toObject(e = {}) {
    if (!this.isValid) return {};
    const t = { ...this.c };
    return e.includeConfig && (t.outputCalendar = this.outputCalendar, t.numberingSystem = this.loc.numberingSystem, t.locale = this.loc.locale), t;
  }
  /**
   * Returns a JavaScript Date equivalent to this DateTime.
   * @return {Date}
   */
  toJSDate() {
    return new Date(this.isValid ? this.ts : NaN);
  }
  // COMPARE
  /**
   * Return the difference between two DateTimes as a Duration.
   * @param {DateTime} otherDateTime - the DateTime to compare this one to
   * @param {string|string[]} [unit=['milliseconds']] - the unit or array of units (such as 'hours' or 'days') to include in the duration.
   * @param {Object} opts - options that affect the creation of the Duration
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @example
   * var i1 = DateTime.fromISO('1982-05-25T09:45'),
   *     i2 = DateTime.fromISO('1983-10-14T10:30');
   * i2.diff(i1).toObject() //=> { milliseconds: 43807500000 }
   * i2.diff(i1, 'hours').toObject() //=> { hours: 12168.75 }
   * i2.diff(i1, ['months', 'days']).toObject() //=> { months: 16, days: 19.03125 }
   * i2.diff(i1, ['months', 'days', 'hours']).toObject() //=> { months: 16, days: 19, hours: 0.75 }
   * @return {Duration}
   */
  diff(e, t = "milliseconds", s = {}) {
    if (!this.isValid || !e.isValid)
      return ce.invalid("created by diffing an invalid DateTime");
    const a = { locale: this.locale, numberingSystem: this.numberingSystem, ...s }, r = Nr(t).map(ce.normalizeUnit), l = e.valueOf() > this.valueOf(), i = l ? this : e, c = l ? e : this, w = Vi(i, c, r, a);
    return l ? w.negate() : w;
  }
  /**
   * Return the difference between this DateTime and right now.
   * See {@link DateTime#diff}
   * @param {string|string[]} [unit=['milliseconds']] - the unit or units units (such as 'hours' or 'days') to include in the duration
   * @param {Object} opts - options that affect the creation of the Duration
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @return {Duration}
   */
  diffNow(e = "milliseconds", t = {}) {
    return this.diff(x.now(), e, t);
  }
  /**
   * Return an Interval spanning between this DateTime and another DateTime
   * @param {DateTime} otherDateTime - the other end point of the Interval
   * @return {Interval|DateTime}
   */
  until(e) {
    return this.isValid ? ke.fromDateTimes(this, e) : this;
  }
  /**
   * Return whether this DateTime is in the same unit of time as another DateTime.
   * Higher-order units must also be identical for this function to return `true`.
   * Note that time zones are **ignored** in this comparison, which compares the **local** calendar time. Use {@link DateTime#setZone} to convert one of the dates if needed.
   * @param {DateTime} otherDateTime - the other DateTime
   * @param {string} unit - the unit of time to check sameness on
   * @param {Object} opts - options
   * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week; only the locale of this DateTime is used
   * @example DateTime.now().hasSame(otherDT, 'day'); //~> true if otherDT is in the same current calendar day
   * @return {boolean}
   */
  hasSame(e, t, s) {
    if (!this.isValid) return !1;
    const a = e.valueOf(), r = this.setZone(e.zone, { keepLocalTime: !0 });
    return r.startOf(t, s) <= a && a <= r.endOf(t, s);
  }
  /**
   * Equality check
   * Two DateTimes are equal if and only if they represent the same millisecond, have the same zone and location, and are both valid.
   * To compare just the millisecond values, use `+dt1 === +dt2`.
   * @param {DateTime} other - the other DateTime
   * @return {boolean}
   */
  equals(e) {
    return this.isValid && e.isValid && this.valueOf() === e.valueOf() && this.zone.equals(e.zone) && this.loc.equals(e.loc);
  }
  /**
   * Returns a string representation of a this time relative to now, such as "in two days". Can only internationalize if your
   * platform supports Intl.RelativeTimeFormat. Rounds towards zero by default.
   * @param {Object} options - options that affect the output
   * @param {DateTime} [options.base=DateTime.now()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
   * @param {string} [options.style="long"] - the style of units, must be "long", "short", or "narrow"
   * @param {string|string[]} options.unit - use a specific unit or array of units; if omitted, or an array, the method will pick the best unit. Use an array or one of "years", "quarters", "months", "weeks", "days", "hours", "minutes", or "seconds"
   * @param {boolean} [options.round=true] - whether to round the numbers in the output.
   * @param {string} [options.rounding="trunc"] - rounding method to use when rounding the numbers in the output. Can be "trunc" (toward zero), "expand" (away from zero), "round", "floor", or "ceil".
   * @param {number} [options.padding=0] - padding in milliseconds. This allows you to round up the result if it fits inside the threshold. Don't use in combination with {round: false} because the decimal output will include the padding.
   * @param {string} options.locale - override the locale of this DateTime
   * @param {string} options.numberingSystem - override the numberingSystem of this DateTime. The Intl system may choose not to honor this
   * @example DateTime.now().plus({ days: 1 }).toRelative() //=> "in 1 day"
   * @example DateTime.now().setLocale("es").toRelative({ days: 1 }) //=> "dentro de 1 día"
   * @example DateTime.now().plus({ days: 1 }).toRelative({ locale: "fr" }) //=> "dans 23 heures"
   * @example DateTime.now().minus({ days: 2 }).toRelative() //=> "2 days ago"
   * @example DateTime.now().minus({ days: 2 }).toRelative({ unit: "hours" }) //=> "48 hours ago"
   * @example DateTime.now().minus({ hours: 36 }).toRelative({ round: false }) //=> "1.5 days ago"
   */
  toRelative(e = {}) {
    if (!this.isValid) return null;
    const t = e.base || x.fromObject({}, { zone: this.zone }), s = e.padding ? this < t ? -e.padding : e.padding : 0;
    let a = ["years", "months", "days", "hours", "minutes", "seconds"], r = e.unit;
    return Array.isArray(e.unit) && (a = e.unit, r = void 0), Ss(t, this.plus(s), {
      ...e,
      numeric: "always",
      units: a,
      unit: r
    });
  }
  /**
   * Returns a string representation of this date relative to today, such as "yesterday" or "next month".
   * Only internationalizes on platforms that supports Intl.RelativeTimeFormat.
   * @param {Object} options - options that affect the output
   * @param {DateTime} [options.base=DateTime.now()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
   * @param {string} options.locale - override the locale of this DateTime
   * @param {string} options.unit - use a specific unit; if omitted, the method will pick the unit. Use one of "years", "quarters", "months", "weeks", or "days"
   * @param {string} options.numberingSystem - override the numberingSystem of this DateTime. The Intl system may choose not to honor this
   * @example DateTime.now().plus({ days: 1 }).toRelativeCalendar() //=> "tomorrow"
   * @example DateTime.now().setLocale("es").plus({ days: 1 }).toRelative() //=> ""mañana"
   * @example DateTime.now().plus({ days: 1 }).toRelativeCalendar({ locale: "fr" }) //=> "demain"
   * @example DateTime.now().minus({ days: 2 }).toRelativeCalendar() //=> "2 days ago"
   */
  toRelativeCalendar(e = {}) {
    return this.isValid ? Ss(e.base || x.fromObject({}, { zone: this.zone }), this, {
      ...e,
      numeric: "auto",
      units: ["years", "months", "days"],
      calendary: !0
    }) : null;
  }
  /**
   * Return the min of several date times
   * @param {...DateTime} dateTimes - the DateTimes from which to choose the minimum
   * @return {DateTime} the min DateTime, or undefined if called with no argument
   */
  static min(...e) {
    if (!e.every(x.isDateTime))
      throw new Ce("min requires all arguments be DateTimes");
    return us(e, (t) => t.valueOf(), Math.min);
  }
  /**
   * Return the max of several date times
   * @param {...DateTime} dateTimes - the DateTimes from which to choose the maximum
   * @return {DateTime} the max DateTime, or undefined if called with no argument
   */
  static max(...e) {
    if (!e.every(x.isDateTime))
      throw new Ce("max requires all arguments be DateTimes");
    return us(e, (t) => t.valueOf(), Math.max);
  }
  // MISC
  /**
   * Explain how a string would be parsed by fromFormat()
   * @param {string} text - the string to parse
   * @param {string} fmt - the format the string is expected to be in (see description)
   * @param {Object} options - options taken by fromFormat()
   * @return {Object}
   */
  static fromFormatExplain(e, t, s = {}) {
    const { locale: a = null, numberingSystem: r = null } = s, l = fe.fromOpts({
      locale: a,
      numberingSystem: r,
      defaultToEN: !0
    });
    return Sa(l, e, t);
  }
  /**
   * @deprecated use fromFormatExplain instead
   */
  static fromStringExplain(e, t, s = {}) {
    return x.fromFormatExplain(e, t, s);
  }
  /**
   * Build a parser for `fmt` using the given locale. This parser can be passed
   * to {@link DateTime.fromFormatParser} to a parse a date in this format. This
   * can be used to optimize cases where many dates need to be parsed in a
   * specific format.
   *
   * @param {String} fmt - the format the string is expected to be in (see
   * description)
   * @param {Object} options - options used to set locale and numberingSystem
   * for parser
   * @returns {TokenParser} - opaque object to be used
   */
  static buildFormatParser(e, t = {}) {
    const { locale: s = null, numberingSystem: a = null } = t, r = fe.fromOpts({
      locale: s,
      numberingSystem: a,
      defaultToEN: !0
    });
    return new Ma(r, e);
  }
  /**
   * Create a DateTime from an input string and format parser.
   *
   * The format parser must have been created with the same locale as this call.
   *
   * @param {String} text - the string to parse
   * @param {TokenParser} formatParser - parser from {@link DateTime.buildFormatParser}
   * @param {Object} opts - options taken by fromFormat()
   * @returns {DateTime}
   */
  static fromFormatParser(e, t, s = {}) {
    if (G(e) || G(t))
      throw new Ce(
        "fromFormatParser requires an input string and a format parser"
      );
    const { locale: a = null, numberingSystem: r = null } = s, l = fe.fromOpts({
      locale: a,
      numberingSystem: r,
      defaultToEN: !0
    });
    if (!l.equals(t.locale))
      throw new Ce(
        `fromFormatParser called with a locale of ${l}, but the format parser was created for ${t.locale}`
      );
    const { result: i, zone: c, specificOffset: w, invalidReason: v } = t.explainFromTokens(e);
    return v ? x.invalid(v) : kt(
      i,
      c,
      s,
      `format ${t.format}`,
      e,
      w
    );
  }
  // FORMAT PRESETS
  /**
   * {@link DateTime#toLocaleString} format like 10/14/1983
   * @type {Object}
   */
  static get DATE_SHORT() {
    return nn;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983'
   * @type {Object}
   */
  static get DATE_MED() {
    return Es;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Fri, Oct 14, 1983'
   * @type {Object}
   */
  static get DATE_MED_WITH_WEEKDAY() {
    return ar;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'October 14, 1983'
   * @type {Object}
   */
  static get DATE_FULL() {
    return Cs;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Tuesday, October 14, 1983'
   * @type {Object}
   */
  static get DATE_HUGE() {
    return _s;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_SIMPLE() {
    return Ns;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_SECONDS() {
    return Is;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_SHORT_OFFSET() {
    return zs;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_LONG_OFFSET() {
    return Vs;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_SIMPLE() {
    return Ys;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_SECONDS() {
    return Fs;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 EDT', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_SHORT_OFFSET() {
    return Ws;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 Eastern Daylight Time', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_LONG_OFFSET() {
    return Ls;
  }
  /**
   * {@link DateTime#toLocaleString} format like '10/14/1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_SHORT() {
    return As;
  }
  /**
   * {@link DateTime#toLocaleString} format like '10/14/1983, 9:30:33 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_SHORT_WITH_SECONDS() {
    return Hs;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED() {
    return Rs;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983, 9:30:33 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED_WITH_SECONDS() {
    return Ps;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Fri, 14 Oct 1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED_WITH_WEEKDAY() {
    return rr;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'October 14, 1983, 9:30 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_FULL() {
    return Zs;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'October 14, 1983, 9:30:33 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_FULL_WITH_SECONDS() {
    return js;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Friday, October 14, 1983, 9:30 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_HUGE() {
    return xs;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Friday, October 14, 1983, 9:30:33 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_HUGE_WITH_SECONDS() {
    return Bs;
  }
}
function It(n) {
  if (x.isDateTime(n))
    return n;
  if (n && n.valueOf && ut(n.valueOf()))
    return x.fromJSDate(n);
  if (n && typeof n == "object")
    return x.fromObject(n);
  throw new Ce(
    `Unknown datetime argument: ${n}, of type ${typeof n}`
  );
}
function Ki(n) {
  return !n || typeof n != "string" || !n.trim() ? !1 : x.now().setZone(n.trim()).isValid;
}
function oe(n, e) {
  return x.fromJSDate(n).setZone(e);
}
function eo(n, e) {
  return oe(n, e).startOf("day").toJSDate();
}
function to(n, e) {
  return oe(n, e).endOf("day").toJSDate();
}
function no(n, e) {
  const t = oe(n, e);
  return t.hour * 60 + t.minute + t.second / 60;
}
function so(n, e, t) {
  return oe(n, t).plus({ days: e }).startOf("day").toJSDate();
}
function ao(n, e, t) {
  return oe(n, t).minus({ days: e }).startOf("day").toJSDate();
}
function ro(n, e, t) {
  const s = x.fromJSDate(n || /* @__PURE__ */ new Date()).setZone(t).startOf("day");
  if (e) {
    const r = s.weekday % 7;
    return s.minus({ days: r }).toJSDate();
  }
  const a = s.weekday - 1;
  return s.minus({ days: a }).toJSDate();
}
function io(n, e) {
  const t = oe(n, e);
  return x.fromObject({ year: t.year, month: t.month, day: 1 }, { zone: e }).startOf("day").toJSDate();
}
function oo(n, e) {
  const t = oe(n, e);
  return x.fromObject({ year: t.year, month: 1, day: 1 }, { zone: e }).startOf("day").toJSDate();
}
function lo(n, e, t) {
  const s = oe(n, t).year, a = s - s % e;
  return x.fromObject({ year: a, month: 1, day: 1 }, { zone: t }).startOf("day").toJSDate();
}
function uo(n, e) {
  return oe(n, e).endOf("month").toJSDate();
}
function co(n, e, t) {
  return oe(n, t).plus({ months: e }).startOf("day").toJSDate();
}
function fo(n, e, t) {
  const s = oe(n, t), a = new Date(Date.UTC(s.year, s.month - 1, s.day)), r = a.getUTCDay() || 7;
  a.setUTCDate(a.getUTCDate() + 4 - r);
  const l = new Date(Date.UTC(a.getUTCFullYear(), 0, 1));
  return Math.ceil(((a - l) / 864e5 + 1) / 7) + (e ? 1 : 0);
}
function ho(n, e, t) {
  const s = oe(n, t), a = oe(e, t);
  return s.year === a.year && s.month === a.month && s.day === a.day;
}
function mo(n, e) {
  const t = oe(n, e), s = x.now().setZone(e);
  return t.year === s.year && t.month === s.month && t.day === s.day;
}
function vo(n, e, t) {
  let s = n, a = e;
  typeof s == "string" && (s = s.replace(/-/g, "/")), typeof a == "string" && (a = a.replace(/-/g, "/"));
  const r = oe(new Date(s), t).startOf("day"), l = oe(new Date(a), t).startOf("day").plus({ seconds: 1 });
  return Math.ceil(l.diff(r, "days").days);
}
function yo(n, e, t) {
  return oe(n, t).startOf("day").plus({ minutes: e }).toJSDate();
}
const Ea = (n, e, t = () => "") => {
  let s, a, r, l = {}, i = {};
  const c = Me(n);
  let w = !1;
  const v = () => {
    const u = typeof t == "function" ? t() : "";
    if (!u || typeof u != "string") return "";
    const y = u.trim();
    return y ? Ki(y) ? y : (w || (console.warn(`Vue Cal: invalid timeZone "${u}". Falling back to local time.`), w = !0), "") : "";
  }, f = () => {
    c.value.today || (c.value = e), Date.prototype.addDays = function(u) {
      return p(this, u || 0);
    }, Date.prototype.subtractDays = function(u) {
      return M(this, u || 0);
    }, Date.prototype.addHours = function(u) {
      return h(this, u || 0);
    }, Date.prototype.subtractHours = function(u) {
      return q(this, u || 0);
    }, Date.prototype.addMinutes = function(u) {
      return o(this, u || 0);
    }, Date.prototype.subtractMinutes = function(u) {
      return O(this, u || 0);
    }, Date.prototype.getWeek = function() {
      return V(this);
    }, Date.prototype.isToday = function() {
      return _(this);
    }, Date.prototype.isLeapYear = function() {
      return d(this);
    }, Date.prototype.format = function(u = "YYYY-MM-DD") {
      return ie(this, u);
    }, Date.prototype.formatTime = function(u = "HH:mm") {
      return be(this, u);
    };
  }, E = () => {
    delete Date.prototype.addDays, delete Date.prototype.subtractDays, delete Date.prototype.addHours, delete Date.prototype.subtractHours, delete Date.prototype.addMinutes, delete Date.prototype.subtractMinutes, delete Date.prototype.getWeek, delete Date.prototype.isToday, delete Date.prototype.isLeapYear, delete Date.prototype.format, delete Date.prototype.formatTime;
  }, k = (u) => {
    c.value = u, Date.prototype.subtractDays && f();
  }, g = () => {
    if (v()) {
      const u = x.now().setZone(v());
      return `${u.year}-${u.month - 1}-${u.day}`;
    }
    return a !== (/* @__PURE__ */ new Date()).getDate() && (s = /* @__PURE__ */ new Date(), a = s.getDate(), r = `${s.getFullYear()}-${s.getMonth()}-${s.getDate()}`), r;
  }, p = (u, y) => {
    const D = v();
    if (D) return so(u, y, D);
    const F = new Date(u.valueOf());
    return F.setDate(F.getDate() + y), F;
  }, M = (u, y) => {
    const D = v();
    if (D) return ao(u, y, D);
    const F = new Date(u.valueOf());
    return F.setDate(F.getDate() - y), F;
  }, h = (u, y) => {
    const D = v();
    if (D) return oe(u, D).plus({ hours: y }).toJSDate();
    const F = new Date(u.valueOf());
    return F.setHours(F.getHours() + y), F;
  }, q = (u, y) => {
    const D = v();
    if (D) return oe(u, D).minus({ hours: y }).toJSDate();
    const F = new Date(u.valueOf());
    return F.setHours(F.getHours() - y), F;
  }, o = (u, y) => {
    const D = v();
    if (D) return oe(u, D).plus({ minutes: y }).toJSDate();
    const F = new Date(u.valueOf());
    return F.setMinutes(F.getMinutes() + y), F;
  }, O = (u, y) => {
    const D = v();
    if (D) return oe(u, D).minus({ minutes: y }).toJSDate();
    const F = new Date(u.valueOf());
    return F.setMinutes(F.getMinutes() - y), F;
  }, Z = (u, y) => {
    const D = (F) => {
      const te = F % y;
      return te !== 0 && (F += te >= y / 2 ? y - te : -te), F;
    };
    if (typeof u == "number") return D(u);
    if (u instanceof Date) {
      const F = v();
      if (F) {
        const ve = x.fromJSDate(u).setZone(F);
        let se = ve.hour * 60 + ve.minute;
        se = D(se);
        const we = ve.startOf("day").plus({ minutes: se }).toJSDate();
        u.setTime(we.getTime());
        return;
      }
      let te = D(u.getMinutes());
      te >= 60 && (u.setHours(u.getHours() + 1), te = 0), u.setMinutes(te, 0, 0);
    }
  }, V = (u, y = !1) => {
    const D = v();
    if (D) return fo(u, y, D);
    const F = new Date(Date.UTC(u.getFullYear(), u.getMonth(), u.getDate())), te = F.getUTCDay() || 7;
    F.setUTCDate(F.getUTCDate() + 4 - te);
    const ve = new Date(Date.UTC(F.getUTCFullYear(), 0, 1));
    return Math.ceil(((F - ve) / 864e5 + 1) / 7) + (y ? 1 : 0);
  }, _ = (u) => {
    const y = v();
    return y ? mo(u, y) : `${u.getFullYear()}-${u.getMonth()}-${u.getDate()}` === g();
  }, N = (u, y) => {
    if (!u || !y) return console.warn(`Vue Cal: missing date${u ? "2" : "1"} parameter for comparison with \`isSameDate(date1, date2)\`.`);
    if (ue(u)) {
      if (!ue(y)) return console.warn(`Vue Cal: invalid date2 provided for comparison with \`isSameDate(date1, date2)\`: \`${y}\`.`);
    } else return console.warn(`Vue Cal: invalid date1 provided for comparison with \`isSameDate(date1, date2)\`: \`${u}\`.`);
    const D = v();
    return D ? ho(u, y, D) : u.getFullYear() === y.getFullYear() && u.getMonth() === y.getMonth() && u.getDate() === y.getDate();
  }, I = (u, y, D) => ue(u) ? u.getTime() >= y && u.getTime() <= D : console.warn(`Vue Cal: invalid date provided to \`isInRange(date, rangeStart, rangeEnd)\`: \`${u}\`.`), d = (u) => {
    const y = v(), D = y ? oe(u, y).year : u.getFullYear();
    return !(D % 400) || D % 100 && !(D % 4);
  }, S = (u = null, y) => {
    const D = v();
    if (D) return ro(u, y, D);
    const F = u && new Date(u.valueOf()) || /* @__PURE__ */ new Date(), te = y ? 7 : 6;
    return F.setDate(F.getDate() - (F.getDay() + te) % 7), F;
  }, C = (u) => u instanceof Date ? u : (u.length === 10 && (u += " 00:00"), new Date(u.replace(/-/g, "/"))), m = (u) => {
    const y = v();
    return y ? no(u, y) : u.getHours() * 60 + u.getMinutes();
  }, U = (u) => {
    const y = v();
    if (y) return eo(u, y);
    const D = new Date(u.valueOf());
    return D.setHours(0, 0, 0, 0), D;
  }, Q = (u) => {
    const y = v();
    if (y) return to(u, y);
    const D = new Date(u.valueOf());
    return D.setHours(23, 59, 59, 999), D;
  }, ne = (u, y) => {
    const D = v();
    if (D) return vo(u, y, D);
    typeof u == "string" && (u = u.replace(/-/g, "/")), typeof y == "string" && (y = y.replace(/-/g, "/")), u = new Date(u).setHours(0, 0, 0, 0), y = new Date(y).setHours(0, 0, 1, 0);
    const F = (new Date(y).getTimezoneOffset() - new Date(u).getTimezoneOffset()) * 60 * 1e3;
    return Math.ceil((y - u - F) / (24 * 3600 * 1e3));
  }, ae = (u, y, D) => Math.abs(u.getTime() - y.getTime()) <= D * 60 * 1e3, ue = (u) => u && u instanceof Date && !isNaN(u), ie = (u, y = "YYYY-MM-DD", D = null) => {
    if (D || (D = c.value), y || (y = "YYYY-MM-DD"), y === "YYYY-MM-DD") return Ge(u);
    l = {}, i = {};
    const F = {
      YYYY: () => he(u, D).YYYY,
      YY: () => he(u, D).YY(),
      M: () => he(u, D).M,
      MM: () => he(u, D).MM(),
      MMM: () => he(u, D).MMM(),
      MMMM: () => he(u, D).MMMM(),
      MMMMG: () => he(u, D).MMMMG(),
      D: () => he(u, D).D,
      DD: () => he(u, D).DD(),
      S: () => he(u, D).S(),
      d: () => he(u, D).d,
      dd: () => he(u, D).dd(),
      ddd: () => he(u, D).ddd(),
      dddd: () => he(u, D).dddd(),
      HH: () => Ee(u, D).HH,
      H: () => Ee(u, D).H,
      hh: () => Ee(u, D).hh,
      h: () => Ee(u, D).h,
      am: () => Ee(u, D).am,
      AM: () => Ee(u, D).AM,
      mm: () => Ee(u, D).mm,
      m: () => Ee(u, D).m,
      s: () => Ee(u, D).s
    };
    return y.replace(/(\{[a-zA-Z]+\}|[a-zA-Z]+)/g, (te, ve) => {
      const se = F[ve.replace(/\{|\}/g, "")];
      return se !== void 0 ? se() : ve;
    });
  }, Ge = (u) => {
    const y = v();
    if (y) {
      const te = oe(u, y), ve = te.month, se = te.day;
      return `${te.year}-${ve < 10 ? "0" : ""}${ve}-${se < 10 ? "0" : ""}${se}`;
    }
    const D = u.getMonth() + 1, F = u.getDate();
    return `${u.getFullYear()}-${D < 10 ? "0" : ""}${D}-${F < 10 ? "0" : ""}${F}`;
  }, be = (u, y = "HH:mm", D = null, F = !1) => {
    let te = !1;
    if (F) {
      const we = v(), Ne = we ? oe(u, we).hour : u.getHours(), Pt = we ? oe(u, we).minute : u.getMinutes(), Ba = we ? oe(u, we).second : u.getSeconds();
      Ne + Pt + Ba === 141 && (te = !0);
    }
    if (u instanceof Date && y === "HH:mm") return te ? "24:00" : De(u);
    i = {}, D || (D = c.value);
    const ve = Ee(u, D), se = y.replace(/(\{[a-zA-Z]+\}|[a-zA-Z]+)/g, (we, Ne) => {
      const Pt = ve[Ne.replace(/\{|\}/g, "")];
      return Pt !== void 0 ? Pt : Ne;
    });
    return te ? se.replace("23:59", "24:00") : se;
  }, De = (u) => {
    const y = v();
    if (y) {
      const te = oe(u, y), ve = te.hour, se = te.minute;
      return `${(ve < 10 ? "0" : "") + ve}:${(se < 10 ? "0" : "") + se}`;
    }
    const D = u.getHours(), F = u.getMinutes();
    return `${(D < 10 ? "0" : "") + D}:${(F < 10 ? "0" : "") + F}`;
  }, Qe = (u) => {
    const y = Math.floor(u / 60).toString().padStart(2, 0), D = (u % 60).toString().padStart(2, 0);
    return `${y}:${D}`;
  }, et = (u) => {
    if (u > 3 && u < 21) return "th";
    switch (u % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }, he = (u, y) => {
    if (l.D) return l;
    const D = v();
    let F, te, ve, se;
    if (D) {
      const we = oe(u, D);
      F = we.year, te = we.month, ve = we.day, se = we.weekday - 1;
    } else
      F = u.getFullYear(), te = u.getMonth() + 1, ve = u.getDate(), se = (u.getDay() - 1 + 7) % 7;
    return l = {
      // Year.
      YYYY: F,
      // 2024.
      YY: () => F.toString().substring(2),
      // 24.
      // Month.
      M: te,
      // 1 to 12.
      MM: () => te.toString().padStart(2, 0),
      // 01 to 12.
      MMM: () => y.months[te - 1].substring(0, 3),
      // Jan to Dec.
      MMMM: () => y.months[te - 1],
      // January to December.
      MMMMG: () => (y.monthsGenitive || y.months)[te - 1],
      // January to December in genitive form (Greek...)
      // Day.
      D: ve,
      // 1 to 31.
      DD: () => ve.toString().padStart(2, 0),
      // 01 to 31.
      S: () => et(ve),
      // st, nd, rd, th.
      // Day of the week.
      d: se + 1,
      // 1 to 7 with 7 = Sunday.
      // Some locales have same start for all the days, so they have specific abbrev in weekDaysShort.
      dd: () => y.weekDaysShort.length ? y.weekDaysShort[se] : y.weekDays[se][0],
      // M to S.
      ddd: () => y.weekDaysShort.length ? y.weekDaysShort[se] : y.weekDays[se].substr(0, 3),
      // Mon to Sun.
      dddd: () => y.weekDays[se]
      // Monday to Sunday.
    }, l;
  }, Ee = (u, y) => {
    if (i.am) return i;
    let D, F, te;
    if (u instanceof Date) {
      const we = v();
      if (we) {
        const Ne = oe(u, we);
        D = Ne.hour, F = Ne.minute, te = Ne.second;
      } else
        D = u.getHours(), F = u.getMinutes(), te = u.getSeconds();
    } else
      D = Math.floor(u / 60), F = Math.floor(u % 60);
    const ve = D % 12 ? D % 12 : 12, se = (y || { am: "am", pm: "pm" })[D === 24 || D < 12 ? "am" : "pm"];
    return i = {
      H: D,
      h: ve,
      HH: D.toString().padStart(2, 0),
      hh: ve.toString().padStart(2, 0),
      am: se,
      AM: se.toUpperCase(),
      m: F,
      mm: F.toString().padStart(2, 0),
      s: te
    }, i;
  };
  return {
    addDatePrototypes: f,
    removeDatePrototypes: E,
    updateTexts: k,
    addDays: p,
    subtractDays: M,
    addHours: h,
    subtractHours: q,
    addMinutes: o,
    subtractMinutes: O,
    snapToInterval: Z,
    getWeek: V,
    isToday: _,
    isSameDate: N,
    isInRange: I,
    isLeapYear: d,
    getPreviousFirstDayOfWeek: S,
    stringToDate: C,
    dateToMinutes: m,
    countDays: ne,
    datesInSameTimeStep: ae,
    isValid: ue,
    formatDate: ie,
    formatDateLite: Ge,
    formatTime: be,
    formatTimeLite: De,
    formatMinutes: Qe,
    startOfDay: U,
    endOfDay: Q,
    startOfMonth: (u) => {
      const y = v();
      return y ? io(u, y) : new Date(u.getFullYear(), u.getMonth(), 1, 0, 0, 0, 0);
    },
    endOfMonth: (u) => {
      const y = v();
      return y ? uo(u, y) : new Date(u.getFullYear(), u.getMonth() + 1, 0, 23, 59, 59, 999);
    },
    startOfYear: (u) => {
      const y = v();
      return y ? oo(u, y) : new Date(u.getFullYear(), 0, 1, 0, 0, 0, 0);
    },
    addCalendarMonth: (u, y) => {
      const D = v();
      return D ? co(u, y, D) : new Date(u.getFullYear(), u.getMonth() + y, 1, 0, 0, 0, 0);
    },
    addCalendarYear: (u, y) => {
      const D = v();
      if (D) {
        const F = oe(u, D);
        return x.fromObject({ year: F.year + y, month: 2, day: 1, zone: D }).startOf("day").toJSDate();
      }
      return new Date(u.getFullYear() + y, 1, 1, 0, 0, 0, 0);
    },
    startOfYearsBlock: (u, y) => {
      const D = v();
      return D ? lo(u, y, D) : new Date(u.getFullYear() - u.getFullYear() % y, 0, 1, 0, 0, 0, 0);
    },
    getCalendarYear: (u) => v() ? oe(u, v()).year : u.getFullYear(),
    getCalendarMonth: (u) => v() ? oe(u, v()).month - 1 : u.getMonth(),
    getCalendarDate: (u) => v() ? oe(u, v()).day : u.getDate(),
    getWeekdayMon1Sun7: (u) => v() ? oe(u, v()).weekday : u.getDay() || 7,
    getWeekdaySun0: (u) => {
      const y = v();
      if (y) {
        const D = oe(u, y).weekday;
        return D === 7 ? 0 : D;
      }
      return u.getDay();
    },
    firstDayOfMonthInYear: (u, y) => {
      const D = v();
      return D ? x.fromObject({ year: u, month: y + 1, day: 1, zone: D }).startOf("day").toJSDate() : new Date(u, y, 1, 0, 0, 0, 0);
    },
    firstDayOfCalendarYear: (u) => {
      const y = v();
      return y ? x.fromObject({ year: u, month: 1, day: 1, zone: y }).startOf("day").toJSDate() : new Date(u, 0, 1, 0, 0, 0, 0);
    },
    lastMomentOfMonthInYear: (u, y) => {
      const D = v();
      return D ? x.fromObject({ year: u, month: y + 1, day: 1, zone: D }).endOf("month").toJSDate() : new Date(u, y + 1, 0, 23, 59, 59, 999);
    },
    endOfCalendarYear: (u) => {
      const y = v();
      return y ? x.fromObject({ year: u, month: 12, day: 31, zone: y }).endOf("day").toJSDate() : new Date(u + 1, 0, 0, 23, 59, 59, 999);
    },
    dateFromDayAndMinutes: (u, y) => {
      const D = v();
      if (D) return yo(u, y, D);
      const F = new Date(u);
      return F.setHours(0, 0, 0, 0), F.setMinutes(y), F;
    }
  };
}, go = (n) => {
  const { dateUtils: e, config: t } = n;
  let s = 0;
  const a = Y(() => {
    var Z, V, _, N, I;
    const o = {
      // A map of events indexed by { YYYY: { MM: { DD: [] } } }.
      // Each year contains a map of 12 months starting from 1, each containing a map of days starting from 1, each containing an array of event IDs.
      byYear: {},
      byDate: {},
      // A map of single-day events indexed by date.
      recurring: [],
      // An array of events IDs that are recurring.
      multiday: [],
      // An array of events IDs that are multiday.
      byId: {}
      // A map of all the events indexed by ID for fast lookup. Each event is the original full event object.
    }, O = t.events.slice().sort((d, S) => d.start - S.start < 0 ? -1 : 1);
    for (let d of O) {
      const S = typeof d.start == "string" || typeof d.end == "string", C = !((Z = d._) != null && Z.register) || !d.isOverlapping || !d.delete;
      let m = !1;
      if (!S && ((V = d._) != null && V.cachedStart) && ((_ = d._) != null && _.cachedEnd) && (m = d.start.getTime() !== ((N = d._) == null ? void 0 : N.cachedStart) || d.end.getTime() !== ((I = d._) == null ? void 0 : I.cachedEnd)), S || C || m) {
        if (!r(d)) continue;
        l(d), d._.cachedStart = d.start.getTime(), d._.cachedEnd = d.end.getTime();
      }
      if (o.byId[d._.id] = d, d.recurring)
        o.recurring.push(d._.id);
      else if (!e.isSameDate(d.start, new Date(d.end.getTime() - 1)))
        d._.multiday = t.multidayEvents, t.multidayEvents ? o.multiday.push(d._.id) : (console.info("Vue Cal: Multi-day events provided without being enabled. Truncating event end to next midnight."), d.end = e.endOfDay(new Date(d.start)), l(d)), o.byDate[d._.startFormatted] || (o.byDate[d._.startFormatted] = []), o.byDate[d._.startFormatted].push(d._.id);
      else {
        o.byDate[d._.startFormatted] || (o.byDate[d._.startFormatted] = []), o.byDate[d._.startFormatted].push(d._.id);
        const U = d._.startFormatted.substring(0, 4), Q = d._.startFormatted.substring(5, 7), ne = d._.startFormatted.substring(8, 10);
        o.byYear[U] || (o.byYear[U] = {}), o.byYear[U][Q] || (o.byYear[U][Q] = {}), o.byYear[U][Q][ne] || (o.byYear[U][Q][ne] = []), o.byYear[U][Q][ne].push(d._.id);
      }
    }
    return o;
  }), r = (o) => !o.start || !o.end ? (console.error("Vue Cal: Event is missing start or end date", o), !1) : (typeof o.start == "string" && (o.start = e.stringToDate(o.start)), typeof o.end == "string" && (o.end = e.stringToDate(o.end)), o.start.setSeconds(0, 0), o.end.getSeconds() === 59 ? o.end.setMinutes(o.end.getMinutes() + 1, 0, 0) : o.end.setSeconds(0, 0), isNaN(o.start) || isNaN(o.end) || o.end.getTime() < o.start.getTime() ? (isNaN(o.start) ? console.error(`Vue Cal: invalid start date for event "${o.title}".`, o.start) : isNaN(o.end) ? console.error(`Vue Cal: invalid end date for event "${o.title}".`, o.end) : console.error(`Vue Cal: invalid event dates for event "${o.title}". The event ends before it starts.`, o.start, o.end), !1) : !0), l = (o) => {
    o._ || (o._ = {}), o._.id = o._.id || ++s, o._.multiday = !e.isSameDate(o.start, new Date(o.end.getTime() - 1)), o._.startFormatted = e.formatDate(o.start), o._.endFormatted = e.formatDate(o.end), o._.startMinutes = ~~e.dateToMinutes(o.start), o._.endMinutes = ~~e.dateToMinutes(o.end);
    const [O, Z] = e.formatTimeLite(o.start).split(":").map(Number), [V, _] = e.formatTimeLite(o.end).split(":").map(Number), N = String(Z).padStart(2, 0), I = String(_).padStart(2, 0);
    o._.startTimeFormatted24 = `${String(O).padStart(2, 0)}:${N}`, o._.startTimeFormatted12 = `${O % 12 || 12}${N !== "00" ? `:${N}` : ""} ${O < 12 ? "AM" : "PM"}`, o._.endTimeFormatted24 = `${String(V).padStart(2, 0)}:${I}`, o._.endTimeFormatted12 = `${V % 12 || 12}${I !== "00" ? `:${I}` : ""} ${V < 12 ? "AM" : "PM"}`, o._.duration = Math.abs(~~((o.end - o.start) / 6e4)), o.delete || (o.delete = function(d) {
      return v(this._.id, d);
    }), o._.deleting === void 0 && (o._.deleting = !1), o._.deleted === void 0 && (o._.deleted = !1), o.isOverlapping || (o.isOverlapping = function(d = null) {
      return this.getOverlappingEvents(d).length;
    }), o.getOverlappingEvents || (o.getOverlappingEvents = function(d = null) {
      var U;
      const S = (d == null ? void 0 : d.start) || this.start, C = (d == null ? void 0 : d.end) || this.end, m = (U = t.schedules) != null && U.length ? ~~((d == null ? void 0 : d.schedule) || this.schedule) : null;
      return E(S, C, { excludeIds: [this._.id], schedule: m });
    }), o._.register || (o._.register = (d) => {
      o._.$el = d, o._.fireCreated && (n.emit("event-created", o), delete o._.fireCreated);
    }), o._.unregister || (o._.unregister = () => {
      o._.$el = null, o._.register = null, o.isOverlapping = null, o.getOverlappingEvents = null, o.delete = null;
    });
  }, i = (o) => a.value.byId[o], c = (o) => {
    const O = [];
    for (const { start: Z, end: V } of o) {
      const _ = E(Z, V);
      _.length && O.push(..._);
    }
    return O;
  }, w = (o) => {
    if (!o.start || !o.end) {
      console.error("Vue Cal: Cannot create an event without valid start and end dates.");
      return;
    }
    return t.snapToInterval && (e.snapToInterval(o.start, t.snapToInterval), e.snapToInterval(o.end, t.snapToInterval)), o = { ...o }, o._ || (o._ = {}), o._.id = ++s, o._.fireCreated = !0, t.events.push(o), o;
  }, v = async (o, O = 0) => {
    var I, d;
    if (!o) return console.warn("Vue Cal: Cannot delete event without its ID or criteria.");
    let Z = typeof o == "string" || !isNaN(o) ? o : null;
    const V = typeof o == "object" ? Object.entries(o) : null;
    if (V) {
      const [S, C] = V[0];
      Z = (I = t.events.find((m) => m[S] === C)) == null ? void 0 : I._.id;
    }
    if (!t.editableEvents.delete)
      return console.info("Vue Cal: Event deletion is disabled. Enable it with the `editable-events` props.");
    if (!Z) return console.warn("Vue Cal: Cannot delete event without its ID.");
    const _ = t.events.findIndex((S) => S._.id === Z);
    if (_ === -1) return console.warn(`Vue Cal: Cannot delete unknown event \`${Z}\`.`);
    const N = t.events[_];
    if (N.deletable === !1) return console.warn(`Vue Cal: Can't delete event \`${Z}\` since it was explicitely set to \`delete: false\`.`);
    switch (O) {
      case 0:
        N._.deleting ? t.events.splice(_, 1) : N._.deleting = !0;
        break;
      // Display the delete button.
      case 1:
        N._.deleting = !0;
        break;
      // Visual deletion + external DOM event firing.
      // When explicitly using this stage, the event will be visually deleted but still present in the
      // source of truth until the cell is unmounted (by navigating away).
      case 2:
        N._.deleted = !0, t.events[_]._.deleted = !0, (d = N._.$el) == null || d.dispatchEvent(new CustomEvent("event-deleted", { detail: N._.id }));
        break;
      // Effective deletion from the source of truth (by default, when unmounting the cell).
      case 3:
        t.events.splice(_, 1), n.emit("update:events", t.events), n.emit("event-delete", N);
        break;
    }
    return !0;
  }, f = (o, O, Z) => {
    const V = t.allDayEvents ? { allDay: Z } : {}, _ = E(o, O, { background: !1, ...V });
    if (!_.length) return { cellOverlaps: {}, longestStreak: 0 };
    const N = {};
    let I = [], d = 0;
    _.sort((S, C) => S.start - C.start || S.end - S.start - (C.end - C.start));
    for (const S of _) {
      const C = S._.id;
      N[C] || (N[C] = { overlaps: /* @__PURE__ */ new Set(), maxConcurrent: 1, position: 0 }), I = I.filter((ae) => ae.end > S.start);
      const m = I.filter((ae) => {
        var ie;
        return (!((ie = t.schedules) != null && ie.length) || S.schedule === ae.schedule) && ae.start < S.end;
      }), U = new Set(m.map((ae) => {
        var ue;
        return ((ue = N[ae._.id]) == null ? void 0 : ue.position) ?? 0;
      }));
      let Q = 0;
      for (; U.has(Q); ) Q++;
      N[C].position = Q, I.push(S);
      const ne = Math.max(1, ...m.map((ae) => {
        var ue;
        return ((ue = N[ae._.id]) == null ? void 0 : ue.maxConcurrent) ?? 1;
      }));
      N[C].maxConcurrent = Math.max(m.length + 1, ne);
      for (const ae of m)
        N[ae._.id].overlaps.add(C), N[C].overlaps.add(ae._.id), N[ae._.id].maxConcurrent = N[C].maxConcurrent;
      d = Math.max(d, N[C].maxConcurrent);
    }
    for (const S in N) N[S].overlaps = [...N[S].overlaps];
    return { cellOverlaps: N, longestStreak: d };
  }, E = (o, O, { excludeIds: Z = [], schedule: V = null, background: _ = !0, allDay: N = !1 } = {}) => {
    const { byId: I, byYear: d } = a.value, S = Object.keys(I).length;
    if (!S) return [];
    const C = e.getCalendarYear(o), m = e.getCalendarYear(O), U = e.getCalendarMonth(o) + 1, Q = e.getCalendarMonth(O) + 1, ne = e.getCalendarDate(o), ae = e.getCalendarDate(O), ue = e.startOfDay(new Date(o)).getTime(), ie = e.endOfDay(new Date(O)).getTime(), Ge = new Set(Z), be = [];
    if (S <= 100) {
      for (const De of Object.values(I))
        !De || Ge.has(De._.id) || V !== null && V !== De.schedule || _ === !1 && De.background || t.allDayEvents && (N && !De.allDay || !N && De.allDay) || De.start.getTime() < ie && De.end.getTime() > ue && be.push(De);
      return be;
    }
    for (let De = C; De <= m; De++) {
      const Qe = `${De}`, et = d[Qe];
      if (!et) continue;
      const he = De === C ? U : 1, Ee = De === m ? Q : 12;
      for (let Ke = he; Ke <= Ee; Ke++) {
        const wt = String(Ke).padStart(2, "0"), T = et[wt];
        if (T)
          for (const L in T) {
            const $ = +L;
            if (De === C && Ke === U && $ < ne || De === m && Ke === Q && $ > ae) continue;
            const H = T[L];
            if (H != null && H.length)
              for (let X = 0; X < H.length; X++) {
                const B = I[H[X]];
                !B || Ge.has(B._.id) || V !== null && V !== B.schedule || _ === !1 && B.background || t.allDayEvents && (N && !B.allDay || !N && B.allDay) || B.start.getTime() < ie && B.end.getTime() > ue && be.push(B);
              }
          }
      }
    }
    return be;
  }, k = (o, O, Z) => {
    const V = o.allDay || !t.time, _ = V ? e.startOfDay(new Date(o.start)).getTime() : o.start.getTime(), N = V ? e.endOfDay(new Date(o.end)).getTime() : o.end.getTime(), I = V ? e.startOfDay(new Date(O)).getTime() : O.getTime(), d = V ? e.endOfDay(new Date(Z)).getTime() : Z.getTime();
    return N > I && _ < d;
  }, g = Je({
    isResizing: !1,
    fromResizer: !1,
    resizingEvent: null,
    resizingOriginalEvent: null,
    resizingLastAcceptedEvent: null,
    startX: 0,
    startY: 0,
    startPercentageX: 0,
    startPercentageY: 0,
    moveX: 0,
    moveY: 0,
    movePercentageX: 0,
    movePercentageY: 0,
    documentMouseX: 0,
    documentMouseY: 0,
    resizeStartDate: null,
    cellEl: null,
    schedule: null
  }), p = (o, O) => {
    var I;
    const Z = g[t.horizontal ? "movePercentageX" : "movePercentageY"];
    let V = lt(Z, t);
    if (V = Math.max(0, Math.min(V, 1440)), t.snapToInterval) {
      const d = V + t.snapToInterval / 2;
      V = d - d % t.snapToInterval;
    }
    let _ = o.start, N = e.dateFromDayAndMinutes(O, V);
    return g.moveX && ((I = n.touch) != null && I.currentHoveredCell) && g.cellEl && new Date(parseInt(n.touch.currentHoveredCell.dataset.start)), N < g.resizeStartDate && (_ = N, N = g.resizeStartDate), { newStart: _, newEnd: N };
  }, M = async (o) => {
    var V, _, N, I;
    const { clientX: O, clientY: Z } = ((V = o.touches) == null ? void 0 : V[0]) || o;
    if (g.fromResizer && !g.resizingOriginalEvent) {
      g.resizingOriginalEvent = { ...g.resizingEvent, _: { ...g.resizingEvent._ } };
      const d = ((_ = t.eventListeners) == null ? void 0 : _.event) || {};
      (N = d["resize-start"]) == null || N.call(d, { e: o, event: g.resizingEvent });
    }
    if (g.cellEl) {
      const { top: d, left: S, width: C, height: m } = g.cellEl.getBoundingClientRect();
      g.moveX = O - S, g.moveY = Z - d, g.movePercentageX = g.moveX * 100 / C, g.movePercentageY = g.moveY * 100 / m;
    }
    if (g.documentMouseX = O, g.documentMouseY = Z, g.fromResizer && g.resizingEvent) {
      const d = new Date(parseInt(g.cellEl.dataset.start)), { newStart: S, newEnd: C } = p(g.resizingEvent, d);
      let m = !0;
      const { resize: U } = ((I = t.eventListeners) == null ? void 0 : I.event) || {};
      U && (m = await U({
        e: o,
        event: { ...g.resizingEvent, start: S, end: C },
        overlaps: g.resizingEvent.getOverlappingEvents({ start: S, end: C })
      })), m !== !1 ? (g.resizingEvent.start = S, g.resizingEvent.end = C, g.resizingLastAcceptedEvent && (g.resizingLastAcceptedEvent = null), o.preventDefault()) : U && (g.resizingLastAcceptedEvent = { ...g.resizingEvent, _: { ...g.resizingEvent._ } });
    }
  }, h = async (o) => {
    var O, Z, V, _;
    if ((O = n.touch) != null && O.isResizingEvent && g.resizingEvent) {
      const N = new Date(parseInt(g.cellEl.dataset.start)), { newStart: I, newEnd: d } = p(g.resizingEvent, N);
      let S = !0;
      const m = (((Z = t.eventListeners) == null ? void 0 : Z.event) || {})["resize-end"];
      m && (S = await m({
        e: o,
        event: g.resizingEvent,
        original: g.resizingOriginalEvent,
        // Original event details before resizing.
        overlaps: g.resizingEvent.getOverlappingEvents({ start: I, end: d })
      })), g.resizingEvent.start = S === !1 ? (g.resizingLastAcceptedEvent || g.resizingOriginalEvent).start : ((V = g.resizingLastAcceptedEvent) == null ? void 0 : V.start) || I, g.resizingEvent.end = S === !1 ? (g.resizingLastAcceptedEvent || g.resizingOriginalEvent).end : ((_ = g.resizingLastAcceptedEvent) == null ? void 0 : _.end) || d, g.resizingEvent._.duration < 1 && (g.resizingEvent.start = g.resizingOriginalEvent.start, g.resizingEvent.end = g.resizingOriginalEvent.end), n.touch.isResizingEvent = !1, n.touch.currentHoveredCell = null;
    }
    document.removeEventListener(o.type === "touchend" ? "touchmove" : "mousemove", M, { passive: !g.fromResizer }), n.touch.isResizingEvent = !1, g.fromResizer = !1, g.resizingEvent = null, g.resizingOriginalEvent = null, g.resizingLastAcceptedEvent = null, g.startX = 0, g.startY = 0, g.moveX = 0, g.moveY = 0, g.startPercentageX = 0, g.startPercentageY = 0, g.movePercentageX = 0, g.movePercentageY = 0, g.documentMouseX = 0, g.documentMouseY = 0, g.cellEl = null, g.resizeStartDate = null, g.schedule = null;
  };
  return {
    events: a,
    resizeState: g,
    getEvent: i,
    getViewEvents: c,
    getCellOverlappingEvents: f,
    getEventsInRange: E,
    createEvent: w,
    deleteEvent: v,
    isEventInRange: k,
    handleEventResize: (o, O, Z) => {
      var _;
      const V = ((_ = o.touches) == null ? void 0 : _[0]) || o;
      if (g.fromResizer = !!V.target.closest(".vuecal__event-resizer"), g.fromResizer) {
        n.touch.isResizingEvent = !0;
        const N = Z.getBoundingClientRect();
        g.startX = V.clientX - N.left, g.startY = V.clientY - N.top, g.startPercentageX = g.startX * 100 / N.width, g.startPercentageY = g.startY * 100 / N.height, g.cellEl = Z.closest(".vuecal__cell"), g.resizeStartDate = O.start, g.resizingEvent = O, document.addEventListener(o.type === "touchstart" ? "touchmove" : "mousemove", M, { passive: !g.fromResizer }), document.addEventListener(o.type === "touchstart" ? "touchend" : "mouseup", h, { once: !0 });
      }
    }
  };
}, wo = ({ config: n, dateUtils: e, emit: t, texts: s, eventsManager: a }, r) => {
  const { availableViews: l } = n, i = Me(n.view && l[n.view] ? n.view : n.defaultView), c = Me(n.selectedDate || null), w = Me(/* @__PURE__ */ new Date()), v = Me(e.startOfDay(new Date(n.viewDate || w.value))), f = Me(new Date(v));
  let E = null;
  const k = Y(() => i.value === "month" ? f.value : _.value), g = Y(() => i.value === "month" ? e.endOfMonth(f.value) : I.value), p = Y(() => i.value === "week" ? e.getPreviousFirstDayOfWeek(_.value, n.startWeekOnSunday) : i.value === "month" ? _.value : k.value), M = Y(() => {
    if (i.value === "week") {
      const b = e.addDays(p.value, 7);
      return b.setMilliseconds(-1), b;
    }
    return i.value === "month" ? I.value : g.value;
  }), h = Y(() => {
    const b = w.value.getTime();
    if (i.value === "week")
      return p.value.getTime() <= b && b <= M.value.getTime();
    const j = _.value.getTime(), ee = I.value.getTime();
    return j <= b && b <= ee;
  });
  function q() {
    w.value = /* @__PURE__ */ new Date(), E = setTimeout(q, 60 * 1e3);
  }
  function o() {
    E = setTimeout(q, (60 - (/* @__PURE__ */ new Date()).getSeconds()) * 1e3), q();
  }
  const O = Y(() => {
    if (!n.availableViews[i.value]) return 1;
    let b = n.availableViews[i.value].cols;
    return n.hasHiddenDays && ["week", "month"].includes(i.value) && (b -= n.hasHiddenDays), b;
  }), Z = Y(() => {
    var b;
    return ((b = n.availableViews[i.value]) == null ? void 0 : b.rows) || 1;
  }), V = Y(() => O.value * Z.value), _ = Y(() => {
    if (i.value === "month") {
      let b = e.getWeekdayMon1Sun7(f.value);
      return n.startWeekOnSunday && !n.hideWeekdays[7] && (b += 1), n.viewDayOffset && (b -= n.viewDayOffset), e.subtractDays(f.value, b - 1);
    }
    if (i.value === "week") {
      const b = "1234567".split("").filter((ee) => !Object.keys(n.hideWeekdays).includes(ee));
      let j = Math.min(...b);
      return n.startWeekOnSunday && !n.hideWeekdays[7] && (j = 1), n.viewDayOffset && (j += n.viewDayOffset), e.addDays(f.value, j - 1);
    }
    return f.value;
  }), N = Y(() => {
    const b = [], j = ["days", "week", "month"].includes(i.value);
    let ee = 0;
    for (let K = 0; K < V.value + ee; K++)
      switch (i.value) {
        case "day":
        case "days":
        case "week":
        case "month": {
          const ye = e.addDays(_.value, K), Pe = e.getWeekdayMon1Sun7(ye);
          if (j && n.hasHiddenDays && n.hideWeekdays[Pe]) {
            ee++;
            continue;
          }
          const ct = e.endOfDay(ye);
          b.push({ start: ye, startFormatted: e.formatDate(ye), end: ct });
          break;
        }
        case "year": {
          const ye = e.getCalendarYear(_.value);
          b.push({
            start: e.firstDayOfMonthInYear(ye, K),
            end: e.lastMomentOfMonthInYear(ye, K)
          });
          break;
        }
        case "years": {
          const ye = e.getCalendarYear(_.value);
          b.push({
            start: e.firstDayOfCalendarYear(ye + K),
            end: e.endOfCalendarYear(ye + K)
          });
          break;
        }
      }
    return b;
  }), I = Y(() => N.value[N.value.length - 1].end), d = Me("right"), S = Y(() => {
    const b = Object.keys(n.availableViews);
    return b[b.indexOf(i.value) + 1];
  }), C = Y(() => {
    const b = Object.keys(n.availableViews);
    return b[b.indexOf(i.value) - 1];
  });
  function m(b, j, ee = !1) {
    if (!j || !j[b]) return b + 1;
    const K = j[b];
    return ee && typeof K == "string" ? K.substring(0, 3) : K;
  }
  function U(b, j, ee) {
    const { monthsArray: K, monthBeforeDay: ye, canTruncate: Pe, xs: ct } = ee, u = e.getCalendarMonth(b), y = e.getCalendarYear(b), D = e.getCalendarMonth(j), F = e.getCalendarYear(j), te = u !== D, ve = y !== F, se = Pe && (ct || te), we = e.getCalendarDate(b), Ne = e.getCalendarDate(j);
    return ve ? ye ? `${m(u, K, se)} ${we}, ${y} - ${m(D, K, se)} ${Ne}, ${F}` : `${we} ${m(u, K, se)} ${y} - ${Ne} ${m(D, K, se)} ${F}` : te ? ye ? `${m(u, K, se)} ${we} - ${m(D, K, se)} ${Ne}, ${y}` : `${we} ${m(u, K, se)} - ${Ne} ${m(D, K, se)} ${y}` : ye ? `${m(u, K, se)} ${we}-${Ne}, ${y}` : `${we}-${Ne} ${m(u, K, se)} ${y}`;
  }
  const Q = Y(() => {
    const { dateFormat: b, months: j, monthsGenitive: ee, week: K, truncations: ye } = s, Pe = n.locale, ct = ye !== !1, u = b.indexOf("M") < b.indexOf("D"), y = ee && Pe === "el" ? ee : j;
    switch (i.value) {
      case "day":
        return e.formatDate(_.value, b);
      case "days":
      case "week": {
        const D = {
          monthsArray: y,
          monthBeforeDay: u,
          canTruncate: ct,
          xs: n.xs
        };
        let F = U(_.value, I.value, D);
        if (i.value === "week") {
          const te = e.getWeek(
            _.value,
            n.startWeekOnSunday && !n.hideWeekdays[7]
          );
          F += ` <small>${K} ${te}</small>`;
        }
        return F;
      }
      case "month": {
        const D = `${n.xs && ct ? "MMM" : "MMMM"} YYYY`;
        return e.formatDate(k.value, D);
      }
      case "year":
        return e.getCalendarYear(_.value);
      case "years":
        return `${e.getCalendarYear(_.value)} - ${e.getCalendarYear(g.value)}`;
    }
  });
  async function ne() {
    switch (f.value = e.startOfDay(new Date(v.value || w.value)), i.value) {
      case "day":
        break;
      case "days":
        break;
      case "week":
        f.value = e.getPreviousFirstDayOfWeek(f.value, n.startWeekOnSunday && !n.hideWeekdays[7]);
        break;
      case "month":
        f.value = e.startOfMonth(f.value);
        break;
      case "year":
        f.value = e.startOfYear(f.value);
        break;
      case "years":
        f.value = e.startOfYearsBlock(f.value, V.value);
        break;
    }
    w.value = /* @__PURE__ */ new Date(), n.ready && (await Qt(), t("view-change", {
      id: i.value,
      title: Q.value,
      start: k.value,
      end: g.value,
      extendedStart: p.value,
      extendedEnd: M.value,
      cellDates: N.value,
      containsToday: h.value,
      events: X.value
    }));
  }
  function ae(b) {
    const j = i.value, ee = n.availableViews[j];
    b[j] && JSON.stringify(b[j]) === JSON.stringify(ee) || ne();
  }
  function ue(b, j = !0, ee = null) {
    const K = Object.keys(n.availableViews);
    i.value === b && !ee || (K.includes(b) ? (d.value = K.indexOf(b) < K.indexOf(i.value) ? "left" : "right", j && i.value !== b && t("update:view", b), i.value = b, ee ? he(ee) : ne()) : console.warn(`Vue Cal: the \`${b}\` view is not available.`));
  }
  function ie() {
    S.value ? ue(S.value) : console.warn("Vue Cal: no broader view is available.");
  }
  function Ge() {
    C.value ? ue(C.value) : console.warn("Vue Cal: no narrower view is available.");
  }
  function be() {
    Qe(!1);
  }
  function De() {
    Qe(!0);
  }
  function Qe(b = !0) {
    let j = new Date(v.value);
    switch (i.value) {
      case "day":
      case "days":
        b ? j = e.addDays(I.value, 1) : j = e.subtractDays(_.value, V.value);
        break;
      case "week": {
        b ? j = e.startOfDay(e.addDays(M.value, 1)) : j = e.subtractDays(p.value, V.value);
        break;
      }
      case "month": {
        const ee = b ? 1 : -1;
        j = e.addCalendarMonth(j, ee);
        break;
      }
      case "year": {
        const ee = b ? 1 : -1;
        j = e.addCalendarYear(j, ee);
        break;
      }
      case "years": {
        const ee = b ? V.value : -V.value;
        j = e.addCalendarYear(j, ee);
        break;
      }
    }
    he(j);
  }
  function et() {
    he(e.startOfDay(/* @__PURE__ */ new Date()));
  }
  function he(b, j = !0, ee = !1) {
    if (!e.isValid(b)) return console.warn("Vue Cal: can't navigate to the given date: invalid date provided to `updateViewDate(date)`.");
    let [K, ye] = [_.value, I.value];
    i.value === "month" && ([K, ye] = [k.value, g.value]);
    const Pe = e.startOfDay(new Date(b));
    v.value = Pe, j && t("update:viewDate", Pe), (!e.isInRange(Pe, K, ye) || ee) && (d.value = Pe.getTime() < K.getTime() ? "left" : "right", ne());
  }
  function Ee(b, j = !0) {
    if (!e.isValid(b)) return console.warn("Vue Cal: can't update the selected date: invalid date provided to `updateSelectedDate(date)`.");
    const { isValid: ee, isSameDate: K } = e;
    if (!c.value || !ee(c.value) || !K(b, c.value)) {
      const ye = e.startOfDay(new Date(b));
      c.value = ye, j && t("update:selectedDate", ye);
    }
  }
  function Ke(b) {
    !b && e.getWeekdayMon1Sun7(f.value) === 7 ? he(e.addDays(f.value, 1), !0, !0) : (d.value = "left", ne());
  }
  function wt(b) {
    b && n.startWeekOnSunday && e.getWeekdayMon1Sun7(f.value) === 7 ? he(e.addDays(f.value, 1), !0, !0) : !b && n.startWeekOnSunday && e.getWeekdayMon1Sun7(f.value) === 1 && he(e.subtractDays(f.value, 1), !0, !0);
  }
  function T() {
    ne();
  }
  function L(b) {
    var ye;
    const j = (ye = r.value) == null ? void 0 : ye.querySelector(".vuecal__scrollable"), ee = b - n.timeFrom, K = ee > 0 ? ee * n.timeCellHeight / n.timeStep : 0;
    j == null || j.scrollTo({ top: K, behavior: "smooth" });
  }
  function $() {
    L(e.dateToMinutes(/* @__PURE__ */ new Date()));
  }
  function H() {
    L(0);
  }
  const X = Y(() => a.getViewEvents(N.value)), B = a.createEvent, le = a.deleteEvent;
  return ze(() => n.view, (b) => ue(b, !1)), ze(() => n.availableViews, ae), ze(() => n.datePicker, () => ue("month")), ze(() => n.viewDate, (b) => he(b, !1)), ze(() => n.selectedDate, (b) => Ee(b, !1)), ze(() => n.startWeekOnSunday, (b) => Ke(b)), ze(() => n.hideWeekends, (b) => wt(b)), ze(() => n.hideWeekdays, T), ze(() => n.timeZone, () => ne()), ze(() => V.value, () => {
    V.value > 90 && console.warn("Vue Cal: high cell count detected. Performance may degrade when interactions are enabled.");
  }), ze(() => n.watchRealTime, (b) => {
    b && n.time ? o() : E = clearTimeout(E);
  }), ne(), n.time && n.watchRealTime && o(), $t(() => E = clearTimeout(E)), {
    now: w,
    id: i,
    broaderView: S,
    narrowerView: C,
    title: Q,
    viewDate: v,
    start: k,
    end: g,
    extendedStart: p,
    // Full range, including out of scope month days, and hidden leading/trailing days.
    extendedEnd: M,
    // Full range, including out of scope month days, and hidden leading/trailing days.
    firstCellDate: _,
    lastCellDate: I,
    containsToday: h,
    selectedDate: c,
    cellDates: N,
    cols: O,
    rows: Z,
    // All the events are stored and indexed in the events object of the eventsManager.
    // The following events array is only a subset of visible ones, plus any potential recurring
    // and multi-day events.
    events: X,
    transitionDirection: d,
    switch: (b, j) => ue(b, !0, j),
    broader: ie,
    narrower: Ge,
    previous: be,
    next: De,
    navigate: Qe,
    goToToday: et,
    updateViewDate: he,
    updateSelectedDate: Ee,
    scrollToCurrentTime: $,
    scrollToTime: L,
    scrollTop: H,
    createEvent: B,
    deleteEvent: le,
    // Getters.
    get isDay() {
      return i.value === "day";
    },
    get isDays() {
      return i.value === "days";
    },
    get isWeek() {
      return i.value === "week";
    },
    get isMonth() {
      return i.value === "month";
    },
    get isYear() {
      return i.value === "year";
    },
    get isYears() {
      return i.value === "years";
    }
  };
}, Ca = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], _a = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], Na = "Years", Ia = "Year", za = "Month", Va = "Week", Ya = "Days", Fa = "Day", Wa = "Today", La = "No Event", Aa = "All-day", Ha = "Delete", Ra = "Create an event", Pa = "dddd, MMMM D, YYYY", Za = "am", ja = "pm", jn = {
  weekDays: Ca,
  months: _a,
  years: Na,
  year: Ia,
  month: za,
  week: Va,
  days: Ya,
  day: Fa,
  today: Wa,
  noEvent: La,
  allDay: Aa,
  deleteEvent: Ha,
  createEvent: Ra,
  dateFormat: Pa,
  am: Za,
  pm: ja
}, Do = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  allDay: Aa,
  am: Za,
  createEvent: Ra,
  dateFormat: Pa,
  day: Fa,
  days: Ya,
  default: jn,
  deleteEvent: Ha,
  month: za,
  months: _a,
  noEvent: La,
  pm: ja,
  today: Wa,
  week: Va,
  weekDays: Ca,
  year: Ia,
  years: Na
}, Symbol.toStringTag, { value: "Module" })), bt = Je({
  texts: { ...Ve.texts },
  // Make texts reactive before a locale is loaded.
  dateUtils: Ea(Ve.texts, jn)
  // Some Date utils functions need localized texts.
}), po = ({ props: n, emit: e, attrs: t, vuecalEl: s, uid: a }) => {
  const r = Je({
    uid: a,
    // The Vuecal instance unique ID, used for dnd source-target identification.
    emit: e,
    texts: { ...bt.texts },
    // Make texts reactive before a locale is loaded.
    // The date utils composable.
    // A class/composable is needed in order to access the user locale in all the methods, and
    // independently of other potential Vue Cal instances on the same page.
    dateUtils: { ...bt.dateUtils },
    now: /* @__PURE__ */ new Date(),
    config: {},
    eventsManager: {},
    view: {},
    // At any time this object will be filled with current view details and visible events.
    dnd: {},
    // Drag and drop module.
    // stores the gesture related states. E.g. dragging event, resizing event, etc.
    touch: {
      isDraggingCell: !1,
      isDraggingEvent: !1,
      isResizingEvent: !1,
      currentHoveredCell: null
      // Track the cell currently being hovered during event resizing.
    }
  });
  return r.dateUtils = Ea(Object.assign(Ve.texts, r.texts), jn, () => n.timeZone || ""), r.config = Ka(r, n, t), r.eventsManager = go(r), r.view = wo(r, s), r.dnd = er(r), r;
}, ko = 1440, To = {
  allDayEvents: { type: Boolean, default: !1 },
  // Display all-day events in a fixed top bar on the day, days & week views.
  stackEvents: { type: Boolean, default: !1 },
  clickToNavigate: { type: Boolean, default: void 0 },
  // Setting to false will force it off on date-picker.
  dark: { type: Boolean, default: !1 },
  // Dark theme.
  datePicker: { type: Boolean, default: !1 },
  // Shorthand for xs: true, views: [month, year, years], clickToNavigate: true.
  disableDays: { type: Array, default: () => [] },
  // Array of specific dates to disable.
  // Can be true false or a finer grain permissions object like:
  // { drag: bool, resize: bool, resizeX: bool, create: bool, delete: bool }
  editableEvents: { type: [Boolean, Object], default: !1 },
  // Minimum drag distance in pixels to create an event (prevents accidental event creation when trying to navigate).
  eventCreateMinDrag: { type: Number, default: 15 },
  // The minimum drag distance in pixels to create an event.
  // The array of events to display in Vue Cal.
  // Can hold just the view events and be updated or the full array of all events available.
  events: { type: Array, default: () => [] },
  // Displays an events counter in each cell on month view or year view.
  // Can be a boolean or an array of views to display the event count on.
  eventCount: { type: [Boolean, Array], default: !1 },
  eventsOnMonthView: { type: Boolean, default: !1 },
  // Displays events in full on month view.
  hideWeekdays: { type: Array, default: () => [] },
  // An array of strings. Possible values: 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'.
  hideWeekends: { type: Boolean, default: !1 },
  // Show or hide both Saturday and Sunday in days, week and month views.
  // en-us is the default and fallback if locale is not supported.
  // The locale can also be provided externally to avoid using Promises.
  locale: { type: String, default: "" },
  // A language to use for all the texts.
  maxDate: { type: [String, Date], default: "" },
  // Mostly for date pickers, sets a maximum date for cell interactions.
  minDate: { type: [String, Date], default: "" },
  // Mostly for date pickers, sets a minimum date for cell interactions.
  multidayEvents: { type: Boolean, default: !0 },
  // Allow events to span multiple days.
  // A 2-way binding that highlights the selected date in the calendar but does not navigate to it.
  selectedDate: { type: [String, Date], default: "" },
  // The selected date in the calendar !== viewDate.
  sm: { type: Boolean, default: !1 },
  // Small size (truncates texts + specific styles).
  specialHours: { type: Object, default: () => ({}) },
  // Highlight a particular time range on each day of the week, individually.
  schedules: { type: Array, default: () => [] },
  // Split a day in different persons/rooms/locations schedules.
  snapToInterval: { type: Number, default: 0 },
  // Snap the event start and end to a specific interval in minutes.
  startWeekOnSunday: { type: Boolean, default: !1 },
  // Shows Sunday before Monday in days, week and month views.
  theme: { type: [String, Boolean], default: "default" },
  // Only adds a CSS class when set to default.
  time: { type: Boolean, default: !0 },
  // Show or hide the time column.
  timeAtCursor: { type: Boolean, default: !1 },
  // Show or hide the "time at cursor" line.
  timeCellHeight: { type: Number, default: 40 },
  // In pixels.
  timeFormat: { type: String, default: "" },
  // Overrides the default time format.
  timeFrom: { type: Number, default: 0 },
  // Start time of the time column, in minutes.
  timeStep: { type: Number, default: 60 },
  // Step amount for the time in the time column, in minutes.
  timeTo: { type: Number, default: ko },
  // End time of the time column, in minutes.
  titleBar: { type: Boolean, default: !0 },
  // Show or hide the header title bar.
  todayButton: { type: Boolean, default: !0 },
  // Show or hide the header today button.
  twelveHour: { type: Boolean, default: !1 },
  // 12 or 24 hour format are respectively written like 1pm and 13:00.
  // IANA timezone (e.g. 'America/New_York'). Empty string uses the browser local timezone.
  timeZone: { type: String, default: "" },
  // Sets the calendar view to one of: 'day', 'days', 'week', 'month', 'year', 'years'. Default 'week' or 'month' if datePicker.
  // Gets updated on view navigation.
  view: { type: String, default: "" },
  viewDate: { type: [String, Date], default: "" },
  // The view will automatically set its start and end to present this date.
  // Only available for month and day views, this will shift the start of the view (left or right) by x days (signed integer).
  viewDayOffset: { type: Number, default: 0 },
  // The list of all the view that will be available in this calendar.
  // Default for normal layout: ['day', 'days', 'week', 'month', 'year', 'years'] }.
  // Default for date picker layout: ['month', 'year', 'years'].
  views: { type: [Array, Object] },
  viewsBar: { type: Boolean, default: !0 },
  // Show or hide the headers view selection bar.
  watchRealTime: { type: Boolean, default: !1 },
  // More expensive, so only trigger on demand.
  weekNumbers: { type: Boolean, default: !1 },
  // Show the weeks numbers in a column on month view.
  xs: { type: Boolean, default: !1 },
  // Extra small size for date pickers (truncates texts + specific styles).
  horizontal: { type: Boolean, default: !1 }
  // Show the calendar timeline horizontally.
  // TODO:
  // minEventWidth: { type: Number, default: 0 },
  // minScheduleWidth: { type: Number, default: 0 },
  // overlapsPerTimeStep: { type: Boolean, default: false },
}, Mo = { class: "vuecal__header" }, So = {
  key: 0,
  class: "vuecal__views-bar"
}, bo = ["onClick", "innerHTML"], Oo = {
  key: 1,
  class: "vuecal__title-bar"
}, $o = { class: "vuecal__transition-wrap" }, Eo = ["disabled", "innerHTML"], Co = {
  __name: "header",
  setup(n) {
    const e = yt("vuecal"), { view: t, config: s } = e, a = () => {
      s.clickToNavigate && t.broader();
    }, r = Y(() => s.clickToNavigate ? { click: a } : {});
    return (l, i) => (A(), P("div", Mo, [
      R(l.$slots, "header", {
        view: z(t),
        availableViews: z(s).availableViews,
        vuecal: z(e)
      }),
      l.$slots.header ? re("", !0) : (A(), P($e, { key: 0 }, [
        z(s).viewsBar ? (A(), P("div", So, [
          (A(!0), P($e, null, Ae(z(s).availableViews, (c, w) => (A(), P("button", {
            class: Fe(["vuecal__view-button", { "vuecal__view-button--active": z(t).id === w }]),
            onClick: (v) => z(t).switch(w),
            innerHTML: z(e).texts[w],
            type: "button"
          }, null, 10, bo))), 256))
        ])) : re("", !0),
        z(s).titleBar ? (A(), P("nav", Oo, [
          Ye("button", {
            class: Fe(["vuecal__nav vuecal__nav--prev", { "vuecal__nav--default": !l.$slots["previous-button"] }]),
            onClick: i[0] || (i[0] = (...c) => z(t).previous && z(t).previous(...c)),
            type: "button"
          }, [
            R(l.$slots, "previous-button")
          ], 2),
          Ye("div", $o, [
            mt(on, {
              name: `vuecal-slide-fade--${z(t).transitionDirection}`
            }, {
              default: J(() => [
                (A(), P("div", {
                  key: z(t).id + z(t).start.getTime()
                }, [
                  l.$slots.title || l.$slots[`title.${z(t).id}`] ? (A(), nt(xn(z(s).clickToNavigate && z(t).broaderView ? "button" : "div"), pe({
                    key: 0,
                    class: "vuecal__title"
                  }, Kt(r.value)), {
                    default: J(() => [
                      l.$slots[`title.${z(t).id}`] ? R(l.$slots, `title.${z(t).id}`, me(pe({ key: 0 }, z(t)))) : R(l.$slots, "title", me(pe({ key: 1 }, z(t))))
                    ]),
                    _: 3
                  }, 16)) : (A(), nt(xn(z(s).clickToNavigate && z(t).broaderView ? "button" : "div"), pe({
                    key: 1,
                    class: "vuecal__title"
                  }, Kt(r.value), {
                    innerHTML: z(t).title
                  }), null, 16, ["innerHTML"]))
                ]))
              ]),
              _: 3
            }, 8, ["name"])
          ]),
          z(s).todayButton ? (A(), P($e, { key: 0 }, [
            l.$slots["today-button"] ? R(l.$slots, "today-button", {
              key: 0,
              navigate: () => !z(t).containsToday && z(t).goToToday(),
              active: z(t).containsToday
            }) : (A(), P("button", {
              key: 1,
              class: Fe(["vuecal__nav vuecal__nav--today vuecal__nav--default", { "vuecal__nav--active": z(t).containsToday }]),
              onClick: i[1] || (i[1] = (c) => !z(t).containsToday && z(t).goToToday()),
              disabled: !!z(t).containsToday,
              type: "button",
              innerHTML: z(e).texts.today
            }, null, 10, Eo))
          ], 64)) : re("", !0),
          Ye("button", {
            class: Fe(["vuecal__nav vuecal__nav--next", { "vuecal__nav--default": !l.$slots["next-button"] }]),
            onClick: i[2] || (i[2] = (...c) => z(t).next && z(t).next(...c)),
            type: "button"
          }, [
            R(l.$slots, "next-button")
          ], 2)
        ])) : re("", !0)
      ], 64))
    ]));
  }
}, _o = ["draggable"], No = { class: "vuecal__event-details" }, Io = { class: "vuecal__event-title" }, zo = {
  key: 0,
  class: "vuecal__event-time"
}, Vo = {
  key: 0,
  class: "vuecal__event-comma"
}, Yo = { class: "vuecal__event-start" }, Fo = {
  key: 1,
  class: "vuecal__event-end"
}, Wo = { key: 0 }, Lo = ["innerHTML"], Ao = 16, Os = {
  __name: "event",
  props: {
    event: { type: Object, required: !0 },
    inAllDayBar: { type: Boolean, default: !1 },
    cellStart: { type: Date, required: !0 },
    cellEnd: { type: Date, required: !0 }
  },
  emits: ["event-drag-start", "event-drag-end", "event-resize-start", "event-resize-end"],
  setup(n, { emit: e }) {
    const t = n, { config: s, view: a, dnd: r, touch: l, dateUtils: i, eventsManager: c } = yt("vuecal"), { handleEventResize: w } = c, v = Me(null), f = Je(t.event);
    let E = null;
    const k = Je({
      dragging: !1,
      fromResizer: !1,
      // If the drag originates from the resizer element.
      holding: !1,
      // When the event is clicked and hold for a certain amount of time.
      holdTimer: null,
      // event click and hold detection.
      canTouchAndDrag: null,
      // Wait for 500ms before allowing an event to be dragged after touchstart.
      touchAndDragTimer: null,
      // Timer for canTouchAndDrag.
      startX: 0,
      // The X coords at the start of the drag.
      startY: 0,
      // The Y coords at the start of the drag.
      startPercentageX: 0,
      // The X coords in percentage at the start of the drag.
      startPercentageY: 0,
      // The Y coords in percentage at the start of the drag.
      moveX: 0,
      // The X coords while dragging.
      moveY: 0,
      // The Y coords while dragging.
      movePercentageX: 0,
      // The X coords in percentage while dragging.
      movePercentageY: 0,
      // The Y coords in percentage while dragging.
      documentMouseX: 0,
      // Document mouse X position for horizontal resizing
      documentMouseY: 0,
      // Document mouse Y position for horizontal resizing
      resizeStartDate: null,
      // When resizing and going above the start date (end before start) update the start instead of the end.
      resizingOriginalEvent: null,
      // Store the original event details while resizing.
      resizingLastAcceptedEvent: null,
      // Store the last accepted event details while resizing.
      cellEl: null,
      // Store the cell DOM node for a more efficient resizing calc in mousemove/touchmove.
      schedule: null
    }), g = Y(() => s.editableEvents.drag && f.draggable !== !1 && !f.background && k.canTouchAndDrag !== !1), p = Y(() => a.isMonth || a.isYear || a.isYears || t.inAllDayBar || f._.multiday && !q.value ? !1 : s.time && s.editableEvents.resize && f.resizable !== !1 && !f.background);
    Y(() => s.editableEvents.delete && f.deletable !== !1 && !f.background);
    const M = Y(() => {
      var m, U, Q, ne, ae;
      const I = !!((m = f._) != null && m.multiday), d = s.horizontal, S = !t.inAllDayBar && (((U = f._) == null ? void 0 : U.startMinutes) < s.timeFrom || I && !h.value), C = !t.inAllDayBar && (((Q = f._) == null ? void 0 : Q.endMinutes) > s.timeTo || I && !q.value);
      return {
        [`vuecal__event--${f._.id}`]: !0,
        [f.class]: !!f.class,
        "vuecal__event--recurring": !!f.recurring,
        "vuecal__event--background": !!f.background,
        "vuecal__event--all-day": f.allDay || ((ne = f._) == null ? void 0 : ne.startMinutes) === 0 && ((ae = f._) == null ? void 0 : ae.duration) === 1440,
        "vuecal__event--multiday": I,
        // In horizontal mode, cut-top becomes cut-left and cut-bottom becomes cut-right.
        "vuecal__event--cut-top": !d && S,
        "vuecal__event--cut-bottom": !d && C,
        "vuecal__event--cut-left": d && S,
        "vuecal__event--cut-right": d && C,
        // Only apply the dragging class on the event copy that is being dragged.
        "vuecal__event--dragging": !f._.draggingGhost && f._.dragging,
        // Only apply the dragging-ghost class on the event original that remains fixed while a copy is being
        // dragged. Sometimes when dragging fast the dragging-ghost class would get stuck and events stays
        // invisible, so if dragging is false, disable the dragging-ghost class as well.
        // On event drop, if the new position of the event is approved, only remove the dragging-ghost class
        // after event deletion (event._.dragging is already false) so the event ghost does not flash in before
        // deletion.
        "vuecal__event--dragging-ghost": f._.draggingGhost,
        "vuecal__event--resizing": l.isResizingEvent
      };
    }), h = Y(() => f._.multiday ? i.isSameDate(f.start, t.cellStart) : !0), q = Y(() => f._.multiday ? i.isSameDate(new Date(new Date(f.end).setMilliseconds(-1)), t.cellEnd) : !0), o = Y(() => i.countDays(f.start, f.end)), O = Y(() => {
      const I = (a.isDay || a.isDays || a.isWeek) && s.time && !t.inAllDayBar, d = s.horizontal;
      if (!I && !f.backgroundColor && !f.color) return !1;
      const S = {
        backgroundColor: f.backgroundColor || null,
        color: f.color || null
      };
      if (I) {
        let C = f._.startMinutes, m = f._.endMinutes;
        f._.multiday && (h.value || (C = 0), q.value || (m = 1440));
        const U = Math.max(s.timeFrom, C), Q = Math.min(s.timeTo, m) + (f._.duration && !m ? 1440 : 0), ne = ht(U, s), ae = ht(Q, s) - ne;
        S[d ? "left" : "top"] = `${ne}%`, S[d ? "width" : "height"] = `${ae}%`;
      }
      return S;
    }), Z = Y(() => {
      const I = { ...s.eventListeners.event };
      for (const [S, C] of Object.entries(I))
        ["resize-end"].includes(S) || (I[S] = (m) => {
          m.type !== "drop" && C(m.type ? { e: m, event: f } : m);
        });
      const d = { ...I };
      return I.touchstart = (S) => {
        var C;
        S.stopPropagation(), k.touchAndDragTimer = setTimeout(() => {
          k.canTouchAndDrag = !0;
        }, 500), N(S), (C = d.touchstart) == null || C.call(d, { e: S, event: f });
      }, I.mousedown = (S) => {
        var C;
        S.stopPropagation(), N(S), (C = d.mousedown) == null || C.call(d, { e: S, event: f });
      }, I.click = (S) => {
        var C;
        (C = d.click) == null || C.call(d, { e: S, event: f }), E ? E = clearTimeout(E) : E = setTimeout(() => {
          var m;
          E = null, (m = d["delayed-click"]) == null || m.call(d, { e: S, event: f });
        }, 400);
      }, I.dblclick = (S) => {
        d.dblclick ? d.dblclick({ e: S, event: f }) : f.delete(1);
      }, I;
    });
    let V = null, _ = 0;
    const N = (I) => {
      var m, U, Q, ne;
      const d = ((m = I.touches) == null ? void 0 : m[0]) || I;
      k.fromResizer = (U = d.target) == null ? void 0 : U.closest(".vuecal__event-resizer");
      const S = Date.now();
      (!V || S - _ > Ao) && (V = v.value.getBoundingClientRect(), _ = S);
      const C = V;
      k.startX = (((Q = I.touches) == null ? void 0 : Q[0]) || I).clientX - C.left, k.startY = (((ne = I.touches) == null ? void 0 : ne[0]) || I).clientY - C.top, k.startPercentageX = k.startX * 100 / C.width, k.startPercentageY = k.startY * 100 / C.height, k.cellEl = v.value.closest(".vuecal__cell"), k.resizeStartDate = f.start, k.fromResizer && w(I, f, v.value), k.holdTimer = setTimeout(() => {
        var ae, ue;
        k.holding = !0, (ue = (ae = Z.value).hold) == null || ue.call(ae, { e: I, event: f });
      }, 1e3);
    };
    return Vn(() => f._.register(v.value)), $t(() => {
      k.holdTimer && (k.holdTimer = clearTimeout(k.holdTimer)), k.touchAndDragTimer && (k.touchAndDragTimer = clearTimeout(k.touchAndDragTimer)), E && (E = clearTimeout(E)), f._.unregister();
    }), (I, d) => (A(), P("div", pe({ class: "vuecal__event" }, Kt(Z.value, !0), {
      ref_key: "eventEl",
      ref: v,
      class: M.value,
      style: O.value,
      draggable: g.value ? "true" : void 0,
      onDragstart: d[2] || (d[2] = (S) => g.value && z(r).eventDragStart(S, f)),
      onDragend: d[3] || (d[3] = (S) => g.value && z(r).eventDragEnd(S, f))
    }), [
      Ye("div", No, [
        I.$slots["event.all-day"] ? R(I.$slots, "event.all-day", {
          key: 0,
          event: f
        }) : I.$slots[`event.${z(a).id}`] ? R(I.$slots, `event.${z(a).id}`, {
          key: 1,
          event: f
        }) : R(I.$slots, "event", {
          key: 2,
          event: f
        }, () => [
          Ye("div", Io, Oe(f.title), 1),
          z(s).time && !n.inAllDayBar && !(f._.multiday && !h.value) ? (A(), P("div", zo, [
            z(a).isMonth ? (A(), P("span", Vo, ",")) : re("", !0),
            Ye("span", Yo, Oe(f._[`startTimeFormatted${z(s).twelveHour ? 12 : 24}`]), 1),
            z(a).isMonth ? re("", !0) : (A(), P("span", Fo, [
              en(" - " + Oe(f._[`endTimeFormatted${z(s).twelveHour ? 12 : 24}`]), 1),
              f._.multiday && h.value ? (A(), P("span", Wo, "+" + Oe(o.value) + "d", 1)) : re("", !0)
            ]))
          ])) : re("", !0),
          n.inAllDayBar ? re("", !0) : (A(), P("div", {
            key: 1,
            class: "vuecal__event-content",
            innerHTML: f.content
          }, null, 8, Lo))
        ])
      ]),
      p.value ? (A(), P("div", {
        key: 0,
        class: "vuecal__event-resizer",
        onDragstart: d[0] || (d[0] = Bn(() => {
        }, ["prevent", "stop"]))
      }, null, 32)) : re("", !0),
      mt(on, { name: "vuecal-delete-btn" }, {
        default: J(() => [
          f._.deleting ? (A(), P("div", {
            key: 0,
            class: "vuecal__event-delete",
            onClick: d[1] || (d[1] = Bn((S) => f.delete(3), ["stop"]))
          }, "Delete")) : re("", !0)
        ]),
        _: 1
      })
    ], 16, _o));
  }
}, Ho = ["data-start"], Ro = ["innerHTML"], Po = ["data-schedule"], Zo = {
  key: 1,
  class: "vuecal__cell-date"
}, jo = {
  key: 2,
  class: "vuecal__cell-content"
}, xo = {
  key: 3,
  class: "vuecal__cell-events"
}, Bo = {
  key: 1,
  class: "vuecal__cell-date"
}, qo = {
  key: 2,
  class: "vuecal__cell-content"
}, Uo = {
  key: 3,
  class: "vuecal__cell-events"
}, Jo = {
  key: 5,
  class: "vuecal__cell-events-count"
}, Xo = ["title"], xa = {
  __name: "cell",
  props: {
    // Even with time=false, the date of the cell will still be provided in order to attach
    // events to a specific date.
    start: { type: Date, required: !0 },
    end: { type: Date, required: !0 },
    index: { type: Number, required: !0 },
    allDay: { type: Boolean, default: !1 }
    // True when the cell is an all-day cell.
  },
  setup(n) {
    const e = n, t = yt("vuecal"), { view: s, config: a, dateUtils: r, eventsManager: l, dnd: i, touch: c } = t, w = Y(() => r.isToday(e.start)), v = Me(null), f = Me([]), E = Me(!1), k = (T) => {
      f.value.push(T.detail), E.value = !0;
    }, g = () => setTimeout(() => E.value = !1, 300), p = Je({
      dragging: !1,
      holding: !1,
      // When the cell is clicked and hold for a certain amount of time.
      holdTimer: null,
      // Cell click and hold detection.
      thresholdPassed: !1,
      // If the drag threshold has been passed.
      canTouchAndDrag: null,
      // Wait for 500ms before allowing an event to be dragged after touchstart.
      touchAndDragTimer: null,
      // Timer for canTouchAndDrag.
      startX: 0,
      // The x position at the start of the drag (mousedown or touchstart).
      startY: 0,
      // The y position at the start of the drag (mousedown or touchstart).
      moveX: 0,
      moveY: 0,
      startPercentageX: 0,
      // The x position in percentage at the start of the drag (mousedown or touchstart).
      startPercentageY: 0,
      // The y position in percentage at the start of the drag (mousedown or touchstart).
      movePercentageX: 0,
      movePercentageY: 0,
      schedule: null
    }), M = Me(!1);
    let h = null;
    const q = Me({ cellOverlaps: {}, longestStreak: 0 }), o = Y(() => {
      const T = a.horizontal, L = T ? p.startPercentageX : p.startPercentageY, $ = T ? p.movePercentageX : p.movePercentageY;
      let H = Math.min(L, $), X = Math.max(L, $), B = lt(H, a), le = lt(X, a);
      return a.snapToInterval && (B = r.snapToInterval(B, a.snapToInterval), le = r.snapToInterval(le, a.snapToInterval), H = ht(B, a), X = ht(le, a)), {
        style: {
          [T ? "left" : "top"]: `${H}%`,
          [T ? "width" : "height"]: `${Math.abs(X - H)}%`
        },
        startMinutes: B,
        endMinutes: le,
        start: r.formatMinutes(B),
        end: r.formatMinutes(le),
        ...p.schedule ? { schedule: p.schedule } : {}
      };
    }), O = Y(() => {
      const T = a.editableEvents.create && (p.dragging || M.value), L = a.eventCreateMinDrag && p.thresholdPassed || !a.eventCreateMinDrag, $ = p.canTouchAndDrag !== !1;
      return T && L && $;
    }), Z = Y(() => {
      var b;
      const T = r.getCalendarYear(s.start), L = r.getCalendarMonth(s.start), $ = r.getCalendarYear(e.start), H = r.getCalendarMonth(e.start), X = tn[r.getWeekdaySun0(e.start)], B = r.getCalendarYear(s.now), le = r.getCalendarMonth(s.now);
      return {
        [`vuecal__cell--${X}`]: s.isDay || s.isDays || s.isWeek || s.isMonth,
        [`vuecal__cell--${Ga[H]}`]: s.isYear,
        [`vuecal__cell--${$}`]: s.isYears,
        "vuecal__cell--today": w.value,
        "vuecal__cell--current-month": s.isYear && $ === B && H === le,
        "vuecal__cell--current-year": s.isYears && $ === B,
        "vuecal__cell--out-of-range": s.isMonth && ($ !== T || H !== L),
        "vuecal__cell--before-min": ne.value && U.value,
        "vuecal__cell--after-max": ne.value && Q.value,
        "vuecal__cell--disabled": ne.value,
        "vuecal__cell--selected": s.selectedDate && s.selectedDate.getTime() >= e.start.getTime() && s.selectedDate.getTime() <= e.end.getTime(),
        "vuecal__cell--has-schedules": (b = a.schedules) == null ? void 0 : b.length,
        "vuecal__cell--dragging": p.dragging,
        "vuecal__cell--has-events": _.value.length
      };
    });
    Y(() => r.formatDate(e.start));
    const V = Y(() => {
      switch (s.id) {
        case "day":
          return "";
        case "days":
          return a.availableViews.days.rows > 1 && r.formatDate(e.start, "D"), "";
        case "week":
          return "";
        case "month":
          return r.formatDate(e.start, "D");
        case "year":
          return r.formatDate(e.start, a.xs ? "MMM" : "MMMM");
        case "years":
          return r.formatDate(e.start, "YYYY");
      }
    }), _ = Y(() => a.datePicker ? [] : l.getEventsInRange(
      e.start,
      e.end,
      { excludeIds: f.value, ...a.allDayEvents ? { allDay: e.allDay } : {} }
    )), N = Y(() => _.value.filter((T) => !T.background)), I = Y(() => {
      var T;
      return (T = a.schedules) == null ? void 0 : T.reduce((L, $) => (L[$.id] = _.value.filter((H) => H.schedule === $.id), L), {});
    }), d = Y(() => {
      if (s.isMonth || s.isYear || s.isYears || e.allDay) return {};
      const T = typeof document < "u" && document.documentElement.getAttribute("dir") === "rtl", L = a.horizontal, $ = {};
      for (const H of _.value) {
        const X = H._.id, { maxConcurrent: B = 1, position: le = 0 } = q.value.cellOverlaps[X] || {}, b = T ? "right" : "left", j = L ? "height" : "width";
        $[X] = { [L ? "top" : b]: `${100 / B * le}%` }, a.stackEvents ? $[X][j] = `${100 / B + (le === B - 1 ? 0 : 15)}%` : $[X][j] = `${100 / B}%`;
      }
      return $;
    }), S = Y(() => {
      const T = {};
      for (const L of _.value) {
        const $ = L._.id, { maxConcurrent: H = 1, position: X = 0 } = q.value.cellOverlaps[$] || {};
        T[$] = `vuecal__event--stack-${X + 1}-${H}`;
      }
      return T;
    }), C = Y(() => a.showCellEventCount && N.value.length), m = Y(() => {
      var H;
      if (!a.specialHours || s.isMonth || s.isYear || s.isYears || e.allDay) return;
      const T = tn[r.getWeekdaySun0(e.start)], L = a.horizontal;
      let $ = (H = a.specialHours) == null ? void 0 : H[T];
      if ($)
        return Array.isArray($) || ($ = [$]), $.map((X) => {
          let { from: B, to: le, class: b, label: j } = X;
          if (isNaN(B) || isNaN(le) || a.timeFrom >= le || a.timeTo <= B) return;
          B = Math.max(a.timeFrom, B), le = Math.min(a.timeTo, le);
          const ee = ht(B, a), K = ht(le, a) - ee;
          return {
            style: {
              [L ? "left" : "top"]: `${ee}%`,
              [L ? "width" : "height"]: `${K}%`
            },
            label: j,
            class: b
          };
        }).filter((X) => !!X);
    }), U = Y(() => a.minTimestamp !== null && a.minTimestamp > e.end.getTime()), Q = Y(() => a.maxTimestamp && a.maxTimestamp < e.start.getTime()), ne = Y(() => {
      const { disableDays: T } = a, L = s.isYear || s.isYears;
      return T.length && T.includes(r.formatDate(e.start)) && !L ? !0 : U.value || Q.value;
    }), ae = Je({
      show: Y(() => {
        if (!(!s.isDay && !s.isDays && !s.isWeek) && !(!w.value || !a.time || e.allDay) && !(a.timeFrom > r.dateToMinutes(s.now)) && !(r.dateToMinutes(s.now) > a.timeTo))
          return !0;
      }),
      nowInMinutes: Y(() => r.dateToMinutes(s.now)),
      todaysTimePosition: Y(() => ht(ae.nowInMinutes, a)),
      style: Y(() => `${a.horizontal ? "left" : "top"}: ${ae.todaysTimePosition}%`),
      currentTime: Y(() => r.formatTime(s.now, a.twelveHour ? "h:mm {am}" : "HH:mm"))
    }), ue = Y(() => {
      if (ne.value) return {};
      const T = { ...a.eventListeners.cell };
      for (const [$, H] of Object.entries(T))
        T[$] = (X) => {
          var B, le, b;
          (b = (le = X.target || ((B = X.e) == null ? void 0 : B.target)).closest) != null && b.call(le, ".vuecal__event") || H(X.type ? { e: X, cell: ie.value, cursor: be.value, view: s } : X);
        };
      const L = { ...T };
      return T.click = ($) => {
        var X;
        De();
        const H = Ge($);
        (X = L.click) == null || X.call(L, { e: $, cell: ie.value, cursor: H, view: s }), h ? h = clearTimeout(h) : h = setTimeout(() => {
          var B;
          h = null, (B = L["delayed-click"]) == null || B.call(L, { e: $, cell: ie.value, cursor: H, view: s });
        }, 400);
      }, (a.time && s.isDay || s.isDays || s.isWeek) && (T.touchstart = ($) => {
        var H;
        Qe($.e || $), (H = L.touchstart) == null || H.call(L, { e: $, cell: ie.value, cursor: be.value, view: s });
      }, T.mousedown = ($) => {
        var H;
        Qe($.e || $), (H = L.mousedown) == null || H.call(L, { e: $, cell: ie.value, cursor: be.value, view: s });
      }), L.dblclick && (T.dblclick = ($) => {
        var H;
        (H = L.dblclick) == null || H.call(L, { e: $, cell: ie.value, cursor: Ge($), view: s });
      }), a.editableEvents.drag && (T.dragenter = ($) => i.cellDragEnter($, ie.value), T.dragover = ($) => {
        $.preventDefault(), i.cellDragOver($, ie.value);
      }, T.dragleave = ($) => i.cellDragLeave($, ie.value), T.drop = ($) => i.cellDragDrop($, ie.value, e.allDay)), T;
    }), ie = Y(() => ({
      start: e.start,
      end: e.end,
      events: _,
      ...p.schedule ? { schedule: p.schedule } : {},
      goNarrower: () => s.narrower(),
      goBroader: () => s.broader(),
      broader: s.broaderView,
      narrower: s.narrowerView
    })), Ge = (T) => {
      var j;
      const L = a.horizontal, { clientX: $, clientY: H } = ((j = T.touches) == null ? void 0 : j[0]) || T, { top: X, left: B } = v.value.getBoundingClientRect(), le = L ? ($ - B) * 100 / v.value.clientWidth : Yn(H - X, v.value), b = new Date(e.start);
      return b.setMinutes(lt(le, a)), { [L ? "x" : "y"]: le, date: b };
    }, be = Y(() => {
      const L = a.horizontal ? p.movePercentageX || p.startPercentageX : p.movePercentageY || p.startPercentageY, $ = lt(L, a), H = new Date(e.start);
      return H.setMinutes($), {
        x: p.movePercentageX || p.startPercentageX,
        y: p.movePercentageY || p.startPercentageY,
        date: H
      };
    }), De = () => {
      s.updateSelectedDate(e.start), a.clickToNavigate && ((s.isMonth || s.isDays || s.isWeek) && a.availableViews.day ? s.switch("day") : s.isYear && a.availableViews.month ? s.switch("month") : s.isYears && a.availableViews.year && s.switch("year")), s.updateViewDate(e.start);
    }, Qe = (T) => {
      var H, X;
      const L = T.type === "touchstart";
      L ? (p.canTouchAndDrag = !1, p.touchAndDragTimer = setTimeout(() => {
        p.canTouchAndDrag = !0, (p.holding || p.dragging) && T.preventDefault();
      }, 500)) : p.canTouchAndDrag = !0, p.schedule = ~~T.target.dataset.schedule;
      const $ = v.value.getBoundingClientRect();
      p.startX = (((H = T.touches) == null ? void 0 : H[0]) || T).clientX - $.left, p.startY = (((X = T.touches) == null ? void 0 : X[0]) || T).clientY - $.top, p.startPercentageX = p.startX * 100 / $.width, p.startPercentageY = p.startY * 100 / $.height, p.thresholdPassed = !1, document.addEventListener(L ? "touchmove" : "mousemove", et, { passive: !L }), document.addEventListener(L ? "touchend" : "mouseup", he, { once: !0 }), p.holdTimer = setTimeout(() => {
        var B, le;
        p.holding = !0, (le = (B = ue.value).hold) == null || le.call(B, { e: T, cell: ie.value, cursor: be.value, view: s });
      }, 1e3);
    }, et = (T) => {
      var B, le, b, j, ee, K;
      const L = T.type === "touchmove", $ = a.horizontal;
      if (L && !p.canTouchAndDrag) {
        p.touchAndDragTimer && (clearTimeout(p.touchAndDragTimer), p.touchAndDragTimer = null), he(T);
        return;
      }
      L && T.preventDefault(), p.dragging || (c.isDraggingCell = !0, (le = (B = ue.value)["drag-start"]) == null || le.call(B, { e: T, cell: ie.value, cursor: be.value, view: s })), p.dragging = !0, p.holdTimer = clearTimeout(p.holdTimer), p.holding = !1;
      const H = v.value.getBoundingClientRect();
      p.moveX = (((b = T.touches) == null ? void 0 : b[0]) || T).clientX - H.left, p.moveY = (((j = T.touches) == null ? void 0 : j[0]) || T).clientY - H.top, p.movePercentageX = p.moveX * 100 / H.width, p.movePercentageY = p.moveY * 100 / H.height;
      const X = Math.abs($ ? p.startX - p.moveX : p.startY - p.moveY);
      a.eventCreateMinDrag && X > a.eventCreateMinDrag && (p.thresholdPassed = !0), (K = (ee = ue.value).drag) == null || K.call(ee, { e: T, cell: ie.value, cursor: be.value, view: s });
    }, he = async (T) => {
      var $, H;
      const L = T.type === "touchend";
      document.removeEventListener(L ? "touchmove" : "mousemove", et, { passive: !1 }), p.touchAndDragTimer && (clearTimeout(p.touchAndDragTimer), p.touchAndDragTimer = null), p.dragging && ((H = ($ = ue.value)["drag-end"]) == null || H.call($, { e: T, cell: ie.value, cursor: be.value, view: s }), c.isDraggingCell = !1, a.editableEvents.create && p.canTouchAndDrag && (M.value = !0, await Ee(T), M.value = !1)), p.holdTimer = clearTimeout(p.holdTimer), p.holding = !1, p.dragging = !1, p.startX = 0, p.startY = 0, p.moveX = 0, p.moveY = 0, p.startPercentageX = 0, p.startPercentageY = 0, p.movePercentageX = 0, p.movePercentageY = 0, p.thresholdPassed = !1, p.schedule = null, p.canTouchAndDrag = null;
    }, Ee = async (T) => {
      var b;
      if (!O.value) return;
      let { start: L, end: $, startMinutes: H, endMinutes: X } = o.value;
      L = new Date(e.start), L.setMinutes(H), $ = new Date(e.start), $.setMinutes(X);
      let B = { ...o.value, start: L, end: $ };
      const { create: le } = a.eventListeners.event;
      if (typeof le == "function") {
        const j = B;
        B = await new Promise((ee) => le({ e: T, event: B, cell: ie.value, resolve: ee, cursor: be.value, view: s })), B && typeof B == "object" && s.createEvent(B), B && typeof B == "boolean" && s.createEvent(j);
      } else s.createEvent(B);
      (b = navigator.vibrate) == null || b.call(navigator, 200);
    }, Ke = () => {
      var T;
      for (const L of Object.keys(ue.value))
        (T = v.value) == null || T.removeEventListener(L, ue.value[L]);
    }, wt = () => {
      q.value = l.getCellOverlappingEvents(e.start, e.end, e.allDay);
    };
    return ze(
      // Watch event IDs and start/end dates (only) to detect event resizing/dnd.
      () => !s.isYears && !s.isYear && N.value.map((T) => `${T._.id}${T.start.getTime()}${T.end.getTime()}`).join(),
      async () => {
        await Qt(), wt();
      },
      { immediate: !0, flush: "post" }
      // Use flush: 'post' to prevent infinite updates.
    ), $t(async () => {
      for (const T of f.value) l.deleteEvent(T, 3);
      Ke(), h && (h = clearTimeout(h)), await Qt();
    }), (T, L) => (A(), P("div", pe({
      class: "vuecal__cell",
      ref_key: "cellEl",
      ref: v
    }, Kt(ue.value, !0), {
      "data-start": e.start.getTime(),
      class: Z.value
    }), [
      T.$slots.cell ? R(T.$slots, "cell", {
        key: 0,
        cell: ie.value
      }) : re("", !0),
      m.value ? (A(!0), P($e, { key: 1 }, Ae(m.value, ($, H) => (A(), P("div", {
        class: Fe(["vuecal__special-hours", $.class]),
        style: qe($.style),
        innerHTML: $.label || ""
      }, null, 14, Ro))), 256)) : re("", !0),
      !T.$slots.cell && z(a).schedules ? (A(!0), P($e, { key: 2 }, Ae(z(a).schedules, ($) => (A(), P("div", {
        class: Fe(["vuecal__schedule vuecal__schedule--cell", $.class]),
        key: $.id,
        style: qe($.style || null),
        "data-schedule": $.id
      }, [
        T.$slots["cell-events"] ? R(T.$slots, "cell-events", {
          key: 0,
          cell: ie.value
        }) : re("", !0),
        V.value || T.$slots["cell-date"] ? (A(), P("div", Zo, [
          R(T.$slots, "cell-date", { cell: ie.value }, () => [
            en(Oe(V.value), 1)
          ])
        ])) : re("", !0),
        T.$slots["cell-content"] ? (A(), P("div", jo, [
          R(T.$slots, "cell-content", { cell: ie.value })
        ])) : re("", !0),
        T.$slots["cell-events"] && _.value.length ? (A(), P("div", xo, [
          R(T.$slots, "cell-events", { cell: ie.value })
        ])) : _.value.length || E.value ? (A(), nt(qn, {
          key: 4,
          class: "vuecal__cell-events",
          name: "vuecal-event-delete",
          onBeforeLeave: L[0] || (L[0] = (H) => E.value = !0),
          onAfterLeave: g,
          tag: "div"
        }, {
          default: J(() => [
            (A(!0), P($e, null, Ae(I.value[$.id], (H) => (A(), nt(Os, {
              key: H._.id,
              event: H,
              onEventDeleted: k,
              "in-all-day-bar": e.allDay,
              "cell-start": e.start,
              "cell-end": e.end,
              style: qe(d.value[H._.id])
            }, ot({ _: 2 }, [
              T.$slots["event.all-day"] && e.allDay ? {
                name: "event.all-day",
                fn: J((X) => [
                  R(T.$slots, "event.all-day", pe({ ref_for: !0 }, X))
                ]),
                key: "0"
              } : void 0,
              T.$slots[`event.${z(s).id}`] ? {
                name: `event.${z(s).id}`,
                fn: J((X) => [
                  R(T.$slots, `event.${z(s).id}`, pe({ ref_for: !0 }, X))
                ]),
                key: "1"
              } : void 0,
              T.$slots.event ? {
                name: "event",
                fn: J((X) => [
                  R(T.$slots, "event", pe({ ref_for: !0 }, X))
                ]),
                key: "2"
              } : void 0
            ]), 1032, ["event", "in-all-day-bar", "cell-start", "cell-end", "style"]))), 128))
          ]),
          _: 2
        }, 1024)) : re("", !0),
        O.value && p.schedule === $.id && !e.allDay ? (A(), P("div", {
          key: 5,
          class: "vuecal__event-placeholder",
          style: qe(o.value.style)
        }, Oe(o.value.start) + " - " + Oe(o.value.end), 5)) : re("", !0)
      ], 14, Po))), 128)) : re("", !0),
      !T.$slots.cell && !z(a).schedules ? (A(), P($e, { key: 3 }, [
        T.$slots["cell-events"] ? R(T.$slots, "cell-events", {
          key: 0,
          cell: ie.value
        }) : re("", !0),
        V.value || T.$slots["cell-date"] ? (A(), P("div", Bo, [
          R(T.$slots, "cell-date", { cell: ie.value }, () => [
            en(Oe(V.value), 1)
          ])
        ])) : re("", !0),
        T.$slots["cell-content"] ? (A(), P("div", qo, [
          R(T.$slots, "cell-content", { cell: ie.value })
        ])) : re("", !0),
        T.$slots["cell-events"] && _.value.length ? (A(), P("div", Uo, [
          R(T.$slots, "cell-events", { cell: ie.value })
        ])) : !(z(s).isMonth && !z(a).eventsOnMonthView) && !z(s).isYear && !z(s).isYears && (_.value.length || E.value) ? (A(), nt(qn, {
          key: 4,
          class: "vuecal__cell-events",
          name: "vuecal-event-delete",
          onBeforeLeave: L[1] || (L[1] = ($) => E.value = !0),
          onAfterLeave: g,
          tag: "div"
        }, {
          default: J(() => [
            (A(!0), P($e, null, Ae(_.value, ($) => (A(), nt(Os, {
              key: $._.id,
              event: $,
              onEventDeleted: k,
              "in-all-day-bar": e.allDay,
              "cell-start": e.start,
              "cell-end": e.end,
              class: Fe(S.value[$._.id]),
              style: qe(d.value[$._.id])
            }, ot({ _: 2 }, [
              T.$slots["event.all-day"] && e.allDay ? {
                name: "event.all-day",
                fn: J((H) => [
                  R(T.$slots, "event.all-day", pe({ ref_for: !0 }, H))
                ]),
                key: "0"
              } : void 0,
              T.$slots[`event.${z(s).id}`] ? {
                name: `event.${z(s).id}`,
                fn: J((H) => [
                  R(T.$slots, `event.${z(s).id}`, pe({ ref_for: !0 }, H))
                ]),
                key: "1"
              } : void 0,
              T.$slots.event ? {
                name: "event",
                fn: J((H) => [
                  R(T.$slots, "event", pe({ ref_for: !0 }, H))
                ]),
                key: "2"
              } : void 0
            ]), 1032, ["event", "in-all-day-bar", "cell-start", "cell-end", "class", "style"]))), 128))
          ]),
          _: 3
        })) : re("", !0),
        O.value ? (A(), P("div", {
          key: 5,
          class: "vuecal__event-placeholder",
          style: qe(o.value.style)
        }, Oe(o.value.start) + " - " + Oe(o.value.end), 5)) : re("", !0)
      ], 64)) : re("", !0),
      T.$slots["event-count"] ? R(T.$slots, "event-count", {
        key: 4,
        events: N.value
      }) : C.value ? (A(), P("div", Jo, Oe(N.value.length), 1)) : re("", !0),
      ae.show ? (A(), P("div", {
        key: 6,
        class: "vuecal__now-line",
        style: qe(ae.style),
        title: ae.currentTime
      }, [
        R(T.$slots, "now-line", {
          now: z(s).now,
          timeFormatted: ae.currentTime
        }, () => [
          Ye("span", null, Oe(ae.currentTime), 1)
        ])
      ], 12, Xo)) : re("", !0)
    ], 16, Ho));
  }
}, Go = {
  key: 0,
  class: "vuecal__headings"
}, Qo = {
  key: 0,
  class: "vuecal__weekdays-headings"
}, Ko = ["onClick"], el = { class: "vuecal__weekday-day" }, tl = {
  key: 0,
  class: "vuecal__weekday-date"
}, nl = {
  key: 1,
  class: "vuecal__schedules-headings"
}, sl = ["innerHTML"], al = {
  key: 2,
  class: "vuecal__all-day"
}, rl = {
  __name: "headings-bar",
  setup(n) {
    const e = yt("vuecal"), t = yt("$vuecalEl"), { view: s, config: a, dateUtils: r } = e, l = Y(() => a.xs ? "day-xs" : a.sm || s.isDays || s.isMonth ? "day-sm" : "day"), i = Y(() => (s.isDay || s.isDays || s.isWeek || s.isMonth) && !(s.isDay && !a.schedules && !a.allDayEvents)), c = Y(() => s.cellDates.slice(0, a.horizontal ? s.rows : s.cols).map(({ start: f }) => ({
      id: tn[r.getWeekdaySun0(f)],
      date: f,
      dateNumber: r.getCalendarDate(f),
      allDayEnd: r.endOfDay(f),
      day: r.formatDate(f, "dddd"),
      "day-sm": r.formatDate(f, "ddd"),
      "day-xs": r.formatDate(f, "dd"),
      isToday: r.isToday(f)
    }))), w = {
      click: (f) => {
        (s.isDays || s.isWeek) && s.updateSelectedDate(f);
      }
    }, v = {
      isResizing: Me(!1),
      startY: Me(0),
      initialHeight: Me(0),
      defaultHeight: 25,
      // Default height in pixels.
      // Or in the case of horizontal layout.
      startX: Me(0),
      initialWidth: Me(0),
      defaultWidth: 25,
      // Default width in pixels.
      // Cleanup event listeners.
      cleanup() {
        typeof document < "u" && (document.removeEventListener("mousemove", v.handleMouseMove), document.removeEventListener("mouseup", v.cleanup), document.removeEventListener("touchmove", v.handleTouchMove, { passive: !1 }), document.removeEventListener("touchend", v.cleanup)), v.isResizing.value = !1;
      },
      startResize(f, E) {
        this.isResizing.value = !0;
        const k = a.horizontal;
        this[k ? "startX" : "startY"].value = k ? f : E;
        const g = getComputedStyle(t.value).getPropertyValue("--vuecal-all-day-bar-size"), p = document.createElement("div");
        p.style.position = "absolute", p.style.visibility = "hidden", p.style[k ? "width" : "height"] = g, document.body.appendChild(p);
        const M = p[k ? "offsetWidth" : "offsetHeight"];
        p.remove(), M > 0 && (this[k ? "initialWidth" : "initialHeight"].value = M), document.addEventListener("mousemove", v.handleMouseMove), document.addEventListener("mouseup", v.cleanup), document.addEventListener("touchmove", v.handleTouchMove, { passive: !1 }), document.addEventListener("touchend", v.cleanup);
      },
      // Update height/width based on mouse/touch movement.
      updateSize(f, E) {
        var M;
        if (!this.isResizing.value) return;
        const k = a.horizontal, g = k ? f - this.startX.value : E - this.startY.value, p = Math.max(20, this[k ? "initialWidth" : "initialHeight"].value + g);
        (M = t.value) == null || M.style.setProperty("--vuecal-all-day-bar-size", `${p}px`);
      },
      // Mouse event handlers.
      handleMouseDown(f) {
        this.startResize(f.clientX, f.clientY);
      },
      handleMouseMove(f) {
        v.updateSize(f.clientX, f.clientY);
      },
      // Touch event handlers.
      handleTouchStart(f) {
        var E;
        (E = f.touches) != null && E[0] && this.startResize(f.touches[0].clientX, f.touches[0].clientY);
      },
      handleTouchMove(f) {
        var E;
        (E = f.touches) != null && E[0] && (v.updateSize(f.touches[0].clientX, f.touches[0].clientY), f.preventDefault());
      }
    };
    return $t(() => {
      v.cleanup();
    }), (f, E) => i.value ? (A(), P("div", Go, [
      z(s).isDay ? re("", !0) : (A(), P("div", Qo, [
        (A(!0), P($e, null, Ae(c.value, (k, g) => (A(), P("div", {
          class: Fe(["vuecal__weekday", { "vuecal__weekday--today": k.isToday }]),
          key: g,
          onClick: (p) => w.click(k.date)
        }, [
          R(f.$slots, "weekday-heading", {
            label: k[l.value],
            id: k.id,
            date: k.date
          }, () => [
            Ye("span", el, Oe(k[l.value]), 1),
            z(s).isMonth ? re("", !0) : (A(), P("strong", tl, Oe(k.dateNumber), 1))
          ])
        ], 10, Ko))), 128))
      ])),
      z(a).schedules ? (A(), P("div", nl, [
        (A(!0), P($e, null, Ae(c.value, (k, g) => (A(), P($e, { key: g }, [
          (A(!0), P($e, null, Ae(z(a).schedules, (p, M) => (A(), P($e, { key: M }, [
            f.$slots["schedule-heading"] ? (A(), P("div", {
              key: 0,
              class: Fe(["vuecal__schedule vuecal__schedule--heading", p.class])
            }, [
              R(f.$slots, "schedule-heading", {
                schedule: p,
                view: z(s)
              })
            ], 2)) : (A(), P("div", {
              key: 1,
              class: Fe(["vuecal__schedule vuecal__schedule--heading", p.class]),
              innerHTML: p.label
            }, null, 10, sl))
          ], 64))), 128))
        ], 64))), 128))
      ])) : re("", !0),
      z(a).allDayEvents ? (A(), P("div", al, [
        (A(!0), P($e, null, Ae(c.value, (k, g) => (A(), nt(xa, {
          class: Fe(["vuecal__all-day-cell", { "vuecal__weekday--today": k.isToday }]),
          key: g,
          start: k.date,
          end: k.allDayEnd,
          index: g,
          "all-day": ""
        }, ot({ _: 2 }, [
          f.$slots["event.all-day"] ? {
            name: "event.all-day",
            fn: J((p) => [
              R(f.$slots, "event.all-day", pe({ ref_for: !0 }, p))
            ]),
            key: "0"
          } : {
            name: "event",
            fn: J((p) => [
              R(f.$slots, "event", pe({ ref_for: !0 }, p))
            ]),
            key: "1"
          }
        ]), 1032, ["class", "start", "end", "index"]))), 128)),
        Ye("div", {
          class: "vuecal__all-day-resizer",
          onMousedown: E[0] || (E[0] = (...k) => v.handleMouseDown && v.handleMouseDown(...k)),
          onTouchstart: E[1] || (E[1] = (...k) => v.handleTouchStart && v.handleTouchStart(...k))
        }, null, 32)
      ])) : re("", !0)
    ])) : re("", !0);
  }
}, il = { class: "vuecal__time-column" }, ol = {
  key: 0,
  class: "vuecal__all-day-label"
}, ll = {
  __name: "time-column",
  setup(n) {
    const e = yt("vuecal"), { config: t, texts: s } = e, a = Y(() => {
      const r = [];
      for (let i = t.timeFrom; i < t.timeTo; i += t.timeStep) {
        const c = i + t.timeStep > t.timeTo, w = ~~(i / 60), v = i % 60, f = s[i < 720 ? "am" : "pm"];
        let E = null;
        c && (E = `calc(var(--vuecal-time-cell-size) * ${(t.timeTo - i) / t.timeStep})`), r.push({
          minutesSum: i,
          // The sum of hours + minutes in minutes.
          hours: w,
          minutes: v,
          formatted12: `${w % 12 ? w % 12 : 12}${v ? `:${v.toString().padStart(2, 0)}` : ""}${f}`,
          formatted24: `${w.toString().padStart(2, 0)}:${v.toString().padStart(2, 0)}`,
          height: E
        });
      }
      return r;
    });
    return (r, l) => (A(), P("div", il, [
      z(t).allDayEvents ? (A(), P("div", ol, [
        R(r.$slots, "all-day-label", {}, () => [
          en(Oe(z(e).texts.allDay), 1)
        ])
      ])) : re("", !0),
      (A(!0), P($e, null, Ae(a.value, (i, c) => (A(), P("div", {
        class: "vuecal__time-cell",
        key: c,
        style: qe({ height: i.height || null })
      }, [
        R(r.$slots, "time-cell", {
          index: c,
          minutes: i.minutes,
          hours: i.hours,
          minutesSum: i.minutesSum,
          format12: i.formatted12,
          format24: i.formatted24
        }, () => [
          Ye("label", null, Oe(z(t).twelveHour ? i.formatted12 : i.formatted24), 1)
        ])
      ], 4))), 128))
    ]));
  }
}, ul = {
  __name: "body",
  setup(n) {
    const e = yt("vuecal"), { view: t, config: s, dateUtils: a, touch: r, eventsManager: l } = e, i = Me(null), c = Me(null), w = Me(null), { resizeState: v } = l, f = Y(() => ({
      "--vuecal-grid-columns": t.cols,
      "--vuecal-grid-rows": t.rows,
      "--vuecal-body-max-height": s.time ? `${s.timeCellHeight * (s.timeTo - s.timeFrom) / s.timeStep}px` : null
    })), E = Y(() => {
      const M = s.horizontal, h = M ? c.value : w.value, q = a.formatTime(lt(h, s), s.twelveHour ? "h:mm{am}" : "HH:mm");
      return {
        style: { [M ? "left" : "top"]: `${h}%` },
        time: q
      };
    }), k = (M) => {
      var Z;
      if (t.isMonth || t.isYear || t.isYears) return;
      const h = r.isResizingEvent && s.editableEvents.resizeX;
      if (!s.timeAtCursor && !h) return;
      const q = ((Z = M.touches) == null ? void 0 : Z[0]) || M, { clientX: o, clientY: O } = q;
      if (h && (v.cellEl = p(o, O)), s.timeAtCursor) {
        const { top: V, left: _ } = i.value.getBoundingClientRect();
        s.horizontal ? c.value = (o - _) * 100 / i.value.clientWidth : w.value = Yn(O - V, i.value);
      }
    }, g = () => {
      c.value = null, w.value = null;
    }, p = (M, h) => {
      const q = document.elementFromPoint(M, h);
      return (q == null ? void 0 : q.closest(".vuecal__cell")) || null;
    };
    return Vn(() => {
      i.value.addEventListener("mousemove", k), i.value.addEventListener("touchmove", k), i.value.addEventListener("mouseleave", g), i.value.addEventListener("touchend", g);
    }), $t(() => {
      i.value && (i.value.removeEventListener("mousemove", k), i.value.removeEventListener("touchmove", k), i.value.removeEventListener("mouseleave", g), i.value.removeEventListener("touchend", g));
    }), (M, h) => (A(), P("div", {
      class: "vuecal__body",
      ref_key: "bodyEl",
      ref: i,
      style: qe(f.value)
    }, [
      mt(on, { name: "vuecal-shrink" }, {
        default: J(() => [
          z(s).timeAtCursor && (c.value !== null || w.value !== null) ? (A(), P("div", {
            key: 0,
            class: "vuecal__time-at-cursor",
            style: qe(E.value.style)
          }, [
            Ye("label", null, Oe(E.value.time), 1)
          ], 4)) : re("", !0)
        ]),
        _: 1
      }),
      (A(!0), P($e, null, Ae(z(t).cellDates, (q, o) => (A(), nt(xa, {
        key: o,
        start: q.start,
        end: q.end,
        index: o
      }, ot({ _: 2 }, [
        M.$slots.cell ? {
          name: "cell",
          fn: J((O) => [
            R(M.$slots, "cell", pe({ ref_for: !0 }, O))
          ]),
          key: "0"
        } : void 0,
        M.$slots["cell-date"] ? {
          name: "cell-date",
          fn: J((O) => [
            R(M.$slots, "cell-date", pe({ ref_for: !0 }, O))
          ]),
          key: "1"
        } : void 0,
        M.$slots["cell-content"] ? {
          name: "cell-content",
          fn: J((O) => [
            R(M.$slots, "cell-content", pe({ ref_for: !0 }, O))
          ]),
          key: "2"
        } : void 0,
        M.$slots["cell-events"] ? {
          name: "cell-events",
          fn: J((O) => [
            R(M.$slots, "cell-events", pe({ ref_for: !0 }, O))
          ]),
          key: "3"
        } : void 0,
        M.$slots[`event.${z(t).id}`] ? {
          name: `event.${z(t).id}`,
          fn: J((O) => [
            R(M.$slots, `event.${z(t).id}`, pe({ ref_for: !0 }, O))
          ]),
          key: "4"
        } : void 0,
        M.$slots["event.all-day"] ? {
          name: "event.all-day",
          fn: J((O) => [
            R(M.$slots, "event.all-day", pe({ ref_for: !0 }, O))
          ]),
          key: "5"
        } : void 0,
        M.$slots.event ? {
          name: "event",
          fn: J((O) => [
            R(M.$slots, "event", pe({ ref_for: !0 }, O))
          ]),
          key: "6"
        } : void 0,
        M.$slots["event-count"] ? {
          name: "event-count",
          fn: J((O) => [
            R(M.$slots, "event-count", pe({ ref_for: !0 }, O))
          ]),
          key: "7"
        } : void 0,
        M.$slots["now-line"] ? {
          name: "now-line",
          fn: J((O) => [
            R(M.$slots, "now-line", pe({ ref_for: !0 }, O))
          ]),
          key: "8"
        } : void 0
      ]), 1032, ["start", "end", "index"]))), 128))
    ], 4));
  }
}, cl = ["data-locale"], dl = { class: "vuecal__scrollable-wrap" }, fl = {
  key: 1,
  class: "vuecal__week-numbers"
}, hl = { class: "vuecal__week-number" }, ml = { class: "vuecal__body-wrap" }, yl = {
  __name: "index",
  props: To,
  emits: [
    "ready",
    "view-change",
    "update:view",
    "update:selectedDate",
    "update:viewDate",
    "update:events",
    "event-delete",
    "event-created",
    "event-dropped",
    "event-drag-start",
    "event-drag-end"
  ],
  setup(n, { expose: e, emit: t }) {
    const s = n, a = t, r = Ua("vuecal-el"), l = po({ props: s, emit: a, attrs: Xa(), vuecalEl: r, uid: Ja() }), { config: i, view: c, dateUtils: w, touch: v } = l, f = Y(() => i.time && (c.isDay || c.isDays || c.isWeek)), E = Y(() => Array(c.rows).fill().map((h, q) => w.getWeek(w.addDays(c.firstCellDate, 7 * q)))), k = Y(() => {
      var h;
      return {
        "vuecal--ready": i.ready,
        [`vuecal--${i.theme}-theme`]: i.theme,
        [`vuecal--${i.size}`]: !0,
        "vuecal--date-picker": i.datePicker,
        "vuecal--dark": i.dark,
        "vuecal--light": !i.dark,
        [`vuecal--${c.id}-view`]: !0,
        "vuecal--view-has-time": f.value,
        "vuecal--timeless": !i.time,
        "vuecal--dragging-cell": v.isDraggingCell,
        "vuecal--dragging-event": v.isDraggingEvent,
        "vuecal--resizing-event": v.isResizingEvent,
        "vuecal--has-schedules": (h = i.schedules) == null ? void 0 : h.length,
        "vuecal--horizontal": i.horizontal
      };
    }), g = Y(() => {
      var h;
      return {
        "--vuecal-time-cell-size": i.timeCellHeight && `${i.timeCellHeight}px`,
        "--vuecal-schedules-count": ((h = i.schedules) == null ? void 0 : h.length) ?? 0
      };
    }), p = Y(() => {
      var h, q;
      return {
        "vuecal__scrollable--row": f.value || i.weekNumbers && c.isMonth,
        // Keep the states inside the Vue transition wrapper for smooth CSS transitions.
        [`vuecal__scrollable--${c.id}-view`]: !0,
        "vuecal__scrollable--has-schedules": (h = i.schedules) == null ? void 0 : h.length,
        "vuecal__scrollable--no-schedules": !((q = i.schedules) != null && q.length),
        "vuecal__scrollable--no-all-day-bar": !i.allDayEvents,
        "vuecal__scrollable--has-all-day-bar": i.allDayEvents
      };
    }), M = (h) => {
      h.target.closest(".vuecal__cell") && h.preventDefault();
    };
    return Vn(async () => {
      typeof window < "u" && window.hasOwnProperty("ontouchstart") && r.value.addEventListener("contextmenu", M), await Qt(), i.ready = !0, a("ready", { config: i, view: c });
    }), $t(() => {
      var h;
      (h = r == null ? void 0 : r.value) == null || h.removeEventListener("contextmenu", M);
    }), Un("vuecal", l), Un("$vuecalEl", r), e({ view: l.view }), (h, q) => (A(), P("div", {
      class: Fe(["vuecal", k.value]),
      ref: "vuecal-el",
      "data-locale": h.locale,
      style: qe(g.value)
    }, [
      h.$slots.diy ? R(h.$slots, "diy", {
        key: 0,
        vuecal: z(l)
      }) : (A(), P($e, { key: 1 }, [
        mt(Co, null, ot({ _: 2 }, [
          h.$slots.header ? {
            name: "header",
            fn: J((o) => [
              R(h.$slots, "header", me(ge(o)))
            ]),
            key: "0"
          } : void 0,
          !h.$slots.header && h.$slots["previous-button"] ? {
            name: "previous-button",
            fn: J((o) => [
              R(h.$slots, "previous-button", me(ge(o)))
            ]),
            key: "1"
          } : void 0,
          !h.$slots.header && h.$slots["next-button"] ? {
            name: "next-button",
            fn: J((o) => [
              R(h.$slots, "next-button", me(ge(o)))
            ]),
            key: "2"
          } : void 0,
          !h.$slots.header && h.$slots["today-button"] ? {
            name: "today-button",
            fn: J((o) => [
              R(h.$slots, "today-button", me(ge(o)))
            ]),
            key: "3"
          } : void 0,
          !h.$slots.header && h.$slots.title ? {
            name: "title",
            fn: J((o) => [
              R(h.$slots, "title", me(ge(o)))
            ]),
            key: "4"
          } : void 0,
          !h.$slots.header && h.$slots["title.day"] ? {
            name: "title.day",
            fn: J((o) => [
              R(h.$slots, "title.day", me(ge(o)))
            ]),
            key: "5"
          } : void 0,
          !h.$slots.header && h.$slots["title.days"] ? {
            name: "title.days",
            fn: J((o) => [
              R(h.$slots, "title.days", me(ge(o)))
            ]),
            key: "6"
          } : void 0,
          !h.$slots.header && h.$slots["title.week"] ? {
            name: "title.week",
            fn: J((o) => [
              R(h.$slots, "title.week", me(ge(o)))
            ]),
            key: "7"
          } : void 0,
          !h.$slots.header && h.$slots["title.month"] ? {
            name: "title.month",
            fn: J((o) => [
              R(h.$slots, "title.month", me(ge(o)))
            ]),
            key: "8"
          } : void 0,
          !h.$slots.header && h.$slots["title.year"] ? {
            name: "title.year",
            fn: J((o) => [
              R(h.$slots, "title.year", me(ge(o)))
            ]),
            key: "9"
          } : void 0,
          !h.$slots.header && h.$slots["title.years"] ? {
            name: "title.years",
            fn: J((o) => [
              R(h.$slots, "title.years", me(ge(o)))
            ]),
            key: "10"
          } : void 0,
          !h.$slots.header && h.$slots["schedule-heading"] ? {
            name: "schedule-heading",
            fn: J((o) => [
              R(h.$slots, "schedule-heading", me(ge(o)))
            ]),
            key: "11"
          } : void 0
        ]), 1024),
        Ye("div", dl, [
          mt(on, {
            name: `vuecal-slide-fade--${z(c).transitionDirection}`
          }, {
            default: J(() => [
              (A(), P("div", {
                class: Fe(["vuecal__scrollable", p.value]),
                key: z(c).id + z(c).start.getTime()
              }, [
                f.value ? (A(), nt(ll, { key: 0 }, ot({ _: 2 }, [
                  h.$slots["time-cell"] ? {
                    name: "time-cell",
                    fn: J((o) => [
                      R(h.$slots, "time-cell", me(ge(o)))
                    ]),
                    key: "0"
                  } : void 0
                ]), 1024)) : re("", !0),
                z(i).weekNumbers && z(c).isMonth ? (A(), P("div", fl, [
                  (A(!0), P($e, null, Ae(E.value, (o) => (A(), P("div", hl, [
                    R(h.$slots, "week-number", {}, () => [
                      Ye("small", null, Oe(o), 1)
                    ])
                  ]))), 256))
                ])) : re("", !0),
                Ye("div", ml, [
                  mt(rl, null, ot({ _: 2 }, [
                    h.$slots["weekday-heading"] ? {
                      name: "weekday-heading",
                      fn: J((o) => [
                        R(h.$slots, "weekday-heading", me(ge(o)))
                      ]),
                      key: "0"
                    } : void 0,
                    h.$slots["schedule-heading"] ? {
                      name: "schedule-heading",
                      fn: J((o) => [
                        R(h.$slots, "schedule-heading", me(ge(o)))
                      ]),
                      key: "1"
                    } : void 0,
                    h.$slots["event.all-day"] ? {
                      name: "event.all-day",
                      fn: J((o) => [
                        R(h.$slots, "event.all-day", me(ge(o)))
                      ]),
                      key: "2"
                    } : void 0,
                    h.$slots.event ? {
                      name: "event",
                      fn: J((o) => [
                        R(h.$slots, "event", me(ge(o)))
                      ]),
                      key: "3"
                    } : void 0
                  ]), 1024),
                  mt(ul, null, ot({ _: 2 }, [
                    h.$slots.cell ? {
                      name: "cell",
                      fn: J((o) => [
                        R(h.$slots, "cell", me(ge(o)))
                      ]),
                      key: "0"
                    } : void 0,
                    !h.$slots.cell && h.$slots["cell-date"] ? {
                      name: "cell-date",
                      fn: J((o) => [
                        R(h.$slots, "cell-date", me(ge(o)))
                      ]),
                      key: "1"
                    } : void 0,
                    !h.$slots.cell && h.$slots["cell-content"] ? {
                      name: "cell-content",
                      fn: J((o) => [
                        R(h.$slots, "cell-content", me(ge(o)))
                      ]),
                      key: "2"
                    } : void 0,
                    !h.$slots.cell && h.$slots["cell-events"] ? {
                      name: "cell-events",
                      fn: J((o) => [
                        R(h.$slots, "cell-events", me(ge(o)))
                      ]),
                      key: "3"
                    } : void 0,
                    !h.$slots.cell && !h.$slots["cell-events"] && h.$slots["event.all-day"] ? {
                      name: "event.all-day",
                      fn: J((o) => [
                        R(h.$slots, "event.all-day", me(ge(o)))
                      ]),
                      key: "4"
                    } : void 0,
                    !h.$slots.cell && !h.$slots["cell-events"] && h.$slots[`event.${z(c).id}`] ? {
                      name: `event.${z(c).id}`,
                      fn: J((o) => [
                        R(h.$slots, `event.${z(c).id}`, me(ge(o)))
                      ]),
                      key: "5"
                    } : void 0,
                    !h.$slots.cell && !h.$slots["cell-events"] && h.$slots.event ? {
                      name: "event",
                      fn: J((o) => [
                        R(h.$slots, "event", me(ge(o)))
                      ]),
                      key: "6"
                    } : void 0,
                    !h.$slots.cell && h.$slots["event-count"] ? {
                      name: "event-count",
                      fn: J((o) => [
                        R(h.$slots, "event-count", me(ge(o)))
                      ]),
                      key: "7"
                    } : void 0,
                    h.$slots["now-line"] ? {
                      name: "now-line",
                      fn: J((o) => [
                        R(h.$slots, "now-line", me(ge(o)))
                      ]),
                      key: "8"
                    } : void 0
                  ]), 1024)
                ])
              ], 2))
            ]),
            _: 3
          }, 8, ["name"])
        ])
      ], 64))
    ], 14, cl));
  }
}, gl = (n) => {
  bt.texts = { ...Ve.texts, ...n }, bt.dateUtils.updateTexts(bt.texts);
}, {
  addDatePrototypes: wl,
  removeDatePrototypes: Dl,
  updateTexts: pl,
  addDays: kl,
  subtractDays: Tl,
  addHours: Ml,
  subtractHours: Sl,
  addMinutes: bl,
  subtractMinutes: Ol,
  getWeek: $l,
  isToday: El,
  isSameDate: Cl,
  isInRange: _l,
  isLeapYear: Nl,
  getPreviousFirstDayOfWeek: Il,
  stringToDate: zl,
  dateToMinutes: Vl,
  countDays: Yl,
  datesInSameTimeStep: Fl,
  isValid: Wl,
  formatDate: Ll,
  formatDateLite: Al,
  formatTime: Hl,
  formatTimeLite: Rl,
  formatMinutes: Pl
} = bt.dateUtils;
export {
  yl as VueCal,
  wl as addDatePrototypes,
  kl as addDays,
  Ml as addHours,
  bl as addMinutes,
  Yl as countDays,
  Vl as dateToMinutes,
  Fl as datesInSameTimeStep,
  Ll as formatDate,
  Al as formatDateLite,
  Pl as formatMinutes,
  Hl as formatTime,
  Rl as formatTimeLite,
  Il as getPreviousFirstDayOfWeek,
  $l as getWeek,
  _l as isInRange,
  Nl as isLeapYear,
  Cl as isSameDate,
  El as isToday,
  Wl as isValidDate,
  Dl as removeDatePrototypes,
  zl as stringToDate,
  Tl as subtractDays,
  Sl as subtractHours,
  Ol as subtractMinutes,
  pl as updateTexts,
  gl as useLocale
};
