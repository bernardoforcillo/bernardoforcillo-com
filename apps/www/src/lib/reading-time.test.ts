import { describe, expect, it } from 'vitest';
import { readingMinutes } from './reading-time';

describe('readingMinutes', () => {
  it('never reports less than a minute', () => {
    expect(readingMinutes('')).toBe(1);
    expect(readingMinutes('A short note.')).toBe(1);
  });

  it('rounds up past each 230 words', () => {
    expect(readingMinutes('word '.repeat(230))).toBe(1);
    expect(readingMinutes('word '.repeat(231))).toBe(2);
  });

  it('ignores fenced code and bare punctuation', () => {
    const code = `\`\`\`go\n${'x '.repeat(1000)}\n\`\`\``;
    expect(readingMinutes(`${code} - — *`)).toBe(1);
  });
});
