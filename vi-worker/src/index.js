// G.A.B.E. VI worker: a thin, locked-down proxy between the portfolio chat and the Claude API.
// The system prompt is built from the same src/data files the site renders, so answers stay in sync.
import Anthropic from '@anthropic-ai/sdk';
import { SYSTEM_PROMPT } from './generated/system-prompt.js';


const MAX_MESSAGES = 12;
const MAX_CHARS_PER_MESSAGE = 1000;
const RATE_LIMIT = { windowMs: 60_000, max: 15 };

// Best-effort per-isolate rate limit. Good enough to stop casual abuse of a portfolio bot.
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_LIMIT.max;
}

function corsHeaders(origin, env) {
  const allowed = (env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim());
  return {
    'Access-Control-Allow-Origin': allowed.includes(origin) ? origin : allowed[0] || '',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin'
  };
}

function json(body, status, headers) {
  return new Response(JSON.stringify(body), { status, headers: { ...headers, 'Content-Type': 'application/json' } });
}

// Keep only well-formed user/assistant text turns, starting with a user turn.
function sanitize(messages) {
  if (!Array.isArray(messages)) return null;
  const clean = messages
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim())
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS_PER_MESSAGE) }));
  while (clean.length && clean[0].role !== 'user') clean.shift();
  if (!clean.length || clean[clean.length - 1].role !== 'user') return null;
  return clean;
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const cors = corsHeaders(origin, env);
    const allowed = (env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim());

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405, cors);
    if (!allowed.includes(origin)) return json({ error: 'Origin not allowed' }, 403, cors);

    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (rateLimited(ip)) return json({ error: 'Too many requests. Try again in a minute.' }, 429, cors);

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'Invalid JSON' }, 400, cors);
    }
    const messages = sanitize(body.messages);
    if (!messages) return json({ error: 'Expected messages ending with a user turn' }, 400, cors);

    const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });
    try {
      const response = await client.beta.messages.create({
        model: env.MODEL || 'claude-opus-5-5',
        max_tokens: 1024, // VI replies are deliberately short
        output_config: { effort: env.EFFORT || 'low' },
        betas: ['server-side-fallback-2026-07-01'],
        fallbacks: 'default',
        system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
        messages
      });

      if (response.stop_reason === 'refusal') {
        return json({ text: "That's outside what I can help with. Ask me about Gabriel's work, skills, or how to reach him." }, 200, cors);
      }
      const text = response.content
        .filter((b) => b.type === 'text')
        .map((b) => b.text)
        .join('')
        .replace(/\u2014/g, ', ')
        .trim();
      return json({ text }, 200, cors);
    } catch (err) {
      if (err instanceof Anthropic.RateLimitError) return json({ error: 'VI is busy. Try again shortly.' }, 503, cors);
      if (err instanceof Anthropic.AuthenticationError) return json({ error: 'VI is not configured.' }, 500, cors);
      if (err instanceof Anthropic.APIError) return json({ error: `Upstream error ${err.status}` }, 502, cors);
      return json({ error: 'VI failed to respond.' }, 500, cors);
    }
  }
};
