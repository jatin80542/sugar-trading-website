import Link from "next/link";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { Eyebrow, TradeCTA, Callout } from "@/components/UI";
import { company } from "@/lib/company";

export const metadata: Metadata = {
  title: "Trade Compliance & Fraud Prevention",
  description:
    "How to verify that you are dealing with Meridian Cane, how our counterparty checks work, and the specific warning signs of fraud in the international sugar trade.",
  alternates: { canonical: "/trade-compliance-fraud-prevention" },
};

const SECTIONS = [
  { id: "compliance", label: "Trade compliance" },
  { id: "verification", label: "Counterparty verification" },
  { id: "fraud", label: "Fraud prevention" },
  { id: "channels", label: "Official channels" },
  { id: "payment", label: "Payment safety" },
  { id: "report", label: "Report suspicious activity" },
];

const REDFLAGS = [
  "An offer of ICUMSA 45 at a price far below the prevailing international market, presented as a distressed or allocated cargo.",
  "Pressure to sign or pay quickly because the allocation, vessel or price is said to expire within hours.",
  "A request for an advance payment, deposit, or “performance fee” before any contract or verification is complete.",
  "Banking details sent by email, or a request to pay an account in a country unrelated to the seller or the origin.",
  "A change of bank account mid-transaction, however plausible the explanation for it.",
  "Documents supplied as images or unsigned scans that cannot be verified with the issuing party.",
  "Refusal to allow independent inspection, survey or analysis at the load port.",
  "Contact from an email domain that is close to, but not exactly, an established company domain.",
  "A counterparty who will not provide company registration details, or whose signatory cannot demonstrate authority.",
  "Proof-of-funds or proof-of-product demanded in an order that leaves one party exposed before the other has performed.",
];

const VERIFY_US = [
  "Check that the email domain is exactly the one published on this page — character by character.",
  "Call the trade desk on the published number to confirm that the person writing to you works here.",
  "Ask for our company registration details and verify them with the relevant registry yourself.",
  "Confirm banking instructions by voice on a number you obtained independently, never a number contained in the payment email.",
  "Treat any communication that arrives outside our published channels as unverified until you have confirmed it.",
];

const VERIFY_YOU = [
  "Company registration documents and evidence of trading activity.",
  "Identification and evidence of signing authority for the person contracting.",
  "The banking route and jurisdictions involved in the transaction.",
  "Sanctions and restricted-party screening of the parties to the contract.",
  "The commercial rationale for the requirement — grade, volume, destination and end use.",
];

export default function CompliancePage() {
  return (
    <>
      <section className="pagehero">
        <div className="pagehero__media">
          <img src="/images/compliance.svg" alt="Abstract line drawing of contract documents and a verification seal" />
        </div>
        <div className="pagehero__scrim" />
        <div className="container pagehero__inner">
          <Eyebrow>Trade compliance</Eyebrow>
          <h1>Trade Compliance &amp; Fraud Prevention</h1>
          <p className="pagehero__lead">
            The international sugar trade attracts a persistent volume of fraud. This page explains how we
            verify counterparties, how you can verify us, and what to do if something does not look right.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <Callout title="Read this before sending money to anyone" variant="warn">
              <p style={{ fontSize: "var(--fs-sm)" }}>
                {company.name} does not request advance payments, deposits or fees before a contract is
                executed, and never sends or amends banking instructions by email alone. If you receive a
                payment request that appears to come from us, stop and confirm it by telephone on the number
                published on this page before acting on it.
              </p>
              <p style={{ fontSize: "var(--fs-sm)" }}>
                This applies even when the message is a reply within an existing email thread. Email threads
                can be intercepted; a voice confirmation on an independently obtained number cannot be
                intercepted the same way.
              </p>
            </Callout>
          </Reveal>

          <Reveal>
            <nav className="anchors" aria-label="On this page" style={{ marginTop: "var(--s-7)" }}>
              {SECTIONS.map((s) => (
                <a key={s.id} href={`#${s.id}`}>{s.label}</a>
              ))}
            </nav>
          </Reveal>

          {/* 01 Trade compliance */}
          <article className="docsection" id="compliance">
            <Reveal>
              <div className="docsection__head">
                <span className="docsection__n">01</span>
                <h2>Trade compliance</h2>
              </div>
              <div className="measure stack-lg">
                <p className="lead">
                  Compliance in commodity trade is not a document you file once. It is a set of checks
                  applied to every transaction, every time, including transactions with counterparties we
                  have dealt with before.
                </p>
                <p className="muted">
                  Before a contract is issued we screen the parties involved against applicable sanctions
                  and restricted-party lists, confirm the identity and authority of the signatories, and
                  establish that the banking route is consistent with the parties and the trade. Where the
                  destination imposes import licensing, food safety registration or documentary requirements,
                  those are identified at the qualification stage rather than discovered at discharge.
                </p>
                <p className="muted">
                  A transaction that cannot satisfy these checks does not proceed. That decision is not
                  negotiable on the basis of volume, margin or urgency, and we would rather lose the business
                  than write a contract we cannot compliantly perform.
                </p>
              </div>
            </Reveal>
          </article>

          {/* 02 Counterparty verification */}
          <article className="docsection" id="verification">
            <Reveal>
              <div className="docsection__head">
                <span className="docsection__n">02</span>
                <h2>Counterparty verification</h2>
              </div>
              <div className="grid grid--2">
                <div>
                  <h3 style={{ fontSize: "var(--fs-h4)" }}>What we ask of you</h3>
                  <p className="muted" style={{ fontSize: "var(--fs-sm)", margin: "var(--s-4) 0 var(--s-5)" }}>
                    Verification is a condition of contracting, not a formality. Expect to provide:
                  </p>
                  <ul className="checklist">
                    {VERIFY_YOU.map((v) => <li key={v}>{v}</li>)}
                  </ul>
                </div>
                <div>
                  <h3 style={{ fontSize: "var(--fs-h4)" }}>How to verify us</h3>
                  <p className="muted" style={{ fontSize: "var(--fs-sm)", margin: "var(--s-4) 0 var(--s-5)" }}>
                    You should apply the same scrutiny to us. We expect it, and a seller who resents the
                    question is telling you something:
                  </p>
                  <ul className="checklist">
                    {VERIFY_US.map((v) => <li key={v}>{v}</li>)}
                  </ul>
                </div>
              </div>
            </Reveal>
          </article>

          {/* 03 Fraud prevention */}
          <article className="docsection" id="fraud">
            <Reveal>
              <div className="docsection__head">
                <span className="docsection__n">03</span>
                <h2>Fraud prevention — known warning signs</h2>
              </div>
              <p className="measure muted" style={{ marginBottom: "var(--s-6)" }}>
                The patterns below recur across reported sugar trade frauds. None of them proves dishonesty
                on its own. Two or more appearing together in the same offer is a reason to stop and verify
                independently before doing anything else.
              </p>
              <ul className="checklist" style={{ columns: "2 300px", columnGap: "var(--s-7)" }}>
                {REDFLAGS.map((f) => <li key={f}>{f}</li>)}
              </ul>
              <div style={{ marginTop: "var(--s-7)", maxWidth: "72ch" }}>
                <Callout title="The price signal is the loudest one">
                  <p className="muted" style={{ fontSize: "var(--fs-sm)" }}>
                    Refined sugar trades within a broadly known international range. An offer materially
                    below that range is not a bargain that the market has overlooked. In practice it is the
                    single most reliable indicator that the cargo does not exist.
                  </p>
                </Callout>
              </div>
            </Reveal>
          </article>

          {/* 04 Official channels */}
          <article className="docsection" id="channels">
            <Reveal>
              <div className="docsection__head">
                <span className="docsection__n">04</span>
                <h2>Official communication channels</h2>
              </div>
              <p className="measure muted" style={{ marginBottom: "var(--s-6)" }}>
                These are the only channels through which {company.name} conducts commercial
                correspondence. Anything arriving from another domain, number or platform is not from us,
                regardless of the names, logos or signatures it carries.
              </p>
              <div className="grid grid--2">
                <div className="callout">
                  <p className="callout__title">Verified channels</p>
                  <ul className="checklist" style={{ marginTop: "var(--s-4)" }}>
                    <li>Website: <strong>{company.siteUrl.replace("https://", "")}</strong></li>
                    <li>Trade desk email: <strong>{company.contact.tradeDeskEmail}</strong></li>
                    <li>Compliance email: <strong>{company.contact.complianceEmail}</strong></li>
                    <li>Telephone: <strong>{company.contact.phoneDisplay}</strong></li>
                    <li>Registered office: <strong>{company.offices[0].lines.join(", ")}</strong></li>
                  </ul>
                </div>
                <div className="callout callout--warn">
                  <p className="callout__title">Not our channels</p>
                  <ul className="checklist" style={{ marginTop: "var(--s-4)" }}>
                    <li>Free webmail addresses using our company name.</li>
                    <li>Domains with added or altered characters, hyphens or alternative endings.</li>
                    <li>Messaging accounts that contact you first with an unsolicited offer.</li>
                    <li>Third parties presenting themselves as our agent, mandate or intermediary without a written appointment you can verify with us directly.</li>
                  </ul>
                </div>
              </div>
            </Reveal>
          </article>

          {/* 05 Payment safety */}
          <article className="docsection" id="payment">
            <Reveal>
              <div className="docsection__head">
                <span className="docsection__n">05</span>
                <h2>Payment safety</h2>
              </div>
              <div className="measure stack-lg">
                <p className="lead">
                  Banking details are issued only within an executed contract, and only through the channels
                  above. They are never published on this website, and no page here will ever ask you to
                  enter payment information.
                </p>
                <p className="muted">
                  Payment terms are agreed in the contract before any performance begins. Where an
                  instrument such as a documentary credit is used, the documentary set is defined and
                  reviewed against the credit before shipment. If a bank account you have been given
                  changes for any reason, stop and confirm the change by telephone with a person you have
                  already spoken to, on a number you already hold.
                </p>
              </div>
              <div style={{ marginTop: "var(--s-6)", maxWidth: "72ch" }}>
                <Callout title="We will never" variant="warn">
                  <ul>
                    <li>Ask for a payment before a contract is signed by both parties.</li>
                    <li>Send new or amended banking instructions by email without confirming them by voice.</li>
                    <li>Ask you to pay an account in the name of an individual rather than the contracting company.</li>
                    <li>Ask for a fee to release, allocate or reserve a cargo.</li>
                  </ul>
                </Callout>
              </div>
            </Reveal>
          </article>

          {/* 06 Report */}
          <article className="docsection" id="report">
            <Reveal>
              <div className="docsection__head">
                <span className="docsection__n">06</span>
                <h2>Report suspicious activity</h2>
              </div>
              <div className="measure stack-lg">
                <p className="lead">
                  If you have received an approach that claims to come from {company.name} and you are not
                  certain it is genuine, contact us before you act on it. There is no cost and no obligation
                  in checking.
                </p>
                <p className="muted">
                  Write to{" "}
                  <a href={`mailto:${company.contact.complianceEmail}`} style={{ borderBottom: "1px solid var(--c-gold)" }}>
                    {company.contact.complianceEmail}
                  </a>{" "}
                  with the full message including its headers, any documents received and the account details
                  you were given. If you believe you have already transferred funds, contact your bank
                  immediately and report the matter to the police or financial crime authority in your
                  jurisdiction — that is the step that most affects whether funds can be recovered, and it is
                  time-sensitive.
                </p>
                <p className="muted" style={{ fontSize: "var(--fs-sm)" }}>
                  This page is provided as general guidance on commercial risk. It is not legal advice, and
                  it does not create any warranty, guarantee or liability on the part of {company.legalName}{" "}
                  in respect of any transaction, whether with us or with a third party.
                </p>
                <div className="btn-row" style={{ marginTop: "var(--s-4)" }}>
                  <Link href="/contact" className="btn btn--primary">Contact the trade desk</Link>
                  <a href={`mailto:${company.contact.complianceEmail}`} className="btn btn--outline">Email compliance</a>
                </div>
              </div>
            </Reveal>
          </article>
        </div>
      </section>

      <TradeCTA
        title="Verify before you transact"
        body="If you are in the middle of a transaction and something feels wrong — a changed account, an unexpected fee, a deadline that appeared from nowhere — stop and speak to us first."
        cta="Speak to the trade desk"
      />
    </>
  );
}
