import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ReFi Colombia",
    short_name: "ReFi Colombia",
    description:
      "Comunidad nacional de finanzas regenerativas. Del extraer al regenerar.",
    start_url: "/",
    display: "standalone",
    background_color: "#0e1220",
    theme_color: "#0e1220",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
