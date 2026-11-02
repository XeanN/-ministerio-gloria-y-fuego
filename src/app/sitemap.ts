import type { MetadataRoute } from "next";
import { mainNav, siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return mainNav.map((item) => ({
    url: new URL(item.href, siteConfig.url).toString(),
    lastModified,
    changeFrequency: item.href === "/en-vivo" ? "daily" : "monthly",
    priority: item.href === "/" ? 1 : 0.7,
  }));
}
