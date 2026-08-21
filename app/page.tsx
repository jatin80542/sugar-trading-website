import Link from "next/link";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { Eyebrow, Frame, SectionHeader, TradeCTA, LinkArrow } from "@/components/UI";
import { products } from "@/lib/products";
import { company } from "@/lib/company";

export const metadata: Metadata = {
  title: "International Sugar Trading & Supply",
  description:
    "Meridian Cane sources refined and raw cane sugar directly from producing mills and executes documented delivery for industrial buyers worldwide. ICUMSA 45, ICUMSA 150, VHP, VVHP and beet sugar.",
  alternates: { canonical: "/" },
};

const DISTINCT = [
  {
    term: "Direct-to-mill sourcing",
    desc: "We contract with producing mills rather than buying through layered intermediaries. Fewer parties in the chain means a shorter path between your specification and the plant that has to meet it.",
  },
  {
    term: "Supply chain visibility",
    desc: "Loading, survey and documentation milestones are tracked against the contract and reported to you as they happen — not reconstructed after the fact when something has already slipped.",
  },
  {
    term: "Transaction discipline",
    desc: "Every transaction follows the same sequence: qualification, specification, contract, documentation, execution. We do not shorten it because a counterparty is in a hurry.",
  },
  {
    term: "Risk management",
    desc: "Price, freight, currency and counterparty exposure are identified and allocated in the contract before it is signed, so both sides know who carries what.",
  },
  {
    term: "Trade compliance",
    desc: "Counterparty verification, sanctions screening and documentary control are standing requirements. A transaction that cannot pass them does not proceed.",
  },
  {
    term: "Market understanding",
    desc: "Origin availability, crop timing, freight cycles and destination duty treatment all move the landed cost. We price the whole picture, not just the tonne.",
  },
];

const BUSINESS = [
  { stage: "Sourcing", title: "Origin and mill selection", body: "Grade requirement matched to mills capable of producing it consistently within your delivery window, at the origin that gives the best landed position." },
  { stage: "Verification", title: "Specification and analysis", body: "Product analysed against the contract specification before loading. Colour, polarisation and moisture are the parameters most likely to move; each is confirmed." },
  { stage: "Execution", title: "Contract and documentation", body: "Terms, Incoterm, payment instrument and documentary set agreed and issued in a fixed sequence, with both parties working from the same reference." },
  { stage: "Logistics", title: "Freight and load coordination", body: "Vessel or container nomination, stuffing, survey and load port supervision coordinated against the shipment schedule." },
  { stage: "Delivery", title: "Discharge and completion", body: "Documents presented, discharge coordinated and the transaction closed out. Any quantity or quality variance is settled under the contract mechanism." },
];

const COMMITMENTS = [
  { k: "Reliability", v: "We contract what we can deliver", note: "We would rather decline a volume than accept it and renegotiate later. A contract we cannot perform costs both parties more than the business was worth." },
  { k: "Transparency", v: "One version of the transaction", note: "Specification, price basis, Incoterm and documentary requirements are stated in writing and do not change verbally afterwards." },
  { k: "Responsibility", v: "Sourcing we can stand behind", note: "We work with mills that operate to the regulatory and labour standards of their jurisdiction, and we expect our counterparties to hold us to the same account." },
];

const PROGRAM_POINTS = [
  { k: "Structured sourcing", d: "A defined route from requirement to mill, rather than an open-ended search." },
  { k: "Mill relationships", d: "Direct commercial contact with producing mills at origin." },
  { k: "Specification control", d: "Grade and analysis agreed before contract, verified before loading." },
  { k: "Documented execution", d: "A fixed documentary sequence for every shipment under the programme." },
];

export default function HomePage() {
  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="hero">
        <div className="hero__media">
          <img src="/images/hero-supply.svg" alt="Macro detail of refined sugar crystals under directional light" />
        </div>
        <div className="hero__scrim" />
        <div className="container hero__inner">
          <div className="hero__content">
            <p className="eyebrow hero__eyebrow">International sugar trading</p>
            <h1>Sugar, sourced at origin and delivered under contract.</h1>
            <p className="hero__lead">
              {company.name} supplies refined and raw cane sugar to industrial buyers worldwide —
              contracted directly with producing mills, verified against specification, and executed
              through a documented trade process.
            </p>
            <div className="btn-row hero__actions">
              <Link href="/contact" className="btn btn--gold">Contact the trade desk</Link>
              <Link href="/products" className="btn btn--ghost-light">Explore our products</Link>
            </div>
            <dl className="hero__meta">
              <div>
                <dt>Grades supplied</dt>
                <dd>ICUMSA 45 · ICUMSA 150 · VHP · VVHP · Refined beet</dd>
              </div>
              <div>
                <dt>Primary origin</dt>
                <dd>Brazil, with European beet supply for origin diversification</dd>
              </div>
              <div>
                <dt>Trade terms</dt>
                <dd>FOB, CFR, CIF and DAP, as contracted</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* ---------------- WHO WE ARE ---------------- */}
      <section className="section" id="who-we-are">
        <div className="container">
          <div className="split split--offset">
            <Reveal className="split__content">
              <Eyebrow>Who we are</Eyebrow>
              <h2>A trading company built around one commodity.</h2>
              <div className="stack-lg" style={{ marginTop: "var(--s-6)" }}>
                <p className="lead">{company.positioning}</p>
                <p className="muted">
                  Sugar is a deceptively simple product traded through a complicated chain. Between a mill
                  in Brazil and a production line in another continent sit specification tolerances, load
                  port surveys, freight cycles, payment instruments, customs treatment and a well-documented
                  history of fraud. Most transactions that fail do not fail on the sugar.
                </p>
                <p className="muted">
                  We work with a small number of grades and a small number of counterparties, and we take
                  the parts of the transaction that usually go wrong seriously enough to slow the process
                  down where it matters. Buyers who want a signature this week are generally better served
                  elsewhere.
                </p>
                <LinkArrow href="/brazilian-sugar-supply-program">The Brazilian supply programme</LinkArrow>
              </div>
            </Reveal>
            <Reveal className="split__media" delay={80}>
              <Frame
                src="/images/mill.svg"
                alt="Line drawing of a cane sugar mill with silos and processing stacks"
                ratio="tall"
                caption="Origin — cane processing and refining"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- WHAT MAKES US DISTINCT ---------------- */}
      <section className="section section--ivory">
        <div className="container">
          <Reveal>
            <SectionHeader
              eyebrow="What makes us distinct"
              title="Six things we do differently, and why they matter to a buyer."
              lead="None of these are claims about scale. They are descriptions of how the transaction is run."
            />
          </Reveal>
          <div className="deflist">
            {DISTINCT.map((d, i) => (
              <Reveal key={d.term} className="deflist__item" delay={i * 40}>
                <span className="deflist__idx">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="deflist__term">{d.term}</h3>
                <p className="deflist__desc">{d.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- OUR BUSINESS ---------------- */}
      <section className="section" id="our-business">
        <div className="container">
          <div className="grid grid--editorial">
            <Reveal>
              <Eyebrow>Our business</Eyebrow>
              <h2>From mill to discharge, in five stages.</h2>
              <p className="muted" style={{ marginTop: "var(--s-5)" }}>
                The same sequence applies to a container of ICUMSA 45 and to a bulk parcel of VHP. The
                scale changes; the discipline does not.
              </p>
              <div style={{ marginTop: "var(--s-6)" }}>
                <Link href="/products" className="btn btn--outline">Explore products</Link>
              </div>
              <div style={{ marginTop: "var(--s-7)" }}>
                <Frame
                  src="/images/port.svg"
                  alt="Technical line drawing of a bulk carrier alongside port gantry cranes"
                  ratio="wide"
                  caption="Execution — load port and freight"
                />
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="flow">
                {BUSINESS.map((s) => (
                  <div className="flow__step" key={s.stage}>
                    <span className="flow__stage">{s.stage}</span>
                    <h3 className="flow__title">{s.title}</h3>
                    <p className="flow__body">{s.body}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- OUR COMMITMENT ---------------- */}
      <section className="section section--ivory" id="commitment">
        <div className="container">
          <Reveal>
            <SectionHeader
              eyebrow="Our commitment"
              title="What a counterparty can hold us to."
            />
          </Reveal>
          <Reveal delay={60}>
            <div className="figures">
              {COMMITMENTS.map((c) => (
                <div className="figures__item" key={c.k}>
                  <p className="figures__k">{c.k}</p>
                  <p className="figures__v">{c.v}</p>
                  <p className="figures__note">{c.note}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="muted" style={{ marginTop: "var(--s-7)", maxWidth: "62ch", fontSize: "var(--fs-sm)" }}>
              We hold no sustainability certification that we have not earned. Where a buyer requires a
              specific standard, scheme or audit at origin, we will tell you whether the mills we work with
              hold it before the contract is written — not after.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- BRAZILIAN PROGRAM PREVIEW ---------------- */}
      <section className="section section--ink">
        <div className="container">
          <div className="grid grid--sidebar">
            <Reveal>
              <Eyebrow>Programme</Eyebrow>
              <h2>Brazilian Sugar Supply Program</h2>
            </Reveal>
            <Reveal delay={70}>
              <p className="lead" style={{ color: "rgba(255,255,255,0.82)" }}>
                Structured sourcing and commercial execution for qualified international buyers, built
                around Brazil&rsquo;s cane origin and the ports that serve it.
              </p>
              <div className="deflist" style={{ marginTop: "var(--s-7)", borderTopColor: "rgba(255,255,255,0.16)" }}>
                {PROGRAM_POINTS.map((p, i) => (
                  <div
                    className="deflist__item"
                    key={p.k}
                    style={{ borderBottomColor: "rgba(255,255,255,0.16)" }}
                  >
                    <span className="deflist__idx">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="deflist__term" style={{ color: "#fff" }}>{p.k}</h3>
                    <p className="deflist__desc" style={{ color: "rgba(255,255,255,0.62)" }}>{p.d}</p>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "var(--s-7)" }}>
                <Link href="/brazilian-sugar-supply-program" className="btn btn--gold">
                  Explore the Brazilian Sugar Supply Program
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- PRODUCT SNAPSHOT ---------------- */}
      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeader
              eyebrow="Product portfolio"
              title="Five grades, specified for what your process actually needs."
              lead="Refined, mill white, two raw grades and beet. The right choice is usually decided by your process, not by the headline grade."
            />
          </Reveal>
          <Reveal delay={60}>
            <div className="crosslinks">
              {products.map((p) => (
                <Link href={`/products/${p.slug}`} key={p.slug} className="crosslink">
                  <span className="crosslink__k">{p.code}</span>
                  <span className="crosslink__t">{p.shortName}</span>
                  <p className="muted" style={{ fontSize: "var(--fs-xs)", marginTop: "var(--s-3)" }}>{p.grade}</p>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <TradeCTA />
    </>
  );
}
