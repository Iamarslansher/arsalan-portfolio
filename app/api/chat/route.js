import { NextResponse } from "next/server";
import {
  portfolioData,
  SYSTEM_INSTRUCTION,
} from "@/src/data/portfolioData";

export const runtime = "nodejs";

const requestLimit = 8;
const windowMs = 60_000;
const requestsByAddress = new Map();
const maxRequestBytes = 6_000;

function isRateLimited(address) {
  const now = Date.now();
  const timestamps = (requestsByAddress.get(address) || []).filter(
    (timestamp) => now - timestamp < windowMs,
  );

  if (timestamps.length >= requestLimit) {
    requestsByAddress.set(address, timestamps);
    return true;
  }
  timestamps.push(now);
  requestsByAddress.set(address, timestamps);

  if (requestsByAddress.size > 5_000) {
    for (const [key, recent] of requestsByAddress) {
      if (!recent.some((timestamp) => now - timestamp < windowMs)) {
        requestsByAddress.delete(key);
      }
    }
    if (requestsByAddress.size > 5_000) {
      requestsByAddress.delete(requestsByAddress.keys().next().value);
    }
  }
  return false;
}

function selectRelevantPortfolioFacts(query) {
  const terms = new Set(
    query
      .toLowerCase()
      .split(/[^a-z0-9+#.]+/)
      .filter((term) => term.length > 2),
  );
  const projects = portfolioData.projects
    .map((project) => {
      const searchable = [
        project.title,
        project.category,
        project.desc,
        ...project.tech,
      ]
        .join(" ")
        .toLowerCase();
      const score = [...terms].reduce(
        (total, term) => total + (searchable.includes(term) ? 1 : 0),
        0,
      );
      return { project, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map(({ project }) => project);

  return {
    ...portfolioData,
    projects: projects.length ? projects : portfolioData.projects.slice(0, 6),
  };
}

function keepVerifiedLinks(reply) {
  const verifiedLinks = new Set(
    [
      ...portfolioData.projects.flatMap((project) => [project.code, project.live]),
      ...Object.values(portfolioData.contact),
      `mailto:${portfolioData.contact.email}`,
      "https://arsalansher.dev",
    ]
      .filter(Boolean)
      .map((link) => link.replace(/\/+$/, "").toLowerCase()),
  );

  return reply.replace(
    /(?:https?:\/\/|mailto:)[^\s<>"')\]]+/gi,
    (candidate) => {
      const punctuation = candidate.match(/[.,!?;:]*$/)?.[0] || "";
      const link = candidate.slice(0, candidate.length - punctuation.length);
      return verifiedLinks.has(link.replace(/\/+$/, "").toLowerCase())
        ? candidate
        : `link not listed${punctuation}`;
    },
  );
}

export async function POST(request) {
  const address = (
    request.headers.get("x-vercel-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  ).slice(0, 100);

  if (isRateLimited(address)) {
    return NextResponse.json(
      { error: "Too many messages. Please wait a minute and try again." },
      { status: 429 },
    );
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > maxRequestBytes) {
    return NextResponse.json(
      { error: "Your message is too long. Please shorten it and try again." },
      { status: 413 },
    );
  }

  let rawBody;
  try {
    const reader = request.body?.getReader();
    if (!reader) {
      return NextResponse.json(
        { error: "The request body is required." },
        { status: 400 },
      );
    }

    const chunks = [];
    let totalBytes = 0;
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        totalBytes += value.byteLength;
        if (totalBytes > maxRequestBytes) {
          await reader.cancel();
          return NextResponse.json(
            {
              error: "Your message is too long. Please shorten it and try again.",
            },
            { status: 413 },
          );
        }
        chunks.push(value);
      }
    } finally {
      reader.releaseLock();
    }

    const bytes = new Uint8Array(totalBytes);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }
    rawBody = new TextDecoder().decode(bytes);
  } catch {
    return NextResponse.json(
      { error: "Unable to read the request body." },
      { status: 400 },
    );
  }

  let body;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json(
      { error: "The request must contain valid JSON." },
      { status: 400 },
    );
  }

  const messages = body?.messages;
  if (
    !Array.isArray(messages) ||
    messages.length < 1 ||
    messages.length > 10 ||
    messages.some(
      (message) =>
        !message ||
        !["user", "assistant"].includes(message.role) ||
        typeof message.content !== "string" ||
        message.content.length < 1 ||
        message.content.length > 1_500,
    ) ||
    messages[messages.length - 1]?.role !== "user"
  ) {
    return NextResponse.json(
      { error: "Please send a valid message of up to 1,500 characters." },
      { status: 400 },
    );
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.LLM_API_KEY;
  const model = process.env.GEMINI_MODEL || "gemini-3.8-flash";
  if (!apiKey || !model) {
    return NextResponse.json(
      {
        error:
          "The AI assistant is not configured yet. Add a Google AI Studio key to the server-side GEMINI_API_KEY setting, or contact Arsalan directly and browse the projects below.",
        fallback: true,
      },
      { status: 503 },
    );
  }

  const baseUrl = (
    process.env.GEMINI_BASE_URL ||
    "https://generativelanguage.googleapis.com/v1beta/openai"
  ).replace(/\/+$/, "");
  const facts = selectRelevantPortfolioFacts(
    messages[messages.length - 1].content,
  );
  const providerMessages = [
    {
      role: "system",
      content: `${SYSTEM_INSTRUCTION}

Relevant project matches for the visitor's latest question:
${JSON.stringify(facts.projects)}

Use plain URLs rather than Markdown links.`,
    },
    ...messages,
  ];
  const requestCompletion = (requestedModel) =>
    fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: requestedModel,
        temperature: 0.2,
        max_tokens: 450,
        messages: providerMessages,
      }),
      signal: AbortSignal.timeout(20_000),
      cache: "no-store",
    });

  try {
    let upstream = await requestCompletion(model);
    let usingFallbackModel = false;
    if (upstream.status === 503 && model !== "gemini-3.5-flash-lite") {
      console.warn(
        `${model} is overloaded; retrying the request with Gemini 3.5 Flash-Lite.`,
      );
      upstream = await requestCompletion("gemini-3.5-flash-lite");
      usingFallbackModel = true;
    }

    if (!upstream.ok) {
      const providerBody = await upstream.text();
      let providerError;
      try {
        providerError = JSON.parse(providerBody);
      } catch {
        providerError = null;
      }
      const providerMessage =
        typeof providerError?.error?.message === "string"
          ? providerError.error.message.slice(0, 500)
          : providerBody.slice(0, 500) || "No error detail returned.";
      console.error("Gemini provider returned an error.", {
        model: usingFallbackModel ? "gemini-3.5-flash-lite" : model,
        httpStatus: upstream.status,
        providerStatus: providerError?.error?.status,
        message: providerMessage,
      });

      const errorsByStatus = {
        400: "Gemini rejected the request. Check the API key and model configuration.",
        401: "Gemini rejected the API key. Check that GEMINI_API_KEY (or LLM_API_KEY) is a valid Google AI Studio key.",
        403: "Gemini denied access. Check the API key's project access, model availability, and free-tier eligibility.",
        404: "Gemini could not find the configured model or API endpoint. Check GEMINI_MODEL and GEMINI_BASE_URL.",
        429: "Gemini's free-tier request limit has been reached. Wait and try again later.",
        503: "Gemini is experiencing high demand right now. Please retry in a little while.",
      };
      const error =
        errorsByStatus[upstream.status] ||
        "The Gemini service is temporarily unavailable. Please try again shortly.";
      return NextResponse.json(
        {
          error,
          fallback: true,
          ...(process.env.NODE_ENV === "development"
            ? {
                diagnostic: {
                  providerStatus: upstream.status,
                  message: providerMessage,
                },
              }
            : {}),
        },
        { status: 502 },
      );
    }

    const result = await upstream.json();
    const reply = result?.choices?.[0]?.message?.content;
    if (typeof reply !== "string" || !reply.trim()) {
      console.error("LLM provider returned no usable completion.");
      return NextResponse.json(
        {
          error: "The AI assistant returned an empty reply. Please try again.",
          fallback: true,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ reply: keepVerifiedLinks(reply.trim()) });
  } catch (error) {
    console.error("LLM provider request failed.", error);
    return NextResponse.json(
      {
        error:
          "The AI assistant is temporarily unavailable. You can still browse the projects or contact Arsalan directly.",
        fallback: true,
      },
      { status: 502 },
    );
  }
}
