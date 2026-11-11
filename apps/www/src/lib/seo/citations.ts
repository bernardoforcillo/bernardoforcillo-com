export type Citation = { name: string; url: string };

const REFERENCES_HEADING = /^##\s+References\s*$/m;
const MARKDOWN_LINK = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;

/**
 * The external links listed under a post's `## References` heading, in order,
 * for schema.org `citation`. The section ends at the next h2 or at the end of
 * the body; a post without one cites nothing.
 */
export const extractCitations = (markdown: string): Citation[] => {
  const start = markdown.search(REFERENCES_HEADING);
  if (start === -1) {
    return [];
  }
  const section = markdown.slice(start).replace(REFERENCES_HEADING, '');
  const end = section.search(/^##\s/m);
  const body = end === -1 ? section : section.slice(0, end);

  return Array.from(body.matchAll(MARKDOWN_LINK), ([, text, url]) => ({
    // Titles are set in italics in the list; the markers are not part of them.
    name: text.replace(/[_*]/g, '').replace(/\s+/g, ' ').trim(),
    url,
  }));
};
