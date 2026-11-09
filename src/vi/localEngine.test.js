import { answerLocally } from './localEngine';
import { buildSystemPrompt } from './knowledge';
import { projects } from '../data/projects';

test('answers current role from profile, in third person, without repeating the intro', () => {
  const a = answerLocally('What does Gabriel do right now?');
  expect(a).toMatch(/^Right now Gabriel is an AI Enablement Specialist at Axos Bank/);
  expect(a).not.toMatch(/\bI'm\b|\bI build\b/);
});

test('answers who-is questions with the third-person intro', () => {
  expect(answerLocally('Who is Gabriel?')).toMatch(/^Gabriel Colon builds/);
});

test('answers a specific project by name, with role and result', () => {
  const a = answerLocally('What is Joint Theatrical Ventures?');
  expect(a).toMatch(/^Joint Theatrical Ventures/);
  expect(a).toMatch(/Gabriel's role:/);
  expect(a).toMatch(/Result:/);
});

test('every portfolio project is answerable by name', () => {
  projects.forEach((pr) => {
    expect(answerLocally(`Tell me about ${pr.name}`).startsWith(pr.name)).toBe(true);
  });
});

test('PCI automation is answerable and stays generic', () => {
  const a = answerLocally('Tell me about his PCI automation');
  expect(a).toMatch(/PowerShell/);
  expect(a).toMatch(/reconcil/i);
});

test('AI questions mention AI projects from the portfolio', () => {
  expect(answerLocally('What AI automation has he built?')).toMatch(/Amadeus/);
});

test('answers never contain em dashes or bullet separators', () => {
  ['Who is Gabriel?', 'What projects has he built?', 'Tell me about Tower of Greed', 'What has he written?'].forEach((q) => {
    expect(answerLocally(q)).not.toMatch(/[\u2014\u2022\u2192]/);
  });
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
  expect(prompt).not.toMatch(/\u2014/);
});

test('no doubled periods when data already ends with one', () => {
  projects.forEach((pr) => {
    expect(answerLocally(`Tell me about ${pr.name}`)).not.toMatch(/\.\./);
  });
});

test('Axos questions get the current role, not PCI', () => {
  const a = answerLocally('What does he do at Axos?');
  expect(a).toMatch(/AI Enablement Specialist at Axos Bank/);
  expect(a).not.toMatch(/holds two roles/);
});

test('hiring answers say he just started at Axos', () => {
  expect(answerLocally('Is he open to new roles?')).toMatch(/just started/);
});
