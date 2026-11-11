import { describe, expect, it } from 'vitest';
import { extractFaq } from './faq';

describe('extractFaq', () => {
  it('returns nothing for a post without an FAQ section', () => {
    expect(extractFaq('## Intro\n\n### Not a question\n\nText.')).toEqual([]);
  });

  it('pairs each h3 with the plain text below it, inside the section only', () => {
    const markdown = [
      '## Intro',
      '### Outside',
      'Ignored.',
      '## Frequently asked questions',
      '### When does it apply?',
      '',
      'From **11 September 2026**, see [the text](https://a.example).',
      'Second line.',
      '### Empty?',
      '',
      '## References',
      '### Also outside',
      'Ignored.',
    ].join('\n');
    expect(extractFaq(markdown)).toEqual([
      {
        question: 'When does it apply?',
        answer: 'From 11 September 2026, see the text. Second line.',
      },
    ]);
  });
});
