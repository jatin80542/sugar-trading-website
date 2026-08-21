import Link from "next/link";
import type { ReactNode } from "react";
import type { SpecRow } from "@/lib/products";

export function Eyebrow({ children, plain = false }: { children: ReactNode; plain?: boolean }) {
  return <p className={`eyebrow${plain ? " eyebrow--plain" : ""}`}>{children}</p>;
}

export function LinkArrow({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="link-arrow">
      {children}
      <span aria-hidden="true">&rarr;</span>
    </Link>
  );
}

/** Image frame. Swap `src` for a photograph any time — the ratio classes stay. */
export function Frame({
  src,
  alt,
  ratio = "wide",
  caption,
  hover = true,
  priority = false,
}: {
  src: string;
  alt: string;
  ratio?: "wide" | "tall" | "square" | "band";
  caption?: string;
  hover?: boolean;
  priority?: boolean;
}) {
  return (
    <figure>
      <div className={`frame frame--${ratio}${hover ? " frame--hover" : ""}`}>
        {/* plain <img>: the artwork is vector, so there is nothing to resize */}
        <img src={src} alt={alt} loading={priority ? "eager" : "lazy"} decoding="async" />
      </div>
      {caption ? <figcaption className="frame__caption">{caption}</figcaption> : null}
    </figure>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  id,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  id?: string;
}) {
  return (
    <header className="measure" style={{ marginBottom: "var(--s-7)" }}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 id={id}>{title}</h2>
      {lead ? <p className="lead muted" style={{ marginTop: "var(--s-4)" }}>{lead}</p> : null}
    </header>
  );
}

export function SpecTable({
  title,
  rows,
  note,
}: {
  title: string;
  rows: SpecRow[];
  note?: string;
}) {
  return (
    <div className="spec">
      <div className="spec__head">
        <h3 className="spec__title">{title}</h3>
      </div>
      <table>
        <caption className="visually-hidden">{title}</caption>
        <tbody>
          {rows.map((r) => (
            <tr key={r.property}>
              <th scope="row">{r.property}</th>
              <td>{r.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {note ? <p className="spec__note">{note}</p> : null}
    </div>
  );
}

export function Callout({
  title,
  variant = "default",
  children,
}: {
  title?: string;
  variant?: "default" | "warn" | "ink";
  children: ReactNode;
}) {
  const cls = variant === "default" ? "callout" : `callout callout--${variant}`;
  return (
    <aside className={cls}>
      {title ? <p className="callout__title">{title}</p> : null}
      {children}
    </aside>
  );
}

export function TradeCTA({
  title = "Discuss your supply requirement",
  body = "Send us the grade, quantity, destination port and timeline. The trade desk replies with an indication and the documentation route, or tells you plainly if we are not the right counterparty.",
  cta = "Contact the trade desk",
}: {
  title?: string;
  body?: string;
  cta?: string;
}) {
  return (
    <section className="section section--tight tradecta">
      <div className="container tradecta__inner">
        <div>
          <Eyebrow>Trade desk</Eyebrow>
          <h2>{title}</h2>
          <p>{body}</p>
        </div>
        <div className="btn-row">
          <Link href="/contact" className="btn btn--gold">{cta}</Link>
        </div>
      </div>
    </section>
  );
}
