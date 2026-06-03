import type { Components } from "react-markdown";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const components: Components = {
  h1: ({ children }) => (
    <h1 className="mt-12 font-serif text-3xl text-[#005C66] lg:text-4xl">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-12 border-b border-gray-200 pb-2 font-serif text-2xl text-charcoal lg:text-3xl">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-10 font-serif text-xl text-[#005C66] lg:text-2xl">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="mt-8 font-sans text-xs font-bold uppercase tracking-[0.18em] text-[#4A7C59]">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="mt-5 font-sans text-base leading-relaxed text-gray-600">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="mt-5 list-disc space-y-2 pl-5 font-sans text-base leading-relaxed text-gray-600 marker:text-[#4A7C59]">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-5 list-decimal space-y-2 pl-5 font-sans text-base leading-relaxed text-gray-600 marker:font-semibold marker:text-[#4A7C59]">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1">{children}</li>,
  strong: ({ children }) => (
    <strong className="font-semibold text-charcoal">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  a: ({ children, href }) => (
    <a
      href={href}
      className="font-medium text-[#005C66] underline decoration-[#4A7C59]/40 underline-offset-2 transition-colors hover:decoration-[#4A7C59]"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="mt-8 rounded-r-xl border-l-4 border-[#4A7C59] bg-[#4A7C59]/5 px-6 py-5 font-serif text-lg italic leading-relaxed text-[#005C66]">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-12 border-gray-200" />,
  table: ({ children }) => (
    <div className="mt-8 overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
      <table className="w-full border-collapse text-left font-sans text-sm">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-[#005C66] text-white">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="px-5 py-3 text-xs font-bold uppercase tracking-wider">
      {children}
    </th>
  ),
  tbody: ({ children }) => (
    <tbody className="divide-y divide-gray-100">{children}</tbody>
  ),
  tr: ({ children }) => (
    <tr className="align-top transition-colors even:bg-[#F9F6F0]/60 hover:bg-[#4A7C59]/5">
      {children}
    </tr>
  ),
  td: ({ children }) => (
    <td className="px-5 py-4 leading-relaxed text-gray-600">{children}</td>
  ),
  code: ({ children }) => (
    <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-[#005C66]">
      {children}
    </code>
  ),
};

export function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="first:[&>h2]:mt-0 first:[&>h3]:mt-0 first:[&>p]:mt-0">
      <Markdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </Markdown>
    </div>
  );
}
