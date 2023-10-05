import React from "react";
import { escapeRegExp } from "../../helpers";

import "./styles.css";

interface Props {
  text: string;
  highlight?: string;
}

/**
 * Highlights search string matches (if any)
 */
export function HighlightedText({ text, highlight }: Props) {
  if (highlight !== undefined) {
    const regex = new RegExp(escapeRegExp(highlight), "gi");
    const idx = text.search(regex);
    if (idx >= 0) {
      const textStart = text.substring(0, idx);
      const textThatMatches = text.substring(
        textStart.length,
        textStart.length + highlight.length
      );
      const textEnd = text.substring(textStart.length + textThatMatches.length);

      return (
        <p>
          {textStart}
          <span className="highlight">{textThatMatches}</span>
          {textEnd}
        </p>
      );
    }
  }

  return <p>{text}</p>;
}
