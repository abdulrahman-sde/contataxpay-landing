import { NextRequest, NextResponse } from "next/server";

// Forward hire accountant form submissions to backend API

// POST /api/hire-accountant
export async function POST(req: NextRequest) {
  try {
    const t0 = Date.now();
    let payload: any;
    try {
      payload = await req.json();
    } catch (e) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const {
      country = "",
      companyName = "",
      firstName = "",
      lastName = "",
      email = "",
      phone = "",
      message = "",
      businessType = "",
      numberOfEmployees = "",
      currentStep = 1,
    } = payload;

    console.log("[hire-accountant] payload", {
      country,
      companyName,
      firstName,
      lastName,
      email,
      phone,
      businessType,
      numberOfEmployees,
      currentStep,
      messageLen: message?.length ?? 0,
    });

    // Basic validation
    if (!country) {
      return NextResponse.json({ error: "Country is required" }, { status: 400 });
    }

    // Forward to backend API
    const backendBase = (process.env.NEXT_PUBLIC_API_BASE || process.env.API_BASE || "http://localhost:5000").replace(/\/$/, "");
    const resp = await fetch(`${backendBase}/api/v1/hire-accountant`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        country,
        companyName,
        firstName,
        lastName,
        email,
        phone,
        message,
        businessType,
        numberOfEmployees,
        currentStep,
        language: typeof payload?.language === "string" ? payload.language : undefined,
      }),
    });

    const data = await resp.json();
    const elapsedMs = Date.now() - t0;

    if (!resp.ok) {
      console.error("[hire-accountant] backend error", { status: resp.status, data, elapsedMs });
      return NextResponse.json({ error: data?.error || "Failed to submit request" }, { status: resp.status });
    }

    console.log("[hire-accountant] success", { messageId: data?.messageId, elapsedMs });
    return NextResponse.json({ ok: true, messageId: data?.messageId });
  } catch (err: any) {
    console.error("[hire-accountant] error", err);
    return NextResponse.json({ error: "Failed to submit request" }, { status: 500 });
  }
}
