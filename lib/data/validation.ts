import { z } from "zod";

const allowedMapHosts = new Set(["www.google.com", "google.com", "maps.google.com"]);

export const destinationCategorySchema = z.enum(["cafe-resto", "mountain-hill", "camping", "lodging"]);

export const destinationSectionSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
});

export const destinationSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  category: destinationCategorySchema,
  shortDescription: z.string().min(1),
  location: z.string().min(1),
  heroImage: z.string().min(1),
  gallery: z.array(z.string().min(1)).min(1),
  highlights: z.array(z.string().min(1)).min(1),
  sections: z.array(destinationSectionSchema).optional(),
  costs: z.array(z.string().min(1)).optional(),
  mapEmbedUrl: z.string().url().optional(),
  sourcePage: z.string().optional(),
  featured: z.boolean().optional(),
});

export const siteContentSchema = z.object({
  tagline: z.string().min(1),
  about: z.string().min(1),
  emergencyContacts: z.array(
    z.object({
      label: z.string().min(1),
      numbers: z.array(z.string().min(1)).min(1),
    }),
  ),
});

export function isAllowedMapEmbedUrl(value?: string): boolean {
  if (!value) return false;

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return false;
  }

  if (url.protocol !== "https:") {
    return false;
  }

  if (!allowedMapHosts.has(url.hostname)) {
    return false;
  }

  return url.pathname.startsWith("/maps/embed");
}

export function sanitizeMapEmbedUrl(value?: string): string | undefined {
  return isAllowedMapEmbedUrl(value) ? value : undefined;
}

export function sanitizeDestination<T extends z.infer<typeof destinationSchema>>(destination: T): T {
  return {
    ...destination,
    mapEmbedUrl: sanitizeMapEmbedUrl(destination.mapEmbedUrl),
  };
}
