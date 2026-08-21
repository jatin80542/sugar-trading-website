import type { Metadata } from "next";
import { Eyebrow, Callout } from "@/components/UI";
import { company } from "@/lib/company";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms governing use of the Meridian Cane website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <section className="section" style={{ paddingTop: "calc(var(--header-h) + 5rem)" }}>
      <div className="container measure">
        <Eyebrow>Legal</Eyebrow>
        <h1>Terms of use</h1>

        <Callout title="Have this reviewed before you publish" variant="warn">
          <p style={{ fontSize: "var(--fs-sm)" }}>
            A working draft. Governing law, jurisdiction and limitation of liability need to be set by a
            lawyer in your jurisdiction before this page goes live.
          </p>
        </Callout>

        <div className="stack-lg" style={{ marginTop: "var(--s-7)" }}>
          <h2>No offer</h2>
          <p className="muted">
            Nothing on this website constitutes an offer, quotation, invitation to treat or commitment to
            buy or sell. All supply is subject to contract, product availability and satisfactory
            counterparty verification.
          </p>

          <h2>Specifications</h2>
          <p className="muted">
            Specification values published on this website are the recognised international trade reference
            grades. They describe what a grade means; they are not a warranty attaching to any particular
            cargo. The specification set out in an executed contract governs the shipment made under it.
          </p>

          <h2>Accuracy</h2>
          <p className="muted">
            We take care that this website is accurate, but market and operational information changes. We
            do not warrant that every page is current at the moment you read it.
          </p>

          <h2>Third parties</h2>
          <p className="muted">
            No person is authorised to represent {company.legalName} unless appointed in writing. If someone
            claims to act for us, verify it with us directly through the channels published on our trade
            compliance page before proceeding.
          </p>

          <h2>Governing law</h2>
          <p className="muted">
            To be confirmed by legal counsel before publication, together with the agreed jurisdiction for
            disputes and any limitation of liability.
          </p>
        </div>
      </div>
    </section>
  );
}
