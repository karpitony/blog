import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import '@/styles/github-markdown.css'
import '@/styles/github-markdown-plus.css'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { TbExternalLink } from "react-icons/tb";
import imageInfo from '@/public/image-info.json';
import Logger from '@/libs/logger';

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
    <div className="markdown-body bg-transparent text-gray-100 tracking-wide">
      <ReactMarkdown
        className={`font-pretendard ${enableGap ? 'leading-7 space-y-8' : ''}`}
        remarkPlugins={[
          remarkGfm,
          ...(isSnippet ? [] : [remarkBreaks]),
        ]}
        rehypePlugins={[rehypeRaw, rehypeSlug, rehypeAutolinkHeadings]}
        components={{
          h1: ({ ...props }) => <h1 className={`text-4xl font-bold ${!isSnippet ? "pt-8" : "!mt-0 !mb-2"}`} {...props} />,
          h2: ({ ...props }) => <h2 className={`text-3xl font-semibold ${!isSnippet ? "pt-6" : "!mt-0 !mb-2"}`} {...props} />,
          h3: ({ ...props }) => <h3 className={`text-2xl font-medium ${!isSnippet ? "pt-4" : "!mt-0 !mb-2"}`} {...props} />,
          h4: ({ ...props }) => <h4 className={`text-xl font-medium ${!isSnippet ? "pt-2" : "!mt-0 !mb-2"}`} {...props} />,
          h5: ({ ...props }) => <h5 className={`text-lg font-medium ${!isSnippet ? "pt-2" : "!mt-0 !mb-2"}`} {...props} />,
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
              >
                {String(children).trim()}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          img({ src, alt }) {
            let resolvedSrc = src || '';
            let width = 1200;
            let height = 800;
            let blurDataURL: string | undefined = undefined;
            // 글 폴더 안에 이미지가 있는 경우만 
            const blurImageFlag = 
              resolvedSrc.startsWith('./') || resolvedSrc.startsWith('../') ? true : false;

            if (blurImageFlag) {
              // posts의 경우
              if (isPost && series && postTitle) {
                const relPath = `${series}/${postTitle}/${resolvedSrc.slice(2)}`;
                resolvedSrc = `/contents/posts/${relPath}`;
                const size = imageInfo.posts[relPath as keyof typeof imageInfo.posts];
                
                if (size) {
                  width = size.width;
                  height = size.height;
                  blurDataURL = size.blurDataURL || undefined;
                } else {
                  Logger.warn('[Image] image-info.json에 해당 이미지 정보 없음:', relPath);
                }
              // projects의 경우
              } else if (isProject) {
                const relPath = `${projectTitle}/${resolvedSrc.slice(2)}`;
                resolvedSrc = `/contents/projects/${relPath}`;
                const size = imageInfo.projects[relPath as keyof typeof imageInfo.projects];
                
                if (size) {
                  width = size.width;
                  height = size.height;
                  blurDataURL = size.blurDataURL || undefined;
                } else {
                  Logger.warn('[Image] image-info.json에 해당 이미지 정보 없음:', relPath);
                }
              } else {
                Logger.warn('[Image] series나 postTitle이 없어 이미지 경로를 만들 수 없습니다.');
              }
            }
            return (
              <Image
                src={resolvedSrc}
                alt={alt || 'image'}
                width={width}
                height={height}
                placeholder={blurImageFlag ? 'blur' : 'empty'}
                blurDataURL={blurDataURL}
                loading='lazy'
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  display: 'block',
                  margin: '2rem auto',
                  objectFit: 'contain',
                }}
              />
            );
          },
        }}
      >
        {markdownText}
      </ReactMarkdown>
    </div>
  );
}