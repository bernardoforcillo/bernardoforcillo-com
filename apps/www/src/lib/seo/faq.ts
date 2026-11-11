export type FaqItem = { question: string; answer: string };

const FAQ_HEADING = /^##\s+(?:Frequently asked questions|FAQ)\s*$/im;

/** Markdown inline syntax an answer engine should read as plain text. */
const toPlainText = (markdown: string) =>
  markdown
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

/**
 * The question-and-answer pairs under a post's `## Frequently asked questions`
 * (or `## FAQ`) heading, for schema.org `FAQPage`. Each `### heading` is a
 * question and the text below it, up to the next heading, is its answer. The
 * section ends at the next h2; a post without one has no FAQ.
 */
export const extractFaq = (markdown: string): FaqItem[] => {
  const start = markdown.search(FAQ_HEADING);
  if (start === -1) {
    return [];
  }
  const section = markdown.slice(start).replace(FAQ_HEADING, '');
  const end = section.search(/^##\s/m);
  const body = end === -1 ? section : section.slice(0, end);

  return body
    .split(/^###\s+/m)
    .slice(1)
    .map((chunk) => {
      const [question = '', ...answer] = chunk.split('\n');
      return {
        question: toPlainText(question),
        answer: toPlainText(answer.join('\n')),
      };
    })
    .filter((item) => item.question && item.answer);
};
