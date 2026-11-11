import { describe, expect, it } from 'vitest';
import { extractCitations } from './citations';

describe('extractCitations', () => {
  it('returns nothing for a post without a References section', () => {
    expect(extractCitations('## Intro\n\nSee [a](https://a.example).')).toEqual(
      [],
    );
  });

  it('reads only the links under References, in order', () => {
    const markdown = [
      '## Intro',
      'Body [skip](https://skip.example).',
      '## References',
      '- Org, [_A Title_](https://a.example/x). Note.',
      '- Other, [B\n  title](https://b.example), 2026.',
      '- Unlinked, _C_.',
      '## After',
      '[also skip](https://after.example)',
    ].join('\n');
    expect(extractCitations(markdown)).toEqual([
      { name: 'A Title', url: 'https://a.example/x' },
      { name: 'B title', url: 'https://b.example' },
    ]);
  });
});
