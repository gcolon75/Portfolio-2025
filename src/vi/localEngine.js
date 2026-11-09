// Offline answer engine. Runs fully in the browser, so the VI works on GitHub Pages with no backend.
// Scores each knowledge chunk by keyword overlap and replies with the best matches.
import { buildChunks, VI_NAME } from './knowledge.js';
import { profile } from '../data/profile.js';

const STOP = new Set(['the', 'a', 'an', 'is', 'are', 'was', 'what', 'does', 'do', 'did', 'his', 'he', 'him', 'of', 'to', 'in', 'on', 'for', 'and', 'or', 'me', 'can', 'i', 'it', 'any', 'has', 'have', 'with']);

const chunks = buildChunks();

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9+#\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t && !STOP.has(t));
}

function score(chunk, tokens, raw) {
  let s = 0;
  for (const kw of chunk.keywords) {
    if (kw.includes(' ') ? raw.includes(kw) : tokens.includes(kw)) s += kw.length > 4 ? 2 : 1;
  }
  // Project names are strong signals.
  if (chunk.id.startsWith('project-') && raw.includes(chunk.title.toLowerCase())) s += 5;
  return s;
}

export function answerLocally(question) {
  const raw = question.toLowerCase().trim();
  const tokens = tokenize(raw);

  if (/^(hi|hey|hello|yo|sup|greetings)\b/.test(raw) && tokens.length <= 3) {
    return `Hello. I'm ${VI_NAME}, ${profile.name.split(' ')[0]}'s virtual intelligence. Ask me about his work, skills, projects, or how to hire him.`;
  }
  if (/\b(thanks|thank you|thx)\b/.test(raw)) {
    return `Logged. If you want to talk to the real Gabriel, he's at ${profile.email}.`;
  }

  const ranked = chunks
    .map((c) => ({ c, s: score(c, tokens, raw) }))
    .filter((r) => r.s > 0)
    .sort((a, b) => b.s - a.s);

  if (!ranked.length) {
    return `I don't have that on file. I can cover Gabriel's current work, AI automation, data migration, projects, skills, education, or contact info. For anything else, email ${profile.email}.`;
  }

  const top = ranked[0];
  const second = ranked[1];
  const parts = [top.c.text];
  // Add a second chunk only if it is nearly as relevant and adds different info.
  if (second && second.s >= top.s - 1 && !second.c.id.startsWith('project-') && second.c.id !== 'intro') {
    parts.push(second.c.text);
  }
  return parts.join(' ');
}
