import type { MetadataRoute } from "next";

const BASE = "https://reficolombia.org";
// Only public pages. The lending panels need a wallet and are not indexed.
const routes = ["", "/donate"];
const locales = ["es", "en"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return locales.flatMap((l) =>
    routes.map((r) => ({
      url: `${BASE}/${l}${r}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: r === "" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(locales.map((x) => [x, `${BASE}/${x}${r}`])),
      },
    })),
  );
}
