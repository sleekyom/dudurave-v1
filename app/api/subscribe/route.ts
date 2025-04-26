import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

async function verifyRecaptcha(token: string) {
  const secretKey = process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY;

  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `secret=${secretKey}&response=${token}`,
  });

  const data = await response.json();
  return data.success;
}

export async function POST(request: NextRequest) {
  try {
    // parse JSON body safely
    let body: any;
    try {
      body = await request.json();
    } catch (_e) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }
    const { email, recaptchaToken } = body;

    // Verify reCAPTCHA token
    if (!recaptchaToken) {
      return NextResponse.json({ error: "reCAPTCHA token is required" }, { status: 400 });
    }

    const isHuman = await verifyRecaptcha(recaptchaToken);
    if (!isHuman) {
      return NextResponse.json(
        { error: "reCAPTCHA verification failed" },
        { status: 400 }
      );
    }
    const apiKey = process.env.NEXT_PUBLIC_BEEHIIV_API_KEY;
    const newsletterId = process.env.NEXT_PUBLIC_BEEHIIV_NEWSLETTER_ID;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    if (!apiKey || !newsletterId) {
      console.error("Beehiiv API key or newsletter ID missing");
      return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
    }
    const response = await fetch(`https://api.beehiiv.com/v2/publications/${newsletterId}/subscriptions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({ newsletter_id: newsletterId, email }),
    });

    // safely parse JSON, ignore if empty or invalid
    let data: any = null;
    try {
      data = await response.json();
    } catch (_err) {
      // no JSON body
    }
    if (!response.ok) {
      console.error("Beehiiv subscription error:", data);
      return NextResponse.json({ error: data?.detail || "Subscription failed" }, { status: response.status });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
