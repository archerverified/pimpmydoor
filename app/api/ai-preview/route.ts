import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// Simple in-memory cache
const cache = new Map<string, { b64: string; prompt: string; expires: number }>();
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

// Simple rate limiting per IP
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 10; // 10 requests per minute

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  return forwarded?.split(",")[0] || realIP || "unknown";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimit.get(ip);

  if (!limit || now > limit.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (limit.count >= RATE_LIMIT_MAX) {
    return false;
  }

  limit.count++;
  return true;
}

function hashPayload(payload: object): string {
  const str = JSON.stringify(payload);
  return crypto.createHash("sha256").update(str).digest("hex");
}

function buildPrompt(selections: {
  widthFeet: number;
  widthInches: number;
  heightFeet: number;
  heightInches: number;
  designCollection: string;
  designStyle: string;
  designColor: string;
  trackSpringType?: string;
  trackLiftType?: string;
  trackWindLoad?: string;
  extrasWindows?: string;
  extrasInsulation?: string;
  extrasHardware?: string;
}): string {
  const size = `${selections.widthFeet}'${selections.widthInches}" x ${selections.heightFeet}'${selections.heightInches}"`;
  
  let prompt = `A clean, professional front-elevation illustration of a ${size} garage door. `;
  prompt += `Style: ${selections.designCollection} collection, ${selections.designStyle} design. `;
  prompt += `Color: ${selections.designColor}. `;
  
  if (selections.extrasWindows && selections.extrasWindows !== "No Windows") {
    prompt += `Windows: ${selections.extrasWindows}. `;
  }
  
  if (selections.extrasHardware && selections.extrasHardware !== "None") {
    prompt += `Hardware: ${selections.extrasHardware}. `;
  }
  
  prompt += `Clean vector illustration style, centered composition, neutral light gray background, subtle shadow beneath door, no text, no logos, no watermarks, professional architectural rendering.`;
  
  return prompt;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = getClientIP(request);
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Rate limit exceeded" },
        { status: 429 }
      );
    }

    // Parse body
    const body = await request.json();
    const cacheKey = hashPayload(body);

    // Check cache
    const cached = cache.get(cacheKey);
    if (cached && Date.now() < cached.expires) {
      return NextResponse.json({
        b64: cached.b64,
        prompt: cached.prompt,
      });
    }

    // Build prompt
    const prompt = buildPrompt(body);

    // Call OpenAI Images API
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-image-1-mini",
        prompt: prompt,
        size: "1536x1024",
        output_format: "png",
        n: 1,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("OpenAI API error:", error);
      return NextResponse.json(
        { error: "Failed to generate image" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const b64 = data.data[0]?.b64_json;

    if (!b64) {
      return NextResponse.json(
        { error: "No image data returned" },
        { status: 500 }
      );
    }

    // Cache result
    cache.set(cacheKey, {
      b64,
      prompt,
      expires: Date.now() + CACHE_TTL,
    });

    return NextResponse.json({
      b64,
      prompt,
    });
  } catch (error) {
    console.error("AI preview error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
