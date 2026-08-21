import type { Metadata } from "next";
import { Eyebrow, Callout } from "@/components/UI";
import { company } from "@/lib/company";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Meridian Cane handles information submitted through this website.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPage() {
  return (
    <section className="section" style={{ paddingTop: "calc(var(--header-h) + 5rem)" }}>
      <div className="container measure">
        <Eyebrow>Legal</Eyebrow>
        <h1>Privacy policy</h1>

        <Callout title="Have this reviewed before you publish" variant="warn">
          <p style={{ fontSize: "var(--fs-sm)" }}>
            This is a working draft covering what the website actually does. Your obligations depend on
            where you and your buyers are established — India&rsquo;s DPDP Act, the UK/EU GDPR and other
            regimes each add requirements. Have a lawyer review this page before launch.
          </p>
        </Callout>

        <div className="stack-lg" style={{ marginTop: "var(--s-7)" }}>
          <h2>What we collect</h2>
          <p className="muted">
            Only what you type into the trade desk enquiry form: your name, company, business email,
            telephone number, country, the grade you are interested in, quantity, destination, Incoterm,
            timeline and the description of your requirement.
          </p>

          <h2>Why we collect it</h2>
          <p className="muted">
            To respond to your enquiry, to carry out the counterparty verification described on our trade
            compliance page, and to keep a record of commercial correspondence. We do not sell it and we do
            not use it for advertising.
          </p>

          <h2>Who it is shared with</h2>
          <p className="muted">
            The service that delivers the enquiry to us, and — where a transaction proceeds — the banks,
            inspection agencies, freight providers and authorities involved in that transaction. Nobody else.
          </p>

          <h2>How long we keep it</h2>
          <p className="muted">
            Enquiries that do not lead to a transaction are retained while the commercial discussion is
            live and for a reasonable period afterwards. Records connected to an executed transaction are
            retained for the period required by applicable tax, customs and anti-money-laundering rules.
          </p>

          <h2>Your rights</h2>
          <p className="muted">
            You can ask what we hold about you, ask for it to be corrected, or ask us to delete it where we
            are not required to keep it. Write to{" "}
            <a href={`mailto:${company.contact.complianceEmail}`} style={{ borderBottom: "1px solid var(--c-line)" }}>
              {company.contact.complianceEmail}
            </a>
            .
          </p>

          <h2>Cookies</h2>
          <p className="muted">
            This website sets no tracking or advertising cookies. If you later add analytics, this section
            must be updated and a consent mechanism added where the law requires one.
          </p>
        </div>
      </div>
    </section>
  );
}
