"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, company } from "@/lib/company";

/** Routes whose hero is a dark image — the header starts transparent over them. */
const DARK_HERO = ["/", "/products", "/brazilian-sugar-supply-program", "/trade-compliance-fraud-prevention", "/contact"];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const overHero = DARK_HERO.includes(pathname) && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.classList.toggle("is-locked", open);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("is-locked");
    };
  }, [open]);

  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className={`header ${overHero ? "header--over" : "header--solid"}`}>
        <div className="container header__inner">
          <Link href="/" className="logo" aria-label={`${company.name} — home`}>
            <span className="logo__mark">{company.name}</span>
            <span className="logo__sub">Sugar Trading</span>
          </Link>

          <nav className="nav" aria-label="Main">
            {NAV.filter((n) => n.href !== "/contact").map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="nav__link"
                aria-current={isCurrent(n.href) ? "page" : undefined}
              >
                {n.href === "/brazilian-sugar-supply-program"
                  ? "Brazilian Supply Program"
                  : n.href === "/trade-compliance-fraud-prevention"
                  ? "Trade Compliance"
                  : n.label}
              </Link>
            ))}
          </nav>

          <Link href="/contact" className="btn btn--sm btn--gold header__cta">
            Contact trade desk
          </Link>

          <button
            className="burger"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {open && (
        <div className="mobilenav" id="mobile-nav">
          <nav aria-label="Mobile">
            <ul className="mobilenav__list">
              {NAV.map((n, i) => (
                <li key={n.href} className="mobilenav__item">
                  <Link
                    href={n.href}
                    className="mobilenav__link"
                    aria-current={isCurrent(n.href) ? "page" : undefined}
                  >
                    {n.label}
                    <span className="mobilenav__num">{String(i + 1).padStart(2, "0")}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mobilenav__foot">
            <Link href="/contact" className="btn btn--gold">Contact trade desk</Link>
          </div>
        </div>
      )}
    </>
  );
}
