import { getContactData } from "@/lib/data/services/destination-service";

export async function GET() {
  const content = await getContactData();
  return Response.json(content);
}
