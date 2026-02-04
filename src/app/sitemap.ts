import type { MetadataRoute } from "next";
import { services } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://adventise.com";
  const staticRoutes = [
    "",
    "/services",
    "/results",
    "/case-studies",
    "/testimonials",
    "/about",
    "/resources",
    "/careers",
    "/contact",
  ];

  const serviceRoutes = services.map((service) => `/services/${service.slug}`);

  return [...staticRoutes, ...serviceRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}
