// Talks to the Claude-backed vi-worker when REACT_APP_VI_ENDPOINT is set at build time.
// Falls back to the offline engine if the endpoint is missing, slow, or down.
import { answerLocally } from './localEngine.js';

const ENDPOINT = process.env.REACT_APP_VI_ENDPOINT || '';
const TIMEOUT_MS = 20000;
const MAX_HISTORY = 12;

export const viMode = ENDPOINT ? 'online' : 'offline';

// history: [{ role: 'user' | 'assistant', content: string }], last item is the new user question.
export async function askVI(history) {
  const question = history[history.length - 1].content;
  if (!ENDPOINT) return { text: answerLocally(question), mode: 'offline' };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: history.slice(-MAX_HISTORY) }),
      signal: controller.signal
    });
    if (!res.ok) throw new Error(`VI endpoint returned ${res.status}`);
    const data = await res.json();
    if (!data.text) throw new Error('Empty VI response');
    return { text: data.text, mode: 'online' };
  } catch (err) {
    return { text: answerLocally(question), mode: 'offline' };
  } finally {
    clearTimeout(timer);
  }
}
