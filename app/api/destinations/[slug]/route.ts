import { getDestinationBySlug } from "@/lib/data/services/destination-service";

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  const destination = await getDestinationBySlug(slug);

  if (!destination) {
    return Response.json({ error: "Destination not found." }, { status: 404 });
  }

  return Response.json(destination);
}
