// src/app/robots.ts

import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";

/** Gera /robots.txt: libera a indexação do site e aponta o sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
