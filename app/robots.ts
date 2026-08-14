import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://reficolombia.org/sitemap.xml",
    host: "https://reficolombia.org",
  };
}
