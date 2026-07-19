import { NextRequest } from "next/server";
import {
  getAllDestinations,
  getDestinationsByCategory,
  getFeaturedDestinations,
} from "@/lib/data/services/destination-service";
import { destinationCategorySchema } from "@/lib/data/validation";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category");
  const featured = searchParams.get("featured") === "true";
  const limit = Number(searchParams.get("limit") ?? "6");

  if (category) {
    const parsedCategory = destinationCategorySchema.safeParse(category);
    if (!parsedCategory.success) {
      return Response.json({ error: "Invalid category." }, { status: 400 });
    }

    const destinations = await getDestinationsByCategory(parsedCategory.data);
    return Response.json(destinations);
  }

  if (featured) {
    const destinations = await getFeaturedDestinations(Number.isFinite(limit) ? Math.max(1, limit) : 6);
    return Response.json(destinations);
  }

  const destinations = await getAllDestinations();
  return Response.json(destinations);
}
