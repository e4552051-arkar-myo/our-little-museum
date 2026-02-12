import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Our Little Museum",
    short_name: "Little Museum",
    description: "A cozy memory gallery and letter box.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff7f2",
    theme_color: "#fbd9df",
    orientation: "portrait",
    icons: [
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
