# Meridian Cane — International Sugar Trading Website

A complete, production-ready corporate website for a B2B sugar trading company.
Next.js 15 (App Router) + TypeScript + plain CSS. No Tailwind, no UI library,
no build configuration that can break on you.

---

> **Deploying? Read `DEPLOY.md`** — it walks you from this zip to a live site on
> your own domain, one copy-paste command at a time.

## 1. Run it on your machine

Open a terminal, `cd` into this folder, then copy-paste these commands one at a time.

**Step 1 — install dependencies** (takes 1–2 minutes)

```bash
npm install
```

Expected: a line like `added 340 packages`. Warnings are normal; errors are not.

**Step 2 — start the development server**

```bash
npm run dev
```

Expected output:

```
▲ Next.js 15.5.23
- Local:  http://localhost:3000
✓ Ready in 1.2s
```

Now open <http://localhost:3000> in your browser.

**Step 3 — verify the production build works** (do this before you deploy)

```bash
npm run build
```

Expected: `✓ Compiled successfully`, then a route table listing 18 routes.
If you see `Failed to compile`, copy the error and fix it before deploying.

**Step 4 — preview the production build**

```bash
npm start
```

Press `Ctrl + C` in the terminal to stop either server.

---

## 2. Before you launch — the replacement checklist

Everything on this site is written and working. These are the only items
that need your real business data. All of them live in **one file**:
`lib/company.ts`.

Open it and search for `⚠ REPLACE BEFORE LAUNCH`.

| # | What | Where | Why it was left blank |
|---|------|-------|----------------------|
| 1 | Company legal name | `lib/company.ts` → `legalName` | "Meridian Cane Commodities Private Limited" is sample branding |
| 2 | Trade desk email | `contact.tradeDeskEmail` | A made-up address can belong to a real stranger |
| 3 | Compliance email | `contact.complianceEmail` | Same reason |
| 4 | Phone number | `contact.phoneDisplay` + `phoneHref` | A plausible fake number can ring a real business |
| 5 | WhatsApp number | `contact.whatsappDisplay` | Same reason |
| 6 | CIN / GST / IEC | `registrations` | Government identifiers — a fabricated one is a legal problem, and buyers are told on your own compliance page to verify these against the registry |

**Two behaviours worth knowing:**

- Leave `registrations` values empty and the footer simply omits that line. Fill any of them in and it appears automatically.
- `certifications: []` is empty on purpose. Only add a certification once you hold the certificate — your Trade Compliance page explicitly tells buyers to distrust suppliers who claim credentials without documents.

**Also review before launch:**

- `app/privacy-policy/page.tsx` and `app/terms/page.tsx` are working drafts with a visible warning banner. Have a lawyer review both, then delete the banner (`<Callout ... variant="warn">` block).
- `company.siteUrl` — set this to your real domain. It drives `sitemap.xml`, canonical URLs and Open Graph tags.

---

## 3. Connecting the enquiry form

The form validates, shows a loading state, blocks duplicate submissions,
traps bots with a honeypot field, and returns a reference number
(`MC-20260821-7G1Z`). It does **not** fake a send — with nothing configured
it tells the user honestly that the inbox is not connected.

To connect it:

```bash
cp .env.example .env.local
```

Then open `.env.local` and uncomment **one** option:

**Option A — webhook (easiest).** Set `ENQUIRY_WEBHOOK_URL` to a Zapier / Make /
n8n / Slack / Google Apps Script endpoint. The full enquiry arrives as JSON.

**Option B — email via Resend.** Set `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL` and
`ENQUIRY_FROM_EMAIL`. Free tier at resend.com; you must verify your sending domain.

Restart the server after editing `.env.local`.

Verify it works:

```bash
curl -s -X POST http://localhost:3000/api/enquiry \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","company":"Test Ltd","email":"a@test.com","product":"icumsa-45","requirement":"Testing the enquiry endpoint end to end."}' \
  -w "\nstatus=%{http_code}\n"
```

- `status=200` with a reference → connected and working.
- `status=503` → nothing configured yet; check `.env.local` and restart.

---

## 4. Deploying

**Vercel** (recommended — this is a Next.js app):

```bash
npm install -g vercel
vercel
```

Then add your environment variables in the Vercel dashboard under
**Settings → Environment Variables**, and redeploy.

Any host that runs Node 18+ works too: `npm run build` then `npm start`.

---

## 5. Where everything lives

```
app/
  layout.tsx                              header, footer, fonts, global metadata
  page.tsx                                Home
  products/page.tsx                       Products landing
  products/[slug]/page.tsx                All 5 product pages, generated from data
  brazilian-sugar-supply-program/         Supply programme
  trade-compliance-fraud-prevention/      Compliance & fraud
  contact/page.tsx                        Trade Desk
  privacy-policy/ terms/                  Legal (drafts)
  api/enquiry/route.ts                    Form handler
  sitemap.ts robots.ts not-found.tsx      SEO + 404

components/
  Header.tsx        sticky nav, transparent over dark heroes, mobile drawer
  Footer.tsx        four-column corporate footer
  ContactForm.tsx   validation, loading, success, honeypot
  Reveal.tsx        scroll-triggered fade (respects reduced motion)
  UI.tsx            Eyebrow, Frame, SectionHeader, SpecTable, Callout, TradeCTA

lib/
  company.ts        ← ALL company data. Edit this to rebrand the whole site.
  products.ts       ← ALL product data. Add a product here, its page appears.

styles/
  tokens.css        ← colours, fonts, spacing, radii, motion. Edit here first.
  base.css          reset, typography, buttons, responsive safety
  components.css    header, hero, tables, forms, footer
  pages.css         page-specific compositions

public/images/      14 original SVG assets (see IMAGES.md)
```

---

## 6. Common edits

**Change a colour across the entire site** — `styles/tokens.css`, edit the `--c-*` values.

**Add a sixth product** — add one object to the array in `lib/products.ts`.
Its page, its route, its footer link, its sitemap entry and its dropdown option
in the enquiry form all appear automatically.

**Change the company name everywhere** — `lib/company.ts`, the `name` field.

**Rename a nav item** — the `NAV` array in `lib/company.ts`. Note that
`components/Header.tsx` shortens two labels for the desktop bar only
(`Brazilian Supply Program`, `Trade Compliance`) so the navigation does not
overflow; the mobile drawer shows the full names.

**Replace the artwork with photographs** — see `IMAGES.md`.

---

## 7. What was verified

- Production build compiles with zero errors or warnings — 18 routes.
- All 15 routes return the correct status (200s; 404 on an unknown path).
- Every page has a unique title, meta description, canonical URL, Open Graph tags and exactly one `<h1>`.
- Zero images without alt text; zero form fields without labels; zero buttons without accessible names across all 13 generated HTML files.
- All nine colour combinations in the palette pass WCAG AA contrast (lowest 4.98:1).
- Enquiry endpoint tested in all four states: unconfigured (503), missing fields (422), honeypot (silent 200), and connected webhook (200, payload delivered).
- No fixed pixel widths outside media queries; grid children carry `min-width: 0` to prevent horizontal overflow.

**Not verified, because this environment has no browser:** actual rendering at
each breakpoint. See `QA-CHECKLIST.md` for the 10-minute pass to run yourself.
