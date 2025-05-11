import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw'
// import rehypeSlug from 'rehype-slug'
import { rehypeCustomSlug } from '@/libs/rehypeCustomSlug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import cn from '@yeahx4/cn';
import '@/styles/github-markdown-plus.css'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { TbExternalLink } from "react-icons/tb";
import MarkdownImage from './MarkdownImage';
import StrongHighlight from './StrongHighlight';

interface MarkdownRenderProps {
  markdownText: string;
  renderType?: "POST" | "PROJECT" | "SNIPPET";
  enableGap?: boolean;
  series?: string;
  postTitle?: string;
  projectTitle?: string;
}

export default function MarkdownRender({ 
  markdownText,
  renderType="SNIPPET",
  enableGap=true,
  series,
  postTitle,
  projectTitle
}: MarkdownRenderProps) {

  const isPost = renderType === "POST";
  const isProject = renderType === "PROJECT";
  const isSnippet = renderType === "SNIPPET";

  return (
    <div className="markdown-body bg-transparent text-black dark:text-gray-300 tracking-wide">
      <ReactMarkdown
        className={cn(`font-pretendard ${enableGap ? 'leading-7 space-y-6' : ''}`)}
        remarkPlugins={[
          remarkGfm,
          ...(isSnippet ? [] : [remarkBreaks]),
        ]}
        rehypePlugins={[rehypeRaw, rehypeCustomSlug, rehypeAutolinkHeadings]}
        components={{
          h1: ({ ...props }) => <h1 className={cn("text-3xl md:text-4xl font-bold", !isSnippet ? "pt-6 md:pt-8" : "!mt-0 !mb-2")} {...props} />,
          h2: ({ ...props }) => <h2 className={cn("text-2xl md:text-3xl font-bold", !isSnippet ? "pt-4 md:pt-6" : "!mt-0 !mb-2")} {...props} />,
          h3: ({ ...props }) => <h3 className={cn("text-xl md:text-2xl font-bold", !isSnippet ? "pt-4 md:pt-6" : "!mt-0 !mb-2")} {...props} />,
          h4: ({ ...props }) => <h4 className={cn("text-lg md:text-xl font-semibold", !isSnippet ? "pt-3 md:pt-4" : "!mt-0 !mb-2")} {...props} />,
          h5: ({ ...props }) => <h5 className={cn("text-lg font-semibold", !isSnippet ? "pt-2 md:pt-4" : "!mt-0 !mb-2")} {...props} />,
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
                // showLineNumbers
                language={match[1]}
                customStyle={{ background: 'none', padding: '0', margin: '0' }}
                PreTag="pre"
                className={cn(
                  "!bg-[#202937] !p-4 !rounded-lg",
                  "!overflow-x-auto !text-sm",
                )}
              >
                {String(children).trim()}
              </SyntaxHighlighter>
            ) : (
              <code 
                className={cn(
                  className, 
                  "bg-[#d9dce0] dark:bg-[#202937] px-1 py-0.5 rounded-sm", 
                  "my-1 mx-0.5 text-black dark:text-white font-normal",
                  "text-[0.80em] relative z-10",
                )}
                {...props}
              >
                <span className='relative z-20'>{children}</span>
              </code>
            );
          },
          blockquote({ className, children, ...props }) {
            return (
              <blockquote
                className={cn(
                  "border-l-4 border-blue-400 pl-2 md:pl-4",
                  "text-gray-500 dark:text-gray-400",
                  "bg-[#e8eaec] dark:bg-[#202937] p-2 md:p-4 rounded-lg",
                  className
                )}
                {...props}
              >
                {children}
              </blockquote>
            );
          },
          img({ src, alt }) {
            return (
              <MarkdownImage
                src={src}
                alt={alt}
                isPost={isPost}
                isProject={isProject}
                series={series}
                postTitle={postTitle}
                projectTitle={projectTitle}
              />
            );
          },
          strong({ className, children, ...props }) {
            if (isSnippet) {
              return (
                <strong
                  className={className}
                  {...props}
                >
                  {children}
                </strong>
              );
            }
            return (
              <StrongHighlight className={className} {...props}>
                {children}
              </StrongHighlight>
            );
          }
        }}
      >
        {markdownText}
      </ReactMarkdown>
    </div>
  );
}