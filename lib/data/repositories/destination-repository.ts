import { destinations, siteContent } from "@/lib/data/destinations";
import { Destination, DestinationCategory, SiteContent } from "@/lib/data/types";

export interface DestinationRepository {
  getAll(): Promise<Destination[]>;
  getBySlug(slug: string): Promise<Destination | null>;
  getByCategory(category: DestinationCategory): Promise<Destination[]>;
  getFeatured(limit?: number): Promise<Destination[]>;
  getSiteContent(): Promise<SiteContent>;
}

export class LocalDestinationRepository implements DestinationRepository {
  async getAll() {
    return destinations;
  }

  async getBySlug(slug: string) {
    return destinations.find((destination) => destination.slug === slug) ?? null;
  }

  async getByCategory(category: DestinationCategory) {
    return destinations.filter((destination) => destination.category === category);
  }

  async getFeatured(limit = 6) {
    return destinations.filter((destination) => destination.featured).slice(0, limit);
  }

  async getSiteContent() {
    return siteContent;
  }
}
