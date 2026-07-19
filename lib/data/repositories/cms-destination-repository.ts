import { Destination, DestinationCategory, SiteContent } from "@/lib/data/types";
import {
  destinationSchema,
  sanitizeDestination,
  siteContentSchema,
} from "@/lib/data/validation";
import { DestinationRepository } from "@/lib/data/repositories/destination-repository";

interface CmsRepositoryOptions {
  baseUrl: string;
  token?: string;
}

async function requestJson<T>(url: string, token?: string): Promise<T> {
  const response = await fetch(url, {
    headers: token
      ? {
          Authorization: `******
        }
      : undefined,
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`CMS request failed: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export class CmsDestinationRepository implements DestinationRepository {
  constructor(private readonly options: CmsRepositoryOptions) {}

  async getAll(): Promise<Destination[]> {
    const payload = await requestJson<unknown[]>(`${this.options.baseUrl}/destinations`, this.options.token);
    return payload.map((item) => sanitizeDestination(destinationSchema.parse(item)));
  }

  async getBySlug(slug: string): Promise<Destination | null> {
    const encodedSlug = encodeURIComponent(slug);
    const payload = await requestJson<unknown | null>(`${this.options.baseUrl}/destinations/${encodedSlug}`, this.options.token);

    if (!payload) {
      return null;
    }

    return sanitizeDestination(destinationSchema.parse(payload));
  }

  async getByCategory(category: DestinationCategory): Promise<Destination[]> {
    const encodedCategory = encodeURIComponent(category);
    const payload = await requestJson<unknown[]>(
      `${this.options.baseUrl}/destinations?category=${encodedCategory}`,
      this.options.token,
    );

    return payload.map((item) => sanitizeDestination(destinationSchema.parse(item)));
  }

  async getFeatured(limit = 6): Promise<Destination[]> {
    const payload = await requestJson<unknown[]>(
      `${this.options.baseUrl}/destinations?featured=true&limit=${limit}`,
      this.options.token,
    );

    return payload.map((item) => sanitizeDestination(destinationSchema.parse(item)));
  }

  async getSiteContent(): Promise<SiteContent> {
    const payload = await requestJson<unknown>(`${this.options.baseUrl}/site-content`, this.options.token);
    return siteContentSchema.parse(payload);
  }
}
