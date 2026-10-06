// src/app/sitemap.ts

import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";

/** Gera /sitemap.xml, que ajuda o Google a encontrar todas as páginas. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE.url}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/catalogo`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
