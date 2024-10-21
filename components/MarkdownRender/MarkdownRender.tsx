import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import '../../styles/github-markdown.css'
import '../../styles/github-markdown-plus.css'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface MarkdownRenderProps {
  markdownText: string;
}

export default function MarkdownRender({ markdownText }: MarkdownRenderProps) {
  return (
    <div className="markdown-body bg-transparent text-gray-100">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSlug, rehypeAutolinkHeadings]}
        components={{
          h1: ({ node, ...props }) => <h1 className="text-4xl font-bold mb-4 text-blue-400" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-3xl font-semibold mb-3 mt-6 text-blue-300" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-2xl font-medium mb-2 mt-4 text-blue-200" {...props} />,
          a: ({ node, ...props }) => <a className="text-blue-400 hover:text-blue-300 transition-colors duration-200" {...props} />,
          code({ node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <SyntaxHighlighter
                style={nightOwl}
                showLineNumbers
                language={match[1]}
                PreTag="pre"
              >
                {String(children).trim()}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {markdownText}
      </ReactMarkdown>
    </div>
  );
}