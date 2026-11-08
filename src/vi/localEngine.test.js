import { answerLocally } from './localEngine';
import { buildSystemPrompt } from './knowledge';

test('answers current role from profile, in third person, without repeating the intro', () => {
  const a = answerLocally('What does Gabriel do right now?');
  expect(a).toMatch(/^Right now Gabriel holds two roles/);
  expect(a).not.toMatch(/\bI'm\b|\bI build\b/);
});

test('answers who-is questions with the third-person intro', () => {
  expect(answerLocally('Who is Gabriel?')).toMatch(/^Gabriel Colon builds/);
});

test('answers a specific project by name', () => {
  expect(answerLocally('What is Valine?')).toMatch(/^Valine/);
});

test('answers contact questions with email', () => {
  expect(answerLocally('How can I contact him?')).toMatch(/ghawk075@gmail\.com/);
});

test('answers data migration questions', () => {
  expect(answerLocally('Tell me about his data migration work')).toMatch(/reconcil/i);
});

test('admits when it has nothing on file', () => {
  expect(answerLocally('What is the capital of Peru?')).toMatch(/don't have that on file/);
});

test('greets', () => {
  expect(answerLocally('hey')).toMatch(/G\.A\.B\.E\./);
});

test('system prompt carries the knowledge base and contains no em dashes', () => {
  const prompt = buildSystemPrompt();
  expect(prompt).toMatch(/Knowledge base:/);
  expect(prompt).toMatch(/Joint Theatrical Ventures/);
  expect(prompt).not.toMatch(/—/);
});
