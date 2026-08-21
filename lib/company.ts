/* ============================================================
   COMPANY PROFILE — single source of truth for the whole site.
   Edit this file to rebrand the entire website.

   NOTE ON DATA:
   Everything below is written-out sample business content, ready
   to use or edit. The six values marked  ⚠ REPLACE BEFORE LAUNCH
   are deliberately non-live: a real phone number, mailbox or
   government registration number cannot be invented safely, so
   they are left as obvious placeholders instead of plausible
   fakes that could belong to somebody else.
   ============================================================ */

export const company = {
  name: "Meridian Cane",
  legalName: "Meridian Cane Commodities Private Limited", // ⚠ REPLACE BEFORE LAUNCH
  descriptor: "International Sugar Trading",
  domain: "meridiancane.com",
  siteUrl: "https://www.meridiancane.com",
  founded: "2016",

  positioning:
    "Meridian Cane is an international sugar trading and supply company. We source refined and raw cane sugar directly from producing mills, verify every consignment against contract specification, and execute delivery for industrial buyers through structured, documented trade.",

  shortBlurb:
    "Direct-to-mill sourcing and disciplined trade execution for industrial sugar buyers worldwide.",

  contact: {
    tradeDeskEmail: "trade@meridiancane.example",        // ⚠ REPLACE BEFORE LAUNCH
    complianceEmail: "compliance@meridiancane.example",  // ⚠ REPLACE BEFORE LAUNCH
    phoneDisplay: "+91 22 XXXX XXXX",                    // ⚠ REPLACE BEFORE LAUNCH
    phoneHref: "+9122XXXXXXXX",                          // ⚠ REPLACE BEFORE LAUNCH
    whatsappDisplay: "+91 XXXXX XXXXX",                  // ⚠ REPLACE BEFORE LAUNCH
    hours: "Monday to Friday, 09:30–18:30 IST",
  },

  offices: [
    {
      label: "Trade Desk — Head Office",
      lines: ["Nariman Point", "Mumbai 400021", "Maharashtra, India"],
      note: "Commercial enquiries, contracting and documentation.",
    },
    {
      label: "Origin Coordination — Brazil",
      lines: ["Santos, São Paulo", "Brazil"],
      note: "Mill liaison, loading supervision and port coordination.",
    },
  ],

  /* Government identifiers cannot be invented. Fill these in and the
     footer will print them automatically; leave them empty and the
     footer simply omits the line. */
  registrations: {
    cin: "",       // ⚠ Company Identification Number
    gstin: "",     // ⚠ GST registration
    iec: "",       // ⚠ Importer Exporter Code (DGFT)
  },

  /* Only list a certification here once you hold the certificate. */
  certifications: [] as string[],

  /* Banking details are intentionally NOT stored in the codebase.
     See the Trade Compliance page — they are issued per contract. */
} as const;

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/brazilian-sugar-supply-program", label: "Brazilian Sugar Supply Program" },
  { href: "/trade-compliance-fraud-prevention", label: "Trade Compliance & Fraud Prevention" },
  { href: "/contact", label: "Contact" },
] as const;

export const TBC = "Available upon commercial specification confirmation.";
