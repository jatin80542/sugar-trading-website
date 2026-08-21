/* ============================================================
   PRODUCT DATA
   Specification values below are the published industry reference
   grades used in international sugar trade (ICUMSA / pol standards).
   They are NOT a Meridian Cane guarantee — every product page states
   that the contract specification prevails. Replace any row with your
   own contracted values when you have them.
   ============================================================ */

export type SpecRow = { property: string; value: string };

export type Product = {
  slug: string;
  code: string;
  name: string;
  shortName: string;
  grade: string;
  tone: "white" | "offwhite" | "raw" | "raw-deep" | "beet";
  image: string;
  imageAlt: string;
  summary: string;
  overview: string[];
  characteristics: { term: string; desc: string }[];
  specifications: SpecRow[];
  physical: SpecRow[];
  chemical: SpecRow[];
  applications: string[];
  packaging: SpecRow[];
  origin: SpecRow[];
};

const RADIATION: SpecRow[] = [
  { property: "Radiation", value: "Within normal background levels; certified at load port" },
];

export const products: Product[] = [
  {
    slug: "icumsa-45",
    code: "01",
    name: "ICUMSA 45 Refined Cane Sugar",
    shortName: "ICUMSA 45",
    grade: "Refined white — colour ≤ 45 IU",
    tone: "white",
    image: "/images/product-icumsa-45.svg",
    imageAlt: "Close view of bright white refined ICUMSA 45 cane sugar crystals",
    summary:
      "The reference grade for refined white sugar in international trade. Specified where colour, purity and consistency are non-negotiable — beverages, confectionery and pharmaceutical-adjacent food production.",
    overview: [
      "ICUMSA 45 is refined white cane sugar produced to a maximum colour of 45 ICUMSA units. It is the most widely contracted refined grade in international trade and the default specification for buyers whose end product is visually or organoleptically sensitive to colour carry-over.",
      "Meridian Cane contracts ICUMSA 45 directly with refining mills, with pre-shipment analysis carried out against the agreed contract specification. Colour, polarisation and moisture are the three parameters that most often move a cargo out of tolerance, and each is verified before loading.",
    ],
    characteristics: [
      { term: "Colour stability", desc: "Low colour retention through dissolution, which matters in clear beverages and syrups where any tint carries into the finished product." },
      { term: "Free-flowing crystal", desc: "Consistent granulation reduces bridging in silos and hopper systems and supports accurate dosing in automated lines." },
      { term: "High polarisation", desc: "Sucrose content at the top of the commercial range, giving predictable yield in recipe formulation." },
      { term: "Low moisture", desc: "Reduced caking risk during transit and storage, particularly relevant for long-haul ocean freight into humid destinations." },
    ],
    specifications: [
      { property: "Colour", value: "45 ICUMSA units maximum" },
      { property: "Polarisation", value: "99.80° minimum" },
      { property: "Moisture", value: "0.04% maximum" },
      { property: "Ash content", value: "0.04% maximum" },
      { property: "Solubility", value: "100% dry and free-flowing" },
      { property: "Granulation", value: "Fine to medium — 0.6 mm to 0.8 mm typical" },
      { property: "Crop year", value: "Current crop, as declared on the contract" },
    ],
    physical: [
      { property: "Appearance", value: "White, crystalline, free-flowing" },
      { property: "Odour", value: "Neutral; free of foreign odour" },
      { property: "Sediment", value: "None" },
      { property: "Magnetic particles", value: "4 mg/kg maximum" },
      { property: "Foreign matter", value: "None" },
    ],
    chemical: [
      { property: "Sulphur dioxide (SO₂)", value: "20 mg/kg maximum" },
      { property: "Reducing sugars", value: "0.05% maximum" },
      { property: "Maximum HPN staph aureus", value: "As per contract specification" },
      ...RADIATION,
    ],
    applications: [
      "Carbonated soft drinks and clear beverages",
      "Confectionery and sugar panning",
      "Bakery and industrial food manufacturing",
      "Dairy, ice cream and dessert production",
      "Pharmaceutical syrups and excipient use, subject to buyer qualification",
      "Retail repacking under buyer brand",
    ],
    packaging: [
      { property: "Standard bagging", value: "50 kg polypropylene bags with inner liner" },
      { property: "Bulk bagging", value: "1,000 kg / 1,250 kg jumbo bags (FIBC)" },
      { property: "Retail packing", value: "1 kg / 2 kg / 5 kg consumer packs, buyer branded, on request" },
      { property: "Container stuffing", value: "Palletised or floor-loaded, as specified" },
      { property: "Marking", value: "Buyer marks and shipping marks applied at origin" },
    ],
    origin: [
      { property: "Primary origin", value: "Brazil — Centre-South refining region" },
      { property: "Load ports", value: "Santos, Paranaguá, Maceió" },
      { property: "Incoterms", value: "FOB, CFR or CIF, as contracted" },
      { property: "Documentation", value: "Full commercial and analysis set issued per contract" },
    ],
  },
  {
    slug: "icumsa-150",
    code: "02",
    name: "ICUMSA 150 Mill White Sugar",
    shortName: "ICUMSA 150",
    grade: "Mill white — colour ≤ 150 IU",
    tone: "offwhite",
    image: "/images/product-icumsa-150.svg",
    imageAlt: "Mill white ICUMSA 150 cane sugar crystals with a soft off-white cast",
    summary:
      "A commercially efficient white grade for applications where a small colour allowance carries no penalty in the finished product. Widely used across bakery, brewing and general food manufacture.",
    overview: [
      "ICUMSA 150 is mill white cane sugar produced to a maximum colour of 150 ICUMSA units. It is a direct-consumption grade that avoids the additional refining step behind ICUMSA 45, and prices accordingly.",
      "For buyers whose process masks or removes residual colour — fermentation, caramelisation, blending with coloured ingredients — ICUMSA 150 typically delivers the same functional result at a lower landed cost. Meridian Cane positions the two grades side by side so the decision is made on process requirement rather than habit.",
    ],
    characteristics: [
      { term: "Commercially efficient", desc: "A wider colour tolerance removes a refining stage without affecting sucrose content in any material way." },
      { term: "Direct consumption grade", desc: "Suitable for food manufacture as received, without further refining by the buyer." },
      { term: "Consistent supply", desc: "Produced across a broader base of mills than fully refined grades, which supports continuity of supply through the crop cycle." },
      { term: "Process tolerant", desc: "Well matched to applications where colour is developed, removed or concealed downstream." },
    ],
    specifications: [
      { property: "Colour", value: "150 ICUMSA units maximum" },
      { property: "Polarisation", value: "99.50° minimum" },
      { property: "Moisture", value: "0.06% maximum" },
      { property: "Ash content", value: "0.06% maximum" },
      { property: "Solubility", value: "100% dry and free-flowing" },
      { property: "Granulation", value: "Fine to medium, as contracted" },
      { property: "Crop year", value: "Current crop, as declared on the contract" },
    ],
    physical: [
      { property: "Appearance", value: "White to off-white, crystalline, free-flowing" },
      { property: "Odour", value: "Neutral; free of foreign odour" },
      { property: "Sediment", value: "None" },
      { property: "Magnetic particles", value: "4 mg/kg maximum" },
      { property: "Foreign matter", value: "None" },
    ],
    chemical: [
      { property: "Sulphur dioxide (SO₂)", value: "20 mg/kg maximum" },
      { property: "Reducing sugars", value: "0.10% maximum" },
      ...RADIATION,
    ],
    applications: [
      "Bakery and biscuit manufacture",
      "Brewing, distilling and fermentation",
      "Jams, preserves and sauces",
      "Caramel and colour-developed products",
      "Animal feed and industrial fermentation feedstock",
      "General food processing",
    ],
    packaging: [
      { property: "Standard bagging", value: "50 kg polypropylene bags with inner liner" },
      { property: "Bulk bagging", value: "1,000 kg / 1,250 kg jumbo bags (FIBC)" },
      { property: "Container stuffing", value: "Palletised or floor-loaded, as specified" },
      { property: "Marking", value: "Buyer marks and shipping marks applied at origin" },
    ],
    origin: [
      { property: "Primary origin", value: "Brazil — Centre-South and North-East mills" },
      { property: "Load ports", value: "Santos, Paranaguá, Maceió" },
      { property: "Incoterms", value: "FOB, CFR or CIF, as contracted" },
      { property: "Documentation", value: "Full commercial and analysis set issued per contract" },
    ],
  },
  {
    slug: "vhp-raw-sugar",
    code: "03",
    name: "VHP Raw Cane Sugar",
    shortName: "VHP Raw Sugar",
    grade: "Very High Polarisation — 99.0° minimum",
    tone: "raw",
    image: "/images/product-vhp.svg",
    imageAlt: "Light amber VHP raw cane sugar crystals in warm natural light",
    summary:
      "Refinery feedstock. VHP is the workhorse of the international raw sugar trade — bought in volume by refineries and industrial processors who complete the refining step themselves.",
    overview: [
      "VHP — Very High Polarisation — is raw cane sugar delivered at a polarisation of 99.0 degrees and above, with the natural molasses film retained on the crystal. It is not a consumer grade. It is bought as feedstock by refineries that will melt, clarify and crystallise it into white sugar on their own plant.",
      "Because VHP moves in bulk vessel quantities against a well-established international benchmark, execution discipline matters more than product differentiation: load port supervision, draft survey, timely documentation and a clean chain of title. That is where Meridian Cane concentrates its work on this grade.",
    ],
    characteristics: [
      { term: "Refinery feedstock", desc: "Specified by refineries and industrial melters rather than by end-product manufacturers." },
      { term: "Bulk economics", desc: "Typically contracted in vessel parcels, where freight and load rate materially affect landed cost." },
      { term: "Retained molasses film", desc: "The characteristic amber cast comes from the molasses layer on the crystal, which is removed during refining." },
      { term: "Benchmark linked", desc: "Pricing conventionally references the international raw sugar benchmark plus an origin and quality differential." },
    ],
    specifications: [
      { property: "Polarisation", value: "99.00° minimum" },
      { property: "Colour", value: "600 – 1,200 ICUMSA units typical" },
      { property: "Moisture", value: "0.10% maximum" },
      { property: "Ash content", value: "0.15% maximum" },
      { property: "Reducing sugars", value: "0.15% maximum" },
      { property: "Crop year", value: "Current crop, as declared on the contract" },
    ],
    physical: [
      { property: "Appearance", value: "Light amber to golden brown, crystalline, free-flowing" },
      { property: "Odour", value: "Characteristic of raw cane sugar; free of foreign odour" },
      { property: "Sediment", value: "None" },
      { property: "Foreign matter", value: "None" },
    ],
    chemical: [
      { property: "Dextran", value: "As per contract specification" },
      { property: "Starch", value: "As per contract specification" },
      ...RADIATION,
    ],
    applications: [
      "Cane refinery feedstock",
      "Industrial melting and liquid sugar production",
      "Fermentation and ethanol feedstock",
      "Blending operations at destination refineries",
    ],
    packaging: [
      { property: "Bulk", value: "Vessel bulk, loaded by conveyor or grab" },
      { property: "Bagged option", value: "50 kg PP bags or 1,000 kg jumbo bags where contracted" },
      { property: "Quantity survey", value: "Draft survey at load port; independent surveyor as agreed" },
    ],
    origin: [
      { property: "Primary origin", value: "Brazil — Centre-South" },
      { property: "Load ports", value: "Santos, Paranaguá, Maceió" },
      { property: "Incoterms", value: "FOB or CFR, as contracted" },
      { property: "Analysis", value: "Independent load port analysis per contract terms" },
    ],
  },
  {
    slug: "vvhp-raw-sugar",
    code: "04",
    name: "VVHP Raw Cane Sugar",
    shortName: "VVHP Raw Sugar",
    grade: "Very Very High Polarisation — 99.3° minimum",
    tone: "raw-deep",
    image: "/images/product-vvhp.svg",
    imageAlt: "Pale golden VVHP raw cane sugar crystals, lighter than standard VHP",
    summary:
      "A higher-purity raw grade for refineries seeking improved melt yield and reduced refining load. Visually paler and analytically tighter than standard VHP.",
    overview: [
      "VVHP raw cane sugar is produced to a polarisation of 99.3 degrees and above, with correspondingly lower colour than standard VHP. The higher starting purity reduces the refining burden at destination: less colour to remove, less non-sugar load through the process, and a better melt yield per tonne landed.",
      "The commercial case for VVHP over VHP is arithmetic rather than aesthetic. Where a refinery can quantify the saving in processing cost and yield, the quality premium is often recovered. Meridian Cane will set out that comparison against your own melt figures on request.",
    ],
    characteristics: [
      { term: "Higher melt yield", desc: "Greater recoverable sucrose per tonne relative to standard VHP, subject to refinery performance." },
      { term: "Reduced refining load", desc: "Lower colour and non-sugar content at intake, which can shorten the clarification and decolourisation stage." },
      { term: "Paler crystal", desc: "A thinner molasses film gives a visibly lighter golden appearance than VHP." },
      { term: "Tighter tolerance", desc: "Narrower analytical band, which supports more predictable refinery scheduling." },
    ],
    specifications: [
      { property: "Polarisation", value: "99.30° minimum" },
      { property: "Colour", value: "400 – 800 ICUMSA units typical" },
      { property: "Moisture", value: "0.08% maximum" },
      { property: "Ash content", value: "0.12% maximum" },
      { property: "Reducing sugars", value: "0.10% maximum" },
      { property: "Crop year", value: "Current crop, as declared on the contract" },
    ],
    physical: [
      { property: "Appearance", value: "Pale golden, crystalline, free-flowing" },
      { property: "Odour", value: "Characteristic of raw cane sugar; free of foreign odour" },
      { property: "Sediment", value: "None" },
      { property: "Foreign matter", value: "None" },
    ],
    chemical: [
      { property: "Dextran", value: "As per contract specification" },
      { property: "Starch", value: "As per contract specification" },
      ...RADIATION,
    ],
    applications: [
      "Premium refinery feedstock where melt yield is a priority",
      "Liquid sugar and invert syrup production",
      "Industrial processes sensitive to non-sugar load",
      "Blending to lift the average quality of a refinery intake",
    ],
    packaging: [
      { property: "Bulk", value: "Vessel bulk, loaded by conveyor or grab" },
      { property: "Bagged option", value: "50 kg PP bags or 1,000 kg jumbo bags where contracted" },
      { property: "Quantity survey", value: "Draft survey at load port; independent surveyor as agreed" },
    ],
    origin: [
      { property: "Primary origin", value: "Brazil — Centre-South" },
      { property: "Load ports", value: "Santos, Paranaguá" },
      { property: "Incoterms", value: "FOB or CFR, as contracted" },
      { property: "Analysis", value: "Independent load port analysis per contract terms" },
    ],
  },
  {
    slug: "beet-sugar",
    code: "05",
    name: "Refined Beet Sugar",
    shortName: "Beet Sugar",
    grade: "Refined white beet — colour ≤ 45 IU",
    tone: "beet",
    image: "/images/product-beet.svg",
    imageAlt: "Refined white beet sugar crystals with a cool neutral cast",
    summary:
      "Chemically equivalent refined sucrose from a European origin base. Contracted where origin diversification, freight geography or destination trade preference favours beet over cane.",
    overview: [
      "Refined beet sugar is sucrose of the same chemical identity as refined cane sugar. In most food applications the two are functionally interchangeable, and the choice between them is driven by origin, freight economics, tariff treatment and buyer policy rather than by performance.",
      "Meridian Cane maintains beet supply alongside its Brazilian cane programme so that buyers are not exposed to a single origin. For destinations closer to European supply, or where a trade agreement improves the landed position, beet can be the better commercial answer to the same technical requirement.",
    ],
    characteristics: [
      { term: "Origin diversification", desc: "A European supply base that behaves differently from cane origins through the crop and freight cycle." },
      { term: "Functional equivalence", desc: "Refined sucrose performs equivalently to refined cane sugar in the large majority of food applications." },
      { term: "Freight geography", desc: "Shorter sea routes to several destinations can offset a higher ex-works price." },
      { term: "Campaign supply", desc: "Beet is processed in a defined campaign, which shapes availability and forward contracting windows." },
    ],
    specifications: [
      { property: "Colour", value: "45 ICUMSA units maximum" },
      { property: "Polarisation", value: "99.70° minimum" },
      { property: "Moisture", value: "0.06% maximum" },
      { property: "Ash content", value: "0.04% maximum" },
      { property: "Solubility", value: "100% dry and free-flowing" },
      { property: "Granulation", value: "Fine to medium, as contracted" },
    ],
    physical: [
      { property: "Appearance", value: "White, crystalline, free-flowing" },
      { property: "Odour", value: "Neutral; free of foreign odour" },
      { property: "Sediment", value: "None" },
      { property: "Foreign matter", value: "None" },
    ],
    chemical: [
      { property: "Invert sugar", value: "0.04% maximum" },
      { property: "Sulphur dioxide (SO₂)", value: "As per contract specification" },
      ...RADIATION,
    ],
    applications: [
      "Beverage and confectionery manufacture",
      "Bakery and dairy production",
      "Retail repacking under buyer brand",
      "General food processing where origin flexibility is required",
    ],
    packaging: [
      { property: "Standard bagging", value: "50 kg or 25 kg bags, as contracted" },
      { property: "Bulk bagging", value: "1,000 kg jumbo bags (FIBC)" },
      { property: "Bulk", value: "Bulk truck or container liner where the destination permits" },
      { property: "Marking", value: "Buyer marks and shipping marks applied at origin" },
    ],
    origin: [
      { property: "Primary origin", value: "European Union beet processors" },
      { property: "Load ports", value: "Confirmed per contract and campaign" },
      { property: "Incoterms", value: "FOB, CFR, CIF or DAP, as contracted" },
      { property: "Documentation", value: "Full commercial and analysis set issued per contract" },
    ],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const productSlugs = products.map((p) => p.slug);
