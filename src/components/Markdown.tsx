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
    let tableLines: string[] = [];
    let insideTable = false;
    let codeLines: string[] = [];
    let insideCode = false;

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

    const flushTable = (key: number) => {
      if (tableLines.length > 0) {
        // Parse rows
        const parsedRows = tableLines.map((line) => {
          return line
            .split("|")
            .filter((cell, i, arr) => i !== 0 && i !== arr.length - 1)
            .map((cell) => cell.trim());
        });

        if (parsedRows.length > 1) {
          const header = parsedRows[0];
          // Skip separator row (index 1)
          const body = parsedRows.slice(2);

          parsedBlocks.push(
            <div key={`table-${key}`} className="overflow-x-auto my-6 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                    {header.map((col, i) => (
                      <th key={i} className="py-3 px-4 font-bold text-zinc-900 dark:text-white">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 bg-white dark:bg-zinc-950">
                  {body.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                      {row.map((cell, cIdx) => (
                        <td
                          key={cIdx}
                          className="py-3 px-4 text-zinc-600 dark:text-zinc-300"
                          dangerouslySetInnerHTML={{ __html: parseInlineStyles(cell) }}
                        />
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        tableLines = [];
        insideTable = false;
      }
    };

    const flushCode = (key: number) => {
      if (codeLines.length > 0) {
        parsedBlocks.push(
          <pre
            key={`code-${key}`}
            className="p-4 my-6 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-x-auto text-xs sm:text-sm font-mono text-zinc-800 dark:text-zinc-200 shadow-sm leading-relaxed"
          >
            <code>{codeLines.join("\n")}</code>
          </pre>
        );
        codeLines = [];
        insideCode = false;
      }
    };

    lines.forEach((line, idx) => {
      const trimmed = line.trim();

      if (trimmed.startsWith("```")) {
        if (insideCode) {
          flushCode(idx);
        } else {
          if (insideList) flushList(idx);
          if (insideTable) flushTable(idx);
          insideCode = true;
        }
        return;
      }

      if (insideCode) {
        codeLines.push(line);
        return;
      }

      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        if (insideTable) {
          flushTable(idx);
        }
        insideList = true;
        listItems.push(trimmed.substring(2));
      } else {
        if (insideList) {
          flushList(idx);
        }

        if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
          insideTable = true;
          tableLines.push(trimmed);
        } else {
          if (insideTable) {
            flushTable(idx);
          }

          if (trimmed === "" || /^---+$/.test(trimmed)) {
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
      }
    });

    if (insideList) {
      flushList(lines.length);
    }
    if (insideTable) {
      flushTable(lines.length);
    }
    if (insideCode) {
      flushCode(lines.length);
    }

    return parsedBlocks;
  }, [content]);

  return <div className="space-y-4">{blocks}</div>;
}
