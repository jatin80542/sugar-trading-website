import Link from "next/link";
import { Eyebrow } from "@/components/UI";

export default function NotFound() {
  return (
    <section className="section" style={{ paddingTop: "calc(var(--header-h) + 6rem)" }}>
      <div className="container measure">
        <Eyebrow>404</Eyebrow>
        <h1>That page is not here.</h1>
        <p className="lead muted" style={{ marginTop: "var(--s-5)" }}>
          The link may be out of date. The product portfolio and the trade desk are both one click away.
        </p>
        <div className="btn-row" style={{ marginTop: "var(--s-7)" }}>
          <Link href="/products" className="btn btn--primary">View products</Link>
          <Link href="/" className="btn btn--outline">Back to home</Link>
        </div>
      </div>
    </section>
  );
}
