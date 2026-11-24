import { NextRequest, NextResponse } from "next/server";

// --- Utilities & singletons ---
function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function stripNewlines(input: string): string {
  return input.replace(/[\r\n]+/g, " ");
}

function getEnvStrict(name: string, fallback?: string): string {
  let value = process.env[name];
  if ((value === undefined || value === null || value.trim() === "") && fallback !== undefined) {
    value = fallback;
  }
  if (value === undefined || value === null) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  const cleaned = value.trim().replace(/^"|"$/g, "");
  if (!cleaned) {
    throw new Error(`Empty environment variable after cleaning: ${name}`);
  }
  return cleaned;
}

// Forward emails via backend API to avoid AWS creds in Next.js runtime


// POST /api/contact
export async function POST(req: NextRequest) {
  try {
    const t0 = Date.now();
    let payload: any;
    try {
      payload = await req.json();
    } catch (e) {
      return NextResponse.json({ error: "Invalid JSON body", code: "BAD_REQUEST" }, { status: 400 });
    }

    const firstName = String(payload?.firstName || "").trim();
    const lastName = String(payload?.lastName || "").trim();
    const email = String(payload?.email || "").trim();
    const phone = String(payload?.phone || "").trim();
    const message = String(payload?.message || "").trim();

    console.log("[contact] payload", { firstName, lastName, email, phone, messageLen: message?.length ?? 0 });

    if (!firstName || !lastName || !email || !phone || !message) {
      return NextResponse.json({ error: "Missing required fields", code: "CONTACT_FIELDS_REQUIRED" }, { status: 400 });
    }

    // Basic input validation
    if (firstName.length > 100 || lastName.length > 100) {
      return NextResponse.json({ error: "Name is too long", code: "CONTACT_NAME_TOO_LONG" }, { status: 400 });
    }
    if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address", code: "EMAIL_INVALID" }, { status: 400 });
    }
    if (phone.length > 50) {
      return NextResponse.json({ error: "Phone number is too long", code: "CONTACT_PHONE_TOO_LONG" }, { status: 400 });
    }
    if (message.length > 5000) {
      return NextResponse.json({ error: "Message is too long", code: "CONTACT_MESSAGE_TOO_LONG" }, { status: 400 });
    }

    // Forward to backend API
    const backendBase = (process.env.NEXT_PUBLIC_API_BASE || process.env.API_BASE || "http://localhost:5000").replace(/\/$/, "");
    const resp = await fetch(`${backendBase}/api/v1/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, phone, message, language: typeof payload?.language === "string" ? payload.language : undefined }),
      // Optionally forward cookies/headers if backend needs auth; not required for contact
    });

    const data = await resp.json().catch(() => ({}));
    if (!resp.ok) {
      return NextResponse.json({ error: data?.error || "Backend contact failed", ...(data?.code ? { code: data.code } : {}) }, { status: resp.status });
    }
    return NextResponse.json(data);
  } catch (err: any) {
    console.error("/api/contact error", err);
    const message = typeof err?.message === "string" ? err.message : "Unknown error";
    const isConfigError = /Missing required environment variable|Empty environment variable after cleaning/i.test(message);
    return NextResponse.json(
      {
        error: isConfigError ? "Configuration error" : "Failed to send message",
        code: isConfigError ? "CONFIG_ERROR" : "SERVER_ERROR",
      },
      { status: 500 },
    );
  }
}