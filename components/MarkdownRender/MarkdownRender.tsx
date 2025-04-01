import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import '../../styles/github-markdown.css'
import '../../styles/github-markdown-plus.css'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { TbExternalLink } from "react-icons/tb";

interface MarkdownRenderProps {
  markdownText: string;
  enableGap?: boolean;
}

export default function MarkdownRender({ markdownText, enableGap=true }: MarkdownRenderProps) {
  return (
    <div className="markdown-body bg-transparent text-gray-100">
      <ReactMarkdown
        className={`${enableGap ? 'leading-8 space-y-8' : ''}`}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSlug, rehypeAutolinkHeadings]}
        components={{
          h1: ({ ...props }) => <h1 className="text-4xl font-bold mb-4 mt-6 pt-2 text-blue-400" {...props} />,
          h2: ({ ...props }) => <h2 className="text-3xl font-semibold mb-4 mt-6 pt-2 text-blue-300" {...props} />,
          h3: ({ ...props }) => <h3 className="text-2xl font-medium mb-3 mt-4 pt-1 text-blue-300" {...props} />,
          h4: ({ ...props }) => <h4 className="text-xl font-medium mb-3 mt-4 pt-1 text-blue-250" {...props} />,
          h5: ({ ...props }) => <h5 className="text-lg font-medium mb-3 mt-4 pt-1 text-blue-200" {...props} />,
          a: ({ href, children, ...props }) => (
            <a
              className="text-blue-400 hover:text-blue-300 transition-colors duration-200 inline-flex items-center mr-1"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            >
              {children}
              {href && href.startsWith('http') && (
                <TbExternalLink className="inline-block" aria-label="External link" />
              )}
            </a>
          ),
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <SyntaxHighlighter
                style={nightOwl}
                showLineNumbers
                language={match[1]}
                customStyle={{ background: 'none', padding: '0', margin: '0' }}
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