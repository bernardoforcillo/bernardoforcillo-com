// Average adult silent reading speed for non-fiction, in words per minute.
const WORDS_PER_MINUTE = 230;

/** Words a reader actually reads in a markdown body. */
export const wordCount = (markdown: string) =>
  markdown
    // Fenced code is skimmed, not read word by word.
    .replace(/```[\s\S]*?```/g, ' ')
    .split(/\s+/)
    .filter((word) => /[\p{L}\p{N}]/u.test(word)).length;

/** Minutes to read a markdown body, rounded up, never below one. */
export const readingMinutes = (markdown: string) =>
  Math.max(1, Math.ceil(wordCount(markdown) / WORDS_PER_MINUTE));
