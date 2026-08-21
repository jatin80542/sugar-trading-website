import type { MetadataRoute } from "next";
import { company } from "@/lib/company";
import { productSlugs } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = company.siteUrl;
  const now = new Date();
  const routes = [
    "", "/products", "/brazilian-sugar-supply-program",
    "/trade-compliance-fraud-prevention", "/contact",
    "/privacy-policy", "/terms",
    ...productSlugs.map((s) => `/products/${s}`),
  ];
  return routes.map((r) => ({
    url: `${base}${r}`,
    lastModified: now,
    changeFrequency: r === "" ? "weekly" : "monthly",
    priority: r === "" ? 1 : r.startsWith("/products/") ? 0.8 : 0.7,
  }));
}
