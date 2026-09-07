import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

interface MarkdownRendererProps {
  content: string;
}

/**
 * Preprocesses content to normalize LaTeX math and fix degree/coordinate notation
 * such as $23^\circ 23'B$ (Geography 12), temperature $25^\circ C$, and angle degrees.
 */
function preprocessMathContent(content: string): string {
  if (!content) return '';

  let text = content;

  // 1. Convert standard LaTeX display and inline delimiters \[ ... \] and \( ... \) to $$ and $
  text = text.replace(/\\\[([\s\S]*?)\\\]/g, '$$$$1$$$');
  text = text.replace(/\\\(([\s\S]*?)\\\)/g, '$$$1$$');

  // 2. Fix Vietnamese Geographic coordinates with degrees and minutes
  // Examples in Địa lí 12: $23^\circ 23'B$, 23^\circ 23'B, $102^\circ 09'Đ$, $8^\circ 34'B$, $109^\circ 28'Đ$
  text = text.replace(
    /\$?\b(\d{1,3})\s*(?:\^\\circ|\\circ|\\degree|°)\s*(\d{1,2})?\s*(?:'|′|’)?\s*([BNDTEWbndte]|Đ|đ)\b\$?/g,
    (_, deg, min, dir) => {
      const direction = dir.toUpperCase();
      const minutes = min ? `${min}'` : '';
      return `${deg}°${minutes}${direction}`;
    }
  );

  // 3. Fix temperature degrees like 25^\circ C, $25^\circ C$, 100^\circ C
  text = text.replace(
    /\$?\b(\d+(?:[.,]\d+)?)\s*(?:\^\\circ|\\circ|\\degree)\s*([CcFf])\b\$?/g,
    '$1°$2'
  );

  // 4. Fix loose degree notation like: "góc 60^\circ", "từ 0^\circ đến 90^\circ"
  text = text.replace(/(\d+(?:[.,]\d+)?)\s*\^\\circ\b/g, '$1°');

  // 5. Clean up single degree inside $...$ like $23^\circ$ or $90^\circ$ outside complex equations
  text = text.replace(/\$(\d+(?:[.,]\d+)?)\s*(?:\^\\circ|\\circ|\\degree)\$/g, '$1°');

  // 6. Ensure non-ASCII letters like Đ, â, etc. inside $...$ are wrapped in \text{} so KaTeX doesn't throw a parse error
  text = text.replace(/\$([^$]+)\$/g, (match, mathContent) => {
    if (
      /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ]/.test(
        mathContent
      )
    ) {
      // If it contains Vietnamese characters not already in \text{}, wrap them safely
      return `$${mathContent.replace(
        /([àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐA-Za-z0-9_]+)/g,
        (word) => {
          if (
            /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ]/.test(
              word
            )
          ) {
            return `\\text{${word}}`;
          }
          return word;
        }
      )}$`;
    }
    return match;
  });

  return text;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const processedContent = useMemo(() => preprocessMathContent(content), [content]);

  return (
    <div className="markdown-body space-y-4 text-slate-800 leading-relaxed text-[15px] sm:text-[16px]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[
          [
            rehypeKatex,
            {
              throwOnError: false,
              strict: false,
              errorColor: '#cc0000',
            },
          ],
        ]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-6 mb-3 pb-2 border-b border-slate-200 tracking-tight flex items-center gap-2">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-lg sm:text-xl font-bold text-indigo-900 mt-5 mb-2.5 pb-1.5 border-b border-indigo-100 flex items-center gap-2">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 mt-4 mb-2">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-sm sm:text-base font-semibold text-slate-800 mt-3 mb-1.5">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="mb-3 leading-relaxed text-slate-700">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-5 sm:pl-6 space-y-1.5 mb-3 text-slate-700">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-5 sm:pl-6 space-y-1.5 mb-3 text-slate-700">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="pl-1">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-amber-400 bg-amber-50/70 rounded-r-lg px-4 py-3 my-3 text-amber-950 font-normal shadow-xs">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-4 rounded-lg border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-slate-100/90 text-slate-800 font-semibold">{children}</thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-slate-200 bg-white">{children}</tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-slate-50/80 transition-colors">{children}</tr>
          ),
          th: ({ children }) => (
            <th className="px-3.5 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-3.5 py-2.5 text-sm text-slate-700">{children}</td>
          ),
          code: ({ children, className }) => {
            const isBlock = className && className.includes('language-');
            if (isBlock) {
              return (
                <div className="my-3 rounded-lg overflow-hidden border border-slate-800 bg-slate-900 text-slate-100 p-4 font-mono text-sm shadow-inner">
                  <code>{children}</code>
                </div>
              );
            }
            return (
              <code className="px-1.5 py-0.5 rounded bg-slate-100 text-indigo-700 font-mono text-[13.5px] border border-slate-200/80 font-medium">
                {children}
              </code>
            );
          },
          hr: () => <hr className="my-6 border-t border-slate-200" />,
          strong: ({ children }) => (
            <strong className="font-semibold text-slate-900">{children}</strong>
          ),
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
};
