import * as e from "react";
import { useForm as _ } from "../../contexts/form/form.es.mjs";
import { useEventListener as H } from "../../hooks/use-event-listener.es.mjs";
import { PayButton as R, SvgIcon as G } from "./ach.styles.es.mjs";
import { transformPlaidEventName as O } from "./ach.utils.es.mjs";
function U({
  accountHolderName: b,
  redirectURI: C,
  transactionId: k,
  callbacks: l,
  buttonProps: z,
  children: p,
  svgProps: x,
  recurringChargeArgs: c,
  storeOnly: u
}) {
  const [r, A] = e.useState(() => {
  }), [S, h] = e.useState(!1), { cardTokenizeResponseReceived: E, createPaymentRequest: o, payments: w } = _(), d = e.useRef(null), g = async (n) => {
    if (n.stopPropagation(), !r) {
      console.warn("ACH button was clicked, but no ACH instance was found.");
      return;
    }
    if (!o)
      throw new Error("`createPaymentRequest()` is required when using ACH payments");
    h(!0);
    try {
      const t = await r.tokenize({
        accountHolderName: b,
        intent: u ? "STORE" : c ? "RECURRING_CHARGE" : "CHARGE",
        amount: u ? void 0 : o.total.amount,
        currency: u ? void 0 : o.currencyCode,
        total: c ? {
          amount: o.total.amount,
          currencyCode: o.currencyCode
        } : void 0,
        ...c
      });
      if (t?.status === "OK")
        return await E(t);
      let i = `Tokenization failed with status: ${t?.status ?? ""}`;
      if (t?.errors)
        throw i += ` and errors: ${JSON.stringify(t?.errors)}`, new Error(i);
      console.warn(i);
    } catch (t) {
      console.error(t);
    } finally {
      h(!1);
    }
  };
  if (e.useEffect(() => {
    const n = new AbortController(), { signal: t } = n;
    return (async (f) => {
      const m = await w?.ach({
        redirectURI: C,
        transactionId: k
      }).then((s) => {
        if (!f?.aborted)
          return A(s), s;
      });
      f.aborted ? (m?.removeEventListener("ontokenization", () => {
      }), await m?.destroy()) : m?.addEventListener(
        "ontokenization",
        async (s) => {
          const { tokenResult: v, error: P } = s.detail;
          P || v?.status == "OK" && await E(v);
        }
      );
    })(t), () => {
      n.abort();
    };
  }, [o, w]), l)
    for (const n of Object.keys(l))
      r?.addEventListener(
        O(n),
        l[n]
      );
  H({
    listener: g,
    type: "click",
    element: d,
    options: {
      passive: !0
    }
  });
  const { isLoading: L, ...y } = z ?? {}, a = L || !r || S;
  return p ? /* @__PURE__ */ e.createElement(R, { ...y, "aria-disabled": a, disabled: a, ref: d, type: "button" }, p) : /* @__PURE__ */ e.createElement(R, { ...y, "aria-disabled": a, disabled: a, ref: d, type: "button" }, /* @__PURE__ */ e.createElement(
    G,
    {
      fill: "none",
      height: "1em",
      viewBox: "0 0 36 24",
      width: "1em",
      xmlns: "http://www.w3.org/2000/svg",
      ...x
    },
    /* @__PURE__ */ e.createElement("rect", { fill: "url(#prefix__paint0_linear)", height: 24, rx: 4, width: 36 }),
    /* @__PURE__ */ e.createElement(
      "path",
      {
        clipRule: "evenodd",
        d: "M18.509 6.16a.89.89 0 00-1.018 0l-6.124 4.285a.848.848 0 00-.325.96.873.873 0 00.833.595h1.75v4.286h-1.75a.866.866 0 00-.875.857c0 .473.392.857.875.857h12.25a.866.866 0 00.875-.857.866.866 0 00-.875-.857h-1.75V12h1.75c.38 0 .717-.24.833-.596a.848.848 0 00-.324-.959L18.509 6.16zm2.116 10.126V12h-5.25v4.286h5.25zM18 7.91l3.395 2.376h-6.79L18 7.91z",
        fill: "#fff",
        fillRule: "evenodd"
      }
    ),
    /* @__PURE__ */ e.createElement("defs", null, /* @__PURE__ */ e.createElement("linearGradient", { gradientUnits: "userSpaceOnUse", id: "prefix__paint0_linear", x1: 36, x2: 0, y1: 12, y2: 12 }, /* @__PURE__ */ e.createElement("stop", { stopColor: "#01D09E" }), /* @__PURE__ */ e.createElement("stop", { offset: 1, stopColor: "#03E4AE" })))
  ), /* @__PURE__ */ e.createElement("span", null, "Pay with Direct debit (ACH)"));
}
export {
  U as Ach,
  U as default
};
//# sourceMappingURL=ach.es.mjs.map
