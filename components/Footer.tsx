import Link from "next/link";
import { company } from "@/lib/company";
import { products } from "@/lib/products";

export default function Footer() {
  const year = new Date().getFullYear();
  const reg = Object.entries(company.registrations).filter(([, v]) => v);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <span className="logo">
              <span className="logo__mark">{company.name}</span>
              <span className="logo__sub">Sugar Trading</span>
            </span>
            <p className="footer__blurb">{company.shortBlurb}</p>
          </div>

          <div>
            <p className="footer__coltitle">Company</p>
            <ul className="footer__list">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/#who-we-are">Who we are</Link></li>
              <li><Link href="/#our-business">Our business</Link></li>
              <li><Link href="/#commitment">Our commitment</Link></li>
            </ul>
          </div>

          <div>
            <p className="footer__coltitle">Products</p>
            <ul className="footer__list">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link href={`/products/${p.slug}`}>{p.shortName}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="footer__coltitle">Trade</p>
            <ul className="footer__list">
              <li><Link href="/brazilian-sugar-supply-program">Brazilian Sugar Supply Program</Link></li>
              <li><Link href="/trade-compliance-fraud-prevention">Trade Compliance &amp; Fraud Prevention</Link></li>
              <li><Link href="/products">Product portfolio</Link></li>
            </ul>
          </div>

          <div>
            <p className="footer__coltitle">Contact</p>
            <ul className="footer__list">
              <li><Link href="/contact">Trade desk</Link></li>
              <li><a href={`mailto:${company.contact.tradeDeskEmail}`}>{company.contact.tradeDeskEmail}</a></li>
              <li>{company.contact.phoneDisplay}</li>
              <li>{company.offices[0].lines.join(", ")}</li>
            </ul>
          </div>
        </div>

        <p className="footer__notice">
          Nothing on this website is an offer, quotation or commitment to sell. All supply is subject to
          contract, product availability and satisfactory counterparty verification. Specification values
          shown are published trade reference grades — the contract specification prevails in every case.
        </p>

        <div className="footer__bottom">
          <p>
            © {year} {company.legalName}. All rights reserved.
            {reg.length > 0 && " " + reg.map(([k, v]) => `${k.toUpperCase()}: ${v}`).join(" · ")}
          </p>
          <div className="footer__legal">
            <Link href="/trade-compliance-fraud-prevention">Fraud prevention</Link>
            <Link href="/privacy-policy">Privacy policy</Link>
            <Link href="/terms">Terms of use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
