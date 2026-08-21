import Link from "next/link";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { Eyebrow, Frame, SectionHeader, TradeCTA, Callout } from "@/components/UI";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Brazilian Sugar Supply Program",
  description:
    "A structured sourcing and execution programme for qualified international buyers of Brazilian cane sugar — from commercial qualification through documentation to delivery.",
  alternates: { canonical: "/brazilian-sugar-supply-program" },
};

const FRAMEWORK = [
  { t: "Buyer requirement", d: "Grade, quantity, destination port, Incoterm and delivery window. If the requirement is not yet defined, this is where we help define it." },
  { t: "Commercial qualification", d: "Both directions. You verify us; we verify you. Company identity, trading history, banking route and the authority of the people signing." },
  { t: "Specification alignment", d: "The analytical specification is agreed in writing and attached to the contract, including any parameter specific to your process." },
  { t: "Sourcing coordination", d: "Mills matched to the specification and the delivery window, with availability confirmed at origin before the contract is issued." },
  { t: "Trade documentation", d: "Contract, payment instrument and the full documentary set defined and sequenced, so no party is waiting on an undefined document." },
  { t: "Commercial execution", d: "Production or allocation, pre-shipment analysis, load port survey and issuance of shipping documents against the agreed set." },
  { t: "Logistics and delivery", d: "Freight nomination, loading, transit tracking and discharge coordination through to close-out of the transaction." },
];

const INTEGRITY = [
  { k: "Chain of title", d: "Every shipment traces to a producing mill and a named seller. We do not present product we do not control." },
  { k: "Sequenced documents", d: "Documents are issued in a fixed order. A request to jump the sequence is treated as a warning sign, not a courtesy." },
  { k: "Independent verification", d: "Analysis and survey by parties acceptable to both sides, with costs allocated in the contract." },
  { k: "No unverified counterparties", d: "A transaction that cannot pass counterparty verification does not proceed, regardless of the margin on it." },
];

const RISKS = [
  { k: "Price risk", d: "Raw sugar prices move against an international benchmark. The contract states the price basis, any differential and the point at which price is fixed." },
  { k: "Freight risk", d: "Freight is a material share of landed cost on bulk parcels. Whether it sits with buyer or seller follows the Incoterm, stated explicitly." },
  { k: "Quality risk", d: "Colour, polarisation and moisture are the parameters most likely to fall out of tolerance. Tolerance and the settlement mechanism are contracted in advance." },
  { k: "Counterparty risk", d: "Verification, payment instrument and documentary control are the principal defences. All three are applied before performance begins." },
  { k: "Documentary risk", d: "Most letter-of-credit failures are documentary, not commercial. The set is reviewed against the credit before shipment, not after." },
];

const TECH = [
  { k: "Shipment tracking", d: "Milestones logged against the contract and shared with the buyer as they are confirmed." },
  { k: "Document control", d: "A single controlled set per shipment, so both parties work from the same version of every document." },
  { k: "Specification records", d: "Analysis results retained against each contract and shipment reference for traceability." },
];

export default function ProgramPage() {
  return (
    <>
      <section className="pagehero">
        <div className="pagehero__media">
          <img src="/images/program-brazil.svg" alt="Line drawing of a sugarcane field at dusk" />
        </div>
        <div className="pagehero__scrim" />
        <div className="container pagehero__inner">
          <Eyebrow>Supply programme</Eyebrow>
          <h1>Brazilian Sugar Supply Program</h1>
          <p className="pagehero__lead">
            A structured route from a defined buyer requirement to a delivered cargo — designed for
            qualified international buyers who intend to trade repeatedly rather than once.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid--sidebar">
            <Reveal><Eyebrow>Programme overview</Eyebrow></Reveal>
            <Reveal delay={70}>
              <div className="stack-lg">
                <p className="lead">
                  Brazil is the largest origin in the international sugar trade, and also the origin most
                  frequently misrepresented in fraudulent offers. Those two facts are related: volume and
                  distance make it easy to sell something that does not exist.
                </p>
                <p className="muted">
                  This programme exists to remove the ambiguity that makes that possible. It defines the
                  order in which a transaction is built — qualification before specification, specification
                  before contract, contract before documents, documents before performance — and applies
                  the same order to every buyer regardless of size.
                </p>
                <p className="muted">
                  It is deliberately slower at the front end. The time spent on qualification and
                  specification is recovered several times over at the load port, and the transactions that
                  fail are almost always the ones where that time was skipped.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--ivory">
        <div className="container">
          <Reveal>
            <SectionHeader
              eyebrow="Sourcing framework"
              title="Seven stages, in this order, every time."
              lead="Each stage has to close before the next one opens. That is the whole point of the framework."
            />
          </Reveal>
          <div className="ledger">
            {FRAMEWORK.map((s, i) => (
              <Reveal key={s.t} className="ledger__row" delay={i * 30}>
                <span className="ledger__n">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="ledger__t">{s.t}</h3>
                <p className="ledger__d">{s.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="split">
            <Reveal className="split__content">
              <Eyebrow>Supply chain integrity</Eyebrow>
              <h2>Confidence comes from sequence, not from assurances.</h2>
              <p className="muted" style={{ marginTop: "var(--s-5)" }}>
                Any seller can state that they are reliable. What a buyer can actually test is whether the
                transaction is structured so that neither party has to rely on the other&rsquo;s word at the
                point where money moves.
              </p>
              <div className="deflist" style={{ marginTop: "var(--s-6)" }}>
                {INTEGRITY.map((x, i) => (
                  <div className="deflist__item" key={x.k}>
                    <span className="deflist__idx">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="deflist__term">{x.k}</h3>
                    <p className="deflist__desc">{x.d}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal className="split__media" delay={80}>
              <Frame
                src="/images/cane-field.svg"
                alt="Line drawing of sugarcane stalks against an open horizon"
                ratio="tall"
                caption="Brazilian cane origin"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--ivory section--tight">
        <div className="container">
          <Reveal>
            <SectionHeader eyebrow="Programme portfolio" title="Grades available under the programme." />
            <div className="crosslinks">
              {products.map((p) => (
                <Link href={`/products/${p.slug}`} key={p.slug} className="crosslink">
                  <span className="crosslink__k">{p.code}</span>
                  <span className="crosslink__t">{p.shortName}</span>
                  <p className="muted" style={{ fontSize: "var(--fs-xs)", marginTop: "var(--s-3)" }}>{p.grade}</p>
                </Link>
              ))}
            </div>
            <p className="muted" style={{ fontSize: "var(--fs-sm)", marginTop: "var(--s-5)" }}>
              Refined beet sugar is sourced from European processors and sits alongside the Brazilian cane
              programme for buyers who require origin diversification.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section--ink">
        <div className="container">
          <div className="grid grid--sidebar">
            <Reveal>
              <Eyebrow>Risk management</Eyebrow>
              <h2>Five exposures, allocated before signature.</h2>
            </Reveal>
            <Reveal delay={70}>
              <p className="lead" style={{ color: "rgba(255,255,255,0.8)" }}>
                Risk in a sugar transaction is not eliminated. It is identified, priced and assigned to
                whichever party is better placed to carry it — in writing, before anyone performs.
              </p>
              <div className="deflist" style={{ marginTop: "var(--s-7)", borderTopColor: "rgba(255,255,255,0.16)" }}>
                {RISKS.map((r, i) => (
                  <div className="deflist__item" key={r.k} style={{ borderBottomColor: "rgba(255,255,255,0.16)" }}>
                    <span className="deflist__idx">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="deflist__term" style={{ color: "#fff" }}>{r.k}</h3>
                    <p className="deflist__desc" style={{ color: "rgba(255,255,255,0.62)" }}>{r.d}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid--2">
            <Reveal>
              <Eyebrow>Technology and process</Eyebrow>
              <h2>Systems that keep both sides on the same page.</h2>
              <p className="muted" style={{ marginTop: "var(--s-5)" }}>
                Our use of technology is unglamorous and deliberately so: the failures that hurt a sugar
                transaction are version-control failures, missed milestones and documents that do not match
                the credit.
              </p>
              <div className="deflist" style={{ marginTop: "var(--s-6)" }}>
                {TECH.map((t, i) => (
                  <div className="deflist__item" key={t.k}>
                    <span className="deflist__idx">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="deflist__term">{t.k}</h3>
                    <p className="deflist__desc">{t.d}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={80}>
              <Eyebrow>Sustainability</Eyebrow>
              <h2>Stated plainly, without a badge we have not earned.</h2>
              <div className="stack-lg" style={{ marginTop: "var(--s-5)" }}>
                <p className="muted">
                  Cane sugar production carries real environmental and social questions — land and water
                  use, harvest practice, labour conditions and the energy balance of processing. Buyers are
                  increasingly required to answer for these in their own supply chains.
                </p>
                <p className="muted">
                  We work with mills that operate to the regulatory and labour standards of their
                  jurisdiction. Where your procurement policy requires a specific scheme, audit or
                  chain-of-custody certification, tell us at the qualification stage and we will confirm in
                  writing whether the mills available for your shipment hold it.
                </p>
              </div>
              <div style={{ marginTop: "var(--s-6)" }}>
                <Callout title="What we will not do" variant="warn">
                  <p style={{ fontSize: "var(--fs-sm)" }}>
                    We do not claim certifications, ESG ratings or carbon positions that we do not hold, and
                    we will not attach a scheme name to a cargo without the certificate that supports it. If
                    a supplier offers you sustainability credentials without documentation, treat it as a
                    commercial warning rather than a selling point.
                  </p>
                </Callout>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <TradeCTA
        title="Discuss your sugar supply requirement"
        body="Qualified buyers can start the programme with a single message: grade, quantity, destination port, Incoterm and timeline. We will tell you within one working day whether we can serve it."
        cta="Start with the trade desk"
      />
    </>
  );
}
