export interface SlideNode {
  rawContent: string;
  cleanContent: string;
  backgroundSrc: string | null;
  splitSrc: string | null;
  splitReverseSrc: string | null;
}

/**
 * Splits a raw markdown string into individual slide chunks based on the horizontal rule separator (---).
 * It parses Marp-style image directives out of the content to return clean, ready-to-render AST nodes.
 *
 * @param content The raw markdown body string.
 * @returns An array of SlideNode objects containing the parsed directives and clean markdown string.
 */
export function splitMarkdownIntoSlides(content: string): SlideNode[] {
  if (!content || content.trim() === "") {
    return [];
  }

  // Split by horizontal rules that are on their own lines.
  const chunks = content.split(/\n\s*---\s*(?:\n|$)/);

  return chunks
    .map((chunk) => chunk.trim())
    .filter((chunk) => chunk.length > 0)
    .map((slide) => {
      // Parse Marp-style image directives
      const bgMatch = slide.match(/!\[bg\]\((.*?)\)/);
      const backgroundSrc = bgMatch ? bgMatch[1] : null;

      const splitMatch = slide.match(/!\[split\]\((.*?)\)/);
      const splitSrc = splitMatch ? splitMatch[1] : null;

      const splitReverseMatch = slide.match(/!\[split-reverse\]\((.*?)\)/);
      const splitReverseSrc = splitReverseMatch ? splitReverseMatch[1] : null;

      // Remove the directives from the text content so they don't render inline
      let cleanContent = slide;
      if (backgroundSrc) cleanContent = cleanContent.replace(/!\[bg\]\(.*?\)/, '');
      if (splitSrc) cleanContent = cleanContent.replace(/!\[split\]\(.*?\)/, '');
      if (splitReverseSrc) cleanContent = cleanContent.replace(/!\[split-reverse\]\(.*?\)/, '');

      return {
        rawContent: slide,
        cleanContent: cleanContent.trim(),
        backgroundSrc,
        splitSrc,
        splitReverseSrc
      };
    });
}
