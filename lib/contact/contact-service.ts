import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().max(40).optional().or(z.literal("")),
  message: z.string().min(10).max(2000),
  website: z.string().max(0).optional().or(z.literal("")),
});

type ContactPayload = z.infer<typeof contactSchema>;

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function getClientAddress(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(ipAddress: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ipAddress);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ipAddress, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  entry.count += 1;
  return false;
}

async function deliverToWebhook(payload: ContactPayload): Promise<boolean> {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    return false;
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.CONTACT_WEBHOOK_TOKEN
        ? { Authorization: `****** }
        : {}),
    },
    body: JSON.stringify({
      ...payload,
      submittedAt: new Date().toISOString(),
    }),
    cache: "no-store",
  });

  return response.ok;
}

async function deliverFallback(payload: ContactPayload): Promise<void> {
  console.info("[contact] received submission", {
    name: payload.name,
    email: payload.email,
    hasPhone: Boolean(payload.phone),
    messageLength: payload.message.length,
  });
}

export async function processContactSubmission(request: Request) {
  const ipAddress = getClientAddress(request);

  if (isRateLimited(ipAddress)) {
    return {
      ok: false,
      status: 429,
      body: { error: "Too many requests. Please try again in a minute." },
    };
  }

  const json = await request.json();
  const parsed = contactSchema.safeParse(json);

  if (!parsed.success) {
    return {
      ok: false,
      status: 400,
      body: { error: "Invalid contact submission." },
    };
  }

  if (parsed.data.website) {
    return {
      ok: true,
      status: 202,
      body: { success: true },
    };
  }

  const delivered = await deliverToWebhook(parsed.data);
  if (!delivered) {
    await deliverFallback(parsed.data);
  }

  return {
    ok: true,
    status: 202,
    body: { success: true },
  };
}
