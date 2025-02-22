"use client";
import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";

interface CodeHighlighterProps {
  code: string;
  lang?: string;
  theme?: string;
}

export default function CodeHighlighter({
  code,
  lang = "javascript",
  theme = "vitesse-dark",
}: CodeHighlighterProps) {
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    async function highlightCode() {
      const result = await codeToHtml(code, { lang, theme });
      setHtml(result);
    }

    highlightCode();
  }, [code, lang, theme]);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
