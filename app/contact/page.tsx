import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";
import Reveal from "@/components/Reveal";
import { Eyebrow, Callout } from "@/components/UI";
import ContactForm from "@/components/ContactForm";
import { company } from "@/lib/company";

export const metadata: Metadata = {
  title: "Trade Desk — Contact",
  description:
    "Send your sugar supply requirement to the Meridian Cane trade desk: grade, quantity, destination port, Incoterm and timeline.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="pagehero">
        <div className="pagehero__media">
          <img src="/images/trade-desk.svg" alt="Line drawing of a bulk carrier alongside port cranes at night" />
        </div>
        <div className="pagehero__scrim" />
        <div className="container pagehero__inner">
          <Eyebrow>Trade desk</Eyebrow>
          <h1>Talk to our trade desk</h1>
          <p className="pagehero__lead">
            Commercial enquiries only. Give us the grade, quantity, destination port, Incoterm and timeline
            and we will come back with a considered answer — including when that answer is no.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container contactgrid">
          <div>
            <Reveal>
              <Eyebrow>Supply enquiry</Eyebrow>
              <h2 style={{ marginBottom: "var(--s-6)" }}>Tell us what you need to buy.</h2>
              <Suspense fallback={<p className="muted">Loading the enquiry form…</p>}>
                <ContactForm />
              </Suspense>
            </Reveal>
          </div>

          <aside>
            <Reveal delay={70}>
              <div className="infoblock">
                <p className="infoblock__k">Trade desk</p>
                <p className="infoblock__v">
                  <a href={`mailto:${company.contact.tradeDeskEmail}`}>{company.contact.tradeDeskEmail}</a>
                  <br />
                  {company.contact.phoneDisplay}
                  <br />
                  WhatsApp {company.contact.whatsappDisplay}
                  <br />
                  <span className="muted">{company.contact.hours}</span>
                </p>
              </div>

              <div className="infoblock">
                <p className="infoblock__k">Compliance</p>
                <p className="infoblock__v">
                  <a href={`mailto:${company.contact.complianceEmail}`}>{company.contact.complianceEmail}</a>
                  <br />
                  <span className="muted">
                    For counterparty verification, document checks and reporting suspicious approaches.
                  </span>
                </p>
              </div>

              {company.offices.map((o) => (
                <div className="infoblock" key={o.label}>
                  <p className="infoblock__k">{o.label}</p>
                  <p className="infoblock__v">
                    {o.lines.map((l) => <span key={l}>{l}<br /></span>)}
                    <span className="muted">{o.note}</span>
                  </p>
                </div>
              ))}

              <div style={{ marginTop: "var(--s-7)" }}>
                <Callout title="Before you send anything sensitive" variant="warn">
                  <p style={{ fontSize: "var(--fs-sm)" }}>
                    Check that the email domain above matches exactly. We never request payment before a
                    contract is executed, and never send banking details by email alone.{" "}
                    <Link href="/trade-compliance-fraud-prevention" style={{ borderBottom: "1px solid var(--c-gold)" }}>
                      Read the fraud prevention guidance
                    </Link>
                    .
                  </p>
                </Callout>
              </div>

              <div className="infoblock">
                <p className="infoblock__k">What happens next</p>
                <ul className="checklist" style={{ marginTop: "var(--s-4)" }}>
                  <li>We acknowledge the enquiry within one working day.</li>
                  <li>We confirm the specification and whether we can serve the window.</li>
                  <li>Counterparty verification runs in both directions.</li>
                  <li>Contract, documentary set and payment route are agreed in writing.</li>
                </ul>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
