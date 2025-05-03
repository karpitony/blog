import Image from 'next/image';
import Link from 'next/link';
import imageInfo from '@/public/image-info.json';
import cn from "@yeahx4/cn";
import Logger from '@/libs/logger';

interface CardProps {
  type: "project" | "post";
  slug: string;
  thumbnail: string;
  title: string;
  description: string;
  tags: string[];
  showTags?: boolean;
  date: string;
};

export default function ProjectCard ({ 
  type,
  slug, 
  thumbnail, 
  title,
  description,
  tags,
  showTags = false,
  date,
 }: CardProps) {
  const resolvedSrc = thumbnail || '';
  let width = 800;
  let height = 600;
  let blurDataURL: string | undefined = undefined;
  const isBlurImageFlag = 
    resolvedSrc.startsWith('./') || resolvedSrc.startsWith('../') || 
    resolvedSrc.startsWith('/contents/') || resolvedSrc.startsWith('/projects/') || 
    resolvedSrc.startsWith('/posts/');

  if (isBlurImageFlag) {
    const relPath = resolvedSrc.split('/').slice(3).join('/');
    console.log('relPath:', relPath);
    const size = type === "project" 
      ? imageInfo.projects[relPath as keyof typeof imageInfo.projects]
      : imageInfo.posts[relPath as keyof typeof imageInfo.posts];
    
    if (size) {
      width = size.width;
      height = size.height;
      blurDataURL = size.blurDataURL || undefined;
    } else {
      Logger.warn('[Image] image-info.json에 해당 이미지 정보 없음:', relPath);
    }
  }

  return (
    <Link 
      className="group w-full overflow-hidden rounded-2xl border border-gray-600 pb-6 shadow-xl flex flex-col h-full"
      href={`/${type}s/${slug}`}
      prefetch={false}
    >
      <div className="relative h-[200px] w-full overflow-hidden border-b border-b-gray-200">
        <Image
          className="h-full w-full object-cover lg:transition-transform lg:duration-300 lg:group-hover:scale-105"
          src={resolvedSrc}
          width={width}
          height={height}
          placeholder={isBlurImageFlag ? 'blur' : 'empty'}
          blurDataURL={blurDataURL}
          alt={`${title} 썸네일`}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className='flex flex-grow flex-col justify-between'>
        {/* 텍스트 영역 */}
        <div className="mt-6 flex h-[120px] w-full flex-col gap-2 px-6">
          <h3 className="line-clamp-2 max-h-[54px] text-lg font-bold text-gray-100">{title}</h3>
          <p className="line-clamp-2 max-h-[48px] text-gray-300">{description}</p>
        </div>

        {/* 하단부 */}
        <div className="flex flex-col justify-between mt-4 px-6">
          {/* 태그 */}
          {showTags && (<div className="flex flex-wrap gap-1 text-sm text-gray-400">
            {tags.map((tag, index) => (
              <span key={index} className={cn(
                "bg-gray-700 text-gray-300 px-1 md:px-2 py-1 rounded-full",
                "text-xs overflow-hidden text-ellipsis whitespace-nowrap"
              )}>
                {tag}
              </span>
            ))}
          </div>
          )}
          {/* 날짜 */}
          <p className="text-sm text-gray-400 mt-2">
            <span>{date}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};