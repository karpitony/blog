import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';
import { rehypeCustomSlug } from '@/libs/rehypeCustomSlug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import cn from '@yeahx4/cn';
import '@/styles/github-markdown-plus.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { TbExternalLink } from 'react-icons/tb';
import MarkdownImage from './MarkdownImage';
import LinkPreviewCard from './LinkPreviewCard';
import { preprocessMarkdownForOg, detectBareUrlInParagraph } from '@/libs/ogLinkPreview';

interface MarkdownRenderProps {
  markdownText: string;
  renderType?: 'POST' | 'PROJECT' | 'SNIPPET';
  enableGap?: boolean;
  series?: string;
  postTitle?: string;
  projectSlug?: string;
}

export default function MarkdownRender({
  markdownText,
  renderType = 'SNIPPET',
  enableGap = true,
  series,
  postTitle,
  projectSlug,
}: MarkdownRenderProps) {
  const isPost = renderType === 'POST';
  const isProject = renderType === 'PROJECT';
  const isSnippet = renderType === 'SNIPPET';

  const processedMarkdown = preprocessMarkdownForOg(markdownText);

  return (
    <div className="markdown-body bg-transparent text-black dark:text-gray-200 tracking-tight text-base md:text-lg">
      <ReactMarkdown
        className={cn(
          `font-pretendard ${enableGap ? 'leading-7 space-y-6 md:leading-8.5 md:space-y-7' : ''}`,
        )}
        remarkPlugins={[remarkGfm, ...(isSnippet ? [] : [remarkBreaks])]}
        rehypePlugins={[rehypeRaw, rehypeCustomSlug, rehypeAutolinkHeadings]}
        components={{
          h1: ({ ...props }) => (
            <h1
              className={cn(
                'text-4xl md:text-4xl font-bold',
                !isSnippet ? 'pt-6 md:pt-8' : 'mt-0! mb-2!',
              )}
              {...props}
            />
          ),
          h2: ({ ...props }) => (
            <h2
              className={cn(
                'text-3xl md:text-3xl font-bold',
                !isSnippet ? 'pt-4 md:pt-6' : 'mt-0! mb-2!',
              )}
              {...props}
            />
          ),
          h3: ({ ...props }) => (
            <h3
              className={cn(
                'text-2xl md:text-2xl font-bold',
                !isSnippet ? 'pt-4 md:pt-6' : 'mt-0! mb-2!',
              )}
              {...props}
            />
          ),
          h4: ({ ...props }) => (
            <h4
              className={cn(
                'text-xl md:text-xl font-semibold',
                !isSnippet ? 'pt-3 md:pt-4' : 'mt-0! mb-2!',
              )}
              {...props}
            />
          ),
          h5: ({ ...props }) => (
            <h5
              className={cn('text-lg font-semibold', !isSnippet ? 'pt-2 md:pt-4' : 'mt-0! mb-2!')}
              {...props}
            />
          ),
          // 인라인 <!-- og -->URL 처리: data-link-preview span을 카드로 변환
          span({ ...props }) {
            const previewUrl = (props as Record<string, unknown>)['data-link-preview'];
            if (previewUrl && typeof previewUrl === 'string') {
              return <LinkPreviewCard url={previewUrl} />;
            }
            return <span {...props} />;
          },
          // p 내부의 link-preview 마커 또는 독립형 베어 URL → 카드로 교체
          p({ children, ...props }) {
            // data-link-preview 마커가 있으면 p 자체를 카드로 교체
            const childArray = React.Children.toArray(children);
            for (const child of childArray) {
              if (React.isValidElement(child)) {
                const el = child as React.ReactElement<Record<string, unknown>>;
                const previewUrl = el.props?.['data-link-preview'];
                if (previewUrl && typeof previewUrl === 'string') {
                  return <LinkPreviewCard url={previewUrl} />;
                }
              }
            }
            // 베어 URL 자동 감지 → 링크 유지 + 아래에 카드 추가
            const { shouldRenderCard, href } = detectBareUrlInParagraph(children);
            if (shouldRenderCard && href) {
              return (
                <>
                  <p {...props} className={cn(props.className, 'mb-0! pb-0!')}>
                    {children}
                  </p>
                  <LinkPreviewCard url={href} />
                </>
              );
            }
            return <p {...props}>{children}</p>;
          },
          a: ({ href, children, ...props }) => (
            <a
              className="text-blue-400 hover:text-blue-300 transition-colors duration-200 items-center mr-1"
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
            // 코드 블럭
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <SyntaxHighlighter
                style={nightOwl}
                // showLineNumbers
                language={match[1]}
                customStyle={{ background: 'none', padding: '0', margin: '0' }}
                PreTag="pre"
                className={cn('bg-[#202937]! p-4! rounded-lg!', 'overflow-x-auto! text-sm!')}
              >
                {String(children).trim()}
              </SyntaxHighlighter>
            ) : (
              // 인라인 코드
              <code
                className={cn(
                  className,
                  'bg-[#d9dce0] dark:bg-[#202937] px-1.5 py-1 rounded-sm',
                  'my-1 mx-0.5 text-current font-normal',
                  'text-[0.90em]',
                )}
                {...props}
              >
                {children}
              </code>
            );
          },
          // 인용
          blockquote({ className, children, ...props }) {
            return (
              <blockquote
                className={cn(
                  'border-l-4 border-blue-400 pl-2 md:pl-4',
                  'text-gray-600 dark:text-gray-400',
                  'bg-[#c4c5c7] dark:bg-[#283342] p-2 md:p-4 rounded-lg',
                  className,
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
                type={isPost ? 'post' : isProject ? 'project' : 'post'}
                series={series}
                postTitle={postTitle}
                projectSlug={projectSlug}
              />
            );
          },
          strong({ className, children, ...props }) {
            return (
              <strong className={className + ' font-bold'} {...props}>
                {children}
              </strong>
            );
          },
        }}
      >
        {processedMarkdown}
      </ReactMarkdown>
    </div>
  );
}
