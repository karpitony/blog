import Image from 'next/image';
import Link from 'next/link';
import { ProjectMeta } from '@/libs/Project/metaDataParser';
import imageInfo from '@/public/image-info.json';
import cn from "@yeahx4/cn";
import Logger from '@/libs/logger';

interface CardProps {
  slug: string;
  meta: ProjectMeta;
};

export default function ProjectCard ({ slug, meta }: CardProps) {
  let resolvedSrc = meta.thumbnail || '';
  let width = 800;
  let height = 600;
  let blurDataURL: string | undefined = undefined;
  if (meta.thumbnail.startsWith('./') || meta.thumbnail.startsWith('../')) {
    const relPath = `${slug}/${resolvedSrc.slice(2)}`;
    resolvedSrc = `/contents/projects/${relPath}`;
    const size = imageInfo.projects[relPath as keyof typeof imageInfo.projects];
    
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
      className="group w-full overflow-hidden rounded-2xl border border-gray-600 pb-6 shadow-xl shadow-gray-900 flex flex-col h-full"
      href={`/projects/${slug}`}
      prefetch={false}
    >
      <div className="relative h-[200px] w-full overflow-hidden border-b border-b-gray-200">
        <Image
          className="h-full w-full object-cover lg:transition-transform lg:duration-300 lg:group-hover:scale-105"
          src={resolvedSrc}
          width={width}
          height={height}
          placeholder={meta.thumbnail.startsWith('./') || meta.thumbnail.startsWith('../') ? 'blur' : 'empty'}
          blurDataURL={blurDataURL}
          alt={`${meta.title} 썸네일`}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className='flex flex-grow flex-col justify-between'>
        {/* 텍스트 영역 */}
        <div className="mt-6 flex h-[110px] w-full flex-col gap-2 px-6">
          <h3 className="line-clamp-2 max-h-[54px] text-lg font-bold text-gray-100">{meta.title}</h3>
          <p className="line-clamp-2 max-h-[48px] text-gray-300">{meta.description}</p>
        </div>

        {/* 하단부 */}
        <div className="flex flex-col justify-between mt-4 px-6">
          {/* 태그 */}
          <div className="flex flex-wrap gap-1 text-sm text-gray-400">
            {meta.tags.map((tag, index) => (
              <span key={index} className={cn(
                "bg-gray-700 text-gray-300 px-1 md:px-2 py-1 rounded-full",
                "text-xs overflow-hidden text-ellipsis whitespace-nowrap"
              )}>
                {tag}
              </span>
            ))}
          </div>
          {/* 날짜 */}
          <p className="text-sm text-gray-400 mt-2">
            <span>{meta.date}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};