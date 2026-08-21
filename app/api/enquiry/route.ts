import { NextResponse } from "next/server";

/* ============================================================
   ENQUIRY ENDPOINT

   This does NOT fake a submission. It forwards the enquiry to
   whatever you configure, and returns an honest error if nothing
   is configured yet.

   To go live, set ONE of these in .env.local (see .env.example):

     ENQUIRY_WEBHOOK_URL=...   → POSTs the JSON payload anywhere
                                 (Zapier, Make, n8n, your own API,
                                 a Google Apps Script, Slack, etc.)
     RESEND_API_KEY=...        → sends the enquiry as an email
     ENQUIRY_TO_EMAIL=...        via Resend (resend.com)
     ENQUIRY_FROM_EMAIL=...
   ============================================================ */

export const runtime = "nodejs";

const FIELDS = [
  "name", "company", "email", "phone", "country",
  "product", "quantity", "destination", "incoterm", "timeline", "requirement",
] as const;

function reference() {
  const d = new Date();
  const stamp = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  return `MC-${stamp}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

export async function POST(request: Request) {
  let payload: Record<string, string>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  if (payload.company_website) {
    // honeypot tripped — accept silently so the bot learns nothing
    return NextResponse.json({ ok: true, reference: reference() });
  }

  const missing = ["name", "company", "email", "product", "requirement"].filter((f) => !payload[f]?.trim());
  if (missing.length) {
    return NextResponse.json({ error: `Missing required fields: ${missing.join(", ")}.` }, { status: 422 });
  }

  const ref = reference();
  const lines = FIELDS.map((f) => `${f}: ${payload[f] ?? "—"}`).join("\n");
  const body = `New trade enquiry — ${ref}\n\n${lines}\n\nReceived: ${new Date().toISOString()}`;

  const { ENQUIRY_WEBHOOK_URL, RESEND_API_KEY, ENQUIRY_TO_EMAIL, ENQUIRY_FROM_EMAIL } = process.env;

  try {
    if (ENQUIRY_WEBHOOK_URL) {
      const res = await fetch(ENQUIRY_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference: ref, receivedAt: new Date().toISOString(), ...payload }),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
      return NextResponse.json({ ok: true, reference: ref });
    }

    if (RESEND_API_KEY && ENQUIRY_TO_EMAIL && ENQUIRY_FROM_EMAIL) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: ENQUIRY_FROM_EMAIL,
          to: [ENQUIRY_TO_EMAIL],
          reply_to: payload.email,
          subject: `Trade enquiry ${ref} — ${payload.company}`,
          text: body,
        }),
      });
      if (!res.ok) throw new Error(`Email provider responded ${res.status}`);
      return NextResponse.json({ ok: true, reference: ref });
    }
  } catch (err) {
    console.error("[enquiry] delivery failed", err);
    return NextResponse.json(
      { error: "We could not deliver your enquiry just now." },
      { status: 502 }
    );
  }

  // Nothing configured yet — say so rather than pretending it sent.
  console.warn("[enquiry] no delivery method configured. Payload:\n" + body);
  return NextResponse.json(
    { error: "The enquiry inbox is not connected yet." },
    { status: 503 }
  );
}
