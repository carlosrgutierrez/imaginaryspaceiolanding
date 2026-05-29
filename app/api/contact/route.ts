import { NextResponse, type NextRequest } from "next/server";
import { validateContactForm } from "@/lib/contact";
import { createLeadInNotion, isNotionConfigured } from "@/lib/notion-leads";

export const runtime = "nodejs";

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

const hits = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

export async function POST(request: NextRequest) {
  if (!isNotionConfigured()) {
    return NextResponse.json(
      { ok: false, message: "Contact form is not configured yet." },
      { status: 503 }
    );
  }

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "Too many submissions. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  const validated = validateContactForm(body);
  if (!validated.ok) {
    return NextResponse.json(
      { ok: false, errors: validated.errors },
      { status: 400 }
    );
  }

  try {
    await createLeadInNotion(validated.data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] Notion create failed:", error);
    return NextResponse.json(
      {
        ok: false,
        message:
          "We couldn't save your message right now. Please email us directly.",
      },
      { status: 502 }
    );
  }
}
