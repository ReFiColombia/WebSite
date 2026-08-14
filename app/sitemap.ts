import type { MetadataRoute } from "next";

const BASE = "https://reficolombia.org";
const routes = ["", "/donate", "/lend-manager", "/community"];
const locales = ["es", "en"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return locales.flatMap((l) =>
    routes.map((r) => ({
      url: `${BASE}/${l}${r}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: r === "" ? 1 : 0.7,
    })),
  );
}
