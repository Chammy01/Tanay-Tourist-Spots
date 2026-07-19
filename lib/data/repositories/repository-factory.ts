import { DestinationRepository, LocalDestinationRepository } from "@/lib/data/repositories/destination-repository";
import { CmsDestinationRepository } from "@/lib/data/repositories/cms-destination-repository";

const provider = process.env.DESTINATION_CONTENT_PROVIDER ?? "local";
const cmsBaseUrl = process.env.CMS_API_BASE_URL;
const cmsToken = process.env.CMS_API_TOKEN;
const fallbackToLocal = process.env.CMS_FALLBACK_TO_LOCAL !== "false";

let repository: DestinationRepository | null = null;

function createBaseRepository(): DestinationRepository {
  if (provider === "cms" && cmsBaseUrl) {
    return new CmsDestinationRepository({
      baseUrl: cmsBaseUrl.replace(/\/$/, ""),
      token: cmsToken,
    });
  }

  return new LocalDestinationRepository();
}

export function getDestinationRepository(): DestinationRepository {
  if (repository) {
    return repository;
  }

  const base = createBaseRepository();

  if (!fallbackToLocal || base instanceof LocalDestinationRepository) {
    repository = base;
    return repository;
  }

  repository = {
    async getAll() {
      try {
        return await base.getAll();
      } catch {
        return new LocalDestinationRepository().getAll();
      }
    },
    async getBySlug(slug) {
      try {
        return await base.getBySlug(slug);
      } catch {
        return new LocalDestinationRepository().getBySlug(slug);
      }
    },
    async getByCategory(category) {
      try {
        return await base.getByCategory(category);
      } catch {
        return new LocalDestinationRepository().getByCategory(category);
      }
    },
    async getFeatured(limit) {
      try {
        return await base.getFeatured(limit);
      } catch {
        return new LocalDestinationRepository().getFeatured(limit);
      }
    },
    async getSiteContent() {
      try {
        return await base.getSiteContent();
      } catch {
        return new LocalDestinationRepository().getSiteContent();
      }
    },
  };

  return repository;
}
