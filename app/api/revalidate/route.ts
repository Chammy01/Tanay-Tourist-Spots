import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;

  if (!secret) {
    return Response.json({ error: "Revalidation not configured." }, { status: 500 });
  }

  const providedSecret = request.headers.get("x-revalidate-secret");
  if (providedSecret !== secret) {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as { paths?: string[] };
  const paths = Array.isArray(body.paths) && body.paths.length ? body.paths : ["/", "/sightseeing", "/lodging", "/contact"];

  for (const path of paths) {
    revalidatePath(path);
  }

  return Response.json({ revalidated: true, paths });
}
