import { getDestinationRepository } from "@/lib/data/repositories/repository-factory";
import { DestinationCategory } from "@/lib/data/types";

function repository() {
  return getDestinationRepository();
}

export async function getAllDestinations() {
  return repository().getAll();
}

export async function getDestinationBySlug(slug: string) {
  return repository().getBySlug(slug);
}

export async function getFeaturedDestinations(limit?: number) {
  return repository().getFeatured(limit);
}

export async function getDestinationsByCategory(category: DestinationCategory) {
  return repository().getByCategory(category);
}

export async function getHomePageData() {
  const [content, featured, all] = await Promise.all([
    repository().getSiteContent(),
    repository().getFeatured(6),
    repository().getAll(),
  ]);

  return {
    content,
    featured,
    counts: {
      total: all.length,
      mountains: all.filter((d) => d.category === "mountain-hill").length,
      cafes: all.filter((d) => d.category === "cafe-resto").length,
      lodging: all.filter((d) => d.category === "lodging").length,
      camping: all.filter((d) => d.category === "camping").length,
    },
  };
}

export async function getContactData() {
  return repository().getSiteContent();
}
