"use client";
import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { products } from "@/lib/products";

type Status = "idle" | "sending" | "sent" | "error";
type Errors = Record<string, string>;

const INCOTERMS = ["FOB", "CFR", "CIF", "DAP", "Not yet decided"];

export default function ContactForm() {
  const params = useSearchParams();
  const preselected = params.get("product") ?? "";
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState("");

  function validate(data: FormData): Errors {
    const e: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const companyName = String(data.get("company") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const product = String(data.get("product") ?? "").trim();
    const requirement = String(data.get("requirement") ?? "").trim();

    if (name.length < 2) e.name = "Enter your full name.";
    if (companyName.length < 2) e.company = "Enter the company you are contracting for.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) e.email = "Enter a valid business email address.";
    else if (/@(gmail|yahoo|hotmail|outlook|live|aol)\./i.test(email))
      e.email = "Please use your company email address so we can verify the counterparty.";
    if (!product) e.product = "Select the grade you are enquiring about.";
    if (requirement.length < 20) e.requirement = "Give us a little more detail — at least a sentence.";
    return e;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return; // prevents duplicate submissions

    const form = event.currentTarget;
    const data = new FormData(form);

    // honeypot — bots fill hidden fields, people do not
    if (String(data.get("company_website") ?? "")) return;

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = form.querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`);
      first?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "The enquiry could not be sent.");
      setMessage(body.reference ? `Reference ${body.reference}` : "");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "The enquiry could not be sent.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="form__status" role="status">
        <strong>Enquiry received</strong>
        <p>
          The trade desk will respond within one working day. {message} If your requirement is
          time-critical, call the number listed alongside this form and quote your company name.
        </p>
        <button className="btn btn--outline btn--sm" style={{ marginTop: "var(--s-5)" }} onClick={() => setStatus("idle")}>
          Send another enquiry
        </button>
      </div>
    );
  }

  const err = (k: string) =>
    errors[k] ? <p className="field__error" id={`${k}-error`}>{errors[k]}</p> : null;
  const aria = (k: string) =>
    errors[k] ? ({ "aria-invalid": true, "aria-describedby": `${k}-error` } as const) : {};

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <p className="visually-hidden" aria-hidden="true">
        <label htmlFor="company_website">Leave this field empty</label>
        <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </p>

      <div className="form__row form__row--2">
        <div className="field">
          <label className="field__label" htmlFor="name">Full name <span className="field__req">*</span></label>
          <input id="name" name="name" autoComplete="name" {...aria("name")} />
          {err("name")}
        </div>
        <div className="field">
          <label className="field__label" htmlFor="company">Company <span className="field__req">*</span></label>
          <input id="company" name="company" autoComplete="organization" {...aria("company")} />
          {err("company")}
        </div>
      </div>

      <div className="form__row form__row--2">
        <div className="field">
          <label className="field__label" htmlFor="email">Business email <span className="field__req">*</span></label>
          <input id="email" name="email" type="email" inputMode="email" autoComplete="email" {...aria("email")} />
          {err("email")}
        </div>
        <div className="field">
          <label className="field__label" htmlFor="phone">Phone or WhatsApp</label>
          <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" />
        </div>
      </div>

      <div className="form__row form__row--2">
        <div className="field">
          <label className="field__label" htmlFor="country">Country</label>
          <input id="country" name="country" autoComplete="country-name" />
        </div>
        <div className="field">
          <label className="field__label" htmlFor="product">Product of interest <span className="field__req">*</span></label>
          <select id="product" name="product" defaultValue={preselected} {...aria("product")}>
            <option value="">Select a grade</option>
            {products.map((p) => (
              <option key={p.slug} value={p.slug}>{p.shortName}</option>
            ))}
            <option value="general">General enquiry</option>
          </select>
          {err("product")}
        </div>
      </div>

      <div className="form__row form__row--2">
        <div className="field">
          <label className="field__label" htmlFor="quantity">Required quantity</label>
          <input id="quantity" name="quantity" placeholder="e.g. 5,000 MT per month" />
        </div>
        <div className="field">
          <label className="field__label" htmlFor="destination">Delivery destination or port</label>
          <input id="destination" name="destination" placeholder="e.g. Jebel Ali, UAE" />
        </div>
      </div>

      <div className="form__row form__row--2">
        <div className="field">
          <label className="field__label" htmlFor="incoterm">Incoterm</label>
          <select id="incoterm" name="incoterm" defaultValue="">
            <option value="">Select if known</option>
            {INCOTERMS.map((i) => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>
        <div className="field">
          <label className="field__label" htmlFor="timeline">Expected timeline</label>
          <input id="timeline" name="timeline" placeholder="e.g. first shipment within 60 days" />
        </div>
      </div>

      <div className="field">
        <label className="field__label" htmlFor="requirement">Commercial requirement <span className="field__req">*</span></label>
        <textarea
          id="requirement"
          name="requirement"
          placeholder="Tell us what the sugar is for, any specification parameters that matter to your process, and how you intend to structure payment."
          {...aria("requirement")}
        />
        {err("requirement")}
      </div>

      {status === "error" && (
        <p className="form__status" role="alert">
          <strong>The enquiry was not sent</strong>
          {message} Email the trade desk directly and we will pick it up from there.
        </p>
      )}

      <div className="btn-row">
        <button type="submit" className="btn btn--gold" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send enquiry to the trade desk"}
        </button>
      </div>
      <p className="muted" style={{ fontSize: "var(--fs-xs)" }}>
        We use these details only to respond to your enquiry and to carry out counterparty verification.
        Fields marked <span className="field__req">*</span> are required.
      </p>
    </form>
  );
}
