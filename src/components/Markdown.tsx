import * as React from "react";

interface MarkdownProps {
  content: string;
}

export function Markdown({ content }: MarkdownProps) {
  // Helper to parse inline styles like bold (**text**) and links ([text](url))
  const parseInlineStyles = (text: string): string => {
    let html = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Replace bold (**text**)
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Replace italic (*text*)
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");

    // Replace code (`code`)
    html = html.replace(/`(.*?)`/g, "<code class=\"px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-red-500 dark:text-red-400 rounded text-xs\">$1</code>");

    // Replace links ([text](url))
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, "<a href=\"$2\" class=\"text-emerald-500 hover:underline font-semibold\">$1</a>");

    return html;
  };

  // Split content into blocks by double newlines or single newlines depending on tags
  const blocks = React.useMemo(() => {
    // Normalise newlines
    const lines = content.replace(/\r\n/g, "\n").split("\n");
    const parsedBlocks: React.ReactNode[] = [];
    let listItems: string[] = [];
    let insideList = false;

    const flushList = (key: number) => {
      if (listItems.length > 0) {
        parsedBlocks.push(
          <ul key={`list-${key}`} className="list-disc pl-6 space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
            {listItems.map((item, idx) => (
              <li
                key={idx}
                dangerouslySetInnerHTML={{ __html: parseInlineStyles(item) }}
              />
            ))}
          </ul>
        );
        listItems = [];
        insideList = false;
      }
    };

    lines.forEach((line, idx) => {
      const trimmed = line.trim();

      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        insideList = true;
        listItems.push(trimmed.substring(2));
      } else {
        if (insideList) {
          flushList(idx);
        }

        if (trimmed === "") {
          return;
        }

        if (trimmed.startsWith("### ")) {
          parsedBlocks.push(
            <h4
              key={idx}
              className="text-base font-bold text-zinc-800 dark:text-zinc-200 mt-6 mb-2"
              dangerouslySetInnerHTML={{ __html: parseInlineStyles(trimmed.substring(4)) }}
            />
          );
        } else if (trimmed.startsWith("## ")) {
          parsedBlocks.push(
            <h3
              key={idx}
              className="text-lg font-bold text-zinc-900 dark:text-white mt-8 mb-3 border-b border-zinc-100 dark:border-zinc-800 pb-1.5"
              dangerouslySetInnerHTML={{ __html: parseInlineStyles(trimmed.substring(3)) }}
            />
          );
        } else if (trimmed.startsWith("# ")) {
          parsedBlocks.push(
            <h2
              key={idx}
              className="text-2xl font-extrabold text-zinc-950 dark:text-white mt-10 mb-4"
              dangerouslySetInnerHTML={{ __html: parseInlineStyles(trimmed.substring(2)) }}
            />
          );
        } else {
          parsedBlocks.push(
            <p
              key={idx}
              className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300 my-3.5"
              dangerouslySetInnerHTML={{ __html: parseInlineStyles(trimmed) }}
            />
          );
        }
      }
    });

    if (insideList) {
      flushList(lines.length);
    }

    return parsedBlocks;
  }, [content]);

  return <div className="space-y-4">{blocks}</div>;
}
