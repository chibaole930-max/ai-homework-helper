import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { preprocessMathContent } from '../lib/text-utils';

interface MarkdownRendererProps {
  content: string;
}

/** Gom toàn bộ text con trong blockquote để nhận diện loại. */
function extractChildrenText(node: React.ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractChildrenText).join(' ');
  if (React.isValidElement(node)) {
    const props = node.props as { children?: React.ReactNode };
    if (props && props.children) return extractChildrenText(props.children);
  }
  return '';
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
          blockquote: ({ children }) => {
            const txt = extractChildrenText(children);
            // Phân biệt: khối "Tham khảo thêm" (ngoài nguồn) / cảnh báo QA / trích dẫn thường
            const cls = /📎|tham khảo|cam khao|ngoài nguồn/i.test(txt)
              ? 'border-violet-400 bg-violet-50/80 text-violet-950'
              : /⚠️|chưa đối chiếu|chưa chắc|xem lại/i.test(txt)
                ? 'border-rose-400 bg-rose-50/80 text-rose-950'
                : 'border-amber-400 bg-amber-50/70 text-amber-950';
            return (
              <blockquote
                className={`border-l-4 rounded-r-lg px-4 py-3 my-3 font-normal shadow-xs ${cls}`}
              >
                {children}
              </blockquote>
            );
          },
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
