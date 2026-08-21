import Link from "next/link";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { Eyebrow, Frame, TradeCTA, LinkArrow, Callout } from "@/components/UI";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products — Refined, Raw and Beet Sugar",
  description:
    "ICUMSA 45, ICUMSA 150, VHP raw sugar, VVHP raw sugar and refined beet sugar. Reference specifications, applications, packaging and origin for industrial buyers.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <section className="pagehero">
        <div className="pagehero__media">
          <img src="/images/products-hero.svg" alt="Macro detail of sugar crystals with directional highlights" />
        </div>
        <div className="pagehero__scrim" />
        <div className="container pagehero__inner">
          <Eyebrow>Product portfolio</Eyebrow>
          <h1>Five grades. One specification discipline.</h1>
          <p className="pagehero__lead">
            These are industrial commodities, not shelf products. Each grade below is defined by an
            analytical specification, and the right one for you is decided by what your process does to the
            sugar after it arrives.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="grid grid--sidebar" style={{ marginBottom: "var(--s-8)" }}>
              <Eyebrow>How to choose</Eyebrow>
              <div className="stack-lg">
                <p className="lead">
                  Colour is the parameter buyers over-specify most often. If your process develops colour,
                  ferments the sugar or blends it into something already coloured, paying for ICUMSA 45
                  when ICUMSA 150 performs identically is a cost with no return.
                </p>
                <p className="muted">
                  Equally, if you are a refinery, the question is not colour at all — it is melt yield and
                  non-sugar load, which is where the VHP and VVHP comparison earns its keep. Send us the
                  process and we will tell you which grade we would buy in your position.
                </p>
                <LinkArrow href="/contact">Ask the trade desk</LinkArrow>
              </div>
            </div>
          </Reveal>

          <div className="plist">
            {products.map((p, i) => (
              <Reveal key={p.slug} delay={i * 40}>
                <Link href={`/products/${p.slug}`} className="pitem">
                  <span className="pitem__code">{p.code}</span>
                  <div>
                    <h2 className="pitem__name">{p.shortName}</h2>
                    <p className="pitem__grade">{p.grade}</p>
                    <p className="pitem__desc">{p.summary}</p>
                    <span className="link-arrow" style={{ marginTop: "var(--s-5)", display: "inline-flex" }}>
                      View specification <span aria-hidden="true">&rarr;</span>
                    </span>
                  </div>
                  <div className="pitem__media">
                    <Frame src={p.image} alt={p.imageAlt} ratio="wide" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div style={{ marginTop: "var(--s-8)", maxWidth: "72ch" }}>
              <Callout title="A note on the specifications published here">
                <p className="muted" style={{ fontSize: "var(--fs-sm)" }}>
                  The values shown on each product page are the published international trade reference
                  grades. They describe what the grade means, not a guarantee attaching to a particular
                  cargo. The specification written into your contract is the one that governs the shipment,
                  and pre-shipment analysis is carried out against that contract specification.
                </p>
              </Callout>
            </div>
          </Reveal>
        </div>
      </section>

      <TradeCTA />
    </>
  );
}
