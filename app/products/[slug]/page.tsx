import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { Eyebrow, Frame, SpecTable, TradeCTA, Callout } from "@/components/UI";
import { products, getProduct } from "@/lib/products";
import { company } from "@/lib/company";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: p.name,
    description: `${p.shortName} — ${p.grade}. Reference specification, physical and chemical properties, applications, packaging and origin for industrial buyers.`,
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: { title: p.name, description: p.summary, images: [{ url: p.image }] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const others = products.filter((p) => p.slug !== product.slug);

  return (
    <>
      <section className="pagehero">
        <div className="pagehero__media">
          <img src={product.image} alt={product.imageAlt} />
        </div>
        <div className="pagehero__scrim" />
        <div className="container pagehero__inner">
          <Eyebrow>Product {product.code}</Eyebrow>
          <h1>{product.name}</h1>
          <p className="pagehero__lead">{product.summary}</p>
        </div>
      </section>

      <section className="section">
        <div className="container prodgrid">
          <div>
            {/* Overview */}
            <Reveal>
              <Eyebrow>Overview</Eyebrow>
              <div className="stack-lg measure">
                {product.overview.map((para, i) => (
                  <p key={i} className={i === 0 ? "lead" : "muted"}>{para}</p>
                ))}
              </div>
            </Reveal>

            {/* Key characteristics */}
            <Reveal>
              <h2 style={{ marginTop: "var(--s-9)" }}>Key characteristics</h2>
              <div className="deflist" style={{ marginTop: "var(--s-6)" }}>
                {product.characteristics.map((c, i) => (
                  <div className="deflist__item" key={c.term}>
                    <span className="deflist__idx">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="deflist__term">{c.term}</h3>
                    <p className="deflist__desc">{c.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Specifications */}
            <Reveal>
              <h2 style={{ marginTop: "var(--s-9)" }}>Specification</h2>
              <div className="grid grid--2" style={{ marginTop: "var(--s-6)" }}>
                <SpecTable title="Reference specification" rows={product.specifications} />
                <div className="stack-lg">
                  <SpecTable title="Physical properties" rows={product.physical} />
                  <SpecTable title="Chemical properties" rows={product.chemical} />
                </div>
              </div>
              <p className="spec__note" style={{ marginTop: "var(--s-5)" }}>
                Published international trade reference grade. The contract specification prevails; pre-shipment
                analysis is carried out against the contract, and any parameter not listed here can be added to it.
              </p>
            </Reveal>

            {/* Applications */}
            <Reveal>
              <h2 style={{ marginTop: "var(--s-9)" }}>Typical applications</h2>
              <ul className="checklist" style={{ marginTop: "var(--s-6)", columns: "2 220px", columnGap: "var(--s-7)" }}>
                {product.applications.map((a) => <li key={a}>{a}</li>)}
              </ul>
            </Reveal>

            {/* Packaging + origin */}
            <Reveal>
              <h2 style={{ marginTop: "var(--s-9)" }}>Packaging and supply</h2>
              <div className="grid grid--2" style={{ marginTop: "var(--s-6)" }}>
                <SpecTable title="Packaging" rows={product.packaging} />
                <SpecTable title="Sourcing and origin" rows={product.origin} />
              </div>
            </Reveal>

            <Reveal>
              <div style={{ marginTop: "var(--s-8)" }}>
                <Frame
                  src="/images/warehouse.svg"
                  alt="Line drawing of palletised sugar bags stacked in a warehouse"
                  ratio="band"
                  caption="Packing and storage prior to shipment"
                />
              </div>
            </Reveal>
          </div>

          {/* Sticky enquiry rail */}
          <aside className="rail">
            <p className="crosslink__k">Commercial enquiry</p>
            <p className="rail__title" style={{ marginTop: "var(--s-3)" }}>Discuss your supply requirement</p>
            <ul className="rail__list">
              <li><span>Grade</span><span>{product.shortName}</span></li>
              <li><span>Specification</span><span>{product.grade}</span></li>
              <li><span>Origin</span><span>{product.origin[0].value.split("—")[0].trim()}</span></li>
              <li><span>Terms</span><span>As contracted</span></li>
            </ul>
            <Link href={`/contact?product=${product.slug}`} className="btn btn--primary">
              Enquire about {product.shortName}
            </Link>
            <p className="muted" style={{ fontSize: "var(--fs-xs)", marginTop: "var(--s-4)" }}>
              Or email{" "}
              <a href={`mailto:${company.contact.tradeDeskEmail}`} style={{ borderBottom: "1px solid var(--c-line)" }}>
                {company.contact.tradeDeskEmail}
              </a>{" "}
              with your quantity, destination port and required timeline.
            </p>
          </aside>
        </div>
      </section>

      <section className="section section--ivory section--tight">
        <div className="container">
          <Reveal>
            <Eyebrow>Other grades</Eyebrow>
            <div className="crosslinks" style={{ marginTop: "var(--s-5)" }}>
              {others.map((p) => (
                <Link href={`/products/${p.slug}`} key={p.slug} className="crosslink">
                  <span className="crosslink__k">{p.code}</span>
                  <span className="crosslink__t">{p.shortName}</span>
                  <p className="muted" style={{ fontSize: "var(--fs-xs)", marginTop: "var(--s-3)" }}>{p.grade}</p>
                </Link>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <div style={{ marginTop: "var(--s-7)", maxWidth: "72ch" }}>
              <Callout title="Before you contract with anyone">
                <p className="muted" style={{ fontSize: "var(--fs-sm)" }}>
                  International sugar attracts a persistent volume of fraudulent offers, often quoting
                  grades and prices that do not exist. Read our{" "}
                  <Link href="/trade-compliance-fraud-prevention" style={{ borderBottom: "1px solid var(--c-gold)" }}>
                    trade compliance and fraud prevention guidance
                  </Link>{" "}
                  before releasing funds or documents to any counterparty, including us.
                </p>
              </Callout>
            </div>
          </Reveal>
        </div>
      </section>

      <TradeCTA
        title={`Enquire about ${product.shortName}`}
        body="Tell us the quantity, destination port, Incoterm and timeline. We will come back with an indication and the documentary route, or tell you plainly if we are not the right counterparty for it."
      />
    </>
  );
}
