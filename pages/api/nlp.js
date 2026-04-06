// ═══════════════════════════════════════════════════════════
// /api/nlp.js  —  LLM-powered job search intent extraction
// Mirrors Nova AI Suite's LLM Router v4.1 pattern:
//   Simple queries (<5 words) → free tier
//   Complex queries           → free tier (paid fallback if key present)
//   All providers fail        → 503 (frontend falls back to parseJobQuery)
// ═══════════════════════════════════════════════════════════

const CATEGORIES = [
  "Technology", "Financial Services", "Healthcare", "Marketing & Advertising",
  "Education", "Consulting", "Manufacturing", "Transportation & Logistics",
  "Construction & Infrastructure", "Government & Public Sector",
  "AI", "Hospitality", "Energy & Utilities", "Media & Entertainment",
];

const SYSTEM_PROMPT = `You are a job search intent parser. Extract structured intent from the user's job search query and return ONLY valid JSON — no markdown, no explanation.

Return this exact schema (use null for missing fields):
{
  "keyword": "normalized job title or null — use standard titles (e.g. 'software engineer' not 'coder')",
  "location": "city or city+state or null",
  "category": "one of the 14 industry categories or null",
  "employmentType": "Remote|Hybrid|On-site|Part-time|Contract|Internship or null",
  "experience": "Entry level|1-3 Years|3-5 Years|5-7 Years|7-10 Years|10+ Years or null",
  "salaryMin": integer or null,
  "salaryMax": integer or null,
  "categoryExplicit": true if user named an industry (not a role), false otherwise
}

Industry categories: ${CATEGORIES.join(", ")}

Rules:
- "marketing jobs" / "logistics jobs" → keyword:null, category set, categoryExplicit:true
- "marketing manager" → keyword:"marketing manager", category:null, categoryExplicit:false
- salary: convert "120k" → 120000, "80k-100k" → min:80000 max:100000
- experience: "senior" → "7-10 Years", "junior"/"entry" → "Entry level", "mid" → "3-5 Years"
- Remote/WFH/work from home → employmentType:"Remote"
- "hybrid" → employmentType:"Hybrid"
- location: "NYC" → "New York", "LA" → "Los Angeles", "SF" → "San Francisco"
- If query is a greeting or noise (hi, hello, thanks) → return all nulls`;

// ── Provider definitions ────────────────────────────────────
// Nova pattern: free tier first, paid as fallback
// All free providers are rate-limited but cost $0
const PROVIDERS = [
  // ── Free tier (try in order, circuit-break on failure) ──
  {
    name: "groq",
    envKey: "GROQ_API_KEY",
    url: "https://api.groq.com/openai/v1/chat/completions",
    model: "llama-3.3-70b-versatile",
    tier: "free",
  },
  {
    name: "cerebras",
    envKey: "CEREBRAS_API_KEY",
    url: "https://api.cerebras.ai/v1/chat/completions",
    model: "llama-3.3-70b",
    tier: "free",
  },
  {
    name: "mistral",
    envKey: "MISTRAL_API_KEY",
    url: "https://api.mistral.ai/v1/chat/completions",
    model: "mistral-small-latest",
    tier: "free",
  },
  {
    name: "together",
    envKey: "TOGETHER_API_KEY",
    url: "https://api.together.xyz/v1/chat/completions",
    model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
    tier: "free",
  },
  {
    name: "sambanova",
    envKey: "SAMBANOVA_API_KEY",
    url: "https://api.sambanova.ai/v1/chat/completions",
    model: "Meta-Llama-3.3-70B-Instruct",
    tier: "free",
  },
  {
    name: "huggingface",
    envKey: "HF_API_KEY",
    url: "https://router.huggingface.co/novita/v3/openai/chat/completions",
    model: "meta-llama/llama-3.3-70b-instruct",
    tier: "free",
  },
  {
    name: "openrouter_free",
    envKey: "OPENROUTER_API_KEY",
    url: "https://openrouter.ai/api/v1/chat/completions",
    model: "meta-llama/llama-3.3-70b-instruct:free",
    tier: "free",
    headers: { "HTTP-Referer": "https://jobgpt2-nextjs.vercel.app", "X-Title": "Joblet AI" },
  },
  {
    name: "gemini",
    envKey: "GEMINI_API_KEY",
    // key goes in URL as query param — Gemini doesn't use Authorization header
    url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent",
    model: "gemini-2.0-flash-lite",
    tier: "free",
    isGemini: true,
  },
  // ── Paid tier (quality fallback, only if key present) ──
  {
    name: "anthropic",
    envKey: "ANTHROPIC_API_KEY",
    url: "https://api.anthropic.com/v1/messages",
    model: "claude-haiku-4-5-20251001",
    tier: "paid",
    isAnthropic: true,  // different request/response format
  },
  {
    name: "openai",
    envKey: "OPENAI_API_KEY",
    url: "https://api.openai.com/v1/chat/completions",
    model: "gpt-4o-mini",
    tier: "paid",
  },
];

// ── Complexity classifier (mirrors Nova's routing logic) ────
function isComplex(query) {
  const words = query.trim().split(/\s+/).length;
  return words >= 5;
}

// ── Call a single provider ──────────────────────────────────
async function callProvider(provider, query, timeoutMs = 8000) {
  const key = process.env[provider.envKey];
  if (!key) return null;  // skip if no key configured

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    let res;
    if (provider.isGemini) {
      // Google Gemini API — key in URL, different request/response schema
      res = await fetch(`${provider.url}?key=${key}`, {
        method: "POST",
        signal: controller.signal,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: [{ role: "user", parts: [{ text: query }] }],
          generationConfig: { maxOutputTokens: 300, temperature: 0 },
        }),
      });
    } else if (provider.isAnthropic) {
      // Anthropic Messages API format
      res = await fetch(provider.url, {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          "x-api-key": key,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: provider.model,
          max_tokens: 300,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: query }],
        }),
      });
    } else {
      // OpenAI-compatible format (all other providers)
      res = await fetch(provider.url, {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${key}`,
          ...(provider.headers || {}),
        },
        body: JSON.stringify({
          model: provider.model,
          max_tokens: 300,
          temperature: 0,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: query },
          ],
        }),
      });
    }

    clearTimeout(timer);
    if (!res.ok) return null;

    const data = await res.json();
    const text = provider.isGemini
      ? data?.candidates?.[0]?.content?.parts?.[0]?.text
      : provider.isAnthropic
        ? data?.content?.[0]?.text
        : data?.choices?.[0]?.message?.content;

    if (!text) return null;

    // Strip markdown fences if present
    const clean = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const parsed = JSON.parse(clean);
    return { ...parsed, _provider: provider.name };
  } catch {
    clearTimeout(timer);
    return null;
  }
}

// ── Main handler ────────────────────────────────────────────
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });

  const { query } = req.body || {};
  if (!query || !query.trim()) {
    return res.status(400).json({ error: "query required" });
  }

  const complex = isComplex(query);

  // Nova routing: free tier first, paid as last resort
  // For job filter extraction, free models are sufficient even for complex queries
  const chain = PROVIDERS.filter(p => {
    if (p.tier === "paid") return complex; // only try paid if complex AND free all failed
    return true;
  });

  for (const provider of chain) {
    const result = await callProvider(provider, query);
    if (result) {
      // Validate basic schema
      if (typeof result === "object" && !Array.isArray(result)) {
        console.log(`[nlp] provider=${result._provider} query="${query.slice(0, 50)}"`);
        return res.status(200).json(result);
      }
    }
  }

  // All providers failed — return 503 so frontend falls back to parseJobQuery
  return res.status(503).json({ error: "all providers unavailable" });
}
