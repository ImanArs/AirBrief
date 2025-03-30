import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AirBrief - Aviation & Travel Companion",
    short_name: "AirBrief",
    description: "Discover fascinating facts about famous airplanes and paradise travel destinations",
    start_url: "/",
    display: "standalone",
    background_color: "#1a1a1a",
    theme_color: "#7f1d1d",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}

