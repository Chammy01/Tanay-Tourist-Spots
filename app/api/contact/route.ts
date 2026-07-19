import { processContactSubmission } from "@/lib/contact/contact-service";

export async function POST(request: Request) {
  try {
    const result = await processContactSubmission(request);
    return Response.json(result.body, { status: result.status });
  } catch {
    return Response.json(
      { error: "Unable to process your request right now. Please try again." },
      { status: 500 },
    );
  }
}
